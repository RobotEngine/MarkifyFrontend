modules["dropdowns/lesson/file/export"] = class {
  html = ``;
  css = {
    ".eFileExportOption": `display: flex; flex-wrap: wrap; min-width: 100%; padding: 0; border-radius: 8px; align-items: center; transition: .15s`,
    ".eFileExportOption:not(:first-child)": `margin-top: 6px`,
    ".eFileExportOption:hover": `background: var(--theme); color: #fff`,
    ".eFileExportOption:hover div[image]": `filter: brightness(0) invert(1)`,
    ".eFileExportOption:hover b": `color: #fff`,
    ".eFileExportOption:active": `transform: scale(.95); border-radius: 14px`,
    ".eFileExportOption div[image]": `width: 60px; height: 60px; margin: 6px; transition: .15s`,
    ".eFileExportOption div[image] svg": `width: 100%; height: 100%`,
    ".eFileExportOption .eFileExportInfo": `margin: 6px; text-align: left`,
    ".eFileExportOption .eFileExportTitle": `margin-right: 6px; font-size: 18px; font-weight: 600`,
    ".eFileExportOption b": `color: var(--theme); font-weight: 800; transition: .15s`,
    ".eFileExportOption .eFileExportDesc": `max-width: 200px; font-size: 14px`
  };
  js = async function (frame, extra) {
    let editor = extra.editor;
    let type = extra.type;

    if (type == "download") {
      frame.innerHTML = `
      <button class="eFileExportOption" option="pages" title="Export each page separately into a PDF."><div image></div><div class="eFileExportInfo"><div class="eFileExportTitle">Just the <b>Pages</b></div><div class="eFileExportDesc">Export each page separately into a PDF.</div></div></button>
      <button class="eFileExportOption" option="board" title="Export the entire board as a single page PDF."><div image></div><div class="eFileExportInfo"><div class="eFileExportTitle">Entire <b>Document</b></div><div class="eFileExportDesc">Export the entire board as a single page PDF.</div></div></button>
      <button class="eFileExportOption" option="selected" title="Export only the selected elements into a PDF."><div image></div><div class="eFileExportInfo"><div class="eFileExportTitle">Selected <b>Elements</b></div><div class="eFileExportDesc">Export only the selected elements into a PDF.</div></div></button>
      `;
    } else if (type == "print") {
      frame.innerHTML = `
      <button class="eFileExportOption" option="pages" title="Print each page separately (RECOMENDED)."><div image></div><div class="eFileExportInfo"><div class="eFileExportTitle">Just the <b>Pages</b></div><div class="eFileExportDesc">Print each page separately (RECOMENDED).</div></div></button>
      <button class="eFileExportOption" option="board" title="Print the entire board as a single page."><div image></div><div class="eFileExportInfo"><div class="eFileExportTitle">Entire <b>Document</b></div><div class="eFileExportDesc">Print the entire board as single page.</div></div></button>
      <button class="eFileExportOption" option="selected" title="Print only the selected elements."><div image></div><div class="eFileExportInfo"><div class="eFileExportTitle">Selected <b>Elements</b></div><div class="eFileExportDesc">Print only the selected elements.</div></div></button>
      `;
    }

    let pagesButton = frame.querySelector('.eFileExportOption[option="pages"]');
    let boardButton = frame.querySelector('.eFileExportOption[option="board"]');
    let selectedButton = frame.querySelector('.eFileExportOption[option="selected"]');
    
    if (editor.annotationPages.length < 1) {
      pagesButton.setAttribute("disabled", "");
    }
    if (Object.keys(editor.selecting).length < 1) {
      selectedButton.setAttribute("disabled", "");
    }

    let runExport = async (method) => {
      frame.setAttribute("disabled", "");
      let exportAlert = await alertModule.open("info", "<b>Exporting Lesson</b><div>Preparing export...</div>", { time: "never" });
      editor.exportStatus = editor.exportStatus ?? {};
      if (editor.exportStatus.exportAlert != null) {
        clearTimeout(editor.exportStatus.exportAlertTimeout);
        alertModule.close(editor.exportStatus.exportAlert);
      }
      editor.exportStatus.exportAlert = exportAlert;
      editor.exportStatus.exportAlertTimeout = setTimeout(() => {
        alertModule.close(editor.exportStatus.exportAlert);
      }, 60000);
      let sendBody = { type: type, method: method };
      if (method == "selected") {
        sendBody.selecting = Object.keys(editor.selecting);
      }
      let path = "lessons/export";
      if ((editor.parameters ?? []).length > 0) {
        path += "?" + editor.parameters.join("&");
      }
      let [code, body] = await sendRequest("POST", path, sendBody, { session: editor.session });
      if (frame != null) {
        frame.removeAttribute("disabled");
      }
      if ([504, 524, 0].includes(code) == false) { // Gateway timeout
        alertModule.close(exportAlert);
      }
      if (code == 200) {
        editor.pipeline.publish("exportstatus", { sync: getEpoch(), type: type, export: body.export });
      }
    }
    pagesButton.addEventListener("click", () => {
      runExport("pages");
    });
    boardButton.addEventListener("click", () => {
      runExport("board");
    });
    selectedButton.addEventListener("click", () => {
      runExport("selected");
    });

    setSVG(pagesButton.querySelector("div[image]"), "../images/editor/file/export/pages.svg");
    setSVG(boardButton.querySelector("div[image]"), "../images/editor/file/export/board.svg");
    setSVG(selectedButton.querySelector("div[image]"), "../images/editor/file/export/selected.svg");

    let frameParent = app.querySelector(".content");
    editor.pipeline.subscribe("exportDropdownUpdate", "exportstatus", async (body) => {
      let exportStatus = editor.exportStatus;
      if (exportStatus == null || exportStatus.exportAlert == null) {
        return;
      }
      let alertText = exportStatus.exportAlert.querySelector(".alertText div");
      if (alertText == null) {
        return;
      }
      if (body.sync < exportStatus.exportSync) {
        return;
      }
      exportStatus.exportSync = body.sync;
      alertText.textContent = body.status;
      clearTimeout(exportStatus.exportAlertTimeout);
      exportStatus.exportAlertTimeout = setTimeout(() => {
        alertModule.close(exportStatus.exportAlert);
      }, 60000);
      if (body.type != null && exportStatus.exportAlert != null && exportStatus.exportAlert.hasAttribute("complete") == false) {
        exportStatus.exportAlert.setAttribute("complete", "");
        alertModule.close(exportStatus.exportAlert);
        let oldExportAction = frameParent.querySelector(".eFileActionExport");
        if (oldExportAction != null) {
          oldExportAction.remove();
        }
        if (body.type == "download") {
          frameParent.insertAdjacentHTML("beforeend", `<a class="eFileActionExport" style="display: none"></a>`); // target="_blank"
          let link = frameParent.querySelector(".eFileActionExport");
          link.href = assetURL + body.export;
          link.click();
          link.remove();
          //window.open(assetURL + body.export);
          dropdownModule.close();
        } else if (body.type == "print") {
          let blob;
          await fetch(assetURL + body.export).then(async function (file) {
            blob = URL.createObjectURL(await file.blob());
          });
          if (blob != null) {
            frameParent.insertAdjacentHTML("beforeend", `<iframe class="eFileActionExport" style="display: none"></iframe>`);
            let iframe = frameParent.querySelector(".eFileActionExport");
            iframe.addEventListener("load", () => {
              iframe.contentWindow.focus();
              iframe.contentWindow.print();
              URL.revokeObjectURL(blob);
            });
            iframe.src = blob;
          }
          dropdownModule.close();
        }
      }
    });
  }
}