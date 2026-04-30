import { round } from "../../math";

import commentCursor from "../../icons/cursors/comment.svg?raw";

export class Tool {
  USER_SELECT = "none";
  TOUCH_ACTION = "none";
  REALTIME_TOOL = 5;
  MOUSE = { type: "svg", svg: commentCursor, translate: { x: 12, y: 32 } };

  async clickEnd(event) {
    if (this.editor.isEditorContent(event.target) == false) {
      return;
    }

    let commentTarget = event.target.closest(".eAnnotation[comment]");
    if (commentTarget != null) {
      let annotation = this.editor.annotations[commentTarget.getAttribute("anno")];
      if (annotation == null) {
        return;
      }
      //this.closeCommentFrame();
      this.editor.selecting = {};
      this.editor.selecting[annotation.render._id] = {};
      this.toolbar.selection.updateBox();
      return;
    }

    if (this.annotation != null) {
      this.editor.render.remove(this.annotation);
    }

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);

    this.annotation = {
      render: {
        _id: this.editor.render.tempID(),
        f: "comment",
        p: [round(position.x) - (1 / this.editor.zoom), round(position.y) - (1 / this.editor.zoom)],
        s: [0, 0],
        d: [],
        a: this.editor.self.modify
      },
      new: true
    };

    await this.editor.render.create(this.annotation);
    let commentElement = this.annotation.component.getElement();
    let commentHead = commentElement.querySelector("div[commentholder] > div[comment]");
    commentHead.style.transition = "0s";
    commentHead.style.transform = "scale(0)";
    commentHead.offsetHeight;

    this.editor.selecting = {};
    this.toolbar.selection.updateBox();

    //this.openCommentFrame(this.annotation);

    commentElement.setAttribute("selected", "");
    commentHead.style.removeProperty("transition");
    commentHead.style.transform = "scale(1)";
  }
  enable() {
    //this.toolbar.sidemenu.open("editor/toolbar/sidemenu/comment");
    this.editor.annotationHolder.removeAttribute("hidecomments");
  }
  disable() {
    //this.closeCommentFrame();

    if (this.annotation != null) {
      this.editor.render.remove(this.annotation);
      this.annotation = null;
    }

    if (this.editor.options.comments == false) {
      this.editor.annotationHolder.setAttribute("hidecomments", "");
    }
  };
}