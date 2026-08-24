import { head, appendCSS, sleep, uncleanString } from "@/crucial";

import { QUILL, MATHQUILL } from "./imports";

export class Text {
  constructor(editor) {
    this.editor = editor;

    if (window.loadedFonts == null) {
      window.loadedFonts = { "montserrat": true };
    }
    if (window.loadingFonts == null) {
      window.loadingFonts = {};
    }
  }

  fonts = {
    "montserrat": ["Montserrat", 0, () => { return import("@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2?url"); }],
    "notosans": ["Noto Sans", 1, () => { return import("@fontsource-variable/noto-sans/files/noto-sans-latin-wght-normal.woff2?url"); }],
    "playfairdisplay": ["Playfair Display", 2, () => { return import("@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2?url"); }],
    "sourcecodepro": ["Source Code Pro", 3, () => { return import("@fontsource-variable/source-code-pro/files/source-code-pro-latin-wght-normal.woff2?url"); }],
    "comfortaa": ["Comfortaa", 4, () => { return import("@fontsource-variable/comfortaa/files/comfortaa-latin-wght-normal.woff2?url"); }],
    "playpensans": ["Playpen Sans", 5, () => { return import("@fontsource-variable/playpen-sans/files/playpen-sans-latin-wght-normal.woff2?url"); }]
  };

  async getQuill() {
    let [ { default: Quill }, ...formats ] = await QUILL(); //, KeyboardModule
    if (window.QuillSetup != true) {
      window.QuillSetup = true;
      let Parchment = Quill.import("parchment");
      let Inline = Quill.import("blots/inline");
      let Block = Quill.import("blots/block");
      let Container = Quill.import("blots/container");
      let Embed = Quill.import("blots/embed");
      Quill.register(new Parchment.StyleAttributor("color", "color", {
        scope: Parchment.Scope.INLINE
      }));
      let fontMapping = this.fonts;
      Quill.register(new Parchment.ClassAttributor("font", "ql-font", {
        scope: Parchment.Scope.INLINE,
        whitelist: Object.keys(this.fonts)
      }));
      Quill.register(new Parchment.StyleAttributor("size", "font-size", {
        scope: Parchment.Scope.INLINE
      }));
      Quill.register(new Parchment.StyleAttributor("align", "text-align", {
        scope: Parchment.Scope.BLOCK,
        whitelist: ["left", "center", "right"]
      }));

      for (let i = 0; i < formats.length; i++) {
        let newModule = formats[i];
        Quill.register(newModule.default ?? newModule, true);
      }

      // 1. Import List and ListContainer from Quill
      let List = Quill.import("formats/list");
      class CustomListItem extends List {
        static register() {} // Intentionally empty: prevents standard List from calling Quill.register(ListContainer) again

        optimize(context) {
          super.optimize(context);
          this.updateMaxFontSize();
        }

        format(name, value) {
          super.format(name, value);
          this.updateMaxFontSize();
        }

        updateMaxFontSize() {
          if (this.domNode == null) {
            return;
          }

          let maxFontSize = 0;
          let styledNodes = this.domNode.querySelectorAll('[style*="font-size"]');

          styledNodes.forEach((node) => {
            let fontSizePx = parseFloat(window.getComputedStyle(node).fontSize);
            if (isNaN(fontSizePx) == false && fontSizePx > maxFontSize) {
              maxFontSize = fontSizePx;
            }
          });

          if (maxFontSize > 0) {
            this.domNode.style.fontSize = `${maxFontSize}px`;
          } else {
            this.domNode.style.removeProperty("font-size");
          }
        }
      }
      Quill.register(CustomListItem, true);
      
      /*Quill.register(class BoldBlot extends Inline {
        static blotName = "bold";
        static tagName = "STRONG";
      });
      Quill.register(class ItalicBlot extends Inline {
        static blotName = "italic";
        static tagName = "EM";
      });
      Quill.register(class UnderlineBlot extends Inline {
        static blotName = "underline";
        static tagName = "U";
      });
      Quill.register(class StrikeBlot extends Inline {
        static blotName = "strike";
        static tagName = "STRIKE";
      });
      class ListContainer extends Container {}
      ListContainer.blotName = "list-container";
      ListContainer.tagName = "OL";
      class ListItem extends Block {
        static create(value) {
          let node = super.create();
          node.setAttribute("data-list", value);
          return node;
        }
        static formats(domNode) {
          return domNode.getAttribute("data-list") || undefined;
        }
        static register() {
          Quill.register(ListContainer);
        }
        constructor(scroll, domNode) {
          super(scroll, domNode);
          const ui = domNode.ownerDocument.createElement("span");
          this.attachUI(ui);
        }
        format(name, value) {
          if (name == this.statics.blotName && value) {
            this.domNode.setAttribute("data-list", value);
          } else {
            super.format(name, value);
          }
        }
        optimize(context) {
          super.optimize(context);
        }
      }
      ListItem.blotName = "list";
      ListItem.tagName = "LI";
      ListContainer.allowedChildren = [ListItem];
      ListItem.requiredContainer = ListContainer;
      Quill.register(ListItem);
      Quill.register(new Parchment.StyleAttributor("align", "text-align", {
        scope: Parchment.Scope.BLOCK,
        whitelist: ["left", "center", "right"]
      }));
      let sanitize = (url, protocols) => {
        let anchor = document.createElement("a");
        anchor.href = url;
        let protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
        return protocols.indexOf(protocol) > -1;
      }
      Quill.register(class LinkBlot extends Inline {
        static blotName = "link";
        static tagName = "A";
        static SANITIZED_URL = "about:blank";
        static PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel", "sms"];

        static create(value) {
          let node = super.create(value);
          node.setAttribute("href", this.sanitize(value));
          node.setAttribute("rel", "noopener noreferrer");
          node.setAttribute("target", "_blank");
          return node;
        }

        static formats(domNode) {
          return domNode.getAttribute("href");
        }

        static sanitize(url) {
          return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
        }

        format(name, value) {
          if (name !== this.statics.blotName || !value) {
            super.format(name, value);
          } else {
            this.domNode.setAttribute("href", this.constructor.sanitize(value));
          }
        }
      });*/

      let editor = this.editor;
      Quill.register(class FormulaBlot extends Embed {
        static blotName = "formula";
        static className = "ql-formula";
        static tagName = "SPAN";

        static create(value) {
          let node = super.create();
          
          if (value == true) {
            value = "";
          }
          let formula = String(value ?? "");
          node.setAttribute("data-value", formula);
          
          (async () => {
            node.setAttribute("contenteditable", "false");
            node.mathquillAPI = (await editor.text.getMathQuill()).MathField(node);
            //this.mathquill = this.mathquillInterface.StaticMath(node);
            node.mathquillAPI.latex(node.getAttribute("data-value"));
            node.mathquillAPI.config({
              spaceBehavesLikeTab: true,
              handlers: {
                edit: () => {
                  let latex = node.mathquillAPI.latex();
                  if (latex.length > 0) {
                    node.setAttribute("data-value", latex);
                  } else {
                    node.mathquillAPI.blur();
                    let blot = Quill.find(node);
                    if (blot == null) {
                      return;
                    }
                    let quill = Quill.find(blot.scroll.domNode.parentElement);
                    if (quill == null) {
                      return;
                    }
                    quill.deleteText(quill.getIndex(blot) ?? 0, 1, "user");
                  }
                },
                moveOutOf: async (direction = 0) => {
                  let blot = Quill.find(node);
                  if (blot == null) {
                    return;
                  }
                  let quill = Quill.find(blot.scroll.domNode.parentElement);
                  if (quill == null) {
                    return;
                  }
                  let setIndex = (quill.getIndex(blot) ?? 0) + direction;
                  let length = quill.getLength();
                  if (setIndex < length - 1) {
                    if (direction < 0) {
                      quill.setSelection(setIndex + 1, 0, "api");
                    } else {
                      quill.setSelection(setIndex, 0, "api");
                    }
                  } else {
                    quill.insertText(length - 1, " ", "silent");
                    quill.setSelection(length, 0, "api");
                  }
                }
              }
            });

            let forceSelectFn = () => {
              if (node.mathquillAPI != null) {
                node.mathquillAPI.__controller.selectFn("&nbsp;");
              }
            }
            node.addEventListener("focusin", forceSelectFn);
            node.addEventListener("keydown", (event) => {
              if ((event.key ?? {}).toLowerCase().startsWith("arrow") == false) {
                forceSelectFn();
              }
            });
          })();

          return node;
        }

        static value(node) {
          return node.getAttribute("data-value");
        }
      });

      /*let keyboard = KeyboardModule.default || KeyboardModule;
      if (keyboard.DEFAULTS.bindings == null) {
        keyboard.DEFAULTS.bindings = {};
      }
      keyboard.DEFAULTS.bindings['indent list'] = {
        key: 'Tab',
        shiftKey: false,
        handler(range, context) {
          // Manually check if current line or format is a list
          if (context.format && context.format.list) {
            this.quill.format('indent', '+1', 'user');
            return false; // Prevent tab from jumping focus
          }
          return true; // Allow default tab behavior otherwise
        }
      };
      keyboard.DEFAULTS.bindings['outdent list'] = {
        key: 'Tab',
        shiftKey: true,
        handler(range, context) {
          if (context.format && context.format.list) {
            this.quill.format('indent', '-1', 'user');
            return false;
          }
          return true;
        }
      };
      Quill.register('modules/keyboard', keyboard, true);*/
    }
    return Quill;
  }
  uncleanQuill(content = []) {
    if (content.map == null) {
      return;
    }
    return content.map((value) => {
      if (typeof value.insert != "string") {
        return value;
      }
      return { ...value, insert: uncleanString(value.insert) };
    });
  }
  quillDeltaToString(delta) {
    if (Array.isArray(delta) == false) {
      return "";
    }
    let plainText = "";
    for (let op of delta) {
      if (typeof op.insert === "string") {
        plainText += op.insert;
      }
    }
    if (plainText.endsWith('\n')) {
      plainText = plainText.slice(0, -1);
    }
    return plainText;
  }
  loadFont(font) {
    let fontInfo = this.fonts[font];
    if (fontInfo == null) {
      return;
    }
    if (window.loadedFonts[font] != null) {
      return;
    }
    
    if (window.loadingFonts[font] != null) {
      return window.loadingFonts[font];
    }

    let fetchFont = new Promise(async (resolve) => {
      try {
        let module = await fontInfo[2]();
        let fontUrl = module.default;

        let customFont = new FontFace(fontInfo[0], "url(" + fontUrl + ")", {
          weight: "100 900",
          style: "normal",
          display: "swap"
        });

        let loadedFontFace = await customFont.load();
        document.fonts.add(loadedFontFace);

        window.loadedFonts[font] = true;
        delete window.loadingFonts[font];
        
        let newRules = {};
        newRules[".ql-editor .ql-font-" + font] = 'font-family: "' + fontInfo[0] + '", sans-serif';
        appendCSS(newRules);
        
        resolve();
      } catch (error) {
        delete window.loadingFonts[font];
        console.error("Failed to load local font asset: " + font, error);
        resolve();
      }
    });

    window.loadingFonts[font] = fetchFont;
    
    if (this.editor.exporting == true) {
      this.editor.exportPromises.push(fetchFont);
    }
    
    return fetchFont;
  }
  checkFonts(type, delta) {
    if (type != "text-change") {
      return;
    }
    for (let i = 0; i < delta.ops.length; i++) {
      let font = ((delta.ops[i] ?? {}).attributes ?? {}).font;
      if (font == null) {
        continue;
      }
      this.loadFont(font);
    }
  }

  async getMathQuill() {
    if (this.mathquillInterface == null) {
      if (window.MathQuill == null) {
        let mathquillScript = MATHQUILL();
        if (this.editor.exporting == true) {
          this.editor.exportPromises.push(mathquillScript);
        }
        await mathquillScript;
      }
      await sleep();
      this.mathquillInterface = window.MathQuill.getInterface(3);
    }
    return this.mathquillInterface;
  }

  getCurrentCaretPosition(element) {
    let position = 0;
    if (typeof window.getSelection !== "undefined") {
      const selection = window.getSelection();
      if (selection.rangeCount !== 0) {
        const range = window.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
        if (preCaretRange.endContainer.textContent == "") {
          position = "END";
        }
      }
    }
    return position;
  }
  createRange(node, chars, range) {
    if (range == null) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }
    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (let lp = 0; lp < node.childNodes.length; lp++) {
          range = this.createRange(node.childNodes[lp], chars, range);
          if (chars.count === 0) {
            break;
          }
        }
      }
    }
    return range;
  }
  setCaretPosition(element, chars) {
    if (element == null) {
      return;
    }
    let selection = window.getSelection();
    let range = null;
    if (chars == "END") {
      range = this.createRange(element.lastChild, { count: element.lastChild.length - 1 });
    } else {
      range = this.createRange(element, { count: chars });
    }
    if (range != null) {
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  clearSelection() {
    if (window.getSelection != null) {
      window.getSelection().removeAllRanges();
    } else if (document.selection != null) {
      document.selection.empty();
    }
  }
  startTextSelection(text, extra) {
    if (extra.setCaretPosition != true || document.caretRangeFromPoint == null) {
      if (window.getSelection && document.createRange) {
        let range = document.createRange();
        range.selectNodeContents(text);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.body.createTextRange) {
        let range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
      }
    } else {
      let range = document.caretRangeFromPoint(extra.clientX, extra.clientY);
      let selection = window.getSelection();

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}