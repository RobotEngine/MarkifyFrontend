modules["editor/editor"] = class {
  html = `
  <div class="eContent">
    <div class="eRealtime"></div>
    <div class="eEditorContent">
      <div class="eAnnotations"></div>
    </div>
    <div class="eBackground"></div>
  </div>
  `;
  css = {
    ".eContent": `--interfacePadding: 58px; position: relative; display: flex; flex-direction: column; width: fit-content; min-width: calc(100% - (var(--interfacePadding) * 2)); min-height: calc(100vh - (var(--interfacePadding) * 2)); padding: var(--interfacePadding); align-items: center; overflow: hidden; background-color: var(--backgroundColor); pointer-events: all; transition: background-color .3s; --zoom: 1`,
    ".eRealtime": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; overflow: hidden; pointer-events: none`,
    ".eEditorContent": `position: relative`,
    ".eAnnotations": `--startZIndex: 0; position: relative; width: 1px; height: 1px; transform-origin: 0 0; transform: scale(var(--zoom)); z-index: 2; pointer-events: none`,
    ".eBackground": `position: absolute; left: 0px; top: 0px; opacity: .075; transform-origin: left top; background-position: center; z-index: 1`,

    ".eAnnotation": `position: absolute; left: 0px; top: 0px; z-index: calc(var(--startZIndex) + var(--zIndex))`,
    ".eAnnotation[hidden]": `display: none !important`,
    ".eAnnotation[anno]": `transition: all .25s, z-index 0s`,
    //".eAnnotation:not([anno])": `display: none !important`,
    ".eAnnotationHolder": `position: absolute; z-index: 10`,
    //".eAnnotationHolder[notransition] > .eAnnotation": `transition: unset !important`,
    ".eAnnotation > svg": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: none; overflow: visible`,
    ".eAnnotation > svg > *": `pointer-events: visiblepainted`,
    
    ".eReaction": `display: flex; padding: 2px; background: rgba(255, 255, 255, .8); border: solid 2px rgba(0, 0, 0, 0); border-radius: 8px; align-items: center; overflow: hidden; color: #2F2F2F`,
    ".eReaction[selected]": `padding: 2px; background: rgba(180, 218, 253, .8); border: solid 2px var(--theme); color: var(--theme)`,
    ".eReaction[add]": `opacity: 0; border-radius: 14px`,
    ".eContentHolder[viewer] .eReaction[add]": "display: none !important",
    ".eReaction div[imgholder]": `display: flex; width: 20px; height: 20px; justify-content: center; align-items: center`,
    ".eReaction img": `width: 32px; height: 32px; transform: scale(0.65); border-radius: 7px; filter: drop-shadow(0px 0px 8px #fff)`,
    ".eReaction div[count]": `margin: 0 5px 0 6px; font-size: 16px; font-weight: 700`
  };

  pipeline = { // PIPELINE : Distributes events across various modules and services:
    pipeline: {}, // All active events
    pipelineSubs: {}, // All active subscribes
    publish: async (event, data) => {
      let listeners = this.pipeline.pipeline[event] ?? [];
      for (let i = 0; i < listeners.length; i++) {
        let subscribe = (this.pipeline.pipelineSubs[listeners[i]] ?? {})[event] ?? {};
        if (subscribe.callback != null) {
          await subscribe.callback(data);
        }
      }
    },
    subscribe: (id, event, callback, extra) => {
      extra = extra ?? {};

      if (extra.unsubscribe != true) {
        this.pipeline.unsubscribe(id, event);
      } else {
        this.pipeline.unsubscribe(id);
      }

      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        this.pipeline.pipelineSubs[id] = {};
        pipelineSubs = this.pipeline.pipelineSubs[id];
      }
      let subData = { callback: callback };
      pipelineSubs[event] = subData;

      let pipelineEvent = this.pipeline.pipeline[event];
      if (pipelineEvent == null) {
        this.pipeline.pipeline[event] = [];
        pipelineEvent = this.pipeline.pipeline[event];
      }
      pipelineEvent.push(id);
      if (extra.sort != null) {
        subData.sort = extra.sort;
        pipelineEvent.sort((a, b) => {
          return (((this.pipeline.pipelineSubs[a] ?? {})[event] ?? {}).sort ?? 0) - (((this.pipeline.pipelineSubs[b] ?? {})[event] ?? {}).sort ?? 0);
        });
      }
    },
    unsubscribe: (id, event) => {
      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        return;
      }
      let checkEvents;
      if (event != null) {
        checkEvents = [event];
      } else {
        checkEvents = Object.keys(pipelineSubs);
      }
      for (let i = 0; i < checkEvents.length; i++) {
        let check = checkEvents[i];
        let pipelineEvents = this.pipeline.pipeline[check] ?? [];
        let index = pipelineEvents.indexOf(id);
        if (index > -1) {
          pipelineEvents.splice(index, 1);
        }
        if (pipelineEvents.length < 1) {
          delete this.pipeline.pipeline[check];
        }
        delete this.pipeline.pipelineSubs[id][check];
      }
      if (Object.keys(pipelineSubs).length < 1) {
        delete this.pipeline.pipelineSubs[id];
      }
    }
  };

  utils = {
    hexToRGBString: (hex, alpha) => {
      if (hex == null) {
        return "";
      }
      if (hex.startsWith("#") == true) {
        hex = hex.substring(1);
      }
      if (hex.length < 4) {
        hex = hex + hex;
      }
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;
      if (alpha != null) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
      } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
      }
    },
    hexToRGB: function (hex) {
      if (hex.length < 4) {
        hex = hex.split("").map((hexVal) => { return hexVal + hexVal }).join("");
      }
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
      return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
    },
    hslToHex: (h, s, l) => {
      l /= 100;
      let a = s * Math.min(l, 1 - l) / 100;
      let f = n => {
        let k = (n + h / 30) % 12;
        let color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
      }
      return `${f(0)}${f(8)}${f(4)}`;
    },
    hsvToHex: (h, s, b) => {
      let x = (200 - s) * b / 100;
      s = x === 0 || x === 200 ? 0 : Math.round(s * b / (x <= 100 ? x : 200 - x));
      let l = Math.round(x / 2);
      return this.utils.hslToHex(h, s, l);
    },
    hexToHSL: (hex) => {
      let [r, g, b] = this.utils.hexToRGB(hex);
  
      r /= 255, g /= 255, b /= 255;
      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
  
      if (max == min) {
        h = s = 0;
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
  
      return [Math.round(360 * h), Math.round(s * 100), Math.round(l * 100)];
    },
    hexToHSV: (hex) => {
      let [h, s, l] = this.utils.hexToHSL(hex);
      let x = s * (l < 50 ? l : 100 - l);
      let b = l + (x / 100);
      return [h, l === 0 ? s : 2 * x / b, l + (x / 100)];
    },
    rgbToHex: (r, g, b) => {
      return (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    },
    rgbStringToHex: (string) => {
      let rgb = string.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return this.utils.rgbToHex(rgb[1], rgb[2], rgb[3]);
    },
    darkenHex: (hexCode, percent) => {
      // Ensure the percent is within the valid range [0, 100]
      percent = Math.max(0, Math.min(100, percent));

      // Convert hex code to RGB
      let r = parseInt(hexCode.slice(0, 2), 16);
      let g = parseInt(hexCode.slice(2, 4), 16);
      let b = parseInt(hexCode.slice(4, 6), 16);

      // Calculate darkening factor
      let factor = 1 - percent / 100;

      // Darken the color components
      r = Math.max(0, Math.floor(r * factor));
      g = Math.max(0, Math.floor(g * factor));
      b = Math.max(0, Math.floor(b * factor));

      // Convert back to hex
      return `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    },
    lightenHex: (hexCode, percent) => {
      // Ensure the percent is within the valid range [0, 100]
      percent = Math.max(0, Math.min(100, percent));

      // Convert hex code to RGB
      let r = parseInt(hexCode.slice(0, 2), 16);
      let g = parseInt(hexCode.slice(2, 4), 16);
      let b = parseInt(hexCode.slice(4, 6), 16);

      // Calculate lightening factor
      let factor = percent / 100;

      // Lighten the color components
      r = Math.min(255, Math.floor(r + (255 - r) * factor));
      g = Math.min(255, Math.floor(g + (255 - g) * factor));
      b = Math.min(255, Math.floor(b + (255 - b) * factor));

      // Convert back to hex
      return `${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    },
    contrastCheck: (bgColor) => {
      if (bgColor == null) {
        return;
      }
      if (bgColor.length < 4) {
        bgColor = bgColor + bgColor;
      }
      let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
      let r = parseInt(color.substring(0, 2), 16); // hexToR
      let g = parseInt(color.substring(2, 4), 16); // hexToG
      let b = parseInt(color.substring(4, 6), 16); // hexToB
      let uicolors = [r / 255, g / 255, b / 255];
      let c = uicolors.map((col) => {
        if (col <= 0.03928) {
          return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
      });
      let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
      return L > 0.3;
    },
    borderColorBackground: (color, bgColor) => {
      bgColor = bgColor ?? this.utils.rgbStringToHex(getComputedStyle(this.page ?? body).getPropertyValue("--pageColor"));
      if (this.utils.contrastCheck(bgColor) == true) {
        if (this.utils.contrastCheck(color) == false) {
          return "#" + this.utils.lightenHex(color, 20);
        } else {
          return "#" + this.utils.darkenHex(color, 20);
        }
      } else {
        if (this.utils.contrastCheck(color) == true) {
          return "#" + this.utils.darkenHex(color, 20);
        } else {
          return "#" + this.utils.lightenHex(color, 20);
        }
      }
    },
    borderColorBackgroundRGBA: (color, bgColor, opacity) => {
      return this.utils.hexToRGBString(this.utils.borderColorBackground(color, bgColor), opacity ?? 1);
    },
    textColorBackground: (bgColor) => {
      return (this.utils.contrastCheck(bgColor) > 0.3) ? "#000" : "#fff"; // 0.179
    }
  };
  math = {
    round: (num, places) => {
      let pow = Math.pow(10, places ?? 2);
      return Math.ceil(num * pow) / pow;
    },
    simplifyPath: (points, epsilon) => {
      if (points.length <= 2) {
        return points;
      }
  
      let dmax = 0;
      let index = 0;
  
      for (let i = 2; i < points.length - 2; i += 2) {
        let d = this.math.perpendicularDistance(points.slice(i, i + 2), points.slice(0, 2), points.slice(-2));
        if (d > dmax) {
          index = i;
          dmax = d;
        }
      }
  
      if (dmax > epsilon) {
        let left = this.math.simplifyPath(points.slice(0, index + 2), epsilon);
        let right = this.math.simplifyPath(points.slice(index), epsilon);
        return left.slice(0, left.length - 2).concat(right);
      } else {
        if (points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]) {
          return [points[0], points[1], points[points.length - 2], points[points.length - 1]];
        } else {
          return [points[0], points[1]];
        }
      }
    },
    perpendicularDistance: (point, lineStart, lineEnd) => {
      return Math.abs((lineEnd[1] - lineStart[1]) * point[0] - (lineEnd[0] - lineStart[0]) * point[1] +
        lineEnd[0] * lineStart[1] - lineEnd[1] * lineStart[0]) /
        Math.sqrt(Math.pow(lineEnd[1] - lineStart[1], 2) + Math.pow(lineEnd[0] - lineStart[0], 2));
    },
    relativelyStraight: (coordinates, tolerance) => {
      // Extract pairs of points from the coordinates array
      let points = [];
      for (let i = 0; i < coordinates.length; i += 2) {
        points.push([coordinates[i], coordinates[i + 1]]);
      }
  
      // Calculate the slope between consecutive pairs of points
      let slope = null;
      for (let i = 0; i < points.length - 1; i++) {
        let [x1, y1] = points[i];
        let [x2, y2] = points[i + 1];
  
        let newSlope = (y2 - y1) / (x2 - x1);
  
        if (isFinite(newSlope)) {
          if (Math.abs(slope - newSlope) > tolerance) {
            return false; // Slopes differ significantly
          }
  
          slope = newSlope;
        }
      }
  
      return true; // All slopes are consistent
    },
    horizontalLine: (points) => {
      if (Math.abs(points[1] - points[3]) < 15) {
        return true;
      }
      return false;
    },
    isPointOnLine: (x, y, x1, y1, x2, y2, tolerance) => {
      let A = x - x1;
      let B = y - y1;
      let C = x2 - x1;
      let D = y2 - y1;

      let dot = A * C + B * D;
      let lenSq = C * C + D * D;
      let param = dot / lenSq;

      let closestX, closestY;

      if (param < 0 || (x1 == x2 && y1 == y2)) {
        closestX = x1;
        closestY = y1;
      } else if (param > 1) {
        closestX = x2;
        closestY = y2;
      } else {
        closestX = x1 + param * C;
        closestY = y1 + param * D;
      }

      let dx = x - closestX;
      let dy = y - closestY;
      let distance = Math.hypot(dx, dy); // Math.sqrt(dx * dx + dy * dy);

      return dx * dx + dy * dy <= tolerance * tolerance; // return distance <= tolerance;
    },
    rotatePoint: (pointX, pointY, angle = 0) => {
      if (angle == 0) {
        return [pointX, pointY];
      }
      let radian = angle * (Math.PI / 180);
      let cos = Math.cos(radian);
      let sin = Math.sin(radian);
      let newX = (cos * pointX) - (sin * pointY);
      let newY = (sin * pointX) + (cos * pointY);
      return [newX, newY];
    },
    rotatePointOrigin: (pointX, pointY, centerX, centerY, angle) => {
      let rotatedPoint = this.math.rotatePoint(pointX - centerX, pointY - centerY, angle);
      return [rotatedPoint[0] + centerX, rotatedPoint[1] + centerY];
    },
    rotatedBounds: (topLeftX, topLeftY, bottomRightX, bottomRightY, angle) => {
      if (bottomRightX < topLeftX) {
        [topLeftX, bottomRightX] = [bottomRightX, topLeftX];
      }
      if (bottomRightY < topLeftY) {
        [topLeftY, bottomRightY] = [bottomRightY, topLeftY];
      }
      
      let width = bottomRightX - topLeftX;
      let height = bottomRightY - topLeftY;
      let radian = (angle ?? 0) * (Math.PI / 180);

      let changedWidth = ((Math.abs(width * Math.cos(radian)) + Math.abs(height * Math.sin(radian))) - width) / 2;
      let changedHeight = ((Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian))) - height) / 2;
      
      return [topLeftX - changedWidth, topLeftY - changedHeight, bottomRightX + changedWidth, bottomRightY + changedHeight];
    },
    pointInRotatedBounds: (pointX, pointY, topLeftX, topLeftY, bottomRightX, bottomRightY, angle = 0, tolerance = 0) => {
      if (bottomRightX < topLeftX) {
        [topLeftX, bottomRightX] = [bottomRightX, topLeftX];
      }
      if (bottomRightY < topLeftY) {
        [topLeftY, bottomRightY] = [bottomRightY, topLeftY];
      }

      let width = bottomRightX - topLeftX;
      let height = bottomRightY - topLeftY;

      let centerX = topLeftX + (width / 2);
      let centerY = topLeftY + (height / 2);
      let [rotatedX, rotatedY] = this.math.rotatePoint(pointX - centerX, pointY - centerY, -angle);
      rotatedX += centerX;
      rotatedY += centerY;
      
      return rotatedX >= topLeftX - tolerance && rotatedX <= bottomRightX + tolerance && rotatedY >= topLeftY - tolerance && rotatedY <= bottomRightY + tolerance;
    }
  };

  isPageActive = () => {
    return this.active == true;
  }
  isThisPage = (element) => {
    return element != null && element.closest(".lPage") == this.pageFrame;
  }
  isEditorContent = (target) => {
    if (target == null) {
      return false;
    }
    return target.closest(".eContent") == this.content;
  }

  options = {
    snapping: true,
    cursors: true,
    cursornames: true,
    stylusmode: false,
    comments: true,
    fullscreen: false
  };
  settings = {};
  self = {};

  realtime = {
    subscribes: [],
    tool: 0, // 0: Pointer; 1: Markup; 2: Pen; 3: Erase
    observed: 0,
    forceShort: async () => {
      if (this.realtime.module != null) {
        await this.realtime.module.publishShort(null, null, true);
      }
    }
  };

  annotations = {};
  reactions = {};
  sources = {};
  sourceRenders = {};

  selecting = {};
  realtimeSelect = {};

  visibleChunks = [];
  defaultChunks = {};
  chunkAnnotations = {};
  chunkWidth = 1000;
  chunkHeight = 1000;
  scrollOffset = 58;

  visiblePages = [0];
  annotationPages = [];
  currentPage = 1;

  zoom = 1;
  maxLayer = null;
  minLayer = null;

  backgroundColor = "FFFFFF";

  js = async (frame) => {
    let contentHolder = this.contentHolder ?? frame.parentElement;
    let page = contentHolder.closest(".content");
    let content = contentHolder.querySelector(".eContent");
    let realtimeHolder = content.querySelector(".eRealtime");
    let editorContent = content.querySelector(".eEditorContent");
    let annotations = editorContent.querySelector(".eAnnotations");
    let background = content.querySelector(".eBackground");

    this.page = page;
    this.pageFrame = page.closest(".lPage");
    this.contentHolder = contentHolder;
    this.content = content;
    this.annotationHolder = annotations;

    frame.style.width = "fit-content";
    frame.style.height = "fit-content";

    let localOptions = getLocalStore("options");
    if (localOptions != null) {
      this.localOptions = JSON.parse(getLocalStore("options"));
      let localOptionKeys = Object.keys(this.localOptions);
      for (let i = 0; i < localOptionKeys.length; i++) {
        let option = localOptionKeys[i];
        this.options[option] = this.localOptions[option];
      }
    }

    let savePreferenceTimeout;
    let savePreference = async () => {
      let tempRevert = copyObject(this.lastSavePreferences);
      let changes = objectUpdate(this.preferences, this.lastSavePreferences);
      this.lastSavePreferences = copyObject(this.preferences);
      if (Object.keys(changes).length > 0) {
        let [code] = await sendRequest("POST", "lessons/save/preferences", { save: changes });
        if (code != 200) {
          this.lastSavePreferences = tempRevert;
        }
      }
    }
    this.savePreferences = async (skip) => {
      if (userID == null) {
        return; // Can't save if not a user!
      }
      clearTimeout(savePreferenceTimeout);
      if (skip == true) {
        return await savePreference();
      }
      savePreferenceTimeout = setTimeout(savePreference, 1000); // Save after 1 second of no changes
    }

    this.utils.getParents = (anno, includeSelecting) => {
      let parents = [];
      let parentIDs = [];
      let currentAnnoCheck = anno ?? {};
      while (currentAnnoCheck.parent != null) {
        let annoid = currentAnnoCheck.parent;
        if (annoid == null || parents.includes(parentIDs) == true) {
          break;
        }
        let annotation = this.annotations[annoid];
        if (annotation == null) {
          break;
        }
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = this.annotations[annoid];
        }
        if (annotation == null) {
          break;
        }
        if (includeSelecting != true) {
          currentAnnoCheck = annotation.render ?? {};
        } else {
          currentAnnoCheck = { ...(annotation.render ?? {}), ...(this.selecting[annotation.render._id] ?? {}) };
        }
        parents.push(currentAnnoCheck);
        parentIDs.push(annoid);
      }
      return parents;
    }
    this.utils.getParentIDs = (anno) => {
      return this.utils.getParents(anno).map((value) => { return value._id; });
    }
    this.utils.getThickness = (anno) => {
      let thickness = 0;
      if (anno.t != null) {
        if (anno.b != "none" || anno.d == "line") {
          thickness = anno.t;
        }
      }
      return thickness;
    }
    this.utils.getAbsolutePosition = (anno, includeSelecting) => {
      let [sizeWidth, sizeHeight] = [(anno.s ?? [])[0] ?? 1, (anno.s ?? [])[1] ?? 1];
      let thickness = this.utils.getThickness(anno);
      let width = Math.abs(sizeWidth) + thickness;
      let height = Math.abs(sizeHeight) + thickness;
      let topLeftX = (anno.p ?? [])[0] ?? 0;
      let topLeftY = (anno.p ?? [])[1] ?? 0;
      if (sizeWidth < 0) {
        topLeftX -= width;
      }
      if (sizeHeight < 0) {
        topLeftY -= height;
      }
      let bottomRightX = topLeftX + width;
      let bottomRightY = topLeftY + height;
      let returnRotation = anno.r ?? 0;

      let selectingParent = false;
      let parents = this.utils.getParents(anno, includeSelecting);
      for (let i = 0; i < parents.length; i++) {
        let render = parents[i];
        /*if (render.resizing != null) {
          render = (this.annotations[render._id] ?? {}).render ?? render;
        }*/
        if (this.selecting[render._id] != null) {
          selectingParent = true;
        }
        let rotate = render.r ?? 0;
        let [renderSizeWidth, renderSizeHeight] = [(render.s ?? [])[0] ?? 1, (render.s ?? [])[1] ?? 1];
        let renderThickness = this.utils.getThickness(render);
        let renderWidth = Math.abs(renderSizeWidth) + renderThickness;
        let renderHeight = Math.abs(renderSizeHeight) + renderThickness;
        let renderX = (render.p ?? [])[0] ?? 0;
        let renderY = (render.p ?? [])[1] ?? 0;
        if (renderSizeWidth < 0) {
          renderX -= renderWidth;
        }
        if (renderSizeHeight < 0) {
          renderY -= renderHeight;
        }
        let centerX = renderX + (renderWidth / 2);
        let centerY = renderY + (renderHeight / 2);

        if (render.resizing != null) {
          let [annoX, annoY] = this.math.rotatePointOrigin(renderX, renderY, centerX, centerY, rotate);
          let [changeX, changeY] = this.math.rotatePoint(render.resizing[3] - annoX, render.resizing[4] - annoY, -rotate);
          renderX += changeX;
          renderY += changeY;
        }

        [topLeftX, topLeftY] = this.math.rotatePointOrigin(
          topLeftX + renderX,
          topLeftY + renderY,
          centerX,
          centerY,
          rotate
        );
        [bottomRightX, bottomRightY] = this.math.rotatePointOrigin(
          bottomRightX + renderX,
          bottomRightY + renderY,
          centerX,
          centerY,
          rotate
        );

        returnRotation += rotate;
      }
      
      return { x: topLeftX, y: topLeftY, endX: bottomRightX, endY: bottomRightY, rotation: (returnRotation + 360) % 360, thickness: thickness, parents: parents, selectingParent: selectingParent };
    }
    this.utils.getRelativePosition = (anno, includeSelecting) => {
      let position = this.utils.getAbsolutePosition({ ...anno, parent: anno.prevParent });

      let topLeftX = position.x;
      let topLeftY = position.y;
      let bottomRightX = position.endX;
      let bottomRightY = position.endY;

      let returnRotation = 0;

      let parents = this.utils.getParents(anno, includeSelecting);
      for (let i = parents.length - 1; i > -1; i--) {
        let render = parents[i];
        let rotate = -(render.r ?? 0);
        let [renderSizeWidth, renderSizeHeight] = [(render.s ?? [])[0] ?? 1, (render.s ?? [])[1] ?? 1];
        let renderThickness = this.utils.getThickness(render);
        let renderWidth = Math.abs(renderSizeWidth) + renderThickness;
        let renderHeight = Math.abs(renderSizeHeight) + renderThickness;
        let renderX = (render.p ?? [])[0] ?? 0;
        let renderY = (render.p ?? [])[1] ?? 0;
        if (renderSizeWidth < 0) {
          renderX -= renderWidth;
        }
        if (renderSizeHeight < 0) {
          renderY -= renderHeight;
        }
        let centerX = renderX + (renderWidth / 2);
        let centerY = renderY + (renderHeight / 2);

        if (render.resizing != null) {
          let [annoX, annoY] = this.math.rotatePointOrigin(renderX, renderY, centerX, centerY, rotate);
          let [changeX, changeY] = this.math.rotatePoint(render.resizing[3] - annoX, render.resizing[4] - annoY, -rotate);
          renderX += changeX;
          renderY += changeY;
        }

        [topLeftX, topLeftY] = this.math.rotatePointOrigin(
          topLeftX,
          topLeftY,
          centerX,
          centerY,
          rotate
        );
        topLeftX -= renderX;
        topLeftY -= renderY;
        [bottomRightX, bottomRightY] = this.math.rotatePointOrigin(
          bottomRightX,
          bottomRightY,
          centerX,
          centerY,
          rotate
        );
        bottomRightX -= renderX;
        bottomRightY -= renderY;

        returnRotation += rotate;
      }
      
      let [sizeWidth, sizeHeight] = [(anno.s ?? [])[0] ?? 1, (anno.s ?? [])[1] ?? 1];
      let width = (Math.abs(sizeWidth) + position.thickness) / 2;
      let height = (Math.abs(sizeHeight) + position.thickness) / 2;
      let x = ((bottomRightX + topLeftX) / 2);
      let y = ((bottomRightY + topLeftY) / 2);
      if (sizeWidth > 0) {
        x -= width;
      } else {
        x += width;
      }
      if (sizeHeight > 0) {
        y -= height;
      } else {
        y += height;
      }
      return { x, y, rotation: (((anno.r ?? 0) + returnRotation) + 360) % 360, thickness: position.thickness, parents: parents };
    }
    this.utils.getRect = (anno, includeSelecting) => {
      anno = anno ?? {};
      let position = this.utils.getAbsolutePosition(anno, includeSelecting);
      let [sizeWidth, sizeHeight] = [(anno.s ?? [])[0] ?? 1, (anno.s ?? [])[1] ?? 1];
      let width = Math.abs(sizeWidth) + position.thickness;
      let height = Math.abs(sizeHeight) + position.thickness;
      let halfWidth = width / 2;
      let halfHeight = height / 2;
      let centerX = (position.endX + position.x) / 2;
      let centerY = (position.endY + position.y) / 2;

      let x = centerX - halfWidth;
      let y = centerY - halfHeight;
      let endX = centerX + halfWidth;
      let endY = centerY + halfHeight;

      let annoX = x;
      let annoY = y;
      if (sizeWidth < 0) {
        annoX = endX;
      }
      if (sizeHeight < 0) {
        annoY = endY;
      }

      return {
        annoX, annoY,
        x, y,
        centerX: centerX,
        centerY: centerY,
        endX, endY,
        width, height,
        size: [sizeWidth, sizeHeight],
        thickness: position.thickness,
        rotation: position.rotation,
        parents: position.parents,
        selectingParent: position.selectingParent
      };
    }
    this.utils.parentFromAnnotation = async (anno, includeSelecting) => {
      let id = anno._id;
      let prevParent = anno.prevParent;
      if (prevParent != null) {
        let parentAnno = this.annotations[prevParent];
        if (parentAnno != null && parentAnno.pointer != null) {
          prevParent = parentAnno.pointer;
        }
      }
      let { centerX: x, centerY: y } = this.utils.getRect(anno, includeSelecting);
      let selfRenderModule = (await this.render.getModule(null, (anno || {}).f)) ?? {};
      let chunk = this.utils.pointInChunk(x, y);
      let annotationIDs = Object.keys(this.chunkAnnotations[chunk] ?? {});
      let viableParents = [];
      if (includeSelecting == true) { // Must check for if new annotations are valid!
        let selectKeys = Object.keys(this.selecting);
        for (let i = 0; i < selectKeys.length; i++) {
          let selectKey = selectKeys[i];
          if (annotationIDs.includes(selectKey) == false) {
            annotationIDs.push(selectKey);
          }
        }
      }
      let types = {};
      let checkedTypes = {};
      for (let i = 0; i < annotationIDs.length; i++) {
        let annoid = annotationIDs[i];
        if (annoid == null || annoid == id) {
          continue;
        }
        let annotation = this.annotations[annoid] || {};
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = this.annotations[annoid];
        }
        let type = (annotation.render || {}).f;
        if (type == null || checkedTypes[type] != null) {
          continue;
        }
        checkedTypes[type] = true;
        let renderModule = await this.render.getModule(annotation, type);
        if (renderModule != null && (renderModule.CAN_PARENT_CHILDREN == true || selfRenderModule.CAN_BE_CHILD_ANY_PARENT == true) && renderModule.CAN_BE_CHILD_ANY_PARENT != true) {
          types[type] = true;
        }
      }
      for (let i = 0; i < annotationIDs.length; i++) {
        let annoid = annotationIDs[i];
        if (annoid == null || annoid == id) {
          continue;
        }
        let annotation = this.annotations[annoid] || {};
        if (annotation.pointer != null) {
          annoid = annotation.pointer;
          annotation = this.annotations[annoid];
        }
        let render = annotation.render || {}; // { ...(annotation.render ?? {}), ...(this.selecting[annoid] ?? {}) };
        if (includeSelecting == true) {
          render = { ...render, ...(this.selecting[annoid] ?? {}) };
        }
        if (types[render.f] == null) {
          continue;
        }
        if ((render.hidden == true || this.utils.isLocked(render) == true) && prevParent != annoid) {
          continue;
        }
        if (render.remove == true) {
          continue;
        }
        if (render.p == null || render.s == null) {
          continue;
        }
        let rect = this.utils.getRect(render, includeSelecting) ?? {};
        if (this.math.pointInRotatedBounds(x, y, rect.x, rect.y, rect.endX, rect.endY, rect.rotation) == true) {
          if (anno.l == null || anno.l > render.l) {
            viableParents.push(render);
          }
        }
      }
      let highestParent;
      let highestLayer;
      for (let i = 0; i < viableParents.length; i++) {
        let parent = viableParents[i];
        if ((parent.l ?? 0) > highestLayer || highestLayer == null) {
          highestLayer = parent.l ?? 0;
          highestParent = parent;
        }
      }
      if (highestParent == null) {
        return { parentID: null, parent: null };
      }
      return { parentID: highestParent._id, parent: highestParent };
    }
    this.utils.parentFromPoint = async (x, y, index) => {
      return await this.utils.parentFromAnnotation({ p: [x, y], l: index });
    }
    this.utils.applyRelativePosition = (anno) => {
      let { x: setX, y: setY } = this.utils.getRelativePosition(anno);
      anno.p = [setX, setY];
      return anno;
    }

    this.utils.localMousePosition = (mouse) => {
      let mouseX = mouse.x ?? mouse.clientX ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientX ?? 0;
      let mouseY = mouse.y ?? mouse.clientY ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientY ?? 0;
      let pageRect = page.getBoundingClientRect();
      return { mouseX: mouseX - pageRect.x, mouseY: mouseY - pageRect.y };
    }
    this.utils.convertBoundingRect = (frameRect) => {
      let pageRect = page.getBoundingClientRect();
      let diffX = frameRect.x - pageRect.x;
      let diffY = frameRect.y - pageRect.y;
      return {
        width: frameRect.width,
        height: frameRect.height,
        left: diffX,
        top: diffY,
        x: diffX + contentHolder.scrollLeft,
        y: diffY + contentHolder.scrollTop
      }
    }
    this.utils.localBoundingRect = (frame) => {
      return this.utils.convertBoundingRect(frame.getBoundingClientRect());
    }
    this.utils.scaleToDoc = (x, y, noOrigin) => {
      let pageRect = this.utils.localBoundingRect(annotations);
      if (noOrigin != true) {
        x -= pageRect.left;
        y -= pageRect.top;
      }
      let scaleZoom = 1 / this.zoom;
      return {
        x: this.math.round(x * scaleZoom),
        y: this.math.round(y * scaleZoom)
      }
    };
    this.utils.scaleToZoom = (x, y) => {
      let pageRect = this.utils.localBoundingRect(annotations);
      return {
        x: (x * this.zoom) + pageRect.left,
        y: (y * this.zoom) + pageRect.top
      };
    };
    this.utils.regionInChunks = (topx, topy, bottomx, bottomy) => {
      if (bottomx < topx) {
        let setBottomX = topx;
        topx = bottomx;
        bottomx = setBottomX;
      }
      if (bottomy < topy) {
        let setBottomY = topy;
        topy = bottomy;
        bottomy = setBottomY;
      }
      let topLeftChunkX = Math.floor(topx / this.chunkWidth) * this.chunkWidth;
      let topLeftChunkY = Math.floor(topy / this.chunkHeight) * this.chunkHeight;
      let bottomRightChunkX = Math.floor(bottomx / this.chunkWidth) * this.chunkWidth;
      let bottomRightChunkY = Math.floor(bottomy / this.chunkHeight) * this.chunkHeight;
      let xCord = topLeftChunkX;
      let yCord = topLeftChunkY;
      let chunks = [];
      while (yCord <= bottomRightChunkY) {
        while (xCord <= bottomRightChunkX) {
          chunks.push(xCord + "_" + yCord);
          xCord += this.chunkWidth;
        }
        xCord = topLeftChunkX;
        yCord += this.chunkHeight;
      }
      return chunks;
    }
    this.utils.annotationsInChunks = (chunks) => {
      let annotationKeys = {};
      let annotations = [];
      for (let i = 0; i < chunks.length; i++) {
        let keys = Object.keys(this.chunkAnnotations[chunks[i]] ?? {});
        for (let a = 0; a < keys.length; a++) {
          let key = keys[a];
          if (annotationKeys[key] == null) {
            annotationKeys[key] = true;
            let anno = this.annotations[key] ?? {};
            if (anno.pointer != null) {
              anno = this.annotations[anno.pointer] ?? { render: {} };
            }
            annotations.push(anno);
          }
        }
      }
      return annotations;
    }
    this.utils.renderedAnnotations = () => {
      return this.utils.annotationsInChunks(this.visibleChunks);
    }
    this.utils.chunksFromAnnotation = (render, includeSelecting) => {
      if (render.p == null) {
        return [];
      }
      let { x, y, endX, endY, rotation } = this.utils.getRect(render, includeSelecting);
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = this.math.rotatedBounds(x, y, endX, endY, rotation);
      return this.utils.regionInChunks(topLeftX, topLeftY, bottomRightX, bottomRightY);
    }
    this.utils.setAnnotationChunks = async (annotation, includeSelecting) => {
      if (annotation == null) {
        return;
      }
      let render = annotation.render;
      if (render == null) {
        return;
      }

      let chunks = [];
      let annotationVisible = false;

      if (render.remove != true) {
        let { x, y, endX, endY, rotation } = this.utils.getRect(render, includeSelecting);
        let [topLeftX, topLeftY, bottomRightX, bottomRightY] = this.math.rotatedBounds(x, y, endX, endY, rotation);
        
        chunks = this.utils.regionInChunks(topLeftX, topLeftY, bottomRightX, bottomRightY);

        for (let i = 0; i < chunks.length; i++) {
          let chunk = chunks[i];
          if (this.chunkAnnotations[chunk] == null) {
            this.chunkAnnotations[chunk] = {};
            await this.render.setMarginSize();
          }
          this.chunkAnnotations[chunk][render._id] = "";
          if (annotationVisible == false && this.visibleChunks.includes(chunk) == true) {
            annotationVisible = true;
          }
        }
      }
      if (annotation.chunks != null) {
        // Remove existing chunks:
        for (let i = 0; i < annotation.chunks.length; i++) {
          let chunk = annotation.chunks[i];
          if (chunks.includes(chunk) == false && this.defaultChunks[chunk] == null) {
            delete this.chunkAnnotations[chunk][render._id];
            if (Object.keys(this.chunkAnnotations[chunk]).length < 1) {
              delete this.chunkAnnotations[chunk];
              await this.render.setMarginSize();
            }
          }
        }
      }
      annotation.chunks = chunks;

      if (render.f == "page") { // Update Annotation Pages
        for (let i = 0; i < this.annotationPages.length; i++) {
          let annoid = this.annotationPages[i][0];
          if ((annoid ?? "").startsWith("pending_") == true) {
            let anno = this.annotations[annoid] ?? {};
            if (anno.pointer != null) {
              annoid = anno.pointer;
            }
          }
          if (annoid == render._id) {
            this.annotationPages.splice(i, 1);
            break;
          }
        }
        if (render.remove != true && (render._id ?? "").startsWith("pending_") == false) {
          if (render.parent == null) {
            let rect = this.utils.getRect(render);
            let [topLeftX, topLeftY, bottomRightX, bottomRightY] = this.math.rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);
            this.annotationPages.push([
              render._id,
              [rect.centerX, rect.centerY],
              [topLeftX, topLeftY, bottomRightX - topLeftX, bottomRightY - topLeftY],
              [render.source, render.number]
            ]);
            this.annotationPages.sort((a, b) => {
              if (b[1][1] > a[2][1] && b[1][1] < a[2][1] + a[2][3]) {
                return a[2][0] - b[2][0];
              }
              return a[2][1] - b[2][1];
            });
          }
        }
        clearTimeout(this.updatePageTimeout);
        this.updatePageTimeout = setTimeout(() => { this.utils.updateCurrentPage(true); }, 100);
      }
      
      if (annotationVisible == true) {
        if (annotation.component == null) {
          await this.render.create(annotation);
        }
      } else {
        this.render.remove(annotation);
      }
    }
    this.utils.pointInChunk = (x, y) => {
      return this.utils.regionInChunks(x, y, x, y)[0];
    }
    this.utils.annotationInViewport = (render = {}) => {
      let annotationRect = this.utils.localBoundingRect(annotations);
      let pageTopLeftX = -annotationRect.left / this.zoom;
      let pageTopLeftY = -annotationRect.top / this.zoom;
      let pageBottomRightX = (page.offsetWidth - annotationRect.left) / this.zoom;
      let pageBottomRightY = (page.offsetHeight - annotationRect.top) / this.zoom;
      let existingAnnoRect = this.utils.getRect(render);
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = this.math.rotatedBounds(existingAnnoRect.x, existingAnnoRect.y, existingAnnoRect.endX, existingAnnoRect.endY, existingAnnoRect.rotation);
      return bottomRightX > pageTopLeftX && topLeftX < pageBottomRightX && bottomRightY > pageTopLeftY && topLeftY < pageBottomRightY;
    }
    /*this.utils.topmostChunk = (lockX) => {
      let topmostChunk;
      let highestPoint;
      let chunks = Object.keys({ "0_0": [], ...this.chunkAnnotations });
      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        let split = chunk.split("_");
        let [xCoord, yCoord] = [parseFloat(split[0]), parseFloat(split[1])];
        if (lockX != null && xCoord != lockX) {
          continue;
        }
        if (yCoord < highestPoint || highestPoint == null) {
          if (this.chunkAnnotations[chunk].length < 1) {
            continue;
          }
          highestPoint = yCoord;
          topmostChunk = chunk;
        }
      }
      return topmostChunk;
    }*/

    this.utils.updateCurrentPage = (force) => {
      let activeElement = document.activeElement;
      if (activeElement != null) {
        let currentPageBox = activeElement.closest(".eCurrentPage");
        if (currentPageBox != null) { //== pageTextBox
          return;
        }
      }
      let pageRect = this.utils.localBoundingRect(editorContent);
      let centerPointX = ((page.offsetWidth / 2) - pageRect.left) / this.zoom;
      let centerPointY = ((page.offsetHeight / 2) - pageRect.top) / this.zoom;
      let minPage = 0;
      let minPageId;
      let minDistance;
      for (let i = 0; i < this.annotationPages.length; i++) {
        let page = this.annotationPages[i];
        let distance = Math.pow(page[1][0] - centerPointX, 2) + Math.pow(page[1][1] - centerPointY, 2);
        if (distance < minDistance || minDistance == null) {
          minDistance = distance;
          minPage = i + 1;
          minPageId = page[0];
        }
      }
      if (this.currentPage != minPage || force == true) {
        this.currentPage = minPage;
        this.pipeline.publish("page_change", { page: this.currentPage, pageId: minPageId });
      }
    }
    this.utils.updateAnnotationScroll = (pageData, animation) => {
      if (pageData == null) {
        return;
      }
      let annoID = pageData[0];
      this.pipeline.publish("page_change", { page: this.currentPage, pageId: annoID });
      if ((annoID ?? "").startsWith("pending_") == true) {
        let anno = this.annotations[annoID] ?? {};
        if (anno.pointer != null) {
          annoID = anno.pointer;
        }
      }
      let render = (this.annotations[annoID] ?? {}).render;
      if (render != null) {
        let annoRect = this.utils.getRect(render);
        let [topLeftX, topLeftY, bottomRightX] = this.math.rotatedBounds(annoRect.x, annoRect.y, annoRect.endX, annoRect.endY, annoRect.rotation);
        
        let annotationRect = this.utils.localBoundingRect(annotations);
        let options = {};
        if (annoRect.width * this.zoom < contentHolder.clientWidth - (this.scrollOffset * 2)) {
          // Position page to center:
          options.left = annotationRect.left + contentHolder.scrollLeft - (contentHolder.clientWidth / 2) + (annoRect.centerX * this.zoom);
        } else {
          // Position page to left corner:
          if ((account.settings ?? {}).toolbar != "right") {
            options.left = annotationRect.left + contentHolder.scrollLeft - this.scrollOffset + (topLeftX * this.zoom);
          } else {
            options.left = annotationRect.left + contentHolder.scrollLeft - contentHolder.clientWidth + this.scrollOffset + (bottomRightX * this.zoom);
          }
        }
        if (annoRect.height * this.zoom < contentHolder.clientHeight - (this.scrollOffset * 2)) {
          // Position page to center:
          options.top = annotationRect.top + contentHolder.scrollTop - (contentHolder.clientHeight / 2) + (annoRect.centerY * this.zoom);
        } else {
          // Position page to top:
          options.top = annotationRect.top + contentHolder.scrollTop - this.scrollOffset + (topLeftY * this.zoom);
        }
        if (animation != false) {
          options.behavior = "smooth";
        }
        contentHolder.scrollTo(options);
      }
      if (this.realtime.observing != null && this.realtime.module != null) {
        this.realtime.module.exitObserve();
      }
    }
    this.setPage = (pageNumber, animate) => {
      if (pageNumber < 1 || pageNumber > this.annotationPages.length) {
        return;
      }
      this.currentPage = pageNumber;
      this.utils.updateAnnotationScroll(this.annotationPages[this.currentPage - 1], animate);
    }

    this.utils.centerWindowWithPage = () => {
      let annotationRect = this.utils.localBoundingRect(annotations);
      contentHolder.scrollTo(contentHolder.scrollLeft + annotationRect.left - ((page.offsetWidth - annotations.offsetWidth) / 2), contentHolder.scrollTop + annotationRect.top - this.scrollOffset);
    }
    /*this.utils.findStartingPoint = () => {
      let topmostChunkY = parseFloat(this.utils.topmostChunk().split("_")[1]);
      let getChunkAnnotations = [];
      let chunks = Object.keys({ "0_0": "", ...this.chunkAnnotations });
      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        if (parseFloat(chunk.split("_")[1]) != topmostChunkY) {
          continue;
        }
        getChunkAnnotations.push(chunk);
      }
      let annotations = this.utils.annotationsInChunks(getChunkAnnotations);
      if (annotations.length < 1) {
        return;
      }
      annotations.sort((a, b) => {
        let aRect = this.utils.getRect(a.render);
        let bRect = this.utils.getRect(b.render);
        if (bRect.centerY > aRect.y && bRect.centerY < aRect.bottomY) {
          return aRect.x - bRect.x;
        }
        return aRect.y - bRect.y;
      });
      return this.utils.getRect(annotations[0].render);
    }*/
    /*this.utils.scrollToPoint = (x, y, animation) => {
      let annotationRect = this.utils.localBoundingRect(annotations);
      let options = {
        left: annotationRect.left + contentHolder.scrollLeft - this.scrollOffset + (x * this.zoom),
        top: annotationRect.top + contentHolder.scrollTop - this.scrollOffset + (y * this.zoom)
      };
      if (animation != false) {
        options.behavior = "smooth";
      }
      contentHolder.scrollTo(options);
    }*/
    this.utils.scrollToElement = (element) => {
      let jumpRect = this.utils.localBoundingRect(element);
      contentHolder.scrollTo(contentHolder.scrollLeft + jumpRect.left - ((page.offsetWidth - element.offsetWidth) / 2), contentHolder.scrollTop + jumpRect.top - ((page.offsetHeight - element.offsetHeight) / 2));
    }

    this.utils.getLocked = (render) => { // s: standard, c: collaborator, p: placeholder
      render = render ?? {};
      if (typeof render.lock != "boolean") {
        return render.lock ?? [];
      } else if (render.lock == true) {
        return ["s"];
      } else {
        return [];
      }
    }
    this.utils.isLocked = (render) => {
      let lock = this.utils.getLocked(render);
      return lock.includes("s") == true;
    }
    this.utils.isPlaceholderLocked = (render, member) => {
      member = member ?? this.self;
      if (member.access > 3) {
        return false;
      }
      let lock = this.utils.getLocked(render);
      return lock.includes("p") == true;
    }
    this.utils.canMemberModify = (render, member) => {
      render = render ?? {};
      member = member ?? this.self;
      if (member.access < 1 || member.modify == null) {
        return false;
      }
      if (member.access > 3) {
        return true;
      }
      if (this.settings.editOthersWork == true) {
        return true;
      }
      let locked = this.utils.getLocked(render);
      if (locked.includes("p") == false) {
        if ([render.a, render.m].includes(member.modify) == true || locked.includes("c") == false) {
          return true;
        }
      } else {
        if (render.placeholder == true || [render.a, render.m, render.placeholder].includes(member.modify) == true || locked.includes("c") == false) {
          return true;
        }
      }
      return false;
    }
    this.utils.canChangeLock = (render, member) => {
      render = render ?? {};
      let locks = this.utils.getLocked(render);
      member = member ?? this.self;
      if (member.access < 1 || member.modify == null) {
        return [];
      }
      if (member.access > 3) {
        return ["s", "c", "p"];
      }
      let allowedLock = [];
      if (this.utils.canMemberModify(render, member) == true && locks.includes("p") == false) {
        allowedLock.push("s");
      }
      if ([render.a].includes(member.modify) == true || (render.placeholder == true && locks.includes("s") == false)) { // Only author can edit collaborator:
        allowedLock.push("c");
      }
      return allowedLock;
    }

    this.utils.getCollaboratorSync = {};
    this.utils.getCollaborator = async (modify, callback) => {
      if (modify == null) {
        if (callback) await callback({});
        return {};
      }

      let collaborator = this.collaborators[modify];
      if (collaborator != null) {
        if (callback) await callback(collaborator);
        return collaborator;
      }

      this.utils.getCollaboratorSync[modify] = true;

      if (this.utils.requestCollaborators == null) {
        this.utils.requestCollaborators = (async () => {
          await sleep(5);

          let modifyIDs = Object.keys(this.utils.getCollaboratorSync);
          this.utils.getCollaboratorSync = {};
          let [code, body] = await sendRequest("GET", "lessons/members/collaborator?modify=" + modifyIDs.join(), null, { session: this.session });
          if (code == 200) {
            for (let i = 0; i < body.length; i++) {
              let collaborator = body[i];
              this.collaborators[collaborator._id] = collaborator;
              modifyIDs.splice(modifyIDs.indexOf(collaborator._id), 1);
            }
            for (let i = 0; i < modifyIDs.length; i++) {
              let collaborator = modifyIDs[i];
              this.collaborators[collaborator._id] = {};
            }
          }
          this.utils.requestCollaborators = null;
        })();
      }

      await this.utils.requestCollaborators;

      collaborator = this.collaborators[modify] ?? {};

      if (callback) await callback(collaborator);
      return collaborator;
    }

    this.render = {};
    this.render.pdfPageQueue = [];
    this.render.pdfPageStorage = {};
    this.render.pdfFileLoading = {};
    this.render.runningPageRender = false;
    // Default Chunks:
    this.render.tempID = () => {
      return "pending_" + randomString(10) + Date.now();
    }
    this.render.setMarginSize = async (force) => {
      if (this.exporting == true && force != true) {
        return;
      }
  
      this.render.farLeft = 0;
      this.render.farRight = 0;
      this.render.setLeftMargin = 0;
      this.render.setRightMargin = 0;
      this.render.farTop = 0;
      this.render.farBottom = 0;
      this.render.setTopMargin = 0;
      this.render.setBottomMargin = 0;
      
      let chunks = Object.keys(this.chunkAnnotations);
      for (let i = 0; i < chunks.length; i++) {
        let splitPos = chunks[i].split("_");
        let [x, y] = [parseInt(splitPos[0]), parseInt(splitPos[1])];
        let left = -x;
        let right = x + this.chunkWidth;
        let top = -y;
        let bottom = y + this.chunkHeight;
        if (left > this.render.farLeft) {
          this.render.setLeftMargin = Math.ceil(left / 400) * 400;
          this.render.farLeft = this.render.setLeftMargin - 120;
        }
        if (right > this.render.farRight) {
          this.render.setRightMargin = Math.ceil(right / 400) * 400;
          this.render.farRight = this.render.setRightMargin - 120;
        }
        if (top > this.render.farTop) {
          this.render.setTopMargin = Math.ceil(top / 400) * 400;
          this.render.farTop = this.render.setTopMargin - 120;
        }
        if (bottom > this.render.farBottom) {
          this.render.setBottomMargin = Math.ceil(bottom / 400) * 400;
          this.render.farBottom = this.render.setBottomMargin - 120;
        }
      }
  
     /*if (mouseDown() == true) {
        if (this.render.runCheckSizeReset != null) {
          return;
        }
        this.render.runCheckSizeReset = () => {
          this.render.setMarginSize();
        };
        this.pipeline.subscribe("marginSizeUpdateDelay", "click_end", this.render.runCheckSizeReset);
        return;
      }
      if (this.render.runCheckSizeReset != null) {
        this.pipeline.unsubscribe("marginSizeUpdateDelay");
        this.render.runCheckSizeReset = null;
      }*/
      
      let scrollPosX = contentHolder.scrollLeft;
      let scrollPosY = contentHolder.scrollTop;
      let contentLeft = this.render.marginLeft ?? 0;
      let contentTop = this.render.marginTop ?? 0;
      let addMarginLeftRight = fixed.offsetWidth / 2;
      let addMarginTopBottom = fixed.offsetHeight / 2;
      this.render.marginLeft = (this.render.setLeftMargin * this.zoom) + addMarginLeftRight;
      this.render.marginRight = (this.render.setRightMargin * this.zoom) + addMarginLeftRight;
      this.render.marginTop = (this.render.setTopMargin * this.zoom) + addMarginTopBottom;
      this.render.marginBottom = (this.render.setBottomMargin * this.zoom) + addMarginTopBottom;
      editorContent.style.marginLeft = this.render.marginLeft + "px";
      editorContent.style.marginRight = this.render.marginRight + "px";
      editorContent.style.marginTop = this.render.marginTop + "px";
      editorContent.style.marginBottom = this.render.marginBottom + "px";
      if (content.offsetWidth != this.render.lastOffsetWidth || content.offsetHeight != this.render.lastOffsetHeight) {
        contentHolder.scrollTo(scrollPosX + (this.render.marginLeft - contentLeft), scrollPosY + (this.render.marginTop - contentTop));
        if (this.realtime.module && this.realtime.module.adjustRealtimeHolder) {
          this.realtime.module.adjustRealtimeHolder();
        }
        await this.pipeline.publish("redraw_selection", { transition: false });
      }
      this.render.lastOffsetWidth = content.offsetWidth;
      this.render.lastOffsetHeight = content.offsetHeight;
    }
    this.render.processPageRenders = async () => {
      if (this.render.runningPageRender == true) {
        return;
      }
      this.render.runningPageRender = true;
      if (window.pdfjsLib == null) {
        await loadScript("./libraries/pdfjs/pdf.mjs"); // Load PDFJS
      }
      if (pdfjsLib.GlobalWorkerOptions.workerSrc == "") {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "./libraries/pdfjs/pdf.worker.mjs";
      }
  
      while (this.render.pdfPageQueue.length > 0 || (this.exporting == true && Object.keys(this.render.pdfFileLoading).length > 0)) {
        let sourcePageId = this.render.pdfPageQueue.shift();
        if (sourcePageId == null) {
          await sleep(100);
          continue;
        }
        let [sourceID, pageNumber] = this.render.pdfPageStorage[sourcePageId];
        delete this.render.pdfPageStorage[sourcePageId];
  
        let source = this.sources[sourceID] ?? {};
        if (source.error == true) {
          continue;
        }
        if (source.pdf == null) {
          if (this.render.pdfFileLoading[sourceID] == null) {
            this.render.pdfFileLoading[sourceID] = {};
            (async () => {
              if (source.source == null) {
                let [code, body] = await sendRequest("GET", "lessons/join/source?source=" + sourceID, null, { session: this.session });
                if (code == 200) {
                  this.sources[sourceID] = { source: body.source };
                } else {
                  this.sources[sourceID] = { error: true };
                }
              }
              source = this.sources[sourceID] ?? {};
              if (source.source != null) {
                let loadingTask = pdfjsLib.getDocument(assetURL + source.source)
                addTempListener({ type: "pdf", document: loadingTask });
                loadingTask.promise.then(async (pdf) => {
                  source.pdf = pdf;
                  let loadingPageKeys = Object.keys(this.render.pdfFileLoading[sourceID])
                  for (let b = 0; b < loadingPageKeys.length; b++) {
                    let pageAdd = this.render.pdfFileLoading[sourceID][loadingPageKeys[b]];
                    this.render.addPageToQueue(pageAdd[0], pageAdd[1], true);
                  }
                  delete this.render.pdfFileLoading[sourceID];
                });
              }
            })();
          }
          this.render.pdfFileLoading[sourceID][sourcePageId] = [sourceID, pageNumber];
          continue;
        }
  
        let pageRender = this.sourceRenders[sourcePageId];
        if (pageRender == null) {
          pageRender = await new Promise(async (resolve) => {
            source.pdf.getPage(pageNumber).then(async (pageRender) => {
              resolve(pageRender);
            });
          });
          this.sourceRenders[sourcePageId] = pageRender;
        }
  
        let loadDocumentFrames = annotations.querySelectorAll('.eAnnotation[page] div[content] div[document][sourcepage="' + sourcePageId + '"]');
        for (let e = 0; e < loadDocumentFrames.length; e++) {
          let element = loadDocumentFrames[e];
          if (element == null) {
            continue;
          }
          if (element.childElementCount > 0) {
            continue;
          }
  
          let viewport = pageRender.getViewport({ scale: 2 });
          //let outputScale = window.devicePixelRatio ?? 1;
          
          element.insertAdjacentHTML("beforeend", `<canvas></canvas><div textlayer></div><div annotationlayer></div>`);
          
          let canvas = element.querySelector("canvas");
          let context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
  
          let setWidth = viewport.width;// * outputScale;
          let setHeight = viewport.height;// * outputScale;
          canvas.width = setWidth;
          canvas.height = setHeight;
          let annoWidth = parseFloat(element.getAttribute("width"));
          let annoHeight = parseFloat(element.getAttribute("height"));
          let annoRotation = parseInt(element.getAttribute("rotation"));
          if (annoRotation == 90 || annoRotation == 270) {
            //let prevSetWidth = setWidth;
            //setWidth = setHeight;
            //setHeight = prevSetWidth;
            let prevAnnoWidth = annoWidth;
            annoWidth = annoHeight;
            annoHeight = prevAnnoWidth;
          }
          element.style.setProperty("--fullWidth", setWidth + "px");
          element.style.setProperty("--fullHeight", setHeight + "px");
          element.style.transform = "rotate(" + annoRotation + "deg)";
          let ratio = setWidth / setHeight;
          let ratioedWidth = (annoHeight - 8) * ratio;
          let ratioedHeight = (annoWidth - 8) / ratio;
          if (ratioedWidth < annoWidth - 8) {
            element.style.width = (ratioedWidth + 8) + "px";
            element.style.height = annoHeight + "px";
            element.style.setProperty("--fullScale", "scale(" + ((annoHeight - 8) / setHeight) + ")");
          } else {
            element.style.width = annoWidth + "px";
            element.style.height = (ratioedHeight + 8) + "px";
            element.style.setProperty("--fullScale", "scale(" + ((annoWidth - 8) / setWidth) + ")");
          }
  
          //let transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
          
          await new Promise(async (resolve) => {
            pageRender.render({
              canvasContext: context,
              //transform: transform,
              viewport: viewport
            }).promise.then(() => {
              element.style.opacity = "1";
              let textHolder = element.querySelector("div[textlayer]");
              if (textHolder != null) {
                pageRender.getTextContent().then((textContent) => {
                  (new pdfjsLib.TextLayer({
                    textContentSource: textContent,
                    container: textHolder,
                    viewport: viewport
                  })).render();
                  resolve();
                });
              }
              let annotationHolder = element.querySelector("div[annotationlayer]");
              if (annotationHolder != null) {
                pageRender.getAnnotations().then((annotationsData) => {
                  annotationsData = annotationsData.filter((value) => { return (value ?? {}).subtype == "Link"; });
                  const DEFAULT_LINK_REL = "noopener noreferrer nofollow";
                  const LinkTarget = {
                    NONE: 0,
                    SELF: 1,
                    BLANK: 2,
                    PARENT: 3,
                    TOP: 4
                  };
                  let setSource = sourceID;
                  let setEditor = this;
                  (new pdfjsLib.AnnotationLayer({
                    div: annotationHolder,
                    page: pageRender,
                    viewport: viewport
                  })).render({
                    annotations: annotationsData,
                    linkService: new class {
                      externalLinkEnabled = true;
                      constructor({
                        sourceID = setSource,
                        editor = setEditor,
                        pdfDocument = source.pdf,
                        externalLinkTarget = 2, //null
                      } = {}) {
                        this.sourceID = sourceID;
                        this.editor = editor;
                        this.externalLinkTarget = externalLinkTarget;
                        this.externalLinkRel = null;
                        this._ignoreDestinationZoom = false;
                        this.baseUrl = null;
                        this.pdfDocument = pdfDocument;
                        //this.pdfViewer = null;
                        //this.pdfHistory = null;
                      }
                      //setDocument(pdfDocument, baseUrl = null) {}
                      //setViewer(pdfViewer) {}
                      //setHistory(pdfHistory) {}
                      get pagesCount() {
                        return this.pdfDocument ? this.pdfDocument.numPages : 0;
                      }
                      //get page() {}
                      //set page(value) {}
                      //get rotation() {}
                      //set rotation(value) {}
                      //get isInPresentationMode() {}
                      async getPDFDestination(dest) {
                        //let namedDest;
                        let explicitDest;
                        let pageNumber;
                        if (typeof dest === "string") {
                          //namedDest = dest;
                          explicitDest = await this.pdfDocument.getDestination(dest);
                        } else {
                          //namedDest = null;
                          explicitDest = dest;
                        }
                        if (!Array.isArray(explicitDest)) {
                          return;
                        }
                        let [destRef] = explicitDest;
                        if (destRef && typeof destRef === "object") {
                          pageNumber = this.pdfDocument.cachedPageNumber(destRef);
                          if (!pageNumber) {
                            try {
                              pageNumber = (await this.pdfDocument.getPageIndex(destRef)) + 1;
                            } catch {
                              return;
                            }
                          }
                        } else if (Number.isInteger(destRef)) {
                          pageNumber = destRef + 1;
                        }
                        return pageNumber;
                      }
                      async getLessonDestination(dest) {
                        let pageNumber = await this.getPDFDestination(dest);
                        if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
                          return;
                        }
                        let foundPage;
                        for (let i = 0; i < this.editor.annotationPages.length; i++) {
                          let page = this.editor.annotationPages[i] ?? [];
                          let pdfData = page[3] ?? [];
                          if (pdfData[0] == this.sourceID && pdfData[1] == pageNumber) {
                            foundPage = {
                              number: i + 1,
                              id: page[0]
                            };
                            break;
                          }
                        }
                        return foundPage;
                      }
                      async goToDestination(dest) {
                        if (!this.pdfDocument) {
                          return;
                        }
                        let foundPage = await this.getLessonDestination(dest);
                        if (foundPage == null) {
                          return;
                        }
                        this.editor.setPage(foundPage.number, false);
                      }
                      goToPage(val) {
                        if (!this.pdfDocument) {
                          return;
                        }
                        let pageNumber = typeof val === "string" && parseInt(val) || val | 0;
                        let foundPage;
                        for (let i = 0; i < this.editor.annotationPages.length; i++) {
                          let page = (this.editor.annotationPages[i] ?? [])[3] ?? [];
                          if (page[0] == this.sourceID && page[1] == pageNumber) {
                            foundPage = i + 1;
                            break;
                          }
                        }
                        if (foundPage == null) {
                          return;
                        }
                        this.editor.setPage(foundPage, false);
                      }
                      addLinkAttributes(link, url, newWindow = false) {
                        if (!url || typeof url !== "string") {
                          return;
                        }
                        let target = newWindow ? LinkTarget.BLANK : this.externalLinkTarget;
                        let rel = this.externalLinkRel;
                        if (this.externalLinkEnabled == true) {
                          link.href = link.title = url;
                        } else {
                          link.href = "";
                          link.title = `Disabled: ${url}`;
                          link.onclick = () => false;
                        }
                        let targetStr = "";
                        switch (target) {
                          case LinkTarget.NONE:
                            break;
                          case LinkTarget.SELF:
                            targetStr = "_self";
                            break;
                          case LinkTarget.BLANK:
                            targetStr = "_blank";
                            break;
                          case LinkTarget.PARENT:
                            targetStr = "_parent";
                            break;
                          case LinkTarget.TOP:
                            targetStr = "_top";
                            break;
                        }
                        link.target = targetStr;
                        link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
                      }
                      async getDestinationHash(dest) {
                        // PLEASE NOTE: Had to modify pdf.mjs to allow for async with promise
                        if (!this.pdfDocument) {
                          return;
                        }
                        let foundPage = await this.getLessonDestination(dest);
                        if (foundPage == null) {
                          return;
                        }
                        return "?lesson=" + this.editor.lesson.id + "&page=" + foundPage.id + "#lesson";
                      }
                      //getAnchorUrl(anchor) {}
                      //setHash() {}
                      executeNamedAction(action) {
                        if (this.editor.annotationPages.length < 1) {
                          return;
                        }
                        let setPage;
                        let animate = true;
                        switch (action) {
                          case "NextPage":
                            setPage = this.editor.currentPage + 1;
                            break;
                          case "PrevPage":
                            setPage = this.editor.currentPage - 1;
                            break;
                          case "LastPage":
                            setPage = editor.annotationPages.length;
                            animate = false;
                            break;
                          case "FirstPage":
                            setPage = 1;
                            animate = false;
                            break;
                          default:
                            return;
                        }
                        if (setPage != null) {
                          this.editor.setPage(setPage, animate);
                        }
                      }
                    }
                    //async executeSetOCGState(action) {}
                  });
                });
              }
            });
          });
          await sleep(10);
        }
        await sleep(1);
      }
      this.render.runningPageRender = false;
    }
    this.render.addPageToQueue = async (sourceID, pageNumber, forceRunRender) => {
      let sourcePageId = sourceID + "_" + pageNumber;
      if (this.render.pdfPageStorage[sourcePageId] == null) {
        this.render.pdfPageStorage[sourcePageId] = [sourceID, pageNumber];
        this.render.pdfPageQueue.push(sourcePageId);
        if (this.exporting != true || forceRunRender == true) {
          setTimeout(this.render.processPageRenders, 0);
        }
      }
    }
    this.render.createSVG = (parent, type) => {
      let newSVG = document.createElementNS("http://www.w3.org/2000/svg", type);
      parent.appendChild(newSVG);
      return newSVG;
    }
    //this.render.modules = {};
    this.render.getModule = async (annotation, name) => {
      return (annotation ?? {}).component ?? await this.newModule("editor/render/annotation/" + name);
      /*let module = "editor/render/" + name;
      if (this.render.modules[module] != null) {
        return this.render.modules[module];
      }
      let newModule = await this.newModule(module);
      this.render.modules[module] = newModule;
      return newModule
      return await this.newModule("editor/render/annotation/" + name);*/
    }
    this.render.create = async (annotation, long) => {
      /*
        _id - ID - The unique ID of the annotation
        f - FUNCTION - The type of tool to render
        p - POSITION - Position of annotation - [ X, Y ]
        page - PAGE - Page of annotation
        s - SIZE - Size of annotation - [ WIDTH, HEIGHT ]
        c - COLOR - Color of annotation
        i - INSIDE COLOR - Color of fill
        t - THICKNESS - Thickness of annotation
        b - BORDER - Include border
        o - OPACITY - Opacity of annotation
        d - DATA - Data, can change based on annotation, path of pen for example
      */

      if (annotation == null) {
        return {};
      }
      if (annotation.pointer != null) { // If synced is availiable, update to it
        annotation = this.annotations[annotation.pointer] ?? annotation;
      }
      let render = annotation.render;
      if (annotation.render == null) {
        return {};
      }

      let { _id, p: position, s: size, parent } = render; // Must combine these back before render function

      if (this.exportSelected != null) {
        if (this.exportSelected.includes(_id) == false) {
          let currentAnnoCheck = render;
          let checkedParents = [];
          let isValid = false;
          while (currentAnnoCheck.parent != null) {
            let annoid = currentAnnoCheck.parent;
            if (annoid == null || checkedParents.includes(annoid) == true) {
              break;
            }
            checkedParents.push(annoid);
            let annotation = this.annotations[annoid];
            if (annotation == null) {
              break;
            }
            currentAnnoCheck = annotation.render ?? {};
            if (this.exportSelected.includes(annoid) == true) {
              isValid = true;
              break;
            }
          }
          if (isValid == false) {
            return {};
          }
        } else if (render.parent != null) {
          let { x: absX, y: absY } = this.utils.getAbsolutePosition(render);
          parent = null;
          position = [absX, absY];
        }
      }
      
      let holder = annotations;
      let parentAnnotation
      if (parent != null) {
        parentAnnotation = this.annotations[parent] ?? {};
        if (parentAnnotation.pointer != null) {
          parentAnnotation = this.annotations[parentAnnotation.pointer] ?? parentAnnotation;
        }
        if (parentAnnotation.render != null) {
          if (parentAnnotation.component == null && parentAnnotation.render.parent != _id) {
            parentAnnotation = await this.render.create(parentAnnotation);
          }
          if (parentAnnotation.component != null) {
            holder = parentAnnotation.component.setContainer();
          }
        }
        if (parentAnnotation.renderedChildren == null) {
          parentAnnotation.renderedChildren = {};
        }
        parentAnnotation.renderedChildren[_id] = annotation;
      }

      let [xPos, yPos] = position ?? [0, 0];
      let [width, height] = size ?? [1, 1];
      let thickness = this.utils.getThickness(render);
      if (width < 0) {
        width = -width;
        xPos -= width + thickness;
      }
      if (height < 0) {
        height = -height;
        yPos -= height + thickness;
      }

      if (annotation.component == null) {
        annotation.component = await this.newModule("editor/render/annotation/" + render.f);
      } else if (annotation.component.parentID != parent && annotation.component.parentID != null) {
        let prevParentAnnotation = this.annotations[annotation.component.parentID] ?? {};
        if (prevParentAnnotation.renderedChildren != null) {
          delete prevParentAnnotation.renderedChildren[_id];
        }
      }
      if (annotation.component == null) {
        return {};
      }

      annotation.component.editor = this;
      annotation.component.annotation = annotation;
      annotation.component.properties = { ...render, p: [xPos, yPos], s: [width, height], parent: parent };
      annotation.component.holder = holder;
      annotation.component.parentID = parent;

      annotation.component.animate = annotation.animate;

      if (annotation.component.render != null) {
        await annotation.component.render();
      }

      if (annotation.component.getContainer != null) {
        let container = annotation.component.getContainer();
        if (container != null) {
          if (render.resizing == null) {
            container.style.width = (width + thickness) + "px";
            container.style.height = (height + thickness) + "px";
            if (container.hasAttribute("notransition") == true) {
              container.removeAttribute("notransition");
              container.style.left = "0px";
              container.style.top = "0px";
              container.style.removeProperty("right");
              container.style.removeProperty("bottom");
              container.style.transformOrigin = "center";
            }
          } else {
            container.setAttribute("notransition", "");
            let rect = this.utils.getRect(render);
            let [handle, resizeX, resizeY] = render.resizing;
            let annoX;
            let annoY;
            let finishX;
            let finishY;
            switch (handle) {
              case "bottomright":
                [annoX, annoY] = this.math.rotatePointOrigin(rect.x, rect.y, rect.centerX, rect.centerY, rect.rotation);
                [finishX, finishY] = this.math.rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
                if (render.s[0] > 0) {
                  container.style.left = finishX + "px";
                  container.style.removeProperty("right");
                } else {
                  container.style.right = finishX + "px";
                  container.style.removeProperty("left");
                }
                if (render.s[1] > 0) {
                  container.style.top = finishY + "px";
                  container.style.removeProperty("bottom");
                } else {
                  container.style.bottom = finishY + "px";
                  container.style.removeProperty("top");
                }
                break;
              case "topleft":
                [annoX, annoY] = this.math.rotatePointOrigin(rect.endX, rect.endY, rect.centerX, rect.centerY, rect.rotation);
                [finishX, finishY] = this.math.rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
                if (render.s[0] > 0) {
                  container.style.right = -finishX + "px";
                  container.style.removeProperty("left");
                } else {
                  container.style.left = -finishX + "px";
                  container.style.removeProperty("right");
                }
                if (render.s[1] > 0) {
                  container.style.bottom = -finishY + "px";
                  container.style.removeProperty("top");
                } else {
                  container.style.top = -finishY + "px";
                  container.style.removeProperty("bottom");
                }
                break;
              case "topright":
                [annoX, annoY] = this.math.rotatePointOrigin(rect.x, rect.endY, rect.centerX, rect.centerY, rect.rotation);
                [finishX, finishY] = this.math.rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
                if (render.s[0] > 0) {
                  container.style.left = finishX + "px";
                  container.style.removeProperty("right");
                } else {
                  container.style.right = finishX + "px";
                  container.style.removeProperty("left");
                }
                if (render.s[1] > 0) {
                  container.style.bottom = -finishY + "px";
                  container.style.removeProperty("top");
                } else {
                  container.style.top = -finishY + "px";
                  container.style.removeProperty("bottom");
                }
                break;
              case "bottomleft":
                [annoX, annoY] = this.math.rotatePointOrigin(rect.endX, rect.y, rect.centerX, rect.centerY, rect.rotation);
                [finishX, finishY] = this.math.rotatePoint(resizeX - annoX, resizeY - annoY, -rect.rotation);
                if (render.s[0] > 0) {
                  container.style.right = -finishX + "px";
                  container.style.removeProperty("left");
                } else {
                  container.style.left = -finishX + "px";
                  container.style.removeProperty("right");
                }
                if (render.s[1] > 0) {
                  container.style.top = finishY + "px";
                  container.style.removeProperty("bottom");
                } else {
                  container.style.bottom = finishY + "px";
                  container.style.removeProperty("top");
                }
            }
          }
          if (render.s[0] < 0 && render.s[1] < 0) {
            container.style.transform = "scale(-1)";
          } else if (render.s[0] < 0) {
            container.style.transform = "scale(-1,1)";
          } else if (render.s[1] < 0) {
            container.style.transform = "scale(1,-1)";
          } else {
            container.style.removeProperty("transform");
          }
        }
      }

      if (render.remove != true) {
        if (annotation.component.show != null) {
          annotation.component.show();
        }

        if (annotation.renderedChildren != null) {
          let redrawChildrenFunction = (children) => {
            let redrawChildren = Object.values(children);
            for (let i = 0; i < redrawChildren.length; i++) {
              let child = redrawChildren[i];
              if (child.component != null) {
                if (child.component.REDRAW_ON_PARENT_UPDATE == true) {
                  this.render.create({ ...child, animate: annotation.animate ?? child.animate });
                }
                if (child.renderedChildren != null) {
                  redrawChildrenFunction(child.renderedChildren);
                }
              }
            }
          }
          redrawChildrenFunction(annotation.renderedChildren);
        }
      } else {
        if (long != true) {
          await this.render.hide(annotation);
        } else {
          await this.utils.setAnnotationChunks({ ...annotation, render: { ...render, remove: true } });
          delete this.annotations[_id];
        }
      }

      return annotation;
    }
    this.render.hide = (annotation) => {
      if (annotation == null || annotation.component == null) {
        return;
      }
      let render = annotation.render ?? {};
      annotation.component.properties = render;
      annotation.component.annotation = annotation;
      annotation.component.hide();
      if (annotation.component.embedFrame != null) {
        annotation.component.embedFrame.remove();
      }
      let allSelections = [
        ...annotations.querySelectorAll('.eSelect[anno="' + render._id + '"]'),
        ...realtimeHolder.querySelectorAll('.eCollabSelect[anno="' + render._id + '"]')
      ];
      for (let i = 0; i < allSelections.length; i++) {
        let select = allSelections[i];
        (async () => {
          select.setAttribute("old", "");
          select.style.opacity = 0;
          await sleep(150);
          select.remove();
        })();
      }
    }
    this.render.remove = (annotation) => {
      if (annotation == null) {
        return;
      }
      if (annotation.component != null) {
        this.render.hide(annotation);
        annotation.component.remove();
        annotation.component = null;
      }
      let render = annotation.render;
      if (render != null) {
        let parentAnnotation = this.annotations[render.parent] ?? {};
        if (parentAnnotation.pointer != null) {
          parentAnnotation = this.annotations[parentAnnotation.pointer] ?? parentAnnotation;
        }
        if (parentAnnotation.renderedChildren != null) {
          delete parentAnnotation.renderedChildren[render._id];
        }
        this.pipeline.unsubscribe("annotation" + render._id);
      }
    }
    this.defaultChunks["0_0"] = {};
    this.defaultChunks["0_-" + this.chunkHeight] = {};
    this.defaultChunks["-" + this.chunkWidth + "_0"] = {};
    this.defaultChunks["-" + this.chunkWidth + "_-" + this.chunkHeight] = {};
    this.chunkAnnotations = { ...this.defaultChunks };
    
    this.save = {};
    this.save.synced = true;
    this.save.pendingSaves = {};
    this.save.timeoutAnnotations = [];
    this.save.syncSave = async (skip) => {
      if (this.save.runningSyncSave == true && skip != true) {
        return;
      }
      this.save.runningSyncSave = true;
      this.save.synced = false;
      this.pipeline.publish("save_status", { saving: true });
      let keys = Object.keys(this.save.pendingSaves);
      while (keys.length > 0) {
        if (skip != true) {
          await sleep(2500); // 1 save per 2.5 seconds
        } else {
          skip = false;
        }
        if (connected == false) {
          break;
        }
        keys = Object.keys(this.save.pendingSaves);
        let setPendingSave = {};
        let mutations = [];
        for (let i = 0; i < keys.length; i++) {
          let mutt = this.save.pendingSaves[keys[i]];
          if (mutt.annoRefresh != null && mutt.annoRefresh.render != null) {
            mutt._id = mutt.annoRefresh.render._id;
            delete mutt.annoRefresh;
          }
          let anno = this.annotations[mutt._id];
          if (anno != null && anno.pointer != null) {
            mutt._id = anno.pointer;
            anno = this.annotations[mutt._id];
          }
          if (anno == null) {
            continue;
          }
          if (anno.render == null) {
            delete this.annotations[mutt._id];
            continue;
          }
          if (mutations.length > 249) {
            setPendingSave[mutt._id] = mutt;
            this.save.enableTimeout(anno);
            continue;
          }
          if ((mutt.parent ?? "").startsWith("pending_") == true && mutt.remove != true) {
            let parentAnno = this.annotations[mutt.parent];
            if (parentAnno != null) {
              if (parentAnno.pointer != null) {
                mutt.parent = parentAnno.pointer;
                parentAnno = this.annotations[mutt.parent];
              } else {
                setPendingSave[mutt._id] = mutt;
                this.save.enableTimeout(anno);
                continue;
              }
              if ((parentAnno.render ?? {}).remove == true) {
                continue;
              }
            }
          }
          delete mutt.sig;
          delete anno.save;
          delete anno.resizing;
          if (anno.retry > 0) {
            this.save.enableTimeout(anno);
            anno.retry--;
          }
          if (mutt._id.startsWith("pending_") == true) {
            if (mutt.f == null) {
              mutt.annoRefresh = anno;
              setPendingSave[mutt._id] = mutt;
              continue;
            } else if (mutt.remove == true) {
              continue;
            }
          }
          mutations.push(mutt);
        }
        this.save.pendingSaves = {};
        if (mutations.length > 0) {
          let saveSuccess = false;
          try {
            //mutations = [];
            let [result] = await sendRequest("POST", "lessons/save", { mutations: mutations }, { session: this.session });
            saveSuccess = result == 200;
          } catch (err) {
            console.log("SAVE ERROR:", err);
          }
          if (saveSuccess == false) { // If not saved, set to try again
            for (let i = 0; i < mutations.length; i++) {
              let anno = this.annotations[mutations[i]._id];
              if (anno == null) {
                continue;
              }
              if (anno.pointer != null) {
                anno = this.annotations[anno.pointer];
              }
              if (anno.retry == null) {
                anno.retry = 3;
              }
              if (anno != null && anno.retry > 0) {
                setPendingSave[mutations[i]._id] = mutations[i];
                anno.save = true;
              }
            }
          }
        }
        this.save.pendingSaves = { ...this.save.pendingSaves, ...setPendingSave };
        keys = Object.keys(this.save.pendingSaves);
      }
      if (connected == true) {
        this.save.synced = true;
        this.pipeline.publish("save_status", { saving: false });
      }
      this.save.runningSyncSave = false;
    }
    this.save.enableTimeout = async (anno, collab) => {
      if (anno == null) {
        return;
      }
      if (anno.expire == null) {
        this.save.timeoutAnnotations.push(anno);
      }
      anno.expire = getEpoch() + 10000; // 10 seconds until expire
      anno.collab = (collab == true);
      if (this.save.runningTimeout == true) {
        return;
      }
      this.save.runningTimeout = true;
      while (this.save.timeoutAnnotations.length > 0) {
        await sleep(10000);

        let changeOccured = false;
        //let redrawAction = false;
        let epoch = getEpoch();
        for (let i = 0; i < this.save.timeoutAnnotations.length; i++) {
          let annotation = this.save.timeoutAnnotations[i];
          if (annotation.expire > epoch) {
            continue;
          }
          if (connected == false && annotation.collab != true) {
            continue;
          }
          if (this.toolbar != null && this.selecting[annotation.render._id] != null && this.toolbar.selection.action != null) {
            continue;
          }
          
          // Remove annotation since it was reset:
          delete annotation.expire;
          this.save.timeoutAnnotations.splice(i, 1);
          i--;
          delete annotation.collab;
  
          if (annotation.pending != null) {
            delete this.annotations[annotation.pending];
            delete annotation.render.pending;
          }

          if (annotation.revert == null) {
            continue;
          }

          if (annotation.render._id.includes("pending_") == false) { // Must not be a new anno
            delete annotation.retry;
            await this.save.apply(annotation.revert, { overwrite: true, timeout: false }); //let result = 
            /*if (result.redrawAction == true) {
              redrawAction = true;
            }*/
            delete annotation.revert;
            changeOccured = true;
          } else {
            await this.utils.setAnnotationChunks({ ...annotation, render: { ...annotation.render, remove: true } });
            delete this.annotations[annotation.render._id];
            changeOccured = true;
          }
        }

        if (changeOccured == true) {
          this.pipeline.publish("redraw_selection", { redrawCurrentAction: true }); //redrawActionBar: redrawAction
        }
      }
      this.save.runningTimeout = false;
    }
    this.save.apply = async (save, options = {}) => {
      save = save ?? {};
      let annoID = save._id;
      if (annoID == null) {
        return;
      }

      let existingAnnotation = this.annotations[annoID];
      if ((existingAnnotation ?? {}).pointer != null) {
        annoID = annotation.pointer;
        existingAnnotation = this.annotations[annoID];
      }
      let annotation = existingAnnotation ?? { render: {} };

      if (annotation.revert == null && options.timeout != false) {
        annotation.revert = copyObject(annotation.render); // Copy the currents attributes to revert to later
      }

      let checkChunks = [];
      if (options.childChunkUpdate != false) {
        checkChunks = this.utils.chunksFromAnnotation(annotation.render);
      }

      // IF SELECTING, DO NOT UPDATE THOSE FIELDS
      /*let redrawAction = false;
      if (options.ignoreSelecting != true && this.selecting[annoID] != null) {
        //save = { ...save, ...this.selecting[annoID] };
        redrawAction = true;
      }*/
      if (options.overwrite != true) {
        let changeKeys = Object.keys(save);
        for (let f = 0; f < changeKeys.length; f++) {
          let key = changeKeys[f];
          annotation.render[key] = save[key] ?? null;
        }
        //objectUpdate(save, annotation.render); // Update the annotation
      } else {
        annotation.render = save;
      }
      if (options.timeout != false) {
        this.save.enableTimeout(annotation); // Start timer to revert if update isn't server-confirmed
      }

      await this.utils.setAnnotationChunks(annotation);

      let chunkAnnotations = this.utils.annotationsInChunks(checkChunks);
      for (let i = 0; i < chunkAnnotations.length; i++) {
        let anno = chunkAnnotations[i] ?? {};
        let render = anno.render;
        if (render == null || render._id == annoID) {
          continue;
        }
        if (this.utils.getParentIDs(render).includes(annoID) == true) { // Update chunks of child annotations:
          await this.utils.setAnnotationChunks(anno);
        }
      }

      let allowRender = annotation.render.remove == true;
      for (let i = 0; i < annotation.chunks.length; i++) {
        if (this.visibleChunks.includes(annotation.chunks[i]) == true) {
          allowRender = true;
          break;
        }
      }
      if (allowRender == true) {
        annotation.component = (await this.render.create({ ...annotation, render: { ...annotation.render, ...(options.renderPassthrough ?? {}), ...(this.selecting[annoID] ?? {}) }, ...(options.render ?? {}) }, options.timeout == false)).component;
      } else {
        await this.render.remove(annotation);
      }

      if (existingAnnotation == null) {
        this.annotations[annoID] = annotation;
      }
      
      return { annotation: annotation }; //, redrawActionBar: redrawAction
    }
    this.save.push = async (save, options = {}) => {
      let data = copyObject(save);
      let history = options.history ?? {};

      let annotation = this.annotations[data._id] ?? {};
      let newAnnotation = annotation.render == null;
      if (annotation.pointer != null) {
        data._id = annotation.pointer;
        annotation = this.annotations[data._id] ?? {};
      }
      let annoID = data._id;

      let merged = { ...(annotation.render ?? {}), ...data };
      if (merged._id == null) {
        return;
      }

      let originalRect = this.utils.getRect(annotation.render ?? merged);
      let rect = this.utils.getRect(merged);

      // Check for a new parent:
      if (merged.p != null && merged.s != null) {
        let { parentID } = await this.utils.parentFromAnnotation({
          ...merged,
          p: [rect.annoX, rect.annoY],
          r: rect.rotation,
          parent: null,
          prevParent: merged.parent
        }, true);
        if (parentID != merged.parent) {
          data.parent = parentID ?? null;

          let { x: newX, y: newY, rotation: newRotation } = this.utils.getRelativePosition({
            ...merged,
            parent: data.parent,
            p: [rect.annoX, rect.annoY],
            r: rect.rotation
          });
          data.p = [newX, newY];
          if (merged.r != null || newRotation != 0) {
            data.r = newRotation;
          }

          this.realtimeSelect[data._id] = { ...(this.realtimeSelect[data._id] ?? {}), ...data };
          merged = { ...merged, ...data };
          rect = this.utils.getRect(merged);
        }
      }

      let checkChunks = [ ...this.utils.chunksFromAnnotation(merged), ...this.utils.chunksFromAnnotation(annotation.render ?? {}) ];

      data.sync = getEpoch();
      if (newAnnotation == true) {
        //if (this.settings.editOthersWork != true) {
        data.lock = data.lock ?? [];
        if (data.lock.includes("c") == false) {
          data.lock.push("c"); // Add default collaborator lock
        }
        //}
      }
      annotation = (await this.save.apply(data, { ...options, childChunkUpdate: false })).annotation; // Apply Save

      if (data.hasOwnProperty("p") || data.hasOwnProperty("s") || data.hasOwnProperty("r") || data.hasOwnProperty("t") || data.hasOwnProperty("l") != null || data.remove == true) {
        let resizeChangeX = 0;
        let resizeChangeY = 0;
        if (rect.size[0] != originalRect.size[0] || rect.size[1] != originalRect.size[1]) {
          let [originalResizeX, originalResizeY] = this.math.rotatePointOrigin(originalRect.x, originalRect.y, originalRect.centerX, originalRect.centerY, originalRect.rotation);
          if (rect.size[0] < 0) {
            originalResizeX -= rect.thickness;
          }
          if (rect.size[1] < 0) {
            originalResizeY -= rect.thickness;
          }
          let [newResizeX, newResizeY] = this.math.rotatePointOrigin(rect.x, rect.y, rect.centerX, rect.centerY, rect.rotation);
          [resizeChangeX, resizeChangeY] = this.math.rotatePoint(originalResizeX - newResizeX, originalResizeY - newResizeY, -rect.rotation);
        }
        
        let annotationModule = (await this.render.getModule(annotation, merged.f)) ?? {};
        let chunkAnnotations = this.utils.annotationsInChunks(checkChunks);
        let updateChunkAnnotations = [];
        for (let i = 0; i < chunkAnnotations.length; i++) {
          let anno = chunkAnnotations[i] ?? {};
          let render = anno.render;
          if (render == null || render._id == annoID) {
            continue;
          }
          if (this.selecting[render._id] != null) {
            continue;
          }
          if ((render.parent ?? "").startsWith("pending_") == true) {
            let parentAnno = this.annotations[render.parent];
            if (parentAnno != null && parentAnno.pointer != null) {
              render.parent = parentAnno.pointer;
            }
          }

          let historyUpdate;

          // Update position for parent resize:
          if (render.parent == annoID && (Math.floor(Math.abs(resizeChangeX)) > 0 || Math.floor(Math.abs(resizeChangeY)) > 0)) {
            historyUpdate = copyObject({ _id: render._id, parent: render.parent, p: render.p, r: render.r });
            let setChildAnno = {
              _id: render._id,
              p: [(render.p[0] ?? 0) + resizeChangeX, (render.p[1] ?? 0) + resizeChangeY]
            };
            await this.save.apply(setChildAnno, { render: { animate: false } });
            if (connected == true) {
              this.save.pendingSaves[setChildAnno._id] = { ...(this.save.pendingSaves[setChildAnno._id] ?? {}), ...setChildAnno, sync: getEpoch() };
              this.realtimeSelect[setChildAnno._id] = { ...(this.realtimeSelect[setChildAnno._id] ?? {}), ...setChildAnno };
            }
          }

          if (render.p == null || render.s == null) {
            continue;
          }

          updateChunkAnnotations.push([
            anno, render,
            (await this.render.getModule(anno, render.f)) ?? {},
            this.utils.getRect(render),
            historyUpdate
          ]);
        }
        for (let i = 0; i < updateChunkAnnotations.length; i++) {
          let [anno, render, annoModule, annoRect, historyUpdate] = updateChunkAnnotations[i];
          let { annoX, annoY, centerX, centerY, rotation, parents } = annoRect;
          
          let isChild = render.parent == annoID;
          let isAChild = parents.some((parent) => { return parent._id == annoID; });
          let deleteChild = isAChild == true && data.remove == true && history.fromHistory != true;

          // Check for child parent change:
          let checkParent = false;
          if (this.math.pointInRotatedBounds(centerX, centerY, rect.x, rect.y, rect.endX, rect.endY, rect.rotation) == false || render.l == null || render.l < merged.l || merged.remove == true) {
            // Is outside the saved annotation:
            checkParent = isChild;
          } else if (annotationModule.CAN_PARENT_CHILDREN == true && annoModule.ONLY_PARENT_CHANGE_ON_EDIT != true) {
            // Is inside the saved annotation:
            if (this.utils.canMemberModify(render) == true && this.utils.isPlaceholderLocked(render) == false) {
              checkParent = !isChild;
            }
          }
          if (deleteChild == true && annoModule.KEEP_ON_PARENT_DELETE == true) {
            checkParent = true;
            deleteChild = false;
          }
          if (checkParent == true) {
            let { parentID: setParentID } = await this.utils.parentFromAnnotation({
              ...render,
              p: [annoX, annoY],
              r: rotation,
              parent: null,
              prevParent: render.parent
            }, true);
            if (setParentID != render.parent) {
              let { x: newX, y: newY, rotation: newRotation } = this.utils.getRelativePosition({
                ...render,
                parent: setParentID,
                p: [annoX, annoY],
                r: rotation
              });
              if (historyUpdate == null) {
                historyUpdate = copyObject({ _id: render._id, parent: render.parent ?? null, p: render.p, r: render.r });
              }
              let setChildAnno = {
                _id: render._id,
                parent: setParentID,
                p: [newX, newY]
              };
              if (render.r != null || newRotation != 0) {
                setChildAnno.r = newRotation;
              }
              await this.save.apply(setChildAnno);
              anno.save = true;
              anno.render.m = this.self.modify;
              if (connected == true) {
                this.save.pendingSaves[setChildAnno._id] = { ...(this.save.pendingSaves[setChildAnno._id] ?? {}), ...setChildAnno, sync: getEpoch() };
                this.realtimeSelect[setChildAnno._id] = { ...(this.realtimeSelect[setChildAnno._id] ?? {}), ...setChildAnno };
              }
            }
          } else if (isAChild == true) { // Update chunks of child annotations:
            await this.utils.setAnnotationChunks(anno);
          }

          if (history.update != null && historyUpdate != null) {
            history.update.push(historyUpdate);
          }

          // Delete children if parent is deleted:
          if (deleteChild == true) {
            if (history.add != null) {
              history.add.push(copyObject({ ...render, p: [annoX, annoY], r: rotation, parent: null }));
            }
            let setChildAnno = { _id: render._id, remove: true };
            await this.save.apply(setChildAnno);
            if (connected == true) {
              this.save.pendingSaves[setChildAnno._id] = { ...(this.save.pendingSaves[setChildAnno._id] ?? {}), ...setChildAnno, sync: getEpoch() };
              this.realtimeSelect[setChildAnno._id] = { ...(this.realtimeSelect[setChildAnno._id] ?? {}), ...setChildAnno };
            }
          }
        }
      }

      annotation.save = true;
      //if (this.utils.getLocked(annotation.render).includes("p") == false || this.self.access < 4) {
      annotation.render.m = this.self.modify;
      //}
      if (newAnnotation == true) {
        annotation.render.a = this.self.modify;
      }
      if (connected == true) {
        this.save.pendingSaves[annoID] = { _id: annoID, ...(this.save.pendingSaves[annoID] ?? {}), ...data };
      } else {
        this.pendingSaves = {};
      }
      this.save.syncSave();
      return annotation;
    }
    if (this.resync != null && this.resync.save != null && this.resync.save.synced == false && this.resync.annotations != null) {
      if (this.self.access > 0) {
        let resyncKeys = Object.keys(this.resync.annotations);
        for (let i = 0; i < resyncKeys.length; i++) {
          let anno = this.resync.annotations[resyncKeys[i]] ?? {};
          if (anno.save == true && (anno.render._id.includes("pending_") == false || anno.render.remove != true)) {
            let render = copyObject(anno.render);
            delete anno.expire;
            this.annotations[render._id] = { render: render };
            this.save.pendingSaves[render._id] = { ...this.save.pendingSaves[render._id], ...render };
          }
        }
        this.save.syncSave(true);
      }
    }
    if (this.parent != null && this.parent.pageID != null && (window.resync ?? {}).pageSync != null) {
      window.resync.pageSync[this.parent.pageID] = { save: this.save, annotations: this.annotations };
    }

    this.history = {};
    this.history.history = [];
    this.history.location = -1;
    this.history.push = (type, changes, caret) => {
      if (this.history.history.length > 100) { // If longer than 100, remove the first item to shrink under
        this.history.history.shift();
        this.history.location--;
      }
      if (this.history.location + 1 < this.history.history.length) { // Clear out redo history once undo in past
        this.history.history = this.history.history.slice(0, this.history.location + 1);
      }

      let newHistory = {
        type: type,
        time: getEpoch(),
        changes: copyObject(changes),
        redo: []
      };
      if (caret != null) {
        newHistory.caret = {
          undoElement: caret.undoElement,
          undoPosition: caret.undoPosition,
          //redoElement: caret.redoElement,
          //redoPosition: caret.redoPosition
        };
      }
      this.history.history.push(newHistory);
      this.history.location++;

      this.pipeline.publish("history_update", { history: this.history.history, location: this.history.location });
    }
    this.history.undo = async () => {
      if (this.toolbar != null) {
        await this.toolbar.selection.undo();
      }
    }
    this.history.redo = async () => {
      if (this.toolbar != null) {
        await this.toolbar.selection.redo();
      }
    }

    this.text = {};
    this.text.getCurrentCaretPosition = (element) => {
      let position = 0;
      if (typeof window.getSelection !== "undefined") {
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
          const range = window.getSelection().getRangeAt(0);
          const preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          position = preCaretRange.toString().length;
          if (preCaretRange.endContainer.textContent == "") {
            position = "END";
          }
        }
      }
      return position;
    }
    this.text.createRange = (node, chars, range) => {
      if (range == null) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
      }
      if (chars.count === 0) {
        range.setEnd(node, chars.count);
      } else if (node && chars.count > 0) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.length < chars.count) {
            chars.count -= node.textContent.length;
          } else {
            range.setEnd(node, chars.count);
            chars.count = 0;
          }
        } else {
          for (let lp = 0; lp < node.childNodes.length; lp++) {
            range = this.text.createRange(node.childNodes[lp], chars, range);
            if (chars.count === 0) {
              break;
            }
          }
        }
      }
      return range;
    }
    this.text.setCaretPosition = (element, chars) => {
      if (element == null) {
        return;
      }
      let selection = window.getSelection();
      let range = null;
      if (chars == "END") {
        range = this.text.createRange(element.lastChild, { count: element.lastChild.length - 1 });
      } else {
        range = this.text.createRange(element, { count: chars });
      }
      if (range != null) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    this.text.clearSelection = () => {
      if (window.getSelection != null) {
        window.getSelection().removeAllRanges();
      } else if (document.selection != null) {
        document.selection.empty();
      }
    }
    this.text.startTextSelection = (text, extra) => {
      if (extra.setCaretPosition != true || document.caretRangeFromPoint == null) {
        if (window.getSelection && document.createRange) {
          let range = document.createRange();
          range.selectNodeContents(text);
          let sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.body.createTextRange) {
          let range = document.body.createTextRange();
          range.moveToElementText(text);
          range.select();
        }
      } else {
        let range = document.caretRangeFromPoint(extra.clientX, extra.clientY);
        let selection = window.getSelection();

        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    this.updateInterface = () => {
      if (this.settings.anonymousMode == true) {
        content.setAttribute("anonymous", "");
      } else {
        content.removeAttribute("anonymous");
      }
    }
    this.updateInterface();
    this.updateBackground = (setColor) => {
      if (setColor != null) {
        this.backgroundColor = setColor;
      }
      content.style.setProperty("--backgroundColor", "#" + this.backgroundColor);
      if (this.utils.contrastCheck(this.backgroundColor) == true) {
        background.style.setProperty("background-image", "url(../images/editor/backdropblack.svg)");
        content.style.setProperty("--secondaryBackgroundColor", "#" + this.utils.darkenHex(this.backgroundColor, 50));
      } else {
        background.style.setProperty("background-image", "url(../images/editor/backdropwhite.svg)");
        content.style.setProperty("--secondaryBackgroundColor", "#" + this.utils.lightenHex(this.backgroundColor, 50));
      }
      content.style.setProperty("--backgroundColor", "#" + this.backgroundColor);
    }
    this.updateBackground();
    
    let updateSubTimeout;
    let loadedChunks = {};
    let holdLoadedChunks = {};
    let alreadyRunningUpdateCycle = false;
    this.runUpdateCycle = async () => {
      if (alreadyRunningUpdateCycle == true) {
        return;
      }
      alreadyRunningUpdateCycle = true;
      let unloadChunkedAnnotations = {};
      let newlyUnloaded = {};
      let visible = Object.keys({ ...loadedChunks, ...holdLoadedChunks });
      holdLoadedChunks = {};
      for (let i = 0; i < visible.length; i++) {
        let chunk = visible[i];
        if (this.visibleChunks.includes(chunk) == false) {
          delete loadedChunks[chunk];
          newlyUnloaded[chunk] = "";

          // Remove annotations in unloaded chunks:
          unloadChunkedAnnotations = { ...unloadChunkedAnnotations, ...(this.chunkAnnotations[chunk] ?? {}) };
        }
      }
      let chunkUnloadAnnos = Object.keys(unloadChunkedAnnotations);
      for (let a = 0; a < chunkUnloadAnnos.length; a++) {
        let annotation = this.annotations[chunkUnloadAnnos[a]] ?? {};
        if (annotation.render == null) {
          continue;
        }
        if (annotation.chunks != null) {
          // Annotation may still be visible in another chunk, we must check
          let remove = true;
          for (let c = 0; c < annotation.chunks.length; c++) {
            if (loadedChunks[annotation.chunks[c]] != null) {
              remove = false;
              break;
            }
          }
          if (remove == false) {
            continue;
          }
        }
        if (annotation.renderedChildren != null && Object.keys(annotation.renderedChildren).length > 0) {
          for (let c = 0; c < annotation.chunks.length; c++) {
            holdLoadedChunks[annotation.chunks[c]] = "";
          }
          continue;
        }
        if (this.selecting[annotation.render._id] != null) { // || this.utils.getParents(annotation.render).some((parent) => { return this.selecting[parent._id] != null }) == true
          for (let c = 0; c < annotation.chunks.length; c++) {
            holdLoadedChunks[annotation.chunks[c]] = "";
          }
          continue;
        }
        if (annotation.component != null) {
          this.render.remove(annotation);
        }
      }

      let loadChunkedAnnotations = {};
      let newlyLoaded = {};
      for (let i = 0; i < this.visibleChunks.length; i++) {
        let chunk = this.visibleChunks[i];
        if (loadedChunks[chunk] == null) {
          loadedChunks[chunk] = "";
          newlyLoaded[chunk] = "";

          // Load annotations in these chunks:
          loadChunkedAnnotations = { ...loadChunkedAnnotations, ...(this.chunkAnnotations[chunk] ?? {}) };
        }
      }
      let chunkAnnos = Object.keys(loadChunkedAnnotations);
      for (let a = 0; a < chunkAnnos.length; a++) {
        let annotation = this.annotations[chunkAnnos[a]] ?? { chunks: [] };
        let render = true;
        for (let i = 0; i < annotation.chunks.length; i++) {
          let chunk = annotation.chunks[i];
          if (loadedChunks[chunk] != null && newlyLoaded[chunk] == null) {
            render = false;
            break;
          }
        }
        if (render == true && annotation.render != null && annotation.component == null) {
          await this.render.create(annotation);
        }
      }
      alreadyRunningUpdateCycle = false;
    }
    this.updateChunks = async () => {
      if (this.exporting == true) {
        return;
      }

      // Update Background Dots:
      let dotSize = 25;
      if (this.zoom < .25) {
        dotSize = 100;
      } else if (this.zoom < .5) {
        dotSize = 50;
      }
      background.style.backgroundSize = dotSize + "px " + dotSize + "px";
      let scaledDotSize = dotSize * this.zoom;
      let backgroundPaddingWidth = Math.ceil((page.offsetWidth / 2) / scaledDotSize) * scaledDotSize;
      let backgroundPaddingHeight = Math.ceil((page.offsetHeight / 2) / scaledDotSize) * scaledDotSize;
      let backgroundWidth = Math.ceil((page.offsetWidth + (backgroundPaddingWidth * 2)) / scaledDotSize) * scaledDotSize;
      let backgroundHeight = Math.ceil((page.offsetHeight + (backgroundPaddingHeight * 2)) / scaledDotSize) * scaledDotSize;
      background.style.width = (backgroundWidth / this.zoom) + "px";
      background.style.height = (backgroundHeight / this.zoom) + "px";
      let annotationRect = this.utils.localBoundingRect(annotations);
      let originCorrectX = (annotationRect.left - (backgroundWidth / 2)) % scaledDotSize;
      let originCorrectY = (annotationRect.top - (backgroundHeight / 2)) % scaledDotSize;
      background.style.transform = "translate3d(" + (contentHolder.scrollLeft + originCorrectX - backgroundPaddingWidth) + "px, " + (contentHolder.scrollTop + originCorrectY - backgroundPaddingHeight) + "px, 0) scale(var(--zoom))";

      if (this.zooming == true) {
        return;
      }

      let beforeChunks = JSON.stringify(this.visibleChunks);
      this.visibleChunks = this.utils.regionInChunks(
        ((page.offsetWidth / -2) - annotationRect.left) / this.zoom,
        ((page.offsetHeight / -2) - annotationRect.top) / this.zoom,
        ((page.offsetWidth + (page.offsetWidth / 2)) - annotationRect.left) / this.zoom,
        ((page.offsetHeight + (page.offsetHeight / 2)) - annotationRect.top) / this.zoom
      );
      if (beforeChunks != JSON.stringify(this.visibleChunks)) {
        await this.runUpdateCycle();
      }
      
      clearTimeout(this.updatePageTimeout);
      this.updatePageTimeout = setTimeout(this.utils.updateCurrentPage, 100);
      clearTimeout(updateSubTimeout);
      updateSubTimeout = setTimeout(() => {
        if (this.realtime.module != null) {
          this.realtime.module.setShortSub(this.visibleChunks);
        }
      }, 750);
    }
    this.pipeline.subscribe("boundChange", "bounds_change", this.updateChunks, { sort: 1 });
    
    contentHolder.addEventListener("scroll", (event) => {
      this.pipeline.publish("scroll", { event: event });
      this.pipeline.publish("bounds_change", { type: "scroll", event: event });
    });

    this.pipeline.subscribe("longAnnotationUpdate", "long", async (event) => {
      let data = copyObject(event);
      //let redrawAction = false;
      for (let i = 0; i < data.length; i++) {
        let anno = data[i];
        let pendingAnno;
        if (anno.pending != null) {
          pendingAnno = this.annotations[anno.pending];
        }
        let existingAnno = this.annotations[anno._id] ?? pendingAnno;
        if (existingAnno != null) {
          if (existingAnno.serverSync > anno.sync) {
            continue; // Discard event as it's old
          }
          existingAnno.serverSync = anno.sync;
          existingAnno.revert = anno;

          if (pendingAnno != null) {
            let selectBox = content.querySelector('.eSelect[anno="' + anno.pending + '"]');
            if (selectBox != null) {
              selectBox.setAttribute("anno", anno._id);
            }
            let allSelections = realtimeHolder.querySelectorAll('.eCollabSelect[anno="' + anno.pending + '"]');
            for (let i = 0; i < allSelections.length; i++) {
              allSelections[i].setAttribute("anno", anno._id);
            }

            for (let i = 0; i < this.history.history.length; i++) {
              let event = this.history.history[i];
              for (let c = 0; c < event.changes.length; c++) {
                let change = event.changes[c];
                if (change._id == anno.pending) {
                  change._id = anno._id;
                }
                if (change.parent == anno.pending) {
                  change.parent = anno._id;
                }
              }
              for (let c = 0; c < event.redo.length; c++) {
                let change = event.redo[c];
                if (change._id == anno.pending) {
                  change._id = anno._id;
                }
                if (change.parent == anno.pending) {
                  change.parent = anno._id;
                }
              }
            }

            if (existingAnno.render != null) {
              existingAnno.render._id = anno._id;
            } else {
              existingAnno.render = anno;
            }
            this.annotations[anno._id] = existingAnno;
            this.annotations[anno.pending] = { pointer: anno._id };
            existingAnno = this.annotations[anno._id];
            existingAnno.pending = anno.pending;

            if (this.selecting[anno.pending] != null) {
              this.selecting[anno._id] = this.selecting[anno.pending];
              delete this.selecting[anno.pending];
  
              if (this.toolbar != null && this.toolbar.selection.annotationRects[anno.pending] != null) {
                this.toolbar.selection.annotationRects[anno._id] = this.toolbar.selection.annotationRects[anno.pending];
              }
            }

            if (existingAnno.component != null) {
              existingAnno.component.properties._id = anno._id;
              existingAnno.component.setID();
            }

            // Update Chunk IDs:
            existingAnno.chunks = existingAnno.chunks ?? [];
            for (let i = 0; i < existingAnno.chunks.length; i++) {
              let chunk = this.chunkAnnotations[existingAnno.chunks[i]];
              if (chunk != null) {
                chunk[anno._id] = "";
                delete this.chunkAnnotations[existingAnno.chunks[i]][anno.pending];
              }
            }

            await this.render.setMarginSize();
          }
          
          // CHECKS IF SERVER IS AFTER LAST SHORT EDIT SYNC
          if (existingAnno.render.sync > anno.sync) {
            continue;
          }
        }

        if (anno.remove == true) {
          delete this.reactions[anno._id];
        }

        await this.save.apply(anno, { overwrite: true, timeout: false }); //let result =
        /*if (result.redrawAction == true) {
          redrawAction = true;
        }*/
      }
      this.pipeline.publish("redraw_selection", { refresh: true, redrawCurrentAction: true, refreshActionBar: true, fromLong: true }); //redrawActionBar: redrawAction,
    });
    this.pipeline.subscribe("removeAnnotationUpdate", "removeannotations", async (data) => {
      let annoKeys = Object.keys(this.annotations);
      for (let i = 0; i < annoKeys.length; i++) {
        let anno = this.annotations[annoKeys[i]] ?? {};
        let render = anno.revert ?? anno.render ?? {};
        if (render.f == "page") { // Only if not page annotation!
          continue;
        }
        if (render.sync < data.sync) {
          anno.render.remove = true;
          delete anno.revert;
          await this.render.create(anno, true);
        }
      }
      this.pipeline.publish("redraw_selection", { fromLong: true });
    });
    this.pipeline.subscribe("reactionAnnotation", "reaction", async (event) => {
      let data = copyObject(event);
      let annotation = this.annotations[data.reaction.annotation];
      if (annotation == null) {
        return;
      }
      let reactions = this.reactions[data.reaction.annotation];
      if (reactions == null) {
        this.reactions[data.reaction.annotation] = [];
        reactions = this.reactions[data.reaction.annotation];
      }
      if (data.change != null) {
        if (this.self.modify == data.member._id) {
          if (data.change > 0) {
            data.reaction.reacted = true;
          } else {
            data.reaction.reacted = false;
          }
        }
        let foundReaction = false;
        for (let i = 0; i < reactions.length; i++) {
          if (reactions[i]._id == data.reaction._id) {
            reactions[i].count += data.change;
            if (data.reaction.reacted != null) {
              reactions[i].reacted = data.reaction.reacted;
            }
            if (reactions[i].count < 1) {
              reactions.splice(i, 1);
              i--;
            }
            foundReaction = true;
            break;
          }
        }
        if (foundReaction == false) {
          data.reaction.count += data.change;
          reactions.push(data.reaction);
        }
      } else {
        for (let i = 0; i < reactions.length; i++) {
          if (reactions[i]._id == data.reaction._id) {
            reactions.splice(i, 1);
            break;
          }
        }
      }
      if (reactions.length < 1) {
        delete this.reactions[data.reaction.annotation];
      }
      await this.render.create(annotation);
    });

    this.pipeline.subscribe("editorMemberUpdate", "update", (data) => {
      if (this.realtime.module != null) {
        if (data.active == false || (data.hasOwnProperty("access") == true && data.access < 1)) {
          this.realtime.module.removeRealtime(data._id);
        }
      }
    });
    this.pipeline.subscribe("editorMemberLeave", "leave", (data) => {
      if (this.realtime.module != null) {
        this.realtime.module.removeRealtime(data._id);
        delete this.realtime.module.members[data._id];
        if (this.realtime.observing == data._id) {
          this.realtime.module.exitObserve();
          alertModule.open("warning", "<b>Member Left</b>The member you were observing left.");
        }
        if (data.member != null && data.member.observe == this.sessionID) {
          this.realtime.observed--;
        }
      }
    });

    this.pipeline.subscribe("editorSettingsUpdate", "set", (data) => {
      if (data.settings != null) {
        objectUpdate(data.settings, this.settings);
        this.pipeline.publish("redraw_selection", { redrawActionBar: true });
      }
      this.updateInterface();
    });

    this.pipeline.subscribe("editorCloseCheck", "beforeunload", (data) => {
      if (Object.keys(this.save.pendingSaves).length > 0 || this.save.synced == false) {
        if (data.returned != true) {
          data.event.preventDefault();
          data.event.returnValue = "";
          data.returned = true;
        }
        this.save.syncSave(true);
      }
    });
    
    let lastMouseX;
    let lastMouseY;
    let mouseBeforeX;
    let mouseBeforeY;
    this.setZoom = async (set, observe, mouse = {}) => {
      if (observe != true && this.realtime.observing != null && this.realtime.module != null) {
        this.realtime.module.exitObserve();
      }

      let { mouseX, mouseY } = this.utils.localMousePosition(mouse);

      if (lastMouseX != mouseX || lastMouseY != mouseY) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        // Get Page Rect:
        let annotationHolderRect = this.utils.localBoundingRect(annotations);
        mouseBeforeX = (mouseX - annotationHolderRect.left) / this.zoom;
        mouseBeforeY = (mouseY - annotationHolderRect.top) / this.zoom;
      }

      if (set != null) {
        this.zoom = set;
      } else {
        this.zoom += Math.min(mouse.deltaY ?? 0, 50) * -0.01;
      }
      this.zoomChanged = true;

      if (this.zoom > 5) {
        this.zoom = 5;
      } else if (this.zoom < .2) {
        this.zoom = .2;
      }

      this.zooming = true;

      content.style.setProperty("--zoom", this.zoom);

      await this.render.setMarginSize();

      if (observe != true) {
        // Get Page Rect:
        let annotationHolderRect = this.utils.localBoundingRect(annotations);
        let addScrollX = (mouseBeforeX * this.zoom) - (mouseX - annotationHolderRect.left);
        let addScrollY = (mouseBeforeY * this.zoom) - (mouseY - annotationHolderRect.top);
        
        // Set the new scroll position
        contentHolder.scrollTo(contentHolder.scrollLeft + addScrollX, contentHolder.scrollTop + addScrollY);
      }

      this.zooming = false;

      await this.updateChunks();

      this.pipeline.publish("zoom_change", { zoom: this.zoom });

      if (this.realtime.module != null) {
        this.realtime.module.adjustRealtimeHolder();
      }
    }
    this.pipeline.subscribe("zoomWheel", "wheel", (data) => {
      let event = data.event;
      if (event.ctrlKey == true || event.metaKey == true) {
        event.preventDefault();
        this.setZoom(null, null, event);
      } else {
        lastMouseX = null;
        lastMouseY = null;
      }
    });
    page.addEventListener("DOMMouseScroll", (event) => {
      this.pipeline.publish("wheel", { type: "DOMMouseScroll", event: event });
    }, { passive: false });
    page.addEventListener("mousewheel", (event) => {
      this.pipeline.publish("wheel", { type: "mousewheel", event: event });
    }, { passive: false });
    page.addEventListener("wheel", (event) => {
      this.pipeline.publish("wheel", { type: "wheel", event: event });
    }, { passive: false });

    this.pipeline.subscribe("optionsFullscreen", "fullscreenchange", (event) => {
      this.options.fullscreen = event.fullscreen;
    });
    this.options.fullscreen = document.fullscreenElement != null;

    let startDistance;
    let startZoom;
    let currentCenter;
    let getDistance = (touches) => {
      let pageWidth = page.offsetWidth;
      let pageHeight = page.offsetHeight;
      let { mouseX: touchAX, mouseY: touchAY } = this.utils.localMousePosition(touches[1]);
      let { mouseX: touchBX, mouseY: touchBY } = this.utils.localMousePosition(touches[0]);
      let xDiff = (touchAX / pageWidth) - (touchBX / pageWidth);
      let yDiff = (touchAY / pageHeight) - (touchBY / pageHeight);
      return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }
    let getCenter = (touches) => {
      let { mouseX: touchAX, mouseY: touchAY } = this.utils.localMousePosition(touches[0]);
      let { mouseX: touchBX, mouseY: touchBY } = this.utils.localMousePosition(touches[1]);
      return { x: (touchAX + touchBX) / 2, y: (touchAY + touchBY) / 2 };
    }
    let running = false;
    let handlePinch = async (event) => {
      if (event.touches.length > 1 && this.pinchZoomDisable != true) {
        event.preventDefault();
        if (running == true) {
          return;
        }
        running = true;
        let selectKeys = Object.keys(this.selecting);
        this.selecting = {};
        for (let i = 0; i < selectKeys.length; i++) {
          let existingAnno = this.annotations[selectKeys[i]];
          if (existingAnno != null) {
            let allowRender = false;
            for (let i = 0; i < existingAnno.chunks.length; i++) {
              if (this.visibleChunks.includes(existingAnno.chunks[i]) == true) {
                allowRender = true;
                break;
              }
            }
            if (allowRender == true) {
              await this.render.create(existingAnno);
            }
          }
        }
        let currentDistance = getDistance(event.touches);
        if (startDistance == null) {
          startDistance = currentDistance;
        }
        if (startZoom == null) {
          startZoom = this.zoom;
        }
        if (currentCenter == null) {
          currentCenter = getCenter(event.touches);
        }
        await this.setZoom(startZoom * (currentDistance / startDistance), null, { clientX: currentCenter.x, clientY: currentCenter.y, updatePages: false });
        running = false;
      }
    }
    this.pipeline.subscribe("zoomPinchTouchStart", "touchstart", (data) => {
      handlePinch(data.event);
    });
    this.pipeline.subscribe("zoomPinchTouchMove", "touchmove", (data) => {
      handlePinch(data.event);
    });
    this.pipeline.subscribe("zoomPinchTouchEnd", "touchend", () => {
      startDistance = null;
      startZoom = null;
      currentCenter = null;
    });

    this.pipeline.subscribe("checkActivePage", "click_start", () => {
      if (this.parent.parent.activePageID != this.parent.pageID) {
        this.parent.parent.activePageID = this.parent.pageID;
        this.parent.parent.pushToPipelines(null, "page_switch", { pageID: this.parent.pageID });
      }
    });
    let updateActivePage = () => {
      this.active = this.parent.parent.activePageID == this.parent.pageID;
      if (this.active == false) {
        page.parentElement.removeAttribute("active");
      } else {
        page.parentElement.setAttribute("active", "");
      }
    }
    this.pipeline.subscribe("checkPageSwitch", "page_switch", updateActivePage);
    updateActivePage();

    page.addEventListener("pointerdown", (event) => {
      this.pipeline.publish("pointerdown", { event: event });
      if (event.pointerType == "mouse") {
        this.pipeline.publish("click_start", { type: "pointerdown", event: event });
      }
    }, { passive: false });

    /*page.addEventListener("mousedown", (event) => {
      this.pipeline.publish("mousedown", { event: event });
      
      let eventSource = "mouse";
      if (window.PointerEvent && event instanceof PointerEvent) {
        eventSource = event.pointerType;
      } else if (navigator.maxTouchPoints > 0) {
        eventSource = "touch";
      }

      if (eventSource == "mouse") { //if (event.buttons != 0) {
        this.pipeline.publish("click_start", { type: "mousedown", event: event });
      }
    }, { passive: false });*/
    /*page.addEventListener("mousemove", (event) => {
      this.pipeline.publish("mousemove", { event: event });
      this.pipeline.publish("click_move", { type: "mousemove", event: event });
    }, { passive: false });*/

    page.addEventListener("touchstart", (event) => {
      this.pipeline.publish("touchstart", { event: event });
      this.pipeline.publish("click_start", { type: "touchstart", event: event });
    }, { passive: false });
    /*page.addEventListener("touchmove", (event) => {
      this.pipeline.publish("touchmove", { event: event });
      this.pipeline.publish("click_move", { type: "touchmove", event: event });
    }, { passive: false });*/

    page.addEventListener("click", (event) => {
      this.pipeline.publish("click", { event: event });
    }, { passive: false });

    page.addEventListener("mouseleave", (event) => {
      this.pipeline.publish("mouseleave", { event: event });
    });

    await this.render.setMarginSize();
    this.utils.centerWindowWithPage();
    this.updateChunks();
  }
}

// Dropdown Modules:
modules["dropdowns/lesson/zoom"] = class {
  html = `
  <div class="eZoomHolder">
    <button class="eZoomButton buttonAnim border" sub change="-20">-</button>
    <div class="eZoomLevel border"><div class="eZoomBox" contenteditable>100</div>%</div>
    <button class="eZoomButton buttonAnim border" add change="20">+</button>
  </div>
  <div class="eZoomLine"></div>
  <button class="eZoomAction" option="snapping" local title="Snap elements to guides while moving and resizing."><div label>Snapping</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursors"><div label>Show Cursors</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursornames" local title="Show the member's name when they're annotating."><div label>Cursor Names</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="stylusmode" local title="Only write on the document when using an active stylus, such as the Apple Pencil."><div label>Stylus Mode</div><div class="eZoomToggle"><div></div></div></button>
  <!--<button class="eZoomAction" option="comments" title="Show comments on the document."><div label>Comments</div><div class="eZoomToggle"><div></div></div></button>-->
  <button class="eZoomAction" option="fullscreen" title="Use Markify in full screen mode."><div label>Full Screen</div><div class="eZoomToggle"><div></div></div></button>
  `;
  css = {
    ".eZoomHolder": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".eZoomButton": `position: relative; display: flex; width: 22px; height: 22px; margin: 20px 3px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 8px; color: var(--theme); font-size: 24px; font-weight: 600; line-height: 0`,
    '.eZoomButton[sub]': `cursor: zoom-out`,
    '.eZoomButton[add]': `cursor: zoom-in`,
    ".eZoomLevel": `display: flex; padding: 3px 6px 3px 3px; margin: 0 12px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eZoomLevel div": `max-width: 50px; min-width: 25px; padding: 3px 6px; margin-right: 3px; border: none; outline: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`,

    ".eZoomLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,

    ".eZoomAction": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eZoomAction:not(:last-child)": `margin-bottom: 4px`,
    ".eZoomAction div[label]": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eZoomAction[on]": `--themeColor: var(--theme)`,
    ".eZoomAction[off]": `--themeColor: var(--error)`,
    ".eZoomToggle": `position: relative; width: 36px; height: 20px; padding: 2px; margin-left: 12px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eZoomToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eZoomAction[on] .eZoomToggle div": `right: 2px`,
    ".eZoomAction[off] .eZoomToggle div": `right: calc(100% - 22px)`,
    ".eZoomAction:hover": `background: var(--themeColor); color: #fff`,
    ".eZoomAction:hover .eZoomToggle": `background: #fff`,
    ".eZoomAction:hover .eZoomToggle div": `background: var(--themeColor)`
  };
  js = async function (frame, extra) {
    let editor = extra.parent.editor;

    let zoomPercentage = frame.querySelector(".eZoomLevel div");
    let zoomAdd = frame.querySelector(".eZoomButton[add]");
    let zoomSub = frame.querySelector(".eZoomButton[sub]");
    let setZoomText = () => {
      zoomPercentage.textContent = Math.round(editor.zoom * 100);
      if (editor.zoom >= 5) {
        zoomAdd.setAttribute("disabled", "");
      } else {
        zoomAdd.removeAttribute("disabled");
      }
      if (editor.zoom <= .2) {
        zoomSub.setAttribute("disabled", "");
      } else {
        zoomSub.removeAttribute("disabled");
      }
      frame.closest(".dropdown").querySelector(".dropdownTitle").textContent = zoomPercentage.textContent + "%";
    }
    editor.pipeline.subscribe("zoomDropdownUpdate", "zoom_change", setZoomText);
    setZoomText();
    let setButtonOptions = frame.querySelectorAll(".eZoomAction");
    for (let i = 0; i < setButtonOptions.length; i++) {
      let buttonToggle = setButtonOptions[i];
      if (editor.options[buttonToggle.getAttribute("option")] == true) {
        buttonToggle.setAttribute("on", "");
      } else {
        buttonToggle.setAttribute("off", "");
      }
    }
    let forceSetZoom = () => {
      editor.setZoom(parseInt(zoomPercentage.textContent) / 100, null, { clientX: editor.contentHolder.offsetWidth / 2, clientY: editor.contentHolder.offsetHeight / 2 });
    }
    zoomPercentage.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        zoomPercentage.blur();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 500) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 500%");
        }
      }
    });
    let alreadyRunningFocus = false;
    zoomPercentage.addEventListener("focus", () => {
      if (alreadyRunningFocus == true) {
        return;
      }
      alreadyRunningFocus = true;
      zoomPercentage.blur();
      zoomPercentage.innerHTML = "";
      zoomPercentage.focus();
      alreadyRunningFocus = false;
    });
    zoomPercentage.addEventListener("focusout", (event) => {
      if (alreadyRunningFocus == true) {
        return;
      }
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      let textInt = parseInt(textBox.textContent);
      if (isNaN(textInt) == true) {
        setZoomText();
      } else if (textInt > 500) {
        textBox.textContent = "500";
      } else if (textInt < 20) {
        textBox.textContent = "20";
      }
      forceSetZoom();
    });
    let cursorZoomAction = frame.querySelector('.eZoomAction[option="cursors"]');
    let namesZoomAction = frame.querySelector('.eZoomAction[option="cursornames"]');
    let fullscreenZoomAction = frame.querySelector('.eZoomAction[option="fullscreen"]');
    let updateZoomActions = () => {
      if (editor.parent.parent.signalStrength < 3) {
        cursorZoomAction.style.opacity = 0.5;
        cursorZoomAction.title = "Cursors disabled due to weak connection.";
        namesZoomAction.style.opacity = 0.5;
      } else {
        cursorZoomAction.style.opacity = 1;
        cursorZoomAction.title = "Display the cursors of other editors.";
        namesZoomAction.style.opacity = 1;
      }
    }
    editor.pipeline.subscribe("zoomDropdownSignalStrength", "signal_strength", updateZoomActions);
    updateZoomActions();
    if (cursorZoomAction.hasAttribute("off") == true) {
      namesZoomAction.setAttribute("disabled", "");
    }
    frame.addEventListener("click", (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let zoomChange = element.closest(".eZoomButton");
      if (zoomChange) {
        (Math.floor(((editor.zoom + parseFloat(zoomChange.getAttribute("change"))) * 100) / 5) * 5) / 100
        editor.setZoom(
          (
            Math.round(
              (
                Math.round(editor.zoom * 100) + parseInt(zoomChange.getAttribute("change"))
              ) / 20
          ) * 20
        ) / 100, null, { clientX: editor.contentHolder.offsetWidth / 2, clientY: editor.contentHolder.offsetHeight / 2 });
        return;
      }
      let toggle = element.closest(".eZoomAction");
      if (toggle != null) {
        let option = toggle.getAttribute("option");
        if (toggle.hasAttribute("on")) {
          toggle.setAttribute("off", "");
          toggle.removeAttribute("on");
          editor.options[option] = false;
        } else {
          toggle.setAttribute("on", "");
          toggle.removeAttribute("off");
          editor.options[option] = true;
        }
        if (toggle.hasAttribute("local") == true) {
          this.localOptions = this.localOptions ?? {};
          this.localOptions[option] = editor.options[option];
          setLocalStore("options", JSON.stringify(this.localOptions));
        }
        if (option == "cursors") {
          if (editor.realtime.module != null) {
            editor.realtime.module.setShortSub(editor.visibleChunks);
          }
          if (toggle.hasAttribute("off") == true) {
            if (editor.realtime.module != null) {
              editor.realtime.module.members = {};
            }
            editor.frame.querySelector(".eRealtime").innerHTML = "";
          }
          if (toggle.hasAttribute("on") == true) {
            namesZoomAction.removeAttribute("disabled");
          } else {
            namesZoomAction.setAttribute("disabled", "");
          }
        }
        if (option == "fullscreen") {
          if (toggle.hasAttribute("on") == true) {
            body.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }
      }
    });

    if (body.requestFullscreen == null || document.exitFullscreen == null) {
      fullscreenZoomAction.remove();
    }

    editor.pipeline.subscribe("zoomDropdownFullscreen", "fullscreenchange", (event) => {
      if (fullscreenZoomAction != null) {
        if (event.fullscreen == true) {
          fullscreenZoomAction.setAttribute("on", "");
          fullscreenZoomAction.removeAttribute("off");
        } else {
          fullscreenZoomAction.setAttribute("off", "");
          fullscreenZoomAction.removeAttribute("on");
        }
      }
    });
  }
}

// Annotation Modules:
modules["editor/render/annotation"] = class {
  getElement = () => {
    return this.element;
  }

  setID = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.properties._id != this.lastSetID) {
      this.lastSetID = this.properties._id;
      element.setAttribute("anno", this.properties._id);
    }
  }
  setParent = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.holder != element.parentElement) {
      this.holder.appendChild(element); // Change annotation parent to the new parent
    }
  }
  setZIndex = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.properties.l == null) {
      return;
    }
    if (this.properties.l < (this.parent.minLayer ?? (this.properties.l + 1))) {
      this.parent.minLayer = this.properties.l;
      this.parent.annotationHolder.style.setProperty("--minZIndex", this.properties.l);
      this.parent.annotationHolder.style.setProperty("--startZIndex", -Math.min(this.properties.l, 0));
    }
    if (this.properties.l > (this.parent.maxLayer ?? (this.properties.l - 1))) {
      this.parent.maxLayer = this.properties.l;
      this.parent.annotationHolder.style.setProperty("--maxZIndex", this.properties.l);
    }
    if (this.properties.l != this.lastSetLayer) {
      this.lastSetLayer = this.properties.l;
      element.style.setProperty("--zIndex", this.properties.l);
    }
  }
  setTransform = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    let transform = "translate3d(" + this.properties.p[0] + "px," + this.properties.p[1] + "px, 0)";
    let rotate = this.properties.r ?? 0;
    if (rotate > 0) {
      if (rotate > 180) {
        rotate = -(360 - rotate);
      }
      transform += " rotate(" + rotate + "deg)";
    }
    if (this.annotation.render.s[0] < 0 && this.annotation.render.s[1] < 0) {
      transform += " scale(-1)";
    } else if (this.annotation.render.s[0] < 0) {
      transform += " scale(-1,1)";
    } else if (this.annotation.render.s[1] < 0) {
      transform += " scale(1,-1)";
    }
    if (transform != this.lastSetTransform) {
      this.lastSetTransform = transform;
      element.style.transform = transform;
    }
  }
  setAnimate = (set) => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    this.animate = set ?? this.animate;
    if (this.animate == this.lastSetAnimate) {
      return;
    }
    this.lastSetAnimate = this.animate;
    if (this.animate != false) {
      element.removeAttribute("notransition");
    } else {
      element.setAttribute("notransition", "");
    }
  }

  subscribe = (event, callback, extra) => {
    this.parent.pipeline.subscribe("annotation_" + this.properties._id, event, callback, extra);
  }
  unsubscribe = (event) => {
    this.parent.pipeline.unsubscribe("annotation_" + this.properties._id, event);
  }

  hide = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.hidden != true) {
      this.hidden = true;
      element.setAttribute("hidden", "");
    }
  }
  show = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    if (this.hidden == true) {
      this.hidden = false;
      element.removeAttribute("hidden");
    }
  }
  remove = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    element.remove();
    this.parent.pipeline.unsubscribe("annotation_" + this.properties._id);
  }

  getContainer = () => {
    return this.container;
  }
  setContainer = () => {
    let element = this.getElement();
    if (element == null) {
      return;
    }
    let holder = this.getContainer();
    let parentRect = this.parent.utils.getRect(this.annotation.render);
    if (holder == null) {
      (element.querySelector("div[annoholdercontainer]") ?? element).insertAdjacentHTML("beforeend", `<div class="eAnnotationHolder"></div>`);
      holder = element.querySelector(".eAnnotationHolder");
      this.container = holder;
      holder.style.width = parentRect.width + "px";
      holder.style.height = parentRect.height + "px";
      holder.style.left = "0px";
      holder.style.top = "0px";
    } else if (this.annotation.render.resizing == null) {
      holder.style.width = parentRect.width + "px";
      holder.style.height = parentRect.height + "px";
      holder.style.left = "0px";
      holder.style.top = "0px";
      holder.style.removeProperty("right");
      holder.style.removeProperty("bottom");
    }
    return holder;
  }
}

modules["editor/render/annotation/draw"] = class extends modules["editor/render/annotation"] {
  CAN_ERASE = true;
  RESIZE_PRESERVE_ASPECT = true;
  CAN_BE_SNAPPED_TO = false;

  ACTION_BAR_TOOLS = ["color", "thickness", "opacity", "unlock", "delete"];
  
  render = () => {
    let halfT = this.properties.t / 2;
    let width = this.properties.s[0] + this.properties.t;
    let height = this.properties.s[1] + this.properties.t;
    let drawSetPoints = "";
    if (this.properties.d.length == 2) {
      drawSetPoints = (this.properties.t / 2) + "," + (this.properties.t / 2) + " " + ((this.properties.t / 2) + .1) + "," + ((this.properties.t / 2) + .1);
    } else {
      let scaleW = 1;
      let scaleH = 1;
      if (this.properties.sync != null) {
        // Allows for greater precision when zoomed in:
        let largestX = this.properties.d[0];
        let largestY = this.properties.d[1];
        for (let i = 2; i < this.properties.d.length; i += 2) {
          largestX = Math.max(largestX, this.properties.d[i]);
          largestY = Math.max(largestY, this.properties.d[i + 1]);
        }
        let halfT = 0;
        if (largestX - halfT > 0) {
          scaleW = (width - this.properties.t) / (largestX - halfT);
        } else {
          scaleW = width - this.properties.t;
        }
        if (largestY - halfT > 0) {
          scaleH = (height - this.properties.t) / (largestY - halfT);
        } else {
          scaleH = height - this.properties.t;
        }
      }
      for (let i = 0; i < this.properties.d.length; i += 2) {
        drawSetPoints += (halfT + (this.properties.d[i]) * scaleW) + "," + (halfT + (this.properties.d[i + 1] * scaleH)) + " ";
      }
    }
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" style="width: ${width}px; height: ${height}px" new>
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
          <polyline stroke-width="${parseFloat(this.properties.t)}" points="${drawSetPoints}" stroke="${"#" + cleanString(this.properties.c)}" opacity="${parseFloat(this.properties.o) / 100}"/>
        </svg>
      </div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
      let line = this.element.querySelector("polyline");
      line.setAttribute("fill", "none");
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("stroke-linejoin", "round");
    } else {
      this.element.style.width = width + "px";
      this.element.style.height = height + "px";
      let svg = this.element.querySelector("svg");
      let path = svg.querySelector("polyline");
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      path.setAttribute("stroke-width", this.properties.t);
      path.setAttribute("points", drawSetPoints);
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
modules["editor/render/annotation/markup"] = class extends modules["editor/render/annotation"] {
  CAN_ERASE = true;
  RESIZE_PRESERVE_ASPECT = true;
  CAN_BE_SNAPPED_TO = false;

  ACTION_BAR_TOOLS = ["color", "thickness", "opacity", "unlock", "delete"];

  render = () => {
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" new>
        <svg xmlns="http://www.w3.org/2000/svg">
          <polyline/>
        </svg>
      </div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
      let line = this.element.querySelector("polyline");
      line.setAttribute("fill", "none");
    }
    let halfT = this.properties.t / 2;
    let width = this.properties.s[0] + this.properties.t;
    let height = this.properties.s[1] + this.properties.t;
    this.element.style.width = width + "px";
    this.element.style.height = height + "px";
    let svg = this.element.querySelector("svg");
    let path = svg.querySelector("polyline");
    let drawSetPoints = "";
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    if (this.properties.d.length == 2) {
      drawSetPoints = (width / 2) + "," + (height / 2) + " " + ((width / 2) + .1) + "," + ((height / 2) + .1);
      path.setAttribute("stroke-width", width);
    } else {
      let scaleW = 1;
      let scaleH = 1;
      if (this.properties.sync != null) {
        // Allows for greater precision when zoomed in:
        let largestX = this.properties.d[0];
        let largestY = this.properties.d[1];
        for (let i = 2; i < this.properties.d.length; i += 2) {
          largestX = Math.max(largestX, this.properties.d[i]);
          largestY = Math.max(largestY, this.properties.d[i + 1]);
        }
        let halfT = 0;//t / 2;
        if (largestX - halfT > 0) {
          scaleW = (width - this.properties.t) / (largestX - halfT);
        } else {
          scaleW = width - this.properties.t;
        }
        if (largestY - halfT > 0) {
          scaleH = (height - this.properties.t) / (largestY - halfT);
        } else {
          scaleH = height - this.properties.t;
        }
      }
      for (let i = 0; i < this.properties.d.length; i += 2) {
        drawSetPoints += (halfT + (this.properties.d[i] * scaleW)) + "," + (halfT + (this.properties.d[i + 1] * scaleH)) + " ";
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
modules["editor/render/annotation/text"] = class extends modules["editor/render/annotation"] {
  SHOW_ONLY_WIDTH_HANDLES = true;
  AUTO_TEXT_FIT = true;
  AUTO_SET_HEIGHT = true;

  ACTION_BAR_TOOLS = ["textedit", "color", "opacity", "fontsize", "bold", "italic", "underline", "strikethrough", "textalign", "unlock", "delete"];

  css = {
    ".eAnnotation[text] div[text]": `padding: 4px 6px; margin: 3px; color: var(--themeColor); font-weight: 500; pointer-events: all; outline: none`,
    ".eAnnotation[text] div[text][placeborder]": `width: max-content; margin: 0px; border: solid 3px var(--themeColor); border-radius: 8px`
  };
  render = () => {
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" text new>
        <div text edit></div>
      </div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
    }
    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";
    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }
    let text = this.element.querySelector("div[edit]");
    if (this.properties._id != null) {
      text.removeAttribute("placeborder");
    } else {
      text.setAttribute("placeborder", "");
    }
    this.element.style.setProperty("--themeColor", "#" + this.properties.c);
    text.style.opacity = this.properties.o / 100;
    let richText = this.properties.d ?? {};
    text.style.fontSize = Math.floor(Math.max(Math.min(richText.s ?? 18, 250), 1)) + "px";
    if (text.hasAttribute("contenteditable") == false) {
      let setHTML = "";
      for (let i = 0; i < richText.b.length; i++) {
        let addHTML = "";
        if (richText.b[i] != "\n") {
          addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
        } else {
          addHTML = "<br>";
        }
        setHTML += addHTML;
      }
      if (text.innerHTML != setHTML) {
        text.innerHTML = setHTML;
      }
    } else {
      this.element.setAttribute("notransition", "");
    }
    if (richText.bo == true) {
      text.style.fontWeight = 700;
    } else {
      text.style.removeProperty("font-weight");
    }
    if (richText.it == true) {
      text.style.fontStyle = "italic";
    } else {
      text.style.removeProperty("font-style");
    }
    if (richText.st == true && richText.ul == true) {
      text.style.textDecoration = "underline line-through";
    } else if (richText.st == true) {
      text.style.textDecoration = "line-through";
    } else if (richText.ul == true) {
      text.style.textDecoration = "underline";
    } else {
      text.style.removeProperty("text-decoration");
    }
    text.style.textAlign = richText.al ?? "left";
    if (this.properties.textfit == true) {
      text.style.width = "max-content";
      text.style.minWidth = "130px";
    } else {
      text.style.width = "calc(100% - 18px)"
      text.style.removeProperty("min-width");
    }
    text.style.height = "fit-content";
    
    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}
modules["editor/render/annotation/shape"] = class extends modules["editor/render/annotation"] {
  ACTION_BAR_TOOLS = ["color", "thickness", "opacity", "style", "unlock", "delete"];

  render = () => {
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" new>
        <svg xmlns="http://www.w3.org/2000/svg"></svg>
      </div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
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
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);

    let elem;
    let widthT;
    let heightT;
    let i = this.properties.i;
    switch (this.properties.d) {
      case "square":
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
        break;
      case "ellipse":
        elem = svg.querySelector("ellipse");
        if (elem == null) {
          svg.innerHTML = "<ellipse/>";
          elem = svg.querySelector("ellipse");
        }
        elem.setAttribute("cx", width / 2);
        elem.setAttribute("cy", height / 2);
        elem.setAttribute("rx", Math.max(Math.abs(width - t) / 2, 5));
        elem.setAttribute("ry", Math.max(Math.abs(height - t) / 2, 5));
        break;
      case "triangle":
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", ((widthT / 2) + halfT) + "," + halfT + " " + halfT + "," + (heightT + halfT) + " " + (widthT + halfT) + "," + (heightT + halfT));
        break;
      case "parallelogram":
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", (halfT + (widthT * .2)) + "," + halfT + " " + (widthT + halfT) + "," + halfT + " " + (widthT + halfT - (widthT * .2)) + "," + (heightT + halfT) + " " + halfT + "," + (heightT + halfT));
        break;
      case "trapezoid":
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", (halfT + (widthT * .2)) + "," + halfT + " " + (widthT + halfT - (widthT * .2)) + "," + halfT + " " + (widthT + halfT) + "," + (heightT + halfT) + " " + halfT + "," + (heightT + halfT));
        break;
      case "rhombus":
        elem = svg.querySelector("polygon");
        if (elem == null) {
          svg.innerHTML = "<polygon/>";
          elem = svg.querySelector("polygon");
          elem.setAttribute("stroke-linejoin", "round");
        }
        widthT = width - t;
        heightT = height - t;
        elem.setAttribute("points", (halfT + (widthT * .5)) + "," + halfT + " " + (widthT + halfT) + "," + (halfT + (heightT * .5)) + " " + (halfT + (widthT * .5)) + "," + (heightT + halfT) + " " + halfT + "," + (halfT + (heightT * .5)));
        break;
      case "line":
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
    if (this.properties.b == "none") {
      i = true;
    }
    if (i != true) {
      elem.setAttribute("fill", "none");
      elem.setAttribute("stroke", "#" + this.properties.c);
    } else {
      elem.setAttribute("fill", "#" + this.properties.c);
      elem.setAttribute("stroke", "#" + this.parent.utils.darkenHex(this.properties.c, 20));
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
modules["editor/render/annotation/sticky"] = class extends modules["editor/render/annotation"] {
  ALLOW_SELECT_OVERFLOW = true;

  ACTION_BAR_TOOLS = ["textedit", "color", "fontsize", "bold", "italic", "underline", "strikethrough", "textalign", "unlock", "reactions", "delete"];

  SELECTION_FUNCTION = (selection) => {
    if (["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      selection.resizePreserveAspect = true;
    }
  }
  
  css = {
    ".eAnnotation[sticky]": `display: flex; flex-direction: column; background: var(--themeColor); border-radius: 12px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2); pointer-events: all; overflow: auto; text-align: left`,
    //".eAnnotation[sticky]::-webkit-scrollbar": `display: none`, ; scrollbar-width: none
    ".eAnnotation[sticky] div[holder]": `display: flex; flex-direction: column; width: calc(100% - 20px); flex: 1; padding: 16px 10px 10px 10px`,
    ".eAnnotation[sticky] div[edit]": `width: 100%; flex: 1; font-weight: 400; line-height: 22px; pointer-events: all; outline: none`,
    ".eAnnotation[sticky] div[footer]": `display: flex; flex-wrap: wrap; flex-direction: row-reverse; width: 100%; margin-top: 8px; gap: 8px; align-items: flex-end`,
    ".eContent[anonymous] .eAnnotation[sticky] div[signature]": `filter: blur(4px); pointer-events: none`,
    ".eAnnotation[sticky] div[signature]": `margin-left: auto; opacity: .5; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; taxt-align: right`,
    ".eAnnotation[sticky] div[reactions]": `display: flex; flex-wrap: wrap; flex: 1; gap: 6px; background: var(--themeColor); pointer-events: all; z-index: 999; background: none`,
    ".eAnnotation[sticky]:hover .eReaction[add]": `opacity: 1`,
    ".eAnnotation[sticky][selected] .eReaction[add]": `opacity: 1`,
    ".eAnnotation[sticky][selected] button": `pointer-events: all`
  };
  render = () => {
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" sticky new>
        <div holder>
          <div edit></div>
          <div footer>
            <div signature></div>
            <div reactions><button class="eReaction" add dropdowntitle="Reactions" noscrollclose><div imgholder><img src="../images/editor/actions/reaction.svg"></div></button></div>
          </div>
        </div>
      </div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
    }
    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";
    this.element.style.setProperty("--themeColor", "#" + this.properties.c);
    let text = this.element.querySelector("div[edit]");
    if (this.properties._id != null) {
      text.removeAttribute("placeborder");
      this.element.style.opacity = 1;
    } else {
      text.setAttribute("placeborder", "");
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }
    this.element.style.color = this.parent.utils.textColorBackground(this.properties.c);
    let richText = this.properties.d ?? {};
    this.element.style.textAlign = richText.al ?? "left";
    text.style.opacity = this.properties.o / 100;
    let fontSize = Math.floor(Math.max(Math.min(richText.s ?? 16, 250), 1));
    text.style.fontSize = fontSize + "px";
    text.style.lineHeight = fontSize + 6 + "px";
    if (text.hasAttribute("contenteditable") == false) {
      if (richText.b != null) {
        let setHTML = "";
        for (let i = 0; i < richText.b.length; i++) {
          let addHTML = "";
          if (richText.b[i] != "\n") {
            addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
          } else {
            addHTML = "<br>";
          }
          setHTML += addHTML;
        }
        if (text.innerHTML != setHTML) {
          text.innerHTML = setHTML;
        }
      }
    } else {
      this.element.setAttribute("notransition", "");
    }
    if (richText.bo == true) {
      text.style.fontWeight = 700;
    } else {
      text.style.removeProperty("font-weight");
    }
    if (richText.it == true) {
      text.style.fontStyle = "italic";
    } else {
      text.style.removeProperty("font-style");
    }
    if (richText.st == true && richText.ul == true) {
      text.style.textDecoration = "underline line-through";
    } else if (richText.st == true) {
      text.style.textDecoration = "line-through";
    } else if (richText.ul == true) {
      text.style.textDecoration = "underline";
    } else {
      text.style.removeProperty("text-decoration");
    }
    let signature = this.element.querySelector("div[signature]");
    if (this.properties.sig != null && this.properties.sig != "" && this.properties.sigHidden != true) {
      signature.textContent = cleanString(this.properties.sig);
      signature.title = signature.textContent;
      signature.removeAttribute("hidden");
    } else {
      signature.setAttribute("hidden", "");
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();

    let reactionHolder = this.element.querySelector("div[reactions]");
    if (this.parent.utils.isLocked(this.properties) == false) {
      reactionHolder.removeAttribute("disabled");
    } else {
      reactionHolder.setAttribute("disabled", "");
    }
    let addReactionButton = reactionHolder.querySelector(".eReaction[add]");
    let reactions = this.parent.reactions[this.properties._id];
    let presentReactions = [];
    if (reactions != null) {
      for (let i = 0; i < reactions.length; i++) {
        let reaction = reactions[i];
        presentReactions.push(reaction.emoji);
        let reactionElem = reactionHolder.querySelector('.eReaction[emoji="' + reaction.emoji + '"');
        if (reactionElem == null) {
          reactionHolder.insertAdjacentHTML("beforeend", `<button class="eReaction" unloaded new><div imgholder><img src="../images/editor/actions/reaction.svg"></div><div count></div></button>`);
          reactionElem = reactionHolder.querySelector(".eReaction[new]");
          reactionHolder.insertBefore(reactionElem, addReactionButton);
          reactionElem.removeAttribute("new");
          reactionElem.setAttribute("emoji", reaction.emoji);
        }
        if (reaction.reacted == true) {
          reactionElem.setAttribute("selected", "");
        } else {
          reactionElem.removeAttribute("selected");
        }
        reactionElem.querySelector("div[count]").textContent = Math.max(reaction.count, 1);
        if (this.loadingEmojiModule != true && reactionElem.hasAttribute("unloaded") == true) {
          this.loadingEmojiModule = true;
          (async () => {
            let emojiModule = await this.parent.newModule("dropdowns/editor/tools/emojis");
            if (emojiModule != null) {
              emojiModule.applyReactions();
            }
            this.loadingEmojiModule = false;
          })();
        }
      }
    }
    let currentReactions = reactionHolder.querySelectorAll(".eReaction[emoji]");
    for (let i = 0; i < currentReactions.length; i++) {
      if (presentReactions.includes(currentReactions[i].getAttribute("emoji")) == false) {
        currentReactions[i].remove();
      }
    }
    if (reactionHolder.childElementCount < 9) {
      addReactionButton.style.display = "flex";
    } else {
      addReactionButton.style.display = "none";
    }
    if (reactionHolder.childElementCount > 1) {
      reactionHolder.style.width = "100%";
      reactionHolder.style.flex = "unset";
    } else {
      reactionHolder.style.width = "unset";
      reactionHolder.style.flex = "1";
    }
  }
}
modules["editor/render/annotation/comment"] = class extends modules["editor/render/annotation"] {
  DISABLE_SNAPPING = true;
  CAN_BE_SNAPPED_TO = false;
  CAN_BE_MULTISELECT = false;
  CAN_DRAG_SELECT = false;
  CAN_BE_CHILD_ANY_PARENT = true;
  ONLY_PARENT_CHANGE_ON_EDIT = true;
  REDRAW_ON_PARENT_UPDATE = true;
  DISPLAY_SELECT_BOX = false;
  KEEP_ON_PARENT_DELETE = true;
  RENDER_CHILDREN_WHEN_SELECTED = true;

  SELECTION_START = async () => {
    if (this.annotation == null) {
      return;
    }
    this.commentModule = await this.parent.newModule("editor/toolbar/comment");
    if (this.commentModule == null) {
      return;
    }
    this.commentModule.editor = this.parent;
    this.commentModule.toolbar = this.parent.toolbar;
    await this.commentModule.openCommentFrame(this.annotation, Object.values(this.commentThreads).sort((a, b) => { return (a.time ?? a.sync) - (b.time ?? b.sync); }));
    this.subscribe("bounds_change", this.commentModule.updateCommentFrame);
    this.subscribe("click_move", this.commentModule.updateCommentFrame);
  }
  SELECTION_END = () => {
    if (this.commentModule == null) {
      return;
    }
    this.commentModule.closeCommentFrame();
    this.commentModule = null;
    this.unsubscribe("bounds_change");
    this.unsubscribe("click_move");
  }
  commentThreads = {};
  handleParentThread = () => {
    let parentAnnotation = this.parent.annotations[this.properties.parent];
    if (parentAnnotation != null) {
      if (parentAnnotation.pointer != null) {
        parentAnnotation = this.annotations[parentAnnotation.pointer];
      }
      if (parentAnnotation.render.f == "comment") { // Use for comment thread
        if (parentAnnotation.component != null) {
          if (this.annotation.pending != null) {
            delete parentAnnotation.component.commentThreads[this.annotation.pending];
          }
          if (this.properties.remove != true) {
            parentAnnotation.component.commentThreads[this.properties._id] = this.properties;
          } else {
            delete parentAnnotation.component.commentThreads[this.properties._id];
          }
          if (parentAnnotation.component.commentModule != null && parentAnnotation.component.commentModule.updateComment != null) {
            parentAnnotation.component.commentModule.updateComment({ ...this.properties, pending: this.annotation.pending });
          }
          if (parentAnnotation.component.replyCount != null) {
            let replyCount = Object.keys(parentAnnotation.component.commentThreads).length;
            if (replyCount > 0) {
              if (replyCount > 1) {
                parentAnnotation.component.replyCount.textContent = replyCount + " Replies";
              } else {
                parentAnnotation.component.replyCount.textContent = "1 Reply";
                parentAnnotation.component.updateCommentSize();
              }
              parentAnnotation.component.replyCount.style.display = "unset";
            } else {
              parentAnnotation.component.replyCount.style.removeProperty("display");
              parentAnnotation.component.updateCommentSize();
            }
          }
        }
        return true;
      }
    }
  }

  css = {
    ".eAnnotation[comment]": `--themeColor: var(--theme); z-index: calc(var(--maxZIndex) + var(--startZIndex) + 1) !important; `,
    ".eAnnotation[comment][selected]": `z-index: calc(var(--maxZIndex) + var(--startZIndex) + 2) !important`,
    ".eAnnotation[comment]:not([selected]):hover": `z-index: calc(var(--maxZIndex) + var(--startZIndex) + 2) !important`,
    ".eAnnotation[comment] > div[commentholder]": `width: 1px; height: 1px; transform: scale(calc(1 / var(--zoom)))`,
    ".eAnnotation[comment] > div[commentholder] > div[comment]": `position: absolute; display: flex; width: 32px; height: 32px; left: 0px; bottom: 0px; background: var(--pageColor); border-radius: 16px 16px 16px 6px; pointer-events: all; transform-origin: bottom left; transition: .2s`,
    ".eAnnotation[comment][selected] > div[commentholder] > div[comment]": `background: var(--themeColor) !important`,
    ".eAnnotation[comment] > div[commentholder] > div[comment]:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: 0px 0px 6px var(--themeColor); opacity: .6; transition: .2s`,
    ".eAnnotation[comment]:not([selected]):hover > div[commentholder] > div[comment]": `width: var(--animateWidth); height: var(--animateHeight); padding: 4px`,
    ".eAnnotation[comment]:not([selected]):hover > div[commentholder] > div[comment]:after": `box-shadow: 0px 0px 10px var(--themeColor)`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[container]": `display: flex; box-sizing: border-box; width: 100%; height: 100%; padding: 4px; border-radius: inherit; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder]": `flex-shrink: 0; width: 24px; height: 24px; background: var(--themeColor); border-radius: 12px; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder] > div[dots]": `display: flex; gap: 2px; width: 100%; height: 100%; justify-content: center; align-items: center`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder] > div[dots] > div": `width: 4px; height: 4px; background: var(--pageColor); border-radius: 2px`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[profileholder] > img": `width: 100%; height: 100%; border-radius: 12px; object-fit: cover`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[content]": `min-width: max-content; height: fit-content; margin-left: 6px; text-align: left`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[memberholder]": `display: flex; max-width: 200px; height: 24px; align-items: center`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[member]": `flex: 1; min-width: 0; max-width: fit-content; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[time]": `margin-left: 6px; color: var(--darkGray); font-size: 12px; font-weight: 500; white-space: nowrap`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[text]": `box-sizing: border-box; width: 100%; max-width: 200px; height: fit-content; font-size: 12px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden`,
    ".eAnnotation[comment] > div[commentholder] > div[comment] div[replycount]": `display: none; width: 100%; max-width: 200px; margin-top: 4px; color: var(--theme); font-size: 12px; font-weight: 600`,
  };
  render = () => {
    if (this.handleParentThread() == true) {
      return;
    }
    
    let newAnnotation = this.element == null;
    if (newAnnotation == true) {
      this.parent.annotationHolder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" comment new style="display: none">
        <div commentholder>
          <div comment>
            <div container>
              <div profileholder>
                <div dots><div></div><div></div><div></div></div>
              </div>
              <div content>
                <div memberholder>
                  <div member></div>
                  <div time></div>
                </div>
                <div text></div>
                <div replycount></div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
      this.element = this.parent.annotationHolder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
    }

    let absolutePos = this.parent.utils.getAbsolutePosition(this.properties, true);
    this.element.style.transform = "translate3d(" + absolutePos.x + "px," + absolutePos.y + "px, 0)";

    let comment = this.element.querySelector("div[commentholder] > div[comment]");
    let content = comment.querySelector("div[content]");
    let richText = this.properties.d ?? {};
    let setHTML = "";
    for (let i = 0; i < (richText.b ?? []).length; i++) {
      let addHTML = "";
      if (richText.b[i] != "\n") {
        addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
      } else {
        addHTML = "<br>";
      }
      setHTML += addHTML;
    }
    content.querySelector("div[text]").innerHTML = setHTML;
    this.replyCount = content.querySelector("div[replycount");

    this.updateCommentSize = () => {
      if (this.annotation.new != true) {
        comment.style.setProperty("--animateWidth", (content.clientWidth + 40) + "px"); //38
        comment.style.setProperty("--animateHeight", (content.clientHeight + 8) + "px");
      }
    }
    this.updateCommentSize();

    let setCollaborator = (collaborator) => {
      if (this.element == null) {
        return;
      }
      this.element.style.setProperty("--themeColor", collaborator.color);
      if (collaborator.image != null) {
        let profileHolder = comment.querySelector("div[profileholder]");
        profileHolder.innerHTML = `<img src="../images/profiles/default.svg" />`;
        profileHolder.querySelector("img").src = collaborator.image;
      }
      comment.querySelector("div[member]").textContent = collaborator.name;
      this.updateCommentSize();
    }
    let modifyID = this.properties.a ?? this.properties.m;
    this.parent.utils.getCollaborator(modifyID, (collaborator) => {
      if (collaborator._id != null) {
        setCollaborator(collaborator);
      }
      this.element.style.removeProperty("display");
    });

    if (newAnnotation == true) {
      this.element.addEventListener("mouseover", () => {
        if (comment == null) {
          return;
        }
        if (comment != null) {
          let setTime = this.properties.time ?? this.properties.sync;
          if (setTime != null) {
            comment.querySelector("div[time]").textContent = timeSince(setTime);
          }
          if (this.annotation.new != true) {
            this.updateCommentSize();
          }
        }
      });

      this.subscribe("collaborator_update_" + modifyID, setCollaborator);
    }
    
    this.setID();
    this.setAnimate();

    if (this.commentModule != null) {
      this.commentModule.annotation = this.annotation;
      this.commentModule.updateCommentFrame();
    }
  }
  remove = () => {
    if (this.properties.remove == true) {
      this.handleParentThread();
    }
    if (this.commentModule != null && this.commentModule.closeCommentFrame != null) {
      this.commentModule.closeCommentFrame();
    }
    let element = this.getElement();
    if (element == null) {
      return;
    }
    element.remove();
    this.parent.pipeline.unsubscribe("annotation_" + this.properties._id);
  }
}
modules["editor/render/annotation/page"] = class extends modules["editor/render/annotation"] {
  CAN_PARENT_CHILDREN = true;
  HOLD_FOR_SELECT = true;
  ALLOW_SELECT_OVERFLOW = true;
  SHOW_DUPLICATE_HANDLES = true;
  MIN_WIDTH = 100;
  MIN_HEIGHT = 100;
  CAN_FLIP = false;
  SELECT_BOX_COVER = true;

  ACTION_BAR_TOOLS = ["uploadpage", "resize", "rotatepage", "settitle", "hidepage", "color", "unlock", "delete"];

  SELECTION_FUNCTION = (selection, render) => {
    if (render.source != null && ["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      selection.resizePreserveAspect = true;
    }
  }

  css = {
    ".eAnnotation[page]": `display: flex; flex-direction: column; background: white; border-radius: 12px; --borderWidth: 4px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2)`,
    ".eAnnotation[page] > div[background]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: .1; border-radius: inherit; z-index: 0; pointer-events: all`,
    ".eAnnotation[page] > div[border]": `position: absolute; box-sizing: border-box; width: 100%; height: 100%; left: 0px; top: 0px; border: solid var(--borderWidth) var(--themeColor); border-radius: inherit; z-index: 4; pointer-events: none`,
    ".eAnnotation[page] > div[label]": `position: absolute; display: none; box-sizing: border-box; padding: 8px 10px; background: var(--themeColor); border-radius: 0px; border-top-left-radius: inherit; border-bottom-right-radius: 12px;  font-weight: 600; font-size: 18px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; outline: none; scrollbar-width: none; z-index: 3; pointer-events: all`,
    ".eAnnotation[page] > div[label]::-webkit-scrollbar": `display: none`,
    ".eAnnotation[page] > div[content]": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; justify-content: center; align-items: center`,
    ".eAnnotation[page][hide] > div[content] .eAnnotationHolder": `z-index: 2 !important`,
    ".eAnnotation[page][selected] > div[label]": `pointer-events: all !important`,
    ".eAnnotation[page] > div[label][contenteditable]": `overflow-x: auto !important; text-overflow: unset !important`,
    ".eAnnotation[page] > div[hide]": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-radius: inherit; z-index: 2; pointer-events: all`,
    ".eAnnotation[page] > div[hide] img[hideicon]": `width: 150px; height: 150px; max-width: calc(100% - 24px); max-height: calc(100% - 24px)`,
    ".eAnnotation[page] > div[hide] div[hidemodal]": `display: flex; flex-direction: column; max-width: calc(100% - 64px); max-height: calc(100% - 64px); padding: 24px; overflow: auto; background: var(--pageColor); box-shadow: 0px 0px 16px 0px var(--hover); border-radius: 16px; align-items: center`,
    ".eAnnotation[page] > div[hide] div[hidemodal] img": `margin-bottom: 12px; width: calc(100% - 24px); max-width: 80px`,
    ".eAnnotation[page] > div[hide] div[hidemodal] div[hidemodaltitle]": `font-size: 28px; font-weight: 700; color: var(--theme)`,
    ".eAnnotation[page] > div[hide] div[hidemodal] button": `display: flex; margin-top: 24px; z-index: 1; background: var(--theme); --borderColor: var(--secondary); --borderRadius: 14px; color: #fff`,
    ".eAnnotation[page] > div[content] div[document]": `position: relative; --scale-factor: 2; --user-unit: 1; --total-scale-factor: calc(var(--scale-factor) * var(--user-unit)); border-radius: inherit; overflow: hidden; z-index: 1`,
    ".eAnnotation[page] > div[content] div[document] canvas": `position: absolute; width: calc(100% - 8px) !important; height: calc(100% - 8px) !important; left: var(--borderWidth); top: var(--borderWidth); background: var(--themeColor); z-index: 1`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer]": `position: absolute; width: var(--fullWidth) !important; height: var(--fullHeight) !important; left: var(--borderWidth); top: var(--borderWidth); transform-origin: top left; transform: var(--fullScale); font-family: sans-serif; z-index: 3`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer] > *": `position: absolute; color: transparent; pointer-events: all; transform-origin: top left`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer] > * a": `position: absolute; width: 100%; height: 100%; padding: 4px; left: -4px; top: -4px; border-radius: 6px; transition: .2s; transform: unset !important`,
    ".eAnnotation[page] > div[content] div[document] div[annotationlayer] > * a:hover": `background: rgba(var(--themeRGB), .2)`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer]": `position: absolute; width: var(--fullWidth) !important; height: var(--fullHeight) !important; left: var(--borderWidth); top: var(--borderWidth); transform-origin: top left; transform: var(--fullScale); font-family: sans-serif; z-index: 2`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer] span": `color: transparent; position: absolute; white-space: pre; transform-origin: 0% 0%; pointer-events: all`,
    ".eAnnotation[page] > div[content] div[document] div[textlayer] br": `color: transparent; position: absolute; white-space: pre; transform-origin: 0% 0%; pointer-events: all; user-select: none`,
    ".hiddenCanvasElement": `display: none`,
  };
  render = () => {
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" page new>
        <div background></div>
        <div border></div>
        <div label selectable></div>
        <div content annoholdercontainer></div>
      </div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
    }
    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";
    this.element.style.setProperty("--themeColor", "#" + this.properties.c);
    this.element.style.color = this.parent.utils.textColorBackground(this.properties.c);
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
    if (this.properties.source != null && this.properties.number != null) {
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
        pdfDocumentHolder.setAttribute("rotation", this.properties.rotation);
        if (this.exporting != true) {
          pdfDocumentHolder.style.opacity = 0;
          pdfDocumentHolder.style.transition = "opacity .3s";
        }
        this.parent.render.addPageToQueue(this.properties.source, this.properties.number);
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
        if (this.parent.self.access < 4) {
          hiddenElem.insertAdjacentHTML("beforeend", `<img hideicon src="../images/editor/hidden.svg" draggable="false">`);
        } else {
          if (this.exporting != true) {
            hiddenElem.insertAdjacentHTML("beforeend", `<div hidemodal>
              <img src="../images/editor/hidden.svg" draggable="false">
              <div hidemodaltitle>Page Hidden</div>
            </div>`);
            if (this.parent.self.access > 3) {
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
modules["editor/render/annotation/media"] = class extends modules["editor/render/annotation"] {
  ACTION_BAR_TOOLS = ["imageborder", "unlock", "delete"];

  SELECTION_FUNCTION = (selection) => {
    if (["bottomright", "topleft", "topright", "bottomleft"].includes(selection.handle) == true) {
      selection.resizePreserveAspect = true;
    }
  }

  css = {
    ".eAnnotation[media]": `border-radius: 12px`,
    ".eAnnotation[media] > img": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; pointer-events: all; border-radius: inherit; transition: all .1s, border-radius 0s`,
    ".eAnnotation[media][border]:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: all; border-radius: inherit; background: var(--backgroundColor); box-shadow: inset 0px 0px 2px 0px var(--secondaryBackgroundColor)`,
    ".eAnnotation[media][border] > img": `width: calc(100% - 16px); height: calc(100% - 16px); left: 8px; top: 8px; border-radius: 4px`
  };
  render = () => {
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" media new><img draggable="false" /></div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
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

    if (this.parent.exporting != true) {
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
      this.parent.exportPromises.push(new Promise(async (resolve) => {
        image.addEventListener("load", resolve);
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
modules["editor/render/annotation/embed"] = class extends modules["editor/render/annotation"] {
  ACTION_BAR_TOOLS = ["openlink", "enlarge", "setembed", "unlock", "delete"];

  css = {
    ".eAnnotation[embed]": `display: flex; background: var(--pageColor); border-radius: 16px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2); pointer-events: all; text-align: left`,
    ".eAnnotation[embed] div[holder]": `display: flex; flex-direction: column; width: calc(100% - 16px); flex: 1; padding: 8px`,
    ".eAnnotation[embed] div[content]": `position: relative; width: 100%; flex: 1; overflow: hidden; border-radius: 8px; background: radial-gradient(var(--theme), var(--secondary)); pointer-events: all !important;`,
    ".eAnnotation[embed] div[content] img[thumbnail]": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; background: #fff`,
    ".eAnnotation[embed] div[content] iframe": `position: absolute; left: 0px; top: 0px; transform-origin: top left; background: var(--pageColor); border: none`,
    ".eAnnotation[embed]:not([notransition]) div[content]": `pointer-events: all`,
    ".eAnnotation[embed] div[content] div[activate]": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: radial-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .2)); backdrop-filter: blur(4px); transition: .3s`,
    ".eAnnotation[embed] div[content] div[activate] button": `width: 80px; height: 80px; max-width: 80%; max-height: 80%`,
    ".eAnnotation[embed] div[content] div[activate] button img": `width: 100%; height: 100%`,
    ".eAnnotation[embed] div[details]": `margin-top: 8px`,
    ".eAnnotation[embed] div[details] div[input]": `display: none; align-items: center; pointer-events: all`,
    ".eAnnotation[embed] div[details] div[input][visible]": `display: flex !important`,
    ".eAnnotation[embed] div[details] div[input] input": `box-sizing: border-box; width: 100%; height: 36px; border: solid 3px var(--hover); outline: unset; border-radius: 18px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 600; font-family: var(--font); font-size: 16px`, //margin-right: 6px;
    ".eAnnotation[embed] div[details] div[input] input::placeholder": `color: var(--hover)`,
    ".eAnnotation[embed] div[details] div[info]": `display: flex; flex-direction: column; color: var(--textColor)`,
    ".eAnnotation[embed] div[details] div[info] div[title]": `display: none; width: 100%; font-size: 18px; font-weight: 700; text-wrap: nowrap; text-overflow: ellipsis; overflow: hidden; color: var(--textColor)`,
    ".eAnnotation[embed] div[details] div[info] div[description]": `display: none; width: 100%; margin: 4px 0 2px 0; font-size: 14px; font-weight: 500; color: var(--darkGray); text-wrap: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eAnnotation[embed] div[details] div[info] a[link]": `display: flex; width: fit-content; max-width: 100%; align-items: center; font-size: 16px; font-weight: 600; text-decoration: underline; color: var(--theme); text-wrap: nowrap; overflow: hidden; pointer-events: all`,
    ".eAnnotation[embed] div[details] div[info] a[link] img": `width: 32px; height: 32px; margin-right: 2px`
  };
  render = () => {
    if (this.element == null) {
      this.holder.insertAdjacentHTML("beforeend", `<div class="eAnnotation" embed new>
        <div holder>
          <div content>
            <img thumbnail>
            <div activate><button><img></button></div>
          </div>
          <div details>
            <div input>
              <input placeholder="https://markifyapp.com" nodelete></input>
            </div>
            <div info>
              <div title></div>
              <div description></div>
              <a link target="_blank"><img src="../images/editor/actions/link.svg"><div></div></a>
            </div>
          </div>
        </div>
      </div>`);
      this.element = this.holder.querySelector(".eAnnotation[new]");
      this.element.removeAttribute("new");
    }
    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";
    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }

    let embedHolder = this.element.querySelector("div[content]");
    let thumbnail = embedHolder.querySelector("img[thumbnail]");
    let embedActivate = this.element.querySelector("div[activate]");
    let embedFrame = this.element.querySelector("iframe");
    let embedDetails = this.element.querySelector("div[details]");
    let linkInputHolder = embedDetails.querySelector("div[input]");
    let linkInput = linkInputHolder.querySelector("input");
    let infoHolder = embedDetails.querySelector("div[info]");
    let embedTitle = infoHolder.querySelector("div[title]");
    let embedDesc = infoHolder.querySelector("div[description]");
    let embedLink = infoHolder.querySelector("a[link]");
    if (this.properties.d != null && this.properties.embed != null) {
      linkInputHolder.removeAttribute("visible");
      if (this.exporting != true) {
        if (this.properties.embed.url != null) {
          if (embedFrame == null) {
            embedActivate.querySelector("img").src = "../images/editor/actions/play.svg";
            embedActivate.style.display = "flex";
          }
        } else {
          embedActivate.style.display = "none";
        }
      }
      if (this.properties.embed.image != null) {
        if (embedFrame == null) {
          if (this.exporting != true) {
            thumbnail.src = this.properties.embed.image;
          } else {
            this.parent.exportPromises.push(new Promise(async (resolve) => {
              thumbnail.addEventListener("load", resolve);
              thumbnail.src = this.properties.embed.image;
            }));
          }
          thumbnail.style.display = "unset";
        }
      } else {
        thumbnail.style.removeProperty("display");
        thumbnail.removeAttribute("src");
      }
      if (this.properties.embed.color != null) {
        embedHolder.style.background = cleanString(this.properties.embed.color);
      } else {
        embedHolder.style.removeProperty("background");
      }
      if (this.properties.embed.title != null || this.properties.embed.site != null) {
        embedTitle.textContent = cleanString(this.properties.embed.title ?? this.properties.embed.site);
        embedTitle.title = embedTitle.textContent;
        embedTitle.style.display = "unset";
      } else {
        embedTitle.style.removeProperty("display");
      }
      if (this.properties.embed.description != null) {
        embedDesc.textContent = cleanString(this.properties.embed.description);
        embedDesc.title = embedDesc.textContent;
        embedDesc.style.display = "unset";
      } else {
        embedDesc.style.removeProperty("display");
      }
      infoHolder.style.removeProperty("display");
    } else {
      linkInputHolder.setAttribute("visible", "");
      embedActivate.style.removeProperty("display");
      thumbnail.style.removeProperty("display");
      infoHolder.style.display = "none";
    }
    if (document.activeElement != linkInput) {
      linkInput.value = this.properties.d ?? "";
    }
    if (this.properties.d != null) {
      embedLink.querySelector("div").textContent = (new URL(this.properties.d)).hostname;
      embedLink.title = this.properties.d;
      embedLink.href = this.properties.d;
    }

    if (embedFrame != null) {
      let frameWidth = this.properties.s[0] - 16;
      let defaultMaxWidth = 800;
      if (frameWidth < 300) {
        defaultMaxWidth = 300;
      }
      let embedWidth = Math.max(frameWidth, defaultMaxWidth);
      let scale = frameWidth / embedWidth;
      embedFrame.style.width = embedWidth + "px";
      embedFrame.style.height = ((this.properties.s[1] - 24 - embedDetails.offsetHeight) * (1 / scale)) + "px";
      embedFrame.style.transform = "scale(" + scale + ")";

      if (embedFrame.getAttribute("currenturl") != (this.properties.embed ?? {}).url) {
        embedFrame.remove();
        embedActivate.style.opacity = 1;
      }
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}