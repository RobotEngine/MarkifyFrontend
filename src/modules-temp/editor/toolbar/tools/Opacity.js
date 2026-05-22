import { mouseDown, clientPosition } from "@/crucial";

import { borderColorBackgroundRGBA } from "../../utils/border-color-background-rgba";
import { rgbToHex } from "../../utils/rgb-to-hex";

import opacityIcon from "../../icons/toolbar/opacity.svg?raw";

export class Tool {
  TOOLTIP = "Opacity";
  USER_SELECT = "none";

  minValue = 10;
  maxValue = 100;

  setToolbarButton(button) {
    button.innerHTML = `<div class="eSubToolOpacityHolder">${opacityIcon}</div>`;
    let opacity = button.querySelector(".eSubToolOpacityHolder");
    if (opacity != null) {
      let svg = opacity.querySelector("svg");
      if (svg != null) {
        let preference = this.toolbar.getToolPreference();
        let selectedColor = (preference.color ?? {}).selected;
        let selectedOpacity = preference.opacity / 100;
        svg.querySelector("path").style.opacity = selectedOpacity;
        svg.style.setProperty("--toolColor", "#" + selectedColor);
        svg.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(selectedColor, null, selectedOpacity);
      }
    }
  }
  setActionButton(button) {
    button.innerHTML = `<div class="eSubToolOpacityHolder">${opacityIcon}</div>`;
    let opacity = button.querySelector(".eSubToolOpacityHolder");
    if (opacity != null) {
      let svg = opacity.querySelector("svg");
      if (svg != null) {
        let preference = this.toolbar.getPreferenceTool();
        let selectedColor = preference.c ?? "228EF2";
        let selectedOpacity = (preference.o ?? 100) / 100;
        let annotation = this.editor.annotations[preference._id];
        if (annotation != null) {
          let component = annotation.component ?? {};
          let quill = component.quill;
          if (quill != null && Object.keys(this.editor.selecting).length == 1 && component.ALLOW_RICHTEXT_COLOR != false) {
            let selection = quill.getSelection();
            let attributes;
            if (selection != null) {
              let content = quill.getContents(selection.index, Math.max(selection.length, 1)) ?? {};
              if (content.ops == null || content.ops.length > 1 || (content.ops[0].insert ?? {}).formula == null) {
                attributes = quill.getFormat(selection.index, selection.length);
              } else {
                attributes = quill.getFormat(selection.index, 1);
              }
            } else {
              attributes = quill.getFormat(0, quill.getLength());
            }
            if (attributes.color != null) {
              if (Array.isArray(attributes.color) == true) {
                attributes.color = attributes.color[0];
              }
              if (attributes.color.startsWith("rgb(") == true) {
                let rgbValues = attributes.color.match(/\d+/g);
                selectedColor = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]).toUpperCase();
              } else if (attributes.color.startsWith("#") == true) {
                selectedColor = attributes.color.substring(1).toUpperCase();
              }
            }
            if (attributes.opacity != null) {
              selectedOpacity = (attributes.opacity ?? 100) / 100;
            }
          }
        }
        svg.querySelector("path").style.opacity = selectedOpacity;
        svg.style.setProperty("--toolColor", "#" + selectedColor);
        svg.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(selectedColor, null, selectedOpacity);
      }
    }
  }

  html = `
  <div class="eSubToolOpacityFrame">
    <input class="eSubToolOpacityInput" name="Thickness">
    <div class="eSubToolOpacitySlider"><button></button></div>
  </div>
  `;
  css = {
    ".eSubToolOpacityHolder": `box-sizing: border-box; display: flex; width: 34px; height: 34px; margin: 4px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 18px; justify-content: center; align-items: center`,
    ".eSubToolOpacityHolder svg": `width: 100%; height: 100%; border-radius: 14px`,

    ".eSubToolOpacityFrame": `box-sizing: border-box; display: flex; width: 188px; height: 50px; padding: 8px; align-items: center`,
    ".eSubToolOpacityInput": `width: 40px; height: 26px; background: unset; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolOpacitySlider": `position: relative; flex: 1; height: 10px; margin: 0 4px 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolOpacitySlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolOpacitySlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolOpacitySlider button:active": `transform: scale(1.1) !important`
  };
  js(frame) {
    let editor = this.editor;
    let toolbar = this.toolbar;
    let isToolbar = this.isToolbar;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool;
    let opacityPreference;
    let selectedOpacity;
    let updatePreference = () => {
      preferenceTool = toolbar.getPreferenceTool();
      opacityPreference = toolbar.getAnnotationPreference().opacity ?? toolbar.getToolPreference().opacity;
      selectedOpacity = opacityPreference;
      if (preferenceTool.t != null) {
        selectedOpacity = preferenceTool.o;
      }
    }
    updatePreference();

    let slider = frame.querySelector(".eSubToolOpacitySlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolOpacityInput");
    let sliderEnabled = false;
    let typing = false;
    let firstChange;
    let updateUI = async (updateVal, noPref) => {
      if (shouldSave == true && noPref != true) {
        toolbar.setToolPreference("opacity", selectedOpacity);
      }
      let percentage = Math.pow(((selectedOpacity - this.minValue) / (this.maxValue - this.minValue)), 1 / (this.exponentFactor ?? 1));
      pointer.style.left = ((slider.offsetWidth - 10) * percentage) - 6 + "px";
      if (updateVal != false) {
        input.value = selectedOpacity;
      }
      if (noPref != true) {
        if (isToolbar == true) {
          toolbar.toolbar.updateButtons();
          toolbar.activateTool();
        } else {
          await toolbar.saveSelecting(() => { return { o: selectedOpacity } }, { saveHistory: firstChange });
          firstChange = false;
        }
      }
    }
    this.redraw = () => {
      if (sliderEnabled == true || typing == true) {
        return;
      }
      updatePreference();
      updateUI();
    };
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || slider == null) {
        sliderEnabled = false;
        editor.pipeline.unsubscribe("opacitySelectorMouse");
        return;
      }
      let barRect = slider.getBoundingClientRect();
      let newOpacity = Math.ceil(Math.pow((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0)), this.exponentFactor ?? 1) * (this.maxValue - this.minValue) + this.minValue);
      if (selectedOpacity != newOpacity) {
        selectedOpacity = newOpacity;
        updateUI();
      }
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      firstChange = true;
      eventBarUpdate(event);
      editor.pipeline.subscribe("opacitySelectorMouse", "click_move", (data) => { eventBarUpdate(data.event); });
      editor.pipeline.subscribe("opacitySelectorMouse", "click_end", (data) => { eventBarUpdate(data.event); });
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", enableSlider, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedOpacity;
      typing = true;
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedOpacity;
      typing = false;
    });
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedOpacity = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedOpacity = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
}