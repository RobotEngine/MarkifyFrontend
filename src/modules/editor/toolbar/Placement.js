import { round, pointInRotatedBounds } from "../math";

import insertCursor from "../icons/cursors/insert.svg?raw";

export class Placement {
  ACTIVE = true;
  PROPERTIES = {};
  USER_SELECT = "none";
  TOUCH_ACTION = "none";
  REALTIME_TOOL = 4;
  MOUSE = { type: "svg", svg: insertCursor, translate: { x: 20, y: 20 } };
  PUBLISH = {};

  clickStart(event) {
    this.clickMove(event);
  }
  async clickMove(event) {
    if (this.ACTIVE == false) {
      return this.clickEnd();
    }
    if (this.annotation == null) {
      if (event != null && this.editor.isEditorContent(event.target) != true) {
        return;
      }
      /*if (this.enable != null) {
        this.enable();
      }*/
      this.annotation = {
        render: this.PROPERTIES,
        animate: false
      };
    }
    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.mouseX = mouseX;
      this.mouseY = mouseY;
    }
    if (this.mouseX == null || this.mouseY == null) {
      return;
    }
    let position = this.editor.utils.scaleToDoc(this.mouseX, this.mouseY);
    this.annotation.render.p = [
      round(position.x - (this.annotation.render.s[0] / 2)),
      round(position.y - (this.annotation.render.s[1] / 2))
    ];
    if (this.FLOAT_TO_HOVERED_LAYER == true) {
      let annotations = this.editor.utils.annotationsInChunks([this.editor.utils.pointInChunk(position.x, position.y)]);
      let viableAnnotations = [];
      for (let i = 0; i < annotations.length; i++) {
        let render = (annotations[i] ?? {}).render ?? {};
        if (render.f != "page") {
          continue;
        }
        let rect = this.editor.utils.getRect(render) ?? {};
        if (pointInRotatedBounds(position.x, position.y, rect.x, rect.y, rect.endX, rect.endY, rect.rotation) == false) {
          continue;
        }
        viableAnnotations.push(render);
      }
      let minLayer = this.editor.minLayer - 2;
      let topAnnotation = viableAnnotations.sort((a, b) => { return (b.l ?? b.sync ?? minLayer) - (a.l ?? a.sync ?? minLayer); })[0] ?? { l: minLayer };
      this.annotation.render.l = (topAnnotation.l ?? topAnnotation.sync ?? minLayer) + 1;
    }
    await this.editor.render.create(this.annotation);
    if (this.annotation.render.textfit == true) {
      let element = this.annotation.component.getElement();
      let textElem = element.querySelector("div[text]");
      if (textElem != null) {
        if (this.annotation.render.remove == true) {
          element.style.opacity = 0;
          element.removeAttribute("hidden");
        }
        this.annotation.render.s = [148, textElem.offsetHeight]; //textElem.offsetWidth
        if (this.annotation.render.remove == true) {
          delete this.annotation.render.remove;
          await this.clickMove();
        }
      }
    }
    this.editor.selecting["cursor"] = this.annotation.render;
  }
  scroll() {
    this.clickMove();
  }
  async clickEnd(event) {
    if (this.annotation == null) {
      return;
    }
    if (event != null && this.editor.isEditorContent(event.target) == true) {
      this.annotation.render._id = this.editor.render.generateID();
      this.annotation.render.pending = true;

      await this.editor.save.push(this.annotation.render);
      await this.editor.history.push("remove", [{ _id: this.annotation.render._id }]);

      this.editor.selecting[this.annotation.render._id] = { ...this.annotation.render, done: true };
      delete this.editor.selecting["cursor"];
      await this.editor.forceShort();

      await this.toolbar.toolbar.startTool(this.toolbar.getToolbar().querySelector('.eTool[tool="selection"]'));
      await this.toolbar.toolbar.startTool(this.toolbar.getToolbar().querySelector('.eTool[tool="select"]'));
      this.editor.selecting[this.annotation.render._id] = {};
      await this.toolbar.selection.updateBox();

      if (this.TARGET_QUERY != null) {
        this.toolbar.selection.clickAction({
          target: this.editor.page.querySelector(this.TARGET_QUERY),
          clearText: true
        });
      }

      if (this.FORCE_SAVE == true) {
        this.editor.save.syncSave(true);
      }
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
  }
}