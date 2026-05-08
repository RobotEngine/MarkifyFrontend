export class Tool {
  setActionButton(button) {
    if (button != null) {
      button.innerHTML = `<div class="eSubToolFontSizeHolder"><div class="eSubToolFontSize"></div></div>`;
    }

    let preference = this.toolbar.getPreferenceTool();
    let component = (this.editor.annotations[preference._id] ?? {}).component ?? {};
    let quill = component.quill;
    let size;
    if (quill != null) {
      let selection = quill.getSelection();
      if (selection != null) {
        let content = quill.getContents(selection.index, Math.max(selection.length, 1)) ?? {};
        if (content.ops == null || content.ops.length > 1 || (content.ops[0].insert ?? {}).formula == null) {
          size = quill.getFormat(selection.index, selection.length).size;
        } else {
          size = quill.getFormat(selection.index, 1).size;
        }
      } else {
        size = quill.getFormat(0, quill.getLength()).size;
      }
    }
    if (Array.isArray(size) == true) {
      size = size[0];
    }
    size = size ?? ((component.DEFAULT_FONT_SIZE ?? 14) + "px");
    this.button.querySelector(".eSubToolFontSize").textContent = size.substring(0, size.length - 2);
  }

  TOOLTIP = "Font Size";
  SUPPORTS_MULTIPLE_SELECT = false;

  html = `
  <div class="eSubToolFontSizeContainer">
    <button class="eFontSizeOption" small>Small</button>
    <button class="eFontSizeOption" medium>Medium</button>
    <button class="eFontSizeOption" large>Large</button>
    <div class="eFontSizeLine"></div>
    <div class="eFontSizeInput border"><div class="eFontSizeBox" contenteditable="true"></div></div>
  </div>
  `;
  css = {
    ".eSubToolFontSizeHolder": `display: flex; width: 42px; height: 42px; justify-content: center; align-items: center; overflow: hidden`,
    ".eSubToolFontSize": `padding: 0 4px; background: var(--pageColor); border-radius: 6px; color: var(--darkGray); font-size: 24px; font-weight: 700; text-wrap: nowrap`,

    ".eSubToolFontSizeContainer": `display: flex; flex-direction: column; padding: 6px; align-items: center`,
    ".eFontSizeOption": `display: flex; width: 120px; height: 36px; margin-bottom: 4px; border-radius: 10px; justify-content: center; align-items: center; font-weight: 600; transition: .15s`,
    ".eFontSizeOption:hover": `background: var(--secondary); color: #fff`,
    ".eFontSizeOption[selected]": `background: var(--theme) !important; color: #fff`,
    ".eFontSizeOption[small]": `font-size: 14px`,
    ".eFontSizeOption[medium]": `font-size: 18px`,
    ".eFontSizeOption[large]": `font-size: 22px`,
    ".eFontSizeLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".eFontSizeInput": `display: flex; padding: 3px; margin: 8px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eFontSizeInput div": `max-width: 50px; min-width: 25px; padding: 0 8px; border: none; outline: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`
  };
  async js(frame) {
    let smallButton = frame.querySelector(".eFontSizeOption[small]"); // 12px
    let mediumButton = frame.querySelector(".eFontSizeOption[medium]"); // 18px
    let largeButton = frame.querySelector(".eFontSizeOption[large]"); // 26px
    let inputSize = frame.querySelector(".eFontSizeBox"); // Custom

    let quill;
    let selectedS;
    this.redraw = (size) => {
      let preference = this.toolbar.getPreferenceTool();
      let annotation = this.editor.annotations[preference._id];
      if (annotation == null) {
        return;
      }
      let component = annotation.component ?? {};
      quill = component.quill;
      if (quill == null) {
        return;
      }
      if (size == null) {
        let selection = quill.getSelection();
        if (selection != null) {
          let content = quill.getContents(selection.index, Math.max(selection.length, 1)) ?? {};
          if (content.ops == null || content.ops.length > 1 || (content.ops[0].insert ?? {}).formula == null) {
            selectedS = quill.getFormat(selection.index, selection.length).size;
          } else {
            selectedS = quill.getFormat(selection.index, 1).size;
          }
        } else {
          selectedS = quill.getFormat(0, quill.getLength()).size;
        }
      } else {
        selectedS = size;
      }
      if (Array.isArray(selectedS) == true) {
        selectedS = selectedS[0];
      }
      selectedS = selectedS ?? component.DEFAULT_FONT_SIZE ?? 14;
      if (typeof selectedS == "string") {
        selectedS = parseFloat(selectedS.substring(0, selectedS.length - 2));
      }

      smallButton.removeAttribute("selected");
      mediumButton.removeAttribute("selected");
      largeButton.removeAttribute("selected");
      if (selectedS == 12) {
        smallButton.setAttribute("selected", "");
      } else if (selectedS == 18) {
        mediumButton.setAttribute("selected", "");
      } else if (selectedS == 26) {
        largeButton.setAttribute("selected", "");
      }
      
      if (document.activeElement != inputSize) {
        inputSize.textContent = selectedS;
      }
    }
    this.redraw();

    let lastSelection;
    let saveSize = async (set, close) => {
      let selection;
      if (lastSelection == null) {
        selection = quill.getSelection();
      } else {
        selection = lastSelection;
      }
      let source = "api";
      let enabled = quill.isEnabled();
      if (enabled == true) {
        source = "user";
      }
      if (selection != null && enabled == true) {
        let content = quill.getContents(selection.index, Math.max(selection.length, 1)) ?? {};
        if (content.ops == null || content.ops.length > 1 || (content.ops[0].insert ?? {}).formula == null) {
          quill.format("size", set + "px", source);
        } else {
          quill.formatText(selection.index, 1, "size", set + "px", source);
          let element = (quill.getLeaf(selection.index + 1)[0] ?? {}).domNode;
          setTimeout(() => {
            if (element != null && element.mathquillAPI != null) {
              element.mathquillAPI.focus();
            }
          }, 1);
        }
      } else {
        quill.formatText(0, quill.getLength(), "size", set + "px", source);
      }
      if (enabled == false) {
        await this.toolbar.saveSelecting(() => { return { d: quill.getContents().ops } }, { reuseActionBar: true });
      } else if (selection != null && selection.length < 1) {
        this.toolbar.saveSelecting(() => { return {}; }, { saveHistory: false });
      }
      this.toolbar.setToolPreference("size", set);
      this.redraw(set + "px");
      this.setActionButton();
      
      if (close == true) {
        this.toolbar.selection.closeActionFrame();
      }
    }

    smallButton.addEventListener("click", () => { saveSize(12, true); });
    mediumButton.addEventListener("click", () => { saveSize(18, true); });
    largeButton.addEventListener("click", () => { saveSize(26, true); });

    inputSize.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        //saveSize(parseInt(inputSize.textContent));
        return textBox.blur();
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 250) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 250");
        }
      }
    });
    this.finish = async () => {
      if (inputSize == null) {
        return;
      }
      if (inputSize.textContent == "") {
        inputSize.textContent = selectedS;
        return;
      }
      let textInt = parseInt(inputSize.textContent) ?? selectedS;
      if (textInt === "") {
        return this.redraw();
      } else if (textInt > 250) {
        inputSize.textContent = "250";
      } else if (textInt < 1) {
        inputSize.textContent = "1";
      }
      await saveSize(parseInt(inputSize.textContent));
    }
    inputSize.addEventListener("focusout", this.finish);
    inputSize.addEventListener("focus", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      lastSelection = quill.getSelection() ?? lastSelection;
      textBox.textContent = "";
    });
  }
}