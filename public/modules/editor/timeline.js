modules["editor/timeline"] = class {
  html = `
  <div class="timelineInterface customScroll">
    <div class="timelineTopHolder">
      <div class="timelineTop">
        <div class="timelineTopSection" left>
          <a class="timelineClose"></a>
          <div class="timelineTopDivider"></div>
          <button class="timelineRevert" title="Restore the document back to this state. Reverting does not overwrite later changes, but instead inserts a new change." disabled>Revert</button>
        </div>
        <div class="timelineTopSection" right>
          <button class="timelineZoom">100%</button>
        </div>
      </div>
    </div>
    <div class="timelineToolbarHolder eToolbarHolder" toolbarholder>
      <div class="eToolbar" keeptooltip notransition>
        <div class="eToolbarContent eVerticalToolsHolder">
          <button class="eTool" tool="select" tooltip="Select" selected><div></div></button>
          <button class="eTool" tool="pan" tooltip="Pan"><div></div></button>
        </div>
      </div>
    </div>
    <div class="timelineBottomHolder">
      <div class="timelineHistory">

      </div>
    </div>
  </div>
  <div class="timelineContentHolder customScroll" viewer></div>
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
    ".timelineClose": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".timelineClose:hover": `background: var(--hover)`,
    ".timelineClose svg": `width: 24px; height: 24px; transition: .2s`,
    ".timelineClose:hover svg": `transform: scale(.9)`,
    ".timelineTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".timelineRevert": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".timelineZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".timelineToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".timelineBottomHolder": `position: relative; display: flex; width: 100%; height: fit-content; margin-top: 8px; justify-content: center; visibility: visible`,
    ".timelineHistory": `box-sizing: border-box; width: calc(100% - 16px); max-width: 600px; height: 100px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`
  };
  js = async (frame) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let main = frame.querySelector(".timelineInterface");
    let contentHolder = frame.querySelector(".timelineContentHolder");

    let closeButton = main.querySelector(".timelineClose");
    let zoomButton = main.querySelector(".timelineZoom");

    let toolbarHolder = main.querySelector(".timelineToolbarHolder");
    let selectButton = toolbarHolder.querySelector('.eTool[tool="select"]');
    let panButton = toolbarHolder.querySelector('.eTool[tool="pan"]');

    this.editor = await this.setFrame("editor/editor", contentHolder, {
      construct: {
        lesson: this.lesson,
        self: { access: 0 }, //this.self,
        session: this.session,
        sessionID: this.sessionID,
        sources: this.sources,
        collaborators: this.collaborators,
        backgroundColor: this.backgroundColor,
        preferences: this.preferences
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

    selectButton.addEventListener("click", async () => {
      if (this.editor.toolbar != null) {
        this.editor.toolbar.toolbar.startTool(selectButton);
      }
    });
    panButton.addEventListener("click", async () => {
      if (this.editor.toolbar != null) {
        this.editor.toolbar.toolbar.startTool(panButton);
      }
    });

    this.updateInterface = () => {
      if ((account.settings ?? {}).toolbar != "right") {
        toolbarHolder.setAttribute("left", "");
        toolbarHolder.removeAttribute("right");
      } else {
        toolbarHolder.setAttribute("right", "");
        toolbarHolder.removeAttribute("left");
      }
    }
    this.pipeline.subscribe("accountUpdate", "account_settings", (event) => {
      if (event.settings.hasOwnProperty("toolbar") == true) {
        this.updateInterface();
      }
    });
    this.updateInterface();

    // Load Images:
    setSVG(closeButton, "../images/tooltips/close.svg");

    (async () => {
      await (await this.newModule("editor/toolbar")).js(this.editor);
    })();
  }
}