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

import { Pipeline } from "@modules/editor/Pipeline";

const breakoutPages = changeGlobalImports(import.meta.glob("@modules/lesson/breakout/pages/**/*.js"));
const breakoutPagesPath = "/src/modules/lesson/breakout/pages/";

export class Page {
  constructor() {
    this.pipeline = new Pipeline(this.pages);
  }
  
  html = ``;
  css = {
    ".brPage": `position: absolute; display: block; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 2; pointer-events: all; transition: .2s`,
    ".brPage[hidden]": `z-index: 1`,
  };

  pages = {};
  async openPage(id, path, extra = {}) { // primary, secondary, tertiary
    let otherPages = this.frame.querySelectorAll(".brPage:not([hidden])");
    for (let i = 0; i < otherPages.length; i++) {
      let otherPage = otherPages[i];
      if (otherPage.getAttribute("pageid") != id || otherPage.getAttribute("path") != path) {
        otherPage.setAttribute("hidden", "");
      }
    }

    this.currentPage = id;
    this.currentPagePath = path;
    
    let existingPage = this.frame.querySelector('.brPage[pageid="' + id + '"][path="' + path + '"]:not([closing])');
    if (existingPage != null) {
      existingPage.removeAttribute("hidden");
      let page = this.pages[id];
      if ((page ?? {}).onOpen != null) {
        page.onOpen();
      }
      return page;
    }

    this.closePage(id);

    this.frame.insertAdjacentHTML("beforeend", `<div class="brPage" new></div>`);
    let newPage = this.frame.querySelector(".brPage[new]");
    newPage.removeAttribute("new");
    newPage.setAttribute("pageid", id);
    newPage.setAttribute("path", path);

    this.pages[id] = await this.setFrame(new Promise(async (resolve) => {
      let loadModuleFunction = breakoutPages[breakoutPagesPath + path + ".js"];
      if (loadModuleFunction == null) {
        return resolve();
      }
      return resolve(((await loadModuleFunction()) ?? {}).Page);
    }), newPage, {
      ...extra,
      // showLoading: false
      construct: {
        pageID: id,
        pagePath: path,
        ...(extra.construct ?? {})
      }
    });
    let page = this.pages[id];
    if ((page ?? {}).onOpen != null) {
      page.onOpen();
    }
    return page;
  }
  closePage(id) {
    if (this.currentPage == id) {
      this.currentPage = null;
    }
    if (this.currentPagePath == id) {
      this.currentPagePath = null;
    }
    let pageData = this.pages[id] ?? {};
    if (pageData.onClose != null) {
      pageData.onClose();
    }
    delete this.pages[id];
    let page = this.frame.querySelector('.brPage[pageid="' + id + '"]');
    if (page == null) {
      return;
    }
    page.setAttribute("closing", "");
    page.setAttribute("hidden", "");
    setTimeout(() => {
      if (page != null) {
        page.remove();
      }
    }, 200);
  }

  updateActivePage() {
    this.active = this.parent.activePageID == this.pageID;
    if (this.active == false) {
      this.pageHolder.removeAttribute("active");
    } else {
      this.pageHolder.setAttribute("active", "");
    }
  }

  async js(frame, extra) {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.session = this.parent.session;

    let page = frame;

    this.pageHolder.style.setProperty("--themeRGB", "var(--breakoutThemeRGB)");
    this.pageHolder.style.setProperty("--theme", "var(--breakoutTheme)");
    this.pageHolder.style.setProperty("--secondaryRGB", "var(--breakoutSecondaryRGB)");
    this.pageHolder.style.setProperty("--secondary", "var(--breakoutSecondary)");
    this.pageHolder.style.setProperty("--hoverRGB", "var(--breakoutHoverRGB)");
    this.pageHolder.style.setProperty("--hover", "var(--breakoutHover)");
    this.pageHolder.style.setProperty("--lightShadow", "var(--breakoutLightShadow)");
    this.pageHolder.style.setProperty("--darkShadow", "var(--breakoutDarkShadow)");

    let bodyStyle = window.getComputedStyle(body);
    page.style.setProperty("--boardHover", bodyStyle.getPropertyValue("--hover"));
    page.style.setProperty("--boardLightShadow", bodyStyle.getPropertyValue("--lightShadow"));
    page.style.setProperty("--boardDarkShadow", bodyStyle.getPropertyValue("--darkShadow"));

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
    page.addEventListener("pointerdown", (event) => {
      this.pipeline.publish("pointerdown", { event: event });
      this.pipeline.publish("click_start", { type: "pointerdown", event: event });
    }, { passive: false });
    page.addEventListener("touchstart", (event) => {
      this.pipeline.publish("touchstart", { event: event });
    }, { passive: false });
    page.addEventListener("click", (event) => {
      this.pipeline.publish("click", { event: event });
    }, { passive: false });
    page.addEventListener("mouseleave", (event) => {
      this.pipeline.publish("mouseleave", { event: event });
    });
    page.addEventListener("contextmenu", (event) => {
      this.pipeline.publish("contextmenu", { event: event });
    });

    // Just for testing (change later):
    await this.openPage("primary", "overview");
  }
}