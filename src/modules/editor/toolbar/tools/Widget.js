

export class Frame {
  html = `<div class="eToolWidgetContainer" closetooltip>Widgets will go here...</div>`;
  css = {
    ".eToolWidgetContainer": `box-sizing: border-box; width: min(400px, var(--maxWidth)); height: 1000px; padding: 12px`
  };
  js(frame) {
    this.toolbar.tooltip.close();
  }
}