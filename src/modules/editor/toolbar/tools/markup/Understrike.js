import { Draw } from "../../Draw";

import { round } from "../../../math";

import highlighterCursor from "../../../icons/cursors/highlighter.svg?raw";

export class Tool extends Draw {
  FORCE_LINE = true;
  HORIZONTAL_CHECK = true;
  REALTIME_TOOL = 1;
  MOUSE = { type: "svg", svg: highlighterCursor, translate: { x: 15, y: 30 } };

  /*enable = () => {
    let toolPreference = this.toolbar.getToolPreference();
    this.MOUSE.color = toolPreference.color.selected;
    this.MOUSE.opacity = this.OPACITY;
    this.PUBLISH.c = toolPreference.color.selected;
    this.PUBLISH.o = toolPreference.opacity;
  }*/
}