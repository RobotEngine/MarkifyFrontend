import { userID, sendRequest, getLocalStore, getObject, copyObject, objectUpdate, objectEqual } from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
import { modal as modalModule } from "@modules/utility/Modal";
import { alert as alertModule } from "@modules/utility/Alert";

import { contrastCheck } from "./utils/contrast-check";
import { darkenHex } from "./utils/darken-hex";
import { lightenHex } from "./utils/lighten-hex";

import { Pipeline } from "./Pipeline";
import { Utility } from "./Utility";
import { Render } from "./Render";
import { Save } from "./Save";
import { History } from "./History";
import { Text } from "./Text";
import { Preferences } from "./Preferences";

export class Editor {
  constructor() {
    this.pipeline = new Pipeline;
    this.utils = new Utility(this);
    this.render = new Render(this);
    this.save = new Save(this);
    this.history = new History(this);
    this.text = new Text(this);
    this.preferences = new Preferences(this);
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
    ".eAnnotation .ql-editor > *": `cursor: initial !important`,
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

    ".eReaction": `display: flex; padding: 2px; background: rgba(var(--background), .8); border: solid 2px rgba(0, 0, 0, 0); border-radius: 8px; align-items: center; overflow: hidden`,
    ".eReaction[selected]": `padding: 2px; background: rgba(var(--hoverRGB), .8); border: solid 2px var(--theme); color: var(--theme)`,
    ".eReaction[add]": `opacity: 0; border-radius: 14px`,
    ".customScroll[viewer] .eReaction[add]": "display: none !important",
    ".eReaction div[imgholder]": `display: flex; width: 20px; height: 20px; justify-content: center; align-items: center`,
    ".eReaction img": `width: 32px; height: 32px; transform: scale(0.65); border-radius: 7px; filter: drop-shadow(0px 0px 8px var(--pageColor))`,
    ".eReaction div[count]": `margin: 0 5px 0 6px; font-size: 16px; font-weight: 700`
  };

  async register(template) {
    let module = await this.newModule(template);
    if (module == null) {
      return;
    }
    if (module.js != null) {
      await module.js();
    }
    return module;
  }
  
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
    observed: {},
    observedCount: 0
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

  updateInterface() {
    if (this.settings.anonymousMode == true) {
      this.content.setAttribute("anonymous", "");
    } else {
      this.content.removeAttribute("anonymous");
    }
  }

  cleanupSelections() {
    if (this.toolbar != null && this.toolbar.selection != null) {
      return this.toolbar.selection.cleanup();
    }
  }

  updateToolbar() {
    if (this.toolbar != null) {
      this.toolbar.toolbar.update();
    }
  }
  async startTool(button, noExtend, passData) {
    if (this.toolbar != null) {
      await this.toolbar.toolbar.startTool(button, noExtend, passData);
    }
  }

  async publishShort(event, type, ignoreSame) {
    if (this.realtime.module != null) {
      await this.realtime.module.publishShort(event, type, ignoreSame);
    }
  }
  async forceShort() {
    await this.publishShort(null, null, true);
  }
  setShortSub() {
    if (this.realtime.module != null) {
      this.realtime.module.setShortSub(this.visibleChunks);
    }
  }
  closeShortSub() {
    if (this.realtime.module != null) {
      this.realtime.module.closeShortSub();
    }
  }
  removeSelection(annoID, memberID, member) {
    if (this.realtime.module != null) {
      this.realtime.module.removeSelection(annoID, memberID, member);
    }
  }
  refreshRealtimeSelections(transition, cache) {
    if (this.realtime.module != null) {
      this.realtime.module.refreshRealtimeSelections(transition, cache);
    }
  }
  adjustRealtimeHolder() {
    if (this.realtime.module != null) {
      this.realtime.module.adjustRealtimeHolder();
    }
  }
  setObserveFrame(member) {
    if (this.realtime.module != null) {
      this.realtime.module.setObserveFrame(member);
    }
  }
  exitObserve() {
    if (this.realtime.observing != null && this.realtime.module != null) {
      this.realtime.module.exitObserve();
    }
  }
  removeRealtime(memberID) {
    if (this.realtime.module != null) {
      this.realtime.module.removeRealtime(memberID);
    }
  }

  setCurrentPage(pageNumber, animate) {
    if (pageNumber < 1 || pageNumber > this.annotationPages.length) {
      return;
    }
    this.currentPage = pageNumber;
    this.utils.updateAnnotationScroll(this.annotationPages[this.currentPage - 1], animate);
  }

  updatePageScroll() {
    this.scrollLeft = this.contentHolder.scrollLeft;
    this.scrollTop = this.contentHolder.scrollTop;
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
    this.updatePageScroll();
    this.frame.style.setProperty("--interfacePadding", this.scrollOffset + "px");
  }

  scrollTo(left, top, animate) {
    let options = { left, top };
    if (animate == true) {
      options.behavior = "smooth";
    }
    this.contentHolder.scrollTo(options);
  }

  getCenterPosition() {
    return {
      x: (this.scrollLeft + (this.pageOffsetWidth / 2) - this.render.marginLeft) / this.zoom,
      y: (this.scrollTop + (this.pageOffsetHeight / 2) - this.render.marginTop) / this.zoom
    };
  }
  goToCenterPosition(x, y, animate) {
    this.scrollTo(
      (x * this.zoom) - (this.pageOffsetWidth / 2) + this.render.marginLeft,
      (y * this.zoom) - (this.pageOffsetHeight / 2) + this.render.marginTop,
      animate
    );
  }

  updateBackground(setColor) {
    if (setColor != null) {
      this.backgroundColor = setColor;
    }
    if (contrastCheck(this.backgroundColor) == true) {
      this.background.style.setProperty("background-image", "url(../images/editor/backdropblack.svg)");
      this.content.style.setProperty("--secondaryBackgroundColor", "#" + darkenHex(this.backgroundColor, 50));
    } else {
      this.background.style.setProperty("background-image", "url(../images/editor/backdropwhite.svg)");
      this.content.style.setProperty("--secondaryBackgroundColor", "#" + lightenHex(this.backgroundColor, 50));
    }
    this.content.style.setProperty("--backgroundColor", "#" + this.backgroundColor);
  }

  holdLoadedChunks = {};
  async runUpdateCycle(force) {
    if (this.pinching == true && force != true) {
      if (this.pinchingUpdateTimeout == null) {
        this.pinchingUpdateTimeout = setTimeout(() => { this.runUpdateCycle(true); }, 200);
      }
      return;
    }
    this.pinchingUpdateTimeout = null;

    if (this.runningUpdateCycle == true) {
      this.reRunUpdateCycle = true;
      return;
    }
    this.runningUpdateCycle = true;

    let unloadChunkedAnnotations = {};
    let newlyUnloaded = {};
    let visible = Object.keys({ ...this.loadedChunks, ...this.holdLoadedChunks });
    this.holdLoadedChunks = {};
    for (let i = 0; i < visible.length; i++) {
      let chunk = visible[i];
      if (this.visibleChunks.includes(chunk) == false) {
        delete this.loadedChunks[chunk];
        newlyUnloaded[chunk] = "";

        // Remove annotations in unloaded chunks:
        let addAnnotations = this.chunkAnnotations[chunk] ?? {};
        let addAnnotationsKeys = Object.keys(addAnnotations);
        for (let i = 0; i < addAnnotationsKeys.length; i++) {
          let key = addAnnotationsKeys[i];
          unloadChunkedAnnotations[key] = addAnnotations[key];
        }
      }
    }
    let chunkUnloadAnnos = Object.keys(unloadChunkedAnnotations);
    for (let a = 0; a < chunkUnloadAnnos.length; a++) {
      let annotation = this.annotations[chunkUnloadAnnos[a]] ?? {};
      if (annotation.render == null) {
        continue;
      }
      if (annotation.chunks != null && this.running != false) {
        // Annotation may still be visible in another chunk, we must check
        let remove = true;
        for (let c = 0; c < annotation.chunks.length; c++) {
          if (this.loadedChunks[annotation.chunks[c]] != null) {
            remove = false;
            break;
          }
        }
        if (remove == false) {
          continue;
        }
        if (annotation.renderedChildren != null && Object.keys(annotation.renderedChildren).length > 0) {
          for (let c = 0; c < annotation.chunks.length; c++) {
            this.holdLoadedChunks[annotation.chunks[c]] = "";
          }
          continue;
        }
        if (this.selecting[annotation.render._id] != null) {
          for (let c = 0; c < annotation.chunks.length; c++) {
            this.holdLoadedChunks[annotation.chunks[c]] = "";
          }
          continue;
        }
      }
      if (annotation.component != null) {
        this.render.remove(annotation);
      }
    }

    let loadChunkedAnnotations = {};
    let newlyLoaded = {};
    for (let i = 0; i < this.visibleChunks.length; i++) {
      let chunk = this.visibleChunks[i];
      if (this.loadedChunks[chunk] == null) {
        this.loadedChunks[chunk] = "";
        newlyLoaded[chunk] = "";

        // Load annotations in these chunks:
        let addAnnotations = this.chunkAnnotations[chunk] ?? {};
        let addAnnotationsKeys = Object.keys(addAnnotations);
        for (let i = 0; i < addAnnotationsKeys.length; i++) {
          let key = addAnnotationsKeys[i];
          loadChunkedAnnotations[key] = addAnnotations[key];
        }
      }
    }
    let chunkAnnos = Object.keys(loadChunkedAnnotations);
    for (let a = 0; a < chunkAnnos.length; a++) {
      let annotation = this.annotations[chunkAnnos[a]] ?? { chunks: [] };
      let render = true;
      for (let i = 0; i < (annotation.chunks ?? []).length; i++) {
        let chunk = annotation.chunks[i];
        if (this.loadedChunks[chunk] != null && newlyLoaded[chunk] == null) {
          render = false;
          break;
        }
      }
      if (render == true && annotation.render != null && annotation.component == null) {
        await this.render.create(annotation);
      }
    }

    this.runningUpdateCycle = false;
    if (this.reRunUpdateCycle == true) {
      this.reRunUpdateCycle = false;
      this.runUpdateCycle();
    }
  }
  async updateChunks() {
    if (this.running == false || this.exporting == true) {
      return;
    }

    let annotationRect = this.utils.annotationsRect();

    // Update Background Dots:
    let dotSize = 25;
    if (this.zoom < .25) {
      dotSize = 100;
    } else if (this.zoom < .5) {
      dotSize = 50;
    }
    this.background.style.backgroundSize = dotSize + "px " + dotSize + "px";
    let scaledDotSize = dotSize * this.zoom;
    let backgroundPaddingWidth = Math.ceil((this.pageOffsetWidth / 2) / scaledDotSize) * scaledDotSize;
    let backgroundPaddingHeight = Math.ceil((this.pageOffsetHeight / 2) / scaledDotSize) * scaledDotSize;
    let backgroundWidth = Math.ceil((this.pageOffsetWidth + (backgroundPaddingWidth * 2)) / scaledDotSize) * scaledDotSize;
    let backgroundHeight = Math.ceil((this.pageOffsetHeight + (backgroundPaddingHeight * 2)) / scaledDotSize) * scaledDotSize;
    this.background.style.width = (backgroundWidth / this.zoom) + "px";
    this.background.style.height = (backgroundHeight / this.zoom) + "px";
    let originCorrectX = (annotationRect.left - (backgroundWidth / 2)) % scaledDotSize;
    let originCorrectY = (annotationRect.top - (backgroundHeight / 2)) % scaledDotSize;
    this.background.style.transform = "matrix(1,0,0,1," + (this.scrollLeft + originCorrectX - backgroundPaddingWidth) + "," + (this.scrollTop + originCorrectY - backgroundPaddingHeight) + ") scale(var(--zoom))";

    if (this.zooming == true) {
      return;
    }

    let newVisibleChunks = this.utils.regionInChunks(
      ((this.pageOffsetWidth / -2) - annotationRect.left) / this.zoom,
      ((this.pageOffsetHeight / -2) - annotationRect.top) / this.zoom,
      ((this.pageOffsetWidth + (this.pageOffsetWidth / 2)) - annotationRect.left) / this.zoom,
      ((this.pageOffsetHeight + (this.pageOffsetHeight / 2)) - annotationRect.top) / this.zoom
    );
    let hasChanged = newVisibleChunks.length != this.visibleChunks.length; // Check array length first!
    if (hasChanged == false) {
      for (let i = 0; i < newVisibleChunks.length; i++) { // If same length, check each chunk is the same:
        if (this.visibleChunks[i] != newVisibleChunks[i]) {
          hasChanged = true;
          break;
        }
      }
    }
    if (hasChanged == true) {
      this.visibleChunks = newVisibleChunks;
      this.runUpdateCycle();
    }
    
    clearTimeout(this.updatePageTimeout);
    this.updatePageTimeout = setTimeout(() => { this.utils.updateCurrentPage(); }, 100);
    clearTimeout(this.updateSubTimeout);
    this.updateSubTimeout = setTimeout(() => { this.setShortSub(); }, 750);
  }

  //lastMouseX = null;
  //lastMouseY = null;
  //mouseBeforeX = null;
  //mouseBeforeY = null;
  async setZoom(set, observe, mouse = {}) {
    if (observe != true) {
      this.exitObserve();
    }

    let { mouseX, mouseY } = this.utils.localMousePosition(mouse);

    if (this.lastMouseX != mouseX || this.lastMouseY != mouseY) {
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
      // Get Page Rect:
      let annotationHolderRect = this.utils.annotationsRect();
      this.mouseBeforeX = (mouseX - annotationHolderRect.left) / this.zoom;
      this.mouseBeforeY = (mouseY - annotationHolderRect.top) / this.zoom;
    }

    if (set == null) {
      let delta = mouse.deltaY ?? 0;
      if (delta > 0) {
        set = this.zoom + (((Math.min(delta, 20) ?? 0) * -0.01) * this.zoom); //Math.min(delta, 20) * -0.01;
      } else {
        set = this.zoom + (((Math.max(delta, -20) ?? 0) * -0.01) * this.zoom); //Math.max(delta, -20) * -0.01;
      }
    }
    this.zoom = set;
    this.zoomChanged = true;

    if (this.zoom > 5) {
      this.zoom = 5;
    } else if (this.zoom < .2) {
      this.zoom = .2;
    }

    this.zooming = true;

    this.content.style.setProperty("--zoom", this.zoom);

    this.updatePageScroll();

    await this.render.setMarginSize();

    if (observe != true) {
      // Get Page Rect:
      let annotationHolderRect = this.utils.annotationsRect();
      let addScrollX = (this.mouseBeforeX * this.zoom) - (mouseX - annotationHolderRect.left);
      let addScrollY = (this.mouseBeforeY * this.zoom) - (mouseY - annotationHolderRect.top);
      
      // Set the new scroll position
      this.scrollTo(
        this.scrollLeft + addScrollX + (mouse.changeScrollX ?? 0),
        this.scrollTop + addScrollY + (mouse.changeScrollY ?? 0)
      );
    }

    this.zooming = false;

    //await this.updateChunks();

    this.pipeline.publish("zoom_change", { zoom: this.zoom });

    this.adjustRealtimeHolder();
  }

  //originalStartDistance = null;
  //startDistance = null;
  //startZoom = null;
  //originCenter = null;
  getPinchDistance(touches) {
    let [touchAX, touchAY] = this.utils.mousePosition(touches[1] ?? {});
    let [touchBX, touchBY] = this.utils.mousePosition(touches[0] ?? {});
    let xDiff = ((touchAX / this.pageOffsetWidth) - (touchBX / this.pageOffsetWidth)) * this.pageOffsetWidth;
    let yDiff = ((touchAY / this.pageOffsetHeight) - (touchBY / this.pageOffsetHeight)) * this.pageOffsetHeight;
    return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
  }
  getPinchCenter(touches) {
    let [touchAX, touchAY] = this.utils.mousePosition(touches[0] ?? {});
    let [touchBX, touchBY] = this.utils.mousePosition(touches[1] ?? {});
    return { x: (touchAX + touchBX) / 2, y: (touchAY + touchBY) / 2 };
  }
  endPinch() {
    this.pinching = false;
    this.originalStartDistance = null;
    this.startDistance = null;
    this.startZoom = null;
    this.originCenter = null;
    this.lastMouseX = null;
    this.lastMouseY = null;
    this.annotationHolder.style.removeProperty("will-change");
  }
  async handlePinch() {
    if (this.isThisPage(event.target) == false) {
      return;
    }
    if (
      event.touches.length != 2
      || ["stylus", "pen"].includes(event.touches[0].touchType) == true
      || ["stylus", "pen"].includes(event.touches[1].touchType) == true
    ) {
      return this.endPinch();
    }
    let currentDistance = this.getPinchDistance(event.touches);
    if (this.originalStartDistance == null) {
      this.originalStartDistance = currentDistance;
    }
    if (this.startZoom == null) {
      this.startZoom = this.zoom;
    }
    let center = this.getPinchCenter(event.touches);
    if (this.originCenter == null) {
      this.originCenter = { x: center.x, y: center.y };
    }
    let zoomFactor = 1;
    if (this.startDistance != null) {
      zoomFactor = (currentDistance / this.startDistance);
    } else {
      if (Math.abs(currentDistance - this.originalStartDistance) > 25) {
        this.startDistance = currentDistance;
        this.pinching = true;
      }
    }
    if (this.pinching == true) {
      await this.setZoom(this.startZoom * zoomFactor, null, {
        clientX: this.originCenter.x,
        clientY: this.originCenter.y,
        changeScrollX: this.originCenter.x - center.x,
        changeScrollY: this.originCenter.y - center.y,
        updatePages: false
      });
    }
  }

  async applyRootTemplate(rootAnnotations = []) {
    let rootAnnotationChanges = {};
    let validRootAnnotations = { root: true };
    for (let i = 0; i < rootAnnotations.length; i++) {
      let rootAnno = rootAnnotations[i];
      validRootAnnotations[rootAnno._id] = true;
      let prevAnno = this.currentRootAnnotations[rootAnno._id];
      if (prevAnno == null) {
        rootAnnotationChanges[rootAnno._id] = { new: rootAnno, old: rootAnno, load: true };
        this.currentRootAnnotations[rootAnno._id] = rootAnno;
        continue;
      }
      let fields = Object.keys(rootAnno);
      for (let f = 0; f < fields.length; f++) {
        let field = fields[f];
        let setField = rootAnno[field];
        let prevField = prevAnno[field];
        if (objectEqual(setField, prevField) == false) {
          let rootAnnoChange = rootAnnotationChanges[rootAnno._id];
          if (rootAnnoChange == null) {
            rootAnnotationChanges[rootAnno._id] = { new: {}, old: {} };
            rootAnnoChange = rootAnnotationChanges[rootAnno._id];
          }
          rootAnnoChange.new[field] = setField;
          rootAnnoChange.old[field] = prevField;
          this.currentRootAnnotations[rootAnno._id][field] = setField;
        }
      }
    }
    let checkAnnotations = Object.keys(this.annotations);
    let changedAnnotations = [];
    for (let i = 0; i < checkAnnotations.length; i++) {
      let annoID = checkAnnotations[i];
      let anno = this.annotations[annoID] ?? {};
      let render = anno.render ?? {};
      if (render.from == null) {
        continue;
      }
      let rootAnno = rootAnnotationChanges[render.from];
      if (rootAnno == null) {
        if ((render.from == "root" && validRootAnnotations[render._id] == null) || validRootAnnotations[render.from] == null) {
          anno.render.remove = true;
          delete anno.revert;
          changedAnnotations.push(anno);
        }
        continue;
      }
      if (rootAnno.load == true) {
        anno.render = { ...rootAnno.new, ...render };
        delete rootAnnotationChanges[render.from];
        changedAnnotations.push(anno);
      } else {
        let fields = Object.keys(rootAnno.new);
        for (let f = 0; f < fields.length; f++) {
          let field = fields[f];
          if (objectEqual(render[field], rootAnno.old[field]) == true) {
            render[field] = rootAnno[field];
            delete rootAnnotationChanges[render.from];
            changedAnnotations.push(anno);
          }
        }
      }
    }
    let newRootAnnotions = Object.keys(rootAnnotationChanges);
    for (let i = 0; i < newRootAnnotions.length; i++) {
      let addAnno = copyObject(this.currentRootAnnotations[newRootAnnotions[i]] ?? {});
      /*addAnno._id = "root_" + addAnno._id;
      if (addAnno.parent != null) {
        addAnno.parent = "root_" + addAnno.parent;
      }*/
      addAnno.from = "root";
      let existingAnno = this.annotations[addAnno._id];
      if (existingAnno == null) { // || existingAnno.render.sync < addAnno.sync
        this.annotations[addAnno._id] = {};
        existingAnno = this.annotations[addAnno._id];
      }
      existingAnno.render = addAnno;
      changedAnnotations.push(existingAnno);
    }

    for (let i = 0; i < changedAnnotations.length; i++) {
      await this.utils.setAnnotationChunks(changedAnnotations[i]);
    }
  }
  async loadAnnotations(body = {}, extra = {}) {
    if (body.sources != null) {
      for (let i = 0; i < body.sources.length; i++) {
        let source = body.sources[i];
        this.lesson.sources[source._id] = this.lesson.sources[source._id] ?? source;
      }
    }
    if (body.reactions != null) {
      let reactedToObject = getObject(body.reactedTo ?? [], "_id");
      for (let i = 0; i < body.reactions.length; i++) {
        let addReaction = body.reactions[i];
        let existingAnnoRecord = this.reactions[addReaction.annotation];
        if (existingAnnoRecord == null) {
          this.reactions[addReaction.annotation] = [];
          existingAnnoRecord = this.reactions[addReaction.annotation];
        }
        delete addReaction.annotation;
        if (reactedToObject[addReaction._id + "_" + this.self.modify] != null) {
          addReaction.reacted = true;
        }
        existingAnnoRecord.push(addReaction);
      }
    }
    let addedAnnotations = [];
    if (body.annotations != null) {
      for (let i = 0; i < body.annotations.length; i++) {
        let addAnno = body.annotations[i];
        let existingAnno = this.annotations[addAnno._id];
        if (existingAnno == null || existingAnno.render.sync < addAnno.sync) {
          this.annotations[addAnno._id] = { render: addAnno };
          existingAnno = this.annotations[addAnno._id];
        }
        addedAnnotations.push(existingAnno);
      }
    }
    if (body.rootAnnotations != null) {
      await this.applyRootTemplate(body.rootAnnotations);
    }
    for (let i = 0; i < addedAnnotations.length; i++) {
      await this.utils.setAnnotationChunks(addedAnnotations[i]);
    }

    await this.render.setMarginSize();

    if (this.exporting == true) {
      return;
    }

    if (extra.skipPositioning == true) {
      return this.updateChunks();
    }

    this.lockResizeCenterPosition = true;

    clearTimeout(this.recenterTimeoutFromSimulatedResize);

    let jumpAnnotation = null;
    if (extra.jumpID != null && extra.jumpID != "") {
      if (this.annotations[extra.jumpID] != null) {
        jumpAnnotation = (await this.render.create(this.annotations[extra.jumpID])).component.getElement();
      }
    }
    if (jumpAnnotation == null) {
      if (extra.pageID == null || this.annotations[extra.pageID] == null) {
        if (this.annotationPages.length > 0) {
          this.utils.updateAnnotationScroll([this.annotationPages[0][0]], false);
        } else {
          this.utils.centerWindowWithPage();
        }
      } else {
        this.utils.updateAnnotationScroll([extra.pageID], false);
      }
      await this.updateChunks();
    } else {
      await this.utils.scrollToElement(jumpAnnotation);
      await this.updateChunks();
      if (this.toolbar != null) {
        this.selecting[extra.jumpID] = {};
        this.pipeline.publish("redraw_selection", {});
      } else {
        redrawSelectionId = extra.jumpID;
      }
    }
  }

  openDropdown(button, template, extra) {
    return dropdownModule.open(button, template, { ...(extra ?? {}), editor: this });
  }
  closeDropdown() {
    return dropdownModule.close();
  }

  openModal(template, button, extra) {
    return modalModule.open(template, button, { ...(extra ?? {}), editor: this });
  }
  closeModal() {
    return modalModule.close();
  }

  openAlert(type, message, data) {
    return alertModule.open(type, message, data);
  }
  closeAlert(alert) {
    return alertModule.close(alert);
  }

  setElements(frame) {
    if (frame == null) {
      frame = this.frame;
    }
    //this.frame = frame;
    this.contentHolder = this.contentHolder ?? frame.parentElement;
    this.page = this.page ?? this.contentHolder.closest(".content");
    this.pageFrame = this.page.closest(".lPage");
    this.content = this.contentHolder.querySelector(".eContent");
    this.realtimeHolder = this.content.querySelector(".eRealtime");
    this.editorContent = this.content.querySelector(".eEditorContent");
    this.annotationHolder = this.editorContent.querySelector(".eAnnotations");
    this.background = this.content.querySelector(".eBackground");
  }
  async js(frame) {
    this.setElements(frame);

    frame.style.width = "fit-content";
    frame.style.height = "fit-content";

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

    // Set default preferences:
    this.preferences.create(this.preferenceState ?? {});

    // Handle resizing and recentering of the editor frame:
    this.pipeline.subscribe("resizeChange", "resize", async (event) => {
      if (this.resizeCenterPosition == null) {
        this.resizeCenterPosition = this.getCenterPosition();
      }
      clearTimeout(this.clearResizeCenterPosition);
      this.clearResizeCenterPosition = setTimeout(() => {
        delete this.resizeCenterPosition;
        delete this.lockResizeCenterPosition;
      }, 200);
      
      this.updatePageSize();
      await this.render.setMarginSize();

      if (this.lockResizeCenterPosition != true) {
        if (event.simulated != true) {
          this.goToCenterPosition(this.resizeCenterPosition.x, this.resizeCenterPosition.y);
        } else {
          clearTimeout(this.recenterTimeoutFromSimulatedResize);
          this.recenterTimeoutFromSimulatedResize = setTimeout(() => {
            if (this.annotationPages.length > 0) {
              this.utils.updateAnnotationScroll(this.annotationPages[this.currentPage - 1]);
            } else {
              this.utils.centerWindowWithPage();
            }
          }, 100);
        }
      }
    }, { sort: 1 });
    this.updatePageSize();

    // Handle scroll or resize change for rendering:
    this.pipeline.subscribe("boundChange", "bounds_change", () => { this.updatePageScroll(); this.updateChunks(); }, { sort: 1 });
    this.contentHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });
    this.updatePageScroll();

    // Handle scroll wheel zooming:
    this.pipeline.subscribe("zoomWheel", "wheel", (data) => {
      let event = data.event;
      if (event.ctrlKey == true || event.metaKey == true) {
        event.preventDefault();
        this.setZoom(null, null, event);
      } else {
        this.lastMouseX = null;
        this.lastMouseY = null;
      }
      this.resizeCenterPosition = null;
    });
    this.page.addEventListener("DOMMouseScroll", (event) => {
      this.pipeline.publish("wheel", { type: "DOMMouseScroll", event: event });
    }, { passive: false });
    this.page.addEventListener("mousewheel", (event) => {
      this.pipeline.publish("wheel", { type: "mousewheel", event: event });
    }, { passive: false });
    this.page.addEventListener("wheel", (event) => {
      this.pipeline.publish("wheel", { type: "wheel", event: event });
    }, { passive: false });

    // Handle pinch zooming:
    this.pipeline.subscribe("zoomPinchTouchStart", "touchstart", async (data) => {
      let event = data.event;
      if (event.touches.length > 1) {
        event.preventDefault();
      }
      if (event.touches.length == 2) {
        this.annotationHolder.style.willChange = "transform";
        this.utils.resetSelecting();
      }
      this.handlePinch(event);
    });
    this.pipeline.subscribe("zoomPinchTouchMove", "touchmove", (data) => {
      let event = data.event;
      if (event.cancelable == false) {
        return this.endPinch();
      }
      if (this.pinching == true) {
        event.preventDefault();
      }
      if (event.touches.length > 2) {
        return;
      }
      this.handlePinch(event);
      this.resizeCenterPosition = null;
    });
    this.pipeline.subscribe("zoomPinchTouchEnd", "touchend", (data) => {
      if (data.event.touches.length < 2) {
        this.endPinch();
      }
    });

    // Handle annotation updates (LONG events):
    this.pipeline.subscribe("longAnnotationUpdate", "long", async (event) => {
      if (this.realtime.enabled == false) {
        return;
      }
      if (event.id != null && event.id != this.id) {
        return;
      }

      let data = copyObject(event.push);
      //let redrawAction = false;
      for (let i = 0; i < data.length; i++) {
        let anno = data[i];
        /*let pendingAnno;
        if (anno.pending != null) {
          pendingAnno = this.annotations[anno.pending];
        }*/
        let existingAnno = this.annotations[anno._id]; // ?? pendingAnno;
        if (existingAnno != null) {
          if (existingAnno.serverSync > anno.sync) {
            continue; // Discard event as it's old
          }
          existingAnno.serverSync = anno.sync;
          existingAnno.revert = anno;

          /*if (pendingAnno != null) {
            let selectBox = this.content.querySelector('.eSelect[anno="' + anno.pending + '"]');
            if (selectBox != null) {
              selectBox.setAttribute("anno", anno._id);
            }
            let allSelections = this.realtimeHolder.querySelectorAll('.eCollabSelect[anno="' + anno.pending + '"]');
            for (let i = 0; i < allSelections.length; i++) {
              allSelections[i].setAttribute("anno", anno._id);
            }

            for (let i = 0; i < this.history.history.length; i++) {
              let event = this.history.history[i];
              for (let c = 0; c < event.changes.length; c++) {
                let change = event.changes[c];
                if (change._id == anno.pending) {
                  change._id = anno._id;
                }
                if (change.parent == anno.pending) {
                  change.parent = anno._id;
                }
              }
              for (let c = 0; c < event.redo.length; c++) {
                let change = event.redo[c];
                if (change._id == anno.pending) {
                  change._id = anno._id;
                }
                if (change.parent == anno.pending) {
                  change.parent = anno._id;
                }
              }
            }

            if (existingAnno.render != null) {
              existingAnno.render._id = anno._id;
            } else {
              existingAnno.render = anno;
            }
            this.annotations[anno._id] = existingAnno;
            this.annotations[anno.pending] = { pointer: anno._id };
            existingAnno = this.annotations[anno._id];
            existingAnno.pending = anno.pending;

            if (this.selecting[anno.pending] != null) {
              this.selecting[anno._id] = this.selecting[anno.pending];
              delete this.selecting[anno.pending];
  
              if (this.toolbar != null && this.toolbar.selection.annotationRects[anno.pending] != null) {
                this.toolbar.selection.annotationRects[anno._id] = this.toolbar.selection.annotationRects[anno.pending];
              }
            }

            if (existingAnno.component != null) {
              existingAnno.component.properties._id = anno._id;
              existingAnno.component.setID();
            }

            // Update Chunk IDs:
            existingAnno.chunks = existingAnno.chunks ?? [];
            for (let i = 0; i < existingAnno.chunks.length; i++) {
              let chunk = this.chunkAnnotations[existingAnno.chunks[i]];
              if (chunk != null) {
                chunk[anno._id] = "";
                delete this.chunkAnnotations[existingAnno.chunks[i]][anno.pending];
              }
            }

            await this.render.setMarginSize();
          }*/
          
          // CHECKS IF SERVER IS AFTER LAST SHORT EDIT SYNC
          if (existingAnno.render.sync > anno.sync) {
            continue;
          }
        }

        if (anno.remove == true) {
          delete this.reactions[anno._id];
        }

        await this.save.apply(anno, { overwrite: true, timeout: false }); //let result =
        /*if (result.redrawAction == true) {
          redrawAction = true;
        }*/
      }
      this.pipeline.publish("redraw_selection", {
        refresh: true,
        redrawCurrentAction: true,
        refreshActionBar: true,
        fromLong: true
      });
    });
    this.pipeline.subscribe("reactionAnnotation", "reaction", async (event) => {
      if (this.realtime.enabled == false) {
        return;
      }

      let data = copyObject(event);
      let annotation = this.annotations[data.reaction.annotation];
      if (annotation == null) {
        return;
      }
      let reactions = this.reactions[data.reaction.annotation];
      if (reactions == null) {
        this.reactions[data.reaction.annotation] = [];
        reactions = this.reactions[data.reaction.annotation];
      }
      if (data.change != null) {
        if (this.self.modify == data.member._id) {
          if (data.change > 0) {
            data.reaction.reacted = true;
          } else {
            data.reaction.reacted = false;
          }
        }
        let foundReaction = false;
        for (let i = 0; i < reactions.length; i++) {
          if (reactions[i]._id == data.reaction._id) {
            reactions[i].count += data.change;
            if (data.reaction.reacted != null) {
              reactions[i].reacted = data.reaction.reacted;
            }
            if (reactions[i].count < 1) {
              reactions.splice(i, 1);
              i--;
            }
            foundReaction = true;
            break;
          }
        }
        if (foundReaction == false) {
          data.reaction.count += data.change;
          reactions.push(data.reaction);
        }
      } else {
        for (let i = 0; i < reactions.length; i++) {
          if (reactions[i]._id == data.reaction._id) {
            reactions.splice(i, 1);
            break;
          }
        }
      }
      if (reactions.length < 1) {
        delete this.reactions[data.reaction.annotation];
      }
      await this.render.create(annotation);
    });

    // Handle lesson member changes:
    this.pipeline.subscribe("editorMemberUpdate", "update", (data) => {
      if (data.active == false || (data.hasOwnProperty("access") == true && data.access < this.minimumEditingAccess)) {
        this.removeRealtime(data._id);
      }
    });
    this.pipeline.subscribe("editorMemberLeave", "leave", (data) => {
      if (this.realtime.observing == data._id) {
        this.openAlert("warning", "<b>Member Left</b>The member you were observing left.");
      }
      this.removeRealtime(data._id);
      if (data.member != null && this.realtime.observed[data._id] != null) {
        delete this.realtime.observed[data._id];
        this.realtime.observedCount = Object.keys(this.realtime.observed).length;
      }
    });

    // Handle lesson setting updates:
    this.pipeline.subscribe("editorSettingsUpdate", "set", (data) => {
      if (data.settings != null) {
        objectUpdate(data.settings, this.settings);
        this.pipeline.publish("redraw_selection", { redrawActionBar: true });
      }
      if (data.hasOwnProperty("background") == true) {
        this.updateBackground(data.background);
      }
      this.updateInterface();
    });

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

    // Prevent instant tab closing if unsaved changes:
    this.pipeline.subscribe("editorCloseCheck", "beforeunload", (data) => {
      if (Object.keys(this.save.pendingSaves).length > 0 || this.save.synced == false) {
        if (data.returned != true) {
          data.event.preventDefault();
          data.event.returnValue = "";
          data.returned = true;
        }
        this.save.syncSave(true);
      }
    });

    // Check for a fullscreen change:
    this.pipeline.subscribe("optionsFullscreen", "fullscreenchange", (event) => {
      this.options.fullscreen = event.fullscreen;
    });
    this.options.fullscreen = document.fullscreenElement != null;

    // Hide comments if they're disabled:
    if (this.options.comments == false) {
      this.annotationHolder.setAttribute("hidecomments", "");
    }

    this.updateInterface();
    this.updateBackground();

    await this.render.setMarginSize();
    this.utils.centerWindowWithPage();
    this.updateChunks();
  }
}