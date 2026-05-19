import {
  body,
  fixed,
  favicon,

  userID,
  account,

  changeGlobalImports,
  mouseDown,
  setPage,
  setFrame,
  sleep,
  getParam,
  modifyParams,
  getEpoch,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  objectUpdate,
  copyObject,
  getObject,
  textBoxError,
  clipBoardRead,
  promptLogin,
  hasFeatureEnabled
} from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
import { alert as alertModule } from "@modules/utility/Alert";

import { Frame as FileDropdown } from "../overview/FileDropdown";

import { MasonryLayout } from "../overview/MasonryLayout";

import { Pipeline } from "@modules/editor/Pipeline";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import breakoutLogoIcon from "@assets/breakout.svg?raw";
import boardLogoIcon from "@assets/icon.svg?raw";

export class Page {
  constructor() {
    this.pipeline = new Pipeline;
    this.layout = new MasonryLayout(this);
  }

  html = `
  <div class="broInterface customScroll">
    <div class="broTopHolder">
      <button class="broTopScroll" left style="left: 7px">${leftArrowIcon}</button>
      <button class="broTopScroll" right style="right: 7px">${rightArrowIcon}</button>
      <div class="broTop">
        <div class="broTopSection" left>
          <a class="broLogo" href="/app/dashboard" draggable="false">${breakoutLogoIcon}</a>
          <div class="broFileNameHolder border"><div class="broFileName" spellcheck="false" onpaste="clipBoardRead(event)" contenteditable></div></div>
          <button class="broFileDropdown">File</button>
          <button class="broStart" disabled></button>
          <button class="broPause" disabled>Pause</button>
        </div>
        <div class="broTopSection" scroll>
          <div class="broTopDivider"></div>
        </div>
        <div class="broTopSection" right>
          <button class="broManageDropdown" title="Manage team and member settings for this lesson.">Manage</button>
          <button class="broShare" title="Share this lesson to bring in members.">Share</button>
          <button class="broSharePin"></button>
          <div class="broTopDivider"></div>
          <button class="broAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
          <button class="broLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="broBottomHolder">
      <div class="broBottom">
        <div class="broBottomSection broOpenBoard">
          <button title="Open Markify Board">${boardLogoIcon}</button>
        </div>
        <div class="broBottomSection broWaitingRoom">
          <div class="broWaitingRoomMenu">
            <div class="broWaitingRoomButtonHolder">
              <div class="broWaitingRoomButtonHolderShadow"></div>
              <div class="broWaitingRoomButtonHolderScroll">
                <button class="broWaitingRoomButton" open><span title="Number of unassigned members."></span>Members</button>
                <button class="broWaitingRoomButton" close>Close</button>
              </div>
            </div>
            <div class="broWaitingRoomContent">
              <div class="broWaitingRoomHolder customScroll"></div>
            </div>
          </div>
        </div>
        <div class="broBottomButtonSpacer"></div>
      </div>
    </div>
  </div>
  <div class="broGroupHolder customScroll">
    <div class="broGroups"></div>
  </div>
  `;
  css = {
    ".brPage[dragging] *": `user-select: none; webkit-user-select: none; cursor: grabbing !important`,

    ".broInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; contain: strict; overflow-y: scroll; z-index: 2`,
    ".broGroupHolder": `--interfacePadding: 58px; --tilePadding: 16px; --totalWidth: calc((var(--columnWidth) * var(--columnCount)) + (var(--tilePadding) * (var(--columnCount) - 1))); position: relative; box-sizing: border-box; display: flex; width: 100%; height: 100%; padding-top: calc(var(--interfacePadding) + 8px); background: var(--pageColor); contain: strict; overflow-x: hidden; overflow-y: scroll; overflow-anchor: none; z-index: 1; justify-content: center; transition: .5s`,
    ".broGroups": `position: absolute; box-sizing: border-box; width: var(--totalWidth); height: calc(var(--totalHeight) + var(--interfacePadding) + 8px); z-index: 2; transition: width .3s`,
    ".broCreateBreakoutHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; z-index: 3; pointer-events: none`,

    ".broTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".broTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".broTopHolder[scroll] .broTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".broTop::-webkit-scrollbar": `display: none`,
    ".broTopSection[scroll]": `display: none`,
    ".broTopHolder[scroll] .broTopSection[scroll]": `display: flex !important`,
    ".broTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".broTopScroll svg": `width: 22px`,
    ".broTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".broTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".broTopHolder[scroll] .broTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".broTopSection[left]": `border-bottom-right-radius: 12px`,
    ".broTopSection[right]": `border-bottom-left-radius: 12px`,

    ".broLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".broLogo:hover": `background: var(--hover)`,
    ".broLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".broLogo:hover svg": `transform: scale(.9)`,
    ".broFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".broFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".broFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".broFileName::-webkit-scrollbar": `display: none`,
    ".broFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".broStart": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".broPause": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".broManageDropdown": `display: none; padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--hover); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".broShare": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".broTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,

    ".broSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".broAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".broAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".broLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
  
    ".broBottomHolder": `position: relative; flex: 1; width: 100%; margin: auto 0 8px 0; visibility: visible`,
    ".broBottom": `position: absolute; display: flex; width: 100%; height: 100%; padding-top: 8px; left: 0px; top: 0px; overflow-x: auto; overflow-y: hidden; justify-content: space-between; align-items: flex-end; scrollbar-width: none`,
    ".broBottom::-webkit-scrollbar": `display: none`,
    ".broBottomSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".broBottomSection[hidden]": `display: none`,
    ".broBottomSection:first-child": `border-top-left-radius: 0`,
    ".broBottomSection:last-child": `border-top-right-radius: 0`,
    ".broWaitingRoom": `position: relative; display: flex !important; flex: 1; min-width: 150px; padding: 0; margin: 0 8px; justify-content: center; align-items: center; background: unset !important; box-shadow: unset !important; pointer-events: none; transition: .2s`,
    ".broWaitingRoom[hidden] *": `pointer-events: none !important`,
    ".broWaitingRoomMenu": `position: absolute; display: flex; flex-direction: column; width: 100%; left: 0px; top: 0px; align-items: center; transition: .4s`,
    ".broWaitingRoom:not([hidden]) .broWaitingRoomMenu[open]": `transform: translateY(calc(50px - 100%))`,
    ".broWaitingRoomButtonHolder": `position: relative; width: fit-content; max-width: calc(100% - 24px); background: var(--pageColor); border-radius: 12px 12px 0 0; z-index: 2; pointer-events: all`,
    ".broWaitingRoomButtonHolderShadow": `position: absolute; width: 100%; height: 100%; left: -16px; top: -16px; padding: 16px 16px 0 16px; overflow: hidden; z-index: -1; border-radius: inherit; pointer-events: none`,
    ".broWaitingRoomButtonHolderShadow:after": `content: ""; position: absolute; width: calc(100% - 32px); height: calc(100% - 16px); left: 16px; top: 16px; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".broWaitingRoomButtonHolderScroll": `box-sizing: border-box; display: flex; max-width: 100%; height: 50px; padding: 6px; align-items: center; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".broWaitingRoomButtonHolderScroll::-webkit-scrollbar": `display: none`,
    ".broWaitingRoomButton": `display: flex; height: 32px; padding: 6px 10px; margin: 4px; border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600; white-space: nowrap`,
    ".broWaitingRoomButton span": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB)); display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); border-radius: 12px; font-weight: 700`,
    ".broWaitingRoomButton[open]": `background: var(--hover)`,
    ".broWaitingRoomButton[close]": `display: none; background: var(--theme); color: #fff`,
    ".broWaitingRoomMenu[open] .broWaitingRoomButton[close]": `display: flex !important`,
    ".broWaitingRoomContent": `position: relative; width: 100%; background: var(--pageColor); border-radius: 12px 12px 0 0; overflow: hidden; z-index: 1; pointer-events: all; transition: .4s`,
    ".broWaitingRoomMenu[open] .broWaitingRoomContent": `box-shadow: var(--lightShadow)`,
    ".broWaitingRoomHolder": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 8px; width: 100%; max-height: 40vh; padding: 16px; overflow-y: auto; overflow-x: hidden; justify-content: center`,
    ".broWaitingRoomHolder .broTileMember": `width: fit-content !important; margin: unset !important`,
    ".broWaitingRoomHolder .broTileMemberContent": `padding: 6px 12px 6px 6px !important`,

    ".broBottomButtonSpacer": `display: none; flex-shrink: 0; width: 50px`,
    ".broOpenBoard": `display: none; box-shadow: var(--boardLightShadow)`,
    ".broOpenBoard button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".broOpenBoard button:hover": `background: var(--boardHover)`,
    ".broOpenBoard button svg": `width: 32px; height: 32px; transition: .2s`,
    ".broOpenBoard button:hover svg": `transform: scale(.9)`,

    ".broTile": `position: absolute; width: var(--columnWidth); height: fit-content; left: 0px; top: 0px; z-index: 1; transition: .3s`, // will-change: transform;
    ".broTileContent": `--shadow: var(--lightShadow); position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 16px; contain: strict; overflow: hidden; transition: .2s, transform .1s`,
    ".broTile:hover .broTileContent": `--shadow: var(--darkShadow) !important`,
    ".broTile:active .broTileContent": `transform: scale(.95)`,
    ".broTilePreviewContainer": `position: relative; flex-shrink: 0; width: 100%; height: var(--previewHeight); z-index: 1`,
    ".broTilePreviewContainer:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: all !important`,
    ".broTilePreview": `position: absolute; width: calc(var(--previewWidth) * (1 / var(--previewScale))); height: calc(var(--previewWidth) * var(--previewHeightRatio) * (1 / var(--previewScale))); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(var(--previewScale)); transform-origin: center; background: var(--pageColor); contain: strict; overflow: scroll; scrollbar-width: none; transition: opacity .4s`,
    ".broTilePreview::-webkit-scrollbar": `display: none`,
    ".broTileHeader": `position: absolute; display: flex; gap: 8px; width: 100%; left: 0px; top: 0px; justify-content: space-between; z-index: 3; pointer-events: none`,
    ".broTileHeaderName": `display: flex; box-sizing: border-box; gap: 0; min-width: 0; padding: 6px; align-items: center; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 0 0 16px 0; overflow: hidden; pointer-events: all; transition: .2s`,
    ".broTileHeaderName:focus-within": `gap: 6px`,
    ".broTileHeaderNameImage": `display: none; flex-shrink: 0; width: 30px; height: 30px; border-radius: 10px; object-fit: cover`,
    ".broTileHeaderNameHolder": `--borderRadius: 6px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s; min-width: 0; height: 30px; align-content: center`,
    ".broTileHeaderNameHolder:focus-within": `--borderWidth: 2px !important`,
    ".broTileHeaderNameHolderText": `max-width: 100%; padding: 0 6px; outline: unset; font-size: 18px; font-weight: 500; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".broTileHeaderNameHolderText:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important; cursor: text`,
    ".broTileHeaderNameHolderText::-webkit-scrollbar": `display: none`,
    ".broTileHeaderOptions": `display: flex; box-sizing: border-box; padding: 2px; justify-content: center; align-items: center; background: var(--pageColor); opacity: 0; box-shadow: var(--shadow); border-radius: 0 0 0 16px; pointer-events: all; transition: .2s`,
    ".broTile:hover .broTileHeaderOptions": `opacity: 1 !important`,
    ".broTileHeaderOptionsButton": `display: flex; width: 30px; height: 30px; margin: 4px; flex-shrink: 0; justify-content: center; align-items: center; border-radius: 16px`,
    ".broTileHeaderOptionsButton > svg": `flex-shrink: 0; width: 24px; height: 24px`,
    ".broTileHeaderOptionsButton:hover": `background: var(--hover)`,
    ".broTileMembers": `position: relative; flex: 1; width: 100%; padding-bottom: 6px; background: var(--pageColor); z-index: 2`,
    ".broTileMembers:has(> .broTileMember):before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; box-shadow: var(--shadow); transition: .2s`,
    ".broTileMember": `--shadow: var(--lightShadow); --workPercent: 0; --workInvert: 0; --workThemeColor: var(--theme); position: relative; width: calc(100% - 12px); padding: 0; margin: 6px 6px 0; background: var(--pageColor); border-radius: 10px; cursor: grab`,
    ".broTileMember:hover, .broTileMember:active, .broTileMember[dragging]": `--shadow: var(--darkShadow)`,
    ".broTileMember:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; pointer-events: none; box-shadow: var(--shadow); transition: .2s`,
    ".broTileMemberContent": `display: flex; box-sizing: border-box; width: 100%; gap: 6px; padding: 6px; overflow: hidden; justify-content: space-between`,
    ".broTileMemberNameHolder": `display: flex; min-width: 0; align-items: center`,
    ".broTileMember:not([active]) .broTileMemberNameHolder > div:not(.broTileMemberNameDragHolder)": `opacity: .5 !important`,
    ".broTileMemberNameDragHolder": `--transformTranslate: translateX(calc(-6px - 100%)); width: 0px; height: 28px; margin-right: 0px; transition: .2s`,
    ".broTileMember:hover .broTileMemberNameDragHolder, .broTileMember:active .broTileMemberNameDragHolder, .broTileMember[dragging] .broTileMemberNameDragHolder, .broWaitingRoomHolder .broTileMemberNameDragHolder": `--transformTranslate: translateX(0px); width: 16px; margin-right: 6px`,
    ".broTileMemberNameDragHandle": `display: flex; flex-direction: column; box-sizing: border-box; width: 16px; height: 28px; padding: 4px 0; justify-content: space-between; align-items: center; transform: var(--transformTranslate); transition: .2s`,
    ".broTileMemberNameDragHandleDot": `width: 100%; height: 4px; border-radius: 2px; background: var(--gray)`,
    ".broTileMemberNameCursor": `flex-shrink: 0; position: relative; box-sizing: border-box; width: 28px; height: 28px; margin-right: 6px; background: var(--pageColor); border: solid 4px var(--themeColor); border-radius: 8px 14px 14px; transition: .2s`,
    //".broTileMemberNameCursor:before": `content: ""; position: absolute; width: calc(100% + 6px); height: calc(100% + 6px); left: -3px; top: -3px; border-radius: inherit; contain: strict; box-shadow: 0 0 6px rgb(0 0 0 / 25%); transition: .2s`,
    ".broTileMemberNameText": `font-size: 16px; font-weight: 500; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: .2s`,
    ".broTileMemberPercent": `flex-shrink: 0; position: relative; display: var(--workDisplay); width: 36px; height: 16px; margin: 4px; border: solid 2px var(--workThemeColor); border-radius: 12px; transition: .2s`,
    //".broTileMemberPercent:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; box-shadow: inset 0px 0px 8px 0px rgba(var(--themeRGB), .3); transition: .2s`,
    ".broTileMemberPercentBarHolder": `position: absolute; width: calc(100% - 4px); height: calc(100% - 4px); left: 2px; top: 2px; border-radius: 8px; overflow: hidden`,
    ".broTileMemberPercentBar": `--width: calc((var(--workPercent) * ((32px / 2) - 2px))); position: absolute; width: calc(4px + var(--width)); height: 100%; left: calc((100% / 2) - 2px); transform: translateX(calc(var(--workInvert) * var(--width) * -1)); background: var(--workThemeColor); border-radius: 2px; transition: .2s`,

    ".broTileAddGroup": `padding: 0; z-index: 2 !important`,
    ".broTileAddGroup .broTileContent": `--opacity: .3; --pageColor: rgba(var(--background), 0); box-sizing: border-box; padding: 12px; background: rgba(var(--themeRGB), var(--opacity)); justify-content: center; align-items: center`,
    ".broTileAddGroup:hover .broTileContent": `--opacity: 1; --pageColor: rgba(var(--background), 1); transform: scale(1.05); border-radius: 20px`,
    ".broTileAddGroup:active .broTileContent": `transform: scale(.98)`,
    ".broTileAddGroup .broTileContent svg": `width: 100%; height: 100%`
  };

  scrollOffset = 58;

  unassignedMembers = 0;

  templateRoots = {};

  getTemplate() {
    if (this.template != null) {
      return this.template;
    }
    let templateID = (this.parent.parent.lesson.breakout ?? {}).template;
    if (templateID == null) {
      return;
    }
    if (this.fetchTemplatePromise != null) {
      return this.fetchTemplatePromise;
    }
    this.fetchTemplatePromise = new Promise(async (resolve) => {
      let [code, body] = await sendRequest("GET", "lessons/breakout/templates?template=" + templateID, null, { session: this.parent.parent.session });
      if (code != 200) {
        return resolve({});
      }
      this.template = body;
      resolve(body);
    });
    return this.fetchTemplatePromise;
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
    let breakout = this.parent.parent.lesson.breakout ?? {};

    this.startButton.style.removeProperty("display");
    this.pauseButton.style.removeProperty("display");
    this.manageButton.style.removeProperty("display");
    switch ("enabled") { //breakout.status ?? "ended"
      case "disabled":
        this.startButton.textContent = "Start";
        this.startButton.style.display = "unset";
        this.manageButton.style.display = "unset";
        break;
      case "enabled":
        //this.pauseButton.style.display = "unset";
        this.manageButton.style.display = "unset";
        break;
      case "paused":
        this.startButton.textContent = "Resume";
        this.startButton.style.display = "unset";
        this.manageButton.style.display = "unset";
        break;
      case "ended":
        this.startButton.textContent = "Setup";
        this.startButton.style.display = "unset";
    }
    
    this.updateTopBar();
  }

  waitingRoomOpen = false;
  openWaitingRoom() {
    this.waitingRoomOpen = true;
    this.waitingRoom.setAttribute("open", "");
  }
  closeWaitingRoom() {
    this.waitingRoomOpen = false;
    this.waitingRoom.removeAttribute("open");
  }

  async updateSplitScreenButton() {
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
      this.openBoardHolder.style.display = "flex";
      this.bottomButtonSpacer.style.display = "flex";
    } else {
      this.openBoardHolder.style.removeProperty("display");
      this.bottomButtonSpacer.style.removeProperty("display");
    }
  }

  async js() {
    this.frame.style.position = "relative";
    this.frame.style.width = "100%";
    this.frame.style.height = "100%";

    this.page = this.frame.closest(".brPage");

    this.topHolder = this.frame.querySelector(".broTopHolder");
    this.top = this.topHolder.querySelector(".broTop");

    this.leftTop = this.top.querySelector(".broTopSection[left]");
    this.icon = this.leftTop.querySelector(".broLogo");
    this.lessonName = this.leftTop.querySelector(".broFileName");
    this.fileButton = this.leftTop.querySelector(".broFileDropdown");
    this.startButton = this.leftTop.querySelector(".broStart");
    this.pauseButton = this.leftTop.querySelector(".broPause");

    this.rightTop = this.top.querySelector(".broTopSection[right]");
    this.manageButton = this.rightTop.querySelector(".broManageDropdown");
    this.shareButton = this.rightTop.querySelector(".broShare");
    this.sharePinButton = this.rightTop.querySelector(".broSharePin");
    this.accountButton = this.rightTop.querySelector(".broAccount");
    this.loginButton = this.rightTop.querySelector(".broLogin");

    this.topScrollLeft = this.topHolder.querySelector(".broTopScroll[left]");
    this.topScrollRight = this.topHolder.querySelector(".broTopScroll[right]");

    this.groupHolder = this.frame.querySelector(".broGroupHolder");
    this.groups = this.groupHolder.querySelector(".broGroups");

    this.bottom = this.frame.querySelector(".broBottom");
    this.openBoardHolder = this.bottom.querySelector(".broOpenBoard");
    this.openBoard = this.openBoardHolder.querySelector("button");
    this.waitingRoomHolder = this.bottom.querySelector(".broWaitingRoom");
    this.waitingRoom = this.bottom.querySelector(".broWaitingRoomMenu");
    this.waitingRoomOpenButton = this.waitingRoom.querySelector(".broWaitingRoomButton[open]");
    this.waitingRoomOpenButtonCount = this.waitingRoomOpenButton.querySelector("span");
    this.waitingRoomCloseButton = this.waitingRoom.querySelector(".broWaitingRoomButton[close]");
    this.waitingRoomMembersHolder = this.waitingRoom.querySelector(".broWaitingRoomHolder");
    this.bottomButtonSpacer = this.bottom.querySelector(".broBottomButtonSpacer");

    // Top bar events:
    this.topScrollLeft.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft - 200, behavior: "smooth" });
    });
    this.topScrollRight.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft + 200, behavior: "smooth" });
    });
    this.pipeline.subscribe("topbarResize", "resize", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { this.updateTopBar(true); });
    this.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", () => { this.updateTopBar(); });
    this.top.addEventListener("scroll", (event) => { this.pipeline.publish("topbar_scroll", { event }); });

    // Interface events:
    this.startButton.addEventListener("click", () => {
      // TODO
    });
    this.pauseButton.addEventListener("click", () => {
      // TODO
    });
    this.pipeline.subscribe("overviewLessonSet", "set", (body) => {
      if (body.hasOwnProperty("breakout") == true) {
        if (body.breakout.hasOwnProperty("status") == true && this.setupModal != null) {
          this.setupModal.close();
        }
        if (body.breakout.hasOwnProperty("version") == true) {
          this.layout.addTile({ _id: "NEW_GROUP_CREATE", version: body.breakout.version }, null, true);
        }
      }
      if (this.template != null && (body.id ?? body._id) == this.template._id) {
        objectUpdate(body, this.template);
      }
      if (body.name != null && document.activeElement.closest(".broFileName") != this.lessonName) {
        let name = this.parent.parent.lesson.name ?? "Untitled Lesson";
        this.lessonName.textContent = name;
        this.lessonName.title = name;
      }
      if (this.parent.parent.lesson.pin != null) {
        this.sharePinButton.textContent = this.parent.parent.lesson.pin;
        this.sharePinButton.style.display = "unset";
      } else {
        this.sharePinButton.style.removeProperty("display");
      }
      this.updateInterface();
    }, { sort: 1 });
    this.pipeline.subscribe("overviewLessonSubSet", "subset", (body) => {
      let set = body.set ?? body;
      if (set != null && (set.breakout ?? {}).hasOwnProperty("template") == true) {
        this.template = body.template;
      }
    }, { sort: 1 });

    // Exit button event:
    this.icon.addEventListener("click", (event) => {
      event.preventDefault();
      setPage("pages/app/dashboard");
    });

    // Lesson name events:
    let name = this.parent.parent.lesson.name ?? "Untitled Lesson";;
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
        this.lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      if (this.lessonName.textContent == this.parent.parent.lesson.name) {
        this.lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      let oldName = this.parent.parent.lesson.name;
      this.parent.parent.lesson.name = name;
      this.lessonName.textContent = name;
      this.lessonName.title = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.parent.parent.lesson.name = oldName;
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
      dropdownModule.open(this.fileButton, FileDropdown, { parent: this });
    });

    // Manage dropdown:

    // Share dropdowns:
    this.shareButton.addEventListener("click", () => {
      dropdownModule.open(this.shareButton, import("@modules/lesson/dropdowns/share/Share"), { parent: this.parent });
    });
    this.sharePinButton.addEventListener("click", () => {
      dropdownModule.open(this.sharePinButton, import("@modules/lesson/dropdowns/share/Pin"), { parent: this.parent });
    });
    if (this.parent.parent.lesson.pin != null) {
      this.sharePinButton.style.display = "unset";
      this.sharePinButton.textContent = this.parent.parent.lesson.pin;
    }

    // Account setup:
    if (userID != null) {
      this.accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
       this.accountButton.querySelector("img").src = account.image;
      }
      this.accountButton.addEventListener("click", () => {
        dropdownModule.open(this.accountButton, import("@modules/dropdowns/Account"), { parent: this.parent });
      });
    } else {
      this.accountButton.remove();
      this.loginButton.style.display = "block";
      this.loginButton.addEventListener("click", () => { promptLogin(); });
    }

    // Waiting room menu events:
    this.waitingRoomOpenButton.addEventListener("click", () => {
      if (this.waitingRoomOpen == false) {
        this.openWaitingRoom();
      } else {
        this.closeWaitingRoom();
      }
    });
    this.waitingRoomCloseButton.addEventListener("click", () => {
      this.closeWaitingRoom();
    });

    // Splitscreen update events:
    this.openBoard.addEventListener("click", async () => {
      this.openBoardHolder.style.removeProperty("display");
      this.bottomButtonSpacer.style.removeProperty("display");

      if (this.boardOpen == false) {
        await this.parent.parent.addPage("board", "board", { insertBefore: this.parent.pageHolder, percent: .5 });
      }
      if (this.boardVisible == false) {
        this.parent.parent.activePageID = "board";
        this.parent.parent.pushToPipelines(null, "page_switch", { pageID: "board" });
      }
    });
    this.pipeline.subscribe("pageAdd", "page_add", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageRemove", "page_remove", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageSwitch", "page_switch", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageMaximize", "maximize", () => { this.updateSplitScreenButton(); });
    this.updateSplitScreenButton();

    // Tile Layout Events:
    this.pipeline.subscribe("tilesResize", "resize", (event) => {
      this.layout.resized = true;
      this.layout.lastResizeWasSimulated = event.simulated == true;
      this.layout.setupColumns();
    });
    this.pipeline.subscribe("tilesScroll", "scroll", () => { this.layout.runUpdateCycle(); }, { sort: 1 });
    this.layout.setupColumns(true);

    (async () => {
      this.layout.addTile({ _id: "NEW_GROUP_CREATE", version: (this.parent.parent.lesson.breakout ?? {}).version }, null, true);
    })();

    this.updateInterface();
  }
}