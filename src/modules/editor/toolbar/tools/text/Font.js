const fontIcons = import.meta.glob("../../../icons/toolbar/font/*.svg", { query: "?raw" });
const fontIconPath = "../../../icons/toolbar/font/";
const iconCache = new Map();

const setFontIcon = async (element, font, add = "") => {
  let path = fontIconPath + font + add + ".svg";

  let fontIconFunction = fontIcons[path];
  if (fontIconFunction == null) {
    return;
  }

  if (iconCache.has(path) == false) {
    iconCache.set(path, fontIconFunction()); 
  }

  let fontIconLoader = await iconCache.get(path);
  if (element != null && (fontIconLoader ?? {}).default != null) {
    if (element.getAttribute("font") == font) {
      element.innerHTML = fontIconLoader.default;
    }
  }
}

export class Tool {
  setActionButton() {
    let preference = this.toolbar.getPreferenceTool();
    let quill = ((this.editor.annotations[preference._id] ?? {}).component ?? {}).quill;
    let font;
    if (quill != null) {
      let selection = quill.getSelection();
      if (selection != null) {
        font = quill.getFormat(selection.index, selection.length).font;
      } else {
        font = quill.getFormat(0, quill.getLength()).font;
      }
    }
    if (Array.isArray(font) == true) {
      font = font[0];
    }
    font = font ?? "montserrat";
    let buttonIcon = this.button.querySelector("div");
    if (buttonIcon != null && font != buttonIcon.getAttribute("font")) {
      buttonIcon.setAttribute("font", font);
      setFontIcon(buttonIcon, font, "icon");
    }
  }

  TOOLTIP = "Font";
  SUPPORTS_MULTIPLE_SELECT = false;
  ATTRIBUTES = { hideformulamode: "" };

  html = `<div class="eSubToolFontContainer"></div>`;
  css = {
    ".eSubToolFontContainer": `box-sizing: border-box; display: flex; flex-direction: column; gap: 6px; max-width: 100%; padding: 6px; align-items: center`,
    ".eFontOption": `display: flex; max-width: 100%; width: 154px; height: 36px; padding: 4px; justify-content: center; border-radius: 6px; font-weight: 600; transition: .15s`,
    ".eFontOption svg": `height: 100%; transition: .1s`,
    ".eFontOption:hover": `background: var(--hover)`,
    ".eFontOption[selected]": `background: var(--theme) !important`,
    ".eFontOption[selected] svg": `filter: brightness(0) invert(1)`
  };
  async js(frame) {
    let fontContainer = frame.querySelector(".eSubToolFontContainer");
    
    let quill;
    let selectedF;
    this.redraw = (font) => {
      let preference = this.toolbar.getPreferenceTool();
      let annotation = this.editor.annotations[preference._id];
      if (annotation == null) {
        return;
      }
      quill = (annotation.component ?? {}).quill;
      if (quill == null) {
        return;
      }
      if (font == null) {
        let selection = quill.getSelection();
        if (selection != null) {
          selectedF = quill.getFormat(selection.index, selection.length).font;
        } else {
          selectedF = quill.getFormat(0, quill.getLength()).font;
        }
      } else {
        selectedF = font;
      }
      if (Array.isArray(selectedF) == true) {
        selectedF = selectedF[0];
      }
      selectedF = selectedF ?? "montserrat";
      
      let selectedButton = fontContainer.querySelector(".eFontOption[selected]");
      if (selectedButton != null) {
        selectedButton.removeAttribute("selected");
      }
      let selectButton = fontContainer.querySelector('.eFontOption[font="' + selectedF + '"]');
      if (selectButton != null) {
        selectButton.setAttribute("selected", "");
      }
    }
    
    frame.addEventListener("click", async (event) => {
      let button = event.target.closest(".eFontOption");
      if (button == null) {
        return;
      }
      let font = button.getAttribute("font");
      if (font == null) {
        return;
      }

      let selection = quill.getSelection();
      let source = "api";
      let enabled = quill.isEnabled();
      if (enabled == true) {
        source = "user";
      }
      await this.editor.text.loadFont(font);
      if (selection != null && enabled == true) {
        quill.format("font", font, source);
      } else {
        quill.formatText(0, quill.getLength(), "font", font, source);
      }
      await document.fonts.ready;
      if (enabled == false) {
        await this.toolbar.saveSelecting(() => { return { d: quill.getContents().ops } }, { refreshActionBar: false });
      } else if (selection != null && selection.length < 1) {
        this.toolbar.saveSelecting(() => { return {}; }, { saveHistory: false });
      }
      this.toolbar.setToolPreference("font", font);
      this.redraw(font);
      this.setActionButton();
      this.toolbar.selection.closeActionFrame();
    });
    
    let sortedFonts = Object.keys(this.editor.text.fonts).sort((a, b) => { return a[1] - b[1]; });
    for (let i = 0; i < sortedFonts.length; i++) {
      let newFont = sortedFonts[i];
      fontContainer.insertAdjacentHTML("beforeend", `<button class="eFontOption" new></button>`);
      let newButton = fontContainer.querySelector(".eFontOption[new]");
      newButton.removeAttribute("new");
      newButton.setAttribute("font", newFont);
      newButton.title = this.editor.text.fonts[newFont][0];
      setFontIcon(newButton, newFont);
    }

    this.redraw();
  }
}