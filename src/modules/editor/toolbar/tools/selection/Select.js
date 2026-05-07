import { alert as alertModule } from "@modules/utility/Alert";

export class Tool {
  async clickStart(event) {
    if (event.which === 3 || event.button === 2 || this.editor.pinching == true) {
      return;
    }
    let target = event.target;
    this.lastTarget = target;
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eActionBar") != null) {
      return this.toolbar.selection.clickAction(event, { clickStart: true });
    }
    let annotation = target.closest(".eAnnotation");
    let annoID;
    let original;
    let render;
    if (annotation != null) {
      annoID = annotation.getAttribute("anno");
      original = this.editor.annotations[annoID] ?? {};
      render = original.render;
      if (render == null) {
        return;
      }
      if (annotation.querySelector("div[edit]") != null && annotation.querySelector("div[edit]").closest(".eAnnotation") == annotation && annotation.querySelector('div[contenteditable="true"]') != null) {
        return;
      }
      if (this.editor.selecting[annoID] != null) {
        if (target.closest("div[label]") != null && annotation.querySelector("div[label]").closest(".eAnnotation") == annotation && this.editor.utils.isLocked(render) != true) {
          if (target.closest("div[label]").getAttribute("contenteditable") != "true") {
            this.toolbar.selection.clickAction({
              target: this.editor.page.querySelector('.eActionBar:not([remove]) .eTool[module="editor/toolbar/settitle"]')
            });
          }
          return;
        }
        if (render.f == "embed" && target.closest("div[input]") != null && annotation.querySelector("div[input]").closest(".eAnnotation") == annotation && this.editor.utils.isLocked(render) != true) {
          if (render.embed == null) {
            this.toolbar.selection.clickAction({
              target: this.editor.page.querySelector('.eActionBar:not([remove]) .eTool[module="editor/toolbar/setembed"]')
            });
          }
          return;
        }
      }
    }

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    this.startX = mouseX;
    this.startY = mouseY;
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    if (this.toolbar.selection.pointInSelectBox(position.x, position.y) == true) {
      return await this.toolbar.selection.startAction(event);
    }
    if (target.closest(".eSelect") == null) {
      if (this.toolbar.selection.currentActionModule != null && this.toolbar.selection.currentActionModule.finish != null) {
        await this.toolbar.selection.currentActionModule.finish();
      }
      if (event.shiftKey == false) {
        await this.editor.utils.resetSelecting();
        if (annotation == null) {
          return this.toolbar.selection.updateBox();
        }
      }
      if (render != null && this.editor.selecting[annoID] == null) {
        let module = (await this.editor.render.getModule(original, render.f)) ?? {};
        if (module.HOLD_FOR_SELECT != true || target.closest("[selectable]") != null) {
          this.wasSelected = annoID;
          this.editor.selecting[annoID] = {};
        }
      }
    }
    await this.toolbar.selection.updateBox();
    await this.toolbar.selection.startAction(event);
  }
  async clickMove(event) {
    await this.toolbar.selection.moveAction(event);
  }
  async clickEnd(event) {
    await this.toolbar.selection.endAction();

    let target = this.lastTarget ?? event.target;
    this.lastTarget = null;
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    await this.toolbar.selection.clickAction(event, { clickEnd: true });
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eSelect") != null) {
      return;
    }
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    if (Math.floor(mouseX - this.startX) == 0 && Math.floor(mouseY - this.startY) == 0) {
      let annotation = target.closest(".eAnnotation");
      if (annotation == null) {
        return;
      }
      let annoID = annotation.getAttribute("anno");
      let component = this.editor.annotations[annoID] ?? {};
      let render = component.render;
      if (render == null) {
        return;
      }
      let annoModule = (await this.editor.render.getModule(component, render.f)) ?? {};
      if (this.editor.utils.canMemberModify(render) == false && this.editor.self.access > 0 && annoModule.IGNORE_LOCKED_WARNING != true) {
        alertModule.close(this.toolbar.someoneElsesAnnoWarning);
        this.toolbar.someoneElsesAnnoWarning = await alertModule.open("warning", "<b>Annotation is Locked</b>Only the author may edit collaborator locked annotations.");
      }
      if (event.shiftKey == true) {
        if (this.wasSelected != annoID && this.editor.selecting[annoID] != null) {
          delete this.editor.selecting[annoID];
        } else {
          this.editor.selecting[annoID] = {};
        }
      } else {
        this.editor.selecting = {};
        this.editor.selecting[annoID] = {};
      }
      if (this.wasSelected == null && annotation.querySelector("div[edit]") != null && annotation.querySelector("div[edit]").closest(".eAnnotation") == annotation && annotation.querySelector('div[contenteditable="true"]') == null) {
        this.toolbar.selection.clickAction({
          target: this.editor.page.querySelector('.eActionBar:not([remove]) .eTool[module="editor/toolbar/textedit"]'),
          setCaretPosition: true,
          clientX: event.clientX,
          clientY: event.clientY
        });
      }
    }
    this.toolbar.selection.updateBox();
    this.wasSelected = null;
  }
  async scroll() {
    await this.toolbar.selection.moveAction();
    await this.toolbar.selection.updateActionBar();
  }
  async click(event) {
    await this.toolbar.selection.clickAction(event, { clickEvent: true });
    await this.toolbar.selection.interactRun(event.target);
  }
}