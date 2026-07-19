import { mouseDown, sleep, copyObject } from "@/crucial";

import { rotatedBounds } from "../../../math";

import dragCursor from "../../../icons/cursors/cursor.svg?raw";

export class Tool {
  USER_SELECT = "none";
  TOUCH_ACTION = "none";
  MOUSE = { type: "svg", svg: dragCursor, translate: { x: 22, y: 22 } };

  css = {
    ".eSelectDrag": `position: absolute; box-sizing: border-box; pointer-events: none; z-index: 99; opacity: .4; background: var(--secondary); border: solid 2px var(--theme); border-radius: 10px; transition: opacity .1s`
  };

  async clickStart(event) {
    if (event.which === 3 || event.button === 2) {
      return;
    }
    let target = event.target;
    if (
      target.closest("button") != null
      || target.closest("a") != null
      || target.closest("[noselect]") != null
      || target.closest(".eActionBar") != null
    ) {
      return this.toolbar.selection.clickAction(event, { clickStart: true });
    }
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    await this.toolbar.selection.startAction(event);
    if (target.closest(".eSelect") != null) {
      return;
    }
    let annotation = target.closest(".eAnnotation");
    let annoID;
    let render;
    if (annotation != null) {
      annoID = annotation.getAttribute("anno");
      render = (this.editor.annotations[annoID] ?? {}).render;
      if (render == null) {
        return;
      }
    }

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    this.startX = position.x;
    this.startY = position.y;
    if (this.toolbar.selection.pointInSelectBox(this.startX, this.startY) == true && event.shiftKey == false) {
      return;
    }

    if (annoID != null) {
      if (this.editor.selecting[annoID] != null) {
        return this.clickEnd();
      }
      this.wasSelected = annoID;
    }
    if (event.shiftKey == false) {
      this.editor.selecting = {};
    }

    this.clickEnd();
    this.toolbar.toolbar.closeSubSub(true);

    let content = this.editor.contentHolder.querySelector(".eContent");
    content.insertAdjacentHTML("beforeend", `<div class="eSelectDrag" tooleditor new></div>`);
    this.selection = content.querySelector(".eSelectDrag[new]");
    this.selection.removeAttribute("new");

    this.toolbar.selection.hideSelectBox = true;

    this.prevSelecting = copyObject(this.editor.selecting);
    await this.toolbar.selection.updateBox();
    this.clickMove(event);
  }
  async setScrollInterval() {
    if (this.scrollIntervalRunning == true) {
      return;
    }
    this.scrollIntervalRunning = true;
    while (this.selection != null && (this.scrollIntervalX != 0 || this.scrollIntervalY != 0)) {
      this.editor.scrollTo(
        this.editor.scrollLeft + this.scrollIntervalX,
        this.editor.scrollTop + this.scrollIntervalY
      );
      await this.clickMove(this.scrollLastEvent, true);
      await sleep(10);
    }
    this.scrollIntervalRunning = false;
  }
  async clickMove(event, fromScrollInterval) {
    if (this.selection == null) {
      return await this.toolbar.selection.moveAction(event);
    }
    if (mouseDown() == false || this.editor.pinching == true) {
      return this.clickEnd();
    }

    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.mouseX = mouseX;
      this.mouseY = mouseY;

      // Handle Scroll with Mouse:
      if (fromScrollInterval != true) {
        let scrollOffset = 32;
        this.scrollIntervalX = 0;
        this.scrollIntervalY = 0;
        let leftPos = scrollOffset - mouseX;
        if (leftPos > 0) {
          let percentage = 1 + ((leftPos - scrollOffset) / scrollOffset);
          this.scrollIntervalX = -Math.min(10 * percentage, 10);
        }
        let rightPos = mouseX - this.editor.page.offsetWidth + scrollOffset;
        if (rightPos > 0) {
          let percentage = 1 + ((rightPos - scrollOffset) / scrollOffset);
          this.scrollIntervalX = Math.min(10 * percentage, 10);
        }
        let topPos = scrollOffset - mouseY;
        if (topPos > 0) {
          let percentage = 1 + ((topPos - scrollOffset) / scrollOffset);
          this.scrollIntervalY = -Math.min(10 * percentage, 10);
        }
        let bottomPos = mouseY - this.editor.page.offsetHeight + scrollOffset;
        if (bottomPos > 0) {
          let percentage = 1 + ((bottomPos - scrollOffset) / scrollOffset);
          this.scrollIntervalY = Math.min(10 * percentage, 10);
        }
        this.scrollLastEvent = event;
        if (this.scrollIntervalX != 0 || this.scrollIntervalY != 0) {
          return this.setScrollInterval();
        }
      }
    }

    let { x, y } = await this.editor.utils.scaleToDoc(this.mouseX, this.mouseY);
    let selectWidth = 0;
    let selectHeight = 0;
    let topLeftX = 0;
    let topLeftY = 0;
    if (x > this.startX) {
      selectWidth = x - this.startX;
      topLeftX = this.startX;
      if (y > this.startY) {
        selectHeight = y - this.startY;
        topLeftY = this.startY;
        this.selection.style.borderRadius = "10px 10px 0px 10px";
      } else {
        selectHeight = this.startY - y;
        topLeftY = y;
        this.selection.style.borderRadius = "10px 0px 10px 10px";
      }
    } else {
      selectWidth = this.startX - x;
      topLeftX = x;
      if (y > this.startY) {
        selectHeight = y - this.startY;
        topLeftY = this.startY;
        this.selection.style.borderRadius = "10px 10px 10px 0px";
      } else {
        selectHeight = this.startY - y;
        topLeftY = y;
        this.selection.style.borderRadius = "0px 10px 10px 10px";
      }
    }
    let annotationRect = this.editor.utils.annotationsRect();
    this.selection.style.width = (selectWidth * this.editor.zoom) + "px";
    this.selection.style.height = (selectHeight * this.editor.zoom) + "px";
    this.selection.style.left = annotationRect.left + (topLeftX * this.editor.zoom) + this.editor.scrollLeft + "px";
    this.selection.style.top = annotationRect.top + (topLeftY * this.editor.zoom) + this.editor.scrollTop + "px";

    let selectionChange = false;
    let currentSelections = Object.keys(this.editor.selecting);
    let setSelecting = copyObject(this.prevSelecting);

    let bottomRightX = topLeftX + selectWidth;
    let bottomRightY = topLeftY + selectHeight;
    let chunkAnnotations = this.editor.utils.annotationsInChunks(this.editor.utils.regionInChunks(topLeftX, topLeftY, bottomRightX, bottomRightY));
    for (let i = 0; i < chunkAnnotations.length; i++) {
      let annotation = chunkAnnotations[i];
      /*if (annotation.pointer != null) {
        annotation = editor.annotations[annotation.pointer];
      }*/
      let render = annotation.render;
      if (render == null) {
        continue;
      }
      if (this.editor.utils.canMemberModify(render) == false) {
        continue;
      }
      if (render.remove == true) {
        continue;
      }

      let annotationModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annotationModule.CAN_SELECT == false || annotationModule.CAN_DRAG_SELECT == false) {
        continue;
      }
      let { x, y, endX, endY, rotation, selectingParent } = this.editor.utils.getRect(render);
      if (selectingParent == true) {
        continue;
      }
      let [boundsTopLeftX, boundsTopLeftY, boundsBottomRightX, boundsBottomRightY] = rotatedBounds(x, y, endX, endY, rotation);

      if (annotationModule.SELECT_BOX_COVER != true) { // Part in bounds:
        if (!(boundsTopLeftX < bottomRightX && boundsBottomRightX > topLeftX && boundsTopLeftY < bottomRightY && boundsBottomRightY > topLeftY)) {
          continue;
        }
      } else { // Entire thing in bounds:
        if (boundsTopLeftX < topLeftX || boundsTopLeftY < topLeftY || boundsBottomRightX > bottomRightX || boundsBottomRightY > bottomRightY) {
          continue;
        }
      }

      if (setSelecting[render._id] == null) {
        setSelecting[render._id] = {};
        let currentSelectIndex = currentSelections.indexOf(render._id);
        if (currentSelectIndex > -1) {
          currentSelections.splice(currentSelectIndex, 1);
        } else {
          selectionChange = true;
        }
      }
    }

    this.editor.selecting = setSelecting;

    if (selectionChange == true || currentSelections.length > 0) {
      this.toolbar.selection.updateBox({ hideSelectBox: true });
    }
  }
  async clickEnd(event) {
    if (this.selection != null) {
      let remSelect = this.selection;
      this.selection = null;
      remSelect.style.opacity = 0;
      (async () => {
        await sleep(150);
        remSelect.remove();
      })();
    }
    this.toolbar.selection.hideSelectBox = false;
    if (event != null) {
      await this.toolbar.selection.endAction(event);

      let target = event.target;
      if (target == null) {
        return;
      }
      if (this.editor.isThisPage(target) != true) {
        return;
      }
      await this.toolbar.selection.clickAction(event, { clickEnd: true });
      if (target.closest(".eActionBar") != null) {
        return;
      }
      if (
        target.closest("button") != null
        || target.closest("a") != null
        || target.closest("[noselect]") != null
      ) {
        return this.toolbar.selection.updateBox();
      }
      let annotation = target.closest(".eAnnotation");
      let annoID;
      let render;
      if (annotation != null) {
        annoID = annotation.getAttribute("anno");
        render = (this.editor.annotations[annoID] ?? {}).render;
      }
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
      if (Math.floor(position.x - this.startX) == 0 && Math.floor(position.y - this.startY) == 0) {
        if (render == null) {
          return;
        }
        if (this.wasSelected != annoID && this.editor.selecting[annoID] != null) {
          delete this.editor.selecting[annoID];
        }
      }
      this.toolbar.selection.updateBox();
      this.wasSelected = null;
    }
  }
  touchmove(event) {
    let target = event.target;
    if (this.editor.isEditorContent(target) != true) { //this.isPassthrough == true && 
      return;
    }
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eActionBar") != null) {
      return;
    }
    event.preventDefault();
  }
  async scroll() {
    await this.clickMove();
    await this.toolbar.selection.moveAction();
    await this.toolbar.selection.updateActionBar({ hideSelectBox: this.selection != null });
  }
  async click(event) {
    await this.toolbar.selection.clickAction(event, { clickEvent: true });
    await this.toolbar.selection.interactRun(event.target);
  }
  async disable() { return await this.clickEnd(); };
}