import { assetURL, timeSince, formatFullDate, sendRequest } from "@/crucial";

import { Frame as Templates } from "./Templates";

import { Frame as NewBoard } from "@modules/lesson/board/modals/NewBoard";

import blankIcon from "@assets/lesson/breakout/setup/blank.svg?raw";
import cloneIcon from "@assets/lesson/breakout/setup/clone.svg?raw";
import duplicateIcon from "@assets/lesson/breakout/setup/duplicate.svg?raw";

export class Frame {
  html = `
  <div class="brtCreationHolder">
    <div class="brtInstructions">
      <div class="brtTitle">Create the <b>Template</b></div>
      <div class="brtDesc">The template document is what members will get assigned.</div>
    </div>
    <div class="brtOptions">
      <button selected class="brtButton largeButton" type="blank">
        <div image>${blankIcon}</div>
        <div content>
          <div text>Start Fresh</div>
          <div detail>Upload a PDF or make a blank board.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="clone">
        <div image>${cloneIcon}</div>
        <div content>
          <div text>Duplicate Board</div>
          <div detail>Create a copy of the existing board.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="duplicate">
        <div image>${duplicateIcon}</div>
        <div content>
          <div text>Use Another Template</div>
          <div detail>Use a template from a past lesson.</div>
        </div>
      </button>
    </div>
    <button class="brtHelp">View Tutorial?</button>
  </div>
  `;

  css = {
    ".brtCreationHolder": `position: relative; display: flex; flex-direction: column; width: 350px; max-width: calc(100% - 16px); padding: 8px; text-align: center; align-items: center; z-index: 1`,
    ".brtInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brtTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brtTitle b": `color: var(--theme); font-weight: 700`,
    ".brtDesc": `width: 325px; max-width: 100%; margin-top: 6px; font-size: 16px`,
    ".brtOptions": `box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 6px; align-items: center`,
    ".brtButton": `--themeColor: var(--theme); --borderRadius: 26px; width: 100%; padding: 8px; justify-content: center; text-align: left`,
    ".brtButton div[image]": `width: 32px; height: 32px`,
    ".brtButton div[image] svg": `width: 100%; height: 100%`,
    ".brtButton div[content]": `flex: 1; margin-left: 8px`,
    ".brtButton div[detail]": `margin-top: 4px; color: var(--textColor); font-size: 14px; font-weight: 500`,
    ".brtHelp": `margin: 8px 0 0; font-size: 14px; font-weight: 700; color: var(--theme)`
  };

  async updateDisplayState() {
    if ((this.parent.parent.parent.parent.lesson.tool ?? []).includes("board") == false) {
      this.cloneButton.style.display = "none";
    }
  }

  js(frame, extra) {
    this.parent = extra.parent;

    if (this.modal.closeButton.hasAttribute("listen") == false) {
      this.modal.closeButton.setAttribute("listen", "");
      this.modal.closeButton.addEventListener("click", () => {
        this.parent.parent.parent.parent.removePage(this.parent.parent.parent.pageID, this.parent.parent.parent.pageType, { animate: true });
      });
    }

    let modal = frame.closest(".modal");

    modal.querySelector(".brtHelp").addEventListener("click", () => {
      this.parent.parent.parent.openPage("primary", "tutorial");
    });

    this.newOptions = modal.querySelector(".brtOptions");

    this.blankButton = this.newOptions.querySelector('.brtButton[type="blank"]');
    this.blankButton.addEventListener("click", () => {
      this.open(
        NewBoard,
        this.blankButton,
        {
          parent: this,
          page: this.parent.parent.parent,
          requestPath: "lessons/breakout/templates/new",
          callback: async ({ body }) => {
            this.parent.setTemplate(body._id);
            this.close();
          },
          title: "Create a Template"
        }
      );
    });

    this.cloneButton = this.newOptions.querySelector('.brtButton[type="clone"]');
    this.cloneButton.addEventListener("click", async () => {
      this.cloneButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("POST", "lessons/breakout/templates/new", { duplicate: true }, { session: this.parent.parent.parent.session });
      this.cloneButton.removeAttribute("disabled");
      if (code == 200) {
        this.parent.setTemplate(body._id);
        this.close();
      }
    });

    this.duplicateButton = this.newOptions.querySelector('.brtButton[type="duplicate"]');
    this.duplicateButton.addEventListener("click", () => {
      this.open(Templates, this.duplicateButton, { parent: this, title: "Previous Templates" });
    });

    this.parent.pipeline.subscribe("newTemplatePageAdd", "page_add", (body) => { this.updateDisplayState(body); }, { sort: 2 });
    this.parent.pipeline.subscribe("newTemplatePageRemove", "page_remove", (body) => { this.updateDisplayState(body); }, { sort: 2 });

    this.updateDisplayState();
  }
}