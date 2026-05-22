import { cleanString, clipBoardRead } from "@/crucial";

import setTitleIcon from "../../../icons/toolbar/settitle.svg?raw";

export class Tool {
  setActionButton(button) {
    if (button != null) {
      button.innerHTML = setTitleIcon;
    }

    let preference = this.toolbar.getPreferenceTool();
    let annoTx = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"] div[label][contenteditable]');
    if (annoTx == null) {
      this.button.removeAttribute("selecthighlight");
    } else {
      if (this.editor.utils.isLocked(preference) == true) {
        annoTx.removeAttribute("contenteditable");
      }
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Set Title";
  SUPPORTS_MULTIPLE_SELECT = false;
  FULL_CLICK = true;

  async js(frame, event) {
    if (this.button == null || this.button.hasAttribute("hidden") == true) {
      return;
    }

    let preference = this.toolbar.getPreferenceTool();
    if (this.editor.utils.isLocked(preference) == true) {
      return;
    }

    let annoElem = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[label]");
    if (annoTx == null) {
      return;
    }

    if (annoTx.hasAttribute("contenteditable") == false) {
      annoTx.style.display = "unset";
      annoTx.setAttribute("contenteditable", "true");

      this.editor.text.startTextSelection(annoTx, event);
    } else {
      if (annoTx.textContent.length < 1) {
        annoTx.style.removeProperty("display");
      }
      annoTx.scrollTo(0, 0);
      annoTx.removeAttribute("contenteditable");
    }

    this.toolbar.clearEventListeners();

    let finishListener = async () => {
      annoTx.scrollTo(0, 0);
      annoTx.removeAttribute("contenteditable");
      if (annoTx.textContent.length < 1) {
        annoTx.style.removeProperty("display");
      }
      this.editor.text.clearSelection();
      annoTx.textContent = annoTx.textContent.substring(0, 100);
      await this.toolbar.saveSelecting(() => { return { title: cleanString(annoTx.textContent) }; }, { refreshActionBar: false });
      this.setActionButton();
    };
    this.finish = finishListener;
    this.toolbar.addEventListener("blur", annoTx, finishListener);

    let keyListener = (event) => {
      if (event != null && ["Enter"].includes(event.key) == true) {
        event.preventDefault();
        finishListener();
      }
    }
    this.toolbar.addEventListener("keydown", annoTx, keyListener);

    this.toolbar.addEventListener("paste", annoTx, clipBoardRead);

    this.setActionButton();
  }
}