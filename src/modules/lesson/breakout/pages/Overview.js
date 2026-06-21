import { userID, account, mouseDown, setPage, sleep, modifyParams, sendRequest, subscribe, objectUpdate, copyObject, clipBoardRead, promptLogin } from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
import { modal as modalModule } from "@modules/utility/Modal";

import { Pipeline } from "@modules/editor/Pipeline";

import { MasonryLayout } from "../overview/MasonryLayout";

import { Frame as FileDropdown } from "../overview/dropdowns/File";
import { Frame as ManageDropdown } from "../overview/dropdowns/Manage";
import { Frame as ManageMemberDropdown } from "../overview/dropdowns/ManageMember";
import { Frame as GroupOptionsDropdown } from "../overview/dropdowns/GroupOptions";

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
          <button class="broFileDropdown" title="File Options">File</button>
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
    ".broWaitingRoomHolder .broTileMember": `width: fit-content !important; margin: unset !important; border-radius: 12px !important`,
    ".broWaitingRoomHolder .broTileMemberContent": `padding: 6px 12px 6px 6px !important`,

    ".broBottomButtonSpacer": `display: none; flex-shrink: 0; width: 50px`,
    ".broOpenBoard": `display: none; box-shadow: var(--boardLightShadow)`,
    ".broOpenBoard button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".broOpenBoard button:hover": `background: var(--boardHover)`,
    ".broOpenBoard button svg": `width: 32px; height: 32px; transition: .2s`,
    ".broOpenBoard button:hover svg": `transform: scale(.9)`,

    ".broTile": `--hoverSize: 0px; --shadowOpacity: 0; --scale: 1; position: absolute; width: var(--columnWidth); height: fit-content; left: 0px; top: 0px; border-radius: calc(14px + var(--hoverSize)); text-decoration: none; outline-offset: 4px; z-index: 1; transition: .3s`, // will-change: transform;
    ".broTile[disabled] *": `pointer-events: none !important`,
    ".broTile:hover, .broTile:focus-within": `--hoverSize: 4px; --shadowOpacity: .5`,
    ".broTile:active": `--scale: .95`,
    ".broTile:before": `content: ""; position: absolute; width: calc(100% + (var(--hoverSize) * 2)); height: calc(100% + (var(--hoverSize) * 2)); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(var(--scale)); background: var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), var(--shadowOpacity)); border-radius: calc(18px + var(--hoverSize)); z-index: 1; transition: .2s, transform .1s`,
    ".broTileContent": `position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; border-radius: 16px; contain: strict; transform: scale(var(--scale)); z-index: 2; transition: .2s, transform .1s`,
    ".broTileHeader": `box-sizing: border-box; display: flex; width: 100%; padding: 4px; justify-content: space-between; pointer-events: none`,
    ".broTileHeaderName": `display: flex; box-sizing: border-box; gap: 0px; min-width: 0; margin: 4px; align-items: center; pointer-events: all; transition: .2s`,
    ".broTileHeaderName:focus-within": `gap: 6px`,
    ".broTileHeaderNameImage": `display: none; flex-shrink: 0; width: 30px; height: 30px; border-radius: 10px; object-fit: cover`,
    ".broTileHeaderNameHolder": `--borderRadius: 6px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s; min-width: 0; height: 30px; align-content: center`,
    ".broTileHeaderNameHolder:focus-within": `--borderWidth: 2px !important`,
    ".broTileHeaderNameHolderText": `max-width: 100%; padding: 0 6px; outline: unset; font-size: 18px; font-weight: 500; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".broTileHeaderNameHolderText:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important; cursor: text`,
    ".broTileHeaderNameHolderText::-webkit-scrollbar": `display: none`,
    ".broTileHeaderOptions": `display: flex; justify-content: center; align-items: center; opacity: 1; pointer-events: all; transition: .2s`,
    //".broTile:hover .broTileHeaderOptions, .broTile:focus-within .broTileHeaderOptions": `opacity: 1 !important`,
    ".broTileHeaderOptionsButton": `display: flex; width: 34px; height: 34px; margin: 2px; flex-shrink: 0; justify-content: center; align-items: center; border-radius: 18px`,
    ".broTileHeaderOptionsButton > svg": `flex-shrink: 0; width: 24px; height: 24px`,
    ".broTileHeaderOptionsButton:hover": `background: var(--hover)`,
    ".broTilePreviewContainer": `position: relative; flex-shrink: 0; width: calc(100% - 12px); height: var(--previewHeight); margin: 0 6px; border-radius: 12px; overflow: hidden`,
    ".broTilePreviewContainer:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: inset 0px 0px 4px 0px rgba(var(--themeRGB), .5); z-index: 2`,
    ".broTile:not([disabled]) .broTilePreviewContainer:after": `pointer-events: all !important`,
    ".broTilePreview": `position: absolute; width: calc(var(--previewWidth) * (1 / var(--previewScale))); height: calc(var(--previewWidth) * var(--previewHeightRatio) * (1 / var(--previewScale))); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(var(--previewScale)); transform-origin: center; background: var(--pageColor); contain: strict; z-index: 1; overflow: scroll; scrollbar-width: none; transition: opacity .4s`,
    ".broTilePreview::-webkit-scrollbar": `display: none`,
    ".broTileMembers": `position: relative; box-sizing: border-box; flex: 1; width: 100%; padding: 0 6px; margin-bottom: 6px`,
    ".broTileMember": `--shadow: var(--lightShadow); --workPercent: 0; --workInvert: 0; --workThemeColor: var(--theme); position: relative; width: 100%; padding: 0; margin-top: 6px; background: var(--pageColor); border-radius: 6px; cursor: grab`,
    ".broTileMember:first-child": `border-top-left-radius: 12px; border-top-right-radius: 12px`,
    ".broTileMember:last-child": `border-bottom-left-radius: 12px; border-bottom-right-radius: 12px`,
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

  dragContext = {};
  wasDragging = false;
  dragScrollOffset = 32;
  scrollY = 0;
  scrollIntervalRunning = false;

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
      this.openBoardHolder.style.display = "flex";
      this.bottomButtonSpacer.style.display = "flex";
    } else {
      this.openBoardHolder.style.removeProperty("display");
      this.bottomButtonSpacer.style.removeProperty("display");
    }
  }

  updateSubscribe() {
    let filter = { type: "lesson", id: this.parent.parent.id, group: this.layout.tileLayout };
    if (this.groupUpdateSub != null) {
      this.groupUpdateSub.edit(filter);
    } else {
      this.groupUpdateSub = subscribe(filter, (data) => {
        if ((data.data ?? {}).id == null) {
          return;
        }
        let tile = this.layout.tiles[data.data.id];
        if (tile == null) {
          return;
        }
        objectUpdate(data.data, tile.render);
        this.layout.updateTile(tile);
        if (tile.editor != null) {
          tile.editor.pipeline.publish("set", data.data);
        }
        this.parent.pipeline.publish("set", data.data);
      });
    }
  }

  updateUnassignedMemberCount(change) {
    if (change != null) {
      this.unassignedMembers += change;
    }
    if (this.unassignedMembers > 0) {
      this.waitingRoomOpenButtonCount.style.display = "flex";
      this.waitingRoomOpenButtonCount.parentElement.style.padding = "4px 10px 4px 4px";
    } else {
      this.waitingRoomOpenButtonCount.style.removeProperty("display");
      this.waitingRoomOpenButtonCount.parentElement.style.removeProperty("padding");
    }
    if (this.unassignedMembers > 0 || this.dragContext.enabled == true) {
      this.waitingRoomHolder.removeAttribute("hidden");
    } else {
      this.waitingRoomHolder.setAttribute("hidden", "");
    }
    this.waitingRoomOpenButtonCount.textContent = this.unassignedMembers;
  }

  pendingMemberAssignment = {}; // May recieve member update events before the new group event.
  updateMember = (modify, data) => {
    let groupMember = this.layout.members[modify];
    if (groupMember == null) {
      return;
    }
    if (data.hasOwnProperty("group") == true && data.group != groupMember.group) {
      delete groupMember.contribution;
      if (groupMember.group != null) {
        let oldGroupTile = this.layout.tiles[groupMember.group] ?? {};
        if (oldGroupTile.members != null) {
          let index = oldGroupTile.members.indexOf(modify);
          if (index > -1) {
            oldGroupTile.members.splice(index, 1);
            this.layout.updatePercentageOfWork(oldGroupTile);
          }
        }
        if (oldGroupTile.editor != null && data._id != null) {
          oldGroupTile.editor.pipeline.publish("leave", { _id: data._id });
        }
      } else if (data.group != null) {
        this.updateUnassignedMemberCount(-1);
      }
      this.layout.removeMemberTile(modify, true);
      groupMember.group = data.group;
      if (data.group != null) {
        let groupTile = this.layout.tiles[data.group];
        if (groupTile == null) {
          let pending = this.pendingMemberAssignment[data.group];
          if (pending == null) {
            this.pendingMemberAssignment[data.group] = [];
            pending = this.pendingMemberAssignment[data.group];
          }
          if (pending.includes(data.modify) == false) {
            pending.push(data.modify);
          }
        } else if (groupTile.members != null && groupTile.members.includes(modify) == false) {
          groupTile.members.push(modify);
          this.layout.addMemberTile(modify, true);
          this.layout.updatePercentageOfWork(groupTile);
        }
      } else if ((this.layout.memberSessions[modify] ?? []).length > 0) {
        this.layout.addMemberTile(modify, true);
        this.updateUnassignedMemberCount(1);
      }
    }
  }

  async loadGroups() {
    if (this.loadingGroups == true || this.allGroupsLoaded == true) {
      return;
    }
    this.loadingGroups = true;

    let path = "lessons/breakout/groups";
    if (this.lastGroupTime != null) {
      path += "?after=" + this.lastGroupTime;
    }
    let [code, body] = await sendRequest("GET", path, null, { session: this.parent.parent.session });
    if (code != 200) {
      return;
    }
    for (let i = 0; i < body.collaborators.length; i++) {
      let collaborator = body.collaborators[i];
      this.parent.parent.collaborators[collaborator._id] = collaborator;
    }
    let beforeTileLength = this.layout.tileLayout.length - 1;
    let bodyItems = body.groups.length;
    if (bodyItems < 25) {
      this.allGroupsLoaded = true;
    }
    for (let i = 0; i < bodyItems; i++) {
      let group = body.groups[i];
      let members = [];
      for (let m = 0; m < group.members.length; m++) {
        let member = group.members[m];
        this.layout.members[member.modify] = { group: group._id, ...member };
        members.push(member.modify);
      }
      delete group.members;
      this.layout.addTile(group, members);
    }
    this.layout.refreshTileSpots(beforeTileLength);
    this.lastGroupTime = (body.groups[bodyItems - 1] ?? {}).created;

    this.updateSubscribe();

    this.loadingGroups = false;
  }
  async checkLoadGroups() {
    if (this.groupHolder.scrollTop + this.layout.containerHeight + 500 > this.groupHolder.scrollHeight || this.groups.clientHeight < this.layout.containerHeight) {
      await this.loadGroups();
      if (this.loadingGroups != true && this.allGroupsLoaded != true) {
        checkLoadGroups();
      }
    }
  }

  async scrollInterval() {
    if (this.scrollIntervalRunning == true) {
      return;
    }
    this.scrollIntervalRunning = true;
    while (this.scrollY != 0 && this.dragContext.enabled == true) {
      this.groupHolder.scrollTo({ top: this.groupHolder.scrollTop + this.scrollY });
      await sleep(10);
    }
    this.scrollIntervalRunning = false;
  }
  removeDrag(moved) {
    if (this.dragContext.tileData != null) {
      this.page.removeAttribute("dragging");
    }
    let removeElement = this.dragContext.element;
    if (removeElement == null) {
      return;
    }

    if (
      this.dragContext.tileData != null
      && this.dragContext.tileData.tile != null
      && this.frame.contains(this.dragContext.tileData.tile) == true
    ) {
      let button = this.dragContext.tileData.tile.closest(".broTile");
      let pageRect = this.frame.getBoundingClientRect();
      let originalRect = this.dragContext.tileData.tile.getBoundingClientRect();
      if (moved != true) {
        removeElement.style.transform = "translate(" + ((originalRect.x - pageRect.x) - (this.dragContext.lastX - this.dragContext.offsetX)) + "px, " + (originalRect.y - pageRect.y - this.dragContext.lastY + this.dragContext.offsetY) + "px) scale(.975)";
        this.dragContext.tileData.tile.removeAttribute("disabled");
      } else {
        removeElement.style.transformOrigin = this.dragContext.offsetX + "px " + this.dragContext.offsetY + "px";
        removeElement.style.transform = "translate(0px, 0px) scale(0)";
      }
      (async () => {
        await sleep(100);
        if (button != null) {
          button.removeAttribute("disabled");
        }
      })();
    } else {
      removeElement.style.transformOrigin = "center";
      removeElement.style.transform = "translate(0px, 0px) scale(0)";
    }

    removeElement.style.opacity = 0;
    (async () => {
      await sleep(200);
      if (removeElement != null) {
        removeElement.remove();
      }
    })();

    if (this.dragContext.waitingRoomOpen == true) {
      this.openWaitingRoom();
    }

    this.dragContext = {};

    this.updateUnassignedMemberCount();
  }
  dragStart(event) {
    if (this.dragContext.enabled == true && this.dragContext.forceMouseDown == true) {
      this.wasDragging = true;
      return this.dragEnd(event);
    }
    this.dragContext = {};
    let target = event.target;
    let pageRect = this.frame.getBoundingClientRect();
    let mouseX = (event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0) - pageRect.x;
    let mouseY = (event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0) - pageRect.y;
    let tile = target.closest(".broTileMember");
    if (tile == null) {
      return;
    }
    event.preventDefault();
    let tileData = this.layout.members[tile.getAttribute("collaborator")];
    if (this.dragContext.tileData != null) {
      return;
    }
    this.dragContext = {
      tileData,
      width: tile.clientWidth,
      height: tile.clientHeight,
      startX: mouseX,
      startY: mouseY,
      startScrollY: this.groupHolder.scrollTop,
      waitingRoomOpen: this.waitingRoomOpen
    };
    this.page.setAttribute("dragging", "");
  }
  dragMove = (event) => {
    let mouseX = this.lastMouseX ?? 0;
    let mouseY = this.lastMouseY ?? 0;
    if (event != null) {
      mouseX = event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0;
      mouseY = event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0;
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
    }
    if (this.dragContext.tileData == null || this.dragContext.tileData.tile == null) {
      return this.removeDrag();
    }
    if (mouseDown() == false && this.dragContext.forceMouseDown != true) {
      return this.removeDrag();
    }
    let pageRect = this.frame.getBoundingClientRect();
    mouseX -= pageRect.x;
    mouseY -= pageRect.y;
    let startX = this.dragContext.startX ?? mouseX;
    let startY = this.dragContext.startY ?? mouseY;
    this.dragContext.lastX = mouseX;
    this.dragContext.lastY = mouseY;
    if (this.dragContext.enabled != true) {
      if (
        Math.abs(mouseX - startX) > 5 || Math.abs(mouseY - startY) > 5
        || this.dragContext.forceMouseDown == true
      ) {
        if (
          event != null
          && this.dragContext.forceMouseDown != true
          && (
            event.target.closest(".broTileMember") == null
            || this.frame.contains(this.dragContext.tileData.tile) == false
          )
        ) {
          return this.removeDrag();
        }
        this.dragContext.enabled = true;
        this.dragContext.element = this.dragContext.tileData.tile.cloneNode(true);
        this.dragContext.element.style.position = "absolute";
        this.dragContext.element.style.width = this.dragContext.width + "px";
        this.dragContext.element.style.height = this.dragContext.height + "px";
        this.dragContext.element.style.background = "var(--pageColor)";
        this.dragContext.element.style.borderRadius = "12px";
        this.dragContext.element.style.boxShadow = "var(--shadow)";
        this.dragContext.element.style.zIndex = 10;
        this.dragContext.element.style.pointerEvents = "none";
        let originalRect = this.dragContext.tileData.tile.getBoundingClientRect();
        this.dragContext.offsetX = this.dragContext.offsetX ?? (startX - (originalRect.x - pageRect.x));
        this.dragContext.offsetY = this.dragContext.offsetY ?? (startY - (originalRect.y - pageRect.y + (this.groupHolder.scrollTop - this.dragContext.startScrollY)));
        this.dragContext.element.style.transform = "translate(" + Math.min(startX + startX - mouseX - mouseX, 0) + "px, " + Math.min(startY + startY - mouseY - mouseY, 0) + "px) scale(.975)";
        this.dragContext.element.style.transformOrigin = "0 0";
        this.dragContext.element.style.opacity = 0;
        this.dragContext.element.style.transition = "transform .3s, opacity .2s";
        this.dragContext.element.setAttribute("dragging", "");
        this.dragContext.tileData.tile.setAttribute("disabled", "");
        this.dragContext.element.removeAttribute("activated");
        this.frame.appendChild(this.dragContext.element);
        let mainTile = this.dragContext.tileData.tile.closest(".broTile");
        if (mainTile != null) {
          mainTile.setAttribute("disabled", "");
        }
        this.dragContext.element.offsetHeight;
        this.dragContext.element.style.transform = "translate(0px, 0px) scale(.975)";
        this.dragContext.element.style.opacity = 1;

        if (this.dragContext.waitingRoomOpen == true) {
          this.closeWaitingRoom();
        }
        this.updateUnassignedMemberCount();
      } else {
        return;
      }
    }
    if (this.dragContext.element == null) {
      return;
    }
    this.dragContext.element.style.left = (mouseX - (this.dragContext.offsetX ?? 0)) + "px";
    this.dragContext.element.style.top = (mouseY - (this.dragContext.offsetY ?? 0)) + "px";

    this.scrollY = 0;
    let topPos = this.dragScrollOffset - mouseY;
    if (topPos > 0) {
      let percentage = 1 + ((topPos - this.dragScrollOffset) / this.dragScrollOffset);
      this.scrollY = -Math.min(10 * percentage, 10);
    }
    let bottomPos = mouseY - this.page.offsetHeight + this.dragScrollOffset;
    if (bottomPos > 0) {
      let percentage = 1 + ((bottomPos - this.dragScrollOffset) / this.dragScrollOffset);
      this.scrollY = Math.min(10 * percentage, 10);
    }
    if (this.dragContext.autoScrollActive == true) {
      this.scrollInterval();
    } else if (this.scrollY == 0) {
      this.dragContext.autoScrollActive = true;
    }
  }
  async dragEnd(event) {
    if (
      this.dragContext.enabled != true
      || this.dragContext.tileData == null
      || this.dragContext.tileData.tile == null
    ) {
      return this.removeDrag();
    }
    let target = document.elementFromPoint(
      event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0,
      event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0
    );
    if (target == null) {
      return this.removeDrag();
    }
    let groupTile = target.closest(".broTile[group], .broWaitingRoom");
    if (groupTile != null) {
      let groupID = groupTile.getAttribute("group");
      if (this.dragContext.tileData.group == groupID) { // Same group:
        return this.removeDrag();
      }
      let path = "lessons/breakout/move?collaborator=" + this.dragContext.tileData.modify;
      if (groupID != null) {
        path += "&group=" + groupID;
      }
      let revertTile = this.dragContext.tileData.tile;
      this.removeDrag(true);
      await sendRequest("PUT", path, null, { session: this.parent.parent.session });
      if (revertTile != null) {
        revertTile.removeAttribute("disabled");
      }
      return;
    }
    this.removeDrag();
  }
  forceDragStart(modifyID) {
    let tileData = this.layout.members[modifyID] ?? {};
    if (tileData.tile == null) {
      return;
    }
    this.dragContext = {
      tileData,
      width: tileData.tile.clientWidth,
      height: tileData.tile.clientHeight,
      offsetX: -8,
      offsetY: -8,
      startScrollY: this.groupHolder.scrollTop,
      waitingRoomOpen: this.waitingRoomOpen,
      forceMouseDown: true
    };
    this.dragMove();
  }

  async openGroup(groupID) {
    let tileData = this.layout.tiles[groupID];
    let editor;
    if (tileData.editor != null && tileData.loadedAnnotations == true) {
      editor = tileData.editor;
    }
    this.parent.parent.self.group = groupID;
    this.parent.openPage("secondary", "group", { group: tileData.render, members: tileData.members, editor });
  }
  onOpen() { // When returning here, leave the group:
    if (this.parent.parent.self.group != null) {
      sendRequest("DELETE", "lessons/breakout/groups/leavepreview", null, { session: this.parent.parent.session });
    }
    modifyParams("team");
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
      if (body.hasOwnProperty("tool") == true) {
        this.updateSplitScreenButton();
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
    this.manageButton.addEventListener("click", () => {
      dropdownModule.open(this.manageButton, ManageDropdown, { parent: this });
    });

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

    // Tile layout cleanup event:
    this.pipeline.subscribe("groupUpdatePageClose", "page_close", () => {
      if (this.layout.groupUpdateSub != null) {
        this.layout.groupUpdateSub.close();
      }
      if (this.layout.shortSub != null) {
        this.layout.shortSub.close();
        this.layout.shortSub = null;
      }
    });

    // Tile layout events:
    this.pipeline.subscribe("tilesResize", "resize", (event) => {
      this.layout.resized = true;
      this.layout.lastResizeWasSimulated = event.simulated == true;
      this.layout.setupColumns();
    });
    this.pipeline.subscribe("tilesScroll", "scroll", () => { this.layout.runUpdateCycle(); }, { sort: 1 });
    this.pipeline.subscribe("tilesLoadMore", "bounds_change", () => { this.checkLoadGroups(); });
    this.groupHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });
    this.layout.setupColumns(true);

    // Group events:
    this.pipeline.subscribe("createGroup", "creategroup", async (data) => {
      await this.layout.addTile(data, this.pendingMemberAssignment[data._id] ?? [], true);
      delete this.pendingMemberAssignment[data._id];
      this.updateSubscribe();
    });
    this.pipeline.subscribe("removeGroup", "removegroup", (data) => {
      this.layout.removeTile(data._id, true);
    });

    // Member events:
    this.pipeline.subscribe("memberJoin", "join", (data) => {
      let session = this.layout.memberSessions[data.modify];
      let existingMember = this.layout.members[data.modify];
      if (session == null) {
        this.layout.memberSessions[data.modify] = [];
        session = this.layout.memberSessions[data.modify];
        if (data.group == null && data.access < 4) {
          this.updateUnassignedMemberCount(1);
        }
      } else if (existingMember != null && existingMember.group != null && data.group == null && data.access < 4) {
        this.updateUnassignedMemberCount(-1);
      }
      if (session.includes(data._id) == false) {
        session.push(data._id);
      }
      if (data.access > 3) {
        return;
      }

      if (existingMember != null && existingMember.group != data.group) {
        delete existingMember.contribution;
        if (existingMember.group != null) {
          let groupTile = this.layout.tiles[existingMember.group] ?? {};
          if (groupTile.members != null) {
            let index = groupTile.members.indexOf(data.modify);
            if (index > -1) {
              groupTile.members.splice(index, 1);
              this.layout.updatePercentageOfWork(groupTile);
            }
          }
          if (groupTile.editor != null) {
            groupTile.editor.pipeline.publish("leave", { _id: data._id });
          }
          this.layout.removeMemberTile(data.modify, true);
        }
      }
      this.layout.members[data.modify] = { ...(existingMember ?? {}), group: data.group, modify: data.modify };
      if (data.group != null) {
        let groupTile = this.layout.tiles[data.group];
        if (groupTile == null) {
          let pending = this.pendingMemberAssignment[data.group];
          if (pending == null) {
            this.pendingMemberAssignment[data.group] = [];
            pending = this.pendingMemberAssignment[data.group];
          }
          if (pending.includes(data.modify) == false) {
            pending.push(data.modify);
          }
        } else {
          if (groupTile.members != null && groupTile.members.includes(data.modify) == false) {
            groupTile.members.push(data.modify);
            this.layout.addMemberTile(data.modify);
          } else {
            this.layout.updateMemberTile(this.parent.parent.collaborators[data.modify]);
          }
          if (groupTile.editor != null) {
            groupTile.editor.pipeline.publish("join", data);
          }
        }
      } else {
        this.layout.updateMemberTile(this.parent.parent.collaborators[data.modify]);
      }
    }, { sort: 1 });
    this.pipeline.subscribe("memberUpdate", "update", (data) => {
      let member = this.parent.parent.members[data._id];
      if (member == null) {
        return;
      }
      if (member.access < 4) {
        this.updateMember(member.modify, data);
      } else {
        let loadedTiles = Object.keys(this.layout.loadedTiles);
        for (let i = 0; i < loadedTiles.length; i++) {
          let tile = this.layout.tiles[loadedTiles[i]];
          if (tile.editor != null) {
            tile.editor.pipeline.publish("leave", { _id: data._id });
          }
        }
      }
      if (member.group != null) {
        let groupTile = this.layout.tiles[member.group] ?? {};
        if (groupTile.editor != null) {
          groupTile.editor.pipeline.publish("update", data);
        }
      }
    }, { sort: 1 });
    this.pipeline.subscribe("groupMemberMove", "move", (data) => {
      let existingMember = this.layout.members[data.modify];
      if (existingMember != null) {
        this.updateMember(data.modify, data);
        existingMember.contribution = data.contribution;
        this.layout.updatePercentageOfWork(this.layout.tiles[data.group]);
      }
    });
    this.pipeline.subscribe("memberLeave", "leave", (data) => {
      if (data.member != null) {
        let session = this.layout.memberSessions[data.member.modify];
        if (session != null) {
          let index = session.indexOf(data.member._id);
          if (index > -1) {
            session.splice(index, 1);
          }
          if (session.length < 1) {
            delete this.layout.memberSessions[data.member.modify];
            if (data.member.access < 4) {
              if (data.member.group != null) {
                this.layout.updateMemberTile(this.parent.parent.collaborators[data.member.modify]);
              } else {
                this.layout.removeMemberTile(data.member.modify, true);
                this.updateUnassignedMemberCount(-1);
              }
            }
          }
        }
        if (data.member.group != null) {
          let groupTile = this.layout.tiles[data.member.group] ?? {};
          if (groupTile.editor != null) {
            groupTile.editor.pipeline.publish("leave", data);
          }
        }
      }
    }, { sort: 1 });
    this.pipeline.subscribe("collaboratorUpdate", "collaborator_update", (data) => {
      let groupMember = this.layout.members[data._id];
      if (groupMember != null) {
        this.layout.updateMemberTile(data);
      }
      let loadedTiles = Object.keys(this.layout.loadedTiles);
      for (let i = 0; i < loadedTiles.length; i++) {
        let tile = this.layout.tiles[loadedTiles[i]];
        if (tile.editor != null) {
          tile.editor.pipeline.publish("collaborator_update", data);
          tile.editor.pipeline.publish("collaborator_update_" + data._id, data);
        }
      }
    }, { sort: 1 });

    // Contribution change event:
    this.pipeline.subscribe("contributionChange", "contributionchange", (data) => {
      let groupMember = this.layout.members[data.modify];
      if (groupMember == null || groupMember.group != data.group) {
        return;
      }
      if (groupMember.contribution == null) {
        groupMember.contribution = 0;
      }
      groupMember.contribution += data.change;
      this.layout.updatePercentageOfWork(this.layout.tiles[groupMember.group]);
    });

    // Preview update long event:
    this.pipeline.subscribe("previewLongAnnotationUpdate", "long", (event) => {
      if (event.id == null) {
        return;
      }
      let tile = this.layout.tiles[event.id];
      if (tile == null) {
        return;
      }
      if (tile.editor != null) {
        tile.editor.pipeline.publish("long", event);
      }
    });

    // Template change event:
    this.pipeline.subscribe("previewTemplateChange", "templatechange", async (body) => {
      let templateRootStore = this.layout.templateRoots[body.rootID];
      if (templateRootStore == null) {
        this.layout.templateRoots[body.rootID] = {};
        templateRootStore = this.layout.templateRoots[body.rootID];
      }
      templateRootStore.annotations = body.annotations;

      let tiles = Object.keys(this.layout.tiles);
      for (let i = 0; i < tiles.length; i++) {
        let tile = this.layout.tiles[tiles[i]] ?? {};
        if (tile.editor != null) {
          tile.editor.applyRootTemplate(copyObject(templateRootStore.annotations));
        }
      }
    });

    // Signal strength change event:
    this.pipeline.subscribe("signalStrengthUpdate", "signal_strength", () => {
      this.layout.updateShortSubscribe();
    });

    // Drag members listeners:
    this.frame.addEventListener("mousedown", (event) => { this.dragStart(event); });
    this.pipeline.subscribe("dragMemberMove", "click_move", (data) => { this.dragMove(data.event); });
    this.pipeline.subscribe("dragMemberEnd", "click_end", (data) => { this.dragEnd(data.event); });

    // Load members:
    let memberKeys = Object.keys(this.parent.parent.members);
    for (let i = 0; i < memberKeys.length; i++) {
      let memberID = memberKeys[i];
      let member = this.parent.parent.members[memberID];
      let session = this.layout.memberSessions[member.modify];
      if (session == null) {
        this.layout.memberSessions[member.modify] = [];
        session = this.layout.memberSessions[member.modify];
      }
      session.push(memberID);
      if (member.access > 3) {
        continue;
      }
      this.layout.members[member.modify] = { ...(this.layout.members[member.modify] ?? {}), group: member.group, modify: member.modify };
      if (member.group == null) {
        this.unassignedMembers++;
        this.layout.updateMemberTile(this.parent.parent.collaborators[member.modify]);
      }
    }
    this.updateUnassignedMemberCount();

    // Load initial groups:
    (async () => {
      await this.checkLoadGroups();
      this.layout.addTile({ _id: "NEW_GROUP_CREATE", version: (this.parent.parent.lesson.breakout ?? {}).version }, null, true);
    })();
    
    // Click listener:
    this.frame.addEventListener("click", async (event) => {
      if (this.dragContext.enabled == true || this.wasDragging == true) {
        this.wasDragging = false;
        return event.preventDefault();
      }

      let target = event.target;
      let tile = target.closest(".broTile:not([disabled])");
      if (tile != null) {
        event.preventDefault();
      }

      if (target.closest("button") != null) {
        let memberTile = target.closest(".broTileMember");
        if (memberTile != null) {
          return dropdownModule.open(memberTile, ManageMemberDropdown, { parent: this, collaboratorID: memberTile.getAttribute("collaborator"), title: "Manage" });
        }

        let tileOptionsButton = target.closest(".broTileHeaderOptionsButton");
        if (tileOptionsButton != null && tile != null) {
          return dropdownModule.open(tileOptionsButton, GroupOptionsDropdown, { parent: this, groupID: tile.getAttribute("group"), title: "Options" });
        }

        if (tile != null && tile.classList.contains("broTileAddGroup") == true) {
          tile.setAttribute("disabled", "");
          await sendRequest("POST", "lessons/breakout/groups/new", null, { session: this.parent.parent.session });
          if (tile != null) {
            tile.removeAttribute("disabled");
          }
          return;
        }

        return;
      }

      if (target.closest("div[contenteditable]") != null || target.closest(".broTileMembers") != null) {
        return;
      }

      if (tile == null) {
        return;
      }

      this.openGroup(tile.getAttribute("group"));
    });

    // Pointer down listener (cancels transition on subbuttons and text boxes):
    this.groups.addEventListener("pointerdown", (event) => {
      let target = event.target;
      let tile = target.closest(".broTile");
      if (tile == null) {
        return;
      }
      if (target.closest("button") == null && target.closest("div[contenteditable]") == null && target.closest(".broTileMembers") == null) {
        tile.style.removeProperty("--scale");
      } else if (tile.classList.contains("broTileAddGroup") == false) {
        tile.style.setProperty("--scale", "1");
      }
    });

    // Context menu listener:
    this.frame.addEventListener("contextmenu", (event) => {
      let target = event.target;
      let memberTile = target.closest(".broTileMember");

      if (memberTile != null) {
        event.preventDefault();
        return dropdownModule.open(memberTile, ManageMemberDropdown, { parent: this, collaboratorID: memberTile.getAttribute("collaborator"), title: "Manage" });
      }

      let tile = target.closest(".broTile:not([disabled])");
      if (tile != null) {
        event.preventDefault();
        return dropdownModule.open(tile.querySelector(".broTileHeaderOptionsButton"), GroupOptionsDropdown, { parent: this, groupID: tile.getAttribute("group"), title: "Options" });
      }
    });

    // Rename group listeners:
    this.groups.addEventListener("keydown", (event) => {
      let target = event.target;
      let tileNameHolder = target.closest(".broTileHeaderName");
      if (tileNameHolder != null) {
        if (event.keyCode == 13) {
          let tileNameText = tileNameHolder.querySelector(".broTileHeaderNameHolderText");
          if (tileNameText != null) {
            event.preventDefault();
            tileNameText.blur();
          }
          return;
        }
      }
    });
    this.groups.addEventListener("focusout", async (event) => {
      let target = event.target;
      let tileNameHolder = target.closest(".broTileHeaderName");
      if (tileNameHolder != null) {
        let tileNameText = tileNameHolder.querySelector(".broTileHeaderNameHolderText");
        if (tileNameText != null) {
          tileNameText.scrollTo(0, 0);

          let tile = this.layout.tiles[tileNameHolder.closest(".broTile").getAttribute("group")];
          if (tile != null) {
            let name = tileNameText.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
            if (name.replace(/ /g, "").length < 1) {
              tileNameText.textContent = tile.render.name ?? "Untitled Team";
              return;
            }
            if (tileNameText.textContent == tile.render.name) {
              tileNameText.textContent = tile.render.name;
              return;
            }
            let oldName = tile.render.name ?? "Untitled Team";
            tile.render.name = name;
            tileNameText.textContent = name;
            tileNameText.title = name;
            let [code] = await sendRequest("POST", "lessons/breakout/groups/name?group=" + tile.render._id, { name: name }, { session: this.parent.parent.session });
            if (code != 200) {
              tile.render.name = oldName;
              tileNameText.textContent = oldName;
              tileNameText.title = oldName;
            }
          }
        }
      }
    });

    // Handle new lesson setup:
    if ((this.parent.parent.lesson.breakout ?? {}).status == null) {
      this.frame.insertAdjacentHTML("beforeend", `<div class="broCreateBreakoutHolder"></div>`);
      this.setupModal = await modalModule.open(
        import("@modules/lesson/breakout/overview/modals/NewBreakout"),
        null,
        {
          parentElement: this.frame.querySelector(".broCreateBreakoutHolder"),
          parent: this,
          title: "Start a Breakout"
        }
      );
    } else if (this.parent.parent.lesson.tool.includes("breakout") == false) {
      await sendRequest("PATCH", "lessons/toggle/attach", { tool: "breakout" }, { session: this.parent.parent.session });
    }

    this.updateInterface();
  }
}