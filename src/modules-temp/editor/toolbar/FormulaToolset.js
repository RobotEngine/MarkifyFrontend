import { getObject } from "@/crucial";

const icons = import.meta.glob("../icons/toolbar/formula/**/*.svg", { query: "?raw" });
const iconPath = "../icons/toolbar/formula/";
const iconCache = new Map();

const setIcon = async (element, name) => {
  let path = iconPath + name + ".svg";

  let iconFunction = icons[path];
  if (iconFunction == null) {
    return;
  }

  if (iconCache.has(path) == false) {
    iconCache.set(path, iconFunction()); 
  }

  let iconLoader = await iconCache.get(path);
  if (element != null && (iconLoader ?? {}).default != null) {
    element.innerHTML = iconLoader.default;
  }
}

export class FormulaToolset {
  setActionButton(button) {
    setIcon(button, this.FORMULA_TYPE + "/" + this.FORMULA_TYPE);
  }

  SUPPORTS_MULTIPLE_SELECT = false;
  ATTRIBUTES = { showformulamode: "" };

  js(frame) {
    let toolHolder = frame.querySelector(".eHorizontalToolsHolder");

    let mathquill;
    let quill;
    this.redraw = () => {
      let preferenceTool = this.toolbar.getPreferenceTool();
      let annotation = this.editor.annotations[preferenceTool._id];
      if (annotation != null) {
        let component = annotation.component ?? {};
        quill = component.quill;
        if (quill != null) {
          let selection = quill.getSelection();
          if (selection != null && quill.isEnabled() == true) {
            let element = (quill.getLeaf(selection.index + 1)[0] ?? {}).domNode;
            if (element != null) {
              mathquill = element.mathquillAPI;
            }
          }
        }
      }
    }
    this.redraw();

    let toolObject = getObject(this.TOOLS, "key");

    toolHolder.addEventListener("click", (event) => {
      let toolButton = event.target.closest(".eTool");
      if (toolButton == null) {
        return;
      }
      let toolData = toolObject[toolButton.getAttribute("tool")] ?? {};
      if (mathquill != null) {
        if (toolData.command != null) {
          mathquill.cmd(toolData.command);
        } else if (toolData.write != null) {
          mathquill.write(toolData.write);
        }
        mathquill.focus();
        if (toolData.moveLeft == true) {
          mathquill.keystroke("Left");
        }
      }
    });

    toolHolder.innerHTML = "";
    for (let i = 0; i < this.TOOLS.length; i++) {
      let tool = this.TOOLS[i];
      toolHolder.insertAdjacentHTML("beforeend", `<button class="eTool" option new><div></div></button>`);
      let toolButton = toolHolder.querySelector(".eTool[new]");
      toolButton.removeAttribute("new");
      toolButton.setAttribute("tool", tool.key);
      toolButton.setAttribute("tooltip", tool.tooltip);
      setIcon(toolButton.querySelector("div"), this.FORMULA_TYPE + "/" + tool.key);
    }
  }
}