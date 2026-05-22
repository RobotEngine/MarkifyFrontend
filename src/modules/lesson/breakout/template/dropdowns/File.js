import { userID, setPage, promptLogin, sendRequest } from "@/crucial";

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
  <button class="brtFileAction" option="overview" title="Return to the main overview page." style="--themeColor: var(--secondary)"><div>${backIcon}</div>Overview</button>
  <div class="brtFileLine"></div>
  <button class="brtFileAction" option="export" dropdowntitle="Export" title="Export the lesson as a PDF."><div>${exportIcon}</div>Export</button>
  <button class="brtFileAction" option="print" dropdowntitle="Print" title="Export the lesson and print."><div>${printIcon}</div>Print</button>
  <div class="brtFileLine" option="timeline"></div>
  <button class="brtFileAction" option="history" title="See the lesson's version history as a timeline."><div>${historyIcon}</div>Timeline History</button>
  <div class="brtFileLine" option="findjump"></div>
  <button class="brtFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><div>${searchIcon}</div>Find</button>
  <button class="brtFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><div>${uparrowIcon}</div>Jump to Start</button>
  <button class="brtFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><div>${jumpIcon}</div>Jump to Page</button>
  <button class="brtFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><div>${downarrowIcon}</div>Jump to End</button>
  <div class="brtFileLine" option="document"></div>
  <button class="brtFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><div>${infoIcon}</div>Properties</button>
  <button class="brtFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><div>${textIcon}</div>Recognize Text</button>
  <div class="brtFileLine" option="delete"></div>
  <button class="brtFileAction" option="boardstyle" title="Change the board's background color."><div>${fillbucketIcon}</div>Background Color</button>
  <button class="brtFileAction" option="hideshowpage" title="Hide all pages from members."><div>${hideshowIcon}</div>Hide All Pages</button>
  <button class="brtFileAction" option="deleteannotations" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><div>${trashIcon}</div>Delete Annotations</button>
  `;

  css = {
    ".brtFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".brtFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".brtFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".brtFileAction div svg": `width: 100%; height: 100%`,
    ".brtFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".brtFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };

  js(frame, extra) {
    let parent = extra.parent;
    let editor = parent.editor;

    let overviewButton = frame.querySelector('.brtFileAction[option="overview"]');
    overviewButton.addEventListener("click", async () => {
      editor.save.syncSave(true);
      parent.parent.closePage("secondary");
      parent.parent.openPage("primary", "overview");
      this.close();
    });
    let exportButton = frame.querySelector('.brtFileAction[option="export"]');
    exportButton.addEventListener("click", () => {
      this.open(exportButton, ExportDropdown, { type: "download", editor });
    });
    let printButton = frame.querySelector('.brtFileAction[option="print"]');
    printButton.addEventListener("click", () => {
      this.open(printButton, ExportDropdown, { type: "print", editor });
    });

    let historyButton = frame.querySelector('.brtFileAction[option="history"]');
    historyButton.addEventListener("click", async () => {
      this.close();

      parent.parent.openPage("timeline", "timeline", {
        exitPage: ["secondary", "template"],
        configuration: {
          id: parent.template._id,
          parameters: [("template=" + parent.template._id)],
          annotations: parent.editor.annotations,
          backgroundColor: parent.editor.backgroundColor
        }
      });
    });

    let find = frame.querySelector('.brtFileAction[option="find"]');
    let jumptop = frame.querySelector('.brtFileAction[option="jumptop"]');
    jumptop.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setPage(1, false);
        this.close();
      }
    });
    let jump = frame.querySelector('.brtFileAction[option="jump"]');
    jump.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.page.querySelector(".brtCurrentPage").focus();
        this.close();
      }
    });
    let jumpend = frame.querySelector('.brtFileAction[option="jumpend"]');
    jumpend.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setPage(editor.annotationPages.length, false);
        this.close();
      }
    });

    let propertiesButton = frame.querySelector('.brtFileAction[option="properties"]');
    let ocrButton = frame.querySelector('.brtFileAction[option="ocr"]');

    let boardStyleButton = frame.querySelector('.brtFileAction[option="boardstyle"]');
    boardStyleButton.addEventListener("click", async () => {
      this.open(boardStyleButton, BoardStyleDropdown, { parent, editor });
    });

    let hideshowpage = frame.querySelector('.brtFileAction[option="hideshowpage"]');
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

    let deleteAnnotationsButton = frame.querySelector('.brtFileAction[option="deleteannotations"]');
    deleteAnnotationsButton.addEventListener("click", () => {
      this.open(deleteAnnotationsButton, import("@modules/dropdowns/Remove"), {
        type: "deleteannotations",
        lessonID: parent.parent.id,
        session: editor.session,
        parameters: editor.parameters
      });
    });

    if (editor.annotationPages.length < 1) {
      frame.querySelector('.brtFileLine[option="findjump"]').remove();
      jumptop.remove();
      jump.remove();
      jumpend.remove();
    }

    find.remove();
    frame.querySelector('.brtFileLine[option="document"]').remove();
    propertiesButton.remove();
    ocrButton.remove();
  }
}