import {
  head,
  body,
  app,
  PageFrame,
  fixed,
  favicon,

  userID,
  account,

  changeGlobalImports,
  mouseDown,
  appendCSS,
  setPage,
  setFrame,
  sleep,
  getParam,
  modifyParams,
  getEpoch,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  getObject,
  copyObject,
  objectUpdate,
  getTheme
} from "@/crucial";

import { Editor } from "@modules/editor/Editor";
import { REALTIME } from "@modules/editor/imports";

export class MasonryLayout {
  minTileWidth = 260;
  maxTileWidth = 450;
  tilePadding = 16;
  maxContainerWidth = 2000; //(this.layout.minTileWidth * 6) + (this.layout.tilePadding * 5) - 1;
  previewScale = 1;
  tileBaseHeight = 12; // Base padding around tile
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
  pendingEditors = [];
  loadingAnnotations = {};
  longSubscribedGroups = [];
  maxLongSubscribedGroups = 100;
  shortSubVisibleChunks = {};
}