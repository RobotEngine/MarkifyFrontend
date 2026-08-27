import editIcon from "../icons/edit.svg?raw";

export class Tool {
  setActionButton = async (button) => {
    if (button != null) {
      button.innerHTML = editIcon;
    }
    if (this.toolbar.getPreferenceTool().active != true) {
      return false;
    }
  }

  TOOLTIP = "Edit Poll";
  FULL_CLICK = true;
  SUPPORTS_MULTIPLE_SELECT = false;

  async js() {
    let preference = this.toolbar.getPreferenceTool();
    if (this.editor.utils.isLocked(preference) == true) {
      return;
    }

    let annotation = this.editor.annotations[preference._id];
    if (annotation == null) {
      return;
    }
    
    let element = (annotation.component ?? {}).element;
    if (element == null) {
      return;
    }

    let widget = element.querySelector(".eWidgetPoll");
    if (widget == null) {
      return;
    }

    widget.setAttribute("editing", "");

    await this.toolbar.saveSelecting(() => {
      return {
        active: false,
        s: [
          ((annotation.render ?? {}).s[0] ?? 0),
          widget.offsetHeight
        ]
      };
    }, { refreshActionBar: true });
  }
}