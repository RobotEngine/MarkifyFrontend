import { sendRequest } from "@/crucial";

import resetIcon from "../../../../icons/toolbar/reset.svg?raw";

export class Tool {
  setActionButton = async (button) => {
    if (button != null) {
      button.innerHTML = resetIcon;
    }
  }

  TOOLTIP = "Reset";
  SUPPORTS_MULTIPLE_SELECT = false;

  async js() {
    this.button.setAttribute("disabled", "");
    await sendRequest("DELETE", "lessons/widgets/poll/reset?widget=" + this.toolbar.getPreferenceTool()._id, null, { session: this.editor.session });
    this.button.removeAttribute("disabled");
  }
}