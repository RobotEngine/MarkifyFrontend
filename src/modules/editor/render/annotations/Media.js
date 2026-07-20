import { BaseAnnotation } from "../BaseAnnotation";

import { assetURL } from "@/crucial";

export class Annotation extends BaseAnnotation {
  ACTION_BAR_TOOLS = ["media/border", "unlock", "delete"];

  SELECTION_FUNCTION(selection) {
    if (["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      return { resizePreserveAspect: true };
    }
  }

  css = {
    ".eAnnotation[media][border]": `border-radius: 12px`,
    ".eAnnotation[media] > img": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; pointer-events: all; user-select: none; border-radius: inherit; transition: all .1s, border-radius 0s`,
    ".eAnnotation[media][border]:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: all; border-radius: inherit; background: var(--backgroundColor); box-shadow: inset 0px 0px 2px 0px var(--secondaryBackgroundColor)`,
    ".eAnnotation[media][border] > img": `width: calc(100% - 16px); height: calc(100% - 16px); left: 8px; top: 8px; border-radius: 4px`
  };

  render() {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.setAttribute("media", "");
      this.element.innerHTML = `<img draggable="false" />`;
      this.holder.appendChild(this.element);
    }
    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";
    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }

    let image = this.element.querySelector("img");

    image.style.opacity = (this.properties.o ?? 100) / 100;

    if (this.properties.border != false) {
      this.element.setAttribute("border", "");
    } else {
      this.element.removeAttribute("border");
    }

    if (this.editor.exporting != true) {
      if (this.properties.d != null || image.hasAttribute("src") == false) {
        if (this.properties.d != null && this.properties.d.startsWith("blob:") == false) {
          if (image.src != assetURL + this.properties.d) {
            image.src = assetURL + this.properties.d;
          }
        } else {
          if (image.src != (this.properties.d ?? "../images/editor/uploading.png")) {
            image.src = this.properties.d ?? "../images/editor/uploading.png";
          }
        }
      }
    } else {
      this.editor.exportPromises.push(new Promise(async (resolve) => {
        image.addEventListener("load", resolve);
        image.addEventListener("error", resolve);
        if (this.properties.d != null || image.hasAttribute("src") == false) {
          if (this.properties.d != null && this.properties.d.startsWith("blob:") == false) {
            image.src = assetURL + this.properties.d;
          } else {
            image.src = this.properties.d ?? "../images/editor/uploading.png";
          }
        }
      }));
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}