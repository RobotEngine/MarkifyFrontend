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
  getParam,
  modifyParams,
  getEpoch,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  getObject,
  copyObject,
  objectUpdate,
  getTheme,
  textBoxError
} from "@/crucial";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import boardLogoIcon from "@assets/icon.svg?raw";
import undoIcon from "@assets/lesson/history/undo.svg?raw";
import redoIcon from "@assets/lesson/history/redo.svg?raw";
import fullStatusIcon from "@assets/lesson/status/full.svg?raw";
import weakStatusIcon from "@assets/lesson/status/weak.svg?raw";
import noneStatusIcon from "@assets/lesson/status/none.svg?raw";
import increasePageIcon from "@assets/lesson/navigation/plus.svg?raw";
import decreasePageIcon from "@assets/lesson/navigation/minus.svg?raw";
import { close as closeIcon } from "@modules/utility/core-icons";

export class Page {
  html = `
  <div class="brtInterface customScroll">
    <div class="brtTopHolder">
      <button class="brtTopScroll" left style="left: 7px">${leftArrowIcon}</button>
      <button class="brtTopScroll" right style="right: 7px">${rightArrowIcon}</button>
      <div class="brtTop">
        <div class="brtTopSection" left>
          <a class="brtClose">${closeIcon}</a>
          <div class="brtFileNameHolder border"><div class="brtFileName" spellcheck="false" contenteditable></div></div>
          <button class="brtFileDropdown">File</button>
          <div class="brtTopDivider"></div>
          <button class="brtSaveProgress brtUndo" disabled>${undoIcon}</button>
          <button class="brtSaveProgress brtRedo" disabled>${redoIcon}</button>
          <div class="brtStatusHolder"><div class="brtStatus">
            <div strength="3" title="Strong Connection | All features seamlessly synced to the cloud.">${fullStatusIcon}</div>
            <div strength="2" title="Weak Connection | Cloud-saved annotations, limited real-time features.">${weakStatusIcon}</div>
            <div strength="1" title="No Connection | Changes stored on-device, synced to cloud upon reconnecting.">${noneStatusIcon}</div>
          </div></div>
        </div>
        <div class="brtTopSection" scroll>
          <div class="brtTopDivider"></div>
        </div>
        <div class="brtTopSection" right>
          <button class="brtFinish">Finish Template</button>
          <div class="brtTopDivider"></div>
          <button class="brtZoom">100%</button>
          <button class="brtAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
        </div>
      </div>
    </div>
    <div class="brtToolbarHolder eToolbarHolder" toolbarholder hidden>
      <div class="brtToolbar eToolbar" editor keeptooltip notransition></div>
    </div>
    <div class="brtBottomHolder">
      <div class="brtBottom">
      <div class="brtBottomSection" board title="Open Markify Board" new><button class="brtBoardOpen">${boardLogoIcon}</button></div>
        <div class="brtBottomSectionSpacer"></div>
        <div class="brtBottomSection" right>
          <button class="brtPageNav" down>${increasePageIcon}</button>
          <div class="brtCurrentPage border" contenteditable></div>
          <button class="brtPageNav" up>${decreasePageIcon}</button>
        </div>
      </div>
    </div>
  </div>
  <div class="brtContentHolder customScroll" disabled></div>
  `;

  css = {
    ".brtInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; transform: translateZ(0); visibility: hidden; pointer-events: none; user-select: none; overflow: scroll; z-index: 2`,
    ".brtContentHolder": `position: relative; width: 100%; height: 100%; background: var(--pageColor); contain: strict; overflow: scroll; z-index: 1; transition: .5s`,
    
    ".brtTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brtTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".brtTopHolder[scroll] .brtTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brtTop::-webkit-scrollbar": `display: none`,
    ".brtTopSection[scroll]": `display: none`,
    ".brtTopHolder[scroll] .brtTopSection[scroll]": `display: flex !important`,
    ".brtTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".brtTopScroll svg": `width: 22px`,
    ".brtTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".brtTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brtTopHolder[scroll] .brtTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".brtTopSection[left]": `border-bottom-right-radius: 12px`,
    ".brtTopSection[right]": `border-bottom-left-radius: 12px`,

    ".brtClose": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".brtClose:hover": `background: var(--hover)`,
    ".brtClose svg": `width: 24px; height: 24px; transition: .2s`,
    ".brtClose:hover svg": `transform: scale(.9)`,
    ".brtFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".brtFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".brtFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".brtFileName::-webkit-scrollbar": `display: none`,
    ".brtFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brtTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".brtSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".brtSaveProgress svg": `width: 24px; height: 24px; margin: 2px`,
    ".brtUndo": `margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px`,
    ".brtRedo": `margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0`,
    ".brtStatusHolder": `display: flex; width: 32px; height: 32px; margin: 4px; justify-content: center; align-items: center`,
    ".brtStatus": `position: relative; width: 100%; height: 100%; transform: scale(.9)`,
    ".brtStatus > div": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; transition: .4s`,
    ".brtStatus svg *": `transform-origin: center; transition: .4s`,
    ".brtStatus[saving] [saved]": `opacity: 0`,
    ".brtStatus:not([saving]) [saving]": `opacity: 0`,
    ".brtStatus:not([saving]) [animation]": `animation-play-state: paused`,
    ".brtStatus [animation]": `animation: brtStatusSpinAnimation 2s linear infinite`,
    "@keyframes brtStatusSpinAnimation": `from { transform: rotate(0deg) } to { transform: rotate(360deg) }`,

    ".brtFinish": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; align-items: center; font-size: 16px; font-weight: 600`,
    ".brtZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brtAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".brtAccount img": `width: 100%; height: 100%; object-fit: cover`,
    
    ".brtToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".brtBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brtBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".brtBottom::-webkit-scrollbar": `display: none`,
    ".brtBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".brtBottomSection[hidden]": `display: none`,
    ".brtBottomSection:first-child": `border-top-left-radius: 0`,
    ".brtBottomSection:last-child": `border-top-right-radius: 0`,
    ".brtBottomSectionSpacer": `flex: 1`,
    ".brtPageNav": `display: flex; width: 32px; height: 32px; padding: 6px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".brtPageNav svg": `width: 100%; height: 100%`,
    ".brtCurrentPage": `min-width: 8px; max-height: 24px; padding: 4px 0; margin: 0 6px; font-size: 20px; outline: unset`,
    ".brtCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 12px`,
    ".brtBottomSection[board]": `box-shadow: var(--boardLightShadow)`,
    ".brtBottomSection[board] button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".brtBottomSection[board] button:hover": `background: var(--boardHover)`,
    ".brtBottomSection[board] button svg": `width: 32px; height: 32px; transition: .2s`,
    ".brtBottomSection[board] button:hover svg": `transform: scale(.9)`
  };

  async js(frame, extra = {}) {
    
  }
}