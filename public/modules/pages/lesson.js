modules["pages/lesson"] = class {
  title = "Lesson";
  preJs = () => {

  }
  html = `<div class="lPageHolder">
    <div class="lPage"></div>
  </div>`;
  css = {
    ".lPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100%; height: 100vh; padding: 8px; left: 0px; top: 0px; justify-content: center`,
    ".lPage": `display: flex; width: 100%; height: 100%; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`
  };
  editors = {};
  // LESSON PAGE : Loads lessons, members, and configs before creating editor modules:
  js = async (page, joinData) => {
    this.id = getParam("lesson") ?? "";

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
      let editorKeys = Object.keys(this.editors);
      for (let i = 0; i < editorKeys.length; i++) {
        let editor = this.editors[editorKeys[i]];
        editor.pipeline.publish("resize", { event: event });
        editor.pipeline.publish("bounds_change", { type: "resize", event: event });
      }
    });
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
          <button class="eZoom"><span class="eZoomBox">100</span>%</button>
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
          <div class="eCurrentPage border" contenteditable><b>0</b> / 0</div>
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
    ".eContentHolder .content": `width: 5000px; height: 5000px`, // Just a test
    
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
    ".eFileName::-webkit-scrollbar": `display: none`,
    //".eFileName:focus": `--borderWidth: 4px`,
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
    ".eBottomSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eBottomSection[left]": `display: none; border-top-right-radius: 12px`,
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

    let contentHolder = frame.querySelector(".eContentHolder");

    this.editor = await this.setFrame("pages/lesson/editor", frame.querySelector(".eContentHolder"));
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

    this.editor.pipeline.subscribe("boundChange", "bounds_change", (data) => {
      //console.log("BOUNDS", data);
    });

    contentHolder.addEventListener("scroll", (event) => {
      this.editor.pipeline.publish("scroll", { event: event });
      this.editor.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });
    eTop.addEventListener("scroll", (event) => {
      this.editor.pipeline.publish("topbar_scroll", { event: event });
    });
  }
}

modules["pages/lesson/editor"] = class {
  html = ``;
  css = {

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
        this.pipeline.pipeUnsubscribe(id);
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

  js = async (frame, extra) => {

  }
}