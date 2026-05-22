import { LockingDropdown } from "./More";

import lockIcon from "../../icons/toolbar/lock.svg?raw";

export class Tool extends LockingDropdown {
  setActionButton(button) {
    button.innerHTML = lockIcon;

    let showLock = false;
    let selectKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let render = ({ ...((this.editor.annotations[selectID] ?? {}).render ?? {}), ...(this.editor.selecting[selectID] ?? {}) }) ?? {};
      let locks = this.editor.utils.getLocked(render);
      if (locks.includes("s") == true || locks.includes("p") == true) {
        showLock = true;
      } else if (locks.includes("c") == true && this.editor.utils.canMemberModify(render) == false) {
        showLock = true;
      }
    }

    if (showLock == false && this.button.hasAttribute("selected") == true) {
      this.toolbar.selection.closeActionFrame();
    }
    return showLock;
  }

  TOOLTIP = "Locking";
  SHOW_ON_LOCK = true;
  ADD_DIVIDE_BEFORE = true;
}