import { PageFrame, fixed, userID, account, changeGlobalImports, mouseDown, setPage, sleep, modifyParams, getEpoch, checkForAuth, sendRequest, subscribe, getLocalStore, setLocalStore, objectUpdate } from "@/crucial";

import { dropdown } from "@modules/utility/Dropdown";
import { modal } from "@modules/utility/Modal";
import { alert } from "@modules/utility/Alert";

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
          <div class="dSidebarSection dTileDropFoldersLoadMore">
            <button class="buttonAnim border">View More</button>
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
      <div class="dLessonsHolder customScroll" tabindex="-1">
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
    ".dSidebarBackdropImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; opacity: .75; object-fit: cover; pointer-events: none`,
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
    ".dSidebarLogo": `width: fit-content; height: 36px; border-radius: 4px`,
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
    ".dSidebarFolderName[contenteditable]": `padding: 2px 4px; outline: solid 3px var(--themeColor); outline-offset: 0; border-radius: 4px; overflow: auto`,
    ".dSidebarFolderArrow": `position: sticky; display: flex; width: 28px; height: 28px; right: 8px; margin-left: auto; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 14px; z-index: 1; transition: .1s`,
    ".dSidebarFolderArrow svg": `width: 22px; height: 22px; margin-left: 2px`,
    ".dSidebarFolder[opened] .dSidebarFolderArrow": `transform: rotate(90deg)`,
    ".dTileDropFoldersLoadMore": `display: flex; width: 100%; justify-content: center`,
    ".dTileDropFoldersLoadMore button": `display: none; padding: 6px 8px; margin-bottom: 8px; align-items: center; --borderRadius: 16px; font-size: 16px; color: var(--theme); font-weight: 700`,
    ".dSidebarFolderParent .dTileDropFoldersLoadMore button": `display: flex !important`,

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
    ".dSidebarActionContainer": `position: absolute; width: calc(100% - (24px * 2)); height: min(calc(100% - 24px - 16px), var(--frameHeight)); left: 12px; padding-left: 4px; background: var(--pageColor); border-radius: 0 26px 26px 0; opacity: 0; transform: translateX(-100%); pointer-events: all; transition: opacity .3s, transform .3s, top .3s, height .3s`, // var(--bounce)
    ".dSidebarActionContainer:after": `content: ""; position: absolute; width: 4px; height: 100%; left: 0px; top: 0px; background: var(--theme); z-index: 4; transition: .3s`,
    ".dSidebarActionShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 16px 16px 0; left: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".dSidebarActionShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: 0px 0px 8px 0px var(--theme); opacity: .3; border-radius: inherit`,
    ".dSidebarActionContentHolder": `position: relative; width: 100%; max-height: 100%; background: var(--pageColor); z-index: 3; overflow: auto; border-radius: inherit`,
    ".dSidebarActionContentContainer": `position: relative; width: 100%; height: var(--frameHeight); overflow: hidden; transition: .3s`,
    ".dSidebarActionContentFrame": `position: absolute; width: 100%; height: fit-content; left: 0px; top: 0px; opacity: 0; z-index: 2; transition: .3s`,

    ".dLessonsHolder": `position: relative; display: flex; flex-direction: column; width: 100%; min-height: 100%; background: var(--pageColor); overflow-x: hidden; overflow-y: auto; z-index: 1; transition: .3s; outline: none !important`,
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

    ".dFolderInfo": `--folderFill: var(--themeColor); display: flex; width: 100%; justify-content: center; align-items: center`,
    ".dFolderColorButton": `position: relative; width: 40px; height: 40px; flex-shrink: 0`,
    ".dFolderColorsHolder": `position: absolute; width: 48px; left: -6px; top: -4px; background: rgba(var(--background), 0); overflow: hidden; border-radius: 16px 26px 26px 16px; transition: width .4s, box-shadow .4s; z-index: 2`,
    ".dFolderColors": `display: flex; gap: 4px; width: fit-content; height: 100%; padding: 4px 8px 4px 6px; align-items: center`,
    ".dFolderColors button[icon]": `width: 40px; height: 40px; padding: 0; flex-shrink: 0`,
    ".dFolderColors button[icon] svg": `width: 100%; height: 100%`,
    ".dFolderColors button[hex]": `width: 32px; height: 32px; border: solid 2px var(--pageColor); border-radius: 16px; flex-shrink: 0`,
    ".dFolderInfo div[title]": `padding: 4px 0; margin: 0 auto 0 4px; font-size: 26px; font-weight: 600; color: var(--themeColor); border: solid 3px rgba(var(--background), 0); border-radius: 12px; outline: none; transition: .2s; cursor: pointer; text-align: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; scrollbar-width: none`,
    ".dFolderInfo div[title]::-webkit-scrollbar": `display: none`,
    ".dFolderInfo div[title]:focus": `padding: 4px 6px; border: solid 3px var(--themeColor); cursor: unset; text-overflow: unset !important; overflow: auto !important`,
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
  loading = {};

  //sort = null;

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
      
      let previousContainer = false;
      if (this.actionContentContainer != null) {
        let removeContentContainer = this.actionContentContainer;
        setTimeout(() => {
          removeContentContainer.remove();
        }, 300);
        removeContentContainer.style.removeProperty("opacity");
        removeContentContainer.style.zIndex = 1;
        previousContainer = true;
      }

      let moduleLoad = toolFrameModules[toolFrameModulePath + actionTool + ".js"];
      if (moduleLoad != null) {
        let actionContentContainer = document.createElement("div");
        actionContentContainer.className = "dSidebarActionContentFrame";
        this.actionContentContainer = actionContentContainer;

        if (previousContainer == false) {
          actionContentContainer.style.opacity = 1; // Show instantly
        }

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
    this.lessonsHolder.setAttribute("disabled", "");
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
    this.lessonsHolder.removeAttribute("disabled");
  }

  updateScrollShadows() {
    if (this.lessonsHolder.scrollTop > 0 && this.titleHolder.offsetTop - this.lessonsHolder.scrollTop <= 1) { // Lesson Topbar Shadow:
      this.titleHolder.style.setProperty("--percent", "1");
      this.titleHolder.style.boxShadow = "var(--lightShadow)";
    } else {
      this.titleHolder.style.removeProperty("--percent");
      this.titleHolder.style.removeProperty("box-shadow");
    }

    if (Math.ceil(this.sidebar.scrollTop) < Math.floor(this.sidebar.scrollHeight - this.sidebar.clientHeight)) { // Account Holder Shadow:
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

  isFolderID(id) {
    return id != null && id.length > 20;
  }

  checkTime(sort, record) {
    switch (sort) {
      case "shared":
        return record.added ?? record.opened;
      case "owned":
        return record.added ?? record.opened;
      case "newest":
        return record.added ?? record.opened;
    }
    return record.opened ?? record.added;
  }

  addRecords(recordArr, newRecords) {
    for (let i = 0; i < newRecords.length; i++) {
      let newRecord = newRecords[i];
      let lesson = this.lessons[newRecord.lesson];
      if (lesson == null) {
        continue;
      }
      lesson.record = { ...(lesson.record ?? {}), ...newRecord };
      recordArr.push(newRecord._id);
    }
    /*let loading = this.loading[type];
    if (loading != null) {
      loading.resolve();
      delete this.loading[type];
    }*/
  }

  unselectSort() {
    let currentSelected = this.sidebar.querySelector("button[selected], a[selected]");
    if (currentSelected != null) {
      currentSelected.removeAttribute("selected");
    }
  }
  async changeSort(sort, extra = {}) {
    this.lessonsHolder.scrollTo(0, 0);

    if (sort == this.sort && extra.refresh != true) {
      return;
    }
    this.sort = sort;

    let addPath = "";
    if (this.isFolderID(sort) == true) { // Folder:
      this.titleHolder.innerHTML = `
      <div class="dFolderInfo">
        <div class="dFolderColorButton">
          <div class="dFolderColorsHolder">
            <div class="dFolderColors">
              <button icon>${folderIcon}</button>
              <button hex="0084FF"></button>
              <button hex="DF84FF"></button>
              <button hex="FFB938"></button>
              <button hex="34C172"></button>
              <button hex="FF3D64"></button>
              <button hex="FA8A5A"></button>
              <button hex="2F2F2F"></button>
              <button hex="FF008A"></button>
            </div>
          </div>
        </div>
        <div title contenteditable="true"></div>
        <div class="dFolderInfoActions">
          <button class="dFolderRemove largeButton" option="deletefolder" dashboard title="Delete this folder." dropdowntitle="Delete Folder">${trashIcon}</button>
        </div>
      </div>
      `;
      this.titleHolder.style.padding = "14px 16px";

      let folder = (this.folders[sort] ?? {}).render ?? {};

      let setColor = "var(--theme)";
      if (folder.color != null) {
        setColor = "#" + folder.color;
      }
      let folderInfo = this.titleHolder.querySelector(".dFolderInfo");
      folderInfo.style.setProperty("--themeColor", setColor);
      let colorHolderFrame = this.titleHolder.querySelector(".dFolderColorsHolder");
      let colorHolder = colorHolderFrame.querySelector(".dFolderColors");
      let colors = colorHolder.querySelectorAll("button[hex]");
      for (let i = 0; i < colors.length; i++) {
        colors[i].style.background = "#" + colors[i].getAttribute("hex");
      }
      let openColorFrame = () => {
        colorHolderFrame.setAttribute("open", "");
        colorHolderFrame.style.width = colorHolder.offsetWidth + "px";
        colorHolderFrame.style.boxShadow = "var(--darkShadow)";
        colorHolderFrame.style.background = "rgba(var(--background), 1)";
      }
      let closeColorFrame = async () => {
        colorHolderFrame.removeAttribute("open");
        colorHolderFrame.style.removeProperty("width");
        colorHolderFrame.style.removeProperty("box-shadow");
        await sleep(400);
        if (colorHolderFrame != null && colorHolderFrame.hasAttribute("open") == false) {
          colorHolderFrame.style.removeProperty("background");
        }
      }
      colorHolderFrame.addEventListener("click", async (event) => {
        let button = event.target.closest("button");
        if (button == null) {
          return;
        }
        let newColor = button.getAttribute("hex");
        if (newColor != null) {
          closeColorFrame();
          folderInfo.style.setProperty("--themeColor", "#" + newColor);
          colorHolder.setAttribute("disabled", "");
          let [code] = await sendRequest("PUT", "lessons/folders/color?folder=" + sort, { color: newColor });
          if (code == 200) {
            folder.color = newColor;
            let folderSort = this.folderHolder.querySelector('.dSidebarFolder[folderid="' + sort + '"]');
            if (folderSort != null) {
              folderSort.style.setProperty("--fillColor", "#" + newColor);
            }
          } else {
            folderInfo.style.setProperty("--themeColor", setColor);
          }
          colorHolder.removeAttribute("disabled");
        }
      });
      colorHolderFrame.addEventListener("mouseenter", () => {
        if (colorHolderFrame.hasAttribute("open") == false) {
          openColorFrame();
        }
      });
      colorHolderFrame.addEventListener("mouseleave", () => {
        if (colorHolderFrame.hasAttribute("open") == true) {
          closeColorFrame();
        }
      });
      colorHolderFrame.addEventListener("focusin", () => {
        if (colorHolderFrame.hasAttribute("open") == false) {
          openColorFrame();
        }
      });
      colorHolderFrame.addEventListener("focusout", () => {
        if (colorHolderFrame.hasAttribute("open") == true) {
          closeColorFrame();
        }
      });

      let folderName = this.titleHolder.querySelector("div[title]");
      let name = folder.name ?? "Untitled Folder";
      folderName.textContent = name;
      folderName.title = name;
      folderName.addEventListener("blur", async () => {
        let name = folderName.textContent.substring(0, 30).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
        let prevName = folder.name ?? "Untitled Folder";
        if (name.replace(/ /g, "").length < 1) {
          folderName.textContent = prevName;
          folderName.title = prevName;
          return folderName.scrollTo(0, 0);
        }
        if (name == prevName) {
          folderName.textContent = prevName;
          folderName.title = prevName;
          return folderName.scrollTo(0, 0);
        }

        folderName.setAttribute("disabled", "");
        let [code] = await sendRequest("PUT", "lessons/folders/name?folder=" + sort, { name });
        if (code == 200) {
          folder.name = name;
          folderName.textContent = name;
          folderName.title = name;
          let folderSort = this.folderHolder.querySelector('.dSidebarFolder[folderid="' + sort + '"]');
          if (folderSort != null) {
            let title = folderSort.querySelector(".dSidebarFolderName");
            title.textContent = name;
            title.title = name;
          }
        } else {
          folderName.textContent = prevName;
          folderName.title = prevName;
        }
        folderName.scrollTo(0, 0);
        folderName.removeAttribute("disabled");
      });
      folderName.addEventListener("keydown", (event) => {
        if (event.keyCode == 13) {
          event.preventDefault();
          folderName.blur();
          return;
        }
      });

      let removeButton = this.titleHolder.querySelector(".dFolderRemove");
      removeButton.addEventListener("click", () => {
        dropdown.open(removeButton, import("@modules/dropdowns/Remove"), {
          parent: this,
          type: "deletefolder",
          folderID: sort,
          folders: this.folders,
          records: this.records,
          lessons: this.lessons
        });
      });

      addPath = "&folder=" + sort;
    } else { // Regular Sort:
      this.titleHolder.innerHTML = `<div class="dSelectedTitle">${sort[0].toUpperCase() + sort.substring(1) + " Lessons"}</div>`;
      this.titleHolder.style.removeProperty("padding");
    }

    this.newBoardLessonButton.href = "/app/lesson?type=board" + addPath;
    this.newBreakoutLessonButton.href = "/app/lesson?type=breakout" + addPath;

    if (extra.search == null) {
      this.lessonsHolder.focus();
    }

    // Set new lesson frame:
    this.currentLessonFrame = await this.setFrame(LessonFrame, this.tileHolder, { ...extra, construct: { sort } });
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

    let parent;
    if (render.parent != null) {
      parent = (this.folders[render.parent] ?? {}).parentElement ?? this.folderHolder;
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
    } else if (parentElement.parentElement != parent) {
      parent.appendChild(parentElement);
    }
  }
  addFolderTile(folder, insertFirst) {
    if (folder == null) {
      return;
    }
    if (folder.element != null) {
      return this.updateFolderTile(folder, insertFirst);
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

    // Remove child folders:
    for (let i = 0; i < folder.folders.length; i++) {
      this.removeFolderTile(this.folders[folder.folders[i]]);
    }
  }

  updateFolderOrder(folderID) {
    let foundFolder = this.folders[folderID];
    if (foundFolder != null) {
      if (foundFolder.render.parent == null) {
        this.addFolderTile(foundFolder, true);
      } else {
        let foundParentFolder = this.folders[foundFolder.render.parent] ?? {};
        if (foundParentFolder.folders != null) {
          let folderIndex = foundParentFolder.folders.indexOf(folderID);
          if (folderIndex > -1) {
            foundParentFolder.folders.splice(folderIndex, 1);
          }
          foundParentFolder.folders.unshift(folderID);
        }
        if (foundParentFolder.element != null && foundParentFolder.element.hasAttribute("opened") == true) {
          this.addFolderTile(foundFolder, true);
        } else {
          this.removeFolderTile(foundFolder);
        }
        this.updateFolderOrder(foundFolder.render.parent);
      }
    }
  }
  removeFolder(folder) {
    if (folder == null) {
      return;
    }
    let changeLessons = this.records[folder._id] ?? [];
    for (let c = 0; c < changeLessons.length; c++) {
      delete this.lessons[changeLessons[c].split("_")[0]].record.folder;
    }
    for (let i = 0; i < folder.folders.length; i++) {
      this.removeFolder(this.folders[folder.folders[i]]);
    }
    this.removeFolderTile(folder);
    delete this.folders[folder._id];
    delete this.records[folder._id];
  }
  updateSubscribe() {
    let filter = { type: ["dash", "lesson"], id: Object.keys(this.lessons).slice(-350), _id: userID };
    if (this.dashSubscribe) {
      this.dashSubscribe.edit(filter);
    } else {
      this.dashSubscribe = subscribe(filter, async (data) => {
        let body = data.data ?? data.body ?? data;
        switch (data.task) {
          case "join": {
            let lesson = this.lessons[body.lesson];
            if (lesson != null) {
              let memberCount = (lesson.members ?? 0) + 1;
              lesson.members = memberCount;
              lesson.membersUpdate = getEpoch();
              if (this.currentLessonFrame != null) {
                this.currentLessonFrame.updateTile(null, lesson);
              }
            }
            break;
          }
          case "leave": {
            let lesson = this.lessons[body.lesson];
            if (lesson != null) {
              let memberCount = (lesson.members ?? 0) - 1;
              lesson.members = memberCount;
              lesson.membersUpdate = getEpoch();
              if (this.currentLessonFrame != null) {
                this.currentLessonFrame.updateTile(null, lesson);
              }
            }
            break;
          }
          case "set": {
            if (data.tool != null) {
              return;
            }

            let record = body.record ?? {};
            let lessonID = record.lesson ?? body._id ?? body.id;
            if (lessonID == null) {
              return;
            }
            let lesson = this.lessons[lessonID];
            let currentRecord = {};
            if (lesson != null) {
              currentRecord = lesson.record ?? {};
              if (body.lesson == null) {
                objectUpdate(body, lesson);
                if (this.currentLessonFrame != null) {
                  this.currentLessonFrame.updateTile(null, lesson);
                }
              }
            } else if (body.lesson != null) {
              this.lessons[lessonID] = body.lesson;
              lesson = this.lessons[lessonID];
            } else {
              lesson = {};
            }
            if (record._id != null) {
              lesson.record = record;
            }

            // Add new lessons to dashboard:
            let sections = body.sections ?? [];
            if (body.folder != null) {
              sections.push("folder");
            }
            if (sections.length > 0) {
              let time = this.checkTime(this.sort, { ...lesson, ...record });
              for (let i = 0; i < sections.length; i++) {
                let section = sections[i];
                if (section == "folder") {
                  section = record.folder;
                }
                if (this.isFolderID(section) == true) {
                  let folder = this.folders[section];
                  if (folder != null) {
                    objectUpdate(body.folder, folder.render);
                  } else if (body.folder != null) {
                    this.folders[section] = { render: body.folder, folders: [] };
                  }
                }
                let sectionRecords = this.records[section];
                if (sectionRecords == null) {
                  this.records[section] = [];
                  sectionRecords = this.records[section];
                }
                let insertAt = 0;
                for (let r = 0; r < sectionRecords.length; r++) {
                  let checkID = sectionRecords[r];
                  let checkTime = this.checkTime(this.sort, this.lessons[checkID.split("_")[0]] ?? {});
                  if (checkTime > time) {
                    insertAt = r + 1;
                  }
                  if (checkID == record._id) {
                    sectionRecords.splice(r, 1);
                    r--;
                  }
                }
                sectionRecords.splice(insertAt, 0, record._id);
                if (this.sort == section && this.currentLessonFrame != null) {
                  this.currentLessonFrame.addTile(record, lesson, true);
                  this.currentLessonFrame.checkNoLessons();
                }
              }
              this.updateSubscribe();
            }

            // Handle adding or moving folder tiles:
            if (body.hasOwnProperty("folder") == true) {
              if (currentRecord.folder != null) {
                let existingSectionRecord = this.records[currentRecord.folder];
                if (existingSectionRecord != null) {
                  let recordIndex = existingSectionRecord.indexOf(currentRecord._id);
                  if (recordIndex > -1) {
                    existingSectionRecord.splice(recordIndex, 1);
                  }
                  if (this.sort == currentRecord.folder && this.currentLessonFrame != null) {
                    this.currentLessonFrame.removeTile(lessonID);
                    this.currentLessonFrame.checkNoLessons();
                  }
                }
              }
              this.updateFolderOrder(record.folder);
            }
            break;
          }
          case "remove": {
            if (this.lessons[body.lesson] != null) {
              delete this.lessons[body.lesson];
              if (this.currentLessonFrame != null) {
                this.currentLessonFrame.removeTile(body.lesson);
                this.currentLessonFrame.checkNoLessons();
              }
            }
            // Potentially find a way to remove lessonIDs from records?
            break;
          }
          case "newfolder": {
            let folder = this.folders[body._id];
            if (folder != null) {
              return;
            }
            this.folders[body._id] = { render: body, folders: [] };
            if (body.parent == null) {
              this.addFolderTile(this.folders[body._id], true);
            } else {
              let parentFolder = this.folders[body.parent];
              if (parentFolder != null && parentFolder.folders != null) {
                parentFolder.folders.unshift(body._id);
              }
              if (parentFolder.element != null && parentFolder.element.hasAttribute("opened") == true) {
                this.addFolderTile(this.folders[body._id], true);
              }
            }
            break;
          }
          case "folderupdate": {
            let folder = this.folders[body._id] ?? {};
            if (folder.render == null) {
              return;
            }
            let parentID = folder.render.parent;
            objectUpdate(body, folder.render);
            if (this.sort == body._id) {
              if (body.hasOwnProperty("name") == true) {
                let folderName = this.titleHolder.querySelector("div[title]");
                let name = folder.render.name ?? "Untitled Folder";
                folderName.textContent = name;
                folderName.title = name;
              }
              if (body.hasOwnProperty("color") == true) {
                let folderInfo = this.titleHolder.querySelector(".dFolderInfo");
                let setColor = "var(--theme)";
                if (body.color != null) {
                  setColor = "#" + body.color;
                }
                folderInfo.style.setProperty("--themeColor", setColor);
              }
            }
            if (body.hasOwnProperty("parent") == false) {
              this.updateFolderTile(folder);
            } else {
              let previousParentFolder = this.folders[parentID];
              if (previousParentFolder != null && previousParentFolder.folders != null) {
                let folderIndex = previousParentFolder.folders.indexOf(body._id);
                if (folderIndex > -1) {
                  previousParentFolder.folders.splice(folderIndex, 1);
                }
              }
              this.updateFolderOrder(body._id);
            }
            break;
          }
          case "folderremove": {
            let folder = this.folders[body._id] ?? {};
            if (folder.render == null) {
              return;
            }
            let parentFolder = this.folders[folder.render.parent];
            if (parentFolder != null && parentFolder.folders != null) {
              let folderIndex = parentFolder.folders.indexOf(body._id);
              if (folderIndex > -1) {
                parentFolder.folders.splice(folderIndex, 1);
              }
            }
            this.removeFolder(folder);
            if (this.sort == body._id) {
              if (parentFolder != null && parentFolder.element != null) {
                parentFolder.element.setAttribute("selected", "");
                this.changeSort(parentFolder.render._id);
              } else {
                let recentSort = this.sidebar.querySelector('.dSidebarSort[sort="recent"]');
                recentSort.setAttribute("selected", "");
                this.changeSort("recent");
              }
            }
          }
        }
      });
    }
  }

  dragContext = {};
  dragStart(event) {
    this.dragContext = {};
    let target = event.target;
    let pageRect = this.dashboard.getBoundingClientRect();
    let mouseX = (event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0) - pageRect.x;
    let mouseY = (event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0) - pageRect.y;
    let folder = target.closest(".dSidebarFolder");
    if (folder != null && folder.hasAttribute("folderid") == true) {
      this.dragContext = {
        originalElement: folder,
        width: folder.clientWidth, //sidebar.clientWidth - 16
        height: folder.clientHeight - 8,
        startX: mouseX,
        startY: mouseY
      };
    }
    let tile = target.closest(".dTile");
    if (tile == null) {
      return;
    }
    if (target.closest(".dTileOptions") == null && target.closest(".dTileTitle[contenteditable]") == null) {
      tile.style.removeProperty("transform");
    } else {
      tile.style.transform = "scale(1)";
      return;
    }
    let holder = tile.querySelector(".dTileInfoHolder");
    if (holder != null) {
      this.dragContext = {
        originalElement: holder,
        width: holder.clientWidth,
        height: holder.clientHeight,
        startX: mouseX,
        startY: mouseY
      };
    }
  }
  removeDrag(moved) {
    this.dashboard.style.removeProperty("user-select");
    this.dashboard.style.removeProperty("webkit-user-select");
    let removeElement = this.dragContext.element;
    if (removeElement == null) {
      return;
    }
    if (this.dragContext.originalElement != null) {
      let button = this.dragContext.originalElement.closest(".dTile, .dSidebarFolderParent");
      let pageRect = this.dashboard.getBoundingClientRect();
      let originalRect = this.dragContext.originalElement.getBoundingClientRect();
      if (moved != true) {
        removeElement.style.transform = "translate(" + (originalRect.x - pageRect.x - this.dragContext.lastX + 8) + "px, " + (originalRect.y - pageRect.y - this.dragContext.lastY + 8) + "px) scale(.975)";
      }
      (async () => {
        await sleep(100);
        if (button != null) {
          button.removeAttribute("disabled");
        }
      })();
    } else {
      removeElement.style.transform = "translate(0px, 0px) scale(0)";
    }
    removeElement.style.opacity = 0;
    (async () => {
      await sleep(200);
      if (removeElement != null) {
        removeElement.remove();
      }
    })();
    this.dragContext = {};
  }
  dragMove(event) {
    if (this.dragContext.originalElement == null) {
      return this.removeDrag();
    }
    if (mouseDown() == false) {
      return this.removeDrag();
    }
    let pageRect = this.dashboard.getBoundingClientRect();
    let mouseX = (event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0) - pageRect.x;
    let mouseY = (event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0) - pageRect.y;
    this.dragContext.lastX = mouseX;
    this.dragContext.lastY = mouseY;
    if (this.dragContext.enabled != true) {
      if (Math.abs(mouseX - this.dragContext.startX) > 5 || Math.abs(mouseY - this.dragContext.startY) > 5) {
        this.dragContext.enabled = true;
        this.dragContext.element = this.dragContext.originalElement.cloneNode(true);
        this.dragContext.element.style.position = "absolute";
        this.dragContext.element.style.width = this.dragContext.width + "px";
        this.dragContext.element.style.height = this.dragContext.height + "px";
        if (this.dragContext.element.className == "dTileInfoHolder") {
          this.dragContext.element.style.setProperty("--themeColor", "var(--theme)");
        }
        this.dragContext.element.style.background = "var(--pageColor)";
        this.dragContext.element.style.boxShadow = "var(--lightShadow)";
        this.dragContext.element.style.borderRadius = "12px";
        this.dragContext.element.style.zIndex = 10;
        this.dragContext.element.style.pointerEvents = "none";
        let originalRect = this.dragContext.originalElement.getBoundingClientRect();
        this.dragContext.element.style.transform = "translate(" + (originalRect.x - pageRect.x - mouseX) + "px, " + (originalRect.y - pageRect.y - mouseY) + "px) scale(.975)";
        this.dragContext.element.style.transformOrigin = "0 0";
        this.dragContext.element.style.opacity = 0;
        this.dragContext.element.style.transition = "transform .3s, opacity .2s";
        this.dashboard.appendChild(this.dragContext.element);
        this.dragContext.originalElement.closest(".dTile, .dSidebarFolderParent").setAttribute("disabled", "");
        this.dragContext.element.offsetHeight;
        this.dragContext.element.style.transform = "translate(0px, 0px) scale(.975)";
        this.dragContext.element.style.opacity = 1;
        this.openSidebar();
        this.dashboard.style.userSelect = "none";
        this.dashboard.style.webkitUserSelect = "none";
      } else {
        return;
      }
    }
    if (this.dragContext.element == null) {
      return;
    }
    this.dragContext.element.style.left = (mouseX - 8) + "px";
    this.dragContext.element.style.top = (mouseY - 8) + "px";
  }
  async dragEnd(event) {
    if (this.dragContext.enabled != true || this.dragContext.originalElement == null) {
      return this.removeDrag();
    }
    let target = document.elementFromPoint(
      event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0,
      event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0
    );
    let originalButton = this.dragContext.originalElement.closest("a");
    let originalButtonDisable = this.dragContext.originalElement.closest(".dTile, .dSidebarFolderParent");
    let parentFolder = target.closest(".dSidebarFolder[folderid]");
    if (parentFolder != null) {
      this.dragContext.originalElement = null;
      this.removeDrag();
      if (originalButton.hasAttribute("lesson") == true) {
        let parentID = parentFolder.getAttribute("folderid");
        let lessonID = originalButton.getAttribute("lesson");
        let lesson = this.lessons[lessonID];
        if (lesson.record == null || lesson.record.folder != parentID) { // MOVING LESSON INTO FOLDER:
          let [code] = await sendRequest("POST", "lessons/folders/move?parent=" + parentID + "&lesson=" + lessonID);
          if (code == 200) {
            alert.open("worked", "<b>Moved Lesson</b><div>The lesson has been moved into the folder.");
          }
        }
      } else if (originalButton.hasAttribute("folderid") == true) {
        let parentID = parentFolder.getAttribute("folderid");
        let folderID = originalButton.getAttribute("folderid");
        let folder = this.folders[folderID] ?? {};
        if ((folder.render ?? {}).parent != parentID) { // MOVING FOLDER INTO FOLDER:
          let [code] = await sendRequest("POST", "lessons/folders/move?parent=" + parentID + "&folder=" + folderID);
          if (code == 200) {
            alert.open("worked", "<b>Moved Folder</b><div>The folder has been moved into another folder.");
          }
        }
      }
      if (originalButtonDisable != null) {
        originalButtonDisable.removeAttribute("disabled");
      }
      return;
    }
    if (originalButton.hasAttribute("lesson") == true && target.closest(".dSidebarSorts") != null) {
      this.dragContext.originalElement = null;
      this.removeDrag();
      if (originalButton.hasAttribute("lesson") == true) {
        let lessonID = originalButton.getAttribute("lesson");
        let lesson = this.lessons[lessonID];
        if (lesson.record != null && lesson.record.folder != null) { // MOVING LESSON FROM FOLDER:
          let [code] = await sendRequest("POST", "lessons/folders/movefrom?lesson=" + lessonID);
          if (code == 200) {
            alert.open("worked", "<b>Moved Lesson</b><div>The lesson has been removed from the folder.");
          }
        }
      }
      if (originalButtonDisable != null) {
        originalButtonDisable.removeAttribute("disabled");
      }
      return;
    }
    if (originalButton.hasAttribute("folderid") == true && target.closest(".dSidebar") != null && target.closest(".dSidebarFolderParent") == null) {
      this.dragContext.originalElement = null;
      this.removeDrag();
      let folderID = originalButton.getAttribute("folderid");
      let folder = this.folders[folderID] ?? {};
      if ((folder.render ?? {}).parent != null) { // MOVING FOLDER FROM FOLDER:
        let [code] = await sendRequest("POST", "lessons/folders/movefrom?folder=" + folderID);
        if (code == 200) {
          alert.open("worked", "<b>Moved Folder</b><div>The folder has been removed from the parent folder.");
        }
      }
      if (originalButtonDisable != null) {
        originalButtonDisable.removeAttribute("disabled");
      }
      return;
    }
    this.removeDrag();
  }

  async js(page) {
    this.dashboardHolder = page.querySelector(".dPageHolder");
    this.dashboard = this.dashboardHolder.querySelector(".dPage");

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
    this.loadMoreFoldersButton = this.sidebar.querySelector(".dTileDropFoldersLoadMore button");
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

      this.updateAlert.style.display = "flex";
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
      if (this.isFolderID(this.sort) == true) {
        params["folder"] = this.sort;
      }
      setPage("pages/app/lesson", { params: params });
    });
    this.newBreakoutLessonButton.addEventListener("click", (event) => {
      event.preventDefault();
      let params = { type: "breakout" };
      if (this.isFolderID(this.sort) == true) {
        params["folder"] = this.sort;
      }
      setPage("pages/app/lesson", { params: params });
    });

    // Sidebar new folder button:
    this.newFolderButton.addEventListener("click", () => {
      this.newFolderButton.setAttribute("disabled", "");

      let parent = null;
      let currentSelected = this.sidebar.querySelector(".dSidebarFolder[selected][opened]");
      if (currentSelected != null) {
        parent = currentSelected.getAttribute("folderid");
      }

      let newFolderTile = this.addFolderTile({ render: { _id: "new", parent } }, true);

      let folderName = newFolderTile.element.querySelector(".dSidebarFolderName");
      folderName.setAttribute("contenteditable", "");
      let keyDownListener = (event) => {
        if (event.keyCode == 13) {
          event.preventDefault();
          return folderName.blur();
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
        
        let name = folderName.textContent.substring(0, 30).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
        if (name.replace(/ /g, "").length < 1) {
          newFolderTile.parentElement.remove();
          this.newFolderButton.removeAttribute("disabled");
          return this.updateScrollShadows();
        }

        newFolderTile.parentElement.setAttribute("disabled", "");
        folderName.textContent = name;
        folderName.title = name;
        let folderBody = { name };
        if (parent != null) {
          folderBody.parent = parent;
        }
        let [code, body] = await sendRequest("POST", "lessons/folders/new", folderBody);
        if (code != 200) {
          newFolderTile.parentElement.remove();
          this.newFolderButton.removeAttribute("disabled");
          return this.updateScrollShadows();
        }

        let existingFolderElement = (this.folders[body.folder] ?? {}).element;
        if (existingFolderElement != null) {
          this.unselectSort();
          existingFolderElement.setAttribute("selected", "");
          this.changeSort(body.folder);
          this.newFolderButton.removeAttribute("disabled");
          return newFolderTile.parentElement.remove();
        }

        let timestamp = getEpoch(); // Just temporary, gets updated by socket
        this.folders[body.folder] = {
          ...newFolderTile,
          render: {
            ...folderBody,
            _id: body.folder,
            created: timestamp,
            opened: timestamp
          },
          folders: [],
        };
        if (parent != null) {
          this.folders[parent].folders.unshift(body.folder);
        }
        
        newFolderTile.parentElement.removeAttribute("disabled");

        newFolderTile.element.setAttribute("folderid", body.folder);
        newFolderTile.element.setAttribute("opened", "");

        this.unselectSort();
        newFolderTile.element.setAttribute("selected", "");
        this.changeSort(body.folder);

        this.newFolderButton.removeAttribute("disabled");
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

    // Action content hover listener:
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches == true) {
      this.addEventListener(window, "mousemove", (event) => {
        let target = event.target;
        if (this.actionContent != null) {
          if (
            target == null
            || (
              target.closest(".dSidebarActions, .dSidebarActionContainer") == null
              && target.classList.contains("dSidebar") == false
            )
            ) {
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

    // Sidebar click listener:
    this.sidebar.addEventListener("click", async ({ target }) => {
      if (target == null) {
        return;
      }
      let button = target.closest("button, a");
      if (button == null) {
        return;
      }

      let sort = button.getAttribute("sort") ?? button.getAttribute("folderid");
      if (sort != null) {
        this.unselectSort();
        button.setAttribute("selected", "");
        this.searchInput.value = "";

        let sameSort = (this.sort == sort);

        button.setAttribute("disabled", "");
        await this.changeSort(sort);
        
        if (button != null) {
          if (this.isFolderID(this.sort) == true) {
            let folderData = this.folders[this.sort];
            if (folderData != null) {
              if (button.hasAttribute("opened") == false) {
                button.setAttribute("opened", "");
                for (let i = 0; i < folderData.folders.length; i++) {
                  this.addFolderTile(this.folders[folderData.folders[i]]);
                }
                if (folderData.loaded != true) {
                  button.parentElement.insertAdjacentHTML("beforeend", `<div class="dTileDropFoldersLoadMore"><button class="buttonAnim border">View More</button></div>`);
                }
              } else if (sameSort == true) {
                button.removeAttribute("opened", "");
                for (let i = 0; i < folderData.folders.length; i++) {
                  this.removeFolderTile(this.folders[folderData.folders[i]]);
                }
              }
            }
            this.updateScrollShadows();
          }

          button.removeAttribute("disabled");
        }

        return;
      }

      let loadMoreFolders = target.closest(".dTileDropFoldersLoadMore button");
      if (loadMoreFolders != null) {
        let parentFolder = loadMoreFolders.closest(".dSidebarFolderParent");
        let isChildFolder = parentFolder != null;
        loadMoreFolders.setAttribute("disabled", "");
        let path = "lessons/folders";
        let parentFolderID;
        if (parentFolder != null) {
          parentFolderID = parentFolder.firstElementChild.getAttribute("folderid");
          path += "?parent=" + parentFolderID;
          let parentFolderData = this.folders[parentFolderID];
          if (parentFolderData != null) {
            let lastFolderData = this.folders[parentFolderData.folders[parentFolderData.folders.length - 1]];
            if (lastFolderData != null) {
              let opened = (lastFolderData.render ?? {}).opened;
              if (opened != null) {
                path += "&before=" + opened;
              }
            }
          }
        } else {
          let lastFolder = this.folderHolder.lastElementChild;
          if (lastFolder != null) {
            let lastFolderData = this.folders[lastFolder.querySelector(".dSidebarFolder").getAttribute("folderid")];
            if (lastFolderData != null) {
              let opened = (lastFolderData.render ?? {}).opened;
              if (opened != null) {
                path += "?before=" + opened;
              }
            }
          }
        }
        let [code, body] = await sendRequest("GET", path);
        loadMoreFolders.removeAttribute("disabled");
        if (code == 200) {
          if (parentFolderID != null) {
            let parentFolderData = this.folders[parentFolderID];
            if (parentFolderData != null) {
              let folderOpened = false;
              if (parentFolder != null) {
                let folderElement = parentFolder.firstElementChild;
                if (folderElement != null) {
                  folderOpened = folderElement.hasAttribute("opened");
                }
              }
              for (let i = 0; i < body.folders.length; i++) {
                let folder = body.folders[i];
                this.folders[folder._id] = { render: folder, folders: [] };
                parentFolderData.folders.push(folder._id);
                if (folderOpened == true) {
                  this.addFolderTile(this.folders[folder._id]);
                }
              }
              if (body.folders.length >= this.loadAmount) {
                parentFolder.appendChild(loadMoreFolders.parentElement);
              } else {
                parentFolderData.loaded = true;
                loadMoreFolders.parentElement.remove();
              }
            }
          } else {
            for (let i = 0; i < body.folders.length; i++) {
              let folder = body.folders[i];
              this.folders[folder._id] = { render: folder, folders: [] };
              this.addFolderTile(this.folders[folder._id]);
            }
            if (body.folders.length < this.loadAmount) {
              this.loadMoreFoldersButton.style.removeProperty("display");
            }
          }
          this.updateScrollShadows();
        }

        return;
      }
    });

    // Search bar listener:
    this.searchInput.addEventListener("input", () => {
      this.unselectSort();

      let search = this.searchInput.value;
      if (search == "") {
        this.currentLessonFrame = null;
        
        let button = this.sidebar.querySelector('.dSidebarSort[sort="recent"]');
        button.setAttribute("selected", "");
        return this.changeSort("recent");
      }

      this.currentLessonFrame = null;
      this.tileHolder.innerHTML = "";
      return this.changeSort("search", { search, refresh: true });
    });

    // Tile click listener:
    this.lessonsHolder.addEventListener("click", async ({ target }) => {
      this.closeSidebar();

      let tile = target.closest(".dTile");
      if (tile != null) {
        event.preventDefault();

        let optionButton = target.closest(".dTileOptions");
        if (optionButton != null) {
          return dropdown.open(optionButton, LessonOptions, {
            parent: this,
            tile,
            lessonID: tile.getAttribute("lesson"),
            lessons: this.lessons
          });
        }

        let lessonTitle = target.closest(".dTileTitle[contenteditable]");
        if (lessonTitle != null) {
          return;
        }
        if (tile.hasAttribute("join")) {
          let method = tile.getAttribute("join");
          if (method.startsWith("pin_")) {
            return setPage("pages/app/join", { params: { pin: method.substring(4) }});
          } else if (method == "link") {
            return setPage("pages/app/join", { params: { lesson: tile.getAttribute("lesson") } });
          }
        }
        setPage("pages/app/lesson", { params: { lesson: tile.getAttribute("lesson") } });
      }
    });

    // Tile right click listener:
    this.lessonsHolder.addEventListener("contextmenu", ({ target }) => {
      let tile = target.closest(".dTile");
      if (tile != null) {
        event.preventDefault();
        dropdown.open(tile.querySelector(".dTileOptions"), LessonOptions, {
          parent: this,
          tile,
          lessonID: tile.getAttribute("lesson"),
          lessons: this.lessons
        });
      }
    });

    // Drag and drop listeners:
    page.addEventListener("mousedown", (event) => { this.dragStart(event); });
    this.addEventListener(window, "mousemove", (event) => { this.dragMove(event); });
    this.addEventListener(window, "pointerup", (event) => {
      if (event.pointerType == "mouse") {
        this.dragEnd(event);
      }
    });

    // Load lessons and folders:
    /*let path = "lessons";
    if (window.previousLessonSession != null) {
      path += "?leave=" + window.previousLessonSession;
      delete window.previousLessonSession;
    }*/
    let [code, body] = await sendRequest("GET", "lessons");
    if (code != 200) {
      return;
    }

    for (let i = 0; i < body.folders.length; i++) {
      let folder = body.folders[i];
      this.folders[folder._id] = { render: folder, folders: [] };
      this.addFolderTile(this.folders[folder._id]);
    }
    if (body.folders.length >= this.loadAmount) {
      this.loadMoreFoldersButton.style.display = "flex";
    }

    for (let i = 0; i < body.lessons.length; i++) {
      let lesson = body.lessons[i];
      this.lessons[lesson._id] = lesson;
    }
    this.addRecords(this.records.recent, body.recent);
    this.addRecords(this.records.shared, body.shared);
    this.addRecords(this.records.owned, body.owned);
    this.addRecords(this.records.newest, body.newest);

    this.changeSort("recent");

    this.updateAlert.removeAttribute("closed");

    this.updateResize();
  }
}