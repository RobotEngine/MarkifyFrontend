modules["breakout/overview/setup"] = class {
  progressFooter = `
  <div class="brSetupProgress">
    <button class="largeButton" back>Back</button>
    <div dots><button></button><button></button><button></button><button></button></div>
    <button class="largeButton" next>Next</button>
  </div>`;
  progressFooterStyles = {
    ".brSetupProgress": `position: sticky; display: flex; flex-wrap: wrap; gap: 12px; width: calc(100% - 24px); bottom: 0; padding: 12px; font-size: 16px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); justify-content: center; align-items: center; z-index: 2`,
    ".brSetupProgress .largeButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 12px; max-width: 100%; padding: 6px 10px; margin: 3px; justify-content: center; font-size: 18px`,
    ".brSetupProgress .largeButton svg": `width: 24px`,
    ".brSetupProgress .largeButton[back] svg": `transform: scaleX(-1)`,
    ".brSetupProgress div[dots]": `display: flex; flex-wrap: wrap; gap: 6px; padding: 6px; margin: 0 auto; justify-content: center; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 20px`,
    ".brSetupProgress div[dots] button": `position: relative; display: flex; width: 28px; height: 28px; background: var(--hover); border-radius: 6px; pointer-events: none`,
    ".brSetupProgress div[dots] button:first-child": `border-radius: 14px 6px 6px 14px`,
    ".brSetupProgress div[dots] button:last-child": `border-radius: 6px 14px 14px 6px`,
    ".brSetupProgress div[dots] button[selected]": `background: var(--theme); border-radius: 14px !important`,
    ".brSetupProgress div[dots] button[selected]:before": `content: ""; position: absolute; width: 40%; height: 40%; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--pageColor); border-radius: inherit`,
    ".brSetupProgress div[dots] button[past]": `background: var(--theme) !important`,
    ".brSetupProgress div[dots] button:not([selected])": `pointer-events: all`
  };
  steps = [
    "modals/lesson/newbreakout/template",
    "modals/lesson/newbreakout/setuptype",
    "modals/lesson/newbreakout/options",
    "modals/lesson/newbreakout/review"
  ];
  /*updateFooter = () => {
    let backButton = this.progressFooter.querySelector("button[back]");
    let dots = this.progressFooter.querySelector("div[dots]").children;
    let nextButton = this.progressFooter.querySelector("button[next]");
    let config = this.parent.parent.parent.lesson.breakout ?? {};
    if (config.template == null) {
      dots[0].removeAttribute("done");
    } else {
      dots[0].setAttribute("done", "");
    }
    if (config.mode == null) {
      dots[1].removeAttribute("done");
    } else {
      dots[1].setAttribute("done", "");
    }
    if (config.mode == null || !(config.auto == null || config.auto.enabled == false || config.auto.type == null || (config.auto.type == "scale" && (config.auto.size ?? 0) > 0) || (config.auto.type == "assign" && (config.auto.groups ?? 0) > 0))) {
      dots[2].removeAttribute("done");
    } else {
      dots[2].setAttribute("done", "");
    }

    if (this.step > 0) {
      backButton.removeAttribute("hidden");
    } else {
      backButton.setAttribute("hidden", "");
    }
    if (dots[this.step].hasAttribute("done") == true && this.step < (this.steps.length - 1)) {
      nextButton.removeAttribute("hidden");
    } else {
      nextButton.setAttribute("hidden", "");
    }
  }*/
  goBack = () => {
    this.modal.open(this.steps[this.step - 1], null, this.modal.modal.modal.querySelector(".modalBack"), "Start a Breakout", null, { parent: this.parent });
  }
  goNext = () => {
    this.modal.open(this.steps[this.step + 1], null, this.progressFooter.querySelector("button[next]"), "Start a Breakout", null, { parent: this.parent });
  }
  setupFooter = (extra) => {
    this.modal = extra.modal;

    this.frame.closest(".modalContent").style.padding = "0px";

    this.progressFooter = this.frame.querySelector(".brSetupProgress");
    let backButton = this.progressFooter.querySelector("button[back]");
    let dots = this.progressFooter.querySelector("div[dots]");
    let dotChildren = dots.children;
    let progressDot = dotChildren[this.step];
    let nextButton = this.progressFooter.querySelector("button[next]");
    let modalBackButton = this.modal.modal.modal.querySelector(".modalBack");
    backButton.addEventListener("click", this.goBack);
    if (this.step < 1) {
      backButton.setAttribute("hidden", "");
    }
    nextButton.addEventListener("click", this.goNext);
    if (this.step > (this.steps.length - 2)) {
      nextButton.setAttribute("hidden", "");
    }
    dots.addEventListener("click", (event) => {
      let dot = event.target.closest("button");
      if (dot == null) {
        return;
      }
      let dotIndex = [...dotChildren].indexOf(dot);
      let useButton = dot;
      if (dotIndex < this.step) {
        useButton = modalBackButton;
      }
      this.modal.open(this.steps[dotIndex], null, useButton, "Start a Breakout", false, { parent: this.parent });
    });

    for (let i = 0; i < dotChildren.length; i++) {
      let child = dotChildren[i];
      if (i < this.step) {
        child.setAttribute("past", "");
      } else {
        break;
      }
    }
    progressDot.setAttribute("selected", "");

    //this.updateFooter();
  }
}

modules["modals/lesson/newbreakout/template"] = class extends modules["breakout/overview/setup"] {
  step = 0;
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
  js = async (frame, extra) => {
    this.parent = extra.parent;

    this.setupFooter(extra);

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

    let nextButton = frame.querySelector(".brSetupProgress button[next]");

    let updateTemplateTile = () => {
      if (this.parent.template == null) {
        return;
      }
      let placeholderThumbnail = currentTemplateTile.querySelector(".brtTemplateTileThumbnail[src]");
      let thumbnail = currentTemplateTile.querySelector(".brtTemplateTileThumbnail[main]");
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
      let titleText = this.parent.template.name ?? "Untitled Template";
      title.textContent = titleText;
      title.title = titleText;
      let changedTx = currentTemplateTile.querySelector(".brtTemplateTileLastChanged");
      let time = this.parent.template.lastThumbnail ?? this.parent.template.created;
      changedTx.textContent = timeSince(time, true);
      changedTx.title = formatFullDate(time);
    }
    let updateDisplayState = async () => {
      //this.updateFooter();
      let templateID = (this.parent.parent.parent.lesson.breakout ?? {}).template;
      if (templateID == null) {
        if ((this.parent.parent.parent.lesson.tool ?? []).includes("board") == false) {
          cloneButton.style.display = "none";
        }
        newOptions.style.display = "flex";
        currentTemplate.style.removeProperty("display");
        nextButton.setAttribute("hidden", "");
      } else {
        newOptions.style.removeProperty("display");
        currentTemplate.style.display = "flex";
        nextButton.removeAttribute("hidden");
        if (this.parent.template == null) {
          await this.parent.getTemplate();
          return updateDisplayState();
        }
        updateTemplateTile();
      }
    }

    let handleSet = (body) => {
      let set = body.set ?? body;
      if (set != null && (set.breakout ?? {}).hasOwnProperty("template") == true) {
        if (this.parent.parent.currentPagePath == "breakout/template" && ((this.parent.parent.pages["secondary"] ?? {}).template ?? {})._id != (this.parent.template ?? {})._id) {
          this.parent.parent.closePage("secondary");
          this.parent.parent.openPage("primary", "breakout/overview");
        }
        return updateDisplayState();
      }
      updateTemplateTile();
    }
    this.parent.pipeline.subscribe("newBreakoutModalSet", "set", handleSet, { sort: 2 });
    this.parent.pipeline.subscribe("newBreakoutModalSubSet", "subset", handleSet, { sort: 2 });
    
    let blankButton = newOptions.querySelector('.brtButton[type="blank"]');
    blankButton.addEventListener("click", () => {
      extra.modal.open("modals/lesson/newboard", null, blankButton, "Create the Template", null, { parent: this, requestPath: "lessons/breakout/template/new", callback: async ({ body }) => {
        extra.modal.open("modals/lesson/newbreakout", null, blankButton, "Start a Breakout", false, { parent: this.parent, template: body });
        this.parent.parent.openPage("secondary", "breakout/template", { template: body });
      } });
    });

    let cloneButton = newOptions.querySelector('.brtButton[type="clone"]');
    cloneButton.addEventListener("click", async () => {
      cloneButton.setAttribute("disabled", "");
      await sendRequest("POST", "lessons/breakout/template/new", { duplicate: true }, { session: this.parent.parent.session });
      cloneButton.removeAttribute("disabled");
    });

    let duplicateButton = newOptions.querySelector('.brtButton[type="duplicate"]');
    duplicateButton.addEventListener("click", () => {
      extra.modal.open("modals/lesson/newbreakout/templates", null, duplicateButton, "Past Templates", null, { parent: this });
    });

    currentTemplateTile.addEventListener("click", () => {
      this.parent.parent.openPage("secondary", "breakout/template", { template: this.parent.template });
    });
    currentTemplateEdit.addEventListener("click", () => {
      this.parent.parent.openPage("secondary", "breakout/template", { template: this.parent.template });
    });
    currentTemplateChange.addEventListener("click", async () => {
      currentTemplateChange.setAttribute("disabled", "");
      await sendRequest("DELETE", "lessons/breakout/template/remove?template=" + this.parent.template._id, null, { session: this.parent.parent.session });
      currentTemplateChange.removeAttribute("disabled", "");
    });

    setSVG(blankButton.querySelector("div[image]"), "../images/editor/breakout/blank.svg");
    setSVG(cloneButton.querySelector("div[image]"), "../images/editor/breakout/clone.svg");
    setSVG(duplicateButton.querySelector("div[image]"), "../images/editor/breakout/duplicate.svg");

    updateDisplayState();
  }
}
modules["modals/lesson/newbreakout"] = class extends modules["modals/lesson/newbreakout/template"] {}

modules["modals/lesson/newbreakout/templates"] = class {
  maxHeight = 600;
  html = `<div class="brttTemplateTilesHolder">
    <div class="brttTemplateTiles"></div>
    <div class="brttNoTemplates">
      <img class="brttNoTemplatesImage" src="../images/dashboard/nolessons.png" />
      <div class="brttNoTemplatesTitle">No Templates... Yet!</div>
    </div>
  </div>`;
  css = {
    ".brttTemplateTilesHolder": `position: relative; display: flex; flex-direction: column; width: 500px; max-width: 100%; min-height: 100px; text-align: center; align-items: center; z-index: 1`,
    ".brttTemplateTiles": `position: relative; display: grid; box-sizing: border-box; width: 100%; padding: 8px; grid-gap: 16px; grid-template-columns: repeat(auto-fill, minmax(min(234px, 100%), 1fr)); transition: .4s`, // min-height: 100%;
    ".brttTemplateTile": `position: relative; background: var(--pageColor); --shadow: var(--lightShadow); box-shadow: var(--shadow); border-radius: 12px; overflow: hidden`,
    ".brttTemplateTile:hover": `--shadow: var(--darkShadow)`,
    ".brttTemplateTileThumbnailHolder": `position: relative; width: 100%; aspect-ratio: 4/3`,
    ".brttTemplateTileThumbnail": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; border-radius: 12px; opacity: 0; pointer-events: none`,
    'html[theme="dark"] .brttTemplateTileThumbnail': `filter: brightness(50%)`,
    ".brttTemplateTile:hover .brttTemplateTileThumbnail": `filter: brightness(100%)`,
    ".brttTemplateTileInfoHolder": `position: absolute; display: flex; box-sizing: border-box; width: 100%; padding: 10px; left: 0px; bottom: 0px; align-items: flex-end; background: var(--pageColor); box-shadow: var(--shadow)`,
    ".brttTemplateTileInfo": `width: 100%`,
    ".brttTemplateTileTitle": `box-sizing: border-box; width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".brttTemplateTileLastOpened": `width: 100%; color: var(--theme); margin-top: 2px; font-size: 14px; font-weight: 600; text-align: left`,
    ".brttNoTemplates": `display: none; flex-direction: column; width: 100%; height: fit-content; margin: 16px; align-items: center`,
    ".brttNoTemplatesImage": `width: 100%; max-width: 300px`,
    ".brttNoTemplatesTitle": `margin-top: 24px; font-size: 20px; font-weight: 700; color: var(--theme)`
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    let scrollContainer = frame.closest(".modalContent");
    let tileHolder = frame.querySelector(".brttTemplateTiles");
    let noTemplates = frame.querySelector(".brttNoTemplates");

    let addTile = (template, insertFirst) => {
      if (template == null) {
        return;
      }
      let tile = tileHolder.querySelector('.brttTemplateTile[template="' + template._id + '"');
      if (tile == null) {
        let insertAdj = "beforeend";
        if (insertFirst == true) {
          insertAdj = "afterbegin";
        }
        if (insertFirst == true && tileHolder.firstChild != null && template.created < parseInt(tileHolder.firstChild.getAttribute("time"))) {
          return;
        }
        tileHolder.insertAdjacentHTML(insertAdj, `<a class="brttTemplateTile" draggable="false" new>
          <div class="brttTemplateTileThumbnailHolder">
            <img class="brttTemplateTileThumbnail" src="../images/dashboard/placeholder.png" />
            <img class="brttTemplateTileThumbnail" main />
          </div>
          <div class="brttTemplateTileInfoHolder">
            <div class="brttTemplateTileInfo">
              <div class="brttTemplateTileTitle"></div>
              <div class="brttTemplateTileLastOpened"></div>
            </div>
          </div>
          </div>
        </a>`);
        tile = tileHolder.querySelector(".brttTemplateTile[new]");
        tile.removeAttribute("new");
        tile.setAttribute("template", template._id);
      }
      let placeholderThumbnail = tile.querySelector(".brttTemplateTileThumbnail[src]");
      let thumbnail = tile.querySelector(".brttTemplateTileThumbnail[main]");
      if (template.thumbnail != null) {
        let setThumbnail = assetURL + template.thumbnail;
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
      let title = tile.querySelector(".brttTemplateTileTitle");
      if (template.hasOwnProperty("name") == true || title.textContent == "") {
        let titleText = template.name ?? "Untitled Template";
        title.textContent = titleText;
        title.title = titleText;
      }
      if (template.hasOwnProperty("created") == true) {
        let time = template.created;
        tile.setAttribute("time", time);
        let openedTx = tile.querySelector(".brttTemplateTileLastOpened");
        openedTx.textContent = timeSince(time, true);
        openedTx.title = formatFullDate(time);
      }
    }

    this.parent.parent.parent.pipeline.subscribe("newBreakoutModalTemplatesUpdate", "templateset", (body) => { addTile({ ...body, _id: (body._id ?? body.id) }, body.created != null); });

    let allLoaded = false;
    let loading = false;
    let fetchTemplates = async () => {
      if (allLoaded == true || loading == true) {
        return;
      }
      loading = true;
      tileHolder.setAttribute("disabled", "");
      let path = "lessons/breakout/template";
      let lastTile = tileHolder.lastElementChild;
      if (lastTile != null) {
        path += "?before=" + lastTile.getAttribute("time");
      }
      let [code, body] = await sendRequest("GET", path);
      tileHolder.removeAttribute("disabled");
      loading = false;
      if (code != 200) {
        return;
      }
      if (body.length < 25) {
        allLoaded = true;
      }
      for (let i = 0; i < body.length; i++) {
        addTile(body[i]);
      }
      if (tileHolder.childElementCount > 0) {
        noTemplates.style.removeProperty("display");
      } else {
        noTemplates.style.display = "flex";
      }
    }

    scrollContainer.addEventListener("scroll", () => {
      if (scrollContainer.scrollTop + scrollContainer.clientHeight + 250 > scrollContainer.scrollHeight && tileHolder.clientHeight > scrollContainer.clientHeight) {
        fetchTemplates();
      }
    });

    tileHolder.addEventListener("click", async (event) => {
      let tile = event.target.closest(".brttTemplateTile");
      if (tile == null) {
        return;
      }
      let templateID = tile.getAttribute("template");
      if (templateID == null) {
        return;
      }
      tileHolder.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/breakout/template/set", { template: templateID }, { session: this.parent.parent.parent.session });
      tileHolder.removeAttribute("disabled");
      if (code == 200) {
        extra.modal.open("modals/lesson/newbreakout", null, tile, "Start a Breakout", false, { parent: this.parent.parent, template: body });
      }
    });

    await fetchTemplates();
  }
}

modules["modals/lesson/newbreakout/setuptype"] = class extends modules["breakout/overview/setup"] {
  step = 1;
  html = `
  <div class="brosOptionsHolder">
    <div class="brosInstructions">
      <div class="brosTitle">How to <b>Setup the Teams</b>?</div>
    </div>
    <div class="brosOptions">
      <button class="brosOption" type="auto">
        <div image style="--image: url('../images/editor/breakout/autopair.png')"></div>
        <div content>
          <div title>AutoPair</div>
          <div info>Automatically distribute members into solo boards or teams of same size.</div>
        </div>
      </button>
      <button class="brosOption" type="teamup">
        <div image style="--image: url('../images/editor/breakout/teamup.png')"></div>
        <div content>
          <div title>Team Up</div>
          <div info>Allow members to create or join a team of their choosing.</div>
        </div>
      </button>
      <button class="brosOption" type="manual">
        <div image style="--image: url('../images/editor/breakout/manual.png')"></div>
        <div content>
          <div title>Manual</div>
          <div info>Create groupings and assign members to each one-by-one.</div>
        </div>
      </button>
    </div>
  </div>
  ${this.progressFooter}
  `;
  css = {
    ".brosOptionsHolder": `position: relative; display: flex; flex-direction: column; width: 598px; max-width: calc(100% - 16px); padding: 8px; text-align: center; align-items: center; z-index: 1`,
    ".brosInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brosTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brosTitle b": `color: var(--theme); font-weight: 700`,
    ".brosOptions": `box-sizing: border-box; display: flex; flex-wrap: wrap; width: fit-content; width: 100%; padding: 4px; gap: 10px; justify-content: center`,
    ".brosOption": `position: relative; display: flex; flex-direction: column; flex: 1 1 190px; max-width: 190px; height: 278px; padding: 4px; overflow: hidden; background: var(--pageColor); box-shadow: inset var(--lightShadow); border-radius: 16px`,
    ".brosOption[selected]": `background: var(--theme)`,
    ".brosOption:hover": `box-shadow: inset var(--darkShadow)`,
    ".brosOption div[image]": `position: relative; width: 100%; height: 182px`,
    ".brosOption div[image]:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: var(--image); background-size: contain`,
    ".brosOption[selected] div[image]:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: var(--image); background-size: contain; filter: brightness(0) invert(1)`,
    //".brosOption[selected] img[test]": `filter: brightness(0) invert(1)`,
    ".brosOption div[content]": `position: absolute; box-sizing: border-box; width: calc(100% - 12px); left: 6px; bottom: 6px; padding: 6px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 10px`,
    ".brosOption[selected] div[content]": `box-shadow: inset var(--lightShadow);`,
    ".brosOption div[content] div[title]": `width: 100%; font-size: 18px; font-weight: 700; color: var(--theme); transition: .2s`,
    ".brosOption:hover div[content] div[title]": `padding: 2px 0; transform: scale(1.2)`,
    ".brosOption div[content] div[info]": `width: 100%; margin-top: 4px; font-size: 12px`,

    ...this.progressFooterStyles
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    this.setupFooter(extra);

    let optionHolder = frame.querySelector(".brosOptions");

    /*let updateDisplayState = (set) => {
      //this.updateFooter();
      let prevSelected = optionHolder.querySelector(".brosOption[selected]");
      if (prevSelected != null) {
        prevSelected.removeAttribute("selected");
      }
      let newSelect = optionHolder.querySelector('.brosOption[type="' + (set ?? (this.parent.parent.parent.lesson.breakout ?? {}).mode) + '"]');
      if (newSelect != null) {
        newSelect.setAttribute("selected", "");
      }
    }
    this.parent.pipeline.subscribe("newBreakoutModalSet", "set", () => { updateDisplayState(); }, { sort: 2 });*/

    optionHolder.addEventListener("click", async (event) => {
      let option = event.target.closest(".brosOption");
      if (option == null) { // || option.hasAttribute("selected") == true) {
        return this.goNext();
      }
      optionHolder.setAttribute("disabled", "");
      let type = option.getAttribute("type");
      //updateDisplayState(type);
      await sendRequest("PUT", "lessons/breakout/mode", { mode: type }, { session: this.parent.parent.session });
      /*let [code] = 
      if (code != 200) {
        updateDisplayState();
      }*/
      optionHolder.removeAttribute("disabled");
      this.goNext();
    });

    //updateDisplayState();
  }
}

modules["modals/lesson/newbreakout/options"] = class extends modules["breakout/overview/setup"] {
  step = 2;
  maxHeight = 520;
  html = `
    <div class="brooSettingsHolder">
      <div class="brooSetting" section="autopair">
        <button class="brooSettingButton" option="autopair">
          <div class="brooSettingDetails">
            <div title>AutoPair</div>
            <div info>Configure Markify to scale teams and members automatically.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <div class="brooSettingButton" option="autopairtype">
          <div class="brooSettingDetails">
            <div title>Mode</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooOptionSelector"><button set="scale">Scale Teams</button><button set="assign">Assign Members</button></div>
          </div>
        </div>
        <div class="brooSettingButton" option="autopairsize">
          <div class="brooSettingDetails">
            <div title>Team Size</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooOptionSelector"><button set="1">Solo</button><button set="2">Duo</button><button set="3">Trio</button><button set="4">Custom</button></div>
            <div class="brooCounterSelector"><button minus>-</button><div count contenteditable></div><button plus>+</button></div>
          </div>
        </div>
        <div class="brooSettingButton" option="autopairgroups">
          <div class="brooSettingDetails">
            <div title>Number of Groups</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooCounterSelector"><button minus>-</button><div count max="100" contenteditable></div><button plus>+</button></div>
          </div>
        </div>
        <!--<button class="brooSettingButton" option="autopairpastgrouping">
          <div class="brooSettingDetails">
            <div title>Use Past Groupings</div>
            <div info>Uses data from past Breakout sessions to pair the same members together.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>-->
      </div>
      <div class="brooSetting" section="pickteam">
        <button class="brooSettingButton" option="pickteam">
          <div class="brooSettingDetails">
            <div title>Pick Team</div>
            <div info>Let members choose their team.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <button class="brooSettingButton" option="changeteam">
          <div class="brooSettingDetails">
            <div title>Change Teams</div>
            <div info>Allow members to change between teams after joining.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <button class="brooSettingButton" option="createteam">
          <div class="brooSettingDetails">
            <div title>Create a Team</div>
            <div info>Allow members to create their own team.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <div class="brooSettingButton" option="maxteamsize">
          <div class="brooSettingDetails">
            <div title>Max Team Size</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooCounterSelector"><button reset>Reset</button><button minus>-</button><div count min="0" contenteditable></div><button plus>+</button></div>
          </div>
        </div>
      </div>
      <div class="brooSetting">
        <button class="brooSettingButton" option="gallerywalk">
          <div class="brooSettingDetails">
            <div title>Gallery Walk</div>
            <div info>Allow members to see other team's work for ideas and inspiration.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
      </div>
      <div class="brooSetting">
        <button class="brooSettingButton" option="setteamname">
          <div class="brooSettingDetails">
            <div title>Change Team Name</div>
            <div info>Allow members to change the team's name.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
      </div>
    </div>
    ${this.progressFooter}
  `;
  css = {
    ".brooSettingsHolder": `position: relative; display: flex; flex-direction: column; gap: 16px; width: 400px; max-width: calc(100% - 32px); padding: 16px; text-align: center; align-items: center; z-index: 1`,
    ".brooSetting": `display: flex; flex-direction: column; box-sizing: border-box; width: 100%`,
    ".brooSettingButton": `display: flex; flex-wrap: wrap; gap: 8px; flex: 1; padding: 8px; justify-content: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 24px`,
    ".brooSettingButton[enabled]": `--themeColor: var(--theme); --titleBackground: var(--theme); --titleColor: #fff`,
    ".brooSettingButton:not([enabled])": `--themeColor: var(--gray); --titleBackground: var(--pageColor); --titleColor: var(--theme)`,
    ".brooSetting[open] .brooSettingButton:not(:last-child)": `margin-bottom: 8px; border-bottom-right-radius: 8px`,
    ".brooSetting .brooSettingButton:not(:first-child)": `margin-left: min(25px, 10%); border-top-left-radius: 8px; border-top-right-radius: 8px`,
    ".brooSetting .brooSettingButton:not(:first-child):not(:last-child)": `border-bottom-left-radius: 8px`,
    ".brooSetting:not([open]) .brooSettingButton:not(:first-child)": `display: none`,
    ".brooSettingDetails": `display: flex; flex-direction: column; flex: 1 1 100px`,
    ".brooSettingDetails div[title]": `width: fit-content; padding: 4px 8px; background: var(--titleBackground); box-shadow: var(--lightShadow); font-size: 20px; font-weight: 700; color: var(--titleColor); word-wrap: break-word; border-radius: 16px; transition: .2s`,
    ".brooSettingDetails div[info]": `margin: 6px 0 0 12px; font-size: 14px; text-align: left`,
    ".brooSettingToggleHolder div[toggle]": `position: relative; box-sizing: border-box; width: 50px; height: 32px; padding: 4px; background: var(--themeColor); border-radius: 16px; transition: .2s`,
    ".brooSettingToggleHolder div[toggle] div": `position: absolute; width: 24px; height: 24px; background: var(--pageColor); border-radius: 12px; transition: .2s`,
    ".brooSettingButton[enabled] .brooSettingToggleHolder div[toggle] div": `right: 4px`,
    ".brooSettingButton:not([enabled]) .brooSettingToggleHolder div[toggle] div": `right: calc(100% - 28px)`,
    ".brooOptionSelector": `display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; justify-content: center`,
    ".brooOptionSelector button": `min-height: 24px; padding: 0 6px; align-content: center; border-radius: 12px; font-size: 14px; font-weight: 600`,
    ".brooOptionSelector button:hover": `background: var(--hover)`,
    ".brooOptionSelector button[selected]": `background: var(--theme) !important; color: #fff !important`,
    ".brooCounterSelector": `display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; justify-content: center`,
    ".brooCounterSelector button": `display: flex; width: 24px; height: 24px; justify-content: center; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); color: var(--theme); font-size: 26px; font-weight: 600; line-height: 0`,
    ".brooCounterSelector button:hover": `background: var(--theme); color: #fff !important`,
    ".brooCounterSelector button[reset]": `display: none; width: fit-content; border-radius: 12px; color: var(--textColor); font-size: 14px; font-weight: 600`,
    ".brooCounterSelector button[minus]": `border-radius: 12px 6px 6px 12px`,
    ".brooCounterSelector button[plus]": `border-radius: 6px 12px 12px 6px`,
    ".brooCounterSelector div[count]": `min-width: 16px; max-width: 32px; height: 24px; padding: 0 8px; align-content: center; background: var(--theme); border-radius: 6px; outline: unset; color: #fff; font-size: 16px; font-weight: 700; white-space: nowrap; overflow-x: auto; scrollbar-width: none; pointer-events: all !important`,
    ...this.progressFooterStyles
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    this.setupFooter(extra);

    let holder = frame.querySelector(".brooSettingsHolder");

    let autoPairSection = holder.querySelector('.brooSetting[section="autopair"]');
    let autoPairOption = autoPairSection.querySelector('.brooSettingButton[option="autopair"]');
    let autoPairTypeOption = autoPairSection.querySelector('.brooSettingButton[option="autopairtype"]');
    let autoPairSizeOption = autoPairSection.querySelector('.brooSettingButton[option="autopairsize"]');
    let autoPairSizeOptions = autoPairSizeOption.querySelector(".brooOptionSelector");
    let autoPairSizeCounter = autoPairSizeOption.querySelector(".brooCounterSelector");
    let autoPairSizeCount = autoPairSizeCounter.querySelector("div[count]");
    let autoPairGroupsOption = autoPairSection.querySelector('.brooSettingButton[option="autopairgroups"]');
    let autoPairGroupsCounter = autoPairGroupsOption.querySelector(".brooCounterSelector");
    let autoPairGroupsCount = autoPairGroupsCounter.querySelector("div[count]");
    //let autoPairUsePastGroupingOption = autoPairSection.querySelector('.brooSettingButton[option="autopairpastgrouping"]');

    let pickTeamSection = holder.querySelector('.brooSetting[section="pickteam"]');
    let pickTeamOption = pickTeamSection.querySelector('.brooSettingButton[option="pickteam"]');
    let changeTeamOption = pickTeamSection.querySelector('.brooSettingButton[option="changeteam"]');
    let createTeamOption = pickTeamSection.querySelector('.brooSettingButton[option="createteam"]');
    let maxTeamSizeOption = pickTeamSection.querySelector('.brooSettingButton[option="maxteamsize"]');
    let maxTeamSizeCounter = maxTeamSizeOption.querySelector(".brooCounterSelector");
    let maxTeamSizeCount = maxTeamSizeCounter.querySelector("div[count]");

    let galleryWalkOption = frame.querySelector('.brooSettingButton[option="gallerywalk"]');

    let setTeamNameOption = frame.querySelector('.brooSettingButton[option="setteamname"]');

    let config = copyObject(this.parent.parent.parent.lesson.breakout ?? {});
    let updateDisplayState = (set = {}) => {
      //this.updateFooter();
      
      if (set.breakout != null) {
        objectUpdate(set.breakout, config);
      }

      if (config.auto != null && config.auto.enabled != false) {
        autoPairOption.setAttribute("enabled", "");
        
        let type = config.auto.type ?? "scale";
        let prevSelectedTypeOption = autoPairTypeOption.querySelector("button[set][selected]");
        if (prevSelectedTypeOption != null) {
          prevSelectedTypeOption.removeAttribute("selected");
        }
        if (type != null) {
          let selectedTypeOption = autoPairTypeOption.querySelector('button[set="' + type + '"]');
          if (selectedTypeOption != null) {
            selectedTypeOption.setAttribute("selected", "");
          }
        }
        if (type == "scale") {
          let size = config.auto.size ?? 1;
          let prevSelectedSizeOption = autoPairSizeOptions.querySelector("button[set][selected]");
          if (prevSelectedSizeOption != null) {
            prevSelectedSizeOption.removeAttribute("selected");
          }
          if (size < 4) {
            let selectedOption = autoPairSizeOptions.querySelector('button[set="' + size + '"]');
            if (selectedOption != null) {
              selectedOption.setAttribute("selected", "");
            }
            autoPairSizeCounter.style.display = "none";
            autoPairSizeOptions.style.removeProperty("display");
          } else {
            if (document.activeElement != autoPairSizeCount) {
              autoPairSizeCount.textContent = size;
            }
            autoPairSizeOptions.style.display = "none";
            autoPairSizeCounter.style.removeProperty("display");
          }

          autoPairSection.insertBefore(autoPairGroupsOption, autoPairSizeOption);
          autoPairGroupsOption.style.display = "none";
          autoPairSizeOption.style.removeProperty("display");
        } else if (type == "assign") {
          let groups = config.auto.groups ?? 1;
          if (document.activeElement != autoPairGroupsCount) {
            autoPairGroupsCount.textContent = groups;
          }
          if (groups < 2) {
            autoPairGroupsCounter.querySelector("button[minus]").setAttribute("disabled", "");
          } else {
            autoPairGroupsCounter.querySelector("button[minus]").removeAttribute("disabled");
          }
          if (groups > 99) {
            autoPairGroupsCounter.querySelector("button[plus]").setAttribute("disabled", "");
          } else {
            autoPairGroupsCounter.querySelector("button[plus]").removeAttribute("disabled");
          }

          autoPairSection.insertBefore(autoPairSizeOption, autoPairGroupsOption);
          autoPairSizeOption.style.display = "none";
          autoPairGroupsOption.style.removeProperty("display");
        }

        /*if (config.auto.usePastGrouping == true) {
          autoPairUsePastGroupingOption.setAttribute("enabled", "");
        } else {
          autoPairUsePastGroupingOption.removeAttribute("enabled");
        }*/

        autoPairSection.setAttribute("open", "");
      } else {
        autoPairSection.removeAttribute("open");
        autoPairOption.removeAttribute("enabled");
      }

      if ((config.options ?? {}).pickTeam == true) {
        pickTeamOption.setAttribute("enabled", "");

        if (config.options.changeTeam == true) {
          changeTeamOption.setAttribute("enabled", "");
        } else {
          changeTeamOption.removeAttribute("enabled");
        }
        if (config.options.createTeam == true) {
          createTeamOption.setAttribute("enabled", "");
        } else {
          createTeamOption.removeAttribute("enabled");
        }
        let maxSize = config.options.maxSize ?? 0;
        if (document.activeElement != maxTeamSizeCount) {
          maxTeamSizeCount.textContent = maxSize;
        }
        if (maxSize < 1) {
          maxTeamSizeCount.setAttribute("disabled", "");
          maxTeamSizeCounter.querySelector("button[minus]").setAttribute("disabled", "");
          maxTeamSizeCounter.querySelector("button[reset]").style.removeProperty("display");
        } else {
          maxTeamSizeCount.removeAttribute("disabled");
          maxTeamSizeCounter.querySelector("button[minus]").removeAttribute("disabled");
          maxTeamSizeCounter.querySelector("button[reset]").style.display = "flex";
        }

        pickTeamSection.setAttribute("open", "");
      } else {
        pickTeamSection.removeAttribute("open");
        pickTeamOption.removeAttribute("enabled");
      }

      if ((config.options ?? {}).galleryWalk == true) {
        galleryWalkOption.setAttribute("enabled", "");
      } else {
        galleryWalkOption.removeAttribute("enabled");
      }

      if ((config.options ?? {}).setTeamName == true) {
        setTeamNameOption.setAttribute("enabled", "");
      } else {
        setTeamNameOption.removeAttribute("enabled");
      }
    }
    this.parent.pipeline.subscribe("newBreakoutModalSet", "set", updateDisplayState, { sort: 2 });

    let saveOptionsTimeout;
    let saveOption = async () => {
      let currentConfig = this.parent.parent.parent.lesson.breakout ?? {};
      let tempRevert = copyObject(currentConfig);
      let changes = objectUpdate(config, copyObject(currentConfig));
      if (Object.keys(changes).length > 0) {
        let [code] = await sendRequest("PUT", "lessons/breakout/settings", { save: changes }, { session: this.parent.parent.session });
        if (code != 200) {
          config = tempRevert;
          objectUpdate(config, this.parent.parent.parent.lesson.breakout);
          updateDisplayState();
        }
      }
    }
    this.savePreferences = async (delay) => {
      updateDisplayState();
      clearTimeout(saveOptionsTimeout);
      if (delay != true) {
        return await saveOption();
      }
      saveOptionsTimeout = setTimeout(saveOption, 2000); // Save after 2 seconds of no changes
    }

    autoPairOption.addEventListener("click", () => {
      config.auto = config.auto ?? {};
      config.auto.enabled = !autoPairOption.hasAttribute("enabled");
      this.savePreferences();
    });
    autoPairTypeOption.addEventListener("click", (event) => {
      let option = event.target.closest("button[set]");
      if (option == null) {
        return;
      }
      config.auto = config.auto ?? {};
      config.auto.type = option.getAttribute("set");
      this.savePreferences();
    });
    autoPairSizeOption.addEventListener("click", (event) => {
      let option = event.target.closest("button[set]");
      if (option == null) {
        return;
      }
      config.auto = config.auto ?? {};
      config.auto.size = parseInt(option.getAttribute("set"));
      this.savePreferences();
    });
    autoPairSizeCounter.querySelector("button[minus]").addEventListener("click", () => {
      config.auto = config.auto ?? {};
      config.auto.size = (config.auto.size ?? 0) - 1;
      this.savePreferences(true);
    });
    autoPairSizeCount.addEventListener("focusout", () => {
      config.auto = config.auto ?? {};
      let textInt = parseFloat(autoPairSizeCount.textContent) || (config.auto.size ?? 0);
      if (autoPairSizeCount.hasAttribute("max") == true && textInt > parseFloat(autoPairSizeCount.getAttribute("max"))) {
        textInt = autoPairSizeCount.getAttribute("max");
      } else if (textInt < 1) {
        textInt = 1;
      }
      config.auto.size = textInt;
      this.savePreferences();
    });
    autoPairSizeCounter.querySelector("button[plus]").addEventListener("click", () => {
      config.auto = config.auto ?? {};
      config.auto.size = (config.auto.size ?? 0) + 1;
      this.savePreferences(true);
    });
    autoPairGroupsCounter.querySelector("button[minus]").addEventListener("click", () => {
      config.auto = config.auto ?? {};
      config.auto.groups = (config.auto.groups ?? 0) - 1;
      this.savePreferences(true);
    });
    autoPairGroupsCount.addEventListener("focusout", () => {
      config.auto = config.auto ?? {};
      let textInt = parseFloat(autoPairGroupsCount.textContent) || (config.auto.groups ?? 0);
      if (autoPairGroupsCount.hasAttribute("max") == true && textInt > parseFloat(autoPairGroupsCount.getAttribute("max"))) {
        textInt = autoPairGroupsCount.getAttribute("max");
      } else if (textInt < 1) {
        textInt = 1;
      }
      config.auto.groups = textInt;
      this.savePreferences();
    });
    autoPairGroupsCounter.querySelector("button[plus]").addEventListener("click", () => {
      config.auto = config.auto ?? {};
      config.auto.groups = (config.auto.groups ?? 0) + 1;
      this.savePreferences(true);
    });
    /*autoPairUsePastGroupingOption.addEventListener("click", () => {
      config.auto = config.auto ?? {};
      config.auto.usePastGrouping = !autoPairUsePastGroupingOption.hasAttribute("enabled");
      this.savePreferences();
    });*/

    pickTeamOption.addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.pickTeam = !pickTeamOption.hasAttribute("enabled");
      this.savePreferences();
    });
    changeTeamOption.addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.changeTeam = !changeTeamOption.hasAttribute("enabled");
      this.savePreferences();
    });
    createTeamOption.addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.createTeam = !createTeamOption.hasAttribute("enabled");
      this.savePreferences();
    });
    maxTeamSizeCounter.querySelector("button[reset]").addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.maxSize = 0;
      this.savePreferences(true);
    });
    maxTeamSizeCounter.querySelector("button[minus]").addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.maxSize = (config.options.maxSize ?? 0) - 1;
      this.savePreferences(true);
    });
    maxTeamSizeCount.addEventListener("focusout", () => {
      config.options = config.options ?? {};
      let textInt = parseFloat(maxTeamSizeCount.textContent) || (config.options.maxSize ?? 0);
      if (maxTeamSizeCount.hasAttribute("max") == true && textInt > parseFloat(maxTeamSizeCount.getAttribute("max"))) {
        textInt = maxTeamSizeCount.getAttribute("max");
      } else if (textInt < 1) {
        textInt = 0;
      }
      config.options.maxSize = textInt;
      this.savePreferences();
    });
    maxTeamSizeCounter.querySelector("button[plus]").addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.maxSize = (config.options.maxSize ?? 0) + 1;
      this.savePreferences(true);
    });

    galleryWalkOption.addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.galleryWalk = !galleryWalkOption.hasAttribute("enabled");
      this.savePreferences();
    });

    setTeamNameOption.addEventListener("click", () => {
      config.options = config.options ?? {};
      config.options.setTeamName = !setTeamNameOption.hasAttribute("enabled");
      this.savePreferences();
    });

    holder.addEventListener("mousedown", (event) => {
      let textBox = event.target.closest("div[count]");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
      textBox.removeAttribute("disabled");
    });
    holder.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div[count]");
      if (textBox == null) {
        return;
      }
      if (event.key == "Enter") {
        event.preventDefault();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key && (event.keyCode != 190 || textBox.hasAttribute("nodecimal"))) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textBox.hasAttribute("max") == true && textInt > parseFloat(textBox.getAttribute("max"))) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than " + textBox.getAttribute("max"));
        } else if (textInt < parseFloat(textBox.getAttribute("min") ?? "1")) {
          event.preventDefault();
          textBoxError(textBox, "Must be greater than 1");
        }
      }
    });

    updateDisplayState();
  }
}

modules["modals/lesson/newbreakout/review"] = class extends modules["breakout/overview/setup"] {
  step = 3;
  html = `
    <div class="brorHolder">
      <div class="brorInstructions">
        <div class="brorTitle">Review & <b>Breakout</b></div>
        <div class="brorDesc">Does everything look good?</div>
      </div>
      <div class="brorTiles">
        <button class="brorTile" type="template">
          <div missing><div image></div><div><b>Template Missing</b> Please add a template to continue.</div></div>
          <div template hidden><div image><img src="../images/dashboard/placeholder.png"></div><div content><div name></div><div info></div></div></div>
        </button>
        <button class="brorTile" type="setup">
          <div></div>
        </button>
        <button class="brorTile" type="settings">
          <div unset>No additional options enabled...</div>
          <div option="pickTeam"><div check></div><div>Members can choose their team.</div></div>
          <div option="changeTeam"><div check></div><div>Members can change teams.</div></div>
          <div option="createTeam"><div check></div><div>Members can create a new team.</div></div>
          <div option="maxSize"><div check></div><div>Max team size of <b></b>.</div></div>
          <div option="galleryWalk"><div check></div><div>Members can see other team's work.</div></div>
          <div option="setTeamName"><div check></div><div>Members can change the team name.</div></div>
        </button>
      </div>
      <button class="brorCreateTeams largeButton" disabled>Create Breakouts</button>
    </div>
    ${this.progressFooter}
  `;
  css = {
    ".brorHolder": `position: relative; display: flex; flex-direction: column; max-width: calc(100% - 16px); padding: 8px; text-align: center; align-items: center; z-index: 1`,
    ".brorInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brorTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brorTitle b": `color: var(--theme); font-weight: 700`,
    ".brorDesc": `width: 325px; max-width: 100%; margin-top: 6px; font-size: 16px`,
    ".brorTiles": `box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 8px; align-items: center`,
    ".brorTile": `width: 300px; max-width: 100%; padding: 12px; text-align: left; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px`,
    ".brorTile:hover": `box-shadow: var(--darkShadow)`,
    ".brorTile:first-child": `border-top-left-radius: 24px; border-top-right-radius: 24px`,
    ".brorTile:last-child": `border-bottom-left-radius: 24px; border-bottom-right-radius: 24px`,

    '.brorTile[type="template"] div[missing]': `display: none; gap: 4px; align-items: center`,
    '.brorTile[type="template"] div[missing] div[image]': `width: 32px; height: 32px; margin: 4px; flex-shrink: 0`,
    '.brorTile[type="template"] div[missing] div[image] svg': `width: 100%; height: 100%`,
    '.brorTile[type="template"] div[missing] div b': `display: block; margin-bottom: 2px; font-size: 16px; color: var(--error)`,
    '.brorTile[type="template"] div[template]': `display: none; flex-wrap: wrap; gap: 12px; transition: .2s`,
    '.brorTile[type="template"] div[template] div[image]': `height: fit-content; padding: 4px; box-shadow: inset var(--lightShadow); border-radius: 12px`,
    '.brorTile[type="template"] div[template] div[image] img': `display: block; width: 80px; height: 60px; object-fit: cover; border-radius: 8px`,
    '.brorTile[type="template"] div[template] div[content]': `display: flex; flex: 1 1 100px; flex-direction: column; gap: 4px; justify-content: center`,
    '.brorTile[type="template"] div[template] div[content] div[name]': `font-size: 18px; font-weight: 700; color: var(--theme)`,
    '.brorTile[type="template"] div[template] div[content] div[info]': `font-weight: 600`,

    '.brorTile[type="setup"] div': `font-size: 14px; text-align: center`,
    '.brorTile[type="setup"] div b': `color: var(--theme)`,

    '.brorTile[type="settings"] div[unset]': `display: none; font-size: 14px; text-align: center`,
    '.brorTile[type="settings"] div[option]': `display: none; gap: 4px; align-items: flex-start`,
    '.brorTile[type="settings"] div[option] div[check]': `width: 20px; height: 20px; flex-shrink: 0`,
    '.brorTile[type="settings"] div[option] div[check] svg': `width: 100%; height: 100%`,
    '.brorTile[type="settings"] div[option] div': `min-height: 20px; font-size: 13px; align-content: center`,

    ".brorCreateTeams": `--themeColor: var(--theme); --borderRadius: 14px; margin: 16px 0 8px 0`,
    ...this.progressFooterStyles
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    let sections = frame.querySelector(".brorTiles");
    let templateSection = sections.querySelector('.brorTile[type="template"]');
    let templateMissing = templateSection.querySelector("div[missing]");
    let templateHolder = templateSection.querySelector("div[template]");
    let templateImage = templateHolder.querySelector("div[image] img");
    let templateName = templateHolder.querySelector("div[name]");
    let templateInfo = templateHolder.querySelector("div[info]");
    let setupSection = sections.querySelector('.brorTile[type="setup"]');
    let setupContent = setupSection.querySelector("div");
    let settingsSection = sections.querySelector('.brorTile[type="settings"]');
    let settingsUnset = settingsSection.querySelector("div[unset]");
    let settingsOptions = settingsSection.querySelectorAll("div[option]");

    let createTeamsButton = frame.querySelector(".brorCreateTeams");

    let updateDisplayState = async () => {
      //this.updateFooter();
      let config = this.parent.parent.parent.lesson.breakout ?? {};

      if (config.template != null) {
        (async () => {
          let template = await this.parent.getTemplate();
          if (template.thumbnail != null) {
            templateImage.src = assetURL + template.thumbnail;
          }
          let titleText = template.name ?? "Untitled Template";
          templateName.textContent = titleText;
          templateName.title = titleText;
          let time = template.lastThumbnail ?? template.created;
          templateInfo.textContent = timeSince(time, true);
          templateInfo.title = formatFullDate(time);
          templateHolder.removeAttribute("hidden");
        })();
        templateMissing.style.removeProperty("display");
        templateHolder.style.display = "flex";
        createTeamsButton.removeAttribute("disabled");
      } else {
        templateHolder.style.removeProperty("display");
        templateMissing.style.display = "flex";
        createTeamsButton.setAttribute("disabled", "");
      }

      let options = { ...(config.options ?? {}) };

      if (options.pickTeam != true) {
        delete options.changeTeam;
        delete options.createTeam;
        delete options.maxSize;
        if (config.auto != null && config.auto.enabled != false) {
          if (config.auto.type != "assign") {
            setupContent.innerHTML = "Markify will put <b size></b> into a team and create new teams <b>automatically</b>.";
            let size = config.auto.size ?? 1;
            setupContent.querySelector("b[size]").textContent = size + " member" + addS(size);
          } else {
            setupContent.innerHTML = "Markify will create <b groups>10 teams</b> and assign members <b>equally</b> into them.";
            let groups = config.auto.groups ?? 1;
            setupContent.querySelector("b[groups]").textContent = groups + " team" + addS(groups);
          }
        } else {
          setupContent.innerHTML = "You will be required to <b>create teams</b> and <b>assign members</b> into each.";
        }
      } else {
        if (config.auto != null && config.auto.enabled != false) {
          if (config.auto.type != "assign") {
            setupContent.innerHTML = "Markify will create enough teams to fit <b size></b> in each, then allow members to <b>choose their team</b>.";
            let size = config.auto.size ?? 1;
            setupContent.querySelector("b[size]").textContent = size + " member" + addS(size);
          } else {
            setupContent.innerHTML = "Markify will create <b groups></b>, then allow members to <b>choose their team</b>.";
            let groups = config.auto.groups ?? 1;
            setupContent.querySelector("b[groups]").textContent = groups + " team" + addS(groups);
          }
        } else {
          setupContent.innerHTML = "<div>Members will be asked to <b>create a team</b> or join an <b>existing team</b>.</div>";
        }
      }

      let enabledCount = 0;
      for (let i = 0; i < settingsOptions.length; i++) {
        let option = settingsOptions[i];
        let setting = option.getAttribute("option");
        if ((options[setting] ?? false) == false) {
          option.style.removeProperty("display");
        } else {
          option.style.display = "flex";
          if (setting == "maxSize") {
            let maxSize = options.maxSize ?? 1;
            option.querySelector("b").textContent = maxSize + " member" + addS(maxSize);
          }
          enabledCount++;
        }
      }
      if (enabledCount > 0) {
        settingsUnset.style.removeProperty("display");
      } else {
        settingsUnset.style.display = "block";
      }
    }
    this.parent.pipeline.subscribe("newBreakoutModalSet", "set", updateDisplayState, { sort: 2 });
    this.parent.pipeline.subscribe("newBreakoutModalSubSet", "subset", updateDisplayState, { sort: 2 });
    updateDisplayState();

    // Handle Buttons:
    templateSection.addEventListener("click", () => {
      this.modal.open(this.steps[0], null, this.modal.modal.modal.querySelector(".modalBack"), "Start a Breakout", null, { parent: this.parent });
    });
    setupSection.addEventListener("click", () => {
      this.modal.open(this.steps[1], null, this.modal.modal.modal.querySelector(".modalBack"), "Start a Breakout", null, { parent: this.parent });
    });
    settingsSection.addEventListener("click", () => {
      this.modal.open(this.steps[2], null, this.modal.modal.modal.querySelector(".modalBack"), "Start a Breakout", null, { parent: this.parent });
    });

    createTeamsButton.addEventListener("click", () => {

    });

    // Load SVGs:
    setSVG(templateMissing.querySelector("div[image]"), "../images/editor/breakout/error.svg");
    let settingOptions = settingsSection.querySelectorAll("div[check]");
    for (let i = 0; i < settingOptions.length; i++) {
      setSVG(settingOptions[i], "../images/editor/breakout/check.svg");
    }

    this.setupFooter(extra);
  }
}