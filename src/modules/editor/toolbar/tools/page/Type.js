import pageTypeIcon from "../../../icons/toolbar/pagetype.svg?raw";

export class Tool {
  setActionButton(button) {
    button.innerHTML = pageTypeIcon;
  }

  TOOLTIP = "Type";

  html = `
    <div class="eSubToolPageTypeHolder">
      <button class="border eTypeBlank" type="blank"><div class="eSubToolTypeTitle">Blank</div></button>
      <button class="border eTypeLined" type="line"><div class="eSubToolTypeTitle">Lined</div></button>
      <button class="border eTypeGrid" type="grid"><div class="eSubToolTypeTitle">Grid</div></button>
    </div>
  `;
  css = {
    ".eSubToolPageTypeHolder": `box-sizing: border-box; max-width: 100%; padding: 6px; display: flex; flex-wrap: nowrap; width: 336px; max-width: 100%; justify-content: center`,
    ".eSubToolPageTypeHolder button": `box-sizing: border-box; display: flex; flex-direction: row; width: 100px; height: 96px; padding: 6px; margin: 6px; justify-content: center; align-items: center; --borderWidth: 4px; --borderRadius: 12px; background-size: cover; background-position: center`,
    ".eSubToolPageTypeHolder button .eSubToolTypeTitle": `color: var(--theme); font-size: 18px; font-weight: 600; border-radius: 6px; padding: 2px 6px; margin-bottom: 2px`,
    ".eSubToolPageTypeHolder button:hover": `--borderColor: var(--hover)`,
    ".eSubToolPageTypeHolder button[selected]": `--borderColor: var(--theme); background: var(--hover)`,
    ".eTypeBlank": `background: #fff;`,
    ".eTypeLined": `background: repeating-linear-gradient(to bottom, #fff, #fff 10px, #e0e0e0 11px, #fff 12px)`,
    ".eTypeGrid": `background: 
      repeating-linear-gradient(to bottom, transparent, transparent 10px, #e0e0e0 11px, transparent 12px),
      repeating-linear-gradient(to right, #fff, #fff 10px, #e0e0e0 11px, #fff 12px)`
  }
  async js(frame) {
    let buttonHolder = frame.querySelector(".eSubToolPageTypeHolder");
    let buttons = buttonHolder.querySelectorAll("button[type]");

    this.redraw = () => {
      // Put the code that updates which button is selected here:
      let preference = this.toolbar.getPreferenceTool();
      let currentType = preference.background ?? "blank";
      if (preference.source != null && preference.number != null) {
        currentType = "blank";
      }
      buttons.forEach(btn => {
        btn.removeAttribute("selected");
        if (btn.getAttribute("type") === currentType) btn.setAttribute("selected", "");
      });
    }
    this.redraw();

    buttonHolder.addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let btn = target.closest("button");
      if (btn == null) {
        return;
      }
      let selectedType = btn.getAttribute("type");
      this.toolbar.setToolPreference("background", selectedType);
      await this.toolbar.saveSelecting((render) => {
        let updates = { background: selectedType };
        if (render.source) {
          updates.source = null;
          updates.number = null;
        }
        return updates;
      }, { reuseActionBar: true });
      this.redraw();
    });
  }
}