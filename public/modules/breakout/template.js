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
  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let page = frame.closest(".content");

    let topHolder = page.querySelector(".brtTopHolder");
    let top = topHolder.querySelector(".brtTop");
    let bottom = page.querySelector(".brtBottom");

    let leftTop = top.querySelector(".brtTopSection[left]");
    let closeButton = leftTop.querySelector(".brtClose");
    let lessonName = leftTop.querySelector(".brtFileName");
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

    closeButton.addEventListener("click", () => {
      this.parent.openPage("primary", "breakout/overview");
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
    
    /*let setLesson = (body) => {
      this.lesson = body.lesson;
    }
    if (extra.template != null) {
      setLesson(extra.template);
    } else if (extra.id != null) {
      let [code, body, meta] = await sendRequest("POST", "lessons/join/template?lesson=" + this.parent.parent.id + "&template=" + extra.id, { ss: socket.secureID }, { session: this.parent.parent.session, allowError: [403, 406] });
      if (code != 200) {
        return;
      }
      if (meta.took < 2500) {
        this.parent.parent.signalStrength = 3;
      } else {
        this.parent.parent.signalStrength = 2;
      }
      setLesson(body);
    } else {
      return;
    }*/
    this.lesson = {};

    this.editor = await this.setFrame("editor/editor", contentHolder, {
      construct: {
        page: page,
        pageID: this.parent.pageID,
        pageType: this.parent.pageType,
        id: this.lesson.id,
        lesson: this.lesson,
        self: this.parent.parent.self,
        session: this.parent.parent.session,
        sessionID: this.parent.parent.sessionID,
        sources: this.parent.parent.sources,
        collaborators: this.parent.parent.collaborators,
        settings: this.parent.parent.lesson.settings,
        resync: this.parent.resync,
        preferences: JSON.parse(stringPref),
        lastSavePreferences: JSON.parse(stringPref),
        backgroundColor: this.lesson.background ?? "FFFFFF",
        disablePointerEvents: true
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

    lessonName.textContent = this.lesson.name ?? "Untitled Lesson";
    lessonName.title = lessonName.textContent;
    lessonName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        lessonName.blur();
      }
    });
    lessonName.addEventListener("input", updateTopBar);
    lessonName.addEventListener("focusout", async () => {
      lessonName.scrollTo(0, 0);
      lessonName.parentElement.style.setProperty("--borderWidth", "0px");
      updateTopBar();

      let name = lessonName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        lessonName.textContent = this.lesson.name;
        return;
      }
      if (lessonName.textContent == this.lesson.name) {
        lessonName.textContent = this.lesson.name;
        return;
      }
      let oldName = this.lesson.name;
      this.lesson.name = name;
      lessonName.textContent = name;
      lessonName.title = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.session });
      if (code != 200) {
        this.lesson.name = oldName;
        lessonName.textContent = oldName;
        lessonName.title = oldName;
      }
    });
    lessonName.addEventListener("focus", async () => {
      lessonName.parentElement.style.setProperty("--borderWidth", "4px");
      updateTopBar();
    });
    lessonName.addEventListener("paste", clipBoardRead);

    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/lesson/file", { parent: this });
    });

    this.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      zoomButton.textContent = Math.round(event.zoom * 100) + "%";
      updateTopBar();
    });
    zoomButton.addEventListener("click", () => {
      dropdownModule.open(zoomButton, "dropdowns/lesson/zoom", { parent: this });
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

    this.updateInterface();

    (async () => {
      await (await this.newModule("editor/realtime")).js(this.editor);
      await (await this.newModule("editor/toolbar")).js(this.editor);

      editorToolbar.removeAttribute("notransition");
    })();
  }
}