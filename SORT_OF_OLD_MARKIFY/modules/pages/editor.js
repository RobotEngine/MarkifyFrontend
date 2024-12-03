modules["pages/editor"] = class {
  title = "Editor";
  preJs = function () {
    if ((getParam("lesson") ?? "").length < 1) {
      setFrame("pages/dashboard", app, { override: true });
      return false;
    }
  }
  html = `<div class="eMain">
    <div class="eTopHolder">
      <button class="eTopScroll eTopScrollLeft" style="left: 8px"><img src="./images/editor/top/leftarrow.svg"></button>
      <button class="eTopScroll eTopScrollRight" style="right: 8px"><img src="./images/editor/top/rightarrow.svg"></button>
      <div class="eTop" noscrollclose>
        <div class="eTopSection">
          <a class="eLogo" href="#dashboard"><img src="./images/logo.svg"></a>
          <div class="eFileNameHolder border"><div class="eFileName" spellcheck="false" onpaste="clipBoardRead(event)"></div></div>
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
        <button class="ePageNav" down><img src="./images/editor/bottom/uparrow.svg"></button>
        <div class="eCurrentPage border" contenteditable></div>
        <button class="ePageNav" up><img src="./images/editor/bottom/downarrow.svg"></button>
      </div>
    </div>
    <div class="eContent">
      <div class="eBackground"></div>
      <div class="eRealtime"></div>
      <div class="eContentHolder">
        <div class="ePageHolder"></div>
        <div class="eAddPagesHolder">
          <button class="eAddPagesButton largeButton" dropdown="dropdowns/new/lesson">Add Pages</button>
        </div>
      </div>
    </div>
    <div class="eObserveBorder"></div>
  </div>
  `;
  css = {
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
    ".eFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".eFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".eFileName::-webkit-scrollbar": `display: none`,
    //".eFileName:focus": `--borderWidth: 4px`,
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

    ".eContent": `position: relative; display: flex; flex-direction: column; width: fit-content; min-width: calc(100% - 132px); min-height: calc(100vh - 132px); padding: 66px; align-items: center; z-index: 0; overflow: hidden; pointer-events: all; --zoom: 1`,
    ".eBackground": `position: absolute; transform: scale(var(--zoom)); transform-origin: left top; background-image: url(./images/editor/backdrop.svg); background-position: center; opacity: .075`,
    ".eContentHolder": `position: relative`,
    ".ePageHolder": `position: relative; width: fit-content; height: fit-content; border-radius: 16px; transform-origin: 0 0; transform: scale(var(--zoom)); z-index: 1`,
    ".ePage": `position: relative; background: var(--pageColor); transition: .5s`,
    ".ePage::after": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: -1; content: ""; box-shadow: 0px 0px 8px 0px var(--shadowColor); border-radius: inherit`,
    ".ePage:first-child": `border-top-left-radius: 16px; border-top-right-radius: 16px`,
    ".ePage:not(:first-child)": `border-top: dashed var(--darkGray) 4px; border-image: url("./images/editor/border.svg") 10 / 1 / 0 space`,
    ".ePage:last-child": `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px`,
    ".ePage[hide] > *:not(.ePageHidden)": `transition: unset !important`, //filter: blur(4px) visibility: hidden
    ".ePageHidden": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(4px); justify-content: center; align-items: center; z-index: 1001`,
    ".ePageHiddenModal": `display: flex; flex-direction: column; max-width: calc(100% - 32px); max-height: calc(100% - 32px); padding: 8px; overflow: auto; background: var(--pageColor); box-shadow: 0px 0px 16px 0px var(--hover); border-radius: 16px; align-items: center`,
    ".ePageHiddenModal img": `padding: 12px; width: calc(100% - 24px); max-width: 80px`,
    ".ePageHiddenModalTitle": `font-size: 28px; font-weight: 700; color: var(--theme)`,
    ".ePageHiddenModalDesc": `margin: 8px 0; max-width: 450px`,
    ".ePageRevealButton": `display: flex; margin: 8px; z-index: 1; background: var(--theme); --borderRadius: 20.25px; color: #fff`,
    ".ePageContent": "width: 100%; height: 100%; background: var(--pageColor); opacity: 0; border-radius: inherit",
    ".ePageTextHolder": "width: 100% !important; height: 100% !important; --scale-factor: 4/3; position: absolute; left: 0; top: 0; font-family: sans-serif",
    ".ePageTextHolder span": "position: absolute; color: transparent; pointer-events: all; transform-origin: top left",
    ".ePageTextHolder br": `user-select: none`,
    ".ePageAnnotationHolder": `--scale-factor: 4/3; position: absolute; left: 0; top: 0; font-family: sans-serif`,
    ".ePageAnnotations": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 1; pointer-events: none`,
    ".content[enabled] .ePageAnnotations": `pointer-events: all`,
    ".eAddPagesHolder": `position: absolute; display: none; width: 100%; bottom: 0px; justify-content: center; padding-top: 20px`,
    ".eAddPagesButton": `display: flex; margin: 8px 0; z-index: 1; background: var(--theme); --borderRadius: 20.25px; color: #fff; pointer-events: all`,
    ".ePageRearrange": `position: absolute; display: flex; width: 28px; height: 28px; padding: 4px; right: 8px; bottom: 8px; pointer-events: all; z-index: 2; background: rgba(180, 218, 253, 0.75); backdrop-filter: blur(2px); border-radius: 18px; overflow: hidden`, //transform: scale(var(--fixedUIScale));
    ".ePageRearrange div": `margin-left: 6px`,

    ".eRealtime": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 100; overflow: hidden; pointer-events: none`
  };
  js = async function (page, joinData) {
    window.lesson = this;
    this.page = page;
    this.pageID = addTempListener({ type: "module", module: this }); // This will need to be cleared later on if multiple editors exist!
    page.setAttribute("moduleid", this.pageID);
    this.annotations = {};
    this.chunkAnnotations = {};
    this.reactions = {};
    this.addMargin = 100;
    this.zoom = 1;
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
          opacity: 100,
          filled: false
        },
        sticky: {
          color: {
            selected: "FADCA0",
            options: ["88B4FA", "F49CA9", "FADCA0", "E4B8FB", "A1D8AF", "F285B8", "666666"]
          },
          size: 16,
          align: "center"
        },
        page: {
          color: {
            selected: "2F2F2F",
            options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "2F2F2F"]
          },
          size: [824, 1064]
        },
        media: {},
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
      snapping: true,
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
      return this.members[this.sessionID] ?? {};
    };
    let lastAccess;

    this.utils = await this.loadModule("pages/editor/annotation");

    this.utils.pdfPageQueue = [];
    this.utils.pdfPageStorage = {};
    this.utils.pdfFileLoading = {};
    this.utils.runningPageRender = false;

    // EDITOR
    let contentHolder = page.querySelector(".eContent");
    let content = contentHolder.querySelector(".eContentHolder");
    let dotBackground = contentHolder.querySelector(".eBackground");
    let pageHolder = content.querySelector(".ePageHolder");
    let bottomHolder = page.querySelector(".eBottom");

    let saveStatus = page.querySelector(".eStatus");
    let realtimeHolder = page.querySelector(".eRealtime");
    let observeHolder = page.querySelector(".eObserveHolder");
    let observeTag = observeHolder.querySelector(".eObserve");
    let observeBorder = page.querySelector(".eObserveBorder");

    let eTop = page.querySelector(".eTop");
    let lessonName = eTop.querySelector(".eFileName");
    let eTopScrollLeft = page.querySelector(".eTopScrollLeft");
    let eTopScrollRight = page.querySelector(".eTopScrollRight");

    let addPagesHolder = contentHolder.querySelector(".eAddPagesHolder");

    let raiseHand = page.querySelector(".eHandRaise");

    this.updateInterface = async (keepDropdowns) => {
      let toolbar = page.querySelector(".eToolbar");
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

        lessonName.removeAttribute("contenteditable");
      } else {
        contentHolder.removeAttribute("viewer");
        toolbar.removeAttribute("hidden");
        if (addPagesHolder != null) {
          addPagesHolder.removeAttribute("hidden");
        }

        raiseHand.setAttribute("hidden", "");

        if (access > 3) {
          lessonName.setAttribute("contenteditable", "");
        }
      }
      /*
      if (this.realtime.observing != null) {
        toolbar.setAttribute("hidden", "");
        toolbar.offsetHeight;
        toolbar.style.transition = ".3s";
      }
      */
      /*if (this.realtime.observing != null) {
        toolbar.setAttribute("disabled", "");
      } else {
        toolbar.removeAttribute("disabled");
      }*/
      if (access < 2) {
        share.style.display = "none";
      } else {
        share.style.display = "flex";
      }
      if (keepDropdowns != true) {
        (await this.loadModule("dropdown")).close();
      }
      if (this.utils.updateHistory != null) {
        this.utils.updateHistory();
      }
    };
    this.hexToRGB = (hex, alpha) => {
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
    this.textColorBackground = (bgColor) => {
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

    let enableScrollTop = () => {
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
          break;
        }
      }
      if (saved == false) {
        event.preventDefault();
        event.returnValue = "";
      }
      /*if (Object.keys(this.utils.pendingSaves).length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }*/
    });
    closeCallback = () => {
      this.realtime.strength = 1;
      if (this.realtime.module) {
        this.realtime.module.connectUpdate();
      }
      this.updateSaveStatus("Reconnecting...");
    }

    this.setFrame("editor/toolbar", page.querySelector(".eToolbar"));

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

    let lessonID = getParam("lesson") ?? "";
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
      enableScrollTop();
      if (this.realtime.module != null && this.realtime.module.checkSpotlightUpdate != null) {
        this.realtime.module.checkSpotlightUpdate();
      }
    }

    this.members = {};
    this.collaborators = {};

    let removeRealtimeElem = (userid) => {
      if (this.realtime.module != null && this.realtime.module.removeRealtime != null) {
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
              this.recentEmojis = data.data ?? [];
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
    this.sources = {};
    this.loadingSources = {};
    this.sourceRenders = {};

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

    let alertModule = await this.loadModule("alert");
    let dropdownModule = await this.loadModule("dropdown");
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
          let collaborator = this.collaborators[body.modify];
          if (collaborator != null) {
            collaborator.name = body.name;
            collaborator.color = body.color;
            collaborator.email = body.email;
            if (body.hasOwnProperty("image") == true) {
              collaborator.image = body.image;
            }
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
                      alertModule.open("warning", "<b>Observing Ended</b>The member your observing is no longer an editor.");
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
                  //this.realtime.module.exitObserve(); // Exit observe mode
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
                (await this.loadModule("alert")).open("warning", "<b>Observing Ended</b>The member you where observing has too weak a connection, try again later...");
              }
            }
            if (body.observe != null && this.realtime.observing == body._id) {
              this.realtime.module.exitObserve();
              (await this.loadModule("alert")).open("warning", "<b>Observing Ended</b>The member your observing started watching someone.");
            }

            // Update observe:
            if (this.realtime.observing == body._id && this.realtime.module != null) {
              observeTag.style.background = member.color;
              observeTag.style.color = this.textColorBackground(member.color);
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
            let collaborator = this.collaborators[member.modify];
            if (collaborator != null) {
              if (body.name != null) {
                collaborator.name = body.name;
              }
              if (body.email != null) {
                collaborator.email = body.email;
              }
              if (body.hasOwnProperty("image") == true) {
                collaborator.image = body.image;
              }
            }

            // Member viewer update:
            if (this.getSelf().access > 3) {
              let makeViewerButton = contentHolder.querySelector('.eSelectBar .eSubToolCollaboratorHolder button[member="' + member._id + '"]');
              if (makeViewerButton != null) {
                this.updateMakeViewerButton();
              }
            }
          }
          break;
        case "set":
          objectUpdate(body, this.lesson);
          let setName = this.lesson.name ?? "Untitled Lesson";
          if (document.activeElement.closest(".eFileName") == null) {
            lessonName.textContent = setName;
            lessonName.title = setName;
          }
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
            if (body.settings.disabled != null && this.toolbar != null) {
              this.toolbar.checkToolToggle();
            }
            if (body.settings.hasOwnProperty("anonymousMode")) {
              if (body.settings.anonymousMode == true) {
                content.setAttribute("anonymous", "");
              } else {
                content.removeAttribute("anonymous");
              }
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
          if (this.realtime.module != null) {
            this.realtime.module.adjustRealtimeHolder();
          }
          if (this.updateZoom) {
            this.updateZoom(true);
          }
          enableScrollTop();
          break;
        case "addsources":
          this.sources = { ...this.sources, ...getObject(body.sources ?? [], "_id") };
          break;
        case "addpages":
          pages = { ...pages, ...getObject(body.pages ?? [], "_id") };
          sources = { ...sources, ...getObject(body.sources ?? [], "_id") };
          await this.addSources(data.data.sources ?? []);
          await this.addPages(data.data.pages ?? []);
          await this.updatePages();
          await this.setZoom();
          await this.utils.setMarginSize();
          this.updateChunks();
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
            let render = anno.revert ?? anno.render ?? {};
            if (data.data.page != null && render.page != data.data.page) {
              continue;
            }
            if (render.f == "page") { // Only if not page annotation!
              continue;
            }
            if (render.sync < data.data.sync) {
              anno.render.remove = true;
              await this.utils.render(anno.render, null, true);
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
              if ((anno.render ?? anno.revert ?? {}).page == data.data.page) {
                delete this.annotations[annoKeys[i]];
              }
            }
            this.updatePages();
            await this.setZoom();
            await this.utils.setMarginSize();
            this.updateChunks();
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
          this.updateChunks();
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
            this.updateChunks();
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
            this.updateChunks();
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
          this.updateChunks();
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
            this.reactions[body.reaction.annotation] = this.reactions[body.reaction.annotation] ?? [];
            let annotationReactions = this.reactions[body.reaction.annotation];
            if (body.change != null) {
              if (this.getSelf().modify == body.member._id) {
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
            await this.utils.render(this.annotations[body.reaction.annotation].render);
            if (this.selecting[body.reaction.annotation] != null && this.newReactionUpdate != null) {
              this.newReactionUpdate(body);
            }
          }
          break;
        case "spotlight":
          if (this.realtime.module == null) {
            return;
          }
          if (body.member == this.sessionID) {
            return;
          }
          if (body.member == this.realtime.observing) {
            return;
          }
          let member = this.members[body.member];
          if (member == null) {
            return;
          }
          if (this.realtime.strength < 3) {
            return;
          }
          if (member.observe != null) {
            member.observe = null;
          }
          if (member.weak == true) {
            return;
          }
          let prevObserve = this.realtime.observing;
          this.realtime.observing = body.member;
          this.realtime.module.setShortSub(this.visibleChunks);
          if (this.realtime.module.observeButtonUpdate != null) {
            this.realtime.module.observeButtonUpdate();
          }
          alertModule.close(this.realtime.observeLoading);
          clearTimeout(this.realtime.observeTimeout);
          let [code] = await sendRequest("GET", "lessons/members/observe?member=" + body.member, null, { session: this.session });
          if (code == 200) {
            this.realtime.observeLoading = await alertModule.open("info", `<b>Connecting to Member</b>Connecting to ${member.name}'s screen from spotlight!`, { time: "never" });
            this.realtime.observeTimeout = setTimeout(() => {
              alertModule.close(this.realtime.observeLoading);
              alertModule.open("error", `<b>Observe Timeout</b>Failed to connect to their screen, please try again later...`);
              this.realtime.module.exitObserve();
            }, 20000);
          } else {
            if (prevObserve != null) {
              this.realtime.observing = prevObserve;
              this.realtime.module.exitObserve();
            }
            this.realtime.observing = null;
            this.realtime.module.setShortSub(this.visibleChunks);
            this.realtime.module.observeButtonUpdate();
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
      if (this.exporting == true) {
        return;
      }
      let redrawActionUI = false;
      for (let i = 0; i < data.length; i++) {
        let anno = data[i];
        let existingAnno = this.annotations[anno._id] ?? this.annotations[anno.pending];
        if (existingAnno != null) {
          // RUNS FOR EACH ANNOTATION IN LONG

          /*
          if (anno.remove == true) {
            this.utils.removeAnnotation(anno._id);
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
            for (let i = 0; i < this.utils.history.length; i++) {
              let event = this.utils.history[i];
              for (let c = 0; c < event.changes.length; c++) {
                let change = event.changes[c];
                if (change._id == anno.pending) {
                  change._id = anno._id;
                }
                if (change.parent == anno.pending) {
                  change.parent = anno._id;
                }
              }
              for (let c = 0; c < event.redo.length; c++) {
                let change = event.redo[c];
                if (change._id == anno.pending) {
                  change._id = anno._id;
                }
                if (change.parent == anno.pending) {
                  change.parent = anno._id;
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

            // Update Chunk IDs:
            for (let i = 0; i < existingAnno.chunks.length; i++) {
              let chunk = this.chunkAnnotations[existingAnno.chunks[i]];
              if (chunk != null) {
                chunk[anno._id] = "";
                delete this.chunkAnnotations[existingAnno.chunks[i]][anno.pending];
              }
            }

            await this.utils.enableTimeout(anno._id, existingAnno, gottenRender);
            await this.utils.setMarginSize();
          }
          if (this.selecting[anno.pending] != null) {
            this.selecting[anno._id] = JSON.parse(JSON.stringify(this.selecting[anno.pending]));
            delete this.selecting[anno.pending];

            if (this.toolbar != null) {
              let selectionIDs = Object.keys(this.selecting);
              this.toolbar.cursor.lastSelections = "";
              for (let i = 0; i < selectionIDs.length; i++) {
                this.toolbar.cursor.lastSelections += selectionIDs[i];
              }
            }
          }
          if (this.selecting[anno._id] != null && this.toolbar != null) {
            redrawActionUI = true;
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
          //clearTimeout(existingAnno.expire);
          delete existingAnno.revert;
          //objectUpdate(existingAnno.render, anno);
          await this.annotationChunks(existingAnno);
          this.updateAnnotationPages(anno);
          let allowRender = renderObj.remove == true;
          for (let i = 0; i < existingAnno.chunks.length; i++) {
            if (this.visibleChunks.includes(existingAnno.chunks[i]) == true) {
              allowRender = true;
              break;
            }
          }
          if (allowRender == true) {
            this.utils.render(renderObj, gottenRender, true);
          }
        } else {
          this.annotations[anno._id] = { render: anno };
          existingAnno = this.annotations[anno._id];
          await this.annotationChunks(existingAnno);
          this.updateAnnotationPages(anno);
          let allowRender = anno.remove == true;
          for (let i = 0; i < existingAnno.chunks.length; i++) {
            if (this.visibleChunks.includes(existingAnno.chunks[i]) == true) {
              allowRender = true
              break;
            }
          }
          if (allowRender == true) {
            this.utils.render(anno, null, true);
          }
        }
      }
      if (this.updateZoom) {
        await this.updateZoom(null, null, true);
      }
      if (redrawActionUI == true && this.toolbar != null) {
        this.toolbar.cursor.redrawActionUI(true, true);
        //this.toolbar.cursor.redrawActionUI();
      }
    }; // Subscribe to long, server updates.

    let sendBody = { ss: socket.secureID };
    if (this.active == false) {
      sendBody.active = false;
    }
    if (this.id != lessonID) {
      delete this.session;
    }
    joinData = joinData ?? {};
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
    let paramSession = getParam("member_session") ?? "";
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
    this.lesson.settings = this.lesson.settings ?? {};

    this.folder = body.folder;

    if (this.lesson.pin) {
      this.codeTextButton.style.display = "unset";
      this.codeTextButton.textContent = this.lesson.pin;
    }
    if (this.lesson.settings.anonymousMode == true) {
      content.setAttribute("anonymous", "");
    }

    this.sessionID = body.session._id;
    this.sessionToken = body.session.token;
    this.session = this.sessionID + ";" + this.sessionToken;

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
        path += "?" + params.join("&");
      }
      sentPing = true;
      let [code] = await sendRequest("GET", path, null, { session: this.session, allowError: [403] });
      if (code == 403) {
        if (sendBody.pin != null) {
          setFrame("pages/join"); // Send back to join page
        } else {
          setFrame("pages/editor"); // Refresh to rejoin
        }
      } else if (code != 200 && code != 0 && code != null) {
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

    addTempListener({
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

    page.querySelector(".eLogo").addEventListener("click", (event) => {
      event.preventDefault();
      this.utils.syncSave(true);
      setFrame("pages/dashboard");
    });
    lessonName.textContent = this.lesson.name ?? "Untitled Lesson";
    lessonName.title = lessonName.textContent;
    document.title = lessonName.textContent + " | Markify";
    lessonName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        lessonName.blur();
        return;
      }
      enableScrollTop();
    });
    lessonName.addEventListener("focusout", async () => {
      lessonName.style.removeProperty("padding");
      lessonName.style.removeProperty("overflow-x");
      lessonName.style.removeProperty("text-overflow");
      lessonName.scrollTo(0, 0);
      lessonName.parentElement.style.setProperty("--borderWidth", "0px");
      enableScrollTop();

      let name = lessonName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        lessonName.textContent = this.lesson.name;
        return;
      }
      if (lessonName.textContent == this.lesson.name) {
        return;
      }
      lessonName.textContent = name;
      lessonName.title = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.session });
      if (code != 200) {
        lessonName.textContent = this.lesson.name;
        lessonName.title = this.lesson.name;
      }
    });
    lessonName.addEventListener("focus", async () => {
      lessonName.style.padding = "4px 6px";
      lessonName.style.overflowX = "auto";
      lessonName.style.textOverflow = "unset";
      lessonName.parentElement.style.setProperty("--borderWidth", "4px");
      enableScrollTop();
    });

    // Determine Chunks
    this.visibleChunks = [];
    this.chunkWidth = 2000;
    this.chunkHeight = 2000;
    this.regionInChunks = (topx, topy, bottomx, bottomy) => {
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
    this.annotationInChunks = (render, includeSelecting) => {
      let [x, y] = this.getAbsolutePosition(render, includeSelecting);
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
      
      return this.regionInChunks(x, y, x + width, y + height);
    }
    this.annotationChunks = async (annotation, includeSelecting) => {
      if (annotation == null) {
        return;
      }
      let render = annotation.render;
      let chunks = [];

      if (render != null && render.remove != true) {
        let [x, y] = this.getAbsolutePosition(render, includeSelecting);
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
        
        chunks = this.regionInChunks(x, y, x + width, y + height);
      }
      let annotationVisible = false;
      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        if (this.chunkAnnotations[chunk] == null) {
          this.chunkAnnotations[chunk] = {};
          await utils.setMarginSize();
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
              await utils.setMarginSize();
            }
          }
        }
      }
      annotation.chunks = chunks;
      
      if (annotationVisible == true) {
        if (annotation.element == null) {
          await utils.render(render);
        }
      } else {
        if (annotation.element != null) {
          annotation.element.remove();
          annotation.element = null;
        }
      }
    }
    this.pointInChunk = (x, y) => {
      return this.regionInChunks(x, y, x, y)[0];
    }

    let scrollOffset = 66;
    let pageTextBox = bottomHolder.querySelector(".eCurrentPage");
    //let pageBoxFocus = false;
    let alreadyRunningFocus = false;

    this.annotationPages = [];
    this.currentPage = 1;
    let pageParam = getParam("page");

    this.updateCurrentPageInterface = () => {
      pageTextBox.innerHTML = "<b>" + this.currentPage + "</b> / " + this.annotationPages.length;
      if (this.currentPage > this.annotationPages.length - 1) {
        bottomHolder.querySelector(".ePageNav[down]").setAttribute("disabled", "");
      } else {
        bottomHolder.querySelector(".ePageNav[down]").removeAttribute("disabled");
      }
      if (this.currentPage < 2) {
        bottomHolder.querySelector(".ePageNav[up]").setAttribute("disabled", "");
      } else {
        bottomHolder.querySelector(".ePageNav[up]").removeAttribute("disabled");
      }
    }
    this.updateCurrentPage = () => {
      let activeElement = document.activeElement;
      if (activeElement != null) {
        let currentPageBox = activeElement.closest(".eCurrentPage");
        if (currentPageBox == pageTextBox) {
          return;
        }
      }
      let pageRect = pageHolder.getBoundingClientRect();
      let centerPointX = ((fixed.offsetWidth / 2) - pageRect.left) / this.zoom;
      let centerPointY = ((fixed.offsetHeight / 2) - pageRect.top) / this.zoom;
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
      if (minPage > 0) {
        this.currentPage = minPage;
        this.updateCurrentPageInterface();
        bottomHolder.style.display = "flex";
      } else {
        bottomHolder.style.display = "none";
      }
      modifyParams("page", minPageId);
    }

    this.updateAnnotationPages = (anno) => {
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
        let position = this.getAbsolutePosition(anno);
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
        /*this.annotationPages.sort((a, b) => {
          // Calculate top and bottom bounds
          let aTop = a[1][1] - a[2][1];
          let bTop = b[1][1] - b[2][1];

          // Compare by Y bounds first
          console.log(aTop, bTop)
          if (Math.abs(aTop - bTop) > Math.min(a[2][1], b[2][1]) / 2) {
            return aTop - bTop;
          }

          // If they're in the same row, compare by X bounds
          let aLeft = (a[1][0] - a[2][0]) / 2;
          let bLeft = (b[1][0] - b[2][0]) / 2;
          return aLeft - bLeft;
        });*/
      }
      this.updateCurrentPage();
    }

    this.getAbsolutePosition = (anno, includeSelecting) => {
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
    this.getRelativePosition = (anno, includeSelecting) => {
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
    this.parentFromAnnotation = (anno, types, insert, includeSelecting) => {
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
      /*let thick = 0;
      if (anno.t != null) {
        if (anno.b != "none" || anno.d == "line") {
          thick = anno.t;
        }
      }*/
      let x = anno.p[0];// + (anno.s[0] / 2) + thick;
      let y = anno.p[1];// + (anno.s[1] / 2) + thick;
      let index = anno.l ?? 0;
      let chunk = this.pointInChunk(x, y);
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
        let [parentX, parentY] = this.getAbsolutePosition(render, includeSelecting);
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
    this.parentFromPoint = (x, y, index, types) => {
      return this.parentFromAnnotation({ p: [x, y], l: index }, types);
    }
    this.applyRelativePosition = (anno) => {
      let [setX, setY] = this.getRelativePosition(anno);
      anno.p = [setX, setY];
      return anno;
    }

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
        /*let element = pageHolder.querySelector('.eAnnotation[anno="' + annotation.render._id + '"]');
        if (element != null) {
          element.remove();
        }*/
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
          /*if (annotation.render.parent == null && this.exporting != true) {
            this.utils.render(annotation.render);
          } else {
            await this.utils.render(annotation.render);
          }*/
        }
      }
      let renderedNewAnnoIDs = {};
      while (renderAnnotationAnnos.length > 0) {
        for (let i = 0; i < renderAnnotationAnnos.length; i++) {
          let newRender = renderAnnotationAnnos[i];
          if (renderAnnotationIDs[newRender.parent] == null || renderedNewAnnoIDs[newRender.parent] != null) {
            this.utils.render(newRender);
            renderedNewAnnoIDs[newRender._id] = true;
            renderAnnotationAnnos.splice(i, 1);
            i--;
          }
        }
        await sleep(1); // Just to be safe
      }
      alreadyRunningUpdateCycle = false;
    }
    let loadedChunkedAnnotations = false;
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
      dotBackground.style.backgroundSize = dotSize + "px " + dotSize + "px";
      let scaledDotSize = dotSize * this.zoom;
      let backgroundWidth = Math.ceil((fixed.offsetWidth + (scaledDotSize * 4)) / scaledDotSize) * scaledDotSize;
      let backgroundHeight = Math.ceil((fixed.offsetHeight + (scaledDotSize * 4)) / scaledDotSize) * scaledDotSize;
      dotBackground.style.width = (backgroundWidth / this.zoom) + "px";
      dotBackground.style.height = (backgroundHeight / this.zoom) + "px";
      let pageRect = pageHolder.getBoundingClientRect();
      let originCorrectX = (pageRect.left - (backgroundWidth / 2)) % scaledDotSize;
      let originCorrectY = (pageRect.top - (backgroundHeight / 2)) % scaledDotSize;
      dotBackground.style.left = (window.scrollX + originCorrectX - (scaledDotSize * 2)) + "px";
      dotBackground.style.top = (window.scrollY + originCorrectY - (scaledDotSize * 2)) + "px";
      
      if (this.zooming == true || loadedChunkedAnnotations != true) {
        return;
      }
      let beforeChunks = JSON.stringify(this.visibleChunks);
      this.visibleChunks = this.regionInChunks(
        ((fixed.offsetWidth / -2) - pageRect.left) / this.zoom,
        ((fixed.offsetHeight / -2) - pageRect.top) / this.zoom,
        ((fixed.offsetWidth + (fixed.offsetWidth / 2)) - pageRect.left) / this.zoom,
        ((fixed.offsetHeight + (fixed.offsetHeight / 2)) - pageRect.top) / this.zoom
      );
      /* if (this.exporting != true) {
        this.visibleChunks = this.regionInChunks(
          ((fixed.offsetWidth / -2) - pageRect.left) / this.zoom,
          ((fixed.offsetHeight / -2) - pageRect.top) / this.zoom,
          ((fixed.offsetWidth + (fixed.offsetWidth / 2)) - pageRect.left) / this.zoom,
          ((fixed.offsetHeight + (fixed.offsetHeight / 2)) - pageRect.top) / this.zoom
        );
      } else {
        this.visibleChunks = Object.keys(this.chunkAnnotations);
      } */
      if (beforeChunks != JSON.stringify(this.visibleChunks)) {
        this.runUpdateCycle();
      }
      
      clearTimeout(updatePageTimeout);
      updatePageTimeout = setTimeout(this.updateCurrentPage, 100);
      clearTimeout(updateSubTimeout);
      updateSubTimeout = setTimeout(() => {
        if (this.realtime.module != null) {
          this.realtime.module.setShortSub(this.visibleChunks);
        }
      }, 750);
    }
    tempListen(window, "scroll", this.updateChunks);
    tempListen(window, "resize", this.updateChunks);

    let centerWindowWithPage = () => {
      if (this.exporting == true) {
        return;
      }
      let pageRect = pageHolder.getBoundingClientRect();
      //window.scrollTo(window.scrollX + pageRect.left - ((fixed.offsetWidth - pageHolder.offsetWidth) / 2), window.scrollY + pageRect.top - ((fixed.offsetHeight - pageHolder.offsetHeight) / 2)); //window.scrollY + pageRect.top - 66
      window.scrollTo(window.scrollX + pageRect.left - ((fixed.offsetWidth - pageHolder.offsetWidth) / 2), window.scrollY + pageRect.top - scrollOffset);
    }

    // Resync unsaved annotations:
    if (window.resync != null && window.resync.lesson == lessonID && this.getSelf().access > 0) {
      let resyncKeys = Object.keys(window.resync.annotations);
      for (let i = 0; i < resyncKeys.length; i++) {
        let anno = window.resync.annotations[resyncKeys[i]];
        if (anno.save == true && (anno.render._id.includes("pending_") == false || anno.render.remove != true)) {
          delete anno.expire;
          this.annotations[anno.render._id] = anno;
          this.utils.pendingSaves[anno.render._id] = { ...this.utils.pendingSaves[anno.render._id], ...anno.render };
        }
      }
      this.utils.syncSave(true);
    }
    window.resync = { lesson: lessonID, annotations: this.annotations };
    
    this.sources = { ...this.sources, ...getObject(body.sources ?? [], "_id") };
    //pageHolder.remove();
    addPagesHolder.remove();
    addPagesHolder = null;
    pageHolder.style.width = "1px";
    pageHolder.style.height = "1px";
    //this.updatePageSize = () => {
      //pageHolder.style.width = fixed.offsetWidth - 332 + "px";
      //pageHolder.style.height = fixed.offsetHeight - 332 + "px";
    //}
    pageHolder.style.pointerEvents = "none";
    let resetTimeout;
    tempListen(window, "resize", () => {
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        //this.updatePageSize();
        if (this.exporting != true) {
          this.addMargin = Math.max(fixed.offsetWidth, fixed.offsetHeight) / 2; // Was 100 for some reason???
        }
        this.utils.setMarginSize();
      }, 500);
    });
    let updateScroll = () => {
      if (this.scrollEvent) {
        this.scrollEvent();
      }
    }
    tempListen(window, "scroll", updateScroll);
    tempListen(window, "resize", updateScroll);
    //this.updatePageSize();
    this.visiblePages = [0];
    //await this.viewAnnotations();
    //this.utils.resetAnnotationSize();

    let updateAnnotationScroll = (page, animation) => {
      if (page == null) {
        return;
      }
      this.updateCurrentPageInterface();
      let annoID = page[0];
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
        let position = this.getAbsolutePosition(render);
        let pageRect = pageHolder.getBoundingClientRect();
        let options = {};
        if ((render.s[0] + (thickness * 2)) * this.zoom < fixed.offsetWidth - (scrollOffset * 2)) {
          // Position page to center:
          options.left = pageRect.left + window.scrollX - (fixed.offsetWidth / 2) + ((position[0] + (render.s[0] / 2) + thickness) * this.zoom);
        } else {
          // Position page to left corner:
          options.left = pageRect.left + window.scrollX - scrollOffset + (position[0] * this.zoom);
        }
        if ((render.s[1] + (thickness * 2)) * this.zoom < fixed.offsetHeight - (scrollOffset * 2)) {
          // Position page to center:
          options.top = pageRect.top + window.scrollY - (fixed.offsetHeight / 2) + ((position[1] + (render.s[1] / 2) + thickness) * this.zoom);
        } else {
          // Position page to left corner:
          options.top = pageRect.top + window.scrollY - scrollOffset + (position[1] * this.zoom);
        }
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
      this.currentPage++;
      updateAnnotationScroll(this.annotationPages[this.currentPage - 1]);
    });
    bottomHolder.querySelector(".ePageNav[up]").addEventListener("click", () => {
      this.currentPage--;
      updateAnnotationScroll(this.annotationPages[this.currentPage - 1]);
    });
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
        } else if (textInt > this.annotationPages.length) {
          event.preventDefault();
          textBoxError(pageTextBox, "Maximum of page number " + this.annotationPages.length);
        } else if (textInt < 1) {
          event.preventDefault();
          textBoxError(pageTextBox, "Minimum of the first page");
        }
      }
    });
    pageTextBox.addEventListener("focusout", (event) => {
      //pageBoxFocus = false;
      if (pageTextBox.textContent == "") {
        pageTextBox.innerHTML = "<b>" + this.currentPage + "</b> / " + this.annotationPages.length;
        return;
      }
      let setPage = parseInt(pageTextBox.textContent) ?? 1;
      pageTextBox.innerHTML = "<b>" + setPage + "</b> / " + this.annotationPages.length;
      updateAnnotationScroll(this.annotationPages[setPage - 1], false);
    });
    bottomHolder.style.display = "none";

    // Fetch Annotations
    let checkForJumpLink = getParam("annotation");
    let asyncLoadAnnotations = async () => {
      let [annoCode, annoBody] = await sendRequest("GET", "lessons/join/annotations", null, { session: this.session }, { allowError: true });
      if (annoCode != 200 && connected == true) {
        (await this.loadModule("alert")).open("error", `<b>Error Loading Annotations</b>Please try again later...`);
        return;
      }
      for (let i = 0; i < annoBody.annotations.length; i++) {
        let addAnno = annoBody.annotations[i];
        let existingAnno = this.annotations[addAnno._id];
        if (existingAnno == null || existingAnno.render.sync < addAnno.sync) {
          this.annotations[addAnno._id] = { render: addAnno };
        }
      }
      for (let i = 0; i < annoBody.annotations.length; i++) {
        let existingAnno = this.annotations[annoBody.annotations[i]._id];
        if (existingAnno != null) {
          await this.annotationChunks(existingAnno);
          this.updateAnnotationPages(existingAnno.render);
        }
      }
      if (annoBody.reactions != null) {
        let reactedToObject = getObject(annoBody.reactedTo ?? [], "_id");
        let userCheckSelf = this.getSelf();
        for (let i = 0; i < annoBody.reactions.length; i++) {
          let addReaction = annoBody.reactions[i];
          let existingAnnoRecord = this.reactions[addReaction.annotation];
          if (existingAnnoRecord == null) {
            this.reactions[addReaction.annotation] = [];
            existingAnnoRecord = this.reactions[addReaction.annotation];
          }
          delete addReaction.annotation;
          if (reactedToObject[addReaction._id + "_" + userCheckSelf.modify] != null) {
            addReaction.reacted = true;
          }
          existingAnnoRecord.push(addReaction);
        }
      }
      //await this.viewAnnotations();
      loadedChunkedAnnotations = true;
      /*let loadChunkedAnnotations = {};
      for (let i = 0; i < this.visibleChunks.length; i++) {
        loadChunkedAnnotations = { ...loadChunkedAnnotations, ...(this.chunkAnnotations[this.visibleChunks[i]] ?? {}) };
      }
      let chunkAnnos = Object.keys(loadChunkedAnnotations);
      for (let a = 0; a < chunkAnnos.length; a++) {
        await this.utils.render((this.annotations[chunkAnnos[a]] || {}).render);
      }*/
      
      await this.utils.setMarginSize();
      let jumpAnnotation = null;
      if (checkForJumpLink != null && checkForJumpLink != "") {
        if (this.annotations[checkForJumpLink] != null) {
          [_, jumpAnnotation] = await this.utils.render((this.annotations[checkForJumpLink] || {}).render);
          this.selecting[checkForJumpLink] = {};
          if (this.updateZoom) {
            await this.updateZoom();
          }
        }
      }
      if (jumpAnnotation == null) {
        if (pageParam == null) {
          centerWindowWithPage();
        } else {
          updateAnnotationScroll([pageParam], false);
        }
        await this.updateChunks();
      } else {
        let jumpRect = jumpAnnotation.getBoundingClientRect();
        window.scrollTo(window.scrollX + jumpRect.left - ((fixed.offsetWidth - jumpAnnotation.offsetWidth) / 2), window.scrollY + jumpRect.top - ((fixed.offsetHeight - jumpAnnotation.offsetHeight) / 2));
        await this.updateChunks();
      }
    }

    // Zoom
    let lastMouseX;
    let lastMouseY;
    let mouseBeforeX;
    let mouseBeforeY;
    this.setZoom = async (set, observe, mouse) => {
      mouse = mouse ?? {};
      if (observe != true && this.realtime.observing != null && this.realtime.module != null) {
        this.realtime.module.exitObserve();
      }

      let mouseX = mouse.clientX ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientX ?? 0;
      let mouseY = mouse.clientY ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientY ?? 0;
      
      if (lastMouseX != mouseX || lastMouseY != mouseY) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        // Get Page Rect:
        let pageHolderRect = pageHolder.getBoundingClientRect();
        mouseBeforeX = (mouseX - pageHolderRect.left) / this.zoom;
        mouseBeforeY = (mouseY - pageHolderRect.top) / this.zoom;
      }

      if (set != null) {
        this.zoom = set;
      } else {
        this.zoom += Math.min(mouse.deltaY ?? 0, 50) * -0.01;
        //let delta = Math.max(-1, Math.min(1, (mouse.wheelDelta ?? -(mouse.detail ?? 0))));
        //this.zoom = this.zoom + (delta / 10);
      }
      this.zoomChanged = true;

      if (this.zoom > 5) {
        this.zoom = 5;
      } else if (this.zoom < .2) {
        this.zoom = .2;
      }

      this.zooming = true;

      contentHolder.style.setProperty("--zoom", this.zoom);

      //await this.updatePageSize();
      await this.utils.setMarginSize();

      //updateContentSize();

      if (observe != true) {
        // Get Page Rect:
        let newPageHolderRect = pageHolder.getBoundingClientRect();
        let addScrollX = (mouseBeforeX * this.zoom) - (mouseX - newPageHolderRect.left);
        let addScrollY = (mouseBeforeY * this.zoom) - (mouseY - newPageHolderRect.top);
        
        // Set the new scroll position
        window.scrollTo(window.scrollX + addScrollX, window.scrollY + addScrollY);
      }

      await this.updateChunks();

      this.zooming = false;

      /*if (observe != true) {
        await this.utils.setMarginSize();

        // Get Page Rect:
        let newPageHolderRect = pageHolder.getBoundingClientRect();

        // Calculate the new scroll position based on the mouse cursor position and zoom level
        let mouseRelativeAfterX = (mouseX - newPageHolderRect.left) / (pageHolder.offsetWidth * this.zoom);
        let mouseRelativeAfterY = (mouseY - newPageHolderRect.top) / (pageHolder.offsetHeight * this.zoom);

        let newScrollX = ((pageHolder.offsetWidth * this.zoom) * mouseRelativeBeforeX) - ((pageHolder.offsetWidth * this.zoom) * mouseRelativeAfterX);
        let newScrollY = ((pageHolder.offsetHeight * this.zoom) * mouseRelativeBeforeY) - ((pageHolder.offsetHeight * this.zoom) * mouseRelativeAfterY);

        // Set the new scroll position
        window.scrollTo(window.scrollX + newScrollX, window.scrollY + newScrollY);
      } else {
        this.utils.setMarginSize();
      }*/

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
        if (this.zoom <= .2) {
          fixed.querySelector(".eZoomButton[sub]").setAttribute("disabled", "");
        } else {
          fixed.querySelector(".eZoomButton[sub]").removeAttribute("disabled");
        }
      }

      if (mouse.updatePages != false && this.updatePages) {
        await this.updatePages();
      }
      if (this.updateZoom) {
        await this.updateZoom(true);
      }
      if (this.updateSelectedBounds) {
        await this.updateSelectedBounds();
      }

      enableScrollTop();

      if (this.realtime.module != null) {
        this.realtime.module.adjustRealtimeHolder();
      }
    }
    let scrollMouseWheel = (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        this.setZoom(null, null, event);
      } else {
        lastMouseX = null;
        lastMouseY = null;
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
    //let finishTimeout;
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
              await this.utils.render(existingAnno.render);
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
        //let currentCenter = getCenter(event.touches);
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
        /*clearTimeout(finishTimeout);
        finishTimeout = setTimeout(() => {
          if (this.updatePages) {
            this.updatePages();
          }
        }, 5000);*/
        running = false;
      }
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

    if (this.exporting != true) {
      asyncLoadAnnotations();
      (async () => {
        (await this.loadModule("editor/realtime")).js(this, page);
      })();
    } else {
      await asyncLoadAnnotations();
      await (await this.loadModule("editor/export")).js(this, this.utils, page);
    }

    this.visiblePages = [];
    this.updatePages = null;

    if (this.toolbar != null) {
      this.toolbar.checkToolToggle();
    }

    if (window.exportReady) {
      //await asyncLoadAnnotations();
      window.exportReady();
    }
    await this.utils.setMarginSize();
    centerWindowWithPage();

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

modules["dropdowns/editor/zoom"] = class {
  html = `
  <div class="eZoomHolder">
    <button class="eZoomButton buttonAnim border" sub change="-20">-</button>
    <div class="eZoomLevel border"><div class="eZoomBox" contenteditable>100</div>%</div>
    <button class="eZoomButton buttonAnim border" add change="20">+</button>
  </div>
  <div class="eZoomLine"></div>
  <button class="eZoomAction" option="snapping" local title="Snap elements to guides while moving and resizing."><div label>Snapping</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursors" title="Display the cursors of other editors."><div label>Show Cursors</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursornames" local title="Show the member's name when they're annotating."><div label>Cursor Names</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="stylusmode" local title="Only write on the document when using an active stylus, such as the Apple Pencil."><div label>Stylus Mode</div><div class="eZoomToggle"><div></div></div></button>
  <!--<button class="eZoomAction" option="comments" title="Show comments on the document."><div label>Comments</div><div class="eZoomToggle"><div></div></div></button>-->
  <!--<div class="eZoomLine"></div>-->
  <!--<button class="eZoomAction" option="fullscreen" title="Fullscreen allows increased accessibility."><div label>Fullscreen</div><div class="eZoomToggle"><div></div></div></button>-->
  `;
  css = {
    ".eZoomHolder": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".eZoomButton": `position: relative; display: flex; width: 22px; height: 22px; margin: 20px 3px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 8px; color: var(--theme); font-size: 24px; font-weight: 600; line-height: 0`,
    '.eZoomButton[change="-20"]': `cursor: zoom-out`,
    '.eZoomButton[change="20"]': `cursor: zoom-in`,
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
  };
  js = async function (frame, extra) {
    let editor = await findModule(extra.origin);
    let zoomPercentage = frame.querySelector(".eZoomLevel div");
    let setZoomText = () => {
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
    let forceSetZoom = () => {
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
      let textInt = parseInt(textBox.textContent) ?? 0;
      if (textInt == "") {
        setZoomText();
      } else if (textInt > 500) {
        textBox.textContent = "500";
      } else if (textInt < 20) {
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
        (Math.floor(((editor.zoom + parseFloat(zoomChange.getAttribute("change"))) * 100) / 5) * 5) / 100
        editor.setZoom(
          (
            Math.round(
              (
                Math.round(editor.zoom * 100) + parseInt(zoomChange.getAttribute("change"))
              ) / 20
          ) * 20
        ) / 100, null, { clientX: fixed.offsetWidth / 2, clientY: fixed.offsetHeight / 2 });
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
          this.localOptions = this.localOptions ?? {};
          this.localOptions[option] = editor.options[option];
          setLocalStore("options", JSON.stringify(this.localOptions));
        }
        if (option == "cursors") {
          if (editor.realtime.module) {
            editor.realtime.module.setShortSub(editor.visibleChunks);
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

modules["dropdowns/editor/file"] = class {
  html = `
  <button class="eFileAction" option="dashboard" title="Return to the Dashboard" style="--themeColor: var(--secondary)"><img src="./images/tooltips/back.svg">Dashboard</button>
  <div class="eFileLine"></div>
  <button class="eFileAction" option="export" dropdown="dropdowns/editor/file/export" dropdowntitle="Export" title="Export the lesson as a PDF."><img src="./images/editor/file/export.svg">Export</button>
  <button class="eFileAction" option="print" dropdown="dropdowns/editor/file/export" dropdowntitle="Print" title="Export the lesson and print."><img src="./images/editor/file/print.svg">Print</button>
  <button class="eFileAction" option="copy" title="Create a copy of the lesson."><img src="./images/editor/file/copy.svg">Create Copy</button>
  <button class="eFileAction" option="moveto" title="Move this lesson into a folder." dropdown="dropdowns/dashboard/moveto" dropdowntitle="Move To Folder"><img src="./images/dashboard/moveto.svg">Move To Folder</button>
  <div class="eFileLine" option="findjump"></div>
  <button class="eFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><img src="./images/editor/file/search.svg">Find</button>
  <button class="eFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><img src="./images/editor/bottom/uparrow.svg">Jump to Top</button>
  <button class="eFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><img src="./images/editor/file/jump.svg">Jump to Page</button>
  <button class="eFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><img src="./images/editor/bottom/downarrow.svg">Jump to End</button>
  <div class="eFileLine" option="document"></div>
  <button class="eFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><img src="./images/editor/file/info.svg">Properties</button>
  <button class="eFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><img src="./images/editor/file/text.svg">Recognize Text</button>
  <div class="eFileLine" option="delete"></div>
  <button class="eFileAction" option="deletelesson" dropdown="dropdowns/editor/file/delete" title="Remove this lesson from your dashboard." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Lesson</button>
  <button class="eFileAction" option="deleteannotations" dropdown="dropdowns/editor/file/delete" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Annotations</button>
  <div class="eFileLine" option="hideshow"></div>
  <button class="eFileAction" option="hideshowpage" title="Hide this page for all members."><img src="./images/editor/rearrange/hideshow.svg">Hide All Pages</button>
  `;
  css = {
    ".eFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".eFileAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: #fff; border-radius: 4px`,
    ".eFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".eFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async function (frame, extra) {
    let editor = await findModule(extra.origin);
    let utils = editor.utils;
    let dropdown = await this.loadModule("dropdown");
    let alert = await this.loadModule("alert");
    let access = editor.getSelf().access;
    frame.setAttribute("lesson", editor.id);
    if (editor.folder != null) {
      frame.setAttribute("folderid", editor.folder);
    }
    frame.querySelector('.eFileAction[option="dashboard"]').addEventListener("click", async () => {
      utils.syncSave(true);
      setFrame("pages/dashboard");
    });
    let exportButton = frame.querySelector('.eFileAction[option="export"]');
    let printButton = frame.querySelector('.eFileAction[option="print"]');
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
      dropdown.close();
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
      //frame.querySelector('.eFileAction[option="ocr"]').remove();
    }
    if (editor.annotationPages.length < 1) {
      jump.remove();
    }
    //find.remove();
    //jumptop.remove();
    //jump.remove();
    //jumpend.remove();
    if (hideshowpage != null) {
      hideshowpage.remove();
    }
    //frame.querySelector('.eFileLine[option="findjump"]').remove();
    let hideshowLine = frame.querySelector('.eFileLine[option="hideshow"]');
    if (hideshowLine != null) {
      hideshowLine.remove();
    }
    find.remove();
    frame.querySelector('.eFileLine[option="document"]').remove();
    frame.querySelector('.eFileAction[option="properties"]').remove();
    frame.querySelector('.eFileAction[option="ocr"]').remove();
  }
}

modules["pages/editor/annotation"] = class {
  scaleToDoc = async function (x, y, noOrigin) {
    let pageRect = this.parent.page.querySelector(".ePageHolder").getBoundingClientRect();
    if (noOrigin != true) {
      x -= pageRect.left;
      y -= pageRect.top;
    }
    let scaleZoom = 1 / this.parent.zoom;
    return {
      x: this.round(x * scaleZoom),
      y: this.round(y * scaleZoom)
    }
  };
  scaleToZoom = async function (x, y, p) {
    let pageHolder = this.parent.page.querySelector(".ePageHolder");
    x *= this.parent.zoom;
    y *= this.parent.zoom;
    let pageElem = pageHolder;
    if (p > 0) {
      pageElem = pageHolder.children[p - 1];
    }
    let pageRect = pageElem.getBoundingClientRect();
    x += pageRect.left;
    y += pageRect.top;
    return { x, y };
  };
  round = function (num, places) {
    let pow = Math.pow(10, places ?? 2);
    return Math.ceil(num * pow) / pow;
  };
  tempID = function () {
    return "pending_" + randomString(10) + Date.now();
  };
  createSVG = function (parent, type) {
    let newSVG = document.createElementNS("http://www.w3.org/2000/svg", type);
    parent.appendChild(newSVG);
    return newSVG;
  };
  setMarginSize = async function (force) {
    let editor = this.parent;
    if (editor.exporting == true && force != true) {
      return;
    }
    let contentFrame = editor.page.querySelector(".eContent");
    let content = contentFrame.querySelector(".eContentHolder");
    // chunkWidth, chunkHeight

    this.farLeft = 0;
    this.farRight = 0;
    this.setLeftMargin = 0;
    this.setRightMargin = 0;
    this.farTop = 0;
    this.farBottom = 0;
    this.setTopMargin = 0;
    this.setBottomMargin = 0;

    // Default Chunks:
    editor.chunkAnnotations["0_0"] = editor.chunkAnnotations["0_0"] ?? [];
    editor.chunkAnnotations["0_-" + editor.chunkHeight] = editor.chunkAnnotations["0_-" + editor.chunkHeight] ?? [];
    editor.chunkAnnotations["-" + editor.chunkWidth + "_0"] = editor.chunkAnnotations["-" + editor.chunkWidth + "_0"] ?? [];
    editor.chunkAnnotations["-" + editor.chunkWidth + "_-" + editor.chunkHeight] = editor.chunkAnnotations["-" + editor.chunkWidth + "_-" + editor.chunkHeight] ?? [];
    
    let chunks = Object.keys(editor.chunkAnnotations);
    for (let i = 0; i < chunks.length; i++) {
      let splitPos = chunks[i].split("_");
      let [x, y] = [parseInt(splitPos[0]), parseInt(splitPos[1])];
      let left = -x;
      let right = x + editor.chunkWidth;
      let top = -y;
      let bottom = y + editor.chunkHeight;
      if (left > this.farLeft) {
        this.setLeftMargin = Math.ceil(left / 400) * 400;
        this.farLeft = this.setLeftMargin - 120;
      }
      if (right > this.farRight) {
        this.setRightMargin = Math.ceil(right / 400) * 400;
        this.farRight = this.setRightMargin - 120;
      }
      if (top > this.farTop) {
        this.setTopMargin = Math.ceil(top / 400) * 400;
        this.farTop = this.setTopMargin - 120;
      }
      if (bottom > this.farBottom) {
        this.setBottomMargin = Math.ceil(bottom / 400) * 400;
        this.farBottom = this.setBottomMargin - 120;
      }
    }

    if (mouseDown() == true) {
      if (this.runCheckSizeReset != null) {
        return;
      }
      this.runCheckSizeReset = () => {
        this.setMarginSize();
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
    
    let scrollPosX = window.scrollX;
    let scrollPosY = window.scrollY;
    let contentLeft = this.marginLeft ?? 0;
    let contentTop = this.marginTop ?? 0;
    let addMarginLeftRight = fixed.offsetWidth / 2;
    let addMarginTopBottom = fixed.offsetHeight / 2;
    this.marginLeft = (this.setLeftMargin * editor.zoom) + addMarginLeftRight;
    this.marginRight = (this.setRightMargin * editor.zoom) + addMarginLeftRight;
    this.marginTop = (this.setTopMargin * editor.zoom) + addMarginTopBottom;
    this.marginBottom = (this.setBottomMargin * editor.zoom) + addMarginTopBottom;
    content.style.marginLeft = this.marginLeft + "px";
    content.style.marginRight = this.marginRight + "px";
    content.style.marginTop = this.marginTop + "px";
    content.style.marginBottom = this.marginBottom + "px";
    if (contentFrame.offsetWidth != this.lastOffsetWidth || contentFrame.offsetHeight != this.lastOffsetHeight) {
      window.scrollTo(scrollPosX + (this.marginLeft - contentLeft), scrollPosY + (this.marginTop - contentTop));
      if (editor.realtime.module && editor.realtime.module.adjustRealtimeHolder) {
        editor.realtime.module.adjustRealtimeHolder();
      }
      if (editor.updateZoom != null) {
        await editor.updateZoom(true);
      }
    }
    this.lastOffsetWidth = contentFrame.offsetWidth;
    this.lastOffsetHeight = contentFrame.offsetHeight;
  };
  
  // PDF RENDER QUEUE
  processPageRenders = async function (editor) {
    if (this.runningPageRender == true) {
      return;
    }
    this.runningPageRender = true;
    // Load PDFJS
    if (window.pdfjsLib == null) {
      await loadScript("./libraries/pdfjs/pdf.mjs");
    }
    if (pdfjsLib.GlobalWorkerOptions.workerSrc == "") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "./libraries/pdfjs/pdf.worker.mjs";
    }

    while (this.pdfPageQueue.length > 0 || (editor.exporting == true && Object.keys(this.pdfFileLoading).length > 0)) {
      let sourcePageId = this.pdfPageQueue.shift();
      if (sourcePageId == null) {
        await sleep(100);
        continue;
      }
      let [sourceID, pageNumber] = this.pdfPageStorage[sourcePageId];
      delete this.pdfPageStorage[sourcePageId];

      let source = editor.sources[sourceID] ?? {};
      if (source.error == true) {
        continue;
      }
      if (source.pdf == null) {
        if (this.pdfFileLoading[sourceID] == null) {
          this.pdfFileLoading[sourceID] = {};
          (async () => {
            if (source.source == null) {
              let [code, body] = await sendRequest("GET", "lessons/join/source?source=" + sourceID, null, { session: editor.session });
              if (code == 200) {
                editor.sources[sourceID] = { source: body.source };
              } else {
                editor.sources[sourceID] = { error: true };
              }
            }
            source = editor.sources[sourceID] ?? {};
            if (source.source != null) {
              let loadingTask = pdfjsLib.getDocument(assetURL + source.source)
              addTempListener({ type: "pdf", document: loadingTask });
              loadingTask.promise.then(async (pdf) => {
                source.pdf = pdf;
                let loadingPageKeys = Object.keys(this.pdfFileLoading[sourceID])
                for (let b = 0; b < loadingPageKeys.length; b++) {
                  let pageAdd = this.pdfFileLoading[sourceID][loadingPageKeys[b]];
                  this.addPageToQueue(pageAdd[0], pageAdd[1], true);
                }
                delete this.pdfFileLoading[sourceID];
              });
            }
          })();
        }
        this.pdfFileLoading[sourceID][sourcePageId] = [sourceID, pageNumber];
        continue;
      }

      let pageRender = editor.sourceRenders[sourcePageId];
      if (pageRender == null) {
        pageRender = await new Promise(async (resolve) => {
          source.pdf.getPage(pageNumber).then(async (pageRender) => {
            resolve(pageRender);
          });
        });
        editor.sourceRenders[sourcePageId] = pageRender;
      }

      let loadDocumentFrames = editor.page.querySelectorAll('.eAnnotation[page] div[content] div[document][sourcepage="' + sourcePageId + '"]');
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
    this.runningPageRender = false;
  };
  addPageToQueue = async function (sourceID, pageNumber, forceRunRender) {
    let sourcePageId = sourceID + "_" + pageNumber;
    if (this.pdfPageStorage[sourcePageId] == null) {
      this.pdfPageStorage[sourcePageId] = [sourceID, pageNumber];
      this.pdfPageQueue.push(sourcePageId);
      if (this.parent.exporting != true || forceRunRender == true) {
        this.processPageRenders(this.parent);
      }
    }
  };

  SVG_PADDING = 100; // How much padding svgs should have to ensure clean render
  maxLayer = 0;
  minLayer = 0;
  css = {
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
    ".eReaction[dropdown]": `opacity: 0; border-radius: 14px`,
    ".eContent[viewer] .eReaction[dropdown]": "display: none !important",
    ".eReaction div[imgholder]": `display: flex; width: 20px; height: 20px; justify-content: center; align-items: center`,
    ".eReaction img": `width: 32px; height: 32px; transform: scale(0.65); border-radius: 7px; filter: drop-shadow(0px 0px 8px var(--pageColor))`,
    ".eReaction div[count]": `margin: 0 5px 0 6px; font-size: 16px; font-weight: 700`,
    ".eAnnotation[sticky]:hover .eReaction[dropdown]": `opacity: 1`,
    ".eAnnotation[sticky][selected] .eReaction[dropdown]": `opacity: 1`,
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
    ".eAnnotation[embed] div[details] div[info] a[link] img": `width: 32px; height: 32px; margin-right: 2px`,
    //".eAnnotation[embed] div[details] div[input] button": `height: 32px; padding: 0 10px; flex-shrink: 0; margin: 3px; --borderWidth: 3px; --borderRadius: 12px; color: var(--theme); font-size: 18px`,
    //".eAnnotation[embed] div[details] div[input] button:active": `--borderWidth: 6px`

    ".eAnnotation[spinner]": `display: flex; flex-direction: column; background: var(--pageColor); border-radius: 16px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2); pointer-events: all`,
    ".eAnnotation[spinner] div[spinnertitle]": `margin: 16px 16px 8px; font-size: 32px; font-weight: 700; color: var(--theme)`,
    ".eAnnotation[spinner] div[spinnernameholder]": `position: relative; margin: 8px 16px; flex: 1; border: solid 8px var(--theme); border-radius: 32px; overflow: hidden; transition: .2s`,
    ".eAnnotation[spinner] div[spinnername]": `position: absolute; display: flex; width: calc(100% - 16px); height: calc(100% - 16px); left: 8px; top: 8px; justify-content: center; align-items: center; font-size: 64px; font-weight: 900; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; text-align: center; transform: translateY(100%) scale(.8)`,
    ".eAnnotation[spinner] button[spinnerbutton]": `padding: 12px 24px; margin: 8px auto 16px auto; background: var(--theme); font-size: 32px; font-weight: 600; color: #fff; border-radius: 32px`
  };
  render = async function (data, anno, long, force) {
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
    let editor = this.parent;
    let annoHolder = editor.page.querySelector(".ePageHolder");
    if (editor.exportSelected != null) {
      if (editor.exportSelected.includes(data._id) == false) {
        let currentAnnoCheck = data;
        let checkedParents = [];
        let isValid = false;
        while (currentAnnoCheck.parent != null) {
          let annoid = currentAnnoCheck.parent;
          if (annoid == null || checkedParents.includes(annoid) == true) {
            break;
          }
          checkedParents.push(annoid);
          let annotation = editor.annotations[annoid];
          if (annotation == null) {
            break;
          }
          currentAnnoCheck = annotation.render ?? {};
          if (editor.exportSelected.includes(annoid) == true) {
            isValid = true;
            break;
          }
        }
        if (isValid == false) {
          return;
        }
      } else if (data.parent != null) {
        let [absX, absY] = editor.getAbsolutePosition(data);
        data.parent = null;
        data.p = [absX, absY];
      }
    }
    let { _id, f, parent, p, s, r, l, c, i, t, b, o, d, done, remove, sync, textfit, sig, lock } = data;
    let [x, y] = p ?? [];
    let size = s ?? [];
    let [width, height] = [size[0], size[1]];
    /*if (page != null && editor.loadedIn.includes(page) == false && long != true && force != true) {
      return;
    }*/
    let annotation = editor.annotations[_id] ?? {};
    if (annotation.pointer != null) {
      _id = annotation.pointer;
      annotation = editor.annotations[_id] ?? {};
    }
    if (anno == null) {
      anno = annotation.element;
      if (anno == null && _id != null && _id.startsWith("pending_") == true) {
        anno = editor.page.querySelector('.eAnnotation[anno="' + _id + '"]');
      }
      if (anno != null) {
        anno.setAttribute("anno", _id);
      }
    }
    if (parent != null) {
      if ((parent ?? "").startsWith("pending_") == true) {
        let parentAnno = editor.annotations[parent];
        if (parentAnno != null && parentAnno.pointer != null) {
          parent = parentAnno.pointer;
        }
      }
      let annoParentAnno = editor.annotations[parent] ?? {};
      let annoParentData = annoParentAnno.render;
      if (annoParentData != null) {
        let annoParent = annoParentAnno.element; // editor.page.querySelector('.eAnnotation[anno="' + parent + '"]');
        if (annoParent == null) {
          if (annoParentData.parent != _id) {
            annoParent = (await this.render(annoParentData))[1];
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
      editor.page.querySelector(".ePageHolder").appendChild(anno);
      annoHolder.appendChild(anno);
      let activeSelect = editor.page.querySelector('.eSelectActive[anno="' + _id + '"]');
      if (activeSelect != null) {
        annoHolder.appendChild(activeSelect);
      }
    }
    //await editor.annotationChunks(editor.annotations[_id]);
    /*if (annoHolder.parentElement.parentElement.firstElementChild != annoHolder.parentElement) {
      y -= 4;
    }*/
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
          elem.setAttribute("stroke", "#" + editor.darkenHex(c, 20));
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
                <div reactions><button class="eReaction" dropdown="dropdowns/editor/tools/emojis" dropdowntitle="Reactions" noscrollclose><div imgholder><img src="./images/editor/actions/reaction.svg"></div></button></div>
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
        anno.style.color = editor.textColorBackground(c);
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
                let emojiModule = await this.loadModule("dropdowns/editor/tools/emojis");
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
        anno.style.color = editor.textColorBackground(c);
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
            if (editor.exporting != true) {
              pdfDocumentHolder.style.opacity = 0;
              pdfDocumentHolder.style.transition = "opacity .3s";
            }
            this.addPageToQueue(data.source, data.number);
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
            if (editor.getSelf().access < 4) {
              hiddenElem.insertAdjacentHTML("beforeend", `<img hideicon src="./images/editor/hidden.svg" draggable="false">`);
            } else {
              if (editor.exporting != true) {
                hiddenElem.insertAdjacentHTML("beforeend", `<div hidemodal>
                  <img src="./images/editor/hidden.svg" draggable="false">
                  <div hidemodaltitle>Page Hidden</div>
                </div>`);
                if (editor.getSelf().access > 3) {
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
        //editor.updateAnnotationPages(data);
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

        if (editor.exporting != true) {
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
          editor.exportPromises.push(new Promise(async (resolve) => {
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
          if (editor.exporting != true) {
            if (data.embed.url != null) {
              if (embedFrame == null) {
                embedActivate.querySelector("img").src = "./images/editor/actions/play.svg";
                embedActivate.style.display = "flex";
              }
            } else {
              embedActivate.style.display = "none";
              //embedActivate.querySelector("img").src = "./images/editor/actions/open.svg";
              //embedActivate.style.display = "flex";
            }
          }
          if (data.embed.image != null) {
            if (embedFrame == null) {
              if (editor.exporting != true) {
                thumbnail.src = data.embed.image;
              } else {
                editor.exportPromises.push(new Promise(async (resolve) => {
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

          /*let setLink = (data.embed ?? {}).url;
          //https://docs.google.com/presentation/d/1UF9kRe9vktykLZDGRT0rRp4ZiobUGDGSDJyEj3VTDlg/edit?usp=sharing
          //https://kami.app/fu6-EHx-dMW-7BG
          //https://app.schoolai.com/space?code=O8RW
          if (setLink != null && embedFrame.getAttribute("currentsrc") != setLink) {
            embedFrame.src = setLink;
            embedFrame.setAttribute("currentsrc", setLink);
          }*/
        }
        break;
      case "SPINNER": // THIS IS TEMPORARY CODE, REMOVE LATER
        if (anno == null) {
          annoHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" spinner new>
            <div spinnertitle>Spinner (BETA)</div>
            <div spinnernameholder></div>
            <button spinnerbutton>Spin!</button>
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
        let nameHolder = anno.querySelector("div[spinnernameholder]");
        let prevName = nameHolder.querySelector("div[spinnername]");
        if (prevName == null) {
          nameHolder.insertAdjacentHTML("beforeend", `<div spinnername></div></div>`);
          prevName = nameHolder.querySelector("div[spinnername]");
          prevName.textContent = cleanString(d ?? "");
          prevName.style.transform = "translateY(0%) scale(1)";
          prevName.style.color = "var(--theme)";
        } else {
          (async () => {
            if (anno.hasAttribute("running") == true) {
              return;
            }
            anno.setAttribute("running", "");
            prevName.remove();
            prevName = null;
            let logEquation = 0;
            let cycle = 1;
            let removeName = async (name) => {
              await sleep(5000);
              if (name == null) {
                return;
              }
              name.remove();
            }
            while (logEquation < 3) {
              if (prevName != null) {
                prevName.style.transform = "translateY(-100%) scale(.8)";
                removeName(prevName);
              }

              logEquation = .01 * Math.pow(Math.E, .5 * cycle);
              cycle++;

              nameHolder.insertAdjacentHTML("beforeend", `<div spinnername new></div>`);
              prevName = nameHolder.querySelector("div[spinnername][new]");
              prevName.removeAttribute("new");
              let memberIDs = Object.keys(editor.members);
              let randomMemberID = memberIDs[Math.floor(Math.random() * memberIDs.length)];
              let randomMember = editor.members[randomMemberID] ?? {};
              if (logEquation < 3) {
                prevName.textContent = cleanString(randomMember.name ?? "");
              } else {
                prevName.textContent = cleanString(d ?? "");
              }
              prevName.style.transition = logEquation + "s ease";
              prevName.offsetHeight;
              prevName.style.transform = "translateY(0%) scale(1)";

              await sleep(logEquation * 1000)
            }
            prevName.style.transition = ".1s ease";
            prevName.offsetHeight;
            for (let i = 0; i < 3; i++) {
              prevName.style.color = "var(--green)";
              nameHolder.style.border = "solid 12px var(--green)";
              prevName.style.transform = "translateY(0%) scale(1.05)";
              await sleep(200);
              prevName.style.color = "var(--theme)";
              nameHolder.style.border = "solid 8px var(--theme)";
              prevName.style.transform = "translateY(0%) scale(1)";
              await sleep(200);
            }
            anno.removeAttribute("running");
          })();
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
    /*if (_id != null) {
      if (long == true) {
        await this.resetAnnotationSize();
      } else {
        await this.checkAnnotationSize(data);
      }
    }*/
    return [data, anno];
  };
  removeAnnotation = async function (annoID, checkDone) {
    let anno = this.parent.page.querySelector('.eAnnotation[anno="' + annoID + '"]');
    if (anno != null && (checkDone != true || anno.hasAttribute("done") == false)) {
      anno.remove();
    }
    let allSelections = [...this.parent.page.querySelectorAll('.eSelect[anno="' + annoID + '"]'), ...this.parent.page.querySelectorAll('.eSelectActive[anno="' + annoID + '"]')];
    for (let i = 0; i < allSelections.length; i++) {
      allSelections[i].remove();
    }
  };
  timeoutAnnotations = [];
  enableTimeout = async function (annoID, anno, render, collab) {
    if (anno == null) {
      return;
    }
    if (anno.expire == null) {
      this.timeoutAnnotations.push(anno);
    }
    anno.expire = getEpoch() + 10000; // 10 seconds until expire
    anno.collab = (collab == true);
    if (this.runningTimeout == true) {
      return;
    }
    this.runningTimeout = true;
    let editor = this.parent;
    let cursor = await this.loadModule("pages/editor/toolbar/cursor");
    let page = editor.page;
    while (this.timeoutAnnotations.length > 0) {
      await sleep(10000);
      if (editor.page != page) {
        return;
      }
      for (let i = 0; i < this.timeoutAnnotations.length; i++) {
        let annotation = this.timeoutAnnotations[i];
        if (annotation.expire > getEpoch()) {
          continue;
        }
        if (connected == false && annotation.collab != true) {
          continue;
        }
        if (cursor != null && editor.selecting[annotation.render._id] != null && cursor.action != null) {
          continue;
        }
        
        // Remove annotation since it was reset:
        delete annotation.expire;
        this.timeoutAnnotations.splice(i, 1);
        i--;
        delete annotation.collab;

        if (annotation.pending != null) {
          delete editor.annotations[annotation.pending];
          delete annotation.render.pending;
        }
        /*
        if (editor.selecting[annotation.render._id] != null) {
          return;
        }
        */
        if (annotation.render._id.includes("pending_") == false) { // Means it's a new anno
          delete annotation.retry;
          if (annotation.revert != null) {
            annotation.render = annotation.revert;
            delete annotation.revert;
            let existingAnno = editor.annotations[annotation.render._id];
            await editor.annotationChunks(existingAnno);
            editor.updateAnnotationPages(annotation.render);
            let allowRender = annotation.render.remove == true;
            for (let i = 0; i < existingAnno.chunks.length; i++) {
              if (editor.visibleChunks.includes(existingAnno.chunks[i]) == true) {
                allowRender = true;
                break;
              }
            }
            if (allowRender == true) {
              await this.render(annotation.render);
            }
          }
        } else {
          this.removeAnnotation(annotation.render._id);
          delete editor.annotations[annotation.render._id];
        }
      }
      if (editor.updateZoom) {
        editor.updateZoom(false, false);
      }
    }
    this.runningTimeout = false;
    /*
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
    */
  };
  saveEdit = async function (annoData, render, sync, passedRender) {
    let editor = this.parent;
    if (annoData.resizing != null) {
      delete annoData.resizing;
    }
    let annoID = annoData._id;
    if (annoID == null) {
      return;
    }
    if (Object.keys(annoData).length < 2) {
      return; // Only the _id field, no changes
    }
    let anno = editor.annotations[annoID] ?? passedRender ?? { render: {} };
    if (anno.pointer != null) {
      annoID = anno.pointer;
      anno = editor.annotations[annoID] ?? passedRender ?? { render: {} };
    }
    anno.revert = anno.revert ?? JSON.parse(JSON.stringify(anno.render));
    objectUpdate(annoData, anno.render);
    /*
    if (Object.keys(mutations).length < 1) {
      return; // No changes, so no need to do anything
    }
    */
    this.enableTimeout(annoID, anno, render);
    editor.annotations[annoID] = anno;
    await editor.annotationChunks(anno);
    editor.updateAnnotationPages(anno.render);
    await this.render({ ...anno.render, sync: sync }, render);
    return annoData; //mutations;
  };
  pendingSaves = {};
  debounce = false;
  syncSave = async function (skipWait) {
    let editor = this.parent;
    editor.updateSaveStatus("Saving...");
    if (this.debounce == true && skipWait != true) {
      return;
    }
    this.debounce = true;
    let keys = Object.keys(this.pendingSaves);
    while (keys.length > 0) {
      if (skipWait != true) {
        await sleep(2500); // 1 save per 2.5 seconds
      } else {
        skipWait = false;
      }
      if (connected == false) {
        break;
      }
      keys = Object.keys(this.pendingSaves);
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
        /*if (mutt.resizing != null) {
          delete mutt.resizing;
        }*/
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
            if ((mutt.parent ?? "").startsWith("pending_") == true && mutt.remove != true) {
              let parentAnno = editor.annotations[mutt.parent];
              if (parentAnno != null) {
                if (parentAnno.pointer != null) {
                  mutt.parent = parentAnno.pointer;
                  parentAnno = editor.annotations[mutt.parent];
                } else {
                  setPendingSave[mutt._id] = mutt;
                  this.enableTimeout(anno.render._id, anno);
                  continue;
                }
                if ((parentAnno.render ?? {}).remove == true) {
                  continue;
                }
              }
            }
            delete anno.save;
            //mutt._id = anno.render._id;
            if (anno.retry > 0) {
              this.enableTimeout(anno.render._id, anno);
              anno.retry--;
            }
            if (mutt._id.startsWith("pending_") == true) {
              if (mutt.f == null) {
                //Annotation is still being saved, try again later!
                //anno.retry = true;
                mutt.annoRefresh = anno;
                setPendingSave[mutt._id] = mutt;
                continue;
              } else if (mutt.remove == true) {
                continue;
              }
            }
            mutations.push(mutt);
          } else {
            delete editor.annotations[mutt._id];
          }
        }
      }
      this.pendingSaves = {};
      if (mutations.length < 1 && Object.keys(setPendingSave).length < 1) {
        break;
      }
      let saveSuccess = false;
      try {
        let [result] = await sendRequest("POST", "lessons/save", { mutations: mutations }, { session: editor.session });
        if (result == 200) {
          saveSuccess = true;
          //editor.updateSaveStatus("Saved");
        }
      } catch (err) {
        console.log("SAVE ERROR:", err);
      }
      if (saveSuccess == false) { // If not saved, set to try again
        for (let i = 0; i < mutations.length; i++) {
          let anno = editor.annotations[mutations[i]._id];
          if (anno == null) {
            continue;
          }
          if (anno.pointer != null) {
            anno = editor.annotations[anno.pointer];
          }
          if (anno.retry == null) {
            anno.retry = 3;
          }
          if (anno != null && anno.retry > 0) {
            setPendingSave[mutations[i]._id] = mutations[i];
            anno.save = true;
          }
        }
      }
      this.pendingSaves = { ...this.pendingSaves, ...setPendingSave };
      if (skipWait != true) {
        keys = Object.keys(this.pendingSaves);
      } else {
        keys = [];
      }
    }
    if (connected == true) {
      editor.updateSaveStatus("Saved");
    }
    this.debounce = false;
  };
  save = async function (data, anno, sync) {
    data = JSON.parse(JSON.stringify(data));
    let editor = this.parent;
    let self = editor.getSelf();
    let annoID = data._id;
    let annotation = editor.annotations[annoID] ?? { render: {} };
    if (annotation.pointer != null) {
      annoID = annotation.pointer;
      data._id = annoID;
      annotation = editor.annotations[annoID] ?? { render: {} };
    }

    // Handle Annotation Parent:
    let merged = { ...(annotation.render ?? {}), ...data };
    if (merged.p == null || merged.s == null) {
      return;
    }
    let position = editor.getAbsolutePosition(merged);
    let thickness = 0;
    if (merged.t != null) {
      if (merged.b != "none" || merged.d == "line") {
        thickness = merged.t;
      }
    }
    let parent = editor.parentFromAnnotation({
      ...merged,
      parent: null,
      prevParent: merged.parent,
      p: [
        position[0] + (merged.s[0] / 2) + thickness,
        position[1] + (merged.s[1] / 2) + thickness
      ]
    }, null, null, true);
    if (parent != merged.parent) {
      data.parent = parent ?? null;
      let relativePos = editor.getRelativePosition({
        ...merged,
        parent: data.parent,
        p: [position[0], position[1]]
      });
      data.p = data.p ?? merged.p;
      data.p[0] = relativePos[0];
      data.p[1] = relativePos[1];
      editor.realtimeSelect[data._id] = { ...(editor.realtimeSelect[data._id] ?? {}), ...data };
      merged = { ...merged, ...data };
    }
    
    let checkChunks = editor.annotationInChunks(merged);
    if (annotation.render.p != null) {
      checkChunks = [ ...checkChunks, ...editor.annotationInChunks(annotation.render) ];
    }
    
    let mutations = await this.saveEdit(data, anno, sync, { save: true, render: {} });
    if (mutations == null) {
      return; // Nothing new to send!
    }
    annotation = editor.annotations[annoID] ?? { render: {} };

    //[originalRender.a, originalRender.m].includes(member.modify) == false
    /*if (annotation.render._id.startsWith("pending_") == false) {
      annotation.render.m = self.modify;
    } else {
      annotation.render.a = self.modify;
    }*/
    annotation.render.m = self.modify;

    // Handle Chunk Parent Updates
    if (data.p != null || data.s != null || data.t != null || data.l != null || data.remove == true) {
      let annotationKeys = {};
      for (let c = 0; c < checkChunks.length; c++) {
        annotationKeys = { ...annotationKeys, ...(editor.chunkAnnotations[checkChunks[c]] ?? {}) };
      }
      let annotations = Object.keys(annotationKeys);
      for (let a = 0; a < annotations.length; a++) {
        let checkAnnoID = annotations[a];
        if (checkAnnoID == null || checkAnnoID == annoID) {
          continue;
        }
        let checkAnnotation = editor.annotations[checkAnnoID];
        if (checkAnnotation == null) {
          continue;
        }
        if (checkAnnotation.pointer != null) {
          checkAnnoID = checkAnnotation.pointer;
          checkAnnotation = editor.annotations[checkAnnoID] ?? { render: {} };
        }
        //await editor.annotationChunks(editor.annotations[checkAnnoID]);
        let render = { ...(checkAnnotation.render ?? {}), ...(this.pendingSaves[checkAnnoID] ?? {}), ...(editor.selecting[checkAnnoID] ?? {}) }; //...(editor.realtimeSelect[checkAnnoID] ?? {})
        if ((render.parent ?? "").startsWith("pending_") == true) {
          let parentAnno = editor.annotations[render.parent];
          if (parentAnno != null && parentAnno.pointer != null) {
            render.parent = parentAnno.pointer;
          }
        }
        if (render.parent != annoID) { // && render.parent != merged.parent
          continue;
        }
        let thick = 0;
        if (render.t != null) {
          if (render.b != "none" || render.d == "line") {
            thick = render.t;
          }
        }
        let [x, y] = editor.getAbsolutePosition(render, true);
        let checkX = x + (render.s[0] / 2) + thick;
        let checkY = y + (render.s[1] / 2) + thick;
        if (checkX < position[0] || checkX > position[0] + merged.s[0] + thickness || checkY < position[1] || checkY > position[1] + merged.s[1] + thickness || render.l >= merged.l || merged.remove == true) {
          let setParent = editor.parentFromAnnotation({
            ...render,
            parent: null,
            prevParent: render.parent,
            p: [checkX, checkY]
          }, null, null, true); // null, merged, true
          if (setParent != render.parent) {
            let relativePos = editor.getRelativePosition({
              ...render,
              parent: setParent ?? null,
              p: [x, y]
            }, true);
            let setChildAnno = {
              _id: checkAnnoID,
              parent: setParent ?? null,
              p: [relativePos[0], relativePos[1]],
              sync: getEpoch()
            };
            await this.saveEdit(setChildAnno, null, sync, { save: true, render: {} });
            checkAnnotation.save = true; // Alert the system it's time to save
            checkAnnotation.render.sync = setChildAnno.sync;
            checkAnnotation.render.m = self.modify;
            this.pendingSaves[checkAnnoID] = { _id: checkAnnoID, ...(this.pendingSaves[checkAnnoID] ?? {}), ...setChildAnno };
            if (editor.realtimeSelect[checkAnnoID] == null) {
              editor.realtimeSelect[checkAnnoID] = setChildAnno;
              //editor.realtimeSelect[checkAnnoID] = { ...(editor.realtimeSelect[checkAnnoID] ?? {}), ...setChildAnno };
            }
          }
        }
      }

      if (["page"].includes(merged.f) == true) { // See if in bounds, also check parent to know what is allowed in bounds
        for (let a = 0; a < annotations.length; a++) {
          let checkAnnoID = annotations[a];
          if (checkAnnoID == null || checkAnnoID == annoID) {
            continue;
          }
          let checkAnnotation = editor.annotations[checkAnnoID];
          if (checkAnnotation == null) {
            continue;
          }
          if (checkAnnotation.pointer != null) {
            checkAnnoID = checkAnnotation.pointer;
            checkAnnotation = editor.annotations[checkAnnoID];
          }
          /*if (editor.selecting[checkAnnoID] != null) {
            continue;
          }*/
          let render = { ...(checkAnnotation.render ?? {}), ...(this.pendingSaves[checkAnnoID] ?? {}), ...(editor.selecting[checkAnnoID] ?? {}) };
          if (render.parent == annoID) {
            continue;
          }
          let thick = 0;
          if (render.t != null) {
            if (render.b != "none" || render.d == "line") {
              thick = render.t;
            }
          }
          let [x, y] = editor.getAbsolutePosition(render, true);
          let checkX = x + (render.s[0] / 2) + thick;
          let checkY = y + (render.s[1] / 2) + thick;
          if (checkX >= position[0] && checkX <= position[0] + merged.s[0] + thickness) {
            if (checkY >= position[1] && checkY <= position[1] + merged.s[1] + thickness) {
              if ((render.l ?? 0) > (merged.l ?? 0)) {
                if (self.access > 0 && editor.lesson.settings.editOthersWork != true && [render.a, render.m].includes(self.modify) == false && self.access < 4) { // Can't edit another member's work:
                  continue;
                }
                let setParent = editor.parentFromAnnotation({
                  ...render,
                  parent: null,
                  prevParent: render.parent,
                  p: [checkX, checkY]
                }, null, null, true);
                if (setParent != render.parent) {
                  let relativePos = editor.getRelativePosition({
                    ...render,
                    parent: setParent,
                    p: [x, y]
                  }, true);
                  let setChildAnno = {
                    _id: checkAnnoID,
                    parent: setParent,
                    p: [relativePos[0], relativePos[1]],
                    sync: getEpoch()
                  };
                  await this.saveEdit(setChildAnno, null, sync, { save: true, render: {} });
                  checkAnnotation.save = true; // Alert the system it's time to save
                  checkAnnotation.render.sync = setChildAnno,sync;
                  checkAnnotation.render.m = self.modify;
                  this.pendingSaves[checkAnnoID] = { _id: checkAnnoID, ...(this.pendingSaves[checkAnnoID] ?? {}), ...setChildAnno };
                  editor.realtimeSelect[checkAnnoID] = { ...(editor.realtimeSelect[checkAnnoID] ?? {}), ...setChildAnno };
                }
              }
            }
          }
        }
      }

      // Update all child annotation chunks:
      let updateAnnoIDs = {};
      let updateAnnos = [];
      for (let a = 0; a < annotations.length; a++) {
        let checkAnnoID = annotations[a];
        if (checkAnnoID == null || checkAnnoID == annoID) {
          continue;
        }
        let checkAnnotation = editor.annotations[checkAnnoID];
        if (checkAnnotation == null) {
          continue;
        }
        if (checkAnnotation.pointer != null) {
          checkAnnoID = checkAnnotation.pointer;
          checkAnnotation = editor.annotations[checkAnnoID];
        }
        
        let isChild = false;
        let currentAnnoCheck = checkAnnotation.render ?? {};
        let checkedParents = [];
        while (currentAnnoCheck.parent != null) {
          let annoid = currentAnnoCheck.parent;
          if (annoid == null || checkedParents.includes(annoid) == true) {
            break;
          }
          checkedParents.push(annoid);
          let annotation = editor.annotations[annoid];
          if (annotation == null) {
            break;
          }
          if (annotation.pointer != null) {
            annoid = annotation.pointer;
            annotation = editor.annotations[annoid];
          }
          if (annotation == null) {
            break;
          }
          if (annoid == annoID) {
            isChild = true;
            break;
          }
          currentAnnoCheck = annotation.render ?? {};
        }
        if (isChild == false) {
          continue;
        }
        updateAnnoIDs[checkAnnoID] = true;
        updateAnnos.push(checkAnnotation);
      }
      let updatedAnnoIDs = {};
      while (updateAnnos.length > 0) {
        for (let i = 0; i < updateAnnos.length; i++) {
          let newUpdate = updateAnnos[i];
          if (updateAnnoIDs[newUpdate.render.parent] == null || updatedAnnoIDs[newUpdate.render.parent] != null) {
            await editor.annotationChunks(newUpdate);
            updatedAnnoIDs[newUpdate.render._id] = true;
            updateAnnos.splice(i, 1);
            i--;
          }
        }
        await sleep(1); // Just to be safe
      }
    }
    
    annotation.save = true; // Alert the system it's time to save
    annotation.render.sync = sync || getEpoch();
    mutations.sync = annotation.render.sync;

    let saveSync = { _id: annoID, ...(this.pendingSaves[annoID] ?? {}), ...mutations };
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
    let storage = JSON.parse(getLocalStore(storeID) ?? "{}");
    storage[saveID] = JSON.stringify(data);
    setLocalStore(storeID, JSON.stringify(storage));
    */
  };
  forceShort = async function () {
    if (this.parent.realtime.module == null) {
      return;
    }
    await this.parent.realtime.module.publishShort(null, null, true);
    //this.parent.realtimeSelect = {};
  };
  getCurrentCaretPosition = function (element) {
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
  };
  createRange = function (node, chars, range) {
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
  };
  setCaretPosition = function (element, chars) {
    let selection = window.getSelection();
    let range = null;
    if (chars == "END") {
      range = this.createRange(element.lastChild, { count: element.lastChild.length - 1 });
    } else {
      range = this.createRange(element, { count: chars });
    }
    if (range != null) {
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  clearSelection = function () {
    if (window.getSelection != null) {
      window.getSelection().removeAllRanges();
    } else if (document.selection != null) {
      document.selection.empty();
    }
  };
  history = [];
  location = -1;
  pushHistory = async function (type, changes, ignoreTime, caret) {
    //let editor = this.parent;

    if (this.history.length > 100) {
      // If longer than 100, remove the first item to shrink under
      this.history.shift();
      this.location--;
    }
    if (this.location + 1 < this.history.length) {
      // Clear out redo history once undo in past
      this.history = this.history.slice(0, this.location + 1);
    }

    //console.log(type, changes);

    /*if (type == "remove") {
      for (let i = 0; i < changes.length; i++) {
        changes[i].revert = JSON.parse(JSON.stringify((editor.annotations[changes[i]._id] ?? {}).render ?? {}));
      }
    }*/
    let newChanges = JSON.parse(JSON.stringify(changes));

    let pushHistory = true;
    /*let lastHistory = this.history[this.location - 1];
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
    }*/

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

      this.history.push(newHistory);
      this.location++;
    }

    if (this.updateHistory != null) {
      this.updateHistory();
    }
  };
  rotatePoint = function (pointX, pointY, angle) {
    let radian = -(angle ?? 0) * (Math.PI / 180);
    let newX = (Math.cos(radian) * pointX) - (Math.sin(radian) * pointY);
    let newY = (Math.sin(radian) * pointX) + (Math.cos(radian) * pointY);
    return [newX, newY];
  }
};