import { BaseAnnotation } from "../../Render";

import { cleanString } from "@/crucial";

export class Annotation extends BaseAnnotation {
  CAN_ERASE = true;
  RESIZE_PRESERVE_ASPECT = true;
  CAN_BE_SNAPPED_TO = false;

  ACTION_BAR_TOOLS = ["color", "thickness", "opacity", "unlock", "delete"];

  render() {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.innerHTML = `<svg>
        <polyline/>
      </svg>`;
      let line = this.element.querySelector("polyline");
      line.setAttribute("fill", "none");
      this.holder.appendChild(this.element);
    }
    let halfT = this.properties.t / 2;
    let width = this.properties.s[0] + this.properties.t;
    let height = this.properties.s[1] + this.properties.t;
    this.element.style.width = width + "px";
    this.element.style.height = height + "px";
    let svg = this.element.querySelector("svg");
    let path = svg.querySelector("polyline");
    let drawSetPoints = "";
    if (this.properties.d.length == 2) {
      drawSetPoints = (width / 2) + "," + (height / 2) + " " + ((width / 2) + .1) + "," + ((height / 2) + .1);
      path.setAttribute("stroke-width", width);
    } else {
      this.cache.scaleWidth = 1;
      this.cache.scaleHeight = 1;
      if (this.properties.s[0] > 0 || this.properties.s[1] > 0) {
        let largestX = this.properties.d[0];
        let largestY = this.properties.d[1];
        for (let i = 2; i < this.properties.d.length; i += 2) {
          largestX = Math.max(largestX, this.properties.d[i]);
          largestY = Math.max(largestY, this.properties.d[i + 1]);
        }
        if (largestX > 0) {
          this.cache.scaleWidth = this.properties.s[0] / largestX;
        } else {
          this.cache.scaleWidth = this.properties.s[0];
        }
        if (largestY > 0) {
          this.cache.scaleHeight = this.properties.s[1] / largestY;
        } else {
          this.cache.scaleHeight = this.properties.s[1];
        }
      }
      for (let i = 0; i < this.properties.d.length; i += 2) {
        drawSetPoints += (halfT + (this.properties.d[i] * this.cache.scaleWidth)) + "," + (halfT + (this.properties.d[i + 1] * this.cache.scaleHeight)) + " ";
      }
      path.setAttribute("stroke-width", this.properties.t);
    }
    path.setAttribute("points", drawSetPoints);
    path.setAttribute("stroke", "#" + this.properties.c);
    path.setAttribute("opacity", this.properties.o / 100);

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}