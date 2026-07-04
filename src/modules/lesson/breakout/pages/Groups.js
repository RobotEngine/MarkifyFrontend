import { userID, account, setPage, modifyParams, sendRequest, subscribe, objectUpdate } from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
import { alert as alertModule } from "@modules/utility/Alert";

import { MasonryLayout } from "../groups/MasonryLayout";

import { Frame as FileDropdown } from "../groups/dropdowns/File";

import { Pipeline } from "@modules/editor/Pipeline";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import breakoutLogoIcon from "@assets/breakout.svg?raw";
import boardLogoIcon from "@assets/icon.svg?raw";

export class Page {
  constructor() {
    this.pipeline = new Pipeline(this.pages);
    this.layout = new MasonryLayout(this);
  }

  html = `
  <div class="brgsInterface customScroll">
    <div class="brgsTopHolder">
      <button class="brgsTopScroll" left style="left: 7px">${leftArrowIcon}</button>
      <button class="brgsTopScroll" right style="right: 7px">${rightArrowIcon}</button>
      <div class="brgsTop">
        <div class="brgsTopSection" left>
          <a class="brgsLogo" href="/app/dashboard" draggable="false">${breakoutLogoIcon}</a>
          <div class="brgsFileNameHolder border"><div class="brgsFileName"></div></div>
          <button class="brgsFileDropdown" title="File Options">File</button>
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
          <button title="Open Markify Board">${boardLogoIcon}</button>
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
    
    ".brgsTile": `position: absolute; width: var(--columnWidth); height: fit-content; left: 0px; top: 0px; padding: 0; border-radius: 16px; z-index: 1; transition: .3s`, // will-change: transform;
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
    ".brgsTileMemberNameText": `font-size: 16px; font-weight: 500; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: .2s`,
    ".brgsJoinButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 12px; display: none; width: fit-content; max-width: 100%; padding: 6px 12px; margin: 15px 3px; justify-content: center; font-size: 16px; white-space: nowrap`,

    ".brgsTileAddGroup": `padding: 0; z-index: 2 !important; opacity: 0; pointer-events: none`,
    ".brgsGroups[cancreategroup] .brgsTileAddGroup:not([disabled])": `opacity: 1 !important; pointer-events: all !important`,
    ".brgsTileAddGroup .brgsTileContent": `--opacity: .3; --pageColor: rgba(var(--background), 0); box-sizing: border-box; padding: 12px; background: rgba(var(--themeRGB), var(--opacity)); justify-content: center; align-items: center`,
    ".brgsTileAddGroup:hover .brgsTileContent": `--opacity: 1; --pageColor: rgba(var(--background), 1); transform: scale(1.05); border-radius: 20px`,
    ".brgsTileAddGroup:active .brgsTileContent": `transform: scale(.98)`,
    ".brgsTileAddGroup .brgsTileContent svg": `width: 100%; height: 100%`
  };

  updateTopBar(ignoreAttr) {
    if (ignoreAttr != true) {
      this.topHolder.removeAttribute("scroll");
    }
    if (this.top.scrollWidth > this.top.clientWidth) {
      if (ignoreAttr != true) {
        this.topHolder.setAttribute("scroll", "");
      }
      if (Math.floor(this.top.scrollLeft) > 0) {
        this.topScrollLeft.style.opacity = 1;
        this.topScrollLeft.style.pointerEvents = "all";
      } else {
        this.topScrollLeft.style.opacity = 0;
        this.topScrollLeft.style.pointerEvents = "none";
      }
      if (Math.floor(this.top.scrollWidth - this.top.scrollLeft) > Math.floor(this.top.clientWidth)) {
        this.topScrollRight.style.opacity = 1;
        this.topScrollRight.style.pointerEvents = "all";
      } else {
        this.topScrollRight.style.opacity = 0;
        this.topScrollRight.style.pointerEvents = "none";
      }
    } else {
      this.topScrollLeft.style.opacity = 0;
      this.topScrollLeft.style.pointerEvents = "none";
      this.topScrollRight.style.opacity = 0;
      this.topScrollRight.style.pointerEvents = "none";
    }
  }

  updateSplitScreenButton() {
    this.boardEnabled = this.parent.parent.lesson.tool.includes("board");
    this.boardOpen = this.parent.parent.pages["board"] != null;
    this.boardVisible = this.parent.parent.maximized != true || this.parent.parent.activePageID == "board";

    let showBoardButton = false;
    if (this.boardEnabled == true) {
      if (this.boardOpen == false || this.boardVisible == false) {
        showBoardButton = true;
      }
    } else if (this.parent.parent.self.access > 3) {
      if (this.boardOpen == false || this.boardVisible == false) {
        showBoardButton = true;
      }
    }

    if (showBoardButton == true) {
      this.openBoardHolder.style.display = "flex";
    } else {
      this.openBoardHolder.style.removeProperty("display");
    }
  }

  onOpen() {
    if (this.parent.parent.self.previewGroup != null) {
      sendRequest("DELETE", "lessons/breakout/groups/leavepreview", null, { session: this.parent.parent.session });
    }
    modifyParams("team");
  }

  loadShowGroups = false;
  
  removeAllGroups() {
    this.loadShowGroups = false;

    this.groups.innerHTML = "";

    this.layout.columnCount = 0;
    this.layout.columnWidth = 0;
    this.layout.columns = {};
    this.layout.tiles = {};
    this.layout.tileLayout = [];
    this.layout.tileLayoutVersionIndex = 0;
    this.layout.loadedTiles = {};

    this.layout.refreshTotalColumnHeight();
  }
  async resetLoadGroups() {
    this.removeAllGroups();

    this.layout.setupColumns(true);
    
    this.loadShowGroups = true;
    this.loadingGroups = false;
    this.allGroupsLoaded = false;
    this.lastGroupTime = null;

    await this.checkLoadGroups();
    this.layout.addTile({ _id: "NEW_GROUP_CREATE", version: (this.parent.parent.lesson.breakout ?? {}).version }, null, true);
  }

  async updateConfiguration() {
    this.configuration = this.parent.parent.lesson.breakout ?? {};
    this.options = this.configuration.options ?? {};
    
    if (this.parent.parent.self.group == null) {
      if (
        this.options.pickTeam == true
        && this.options.createTeam == true
        && (this.parent.parent.self.group == null || this.options.changeTeam == true)
      ) {
        this.groups.setAttribute("cancreategroup", "");
      } else {
        this.groups.removeAttribute("cancreategroup");
      }
      
      if (this.options.pickTeam == true) {
        this.headerTitle.innerHTML = "<b>Choose</b> your <b>Team!</b>";
        this.headerDesc.textContent = "Find and select the team you want to be a member of:";
        this.headerReturnButton.style.removeProperty("display");
        if (this.loadShowGroups == false) {
          this.resetLoadGroups();
        }
      } else {
        this.headerTitle.innerHTML = "You're in the <b>Waiting Room</b>";
        this.headerDesc.textContent = "Please wait for the lesson owner to place you into a team!";
        this.headerReturnButton.style.removeProperty("display");
        if (this.options.galleryWalk != true) {
          if (this.loadShowGroups == true) {
            this.removeAllGroups();
          }
        } else {
          if (this.loadShowGroups == false) {
            this.resetLoadGroups();
          }
        }
      }
    } else {
      this.groups.removeAttribute("cancreategroup");

      if (this.options.galleryWalk == true) {
        this.headerTitle.innerHTML = "<b>Gallery Walk</b>";
        this.headerDesc.textContent = "Explore other team's work and get inspired!";
        this.headerReturnButton.style.removeProperty("display");
        if (this.loadShowGroups == false) {
          this.resetLoadGroups();
        }
      } else {
        this.headerTitle.innerHTML = "<b>Nothing</b> to see here...";
        this.headerDesc.textContent = "The lesson owner has disabled the ability to see other teams.";
        this.headerReturnButton.style.display = "flex";
        if (loadShowGroups == true) {
          this.removeAllGroups();
        }
      }
      if (this.options.pickTeam != true || this.options.changeTeam != true) {
        this.leaveGroupButton.style.removeProperty("display");
      } else {
        this.leaveGroupButton.style.display = "flex";
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

  async loadGroups() {
    if (this.loadingGroups == true || this.allGroupsLoaded == true) {
      return;
    }
    this.loadingGroups = true;

    let path = "lessons/breakout/groups";
    if (this.lastGroupTime != null) {
      path += "?after=" + this.lastGroupTime;
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
      this.allGroupsLoaded = true;
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
    this.lastGroupTime = (body.groups[bodyItems - 1] ?? {}).created;

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

    this.loadingGroups = false;
  }
  async checkLoadGroups() {
    if (this.groupHolder.scrollTop + this.layout.containerHeight + 500 > this.groupHolder.scrollHeight || this.groups.clientHeight < this.layout.containerHeight) {
      await this.loadGroups();
      if (this.loadingGroups != true && this.allGroupsLoaded != true) {
        checkLoadGroups();
      }
    }
  }

  pendingMemberAssignment = {}; // May recieve member update events before the new group event.
  updateMember(modify, data) {
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
          let pending = this.pendingMemberAssignment[data.group];
          if (pending == null) {
            this.pendingMemberAssignment[data.group] = [];
            pending = this.pendingMemberAssignment[data.group];
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
      if (this.parent.parent.self.modify == modify) {
        this.parent.parent.self.group = data.group;
        this.updateConfiguration();
        this.layout.refreshTileSpots();
      }
    }
  }

  async js(frame, extra = {}) {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.topHolder = frame.querySelector(".brgsTopHolder");
    this.top = this.topHolder.querySelector(".brgsTop");

    this.leftTop = this.top.querySelector(".brgsTopSection[left]");
    this.icon = this.leftTop.querySelector(".brgsLogo");
    this.lessonName = this.leftTop.querySelector(".brgsFileName");
    this.fileButton = this.leftTop.querySelector(".brgsFileDropdown");
    this.leaveGroupButton = this.leftTop.querySelector(".brgsLeaveGroup");

    this.rightTop = this.top.querySelector(".brgsTopSection[right]");
    this.sharePinButton = this.rightTop.querySelector(".brgsSharePin");
    this.shareDivider = this.rightTop.querySelector(".brgsTopDivider[share]");
    this.accountButton = this.rightTop.querySelector(".brgsAccount");
    this.loginButton = this.rightTop.querySelector(".brgsLogin");

    this.topScrollLeft = this.topHolder.querySelector(".brgsTopScroll[left]");
    this.topScrollRight = this.topHolder.querySelector(".brgsTopScroll[right]");

    this.groupHolder = frame.querySelector(".brgsGroupHolder");
    this.header = this.groupHolder.querySelector(".brgsHeader");
    this.headerTitle = this.header.querySelector(".brgsHeaderTitle");
    this.headerDesc = this.header.querySelector(".brgsHeaderDesc");
    this.headerReturnButton = this.header.querySelector(".brgsHeaderReturnButton");
    this.groups = this.groupHolder.querySelector(".brgsGroups");

    this.bottom = frame.querySelector(".brgsBottom");
    this.openBoardHolder = this.bottom.querySelector(".brgsOpenBoard");
    this.openBoard = this.openBoardHolder.querySelector("button");

    // Top bar events:
    this.topScrollLeft.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft - 200, behavior: "smooth" });
    });
    this.topScrollRight.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft + 200, behavior: "smooth" });
    });
    this.pipeline.subscribe("topbarResize", "resize", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { this.updateTopBar(true); });
    this.top.addEventListener("scroll", (event) => { this.pipeline.publish("topbar_scroll", { event }); });

    // Exit button event:
    this.icon.addEventListener("click", (event) => {
      event.preventDefault();
      setPage("pages/app/dashboard");
    });

    // Lesson name set:
    let name = this.parent.parent.lesson.name ?? "Untitled Lesson";
    this.lessonName.textContent = name;
    this.lessonName.title = name;

    // File dropdown:
    this.fileButton.addEventListener("click", () => {
      dropdownModule.open(this.fileButton, FileDropdown, { parent: this });
    });

    // Leave group button:
    this.leaveGroupButton.addEventListener("click", async () => {
      this.leaveGroupButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/breakout/groups/leave", null, { session: this.parent.parent.session });
      this.leaveGroupButton.removeAttribute("disabled");
    });

    // Share dropdown:
    this.sharePinButton.addEventListener("click", () => {
      dropdownModule.open(this.sharePinButton, import("@modules/lesson/dropdowns/share/Pin"), { parent: this.parent });
    });
    if (this.parent.parent.lesson.pin != null) {
      this.sharePinButton.textContent = this.parent.parent.lesson.pin;
      this.sharePinButton.style.display = "unset";
      this.shareDivider.style.display = "unset";
    }

    // Account setup:
    if (userID != null) {
      this.accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
       this.accountButton.querySelector("img").src = account.image;
      }
      this.accountButton.addEventListener("click", () => {
        dropdownModule.open(this.accountButton, import("@modules/dropdowns/Account"), { parent: this });
      });
    } else {
      this.accountButton.remove();
      this.loginButton.style.display = "block";
      this.loginButton.addEventListener("click", () => { promptLogin(); });
    }

    // Splitscreen update events:
    this.openBoard.addEventListener("click", async () => {
      this.openBoardHolder.style.removeProperty("display");

      if (this.boardOpen == false) {
        await this.parent.parent.addPage("board", "board", { insertBefore: this.parent.pageHolder, percent: .5 });
      }
      if (this.boardVisible == false) {
        this.parent.parent.activePageID = "board";
        this.parent.parent.pushToPipelines(null, "page_switch", { pageID: "board" });
      }
    });
    this.pipeline.subscribe("pageAdd", "page_add", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageRemove", "page_remove", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageSwitch", "page_switch", () => { this.updateSplitScreenButton(); });
    this.pipeline.subscribe("pageMaximize", "maximize", () => { this.updateSplitScreenButton(); });
    this.updateSplitScreenButton();

    // Set event:
    this.pipeline.subscribe("lessonSet", "set", async (body) => {
      if (body.hasOwnProperty("breakout") == true) {
        this.updateConfiguration(body);
      }

      if (body.name != null) {
        let name = this.parent.parent.lesson.name ?? "Untitled Lesson";
        this.lessonName.textContent = name;
        this.lessonName.title = name;
      }

      if (this.parent.parent.lesson.pin != null) {
        this.sharePinButton.textContent = this.parent.parent.lesson.pin;
        this.sharePinButton.style.display = "unset";
        this.shareDivider.style.display = "unset";
      } else {
        this.sharePinButton.style.removeProperty("display");
        this.shareDivider.style.removeProperty("display");
      }

      if (body.hasOwnProperty("tool") == true) {
        this.updateSplitScreenButton();
      }

      this.updateTopBar();
    }, { sort: 1 });
    this.updateConfiguration();

    // Tile layout cleanup event:
    this.pipeline.subscribe("groupUpdatePageClose", "page_close", () => {
      if (this.layout.groupUpdateSub != null) {
        this.layout.groupUpdateSub.close();
      }
    });

    // Tile layout events:
    this.pipeline.subscribe("tilesResize", "resize", (event) => {
      this.layout.resized = true;
      this.layout.lastResizeWasSimulated = event.simulated == true;
      this.layout.setupColumns();
    });
    this.pipeline.subscribe("tilesScroll", "scroll", () => { this.layout.runUpdateCycle(); }, { sort: 1 });
    this.pipeline.subscribe("tilesLoadMore", "bounds_change", () => { this.checkLoadGroups(); });
    this.groupHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });
    this.layout.setupColumns(true);

    // Group events:
    this.pipeline.subscribe("createGroup", "creategroup", async (data) => {
      await this.layout.addTile(data, this.pendingMemberAssignment[data._id] ?? [], true);
      delete this.pendingMemberAssignment[data._id];
    });
    this.pipeline.subscribe("removeGroup", "removegroup", async (data) => {
      this.layout.removeTile(data._id, true);
    });

    // Member events:
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
        if (this.parent.parent.self.modify == data.modify) {
          this.parent.parent.self.group = data.group;
          updateConfiguration();
        }
      }
      this.layout.members[data.modify] = { ...(existingMember ?? {}), group: data.group, modify: data.modify };
      if (data.group != null) {
        let groupTile = this.layout.tiles[data.group];
        if (groupTile == null) {
          let pending = this.pendingMemberAssignment[data.group];
          if (pending == null) {
            this.pendingMemberAssignment[data.group] = [];
            pending = this.pendingMemberAssignment[data.group];
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
    this.pipeline.subscribe("memberUpdate", "update", (data) => {
      let member = this.parent.parent.members[data._id];
      if (member == null || member.access > 3) {
        return;
      }
      this.updateMember(member.modify, data);
    }, { sort: 1 });
    this.pipeline.subscribe("groupMemberMove", "move", (data) => {
      let existingMember = this.layout.members[data.modify];
      if (existingMember != null) {
        existingMember = {
          ...data,
          group: existingMember.group,
          tile: existingMember.tile
        };
        this.updateMember(data.modify, { group: data.group });
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

    // Load members:
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

    // Click listener:
    this.frame.addEventListener("click", async (event) => {
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
              this.parent.openPage("primary", "group", { group: tileData.render, members: tileData.members });
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
              this.parent.openPage("primary", "group", { groupID: body._id });
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
        this.parent.openPage("primary", "group", { group: tileData.render, members: tileData.members });
      }
    });

    // Pointer down listener (cancels transition on subbuttons and text boxes):
    this.groups.addEventListener("pointerdown", (event) => {
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

    // Return group button:
    this.headerReturnButton.addEventListener("click", () => {
      if (this.parent.parent.self.group != null) {
        this.parent.openPage("primary", "group");
      }
    });
  }
}