modules["dropdowns/lesson/file/export"] = class {
  html = ``;
  css = {
    ".eFileExportOption": `display: flex; flex-wrap: wrap; min-width: 100%; padding: 0; border-radius: 8px; align-items: center; transition: .15s`,
    ".eFileExportOption:not(:first-child)": `margin-top: 6px`,
    ".eFileExportOption:hover": `background: var(--theme); color: #fff`,
    ".eFileExportOption:hover img": `filter: brightness(0) invert(1)`,
    ".eFileExportOption:hover b": `color: #fff`,
    ".eFileExportOption:active": `transform: scale(.95); border-radius: 14px`,
    ".eFileExportOption img": `width: 60px; height: 60px; margin: 6px; transition: .15s`,
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
      <button class="eFileExportOption" option="pages" title="Export each page separately into a PDF."><img src="./images/editor/file/export/pages.svg"><div class="eFileExportInfo"><div class="eFileExportTitle">Just the <b>Pages</b></div><div class="eFileExportDesc">Export each page separately into a PDF.</div></div></button>
      <button class="eFileExportOption" option="board" title="Export the entire board as a single page PDF."><img src="./images/editor/file/export/board.svg"><div class="eFileExportInfo"><div class="eFileExportTitle">Entire <b>Document</b></div><div class="eFileExportDesc">Export the entire board as a single page PDF.</div></div></button>
      <button class="eFileExportOption" option="selected" title="Export only the selected elements into a PDF."><img src="./images/editor/file/export/selected.svg"><div class="eFileExportInfo"><div class="eFileExportTitle">Selected <b>Elements</b></div><div class="eFileExportDesc">Export only the selected elements into a PDF.</div></div></button>
      `;
    } else if (type == "print") {
      frame.innerHTML = `
      <button class="eFileExportOption" option="pages" title="Print each page separately (RECOMENDED)."><img src="./images/editor/file/export/pages.svg"><div class="eFileExportInfo"><div class="eFileExportTitle">Just the <b>Pages</b></div><div class="eFileExportDesc">Print each page separately (RECOMENDED).</div></div></button>
      <button class="eFileExportOption" option="board" title="Print the entire board as single page."><img src="./images/editor/file/export/board.svg"><div class="eFileExportInfo"><div class="eFileExportTitle">Entire <b>Document</b></div><div class="eFileExportDesc">Print the entire board as single page.</div></div></button>
      <button class="eFileExportOption" option="selected" title="Print only the selected elements."><img src="./images/editor/file/export/selected.svg"><div class="eFileExportInfo"><div class="eFileExportTitle">Selected <b>Elements</b></div><div class="eFileExportDesc">Print only the selected elements.</div></div></button>
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
      if (editor.exportAlert != null) {
        clearTimeout(editor.exportAlertTimeout);
        alertModule.close(editor.exportAlert);
      }
      editor.exportAlert = exportAlert;
      editor.exportAlertTimeout = setTimeout(() => {
        alertModule.close(editor.exportAlert);
      }, 60000);
      let sendBody = { type: type, method: method };
      if (method == "selected") {
        sendBody.selecting = Object.keys(editor.selecting);
      }
      let [code, body] = await sendRequest("POST", "lessons/exportv2", sendBody, { session: editor.session });
      if (frame != null) {
        frame.removeAttribute("disabled");
      }
      if ([504, 524, 0].includes(code) == false) { // Gateway timeout
        alertModule.close(exportAlert);
      }
      if (code == 200 && exportAlert != null && exportAlert.hasAttribute("complete") == false) {
        exportAlert.setAttribute("complete", "");
        let oldframe = fixed.querySelector(".eFileActionPrintFrame");
        if (oldframe != null) {
          oldframe.remove();
        }
        if (type != "print") {
          fixed.insertAdjacentHTML("beforeend", `<iframe class="eFileActionPrintFrame" style="display: none"></iframe>`);
          let iframe = fixed.querySelector(".eFileActionPrintFrame");
          iframe.src = assetURL + body.export;
        } else {
          let blob;
          await fetch(assetURL + body.export).then(async function (file) {
            blob = URL.createObjectURL(await file.blob());
          });
          if (blob != null) {
            fixed.insertAdjacentHTML("beforeend", `<iframe class="eFileActionPrintFrame" style="display: none"></iframe>`);
            let iframe = fixed.querySelector(".eFileActionPrintFrame");
            iframe.addEventListener("load", () => {
              iframe.contentWindow.focus();
              iframe.contentWindow.print();
              URL.revokeObjectURL(blob);
            });
            iframe.src = blob;
          }
        }
        dropdownModule.close();
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
  }
}