// UTILITY : Core functions for managing editor state:

import { rotatePointOrigin } from "./math/rotate-point-origin";
import { rotatePoint } from "./math/rotate-point";

export class Utility {
  constructor(editor) {
    this.editor = editor;
  }

  getParents(anno, includeSelecting) {
    let parents = [];
    let parentIDs = [];
    let currentAnnoCheck = anno ?? {};
    while (currentAnnoCheck.parent != null) {
      let annoid = currentAnnoCheck.parent;
      if (annoid == null || parents.includes(parentIDs) == true) {
        break;
      }
      let annotation = this.editor.annotations[annoid];
      if (annotation == null) {
        break;
      }
      if (annotation.pointer != null) {
        annoid = annotation.pointer;
        annotation = this.editor.annotations[annoid];
      }
      if (annotation == null) {
        break;
      }
      if (includeSelecting != true) {
        currentAnnoCheck = annotation.render ?? {};
      } else {
        currentAnnoCheck = { ...(annotation.render ?? {}), ...(this.editor.selecting[annotation.render._id] ?? {}) };
      }
      parents.push(currentAnnoCheck);
      parentIDs.push(annoid);
    }
    return parents;
  }
  getParentIDs(anno) {
    return this.getParents(anno).map((value) => { return value._id; });
  }
  getThickness(anno) {
    let thickness = 0;
    if (anno.t != null) {
      if (anno.b != "none" || anno.d == "line") {
        thickness = anno.t;
      }
    }
    return thickness;
  }

  getAbsolutePosition(anno) {
    let [sizeWidth, sizeHeight] = [(anno.s ?? [])[0] ?? 1, (anno.s ?? [])[1] ?? 1];
    let thickness = this.getThickness(anno);
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
    let parents = this.getParents(anno, includeSelecting);
    for (let i = 0; i < parents.length; i++) {
      let render = parents[i];
      /*if (render.resizing != null) {
        render = (this.editor.annotations[render._id] ?? {}).render ?? render;
      }*/
      if (this.editor.selecting[render._id] != null) {
        selectingParent = true;
      }
      let rotate = render.r ?? 0;
      let [renderSizeWidth, renderSizeHeight] = [(render.s ?? [])[0] ?? 1, (render.s ?? [])[1] ?? 1];
      let renderThickness = this.getThickness(render);
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
        let [annoX, annoY] = rotatePointOrigin(renderX, renderY, centerX, centerY, rotate);
        let [changeX, changeY] = rotatePoint(render.resizing[3] - annoX, render.resizing[4] - annoY, -rotate);
        renderX += changeX;
        renderY += changeY;
      }

      [topLeftX, topLeftY] = rotatePointOrigin(
        topLeftX + renderX,
        topLeftY + renderY,
        centerX,
        centerY,
        rotate
      );
      [bottomRightX, bottomRightY] = rotatePointOrigin(
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
  getRelativePosition(anno, includeSelecting) {
    let position = this.getAbsolutePosition({ ...anno, parent: anno.prevParent });

    let topLeftX = position.x;
    let topLeftY = position.y;
    let bottomRightX = position.endX;
    let bottomRightY = position.endY;

    let returnRotation = 0;

    let parents = this.getParents(anno, includeSelecting);
    for (let i = parents.length - 1; i > -1; i--) {
      let render = parents[i];
      let rotate = -(render.r ?? 0);
      let [renderSizeWidth, renderSizeHeight] = [(render.s ?? [])[0] ?? 1, (render.s ?? [])[1] ?? 1];
      let renderThickness = this.getThickness(render);
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
        let [annoX, annoY] = rotatePointOrigin(renderX, renderY, centerX, centerY, rotate);
        let [changeX, changeY] = rotatePoint(render.resizing[3] - annoX, render.resizing[4] - annoY, -rotate);
        renderX += changeX;
        renderY += changeY;
      }

      [topLeftX, topLeftY] = rotatePointOrigin(
        topLeftX,
        topLeftY,
        centerX,
        centerY,
        rotate
      );
      topLeftX -= renderX;
      topLeftY -= renderY;
      [bottomRightX, bottomRightY] = rotatePointOrigin(
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
    if (sizeWidth >= 0) {
      x -= width;
    } else {
      x += width;
    }
    if (sizeHeight >= 0) {
      y -= height;
    } else {
      y += height;
    }
    return { x, y, rotation: (((anno.r ?? 0) + returnRotation) + 360) % 360, thickness: position.thickness, parents: parents };
  }
  getRect(anno, includeSelecting) {
    anno = anno ?? {};
    let position = this.getAbsolutePosition(anno, includeSelecting);
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
}