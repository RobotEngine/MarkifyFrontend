import bulletListIcon from "../../../icons/toolbar/list/bullet.svg?raw";
import orderedListIcon from "../../../icons/toolbar/list/ordered.svg?raw";

export class Tool {
  setActionButton() {
    let preference = this.toolbar.getPreferenceTool();
    let quill = ((this.editor.annotations[preference._id] ?? {}).component ?? {}).quill;
    let list;
    if (quill != null) {
      let selection = quill.getSelection();
      if (selection != null) {
        list = quill.getFormat(selection.index, selection.length).list;
      } else {
        list = quill.getFormat(0, quill.getLength()).list;
      }
    }
    if (Array.isArray(list) == true) {
      list = list[0];
    }
    if (list == null || list == "false") {
      list = "bullet"
    }
    let buttonIcon = this.button.querySelector("div");
    if (buttonIcon != null && list != buttonIcon.getAttribute("list")) {
      if (list == "bullet") {
        buttonIcon.innerHTML = bulletListIcon;
      } else if (list == "ordered") {
        buttonIcon.innerHTML = orderedListIcon;
      }
    }
  }

  TOOLTIP = "Lists";
  SUPPORTS_MULTIPLE_SELECT = false;
  ATTRIBUTES = { hideformulamode: "" };

  html = `
  <div class="eSubToolListContainer eHorizontalToolsHolder" keeptooltip>
    <button class="eTool" tooltip="Bullet List" list="bullet" option><div>${bulletListIcon}</div></button>
    <button class="eTool" tooltip="Numbered List" list="ordered" option><div>${orderedListIcon}</div></button>
  </div>
  `;
  css = {
    ".eSubToolListContainer": `overflow: auto; border-radius: inherit`,
    ".eSubToolListContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolListContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolListContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
  async js(frame) {
    let listContainer = frame.querySelector(".eSubToolListContainer");
    let listButtons = listContainer.querySelectorAll(".eTool");

    let quill;
    let selectedL;
    this.redraw = (list) => {
      let preference = this.toolbar.getPreferenceTool();
      let annotation = this.editor.annotations[preference._id];
      if (annotation == null) {
        return;
      }
      quill = (annotation.component ?? {}).quill;
      if (quill == null) {
        return;
      }
      if (list == null) {
        let selection = quill.getSelection();
        if (selection != null) {
          selectedL = quill.getFormat(selection.index, selection.length).list;
        } else {
          selectedL = quill.getFormat(0, quill.getLength()).list;
        }
      } else {
        selectedL = list;
      }
      if (Array.isArray(selectedL) == true) {
        selectedL = selectedL[0];
      }
      
      let selectedButton = listContainer.querySelector(".eTool[selected]");
      if (selectedButton != null) {
        selectedButton.removeAttribute("selected");
      }
      if (selectedL != null) {
        let selectButton = listContainer.querySelector('.eTool[list="' + selectedL + '"]');
        if (selectButton != null) {
          selectButton.setAttribute("selected", "");
        }
      }
    }
    this.redraw();
    
    for (let i = 0; i < listButtons.length; i++) {
      let button = listButtons[i];
      let list = button.getAttribute("list");
      
      button.addEventListener("click", async () => {
        let selection = quill.getSelection();
        let source = "api";
        let enabled = quill.isEnabled();
        if (enabled == true) {
          source = "user";
        }
        let useList = list;
        if (button.hasAttribute("selected") == true) {
          useList = null;
        }
        if (selection != null && enabled == true) {
          quill.format("list", useList, source);
        } else {
          quill.formatText(0, quill.getLength(), "list", useList, source);
        }
        if (enabled == false) {
          await this.toolbar.saveSelecting(() => { return { d: quill.getContents().ops } }, { refreshActionBar: false });
        }
        this.redraw();
        this.setActionButton();
      });
    }
  }
}