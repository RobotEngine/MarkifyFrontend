import rotatePageIcon from "../../../icons/toolbar/rotatepage.svg?raw";

export class Tool {
  setActionButton(button) {
    button.innerHTML = rotatePageIcon;
  }

  TOOLTIP = "Rotate";
  ADD_DIVIDE_AFTER = true;

  async js() {
    await this.toolbar.saveSelecting((render) => {
      let setRotate = render.r ?? 0;
      setRotate -= 90;
      if (setRotate < 0) {
        setRotate = 360 + setRotate;
      }
      if (setRotate >= 360) {
        setRotate = setRotate - 360;
      }
      return { r: setRotate };
    }, { reuseActionBar: true });
  }
}