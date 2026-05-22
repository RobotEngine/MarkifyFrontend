import openLinkIcon from "../../../../icons/toolbar/openlink.svg?raw";

export class Tool {
  setActionButton(button) {
    button.innerHTML = openLinkIcon;

    if (this.toolbar.getPreferenceTool().d == null) {
      return false;
    }
  }

  TOOLTIP = "Open Link";
  SUPPORTS_MULTIPLE_SELECT = false;
  SHOW_ON_LOCK = true;
  FULL_CLICK = true;

  js = async () => {
    let preference = this.toolbar.getPreferenceTool();
    if (preference.d != null) {
      window.open(preference.d, "_blank");
    }
  }
}