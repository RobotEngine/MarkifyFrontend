modules["editor/timeline"] = class {
  html = `
  <div class="timelineInterface customScroll">
    <div class="timelineTopHolder">
      <div class="timelineTop">
        <div class="timelineTopSection" left>
          <a class="timelineClose"></a>
        </div>
        <div class="timelineTopSection" right>
          <button class="timelineZoom">100%</button>
        </div>
      </div>
    </div>
    <div class="timelineBottomHolder">
      
    </div>
  </div>
  <div class="timelineContentHolder customScroll"></div>
  `;
  css = {
    ".timelineInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; overflow: scroll; z-index: 2`,
    ".timelineContentHolder": `position: relative; width: 100%; height: 100%; overflow: scroll; z-index: 1; transition: .5s`,

    ".timelineTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".timelineTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
    ".timelineTop::-webkit-scrollbar": `display: none`,
    ".timelineTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".timelineTopSection[left]": `border-bottom-right-radius: 12px`,
    ".timelineTopSection[right]": `border-bottom-left-radius: 12px`,
    ".timelineClose": `display: flex; width: 38px; height: 38px; padding: 0; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".timelineClose:hover": `background: var(--hover)`,
    ".timelineClose svg": `width: 24px; height: 24px; transition: .2s`,
    ".timelineClose:hover svg": `transform: scale(.9)`,
    ".timelineZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
  };
  js = async (frame) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let main = frame.querySelector(".timelineInterface");
    let contentHolder = frame.querySelector(".timelineContentHolder");

    let closeButton = main.querySelector(".timelineClose");
    let zoomButton = main.querySelector(".timelineZoom");

    this.editor = await this.setFrame("editor/editor", contentHolder, {
      construct: {
        self: this.self,
        session: this.session,
        sessionID: this.sessionID,
        sources: this.sources,
        collaborators: this.collaborators,
        backgroundColor: this.backgroundColor
      }
    });
    this.pipeline = this.editor.pipeline;
    /*if (this.reactions != null) {
      this.editor.reactions = copyObject(this.reactions);
    }*/
    if (this.annotations != null) {
      let annotations = Object.entries(this.annotations);
      for (let i = 0; i < annotations.length; i++) {
        let [annoID, annotation] = annotations[i];
        this.editor.annotations[annoID] = { render: copyObject(annotation.render) };
        await this.editor.utils.setAnnotationChunks(this.editor.annotations[annoID]);
      }
    }
    await this.editor.render.setMarginSize();
    await this.editor.updateChunks();
    await this.editor.utils.centerWindowWithPage();
    
    closeButton.addEventListener("click", () => {
      if (this.close != null) {
        this.close();
      }
    });
    this.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      zoomButton.textContent = Math.round(event.zoom * 100) + "%";
    });
    zoomButton.addEventListener("click", () => {
      dropdownModule.open(zoomButton, "dropdowns/lesson/zoom", { parent: this });
    });

    // Load Images:
    setSVG(closeButton, "../images/tooltips/close.svg");
  }
}