import { userID, account, getParam, modifyParams, sendRequest, connected, copyObject, objectUpdate, textBoxError, clipBoardRead } from "@/crucial";

import { Editor } from "@modules/editor/Editor";
import { REALTIME, TOOLBAR } from "@modules/editor/imports";

import { Frame as FileDropdown } from "../group/dropdowns/File";
import { Frame as MembersDropdown } from "../group/dropdowns/Members";

import { Frame as ZoomDropdown } from "@modules/lesson/dropdowns/Zoom";

import { Frame as WelcomeModal } from "@modules/lesson/breakout/group/modals/Welcome";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import breakoutLogoIcon from "@assets/breakout.svg?raw";
import boardLogoIcon from "@assets/icon.svg?raw";
import undoIcon from "@assets/lesson/history/undo.svg?raw";
import redoIcon from "@assets/lesson/history/redo.svg?raw";
import fullStatusIcon from "@assets/lesson/status/full.svg?raw";
import weakStatusIcon from "@assets/lesson/status/weak.svg?raw";
import noneStatusIcon from "@assets/lesson/status/none.svg?raw";
import observeIcon from "@assets/lesson/members/observe.svg?raw";
import increasePageIcon from "@assets/lesson/navigation/plus.svg?raw";
import decreasePageIcon from "@assets/lesson/navigation/minus.svg?raw";
import { close as closeIcon } from "@modules/utility/core-icons";

export class Page {
  html = `
  <div class="brgInterface customScroll">
    <div class="brgTopHolder">
      <button class="brgTopScroll" left style="left: 7px">${leftArrowIcon}</button>
      <button class="brgTopScroll" right style="right: 7px">${rightArrowIcon}</button>
      <div class="brgTop">
        <div class="brgTopSection" left>
          <a class="brgLogo" href="/app/dashboard" draggable="false">${breakoutLogoIcon}</a>
          <a class="brgClose">${closeIcon}</a>
          <div class="brgGroupNameHolder border"><div class="brgGroupName" spellcheck="false"></div></div>
          <button class="brgFileDropdown" title="File Options">File</button>
          <div class="brgTopDivider"></div>
          <button class="brgSaveProgress brgUndo" title="Undo Edit" disabled>${undoIcon}</button>
          <button class="brgSaveProgress brgRedo" title="Redo Edit" disabled>${redoIcon}</button>
          <div class="brgStatusHolder"><div class="brgStatus">
            <div strength="3" title="Strong Connection | All features seamlessly synced to the cloud.">${fullStatusIcon}</div>
            <div strength="2" title="Weak Connection | Cloud-saved annotations, limited real-time features.">${weakStatusIcon}</div>
            <div strength="1" title="No Connection | Changes stored on-device, synced to cloud upon reconnecting.">${noneStatusIcon}</div>
          </div></div>
        </div>
        <div class="brgTopSection" scroll>
          <div class="brgTopDivider"></div>
        </div>
        <div class="brgTopSection" right>
          <button class="brgJoinGroup">Join Team</button>
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
      <div class="brgToolbar eToolbar" type="editor" keeptooltip notransition></div>
      <div class="brgToolbar eToolbar" type="viewer" keeptooltip notransition></div>
    </div>
    <div class="brgBottomHolder">
      <div class="brgBottom">
        <div class="brgBottomSection" observebottomsection left>
          <div class="brgObserveIcon">${observeIcon}</div>
          <div class="brgObserveText">Observing</div>
          <div class="brgObserveCursor" observecursor></div>
          <button class="brgObserveExit buttonAnim border" observeexit>${closeIcon}</button>
        </div>
        <div class="brgBottomSectionSpacer"></div>
        <div class="brgBottomSection" right>
          <button class="brgPageNav" down>${increasePageIcon}</button>
          <div class="brgCurrentPage border" contenteditable></div>
          <button class="brgPageNav" up>${decreasePageIcon}</button>
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
    ".brgTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
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

    ".brgLogo": `display: none; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".brgLogo:hover": `background: var(--hover)`,
    ".brgLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".brgLogo:hover svg": `transform: scale(.9)`,
    ".brgClose": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".brgClose:hover": `background: var(--hover)`,
    ".brgClose svg": `width: 24px; height: 24px; transition: .2s`,
    ".brgClose:hover svg": `transform: scale(.9)`,
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

    ".brgJoinGroup": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; align-items: center; font-size: 16px; font-weight: 600`,
    ".brgSubmit": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; align-items: center; font-size: 16px; font-weight: 600`,
    ".brgMembers": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".brgMembers span": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB)); display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); border-radius: 12px; font-weight: 700`,
    ".brgMemberCount": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB))`,
    ".brgZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brgAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".brgAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".brgLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    
    ".brgToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".brgBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brgBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".brgBottom::-webkit-scrollbar": `display: none`,
    ".brgBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".brgBottomSection[hidden]": `display: none`,
    ".brgBottomSection:first-child": `border-top-left-radius: 0`,
    ".brgBottomSection:last-child": `border-top-right-radius: 0`,
    ".brgBottomSectionSpacer": `flex: 1`,
    ".brgObserveIcon": `width: 34px; height: 34px; margin: 2px`,
    ".brgObserveIcon svg": `width: 100%; height: 100%`,
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

  members = {};
  memberSessions = {};
  memberCount = 0;

  async close() {
    if (this.editor != null) {
      this.editor.save.syncSave(true);
    }
    if (this.parent.parent.self.access < 4) { // Open to Group View:
      this.parent.openPage("secondary", "groups");
      this.parent.closePage("primary");
    } else { // Open to Overview:
      if ((this.extra ?? {}).editor != null) {
        let state = this.editor.getState();
        this.extra.editor.setState({ zoom: state.zoom, centerPosition: state.centerPosition });
      }
      this.parent.openPage("primary", "overview");
      this.parent.closePage("secondary");
      this.editor.closeShortSub();
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
    let config = this.parent.parent.lesson.breakout ?? {};
    let options = config.options ?? {};
    if (this.parent.parent.self.group == this.group._id || this.parent.parent.self.access > 3) {
      this.editor.viewer = false;

      this.contentHolder.removeAttribute("viewer");
      if (options.setTeamName == true || this.parent.parent.self.access > 3) {
        this.groupName.setAttribute("contenteditable", "");
      } else {
        this.groupName.removeAttribute("contenteditable");
      }
      this.undoButton.style.removeProperty("display");
      this.redoButton.style.removeProperty("display");
      this.joinGroupButton.style.removeProperty("display");
      this.editorToolbar.removeAttribute("hidden");
      this.viewerToolbar.setAttribute("hidden", "");
    } else {
      this.editor.viewer = true;

      this.contentHolder.setAttribute("viewer", "");
      this.groupName.removeAttribute("contenteditable");
      this.undoButton.style.display = "none";
      this.redoButton.style.display = "none";
      if (options.pickTeam == true && (this.parent.parent.self.group == null || options.changeTeam == true)) {
        this.joinGroupButton.style.display = "flex";
      }
      this.viewerToolbar.removeAttribute("hidden");
      this.editorToolbar.setAttribute("hidden", "");
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
      this.editor.updateToolbar();
    }

    this.updateTopBar();
  }

  updateStatus(saving) {
    if (this.currentStatusStrength != this.parent.parent.signalStrength) {
      for (let i = 0; i < this.status.children.length; i++) {
        let child = this.status.children[i];
        if (parseInt(child.getAttribute("strength")) != this.parent.parent.signalStrength) {
          child.setAttribute("hidden", "");
        } else {
          child.removeAttribute("hidden");
        }
      }
      this.currentStatusStrength = this.parent.parent.signalStrength;
    }
    this.currentStatusSaving = saving ?? this.currentStatusSaving;
    if (this.currentStatusSaving == true) {
      this.status.setAttribute("saving", "");
    } else {
      this.status.removeAttribute("saving");
    }
  }

  updateSplitScreenButton() {
    this.boardEnabled = this.parent.parent.lesson.tool.includes("board");
    this.boardOpen = this.parent.parent.pages["board"] != null;
    this.boardVisible = this.parent.parent.maximized != true || this.parent.parent.activePageID == "board";

    let showBoardButton = false;
    if (this.boardEnabled == true) {
      if (this.boardOpen == false || this.boardVisible == false) {
        showBoardButton = true;
      }
    } else if (this.parent.parent.self.access > 3) {
      if (this.boardOpen == false || this.boardVisible == false) {
        showBoardButton = true;
      }
    }

    if (showBoardButton == true) {
      if (this.boardButton == null) {
        this.bottom.insertAdjacentHTML("afterbegin", `<div class="brgBottomSection" board title="Open Markify Board" new><button class="brgBreakoutOpen">${boardLogoIcon}</button></div>`);
        this.boardButton = this.bottom.querySelector(".brgBottomSection[new]");
        this.boardButton.removeAttribute("new");
        let button = this.boardButton.querySelector("button");
        button.addEventListener("click", async () => {
          this.boardButton.remove();
          this.boardButton = null;
          
          if (this.boardOpen == false) {
            await this.parent.parent.addPage("board", "board", { insertBefore: this.parent.pageHolder, percent: .5 });
          }
          if (this.boardVisible == false) {
            this.parent.parent.activePageID = "board";
            this.parent.parent.pushToPipelines(null, "page_switch", { pageID: "board" });
          }
        });
      }
    } else {
      if (this.boardButton != null) {
        this.boardButton.remove();
        this.boardButton = null;
      }
    }
  }

  updateMemberCount(button) {
    if (button == null) {
      button = this.membersButton;
    }

    let memberCountTx = button.querySelector(".brgMemberCount");

    memberCountTx.textContent = this.memberCount;
    if (this.memberCount > 1) {
      memberCountTx.style.display = "flex";
      memberCountTx.parentElement.style.padding = "4px 10px 4px 4px";
    } else {
      memberCountTx.style.removeProperty("display");
      memberCountTx.parentElement.style.removeProperty("padding");
    }

    let config = this.parent.parent.lesson.breakout ?? {};
    let options = config.options ?? {};
    if ((options.maxSize ?? 0) > 0) {
      let memberCount = 0;
      let memberKeys = Object.keys(this.members);
      for (let i = 0; i < memberKeys.length; i++) {
        let key = memberKeys[i];
        let member = this.members[key] ?? [];
        if (member.length == 0) {
          memberCount++;
          continue;
        }
        let lessonMember = this.parent.parent.members[member[0]] ?? {};
        if (lessonMember.group == this.group._id && lessonMember.access < 4) {
          memberCount++;
        }
      }
      if (memberCount < options.maxSize) {
        this.joinGroupButton.removeAttribute("disabled");
      } else {
        this.joinGroupButton.setAttribute("disabled", "");
      }
    } else {
      this.joinGroupButton.removeAttribute("disabled");
    }

    this.updateTopBar();
  }

  async promptWelcomeModal() {
    if (this.parent.parent.self.group != this.group._id) {
      return;
    }
    if (this.welcomeRead == true) {
      return;
    }
    if (this.parent.parent.self.access > 3) {
      return;
    }
    let configuration = this.parent.parent.lesson.breakout ?? {};
    let options = configuration.options ?? {};
    if (options.pickTeam == true || extra.members != null) {
      return;
    }
    //if (Object.keys(this.members).length < 1) {
    let auto = configuration.auto ?? {};
    if ((auto.size ?? 1) < 2 || auto.enabled == false) {
      return;
    }
    this.welcomeRead = true;
    this.frame.insertAdjacentHTML("beforeend", `<div class="boCreateBreakoutHolder"></div>`);
    this.welcomeModal = await this.editor.openModal(WelcomeModal, this.frame.querySelector(".boCreateBreakoutHolder"), { parent: this, title: "Your Team" });
  }

  async js(frame, extra = {}) {
    this.extra = extra;
    if (this.parent.parent.session == null) {
      return this.close();
    }
    if (extra.group == null) {
      let setGroupID = extra.groupID;
      if (extra.groupID == null) {
        setGroupID = this.parent.parent.self.group;
        if (setGroupID == null) {
          return this.close();
        }
      }
      extra.group = { _id: setGroupID, fetch: true };
    }
    this.group = extra.group ?? {};

    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.page = frame.closest(".content");

    this.topHolder = this.page.querySelector(".brgTopHolder");
    this.top = this.topHolder.querySelector(".brgTop");
    this.bottom = this.page.querySelector(".brgBottom");

    this.leftTop = this.top.querySelector(".brgTopSection[left]");
    this.icon = this.leftTop.querySelector(".brgLogo");
    this.closeButton = this.leftTop.querySelector(".brgClose");
    this.groupName = this.leftTop.querySelector(".brgGroupName");
    this.fileButton = this.leftTop.querySelector(".brgFileDropdown");
    this.undoButton = this.leftTop.querySelector(".brgUndo");
    this.redoButton = this.leftTop.querySelector(".brgRedo");
    this.status = this.leftTop.querySelector(".brgStatus");

    this.rightTop = this.top.querySelector(".brgTopSection[right]");
    this.joinGroupButton = this.rightTop.querySelector(".brgJoinGroup");
    this.submitButton = this.rightTop.querySelector(".brgSubmit");
    this.membersButton = this.rightTop.querySelector(".brgMembers");
    this.zoomButton = this.rightTop.querySelector(".brgZoom");
    this.accountButton = this.rightTop.querySelector(".brgAccount");
    this.loginButton = this.rightTop.querySelector(".brgLogin");

    this.topScrollLeft = this.topHolder.querySelector(".brgTopScroll[left]");
    this.topScrollRight = this.topHolder.querySelector(".brgTopScroll[right]");

    this.contentHolder = this.page.querySelector(".brgContentHolder");

    this.toolbarHolder = this.page.querySelector(".brgToolbarHolder");
    this.editorToolbar = this.toolbarHolder.querySelector('.brgToolbar[type="editor"]');
    this.viewerToolbar = this.toolbarHolder.querySelector('.brgToolbar[type="viewer"]');
    this.selectButton = this.viewerToolbar.querySelector('.eTool[tool="select"]');
    this.panButton = this.viewerToolbar.querySelector('.eTool[tool="pan"]');

    this.currentPageHolder = this.bottom.querySelector(".brgBottomSection[right]");
    this.pageTextBox = this.currentPageHolder.querySelector(".brgCurrentPage");
    this.increasePageButton = this.currentPageHolder.querySelector(".brgPageNav[down]");
    this.decreasePageButton = this.currentPageHolder.querySelector(".brgPageNav[up]");

    // Exit button event:
    this.closeButton.addEventListener("click", () => { this.close(); });

    // Load members if nothing is passed:
    if (extra.members != null) {
      for (let i = 0; i < extra.members.length; i++) {
        this.members[extra.members[i]] = [];
      }
    }

    // Fetch annotations:
    let fetchAnnotations;
    if (extra.editor == null) {
      fetchAnnotations = sendRequest("GET", "lessons/join/annotations?group=" + this.group._id, null, { session: this.parent.parent.session });
    }

    // Load group if nothing is passed:
    if ((this.group ?? {}).fetch == true || this.members == null) {
      delete this.group.fetch;
      let [code, body] = await sendRequest("GET", "lessons/breakout/groups?group=" + this.group._id, null, { session: this.parent.parent.session });
      if (code != 200) {
        return this.close();
      }
      this.group = body.group;
      for (let i = 0; i < body.members.length; i++) {
        let collaborator = body.members[i];
        this.parent.parent.collaborators[collaborator._id] = collaborator;
        if (this.members[collaborator._id] == null) {
          this.members[collaborator._id] = [];
        }
      }
      this.welcomeRead = body.read;
    }

    // Create member sessions:
    this.memberSessions = {};
    if (extra.memberSessions == null) {
      let memberKeys = Object.keys(this.parent.parent.members);
      for (let i = 0; i < memberKeys.length; i++) {
        let memberID = memberKeys[i];
        let member = this.parent.parent.members[memberID];
        let session = this.memberSessions[member.modify];
        if (session == null) {
          this.memberSessions[member.modify] = [];
          session = this.memberSessions[member.modify];
        }
        session.push(memberID);
        if ((member.group == this.group._id || member.previewGroup == this.group._id) && this.members[member.modify] == null) {
          this.members[member.modify] = [];
        }
      }
    } else {
      this.memberSessions = copyObject(extra.memberSessions);
    }

    // Figure out which member sessions are in this group:
    let checkCollaborators = Object.keys(this.members);
    for (let c = 0; c < checkCollaborators.length; c++) {
      let modifyID = checkCollaborators[c];
      let sessions = this.memberSessions[modifyID] ?? [];
      for (let s = 0; s < sessions.length; s++) {
        let member = this.parent.parent.members[sessions[s]];
        if (member.group == this.group._id || member.previewGroup == this.group._id || member._id == this.parent.parent.self._id) {
          this.members[modifyID].push(member._id);
          this.memberCount++;
        }
      }
    }

    // Create editor:
    this.editor = await this.setFrame(Editor, this.contentHolder, {
      construct: {
        page: this.page,
        pageID: this.parent.pageID,
        pageType: this.parent.pageType,
        active: this.parent.parent.active,
        
        lesson: this.parent.parent,
        self: this.parent.parent.self,
        session: this.parent.parent.session,
        sessionID: this.parent.parent.sessionID,
        sources: this.parent.parent.sources,
        pageRenderPipeline: this.parent.parent.pageRenderPipeline,
        collaborators: this.parent.parent.collaborators,
        settings: this.parent.parent.lesson.settings,
        resync: this.parent.parent.resync,
        preferenceState: this.parent.parent.preferences.state,
        backgroundColor: this.group.background ?? "FFFFFF",

        id: this.group._id,
        parameters: [("group=" + this.group._id)],
        includeIdInShortPublish: true
      },
      showLoading: extra.editor == null
    });
    this.pipeline = this.editor.pipeline;

    // Load Annotations:
    let pageParam = getParam("page");
    let checkForJumpLink = getParam("annotation");
    (async () => {
      let annoBody;
      if (fetchAnnotations != null) {
        let result = await fetchAnnotations;
        if (result[0] != 200 && connected == true) {
          return this.editor.openAlert("error", `<b>Error Loading Annotations</b>Please try again later...`);
        }
        annoBody = result[1];
        await this.editor.loadAnnotations(annoBody, { pageID: pageParam, jumpID: checkForJumpLink });
      } else {
        let state = extra.editor.getState();
        let annotations = {};
        let annoKeys = Object.keys(state.annotations);
        for (let i = 0; i < annoKeys.length; i++) { // Copy annotations:
          let annoID = annoKeys[i];
          let anno = state.annotations[annoID];
          annotations[annoID] = { chunks: anno.chunks, render: anno.render };
        }
        await this.editor.setState(copyObject({ ...state, annotations }));
      }
      this.contentHolder.removeAttribute("disabled");
    })();

    // Template change event:
    this.pipeline.subscribe("templateChange", "templatechange", (body) => {
      this.editor.applyRootTemplate(body.annotations);
      this.editor.openAlert("info", "<b>Root Template Updated</b>The lesson owner has updated the base document.");
    });

    // Load additional editor modules:
    (async () => {
      let realtimeModule = REALTIME();
      await this.editor.register(TOOLBAR());

      if (this.parent.parent.self.group != this.group._id || this.parent.parent.self.access > 3) {
        let [code] = await sendRequest("PUT", "lessons/breakout/groups/preview?group=" + this.group._id, null, { session: this.parent.parent.session });
        if (code != 200) {
          return;
        }
      }
      this.editor.register(realtimeModule);

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
    this.pipeline.subscribe("templateSet", "set", (body) => {
      if (body.id != this.group._id) {
        if (body.hasOwnProperty("breakout") == true) {
          if (body.breakout.options == null || body.breakout.options.galleryWalk != true) {
            if (this.parent.parent.self.group != this.group._id) {
              return this.close();
            }
          }
        }
        return this.updateInterface();
      }
      objectUpdate(body, this.group);

      if (body.hasOwnProperty("name") == true && document.activeElement.closest(".brgGroupName") != this.groupName) {
        let name = this.group.name ?? "Untitled Team";
        this.groupName.textContent = name;
        this.groupName.title = name;
      }

      if (body.hasOwnProperty("background") == true) {
        this.editor.updateBackground(body.background);
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

    // Lesson name events:
    let name = this.group.name ?? "Untitled Lesson";
    this.groupName.textContent = name;
    this.groupName.title = name;
    this.groupName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        this.groupName.blur();
      }
    });
    this.groupName.addEventListener("input", () => { this.updateTopBar(); });
    this.groupName.addEventListener("focusout", async () => {
      this.groupName.scrollTo(0, 0);
      this.groupName.parentElement.style.setProperty("--borderWidth", "0px");
      this.updateTopBar();

      let name = this.groupName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        this.groupName.textContent = this.group.name;
        return;
      }
      if (this.groupName.textContent == this.group.name) {
        this.groupName.textContent = this.group.name;
        return;
      }
      let oldName = this.group.name;
      this.group.name = name;
      this.groupName.textContent = name;
      this.groupName.title = name;
      let [code] = await sendRequest("POST", "lessons/breakout/groups/name?group=" + this.group._id, { name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.group.name = oldName;
        this.groupName.textContent = oldName;
        this.groupName.title = oldName;
      }
    });
    this.groupName.addEventListener("focus", async () => {
      this.groupName.parentElement.style.setProperty("--borderWidth", "4px");
      this.updateTopBar();
    });
    this.groupName.addEventListener("paste", clipBoardRead);

    // File dropdown:
    this.fileButton.addEventListener("click", () => {
      this.editor.openDropdown(this.fileButton, FileDropdown, { parent: this });
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

    // Join group listener:
    this.joinGroupButton.addEventListener("click", async () => {
      this.joinGroupButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/breakout/groups/join?group=" + this.group._id, null, { session: this.parent.parent.session });
      this.joinGroupButton.removeAttribute("disabled");
    });

    // Members dropdown:
    this.membersButton.addEventListener("click", () => {
      this.editor.openDropdown(this.membersButton, MembersDropdown, { parent: this });
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

    // Member events:
    this.pipeline.subscribe("memberJoin", "join", (data) => {
      let groupMember = this.members[data.modify];
      if (data.group == this.group._id || data.previewGroup == this.group._id) {
        if (groupMember == null) {
          this.members[data.modify] = [];
          groupMember = this.members[data.modify];
        }
        if (groupMember.includes(data._id) == false) {
          groupMember.push(data._id);
          this.memberCount++;
          this.updateMemberCount();
        }
      } else if (groupMember != null) {
        let index = groupMember.indexOf(data._id);
        if (index > -1) {
          groupMember.splice(index, 1);
          this.memberCount--;
        }
        if (groupMember.length < 1 && (data.access > 3 || data.group != this.group._id)) {
          delete this.members[data.modify];
        }
        if (index > -1) {
          this.updateMemberCount();
        }
      }
    }, { sort: 1 });
    this.pipeline.subscribe("memberUpdate", "update", (data) => {
      if (data.hasOwnProperty("group") == true || data.hasOwnProperty("previewGroup") == true) {
        let member = this.parent.parent.members[data._id];
        if (member == null) {
          return;
        }
        let groupMember = this.members[member.modify];
        if (data.group == this.group._id || data.previewGroup == this.group._id) {
          if (groupMember == null) {
            this.members[member.modify] = [];
            groupMember = this.members[member.modify];
          }
          if (groupMember.includes(data._id) == false) {
            groupMember.push(data._id);
            this.memberCount++;
            this.updateMemberCount();
          }
        } else if (groupMember != null) {
          let index = groupMember.indexOf(data._id);
          if (index > -1) {
            groupMember.splice(index, 1);
            this.memberCount--;
          }
          if (groupMember.length < 1 && (member.access > 3 || member.group != this.group._id)) {
            delete this.members[member.modify];
          }
          if (index > -1) {
            this.updateMemberCount();
          }
          this.editor.removeRealtime(data._id);
        }
      }
    }, { sort: 1 });
    this.pipeline.subscribe("memberLeave", "leave", (data) => {
      if (data.member != null) {
        let groupMember = this.members[data.member.modify];
        if (groupMember != null) {
          let index = groupMember.indexOf(data.member._id);
          if (index > -1) {
            groupMember.splice(index, 1);
            this.memberCount--;
          }
          if (groupMember.length < 1 && data.member.group != this.group._id) {
            delete this.members[data.member.modify];
          }
          if (index > -1) {
            this.updateMemberCount();
          }
        }
      }
    }, { sort: 1 });
    this.updateMemberCount();

    // Promot welcome modal event:
    this.pipeline.subscribe("memberAssign", "memberassign", (data) => {
      this.parent.parent.collaborators[data.collaborator._id] = data.collaborator;
      let groupMember = this.members[data.collaborator._id];
      if (data.group == this.group._id || data.previewGroup == this.group._id) {
        if (groupMember == null) {
          this.members[data.collaborator._id] = [];
        }
        this.promptWelcomeModal();
      } else if (groupMember != null) {
        for (let i = 0; i < groupMember.length; i++) {
          this.editor.removeRealtime(groupMember[i]);
        }
        this.memberCount -= groupMember.length;
        delete this.members[data.collaborator._id];
        this.updateMemberCount();
      }
    }, { sort: 1 });
    this.promptWelcomeModal();

    // Set URL parameter:
    modifyParams("team", this.group._id);

    this.updateInterface();
  }
}