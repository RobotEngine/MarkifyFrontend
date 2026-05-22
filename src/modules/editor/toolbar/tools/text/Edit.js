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
  async js(frame, event) {
    if (this.button == null || this.button.hasAttribute("hidden") == true) {
      return;
    }

    let preference = this.toolbar.getPreferenceTool();
    if (this.editor.utils.isLocked(preference) == true) {
      return;
    }

    let annotation = this.editor.annotations[preference._id];
    if (annotation == null) {
      return;
    }
    let quill = (annotation.component ?? {}).quill;
    if (quill == null) {
      return;
    }

    let annoElem = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[edit]");
    if (annoTx == null) {
      return;
    }

    let applyFormats = async (formats) => {
      await sleep(0);
      let keys = Object.keys(formats);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        quill.format(key, formats[key]);
      }
      this.toolbar.selection.updateActionBar({ refreshActionBar: true });
    }

    if (quill.isEnabled() == false) {
      let scrollLeft = annoElem.scrollLeft ?? 0;
      let scrollTop = annoElem.scrollTop ?? 0;
      
      quill.enable();
      quill.focus();

      if (scrollLeft > 0 || scrollTop > 0) {
        annoElem.scrollTo(scrollLeft, scrollTop);
      }

      if (event.clearText != true) {
        this.editor.text.startTextSelection(annoTx, event);
      } else {
        let content = (((annotation.render ?? {}).d ?? [])[0] ?? {});
        let isEquationTool = (content.insert ?? {}).formula != null;
        quill.deleteText(0, quill.getLength());
        quill.setSelection(0);
        if (isEquationTool == true) {
          quill.setContents([{ attributes: content.attributes ?? {}, insert: { formula: "" } }]);
        }
        await applyFormats(content.attributes ?? {});
        await this.toolbar.saveSelecting(() => { return { d: quill.getContents().ops }; }, { refreshActionBar: false, saveHistory: false });
        if (isEquationTool == true) {
          let element = (quill.getLeaf(1)[0] ?? {}).domNode;
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
      quill.disable();
    }

    this.toolbar.clearEventListeners();

    let saveHistory = true;
    let lastCaret = {};
    let setLastCaret = (position) => {
      let selection = quill.getSelection();
      if (selection == null) {
        lastCaret[position] = null;
        return;
      }
      lastCaret[position] = { index: selection.index, length: selection.length };
    }

    let lastFormatting = {};
    let textChange = async (delta, oldDelta, source) => {
      if (source != "user") {
        return;
      }

      let selection = quill.getSelection();

      let change = delta.ops[delta.ops.length - 1];
      if (change != null) {
        if (change.insert != null && change.insert == "\n" && selection != null) {
          let currentFormats = quill.getFormat(selection.index - 1, 1);
          await applyFormats(currentFormats);
        }
      }

      await sleep(0); // Tiny delay so text is finished updating

      preference = this.toolbar.getPreferenceTool();

      this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });

      let saveObj = { d: {} };
      if (this.editor.selecting[preference._id].d == null) {
        this.editor.selecting[preference._id].d = copyObject(preference.d ?? {});
      }
      let ops = quill.getContents().ops;
      saveObj.d = ops;
      if (preference.f == "sticky") {
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
        saveHistory = true;
        setLastCaret("undo");
      }
      if (hasInsert == true) {
        lastFormatting = quill.getFormat();
      } else if ((delta.ops[delta.ops.length - 1] ?? {}).delete != null && (selection ?? {}).length < 1) {
        await applyFormats(lastFormatting);
      }
      await this.toolbar.saveSelecting(() => { return saveObj; }, { reuseActionBar: true, refreshActionBar: false, saveHistory });
      if (saveHistory == true) {
        let lastHistory = this.editor.history.history[this.editor.history.location];
        if (lastHistory != null) {
          lastHistory.caret = lastHistory.caret ?? {};
          lastHistory.caret.undoPosition = lastCaret.undo;
          lastHistory.caret.redoPosition = lastCaret.redo;
        }
      }
      saveHistory = false;
    };
    this.toolbar.addQuillEventListener(quill, "text-change", textChange);

    let selectionChange = async (range, oldRange, source) => {
      if (range == null) {
        return;
      }
      
      if (range.length < 1 && source != "api") {
        let index = range.index;
        let direction = index - ((oldRange ?? {}).index ?? 0);
        if (direction < 0) {
          index++;
        }
        let element = (quill.getLeaf(index)[0] ?? {}).domNode;
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

      this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
    }
    this.toolbar.addQuillEventListener(quill, "selection-change", selectionChange);
    selectionChange();

    let keydownListener = (event) => {
      if (event == null) {
        return;
      }
      if ([8, 13, 32].includes(event.keyCode) == true) {
        setLastCaret("undo");
        saveHistory = true;
      }
    }
    this.toolbar.addEventListener("keydown", annoTx, keydownListener);

    let keyupListener = async () => {
      let lastHistory = this.editor.history.history[this.editor.history.location];
      if (lastHistory != null) {
        lastHistory.caret = lastHistory.caret ?? {};
        setLastCaret("redo");
        lastHistory.caret.redoPosition = lastCaret.redo;
      }
    }
    this.toolbar.addEventListener("keyup", annoTx, keyupListener);

    let focusInListener = async (event) => {
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
        await sleep();
      }
      this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
    }
    this.toolbar.addEventListener("focusin", annoTx, focusInListener);
    this.toolbar.addEventListener("mousedown", annoTx, focusInListener);

    let focusOutListener = async (event) => {
      await sleep();
      if (this.toolbar.selection.actionBar == null) {
        return;
      }
      await sleep();
      if (event.target == null || document.body.contains(event.target) == false) {
        this.toolbar.selection.actionBar.setAttribute("mode", "");
        this.toolbar.selection.closeActionFrame();
        this.toolbar.selection.updateActionBar({ refreshActionBar: true, redrawCurrentAction: true });
      }
    }
    this.toolbar.addEventListener("focusout", annoTx, focusOutListener);

    this.setActionButton();
  }
}