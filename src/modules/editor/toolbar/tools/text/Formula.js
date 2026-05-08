import { alert as alertModule } from "@modules/utility/Alert";

import formulaIcon from "../../../icons/toolbar/formula/formula.svg?raw";

export class Tool {
  setActionButton(button) {
    button.innerHTML = formulaIcon;
  }

  TOOLTIP = "Formula";
  SUPPORTS_MULTIPLE_SELECT = false;
  ATTRIBUTES = { hideformulamode: "" };
  ADD_TOOLBAR_TOOLS = ["formula/operations", "formula/algebra", "formula/calculus", "formula/constants", "formula/relations", "formula/notation"];

  js() {
    let preference = this.toolbar.getPreferenceTool();
    let annotation = this.editor.annotations[preference._id];
    if (annotation == null) {
      return;
    }
    let quill = (annotation.component ?? {}).quill;
    if (quill == null) {
      return;
    }
    if (quill.isEnabled() == false) {
      return alertModule.open("warning", "<b>Start Editing Text</b>Place your cursor inside the text box to insert a formula.");
    }
    let selection = quill.getSelection() ?? {};
    let index = selection.index ?? 0;
    let format = quill.getFormat();
    quill.insertEmbed(index, "formula", "", "user");
    quill.formatText(index, 1, format, "user");
    setTimeout(() => {
      let element = (quill.getLeaf(index + 1)[0] ?? {}).domNode;
      if (element != null) {
        let mathquill = element.mathquillAPI;
        if (mathquill != null) {
          mathquill.focus();
          mathquill.moveToLeftEnd();
        }
      }
    }, 0);
  }
}