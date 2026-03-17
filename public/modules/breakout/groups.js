modules["breakout/groups"] = class {
  html = `
  <div class="brgsInterface customScroll">
    <div class="brgsTopHolder">
      <button class="brgsTopScroll" left style="left: 7px"></button>
      <button class="brgsTopScroll" right style="right: 7px"></button>
      <div class="brgsTop">
        <div class="brgsTopSection" left>
          <a class="brgsLogo" href="/app/dashboard" draggable="false"></a>
          <div class="brgsFileNameHolder border"><div class="brgsFileName"></div></div>
          <button class="brgsFileDropdown">File</button>
          <button class="brgsLeaveGroup">Leave Team</button>
        </div>
        <div class="brgsTopSection" scroll>
          <div class="brgsTopDivider"></div>
        </div>
        <div class="brgsTopSection" right>
          <button class="brgsSharePin"></button>
          <div class="brgsTopDivider" share></div>
          <button class="brgsAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
          <button class="brgsLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="brgsBottomHolder">
      <div class="brgsBottom">
        <div class="brgsBottomSection brgsOpenBoard">
          <button></button>
        </div>
      </div>
    </div>
  </div>
  <div class="brgsGroupHolder customScroll">
    <div class="brgsHeader">
      <div class="brgsHeaderBackdrop"></div>
      <div class="brgsHeaderTitle"></div>
      <div class="brgsHeaderDesc"></div>
      <button class="brgsHeaderReturnButton largeButton">Return to Team</button>
    </div>
    <div class="brgsGroupsHolder">
      <div class="brgsGroups"></div>
    </div>
  </div>
  `;
  css = {
    ".brgsInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; contain: strict; overflow-y: scroll; z-index: 2`,
    ".brgsGroupHolder": `--interfacePadding: 58px; --tilePadding: 16px; --totalWidth: calc((var(--columnWidth) * var(--columnCount)) + (var(--tilePadding) * (var(--columnCount) - 1))); position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; height: 100%; padding-top: calc(var(--interfacePadding) + 8px); background: var(--pageColor); contain: strict; overflow-x: hidden; overflow-y: scroll; overflow-anchor: none; z-index: 1; align-items: center; transition: .5s`,
    
    ".brgsTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".brgsTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".brgsTopHolder[scroll] .brgsTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brgsTop::-webkit-scrollbar": `display: none`,
    ".brgsTopSection[scroll]": `display: none`,
    ".brgsTopHolder[scroll] .brgsTopSection[scroll]": `display: flex !important`,
    ".brgsTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".brgsTopScroll svg": `width: 22px`,
    ".brgsTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".brgsTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".brgsTopHolder[scroll] .brgsTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".brgsTopSection[left]": `border-bottom-right-radius: 12px`,
    ".brgsTopSection[right]": `border-bottom-left-radius: 12px`,

    ".brgsLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".brgsLogo:hover": `background: var(--hover)`,
    ".brgsLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".brgsLogo:hover svg": `transform: scale(.9)`,
    ".brgsFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".brgsFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".brgsFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".brgsFileName::-webkit-scrollbar": `display: none`,
    ".brgsFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brgsLeaveGroup": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; align-items: center; font-size: 16px; font-weight: 600`,
    ".brgsTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    
    ".brgsSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".brgsTopDivider[share]": `display: none`,
    ".brgsAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".brgsAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".brgsLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
  
    ".brgsBottomHolder": `position: relative; flex: 1; width: 100%; margin: auto 0 8px 0; visibility: visible`,
    ".brgsBottom": `position: absolute; display: flex; width: 100%; height: 100%; padding-top: 8px; left: 0px; top: 0px; overflow-x: auto; overflow-y: hidden; justify-content: space-between; align-items: flex-end; scrollbar-width: none`,
    ".brgsBottom::-webkit-scrollbar": `display: none`,
    ".brgsBottomSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".brgsBottomSection[hidden]": `display: none`,
    //".brgsBottomSection:first-child": `border-top-left-radius: 0`,
    //".brgsBottomSection:last-child": `border-top-right-radius: 0`,
    
    ".brgsOpenBoard": `display: none; box-shadow: var(--boardLightShadow); border-top-left-radius: 0`,
    ".brgsOpenBoard button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".brgsOpenBoard button:hover": `background: var(--boardHover)`,
    ".brgsOpenBoard button svg": `width: 32px; height: 32px; transition: .2s`,
    ".brgsOpenBoard button:hover svg": `transform: scale(.9)`,

    ".brgsHeader": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; flex-shrink: 0; width: calc(100% - 32px); height: fit-content; padding: 24px; border-radius: 16px; box-shadow: inset var(--lightShadow); align-items: center; overflow: hidden`,
    ".brgsHeaderBackdrop": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: url(../images/breakoutcursorbackdrop.png); background-size: cover; background-position: center; opacity: .5; z-index: 1`,
    ".brgsHeaderTitle": `font-size: 30px; font-weight: 600; z-index: 2`,
    ".brgsHeaderTitle b": `color: var(--theme)`,
    ".brgsHeaderDesc": `margin-top: 12px; font-size: 18px; z-index: 2`,
    ".brgsHeaderReturnButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 14px; display: none; width: fit-content; max-width: 100%; padding: 6px 12px; margin: 26px 3px 4px; justify-content: center; font-size: 20px; z-index: 2`,
    ".brgsGroupsHolder": `position: relative; display: flex; width: 100%; height: 100%; margin-top: 16px; justify-content: center`,
    ".brgsGroups": `position: absolute; box-sizing: border-box; flex-shrink: 0; width: var(--totalWidth); height: calc(var(--totalHeight) + var(--interfacePadding) + 8px); z-index: 2; transition: width .3s`,
    
    ".brgsTile": `position: absolute; width: var(--columnWidth); height: fit-content; left: 0px; top: 0px; padding: 0; z-index: 1; transition: .3s`, // will-change: transform;
    ".brgsTileContent": `--shadow: var(--lightShadow); position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 16px; contain: strict; overflow: hidden; transition: .2s, transform .1s`,
    ".brgsTile[selected] .brgsTileContent": `background: var(--theme) !important`,
    ".brgsTile:hover .brgsTileContent": `--shadow: var(--darkShadow) !important`,
    ".brgsTile:active .brgsTileContent": `transform: scale(.95)`,
    ".brgsTileHeader": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 4px 16px 16px; align-items: center`,
    ".brgsTileHeaderImageHolder": `position: relative; display: none; width: fit-content; max-width: 100%; height: fit-content; padding: 6px; margin-top: 12px; background: var(--pageColor); border-radius: 26px`,
    ".brgsTileHeaderImageHolder:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; pointer-events: none; box-shadow: var(--shadow); transition: .2s`,
    ".brgsTileHeaderImage": `max-width: 100%; width: 60px; height: 60px; border-radius: 20px; object-fit: cover`,
    ".brgsTileHeaderNameHolder": `position: relative; box-sizing: border-box; width: fit-content; max-width: 100%; height: fit-content; padding: 8px 12px; margin-top: 12px; background: var(--pageColor); border-radius: 20px`,
    ".brgsTileHeaderNameHolder:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; pointer-events: none; box-shadow: var(--shadow); transition: .2s`,
    ".brgsTileHeaderNameText": `max-width: 100%; font-size: 18px; font-weight: 600; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis`,
    ".brgsTileHeaderMaxSizeHolder": `position: relative; box-sizing: border-box; display: none; width: fit-content; max-width: 100%; height: fit-content; padding: 4px 8px; margin-top: 6px; background: var(--pageColor); border-radius: 14px`,
    ".brgsTileHeaderMaxSizeHolder:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; pointer-events: none; box-shadow: var(--shadow); transition: .2s`,
    ".brgsTileHeaderMaxSize": `max-width: 100%; font-size: 14px; font-weight: 600; white-space: nowrap`,
    ".brgsTileHeaderMaxSize b": `color: var(--theme)`,
    ".brgsTileMembersContainer": `position: relative; display: none; flex-direction: column; flex: 1; width: calc(100% - 12px); padding-bottom: 4px; margin: 0 6px 6px; background: var(--pageColor); border-radius: 10px; align-items: center`,
    ".brgsTileMembersContainer:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; box-shadow: var(--shadow); transition: .2s`,
    ".brgsTileMembers": `position: relative; width: 100%`,
    ".brgsTileMember": `--shadow: var(--lightShadow); position: relative; width: calc(100% - 8px); padding: 0; margin: 4px 4px 0; background: var(--pageColor); border-radius: 6px`,
    ".brgsTileMember:before": `content: ""; position: absolute; box-sizing: border-box; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; pointer-events: none; border: solid 2px var(--hover)`, //box-shadow: var(--shadow)
    ".brgsTileMemberContent": `display: flex; box-sizing: border-box; width: 100%; gap: 6px; padding: 6px; overflow: hidden; justify-content: space-between`,
    ".brgsTileMemberNameHolder": `display: flex; min-width: 0; align-items: center`,
    ".brgsTileMember:not([active]) .brgsTileMemberNameHolder > div": `opacity: .5 !important`,
    ".brgsTileMemberNameCursor": `flex-shrink: 0; position: relative; box-sizing: border-box; width: 28px; height: 28px; margin-right: 6px; background: var(--pageColor); border: solid 4px var(--themeColor); border-radius: 8px 14px 14px; transition: .2s`,
    //".brgsTileMemberNameCursor:before": `content: ""; position: absolute; width: calc(100% + 6px); height: calc(100% + 6px); left: -3px; top: -3px; border-radius: inherit; contain: strict; box-shadow: 0 0 6px rgb(0 0 0 / 25%); transition: .2s`,
    ".brgsTileMemberNameText": `font-size: 16px; font-weight: 500; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: .2s`,
    ".brgsJoinButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 12px; display: none; width: fit-content; max-width: 100%; padding: 6px 12px; margin: 15px 3px; justify-content: center; font-size: 16px; white-space: nowrap`,

    ".brgsTileAddGroup": `padding: 0; z-index: 2 !important; opacity: 0; pointer-events: none`,
    ".brgsGroups[cancreategroup] .brgsTileAddGroup:not([disabled])": `opacity: 1 !important; pointer-events: all !important`,
    ".brgsTileAddGroup .brgsTileContent": `--opacity: .3; --pageColor: rgba(var(--background), 0); box-sizing: border-box; padding: 12px; background: rgba(var(--themeRGB), var(--opacity)); justify-content: center; align-items: center`,
    ".brgsTileAddGroup:hover .brgsTileContent": `--opacity: 1; --pageColor: rgba(var(--background), 1); transform: scale(1.05); border-radius: 20px`,
    ".brgsTileAddGroup:active .brgsTileContent": `transform: scale(.98)`,
    ".brgsTileAddGroup .brgsTileContent svg": `width: 100%; height: 100%`
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

  js = async (frame, extra = {}) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    let topHolder = frame.querySelector(".brgsTopHolder");
    let top = topHolder.querySelector(".brgsTop");

    let leftTop = top.querySelector(".brgsTopSection[left]");
    let icon = leftTop.querySelector(".brgsLogo");
    let lessonName = leftTop.querySelector(".brgsFileName");
    let fileButton = leftTop.querySelector(".brgsFileDropdown");
    let leaveGroupButton = leftTop.querySelector(".brgsLeaveGroup");

    let rightTop = top.querySelector(".brgsTopSection[right]");
    let sharePinButton = rightTop.querySelector(".brgsSharePin");
    let shareDivider = rightTop.querySelector(".brgsTopDivider[share]");
    let accountButton = rightTop.querySelector(".brgsAccount");
    let loginButton = rightTop.querySelector(".brgsLogin");

    let topScrollLeft = topHolder.querySelector(".brgsTopScroll[left]");
    let topScrollRight = topHolder.querySelector(".brgsTopScroll[right]");

    let groupHolder = frame.querySelector(".brgsGroupHolder");
    let header = groupHolder.querySelector(".brgsHeader");
    let headerTitle = header.querySelector(".brgsHeaderTitle");
    let headerDesc = header.querySelector(".brgsHeaderDesc");
    let headerReturnButton = header.querySelector(".brgsHeaderReturnButton");
    let groups = groupHolder.querySelector(".brgsGroups");
    //let background = groupHolder.querySelector(".brgsBackground");

    let bottom = frame.querySelector(".brgsBottom");
    let openBoardHolder = bottom.querySelector(".brgsOpenBoard");
    let openBoard = openBoardHolder.querySelector("button");

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

    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/lesson/breakout/groups/file", { parent: this });
    });

    leaveGroupButton.addEventListener("click", async () => {
      leaveGroupButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/breakout/groups/leave", null, { session: this.parent.parent.session });
      leaveGroupButton.removeAttribute("disabled");
    });

    sharePinButton.addEventListener("click", () => {
      if (modules["dropdowns/lesson/share/pin"] != null) {
        dropdownModule.open(sharePinButton, "dropdowns/lesson/share/pin", { parent: this.parent });
      }
    });
    if (this.parent.parent.lesson.pin != null) {
      sharePinButton.style.display = "unset";
      sharePinButton.textContent = this.parent.parent.lesson.pin;
      shareDivider.style.display = "unset";
    }

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

    // Handle Tile Masonry Layout:
    this.layout = {};
    this.layout.minTileWidth = 260;
    this.layout.maxTileWidth = 450;
    this.layout.tilePadding = 16;
    this.layout.maxContainerWidth = 2000; //(this.layout.minTileWidth * 6) + (this.layout.tilePadding * 5) - 1;
    this.layout.tileBaseHeight = 76; // Base tile height
    this.layout.tileImageHeight = 84; // Added tile height with an image
    this.layout.tileMaxMembersHeight = 31; // Added tile height for max member counter
    this.layout.tileMemberHeight = 40; // Height of each member list item
    this.layout.tileMemberGap = 4; // Gap between each member list item
    this.layout.joinButtonHeight = 65; // Height of the space used by the join group button
    this.layout.columnCount = 0;
    this.layout.columnWidth = 0;
    this.layout.columns = {};
    this.layout.tiles = {};
    this.layout.members = {};
    this.layout.memberSessions = {};
    this.layout.tileLayout = [];
    this.layout.tileLayoutVersionIndex = 0;
    this.layout.loadedTiles = {};
    this.layout.getTileHeight = (tile) => {
      let memberCount = (tile.members ?? []).length;
      let totalHeight = this.layout.tileBaseHeight;
      if (tile.render.image != null || tile.render._id == "NEW_GROUP_CREATE") {
        totalHeight += this.layout.tileImageHeight;
      }
      if ((this.options.maxSize ?? 0) > 0) {
        totalHeight += this.layout.tileMaxMembersHeight;
      }
      if (this.parent.parent.self.group == null && this.options.pickTeam == true && tile.render.version == (this.configuration.version ?? 1)) {
        totalHeight += this.layout.joinButtonHeight;
        totalHeight += (this.layout.tileMemberGap * Math.min(memberCount, 1));
      } else {
        totalHeight += (this.layout.tileMemberGap * 2 * Math.min(memberCount, 1));
      }
      totalHeight += (this.layout.tileMemberHeight * memberCount);
      totalHeight += Math.max(this.layout.tileMemberGap * (memberCount - 1), 0);
      return totalHeight;
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
    this.layout.updateTile = (tile = {}) => {
      if (tile.element == null) {
        return;
      }
      if (this.parent.parent.self.group != tile.render._id) {
        tile.element.removeAttribute("selected");
      } else {
        tile.element.setAttribute("selected", "");
      }
      let tileHeader = tile.element.querySelector(".brgsTileHeader");
      let tileNameImageHolder = tileHeader.querySelector(".brgsTileHeaderImageHolder");
      if (tile.render.image != null) {
        tileNameImageHolder.querySelector(".brgsTileHeaderImage").src = assetURL + tile.render.image;
        tileNameImageHolder.style.display = "flex";
      } else {
        tileNameImageHolder.style.removeProperty("display");
      }
      let tileNameText = tileHeader.querySelector(".brgsTileHeaderNameText");
      let setName = tile.render.name ?? "Untitled Team";
      tileNameText.textContent = setName
      tileNameText.title = setName;
      let maxSizeHolder = tile.element.querySelector(".brgsTileHeaderMaxSizeHolder");
      let membersContainer = tile.element.querySelector(".brgsTileMembersContainer");
      let tileJoinButton = membersContainer.querySelector(".brgsJoinButton");
      let maxSize = this.options.maxSize ?? 0;
      let memberCount = (tile.members ?? []).length;
      if (maxSize > 0) {
        let maxSizeText = tile.element.querySelector(".brgsTileHeaderMaxSize");
        maxSizeText.querySelector("b").textContent = memberCount;
        maxSizeText.querySelector("span").textContent = maxSize;
        if (memberCount < maxSize) {
          tileJoinButton.removeAttribute("disabled");
        } else {
          tileJoinButton.setAttribute("disabled", "");
        }
        maxSizeHolder.style.display = "flex";
      } else {
        tileJoinButton.removeAttribute("disabled");
        maxSizeHolder.style.removeProperty("display");
      }
      let showMembersContainer = memberCount > 0;
      if (this.parent.parent.self.group == null && this.options.pickTeam == true && tile.render.version == (this.configuration.version ?? 1)) {
        showMembersContainer = true;
        tileJoinButton.style.display = "flex";
      } else {
        tileJoinButton.style.removeProperty("display");
      }
      if (showMembersContainer == true) {
        membersContainer.style.display = "flex";
      } else {
        membersContainer.style.removeProperty("display");
      }
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
        let memberName = memberTile.querySelector(".brgsTileMemberNameText");
        memberName.textContent = collaborator.name;
        memberName.title = collaborator.name;
      }
    }
    this.layout.addMemberTile = (collaboratorID, refresh) => {
      let member = this.layout.members[collaboratorID] ?? {};
      let tile;
      let element;
      if (member.group != null) {
        tile = this.layout.tiles[member.group] ?? {};
        if (tile.element == null) {
          if (refresh != false) {
            this.layout.refreshTileSpots(this.layout.tileLayout.indexOf(tile.render._id));
          }
          return;
        }
        element = tile.element.querySelector(".brgsTileMembers");
      }
      if (element == null) {
        return;
      }
      let collaborator = this.parent.parent.collaborators[collaboratorID];
      if (collaborator == null) {
        return;
      }
      let memberTile = document.createElement("div");
      memberTile.className = "brgsTileMember";
      memberTile.setAttribute("collaborator", collaboratorID);
      memberTile.innerHTML = `
      <div class="brgsTileMemberContent">
        <div class="brgsTileMemberNameHolder">
          <div class="brgsTileMemberNameCursor"></div>
          <div class="brgsTileMemberNameText"></div>
        </div>
      </div>
      `;
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
        this.layout.reRunUpdateCycle = true;
        return;
      }
      this.layout.runningUpdateCycle = true;
      this.layout.runningEditorSetup = false;

      this.layout.scrollTop = groupHolder.scrollTop;
      let centerScroll = this.layout.scrollTop + (this.containerHeight / 2) - this.layout.scrollTopOffset;
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
        if (tileID == null) {
          continue;
        }
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
      let loadTileKeys = Object.keys(loadTiles);
      for (let i = 0; i < loadTileKeys.length; i++) {
        let tileID = loadTileKeys[i];
        let tile = this.layout.tiles[tileID];

        if (tile.element == null) {
          if (tileID != "NEW_GROUP_CREATE") {
            tile.element = document.createElement("button");
            tile.element.className = "brgsTile";
            tile.element.setAttribute("group", tileID);
            tile.element.innerHTML = `<div class="brgsTileContent">
              <div class="brgsTileHeader">
                <div class="brgsTileHeaderImageHolder">
                  <img class="brgsTileHeaderImage" />
                </div>
                <div class="brgsTileHeaderNameHolder">
                  <div class="brgsTileHeaderNameText"></div>
                </div>
                <div class="brgsTileHeaderMaxSizeHolder">
                  <div class="brgsTileHeaderMaxSize"><b></b> / <span></span></div>
                </div>
              </div>
              <div class="brgsTileMembersContainer">
                <div class="brgsTileMembers"></div>
                <button class="brgsJoinButton largeButton">Join</button>
              </div>
            </div>`;
            this.layout.updateTile(tile);
            setSVG(tile.element.querySelector(".brgsTileHeaderOptions button"), "../images/editor/actions/more.svg");
            let members = tile.members ?? [];
            for (let i = 0; i < members.length; i++) {
              this.layout.addMemberTile(members[i], false);
            }
            newTilesFragment.appendChild(tile.element);
          } else {
            tile.element = document.createElement("button");
            tile.element.className = "brgsTile brgsTileAddGroup";
            tile.element.title = "Add a New Team";
            tile.element.innerHTML = `<div class="brgsTileContent"></div>`;
            setSVG(tile.element.querySelector(".brgsTileContent"), "../images/editor/breakout/plus.svg");
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

        delete this.layout.loadedTiles[tileID];
      }

      // Bulk Apply Elements:
      groups.appendChild(newTilesFragment);

      // Unload Tiles:
      let unloadTileKeys = Object.keys(this.layout.loadedTiles);
      for (let i = 0; i < unloadTileKeys.length; i++) {
        let tileID = unloadTileKeys[i];
        let tile = this.layout.tiles[tileID] ?? {};
        if (tile.element != null) {
          tile.element.remove();
          tile.element = null;
          tile.cache = null;
        }
      }

      this.layout.loadedTiles = loadTiles;

      this.layout.runningUpdateCycle = false;
      if (this.layout.reRunUpdateCycle == true) {
        this.layout.reRunUpdateCycle = false;
        this.layout.runUpdateCycle();
      }
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

      this.groupHolderRect = groupHolder.getBoundingClientRect();

      this.layout.refreshTileSpots();
    }
    this.layout.setupColumns = (force) => {
      this.pageOffsetWidth = frame.offsetWidth;
      this.pageOffsetHeight = frame.offsetHeight;

      this.containerWidth = groupHolder.clientWidth;
      this.containerHeight = groupHolder.clientHeight;

      this.layout.scrollTopOffset = header.clientHeight + 16;

      // Determine usable width:
      let groupsWidth = Math.min(
        this.containerWidth - (this.layout.tilePadding * 2),
        this.layout.maxContainerWidth
      );

      // Max possible columns:
      let maxPossibleColumns = Math.floor(
        (groupsWidth + this.layout.tilePadding) /
        (this.layout.minTileWidth + this.layout.tilePadding)
      );

      maxPossibleColumns = Math.max(1, maxPossibleColumns);

      // SMART COLUMN SELECTION:

      let bestColumns = 1;
      let bestWidth = groupsWidth;
      let bestScore;

      let idealTileWidth = (this.layout.minTileWidth + this.layout.maxTileWidth) / 2;

      for (let columns = 1; columns <= maxPossibleColumns; columns++) {

        let totalPadding = this.layout.tilePadding * (columns - 1);
        let tileWidth = (groupsWidth - totalPadding) / columns;

        if (tileWidth <= 0) continue;

        let score = 0;

        // Prefer tile sizes near ideal width:
        score -= Math.abs(tileWidth - idealTileWidth);

        // Penalize tiles smaller than minimum:
        if (tileWidth < this.layout.minTileWidth) {
          score -= 1000;
        }

        // Penalize tiles bigger than max:
        if (tileWidth > this.layout.maxTileWidth) {
          score -= (tileWidth - this.layout.maxTileWidth) * 2;
        }

        // Slight preference for more columns (helps smaller screens):
        score += columns * 10;

        if (score > bestScore || bestScore == null) {
          bestScore = score;
          bestColumns = columns;
          bestWidth = tileWidth;
        }
      }

      let newColumnCount = bestColumns;

      this.layout.columnWidth = Math.min(
        this.layout.maxTileWidth,
        Math.max(this.layout.minTileWidth, bestWidth),
        groupsWidth
      );

      this.layout.groupsWidth =
        (this.layout.columnWidth * newColumnCount) +
        (this.layout.tilePadding * (newColumnCount - 1));

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
      
      clearTimeout(this.layout.refreshTilesTimeout);
      if (force != true) {
        this.layout.refreshTilesTimeout = setTimeout(this.layout.updateColumns, 200);
      } else {
        this.layout.updateColumns();
      }
    }
    this.pipeline.subscribe("tilesResize", "resize", () => {
      this.layout.setupColumns();
    });
    this.pipeline.subscribe("tilesScroll", "scroll", this.layout.runUpdateCycle, { sort: 1 });
    //this.layout.setupColumns(true);
    this.layout.removeTile = (tileID, refresh) => {
      let tile = this.layout.tiles[tileID];
      if (tile == null) {
        return;
      }
      if (tile.height != null) {
        let column = this.layout.columns[tile.column] ?? {};
        if (column.sections != null) {
          let section = column.sections[tile.section] ?? {};
          if (section.height != null) {
            section.height -= (tile.height + this.layout.tilePadding);
          }
        }
      }
      let index = this.layout.tileLayout.indexOf(tileID);
      if (index > -1) {
        if ((tile.version == null || tile.version == (this.parent.parent.lesson.breakout ?? {}).version) && tile._id != "NEW_GROUP_CREATE") {
          this.layout.tileLayoutVersionIndex--;
        }
        this.layout.tileLayout.splice(index, 1);
        if (refresh == true) {
          this.layout.refreshTileSpots(index);
        }
      }
      if (tile.element != null) {
        tile.element.remove();
        tile.element = null;
      }
      delete this.layout.tiles[tileID];
    }
    this.layout.addTile = (data, members, refresh) => {
      if (data == null) {
        return;
      }
      if (this.layout.tiles[data._id] != null) {
        this.layout.removeTile(data._id, refresh);
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

    let memberKeys = Object.keys(this.parent.parent.members);
    for (let i = 0; i < memberKeys.length; i++) {
      let memberID = memberKeys[i];
      let member = this.parent.parent.members[memberID];
      let session = this.layout.memberSessions[member.modify];
      if (session == null) {
        this.layout.memberSessions[member.modify] = [];
        session = this.layout.memberSessions[member.modify];
      }
      session.push(memberID);
      if (member.access > 3) {
        continue;
      }
      this.layout.members[member.modify] = { ...(this.layout.members[member.modify] ?? {}), group: member.group, modify: member.modify };
      if (member.group == null) {
        this.layout.updateMemberTile(this.parent.parent.collaborators[member.modify]);
      }
    }

    let loadShowGroups = false;

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
      let beforeTileLength = this.layout.tileLayout.length - 1;
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
          this.parent.pipeline.publish("set", data.data);
        });
      }

      loadingGroups = false;
    }
    let checkLoadGroups = async () => {
      if (loadShowGroups != true) {
        return;
      }
      if (groupHolder.scrollTop + this.containerHeight + 500 > groupHolder.scrollHeight || groups.clientHeight < this.containerHeight) {
        await this.loadGroups();
        if (loadingGroups != true && allGroupsLoaded != true) {
          checkLoadGroups();
        }
      }
    }
    this.pipeline.subscribe("tilesLoadMore", "bounds_change", checkLoadGroups);
    let removeAllGroups = () => {
      loadShowGroups = false;

      groups.innerHTML = "";

      this.layout.columnCount = 0;
      this.layout.columnWidth = 0;
      this.layout.columns = {};
      this.layout.tiles = {};
      //this.layout.members = {};
      //this.layout.memberSessions = {};
      this.layout.tileLayout = [];
      this.layout.tileLayoutVersionIndex = 0;
      this.layout.loadedTiles = {};

      this.layout.refreshTotalColumnHeight();
    }
    let resetLoadGroups = async () => {
      removeAllGroups();

      this.layout.setupColumns(true);
      
      loadShowGroups = true;
      loadingGroups = false;
      allGroupsLoaded = false;
      lastGroupTime = null;

      await checkLoadGroups();
      this.layout.addTile({ _id: "NEW_GROUP_CREATE", version: (this.parent.parent.lesson.breakout ?? {}).version }, null, true);
    }

    let updateConfiguration = async () => {
      this.configuration = this.parent.parent.lesson.breakout ?? {};
      this.options = this.configuration.options ?? {};
      
      if (this.parent.parent.self.group == null) {
        if (
          this.options.pickTeam == true
          && this.options.createTeam == true
          && (this.parent.parent.self.group == null || this.options.changeTeam == true)
        ) {
          groups.setAttribute("cancreategroup", "");
        } else {
          groups.removeAttribute("cancreategroup");
        }
        
        if (this.options.pickTeam == true) {
          headerTitle.innerHTML = "<b>Choose</b> your <b>Team!</b>";
          headerDesc.textContent = "Find and select the team you want to be a member of:";
          headerReturnButton.style.removeProperty("display");
          if (loadShowGroups == false) {
            resetLoadGroups();
          }
        } else {
          headerTitle.innerHTML = "You're in the <b>Waiting Room</b>";
          headerDesc.textContent = "Please wait for the lesson owner to place you into a team!";
          headerReturnButton.style.removeProperty("display");
          if (this.options.galleryWalk != true) {
            if (loadShowGroups == true) {
              removeAllGroups();
            }
          } else {
            if (loadShowGroups == false) {
              resetLoadGroups();
            }
          }
        }
      } else {
        groups.removeAttribute("cancreategroup");
        
        if (this.options.galleryWalk == true) {
          headerTitle.innerHTML = "<b>Gallery Walk</b>";
          headerDesc.textContent = "Explore other team's work and get inspired!";
          headerReturnButton.style.removeProperty("display");
          if (loadShowGroups == false) {
            resetLoadGroups();
          }
        } else {
          headerTitle.innerHTML = "<b>Nothing</b> to see here...";
          headerDesc.textContent = "The lesson owner has disabled the ability to see other teams.";
          headerReturnButton.style.display = "flex";
          if (loadShowGroups == true) {
            removeAllGroups();
          }
        }
        if (this.options.pickTeam != true || this.options.changeTeam != true) {
          leaveGroupButton.style.removeProperty("display");
        } else {
          leaveGroupButton.style.display = "flex";
        }
      }

      await this.layout.refreshTileSpots();

      let loadedTiles = Object.keys(this.layout.loadedTiles);
      for (let i = 0; i < loadedTiles.length; i++) {
        let tile = this.layout.tiles[loadedTiles[i]];
        if (tile.render._id != "NEW_GROUP_CREATE") {
          this.layout.updateTile(tile);
        }
      }
    }
    updateConfiguration();

    let pendingMemberAssignment = {};
    this.pipeline.subscribe("createGroup", "creategroup", async (data) => {
      await this.layout.addTile(data, pendingMemberAssignment[data._id] ?? [], true);
      delete pendingMemberAssignment[data._id];
    });

    this.pipeline.subscribe("removeGroup", "removegroup", async (data) => {
      this.layout.removeTile(data._id, true);
    });

    this.pipeline.subscribe("memberJoin", "join", (data) => {
      let session = this.layout.memberSessions[data.modify];
      let existingMember = this.layout.members[data.modify];
      if (session == null) {
        this.layout.memberSessions[data.modify] = [];
        session = this.layout.memberSessions[data.modify];
      }
      if (session.includes(data._id) == false) {
        session.push(data._id);
      }
      if (data.access > 3) {
        return;
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
          this.layout.removeMemberTile(data.modify, true);
          this.layout.updateTile(groupTile);
        }
        if (data._id != null && this.parent.parent.self._id == data._id) {
          updateConfiguration();
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
        this.layout.updateTile(groupTile);
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
          this.layout.updateTile(oldGroupTile);
        }
        this.layout.removeMemberTile(modify, true);
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
            this.layout.addMemberTile(modify, true);
          }
          this.layout.updateTile(groupTile);
        } else if ((this.layout.memberSessions[modify] ?? []).length > 0) {
          this.layout.addMemberTile(modify, true);
        }
        if (data._id != null && this.parent.parent.self._id == data._id) {
          updateConfiguration();
          this.layout.refreshTileSpots();
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
        let session = this.layout.memberSessions[data.member.modify];
        if (session != null) {
          let index = session.indexOf(data.member._id);
          if (index > -1) {
            session.splice(index, 1);
          }
          if (session.length < 1) {
            delete this.layout.memberSessions[data.member.modify];
            if (data.member.access < 4) {
              if (data.member.group != null) {
                this.layout.updateMemberTile(this.parent.parent.collaborators[data.member.modify]);
              } else {
                this.layout.removeMemberTile(data.member.modify, true);
              }
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

    this.pipeline.subscribe("groupUpdatePageClose", "page_close", () => {
      if (this.layout.groupUpdateSub != null) {
        this.layout.groupUpdateSub.close();
      }
    });
    
    groupHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });

    this.onOpen = () => {
      if (this.parent.parent.self.previewGroup != null) {
        sendRequest("DELETE", "lessons/breakout/groups/leavepreview", null, { session: this.parent.parent.session });
      }
      modifyParams("team");
    }

    this.pipeline.subscribe("overviewLessonSet", "set", async (body) => {
      if (body.hasOwnProperty("breakout") == true) {
        updateConfiguration(body);
      }
      if (body.name != null && document.activeElement.closest(".boFileName") != lessonName) {
        lessonName.textContent = this.parent.parent.lesson.name ?? "Untitled Lesson";
        lessonName.title = lessonName.textContent;
      }
      if (this.parent.parent.lesson.pin != null) {
        sharePinButton.textContent = this.parent.parent.lesson.pin;
        sharePinButton.style.display = "unset";
        shareDivider.style.display = "unset";
      } else {
        sharePinButton.style.removeProperty("display");
        shareDivider.style.removeProperty("display");
      }
      updateTopBar();
    }, { sort: 1 });

    frame.addEventListener("click", async (event) => {
      let target = event.target;
      let tile = target.closest(".brgsTile:not([disabled])");
      if (tile == null) {
        return;
      }
      let groupID = tile.getAttribute("group");
      if (target.closest("button") != null) {
        let joinButton = target.closest(".brgsJoinButton");
        if (joinButton != null) {
          joinButton.setAttribute("disabled", "");
          let [code] = await sendRequest("PUT", "lessons/breakout/groups/join?group=" + groupID, null, { session: this.parent.parent.session });
          joinButton.removeAttribute("disabled");
          if (code == 200) {
            if (this.parent.currentGroupID != groupID) {
              this.parent.currentGroupID = groupID;
              this.parent.parent.self.group = groupID;
              let tileData = this.layout.tiles[groupID];
              this.parent.openPage("primary", "breakout/group", { group: tileData.render, members: tileData.members }); //, memberSessions: this.layout.memberSessions
            }
          }
          return;
        }
        if (tile.classList.contains("brgsTileAddGroup") == true) {
          tile.setAttribute("disabled", "");
          let [code, body] = await sendRequest("POST", "lessons/breakout/groups/new", null, { session: this.parent.parent.session });
          tile.removeAttribute("disabled");
          if (code == 200) {
            if (this.parent.currentGroupID != body._id) {
              this.parent.currentGroupID = body._id;
              this.parent.parent.self.group = body._id;
              this.parent.openPage("primary", "breakout/group", { groupID: body._id });
            }
          }
          return;
        }
      }
      if (target.closest(".brgsTileMembersContainer") != null && this.parent.parent.self.group == null) {
        return;
      }
      if (this.options.galleryWalk != true) {
        return alertModule.open("warning", "<b>Gallery Walk Disabled</b><div>The lesson owner has disabled the ability to see a team's work.");
      }
      let tileData = this.layout.tiles[groupID];
      if (tileData != null) {
        this.parent.parent.self.previewGroup = groupID;
        this.parent.openPage("primary", "breakout/group", { group: tileData.render, members: tileData.members }); //, memberSessions: this.layout.memberSessions
      }
    });

    headerReturnButton.addEventListener("click", () => {
      if (this.parent.parent.self.group != null) {
        this.parent.openPage("primary", "breakout/group");
      }
    });

    groups.addEventListener("pointerdown", (event) => {
      let target = event.target;
      let tile = target.closest(".brgsTile");
      if (tile == null) {
        return;
      }
      let tileContent = tile.querySelector(".brgsTileContent");
      if (target.closest(".brgsTileMembersContainer") == null || this.parent.parent.self.group != null) {
        tileContent.style.removeProperty("transform");
      } else if (tile.classList.contains("brgsTileAddGroup") == false) {
        tileContent.style.transform = "scale(1)";
      }
    });

    // Load Images:
    setSVG(topScrollLeft, "../images/editor/top/leftarrow.svg");
    setSVG(topScrollRight, "../images/editor/top/rightarrow.svg");
    setSVG(icon, "../images/breakout.svg");

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
      } else {
        openBoardHolder.style.removeProperty("display");
      }
    }
    openBoard.addEventListener("click", async () => {
      openBoardHolder.style.removeProperty("display");

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
  }
}

modules["dropdowns/lesson/breakout/groups/file"] = class {
  html = `
  <button class="brgsFileAction" option="dashboard" title="Return to the Dashboard" style="--themeColor: var(--secondary)"><div></div>Dashboard</button>
  <div class="brgsFileLine"></div>
  <button class="brgsFileAction" option="copy" title="Create a copy of the lesson." style="display: none"><div></div>Create Copy</button>
  <button class="brgsFileAction" option="moveto" title="Move this lesson into a folder." dropdowntitle="Move To Folder"><div></div>Move To Folder</button>
  <button class="brgsFileAction" option="deletelesson" title="Remove this lesson from your dashboard." style="--themeColor: var(--error)"><div></div>Remove Lesson</button>
  `;
  css = {
    ".brgsFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".brgsFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".brgsFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".brgsFileAction div svg": `width: 100%; height: 100%`,
    ".brgsFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".brgsFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async function (frame, extra) {
    let parent = extra.parent;

    let dashboardButton = frame.querySelector('.brgsFileAction[option="dashboard"]');
    dashboardButton.addEventListener("click", async () => {
      setFrame("pages/app/dashboard");
    });
    let copyButton = frame.querySelector('.brgsFileAction[option="copy"]');
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

    let fileButton = frame.querySelector('.brgsFileAction[option="moveto"]');
    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/moveto", { lessonID: parent.parent.id, folderID: parent.parent.folder });
    });

    let deleteLessonButton = frame.querySelector('.brgsFileAction[option="deletelesson"]');
    deleteLessonButton.addEventListener("click", () => {
      dropdownModule.open(deleteLessonButton, "dropdowns/remove", { type: "deletelesson", lessonID: parent.parent.parent.id, isOwner: false, session: parent.parent.parent.session });
    });

    setSVG(dashboardButton.querySelector("div"), "../images/tooltips/back.svg");
    setSVG(copyButton.querySelector("div"), "../images/editor/file/copy.svg");
    setSVG(fileButton.querySelector("div"), "../images/editor/file/moveto.svg");
    setSVG(deleteLessonButton.querySelector("div"), "../images/editor/file/delete.svg");
  }
}