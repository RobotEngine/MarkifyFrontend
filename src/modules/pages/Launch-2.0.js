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

import { Pipeline } from "@modules/editor/Pipeline";

import { Frame as TopbarFrame } from "../marketing/topbar/Topbar";

import "@fontsource-variable/playpen-sans";

// Static import the first section since it's required to see the page:
import { Frame as ShowcaseSection } from "../marketing/launch/sections/Showcase";

export class Page extends PageFrame {
  sections = [
    ShowcaseSection,
    import("../marketing/launch/sections/Purpose"),
    import("../marketing/launch/sections/Features"),
    import("../marketing/launch/sections/Testimonials"),
    import("../marketing/launch/sections/Trust"),
    import("../marketing/launch/sections/CallToAction")
  ];

  html = `
  <div class="page">
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
    <div class="container"></div>
  </div>
  `;
  css = {
    ".page": `--maxContentWidth: 1200px; --scrollOffset: 66px; --playfulFont: "Playpen Sans Variable", sans-serif; position: relative; width: 100%; height: fit-content; min-height: 100vh; min-height: 100dvh`,
    ".interface": `position: fixed; display: flex; width: 100%; height: 100%; left: 0; top: 0; pointer-events: none; user-select: none; z-index: 2`,
    ".interfaceSide": `flex: 1`,
    ".interfaceCenter": `position: relative; width: 100%; max-width: var(--maxContentWidth)`,
    ".topbarHolder": `position: absolute; width: calc(100% - 16px); height: calc(100% - 16px); left: 8px; top: 8px; z-index: 2`,
    ".overlay": `position: absolute; display: none; inset: 0; width: 100%; height: 100%; left: 0; top: 0; z-index: 1`,
    ".interface[showoverlay] .interfaceSide": `background: var(--pageColor)`,
    ".interface[showoverlay] .topbarHolder": `box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`,
    ".interface[showoverlay] .overlay": `display: block`,
    ".interface:not([showoverlay]) .topbarTopSection, .interface:not([showoverlay]) .topbarTop": `border-radius: 12px !important`,

    ".container": `position: relative; width: 100%; height: fit-content; z-index: 1`,
    ".section": `position: relative; width: 100%`
  };

  loadedSections = [];
  async js(page) {
    this.pipeline = new Pipeline;

    this.interface = page.querySelector(".interface");
    this.topbarHolder = this.interface.querySelector(".topbarHolder");

    this.container = page.querySelector(".container");

    // Load sections:
    for (let i = 0; i < this.sections.length; i++) {
      let newSection = document.createElement("div");
      newSection.className = "section";
      this.container.appendChild(newSection);
      this.setFrame(this.sections[i], newSection);
    }

    // Set topbar:
    this.topbar = await this.setFrame(TopbarFrame, this.topbarHolder);

    // Events:
    this.addEventListener(window, "resize", (event) => {
      if (this.topbar != null) {
        this.topbar.update();
      }
      this.pipeline.publish("resize", { event });
      this.pipeline.publish("bounds_change", { type: "scroll", event });
    });
    this.addEventListener(window, "scroll", (event) => {
      this.pipeline.publish("scroll", { event });
      this.pipeline.publish("bounds_change", { type: "scroll", event });
    });
    this.addEventListener(window, "pointermove", (event) => {
      this.pipeline.publish("pointermove", { event });
      this.pipeline.publish("click_move", { type: "pointermove", event });
    }, { passive: false });
    this.addEventListener(window, "touchmove", (event) => {
      this.pipeline.publish("touchmove", { event });
    }, { passive: false });
    this.addEventListener(window, "pointerup", (event) => {
      this.pipeline.publish("pointerup", { event });
      this.pipeline.publish("click_end", { type: "pointerup", event });
    }, { passive: false });
    this.addEventListener(window, "touchend", (event) => {
      this.pipeline.publish("touchend", { event });
    }, { passive: false });
  }
}