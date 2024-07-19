modules["editor/export"] = {
  css: {
    ".ePage[exporting]": `border-radius: 0px !important; border-top: unset`,
    ".ePage:not([exporting])": `display: none`,
    ".ePageRearrange": `display: none`
  },
  resetAnnotationSize: async function () {
    this.farLeft = 0;
    this.farRight = 0;
    this.setLeftMargin = 0;
    this.setRightMargin = 0;
    this.farTop = 0;
    this.farBottom = 0;
    this.setTopMargin = 0;
    this.setBottomMargin = 0;
    this.maxLayer = 0;
    this.minLayer = 0;
    let editor = await getModule("pages/editor");
    let annoKeys = Object.keys(editor.annotations);
    for (let i = 0; i < annoKeys.length; i++) {
      let anno = (editor.annotations[annoKeys[i]] || {}).render;
      if (anno != null) {
        await this.checkAnnotationSize(anno, true);
      }
    }
    this.checkAnnotationSize();
  },
  checkAnnotationSize: async function (anno) {
    let editor = await getModule("pages/editor");
    let utils = await getModule("pages/editor/annotation");
    let contentFrame = editor.page.querySelector(".eContent");
    let content = contentFrame.querySelector(".eContentHolder");
    content.style.width = "fit-content";
    content.style.height = "fit-content";
    if (anno != null && anno.p != null) {
      if (editor.exporting == true) {
        let page = editor.page.querySelector('.ePage[pageid="' + (anno.page || "") + '"]');
        if (page != null && page.hasAttribute("exporting") == false) {
          return;
        }
        if (getParam("no_expand") == "true") {
          return;
        }
      }

      if ((anno._id || "").startsWith("pending_") != true || anno.done == true) {
        if (anno.remove != true) {
          let annoHolder = await utils.annoHolder(anno.page);
          let left = -anno.p[0];
          let right = anno.p[0] + anno.s[0] - annoHolder.offsetWidth;
          let top = -anno.p[1];
          let bottom = anno.p[1] + anno.s[0] - annoHolder.offsetHeight;
          if (left > this.farLeft) {
            this.setLeftMargin = Math.ceil(left / 400) * 400;
            this.farLeft = this.setLeftMargin - 120;
          }
          if (right > this.farRight) {
            this.setRightMargin = Math.ceil(right / 400) * 400;
            this.farRight = this.setRightMargin - 120;
          }
          if (editor.lesson.type == "freeboard") {
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
      }
    }
    this.marginLeft = (this.setLeftMargin * editor.zoom) + editor.addMargin;
    this.marginTop = (this.setTopMargin * editor.zoom) + editor.addMargin;
    content.style.marginLeft = (Math.ceil(this.marginLeft / 40) * 40) + "px";
    content.style.marginRight = (Math.ceil(((this.setRightMargin * editor.zoom) + editor.addMargin) / 40) * 40) + "px";
    if (editor.lesson.type == "freeboard") {
      content.style.marginTop = (Math.ceil(this.marginTop / 40) * 40) + "px";
      content.style.marginBottom = (Math.ceil(((this.setBottomMargin * editor.zoom) + editor.addMargin) / 40) * 40) + "px";
    }
    console.log("HEYA")
  },
  js: async function (editor, page) {
    fixed.style.display = "none";

    page.querySelector(".eContent").style.padding = "0px";
    page.querySelector(".eTopHolder").style.display = "none";
    page.querySelector(".eSide").style.display = "none";
    page.querySelector(".eBottomHolder").style.display = "none";
    let addPageHolder = page.querySelector(".eAddPagesHolder");
    if (addPageHolder != null) {
      addPageHolder.style.display = "none";
    }
    editor.addMargin = 0;

    let pageHolder = page.querySelector(".ePageHolder");
    
    //window.messageA({ data: { type: "FROM_NODE", message: { task: "setpage", page: 1 } } })

    //window.messageA = async (event) => {
    window.addEventListener("message", async (event) => {
      if (event.data && event.data.type === "FROM_NODE") {
        let data = event.data.message;
        switch (data.task) {
          case "setpage":
            let prevExport = pageHolder.querySelector(".ePage[exporting]");
            if (prevExport != null) {
              prevExport.removeAttribute("exporting");
            }
            let page = pageHolder.children[data.page - 1];
            if (page != null) {
              page.setAttribute("exporting", "");
              pageHolder.style.removeProperty("width");
              pageHolder.style.removeProperty("height");
            } else {
              pageHolder.style.width = "250px";
              pageHolder.style.height = "250px";
            }
            await editor.updatePages();
            await this.resetAnnotationSize();
            await this.resetAnnotationSize();
            break;
          case "freeboard":
            await this.resetAnnotationSize();
        }
        if (window.navigationReady) {
          window.navigationReady();
        }
      }
    });
  }
}

/*
window.exportReady = () => {
  window.messageA({ data: { type: "FROM_NODE", message: { task: "setpage", page: 1 } } });
}
*/