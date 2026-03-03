modules["breakout/overview"] = class {
  html = `
  <div class="broInterface customScroll">
    <div class="broTopHolder">
      <button class="broTopScroll" left style="left: 7px"></button>
      <button class="broTopScroll" right style="right: 7px"></button>
      <div class="broTop">
        <div class="broTopSection" left>
          <a class="broLogo" href="/app/dashboard" draggable="false"></a>
          <div class="broFileNameHolder border"><div class="broFileName" spellcheck="false" onpaste="clipBoardRead(event)" contenteditable></div></div>
          <button class="broFileDropdown">File</button>
          <button class="broStart"></button>
          <button class="broPause">Pause</button>
        </div>
        <div class="broTopSection" scroll>
          <div class="broTopDivider"></div>
        </div>
        <div class="broTopSection" right>
          <button class="broManageDropdown">Manage</button>
          <button class="broShare">Share</button>
          <button class="broMemberOptions" dropdowntitle="Member Options" title="Member Options | Configure various member settings."></button>
          <button class="broSharePin"></button>
          <div class="broTopDivider"></div>
          <button class="broAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
          <button class="broLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="broBottomHolder">
      <div class="broBottom">
        <div class="broBottomSection broOpenBoard">
          <button></button>
        </div>
        <div class="broBottomSection broWaitingRoom">
          <div class="broWaitingRoomMenu">
            <div class="broWaitingRoomButtonHolder">
              <div class="broWaitingRoomButtonHolderShadow"></div>
              <div class="broWaitingRoomButtonHolderScroll">
                <button class="broWaitingRoomButton" open><span title="Number of unassigned members."></span>Members</button>
                <button class="broWaitingRoomButton" close>Close</button>
              </div>
            </div>
            <div class="broWaitingRoomContent">
              <div class="broWaitingRoomHolder customScroll"></div>
            </div>
          </div>
        </div>
        <div class="broBottomButtonSpacer"></div>
      </div>
    </div>
  </div>
  <div class="broGroupHolder customScroll">
    <div class="broGroups"></div>
    <!--<div class="broBackground"></div>-->
  </div>`;
  css = {
    ".brPage[dragging] *": `user-select: none; webkit-user-select: none; cursor: grabbing !important`,

    ".broInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; contain: strict; overflow-y: scroll; z-index: 2`,
    ".broGroupHolder": `--interfacePadding: 58px; --tilePadding: 16px; --totalWidth: calc((var(--columnWidth) * var(--columnCount)) + (var(--tilePadding) * (var(--columnCount) - 1))); position: relative; display: flex; box-sizing: border-box; width: 100%; height: 100%; padding-top: calc(var(--interfacePadding) + 8px); background: var(--pageColor); contain: strict; overflow-x: hidden; overflow-y: scroll; overflow-anchor: none; z-index: 1; justify-content: center; transition: .5s`,
    ".broGroups": `position: absolute; box-sizing: border-box; width: var(--totalWidth); height: calc(var(--totalHeight) + var(--interfacePadding) + 8px); z-index: 2; transition: width .3s`,
    //".broBackground": `position: absolute; width: 100%; height: 100%; min-height: calc(var(--totalHeight) + (var(--interfacePadding) * 2) + 16px); left: 0px; top: 0px; opacity: .075; background-image: url("../images/editor/backdropblack.svg"); background-size: 25px 25px; background-position: center 50px; z-index: 1; pointer-events: none; contain: strict`,
    ".broCreateBreakoutHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; z-index: 3; pointer-events: none`,

    ".broTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".broTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".broTopHolder[scroll] .broTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".broTop::-webkit-scrollbar": `display: none`,
    ".broTopSection[scroll]": `display: none`,
    ".broTopHolder[scroll] .broTopSection[scroll]": `display: flex !important`,
    ".broTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".broTopScroll svg": `width: 22px`,
    ".broTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".broTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".broTopHolder[scroll] .broTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".broTopSection[left]": `border-bottom-right-radius: 12px`,
    ".broTopSection[right]": `border-bottom-left-radius: 12px`,

    ".broLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".broLogo:hover": `background: var(--hover)`,
    ".broLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".broLogo:hover svg": `transform: scale(.9)`,
    ".broFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".broFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".broFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".broFileName::-webkit-scrollbar": `display: none`,
    ".broFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".broStart": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".broPause": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".broManageDropdown": `display: none; padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--hover); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".broShare": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".broTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,

    ".broMemberOptions": `display: flex; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".broMemberOptions svg": `width: 32px; height: 32px`,
    ".broSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".broAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".broAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".broLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
  
    ".broBottomHolder": `position: relative; flex: 1; width: 100%; margin: auto 0 8px 0; visibility: visible`,
    ".broBottom": `position: absolute; display: flex; width: 100%; height: 100%; padding-top: 8px; left: 0px; top: 0px; overflow-x: auto; overflow-y: hidden; justify-content: space-between; align-items: flex-end; scrollbar-width: none`,
    ".broBottom::-webkit-scrollbar": `display: none`,
    ".broBottomSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".broBottomSection[hidden]": `display: none`,
    ".broBottomSection:first-child": `border-top-left-radius: 0`,
    ".broBottomSection:last-child": `border-top-right-radius: 0`,
    ".broWaitingRoom": `position: relative; display: flex !important; flex: 1; min-width: 150px; padding: 0; margin: 0 8px; justify-content: center; align-items: center; background: unset !important; box-shadow: unset !important; pointer-events: none; transition: .2s`,
    ".broWaitingRoom[hidden] *": `pointer-events: none !important`,
    ".broWaitingRoomMenu": `position: absolute; display: flex; flex-direction: column; width: 100%; left: 0px; top: 0px; align-items: center; transition: .4s`,
    ".broWaitingRoom:not([hidden]) .broWaitingRoomMenu[open]": `transform: translateY(calc(50px - 100%))`,
    ".broWaitingRoomButtonHolder": `position: relative; width: fit-content; max-width: calc(100% - 24px); background: var(--pageColor); border-radius: 12px 12px 0 0; z-index: 2; pointer-events: all`,
    ".broWaitingRoomButtonHolderShadow": `position: absolute; width: 100%; height: 100%; left: -16px; top: -16px; padding: 16px 16px 0 16px; overflow: hidden; z-index: -1; border-radius: inherit; pointer-events: none`,
    ".broWaitingRoomButtonHolderShadow:after": `content: ""; position: absolute; width: calc(100% - 32px); height: calc(100% - 16px); left: 16px; top: 16px; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".broWaitingRoomButtonHolderScroll": `box-sizing: border-box; display: flex; max-width: 100%; height: 50px; padding: 6px; align-items: center; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".broWaitingRoomButtonHolderScroll::-webkit-scrollbar": `display: none`,
    ".broWaitingRoomButton": `display: flex; height: 32px; padding: 6px 10px; margin: 4px; border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600; white-space: nowrap`,
    ".broWaitingRoomButton span": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB)); display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); border-radius: 12px; font-weight: 700`,
    ".broWaitingRoomButton[open]": `background: var(--hover)`,
    ".broWaitingRoomButton[close]": `display: none; background: var(--theme); color: #fff`,
    ".broWaitingRoomMenu[open] .broWaitingRoomButton[close]": `display: flex !important`,
    ".broWaitingRoomContent": `position: relative; width: 100%; background: var(--pageColor); border-radius: 12px 12px 0 0; overflow: hidden; z-index: 1; pointer-events: all; transition: .4s`,
    ".broWaitingRoomMenu[open] .broWaitingRoomContent": `box-shadow: var(--lightShadow)`,
    ".broWaitingRoomHolder": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 8px; width: 100%; max-height: 40vh; padding: 16px; overflow-y: auto; overflow-x: hidden; justify-content: center`,
    ".broWaitingRoomHolder .broTileMember": `width: fit-content !important; margin: unset !important`,
    ".broWaitingRoomHolder .broTileMemberContent": `padding: 6px 12px 6px 6px !important`,

    ".broBottomButtonSpacer": `display: none; flex-shrink: 0; width: 50px`,
    ".broOpenBoard": `display: none; box-shadow: var(--boardLightShadow)`,
    ".broOpenBoard button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".broOpenBoard button:hover": `background: var(--boardHover)`,
    ".broOpenBoard button svg": `width: 32px; height: 32px; transition: .2s`,
    ".broOpenBoard button:hover svg": `transform: scale(.9)`,

    ".broTile": `position: absolute; width: var(--columnWidth); height: fit-content; left: 0px; top: 0px; z-index: 1; transition: .3s`, // will-change: transform;
    ".broTileContent": `--shadow: var(--lightShadow); position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 16px; contain: strict; overflow: hidden; transition: .2s, transform .1s`,
    ".broTile:hover .broTileContent": `--shadow: var(--darkShadow) !important`,
    ".broTile:active .broTileContent": `transform: scale(.95)`,
    ".broTilePreviewContainer": `position: relative; flex-shrink: 0; width: 100%; height: var(--previewHeight); z-index: 1`,
    ".broTilePreviewContainer:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: all !important`,
    ".broTilePreview": `position: absolute; width: calc(var(--previewWidth) * (1 / var(--previewScale))); height: calc(var(--previewWidth) * var(--previewHeightRatio) * (1 / var(--previewScale))); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(var(--previewScale)); transform-origin: center; background: var(--pageColor); contain: strict; overflow: scroll; scrollbar-width: none; transition: opacity .4s`,
    ".broTilePreview::-webkit-scrollbar": `display: none`,
    ".broTileHeader": `position: absolute; display: flex; gap: 8px; width: 100%; left: 0px; top: 0px; justify-content: space-between; z-index: 3; pointer-events: none`,
    ".broTileHeaderName": `display: flex; box-sizing: border-box; gap: 0; min-width: 0; padding: 6px; align-items: center; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 0 0 16px 0; overflow: hidden; pointer-events: all; transition: .2s`,
    ".broTileHeaderName:focus-within": `gap: 6px`,
    ".broTileHeaderNameImage": `display: none; flex-shrink: 0; width: 30px; height: 30px; border-radius: 10px; object-fit: cover`,
    ".broTileHeaderNameHolder": `--borderRadius: 6px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s; min-width: 0; height: 30px; align-content: center`,
    ".broTileHeaderNameHolder:focus-within": `--borderWidth: 2px !important`,
    ".broTileHeaderNameHolderText": `max-width: 100%; padding: 0 6px; outline: unset; font-size: 18px; font-weight: 500; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".broTileHeaderNameHolderText:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important; cursor: text`,
    ".broTileHeaderNameHolderText::-webkit-scrollbar": `display: none`,
    ".broTileHeaderOptions": `display: flex; box-sizing: border-box; padding: 2px; justify-content: center; align-items: center; background: var(--pageColor); opacity: 0; box-shadow: var(--shadow); border-radius: 0 0 0 16px; pointer-events: all; transition: .2s`,
    ".broTile:hover .broTileHeaderOptions": `opacity: 1 !important`,
    ".broTileHeaderOptionsButton": `display: flex; width: 30px; height: 30px; margin: 4px; flex-shrink: 0; justify-content: center; align-items: center; border-radius: 16px`,
    ".broTileHeaderOptionsButton > svg": `flex-shrink: 0; width: 24px; height: 24px`,
    ".broTileHeaderOptionsButton:hover": `background: var(--hover)`,
    ".broTileMembers": `position: relative; flex: 1; width: 100%; padding-bottom: 6px; background: var(--pageColor); z-index: 2`,
    ".broTileMembers:has(> .broTileMember):before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; box-shadow: var(--shadow)`,
    ".broTileMember": `--shadow: var(--lightShadow); position: relative; width: calc(100% - 12px); padding: 0; margin: 6px 6px 0; background: var(--pageColor); border-radius: 10px; cursor: grab`,
    ".broTileMember:hover, .broTileMember:active, .broTileMember[dragging]": `--shadow: var(--darkShadow)`,
    ".broTileMember:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; pointer-events: none; box-shadow: var(--shadow)`,
    ".broTileMemberContent": `display: flex; box-sizing: border-box; width: 100%; gap: 6px; padding: 6px; overflow: hidden; justify-content: space-between`,
    ".broTileMemberNameHolder": `display: flex; min-width: 0; align-items: center`,
    ".broTileMember:not([active]) .broTileMemberNameHolder > div:not(.broTileMemberNameDragHolder)": `opacity: .5 !important`,
    ".broTileMemberNameDragHolder": `--transformTranslate: translateX(calc(-6px - 100%)); width: 0px; height: 28px; margin-right: 0px; transition: .2s`,
    ".broTileMember:hover .broTileMemberNameDragHolder, .broTileMember:active .broTileMemberNameDragHolder, .broTileMember[dragging] .broTileMemberNameDragHolder, .broWaitingRoomHolder .broTileMemberNameDragHolder": `--transformTranslate: translateX(0px); width: 16px; margin-right: 6px`,
    ".broTileMemberNameDragHandle": `display: flex; flex-direction: column; box-sizing: border-box; width: 16px; height: 28px; padding: 4px 0; justify-content: space-between; align-items: center; transform: var(--transformTranslate); transition: .2s`,
    ".broTileMemberNameDragHandleDot": `width: 100%; height: 4px; border-radius: 2px; background: var(--gray)`,
    ".broTileMemberNameCursor": `flex-shrink: 0; position: relative; box-sizing: border-box; width: 28px; height: 28px; margin-right: 6px; background: var(--pageColor); border: solid 4px var(--themeColor); border-radius: 8px 14px 14px; transition: .2s`,
    //".broTileMemberNameCursor:before": `content: ""; position: absolute; width: calc(100% + 6px); height: calc(100% + 6px); left: -3px; top: -3px; border-radius: inherit; contain: strict; box-shadow: 0 0 6px rgb(0 0 0 / 25%)`,
    ".broTileMemberNameText": `font-size: 16px; font-weight: 500; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: .2s`,
    ".broTileMemberPercent": `--percent: 0; --invert: 0; --themeColor: var(--theme); flex-shrink: 0; position: relative; width: 36px; height: 16px; margin: 4px; border: solid 2px var(--themeColor); border-radius: 12px; transition: .2s`,
    //".broTileMemberPercent:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; box-shadow: inset 0px 0px 8px 0px rgba(var(--themeRGB), .3)`,
    ".broTileMemberPercentBarHolder": `position: absolute; width: calc(100% - 4px); height: calc(100% - 4px); left: 2px; top: 2px; border-radius: 8px; overflow: hidden`,
    ".broTileMemberPercentBar": `--width: calc((var(--percent) * ((32px / 2) - 6px))); position: absolute; width: calc(12px + var(--width)); height: 100%; left: calc((100% / 2) - 6px); transform: translateX(calc(var(--invert) * var(--width) * -1)); background: var(--themeColor); border-radius: 6px; transition: .2s`,

    ".broTileAddGroup": `z-index: 2 !important`,
    ".broTileAddGroup .broTileContent": `--opacity: .3; --pageColor: rgba(var(--background), 0); box-sizing: border-box; padding: 12px; background: rgba(var(--themeRGB), var(--opacity)); justify-content: center; align-items: center`,
    ".broTileAddGroup:hover .broTileContent": `--opacity: 1; --pageColor: rgba(var(--background), 1); transform: scale(1.05); border-radius: 20px`,
    ".broTileAddGroup:active .broTileContent": `transform: scale(.98)`,
    ".broTileAddGroup .broTileContent svg": `width: 100%; height: 100%`,
  };

  pipeline = { // PIPELINE : Distributes events across various modules and services:
    pipeline: {}, // All active events
    pipelineSubs: {}, // All active subscribes
    publish: async (event, data) => {
      let listeners = this.pipeline.pipeline[event] ?? [];
      for (let i = 0; i < listeners.length; i++) {
        let subscribe = (this.pipeline.pipelineSubs[listeners[i]] ?? {})[event] ?? {};
        if (subscribe.callback != null) {
          await subscribe.callback(data);
        }
      }
    },
    subscribe: (id, event, callback, extra) => {
      extra = extra ?? {};

      if (extra.unsubscribe != true) {
        this.pipeline.unsubscribe(id, event);
      } else {
        this.pipeline.unsubscribe(id);
      }

      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        this.pipeline.pipelineSubs[id] = {};
        pipelineSubs = this.pipeline.pipelineSubs[id];
      }
      let subData = { callback: callback };
      pipelineSubs[event] = subData;

      let pipelineEvent = this.pipeline.pipeline[event];
      if (pipelineEvent == null) {
        this.pipeline.pipeline[event] = [];
        pipelineEvent = this.pipeline.pipeline[event];
      }
      pipelineEvent.push(id);
      if (extra.sort != null) {
        subData.sort = extra.sort;
        pipelineEvent.sort((a, b) => {
          return (((this.pipeline.pipelineSubs[a] ?? {})[event] ?? {}).sort ?? 0) - (((this.pipeline.pipelineSubs[b] ?? {})[event] ?? {}).sort ?? 0);
        });
      }
    },
    unsubscribe: (id, event) => {
      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        return;
      }
      let checkEvents;
      if (event != null) {
        checkEvents = [event];
      } else {
        checkEvents = Object.keys(pipelineSubs);
      }
      for (let i = 0; i < checkEvents.length; i++) {
        let check = checkEvents[i];
        let pipelineEvents = this.pipeline.pipeline[check] ?? [];
        let index = pipelineEvents.indexOf(id);
        if (index > -1) {
          pipelineEvents.splice(index, 1);
        }
        if (pipelineEvents.length < 1) {
          delete this.pipeline.pipeline[check];
        }
        delete this.pipeline.pipelineSubs[id][check];
      }
      if (Object.keys(pipelineSubs).length < 1) {
        delete this.pipeline.pipelineSubs[id];
      }
    }
  };

  templateRoots = {};

  unassignedMembers = 0;

  getTemplate = () => {
    if (this.template != null) {
      return this.template;
    }
    let templateID = (this.parent.parent.lesson.breakout ?? {}).template;
    if (templateID == null) {
      return;
    }
    if (this.fetchTemplatePromise != null) {
      return this.fetchTemplatePromise;
    }
    this.fetchTemplatePromise = new Promise(async (resolve) => {
      let [code, body] = await sendRequest("GET", "lessons/breakout/templates?template=" + templateID, null, { session: this.parent.parent.session });
      if (code != 200) {
        return resolve({});
      }
      this.template = body;
      resolve(body);
    });
    return this.fetchTemplatePromise;
  }

  scrollOffset = 58;

  previewEditorPageSizeFunction = (tile) => {
    let invertedScale = 1 / this.layout.previewScale;
    let standardWidth = this.layout.previewWidth;
    let standardHeight = this.layout.previewWidth * this.layout.tileHeightRatio;
    tile.editor.pageOffsetWidth = standardWidth * invertedScale;
    tile.editor.pageOffsetHeight = standardHeight * invertedScale;
    let parentRectX = this.groupHolderRect.x + ((this.containerWidth - this.layout.groupsWidth) / 2) - ((standardWidth - this.layout.columnWidth) / 2);
    let parentRectY = this.groupHolderRect.y + this.scrollOffset + (this.layout.tilePadding - 8) - this.layout.scrollTop - ((standardHeight - this.layout.previewHeight) / 2);
    tile.editor.pageRect = {
      scale: invertedScale,
      x: parentRectX + tile.x,
      y: parentRectY + tile.y,
      width: tile.editor.pageOffsetWidth,
      height: tile.editor.pageOffsetHeight,
      left: parentRectX + tile.x,
      right: parentRectX + tile.x + this.layout.columnWidth,
      top: parentRectY + tile.y,
      bottom: parentRectY + tile.y + tile.height
    };
  }

  js = async (frame) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let page = frame.closest(".brPage");

    let topHolder = frame.querySelector(".broTopHolder");
    let top = topHolder.querySelector(".broTop");

    let leftTop = top.querySelector(".broTopSection[left]");
    let icon = leftTop.querySelector(".broLogo");
    let lessonName = leftTop.querySelector(".broFileName");
    let fileButton = leftTop.querySelector(".broFileDropdown");
    let startButton = leftTop.querySelector(".broStart");
    let pauseButton = leftTop.querySelector(".broPause");

    let rightTop = top.querySelector(".broTopSection[right]");
    let manageButton = rightTop.querySelector(".broManageDropdown");
    let shareButton = rightTop.querySelector(".broShare");
    let optionsButton = rightTop.querySelector(".broMemberOptions");
    let sharePinButton = rightTop.querySelector(".broSharePin");
    let accountButton = rightTop.querySelector(".broAccount");
    let loginButton = rightTop.querySelector(".broLogin");

    let topScrollLeft = topHolder.querySelector(".broTopScroll[left]");
    let topScrollRight = topHolder.querySelector(".broTopScroll[right]");

    let groupHolder = frame.querySelector(".broGroupHolder");
    let groups = groupHolder.querySelector(".broGroups");
    //let background = groupHolder.querySelector(".broBackground");

    let bottom = frame.querySelector(".broBottom");
    let openBoardHolder = bottom.querySelector(".broOpenBoard");
    let openBoard = openBoardHolder.querySelector("button");
    let waitingRoomHolder = bottom.querySelector(".broWaitingRoom");
    let waitingRoom = bottom.querySelector(".broWaitingRoomMenu");
    let waitingRoomOpenButton = waitingRoom.querySelector(".broWaitingRoomButton[open]");
    let waitingRoomOpenButtonCount = waitingRoomOpenButton.querySelector("span");
    let waitingRoomCloseButton = waitingRoom.querySelector(".broWaitingRoomButton[close]");
    let waitingRoomMembersHolder = waitingRoom.querySelector(".broWaitingRoomHolder");
    let bottomButtonSpacer = bottom.querySelector(".broBottomButtonSpacer");

    let updateTopBar = (ignoreAttr) => {
      if (ignoreAttr != true) {
        topHolder.removeAttribute("scroll");
      }
      if (top.scrollWidth > top.clientWidth) {
        if (ignoreAttr != true) {
          topHolder.setAttribute("scroll", "");
        }
        if (Math.floor(top.scrollLeft) > 0) {
          topScrollLeft.style.opacity = 1;
          topScrollLeft.style.pointerEvents = "all";
        } else {
          topScrollLeft.style.opacity = 0;
          topScrollLeft.style.pointerEvents = "none";
        }
        if (Math.floor(top.scrollWidth - top.scrollLeft) > Math.floor(top.clientWidth)) {
          topScrollRight.style.opacity = 1;
          topScrollRight.style.pointerEvents = "all";
        } else {
          topScrollRight.style.opacity = 0;
          topScrollRight.style.pointerEvents = "none";
        }
      } else {
        topScrollLeft.style.opacity = 0;
        topScrollLeft.style.pointerEvents = "none";
        topScrollRight.style.opacity = 0;
        topScrollRight.style.pointerEvents = "none";
      }
    }
    topScrollLeft.addEventListener("click", function () {
      top.scrollTo({ left: top.scrollLeft - 200, behavior: "smooth" });
      updateTopBar();
    });
    topScrollRight.addEventListener("click", function () {
      top.scrollTo({ left: top.scrollLeft + 200, behavior: "smooth" });
      updateTopBar();
    });
    this.pipeline.subscribe("topbarResize", "resize", updateTopBar);
    this.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { updateTopBar(true); });
    this.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", updateTopBar);
    updateTopBar();

    top.addEventListener("scroll", (event) => {
      this.pipeline.publish("topbar_scroll", { event: event });
    });

    icon.addEventListener("click", (event) => {
      event.preventDefault();
      setFrame("pages/app/dashboard");
    });
    lessonName.textContent = this.parent.parent.lesson.name ?? "Untitled Lesson";
    lessonName.title = lessonName.textContent;
    lessonName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        lessonName.blur();
        return;
      }
    });
    lessonName.addEventListener("input", updateTopBar);
    lessonName.addEventListener("focusout", async () => {
      lessonName.scrollTo(0, 0);
      lessonName.parentElement.style.setProperty("--borderWidth", "0px");
      updateTopBar();

      let name = lessonName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      if (lessonName.textContent == this.parent.parent.lesson.name) {
        lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      let oldName = this.parent.parent.lesson.name;
      this.parent.parent.lesson.name = name;
      lessonName.textContent = name;
      lessonName.title = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.parent.parent.lesson.name = oldName;
        lessonName.textContent = oldName;
        lessonName.title = oldName;
      }
    });
    lessonName.addEventListener("focus", async () => {
      lessonName.parentElement.style.setProperty("--borderWidth", "4px");
      updateTopBar();
    });

    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/lesson/breakout/overview/file", { parent: this });
    });

    let updateStatus = () => {
      let breakout = this.parent.parent.lesson.breakout ?? {};

      startButton.style.removeProperty("display");
      pauseButton.style.removeProperty("display");
      manageButton.style.removeProperty("display");
      switch (breakout.status ?? "ended") {
        case "disabled":
          startButton.textContent = "Start";
          startButton.style.display = "unset";
          manageButton.style.display = "unset";
          break;
        case "enabled":
          pauseButton.style.display = "unset";
          manageButton.style.display = "unset";
          break;
        case "paused":
          startButton.textContent = "Resume";
          startButton.style.display = "unset";
          manageButton.style.display = "unset";
          break;
        case "ended":
          startButton.textContent = "Setup";
          startButton.style.display = "unset";
      }
    }
    startButton.addEventListener("click", () => {
      
    });
    pauseButton.addEventListener("click", () => {
      
    });
    updateStatus();

    shareButton.addEventListener("click", () => {
      dropdownModule.open(shareButton, "dropdowns/lesson/share", { parent: this.parent });
    });
    sharePinButton.addEventListener("click", () => {
      if (modules["dropdowns/lesson/share/pin"] != null) {
        dropdownModule.open(sharePinButton, "dropdowns/lesson/share/pin", { parent: this.parent });
      }
    });
    if (this.parent.parent.lesson.pin != null) {
      sharePinButton.style.display = "unset";
      sharePinButton.textContent = this.parent.parent.lesson.pin;
    }
    optionsButton.addEventListener("click", () => {
      if (modules["dropdowns/lesson/share/options"] != null) {
        dropdownModule.open(optionsButton, "dropdowns/lesson/share/options", { title: "Options", parent: this.parent });
      }
    });

    if (userID != null) {
      accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
        accountButton.querySelector("img").src = account.image;
      }
      accountButton.addEventListener("click", () => {
        dropdownModule.open(accountButton, "dropdowns/account", { parent: this });
      });
    } else {
      accountButton.remove();
      loginButton.style.display = "block";
      loginButton.addEventListener("click", () => { promptLogin(); });
    }

    this.pipeline.subscribe("overviewLessonSet", "set", (body) => {
      if (body.hasOwnProperty("breakout") == true) {
        updateStatus();
        if (body.breakout.hasOwnProperty("status") == true && this.setupModal != null) {
          this.setupModal.close();
        }
      }
      if (this.template != null && (body.id ?? body._id) == this.template._id) {
        objectUpdate(body, this.template);
      }
      if (body.name != null && document.activeElement.closest(".boFileName") != lessonName) {
        lessonName.textContent = this.parent.parent.lesson.name ?? "Untitled Lesson";
        lessonName.title = lessonName.textContent;
      }
      if (this.parent.parent.lesson.pin != null) {
        sharePinButton.textContent = this.parent.parent.lesson.pin;
        sharePinButton.style.display = "unset";
      } else {
        sharePinButton.style.removeProperty("display");
      }
      if (body.hasOwnProperty("tool") == true) {
        //updateSplitScreenButton();
      }
      updateTopBar();
    }, { sort: 1 });
    this.pipeline.subscribe("overviewLessonSubSet", "subset", (body) => {
      let set = body.set ?? body;
      if (set != null && (set.breakout ?? {}).hasOwnProperty("template") == true) {
        this.template = body.template;
      }
    }, { sort: 1 });

    /*this.updateBackground = () => {
      if (getTheme() != "dark") {
        groupHolder.style.setProperty("--backgroundColor", "#FFFFFF");
        background.style.setProperty("background-image", "url(../images/editor/backdropblack.svg)");
        groupHolder.style.setProperty("--secondaryBackgroundColor", "#7f7f7f");
      } else {
        groupHolder.style.setProperty("--backgroundColor", "#0a1c2d");
        background.style.setProperty("background-image", "url(../images/editor/backdropwhite.svg)");
        groupHolder.style.setProperty("--secondaryBackgroundColor", "#848d96");
      }
    }*/
    this.pipeline.subscribe("accountUpdate", "account_settings", (event) => {
      /*if (event.settings.hasOwnProperty("theme") == true) {
        this.updateBackground();
      }*/
    });
    //this.updateBackground();

    // Handle Tile Masonry Layout:
    this.layout = {};
    this.layout.minTileWidth = 260;
    this.layout.maxTileWidth = 450;
    this.layout.tilePadding = 16;
    this.layout.maxContainerWidth = (this.layout.minTileWidth * 6) + (this.layout.tilePadding * 5) - 1;
    this.layout.columnCount = 0;
    this.layout.columnWidth = 0;
    this.layout.previewScale = 1;
    this.layout.tileBaseHeight = 12; // Base padding around tile
    //this.layout.tileHeightRatio = 3/4; // Ratio for getting height from width of thumbnail
    //this.layout.previewHeight // Height of preview
    this.layout.tileMemberHeight = 40; // Height of each member list item
    this.layout.tileMemberGap = 6; // Gap between each member list item
    this.layout.columns = {};
    this.layout.tiles = {};
    this.layout.members = {};
    this.layout.memberSessions = {};
    this.layout.tileLayout = [];
    this.layout.tileLayoutVersionIndex = 0;
    this.layout.loadedTiles = [];
    this.layout.pendingEditors = [];
    this.layout.loadingAnnotations = {};
    this.layout.longSubscribedGroups = [];
    this.layout.maxLongSubscribedGroups = 100;
    this.layout.getTileHeight = (tile) => {
      let memberCount = (tile.members ?? []).length;
      return (this.layout.tileBaseHeight * Math.min(memberCount, 1))
      + this.layout.previewHeight
      + (this.layout.tileMemberHeight * memberCount)
      + Math.max(this.layout.tileMemberGap * (memberCount - 1), 0);
    }
    this.layout.getSectionTop = (sectionID) => {
      let longestColumn = 0;
      for (let i = 0; i < this.layout.columnCount; i++) {
        let checkColumn = this.layout.columns[i + 1] ?? {};
        if (checkColumn.sections == null) {
          continue;
        }
        let totalHeight = 0;
        let sectionKeys = Object.keys(checkColumn.sections).sort();
        for (let s = 0; s < sectionKeys.length; s++) {
          let checkID = sectionKeys[s];
          if (checkID == sectionID) {
            break;
          }
          let section = checkColumn.sections[checkID] ?? {};
          if (section.height != null) {
            totalHeight += section.height;
          }
        }
        if (totalHeight > longestColumn) {
          longestColumn = totalHeight;
        }
      }
      return longestColumn;
    }
    this.layout.shortestColumn = (tile = {}) => {
      if (tile.section == null) {
        return [null, null];
      }

      let column;
      let section;
      let minHeight;
      for (let i = 0; i < this.layout.columnCount; i++) {
        let checkColumn = this.layout.columns[i + 1] ?? {};
        if (checkColumn.sections == null) {
          continue;
        }
        let checkSection = checkColumn.sections[tile.section];
        if (checkSection == null) {
          checkColumn.sections[tile.section] = { height: 0 };
          checkSection = checkColumn.sections[tile.section];
        }
        if (checkSection.height < minHeight || minHeight == null) {
          column = checkColumn;
          section = checkSection;
          minHeight = checkSection.height;
        }
      }

      return [column, section];
    }
    this.layout.loadEditorAnnotations = async (tile = {}, body = {}, root = {}) => {
      if (tile.editor == null) {
        return;
      }
      if (this.layout.loadingAnnotations[tile.render._id] == null) {
        return;
      }
      delete this.layout.loadingAnnotations[tile.render._id];
      let skipPositioning = tile.editorState != null;
      await tile.editor.loadAnnotations({
        annotations: body.annotations ?? [],
        rootAnnotations: root.annotations ?? [],
        sources: [ ...(body.sources ?? []), ...(root.sources ?? []) ],
        reactions: [ ...(body.reactions ?? []), ...(root.reactions ?? []) ],
        reactedTo: [ ...(body.reactedTo ?? []), ...(root.reactedTo ?? []) ]
      }, { skipPositioning });
      if (skipPositioning != null) {
        if (tile.editorState != null) {
          await tile.editor.setState(tile.editorState);
        }
      }
      if (tile.element != null) {
        let previewHolder = tile.element.querySelector(".broTilePreview");
        if (previewHolder != null) {
          previewHolder.removeAttribute("disabled");
        }
      }
    }
    this.layout.setupEditors = async () => {
      if (this.layout.runningEditorSetup == true) {
        return;
      }
      this.layout.runningEditorSetup = true;

      let getGroupAnnotations = [];
      let getGroupRoots = [];
      for (let i = 0; i < this.layout.pendingEditors.length; i++) {
        let tile = this.layout.pendingEditors[i];
        if (tile.loadedAnnotations != true && this.layout.loadingAnnotations[tile.render._id] == null) {
          this.layout.loadingAnnotations[tile.render._id] = [];
          getGroupAnnotations.push(tile.render._id);

          this.layout.longSubscribedGroups.push(tile.render._id);
          if (this.layout.longSubscribedGroups.length > this.layout.maxLongSubscribedGroups) {
            let unloadTileID = this.layout.longSubscribedGroups.shift();
            let unloadTile = this.layout.tiles[unloadTileID];
            if (unloadTile != null) {
              if (unloadTile.editor != null) {
                unloadTile.editor.reset();
              }
              delete unloadTile.loadedAnnotations;
              delete this.layout.loadingAnnotations[unloadTileID];
            }
          }
        }
        if (tile.render.template != null) {
          let rootID = tile.render.version + "_" + tile.render.template;
          if (this.templateRoots[rootID] == null && this.layout.loadingAnnotations[rootID] == null) {
            this.layout.loadingAnnotations[rootID] = [];
            getGroupRoots.push(rootID);
          }
        }
      }

      // Bulk Fetch Annotations for Groups:
      if (getGroupAnnotations.length > 0) {
        (async () => {
          let buffer = "";
          await sendRequest(
            "POST",
            "lessons/breakout/groups/bulkannotations",
            {
              groups: getGroupAnnotations,
              roots: getGroupRoots
            }, {
              session: this.parent.session,
              streaming: true,
              onChunk: async (data) => {
                buffer += data;
                let lines = buffer.split("\n");
                buffer = lines.pop();
                for (let i = 0; i < lines.length; i++) {
                  let line = lines[i];
                  if (line.trim()) {
                    try {
                      let [type, id, body] = JSON.parse(line);
                      switch (type) {
                        case "group":
                          let tile = this.layout.tiles[id];
                          tile.loadedAnnotations = true;
                          if (tile.render.template != null) {
                            let rootID = tile.render.version + "_" + tile.render.template;
                            let root = this.templateRoots[rootID];
                            if (root != null) {
                              await this.layout.loadEditorAnnotations(tile, body, root);
                            } else {
                              let rootLoad = this.layout.loadingAnnotations[rootID];
                              if (rootLoad != null) {
                                rootLoad.push([tile, body]);
                              }
                            }
                          }
                          break;
                        case "root":
                          this.templateRoots[id] = body;
                          let rootLoad = this.layout.loadingAnnotations[id];
                          if (rootLoad != null) {
                            for (let r = 0; r < rootLoad.length; r++) {
                              let [tile, groupBody] = rootLoad[r];
                              await this.layout.loadEditorAnnotations(tile, groupBody, body);
                            }
                          }
                      }
                    } catch (error) {
                      console.error("Error parsing line:", error);
                    }
                  }
                }
              }
            }
          );
          for (let i = 0; i < getGroupAnnotations.length; i++) {
            delete this.layout.loadingAnnotations[getGroupAnnotations[i]];
          }
          for (let i = 0; i < getGroupRoots.length; i++) {
            delete this.layout.loadingAnnotations[getGroupRoots[i]];
          }
        })();
      }

      while (this.layout.pendingEditors.length > 0 && this.layout.runningEditorSetup == true) {
        let tile = this.layout.pendingEditors.shift();
        if (tile.editor == null || tile.element == null) {
          continue;
        }
        tile.editor.updatePageSize();
        
        if (tile.editorState != null) {
          await tile.editor.setState(tile.editorState);
        } else {
          await tile.editor.updateChunks();
          await tile.editor.loadAnnotations();
        }
        tile.editor.previewLoaded = true;
      }

      this.layout.runningEditorSetup = false;
    }
    this.layout.updateTile = (tile) => {
      let tileNameHeader = tile.element.querySelector(".broTileHeaderName");
      if (tile.render.image != null) {
        let tileNameImage = tileNameHeader.querySelector(".broTileHeaderNameImage");
        tileNameImage.src = assetURL + tile.render.image;
        tileNameImage.style.display = "block";
      }
      tileNameHeader.querySelector(".broTileHeaderNameHolderText").textContent = tile.render.name ?? "Untitled Group";
    }
    this.layout.updateMemberTile = (collaborator = {}, memberTile) => {
      if (collaborator._id == null) {
        return;
      }
      if (memberTile == null) {
        let groupMember = this.layout.members[collaborator._id] ?? {};
        if (groupMember.tile == null) {
          return this.layout.addMemberTile(collaborator._id);
        }
        memberTile = groupMember.tile;
      }
      if (collaborator.hasOwnProperty("color") == true) {
        memberTile.style.setProperty("--themeColor", collaborator.color);
      }
      if ((this.layout.memberSessions[collaborator._id] ?? []).length > 0) {
        memberTile.setAttribute("active", "");
      } else {
        memberTile.removeAttribute("active");
      }
      if (collaborator.hasOwnProperty("name") == true) {
        let memberName = memberTile.querySelector(".broTileMemberNameText");
        memberName.textContent = collaborator.name;
        memberName.title = collaborator.name;
      }
    }
    this.layout.addMemberTile = (collaboratorID, refresh) => {
      let member = this.layout.members[collaboratorID] ?? {};
      let tile;
      let element = waitingRoomMembersHolder;
      if (member.group != null) {
        tile = this.layout.tiles[member.group] ?? {};
        if (tile.element == null) {
          if (refresh != false) {
            this.layout.refreshTileSpots(this.layout.tileLayout.indexOf(tile.render._id));
          }
          return;
        }
        element = tile.element.querySelector(".broTileMembers");
      }
      let collaborator = this.parent.parent.collaborators[collaboratorID];
      if (collaborator == null) {
        return;
      }
      let memberTile = document.createElement("button");
      memberTile.className = "broTileMember";
      memberTile.setAttribute("collaborator", collaboratorID);
      memberTile.innerHTML = `
      <div class="broTileMemberContent">
        <div class="broTileMemberNameHolder">
          <div class="broTileMemberNameDragHolder"><div class="broTileMemberNameDragHandle">
            <div class="broTileMemberNameDragHandleDot"></div>
            <div class="broTileMemberNameDragHandleDot"></div>
            <div class="broTileMemberNameDragHandleDot"></div>
          </div></div>
          <div class="broTileMemberNameCursor"></div>
          <div class="broTileMemberNameText"></div>
        </div>
      </div>
      `;
      if (member.group != null) {
        memberTile.querySelector(".broTileMemberContent").insertAdjacentHTML("beforeend", `<div class="broTileMemberPercent">
          <div class="broTileMemberPercentBarHolder">
            <div class="broTileMemberPercentBar"></div>
          </div>
        </div>`);
      }
      let groupMember = this.layout.members[collaboratorID];
      if (groupMember != null) {
        groupMember.tile = memberTile;
      }
      this.layout.updateMemberTile(collaborator, memberTile);
      element.appendChild(memberTile);
      if (refresh != false && tile != null) {
        this.layout.refreshTileSpots(this.layout.tileLayout.indexOf(tile.render._id));
      }
    }
    this.layout.removeMemberTile = (collaboratorID, refresh) => {
      let groupMember = this.layout.members[collaboratorID] ?? {};
      if (groupMember.tile == null) {
        return;
      }
      groupMember.tile.remove();
      groupMember.tile = null;
      if (refresh != false) {
        this.layout.refreshTileSpots(this.layout.tileLayout.indexOf(groupMember.group));
      }
    }
    this.layout.runUpdateCycle = async () => {
      if (this.layout.runningUpdateCycle == true) {
        return;
      }
      this.layout.runningUpdateCycle = true;
      this.layout.runningEditorSetup = false;

      this.layout.scrollTop = groupHolder.scrollTop;
      let centerScroll = this.layout.scrollTop + (this.containerHeight / 2);
      let renderDistance = this.containerHeight;
      let minLoadBound = centerScroll - renderDistance;
      let maxLoadBound = centerScroll + renderDistance;

      let minLoadedBound;
      let minTileID;
      let maxLoadedBound;
      let maxTileID;
      let loadedTileKeys = Object.keys(this.layout.loadedTiles);
      for (let i = 0; i < loadedTileKeys.length; i++) {
        let tileID = loadedTileKeys[i];
        let tile = this.layout.tiles[tileID];
        if (tile.y < minLoadedBound || minLoadedBound == null) {
          minLoadedBound = tile.y;
          minTileID = tileID;
        }
        if ((tile.y + tile.height) > maxLoadedBound || maxLoadedBound == null) {
          maxLoadedBound = (tile.y + tile.height);
          maxTileID = tileID;
        }
      }

      let startIndex = 0;
      if (minTileID != null) {
        startIndex = this.layout.tileLayout.indexOf(minTileID);
      }
      let endIndex = startIndex;
      if (maxTileID != null) {
        endIndex = this.layout.tileLayout.indexOf(maxTileID);
      }
      let useIndex = Math.floor((startIndex + endIndex) / 2);

      let lowerIndex = useIndex;
      let higherIndex = useIndex;
      let iteration = 0;
      let loadTiles = {};
      while (lowerIndex != null || higherIndex != null) {
        /*if (iteration > 100) {
          console.log("BREAK BREAK BREAK");
          break;
        }*/

        let index;
        if ((iteration % 2) == 0) {
          if (lowerIndex != null) {
            index = lowerIndex;
            lowerIndex--;
          }
        } else {
          if (higherIndex != null) {
            index = higherIndex;
            higherIndex++;
          }
        }
        iteration++;
        if (index < 0) {
          lowerIndex = null;
          continue;
        }
        if (index > this.layout.tileLayout.length) {
          higherIndex = null;
          continue;
        }

        let tileID = this.layout.tileLayout[index];
        let tileData = this.layout.tiles[tileID];

        if (tileData == null) {
          continue;
        }

        let minLoaded = (tileData.y + tileData.height) > minLoadBound;
        if (minLoaded == false) {
          lowerIndex = null;
        }
        let maxLoaded = tileData.y < maxLoadBound;
        if (maxLoaded == false) {
          higherIndex = null;
        }

        if (!(minLoaded == true && maxLoaded == true)) {
          continue;
        }

        loadTiles[tileID] = true;
      }

      // Load New Tiles:
      let newTilesFragment = document.createDocumentFragment();
      let newTilesPendingEditors = [];
      let loadTileKeys = Object.keys(loadTiles);
      for (let i = 0; i < loadTileKeys.length; i++) {
        let tileID = loadTileKeys[i];
        let tile = this.layout.tiles[tileID];

        if (tile.element == null) {
          if (tileID != "NEW_GROUP_CREATE") {
            tile.element = document.createElement("a");
            tile.element.className = "broTile";
            tile.element.setAttribute("group", tileID);
            tile.element.innerHTML = `<div class="broTileContent">
              <div class="broTilePreviewContainer">
                <div class="broTilePreview"></div>
              </div>
              <div class="broTileHeader">
                <div class="broTileHeaderName">
                  <img class="broTileHeaderNameImage" />
                  <div class="broTileHeaderNameHolder border"><div class="broTileHeaderNameHolderText" contenteditable></div></div>
                </div>
                <div class="broTileHeaderOptions">
                  <button class="broTileHeaderOptionsButton"></button>
                </div>
              </div>
              <div class="broTileMembers"></div>
            </div>`;
            this.layout.updateTile(tile);
            setSVG(tile.element.querySelector(".broTileHeaderOptions button"), "../images/editor/actions/more.svg");
            if (tile.loadedAnnotations != true) {
              tile.element.querySelector(".broTilePreview").setAttribute("disabled", "");
            }
            let members = tile.members ?? [];
            for (let i = 0; i < members.length; i++) {
              this.layout.addMemberTile(members[i], false);
            }
            newTilesPendingEditors.push(tile);
            newTilesFragment.appendChild(tile.element);
          } else {
            tile.element = document.createElement("button");
            tile.element.className = "broTile broTileAddGroup";
            tile.element.innerHTML = `<div class="broTileContent"></div>`;
            setSVG(tile.element.querySelector(".broTileContent"), "../images/editor/breakout/plus.svg");
            newTilesFragment.appendChild(tile.element);
          }
        }

        if (tile.cache == null) {
          tile.cache = {};
        }
        
        if (tile.cache.height != tile.height) {
          tile.cache.height = tile.height;
          tile.element.style.setProperty("height", tile.height + "px");
        }

        let pushTransform = false;
        if (tile.cache.left != tile.x) {
          tile.cache.left = tile.x;
          pushTransform = true;
        }
        if (tile.cache.top != tile.y) {
          tile.cache.top = tile.y;
          pushTransform = true;
        }
        if (pushTransform == true) {
          tile.element.style.setProperty("transform", "matrix(1, 0, 0, 1, " + tile.x + ", " + tile.y + ")");
        }

        if (tile.editor != null) {
          let centerPosition = tile.editor.getCenterPosition();
          tile.editor.updatePageSize();
          if (this.lastResizeWasSimulated != true) {
            tile.editor.goToCenterPosition(centerPosition.x, centerPosition.y);
          } else {
            if (tile.editorState != null) {
              tile.editorState = null;
            }
            if (tile.editor.annotationPages.length > 0) {
              tile.editor.utils.updateAnnotationScroll(tile.editor.annotationPages[tile.editor.currentPage - 1], false);
            } else {
              tile.editor.utils.centerWindowWithPage();
            }
          }
        }

        delete this.layout.loadedTiles[tileID];
      }

      // Load Editors:
      for (let i = 0; i < newTilesPendingEditors.length; i++) {
        let tile = newTilesPendingEditors[i];
        if (tile.element == null) {
          continue;
        }
        let previewContainer = tile.element.querySelector(".broTilePreviewContainer");
        let previewHolder = previewContainer.querySelector(".broTilePreview");
        let existingState = {};
        if (tile.editor != null) {
          existingState = tile.editor.getState();
          delete existingState.zoom;
          delete existingState.centerPosition;
        }
        tile.editor = await this.setFrame("editor/editor", previewHolder, {
          construct: {
            page: previewContainer,
            pageID: this.parent.pageID,
            pageType: this.parent.pageType,
            id: tile.render._id,
            lesson: this.parent.parent,
            self: this.parent.parent.self,
            session: this.parent.parent.session,
            sessionID: this.parent.parent.sessionID,
            sources: this.parent.parent.sources,
            pageRenderPipeline: this.parent.parent.pageRenderPipeline,
            backgroundColor: tile.render.background ?? "FFFFFF",
            //scrollOffset: 50, //* (1 / this.layout.previewScale),
            //sideScrollOffset: 8, //* (1 / this.layout.previewScale),
            skipPDFTextAnnotationLayer: true,
            ...existingState
          }
        });
        tile.editor.updatePageSize = async () => {
          this.previewEditorPageSizeFunction(tile);
          //await tile.editor.render.setMarginSize();
          //await tile.editor.updateChunks();
        }
        this.layout.pendingEditors.push(tile);
      }

      // Bulk Apply Elements:
      groups.appendChild(newTilesFragment);

      // Configure Editor Viewports:
      //this.layout.setupEditors();
      clearTimeout(this.layout.setupEditorsTimeout);
      this.layout.setupEditorsTimeout = setTimeout(this.layout.setupEditors, 50);

      // Unload Tiles:
      let unloadTileKeys = Object.keys(this.layout.loadedTiles);
      for (let i = 0; i < unloadTileKeys.length; i++) {
        let tileID = unloadTileKeys[i];
        let tile = this.layout.tiles[tileID];
        if (tile.editor != null) {
          if (tile.editor.previewLoaded == true) {
            let existingState = tile.editor.getState();
            tile.editorState = { zoom: existingState.zoom, centerPosition: existingState.centerPosition };
          }
          tile.editor.destroy();
          //tile.editor = null;
        }
        if (tile.element != null) {
          tile.element.remove();
          tile.element = null;
          tile.cache = null;
        }
      }

      this.layout.loadedTiles = loadTiles;

      this.lastResizeWasSimulated = false;

      this.layout.runningUpdateCycle = false;
    }
    this.layout.refreshTotalColumnHeight = () => {
      this.layout.longestColumn = this.layout.getSectionTop();
      groupHolder.style.setProperty("--totalHeight", (this.layout.longestColumn - this.layout.tilePadding) + "px");
    }
    this.layout.refreshTileSpots = (offset = 0) => {
      offset = Math.max(offset, 0);
      for (let i = offset; i < this.layout.tileLayout.length; i++) {
        let tileID = this.layout.tileLayout[i];
        let tileData = this.layout.tiles[tileID];
        if (tileData == null) {
          this.layout.tileLayout.splice(i, 1);
          i--;
          continue;
        }
        if (tileData.height == null) {
          continue;
        }
        let column = this.layout.columns[tileData.column] ?? {};
        if (column.sections != null) {
          let section = column.sections[tileData.section] ?? {};
          if (section.height != null) {
            section.height -= (tileData.height + this.layout.tilePadding);
          }
          section.top = null;
        }
      }
      for (let i = offset; i < this.layout.tileLayout.length; i++) {
        let tileID = this.layout.tileLayout[i];
        let tileData = this.layout.tiles[tileID];
        let [column, section] = this.layout.shortestColumn(tileData);
        if (column == null) {
          continue;
        }
        if (section.top == null) {
          section.top = this.layout.getSectionTop(tileData.section);
        }
        tileData.column = column.number;
        tileData.x = (this.layout.columnWidth * (column.number - 1)) + (this.layout.tilePadding * (column.number - 1));
        tileData.y = section.height + section.top;
        tileData.height = this.layout.getTileHeight(tileData);
        section.height += tileData.height + this.layout.tilePadding;
      }

      this.layout.runUpdateCycle();
      this.layout.refreshTotalColumnHeight();
    }
    this.layout.updateColumns = () => {
      groupHolder.style.setProperty("--columnCount", this.layout.columnCount);
      groupHolder.style.setProperty("--columnWidth", this.layout.columnWidth + "px");
      groupHolder.style.setProperty("--previewWidth", this.layout.previewWidth + "px");
      groupHolder.style.setProperty("--previewHeight", this.layout.previewHeight + "px");
      groupHolder.style.setProperty("--previewHeightRatio", this.layout.tileHeightRatio);
      groupHolder.style.setProperty("--previewScale", this.layout.previewScale);

      this.groupHolderRect = groupHolder.getBoundingClientRect();

      this.layout.refreshTileSpots();
    }
    this.layout.setupColumns = (force) => {
      this.pageOffsetWidth = frame.offsetWidth;
      this.pageOffsetHeight = frame.offsetHeight;

      this.containerWidth = groupHolder.clientWidth;
      this.containerHeight = groupHolder.clientHeight;

      // Determine the number and width of columns:
      let groupsWidth = Math.min(this.containerWidth - (this.layout.tilePadding * 2), this.layout.maxContainerWidth);

      let maxPossibleColumns = Math.floor(
        (groupsWidth + this.layout.tilePadding) / (this.layout.minTileWidth + this.layout.tilePadding)
      );
      let newColumnCount = Math.max(1, maxPossibleColumns);

      while (true) {
        let totalInterPadding = this.layout.tilePadding * (newColumnCount - 1);
        this.layout.columnWidth = (groupsWidth - totalInterPadding) / newColumnCount;
        if (this.layout.columnWidth <= this.layout.maxTileWidth || newColumnCount < 2) break;
        newColumnCount--;
      }

      this.layout.columnWidth = Math.min(
        this.layout.maxTileWidth,
        Math.max(this.layout.minTileWidth, this.layout.columnWidth),
        groupsWidth
      );

      this.layout.groupsWidth = (this.layout.columnWidth * newColumnCount) + (this.layout.tilePadding * (newColumnCount - 1));

      // Reorganize tiles to new columns:
      while (this.layout.columnCount != newColumnCount) {
        if (this.layout.columnCount < newColumnCount) { // Add a new column:
          let newColumn = {
            number: this.layout.columnCount + 1,
            sections: {}
          };
          this.layout.columns[newColumn.number] = newColumn;

          this.layout.columnCount = Math.ceil(this.layout.columnCount + 1);
        } else { // Remove a column:
          let column = this.layout.columns[this.layout.columnCount];
          if (column != null) {
            delete this.layout.columns[this.layout.columnCount];
          }

          this.layout.columnCount = Math.floor(this.layout.columnCount - 1);
        }
      }

      this.layout.tileHeightRatio = this.pageOffsetHeight / this.pageOffsetWidth;

      let previewWidth = this.layout.columnWidth;
      let previewHeight = this.layout.columnWidth * this.layout.tileHeightRatio;
      if (previewHeight > 400) {
        previewHeight = 400;
      } else if (previewHeight < 200) {
        previewWidth *= 200 / previewHeight;
        previewHeight = 200;
      }
      this.layout.previewWidth = Math.round(previewWidth);
      this.layout.previewHeight = Math.round(previewHeight);

      this.layout.previewScale = (this.layout.columnWidth * this.layout.tileHeightRatio) / this.containerHeight;
      
      clearTimeout(this.layout.refreshTilesTimeout);
      if (force != true) {
        this.layout.refreshTilesTimeout = setTimeout(this.layout.updateColumns, 200);
      } else {
        this.layout.updateColumns();
      }
    }
    this.pipeline.subscribe("tilesResize", "resize", (event) => {
      this.lastResizeWasSimulated = event.simulated == true;
      this.layout.setupColumns();
    });
    this.pipeline.subscribe("tilesScroll", "scroll", this.layout.runUpdateCycle, { sort: 1 });
    this.layout.setupColumns(true);
    this.layout.removeTile = (tileID) => {
      let tile = this.layout.tiles[tileID];
      if (tile == null) {
        return;
      }
      delete this.layout.tiles[tileID];
      let index = this.layout.tileLayout.indexOf(tileID);
      if (index > -1) {
        if (tile.version == null || tile.version == (this.parent.parent.lesson.breakout ?? {}).version) {
          this.layout.tileLayoutVersionIndex--;
        }
        this.layout.tileLayout.splice(index, 1);
      }
    }
    this.layout.addTile = (data, members, refresh) => {
      if (data == null) {
        return;
      }
      if (this.layout.tiles[data._id] != null) {
        this.layout.removeTile(data._id);
      }
      let tileInfo = {
        section: data.version,
        render: data,
        members: members ?? []
      };
      this.layout.tiles[data._id] = tileInfo;
      if ((data.version == null || data.version == (this.parent.parent.lesson.breakout ?? {}).version) && data._id != "NEW_GROUP_CREATE") {
        this.layout.tileLayout.splice(this.layout.tileLayoutVersionIndex, 0, data._id);
        this.layout.tileLayoutVersionIndex++;
        if (refresh == true) {
          this.layout.refreshTileSpots(this.layout.tileLayoutVersionIndex - 1);
        }
      } else {
        this.layout.tileLayout.push(data._id);
        if (refresh == true) {
          this.layout.refreshTileSpots(this.layout.tileLayout.length - 1);
        }
      }
    }

    let dragContext = {};
    let wasDragging = false;

    this.unassignedMembers = 0;
    let updateUnassignedMemberCount = (change = 0) => {
      this.unassignedMembers += change;
      if (this.unassignedMembers > 0) {
        waitingRoomOpenButtonCount.style.display = "flex";
        waitingRoomOpenButtonCount.parentElement.style.padding = "4px 10px 4px 4px";
      } else {
        waitingRoomOpenButtonCount.style.removeProperty("display");
        waitingRoomOpenButtonCount.parentElement.style.removeProperty("padding");
      }
      if (this.unassignedMembers > 0 || dragContext.enabled == true) {
        waitingRoomHolder.removeAttribute("hidden");
      } else {
        waitingRoomHolder.setAttribute("hidden", "");
      }
      waitingRoomOpenButtonCount.textContent = this.unassignedMembers;
    }

    let memberKeys = Object.keys(this.parent.parent.members);
    for (let i = 0; i < memberKeys.length; i++) {
      let memberID = memberKeys[i];
      let member = this.parent.parent.members[memberID];
      if (member.access > 3) {
        continue;
      }
      let session = this.layout.memberSessions[member.modify];
      if (session == null) {
        this.layout.memberSessions[member.modify] = [];
        session = this.layout.memberSessions[member.modify];
      }
      session.push(memberID);
      this.layout.members[member.modify] = { ...(this.layout.members[member.modify] ?? {}), group: member.group, modify: member.modify };
      if (member.group == null) {
        this.unassignedMembers++;
        this.layout.updateMemberTile(this.parent.parent.collaborators[member.modify]);
      }
    }
    updateUnassignedMemberCount();

    let loadingGroups = false;
    let allGroupsLoaded = false;
    let lastGroupTime;
    this.loadGroups = async () => {
      if (loadingGroups == true || allGroupsLoaded == true) {
        return;
      }
      loadingGroups = true;

      let path = "lessons/breakout/groups";
      if (lastGroupTime != null) {
        path += "?after=" + lastGroupTime;
      }
      let [code, body] = await sendRequest("GET", path, null, { session: this.parent.parent.session });
      if (code != 200) {
        return;
      }
      for (let i = 0; i < body.collaborators.length; i++) {
        let collaborator = body.collaborators[i];
        this.parent.parent.collaborators[collaborator._id] = collaborator;
      }
      let beforeTileLength = this.layout.tileLayout.length;
      let bodyItems = body.groups.length;
      if (bodyItems < 25) {
        allGroupsLoaded = true;
      }
      for (let i = 0; i < bodyItems; i++) {
        let group = body.groups[i];
        let members = [];
        for (let m = 0; m < group.members.length; m++) {
          let member = group.members[m];
          this.layout.members[member.modify] = { group: group._id, ...member };
          members.push(member.modify);
        }
        delete group.members;
        this.layout.addTile(group, members);
      }
      this.layout.refreshTileSpots(beforeTileLength);
      lastGroupTime = (body.groups[bodyItems - 1] ?? {}).created;

      let filter = { type: "lesson", id: this.parent.parent.id, group: this.layout.tileLayout };
      if (this.layout.groupUpdateSub != null) {
        this.layout.groupUpdateSub.edit(filter);
      } else {
        this.layout.groupUpdateSub = subscribe(filter, (data) => {
          if ((data.data ?? {}).id == null) {
            return;
          }
          let tile = this.layout.tiles[data.data.id];
          if (tile == null) {
            return;
          }
          objectUpdate(data.data, tile.render);
          this.layout.updateTile(tile);
          if (tile.editor != null) {
            tile.editor.pipeline.publish("set", data.data);
          }
          this.parent.pipeline.publish("set", data.data);
        });
      }

      loadingGroups = false;
    }
    let checkLoadGroups = async () => {
      if (groupHolder.scrollTop + this.containerHeight + 500 > groupHolder.scrollHeight || groups.clientHeight < this.containerHeight) {
        await this.loadGroups();
        if (loadingGroups != true && allGroupsLoaded != true) {
          checkLoadGroups();
        }
      }
    }
    this.pipeline.subscribe("tilesLoadMore", "bounds_change", checkLoadGroups);
    (async () => {
      await checkLoadGroups();
      this.layout.addTile({ _id: "NEW_GROUP_CREATE", version: (this.parent.parent.lesson.breakout ?? {}).version });
    })();

    let pendingMemberAssignment = {};
    this.pipeline.subscribe("createGroup", "creategroup", async (data) => {
      await this.layout.addTile(data, pendingMemberAssignment[data._id] ?? [], true);
      delete pendingMemberAssignment[data._id];
    });

    this.pipeline.subscribe("memberJoin", "join", (data) => {
      if (data.access > 3) {
        return;
      }
      let session = this.layout.memberSessions[data.modify];
      let existingMember = this.layout.members[data.modify];
      if (session == null) {
        this.layout.memberSessions[data.modify] = [];
        session = this.layout.memberSessions[data.modify];
        if (data.group == null) {
          updateUnassignedMemberCount(1);
        }
      } else if (existingMember != null && existingMember.group != null && data.group == null) {
        updateUnassignedMemberCount(-1);
      }
      if (session.includes(data._id) == false) {
        session.push(data._id);
      }

      if (existingMember != null && existingMember.group != data.group) {
        if (existingMember.group != null) {
          let groupTile = this.layout.tiles[existingMember.group] ?? {};
          if (groupTile.members != null) {
            let index = groupTile.members.indexOf(data.modify);
            if (index > -1) {
              groupTile.members.splice(index, 1);
            }
          }
          this.layout.removeMemberTile(data.modify);
        }
      }
      this.layout.members[data.modify] = { ...(existingMember ?? {}), group: data.group, modify: data.modify };
      if (data.group != null) {
        let groupTile = this.layout.tiles[data.group];
        if (groupTile == null) {
          let pending = pendingMemberAssignment[data.group];
          if (pending == null) {
            pendingMemberAssignment[data.group] = [];
            pending = pendingMemberAssignment[data.group];
          }
          if (pending.includes(data.modify) == false) {
            pending.push(data.modify);
          }
        } else if (groupTile.members != null && groupTile.members.includes(data.modify) == false) {
          groupTile.members.push(data.modify);
          this.layout.addMemberTile(data.modify);
        } else {
          this.layout.updateMemberTile(this.parent.parent.collaborators[data.modify]);
        }
      } else {
        this.layout.updateMemberTile(this.parent.parent.collaborators[data.modify]);
      }
    }, { sort: 1 });
    let updateMember = (modify, data) => {
      let groupMember = this.layout.members[modify];
      if (groupMember == null) {
        return;
      }
      if (data.hasOwnProperty("group") == true && data.group != groupMember.group) {
        if (groupMember.group != null) {
          let oldGroupTile = this.layout.tiles[groupMember.group] ?? {};
          if (oldGroupTile.members != null) {
            let index = oldGroupTile.members.indexOf(modify);
            if (index > -1) {
              oldGroupTile.members.splice(index, 1);
            }
          }
        } else if (data.group != null) {
          updateUnassignedMemberCount(-1);
        }
        this.layout.removeMemberTile(modify);
        groupMember.group = data.group;
        if (data.group != null) {
          let groupTile = this.layout.tiles[data.group];
          if (groupTile == null) {
            let pending = pendingMemberAssignment[data.group];
            if (pending == null) {
              pendingMemberAssignment[data.group] = [];
              pending = pendingMemberAssignment[data.group];
            }
            if (pending.includes(data.modify) == false) {
              pending.push(data.modify);
            }
          } else if (groupTile.members != null && groupTile.members.includes(modify) == false) {
            groupTile.members.push(modify);
            this.layout.addMemberTile(modify);
          }
        } else if ((this.layout.memberSessions[modify] ?? []).length > 0) {
          this.layout.addMemberTile(modify);
          updateUnassignedMemberCount(1);
        }
      }
    }
    this.pipeline.subscribe("memberUpdate", "update", (data) => {
      let member = this.parent.parent.members[data._id];
      if (member == null || member.access > 3) {
        return;
      }
      updateMember(member.modify, data);
    }, { sort: 1 });
    this.pipeline.subscribe("groupMemberMove", "move", (data) => {
      let existingMember = this.layout.members[data.modify];
      if (existingMember != null) {
        existingMember = {
          ...data,
          group: existingMember.group,
          tile: existingMember.tile
        };
        updateMember(data.modify, { group: data.group });
      }
    });
    this.pipeline.subscribe("memberLeave", "leave", (data) => {
      if (data.member != null) {
        if (data.member.access > 3) {
          return;
        }
        let session = this.layout.memberSessions[data.member.modify];
        if (session != null) {
          let index = session.indexOf(data.member._id);
          if (index > -1) {
            session.splice(index, 1);
          }
          if (session.length < 1) {
            delete this.layout.memberSessions[data.member.modify];
            if (data.member.group != null) {
              this.layout.updateMemberTile(this.parent.parent.collaborators[data.member.modify]);
            } else {
              this.layout.removeMemberTile(data.member.modify);
              updateUnassignedMemberCount(-1);
            }
          }
        }
      }
    }, { sort: 1 });

    this.pipeline.subscribe("collaboratorUpdate", "collaborator_update", (data) => {
      let groupMember = this.layout.members[data._id];
      if (groupMember != null) {
        this.layout.updateMemberTile(data);
      }
    }, { sort: 1 });

    this.pipeline.subscribe("previewLongAnnotationUpdate", "long", async (event) => {
      if (event.id == null) {
        return;
      }
      let tile = this.layout.tiles[event.id];
      if (tile == null) {
        return;
      }
      if (tile.editor != null) {
        tile.editor.pipeline.publish("long", event);
      }
    });

    this.pipeline.subscribe("groupUpdatePageClose", "page_close", () => {
      if (this.layout.groupUpdateSub != null) {
        this.layout.groupUpdateSub.close();
      }
    });
    
    groupHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });

    let waitingRoomOpen = false;
    let openWaitingRoom = () => {
      waitingRoomOpen = true;
      waitingRoom.setAttribute("open", "");
    }
    let closeWaitingRoom = () => {
      waitingRoomOpen = false;
      waitingRoom.removeAttribute("open");
    }
    waitingRoomOpenButton.addEventListener("click", () => {
      if (waitingRoom.hasAttribute("open") == false) {
        openWaitingRoom();
      } else {
        closeWaitingRoom();
      }
    });
    waitingRoomCloseButton.addEventListener("click", () => {
      closeWaitingRoom();
    });

    this.openGroup = (groupID) => {
      let tileData = this.layout.tiles[groupID];
      let editor;
      if (tileData.editor != null && tileData.loadedAnnotations == true) {
        editor = tileData.editor;
      }
      this.parent.openPage("secondary", "breakout/group", { group: tileData.render, editor });
    }
    
    this.onOpen = () => {
      if (this.parent.parent.self.group != null) {
        sendRequest("DELETE", "lessons/breakout/groups/leave", null, { session: this.parent.parent.session });
      }
      modifyParams("team");
    }

    frame.addEventListener("click", async (event) => {
      if (dragContext.enabled == true || wasDragging == true) {
        wasDragging = false;
        return;
      }
      let target = event.target;
      let tile = target.closest(".broTile:not([disabled])");
      if (target.closest("button") != null) {
        let memberTile = target.closest(".broTileMember");
        if (memberTile != null) {
          return dropdownModule.open(memberTile, "dropdowns/lesson/breakout/overview/managemember", { parent: this, collaboratorID: memberTile.getAttribute("collaborator"), title: "Manage" });
        }
        if (tile != null && tile.classList.contains("broTileAddGroup") == true) {
          tile.setAttribute("disabled", "");
          await sendRequest("POST", "lessons/breakout/groups/new", null, { session: this.parent.parent.session });
          if (tile != null) {
            tile.removeAttribute("disabled");
          }
          return;
        }
        return;
      }
      if (target.closest("div[contenteditable]") != null || target.closest(".broTileMembers") != null) {
        return;
      }
      if (tile == null) {
        return;
      }
      this.openGroup(tile.getAttribute("group"));
    });

    groups.addEventListener("contextmenu", (event) => {
      
    });

    groups.addEventListener("pointerdown", (event) => {
      let target = event.target;
      let tile = target.closest(".broTile");
      if (tile == null) {
        return;
      }
      let tileContent = tile.querySelector(".broTileContent");
      if (target.closest("button") == null && target.closest("div[contenteditable]") == null && target.closest(".broTileMembers") == null) {
        tileContent.style.removeProperty("transform");
      } else if (tile.classList.contains("broTileAddGroup") == false) {
        tileContent.style.transform = "scale(1)";
      }
    });

    let dragStart = (event) => {
      if (dragContext.enabled == true && dragContext.forceMouseDown == true) {
        wasDragging = true;
        return dragEnd(event);
      }
      dragContext = {};
      let target = event.target;
      let pageRect = frame.getBoundingClientRect();
      let mouseX = (event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0) - pageRect.x;
      let mouseY = (event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0) - pageRect.y;
      let tile = target.closest(".broTileMember");
      if (tile == null) {
        return;
      }
      let tileData = this.layout.members[tile.getAttribute("collaborator")];
      if (dragContext.tileData != null) {
        return;
      }
      dragContext = {
        tileData,
        width: tile.clientWidth,
        height: tile.clientHeight,
        startX: mouseX,
        startY: mouseY,
        startScrollY: groupHolder.scrollTop,
        waitingRoomOpen
      };
      page.setAttribute("dragging", "");
    }
    frame.addEventListener("mousedown", dragStart);

    let removeDrag = (moved) => {
      if (dragContext.tileData != null) {
        page.removeAttribute("dragging");
      }
      let removeElement = dragContext.element;
      if (removeElement == null) {
        return;
      }
      if (dragContext.tileData != null && dragContext.tileData.tile != null && frame.contains(dragContext.tileData.tile) == true) {
        let button = dragContext.tileData.tile.closest(".broTile");
        let pageRect = frame.getBoundingClientRect();
        let originalRect = dragContext.tileData.tile.getBoundingClientRect();
        if (moved != true) {
          removeElement.style.transform = "translate(" + ((originalRect.x - pageRect.x) - (dragContext.lastX - dragContext.offsetX)) + "px, " + (originalRect.y - pageRect.y - dragContext.lastY + dragContext.offsetY) + "px) scale(.975)";
          dragContext.tileData.tile.removeAttribute("disabled");
        } else {
          removeElement.style.transformOrigin = dragContext.offsetX + "px " + dragContext.offsetY + "px";
          removeElement.style.transform = "translate(0px, 0px) scale(0)";
        }
        (async () => {
          await sleep(100);
          if (button != null) {
            button.removeAttribute("disabled");
          }
        })();
      } else {
        removeElement.style.transformOrigin = "center";
        removeElement.style.transform = "translate(0px, 0px) scale(0)";
      }
      removeElement.style.opacity = 0;
      (async () => {
        await sleep(200);
        if (removeElement != null) {
          removeElement.remove();
        }
      })();
      if (dragContext.waitingRoomOpen == true) {
        openWaitingRoom();
      }
      dragContext = {};
      updateUnassignedMemberCount();
    }
    
    let scrollOffset = 32;
    let scrollY = 0;
    let scrollIntervalRunning = false;
    let scrollInterval = async () => {
      if (scrollIntervalRunning == true) {
        return;
      }
      scrollIntervalRunning = true;
      while (scrollY != 0 && dragContext.enabled == true) {
        groupHolder.scrollTo({ top: groupHolder.scrollTop + scrollY });
        await sleep(10);
      }
      scrollIntervalRunning = false;
    }
    let dragMove = (event) => {
      let mouseX = this.lastMouseX ?? 0;
      let mouseY = this.lastMouseY ?? 0;
      if (event != null) {
        mouseX = event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0;
        mouseY = event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0;
        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;
      }
      if (dragContext.tileData == null || dragContext.tileData.tile == null) {
        return removeDrag();
      }
      if (mouseDown() == false && dragContext.forceMouseDown != true) {
        return removeDrag();
      }
      let pageRect = frame.getBoundingClientRect();
      mouseX -= pageRect.x;
      mouseY -= pageRect.y;
      let startX = dragContext.startX ?? mouseX;
      let startY = dragContext.startY ?? mouseY;
      dragContext.lastX = mouseX;
      dragContext.lastY = mouseY;
      if (dragContext.enabled != true) {
        if (Math.abs(mouseX - startX) > 5 || Math.abs(mouseY - startY) > 5 || dragContext.forceMouseDown == true) {
          if (event != null && dragContext.forceMouseDown != true && (event.target.closest(".broTileMember") == null || frame.contains(dragContext.tileData.tile) == false)) {
            return removeDrag();
          }
          dragContext.enabled = true;
          dragContext.element = dragContext.tileData.tile.cloneNode(true);
          dragContext.element.style.position = "absolute";
          dragContext.element.style.width = dragContext.width + "px";
          dragContext.element.style.height = dragContext.height + "px";
          dragContext.element.style.background = "var(--pageColor)";
          dragContext.element.style.boxShadow = "var(--shadow)";
          //dragContext.element.style.borderRadius = 8 + "px";
          dragContext.element.style.zIndex = 10;
          dragContext.element.style.pointerEvents = "none";
          let originalRect = dragContext.tileData.tile.getBoundingClientRect();
          dragContext.offsetX = dragContext.offsetX ?? (startX - (originalRect.x - pageRect.x));
          dragContext.offsetY = dragContext.offsetY ?? (startY - (originalRect.y - pageRect.y + (groupHolder.scrollTop - dragContext.startScrollY)));
          dragContext.element.style.transform = "translate(" + Math.min(startX + startX - mouseX - mouseX, 0) + "px, " + Math.min(startY + startY - mouseY - mouseY, 0) + "px) scale(.975)";
          dragContext.element.style.transformOrigin = "0 0";
          dragContext.element.style.opacity = 0;
          dragContext.element.style.transition = "transform .3s, opacity .2s";
          dragContext.element.setAttribute("dragging", "");
          dragContext.tileData.tile.setAttribute("disabled", "");
          dragContext.element.removeAttribute("activated");
          frame.appendChild(dragContext.element);
          let mainTile = dragContext.tileData.tile.closest(".broTile");
          if (mainTile != null) {
            mainTile.setAttribute("disabled", "");
          }
          dragContext.element.offsetHeight;
          dragContext.element.style.transform = "translate(0px, 0px) scale(.975)";
          dragContext.element.style.opacity = 1;

          if (dragContext.waitingRoomOpen == true) {
            closeWaitingRoom();
          }
          updateUnassignedMemberCount();
        } else {
          return;
        }
      }
      if (dragContext.element == null) {
        return;
      }
      dragContext.element.style.left = (mouseX - (dragContext.offsetX ?? 0)) + "px";
      dragContext.element.style.top = (mouseY - (dragContext.offsetY ?? 0)) + "px";

      scrollY = 0;
      let topPos = scrollOffset - mouseY;
      if (topPos > 0) {
        let percentage = 1 + ((topPos - scrollOffset) / scrollOffset);
        scrollY = -Math.min(10 * percentage, 10);
      }
      let bottomPos = mouseY - page.offsetHeight + scrollOffset;
      if (bottomPos > 0) {
        let percentage = 1 + ((bottomPos - scrollOffset) / scrollOffset);
        scrollY = Math.min(10 * percentage, 10);
      }
      if (dragContext.autoScrollActive == true) {
        scrollInterval();
      } else if (scrollY == 0) {
        dragContext.autoScrollActive = true;
      }
    }
    this.pipeline.subscribe("dragMemberMove", "click_move", (data) => { dragMove(data.event); });

    let dragEnd = async (event) => {
      if (dragContext.enabled != true || dragContext.tileData == null || dragContext.tileData.tile == null) {
        return removeDrag();
      }
      let target = document.elementFromPoint(
        event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0,
        event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0
      );
      if (target == null) {
        return removeDrag();
      }
      let groupTile = target.closest(".broTile[group], .broWaitingRoom");
      if (groupTile != null) {
        let groupID = groupTile.getAttribute("group");
        if (dragContext.tileData.group == groupID) { // Same group:
          return removeDrag();
        }
        let path = "lessons/breakout/move?collaborator=" + dragContext.tileData.modify;
        if (groupID != null) {
          path += "&group=" + groupID;
        }
        let revertTile = dragContext.tileData.tile;
        removeDrag(true);
        await sendRequest("PUT", path, null, { session: this.parent.parent.session });
        if (revertTile != null) {
          revertTile.removeAttribute("disabled");
        }
        return;
      }
      removeDrag();
    }
    this.pipeline.subscribe("dragMemberEnd", "click_end", (data) => { dragEnd(data.event); });

    this.forceDragStart = (modifyID) => {
      let tileData = this.layout.members[modifyID] ?? {};
      if (tileData.tile == null) {
        return;
      }
      dragContext = {
        tileData,
        width: tileData.tile.clientWidth,
        height: tileData.tile.clientHeight,
        offsetX: -8,
        offsetY: -8,
        startScrollY: groupHolder.scrollTop,
        waitingRoomOpen,
        forceMouseDown: true
      };
      dragMove();
    }

    groups.addEventListener("keydown", (event) => {
      let target = event.target;
      let tileNameHolder = target.closest(".broTileHeaderName");
      if (tileNameHolder != null) {
        if (event.keyCode == 13) {
          let tileNameText = tileNameHolder.querySelector(".broTileHeaderNameHolderText");
          if (tileNameText != null) {
            event.preventDefault();
            tileNameText.blur();
          }
          return;
        }
      }
    });
    groups.addEventListener("focusout", async (event) => {
      let target = event.target;
      let tileNameHolder = target.closest(".broTileHeaderName");
      if (tileNameHolder != null) {
        let tileNameText = tileNameHolder.querySelector(".broTileHeaderNameHolderText");
        if (tileNameText != null) {
          tileNameText.scrollTo(0, 0);

          let tile = this.layout.tiles[tileNameHolder.closest(".broTile").getAttribute("group")];
          if (tile != null) {
            let name = tileNameText.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
            if (name.replace(/ /g, "").length < 1) {
              tileNameText.textContent = tile.render.name ?? "Untitled Group";
              return;
            }
            if (tileNameText.textContent == tile.render.name) {
              tileNameText.textContent = tile.render.name;
              return;
            }
            let oldName = tile.render.name ?? "Untitled Group";
            tile.render.name = name;
            tileNameText.textContent = name;
            tileNameText.title = name;
            let [code] = await sendRequest("POST", "lessons/breakout/groups/name?group=" + tile.render._id, { name: name }, { session: this.parent.parent.session });
            if (code != 200) {
              tile.render.name = oldName;
              tileNameText.textContent = oldName;
              tileNameText.title = oldName;
            }
          }
        }
      }
    });

    // Load Images:
    setSVG(topScrollLeft, "../images/editor/top/leftarrow.svg");
    setSVG(topScrollRight, "../images/editor/top/rightarrow.svg");
    setSVG(icon, "../images/breakout.svg");
    setSVG(optionsButton, "../images/editor/share/setting.svg", (svg) => { return svg.replace(/"#48A7FF"/g, '"var(--secondary)"'); });

    let boardEnabled = false;
    let boardOpen = false;
    let boardVisible = false;
    let updateSplitScreenButton = () => {
      boardEnabled = this.parent.parent.lesson.tool.includes("board");
      boardOpen = this.parent.parent.pages["board"] != null;
      boardVisible = this.parent.parent.maximized != true || this.parent.parent.activePageID == "board";

      let showBoardButton = false;
      if (boardEnabled == true) {
        if (boardOpen == false || boardVisible == false) {
          showBoardButton = true;
        }
      } else if (this.parent.parent.self.access > 3) {
        if (boardOpen == false || boardVisible == false) {
          showBoardButton = true;
        }
      }

      if (showBoardButton == true) {
        openBoardHolder.style.display = "flex";
        bottomButtonSpacer.style.display = "flex";
      } else {
        openBoardHolder.style.removeProperty("display");
        bottomButtonSpacer.style.removeProperty("display");
      }
    }
    openBoard.addEventListener("click", async () => {
      openBoardHolder.style.removeProperty("display");
      bottomButtonSpacer.style.removeProperty("display");

      if (boardOpen == false) {
        await this.parent.parent.addPage("board", "board", { insertBefore: this.parent.pageHolder, percent: .5 });
      }
      if (boardVisible == false) {
        this.parent.parent.activePageID = "board";
        this.parent.parent.pushToPipelines(null, "page_switch", { pageID: "board" });
      }
    });
    setSVG(openBoard, "../images/icon.svg");
    this.pipeline.subscribe("pageAdd", "page_add", updateSplitScreenButton);
    this.pipeline.subscribe("pageRemove", "page_remove", updateSplitScreenButton);
    this.pipeline.subscribe("pageSwitch", "page_switch", updateSplitScreenButton);
    this.pipeline.subscribe("pageMaximize", "maximize", updateSplitScreenButton);
    updateSplitScreenButton();

    if (this.parent.parent.lesson.tool.includes("breakout") == false && (this.parent.parent.lesson.breakout ?? {}).status == null) { // Create New Lesson
      frame.insertAdjacentHTML("beforeend", `<div class="boCreateBreakoutHolder"></div>`);
      this.setupModal = await modalModule.open("modals/lesson/newbreakout", frame.querySelector(".boCreateBreakoutHolder"), null, "Start a Breakout", null, { parent: this });
    }
  }
}

modules["dropdowns/lesson/breakout/overview/file"] = class {
  html = `
  <button class="broFileAction" option="dashboard" title="Return to the Dashboard" style="--themeColor: var(--secondary)"><div></div>Dashboard</button>
  <div class="broFileLine"></div>
  <button class="broFileAction" option="copy" title="Create a copy of the lesson."><div></div>Create Copy</button>
  <button class="broFileAction" option="moveto" title="Move this lesson into a folder." dropdowntitle="Move To Folder"><div></div>Move To Folder</button>
  <button class="broFileAction" option="deletelesson" title="Remove this lesson from your dashboard." style="--themeColor: var(--error)"><div></div>Delete Lesson</button>
  `;
  css = {
    ".broFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".broFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".broFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".broFileAction div svg": `width: 100%; height: 100%`,
    ".broFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".broFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async function (frame, extra) {
    let parent = extra.parent;

    let dashboardButton = frame.querySelector('.broFileAction[option="dashboard"]');
    dashboardButton.addEventListener("click", async () => {
      setFrame("pages/app/dashboard");
    });
    let copyButton = frame.querySelector('.broFileAction[option="copy"]');
    copyButton.addEventListener("click", async () => {
      if (userID == null) {
        promptLogin();
        return;
      }
      copyButton.setAttribute("disabled", "");
      let copyAlert = await alertModule.open("info", "<b>Creating Copy</b><div>Creating a copy of this lesson.", { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/copy", null, { session: parent.parent.parent.session });
      copyButton.removeAttribute("disabled");
      alertModule.close(copyAlert);
      if (code == 200) {
        dropdownModule.close();
        setFrame("pages/app/lesson", null, { params: { lesson: body.lesson } });
      }
    });

    let fileButton = frame.querySelector('.broFileAction[option="moveto"]');
    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/moveto", { lessonID: parent.parent.id, folderID: parent.parent.folder });
    });

    let deleteLessonButton = frame.querySelector('.broFileAction[option="deletelesson"]');
    deleteLessonButton.addEventListener("click", () => {
      dropdownModule.open(deleteLessonButton, "dropdowns/remove", { type: "deletelesson", lessonID: parent.parent.parent.id, isOwner: true, session: parent.parent.parent.session });
    });

    setSVG(dashboardButton.querySelector("div"), "../images/tooltips/back.svg");
    setSVG(copyButton.querySelector("div"), "../images/editor/file/copy.svg");
    setSVG(fileButton.querySelector("div"), "../images/editor/file/moveto.svg");
    setSVG(deleteLessonButton.querySelector("div"), "../images/editor/file/delete.svg");
  }
}

modules["dropdowns/lesson/breakout/overview/managemember"] = class {
  html = `
  <div class="broManageMemberCollaboratorHolder">
    <div class="broManageMemberCollaboratorBackdrop"><div></div></div>
    <div class="broManageMemberCollaboratorContent">
      <div class="broManageMemberCollaboratorCursor"></div>
      <img class="broManageMemberCollaboratorPicture" />
      <div class="broManageMemberCollaboratorInfo">
        <div name></div>
        <div email></div>
      </div>
    </div>
  </div>
  <div class="broManageMemberLine" option="timeline"></div>
  <button class="broManageMemberAction" option="timeline" title="View this member's timeline history."><div></div>Timeline</button>
  <div class="broManageMemberLine" option="move"></div>
  <button class="broManageMemberAction" option="move" title="Move this member to a team." style="--themeColor: var(--secondary)"><div></div>Move Member</button>
  <button class="broManageMemberAction" option="remove" title="Remove this member from the team." style="--themeColor: var(--secondary)"><div></div>Remove</button>
  <div class="broManageMemberLine" option="kick"></div>
  <button class="broManageMemberAction" option="kick" title="Remove this member from the lesson." style="--themeColor: var(--error)"><div></div>Kick</button>
  `;
  css = {
    ".broManageMemberCollaboratorHolder": `position: relative; display: flex; flex-direction: column; width: 100%; gap: 4px; align-items: center; border-radius: 12px`,
    ".broManageMemberCollaboratorContent": `display: flex; flex-wrap: wrap; width: max-content; max-width: calc(100% - 16px); margin: 8px; gap: 4px; align-items: center; border-radius: inherit`,
    ".broManageMemberCollaboratorBackdrop": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1; border-radius: inherit; overflow: hidden`,
    ".broManageMemberCollaboratorBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(../images/editor/backdrop.svg); background-size: 24px; background-position: center`,
    ".broManageMemberCollaboratorCursor": `display: none; width: 40px; height: 40px; flex-shrink: 0; margin: 2px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px`,
    ".broManageMemberCollaboratorPicture": `display: none; width: 44px; height: 44px; flex-shrink: 0; margin: 2px; background: #fff; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px`,
    ".broManageMemberCollaboratorInfo": `max-width: calc(100% - 8px); margin: 4px; text-align: left`,
    ".broManageMemberCollaboratorInfo div[name]": `max-width: 100%; font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".broManageMemberCollaboratorInfo div[email]": `display: none; max-width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    
    ".broManageMemberAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".broManageMemberAction[hidden]": `display: none !important`,
    ".broManageMemberAction:not(:first-child)": `margin-top: 4px`,
    ".broManageMemberAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".broManageMemberAction div svg": `width: 100%; height: 100%`,
    ".broManageMemberAction:hover": `background: var(--themeColor); color: #fff`,
    ".broManageMemberLine": `width: 100%; height: 2px; margin-top: 4px; background: var(--gray); border-radius: 1px`
  };
  contrastCheck = (bgColor, check = .3) => {
    if (bgColor == null) {
      return;
    }
    if (bgColor.length < 4) {
      bgColor = bgColor + bgColor;
    }
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    let uicolors = [r / 255, g / 255, b / 255];
    let c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return L > check;
  }
  textColorBackground = (bgColor) => {
    return (this.contrastCheck(bgColor) > 0.3) ? "#000" : "#fff"; // 0.179
  }
  js = async function (frame, extra) {
    let parent = extra.parent;
    let modifyID = extra.collaboratorID;

    let holder = frame.querySelector(".broManageMemberCollaboratorHolder");
    let cursor = holder.querySelector(".broManageMemberCollaboratorCursor");
    let image = holder.querySelector(".broManageMemberCollaboratorPicture");
    let info = holder.querySelector(".broManageMemberCollaboratorInfo");
    let name = info.querySelector("div[name]");
    let email = info.querySelector("div[email]");

    let updateCollaborator = () => {
      let collaborator = parent.parent.parent.collaborators[modifyID];
      if (collaborator == null || holder == null) {
        return;
      }
      holder.style.setProperty("--themeColor", collaborator.color);
      if (collaborator.email == null) {
        cursor.style.display = "unset";
      } else {
        if (image.src != (collaborator.image ?? "../images/profiles/default.svg")) {
          image.src = (collaborator.image ?? "../images/profiles/default.svg");
        }
        image.style.display = "unset";
      }
      info.style.color = this.textColorBackground(collaborator.color);
      name.textContent = collaborator.name;
      name.title = collaborator.name;
      if (collaborator.email != null) {
        email.textContent = collaborator.email;
        email.title = collaborator.email;
        email.style.display = "block";
      }
    }
    parent.pipeline.subscribe("manageMemberCollaboratorUpdate", "collaborator_update_" + modifyID, updateCollaborator);
    updateCollaborator();

    let timelineDivider = frame.querySelector('.broManageMemberLine[option="timeline"]');
    let timelineButton = frame.querySelector('.broManageMemberAction[option="timeline"]');
    timelineButton.addEventListener("click", () => {
      dropdownModule.close();

      let groupMember = parent.layout.members[modifyID] ?? {};
      if (groupMember.group == null) {
        return;
      }
      let tileData = parent.layout.tiles[groupMember.group] ?? {};
      if (tileData.editor == null || tileData.loadedAnnotations != true) {
        return
      }

      let construct = {
        close: () => {
          parent.parent.closePage("timeline");
          parent.parent.openPage("primary", "breakout/overview");
        },

        lesson: parent.parent.parent,
        self: parent.parent.parent.self,
        session: parent.parent.parent.session,
        sessionID: parent.parent.parent.sessionID,
        sources: parent.parent.parent.sources,
        collaborators: parent.parent.parent.collaborators,
        backgroundColor: tileData.editor.backgroundColor,
        preferences: parent.parent.parent.preferences,
        //reactions: tileData.editor.reactions,

        annotations: tileData.editor.annotations,

        id: groupMember.group,
        parameters: [("group=" + groupMember.group)],

        filterMembers: [modifyID]
      };
      parent.parent.openPage("timeline", "editor/timeline", { construct });
    });

    //let moveDivider = frame.querySelector('.broManageMemberLine[option="move"]');
    let moveButton = frame.querySelector('.broManageMemberAction[option="move"]');
    moveButton.addEventListener("click", async () => {
      dropdownModule.close();
      parent.forceDragStart(modifyID);
    });
    let removeButton = frame.querySelector('.broManageMemberAction[option="remove"]');
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/breakout/move?collaborator=" + modifyID, null, { session: parent.parent.session });
      removeButton.removeAttribute("disabled");
    });

    let kickDivider = frame.querySelector('.broManageMemberLine[option="kick"]');
    let kickButton = frame.querySelector('.broManageMemberAction[option="kick"]');
    kickButton.addEventListener("click", async () => {
      kickButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/members/kick?collaborator=" + modifyID, null, { session: parent.parent.session });
      if (code == 200) {
        dropdownModule.close();
      }
      kickButton.removeAttribute("disabled");
    });

    let updateButtons = () => {
      let groupMember = parent.layout.members[modifyID];
      if (groupMember == null) {
        return;
      }
      if (groupMember.group != null) {
        timelineDivider.removeAttribute("hidden");
        timelineButton.removeAttribute("hidden");
        //moveDivider.removeAttribute("hidden");
        //moveButton.removeAttribute("hidden");
        removeButton.removeAttribute("hidden");
      } else {
        timelineDivider.setAttribute("hidden", "");
        timelineButton.setAttribute("hidden", "");
        //moveDivider.setAttribute("hidden", "");
        //moveButton.setAttribute("hidden", "");
        removeButton.setAttribute("hidden", "");
      }

      if ((parent.layout.memberSessions[modifyID] ?? []).length > 0) {
        kickDivider.removeAttribute("hidden");
        kickButton.removeAttribute("hidden");
      } else {
        kickDivider.setAttribute("hidden", "");
        kickButton.setAttribute("hidden", "");
      }
    }
    parent.pipeline.subscribe("manageMemberCollaboratorJoin", "join", updateButtons, { sort: 2 });
    parent.pipeline.subscribe("manageMemberCollaboratorUpdate", "update", updateButtons, { sort: 2 });
    parent.pipeline.subscribe("manageMemberCollaboratorLeave", "leave", updateButtons, { sort: 2 });
    updateButtons();

    setSVG(timelineButton.querySelector("div"), "../images/editor/file/history.svg");
    setSVG(moveButton.querySelector("div"), "../images/tooltips/back.svg");
    setSVG(removeButton.querySelector("div"), "../images/tooltips/back.svg");
    setSVG(kickButton.querySelector("div"), "../images/editor/breakout/kick.svg");
  }
}