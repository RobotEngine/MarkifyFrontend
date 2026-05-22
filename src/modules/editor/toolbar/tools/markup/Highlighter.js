import { Draw } from "../../Draw";

import highlighterCursor from "../../../icons/cursors/highlighter.svg?raw";

export class Tool extends Draw {
  FUNCTION = "markup";
  STRAITEN_CHECK = true;
  REALTIME_TOOL = 1;
  MOUSE = { type: "svg", svg: highlighterCursor, translate: { x: 15, y: 30 } };
}