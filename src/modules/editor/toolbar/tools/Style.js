import { hexToRGBString } from "../../utils/hex-to-rgb-string";
import { darkenHex } from "../../utils/darken-hex";
import { borderColorBackgroundRGBA } from "../../utils/border-color-background-rgba";

export class Tool {
  setActionButton(button) {
    button.innerHTML = `<div class="eSubToolStyleHolder"><div class="eSubToolStyle"></div></div>`;
    let buttonElem = button.querySelector(".eSubToolStyle");
    let preference = this.toolbar.getPreferenceTool();
    let selectedOpacity = (preference.o ?? 0) / 100;
    let color = hexToRGBString(preference.c, selectedOpacity);
    let prefI = preference.i;
    let prefB = preference.b;
    if (preference.d == "line") {
      prefI = false;
      if (prefB == "none") {
        prefB = "solid";
      }
    }
    if (prefB != "none") {
      if (prefI != true) {
        buttonElem.style.border = (prefB ?? "solid") + " 4px " + color; //var(--darkGray)
        buttonElem.style.removeProperty("background");
      } else {
        buttonElem.style.border = (prefB ?? "solid") + " 4px " + hexToRGBString(darkenHex(preference.c, 20), selectedOpacity);
        buttonElem.style.background = color;
      }
    } else {
      buttonElem.style.background = color;
      buttonElem.style.removeProperty("border");
    }
    buttonElem.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
  }

  TOOLTIP = "Styling";

  html = `
    <div class="eSubToolStyleContainer eHorizontalToolsHolder" keeptooltip>
      <button class="eTool" tooltip="Filled" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" fill></div></div></div></button>
      <div class="eVerticalDivider"></div>
      <button class="eTool" tooltip="Solid Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" solid></div></div></div></button>
      <button class="eTool" tooltip="Dashed Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" dashed></div></div></div></button>
      <button class="eTool" tooltip="No Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" none></div></div></div></button>
    </div>
  `;
  css = {
    ".eSubToolStyleHolder": `display: flex; width: 28px; height: 28px; margin: 4px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 11px; justify-content: center; align-items: center`,
    ".eSubToolStyle": `box-sizing: border-box; width: 100%; height: 100%; border-radius: 8px`,

    ".eSubToolStyleContainer": `overflow: auto; border-radius: inherit`,
    ".eSubToolStyleContainer .eSubToolStyle[none]": `width: calc(100% - 8px); height: calc(100% - 8px); margin: 4px; border-radius: 4px`,
  };
  async js(frame) {
    let preference = this.toolbar.getPreferenceTool();
    let selectedI;
    let selectedB;

    let fill = frame.querySelector(".eSubToolStyle[fill]");
    let solid = frame.querySelector(".eSubToolStyle[solid]");
    let dashed = frame.querySelector(".eSubToolStyle[dashed]");
    let none = frame.querySelector(".eSubToolStyle[none]");

    let fillButton = fill.closest(".eTool");
    let solidButton = solid.closest(".eTool");
    let dashedButton = dashed.closest(".eTool");
    let noneButton = none.closest(".eTool");

    this.redraw = () => {
      preference = this.toolbar.getPreferenceTool();
      selectedI = preference.i;
      selectedB = preference.b;

      if (preference.d == "line") {
        fillButton.style.display = "none";
        frame.querySelector(".eVerticalDivider").style.display = "none";
        noneButton.style.display = "none";
        selectedI = false;
        if (selectedB == "none") {
          selectedB = "solid";
        }
      }

      fillButton.removeAttribute("selected");
      solidButton.removeAttribute("selected");
      dashedButton.removeAttribute("selected");
      noneButton.removeAttribute("selected");

      if (selectedB != "none") {
        if (selectedI != true) {
          if ((selectedB ?? "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        } else {
          fillButton.setAttribute("selected", "");
          if ((selectedB ?? "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        }
      } else {
        fillButton.setAttribute("selected", "");
        noneButton.setAttribute("selected", "");
      }

      let selectedOpacity = (preference.o ?? 0) / 100;
      let color = hexToRGBString(preference.c, selectedOpacity);
      let borderColor = color;
      if (selectedI == true || selectedB == "none") {
        borderColor = hexToRGBString(darkenHex(preference.c, 20), selectedOpacity);
      }

      fill.style.background = color;
      solid.style.border = "solid 4px " + borderColor;
      dashed.style.border = "dashed 4px " + borderColor;
      //none.style.border = "solid 4px var(--pageColor)";
      none.style.background = color;
      none.parentElement.style.border = "solid 3px " + color;

      fill.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
      solid.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
      dashed.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
      none.style.boxShadow = "0px 0px 3px 0px " + borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
    }
    this.redraw();

    fillButton.addEventListener("click", async () => {
      if (selectedI != true) {
        selectedI = true;
      } else {
        selectedI = false;
      }
      this.toolbar.setToolPreference("filled", selectedI);
      await this.toolbar.saveSelecting(() => { return { i: selectedI }; }, { reuseActionBar: true });
      this.redraw();
    });
    solidButton.addEventListener("click", async () => {
      selectedB = "solid";
      await this.toolbar.saveSelecting(() => { return { b: selectedB }; }, { reuseActionBar: true });
      this.redraw();
    });
    dashedButton.addEventListener("click", async () => {
      selectedB = "dashed";
      await this.toolbar.saveSelecting(() => { return { b: selectedB }; }, { reuseActionBar: true });
      this.redraw();
    });
    noneButton.addEventListener("click", async () => {
      selectedB = "none";
      await this.toolbar.saveSelecting(() => { return { b: selectedB }; }, { reuseActionBar: true });
      this.redraw();
    });
  }
}