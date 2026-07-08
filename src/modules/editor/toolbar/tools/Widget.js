

export class Frame {
  html = `<div class="eToolWidgetContainer customScroll" closetooltip></div>`;
  css = {
    ".eToolWidgetContainer": `box-sizing: border-box; width: min(400px, var(--maxWidth)); height: var(--maxHeight); padding: 12px; overflow: auto`,
  };
  js(frame) {

  }
}