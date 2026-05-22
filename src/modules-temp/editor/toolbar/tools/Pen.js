import { mouseDown, sleep } from "@/crucial";

import { Draw } from "../Draw";

import penCursor from "../../icons/cursors/pen.svg?raw";

export class Tool extends Draw {
  FUNCTION = "draw";
  REALTIME_TOOL = 2;
  MOUSE = { type: "svg", svg: penCursor, translate: { x: 15, y: 30 } };
}