import { userID, setPage, sendRequest } from "@/crucial";

import { Frame as ExportDropdown } from "@modules/lesson/dropdowns/Export";
import { Frame as BoardStyleDropdown } from "@modules/lesson/dropdowns/BoardStyle";

import exportIcon from "@assets/lesson/file/export.svg?raw";
import printIcon from "@assets/lesson/file/print.svg?raw";
import copyIcon from "@assets/lesson/file/copy.svg?raw";
import movetoIcon from "@assets/lesson/file/moveto.svg?raw";
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
  <button class="eFileAction" option="dashboard" title="Return to the Dashboard" style="--themeColor: var(--secondary)"><div>${backIcon}</div>Dashboard</button>
  <div class="eFileLine"></div>
  <button class="eFileAction" option="export" dropdowntitle="Export" title="Export the lesson as a PDF."><div>${exportIcon}</div>Export</button>
  <button class="eFileAction" option="print" dropdowntitle="Print" title="Export the lesson and print."><div>${printIcon}</div>Print</button>
  <button class="eFileAction" option="copy" title="Create a copy of the lesson."><div>${copyIcon}</div>Create Copy</button>
  <button class="eFileAction" option="moveto" title="Move this lesson into a folder." dropdowntitle="Move To Folder"><div>${movetoIcon}</div>Move To Folder</button>
  <div class="eFileLine" option="timeline"></div>
  <button class="eFileAction" option="history" title="See the lesson's version history as a timeline."><div>${historyIcon}</div>Timeline History</button>
  <div class="eFileLine" option="findjump"></div>
  <button class="eFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><div>${searchIcon}</div>Find</button>
  <button class="eFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><div>${uparrowIcon}</div>Jump to Start</button>
  <button class="eFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><div>${jumpIcon}</div>Jump to Page</button>
  <button class="eFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><div>${downarrowIcon}</div>Jump to End</button>
  <div class="eFileLine" option="document"></div>
  <button class="eFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><div>${infoIcon}</div>Properties</button>
  <button class="eFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><div>${textIcon}</div>Recognize Text</button>
  <div class="eFileLine" option="delete"></div>
  <button class="eFileAction" option="boardstyle" title="Change the board's background color."><div>${fillbucketIcon}</div>Background Color</button>
  <button class="eFileAction" option="hideshowpage" title="Hide all pages from members."><div>${hideshowIcon}</div>Hide All Pages</button>
  <button class="eFileAction" option="deletelesson" title="Remove this lesson from your dashboard." style="--themeColor: var(--error)"><div>${trashIcon}</div>Delete Lesson</button>
  <button class="eFileAction" option="deleteannotations" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><div>${trashIcon}</div>Delete Annotations</button>
  `;
  css = {
    ".eFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".eFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".eFileAction div svg": `width: 100%; height: 100%`,
    ".eFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".eFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js(frame, extra) {
    let parent = extra.parent;
    let editor = extra.editor;
    let access = editor.self.access;

    let dashboardButton = frame.querySelector('.eFileAction[option="dashboard"]');
    dashboardButton.addEventListener("click", async () => {
      editor.save.syncSave(true);
      setPage("pages/app/dashboard");
    });
    let exportButton = frame.querySelector('.eFileAction[option="export"]');
    exportButton.addEventListener("click", () => {
      this.open(exportButton, ExportDropdown, { type: "download", editor: editor });
    });
    let printButton = frame.querySelector('.eFileAction[option="print"]');
    printButton.addEventListener("click", () => {
      this.open(printButton, ExportDropdown, { type: "print", editor: editor });
    });
    let copyButton = frame.querySelector('.eFileAction[option="copy"]');
    copyButton.addEventListener("click", async () => {
      if (userID == null) {
        return promptLogin();
      }
      copyButton.setAttribute("disabled", "");
      let copyAlert = await editor.openAlert("info", "<b>Creating Copy</b><div>Creating a copy of this lesson.", { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/copy", null, { session: editor.session });
      copyButton.removeAttribute("disabled");
      editor.closeAlert(copyAlert);
      if (code == 200) {
        this.close();
        setPage("pages/app/lesson", { params: { lesson: body.lesson } });
      }
    });

    let fileButton = frame.querySelector('.eFileAction[option="moveto"]');
    fileButton.addEventListener("click", () => {
      this.open(fileButton, import("@modules/dropdowns/MoveTo"), { lessonID: parent.parent.id, folderID: parent.parent.folder });
    });

    let historyButton = frame.querySelector('.eFileAction[option="history"]');
    historyButton.addEventListener("click", () => {
      parent.openTimeline();
      this.close();
    });

    let find = frame.querySelector('.eFileAction[option="find"]');
    let jumptop = frame.querySelector('.eFileAction[option="jumptop"]');
    jumptop.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setCurrentPage(1, false);
        this.close();
      }
    });
    let jump = frame.querySelector('.eFileAction[option="jump"]');
    jump.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.page.querySelector(".eCurrentPage").focus();
        this.close();
      }
    });
    let jumpend = frame.querySelector('.eFileAction[option="jumpend"]');
    jumpend.addEventListener("click", () => {
      if (editor.annotationPages.length > 0) {
        editor.setCurrentPage(editor.annotationPages.length, false);
        this.close();
      }
    });

    let propertiesButton = frame.querySelector('.eFileAction[option="properties"]');
    let ocrButton = frame.querySelector('.eFileAction[option="ocr"]');

    let boardStyleButton = frame.querySelector('.eFileAction[option="boardstyle"]');
    boardStyleButton.addEventListener("click", async () => {
      this.open(boardStyleButton, BoardStyleDropdown, extra);
    });

    let hideshowpage = frame.querySelector('.eFileAction[option="hideshowpage"]');
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

    let deleteLessonButton = frame.querySelector('.eFileAction[option="deletelesson"]');
    deleteLessonButton.addEventListener("click", () => {
      this.open(deleteLessonButton, import("@modules/dropdowns/Remove"), { type: "deletelesson", lessonID: parent.parent.id, isOwner: editor.self.access == 5, session: editor.session });
    });
    let deleteAnnotationsButton = frame.querySelector('.eFileAction[option="deleteannotations"]');
    deleteAnnotationsButton.addEventListener("click", () => {
      this.open(deleteAnnotationsButton, import("@modules/dropdowns/Remove"), { type: "deleteannotations", lessonID: parent.parent.id, session: editor.session });
    });

    let updateButtons = () => {
      if (editor.settings.allowExport == false && access < 4) {
        exportButton.setAttribute("disabled", "");
        printButton.setAttribute("disabled", "");
        copyButton.setAttribute("disabled", "");
      } else {
        exportButton.removeAttribute("disabled");
        printButton.removeAttribute("disabled");
        copyButton.removeAttribute("disabled");
      }
      if (editor.settings.allowHistory == false && access < 4) {
        historyButton.setAttribute("disabled", "");
      } else {
        historyButton.removeAttribute("disabled");
      }
    }
    updateButtons();
    parent.pipeline.subscribe("fileDropdownSet", "set", updateButtons);

    if (access < 5) {
      boardStyleButton.remove();
      hideshowpage.remove();
      deleteAnnotationsButton.remove();
      if (userID == null) {
        deleteLessonButton.remove();
        frame.querySelector('.eFileLine[option="delete"]').remove();
      } else {
        deleteLessonButton.innerHTML = `<div>${trashIcon}</div>Remove Lesson`;
      }
    }

    if (editor.annotationPages.length < 1) {
      frame.querySelector('.eFileLine[option="findjump"]').remove();
      jumptop.remove();
      jump.remove();
      jumpend.remove();
    }

    find.remove();
    frame.querySelector('.eFileLine[option="document"]').remove();
    propertiesButton.remove();
    ocrButton.remove();
  }
}