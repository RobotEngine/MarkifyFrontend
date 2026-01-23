modules["breakout/group"] = class {
  html = `
  <div class="brgInterface customScroll">
    <div class="brgTopHolder">
      <button class="brgTopScroll" left style="left: 7px"></button>
      <button class="brgTopScroll" right style="right: 7px"></button>
      <div class="brgTop">
        <div class="brgTopSection" left>
          <a class="brgLogo" href="/app/dashboard" draggable="false"></a>
          <div class="brgGroupNameHolder border"><div class="brgGroupName" spellcheck="false"></div></div>
          <button class="brgFileDropdown">File</button>
          <div class="brgTopDivider"></div>
          <button class="brgSaveProgress brgUndo" disabled></button>
          <button class="brgSaveProgress brgRedo" disabled></button>
          <div class="brgStatusHolder"><div class="brgStatus">
            <div strength="3" title="Strong Connection | All features seamlessly synced to the cloud."></div>
            <div strength="2" title="Weak Connection | Cloud-saved annotations, limited real-time features."></div>
            <div strength="1" title="No Connection | Changes stored on-device, synced to cloud upon reconnecting."></div>
          </div></div>
        </div>
        <div class="brgTopSection" scroll>
          <div class="brgTopDivider"></div>
        </div>
        <div class="brgTopSection" right>
          <button class="brgSubmit">Submit</button>
          <button class="brgMembers">Team</button>
          <div class="brgTopDivider"></div>
          <button class="brgZoom">100%</button>
          <button class="brgAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
        </div>
      </div>
    </div>
    <div class="brgToolbarHolder eToolbarHolder" toolbarholder hidden>
      <div class="brgToolbar eToolbar" editor keeptooltip notransition></div>
    </div>
    <div class="brgBottomHolder">
      <div class="brgBottom">
      <div class="brgBottomSection" board title="Open Markify Board" new><button class="brgBoardOpen"></button></div>
        <div class="brgBottomSectionSpacer"></div>
        <div class="brgBottomSection" right>
          <button class="brgPageNav" down></button>
          <div class="brgCurrentPage border" contenteditable></div>
          <button class="brgPageNav" up></button>
        </div>
      </div>
    </div>
  </div>
  <div class="brgContentHolder customScroll" disabled></div>
  `;
  css = {
    ".brgInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; transform: translateZ(0); visibility: hidden; pointer-events: none; user-select: none; overflow: scroll; z-index: 2`,
    ".brgContentHolder": `position: relative; width: 100%; height: 100%; background: var(--pageColor); contain: strict; overflow: scroll; z-index: 1; transition: .5s`,
    
    ".brgTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brgTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".brgTopHolder[scroll] .brgTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brgTop::-webkit-scrollbar": `display: none`,
    ".brgTopSection[scroll]": `display: none`,
    ".brgTopHolder[scroll] .brgTopSection[scroll]": `display: flex !important`,
    ".brgTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".brgTopScroll svg": `width: 22px`,
    ".brgTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".brgTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brgTopHolder[scroll] .brgTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".brgTopSection[left]": `border-bottom-right-radius: 12px`,
    ".brgTopSection[right]": `border-bottom-left-radius: 12px`,

    ".brgLogo": `display: flex; width: 38px; height: 38px; padding: 0; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".brgLogo:hover": `background: var(--hover)`,
    ".brgLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".brgLogo:hover svg": `transform: scale(.9)`,
    ".brgGroupNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".brgGroupName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".brgGroupName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".brgGroupName::-webkit-scrollbar": `display: none`,
    ".brgFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brgTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".brgSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".brgSaveProgress svg": `width: 24px; height: 24px; margin: 2px`,
    ".brgUndo": `margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px`,
    ".brgRedo": `margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0`,
    ".brgStatusHolder": `display: flex; width: 32px; height: 32px; margin: 4px; justify-content: center; align-items: center`,
    ".brgStatus": `position: relative; width: 100%; height: 100%; transform: scale(.9)`,
    ".brgStatus > div": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; transition: .4s`,
    ".brgStatus svg *": `transform-origin: center; transition: .4s`,
    ".brgStatus[saving] [saved]": `opacity: 0`,
    ".brgStatus:not([saving]) [saving]": `opacity: 0`,
    ".brgStatus:not([saving]) [animation]": `animation-play-state: paused`,
    ".brgStatus [animation]": `animation: brgStatusSpinAnimation 2s linear infinite`,
    "@keyframes brgStatusSpinAnimation": `from { transform: rotate(0deg) } to { transform: rotate(360deg) }`,

    ".brgSubmit": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; align-items: center; font-size: 16px; font-weight: 600`,
    ".brgMembers": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".brgMembers span": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB)); display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); border-radius: 12px; font-weight: 700`,
    ".brgZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brgAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".brgAccount img": `width: 100%; height: 100%; object-fit: cover`,
    
    ".brgToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".brgBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brgBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".brgBottom::-webkit-scrollbar": `display: none`,
    ".brgBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".brgBottomSection[hidden]": `display: none`,
    ".brgBottomSection:first-child": `border-top-left-radius: 0`,
    ".brgBottomSection:last-child": `border-top-right-radius: 0`,
    ".brgBottomSectionSpacer": `flex: 1`,
    ".brgPageNav": `display: flex; width: 32px; height: 32px; padding: 6px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".brgPageNav svg": `width: 100%; height: 100%`,
    ".brgCurrentPage": `min-width: 8px; max-height: 24px; padding: 4px 0; margin: 0 6px; font-size: 20px; outline: unset`,
    ".brgCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 12px`,
    ".brgBottomSection[board]": `box-shadow: var(--boardLightShadow)`,
    ".brgBottomSection[board] button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".brgBottomSection[board] button:hover": `background: var(--boardHover)`,
    ".brgBottomSection[board] button svg": `width: 32px; height: 32px; transition: .2s`,
    ".brgBottomSection[board] button:hover svg": `transform: scale(.9)`
  };
  js = async (frame, extra) => {
    if (this.parent.parent.session == null) {
      return;
    }

    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let page = frame.closest(".content");

    let topHolder = page.querySelector(".brgTopHolder");
    let top = topHolder.querySelector(".brgTop");
    let bottom = page.querySelector(".brgBottom");

    let leftTop = top.querySelector(".brgTopSection[left]");
    let icon = leftTop.querySelector(".brgLogo");
    let groupName = leftTop.querySelector(".brgGroupName");
    let fileButton = leftTop.querySelector(".brgFileDropdown");
    let undoButton = leftTop.querySelector(".brgUndo");
    let redoButton = leftTop.querySelector(".brgRedo");
    let status = leftTop.querySelector(".brgStatus");

    let rightTop = top.querySelector(".brgTopSection[right]");
    let submitButton = rightTop.querySelector(".brgSubmit");
    let finishButton = rightTop.querySelector(".brgMembers");
    let zoomButton = rightTop.querySelector(".brgZoom");
    let accountButton = rightTop.querySelector(".brgAccount");

    let scrollLeft = topHolder.querySelector(".brgTopScroll[left]");
    let scrollRight = topHolder.querySelector(".brgTopScroll[right]");

    let contentHolder = page.querySelector(".brgContentHolder");

    let toolbarHolder = page.querySelector(".brgToolbarHolder");
    let editorToolbar = toolbarHolder.querySelector(".brgToolbar");

    let openBoardHolder = bottom.querySelector(".brgBottomSection[board]");
    let openBoard = openBoardHolder.querySelector("button");

    let currentPageHolder = bottom.querySelector(".brgBottomSection[right]");
    let pageTextBox = currentPageHolder.querySelector(".brgCurrentPage");
    let increasePageButton = currentPageHolder.querySelector(".brgPageNav[down]");
    let decreasePageButton = currentPageHolder.querySelector(".brgPageNav[up]");

    let stringPref = JSON.stringify(this.parent.parent.preferences); // Must be duplicated

    // Load Images:
    setSVG(scrollLeft, "../images/editor/top/leftarrow.svg");
    setSVG(scrollRight, "../images/editor/top/rightarrow.svg");
    setSVG(icon, "../images/breakout.svg");
    setSVG(undoButton, "../images/tooltips/progress/undo.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(redoButton, "../images/tooltips/progress/redo.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(status.querySelector('div[strength="3"]'), "../images/editor/status/full.svg");
    setSVG(status.querySelector('div[strength="2"]'), "../images/editor/status/weak.svg");
    setSVG(status.querySelector('div[strength="1"]'), "../images/editor/status/none.svg");
    setSVG(increasePageButton, "../images/editor/bottom/plus.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(decreasePageButton, "../images/editor/bottom/minus.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    
    this.group = {};

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
        backgroundColor: this.group.background ?? "FFFFFF",

        id: this.group._id,
        parameters: [("group=" + this.group._id)]
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

    groupName.textContent = this.group.name ?? "Untitled Group";
    groupName.title = groupName.textContent;
    groupName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        groupName.blur();
      }
    });
    groupName.addEventListener("input", updateTopBar);
    groupName.addEventListener("focusout", async () => {
      groupName.scrollTo(0, 0);
      groupName.parentElement.style.setProperty("--borderWidth", "0px");
      updateTopBar();

      let name = groupName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        groupName.textContent = this.group.name;
        return;
      }
      if (groupName.textContent == this.group.name) {
        groupName.textContent = this.group.name;
        return;
      }
      let oldName = this.group.name;
      this.group.name = name;
      groupName.textContent = name;
      groupName.title = name;
      let [code] = await sendRequest("POST", "lessons/breakout/group/name?group=" + this.group._id, { name: name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.group.name = oldName;
        groupName.textContent = oldName;
        groupName.title = oldName;
      }
    });
    groupName.addEventListener("focus", async () => {
      groupName.parentElement.style.setProperty("--borderWidth", "4px");
      updateTopBar();
    });
    groupName.addEventListener("paste", clipBoardRead);

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

    // Load annotations here...
    
    (async () => {
      await (await this.newModule("editor/realtime")).js(this.editor);
      await (await this.newModule("editor/toolbar")).js(this.editor);

      editorToolbar.removeAttribute("notransition");
    })();

    this.updateInterface();
  }
}