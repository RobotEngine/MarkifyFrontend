import { BaseWorker } from "../../BaseWorker";

import { sleep, getObject, sendRequest } from "@/crucial";

export class Worker extends BaseWorker {
  static NAME = "widget/alignment";

  widgets = {};

  getVotesSync = {};
  async getVotes(id) {
    if (id == null) {
      return;
    }

    let widget = this.widgets[id];
    if (widget != null && widget.votes != null) {
      return;
    }

    this.getVotesSync[id] = true;

    if (this.requestVotes == null) {
      this.requestVotes = (async () => {
        await sleep(5);

        let widgetIDs = Object.keys(this.getVotesSync);
        this.getVotesSync = {};
        this.requestVotes = null;
        let [code, body] = await sendRequest("GET", "lessons/widgets/alignment/votes?widget=" + widgetIDs.join(), null, { session: this.editor.session });
        if (code == 200) {
          let sortedVotes = {};
          for (let i = 0; i < body.votes.length; i++) {
            let vote = body.votes[i];
            if (vote.annotation != null) {
              let voteSort = sortedVotes[vote.annotation];
              if (voteSort == null) {
                sortedVotes[vote.annotation] = [];
                voteSort = sortedVotes[vote.annotation];
              }
              voteSort.push(vote);
            }
          }

          for (let i = 0; i < widgetIDs.length; i++) {
            let widgetID = widgetIDs[i];
            let widget = (this.widgets[widgetID] ?? {});
            if (widget.votes == null) {
              widget.votes = getObject(sortedVotes[widgetID] ?? [], "collaborator");
            }
          }
          
          for (let i = 0; i < body.collaborators.length; i++) {
            let collaborator = body.collaborators[i];
            this.editor.lesson.collaborators[collaborator._id] = collaborator;
          }
        }
      })();
    }

    await this.requestVotes;
  }

  async setupCreate(widgetModule) {
    let id = widgetModule.parent.properties._id;
    let widget = this.widgets[id];
    if (widget == null) {
      this.widgets[id] = {};
      widget = this.widgets[id];
    }
    widget.module = widgetModule;
    await this.getVotes(id);
    if (widget.votes != null && widgetModule != null) {
      let voteKeys = Object.keys(widget.votes);
      for (let i = 0; i < voteKeys.length; i++) {
        let voteID = voteKeys[i];
        let vote = widget.votes[voteID];
        let collaborator = await this.editor.utils.getCollaborator(voteID);
        let marker = { _id: voteID, ...vote, ...collaborator };
        if (voteID == this.editor.self.modify) {
          widgetModule.selfMarker = marker;
        }
        widgetModule.addMarker(marker);
      }
      widgetModule.updateVoterCount();
    }
  }

  start() {
    this.subscribe("push", async (body) => {
      if (body.widget == null) {
        return;
      }
      let widget = this.widgets[body.widget];
      if (widget == null || widget.votes == null) {
        return;
      }
      if (body.vote != null) {
        if (body.vote.remove != true) {
          widget.votes[body.vote.collaborator] = body.vote;
          if (widget.module != null) {
            let collaborator = await this.editor.utils.getCollaborator(body.vote.collaborator);
            let marker = { _id: body.vote.collaborator, ...body.vote, ...collaborator };
            if (body.vote.collaborator == this.editor.self.modify) {
              widget.module.selfMarker = marker;
            }
            widget.module.addMarker(marker);
            widget.module.updateVoterCount();
          }
        } else {
          delete widget.votes[body.vote.collaborator];
          if (widget.module != null) {
            if (body.vote.collaborator == this.editor.self.modify) {
              delete widget.module.selfMarker;
            }
            widget.module.removeMarker(body.vote.collaborator);
            widget.module.updateVoterCount();
          }
        }
      } else if (body.reset == true) {
        widget.votes = [];
        if (widget.module != null) {
          widget.module.removeAllMarkers();
        }
      }
    });
  }

  async onAnnotationCreate(annotation) {
    let component = annotation.component;
    await component.loadWidget;
    if (component.widgetModule != null) {
      this.setupCreate(component.widgetModule);
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