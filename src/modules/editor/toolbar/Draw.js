import { mouseDown, sleep } from "@/crucial";

import { round, distance, lowPassFilter, horizontalLine, simplifyPath, relativelyStraight } from "../math";

export class Draw {
  FUNCTION = "draw";
  USER_SELECT = "none";
  DISABLE_POINTER_EVENTS = true;
  PUBLISH = {};

  stylusButtonA = (event) => { return 5 == event.button || 32 == (32 & event.buttons); }; // 1st Stylus Button (Eraser)
  stylusButtonB = (event) => { return 2 == event.button || 2 == (2 & event.buttons); }; // 2nd Stylus Button (Drag Select Box)

  async clickStart(event) {
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    if (this.passthroughModule != null && this.passthroughModule.clickStart != null) {
      let runPassthrough = false;
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      if (this.toolbar.selection.action != null) {
        runPassthrough = true;
      } else if (event.target.closest(".eSelect") != null || event.target.closest(".eActionBar") != null) {
        runPassthrough = true;
      } else {
        let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
        if (this.toolbar.selection.pointInSelectBox(position.x, position.y) == true) {
          runPassthrough = true
        }
      }
      if (runPassthrough == true) {
        return await this.passthroughModule.clickStart(event);
      }
    }
    if (["pen", "mouse"].includes(event.pointerType) == false) {
      if (this.editor.options.stylusmode == true) {
        return;
      }
    } else {
      if (this.stylusButtonA(event) == true || this.stylusButtonB(event) == true) {
        return;
      }
      this.editor.usingStylus = true;
    }
    if (this.passthroughModule != null) {
      this.passthroughType = null;
      if ((this.passthroughModule ?? {}).disable != null) {
        this.passthroughModule.disable();
      }
      this.passthroughModule = null;
      this.toolbar.applyToolModule(this);
    }
    event.preventDefault();
    if (this.annotation != null) {
      return;
    }
    this.disable();
    this.editor.selecting = {};
    this.toolbar.selection.updateBox();
    this.toolbar.toolbar.closeSubSub(true);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    let toolPreference = this.toolbar.getToolPreference();
    let useThickness = this.THICKNESS ?? toolPreference.thickness;
    let halfUseThickness = round(useThickness / 2);
    this.annotation = {
      render: {
        _id: this.editor.render.tempID(),
        f: this.FUNCTION,
        p: [round(position.x - halfUseThickness), round(position.y - halfUseThickness)],
        s: [0, 0],
        l: this.editor.maxLayer + 1,
        c: this.COLOR ?? toolPreference.color.selected,
        t: useThickness,
        o: this.OPACITY ?? toolPreference.opacity,
        d: [0, 0]
      },
      animate: false
    };
    this.pointerId = event.pointerId;
    this.shiftKeyEnabled = event.shiftKey == true;
    this.USE_COALESCED_EVENTS = true;
    this.editor.realtimeSelect[this.annotation.render._id] = this.annotation.render;
    await this.editor.render.create(this.annotation);
  }
  async handleDraw(event, mouseX, mouseY) {
    if (this.annotation == null) {
      return;
    }
    if (this.annotation.component == null) {
      return;
    }
    if (event.shiftKey == true) {
      this.shiftKeyEnabled = true;
    }
    
    let rect = this.editor.utils.localBoundingRect(this.annotation.component.getElement());
    let { x, y } = this.editor.utils.scaleToDoc(mouseX - rect.left, mouseY - rect.top, true);
    let halfT = round(this.annotation.render.t / 2);
    x -= halfT;
    y -= halfT;
    let pointLength;
    if (this.FORCE_LINE != true && this.shiftKeyEnabled == false) {
      pointLength = this.annotation.render.d.length;

      let drawX = x;
      let drawY = y;
      let pointEndIndex = pointLength - 1;
      if (pointLength < 5 || distance((this.lastInsertedPoint ?? {}).x ?? x, (this.lastInsertedPoint ?? {}).y ?? y, x, y) >= .5) { // Add Point:
        if (pointLength > 2) {
          ([drawX, drawY] = lowPassFilter([x, y], [this.annotation.render.d[pointEndIndex - 1], this.annotation.render.d[pointEndIndex]]));
        }
        this.annotation.render.d.push(drawX, drawY);
        this.lastInsertedPoint = { x, y };
      } else { // Reuse Point
        this.annotation.render.d[pointEndIndex - 1] = drawX;
        this.annotation.render.d[pointEndIndex] = drawY;
      }
    } else {
      this.annotation.render.d = [this.annotation.render.d[0], this.annotation.render.d[1]];
      let sizeIncX = x;
      if (sizeIncX < this.annotation.render.d[0]) {
        if (this.annotation.render.d[0] == 0) {
          this.annotation.render.s[0] = 0;
        }
        this.annotation.render.d[0] -= sizeIncX;
        this.annotation.render.s[0] -= sizeIncX;
        this.annotation.render.p[0] += sizeIncX;
        x = 0;
      } else {
        if (this.annotation.render.d[0] > 0) {
          this.annotation.render.p[0] += this.annotation.render.d[0];
          this.annotation.render.d[0] = 0;
        }
        this.annotation.render.s[0] = x;
      }
      let sizeIncY = y;
      if (sizeIncY < this.annotation.render.d[1]) {
        if (this.annotation.render.d[1] == 0) {
          this.annotation.render.s[1] = 0;
        }
        this.annotation.render.d[1] -= sizeIncY;
        this.annotation.render.s[1] -= sizeIncY;
        this.annotation.render.p[1] += sizeIncY;
        y = 0;
      } else {
        if (this.annotation.render.d[1] > 0) {
          this.annotation.render.p[1] += this.annotation.render.d[1];
          this.annotation.render.d[1] = 0;
        }
        this.annotation.render.s[1] = y;
      }
      this.annotation.render.d[2] = x;
      this.annotation.render.d[3] = y;
    }
    if (this.HORIZONTAL_CHECK == true) {
      if (horizontalLine(this.annotation.render.d) == true) {
        this.annotation.render.d[3] = this.annotation.render.d[1];
        this.annotation.render.s[1] = this.annotation.render.t;
        this.annotation.render.p[1] = round(this.annotation.render.p[1] + this.annotation.render.d[1]);
        this.annotation.render.d[1] = 0;
        this.annotation.render.d[3] = 0;
      }
    }

    await this.editor.render.create(this.annotation);
    this.editor.realtimeSelect[this.annotation.render._id] = this.annotation.render;
    if (this.annotation.render.d.length > 6150) { // Start new annotation when path too long
      await this.clickEnd();
      this.clickStart(event);
    }

    if (pointLength != null && this.annotation.render.d.length > pointLength) {
      clearTimeout(this.lastDrawTimeout);
      this.lastDrawTimeout = setTimeout(() => { this.handleDraw(event, mouseX, mouseY); }, 25);
    }
  }
  async clickMove(event) {
    let newPassthroughType;
    let newPassthrough;
    let skipCheck = false;

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    if (this.lastMouseX == mouseX && this.lastMouseY == mouseY) { // Remove duplicated events
      return;
    }
    this.lastMouseX = mouseX;
    this.lastMouseY = mouseY;

    if (this.toolbar.selection.action != null) {
      skipCheck = true;
    } else if (event.target.closest(".eSelect") != null) {
      skipCheck = true;
    } else {
      let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
      if (this.toolbar.selection.pointInSelectBox(position.x, position.y) == true) {
        skipCheck = true;
      }
    }
    if (skipCheck != true) {
      if (this.stylusButtonA(event) == true) {
        newPassthroughType = "eraser";
        newPassthrough = "eraser";
      } else if (this.stylusButtonB(event) == true) {
        newPassthroughType = "drag";
        newPassthrough = "drag";
      } else if (this.passthroughType != null) {
        if ((this.passthroughModule ?? {}).disable != null) {
          await this.passthroughModule.disable();
        }
        this.passthroughType = null;
        this.toolbar.applyToolModule(this);
      }
    }
    if (newPassthrough != null && newPassthroughType != this.passthroughType) {
      this.disable();
      this.passthroughType = newPassthroughType;
      this.passthroughModule = await this.toolbar.newModule(newPassthrough);
      this.passthroughModule.editor = this.editor;
      this.passthroughModule.toolbar = this.toolbar;
      this.passthroughModule.isPassthrough = true;
      if (this.passthroughModule.enable != null) {
        this.passthroughModule.enable();
      }
      this.toolbar.applyToolModule(this.passthroughModule);
      this.USE_COALESCED_EVENTS = false;
      await this.passthroughModule.clickStart(event);
    }
    if ((this.passthroughModule ?? {}).clickMove != null) {
      await this.passthroughModule.clickMove(event);
    }
    
    if (this.annotation == null) {
      return;
    }
    if (this.editor.pinching == true) {
      return this.disable();
    }
    if (mouseDown() == false) {
      return this.clickEnd();
    }
    if (this.editor.usingStylus == true && ["pen", "mouse"].includes(event.pointerType) == false) {
      return;
    }
    event.preventDefault();
    
    //touch.force = the force of the touch - useful for later ;)

    await this.handleDraw(event, mouseX, mouseY);
  }
  async clickEnd(event) {
    if ((this.passthroughModule ?? {}).clickEnd != null) {
      this.passthroughModule.clickEnd(event);
    }
    if (this.annotation == null) {
      return;
    }
    let annotationRender = this.annotation.render;

    annotationRender.d = simplifyPath(annotationRender.d, 1 / (2.5 * Math.pow(Math.E, .5 * this.editor.zoom))); //.5 / this.editor.zoom
    if (this.STRAITEN_CHECK == true) {
      if (relativelyStraight(annotationRender.d, 5 * this.editor.zoom) == true) {
        annotationRender.d = [annotationRender.d[0], annotationRender.d[1], annotationRender.d[annotationRender.d.length - 2], annotationRender.d[annotationRender.d.length - 1]]; // Strait line
        if (horizontalLine(annotationRender.d) == true) {
          let averageY = (annotationRender.d[1] + annotationRender.d[3]) / 2;
          annotationRender.s[1] = annotationRender.t;
          annotationRender.p[1] = round(annotationRender.p[1] + averageY);
          annotationRender.d[1] = 0;
          annotationRender.d[3] = 0;
        }
      }
    }

    let maxX;
    let minX;
    let maxY;
    let minY;
    for (let i = 0; i < annotationRender.d.length; i++) {
      if (i % 2 == 0) {
        let x = annotationRender.d[i];
        maxX = Math.max(x, maxX ?? x);
        minX = Math.min(x, minX ?? x);
      } else {
        let y = annotationRender.d[i];
        maxY = Math.max(y, maxY ?? y);
        minY = Math.min(y, minY ?? y);
      }
    }
    if (maxX > annotationRender.s[0]) {
      annotationRender.s[0] = maxX;
    }
    if (maxY > annotationRender.s[1]) {
      annotationRender.s[1] = maxY;
    }
    if (minX < 0) {
      for (let i = 0; i < annotationRender.d.length; i += 2) {
        annotationRender.d[i] -= minX;
      }
      annotationRender.s[0] -= minX;
      annotationRender.p[0] += minX;
    }
    if (minY < 0) {
      for (let i = 1; i < annotationRender.d.length; i += 2) {
        annotationRender.d[i] -= minY;
      }
      annotationRender.s[1] -= minY;
      annotationRender.p[1] += minY;
    }

    await this.editor.save.push(annotationRender);
    await this.editor.history.push("remove", [{ _id: annotationRender._id }]);

    annotationRender.done = true;
    this.editor.realtimeSelect[annotationRender._id] = annotationRender;
    await this.editor.realtime.forceShort();
    
    this.disable();
  }
  touchstart(event) { // Added due to Safari
    if (this.graceful == true) {
      event.preventDefault();
    }
  }
  touchmove(event) {
    if (this.passthroughType != null && (this.passthroughModule ?? {}).touchmove != null) {
      return this.passthroughModule.touchmove(event);
    }
    if (this.editor.isEditorContent(event.target) != true) {
      return;
    }
    if (this.editor.options.stylusmode != true || stylusActive() == true || this.annotation != null) {
      event.preventDefault();
    }
  }
  contextmenu(event) {
    if (this.passthroughType != null) {
      event.preventDefault();
    }
  }
  async enable() {
    let toolPreference = this.toolbar.getToolPreference();
    this.MOUSE.color = toolPreference.color.selected;
    this.MOUSE.opacity = toolPreference.opacity;
    this.PUBLISH.c = toolPreference.color.selected;
    this.PUBLISH.o = toolPreference.opacity;

    this.graceful = true;
    await sleep(100);
    this.graceful = false;
  }
  disable() {
    if (this.annotation == null) {
      return;
    }
    if (this.annotation.render != null && this.annotation.render.done != true) {
      this.editor.realtimeSelect[this.annotation.render._id] = { remove: true };
      this.editor.realtime.forceShort();
      delete this.editor.realtimeSelect[this.annotation.render._id];
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
    this.editor.usingStylus = false;
  };
  async click(event) {
    if ((this.passthroughModule ?? {}).click != null) {
      await this.passthroughModule.click(event);
    }
  }
}