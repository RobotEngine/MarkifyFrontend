import { ResizePlacement } from "../ResizePlacement";

export class Tool extends ResizePlacement {
  CAN_FLIP = false;
  MINIMUM_SIZE = 100;
  FLOAT_TO_HOVERED_LAYER = true;

  enable = () => {
    let toolPreference = this.toolbar.getToolPreference();
    this.PROPERTIES = {
      f: "page",
      c: toolPreference.color.selected,
      title: "Untitled Page",
      s: [200, 275],
      l: this.editor.minLayer - 1
    };
    if ((toolPreference.background ?? "blank") != "blank") {
      this.PROPERTIES.background = toolPreference.background;
    }
  }
}