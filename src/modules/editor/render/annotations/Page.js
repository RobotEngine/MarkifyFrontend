import { BaseAnnotation } from "../../Render";

import { cleanString } from "@/crucial";

import { textColorBackground } from "../../utils/text-color-background";
import { contrastCheck } from "../../utils/contrast-check";
import { darkenHex } from "../../utils/darken-hex";
import { lightenHex } from "../../utils/lighten-hex";

export class Annotation extends BaseAnnotation {
  CAN_PARENT_CHILDREN = true;
  HOLD_FOR_SELECT = true;
  ALLOW_SELECT_OVERFLOW = true;
  SHOW_DUPLICATE_HANDLES = true;
  MIN_WIDTH = 100;
  MIN_HEIGHT = 100;
  CAN_FLIP = false;
  SELECT_BOX_COVER = true;

  ACTION_BAR_TOOLS = ["page/upload", "page/resize", "page/type", "page/rotate", "page/settitle", "page/hide", "color", "unlock", "delete"];

  SELECTION_FUNCTION(selection, render) {
    if (render.source != null && ["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      return { resizePreserveAspect: true };
    }
  }
  MM_TO_PX(mm) {
    return mm * 96 / 25.4;
  }

  css = {
    ".eAnnotation[page]": `display: flex; flex-direction: column; background: white; border-radius: 12px; --borderWidth: 4px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2)`,
    ".eAnnotation[page] > svg[background]": `position: absolute;left: 0; top: 0; border-radius: inherit; overflow: hidden; z-index: 0`,
    ".eAnnotation[page] > div[background]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: .1; border-radius: inherit; z-index: 1; pointer-events: all`,
    ".eAnnotation[page] > div[border]": `position: absolute; box-sizing: border-box; width: 100%; height: 100%; left: 0px; top: 0px; border: solid var(--borderWidth) var(--themeColor); border-radius: inherit; z-index: 4; pointer-events: none`,
    ".eAnnotation[page] > div[label]": `position: absolute; display: none; box-sizing: border-box; padding: 8px 10px; background: var(--themeColor); border-radius: 0px; border-top-left-radius: inherit; border-bottom-right-radius: 12px;  font-weight: 600; font-size: 18px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; outline: none; scrollbar-width: none; z-index: 4; pointer-events: all`,
    ".eAnnotation[page] > div[label]::-webkit-scrollbar": `display: none`,
    ".eAnnotation[page] > div[content]": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; justify-content: center; align-items: center; contain: size style`,
    ".eAnnotation[page][hide] > div[content] .eAnnotationHolder": `z-index: 3 !important`,
    ".eAnnotation[page][selected] > div[label]": `pointer-events: all !important`,
    ".eAnnotation[page] > div[label][contenteditable]": `overflow-x: auto !important; text-overflow: unset !important`,
    ".eAnnotation[page] > div[hide]": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-radius: inherit; z-index: 3; pointer-events: all`,
    ".eAnnotation[page] > div[hide] img[hideicon]": `width: 150px; height: 150px; max-width: calc(100% - 24px); max-height: calc(100% - 24px)`,
    ".eAnnotation[page] > div[hide] div[hidemodal]": `display: flex; flex-direction: column; max-width: calc(100% - 64px); max-height: calc(100% - 64px); padding: 24px; overflow: auto; background: var(--pageColor); box-shadow: 0px 0px 16px 0px var(--hover); border-radius: 16px; align-items: center`,
    ".eAnnotation[page] > div[hide] div[hidemodal] img": `margin-bottom: 12px; width: calc(100% - 24px); max-width: 80px`,
    ".eAnnotation[page] > div[hide] div[hidemodal] div[hidemodaltitle]": `font-size: 28px; font-weight: 700; color: var(--theme)`,
    ".eAnnotation[page] > div[hide] div[hidemodal] button": `display: flex; margin-top: 24px; z-index: 1; background: var(--theme); --borderColor: var(--secondary); --borderRadius: 14px; color: #fff`,
    ".eAnnotation[page] > div[content] div[document]": `position: relative; --scale-factor: 2; --user-unit: 1; --total-scale-factor: calc(var(--scale-factor) * var(--user-unit)); border-radius: inherit; overflow: hidden; z-index: 1; contain: size layout style`,
    ".eAnnotation[page] > div[content] div[document] canvas": `position: absolute; width: calc(100% - 8px) !important; height: calc(100% - 8px) !important; left: var(--borderWidth); top: var(--borderWidth); background: var(--themeColor); z-index: 1`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer]": `position: absolute; width: var(--fullWidth) !important; height: var(--fullHeight) !important; left: var(--borderWidth); top: var(--borderWidth); transform-origin: top left; transform: var(--fullScale); font-family: sans-serif; z-index: 3`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer] > *": `position: absolute; color: transparent; pointer-events: all; transform-origin: top left`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer] > * a": `position: absolute; width: 100%; height: 100%; padding: 4px; left: -4px; top: -4px; border-radius: 6px; transition: .2s; transform: unset !important`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer] > * a:hover": `background: rgba(var(--themeRGB), .2)`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer]": `position: absolute; width: var(--fullWidth) !important; height: var(--fullHeight) !important; left: var(--borderWidth); top: var(--borderWidth); transform-origin: top left; transform: var(--fullScale); font-family: sans-serif; z-index: 2`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer] span": `color: transparent; position: absolute; white-space: pre; transform-origin: 0% 0%; pointer-events: all`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer] br": `color: transparent; position: absolute; white-space: pre; transform-origin: 0% 0%; pointer-events: all; user-select: none`,
    ".hiddenCanvasElement": `display: none`
  };

  render() {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.setAttribute("page", "");
      this.element.innerHTML = `<div background></div>
      <div border></div>
      <div label selectable></div>
      <div content annoholdercontainer></div>`;
      this.holder.appendChild(this.element);
    }
    
    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";

    let hasDocument = this.properties.source != null && this.properties.number != null;

    let type = this.properties.background ?? "blank";
    let backgroundSVG = this.element.querySelector("svg[background]");
    if (hasDocument == false && ["line", "grid"].includes(type) == true) {
      if (backgroundSVG == null) {
        this.element.insertAdjacentHTML("beforeend", `<svg background>
          <defs></defs>
          <rect width="100%" height="100%" fill="url(#background_pattern)"></rect>
        </svg>`);
        backgroundSVG = this.element.querySelector("svg[background]");
      }

      let baseColor = this.properties.c ?? "e0e0e0";
      let lineColor;
      if (contrastCheck(baseColor, .5) == true) {
        lineColor = darkenHex(baseColor, 25);
      } else {
        lineColor = lightenHex(baseColor, 25);
      }
      backgroundSVG.style.setProperty("--themeColor", "#" + lineColor);

      let svgDefinition = backgroundSVG.querySelector("defs");
      if (svgDefinition.getAttribute("type") != type) {
        svgDefinition.setAttribute("type", type);
        if (type == "line") {
          let lineSpacing = this.MM_TO_PX(7.1);  // ≈ 26.9px
          svgDefinition.innerHTML = `
          <pattern width="100%" height="${lineSpacing}" patternUnits="userSpaceOnUse">
            <line x1="0" y1="${lineSpacing}" x2="100%" y2="${lineSpacing}" stroke-width="2" stroke="var(--themeColor)"></line>
          </pattern>`;
          svgDefinition.querySelector("pattern").setAttribute("id", "background_pattern_" + this.properties._id);
        } else if (type == "grid") {
          let gridSpacing = this.MM_TO_PX(5);    // ≈ 18.9px
          svgDefinition.innerHTML = `
          <pattern width="${gridSpacing}" height="${gridSpacing}" patternUnits="userSpaceOnUse">
            <line x1="0" y1="${gridSpacing}" x2="${gridSpacing}" y2="${gridSpacing}" stroke-width="2" stroke="var(--themeColor)"></line>
            <line x1="${gridSpacing}" y1="0" x2="${gridSpacing}" y2="${gridSpacing}" stroke-width="2" stroke="var(--themeColor)"></line>
          </pattern>`;
          svgDefinition.querySelector("pattern").setAttribute("id", "background_pattern_" + this.properties._id);
        }
        backgroundSVG.querySelector("rect").setAttribute("fill", "url(#background_pattern_" + this.properties._id + ")");
      }
    } else if (backgroundSVG != null) {
      backgroundSVG.remove();
    }

    this.element.style.setProperty("--themeColor", "#" + this.properties.c);
    this.element.style.color = textColorBackground(this.properties.c);
    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }
    let pageLabel = this.element.querySelector(":scope > div[label]");
    if (pageLabel.hasAttribute("contenteditable") == false) {
      if ((this.properties.title ?? "").length < 1) {
        pageLabel.style.removeProperty("display");
        pageLabel.textContent = "";
      } else {
        pageLabel.style.display = "unset";
        pageLabel.textContent = cleanString(this.properties.title);
      }
    }
    if (this.properties.r == null || this.properties.r < 45 || this.properties.r >= 315) {
      pageLabel.style.removeProperty("right");
      pageLabel.style.removeProperty("bottom");
      pageLabel.style.left = "0px";
      pageLabel.style.top = "0px";
      pageLabel.style.maxWidth = (this.properties.s[0] - 12) + "px";
      pageLabel.style.transformOrigin = "center center";
      pageLabel.style.transform = "rotate(0deg)";
    } else if (this.properties.r < 135) {
      pageLabel.style.removeProperty("right");
      pageLabel.style.removeProperty("top");
      pageLabel.style.left = "38px";
      pageLabel.style.bottom = "0px";
      pageLabel.style.maxWidth = (this.properties.s[1] - 12) + "px";
      pageLabel.style.transformOrigin = "left bottom";
      pageLabel.style.transform = "rotate(270deg)";
    } else if (this.properties.r < 225) {
      pageLabel.style.removeProperty("left");
      pageLabel.style.removeProperty("top");
      pageLabel.style.right = "0px";
      pageLabel.style.bottom = "0px";
      pageLabel.style.maxWidth = (this.properties.s[0] - 12) + "px";
      pageLabel.style.transformOrigin = "center center";
      pageLabel.style.transform = "rotate(180deg)";
    } else if (this.properties.r < 315) {
      pageLabel.style.removeProperty("right");
      pageLabel.style.removeProperty("bottom");
      pageLabel.style.left = "100%";
      pageLabel.style.top = "0px";
      pageLabel.style.maxWidth = (this.properties.s[1] - 12) + "px";
      pageLabel.style.transformOrigin = "left top";
      pageLabel.style.transform = "rotate(90deg)";
    }
    let pageBorder = this.element.querySelector(":scope > div[border]");
    let pageContent = this.element.querySelector(":scope > div[content]");
    let pdfDocumentHolder = pageContent.querySelector(":scope > div[document]");
    if (hasDocument == true) {
      let sourcePageId = this.properties.source + "_" + this.properties.number;
      if (pdfDocumentHolder != null && pdfDocumentHolder.getAttribute("sourcepage") != sourcePageId) {
        pdfDocumentHolder.remove();
        pdfDocumentHolder = null;
      }
      if (pdfDocumentHolder == null) {
        pageContent.insertAdjacentHTML("beforeend", `<div document></div>`);
        pdfDocumentHolder = pageContent.querySelector(":scope > div[document]");
        pdfDocumentHolder.setAttribute("sourcepage", sourcePageId);
        pdfDocumentHolder.setAttribute("width", this.properties.s[0]);
        pdfDocumentHolder.setAttribute("height", this.properties.s[1]);
        pdfDocumentHolder.setAttribute("rotation", this.properties.rotation ?? 0);
        if (this.exporting != true) {
          pdfDocumentHolder.style.opacity = 0;
          pdfDocumentHolder.style.transition = "opacity .3s";
        }
        this.editor.render.addPageToQueue(this.properties.source, this.properties.number);
      } else {
        pdfDocumentHolder.setAttribute("sourcepage", sourcePageId);
        pdfDocumentHolder.setAttribute("width", this.properties.s[0]);
        pdfDocumentHolder.setAttribute("height", this.properties.s[1]);
        let rotation = this.properties.rotation ?? 0;
        pdfDocumentHolder.setAttribute("rotation", rotation);
        let canvas = pdfDocumentHolder.querySelector("canvas");
        if (canvas != null) {
          let canvasWidth = parseFloat(canvas.getAttribute("width"));
          let canvasHeight = parseFloat(canvas.getAttribute("height"));
          let useWidth = this.properties.s[0];
          let useHeight = this.properties.s[1];
          if (rotation == 90 || rotation == 270) {
            let prevWidth = this.properties.s[0];
            canvasWidth = this.properties.s[1];
            canvasHeight = prevWidth;
            useWidth = this.properties.s[1];
            useHeight = this.properties.s[0];
          }
          pdfDocumentHolder.style.setProperty("--fullWidth", canvasWidth + "px");
          pdfDocumentHolder.style.setProperty("--fullHeight", canvasHeight + "px");
          pdfDocumentHolder.style.transform = "rotate(" + rotation + "deg)";
          let ratio = canvasWidth / canvasHeight;
          let ratioedWidth = (useHeight - 8) * ratio;
          let ratioedHeight = (useWidth - 8) / ratio;
          if (ratioedWidth < useWidth - 8) {
            pdfDocumentHolder.style.width = (ratioedWidth + 8) + "px";
            pdfDocumentHolder.style.height = useHeight + "px";
            pdfDocumentHolder.style.setProperty("--fullScale", "scale(" + ((useHeight - 8) / canvasHeight) + ")");
          } else {
            pdfDocumentHolder.style.width = useWidth + "px";
            pdfDocumentHolder.style.height = (ratioedHeight + 8) + "px";
            pdfDocumentHolder.style.setProperty("--fullScale", "scale(" + ((useWidth - 8) / canvasWidth) + ")");
          }
        }
      }
    } else if (pdfDocumentHolder != null) {
      pdfDocumentHolder.remove();
    }
    let pageHiddenHolder = this.element.querySelector(":scope > div[hide]");
    if (this.properties.hidden == true) {
      this.element.setAttribute("hide", "");
      if (pageHiddenHolder == null) {
        this.element.insertAdjacentHTML("beforeend", `<div hide></div>`);
        let hiddenElem = this.element.querySelector(":scope > div[hide]");
        if (this.editor.self.access < 4) {
          hiddenElem.insertAdjacentHTML("beforeend", `<img hideicon src="../images/editor/hidden.svg" draggable="false">`);
        } else {
          if (this.exporting != true) {
            hiddenElem.insertAdjacentHTML("beforeend", `<div hidemodal>
              <img src="../images/editor/hidden.svg" draggable="false">
              <div hidemodaltitle>Page Hidden</div>
            </div>`);
            if (this.editor.self.access > 3) {
              hiddenElem.querySelector("div[hidemodal]").insertAdjacentHTML("beforeend", `<button class="largeButton">Reveal Page</button>`);
            }
          }
        }
      }
      pageBorder.style.pointerEvents = "none";
    } else if (pageHiddenHolder != null) {
      this.element.removeAttribute("hide");
      pageHiddenHolder.remove();
      pageBorder.style.removeProperty("pointer-events");
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}