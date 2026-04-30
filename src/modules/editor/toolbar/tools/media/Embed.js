import { Placement } from "../../Placement";

export class Tool extends Placement {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="editor/toolbar/setembed"]';
  
  enable = (extra) => {
    this.PROPERTIES = {
      f: "embed",
      s: [400, 350],
      l: this.editor.maxLayer + 1
    };
    if (extra != null && extra.link != null) {
      this.link = extra.link;
      this.FORCE_SAVE = true;
    }
    if (this.link != null) {
      this.PROPERTIES.d = this.link;
    }
  }
}