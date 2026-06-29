import { round, pointInRotatedBounds } from "../math";

import insertCursor from "../icons/cursors/insert.svg?raw";

export class ResizePlacement {
  ACTIVE = true;
  PROPERTIES = {};
  RENDER_INSERT = {};
  CAN_FLIP = true;
  MINIMUM_SIZE = 0;
  USER_SELECT = "none";
  TOUCH_ACTION = "none";
  REALTIME_TOOL = 4;
  MOUSE = { type: "svg", svg: insertCursor, translate: { x: 20, y: 20 } };
  PUBLISH = {};

  async clickStart(event) {
    if (this.ACTIVE == false) {
      return;
    }
    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
      this.startX = position.x;
      this.startY = position.y;
    }
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
      if (this.enable != null) {
        this.enable();
      }
      this.annotation = {
        render: this.PROPERTIES,
        animate: false
      };
      this.resizeActive = false;
      this.startX = null;
      this.startY = null;
      this.width = this.width ?? this.annotation.render.s[0];
      this.height = this.height ?? this.annotation.render.s[1];
    }
    if (this.annotationPreview == null) {
      this.annotationPreview = { ...this.annotation };
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
    this.endX = position.x;
    this.endY = position.y;
    let thickness = this.annotation.render.t ?? 0;
    let halfThickness = thickness / 2;
    this.annotation.render.p = [(this.startX ?? this.endX) - halfThickness, (this.startY ?? this.endY) - halfThickness];
    if (this.resizeActive == true || Math.abs(this.endX - (this.startX ?? this.endX)) > 10 / this.editor.zoom || Math.abs(this.endY - (this.startY ?? this.endY)) > 10 / this.editor.zoom) {
      this.resizeActive = true;
      let setX = this.endX - this.startX;
      if (setX >= 0) {
        setX = round(Math.max(setX, this.MINIMUM_SIZE));
      } else {
        setX = round(Math.min(setX, -this.MINIMUM_SIZE));
      }
      let setY = this.endY - this.startY;
      if (setY >= 0) {
        setY = round(Math.max(setY, this.MINIMUM_SIZE));
      } else {
        setY = round(Math.min(setY, -this.MINIMUM_SIZE));
      }
      if (event != null) {
        this.shiftKey = event.shiftKey;
      }
      if (this.shiftKey == true || this.EVEN_SCALE == true) {
        let changeX = setX / (this.width ?? setX);
        let changeY = setY / (this.height ?? setY);
        if (Math.abs(changeX) > Math.abs(changeY)) {
          if (changeX >= 0) {
            setY = Math.max(this.height * changeX, this.MINIMUM_SIZE);
          } else {
            setY = Math.min(this.height * changeX, -this.MINIMUM_SIZE);
          }
        } else {
          if (changeY >= 0) {
            setX = Math.max(this.width * changeY, this.MINIMUM_SIZE);
          } else {
            setX = Math.min(this.width * changeY, -this.MINIMUM_SIZE);
          }
        }
      }
      if (this.CAN_FLIP != false) {
        if (setX < 0) {
          this.annotation.render.p[0] += thickness;
        }
        if (setY < 0) {
          this.annotation.render.p[1] += thickness;
        }
        this.annotation.render.s = [setX, setY];
      } else {
        this.annotation.render.s = [Math.abs(setX), Math.abs(setY)];
        if (setX < 0) {
          this.annotation.render.p[0] += setX;
        }
        if (setY < 0) {
          this.annotation.render.p[1] += setY;
        }
      }
    } else if (this.FLOAT_TO_HOVERED_LAYER == true) {
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
    this.annotationPreview.render = { ...this.annotation.render, ...this.RENDER_INSERT };
    await this.editor.render.create(this.annotationPreview);
    this.editor.selecting["cursor"] = this.annotation.render;
  }
  scroll() {
    this.clickMove();
  }
  async clickEnd(event) {
    if (this.annotation == null) {
      return;
    }
    if (event != null && (this.editor.isEditorContent(event.target) == true || this.resizeActive == true)) {
      this.annotation.render._id = this.editor.render.generateID();
      
      this.newAnnotation = await this.editor.save.push(this.annotation.render);
      await this.editor.history.push("remove", [{ _id: this.annotation.render._id }]);

      this.editor.selecting[this.annotation.render._id] = { ...this.annotation.render, done: true };
      delete this.editor.selecting["cursor"];
      await this.editor.forceShort();

      await this.toolbar.toolbar.startTool(this.toolbar.getToolbar().querySelector('.eTool[tool="selection"]'));
      await this.toolbar.toolbar.startTool(this.toolbar.getToolbar().querySelector('.eTool[tool="select"]'));
      this.editor.selecting[this.annotation.render._id] = {};
      this.toolbar.selection.updateBox();

      if (this.FORCE_SAVE == true) {
        this.editor.save.syncSave(true);
      }
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
    this.annotationPreview = null;
  }
}