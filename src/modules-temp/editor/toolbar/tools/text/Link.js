import { sleep, isValidURL } from "@/crucial";

import linkIcon from "../../../icons/toolbar/link.svg?raw";
import { trash } from "@modules/utility/core-icons";

export class Tool {
  setActionButton(button) {
    button.innerHTML = linkIcon;
  }

  TOOLTIP = "Link";
  SUPPORTS_MULTIPLE_SELECT = false;
  ATTRIBUTES = { hideformulamode: "" };

  html = `
  <div class="eSubToolLinkContainer">
    <input placeholder="Enter Your URL" title="Type or paste a website URL to hyperlink." spellcheck="false"></input>
    <button title="Remove this hyperlink."><div image>${trash}</div></button>
  </div>
  `;
  css = {
    ".eSubToolLinkContainer": `display: flex; width: 250px; max-width: 100%; padding: 4px; gap: 4px`,
    ".eSubToolLinkContainer input": `width: 100%; height: 24px; padding: 4px 6px; border: solid 3px var(--hover); outline: unset; border-radius: 8px; padding: 2px 6px; background: var(--pageColor); color: var(--theme); font-size: 14px; font-weight: 600; font-family: var(--font); user-select: all`,
    ".eSubToolLinkContainer button": `display: none; width: 34px; height: 34px; background: var(--error); color: #fff; border-radius: 8px; justify-content: center; align-items: center`,
    ".eSubToolLinkContainer button div[image]": `--themeColor: #fff; width: 24px; height: 24px`,
    ".eSubToolLinkContainer button div[image] svg": `width: 24px; height: 24px`
  };
  async js(frame) {
    let linkContainer = frame.querySelector(".eSubToolLinkContainer");
    let linkInput = linkContainer.querySelector("input");
    let removeButton = linkContainer.querySelector("button");

    let quill;
    let selectedLink;
    let lastSelection;
    this.redraw = (link) => {
      let preference = this.toolbar.getPreferenceTool();
      let annotation = this.editor.annotations[preference._id];
      if (annotation == null) {
        return;
      }
      quill = (annotation.component ?? {}).quill;
      if (quill == null) {
        return;
      }
      if (link == null) {
        let selection = quill.getSelection();
        if (selection != null) {
          lastSelection = selection;
          selectedLink = quill.getFormat(selection.index, selection.length).link;
        } else {
          selectedLink = quill.getFormat(0, quill.getLength()).link;
        }
      } else {
        if (link != false) {
          selectedLink = link;
        } else {
          selectedLink = null;
        }
      }
      if (Array.isArray(selectedLink) == true) {
        selectedLink = null;
      }
      
      if (document.activeElement != linkInput || link != null) {
        if (selectedLink != null) {
          linkInput.value = selectedLink;
          removeButton.style.display = "flex";
        } else {
          linkInput.value = "";
          removeButton.style.removeProperty("display");
        }
      }
    }
    this.redraw();

    let originalValue;
    linkInput.addEventListener("focus", () => {
      originalValue = linkInput.value;
    });
    let finish = async () => {
      let value = linkInput.value;
      if (value == originalValue) {
        return;
      }
      if (value.length > 0 && value.startsWith("http://") == false && value.startsWith("https://") == false) {
        value = "https://" + value;
      }
      if (isValidURL(value) == false) {
        if (value.length < 1) {
          value = false;
        } else {
          return;
        }
      }
      if (lastSelection != null && lastSelection.length < 1) {
        let text = quill.getText();
        let startIndex = Math.max(text.lastIndexOf(" ", lastSelection.index - 1), text.lastIndexOf("\n", lastSelection.index - 1)) + 1;
        if (startIndex < 0) {
          startIndex = 0;
        }
        let endIndex = Math.min(text.indexOf(" ", lastSelection.index), text.indexOf("\n", lastSelection.index));
        if (endIndex < 0) {
          endIndex = text.length;
        }
        lastSelection = { index: startIndex, length: endIndex - startIndex };
      }
      let selection = lastSelection ?? quill.getSelection();
      let source = "api";
      let enabled = quill.isEnabled();
      if (enabled == true) {
        source = "user";
      }
      if (selection != null && enabled == true) {
        quill.formatText(selection.index, selection.length, "link", value, source);
      } else {
        quill.formatText(0, quill.getLength(), "link", value, source);
      }
      if (lastSelection != null) {
        quill.setSelection(lastSelection);
      }
      if (enabled == false) {
        await this.toolbar.saveSelecting(() => { return { d: quill.getContents().ops } }, { refreshActionBar: false });
      }
      this.redraw(value);
    }
    linkInput.addEventListener("blur", finish);
    linkInput.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        linkInput.blur();
      }
    });

    if (quill != null && selectedLink == null) {
      let text = "";
      if (lastSelection != null) {
        text = quill.getText(lastSelection.index, lastSelection.length);
      } else {
        text = quill.getText(0, quill.getLength());
      }
      if (isValidURL(text) == true) {
        linkInput.value = text;
      }
    }

    removeButton.addEventListener("click", () => {
      linkInput.value = "";
      finish();
    });
    
    (async () => {
      await sleep(1);
      linkInput.focus();
    })();
  }
}