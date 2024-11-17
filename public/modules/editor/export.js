modules["editor/export"] = {
  css: {
    //".eContent": `margin: 100vh 100vw`,
    ".ePage[exporting]": `border-radius: 0px !important; border-top: unset`,
    ".ePage:not([exporting])": `display: none`,
    ".ePageRearrange": `display: none`
  },
  resetAnnotationSize: async function () {
    this.farLeft = 0;
    this.farRight = 0;
    this.setLeftMargin = 0;
    this.setRightMargin = 0;
    this.farTop = 0;
    this.farBottom = 0;
    this.setTopMargin = 0;
    this.setBottomMargin = 0;
    this.maxLayer = 0;
    this.minLayer = 0;
    let editor = await getModule("pages/editor");
    let annoKeys = Object.keys(editor.annotations);
    for (let i = 0; i < annoKeys.length; i++) {
      let anno = (editor.annotations[annoKeys[i]] ?? {}).render;
      if (anno != null) {
        await this.checkAnnotationSize(anno, true);
      }
    }
    await this.checkAnnotationSize();
  },
  checkAnnotationSize: async function (anno) {
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let contentFrame = editor.page.querySelector(".eContent");
    let content = contentFrame.querySelector(".eContentHolder");
    content.style.width = "fit-content";
    content.style.height = "fit-content";
    if (anno != null && anno.p != null) {
      if (editor.exporting == true) {
        if (editor.exportSelected != null && editor.exportSelected.includes(anno._id) == false) {
          return;
        }
        let page = editor.page.querySelector('.ePage[pageid="' + (anno.page ?? "") + '"]');
        if (page != null && page.hasAttribute("exporting") == false) {
          return;
        }
        if (getParam("no_expand") == "true") {
          return;
        }
      }

      if ((anno._id ?? "").startsWith("pending_") != true || anno.done == true) {
        if (anno.remove != true) {
          let position = editor.getAbsolutePosition(anno);
          let annoHolder = await utils.annoHolder(anno.page);
          let left = -position[0];
          let right = position[0] + anno.s[0] - annoHolder.offsetWidth;
          let top = -position[1];
          let bottom = position[1] + anno.s[0] - annoHolder.offsetHeight;
          if (left > this.farLeft) {
            this.setLeftMargin = Math.ceil(left / 400) * 400;
            this.farLeft = this.setLeftMargin - 120;
          }
          if (right > this.farRight) {
            this.setRightMargin = Math.ceil(right / 400) * 400;
            this.farRight = this.setRightMargin - 120;
          }
          if (editor.lesson.type != "standard") {
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
      }
    }
    this.marginLeft = (this.setLeftMargin * editor.zoom) + editor.addMargin;
    this.marginTop = (this.setTopMargin * editor.zoom) + editor.addMargin;
    content.style.marginLeft = (Math.ceil(this.marginLeft / 40) * 40) + "px";
    content.style.marginRight = (Math.ceil(((this.setRightMargin * editor.zoom) + editor.addMargin) / 40) * 40) + "px";
    if (editor.lesson.type != "standard") {
      content.style.marginTop = (Math.ceil(this.marginTop / 40) * 40) + "px";
      content.style.marginBottom = (Math.ceil(((this.setBottomMargin * editor.zoom) + editor.addMargin) / 40) * 40) + "px";
    }
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

    await editor.setZoom(1.5);

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
          if (editor.lesson.type != "standard") {
            if (editor.annotationPages.length > 0) {
              currentPage = 1;
              currentTask = "set";
            } else {
              currentTask = "board";
            }
          } else {
            currentPage = 1;
            currentTask = "setpage";
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
          let pageBorderWidth = 4;
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
                window.scrollTo(0, 0);
                pageHolder.style.removeProperty("transform");
                let pageRect = pageHolder.getBoundingClientRect();
                pageHolder.style.transform = `translate(-${pageRect.left + (position[0] * editor.zoom)}px, -${pageRect.top + (position[1] * editor.zoom)}px) scale(var(--zoom))`; // + pageBorderWidth)
              }
              let element = pageHolder.querySelector('.eAnnotation[anno="' + pageID + '"]');
              if (element != null) {
                element.style.borderRadius = "0px";
                let border = element.querySelector("div[border]");
                if (border != null) {
                  border.remove();
                }
                let title = element.querySelector("div[title]");
                if (title != null) {
                  title.style.margin = "4px";
                  title.style.borderTopLeftRadius = "0px";
                }
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
                return { capture: true, done: false, width: annotation.render.s[0], height: annotation.render.s[1], page: currentPage - 1 }; // - (pageBorderWidth * 2) //) * editor.zoom
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
          //break;
        case "setpage":
          let prevExport = pageHolder.querySelector(".ePage[exporting]");
          if (prevExport != null) {
            prevExport.removeAttribute("exporting");
          } else {
            currentPage = 1;
            let annoKeys = Object.keys(editor.annotations);
            for (let i = 0; i < annoKeys.length; i++) {
              await utils.render((editor.annotations[annoKeys[i]] ?? {}).render);
            }
          }
          let page = pageHolder.children[currentPage - 1];
          if (page != null) {
            page.setAttribute("exporting", "");
            pageHolder.style.removeProperty("width");
            pageHolder.style.removeProperty("height");
            //pageHolder.style.removeProperty("transform");
            //window.scrollTo(0, 0);
            //pageHolder.style.transform = `translate(${page.getBoundingClientRect().left}px, -${page.getBoundingClientRect().top}px)`;
            //if (editor.exportPromises.length > 0) {
            //  await Promise.all(editor.exportPromises)
            //}
            await this.resetAnnotationSize();
            currentPage++;
            return { capture: true, done: false };
          } else {
            //pageHolder.style.width = "250px";
            //pageHolder.style.height = "250px";
          }
          //editor.visibleChunks = Object.keys(editor.chunkAnnotations);
          //await editor.updatePages();
          //await this.resetAnnotationSize();
        //  break;
        //case "freeboard":
        //  await this.resetAnnotationSize();
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