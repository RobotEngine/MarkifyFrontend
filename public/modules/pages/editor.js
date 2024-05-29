modules["pages/editor"] = {
  title: "Editor",
  preJs: function () {
    if ((getParam("lesson") || "").length < 1) {
      setFrame("pages/dashboard", app, { override: true });
      return false;
    }
  },
  html: `<div class="eMain">
    <div class="eTopHolder">
      <button class="eTopScroll eTopScrollLeft" style="left: 8px"><img src="./images/editor/top/leftarrow.svg"></button>
      <button class="eTopScroll eTopScrollRight" style="right: 8px"><img src="./images/editor/top/rightarrow.svg"></button>
      <div class="eTop" noscrollclose>
        <div class="eTopSection">
          <a class="eLogo" href="#dashboard"><img src="./images/logo.svg"></a>
          <div class="eFileName border" contenteditable spellcheck="false" onpaste="clipBoardRead(event)"></div>
          <button class="eFileDropdown" dropdown="dropdowns/editor/file">File</button>
        </div>
        <div class="eTopSection">
          <button class="eSaveProgress eUndo" disabled style="margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px"><img draggable="false" src="./images/tooltips/progress/undo.svg"></button>
          <button class="eSaveProgress eRedo" disabled style="margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0"><img draggable="false" src="./images/tooltips/progress/redo.svg"></button>
          <img class="eConnection" src="./images/editor/top/connection.svg" style="object-position: -60px -4px" disabled>
          <div class="eStatus"></div>
        </div>
        <div class="eTopSection eTopMargin">
          <button class="eMembers" dropdown="dropdowns/editor/members" disabled><span class="eMemberHandCount" title="Number of hands raised."></span><span class="eMemberIdleCount" title="Number of idle members."></span><span class="eMemberCount" title="Number of members."></span>Members</button>
          <button class="eEndSession" title="End Session | Disable all editing access making everyone a viewer." disabled><img src="./images/editor/share/endeditors.svg"</button>
          <button class="eShare" dropdown="dropdowns/editor/share" disabled>Share</button>
          <button class="eSharePin"></button>
        </div>
        <div class="eTopSection">
          <button class="eZoom" dropdown="dropdowns/editor/zoom"><span class="eZoomBox">100</span>%</button>
          <button class="eAccount" dropdown="dropdowns/account"><img src="./images/profiles/default.svg" accountimage><div accountuser></div></button>
          <button class="eLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="eSide">
      <div class="eToolbar"></div>
      <div class="eViewerActions">
        <button hidden class="eHandRaise largeButton" tool><img src="./images/editor/actions/raisehand.svg"></button>
      </div>
    </div>
    <div class="eBottomHolder">
      <div class="eObserveHolder">
        <div class="eObserve">
          <div>Observing <b></b></div>
          <button><img src="./images/tooltips/exit.svg"></button>
        </div>
      </div>
      <div class="eBottom">
        <button class="ePageNav" down><img src="./images/editor/bottom/downarrow.svg"></button>
        <div class="eCurrentPage border" contenteditable></div>
        <button class="ePageNav" up><img src="./images/editor/bottom/uparrow.svg"></button>
      </div>
    </div>
    <div class="eContent">
      <div class="eRealtime"></div>
      <div class="eContentHolder">
        <div class="ePageHolder"></div>
      </div>
      <div class="eAddPagesHolder">
        <button class="eAddPagesButton largeButton" dropdown="dropdowns/new/lesson">Add Pages</button>
      </div>
    </div>
    <div class="eObserveBorder"></div>
  </div>
  `,
  /*
    <div class="ePage">
      <div class="ePageContent" style="width: 816px; height: 1059px"></div>
    </div>
    <div class="ePage">
      <div class="ePageContent" style="width: 816px; height: 1059px"></div>
    </div>
    <div class="ePage">
      <div class="ePageContent" style="width: 816px; height: 1059px"></div>
    </div>
  */
  css: {
    ".eMain": `position: relative; pointer-events: none`,

    ".eTopHolder": `position: fixed; width: 100%; z-index: 500`,
    ".eTop": `display: flex; box-sizing: border-box; gap: 8px; width: 100%; padding: 8px; overflow-x: auto; scrollbar-width: none`,
    ".eTop::-webkit-scrollbar": `display: none`,
    ".eTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(180, 218, 253, .75); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".eTopScroll img": `width: 22px`,
    ".eTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; border-radius: 16px`,
    ".eTopMargin": `margin-left: auto`,

    ".eLogo": `height: 100%; padding: 0; user-select: none`,
    ".eLogo img": `height: 100%`,
    ".eFileName": `padding: 3px; margin: 0 4px; outline: unset; --borderRadius: 4px; --borderColor: var(--secondary); font-size: 20px; white-space: nowrap; --transition: .05s`,
    ".eFileName:focus": `--borderWidth: 4px`,
    ".eFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".eSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".eSaveProgress img": `width: 24px`,
    ".eConnection": `width: 30px; height: 30px; margin: 0 4px; object-fit: cover; transition: .3s`,
    ".eStatus": `color: var(--secondary); font-size: 16px; font-weight: 500`,

    ".eMembers": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".eMemberCount": `display: none; padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--theme); font-weight: 700`,
    ".eMemberHandCount": `display: none; padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--green); font-weight: 700`,
    ".eMemberIdleCount": `display: none; padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--yellow); font-weight: 700`,
    ".eEndSession": `display: none; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--error); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".eEndSession img": `width: 28px; height: 28px`,
    ".eShare": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".eSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".eZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eAccount": `height: 32px; padding: 0; width: 31px; height: 31px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".eAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".eLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,

    ".eSide": `position: fixed; display: flex; gap: 8px; height: calc(100% - 132px); top: 58px; padding: 8px; z-index: 500`,
    ".eToolbar": `position: relative; display: flex; box-sizing: border-box; margin: auto 0; align-items: center; pointer-events: all`,
    ".eViewerActions": `position: absolute; display: flex; height: calc(100% - 16px); left: 8px; top: 8px`,
    ".eHandRaise": `position: relative; display: flex; box-sizing: border-box; width: 60px; height: 60px; margin: auto 4px; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; --borderRadius: 30px`,
    ".eHandRaise img": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: 30px`,
    ".eHandRaise[selected]": `background: var(--theme)`,

    ".eBottomHolder": `position: fixed; box-sizing: border-box; display: flex; width: 100%; bottom: 0px; gap: 8px; padding: 8px; justify-content: flex-end; z-index: 500`,
    ".eBottom": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; pointer-events: all`,
    ".ePageNav": `display: flex; width: 31px; height: 31px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".eCurrentPage": `margin: 0 6px; font-size: 20px; outline: unset`,
    ".eCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 19px`,
    ".eObserveHolder": `position: relative; display: none; flex: 1; height: 50px`,
    ".eObserve": `position: absolute; display: flex; box-sizing: border-box; max-width: 100%; height: 50px; padding: 6px; align-items: center; background: var(--purple); box-shadow: var(--lightShadow); border-radius: 16px; overflow: hidden; pointer-events: all`,
    ".eObserve div": `margin: 0 6px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eObserve button": `width: 38px; height: 38px; flex-shrink: 0`,
    ".eObserve button img": `width: 100%; height: 100%`,
    ".eObserveBorder": `position: fixed; box-sizing: border-box; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 501`,

    ".eContent": `position: relative; display: flex; flex-direction: column; width: fit-content; min-width: calc(100% - 132px); min-height: calc(100vh - 132px); padding: 66px; align-items: center; z-index: 0; overflow: hidden; pointer-events: all; background-image: url(./images/editor/background.svg); background-position: center`,
    ".ePageHolder": `position: relative; width: fit-content; height: fit-content; border-radius: 16px; transform-origin: 0 0; z-index: 1`,
    ".ePage": `position: relative; background: var(--pageColor); transition: .5s`,
    ".ePage::after": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: -1; content: ""; box-shadow: 0px 0px 8px 0px var(--shadowColor); border-radius: inherit`,
    ".ePage:first-child": `border-top-left-radius: 16px; border-top-right-radius: 16px`,
    ".ePage:not(:first-child)": `border-top: dashed var(--darkGray) 4px; border-image: url("./images/editor/border.svg") 10 / 1 / 0 space`,
    ".ePage:last-child": `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px`,
    ".ePage[hide] > *:not(.ePageHidden)": `transition: unset !important`, //filter: blur(4px) visibility: hidden
    ".ePageHidden": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); justify-content: center; align-items: center; z-index: 1001`,
    ".ePageHiddenModal": `display: flex; flex-direction: column; max-width: calc(100% - 32px); max-height: calc(100% - 32px); padding: 8px; overflow: auto; background: var(--pageColor); box-shadow: 0px 0px 16px 0px var(--hover); border-radius: 16px; align-items: center`,
    ".ePageHiddenModal img": `padding: 12px; width: calc(100% - 24px); max-width: 80px`,
    ".ePageHiddenModalTitle": `font-size: 28px; font-weight: 700; color: var(--theme)`,
    ".ePageHiddenModalDesc": `margin: 8px 0; max-width: 450px`,
    ".ePageRevealButton": `display: flex; margin: 8px; z-index: 1; background: var(--theme); --borderRadius: 20.25px; color: #fff`,
    ".ePageContent": "width: 100%; height: 100%; background: var(--pageColor); opacity: 0; border-radius: inherit",
    ".ePageTextHolder": "--scale-factor: 4/3; position: absolute; left: 0; top: 0; font-family: sans-serif",
    ".ePageTextHolder span": "position: absolute; color: transparent; pointer-events: all",
    ".ePageTextHolder br": `user-select: none`,
    ".ePageAnnotationHolder": `--scale-factor: 4/3; position: absolute; left: 0; top: 0; font-family: sans-serif`,
    ".ePageAnnotations": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 1; pointer-events: none`,
    ".content[enabled] .ePageAnnotations": `pointer-events: all`,
    ".eAddPagesHolder": `display: none; width: 100% justify-content: center; padding-top: 20px`,
    ".eAddPagesButton": `display: flex; margin: 8px 0; z-index: 1; background: var(--theme); --borderRadius: 20.25px; color: #fff; pointer-events: all`,
    ".ePageRearrange": `position: absolute; display: flex; width: 28px; height: 28px; padding: 4px; right: 8px; bottom: 8px; pointer-events: all; z-index: 2; background: rgba(180, 218, 253, 0.75); backdrop-filter: blur(2px); border-radius: 18px; overflow: hidden`, //transform: scale(var(--fixedUIScale));
    ".ePageRearrange div": `margin-left: 6px`,
    
    ".eAnnotation": `position: absolute`,
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
    ".eAnnotation[sticky] div[signature]": `margin-left: auto; opacity: .5; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; taxt-align: right`,
    ".eAnnotation[sticky] div[reactions]": `display: flex; flex-wrap: wrap; flex: 1; gap: 6px; background: var(--themeColor); pointer-events: all; z-index: 999; background: none`,
    ".eReaction": `display: flex; padding: 2px; background: rgba(255, 255, 255, .8); border: solid 2px rgba(0, 0, 0, 0); border-radius: 8px; align-items: center; overflow: hidden; color: var(--darkGray)`,
    ".eReaction[selected]": `padding: 2px; background: rgba(180, 218, 253, .8); border: solid 2px var(--theme); color: var(--theme)`,
    ".eReaction[dropdown]": `opacity: 0; border-radius: 14px`,
    ".eContent[viewer] .eReaction[dropdown]": "display: none !important",
    ".eReaction div[imgholder]": `display: flex; width: 20px; height: 20px; justify-content: center; align-items: center`,
    ".eReaction img": `width: 32px; height: 32px; transform: scale(0.65); border-radius: 7px; filter: drop-shadow(0px 0px 8px var(--pageColor))`,
    ".eReaction div[count]": `margin: 0 5px 0 6px; font-size: 16px; font-weight: 700`,
    ".eAnnotation[sticky]:hover .eReaction[dropdown]": `opacity: 1`,
    ".eAnnotation[sticky][selected] .eReaction[dropdown]": `opacity: 1`,
    ".eAnnotation[sticky][selected] button": `pointer-events: all`,
    ".eAnnotation[src]": `object-fit: cover; pointer-events: all; border-radius: 12px`,

    ".eRealtime": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 100; overflow: hidden; pointer-events: none`
  },
  loadedPDFs: [], // Keep track of loaded PDFs for releasing memory
  js: async function (page, joinData) {
    this.page = page;
    this.annotations = {};
    this.reactions = {};
    this.addMargin = 100;
    this.preferences = {
      tools: {
        select: {
          subtool: "select"
        },
        markup: {
          subtool: "highlighter",
          color: {
            selected: "FFC24A",
            options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
          },
          thickness: 16,
          opacity: 50
        },
        text: {
          color: {
            selected: "0084FF",
            options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
          },
          opacity: 100,
          size: 18,
          align: "center"
        },
        draw: {
          subtool: "pen",
          color: {
            selected: "DF84FF",
            options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
          },
          thickness: 4,
          opacity: 100
        },
        shape: {
          subtool: "square",
          color: {
            selected: "FF4C6C",
            options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
          },
          thickness: 8,
          opacity: 100
        },
        sticky: {
          color: {
            selected: "FADCA0",
            options: ["88B4FA", "F49CA9", "FADCA0", "E4B8FB", "A1D8AF", "F285B8", "666666"]
          },
          size: 16,
          align: "center"
        },
        media: {

        },
        options: {
          colorpicker: {
            scale: 0
          }
        }
      }
    };
    this.defaultEmojis = [
      "THUMBS UP SIGN",
      "THUMBS DOWN SIGN",
      "PARTY POPPER",
      "ELECTRIC LIGHT BULB",
      "WHITE HEAVY CHECK MARK",
      "NO ENTRY",
      "PUBLIC ADDRESS LOUDSPEAKER",
      "KEYCAP 1",
      "KEYCAP 2",
      "KEYCAP 3",
      "KEYCAP 4",
      "KEYCAP 5",
      "BLACK QUESTION MARK ORNAMENT",
      "HUNDRED POINTS SYMBOL"
    ];
    this.recentEmojis = [];
    this.options = {
      cursors: true,
      cursornames: true,
      stylusmode: false,
      comments: true,
      fullscreen: false
    };
    let localOptions = getLocalStore("options");
    if (localOptions != null) {
      this.localOptions = JSON.parse(getLocalStore("options"));
      let localOptionKeys = Object.keys(this.localOptions);
      for (let i = 0; i < localOptionKeys.length; i++) {
        let option = localOptionKeys[i];
        this.options[option] = this.localOptions[option];
      }
    }
    this.realtime = {
      strength: 0,
      tool: 0 // 0: Pointer; 1: Markup; 2: Pen; 3: Erase
    };
    this.events = {};
    this.members = {};
    this.selecting = {};
    this.realtimeSelect = {};
    this.memberCount = 0;
    this.active = document.visibilityState == "visible";
    this.syncMembers = async (memberUpd) => {
      this.editorCount = 0;
      this.handCount = 0;
      this.idleCount = 0;
      for (let i = 0; i < memberUpd.length; i++) {
        let memSet = memberUpd[i];
        this.members[memSet._id] = memSet;
        if (memSet.access == 1) {
          this.editorCount++;
        }
        if (memSet.hand != null) {
          this.handCount++;
        }
        if (memSet.active == false) {
          this.idleCount++;
        }
      }
      this.checkEditorCount();
    };
    this.getSelf = () => {
      return this.members[this.sessionID] || {};
    };
    let lastAccess;

    let utils = await getModule("pages/editor/annotation");

    // EDITOR
    let contentHolder = page.querySelector(".eContent");
    let content = contentHolder.querySelector(".eContentHolder");
    let pageHolder = content.querySelector(".ePageHolder");
    let bottomHolder = page.querySelector(".eBottom");

    let saveStatus = page.querySelector(".eStatus");
    let realtimeHolder = page.querySelector(".eRealtime");
    let observeHolder = page.querySelector(".eObserveHolder");
    let observeTag = observeHolder.querySelector(".eObserve");
    let observeBorder = page.querySelector(".eObserveBorder");

    let eTop = page.querySelector(".eTop");
    let eTopScrollLeft = page.querySelector(".eTopScrollLeft");
    let eTopScrollRight = page.querySelector(".eTopScrollRight");

    let addPagesHolder = contentHolder.querySelector(".eAddPagesHolder");

    let raiseHand = page.querySelector(".eHandRaise");

    this.updateInterface = async (keepDropdowns) => {
      let toolbar = page.querySelector(".eToolbar");
      let name = page.querySelector(".eFileName");
      let share = page.querySelector(".eShare");
      let access = this.getSelf().access;
      if (access != lastAccess) {
        lastAccess = access;
        if (this.toolbar != null) {
          if (access == 0) {
            this.toolbar.lastActiveToolbarModule = this.toolbar.currentToolModule;
            this.toolbar.currentToolModule = "pages/editor/toolbar/cursor";
          } else if (this.toolbar.lastActiveToolbarModule != null) {
            this.toolbar.currentToolModule = this.toolbar.lastActiveToolbarModule;
          }
          this.toolbar.updateToolbar();
        }
      }
      if (access == 0) {
        contentHolder.setAttribute("viewer", "");
        toolbar.setAttribute("hidden", "");
        toolbar.offsetHeight;
        toolbar.style.transition = ".3s";
        if (addPagesHolder != null) {
          addPagesHolder.setAttribute("hidden", "");
        }

        raiseHand.removeAttribute("hidden");
        raiseHand.removeAttribute("selected");
        raiseHand.title = "Raise Hand | Ask to contribute to the lesson.";

        name.removeAttribute("contenteditable");
      } else {
        contentHolder.removeAttribute("viewer");
        toolbar.removeAttribute("hidden");
        if (addPagesHolder != null) {
          addPagesHolder.removeAttribute("hidden");
        }

        raiseHand.setAttribute("hidden", "");

        if (access > 3) {
          name.setAttribute("contenteditable", "");
        }
      }
      /*
      if (this.realtime.observing != null) {
        toolbar.setAttribute("hidden", "");
        toolbar.offsetHeight;
        toolbar.style.transition = ".3s";
      }
      */
      if (this.realtime.observing != null) {
        toolbar.setAttribute("disabled", "");
      } else {
        toolbar.removeAttribute("disabled");
      }
      if (access < 2) {
        share.style.display = "none";
      } else {
        share.style.display = "flex";
      }
      if (keepDropdowns != true) {
        (await getModule("dropdown")).close();
      }
      if (utils.updateHistory != null) {
        utils.updateHistory();
      }
    };
    this.hexToRGB = (hex, alpha) => {
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;
      if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    }
    this.darkenHex = (hexCode, percent) => {
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
    }
    let lastSavePref = JSON.parse(JSON.stringify(this.preferences));
    let saveTimeout;
    this.savePreferences = () => {
      if (userID == null) {
        return; // Can't save if not a user!
      }
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(async () => {
        let tempRevert = JSON.parse(JSON.stringify(lastSavePref));
        let changes = objectUpdate(this.preferences, lastSavePref);
        if (Object.keys(changes).length > 0) {
          let [code] = await sendRequest("POST", "lessons/save/preferences", { save: changes });
          if (code != 200) {
            lastSavePref = tempRevert;
          }
        }
      }, 1000); // Save after 1 second of no changes
    }

    // PRELOAD ASSETS
    loadScript("./libraries/pdfjs/pdf.mjs");
    loadScript("./modules/editor/realtime.js");

    page.style.removeProperty("display");
    page.style.width = "fit-content";
    page.style.minWidth = "100%";

    if (getParam("export_browser") == "true") {
      this.exporting = true;
      page.style.transition = "unset";
      page.style.opacity = 1;
      addCSS({ ".loading": `display: none` });
      loadScript("./modules/editor/export.js");
    }

    function enableScrollTop() {
      if (eTop.scrollWidth > eTop.clientWidth - 1) {
        if (eTop.scrollLeft > 0) {
          eTopScrollLeft.style.opacity = 1;
          eTopScrollLeft.style.pointerEvents = "all";
        } else {
          eTopScrollLeft.style.opacity = 0;
          eTopScrollLeft.style.pointerEvents = "none";
        }
        if (eTop.scrollWidth - eTop.scrollLeft - 1 > eTop.clientWidth) {
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
      enableScrollTop();
    });
    eTopScrollRight.addEventListener("click", function () {
      eTop.scrollTo({ left: eTop.scrollLeft + 200, behavior: "smooth" });
      enableScrollTop();
    });
    tempListen(window, "resize", enableScrollTop);
    eTop.addEventListener("scroll", enableScrollTop);

    if (connected) {
      this.realtime.strength = 1;
    }
    this.updateSaveStatus = (status) => {
      saveStatus.textContent = status;
      saveStatus.style.margin = "0 4px";
      enableScrollTop();
    }
    tempListen(window, "beforeunload", (event) => {
      let saved = true;
      let annoKeys = Object.keys(this.annotations);
      for (let i = 0; i < annoKeys.length; i++) {
        let anno = this.annotations[annoKeys[i]];
        if (anno.save == true) {
          saved = false;
        }
      }
      if (saved == false) {
        event.preventDefault();
        event.returnValue = "";
      }
    });
    closeCallback = () => {
      this.realtime.strength = 1;
      if (this.realtime.module) {
        this.realtime.module.connectUpdate();
      }
      this.updateSaveStatus("Reconnecting...");
    }

    setFrame("editor/toolbar", page.querySelector(".eToolbar"));

    let loginButton = page.querySelector(".eLogin");
    if (userID) {
      page.querySelector(".eAccount div").textContent = account.user;
      if (account.image) {
        page.querySelector(".eAccount img").src = account.image;
      }
    } else {
      page.querySelector(".eAccount").remove();
      loginButton.style.display = "block";
      loginButton.addEventListener("click", () => { promptLogin(); });
    }

    let lessonID = getParam("lesson") || "";
    delete socket.remotes["lesson_" + this.id];
    this.id = lessonID;

    this.codeTextButton = page.querySelector(".eSharePin");

    this.handCount = 0;
    this.idleCount = 0;

    this.updateMemberCount = () => {
      let counts = document.querySelectorAll(".eMemberCount");
      let handCounts = document.querySelectorAll(".eMemberHandCount");
      let idleCounts = document.querySelectorAll(".eMemberIdleCount");
      this.memberCount = Object.keys(this.members).length;
      for (let i = 0; i < counts.length; i++) {
        let count = counts[i];
        count.textContent = this.memberCount;
        if (this.memberCount > 1) {
          count.style.display = "unset";
          count.parentElement.style.padding = "4px 10px 4px 4px";
        } else {
          count.style.display = "none";
          count.parentElement.style.padding = "6px 10px";
        }
      }
      for (let i = 0; i < handCounts.length; i++) {
        let count = handCounts[i];
        count.textContent = this.handCount;
        if (this.handCount > 0) {
          count.style.display = "unset";
          count.parentElement.style.padding = "4px 10px 4px 4px";
        } else {
          count.style.display = "none";
        }
      }
      for (let i = 0; i < idleCounts.length; i++) {
        let count = idleCounts[i];
        count.textContent = this.idleCount;
        if (this.idleCount > 0 && this.memberCount > 1) {
          count.style.display = "unset";
          count.parentElement.style.padding = "4px 10px 4px 4px";
        } else {
          count.style.display = "none";
        }
      }
    }

    this.members = {};

    let removeRealtimeElem = (userid) => {
      if (this.realtime != null && this.realtime.module.removeRealtime != null) {
        this.realtime.module.removeRealtime(userid);
      }
    }

    socket.remotes["member"] = (data) => {
      if (data.lesson != null && data.lesson != lessonID) {
        return;
      }
      switch (data.task) {
        case "kick":
          if (userID == null || data.filled == true) {
            if (data.filled != true) {
              modifyParams("lesson");
              modifyParams("page");
              modifyParams("pin");
            }
            setFrame("pages/join");
          } else {
            setFrame("pages/dashboard");
          }
          break;
        case "preference":
          switch (data.type) {
            case "emoji":
              this.recentEmojis = data.data || [];
              for (let i = 0; (i < this.defaultEmojis.length && this.recentEmojis.length < 21); i++) {
                if (this.recentEmojis.includes(this.defaultEmojis[i]) == false) {
                  this.recentEmojis.push(this.defaultEmojis[i]);
                }
              }
              break;
            default:
              objectUpdate(data.data, this.preferences);
          }
      }
    };

    let pages = {};
    let sources = {};

    let exportSync;

    this.editorCount = 0;
    let removeAllEditors = page.querySelector(".eEndSession");
    this.checkEditorCount = () => {
      if (this.getSelf().access > 3 && this.editorCount > 0) {
        removeAllEditors.style.display = "flex";
      } else {
        removeAllEditors.style.display = "none";
      }
    }

    let alertModule = await getModule("alert");
    let dropdownModule = await getModule("dropdown");
    socket.remotes["lesson_" + lessonID] = async (data) => {
      let body = data.data;
      /*
      if (body.lesson != lessonID) {
        return;
      }
      */
      switch (data.task) {
        case "join":
          this.members[body._id] = body;
          if (body.access == 1) {
            this.editorCount++;
          }
          if (body.hand != null) {
            this.handCount++;
          }
          if (body.active == false) {
            this.idleCount++;
          }
          this.checkEditorCount();
          this.updateMemberCount();
          if (body.method == "shared" && this.emailInvite != null) {
            this.emailInvite("join", { _id: body.user, email: body.email, user: body.name, image: body.image });
          }
          break;
        case "leave":
          if (this.members[body._id]) {
            if (this.members[body._id].access == 1) {
              this.editorCount--;
            }
            if (this.members[body._id].hand != null) {
              this.handCount--;
            }
            if (this.members[body._id].active == false) {
              this.idleCount--;
            }
            this.checkEditorCount();
            delete this.members[body._id];
          }
          removeRealtimeElem(body._id);
          this.updateMemberCount();
          /*
          if (body._id == this.sessionID && currentPage == "editor") { // Self
            setFrame("pages/join");
          }
          */
          break;
        case "update":
          if (this.members[body._id]) {
            let memberKeys = Object.keys(body);
            let member = this.members[body._id];
            if (body.access != null && member.access != body.access) { // Must update their access:
              if (body.access == 1) {
                this.editorCount++;
                if (member.hand != null) {
                  this.handCount--;
                  this.updateMemberCount();
                }
              } else if (body.access == 0) {
                this.editorCount--;
                if (this.lesson.settings.observeViewers == false) {
                  if (this.realtime.observing == member._id) {
                    if (this.getSelf().access < 4) {
                      this.realtime.module.exitObserve();
                      (await getModule("alert")).open("warning", "<b>Observing Ended</b>The member your observing is no longer an editor.");
                    }
                  }
                }
              }
              removeRealtimeElem(body._id);
            }
            if (body.hasOwnProperty("hand")) {
              if (body.hand != null) {
                this.handCount++;
              } else {
                this.handCount--;
              }
            }
            if (body.hasOwnProperty("active")) {
              if (body.active == false) {
                this.idleCount++;
              } else {
                this.idleCount--;
              }
            }
            this.updateMemberCount();
            for (let i = 0; i < memberKeys.length; i++) {
              let key = memberKeys[i];
              member[key] = body[key];
            }
            if (member.access > 0 && member.hand != null) { // Alert editor
              member.hand = null;
            }
            this.checkEditorCount();
            if (member._id == this.sessionID) { // Self
              if (body.access != null) {
                if (body.access > 0) { // Alert editor
                  this.realtime.module.exitObserve(); // Exit observe mode
                  alertModule.open("info", "<b>You're Now an Editor</b>You've been granted editing access to markup the lesson!");
                }
                this.updateInterface();
              }
              if (member.hand == null) {
                raiseHand.removeAttribute("selected");
                raiseHand.title = "Raise Hand | Ask to contribute to the lesson.";
              } else {
                raiseHand.setAttribute("selected", "");
                raiseHand.title = "Hand Raised | Asking to contribute to the lesson.";
              }
            }
            if (body.observe != null && this.realtime.module != null) {
              if (body.observe == this.sessionID) { // Being observed:
                this.realtime.observed = true;
                this.realtime.module.publishShort(null, "observe", true);
              }
            }

            // Remove elements if weak:
            if (body.weak == true) {
              removeRealtimeElem(body._id);
              if (this.realtime.observing == body._id) {
                this.realtime.module.exitObserve();
                (await getModule("alert")).open("warning", "<b>Observing Ended</b>The member you where observing has too weak a connection, try again later...");
              }
            }
            if (body.observe != null && this.realtime.observing == body._id) {
              this.realtime.module.exitObserve();
              (await getModule("alert")).open("warning", "<b>Observing Ended</b>The member your observing started watching someone.");
            }

            // Update observe:
            if (this.realtime.observing == body._id && this.realtime.module != null) {
              observeTag.style.background = member.color;
              observeTag.style.color = this.realtime.module.textColorBackground(member.color);
              observeTag.querySelector("b").textContent = member.name;
              observeHolder.style.display = "flex";
              observeBorder.style.border = "solid 3px " + member.color;
            }

            // Update cursor by removing it:
            if (body.name != null || body.color != null) {
              let cursor = realtimeHolder.querySelector('.eCursor[member="' + body._id + '"]');
              if (cursor != null) {
                cursor.remove();
              }
            }

            // Update collaborators:
            let collaborator = this.collaborators[member.user];
            if (collaborator != null) {
              if (body.name != null) {
                collaborator.user = body.name;
              }
              if (body.email != null) {
                collaborator.email = body.email;
              }
              if (body.hasOwnProperty("image") == true) {
                collaborator.image = body.image;
              }
            }
          }
          break;
        case "set":
          objectUpdate(body, this.lesson);
          let setName = this.lesson.name || "Untitled Lesson";
          page.querySelector(".eFileName").textContent = setName;
          document.title = setName + " | Markify";
          if (body.hasOwnProperty("pin")) {
            if (this.updatePin) {
              this.updatePin();
            }
            if (body.pin != null) {
              this.codeTextButton.textContent = body.pin;
              this.codeTextButton.style.display = "unset";
            } else {
              this.codeTextButton.style.display = "none";
            }
          }
          if (this.updateOptions != null) {
            this.updateOptions();
          }
          if (body.settings != null) {
            let access = this.getSelf().access;
            if (body.settings.hasOwnProperty("allowExport") || body.settings.hasOwnProperty("observeViewers")) {
              if (access < 4) {
                dropdownModule.close();
                if (body.settings.observeViewers == false) {
                  this.realtime.module.exitObserve();
                }
              }
            }
            if (body.settings.forceLogin == false && access < 2) {
              setFrame("pages/join");
            }
          }
          /*
          if (body.settings && body.settings.hasOwnProperty("forceLogin")) {
            let actionButton = fixed.querySelector(".eShareActionPin, .eShareActionLink");
            if (actionButton != null) {
              if (body.settings.forceLogin == true) {
                actionButton.setAttribute("on", "");
                actionButton.removeAttribute("off");
              } else {
                actionButton.setAttribute("off", "");
                actionButton.removeAttribute("on");
              }
            }
          }
          */
          enableScrollTop();
          break;
        case "addpages":
          pages = { ...pages, ...getObject(body.pages || [], "_id") };
          sources = { ...sources, ...getObject(body.sources || [], "_id") };
          await this.addSources(data.data.sources || []);
          await this.addPages(data.data.pages || []);
          await this.updatePages();
          await this.setZoom();
          await utils.resetAnnotationSize();
          break;
        case "invite":
          if (this.emailInvite != null) {
            this.emailInvite(data.subTask, body);
          }
          break;
        case "removeannotations":
          let annoKeys = Object.keys(this.annotations);
          for (let i = 0; i < annoKeys.length; i++) {
            let anno = this.annotations[annoKeys[i]];
            let render = anno.revert || anno.render || {};
            if (data.data.page != null && render.page != data.data.page) {
              continue;
            }
            if (render.sync < data.data.sync) {
              anno.render.remove = true;
              await utils.render(anno.render, null, true);
            }
          }
          break;
        case "removepage":
          let pageremove = pageHolder.querySelector('.ePage[pageid="' + data.data.page + '"]');
          if (pageremove != null) {
            let order = pages[data.data.page].order;
            delete pages[data.data.page];
            pageremove.remove();
            for (let i = 0; i < pageHolder.children.length; i++) {
              let page = pageHolder.children[i];
              if (parseInt(page.getAttribute("order")) > order) {
                page.setAttribute("order", parseInt(page.getAttribute("order")) - 1);
                pages[page.getAttribute("pageid")].order -= 1;
              }
            }
            let annoKeys = Object.keys(this.annotations);
            for (let i = 0; i < annoKeys.length; i++) {
              let anno = this.annotations[annoKeys[i]];
              if ((anno.render || anno.revert || {}).page == data.data.page) {
                delete this.annotations[annoKeys[i]];
              }
            }
            this.updatePages();
            await this.setZoom();
            await utils.resetAnnotationSize();
          }
          break;
        case "pageswap":
          let pageone = pageHolder.querySelector('.ePage[pageid="' + data.data.pageone + '"]');
          let pagetwo = pageHolder.querySelector('.ePage[pageid="' + data.data.pagetwo + '"]');
          let pageoneOrder = pages[data.data.pageone].order;
          let pagetwoOrder = pages[data.data.pagetwo].order;
          pages[data.data.pageone].order = pagetwoOrder;
          pages[data.data.pagetwo].order = pageoneOrder;
          if (pageoneOrder < pagetwoOrder) {
            let pagetwoNextChild = pagetwo.nextElementSibling;
            pageHolder.insertBefore(pagetwo, pageone);
            if (pagetwoNextChild != null) {
              pageHolder.insertBefore(pageone, pagetwoNextChild);
            } else {
              pageHolder.appendChild(pageone); // Add to end
            }
          } else if (pageoneOrder > pagetwoOrder) {
            let pageoneNextChild = pageone.nextElementSibling;
            pageHolder.insertBefore(pageone, pagetwo);
            if (pageoneNextChild != null) {
              pageHolder.insertBefore(pagetwo, pageoneNextChild);
            } else {
              pageHolder.appendChild(pagetwo); // Add to end
            }
          }
          pageone.setAttribute("order", pagetwoOrder);
          pagetwo.setAttribute("order", pageoneOrder);
          this.updatePages();
          break;
        case "pagetop":
          let pagetop = pageHolder.querySelector('.ePage[pageid="' + data.data.page + '"]');
          if (pagetop != null) {
            let order = pages[data.data.page].order;
            for (let i = 0; i < pageHolder.children.length; i++) {
              let page = pageHolder.children[i];
              if (parseInt(page.getAttribute("order")) < order) {
                page.setAttribute("order", parseInt(page.getAttribute("order")) + 1);
                pages[page.getAttribute("pageid")].order += 1;
              }
            }
            pageHolder.insertBefore(pagetop, pageHolder.firstElementChild);
            pagetop.setAttribute("order", 1);
            pages[data.data.page].order = 1;
            this.updatePages();
          }
          break;
        case "pagebottom":
          let pagebottom = pageHolder.querySelector('.ePage[pageid="' + data.data.page + '"]');
          if (pagebottom != null) {
            let order = pages[data.data.page].order;
            for (let i = 0; i < pageHolder.children.length; i++) {
              let page = pageHolder.children[i];
              if (parseInt(page.getAttribute("order")) > order) {
                page.setAttribute("order", parseInt(page.getAttribute("order")) - 1);
                pages[page.getAttribute("pageid")].order -= 1;
              }
            }
            pageHolder.appendChild(pagebottom);
            let newOrder = Object.keys(pages).length;
            pagebottom.setAttribute("order", newOrder);
            pages[data.data.page].order = newOrder;
            this.updatePages();
          }
          break;
        case "pagevisibility":
          let openDropdown = fixed.querySelector('.eRearrangeAction[option="hideshowpage"]');
          if (data.data.page != null) {
            let pagehideshow = pageHolder.querySelector('.ePage[pageid="' + data.data.page + '"]');
            if (pagehideshow != null) {
              if (data.data.hidden == true) {
                pagehideshow.setAttribute("hide", "");
              } else {
                pagehideshow.removeAttribute("hide");
              }
              if (openDropdown != null && openDropdown.getAttribute("pageid") == data.data.page) {
                dropdownModule.close();
              }
            }
          } else {
            let pageshideshow = pageHolder.querySelectorAll(".ePage");
            for (let i = 0; i < pageshideshow.length; i++) {
              if (data.data.hidden == true) {
                pageshideshow[i].setAttribute("hide", "");
              } else {
                pageshideshow[i].removeAttribute("hide");
              }
              if (openDropdown != null && openDropdown.getAttribute("pageid") == pageshideshow[i].getAttribute("pageid")) {
                dropdownModule.close();
              }
            }
          }
          this.updatePages();
          break;
        case "exportstatus":
          if (this.exportAlert != null) {
            let alertText = this.exportAlert.querySelector(".alertText div");
            if (alertText != null) {
              if (data.data.sync < exportSync) {
                return;
              }
              exportSync = data.data.sync;
              alertText.textContent = data.data.status;
              clearTimeout(this.exportAlertTimeout);
              this.exportAlertTimeout = setTimeout(() => {
                alertModule.close(this.exportAlert);
              }, 30000);
              if (data.data.type != null && this.exportAlert != null && this.exportAlert.hasAttribute("complete") == false) {
                this.exportAlert.setAttribute("complete", "");
                alertModule.close(this.exportAlert);
                if (data.data.type == "download") {
                  window.open(assetURL + data.data.export);
                  dropdownModule.close();
                } else if (data.data.type == "print") {
                  let blob;
                  await fetch(assetURL + data.data.export).then(async function (file) {
                    blob = URL.createObjectURL(await file.blob());
                  });
                  if (blob != null) {
                    let oldframe = fixed.querySelector(".eFileActionPrintFrame");
                    if (oldframe != null) {
                      oldframe.remove();
                    }
                    fixed.insertAdjacentHTML("beforeend", `<iframe class="eFileActionPrintFrame" style="display: none"></iframe>`);
                    let iframe = fixed.querySelector(".eFileActionPrintFrame");
                    iframe.addEventListener("load", () => {
                      iframe.contentWindow.focus();
                      iframe.contentWindow.print();
                      URL.revokeObjectURL(blob);
                    });
                    iframe.src = blob;
                  }
                  dropdownModule.close();
                }
              }
            }
          }
          break;
        case "folderset":
          this.folder = body.folder;
          break;
        case "reaction":
          if (this.annotations[body.reaction.annotation] != null) {
            this.reactions[body.reaction.annotation] = this.reactions[body.reaction.annotation] || [];
            let annotationReactions = this.reactions[body.reaction.annotation];
            if (body.change != null) {
              if (this.sessionID == body.member._id || (body.member.user != null && body.member.user == userID)) {
                if (body.change > 0) {
                  body.reaction.reacted = true;
                } else {
                  body.reaction.reacted = false;
                }
              }
              let foundReaction = false;
              for (let i = 0; i < annotationReactions.length; i++) {
                if (annotationReactions[i]._id == body.reaction._id) {
                  annotationReactions[i].count += body.change;
                  if (body.reaction.reacted != null) {
                    annotationReactions[i].reacted = body.reaction.reacted;
                  }
                  if (annotationReactions[i].count < 1) {
                    annotationReactions.splice(i, 1);
                    i--;
                  }
                  foundReaction = true;
                  break;
                }
              }
              if (foundReaction == false) {
                body.reaction.count += body.change;
                annotationReactions.push(body.reaction);
              }
            } else {
              for (let i = 0; i < annotationReactions.length; i++) {
                if (annotationReactions[i]._id == body.reaction._id) {
                  annotationReactions.splice(i, 1);
                  break;
                }
              }
            }
            if (annotationReactions.length < 1) {
              delete this.reactions[body.reaction.annotation];
            }
            await utils.render(this.annotations[body.reaction.annotation].render);
            if (this.selecting[body.reaction.annotation] != null && this.newReactionUpdate != null) {
              this.newReactionUpdate(body);
            }
          }
      }

      if (this.updateMembersList != null) {
        this.updateMembersList(data);
      }

      // Check to exit observe:
      if (this.realtime.observed == true) {
        let memberKeys = Object.keys(this.members);
        let observed = false;
        for (let i = 0; i < memberKeys.length; i++) {
          if (this.members[memberKeys[i]].observe == this.sessionID) {
            observed = true;
            break;
          }
        }
        if (observed == false) {
          this.realtime.observed = null;
        }
      }
      // Check to update status of observe:
      if (body._id != null && this.realtime.observing == body._id) {
        if (this.members[body._id] == null) {
          this.realtime.module.exitObserve();
          alertModule.open("warning", "<b>Member Left</b>The member you where observing left.");
        }
      }
    }; // Subscribe before to make sure no members are lost in request time.

    socket.remotes["long_" + lessonID] = async (data) => {
      console.log("LONG", data);
      for (let i = 0; i < data.length; i++) {
        let anno = data[i];
        let existingAnno = this.annotations[anno._id] || this.annotations[anno.pending];
        if (existingAnno != null) {
          // RUNS FOR EACH ANNOTATION IN LONG

          /*
          if (anno.remove == true) {
            utils.removeAnnotation(anno._id);
            clearTimeout(existingAnno.expire);
            delete this.annotations[anno._id];
            continue;
          }
          */
          // CHECKS FOR IF SERVER VERSION IS AFTER LAST RECIEVED VERSION
          if (existingAnno.serverSync > anno.sync) {
            return; // Discard event as it's old
          }
          existingAnno.serverSync = anno.sync;
          existingAnno.revert = anno;

          if (anno.remove == true) {
            delete this.reactions[anno._id];
          }

          let gottenRender;
          // UPDATES _id IF IT WAS PENDING
          if (this.annotations[anno.pending] != null) {
            gottenRender = page.querySelector('.eAnnotation[anno="' + anno.pending + '"]');
            let selectActive = page.querySelector('.eSelectActive[anno="' + anno.pending + '"]');
            if (selectActive != null) {
              selectActive.setAttribute("anno", anno._id);
            }
            let selectBox = page.querySelector('.eSelect[anno="' + anno.pending + '"]');
            if (selectBox != null) {
              selectBox.setAttribute("anno", anno._id);
            }
            let allSelections = realtimeHolder.querySelectorAll('.eCollabSelect[anno="' + anno.pending + '"]');
            for (let i = 0; i < allSelections.length; i++) {
              allSelections[i].setAttribute("anno", anno._id);
            }
            // Update Hisotry IDs:
            for (let i = 0; i < utils.history.length; i++) {
              let event = utils.history[i];
              for (let c = 0; c < event.changes.length; c++) {
                if (event.changes[c]._id == anno.pending) {
                  event.changes[c]._id = anno._id;
                }
              }
              for (let c = 0; c < event.redo.length; c++) {
                if (event.redo[c]._id == anno.pending) {
                  event.redo[c]._id = anno._id;
                }
              }
            }

            existingAnno.render._id = anno._id;
            //delete this.annotations[anno.pending];
            this.annotations[anno._id] = existingAnno;
            this.annotations[anno.pending] = { pointer: anno._id };
            existingAnno = this.annotations[anno._id];
            existingAnno.pending = anno.pending;

            if (gottenRender != null) {
              gottenRender.setAttribute("anno", anno._id);
            }

            await utils.enableTimeout(anno._id, existingAnno, gottenRender);
          }
          if (this.selecting[anno.pending] != null) {
            this.selecting[anno._id] = JSON.parse(JSON.stringify(this.selecting[anno.pending]));
            delete this.selecting[anno.pending];

            let cursorModule = await getModule("pages/editor/toolbar/cursor");
            if (cursorModule != null) {
              let selectionIDs = Object.keys(this.selecting);
              cursorModule.lastSelections = "";
              for (let i = 0; i < selectionIDs.length; i++) {
                cursorModule.lastSelections += selectionIDs[i];
              }
            }
          }
          // CHECKS IF SERVER IS AFTER LAST SHORT EDIT SYNC
          if (existingAnno.render.sync > anno.sync) {
            continue;
          }
          // IF SELECTING, DO NOT UPDATE THOSE FIELDS
          let renderObj = anno;
          if (this.selecting[anno._id] != null) {
            renderObj = { ...anno, ...this.selecting[anno._id] };
          }
          // IF AFTER, GOES AHEAD AND UPDATES THE ANNOTATION AND REMOVES REVERT CLOCK
          existingAnno.render = anno;
          clearTimeout(existingAnno.expire);
          delete existingAnno.expire;
          delete existingAnno.revert;
          //objectUpdate(existingAnno.render, anno);
          utils.render(renderObj, gottenRender, true);
        } else {
          this.annotations[anno._id] = { render: anno };
          utils.render(anno, null, true);
        }
      }
      if (this.updateZoom) {
        this.updateZoom(true);
      }
    }; // Subscribe to long, server updates.

    let sendBody = { ss: socket.secureID };
    if (this.active == false) {
      sendBody.active = false;
    }
    if (this.id != lessonID) {
      delete this.session;
    }
    joinData = joinData || {};
    if (joinData.pin) {
      sendBody.pin = joinData.pin;
    }
    if (joinData.name) {
      sendBody.name = joinData.name;
    } else {
      sendBody.name = getParam("name");
    }
    if (joinData.from == "pages/join") {
      delete this.session;
    }
    let paramSession = getParam("member_session") || "";
    if (paramSession != "" && this.exporting == true) {
      this.session = paramSession;
    }
    let [code, body, extra] = await sendRequest("POST", "lessons/join?lesson=" + lessonID, sendBody, { session: this.session, allowError: [403, 406] });
    if (code == 403 || code == 406) {
      page.innerHTML = "";
      setFrame("pages/join");
    }
    if (code != 200) {
      return;
    }

    this.lesson = body.lesson;
    this.lesson.settings = this.lesson.settings || {};

    if (body.folder != null) {
      this.folder = body.folder;
    }

    if (this.lesson.pin) {
      this.codeTextButton.style.display = "unset";
      this.codeTextButton.textContent = this.lesson.pin;
    }

    this.sessionID = body.session._id;
    this.sessionToken = body.session.token;
    this.session = (this.sessionID + ";" + this.sessionToken);

    // Resync unsaved annotations:
    if (window.resync != null && window.resync.lesson == lessonID) {
      let resyncKeys = Object.keys(window.resync.annotations);
      for (let i = 0; i < resyncKeys.length; i++) {
        let anno = window.resync.annotations[resyncKeys[i]];
        if (anno.save == true && (anno.render._id.includes("pending_") == false || anno.render.remove != true)) {
          clearTimeout(anno.expire);
          this.annotations[anno.render._id] = anno;
          utils.pendingSaves[anno.render._id] = { ...utils.pendingSaves[anno.render._id], ...anno.render };
        }
      }
      utils.syncSave();
    }
    window.resync = { lesson: lessonID, annotations: this.annotations };

    this.collaborators = {};

    if (body.preferences != null) {
      if (body.preferences.emojis != null) {
        this.recentEmojis = body.preferences.emojis;
        delete body.preferences.emojis;
      }
      objectUpdate(body.preferences, this.preferences);
      lastSavePref = JSON.parse(JSON.stringify(this.preferences));
      if (this.updateToolbar != null) {
        this.updateToolbar();
      }
    }
    for (let i = 0; (i < this.defaultEmojis.length && this.recentEmojis.length < 21); i++) {
      if (this.recentEmojis.includes(this.defaultEmojis[i]) == false) {
        this.recentEmojis.push(this.defaultEmojis[i]);
      }
    }

    let sentPing = false;
    let sendPing = async () => {
      if (connected == false) {
        return;
      }
      let params = [];
      if (this.active == false && this.exporting != true) {
        params.push("idle");
      }
      if (this.realtime.strength == 2) {
        params.push("weak");
      }
      if (this.realtime.observing != null) {
        params.push("observe=" + this.realtime.observing);
      }
      let path = "lessons/ping";
      if (params.length > 0) {
        path += "?";
        path += params.join("&");
      }
      sentPing = true;
      let [code] = await sendRequest("GET", path, null, { session: this.session, allowError: [403] });
      if (code == 403) {
        if (sendBody.pin != null) {
          setFrame("pages/join"); // Send back to join page
        } else {
          setFrame("pages/editor"); // Refresh to rejoin
        }
      } else if (code != 200 && code != null) {
        setFrame("pages/editor");
      }
    }
    this.sendPing = sendPing;

    if (extra.took < 2500) {
      this.realtime.strength = 3;
    } else {
      this.realtime.strength = 2;
      sendPing();
    }

    tempListeners.push({
      type: "interval", interval: setInterval(async () => {
        if (sentPing == false) {
          sendPing();
        }
        sentPing = false;
      }, 60000)
    }); // PING every minute

    this.syncMembers(body.members);
    this.updateMemberCount();

    this.updateInterface();

    /*let userCheckSelf = this.getSelf();
    if (userCheckSelf.user != null) {
      this.userCheck = "user_" + userCheckSelf.user;
    } else {
      this.userCheck = "temp_" + userCheckSelf._id;
    }*/

    page.querySelector(".eLogo").addEventListener("click", function (event) {
      event.preventDefault();
      setFrame("pages/dashboard");
    });
    let nameBox = page.querySelector(".eFileName");
    nameBox.textContent = this.lesson.name || "Untitled Lesson";
    document.title = nameBox.textContent + " | Markify";
    nameBox.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        nameBox.blur();
        return;
      }
      enableScrollTop();
    });
    nameBox.addEventListener("focusout", async () => {
      let name = nameBox.textContent.substring(0, 30).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        nameBox.textContent = this.lesson.name;
        return;
      }
      if (nameBox.textContent == this.lesson.name) {
        return;
      }
      nameBox.textContent = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.session });
      if (code != 200) {
        nameBox.textContent = this.lesson.name;
      }
    });

    // RELEASE OLD MEMORY
    for (let i = 0; i < this.loadedPDFs.length; i++) {
      this.loadedPDFs[i].destroy();
    }
    this.loadedPDFs = [];

    utils.resetAnnotationSize();

    let currentPage = 1;
    function centerWindowWithPage() {
      let pageChild = pageHolder.children[currentPage - 1] || pageHolder;
      window.scrollTo(window.scrollX + pageChild.getBoundingClientRect().left - ((fixed.offsetWidth - pageChild.offsetWidth) / 2), window.scrollY);
    }

    // Load Annotations:
    this.loadedIn = [];
    let alreadyLoaded = [];
    let firstLoad = true;
    this.viewAnnotations = async (request) => {
      let unloadedPages = [];
      if (this.lesson.type != "freeboard" && this.exporting != true) {
        for (let i = 0; i < this.loadedIn.length; i++) {
          let pageid = this.loadedIn[i];
          let editorPage = this.page.querySelector('.ePage[pageid="' + pageid + '"]');
          if (editorPage != null && (editorPage.querySelector(".ePageAnnotations") == null || editorPage.querySelector(".ePageAnnotations").hasAttribute("loaded") == false) && alreadyLoaded.includes(pageid) == true) {
            unloadedPages.push(pageid);
          }
        }
        if (unloadedPages.length < 1) {
          return;
        }
      }
      let annoKeys = Object.keys(this.annotations);
      for (let i = 0; i < annoKeys.length; i++) {
        let anno = this.annotations[annoKeys[i]];
        if (anno.render == null) {
          continue;
        }
        if (unloadedPages.includes(anno.render.page) == true || this.lesson.type == "freeboard" || this.exporting == true) {
          await utils.render(anno.render);
          if (this.lesson.type != "freeboard") {
            let editorPageAnnotations = this.page.querySelector('.ePage[pageid="' + anno.render.page + '"] .ePageAnnotations');
            if (editorPageAnnotations != null) {
              editorPageAnnotations.setAttribute("loaded", "");
            }
          }
        }
      }
      if (request == true && firstLoad == true) {
        firstLoad = false;
        centerWindowWithPage();
      }
    }
    centerWindowWithPage();
    let getAnnotations = async () => {
      this.viewAnnotations();
      if (connected == false) {
        return;
      }
      let endpoint = "lessons/join/annotations";
      if (this.lesson.type != "freeboard" && getParam("load_all") != "true") {
        let fetchPageIDs = [];
        for (let i = 0; i < this.loadedIn.length; i++) {
          if (alreadyLoaded.includes(this.loadedIn[i]) == false) {
            fetchPageIDs.push(this.loadedIn[i]);
            alreadyLoaded.push(this.loadedIn[i]);
          }
        }
        if (fetchPageIDs.length < 1 && this.exporting != true) {
          return;
        }
        endpoint += "?pages=" + fetchPageIDs.join(",");
      }
      if (this.exporting == true && getParam("only_thumbnail") == "true" && body.pages != null) {
        endpoint = "lessons/join/annotations?pages=" + body.pages[0]._id;
      }

      // Send Load Request:
      let [code, annoBody] = await sendRequest("GET", endpoint, null, { session: this.session }, { allowError: true });
      if (code != 200 && connected == true) {
        (await getModule("alert")).open("error", `<b>Error Loading Annotations</b>Failed to load some annotations, will try again later...`);
        // Remove IDs if load fails, so it can try again!
        for (let i = 0; i < alreadyLoaded.length; i++) {
          if (fetchPageIDs.includes(alreadyLoaded[i]) == true) {
            alreadyLoaded.splice(i, 1);
            i--;
          }
        }
        return;
      }
      for (let i = 0; i < annoBody.annotations.length; i++) {
        let addAnno = annoBody.annotations[i];
        let existingAnno = this.annotations[addAnno._id];
        if (existingAnno == null || existingAnno.render.sync < addAnno.sync) {
          this.annotations[addAnno._id] = { render: addAnno };
          if (this.lesson.type != "freeboard") {
            let editorPageAnnotations = this.page.querySelector('.ePage[pageid="' + addAnno.page + '"] .ePageAnnotations');
            if (editorPageAnnotations != null) {
              editorPageAnnotations.removeAttribute("loaded");
            }
          }
        }
      }
      if (annoBody.reactions != null) {
        let reactedToObject = getObject(annoBody.reactedTo || [], "_id");
        let userCheckSelf = this.getSelf();
        let userCheck;
        if (userCheckSelf.user != null) {
          userCheck = "user_" + userCheckSelf.user;
        } else {
          userCheck = "temp_" + userCheckSelf._id;
        }
        for (let i = 0; i < annoBody.reactions.length; i++) {
          let addReaction = annoBody.reactions[i];
          let existingAnnoRecord = this.reactions[addReaction.annotation];
          if (existingAnnoRecord == null) {
            this.reactions[addReaction.annotation] = [];
            existingAnnoRecord = this.reactions[addReaction.annotation];
          }
          delete addReaction.annotation;
          if (reactedToObject[addReaction._id + "_" + userCheck] != null) {
            addReaction.reacted = true;
          }
          existingAnnoRecord.push(addReaction);
        }
      }

      await this.viewAnnotations(true);
      /*
      let fullPageWidth = app.offsetWidth;
      let minX = window.scrollX - fullPageWidth;
      let maxX = window.scrollX + (fullPageWidth * 2);
      let fullPageHeight = app.offsetHeight;
      let minY = window.scrollY - fullPageHeight;
      let maxY = window.scrollY + (fullPageHeight * 2);
      */
    }

    if (this.exporting != true) {
      (async () => {
        (await getModule("editor/realtime")).js(this, page);
      })();
    } else {
      await getAnnotations();
      await (await getModule("editor/export")).js(this, page);
    }

    this.visiblePages = [];
    this.updatePages = null;

    this.zoom = 1;

    switch (this.lesson.type) {
      case "standard":
        pages = { ...pages, ...getObject(body.pages || [], "_id") };
        sources = { ...sources, ...getObject(body.sources || [], "_id") };

        let scrollOffset = 66;

        let pageTextBox = bottomHolder.querySelector(".eCurrentPage");
        pageTextBox.innerHTML = "<b>1</b> / " + Object.keys(pages).length;
        let updatePageScroll = (nextPage, animation) => {
          if (nextPage) {
            let options = { top: window.scrollY + nextPage.getBoundingClientRect().top - scrollOffset };
            if (animation != false) {
              options.behavior = "smooth";
            }
            window.scrollTo(options);
          }
          if (this.realtime.observing != null && this.realtime.module != null) {
            this.realtime.module.exitObserve();
          }
        }
        bottomHolder.querySelector(".ePageNav[down]").addEventListener("click", () => {
          updatePageScroll(pageHolder.children[currentPage] || pageHolder.children[pageHolder.children.length - 1]);
        });
        bottomHolder.querySelector(".ePageNav[up]").addEventListener("click", () => {
          updatePageScroll(pageHolder.children[currentPage - 2] || pageHolder.children[0]);
        });
        let pageBoxFocus = false;
        pageTextBox.addEventListener("focus", async () => {
          if (pageBoxFocus == true) {
            return;
          }
          //pageTextBox.blur();
          pageTextBox.innerHTML = "";
          pageBoxFocus = true;
          pageTextBox.focus();
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
            } else if (textInt > body.pages.length) {
              event.preventDefault();
              textBoxError(pageTextBox, "Maximum of page number " + body.pages.length);
            } else if (textInt < 1) {
              event.preventDefault();
              textBoxError(pageTextBox, "Minimum of the first page");
            }
          }
        });
        pageTextBox.addEventListener("focusout", (event) => {
          pageBoxFocus = false;
          if (pageTextBox.textContent == "") {
            pageTextBox.innerHTML = "<b>" + currentPage + "</b> / " + body.pages.length;
            return;
          }
          let setPage = parseInt(pageTextBox.textContent) || 1;
          pageTextBox.innerHTML = "<b>" + setPage + "</b> / " + body.pages.length;
          updatePageScroll(pageHolder.children[setPage - 1], false);
        });

        // Must loop through all pages checking if they are on-screen
        for (let i = 0; i < pageHolder.childElementCount; i++) {
          if (inViewport(pageHolder.children[i])) {
            currentPage = i + 1;
            break;
          }
        }
        let loadPage = async (pageElem) => {
          if (pageElem == null) {
            return;
          }
          let pageID = pageElem.getAttribute("pageid");
          let pageData = pages[pageID];
          let canvas;
          await new Promise(async (resolve) => {
            // Get page
            let sourceData = sources[pageData.source];
            if (sourceData) {
              sourceData.pdf.getPage(pageData.page).then(async (pageRender) => {
                if (pageElem.hasAttribute("loading") == false) {
                  resolve();
                  return;
                }
                /*
                if (this.exporting == true && pageElem.hasAttribute("exporting") == false) {
                  return;
                }
                */
                let viewport = pageRender.getViewport({ scale: 2 });

                pageElem.insertAdjacentHTML("beforeend", `<canvas class="ePageContent" new></canvas>`);
                canvas = pageElem.querySelector(".ePageContent[new]");
                canvas.removeAttribute("new");

                let context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;
                //pageElem.style.width = viewport.width + "px";
                //pageElem.style.height = viewport.height + "px";

                pageRender.render({
                  canvasContext: context,
                  viewport: viewport
                }).promise.then(() => {
                  resolve();
                });

                pageElem.setAttribute("loaded", "");

                pageElem.insertAdjacentHTML("beforeend", `<div class="ePageTextHolder" new></div>`);
                let textHolder = pageElem.querySelector(".ePageTextHolder[new]");
                textHolder.removeAttribute("new");

                pageRender.getTextContent().then(function (textContent) {
                  if (pageElem.hasAttribute("loading") == false) {
                    return;
                  }
                  pdfjsLib.renderTextLayer({
                    enhanceTextSelection: true,
                    textContentSource: textContent,
                    container: textHolder,
                    viewport: pageRender.getViewport({ scale: 1 }),
                    textDivs: []
                  });
                  pageElem.setAttribute("loaded", "");
                });
                /*
                pageElem.insertAdjacentHTML("beforeend", `<div class="ePageAnnotationHolder" new></div>`);
                let annotationHolder = pageElem.querySelector(".ePageAnnotationHolder[new]");
                annotationHolder.removeAttribute("new");

                pageRender.getAnnotations().then(function (annotationsData) {
                  if (pageElem.hasAttribute("loading") == false) {
                    return;
                  }
          
                  // Render the annotation layer
                  annotationHolder.style.left = canvas.offsetLeft + "px";
                  annotationHolder.style.top = canvas.offsetTop + "px";
                  annotationHolder.style.height = viewport.height + "px";
                  annotationHolder.style.width = viewport.width + "px";

                  console.log(annotationsData);
                });
                */
              });
            } else {
              resolve();
            }
            if (this.getSelf().access > 3) { // Only owner(s) can rearrange pages:
              pageElem.insertAdjacentHTML("beforeend", `<button class="ePageRearrange" dropdown="dropdowns/editor/rearrange"><img src="./images/editor/dots.svg"><div>Rearrange</div></button>`);
            }
          });
          // Remove loading
          if (canvas) {
            if (this.exporting != true) {
              canvas.style.transition = ".5s";
              canvas.offsetHeight;
            }
            canvas.style.opacity = 1;
          }
          let loading = pageElem.querySelector(".loading");
          if (loading) {
            if (this.exporting != true) {
              loading.setAttribute("done", "");
              loading.style.opacity = 0;
              await sleep(500);
            }
            loading.remove();
          }
        }
        let renderPages = async () => {
          this.loadedIn = [];
          for (let i = -3; i < this.visiblePages.length + 3; i++) {
            let pageNum = 1;
            if (i < 0) {
              pageNum = this.visiblePages[0] + i;
            } else if (i > this.visiblePages.length - 1) {
              pageNum = this.visiblePages[this.visiblePages.length - 1] + i - (this.visiblePages.length - 1);
            } else {
              pageNum = this.visiblePages[i];
            }
            if (pageNum < 1) {
              continue;
            } else if (pageNum > pageHolder.children.length) {
              break;
            }
            let pageElem = pageHolder.children[pageNum - 1];
            if (pageElem == null) {
              continue;
            }
            let pageID = pageElem.getAttribute("pageid");
            if (pageID == null) {
              return;
            }
            this.loadedIn.push(pageID);
            if (pageElem.hasAttribute("hide") == true) {
              if (pageElem.querySelector(".ePageHidden") == null) {
                pageElem.insertAdjacentHTML("beforeend", `<div class="ePageHidden" new></div>`);
                let hiddenElem = pageElem.querySelector(".ePageHidden[new]");
                hiddenElem.removeAttribute("new");
                if (this.exporting != true) {
                  hiddenElem.insertAdjacentHTML("beforeend", `<div class="ePageHiddenModal">
                    <img src="./images/editor/hidden.svg">
                    <div class="ePageHiddenModalTitle">Page Hidden</div>
                    <div class="ePageHiddenModalDesc">This page has been hidden from view and can only be revealed by the lesson owner.</div>
                  </div>`);
                  if (this.getSelf().access > 3) {
                    hiddenElem.querySelector(".ePageHiddenModal").insertAdjacentHTML("beforeend", `<button class="ePageRevealButton largeButton">Reveal Page</button>`);
                  }
                }
              }
            } else if (pageElem.querySelector(".ePageHidden") != null) {
              pageElem.querySelector(".ePageHidden").remove();
            }
            if (pageElem.hasAttribute("loading") == false) {
              let pageData = pages[pageID];
              let sourceData = sources[pageData.source];
              if (this.exporting != true) {
                pageElem.insertAdjacentHTML("beforeend", loadingAnim);
                let loading = pageElem.querySelector(".loading[new]");
                loading.removeAttribute("appload");
                loading.style.transition = "unset";
                loading.style.opacity = 0;
                loading.offsetHeight;
                loading.style.transition = "opacity .5s";
                if (page.querySelector(".loading[appload]") == null) {
                  (async function () { // Only show loading after a tiny period of time:
                    await sleep(500);
                    if (loading && loading.hasAttribute("done") == false) {
                      loading.style.opacity = 1;
                    }
                  })();
                }
                loading.removeAttribute("new");
              }
              pageElem.setAttribute("loading", "");
              if (sourceData == null || sourceData.pdf) {
                if (this.exporting != true) {
                  loadPage(pageElem);
                } else {
                  await loadPage(pageElem);
                }
              }
            }
          }
          let loadedPages = pageHolder.querySelectorAll(".ePage[loading], .ePage[loaded]");
          for (let i = 0; i < loadedPages.length; i++) {
            let page = loadedPages[i];
            if (this.loadedIn.includes(page.getAttribute("pageid")) == false) {
              if (page.querySelector(".loading")) {
                page.querySelector(".loading").remove();
              }
              if (page.querySelector(".ePageContent")) {
                page.querySelector(".ePageContent").remove();
              }
              if (page.querySelector(".ePageTextHolder")) {
                page.querySelector(".ePageTextHolder").remove();
              }
              if (page.querySelector(".ePageAnnotationHolder")) {
                page.querySelector(".ePageAnnotationHolder").remove();
              }
              if (page.querySelector(".ePageAnnotations")) {
                page.querySelector(".ePageAnnotations").remove();
              }
              if (page.querySelector(".ePageRearrange")) {
                page.querySelector(".ePageRearrange").remove();
              }
              if (page.querySelector(".ePageHidden")) {
                page.querySelector(".ePageHidden").remove();
              }
              page.removeAttribute("loading");
              page.removeAttribute("loaded");
            }
          }
          await getAnnotations();
        }
        let scrollSubTimeout;
        this.updatePages = async () => {
          // Can go off current page to see which pages are visible or not
          this.visiblePages = [];
          let checkInt = 1;
          if (inViewport(pageHolder.children[currentPage - 1], true)) {
            //if (this.exporting != true || afterPageElem.hasAttribute("exporting") == true) {
            this.visiblePages.unshift(currentPage);
            //}
          }
          while (true) {
            let beforeNoRun = true;
            let afterNoRun = true;
            if (currentPage - checkInt > 0) { // Check page before
              let beforePageElem = pageHolder.children[currentPage - checkInt - 1];
              if (inViewport(beforePageElem, true)) {
                /* if (this.exporting == true && beforePageElem.hasAttribute("exporting") == false) {
                  continue;
                } */
                this.visiblePages.unshift(currentPage - checkInt);
                beforeNoRun = false;
              }
            }
            if (currentPage + checkInt < pageHolder.childElementCount + 1) { // Check page after
              let afterPageElem = pageHolder.children[currentPage + checkInt - 1];
              if (inViewport(afterPageElem, true)) {
                /* if (this.exporting == true && afterPageElem.hasAttribute("exporting") == false) {
                  continue;
                } */
                this.visiblePages.push(currentPage + checkInt);
                afterNoRun = false;
              }
            }
            checkInt++;
            if ((this.visiblePages.length > 0 && beforeNoRun && afterNoRun) || checkInt > 500) {
              break;
            }
          }
          if (this.visiblePages.length > 0) {
            currentPage = this.visiblePages[Math.floor(this.visiblePages.length / 2)];
          }
          if (this.realtime.module) {
            clearTimeout(scrollSubTimeout);
            scrollSubTimeout = setTimeout(() => {
              this.realtime.module.setShortSub(this.visiblePages);
              modifyParams("page", currentPage);
            }, 750);
            if (this.scrollEvent) {
              this.scrollEvent();
            }
          }
          if (pageBoxFocus == false) {
            pageTextBox.innerHTML = "<b>" + currentPage + "</b> / " + Object.keys(pages).length;
          } else {
            pageBoxFocus = false;
            pageTextBox.blur();
          }
          if (currentPage > pageHolder.childElementCount - 1) {
            bottomHolder.querySelector(".ePageNav[down]").setAttribute("disabled", "");
          } else {
            bottomHolder.querySelector(".ePageNav[down]").removeAttribute("disabled");
          }
          if (currentPage < 2) {
            bottomHolder.querySelector(".ePageNav[up]").setAttribute("disabled", "");
          } else {
            bottomHolder.querySelector(".ePageNav[up]").removeAttribute("disabled");
          }
          await renderPages();

          //addPagesHolder.style.width = (pageHolder.lastElementChild.offsetWidth * this.zoom) + "px";
          //addPagesHolder.style.marginLeft = utils.marginLeft + "px";
        }
        tempListen(window, "scroll", this.updatePages);
        tempListen(window, "resize", this.updatePages);

        // Load pages:
        this.addPages = (pages) => {
          for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            let includeSource = "";
            if (page.source) {
              includeSource = ` sourceid="${page.source}"`;
            }
            pageHolder.insertAdjacentHTML("beforeend", `<div class="ePage" pageid="${page._id}"${includeSource} order="${page.order}" style="width: ${page.width}px; height: ${page.height}px" new></div>`);
            let newPage = pageHolder.querySelector(".ePage[new]");
            if (page.hidden != null) {
              newPage.setAttribute("hide", "");
            }
            newPage.removeAttribute("new");
            let properSort = () => {
              if (newPage.previousElementSibling != null && parseInt(newPage.previousElementSibling.getAttribute("order")) > page.order) {
                pageHolder.insertBefore(newPage, newPage.previousElementSibling);
                properSort();
              }
            }
            properSort();
          }
        }
        this.addPages(body.pages);

        // Load PDFJS
        if (window.pdfjsLib == null) {
          await loadScript("./libraries/pdfjs/pdf.mjs");
        }
        pdfjsLib.GlobalWorkerOptions.workerSrc = "./libraries/pdfjs/pdf.worker.mjs";

        // Load sources:
        let loadedSourceCount = 0;
        this.addSources = (sources) => {
          for (let i = 0; i < sources.length; i++) {
            let sourceData = sources[i];
            if (getParam("only_thumbnail") == "true" && this.exporting == true) {
              if (pageHolder.firstElementChild == null || pageHolder.firstElementChild.getAttribute("sourceid") != sourceData._id) {
                continue;
              }
            }
            let loadingTask = pdfjsLib.getDocument(assetURL + sourceData.source);
            this.loadedPDFs.push(loadingTask);
            loadingTask.promise.then(async (pdf) => {
              sourceData.pdf = pdf;
              let loadInPages = pageHolder.querySelectorAll('.ePage[sourceid="' + sourceData._id + '"][loading]');
              for (let i = 0; i < loadInPages.length; i++) {
                if (this.exporting != true) {
                  loadPage(loadInPages[i]);
                } else {
                  await loadPage(loadInPages[i]);
                }
              }
              loadedSourceCount++;
              if (window.exportReady && (loadedSourceCount >= sources.length || getParam("only_thumbnail") == "true")) {
                window.exportReady();
              }
            });
          }
        }
        this.addSources(body.sources);

        let scrollPage = getParam("page") || 1;
        let scrollElem = pageHolder.children[scrollPage - 1];
        if (scrollElem != null) {
          window.scrollTo({ top: window.scrollY + scrollElem.getBoundingClientRect().top - scrollOffset });
        }

        if (this.exporting == true) {
          if (window.exportReady && (body.sources.length < 1 || (getParam("only_thumbnail") == "true" && pageHolder.firstElementChild != null && pageHolder.firstElementChild.hasAttribute("sourceid") == false))) {
            window.exportReady();
          }
        }
        
        pageHolder.addEventListener("click", async (event) => {
          let element = event.target;
          if (element == null) {
            return;
          }
          let revealButton = event.target.closest(".ePageRevealButton");
          if (revealButton != null) {
            revealButton.setAttribute("disabled", "");
            await sendRequest("PUT", "lessons/rearrange/show?page=" + revealButton.closest(".ePage").getAttribute("pageid"), null, { session: this.session });
            revealButton.removeAttribute("disabled");
          }
        });

        this.updatePageSize = () => {
          //let pageChild = pageHolder.children[currentPage - 1] || pageHolder;
          if (this.exporting == true) {
            this.addMargin = 0;
            return;
          }
          this.addMargin = Math.max((fixed.offsetWidth - (pageHolder.offsetWidth * this.zoom)) / 2, 100);
        }
        let resetResizeTimeout;
        tempListen(window, "resize", () => {
          clearTimeout(resetResizeTimeout);
          resetResizeTimeout = setTimeout(() => {
            this.updatePageSize();
            utils.resetAnnotationSize();
          }, 500);
        });
        this.updatePageSize();

        if (this.exporting != true) {
          addPagesHolder.style.display = "flex";
        }
        break;
      case "freeboard":
        //pageHolder.remove();
        addPagesHolder.remove();
        this.updatePageSize = () => {
          pageHolder.style.width = fixed.offsetWidth - 332 + "px";
          pageHolder.style.height = fixed.offsetHeight - 332 + "px";
          if (this.exporting == true) {
            this.addMargin = 0;
            return;
          }
          this.addMargin = Math.max(fixed.offsetWidth / 2, 100);
        }
        pageHolder.style.pointerEvents = "none";
        let resetTimeout;
        tempListen(window, "resize", () => {
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(() => {
            this.updatePageSize();
            utils.resetAnnotationSize();
          }, 500);
        });
        let updateScroll = () => {
          if (this.scrollEvent) {
            this.scrollEvent();
          }
        }
        tempListen(window, "scroll", updateScroll);
        tempListen(window, "resize", updateScroll);
        this.updatePageSize();
        bottomHolder.remove();
        await getAnnotations();
        utils.resetAnnotationSize();
        if (window.exportReady) {
          window.exportReady();
        }
    }

    // Zoom
    this.setZoom = async (set, observe, mouse) => {
      mouse = mouse || {};
      if (observe != true && this.realtime.observing != null && this.realtime.module != null) {
        this.realtime.module.exitObserve();
      }

      let mouseX = mouse.clientX || ((mouse.changedTouches || [])[0] || {}).clientX || 0;
      let mouseY = mouse.clientY || ((mouse.changedTouches || [])[0] || {}).clientY || 0;

      // Get Page Rect:
      let pageHolderRect = pageHolder.getBoundingClientRect();

      // Calculate the new scroll position based on the mouse cursor position and zoom level
      let mouseRelativeBeforeX = (mouseX - pageHolderRect.left) / (pageHolder.clientWidth * this.zoom);
      let mouseRelativeBeforeY = (mouseY - pageHolderRect.top) / (pageHolder.clientHeight * this.zoom);

      if (set == null) {
        let delta = Math.max(-1, Math.min(1, (mouse.wheelDelta || -(mouse.detail || 0))));
        set = this.zoom + (delta / 10);
      }
      this.zoom = set;

      if (this.zoom > 5) {
        this.zoom = 5;
      } else if (this.zoom < .25) {
        this.zoom = .25;
      }

      pageHolder.style.transform = `scale(${this.zoom})`;

      content.style.width = pageHolder.clientWidth * this.zoom + "px";
      content.style.height = pageHolder.clientHeight * this.zoom + "px";

      this.updatePageSize();

      await utils.checkAnnotationSize();

      // Calculate the new scroll position based on the mouse cursor position and zoom level
      let mouseRelativeAfterX = (mouseX - pageHolderRect.left) / (pageHolder.clientWidth * this.zoom);
      let mouseRelativeAfterY = (mouseY - pageHolderRect.top) / (pageHolder.clientHeight * this.zoom);

      let newScrollX = ((pageHolder.clientWidth * this.zoom) * mouseRelativeBeforeX) - ((pageHolder.clientWidth * this.zoom) * mouseRelativeAfterX);
      let newScrollY = ((pageHolder.clientHeight * this.zoom) * mouseRelativeBeforeY) - ((pageHolder.clientHeight * this.zoom) * mouseRelativeAfterY);

      // Set the new scroll position
      window.scrollTo((window.scrollX) + newScrollX, (window.scrollY) + newScrollY);

      /*
      // Calculate the new scroll position based on the mouse cursor position and zoom level
      let newScrollX = ((mouseX + pageScrollX) * (document.body.scrollWidth / prevWidth)) - mouseX; // + rect.left;
      let newScrollY = ((mouseY + pageScrollY) * (document.body.scrollHeight / prevHeight)) - mouseY; // + rect.top;

      // Set the new scroll position
      window.scrollTo(newScrollX, newScrollY);
      */

      let updateZoomPercentBoxes = document.querySelectorAll(".eZoomBox");
      for (let i = 0; i < updateZoomPercentBoxes.length; i++) {
        updateZoomPercentBoxes[i].textContent = Math.round(this.zoom * 100);
      }
      if (fixed.querySelector(".eZoomHolder")) {
        if (this.zoom >= 5) {
          fixed.querySelector(".eZoomButton[add]").setAttribute("disabled", "");
        } else {
          fixed.querySelector(".eZoomButton[add]").removeAttribute("disabled");
        }
        if (this.zoom <= .25) {
          fixed.querySelector(".eZoomButton[sub]").setAttribute("disabled", "");
        } else {
          fixed.querySelector(".eZoomButton[sub]").removeAttribute("disabled");
        }
      }

      if (mouse.updatePages != false && this.updatePages) {
        this.updatePages();
      }
      if (this.updateZoom) {
        this.updateZoom(true);
      }
      if (this.updateSelectedBounds) {
        this.updateSelectedBounds();
      }

      this.realtime.module.adjustRealtimeHolder();
    }
    let scrollMouseWheel = (event) => {
      if (event.ctrlKey || event.metaKey) {
        this.setZoom(null, null, event);
        event.preventDefault();
      }
    }
    tempListen(window, "DOMMouseScroll", scrollMouseWheel, { passive: false });
    tempListen(window, "mousewheel", scrollMouseWheel, { passive: false });
    tempListen(window, "wheel", scrollMouseWheel, { passive: false });

    // Handle MOBILE
    let startDistance;
    let startZoom;
    let currentCenter;
    let getDistance = (touches) => {
      //return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
      // Percent Based Distance:
      let pageWidth = fixed.offsetWidth;
      let pageHeight = fixed.offsetHeight;
      let xDiff = (touches[1].clientX / pageWidth) - (touches[0].clientX / pageWidth);
      let yDiff = (touches[1].clientY / pageHeight) - (touches[0].clientY / pageHeight);
      return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }
    let getCenter = (touches) => {
      return { x: (touches[0].clientX + touches[1].clientX) / 2, y: (touches[0].clientY + touches[1].clientY) / 2 };
    }
    let finishTimeout;
    let running = false;
    let handlePinch = async (event) => {
      if (running == true) {
        return;
      }
      running = true;
      if (event.touches.length > 1 && this.pinchZoomDisable != true) {
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
        /*
        let delta = 0;
        if (currentDistance > lastDistance) {
          delta = 1;
        } else if (lastDistance < currentDistance) {
          delta = -1;
        }
        */
        await this.setZoom(startZoom * (currentDistance / startDistance), null, { clientX: currentCenter.x, clientY: currentCenter.y, updatePages: false });
        clearTimeout(finishTimeout);
        finishTimeout = setTimeout(() => {
          if (this.updatePages) {
            this.updatePages();
          }
        }, 5000);
      }
      running = false;
    }
    tempListen(document, "touchstart", handlePinch, { passive: false });
    tempListen(document, "touchmove", handlePinch, { passive: false });
    tempListen(document, "touchend", () => {
      startDistance = null;
      startZoom = null;
      currentCenter = null;
    }, { passive: false });

    /*
    let initialDistance = null;

    function calculateDistance(touches) {
      let [x1, y1] = [touches[0].pageX, touches[0].pageY];
      let [x2, y2] = [touches[1].pageX, touches[1].pageY];
      return Math.hypot(x2 - x1, y2 - y1);
    }

    function handlePinchZoom(event) {
      let touches = event.touches;
      if (touches.length !== 2) return;

      let currentDistance = calculateDistance(touches);

      if (initialDistance === null) {
        initialDistance = currentDistance;
      } else {
        let distanceChange = currentDistance - initialDistance;
        document.title = distanceChange;

        this.setZoom(this.zoom + Math.floor(distanceChange * 0.1));
      }

      event.preventDefault();
    }

    function handleTouchEnd() {
      initialDistance = null;
    }

    tempListen(window, "touchmove", handlePinchZoom, { passive: false });
    tempListen(window, "touchend", handleTouchEnd, { passive: false });
    */

    // Fullscreen
    let pageUpdateInterval;
    tempListen(document, "fullscreenchange", () => {
      this.options.fullscreen = document.fullscreenElement != null;
      let fullscreenToggle = fixed.querySelector('.eZoomAction[option="fullscreen"]');
      if (this.options.fullscreen) {
        fullscreenToggle.setAttribute("on", "");
        fullscreenToggle.removeAttribute("off");
        pageUpdateInterval = setInterval(this.updatePages, 10);
      } else {
        fullscreenToggle.setAttribute("off", "");
        fullscreenToggle.removeAttribute("on");
        clearInterval(pageUpdateInterval);
      }
    });

    // On page:
    tempListen(document, "visibilitychange", () => {
      this.active = document.visibilityState == "visible";
      sendPing();
    });

    // LOAD IN:
    if (this.updatePages) {
      this.updatePages();
    }

    // Events:
    let sendMove = (event) => {
      if (this.events.mouseMove != null) {
        this.events.mouseMove(event);
      }
    }
    page.addEventListener("mousemove", sendMove, { passive: true });
    page.addEventListener("touchmove", sendMove, { passive: true });

    enableScrollTop();
  }
}

modules["dropdowns/editor/zoom"] = {
  html: `
  <div class="eZoomHolder">
    <button class="eZoomButton buttonAnim border" sub change="-.25">-</button>
    <div class="eZoomLevel border"><div class="eZoomBox" contenteditable>100</div>%</div>
    <button class="eZoomButton buttonAnim border" add change=".25">+</button>
  </div>
  <div class="eZoomLine"></div>
  <button class="eZoomAction" option="cursors" title="Display the cursors of other editors."><div label>Show Cursors</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursornames" local title="Show the member's name when they're annotating."><div label>Cursor Names</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="stylusmode" local title="Only write on the document when using an active stylus, such as the Apple Pencil."><div label>Stylus Mode</div><div class="eZoomToggle"><div></div></div></button>
  <!--<button class="eZoomAction" option="comments" title="Show comments on the document."><div label>Comments</div><div class="eZoomToggle"><div></div></div></button>-->
  <!--<div class="eZoomLine"></div>-->
  <!--<button class="eZoomAction" option="fullscreen" title="Fullscreen allows increased accessibility."><div label>Fullscreen</div><div class="eZoomToggle"><div></div></div></button>-->
  `,
  css: {
    ".eZoomHolder": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".eZoomButton": `position: relative; display: flex; width: 22px; height: 22px; margin: 20px 3px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 8px; color: var(--theme); font-size: 24px; font-weight: 600; line-height: 0`,
    '.eZoomButton[change="-.1"]': `cursor: zoom-out`,
    '.eZoomButton[change=".1"]': `cursor: zoom-in`,
    ".eZoomLevel": `display: flex; padding: 3px 6px 3px 3px; margin: 0 12px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eZoomLevel div": `max-width: 50px; min-width: 25px; padding: 3px 6px; margin-right: 3px; border: none; outline: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`,

    ".eZoomLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,

    ".eZoomAction": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eZoomAction:not(:last-child)": `margin-bottom: 4px`,
    ".eZoomAction div[label]": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eZoomAction[on]": `--themeColor: var(--theme)`,
    ".eZoomAction[off]": `--themeColor: var(--error)`,
    ".eZoomToggle": `position: relative; width: 36px; height: 20px; padding: 2px; margin-left: 12px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eZoomToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eZoomAction[on] .eZoomToggle div": `right: 2px`,
    ".eZoomAction[off] .eZoomToggle div": `right: calc(100% - 22px)`,
    ".eZoomAction:hover": `background: var(--themeColor); color: #fff`,
    ".eZoomAction:hover .eZoomToggle": `background: #fff`,
    ".eZoomAction:hover .eZoomToggle div": `background: var(--themeColor)`,

    "body:fullscreen": `overflow: auto !important`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    let zoomPercentage = frame.querySelector(".eZoomLevel div");
    function setZoomText() {
      zoomPercentage.textContent = Math.round(editor.zoom * 100);
    }
    setZoomText();
    editor.setZoom();
    let setButtonOptions = frame.querySelectorAll(".eZoomAction");
    for (let i = 0; i < setButtonOptions.length; i++) {
      let buttonToggle = setButtonOptions[i];
      if (editor.options[buttonToggle.getAttribute("option")] == true) {
        buttonToggle.setAttribute("on", "");
      } else {
        buttonToggle.setAttribute("off", "");
      }
    }
    function forceSetZoom() {
      editor.setZoom(parseInt(zoomPercentage.textContent) / 100, null, { clientX: fixed.offsetWidth / 2, clientY: fixed.offsetHeight / 2 });
    }
    zoomPercentage.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        forceSetZoom();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 500) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 500%");
        }
      }
    });
    zoomPercentage.addEventListener("focusout", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      let textInt = parseInt(textBox.textContent) || 0;
      if (textInt == "") {
        setZoomText();
      } else if (textInt > 500) {
        textBox.textContent = "500";
      } else if (textInt < 25) {
        textBox.textContent = "20";
      }
      forceSetZoom();
    });
    let cursorZoomAction = fixed.querySelector('.eZoomAction[option="cursors"]');
    let namesZoomAction = fixed.querySelector('.eZoomAction[option="cursornames"]');
    if (editor.realtime.strength < 3) {
      cursorZoomAction.style.opacity = 0.5;
      cursorZoomAction.title = "Cursors disabled due to weak connection.";
      namesZoomAction.style.opacity = 0.5;
    }
    if (cursorZoomAction.hasAttribute("off")) {
      namesZoomAction.setAttribute("disabled", "");
    }
    frame.addEventListener("click", (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let textBox = event.target.closest(".eZoomLevel div");
      if (textBox) {
        textBox.textContent = "";
        return;
      }
      let zoomChange = element.closest(".eZoomButton");
      if (zoomChange) {
        editor.setZoom(editor.zoom + parseFloat(zoomChange.getAttribute("change")), null, { clientX: fixed.offsetWidth / 2, clientY: fixed.offsetHeight / 2 });
        return;
      }
      let toggle = element.closest(".eZoomAction");
      if (toggle) {
        let option = toggle.getAttribute("option");
        if (toggle.hasAttribute("on")) {
          toggle.setAttribute("off", "");
          toggle.removeAttribute("on");
          editor.options[option] = false;
        } else {
          toggle.setAttribute("on", "");
          toggle.removeAttribute("off");
          editor.options[option] = true;
        }
        if (toggle.hasAttribute("local") == true) {
          this.localOptions = this.localOptions || {};
          this.localOptions[option] = editor.options[option];
          setLocalStore("options", JSON.stringify(this.localOptions));
        }
        if (option == "cursors") {
          if (editor.realtime.module) {
            editor.realtime.module.setShortSub(editor.visiblePages);
          }
          if (toggle.hasAttribute("off")) {
            editor.page.querySelector(".eRealtime").innerHTML = "";
          }
        }
        if (option == "fullscreen") {
          if (toggle.hasAttribute("on")) {
            if (body.requestFullscreen) {
              body.requestFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        }
        if (option == "cursors") {
          if (toggle.hasAttribute("on")) {
            namesZoomAction.removeAttribute("disabled");
          } else {
            namesZoomAction.setAttribute("disabled", "");
          }
        }
      }
    });
  }
}

modules["dropdowns/editor/file"] = {
  html: `
  <button class="eFileAction" option="dashboard" title="Return to the Dashboard" style="--themeColor: var(--secondary)"><img src="./images/tooltips/back.svg">Dashboard</button>
  <div class="eFileLine"></div>
  <button class="eFileAction" option="export" title="Export the lesson into a PDF."><img src="./images/editor/file/export.svg">Export PDF</button>
  <button class="eFileAction" option="print" title="Export the lesson and print."><img src="./images/editor/file/print.svg">Print</button>
  <button class="eFileAction" option="copy" title="Create a copy of the lesson."><img src="./images/editor/file/copy.svg">Create Copy</button>
  <button class="eFileAction" option="moveto" title="Move this lesson into a folder." dropdown="dropdowns/dashboard/moveto" dropdowntitle="Move To Folder"><img src="./images/dashboard/moveto.svg">Move To Folder</button>
  <div class="eFileLine" option="findjump"></div>
  <button class="eFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><img src="./images/editor/file/search.svg">Find</button>
  <button class="eFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><img src="./images/editor/bottom/uparrow.svg">Jump to Top</button>
  <button class="eFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><img src="./images/editor/file/jump.svg">Jump to Page</button>
  <button class="eFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><img src="./images/editor/bottom/downarrow.svg">Jump to End</button>
  <div class="eFileLine"></div>
  <button class="eFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><img src="./images/editor/file/info.svg">Properties</button>
  <button class="eFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><img src="./images/editor/file/text.svg">Recognize Text</button>
  <div class="eFileLine" option="delete"></div>
  <button class="eFileAction" option="deletelesson" dropdown="dropdowns/editor/file/delete" title="Remove this lesson from your dashboard." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Lesson</button>
  <button class="eFileAction" option="deleteannotations" dropdown="dropdowns/editor/file/delete" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Annotations</button>
  <div class="eFileLine" option="hideshow"></div>
  <button class="eFileAction" option="hideshowpage" title="Hide this page for all members."><img src="./images/editor/rearrange/hideshow.svg">Hide All Pages</button>
  `,
  css: {
    ".eFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".eFileAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: #fff; border-radius: 4px`,
    ".eFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".eFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    let dropdown = await getModule("dropdown");
    let alert = await getModule("alert");
    let access = editor.getSelf().access;
    frame.setAttribute("lesson", editor.id);
    if (editor.folder != null) {
      frame.setAttribute("folderid", editor.folder);
    }
    frame.querySelector('.eFileAction[option="dashboard"]').addEventListener("click", () => {
      setFrame("pages/dashboard");
    });
    let exportButton = frame.querySelector('.eFileAction[option="export"]');
    exportButton.addEventListener("click", async () => {
      exportButton.setAttribute("disabled", "");
      let exportAlert = await alert.open("info", "<b>Exporting Lesson</b><div>Preparing export...</div>", { time: "never" });
      if (editor.exportAlert) {
        clearTimeout(editor.exportAlertTimeout);
        alert.close(editor.exportAlert);
      }
      editor.exportAlert = exportAlert;
      editor.exportAlertTimeout = setTimeout(() => {
        alert.close(editor.exportAlert);
      }, 30000);
      let [code, body] = await sendRequest("POST", "lessons/export", null, { session: editor.session });
      if (exportButton != null) {
        exportButton.removeAttribute("disabled");
      }
      if ([504, 524, 0].includes(code) == false) { // Gateway timeout
        alert.close(exportAlert);
      }
      if (code == 200 && exportAlert != null && exportAlert.hasAttribute("complete") == false) {
        exportAlert.setAttribute("complete", "");
        window.open(assetURL + body.export);
        dropdown.close();
      }
    });
    let printButton = frame.querySelector('.eFileAction[option="print"]');
    printButton.addEventListener("click", async () => {
      printButton.setAttribute("disabled", "");
      let exportAlert = await alert.open("info", "<b>Exporting Lesson</b><div>Preparing export...</div>", { time: "never" });
      if (editor.exportAlert) {
        clearTimeout(editor.exportAlertTimeout);
        alert.close(editor.exportAlert);
      }
      editor.exportAlert = exportAlert;
      editor.exportAlertTimeout = setTimeout(() => {
        alert.close(editor.exportAlert);
      }, 30000);
      let [code, body] = await sendRequest("POST", "lessons/export?type=print", null, { session: editor.session });
      if (printButton != null) {
        printButton.removeAttribute("disabled");
      }
      if ([504, 524, 0].includes(code) == false) { // Gateway timeout
        alert.close(exportAlert);
      }
      if (code == 200 && exportAlert != null && exportAlert.hasAttribute("complete") == false) {
        exportAlert.setAttribute("complete", "");
        //document.body.insertAdjacentHTML("beforeend", `<object class="eFileActionPrint" type="application/pdf" data="${assetURL + body.export}" width="100%" height="100%" name="${editor.lesson.name}"><param name="src" value=${assetURL + body.export}/></object>`);
        //document.body.querySelector(".eFileActionPrint").printWithDialog();
        let blob;
        await fetch(assetURL + body.export).then(async function (file) {
          blob = URL.createObjectURL(await file.blob());
        });
        if (blob != null) {
          let oldframe = fixed.querySelector(".eFileActionPrintFrame");
          if (oldframe != null) {
            oldframe.remove();
          }
          fixed.insertAdjacentHTML("beforeend", `<iframe class="eFileActionPrintFrame" style="display: none"></iframe>`);
          let iframe = fixed.querySelector(".eFileActionPrintFrame");
          iframe.addEventListener("load", () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            URL.revokeObjectURL(blob);
          });
          iframe.src = blob;
        }
        dropdown.close();
      }
    });
    let copyButton = frame.querySelector('.eFileAction[option="copy"]');
    copyButton.addEventListener("click", async () => {
      if (userID == null) {
        promptLogin();
        return;
      }
      copyButton.setAttribute("disabled", "");
      let copyAlert = await alert.open("info", "<b>Creating Copy</b><div>Creating a copy of this lesson's pages and annotations.", { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/copy", null, { session: editor.session });
      copyButton.removeAttribute("disabled");
      alert.close(copyAlert);
      if (code == 200) {
        dropdown.close();
        modifyParams("lesson", body.lesson);
        setFrame("pages/editor");
      }
    });
    if (editor.lesson.settings.allowExport == false && access < 4) {
      exportButton.setAttribute("disabled", "");
      printButton.setAttribute("disabled", "");
      copyButton.setAttribute("disabled", "");
    }

    let find = frame.querySelector('.eFileAction[option="find"]');
    let jumptop = frame.querySelector('.eFileAction[option="jumptop"]');
    jumptop.addEventListener("click", () => {
      window.scrollTo({ top: 0 });
    });
    let jump = frame.querySelector('.eFileAction[option="jump"]');
    jump.addEventListener("click", () => {
      editor.page.querySelector(".eCurrentPage").focus();
    });
    let jumpend = frame.querySelector('.eFileAction[option="jumpend"]');
    jumpend.addEventListener("click", () => {
      window.scrollTo({ top: document.body.scrollHeight });
    });
    let hideshowpage = frame.querySelector('.eFileAction[option="hideshowpage"]');
    hideshowpage.addEventListener("click", async () => {
      hideshowpage.setAttribute("disabled", "");
      let [code] = await sendRequest("PUT", "lessons/rearrange/hide", null, { session: editor.session });
      hideshowpage.removeAttribute("disabled");
      if (code == 200) {
        dropdown.close();
      }
    });
    if (access < 5) {
      frame.querySelector('.eFileAction[option="deleteannotations"]').remove();
      hideshowpage.remove();
      let hideshowLine = frame.querySelector('.eFileLine[option="hideshow"]');
      if (hideshowLine != null) {
        hideshowLine.remove();
      }
      let deleteLesson = frame.querySelector('.eFileAction[option="deletelesson"]');
      if (userID == null) {
        deleteLesson.remove();
        frame.querySelector('.eFileLine[option="delete"]').remove();
      } else {
        deleteLesson.innerHTML = `<img src="./images/editor/file/delete.svg">Remove Lesson`;
      }
    }
    if (access < 1) {
      frame.querySelector('.eFileAction[option="ocr"]').remove();
    }
    if (editor.lesson.type == "freeboard") {
      find.remove();
      jumptop.remove();
      jump.remove();
      jumpend.remove();
      if (hideshowpage != null) {
        hideshowpage.remove();
      }
      frame.querySelector('.eFileLine[option="findjump"]').remove();
      let hideshowLine = frame.querySelector('.eFileLine[option="hideshow"]');
      if (hideshowLine != null) {
        hideshowLine.remove();
      }
    }
  }
}

modules["dropdowns/editor/rearrange"] = {
  html: `
  <button class="eRearrangeAction" option="movetotop" title="Move this page to the top."><img src="./images/editor/rearrange/uparrow.svg">Move to Top</button>
  <button class="eRearrangeAction" option="moveup" title="Move this page up one page."><img src="./images/editor/rearrange/up.svg">Move Up</button>
  <button class="eRearrangeAction" option="movedown" title="Move this page down one page."><img src="./images/editor/rearrange/down.svg">Move Down</button>
  <button class="eRearrangeAction" option="movetobottom" title="Move this page to the bottom."><img src="./images/editor/rearrange/downarrow.svg">Move to Bottom</button>
  <div class="eRearrangeLine"></div>
  <button class="eRearrangeAction" option="deletepageannotations" dropdown="dropdowns/editor/file/delete" title="Delete all annotations on this page." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Annotations</button>
  <button class="eRearrangeAction" option="deletepage" dropdown="dropdowns/editor/file/delete" title="Remove this page from the lesson." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Page</button>
  <div class="eRearrangeLine"></div>
  <button class="eRearrangeAction" option="hideshowpage" title="Hide this page for all members."><img src="./images/editor/rearrange/hideshow.svg">Hide Page</button>
  `,
  css: {
    ".eRearrangeAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eRearrangeAction:not(:last-child)": `margin-bottom: 4px`,
    ".eRearrangeAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: #fff; border-radius: 4px`,
    ".eRearrangeAction:hover": `background: var(--themeColor); color: #fff`,
    ".eRearrangeLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  },
  js: async function (frame, extra) {
    let editor = await getModule("pages/editor");
    let dropdown = await getModule("dropdown");
    let alert = await getModule("alert");
    let page = extra.button.parentElement;
    let movetotop = frame.querySelector('.eRearrangeAction[option="movetotop"]');
    let moveup = frame.querySelector('.eRearrangeAction[option="moveup"]');
    let movedown = frame.querySelector('.eRearrangeAction[option="movedown"]');
    let movetobottom = frame.querySelector('.eRearrangeAction[option="movetobottom"]');
    let hideshowpage = frame.querySelector('.eRearrangeAction[option="hideshowpage"]');
    frame.querySelector('.eRearrangeAction[option="deletepageannotations"]').setAttribute("pageid", page.getAttribute("pageid"));
    frame.querySelector('.eRearrangeAction[option="deletepage"]').setAttribute("pageid", page.getAttribute("pageid"));
    hideshowpage.setAttribute("pageid", page.getAttribute("pageid"));
    let hideButtons = () => {
      movetotop.setAttribute("disabled", "");
      moveup.setAttribute("disabled", "");
      movedown.setAttribute("disabled", "");
      movetobottom.setAttribute("disabled", "");
    }
    let showButtons = () => {
      movetotop.removeAttribute("disabled");
      moveup.removeAttribute("disabled");
      movedown.removeAttribute("disabled");
      movetobottom.removeAttribute("disabled");
    }
    let swapPages = async (pageOne, pageTwo) => {
      if (pageTwo == null || pageOne == null) {
        dropdown.close();
        return;
      }
      hideButtons();
      let moveAlert = await alert.open("info", "<b>Moving Pages</b><div>Processing page swap...", { time: "never" });
      let [code] = await sendRequest("PUT", "lessons/rearrange/swap?pageone=" + pageOne.getAttribute("pageid") + "&pagetwo=" + pageTwo.getAttribute("pageid"), null, { session: editor.session });
      showButtons();
      alert.close(moveAlert);
      if (code == 200) {
        dropdown.close();
      }
    }
    movetotop.addEventListener("click", async () => {
      hideButtons();
      let moveAlert = await alert.open("info", "<b>Moving Page</b><div>Moving page to the top...", { time: "never" });
      let [code] = await sendRequest("PUT", "lessons/rearrange/top?page=" + page.getAttribute("pageid"), null, { session: editor.session });
      showButtons();
      alert.close(moveAlert);
      if (code == 200) {
        dropdown.close();
        window.scrollTo({ top: 0 });
      }
    });
    moveup.addEventListener("click", async () => {
      swapPages(page, page.previousElementSibling);
    });
    movedown.addEventListener("click", async () => {
      swapPages(page, page.nextElementSibling);
    });
    movetobottom.addEventListener("click", async () => {
      hideButtons();
      let moveAlert = await alert.open("info", "<b>Moving Page</b><div>Moving page to the bottom...", { time: "never" });
      let [code] = await sendRequest("PUT", "lessons/rearrange/bottom?page=" + page.getAttribute("pageid"), null, { session: editor.session });
      showButtons();
      alert.close(moveAlert);
      if (code == 200) {
        dropdown.close();
        window.scrollTo({ top: document.body.scrollHeight });
      }
    });
    if (page.previousElementSibling == null && page.nextElementSibling == null) {
      frame.querySelector(".eRearrangeLine").remove();
      movetotop.remove();
      moveup.remove();
      movedown.remove();
      movetobottom.remove();
    } else {
      if (page.previousElementSibling == null) {
        movetotop.remove();
        moveup.remove();
      }
      if (page.nextElementSibling == null) {
        movedown.remove();
        movetobottom.remove();
      }
    }
    hideshowpage.addEventListener("click", async () => {
      hideshowpage.setAttribute("disabled", "");
      let [code] = await sendRequest("PUT", "lessons/rearrange/hide?page=" + page.getAttribute("pageid"), null, { session: editor.session });
      hideshowpage.removeAttribute("disabled");
      if (code == 200) {
        dropdown.close();
      }
    });
  }
}

modules["pages/editor/annotation"] = {
  findPage: async function (y) {
    let editor = await getModule("pages/editor");
    let pageHolder = editor.page.querySelector(".ePageHolder");
    for (let i = 0; i < editor.visiblePages.length; i++) {
      let pageElem = pageHolder.children[editor.visiblePages[i] - 1];
      if (pageElem == null) {
        continue;
      }
      let rect = pageElem.getBoundingClientRect();
      let margin = 4 * editor.zoom;
      if (editor.visiblePages[i] == 1) {
        //margin = 0;
      }
      if (rect.bottom - margin > y) {
        return [pageElem, editor.visiblePages[i]];
      }
    }
    let pageNum = editor.visiblePages[editor.visiblePages.length - 1];
    if (pageNum == 0) {
      return [pageHolder, 0];
    }
    return [pageHolder.children[pageNum - 1], pageNum];
  },
  scaleToDoc: async function (x, y, p) {
    let editor = await getModule("pages/editor");
    let pageHolder = editor.page.querySelector(".ePageHolder");
    if (p != null) {
      let pageElem = pageHolder;
      if (p > 0) {
        pageElem = pageHolder.children[p - 1];
      }
      let pageRect = pageElem.getBoundingClientRect();
      x -= pageRect.left;
      y -= pageRect.top;
    }
    let scaleZoom = 1 / editor.zoom;
    return {
      x: this.round(x * scaleZoom),
      y: this.round(y * scaleZoom)
    }
  },
  scaleToZoom: async function (x, y, p) {
    let editor = await getModule("pages/editor");
    let pageHolder = editor.page.querySelector(".ePageHolder");
    x *= editor.zoom;
    y *= editor.zoom;
    let pageElem = pageHolder;
    if (p > 0) {
      pageElem = pageHolder.children[p - 1];
    }
    let pageRect = pageElem.getBoundingClientRect();
    x += pageRect.left;
    y += pageRect.top;
    return { x, y };
  },
  round: function (num, places) {
    let pow = Math.pow(10, places || 2);
    return Math.ceil(num * pow) / pow;
  },
  tempID: function () {
    return "pending_" + randomString(10) + Date.now();
  },
  annoHolder: async function (pageID) {
    let editor = await getModule("pages/editor");
    let pageHolder = editor.page.querySelector(".ePageHolder");
    if (editor.lesson.type == "freeboard") {
      return pageHolder;
    }
    let page = pageHolder.querySelector('.ePage[pageid="' + pageID + '"]');
    if (page == null) {
      return pageHolder;
    }
    let holder = page.querySelector(".ePageAnnotations");
    if (holder == null) {
      page.insertAdjacentHTML("beforeend", `<div class="ePageAnnotations"></div>`);
      holder = page.querySelector(".ePageAnnotations");
    }
    return page.querySelector(".ePageAnnotations");
  },
  createSVG: function (parent, type) {
    let newSVG = document.createElementNS("http://www.w3.org/2000/svg", type);
    parent.appendChild(newSVG);
    return newSVG;
  },
  //SOFT_PIXEL_RESIZE: 250,
  //marginLeft: 250,
  //marginRight: 250,
  resetAnnotationSize: async function () {
    if (mouseDown() == true) {
      if (this.runResetEventReset != null) {
        return;
      }
      this.runResetEventReset = () => {
        this.resetAnnotationSize();
      };
      app.addEventListener("mouseup", this.runResetEventReset, { passive: false });
      app.addEventListener("touchend", this.runResetEventReset, { passive: false });
      return;
    }
    if (this.runResetEventReset != null) {
      app.removeEventListener("mouseup", this.runResetEventReset);
      app.removeEventListener("touchend", this.runResetEventReset);
      this.runResetEventReset = null;
    }
    this.farLeft = 0;
    this.farRight = 0;
    this.setLeftMargin = 0;
    this.setRightMargin = 0;
    this.farTop = 0;
    this.farBottom = 0;
    this.setTopMargin = 0;
    this.setBottomMargin = 0;
    let editor = await getModule("pages/editor");
    let annoKeys = Object.keys(editor.annotations);
    for (let i = 0; i < annoKeys.length; i++) {
      let anno = (editor.annotations[annoKeys[i]] || {}).render;
      if (anno != null) {
        await this.checkAnnotationSize(anno, true);
      }
    }
    this.checkAnnotationSize();
  },
  checkAnnotationSize: async function (anno, notUpdate) {
    let editor = await getModule("pages/editor");
    let contentFrame = editor.page.querySelector(".eContent");
    let content = contentFrame.querySelector(".eContentHolder");
    if (anno != null && anno.p != null) {
      /*
      if ((anno.getAttribute("anno") || "").startsWith("pending_") == true && anno.hasAttribute("done") == false) {
        return;
      }
      if (anno.hasAttribute("hidden") == true) {
        return;
      }
      let rect = anno.getBoundingClientRect();
      let parentRect = anno.parentElement.getBoundingClientRect();
      let left = -(rect.left - parentRect.left);
      let right = ((rect.left + anno.offsetWidth) - (parentRect.left + anno.parentElement.offsetWidth));
      */

      if (editor.exporting == true) {
        let page = editor.page.querySelector('.ePage[pageid="' + (anno.page || "") + '"]');
        if (page != null && page.hasAttribute("exporting") == false) {
          return;
        }
        if (getParam("no_expand") == "true") {
          return;
        }
      }

      if ((anno._id || "").startsWith("pending_") != true || anno.done == true) {
        if (anno.remove != true) {
          let annoHolder = await this.annoHolder(anno.page);
          let left = -anno.p[0];
          let right = anno.p[0] + anno.s[0] - annoHolder.offsetWidth;
          let top = -anno.p[1];
          let bottom = anno.p[1] + anno.s[0] - annoHolder.offsetHeight;
          if (left > this.farLeft) {
            this.setLeftMargin = Math.ceil(left / 400) * 400;
            this.farLeft = this.setLeftMargin - 120;
          }
          if (right > this.farRight) {
            this.setRightMargin = Math.ceil(right / 400) * 400;
            this.farRight = this.setRightMargin - 120;
          }
          if (editor.lesson.type == "freeboard") {
            if (top > this.farTop) {
              this.setTopMargin = Math.ceil(top / 400) * 400;
              this.farTop = this.setTopMargin - 120;
            }
            if (bottom > this.farBottom) {
              this.setBottomMargin = Math.ceil(bottom / 400) * 400;
              this.farBottom = this.setBottomMargin - 120;
            }
          }
        }
      }
    }
    if (notUpdate == true) {
      return;
    }
    if (mouseDown() == true) {
      if (this.runCheckSizeReset != null) {
        return;
      }
      this.runCheckSizeReset = () => {
        this.checkAnnotationSize(anno);
      };
      app.addEventListener("mouseup", this.runCheckSizeReset, { passive: false });
      app.addEventListener("touchend", this.runCheckSizeReset, { passive: false });
      return;
    }
    if (this.runCheckSizeReset != null) {
      app.removeEventListener("mouseup", this.runCheckSizeReset);
      app.removeEventListener("touchend", this.runCheckSizeReset);
      this.runCheckSizeReset = null;
    }
    //let pageHolder = editor.page.querySelector(".ePageHolder");
    let scrollPosX = window.scrollX;
    let scrollPosY = window.scrollY;
    //let contentLeft = pageHolder.getBoundingClientRect().left;
    let contentLeft = this.marginLeft || 0;
    let contentTop = this.marginTop || 0;
    this.marginLeft = (this.setLeftMargin * editor.zoom) + editor.addMargin;
    this.marginTop = (this.setTopMargin * editor.zoom) + editor.addMargin;
    content.style.marginLeft = (Math.ceil(this.marginLeft / 40) * 40) + "px";
    content.style.marginRight = (Math.ceil(((this.setRightMargin * editor.zoom) + editor.addMargin) / 40) * 40) + "px";
    if (editor.lesson.type == "freeboard") {
      content.style.marginTop = (Math.ceil(this.marginTop / 40) * 40) + "px";
      content.style.marginBottom = (Math.ceil(((this.setBottomMargin * editor.zoom) + editor.addMargin) / 40) * 40) + "px";
    }
    if (contentFrame.offsetWidth != this.lastOffsetWidth || contentFrame.offsetHeight != this.lastOffsetHeight) {
      window.scrollTo(scrollPosX + (this.marginLeft - contentLeft), scrollPosY + (this.marginTop - contentTop));
      if (editor.realtime.module && editor.realtime.module.adjustRealtimeHolder) {
        editor.realtime.module.adjustRealtimeHolder();
      }
      if (editor.updateZoom != null) {
        editor.updateZoom(true);
      }
    }
    this.lastOffsetWidth = contentFrame.offsetWidth;
    this.lastOffsetHeight = contentFrame.offsetHeight;
  },
  SVG_PADDING: 100, // How much padding svgs should have to ensure clean render
  render: async function (data, anno, long) {
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
    let editor = await getModule("pages/editor");
    let { _id, f, page, p, s, c, i, t, b, o, d, done, remove, sync, textfit, sig } = data;
    let [x, y] = p || [];
    let size = s || [];
    let [width, height] = [size[0], size[1]];
    if (page != null && editor.loadedIn.includes(page) == false && long != true) {
      return;
    }
    let annoHolder = await this.annoHolder(page);
    if (anno == null) {
      anno = editor.page.querySelector('.eAnnotation[anno="' + _id + '"]');
      if (anno != null) {
        let annotation = editor.annotations[anno.getAttribute("anno")] || {};
        if (annotation.pointer != null) {
          _id = annotation.pointer;
          anno.setAttribute("anno", _id);
        }
      }
    }
    if (anno != null && anno.parentElement != annoHolder) {
      annoHolder.appendChild(anno);
      let activeSelect = editor.page.querySelector('.eSelectActive[anno="' + _id + '"]');
      if (activeSelect != null) {
        annoHolder.appendChild(activeSelect);
      }
    }
    if (annoHolder.parentElement.parentElement.firstElementChild != annoHolder.parentElement) {
      y -= 4;
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
    let transform;
    let halfT = (t || 0) / 2;
    let text;
    let richText = d || {};
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
        if (_id != null) {
          anno.setAttribute("anno", _id);
        }
        width += t;
        height += t;
        x += halfT;
        y += halfT;
        anno.style.width = width + "px";
        anno.style.height = height + "px";
        anno.style.left = x + "px";
        anno.style.top = y + "px";
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
        if (_id != null) {
          anno.setAttribute("anno", _id);
          anno.style.opacity = 1;
        } else {
          anno.setAttribute("tooleditor", "");
          anno.style.opacity = .7;
        }
        anno.style.width = width + "px";
        anno.style.height = height + "px";
        anno.style.left = x + "px";
        anno.style.top = y + "px";
        text = anno.querySelector("div[edit]");
        if (_id != null) {
          text.removeAttribute("placeborder");
        } else {
          text.setAttribute("placeborder", "");
        }
        anno.style.setProperty("--themeColor", "#" + c);
        text.style.opacity = o / 100;
        text.style.fontSize = Math.floor(Math.max(Math.min(richText.s || 18, 250), 1)) + "px";
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
        text.style.textAlign = richText.al || "left";

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
          line.setAttribute("stroke-linecap", "round");
          line.setAttribute("stroke-linejoin", "round");
        }
        if (_id != null) {
          anno.setAttribute("anno", _id);
        }
        width += t;
        height += t;
        x += halfT;
        y += halfT;
        anno.style.width = width + "px";
        anno.style.height = height + "px";
        anno.style.left = x + "px";
        anno.style.top = y + "px";
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
        if (_id != null) {
          anno.setAttribute("anno", _id);
          anno.style.opacity = 1;
        } else {
          anno.setAttribute("tooleditor", "");
          anno.style.opacity = .7;
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
        anno.style.left = x + "px";
        anno.style.top = y + "px";
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
          elem.setAttribute("stroke", "#" + editor.darkenHex(c, 20));
        }
        if ((b || "solid") == "solid") {
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
          transform = "scale(-1,-1)";
        } else if (width < 0) {
          transform = "scale(-1,1)";
        } else if (height < 0) {
          transform = "scale(1,-1)";
        }
        if (elem != null) {
          elem.style.transform = transform;
        }
        break;
      case "sticky":
        if (anno == null) {
          annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" sticky new>
            <div holder>
              <div edit></div>
              <div footer>
                <div signature></div>
                <div reactions><button class="eReaction" dropdown="dropdowns/editor/tools/emojis" dropdowntitle="Reactions" noscrollclose><div imgholder><img src="./images/editor/actions/reaction.svg"></div></button></div>
              </div>
            </div>
          </div>`);
          anno = annoHolder.querySelector(".eAnnotation[new]");
          anno.removeAttribute("new");
        }
        if (_id != null) {
          anno.setAttribute("anno", _id);
          anno.style.opacity = 1;
        } else {
          anno.setAttribute("tooleditor", "");
          anno.style.opacity = .7;
        }
        anno.style.width = width + "px";
        anno.style.height = height + "px";
        anno.style.left = x + "px";
        anno.style.top = y + "px";
        anno.style.setProperty("--themeColor", "#" + c);
        text = anno.querySelector("div[edit]");
        if (_id != null) {
          text.removeAttribute("placeborder");
        } else {
          text.setAttribute("placeborder", "");
        }
        anno.style.setProperty("--themeColor", "#" + c);
        // Set Text Color:
        let redC = parseInt(c.substring(0, 2), 16); // hexToR
        let greenC = parseInt(c.substring(2, 4), 16); // hexToG
        let blueC = parseInt(c.substring(4, 6), 16); // hexToB
        let uicolors = [redC / 255, greenC / 255, blueC / 255];
        let outputC = uicolors.map((col) => {
          if (col <= 0.03928) {
            return col / 12.92;
          }
          return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        let factorC = (0.2126 * outputC[0]) + (0.7152 * outputC[1]) + (0.0722 * outputC[2]);
        anno.style.color = (factorC > 0.179) ? "#000" : "#fff";
        anno.style.textAlign = richText.al || "left";
        text.style.opacity = o / 100;
        let fontSize = Math.floor(Math.max(Math.min(richText.s || 16, 250), 1));
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
        let addReactionButton = reactionHolder.querySelector(".eReaction[dropdown]");
        let reactions = editor.reactions[_id];
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
                let emojiModule = await getModule("dropdowns/editor/tools/emojis");
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
      case "media":
        if (anno == null) {
          annoHolder.insertAdjacentHTML("beforeend", `<img class="eAnnotation" new></img>`);
          anno = annoHolder.querySelector(".eAnnotation[new]");
          anno.removeAttribute("new");
          /*
          let polygon = anno.querySelector("polygon");
          polygon.setAttribute("fill", "none");
          polygon.setAttribute("stroke-linecap", "round");
          polygon.setAttribute("stroke-linejoin", "round");
          */
        }
        if (_id != null) {
          anno.setAttribute("anno", _id);
          anno.style.opacity = 1;
        } else {
          anno.setAttribute("tooleditor", "");
          anno.style.opacity = .7;
        }
        anno.style.width = width + "px";
        anno.style.height = height + "px";
        anno.style.left = x + "px";
        anno.style.top = y + "px";
        
        anno.style.opacity = o / 100;

        if (editor.exporting != true) {
          if (d != null || anno.hasAttribute("src") == false) {
            if (d != null && d.startsWith("blob:") == false) {
              anno.src = assetURL + d;
            } else {
              anno.src = d || "./images/editor/uploading.png";
            }
          }
        } else {
          await new Promise(async (resolve) => {
            anno.addEventListener("load", resolve);
            if (d != null || anno.hasAttribute("src") == false) {
              if (d != null && d.startsWith("blob:") == false) {
                anno.src = assetURL + d;
              } else {
                anno.src = d || "./images/editor/uploading.png";
              }
            }
          });
        }
    }
    if (anno != null) {
      //console.log((sync || getEpoch()) - editor.lesson.created)
      anno.style.zIndex = Math.round(((sync || getEpoch()) / 2000000000000) * 2147483647);
      if (size[0] < 0 && size[1] < 0) {
        anno.style.transform = "scale(-1)";
      } else if (size[0] < 0) {
        anno.style.transform = "scale(-1,1)";
      } else if (size[1] < 0) {
        anno.style.transform = "scale(1,-1)";
      } else {
        anno.style.removeProperty("transform");
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
      }
    }
    if (_id != null) {
      if (long == true) {
        await this.resetAnnotationSize();
      } else {
        await this.checkAnnotationSize(data);
      }
    }
    return [data, anno];
  },
  removeAnnotation: async function (annoID, checkDone) {
    let editor = await getModule("pages/editor");
    let anno = editor.page.querySelector('.eAnnotation[anno="' + annoID + '"]');
    if (anno != null && (checkDone != true || anno.hasAttribute("done") == false)) {
      anno.remove();
    }
    let allSelections = [...editor.page.querySelectorAll('.eSelect[anno="' + annoID + '"]'), ...editor.page.querySelectorAll('.eSelectActive[anno="' + annoID + '"]')];
    for (let i = 0; i < allSelections.length; i++) {
      allSelections[i].remove();
    }
  },
  enableTimeout: async function (annoID, anno, render, collab) {
    if (anno == null) {
      return;
    }
    let editor = await getModule("pages/editor");
    let page = editor.page;
    clearTimeout(anno.expire);
    anno.expire = setTimeout(() => {
      if (anno.pending != null) {
        delete editor.annotations[anno.pending];
        delete anno.pending;
      }
      if (connected == false && collab != true) {
        return;
      }
      if (editor.page != page) {
        return;
      }
      /*
      if (editor.selecting[anno.render._id] != null) {
        return;
      }
      */
      if (anno.render._id.includes("pending_") == false) { // Means its a new anno
        delete anno.retry;
        if (anno.revert != null) {
          anno.render = anno.revert;
          delete anno.revert;
          this.render(anno.render, render);
        }
      } else {
        this.removeAnnotation(annoID);
        delete editor.annotations[annoID];
      }
      if (editor.updateZoom) {
        editor.updateZoom(false, true);
      }
    }, 10000); // Revert if no long update confirms save
  },
  saveEdit: async function (annoData, render, sync) {
    let editor = await getModule("pages/editor");
    let annoID = annoData._id;
    if (annoID == null) {
      return;
    }
    if (Object.keys(annoData).length < 2) {
      return; // Only the _id field, no changes
    }
    let anno = editor.annotations[annoID] || { render: {} };
    if (anno.pointer != null) {
      annoID = anno.pointer;
      anno = editor.annotations[annoID] || { render: {} };
    }
    anno.revert = anno.revert || JSON.parse(JSON.stringify(anno.render));
    objectUpdate(annoData, anno.render);
    /*
    if (Object.keys(mutations).length < 1) {
      return; // No changes, so no need to do anything
    }
    */
    this.enableTimeout(annoID, anno, render);
    editor.annotations[annoID] = anno;
    await this.render({ ...anno.render, sync: sync }, render);
    return annoData; //mutations;
  },
  pendingSaves: {},
  debounce: false,
  syncSave: async function () {
    let editor = await getModule("pages/editor");
    editor.updateSaveStatus("Saving...");
    if (this.debounce == true) {
      return;
    }
    this.debounce = true;
    let keys = Object.keys(this.pendingSaves);
    while (keys.length > 0) {
      if (connected == false) {
        break;
      }
      let setPendingSave = {};
      let mutations = [];
      for (let i = 0; i < keys.length; i++) {
        let mutt = this.pendingSaves[keys[i]];
        if (mutt.annoRefresh != null && mutt.annoRefresh.render != null) {
          mutt._id = mutt.annoRefresh.render._id;
          delete mutt.annoRefresh;
        }
        if (mutt.sig != null) {
          delete mutt.sig;
        }
        let anno = editor.annotations[mutt._id];
        if (anno != null && anno.pointer != null) {
          mutt._id = anno.pointer;
          anno = editor.annotations[mutt._id];
        }
        if (anno != null) {
          if (anno.render != null) {
            if (mutations.length > 249) {
              setPendingSave[mutt._id] = mutt;
              this.enableTimeout(anno.render._id, anno);
              continue;
            }
            delete anno.save;
            //mutt._id = anno.render._id;
            if (anno.retry > 0) {
              this.enableTimeout(anno.render._id, anno);
              anno.retry--;
            }
            if (mutt.f == null && mutt._id.startsWith("pending_") == true) {
              //Annotation is still being saved, try again later!
              //anno.retry = true;
              mutt.annoRefresh = anno;
              setPendingSave[mutt._id] = mutt;
              continue;
            }
            mutations.push(mutt);
          } else {
            delete editor.annotations[mutt._id];
          }
        }
      }
      this.pendingSaves = {};
      let saveSuccess = false;
      try {
        let [result] = await sendRequest("POST", "lessons/save", { mutations: mutations }, { session: editor.session });
        if (result == 200) {
          saveSuccess = true;
          editor.updateSaveStatus("Saved");
        }
      } catch (err) {
        console.log("SAVE ERROR:", err);
      }
      if (saveSuccess == false) { // If not saved, set to try again
        for (let i = 0; i < mutations.length; i++) {
          let anno = editor.annotations[mutations[i]._id];
          if (anno.retry == null) {
            anno.retry = 3;
          }
          if (anno != null && anno.retry > 0) {
            setPendingSave[mutations[i]._id] = mutations[i];
          }
        }
      }
      this.pendingSaves = { ...this.pendingSaves, ...setPendingSave };
      await sleep(2500); // 1 save per 2.5 seconds
      keys = Object.keys(this.pendingSaves);
    }
    if (connected == true) {
      editor.updateSaveStatus("Saved");
    }
    this.debounce = false;
  },
  save: async function (data, anno, sync) {
    data = JSON.parse(JSON.stringify(data));
    let editor = await getModule("pages/editor");
    let annoID = data._id;
    let annotation = editor.annotations[annoID] || { render: {} };
    if (annotation.pointer != null) {
      annoID = annotation.pointer;
      data._id = annoID;
      annotation = editor.annotations[annoID] || { render: {} };
    }

    let mutations = await this.saveEdit(data, anno, sync);
    if (mutations == null) {
      return; // Nothing new to send!
    }

    annotation.save = true; // Alert the system it's time to save
    annotation.render.sync = getEpoch();
    mutations.sync = annotation.render.sync;

    let member = editor.getSelf();
    if (member.user != null) {
      annotation.render.m = "user_" + member.user;
    } else {
      annotation.render.m = "temp_" + member._id;
    }

    let saveSync = { _id: annoID, ...(this.pendingSaves[annoID] || {}), ...mutations };
    if (connected == true) {
      this.pendingSaves[annoID] = saveSync;
      this.syncSave();
    } else {
      this.pendingSaves = {};
    }

    // Handle History
    /*
    let pushFields = {}; //JSON.parse(JSON.stringify(saveSync));
    let pushKeys = Object.keys(saveSync);
    for (let i = 0; i < pushKeys.length; i++) {
      pushFields[pushKeys[i]] = annotation.render[pushKeys[i]];
    }
    let lastHistory = this.history[this.history.length - 1];
    if (lastHistory != null) {
      if (lastHistory.sync == Math.floor(pushFields.sync / 1000)) {
        // Combine with last history:
        lastHistory.changes.push(pushFields);
      }
    }
    if (Object.keys(pushFields).length > 0) {
      this.history.push({
        type: "save",
        sync: Math.floor(pushFields.sync / 1000),
        changes: [pushFields]
      });
    }
    console.log(this.history);
    */

    return mutations;

    /*
    let storeID = "mutations_" + lessonID;
    if (data == null) {
      return;
    }
    let saveID = "pending_" + randomString(10) + Date.now();
    let storage = JSON.parse(getLocalStore(storeID) || "{}");
    storage[saveID] = JSON.stringify(data);
    setLocalStore(storeID, JSON.stringify(storage));
    */
  },
  forceShort: async function () {
    let editor = await getModule("pages/editor");
    if (editor.realtime.module == null) {
      return;
    }
    await editor.realtime.module.publishShort(null, null, true);
    editor.realtimeSelect = {};
  },
  getCurrentCaretPosition: function (element) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = window.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
        if (preCaretRange.endContainer.textContent == "") {
          position = "END";
        }
      }
    }
    return position;
  },
  createRange: function (node, chars, range) {
    if (!range) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }
    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (let lp = 0; lp < node.childNodes.length; lp++) {
          range = this.createRange(node.childNodes[lp], chars, range);
          if (chars.count === 0) {
            break;
          }
        }
      }
    }
    return range;
  },
  setCaretPosition: function (element, chars) {
    let selection = window.getSelection();
    let range = null;
    if (chars == "END") {
      range = this.createRange(element.lastChild);
    } else {
      range = this.createRange(element, { count: chars });
    }
    if (range != null) {
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  },
  history: [],
  location: -1,
  pushHistory: async function (type, changes, ignoreTime, caret) {
    //let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");

    if (utils.history.length > 100) {
      // If longer than 100, remove the first item to shrink under
      utils.history.shift();
      this.location--;
    }
    if (utils.location + 1 < utils.history.length) {
      // Clear out redo history once undo in past
      utils.history = utils.history.slice(0, utils.location + 1);
    }

    //console.log(type, changes);

    /*if (type == "remove") {
      for (let i = 0; i < changes.length; i++) {
        changes[i].revert = JSON.parse(JSON.stringify((editor.annotations[changes[i]._id] || {}).render || {}));
      }
    }*/
    let newChanges = JSON.parse(JSON.stringify(changes));

    let pushHistory = true;
    let lastHistory = utils.history[utils.location - 1];
    if (lastHistory != null && ignoreTime != true) {
      if (lastHistory.time > getEpoch() - 2000) { // 2 seconds
        let lastIDs = [];
        for (let i = 0; i < lastHistory.changes.length; i++) {
          lastIDs.push(lastHistory.changes[i]._id);
        }
        let conflicts = false;
        for (let i = 0; i < newChanges.length; i++) {
          if (lastIDs.includes(newChanges[i]._id) == false) {
            conflicts = true;
            break;
          }
          lastIDs.splice(lastIDs.indexOf(newChanges[i]._id), 1);
        }
        if (conflicts == false && lastIDs.length < 1) {
          lastHistory.changes = { ...lastHistory.changes, ...newChanges };
          pushHistory = false;
        }
      }
    }

    if (pushHistory == true) {
      let newHistory = {
        type: type,
        time: getEpoch(),
        changes: newChanges,
        redo: []
      };

      if (caret != null) {
        newHistory.caret = {
          undoElement: caret.undoElement,
          undoPosition: caret.undoPosition,
          //redoElement: caret.redoElement,
          //redoPosition: caret.redoPosition
        };
      }

      utils.history.push(newHistory);
      utils.location++;
    }

    if (utils.updateHistory != null) {
      utils.updateHistory();
    }
  }
};