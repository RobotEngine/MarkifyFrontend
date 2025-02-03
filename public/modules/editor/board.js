modules["editor/board"] = class {
  html = `<div class="eInterface eCustomScroll">
    <div class="eTopHolder">
      <button class="eTopScroll" left style="left: 7px"><img src="./images/editor/top/leftarrow.svg" /></button>
      <button class="eTopScroll" right style="right: 7px"><img src="./images/editor/top/rightarrow.svg" /></button>
      <div class="eTop">
        <div class="eTopSection" left>
          <a class="eLogo" href="#dashboard" draggable="false"></a>
          <div class="eFileNameHolder border"><div class="eFileName" spellcheck="false" onpaste="clipBoardRead(event)"></div></div>
          <button class="eFileDropdown">File</button>
          <button class="eCreateCopy">Make Copy</button>
          <div class="eTopDivider"></div>
          <button class="eSaveProgress eUndo" disabled></button>
          <button class="eSaveProgress eRedo" disabled></button>
          <div class="eStatus">
            <div class="eStatusStrength" full>
              <svg saved width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15.2344" cy="15.2344" r="12.4219" stroke="#48A7FF" stroke-width="3.75"/>
                <path d="M9.4375 15.9905L13.1524 19.7054C13.8847 20.4377 15.0719 20.4377 15.8041 19.7054L25.6399 9.86957" stroke="white" stroke-width="7.5" stroke-linecap="round"/>
                <path d="M9.4375 15.793L13.9458 20.061C14.3073 20.4033 14.8733 20.4033 15.2348 20.061L26 9.86957" stroke="#48A7FF" stroke-width="3.75" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="eTopSection" scroll>
          <div class="eTopDivider"></div>
        </div>
        <div class="eTopSection" right>
          <button class="eMembers"><span class="eMemberHandCount" title="Number of hands raised."></span><span class="eMemberIdleCount" title="Number of idle members."></span><span class="eMemberCount" title="Number of members."></span>Members</button>
          <button class="eEndSession" title="End Session | Disable all editing access making everyone a viewer."></button>
          <button class="eShare">Share</button>
          <button class="eMemberOptions" dropdowntitle="Options" title="Member Options | Configure various member settings and available tools."></button>
          <button class="eSharePin"></button>
          <div class="eTopDivider"></div>
          <button class="eZoom">100%</button>
          <button class="eAccount"><img src="./images/profiles/default.svg" accountimage /><div accountuser></div></button>
          <button class="eLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="eToolbarHolder">
      <div class="eToolbar"></div>
      <div class="eViewerActions">
        <button hidden class="eHandRaise largeButton" tool><img src="./images/editor/actions/raisehand.svg" /></button>
      </div>
    </div>
    <div class="eBottomHolder">
      <div class="eBottom">
        <div class="eBottomSection" left>
          <img class="eObserveIcon" src="./images/editor/members/observe.svg" />
          <div class="eObserveText">Observing</div>
          <div class="eObserveCursor"></div>
          <button class="eObserveExit buttonAnim border"><img src="./images/tooltips/close.svg"></button>
        </div>
        <div class="eBottomSection" right>
          <button class="ePageNav" down></button>
          <div class="eCurrentPage border" contenteditable></div>
          <button class="ePageNav" up></button>
        </div>
      </div>
    </div>
  </div>
  <div class="eContentHolder eCustomScroll" disabled></div>
  `;
  css = {
    ".eCustomScroll::-webkit-scrollbar": `width: 16px; background: var(--scrollGray)`,
    ".eCustomScroll::-webkit-scrollbar-corner": `background: var(--scrollGray)`,
    ".eCustomScroll::-webkit-scrollbar-thumb": `border: 4px solid var(--scrollGray); background: var(--gray); border-radius: 8px`,
    ".eCustomScroll::-webkit-scrollbar-thumb:active": `background: var(--activeGray)`,
    ".eInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; overflow: scroll; z-index: 2`,
    ".eContentHolder": `position: relative; width: 100%; height: 100%; overflow: scroll; z-index: 1; transition: .5s`,
    //".eContentHolder .content": `width: 5000px; height: 5000px`, // Just a test
    
    ".eTopHolder": `position: relative; width: 100%; height: 50px; visibility: visible`,
    ".eTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".eTopHolder[scroll] .eTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eTop::-webkit-scrollbar": `display: none`,
    ".eTopSection[scroll]": `display: none`,
    ".eTopHolder[scroll] .eTopSection[scroll]": `display: flex !important`,
    ".eTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(180, 218, 253, .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".eTopScroll img": `width: 22px`,
    ".eTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eTopHolder[scroll] .eTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".eTopSection[left]": `border-bottom-right-radius: 12px`,
    ".eTopSection[right]": `border-bottom-left-radius: 12px`,

    ".eLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".eLogo svg": `width: 32px; height: 32px`,
    //".eLogo:hover": `background: var(--hover)`,
    ".eFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".eFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".eFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".eFileName::-webkit-scrollbar": `display: none`,
    ".eFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eCreateCopy": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".eTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".eSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".eSaveProgress svg": `width: 24px; height: 24px; margin: 2px`,
    ".eUndo": `margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px`,
    ".eRedo": `margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0`,
    ".eStatus": `display: flex; width: 32px; height: 32px; margin: 4px; justify-content: center; align-items: center`,
    ".eStatusStrength": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center`,

    ".eMembers": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".eMembers span": `display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: #fff; border-radius: 12px; font-weight: 700`,
    ".eMemberCount": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB))`,
    ".eMemberHandCount": `--themeColorRGB: var(--greenRGB); color: rgb(var(--themeColorRGB))`,
    ".eMemberIdleCount": `--themeColorRGB: var(--yellowRGB); color: rgb(var(--themeColorRGB))`,
    ".eEndSession": `display: none; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--error); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".eEndSession svg": `width: 28px; height: 28px`,
    ".eShare": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".eMemberOptions": `display: none; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".eMemberOptions svg": `width: 32px; height: 32px`,
    ".eSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".eAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".eLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,

    ".eToolbarHolder": `position: relative; display: flex; gap: 8px; width: fit-content; flex: 1; margin: 8px 0; visibility: visible`,
    ".eToolbar": `position: relative; display: flex; box-sizing: border-box; margin: auto 0; align-items: center; pointer-events: all`,
    ".eViewerActions": `position: absolute; display: flex; height: calc(100% - 16px); left: 8px; top: 8px`,
    ".eHandRaise": `position: relative; display: flex; box-sizing: border-box; width: 60px; height: 60px; margin: auto 4px; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; --borderRadius: 30px`,
    ".eHandRaise img": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: 30px`,
    ".eHandRaise[selected]": `background: var(--theme)`,

    ".eBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".eBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".eBottom::-webkit-scrollbar": `display: none`,
    ".eBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eBottomSection[left]": `border-top-right-radius: 12px`,
    ".eObserveIcon": `width: 34px; height: 34px; margin: 2px`,
    ".eObserveText": `margin: 0 6px`,
    ".eObserveCursor": `box-sizing: border-box; display: flex; padding: 2px 6px; margin-right: 4px; background: var(--theme); color: #fff; border: solid 3px var(--pageColor); box-shadow: 0 0 6px rgb(0 0 0 / 25%); border-radius: 8px 14px 14px; font-size: 14px; font-weight: 700`,
    ".eObserveExit": `display: flex; position: relative; width: 22px; height: 22px; margin: 8px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 14px`,
    ".eObserveExit img": `width: 12px; height: 12px`,
    ".eBottomSection[right]": `margin-left: auto; border-top-left-radius: 12px`,
    ".ePageNav": `display: flex; width: 31px; height: 31px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".eCurrentPage": `margin: 0 6px; font-size: 20px; outline: unset`,
    ".eCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 19px`
  };

  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.lesson = this.parent.lesson;
    this.session = this.parent.session;

    let page = frame.closest(".lPage");

    let eTopHolder = frame.querySelector(".eTopHolder");
    let eTop = eTopHolder.querySelector(".eTop");

    let leftTop = eTop.querySelector(".eTopSection[left]");
    let lessonName = leftTop.querySelector(".eFileName");
    let fileButton = leftTop.querySelector(".eFileDropdown");
    let createCopyButton = leftTop.querySelector(".eCreateCopy");
    let undoButton = leftTop.querySelector(".eUndo");
    let redoButton = leftTop.querySelector(".eRedo");
    let status = leftTop.querySelector(".eStatus");

    let rightTop = eTop.querySelector(".eTopSection[right]");
    let membersButton = rightTop.querySelector(".eMembers");
    let endSessionButton = rightTop.querySelector(".eEndSession");
    let shareButton = rightTop.querySelector(".eShare");
    let optionsButton = rightTop.querySelector(".eMemberOptions");
    let sharePinButton = rightTop.querySelector(".eSharePin");
    let zoomButton = rightTop.querySelector(".eZoom");
    let accountButton = rightTop.querySelector(".eAccount");
    let loginButton = rightTop.querySelector(".eLogin");

    let eTopScrollLeft = eTopHolder.querySelector(".eTopScroll[left]");
    let eTopScrollRight = eTopHolder.querySelector(".eTopScroll[right]");

    let contentHolder = frame.querySelector(".eContentHolder");

    let currentPageHolder = frame.querySelector(".eBottomSection[right]");
    let pageTextBox = currentPageHolder.querySelector(".eCurrentPage");
    let increasePageButton = currentPageHolder.querySelector(".ePageNav[down]");
    let decreasePageButton = currentPageHolder.querySelector(".ePageNav[up]");

    this.editor = await this.setFrame("pages/lesson/editor", contentHolder);

    this.editor.id = this.parent.id;
    this.editor.session = this.parent.session;
    this.editor.sessionID = this.parent.sessionID;
    this.editor.sources = this.parent.sources;
    this.editor.settings = this.parent.lesson.settings ?? {};
    this.editor.self = this.parent.members[this.editor.sessionID];

    let updateTopBar = (ignoreAttr) => {
      if (ignoreAttr != true) {
        eTopHolder.removeAttribute("scroll");
      }
      if (eTop.scrollWidth > eTop.clientWidth) {
        if (ignoreAttr != true) {
          eTopHolder.setAttribute("scroll", "");
        }
        if (Math.floor(eTop.scrollLeft) > 0) {
          eTopScrollLeft.style.opacity = 1;
          eTopScrollLeft.style.pointerEvents = "all";
        } else {
          eTopScrollLeft.style.opacity = 0;
          eTopScrollLeft.style.pointerEvents = "none";
        }
        if (Math.floor(eTop.scrollWidth - eTop.scrollLeft) > Math.floor(eTop.clientWidth)) {
          eTopScrollRight.style.opacity = 1;
          eTopScrollRight.style.pointerEvents = "all";
        } else {
          eTopScrollRight.style.opacity = 0;
          eTopScrollRight.style.pointerEvents = "none";
        }
      } else {
        eTopScrollLeft.style.opacity = 0;
        eTopScrollLeft.style.pointerEvents = "none";
        eTopScrollRight.style.opacity = 0;
        eTopScrollRight.style.pointerEvents = "none";
      }
    }
    eTopScrollLeft.addEventListener("click", function () {
      eTop.scrollTo({ left: eTop.scrollLeft - 200, behavior: "smooth" });
      updateTopBar();
    });
    eTopScrollRight.addEventListener("click", function () {
      eTop.scrollTo({ left: eTop.scrollLeft + 200, behavior: "smooth" });
      updateTopBar();
    });
    this.editor.pipeline.subscribe("topbarResize", "resize", updateTopBar);
    this.editor.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { updateTopBar(true); });
    this.editor.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", updateTopBar);
    updateTopBar();

    this.updateInterface = async () => {
      let access = this.editor.self.access;
      if (access == 0) {
        contentHolder.setAttribute("viewer", "");
        lessonName.removeAttribute("contenteditable");
        if (this.editor.settings.allowExport != false) {
          createCopyButton.style.removeProperty("display");
        } else {
          createCopyButton.style.display = "none";
        }
        undoButton.style.display = "none";
        redoButton.style.display = "none";
      } else {
        contentHolder.removeAttribute("viewer");
        if (access > 3) {
          lessonName.setAttribute("contenteditable", "");
        }
        createCopyButton.style.display = "none";
        undoButton.style.removeProperty("display");
        redoButton.style.removeProperty("display");
      }
      if (access < 4) {
        shareButton.style.removeProperty("display");
        optionsButton.style.removeProperty("display");
      } else {
        shareButton.style.display = "flex";
        optionsButton.style.display = "flex";
      }
      updateTopBar();
    }

    this.updateMemberCount = (button) => {
      let memberCountTx = button.querySelector(".eMemberCount");
      let handCountTx = button.querySelector(".eMemberHandCount");
      let idleCountTx = button.querySelector(".eMemberIdleCount");

      memberCountTx.textContent = this.parent.memberCount;
      if (this.parent.memberCount > 1) {
        memberCountTx.style.display = "flex";
        memberCountTx.parentElement.style.padding = "4px 10px 4px 4px";
      } else {
        memberCountTx.style.removeProperty("display");
        memberCountTx.parentElement.style.removeProperty("padding");
      }
      
      handCountTx.textContent = this.parent.handCount;
      if (this.parent.handCount > 0 && this.parent.memberCount > 1) {
        handCountTx.style.display = "flex";
        handCountTx.parentElement.style.padding = "4px 10px 4px 4px";
      } else {
        handCountTx.style.removeProperty("display");
      }

      idleCountTx.textContent = this.parent.idleCount;
      if (this.parent.idleCount > 0 && this.parent.memberCount > 1) {
        idleCountTx.style.display = "flex";
        idleCountTx.parentElement.style.padding = "4px 10px 4px 4px";
      } else {
        idleCountTx.style.removeProperty("display");
      }

      if (this.editor.self.access > 3 && this.parent.editorCount > 0) {
        endSessionButton.style.display = "flex";
      } else {
        endSessionButton.style.removeProperty("display");
      }

      updateTopBar();
    }
    this.updateMemberCount(membersButton);

    eTop.addEventListener("scroll", (event) => {
      this.editor.pipeline.publish("topbar_scroll", { event: event });
    });

    let icon = eTop.querySelector(".eLogo");
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      setFrame("pages/dashboard");
    });
    lessonName.textContent = this.lesson.name ?? "Untitled Lesson";
    lessonName.title = lessonName.textContent;
    lessonName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        lessonName.blur();
        return;
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

    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/lesson/file", { parent: this });
    });

    createCopyButton.addEventListener("click", async () => {
      if (userID == null) {
        promptLogin();
        return;
      }
      createCopyButton.setAttribute("disabled", "");
      let copyAlert = await alertModule.open("info", "<b>Creating Copy</b><div>Creating a copy of this lesson.", { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/copy", null, { session: this.editor.session });
      createCopyButton.removeAttribute("disabled");
      alertModule.close(copyAlert);
      if (code == 200) {
        modifyParams("lesson", body.lesson);
        setFrame("pages/lesson");
      }
    });

    membersButton.addEventListener("click", () => {
      dropdownModule.open(membersButton, "dropdowns/lesson/board/members", { parent: this });
    });

    shareButton.addEventListener("click", () => {
      dropdownModule.open(shareButton, "dropdowns/lesson/share", { parent: this });
    });
    sharePinButton.addEventListener("click", () => {
      if (modules["dropdowns/lesson/share/pin"] != null) {
        dropdownModule.open(sharePinButton, "dropdowns/lesson/share/pin", { parent: this });
      }
    });
    optionsButton.addEventListener("click", () => {
      if (modules["dropdowns/lesson/share/options"] != null) {
        dropdownModule.open(optionsButton, "dropdowns/lesson/share/options", { title: "Options", parent: this });
      }
    });

    endSessionButton.removeAttribute("disabled");
    endSessionButton.addEventListener("click", async () => {
      endSessionButton.setAttribute("disabled", "");
      await sendRequest("DELETE", "lessons/members/reset", null, { session: this.editor.session });
      endSessionButton.removeAttribute("disabled");
    });

    // Load Images:
    setSVG(icon, "./images/icon.svg", (svg) => { return svg.replace(/"#0084FF"/g, '"var(--theme)"'); });
    setSVG(undoButton, "./images/tooltips/progress/undo.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(redoButton, "./images/tooltips/progress/redo.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(endSessionButton, "./images/editor/share/endeditors.svg", (svg) => { return svg.replace(/"#FF2F5A"/g, '"var(--error)"'); });
    setSVG(optionsButton, "./images/editor/share/setting.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(increasePageButton, "./images/editor/bottom/plus.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });
    setSVG(decreasePageButton, "./images/editor/bottom/minus.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });

    this.editor.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
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

    this.editor.pipeline.subscribe("pageTextUpdate", "page_change", (event) => {
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
      this.editor.currentPage++;
      this.editor.utils.updateAnnotationScroll(this.editor.annotationPages[this.editor.currentPage - 1]);
    });
    decreasePageButton.addEventListener("click", () => {
      this.editor.currentPage--;
      this.editor.utils.updateAnnotationScroll(this.editor.annotationPages[this.editor.currentPage - 1]);
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
    pageTextBox.addEventListener("focusout", (event) => {
      //pageBoxFocus = false;
      if (pageTextBox.textContent == "") {
        pageTextBox.innerHTML = "<b>" + this.editor.currentPage + "</b> / " + this.editor.annotationPages.length;
        return;
      }
      let setPage = parseInt(pageTextBox.textContent) ?? 1;
      pageTextBox.innerHTML = "<b>" + setPage + "</b> / " + this.editor.annotationPages.length;
      this.editor.utils.updateAnnotationScroll(this.editor.annotationPages[setPage - 1], false);
    });

    this.editor.pipeline.subscribe("boardLessonSet", "set", (body) => {
      if (body.name != null && document.activeElement.closest(".eFileName") != lessonName) {
        lessonName.textContent = this.lesson.name ?? "Untitled Lesson";
        lessonName.title = lessonName.textContent;
      }
      if (this.parent.lesson.pin != null) {
        sharePinButton.textContent = this.parent.lesson.pin;
        sharePinButton.style.display = "unset";
      } else {
        sharePinButton.style.removeProperty("display");
      }
    });
    this.editor.pipeline.subscribe("boardMemberJoin", "join", () => { this.updateMemberCount(membersButton); });
    this.editor.pipeline.subscribe("boardMemberLeave", "leave", () => { this.updateMemberCount(membersButton); });
    this.editor.pipeline.subscribe("boardMemberUpdate", "update", async (body) => {
      let member = this.parent.members[body._id];
      if (this.editor.realtime.module != null) {
        if (body.observe == this.editor.sessionID) { // Being observed:
          this.editor.realtime.observed = true;
          this.editor.realtime.module.publishShort(null, "observe", true);
        }
        if (body.weak == true) {
          this.editor.realtime.module.removeRealtime(body._id);
          if (this.editor.realtime.observing == body._id) {
            this.editor.realtime.module.exitObserve();
            alertModule.open("warning", "<b>Observing Ended</b>The member you where observing has too weak a connection, try again later...");
          }
        }
        if (body.observe != null && this.editor.realtime.observing == body._id) {
          this.editor.realtime.module.exitObserve();
          alertModule.open("warning", "<b>Observing Ended</b>The member your observing started watching someone.");
        }
        if (this.editor.realtime.observing == body._id) {
          this.editor.realtime.module.setObserveFrame(member);
        }
      }

      this.updateMemberCount(membersButton);
    });

    this.editor.pipeline.subscribe("spotlightStart", "spotlight", async (body) => {
      if (this.editor.realtime.module == null || this.parent.signalStrength < 3) {
        return;
      }
      if (body.member == this.editor.sessionID || body.member == this.editor.realtime.observing) {
        return;
      }
      let member = this.parent.members[body.member];
      if (member == null) {
        return;
      }
      if (member.observe != null) {
        member.observe = null;
      }
      if (member.weak == true) {
        return;
      }
      let prevObserve = this.editor.realtime.observing;
      this.editor.realtime.observing = body.member;
      this.editor.realtime.module.setShortSub(this.editor.visibleChunks);
      this.editor.pipeline.publish("observe_enable", { memberID: body.member });
      alertModule.close(this.editor.realtime.observeLoading);
      clearTimeout(this.editor.realtime.observeTimeout);
      let [code] = await sendRequest("GET", "lessons/members/observe?member=" + body.member, null, { session: this.editor.session });
      if (code == 200) {
        this.editor.realtime.observeLoading = await alertModule.open("info", `<b>Connecting to Member</b>Connecting to ${member.name}'s screen from spotlight!`, { time: "never" });
        this.editor.realtime.observeTimeout = setTimeout(() => {
          alertModule.close(this.editor.realtime.observeLoading);
          alertModule.open("error", `<b>Observe Timeout</b>Failed to connect to their screen, please try again later...`);
          this.editor.realtime.module.exitObserve();
        }, 20000);
      } else {
        if (prevObserve != null) {
          this.editor.realtime.observing = prevObserve;
          this.editor.realtime.module.exitObserve();
        }
        this.editor.realtime.observing = null;
        this.editor.realtime.module.setShortSub(this.visibleChunks);
        this.editor.pipeline.publish("observe_exit", { memberID: body.member });
      }
    });

    if (this.parent.lesson.pin != null) {
      sharePinButton.style.display = "unset";
      sharePinButton.textContent = this.lesson.pin;
    }

    this.editor.pipeline.subscribe("interfaceUpdate", "refresh_interface", () => {
      this.updateInterface();
    });

    this.editor.pipeline.subscribe("checkActivePage", "click_start", () => {
      if (this.parent.activePageID != this.pageID) {
        this.parent.activePageID = this.pageID;
        this.parent.pushToPipelines(null, "page_switch", { pageID: this.pageID });
      }
    });
    this.editor.pipeline.subscribe("checkPageSwitch", "page_switch", (data) => {
      if (data.pageID != this.pageID) {
        page.removeAttribute("active");
      } else {
        page.setAttribute("active", "");
      }
    });

    // Fetch Annotations
    let pageParam = getParam("page");
    let checkForJumpLink = getParam("annotation");
    let asyncLoadAnnotations = async () => {
      let [annoCode, annoBody] = await sendRequest("GET", "lessons/join/annotations", null, { session: this.parent.session }, { allowError: true });
      if (annoCode != 200 && connected == true) {
        alertModule.open("error", `<b>Error Loading Annotations</b>Please try again later...`);
        return;
      }
      for (let i = 0; i < annoBody.annotations.length; i++) {
        let addAnno = annoBody.annotations[i];
        let existingAnno = this.editor.annotations[addAnno._id];
        if (existingAnno == null || existingAnno.render.sync < addAnno.sync) {
          this.editor.annotations[addAnno._id] = { render: addAnno };
        }
      }
      for (let i = 0; i < annoBody.annotations.length; i++) {
        let existingAnno = this.editor.annotations[annoBody.annotations[i]._id];
        if (existingAnno != null) {
          await this.editor.utils.annotationChunks(existingAnno);
          this.editor.utils.updateAnnotationPages(existingAnno.render);
        }
      }
      if (annoBody.reactions != null) {
        let reactedToObject = getObject(annoBody.reactedTo ?? [], "_id");
        for (let i = 0; i < annoBody.reactions.length; i++) {
          let addReaction = annoBody.reactions[i];
          let existingAnnoRecord = this.editor.reactions[addReaction.annotation];
          if (existingAnnoRecord == null) {
            this.editor.reactions[addReaction.annotation] = [];
            existingAnnoRecord = this.editor.reactions[addReaction.annotation];
          }
          delete addReaction.annotation;
          if (reactedToObject[addReaction._id + "_" + this.editor.self.modify] != null) {
            addReaction.reacted = true;
          }
          existingAnnoRecord.push(addReaction);
        }
      }

      await this.editor.render.setMarginSize();

      let jumpAnnotation = null;
      if (checkForJumpLink != null && checkForJumpLink != "") {
        if (this.editor.annotations[checkForJumpLink] != null) {
          jumpAnnotation = (await this.editor.render.createAnnotation((this.editor.annotations[checkForJumpLink] || {}).render))[1];
          this.editor.selecting[checkForJumpLink] = {};
          this.pipeline.publish("redraw_selection", {});
        }
      }
      if (jumpAnnotation == null) {
        if (pageParam == null) {
          this.editor.utils.centerWindowWithPage();
        } else {
          this.editor.utils.updateAnnotationScroll([pageParam], false);
        }
        await this.editor.updateChunks();
      } else {
        await this.editor.utils.scrollToElement(jumpAnnotation);
        await this.editor.updateChunks();
      }

      contentHolder.removeAttribute("disabled");
    }

    if (this.exporting != true) {
      asyncLoadAnnotations();
      (async () => {
        (await this.newModule("editor/realtime")).js(this.editor);
      })();
    } else {
      await asyncLoadAnnotations();
      //await (await this.loadModule("editor/export")).js(this, this.utils, page);
    }

    this.updateInterface();
  }
}

modules["dropdowns/lesson/board/members"] = class {
  html = `
  <div class="eMemberHolder">
    <div class="eMemberSearchHolder">
      <img src="./images/editor/glass.svg">
      <input placeholder="Search..."></input>
    </div>
    <div class="eMemberMemberHolder">
      <div class="eMemberAccessHolder" access="5">
        <button class="eMemberAccessTitle"><div holder><div title>Owner</div><div count>0</div></div></button>
      </div>
      <div class="eMemberAccessHolder" access="1">
        <button class="eMemberAccessTitle"><div holder><div title>Editors</div><div count>0</div></div></button>
      </div>
      <div class="eMemberAccessHolder" access="0">
        <button class="eMemberAccessTitle"><div holder><div title>Viewers</div><div count>0</div></div></button>
      </div>
    </div>
  </div>
  `;
  css = {
    ".dropdownTitle span": `display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: #fff; box-shadow: 0px 0px 8px 0px rgba(var(--themeColorRGB), .3); border-radius: 12px; font-weight: 700`,

    ".eMemberHolder": `width: 275px; max-width: 100%`,
    ".eMemberSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".eMemberSearchHolder img": `width: 28px; height: 28px`,
    ".eMemberSearchHolder input": `max-width: calc(100% - 54px); width: 100%; padding: 4px 8px; margin-left: 6px; border: solid 2px var(--secondary); outline: unset; border-radius: 17px; font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eMemberSearchHolder input::placeholder": `color: var(--secondary)`,

    ".eMemberAccessHolder": `display: none; margin-bottom: 12px; background: var(--pageColor)`,
    ".eMemberAccessTitle": `position: sticky; display: flex; width: 100%; padding: 0; top: 0px; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 700; font-size: 18px`,
    ".eMemberAccessTitle div[holder]": `display: flex; width: 100%; padding: 4px 8px; top: 0px; justify-content: space-between; transition: .1s`,
    ".eMemberAccessTitle div[count]": `margin-left: 6px; font-weight: 500`,
    ".eMemberAccessTitle:hover div[holder]": `background: var(--hover)`,
    ".eMemberAccessTitle:active": `transform: scale(1) !important`,
    ".eMemberAccessTitle:active div[holder]": `background: var(--secondary); color: #fff !important`,
    ".eMemberAccessHolder[selected] .eMemberAccessTitle div[holder]": `background: var(--secondary); color: #fff`,

    ".eMemberTile": `position: relative; display: flex; width: 100%; height: 34px; padding: 0px; justify-content: center; align-items: center; z-index: 1`, //; margin: 4px 0
    ".eMemberTile div[holder]": `--opacity: 0; position: relative; display: flex; width: 100%; padding: 4px; overflow: hidden; align-items: center; transition: .1s`, //; margin: 4px 0
    ".eMemberBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: var(--opacity); transition: .1s; z-index: -1`,
    ".eMemberAccessHolder button:hover div[holder]": `--opacity: .35`,
    ".eMemberAccessHolder button:hover .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberAccessHolder button:active": `transform: scale(1) !important`,
    ".eMemberAccessHolder button:active div[holder]": `--opacity: 1; color: var(--hoverTextColor); border-radius: 18px; transform: scale(.95)`,
    ".eMemberAccessHolder button:active .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberTile div[holder][selected]": `--opacity: 1 !important; color: var(--hoverTextColor)`,
    ".eMemberTile div[holder][selected] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".eMemberAccessHolder[hover] div[holder]": `--themeColor: var(--secondary) !important; --opacity: .35 !important; color: var(--textColor)`,
    ".eMemberAccessHolder[hover] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberAccessHolder[active] div[holder]": `--opacity: 1 !important; border-radius: 18px; transform: scale(.95); color: #fff`,
    ".eMemberAccessHolder[active] .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberAccessHolder[selected] div[holder]": `--themeColor: var(--secondary) !important; --opacity: 1 !important; color: #fff`,
    ".eMemberAccessHolder[selected] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".eMemberCursor": `width: 20px; height: 20px; flex-shrink: 0; margin: 0 6px; background: var(--pageColor); border: solid 3px var(--themeColor); overflow: hidden; border-radius: 8px 14px 14px; transition: 0.2s`, //box-shadow: 0 0 6px rgb(0 0 0 / 50%);
    ".eMemberName": `width: 100%; font-size: 16px; font-weight: 600; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberEvents": `display: flex; margin-left: auto`,
    ".eMemberEvent": `height: fit-content; padding: 3px 6px; margin: 0 1px 0 6px; border-radius: 12px; color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap`,
    ".eMemberEvent[self]": `background: var(--theme)`,
    ".eMemberEvent[hand]": `background: var(--green)`,
    ".eMemberEvent[idle]": `background: var(--yellow)`,
    ".eMemberEvent[observe]": `background: var(--purple)`,

    ".eMemberFrameHolder": `position: absolute; width: 200%; height: fit-content; right: 0px; pointer-events: none; z-index: 0; opacity: 0; transition: top .3s, opacity .3s`,
    ".eMemberFrame": `--themeColor: var(--theme); position: sticky; width: calc(50% - 4px); max-width: calc(100vw - 20px); left: 8px; top: 8px; margin-left: 4px; pointer-events: all; background: var(--pageColor); border-right: solid 4px var(--themeColor); border-radius: 38px 0 0 12px; transform-origin: top right; transform: scale(0); transition: transform .3s`,
    ".eMemberFrameContentHolder": `width: 100%; height: 0px; border-radius: 38px 0 0 12px; overflow: hidden`,
    ".eMemberFrameShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 16px; right: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eMemberFrameShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--shadow); border-radius: inherit`,
    ".eMemberFrameContent": `overflow: auto`,
    ".eMemberSection": `position: relative; display: flex; width: 100%; justify-content: center; align-items: center`,
    ".eMemberSectionInfo": `border-radius: 38px 0 0 38px; overflow: hidden`,
    ".eMemberBackdrop": `position: absolute; display: flex; width: calc(100% + 2px); height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1`,
    ".eMemberBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .3; background-image: url(./images/editor/background.svg); background-position: center`, //transform: rotate(12deg);
    ".eMemberFrameCursor": `width: 40px; height: 40px; flex-shrink: 0; margin: 12px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px; transition: 0.2s`,
    ".eMemberFramePicture": `width: 44px; height: 44px; flex-shrink: 0; margin: 12px; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px; transition: 0.2s`,
    ".eMemberFrameInfoHolder": `display: flex; flex-direction: column; width: calc(100% - 76px); height: calc(100% - 12px); color: var(--adaptColor); text-align: left`,
    ".eMemberFrameInfoHolder div[name]": `width: calc(100% - 30px); font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberFrameInfoHolder div[email]": `width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberFrameInfoHolder div[joined]": `font-size: 14px; font-weight: 500; text-align: right; margin: auto 6px 2px 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberClose": `position: absolute; width: 22px; height: 22px; top: 4px; right: 0px; margin: 5px 5px 5px 12px; background: var(--pageColor); --borderWidth: 3px; --borderRadius: 14px`,
    ".eMemberClose img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eMemberSectionDesc": `box-sizing: border-box; padding: 12px 12px 0; font-size: 14px`,
    ".eMemberSectionEvents": `flex-direction: column`,
    ".eMemberEventHolder": `display: none; width: calc(100% - 24px); margin: 12px 12px 0px; justify-content: space-between; align-items: center`,
    ".eMemberEventHolder .eMemberEvent": `margin: 0px 8px 0 0`,
    ".eMemberEventDesc": `font-size: 14px; text-align: right`,
    ".eMemberSectionActions": `flex-wrap: wrap; width: calc(100% - 12px); padding: 6px; margin-top: 6px; justify-content: space-around`,
    ".eMemberSectionActions button": `display: flex; flex-direction: column; width: 86.33px; padding: 6px 12px; align-items: center; border-radius: 14px; color: var(--themeColor); overflow: visible`,
    ".eMemberSectionActions button img": `width: 55px; height: 55px; transition: .15s`,
    ".eMemberSectionActions button div": `margin-top: 6px; font-size: 14px; font-weight: 600; white-space: nowrap`,
    ".eMemberSectionActions button:hover img": `transform: scale(1.15) translateY(-2px)`,
    ".eMemberSectionActions button:active": `background: var(--themeColor); color: #fff`,
    ".eMemberSectionActions button:active img": `filter: brightness(0) invert(1); transform: scale(1)`
  };
  js = async function (frame, extra) {
    let parent = extra.parent;
    let editor = parent.editor;
  }
}