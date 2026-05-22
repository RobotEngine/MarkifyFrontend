import { mouseDown } from "@/crucial";

export class Tool {
  USER_SELECT = "none";
  MOUSE = { type: "set", value: "grab", override: true };

  clickStart(event) {
    if (event.target != null && event.target.closest("button") != null) {
      return;
    }
    this.dragging = true;
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    this.startX = (mouseX - annotationRect.left) / this.editor.zoom;
    this.startY = (mouseY - annotationRect.top) / this.editor.zoom;
    this.toolbar.updateMouse({ type: "set", value: "grabbing" });
  }
  clickMove(event) {
    if (this.dragging != true) {
      return;
    }
    if (event != null) {
      if ((mouseDown() == false && event.buttons != 4) || event.touches != null) { //event.which != 2
        return this.clickEnd(event);
      }
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.endX = mouseX;
      this.endY = mouseY;
    }
    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    this.editor.scrollTo(
      this.editor.scrollLeft - ((((this.endX - annotationRect.left) / this.editor.zoom) - this.startX) * this.editor.zoom),
      this.editor.scrollTop - ((((this.endY - annotationRect.top) / this.editor.zoom) - this.startY) * this.editor.zoom)
    );
    this.toolbar.selection.updateActionBar();
  }
  clickEnd() {
    this.dragging = false;
    this.toolbar.updateMouse({ type: "set", value: "grab" });
  }
  wheel(event) {
    if (this.dragging == true) {
      event.preventDefault();
      this.clickMove();
    }
  }
}