import { BaseAnnotation } from "../../Render";

import { cleanString } from "@/crucial";

export class Annotation extends BaseAnnotation {
  CAN_ERASE = true;
  CAN_BE_SNAPPED_TO = false;

  ACTION_BAR_TOOLS = ["color", "thickness", "opacity", "unlock", "delete"];

  SELECTION_FUNCTION(selection) {
    if (["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      return { resizePreserveAspect: true };
    }
  }

  render() {
    let halfT = this.properties.t / 2;
    let width = this.properties.s[0] + this.properties.t;
    let height = this.properties.s[1] + this.properties.t;
    let drawSetPoints = "";
    if (this.properties.d.length > 2) {
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
      drawSetPoints = "M " + (halfT + (this.properties.d[0] * this.cache.scaleWidth)) + "," + (halfT + (this.properties.d[1] * this.cache.scaleHeight));
      if (this.properties.d.length > 4) {
        drawSetPoints += " Q ";
        for (let i = 2; i < this.properties.d.length; i += 2) {
          let pointX = this.properties.d[i];
          let pointY = this.properties.d[i + 1];
          let nextX = this.properties.d[i + 2] ?? pointX;
          let nextY = this.properties.d[i + 3] ?? pointY;
          drawSetPoints +=
            (halfT + (pointX * this.cache.scaleWidth)) + "," + (halfT + (pointY * this.cache.scaleHeight)) + " " +
            (halfT + (((pointX + nextX) / 2) * this.cache.scaleWidth)) + "," + (halfT + (((pointY + nextY) / 2) * this.cache.scaleHeight)) + " ";
        }
      } else {
        drawSetPoints += " L " + (halfT + (this.properties.d[2] * this.cache.scaleWidth)) + "," + (halfT + (this.properties.d[3] * this.cache.scaleHeight));
      }
    } else {
      drawSetPoints = "M " + halfT + "," + halfT + " L " + (halfT + .01) + "," + (halfT + .01);
    }
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.style.width = width + "px";
      this.element.style.height = height + "px";
      this.element.innerHTML = `<svg>
        <path stroke-width="${parseFloat(this.properties.t)}" d="${drawSetPoints}" stroke="${"#" + cleanString(this.properties.c)}" opacity="${parseFloat(this.properties.o) / 100}"/>
      </svg>`;
      let path = this.element.querySelector("path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      this.holder.appendChild(this.element);
    } else {
      this.element.style.width = width + "px";
      this.element.style.height = height + "px";
      let svg = this.element.querySelector("svg");
      let path = svg.querySelector("path");
      path.setAttribute("stroke-width", this.properties.t);
      if (this.cache.lastDrawSetPoints != drawSetPoints) {
        this.cache.lastDrawSetPoints = drawSetPoints;
        path.setAttribute("d", drawSetPoints);
      }
      path.setAttribute("stroke", "#" + this.properties.c);
      path.setAttribute("opacity", this.properties.o / 100);
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}