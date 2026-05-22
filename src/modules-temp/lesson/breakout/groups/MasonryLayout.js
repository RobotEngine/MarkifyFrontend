import { assetURL } from "@/crucial";

import plusIcon from "@assets/lesson/breakout/plus.svg?raw";

export class MasonryLayout {
  minTileWidth = 260;
  maxTileWidth = 450;
  tilePadding = 16;
  maxContainerWidth = 2000; //(this.minTileWidth * 6) + (this.tilePadding * 5) - 1;
  tileBaseHeight = 76; // Base tile height
  tileImageHeight = 84; // Added tile height with an image
  tileMaxMembersHeight = 31; // Added tile height for max member counter
  tileMemberHeight = 40; // Height of each member list item
  tileMemberGap = 4; // Gap between each member list item
  joinButtonHeight = 65; // Height of the space used by the join group button
  
  constructor(parent) {
    this.parent = parent;
  }

  columnCount = 0;
  columnWidth = 0;
  columns = {};
  tiles = {};
  members = {};
  memberSessions = {};
  tileLayout = [];
  tileLayoutVersionIndex = 0;
  loadedTiles = {};

  getTileHeight(tile) {
    let memberCount = (tile.members ?? []).length;
    let totalHeight = this.tileBaseHeight;
    if (tile.render.image != null || tile.render._id == "NEW_GROUP_CREATE") {
      totalHeight += this.tileImageHeight;
    }
    if ((this.parent.options.maxSize ?? 0) > 0) {
      totalHeight += this.tileMaxMembersHeight;
    }
    if (
      this.parent.parent.parent.self.group == null
      && this.parent.options.pickTeam == true
      && tile.render.version == (this.parent.configuration.version ?? 1)
    ) {
      totalHeight += this.joinButtonHeight;
      totalHeight += (this.tileMemberGap * Math.min(memberCount, 1));
    } else {
      totalHeight += (this.tileMemberGap * 2 * Math.min(memberCount, 1));
    }
    totalHeight += (this.tileMemberHeight * memberCount);
    totalHeight += Math.max(this.tileMemberGap * (memberCount - 1), 0);
    return totalHeight;
  }

  getSectionTop(sectionID) {
    let longestColumn = 0;
    for (let i = 0; i < this.columnCount; i++) {
      let checkColumn = this.columns[i + 1] ?? {};
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

  shortestColumn(tile = {}) {
    if (tile.section == null) {
      return [null, null];
    }

    let column;
    let section;
    let minHeight;
    for (let i = 0; i < this.columnCount; i++) {
      let checkColumn = this.columns[i + 1] ?? {};
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

  updateTile(tile = {}) {
    if (tile.element == null) {
      return;
    }
    if (this.parent.parent.parent.self.group != tile.render._id) {
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
    let maxSize = this.parent.options.maxSize ?? 0;
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
    if (
      this.parent.parent.parent.self.group == null
      && this.parent.options.pickTeam == true
      && tile.render.version == (this.parent.configuration.version ?? 1)
    ) {
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

  updateMemberTile(collaborator = {}, memberTile) {
    if (collaborator._id == null) {
      return;
    }
    if (memberTile == null) {
      let groupMember = this.members[collaborator._id] ?? {};
      if (groupMember.tile == null) {
        return this.addMemberTile(collaborator._id);
      }
      memberTile = groupMember.tile;
    }
    if (collaborator.hasOwnProperty("color") == true) {
      memberTile.style.setProperty("--themeColor", collaborator.color);
    }
    if ((this.memberSessions[collaborator._id] ?? []).length > 0) {
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

  addMemberTile(collaboratorID, refresh) {
    let member = this.members[collaboratorID] ?? {};
    let tile;
    let element;
    if (member.group != null) {
      tile = this.tiles[member.group] ?? {};
      if (tile.element == null) {
        if (refresh != false) {
          this.refreshTileSpots(this.tileLayout.indexOf(tile.render._id));
        }
        return;
      }
      element = tile.element.querySelector(".brgsTileMembers");
    }
    if (element == null) {
      return;
    }
    let collaborator = this.parent.parent.parent.collaborators[collaboratorID];
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
    let groupMember = this.members[collaboratorID];
    if (groupMember != null) {
      groupMember.tile = memberTile;
    }
    this.updateMemberTile(collaborator, memberTile);
    element.appendChild(memberTile);
    if (refresh != false && tile != null) {
      this.refreshTileSpots(this.tileLayout.indexOf(tile.render._id));
    }
  }

  removeMemberTile(collaboratorID, refresh) {
    let groupMember = this.members[collaboratorID] ?? {};
    if (groupMember.tile == null) {
      return;
    }
    groupMember.tile.remove();
    groupMember.tile = null;
    if (refresh != false) {
      this.refreshTileSpots(this.tileLayout.indexOf(groupMember.group));
    }
  }

  async runUpdateCycle() {
    if (this.runningUpdateCycle == true) {
      this.reRunUpdateCycle = true;
      return;
    }
    this.runningUpdateCycle = true;
    this.runningEditorSetup = false;

    this.scrollTop = this.parent.groupHolder.scrollTop;
    let centerScroll = this.scrollTop + (this.containerHeight / 2) - this.scrollTopOffset;
    let renderDistance = this.containerHeight;
    let minLoadBound = centerScroll - renderDistance;
    let maxLoadBound = centerScroll + renderDistance;

    let minLoadedBound;
    let minTileID;
    let maxLoadedBound;
    let maxTileID;
    let loadedTileKeys = Object.keys(this.loadedTiles);
    for (let i = 0; i < loadedTileKeys.length; i++) {
      let tileID = loadedTileKeys[i];
      let tile = this.tiles[tileID];
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
      startIndex = this.tileLayout.indexOf(minTileID);
    }
    let endIndex = startIndex;
    if (maxTileID != null) {
      endIndex = this.tileLayout.indexOf(maxTileID);
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
      if (index > this.tileLayout.length) {
        higherIndex = null;
        continue;
      }

      let tileID = this.tileLayout[index];
      if (tileID == null) {
        continue;
      }
      let tileData = this.tiles[tileID];
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
      let tile = this.tiles[tileID];

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
          this.updateTile(tile);
          let members = tile.members ?? [];
          for (let i = 0; i < members.length; i++) {
            this.addMemberTile(members[i], false);
          }
          newTilesFragment.appendChild(tile.element);
        } else {
          tile.element = document.createElement("button");
          tile.element.className = "brgsTile brgsTileAddGroup";
          tile.element.title = "Add a New Team";
          tile.element.innerHTML = `<div class="brgsTileContent">${plusIcon}</div>`;
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

      delete this.loadedTiles[tileID];
    }

    // Bulk Apply Elements:
    this.parent.groups.appendChild(newTilesFragment);

    // Unload Tiles:
    let unloadTileKeys = Object.keys(this.loadedTiles);
    for (let i = 0; i < unloadTileKeys.length; i++) {
      let tileID = unloadTileKeys[i];
      let tile = this.tiles[tileID] ?? {};
      if (tile.element != null) {
        tile.element.remove();
        tile.element = null;
        tile.cache = null;
      }
    }

    this.loadedTiles = loadTiles;

    this.runningUpdateCycle = false;
    if (this.reRunUpdateCycle == true) {
      this.reRunUpdateCycle = false;
      this.runUpdateCycle();
    }
  }

  refreshTotalColumnHeight() {
    this.longestColumn = this.getSectionTop();
    this.parent.groupHolder.style.setProperty("--totalHeight", (this.longestColumn - this.tilePadding) + "px");
  }

  refreshTileSpots(offset = 0) {
    offset = Math.max(offset, 0);
    for (let i = offset; i < this.tileLayout.length; i++) {
      let tileID = this.tileLayout[i];
      let tileData = this.tiles[tileID];
      if (tileData == null) {
        this.tileLayout.splice(i, 1);
        i--;
        continue;
      }
      if (tileData.height == null) {
        continue;
      }
      let column = this.columns[tileData.column] ?? {};
      if (column.sections != null) {
        let section = column.sections[tileData.section] ?? {};
        if (section.height != null) {
          section.height -= (tileData.height + this.tilePadding);
        }
        section.top = null;
      }
    }
    for (let i = offset; i < this.tileLayout.length; i++) {
      let tileID = this.tileLayout[i];
      let tileData = this.tiles[tileID];
      let [column, section] = this.shortestColumn(tileData);
      if (column == null) {
        continue;
      }
      if (section.top == null) {
        section.top = this.getSectionTop(tileData.section);
      }
      tileData.column = column.number;
      tileData.x = (this.columnWidth * (column.number - 1)) + (this.tilePadding * (column.number - 1));
      tileData.y = section.height + section.top;
      tileData.height = this.getTileHeight(tileData);
      section.height += tileData.height + this.tilePadding;
    }

    this.runUpdateCycle();
    this.refreshTotalColumnHeight();
  }

  updateColumns() {
    this.parent.groupHolder.style.setProperty("--columnCount", this.columnCount);
    this.parent.groupHolder.style.setProperty("--columnWidth", this.columnWidth + "px");

    this.groupHolderRect = this.parent.groupHolder.getBoundingClientRect();

    this.refreshTileSpots();
  }

  setupColumns(force) {
    this.pageOffsetWidth = this.parent.frame.offsetWidth;
    this.pageOffsetHeight = this.parent.frame.offsetHeight;

    this.containerWidth = this.parent.groupHolder.clientWidth;
    this.containerHeight = this.parent.groupHolder.clientHeight;

    this.scrollTopOffset = this.parent.header.clientHeight + 16;

    // Determine usable width:
    let groupsWidth = Math.min(
      this.containerWidth - (this.tilePadding * 2),
      this.maxContainerWidth
    );

    // Max possible columns:
    let maxPossibleColumns = Math.floor(
      (groupsWidth + this.tilePadding) /
      (this.minTileWidth + this.tilePadding)
    );

    maxPossibleColumns = Math.max(1, maxPossibleColumns);

    // SMART COLUMN SELECTION:

    let bestColumns = 1;
    let bestWidth = groupsWidth;
    let bestScore;

    let idealTileWidth = (this.minTileWidth + this.maxTileWidth) / 2;

    for (let columns = 1; columns <= maxPossibleColumns; columns++) {

      let totalPadding = this.tilePadding * (columns - 1);
      let tileWidth = (groupsWidth - totalPadding) / columns;

      if (tileWidth <= 0) continue;

      let score = 0;

      // Prefer tile sizes near ideal width:
      score -= Math.abs(tileWidth - idealTileWidth);

      // Penalize tiles smaller than minimum:
      if (tileWidth < this.minTileWidth) {
        score -= 1000;
      }

      // Penalize tiles bigger than max:
      if (tileWidth > this.maxTileWidth) {
        score -= (tileWidth - this.maxTileWidth) * 2;
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

    this.columnWidth = Math.min(
      this.maxTileWidth,
      Math.max(this.minTileWidth, bestWidth),
      groupsWidth
    );

    this.groupsWidth =
      (this.columnWidth * newColumnCount) +
      (this.tilePadding * (newColumnCount - 1));

    // Reorganize tiles to new columns:
    while (this.columnCount != newColumnCount) {
      if (this.columnCount < newColumnCount) { // Add a new column:
        let newColumn = {
          number: this.columnCount + 1,
          sections: {}
        };
        this.columns[newColumn.number] = newColumn;

        this.columnCount = Math.ceil(this.columnCount + 1);
      } else { // Remove a column:
        let column = this.columns[this.columnCount];
        if (column != null) {
          delete this.columns[this.columnCount];
        }

        this.columnCount = Math.floor(this.columnCount - 1);
      }
    }

    this.tileHeightRatio = this.pageOffsetHeight / this.pageOffsetWidth;
    
    clearTimeout(this.refreshTilesTimeout);
    if (force != true) {
      this.refreshTilesTimeout = setTimeout(() => { this.updateColumns(); }, 200);
    } else {
      this.updateColumns();
    }
  }

  removeTile(tileID, refresh) {
    let tile = this.tiles[tileID];
    if (tile == null) {
      return;
    }
    if (tile.height != null) {
      let column = this.columns[tile.column] ?? {};
      if (column.sections != null) {
        let section = column.sections[tile.section] ?? {};
        if (section.height != null) {
          section.height -= (tile.height + this.tilePadding);
        }
      }
    }
    let index = this.tileLayout.indexOf(tileID);
    if (index > -1) {
      if ((tile.version == null || tile.version == (this.parent.parent.parent.lesson.breakout ?? {}).version) && tile._id != "NEW_GROUP_CREATE") {
        this.tileLayoutVersionIndex--;
      }
      this.tileLayout.splice(index, 1);
      if (refresh == true) {
        this.refreshTileSpots(index);
      }
    }
    if (tile.element != null) {
      tile.element.remove();
      tile.element = null;
    }
    delete this.tiles[tileID];
  }

  addTile(data, members, refresh) {
    if (data == null) {
      return;
    }
    if (this.tiles[data._id] != null) {
      this.removeTile(data._id, refresh);
    }
    let tileInfo = {
      section: data.version,
      render: data,
      members: members ?? []
    };
    this.tiles[data._id] = tileInfo;
    if ((data.version == null || data.version == (this.parent.parent.parent.lesson.breakout ?? {}).version) && data._id != "NEW_GROUP_CREATE") {
      this.tileLayout.splice(this.tileLayoutVersionIndex, 0, data._id);
      this.tileLayoutVersionIndex++;
      if (refresh == true) {
        this.refreshTileSpots(this.tileLayoutVersionIndex - 1);
      }
    } else {
      this.tileLayout.push(data._id);
      if (refresh == true) {
        this.refreshTileSpots(this.tileLayout.length - 1);
      }
    }
  }
}