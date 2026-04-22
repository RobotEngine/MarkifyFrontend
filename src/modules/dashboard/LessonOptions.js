import {
  sleep,
  sendRequest
} from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
import { alert as alertModule } from "@modules/utility/Alert";

import open from "@assets/open.svg?raw";
import moveto from "@assets/dashboard/moveto.svg?raw";
import rename from "@assets/rename.svg?raw";
import copy from "@assets/copy.svg?raw";
import { trash } from "@modules/utility/coreicons";

export class Frame {
  html = `
  <button class="dTileDropAction" option="open" title="Open this lesson.">${open}Open</button>
  <button class="dTileDropAction" option="opennewtab" title="Open this lesson in a new tab.">${open}Open in New Tab</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="moveto" title="Move this lesson into a folder." dropdown="dropdowns/dashboard/moveto" dropdowntitle="Move To">${moveto}Move To Folder</button>
  <button class="dTileDropAction" option="movefrom" style="display: none" title="Remove this lesson from the folder.">${moveto}Remove From Folder</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="rename" title="Rename this lesson.">${rename}Rename</button>
  <button class="dTileDropAction" option="copy" title="Create a duplicate of this lesson.">${copy}Duplicate</button>
  <button class="dTileDropAction" option="deletelesson" dashboard dropdown="dropdowns/editor/file/delete" style="--themeColor: var(--error)" title="Remove this lesson from your dashboard.">${trash}<span>Delete</span></button>
  `;
  css = {
    ".dTileDropAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".dTileDropAction:not(:last-child)": `margin-bottom: 4px`,
    ".dTileDropAction svg": `width: 24px; height: 24px; padding: 2px; margin-right: 8px !important; background: var(--pageColor); border-radius: 4px`,
    ".dTileDropAction:hover": `background: var(--themeColor); color: #fff`,
    ".dTileDropLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async (frame, extra) => {
    let lessonID = extra.lessonID;
    let lessons = extra.lessons;
    let lesson = lessons[lessonID];
    if (lesson == null) {
      return;
    }
    let record = lesson.record;
    if (record == null) {
      return;
    }
    let tile = extra.tile;
    let joinMethod = record.join ?? "owner";
    let isOwner = joinMethod == "owner";
    let folderID = record.folder;
    let openButton = frame.querySelector('.dTileDropAction[option="open"]');
    openButton.addEventListener("click", () => {
      if (joinMethod.startsWith("pin_") == true) {
        setFrame("pages/app/join", null, { params: { pin: joinMethod.substring(4) }});
      } else if (joinMethod == "link") {
        setFrame("pages/app/join", null, { params: { lesson: lessonID } });
      } else {
        setFrame("pages/app/lesson", null, { params: { lesson: lessonID } });
      }
    });
    let newTabButton = frame.querySelector('.dTileDropAction[option="opennewtab"]');
    newTabButton.addEventListener("click", () => {
      window.open(tile.getAttribute("href"), "_blank").focus();
    });
    let moveToButton = frame.querySelector('.dTileDropAction[option="moveto"]');
    moveToButton.addEventListener("click", () => {
      this.open(moveToButton, import("@modules/dropdowns/MoveTo.js"), { parent: extra.parent, lessons: lessons, lessonID: lessonID, lesson: lesson, record: record });
    });
    let moveFromButton = frame.querySelector('.dTileDropAction[option="movefrom"]');
    if (folderID != null) {
      moveFromButton.style.removeProperty("display");
    }
    moveFromButton.addEventListener("click", async () => {
      moveFromButton.setAttribute("disabled", "");
      let [code] = await sendRequest("POST", "lessons/folders/movefrom?lesson=" + lessonID);
      moveFromButton.removeAttribute("disabled");
      if (code == 200) {
        /*delete extra.lessons[lessonID].record.parent;
        if (extra.parent.sort.length > 20 && extra.parent.sort != folderID) {
          let lessonContent = tile.closest(".content");
          let noLessons = lessonContent.querySelector(".dNoLessons");
          tile.remove();
          if (noLessons != null && lessonContent.querySelector(".dTiles").childElementCount < 1) {
            noLessons.style.removeProperty("display");
          }
        }*/
        alertModule.open("worked", "<b>Moved Lesson</b><div>The lesson has been removed from the folder.");
        dropdownModule.close();
      }
    });
    let renameButton = frame.querySelector('.dTileDropAction[option="rename"]');
    let titleText = tile.querySelector(".dTileTitle");
    titleText.removeAttribute("prevtitle");
    renameButton.addEventListener("click", async () => {
      if (titleText.hasAttribute("prevtitle") == false) {
        titleText.setAttribute("prevtitle", titleText.textContent);
      }
      //titleText.textContent = "";
      titleText.setAttribute("contenteditable", "");
      dropdownModule.close();

      titleText.removeEventListener("keydown", lesson.keyDownListener);
      titleText.removeEventListener("focusout", lesson.focusListener);
      titleText.removeEventListener("paste", lesson.pasteListener);

      lesson.focusListener = async () => {
        titleText.removeAttribute("contenteditable");
        let name = titleText.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
        if (name.replace(/ /g, "").length < 1) {
          titleText.textContent = titleText.getAttribute("prevtitle");
          return;
        }
        if (titleText.textContent == titleText.getAttribute("prevtitle")) {
          return;
        }
        titleText.textContent = name;
        let [code] = await sendRequest("POST", "lessons/name?lesson=" + lessonID, { name: name });
        if (code != 200) {
          titleText.textContent = titleText.getAttribute("prevtitle");
        }
      };
      titleText.addEventListener("focusout", lesson.focusListener);
      lesson.keyDownListener = (event) => {
        if (event.keyCode == 13) {
          event.preventDefault();

          titleText.removeEventListener("keydown", lesson.keyDownListener);
          titleText.removeEventListener("focusout", lesson.focusListener);
          titleText.removeEventListener("paste", lesson.pasteListener);
          
          lesson.focusListener();
          return;
        }
      };
      titleText.addEventListener("keydown", lesson.keyDownListener);
      lesson.pasteListener = (event) => {
        // Cancel paste
        event.preventDefault();
  
        // Insert text manually
        document.execCommand("insertHTML", false, (event.originalEvent ?? event).clipboardData.getData("text/plain"));
      }
      titleText.addEventListener("paste", lesson.pasteListener);

      await sleep(1);
      if (window.getSelection != null && document.createRange != null) {
        let range = document.createRange();
        range.selectNodeContents(titleText);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.body.createTextRange != null) {
        let range = document.body.createTextRange();
        range.moveToElementText(titleText);
        range.select();
      } else {
        titleText.focus();
      }
    });
    let copyButton = frame.querySelector('.dTileDropAction[option="copy"]');
    copyButton.addEventListener("click", async () => {
      copyButton.setAttribute("disabled", "");
      let copyAlert = await alertModule.open("info", "<b>Creating Copy</b><div>Creating a copy of this lesson.", { time: "never" });
      let path = "lessons/copy?lesson=" + lessonID;
      if (folderID != null){
        path += "&folder=" + folderID;
      }
      let [code] = await sendRequest("POST", path);
      copyButton.removeAttribute("disabled");
      alertModule.close(copyAlert);
      if (code == 200) {
        dropdownModule.close();
        await alertModule.open("info", "<b>Copy Created</b><div>The lesson has been added to the top of your dashboard.");
      }
    });
    let deleteButton = frame.querySelector('.dTileDropAction[option="deletelesson"]');
    deleteButton.addEventListener("click", () => {
      this.open(deleteButton, import("@modules/dropdowns/Remove"), { parent: extra.parent, type: "deletelesson", lessons: lessons, lessonID: lessonID, lesson: lesson, record: record, isOwner: isOwner });
    });
    
    if (isOwner == false) {
      renameButton.remove();
      copyButton.remove();
      deleteButton.querySelector("span").textContent = "Remove";
    }
  }
}