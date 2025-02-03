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
      <div class="eMemberSearch">
        <div image></div>
        <input placeholder="Search..."></input>
      </div>
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
    ".eMemberSearch": `display: flex; width: 100%; align-items: center; border: solid 2px var(--secondary); border-radius: 18px`,
    ".eMemberSearch div[image]": `width: 25px; height: 25px; margin-left: 4px`,
    ".eMemberSearch div[image] svg": `width: 100%; height: 100%`,
    ".eMemberSearch input": `width: 100%; padding: 5px; background: unset; border: unset; outline: unset; font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eMemberSearch input::placeholder": `color: var(--secondary)`,

    ".eMemberMemberHolder": `min-height: 4px`,
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
    ".eMemberBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(./images/editor/backdrop.svg); background-size: 24px; background-position: center`, //transform: rotate(12deg);
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
    frame.closest(".dropdownContent").style.padding = "0px";

    let parent = extra.parent;
    let lesson = parent.parent;
    let editor = parent.editor;

    let dropdownTitle = frame.closest(".dropdownOverflow").querySelector(".dropdownTitle");

    let searchHolder = frame.querySelector(".eMemberSearch");
    let searchField = searchHolder.querySelector("input");
    let accessHolders = frame.querySelectorAll(".eMemberAccessHolder");

    // Load Images:
    setSVG(searchHolder.querySelector(".eMemberSearch div[image]"), "./images/editor/glass.svg", (svg) => { return svg.replace(/"#0084FF"/g, '"var(--secondary)"'); });

    let getSection = (access) => {
      return frame.querySelector('.eMemberAccessHolder[access="' + access + '"]');
    }
    let updateOrder = (section, updateTile, member) => {
      for (let i = 1; i < section.children.length; i++) { // 1 to skip title
        let child = section.children[i];
        let prev = lesson.members[child.querySelector("div[holder]").getAttribute("member")] ?? {};
        if (member.hand == null) {
          if (child != updateTile && member.name < prev.name && prev.hand == null) {
            section.insertBefore(updateTile, child);
            break;
          } else if (i == section.children.length - 1) {
            section.appendChild(updateTile);
          }
        } else {
          if (child != updateTile && (member.hand < prev.hand || prev.hand == null)) {
            section.insertBefore(updateTile, child);
            break;
          } else if (i == section.children.length - 1) {
            section.appendChild(updateTile);
          }
        }
      }
    }
    let addMemberTile = (member) => {
      if (member.name.toLowerCase().includes(searchField.value.toLowerCase()) == false) {
        return;
      }
      let section = getSection(member.access);
      if (section == null) {
        return;
      }
      let title = section.querySelector(".eMemberAccessTitle");
      section.insertAdjacentHTML("beforeend", `<button class="eMemberTile"><div holder new>
        <div class="eMemberBackground"></div>
        <div class="eMemberCursor"></div>
        <div class="eMemberName"></div>
        <div class="eMemberEvents"></div>
      </div></button>`);
      let tile = section.querySelector(".eMemberTile div[holder][new]");
      tile.removeAttribute("new");
      tile.setAttribute("member", member._id);
      updateOrder(section, tile.parentElement, member);
      tile.style.setProperty("--themeColor", member.color);
      tile.style.setProperty("--hoverTextColor", editor.utils.textColorBackground(member.color));
      tile.querySelector(".eMemberName").textContent = member.name;
      tile.querySelector(".eMemberName").title = member.name;
      let eventsHolder = tile.querySelector(".eMemberEvents");
      if (member._id == editor.sessionID) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" self title="This member is you.">YOU</div>`);
      } else { // Don't show if self:
        if (member.active == false) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
        }
        if (member.observe == editor.sessionID) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
        }
      }
      if (member.hand != null) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" hand title="This member is asking to contribute to the lesson.">HAND</div>`);
      }
      title.querySelector("div[count]").textContent = section.childElementCount - 1; // -1 for title
      section.style.display = "block";
    }
    let createMemberList = (search) => {
      let keys = Object.keys(lesson.members);
      keys = keys.filter((value) => {
        if (lesson.members[value].name.toLowerCase().includes((search ?? "").toLowerCase())) {
          return -1;
        }
        return false;
      });
      for (let i = 0; i < keys.length; i++) {
        addMemberTile(lesson.members[keys[i]]);
      }
    }
    createMemberList();

    let dropdown;
    let memberFrameHolder;
    let dropdownButton;

    editor.pipeline.subscribe("membersDropdownJoin", "join", (body) => {
      addMemberTile(lesson.members[body._id]);
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    });
    editor.pipeline.subscribe("membersDropdownLeave", "leave", (body) => {
      let removeTileContent = frame.querySelector('.eMemberTile div[holder][member="' + body._id + '"]');
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
    });
    editor.pipeline.subscribe("membersDropdownUpdate", "update", (body) => {
      let updateTile = frame.querySelector('.eMemberTile div[holder][member="' + body._id + '"]');
      if (updateTile != null) {
        let member = lesson.members[body._id];

        // Handle User / Color Updates:
        updateTile.style.setProperty("--themeColor", member.color);
        updateTile.querySelector(".eMemberName").textContent = member.name;
        updateTile.querySelector(".eMemberName").title = member.name;

        // Handle access changes:
        let section = getSection(member.access);
        let oldSection = updateTile.parentElement.parentElement;
        if (section != oldSection) {
          section.appendChild(updateTile.parentElement);

          // Update new section:
          section.querySelector(".eMemberAccessTitle div[count]").textContent = section.childElementCount - 1; // -1 for title
          section.style.display = "block";

          // Update old section:
          let newOldCount = oldSection.childElementCount - 1; // -1 for title
          oldSection.querySelector(".eMemberAccessTitle div[count]").textContent = newOldCount;
          if (newOldCount < 1) {
            oldSection.style.display = "none";
          }
        }

        // Update order:
        updateOrder(section, updateTile.parentElement, member);

        // Handle event state:
        if (member._id != editor.sessionID) {
          let eventsHolder = updateTile.querySelector(".eMemberEvents");
          let existingHand = eventsHolder.querySelector(".eMemberEvent[hand]");
          if (member.hand != null) {
            if (existingHand == null) {
              eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" hand title="This member is asking to contribute to the lesson.">HAND</div>`);
            }
          } else if (existingHand != null) {
            existingHand.remove();
          }
          let existingIdle = eventsHolder.querySelector(".eMemberEvent[idle]");
          if (member.active == false) {
            if (existingIdle == null) {
              eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
            }
          } else if (existingIdle != null) {
            existingIdle.remove();
          }
          let existingObserve = eventsHolder.querySelector(".eMemberEvent[observe]");
          if (member.observe == editor.sessionID) {
            if (existingObserve == null) {
              eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
            }
          } else if (existingObserve != null) {
            existingObserve.remove();
          }
        }

        // Update member dropdown:
        if (dropdownButton != null) {
          if (dropdownButton.getAttribute("member") == member._id) {
            openDropdown(updateTile, true);
          } else if (dropdownButton.querySelector("div[title]") != null) {
            openDropdown(dropdownButton, true);
          }
        }
      }
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    });

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
      
      let contentFrame = memberFrameHolder.querySelector(".eMemberFrame");
      let contentHolderFrameHolder = contentFrame.querySelector(".eMemberFrameContentHolder");
      let contentFrameHolder = contentFrame.querySelector(".eMemberFrameContent");
      
      let contentHeight = contentFrameHolder.scrollHeight;

      contentFrameHolder.style.maxHeight = "calc(" + (fixed.offsetHeight - dropdownRect.top) + "px - 8px)";
      
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
      let frame = memberFrameHolder.querySelector(".eMemberFrame");
      frame.querySelector(".eMemberFrameContentHolder").style.removeProperty("transition");
      frame.style.width = frame.clientWidth + "px";
      frame.style.transform = "scale(0)";
      updateDropdownPosition();
    }

    let editorButton;
    let handButton;
    let observeButton;
    let spotlightButton;
    let kickButton;

    let openDropdown = (tile, update) => {
      let member = {};
      if (tile.parentElement.className == "eMemberTile") {
        member = lesson.members[tile.getAttribute("member")];
        if (member == null) {
          tile.remove();
          return;
        }
      } else {
        member = { title: true, name: tile.querySelector("div[title]").textContent, access: parseInt(tile.closest(".eMemberAccessHolder").getAttribute("access")), color: "var(--secondary)" };
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
      memberFrameHolder = dropdown.querySelector(".eMemberFrameHolder");

      let observeButtonUpdate = () => {
        let memberFrame = memberFrameHolder.querySelector(".eMemberFrame");
        let button = memberFrame.querySelector(".eMemberSectionActions button[observe]");
        let member = lesson.members[memberFrame.getAttribute("memberid")];
        if (member == null) {
          return;
        }
        let obvImg = "./images/editor/members/observe.svg";
        let obvText = "Observe";
        let obvDesc = "Watch this member's screen.";
        if (editor.realtime.observing == member._id) {
          obvImg = "./images/editor/members/observeexit.svg";
          obvText = "Exit";
          obvDesc = "Stop watching this member's screen."
        }
        button.querySelector("img").src = obvImg;
        button.querySelector("div").textContent = obvText;
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
        let member = lesson.members[memberFrame.getAttribute("memberid")] ?? {};
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
        dropdown.insertAdjacentHTML("beforeend", `<div class="eMemberFrameHolder">
        <div class="eMemberFrame">
          <div class="eMemberFrameShadow"></div>
          <div class="eMemberFrameContentHolder">
            <div class="eMemberFrameContent">
              <div class="eMemberSection eMemberSectionInfo">
                <div class="eMemberBackdrop"><div></div></div>
                <div class="eMemberFrameCursor"></div>
                <img class="eMemberFramePicture">
                <div class="eMemberFrameInfoHolder">
                  <div name></div>
                  <div email></div>
                </div>
                <button class="eMemberClose buttonAnim border"><img src="./images/tooltips/close.svg"></button>
              </div>
              <div class="eMemberSection eMemberSectionDesc"></div>
              <div class="eMemberSection eMemberSectionEvents">
                <div class="eMemberEventHolder" self>
                  <div class="eMemberEvent" self>YOU</div>
                  <div class="eMemberEventDesc">This is your profile.</div>
                </div>
                <div class="eMemberEventHolder" hand>
                  <div class="eMemberEvent" hand>HAND</div>
                  <div class="eMemberEventDesc">They're asking to contribute to the lesson.</div>
                </div>
                <div class="eMemberEventHolder" idle>
                  <div class="eMemberEvent" idle>IDLE</div>
                  <div class="eMemberEventDesc">They're currently viewing another window.</div>
                </div>
                <div class="eMemberEventHolder" observe>
                  <div class="eMemberEvent" observe>OBSERVE</div>
                  <div class="eMemberEventDesc">They're following you around the lesson.</div>
                </div>
              </div>
              <div class="eMemberSection eMemberSectionActions">
                <button editor style="--themeColor: var(--theme)">
                  <img>
                  <div></div>
                </button>
                <button hand style="--themeColor: var(--green)" title="Lower this member's hand.">
                  <img src="./images/editor/members/lowerhand.svg">
                  <div>Lower</div>
                </button>
                <button observe style="--themeColor: var(--purple)">
                  <img>
                  <div>Observe</div>
                </button>
                <button spotlight style="--themeColor: var(--purple)" title="Bring members to your location.">
                  <img src="./images/editor/members/spotlight.svg">
                  <div>Spotlight</div>
                </button>
                <button kick style="--themeColor: var(--error)" title="Revoke all viewing and editing privileges.">
                  <img src="./images/editor/members/kick.svg">
                  <div>Kick</div>
                </button>
              </div>
            </div>
          </div>
        </div></div>`);
        memberFrameHolder = dropdown.querySelector(".eMemberFrameHolder");
        memberFrameHolder.querySelector(".eMemberClose").addEventListener("click", closeDropdown);
        memberFrameHolder.offsetHeight;

        editorButton = memberFrameHolder.querySelector(".eMemberSectionActions button[editor]");
        handButton = memberFrameHolder.querySelector(".eMemberSectionActions button[hand]");
        observeButton = memberFrameHolder.querySelector(".eMemberSectionActions button[observe]");
        spotlightButton = memberFrameHolder.querySelector(".eMemberSectionActions button[spotlight]");
        kickButton = memberFrameHolder.querySelector(".eMemberSectionActions button[kick]");

        editorButton.addEventListener("click", async (event) => {
          editorButton.setAttribute("disabled", "");
          let frame = event.target.closest(".eMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let frameAccess = frame.getAttribute("access");
          let url = "lessons/members/access";
          let sendAccess = 1;
          if (memberid != null) {
            let member = lesson.members[memberid];
            if (member.access == 1) {
              sendAccess = 0;
            }
            url += "?member=" + member._id;
          } else if (frameAccess != null) {
            url += "?permaccess=" + frameAccess;
            if (parseInt(frameAccess) == 1) {
              sendAccess = 0;
            }
          }
          let [code] = await sendRequest("PUT", url, { access: sendAccess }, { session: editor.session });
          if (code == 200) {
            if (frameAccess != null) {
              getSection(frameAccess).style.display = "none";
              let changeSection = getSection(sendAccess);
              changeSection.style.display = "block";
              openDropdown(changeSection.querySelector(".eMemberAccessTitle"));
            }
          }
          editorButton.removeAttribute("disabled");
        });

        handButton.addEventListener("click", async (event) => {
          handButton.setAttribute("disabled", "");
          let frame = event.target.closest(".eMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let url = "lessons/members/hand/lower";
          if (memberid != null) {
            url += "?member=" + memberid;
          } else {
            url += "?member=all";
          }
          await sendRequest("DELETE", url, null, { session: editor.session });
          handButton.removeAttribute("disabled");
        });

        observeButton.addEventListener("click", async (event) => {
          let memberid = event.target.closest(".eMemberFrame").getAttribute("memberid");
          if (editor.realtime.observing == memberid) {
            editor.realtime.module.exitObserve();
            return;
          }
          let member = lesson.members[memberid];
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
          let memberid = event.target.closest(".eMemberFrame").getAttribute("memberid");
          let member = lesson.members[memberid];
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
          let frame = event.target.closest(".eMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let url = "lessons/members/kick";
          if (memberid != null) {
            url += "?member=" + lesson.members[memberid]._id;
          } else {
            url += "?permaccess=" + frame.getAttribute("access");
          }
          let [code] = await sendRequest("DELETE", url, null, { session: editor.session });
          if (code == 200) {
            closeDropdown();
          }
          kickButton.removeAttribute("disabled");
        });
      }

      let memberFrame = memberFrameHolder.querySelector(".eMemberFrame");
      if (member.title == null) {
        memberFrame.setAttribute("memberid", member._id);
        memberFrame.removeAttribute("access");
        memberFrame.style.setProperty("--adaptColor", editor.utils.textColorBackground(member.color));
      } else {
        memberFrame.setAttribute("access", member.access);
        memberFrame.removeAttribute("memberid");
        memberFrame.style.setProperty("--adaptColor", "#fff");
      }
      memberFrame.style.setProperty("--themeColor", member.color);
      memberFrame.style.removeProperty("width");

      let cursor = memberFrameHolder.querySelector(".eMemberFrameCursor");
      let picture = memberFrameHolder.querySelector(".eMemberFramePicture");
      if (member.image == null) {
        picture.style.display = "none";
        cursor.style.display = "unset";
      } else {
        cursor.style.display = "none";
        picture.src = member.image;
        picture.style.display = "unset";
      }
      let name = memberFrameHolder.querySelector(".eMemberFrameInfoHolder div[name]");
      name.textContent = member.name;
      name.title = member.name;
      let email = memberFrameHolder.querySelector(".eMemberFrameInfoHolder div[email]");
      if (member.email) {
        email.textContent = member.email;
        email.title = member.email;
        email.style.display = "unset";
      } else {
        email.style.display = "none";
      }

      let frameDesc = memberFrameHolder.querySelector(".eMemberSectionDesc");
      if (member.title != null) {
        switch (member.access) {
          case 0:
            frameDesc.textContent = "Viewers can see all pages and annotations in this lesson.";
            break;
          case 1:
            frameDesc.textContent = "Editors can create annotation, but cannot grant permisions or change settings.";
            break;
          case 5:
            frameDesc.textContent = "The owner has full access to all aspects of the lesson.";
        }
        frameDesc.style.display = "block";
      } else {
        frameDesc.style.display = "none";
      }

      let isSelf = member._id == editor.sessionID;
      let self = memberFrameHolder.querySelector(".eMemberEventHolder[self]");
      let hand = memberFrameHolder.querySelector(".eMemberEventHolder[hand]");
      let idle = memberFrameHolder.querySelector(".eMemberEventHolder[idle]");
      let observe = memberFrameHolder.querySelector(".eMemberEventHolder[observe]");
      if (isSelf == true) {
        self.style.display = "flex";
      } else {
        self.style.display = "none";
      }
      if (member.hand != null) {
        hand.style.display = "flex";
      } else {
        hand.style.display = "none";
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
      editorButton.removeAttribute("disabled");
      handButton.removeAttribute("disabled");
      observeButton.removeAttribute("disabled");
      kickButton.removeAttribute("disabled");

      if (isSelf == false && editor.self.access > 2 && member.access < 2) {
        let image = "./images/editor/share/editor.svg";
        let text = "Editor";
        let desc = "Grant temporary editing privileges.";
        if (member.access == 1) {
          image = "./images/editor/share/viewer.svg";
          text = "Viewer";
          desc = "Revoke temporary editing privileges, granting viewer.";
        }
        editorButton.querySelector("img").src = image;
        editorButton.querySelector("div").textContent = text;
        editorButton.title = desc;
        editorButton.style.display = "flex";
      } else {
        editorButton.style.display = "none";
      }

      let handRaised = member.hand != null;
      if (member.title != null) {
        // If someone in section has hand raised
        handRaised = tile.parentElement.querySelector(".eMemberEvent[hand]") != null;
      }
      if (isSelf == false && editor.self.access > 3 && handRaised == true) {
        handButton.style.display = "flex";
      } else {
        handButton.style.display = "none";
      }
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
      let memberTile = element.closest(".eMemberTile") ?? element.closest(".eMemberAccessTitle");
      if (memberTile != null) {
        if (memberTile.className == "eMemberTile") {
          memberTile = memberTile.querySelector("div[holder]");
        }
        return openDropdown(memberTile);
      }
    });

    for (let i = 0; i < accessHolders.length; i++) {
      let holder = accessHolders[i];
      let title = holder.querySelector(".eMemberAccessTitle");
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
      
      let clearTiles = frame.querySelectorAll(".eMemberTile");
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