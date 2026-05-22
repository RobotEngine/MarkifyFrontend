import trashIcon from "../../icons/toolbar/delete.svg?raw";

export class Tool {
  setActionButton(button) {
    this.button.style.setProperty("--hoverColor", "var(--error");
    this.button.style.setProperty("--hoverTooltip", "var(--error");
    
    button.innerHTML = trashIcon;

    let selectKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let render = ({ ...((this.editor.annotations[selectID] ?? {}).render ?? {}), ...(this.editor.selecting[selectID] ?? {}) }) ?? {};
      if (this.editor.utils.isPlaceholderLocked(render) == true) {
        return false;
      }
    }
  }

  TOOLTIP = "Delete";
  ADD_DIVIDE_BEFORE = true;
  FULL_CLICK = true;

  async js() {
    await this.toolbar.saveSelecting(() => { return { remove: true }; });
  }
}