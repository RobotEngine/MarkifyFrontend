import anonymousIcon from "../icons/anonymous.svg?raw";

export class Tool {
  setActionButton = async (button) => {
    if (button != null) {
      button.innerHTML = anonymousIcon;
    }
    if (this.toolbar.getPreferenceTool().anonymous != true) {
      this.button.removeAttribute("selecthighlight");
      this.TOOLTIP = "Anonymize";
    } else {
      this.button.setAttribute("selecthighlight", "");
      this.TOOLTIP = "Deanonymize";
    }
    this.button.setAttribute("tooltip", this.TOOLTIP);
  }

  async js() {
    await this.toolbar.saveSelecting(() => { return { anonymous: !(this.button.hasAttribute("selecthighlight")) }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}