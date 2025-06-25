modules["lesson/breakout"] = class {
  html = ``;
  css = {};

  pipeline = { // PIPELINE : Distributes events across various modules and services:
    pipeline: {}, // All active events
    pipelineSubs: {}, // All active subscribes
    publish: async (event, data) => {
      let listeners = this.pipeline.pipeline[event] ?? [];
      for (let i = 0; i < listeners.length; i++) {
        let subscribe = (this.pipeline.pipelineSubs[listeners[i]] ?? {})[event] ?? {};
        if (subscribe.callback != null) {
          await subscribe.callback(data);
        }
      }
      if (this.pipelinePublishPassthrough != null) {
        this.pipelinePublishPassthrough(event, data);
      }
    },
    subscribe: (id, event, callback, extra) => {
      extra = extra ?? {};

      if (extra.unsubscribe != true) {
        this.pipeline.unsubscribe(id, event);
      } else {
        this.pipeline.unsubscribe(id);
      }

      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        this.pipeline.pipelineSubs[id] = {};
        pipelineSubs = this.pipeline.pipelineSubs[id];
      }
      let subData = { callback: callback };
      pipelineSubs[event] = subData;

      let pipelineEvent = this.pipeline.pipeline[event];
      if (pipelineEvent == null) {
        this.pipeline.pipeline[event] = [];
        pipelineEvent = this.pipeline.pipeline[event];
      }
      pipelineEvent.push(id);
      if (extra.sort != null) {
        subData.sort = extra.sort;
        pipelineEvent.sort((a, b) => {
          return (((this.pipeline.pipelineSubs[a] ?? {})[event] ?? {}).sort ?? 0) - (((this.pipeline.pipelineSubs[b] ?? {})[event] ?? {}).sort ?? 0);
        });
      }
    },
    unsubscribe: (id, event) => {
      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        return;
      }
      let checkEvents;
      if (event != null) {
        checkEvents = [event];
      } else {
        checkEvents = Object.keys(pipelineSubs);
      }
      for (let i = 0; i < checkEvents.length; i++) {
        let check = checkEvents[i];
        let pipelineEvents = this.pipeline.pipeline[check] ?? [];
        let index = pipelineEvents.indexOf(id);
        if (index > -1) {
          pipelineEvents.splice(index, 1);
        }
        if (pipelineEvents.length < 1) {
          delete this.pipeline.pipeline[check];
        }
        delete this.pipeline.pipelineSubs[id][check];
      }
      if (Object.keys(pipelineSubs).length < 1) {
        delete this.pipeline.pipelineSubs[id];
      }
    }
  };

  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.session = this.parent.session;

    let page = frame;

    this.pageHolder.style.setProperty("--themeRGB", "var(--breakoutThemeRGB)");
    this.pageHolder.style.setProperty("--theme", "var(--breakoutTheme)");
    this.pageHolder.style.setProperty("--secondaryRGB", "var(--breakoutSecondaryRGB)");
    this.pageHolder.style.setProperty("--secondary", "var(--breakoutSecondary)");
    this.pageHolder.style.setProperty("--hoverRGB", "var(--breakoutHoverRGB)");
    this.pageHolder.style.setProperty("--hover", "var(--breakoutHover)");
    this.pageHolder.style.setProperty("--lightShadow", "var(--breakoutLightShadow)");
    this.pageHolder.style.setProperty("--darkShadow", "var(--breakoutDarkShadow)");

    let bodyStyle = window.getComputedStyle(body);
    page.style.setProperty("--boardHover", bodyStyle.getPropertyValue("--hover"));
    page.style.setProperty("--boardLightShadow", bodyStyle.getPropertyValue("--lightShadow"));
    page.style.setProperty("--boardDarkShadow", bodyStyle.getPropertyValue("--darkShadow"));

    this.pipeline.subscribe("checkActivePage", "click_start", () => {
      if (this.parent.activePageID != this.pageID) {
        this.parent.activePageID = this.pageID;
        this.parent.pushToPipelines(null, "page_switch", { pageID: this.pageID });
      }
    });
    let updateActivePage = () => {
      this.active = this.parent.activePageID == this.pageID;
      if (this.active == false) {
        this.pageHolder.removeAttribute("active");
      } else {
        this.pageHolder.setAttribute("active", "");
      }
    }
    this.pipeline.subscribe("checkPageSwitch", "page_switch", updateActivePage, { sort: 1 });
    updateActivePage();

    page.addEventListener("pointerdown", (event) => {
      this.pipeline.publish("pointerdown", { event: event });
      if (event.pointerType == "mouse") {
        this.pipeline.publish("click_start", { type: "pointerdown", event: event });
      }
    }, { passive: false });
    page.addEventListener("touchstart", (event) => {
      this.pipeline.publish("touchstart", { event: event });
      this.pipeline.publish("click_start", { type: "touchstart", event: event });
    }, { passive: false });
    page.addEventListener("click", (event) => {
      this.pipeline.publish("click", { event: event });
    }, { passive: false });
    page.addEventListener("mouseleave", (event) => {
      this.pipeline.publish("mouseleave", { event: event });
    });

    // Initialize Breakout:
    if (this.parent.self.access > 3 || this.session == null) { // Open to Overview:
      await this.setFrame("lesson/breakout/overview", page);
    }

    //this.editor = (await this.parent.setFrame("lesson/board", this.pageHolder, { construct: { pageID: this.pageID, pageType: this.pageType, pageHolder: this.pageHolder } })).editor;
  }
}

modules["lesson/breakout/overview"] = class {
  html = `
  <div class="boInterface customScroll">
    <div class="boTopHolder">
      <button class="boTopScroll" left style="left: 7px"></button>
      <button class="boTopScroll" right style="right: 7px"></button>
      <div class="boTop">
        <div class="boTopSection" left>
          <a class="boLogo" href="/app/dashboard" draggable="false"></a>
          <div class="boFileNameHolder border"><div class="boFileName" spellcheck="false" onpaste="clipBoardRead(event)" contenteditable></div></div>
          <button class="boFileDropdown">File</button>
          <button class="boManageDropdown">Manage</button>
        </div>
        <div class="boTopSection" scroll>
          <div class="boTopDivider"></div>
        </div>
        <div class="boTopSection" right>
          <button class="boStart"></button>
          <button class="boPause">Pause</button>
          <button class="boStop">Stop</button>
          <button class="boShare">Share</button>
          <button class="boMemberOptions" dropdowntitle="Member Options" title="Member Options | Configure various member settings."></button>
          <button class="boSharePin"></button>
          <div class="boTopDivider"></div>
          <button class="boAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
          <button class="boLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="boOpenBoard" title="Open Markify Board"><button></button></div>
  </div>
  <div class="boGroupHolder customScroll"></div>`;
  css = {
    ".boInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; overflow-y: scroll; z-index: 2`,
    ".boGroupHolder": `position: relative; width: 100%; height: 100%; overflow-y: scroll; z-index: 1; transition: .5s`,
    ".boCreateBreakoutHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; z-index: 3; pointer-events: none`,

    ".boTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".boTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".boTopHolder[scroll] .boTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".boTop::-webkit-scrollbar": `display: none`,
    ".boTopSection[scroll]": `display: none`,
    ".boTopHolder[scroll] .boTopSection[scroll]": `display: flex !important`,
    ".boTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".boTopScroll svg": `width: 22px`,
    ".boTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".boTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".boTopHolder[scroll] .boTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".boTopSection[left]": `border-bottom-right-radius: 12px`,
    ".boTopSection[right]": `border-bottom-left-radius: 12px`,

    ".boLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".boLogo:hover": `background: var(--hover)`,
    ".boLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".boLogo:hover svg": `transform: scale(.9)`,
    ".boFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".boFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".boFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".boFileName::-webkit-scrollbar": `display: none`,
    ".boFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".boManageDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--hover); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".boTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,

    ".boShare": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".boStart": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--green); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".boPause": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--yellow); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".boStop": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--red); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".boMemberOptions": `display: flex; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".boMemberOptions svg": `width: 32px; height: 32px`,
    ".boSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".boAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".boAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".boLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
  
    ".boOpenBoard": `position: absolute; display: none; width: 50px; height: 50px; left: 0px; bottom: 0px; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--boardLightShadow); border-radius: 0 12px 0 0; pointer-events: all; visibility: visible`,
    ".boOpenBoard button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".boOpenBoard button:hover": `background: var(--boardHover)`,
    ".boOpenBoard button svg": `width: 32px; height: 32px; transition: .2s`,
    ".boOpenBoard button:hover svg": `transform: scale(.9)`,
  };
  js = async (frame) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let topHolder = frame.querySelector(".boTopHolder");
    let top = topHolder.querySelector(".boTop");

    let leftTop = top.querySelector(".boTopSection[left]");
    let icon = leftTop.querySelector(".boLogo");
    let lessonName = leftTop.querySelector(".boFileName");

    let rightTop = top.querySelector(".boTopSection[right]");
    let startButton = rightTop.querySelector(".boStart");
    let pauseButton = rightTop.querySelector(".boPause");
    let stopButton = rightTop.querySelector(".boStop");
    let shareButton = rightTop.querySelector(".boShare");
    let optionsButton = rightTop.querySelector(".boMemberOptions");
    let sharePinButton = rightTop.querySelector(".boSharePin");
    let accountButton = rightTop.querySelector(".boAccount");
    let loginButton = rightTop.querySelector(".boLogin");

    let topScrollLeft = topHolder.querySelector(".boTopScroll[left]");
    let topScrollRight = topHolder.querySelector(".boTopScroll[right]");

    let openBoardHolder = frame.querySelector(".boOpenBoard");
    let openBoard = openBoardHolder.querySelector("button");

    let updateTopBar = (ignoreAttr) => {
      if (ignoreAttr != true) {
        topHolder.removeAttribute("scroll");
      }
      if (top.scrollWidth > top.clientWidth) {
        if (ignoreAttr != true) {
          topHolder.setAttribute("scroll", "");
        }
        if (Math.floor(top.scrollLeft) > 0) {
          topScrollLeft.style.opacity = 1;
          topScrollLeft.style.pointerEvents = "all";
        } else {
          topScrollLeft.style.opacity = 0;
          topScrollLeft.style.pointerEvents = "none";
        }
        if (Math.floor(top.scrollWidth - top.scrollLeft) > Math.floor(top.clientWidth)) {
          topScrollRight.style.opacity = 1;
          topScrollRight.style.pointerEvents = "all";
        } else {
          topScrollRight.style.opacity = 0;
          topScrollRight.style.pointerEvents = "none";
        }
      } else {
        topScrollLeft.style.opacity = 0;
        topScrollLeft.style.pointerEvents = "none";
        topScrollRight.style.opacity = 0;
        topScrollRight.style.pointerEvents = "none";
      }
    }
    topScrollLeft.addEventListener("click", function () {
      top.scrollTo({ left: top.scrollLeft - 200, behavior: "smooth" });
      updateTopBar();
    });
    topScrollRight.addEventListener("click", function () {
      top.scrollTo({ left: top.scrollLeft + 200, behavior: "smooth" });
      updateTopBar();
    });
    this.parent.pipeline.subscribe("topbarResize", "resize", updateTopBar);
    this.parent.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { updateTopBar(true); });
    this.parent.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", updateTopBar);
    updateTopBar();

    top.addEventListener("scroll", (event) => {
      this.parent.pipeline.publish("topbar_scroll", { event: event });
    });

    icon.addEventListener("click", (event) => {
      event.preventDefault();
      setFrame("pages/app/dashboard");
    });
    lessonName.textContent = this.parent.parent.lesson.name ?? "Untitled Lesson";
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
        lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      if (lessonName.textContent == this.parent.parent.lesson.name) {
        lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      let oldName = this.parent.parent.lesson.name;
      this.parent.parent.lesson.name = name;
      lessonName.textContent = name;
      lessonName.title = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.parent.parent.lesson.name = oldName;
        lessonName.textContent = oldName;
        lessonName.title = oldName;
      }
    });
    lessonName.addEventListener("focus", async () => {
      lessonName.parentElement.style.setProperty("--borderWidth", "4px");
      updateTopBar();
    });

    let updateStatus = () => {
      let breakout = this.parent.parent.lesson.breakout ?? {};

      startButton.style.removeProperty("display");
      pauseButton.style.removeProperty("display");
      stopButton.style.removeProperty("display");
      switch (breakout.status ?? "disabled") {
        case "disabled":
          startButton.textContent = "Start";
          startButton.style.display = "unset";
          break;
        case "enabled":
          pauseButton.style.display = "unset";
          break;
        case "paused":
          startButton.textContent = "Resume";
          startButton.style.display = "unset";
          stopButton.style.display = "unset";
      }
    }
    startButton.addEventListener("click", () => {
      
    });
    pauseButton.addEventListener("click", () => {
      
    });
    stopButton.addEventListener("click", () => {
      
    });
    updateStatus();

    shareButton.addEventListener("click", () => {
      dropdownModule.open(shareButton, "dropdowns/lesson/share", { parent: this.parent });
    });
    sharePinButton.addEventListener("click", () => {
      if (modules["dropdowns/lesson/share/pin"] != null) {
        dropdownModule.open(sharePinButton, "dropdowns/lesson/share/pin", { parent: this.parent });
      }
    });
    if (this.parent.parent.lesson.pin != null) {
      sharePinButton.style.display = "unset";
      sharePinButton.textContent = this.parent.parent.lesson.pin;
    }
    optionsButton.addEventListener("click", () => {
      if (modules["dropdowns/lesson/share/options"] != null) {
        dropdownModule.open(optionsButton, "dropdowns/lesson/share/options", { title: "Options", parent: this.parent });
      }
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

    this.parent.pipeline.subscribe("overviewLessonSet", "set", (body) => {
      if (body.hasOwnProperty("breakout") == true) {
        updateStatus();
      }
      if (body.name != null && document.activeElement.closest(".boFileName") != lessonName) {
        lessonName.textContent = this.parent.parent.lesson.name ?? "Untitled Lesson";
        lessonName.title = lessonName.textContent;
      }
      if (this.parent.parent.lesson.pin != null) {
        sharePinButton.textContent = this.parent.parent.lesson.pin;
        sharePinButton.style.display = "unset";
      } else {
        sharePinButton.style.removeProperty("display");
      }
      if (body.hasOwnProperty("tool") == true) {
        //updateSplitScreenButton();
      }
      updateTopBar();
    });

    // Load Images:
    setSVG(topScrollLeft, "../images/editor/top/leftarrow.svg");
    setSVG(topScrollRight, "../images/editor/top/rightarrow.svg");
    setSVG(icon, "../images/breakout.svg");
    setSVG(optionsButton, "../images/editor/share/setting.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });

    //let boardEnabled = false;
    let boardOpen = false;
    let boardVisible = false;
    let updateSplitScreenButton = () => {
      //boardEnabled = this.parent.parent.lesson.tool.includes("board");
      boardOpen = this.parent.parent.pages["board"] != null;
      boardVisible = this.parent.parent.maximized != true || this.parent.parent.activePageID == "board";

      /*let showBoardButton = false;
      if (boardEnabled == true) {
        if (boardOpen == false || boardVisible == false) {
          showBoardButton = true;
        }
      } else {
        showBoardButton = true;
      }*/

      if (boardOpen == false || boardVisible == false) {
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
    this.parent.pipeline.subscribe("pageAdd", "page_add", updateSplitScreenButton);
    this.parent.pipeline.subscribe("pageRemove", "page_remove", updateSplitScreenButton);
    this.parent.pipeline.subscribe("pageSwitch", "page_switch", updateSplitScreenButton);
    this.parent.pipeline.subscribe("pageMaximize", "maximize", updateSplitScreenButton);
    updateSplitScreenButton();

    if (this.session == null || this.lesson.tool.includes("breakout") == false) { // Create New Lesson
      frame.insertAdjacentHTML("beforeend", `<div class="boCreateBreakoutHolder"></div>`);
      await modalModule.open("modals/lesson/newbreakout", frame.querySelector(".boCreateBreakoutHolder"), null, "Start Breakout", null, { parent: this });
    }
  }
}

modules["lesson/breakout/group"] = class {
  html = ``;
  css = {};
  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";
  }
}