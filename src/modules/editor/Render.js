// RENDER : Handles rendering objects/annotations onto the board:

import { changeGlobalImports, randomString, getEpoch, sendRequest, sleep } from "@/crucial";

import { renderPage } from "./render/pdf/render-page";

import { rotatePointOrigin, rotatePoint } from "./math";

const annotations = changeGlobalImports(import.meta.glob("./render/annotations/**/*.js", { eager: true }));
const annotationsPath = "./render/annotations/";

import { PDFJS, PDFJS_WORKER_PATH } from "./imports";

/*
  _id - ID - The unique ID of the annotation
  f - FUNCTION - The type of tool to render
  p - POSITION - Position of annotation - [ X, Y ]
  page - PAGE - Page of annotation
  s - SIZE - Size of annotation - [ WIDTH, HEIGHT ]
  c - COLOR - Color of annotation
  i - INSIDE COLOR - Color of fill
  t - THICKNESS - Thickness of annotation
  b - BORDER - Include border
  o - OPACITY - Opacity of annotation
  d - DATA - Data, can change based on annotation, path of pen for example
*/

export class Render {
  constructor(editor) {
    this.editor = editor;

    this.editor.defaultChunks["0_0"] = {};
    this.editor.defaultChunks["0_-" + this.editor.chunkHeight] = {};
    this.editor.defaultChunks["-" + this.editor.chunkWidth + "_0"] = {};
    this.editor.defaultChunks["-" + this.editor.chunkWidth + "_-" + this.editor.chunkHeight] = {};
    this.editor.chunkAnnotations = { ...this.editor.defaultChunks, ...this.editor.chunkAnnotations };
  }

  fragmentQueue = [];
  fragmentStorage = {};
  pdfFileLoading = {};

  tempID() {
    return "pending_" + randomString(10) + Date.now();
  }
  generateID() {
    // 24 Hex Chars (MongoDB ObjectID compatible):
    // 8 Chars = Epoch Seconds
    // 4 Chars = Milliseconds from Epoch Seconds
    // 10 Chars = Randomly generated ID from instantiation
    // 2 Chars = Incrementing counter

    if (this.idSessionID == null) {
      let bytes = new Uint8Array(5);

      let cryptoLib;
      if (
        typeof globalThis != "undefined"
        && globalThis.crypto != null
      ) {
        cryptoLib = globalThis.crypto;
      } else if (typeof window != "undefined") {
        cryptoLib = window.crypto;
      }

      if (cryptoLib != null && cryptoLib.getRandomValues != null) {
        cryptoLib.getRandomValues(bytes);
      } else {
        for (let i = 0; i < 5; i++) {
          bytes[i] = Math.floor(Math.random() * 256);
        }
      }

      this.idSessionID = Array.from(bytes, b =>
        b.toString(16).padStart(2, "0")
      ).join("");
      this.idCounter = 0;
    }

    let now = Math.max(Math.floor(getEpoch()), this.idNow ?? 0);

    if (this.idCounter >= 256) {
      //while (now == this.idNow) {
      //  now = Math.floor(getEpoch());
      //}
      if (now <= this.idNow) {
        now = this.idNow + 1;
      }
      this.idCounter = 0;
    }

    this.idNow = now;

    let secondsTimestamp = Math.floor(this.idNow / 1000).toString(16).padStart(8, "0").slice(0, 8);
    let msTimestamp = (this.idNow % 1000).toString(16).padStart(4, "0");
    let counterHex = this.idCounter.toString(16).padStart(2, "0");

    this.idCounter++;

    return secondsTimestamp + msTimestamp + this.idSessionID + counterHex;
  }

  async setMarginSize(force) {
    if (force != true) {
      if (this.editor.exporting == true) {
        return;
      }
    }

    let chunks = Object.keys(this.editor.chunkAnnotations);
    let joinedChunks = chunks.join();
    if (joinedChunks != this.joinedChunks) {
      this.joinedChunks = joinedChunks;

      this.farLeft = 0;
      this.farRight = 0;
      this.setLeftMargin = 0;
      this.setRightMargin = 0;
      this.farTop = 0;
      this.farBottom = 0;
      this.setTopMargin = 0;
      this.setBottomMargin = 0;
      
      for (let i = 0; i < chunks.length; i++) {
        let splitPos = chunks[i].split("_");
        let [x, y] = [parseInt(splitPos[0]), parseInt(splitPos[1])];
        let left = -x;
        let right = x + this.editor.chunkWidth;
        let top = -y;
        let bottom = y + this.editor.chunkHeight;
        if (left > this.farLeft) {
          this.setLeftMargin = Math.ceil(left / 400) * 400;
          this.farLeft = this.setLeftMargin - 120;
        }
        if (right > this.farRight) {
          this.setRightMargin = Math.ceil(right / 400) * 400;
          this.farRight = this.setRightMargin - 120;
        }
        if (top > this.farTop) {
          this.setTopMargin = Math.ceil(top / 400) * 400;
          this.farTop = this.setTopMargin - 120;
        }
        if (bottom > this.farBottom) {
          this.setBottomMargin = Math.ceil(bottom / 400) * 400;
          this.farBottom = this.setBottomMargin - 120;
        }
      }
    }
    
    let halfPageWidth = this.editor.pageOffsetWidth / 2;
    let halfPageHeight = this.editor.pageOffsetHeight / 2;
    let setMarginLeft = Math.ceil((this.setLeftMargin * this.editor.zoom) + halfPageWidth);
    let setMarginRight = Math.ceil((this.setRightMargin * this.editor.zoom) + halfPageWidth);
    let setMarginTop = Math.ceil((this.setTopMargin * this.editor.zoom) + halfPageHeight);
    let setMarginBottom = Math.ceil((this.setBottomMargin * this.editor.zoom) + halfPageHeight);

    let checkWidth = false;
    let checkHeight = false;
    let scrollPosX;
    let scrollPosY;
    let contentLeft = this.marginLeft ?? 0;
    let contentTop = this.marginTop ?? 0;

    if (this.marginLeft != setMarginLeft) {
      scrollPosX = this.editor.scrollLeft;
      this.marginLeft = setMarginLeft;
      this.editor.editorContent.style.marginLeft = setMarginLeft + "px";
      checkWidth = true;
    }
    if (this.marginRight != setMarginRight) {
      scrollPosX = scrollPosX ?? this.editor.scrollLeft;
      this.marginRight = setMarginRight;
      this.editor.editorContent.style.marginRight = setMarginRight + "px";
      checkWidth = true;
    }
    if (this.marginTop != setMarginTop) {
      scrollPosY = this.editor.scrollTop;
      this.marginTop = setMarginTop;
      this.editor.editorContent.style.marginTop = setMarginTop + "px";
      checkHeight = true;
    }
    if (this.marginBottom != setMarginBottom) {
      scrollPosY = scrollPosY ?? this.editor.scrollTop;
      this.marginBottom = setMarginBottom;
      this.editor.editorContent.style.marginBottom = setMarginBottom + "px";
      checkHeight = true;
    }

    if (
      (checkWidth == true && this.editor.content.offsetWidth != this.lastOffsetWidth)
      || (checkHeight == true && this.editor.content.offsetHeight != this.lastOffsetHeight)
    ) {
      let scrollLeft;
      let scrollTop;
      if (scrollPosX != null) {
        scrollLeft = scrollPosX + (this.marginLeft - contentLeft);
      }
      if (scrollPosY != null) {
        scrollTop = scrollPosY + (this.marginTop - contentTop);
      }
      this.editor.scrollTo(scrollLeft, scrollTop);
      this.editor.adjustRealtimeHolder();
      await this.editor.pipeline.publish("redraw_selection", { transition: false });
      this.lastOffsetWidth = this.editor.content.offsetWidth;
      this.lastOffsetHeight = this.editor.content.offsetHeight;
    }
  }

  async renderFragment() {
    let currentQueue = [...this.fragmentQueue];
    this.fragmentQueue = [];
    while (currentQueue.length > 0) {
      let fragmentID = currentQueue.pop();
      let [fragment, holder] = this.fragmentStorage[fragmentID] ?? [];
      delete this.fragmentStorage[fragmentID];
      if (holder == null || fragment == null) {
        continue;
      }
      holder.appendChild(fragment);
    }
    await sleep(20);
    if (this.fragmentQueue.length > 0) {
      requestAnimationFrame(() => { this.renderFragment(); });
    } else {
      this.runningParentingRender = false;
    }
  }
  async pushParentingRender() {
    if (this.runningParentingRender == true) {
      return;
    }
    this.runningParentingRender = true;

    requestAnimationFrame(() => { this.renderFragment(); });
  }
  async addParentToQueue(annotation = { render: {} }, holder) {
    if ((annotation.component ?? {}).holder != null) {
      return holder;
    }
    if (annotation.render._id == null || annotation.animate == false) {
      return holder;
    }
    if (annotation.render.f == "page") {
      return holder;
    }
    if (this.editor.exporting == true) {
      return holder;
    }
    let fragmentID = annotation.render.parent ?? "annotations";
    let fragmentData = this.fragmentStorage[fragmentID];
    if (fragmentData == null) {
      this.fragmentStorage[fragmentID] = [document.createDocumentFragment(), holder];
      fragmentData = this.fragmentStorage[fragmentID];
      this.fragmentQueue.push(fragmentID);
      this.pushParentingRender();
    }
    return fragmentData[0];
  }

  async processPageRenders() {
    if (this.editor.pageRenderPipeline.running == true) {
      return;
    }
    this.editor.pageRenderPipeline.running = true;

    if (window.pdfjsLib == null) {
      await PDFJS(); // Load PDFJS
    }
    if ((pdfjsLib.GlobalWorkerOptions.workerSrc ?? "") == "") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = (await PDFJS_WORKER_PATH()).default;
    }

    while (
      this.editor.pageRenderPipeline.queue.length > 0
      || (this.editor.exporting == true && Object.keys(this.pdfFileLoading).length > 0)
    ) {
      let [annotation, sourceID, pageNumber, scopedFunction, renderer] = this.editor.pageRenderPipeline.queue.shift() ?? [];
      if (scopedFunction != null) {
        await scopedFunction(renderer, annotation, sourceID, pageNumber);
      }
      await sleep(1);
    }

    this.editor.pageRenderPipeline.running = false;
  }
  async renderPage(renderer, annotation, sourceID, pageNumber) {
    return await renderPage(renderer, annotation, sourceID, pageNumber);
  }
  async addPageToQueue(annotation, sourceID, pageNumber, forceRunRender) {
    let sourcePageId = sourceID + "_" + pageNumber;
    this.editor.pageRenderPipeline.queue.push([annotation, sourceID, pageNumber, this.renderPage, this]);
    if (this.editor.exporting != true || forceRunRender == true) {
      queueMicrotask(() => { this.processPageRenders(); });
    }
  }

  createSVG(parent, type) {
    let newSVG = document.createElementNS("http://www.w3.org/2000/svg", type);
    parent.appendChild(newSVG);
    return newSVG;
  }

  async loadModule(type) {
    let moduleLoad = annotations[annotationsPath + type + ".js"];
    if (moduleLoad == null) {
      return;
    }
    if (typeof moduleLoad == "function") {
      moduleLoad = await moduleLoad();
    }
    if (moduleLoad != null) {
      return await this.editor.newModule(moduleLoad.Annotation);
    }
  }
  async getModule(annotation, type) {
    if ((annotation ?? {}).component != null) {
      return annotation.component;
    }
    return await this.loadModule(type);
  }

  async create(annotation, long) {
    if (annotation == null) {
      return {};
    }
    /*if (annotation.pointer != null) { // If synced is availiable, update to it
      annotation = this.editor.annotations[annotation.pointer] ?? annotation;
    }*/
    let render = annotation.render;
    if (annotation.render == null) {
      return {};
    }

    let { _id, p: position, s: size, parent } = render; // Must combine these back before render function

    if (this.editor.exportSelected != null) {
      if (this.editor.exportSelected.includes(_id) == false) {
        let currentAnnoCheck = render;
        let checkedParents = [];
        let isValid = false;
        while (currentAnnoCheck.parent != null) {
          let annoid = currentAnnoCheck.parent;
          if (annoid == null || checkedParents.includes(annoid) == true) {
            break;
          }
          checkedParents.push(annoid);
          let annotation = this.editor.annotations[annoid];
          if (annotation == null) {
            break;
          }
          currentAnnoCheck = annotation.render ?? {};
          if (this.editor.exportSelected.includes(annoid) == true) {
            isValid = true;
            break;
          }
        }
        if (isValid == false) {
          return {};
        }
      } else if (render.parent != null) {
        let { x: absX, y: absY } = this.editor.utils.getAbsolutePosition(render);
        parent = null;
        position = [absX, absY];
      }
    }

    let holder = this.editor.annotationHolder;
    let parentAnnotation
    if (parent != null) {
      parentAnnotation = this.editor.annotations[parent] ?? {};
      /*if (parentAnnotation.pointer != null) {
        parentAnnotation = this.editor.annotations[parentAnnotation.pointer] ?? parentAnnotation;
      }*/
      if (parentAnnotation.render != null) {
        if (parentAnnotation.component == null && parentAnnotation.render.parent != _id) {
          parentAnnotation = await this.create(parentAnnotation);
        }
        if (parentAnnotation.component != null) {
          holder = parentAnnotation.component.setContainer();
        }
      }
      if (parentAnnotation.renderedChildren == null) {
        parentAnnotation.renderedChildren = {};
      }
      parentAnnotation.renderedChildren[_id] = annotation;
    }

    let [xPos, yPos] = position ?? [0, 0];
    let [width, height] = size ?? [1, 1];
    let thickness = this.editor.utils.getThickness(render);
    if (width < 0) {
      width = -width;
      xPos -= width + thickness;
    }
    if (height < 0) {
      height = -height;
      yPos -= height + thickness;
    }

    if (annotation.component == null) {
      if (annotation.loadComponent == null) {
        annotation.loadComponent = new Promise(async (resolve) => {
          annotation.component = await this.loadModule(render.f);
          resolve(annotation.component);
          delete annotation.loadComponent;
        });
      }
      await annotation.loadComponent;
    } else {
      if (annotation.component.parentID != parent && annotation.component.parentID != null) {
        let prevParentAnnotation = this.editor.annotations[annotation.component.parentID] ?? {};
        if (prevParentAnnotation.renderedChildren != null) {
          delete prevParentAnnotation.renderedChildren[_id];
        }
      }
    }
    if (annotation.component == null) {
      return {};
    }

    annotation.component.editor = this.editor;
    annotation.component.annotation = annotation;
    annotation.component.properties = { ...render, p: [xPos, yPos], s: [width, height], parent: parent };
    annotation.component.holder = await this.addParentToQueue(annotation, holder); //holder ?? annotations;
    annotation.component.parentID = parent;

    annotation.component.animate = annotation.animate;

    if (annotation.component.render != null) {
      await annotation.component.render();
      if (annotation.component == null) {
        return annotation;
      }
    }

    if (annotation.component.getContainer != null) {
      let container = annotation.component.getContainer();
      if (container != null) {
        let [sizeWidth, sizeHeight] = [(render.s ?? [])[0] ?? 1, (render.s ?? [])[1] ?? 1];
        if (render.resizing == null) {
          container.style.width = (width + thickness) + "px";
          container.style.height = (height + thickness) + "px";
          if (container.hasAttribute("notransition") == true) {
            container.removeAttribute("notransition");
            container.style.left = "0px";
            container.style.top = "0px";
            container.style.removeProperty("right");
            container.style.removeProperty("bottom");
            container.style.transformOrigin = "center";
          }
        } else {
          container.setAttribute("notransition", "");
          let rect = this.editor.utils.getRect(render);
          let [handle, resizeX, resizeY] = render.resizing;
          let annoX;
          let annoY;
          let finishX;
          let finishY;
          switch (handle) {
            case "bottomright":
              [annoX, annoY] = rotatePointOrigin(rect.x, rect.y, rect.centerX, rect.centerY, rect.rotation);
              [finishX, finishY] = rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
              if (sizeWidth > 0) {
                container.style.left = finishX + "px";
                container.style.removeProperty("right");
              } else {
                container.style.right = finishX + "px";
                container.style.removeProperty("left");
              }
              if (sizeHeight > 0) {
                container.style.top = finishY + "px";
                container.style.removeProperty("bottom");
              } else {
                container.style.bottom = finishY + "px";
                container.style.removeProperty("top");
              }
              break;
            case "topleft":
              [annoX, annoY] = rotatePointOrigin(rect.endX, rect.endY, rect.centerX, rect.centerY, rect.rotation);
              [finishX, finishY] = rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
              if (sizeWidth > 0) {
                container.style.right = -finishX + "px";
                container.style.removeProperty("left");
              } else {
                container.style.left = -finishX + "px";
                container.style.removeProperty("right");
              }
              if (sizeHeight > 0) {
                container.style.bottom = -finishY + "px";
                container.style.removeProperty("top");
              } else {
                container.style.top = -finishY + "px";
                container.style.removeProperty("bottom");
              }
              break;
            case "topright":
              [annoX, annoY] = rotatePointOrigin(rect.x, rect.endY, rect.centerX, rect.centerY, rect.rotation);
              [finishX, finishY] = rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
              if (sizeWidth > 0) {
                container.style.left = finishX + "px";
                container.style.removeProperty("right");
              } else {
                container.style.right = finishX + "px";
                container.style.removeProperty("left");
              }
              if (sizeHeight > 0) {
                container.style.bottom = -finishY + "px";
                container.style.removeProperty("top");
              } else {
                container.style.top = -finishY + "px";
                container.style.removeProperty("bottom");
              }
              break;
            case "bottomleft":
              [annoX, annoY] = rotatePointOrigin(rect.endX, rect.y, rect.centerX, rect.centerY, rect.rotation);
              [finishX, finishY] = rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
              if (sizeWidth > 0) {
                container.style.right = -finishX + "px";
                container.style.removeProperty("left");
              } else {
                container.style.left = -finishX + "px";
                container.style.removeProperty("right");
              }
              if (sizeHeight > 0) {
                container.style.top = finishY + "px";
                container.style.removeProperty("bottom");
              } else {
                container.style.bottom = finishY + "px";
                container.style.removeProperty("top");
              }
          }
        }
        if (sizeWidth < 0 && sizeHeight < 0) {
          container.style.transform = "scale(-1)";
        } else if (sizeWidth < 0) {
          container.style.transform = "scale(-1,1)";
        } else if (sizeHeight < 0) {
          container.style.transform = "scale(1,-1)";
        } else {
          container.style.removeProperty("transform");
        }
      }
    }

    if (render.remove != true) {
      if (annotation.component.show != null) {
        annotation.component.show();
      }

      if (annotation.renderedChildren != null) {
        let redrawChildrenFunction = (children) => {
          let redrawChildren = Object.values(children);
          for (let i = 0; i < redrawChildren.length; i++) {
            let child = redrawChildren[i];
            if (child.component != null) {
              if (child.component.REDRAW_ON_PARENT_UPDATE == true) {
                if (child.render.p != null && child.render.s != null) {
                  this.create({ ...child, animate: annotation.animate ?? child.animate });
                }
              }
              if (child.renderedChildren != null) {
                redrawChildrenFunction(child.renderedChildren);
              }
            }
          }
        }
        redrawChildrenFunction(annotation.renderedChildren);
      }
    } else {
      if (long != true) {
        await this.hide(annotation);
      } else {
        await this.editor.utils.setAnnotationChunks({ ...annotation, render: { ...render, remove: true } });
        delete this.editor.annotations[_id];
      }
    }

    return annotation;
  }
  hide(annotation) {
    if (annotation == null || annotation.component == null) {
      return;
    }
    let render = annotation.render ?? {};
    annotation.component.properties = render;
    annotation.component.annotation = annotation;
    annotation.component.hide();
    if (annotation.component.embedFrame != null) {
      annotation.component.embedFrame.remove();
    }
    if (this.editor.selecting[render._id] != null) {
      this.editor.cleanupSelections();
    }
    this.editor.removeSelection(render._id);
  }
  remove(annotation) {
    if (annotation == null) {
      return;
    }
    if (annotation.component != null) {
      this.hide(annotation);
      annotation.component.remove();
      annotation.component = null;
    }
    let render = annotation.render;
    if (render != null) {
      let parentAnnotation = this.editor.annotations[render.parent] ?? {};
      /*if (parentAnnotation.pointer != null) {
        parentAnnotation = this.editor.annotations[parentAnnotation.pointer] ?? parentAnnotation;
      }*/
      if (parentAnnotation.renderedChildren != null) {
        delete parentAnnotation.renderedChildren[render._id];
      }
      this.editor.pipeline.unsubscribe("annotation" + render._id);
    }
  }
}