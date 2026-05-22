import { ResizePlacement } from "../../ResizePlacement";

export class Tool extends ResizePlacement {
  MINIMUM_SIZE = 25;
  DEFAULT_WIDTH = 125;
  DEFAULT_HEIGHT = 125;
  
  enable = () => {
    let toolPreference = this.toolbar.getToolPreference();
    this.PROPERTIES = {
      f: "shape",
      s: [this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT],
      c: toolPreference.color.selected,
      t: toolPreference.thickness,
      o: toolPreference.opacity,
      l: this.editor.maxLayer + 1,
      d: this.tool
    };
  }
}