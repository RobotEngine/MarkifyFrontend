modules["breakout/template"] = class {
  html = `
  <div class="brtInterface customScroll">
    <div class="brtTopHolder">
      <button class="brtTopScroll" left style="left: 7px"></button>
      <button class="brtTopScroll" right style="right: 7px"></button>
      <div class="brtTop">
        <div class="brtTopSection" left>
          <a class="brtClose"></a>
          <div class="brtFileNameHolder border"><div class="brtFileName" spellcheck="false"></div></div>
          <button class="brtFileDropdown">File</button>
          <div class="brtTopDivider"></div>
          <button class="brtSaveProgress brtUndo" disabled></button>
          <button class="brtSaveProgress brtRedo" disabled></button>
          <div class="brtStatusHolder"><div class="brtStatus">
            <div strength="3" title="Strong Connection | All features seamlessly synced to the cloud."></div>
            <div strength="2" title="Weak Connection | Cloud-saved annotations, limited real-time features."></div>
            <div strength="1" title="No Connection | Changes stored on-device, synced to cloud upon reconnecting."></div>
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
      <div class="brtToolbar eToolbar" editor keeptooltip notransition></div>
    </div>
    <div class="brtBottomHolder">
      <div class="brtBottom">
      <div class="brtBottomSection" board title="Open Markify Board" new><button class="brtBoardOpen"></button></div>
        <div class="brtBottomSectionSpacer"></div>
        <div class="brtBottomSection" right>
          <button class="brtPageNav" down></button>
          <div class="brtCurrentPage border" contenteditable></div>
          <button class="brtPageNav" up></button>
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
    ".brtTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
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

    ".brtClose": `display: flex; width: 38px; height: 38px; padding: 0; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
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
  js = async (frame, extra = {}) => {
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

    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let page = frame.closest(".content");

    let topHolder = page.querySelector(".brtTopHolder");
    let top = topHolder.querySelector(".brtTop");
    let bottom = page.querySelector(".brtBottom");

    let leftTop = top.querySelector(".brtTopSection[left]");
    let closeButton = leftTop.querySelector(".brtClose");
    let templateName = leftTop.querySelector(".brtFileName");
    let fileButton = leftTop.querySelector(".brtFileDropdown");
    let undoButton = leftTop.querySelector(".brtUndo");
    let redoButton = leftTop.querySelector(".brtRedo");
    let status = leftTop.querySelector(".brtStatus");

    let rightTop = top.querySelector(".brtTopSection[right]");
    let finishButton = rightTop.querySelector(".brtFinish");
    let zoomButton = rightTop.querySelector(".brtZoom");
    let accountButton = rightTop.querySelector(".brtAccount");

    let scrollLeft = topHolder.querySelector(".brtTopScroll[left]");
    let scrollRight = topHolder.querySelector(".brtTopScroll[right]");

    let contentHolder = page.querySelector(".brtContentHolder");

    let toolbarHolder = page.querySelector(".brtToolbarHolder");
    let editorToolbar = toolbarHolder.querySelector(".brtToolbar");

    let openBoardHolder = bottom.querySelector(".brtBottomSection[board]");
    let openBoard = openBoardHolder.querySelector("button");

    let currentPageHolder = bottom.querySelector(".brtBottomSection[right]");
    let pageTextBox = currentPageHolder.querySelector(".brtCurrentPage");
    let increasePageButton = currentPageHolder.querySelector(".brtPageNav[down]");
    let decreasePageButton = currentPageHolder.querySelector(".brtPageNav[up]");

    let stringPref = JSON.stringify(this.parent.parent.preferences); // Must be duplicated

    let close = async (skipThumbnail) => {
      if (this.editor != null) {
        this.editor.pipeline.publish("page_close");
      }
      this.parent.closePage("secondary");
      this.parent.openPage("primary", "breakout/overview");
      if (skipThumbnail != true) {
        if (this.editor != null && this.editor.save.synced != true) {
          await this.editor.save.syncSave(true);
        }
        sendRequest("PUT", "lessons/breakout/template/refreshthumbnail?template=" + this.template._id, null, { session: this.parent.parent.session });
      }
    }
    closeButton.addEventListener("click", close);
    finishButton.addEventListener("click", () => {
      // Add code for updating existing template root
      close();
    });

    // Load Images:
    setSVG(scrollLeft, "../images/editor/top/leftarrow.svg");
    setSVG(scrollRight, "../images/editor/top/rightarrow.svg");
    setSVG(closeButton, "../images/tooltips/close.svg");
    setSVG(undoButton, "../images/tooltips/progress/undo.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(redoButton, "../images/tooltips/progress/redo.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(status.querySelector('div[strength="3"]'), "../images/editor/status/full.svg");
    setSVG(status.querySelector('div[strength="2"]'), "../images/editor/status/weak.svg");
    setSVG(status.querySelector('div[strength="1"]'), "../images/editor/status/none.svg");
    setSVG(increasePageButton, "../images/editor/bottom/plus.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(decreasePageButton, "../images/editor/bottom/minus.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    
    this.template = extra.template;
    
    let fetchAnnotations = sendRequest("GET", "lessons/join/annotations?template=" + this.template._id, null, { session: this.parent.parent.session }, { allowError: true });

    if (this.template.created == null) {
      let [code, body] = await sendRequest("GET", "lessons/breakout/template?template=" + this.template._id, null, { session: this.parent.parent.session }, { allowError: true });
      if (code != 200) {
        return;
      }
      this.template = body;
    }
    /* else {
      this.parent.parent.lesson.breakout = this.parent.parent.lesson.breakout ?? {};
      this.parent.parent.lesson.breakout.template = this.template._id;
      this.parent.parent.pushToPipelines(null, "set", { breakout: { template: this.template._id } });
    }*/

    this.editor = await this.setFrame("editor/editor", contentHolder, {
      construct: {
        page: page,
        pageID: this.parent.pageID,
        pageType: this.parent.pageType,
        active: this.parent.parent.active,
        
        lesson: this.parent.parent,
        self: this.parent.parent.self,
        session: this.parent.parent.session,
        sessionID: this.parent.parent.sessionID,
        sources: this.parent.parent.sources,
        collaborators: this.parent.parent.collaborators,
        settings: this.parent.parent.lesson.settings,
        resync: this.parent.resync,
        preferences: JSON.parse(stringPref),
        lastSavePreferences: JSON.parse(stringPref),
        backgroundColor: this.template.background ?? "FFFFFF",

        id: this.template._id,
        parameters: [("template=" + this.template._id)]
      }
    });
    this.pipeline = this.editor.pipeline;

    let updateTopBar = (ignoreAttr) => {
      if (ignoreAttr != true) {
        topHolder.removeAttribute("scroll");
      }
      if (top.scrollWidth > top.clientWidth) {
        if (ignoreAttr != true) {
          topHolder.setAttribute("scroll", "");
        }
        if (Math.floor(top.scrollLeft) > 0) {
          scrollLeft.style.opacity = 1;
          scrollLeft.style.pointerEvents = "all";
        } else {
          scrollLeft.style.opacity = 0;
          scrollLeft.style.pointerEvents = "none";
        }
        if (Math.floor(top.scrollWidth - top.scrollLeft) > Math.floor(top.clientWidth)) {
          scrollRight.style.opacity = 1;
          scrollRight.style.pointerEvents = "all";
        } else {
          scrollRight.style.opacity = 0;
          scrollRight.style.pointerEvents = "none";
        }
      } else {
        scrollLeft.style.opacity = 0;
        scrollLeft.style.pointerEvents = "none";
        scrollRight.style.opacity = 0;
        scrollRight.style.pointerEvents = "none";
      }
    }
    scrollLeft.addEventListener("click", function () {
      top.scrollTo({ left: top.scrollLeft - 200, behavior: "smooth" });
      updateTopBar();
    });
    scrollRight.addEventListener("click", function () {
      top.scrollTo({ left: top.scrollLeft + 200, behavior: "smooth" });
      updateTopBar();
    });
    this.pipeline.subscribe("topbarResize", "resize", updateTopBar);
    this.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { updateTopBar(true); });
    this.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", updateTopBar);

    top.addEventListener("scroll", (event) => {
      this.pipeline.publish("topbar_scroll", { event: event });
    });

    this.updateInterface = async () => {
      let toolbarSetting = (account.settings ?? {}).toolbar ?? "left";
      if (toolbarHolder.hasAttribute(toolbarSetting) == false) {
        if (toolbarSetting != "right") {
          toolbarHolder.setAttribute("left", "");
          toolbarHolder.removeAttribute("right");
        } else {
          toolbarHolder.setAttribute("right", "");
          toolbarHolder.removeAttribute("left");
        }
        if (this.editor.toolbar != null) {
          this.editor.toolbar.toolbar.update();
        }
      }
      updateTopBar();
    }

    this.pipeline.subscribe("interfaceUpdate", "refresh_interface", () => {
      this.updateInterface();
    });
    this.pipeline.subscribe("accountUpdate", "account_settings", (event) => {
      if (event.settings.hasOwnProperty("toolbar") == true) {
        this.updateInterface();
      }
      if (event.settings.hasOwnProperty("actionbar") == true) {
        this.pipeline.publish("redraw_selection", { redraw: true });
      }
    });

    let currentStatusStrength;
    let currentStatusSaving = false;
    this.updateStatus = (saving) => {
      if (currentStatusStrength != this.parent.parent.signalStrength) {
        for (let i = 0; i < status.children.length; i++) {
          let child = status.children[i];
          if (parseInt(child.getAttribute("strength")) != this.parent.parent.signalStrength) {
            child.setAttribute("hidden", "");
          } else {
            child.removeAttribute("hidden");
          }
        }
        currentStatusStrength = this.parent.parent.signalStrength;
      }
      currentStatusSaving = saving ?? currentStatusSaving;
      if (currentStatusSaving == true) {
        status.setAttribute("saving", "");
      } else {
        status.removeAttribute("saving");
      }
    }
    this.pipeline.subscribe("statusSignalStrengthUpdate", "signal_strength", () => { this.updateStatus(); });
    this.pipeline.subscribe("statusSavingUpdate", "save_status", (event) => { this.updateStatus(event.saving); });
    this.updateStatus();

    templateName.textContent = this.template.name ?? "Untitled Template";
    templateName.title = templateName.textContent;
    templateName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        templateName.blur();
      }
    });
    templateName.addEventListener("input", updateTopBar);
    templateName.addEventListener("focusout", async () => {
      templateName.scrollTo(0, 0);
      templateName.parentElement.style.setProperty("--borderWidth", "0px");
      updateTopBar();

      let name = templateName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        templateName.textContent = this.template.name;
        return;
      }
      if (templateName.textContent == this.template.name) {
        templateName.textContent = this.template.name;
        return;
      }
      let oldName = this.template.name;
      this.template.name = name;
      templateName.textContent = name;
      templateName.title = name;
      let [code] = await sendRequest("POST", "lessons/breakout/template/name?template=" + this.template._id, { name: name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.template.name = oldName;
        templateName.textContent = oldName;
        templateName.title = oldName;
      }
    });
    templateName.addEventListener("focus", async () => {
      templateName.parentElement.style.setProperty("--borderWidth", "4px");
      updateTopBar();
    });
    templateName.addEventListener("paste", clipBoardRead);
    if (this.parent.parent.self.access > 4) {
      templateName.setAttribute("contenteditable", "");
    }

    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/lesson/breakout/template/file", { parent: this });
    });

    this.pipeline.subscribe("updateHistory", "history_update", (data) => {
      if (data.history.length > 0 && data.location > -1 && this.editor.self.access > 0) {
        undoButton.removeAttribute("disabled");
      } else {
        undoButton.setAttribute("disabled", "");
      }
      if (data.history.length > data.location + 1 && this.editor.self.access > 0) {
        redoButton.removeAttribute("disabled");
      } else {
        redoButton.setAttribute("disabled", "");
      }
    });
    undoButton.addEventListener("click", () => { this.editor.history.undo(); });
    redoButton.addEventListener("click", () => { this.editor.history.redo(); });

    this.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      zoomButton.textContent = Math.round(event.zoom * 100) + "%";
      updateTopBar();
    });
    zoomButton.addEventListener("click", () => {
      dropdownModule.open(zoomButton, "dropdowns/lesson/zoom", { parent: this });
    });

    if (userID != null) {
      accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
        accountButton.querySelector("img").src = account.image;
      }
      accountButton.addEventListener("click", () => {
        dropdownModule.open(accountButton, "dropdowns/account", { parent: this });
      });
    }

    this.pipeline.subscribe("pageTextUpdate", "page_change", (event) => {
      if (this.editor.currentPage > 0) {
        currentPageHolder.style.display = "flex";
        modifyParams("page", event.pageId);
      } else {
        currentPageHolder.style.display = "none";
        modifyParams("page");
        return;
      }
      pageTextBox.innerHTML = "<b>" + this.editor.currentPage + "</b> / " + this.editor.annotationPages.length;
      if (this.editor.currentPage > this.editor.annotationPages.length - 1) {
        increasePageButton.setAttribute("disabled", "");
      } else {
        increasePageButton.removeAttribute("disabled");
      }
      if (this.editor.currentPage < 2) {
        decreasePageButton.setAttribute("disabled", "");
      } else {
        decreasePageButton.removeAttribute("disabled");
      }
    });
    increasePageButton.addEventListener("click", () => {
      this.editor.setPage(this.editor.currentPage + 1);
    });
    decreasePageButton.addEventListener("click", () => {
      this.editor.setPage(this.editor.currentPage - 1);
    });
    let alreadyRunningFocus = false;
    pageTextBox.addEventListener("focus", async () => {
      if (alreadyRunningFocus == true) {
        return;
      }
      alreadyRunningFocus = true;
      pageTextBox.blur();
      pageTextBox.innerHTML = "";
      pageTextBox.focus();
      alreadyRunningFocus = false;
    });
    pageTextBox.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        pageTextBox.blur();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(pageTextBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(pageTextBox, "Must be a number");
        } else if (textInt > this.editor.annotationPages.length) {
          event.preventDefault();
          textBoxError(pageTextBox, "Maximum of page number " + this.editor.annotationPages.length);
        } else if (textInt < 1) {
          event.preventDefault();
          textBoxError(pageTextBox, "Minimum of the first page");
        }
      }
    });
    pageTextBox.addEventListener("focusout", () => {
      //pageBoxFocus = false;
      if (pageTextBox.textContent == "") {
        pageTextBox.innerHTML = "<b>" + this.editor.currentPage + "</b> / " + this.editor.annotationPages.length;
        return;
      }
      let setPage = parseInt(pageTextBox.textContent) ?? 1;
      pageTextBox.innerHTML = "<b>" + setPage + "</b> / " + this.editor.annotationPages.length;
      this.editor.setPage(setPage, false);
    });

    let boardEnabled = false;
    let boardOpen = false;
    let boardVisible = false;
    let updateSplitScreenButton = () => {
      boardEnabled = this.parent.parent.lesson.tool.includes("board");
      boardOpen = this.parent.parent.pages["board"] != null;
      boardVisible = this.parent.parent.maximized != true || this.parent.parent.activePageID == "board";

      let showBoardButton = false;
      if (boardEnabled == true) {
        if (boardOpen == false || boardVisible == false) {
          showBoardButton = true;
        }
      } else if (this.parent.parent.self.access > 3) {
        if (boardOpen == false || boardVisible == false) {
          showBoardButton = true;
        }
      }

      if (showBoardButton == true) {
        openBoardHolder.style.display = "flex";
      } else {
        openBoardHolder.style.removeProperty("display");
      }
    }
    openBoard.addEventListener("click", async () => {
      openBoardHolder.style.removeProperty("display");

      if (boardOpen == false) {
        await this.parent.parent.addPage("board", "board", { insertBefore: this.parent.pageHolder, percent: .5 });
      }
      if (boardVisible == false) {
        this.parent.parent.activePageID = "board";
        this.parent.parent.pushToPipelines(null, "page_switch", { pageID: "board" });
      }
    });
    setSVG(openBoard, "../images/icon.svg");
    this.pipeline.subscribe("pageAdd", "page_add", updateSplitScreenButton);
    this.pipeline.subscribe("pageRemove", "page_remove", updateSplitScreenButton);
    this.pipeline.subscribe("pageSwitch", "page_switch", updateSplitScreenButton);
    this.pipeline.subscribe("pageMaximize", "maximize", updateSplitScreenButton);
    updateSplitScreenButton();

    this.pipeline.subscribe("checkPageSwitch", "page_switch", (data) => {
      this.editor.active = data.pageID == "breakout";
    });

    this.pipeline.subscribe("templateSet", "set", (body) => {
      if (body.id != this.template._id) {
        return;
      }
      objectUpdate(body, this.template);
      if (body.hasOwnProperty("name") == true && document.activeElement.closest(".eFileName") != templateName) {
        templateName.textContent = this.template.name ?? "Untitled Template";
        templateName.title = templateName.textContent;
      }
      if (body.hasOwnProperty("background") == true) {
        this.editor.updateBackground(body.background);
      }
      this.updateInterface();
    });

    // Fetch Annotations:
    let pageParam = getParam("page");
    let checkForJumpLink = getParam("annotation");
    (async () => {
      let [annoCode, annoBody] = await fetchAnnotations;
      if (annoCode != 200 && connected == true) {
        return alertModule.open("error", `<b>Error Loading Annotations</b>Please try again later...`);
      }
      await this.editor.loadAnnotations(annoBody, { pageID: pageParam, jumpID: checkForJumpLink });
      contentHolder.removeAttribute("disabled");
    })();

    (async () => {
      await (await this.newModule("editor/realtime")).js(this.editor);
      await (await this.newModule("editor/toolbar")).js(this.editor);

      editorToolbar.removeAttribute("notransition");
    })();

    this.updateInterface();
  }
}

modules["dropdowns/lesson/breakout/template/file"] = class {
  html = `
  <button class="brtFileAction" option="overview" title="Return to the main overview page." style="--themeColor: var(--secondary)"><div></div>Overview</button>
  <div class="brtFileLine"></div>
  <button class="brtFileAction" option="export" dropdowntitle="Export" title="Export the lesson as a PDF."><div></div>Export</button>
  <button class="brtFileAction" option="print" dropdowntitle="Print" title="Export the lesson and print."><div></div>Print</button>
  <div class="brtFileLine" option="timeline"></div>
  <button class="brtFileAction" option="history" title="See the lesson's version history as a timeline."><div></div>Timeline History</button>
  <div class="brtFileLine" option="findjump"></div>
  <button class="brtFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><div></div>Find</button>
  <button class="brtFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><div></div>Jump to Start</button>
  <button class="brtFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><div></div>Jump to Page</button>
  <button class="brtFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><div></div>Jump to End</button>
  <div class="brtFileLine" option="document"></div>
  <button class="brtFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><div></div>Properties</button>
  <button class="brtFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><div></div>Recognize Text</button>
  <div class="brtFileLine" option="delete"></div>
  <button class="brtFileAction" option="boardstyle" title="Change the board's background color."><div></div>Background Color</button>
  <button class="brtFileAction" option="hideshowpage" title="Hide all pages from members."><div></div>Hide All Pages</button>
  <button class="brtFileAction" option="deleteannotations" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><div></div>Delete Annotations</button>
  `;
  css = {
    ".brtFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".brtFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".brtFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".brtFileAction div svg": `width: 100%; height: 100%`,
    ".brtFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".brtFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async function (frame, extra) {
    let parent = extra.parent;
    let editor = parent.editor;

    let overviewButton = frame.querySelector('.brtFileAction[option="overview"]');
    overviewButton.addEventListener("click", async () => {
      editor.save.syncSave(true);
      parent.parent.closePage("secondary");
      parent.parent.openPage("primary", "breakout/overview");
      dropdownModule.close();
    });
    let exportButton = frame.querySelector('.brtFileAction[option="export"]');
    exportButton.addEventListener("click", () => {
      dropdownModule.open(exportButton, "dropdowns/lesson/file/export", { type: "download", editor: editor });
    });
    let printButton = frame.querySelector('.brtFileAction[option="print"]');
    printButton.addEventListener("click", () => {
      dropdownModule.open(printButton, "dropdowns/lesson/file/export", { type: "print", editor: editor });
    });

    let historyButton = frame.querySelector('.brtFileAction[option="history"]');
    historyButton.addEventListener("click", async () => {
      dropdownModule.close();

      let construct = {
        close: () => {
          parent.parent.closePage("tertiary");
          parent.parent.openPage("secondary", "breakout/template");
        },

        lesson: parent.parent.parent,
        self: parent.parent.parent.self,
        session: parent.parent.parent.session,
        sessionID: parent.parent.parent.sessionID,
        sources: parent.parent.parent.sources,
        collaborators: parent.parent.parent.collaborators,
        backgroundColor: parent.editor.backgroundColor,
        preferences: parent.editor.preferences,
        //reactions: parent.parent.editor.reactions,

        annotations: parent.editor.annotations,

        id: parent.template._id,
        parameters: [("template=" + parent.template._id)]
      };
      this.timeline = await parent.parent.openPage("tertiary", "editor/timeline", { construct });
    });

    let find = frame.querySelector('.brtFileAction[option="find"]');
    let jumptop = frame.querySelector('.brtFileAction[option="jumptop"]');
    jumptop.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setPage(1, false);
        dropdownModule.close();
      }
      //editor.contentHolder.scrollTo({ top: 0 });
    });
    let jump = frame.querySelector('.brtFileAction[option="jump"]');
    jump.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.page.querySelector(".brtCurrentPage").focus();
        dropdownModule.close();
      }
    });
    let jumpend = frame.querySelector('.brtFileAction[option="jumpend"]');
    jumpend.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setPage(editor.annotationPages.length, false);
        dropdownModule.close();
      }
      //editor.contentHolder.scrollTo({ top: editor.contentHolder.scrollHeight });
    });

    let propertiesButton = frame.querySelector('.brtFileAction[option="properties"]');
    let ocrButton = frame.querySelector('.brtFileAction[option="ocr"]');

    let boardStyleButton = frame.querySelector('.brtFileAction[option="boardstyle"]');
    boardStyleButton.addEventListener("click", async () => {
      dropdownModule.open(boardStyleButton, "dropdowns/editor/boardstyle", { parent: parent });
    });

    let hideshowpage = frame.querySelector('.brtFileAction[option="hideshowpage"]');
    hideshowpage.addEventListener("click", async () => {
      hideshowpage.setAttribute("disabled", "");
      for (let i = 0; i < parent.editor.annotationPages.length; i++) {
        let pageID = parent.editor.annotationPages[i][0];
        let render = (parent.editor.annotations[pageID] ?? {}).render;
        if (render != null && render.hidden != true) {
          await parent.editor.save.push({ _id: pageID, hidden: true });
        }
      }
      await parent.editor.save.syncSave(true);
      hideshowpage.removeAttribute("disabled");
      dropdownModule.close();
    });

    let deleteAnnotationsButton = frame.querySelector('.brtFileAction[option="deleteannotations"]');
    deleteAnnotationsButton.addEventListener("click", () => {
      dropdownModule.open(deleteAnnotationsButton, "dropdowns/remove", { type: "deleteannotations", lessonID: parent.parent.id, session: editor.session, parameters: editor.parameters });
    });

    setSVG(overviewButton.querySelector("div"), "../images/tooltips/back.svg");
    setSVG(exportButton.querySelector("div"), "../images/editor/file/export.svg");
    setSVG(printButton.querySelector("div"), "../images/editor/file/print.svg");
    setSVG(historyButton.querySelector("div"), "../images/editor/file/history.svg");
    setSVG(find.querySelector("div"), "../images/editor/file/search.svg");
    setSVG(jumptop.querySelector("div"), "../images/editor/file/uparrow.svg");
    setSVG(jump.querySelector("div"), "../images/editor/file/jump.svg");
    setSVG(jumpend.querySelector("div"), "../images/editor/file/downarrow.svg");
    setSVG(propertiesButton.querySelector("div"), "../images/editor/file/info.svg");
    setSVG(ocrButton.querySelector("div"), "../images/editor/file/text.svg");
    setSVG(boardStyleButton.querySelector("div"), "../images/editor/file/fillbucket.svg");
    setSVG(hideshowpage.querySelector("div"), "../images/editor/file/hideshow.svg");
    setSVG(deleteAnnotationsButton.querySelector("div"), "../images/editor/file/delete.svg");

    if (editor.annotationPages.length < 1) {
      frame.querySelector('.brtFileLine[option="findjump"]').remove();
      jumptop.remove();
      jump.remove();
      jumpend.remove();
    }

    find.remove();
    frame.querySelector('.brtFileLine[option="document"]').remove();
    propertiesButton.remove();
    ocrButton.remove();
  }
}