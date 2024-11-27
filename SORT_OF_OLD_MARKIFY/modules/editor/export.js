modules["editor/export"] = {
  css: {
    //".eContent": `margin: 100vh 100vw`,
    ".ePage[exporting]": `border-radius: 0px !important; border-top: unset`,
    ".ePage:not([exporting])": `display: none`,
    ".ePageRearrange": `display: none`
  },
  marginSize: 100,
  resetAnnotationSize: async function () {
    this.minX = null;
    this.maxX = null;
    this.minY = null;
    this.maxY = null;
    let editor = await getModule("pages/editor");
    let annoKeys = Object.keys(editor.annotations);
    for (let i = 0; i < annoKeys.length; i++) {
      let anno = (editor.annotations[annoKeys[i]] ?? {}).render;
      if (anno == null) {
        continue;
      }
      if (editor.exportSelected != null && editor.exportSelected.includes(anno._id) == false) {
        continue;
      }
      
      let [width, height] = anno.s;
      let [x, y] = editor.getAbsolutePosition(anno);
      let rotate = anno.r ?? 0;
      if (rotate > 180) {
        rotate = -(360 - rotate);
      }
      if (width < 0) {
        width = -width;
        x -= width;
      }
      if (height < 0) {
        height = -height;
        y -= height;
      }
      let t = anno.t ?? 0;
      if (anno.b == "none" && anno.d != "line") {
        t = 0;
      }
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

    let contentFrame = editor.page.querySelector(".eContent");
    let content = contentFrame.querySelector(".eContentHolder");

    content.style.width = "fit-content";
    content.style.height = "fit-content";
    
    content.style.marginLeft = Math.ceil((-(this.minX ?? 0) * editor.zoom) + this.marginSize) + "px";
    content.style.marginRight = Math.ceil(((this.maxX ?? 0) * editor.zoom) + this.marginSize) + "px";
    content.style.marginTop = Math.ceil((-(this.minY ?? 0) * editor.zoom) + this.marginSize) + "px";
    content.style.marginBottom = Math.ceil(((this.maxY ?? 0) * editor.zoom) + this.marginSize) + "px";
  },
  js: async function (editor, utils, page) {
    fixed.style.display = "none";

    page.querySelector(".eContent").style.padding = "0px";
    page.querySelector(".eTopHolder").style.display = "none";
    page.querySelector(".eSide").style.display = "none";
    page.querySelector(".eBottomHolder").style.display = "none";
    let addPageHolder = page.querySelector(".eAddPagesHolder");
    if (addPageHolder != null) {
      addPageHolder.style.display = "none";
    }
    editor.addMargin = 0;

    let pageHolder = page.querySelector(".ePageHolder");
    
    //window.messageA({ data: { type: "FROM_NODE", message: { task: "setpage", page: 1 } } })
    //window.exportReady = () => { console.log("HEY") }

    //window.messageA = async (event) => {

    let currentTask;
    let currentPage = 1;

    let pageScale = 1.5;
    let pageBorderSize = 4;

    let handleRenderPromise;
    this.handleRendering = () => {
      if (handleRenderPromise != null) {
        return handleRenderPromise;
      }
      handleRenderPromise = new Promise(async (resolve) => {
        await editor.runUpdateCycle();
        await utils.processPageRenders(editor);
        if (editor.exportPromises.length > 0) {
          await Promise.all(editor.exportPromises);
        }
        resolve();
      });
      return handleRenderPromise;
    }

    this.exportStep = async (data) => {
      editor.exportPromises = [];
      if (currentTask == null) { // Prepare
        if (data.method == "thumbnail") {
          if (editor.annotationPages.length > 0) {
            currentPage = 1;
            currentTask = "set";
            pageScale = 1;
          } else {
            currentTask = "board";
          }
        } else if (data.method == "pages") {
          if (editor.annotationPages.length > 0) {
            currentPage = 1;
            currentTask = "set";
          } else {
            currentTask = "board";
          }
        } else if (data.method == "board") {
          currentTask = "board";
        } else if (data.method == "selected") {
          let justPages = true;
          for (let i = 0; i < data.selected.length; i++) {
            let render = (editor.annotations[data.selected[i]] ?? {}).render;
            if (render == null) {
              data.selected.splice(i, 1);
              i--;
            } else if (render.f != "page") {
              justPages = false;
            }
          }
          editor.exportSelected = data.selected;
          if (justPages != true) {
            currentTask = "board";
          } else {
            currentPage = 1;
            currentTask = "set";
          }
        } else {
          currentPage = 1;
          currentTask = "setpage";
        }
      }

      switch (currentTask) {
        case "set":
          let pageID;
          if (editor.exportSelected == null) {
            pageID = (editor.annotationPages[currentPage - 1] ?? [])[0];
          } else {
            for (let i = currentPage - 1; i < editor.annotationPages.length; i++) {
              let annoID = (editor.annotationPages[i] ?? [])[0];
              if (annoID != null && editor.exportSelected.includes(annoID) == true) {
                currentPage = i + 1;
                pageID = annoID;
                break;
              }
            }
          }
          if (pageID != null) {
            let annotation = editor.annotations[pageID];
            if (annotation != null) {
              editor.visibleChunks = annotation.chunks;
              await this.handleRendering();
              handleRenderPromise = null;
              await utils.setMarginSize(true);
              if (annotation.render != null) {
                let position = editor.getAbsolutePosition(annotation.render);
                await editor.setZoom(pageScale); //((annotation.render.s[0] - (pageBorderSize * 2)) * pageScale) / annotation.render.s[0]);
                window.scrollTo(0, 0);
                pageHolder.style.removeProperty("transform");
                let pageRect = pageHolder.getBoundingClientRect();
                pageHolder.style.transform = `translate(-${pageRect.left + ((position[0] + pageBorderSize) * editor.zoom)}px, -${pageRect.top + ((position[1] + pageBorderSize) * editor.zoom)}px) scale(var(--zoom))`;
              }
              let element = pageHolder.querySelector('.eAnnotation[anno="' + pageID + '"]');
              if (element != null) {
                element.setAttribute("notransition", "");
                element.style.borderRadius = "0px";
                let border = element.querySelector("div[border]");
                if (border != null) {
                  border.remove();
                }
                /*let title = element.querySelector("div[title]");
                if (title != null) {
                  title.style.margin = "4px";
                  title.style.borderTopLeftRadius = "0px";
                }*/
                currentPage++;
                if (editor.exportSelected == null) {
                  (async () => {
                    let annotation = editor.annotations[(editor.annotationPages[currentPage - 1] ?? [])[0]];
                    if (annotation != null) {
                      editor.visibleChunks.push(...annotation.chunks);
                      this.handleRendering();
                    }
                  })();
                }
                return { capture: true, done: false, width: annotation.render.s[0] - (pageBorderSize * 2), height: annotation.render.s[1] - (pageBorderSize * 2), page: currentPage - 1 }; // - (pageBorderSize * 2) //) * editor.zoom
              }
            }
          }
          break;
        case "board":
          editor.visibleChunks = Object.keys(editor.chunkAnnotations);
          await this.handleRendering();
          handleRenderPromise = null;
          await this.resetAnnotationSize();
          return { capture: true, done: true };
      }

      return { capture: false, done: true };
    }

    window.addEventListener("message", async (event) => {
      if (event.data && event.data.type === "FROM_NODE") {
        if (window.navigationReady != null) {
          window.navigationReady(await this.exportStep(event.data.message));
        }
      }
    });

    window.exporter = this;
    //await window.exporter.exportStep({ method: "pages" });
  }
}

/*
window.exportReady = () => {
  window.messageA({ data: { type: "FROM_NODE", message: { task: "setpage", page: 1 } } });
}
*/