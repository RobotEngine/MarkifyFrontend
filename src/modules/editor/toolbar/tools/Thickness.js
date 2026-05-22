import { mouseDown, clientPosition } from "@/crucial";

import { borderColorBackgroundRGBA } from "../../utils/border-color-background-rgba";

export class Tool {
  TOOLTIP = "Thickness";
  USER_SELECT = "none";

  minValue = 1;
  maxValue = 40;
  exponentFactor = 1.4;

  setToolbarButton(button) {
    button.innerHTML = `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThicknessHolder"><div class="eSubToolThickness"></div></div></div>`;
    let thickness = button.querySelector(".eSubToolThickness");
    let preference = this.toolbar.getToolPreference();
    let selectedColor = (preference.color ?? {}).selected;
    let selectedOpacity = preference.opacity / 100;
    thickness.style.background = "#" + selectedColor;
    thickness.style.width = "44px";
    thickness.style.height = preference.thickness + "px";
    thickness.style.opacity = selectedOpacity;
    thickness.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(selectedColor);
  }
  setActionButton(button) {
    button.innerHTML = `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThicknessHolder"><div class="eSubToolThickness"></div></div></div>`;
    let holder = button.querySelector(".eSubToolThicknessHolder");
    let thickness = holder.querySelector(".eSubToolThickness");
    let preference = this.toolbar.getPreferenceTool();
    let selectedOpacity = (preference.o ?? 100) / 100;
    thickness.style.background = "#" + preference.c;
    thickness.style.width = preference.t + "px";
    thickness.style.height = "44px";
    thickness.style.opacity = selectedOpacity;
    thickness.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(preference.c);
  }
  
  html = `
  <div class="eSubToolThicknessFrame">
    <input class="eSubToolThicknessInput" name="Thickness">
    <div class="eSubToolThicknessSlider"><button></button></div>
  </div>
  `;
  css = {
    ".eSubToolThicknessButtonHolder": `position: relative; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; overflow: hidden`,
    ".eSubToolThicknessHolder": `position: absolute; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 14px`,
    ".eToolbarHolder[left] .eSubToolThicknessHolder": `margin-right: 16px`,
    ".eToolbarHolder[right] .eSubToolThicknessHolder": `margin-left: 16px`,
    ".eActionBar[top] .eSubToolThicknessHolder": `margin-top: 16px`,
    ".eActionBar[bottom] .eSubToolThicknessHolder": `margin-bottom: 16px`,
    ".eSubToolThickness": `border-radius: 10px`,

    ".eSubToolThicknessFrame": `box-sizing: border-box; display: flex; width: 188px; height: 50px; padding: 8px; align-items: center`,
    ".eSubToolThicknessInput": `width: 40px; height: 26px; background: unset; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolThicknessInput::placeholder": `color: var(--hover)`,
    ".eSubToolThicknessSlider": `position: relative; flex: 1; height: 10px; margin: 0 4px 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolThicknessSlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolThicknessSlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolThicknessSlider button:active": `transform: scale(1.1) !important`
  };
  js(frame) {
    let editor = this.editor;
    let toolbar = this.toolbar;
    let isToolbar = this.isToolbar;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool;
    let thicknessPreference;
    let selectedThickness;
    let updatePreference = () => {
      preferenceTool = toolbar.getPreferenceTool();
      thicknessPreference = toolbar.getAnnotationPreference().thickness ?? toolbar.getToolPreference().thickness;
      selectedThickness = thicknessPreference;
      if (preferenceTool.t != null) {
        selectedThickness = preferenceTool.t;
      }
    }
    updatePreference();

    let slider = frame.querySelector(".eSubToolThicknessSlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolThicknessInput");
    let sliderEnabled = false;
    let typing = false;
    let firstChange = true;
    let updateUI = async (updateVal, noPref) => {
      if (shouldSave == true && noPref != true) {
        toolbar.setToolPreference("thickness", selectedThickness);
      }
      let percentage = Math.pow(((selectedThickness - this.minValue) / (this.maxValue - this.minValue)), 1 / (this.exponentFactor ?? 1));
      pointer.style.left = ((slider.offsetWidth - 10) * percentage) - 6 + "px";
      if (updateVal != false) {
        input.value = selectedThickness;
      }
      if (noPref != true) {
        if (isToolbar == true) {
          toolbar.toolbar.updateButtons();
          toolbar.activateTool();
        } else {
          await toolbar.saveSelecting((render) => {
            return {
              t: selectedThickness,
              p: [
                render.p[0] + ((render.t - selectedThickness) / 2),
                render.p[1] + ((render.t - selectedThickness) / 2)
              ]
            };
          }, { reuseActionBar: true, saveHistory: firstChange });
          firstChange = false;
        }
      }
    }
    this.redraw = () => {
      if (sliderEnabled == true || typing == true) {
        return;
      }
      updatePreference();
      updateUI(null, true);
    };
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || slider == null) {
        sliderEnabled = false;
        this.forceCurrentActionBar = false;
        editor.pipeline.unsubscribe("thicknessSelectorMouse");
        return;
      }
      let barRect = slider.getBoundingClientRect();
      let newThickness = Math.ceil(Math.pow((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0)), this.exponentFactor ?? 1) * (this.maxValue - this.minValue) + this.minValue);
      if (selectedThickness != newThickness) {
        selectedThickness = newThickness;
        updateUI();
      }
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      this.forceCurrentActionBar = true;
      firstChange = true;
      eventBarUpdate(event);
      editor.pipeline.subscribe("thicknessSelectorMouse", "click_move", (data) => { eventBarUpdate(data.event); });
      editor.pipeline.subscribe("thicknessSelectorMouse", "click_end", (data) => { eventBarUpdate(data.event); });
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", enableSlider, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedThickness;
      typing = true;
      this.forceCurrentActionBar = true;
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedThickness;
      typing = false;
      this.forceCurrentActionBar = false;
    });
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedThickness;
      }
      selectedThickness = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedThickness;
      }
      selectedThickness = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
}