import { Placement } from "../Placement";

class WidgetTool extends Placement {
  enable(extra) {
    console.log(extra.widget);

    let toolPreference = this.toolbar.getToolPreference();
    this.PROPERTIES = {
      f: "sticky",
      s: [220, 220],
      l: this.editor.maxLayer + 1,
      d: "alignment"
    };
  }
}

export class Frame {
  html = `<div class="eToolWidgetContainer customScroll" closetooltip>
    <div class="eToolWidgetSection">
      <button class="eToolWidgetTile" widget="poll">
        <div class="eToolWidgetTilePreview"></div>
        <div class="eToolWidgetTileInfo">
          <div class="eToolWidgetTileTitle">Poll</div>
        </div>
      </button>
      <button class="eToolWidgetTile" widget="timer">
        <div class="eToolWidgetTilePreview"></div>
        <div class="eToolWidgetTileInfo">
          <div class="eToolWidgetTileTitle">Timer</div>
        </div>
      </button>
      <button class="eToolWidgetTile" widget="spinner">
        <div class="eToolWidgetTilePreview"></div>
        <div class="eToolWidgetTileInfo">
          <div class="eToolWidgetTileTitle">Spinner</div>
        </div>
      </button>
      <button class="eToolWidgetTile" widget="alignment">
        <div class="eToolWidgetTilePreview"></div>
        <div class="eToolWidgetTileInfo">
          <div class="eToolWidgetTileTitle">Alignment</div>
        </div>
      </button>
    </div>
  </div>`;

  css = {
    ".eToolWidgetContainer": `box-sizing: border-box; width: min(460px, var(--maxWidth)); max-height: var(--maxHeight); padding: 12px; overflow: auto`,
    ".eToolWidgetSection": `position: relative; display: grid; width: 100%; grid-gap: 12px; grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr))`,
    ".eToolWidgetTile": `position: relative; display: flex; flex-direction: column; padding: 4px; --hoverSize: 0px; --shadowOpacity: 0; aspect-ratio: 4/3; border-radius: calc(8px + var(--hoverSize)); text-decoration: none; outline-offset: 4px`,
    ".eToolWidgetTile:hover, .eToolWidgetTile:focus-within": `--hoverSize: 4px; --shadowOpacity: .5`,
    ".eToolWidgetTile:before": `content: ""; position: absolute; width: calc(100% + (var(--hoverSize) * 2)); height: calc(100% + (var(--hoverSize) * 2)); left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), var(--shadowOpacity)); border-radius: calc(12px + var(--hoverSize)); z-index: 1; transition: .2s`,
    ".eToolWidgetTilePreview": `position: relative; box-sizing: border-box; display: flex; gap: 6px; flex: 1; width: 100%; z-index: 2; background: var(--hover); border-radius: 8px; overflow: hidden; pointer-events: none`,
    ".eToolWidgetTilePreview:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: inset 0px 0px 4px 0px rgba(var(--themeRGB), .5); z-index: 2`,
    ".eToolWidgetTileInfo": `display: flex; box-sizing: border-box; width: 100%; padding: 4px; margin-top: 4px; z-index: 2`,
    ".eToolWidgetTileTitle": `box-sizing: border-box; width: 100%; font-size: 16px; font-weight: 600; text-align: left`
  };

  js(frame) {
    frame.addEventListener("click", (event) => {
      let button = event.target.closest(".eToolWidgetTile");
      if (button == null) {
        return;
      }
      let widget = button.getAttribute("widget");
      if (widget != null) {
        this.toolbar.activateTool(WidgetTool, { widget });
      }
      this.toolbar.toolbar.closeSub(true);
    });
  }
}