modules["lesson/export"] = class {
  html = `<div class="eExportHolder"></div>`;
  css = {
    ".content": `transition: unset !important`,
    '.lPage[pagetype="export"]': `contain: unset !important; will-change: unset !important`,
    ".eExportHolder": `position: relative; width: fit-content; height: fit-content`,
    ".eExportHolder .eContent": `transition: unset !important`,
    ".eAnnotation[anno][hide] > div[hide]": `background: var(--pageColor)`,
    ".ePage[exporting]": `border-radius: 0px !important; border-top: unset`,
    ".ePage:not([exporting])": `display: none`,
    ".ePageRearrange": `display: none`
  };
  marginSize = 100;
  js = async (frame) => {
    this.lesson = this.parent.lesson;
    this.session = this.parent.session;

    let page = frame.closest(".content");
    let pageFrame = page.closest(".lPage");
    pageFrame.setAttribute("active", "");
    pageFrame.style.width = "fit-content";
    pageFrame.style.height = "fit-content";

    let pageHolder = page.closest(".lPageHolder");
    pageHolder.style.position = "absolute";
    pageHolder.style.width = "fit-content";
    pageHolder.style.height = "fit-content";
    pageHolder.style.contain = "unset";

    let contentHolder = frame.querySelector(".eExportHolder");

    this.editor = await this.setFrame("editor/editor", contentHolder, {
      construct: {
        id: this.parent.id,
        lesson: this.parent,
        self: this.parent.self,
        session: this.parent.session,
        sessionID: this.parent.sessionID,
        sources: this.parent.sources,
        collaborators: this.parent.collaborators,
        settings: this.parent.lesson.settings,
        resync: this.resync,
        backgroundColor: getParam("background") ?? this.lesson.background ?? "FFFFFF",
        exporting: true
      }
    });

    let pageContent = contentHolder.querySelector(".eAnnotations");

    let path = "lessons/join/annotations";
    let groupID = getParam("group");
    if (groupID != null) {
      path += "?group=" + groupID;
    }
    let templateID = getParam("template");
    if (templateID != null) {
      path += "?template=" + templateID;
    }
    let [annoCode, annoBody] = await sendRequest("GET", path, null, { session: this.parent.session }, { allowError: true });
    if (annoCode != 200 && connected == true) {
      return;
    }
    for (let i = 0; i < annoBody.annotations.length; i++) {
      let addAnno = annoBody.annotations[i];
      let existingAnno = this.editor.annotations[addAnno._id];
      if (existingAnno == null || existingAnno.render.sync < addAnno.sync) {
        this.editor.annotations[addAnno._id] = { render: addAnno };
      }
    }
    if (annoBody.reactions != null) {
      let reactedToObject = getObject(annoBody.reactedTo ?? [], "_id");
      for (let i = 0; i < annoBody.reactions.length; i++) {
        let addReaction = annoBody.reactions[i];
        let existingAnnoRecord = this.editor.reactions[addReaction.annotation];
        if (existingAnnoRecord == null) {
          this.editor.reactions[addReaction.annotation] = [];
          existingAnnoRecord = this.editor.reactions[addReaction.annotation];
        }
        delete addReaction.annotation;
        if (reactedToObject[addReaction._id + "_" + this.editor.self.modify] != null) {
          addReaction.reacted = true;
        }
        existingAnnoRecord.push(addReaction);
      }
    }
    for (let i = 0; i < annoBody.annotations.length; i++) {
      let existingAnno = this.editor.annotations[annoBody.annotations[i]._id];
      if (existingAnno != null) {
        await this.editor.utils.setAnnotationChunks(existingAnno);
      }
    }

    await this.editor.render.setMarginSize();

    this.resetAnnotationSize = () => {
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
        await this.editor.runUpdateCycle();
        await this.editor.render.processPageRenders(this.editor);
        if (window.quillCSSLoad != true && window.quillCSSLoad != null) {
          this.editor.exportPromises.push(new Promise(async (resolve) => {
            window.quillCSSLoad.addEventListener("load", resolve);
            window.quillCSSLoad.addEventListener("error", resolve);
          }));
        }
        if (window.mathquillCSSLoad != true && window.mathquillCSSLoad != null) {
          this.editor.exportPromises.push(new Promise(async (resolve) => {
            window.mathquillCSSLoad.addEventListener("load", resolve);
            window.mathquillCSSLoad.addEventListener("error", resolve);
          }));
        }
        if (this.editor.exportPromises.length > 0) {
          await Promise.all(this.editor.exportPromises);
        }
        resolve();
      });
      return handleRenderPromise;
    }

    this.exportStep = async (data) => {
      this.editor.exportPromises = [];
      if (currentTask == null) { // Prepare
        if (data.method == "thumbnail") {
          if (this.editor.annotationPages.length > 0) {
            currentPage = 1;
            currentTask = "set";
            pageScale = 1;
          } else {
            currentTask = "board";
          }
        } else if (data.method == "pages") {
          if (this.editor.annotationPages.length > 0) {
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
          if (this.editor.exportSelected == null) {
            pageID = (this.editor.annotationPages[currentPage - 1] ?? [])[0];
          } else {
            for (let i = currentPage - 1; i < this.editor.annotationPages.length; i++) {
              let annoID = (this.editor.annotationPages[i] ?? [])[0];
              if (annoID != null && this.editor.exportSelected.includes(annoID) == true) {
                currentPage = i + 1;
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
              handleRenderPromise = null;
              await this.editor.setZoom(pageScale); //((annotation.render.s[0] - (pageBorderSize * 2)) * pageScale) / annotation.render.s[0]);
              await this.editor.render.setMarginSize(true);
              let rect = this.editor.utils.getRect(annotation.render);
              let [topLeftX, topLeftY, bottomRightX, bottomRightY] = this.editor.math.rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);
              window.scrollTo(0, 0);
              pageContent.style.removeProperty("transform");
              let pageRect = pageContent.getBoundingClientRect();
              pageContent.style.transform = `translate(${-(pageRect.left + ((topLeftX + pageBorderSize) * this.editor.zoom))}px, ${-(pageRect.top + ((topLeftY + pageBorderSize) * this.editor.zoom))}px) scale(var(--zoom))`;
              let element = pageContent.querySelector('.eAnnotation[anno="' + pageID + '"]');
              if (element != null) {
                element.setAttribute("notransition", "");
                element.style.borderRadius = "0px";
                /*let border = element.querySelector("div[border]");
                if (border != null) {
                  border.remove();
                }*/
                currentPage++;
                if (this.editor.exportSelected == null) {
                  (async () => {
                    let annotation = this.editor.annotations[(this.editor.annotationPages[currentPage - 1] ?? [])[0]];
                    if (annotation != null) {
                      this.editor.visibleChunks.push(...annotation.chunks);
                      this.handleRendering();
                    }
                  })();
                }
                return { capture: true, done: false, width: Math.abs(bottomRightX - topLeftX) - (pageBorderSize * 2), height: Math.abs(bottomRightY - topLeftY) - (pageBorderSize * 2), page: currentPage - 1 }; // - (pageBorderSize * 2) //) * editor.zoom
              }
            }
          }
          break;
        case "board":
          this.editor.visibleChunks = Object.keys(this.editor.chunkAnnotations);
          await this.handleRendering();
          handleRenderPromise = null;
          this.resetAnnotationSize();
          return { capture: true, done: true, width: contentHolder.scrollWidth, height: contentHolder.scrollHeight };
      }

      return { capture: false, done: true };
    }

    this.parent.addEventListener(window, "message", async (event) => {
      if (event.data && event.data.type === "FROM_NODE") {
        if (window.navigationReady != null) {
          window.navigationReady(await this.exportStep(event.data.message));
        }
      }
    });

    window.exporter = this;

    if (window.exportReady != null) {
      window.exportReady();
    }
  }
}

//await window.exporter.exportStep({ method: "pages" });

/*
window.exportReady = () => {
  window.messageA({ data: { type: "FROM_NODE", message: { task: "setpage", page: 1 } } });
}
*/