import { BaseAnnotation } from "../../Render";

import { objectEqual, timeSince } from "../../../../crucial";

export class Annotation extends BaseAnnotation {
  DISABLE_SNAPPING = true;
  CAN_BE_SNAPPED_TO = false;
  CAN_BE_MULTISELECT = false;
  CAN_DRAG_SELECT = false;
  CAN_BE_CHILD_ANY_PARENT = true;
  ONLY_PARENT_CHANGE_ON_EDIT = true;
  REDRAW_ON_PARENT_UPDATE = true;
  DISPLAY_SELECT_BOX = false;
  KEEP_ON_PARENT_DELETE = true;
  RENDER_CHILDREN_WHEN_SELECTED = true;
  IGNORE_LOCKED_WARNING = true;
  KEYBINDS_ENABLED = false;

  async SELECTION_START() {
    if (this.annotation == null) {
      return;
    }
    this.commentModule = await this.editor.newModule("editor/toolbar/comment");
    if (this.commentModule == null) {
      return;
    }
    this.commentModule.editor = this.editor;
    this.commentModule.toolbar = this.editor.toolbar;
    await this.commentModule.openCommentFrame(this.annotation, Object.values(this.commentThreads).sort((a, b) => { return (a.time ?? a.sync) - (b.time ?? b.sync); }));
    this.subscribe("bounds_change", this.commentModule.updateCommentFrame);
    this.editor.pipeline.publish("comment_select_start", this.properties);
    //this.subscribe("click_move", this.commentModule.updateCommentFrame);
  }
  SELECTION_END() {
    if (this.commentModule == null) {
      return;
    }
    this.commentModule.closeCommentFrame();
    this.commentModule = null;
    this.unsubscribe("bounds_change");
    //this.unsubscribe("click_move");
    this.editor.pipeline.publish("comment_select_end", this.properties);
    if (this.properties.resolved == true) {
      return this.remove();
    }
  }
  commentThreads = {};
  handleParentThread() {
    let parentAnnotation = this.editor.annotations[this.properties.parent];
    if (parentAnnotation != null) {
      if (parentAnnotation.pointer != null) {
        parentAnnotation = this.editor.annotations[parentAnnotation.pointer];
      }
      if (parentAnnotation.render.f == "comment") { // Use for comment thread
        if (parentAnnotation.component != null) {
          if (this.annotation.pending != null) {
            delete parentAnnotation.component.commentThreads[this.annotation.pending];
          }
          if (this.properties.remove != true) {
            parentAnnotation.component.commentThreads[this.properties._id] = this.properties;
          } else {
            delete parentAnnotation.component.commentThreads[this.properties._id];
          }
          if (parentAnnotation.component.commentModule != null && parentAnnotation.component.commentModule.updateComment != null) {
            parentAnnotation.component.commentModule.updateComment({ ...this.properties, pending: this.annotation.pending });
          }
          if (parentAnnotation.component.replyCount != null) {
            let replyCount = Object.keys(parentAnnotation.component.commentThreads).length;
            if (replyCount > 0) {
              if (replyCount > 1) {
                parentAnnotation.component.replyCount.textContent = replyCount + " Replies";
              } else {
                parentAnnotation.component.replyCount.textContent = "1 Reply";
                parentAnnotation.component.updateCommentSize();
              }
              parentAnnotation.component.replyCount.style.display = "unset";
            } else {
              parentAnnotation.component.replyCount.style.removeProperty("display");
              parentAnnotation.component.updateCommentSize();
            }
          }
        }
        return true;
      } else if (this.commentModule != null && this.commentModule.updateComment != null) {
        this.commentModule.updateComment({ ...this.properties, pending: this.annotation.pending });
      }
    } else if (this.commentModule != null && this.commentModule.updateComment != null) {
      this.commentModule.updateComment({ ...this.properties, pending: this.annotation.pending });
    }
  }

  css = {
    ".eAnnotation[comment]": `--themeColor: var(--theme); z-index: calc(var(--maxZIndex) + var(--startZIndex) + 1) !important; `,
    ".eAnnotation[comment][selected]": `z-index: calc(var(--maxZIndex) + var(--startZIndex) + 2) !important`,
    ".eAnnotations[hidecomments] .eAnnotation[comment]:not([selected])": `display: none`,
    ".eAnnotation[comment]:not([selected]):hover": `z-index: calc(var(--maxZIndex) + var(--startZIndex) + 2) !important`,
    ".eAnnotation[comment] > div[commentholder]": `width: 1px; height: 1px; transform: scale(calc(1 / var(--zoom)))`,
    ".eAnnotation[comment] > div[commentholder] > div[comment]": `position: absolute; display: flex; width: 32px; height: 32px; left: 0px; bottom: 0px; background: var(--pageColor); border-radius: 16px 16px 16px 6px; pointer-events: all; transform-origin: bottom left; transition: .2s`,
    ".eAnnotation[comment][selected] > div[commentholder] > div[comment]": `background: var(--themeColor) !important`,
    ".eAnnotation[comment] > div[commentholder] > div[comment]:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: 0px 0px 6px var(--themeColor); opacity: .6; transition: .2s`,
    ".eAnnotation[comment]:not([selected]):hover > div[commentholder] > div[comment]": `width: var(--animateWidth); height: var(--animateHeight); padding: 4px`,
    ".eAnnotation[comment]:not([selected]):hover > div[commentholder] > div[comment]:after": `box-shadow: 0px 0px 10px var(--themeColor)`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[container]": `display: flex; box-sizing: border-box; width: 100%; height: 100%; padding: 4px; border-radius: inherit; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder]": `flex-shrink: 0; width: 24px; height: 24px; background: var(--themeColor); border-radius: 12px; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder] > div[dots]": `display: flex; gap: 2px; width: 100%; height: 100%; justify-content: center; align-items: center`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder] > div[dots] > div": `width: 4px; height: 4px; background: var(--pageColor); border-radius: 2px`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder] > img": `width: 100%; height: 100%; border-radius: 12px; object-fit: cover`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[content]": `min-width: max-content; height: fit-content; margin-left: 6px; text-align: left`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[memberholder]": `display: flex; max-width: 200px; height: 24px; align-items: center`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[member]": `flex: 1; min-width: 0; max-width: fit-content; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[time]": `margin-left: 6px; color: var(--darkGray); font-size: 12px; font-weight: 500; white-space: nowrap`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[text]": `box-sizing: border-box; width: 100%; max-width: 200px; height: fit-content; font-size: 12px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[replycount]": `display: none; width: 100%; max-width: 200px; margin-top: 4px; color: var(--theme); font-size: 12px; font-weight: 600`
  };

  render() {
    if (this.properties.resolved == true && this.editor.selecting[this.properties._id] == null) {
      return this.remove();
    }
    if (this.handleParentThread() == true) {
      return;
    }
    if (this.editor.exporting == true) {
      return;
    }
    
    let newAnnotation = this.element == null;
    if (newAnnotation == true) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.setAttribute("comment", "");
      this.element.style.display = "none";
      this.element.innerHTML = `<div commentholder>
          <div comment>
            <div container>
              <div profileholder></div>
              <div content>
                <div memberholder>
                  <div member></div>
                  <div time></div>
                </div>
                <div text></div>
                <div replycount></div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      this.editor.annotationHolder.appendChild(this.element);
    }

    let absolutePos = this.editor.utils.getAbsolutePosition(this.properties, true);
    this.element.style.transform = "matrix(1,0,0,1," + absolutePos.x + "," + absolutePos.y + ")";

    let comment = this.element.querySelector("div[commentholder] > div[comment]");
    let content = comment.querySelector("div[content]");
    /*let richText = this.properties.d ?? {};
    let setHTML = "";
    for (let i = 0; i < (richText.b ?? []).length; i++) {
      let addHTML = "";
      if (richText.b[i] != "\n") {
        addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
      } else {
        addHTML = "<br>";
      }
      setHTML += addHTML;
    }
    content.querySelector("div[text]").innerHTML = setHTML;*/

    this.replyCount = content.querySelector("div[replycount");

    this.updateCommentSize = () => {
      if (this.annotation.new != true) {
        comment.style.setProperty("--animateWidth", (content.clientWidth + 40) + "px"); //38
        comment.style.setProperty("--animateHeight", (content.clientHeight + 8) + "px");
      }
    }
    this.updateCommentSize();

    let setCollaborator = (collaborator) => {
      if (this.element == null) {
        return;
      }
      this.element.style.setProperty("--themeColor", collaborator.color);
      let profileHolder = comment.querySelector("div[profileholder]");
      if (collaborator.image != null) {
        profileHolder.innerHTML = `<img src="../images/profiles/default.svg" />`;
        profileHolder.querySelector("img").src = collaborator.image;
      } else {
        profileHolder.innerHTML = `<div dots><div></div><div></div><div></div></div>`;
      }
      comment.querySelector("div[member]").textContent = collaborator.name;
      this.updateCommentSize();
    }
    let modifyID = this.properties.a ?? this.properties.m;
    this.editor.utils.getCollaborator(modifyID, (collaborator) => {
      if (collaborator._id != null) {
        setCollaborator(collaborator);
      }
      this.element.style.removeProperty("display");
    });

    if (newAnnotation == true) {
      this.element.addEventListener("mouseover", () => {
        if (comment == null) {
          return;
        }
        if (comment != null) {
          let setTime = this.properties.time ?? this.properties.sync;
          if (setTime != null) {
            comment.querySelector("div[time]").textContent = timeSince(setTime);
          }
          if (this.annotation.new != true) {
            this.updateCommentSize();
          }
        }
      });

      this.subscribe("collaborator_update_" + modifyID, setCollaborator);
    }
    
    this.setID();
    this.setAnimate();

    let loadText = async () => {
      if (this.quill == null) {
        this.quill = new (await this.editor.text.getQuill())(content.querySelector("div[text]"), {
          formats: ["bold", "italic", "underline", "strike", "link"],
          modules: {
            history: { maxStack: 0 }
          },
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

    if (this.commentModule != null) {
      this.commentModule.annotation = this.annotation;
      this.commentModule.updateCommentFrame();
    }
  }
  remove = () => {
    if (this.properties.remove == true) {
      this.handleParentThread();
    }
    if (this.commentModule != null && this.commentModule.closeCommentFrame != null) {
      this.commentModule.closeCommentFrame();
    }
    let element = this.getElement();
    this.element = null;
    this.cache = {};
    if (element == null) {
      return;
    }
    element.remove();
    this.editor.pipeline.unsubscribe("annotation_" + (this.cache.originalID ?? this.properties._id));
  }
}