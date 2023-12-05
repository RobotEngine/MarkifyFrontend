modules["editor/export"] = {
  css: {
    ".ePage[exporting]": `border-radius: 0px !important; border-top: unset`,
    ".ePage:not([exporting])": `display: none`,
    ".ePageRearrange": `display: none`
  },
  js: async function (editor, page) {
    editor.exporting = true;

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
    
    //window.messageA = (event) => {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.type === "FROM_NODE") {
        let data = event.data.message;
        
        switch (data.task) {
          case "setpage":
            let prevExport = pageHolder.querySelector(".ePage[exporting]");
            if (prevExport != null) {
              prevExport.removeAttribute("exporting");
            }
            pageHolder.children[data.page - 1].setAttribute("exporting", "");
            utils.resetAnnotationSize();
            editor.viewAnnotations();
            break;
          case "freeboard":
            utils.resetAnnotationSize();
            editor.viewAnnotations();
        }
      }
    });
  }
}