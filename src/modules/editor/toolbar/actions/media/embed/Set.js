import { sleep, isValidURL, connected } from "@/crucial";

import setEmbedIcon from "../../../../icons/toolbar/setembed.svg?raw";

export class Tool {
  ID = "media/embed/set";
  
  setActionButton(button) {
    if (button != null) {
      button.innerHTML = setEmbedIcon;
    }

    let preference = this.toolbar.getPreferenceTool();
    let inputText = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"] input');
    if (document.activeElement != inputText) {
      this.button.removeAttribute("selecthighlight");
    } else {
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Set Link";
  SUPPORTS_MULTIPLE_SELECT = false;
  FULL_CLICK = true;

  async js() {
    if (this.button == null || this.button.hasAttribute("hidden") == true) {
      return;
    }

    let preference;
    this.redraw = () => {
      preference = this.toolbar.getPreferenceTool();
    }
    this.redraw();
    if (this.editor.utils.isLocked(preference) == true) {
      return;
    }

    let annoElem = this.editor.page.querySelector('.eAnnotation[anno="' + preference._id + '"]');
    if (annoElem == null) {
      return;
    }
    let detailsHolder = annoElem.querySelector("div[details]");
    if (detailsHolder == null) {
      return;
    }

    let linkInputHolder = detailsHolder.querySelector("div[input]");
    let infoHolder = detailsHolder.querySelector("div[info]");

    if (linkInputHolder.hasAttribute("visible") == true && preference.embed != null && preference.d != null) {
      linkInputHolder.removeAttribute("visible");
      infoHolder.style.removeProperty("display");
      return;
    }

    linkInputHolder.removeAttribute("disabled");

    let annoTx = linkInputHolder.querySelector("input");
    if (annoTx.parentElement.hasAttribute("disabled") == true) {
      return;
    }

    if (document.activeElement != annoTx) {
      linkInputHolder.setAttribute("visible", "");
      infoHolder.style.display = "none";
      await sleep(1);
      annoTx.select();
    }

    let updateEmbedSize = () => {
      let embedFrame = annoElem.querySelector("iframe");
      if (embedFrame != null) {
        let frameWidth = preference.s[0] - 16;
        let defaultMaxWidth = 800;
        if (frameWidth < 300) {
          defaultMaxWidth = 300;
        }
        let embedWidth = Math.max(frameWidth, defaultMaxWidth);
        let scale = frameWidth / embedWidth;
        embedFrame.style.width = embedWidth + "px";
        embedFrame.style.height = ((preference.s[1] - 24 - detailsHolder.offsetHeight) * (1 / scale)) + "px";
        embedFrame.style.transform = "scale(" + scale + ")";
      }
    }

    this.toolbar.clearEventListeners();

    let lastText = annoTx.value;
    let finishListener = async () => {
      if (lastText == annoTx.value) {
        return;
      }
      lastText = annoTx.value;
      annoTx.blur();
      if (annoTx.value.startsWith("http://") == false && annoTx.value.startsWith("https://") == false) {
        annoTx.value = "https://" + annoTx.value;
      }
      if (isValidURL(annoTx.value) == false) {
        annoTx.value = lastText;
        annoTx.select();
        return this.editor.openAlert("error", "<b>Invalid Link</b>That link is invalid, check it and try again.");
      }
      await this.toolbar.saveSelecting(() => { return { d: annoTx.value, embed: null }; }, { reuseActionBar: false, redrawActionBar: true });
      if (connected == true) {
        linkInputHolder.setAttribute("disabled", "");
        this.editor.save.syncSave(true);
      }
    }
    this.finish = finishListener;
    this.toolbar.addEventListener("change", annoTx, finishListener);

    let unselectListener = async () => {
      if (preference.embed != null) {
        annoTx.blur();
        linkInputHolder.removeAttribute("visible");
        infoHolder.style.removeProperty("display");
        await sleep(1);
      }
      this.setActionButton();
      updateEmbedSize();
    }
    this.toolbar.addEventListener("blur", annoTx, unselectListener);
    
    let selectListener = () => {
      this.setActionButton();
    }
    this.toolbar.addEventListener("focus", annoTx, selectListener);

    this.setActionButton();
  }
}