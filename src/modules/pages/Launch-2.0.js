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
  cleanString,
  uncleanString,
  hash,
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

import { Frame as TopbarFrame } from "../marketing/topbar/TopBar";

export class Page extends PageFrame {
  html = `
  <div class="interface" showoverlay->
    <div class="interfaceSide"></div>
    <div class="interfaceCenter">
      <div class="topbarHolder"></div>
      <svg class="overlay" width="100%" height="100%">
        <defs>
          <mask id="launch-overlay-frame-mask">
            <rect width="100%" height="100%" fill="white" />
            <rect 
              x="8" 
              y="8" 
              width="calc(100% - 16px)" 
              height="calc(100% - 16px)" 
              rx="12" 
              fill="black" 
            />
          </mask>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill="var(--pageColor)" 
          mask="url(#launch-overlay-frame-mask)"
        />
      </svg>
    </div>
    <div class="interfaceSide"></div>
  </div>
  <div class="container" style="background: linear-gradient(45deg, black, transparent)"></div>
  `;
  css = {
    ".interface": `position: fixed; display: flex; width: 100%; height: 100%; left: 0; top: 0; pointer-events: none; user-select: none; z-index: 2`,
    ".interfaceSide": `flex: 1`,
    ".interfaceCenter": `position: relative; width: 100%; max-width: 1200px`,
    ".topbarHolder": `position: absolute; width: calc(100% - 16px); height: calc(100% - 16px); left: 8px; top: 8px; z-index: 2`,
    ".overlay": `position: absolute; display: none; inset: 0; width: 100%; height: 100%; left: 0; top: 0; z-index: 1`,
    ".interface[showoverlay] .interfaceSide": `background: var(--pageColor)`,
    ".interface[showoverlay] .topbarHolder": `box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`,
    ".interface[showoverlay] .overlay": `display: block`,
    ".interface:not([showoverlay]) .topbarTopSection, .interface:not([showoverlay]) .topbarTop": `border-radius: 12px !important`,

    ".container": `height: 1000px; z-index: 1`,
  };

  async js(page) {
    this.interface = page.querySelector(".interface");
    this.topbarHolder = this.interface.querySelector(".topbarHolder");

    // Set topbar:
    this.topbar = await this.setFrame(TopbarFrame, this.topbarHolder);

    // Events:
    this.addEventListener(window, "resize", () => {
      if (this.topbar != null) {
        this.topbar.update();
      }
    });
  }
}