import { objectEqual } from "@/crucial";

export class Widget {
  WIDTH = 600;
  //HEIGHT = 214;

  OPTIONS = {
    SHOW_ONLY_WIDTH_HANDLES: true,
    AUTO_SET_HEIGHT: true
  };

  quills = {};

  html = `<div class="eWidgetAlignment" edit>
    <div class="eWidgetAlignmentHeader">
      <div class="eWidgetAlignmentTitle"></div>
      <div class="eWidgetAlignmentVotes"><b>0</b> votes</div>
    </div>
    <div class="eWidgetAlignmentBar" noselect>
      <div class="eWidgetAlignmentBarGradientHolder">
        <div class="eWidgetAlignmentBarGradient"></div>
        <div class="eWidgetAlignmentBarScale"><div start></div><div middle></div><div end></div></div>
      </div>
      <div class="eWidgetAlignmentBarMarkerHolder"></div>
    </div>
    <div class="eWidgetAlignmentLabels">
      <div class="eWidgetAlignmentLabel" left></div>
      <div class="eWidgetAlignmentLabel" center></div>
      <div class="eWidgetAlignmentLabel" right></div>
    </div>
  </div>`;
  css = {
    ".eWidgetAlignment": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: var(--borderRadius); pointer-events: all !important; justify-content: center; align-items: center; transition: .4s`,
    ".eWidget:not([selected]) .eWidgetAlignment": `border-radius: 16px !important`,
    ".eWidget:not([selected]) .ql-container": `pointer-events: none !important`,
    ".eWidgetAlignment .ql-container": `position: relative; font-family: var(--font) !important`,
    ".eWidgetAlignment .ql-container:before": `content: ""; position: absolute; width: 100%; height: 100%; padding: 4px; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--hover); opacity: 0; border-radius: 2px; transition: .4s; z-index: 1`,
    ".eWidgetAlignment .ql-container:focus-within:before": `opacity: .4; border-radius: 8px`,
    ".eWidgetAlignment .ql-editor": `position: relative; z-index: 2; font-family: var(--font); font-size: inherit; line-height: inherit; text-align: inherit`,
    ".eWidgetAlignmentHeader": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 8px; padding: 8px; width: 100%; justify-content: center; align-items: flex-start`,
    ".eWidgetAlignmentTitle": `flex: 1 1 300px; min-height; 24px; margin: auto 0; font-size: 18px !important; font-weight: 600 !important; text-align: left !important`,
    ".eWidgetAlignmentVotes": `padding: 4px 8px; margin-left: auto; background: var(--pageColor); box-shadow: inset var(--lightShadow); color: var(--theme); border-radius: 14px; font-size: 13px; font-weight: 500`,
    ".eWidgetAlignmentBar": `position: relative; box-sizing: border-box; width: 100%; height: 132px; padding: 8px; box-shadow: inset var(--lightShadow); border-radius: 16px; overflow: hidden; cursor: pointer`,
    ".eWidgetAlignmentBarGradientHolder": `--gradient: linear-gradient(90deg, var(--red), var(--yellow), var(--green)); position: relative; width: 100%; height: 100%; z-index: 1; pointer-events: none`,
    ".eWidgetAlignmentBarGradient": `position: absolute; width: 100%; height: 100%; left: 0; top: 0; background: var(--gradient); opacity: .2; border-radius: 8px; z-index: 1`,
    ".eWidgetAlignmentBarScale": `position: absolute; width: calc(100% - 82px); height: 8px; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--gradient); border-radius: 4px; z-index: 2`,
    ".eWidgetAlignmentBarScale div": `position: absolute; width: 8px; height: 40px; top: 50%; transform: translate(-50%, -50%); border-radius: 4px`,
    ".eWidgetAlignmentBarScale div[start]": `left: 0; background: var(--red)`,
    ".eWidgetAlignmentBarScale div[middle]": `left: 50%; background: var(--yellow)`,
    ".eWidgetAlignmentBarScale div[end]": `left: 100%; background: var(--green)`,
    ".eWidgetAlignmentBarMarkerHolder": `position: absolute; width: 100%; height: 100%; left: 0; top: 0; z-index: 2`,
    ".eWidgetAlignmentBarMarker": `--scale: 0; position: absolute; width: 32px; height: 32px; padding: 0; transform: translate(-50%, -50%) scale(var(--scale)); background: var(--pageColor); border: solid 3px var(--theme); border-radius: 16px; overflow: hidden; transition: .4s`,
    ".eWidgetAlignmentBarMarker img": `width: 100%; height: 100%; object-fit: cover`,
    ".eWidgetAlignmentLabels": `box-sizing: border-box; display: flex; gap: 8px; width: 100%; padding: 8px 8px 0 8px`,
    ".eWidgetAlignmentLabel": `flex: 1; min-height: 18px; font-size: 14px !important; font-weight: 600 !important`,
    ".eWidgetAlignmentLabel[left]": `text-align: left !important`,
    ".eWidgetAlignmentLabel[center]": `text-align: center !important`,
    ".eWidgetAlignmentLabel[right]": `text-align: right !important`
  };

  async setupQuill(label, id, placeholder) {
    let quill = new (await this.editor.text.getQuill())(label, {
      formats: ["bold", "italic", "underline", "strike"],
      placeholder
    });
    quill.on("text-change", () => {
      let save = {
        _id: this.parent.properties._id,
        s: [this.parent.properties.s[0], this.widget.offsetHeight]
      };
      save[id] = quill.getContents().ops;
      this.editor.saveAnnotation(save);
    });
    quill.on("selection-change", (range) => {
      if (range == null) { // Unfocus
        this.setQuillContent(id, this.parent.properties[id], true);
      }
    });
    this.quills[id] = { quill, label };
  }
  setQuillContent(id, content, force) {
    if (content == null) {
      return;
    }
    let quillCache = this.quills[id];
    if (quillCache == null) {
      return;
    }
    if (quillCache.quill.hasFocus() == true && force != true) {
      return;
    }
    let setContent = this.editor.text.uncleanQuill(content);
    if (objectEqual(setContent, quillCache.lastContent) == false || force == true) {
      quillCache.lastContent = setContent;
      quillCache.quill.setContents(setContent, "silent");
    }
  }

  updateInteractivity() {
    if (this.editor.utils.canMemberModify(this.parent.properties) == false || this.editor.utils.isLocked(this.parent.properties) == true) {
      this.title.style.pointerEvents = "none";
      this.labelHolder.style.pointerEvents = "none";
    } else {
      this.title.style.removeProperty("pointer-events");
      this.labelHolder.style.removeProperty("pointer-events");
    }
  }

  async js(frame) {
    this.widget = frame.querySelector(".eWidgetAlignment");
    this.title = this.widget.querySelector(".eWidgetAlignmentTitle");
    this.labelHolder = this.widget.querySelector(".eWidgetAlignmentLabels");
    this.leftLabel = this.labelHolder.querySelector(".eWidgetAlignmentLabel[left]");
    this.centerlabel = this.labelHolder.querySelector(".eWidgetAlignmentLabel[center]");
    this.rightLabel = this.labelHolder.querySelector(".eWidgetAlignmentLabel[right]");

    if (this.preview == true) {
      return;
    }

    await this.setupQuill(this.title, "title", "Write a Title...");
    await this.setupQuill(this.leftLabel, "leftlabel");
    await this.setupQuill(this.centerlabel, "centerlabel");
    await this.setupQuill(this.rightLabel, "rightlabel");

    this.parent.subscribe("click_move", (data) => {
      
    });

    this.parent.subscribe("update", (data) => {
      if (this.editor.self._id == data._id && data.hasOwnProperty("access") == true) {
        this.updateInteractivity();
      }
    });
    this.parent.subscribe("set", (data) => {
      if (data.hasOwnProperty("settings") == true) {
        this.updateInteractivity();
      }
    });
    this.updateInteractivity();
  }

  render() {
    this.setQuillContent("title", this.parent.properties.title ?? [ { insert: "Do you understand this concept?" } ]);
    this.setQuillContent("leftlabel", this.parent.properties.leftlabel ?? [ { insert: "No, not yet!" } ]);
    this.setQuillContent("centerlabel", this.parent.properties.centerlabel ?? [ { insert: "I'm getting it..." } ]);
    this.setQuillContent("rightlabel", this.parent.properties.rightlabel ?? [ { insert: "I've got it!" } ]);

    this.updateInteractivity();
  }

  renderPreview() {
    this.title.textContent = "Do you understand this concept?";
    this.leftLabel.textContent = "No, not yet!";
    this.centerlabel.textContent = "I'm getting it...";
    this.rightLabel.textContent = "I've got it!";
    this.HEIGHT = this.widget.offsetHeight;
  }
}