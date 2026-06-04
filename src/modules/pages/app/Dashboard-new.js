import {
  head,
  body,
  app,
  PageFrame,
  fixed,
  favicon,

  assetURL,

  userID,
  account,

  changeGlobalImports,
  mouseDown,
  appendCSS,
  setPage,
  setFrame,
  sleep,
  timeSince,
  formatFullDate,
  addS,
  getParam,
  modifyParams,
  getEpoch,
  checkForAuth,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  getObject,
  copyObject,
  objectUpdate,
  objectEqual,
  getTheme,
  textBoxError,
  clipBoardRead
} from "@/crucial";

import { dropdown } from "@modules/utility/Dropdown";
import { modal } from "@modules/utility/Modal";

import { LessonFrame } from "@modules/dashboard/LessonFrame";

import { Frame as LessonOptions } from "@modules/dashboard/LessonOptions";
import { Frame as GiftDropdown } from "@modules/dropdowns/Gift";

const toolFrameModules = changeGlobalImports(import.meta.glob("@modules/dashboard/tools/**/*.js", { eager: true }));
const toolFrameModulePath = "/src/modules/dashboard/tools/";

import { close as closeIcon, trash as trashIcon, search as searchIcon, link as linkIcon, add as addIcon } from "@modules/utility/core-icons";
import logoIcon from "@assets/logo.svg?raw";
import boardIcon from "@assets/icon.svg?raw";
import breakoutIcon from "@assets/breakout.svg?raw";
import exclamationIcon from "@assets/account/exclamation.svg?raw";
import shareIcon from "../../editor/icons/actions/send.svg?raw";
import openSidebarIcon from "@assets/dashboard/opensidebar.svg?raw";
import folderIcon from "@assets/dashboard/folder.svg?raw";
import folderArrowIcon from "@assets/dashboard/folderarrow.svg?raw";

const CURRENT_BANNER = null; // "breakout-alpha-release" "1.0-release"
const BANNER_TITLE = "Introducing Markify Breakout (BETA)";
const BANNER_DESCRIPTION = "Markify Breakout allows for lessons to be “broken out” into individual or team work.";

export class Page extends PageFrame {
  title = "Dashboard";
  allowBackgroundChange = true;

  preJs() {
    if (userID == null) {
      checkForAuth(true);
      return false;
    }
    modifyParams("lesson");
    modifyParams("team");
    modifyParams("folder");
    modifyParams("page");
    modifyParams("annotation");
    modifyParams("pin");
    modifyParams("type");
  }

  html = `<div class="dPageHolder">
    <div class="dPage" dropdownholder>
      <div class="dSidebarHolder">
        <div class="dSidebarBackdrop"></div>
        <img class="dSidebarBackdropImage" src="../images/dashboard/backdrop.svg" />
        <div class="dSidebar customScroll">
          <div class="dSidebarSection dSidebarHeader">
            <a class="dSidebarLogo" href="/launch">${logoIcon}</a>
            <a class="dJoinButton largeButton" href="/app/join">Join${linkIcon}<div backdrop></div></a>
          </div>
          <div class="dSidebarSection dSidebarActions">
          <div class="dSidebarTitle">
            <div title>New Lesson</div><div divider></div></div>
            <div class="dCreateLessonButtonHolder">
              <a class="dCreateBoardLessonButton largeButton" actiontool="board"><div image>${boardIcon}</div>Board<div backdrop></div></a>
              <a class="dCreateBreakoutLessonButton largeButton" actiontool="breakout"><div image>${breakoutIcon}</div>Breakout<div backdrop></div></a>
            </div>
          </div>
          <div class="dSidebarSection dSidebarSorts">
            <div class="dSidebarTitle"><div title>Sorts</div><div divider></div></div>
            <div class="dSidebarSearch border">${searchIcon}<input placeholder="Search..."></input></div>
            <button class="dSidebarSort" sort="recent" selected>Recent</button>
            <button class="dSidebarSort" sort="shared">Shared</button>
            <button class="dSidebarSort" sort="owned">Owned</button>
            <button class="dSidebarSort" sort="newest">Newest</button>
          </div>
          <div class="dSidebarSection dSidebarFolderHeading">
            <div class="dSidebarTitle"><div title>Folders</div><div divider></div><button class="dSidebarNewFolderButton">${addIcon}</button></div>
          </div>
          <div class="dSidebarSection dSidebarFolders">
            <div class="dSidebarFolderHolder" opened></div>
          </div>
          <div class="dSidebarSection dSidebarAccountHolder">
            <div class="dSidebarUpdateAlert" closed>
              <div class="dSidebarUpdateAlertTitle">
                <div>Markify Updated!</div>
                <button class="buttonAnim border">${closeIcon}</button>
              </div>
              <div divider></div>
              <a opennew style="--themeColor: var(--theme)"><div image>${exclamationIcon}</div>See What's New</a>
              <button share style="--themeColor: var(--purple)"><div image>${shareIcon}</div>Share Markify</button>
            </div>
            <button class="dAccount largeButton border"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div><div backdrop></div></button>
          </div>
        </div>
        <div class="dSidebarActionContent"></div>
        <div class="dSidebarOpen"><div shadow><div></div></div><button>${openSidebarIcon}</button></div>
      </div>
      <div class="dLessonsHolder customScroll">
        <div class="dBannerHolder">
          <div class="dBanner" style="--theme: var(--breakoutTheme); --secondary: var(--breakoutSecondary); --hover: var(--breakoutHover); --darkShadow: var(--breakoutDarkShadow)">
            <img class="dBannerIcon" src="../images/breakoutbluricon.png" />
            <div class="dBannerContent">
              <div class="dBannerTitle">${BANNER_TITLE}</div>
              <div class="dBannerText">${BANNER_DESCRIPTION}</div>
            </div>
            <div class="dBannerButtons">
              <button class="dBannerAction buttonAnim border"></button>
              <button class="dBannerClose buttonAnim border">${closeIcon}</button>
            </div>
          </div>
        </div>
        <div class="dSelectedTitleHolder"></div>
        <div class="dTilesHolder"></div>
      </div>
    </div>
  </div>`;
  css = {
    ".dPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100vw; width: 100dvw; height: 100vh; height: 100dvh; padding: 8px; left: 0px; top: 0px; justify-content: center`, //transition: .2s
    ".dPage": `position: relative; display: flex; width: 100%; height: 100%; max-width: 1585px; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`, //transition: .2s
    
    ".dSidebarHolder": `position: relative; max-width: min(270px, 100%); height: 100%; flex-shrink: 0; background: var(--pageColor); z-index: 2; transition: .4s`,
    ".dSidebarHolder[open]": `box-shadow: var(--darkShadow)`,
    ".dSidebarBackdrop": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 2; background: var(--pageColor)`,
    ".dSidebarBackdropImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; opacity: .75; object-fit: cover; z-index: 1; pointer-events: none`,
    ".dSidebar": `position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; overflow: auto; overscroll-behavior: none; z-index: 4; transition: .4s`,
    ".dSidebarSection": `position: sticky; box-sizing: border-box; width: 100%; left: 0px; z-index: 2`,
    ".dSidebarTitle": `display: flex; width: 100%; gap: 8px; align-items: center`,
    ".dSidebarTitle div[title]": `color: var(--secondary); font-weight: 600; font-size: 16px`,
    ".dSidebarTitle div[divider]": `flex: 1; height: 4px; background: var(--hover); border-radius: 2px`,

    ".dSidebarOpen": `position: absolute; display: none; padding: 6px; left: 100%; bottom: 68px; background: var(--pageColor); border-radius: 0 36px 36px 0; z-index: 5`,
    ".dSidebarOpen div[shadow]": `position: absolute; width: calc(100% + 12px); height: calc(100% + 24px); left: 0px; top: -12px; border-radius: inherit; overflow: hidden; pointer-events: none`,
    ".dSidebarOpen div[shadow] div": `position: absolute; width: calc(100% - 12px); height: calc(100% - 24px); left: 0px; top: 12px; border-radius: inherit; box-shadow: var(--darkShadow)`,
    ".dSidebarOpen button": `display: flex; width: 80px; height: 60px; border-radius: 10px 30px 30px 10px; justify-content: center; align-items: center`,
    ".dSidebarOpen button:hover": `background: var(--hover)`,
    ".dSidebarOpen button svg": `width: 60px; transform: scale(1); transition: .4s`,
    ".dSidebarHolder[open] .dSidebarOpen button svg": `transform: scale(-1)`,

    ".dSidebarHeader": `display: flex; gap: 8px; flex-wrap: wrap; padding: 8px; justify-content: space-between; align-items: center`,
    ".dSidebarLogo": `width: fit-content; height: 36px`,
    ".dSidebarLogo svg": `height: 100%`,
    ".dJoinButton": `padding: 4px 10px; font-size: 18px; --borderWidth: 3px; --borderRadius: 12px`,
    ".dJoinButton svg": `width: 22px; height: 22px; margin-left: 4px`,

    ".dSidebarActions": `display: flex; flex-direction: column; gap: 8px; padding: 8px; margin: 8px 0; align-items: center`,
    ".dCreateLessonButtonHolder": `display: flex; flex-direction: column; width: fit-content; gap: 6px`,
    ".dCreateLessonButtonHolder > a > div[image]": `position: relative; width: 24px; height: 24px; margin-right: 8px`,
    ".dCreateLessonButtonHolder > a > div[image] > svg": `position: absolute; width: 28px; height: 28px; left: 50%; top: 50%; transform: translate(-50%, -50%)`,
    ".dCreateBoardLessonButton": `--themeColor: var(--theme); --borderRadius: 14px`,
    ".dCreateBreakoutLessonButton": `--themeColor: var(--breakoutTheme); --hover: var(--breakoutHover); --borderRadius: 14px`,

    ".dSidebarSorts": `display: flex; flex-direction: column; gap: 8px; padding: 8px`,
    ".dSidebarSearch": `display: flex; box-sizing: border-box; width: calc(100% - 8px); margin: 4px; align-items: center; background: rgba(var(--background), .5); --borderColor: var(--hover); --borderWidth: 4px; --borderRadius: 12px`,
    ".dSidebarSearch svg": `--theme: var(--secondary); width: 26px; height: 26px; margin-left: 6px`,
    ".dSidebarSearch input": `width: 100%; padding: 6px 6px 6px 2px; background: unset; outline: unset; border: unset; color: var(--textColor); font-family: var(--font); font-weight: 600; font-size: 18px`,
    ".dSidebarSearch input::placeholder": `color: var(--hover)`,
    ".dSidebarSort": `width: 100%; padding: 6px 8px; border-radius: 8px; color: var(--textColor); font-weight: 600; font-size: 18px; text-align: left; transform-origin: center left`,
    ".dSidebarSort:hover": `background: var(--hover)`,
    ".dSidebarSort[selected]": `background: var(--secondary); color: #fff`,

    ".dSidebarFolderHeading": `padding: 8px 8px 6px 8px`,
    ".dSidebarFolders": `position: relative; display: flex; flex-direction: column; min-width: fit-content; gap: 8px; padding: 0 4px 8px 8px`,
    ".dSidebarNewFolderButton": `display: flex; width: 28px; height: 28px; justify-content: center; align-items: center; border-radius: 14px`,
    ".dSidebarNewFolderButton:hover": `background: var(--hover)`,
    ".dSidebarNewFolderButton svg": `flex-shrink: 0; width: 20px; height: 20px`,
    ".dSidebarFolderHolder": `width: max-content; min-width: 100%`,

    ".dSidebarFolderParent": `width: -webkit-fill-available`,
    ".dSidebarFolderParent[child]": `padding-left: 20px`,
    ".dSidebarFolder": `--fillColor: var(--theme); --themeColor: var(--fillColor); position: relative; display: flex; padding: 4px; margin-bottom: 6px; border-radius: 8px 18px 18px 8px; align-items: center`,
    ".dSidebarFolder[selected]": `--themeColor: #fff !important`,
    ".dSidebarFolder[selected] .dSidebarFolderSelect": `opacity: 1 !important`,
    ".dSidebarFolder[selected] .dSidebarFolderName": `color: #fff !important`,
    ".dSidebarFolder[inside]": `--folderFill: var(--themeColor)`,
    ".dSidebarFolderIcon": `width: 28px; height: 28px; margin-left: 2px; z-index: 1`,
    ".dSidebarFolderIcon svg": `width: 100%; height: 100%`,
    ".dSidebarFolderSelect": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--fillColor); border-radius: inherit; opacity: 0; transition: .1s`,
    ".dSidebarFolder:hover .dSidebarFolderSelect": `opacity: .2`,
    ".dSidebarFolderName": `flex: 1; margin: 0 8px 0 4px; color: var(--textColor); font-size: 16px; font-weight: 600; z-index: 1; text-align: left`,
    ".dSidebarFolderName[contenteditable]": `padding: 2px 4px; outline: solid 3px var(--themeColor); border-radius: 4px; overflow: auto`,
    ".dSidebarFolderArrow": `position: sticky; display: flex; width: 28px; height: 28px; right: 8px; margin-left: auto; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 14px; z-index: 1; transition: .1s`,
    ".dSidebarFolderArrow svg": `width: 22px; height: 22px; margin-left: 2px`,
    ".dSidebarFolder[opened] .dSidebarFolderArrow": `transform: rotate(90deg)`,
    ".dTileDropFolderLoadMore": `display: flex; width: 100%; justify-content: center; margin-bottom: 8px`,
    ".dTileDropFolderLoadMore button": `display: flex; padding: 6px 8px; align-items: center; --borderRadius: 16px; font-size: 16px; color: var(--theme); font-weight: 700`,

    ".dSidebarAccountHolder": `--percent: 0; display: flex; flex-direction: column; padding: 8px; bottom: 0px; margin-top: auto; align-items: center; background: rgba(var(--background), calc(.7 * var(--percent))); backdrop-filter: blur(calc(4px * var(--percent))); transition: .2s`,
    ".dSidebarUpdateAlert": `display: none; flex-direction: column; width: calc(100% - 16px); margin: 8px; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 18px; transition: .2s`,
    ".dSidebarUpdateAlert[closed]": `pointer-events: none; opacity: 0; transform: scale(.8)`,
    ".dSidebarUpdateAlertTitle": `box-sizing: border-box; display: flex; width: 100%; padding: 6px; gap: 8px; justify-content: space-between; align-items: center`,
    ".dSidebarUpdateAlertTitle > div": `margin-left: 6px; font-size: 16px; font-weight: 600`,
    ".dSidebarUpdateAlertTitle > button": `position: relative; flex-shrink: 0; width: 24px; height: 24px; margin-bottom: auto; --borderWidth: 3px; --borderRadius: 14px`,
    ".dSidebarUpdateAlertTitle > button svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dSidebarUpdateAlertTitle > button:focus-visible": `--borderWidth: 4px`,
    ".dSidebarUpdateAlert div[divider]": `width: calc(100% - 12px); height: 2px; margin-bottom: 6px; background: var(--hover); border-radius: 1px`,
    ".dSidebarUpdateAlert > a, .dSidebarUpdateAlert > button": `box-sizing: border-box; display: flex; width: calc(100% - 12px); padding: 6px; margin-bottom: 6px; border-radius: 6px; font-size: 16px; font-weight: 600; align-items: center; text-align: left; text-decoration: none`,
    ".dSidebarUpdateAlert > a div[image], .dSidebarUpdateAlert > button div[image]": `width: 24px; height: 24px; margin-right: 4px; transition: .1s`,
    ".dSidebarUpdateAlert > a div[image] svg, .dSidebarUpdateAlert > button div[image] svg": `width: 100%; height: 100%`,
    ".dSidebarUpdateAlert > a:last-child, .dSidebarUpdateAlert > button:last-child": `border-bottom-left-radius: 12px; border-bottom-right-radius: 12px`,
    ".dSidebarUpdateAlert > a:hover, .dSidebarUpdateAlert > button:hover": `background: var(--themeColor); color: #fff`,
    ".dSidebarUpdateAlert > a:hover div[image], .dSidebarUpdateAlert > button:hover div[image]": `filter: brightness(0) invert(1)`,
    ".dAccount": `display: flex; max-width: calc(100% - 16px); width: fit-content; min-width: 100px; padding: 6px 12px 6px 6px; --borderRadius: 18px`,
    ".dAccount img[accountimage]": `width: 32px; min-width: 32px; height: 32px; margin-right: 6px; object-fit: cover; border-radius: 16px`,
    ".dAccount div[accountuser]": `max-width: calc(100% - 38px); height: 100%; flex: 1; line-height: 32px; font-size: 18px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dropdownTitle div[accountuser]": `flex: unset`,

    ".dSidebarActionContent": `position: absolute; width: calc(100% + 24px); height: 100%; padding: 12px; left: calc(100% - 12px); top: -12px; z-index: 1; overflow: hidden; pointer-events: none`,
    ".dSidebarActionContainer": `position: absolute; width: calc(100% - (24px * 2)); height: calc(100% - 24px - 16px); max-height: fit-content; left: 12px; padding-left: 4px; background: var(--pageColor); border-radius: 0 26px 26px 0; opacity: 0; transform: translateX(-100%); pointer-events: all; transition: opacity .3s, transform .3s, top .3s`,
    ".dSidebarActionContainer:after": `content: ""; position: absolute; width: 4px; height: 100%; left: 0px; top: 0px; background: var(--theme); z-index: 4; transition: .4s`,
    ".dSidebarActionShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 16px 16px 0; left: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".dSidebarActionShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: 0px 0px 8px 0px var(--theme); opacity: .3; border-radius: inherit`,
    ".dSidebarActionContentHolder": `position: relative; width: 100%; max-height: 100%; background: var(--pageColor); z-index: 3; overflow: auto; border-radius: inherit`,
    ".dSidebarActionContentContainer": `position: relative; width: 100%; height: var(--frameHeight); overflow: hidden; transition: .3s`,
    ".dSidebarActionContentFrame": `position: absolute; width: 100%; height: fit-content; left: 0px; top: 0px; z-index: 2; transition: .3s`,

    ".dLessonsHolder": `position: relative; display: flex; flex-direction: column; width: 100%; min-height: 100%; background: var(--pageColor); overflow-x: hidden; overflow-y: auto; z-index: 1`,
    ".dSelectedTitleHolder": `--percent: 0; position: sticky; display: flex; box-sizing: border-box; width: 100%; padding: 20px; top: 0px; background: rgba(var(--background), calc(.7 * var(--percent))); backdrop-filter: blur(calc(4px * var(--percent))); z-index: 2; transition: background .2s, backdrop-filter .2s, box-shadow .2s`,
    ".dSelectedTitle": `font-size: 28px; font-weight: 600; text-align: left`,
    ".dBannerHolder": `display: none; box-sizing: border-box; width: 100%; height: fit-content; transition: .4s`,
    ".dBanner": `display: flex; gap: 8px; width: 100%; height: fit-content; padding: 6px; margin: 8px; box-shadow: var(--darkShadow); border-radius: 4px 4px 12px 12px; transition: .4s`,
    ".dBannerIcon": `width: 50px; height: 50px`,
    ".dBannerContent": `display: flex; flex-direction: column; flex: 1; text-align: left`,
    ".dBannerTitle": `margin-top: 4px; font-size: 18px; font-weight: 700; color: var(--theme)`,
    ".dBannerText": `margin-top: 4px; font-size: 14px`,
    ".dBannerButtons": `display: flex; gap: 8px; height: fit-content; min-height: 50px; padding: 0 8px 0 0; align-items: center`,
    ".dBannerButtons button": `position: relative; --borderWidth: 3px; --borderRadius: 14px`,
    ".dBannerButtons button svg, .dBannerButtons button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dBannerClose": `width: 22px; height: 22px; margin: 3px`,
    ".dBannerAction": `--themeColor: var(--theme); padding: 0 10px; font-size: 16px; font-weight: 600; color: var(--theme); height: 28px; margin: 3px`,

    ".dFolderInfo": `display: flex; width: 100%; justify-content: center; align-items: center`,
    ".dFolderColorButton": `position: relative; width: 40px; height: 40px; flex-shrink: 0`,
    ".dFolderColorsHolder": `position: absolute; width: 48px; left: -6px; top: -4px; background: rgba(var(--background), 0); overflow: hidden; border-radius: 16px 26px 26px 16px; transition: width .4s, box-shadow .4s; z-index: 2`,
    ".dFolderColors": `display: flex; gap: 4px; width: fit-content; height: 100%; padding: 4px 8px 4px 6px; align-items: center`,
    ".dFolderColors button[icon]": `width: 40px; height: 40px; padding: 0; flex-shrink: 0`,
    ".dFolderColors button[icon] svg": `width: 100%; height: 100%`,
    ".dFolderColors button[hex]": `width: 32px; height: 32px; border: solid 2px var(--pageColor); border-radius: 16px; flex-shrink: 0`,
    ".dFolderInfo div[title]": `padding: 4px 0; margin: 0 auto 0 4px; font-size: 26px; font-weight: 600; color: var(--themeColor); border: solid 3px rgba(var(--background), 0); border-radius: 12px; outline: none; transition: .2s; cursor: pointer; text-align: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; scrollbar-width: none`,
    ".dFolderInfo div[title]::-webkit-scrollbar": `display: none`,
    ".dFolderInfo div[contenteditable]": `padding: 4px 6px; border: solid 3px var(--themeColor); cursor: unset; text-overflow: unset !important; overflow: auto !important`,
    ".dFolderInfoActions": `display: flex; margin-left: 8px`,
    ".dFolderRemove": `display: flex; padding: 6px; --themeColor: var(--error); --themeColor2: var(--error); --borderWidth: 3px; --borderRadius: 20px; color: #fff; justify-content: center; align-items: center`,
    ".dFolderRemove svg": `width: 22px; height: 22px`,

    ".dTilesHolder": `position: relative; width: calc(100% - 40px); min-height: fit-content; height: 100%; margin: 0px 20px 20px 20px; z-index: 1`
  };

  loadAmount = 25;

  lessons = {};
  records = {
    recent: [],
    shared: [],
    owned: [],
    newest: []
  };

  folders = {};

  sort = "recent";

  //actionContent = null;
  //actionContentButton = null;
  //actionContentTool = null;
  //actionContentContainer = null;
  //actionContentFrameHeight = null;
  updateActionContent() {
    if (this.actionContent == null) {
      return;
    }
    if (this.actionContentButton == null) {
      return this.closeActionContent();
    }
    let actionTool = this.actionContentButton.getAttribute("actiontool");
    if (this.actionContentTool != actionTool) {
      this.actionContentTool = actionTool;
      
      if (this.actionContentContainer != null) {
        let removeContentContainer = this.actionContentContainer;
        setTimeout(() => {
          removeContentContainer.remove();
        }, 300);
        removeContentContainer.style.opacity = 0;
        removeContentContainer.style.zIndex = 1;
      }

      let moduleLoad = toolFrameModules[toolFrameModulePath + actionTool + ".js"];
      if (moduleLoad != null) {
        let actionContentContainer = document.createElement("div");
        actionContentContainer.className = "dSidebarActionContentFrame";
        this.actionContentContainer = actionContentContainer;

        (async () => {
          let { theme } = await this.setFrame(moduleLoad, actionContentContainer);

          if (actionContentContainer != null && actionContentContainer == this.actionContentContainer) { // Debounce check
            if (theme != null) {
              this.actionContent.style.setProperty("--theme", theme);
            } else {
              this.actionContent.style.removeProperty("--theme");
            }

            this.actionContentFrameHeight = actionContentContainer.offsetHeight;
            actionContentContainer.style.opacity = 1;

            this.updateActionContent();
          }
        })();

        this.actionContent.querySelector(".dSidebarActionContentContainer").appendChild(actionContentContainer);
      }
    }
    if (this.actionContentFrameHeight != null) {
      let pageRect = this.dashboard.getBoundingClientRect();
      let buttonRect = this.actionContentButton.getBoundingClientRect();
      let frameTop = buttonRect.top - pageRect.top - 6;
      let difference = frameTop + this.actionContentFrameHeight - pageRect.height + 8;
      if (difference > 0) {
        frameTop -= difference;
      }
      this.actionContent.style.top = (Math.max(frameTop, 8) + 12) + "px";
      this.actionContent.style.setProperty("--frameHeight", this.actionContentFrameHeight + "px");
    }
  }
  openActionContent() {
    if (this.actionContent != null) {
      this.closeActionContent();
    }
    this.actionContent = document.createElement("div");
    this.actionContent.className = "dSidebarActionContainer";
    this.actionContent.innerHTML = `<div class="dSidebarActionShadow"></div><div class="dSidebarActionContentHolder"><div class="dSidebarActionContentContainer"></div></div>`;
    this.sidebarActionContent.appendChild(this.actionContent);
    this.updateActionContent();
    this.actionContent.offsetHeight;
    this.actionContent.style.transform = "translateX(0%)";
    this.actionContent.style.opacity = 1;
  }
  closeActionContent() {
    if (this.actionContent == null) {
      return;
    }
    let removeActionContent = this.actionContent;
    this.actionContent = null;
    this.actionContentButton = null;
    this.actionContentTool = null;
    setTimeout(() => {
      if (removeActionContent != null) {
        removeActionContent.remove();
      }
    }, 300);
    removeActionContent.style.removeProperty("transform");
    removeActionContent.style.removeProperty("opacity");
    removeActionContent.style.zIndex = 0;
  }

  updateScrollShadows() {
    if (this.lessonsHolder.scrollTop > 0 && this.titleHolder.offsetTop - this.lessonsHolder.scrollTop <= 1) { // Lesson Topbar Shadow:
      this.titleHolder.style.setProperty("--percent", "1");
      this.titleHolder.style.boxShadow = "var(--lightShadow)";
    } else {
      this.titleHolder.style.removeProperty("--percent");
      this.titleHolder.style.removeProperty("box-shadow");
    }

    if (Math.floor(this.sidebar.scrollTop) < Math.floor(this.sidebar.scrollHeight - this.sidebar.clientHeight)) { // Account Holder Shadow:
      this.accountHolder.style.setProperty("--percent", "1");
      this.accountHolder.style.boxShadow = "var(--lightShadow)";
    } else {
      this.accountHolder.style.removeProperty("--percent");
      this.accountHolder.style.removeProperty("box-shadow");
    }
  }

  //sidebarOpen = null;
  //sidebarOpenButtonVisible = null;
  openSidebar() {
    this.sidebarOpen = true;
    this.sidebarHolder.setAttribute("open", "");
    this.sidebarHolder.style.left = "0px";
  }
  closeSidebar() {
    if (this.sidebarOpenButtonVisible == false) {
      return;
    }
    this.sidebarOpen = false;
    this.sidebarHolder.removeAttribute("open");
    this.sidebarHolder.style.left = -this.sidebar.offsetWidth + "px";

    this.closeActionContent();
  }

  updateResize() {
    if (fixed.offsetWidth > 800 && fixed.offsetHeight > 400) {
      this.dashboardHolder.style.removeProperty("padding");
      this.dashboard.style.removeProperty("border-radius");
    } else {
      this.dashboardHolder.style.padding = "0px";
      this.dashboard.style.borderRadius = "0px";
    }

    if (fixed.offsetWidth > 800) {
      if (this.sidebarOpenButtonVisible != false) {
        this.sidebarOpenButtonVisible = false;
        this.sidebarHolder.style.removeProperty("position");
        this.sidebarOpenHolder.style.removeProperty("display");
      }
      this.openSidebar();
    } else {
      if (this.sidebarOpenButtonVisible != true) {
        this.sidebarOpenButtonVisible = true;
        this.sidebarHolder.style.position = "absolute";
        this.sidebarOpenHolder.style.display = "unset";
      }
      this.closeSidebar();
    }

    this.updateScrollShadows();
    this.updateActionContent();
  }

  unselectSort() {
    let currentSelected = this.sidebar.querySelector("button[selected], a[selected]");
    if (currentSelected != null) {
      currentSelected.removeAttribute("selected");
    }
  }
  changeSort() {

  }

  updateFolderTile(folder, insertFirst) {
    if (folder == null) {
      return;
    }
    let element = folder.element;
    if (element == null) {
      return;
    }
    let parentElement = folder.parentElement;
    if (parentElement == null) {
      return;
    }

    let render = folder.render ?? {};
    let name = render.name ?? "";
    let folderName = element.querySelector(".dSidebarFolderName");
    folderName.textContent = name;
    folderName.title = name;
    if (render.color != null) {
      element.style.setProperty("--fillColor", "#" + render.color);
    }

    if (render.opened != null) {
      parentElement.setAttribute("lastopened", render.opened);
    }

    let parent;
    if (render.parent != null) {
      parent = (this.folders[render.parent]).parentElement ?? this.folderHolder;
      parentElement.setAttribute("child", "");
    } else {
      parent = this.folderHolder;
      parentElement.removeAttribute("child");
    }
    if (insertFirst == true) {
      if (parent.className != "dSidebarFolderParent") {
        if (parent.firstElementChild != null) {
          parent.insertBefore(parentElement, parent.firstElementChild);
        } else {
          parent.appendChild(parentElement);
        }
      } else {
        if (parent.children[1] != null) {
          parent.insertBefore(parentElement, parent.children[1]);
        } else {
          parent.appendChild(parentElement);
        }
      }
    } else {
      parent.appendChild(parentElement);
    }
  }
  addFolderTile(folder, insertFirst) {
    if (folder == null) {
      return;
    }
    if (folder.element != null) {
      return this.updateFolderTile(folder);
    }
    let parentElement = document.createElement("div");
    parentElement.className = "dSidebarFolderParent";
    parentElement.innerHTML = `<a class="dSidebarFolder" inside>
      <div class="dSidebarFolderSelect"></div>
      <div class="dSidebarFolderIcon">${folderIcon}</div>
      <div class="dSidebarFolderName"></div>
      <div class="dSidebarFolderArrow">${folderArrowIcon}</div>
    </a>`;
    folder.parentElement = parentElement;
    folder.element = parentElement.querySelector(".dSidebarFolder");

    folder.element.setAttribute("folderid", folder.render._id);

    this.updateFolderTile(folder, insertFirst);
    
    return folder;
  }
  removeFolderTile(folder) {
    if ((folder ?? {}).parentElement == null) {
      return;
    }
    folder.parentElement.remove();
    delete folder.parentElement;
    delete folder.element;
  }

  async js(page) {
    this.dashboardHolder = page.querySelector(".dPageHolder")
    this.dashboard = this.dashboardHolder.querySelector(".dPage")

    this.sidebarHolder = this.dashboard.querySelector(".dSidebarHolder");
    this.sidebar = this.sidebarHolder.querySelector(".dSidebar");
    this.logoButton = this.sidebar.querySelector(".dSidebarLogo");
    this.joinLessonButton = this.sidebar.querySelector(".dJoinButton");
    this.actionHolder = this.sidebar.querySelector(".dSidebarActions");
    this.newBoardLessonButton = this.actionHolder.querySelector(".dCreateBoardLessonButton");
    this.newBreakoutLessonButton = this.actionHolder.querySelector(".dCreateBreakoutLessonButton");
    this.searchInput = this.sidebar.querySelector(".dSidebarSearch input");
    this.folderHolder = this.sidebar.querySelector(".dSidebarFolderHolder");
    this.newFolderButton = this.sidebar.querySelector(".dSidebarNewFolderButton");
    this.accountHolder = this.sidebar.querySelector(".dSidebarAccountHolder");
    this.updateAlert = this.accountHolder.querySelector(".dSidebarUpdateAlert");
    this.accountButton = this.accountHolder.querySelector(".dAccount");
    this.sidebarActionContent = this.sidebarHolder.querySelector(".dSidebarActionContent");
    this.sidebarOpenHolder = this.sidebarHolder.querySelector(".dSidebarOpen");
    this.sidebarOpenButton = this.sidebarOpenHolder.querySelector("button");
    this.sidebarOpenButtonIcon = this.sidebarOpenButton.querySelector("svg");

    this.lessonsHolder = this.dashboard.querySelector(".dLessonsHolder");
    this.titleHolder = this.lessonsHolder.querySelector(".dSelectedTitleHolder");
    this.tileHolder = this.dashboard.querySelector(".dTilesHolder");

    // Onboard:
    if (account.onboard == null) {
      modal.open(import("@modules/modals/Resources.js"));
    } else if (account.lastWhatsNew != null && account.currentWhatsNew != null && account.lastWhatsNew != account.currentWhatsNew) {
      let closeButton = this.updateAlert.querySelector(".dSidebarUpdateAlertTitle > button");
      closeButton.addEventListener("click", async () => {
        sendRequest("POST", "me/read?seen=whatsnew");
        this.updateAlert.setAttribute("closed", "");
        await sleep(200);
        this.updateAlert.style.display = "none";
        this.updateScrollShadows();
      });
      let openButton = this.updateAlert.querySelector("a[opennew]");
      openButton.href = "/app/lesson?lesson=" + account.currentWhatsNew;
      openButton.addEventListener("click", (event) => {
        event.preventDefault();
        setPage("pages/app/lesson", { params: { lesson: account.currentWhatsNew } });
      });
      let shareButton = this.updateAlert.querySelector("button[share]");
      shareButton.addEventListener("click", () => {
        dropdown.open(shareButton, GiftDropdown);
      });

      updateAlert.style.display = "flex";
    }

    // Update banner:
    if (CURRENT_BANNER != null && (account.tenant ?? {}).role != "student") {
      let bannerHolder = this.lessonsHolder.querySelector(".dBannerHolder");
      let banner = bannerHolder.querySelector(".dBanner");
      let bannerCloseButton = banner.querySelector(".dBannerClose");
      let seenBanners = JSON.parse(getLocalStore("seenDashboardBanners") ?? "[]");
      if (seenBanners.includes(CURRENT_BANNER) == false) {
        bannerHolder.style.display = "flex";
      }
      bannerCloseButton.addEventListener("click", async () => {
        seenBanners.push(CURRENT_BANNER);
        setLocalStore("seenDashboardBanners", JSON.stringify(seenBanners));
        this.lessonsHolder.scrollTo({ top: 0, behavior: "smooth" });
        bannerHolder.style.height = bannerHolder.offsetHeight + "px";
        bannerHolder.offsetHeight;
        banner.style.opacity = 0;
        banner.style.transform = "translateY(calc(-100% - 16px)";
        bannerHolder.style.height = "0px";
      });
      //setSVG(bannerCloseButton, "../images/tooltips/close.svg");
      let bannerActionButton = banner.querySelector(".dBannerAction");
      bannerActionButton.addEventListener("click", async () => {
        bannerActionButton.setAttribute("disabled", "");
        //await loadScript("./modules/dropdowns/account.js");
        //await dropdown.open(bannerFeedbackButton, "dropdowns/account/report");
        setPage("pages/app/lesson", { params: { type: "breakout" } });
        bannerActionButton.removeAttribute("disabled");
      });
      bannerActionButton.textContent = "Try It!";
    }

    // Sidebar action buttons:
    this.logoButton.addEventListener("click", (event) => {
      event.preventDefault();
      setPage("pages/launch");
    });
    this.joinLessonButton.addEventListener("click", (event) => {
      event.preventDefault();
      setPage("pages/app/join");
    });
    this.newBoardLessonButton.addEventListener("click", (event) => {
      event.preventDefault();
      let params = { type: "board" };
      if (this.sort != null && this.sort.length > 20) {
        params["folder"] = this.sort;
      }
      setPage("pages/app/lesson", { params: params });
    });
    this.newBreakoutLessonButton.addEventListener("click", (event) => {
      event.preventDefault();
      let params = { type: "breakout" };
      if (this.sort != null && this.sort.length > 20) {
        params["folder"] = this.sort;
      }
      setPage("pages/app/lesson", { params: params });
    });

    // Sidebar new folder button:
    this.newFolderButton.addEventListener("click", () => {
      let parent = null;
      let currentSelected = this.sidebar.querySelector(".dSidebarFolder[selected][opened]");
      if (currentSelected != null) {
        parent = currentSelected.getAttribute("folderid");
      }

      let element = this.addFolderTile({ render: { _id: "new", parent } }, true).element;

      let folderName = element.querySelector(".dSidebarFolderName")
      folderName.setAttribute("contenteditable", "");
      let keyDownListener = (event) => {
        if (event.keyCode == 13) {
          event.preventDefault();
          folderName.blur();
          return;
        }
      };
      folderName.addEventListener("keydown", keyDownListener);
      let pasteListener = (event) => {
        event.preventDefault();
        document.execCommand("insertHTML", false, (event.originalEvent ?? event).clipboardData.getData("text/plain"));
      }
      folderName.addEventListener("paste", pasteListener);
      let focusListener;
      focusListener = async () => {
        folderName.removeEventListener("keydown", keyDownListener);
        folderName.removeEventListener("paste", pasteListener);
        folderName.removeEventListener("focusout", focusListener);
        
        folderName.removeAttribute("contenteditable");
        
      };
      folderName.addEventListener("focusout", focusListener);

      setTimeout(() => {
        folderName.focus();
      }, 1);
        
      this.updateScrollShadows();
    });

    // Sidebar account details:
    if (account.image != null) {
      this.accountButton.querySelector("img[accountimage]").src = account.image;
    }
    let username = this.accountButton.querySelector("div[accountuser]");
    username.textContent = account.user;
    username.title = account.user;
    this.accountButton.addEventListener("click", () => {
      dropdown.open(this.accountButton, import("@modules/dropdowns/Account"), { parent: this });
    });

    // Open/Close sidebar button:
    this.sidebarOpenButton.addEventListener("click", () => {
      if (this.sidebarOpen == false) {
        this.openSidebar();
      } else {
        this.closeSidebar();
      }
    });

    // Scroll listeners:
    this.sidebar.addEventListener("scroll", () => {
      this.updateScrollShadows();
      this.updateActionContent();
    });
    this.lessonsHolder.addEventListener("scroll", (event) => {
      if (this.currentLessonFrame != null && this.currentLessonFrame.scroll != null) {
        this.currentLessonFrame.scroll(event);
      }
      this.updateScrollShadows(event);
    });

    // Resize listener:
    this.addEventListener(window, "resize", (event) => {
      if (this.currentLessonFrame != null && this.currentLessonFrame.resize != null) {
        this.currentLessonFrame.resize(event);
      }
      this.updateResize();
    });
    this.updateResize();

    // Action content hover listener:
    this.addEventListener(window, "mousemove", (event) => {
      let target = event.target;
      if (this.actionContent != null) {
        if (target == null || target.closest(".dSidebarActions, .dSidebarActionContainer") == null) {
          this.closeActionContent();
        } else {
          let actionButton = target.closest(".largeButton");
          if (actionButton != null && actionButton.closest(".dSidebarActions") != null) {
            this.actionContentButton = actionButton;
          }
          this.updateActionContent();
        }
      } else if (target != null && this.sidebarOpenButtonVisible != true) {
        let actionButton = target.closest(".largeButton");
        if (actionButton != null && actionButton.closest(".dSidebarActions") != null) {
          this.actionContentButton = actionButton;
          this.openActionContent();
        }
      }
    });
    this.addEventListener(document, "mouseleave", (event) => {
      this.closeActionContent();
    });
  }
}