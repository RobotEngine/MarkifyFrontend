modules["editor/export"] = {
  css: {
    ".ePage[exporting]": `border-radius: 0px !important; border-top: unset`,
    ".ePage:not([exporting])": `display: none`,
    ".ePageRearrange": `display: none`
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

    let utils = await getModule("pages/editor/annotation");
    utils.resetAnnotationSize();

    let pageHolder = page.querySelector(".ePageHolder");
    
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
            await utils.setMarginSize();
            break;
          case "freeboard":
            await utils.setMarginSize();
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