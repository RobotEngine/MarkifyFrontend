import { Tool as PenTool } from "../Pen";

import highlighterCursor from "@assets/editor/cursors/highlighter.svg?raw";

export class Tool extends PenTool {
  FUNCTION = "markup";
  STRAITEN_CHECK = true;
  REALTIME_TOOL = 1;
  MOUSE = { type: "svg", svg: highlighterCursor, translate: { x: 15, y: 30 } };
}