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
          <button class="brgMembers"><span class="brgMemberCount" membercount title="Number of team members."></span>Team</button>
          <div class="brgTopDivider"></div>
          <button class="brgZoom">100%</button>
          <button class="brgAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
          <button class="brgLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="brgToolbarHolder eToolbarHolder" toolbarholder hidden>
      <div class="brgToolbar eToolbar" editor keeptooltip notransition></div>
    </div>
    <div class="brgBottomHolder">
      <div class="brgBottom">
        <div class="brgBottomSection" observebottomsection left>
          <img class="brgObserveIcon" src="../images/editor/members/observe.svg" />
          <div class="brgObserveText">Observing</div>
          <div class="brgObserveCursor" observecursor></div>
          <button class="brgObserveExit buttonAnim border" observeexit></button>
        </div>
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
    ".brgMembers": `display: none; height: 32px; padding: 4px 10px 4px 4px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".brgMembers span": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB)); display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); border-radius: 12px; font-weight: 700`,
    ".brgMemberCount": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB)); display: flex !important`,
    ".brgZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brgAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".brgAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".brgLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    
    ".brgToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".brgBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brgBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".brgBottom::-webkit-scrollbar": `display: none`,
    ".brgBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".brgBottomSection[hidden]": `display: none`,
    ".brgBottomSection:first-child": `border-top-left-radius: 0`,
    ".brgBottomSection:last-child": `border-top-right-radius: 0`,
    ".brgBottomSectionSpacer": `flex: 1`,
    ".brgObserveIcon": `width: 34px; height: 34px; margin: 2px`,
    ".brgObserveText": `margin: 0 6px`,
    ".brgObserveCursor": `box-sizing: border-box; display: flex; padding: 2px 6px; margin-right: 4px; background: var(--theme); color: #fff; border: solid 3px var(--pageColor); box-shadow: 0 0 6px rgb(0 0 0 / 25%); border-radius: 8px 14px 14px; font-size: 14px; font-weight: 700`,
    ".brgObserveExit": `display: flex; position: relative; width: 22px; height: 22px; margin: 8px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 14px`,
    ".brgObserveExit svg": `width: 12px; height: 12px; flex-shrink: 0`,
    ".brgPageNav": `display: flex; width: 32px; height: 32px; padding: 6px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".brgPageNav svg": `width: 100%; height: 100%`,
    ".brgCurrentPage": `min-width: 8px; max-height: 24px; padding: 4px 0; margin: 0 6px; font-size: 20px; outline: unset`,
    ".brgCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 12px`,
    ".brgBottomSection[board]": `display: flex; box-shadow: var(--boardLightShadow)`,
    ".brgBottomSection[board] button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".brgBottomSection[board] button:hover": `background: var(--boardHover)`,
    ".brgBottomSection[board] button svg": `width: 32px; height: 32px; transition: .2s`,
    ".brgBottomSection[board] button:hover svg": `transform: scale(.9)`
  };
  js = async (frame, extra) => {
    if (this.parent.parent.session == null) {
      return;
    }
    if (extra.group == null) {
      let setGroupID = this.parent.parent.self.group;
      if (setGroupID == null) {
        return;
      }
      extra.group = { _id: setGroupID };
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
    let membersButton = rightTop.querySelector(".brgMembers");
    let zoomButton = rightTop.querySelector(".brgZoom");
    let accountButton = rightTop.querySelector(".brgAccount");
    let loginButton = rightTop.querySelector(".brgLogin");

    let scrollLeft = topHolder.querySelector(".brgTopScroll[left]");
    let scrollRight = topHolder.querySelector(".brgTopScroll[right]");

    let contentHolder = page.querySelector(".brgContentHolder");

    let toolbarHolder = page.querySelector(".brgToolbarHolder");
    let editorToolbar = toolbarHolder.querySelector(".brgToolbar");

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

    this.group = extra.group ?? {};

    let fetchAnnotations = sendRequest("GET", "lessons/join/annotations?group=" + this.group._id, null, { session: this.parent.parent.session }, { allowError: true });
    
    if ((this.group ?? {}).created == null) {
      let [code, body] = await sendRequest("GET", "lessons/breakout/groups?group=" + this.group._id, null, { session: this.parent.parent.session }, { allowError: true });
      if (code != 200) {
        return;
      }
      this.group = body;
    }

    if (extra.members == null) {
      this.members = {};
      this.memberCount = 0;
      let memberKeys = Object.keys(this.parent.parent.members);
      for (let i = 0; i < memberKeys.length; i++) {
        let member = this.parent.parent.members[memberKeys[i]] ?? {};
        if (member.group == this.group._id) {
          this.members[member._id] = member;
          this.memberCount++;
        }
      }
    } else {
      this.members = extra.members;
      this.memberCount = Object.keys(this.members).length;
    }

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
        resync: this.parent.parent.resync,
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
    this.updateMemberCount = (button) => {
      if (button == null) {
        button = membersButton;
      }

      let memberCountTx = button.querySelector(".brgMemberCount");

      memberCountTx.textContent = this.memberCount;
      if (this.memberCount > 1) {
        button.style.display = "flex";
      } else {
        button.style.removeProperty("display");
      }

      updateTopBar();
    }
    this.updateMemberCount();

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
      dropdownModule.open(fileButton, "dropdowns/lesson/breakout/group/file", { parent: this });
    });

    this.pipeline.subscribe("updateHistory", "history_update", (data) => {
      if (data.history.length > 0 && data.location > -1) {
        undoButton.removeAttribute("disabled");
      } else {
        undoButton.setAttribute("disabled", "");
      }
      if (data.history.length > data.location + 1) {
        redoButton.removeAttribute("disabled");
      } else {
        redoButton.setAttribute("disabled", "");
      }
    });
    undoButton.addEventListener("click", () => { this.editor.history.undo(); });
    redoButton.addEventListener("click", () => { this.editor.history.redo(); });

    membersButton.addEventListener("click", () => {
      dropdownModule.open(membersButton, "dropdowns/lesson/breakout/group/members", { parent: this });
    });

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
    } else {
      accountButton.remove();
      loginButton.style.display = "block";
      loginButton.addEventListener("click", () => { promptLogin(); });
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
    let boardButton;
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
        if (boardButton == null) {
          bottom.insertAdjacentHTML("afterbegin", `<div class="brgBottomSection" board title="Open Markify Board" new><button class="brgBreakoutOpen"></button></div>`);
          boardButton = bottom.querySelector(".brgBottomSection[new]");
          boardButton.removeAttribute("new");
          let button = boardButton.querySelector("button");
          setSVG(button, "../images/icon.svg");
          button.addEventListener("click", async () => {
            boardButton.remove();
            boardButton = null;
            
            if (boardOpen == false) {
              await this.parent.parent.addPage("board", "board", { insertBefore: this.parent.pageHolder, percent: .5 });
            }
            if (boardVisible == false) {
              this.parent.parent.activePageID = "board";
              this.parent.parent.pushToPipelines(null, "page_switch", { pageID: "board" });
            }
          });
        }
      } else {
        if (boardButton != null) {
          boardButton.remove();
          boardButton = null;
        }
      }
    }
    this.pipeline.subscribe("pageAdd", "page_add", updateSplitScreenButton);
    this.pipeline.subscribe("pageRemove", "page_remove", updateSplitScreenButton);
    this.pipeline.subscribe("pageSwitch", "page_switch", updateSplitScreenButton);
    this.pipeline.subscribe("pageMaximize", "maximize", updateSplitScreenButton);
    updateSplitScreenButton();

    this.pipeline.subscribe("checkPageSwitch", "page_switch", (data) => {
      this.editor.active = data.pageID == "breakout";
    });

    this.pipeline.subscribe("groupSet", "set", (body) => {
      if (body.id != this.group._id) {
        return;
      }
      objectUpdate(body, this.group);
      if (body.hasOwnProperty("name") == true && document.activeElement.closest(".brgGroupName") != groupName) {
        groupName.textContent = this.group.name ?? "Untitled Template";
        groupName.title = groupName.textContent;
      }
      if (body.hasOwnProperty("background") == true) {
        this.editor.updateBackground(body.background);
      }
      this.updateInterface();
    });

    this.pipeline.subscribe("memberJoin", "join", (data) => {
      if (data.group == this.group._id) {
        this.members[data._id] = this.parent.parent.members[data._id];
        this.memberCount++;
        this.updateMemberCount();
      }
    }, { sort: 1 });
    this.pipeline.subscribe("memberUpdate", "update", (data) => {
      if (data.hasOwnProperty("group") == true) {
        if (data.group == this.group._id) {
          if (this.members[data._id] == null) {
            this.members[data._id] = this.parent.parent.members[data._id];
            this.memberCount++;
            this.updateMemberCount();
          }
        } else {
          if (this.members[data._id] != null) {
            delete this.members[data._id];
            this.memberCount--;
            this.updateMemberCount();
          }
        }
      }
    }, { sort: 1 });
    this.pipeline.subscribe("memberLeave", "leave", (data) => {
      let member = this.members[data._id];
      if (member != null) {
        delete this.members[data._id];
        this.memberCount--;
        this.updateMemberCount();
      }
    }, { sort: 1 });

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

modules["dropdowns/lesson/breakout/group/file"] = class {
  html = `
  <button class="brgFileAction" option="groups" title="See all of the other groups." style="--themeColor: var(--secondary)"><div></div>Groups</button>
  <div class="brgFileLine"></div>
  <button class="brgFileAction" option="export" dropdowntitle="Export" title="Export the lesson as a PDF."><div></div>Export</button>
  <button class="brgFileAction" option="print" dropdowntitle="Print" title="Export the lesson and print."><div></div>Print</button>
  <div class="brgFileLine" option="timeline"></div>
  <button class="brgFileAction" option="history" title="See the lesson's version history as a timeline."><div></div>Timeline History</button>
  <div class="brgFileLine" option="findjump"></div>
  <button class="brgFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><div></div>Find</button>
  <button class="brgFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><div></div>Jump to Start</button>
  <button class="brgFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><div></div>Jump to Page</button>
  <button class="brgFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><div></div>Jump to End</button>
  <div class="brgFileLine" option="document"></div>
  <button class="brgFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><div></div>Properties</button>
  <button class="brgFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><div></div>Recognize Text</button>
  <div class="brgFileLine" option="delete"></div>
  <button class="brgFileAction" option="boardstyle" title="Change the board's background color."><div></div>Background Color</button>
  <button class="brgFileAction" option="hideshowpage" title="Hide all pages from members."><div></div>Hide All Pages</button>
  <button class="brgFileAction" option="deleteannotations" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><div></div>Delete Annotations</button>
  `;
  css = {
    ".brgFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".brgFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".brgFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".brgFileAction div svg": `width: 100%; height: 100%`,
    ".brgFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".brgFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async function (frame, extra) {
    let parent = extra.parent;
    let editor = parent.editor;

    let overviewButton = frame.querySelector('.brgFileAction[option="groups"]');
    overviewButton.addEventListener("click", async () => {
      editor.save.syncSave(true);
      parent.parent.closePage("secondary");
      parent.parent.openPage("primary", "breakout/groups");
      dropdownModule.close();
    });
    let exportButton = frame.querySelector('.brgFileAction[option="export"]');
    exportButton.addEventListener("click", () => {
      dropdownModule.open(exportButton, "dropdowns/lesson/file/export", { type: "download", editor: editor });
    });
    let printButton = frame.querySelector('.brgFileAction[option="print"]');
    printButton.addEventListener("click", () => {
      dropdownModule.open(printButton, "dropdowns/lesson/file/export", { type: "print", editor: editor });
    });

    let historyButton = frame.querySelector('.brgFileAction[option="history"]');
    historyButton.addEventListener("click", async () => {
      dropdownModule.close();

      let construct = {
        close: () => {
          parent.parent.closePage("secondary");
          parent.parent.openPage("primary", "breakout/group");
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

        id: parent.group._id,
        parameters: [("group=" + parent.group._id)]
      };
      this.timeline = await parent.parent.openPage("secondary", "editor/timeline", { construct });
    });

    let find = frame.querySelector('.brgFileAction[option="find"]');
    let jumptop = frame.querySelector('.brgFileAction[option="jumptop"]');
    jumptop.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setPage(1, false);
        dropdownModule.close();
      }
      //editor.contentHolder.scrollTo({ top: 0 });
    });
    let jump = frame.querySelector('.brgFileAction[option="jump"]');
    jump.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.page.querySelector(".brgCurrentPage").focus();
        dropdownModule.close();
      }
    });
    let jumpend = frame.querySelector('.brgFileAction[option="jumpend"]');
    jumpend.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setPage(editor.annotationPages.length, false);
        dropdownModule.close();
      }
      //editor.contentHolder.scrollTo({ top: editor.contentHolder.scrollHeight });
    });

    let propertiesButton = frame.querySelector('.brgFileAction[option="properties"]');
    let ocrButton = frame.querySelector('.brgFileAction[option="ocr"]');

    let boardStyleButton = frame.querySelector('.brgFileAction[option="boardstyle"]');
    boardStyleButton.addEventListener("click", async () => {
      dropdownModule.open(boardStyleButton, "dropdowns/editor/boardstyle", { parent: parent });
    });

    let hideshowpage = frame.querySelector('.brgFileAction[option="hideshowpage"]');
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

    let deleteAnnotationsButton = frame.querySelector('.brgFileAction[option="deleteannotations"]');
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
      frame.querySelector('.brgFileLine[option="findjump"]').remove();
      jumptop.remove();
      jump.remove();
      jumpend.remove();
    }

    find.remove();
    frame.querySelector('.brgFileLine[option="document"]').remove();
    propertiesButton.remove();
    ocrButton.remove();
  }
}

modules["dropdowns/lesson/breakout/group/members"] = class {
  html = `
  <div class="brgMemberHolder">
    <div class="brgMemberSearchHolder">
      <div class="brgMemberSearch">
        <div image></div>
        <input placeholder="Search..."></input>
      </div>
    </div>
    <div class="brgMemberMemberHolder">
      <div class="brgMemberAccessHolder" access="owner">
        <button class="brgMemberAccessTitle"><div holder><div title>Owner</div><div count>0</div></div></button>
      </div>
      <div class="brgMemberAccessHolder" access="group">
        <button class="brgMemberAccessTitle"><div holder><div title>Teammates</div><div count>0</div></div></button>
      </div>
      <div class="brgMemberAccessHolder" access="visitor">
        <button class="brgMemberAccessTitle"><div holder><div title>Visitors</div><div count>0</div></div></button>
      </div>
    </div>
  </div>
  `;
  css = {
    ".dropdownTitle .brgMemberCount": `min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeColorRGB), .3); border-radius: 12px; font-weight: 700`,

    ".brgMemberHolder": `width: 275px; max-width: 100%`,
    ".brgMemberSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".brgMemberSearch": `display: flex; width: 100%; align-items: center; border: solid 2px var(--secondary); border-radius: 18px`,
    ".brgMemberSearch div[image]": `width: 24px; height: 24px; margin-left: 4px`,
    ".brgMemberSearch div[image] svg": `width: 100%; height: 100%`,
    ".brgMemberSearch input": `width: 100%; padding: 5px; background: unset; border: unset; outline: unset; color: var(--textColor); font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".brgMemberSearch input::placeholder": `color: var(--secondary)`,

    ".brgMemberMemberHolder": `min-height: 4px`,
    ".brgMemberAccessHolder": `display: none; margin-bottom: 12px; background: var(--pageColor)`,
    ".brgMemberAccessTitle": `position: sticky; display: flex; width: 100%; padding: 0; top: 0px; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 700; font-size: 18px`,
    ".brgMemberAccessTitle div[holder]": `display: flex; width: 100%; padding: 4px 8px; top: 0px; justify-content: space-between; transition: .1s`,
    ".brgMemberAccessTitle div[count]": `margin-left: 6px; font-weight: 500`,
    ".brgMemberAccessTitle:hover div[holder]": `background: var(--hover)`,
    ".brgMemberAccessTitle:active": `transform: scale(1) !important`,
    ".brgMemberAccessTitle:active div[holder]": `background: var(--secondary); color: #fff !important`,
    ".brgMemberAccessHolder[selected] .brgMemberAccessTitle div[holder]": `background: var(--secondary); color: #fff`,

    ".brgMemberTile": `position: relative; display: flex; width: 100%; height: 34px; padding: 0px; justify-content: center; align-items: center; z-index: 1`, //; margin: 4px 0
    ".brgMemberTile div[holder]": `--opacity: 0; position: relative; display: flex; width: 100%; padding: 4px; overflow: hidden; align-items: center; transition: .1s`, //; margin: 4px 0
    ".brgMemberBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: var(--opacity); transition: .1s; z-index: -1`,
    ".brgMemberAccessHolder button:hover div[holder]": `--opacity: .35`,
    ".brgMemberAccessHolder button:hover .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".brgMemberAccessHolder button:active": `transform: scale(1) !important`,
    ".brgMemberAccessHolder button:active div[holder]": `--opacity: 1; color: var(--hoverTextColor); border-radius: 18px; transform: scale(.95)`,
    ".brgMemberAccessHolder button:active .brgMemberCursor": `transform: scale(1.15)`,
    ".brgMemberTile div[holder][selected]": `--opacity: 1 !important; color: var(--hoverTextColor)`,
    ".brgMemberTile div[holder][selected] .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".brgMemberAccessHolder[hover] div[holder]": `--themeColor: var(--secondary) !important; --opacity: .35 !important; color: var(--textColor)`,
    ".brgMemberAccessHolder[hover] .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".brgMemberAccessHolder[active] div[holder]": `--opacity: 1 !important; border-radius: 18px; transform: scale(.95); color: #fff`,
    ".brgMemberAccessHolder[active] .brgMemberCursor": `transform: scale(1.15)`,
    ".brgMemberAccessHolder[selected] div[holder]": `--themeColor: var(--secondary) !important; --opacity: 1 !important; color: #fff`,
    ".brgMemberAccessHolder[selected] .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".brgMemberCursor": `width: 20px; height: 20px; flex-shrink: 0; margin: 0 6px; background: var(--pageColor); border: solid 3px var(--themeColor); overflow: hidden; border-radius: 8px 14px 14px; transition: 0.2s`, //box-shadow: 0 0 6px rgb(0 0 0 / 50%);
    ".brgMemberName": `width: 100%; font-size: 16px; font-weight: 600; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberEvents": `display: flex; margin-left: auto`,
    ".brgMemberEvent": `height: fit-content; padding: 3px 6px; margin: 0 1px 0 6px; border-radius: 12px; color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap`,
    ".brgMemberEvent[self]": `background: var(--theme)`,
    ".brgMemberEvent[idle]": `background: var(--yellow)`,
    ".brgMemberEvent[observe]": `background: var(--purple)`,

    ".brgMemberFrameHolder": `position: absolute; width: 200%; height: fit-content; right: 0px; pointer-events: none; z-index: 0; opacity: 0; transition: top .3s, opacity .3s`,
    ".brgMemberFrame": `--themeColor: var(--theme); position: sticky; width: calc(50% - 4px); max-width: calc(100vw - 20px); left: 8px; top: 8px; margin-left: 4px; pointer-events: all; background: var(--pageColor); border-right: solid 4px var(--themeColor); border-radius: 38px 0 0 12px; transform-origin: top right; transform: scale(0); transition: transform .3s`,
    ".brgMemberFrameContentHolder": `width: 100%; height: 0px; border-radius: 38px 0 0 12px; overflow: hidden`,
    ".brgMemberFrameShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 16px; right: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".brgMemberFrameShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".brgMemberFrameContent": `overflow: auto`,
    ".brgMemberSection": `position: relative; display: flex; width: 100%; justify-content: center; align-items: center`,
    ".brgMemberSectionInfo": `border-radius: 38px 0 0 38px; overflow: hidden`,
    ".brgMemberBackdrop": `position: absolute; display: flex; width: calc(100% + 2px); height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1`,
    ".brgMemberBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(../images/editor/backdrop.svg); background-size: 24px; background-position: center`, //transform: rotate(12deg);
    ".brgMemberFrameCursor": `width: 40px; height: 40px; flex-shrink: 0; margin: 12px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px; transition: 0.2s`,
    ".brgMemberFramePicture": `width: 44px; height: 44px; flex-shrink: 0; margin: 12px; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px; transition: 0.2s`,
    ".brgMemberFrameInfoHolder": `display: flex; flex-direction: column; width: calc(100% - 76px); height: calc(100% - 12px); color: var(--adaptColor); text-align: left`,
    ".brgMemberFrameInfoHolder div[name]": `width: calc(100% - 30px); font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberFrameInfoHolder div[email]": `width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberFrameInfoHolder div[joined]": `font-size: 14px; font-weight: 500; text-align: right; margin: auto 6px 2px 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberClose": `position: absolute; width: 22px; height: 22px; top: 4px; right: 0px; margin: 5px 5px 5px 12px; background: var(--pageColor); --borderWidth: 3px; --borderRadius: 14px`,
    ".brgMemberClose svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".brgMemberSectionDesc": `box-sizing: border-box; padding: 12px 12px 0; font-size: 14px`,
    ".brgMemberSectionEvents": `flex-direction: column`,
    ".brgMemberEventHolder": `display: none; width: calc(100% - 24px); margin: 12px 12px 0px; justify-content: space-between; align-items: center`,
    ".brgMemberEventHolder .brgMemberEvent": `margin: 0px 8px 0 0`,
    ".brgMemberEventDesc": `font-size: 14px; text-align: right`,
    ".brgMemberSectionActions": `flex-wrap: wrap; width: calc(100% - 12px); padding: 6px; margin-top: 6px; justify-content: space-around`,
    ".brgMemberSectionActions button": `display: flex; flex-direction: column; width: 86.33px; padding: 6px 12px; align-items: center; border-radius: 14px; color: var(--themeColor); overflow: visible`,
    ".brgMemberSectionActions button div[image]": `width: 55px; height: 55px; transition: .15s`,
    ".brgMemberSectionActions button div[image] svg": `width: 100%; height: 100%`,
    ".brgMemberSectionActions button div[text]": `margin-top: 6px; font-size: 14px; font-weight: 600; white-space: nowrap`,
    ".brgMemberSectionActions button:hover div[image]": `transform: scale(1.15) translateY(-2px)`,
    ".brgMemberSectionActions button:active": `background: var(--themeColor); color: #fff`,
    ".brgMemberSectionActions button:active div[image]": `filter: brightness(0) invert(1); transform: scale(1)`
  };
  js = async function (frame, extra) {
    frame.closest(".dropdownContent").style.padding = "0px";

    let parent = extra.parent;
    let lesson = parent.parent.parent;
    let editor = parent.editor;

    let dropdownTitle = frame.closest(".dropdownOverflow").querySelector(".dropdownTitle");

    let searchHolder = frame.querySelector(".brgMemberSearch");
    let searchField = searchHolder.querySelector("input");
    let accessHolders = frame.querySelectorAll(".brgMemberAccessHolder");

    // Load Images:
    setSVG(searchHolder.querySelector("div[image]"), "../images/editor/glass.svg", (svg) => { return svg.replace(/"#0084FF"/g, '"var(--secondary)"'); });

    let getAccess = (member) => {
      if (member.access > 3) {
        return "owner";
      }
      if (member.group == parent.group._id) {
        return "group";
      }
      // Visitor logic will go here...
    }
    let getSection = (access) => {
      return frame.querySelector('.brgMemberAccessHolder[access="' + access + '"]');
    }
    let updateOrder = (section, updateTile, member) => {
      for (let i = 1; i < section.children.length; i++) { // 1 to skip title
        let child = section.children[i];
        let prev = parent.members[child.querySelector("div[holder]").getAttribute("member")] ?? {};
        if (child != updateTile && member.name + "_" + member.joined < prev.name + "_" + prev.joined) {
          section.insertBefore(updateTile, child);
          break;
        } else if (i == section.children.length - 1) {
          section.appendChild(updateTile);
        }
      }
    }
    let addMemberTile = (member) => {
      if (member.name.toLowerCase().includes(searchField.value.toLowerCase()) == false) {
        return;
      }
      let section = getSection(getAccess(member));
      if (section == null) {
        return;
      }
      let title = section.querySelector(".brgMemberAccessTitle");
      section.insertAdjacentHTML("beforeend", `<button class="brgMemberTile"><div holder new>
        <div class="brgMemberBackground"></div>
        <div class="brgMemberCursor"></div>
        <div class="brgMemberName"></div>
        <div class="brgMemberEvents"></div>
      </div></button>`);
      let tile = section.querySelector(".brgMemberTile div[holder][new]");
      tile.removeAttribute("new");
      tile.setAttribute("member", member._id);
      updateOrder(section, tile.parentElement, member);
      tile.style.setProperty("--themeColor", member.color);
      tile.style.setProperty("--hoverTextColor", editor.utils.textColorBackground(member.color));
      tile.querySelector(".brgMemberName").textContent = member.name;
      tile.querySelector(".brgMemberName").title = member.name;
      let eventsHolder = tile.querySelector(".brgMemberEvents");
      if (member._id == editor.sessionID) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" self title="This member is you.">YOU</div>`);
      } else { // Don't show if self:
        if (member.active == false) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
        }
        if (member.observe == editor.sessionID) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
        }
      }
      title.querySelector("div[count]").textContent = section.childElementCount - 1; // -1 for title
      section.style.display = "block";
    }
    let updateMemberTile = (member) => {
      if (member == null) {
        return false;
      }
      let tile = frame.querySelector('.brgMemberTile div[holder][member="' + member._id + '"]');
      if (tile == null) {
        return false;
      }

      // Handle User / Color Updates:
      tile.style.setProperty("--themeColor", member.color);
      tile.querySelector(".brgMemberName").textContent = member.name;
      tile.querySelector(".brgMemberName").title = member.name;

      // Handle access changes:
      let section = getSection(getAccess(member));
      let oldSection = tile.parentElement.parentElement;
      if (section != oldSection) {
        section.appendChild(tile.parentElement);

        // Update new section:
        section.querySelector(".brgMemberAccessTitle div[count]").textContent = section.childElementCount - 1; // -1 for title
        section.style.display = "block";

        // Update old section:
        let newOldCount = oldSection.childElementCount - 1; // -1 for title
        oldSection.querySelector(".brgMemberAccessTitle div[count]").textContent = newOldCount;
        if (newOldCount < 1) {
          oldSection.style.display = "none";
        }
      }

      // Update order:
      updateOrder(section, tile.parentElement, member);

      // Handle event state:
      if (member._id != editor.sessionID) {
        let eventsHolder = tile.querySelector(".brgMemberEvents");
        let existingIdle = eventsHolder.querySelector(".brgMemberEvent[idle]");
        if (member.active == false) {
          if (existingIdle == null) {
            eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
          }
        } else if (existingIdle != null) {
          existingIdle.remove();
        }
        let existingObserve = eventsHolder.querySelector(".brgMemberEvent[observe]");
        if (member.observe == editor.sessionID) {
          if (existingObserve == null) {
            eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
          }
        } else if (existingObserve != null) {
          existingObserve.remove();
        }
      }

      // Update member dropdown:
      if (dropdownButton != null) {
        if (dropdownButton.getAttribute("member") == member._id) {
          openDropdown(tile, true);
        } else if (dropdownButton.querySelector("div[title]") != null) {
          openDropdown(dropdownButton, true);
        }
      }
      
      return true;
    }
    let createMemberList = (search) => {
      search = (search ?? "").toLowerCase();
      let keys = Object.keys(parent.members);
      keys = keys.filter((value) => {
        if (parent.members[value].name.toLowerCase().includes(search) == true) {
          return -1;
        }
        return false;
      });
      for (let i = 0; i < keys.length; i++) {
        addMemberTile(parent.members[keys[i]]);
      }
    }
    createMemberList();
    
    let dropdown;
    let memberFrameHolder;
    let dropdownButton;

    editor.pipeline.subscribe("membersDropdownJoin", "join", (body) => {
      if (body.group != parent.group._id) {
        return;
      }
      if (updateMemberTile(parent.members[body._id]) == false) {
        addMemberTile(parent.members[body._id]);
      }
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    }, { sort: 2 });
    let handleLeave = (body) => {
      let removeTileContent = frame.querySelector('.brgMemberTile div[holder][member="' + body._id + '"]');
      if (removeTileContent != null) {
        let removeTile = removeTileContent.parentElement;
        let title = removeTile.parentElement.querySelector("div[count]");
        let newCount = removeTile.parentElement.childElementCount - 2; // -2 for title and tile
        title.textContent = newCount;
        if (newCount < 1) {
          removeTile.parentElement.style.display = "none";
        }
        if ((dropdownButton != null && dropdownButton.getAttribute("member") == body._id) || (newCount < 1 && removeTile.parentElement.hasAttribute("selected"))) {
          closeDropdown();
        }
        removeTile.remove();
      }
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    }
    editor.pipeline.subscribe("membersDropdownLeave", "leave", handleLeave, { sort: 2 });
    editor.pipeline.subscribe("membersDropdownUpdate", "update", (body) => {
      if (body.hasOwnProperty("group") == true) {
        if (body.group != parent.group._id) {
          return handleLeave(body);
        }
      }
      updateMemberTile(parent.members[body._id]);
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    }, { sort: 2 });

    let updateDropdownPosition = () => {
      if (memberFrameHolder == null) {
        return;
      }
      if (dropdownButton == null) {
        dropdown.style.borderTopLeftRadius = "12px";
        dropdown.style.borderBottomLeftRadius = "12px";
        return;
      }
      let dropdownRect = dropdown.getBoundingClientRect();
      let buttonRect = dropdownButton.closest("button").getBoundingClientRect();
      
      let contentFrame = memberFrameHolder.querySelector(".brgMemberFrame");
      let contentHolderFrameHolder = contentFrame.querySelector(".brgMemberFrameContentHolder");
      let contentFrameHolder = contentFrame.querySelector(".brgMemberFrameContent");
      
      let contentHeight = contentFrameHolder.scrollHeight;

      contentFrameHolder.style.maxHeight = "calc(" + (fixed.offsetHeight - dropdownRect.top) + "px - var(--floatMargin))";
      
      contentHolderFrameHolder.style.height = contentFrameHolder.offsetHeight + "px";
      contentHolderFrameHolder.offsetHeight;
      contentHolderFrameHolder.style.transition = "height .3s";

      let setTop = buttonRect.top - dropdownRect.top;
      if (buttonRect.top < dropdownRect.top) {
        setTop = 0;
      }
      if (setTop < dropdownRect.top) { // Above dropdown:
        setTop = 0;
      }
      let dropdownMargin = parseInt(window.getComputedStyle(dropdown).getPropertyValue("--floatMargin"));
      if (buttonRect.top + contentHeight > fixed.offsetHeight - dropdownRect.top - dropdownMargin) { // Below dropdown:
        setTop = fixed.offsetHeight - contentFrameHolder.offsetHeight - dropdownRect.top - dropdownMargin;
      }
      memberFrameHolder.style.top = setTop + "px";
      
      if (setTop < dropdownRect.top) { // Top border radius:
        dropdown.style.borderTopLeftRadius = "0px";
      } else {
        dropdown.style.borderTopLeftRadius = "12px";
      }
      if (setTop + contentFrameHolder.offsetHeight > dropdownRect.top + dropdown.offsetHeight - 20) { // Bottom border radius:
        dropdown.style.borderBottomLeftRadius = "0px";
      } else {
        dropdown.style.borderBottomLeftRadius = "12px";
      }
    }
    editor.pipeline.subscribe("membersDropdownResize", "resize", updateDropdownPosition);
    frame.closest(".dropdownContent").addEventListener("scroll", updateDropdownPosition);

    let closeDropdown = async () => {
      if (memberFrameHolder == null) {
        return;
      }
      if (dropdownButton != null) {
        dropdownButton.removeAttribute("selected");
        if (dropdownButton.parentElement != null) {
          dropdownButton.parentElement.removeAttribute("selected");
        }
        dropdownButton = null;
      }
      memberFrameHolder.style.opacity = 0;
      let frame = memberFrameHolder.querySelector(".brgMemberFrame");
      frame.querySelector(".brgMemberFrameContentHolder").style.removeProperty("transition");
      frame.style.width = frame.clientWidth + "px";
      frame.style.transform = "scale(0)";
      updateDropdownPosition();
    }

    let observeButton;
    let spotlightButton;
    let kickButton;

    let openDropdown = (tile, update) => {
      let member = {};
      if (tile.parentElement.className == "brgMemberTile") {
        member = parent.members[tile.getAttribute("member")];
        if (member == null) {
          tile.remove();
          return;
        }
      } else {
        member = { title: true, name: tile.querySelector("div[title]").textContent, access: parseInt(tile.closest(".brgMemberAccessHolder").getAttribute("access")), color: "var(--secondary)" };
      }
      if (dropdownButton != null) {
        if (dropdownButton == tile && update != true) {
          closeDropdown();
          return;
        } else {
          dropdownButton.removeAttribute("selected");
          if (dropdownButton.parentElement != null) {
            dropdownButton.parentElement.removeAttribute("selected");
          }
        }
      }
      dropdownButton = tile;
      if (member.title == null) {
        dropdownButton.setAttribute("selected", "");
      } else {
        dropdownButton.parentElement.setAttribute("selected", "");
      }
      dropdown = frame.closest(".dropdown");
      memberFrameHolder = dropdown.querySelector(".brgMemberFrameHolder");

      let observeButtonUpdate = () => {
        let memberFrame = memberFrameHolder.querySelector(".brgMemberFrame");
        let button = memberFrame.querySelector(".brgMemberSectionActions button[observe]");
        let member = parent.members[memberFrame.getAttribute("memberid")];
        if (member == null) {
          return;
        }
        let obvImg = "../images/editor/members/observe.svg";
        let obvText = "Observe";
        let obvDesc = "Watch this member's screen.";
        if (editor.realtime.observing == member._id) {
          obvImg = "../images/editor/members/observeexit.svg";
          obvText = "Exit";
          obvDesc = "Stop watching this member's screen."
        }
        let imageHolder = button.querySelector("div[image]");
        imageHolder.innerHTML = "<div></div>";
        setSVG(imageHolder.querySelector("div"), obvImg);
        button.querySelector("div[text]").textContent = obvText;
        button.title = obvDesc;
        if (member.weak != true && lesson.signalStrength > 2 && member.observe == null) {
          observeButton.style.opacity = 1;
        } else {
          observeButton.style.opacity = .5;
        }
      }
      editor.pipeline.subscribe("membersDropdownObserveEnable", "observe_enable", observeButtonUpdate);
      editor.pipeline.subscribe("membersDropdownObserveExit", "observe_exit", observeButtonUpdate);

      this.checkSpotlightUpdate = (fromSelf) => {
        let member = parent.members[memberFrame.getAttribute("memberid")] ?? {};
        let wasShown = spotlightButton.hasAttribute("shown");
        if (member._id == editor.sessionID && member.access > 3 && lesson.memberCount > 1) {
          spotlightButton.style.display = "flex";
          if (fromSelf != true && wasShown == false) {
            spotlightButton.setAttribute("shown", "");
            updateDropdownPosition();
          }
        } else {
          spotlightButton.style.display = "none";
          if (fromSelf != true && wasShown == true) {
            spotlightButton.removeAttribute("shown");
            updateDropdownPosition();
          }
        }
        if (lesson.signalStrength > 2) {
          spotlightButton.style.opacity = 1;
        } else {
          spotlightButton.style.opacity = .5;
        }
      }

      if (memberFrameHolder == null) {
        dropdown.insertAdjacentHTML("beforeend", `<div class="brgMemberFrameHolder">
        <div class="brgMemberFrame">
          <div class="brgMemberFrameShadow"></div>
          <div class="brgMemberFrameContentHolder">
            <div class="brgMemberFrameContent">
              <div class="brgMemberSection brgMemberSectionInfo">
                <div class="brgMemberBackdrop"><div></div></div>
                <div class="brgMemberFrameCursor"></div>
                <img class="brgMemberFramePicture">
                <div class="brgMemberFrameInfoHolder">
                  <div name></div>
                  <div email></div>
                </div>
                <button class="brgMemberClose buttonAnim border"></button>
              </div>
              <div class="brgMemberSection brgMemberSectionDesc"></div>
              <div class="brgMemberSection brgMemberSectionEvents">
                <div class="brgMemberEventHolder" self>
                  <div class="brgMemberEvent" self>YOU</div>
                  <div class="brgMemberEventDesc">This is your profile.</div>
                </div>
                <div class="brgMemberEventHolder" idle>
                  <div class="brgMemberEvent" idle>IDLE</div>
                  <div class="brgMemberEventDesc">They're currently viewing another window.</div>
                </div>
                <div class="brgMemberEventHolder" observe>
                  <div class="brgMemberEvent" observe>OBSERVE</div>
                  <div class="brgMemberEventDesc">They're following you around the lesson.</div>
                </div>
              </div>
              <div class="brgMemberSection brgMemberSectionActions">
                <button observe style="--themeColor: var(--purple)">
                  <div image></div>
                  <div text>Observe</div>
                </button>
                <button spotlight style="--themeColor: var(--purple)" title="Bring members to your location.">
                  <div image></div>
                  <div text>Spotlight</div>
                </button>
                <button kick style="--themeColor: var(--error)" title="Revoke all viewing and editing privileges.">
                  <div image></div>
                  <div text>Kick</div>
                </button>
              </div>
            </div>
          </div>
        </div></div>`);
        memberFrameHolder = dropdown.querySelector(".brgMemberFrameHolder");
        let closeButton = memberFrameHolder.querySelector(".brgMemberClose");
        closeButton.addEventListener("click", closeDropdown);
        setSVG(closeButton, "../images/tooltips/close.svg");
        memberFrameHolder.offsetHeight;

        observeButton = memberFrameHolder.querySelector(".brgMemberSectionActions button[observe]");
        spotlightButton = memberFrameHolder.querySelector(".brgMemberSectionActions button[spotlight]");
        kickButton = memberFrameHolder.querySelector(".brgMemberSectionActions button[kick]");

        observeButton.addEventListener("click", async (event) => {
          let memberid = event.target.closest(".brgMemberFrame").getAttribute("memberid");
          if (editor.realtime.observing == memberid) {
            console.log(editor.realtime.module)
            editor.realtime.module.exitObserve();
            return;
          }
          let member = parent.members[memberid];
          if (member == null) {
            dropdownModule.close();
            return;
          }
          if (lesson.signalStrength < 3) {
            alertModule.open("error", `<b>Unable to Connect</b>Your connection is too weak to watch their screen.`);
            return;
          }
          if (member.observe != null) {
            alertModule.open("error", `<b>Unable to Connect</b>This member is observing someone else.`);
            return;
          }
          if (member.weak == true) {
            alertModule.open("error", `<b>Unable to Connect</b>${member.name} has too weak of a connection to watch their screen.`);
            return;
          }
          observeButton.setAttribute("disabled", "");
          let prevObserve = editor.realtime.observing;
          editor.realtime.observing = memberid;
          editor.realtime.module.setShortSub(editor.visibleChunks);
          alertModule.close(editor.realtime.observeLoading);
          clearTimeout(editor.realtime.observeTimeout);
          let [code] = await sendRequest("GET", "lessons/members/observe?member=" + memberid, null, { session: editor.session });
          if (code == 200) {
            editor.realtime.observeLoading = await alertModule.open("info", `<b>Connecting to Member</b>Connecting to ${member.name}'s screen to observe!`, { time: "never" });
            editor.realtime.observeTimeout = setTimeout(() => {
              alertModule.close(editor.realtime.observeLoading);
              alertModule.open("error", `<b>Observe Timeout</b>Failed to connect to their screen, please try again later...`);
              editor.realtime.module.exitObserve();
            }, 10000);
          } else {
            if (prevObserve != null) {
              editor.realtime.observing = prevObserve;
              editor.realtime.module.exitObserve();
            }
            editor.realtime.observing = null;
            editor.realtime.module.setShortSub(editor.visibleChunks);
          }
          observeButton.removeAttribute("disabled");
        });
  
        spotlightButton.addEventListener("click", async (event) => {
          let memberid = event.target.closest(".brgMemberFrame").getAttribute("memberid");
          let member = parent.members[memberid];
          if (member == null) {
            dropdownModule.close();
            return;
          }
          if (lesson.signalStrength < 3) {
            alertModule.open("error", `<b>Unable to Connect</b>Your connection is too weak to use spotlight.`);
            return;
          }
          if (editor.realtime.observing != null) {
            editor.realtime.module.exitObserve();
          }
          spotlightButton.setAttribute("disabled", "");
          alertModule.open("info", `<b>Spotlight</b>Letting members know about the spotlight...`);
          await sendRequest("GET", "lessons/members/observe/spotlight?member=" + memberid, null, { session: editor.session });
          spotlightButton.removeAttribute("disabled");
        });
  
        kickButton.addEventListener("click", async (event) => {
          kickButton.setAttribute("disabled", "");
          let frame = event.target.closest(".brgMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let url = "lessons/members/kick";
          if (memberid != null) {
            url += "?member=" + parent.members[memberid]._id;
          } else {
            url += "?permaccess=" + frame.getAttribute("access");
          }
          let [code] = await sendRequest("DELETE", url, null, { session: editor.session });
          if (code == 200) {
            closeDropdown();
          }
          kickButton.removeAttribute("disabled");
        });

        setSVG(spotlightButton.querySelector("div[image]"), "../images/editor/members/spotlight.svg");
        setSVG(kickButton.querySelector("div[image]"), "../images/editor/members/kick.svg");
      }

      let memberFrame = memberFrameHolder.querySelector(".brgMemberFrame");
      if (member.title == null) {
        memberFrame.setAttribute("memberid", member._id);
        memberFrame.removeAttribute("access");
        memberFrame.style.setProperty("--adaptColor", editor.utils.textColorBackground(member.color));
      } else {
        memberFrame.setAttribute("access", getAccess(member));
        memberFrame.removeAttribute("memberid");
        memberFrame.style.setProperty("--adaptColor", "#fff");
      }
      memberFrame.style.setProperty("--themeColor", member.color);
      memberFrame.style.removeProperty("width");

      let cursor = memberFrameHolder.querySelector(".brgMemberFrameCursor");
      let picture = memberFrameHolder.querySelector(".brgMemberFramePicture");
      if (member.image == null) {
        picture.style.display = "none";
        cursor.style.display = "unset";
      } else {
        cursor.style.display = "none";
        picture.src = member.image;
        picture.style.display = "unset";
      }
      let name = memberFrameHolder.querySelector(".brgMemberFrameInfoHolder div[name]");
      name.textContent = member.name;
      name.title = member.name;
      let email = memberFrameHolder.querySelector(".brgMemberFrameInfoHolder div[email]");
      if (member.email) {
        email.textContent = member.email;
        email.title = member.email;
        email.style.display = "unset";
      } else {
        email.style.display = "none";
      }

      let frameDesc = memberFrameHolder.querySelector(".brgMemberSectionDesc");
      if (member.title != null) {
        switch (member.access) {
          case "group":
            frameDesc.textContent = "This is a member of the team.";
            break;
          case "visitor":
            frameDesc.textContent = "Members who are checking out the team's work.";
            break;
          case "owner":
            frameDesc.textContent = "The owner has full access to all aspects of the lesson.";
        }
        frameDesc.style.display = "block";
      } else {
        frameDesc.style.display = "none";
      }

      let isSelf = member._id == editor.sessionID;
      let self = memberFrameHolder.querySelector(".brgMemberEventHolder[self]");
      let idle = memberFrameHolder.querySelector(".brgMemberEventHolder[idle]");
      let observe = memberFrameHolder.querySelector(".brgMemberEventHolder[observe]");
      if (isSelf == true) {
        self.style.display = "flex";
      } else {
        self.style.display = "none";
      }
      if (member.active == false && isSelf == false) {
        idle.style.display = "flex";
      } else {
        idle.style.display = "none";
      }
      observeButtonUpdate();
      if (member.observe == editor.sessionID && isSelf == false) {
        observe.style.display = "flex";
      } else {
        observe.style.display = "none";
      }
      observeButton.removeAttribute("disabled");
      kickButton.removeAttribute("disabled");

      if (isSelf == false && editor.self.access > 3 && member.access < 4) {
        kickButton.style.display = "flex";
      } else {
        kickButton.style.display = "none";
      }
      if (isSelf == false && member.title == null && (member.access > 0 || lesson.lesson.settings.observeViewers != false || editor.self.access > 3)) {
        observeButton.style.display = "flex";
      } else {
        observeButton.style.display = "none";
      }
      this.checkSpotlightUpdate(true);
      memberFrameHolder.style.opacity = 1;
      memberFrame.style.transform = "scale(1)";
      updateDropdownPosition();
    }

    frame.addEventListener("click", (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let memberTile = element.closest(".brgMemberTile") ?? element.closest(".brgMemberAccessTitle");
      if (memberTile != null) {
        if (memberTile.className == "brgMemberTile") {
          memberTile = memberTile.querySelector("div[holder]");
        }
        return openDropdown(memberTile);
      }
    });

    for (let i = 0; i < accessHolders.length; i++) {
      let holder = accessHolders[i];
      let title = holder.querySelector(".brgMemberAccessTitle");
      title.addEventListener("mouseenter", function() {
        holder.setAttribute("hover", "");
      });
      title.addEventListener("mouseleave", function() {
        holder.removeAttribute("hover");
        holder.removeAttribute("active");
      });
      title.addEventListener("mousedown", function() {
        holder.setAttribute("active", "");
      });
      title.addEventListener("mouseup", function() {
        holder.removeAttribute("active");
      });
    }

    searchField.addEventListener("input", () => {
      closeDropdown();
      
      let clearTiles = frame.querySelectorAll(".brgMemberTile");
      for (let i = 0; i < clearTiles.length; i++) {
        if (clearTiles[i].parentElement.childElementCount < 3) { // 3 to account for title and removed tile
          clearTiles[i].parentElement.style.display = "none";
        }
        clearTiles[i].remove();
      }

      createMemberList(searchField.value);
    });
  }
}