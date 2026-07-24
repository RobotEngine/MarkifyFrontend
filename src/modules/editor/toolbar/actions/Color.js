import { app, mouseDown, clientPosition } from "@/crucial";

import { borderColorBackgroundRGBA } from "../../utils/border-color-background-rgba";
import { rgbToHex } from "../../utils/rgb-to-hex";
import { hslToHex } from "../../utils/hsl-to-hex";
import { hsvToHex } from "../../utils/hsv-to-hex";
import { hexToHSV } from "../../utils/hex-to-hsv";
import { hexToRGB } from "../../utils/hex-to-rgb";
import { hexToHSL } from "../../utils/hex-to-hsl";

import { close } from "../../../utility/core-icons";
import pickerIcon from "../../icons/toolbar/picker/picker.svg?raw";
import eyedropperIcon from "../../icons/toolbar/picker/eyedropper.svg?raw";

export class Tool {
  TOOLTIP = "Color";
  USER_SELECT = "none";

  setToolbarButton(button) {
    button.innerHTML = `<div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div>`;
    let color = button.querySelector(".eSubToolColor");
    let preference = this.toolbar.getToolPreference();
    let selectedColor = (preference.color ?? {}).selected;
    let selectedOpacity = preference.opacity / 100;
    color.style.background = "#" + selectedColor;
    color.style.opacity = selectedOpacity;
    color.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(selectedColor);
  }
  setActionButton(button) {
    button.innerHTML = `<div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div>`;
    let holder = button.querySelector(".eSubToolColorHolder");
    let color = holder.querySelector(".eSubToolColor");
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
    color.style.background = "#" + selectedColor;
    color.style.opacity = selectedOpacity;
    color.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(selectedColor);
  }

  html = `
  <div class="eSubToolColorFrame">
    <div class="eSubToolColorSelector" noselect>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" enablepicker option><div>${pickerIcon}</div></button>
    </div>
    <div class="eSubToolColorPicker">
      <div class="eSubToolColorPickerTop">
        <button class="eSubToolColorPickerType largeButton border" title="Change Color Scale"></button>
        <input class="eSubToolColorPickerField" name="Color Input" />
        <button class="eSubToolColorPickerTopBack buttonAnim border">${close}</button>
      </div>
      <div class="eSubToolColorPickerShade">
        <div><canvas></canvas></div>
        <button></button>
      </div>
      <div class="eSubToolColorPickerColorSelector">
        <button class="eSubToolColorPickerEyedroper buttonAnim border" title="Eyedropper">${eyedropperIcon}</button>
        <div class="eSubToolColorPickerGradient">
          <div class="eSubToolColorPickerGradientSlider"></div>
          <button></button>
        </div>
      </div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolColorHolder": `box-sizing: border-box; display: flex; width: 34px; height: 34px; margin: 4px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 18px; justify-content: center; align-items: center`,
    ".eSubToolColor": `width: 100%; height: 100%; border-radius: 16px`,

    ".eSubToolColorFrame": `position: relative; width: 188px; min-height: 96px`,
    ".eSubToolColorSelector": `display: flex; flex-wrap: wrap; top: 0px; padding: 2px; justify-content: center; align-items: center; transform: scale(1); opacity: 1; transition: .5s`,
    ".eSubToolColorSelector .eTool": `width: 46px; height: 46px`,
    ".eSubToolColorSelector .eTool > div": `margin: 2px !important !important; border-radius: 8px !important`,
    ".eSubToolColorSelector .eSubToolColor": `width: 28px; height: 28px`,

    ".eSubToolColorPicker": `width: 188px; position: absolute; top: 0px; transform: scale(.9); opacity: 0; transition: .5s; pointer-events: none; touch-action: none`,
    ".eSubToolColorPickerTop": `position: relative; box-sizing: border-box; display: flex; width: 100%; padding: 6px`,
    ".eSubToolColorPickerTopBack": `position: relative; width: 22px; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 11px`,
    ".eSubToolColorPickerTopBack svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eSubToolColorPickerShade": `position: relative; width: calc(100% - 20px); height: 112px; margin: 4px 10px 8px`,
    ".eSubToolColorPickerShade div": `width: 100%; height: 100%; border-radius: 10px; overflow: hidden`,
    ".eSubToolColorPickerShade canvas": `width: 100%; height: 100%; background: #000`,
    ".eSubToolColorPickerShade button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 3px var(--pageColor); border-radius: 10px; transition: transform .2s`,
    ".eSubToolColorPickerShade button:hover": `transform: scale(1.2) !important`,
    ".eSubToolColorPickerShade button:active": `transform: scale(1.1) !important`,
    ".eSubToolColorPickerColorSelector": `box-sizing: border-box; display: flex; width: 100%; height: 32px; padding-bottom: 6px; align-items: center`,
    ".eSubToolColorPickerEyedroper": `position: relative; width: 26px; height: 26px; margin-left: 6px; --borderWidth: 0px; --borderRadius: 13px`,
    ".eSubToolColorPickerEyedroper svg": `position: absolute; width: 24px; height: 24px; left: 1px; top: 1px`,
    ".eSubToolColorPickerGradient": `position: relative; flex: 1; height: 10px; margin: 0 10px`,
    ".eSubToolColorPickerGradientSlider": `width: 100%; height: 100%; background: -webkit-linear-gradient(left, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0)); border-radius: 5px`,
    ".eSubToolColorPickerGradient button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 3px var(--pageColor); border-radius: 10px; transition: transform .2s`,
    ".eSubToolColorPickerGradient button:hover": `transform: scale(1.2) !important`,
    ".eSubToolColorPickerGradient button:active": `transform: scale(1.1) !important`,
    ".eSubToolColorPickerType": `box-sizing: border-box; height: 22px; padding: 3px 6px; margin: 3px; --borderWidth: 3px; --borderRadius: 8px; font-size: 14px; font-weight: 700; color: var(--theme)`,
    ".eSubToolColorPickerType:after": `width: 100%; height: 100%`,
    ".eSubToolColorPickerField": `box-sizing: border-box; flex: 1; min-width: 0px; height: 28px; padding: 0; margin: 0 6px; background: unset; border: solid 3px var(--secondary); outline: none; border-radius: 14px; font-family: var(--font); font-size: 14px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolColorPickerField::placeholder": `color: var(--hover)`
  };
  js(frame) {
    let editor = this.editor;
    let toolbar = this.toolbar;
    let isToolbar = this.isToolbar;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool;
    let colorPreference;
    let selectedColor = "228EF2";
    let quill;
    let updatePreference = () => {
      preferenceTool = toolbar.getPreferenceTool();
      colorPreference = toolbar.getAnnotationPreference().color ?? toolbar.getToolPreference().color;
      selectedColor = colorPreference.selected;
      if (preferenceTool.c != null) {
        selectedColor = preferenceTool.c;
      }
      let annotation = this.editor.annotations[preferenceTool._id];
      if (annotation != null) {
        let component = annotation.component ?? {};
        quill = component.quill;
        if (quill != null && selectKeys.length == 1 && component.ALLOW_RICHTEXT_COLOR != false) {
          let selection = quill.getSelection();
          let setSelectedColor;
          if (selection != null) {
            let content = quill.getContents(selection.index, Math.max(selection.length, 1)) ?? {};
            if (content.ops == null || content.ops.length > 1 || (content.ops[0].insert ?? {}).formula == null) {
              setSelectedColor = quill.getFormat(selection.index, selection.length).color;
            } else {
              setSelectedColor = quill.getFormat(selection.index, 1).color;
            }
          } else {
            setSelectedColor = quill.getFormat(0, quill.getLength()).color;
          }
          if (setSelectedColor != null) {
            if (Array.isArray(setSelectedColor) == true) {
              setSelectedColor = setSelectedColor[0];
            }
            if (setSelectedColor.startsWith("rgb(") == true) {
              let rgbValues = setSelectedColor.match(/\d+/g);
              selectedColor = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]).toUpperCase();
            } else if (setSelectedColor.startsWith("#") == true) {
              selectedColor = setSelectedColor.substring(1).toUpperCase();
            }
          }
        } else {
          quill = null;
        }
      }
    }
    updatePreference();

    let selector = frame.querySelector(".eSubToolColorSelector");
    let colorButtons = selector.children;
    let picker = frame.querySelector(".eSubToolColorPicker");
    let selected = false;
    let runColorSelections = () => {
      selected = false;
      for (let i = 0; i < colorButtons.length; i++) {
        let button = colorButtons[i];
        let setColor = colorPreference.options[i];
        let isSelected = false;
        if (setColor != null) {
          button.setAttribute("int", i);
          let color = button.querySelector(".eSubToolColor");
          color.style.background = "#" + setColor;
          color.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(setColor);
          if (isToolbar == true) {
            isSelected = setColor == colorPreference.selected;
          } else {
            isSelected = setColor == selectedColor; //preferenceTool.c;
          }
        }
        if (selected == false) {
          if (isSelected || setColor == null) {
            button.setAttribute("selected", "");
            selected = true;
          } else {
            button.removeAttribute("selected", "");
          }
        } else {
          button.removeAttribute("selected", "");
        }
      }
    }
    this.redraw = () => {
      updatePreference();
      runColorSelections();
      if (colorSliderEnabled == true || colorGradientEnabled == true) {
        return;
      }
      ([h, s, v] = hexToHSV(selectedColor));
      updatePickerUI();
    };
    runColorSelections();

    let [h, s, v] = [];
    let colorGradientEnabled = false;
    let colorSliderEnabled = false;
    selector.addEventListener("click", async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest(".eTool");
      if (element == null) {
        return;
      }
      if (element.hasAttribute("int") == true) {
        selectedColor = colorPreference.options[parseInt(element.getAttribute("int"))];
        if (shouldSave == true) {
          toolbar.setToolPreference("color.selected", selectedColor);
        }
        if (isToolbar == true) {
          toolbar.toolbar.closeSubSub(true);
          toolbar.activateTool();
        } else {
          if (quill != null) {
            let selection = quill.getSelection();
            let source = "api";
            let enabled = quill.isEnabled();
            if (enabled == true) {
              source = "user";
            }
            if (selection != null && enabled == true) {
              let content = quill.getContents(selection.index, Math.max(selection.length, 1)) ?? {};
              if (content.ops == null || content.ops.length > 1 || (content.ops[0].insert ?? {}).formula == null) {
                quill.format("color", "#" + selectedColor, source);
              } else {
                quill.formatText(selection.index, 1, "color", "#" + selectedColor, source);
                let element = (quill.getLeaf(selection.index + 1)[0] ?? {}).domNode;
                setTimeout(() => {
                  if (element != null && element.mathquillAPI != null) {
                    element.mathquillAPI.focus();
                  }
                }, 1);
              }
            } else {
              quill.formatText(0, quill.getLength(), "color", "#" + selectedColor, source);
            }
            if (enabled == false) {
              await this.toolbar.saveSelecting(() => { return { c: selectedColor, d: quill.getContents().ops } }, { refreshActionBar: false });
            }
          } else {
            await toolbar.saveSelecting(() => { return { c: selectedColor }; });
          }

          let selected = selector.querySelector("button[selected]");
          if (selected != null) {
            selected.removeAttribute("selected");
          }
          element.setAttribute("selected", "");
        }
        toolbar.toolbar.updateButtons();
      } else if (element.hasAttribute("enablepicker") == true) {
        this.redraw();
        ([h, s, v] = hexToHSV(selectedColor));
          updatePickerUI();
        picker.style.position = "relative";
        selector.style.position = "absolute";
        picker.style.transform = "scale(1)";
        selector.style.transform = "scale(.9)";
        picker.style.opacity = 1;
        selector.style.opacity = 0;
        picker.style.pointerEvents = "all";
        if (isToolbar == true) {
          toolbar.toolbar.update();
        } else {
          toolbar.selection.updateActionBar();
          //extra.updateActionUI();
        }
      }
    });
    /*if (isToolbar == false) {
      this.updateActionUI();
    }*/

    let closeButton = frame.querySelector(".eSubToolColorPickerTopBack");
    closeButton.addEventListener("click", async () => {
      selector.style.position = "relative";
      picker.style.position = "absolute";
      selector.style.transform = "scale(1)";
      picker.style.transform = "scale(.9)";
      selector.style.opacity = 1;
      picker.style.opacity = 0;
      selector.style.pointerEvents = "all";
      picker.style.pointerEvents = "none";
      if (isToolbar == true) {
        toolbar.toolbar.update();
      } else {
        toolbar.selection.updateActionBar();
      }
    });

    let colorSliderHolder = frame.querySelector(".eSubToolColorPickerGradient");
    let colorPointer = colorSliderHolder.querySelector("button");
    let shadeSliderHolder = frame.querySelector(".eSubToolColorPickerShade");
    let canvas = shadeSliderHolder.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let shadePointer = shadeSliderHolder.querySelector("button");
    let modeButton = frame.querySelector(".eSubToolColorPickerType");
    let modeInput = frame.querySelector(".eSubToolColorPickerField");
    let modes = ["HEX", "RGB", "HSL", "HSB"];
    modeButton.addEventListener("click", () => {
      editor.preferences.state.tools.options.colorpicker.scale++;
      if (editor.preferences.state.tools.options.colorpicker.scale > modes.length - 1) {
        editor.preferences.state.tools.options.colorpicker.scale = 0;
      }
      modeButton.textContent = modes[editor.preferences.state.tools.options.colorpicker.scale];
      editor.preferences.save();
      updatePickerUI();
    });
    modeButton.textContent = modes[editor.preferences.state.tools.options.colorpicker.scale];
    modeInput.addEventListener("input", () => {
      switch (modes[editor.preferences.state.tools.options.colorpicker.scale]) {
        case "HEX":
          modeInput.value = modeInput.value.replace(/[^0-9a-z]/gi, "");
          if ((/^([0-9a-f]{3}){1,2}$/i).test(modeInput.value) == true) {
            updateStoredValues(modeInput.value, false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "RGB":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let rgbVals = modeInput.value.match(/\d+/g);
          if (rgbVals[0] >= 0 && rgbVals[0] <= 255 && rgbVals[1] >= 0 && rgbVals[1] <= 255 && rgbVals[2] >= 0 && rgbVals[2] <= 255) {
            updateStoredValues(rgbToHex(rgbVals[0], rgbVals[1], rgbVals[2]), false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "HSL":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let hslVals = modeInput.value.match(/\d+/g);
          if (hslVals[0] >= 0 && hslVals[0] <= 360 && hslVals[1] >= 0 && hslVals[1] <= 100 && hslVals[2] >= 0 && hslVals[2] <= 100) {
            updateStoredValues(hslToHex(hslVals[0], hslVals[1], hslVals[2]), false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "HSB":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let hsvVals = modeInput.value.match(/\d+/g);
          if (hsvVals[0] >= 0 && hsvVals[0] <= 360 && hsvVals[1] >= 0 && hsvVals[1] <= 100 && hsvVals[2] >= 0 && hsvVals[2] <= 100) {
            updateStoredValues(hsvToHex(hsvVals[0], hsvVals[1], hsvVals[2]), false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
      }
    });
    let updatePickerUI = (updateText) => {
      // Update Colors Shown:
      let hue = "#" + hsvToHex(h, 100, 100);
      shadePointer.style.background = "#" + selectedColor;
      colorPointer.style.background = hue;
      // Update Pointer Positions:
      shadePointer.style.left = (shadeSliderHolder.offsetWidth * (s / 100)) - 10 + "px";
      shadePointer.style.top = (shadeSliderHolder.offsetHeight - (shadeSliderHolder.offsetHeight * (v / 100))) - 10 + "px";
      colorPointer.style.left = (colorSliderHolder.offsetWidth * (h / 360)) - 10 + "px";
      // Update Gradient:
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let colorscale = ctx.createLinearGradient(0, 0, canvas.width, 0);
      colorscale.addColorStop(0, "white");
      colorscale.addColorStop(1, hue);
      ctx.fillStyle = colorscale;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let grayscale = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grayscale.addColorStop(0, "rgba(0, 0, 0, 0)");
      grayscale.addColorStop(1, "black");
      ctx.fillStyle = grayscale;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Update Input:
      if (updateText != false) {
        switch (modes[editor.preferences.state.tools.options.colorpicker.scale]) {
          case "HEX":
            modeInput.value = selectedColor.toUpperCase();
            break;
          case "RGB":
            let rgbVal = hexToRGB(selectedColor);
            modeInput.value = rgbVal[0] + ", " + rgbVal[1] + ", " + rgbVal[2];
            break;
          case "HSL":
            let hslVal = hexToHSL(selectedColor);
            modeInput.value = hslVal[0] + ", " + hslVal[1] + ", " + hslVal[2];
            break;
          case "HSB":
            let hsbVal = hexToHSV(selectedColor);
            modeInput.value = Math.floor(hsbVal[0]) + ", " + Math.floor(hsbVal[1]) + ", " + Math.floor(hsbVal[2]);
        }
      }
      modeInput.placeholder = modeInput.value;
      modeInput.style.borderColor = "var(--secondary)";
      // Update Toolbar Colors:
      toolbar.toolbar.updateButtons();
    }
    let updateStoredValues = async (hex, updateText, saveHistory) => {
      let newColor = hex ?? hsvToHex(h, s, v);
      if (selectedColor == newColor) {
        return updatePickerUI(updateText);
      }
      selectedColor = newColor;
      let selectedButton = selector.querySelector(".eTool[int][selected]");
      if (selectedButton == null) {
        selectedButton = selector.children[selector.childElementCount - 2];
        let selected = selector.querySelector(".eTool[selected]");
        if (selected != null) {
          selected.removeAttribute("selected");
        }
        selectedButton.setAttribute("selected", "");
      }
      let int = parseInt(selectedButton.getAttribute("int"));
      if (int == null || int < 0 || int > 6) {
        return;
      }
      colorPreference.options[int] = selectedColor;
      selectedButton.querySelector(".eSubToolColor").style.background = "#" + selectedColor;
      if (hex != null) {
        ([h, s, v] = hexToHSV(selectedColor));
      }
      if (shouldSave == true) {
        toolbar.setToolPreference("color.options", colorPreference.options);
        toolbar.setToolPreference("color.selected", selectedColor);
      }
      updatePickerUI(updateText);
      if (isToolbar == true) {
        toolbar.activateTool();
      } else {
        if (quill != null) {
          let selection = quill.getSelection();
          let source = "api";
          let enabled = quill.isEnabled();
          if (enabled == true) {
            source = "user";
          }
          if (selection != null && enabled == true) {
            let content = quill.getContents(selection.index, Math.max(selection.length, 1)) ?? {};
            if (content.ops == null || content.ops.length > 1 || (content.ops[0].insert ?? {}).formula == null) {
              quill.format("color", "#" + selectedColor, source);
            } else {
              quill.formatText(selection.index, 1, "color", "#" + selectedColor, source);
            }
          } else {
            quill.formatText(0, quill.getLength(), "color", "#" + selectedColor, source);
          }
          if (enabled == false) {
            await this.toolbar.saveSelecting(() => { return { c: selectedColor, d: quill.getContents().ops } }, { refreshActionBar: false });
          }
        } else {
          await toolbar.saveSelecting(() => { return { c: selectedColor }; }, { saveHistory: saveHistory == true });
        }
      }
    }
    let eventGradientUpdate = (event) => {
      if (colorGradientEnabled == false) {
        return;
      }
      if (mouseDown() == false || shadeSliderHolder == null) {
        colorGradientEnabled = false;
        editor.pipeline.unsubscribe("colorSelectorMouse");
        return updateStoredValues();
      }
      let barRect = shadeSliderHolder.getBoundingClientRect();
      s = Math.ceil(Math.max(Math.min((clientPosition(event, "x") - barRect.x - 2) / shadeSliderHolder.offsetWidth, 1), 0) * 100);
      v = Math.ceil(Math.max(Math.min((shadeSliderHolder.offsetHeight - (clientPosition(event, "y") - barRect.y + 2)) / shadeSliderHolder.offsetHeight, 1), 0) * 100);
      updateStoredValues();
    }
    let gradientDown = (event) => {
      colorGradientEnabled = true;
      app.style.userSelect = "none";
      eventGradientUpdate(event);
      editor.pipeline.subscribe("colorSelectorMouse", "click_move", (data) => { eventGradientUpdate(data.event); });
      editor.pipeline.subscribe("colorSelectorMouse", "click_end", (data) => { eventGradientUpdate(data.event); });
    }
    shadeSliderHolder.addEventListener("mousedown", gradientDown);
    shadeSliderHolder.addEventListener("touchstart", gradientDown, { passive: true });
    let eventColorUpdate = (event) => {
      if (colorSliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || colorSliderHolder == null) {
        colorSliderEnabled = false;
        editor.pipeline.unsubscribe("colorSelectorMouse");
        return updateStoredValues();
      }
      let barRect = colorSliderHolder.getBoundingClientRect();
      h = Math.ceil(Math.max(Math.min(((event.clientX ?? event.changedTouches[0].clientX) - barRect.x) / colorSliderHolder.offsetWidth, 1), 0) * 360);
      updateStoredValues();
    }
    let colorSliderDown = (event) => {
      colorSliderEnabled = true;
      eventColorUpdate(event);
      editor.pipeline.subscribe("colorSelectorMouse", "click_move", (data) => { eventColorUpdate(data.event); });
      editor.pipeline.subscribe("colorSelectorMouse", "click_end", (data) => { eventColorUpdate(data.event); });
    }
    colorSliderHolder.addEventListener("mousedown", colorSliderDown);
    colorSliderHolder.addEventListener("touchstart", colorSliderDown, { passive: true });

    let eyeDropper = frame.querySelector(".eSubToolColorPickerEyedroper");
    if (window.EyeDropper == null) {
      eyeDropper.style.display = "none";
    }
    eyeDropper.addEventListener("click", () => {
      (new EyeDropper())
        .open()
        .then((result) => {
          updateStoredValues(result.sRGBHex.substring(1), null, true);
        })
        .catch(() => { });
    });
  }
}