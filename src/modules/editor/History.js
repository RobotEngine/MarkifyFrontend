import { getEpoch, copyObject } from "@/crucial";

export class History {
  constructor(editor) {
    this.editor = editor;
  }

  history = [];
  location = -1;

  push(type, changes, caret) {
    if (this.history.length > 100) { // If longer than 100, remove the first item to shrink under
      this.history.shift();
      this.location--;
    }
    if (this.location + 1 < this.history.length) { // Clear out redo history once undo in past
      this.history = this.history.slice(0, this.location + 1);
    }

    let newHistory = {
      type: type,
      time: getEpoch(),
      changes: copyObject(changes),
      redo: []
    };
    if (caret != null) {
      newHistory.caret = {
        //undoElement: caret.undoElement,
        undoPosition: caret.undoPosition,
        //redoElement: caret.redoElement,
        redoPosition: caret.redoPosition
      };
    }
    this.history.push(newHistory);
    this.location++;

    this.editor.pipeline.publish("history_update", { history: this.history, location: this.location });
  }
  async undo() {
    if (this.editor.toolbar != null) {
      await this.editor.toolbar.selection.undo();
    }
  }
  async redo() {
    if (this.editor.toolbar != null) {
      await this.editor.toolbar.selection.redo();
    }
  }
}