modules["breakout/overview/setup"] = class {
  progressFooter = `
  <div class="brSetupProgress">
    <button class="largeButton" back hidden>Back</button>
    <div dots><button></button><button></button><button></button><button></button></div>
    <button class="largeButton" next hidden>Next</button>
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
    ".brSetupProgress div[dots] button[selected]": `background: var(--secondary); border-radius: 14px !important`,
    ".brSetupProgress div[dots] button[selected]:before": `content: ""; position: absolute; width: 40%; height: 40%; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--pageColor); border-radius: inherit`,
    ".brSetupProgress div[dots] button[done]": `background: var(--theme) !important`,
    ".brSetupProgress div[dots] button:not([selected])": `pointer-events: all`
  };
  steps = [
    "modals/lesson/newbreakout/template",
    "modals/lesson/newbreakout/setuptype",
    "modals/lesson/newbreakout/options",
    "modals/lesson/newbreakout/review"
  ];
  updateFooter = () => {
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
  }
  setupFooter = (extra) => {
    this.frame.closest(".modalContent").style.padding = "0px";

    this.progressFooter = this.frame.querySelector(".brSetupProgress");
    let backButton = this.progressFooter.querySelector("button[back]");
    let dots = this.progressFooter.querySelector("div[dots]");
    let progressDot = dots.children[this.step];
    let nextButton = this.progressFooter.querySelector("button[next]");
    let modalBackButton = extra.modal.modal.modal.querySelector(".modalBack")
    backButton.addEventListener("click", () => {
      extra.modal.open(this.steps[this.step - 1], null, modalBackButton, "Start a Breakout", null, { parent: this.parent });
    });
    nextButton.addEventListener("click", () => {
      extra.modal.open(this.steps[this.step + 1], null, nextButton, "Start a Breakout", null, { parent: this.parent });
    });
    dots.addEventListener("click", (event) => {
      let dot = event.target.closest("button");
      if (dot == null) {
        return;
      }
      let dotIndex = [...dots.children].indexOf(dot);
      let useButton = dot;
      if (dotIndex < this.step) {
        useButton = modalBackButton;
      }
      extra.modal.open(this.steps[dotIndex], null, useButton, "Start a Breakout", false, { parent: this.parent });
    });
    this.updateFooter();
    progressDot.setAttribute("selected", "");
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
    this.template = extra.template;

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
      this.updateFooter();
      let templateID = (this.parent.parent.parent.lesson.breakout ?? {}).template;
      if (templateID == null) {
        newOptions.style.display = "flex";
        currentTemplate.style.removeProperty("display");
      } else {
        newOptions.style.removeProperty("display");
        currentTemplate.style.display = "flex";
        if (this.template == null) {
          let [code, body] = await sendRequest("GET", "lessons/breakout/template?template=" + templateID, null, { session: this.parent.parent.session });
          if (code != 200) {
            return;
          }
          this.template = body;
          return updateDisplayState();
        }
        updateTemplateTile();
      }
    }

    let handleSet = (body) => {
      let set = body.set ?? body;
      if (set != null && (set.breakout ?? {}).hasOwnProperty("template") == true) {
        this.template = body.template;
        if (this.parent.parent.currentPagePath == "breakout/template" && ((this.parent.parent.pages["secondary"] ?? {}).template ?? {})._id != (this.template ?? {})._id) {
          this.parent.parent.closePage("secondary");
          this.parent.parent.openPage("primary", "breakout/overview");
        }
        return updateDisplayState();
      }
      if (this.template == null || set.id != this.template._id) {
        return;
      }
      objectUpdate(set, this.template);
      updateTemplateTile();
    }
    this.parent.parent.pipeline.subscribe("newBreakoutModalSet", "set", handleSet);
    this.parent.parent.pipeline.subscribe("newBreakoutModalSubSet", "subset", handleSet);
    
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
  <div class="brosCreationHolder">
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
    ".brosCreationHolder": `position: relative; display: flex; flex-direction: column; width: 598px; max-width: calc(100% - 16px); padding: 8px; text-align: center; align-items: center; z-index: 1`,
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

    let updateDisplayState = (set) => {
      this.updateFooter();
      let prevSelected = optionHolder.querySelector(".brosOption[selected]");
      if (prevSelected != null) {
        prevSelected.removeAttribute("selected");
      }
      let newSelect = optionHolder.querySelector('.brosOption[type="' + (set ?? (this.parent.parent.parent.lesson.breakout ?? {}).mode) + '"]');
      if (newSelect != null) {
        newSelect.setAttribute("selected", "");
      }
    }
    this.parent.parent.pipeline.subscribe("newBreakoutModalSet", "set", () => { updateDisplayState(); });

    optionHolder.addEventListener("click", async (event) => {
      let option = event.target.closest(".brosOption");
      if (option == null || option.hasAttribute("selected") == true) {
        return;
      }
      optionHolder.setAttribute("disabled", "");
      let type = option.getAttribute("type");
      updateDisplayState(type);
      let [code] = await sendRequest("PUT", "lessons/breakout/mode", { mode: type }, { session: this.parent.parent.session });
      if (code != 200) {
        updateDisplayState();
      }
      optionHolder.removeAttribute("disabled");
    });

    updateDisplayState();
  }
}

modules["modals/lesson/newbreakout/options"] = class extends modules["breakout/overview/setup"] {
  step = 2;
  html = `
    Test 1
    ${this.progressFooter}
  `;
  css = {
    ...this.progressFooterStyles
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    this.setupFooter(extra);
  }
}

modules["modals/lesson/newbreakout/review"] = class extends modules["breakout/overview/setup"] {
  step = 3;
  html = `
    Test 2
    ${this.progressFooter}
  `;
  css = {
    
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    this.setupFooter(extra);
  }
}