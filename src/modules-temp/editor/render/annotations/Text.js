import { BaseAnnotation } from "../BaseAnnotation";

import { objectEqual } from "@/crucial";

export class Annotation extends BaseAnnotation {
  SHOW_ONLY_WIDTH_HANDLES = true;
  AUTO_TEXT_FIT = true;
  AUTO_SET_HEIGHT = true;
  REMOVE_IF_NO_TEXT = true;

  ACTION_BAR_TOOLS = ["text/edit", "color", "opacity", "text/font", "text/fontsize", "text/format", "text/list", "text/link", "text/align", "text/formula", "unlock", "delete"];

  DEFAULT_FONT_SIZE = 18;

  css = {
    ".eAnnotation[text] div[text]": `box-sizing: unset !important; padding: 4px 6px; margin: 3px; color: var(--themeColor); font-size: 18px; font-weight: 500; pointer-events: all; outline: none`,
    ".eAnnotation[text] div[text][placeborder]": `width: max-content; margin: 0px; border: solid 3px var(--themeColor); border-radius: 8px`
  };

  async render() {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.setAttribute("text", "");
      this.element.innerHTML = `<div text edit></div>`;
      this.holder.appendChild(this.element);
    }

    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";

    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }

    let text = this.element.querySelector("div[edit]");
    if (this.properties._id != null) {
      text.removeAttribute("placeborder");
    } else {
      text.setAttribute("placeborder", "");
    }

    if (this.properties.c == null) {
      this.element.style.setProperty("--themeColor", "var(--theme)");
    } else {
      this.element.style.setProperty("--themeColor", "#" + this.properties.c);
    }
    
    text.style.opacity = this.properties.o / 100;
    
    if (this.properties.textfit == true) {
      text.style.width = "max-content";
      text.style.minWidth = "130px";
    } else {
      text.style.width = "calc(100% - 18px)"
      text.style.removeProperty("min-width");
    }
    text.style.height = "fit-content";
    
    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();

    let loadText = async () => {
      if (this.quill == null) {
        this.quill = new (await this.editor.text.getQuill())(text, {
          formats: ["color", "font", "size", "bold", "italic", "underline", "strike", "list", "link", "align", "formula"],
          modules: {
            history: { maxStack: 0 }
          },
          readOnly: true
          //placeholder: "Double click to type..."
        }); //formats
        this.quill.on("editor-change", (type, delta) => {
          this.cache.textContent = this.quill.getContents();
          this.editor.text.checkFonts(type, delta);
        });
      }
      if (this.quill.isEnabled() == false) {
        let setContent = this.editor.text.uncleanQuill(this.properties.d ?? []);
        if (objectEqual(setContent, this.cache.textContent) == false) {
          this.cache.textContent = setContent;
          this.quill.setContents(setContent, "silent");
          if (this.properties._id == null) {
            let format = ((this.properties.d ?? [])[0] ?? {}).attributes ?? {}; //(quill.getContents().ops[0] ?? {}).attributes ?? {};
            let keys = Object.keys(format);
            for (let i = 0; i < keys.length; i++) {
              let key = keys[i];
              this.quill.formatText(0, this.quill.getLength(), key, format[key]);
            }
          }
        }
      }
    }
    if (this.editor.exporting != true) {
      await loadText();
    } else {
      this.editor.exportPromises.push(new Promise(async (resolve) => { resolve(await loadText()); }));
    }
  }
}