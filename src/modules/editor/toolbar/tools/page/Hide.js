import hidePageIcon from "../../../icons/toolbar/hidepage.svg?raw";

export class Tool {
  setActionButton = async (button) => {
    if (button != null) {
      button.innerHTML = hidePageIcon;
    }
    if (this.toolbar.getPreferenceTool().hidden != true) {
      this.button.removeAttribute("selecthighlight");
      this.TOOLTIP = "Hide Page";
    } else {
      this.button.setAttribute("selecthighlight", "");
      this.TOOLTIP = "Reveal Page";
    }
    this.button.setAttribute("tooltip", this.TOOLTIP);
  }

  async js() {
    await this.toolbar.saveSelecting(() => { return { hidden: !(this.button.hasAttribute("selecthighlight")) }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}