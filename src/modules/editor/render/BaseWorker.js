
/*
start() {}
destroy() {}
onAnnotationRender(annotation) {}
onAnnotationCreate(annotation) {}
onAnnotationDestroy(annotation) {}
onAnnotationAdd(annotation) {}
onAnnotationUpdate(annotation, event) {}
onAnnotationRemove(annotation) {}
*/

export class BaseWorker {
  widgetButtons = {};

  canAddWidgetButton() {
    return this.editor.widgetDrawer != null;
  }
  addWidgetButton(id, content) {
    if (this.editor.widgetDrawer == null) {
      return;
    }
    let button = this.widgetButtons[id];
    if (button != null) {
      button.innerHTML = content;
      return;
    }
    let newButton = document.createElement("button");
    this.widgetButtons[id] = newButton;
    newButton.className = "eWidgetDrawerButton";
    newButton.setAttribute("widget", this.id);
    if (content != null) {
      newButton.innerHTML = content;
    }
    this.editor.widgetDrawer.appendChild(newButton);
    this.editor.widgetDrawer.removeAttribute("hidden");
    return newButton;
  }
  removeWidgetButton(id) {
    let button = this.widgetButtons[id];
    if (button != null) {
      delete this.widgetButtons[id];
      button.remove();
    }
    if (this.editor.widgetDrawer != null && this.editor.widgetDrawer.childElementCount < 1) {
      this.editor.widgetDrawer.setAttribute("hidden", "");
    }
  }
  removeAllWidgetButtons() {
    let buttonKeys = Object.keys(this.widgetButtons);
    for (let i = 0; i < buttonKeys.length; i++) {
      let button = this.widgetButtons[buttonKeys[i]];
      if (button != null) {
        button.remove();
      }
    }
    if (this.editor.widgetDrawer != null && this.editor.widgetDrawer.childElementCount < 1) {
      this.editor.widgetDrawer.setAttribute("hidden", "");
    }
  }

  subscribe(event, callback, extra) {
    this.parent.pipeline.subscribe("worker_" + this.id, event, callback, extra);
  }
  unsubscribe(event) {
    this.parent.pipeline.unsubscribe("worker_" + this.id, event);
  }

  remove() {
    if (this.destroy != null) {
      this.destroy();
    }
    this.parent.pipeline.unsubscribe("worker_" + this.id);
    this.removeAllWidgetButtons();
  }
}