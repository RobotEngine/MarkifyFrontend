import { Placement } from "../../Placement";

export class Tool extends Placement {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="text/edit"]';

  enable = () => {
    let toolPreference = this.toolbar.getToolPreference();
    this.PROPERTIES = {
      f: "text",
      s: [0, 0],
      l: this.editor.maxLayer + 1,
      c: toolPreference.color.selected,
      o: toolPreference.opacity,
      d: [{ insert: "Example Text", attributes: { font: toolPreference.font, size: toolPreference.size + "px", align: toolPreference.align } }],
      remove: true,
      textfit: true
    };
  }
}