import { changeGlobalImports, setFrame, sleep } from "@/crucial";

import { BaseAnnotation } from "../BaseAnnotation";

import { Tool as UnlockTool } from "../../toolbar/actions/Unlock";
import { Tool as DeleteTool } from "../../toolbar/actions/Delete";

const widgets = changeGlobalImports(import.meta.glob("../widgets/*/index.js"));
const widgetsPath = "../widgets/";

export const loadWidgetModule = async (type) => {
  let moduleLoad = widgets[widgetsPath + type + "/index.js"];
  if (moduleLoad == null) {
    return;
  }
  if (typeof moduleLoad == "function") {
    moduleLoad = await moduleLoad();
  }
  return moduleLoad;
}

export class Annotation extends BaseAnnotation {
  CAN_FLIP = false;
  MIN_WIDTH = 200;
  MIN_HEIGHT = 200;

  ACTION_BAR_TOOLS = [UnlockTool, DeleteTool];

  CAN_SELECT = false; // Prevent selection while widget loading

  SELECTION_FUNCTION(selection) {
    if (["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      return { resizePreserveAspect: true };
    }
  }

  css = {
    ".eWidget": `color: var(--textColor) !important`,
    ".eWidget[loading]:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: all`,
    ".eWidgetContent": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; opacity: 1; border-radius: inherit; transition: .2s`,
    ".eWidget[loading] .eWidgetContent": `opacity: 0 !important`,
    ".eWidget .content": `width: 100%; height: 100%`
  };

  render() {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.classList.add("eAnnotation", "eWidget");
      this.element.innerHTML = `<div class="eWidgetContent"></div>`;
      this.holder.appendChild(this.element);
    }

    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }

    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";

    if (this.cache.widget != this.properties.d) {
      this.cache.widget = this.properties.d;

      let loadWidget = async () => {
        let widgetTemplate = ((await loadWidgetModule(this.properties.d)) ?? {}).Widget;
        
        if (widgetTemplate != null && this.element != null) {
          this.widgetModule = await setFrame(widgetTemplate, this.element.querySelector(".eWidgetContent"), {
            construct: {
              parent: this,
              editor: this.parent
            },
            showLoading: false
          });
          if (this.widgetModule.ACTION_BAR_TOOLS != null) {
            this.ACTION_BAR_TOOLS = [...this.widgetModule.ACTION_BAR_TOOLS, ...this.ACTION_BAR_TOOLS];
          }
          if (this.widgetModule.OPTIONS != null) {
            let optionKeys = Object.keys(this.widgetModule.OPTIONS);
            for (let i = 0; i < optionKeys.length; i++) {
              let key = optionKeys[i];
              this[key] = this.widgetModule.OPTIONS[key];
            }
          }
          if (this.widgetModule.render != null) {
            this.widgetModule.render();
          }
        }

        this.CAN_SELECT = true;
      }
      if (this.editor.exporting != true) {
        loadWidget();
      } else {
        this.editor.exportPromises.push(new Promise(async (resolve) => { resolve(await loadWidget()); }));
      }
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();

    if (this.widgetModule != null && this.widgetModule.render != null) {
      this.widgetModule.render();
    }
  }

  static async createWorker({ setup, editor, annotation }) {
    let widgetWorker = ((await loadWidgetModule(annotation.render.d)) ?? {}).Worker;
    if (widgetWorker != null) {
      setup(widgetWorker.NAME, widgetWorker);
    }
  }
}