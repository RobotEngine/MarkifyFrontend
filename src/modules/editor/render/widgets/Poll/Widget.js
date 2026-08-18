import { objectEqual, getEpoch, sendRequest, addS } from "@/crucial";

import { close as closeIcon } from "@modules/utility/core-icons";

export class Widget {
  WIDTH = 400;

  ACTION_BAR_TOOLS = [];

  OPTIONS = {
    SHOW_ONLY_WIDTH_HANDLES: true,
    AUTO_SET_HEIGHT: true
  };

  options = {};

  MIN_OPTIONS = 2;
  MAX_OPTIONS = 8;

  totalVotes = 0;

  html = `<div class="eWidgetPoll" edit>
    <div class="eWidgetPollHeader">
      <div class="eWidgetPollTitle"></div>
      <div class="eWidgetPollVotesHolder">
        <div class="eWidgetPollVotes" hidden></div>
      </div>
    </div>
    <div class="eWidgetPollOptions"></div>
    <div class="eWidgetPollActions">
      <button class="eWidgetPollAddOption largeButton">Add Option</button>
      <button class="eWidgetPollPublish largeButton">Publish</button>
    </div>
  </div>`;
  css = {
    ".eWidgetPoll": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 16px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: var(--borderRadius); pointer-events: all !important; justify-content: center; align-items: center; transition: .4s`,
    ".eWidget:not([selected]) .eWidgetPoll": `border-radius: 16px !important`,
    ".eWidgetPoll .ql-container": `position: relative; font-family: var(--font) !important`,
    ".eWidgetPoll .ql-container:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--hover); opacity: 0; border-radius: 2px; transition: .4s; z-index: 1`,
    ".eWidgetPoll .ql-container:focus-within:before": `opacity: .4; border-radius: 8px`,
    ".eWidgetPoll .ql-editor": `position: relative; padding: unset; z-index: 2; font-family: var(--font); font-size: inherit; line-height: inherit; text-align: inherit`,
    ".eWidgetPollHeader": `display: flex; flex-wrap: wrap; gap: 8px; width: 100%; justify-content: center; align-items: flex-start`,
    ".eWidgetPollTitle": `flex: 1 1 180px; min-height: 24px; padding: 4px 8px; margin: auto 0; font-size: 16px !important; font-weight: 600 !important; text-align: left !important; align-content: center`,
    ".eWidgetPollVotesHolder": `display: flex; min-width: 100px; margin: 4px 4px 4px auto; justify-content: flex-end; align-items: center`,
    ".eWidgetPollVotes": `width: fit-content; padding: 4px 8px; background: var(--pageColor); box-shadow: inset var(--lightShadow); color: var(--theme); border-radius: 12px; font-size: 13px; font-weight: 500; transition: .4s`,
    ".eWidgetPollOptions": `display: flex; flex-direction: column; gap: 6px; width: 100%; margin-top: 12px`,
    ".eWidgetPollOption": `position: relative; box-sizing: border-box; display: flex; gap: 8px; width: 100%; padding: 8px; box-shadow: inset var(--lightShadow); --borderTopLeft: 8px; --borderTopRight: 8px; --borderBottomLeft: 8px; --borderBottomRight: 8px; border-radius: var(--borderTopLeft) var(--borderTopRight) var(--borderBottomLeft) var(--borderBottomRight); justify-content: center; align-items: center`,
    ".eWidgetPoll[voted]:not([editing]) .eWidgetPollOption[selected]": `box-shadow: var(--lightShadow) !important`,
    ".eWidgetPoll[voted]:not([editing]) .eWidgetPollOption[selected]:after": `content: ""; position: absolute; box-sizing: border-box; width: 100%; height: 100%; left: 0; top: 0; border: solid 2px var(--theme); border-radius: inherit; z-index: 1; pointer-events: 1`,
    ".eWidgetPollOption:first-child": `--borderTopLeft: 16px !important; --borderTopRight: 16px !important`,
    ".eWidgetPollOption:last-child": `--borderBottomLeft: 16px !important; --borderBottomRight: 16px !important`,
    ".eWidgetPollOptionText": `flex: 1; min-height: 24px; padding: 4px 6px; margin: auto 0; font-size: 16px !important; font-weight: 500 !important; text-align: left !important; align-content: center; z-index: 2; pointer-events: all`,
    ".eWidgetPollOptionPercentHolder": `display: flex; min-width: 60px; min-height: 28px; margin-left: auto; justify-content: flex-end; align-items: center; z-index: 2`,
    ".eWidgetPollOptionPercent": `display: none; width: fit-content; padding: 4px 8px; margin-right: 2px; background: var(--pageColor); box-shadow: var(--lightShadow); opacity: 0; color: var(--theme); border-radius: 12px; font-size: 13px; font-weight: 600; pointer-events: none; transition: .4s`,
    ".eWidgetPollOptionPercent[winner]": `background: var(--theme); color: #fff`,
    ".eWidgetPollOptionRemove": `display: none; width: fit-content; padding: 6px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 14px; pointer-events: all`,
    ".eWidgetPollOptionRemove svg": `--secondary: var(--error); width: 16px; height: 16px`,
    ".eWidgetPollOptionBar": `position: absolute; width: calc(100% - 8px); height: calc(100% - 8px); left: 4px; top: 4px; border-radius: calc(var(--borderTopLeft) - 4px) calc(var(--borderTopRight) - 4px) calc(var(--borderBottomLeft) - 4px) calc(var(--borderBottomRight) - 4px); overflow: hidden; z-index: 1`,
    ".eWidgetPollOptionBar:before": `content: ""; position: absolute; width: 0; min-width: 8px; height: 100%; left: 0; top: 0; background: var(--hover); opacity: 0; border-radius: 4px; transition: .4s var(--bounce)`,
    ".eWidgetPoll[editing] .eWidgetPollOption, .eWidgetPoll[voted] .eWidgetPollOption": `transform: scale(1) !important; pointer-events: none !important`,
    ".eWidgetPoll:not([editing]) .eWidgetPollOptionPercent": `display: flex !important`,
    ".eWidgetPoll[editing][canremove] .eWidgetPollOptionRemove": `display: flex !important`,
    ".eWidgetPoll[voted] .eWidgetPollOptionPercent": `opacity: 1 !important; pointer-events: all !important`,
    ".eWidgetPoll[voted]:not([editing]) .eWidgetPollOptionBar:before": `width: calc(100% * var(--percent)) !important; opacity: 1 !important`,
    ".eWidgetPollActions": `display: none; flex-wrap: wrap; gap: 8px; width: 100%; margin-top: 12px; justify-content: space-between; align-items: center`,
    ".eWidgetPoll[editing] .eWidgetPollActions": `display: flex !important`,
    ".eWidgetPollAddOption": `padding: 6px 10px; --borderRadius: 16px; color: var(--secondary); font-size: 16px`,
    ".eWidgetPollPublish": `padding: 6px 10px; background: var(--theme); --borderColor: var(--secondary); --borderRadius: 16px; color: #fff; font-size: 16px`,
  };

  getSize() {
    return [this.parent.properties.s[0], this.widget.offsetHeight];
  }

  async setupQuill(label, id, placeholder) {
    let quill = new (await this.editor.text.getQuill())(label, {
      formats: ["bold", "italic", "underline", "strike"],
      placeholder
    });
    quill.on("text-change", () => {
      let save = {
        _id: this.parent.properties._id,
        s: this.getSize()
      };
      save[id] = quill.getContents().ops;
      this.editor.saveAnnotation(save);
    });
    quill.on("selection-change", (range) => {
      if (range == null) { // Unfocus
        this.setQuillContent({ quill }, this.parent.properties[id], true);
      }
    });
    return { quill };
  }
  setQuillContent(quillCache, content, force) {
    if (content == null || quillCache == null) {
      return;
    }
    if (quillCache.quill.hasFocus() == true && force != true) {
      return;
    }
    let setContent = this.editor.text.uncleanQuill(content);
    if (objectEqual(setContent, quillCache.lastContent) == false || force == true) {
      quillCache.lastContent = setContent;
      quillCache.quill.setContents(setContent, "silent");
    }
  }

  checkAddRemoveOptionButtons() {
    let optionCount = this.optionsHolder.childElementCount;

    if (optionCount > this.MIN_OPTIONS) {
      this.widget.setAttribute("canremove", "");
    } else {
      this.widget.removeAttribute("canremove");
    }

    if (optionCount < this.MAX_OPTIONS) {
      this.addOptionButton.removeAttribute("disabled");
    } else {
      this.addOptionButton.setAttribute("disabled", "");
    }
  }

  updateOption(render, option) {
    if (render == null || option == null) {
      return;
    }
    let optionStore = this.options[render._id];
    if (optionStore != null) {
      this.setQuillContent(optionStore.quill, render.content);
    }
    let percent = (render.votes ?? 0) / Math.max(this.totalVotes, 1);
    option.style.setProperty("--percent", percent);
    let percentDisplay = option.querySelector(".eWidgetPollOptionPercent");
    if (percent > 0) {
      percentDisplay.textContent = Math.round(percent * 100) + "%";
      percentDisplay.removeAttribute("hidden");
    } else {
      percentDisplay.setAttribute("hidden", "");
    }
  }
  async addOption(render, option) {
    if (option == null) {
      option = (this.options[render._id] ?? {}).element;
    }
    let newOption = option == null;
    if (newOption == true) {
      option = document.createElement("button");
      this.options[render._id] = { element: option };
      option.setAttribute("optionid", render._id);
      option.className = "eWidgetPollOption";
      option.innerHTML = `<div class="eWidgetPollOptionText"></div>
      <div class="eWidgetPollOptionPercentHolder">
        <div class="eWidgetPollOptionPercent"></div>
        <a class="eWidgetPollOptionRemove">${closeIcon}</a>
      </div>
      <div class="eWidgetPollOptionBar"></div>`;
      let optionStore = this.options[render._id];
      if (optionStore != null) {
        optionStore.quill = await this.setupQuill(option.querySelector(".eWidgetPollOptionText"), "option_" + render._id, "Option " + render._id);
      }
      this.optionsHolder.appendChild(option);
      this.checkAddRemoveOptionButtons();
    }

    this.updateOption(render, option);
  }
  removeOption(id, option) {
    if (option == null) {
      option = this.options[id];
      delete this.options[id];
    }
    if (option != null && option.element != null) {
      option.element.remove();
    }

    this.checkAddRemoveOptionButtons();
  }

  updateInteractivity() {
    let isActive = this.parent.properties.active == true;
    let disabled = (
      isActive == true
      || this.editor.utils.canMemberModify(this.parent.properties) == false
      || this.editor.utils.isLocked(this.parent.properties) == true
    );
    if (isActive == true) {
      this.widget.removeAttribute("editing");
      if (this.selfVote == null) {
        this.widget.removeAttribute("voted");
      } else {
        this.widget.setAttribute("voted", "");
      }
      this.optionsHolder.removeAttribute("disabled");
    } else {
      this.widget.setAttribute("editing", "");
      this.widget.removeAttribute("voted");
      if (disabled != true) {
        this.optionsHolder.removeAttribute("disabled");
        this.actionsHolder.removeAttribute("disabled");
      } else {
        this.optionsHolder.setAttribute("disabled", "");
        this.actionsHolder.setAttribute("disabled", "");
      }
    }
    let quillKeys = Object.keys(this.options);
    for (let i = 0; i < quillKeys.length; i++) {
      let { quill } = this.options[quillKeys[i]];
      if (quill != null) {
        if (disabled) {
          quill.quill.disable();
        } else {
          quill.quill.enable();
        }
      }
    }
  }

  async js(frame) {
    this.widget = frame.querySelector(".eWidgetPoll");
    this.title = this.widget.querySelector(".eWidgetPollTitle");
    this.votes = this.widget.querySelector(".eWidgetPollVotes");
    this.optionsHolder = this.widget.querySelector(".eWidgetPollOptions");
    this.actionsHolder = this.widget.querySelector(".eWidgetPollActions");
    this.addOptionButton = this.actionsHolder.querySelector(".eWidgetPollAddOption");
    this.publishButton = this.actionsHolder.querySelector(".eWidgetPollPublish");

    if (this.preview == true) {
      return;
    }

    this.titleQuill = await this.setupQuill(this.title, "title", "What's your question?");

    this.addOptionButton.addEventListener("click", async () => {
      let count = this.optionsHolder.childElementCount + 1;
      await this.addOption({ _id: count });
      this.editor.saveAnnotation({
        _id: this.parent.properties._id,
        options: count,
        s: this.getSize()
      });
    });

    this.parent.subscribe("update", (data) => {
      if (this.editor.self._id == data._id && data.hasOwnProperty("access") == true) {
        this.updateInteractivity();
      }
    });
    this.parent.subscribe("set", (data) => {
      if (data.hasOwnProperty("settings") == true) {
        this.updateInteractivity();
      }
    });
    this.updateInteractivity();
  }

  async render() {
    this.setQuillContent(this.titleQuill, this.parent.properties.title ?? [ { insert: "" } ]);
    
    let options = this.parent.properties.options ?? 2;

    // Add/Update options:
    for (let i = 0; i < options; i++) {
      let count = i + 1;
      await this.addOption({
        ...(this.parent.properties["option_" + count] ?? {}),
        _id: count
      });
    }

    // Remove options:
    if (this.optionsHolder.childElementCount > options) {
      let optionKeys = Object.keys(this.options);
      for (let i = 0; i < optionKeys.length; i++) {
        let key = optionKeys[i];
        if (parseInt(key) < 3) {
          continue;
        }
        if (this.parent.properties["option_" + key] == null) {
          this.removeOption(key);
        }
      }
    }

    this.updateInteractivity();
  }

  async renderPreview() {
    this.totalVotes = 10;
    this.title.textContent = "What's your favorite season?";
    await this.addOption({ _id: 1, content: [ { insert: "Summer" } ], votes: 4 });
    await this.addOption({ _id: 2, content: [ { insert: "Fall" } ], votes: 2 });
    await this.addOption({ _id: 3, content: [ { insert: "Winter" } ], votes: 1 });
    await this.addOption({ _id: 4, content: [ { insert: "Spring" } ], votes: 3 });
    this.widget.setAttribute("voted", "");
    this.HEIGHT = this.widget.offsetHeight;
  }
}