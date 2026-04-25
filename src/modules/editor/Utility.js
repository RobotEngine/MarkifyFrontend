// UTILITY : Core functions for managing editor state:

import {
  account, sleep, sendRequest, getObject
} from "@/crucial";

import {
  round,
  rotatePointOrigin,
  rotatePoint,
  rotatedBounds,
  pointInRotatedBounds
} from "./math";

import { smoothScrollTo } from "./utils/smooth-scroll-to";

export class Utility {
  constructor(editor) {
    this.editor = editor;
  }

  mousePosition(mouse) {
    return [
      mouse.x ?? mouse.clientX ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientX ?? 0,
      mouse.y ?? mouse.clientY ?? ((mouse.changedTouches ?? [])[0] ?? {}).clientY ?? 0
    ];
  }
  localMousePosition(mouse) {
    let [mouseX, mouseY] = this.mousePosition(mouse);
    return {
      mouseX: (mouseX - this.editor.pageRect.x) * this.editor.pageRect.scale,
      mouseY: (mouseY - this.editor.pageRect.y) * this.editor.pageRect.scale
    };
  }
  convertBoundingRect(frameRect) {
    let transform = this.editor.pageRect.scale;
    /*if (this.editor.pageFrame.hasAttribute("scale") == true) {
      transform = 1 / parseFloat(this.editor.pageFrame.getAttribute("scale"));
    }*/
    let diffX = (frameRect.x - this.editor.pageRect.x) * transform;
    let diffY = (frameRect.y - this.editor.pageRect.y) * transform;
    return {
      width: frameRect.width,
      height: frameRect.height,
      left: diffX,
      top: diffY,
      x: diffX + contentHolder.scrollLeft,
      y: diffY + contentHolder.scrollTop
    }
  }
  localBoundingRect(frame) {
    return this.convertBoundingRect(frame.getBoundingClientRect());
  }
  annotationsRect() {
    let x = this.editor.render.marginLeft + this.editor.scrollOffset;
    let y = this.editor.render.marginTop + this.editor.scrollOffset;
    return {
      x,
      y,
      left: x - this.editor.contentHolder.scrollLeft,
      top: y - this.editor.contentHolder.scrollTop,
      width: this.editor.render.marginLeft + this.editor.render.marginRight,
      height: this.editor.render.marginTop + this.editor.render.marginBottom
    };
  }
  scaleToDoc(x, y, noOrigin) {
    let pageRect = this.annotationsRect();
    if (noOrigin != true) {
      x -= pageRect.left;
      y -= pageRect.top;
    }
    let scaleZoom = 1 / this.editor.zoom;
    return {
      x: round(x * scaleZoom),
      y: round(y * scaleZoom)
    }
  }
  scaleToZoom(x, y) {
    let pageRect = this.annotationsRect();
    return {
      x: (x * this.editor.zoom) + pageRect.left,
      y: (y * this.editor.zoom) + pageRect.top
    };
  }
  regionInChunks(topx, topy, bottomx, bottomy) {
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
    let topLeftChunkX = Math.floor(topx / this.editor.chunkWidth) * this.editor.chunkWidth;
    let topLeftChunkY = Math.floor(topy / this.editor.chunkHeight) * this.editor.chunkHeight;
    let bottomRightChunkX = Math.floor(bottomx / this.editor.chunkWidth) * this.editor.chunkWidth;
    let bottomRightChunkY = Math.floor(bottomy / this.editor.chunkHeight) * this.editor.chunkHeight;
    let xCord = topLeftChunkX;
    let yCord = topLeftChunkY;
    let chunks = [];
    while (yCord <= bottomRightChunkY) {
      while (xCord <= bottomRightChunkX) {
        chunks.push(xCord + "_" + yCord);
        xCord += this.editor.chunkWidth;
      }
      xCord = topLeftChunkX;
      yCord += this.editor.chunkHeight;
    }
    return chunks;
  }
  pointInChunk(x, y) {
    return this.regionInChunks(x, y, x, y)[0];
  }
  annotationsInChunks(chunks) {
    let annotationKeys = {};
    let annotations = [];
    for (let i = 0; i < chunks.length; i++) {
      let keys = Object.keys(this.editor.chunkAnnotations[chunks[i]] ?? {});
      for (let a = 0; a < keys.length; a++) {
        let key = keys[a];
        if (annotationKeys[key] == null) {
          annotationKeys[key] = true;
          let anno = this.editor.annotations[key] ?? {};
          if (anno.pointer != null) {
            anno = this.editor.annotations[anno.pointer] ?? { render: {} };
          }
          annotations.push(anno);
        }
      }
    }
    return annotations;
  }
  renderedAnnotations() {
    return this.annotationsInChunks(this.editor.visibleChunks);
  }

  getLocked(render) { // s: standard, c: collaborator, p: placeholder
    render = render ?? {};
    if (typeof render.lock != "boolean") {
      return render.lock ?? [];
    } else if (render.lock == true) {
      return ["s"];
    } else {
      return [];
    }
  }
  isLocked(render) {
    let lock = this.getLocked(render);
    return lock.includes("s") == true;
  }
  isPlaceholderLocked(render, member) {
    member = member ?? this.editor.self;
    if (member.access > 3) {
      return false;
    }
    let lock = this.getLocked(render);
    return lock.includes("p") == true;
  }
  canMemberModify(render, member) {
    render = render ?? {};
    member = member ?? this.editor.self ?? {};
    if (member.access < this.editor.minimumEditingAccess || member.modify == null) {
      return false;
    }
    if (member._id == this.editor.self._id && this.editor.viewer == true) {
      return false;
    }
    if (member.access > 3) {
      return true;
    }
    if (this.editor.settings.editOthersWork == true) {
      return true;
    }
    let locked = this.getLocked(render);
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
  canChangeLock(render, member) {
    render = render ?? {};
    let locks = this.getLocked(render);
    member = member ?? this.editor.self;
    if (member.access < this.editor.minimumEditingAccess || member.modify == null) {
      return [];
    }
    if (member.access > 3) {
      return ["s", "c", "p"];
    }
    let allowedLock = [];
    if (this.canMemberModify(render, member) == true && locks.includes("p") == false) {
      allowedLock.push("s");
    }
    if ([render.a].includes(member.modify) == true || (render.placeholder == true && locks.includes("s") == false)) { // Only author can edit collaborator:
      allowedLock.push("c");
    }
    return allowedLock;
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
  async parentFromAnnotation(anno, includeSelecting) {
    let id = anno._id;
    let prevParent = anno.prevParent;
    if (prevParent != null) {
      let parentAnno = this.editor.annotations[prevParent];
      if (parentAnno != null && parentAnno.pointer != null) {
        prevParent = parentAnno.pointer;
      }
    }
    let { centerX: x, centerY: y } = this.getRect(anno, includeSelecting);
    let selfRenderModule = (await this.editor.render.getModule(null, (anno || {}).f)) ?? {};
    let chunk = this.pointInChunk(x, y);
    let annotationIDs = Object.keys(this.editor.chunkAnnotations[chunk] ?? {});
    let viableParents = [];
    if (includeSelecting == true) { // Must check for if new annotations are valid!
      let selectKeys = Object.keys(this.editor.selecting);
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
      let annotation = this.editor.annotations[annoid] ?? {};
      if (annotation.pointer != null) {
        annoid = annotation.pointer;
        annotation = this.editor.annotations[annoid] ?? {};
      }
      let type = (annotation.render ?? {}).f;
      if (type == null || checkedTypes[type] != null) {
        continue;
      }
      checkedTypes[type] = true;
      let renderModule = await this.editor.render.getModule(annotation, type);
      if (
        renderModule != null && (
          renderModule.CAN_PARENT_CHILDREN == true
          || selfRenderModule.CAN_BE_CHILD_ANY_PARENT == true
        ) && renderModule.CAN_BE_CHILD_ANY_PARENT != true
      ) {
        types[type] = true;
      }
    }
    for (let i = 0; i < annotationIDs.length; i++) {
      let annoid = annotationIDs[i];
      if (annoid == null || annoid == id) {
        continue;
      }
      let annotation = this.editor.annotations[annoid] ?? {};
      if (annotation.pointer != null) {
        annoid = annotation.pointer;
        annotation = this.editor.annotations[annoid] ?? {};
      }
      let render = annotation.render ?? {}; // { ...(annotation.render ?? {}), ...(this.editor.selecting[annoid] ?? {}) };
      if (includeSelecting == true) {
        render = { ...render, ...(this.editor.selecting[annoid] ?? {}) };
      }
      if (types[render.f] == null) {
        continue;
      }
      if ((render.hidden == true || this.isLocked(render) == true) && prevParent != annoid) {
        continue;
      }
      if (render.remove == true) {
        continue;
      }
      if (render.p == null || render.s == null) {
        continue;
      }
      let rect = this.getRect(render, includeSelecting) ?? {};
      if (pointInRotatedBounds(x, y, rect.x, rect.y, rect.endX, rect.endY, rect.rotation) == true) {
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
  async parentFromPoint(x, y, index) {
    return await this.parentFromAnnotation({ p: [x, y], l: index });
  }

  updateCurrentPage(force) {
    let activeElement = document.activeElement;
    if (activeElement != null) {
      let currentPageBox = activeElement.closest(".eCurrentPage");
      if (currentPageBox != null && this.editor.isThisPage(currentPageBox) == true) { //== pageTextBox
        return;
      }
    }
    let annotationsRect = this.annotationsRect();
    let centerPointX = ((page.offsetWidth / 2) - annotationsRect.left) / this.editor.zoom;
    let centerPointY = ((page.offsetHeight / 2) - annotationsRect.top) / this.editor.zoom;
    let minPage = 0;
    let minPageId;
    let minDistance;
    for (let i = 0; i < this.editor.annotationPages.length; i++) {
      let page = this.editor.annotationPages[i];
      let distance = Math.pow(page[1][0] - centerPointX, 2) + Math.pow(page[1][1] - centerPointY, 2);
      if (distance < minDistance || minDistance == null) {
        minDistance = distance;
        minPage = i + 1;
        minPageId = page[0];
      }
    }
    if (this.editor.currentPage != minPage || force == true) {
      this.editor.currentPage = minPage;
      this.editor.pipeline.publish("page_change", { page: minPage, pageId: minPageId });
    }
  }

  chunksFromAnnotation(render, includeSelecting) {
    if (render.p == null) {
      return [];
    }
    let { x, y, endX, endY, rotation } = this.getRect(render, includeSelecting);
    let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(x, y, endX, endY, rotation);
    return this.regionInChunks(topLeftX, topLeftY, bottomRightX, bottomRightY);
  }
  async setAnnotationChunks(annotation, includeSelecting) {
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
      let { x, y, endX, endY, rotation } = this.getRect(render, includeSelecting);
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(x, y, endX, endY, rotation);
      
      chunks = this.regionInChunks(topLeftX, topLeftY, bottomRightX, bottomRightY);

      for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        if (this.editor.chunkAnnotations[chunk] == null) {
          this.editor.chunkAnnotations[chunk] = {};
          await this.editor.render.setMarginSize();
        }
        this.editor.chunkAnnotations[chunk][render._id] = "";
        if (annotationVisible == false && this.editor.visibleChunks.includes(chunk) == true) {
          annotationVisible = true;
        }
      }
    }
    if (annotation.chunks != null) {
      // Remove existing chunks:
      for (let i = 0; i < annotation.chunks.length; i++) {
        let chunk = annotation.chunks[i];
        if (chunks.includes(chunk) == false && this.editor.defaultChunks[chunk] == null) {
          delete this.editor.chunkAnnotations[chunk][render._id];
          if (Object.keys(this.editor.chunkAnnotations[chunk]).length < 1) {
            delete this.editor.chunkAnnotations[chunk];
            await this.editor.render.setMarginSize();
          }
        }
      }
    }
    annotation.chunks = chunks;

    if (render.f == "page") { // Update Annotation Pages
      for (let i = 0; i < this.editor.annotationPages.length; i++) {
        let annoid = this.editor.annotationPages[i][0];
        if ((annoid ?? "").startsWith("pending_") == true) {
          let anno = this.editor.annotations[annoid] ?? {};
          if (anno.pointer != null) {
            annoid = anno.pointer;
          }
        }
        if (annoid == render._id) {
          this.editor.annotationPages.splice(i, 1);
          break;
        }
      }
      if (render.remove != true && (render._id ?? "").startsWith("pending_-") == false) {
        if (render.parent == null) {
          let rect = this.getRect(render);
          let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);
          this.editor.annotationPages.push([
            render._id,
            [rect.centerX, rect.centerY],
            [topLeftX, topLeftY, bottomRightX - topLeftX, bottomRightY - topLeftY],
            [render.source, render.number]
          ]);
          this.editor.annotationPages.sort((a, b) => {
            if (b[1][1] > a[2][1] && b[1][1] < a[2][1] + a[2][3]) {
              return a[2][0] - b[2][0];
            }
            return a[2][1] - b[2][1];
          });
        }
      }
      clearTimeout(this.updatePageTimeout);
      this.updatePageTimeout = setTimeout(() => { this.updateCurrentPage(true); }, 100);
    }

    if (render.f == "comment") {
      let rootComment;
      let missingParent = false;
      if (render.parent != null) {
        let parent = (this.editor.annotations[render.parent] ?? {}).render;
        if (parent != null) {
          if (parent.f == "comment") {
            rootComment = parent;
          }
        } else {
          missingParent = true;
        }
      }
      if (missingParent == false) {
        if (rootComment == null) { // IS a root comment:
          if (render.pending != null && (render._id ?? "").startsWith("pending_") == false) {
            delete this.editor.comments[render.pending];
          }
          if (render.remove != true) {
            this.editor.comments[render._id] = { render, replies: {} };
          } else {
            delete this.editor.comments[render._id];
          }
        } else { // Is a reply:
          let rootData = this.editor.comments[rootComment._id];
          if (rootData == null) {
            this.editor.comments[rootComment._id] = { render: rootComment, replies: {} };
            rootData = this.editor.comments[rootComment._id];
          }
          if (render.pending != null && (render._id ?? "").startsWith("pending_") == false) {
            delete rootData.replies[render.pending];
          }
          if (render.remove != true) {
            rootData.replies[render._id] = true;
          } else {
            delete rootData.replies[render._id];
          }
        }
        this.editor.pipeline.publish("comment_update", render);
      }
    }
    
    if (annotationVisible == true) {
      //if (annotation.component == null) {
      await this.editor.render.create(annotation);
      //}
    } else {
      this.editor.render.remove(annotation);
    }
  }
  annotationInViewport(render = {}, rect) {
    let annotationRect = this.annotationsRect();
    let pageTopLeftX = -annotationRect.left / this.editor.zoom;
    let pageTopLeftY = -annotationRect.top / this.editor.zoom;
    let pageBottomRightX = (page.offsetWidth - annotationRect.left) / this.editor.zoom;
    let pageBottomRightY = (page.offsetHeight - annotationRect.top) / this.editor.zoom;
    let existingAnnoRect = rect ?? this.getRect(render);
    let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(existingAnnoRect.x, existingAnnoRect.y, existingAnnoRect.endX, existingAnnoRect.endY, existingAnnoRect.rotation);
    return bottomRightX > pageTopLeftX
    && topLeftX < pageBottomRightX
    && bottomRightY > pageTopLeftY
    && topLeftY < pageBottomRightY;
  }

  async resetSelecting() {
    let selectKeys = Object.keys(this.editor.selecting);
    this.editor.selecting = {};
    for (let i = 0; i < selectKeys.length; i++) {
      let existingAnno = this.editor.annotations[selectKeys[i]];
      if (existingAnno != null) {
        let allowRender = false;
        for (let i = 0; i < existingAnno.chunks.length; i++) {
          if (this.editor.visibleChunks.includes(existingAnno.chunks[i]) == true) {
            allowRender = true;
            break;
          }
        }
        if (allowRender == true) {
          await this.editor.render.create(existingAnno);
        }
      }
    }
  }

  centerWindowWithPage() {
    let annotationRect = this.annotationsRect();
    this.editor.contentHolder.scrollTo(
      this.editor.contentHolder.scrollLeft + annotationRect.left - (this.editor.pageOffsetWidth / 2),
      this.editor.contentHolder.scrollTop + annotationRect.top - this.editor.scrollOffset
    );
  }
  scrollToElement(element) {
    let jumpRect = this.localBoundingRect(element);
    this.editor.contentHolder.scrollTo(
      this.editor.contentHolder.scrollLeft + jumpRect.left - ((this.editor.page.offsetWidth - element.offsetWidth) / 2),
      this.editor.contentHolder.scrollTop + jumpRect.top - ((this.editor.page.offsetHeight - element.offsetHeight) / 2)
    );
  }
  scrollToAnnotation(render, options = {}) {
    this.editor.exitObserve();
    if (render == null) {
      return;
    }
    let annoRect = this.getRect(render);
    let [topLeftX, topLeftY, bottomRightX] = rotatedBounds(annoRect.x, annoRect.y, annoRect.endX, annoRect.endY, annoRect.rotation);
    
    let annotationRect = this.annotationsRect();
    let scrollOptions = {};
    let sideScrollOffset = this.editor.sideScrollOffset ?? this.editor.scrollOffset;
    if (annoRect.width * this.editor.zoom < this.editor.pageOffsetWidth - (sideScrollOffset * 2)) {
      // Position page to center:
      scrollOptions.left = annotationRect.left + contentHolder.scrollLeft - (this.editor.pageOffsetWidth / 2) + (annoRect.centerX * this.editor.zoom);
    } else {
      // Position page to left corner:
      if ((account.settings ?? {}).toolbar != "right") {
        scrollOptions.left = annotationRect.left + contentHolder.scrollLeft - sideScrollOffset + (topLeftX * this.editor.zoom);
      } else {
        scrollOptions.left = annotationRect.left + contentHolder.scrollLeft - 8 + (topLeftX * this.editor.zoom);
        //scrollOptions.left = annotationRect.left + contentHolder.scrollLeft - this.editor.pageOffsetWidth + sideScrollOffset + (bottomRightX * this.editor.zoom);
      }
    }
    if (annoRect.height * this.editor.zoom < this.editor.pageOffsetHeight - (this.editor.scrollOffset * 2)) {
      // Position page to center:
      scrollOptions.top = annotationRect.top + contentHolder.scrollTop - (this.editor.pageOffsetHeight / 2) + (annoRect.centerY * this.editor.zoom);
    } else {
      // Position page to top:
      scrollOptions.top = annotationRect.top + contentHolder.scrollTop - this.editor.scrollOffset + (topLeftY * this.editor.zoom);
    }
    if (options.duration == null || options.animation == false) {
      if (options.animation != false) {
        scrollOptions.behavior = "smooth";
      }
      contentHolder.scrollTo(scrollOptions);
    } else {
      smoothScrollTo(contentHolder, scrollOptions.left, scrollOptions.top, options.duration);
    }
  }
  updateAnnotationScroll(pageData, animation) {
    if (pageData == null) {
      return;
    }
    let annoID = pageData[0];
    this.editor.pipeline.publish("page_change", { page: this.editor.currentPage, pageId: annoID });
    if ((annoID ?? "").startsWith("pending_") == true) {
      let anno = this.editor.annotations[annoID] ?? {};
      if (anno.pointer != null) {
        annoID = anno.pointer;
      }
    }
    this.scrollToAnnotation((this.editor.annotations[annoID] ?? {}).render, { animation });
    this.editor.exitObserve();
  }

  getCollaboratorSync = {};
  async getCollaborator(modify, callback) {
    if (modify == null) {
      if (callback) await callback({});
      return {};
    }

    let collaborator = this.editor.collaborators[modify];
    if (collaborator != null) {
      if (callback != null) {
        await callback(collaborator);
      }
      return collaborator;
    }

    this.getCollaboratorSync[modify] = true;

    if (this.requestCollaborators == null) {
      this.requestCollaborators = (async () => {
        await sleep(5);

        let modifyIDs = Object.keys(this.getCollaboratorSync);
        this.getCollaboratorSync = {};
        this.requestCollaborators = null;
        let [code, body] = await sendRequest("GET", "lessons/members/collaborator?modify=" + modifyIDs.join(), null, { session: this.editor.session });
        if (code == 200) {
          let memberObject = getObject(body, "_id");
          for (let i = 0; i < modifyIDs.length; i++) {
            let collaboratorID = modifyIDs[i];
            let collaborator = memberObject[collaboratorID] ?? {};
            this.editor.collaborators[collaboratorID] = collaborator;
          }
        }
      })();
    }

    await this.requestCollaborators;

    collaborator = this.editor.collaborators[modify] ?? {};

    if (callback != null) {
      await callback(collaborator);
    }

    return collaborator;
  }
}