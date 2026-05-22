import imageBorderIcon from "../../../icons/toolbar/imageborder.svg?raw";

export class Tool {
  setActionButton(button) {
    if (button != null) {
      button.innerHTML = imageBorderIcon;
    }
    if (this.toolbar.getPreferenceTool().border != false) {
      this.button.setAttribute("selecthighlight", "");
    } else {
      this.button.removeAttribute("selecthighlight");
    }
  }

  TOOLTIP = "Image Border";

  async js() {
    await this.toolbar.saveSelecting(() => { return { border: !(this.button.hasAttribute("selecthighlight")) }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}