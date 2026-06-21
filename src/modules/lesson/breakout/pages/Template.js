import { userID, account, getParam, modifyParams, sendRequest, connected, objectUpdate, textBoxError, clipBoardRead } from "@/crucial";

import { Editor } from "@modules/editor/Editor";
import { REALTIME, TOOLBAR } from "@modules/editor/imports";

import { Frame as FileDropdown } from "../template/dropdowns/File";
import { Frame as PushChangesDropdown } from "../template/dropdowns/PushChanges";

import { Frame as ZoomDropdown } from "@modules/lesson/dropdowns/Zoom";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import boardLogoIcon from "@assets/icon.svg?raw";
import undoIcon from "@assets/lesson/history/undo.svg?raw";
import redoIcon from "@assets/lesson/history/redo.svg?raw";
import fullStatusIcon from "@assets/lesson/status/full.svg?raw";
import weakStatusIcon from "@assets/lesson/status/weak.svg?raw";
import noneStatusIcon from "@assets/lesson/status/none.svg?raw";
import increasePageIcon from "@assets/lesson/navigation/plus.svg?raw";
import decreasePageIcon from "@assets/lesson/navigation/minus.svg?raw";
import { close as closeIcon } from "@modules/utility/core-icons";

export class Page {
  html = `
  <div class="brtInterface customScroll">
    <div class="brtTopHolder">
      <button class="brtTopScroll" left style="left: 7px">${leftArrowIcon}</button>
      <button class="brtTopScroll" right style="right: 7px">${rightArrowIcon}</button>
      <div class="brtTop">
        <div class="brtTopSection" left>
          <button class="brtClose">${closeIcon}</button>
          <div class="brtFileNameHolder border"><div class="brtFileName" spellcheck="false" contenteditable></div></div>
          <button class="brtFileDropdown" title="File Options">File</button>
          <div class="brtTopDivider"></div>
          <button class="brtSaveProgress brtUndo" title="Undo Edit" disabled>${undoIcon}</button>
          <button class="brtSaveProgress brtRedo" title="Redo Edit" disabled>${redoIcon}</button>
          <div class="brtStatusHolder"><div class="brtStatus">
            <div strength="3" title="Strong Connection | All features seamlessly synced to the cloud.">${fullStatusIcon}</div>
            <div strength="2" title="Weak Connection | Cloud-saved annotations, limited real-time features.">${weakStatusIcon}</div>
            <div strength="1" title="No Connection | Changes stored on-device, synced to cloud upon reconnecting.">${noneStatusIcon}</div>
          </div></div>
        </div>
        <div class="brtTopSection" scroll>
          <div class="brtTopDivider"></div>
        </div>
        <div class="brtTopSection" right>
          <button class="brtFinish">Finish Template</button>
          <div class="brtTopDivider"></div>
          <button class="brtZoom">100%</button>
          <button class="brtAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
        </div>
      </div>
    </div>
    <div class="brtToolbarHolder eToolbarHolder" toolbarholder hidden>
      <div class="brtToolbar eToolbar" type="editor" keeptooltip notransition></div>
    </div>
    <div class="brtBottomHolder">
      <div class="brtBottom">
      <div class="brtBottomSection" board title="Open Markify Board" new><button class="brtBoardOpen">${boardLogoIcon}</button></div>
        <div class="brtBottomSectionSpacer"></div>
        <div class="brtBottomSection" right>
          <button class="brtPageNav" down>${increasePageIcon}</button>
          <div class="brtCurrentPage border" contenteditable></div>
          <button class="brtPageNav" up>${decreasePageIcon}</button>
        </div>
      </div>
    </div>
  </div>
  <div class="brtContentHolder customScroll" disabled></div>
  `;

  css = {
    ".brtInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; transform: translateZ(0); visibility: hidden; pointer-events: none; user-select: none; overflow: scroll; z-index: 2`,
    ".brtContentHolder": `position: relative; width: 100%; height: 100%; background: var(--pageColor); contain: strict; overflow: scroll; z-index: 1; transition: .5s`,
    
    ".brtTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brtTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".brtTopHolder[scroll] .brtTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brtTop::-webkit-scrollbar": `display: none`,
    ".brtTopSection[scroll]": `display: none`,
    ".brtTopHolder[scroll] .brtTopSection[scroll]": `display: flex !important`,
    ".brtTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".brtTopScroll svg": `width: 22px`,
    ".brtTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".brtTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brtTopHolder[scroll] .brtTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".brtTopSection[left]": `border-bottom-right-radius: 12px`,
    ".brtTopSection[right]": `border-bottom-left-radius: 12px`,

    ".brtClose": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".brtClose:hover": `background: var(--hover)`,
    ".brtClose svg": `width: 24px; height: 24px; transition: .2s`,
    ".brtClose:hover svg": `transform: scale(.9)`,
    ".brtFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".brtFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".brtFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".brtFileName::-webkit-scrollbar": `display: none`,
    ".brtFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brtTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".brtSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".brtSaveProgress svg": `width: 24px; height: 24px; margin: 2px`,
    ".brtUndo": `margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px`,
    ".brtRedo": `margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0`,
    ".brtStatusHolder": `display: flex; width: 32px; height: 32px; margin: 4px; justify-content: center; align-items: center`,
    ".brtStatus": `position: relative; width: 100%; height: 100%; transform: scale(.9)`,
    ".brtStatus > div": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; transition: .4s`,
    ".brtStatus svg *": `transform-origin: center; transition: .4s`,
    ".brtStatus[saving] [saved]": `opacity: 0`,
    ".brtStatus:not([saving]) [saving]": `opacity: 0`,
    ".brtStatus:not([saving]) [animation]": `animation-play-state: paused`,
    ".brtStatus [animation]": `animation: brtStatusSpinAnimation 2s linear infinite`,
    "@keyframes brtStatusSpinAnimation": `from { transform: rotate(0deg) } to { transform: rotate(360deg) }`,

    ".brtFinish": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; align-items: center; font-size: 16px; font-weight: 600`,
    ".brtZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brtAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".brtAccount img": `width: 100%; height: 100%; object-fit: cover`,
    
    ".brtToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".brtBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brtBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".brtBottom::-webkit-scrollbar": `display: none`,
    ".brtBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".brtBottomSection[hidden]": `display: none`,
    ".brtBottomSection:first-child": `border-top-left-radius: 0`,
    ".brtBottomSection:last-child": `border-top-right-radius: 0`,
    ".brtBottomSectionSpacer": `flex: 1`,
    ".brtPageNav": `display: flex; width: 32px; height: 32px; padding: 6px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".brtPageNav svg": `width: 100%; height: 100%`,
    ".brtCurrentPage": `min-width: 8px; max-height: 24px; padding: 4px 0; margin: 0 6px; font-size: 20px; outline: unset`,
    ".brtCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 12px`,
    ".brtBottomSection[board]": `box-shadow: var(--boardLightShadow)`,
    ".brtBottomSection[board] button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".brtBottomSection[board] button:hover": `background: var(--boardHover)`,
    ".brtBottomSection[board] button svg": `width: 32px; height: 32px; transition: .2s`,
    ".brtBottomSection[board] button:hover svg": `transform: scale(.9)`
  };

  async close(skipThumbnail) {
    if (this.editor != null) {
      this.editor.pipeline.publish("page_close");
    }
    this.parent.closePage("secondary");
    this.parent.openPage("primary", "overview");
    if (skipThumbnail != true) {
      if (this.editor != null && this.editor.save.synced != true) {
        await this.editor.save.syncSave(true);
      }
      sendRequest("PUT", "lessons/breakout/templates/refreshthumbnail?template=" + this.template._id, null, { session: this.parent.parent.session });
    }
  }

  updateTopBar(ignoreAttr) {
    if (ignoreAttr != true) {
      this.topHolder.removeAttribute("scroll");
    }
    if (this.top.scrollWidth > this.top.clientWidth) {
      if (ignoreAttr != true) {
        this.topHolder.setAttribute("scroll", "");
      }
      if (Math.floor(this.top.scrollLeft) > 0) {
        this.topScrollLeft.style.opacity = 1;
        this.topScrollLeft.style.pointerEvents = "all";
      } else {
        this.topScrollLeft.style.opacity = 0;
        this.topScrollLeft.style.pointerEvents = "none";
      }
      if (Math.floor(this.top.scrollWidth - this.top.scrollLeft) > Math.floor(this.top.clientWidth)) {
        this.topScrollRight.style.opacity = 1;
        this.topScrollRight.style.pointerEvents = "all";
      } else {
        this.topScrollRight.style.opacity = 0;
        this.topScrollRight.style.pointerEvents = "none";
      }
    } else {
      this.topScrollLeft.style.opacity = 0;
      this.topScrollLeft.style.pointerEvents = "none";
      this.topScrollRight.style.opacity = 0;
      this.topScrollRight.style.pointerEvents = "none";
    }
  }
  updateInterface() {
    let toolbarSetting = (account.settings ?? {}).toolbar ?? "left";
    if (this.toolbarHolder.hasAttribute(toolbarSetting) == false) {
      if (toolbarSetting != "right") {
        this.toolbarHolder.setAttribute("left", "");
        this.toolbarHolder.removeAttribute("right");
      } else {
        this.toolbarHolder.setAttribute("right", "");
        this.toolbarHolder.removeAttribute("left");
      }
      this.editor.updateToolbar();
    }

    this.updateTopBar();
  }

  updateStatus(saving) {
    if (this.currentStatusStrength != this.parent.parent.signalStrength) {
      for (let i = 0; i < this.status.children.length; i++) {
        let child = this.status.children[i];
        if (parseInt(child.getAttribute("strength")) != this.parent.parent.signalStrength) {
          child.setAttribute("hidden", "");
        } else {
          child.removeAttribute("hidden");
        }
      }
      this.currentStatusStrength = this.parent.parent.signalStrength;
    }
    this.currentStatusSaving = saving ?? this.currentStatusSaving;
    if (this.currentStatusSaving == true) {
      this.status.setAttribute("saving", "");
    } else {
      this.status.removeAttribute("saving");
    }
  }

  updateSplitScreenButton() {
    this.boardEnabled = this.parent.parent.lesson.tool.includes("board");
    this.boardOpen = this.parent.parent.pages["board"] != null;
    this.boardVisible = this.parent.parent.maximized != true || this.parent.parent.activePageID == "board";

    let showBoardButton = false;
    if (this.boardEnabled == true) {
      if (this.boardOpen == false || this.boardVisible == false) {
        showBoardButton = true;
      }
    } else if (this.parent.parent.self.access > 3) {
      if (this.boardOpen == false || this.boardVisible == false) {
        showBoardButton = true;
      }
    }

    if (showBoardButton == true) {
      this.openBoardHolder.style.display = "flex";
    } else {
      this.openBoardHolder.style.removeProperty("display");
    }
  }

  async js(frame, extra = {}) {
    if (extra.template == null) {
      let setTemplateID = ((this.parent.parent.lesson ?? {}).breakout ?? {}).template;
      if (setTemplateID == null) {
        return;
      }
      extra.template = { _id: setTemplateID };
    }
    if (this.parent.parent.session == null) {
      return;
    }
    this.template = extra.template ?? {};

    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.page = frame.closest(".content");

    this.topHolder = this.page.querySelector(".brtTopHolder");
    this.top = this.topHolder.querySelector(".brtTop");
    this.bottom = this.page.querySelector(".brtBottom");

    this.leftTop = this.top.querySelector(".brtTopSection[left]");
    this.closeButton = this.leftTop.querySelector(".brtClose");
    this.templateName = this.leftTop.querySelector(".brtFileName");
    this.fileButton = this.leftTop.querySelector(".brtFileDropdown");
    this.undoButton = this.leftTop.querySelector(".brtUndo");
    this.redoButton = this.leftTop.querySelector(".brtRedo");
    this.status = this.leftTop.querySelector(".brtStatus");

    this.rightTop = this.top.querySelector(".brtTopSection[right]");
    this.finishButton = this.rightTop.querySelector(".brtFinish");
    this.zoomButton = this.rightTop.querySelector(".brtZoom");
    this.accountButton = this.rightTop.querySelector(".brtAccount");

    this.topScrollLeft = this.topHolder.querySelector(".brtTopScroll[left]");
    this.topScrollRight = this.topHolder.querySelector(".brtTopScroll[right]");

    this.contentHolder = this.page.querySelector(".brtContentHolder");

    this.toolbarHolder = this.page.querySelector(".brtToolbarHolder");
    this.editorToolbar = this.toolbarHolder.querySelector(".brtToolbar");

    this.openBoardHolder = this.bottom.querySelector(".brtBottomSection[board]");
    this.openBoard = this.openBoardHolder.querySelector("button");

    this.currentPageHolder = this.bottom.querySelector(".brtBottomSection[right]");
    this.pageTextBox = this.currentPageHolder.querySelector(".brtCurrentPage");
    this.increasePageButton = this.currentPageHolder.querySelector(".brtPageNav[down]");
    this.decreasePageButton = this.currentPageHolder.querySelector(".brtPageNav[up]");

    // Exit button event:
    this.closeButton.addEventListener("click", () => { this.close(); });

    // Load template and fetch annotations:
    let fetchAnnotations = sendRequest("GET", "lessons/join/annotations?template=" + this.template._id, null, { session: this.parent.parent.session });
    if (this.template.created == null) {
      let [code, body] = await sendRequest("GET", "lessons/breakout/templates?template=" + this.template._id, null, { session: this.parent.parent.session });
      if (code != 200) {
        return;
      }
      this.template = body;
    }

    // Create editor:
    this.editor = await this.setFrame(Editor, this.contentHolder, {
      construct: {
        page: this.page,
        pageID: this.parent.pageID,
        pageType: this.parent.pageType,
        active: this.parent.parent.active,
        
        lesson: this.parent.parent,
        self: this.parent.parent.self,
        session: this.parent.parent.session,
        sessionID: this.parent.parent.sessionID,
        sources: this.parent.parent.sources,
        pageRenderPipeline: this.parent.parent.pageRenderPipeline,
        collaborators: this.parent.parent.collaborators,
        settings: this.parent.parent.lesson.settings,
        resync: this.parent.parent.resync,
        preferenceState: this.parent.parent.preferences.state,
        backgroundColor: this.template.background ?? "FFFFFF",

        id: this.template._id,
        parameters: [("template=" + this.template._id)]
      }
    });
    this.pipeline = this.editor.pipeline;

    // Load Annotations:
    let pageParam = getParam("page");
    let checkForJumpLink = getParam("annotation");
    (async () => {
      let [annoCode, annoBody] = await fetchAnnotations;
      if (annoCode != 200 && connected == true) {
        return this.editor.openAlert("error", `<b>Error Loading Annotations</b>Please try again later...`);
      }
      await this.editor.loadAnnotations(annoBody, { pageID: pageParam, jumpID: checkForJumpLink });
      this.contentHolder.removeAttribute("disabled");
    })();

    // Load additional editor modules:
    (async () => {
      this.editor.register(REALTIME());
      await this.editor.register(TOOLBAR());

      this.editorToolbar.removeAttribute("notransition");
    })();

    // Top bar events:
    this.topScrollLeft.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft - 200, behavior: "smooth" });
    });
    this.topScrollRight.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft + 200, behavior: "smooth" });
    });
    this.pipeline.subscribe("topbarResize", "resize", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { this.updateTopBar(true); });
    this.top.addEventListener("scroll", (event) => { this.pipeline.publish("topbar_scroll", { event }); });

    // Interface events:
    this.pipeline.subscribe("interfaceUpdate", "refresh_interface", () => { this.updateInterface(); });
    this.pipeline.subscribe("templateSet", "set", (body) => {
      if (body.id != this.template._id) {
        if (body.hasOwnProperty("tool") == true) {
          this.updateSplitScreenButton();
        }
        return;
      }
      objectUpdate(body, this.template);

      if (body.hasOwnProperty("name") == true && document.activeElement.closest(".brtFileName") != this.templateName) {
        let name = this.template.name ?? "Untitled Template";
        this.templateName.textContent = name;
        this.templateName.title = name;
      }

      if (body.hasOwnProperty("background") == true) {
        this.editor.updateBackground(body.background);
      }

      this.updateInterface();
    });
    this.pipeline.subscribe("accountUpdate", "account_settings", (event) => {
      if (event.settings.hasOwnProperty("toolbar") == true) {
        this.updateInterface();
        this.pipeline.publish("redraw_selection", { redraw: true });
      }
      if (event.settings.hasOwnProperty("actionbar") == true) {
        this.pipeline.publish("redraw_selection", { redraw: true });
      }
    });

    // Lesson name events:
    let name = this.template.name ?? "Untitled Lesson";
    this.templateName.textContent = name;
    this.templateName.title = name;
    this.templateName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        this.templateName.blur();
      }
    });
    this.templateName.addEventListener("input", () => { this.updateTopBar(); });
    this.templateName.addEventListener("focusout", async () => {
      this.templateName.scrollTo(0, 0);
      this.templateName.parentElement.style.setProperty("--borderWidth", "0px");
      this.updateTopBar();

      let name = this.templateName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        this.templateName.textContent = this.template.name;
        return;
      }
      if (this.templateName.textContent == this.template.name) {
        this.templateName.textContent = this.template.name;
        return;
      }
      let oldName = this.template.name;
      this.template.name = name;
      this.templateName.textContent = name;
      this.templateName.title = name;
      let [code] = await sendRequest("POST", "lessons/breakout/templates/name?template=" + this.template._id, { name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.template.name = oldName;
        this.templateName.textContent = oldName;
        this.templateName.title = oldName;
      }
    });
    this.templateName.addEventListener("focus", async () => {
      this.templateName.parentElement.style.setProperty("--borderWidth", "4px");
      this.updateTopBar();
    });
    this.templateName.addEventListener("paste", clipBoardRead);

    // File dropdown:
    this.fileButton.addEventListener("click", () => {
      this.editor.openDropdown(this.fileButton, FileDropdown, { parent: this });
    });
    
    // Undo/Redo history events:
    this.pipeline.subscribe("updateHistory", "history_update", (data) => {
      if (data.history.length > 0 && data.location > -1 && this.editor.self.access > 0) {
        this.undoButton.removeAttribute("disabled");
      } else {
        this.undoButton.setAttribute("disabled", "");
      }
      if (data.history.length > data.location + 1 && this.editor.self.access > 0) {
        this.redoButton.removeAttribute("disabled");
      } else {
        this.redoButton.setAttribute("disabled", "");
      }
    });
    this.undoButton.addEventListener("click", () => { this.editor.history.undo(); });
    this.redoButton.addEventListener("click", () => { this.editor.history.redo(); });

    // Status events:
    this.pipeline.subscribe("statusSignalStrengthUpdate", "signal_strength", () => { this.updateStatus(); });
    this.pipeline.subscribe("statusSavingUpdate", "save_status", (event) => { this.updateStatus(event.saving); });
    this.updateStatus();

    // Push changes event:
    if (extra.updating == true) {
      this.finishButton.textContent = "Push Changes";
    }
    this.finishButton.addEventListener("click", () => {
      if (extra.updating != true) {
        this.close();
      } else {
        this.editor.openDropdown(this.finishButton, PushChangesDropdown, { parent: this });
      }
    });

    // Zoom event:
    this.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      this.zoomButton.textContent = Math.round(event.zoom * 100) + "%";
      this.updateTopBar();
    });
    this.zoomButton.addEventListener("click", () => {
      this.editor.openDropdown(this.zoomButton, ZoomDropdown);
    });

    // Account setup:
    if (userID != null) {
      this.accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
       this.accountButton.querySelector("img").src = account.image;
      }
      this.accountButton.addEventListener("click", () => {
        this.editor.openDropdown(this.accountButton, import("@modules/dropdowns/Account"), { parent: this });
      });
    }

    // Page changer events:
    this.pipeline.subscribe("pageTextUpdate", "page_change", (event) => {
      if (this.editor.currentPage > 0) {
        this.currentPageHolder.style.display = "flex";
        modifyParams("page", event.pageId);
      } else {
        this.currentPageHolder.style.display = "none";
        modifyParams("page");
        return;
      }

      this.pageTextBox.innerHTML = "<b>" + this.editor.currentPage + "</b> / " + this.editor.annotationPages.length;

      if (this.editor.currentPage > this.editor.annotationPages.length - 1) {
        this.increasePageButton.setAttribute("disabled", "");
      } else {
        this.increasePageButton.removeAttribute("disabled");
      }
      if (this.editor.currentPage < 2) {
        this.decreasePageButton.setAttribute("disabled", "");
      } else {
        this.decreasePageButton.removeAttribute("disabled");
      }
    });
    this.increasePageButton.addEventListener("click", () => {
      this.editor.setCurrentPage(this.editor.currentPage + 1);
    });
    this.decreasePageButton.addEventListener("click", () => {
      this.editor.setCurrentPage(this.editor.currentPage - 1);
    });
    let alreadyRunningFocus = false;
    this.pageTextBox.addEventListener("focus", async () => {
      if (alreadyRunningFocus == true) {
        return;
      }
      alreadyRunningFocus = true;
      this.pageTextBox.blur();
      this.pageTextBox.innerHTML = "";
      this.pageTextBox.focus();
      alreadyRunningFocus = false;
    });
    this.pageTextBox.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        return this.pageTextBox.blur();
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(this.pageTextBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(this.pageTextBox, "Must be a number");
        } else if (textInt > this.editor.annotationPages.length) {
          event.preventDefault();
          textBoxError(this.pageTextBox, "Maximum of page number " + this.editor.annotationPages.length);
        } else if (textInt < 1) {
          event.preventDefault();
          textBoxError(this.pageTextBox, "Minimum of the first page");
        }
      }
    });
    this.pageTextBox.addEventListener("focusout", () => {
      if (this.pageTextBox.textContent == "") {
        this.pageTextBox.innerHTML = "<b>" + this.editor.currentPage + "</b> / " + this.editor.annotationPages.length;
        return;
      }
      let setPage = parseInt(this.pageTextBox.textContent) ?? 1;
      this.pageTextBox.innerHTML = "<b>" + setPage + "</b> / " + this.editor.annotationPages.length;
      this.editor.setCurrentPage(setPage, false);
    });

    // Splitscreen update events:
    this.openBoard.addEventListener("click", async () => {
      this.openBoardHolder.style.removeProperty("display");

      if (this.boardOpen == false) {
        await this.parent.parent.addPage("board", "board", { insertBefore: this.parent.pageHolder, percent: .5 });
      }
      if (this.boardVisible == false) {
        this.parent.parent.activePageID = "board";
        this.parent.parent.pushToPipelines(null, "page_switch", { pageID: "board" });
      }
    });
    this.pipeline.subscribe("pageAdd", "page_add", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageRemove", "page_remove", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageSwitch", "page_switch", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageMaximize", "maximize", () => { this.updateSplitScreenButton(); });
    this.updateSplitScreenButton();

    this.updateInterface();
  }
}