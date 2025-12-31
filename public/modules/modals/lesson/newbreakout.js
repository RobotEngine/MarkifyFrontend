modules["modals/lesson/newbreakout"] = class {
  //maxHeight = 400;
  preload = [
    "../modules/modals/lesson/newboard.js"
  ];
  html = `
  <div class="brtCreationHolder">
    <div class="brtInstructions">
      <div class="brtTitle">Create the <b>Template</b></div>
      <div class="brtDesc">The template document is what members will get assigned.</div>
    </div>
    <div class="brtOptions">
      <button selected class="brtButton largeButton" type="blank">
        <div image></div>
        <div content>
          <div text>Start Fresh</div>
          <div detail>Upload a PDF or make a blank board.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="clone">
        <div image></div>
        <div content>
          <div text>Duplicate Board</div>
          <div detail>Create a copy of the existing board.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="duplicate">
        <div image></div>
        <div content>
          <div text>Use Another Template</div>
          <div detail>Use a template from a past lesson.</div>
        </div>
      </button>
    </div>
    <div class="brtTemplate">
      <a class="brtTemplateTile" draggable="false">
        <div class="brtTemplateTileThumbnailHolder">
          <img class="brtTemplateTileThumbnail" src="../images/dashboard/placeholder.png" />
          <img class="brtTemplateTileThumbnail" main />
        </div>
        <div class="brtTemplateTileInfoHolder">
          <div class="brtTemplateTileInfo">
            <div class="brtTemplateTileTitle"></div>
            <div class="brtTemplateTileLastChanged"></div>
          </div>
        </div>
      </a>
      <div class="brtTemplateRow">
        <button class="brtTemplateRowEdit border" title="Edit the current template.">Edit</button>
        <button class="brtTemplateRowChange border" title="Change the template.">Change</button>
      </div>
    </div>
    <div class="brtProgress">
      <button class="largeButton" back hidden>Back</button>
      <div dots></div>
      <button class="largeButton" next hidden>Next</button>
    </div>
  </div>
  `;
  css = {
    ".brtCreationHolder": `position: relative; display: flex; flex-direction: column; width: 350px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".brtInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brtTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brtTitle b": `color: var(--theme); font-weight: 700`,
    ".brtDesc": `width: 325px; max-width: 100%; margin-top: 6px; font-size: 16px`,
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
    ".brtTemplateTileInfoHolder": `position: absolute; display: flex; box-sizing: border-box; width: 100%; padding: 10px; left: 0px; bottom: 0px; align-items: flex-end; background: var(--pageColor); box-shadow: var(--shadow)`,
    ".brtTemplateTileInfo": `width: 100%`,
    ".brtTemplateTileTitle": `box-sizing: border-box; width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".brtTemplateTileTitle[contenteditable]": `padding: 2px 4px; margin-bottom: 4px; max-height: 100px; outline: solid 2px var(--theme); border-radius: 4px; overflow: auto; cursor: text`,
    ".brtTemplateTileLastChanged": `width: 100%; color: var(--theme); margin-top: 2px; font-size: 14px; font-weight: 600; text-align: left`,
    ".brtTemplateRow": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 8px; justify-content: space-between; align-items: center`,
    ".brtTemplateRow button": `--borderRadius: 16px; display: flex; height: fit-content; min-height: 32px; padding: 0 10px; margin: 6px; justify-content: center; align-items: center; font-weight: 700`,
    ".brtTemplateRow button:active": `transform: scale(.98)`,
    ".brtTemplateRowEdit": `--borderWidth: 3px; --borderColor: var(--theme); color: var(--theme); font-size: 18px`,
    ".brtTemplateRowEdit:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".brtTemplateRowChange": `--borderWidth: 3px; --borderColor: var(--secondary); color: var(--secondary); font-size: 18px`,
    ".brtTemplateRowChange:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    
    ".brtProgress": `display: flex; flex-wrap: wrap; gap: 8px; width: calc(100% - 24px); margin: 12px; font-size: 16px; justify-content: center; align-items: center`,
    ".brtProgress .largeButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 12px; max-width: 100%; padding: 6px 10px; margin: 0; justify-content: center; font-size: 18px`,
    ".brtProgress .largeButton[hidden]": `display: none`,
    ".brtProgress .largeButton svg": `width: 24px`,
    ".brtProgress .largeButton[back] svg": `transform: scaleX(-1)`,
    ".brtProgress div[dots]": `display: flex; flex-wrap: wrap; margin: 0 auto; justify-content: center; align-items: center`,
    ".brtProgress div[dots] button": `display: flex; width: 16px; height: 16px; margin: 6px; background: var(--hover); border-radius: 8px`,
    ".brtProgress div[dots] button[selected]": `width: 32px; background: var(--theme); pointer-events: none`
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    let modal = frame.closest(".modal");

    if (extra.button == null) {
      modal.querySelector(".modalClose").addEventListener("click", () => {
        this.parent.parent.parent.removePage(this.parent.parent.pageID, this.parent.parent.pageType, { animate: true });
      });
    }

    let newOptions = modal.querySelector(".brtOptions");
    let currentTemplate = modal.querySelector(".brtTemplate");
    let currentTemplateTile = currentTemplate.querySelector(".brtTemplateTile");
    let currentTemplateEdit = currentTemplate.querySelector(".brtTemplateRowEdit");
    let currentTemplateChange = currentTemplate.querySelector(".brtTemplateRowChange");

    let updateTemplateTile = () => {
      if (this.template == null) {
        return;
      }
      let placeholderThumbnail = currentTemplateTile.querySelector(".brtTemplateTileThumbnail[src]");
      let thumbnail = currentTemplateTile.querySelector(".brtTemplateTileThumbnail[main]");
      if (this.template.thumbnail != null) {
        let setThumbnail = assetURL + this.template.thumbnail;
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
            await sleep(400);
            placeholderThumbnail.remove();
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
      let title = currentTemplateTile.querySelector(".brtTemplateTileTitle");
      let titleText = this.template.name ?? "Untitled Template";
      title.textContent = titleText;
      title.title = titleText;
      let changedTx = currentTemplateTile.querySelector(".brtTemplateTileLastChanged");
      let time = this.template.lastThumbnail ?? this.template.created;
      changedTx.textContent = timeSince(time, true);
      changedTx.title = formatFullDate(time);
    }
    let updateDisplayState = async () => {
      let templateID = (this.parent.parent.parent.lesson.breakout ?? {}).template;
      if (templateID == null) {
        newOptions.style.display = "flex";
        currentTemplate.style.removeProperty("display");
      } else {
        newOptions.style.removeProperty("display");
        if (this.template == null) {
          let [code, body] = await sendRequest("GET", "lessons/breakout/template?template=" + templateID, null, { session: this.parent.parent.session });
          if (code != 200) {
            return;
          }
          this.template = body;
        }
        updateTemplateTile();
        currentTemplate.style.display = "flex";
      }
    }
    await updateDisplayState();

    this.parent.parent.pipeline.subscribe("newBreakoutModalTemplateSet", "set", (body) => {
      if (body.breakout != null && body.breakout.hasOwnProperty("template") == true) {
        if ((this.template ?? {})._id != body.breakout.template) {
          this.template = null;
          return updateDisplayState();
        }
      }
      if (this.template == null || body.id != this.template._id) {
        return;
      }
      objectUpdate(body, this.template);
      updateTemplateTile();
    });
    
    let blankButton = newOptions.querySelector('.brtButton[type="blank"]');
    blankButton.addEventListener("click", () => {
      extra.modal.open("modals/lesson/newboard", null, blankButton, "Create the Template", null, { parent: this, requestPath: "lessons/breakout/template/new", callback: ({ body }) => {
        this.parent.parent.openPage("secondary", "breakout/template", { template: body });
      } });
    });

    let cloneButton = newOptions.querySelector('.brtButton[type="clone"]');
    cloneButton.addEventListener("click", async () => {
      cloneButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("POST", "lessons/breakout/template/new", { duplicate: true }, { session: this.parent.parent.session });
      if (code == 200) {
        this.parent.parent.openPage("secondary", "breakout/template", { template: body });
      }
      cloneButton.removeAttribute("disabled");
    });

    let duplicateButton = newOptions.querySelector('.brtButton[type="duplicate"]');
    duplicateButton.addEventListener("click", () => {
      
    });

    currentTemplateTile.addEventListener("click", () => {
      this.parent.parent.openPage("secondary", "breakout/template", { template: this.template });
    });
    currentTemplateEdit.addEventListener("click", () => {
      this.parent.parent.openPage("secondary", "breakout/template", { template: this.template });
    });
    currentTemplateChange.addEventListener("click", async () => {
      currentTemplateChange.setAttribute("disabled", "");
      await sendRequest("DELETE", "lessons/breakout/template/remove?template=" + this.template._id, null, { session: this.parent.parent.session });
      currentTemplateChange.removeAttribute("disabled", "");
    });

    setSVG(blankButton.querySelector("div[image]"), "../images/editor/breakout/blank.svg");
    setSVG(cloneButton.querySelector("div[image]"), "../images/editor/breakout/clone.svg");
    setSVG(duplicateButton.querySelector("div[image]"), "../images/editor/breakout/duplicate.svg");

    if ((this.parent.parent.parent.lesson.tool ?? []).includes("board") == false) {
      cloneButton.style.display = "none";
    }

    // Progess Bar:
    let progressHolder = frame.querySelector(".brtProgress");
    let backButton = progressHolder.querySelector("button[back]");
    let progressDots = progressHolder.querySelector("div[dots]");
    let nextButton = progressHolder.querySelector("button[next]");
    //setSVG(backButton, "../images/tooltips/arrow.svg");
    progressDots.innerHTML = "<button selected></button><button></button><button></button><button></button>";
    //setSVG(nextButton, "../images/tooltips/arrow.svg");
  }
}