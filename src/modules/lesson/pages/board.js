import { userID, account, setPage, getParam, modifyParams, sendRequest, connected, textBoxError, clipBoardRead, promptLogin, hasFeatureEnabled } from "@/crucial";

import { Editor } from "@modules/editor/Editor";
import { REALTIME, TOOLBAR } from "@modules/editor/imports";

import { Frame as FileDropdown } from "@modules/lesson/board/dropdowns/File";
import { Frame as MembersDropdown } from "@modules/lesson/board/dropdowns/Members";
import { Frame as ZoomDropdown } from "@modules/lesson/dropdowns/Zoom";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import boardLogoIcon from "@assets/icon.svg?raw";
import undoIcon from "@assets/lesson/history/undo.svg?raw";
import redoIcon from "@assets/lesson/history/redo.svg?raw";
import fullStatusIcon from "@assets/lesson/status/full.svg?raw";
import weakStatusIcon from "@assets/lesson/status/weak.svg?raw";
import noneStatusIcon from "@assets/lesson/status/none.svg?raw";
import endEditorsIcon from "@assets/lesson/share/endeditors.svg?raw";
import settingsIcon from "@assets/lesson/share/settings.svg?raw";
import increasePageIcon from "@assets/lesson/navigation/plus.svg?raw";
import decreasePageIcon from "@assets/lesson/navigation/minus.svg?raw";
import breakoutLogoIcon from "@assets/breakout.svg?raw";
import raisehandIcon from "@assets/lesson/share/raisehand.svg?raw";

export class Page {
  html = `
  <div class="boPage" main>
    <div class="eInterface customScroll">
      <div class="eTopHolder">
        <button class="eTopScroll" left style="left: 7px">${leftArrowIcon}</button>
        <button class="eTopScroll" right style="right: 7px">${rightArrowIcon}</button>
        <div class="eTop">
          <div class="eTopSection" left>
            <a class="eLogo" href="/app/dashboard" draggable="false">${boardLogoIcon}</a>
            <div class="eFileNameHolder border"><div class="eFileName" spellcheck="false"></div></div>
            <button class="eFileDropdown">File</button>
            <button class="eCreateCopy">Create Copy</button>
            <div class="eTopDivider"></div>
            <button class="eSaveProgress eUndo" disabled>${undoIcon}</button>
            <button class="eSaveProgress eRedo" disabled>${redoIcon}</button>
            <div class="eStatusHolder"><div class="eStatus">
              <div strength="3" title="Strong Connection | All features seamlessly synced to the cloud.">${fullStatusIcon}</div>
              <div strength="2" title="Weak Connection | Cloud-saved annotations, limited real-time features.">${weakStatusIcon}</div>
              <div strength="1" title="No Connection | Changes stored on-device, synced to cloud upon reconnecting.">${noneStatusIcon}</div>
            </div></div>
          </div>
          <div class="eTopSection" scroll>
            <div class="eTopDivider"></div>
          </div>
          <div class="eTopSection" right>
            <button class="eMembers">
              <span class="eMemberHandCount" membercount title="Number of hands raised."></span>
              <span class="eMemberIdleCount" membercount title="Number of idle members.">
              </span><span class="eMemberCount" membercount title="Number of members.">
              </span>Members
            </button>
            <button class="eEndSession" title="End Session | Disable all editing access making everyone a viewer.">${endEditorsIcon}</button>
            <button class="eShare">Share</button>
            <button class="eMemberOptions" dropdowntitle="Member Options" title="Member Options | Configure various member settings and available tools.">${settingsIcon}</button>
            <button class="eSharePin"></button>
            <div class="eTopDivider"></div>
            <button class="eZoom">100%</button>
            <button class="eAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
            <button class="eLogin">Login</button>
          </div>
        </div>
      </div>
      <div class="eToolbarHolder" toolbarholder hidden>
        <div class="eToolbar" type="editor" keeptooltip hidden notransition></div>
        <div class="eToolbar" type="viewer" keeptooltip hidden notransition></div>
      </div>
      <div class="eBottomHolder">
        <div class="eBottom">
          <div class="eBottomSection" observebottomsection left>
            <img class="eObserveIcon" src="../images/editor/members/observe.svg" />
            <div class="eObserveText">Observing</div>
            <div class="eObserveCursor" observecursor></div>
            <button class="eObserveExit buttonAnim border" observeexit></button>
          </div>
          <div class="eBottomSectionSpacer"></div>
          <div class="eBottomSection" right>
            <button class="ePageNav" down>${increasePageIcon}</button>
            <div class="eCurrentPage border" contenteditable></div>
            <button class="ePageNav" up>${decreasePageIcon}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="eContentHolder customScroll" disabled></div>
  </div>
  <div class="boPage" timeline hidden></div>
  `;
  css = {
    ".boPage": `position: absolute; display: block; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 2; pointer-events: all; transition: .2s`,
    ".boPage[hidden]": `z-index: 1`,
    ".eInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; transform: translateZ(0); visibility: hidden; pointer-events: none; user-select: none; contain: strict; overflow: scroll; z-index: 2`,
    ".eContentHolder": `position: relative; width: 100%; height: 100%; background: var(--pageColor); contain: strict; overflow: scroll; z-index: 1; transition: .5s`,
    ".eCreateBoardHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; z-index: 3; pointer-events: none`,
    
    ".eTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".eTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".eTopHolder[scroll] .eTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eTop::-webkit-scrollbar": `display: none`,
    ".eTopSection[scroll]": `display: none`,
    ".eTopHolder[scroll] .eTopSection[scroll]": `display: flex !important`,
    ".eTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".eTopScroll svg": `width: 22px`,
    ".eTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eTopHolder[scroll] .eTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".eTopSection[left]": `border-bottom-right-radius: 12px`,
    ".eTopSection[right]": `border-bottom-left-radius: 12px`,

    ".eLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".eLogo:hover": `background: var(--hover)`,
    ".eLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".eLogo:hover svg": `transform: scale(.9)`,
    ".eFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".eFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".eFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".eFileName::-webkit-scrollbar": `display: none`,
    ".eFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eCreateCopy": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".eTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".eSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".eSaveProgress svg": `width: 24px; height: 24px; margin: 2px`,
    ".eUndo": `margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 4px 4px 16px`,
    ".eRedo": `margin: 0 4px 0 2px; justify-content: start; border-radius: 4px 16px 16px 4px`,
    ".eStatusHolder": `display: flex; width: 32px; height: 32px; margin: 4px; justify-content: center; align-items: center`,
    ".eStatus": `position: relative; width: 100%; height: 100%; transform: scale(.9)`,
    ".eStatus > div": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; transition: .4s`,
    ".eStatus svg *": `transform-origin: center; transition: .4s`,
    ".eStatus[saving] [saved]": `opacity: 0`,
    ".eStatus:not([saving]) [saving]": `opacity: 0`,
    ".eStatus:not([saving]) [animation]": `animation-play-state: paused`,
    ".eStatus [animation]": `animation: eStatusSpinAnimation 2s linear infinite`,
    "@keyframes eStatusSpinAnimation": `from { transform: rotate(0deg) } to { transform: rotate(360deg) }`,

    ".eMembers": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".eMembers span": `display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); border-radius: 12px; font-weight: 700`,
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

    ".eToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".eBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".eBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".eBottom::-webkit-scrollbar": `display: none`,
    ".eBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".eBottomSection[hidden]": `display: none`,
    ".eBottomSection:first-child": `border-top-left-radius: 0`,
    ".eBottomSection:last-child": `border-top-right-radius: 0`,
    ".eBottomSectionSpacer": `flex: 1`,
    ".eObserveIcon": `width: 34px; height: 34px; margin: 2px`,
    ".eObserveText": `margin: 0 6px`,
    ".eObserveCursor": `box-sizing: border-box; display: flex; padding: 2px 6px; margin-right: 4px; background: var(--theme); color: #fff; border: solid 3px var(--pageColor); box-shadow: 0 0 6px rgb(0 0 0 / 25%); border-radius: 8px 14px 14px; font-size: 14px; font-weight: 700`,
    ".eObserveExit": `display: flex; position: relative; width: 22px; height: 22px; margin: 8px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 14px`,
    ".eObserveExit svg": `width: 12px; height: 12px; flex-shrink: 0`,
    ".ePageNav": `display: flex; width: 32px; height: 32px; padding: 6px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".ePageNav svg": `width: 100%; height: 100%`,
    ".eCurrentPage": `min-width: 8px; max-height: 24px; padding: 4px 0; margin: 0 6px; font-size: 20px; outline: unset`,
    ".eCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 12px`,
    ".eBottomSection[breakout]": `display: flex; box-shadow: var(--breakoutLightShadow)`,
    ".eBottomSection[breakout] button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".eBottomSection[breakout] button:hover": `background: var(--breakoutHover)`,
    ".eBottomSection[breakout] button svg": `width: 32px; height: 32px; transition: .2s`,
    ".eBottomSection[breakout] button:hover svg": `transform: scale(.9)`
  };

  updateActivePage() {
    this.active = this.parent.activePageID == this.pageID;
    this.editor.active = this.active;
    if (this.active == false) {
      this.pageHolder.removeAttribute("active");
    } else {
      this.pageHolder.setAttribute("active", "");
    }
  }
  
  updateTopBar(ignoreAttr) {
    if (ignoreAttr != true) {
      this.topHolder.removeAttribute("scroll");
    }
    if (this.top.scrollWidth > this.top.clientWidth) {
      if (ignoreAttr != true) {
        this.topHolder.setAttribute("scroll", "");
      }
      if (Math.floor(this.top.scrollLeft) > 0) {
        this.topScrollLeft.style.opacity = 1;
        this.topScrollLeft.style.pointerEvents = "all";
      } else {
        this.topScrollLeft.style.opacity = 0;
        this.topScrollLeft.style.pointerEvents = "none";
      }
      if (Math.floor(this.top.scrollWidth - this.top.scrollLeft) > Math.floor(this.top.clientWidth)) {
        this.topScrollRight.style.opacity = 1;
        this.topScrollRight.style.pointerEvents = "all";
      } else {
        this.topScrollRight.style.opacity = 0;
        this.topScrollRight.style.pointerEvents = "none";
      }
    } else {
      this.topScrollLeft.style.opacity = 0;
      this.topScrollLeft.style.pointerEvents = "none";
      this.topScrollRight.style.opacity = 0;
      this.topScrollRight.style.pointerEvents = "none";
    }
  }
  updateInterface() {
    let access = this.editor.self.access;
    if (access < 1) {
      this.contentHolder.setAttribute("viewer", "");
      this.lessonName.removeAttribute("contenteditable");

      if (this.editor.settings.allowExport != false) {
        this.createCopyButton.style.removeProperty("display");
      } else {
        this.createCopyButton.style.display = "none";
      }

      this.undoButton.style.display = "none";
      this.redoButton.style.display = "none";
      this.viewerToolbar.removeAttribute("hidden");
      this.editorToolbar.setAttribute("hidden", "");
    } else {
      this.contentHolder.removeAttribute("viewer");
      
      if (access > 3) {
        this.lessonName.setAttribute("contenteditable", "");
      }
      
      this.createCopyButton.style.display = "none";
      this.undoButton.style.removeProperty("display");
      this.redoButton.style.removeProperty("display");
      this.editorToolbar.removeAttribute("hidden");
      this.viewerToolbar.setAttribute("hidden", "");
    }
    if (access < 4) {
      this.shareButton.style.removeProperty("display");
      this.optionsButton.style.removeProperty("display");
    } else {
      this.shareButton.style.display = "flex";
      this.optionsButton.style.display = "flex";
    }
    
    let toolbarSetting = (account.settings ?? {}).toolbar ?? "left";
    if (this.toolbarHolder.hasAttribute(toolbarSetting) == false) {
      if (toolbarSetting != "right") {
        this.toolbarHolder.setAttribute("left", "");
        this.toolbarHolder.removeAttribute("right");
      } else {
        this.toolbarHolder.setAttribute("right", "");
        this.toolbarHolder.removeAttribute("left");
      }

      if (this.editor.toolbar != null) {
        this.editor.toolbar.toolbar.update();
      }
    }

    this.updateTopBar();
  }

  updateStatus(saving) {
    if (this.currentStatusStrength != this.parent.signalStrength) {
      for (let i = 0; i < this.status.children.length; i++) {
        let child = this.status.children[i];
        if (parseInt(child.getAttribute("strength")) != this.parent.signalStrength) {
          child.setAttribute("hidden", "");
        } else {
          child.removeAttribute("hidden");
        }
      }
      this.currentStatusStrength = this.parent.signalStrength;
    }
    this.currentStatusSaving = saving ?? this.currentStatusSaving;
    if (this.currentStatusSaving == true) {
      this.status.setAttribute("saving", "");
    } else {
      this.status.removeAttribute("saving");
    }
  }

  updateMemberCount(button) {
    button = button ?? this.membersButton;

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
    if (this.parent.handCount > 0) {
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
      this.endSessionButton.style.display = "flex";
    } else {
      this.endSessionButton.style.removeProperty("display");
    }

    this.updateTopBar();
  }

  async updateSplitScreenButton() {
    this.breakoutEnabled = this.lesson.tool.includes("breakout");
    this.breakoutOpen = this.parent.pages["breakout"] != null;
    this.breakoutVisible = this.parent.maximized != true || this.parent.activePageID == "breakout";

    let showBreakoutButton = false;
    if (this.breakoutEnabled == true) {
      if (this.breakoutOpen == false || this.breakoutVisible == false) {
        showBreakoutButton = true;
      }
    } else {
      if (this.parent.self.access > 3 && hasFeatureEnabled("breakout") == true) {
        if (this.breakoutOpen == false || this.breakoutVisible == false) {
          showBreakoutButton = true;
        }
      }
    }

    if (showBreakoutButton == true) {
      if (this.breakoutButton == null) {
        this.bottom.insertAdjacentHTML("beforeend", `<div class="eBottomSection" breakout title="Open Markify Breakout" new><button class="eBreakoutOpen">${breakoutLogoIcon}</button></div>`);
        this.breakoutButton = this.bottom.querySelector(".eBottomSection[new]");
        this.breakoutButton.removeAttribute("new");
        this.breakoutButton.querySelector("button").addEventListener("click", async () => {
          this.breakoutButton.remove();
          this.breakoutButton = null;
          
          if (this.breakoutOpen == false) {
            await this.parent.addPage("breakout", "breakout", { percent: .5 });
          }
          if (this.breakoutVisible == false) {
            this.parent.activePageID = "breakout";
            this.parent.pushToPipelines(null, "page_switch", { pageID: "breakout" });
          }
        });
      }
    } else {
      if (this.breakoutButton != null) {
        this.breakoutButton.remove();
        this.breakoutButton = null;
      }
    }
  }

  async openTimeline(options = {}) {
    this.mainPage.setAttribute("hidden", "");
    this.timelinePage.innerHTML = "";
    this.timelinePage.removeAttribute("hidden");

    let construct = {
      page: this.timelinePage,
      close: () => { this.closeTimeline(); },
      parentPipeline: this.editor.pipeline,

      lesson: this.parent,
      self: this.parent.self,
      session: this.parent.session,
      sessionID: this.parent.sessionID,
      sources: this.parent.sources,
      collaborators: this.parent.collaborators,
      backgroundColor: this.editor.backgroundColor,
      preferenceState: this.editor.preferences.state
    };
    if (options.includeAnnotations != false) {
      construct.annotations = this.editor.annotations;
    }
    this.timeline = await this.setFrame(import("@modules/lesson/subpages/Timeline"), this.timelinePage, { construct });
    this.pipeline = this.timeline.pipeline;
  }
  closeTimeline() {
    this.pipeline = this.editor.pipeline;
    delete this.timeline;

    this.timelinePage.setAttribute("hidden", "");
    this.mainPage.removeAttribute("hidden");

    let timelineContent = this.timelinePage.querySelector(".content");
    setTimeout(() => {
      if (timelineContent != null) {
        timelineContent.remove();
      }
    }, 200);
  }

  async js(frame, extra) {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.lesson = this.parent.lesson;
    this.session = this.parent.session;

    this.page = frame.closest(".content");
    this.mainPage = this.page.querySelector(".boPage[main]");
    this.timelinePage = this.page.querySelector(".boPage[timeline]");

    this.topHolder = this.mainPage.querySelector(".eTopHolder");
    this.top = this.topHolder.querySelector(".eTop");
    this.bottom = this.mainPage.querySelector(".eBottom");

    this.leftTop = this.top.querySelector(".eTopSection[left]");
    this.icon = this.leftTop.querySelector(".eLogo");
    this.lessonName = this.leftTop.querySelector(".eFileName");
    this.fileButton = this.leftTop.querySelector(".eFileDropdown");
    this.createCopyButton = this.leftTop.querySelector(".eCreateCopy");
    this.undoButton = this.leftTop.querySelector(".eUndo");
    this.redoButton = this.leftTop.querySelector(".eRedo");
    this.status = this.leftTop.querySelector(".eStatus");

    this.rightTop = this.top.querySelector(".eTopSection[right]");
    this.membersButton = this.rightTop.querySelector(".eMembers");
    this.endSessionButton = this.rightTop.querySelector(".eEndSession");
    this.shareButton = this.rightTop.querySelector(".eShare");
    this.optionsButton = this.rightTop.querySelector(".eMemberOptions");
    this.sharePinButton = this.rightTop.querySelector(".eSharePin");
    this.zoomButton = this.rightTop.querySelector(".eZoom");
    this.accountButton = this.rightTop.querySelector(".eAccount");
    this.loginButton = this.rightTop.querySelector(".eLogin");

    this.topScrollLeft = this.topHolder.querySelector(".eTopScroll[left]");
    this.topScrollRight = this.topHolder.querySelector(".eTopScroll[right]");

    this.contentHolder = this.mainPage.querySelector(".eContentHolder");

    this.toolbarHolder = this.page.querySelector(".eToolbarHolder");
    this.editorToolbar = this.toolbarHolder.querySelector('.eToolbar[type="editor"]');
    this.viewerToolbar = this.toolbarHolder.querySelector('.eToolbar[type="viewer"]');

    this.currentPageHolder = this.bottom.querySelector(".eBottomSection[right]");
    this.pageTextBox = this.currentPageHolder.querySelector(".eCurrentPage");
    this.increasePageButton = this.currentPageHolder.querySelector(".ePageNav[down]");
    this.decreasePageButton = this.currentPageHolder.querySelector(".ePageNav[up]");

    // Create editor:
    this.editor = await this.setFrame(Editor, this.contentHolder, {
      construct: {
        page: this.mainPage,
        pageID: this.pageID,
        pageType: this.pageType,
        id: this.parent.id,
        lesson: this.parent,
        self: this.parent.self,
        session: this.parent.session,
        sessionID: this.parent.sessionID,
        sources: this.parent.sources,
        pageRenderPipeline: this.parent.pageRenderPipeline,
        collaborators: this.parent.collaborators,
        settings: this.parent.lesson.settings,
        resync: this.resync,
        preferenceState: this.parent.preferences.state,
        backgroundColor: this.lesson.background ?? "FFFFFF",
        minimumEditingAccess: 1
      }
    });
    this.pipeline = this.editor.pipeline;

    // Handle page events:
    this.pipeline.subscribe("checkActivePage", "click_start", () => {
      if (this.parent.activePageID != this.pageID) {
        this.parent.activePageID = this.pageID;
        this.parent.pushToPipelines(null, "page_switch", { pageType: this.pageType, pageID: this.pageID });
      }
    });
    this.pipeline.subscribe("checkPageSwitch", "page_switch", () => { this.updateActivePage(); }, { sort: 1 });
    this.updateActivePage();

    // Main events:
    this.page.addEventListener("pointerdown", (event) => {
      this.pipeline.publish("pointerdown", { event: event });
      this.pipeline.publish("click_start", { type: "pointerdown", event: event });
    }, { passive: false });
    this.page.addEventListener("touchstart", (event) => {
      this.pipeline.publish("touchstart", { event: event });
    }, { passive: false });
    this.page.addEventListener("click", (event) => {
      this.pipeline.publish("click", { event: event });
    }, { passive: false });
    this.page.addEventListener("mouseleave", (event) => {
      this.pipeline.publish("mouseleave", { event: event });
    });
    this.page.addEventListener("contextmenu", (event) => {
      this.pipeline.publish("contextmenu", { event: event });
    });

    // Fetch annotations:
    let pageParam = getParam("page");
    let checkForJumpLink = getParam("annotation");
    (async () => {
      if (this.session == null) {
        return;
      }
      let [annoCode, annoBody] = await sendRequest("GET", "lessons/join/annotations", null, { session: this.parent.session });
      if (annoCode != 200 && connected == true) {
        return this.editor.openAlert("error", `<b>Error Loading Annotations</b>Please try again later...`);
      }
      await this.editor.loadAnnotations(annoBody, { pageID: pageParam, jumpID: checkForJumpLink });
      this.contentHolder.removeAttribute("disabled");
    })();

    // Load additional editor modules:
    (async () => {
      this.editor.register(REALTIME());
      await this.editor.register(TOOLBAR());

      // Handle adding hand tool:
      this.viewerToolbar.querySelector(".eToolbarContent").insertAdjacentHTML("afterbegin", `
        <button class="eTool" tool="hand" tooltip="Raise Hand" noselect style="--theme: var(--green); --hoverColor: rgba(var(--greenRGB), .3)"><div>${raisehandIcon}</div></button>
        <div class="eDivider"></div>
      `);
      this.handButton = this.viewerToolbar.querySelector('.eTool[tool="hand"]');
      this.handButton.addEventListener("click", async () => {
        if (this.editor.self.access != 0) {
          raiseHand.setAttribute("hidden", "");
          return;
        }
        this.handButton.setAttribute("disabled", "");
        if (this.handButton.hasAttribute("selected") == false) {
          let [code] = await sendRequest("PUT", "lessons/members/hand/raise", null, { session: this.editor.session });
          if (code == 200) {
            this.handButton.setAttribute("selected", "");
            this.handButton.setAttribute("tooltip", "Lower Hand");
          }
        } else {
          let [code] = await sendRequest("DELETE", "lessons/members/hand/lower", null, { session: this.editor.session });
          if (code == 200) {
            this.handButton.removeAttribute("selected");
            this.handButton.setAttribute("tooltip", "Raise Hand");
          }
        }
        if (this.editor.toolbar != null) {
          this.editor.toolbar.toolbar.update();
        }
        this.handButton.removeAttribute("disabled", "");
      });

      this.editorToolbar.removeAttribute("notransition");
      this.viewerToolbar.removeAttribute("notransition");
    })();

    // Top bar events:
    this.topScrollLeft.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft - 200, behavior: "smooth" });
    });
    this.topScrollRight.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft + 200, behavior: "smooth" });
    });
    this.pipeline.subscribe("topbarResize", "resize", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { this.updateTopBar(true); });
    this.top.addEventListener("scroll", (event) => { this.pipeline.publish("topbar_scroll", { event }); });

    // Interface events:
    this.pipeline.subscribe("interfaceUpdate", "refresh_interface", () => { this.updateInterface(); });
    this.pipeline.subscribe("boardLessonSet", "set", (body) => {
      if (body.hasOwnProperty("name") == true && (document.activeElement == null || document.activeElement.closest(".eFileName") != this.lessonName)) {
        let name = this.lesson.name ?? "Untitled Lesson";
        this.lessonName.textContent = name;
        this.lessonName.title = name;
      }

      if (this.parent.lesson.pin != null) {
        this.sharePinButton.textContent = this.parent.lesson.pin;
        this.sharePinButton.style.display = "unset";
      } else {
        this.sharePinButton.style.removeProperty("display");
      }

      if (body.hasOwnProperty("tool") == true) {
        this.updateSplitScreenButton();
      }
      
      this.updateInterface();
    });
    this.pipeline.subscribe("accountUpdate", "account_settings", (event) => {
      if (event.settings.hasOwnProperty("toolbar") == true) {
        this.updateInterface();
        this.pipeline.publish("redraw_selection", { redraw: true });
      }
      if (event.settings.hasOwnProperty("actionbar") == true) {
        this.pipeline.publish("redraw_selection", { redraw: true });
      }
    });

    // Exit button event:
    this.icon.addEventListener("click", (event) => {
      event.preventDefault();
      this.editor.save.syncSave(true);
      setPage("pages/app/dashboard");
    });

    // Lesson name events:
    let name = this.lesson.name ?? "Untitled Lesson";;
    this.lessonName.textContent = name;
    this.lessonName.title = name;
    this.lessonName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        this.lessonName.blur();
      }
    });
    this.lessonName.addEventListener("input", () => { this.updateTopBar(); });
    this.lessonName.addEventListener("focusout", async () => {
      this.lessonName.scrollTo(0, 0);
      this.lessonName.parentElement.style.setProperty("--borderWidth", "0px");
      this.updateTopBar();

      let name = this.lessonName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        this.lessonName.textContent = this.lesson.name;
        return;
      }
      if (this.lessonName.textContent == this.lesson.name) {
        this.lessonName.textContent = this.lesson.name;
        return;
      }
      let oldName = this.lesson.name;
      this.lesson.name = name;
      this.lessonName.textContent = name;
      this.lessonName.title = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.session });
      if (code != 200) {
        this.lesson.name = oldName;
        this.lessonName.textContent = oldName;
        this.lessonName.title = oldName;
      }
    });
    this.lessonName.addEventListener("focus", async () => {
      this.lessonName.parentElement.style.setProperty("--borderWidth", "4px");
      this.updateTopBar();
    });
    this.lessonName.addEventListener("paste", clipBoardRead);

    // File dropdown:
    this.fileButton.addEventListener("click", () => {
      this.editor.openDropdown(this.fileButton, FileDropdown, { parent: this });
    });

    // Create copy button:
    this.createCopyButton.addEventListener("click", async () => {
      if (userID == null) {
        return promptLogin();
      }
      this.createCopyButton.setAttribute("disabled", "");
      let copyAlert = await this.editor.openAlert("info", "<b>Creating Copy</b><div>Creating a copy of this lesson.", { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/copy", null, { session: this.editor.session });
      this.createCopyButton.removeAttribute("disabled");
      this.editor.closeAlert(copyAlert);
      if (code == 200) {
        setPage("pages/app/lesson", { params: { lesson: body.lesson } });
      }
    });

    // Undo/Redo history events:
    this.pipeline.subscribe("updateHistory", "history_update", (data) => {
      if (data.history.length > 0 && data.location > -1 && this.editor.self.access > 0) {
        this.undoButton.removeAttribute("disabled");
      } else {
        this.undoButton.setAttribute("disabled", "");
      }
      if (data.history.length > data.location + 1 && this.editor.self.access > 0) {
        this.redoButton.removeAttribute("disabled");
      } else {
        this.redoButton.setAttribute("disabled", "");
      }
    });
    this.undoButton.addEventListener("click", () => { this.editor.history.undo(); });
    this.redoButton.addEventListener("click", () => { this.editor.history.redo(); });

    // Status events:
    this.pipeline.subscribe("statusSignalStrengthUpdate", "signal_strength", () => { this.updateStatus(); });
    this.pipeline.subscribe("statusSavingUpdate", "save_status", (event) => { this.updateStatus(event.saving); });
    this.updateStatus();

    // Member counter events:
    this.pipeline.subscribe("boardMemberJoin", "join", () => { this.updateMemberCount(); });
    this.pipeline.subscribe("boardMemberLeave", "leave", () => { this.updateMemberCount(); });
    this.pipeline.subscribe("boardMemberUpdate", "update", async (body) => {
      let member = this.parent.members[body._id];

      if (this.editor.realtime.module != null) {
        if (body.observe == this.editor.sessionID) { // Being observed:
          this.editor.realtime.observed++;
          this.editor.realtime.module.publishShort(null, "observe", true);
        } else if (body.hasOwnProperty("observe") == true && body.observe != this.editor.sessionID) {
          this.editor.realtime.observed--;
        }
        if (body.weak == true) {
          this.editor.realtime.module.removeRealtime(body._id);
          if (this.editor.realtime.observing == body._id) {
            this.editor.realtime.module.exitObserve();
            this.editor.openAlert("warning", "<b>Observing Ended</b>The member you where observing has too weak a connection, try again later...");
          }
        }
        if (body.observe != null && this.editor.realtime.observing == body._id) {
          this.editor.realtime.module.exitObserve();
          this.editor.openAlert("warning", "<b>Observing Ended</b>The member your observing started watching someone.");
        }
        if (this.editor.realtime.observing == body._id) {
          this.editor.realtime.module.setObserveFrame(member);
        }
      }

      if (body._id == this.parent.sessionID) {
        this.updateInterface();

        if (body.access != null && this.editor.toolbar != null) {
          if (body.access == 0) {
            this.editor.toolbar.toolbar.startTool(this.viewerToolbar.querySelector('.eTool[tool="select"]'));
          } else {
            this.editor.toolbar.toolbar.startTool(this.editorToolbar.querySelector('.eTool[tool="selection"]'), true);
            this.editor.openAlert("info", "<b>You're Now an Editor</b>You have been granted editing access to the lesson!");
          }
        }

        if (this.handButton != null) {
          if (member.hand == null) {
            this.handButton.removeAttribute("selected");
            this.handButton.setAttribute("tooltip", "Raise Hand");
          } else {
            this.handButton.setAttribute("selected", "");
            this.handButton.setAttribute("tooltip", "Lower Hand");
          }
        }
      }

      this.updateMemberCount();
    });
    this.updateMemberCount();

    // Members dropdown:
    this.membersButton.addEventListener("click", () => {
      this.editor.openDropdown(this.membersButton, MembersDropdown, { parent: this });
    });

    // Share dropdowns:
    this.shareButton.addEventListener("click", () => {
      this.editor.openDropdown(this.shareButton, import("@modules/lesson/dropdowns/share/Share"), { parent: this });
    });
    this.sharePinButton.addEventListener("click", () => {
      this.editor.openDropdown(this.sharePinButton, import("@modules/lesson/dropdowns/share/Pin"), { parent: this });
    });
    if (this.lesson.pin != null) {
      this.sharePinButton.style.display = "unset";
      this.sharePinButton.textContent = this.lesson.pin;
    }
    this.optionsButton.addEventListener("click", () => {
      this.editor.openDropdown(this.optionsButton, import("@modules/lesson/dropdowns/share/Options"), { title: "Options", parent: this });
    });
    
    // End session button:
    this.endSessionButton.addEventListener("click", async () => {
      this.endSessionButton.setAttribute("disabled", "");
      await sendRequest("DELETE", "lessons/members/reset", null, { session: this.editor.session });
      this.endSessionButton.removeAttribute("disabled");
    });

    // Zoom event:
    this.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      this.zoomButton.textContent = Math.round(event.zoom * 100) + "%";
      this.updateTopBar();
    });
    this.zoomButton.addEventListener("click", () => {
      this.editor.openDropdown(this.zoomButton, ZoomDropdown);
    });

    // Account setup:
    if (userID != null) {
      this.accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
       this.accountButton.querySelector("img").src = account.image;
      }
      this.accountButton.addEventListener("click", () => {
        this.editor.openDropdown(this.accountButton, import("@modules/dropdowns/Account"), { parent: this });
      });
    } else {
      this.accountButton.remove();
      this.loginButton.style.display = "block";
      this.loginButton.addEventListener("click", () => { promptLogin(); });
    }

    // Page changer events:
    this.pipeline.subscribe("pageTextUpdate", "page_change", (event) => {
      if (this.editor.currentPage > 0) {
        this.currentPageHolder.style.display = "flex";
        modifyParams("page", event.pageId);
      } else {
        this.currentPageHolder.style.display = "none";
        modifyParams("page");
        return;
      }

      this.pageTextBox.innerHTML = "<b>" + this.editor.currentPage + "</b> / " + this.editor.annotationPages.length;

      if (this.editor.currentPage > this.editor.annotationPages.length - 1) {
        this.increasePageButton.setAttribute("disabled", "");
      } else {
        this.increasePageButton.removeAttribute("disabled");
      }
      if (this.editor.currentPage < 2) {
        this.decreasePageButton.setAttribute("disabled", "");
      } else {
        this.decreasePageButton.removeAttribute("disabled");
      }
    });
    this.increasePageButton.addEventListener("click", () => {
      this.editor.setCurrentPage(this.editor.currentPage + 1);
    });
    this.decreasePageButton.addEventListener("click", () => {
      this.editor.setCurrentPage(this.editor.currentPage - 1);
    });
    let alreadyRunningFocus = false;
    this.pageTextBox.addEventListener("focus", async () => {
      if (alreadyRunningFocus == true) {
        return;
      }
      alreadyRunningFocus = true;
      this.pageTextBox.blur();
      this.pageTextBox.innerHTML = "";
      this.pageTextBox.focus();
      alreadyRunningFocus = false;
    });
    this.pageTextBox.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        return this.pageTextBox.blur();
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(this.pageTextBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(this.pageTextBox, "Must be a number");
        } else if (textInt > this.editor.annotationPages.length) {
          event.preventDefault();
          textBoxError(this.pageTextBox, "Maximum of page number " + this.editor.annotationPages.length);
        } else if (textInt < 1) {
          event.preventDefault();
          textBoxError(this.pageTextBox, "Minimum of the first page");
        }
      }
    });
    this.pageTextBox.addEventListener("focusout", () => {
      if (this.pageTextBox.textContent == "") {
        this.pageTextBox.innerHTML = "<b>" + this.editor.currentPage + "</b> / " + this.editor.annotationPages.length;
        return;
      }
      let setPage = parseInt(this.pageTextBox.textContent) ?? 1;
      this.pageTextBox.innerHTML = "<b>" + setPage + "</b> / " + this.editor.annotationPages.length;
      this.editor.setCurrentPage(setPage, false);
    });

    // Splitscreen update events:
    this.pipeline.subscribe("pageAdd", "page_add", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageRemove", "page_remove", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageSwitch", "page_switch", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageMaximize", "maximize", () => { this.updateSplitScreenButton(); });
    this.updateSplitScreenButton();

    // Handle spotlight:
    this.pipeline.subscribe("spotlightStart", "spotlight", async (body) => {
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
      this.pipeline.publish("observe_enable", { memberID: body.member });
      this.editor.closeAlert(this.editor.realtime.observeLoading);
      clearTimeout(this.editor.realtime.observeTimeout);
      let [code] = await sendRequest("GET", "lessons/members/observe?member=" + body.member, null, { session: this.editor.session });
      if (code == 200) {
        this.editor.realtime.observeLoading = await this.editor.openAlert("info", `<b>Connecting to Member</b>Connecting to ${member.name}'s screen from spotlight!`, { time: "never" });
        this.editor.realtime.observeTimeout = setTimeout(() => {
          this.editor.closeAlert(this.editor.realtime.observeLoading);
          this.editor.openAlert("error", `<b>Observe Timeout</b>Failed to connect to their screen, please try again later...`);
          this.editor.realtime.module.exitObserve();
        }, 20000);
      } else {
        if (prevObserve != null) {
          this.editor.realtime.observing = prevObserve;
          this.editor.realtime.module.exitObserve();
        }
        this.editor.realtime.observing = null;
        this.editor.realtime.module.setShortSub(this.visibleChunks);
        this.pipeline.publish("observe_exit", { memberID: body.member });
      }
    });
    
    // Handle new lesson setup:
    if (this.lesson.tool.includes("board") == false) {
      this.contentHolder.removeAttribute("disabled");
      this.mainPage.insertAdjacentHTML("beforeend", `<div class="eCreateBoardHolder"></div>`);
      this.editor.openModal(
        import("@modules/lesson/board/modals/NewBoard"),
        this.mainPage.querySelector(".eCreateBoardHolder"),
        {
          title: "Create Board",
          parent: this,
          callback: ({ modal }) => {
            if (this.lesson.tool.includes("board") == false) {
              this.lesson.tool.unshift("board");
            }
            modifyParams("lesson", this.parent.id);
            if (this.editor.annotationPages.length > 0) {
              this.editor.utils.updateAnnotationScroll([this.editor.annotationPages[0][0]], false);
            } else {
              this.editor.utils.centerWindowWithPage();
            }
            modal.close();
            modifyParams("folder");
            modifyParams("type");
          }
        }
      );
    }

    this.updateInterface();
  }
}