import { sleep, copyObject } from "@/crucial";

import textEditIcon from "../../../icons/toolbar/textedit.svg?raw";

export class Tool {
  setActionButton(button) {
    if (button != null) {
      button.innerHTML = textEditIcon;
    }

    let preference = this.toolbar.getPreferenceTool();
    let quill = ((this.editor.annotations[preference._id] ?? {}).component ?? {}).quill;
    if (quill == null || (quill.isEnabled() == false && quill.keepTextSelectionActive != true)) {
      this.button.removeAttribute("selecthighlight");
    } else {
      if (this.editor.utils.isLocked(preference) == true) {
        quill.disable();
      }
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Edit Text";
  SUPPORTS_MULTIPLE_SELECT = false;
  FULL_CLICK = true;
  ADD_DIVIDE_AFTER = true;

  css = {
    '.eActionBar[mode="formula"] .eTool[hideformulamode]': `display: none !important`,
    '.eActionBar:not([mode="formula"]) .eTool[showformulamode]': `display: none !important`
  };

  applyFormats(formats) {
    let keys = Object.keys(formats);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      this.quill.format(key, formats[key]);
    }
    setTimeout(() => {
      this.toolbar.selection.updateActionBar({ refreshActionBar: true });
    }, 0);
  }

  saveHistory = true;
  lastCaret = {};
  setLastCaret(position) {
    let selection = this.quill.getSelection();
    if (selection == null) {
      this.lastCaret[position] = null;
      return;
    }
    this.lastCaret[position] = { index: selection.index, length: selection.length };
  }

  lastFormatting = {};
  async textChange(delta, oldDelta, source) {
    if (source != "user") {
      return;
    }

    let selection = this.quill.getSelection();

    let change = delta.ops[delta.ops.length - 1];
    if (change != null) {
      if (change.insert != null && change.insert == "\n" && selection != null) {
        let currentFormats = this.quill.getFormat(selection.index - 1, 1);
        setTimeout(() => {
          this.applyFormats(currentFormats);
        }, 0)
      }
    }

    //await sleep(0); // Tiny delay so text is finished updating

    this.preference = this.toolbar.getPreferenceTool();

    setTimeout(() => {
      this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
    }, 0);

    let saveObj = { d: {} };
    if (this.editor.selecting[this.preference._id].d == null) {
      this.editor.selecting[this.preference._id].d = copyObject(this.preference.d ?? {});
    }
    let ops = this.quill.getContents().ops;
    saveObj.d = ops;
    if (this.preference.f == "sticky") {
      saveObj.sig = this.editor.self.name;
    }
    let hasInsert = false;
    let onlyRetains = true;
    for (let i = 0; i < delta.ops.length; i++) {
      let oper = delta.ops[i];
      if (oper.retain == null) {
        onlyRetains = false;
      }
      if (oper.insert != null) {
        hasInsert = true;
      }
    }
    if (onlyRetains == true) {
      this.saveHistory = true;
      this.setLastCaret("undo");
    }
    if (hasInsert == true) {
      this.lastFormatting = this.quill.getFormat();
    } else if ((delta.ops[delta.ops.length - 1] ?? {}).delete != null && (selection ?? {}).length < 1) {
      this.applyFormats(this.lastFormatting);
    }
    await this.toolbar.saveSelecting(() => { return saveObj; }, { reuseActionBar: true, refreshActionBar: false, saveHistory: this.saveHistory });
    if (this.saveHistory == true) {
      let lastHistory = this.editor.history.history[this.editor.history.location];
      if (lastHistory != null) {
        lastHistory.caret = lastHistory.caret ?? {};
        lastHistory.caret.undoPosition = this.lastCaret.undo;
        lastHistory.caret.redoPosition = this.lastCaret.redo;
      }
    }
    this.saveHistory = false;
  };

  selectionChange(range, oldRange, source) {
    if (range == null) {
      return;
    }
    
    if (range.length < 1 && source != "api") {
      let index = range.index;
      let direction = index - ((oldRange ?? {}).index ?? 0);
      if (direction < 0) {
        index++;
      }
      let element = (this.quill.getLeaf(index)[0] ?? {}).domNode;
      if (element != null) {
        let mathquill = element.mathquillAPI;
        if (mathquill != null) {
          mathquill.focus();
          if (direction > 0) {
            mathquill.moveToLeftEnd();
          } else {
            mathquill.moveToRightEnd();
          }
        }
      }
    }

    setTimeout(() => {
      this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
    }, 0);
  }

  keydownListener(event) {
    if (event == null) {
      return;
    }
    if ([8, 13, 32].includes(event.keyCode) == true) {
      this.setLastCaret("undo");
      this.saveHistory = true;
    }
  }

  keyupListener(event) {
    let lastHistory = this.editor.history.history[this.editor.history.location];
    if (lastHistory != null) {
      lastHistory.caret = lastHistory.caret ?? {};
      this.setLastCaret("redo");
      lastHistory.caret.redoPosition = this.lastCaret.redo;
    }
  }

  focusInListener(event) {
    if (this.toolbar.selection.actionBar == null) {
      return;
    }
    let setMode;
    if (event.target.closest(".ql-formula") == null) {
      setMode = "";
    } else {
      setMode = "formula";
    }
    if (event.relatedTarget != null) {
      if (event.relatedTarget.closest(".eActionBar") != null) {
        return;
      }
    } else if (setMode == "" && event.type != "mousedown") {
      return;
    }
    if (setMode != this.toolbar.selection.actionBar.getAttribute("mode")) {
      this.toolbar.selection.actionBar.setAttribute("mode", setMode);
      this.toolbar.selection.closeActionFrame();
    }
    setTimeout(() => {
      this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
    }, 0);
  }

  focusOutListener(event) {
    setTimeout(() => {
      if (this.toolbar.selection.actionBar == null) {
        return;
      }
      if (event.target == null || document.body.contains(event.target) == false) {
        this.toolbar.selection.actionBar.setAttribute("mode", "");
        this.toolbar.selection.closeActionFrame();
        this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
      }
    }, 0);
  }
  
  async js(frame, event) {
    if (this.button == null || this.button.hasAttribute("hidden") == true) {
      return;
    }

    this.preference = this.toolbar.getPreferenceTool();
    if (this.editor.utils.isLocked(this.preference) == true) {
      return;
    }

    this.annotation = this.editor.annotations[this.preference._id];
    if (this.annotation == null) {
      return;
    }
    this.quill = (this.annotation.component ?? {}).quill;
    if (this.quill == null) {
      return;
    }

    let annoElem = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + this.preference._id + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[edit]");
    if (annoTx == null) {
      return;
    }

    if (this.quill.isEnabled() == false) {
      let scrollLeft = annoElem.scrollLeft ?? 0;
      let scrollTop = annoElem.scrollTop ?? 0;
      
      this.quill.enable();
      this.quill.focus();

      if (scrollLeft > 0 || scrollTop > 0) {
        annoElem.scrollTo(scrollLeft, scrollTop);
      }

      if (event.clearText != true) {
        this.editor.text.startTextSelection(annoTx, event);
      } else {
        let content = (((this.annotation.render ?? {}).d ?? [])[0] ?? {});
        let isEquationTool = (content.insert ?? {}).formula != null;
        this.quill.deleteText(0, this.quill.getLength());
        this.quill.setSelection(0);
        if (isEquationTool == true) {
          this.quill.setContents([{ attributes: content.attributes ?? {}, insert: { formula: "" } }]);
        }
        this.applyFormats(content.attributes ?? {});
        await this.toolbar.saveSelecting(() => { return { d: this.quill.getContents().ops }; }, { refreshActionBar: false, saveHistory: false });
        if (isEquationTool == true) {
          let element = (this.quill.getLeaf(1)[0] ?? {}).domNode;
          if (element != null) {
            let mathquill = element.mathquillAPI;
            if (mathquill != null) {
              mathquill.focus();
              mathquill.moveToLeftEnd();
            }
          }
          this.toolbar.selection.actionBar.setAttribute("mode", "formula");
          this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
        }
      }
    } else {
      this.quill.disable();
    }

    this.toolbar.clearEventListeners();

    this.toolbar.addQuillEventListener(this.quill, "text-change", (delta, oldDelta, source) => { this.textChange(delta, oldDelta, source); });

    this.toolbar.addQuillEventListener(this.quill, "selection-change", (range, oldRange, source) => { this.selectionChange(range, oldRange, source); });
    this.selectionChange();

    this.toolbar.addEventListener("keydown", annoTx, (event) => { this.keydownListener(event); });

    this.toolbar.addEventListener("keyup", annoTx, () => { this.keyupListener(); });

    this.toolbar.addEventListener("focusin", annoTx, (event) => { this.focusInListener(event); });
    this.toolbar.addEventListener("mousedown", annoTx, (event) => { this.focusInListener(event); });

    this.toolbar.addEventListener("focusout", annoTx, (event) => { this.focusOutListener(event); });

    this.setActionButton();
  }
}