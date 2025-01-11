modules["pages/lesson"] = class {
  title = "Lesson";
  preJs = () => {

  }
  html = `<div class="lPageHolder">
    <div class="lPage"></div>
  </div>`;
  css = {
    ".lPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100%; height: 100vh; padding: 8px; left: 0px; top: 0px; justify-content: center`,
    ".lPageHolder[maximize]": `padding: 0px !important`,
    ".lPage": `display: flex; width: 100%; height: 100%; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`,
    ".lPageHolder[maximize] .lPage": `border-radius: 0px !important`
  };
  editors = {};

  members = {};
  getSelf = () => {
    return this.members[this.sessionID] ?? {};
  }
  
  // LESSON PAGE : Loads lessons, members, and configs before creating editor modules:
  js = async (page, joinData) => {
    this.id = getParam("lesson") ?? "";

    let pageHolder = page.querySelector(".lPageHolder");

    if (this.id == "" && joinData.pin == null) {
      return; // Open the create new lesson page
    }

    joinData = joinData ?? {};
    let sendBody = { ss: socket.secureID };
    if (this.active == false) {
      sendBody.active = false;
    }
    if (joinData.pin != null) {
      sendBody.pin = joinData.pin;
    }
    if (joinData.name != null) {
      sendBody.name = joinData.name;
    } else {
      sendBody.name = getParam("name");
    }
    let paramSession = getParam("member_session") ?? "";
    if (paramSession != "" && this.exporting == true) {
      this.session = paramSession;
    }
    let [code, body, extra] = await sendRequest("POST", "lessons/join?lesson=" + this.id, sendBody, { session: this.session, allowError: [403, 406] });
    if (code == 403 || code == 406) {
      page.innerHTML = "";
      setFrame("pages/join");
    }
    if (code != 200) {
      return;
    }

    this.lesson = body.lesson;
    this.lesson.settings = this.lesson.settings ?? {};

    this.sessionID = body.session._id;
    this.sessionToken = body.session.token;
    this.session = this.sessionID + ";" + this.sessionToken;

    let sentPing = false;
    let sendPing = async () => {
      if (connected == false) {
        return;
      }
      let params = [];
      if (this.active == false && this.exporting != true) {
        params.push("idle");
      }
      if (this.signalStrength == 2) {
        params.push("weak");
      }
      let path = "lessons/ping";
      if (params.length > 0) {
        path += "?" + params.join("&");
      }
      sentPing = true;
      let [code] = await sendRequest("GET", path, null, { session: this.session, allowError: [403] });
      if (code == 403) {
        if (sendBody.pin != null) {
          setFrame("pages/join"); // Send back to join page
        } else {
          setFrame("pages/lesson"); // Refresh to rejoin
        }
      } else if (code != 200 && code != 0 && code != null) {
        setFrame("pages/lesson");
      }
    }
    this.sendPing = sendPing;

    if (extra.took < 2500) {
      this.signalStrength = 3;
    } else {
      this.signalStrength = 2;
      sendPing();
    }

    addTempListener({
      type: "interval", interval: setInterval(async () => {
        if (sentPing == false) {
          sendPing();
        }
        sentPing = false;
      }, 60000)
    }); // PING every minute

    await this.setFrame("pages/lesson/board", page.querySelector(".lPage"));

    tempListen(window, "resize", (event) => {
      if (fixed.offsetWidth > 800 && fixed.offsetHeight > 400) {
        pageHolder.removeAttribute("maximize");
      } else {
        pageHolder.setAttribute("maximize", "");
      }

      let editorKeys = Object.keys(this.editors);
      for (let i = 0; i < editorKeys.length; i++) {
        let editor = this.editors[editorKeys[i]];
        editor.pipeline.publish("resize", { event: event });
        editor.pipeline.publish("bounds_change", { type: "resize", event: event });
      }
    });
    
    tempListen(app, "mouseup", (event) => {
      let editorKeys = Object.keys(this.editors);
      for (let i = 0; i < editorKeys.length; i++) {
        let editor = this.editors[editorKeys[i]];
        editor.pipeline.publish("mouseup", { event: event });
        editor.pipeline.publish("click_end", { type: "mouseup", event: event });
      }
    }, { passive: false });
    tempListen(app, "touchend", (event) => {
      let editorKeys = Object.keys(this.editors);
      for (let i = 0; i < editorKeys.length; i++) {
        let editor = this.editors[editorKeys[i]];
        editor.pipeline.publish("touchend", { event: event });
        editor.pipeline.publish("click_end", { type: "touchend", event: event });
      }
    }, { passive: false });
  }
}

modules["pages/lesson/board"] = class {
  html = `<div class="eInterface eCustomScroll">
    <div class="eTopHolder">
      <button class="eTopScroll" left style="left: 8px"><img src="./images/editor/top/leftarrow.svg" /></button>
      <button class="eTopScroll" right style="right: 8px"><img src="./images/editor/top/rightarrow.svg" /></button>
      <div class="eTop">
        <div class="eTopSection" left>
          <a class="eLogo" href="#dashboard"><img src="./images/icon.svg" /></a>
          <div class="eFileNameHolder border"><div class="eFileName" spellcheck="false" onpaste="clipBoardRead(event)">Lesson Name</div></div>
          <button class="eFileDropdown">File</button>
          <div class="eTopDivider"></div>
          <button class="eSaveProgress eUndo" disabled><img draggable="false" src="./images/tooltips/progress/undo.svg" /></button>
          <button class="eSaveProgress eRedo" disabled><img draggable="false" src="./images/tooltips/progress/redo.svg" /></button>
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
          <button class="eEndSession" title="End Session | Disable all editing access making everyone a viewer."><img src="./images/editor/share/endeditors.svg" /></button>
          <button class="eShare">Share</button>
          <button class="eMemberOptions" title="Member Options | Configure various member settings and available tools."><img src="./images/editor/share/setting.svg" /></button>
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
          <button class="ePageNav" down><img src="./images/editor/bottom/plus.svg" /></button>
          <div class="eCurrentPage border" contenteditable></div>
          <button class="ePageNav" up><img src="./images/editor/bottom/minus.svg" /></button>
        </div>
      </div>
    </div>
  </div>
  <div class="eContentHolder eCustomScroll"></div>
  `;
  css = {
    ".eCustomScroll::-webkit-scrollbar": `width: 16px; background: var(--scrollGray)`,
    ".eCustomScroll::-webkit-scrollbar-corner": `background: var(--scrollGray)`,
    ".eCustomScroll::-webkit-scrollbar-thumb": `border: 4px solid var(--scrollGray); background: var(--gray); border-radius: 8px`,
    ".eCustomScroll::-webkit-scrollbar-thumb:active": `background: var(--activeGray)`,
    ".eInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; overflow: scroll; z-index: 2`,
    ".eContentHolder": `position: relative; width: 100%; height: 100%; overflow: scroll; z-index: 1`,
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
    ".eLogo img": `width: 32px; height: 32px`,
    //".eLogo:hover": `background: var(--hover)`,
    ".eFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".eFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".eFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".eFileName::-webkit-scrollbar": `display: none`,
    ".eFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".eSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".eSaveProgress img": `width: 24px; height: 24px; margin: 2px`,
    ".eUndo": `margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px`,
    ".eRedo": `margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0`,
    ".eStatus": `display: flex; width: 32px; height: 32px; margin: 4px; justify-content: center; align-items: center`,
    ".eStatusStrength": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center`,

    ".eMembers": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".eMemberCount": `display: none; padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--theme); font-weight: 700`,
    ".eMemberHandCount": `display: none; padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--green); font-weight: 700`,
    ".eMemberIdleCount": `display: none; padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--yellow); font-weight: 700`,
    ".eEndSession": `display: none; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--error); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".eEndSession img": `width: 28px; height: 28px`,
    ".eShare": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".eMemberOptions": `display: flex; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".eMemberOptions img": `width: 32px; height: 32px`,
    ".eSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eAccount": `height: 32px; padding: 0; width: 31px; height: 31px; margin-left: 4px; border-radius: 16px; overflow: hidden`,
    ".eAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".eLogin": `height: 32px; display: none; padding: 6px 10px; margin-left: 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,

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
    ".eObserveCursor": `box-sizing: border-box; display: flex; padding: 2px 6px; margin-right: 4px; background: var(--theme); color: #fff; border: solid 3px var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), .5); border-radius: 8px 14px 14px; font-size: 14px; font-weight: 700`,
    ".eObserveExit": `display: flex; position: relative; width: 22px; height: 22px; margin: 8px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 14px`,
    ".eObserveExit img": `width: 12px; height: 12px`,
    ".eBottomSection[right]": `margin-left: auto; border-top-left-radius: 12px`,
    ".ePageNav": `display: flex; width: 31px; height: 31px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".eCurrentPage": `margin: 0 6px; font-size: 20px; outline: unset`,
    ".eCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 19px`
  }; //".": ``,
  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let eTopHolder = frame.querySelector(".eTopHolder");
    let eTop = eTopHolder.querySelector(".eTop");
    let lessonName = eTop.querySelector(".eFileName");
    let eTopScrollLeft = eTopHolder.querySelector(".eTopScroll[left]");
    let eTopScrollRight = eTopHolder.querySelector(".eTopScroll[right]");

    let zoomButton = eTop.querySelector(".eZoom");

    let contentHolder = frame.querySelector(".eContentHolder");

    let currentPageHolder = frame.querySelector(".eBottomSection[right]");
    let pageTextBox = currentPageHolder.querySelector(".eCurrentPage");
    let increasePageButton = currentPageHolder.querySelector(".ePageNav[down]");
    let decreasePageButton = currentPageHolder.querySelector(".ePageNav[up]");

    this.editor = await this.setFrame("pages/lesson/editor", contentHolder, {
      session: this.parent.session,
      getSelf: this.parent.getSelf
    });
    this.parent.editors["board"] = this.editor;

    let updateTopBar = () => {
      eTopHolder.removeAttribute("scroll");
      if (eTop.scrollWidth > eTop.clientWidth) {
        eTopHolder.setAttribute("scroll", "");
        if (eTop.scrollLeft > 0) {
          eTopScrollLeft.style.opacity = 1;
          eTopScrollLeft.style.pointerEvents = "all";
        } else {
          eTopScrollLeft.style.opacity = 0;
          eTopScrollLeft.style.pointerEvents = "none";
        }
        if (eTop.scrollWidth - eTop.scrollLeft > eTop.clientWidth) {
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
    this.editor.pipeline.subscribe("topbarScroll", "topbar_scroll", updateTopBar);
    updateTopBar();

    eTop.addEventListener("scroll", (event) => {
      this.editor.pipeline.publish("topbar_scroll", { event: event });
    });

    this.editor.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      zoomButton.textContent = Math.round(event.zoom * 100) + "%";
    });

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
        let userCheckSelf = this.parent.getSelf();
        for (let i = 0; i < annoBody.reactions.length; i++) {
          let addReaction = annoBody.reactions[i];
          let existingAnnoRecord = this.editor.reactions[addReaction.annotation];
          if (existingAnnoRecord == null) {
            this.editor.reactions[addReaction.annotation] = [];
            existingAnnoRecord = this.editor.reactions[addReaction.annotation];
          }
          delete addReaction.annotation;
          if (reactedToObject[addReaction._id + "_" + userCheckSelf.modify] != null) {
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
          if (this.editor.updateZoom != null) {
            await this.editor.updateZoom();
          }
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
    }
    asyncLoadAnnotations();
  }
}

modules["pages/lesson/editor"] = class {
  html = `
  <div class="eContent">
    <div class="eRealtime"></div>
    <div class="eEditorContent">
      <div class="eAnnotations"></div>
    </div>
    <div class="eBackground"></div>
  </div>
  `;
  css = {
    ".eContent": `--interfacePadding: 58px; position: relative; display: flex; flex-direction: column; width: fit-content; min-width: calc(100% - (var(--interfacePadding) * 2)); min-height: calc(100vh - (var(--interfacePadding) * 2)); padding: var(--interfacePadding); align-items: center; overflow: hidden; pointer-events: all; --zoom: 1`,
    ".eRealtime": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; overflow: hidden; pointer-events: none`,
    ".eEditorContent": `position: relative`,
    ".eAnnotations": `position: relative; width: 1px; height: 1px; transform-origin: 0 0; transform: scale(var(--zoom)); z-index: 2`,
    ".eBackground": `position: absolute; transform: scale(var(--zoom)); transform-origin: left top; background-image: url(./images/editor/backdrop.svg); background-position: center; opacity: .075; z-index: 1`,

    ".eAnnotation": `position: absolute; left: 0px; top: 0px`,
    ".eAnnotationHolder": `position: absolute; z-index: 10`,
    ".eAnnotationHolder[notransition] > .eAnnotation": `transition: unset !important`,
    ".eAnnotation[hidden]": `display: none !important`,
    '.eAnnotation[anno]:not([anno^="pending_"])': `transition: .25s`,
    //'.eAnnotation:not([selected]):not([anno^="pending_"])': `transition: .25s`,
    ".eAnnotation svg": `position: absolute; width: calc(100% + 200px); height: calc(100% + 200px); left: -100px; top: -100px; pointer-events: none`,
    ".eAnnotation svg > *": `pointer-events: visiblepainted`,
    
    ".eAnnotation div[text]": `padding: 4px 6px; margin: 3px 3px; color: var(--themeColor); font-weight: 500; pointer-events: all; outline: none`,
    ".eAnnotation div[text][placeborder]": `width: max-content; margin: 0px; border: solid 3px var(--themeColor); border-radius: 8px`,
    
    ".eAnnotation[sticky]": `display: flex; flex-direction: column; background: var(--themeColor); border-radius: 12px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2); pointer-events: all; overflow: auto; text-align: left`,
    //".eAnnotation[sticky]::-webkit-scrollbar": `display: none`, ; scrollbar-width: none
    ".eAnnotation[sticky] div[holder]": `display: flex; flex-direction: column; width: calc(100% - 20px); flex: 1; padding: 16px 10px 10px 10px`,
    ".eAnnotation[sticky] div[edit]": `width: 100%; flex: 1; font-weight: 400; line-height: 22px; pointer-events: all; outline: none`,
    ".eAnnotation[sticky] div[footer]": `display: flex; flex-wrap: wrap; flex-direction: row-reverse; width: 100%; margin-top: 8px; gap: 8px; align-items: flex-end`,
    ".eContentHolder[anonymous] .eAnnotation[sticky] div[signature]": `filter: blur(4px); pointer-events: none`,
    ".eAnnotation[sticky] div[signature]": `margin-left: auto; opacity: .5; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; taxt-align: right`,
    ".eAnnotation[sticky] div[reactions]": `display: flex; flex-wrap: wrap; flex: 1; gap: 6px; background: var(--themeColor); pointer-events: all; z-index: 999; background: none`,
    ".eReaction": `display: flex; padding: 2px; background: rgba(255, 255, 255, .8); border: solid 2px rgba(0, 0, 0, 0); border-radius: 8px; align-items: center; overflow: hidden; color: var(--darkGray)`,
    ".eReaction[selected]": `padding: 2px; background: rgba(180, 218, 253, .8); border: solid 2px var(--theme); color: var(--theme)`,
    ".eReaction[add]": `opacity: 0; border-radius: 14px`,
    ".eContent[viewer] .eReaction[add]": "display: none !important",
    ".eReaction div[imgholder]": `display: flex; width: 20px; height: 20px; justify-content: center; align-items: center`,
    ".eReaction img": `width: 32px; height: 32px; transform: scale(0.65); border-radius: 7px; filter: drop-shadow(0px 0px 8px var(--pageColor))`,
    ".eReaction div[count]": `margin: 0 5px 0 6px; font-size: 16px; font-weight: 700`,
    ".eAnnotation[sticky]:hover .eReaction[add]": `opacity: 1`,
    ".eAnnotation[sticky][selected] .eReaction[add]": `opacity: 1`,
    ".eAnnotation[sticky][selected] button": `pointer-events: all`,
    ".eAnnotation[src]": `object-fit: cover; pointer-events: all; border-radius: 12px`,

    ".eAnnotation[page]": `display: flex; flex-direction: column; background: white; border-radius: 12px; --borderWidth: 4px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2)`,
    ".eAnnotation[page] > div[background]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: .1; border-radius: inherit; z-index: 0; pointer-events: all`,
    ".eAnnotation[page] > div[border]": `position: absolute; box-sizing: border-box; width: 100%; height: 100%; left: 0px; top: 0px; border: solid var(--borderWidth) var(--themeColor); border-radius: inherit; z-index: 4; pointer-events: none`,
    ".eAnnotation[page] > div[title]": `position: absolute; display: none; box-sizing: border-box; max-width: calc(100% - 12px); padding: 8px 10px; left: 0px; top: 0px; background: var(--themeColor); border-radius: 0px; border-top-left-radius: inherit; border-bottom-right-radius: 12px; font-weight: 600; font-size: 18px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; outline: none; scrollbar-width: none; z-index: 3; pointer-events: all`,
    ".eAnnotation[page] > div[title]::-webkit-scrollbar": `display: none`,
    ".eAnnotation[page] > div[content]": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; justify-content: center; align-items: center`,
    ".eAnnotation[page][hide] > div[content] .eAnnotationHolder": `z-index: 2 !important`,
    ".eAnnotation[page][selected] > div[title]": `pointer-events: all !important`,
    ".eAnnotation[page] > div[title][contenteditable]": `overflow-x: auto !important; text-overflow: unset !important`,
    ".eAnnotation[page] > div[hide]": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-radius: inherit; z-index: 2; pointer-events: all`,
    ".eAnnotation[page] > div[hide] img[hideicon]": `width: 150px; height: 150px; max-width: calc(100% - 24px); max-height: calc(100% - 24px)`,
    ".eAnnotation[page] > div[hide] div[hidemodal]": `display: flex; flex-direction: column; max-width: calc(100% - 64px); max-height: calc(100% - 64px); padding: 24px; overflow: auto; background: var(--pageColor); box-shadow: 0px 0px 16px 0px var(--hover); border-radius: 16px; align-items: center`,
    ".eAnnotation[page] > div[hide] div[hidemodal] img": `margin-bottom: 12px; width: calc(100% - 24px); max-width: 80px`,
    ".eAnnotation[page] > div[hide] div[hidemodal] div[hidemodaltitle]": `font-size: 28px; font-weight: 700; color: var(--theme)`,
    //".eAnnotation[page] > div[hide] div[hidemodal] div[hidemodaldesc]": `margin: 8px 0; max-width: 450px`,
    ".eAnnotation[page] > div[hide] div[hidemodal] button": `display: flex; margin-top: 24px; z-index: 1; background: var(--theme); --borderRadius: 20.25px; color: #fff`,
    ".eAnnotation[page] > div[content] div[document]": `position: relative; --scale-factor: 2; border-radius: inherit; overflow: hidden; z-index: 1`,
    ".eAnnotation[page] > div[content] div[document] canvas": `position: absolute; width: calc(100% - 8px) !important; height: calc(100% - 8px) !important; left: var(--borderWidth); top: var(--borderWidth); background: var(--themeColor); z-index: 1`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer]": `position: absolute; width: var(--fullWidth) !important; height: var(--fullHeight) !important; left: var(--borderWidth); top: var(--borderWidth); transform-origin: top left; transform: var(--fullScale); font-family: sans-serif; pointer-events: all !important; z-index: 2`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer] span": `position: absolute; color: transparent; pointer-events: all; transform-origin: top left`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer] br": `user-select: none`,
    ".hiddenCanvasElement": `display: none`,

    ".eAnnotation[embed]": `display: flex; background: var(--pageColor); border-radius: 16px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2); pointer-events: all; text-align: left`,
    ".eAnnotation[embed] div[holder]": `display: flex; flex-direction: column; width: calc(100% - 16px); flex: 1; padding: 8px`,
    ".eAnnotation[embed] div[content]": `position: relative; width: 100%; flex: 1; overflow: hidden; border-radius: 8px; background: radial-gradient(var(--theme), var(--secondary)); pointer-events: all !important;`,
    ".eAnnotation[embed] div[content] img[thumbnail]": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; background: #fff`,
    ".eAnnotation[embed] div[content] iframe": `position: absolute; left: 0px; top: 0px; transform-origin: top left; background: var(--pageColor); border: none`,
    ".eAnnotation[embed]:not([notransition]) div[content]": `pointer-events: all`,
    ".eAnnotation[embed] div[content] div[activate]": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: radial-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .2)); backdrop-filter: blur(4px); transition: .3s`,
    ".eAnnotation[embed] div[content] div[activate] button": `width: 80px; height: 80px; max-width: 80%; max-height: 80%`,
    ".eAnnotation[embed] div[content] div[activate] button img": `width: 100%; height: 100%`,
    ".eAnnotation[embed] div[details]": `margin-top: 8px`,
    ".eAnnotation[embed] div[details] div[input]": `display: none; align-items: center; pointer-events: all`,
    ".eAnnotation[embed] div[details] div[input][visible]": `display: flex !important`,
    ".eAnnotation[embed] div[details] div[input] input": `box-sizing: border-box; width: 100%; height: 36px; border: solid 3px var(--hover); outline: unset; border-radius: 18px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 600; font-family: var(--font); font-size: 16px`, //margin-right: 6px;
    ".eAnnotation[embed] div[details] div[input] input::placeholder": `color: var(--hover)`,
    ".eAnnotation[embed] div[details] div[info]": `display: flex; flex-direction: column; color: var(--textColor)`,
    ".eAnnotation[embed] div[details] div[info] div[title]": `display: none; width: 100%; font-size: 18px; font-weight: 700; text-wrap: nowrap; text-overflow: ellipsis; overflow: hidden; color: var(--textColor)`,
    ".eAnnotation[embed] div[details] div[info] div[description]": `display: none; width: 100%; margin: 4px 0 2px 0; font-size: 14px; font-weight: 500; color: var(--darkGray); text-wrap: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eAnnotation[embed] div[details] div[info] a[link]": `display: flex; width: fit-content; max-width: 100%; align-items: center; font-size: 16px; font-weight: 600; text-decoration: underline; color: var(--theme); text-wrap: nowrap; overflow: hidden; pointer-events: all`,
    ".eAnnotation[embed] div[details] div[info] a[link] img": `width: 32px; height: 32px; margin-right: 2px`
  };

  pipeline = { // PIPELINE : Distributes events across various modules and services:
    pipeline: {},
    pipelineSubs: {},
    publish: (event, data) => {
      let subscribes = this.pipeline.pipeline[event] ?? {};
      let subKeys = Object.keys(subscribes);
      for (let i = 0; i < subKeys.length; i++) {
        subscribes[subKeys[i]](data);
      }
    },
    subscribe: (id, event, callback) => {
      if (this.pipeline.pipelineSubs[id] != null) {
        this.pipeline.unsubscribe(id);
      }

      this.pipeline.pipeline[event] = this.pipeline.pipeline[event] ?? {};
      this.pipeline.pipeline[event][id] = callback;

      this.pipeline.pipelineSubs[id] = event;
    },
    unsubscribe: (id) => {
      delete this.pipeline.pipeline[this.pipeline.pipelineSubs[id]][id];
      delete this.pipeline.pipelineSubs[id];
    }
  };

  utils = {
    round: (num, places) => {
      let pow = Math.pow(10, places ?? 2);
      return Math.ceil(num * pow) / pow;
    },
    hexToRGB: (hex, alpha) => {
      if (hex == null) {
        return "";
      }
      if (hex.length < 4) {
        hex = hex + hex;
      }
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;
      if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    },
    darkenHex: (hexCode, percent) => {
      // Ensure the percent is within the valid range [0, 100]
      percent = Math.max(0, Math.min(100, percent));

      // Convert hex code to RGB
      let r = parseInt(hexCode.slice(0, 2), 16);
      let g = parseInt(hexCode.slice(2, 4), 16);
      let b = parseInt(hexCode.slice(4, 6), 16);

      // Calculate darkening factor
      let factor = 1 - percent / 100;

      // Darken the color components
      r = Math.max(0, Math.floor(r * factor));
      g = Math.max(0, Math.floor(g * factor));
      b = Math.max(0, Math.floor(b * factor));

      // Convert back to hex
      const darkenedHex = `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

      return darkenedHex;
    },
    textColorBackground: (bgColor) => {
      if (bgColor == null) {
        return;
      }
      if (bgColor.length < 4) {
        bgColor = bgColor + bgColor;
      }
      let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
      let r = parseInt(color.substring(0, 2), 16); // hexToR
      let g = parseInt(color.substring(2, 4), 16); // hexToG
      let b = parseInt(color.substring(4, 6), 16); // hexToB
      let uicolors = [r / 255, g / 255, b / 255];
      let c = uicolors.map((col) => {
        if (col <= 0.03928) {
          return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
      });
      let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
      return (L > 0.3) ? "#000" : "#fff"; // 0.179
    }
  };

  options = {
    snapping: true,
    cursors: true,
    cursornames: true,
    stylusmode: false,
    comments: true,
    fullscreen: false
  };

  realtime = {
    tool: 0 // 0: Pointer; 1: Markup; 2: Pen; 3: Erase
  };

  annotations = {};
  reactions = {};
  sources = {};
  sourceRenders = {};

  selecting = {};

  visibleChunks = [];
  chunkAnnotations = {};
  chunkWidth = 2000;
  chunkHeight = 2000;
  scrollOffset = 58;

  visiblePages = [0];
  annotationPages = [];
  currentPage = 1;

  zoom = 1;
  SVG_PADDING = 100; // How much padding svgs should have to ensure clean render
  maxLayer = 0;
  minLayer = 0;

  js = async (frame, extra) => {
    this.session = extra.session;
    this.getSelf = extra.getSelf;

    let page = frame.closest(".lPage");
    let contentHolder = page.querySelector(".eContentHolder");
    let content = contentHolder.querySelector(".eContent");
    let editorContent = content.querySelector(".eEditorContent");
    let annotations = editorContent.querySelector(".eAnnotations");
    let background = content.querySelector(".eBackground");

    this.utils.localMousePosition = (mouse) => {
      let mouseX = mouse.x ?? mouse.clientX ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientX ?? 0;
      let mouseY = mouse.y ?? mouse.clientY ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientY ?? 0;
      let pageRect = page.getBoundingClientRect();
      return { mouseX: mouseX - pageRect.x, mouseY: mouseY - pageRect.y };
    }
    this.utils.localBoundingRect = (frame) => {
      let frameRect = frame.getBoundingClientRect();
      let pageRect = page.getBoundingClientRect();
      let diffX = frameRect.x - pageRect.x;
      let diffY = frameRect.y - pageRect.y;
      return {
        width: frameRect.width,
        height: frameRect.height,
        left: diffX,
        top: diffY,
        x: diffX + contentHolder.scrollLeft,
        y: diffY + contentHolder.scrollTop
      }
    }
    this.utils.scaleToDoc = (x, y, noOrigin) => {
      let pageRect = this.utils.localBoundingRect(annotations);
      if (noOrigin != true) {
        x -= pageRect.left;
        y -= pageRect.top;
      }
      let scaleZoom = 1 / this.zoom;
      return {
        x: this.utils.round(x * scaleZoom),
        y: this.utils.round(y * scaleZoom)
      }
    };
    this.utils.scaleToZoom = (x, y) => {
      let pageRect = this.utils.localBoundingRect(annotations);
      return {
        x: (x * this.zoom) + pageRect.left,
        y: (y * this.zoom) + pageRect.top
      };
    };
    this.utils.regionInChunks = (topx, topy, bottomx, bottomy) => {
      if (bottomx < topx) {
        let setBottomX = topx;
        topx = bottomx;
        bottomx = setBottomX;
      }
      if (bottomy < topy) {
        let setBottomY = topy;
        topy = bottomy;
        bottomy = setBottomY;
      }
      let topLeftChunkX = Math.floor(topx / this.chunkWidth) * this.chunkWidth;
      let topLeftChunkY = Math.floor(topy / this.chunkHeight) * this.chunkHeight;
      let bottomRightChunkX = Math.floor(bottomx / this.chunkWidth) * this.chunkWidth;
      let bottomRightChunkY = Math.floor(bottomy / this.chunkHeight) * this.chunkHeight;
      let xCord = topLeftChunkX;
      let yCord = topLeftChunkY;
      let chunks = [];
      while (yCord <= bottomRightChunkY) {
        while (xCord <= bottomRightChunkX) {
          chunks.push(xCord + "_" + yCord);
          xCord += this.chunkWidth;
        }
        xCord = topLeftChunkX;
        yCord += this.chunkHeight;
      }
      return chunks;
    }
    this.utils.annotationInChunks = (render, includeSelecting) => {
      let [x, y] = this.utils.getAbsolutePosition(render, includeSelecting);
      let [width, height] = render.s;
      let thick = 0;
      if (render.t != null) {
        if (render.b != "none" || render.d == "line") {
          thick = render.t;
        }
      }
      if (width < 0) {
        width = -width;
        x -= width;
      }
      if (height < 0) {
        height = -height;
        y -= height;
      }
      let halfT = thick / 2;

      let radian = (render.r ?? 0) * (Math.PI / 180);
      let thickWidth = width + thick;
      let thickHeight = height + thick;
      let changedWidth = ((Math.abs(thickWidth * Math.cos(radian)) + Math.abs(thickHeight * Math.sin(radian))) - thickWidth) / 2;
      let changedHeight = ((Math.abs(thickWidth * Math.sin(radian)) + Math.abs(thickHeight * Math.cos(radian))) - thickHeight) / 2;
      
      x += halfT - changedWidth;
      y += halfT - changedHeight;
      width = thickWidth + (changedWidth * 2);
      height = thickHeight + (changedHeight * 2);
      
      return this.utils.regionInChunks(x, y, x + width, y + height);
    }
    this.utils.annotationChunks = async (annotation, includeSelecting) => {
      if (annotation == null) {
        return;
      }
      let render = annotation.render;
      let chunks = [];

      if (render != null && render.remove != true) {
        let [x, y] = this.utils.getAbsolutePosition(render, includeSelecting);
        let [width, height] = render.s;
        let thick = 0;
        if (render.t != null) {
          if (render.b != "none" || render.d == "line") {
            thick = render.t;
          }
        }
        if (width < 0) {
          width = -width;
          x -= width;
        }
        if (height < 0) {
          height = -height;
          y -= height;
        }
        let halfT = thick / 2;

        let radian = (render.r ?? 0) * (Math.PI / 180);
        let thickWidth = width + thick;
        let thickHeight = height + thick;
        let changedWidth = ((Math.abs(thickWidth * Math.cos(radian)) + Math.abs(thickHeight * Math.sin(radian))) - thickWidth) / 2;
        let changedHeight = ((Math.abs(thickWidth * Math.sin(radian)) + Math.abs(thickHeight * Math.cos(radian))) - thickHeight) / 2;
        
        x += halfT - changedWidth;
        y += halfT - changedHeight;
        width = thickWidth + (changedWidth * 2);
        height = thickHeight + (changedHeight * 2);
        
        chunks = this.utils.regionInChunks(x, y, x + width, y + height);
      }
      let annotationVisible = false;
      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        if (this.chunkAnnotations[chunk] == null) {
          this.chunkAnnotations[chunk] = {};
          await this.render.setMarginSize();
        }
        this.chunkAnnotations[chunk][render._id] = "";
        if (this.visibleChunks.includes(chunk) == true) {
          annotationVisible = true;
        }
      }
      if (annotation.chunks != null) {
        // Remove existing chunks:
        for (let i = 0; i < annotation.chunks.length; i++) {
          let chunk = annotation.chunks[i];
          if (chunks.includes(chunk) == false) {
            delete this.chunkAnnotations[chunk][render._id];
            if (Object.keys(this.chunkAnnotations[chunk]).length < 1) {
              delete this.chunkAnnotations[chunk];
              await this.render.setMarginSize();
            }
          }
        }
      }
      annotation.chunks = chunks;
      
      if (annotationVisible == true) {
        if (annotation.element == null) {
          await this.render.createAnnotation(render);
        }
      } else {
        if (annotation.element != null) {
          annotation.element.remove();
          annotation.element = null;
        }
      }
    }
    this.utils.pointInChunk = (x, y) => {
      return this.utils.regionInChunks(x, y, x, y)[0];
    }

    this.utils.updateCurrentPage = () => {
      let activeElement = document.activeElement;
      if (activeElement != null) {
        let currentPageBox = activeElement.closest(".eCurrentPage");
        if (currentPageBox != null) { //== pageTextBox
          return;
        }
      }
      let pageRect = this.utils.localBoundingRect(editorContent);
      let centerPointX = ((page.offsetWidth / 2) - pageRect.left) / this.zoom;
      let centerPointY = ((page.offsetHeight / 2) - pageRect.top) / this.zoom;
      let minPage = 0;
      let minPageId;
      let minDistance;
      for (let i = 0; i < this.annotationPages.length; i++) {
        let page = this.annotationPages[i];
        let distance = Math.pow(page[1][0] - centerPointX, 2) + Math.pow(page[1][1] - centerPointY, 2);
        if (distance < minDistance || minDistance == null) {
          minDistance = distance;
          minPage = i + 1;
          minPageId = page[0];
        }
      }
      this.currentPage = minPage;
      this.pipeline.publish("page_change", { page: this.currentPage, pageId: minPageId });
    }
    this.utils.updateAnnotationPages = (anno) => {
      if (anno.f != "page") {
        return;
      }
      for (let i = 0; i < this.annotationPages.length; i++) {
        let annoid = this.annotationPages[i][0];
        if ((annoid ?? "").startsWith("pending_") == true) {
          let anno = this.annotations[annoid] ?? {};
          if (anno.pointer != null) {
            annoid = anno.pointer;
          }
        }
        if (annoid == anno._id) {
          this.annotationPages.splice(i, 1);
          break;
        }
      }
      if (anno.remove != true) {
        if (anno.parent != null) {
          return;
        }
        let position = this.utils.getAbsolutePosition(anno);
        let thickness = 0;
        if (anno.t != null) {
          if (anno.b != "none" || anno.d == "line") {
            thickness = anno.t;
          }
        }
        this.annotationPages.push([
          anno._id,
          [position[0] + (anno.s[0] / 2) + thickness, position[1] + (anno.s[1] / 2) + thickness],
          [position[0], position[1], anno.s[0] + thickness, anno.s[1] + thickness]
        ]);
        this.annotationPages.sort((a, b) => {
          if (b[1][1] > a[2][1] && b[1][1] < a[2][1] + a[2][3]) {
            return a[2][0] - b[2][0];
          }
          return a[2][1] - b[2][1];
        });
      }
      this.utils.updateCurrentPage();
    }
    this.utils.updateAnnotationScroll = (pageData, animation) => {
      if (pageData == null) {
        return;
      }
      this.pipeline.publish("page_change", { page: this.currentPage });
      let annoID = pageData[0];
      if ((annoID ?? "").startsWith("pending_") == true) {
        let anno = this.annotations[annoID] ?? {};
        if (anno.pointer != null) {
          annoID = anno.pointer;
        }
      }
      let render = (this.annotations[annoID] ?? {}).render;
      if (render != null) {
        let thickness = 0;
        if (render.t != null) {
          if (render.b != "none" || render.d == "line") {
            thickness = render.t;
          }
        }
        let position = this.utils.getAbsolutePosition(render);
        let annotationRect = this.utils.localBoundingRect(annotations);
        let options = {};
        if ((render.s[0] + (thickness * 2)) * this.zoom < page.offsetWidth - (this.scrollOffset * 2)) {
          // Position page to center:
          options.left = annotationRect.left + contentHolder.scrollLeft - (page.offsetWidth / 2) + ((position[0] + (render.s[0] / 2) + thickness) * this.zoom);
        } else {
          // Position page to left corner:
          options.left = annotationRect.left + contentHolder.scrollLeft - this.scrollOffset + (position[0] * this.zoom);
        }
        if ((render.s[1] + (thickness * 2)) * this.zoom < page.offsetHeight - (this.scrollOffset * 2)) {
          // Position page to center:
          options.top = annotationRect.top + contentHolder.scrollTop - (page.offsetHeight / 2) + ((position[1] + (render.s[1] / 2) + thickness) * this.zoom);
        } else {
          // Position page to left corner:
          options.top = annotationRect.top + contentHolder.scrollTop - this.scrollOffset + (position[1] * this.zoom);
        }
        if (animation != false) {
          options.behavior = "smooth";
        }
        contentHolder.scrollTo(options);
      }
      if (this.realtime.observing != null && this.realtime.module != null) {
        this.realtime.module.exitObserve();
      }
    }

    this.utils.centerWindowWithPage = () => {
      if (this.exporting == true) {
        return;
      }
      let annotationRect = this.utils.localBoundingRect(annotations);
      contentHolder.scrollTo(contentHolder.scrollLeft + annotationRect.left - ((page.offsetWidth - annotations.offsetWidth) / 2), contentHolder.scrollTop + annotationRect.top - this.scrollOffset);
    }
    this.utils.scrollToElement = (element) => {
      let jumpRect = this.utils.localBoundingRect(element);
      contentHolder.scrollTo(contentHolder.scrollLeft + jumpRect.left - ((page.offsetWidth - element.offsetWidth) / 2), contentHolder.scrollTop + jumpRect.top - ((page.offsetHeight - element.offsetHeight) / 2));
    }

    this.utils.getAbsolutePosition = (anno, includeSelecting) => {
      let returnX = anno.p[0];
      let returnY = anno.p[1];
      let selectedParent = false;
      let currentAnnoCheck = anno;
      let checkedParents = [];
      while (currentAnnoCheck.parent != null) {
        let annoid = currentAnnoCheck.parent;
        if (annoid == null || checkedParents.includes(annoid) == true) {
          break;
        }
        checkedParents.push(annoid);
        let annotation = this.annotations[annoid];
        if (annotation == null) {
          break;
        }
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = this.annotations[annoid];
        }
        if (annotation == null) {
          break;
        }
        let selected = this.selecting[annoid];
        if (selected != null) {
          selectedParent = true;
        }
        if (includeSelecting != true) {
          currentAnnoCheck = annotation.render ?? {};
        } else {
          currentAnnoCheck = { ...(annotation.render ?? {}), ...(selected ?? {}) };
        }
        returnX += currentAnnoCheck.p[0] ?? 0;
        returnY += currentAnnoCheck.p[1] ?? 0;
      }
      return [returnX, returnY, { selectedParent: selectedParent }];
    }
    this.utils.getRelativePosition = (anno, includeSelecting) => {
      let returnX = anno.p[0];
      let returnY = anno.p[1];
      //let selectedParent = false;
      let currentAnnoCheck = anno;
      let checkedParents = [];
      while (currentAnnoCheck.parent != null) {
        let annoid = currentAnnoCheck.parent;
        if (annoid == null || checkedParents.includes(annoid) == true) {
          break;
        }
        checkedParents.push(annoid);
        let annotation = this.annotations[annoid];
        if (annotation == null) {
          break;
        }
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = this.annotations[annoid];
        }
        if (annotation == null) {
          break;
        }
        if (includeSelecting != true) {
          currentAnnoCheck = annotation.render ?? {};
        } else {
          currentAnnoCheck = { ...(annotation.render ?? {}), ...(this.selecting[annoid] ?? {}) };
        }
        returnX -= currentAnnoCheck.p[0] ?? 0;
        returnY -= currentAnnoCheck.p[1] ?? 0;
      }
      return [returnX, returnY];
    }
    this.utils.parentFromAnnotation = (anno, types, insert, includeSelecting) => {
      types = types ?? ["page"];
      insert = insert ?? {};
      let id = anno._id;
      let prevParent = anno.prevParent;
      if (prevParent != null) {
        let parentAnno = this.annotations[prevParent];
        if (parentAnno != null && parentAnno.pointer != null) {
          prevParent = parentAnno.pointer;
        }
      }
      let x = anno.p[0];// + (anno.s[0] / 2) + thick;
      let y = anno.p[1];// + (anno.s[1] / 2) + thick;
      let index = anno.l ?? 0;
      let chunk = this.utils.pointInChunk(x, y);
      let annotationIDs = Object.keys(this.chunkAnnotations[chunk] ?? {});
      let viableParents = [];
      let foundInsert = false;
      if (includeSelecting == true) { // We must check for if new annotations are valid!
        let selectKeys = Object.keys(this.selecting);
        for (let i = 0; i < selectKeys.length; i++) {
          let selectKey = selectKeys[i];
          if (annotationIDs.includes(selectKey) == false) {
            annotationIDs.push(selectKey);
          }
        }
      }
      for (let i = 0; i < annotationIDs.length; i++) {
        let annoid = annotationIDs[i];
        if (annoid == null || annoid == id) {
          continue;
        }
        let annotation = this.annotations[annoid] || {};
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = this.annotations[annoid];
        }
        let render = annotation.render || {}; // { ...(annotation.render ?? {}), ...(this.selecting[annoid] ?? {}) };
        if (includeSelecting == true) {
          render = { ...render, ...(this.selecting[annoid] ?? {}) };
        }
        if (insert._id == annoid) {
          foundInsert = true;
          render = { ...render, ...insert };
        }
        if (types.includes(render.f) == false) {
          continue;
        }
        if ((render.hidden == true || render.lock == true) && prevParent != annoid) {
          continue;
        }
        if (render.remove == true) {
          continue;
        }
        let [parentX, parentY] = this.utils.getAbsolutePosition(render, includeSelecting);
        let [parentWidth, parentHeight] = render.s ?? [0, 0];
        let parentThickness = 0;
        if (render.t != null) {
          if (render.b != "none" || render.d == "line") {
            parentThickness = render.t;
          }
        }
        if (x >= parentX && x <= parentX + parentWidth + parentThickness) {
          if (y >= parentY && y <= parentY + parentHeight + parentThickness) {
            if ((index ?? this.utils.maxLayer) > render.l) {
              viableParents.push(render);
            }
          }
        }
      }
      if (insert._id != null && foundInsert == false) {
        viableParents.push(insert);
      }
      let highestPageID;
      let highestLayer;
      for (let i = 0; i < viableParents.length; i++) {
        let parent = viableParents[i];
        if ((parent.l ?? 0) > highestLayer || highestLayer == null) {
          highestLayer = parent.l ?? 0;
          highestPageID = parent._id;
        }
      }
      return highestPageID;
    }
    this.utils.parentFromPoint = (x, y, index, types) => {
      return this.utils.parentFromAnnotation({ p: [x, y], l: index }, types);
    }
    this.utils.applyRelativePosition = (anno) => {
      let [setX, setY] = this.utils.getRelativePosition(anno);
      anno.p = [setX, setY];
      return anno;
    }

    this.render = {};
    this.render.pdfPageQueue = [];
    this.render.pdfPageStorage = {};
    this.render.pdfFileLoading = {};
    this.render.runningPageRender = false;
    this.render.tempID = () => {
      return "pending_" + randomString(10) + Date.now();
    };
    this.render.setMarginSize = async (force) => {
      if (this.exporting == true && force != true) {
        return;
      }
  
      this.render.farLeft = 0;
      this.render.farRight = 0;
      this.render.setLeftMargin = 0;
      this.render.setRightMargin = 0;
      this.render.farTop = 0;
      this.render.farBottom = 0;
      this.render.setTopMargin = 0;
      this.render.setBottomMargin = 0;
  
      // Default Chunks:
      this.chunkAnnotations["0_0"] = this.chunkAnnotations["0_0"] ?? [];
      this.chunkAnnotations["0_-" + this.chunkHeight] = this.chunkAnnotations["0_-" + this.chunkHeight] ?? [];
      this.chunkAnnotations["-" + this.chunkWidth + "_0"] = this.chunkAnnotations["-" + this.chunkWidth + "_0"] ?? [];
      this.chunkAnnotations["-" + this.chunkWidth + "_-" + this.chunkHeight] = this.chunkAnnotations["-" + this.chunkWidth + "_-" + this.chunkHeight] ?? [];
      
      let chunks = Object.keys(this.chunkAnnotations);
      for (let i = 0; i < chunks.length; i++) {
        let splitPos = chunks[i].split("_");
        let [x, y] = [parseInt(splitPos[0]), parseInt(splitPos[1])];
        let left = -x;
        let right = x + this.chunkWidth;
        let top = -y;
        let bottom = y + this.chunkHeight;
        if (left > this.render.farLeft) {
          this.render.setLeftMargin = Math.ceil(left / 400) * 400;
          this.render.farLeft = this.render.setLeftMargin - 120;
        }
        if (right > this.render.farRight) {
          this.render.setRightMargin = Math.ceil(right / 400) * 400;
          this.render.farRight = this.render.setRightMargin - 120;
        }
        if (top > this.render.farTop) {
          this.render.setTopMargin = Math.ceil(top / 400) * 400;
          this.render.farTop = this.render.setTopMargin - 120;
        }
        if (bottom > this.render.farBottom) {
          this.render.setBottomMargin = Math.ceil(bottom / 400) * 400;
          this.render.farBottom = this.render.setBottomMargin - 120;
        }
      }
  
      if (mouseDown() == true) {
        if (this.render.runCheckSizeReset != null) {
          return;
        }
        this.render.runCheckSizeReset = () => {
          this.render.setMarginSize();
        };
        this.pipeline.subscribe("marginSizeUpdateDelay", "click_end", this.render.runCheckSizeReset);
        return;
      }
      if (this.render.runCheckSizeReset != null) {
        this.pipeline.unsubscribe("marginSizeUpdateDelay");
        this.render.runCheckSizeReset = null;
      }
      
      let scrollPosX = contentHolder.scrollLeft;
      let scrollPosY = contentHolder.scrollTop;
      let contentLeft = this.render.marginLeft ?? 0;
      let contentTop = this.render.marginTop ?? 0;
      let addMarginLeftRight = fixed.offsetWidth / 2;
      let addMarginTopBottom = fixed.offsetHeight / 2;
      this.render.marginLeft = (this.render.setLeftMargin * this.zoom) + addMarginLeftRight;
      this.render.marginRight = (this.render.setRightMargin * this.zoom) + addMarginLeftRight;
      this.render.marginTop = (this.render.setTopMargin * this.zoom) + addMarginTopBottom;
      this.render.marginBottom = (this.render.setBottomMargin * this.zoom) + addMarginTopBottom;
      editorContent.style.marginLeft = this.render.marginLeft + "px";
      editorContent.style.marginRight = this.render.marginRight + "px";
      editorContent.style.marginTop = this.render.marginTop + "px";
      editorContent.style.marginBottom = this.render.marginBottom + "px";
      if (content.offsetWidth != this.render.lastOffsetWidth || content.offsetHeight != this.render.lastOffsetHeight) {
        contentHolder.scrollTo(scrollPosX + (this.render.marginLeft - contentLeft), scrollPosY + (this.render.marginTop - contentTop));
        if (this.realtime.module && this.realtime.module.adjustRealtimeHolder) {
          editor.realtime.module.adjustRealtimeHolder();
        }
        if (this.updateZoom != null) {
          await this.updateZoom(true);
        }
      }
      this.render.lastOffsetWidth = content.offsetWidth;
      this.render.lastOffsetHeight = content.offsetHeight;
    };
    this.render.processPageRenders = async () => {
      if (this.render.runningPageRender == true) {
        return;
      }
      this.render.runningPageRender = true;
      // Load PDFJS
      if (window.pdfjsLib == null) {
        await loadScript("./libraries/pdfjs/pdf.mjs");
      }
      if (pdfjsLib.GlobalWorkerOptions.workerSrc == "") {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "./libraries/pdfjs/pdf.worker.mjs";
      }
  
      while (this.render.pdfPageQueue.length > 0 || (this.exporting == true && Object.keys(this.render.pdfFileLoading).length > 0)) {
        let sourcePageId = this.render.pdfPageQueue.shift();
        if (sourcePageId == null) {
          await sleep(100);
          continue;
        }
        let [sourceID, pageNumber] = this.render.pdfPageStorage[sourcePageId];
        delete this.render.pdfPageStorage[sourcePageId];
  
        let source = this.sources[sourceID] ?? {};
        if (source.error == true) {
          continue;
        }
        if (source.pdf == null) {
          if (this.render.pdfFileLoading[sourceID] == null) {
            this.render.pdfFileLoading[sourceID] = {};
            (async () => {
              if (source.source == null) {
                let [code, body] = await sendRequest("GET", "lessons/join/source?source=" + sourceID, null, { session: this.session });
                if (code == 200) {
                  this.sources[sourceID] = { source: body.source };
                } else {
                  this.sources[sourceID] = { error: true };
                }
              }
              source = this.sources[sourceID] ?? {};
              if (source.source != null) {
                let loadingTask = pdfjsLib.getDocument(assetURL + source.source)
                addTempListener({ type: "pdf", document: loadingTask });
                loadingTask.promise.then(async (pdf) => {
                  source.pdf = pdf;
                  let loadingPageKeys = Object.keys(this.render.pdfFileLoading[sourceID])
                  for (let b = 0; b < loadingPageKeys.length; b++) {
                    let pageAdd = this.render.pdfFileLoading[sourceID][loadingPageKeys[b]];
                    this.render.addPageToQueue(pageAdd[0], pageAdd[1], true);
                  }
                  delete this.render.pdfFileLoading[sourceID];
                });
              }
            })();
          }
          this.render.pdfFileLoading[sourceID][sourcePageId] = [sourceID, pageNumber];
          continue;
        }
  
        let pageRender = this.sourceRenders[sourcePageId];
        if (pageRender == null) {
          pageRender = await new Promise(async (resolve) => {
            source.pdf.getPage(pageNumber).then(async (pageRender) => {
              resolve(pageRender);
            });
          });
          this.sourceRenders[sourcePageId] = pageRender;
        }
  
        let loadDocumentFrames = annotations.querySelectorAll('.eAnnotation[page] div[content] div[document][sourcepage="' + sourcePageId + '"]');
        for (let e = 0; e < loadDocumentFrames.length; e++) {
          let element = loadDocumentFrames[e];
          if (element == null) {
            continue;
          }
          if (element.childElementCount > 0) {
            continue;
          }
  
          let viewport = pageRender.getViewport({ scale: 2 });
          //let outputScale = window.devicePixelRatio ?? 1;
          
          element.insertAdjacentHTML("beforeend", `<canvas></canvas><div textlayer></div>`);
          
          let canvas = element.querySelector("canvas");
          let context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
  
          let setWidth = viewport.width;// * outputScale;
          let setHeight = viewport.height;// * outputScale;
          canvas.width = setWidth;
          canvas.height = setHeight;
          let annoWidth = parseFloat(element.getAttribute("width"));
          let annoHeight = parseFloat(element.getAttribute("height"));
          let annoRotation = parseInt(element.getAttribute("rotation"));
          if (annoRotation == 90 || annoRotation == 270) {
            //let prevSetWidth = setWidth;
            //setWidth = setHeight;
            //setHeight = prevSetWidth;
            let prevAnnoWidth = annoWidth;
            annoWidth = annoHeight;
            annoHeight = prevAnnoWidth;
          }
          element.style.setProperty("--fullWidth", setWidth + "px");
          element.style.setProperty("--fullHeight", setHeight + "px");
          element.style.transform = "rotate(" + annoRotation + "deg)";
          let ratio = setWidth / setHeight;
          let ratioedWidth = (annoHeight - 8) * ratio;
          let ratioedHeight = (annoWidth - 8) / ratio;
          if (ratioedWidth < annoWidth - 8) {
            element.style.width = (ratioedWidth + 8) + "px";
            element.style.height = annoHeight + "px";
            element.style.setProperty("--fullScale", "scale(" + ((annoHeight - 8) / setHeight) + ")");
          } else {
            element.style.width = annoWidth + "px";
            element.style.height = (ratioedHeight + 8) + "px";
            element.style.setProperty("--fullScale", "scale(" + ((annoWidth - 8) / setWidth) + ")");
          }
  
          //let transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
          
          await new Promise(async (resolve) => {
            pageRender.render({
              canvasContext: context,
              //transform: transform,
              viewport: viewport
            }).promise.then(() => {
              element.style.opacity = "1";
              let textHolder = element.querySelector("div[textlayer]");
              if (textHolder != null) {
                pageRender.getTextContent().then((textContent) => {
                  (new pdfjsLib.TextLayer({
                    textContentSource: textContent,
                    container: textHolder,
                    viewport: viewport
                  })).render();
                  resolve();
                });
              }
            });
          });
          await sleep(10);
        }
        await sleep(1);
      }
      this.render.runningPageRender = false;
    };
    this.render.addPageToQueue = async (sourceID, pageNumber, forceRunRender) => {
      let sourcePageId = sourceID + "_" + pageNumber;
      if (this.render.pdfPageStorage[sourcePageId] == null) {
        this.render.pdfPageStorage[sourcePageId] = [sourceID, pageNumber];
        this.render.pdfPageQueue.push(sourcePageId);
        if (this.exporting != true || forceRunRender == true) {
          this.render.processPageRenders();
        }
      }
    };
    this.render.createSVG = (parent, type) => {
      let newSVG = document.createElementNS("http://www.w3.org/2000/svg", type);
      parent.appendChild(newSVG);
      return newSVG;
    };
    this.render.createAnnotation = async (data, anno, long) => {
      /*
        _id - ID - The unique ID of the annotation
        f - FUNCTION - The type of tool to render
        p - POSITION - Position of annotation - [ X, Y ]
        page - PAGE - Page of annotation
        s - SIZE - Size of annotation - [ WIDTH, HEIGHT ]
        c - COLOR - Color of annotation
        i - INSIDE COLOR - Color of fill
        t - THICKNESS - Thickness of annotation
        b - BORDER - Include border
        o - OPACITY - Opacity of annotation
        d - DATA - Data, can change based on annotation, path of pen for example
      */

      if (data == null) {
        return;
      }
      if (this.exportSelected != null) {
        if (this.exportSelected.includes(data._id) == false) {
          let currentAnnoCheck = data;
          let checkedParents = [];
          let isValid = false;
          while (currentAnnoCheck.parent != null) {
            let annoid = currentAnnoCheck.parent;
            if (annoid == null || checkedParents.includes(annoid) == true) {
              break;
            }
            checkedParents.push(annoid);
            let annotation = this.annotations[annoid];
            if (annotation == null) {
              break;
            }
            currentAnnoCheck = annotation.render ?? {};
            if (this.exportSelected.includes(annoid) == true) {
              isValid = true;
              break;
            }
          }
          if (isValid == false) {
            return;
          }
        } else if (data.parent != null) {
          let [absX, absY] = this.render.getAbsolutePosition(data);
          data.parent = null;
          data.p = [absX, absY];
        }
      }
      let { _id, f, parent, p, s, r, l, c, i, t, b, o, d, done, remove, sync, textfit, sig, lock } = data;
      let [x, y] = p ?? [];
      let size = s ?? [];
      let [width, height] = [size[0], size[1]];
      let annotation = this.annotations[_id] ?? {};
      if (annotation.pointer != null) {
        _id = annotation.pointer;
        annotation = this.annotations[_id] ?? {};
      }
      if (anno == null) {
        anno = annotation.element;
        if (anno == null && _id != null && _id.startsWith("pending_") == true) {
          anno = annotations.querySelector('.eAnnotation[anno="' + _id + '"]');
        }
        if (anno != null) {
          anno.setAttribute("anno", _id);
        }
      }
      let annoHolder = annotations;
      if (parent != null) {
        if ((parent ?? "").startsWith("pending_") == true) {
          let parentAnno = this.annotations[parent];
          if (parentAnno != null && parentAnno.pointer != null) {
            parent = parentAnno.pointer;
          }
        }
        let annoParentAnno = this.annotations[parent] ?? {};
        let annoParentData = annoParentAnno.render;
        if (annoParentData != null) {
          let annoParent = annoParentAnno.element;
          if (annoParent == null) {
            if (annoParentData.parent != _id) {
              annoParent = (await this.render.createAnnotation(annoParentData))[1];
            }
          }
          if (annoParent != null) {
            annoHolder = annoParent.querySelector(".eAnnotationHolder");
            if (annoHolder == null) {
              (annoParent.querySelector("div[annoholdercontainer]") ?? annoParent).insertAdjacentHTML("beforeend", `<div class="eAnnotationHolder"></div>`);
              annoHolder = annoParent.querySelector(".eAnnotationHolder");
              annoHolder.style.width = annoParentData.s[0] + "px";
              annoHolder.style.height = annoParentData.s[1] + "px";
              annoHolder.style.left = "0px";
              annoHolder.style.top = "0px";
            } else if (data.resizing == null) {
              annoHolder.style.width = annoParentData.s[0] + "px";
              annoHolder.style.height = annoParentData.s[1] + "px";
              annoHolder.style.left = "0px";
              annoHolder.style.top = "0px";
              annoHolder.style.removeProperty("right");
              annoHolder.style.removeProperty("bottom");
            }
          }
        }
      }
      if (anno != null && anno.parentElement != annoHolder) {
        annotations.querySelector(".ePageHolder").appendChild(anno);
        annoHolder.appendChild(anno);
        let activeSelect = annotations.querySelector('.eSelectActive[anno="' + _id + '"]');
        if (activeSelect != null) {
          annoHolder.appendChild(activeSelect);
        }
      }
      if (width < 0) {
        width = -width;
        x -= width;
      }
      if (height < 0) {
        height = -height;
        y -= height;
      }
      let svg;
      let path;
      let drawSetPoints = "";
      let drawSetWidth = 0;
      let transform;
      let setAnnoID;
      let svgtransform;
      let halfT = (t ?? 0) / 2;
      let text;
      let richText = d ?? {};
      switch (f) {
        case "markup":
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" new>
              <svg xmlns="http://www.w3.org/2000/svg">
                <polyline/>
              </svg>
            </div>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
            let line = anno.querySelector("polyline");
            line.setAttribute("fill", "none");
          }
          width += t;
          height += t;
          x += halfT;
          y += halfT;
          anno.style.width = width + "px";
          anno.style.height = height + "px";
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
          }
          svg = anno.querySelector("svg");
          path = svg.querySelector("polyline");
          svg.setAttribute("viewBox", "0 0 " + (width + (this.SVG_PADDING * 2)) + " " + (height + (this.SVG_PADDING * 2)));
          if (d.length == 2) {
            //let dividedT = t / 2;
            //drawSetPoints = (d[0] - dividedT + this.SVG_PADDING) + "," + (d[1] - dividedT + this.SVG_PADDING) + " " + (d[0] + dividedT + this.SVG_PADDING) + "," + (d[1] + dividedT + this.SVG_PADDING);
            drawSetPoints = ((width / 2) + this.SVG_PADDING) + "," + ((height / 2) + this.SVG_PADDING) + " " + ((width / 2) + .1 + this.SVG_PADDING) + "," + ((height / 2) + .1 + this.SVG_PADDING);
            path.setAttribute("stroke-width", width);
          } else {
            let scaleW = 1;
            let scaleH = 1;
            if (sync != null) {
              // Allows for greater precision when zoomed in:
              let largestX = d[0];
              let largestY = d[1];
              for (let i = 2; i < d.length; i += 2) {
                largestX = Math.max(largestX, d[i]);
                largestY = Math.max(largestY, d[i + 1]);
              }
              let halfT = 0;//t / 2;
              if (largestX - halfT > 0) {
                scaleW = (width - t) / (largestX - halfT);
              } else {
                scaleW = width - t;
              }
              if (largestY - halfT > 0) {
                scaleH = (height - t) / (largestY - halfT);
              } else {
                scaleH = height - t;
              }
            }
            for (let i = 0; i < d.length; i += 2) {
              drawSetPoints += (halfT + ((d[i]) * scaleW) + this.SVG_PADDING) + "," + (halfT + ((d[i + 1]) * scaleH) + this.SVG_PADDING) + " ";
            }
            path.setAttribute("stroke-width", t);
          }
          path.setAttribute("points", drawSetPoints);
          path.setAttribute("stroke", "#" + c);
          path.setAttribute("opacity", o / 100);
          break;
        case "text":
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" new>
              <div text edit></div>
            </div>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
          }
          anno.style.width = width + "px";
          anno.style.height = height + "px";
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
            anno.style.opacity = 1;
          } else {
            anno.setAttribute("tooleditor", "");
            anno.style.opacity = .7;
          }
          text = anno.querySelector("div[edit]");
          if (_id != null) {
            text.removeAttribute("placeborder");
          } else {
            text.setAttribute("placeborder", "");
          }
          anno.style.setProperty("--themeColor", "#" + c);
          text.style.opacity = o / 100;
          text.style.fontSize = Math.floor(Math.max(Math.min(richText.s ?? 18, 250), 1)) + "px";
          if (text.hasAttribute("contenteditable") == false) {
            let setHTML = "";
            for (let i = 0; i < richText.b.length; i++) {
              let addHTML = "";
              if (richText.b[i] != "\n") {
                addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
              } else {
                addHTML = "<br>";
              }
              setHTML += addHTML;
            }
            if (text.innerHTML != setHTML) {
              text.innerHTML = setHTML;
            }
            //text.innerText = cleanString(richText.b[0]);
            //text.innerHTML = cleanString(richText.b[0]).replace(/\n\n/g, "</br>").replace(/\n/g, "</br>");
          } else {
            anno.setAttribute("notransition", "");
          }
          if (richText.bo == true) {
            text.style.fontWeight = 700;
          } else {
            text.style.removeProperty("font-weight");
          }
          if (richText.it == true) {
            text.style.fontStyle = "italic";
          } else {
            text.style.removeProperty("font-style");
          }
          if (richText.st == true && richText.ul == true) {
            text.style.textDecoration = "underline line-through";
          } else if (richText.st == true) {
            text.style.textDecoration = "line-through";
          } else if (richText.ul == true) {
            text.style.textDecoration = "underline";
          } else {
            text.style.removeProperty("text-decoration");
          }
          text.style.textAlign = richText.al ?? "left";
  
          if (textfit == true) {
            text.style.width = "max-content";
            text.style.minWidth = "130px";
          } else {
            text.style.width = "calc(100% - 18px)"
            text.style.removeProperty("min-width");
          }
          text.style.height = "fit-content";
          break;
        case "draw":
          width += t;
          height += t;
          x += halfT;
          y += halfT;
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
          }
          if (d.length == 2) {
            //let dividedT = t / 2;
            //drawSetPoints = (d[0] - dividedT + this.SVG_PADDING) + "," + (d[1] - dividedT + this.SVG_PADDING) + " " + (d[0] + dividedT + this.SVG_PADDING) + "," + (d[1] + dividedT + this.SVG_PADDING);
            drawSetPoints = ((width / 2) + this.SVG_PADDING) + "," + ((height / 2) + this.SVG_PADDING) + " " + ((width / 2) + .1 + this.SVG_PADDING) + "," + ((height / 2) + .1 + this.SVG_PADDING)
            drawSetWidth = width;
          } else {
            let scaleW = 1;
            let scaleH = 1;
            if (sync != null) {
              // Allows for greater precision when zoomed in:
              let largestX = d[0];
              let largestY = d[1];
              for (let i = 2; i < d.length; i += 2) {
                largestX = Math.max(largestX, d[i]);
                largestY = Math.max(largestY, d[i + 1]);
              }
              let halfT = 0;//t / 2;
              if (largestX - halfT > 0) {
                scaleW = (width - t) / (largestX - halfT);
              } else {
                scaleW = width - t;
              }
              if (largestY - halfT > 0) {
                scaleH = (height - t) / (largestY - halfT);
              } else {
                scaleH = height - t;
              }
            }
            for (let i = 0; i < d.length; i += 2) {
              drawSetPoints += (halfT + ((d[i]) * scaleW) + this.SVG_PADDING) + "," + (halfT + ((d[i + 1]) * scaleH) + this.SVG_PADDING) + " ";
            }
            drawSetWidth = t;
          }
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" style="width: ${parseFloat(width)}px; height: ${parseFloat(height)}px" new>
              <svg viewBox="0 0 ${parseFloat(width + (this.SVG_PADDING * 2))} ${parseFloat(height + (this.SVG_PADDING * 2))}" xmlns="http://www.w3.org/2000/svg">
                <polyline stroke-width="${parseFloat(drawSetWidth)}" points="${drawSetPoints}" stroke="${"#" + cleanString(c)}" opacity="${parseFloat(o) / 100}"/>
              </svg>
            </div>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
            let line = anno.querySelector("polyline");
            line.setAttribute("fill", "none");
            line.setAttribute("stroke-linecap", "round");
            line.setAttribute("stroke-linejoin", "round");
          } else {
            anno.style.width = width + "px";
            anno.style.height = height + "px";
            svg = anno.querySelector("svg");
            path = svg.querySelector("polyline");
            svg.setAttribute("viewBox", "0 0 " + (width + (this.SVG_PADDING * 2)) + " " + (height + (this.SVG_PADDING * 2)));
            path.setAttribute("stroke-width", drawSetWidth);
            path.setAttribute("points", drawSetPoints);
            path.setAttribute("stroke", "#" + c);
            path.setAttribute("opacity", o / 100);
          }
          break;
        case "shape":
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" new>
              <svg xmlns="http://www.w3.org/2000/svg"></svg>
            </div>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
            /*
            let polygon = anno.querySelector("polygon");
            polygon.setAttribute("fill", "none");
            polygon.setAttribute("stroke-linecap", "round");
            polygon.setAttribute("stroke-linejoin", "round");
            */
          }
          if (b == "none" && d != "line") {
            t = 0;
            halfT = 0;
          }
          width += t;
          height += t;
          x += halfT;
          y += halfT;
          anno.style.width = width + "px";
          anno.style.height = height + "px";
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
            anno.style.opacity = 1;
          } else {
            anno.setAttribute("tooleditor", "");
            anno.style.opacity = .7;
          }
          svg = anno.querySelector("svg");
          if (remove != true) {
            svg.removeAttribute("hidden");
          } else {
            svg.setAttribute("hidden", "");
          }
          //polygon = svg.querySelector("polygon");
          svg.setAttribute("viewBox", "0 0 " + (width + (this.SVG_PADDING * 2)) + " " + (height + (this.SVG_PADDING * 2)));
  
          let elem;
          let widthT;
          let heightT;
          switch (d) {
            case "square":
              elem = svg.querySelector("rect");
              if (elem == null) {
                svg.innerHTML = "<rect/>";
                elem = svg.querySelector("rect");
                elem.setAttribute("rx", "10");
                elem.setAttribute("ry", "10");
              }
              elem.setAttribute("width", Math.max(Math.abs(width - t), 5));
              elem.setAttribute("height", Math.max(Math.abs(height - t), 5));
              elem.setAttribute("x", this.SVG_PADDING + halfT);
              elem.setAttribute("y", this.SVG_PADDING + halfT);
              break;
            case "ellipse":
              elem = svg.querySelector("ellipse");
              if (elem == null) {
                svg.innerHTML = "<ellipse/>";
                elem = svg.querySelector("ellipse");
              }
              elem.setAttribute("cx", this.SVG_PADDING + (width / 2));
              elem.setAttribute("cy", this.SVG_PADDING + (height / 2));
              elem.setAttribute("rx", Math.max(Math.abs(width - t) / 2, 5));
              elem.setAttribute("ry", Math.max(Math.abs(height - t) / 2, 5));
              break;
            case "triangle":
              elem = svg.querySelector("polygon");
              if (elem == null) {
                svg.innerHTML = "<polygon/>";
                elem = svg.querySelector("polygon");
                elem.setAttribute("stroke-linejoin", "round");
              }
              widthT = width - t;
              heightT = height - t;
              elem.setAttribute("points", ((widthT / 2) + this.SVG_PADDING + halfT) + "," + (this.SVG_PADDING + halfT) + " " + (this.SVG_PADDING + halfT) + "," + (heightT + this.SVG_PADDING + halfT) + " " + (widthT + this.SVG_PADDING + halfT) + "," + (heightT + this.SVG_PADDING + halfT));
              break;
            case "parallelogram":
              elem = svg.querySelector("polygon");
              if (elem == null) {
                svg.innerHTML = "<polygon/>";
                elem = svg.querySelector("polygon");
                elem.setAttribute("stroke-linejoin", "round");
              }
              widthT = width - t;
              heightT = height - t;
              elem.setAttribute("points", (this.SVG_PADDING + halfT + (widthT * .2)) + "," + (this.SVG_PADDING + halfT) + " " + (widthT + this.SVG_PADDING + halfT) + "," + (this.SVG_PADDING + halfT) + " " + (widthT + this.SVG_PADDING + halfT - (widthT * .2)) + "," + (heightT + this.SVG_PADDING + halfT) + " " + (this.SVG_PADDING + halfT) + "," + (heightT + this.SVG_PADDING + halfT));
              break;
            case "trapezoid":
              elem = svg.querySelector("polygon");
              if (elem == null) {
                svg.innerHTML = "<polygon/>";
                elem = svg.querySelector("polygon");
                elem.setAttribute("stroke-linejoin", "round");
              }
              widthT = width - t;
              heightT = height - t;
              elem.setAttribute("points", (this.SVG_PADDING + halfT + (widthT * .2)) + "," + (this.SVG_PADDING + halfT) + " " + (widthT + this.SVG_PADDING + halfT - (widthT * .2)) + "," + (this.SVG_PADDING + halfT) + " " + (widthT + this.SVG_PADDING + halfT) + "," + (heightT + this.SVG_PADDING + halfT) + " " + (this.SVG_PADDING + halfT) + "," + (heightT + this.SVG_PADDING + halfT));
              break;
            case "rhombus":
              elem = svg.querySelector("polygon");
              if (elem == null) {
                svg.innerHTML = "<polygon/>";
                elem = svg.querySelector("polygon");
                elem.setAttribute("stroke-linejoin", "round");
              }
              widthT = width - t;
              heightT = height - t;
              elem.setAttribute("points", (this.SVG_PADDING + halfT + (widthT * .5)) + "," + (this.SVG_PADDING + halfT) + " " + (widthT + this.SVG_PADDING + halfT) + "," + (this.SVG_PADDING + halfT + (heightT * .5)) + " " + (this.SVG_PADDING + halfT + (widthT * .5)) + "," + (heightT + this.SVG_PADDING + halfT) + " " + (this.SVG_PADDING + halfT) + "," + (this.SVG_PADDING + halfT + (heightT * .5)));
              break;
            case "line":
              elem = svg.querySelector("line");
              if (elem == null) {
                svg.innerHTML = "<line/>";
                elem = svg.querySelector("line");
                elem.setAttribute("stroke-linecap", "round");
              }
              if (b == "none") {
                b = "solid";
              }
              i = false;
              widthT = width - t;
              heightT = height - t;
              elem.setAttribute("x1", widthT + this.SVG_PADDING + halfT);
              elem.setAttribute("y1", this.SVG_PADDING + halfT);
              elem.setAttribute("x2", this.SVG_PADDING + halfT);
              elem.setAttribute("y2", heightT + this.SVG_PADDING + halfT);
            //elem.setAttribute("points", (widthT + this.SVG_PADDING + halfT) + "," + (this.SVG_PADDING + halfT) + " " + (this.SVG_PADDING + halfT) + "," + (heightT + this.SVG_PADDING + halfT));
          }
          if (b == "none") {
            i = true;
          }
          if (i != true) {
            elem.setAttribute("fill", "none");
            elem.setAttribute("stroke", "#" + c);
          } else {
            elem.setAttribute("fill", "#" + c);
            elem.setAttribute("stroke", "#" + this.utils.darkenHex(c, 20));
          }
          if ((b ?? "solid") == "solid") {
            elem.setAttribute("stroke-width", t);
            elem.removeAttribute("stroke-dasharray");
          } else if (b == "dashed") {
            elem.setAttribute("stroke-width", t);
            elem.setAttribute("stroke-dasharray", (t * 2) + ", " + (t * 2));
            elem.setAttribute("stroke-linecap", "round");
          } else {
            elem.setAttribute("stroke-width", 0);
          }
  
          elem.setAttribute("opacity", o / 100);
  
          if (width < 0 && height < 0) {
            svgtransform = "scale(-1,-1)";
          } else if (width < 0) {
            svgtransform = "scale(-1,1)";
          } else if (height < 0) {
            svgtransform = "scale(1,-1)";
          }
          if (elem != null) {
            elem.style.transform = svgtransform;
          }
          break;
        case "sticky":
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" sticky new>
              <div holder>
                <div edit></div>
                <div footer>
                  <div signature></div>
                  <div reactions><button class="eReaction" add dropdowntitle="Reactions" noscrollclose><div imgholder><img src="./images/editor/actions/reaction.svg"></div></button></div>
                </div>
              </div>
            </div>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
          }
          anno.style.width = width + "px";
          anno.style.height = height + "px";
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
            anno.style.opacity = 1;
          } else {
            anno.setAttribute("tooleditor", "");
            anno.style.opacity = .7;
          }
          anno.style.setProperty("--themeColor", "#" + c);
          text = anno.querySelector("div[edit]");
          if (_id != null) {
            text.removeAttribute("placeborder");
          } else {
            text.setAttribute("placeborder", "");
          }
          anno.style.color = this.utils.textColorBackground(c);
          anno.style.textAlign = richText.al ?? "left";
          text.style.opacity = o / 100;
          let fontSize = Math.floor(Math.max(Math.min(richText.s ?? 16, 250), 1));
          text.style.fontSize = fontSize + "px";
          text.style.lineHeight = fontSize + 6 + "px";
          if (text.hasAttribute("contenteditable") == false) {
            if (richText.b != null) {
              let setHTML = "";
              for (let i = 0; i < richText.b.length; i++) {
                let addHTML = "";
                if (richText.b[i] != "\n") {
                  addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
                } else {
                  addHTML = "<br>";
                }
                setHTML += addHTML;
              }
              if (text.innerHTML != setHTML) {
                text.innerHTML = setHTML;
              }
              //text.innerText = cleanString(richText.b[0]);
              //text.innerHTML = cleanString(richText.b[0]).replace(/\n\n/g, "</br>").replace(/\n/g, "</br>");
            }
          } else {
            anno.setAttribute("notransition", "");
          }
          if (richText.bo == true) {
            text.style.fontWeight = 700;
          } else {
            text.style.removeProperty("font-weight");
          }
          if (richText.it == true) {
            text.style.fontStyle = "italic";
          } else {
            text.style.removeProperty("font-style");
          }
          if (richText.st == true && richText.ul == true) {
            text.style.textDecoration = "underline line-through";
          } else if (richText.st == true) {
            text.style.textDecoration = "line-through";
          } else if (richText.ul == true) {
            text.style.textDecoration = "underline";
          } else {
            text.style.removeProperty("text-decoration");
          }
          let signature = anno.querySelector("div[signature]");
          if (sig && sig != "") {
            signature.textContent = cleanString(sig);
            signature.title = signature.textContent;
            signature.removeAttribute("hidden");
          } else {
            signature.setAttribute("hidden", "");
          }
          let reactionHolder = anno.querySelector("div[reactions]");
          if (lock != true) {
            reactionHolder.removeAttribute("disabled");
          } else {
            reactionHolder.setAttribute("disabled", "");
          }
          let addReactionButton = reactionHolder.querySelector(".eReaction[add]");
          let reactions = this.reactions[_id];
          let presentReactions = [];
          if (reactions != null) {
            for (let i = 0; i < reactions.length; i++) {
              let reaction = reactions[i];
              presentReactions.push(reaction.emoji);
              let reactionElem = reactionHolder.querySelector('.eReaction[emoji="' + reaction.emoji + '"');
              if (reactionElem == null) {
                reactionHolder.insertAdjacentHTML("beforeend", `<button class="eReaction" unloaded new><div imgholder><img src="./images/editor/actions/reaction.svg"></div><div count></div></button>`);
                reactionElem = reactionHolder.querySelector(".eReaction[new]");
                reactionHolder.insertBefore(reactionElem, addReactionButton);
                reactionElem.removeAttribute("new");
                reactionElem.setAttribute("emoji", reaction.emoji);
              }
              if (reaction.reacted == true) {
                reactionElem.setAttribute("selected", "");
              } else {
                reactionElem.removeAttribute("selected");
              }
              reactionElem.querySelector("div[count]").textContent = Math.max(reaction.count, 1);
              if (this.loadingEmojiModule != true && reactionElem.hasAttribute("unloaded") == true) {
                this.loadingEmojiModule = true;
                (async () => {
                  let emojiModule = await this.newModule("dropdowns/editor/tools/emojis");
                  if (emojiModule != null) {
                    emojiModule.applyReactions();
                  }
                  this.loadingEmojiModule = false;
                })();
              }
            }
          }
          let currentReactions = reactionHolder.querySelectorAll(".eReaction[emoji]");
          for (let i = 0; i < currentReactions.length; i++) {
            if (presentReactions.includes(currentReactions[i].getAttribute("emoji")) == false) {
              currentReactions[i].remove();
            }
          }
          if (reactionHolder.childElementCount < 9) {
            addReactionButton.style.display = "flex";
          } else {
            addReactionButton.style.display = "none";
          }
          if (reactionHolder.childElementCount > 1) {
            reactionHolder.style.width = "100%";
            reactionHolder.style.flex = "unset";
          } else {
            reactionHolder.style.width = "unset";
            reactionHolder.style.flex = "1";
          }
          break;
        case "page":
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" page new>
              <div background></div>
              <div border></div>
              <div title></div>
              <div content annoholdercontainer></div>
            </div>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
          }
          anno.style.width = width + "px";
          anno.style.height = height + "px";
          anno.style.setProperty("--themeColor", "#" + c);
          anno.style.color = this.utils.textColorBackground(c);
          //anno.style.left = x + "px";
          //anno.style.top = y + "px";
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
            anno.style.opacity = 1;
          } else {
            anno.setAttribute("tooleditor", "");
            anno.style.opacity = .7;
          }
          let pageTitle = anno.querySelector(":scope > div[title]");
          if (pageTitle.hasAttribute("contenteditable") == false) {
            if ((data.title ?? "").length < 1) {
              pageTitle.style.removeProperty("display");
              pageTitle.textContent = "";
            } else {
              pageTitle.style.display = "unset";
              pageTitle.textContent = cleanString(data.title);
            }
          }
          let pageBorder = anno.querySelector(":scope > div[border]");
          let pageContent = anno.querySelector(":scope > div[content]");
          let pdfDocumentHolder = pageContent.querySelector(":scope > div[document]");
          if (data.source != null && data.number != null) {
            let sourcePageId = data.source + "_" + data.number;
            if (pdfDocumentHolder != null && pdfDocumentHolder.getAttribute("sourcepage") != sourcePageId) {
              pdfDocumentHolder.remove();
              pdfDocumentHolder = null;
            }
            if (pdfDocumentHolder == null) {
              pageContent.insertAdjacentHTML("beforeend", `<div document></div>`);
              pdfDocumentHolder = pageContent.querySelector(":scope > div[document]");
              pdfDocumentHolder.setAttribute("sourcepage", sourcePageId);
              pdfDocumentHolder.setAttribute("width", data.s[0]);
              pdfDocumentHolder.setAttribute("height", data.s[1]);
              pdfDocumentHolder.setAttribute("rotation", data.rotation);
              if (this.exporting != true) {
                pdfDocumentHolder.style.opacity = 0;
                pdfDocumentHolder.style.transition = "opacity .3s";
              }
              this.render.addPageToQueue(data.source, data.number);
            } else {
              pdfDocumentHolder.setAttribute("sourcepage", sourcePageId);
              pdfDocumentHolder.setAttribute("width", data.s[0]);
              pdfDocumentHolder.setAttribute("height", data.s[1]);
              let rotation = data.rotation ?? 0;
              pdfDocumentHolder.setAttribute("rotation", rotation);
              let canvas = pdfDocumentHolder.querySelector("canvas");
              if (canvas != null) {
                let canvasWidth = parseFloat(canvas.getAttribute("width"));
                let canvasHeight = parseFloat(canvas.getAttribute("height"));
                let useWidth = data.s[0];
                let useHeight = data.s[1];
                if (rotation == 90 || rotation == 270) {
                  let prevWidth = width;
                  canvasWidth = height;
                  canvasHeight = prevWidth;
                  useWidth = data.s[1];
                  useHeight = data.s[0];
                }
                pdfDocumentHolder.style.setProperty("--fullWidth", canvasWidth + "px");
                pdfDocumentHolder.style.setProperty("--fullHeight", canvasHeight + "px");
                pdfDocumentHolder.style.transform = "rotate(" + rotation + "deg)";
                let ratio = canvasWidth / canvasHeight;
                let ratioedWidth = (useHeight - 8) * ratio;
                let ratioedHeight = (useWidth - 8) / ratio;
                if (ratioedWidth < useWidth - 8) {
                  pdfDocumentHolder.style.width = (ratioedWidth + 8) + "px";
                  pdfDocumentHolder.style.height = useHeight + "px";
                  pdfDocumentHolder.style.setProperty("--fullScale", "scale(" + ((useHeight - 8) / canvasHeight) + ")");
                } else {
                  pdfDocumentHolder.style.width = useWidth + "px";
                  pdfDocumentHolder.style.height = (ratioedHeight + 8) + "px";
                  pdfDocumentHolder.style.setProperty("--fullScale", "scale(" + ((useWidth - 8) / canvasWidth) + ")");
                }
              }
            }
          } else if (pdfDocumentHolder != null) {
            pdfDocumentHolder.remove();
          }
          let pageHiddenHolder = anno.querySelector(":scope > div[hide]");
          if (data.hidden == true) {
            anno.setAttribute("hide", "");
            if (pageHiddenHolder == null) {
              anno.insertAdjacentHTML("beforeend", `<div hide></div>`);
              let hiddenElem = anno.querySelector(":scope > div[hide]");
              if (this.getSelf().access < 4) {
                hiddenElem.insertAdjacentHTML("beforeend", `<img hideicon src="./images/editor/hidden.svg" draggable="false">`);
              } else {
                if (this.exporting != true) {
                  hiddenElem.insertAdjacentHTML("beforeend", `<div hidemodal>
                    <img src="./images/editor/hidden.svg" draggable="false">
                    <div hidemodaltitle>Page Hidden</div>
                  </div>`);
                  if (this.getSelf().access > 3) {
                    hiddenElem.querySelector("div[hidemodal]").insertAdjacentHTML("beforeend", `<button class="largeButton">Reveal Page</button>`);
                  }
                }
              }
            }
            pageBorder.style.pointerEvents = "none";
          } else if (pageHiddenHolder != null) {
            anno.removeAttribute("hide");
            pageHiddenHolder.remove();
            pageBorder.style.removeProperty("pointer-events");
          }
          break;
        case "media":
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<img class="eAnnotation" draggable="false" new></img>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
            /*
            let polygon = anno.querySelector("polygon");
            polygon.setAttribute("fill", "none");
            polygon.setAttribute("stroke-linecap", "round");
            polygon.setAttribute("stroke-linejoin", "round");
            */
          }
          anno.style.width = width + "px";
          anno.style.height = height + "px";
          //anno.style.left = x + "px";
          //anno.style.top = y + "px";
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
            anno.style.opacity = 1;
          } else {
            anno.setAttribute("tooleditor", "");
            anno.style.opacity = .7;
          }

          anno.style.opacity = o / 100;

          if (this.exporting != true) {
            if (d != null || anno.hasAttribute("src") == false) {
              if (d != null && d.startsWith("blob:") == false) {
                if (anno.src != assetURL + d) {
                  anno.src = assetURL + d;
                }
              } else {
                if (anno.src != (d ?? "./images/editor/uploading.png")) {
                  anno.src = d ?? "./images/editor/uploading.png";
                }
              }
            }
          } else {
            this.exportPromises.push(new Promise(async (resolve) => {
              anno.addEventListener("load", resolve);
              if (d != null || anno.hasAttribute("src") == false) {
                if (d != null && d.startsWith("blob:") == false) {
                  anno.src = assetURL + d;
                } else {
                  anno.src = d ?? "./images/editor/uploading.png";
                }
              }
            }));
          }
          break;
        case "embed":
          if (anno == null) {
            annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" embed new>
              <div holder>
                <div content>
                  <img thumbnail>
                  <div activate><button><img></button></div>
                </div>
                <div details>
                  <div input>
                    <input placeholder="https://markifyapp.com" nodelete></input>
                  </div>
                  <div info>
                    <div title></div>
                    <div description></div>
                    <a link target="_blank"><img src="./images/editor/actions/link.svg"><div></div></a>
                  </div>
                </div>
              </div>
            </div>`);
            anno = annoHolder.querySelector(".eAnnotation[new]");
            anno.removeAttribute("new");
          }
          //<button class="largeButton border">Set</button>
          anno.style.width = width + "px";
          anno.style.height = height + "px";
          //anno.style.left = x + "px";
          //anno.style.top = y + "px";
          transform = "translate(" + x + "px," + y + "px)";
          if (_id != null) {
            setAnnoID = _id;
            anno.style.opacity = 1;
          } else {
            anno.setAttribute("tooleditor", "");
            anno.style.opacity = .7;
          }
  
          let embedHolder = anno.querySelector("div[content]");
          let thumbnail = embedHolder.querySelector("img[thumbnail]");
          let embedActivate = anno.querySelector("div[activate]");
          let embedFrame = anno.querySelector("iframe");
          let embedDetails = anno.querySelector("div[details]");
          let linkInputHolder = embedDetails.querySelector("div[input]");
          let linkInput = linkInputHolder.querySelector("input");
          let infoHolder = embedDetails.querySelector("div[info]");
          let embedTitle = infoHolder.querySelector("div[title]");
          let embedDesc = infoHolder.querySelector("div[description]");
          let embedLink = infoHolder.querySelector("a[link]");
          if (d != null && data.embed != null) {
            linkInputHolder.removeAttribute("visible");
            if (this.exporting != true) {
              if (data.embed.url != null) {
                if (embedFrame == null) {
                  embedActivate.querySelector("img").src = "./images/editor/actions/play.svg";
                  embedActivate.style.display = "flex";
                }
              } else {
                embedActivate.style.display = "none";
              }
            }
            if (data.embed.image != null) {
              if (embedFrame == null) {
                if (this.exporting != true) {
                  thumbnail.src = data.embed.image;
                } else {
                  this.exportPromises.push(new Promise(async (resolve) => {
                    thumbnail.addEventListener("load", resolve);
                    thumbnail.src = data.embed.image;
                  }));
                }
                thumbnail.style.display = "unset";
              }
            } else {
              thumbnail.style.removeProperty("display");
              thumbnail.removeAttribute("src");
            }
            if (data.embed.color != null) {
              embedHolder.style.background = cleanString(data.embed.color);
            } else {
              embedHolder.style.removeProperty("background");
            }
            if (data.embed.title != null || data.embed.site != null) {
              embedTitle.textContent = cleanString(data.embed.title ?? data.embed.site);
              embedTitle.title = embedTitle.textContent;
              embedTitle.style.display = "unset";
            } else {
              embedTitle.style.removeProperty("display");
            }
            if (data.embed.description) {
              embedDesc.textContent = cleanString(data.embed.description);
              embedDesc.title = embedDesc.textContent;
              embedDesc.style.display = "unset";
            } else {
              embedDesc.style.removeProperty("display");
            }
            infoHolder.style.removeProperty("display");
          } else {
            linkInputHolder.setAttribute("visible", "");
            embedActivate.style.removeProperty("display");
            thumbnail.style.removeProperty("display");
            infoHolder.style.display = "none";
          }
          if (document.activeElement != linkInput) {
            linkInput.value = d ?? "";
          }
          if (d != null) {
            embedLink.querySelector("div").textContent = (new URL(d)).hostname;
            embedLink.title = d;
            embedLink.href = d;
          }
  
          if (embedFrame != null) {
            let frameWidth = width - 16;
            let defaultMaxWidth = 800;
            if (frameWidth < 300) {
              defaultMaxWidth = 300;
            }
            let embedWidth = Math.max(frameWidth, defaultMaxWidth);
            let scale = frameWidth / embedWidth;
            embedFrame.style.width = embedWidth + "px";
            embedFrame.style.height = ((height - 24 - embedDetails.offsetHeight) * (1 / scale)) + "px";
            embedFrame.style.transform = "scale(" + scale + ")";
  
            if (embedFrame.getAttribute("currenturl") != (data.embed ?? {}).url) {
              embedFrame.remove();
              embedActivate.style.opacity = 1;
            }
          }
      }
      if (anno != null) {
        if (annotation != null) {
          annotation.element = anno;
        }
        //console.log((sync ?? getEpoch()) - editor.lesson.created)
        let zIndex = l ?? Math.round(((sync ?? getEpoch()) / 2000000000000) * 2147483647);
        anno.style.zIndex = zIndex;
        if (zIndex < this.minLayer) {
          this.minLayer = zIndex;
        }
        if (zIndex > this.maxLayer) {
          this.maxLayer = zIndex;
        }
        let rotate = r ?? 0;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        transform += " rotate(" + rotate + "deg)";
        if (size[0] < 0 && size[1] < 0) {
          transform += " scale(-1)";
        } else if (size[0] < 0) {
          transform += " scale(-1,1)";
        } else if (size[1] < 0) {
          transform += " scale(1,-1)";
        }
        anno.style.transform = transform;
        let annoAnnotationHolder = anno.querySelector(".eAnnotationHolder");
        if (annoAnnotationHolder != null) {
          if (data.resizing == null) {
            annoAnnotationHolder.style.width = width + "px";
            annoAnnotationHolder.style.height = height + "px";
            annoAnnotationHolder.removeAttribute("notransition");
            annoAnnotationHolder.style.left = "0px";
            annoAnnotationHolder.style.top = "0px";
            annoAnnotationHolder.style.removeProperty("right");
            annoAnnotationHolder.style.removeProperty("bottom");
          } else {
            annoAnnotationHolder.setAttribute("notransition", "");
            let [annoX, annoY] = editor.getAbsolutePosition(data);
            let [handle, resizeX, resizeY, resizeWidth, resizeHeight] = data.resizing;
            switch (handle) {
              case "bottomright":
                annoAnnotationHolder.style.left = (resizeX - annoX) + "px";
                annoAnnotationHolder.style.top = (resizeY - annoY) + "px";
                annoAnnotationHolder.style.removeProperty("right");
                annoAnnotationHolder.style.removeProperty("bottom");
                break;
              case "topleft":
                annoAnnotationHolder.style.right = ((annoX + width) - (resizeX + resizeWidth)) + "px";
                annoAnnotationHolder.style.bottom = ((annoY + height) - (resizeY + resizeHeight)) + "px";
                annoAnnotationHolder.style.removeProperty("left");
                annoAnnotationHolder.style.removeProperty("top");
                break;
              case "topright":
                annoAnnotationHolder.style.left = (resizeX - annoX) + "px";
                annoAnnotationHolder.style.bottom = ((annoY + height) - (resizeY + resizeHeight)) + "px";
                annoAnnotationHolder.style.removeProperty("right");
                annoAnnotationHolder.style.removeProperty("top");
                break;
              case "bottomleft":
                annoAnnotationHolder.style.right = ((annoX + width) - (resizeX + resizeWidth)) + "px";
                annoAnnotationHolder.style.top = (resizeY - annoY) + "px";
                annoAnnotationHolder.style.removeProperty("left");
                annoAnnotationHolder.style.removeProperty("bottom");
            }
          }
        }
        if (done != true) {
          anno.removeAttribute("done");
        } else {
          anno.setAttribute("done", "");
        }
        if (remove != true) {
          anno.removeAttribute("hidden");
        } else {
          anno.setAttribute("hidden", "");
          if (long == true) {
            anno.remove();
            delete editor.annotations[_id];
          }
          let activeSelect = editor.page.querySelector('.eSelectActive[anno="' + _id + '"]');
          if (activeSelect != null) {
            activeSelect.remove();
          }
          let allSelections = editor.page.querySelectorAll('.eCollabSelect[anno="' + _id + '"]');
          for (let i = 0; i < allSelections.length; i++) {
            let select = allSelections[i];
            (async function () {
              select.setAttribute("old", "");
              select.style.opacity = 0;
              await sleep(150);
              select.remove();
            })();
          }
          let iframePresent = anno.querySelector("iframe");
          if (iframePresent != null) {
            iframePresent.remove();
          }
        }
        if (setAnnoID != null) {
          anno.offsetHeight;
          anno.setAttribute("anno", setAnnoID);
        }
      }
      return [data, anno];
    }
    this.render.removeAnnotation = async (annoID, checkDone) => {
      let anno = annotations.querySelector('.eAnnotation[anno="' + annoID + '"]');
      if (anno != null && (checkDone != true || anno.hasAttribute("done") == false)) {
        anno.remove();
      }
      let allSelections = [...annotations.querySelectorAll('.eSelect[anno="' + annoID + '"]'), ...annotations.querySelectorAll('.eSelectActive[anno="' + annoID + '"]')];
      for (let i = 0; i < allSelections.length; i++) {
        allSelections[i].remove();
      }
    };

    let updateSubTimeout;
    let updatePageTimeout;
    let loadedChunks = {};
    let alreadyRunningUpdateCycle = false;
    this.runUpdateCycle = async () => {
      if (alreadyRunningUpdateCycle == true) {
        return;
      }
      alreadyRunningUpdateCycle = true;
      let unloadChunkedAnnotations = {};
      let newlyUnloaded = {};
      let visible = Object.keys(loadedChunks);
      for (let i = 0; i < visible.length; i++) {
        let chunk = visible[i];
        if (this.visibleChunks.includes(chunk) == false) {
          delete loadedChunks[chunk];
          newlyUnloaded[chunk] = "";

          // Remove annotations in unloaded chunks:
          unloadChunkedAnnotations = { ...unloadChunkedAnnotations, ...(this.chunkAnnotations[chunk] ?? {}) };
        }
      }
      let chunkUnloadAnnos = Object.keys(unloadChunkedAnnotations);
      for (let a = 0; a < chunkUnloadAnnos.length; a++) {
        let annotation = this.annotations[chunkUnloadAnnos[a]] ?? {};
        if (annotation.render == null) {
          continue;
        }
        if (annotation.chunks != null) {
          // Annotation may still be visible in another chunk, we must check
          let remove = true;
          for (let c = 0; c < annotation.chunks.length; c++) {
            if (loadedChunks[annotation.chunks[c]] != null) {
              remove = false;
              break;
            }
          }
          if (remove == false) {
            continue;
          }
        }
        if (this.selecting[annotation.render._id] != null) {
          continue;
        }
        if (annotation.element != null) {
          annotation.element.remove();
          annotation.element = null;
        }
      }

      let loadChunkedAnnotations = {};
      let newlyLoaded = {};
      for (let i = 0; i < this.visibleChunks.length; i++) {
        let chunk = this.visibleChunks[i];
        if (loadedChunks[chunk] == null) {
          loadedChunks[chunk] = "";
          newlyLoaded[chunk] = "";

          // Load annotations in these chunks:
          loadChunkedAnnotations = { ...loadChunkedAnnotations, ...(this.chunkAnnotations[chunk] ?? {}) };
        }
      }
      let renderAnnotationIDs = {};
      let renderAnnotationAnnos = [];
      let chunkAnnos = Object.keys(loadChunkedAnnotations);
      for (let a = 0; a < chunkAnnos.length; a++) {
        let annotation = this.annotations[chunkAnnos[a]] ?? { chunks: [] };
        let render = true;
        for (let i = 0; i < annotation.chunks.length; i++) {
          let chunk = annotation.chunks[i];
          if (loadedChunks[chunk] != null && newlyLoaded[chunk] == null) {
            render = false;
            break;
          }
        }
        if (render == true && annotation.render != null && annotation.element == null) {
          renderAnnotationIDs[annotation.render._id] = {};
          renderAnnotationAnnos.push(annotation.render);
        }
      }
      let renderedNewAnnoIDs = {};
      while (renderAnnotationAnnos.length > 0) {
        for (let i = 0; i < renderAnnotationAnnos.length; i++) {
          let newRender = renderAnnotationAnnos[i];
          if (renderAnnotationIDs[newRender.parent] == null || renderedNewAnnoIDs[newRender.parent] != null) {
            this.render.createAnnotation(newRender);
            renderedNewAnnoIDs[newRender._id] = true;
            renderAnnotationAnnos.splice(i, 1);
            i--;
          }
        }
        await sleep(1); // Just to be safe
      }
      alreadyRunningUpdateCycle = false;
    }
    this.updateChunks = async () => {
      if (this.exporting == true) {
        return;
      }

      // Update Background Dots:
      let dotSize = 25;
      if (this.zoom < .25) {
        dotSize = 100;
      } else if (this.zoom < .5) {
        dotSize = 50;
      }
      background.style.backgroundSize = dotSize + "px " + dotSize + "px";
      let scaledDotSize = dotSize * this.zoom;
      let backgroundWidth = Math.ceil((page.offsetWidth + (scaledDotSize * 4)) / scaledDotSize) * scaledDotSize;
      let backgroundHeight = Math.ceil((page.offsetHeight + (scaledDotSize * 4)) / scaledDotSize) * scaledDotSize;
      background.style.width = (backgroundWidth / this.zoom) + "px";
      background.style.height = (backgroundHeight / this.zoom) + "px";
      let annotationRect = this.utils.localBoundingRect(annotations);
      let originCorrectX = (annotationRect.left - (backgroundWidth / 2)) % scaledDotSize;
      let originCorrectY = (annotationRect.top - (backgroundHeight / 2)) % scaledDotSize;
      background.style.left = (contentHolder.scrollLeft + originCorrectX - (scaledDotSize * 2)) + "px";
      background.style.top = (contentHolder.scrollTop + originCorrectY - (scaledDotSize * 2)) + "px";

      if (this.zooming == true) {
        return;
      }

      let beforeChunks = JSON.stringify(this.visibleChunks);
      this.visibleChunks = this.utils.regionInChunks(
        ((page.offsetWidth / -2) - annotationRect.left) / this.zoom,
        ((page.offsetHeight / -2) - annotationRect.top) / this.zoom,
        ((page.offsetWidth + (page.offsetWidth / 2)) - annotationRect.left) / this.zoom,
        ((page.offsetHeight + (page.offsetHeight / 2)) - annotationRect.top) / this.zoom
      );
      if (beforeChunks != JSON.stringify(this.visibleChunks)) {
        this.runUpdateCycle();
      }
      
      clearTimeout(updatePageTimeout);
      updatePageTimeout = setTimeout(this.utils.updateCurrentPage, 100);
      clearTimeout(updateSubTimeout);
      updateSubTimeout = setTimeout(() => {
        if (this.realtime.module != null) {
          this.realtime.module.setShortSub(this.visibleChunks);
        }
      }, 750);
    }
    this.pipeline.subscribe("boundChange", "bounds_change", this.updateChunks);

    contentHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });

    let lastMouseX;
    let lastMouseY;
    let mouseBeforeX;
    let mouseBeforeY;
    this.setZoom = async (set, observe, mouse) => {
      mouse = mouse ?? {};
      if (observe != true && this.realtime.observing != null && this.realtime.module != null) {
        this.realtime.module.exitObserve();
      }

      let { mouseX, mouseY } = this.utils.localMousePosition(mouse);

      if (lastMouseX != mouseX || lastMouseY != mouseY) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        // Get Page Rect:
        let annotationHolderRect = this.utils.localBoundingRect(annotations);
        mouseBeforeX = (mouseX - annotationHolderRect.left) / this.zoom;
        mouseBeforeY = (mouseY - annotationHolderRect.top) / this.zoom;
      }

      if (set != null) {
        this.zoom = set;
      } else {
        this.zoom += Math.min(mouse.deltaY ?? 0, 50) * -0.01;
      }
      this.zoomChanged = true;

      if (this.zoom > 5) {
        this.zoom = 5;
      } else if (this.zoom < .2) {
        this.zoom = .2;
      }

      this.zooming = true;

      content.style.setProperty("--zoom", this.zoom);

      await this.render.setMarginSize();

      if (observe != true) {
        // Get Page Rect:
        let annotationHolderRect = this.utils.localBoundingRect(annotations);
        let addScrollX = (mouseBeforeX * this.zoom) - (mouseX - annotationHolderRect.left);
        let addScrollY = (mouseBeforeY * this.zoom) - (mouseY - annotationHolderRect.top);
        
        // Set the new scroll position
        contentHolder.scrollTo(contentHolder.scrollLeft + addScrollX, contentHolder.scrollTop + addScrollY);
      }

      await this.updateChunks();

      this.zooming = false;

      this.pipeline.publish("zoom_change", { zoom: this.zoom });

      if (this.realtime.module != null) {
        this.realtime.module.adjustRealtimeHolder();
      }
    }
    this.pipeline.subscribe("zoomWheel", "wheel", (data) => {
      let event = data.event;
      if (event.ctrlKey == true || event.metaKey == true) {
        event.preventDefault();
        this.setZoom(null, null, event);
      } else {
        lastMouseX = null;
        lastMouseY = null;
      }
    });
    contentHolder.addEventListener("DOMMouseScroll", (event) => {
      this.pipeline.publish("wheel", { type: "DOMMouseScroll", event: event });
    }, { passive: false });
    contentHolder.addEventListener("mousewheel", (event) => {
      this.pipeline.publish("wheel", { type: "mousewheel", event: event });
    }, { passive: false });
    contentHolder.addEventListener("wheel", (event) => {
      this.pipeline.publish("wheel", { type: "wheel", event: event });
    }, { passive: false });

    let startDistance;
    let startZoom;
    let currentCenter;
    let getDistance = (touches) => {
      let pageWidth = page.offsetWidth;
      let pageHeight = page.offsetHeight;
      let { touchAX, touchAY } = this.utils.localMousePosition(touches[1]);
      let { touchBX, touchBY } = this.utils.localMousePosition(touches[0]);
      let xDiff = (touchAX / pageWidth) - (touchBX / pageWidth);
      let yDiff = (touchAY / pageHeight) - (touchBY / pageHeight);
      return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }
    let getCenter = (touches) => {
      let { touchAX, touchAY } = this.utils.localMousePosition(touches[0]);
      let { touchBX, touchBY } = this.utils.localMousePosition(touches[1]);
      return { x: (touchAX + touchBX) / 2, y: (touchAY + touchBY) / 2 };
    }
    let running = false;
    let handlePinch = async (event) => {
      if (event.touches.length > 1 && this.pinchZoomDisable != true) {
        event.preventDefault();
        if (running == true) {
          return;
        }
        running = true;
        let selectKeys = Object.keys(this.selecting);
        this.selecting = {};
        for (let i = 0; i < selectKeys.length; i++) {
          let existingAnno = this.annotations[selectKeys[i]];
          if (existingAnno != null) {
            let allowRender = false;
            for (let i = 0; i < existingAnno.chunks.length; i++) {
              if (this.visibleChunks.includes(existingAnno.chunks[i]) == true) {
                allowRender = true;
                break;
              }
            }
            if (allowRender == true) {
              await this.render.createAnnotation(existingAnno.render);
            }
          }
        }
        let currentDistance = getDistance(event.touches);
        if (startDistance == null) {
          startDistance = currentDistance;
        }
        if (startZoom == null) {
          startZoom = this.zoom;
        }
        if (currentCenter == null) {
          currentCenter = getCenter(event.touches);
        }
        await this.setZoom(startZoom * (currentDistance / startDistance), null, { clientX: currentCenter.x, clientY: currentCenter.y, updatePages: false });
        running = false;
      }
    }
    this.pipeline.subscribe("zoomPinchTouchStart", "touchstart", (data) => {
      handlePinch(data.event);
    });
    this.pipeline.subscribe("zoomPinchTouchMove", "touchmove", (data) => {
      handlePinch(data.event);
    });
    this.pipeline.subscribe("zoomPinchTouchEnd", "touchend", (data) => {
      startDistance = null;
      startZoom = null;
      currentCenter = null;
    });

    contentHolder.addEventListener("mousedown", (event) => {
      this.pipeline.publish("mousedown", { event: event });
      this.pipeline.publish("click_start", { type: "mousedown", event: event });
    }, { passive: false });
    contentHolder.addEventListener("mousemove", (event) => {
      this.pipeline.publish("mousemove", { event: event });
      this.pipeline.publish("click_move", { type: "mousemove", event: event });
    }, { passive: false });
    contentHolder.addEventListener("mouseup", (event) => {
      this.pipeline.publish("mouseup", { event: event });
      this.pipeline.publish("click_end", { type: "mouseup", event: event });
    }, { passive: false });

    contentHolder.addEventListener("touchstart", (event) => {
      this.pipeline.publish("touchstart", { event: event });
      this.pipeline.publish("click_start", { type: "touchstart", event: event });
    }, { passive: false });
    contentHolder.addEventListener("touchmove", (event) => {
      this.pipeline.publish("touchmove", { event: event });
      this.pipeline.publish("click_move", { type: "touchmove", event: event });
    }, { passive: false });
    contentHolder.addEventListener("touchend", (event) => {
      this.pipeline.publish("touchend", { event: event });
      this.pipeline.publish("click_end", { type: "touchend", event: event });
    }, { passive: false });

    this.updateChunks();
  }
}