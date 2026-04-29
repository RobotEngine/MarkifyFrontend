import { mouseDown, sleep } from "@/crucial";

import { rotatePoint, isPointOnLine } from "../../math";

import eraserCursor from "@assets/editor/cursors/eraser.svg?raw";

export class Tool {
  USER_SELECT = "none";
  DISABLE_POINTER_EVENTS = true;
  REALTIME_TOOL = 3;
  MOUSE = { type: "svg", svg: eraserCursor, translate: { x: 20, y: 20 } };
  PUBLISH = {};
  
  async clickStart(event) {
    if (["pen", "mouse"].includes(event.pointerType) == false) {
      if (this.editor.options.stylusmode == true) {
        return;
      }
    } else {
      this.editor.usingStylus = true;
    }
    event.preventDefault();
    this.editor.selecting = {};
    this.toolbar.selection.updateBox();
    this.removeAnnotaions = {};
    this.erasing = true;
    this.clickMove(event);
    this.toolbar.toolbar.closeSubSub(true);
  }
  async clickMove(event) {
    if (this.erasing != true) {
      return;
    }
    if (mouseDown() == false || this.editor.isEditorContent(event.target) != true) {
      return this.clickEnd();
    }
    if (this.editor.pinching == true) {
      return;
    }
    if (this.editor.usingStylus == true && ["pen", "mouse"].includes(event.pointerType) == false) {
      return;
    }
    event.preventDefault();
    
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let x1 = Math.floor(mouseX);
    let y1 = Math.floor(mouseY);
    let x0 = this.x0 ?? x1;
    let y0 = this.y0 ?? y1;
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    
    while (true) {
      let { x: scaledX, y: scaledY } = await this.editor.utils.scaleToDoc(x0, y0);
      let chunkAnnotations = this.editor.utils.annotationsInChunks([this.editor.utils.pointInChunk(scaledX, scaledY)]);
      for (let i = 0; i < chunkAnnotations.length; i++) {
        let annotation = chunkAnnotations[i] ?? {};
        if (annotation.component == null) {
          continue;
        }
        let anno = annotation.component.getElement()
        if (anno == null || anno.hasAttribute("hidden") == true) {
          continue;
        }
        let render = annotation.render; //original.render;
        if (render == null || render.remove == true) {
          continue;
        }
        if (this.editor.utils.canMemberModify(render) != true) { // Can't edit another member's work:
          continue;
        }
        if (this.editor.utils.isLocked(render) == true) {
          continue;
        }
        let renderModule = await this.editor.render.getModule(annotation, render.f);
        if (renderModule == null || renderModule.CAN_ERASE != true) {
          continue;
        }
        // See if valid drawing is by eraser line:
        let rect = this.editor.utils.getRect(render);
        let xPos = scaledX - rect.x;
        let yPos = scaledY - rect.y;
        let halfWidth = rect.width / 2;
        let halfHeight = rect.height / 2;
        let scaleWidth = annotation.component.cache.scaleWidth ?? 1;
        let scaleHeight = annotation.component.cache.scaleHeight ?? 1;
        let halfThickness = rect.thickness / 2;
        let points = render.d ?? [];
        if (points.length < 4) {
          points = [0, 0, .01, .01];
        }
        for (let i = 2; i < points.length; i += 2) {
          let prevRelativeX = (points[i - 2] * scaleWidth) - halfWidth + halfThickness;
          let prevRelativeY = (points[i - 1] * scaleHeight) - halfHeight + halfThickness;
          let pRelativeX = (points[i] * scaleWidth) - halfWidth + halfThickness;
          let pRelativeY = (points[i + 1] * scaleHeight) - halfHeight + halfThickness;
          if (render.s[0] < 0) {
            prevRelativeX *= -1;
            pRelativeX *= -1;
          }
          if (render.s[1] < 0) {
            prevRelativeY *= -1;
            pRelativeY *= -1;
          }
          let [prevPointX, prevPointY] = rotatePoint(prevRelativeX, prevRelativeY, rect.rotation);
          let [pointX, pointY] = rotatePoint(pRelativeX, pRelativeY, rect.rotation);
          if (isPointOnLine(xPos, yPos, prevPointX + halfWidth, prevPointY + halfHeight, pointX + halfWidth, pointY + halfHeight, Math.max(halfThickness, Math.min(4 / this.editor.zoom, 8))) == true && this.removeAnnotaions[render._id] == null) {
            this.removeAnnotaions[render._id] = render;
            this.editor.render.hide(annotation);
            this.PUBLISH.u = { _id: render._id, remove: true };
            await this.editor.realtime.forceShort();
            delete this.PUBLISH.u;
            continue;
          }
        }
      }

      if (x0 == x1 && y0 == y1) {
        break;
      }
      
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
    this.x0 = x1;
    this.y0 = y1;
  }
  async clickEnd() {
    this.erasing = false;
    this.x0 = null;
    this.y0 = null;
    this.editor.usingStylus = false;

    let removeArray = Object.values(this.removeAnnotaions ?? {});
    if (removeArray.length > 0) {
      await this.editor.history.push("add", removeArray);
      for (let i = 0; i < removeArray.length; i++) {
        await this.editor.save.push({ _id: removeArray[i]._id, remove: true });
      }
      this.removeAnnotaions = {};
    }
  }
  touchstart(event) { // Added due to Safari
    if (this.graceful == true) {
      event.preventDefault();
    }
  }
  touchmove(event) {
    if (this.editor.isEditorContent(event.target) != true) {
      return;
    }
    if (this.editor.options.stylusmode != true || stylusActive() == true || this.erasing == true) {
      event.preventDefault();
    }
  }
  async enable() {
    this.graceful = true;
    await sleep(100);
    this.graceful = false;
  }
  async disable() {
    return await this.clickEnd();
  }
}