import { Placement } from "../Placement";

export class Tool extends Placement {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="text/edit"]';

  enable = () => {
    let toolPreference = this.toolbar.getToolPreference();
    this.PROPERTIES = {
      f: "sticky",
      s: [220, 220],
      c: toolPreference.color.selected,
      l: this.editor.maxLayer + 1,
      d: [{ attributes: { font: toolPreference.font, size: toolPreference.size + "px", align: toolPreference.align } }],
      sig: this.editor.self.name
    };
  }
}