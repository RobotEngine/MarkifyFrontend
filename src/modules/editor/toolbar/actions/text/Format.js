import formatIcon from "../../../icons/toolbar/format.svg?raw";
import boldIcon from "../../../icons/toolbar/format/bold.svg?raw";
import italicIcon from "../../../icons/toolbar/format/italic.svg?raw";
import underlineIcon from "../../../icons/toolbar/format/underline.svg?raw";
import strikeIcon from "../../../icons/toolbar/format/strike.svg?raw";

export class Tool {
  setActionButton(button) {
    button.innerHTML = formatIcon;
  }

  TOOLTIP = "Format";
  SUPPORTS_MULTIPLE_SELECT = false;
  ATTRIBUTES = { hideformulamode: "" };

  html = `
  <div class="eSubToolFormatContainer eHorizontalToolsHolder" keeptooltip>
    <button class="eTool" tooltip="Bold" format="bold" option><div>${boldIcon}</div></button>
    <button class="eTool" tooltip="Italic" format="italic" option><div>${italicIcon}</div></button>
    <button class="eTool" tooltip="Underline" format="underline" option><div>${underlineIcon}</div></button>
    <button class="eTool" tooltip="Strikethrough" format="strike" option><div>${strikeIcon}</div></button>
  </div>
  `;
  css = {
    ".eSubToolFormatContainer": `overflow: auto; border-radius: inherit`,
    ".eSubToolFormatContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormatContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormatContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
  async js(frame) {
    let formatButtons = frame.querySelectorAll(".eTool");

    let quill;
    let attributes = {};
    this.redraw = () => {
      let preference = this.toolbar.getPreferenceTool();
      let annotation = this.editor.annotations[preference._id];
      if (annotation == null) {
        return;
      }
      quill = (annotation.component ?? {}).quill;
      if (quill == null) {
        return;
      }
      let selection = quill.getSelection();
      if (selection != null) {
        attributes = quill.getFormat(selection.index, selection.length);
      } else {
        attributes = quill.getFormat(0, quill.getLength());
      }
      for (let i = 0; i < formatButtons.length; i++) {
        let button = formatButtons[i];
        if (attributes[button.getAttribute("format")] != true) {
          button.removeAttribute("selected");
        } else {
          button.setAttribute("selected", "");
        }
      }
    }
    this.redraw();
    
    for (let i = 0; i < formatButtons.length; i++) {
      let button = formatButtons[i];
      let format = button.getAttribute("format");
      
      button.addEventListener("click", async () => {
        let selection = quill.getSelection();
        let source = "api";
        let enabled = quill.isEnabled();
        if (enabled == true) {
          source = "user";
        }
        if (selection != null && enabled == true) {
          quill.format(format, !button.hasAttribute("selected"), source);
        } else {
          quill.formatText(0, quill.getLength(), format, !button.hasAttribute("selected"), source);
        }
        if (enabled == false) {
          await this.toolbar.saveSelecting(() => { return { d: quill.getContents().ops } }, { refreshActionBar: false });
        }
        this.redraw();
      });
    }
  }
}