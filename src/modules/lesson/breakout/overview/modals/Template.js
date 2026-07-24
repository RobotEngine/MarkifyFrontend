import { Setup } from "./Setup";

import { assetURL, timeSince, formatFullDate, sendRequest } from "@/crucial";

import { Frame as Templates } from "./Templates";

import { Frame as NewBoard } from "@modules/lesson/board/modals/NewBoard";

import blankIcon from "@assets/lesson/breakout/setup/blank.svg?raw";
import cloneIcon from "@assets/lesson/breakout/setup/clone.svg?raw";
import duplicateIcon from "@assets/lesson/breakout/setup/duplicate.svg?raw";

export class Frame extends Setup {
  step = 0;

  html = `
  <div class="brtCreationHolder">
    <div class="brtInstructions">
      <div class="brtTitle">Create the <b>Template</b></div>
      <div class="brtDesc">The template document is what members will get assigned.</div>
      <button class="brtHelp">View Tutorial?</button>
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
    <div class="brtTemplate">
      <a class="brtTemplateTile" draggable="false">
        <div class="brtTemplateTileThumbnailHolder">
          <img class="brtTemplateTileThumbnail" load src="../images/dashboard/placeholder.png" />
          <img class="brtTemplateTileThumbnail" main />
        </div>
        <div class="brtTemplateTileInfoHolder">
          <div class="brtTemplateTileInfo">
            <div class="brtTemplateTileTitle">Loading...</div>
            <div class="brtTemplateTileLastChanged">Loading...</div>
          </div>
        </div>
      </a>
      <div class="brtTemplateRow">
        <button class="brtTemplateRowEdit border" title="Edit the current template.">Edit</button>
        <button class="brtTemplateRowChange border" title="Change the template.">Change</button>
      </div>
    </div>
  </div>
  ${this.progressFooter}
  `;

  css = {
    ".brtCreationHolder": `position: relative; display: flex; flex-direction: column; width: 350px; max-width: calc(100% - 16px); padding: 8px; text-align: center; align-items: center; z-index: 1`,
    ".brtInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brtTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brtTitle b": `color: var(--theme); font-weight: 700`,
    ".brtDesc": `width: 325px; max-width: 100%; margin-top: 6px; font-size: 16px`,
    ".brtHelp": `margin: 8px 0 0; font-size: 14px; font-weight: 700; color: var(--theme)`,
    ".brtOptions": `box-sizing: border-box; display: none; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 6px; align-items: center`,
    ".brtButton": `--themeColor: var(--theme); --borderRadius: 26px; width: 100%; padding: 8px; justify-content: center; text-align: left`,
    ".brtButton div[image]": `width: 32px; height: 32px`,
    ".brtButton div[image] svg": `width: 100%; height: 100%`,
    ".brtButton div[content]": `flex: 1; margin-left: 8px`,
    ".brtButton div[detail]": `margin-top: 4px; color: var(--textColor); font-size: 14px; font-weight: 500`,
    ".brtTemplate": `box-sizing: border-box; display: none; flex-direction: column; width: 100%; max-width: 300px; padding: 8px; align-items: center`,
    ".brtTemplateTile": `position: relative; width: 100%; background: var(--pageColor); --shadow: var(--lightShadow); box-shadow: var(--shadow); border-radius: 12px; overflow: hidden`,
    ".brtTemplateTile:hover": `--shadow: var(--darkShadow)`,
    ".brtTemplateTileThumbnailHolder": `position: relative; width: 100%; aspect-ratio: 4/3`,
    ".brtTemplateTileThumbnail": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; border-radius: 12px; opacity: 0; pointer-events: none`,
    'html[theme="dark"] .brtTemplateTileThumbnail': `filter: brightness(50%)`,
    ".brtTemplateTile:hover .dTileThumbnail": `filter: brightness(100%)`,
    ".brtTemplateTileInfoHolder": `position: absolute; box-sizing: border-box; display: flex; width: 100%; padding: 10px; left: 0px; bottom: 0px; align-items: flex-end; background: var(--pageColor); box-shadow: var(--shadow)`,
    ".brtTemplateTileInfo": `width: 100%`,
    ".brtTemplateTileTitle": `box-sizing: border-box; width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".brtTemplateTileLastChanged": `width: 100%; color: var(--theme); margin-top: 2px; font-size: 14px; font-weight: 600; text-align: left`,
    ".brtTemplateRow": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 8px; justify-content: space-between; align-items: center`,
    ".brtTemplateRow button": `--borderRadius: 16px; display: flex; height: fit-content; min-height: 32px; padding: 0 10px; margin: 6px; justify-content: center; align-items: center; font-weight: 700`,
    ".brtTemplateRow button:active": `transform: scale(.98)`,
    ".brtTemplateRowEdit": `--borderWidth: 3px; --borderColor: var(--theme); color: var(--theme); font-size: 18px`,
    ".brtTemplateRowEdit:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".brtTemplateRowChange": `--borderWidth: 3px; --borderColor: var(--secondary); color: var(--secondary); font-size: 18px`,
    ".brtTemplateRowChange:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ...this.progressFooterStyles
  };

  updateTemplateTile() {
    if (this.parent.template == null) {
      return;
    }
    let placeholderThumbnail = this.currentTemplateTile.querySelector(".brtTemplateTileThumbnail[load]");
    let thumbnail = this.currentTemplateTile.querySelector(".brtTemplateTileThumbnail[main]");
    if (this.parent.template.thumbnail != null) {
      let setThumbnail = assetURL + this.parent.template.thumbnail;
      let thumbnailSrc = thumbnail.getAttribute("src");
      if (thumbnailSrc == null) {
        let loadingTimeout = setTimeout(() => {
          placeholderThumbnail.style.transition = ".4s";
          placeholderThumbnail.style.opacity = 1;
        }, 10);
        let completeListener = async () => {
          thumbnail.removeEventListener("error", errorListener);
          thumbnail.removeEventListener("load", completeListener);

          clearTimeout(loadingTimeout);
          thumbnail.style.opacity = 1;
          placeholderThumbnail.style.opacity = 0;
        }
        let errorListener = () => {
          clearTimeout(loadingTimeout);
          thumbnail.remove();
        }
        thumbnail.addEventListener("error", errorListener);
        thumbnail.addEventListener("load", completeListener);
        thumbnail.src = setThumbnail;
        thumbnail.style.transition = ".4s";
      } else if (thumbnailSrc != setThumbnail) {
        thumbnail.src = setThumbnail;
      }
    }
    let title = this.currentTemplateTile.querySelector(".brtTemplateTileTitle");
    let titleText = this.parent.template.name ?? "Untitled Template";
    title.textContent = titleText;
    title.title = titleText;
    let changedTx = this.currentTemplateTile.querySelector(".brtTemplateTileLastChanged");
    let time = this.parent.template.lastThumbnail ?? this.parent.template.created;
    changedTx.textContent = timeSince(time, true);
    changedTx.title = formatFullDate(time);
  }

  async updateDisplayState() {
    let templateID = (this.parent.parent.parent.lesson.breakout ?? {}).template;
    if (templateID == null) {
      if ((this.parent.parent.parent.lesson.tool ?? []).includes("board") == false) {
        this.cloneButton.style.display = "none";
      }
      this.newOptions.style.display = "flex";
      this.currentTemplate.style.removeProperty("display");
      this.nextButton.setAttribute("hidden", "");
    } else {
      this.newOptions.style.removeProperty("display");
      this.currentTemplate.style.display = "flex";
      this.nextButton.removeAttribute("hidden");
      if (this.parent.template == null) {
        await this.parent.getTemplate();
        return this.updateDisplayState();
      }
      this.updateTemplateTile();
    }
  }

  handleSet(body) {
    let set = body.set ?? body;
    if (set != null && (set.breakout ?? {}).hasOwnProperty("template") == true) {
      if (this.parent.parent.currentPagePath == "template" && ((this.parent.parent.pages["secondary"] ?? {}).template ?? {})._id != (this.parent.template ?? {})._id) {
        this.parent.parent.closePage("secondary");
        this.parent.parent.openPage("primary", "overview");
      }
      return this.updateDisplayState();
    }
    this.updateTemplateTile();
  }

  js(frame, extra) {
    this.parent = extra.parent;

    this.setupFooter(extra);

    if (this.modal.closeButton.hasAttribute("listen") == false) {
      this.modal.closeButton.setAttribute("listen", "");
      this.modal.closeButton.addEventListener("click", () => {
        this.parent.parent.parent.removePage(this.parent.parent.pageID, this.parent.parent.pageType, { animate: true });
      });
    }

    let modal = frame.closest(".modal");

    modal.querySelector(".brtHelp").addEventListener("click", () => {
      this.parent.parent.openPage("primary", "tutorial");
    });

    this.newOptions = modal.querySelector(".brtOptions");
    this.currentTemplate = modal.querySelector(".brtTemplate");
    this.currentTemplateTile = this.currentTemplate.querySelector(".brtTemplateTile");
    this.currentTemplateEdit = this.currentTemplate.querySelector(".brtTemplateRowEdit");
    this.currentTemplateChange = this.currentTemplate.querySelector(".brtTemplateRowChange");

    this.nextButton = frame.querySelector(".brSetupProgress button[next]");

    this.parent.pipeline.subscribe("newBreakoutModalSet", "set", (body) => { this.handleSet(body); }, { sort: 2 });
    this.parent.pipeline.subscribe("newBreakoutModalSubSet", "subset", (body) => { this.handleSet(body); }, { sort: 2 });
    
    this.blankButton = this.newOptions.querySelector('.brtButton[type="blank"]');
    this.blankButton.addEventListener("click", () => {
      this.open(
        NewBoard,
        this.blankButton,
        {
          parent: this,
          requestPath: "lessons/breakout/templates/new",
          callback: async ({ body }) => {
            this.open(Frame, this.blankButton, { parent: this.parent, template: body, title: "Start a Breakout" });
            this.parent.parent.openPage("secondary", "template", { template: body });
          },
          title: "Create the Template"
        }
      );
    });

    this.cloneButton = this.newOptions.querySelector('.brtButton[type="clone"]');
    this.cloneButton.addEventListener("click", async () => {
      this.cloneButton.setAttribute("disabled", "");
      await sendRequest("POST", "lessons/breakout/templates/new", { duplicate: true }, { session: this.parent.parent.session });
      this.cloneButton.removeAttribute("disabled");
    });

    this.duplicateButton = this.newOptions.querySelector('.brtButton[type="duplicate"]');
    this.duplicateButton.addEventListener("click", () => {
      this.open(Templates, this.duplicateButton, { parent: this, title: "Past Templates" });
    });

    this.currentTemplateTile.addEventListener("click", () => {
      this.parent.parent.openPage("secondary", "template", { template: this.parent.template });
    });
    this.currentTemplateEdit.addEventListener("click", () => {
      this.parent.parent.openPage("secondary", "template", { template: this.parent.template });
    });
    this.currentTemplateChange.addEventListener("click", async () => {
      this.currentTemplateChange.setAttribute("disabled", "");
      await sendRequest("DELETE", "lessons/breakout/templates/remove?template=" + this.parent.template._id, null, { session: this.parent.parent.session });
      this.currentTemplateChange.removeAttribute("disabled", "");
    });

    this.updateDisplayState();
  }
}