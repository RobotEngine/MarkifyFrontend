import { BaseAnnotation } from "../../Render";

import { objectEqual, cleanString, getObject } from "../../../../crucial";

import { textColorBackground } from "../../utils/text-color-background";

import { EMOJIS } from "../../imports";

export class Annotation extends BaseAnnotation {
  ALLOW_SELECT_OVERFLOW = true;
  ALLOW_RICHTEXT_COLOR = false;

  //ACTION_BAR_TOOLS = ["textedit", "color", "fontsize", "bold", "italic", "underline", "strikethrough", "textalign", "unlock", "reactions", "delete"];
  ACTION_BAR_TOOLS = ["textedit", "color", "font", "fontsize", "format", "list", "link", "textalign", "formula", "unlock", "reactions", "delete"];

  DEFAULT_FONT_SIZE = 16;

  SELECTION_FUNCTION = (selection) => {
    if (["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      return { resizePreserveAspect: true };
    }
  }

  css = {
    ".eAnnotation[sticky]": `display: flex; flex-direction: column; background: var(--themeColor); border-radius: 12px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2); pointer-events: all; overflow-y: auto; overflow-x: hidden; text-align: left`,
    //".eAnnotation[sticky]::-webkit-scrollbar": `display: none`, ; scrollbar-width: none
    ".eAnnotation[sticky] div[holder]": `display: flex; flex-direction: column; width: calc(100% - 20px); flex: 1; padding: 16px 10px 10px 10px`,
    ".eAnnotation[sticky] div[edit]": `width: 100%; flex: 1; font-size: 16px; font-weight: 400; line-height: 1.5; pointer-events: all; outline: none`,
    ".eAnnotation[sticky] div[footer]": `display: flex; flex-wrap: wrap; flex-direction: row-reverse; width: 100%; margin-top: 8px; gap: 8px; align-items: flex-end`,
    ".eContent[anonymous] .eAnnotation[sticky] div[signature]": `filter: blur(4px); pointer-events: none`,
    ".eAnnotation[sticky] div[signature]": `margin-left: auto; opacity: .5; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; taxt-align: right`,
    ".eAnnotation[sticky] div[reactions]": `display: flex; flex-wrap: wrap; flex: 1; gap: 6px; background: var(--themeColor); pointer-events: all; z-index: 999; background: none`,
    ".eAnnotation[sticky]:hover .eReaction[add]": `opacity: 1`,
    ".eAnnotation[sticky][selected] .eReaction[add]": `opacity: 1`,
    ".eAnnotation[sticky][selected] button": `pointer-events: all`
  };

  render = () => {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.setAttribute("sticky", "");
      this.element.innerHTML = `<div holder>
        <div edit></div>
        <div footer>
          <div signature></div>
          <div reactions><button class="eReaction" add dropdowntitle="Reactions" noscrollclose><div imgholder><img src="../images/editor/actions/reaction.svg"></div></button></div>
        </div>
      </div>`;
      this.holder.appendChild(this.element);
    }

    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";

    this.element.style.setProperty("--themeColor", "#" + this.properties.c);
    let text = this.element.querySelector("div[edit]");
    if (this.properties._id != null) {
      text.removeAttribute("placeborder");
      this.element.style.opacity = 1;
    } else {
      text.setAttribute("placeborder", "");
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }

    this.element.style.color = textColorBackground(this.properties.c);

    text.style.opacity = this.properties.o / 100;

    let signature = this.element.querySelector("div[signature]");
    if (this.properties.sig != null && this.properties.sig != "" && this.properties.sigHidden != true) {
      signature.textContent = cleanString(this.properties.sig);
      signature.title = signature.textContent;
      signature.removeAttribute("hidden");
    } else {
      signature.setAttribute("hidden", "");
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
    
    let loadText = async () => {
      if (this.quill == null) {
        this.quill = new (await this.editor.text.getQuill())(text, {
          formats: ["font", "size", "bold", "italic", "underline", "strike", "list", "link", "align", "formula"],
          modules: {
            history: { maxStack: 0 }
          },
          //placeholder: "Double click to type...",
          readOnly: true
        });
        this.quill.on("editor-change", (type, delta) => { this.editor.text.checkFonts(type, delta); });
      }
      if (this.quill.isEnabled() == false) {
        let setContent = this.editor.text.uncleanQuill(this.properties.d ?? []);
        if (objectEqual(setContent, this.cache.textContent) == false) {
          this.cache.textContent = setContent;
          this.quill.setContents(setContent, "silent");
        }
      }
    }
    if (this.editor.exporting != true) {
      loadText();
    } else {
      this.editor.exportPromises.push(new Promise(async (resolve) => { resolve(await loadText()); }));
    }

    let reactionHolder = this.element.querySelector("div[reactions]");
    if (this.editor.utils.isLocked(this.properties) == false) {
      reactionHolder.removeAttribute("disabled");
    } else {
      reactionHolder.setAttribute("disabled", "");
    }
    let addReactionButton = reactionHolder.querySelector(".eReaction[add]");
    let reactions = this.editor.reactions[this.properties._id];
    let presentReactions = [];
    if (reactions != null) {
      for (let i = 0; i < reactions.length; i++) {
        let reaction = reactions[i];
        presentReactions.push(reaction.emoji);
        let reactionElem = reactionHolder.querySelector('.eReaction[emoji="' + reaction.emoji + '"');
        if (reactionElem == null) {
          reactionHolder.insertAdjacentHTML("beforeend", `<button class="eReaction" unloaded new><div imgholder><img src="../images/editor/actions/reaction.svg"></div><div count></div></button>`);
          reactionElem = reactionHolder.querySelector(".eReaction[new]");
          reactionHolder.insertBefore(reactionElem, addReactionButton);
          reactionElem.removeAttribute("new");
          reactionElem.setAttribute("emoji", reaction.emoji);
        }
        if (reaction.reacted == true) {
          reactionElem.setAttribute("selected", "");
        } else {
          reactionElem.removeAttribute("selected");
        }
        reactionElem.querySelector("div[count]").textContent = Math.max(reaction.count, 1);
        if (reactionElem.hasAttribute("unloaded") == true) {
          (async () => {
            if (this.editor.render.pendingReactions == null) {
              this.editor.render.pendingReactions = [];
            }
            this.editor.render.pendingReactions.push(reactionElem);

            if (this.editor.render.emojiModule == null) {
              if (this.editor.render.loadingEmojis != true) {
                this.editor.render.loadingEmojis = true;
                let emojiModule = await EMOJIS();
                if (emojiModule != null) {
                  this.editor.render.emojiModule = emojiModule;
                  this.editor.render.emojiDictionary = getObject(emojiModule.emojis, "name");
                }
                this.editor.render.loadingEmojis = false;
              } else {
                return;
              }
            }

            if (this.editor.render.emojiDictionary != null) {
              let pendingReactions = [...this.editor.render.pendingReactions];
              this.editor.render.pendingReactions = [];
              for (let i = 0; i < pendingReactions.length; i++) {
                let loadReaction = pendingReactions[i];
                if (loadReaction == null) {
                  continue;
                }
                let emoji = this.editor.render.emojiDictionary[loadReaction.getAttribute("emoji")];
                loadReaction.removeAttribute("unloaded");
                loadReaction.title = emoji.short_name.replace(/_/g, " ");
                let image = loadReaction.querySelector("img");
                image.src = "../images/editor/emojis/twitter32.png";
                image.style.objectPosition = (-((emoji.sheet_x * this.editor.render.emojiModule.sheetSize) + 1)) + "px " + (-((emoji.sheet_y * this.editor.render.emojiModule.sheetSize) + 1)) + "px";
                image.style.objectFit = "none";
              }
            }
          })();
        }
      }
    }
    let currentReactions = reactionHolder.querySelectorAll(".eReaction[emoji]");
    for (let i = 0; i < currentReactions.length; i++) {
      if (presentReactions.includes(currentReactions[i].getAttribute("emoji")) == false) {
        currentReactions[i].remove();
      }
    }
    if (reactionHolder.childElementCount < 9) {
      addReactionButton.style.display = "flex";
    } else {
      addReactionButton.style.display = "none";
    }
    if (reactionHolder.childElementCount > 1) {
      reactionHolder.style.width = "100%";
      reactionHolder.style.flex = "unset";
    } else {
      reactionHolder.style.width = "unset";
      reactionHolder.style.flex = "1";
    }
  }
}