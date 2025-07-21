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
    ".timelineHistoryMemberHolder": `position: relative; height: 28px; padding: 6px 0 6px 6px; transition: margin .2s`,
    ".timelineHistoryMemberHolder:not([extend])": `flex: 1; min-width: 0px; max-width: var(--width); overflow: hidden`,
    ".timelineHistoryMemberHolder[extend]": `width: var(--width); margin-right: 6px`,
    ".timelineHistoryMember": `position: absolute; display: flex; height: 28px; padding: 6px; left: 0px; top: 50%; transform: translateY(-50%); background: var(--pageColor); border-radius: 8px; transition: .2s`,
    ".timelineHistoryMember:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: 0; z-index: 1; transition: .2s`,
    ".timelineHistoryMemberHolder[extend] .timelineHistoryMember:after": `opacity: .6`,
    ".timelineHistoryMember div[profileholder]": `z-index: 2`,
    ".timelineHistoryMember div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".timelineHistoryMember div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".timelineHistoryMember div[profileholder] div[profile]": `position: relative; width: 22px; height: 22px; border: solid 3px var(--pageColor); border-radius: 14px`,
    ".timelineHistoryMember div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".timelineHistoryMember div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".timelineHistoryMember div[content]": `display: flex; flex: 1; min-width: 0; max-width: calc(var(--width) - 34px); height: 28px; margin-left: 6px; text-align: left; overflow: hidden; align-items: center; z-index: 2; transition: .2s`,
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

    ".timelineSelect": `position: absolute; left: 0px; top: 0px; border-style: solid; border-width: 3px; border-color: var(--themeColor); opacity: 0; z-index: 9; border-radius: 9px; opacity .15s; pointer-events: none`
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

    let realtimeHolder = this.editor.content.querySelector(".eRealtime");
    
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

    let closing = false;
    memberFrame.addEventListener("mouseover", () => {
      closing = false;
      memberContent.removeAttribute("notransition");
      memberHolder.style.overflow = "unset";
      memberHolder.setAttribute("extend", "");
      memberFrame.style.setProperty("--width", (memberName.offsetWidth + memberEmail.offsetWidth + 48) + "px");
    });
    memberFrame.addEventListener("mouseout", async () => {
      closing = true;
      memberFrame.style.removeProperty("--width");
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

    let changes = [];
    let currentChange = 0;
    let changeData;
    let lastRenderChange;
    let totalChanges = 0;
    let playing = false;
    let loading = false;
    let selectionBoxes = {};
    
    let startPlaying = async () => {
      if (playing == true) {
        return;
      }
      playing = true;
      skimPlayButton.querySelector("div[play]").setAttribute("hidden", "");
      skimPlayButton.querySelector("div[pause]").removeAttribute("hidden");
      if (currentChange >= Math.max(totalChanges, changes.length)) {
        currentChange = 0;
        await this.updateTimeline({ fromPlayLoop: true });
      }
      while (playing == true) {
        currentChange++;
        await this.updateTimeline({ fromPlayLoop: true });
        if (currentChange >= Math.max(totalChanges, changes.length)) {
          return stopPlaying();
        }
        await sleep(350);
      }
    }
    let stopPlaying = () => {
      playing = false;
      skimPlayButton.querySelector("div[pause]").setAttribute("hidden", "");
      skimPlayButton.querySelector("div[play]").removeAttribute("hidden");
    }
    
    this.updateCurrentChange = () => {
      let useTotalChanges = Math.max(totalChanges, changes.length);

      let percent = currentChange / useTotalChanges;
      let stylePercent = percent * 100;
      sliderProgressBar.style.setProperty("--percent", stylePercent + "%");
      sliderButton.style.setProperty("--percent", stylePercent + "%");
      sliderLoaderBar.style.setProperty("--percent", ((changes.length / useTotalChanges) * 100) + "%");

      currentChangeText.innerHTML = "<b>" + currentChange + "</b> / " + useTotalChanges;

      if (currentChange > 0) {
        skimBackButton.removeAttribute("disabled");
      } else {
        skimBackButton.setAttribute("disabled", "");
      }
      if (currentChange < useTotalChanges) {
        skimNextButton.removeAttribute("disabled");
      } else {
        skimNextButton.setAttribute("disabled", "");
      }
    }
    this.updateTimeline = async (options = {}) => {
      if (options.fromPlayLoop != true) {
        stopPlaying();
      }

      this.updateCurrentChange();

      if (lastRenderChange == null) {
        lastRenderChange = currentChange;
      }
      
      let loadedChanges = 0;
      let useTotalChanges = 0;
      let currentChangeIndex = -1;
      while (true) {
        loadedChanges = changes.length;
        useTotalChanges = Math.max(totalChanges, changes.length);
        currentChangeIndex = loadedChanges - (useTotalChanges - currentChange) - 1;
        if (changes.length >= useTotalChanges) {
          break;
        }
        if (currentChangeIndex < 50) {
          if (loading == true) {
            break;
          }
          await this.loadChanges();
          continue;
        }
        if (currentChangeIndex >= 0) {
          break;
        }
      }

      if (currentChangeIndex < -1) {
        return;
      }
      changeData = changes[currentChangeIndex];
      
      let updateAnnotations = {};
      let currentChangeAnnotations = {};
      while (lastRenderChange != currentChange) {
        let useChangeType;
        let prevChangeData;
        let annoChanges;
        if (lastRenderChange > currentChange) {
          lastRenderChange--;
          useChangeType = "changes";

          prevChangeData = changes[loadedChanges - (useTotalChanges - lastRenderChange)] ?? {};
          annoChanges = prevChangeData.changes;
        } else if (lastRenderChange < currentChange) {
          prevChangeData = changes[loadedChanges - (useTotalChanges - lastRenderChange)] ?? {};
          annoChanges = prevChangeData.redoChanges;

          lastRenderChange++;
          useChangeType = "redoChanges";
        }
        
        if (annoChanges != null) {
          let addRedoChanges = prevChangeData.redoChanges == null && useChangeType == "changes";
          if (addRedoChanges == true) {
            prevChangeData.redoChanges = [];
          }
          for (let i = 0; i < annoChanges.length; i++) {
            let annotation = annoChanges[i];
            let original = updateAnnotations[annotation._id] ?? (this.editor.annotations[annotation._id] ?? {}).render;
            if (addRedoChanges == true) {
              prevChangeData.redoChanges.push(copyObject(original ?? { _id: annotation._id, remove: true }));
            }
            if (annotation.a == null) {
              annotation.a = prevChangeData.collaborator;
            }
            annotation.m = prevChangeData.collaborator;
            updateAnnotations[annotation._id] = { ...(original ?? {}), ...annotation };
            if (lastRenderChange == currentChange) {
              currentChangeAnnotations[annotation._id] = true;
            }
          }
        }
      }
      let isOffScreen = false;
      let centerTotalX = 0;
      let centerTotalY = 0;
      let setSelectionBoxes = {};
      let tempSelections = [];
      let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
      let updateAnnotationKeys = Object.keys(updateAnnotations);
      let totalAnnotationUpdates = updateAnnotationKeys.length;
      for (let i = 0; i < totalAnnotationUpdates; i++) {
        let updateAnno = updateAnnotations[updateAnnotationKeys[i]];
        let annoRect = this.editor.utils.getRect(updateAnno);

        let modifyID = updateAnno.m ?? updateAnno.a;
        if (modifyID != null && updateAnno.remove != true) {
          let mergedID = updateAnno._id + "_" + modifyID;
          let selection = selectionBoxes[mergedID];
          delete selectionBoxes[mergedID];
          let newSelection = selection == null;
          if (newSelection == true) {
            realtimeHolder.insertAdjacentHTML("beforeend", `<div class="timelineSelect" merged="${mergedID}" new></div>`);
            selection = realtimeHolder.querySelector('.timelineSelect[merged="' + mergedID + '"][new]');
            selection.removeAttribute("new");
            (async (element, modifyid) => {
              let collaborator = await this.editor.utils.getCollaborator(modifyid);
              if (collaborator != null && element != null) {
                element.style.setProperty("--themeColor", collaborator.color);
              }
            })(selection, modifyID);
          }
          setSelectionBoxes[mergedID] = selection;
          if (currentChangeAnnotations[updateAnno._id] == null) {
            tempSelections.push(selection);
          }
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
        
        if (isOffScreen == false) {
          isOffScreen = this.editor.utils.annotationInViewport(null, annoRect) == false;
        }
        centerTotalX += annoRect.centerX;
        centerTotalY += annoRect.centerY;
        
        await this.editor.save.apply(updateAnno, { overwrite: true, timeout: false, render: false });
      }
      this.pipeline.publish("redraw_selection", { transition: false });

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

      if (isOffScreen == true && totalAnnotationUpdates > 0) {
        this.editor.utils.scrollToAnnotation({ p: [centerTotalX / totalAnnotationUpdates, centerTotalY / totalAnnotationUpdates] }, { duration: 250 });
      }

      memberContent.setAttribute("notransition", "");
      
      let collaborator;
      if (changeData != null) {
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
      if (collaborator != null) {
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
        memberHolder.style.setProperty("--width", (memberName.offsetWidth + 36) + "px");
      } else {
        timelineDetail.style.removeProperty("display");
      }
    }

    this.pipeline.subscribe("timelineZoomUpdate", "zoom_change", () => {
      let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
      let allRealtimeSelections = realtimeHolder.querySelectorAll(".timelineSelect");
      for (let i = 0; i < allRealtimeSelections.length; i++) {
        let selection = allRealtimeSelections[i];
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
    })

    this.loadChanges = async () => {
      if (loading == true) {
        return;
      }
      loading = true;
      let path = "lessons/join/history";
      if (changes.length > 0) {
        path += "?amount=250&before=" + ((changes[0] ?? {}).added ?? getEpoch());
      }
      let [code, body] = await sendRequest("GET", path, null, { session: this.parent.session });
      if (code != 200) {
        return;
      }
      for (let i = 0; i < body.changes.length; i++) {
        changes.unshift(body.changes[i]);
      }
      sliderLoaderBar.style.setProperty("--percent", ((changes.length / Math.max(totalChanges, changes.length)) * 100) + "%");
      loading = false;
    }

    skimBackButton.addEventListener("click", () => {
      if (currentChange > 0) {
        currentChange--;
        this.updateTimeline();
      }
    });
    skimNextButton.addEventListener("click", () => {
      if (currentChange < Math.max(totalChanges, changes.length)) {
        currentChange++;
        this.updateTimeline();
      }
    });
    skimPlayButton.addEventListener("click", () => {
      if (playing == false) {
        startPlaying();
      } else {
        stopPlaying();
      }
    });

    let sliderEnabled = true;
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false) {
        sliderEnabled = false;
        this.pipeline.unsubscribe("timelineSelectorMouse");
        return;
      }
      let useTotalChanges = Math.max(totalChanges, changes.length);
      let barRect = sliderBar.getBoundingClientRect();
      let newCurrentChange = Math.round((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (sliderBar.offsetWidth - 10), 1), 0)) * useTotalChanges);
      if (currentChange != newCurrentChange) {
        currentChange = newCurrentChange;
        this.updateTimeline();
      }
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      eventBarUpdate(event);
      this.pipeline.subscribe("timelineSelectorMouse", "click_move", (data) => { eventBarUpdate(data.event); });
      this.pipeline.subscribe("timelineSelectorMouse", "click_end", (data) => { eventBarUpdate(data.event); });
    }
    sliderBar.addEventListener("mousedown", enableSlider);
    sliderBar.addEventListener("touchstart", enableSlider, { passive: true });

    (async () => {
      await this.loadChanges();
      currentChange = Math.max(totalChanges, changes.length);
      await this.updateTimeline();
      timeline.removeAttribute("disabled");
    })();
    (async () => {
      let [code, body] = await sendRequest("GET", "lessons/join/history/count", null, { session: this.parent.session });
      if (code == 200) {
        totalChanges += body.count;
        let loadChange = body.count - changes.length;
        currentChange += loadChange;
        if (lastRenderChange != null) {
          lastRenderChange += loadChange;
        }
        this.updateCurrentChange();
      }
    })();
  }
}