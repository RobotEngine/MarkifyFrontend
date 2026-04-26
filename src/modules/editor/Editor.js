import {
  fixed,
  favicon,

  userID,
  account,

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
  getObject,
  copyObject,
  objectUpdate
} from "@/crucial";

import { Pipeline } from "./Pipeline";
import { Utility } from "./Utility";
import { Render } from "./Render";
import { Save } from "./Save";
import { History } from "./History";
import { Text } from "./Text";

export class Editor {
  constructor () {
    this.pipeline = new Pipeline;
    this.utils = new Utility(this);
    this.render = new Render(this);
    this.save = new Save(this);
    this.history = new History(this);
    this.text = new Text(this);
  }

  html = `
  <div class="eContent">
    <div class="eRealtime"></div>
    <div class="eEditorContent">
      <div class="eAnnotations"></div>
    </div>
    <div class="eBackground"></div>
  </div>
  `;
  css = {
    ".eContent": `position: relative; display: flex; flex-direction: column; width: fit-content; min-width: calc(100% - (var(--interfacePadding) * 2)); min-height: calc(100vh - (var(--interfacePadding) * 2)); padding: var(--interfacePadding); contain: paint; align-items: center; overflow: hidden; background-color: var(--backgroundColor); pointer-events: all; transition: background-color .3s; --zoom: 1`,
    ".eRealtime": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; overflow: hidden; pointer-events: none`,
    ".eEditorContent": `position: relative; will-change: margin`,
    ".eAnnotations": `--startZIndex: 0; position: relative; width: 1px; height: 1px; transform-origin: 0 0; transform: scale(var(--zoom)); z-index: 2; pointer-events: none; contain: size layout style`, // will-change: contents
    ".eAnnotations[pointereventsdisabled] *": `pointer-events: none !important`,
    ".eBackground": `position: absolute; left: 0px; top: 0px; opacity: .075; transform-origin: left top; background-position: center; z-index: 1; pointer-events: none; contain: strict`,

    ".eAnnotation": `position: absolute; display: block; left: 0px; top: 0px; z-index: calc(var(--startZIndex) + var(--zIndex)); contain: size layout`,
    ".eAnnotation[hidden]": `display: none !important`,
    ".eAnnotation[anno]": `transition: all .25s, z-index 0s`,
    //".eAnnotation:not([anno])": `display: none !important`,
    ".eAnnotationHolder": `position: absolute; z-index: 10; contain: size style`, // layout will-change: contents
    //".eAnnotationHolder[notransition] > .eAnnotation": `transition: unset !important`,
    ".eAnnotation > svg": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: none; overflow: visible`,
    ".eAnnotation > svg > *": `pointer-events: visiblepainted`,

    ".eAnnotation .ql-editor": `padding: 0 !important; overflow-y: unset !important; font-family: var(--font); font-size: inherit; line-height: inherit`,
    ".eAnnotation .ql-editor > *": `cursor: unset`,
    ".eAnnotation .ql-editor.ql-blank::before": `color: var(--textColor) !important; opacity: .6 !important`,
    ".eAnnotation .ql-editor ol": `padding: unset`,
    ".eAnnotation .ql-editor a": `color: var(--theme) !important`,
    ".eAnnotation:not([selected]) > .ql-container .ql-editor a": `pointer-events: none !important`,
    ".eAnnotation .ql-formula": `position: relative; border: none; background: unset !important; box-shadow: unset !important`,
    '.eAnnotation .ql-editor[contenteditable="false"] .ql-formula': `pointer-events: none !important`,
    '.eAnnotation[selected] .ql-formula:before': `content: ""; position: absolute; box-sizing: border-box; width: calc((100% + 2px) * var(--zoom)); height: calc((100% + 2px) * var(--zoom)); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(calc(1 / var(--zoom))); border: solid 2px var(--secondary); border-radius: 6px; opacity: 0; pointer-events: none; transition: opacity .15s`,
    '.eAnnotation[selected] .ql-editor[contenteditable="true"] .ql-formula:before': `opacity: 1`,
    ".eAnnotation .ql-formula .mq-empty": `background: var(--hover) !important`,
    ".eAnnotation[selected] .ql-formula .mq-latex-command-input-wrapper": ``,
    ".eAnnotation[selected] .ql-formula .mq-latex-command-input": `position: relative; border: unset !important`,
    ".eAnnotation[selected] .ql-formula .mq-latex-command-input:before": `content: ""; position: absolute; box-sizing: border-box; width: calc((100% + 2px) * var(--zoom)); height: calc((100% + 2px) * var(--zoom)); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(calc(1 / var(--zoom))); border: solid 2px var(--secondary); border-radius: 6px; pointer-events: none`,
    ".eAnnotation[selected] .ql-formula .mq-text-mode.mq-hasCursor": `box-shadow: inset var(--lightShadow); border-radius: 2px`,
    
    //".ql-formula textarea": `transform: unset !important; clip: unset !important; width: unset !important; height: unset !important; outline: none !important`,

    ".eReaction": `display: flex; padding: 2px; background: rgba(255, 255, 255, .8); border: solid 2px rgba(0, 0, 0, 0); border-radius: 8px; align-items: center; overflow: hidden; color: #2F2F2F`,
    ".eReaction[selected]": `padding: 2px; background: rgba(var(--hoverRGB), .8); border: solid 2px var(--theme); color: var(--theme)`,
    ".eReaction[add]": `opacity: 0; border-radius: 14px`,
    ".customScroll[viewer] .eReaction[add]": "display: none !important",
    ".eReaction div[imgholder]": `display: flex; width: 20px; height: 20px; justify-content: center; align-items: center`,
    ".eReaction img": `width: 32px; height: 32px; transform: scale(0.65); border-radius: 7px; filter: drop-shadow(0px 0px 8px #fff)`,
    ".eReaction div[count]": `margin: 0 5px 0 6px; font-size: 16px; font-weight: 700`
  };
  
  active = true;
  isPageActive() {
    return this.active == true;
  }
  isThisPage(element) {
    return element != null && element.closest(".lPage") == this.pageFrame;
  }
  isEditorContent(target) {
    if (target == null) {
      return false;
    }
    return target.closest(".eContent") == this.content;
  }

  running = true;
  destroy() {
    this.running = false;
    this.visibleChunks = [];
    this.runUpdateCycle(true);
  }

  options = {
    snapping: true,
    cursors: true,
    cursornames: true,
    stylusmode: false,
    comments: true,
    fullscreen: false
  };
  settings = {};
  self = {};

  realtime = {
    enabled: true,
    subscribes: [],
    tool: 0, // 0: Pointer; 1: Markup; 2: Pen; 3: Erase
    observed: 0,
    forceShort: async () => {
      if (this.realtime.module != null) {
        await this.realtime.module.publishShort(null, null, true);
      }
    }
  };

  annotations = {};
  reactions = {};
  sources = {};
  sourceRenders = {};

  currentRootAnnotations = {};

  selecting = {};
  realtimeSelect = {};

  minimumEditingAccess = 0;
  defaultLocks = ["c"];

  visibleChunks = [];
  loadedChunks = {};
  defaultChunks = {};
  chunkAnnotations = {};
  chunkWidth = 1000;
  chunkHeight = 1000;
  scrollOffset = 58;

  visiblePages = [0];
  annotationPages = [];
  currentPage = 1;

  pageRenderPipeline = { running: false, queue: [] };

  comments = {};

  zoom = 1;
  maxLayer = null;
  minLayer = null;
  zooming = false;
  pinching = false;

  backgroundColor = "FFFFFF";

  getState() {
    return {
      annotations: this.annotations,
      reactions: this.reactions,
      //sources: this.sources,
      //sourceRenders: this.sourceRenders,
      currentRootAnnotations: this.currentRootAnnotations,
      chunkAnnotations: this.chunkAnnotations,
      //visiblePages: this.visiblePages,
      annotationPages: this.annotationPages,
      //currentPage: this.currentPage,
      comments: this.comments,
      zoom: this.zoom,
      centerPosition: this.getCenterPosition()
    };
  }
  async setState(state = {}) {
    this.visibleChunks = [];
    this.loadedChunks = {};
    this.annotations = state.annotations ?? this.annotations;
    this.reactions = state.reactions ?? this.reactions;
    this.currentRootAnnotations = state.currentRootAnnotations ?? this.currentRootAnnotations;
    this.chunkAnnotations = state.chunkAnnotations ?? this.chunkAnnotations;
    this.annotationPages = state.annotationPages ?? this.annotationPages;
    this.comments = state.comments ?? this.comments;
    await this.render.setMarginSize();
    if (state.zoom != null) {
      await this.setZoom(state.zoom);
    }
    if (state.centerPosition != null) {
      this.goToCenterPosition(state.centerPosition.x, state.centerPosition.y);
    }
    await this.updateChunks();
    await this.utils.updateCurrentPage(true);
  }
  reset() {
    //this.visibleChunks = [];
    //this.loadedChunks = {};
    this.annotations = {};
    this.reactions = {};
    this.currentRootAnnotations = {};
    this.chunkAnnotations = {};
    this.annotationPages = [];
    this.comments = {};
  }

  async savePreference() {
    let tempRevert = copyObject(this.lastSavePreferences);
    let changes = objectUpdate(this.preferences, this.lastSavePreferences);
    this.lastSavePreferences = copyObject(this.preferences);
    if (Object.keys(changes).length > 0) {
      let [code] = await sendRequest("POST", "lessons/save/preferences", { save: changes });
      if (code != 200) {
        this.lastSavePreferences = tempRevert;
      }
    }
  }
  async savePreferences(skip) {
    if (userID == null) {
      return; // Can't save if not a user!
    }
    clearTimeout(this.savePreferenceTimeout);
    if (skip == true) {
      return await savePreference();
    }
    this.savePreferenceTimeout = setTimeout(savePreference, 1000); // Save after 1 second of no changes
  }

  adjustRealtimeHolder() {
    if (this.realtime.module != null && this.realtime.module.adjustRealtimeHolder != null) {
      this.realtime.module.adjustRealtimeHolder();
    }
  }
  exitObserve() {
    if (this.realtime.observing != null && this.realtime.module != null) {
      this.realtime.module.exitObserve();
    }
  }

  setPage(pageNumber, animate) {
    if (pageNumber < 1 || pageNumber > this.annotationPages.length) {
      return;
    }
    this.currentPage = pageNumber;
    this.utils.updateAnnotationScroll(this.annotationPages[this.currentPage - 1], animate);
  }

  updatePageSize() {
    let rect = this.page.getBoundingClientRect();
    this.pageOffsetWidth = rect.width;
    this.pageOffsetHeight = rect.height;
    let scaleWidth = this.page.offsetWidth - this.pageOffsetWidth;
    let halfScaleWidth = scaleWidth / 2;
    let scaleHeight = this.page.offsetHeight - this.pageOffsetHeight;
    let halfScaleHeight = scaleHeight / 2;
    this.pageRect = {
      scale: 1,
      x: rect.x - halfScaleWidth,
      y: rect.y - halfScaleHeight,
      width: this.pageOffsetWidth,
      height: this.pageOffsetHeight,
      left: rect.left - halfScaleWidth,
      right: rect.right + halfScaleWidth,
      top: rect.top - halfScaleHeight,
      bottom: rect.bottom + halfScaleHeight
    };
    this.frame.style.setProperty("--interfacePadding", this.scrollOffset + "px");
  }

  getCenterPosition() {
    let annotationRect = this.utils.annotationsRect();
    return {
      x: (((this.pageOffsetWidth / 2) - annotationRect.left) / this.zoom),
      y: (((this.pageOffsetHeight / 2) - annotationRect.top) / this.zoom)
    };
  }

  goToCenterPosition(x, y, animate) {
    let annotationRect = this.utils.annotationsRect();
    let options = {
      left: (this.contentHolder.scrollLeft + annotationRect.left) + (x * this.zoom) - (this.pageOffsetWidth / 2),
      top: (this.contentHolder.scrollTop + annotationRect.top) + (y * this.zoom) - (this.pageOffsetHeight / 2)
    };
    if (animate == true) {
      options.behavior = "smooth";
    }
    this.contentHolder.scrollTo(options);
  }

  async js(frame) {
    //this.frame = frame;
    this.contentHolder = this.contentHolder ?? frame.parentElement;
    this.page = this.page ?? this.contentHolder.closest(".content");
    this.pageFrame = this.page.closest(".lPage");
    this.content = this.contentHolder.querySelector(".eContent");
    this.realtimeHolder = this.content.querySelector(".eRealtime");
    this.editorContent = this.content.querySelector(".eEditorContent");
    this.annotationHolder = this.editorContent.querySelector(".eAnnotations");
    this.background = this.content.querySelector(".eBackground");

    frame.style.width = "fit-content";
    frame.style.height = "fit-content";
    //contentHolder.style.willChange = "scroll-position";

    // Handle setting options to how they where previously set:
    let localOptions = getLocalStore("options");
    if (localOptions != null) {
      this.localOptions = JSON.parse(getLocalStore("options"));
      let localOptionKeys = Object.keys(this.localOptions);
      for (let i = 0; i < localOptionKeys.length; i++) {
        let option = localOptionKeys[i];
        this.options[option] = this.localOptions[option];
      }
    }

    // Handle resizing and recentering of the editor frame:
    let recenterTimeoutFromSimulatedResize;
    this.pipeline.subscribe("resizeChange", "resize", async (event) => {
      let centerPosition = this.getCenterPosition();
      
      this.updatePageSize();
      await this.render.setMarginSize();

      if (event.simulated != true) {
        this.goToCenterPosition(centerPosition.x, centerPosition.y);
      } else {
        clearTimeout(recenterTimeoutFromSimulatedResize);
        recenterTimeoutFromSimulatedResize = setTimeout(() => {
          if (this.annotationPages.length > 0) {
            this.utils.updateAnnotationScroll(this.annotationPages[this.currentPage - 1]);
          } else {
            this.utils.centerWindowWithPage();
          }
        }, 100);
      }
    }, { sort: 1 });
    this.updatePageSize();

    // Handle resync of modified annotations after connection loss:
    if (this.resync != null && this.resync.save != null && this.resync.save.synced == false && this.resync.annotations != null) {
      if (this.self.access > 0) {
        let resyncKeys = Object.keys(this.resync.annotations);
        for (let i = 0; i < resyncKeys.length; i++) {
          let anno = this.resync.annotations[resyncKeys[i]] ?? {};
          if (anno.save == true && (anno.render._id.includes("pending_") == false || anno.render.remove != true)) {
            let render = copyObject(anno.render);
            delete anno.expire;
            this.annotations[render._id] = { render: render };
            this.save.pendingSaves[render._id] = { ...this.save.pendingSaves[render._id], ...render };
          }
        }
        this.save.syncSave(true);
      }
    }
    if (this.pageID != null && (window.resync ?? {}).pageSync != null) {
      window.resync.pageSync[this.pageID] = { save: this.save, annotations: this.annotations };
    }

    

    await this.render.setMarginSize();
    this.utils.centerWindowWithPage();
  }
}