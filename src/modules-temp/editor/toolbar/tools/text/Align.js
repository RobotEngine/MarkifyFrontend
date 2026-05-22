import leftAlignIcon from "../../../icons/toolbar/textalign/left.svg?raw";
import centerAlignIcon from "../../../icons/toolbar/textalign/center.svg?raw";
import rightAlignIcon from "../../../icons/toolbar/textalign/right.svg?raw";

export class Tool {
  setActionButton() {
    let preference = this.toolbar.getPreferenceTool();
    let quill = ((this.editor.annotations[preference._id] ?? {}).component ?? {}).quill;
    let align;
    if (quill != null) {
      let selection = quill.getSelection();
      if (selection != null) {
        align = quill.getFormat(selection.index, selection.length).align;
      } else {
        align = quill.getFormat(0, quill.getLength()).align;
      }
    }
    if (Array.isArray(align) == true) {
      align = align[0];
    }
    align = align ?? "left";
    let buttonIcon = this.button.querySelector("div");
    if (buttonIcon != null && align != buttonIcon.getAttribute("align")) {
      buttonIcon.setAttribute("align", align);
      if (align == "left") {
        buttonIcon.innerHTML = leftAlignIcon;
      } else if (align == "center") {
        buttonIcon.innerHTML = centerAlignIcon;
      } else if (align == "right") {
        buttonIcon.innerHTML = rightAlignIcon;
      }
    }
  }

  TOOLTIP = "Align";
  SUPPORTS_MULTIPLE_SELECT = false;
  ATTRIBUTES = { hideformulamode: "" };

  html = `
  <div class="eSubToolTextAlignContainer eHorizontalToolsHolder" keeptooltip>
    <button class="eTool" tooltip="Left Align" left option><div>${leftAlignIcon}</div></button>
    <button class="eTool" tooltip="Center Align" center option><div>${centerAlignIcon}</div></button>
    <button class="eTool" tooltip="Right Align" right option><div>${rightAlignIcon}</div></button>
  </div>
  `;
  css = {
    ".eSubToolTextAlignContainer": `overflow: auto; border-radius: inherit`,
    ".eSubToolTextAlignContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
  async js(frame) {
    let leftAlign = frame.querySelector(".eTool[left]");
    let centerAlign = frame.querySelector(".eTool[center]");
    let rightAlign = frame.querySelector(".eTool[right]");

    let quill;
    let selectedAl;
    this.redraw = (align) => {
      let preference = this.toolbar.getPreferenceTool();
      let annotation = this.editor.annotations[preference._id];
      if (annotation == null) {
        return;
      }
      quill = (annotation.component ?? {}).quill;
      if (quill == null) {
        return;
      }
      if (align == null) {
        let selection = quill.getSelection();
        if (selection != null) {
          selectedAl = quill.getFormat(selection.index, selection.length).align;
        } else {
          selectedAl = quill.getFormat(0, quill.getLength()).align;
        }
      } else {
        selectedAl = align;
      }
      if (Array.isArray(selectedAl) == true) {
        selectedAl = selectedAl[0];
      }
      selectedAl = selectedAl ?? "left";

      leftAlign.removeAttribute("selected");
      centerAlign.removeAttribute("selected");
      rightAlign.removeAttribute("selected");

      if (selectedAl == "left") {
        leftAlign.setAttribute("selected", "");
      } else if (selectedAl == "center") {
        centerAlign.setAttribute("selected", "");
      } else if (selectedAl == "right") {
        rightAlign.setAttribute("selected", "");
      }
    }
    this.redraw();

    let saveAlign = async (align) => {
      let selection = quill.getSelection();
      let source = "api";
      let enabled = quill.isEnabled();
      if (enabled == true) {
        source = "user";
      }
      if (selection != null && enabled == true) {
        quill.format("align", align, source);
      } else {
        quill.formatLine(0, quill.getLength(), "align", align, source);
      }
      if (enabled == false) {
        if (selection == null || selection.length > 0) {
          await this.toolbar.saveSelecting(() => { return { d: quill.getContents().ops } }, { reuseActionBar: true });
        }
      }
      this.toolbar.setToolPreference("align", align);
      this.redraw(align);
      this.setActionButton();
    }

    leftAlign.addEventListener("click", () => { saveAlign("left"); });
    centerAlign.addEventListener("click", () => { saveAlign("center"); });
    rightAlign.addEventListener("click", () => { saveAlign("right"); });
  }
}