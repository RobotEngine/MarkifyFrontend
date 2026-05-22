import { BaseAnnotation } from "../BaseAnnotation";

import { darkenHex } from "../../utils/darken-hex";

export class Annotation extends BaseAnnotation {
  ACTION_BAR_TOOLS = ["color", "thickness", "opacity", "style", "unlock", "delete"];

  render() {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.innerHTML = `<svg></svg>`; // xmlns="http://www.w3.org/2000/svg"
      this.holder.appendChild(this.element);
    }
    let t = this.properties.t;
    let halfT = t / 2;
    if (this.properties.b == "none" && this.properties.d != "line") {
      t = 0;
      halfT = 0;
    }
    let width = this.properties.s[0] + t;
    let height = this.properties.s[1] + t;
    this.element.style.width = width + "px";
    this.element.style.height = height + "px";
    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }
    let svg = this.element.querySelector("svg");
    if (this.properties.remove != true) {
      svg.removeAttribute("hidden");
    } else {
      svg.setAttribute("hidden", "");
    }
    //svg.setAttribute("viewBox", "0 0 " + width + " " + height);

    let elem;
    let widthT;
    let heightT;
    let i = this.properties.i;
    let shapes = {
      "square": () => {
        elem = svg.querySelector("rect");
        if (elem == null) {
          svg.innerHTML = "<rect/>";
          elem = svg.querySelector("rect");
          elem.setAttribute("rx", "10");
          elem.setAttribute("ry", "10");
        }
        elem.setAttribute("width", Math.max(Math.abs(width - t), 5));
        elem.setAttribute("height", Math.max(Math.abs(height - t), 5));
        elem.setAttribute("x", halfT);
        elem.setAttribute("y", halfT);
      },
      "ellipse": () => {
        elem = svg.querySelector("ellipse");
        if (elem == null) {
          svg.innerHTML = "<ellipse/>";
          elem = svg.querySelector("ellipse");
        }
        elem.setAttribute("cx", width / 2);
        elem.setAttribute("cy", height / 2);
        elem.setAttribute("rx", Math.max(Math.abs(width - t) / 2, 5));
        elem.setAttribute("ry", Math.max(Math.abs(height - t) / 2, 5));
      },
      "triangle": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", ((widthT / 2) + halfT) + "," + halfT + " " + halfT + "," + (heightT + halfT) + " " + (widthT + halfT) + "," + (heightT + halfT));
      },
      "parallelogram": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", (halfT + (widthT * .2)) + "," + halfT + " " + (widthT + halfT) + "," + halfT + " " + (widthT + halfT - (widthT * .2)) + "," + (heightT + halfT) + " " + halfT + "," + (heightT + halfT));
      },
      "trapezoid": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", (halfT + (widthT * .2)) + "," + halfT + " " + (widthT + halfT - (widthT * .2)) + "," + halfT + " " + (widthT + halfT) + "," + (heightT + halfT) + " " + halfT + "," + (heightT + halfT));
      },
      "rhombus": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", (halfT + (widthT * .5)) + "," + halfT + " " + (widthT + halfT) + "," + (halfT + (heightT * .5)) + " " + (halfT + (widthT * .5)) + "," + (heightT + halfT) + " " + halfT + "," + (halfT + (heightT * .5)));
      },
      "oval": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }

        widthT = width - t;
        heightT = height - t;

        let segments = 20; // smoothness
        let halfT = t / 2; // Make sure halfT is defined

        let cx = (widthT / 2) + halfT;
        let cy = (heightT / 2) + halfT;

        // Pill radius for rounded ends is half the smaller dimension
        let radiusX = heightT / 2;  // For horizontal pill, radius X = half height
        let radiusY = heightT / 2;  // For horizontal pill, radius Y = half height

        let rectHalfLenX = 0;
        let rectHalfLenY = 0;

        if (width >= height) {
          // Horizontal pill
          rectHalfLenX = (widthT / 2) - radiusX;
          rectHalfLenY = 0;
          segments = Math.max(widthT / 10, 10);
        } else {
          // Vertical pill
          rectHalfLenX = 0;
          rectHalfLenY = (heightT / 2) - (widthT / 2); // rectangle length along Y axis, subtract radius which is half width for vertical pill
          segments = Math.max(heightT / 10, 10);
        }

        // For vertical pill, radiusX and radiusY swap roles because the semicircles are vertical

        let pillPoints = [];

        if (width >= height) {
          // Horizontal pill — semicircle on left and right ends
          // Left semicircle (top to bottom)
          for (let i = 0; i <= segments; i++) {
            let angle = Math.PI / 2 + (i / segments) * Math.PI;
            let x = cx - rectHalfLenX + Math.cos(angle) * radiusX;
            let y = cy + Math.sin(angle) * radiusY;
            pillPoints.push(`${x},${y}`);
          }

          // Right semicircle (bottom to top)
          for (let i = 0; i <= segments; i++) {
            let angle = (3 * Math.PI) / 2 + (i / segments) * Math.PI;
            let x = cx + rectHalfLenX + Math.cos(angle) * radiusX;
            let y = cy + Math.sin(angle) * radiusY;
            pillPoints.push(`${x},${y}`);
          }
        } else {
          // Vertical pill — semicircle on top and bottom ends
          let radius = widthT / 2; // radius is half the width for vertical pill

          // Top semicircle (left to right)
          for (let i = 0; i <= segments; i++) {
            let angle = Math.PI + (i / segments) * Math.PI;
            let x = cx + Math.cos(angle) * radius;
            let y = cy - rectHalfLenY + Math.sin(angle) * radius;
            pillPoints.push(`${x},${y}`);
          }

          // Bottom semicircle (right to left)
          for (let i = 0; i <= segments; i++) {
            let angle = 0 + (i / segments) * Math.PI;
            let x = cx + Math.cos(angle) * radius;
            let y = cy + rectHalfLenY + Math.sin(angle) * radius;
            pillPoints.push(`${x},${y}`);
          }
        }

        elem.setAttribute("points", pillPoints.join(" "));
      },
      "arrow": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        // Arrowhead grows at 1/3 the rate of the shaft
        //let baseArrowheadWidth = widthT * 0.2;
        //let extraWidth = widthT * 0.2;
        //let arrowheadGrowth = extraWidth * (1/3);
        let arrowheadWidth = Math.max(Math.min(widthT - 25, heightT / 2), 10); //baseArrowheadWidth + arrowheadGrowth;
        let shaftEnd = (widthT + halfT) - arrowheadWidth;
        // Arrow points: shaft with fixed-size head
        elem.setAttribute("points",
          (halfT) + "," + (heightT * 0.2 + halfT) + " " +
          (shaftEnd) + "," + (heightT * 0.2 + halfT) + " " + 
          (shaftEnd) + "," + (halfT) + " " + 
          (widthT + halfT) + "," + (heightT / 2 + halfT) + " " +
          (shaftEnd) + "," + (heightT + halfT) + " " + 
          (shaftEnd) + "," + (heightT * 0.8 + halfT) + " " + 
          (halfT) + "," + (heightT * 0.8 + halfT)
        );
      },
      "star": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        // Calculate star points that touch the edges:
        let cx = (widthT / 2) + halfT; //halfT + widthT / 2;
        let cy = (heightT / 2) + halfT; //halfT + heightT / 2;  //keep or change back to halfT?
        let spikes = 5;
        let outerRadiusX = (width - t) / 2;
        let outerRadiusY = (height - t) / 2;           
        let innerRadiusX = outerRadiusX * 0.5;
        let innerRadiusY = outerRadiusY * 0.5;
        let rawPoints = [];
        let minX;
        let maxX;
        let minY;
        let maxY;
        for (let i = 0; i < spikes * 2; i++) {
          let angle = (Math.PI / spikes) * i;
          let rX = (i % 2 === 0) ? outerRadiusX : innerRadiusX;
          let rY = (i % 2 === 0) ? outerRadiusY : innerRadiusY;
          let x = cx + Math.cos(angle - Math.PI/2) * rX;
          let y = cy + Math.sin(angle - Math.PI/2) * rY;
          rawPoints.push([x, y]);
          minX = Math.min(minX ?? x, x);
          maxX = Math.max(maxX ?? x, x);
          minY = Math.min(minY ?? y, y);
          maxY = Math.max(maxY ?? y, y);
        }
        let scaleX = widthT / (maxX - minX);
        let scaleY = heightT / (maxY - minY);
        let starPoints = "";
        for (let [xNorm, yNorm] of rawPoints) {
          let x = cx + (xNorm - (minX + maxX) / 2) * scaleX;
          let y = cy + (yNorm - (minY + maxY) / 2) * scaleY;
          starPoints += x + "," + y + " ";
        }
        elem.setAttribute("points", starPoints.substring(0, starPoints.length - 1));
      },
      "plus": () => {
        elem = svg.querySelector("path");
        if (elem == null) {
          svg.innerHTML = "<path/>";
          elem = svg.querySelector("path");
          elem.setAttribute("stroke-linejoin", "round");
        }

        widthT = width - t;
        heightT = height - t;

        let halfT = t / 2;
        let cx = (widthT / 2) + halfT;
        let cy = (heightT / 2) + halfT;

        // Thickness of each arm
        let armThickness = Math.min(widthT, heightT) / 2.5; //3
        let halfArm = armThickness / 2;

        // Half width/height of the full shape
        let halfW = widthT / 2;
        let halfH = heightT / 2;

        let commands = [];

        // Top left of vertical arm
        commands.push("M", cx - halfArm, cy - halfH);
        commands.push("L", cx + halfArm, cy - halfH);
        commands.push("L", cx + halfArm, cy - halfArm);
        commands.push("L", cx + halfW, cy - halfArm);
        commands.push("L", cx + halfW, cy + halfArm);
        commands.push("L", cx + halfArm, cy + halfArm);
        commands.push("L", cx + halfArm, cy + halfH);
        commands.push("L", cx - halfArm, cy + halfH);
        commands.push("L", cx - halfArm, cy + halfArm);
        commands.push("L", cx - halfW, cy + halfArm);
        commands.push("L", cx - halfW, cy - halfArm);
        commands.push("L", cx - halfArm, cy - halfArm);
        commands.push("Z");

        elem.setAttribute("d", commands.join(" "));
      },
      "heart": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;

        let rawPoints = [];
        let minX;
        let maxX;
        let minY;
        let maxY;

        let steps = 100;
        for (let i = 0; i <= steps; i++) {
          let t = Math.PI - (i / steps) * 2 * Math.PI;
          let x = 16 * Math.pow(Math.sin(t), 3);
          let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          rawPoints.push([x, y]);
          minX = Math.min(minX ?? x, x);
          maxX = Math.max(maxX ?? x, x);
          minY = Math.min(minY ?? y, y);
          maxY = Math.max(maxY ?? y, y);
        }

        let scaleX = widthT / (maxX - minX);
        let scaleY = heightT / (maxY - minY);

        let cx = width / 2;
        let cy = height / 2;

        let heartPoints = "";
        for (let [xNorm, yNorm] of rawPoints) {
          let x = cx + (xNorm - (minX + maxX) / 2) * scaleX;
          let y = cy + (yNorm - (minY + maxY) / 2) * scaleY;
          heartPoints += `${x},${y} `;
        }

        elem.setAttribute("points", heartPoints.trim());
      },
      "speech": () => {
        elem = svg.querySelector("path");
        if (elem == null) {
          svg.innerHTML = "<path/>";
          elem = svg.querySelector("path");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;

        let bubbleWidth = widthT;    // Main bubble is 85% of width
        let bubbleHeight = heightT * 0.8;  // Main bubble is 75% of height
        let bubbleX = halfT; // + widthT * 0.01; // Offset from left
        let bubbleY = halfT;                // Top of bubble
        let cornerRadius = Math.min(bubbleWidth, bubbleHeight) * 0.15; // Rounded corners
        
        // Tail positioning
        let tailStartX = bubbleX + bubbleWidth * 0.2;  // Tail starts 20% across bubble
        let tailStartY = bubbleY + bubbleHeight;       // At bottom of bubble
        let tailPointX = halfT + widthT * 0.15;        // Tail point at left edge
        let tailPointY = halfT + heightT;        // Tail point at bottom
        let tailEndX = bubbleX + bubbleWidth * 0.4;   // Tail ends 50% across bubble
        let tailEndY = bubbleY + bubbleHeight;         // At bottom of bubble
        
        // Build speech bubble path
        let stringPath = "M " + (bubbleX + cornerRadius) + "," + bubbleY + " " +
        // Top edge with rounded corners
        "L " + (bubbleX + bubbleWidth - cornerRadius) + "," + bubbleY + " " +
        "Q " + (bubbleX + bubbleWidth) + "," + bubbleY + " " + (bubbleX + bubbleWidth) + "," + (bubbleY + cornerRadius) + " " +
        // Right edge
        "L " + (bubbleX + bubbleWidth) + "," + (bubbleY + bubbleHeight - cornerRadius) + " " +
        "Q " + (bubbleX + bubbleWidth) + "," + (bubbleY + bubbleHeight) + " " + (bubbleX + bubbleWidth - cornerRadius) + "," + (bubbleY + bubbleHeight) + " " +
        // Bottom edge to tail start
        "L " + tailEndX + "," + tailEndY + " " +
        // Tail
        "L " + tailPointX + "," + tailPointY + " " +
        "L " + tailStartX + "," + tailStartY + " " +
        // Rest of bottom edge
        "L " + (bubbleX + cornerRadius) + "," + (bubbleY + bubbleHeight) + " " +
        "Q " + bubbleX + "," + (bubbleY + bubbleHeight) + " " + bubbleX + "," + (bubbleY + bubbleHeight - cornerRadius) + " " +
        // Left edge
        "L " + bubbleX + "," + (bubbleY + cornerRadius) + " " +
        "Q " + bubbleX + "," + bubbleY + " " + (bubbleX + cornerRadius) + "," + bubbleY + " Z";
        
        elem.setAttribute("d", stringPath);
      },
      /*"thoughtbubble": () => {
        elem = svg.querySelector("g");
        if (elem == null) {
          svg.innerHTML = "<g/>";
          elem = svg.querySelector("g");
        }
        widthT = width - t;
        heightT = height - t;
        // Main bubble
        let mainBubble = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        mainBubble.setAttribute("cx", width / 2);
        mainBubble.setAttribute("cy", height / 2);
        mainBubble.setAttribute("rx", Math.max(widthT / 2.2, 5));
        mainBubble.setAttribute("ry", Math.max(heightT / 2.2, 5));
        // Small bubbles
        let small1 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        small1.setAttribute("cx", widthT * 0.7 + halfT);
        small1.setAttribute("cy", heightT + halfT);
        small1.setAttribute("rx", widthT * 0.08);
        small1.setAttribute("ry", heightT * 0.08);
        let small2 = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        small2.setAttribute("cx", widthT * 0.8 + halfT);
        small2.setAttribute("cy", heightT + halfT + 15);
        small2.setAttribute("rx", widthT * 0.05);
        small2.setAttribute("ry", heightT * 0.05);
        elem.innerHTML = "";
        elem.appendChild(mainBubble);
        elem.appendChild(small1);
        elem.appendChild(small2);
      },*/
      "polygon": () => {
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        let rawPoints = [];
        let minX;
        let maxX;
        let minY;
        let maxY;
        for (let i = 0; i < 6; i++) {
          let angle = Math.PI / 3 * i;
          let x = halfT + widthT / 2 + Math.cos(angle) * widthT / 2; 
          let y = halfT + heightT / 2 + Math.sin(angle) * heightT / 2;
          rawPoints.push([x, y]);
          minX = Math.min(minX ?? x, x);
          maxX = Math.max(maxX ?? x, x);
          minY = Math.min(minY ?? y, y);
          maxY = Math.max(maxY ?? y, y);
        }
        let cx = (widthT / 2) + halfT;
        let cy = (heightT / 2) + halfT;
        let scaleX = widthT / (maxX - minX);
        let scaleY = heightT / (maxY - minY);
        let polygonPoints = "";
        for (let [xNorm, yNorm] of rawPoints) {
          let x = cx + (xNorm - (minX + maxX) / 2) * scaleX;
          let y = cy + (yNorm - (minY + maxY) / 2) * scaleY;
          polygonPoints += x + "," + y + " ";
        }
        elem.setAttribute("points", polygonPoints.trim());
      },
      "line": () => {
        elem = svg.querySelector("line");
        if (elem == null) {
          svg.innerHTML = "<line/>";
          elem = svg.querySelector("line");
          elem.setAttribute("stroke-linecap", "round");
        }
        let b = this.properties.b;
        if (b == "none") {
          b = "solid";
        }
        i = false;
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("x1", widthT + halfT);
        elem.setAttribute("y1", halfT);
        elem.setAttribute("x2", halfT);
        elem.setAttribute("y2", heightT + halfT);
      }
    };
    shapes[this.properties.d ?? "square"]();

    if (this.properties.b == "none") {
      i = true;
    }
    if (i != true) {
      elem.setAttribute("fill", "none");
      elem.setAttribute("stroke", "#" + this.properties.c);
    } else {
      elem.setAttribute("fill", "#" + this.properties.c);
      elem.setAttribute("stroke", "#" + darkenHex(this.properties.c, 20));
    }
    if ((this.properties.b ?? "solid") == "solid") {
      elem.setAttribute("stroke-width", t);
      elem.removeAttribute("stroke-dasharray");
    } else if (this.properties.b == "dashed") {
      elem.setAttribute("stroke-width", t);
      elem.setAttribute("stroke-dasharray", (t * 2) + ", " + (t * 2));
      elem.setAttribute("stroke-linecap", "round");
    } else {
      elem.setAttribute("stroke-width", 0);
    }

    elem.setAttribute("opacity", this.properties.o / 100);

    let svgtransform;
    if (width < 0 && height < 0) {
      svgtransform = "scale(-1,-1)";
    } else if (width < 0) {
      svgtransform = "scale(-1,1)";
    } else if (height < 0) {
      svgtransform = "scale(1,-1)";
    }
    if (elem != null) {
      elem.style.transform = svgtransform;
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}