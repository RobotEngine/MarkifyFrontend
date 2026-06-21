import { sendRequest, subscribe, copyObject, sleep } from "@/crucial";

import { Editor } from "@modules/editor/Editor";
import { REALTIME } from "@modules/editor/imports";

import plusIcon from "@assets/lesson/breakout/plus.svg?raw";
import { more as moreIcon } from "@modules/utility/core-icons";

export class MasonryLayout {
  minTileWidth = 260;
  maxTileWidth = 450;
  tilePadding = 16;
  maxContainerWidth = 2000; //(this.minTileWidth * 6) + (this.tilePadding * 5) - 1;
  previewScale = 1;
  tileInnerPadding = 6;
  tileBaseHeight = 46;
  tileMemberHeight = 40; // Height of each member list item
  tileMemberGap = 6; // Gap between each member list item

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
  scrollTopOffset = 0;
  loadedTiles = {};
  templateRoots = {};
  pendingEditors = [];
  loadingAnnotations = {};
  longSubscribedGroups = [];
  maxLongSubscribedGroups = 100;
  shortSubVisibleChunks = {};

  getTileHeight(tile) {
    let memberCount = (tile.members ?? []).length;
    return this.tileBaseHeight
    + this.tileInnerPadding
    + this.previewHeight
    + ((this.tileMemberHeight + this.tileMemberGap) * memberCount)
    //+ (this.tileMemberGap * Math.min(memberCount, 1));
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

  updateShortSubscribe() {
    clearTimeout(this.shortSubUpdateTimeout);
    this.shortSubUpdateTimeout = setTimeout(() => {
      let groups = [];
      if (this.parent.parent.parent.signalStrength > 2) {
        groups = Object.keys(this.loadedTiles).filter((groupID) => {
          if (groupID != "NEW_GROUP_CREATE") {
            return true;
          }
        }).map((groupID) => { return "short_" + groupID });
      }
      let filter = { c: groups, p: Object.keys(this.shortSubVisibleChunks) };
      if (this.shortSub != null) {
        this.shortSub.edit(filter);
      } else if (groups.length > 0) {
        this.shortSub = subscribe(filter, async (data) => {
          let tile = this.tiles[data[0]];
          if (tile == null) {
            return;
          }
          if (tile.editor != null) {
            tile.editor.pipeline.publish("short", data);
          }
        });
      }
    }, 750);
  }

  async setupEditors(append) {
    if (append != null) {
      this.pendingEditors.push(append);
    }
    if (this.runningEditorSetup == true) {
      return;
    }
    this.runningEditorSetup = true;

    while (this.pendingEditors.length > 0 && this.runningEditorSetup == true) {
      let [tile, body, root] = this.pendingEditors.shift();
      if (tile.editor == null || tile.element == null) {
        continue;
      }
      await tile.editor.updatePageSize();

      if (body != null) {
        root = root ?? {};
        await tile.editor.loadAnnotations(copyObject({
          annotations: body.annotations ?? [],
          rootAnnotations: root.annotations ?? [],
          sources: [ ...(body.sources ?? []), ...(root.sources ?? []) ],
          reactions: [ ...(body.reactions ?? []), ...(root.reactions ?? []) ],
          reactedTo: [ ...(body.reactedTo ?? []), ...(root.reactedTo ?? []) ]
        }), {
          skipPositioning: tile.editorState != null
        });
        if (tile.element != null) {
          let previewHolder = tile.element.querySelector(".broTilePreview");
          if (previewHolder != null) {
            previewHolder.removeAttribute("disabled");
          }
        }
      }

      if (tile.editorState != null) {
        await tile.editor.setState(tile.editorState);
      } else {
        await tile.editor.updateChunks();
        await tile.editor.loadAnnotations();
      }

      for (let i = 0; i < tile.editor.visibleChunks.length; i++) {
        this.shortSubVisibleChunks[tile.editor.visibleChunks[i]] = true;
      }
      
      tile.editor.previewLoaded = true;
    }

    this.updateShortSubscribe();

    this.runningEditorSetup = false;
  }

  updatePercentageOfWork(tile) {
    if (tile == null) {
      return;
    }
    let groupMembers = tile.members.map((value) => {
      let groupMember = this.members[value];
      if (groupMember != null) {
        return groupMember;
      }
    });
    let totalContribution = 0;
    let groupMemberCount = groupMembers.length;
    for (let i = 0; i < groupMemberCount; i++) {
      totalContribution += groupMembers[i].contribution ?? 0;
    }
    let equalContribution = totalContribution / groupMemberCount;
    for (let i = 0; i < groupMemberCount; i++) {
      let member = groupMembers[i];
      if (member.tile == null) {
        continue;
      }
      if (groupMemberCount == 1 || equalContribution == 0) {
        member.tile.style.setProperty("--workDisplay", "none");
        continue;
      } else {
        member.tile.style.setProperty("--workDisplay", "unset");
      }
      let contribution = member.contribution ?? 0;
      let percent = (contribution - equalContribution) / equalContribution;
      let absPercent = Math.min(Math.abs(percent), 1);
      member.tile.style.setProperty("--workPercent", absPercent);
      if (percent > 0) {
        member.tile.style.setProperty("--workInvert", 0);
      } else {
        member.tile.style.setProperty("--workInvert", 1);
      }
      if (absPercent <= .2) {
        member.tile.style.setProperty("--workThemeColor", "var(--theme)");
      } else if (absPercent > .5) {
        member.tile.style.setProperty("--workThemeColor", "var(--error)");
      } else if (absPercent > .2) {
        member.tile.style.setProperty("--workThemeColor", "var(--yellow)");
      }
    }
  }

  updateTile(tile = {}) {
    if (tile.element == null) {
      return;
    }
    let tileNameHeader = tile.element.querySelector(".broTileHeaderName");
    let tileNameImage = tileNameHeader.querySelector(".broTileHeaderNameImage");
    if (tile.render.image != null) {
      tileNameImage.src = assetURL + tile.render.image;
      tileNameImage.style.display = "block";
    } else {
      tileNameImage.style.removeProperty("display");
    }
    let tileNameText = tileNameHeader.querySelector(".broTileHeaderNameHolderText");
    let setName = tile.render.name ?? "Untitled Team";
    tileNameText.textContent = setName
    tileNameText.title = setName;
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
      let memberName = memberTile.querySelector(".broTileMemberNameText");
      memberName.textContent = collaborator.name;
      memberName.title = collaborator.name;
    }
  }
  addMemberTile(collaboratorID, refresh) {
    let member = this.members[collaboratorID] ?? {};
    let tile;
    let element = this.parent.waitingRoomMembersHolder;
    if (member.group != null) {
      tile = this.tiles[member.group] ?? {};
      if (tile.element == null) {
        if (refresh != false) {
          this.refreshTileSpots(this.tileLayout.indexOf(tile.render._id));
        }
        return;
      }
      element = tile.element.querySelector(".broTileMembers");
    }
    let collaborator = this.parent.parent.parent.collaborators[collaboratorID];
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
      memberTile.querySelector(".broTileMemberContent").insertAdjacentHTML("beforeend", `<div class="broTileMemberPercent" title="Percentage of Work Indicator">
        <div class="broTileMemberPercentBarHolder">
          <div class="broTileMemberPercentBar"></div>
        </div>
      </div>`);
    }
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
    let newTilesPendingEditors = [];
    let visibleChunks = [];
    let loadTileKeys = Object.keys(loadTiles);
    for (let i = 0; i < loadTileKeys.length; i++) {
      let tileID = loadTileKeys[i];
      let tile = this.tiles[tileID];

      if (tile.element == null) {
        if (tileID != "NEW_GROUP_CREATE") {
          tile.element = document.createElement("a");
          tile.element.className = "broTile";
          tile.element.setAttribute("group", tileID);
          tile.element.innerHTML = `<div class="broTileContent">
            <div class="broTileHeader">
              <div class="broTileHeaderName">
                <img class="broTileHeaderNameImage" />
                <div class="broTileHeaderNameHolder border"><div class="broTileHeaderNameHolderText" contenteditable></div></div>
              </div>
              <div class="broTileHeaderOptions">
                <button class="broTileHeaderOptionsButton">${moreIcon}</button>
              </div>
            </div>
            <div class="broTilePreviewContainer">
              <div class="broTilePreview"></div>
            </div>
            <div class="broTileMembers"></div>
          </div>`;
          this.updateTile(tile);
          tile.element.href = "/app/lesson?lesson=" + this.parent.parent.parent.id + "&team=" + tileID;
          if (tile.loadedAnnotations != true) {
            tile.element.querySelector(".broTilePreview").setAttribute("disabled", "");
          }
          let members = tile.members ?? [];
          for (let i = 0; i < members.length; i++) {
            this.addMemberTile(members[i], false);
          }
          this.updatePercentageOfWork(tile);
          newTilesPendingEditors.push(tile);
          newTilesFragment.appendChild(tile.element);
        } else {
          tile.element = document.createElement("button");
          tile.element.className = "broTile broTileAddGroup";
          tile.element.title = "Add a New Team";
          tile.element.innerHTML = `<div class="broTileContent">${plusIcon}</div>`;
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
        await tile.editor.updatePageSize();
        if (this.lastResizeWasSimulated != true) {
          await tile.editor.goToCenterPosition(centerPosition.x, centerPosition.y);
        } else {
          if (tile.editorState != null) {
            delete tile.editorState;
          }
          if (tile.editor.annotationPages.length > 0) {
            tile.editor.utils.updateAnnotationScroll(tile.editor.annotationPages[tile.editor.currentPage - 1], false);
          } else {
            tile.editor.utils.centerWindowWithPage();
          }
        }
        for (let i = 0; i < tile.editor.visibleChunks.length; i++) {
          visibleChunks[tile.editor.visibleChunks[i]] = true;
        }
      }

      delete this.loadedTiles[tileID];
    }

    // Load Editors:
    let getGroupAnnotations = [];
    let getGroupRoots = [];
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
      tile.editor = await this.parent.setFrame(Editor, previewHolder, {
        construct: {
          page: previewContainer,
          pageID: this.parent.parent.pageID,
          pageType: this.parent.parent.pageType,
          id: tile.render._id,
          lesson: this.parent.parent.parent,
          self: this.parent.parent.parent.self,
          session: this.parent.parent.parent.session,
          sessionID: this.parent.parent.parent.sessionID,
          sources: this.parent.parent.parent.sources,
          pageRenderPipeline: this.parent.parent.parent.pageRenderPipeline,
          collaborators: this.parent.parent.parent.collaborators,
          backgroundColor: tile.render.background ?? "FFFFFF",
          //scrollOffset: 50, //* (1 / this.previewScale),
          //sideScrollOffset: 8, //* (1 / this.previewScale),
          skipPDFTextAnnotationLayer: true,
          includeIdInShortPublish: true,
          subscribeShortEvents: false,
          ...existingState
        }
      });
      tile.editor.register(REALTIME());
      tile.editor.updatePageSize = async () => {
        let invertedScale = 1 / this.previewScale;
        let standardWidth = this.previewWidth;
        let standardHeight = this.previewWidth * this.tileHeightRatio;
        tile.editor.pageOffsetWidth = standardWidth * invertedScale;
        tile.editor.pageOffsetHeight = standardHeight * invertedScale;
        let parentRectX = this.groupHolderRect.x + ((this.containerWidth - this.groupsWidth) / 2) - ((standardWidth - this.columnWidth) / 2);
        let parentRectY = this.groupHolderRect.y + this.parent.scrollOffset + (this.tilePadding - 8) - this.scrollTop - ((standardHeight - this.previewHeight) / 2);
        tile.editor.pageRect = {
          scale: invertedScale,
          x: parentRectX + tile.x,
          y: parentRectY + tile.y,
          width: tile.editor.pageOffsetWidth,
          height: tile.editor.pageOffsetHeight,
          left: parentRectX + tile.x,
          right: parentRectX + tile.x + standardWidth,
          top: parentRectY + tile.y,
          bottom: parentRectY + tile.y + tile.height
        };
        if (this.resized == true) {
          await tile.editor.render.setMarginSize();
        }
      }
      tile.editor.pipeline.subscribe("overviewZoomChange" , "zoom_change", () => {
        for (let i = 0; i < tile.editor.visibleChunks.length; i++) {
          this.shortSubVisibleChunks[tile.editor.visibleChunks[i]] = true;
        }
        this.updateShortSubscribe();
      });
      if (tile.loadedAnnotations != true && this.loadingAnnotations[tile.render._id] == null) {
        this.loadingAnnotations[tile.render._id] = [];
        getGroupAnnotations.push(tile.render._id);

        this.longSubscribedGroups.push(tile.render._id);
        if (this.longSubscribedGroups.length > this.maxLongSubscribedGroups) {
          let unloadTileID = this.longSubscribedGroups.shift();
          let unloadTile = this.tiles[unloadTileID];
          if (unloadTile != null) {
            if (unloadTile.editor != null) {
              unloadTile.editor.reset();
            }
            delete unloadTile.loadedAnnotations;
            delete this.loadingAnnotations[unloadTileID];
          }
        }
      } else {
        this.pendingEditors.push([tile]);
      }
      if (tile.render.template != null) {
        let rootID = tile.render.version + "_" + tile.render.template;
        if (this.templateRoots[rootID] == null && this.loadingAnnotations[rootID] == null) {
          this.loadingAnnotations[rootID] = [];
          getGroupRoots.push(rootID);
        }
      }
    }

    // Bulk Apply Elements:
    this.parent.groups.appendChild(newTilesFragment);

    // Bulk Fetch Annotations for Unloaded Groups:
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
            session: this.parent.parent.session,
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
                        let tile = this.tiles[id];
                        tile.loadedAnnotations = true;
                        if (tile.render.template != null) {
                          let rootID = tile.render.version + "_" + tile.render.template;
                          let root = this.templateRoots[rootID];
                          if (root != null) {
                            this.setupEditors([tile, body, root]);
                          } else {
                            let rootLoad = this.loadingAnnotations[rootID];
                            if (rootLoad != null) {
                              rootLoad.push([tile, body]);
                            }
                          }
                        }
                        break;
                      case "root":
                        this.templateRoots[id] = body;
                        let rootLoad = this.loadingAnnotations[id];
                        if (rootLoad != null) {
                          for (let r = 0; r < rootLoad.length; r++) {
                            let [tile, groupBody] = rootLoad[r];
                            this.setupEditors([tile, groupBody, body]);
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
          delete this.loadingAnnotations[getGroupAnnotations[i]];
        }
        for (let i = 0; i < getGroupRoots.length; i++) {
          delete this.loadingAnnotations[getGroupRoots[i]];
        }
      })();
    }

    // Unload Tiles:
    let unloadTileKeys = Object.keys(this.loadedTiles);
    for (let i = 0; i < unloadTileKeys.length; i++) {
      let tileID = unloadTileKeys[i];
      let tile = this.tiles[tileID] ?? {};
      if (tile.editor != null) {
        if (tile.editor.previewLoaded == true) {
          if (this.lastResizeWasSimulated != true) {
            let centerPosition = tile.editor.getCenterPosition();
            await tile.editor.updatePageSize();
            tile.editor.goToCenterPosition(centerPosition.x, centerPosition.y);
          }
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

    this.loadedTiles = loadTiles;

    // Configure Editor Viewports:
    this.setupEditors();

    this.shortSubVisibleChunks = visibleChunks;
    this.updateShortSubscribe();

    this.resized = false;
    this.lastResizeWasSimulated = false;

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
    this.parent.groupHolder.style.setProperty("--previewWidth", this.previewWidth + "px");
    this.parent.groupHolder.style.setProperty("--previewHeight", this.previewHeight + "px");
    this.parent.groupHolder.style.setProperty("--previewHeightRatio", this.tileHeightRatio);
    this.parent.groupHolder.style.setProperty("--previewScale", this.previewScale);

    this.groupHolderRect = this.parent.groupHolder.getBoundingClientRect();

    this.refreshTileSpots();
  }

  setupColumns(force) {
    this.pageOffsetWidth = this.parent.frame.offsetWidth;
    this.pageOffsetHeight = this.parent.frame.offsetHeight;

    this.containerWidth = this.parent.groupHolder.clientWidth;
    this.containerHeight = this.parent.groupHolder.clientHeight;

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

    let previewWidth = this.columnWidth - (this.tileInnerPadding * 2);
    let previewHeight = previewWidth * this.tileHeightRatio;
    if (previewHeight > 400) {
      previewHeight = 400;
    } else if (previewHeight < 200) {
      previewWidth *= (200 / previewHeight);
      previewHeight = 200;
    }
    this.previewWidth = Math.round(previewWidth);
    this.previewHeight = Math.round(previewHeight);

    this.previewScale = this.previewHeight / this.containerHeight;
    
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
      if ((tile.version == null || tile.version == (this.parent.parent.parent.parent.lesson.breakout ?? {}).version) && tile._id != "NEW_GROUP_CREATE") {
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