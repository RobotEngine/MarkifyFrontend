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
    <div class="broOpenBoard" title="Open Markify Board"><button></button></div>
  </div>
  <div class="broGroupHolder customScroll">
    <div class="broGroups"></div>
    <div class="broBackground"></div>
  </div>`;
  css = {
    ".broInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; overflow-y: scroll; z-index: 2`,
    ".broGroupHolder": `--interfacePadding: 58px; --tilePadding: 16px; --totalWidth: calc((var(--columnWidth) * var(--columnCount)) + (var(--tilePadding) * (var(--columnCount) - 1))); position: relative; display: flex; width: 100%; height: 100%; background: var(--pageColor); overflow-y: scroll; z-index: 1; justify-content: center; transition: .5s`,
    ".broGroups": `position: relative; box-sizing: border-box; width: var(--totalWidth); height: var(--totalHeight); margin: calc(var(--interfacePadding) + 8px) 0; contain: strict; z-index: 2`,
    ".broBackground": `position: absolute; width: 100%; height: 100%; min-height: calc(var(--totalHeight) + (var(--interfacePadding) * 2) + 16px); left: 0px; top: 0px; opacity: .075; background-image: url("../images/editor/backdropblack.svg"); background-size: 25px 25px; background-position: center 50px; z-index: 1; pointer-events: none; contain: strict`,
    ".broCreateBreakoutHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; z-index: 3; pointer-events: none`,

    ".broTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".broTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; scrollbar-width: none`,
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
  
    ".broOpenBoard": `position: absolute; display: none; width: 50px; height: 50px; left: 0px; bottom: 0px; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--boardLightShadow); border-radius: 0 12px 0 0; pointer-events: all; visibility: visible`,
    ".broOpenBoard button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".broOpenBoard button:hover": `background: var(--boardHover)`,
    ".broOpenBoard button svg": `width: 32px; height: 32px; transition: .2s`,
    ".broOpenBoard button:hover svg": `transform: scale(.9)`,
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

  js = async (frame) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

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

    let openBoardHolder = frame.querySelector(".broOpenBoard");
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

    // Handle Tile Masonry Layout:
    this.layout = {};
    this.layout.minTileWidth = 250;
    this.layout.maxTileWidth = 400;
    this.layout.tilePadding = 16;
    this.layout.columnCount = 0;
    this.layout.columnWidth = 0;
    this.layout.tileBaseHeight = 16; // Base padding around tile
    this.layout.tileHeightRatio = 3/4; // Ratio for getting height from width of thumbnail
    this.layout.tileMemberHeight = 36; // Height of each member list item
    this.layout.tileMemberGap = 6; // Gap between each member list item
    this.layout.columns = {};
    this.layout.tiles = {};
    this.layout.tileLayout = [];
    this.layout.loadedTiles = [];
    this.layout.getTileHeight = (tile) => {
      let memberCount = tile.members ?? 0;
      return this.layout.tileBaseHeight
      + ((this.layout.columnWidth - this.layout.tileBaseHeight) * this.layout.tileHeightRatio)
      + (this.layout.tileMemberHeight * memberCount)
      + Math.max(this.layout.tileMemberGap * (memberCount - 1), 0);
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
        if (checkSection.height < (minHeight ?? (checkSection.height + 1))) {
          column = checkColumn;
          section = checkSection;
          minHeight = checkSection.height;
        }
      }

      return [column, section];
    }
    this.layout.runUpdateCycle = () => {
      if (this.layout.runningUpdateCycle == true) {
        return;
      }
      this.layout.runningUpdateCycle = true;

      let centerScroll = groupHolder.scrollTop + (this.containerHeight / 2);
      let minLoadBound = centerScroll - this.containerHeight;
      let maxLoadBound = centerScroll + this.containerHeight;

      for (let i = 0; i < this.layout.columnCount; i++) {
        let column = this.layout.columns[i + 1] ?? {};
        if (column.sections == null) {
          continue;
        }
      }

      for (let i = 0; i < this.layout.loadedTiles.length; i++) {
        
      }

      this.layout.runningUpdateCycle = false;
    }
    this.layout.refreshTotalColumnHeight = () => {
      let longestColumn = 0;
      for (let i = 0; i < this.layout.columnCount; i++) {
        let checkColumn = this.layout.columns[i + 1] ?? {};
        if (checkColumn.sections == null) {
          continue;
        }
        let totalHeight = 0;
        let sectionKeys = Object.keys(checkColumn.sections);
        for (let s = 0; s < sectionKeys.length; s++) {
          let section = checkColumn.sections[sectionKeys[s]] ?? {};
          if (section.height != null) {
            totalHeight += section.height;
          }
        }
        if (totalHeight > longestColumn) {
          longestColumn = totalHeight;
        }
      }
      groupHolder.style.setProperty("--totalHeight", (longestColumn - this.layout.tilePadding) + "px");
    }
    this.layout.refreshTileSpots = (offset = 0) => {
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
            section.height -= tileData.height;
          }
        }
      }
      for (let i = offset; i < this.layout.tileLayout.length; i++) {
        let tileID = this.layout.tileLayout[i];
        let tileData = this.layout.tiles[tileID];
        let [column, section] = this.layout.shortestColumn(tileData);
        if (column == null) {
          continue;
        }
        tileData.column = column.number;
        tileData.x = (column.number * this.layout.columnWidth) + (this.layout.tilePadding * (column.number - 1));
        tileData.y = section.height;
        tileData.height = this.layout.getTileHeight(tileData);
        section.height += tileData.height + this.layout.tilePadding;
      }

      this.layout.runUpdateCycle();
      this.layout.refreshTotalColumnHeight();
    }
    this.layout.updateColumns = () => {
      this.layout.refreshTileSpots();
      this.layout.refreshTotalColumnHeight();
      groupHolder.style.setProperty("--columnCount", this.layout.columnCount);
      groupHolder.style.setProperty("--columnWidth", this.layout.columnWidth + "px");
    }
    this.layout.setupColumns = (force) => {
      // Determine the number and width of columns:
      this.containerWidth = groupHolder.clientWidth - (this.layout.tilePadding * 2);
      this.containerHeight = groupHolder.clientHeight;

      let maxPossibleColumns = Math.floor(
        (this.containerWidth + this.layout.tilePadding) / (this.layout.minTileWidth + this.layout.tilePadding)
      );
      let newColumnCount = Math.max(1, maxPossibleColumns);

      while (true) {
        let totalInterPadding = this.layout.tilePadding * (newColumnCount - 1);
        this.layout.columnWidth = (this.containerWidth - totalInterPadding) / newColumnCount;
        if (this.layout.columnWidth <= this.layout.maxTileWidth || newColumnCount < 2) break;
        newColumnCount--;
      }

      this.layout.columnWidth = Math.min(
        this.layout.maxTileWidth,
        Math.max(this.layout.minTileWidth, this.layout.columnWidth),
        this.containerWidth
      );

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
      
      clearTimeout(this.layout.refreshTilesTimeout);
      if (force != true) {
        this.layout.refreshTilesTimeout = setTimeout(this.layout.updateColumns, 200);
      } else {
        this.layout.updateColumns();
      }
    }
    this.pipeline.subscribe("tilesResize", "resize", this.layout.setupColumns);
    this.pipeline.subscribe("updateTileRender", "scroll", this.layout.runUpdateCycle, { sort: 1 });
    this.layout.setupColumns(true);
    this.layout.addTile = (data) => {
      if (data == null) {
        return;
      }
      let tileInfo = { section: "ABC", render: data, members: Math.round(Math.random() * (5 - 1) + 1) };
      this.layout.tiles[data._id] = tileInfo;
      this.layout.tileLayout.push(data._id);
      this.layout.refreshTileSpots(this.layout.tileLayout.length - 1);
    }
    for (let i = 0; i < 12; i++) { this.layout.addTile({ _id: i }); } // Just as a test!
    
    groupHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
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