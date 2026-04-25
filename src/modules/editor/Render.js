// RENDER : Handles rendering objects/annotations onto the board:

import { randomString } from "@/crucial";

export class Render {
  constructor(editor) {
    this.editor = editor;
  }

  fragmentQueue = [];
  fragmentStorage = {};
  pdfPageStorage = {};
  pdfFileLoading = {};

  tempID() {
    return "pending_" + randomString(10) + Date.now();
  }

  async setMarginSize(force) {
    if (force != true) {
      if (this.editor.exporting == true) {
        return;
      }
    }

    let chunks = Object.keys(this.editor.chunkAnnotations);
    let joinedChunks = chunks.join();
    if (joinedChunks != this.joinedChunks) {
      this.joinedChunks = joinedChunks;

      this.farLeft = 0;
      this.farRight = 0;
      this.setLeftMargin = 0;
      this.setRightMargin = 0;
      this.farTop = 0;
      this.farBottom = 0;
      this.setTopMargin = 0;
      this.setBottomMargin = 0;
      
      for (let i = 0; i < chunks.length; i++) {
        let splitPos = chunks[i].split("_");
        let [x, y] = [parseInt(splitPos[0]), parseInt(splitPos[1])];
        let left = -x;
        let right = x + this.editor.chunkWidth;
        let top = -y;
        let bottom = y + this.editor.chunkHeight;
        if (left > this.farLeft) {
          this.setLeftMargin = Math.ceil(left / 400) * 400;
          this.farLeft = this.setLeftMargin - 120;
        }
        if (right > this.farRight) {
          this.setRightMargin = Math.ceil(right / 400) * 400;
          this.farRight = this.setRightMargin - 120;
        }
        if (top > this.farTop) {
          this.setTopMargin = Math.ceil(top / 400) * 400;
          this.farTop = this.setTopMargin - 120;
        }
        if (bottom > this.farBottom) {
          this.setBottomMargin = Math.ceil(bottom / 400) * 400;
          this.farBottom = this.setBottomMargin - 120;
        }
      }
    }
    
    let halfPageWidth = this.editor.pageOffsetWidth / 2;
    let halfPageHeight = this.editor.pageOffsetHeight / 2;
    let setMarginLeft = Math.ceil((this.setLeftMargin * this.editor.zoom) + halfPageWidth);
    let setMarginRight = Math.ceil((this.setRightMargin * this.editor.zoom) + halfPageWidth);
    let setMarginTop = Math.ceil((this.setTopMargin * this.editor.zoom) + halfPageHeight);
    let setMarginBottom = Math.ceil((this.setBottomMargin * this.editor.zoom) + halfPageHeight);

    let checkWidth = false;
    let checkHeight = false;
    let scrollPosX;
    let scrollPosY;
    let contentLeft = this.marginLeft ?? 0;
    let contentTop = this.marginTop ?? 0;

    if (this.marginLeft != setMarginLeft) {
      scrollPosX = this.editor.contentHolder.scrollLeft;
      this.marginLeft = setMarginLeft;
      this.editor.editorContent.style.marginLeft = setMarginLeft + "px";
      checkWidth = true;
    }
    if (this.marginRight != setMarginRight) {
      scrollPosX = scrollPosX ?? this.editor.contentHolder.scrollLeft;
      this.marginRight = setMarginRight;
      this.editor.editorContent.style.marginRight = setMarginRight + "px";
      checkWidth = true;
    }
    if (this.marginTop != setMarginTop) {
      scrollPosY = this.editor.contentHolder.scrollTop;
      this.marginTop = setMarginTop;
      this.editor.editorContent.style.marginTop = setMarginTop + "px";
      checkHeight = true;
    }
    if (this.marginBottom != setMarginBottom) {
      scrollPosY = scrollPosY ?? this.editor.contentHolder.scrollTop;
      this.marginBottom = setMarginBottom;
      this.editor.editorContent.style.marginBottom = setMarginBottom + "px";
      checkHeight = true;
    }

    if (
      (checkWidth == true && this.editor.content.offsetWidth != this.lastOffsetWidth)
      || (checkHeight == true && this.editor.content.offsetHeight != this.lastOffsetHeight)
    ) {
      let updateScroll = {};
      if (scrollPosX != null) {
        updateScroll.left = scrollPosX + (this.marginLeft - contentLeft);
      }
      if (scrollPosY != null) {
        updateScroll.top = scrollPosY + (this.marginTop - contentTop);
      }
      this.editor.contentHolder.scrollTo(updateScroll);
      this.editor.adjustRealtimeHolder();
      await this.editor.pipeline.publish("redraw_selection", { transition: false });
      this.lastOffsetWidth = this.editor.content.offsetWidth;
      this.lastOffsetHeight = this.editor.content.offsetHeight;
    }
  }
}