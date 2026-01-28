modules["editor/timeline"] = class {
  html = `
  <div class="timelineInterface customScroll">
    <div class="timelineTopHolder">
      <div class="timelineTop">
        <div class="timelineTopSection" left>
          <a class="timelineClose"></a>
          <div class="timelineTopDivider" revert></div>
          <button class="timelineRevert" title="Restore the document back to this state. Reverting does not overwrite later changes, but instead inserts a new change." disabled>Revert</button>
        </div>
        <div class="timelineTopSection" right>
          <button class="timelineFilter" title="Filter by specific collaborators to see their contributions." dropdowntitle="Filter" disabled>Filter<span title="Number of selected collaborators."></span></button>
          <div class="timelineTopDivider"></div>
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
      <div class="timelineHistory" disabled>
        <div class="timelineHistorySliderHolder">
          <div class="timelineHistorySlider">
            <div class="timelineHistoryBar"><div class="timelineHistoryBarTrack"><div progress></div><div loader></div></div></div>
            <div class="timelineHistoryTrack"><button></button></div>
          </div>
        </div>
        <div class="timelineHistoryInfo">
          <div class="timelineHistoryDetail">
            <div class="timelineHistoryMemberHolder">
              <div class="timelineHistoryMember">
                <div profileholder>
                  <div cursor></div>
                  <div profile><img src="../images/profiles/default.svg" /></div>
                </div>
                <div content>
                  <div name></div>
                  <div email></div>
                </div>
              </div>
            </div>
            <div class="timelineHistoryTime"></div>
          </div>
          <div class="timelineHistoryChange">
            <button class="timelineHistorySkim" back disabled></button>
            <div class="timelineHistoryCurrentChange"><b>0</b> / 0</div>
            <button class="timelineHistorySkim" next disabled></button>
            <button class="timelineHistorySkim" play><div play></div><div pause hidden></div></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="timelineContentHolder customScroll" viewer></div>
  <div class="timelineDisable"></div>
  `;
  css = {
    ".timelineInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; overflow: scroll; z-index: 2`,
    ".timelineContentHolder": `position: relative; width: 100%; height: 100%; overflow: scroll; z-index: 1; transition: .5s`,
    ".timelineDisable": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; pointer-events: all !important`,
    ".content[disabled] .timelineDisable": `display: block !important`,

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
    ".timelineTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".timelineTopDivider[revert]": `display: none; margin-left: 8px`,
    ".timelineRevert": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".timelineFilter": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".timelineFilter span": `--themeColorRGB: var(--themeRGB); display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-left: 5px; justify-content: center; align-items: center; background: var(--pageColor); color: rgb(var(--themeColorRGB)); border-radius: 12px; font-weight: 700`,
    ".timelineZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".timelineToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".timelineBottomHolder": `position: relative; display: flex; width: 100%; height: fit-content; margin-top: 8px; justify-content: center; visibility: visible`,
    ".timelineHistory": `position: relative; box-sizing: border-box; width: calc(100% - 16px); max-width: 600px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); opacity: 1 !important; box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; overflow: hidden; pointer-events: all !important`,
    ".timelineHistory[disabled] > div": `opacity: .5; pointer-events: none`,
    ".timelineHistorySliderHolder": `box-sizing: border-box; display: flex; width: 100%; align-items: center; z-index: 1; transition: .2s`,
    ".timelineHistorySlider": `position: relative; flex: 1; height: 10px; margin: 12px; touch-action: none`,
    ".timelineHistoryTrack": `position: absolute; width: calc(100% - 10px); height: 100%; left: 5px; top: 0px; z-index: 2`,
    ".timelineHistoryTrack button": `--percent: 100%; position: absolute; width: 22px; height: 22px; padding: 0px; left: calc(var(--percent) - 11px); top: -6px; margin: 0px; background: var(--theme); box-shadow: var(--darkShadow); border: solid 4px var(--pageColor); border-radius: 11px; transition: transform .2s`,
    ".timelineHistoryTrack button:hover": `transform: scale(1.2) !important`,
    ".timelineHistoryTrack button:active": `transform: scale(1.1) !important`,
    ".timelineHistoryBar": `position: relative; width: 100%; height: 100%; background: var(--gray); border-radius: 5px; overflow: hidden; transition: .2s`,
    ".timelineHistoryBarTrack": `position: absolute; width: calc(100% - 10px); height: 100%; left: 5px; top: 0px; z-index: 1`,
    ".timelineHistoryBarTrack div[progress]": `--percent: 100%; position: absolute; width: calc(var(--percent) + 5px); height: 100%; left: -5px; top: 0px; background: var(--theme); z-index: 2`,
    ".timelineHistoryBarTrack div[loader]": `--percent: 0%; position: absolute; width: calc(var(--percent) + 5px); height: 100%; right: -5px; top: 0px; background: var(--hover); z-index: 1`,
    ".timelineHistoryInfo": `position: relative; box-sizing: border-box; display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 2px; gap: 6px; align-items: center; z-index: 2`,
    ".timelineHistoryDetail": `display: none; flex: 1 1 100px; min-width: 0px; margin: 0 8px 0 6px; align-items: center; z-index: 2; transition: .2s`,
    ".timelineHistoryMemberHolder": `--useWidth: var(--width); position: relative; height: 28px; padding: 6px 0 6px 6px; transition: margin .2s`,
    ".timelineHistoryMemberHolder:not([extend])": `flex: 1; min-width: 0px; max-width: var(--width); overflow: hidden`,
    ".timelineHistoryMemberHolder[extend]": `--useWidth: var(--fullWidth); width: var(--width); margin-right: 6px`,
    ".timelineHistoryMember": `position: absolute; display: flex; height: 28px; padding: 6px; left: 0px; top: 50%; transform: translateY(-50%); background: var(--pageColor); border-radius: 8px; transition: .2s`,
    ".timelineHistoryMember:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: 0; z-index: 1; transition: .2s`,
    ".timelineHistoryMemberHolder[extend] .timelineHistoryMember:after": `opacity: .6`,
    ".timelineHistoryMember div[profileholder]": `z-index: 2`,
    ".timelineHistoryMember div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".timelineHistoryMember div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".timelineHistoryMember div[profileholder] div[profile]": `position: relative; width: 22px; height: 22px; border: solid 3px var(--pageColor); border-radius: 14px`,
    ".timelineHistoryMember div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".timelineHistoryMember div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".timelineHistoryMember div[content]": `display: flex; flex: 1; min-width: 0; max-width: calc(var(--useWidth) - 34px); height: 28px; margin-left: 6px; text-align: left; overflow: hidden; align-items: center; z-index: 2; transition: .2s`,
    ".timelineHistoryMember div[content] div[name]": `font-size: 16px; font-weight: 600; white-space: nowrap`,
    ".timelineHistoryMember div[content] div[email]": `display: none; margin: 0 6px 0 8px; font-size: 15px; font-weight: 500; white-space: nowrap`,
    ".timelineHistoryTime": `margin-left: 6px; color: var(--darkGray); font-size: 16px; font-weight: 500; white-space: nowrap`,
    ".timelineHistoryChange": `display: flex; margin: 6px 8px 6px auto; align-items: center; z-index: 1`,
    ".timelineHistoryChange button": `display: flex; flex-shrink: 0; width: 28px; height: 28px; padding: 4px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 14px`,
    ".timelineHistoryChange button > svg": `flex-shrink: 0; width: 22px; height: 22px`,
    ".timelineHistoryChange button > div": `flex-shrink: 0; width: 22px; height: 22px`,
    ".timelineHistoryChange button > div[hidden]": `display: none`,
    ".timelineHistoryChange button > div > svg": `width: 100%; height: 100%`,
    ".timelineHistoryCurrentChange": `flex-shrink: 0; margin: 0 6px; font-size: 16px`,

    ".timelineSelect": `--themeColor: var(--theme); position: absolute; left: 0px; top: 0px; border-style: solid; border-width: 3px; border-color: var(--themeColor); opacity: 0; z-index: 9; border-radius: 9px; opacity .15s; pointer-events: none`
  };

  pipeline = {
    pipelines: [],
    publish: async (event, data) => {
      for (let i = 0; i < this.pipeline.pipelines.length; i++) {
        let pipeline = this.pipeline.pipelines[i];
        if (pipeline != null) {
          await pipeline.publish(event, data);
        }
      }
    },
    subscribe: (id, event, callback, extra) => {
      for (let i = 0; i < this.pipeline.pipelines.length; i++) {
        let pipeline = this.pipeline.pipelines[i];
        if (pipeline != null) {
          pipeline.subscribe(id, event, callback, extra);
        }
      }
    },
    unsubscribe: (id, event) => {
      for (let i = 0; i < this.pipeline.pipelines.length; i++) {
        let pipeline = this.pipeline.pipelines[i];
        if (pipeline != null) {
          pipeline.unsubscribe(id, event);
        }
      }
    }
  };

  js = async (frame) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let main = frame.querySelector(".timelineInterface");
    let contentHolder = frame.querySelector(".timelineContentHolder");

    let closeButton = main.querySelector(".timelineClose");
    let revertDivider = main.querySelector(".timelineTopDivider[revert]");
    let revertButton = main.querySelector(".timelineRevert");
    let filterButton = main.querySelector(".timelineFilter");
    let filterCollaboratorCount = filterButton.querySelector("span");
    let zoomButton = main.querySelector(".timelineZoom");

    let toolbarHolder = main.querySelector(".timelineToolbarHolder");
    let selectButton = toolbarHolder.querySelector('.eTool[tool="select"]');
    let panButton = toolbarHolder.querySelector('.eTool[tool="pan"]');

    let timeline = main.querySelector(".timelineHistory");

    let sliderBar = timeline.querySelector(".timelineHistorySlider");
    let sliderBarTrack = sliderBar.querySelector(".timelineHistoryBarTrack");
    let sliderProgressBar = sliderBarTrack.querySelector("div[progress]");
    let sliderLoaderBar = sliderBarTrack.querySelector("div[loader]");
    let sliderButton = sliderBar.querySelector(".timelineHistoryTrack button");

    let timelineDetail = timeline.querySelector(".timelineHistoryDetail");
    let memberHolder = timelineDetail.querySelector(".timelineHistoryMemberHolder");
    let memberFrame = memberHolder.querySelector(".timelineHistoryMember");
    let memberProfileHolder = memberFrame.querySelector("div[profileholder]");
    let memberCursor = memberProfileHolder.querySelector("div[cursor]");
    let memberProfilePicture = memberProfileHolder.querySelector("div[profile]");
    let memberContent = memberFrame.querySelector("div[content]");
    let memberName = memberContent.querySelector("div[content] > div[name]");
    let memberEmail = memberContent.querySelector("div[content] > div[email]");
    let changeTime = timelineDetail.querySelector(".timelineHistoryTime");

    let timelineChange = timeline.querySelector(".timelineHistoryChange");
    let skimBackButton = timelineChange.querySelector(".timelineHistorySkim[back]");
    let currentChangeText = timelineChange.querySelector(".timelineHistoryCurrentChange");
    let skimNextButton = timelineChange.querySelector(".timelineHistorySkim[next]");
    let skimPlayButton = timelineChange.querySelector(".timelineHistorySkim[play]");

    if (this.parentPipeline != null) {
      this.pipeline.pipelines.push(this.parentPipeline);
    }
    this.editor = await this.setFrame("editor/editor", contentHolder, {
      construct: {
        page: frame,
        lesson: this.lesson,
        self: { access: 0 }, //this.self,
        session: this.session,
        sessionID: this.sessionID,
        sources: this.sources,
        collaborators: this.collaborators,
        settings: this.lesson.lesson.settings,
        backgroundColor: this.backgroundColor,
        preferences: this.preferences
      }
    });
    this.editor.realtime.enabled = false;
    this.pipeline.pipelines.push(this.editor.pipeline);
    /*if (this.reactions != null) {
      this.editor.reactions = copyObject(this.reactions);
    }*/
    let presentAnnotations = {};
    if (this.annotations != null) {
      let annotations = Object.entries(this.annotations);
      for (let i = 0; i < annotations.length; i++) {
        let [annoID, annotation] = annotations[i];
        if (annotation.render != null) {
          this.editor.annotations[annoID] = { render: copyObject(annotation.render) };
          presentAnnotations[annoID] = { hidden: annotation.render.hidden == true };
        }
      }
      for (let i = 0; i < annotations.length; i++) {
        await this.editor.utils.setAnnotationChunks(this.editor.annotations[annotations[i][0]]);
      }
    } else {
      let path = "lessons/join/annotations";
      if ((this.parameters ?? []).length > 0) {
        path += "?" + this.parameters.join("&");
      }
      let [annoCode, annoBody] = await sendRequest("GET", path, null, { session: this.parent.session }, { allowError: true });
      if (annoCode != 200) {
        return alertModule.open("error", `<b>Error Loading Annotations</b>Please try again later...`);
      }
      await this.editor.loadAnnotations({ annotations: annoBody.annotations });
      let annotations = Object.keys(annoBody.annotations);
      for (let i = 0; i < annotations.length; i++) {
        presentAnnotations[annotations[i]] = { hidden: (annoBody.annotations[annotations[i]] ?? {}).hidden == true };
      }
    }
    await this.editor.render.setMarginSize();
    await this.editor.updateChunks();
    await this.editor.utils.centerWindowWithPage();

    let realtimeHolder = this.editor.content.querySelector(".eRealtime");
    
    closeButton.addEventListener("click", () => {
      if (this.close != null) {
        this.close();
      }
    });
    this.editor.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      zoomButton.textContent = Math.round(event.zoom * 100) + "%";
    });
    zoomButton.addEventListener("click", () => {
      dropdownModule.open(zoomButton, "dropdowns/lesson/zoom", { parent: this, remove: ["snapping", "cursors", "cursornames", "comments", "stylusmode"] });
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
      if (this.self.access > 3) {
        revertDivider.style.display = "block";
        revertButton.style.display = "flex";
      } else {
        revertDivider.style.removeProperty("display");
        revertButton.style.removeProperty("display");
      }
      if ((account.settings ?? {}).toolbar != "right") {
        toolbarHolder.setAttribute("left", "");
        toolbarHolder.removeAttribute("right");
      } else {
        toolbarHolder.setAttribute("right", "");
        toolbarHolder.removeAttribute("left");
      }
    }
    this.editor.pipeline.subscribe("accountUpdate", "account_settings", (event) => {
      if (event.settings.hasOwnProperty("toolbar") == true) {
        this.updateInterface();
      }
    });
    this.updateInterface();

    let closing = false;
    memberFrame.addEventListener("mouseover", () => {
      closing = false;
      memberContent.removeAttribute("notransition");
      memberHolder.style.overflow = "unset";
      memberHolder.setAttribute("extend", "");
      //memberFrame.style.setProperty("--width", (memberName.offsetWidth + memberEmail.offsetWidth + 48) + "px");
    });
    memberFrame.addEventListener("mouseout", async () => {
      closing = true;
      //memberFrame.style.removeProperty("--width");
      memberHolder.removeAttribute("extend");
      await sleep(200);
      if (closing == true) {
        memberHolder.style.removeProperty("overflow");
      }
    });

    // Load Images:
    setSVG(closeButton, "../images/tooltips/close.svg");
    setSVG(skimBackButton, "../images/editor/timeline/back.svg");
    setSVG(skimNextButton, "../images/editor/timeline/next.svg");
    setSVG(skimPlayButton.querySelector("div[play]"), "../images/editor/timeline/play.svg");
    setSVG(skimPlayButton.querySelector("div[pause]"), "../images/editor/timeline/pause.svg");
    
    (async () => {
      await (await this.newModule("editor/toolbar")).js(this.editor);
    })();

    let loadEpoch = getEpoch();

    let changes = {};
    let orderedChanges = [];
    let allChangesLoaded = false;
    let currentChange;
    let lastRenderChange;
    let storedAnnotationStates = {};
    let selectionBoxes = {};

    let filterMembers;
    let sortedChanges = [];
    let totalSortedChanges = 0;
    let currentSortedChange = 0;
    let playing = false;

    this.startPlaying = async () => {
      if (playing == true) {
        return;
      }
      playing = true;
      skimPlayButton.querySelector("div[play]").setAttribute("hidden", "");
      skimPlayButton.querySelector("div[pause]").removeAttribute("hidden");
      if (currentSortedChange >= Math.max(totalSortedChanges, sortedChanges.length)) {
        currentSortedChange = 0;
        await this.updateTimeline({ fromPlayLoop: true });
      }
      while (playing == true) {
        await this.updateTimeline({ fromPlayLoop: true });
        if (currentSortedChange >= Math.max(totalSortedChanges, sortedChanges.length)) {
          return this.stopPlaying();
        }
        await sleep(350);
        currentSortedChange++;
      }
    }
    this.stopPlaying = () => {
      playing = false;
      skimPlayButton.querySelector("div[pause]").setAttribute("hidden", "");
      skimPlayButton.querySelector("div[play]").removeAttribute("hidden");
    }

    this.updateInterface = () => {
      let useTotalChanges = Math.max(totalSortedChanges, sortedChanges.length);

      if (useTotalChanges > 0) {
        timeline.parentElement.removeAttribute("hidden");
      } else {
        timeline.parentElement.setAttribute("hidden", "");
      }

      let percent = currentSortedChange / useTotalChanges;
      let stylePercent = percent * 100;
      sliderProgressBar.style.setProperty("--percent", stylePercent + "%");
      sliderButton.style.setProperty("--percent", stylePercent + "%");
      sliderLoaderBar.style.setProperty("--percent", ((sortedChanges.length / useTotalChanges) * 100) + "%");

      currentChangeText.innerHTML = "<b>" + currentSortedChange + "</b> / " + useTotalChanges;

      if (currentSortedChange > 0) {
        skimBackButton.removeAttribute("disabled");
      } else {
        skimBackButton.setAttribute("disabled", "");
      }
      if (currentSortedChange < useTotalChanges) {
        skimNextButton.removeAttribute("disabled");
      } else {
        skimNextButton.setAttribute("disabled", "");
      }
    }
    let currentCollaboratorID;
    this.updateCollaboratorDisplay = (collaborator = {}) => {
      if ((this.lesson.lesson.settings ?? {}).anonymousMode == true && this.self.access < 4) {
        collaborator = {};
      }
      currentCollaboratorID = collaborator._id;
      if (currentCollaboratorID == null) {
        return timelineDetail.style.removeProperty("display");
      }
      memberFrame.style.setProperty("--themeColor", collaborator.color);
      if (collaborator.image == null) {
        memberCursor.style.removeProperty("display");
        memberProfilePicture.style.display = "none";
      } else {
        memberProfilePicture.querySelector("img").src = collaborator.image;
        memberProfilePicture.style.removeProperty("display");
        memberCursor.style.display = "none";
      }
      memberName.textContent = collaborator.name;
      memberName.title = collaborator.name;
      if (collaborator.email != null) {
        memberEmail.textContent = collaborator.email;
        memberEmail.title = collaborator.email;
        memberEmail.style.display = "flex";
      } else {
        memberEmail.style.removeProperty("display");
      }

      timelineDetail.style.display = "flex";
      let memberNameWidth = memberName.offsetWidth;
      memberHolder.style.setProperty("--width", (memberNameWidth + 36) + "px");
      memberHolder.style.setProperty("--fullWidth", (memberNameWidth + memberEmail.offsetWidth + 48) + "px");
    }
    
    let updatingState = false;
    let currentChangeIndex = -1;
    let lastRenderChangeIndex = -1;
    let orderedChangesLength = 0;
    this.updateCurrentState = async (options = {}) => {
      if (currentChange == null) {
        currentChange = orderedChanges[orderedChanges.indexOf(sortedChanges[0]) - 1];
      }
      if (currentChange != orderedChanges[orderedChanges.length - 1]) {
        revertButton.removeAttribute("disabled");
      }
      if (lastRenderChange == currentChange) {
        return;
      }

      currentChangeIndex = orderedChanges.indexOf(currentChange);
      lastRenderChangeIndex = orderedChanges.indexOf(lastRenderChange);
      orderedChangesLength = orderedChanges.length;

      if (updatingState == true) {
        return;
      }
      updatingState = true;
      let useChangeType;
      let updatedAnnotations = {};
      let currentChangeAnnotations = {};
      let allMissingAnnotations = true;
      let changeData;
      while (currentChange != lastRenderChange) {
        let applyChangeChanges;
        let loadChangeCountDifference = orderedChanges.length - orderedChangesLength;
        if (loadChangeCountDifference != 0) {
          currentChangeIndex -= loadChangeCountDifference;
          lastRenderChangeIndex -= loadChangeCountDifference;
          orderedChangesLength += loadChangeCountDifference;
        }
        if (lastRenderChangeIndex > currentChangeIndex) {
          changeData = changes[orderedChanges[lastRenderChangeIndex]] ?? {};
          applyChangeChanges = changeData.changes ?? [];

          lastRenderChangeIndex--;
          useChangeType = "changes";
        } else if (lastRenderChangeIndex < currentChangeIndex) {
          lastRenderChangeIndex++;
          useChangeType = "redoChanges";

          changeData = changes[orderedChanges[lastRenderChangeIndex]] ?? {};
          applyChangeChanges = changeData.redoChanges ?? [];
        } else {
          lastRenderChange = currentChange;
          break;
        }

        lastRenderChange = changeData._id;

        if (applyChangeChanges.length > 0) {
          currentChangeAnnotations = {};
        }

        let addRedoChanges = changeData.redoChanges == null && useChangeType == "changes";
        if (addRedoChanges == true) {
          changeData.redoChanges = [];
        }
        for (let i = 0; i < applyChangeChanges.length; i++) {
          let annotation = applyChangeChanges[i];
          let original = storedAnnotationStates[annotation._id] ?? (this.editor.annotations[annotation._id] ?? {}).render ?? {};
          if (this.self.access < 4) {
            let presentAnnotation = presentAnnotations[annotation._id];
            if (presentAnnotation == null) {
              continue;
            } else if (["page"].includes(original.f) == true && presentAnnotation.hidden == true) {
              delete annotation.hidden;
            }
          }
          if (addRedoChanges == true) {
            changeData.redoChanges.push(copyObject(original ?? { _id: annotation._id, remove: true }));
          }
          if (original.remove == true) {
            delete original.remove;
          }
          if ((original ?? {}).a == null && annotation.a == null) {
            annotation.a = changeData.collaborator;
          }
          annotation.m = changeData.collaborator;
          
          storedAnnotationStates[annotation._id] = { ...(original ?? {}), ...annotation };

          let checkChunks = this.editor.utils.chunksFromAnnotation(annotation);
          if (this.editor.annotations[annotation._id] == null) {
            this.editor.annotations[annotation._id] = { render: storedAnnotationStates[annotation._id] };
          } else {
            this.editor.annotations[annotation._id].render = storedAnnotationStates[annotation._id];
          }
          updatedAnnotations[annotation._id] = { annotation: this.editor.annotations[annotation._id], checkChunks: checkChunks };

          currentChangeAnnotations[annotation._id] = true;
          allMissingAnnotations = false;
        }
      }
      updatingState = false;
      if (useChangeType != null && allMissingAnnotations == true && this.self.access < 4 && currentSortedChange > 0 && options.skipMissingCheck != true) {
        if (useChangeType == "changes") {
          currentSortedChange--;
        } else if (useChangeType == "redoChanges") {
          currentSortedChange++;
        }
        if (currentSortedChange < 0) {
          currentSortedChange = 0;
        }
        let useTotalChanges = Math.max(totalSortedChanges, sortedChanges.length);
        if (currentSortedChange > useTotalChanges) {
          currentSortedChange = useTotalChanges;
        }
        return await this.updateTimeline(options);
      }

      let isOffScreen = false;
      let centerTotalX = 0;
      let centerTotalY = 0;
      let centerTotalCount = 0;
      let setSelectionBoxes = {};
      let tempSelections = [];
      let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
      let updateAnnotationKeys = Object.keys(updatedAnnotations);
      for (let i = 0; i < updateAnnotationKeys.length; i++) {
        let annoID = updateAnnotationKeys[i];
        let { annotation, checkChunks } = updatedAnnotations[annoID];
        let annoRect = this.editor.utils.getRect(annotation.render);
        let isCurrentChange = currentChangeAnnotations[annotation.render._id] != null;

        await this.editor.utils.setAnnotationChunks(annotation);

        let chunkAnnotations = this.editor.utils.annotationsInChunks(checkChunks);
        for (let i = 0; i < chunkAnnotations.length; i++) {
          let anno = chunkAnnotations[i] ?? {};
          let render = anno.render;
          if (render == null || render._id == annoID) {
            continue;
          }
          if (this.editor.utils.getParentIDs(render).includes(annoID) == true) { // Update chunks of child annotations:
            await this.editor.utils.setAnnotationChunks(anno);
          }
        }

        let allowRender = annotation.render.remove == true;
        for (let i = 0; i < annotation.chunks.length; i++) {
          if (this.editor.visibleChunks.includes(annotation.chunks[i]) == true) {
            allowRender = true;
            break;
          }
        }
        if (allowRender == true) {
          annotation.component = (await this.editor.render.create(annotation, true)).component;
        } else {
          await this.editor.render.remove(annotation);
        }

        let modifyID = annotation.render.m ?? annotation.render.a;
        if (filterMembers != null && filterMembers.includes(modifyID) == false) {
          continue;
        }
        if (modifyID != null && (annotation.render.remove != true || isCurrentChange == true)) {
          let mergedID = annotation.render._id + "_" + modifyID;
          let selection = selectionBoxes[mergedID];
          delete selectionBoxes[mergedID];
          let newSelection = selection == null || selection.hasAttribute("remove");
          if (newSelection == true) {
            realtimeHolder.insertAdjacentHTML("beforeend", `<div class="timelineSelect" new></div>`);
            selection = realtimeHolder.querySelector('.timelineSelect[new]');
            selection.removeAttribute("new");
            selection.setAttribute("merged", mergedID);
            selection.setAttribute("collaborator", modifyID);
            (async (element, modifyid) => {
              let collaborator = await this.editor.utils.getCollaborator(modifyid);
              if (collaborator != null && element != null) {
                element.style.setProperty("--themeColor", collaborator.color);
              }
            })(selection, modifyID);
          }
          setSelectionBoxes[mergedID] = selection;
          if (isCurrentChange == false ||annotation.render.remove == true) {
            selection.setAttribute("remove", "");
            tempSelections.push(selection);
          }
          //if (isCurrentChange == true && annotation.render.remove != true) {
          //  setSelectionBoxes[mergedID] = selection;
          //} else {
          let rotate = annoRect.rotation;
          if (rotate > 180) {
            rotate = -(360 - rotate);
          }
          selection.style.width = ((annoRect.width * this.editor.zoom) - 3) + "px";
          selection.style.height = ((annoRect.height * this.editor.zoom) - 3) + "px";
          selection.style.transform = "translate(" + (annotationRect.left + (annoRect.x * this.editor.zoom) + this.editor.contentHolder.scrollLeft - 1.5) + "px," + (annotationRect.top + (annoRect.y * this.editor.zoom) + this.editor.contentHolder.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
          if (newSelection == true) {
            selection.offsetHeight;
            selection.style.transition = "all .25s, opacity .15s, border-color 0s";
            selection.style.opacity = 1;
          }
        }
        
        if (isCurrentChange == true) {
          if (isOffScreen == false) {
            isOffScreen = this.editor.utils.annotationInViewport(null, annoRect) == false;
          }
          centerTotalX += annoRect.centerX;
          centerTotalY += annoRect.centerY;
          centerTotalCount++;
        }
      }
      this.editor.pipeline.publish("redraw_selection", { transition: false });

      let removeSelectBoxes = Object.values(selectionBoxes);
      (async function () {
        for (let i = 0; i < removeSelectBoxes.length; i++) {
          let elem = removeSelectBoxes[i];
          if (elem != null) {
            elem.style.opacity = 0;
          }
        }
        await sleep(300);
        for (let i = 0; i < removeSelectBoxes.length; i++) {
          let elem = removeSelectBoxes[i];
          if (elem != null) {
            elem.remove();
          }
        }
      })();
      (async function (elements) {
        await sleep(500);
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          if (elem != null) {
            elem.style.opacity = 0;
          }
        }
        await sleep(300);
        for (let i = 0; i < elements.length; i++) {
          let elem = elements[i];
          if (elem != null) {
            elem.remove();
          }
        }
      })(tempSelections);

      selectionBoxes = setSelectionBoxes;

      if (isOffScreen == true) {
        this.editor.utils.scrollToAnnotation({ p: [centerTotalX / centerTotalCount, centerTotalY / centerTotalCount] }, { duration: 250 });
      }

      memberContent.setAttribute("notransition", "");
      
      if (changeData != null && filterMembers != null && filterMembers.includes(changeData.collaborator) == false) {
        changeData = changes[currentChange];
      }

      let collaborator;
      if (changeData != null && allMissingAnnotations == false) {
        changeTime.textContent = timeSince(changeData.added);
        changeTime.title = formatFullDate(changeData.added);
        
        collaborator = this.editor.collaborators[changeData.collaborator];
        if (collaborator == null) {
          timelineDetail.style.removeProperty("display");
          let currentChangeID = changeData._id;
          collaborator = await this.editor.utils.getCollaborator(changeData.collaborator);
          if (currentChangeID != (changeData ?? {})._id) {
            return;
          }
        }
      }
      this.updateCollaboratorDisplay(collaborator);
    }

    this.editor.pipeline.subscribe("timelineFilterDropdown", "collaborator_update", (collaborator) => {
      if (currentCollaboratorID == collaborator._id) {
        this.updateCollaboratorDisplay(collaborator);

        let allSelections = realtimeHolder.querySelectorAll('.timelineSelect[collaborator="' + collaborator._id + '"]');
        for (let i = 0; i < allSelections.length; i++) {
          let selection = allSelections[i];
          if (selection != null) {
            selection.style.setProperty("--themeColor", collaborator.color);
          }
        }
      }
    });

    let updateStateCaller;
    this.updateTimeline = async (options = {}) => {
      if (options.fromPlayLoop != true) {
        this.stopPlaying();
      }

      this.updateInterface();
      
      let callUpdateState = async () => {
        currentChange = sortedChanges[currentSortedChange - (Math.max(totalSortedChanges, sortedChanges.length) - sortedChanges.length) - 1];
        await this.updateCurrentState(options);
      };
      updateStateCaller = callUpdateState;

      if (sortedChanges.length > 0) {
        revertButton.setAttribute("disabled", "");
        let sortedChangeIndex = currentSortedChange - (Math.max(totalSortedChanges, sortedChanges.length) - sortedChanges.length) - 1;
        if (sortedChangeIndex >= 0) {
          await updateStateCaller();
        }
        if (sortedChangeIndex < 50) {
          await this.loopLoadAnnotations();
          if (updateStateCaller == callUpdateState) {
            updateStateCaller();
          }
        }
      }
    }

    let applyChange = (change, insert) => {
      changes[change._id] = change;
      if (insert != "end") {
        orderedChanges.unshift(change._id);
      } else {
        orderedChanges.push(change._id);
      }
      
      if (filterMembers != null && filterMembers.includes(change.collaborator) == false) {
        return;
      }
      
      if (insert != "end") {
        sortedChanges.unshift(change._id);
      } else {
        sortedChanges.push(change._id);
      }
    }

    let loadAmount = 250;
    let loadFunction;
    this.loadChanges = async () => {
      if (loadFunction == null) {
        loadFunction = (async () => {
          if (allChangesLoaded == true) {
            loadFunction = null;
            return;
          }
          let parameters = [...(this.parameters ?? [])];
          let getAmount = 100;
          if (orderedChanges.length > 0) {
            parameters.push("amount=" + loadAmount + "&before=" + ((changes[orderedChanges[0]] ?? {}).added ?? getEpoch()));
            getAmount = loadAmount;
          } else {
            parameters.push("before=" + loadEpoch);
          }
          let path = "lessons/history";
          if (parameters.length > 0) {
            path += "?" + parameters.join("&");
          }
          let [code, body] = await sendRequest("GET", path, null, { session: this.parent.session });
          if (code == 200) {
            for (let i = 0; i < body.changes.length; i++) {
              applyChange(body.changes[i]);
            }
            if (body.changes.length < getAmount) {
              allChangesLoaded = true;
            }
            sliderLoaderBar.style.setProperty("--percent", ((sortedChanges.length / Math.max(totalSortedChanges, sortedChanges.length)) * 100) + "%");
          }
          
          loadFunction = null;
        })();
      }

      await loadFunction;
    }
    let loopLoadFunction;
    this.loopLoadAnnotations = async () => {
      if (loopLoadFunction == null) {
        loopLoadFunction = (async () => {
          while (allChangesLoaded != true) {
            await this.loadChanges();
            if (currentSortedChange - (Math.max(totalSortedChanges, sortedChanges.length) - sortedChanges.length) - 1 >= 50) {
              break;
            }
          }
          loopLoadFunction = null;
        })();
      }

      await loopLoadFunction;
    }

    this.updateFilter = async (setFilter) => {
      timeline.setAttribute("disabled", "");
      filterButton.setAttribute("disabled", "");

      if ((this.lesson.lesson.settings ?? {}).anonymousMode == true && this.self.access < 4) {
        setFilter = null;
      }

      if (setFilter != null) {
        filterMembers = setFilter;
        filterCollaboratorCount.textContent = filterMembers.length;
        filterCollaboratorCount.style.display = "flex";
        filterButton.style.padding = "4px 4px 4px 10px";
      } else {
        filterMembers = null;
        filterCollaboratorCount.style.removeProperty("display");
        filterButton.style.removeProperty("padding");
      }

      sortedChanges = [];
      totalSortedChanges = 0;

      for (let i = 0; i < orderedChanges.length; i++) {
        let key = orderedChanges[i];
        let change = changes[key];
        if (filterMembers == null || filterMembers.includes(change.collaborator) == true) {
          sortedChanges.push(key);
        }
      }

      await Promise.all([
        new Promise(async (resolve) => {
          let parameters = [...(this.parameters ?? [])];
          if (filterMembers != null) {
            parameters.push("collaborators=" + filterMembers.join());
          }
          let path = "lessons/history/count";
          if (parameters.length > 0) {
            path += "?" + parameters.join("&");
          }
          let [code, body] = await sendRequest("GET", path, null, { session: this.parent.session, allowError: [403] });
          if (code == 200) {
            totalSortedChanges += body.count;
            let loadChange = body.count - sortedChanges.length;
            currentSortedChange += loadChange;
            this.updateTimeline();
          }
          resolve();
        }),
        new Promise(async (resolve) => {
          if (sortedChanges.length < loadAmount) {
            await this.loadChanges();
          }
    
          currentSortedChange = Math.max(totalSortedChanges, sortedChanges.length);
          //lastRenderChange = lastRenderChange ?? sortedChanges[currentSortedChange - (totalSortedChanges - sortedChanges.length) - 1];
          this.updateTimeline();
    
          let isOffScreen = false;
          let centerTotalX = 0;
          let centerTotalY = 0;
          let lastChange = changes[lastRenderChange] ?? {};
          let lastChangeChanges = lastChange.changes ?? [];
          let totalAnnotationUpdates = lastChangeChanges.length;
          for (let i = 0; i < totalAnnotationUpdates; i++) {
            let annotation = (this.editor.annotations[(lastChangeChanges[i] ?? {})._id] ?? {}).render;
            if (annotation != null) {
              let annoRect = this.editor.utils.getRect(annotation);
              if (isOffScreen == false) {
                isOffScreen = this.editor.utils.annotationInViewport(null, annoRect) == false;
              }
              centerTotalX += annoRect.centerX;
              centerTotalY += annoRect.centerY;
            }
          }
          if (isOffScreen == true) {
            this.editor.utils.scrollToAnnotation({ p: [centerTotalX / totalAnnotationUpdates, centerTotalY / totalAnnotationUpdates] }, { animation: false });
          }
          (async (change = {}) => {
            let collaborator = await this.editor.utils.getCollaborator(change.collaborator);
            if (currentChange == change._id) {
              this.updateCollaboratorDisplay(collaborator);
            }
          })(lastChange);

          timeline.removeAttribute("disabled");
          if (this.collaboratorIDs != null) {
            if ((this.lesson.lesson.settings ?? {}).anonymousMode != true || this.self.access > 3) {
              filterButton.removeAttribute("disabled");
            }
          }
          resolve();
        })
      ]);
    }

    this.updateFilter(this.filterMembers);

    skimBackButton.addEventListener("click", () => {
      if (currentSortedChange > 0) {
        currentSortedChange--;
        this.updateTimeline();
      }
    });
    skimNextButton.addEventListener("click", () => {
      if (currentSortedChange < Math.max(totalSortedChanges, sortedChanges.length)) {
        currentSortedChange++;
        this.updateTimeline();
      }
    });
    skimPlayButton.addEventListener("click", () => {
      if (playing == false) {
        this.startPlaying();
      } else {
        this.stopPlaying();
      }
    });

    let sliderEnabled = true;
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false) {
        sliderEnabled = false;
        this.editor.pipeline.unsubscribe("timelineSelectorMouse");
        return;
      }
      let useTotalChanges = Math.max(totalSortedChanges, sortedChanges.length);
      let barRect = sliderBar.getBoundingClientRect();
      let newCurrentChange = Math.round((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (sliderBar.offsetWidth - 10), 1), 0)) * useTotalChanges);
      if (currentSortedChange != newCurrentChange) {
        currentSortedChange = newCurrentChange;
        this.updateTimeline({ skipMissingCheck: true });
      }
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      eventBarUpdate(event);
      this.editor.pipeline.subscribe("timelineSelectorMouse", "click_move", (data) => { eventBarUpdate(data.event); });
      this.editor.pipeline.subscribe("timelineSelectorMouse", "click_end", (data) => { eventBarUpdate(data.event); });
    }
    sliderBar.addEventListener("mousedown", enableSlider);
    sliderBar.addEventListener("touchstart", enableSlider, { passive: true });

    this.editor.pipeline.subscribe("timelineZoomUpdate", "zoom_change", () => {
      let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
      let allSelections = realtimeHolder.querySelectorAll(".timelineSelect");
      for (let i = 0; i < allSelections.length; i++) {
        let selection = allSelections[i];
        let [annoID] = selection.getAttribute("merged").split("_");
        let render = {};
        if (this.editor.annotations[annoID] == null) {
          selection.remove();
          continue;
        }
        render = { ...((this.editor.annotations[annoID]).render ?? {}), ...(this.editor.selecting[annoID] ?? {}) };
        if (render.f == null) {
          continue;
        }
        let rect = this.editor.utils.getRect(render);
        selection.setAttribute("notransition", "");
        let rotate = rect.rotation;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        selection.style.width = ((rect.width * this.editor.zoom) - 3) + "px";
        selection.style.height = ((rect.height * this.editor.zoom) - 3) + "px";
        selection.style.transform = "translate(" + (annotationRect.left + (rect.x * this.editor.zoom) + this.editor.contentHolder.scrollLeft - 1.5) + "px," + (annotationRect.top + (rect.y * this.editor.zoom) + this.editor.contentHolder.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
        selection.offsetHeight;
        selection.removeAttribute("notransition");
      }
    });

    (async () => {
      let [code, body] = await sendRequest("GET", "lessons/history/collaborators?" + [...(this.parameters ?? []), ("before=" + loadEpoch)].join("&"), null, { session: this.session, allowError: [403] });
      if (code != 200 && frame != null) {
        return dropdownModule.close();
      }
      this.collaboratorIDs = [];
      for (let i = 0; i < body.length; i++) {
        let collaborator = body[i];
        if (this.editor.collaborators[collaborator._id] == null) {
          this.editor.collaborators[collaborator._id] = collaborator;
        }
        this.collaboratorIDs.push(collaborator._id);
      }
      if ((this.lesson.lesson.settings ?? {}).anonymousMode != true || this.self.access > 3) {
        filterButton.removeAttribute("disabled");
      }
    })();

    revertButton.addEventListener("click", async () => {
      frame.setAttribute("disabled", "");
      let parameters = [...(this.parameters ?? [])];
      if (currentChange != null) {
        parameters.push("change=" + currentChange);
      }
      let path = "lessons/history/revert";
      if (parameters.length > 0) {
        path += "?" + parameters.join("&");
      }
      let [code] = await sendRequest("GET", path, null, { session: this.parent.session });
      if (code == 200) {
        if (this.close != null) {
          return this.close();
          //return this.open({ includeAnnotations: false });
        }
      }
      frame.removeAttribute("disabled", "");
    });

    filterButton.addEventListener("click", () => {
      dropdownModule.open(filterButton, "dropdowns/editor/timeline/filter", { parent: this });
    });
  }
}

modules["dropdowns/editor/timeline/filter"] = class {
  html = `
  <div class="timelineFilterHolder">
    <div class="timelineFilterSearchHolder">
      <div class="timelineFilterSearch">
        <div image></div>
        <input placeholder="Search..."></input>
      </div>
    </div>
    <div class="timelineFilterCollaboratorHolder"></div>
    <div class="timelineFilterApplyHolder">
      <button class="largeButton border"></button>
    </div>
  </div>
  `;
  css = {
    ".timelineFilterHolder": `width: 275px; max-width: 100%`,
    ".timelineFilterSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center; z-index: 1`,
    ".timelineFilterSearch": `display: flex; width: 100%; align-items: center; border: solid 2px var(--secondary); border-radius: 18px`,
    ".timelineFilterSearch div[image]": `width: 24px; height: 24px; margin-left: 4px`,
    ".timelineFilterSearch div[image] svg": `width: 100%; height: 100%`,
    ".timelineFilterSearch input": `width: 100%; padding: 5px; background: unset; border: unset; outline: unset; color: var(--textColor); font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".timelineFilterSearch input::placeholder": `color: var(--secondary)`,

    ".timelineFilterCollaboratorHolder": `display: flex; flex-direction: column; margin-top: 6px; z-index: 1`,
    ".timelineFilterCollaborator": `position: relative; display: flex; width: calc(100% - 12px); padding: 0px; margin: 0 6px 6px 6px; justify-content: center; align-items: center`,
    ".timelineFilterCollaborator[hidden]": `display: none !important`,
    ".timelineFilterCollaborator:active": `transform: scale(1) !important`,
    ".timelineFilterCollaborator div[holder]": `position: relative; display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 6px; overflow: hidden; align-items: center; transition: .1s`, //; margin: 4px 0
    ".timelineFilterCollaborator[selected] div[holder]": `background: var(--theme) !important; color: #fff`,
    ".timelineFilterCollaborator:hover div[holder]": `background: var(--hover)`,
    ".timelineFilterCollaborator:active div[holder]": `transform: scale(.95)`,
    ".timelineFilterCollaborator div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".timelineFilterCollaborator div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".timelineFilterCollaborator div[profileholder] div[profile]": `position: relative; width: 22px; height: 22px; border: solid 3px var(--pageColor); border-radius: 14px`,
    ".timelineFilterCollaborator div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".timelineFilterCollaborator div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".timelineFilterCollaborator div[content]": `display: flex; flex: 1; min-width: 0; max-width: calc(var(--width) - 34px); height: 28px; margin-left: 6px; text-align: left; overflow: hidden; align-items: center; z-index: 2; transition: .2s`,
    ".timelineFilterCollaborator div[content] div[name]": `font-size: 16px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,

    ".timelineFilterApplyHolder": `position: sticky; display: flex; flex-wrap: wrap; max-width: var(--dropdownWidth); padding: 8px; gap: 24px; left: 0px; bottom: 0px; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 0px 0px 12px 12px; z-index: 2`,
    ".timelineFilterApplyHolder button": `padding: 6px 10px; background: var(--theme); --borderColor: var(--secondary); --borderRadius: 16px; color: #fff; font-size: 16px`,
    ".timelineFilterApplyHolder button[remove]": `background: unset !important; --borderColor: var(--error); color: var(--error)`,
  };
  js = async function (frame, extra) {
    frame.closest(".dropdownContent").style.padding = "0px";

    let parent = extra.parent;
    let filter = parent.filterMembers ?? [];
    let applyFilter = copyObject(filter);

    let searchHolder = frame.querySelector(".timelineFilterSearch");
    let searchField = searchHolder.querySelector("input");
    let collaboratorHolder = frame.querySelector(".timelineFilterCollaboratorHolder");
    let applyButton = frame.querySelector(".timelineFilterApplyHolder .largeButton");

    setSVG(searchHolder.querySelector("div[image]"), "../images/editor/glass.svg", (svg) => { return svg.replace(/"#0084FF"/g, '"var(--secondary)"'); });

    let updatingApply = false;
    let updateApplyButton = () => {
      if (updatingApply == true) {
        return;
      }
      if (filter.sort().join(",") == applyFilter.sort().join(",")) {
        if (applyFilter.length > 0) {
          applyButton.setAttribute("remove", "");
          applyButton.textContent = "Remove Filter";
          applyButton.removeAttribute("disabled");
        } else {
          applyButton.textContent = "Update Filter";
          applyButton.removeAttribute("remove");
          applyButton.setAttribute("disabled", "");
        }
      } else {
        applyButton.textContent = "Update Filter";
        applyButton.removeAttribute("remove");
        applyButton.removeAttribute("disabled");
      }
    }
    updateApplyButton();

    applyButton.addEventListener("click", async () => {
      if (applyButton.hasAttribute("remove") == true) {
        let selected = collaboratorHolder.querySelectorAll(".timelineFilterCollaborator[selected]");
        for (let i = 0; i < selected.length; i++) {
          selected[i].removeAttribute("selected");
        }
        applyFilter = [];
      }
      updatingApply = true;
      applyButton.setAttribute("disabled", "");
      if (applyFilter.length > 0) {
        parent.filterMembers = copyObject(applyFilter);
      } else {
        parent.filterMembers = null;
      }
      await parent.updateFilter(parent.filterMembers);
      filter = parent.filterMembers ?? [];
      updatingApply = false;
      updateApplyButton();
    });
    
    collaboratorHolder.addEventListener("click", (event) => {
      let tile = event.target.closest(".timelineFilterCollaborator");
      if (tile == null) {
        return;
      }
      let collabID = tile.getAttribute("collaborator");
      if (tile.hasAttribute("selected") == false) {
        tile.setAttribute("selected", "");
        applyFilter.push(collabID);
      } else {
        tile.removeAttribute("selected");
        let index = applyFilter.indexOf(collabID);
        if (index > -1) {
          applyFilter.splice(index, 1);
        }
      }
      updateApplyButton();
    });

    for (let i = 0; i < parent.collaboratorIDs.length; i++) {
      let collaborator = await parent.editor.utils.getCollaborator(parent.collaboratorIDs[i]);
      collaboratorHolder.insertAdjacentHTML("beforeend", `<button class="timelineFilterCollaborator" new>
        <div holder>
          <div profileholder>
            <div cursor></div>
            <div profile><img src="../images/profiles/default.svg" /></div>
          </div>
          <div content>
            <div name></div>
          </div>
        </div>
      </button>`);
      let tile = collaboratorHolder.querySelector(".timelineFilterCollaborator[new]");
      tile.removeAttribute("new");
      tile.setAttribute("collaborator", collaborator._id);
      let memberProfileHolder = tile.querySelector("div[profileholder]");
      let memberCursor = memberProfileHolder.querySelector("div[cursor]");
      let memberProfilePicture = memberProfileHolder.querySelector("div[profile]");
      let memberContent = tile.querySelector("div[content]");
      let memberName = memberContent.querySelector("div[content] > div[name]");
      tile.style.setProperty("--themeColor", collaborator.color);
      if (collaborator.image == null) {
        memberCursor.style.removeProperty("display");
        memberProfilePicture.style.display = "none";
      } else {
        memberProfilePicture.querySelector("img").src = collaborator.image;
        memberProfilePicture.style.removeProperty("display");
        memberCursor.style.display = "none";
      }
      memberName.textContent = collaborator.name;
      memberName.title = collaborator.name;
      if (filter.includes(collaborator._id) == true) {
        tile.setAttribute("selected", "");
      }
    }

    parent.editor.pipeline.subscribe("timelineFilterDropdown", "collaborator_update", (collaborator) => {
      let tile = collaboratorHolder.querySelector('.timelineFilterCollaborator[collaborator="' + collaborator._id + '"]');
      if (tile != null) {
        let memberProfileHolder = tile.querySelector("div[profileholder]");
        let memberCursor = memberProfileHolder.querySelector("div[cursor]");
        let memberProfilePicture = memberProfileHolder.querySelector("div[profile]");
        let memberContent = tile.querySelector("div[content]");
        let memberName = memberContent.querySelector("div[content] > div[name]");
        tile.style.setProperty("--themeColor", collaborator.color);
        if (collaborator.image == null) {
          memberCursor.style.removeProperty("display");
          memberProfilePicture.style.display = "none";
        } else {
          memberProfilePicture.querySelector("img").src = collaborator.image;
          memberProfilePicture.style.removeProperty("display");
          memberCursor.style.display = "none";
        }
        memberName.textContent = collaborator.name;
        memberName.title = collaborator.name;
      }
    });

    searchField.addEventListener("input", async () => {
      let search = (searchField.value ?? "").toLowerCase();

      let children = collaboratorHolder.children;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let collaborator = await parent.editor.utils.getCollaborator(child.getAttribute("collaborator"));
        if (collaborator == null) {
          child.remove();
          continue;
        }
        if ((collaborator.name ?? "").toLowerCase().includes(search) == true) {
          child.removeAttribute("hidden");
        } else {
          child.setAttribute("hidden", "");
        }
      }
    });
  }
}