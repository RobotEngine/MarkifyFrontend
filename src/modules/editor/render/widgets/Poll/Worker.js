import { BaseWorker } from "../../BaseWorker";

import { sleep, getObject, sendRequest, hash } from "@/crucial";

export class Worker extends BaseWorker {
  static NAME = "widget/poll";

  widgets = {};
  
  refreshPollOptionStats(widget) {
    let widgetModule = widget.module;
    if (widgetModule == null || widget.options == null) {
      return;
    }
    let totalVotes = 0;
    let updateOptionPipeline = [];
    let widgetOptionKeys = Object.keys(widget.options);
    for (let i = 0; i < widgetOptionKeys.length; i++) {
      let optionHash = widgetOptionKeys[i];
      let optionData = widget.options[optionHash];
      let widgetOption = widgetModule.options[optionData._id];
      if (widgetOption == null) {
        continue;
      }
      let votes = optionData.votes ?? 0;
      totalVotes += votes;
      widgetOption.votes = votes;
      updateOptionPipeline.push({ _id: optionData._id, ...widgetOption });
    }
    widgetModule.totalVotes = totalVotes;
    if (widget.voted != null) {
      let option = widget.options[widget.voted] ?? {};
      if (widgetModule.selfVote != option._id) {
        widgetModule.selfVote = option._id;
        widgetModule.updateInteractivity();
      }
    } else {
      if (widgetModule.selfVote != null) {
        widgetModule.selfVote = null;
        widgetModule.updateInteractivity();
      }
    }
    for (let i = 0; i < updateOptionPipeline.length; i++) {
      let widgetOption = updateOptionPipeline[i];
      widgetModule.updateOptionStat(widgetOption, widgetOption.element);
    }
    widgetModule.updateVoterCount();
    if (widgetModule.loaded != true) {
      widgetModule.loaded = true;
      if (widgetModule.optionsHolder != null) {
        widgetModule.optionsHolder.removeAttribute("pending");
      }
    }
  }

  getVotesSync = {};
  async getVotes(id, options) {
    if (id == null || (options ?? []).length < 1) {
      return;
    }

    let syncArray = this.getVotesSync[id];
    if (syncArray == null) {
      this.getVotesSync[id] = [];
      syncArray = this.getVotesSync[id];
    }
    syncArray.push(...options);

    if (this.requestVotes == null) {
      this.requestVotes = (async () => {
        await sleep(5);

        let sendBody = this.getVotesSync;
        this.getVotesSync = {};
        this.requestVotes = null;
        let [code, body] = await sendRequest("POST", "lessons/widgets/poll/votes", sendBody, { session: this.editor.session });
        if (code == 200) {
          let pollIDs = Object.keys(body.polls ?? {});
          for (let i = 0; i < pollIDs.length; i++) {
            let pollID = pollIDs[i];
            let options = body.polls[pollID];
            let widget = this.widgets[pollID] ?? {};
            if (widget.options == null) {
              continue;
            }
            let optionKeys = Object.keys(options);
            for (let o = 0; o < optionKeys.length; o++) {
              let optionHash = optionKeys[o];
              let option = widget.options[optionHash];
              if (option != null) {
                option.votes = Math.max(options[optionHash], 0);
              }
            }
            if (body.selfVote != null) {
              widget.voted = body.selfVote;
            }
            if (widget.pending != null) { // Resync missed messages:
              for (let m = 0; m < (widget.pending ?? []).length; m++) {
                let message = widget.pending[m];
                if (message.time > body.snapshotTime) {
                  let missedOptionKeys = Object.keys(message.options);
                  for (let o = 0; o < missedOptionKeys.length; o++) {
                    let optionHash = missedOptionKeys[o];
                    let option = widget.options[optionHash];
                    if (option != null) {
                      option.votes = Math.max((option.votes ?? 0) + message.options[optionHash], 0);
                    }
                  }
                }
              }
              delete widget.pending;
            }
          }
          for (let i = 0; i < body.voted.length; i++) {
            let votePoll = body.voted[i];
            let widget = this.widgets[votePoll.annotation];
            if (widget != null) {
              widget.voted = votePoll.hash;
            }
          }
        }
      })();
    }

    await this.requestVotes;
  }

  async setupCreate(annotation, widgetModule) {
    let id = widgetModule.parent.properties._id;
    let widget = this.widgets[id];
    if (widget == null) {
      this.widgets[id] = {};
      widget = this.widgets[id];
    }
    widget.module = widgetModule;
    if (annotation.render.active == true) {
      if (widget.synced != true) {
        let previousOptionHashes = widget.options ?? {};
        let newOptionHashes = {};
        let newlyAddedHashes = [];
        let options = annotation.render.options ?? 2;
        for (let i = 0; i < options; i++) {
          let optionID = i + 1;
          let optionHash = hash(annotation.render["option_" + optionID] ?? {}) + "_" + optionID;
          if (newOptionHashes[optionHash] != null) {
            return;
          }
          let previousHash = previousOptionHashes[optionHash];
          if (previousHash == null) {
            newlyAddedHashes.push(optionHash);
          }
          newOptionHashes[optionHash] = previousHash ?? { _id: optionID };
        }
        widget.options = newOptionHashes;
        await this.getVotes(id, newlyAddedHashes);
        widget.synced = true;
      }
    } else {
      widget.synced = false;
    }
    this.refreshPollOptionStats(widget);
  }

  start() {
    this.subscribe("push", async (body) => {
      if (body.widget == null) {
        return;
      }
      let widget = this.widgets[body.widget];
      if (widget == null || widget.options == null) {
        return;
      }
      if (body.options != null) {
        if (widget.synced != true) {
          if (widget.pending == null) {
            widget.pending = [];
          }
          widget.pending.push({ options: body.options, time: body.time });
          return;
        }
        let selected = null;
        let optionKeys = Object.keys(body.options);
        for (let o = 0; o < optionKeys.length; o++) {
          let optionHash = optionKeys[o];
          let option = widget.options[optionHash];
          if (option != null) {
            if (option.votes == null) {
              option.votes = 0;
            }
            let change = body.options[optionHash];
            option.votes = Math.max(option.votes + change, 0);
            if (change > 0) {
              selected = optionHash;
            }
          }
        }
        if (body.collaborator == this.editor.self.modify) {
          widget.voted = selected;
        }
        this.refreshPollOptionStats(widget);
      } else if (body.reset == true) {
        let optionKeys = Object.keys(widget.options);
        for (let i = 0; i < optionKeys.length; i++) {
          let option = widget.options[optionKeys[i]];
          if (option != null) {
            delete option.votes;
          }
        }
        delete widget.voted;
        this.refreshPollOptionStats(widget);
      }
    });
  }

  async onAnnotationCreate(annotation) {
    let component = annotation.component;
    await component.loadWidget; // Wait for widget to finish loading
    if (component.widgetModule != null) {
      this.setupCreate(annotation, component.widgetModule);
    }
  }
  onAnnotationUpdate(annotation, event) {
    if (event.save.hasOwnProperty("active") == false) {
      return;
    }
    let component = annotation.component ?? {};
    if (component.widgetModule != null) {
      this.setupCreate(annotation, component.widgetModule);
    }
  }
  onAnnotationDestroy(annotation) {
    let widget = this.widgets[annotation.render._id] ?? {};
    if (widget.module != null) {
      delete widget.module;
    }
  }

  onAnnotationRemove(annotation) {
    delete this.widgets[annotation.render._id];
  }
}