import { userID, promptLogin, sendRequest } from "@/crucial";

import { Frame as ExportDropdown } from "@modules/lesson/dropdowns/Export";
import { Frame as BoardStyleDropdown } from "@modules/lesson/dropdowns/BoardStyle";

import exportIcon from "@assets/lesson/file/export.svg?raw";
import printIcon from "@assets/lesson/file/print.svg?raw";
import historyIcon from "@assets/lesson/file/history.svg?raw";
import searchIcon from "@assets/lesson/file/search.svg?raw";
import uparrowIcon from "@assets/lesson/file/uparrow.svg?raw";
import jumpIcon from "@assets/lesson/file/jump.svg?raw";
import downarrowIcon from "@assets/lesson/file/downarrow.svg?raw";
import infoIcon from "@assets/lesson/file/info.svg?raw";
import textIcon from "@assets/lesson/file/text.svg?raw";
import fillbucketIcon from "@assets/lesson/file/fillbucket.svg?raw";
import hideshowIcon from "@assets/lesson/file/hideshow.svg?raw";
import { back as backIcon, trash as trashIcon } from "@modules/utility/core-icons";

export class Frame {
  html = `
  <button class="brgFileAction" option="groups" style="--themeColor: var(--secondary)"><div>${backIcon}</div><span></span></button>
  <div class="brgFileLine"></div>
  <button class="brgFileAction" option="export" dropdowntitle="Export" title="Export the lesson as a PDF."><div>${exportIcon}</div>Export</button>
  <button class="brgFileAction" option="print" dropdowntitle="Print" title="Export the lesson and print."><div>${printIcon}</div>Print</button>
  <div class="brgFileLine" option="timeline"></div>
  <button class="brgFileAction" option="history" title="See the groups's version history as a timeline."><div>${historyIcon}</div>Timeline History</button>
  <div class="brgFileLine" option="findjump"></div>
  <button class="brgFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><div>${searchIcon}</div>Find</button>
  <button class="brgFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><div>${uparrowIcon}</div>Jump to Start</button>
  <button class="brgFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><div>${jumpIcon}</div>Jump to Page</button>
  <button class="brgFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><div>${downarrowIcon}</div>Jump to End</button>
  <div class="brgFileLine" option="document"></div>
  <button class="brgFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><div>${infoIcon}</div>Properties</button>
  <button class="brgFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><div>${textIcon}</div>Recognize Text</button>
  <div class="brgFileLine" option="delete"></div>
  <button class="brgFileAction" option="boardstyle" title="Change the board's background color."><div>${fillbucketIcon}</div>Background Color</button>
  <button class="brgFileAction" option="hideshowpage" title="Hide all pages from members."><div>${hideshowIcon}</div>Hide All Pages</button>
  <button class="brgFileAction" option="deleteannotations" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><div>${trashIcon}</div>Delete Annotations</button>
  `;
  
  css = {
    ".brgFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".brgFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".brgFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".brgFileAction div svg": `width: 100%; height: 100%`,
    ".brgFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".brgFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };

  js(frame, extra) {
    let parent = extra.parent;
    let editor = parent.editor;

    let overviewButton = frame.querySelector('.brgFileAction[option="groups"]');
    let overviewButtonText = overviewButton.querySelector("span");
    overviewButton.addEventListener("click", async () => {
      editor.save.syncSave(true);
      parent.close();
      this.close();
    });
    if (parent.parent.parent.self.access < 4) {
      overviewButtonText.textContent = "Groups";
      overviewButton.title = "See other groups and your past groups.";
    } else {
      overviewButtonText.textContent = "Overview";
      overviewButton.title = "Return to seeing every group.";
    }

    let exportButton = frame.querySelector('.brgFileAction[option="export"]');
    exportButton.addEventListener("click", () => {
      this.open(exportButton, ExportDropdown, { type: "download", editor });
    });
    let printButton = frame.querySelector('.brgFileAction[option="print"]');
    printButton.addEventListener("click", () => {
      this.open(printButton, ExportDropdown, { type: "print", editor });
    });

    let historyButton = frame.querySelector('.brgFileAction[option="history"]');
    historyButton.addEventListener("click", async () => {
      this.close();

      parent.parent.openPage("timeline", "timeline", {
        exitPage: [parent.pageID, parent.pagePath],
        configuration: {
          id: parent.group._id,
          parameters: [("group=" + parent.group._id)],
          annotations: parent.editor.annotations,
          backgroundColor: parent.editor.backgroundColor
        }
      });
    });

    let find = frame.querySelector('.brgFileAction[option="find"]');
    let jumptop = frame.querySelector('.brgFileAction[option="jumptop"]');
    jumptop.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setCurrentPage(1, false);
        this.close();
      }
    });
    let jump = frame.querySelector('.brgFileAction[option="jump"]');
    jump.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.page.querySelector(".brtCurrentPage").focus();
        this.close();
      }
    });
    let jumpend = frame.querySelector('.brgFileAction[option="jumpend"]');
    jumpend.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setCurrentPage(editor.annotationPages.length, false);
        this.close();
      }
    });

    let propertiesButton = frame.querySelector('.brgFileAction[option="properties"]');
    let ocrButton = frame.querySelector('.brgFileAction[option="ocr"]');

    let boardStyleButton = frame.querySelector('.brgFileAction[option="boardstyle"]');
    boardStyleButton.addEventListener("click", async () => {
      this.open(boardStyleButton, BoardStyleDropdown, { parent, editor });
    });

    let hideshowpage = frame.querySelector('.brgFileAction[option="hideshowpage"]');
    hideshowpage.addEventListener("click", async () => {
      hideshowpage.setAttribute("disabled", "");
      for (let i = 0; i < parent.editor.annotationPages.length; i++) {
        let pageID = parent.editor.annotationPages[i][0];
        let render = (parent.editor.annotations[pageID] ?? {}).render;
        if (render != null && render.hidden != true) {
          await parent.editor.save.push({ _id: pageID, hidden: true });
        }
      }
      await parent.editor.save.syncSave(true);
      hideshowpage.removeAttribute("disabled");
      this.close();
    });

    let deleteAnnotationsButton = frame.querySelector('.brgFileAction[option="deleteannotations"]');
    deleteAnnotationsButton.addEventListener("click", () => {
      this.open(deleteAnnotationsButton, import("@modules/dropdowns/Remove"), {
        type: "deleteannotations",
        lessonID: parent.parent.id,
        session: editor.session,
        parameters: editor.parameters
      });
    });

    let updateButtons = () => {
      if (editor.settings.allowExport == false && editor.self.access < 4) {
        exportButton.setAttribute("disabled", "");
        printButton.setAttribute("disabled", "");
        //copyButton.setAttribute("disabled", "");
      } else {
        exportButton.removeAttribute("disabled");
        printButton.removeAttribute("disabled");
        //copyButton.removeAttribute("disabled");
      }
      if (editor.settings.allowHistory == false && editor.self.access < 4) {
        historyButton.setAttribute("disabled", "");
      } else {
        historyButton.removeAttribute("disabled");
      }
    }
    updateButtons();
    parent.pipeline.subscribe("fileDropdownSet", "set", updateButtons);

    if (editor.self.group != parent.group._id) {
      boardStyleButton.remove();
      hideshowpage.remove();
      deleteAnnotationsButton.remove();
      frame.querySelector('.brgFileLine[option="delete"]').remove();
    }

    if (editor.annotationPages.length < 1) {
      frame.querySelector('.brgFileLine[option="findjump"]').remove();
      jumptop.remove();
      jump.remove();
      jumpend.remove();
    }

    find.remove();
    frame.querySelector('.brgFileLine[option="document"]').remove();
    propertiesButton.remove();
    ocrButton.remove();
  }
}