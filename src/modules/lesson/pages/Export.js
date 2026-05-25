/*

Exporter Debugging:

await window.exporter.exportStep({ method: "pages" });

await window.exporter.exportStep({ method: "board" });

await window.exporter.exportStep({ method: "selected", selected: [] });

await window.exporter.exportStep({ method: "thumbnail" });

window.exportReady = () => {
  window.messageA({ data: { type: "FROM_NODE", message: { task: "setpage", page: 1 } } });
}

*/

import { getParam, sendRequest, connected } from "@/crucial";

import { Editor } from "@modules/editor/Editor";
import { rotatedBounds } from "@modules/editor/math";

export class Page {
  marginSize = 100;

  //currentTask = null;
  currentPage = 1;
  pageScale = 1.5;
  pageBorderSize = 4;

  html = `<div class="eExportHolder"></div>`;
  css = {
    ".loading": `display: none`,
    ".content": `transition: unset !important`,
    '.lPage[pagetype="export"]': `transition: unset !important; contain: unset !important; will-change: unset !important`,
    ".eExportHolder": `position: relative; width: fit-content; height: fit-content`,
    ".eExportHolder .eContent": `transition: unset !important`,
    ".eAnnotation[anno][hide] > div[hide]": `background: var(--pageColor)`,
    ".ePage[exporting]": `border-radius: 0px !important; border-top: unset`,
    ".ePage:not([exporting])": `display: none`,
    ".ePageRearrange": `display: none`
  };

  resetAnnotationSize() {
    this.minX = null;
    this.maxX = null;
    this.minY = null;
    this.maxY = null;
    let annoKeys = Object.keys(this.editor.annotations);
    for (let i = 0; i < annoKeys.length; i++) {
      let anno = (this.editor.annotations[annoKeys[i]] ?? {}).render;
      if (anno == null) {
        continue;
      }
      if (this.editor.exportSelected != null && this.editor.exportSelected.includes(anno._id) == false) {
        continue;
      }
      
      let { x, y, width, height, rotation: rotate, thickness: t } = this.editor.utils.getRect(anno);
      let halfT = t / 2;
  
      let radian = rotate * (Math.PI / 180);
      let thickWidth = width + t;
      let thickHeight = height + t;
      let changedWidth = ((Math.abs(thickWidth * Math.cos(radian)) + Math.abs(thickHeight * Math.sin(radian))) - thickWidth) / 2;
      let changedHeight = ((Math.abs(thickWidth * Math.sin(radian)) + Math.abs(thickHeight * Math.cos(radian))) - thickHeight) / 2;
  
      let setMinX = x + halfT - changedWidth;
      this.minX = Math.min(this.minX ?? setMinX, setMinX);
      let setMaxX = x + width + t + halfT + changedWidth;
      this.maxX = Math.max(this.maxX ?? setMaxX, setMaxX);
      let setMinY = y + halfT - changedHeight;
      this.minY = Math.min(this.minY ?? setMinY, setMinY);
      let setMaxY = y + t + height + halfT + changedHeight;
      this.maxY = Math.max(this.maxY ?? setMaxY, setMaxY);
    }

    let content = this.editor.contentHolder.querySelector(".eEditorContent");

    content.style.width = "fit-content";
    content.style.height = "fit-content";
    
    content.style.marginLeft = Math.ceil((-(this.minX ?? 0) * this.editor.zoom) + this.marginSize) + "px";
    content.style.marginRight = Math.ceil(((this.maxX ?? 0) * this.editor.zoom) + this.marginSize) + "px";
    content.style.marginTop = Math.ceil((-(this.minY ?? 0) * this.editor.zoom) + this.marginSize) + "px";
    content.style.marginBottom = Math.ceil(((this.maxY ?? 0) * this.editor.zoom) + this.marginSize) + "px";
  }

  handleRendering() {
    if (this.handleRenderPromise != null) {
      return this.handleRenderPromise;
    }

    this.handleRenderPromise = new Promise(async (resolve) => {
      await this.editor.runUpdateCycle();
      await this.editor.render.processPageRenders(this.editor);

      if (this.parent.quillStylesLoaded != true && this.parent.quillStylesPromise != null) {
        this.editor.exportPromises.push(this.parent.quillStylesPromise);
      }
      if (this.parent.mathquillStylesLoaded != true && this.parent.mathquillStylesPromise != null) {
        this.editor.exportPromises.push(this.parent.mathquillStylesPromise);
      }
      if (this.editor.exportPromises.length > 0) {
        await Promise.all(this.editor.exportPromises);
      }
      
      this.handleRenderPromise = null;

      resolve();
    });
    
    return this.handleRenderPromise;
  }

  async exportStep(data) {
    this.editor.exportPromises = [];
    if (this.currentTask == null) { // Prepare
      if (data.method == "thumbnail") {
        if (this.editor.annotationPages.length > 0) {
          this.currentPage = 1;
          this.currentTask = "set";
          this.pageScale = 1;
        } else {
          this.currentTask = "board";
        }
      } else if (data.method == "pages") {
        if (this.editor.annotationPages.length > 0) {
          this.currentPage = 1;
          this.currentTask = "set";
        } else {
          this.currentTask = "board";
        }
      } else if (data.method == "board") {
        this.currentTask = "board";
      } else if (data.method == "selected") {
        let justPages = true;
        for (let i = 0; i < data.selected.length; i++) {
          let render = (this.editor.annotations[data.selected[i]] ?? {}).render;
          if (render == null) {
            data.selected.splice(i, 1);
            i--;
          } else if (render.f != "page") {
            justPages = false;
          }
        }
        this.editor.exportSelected = data.selected;
        if (justPages != true) {
          this.currentTask = "board";
        } else {
          this.currentPage = 1;
          this.currentTask = "set";
        }
      } else {
        this.currentPage = 1;
        this.currentTask = "setpage";
      }
    }

    switch (this.currentTask) {
      case "set":
        let pageID;
        if (this.editor.exportSelected == null) {
          pageID = (this.editor.annotationPages[this.currentPage - 1] ?? [])[0];
        } else {
          for (let i = this.currentPage - 1; i < this.editor.annotationPages.length; i++) {
            let annoID = (this.editor.annotationPages[i] ?? [])[0];
            if (annoID != null && this.editor.exportSelected.includes(annoID) == true) {
              this.currentPage = i + 1;
              pageID = annoID;
              break;
            }
          }
        }
        if (pageID != null) {
          let annotation = this.editor.annotations[pageID];
          if (annotation != null && annotation.render != null) {
            this.editor.visibleChunks = annotation.chunks;
            await this.handleRendering();
            await this.editor.setZoom(this.pageScale);
            await this.editor.render.setMarginSize(true);
            let rect = this.editor.utils.getRect(annotation.render);
            let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);
            window.scrollTo(0, 0);
            this.pageContent.style.removeProperty("transform");
            let pageRect = this.pageContent.getBoundingClientRect();
            this.pageContent.style.transform = `translate(${-(pageRect.left + ((topLeftX + this.pageBorderSize) * this.editor.zoom))}px, ${-(pageRect.top + ((topLeftY + this.pageBorderSize) * this.editor.zoom))}px) scale(var(--zoom))`;
            let element = this.pageContent.querySelector('.eAnnotation[anno="' + pageID + '"]');
            if (element != null) {
              element.setAttribute("notransition", "");
              element.style.borderRadius = "0px";
              this.currentPage++;
              if (this.editor.exportSelected == null) {
                (async () => {
                  let annotation = this.editor.annotations[(this.editor.annotationPages[this.currentPage - 1] ?? [])[0]];
                  if (annotation != null) {
                    this.editor.visibleChunks.push(...annotation.chunks);
                    this.handleRendering();
                  }
                })();
              }
              return { capture: true, done: false, width: Math.abs(bottomRightX - topLeftX) - (this.pageBorderSize * 2), height: Math.abs(bottomRightY - topLeftY) - (this.pageBorderSize * 2), page: this.currentPage - 1 };
            }
          }
        }
        break;
      case "board":
        this.editor.visibleChunks = Object.keys(this.editor.chunkAnnotations);
        await this.handleRendering();
        this.resetAnnotationSize();
        return { capture: true, done: true, width: this.contentHolder.scrollWidth, height: this.contentHolder.scrollHeight };
    }

    return { capture: false, done: true };
  }

  async js(frame) {
    this.lesson = this.parent.lesson;
    this.session = this.parent.session;

    this.page = frame.closest(".content");

    this.pageFrame = this.page.closest(".lPage");
    this.pageFrame.setAttribute("active", "");
    this.pageFrame.style.width = "fit-content";
    this.pageFrame.style.height = "fit-content";

    this.pageHolder = this.page.closest(".lPageHolder");
    this.pageHolder.style.position = "absolute";
    this.pageHolder.style.width = "fit-content";
    this.pageHolder.style.height = "fit-content";
    this.pageHolder.style.contain = "unset";

    this.contentHolder = frame.querySelector(".eExportHolder");

    // Create editor:
    this.editor = await this.setFrame(Editor, this.contentHolder, {
      construct: {
        id: this.parent.id,
        lesson: this.parent,
        self: this.parent.self,
        session: this.parent.session,
        sessionID: this.parent.sessionID,
        sources: this.parent.sources,
        pageRenderPipeline: this.parent.pageRenderPipeline,
        collaborators: this.parent.collaborators,
        settings: this.parent.lesson.settings,
        resync: this.resync,
        backgroundColor: getParam("background") ?? "FFFFFF",
        exporting: true
      }
    });

    this.pageContent = this.contentHolder.querySelector(".eAnnotations");

    // Fetch annotations:
    let path = "lessons/join/annotations";
    let groupID = getParam("group");
    if (groupID != null) {
      path += "?group=" + groupID;
    }
    let templateID = getParam("template");
    if (templateID != null) {
      path += "?template=" + templateID;
    }
    let [annoCode, annoBody] = await sendRequest("GET", path, null, { session: this.parent.session });
    if (annoCode != 200 && connected == true) {
      return;
    }
    await this.editor.loadAnnotations(annoBody);

    // Create Puppeteer message listener:
    this.parent.addEventListener(window, "message", async (event) => {
      if (event.data && event.data.type === "FROM_NODE") {
        if (window.navigationReady != null) {
          window.navigationReady(await this.exportStep(event.data.message));
        }
      }
    });

    // FOR DEBUGGING PURPOSES:
    window.exporter = this;
    if (window.exportReady != null) {
      window.exportReady();
    }
  }
}