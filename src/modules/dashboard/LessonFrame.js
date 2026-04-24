import {
  assetURL,

  sleep,
  timeSince,
  formatFullDate,
  getEpoch,
  sendRequest
} from "@/crucial";

import { more } from "@modules/utility/coreicons";
import membercount from "@assets/dashboard/membercount.svg?raw";

export class LessonFrame {
  html = `
  <div class="dTiles"></div>
  <div class="dNoLessons">
    <img class="dNoLessonsImage" src="../images/dashboard/nolessons.png" />
    <div class="dNoLessonsTitle">No Lessons... Yet!</div>
    <div class="dNoLessonsDesc">Try a different sort, or create a new lesson at the top of the sidebar.</div>
  </div>
  `;
  css = {
    ".dTiles": `position: relative; display: grid; width: 100%; grid-gap: 20px; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); transition: .4s`, // min-height: 100%;
    ".dTile": `position: relative; background: var(--pageColor); --themeColor: rgb(var(--themeColorRGB)); --shadowOpacity: .3; --shadow: 0px 0px 8px 0px rgba(var(--themeColorRGB), var(--shadowOpacity)); box-shadow: var(--shadow); border-radius: 16px; overflow: hidden; transition: .2s`,
    ".dTile:hover": `--shadowOpacity: .5`,
    ".dTileThumbnailHolder": `position: relative; width: 100%; aspect-ratio: 4/3`,
    ".dTileThumbnail": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; border-radius: 12px; opacity: 0; pointer-events: none`,
    'html[theme="dark"] .dTileThumbnail': `filter: brightness(50%)`,
    ".dTile:hover .dTileThumbnail": `filter: brightness(100%)`,
    ".dTileInfoHolder": `position: absolute; display: flex; box-sizing: border-box; width: 100%; padding: 10px; left: 0px; bottom: 0px; align-items: flex-end; background: var(--pageColor); box-shadow: var(--shadow); transition: .2s`,
    ".dTileInfo": `width: 100%`,
    ".dTileTitle": `box-sizing: border-box; width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".dTileTitle[contenteditable]": `padding: 2px 4px; margin-bottom: 4px; max-height: 100px; outline: solid 2px var(--themeColor); border-radius: 4px; overflow: auto; cursor: text`,
    ".dTileLastOpened": `width: 100%; color: var(--themeColor); margin-top: 2px; font-size: 14px; font-weight: 600; text-align: left`,
    ".dTileOptions": `display: flex; width: 34px; height: 34px; margin: 4px; flex-shrink: 0; justify-content: center; align-items: center; border-radius: 18px`,
    ".dTileOptions svg": `flex-shrink: 0; width: 32px; height: 32px`,
    ".dTileOptions:hover": `background: var(--hoverColor)`,
    ".dTileMemberCount": `position: absolute; display: flex; box-sizing: border-box; padding: 6px; right: 0px; top: 0px; align-items: center; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 0 0 0 12px; opacity: 0; transition: .4s`,
    ".dTileMemberCount div[icon]": `width: 22px; height: 22px`,
    ".dTileMemberCount div[icon] svg": `width: 100%; height: 100%`,
    ".dTileMemberCount div[count]": `color: var(--themeColor); margin-left: 4px; font-size: 16px; font-weight: 600`,

    '.dTile[tool="board"]': `--themeColorRGB: var(--themeRGB); --hoverColor: var(--hover)`,
    '.dTile[tool="breakout"]': `--themeColorRGB: var(--breakoutThemeRGB); --hoverColor: var(--breakoutHover)`,
    '.dTile[tool="board;breakout"]': `--themeColorRGB: var(--themeRGB); --hoverColor: var(--hover)`,

    ".dNoLessons": `display: flex; flex-direction: column; width: 100%; height: fit-content; align-items: center`,
    ".dNoLessonsImage": `width: 100%; max-width: 500px; margin-top: 32px`,
    ".dNoLessonsTitle": `margin-top: 24px; font-size: 32px; font-weight: 700; color: var(--theme)`,
    ".dNoLessonsDesc": `max-width: 350px; margin-top: 8px; font-size: 18px; font-weight: 500`
  };
  async js(frame, extra) {
    let button = extra.button;
    let sort = extra.sort;
    let records = extra.records[sort];
    let lessons = extra.lessons;
    let folders = extra.folders;
    let thisFolder = folders[sort];
    let tileHolder = frame.querySelector(".dTiles");
    let noLessons = frame.querySelector(".dNoLessons");
    let scrollContainer = frame.closest(".dLessonsHolder");
    let allLoaded = false;

    extra.scrollEventPass = async (event, loop, first) => {
      if (this.eventUpdate != null) {
        await this.eventUpdate(event, loop, first);
      }
    }

    if (sort == "search") {
      records = null;
    }
    let loadMoreLessons = async () => {
      let path = "lessons";
      if (sort.length > 20) { // Folder
        path += "?section=folder&folder=" + sort;
        if (button != null) {
          button.setAttribute("disabled", "");
        }
      } else if (sort != "search") { // Sort
        path += "?section=" + sort;
      } else { // Search
        path += "?search=" + encodeURIComponent(button.value);
      }
      let lastRecord = records[records.length - 1];
      if (lastRecord != null) {
        let lastLesson = lessons[lastRecord.split("_")[0]];
        let time = this.parent.checkTime(sort, { ...lastLesson, ...lastLesson.record });
        path += "&before=" + time;
      }
      let [code, body] = await sendRequest("GET", path);
      if (code != 200) {
        return;
      }
      let newRecords = body[sort] ?? body.recent;
      if (newRecords.length < this.parent.loadAmount) {
        allLoaded = true;
      }
      //extra.records[sort] = [...records, ...newRecords];
      //records = extra.records[sort];
      for (let i = 0; i < body.lessons.length; i++) {
        let lesson = body.lessons[i];
        lessons[lesson._id] = { ...(lessons[lesson._id] ?? {}), ...lesson };
      }
      this.parent.addRecords(records, newRecords);
      if (body.folders != null && button != null && sort != "search") {
        let folderIDs = [];
        for (let i = 0; i < body.folders.length; i++) {
          let folder = body.folders[i];
          folderIDs.push(folder._id);
          folders[folder._id] = folder;
        }
        thisFolder.folders = folderIDs;
        if (body.folders.length >= this.parent.loadAmount) {
          thisFolder.doneLoading = false;
        }
        button.removeAttribute("disabled");
      }
    }
    if (records == null || (thisFolder != null && thisFolder.folders == null)) {
      extra.records[sort] = [];
      records = extra.records[sort];
      await loadMoreLessons();
    }
    if (records.length < this.parent.loadAmount) {
      allLoaded = true;
    }

    this.parent.addLessonTile = (record, lesson, time, insertFirst) => {
      if (lesson == null) {
        return;
      }
      lesson.record = record;
      let insertAdj = "beforeend";
      if (insertFirst == true) {
        insertAdj = "afterbegin";
      }
      if (insertFirst == true && tileHolder.firstChild != null && time < parseInt(tileHolder.firstChild.getAttribute("time"))) {
        return;
      }
      let existingTile = tileHolder.querySelector('.dTile[lesson="' + record.lesson + '"');
      if (existingTile != null) {
        existingTile.remove();
      }
      tileHolder.insertAdjacentHTML(insertAdj, `<a class="dTile" draggable="false" new>
        <div class="dTileThumbnailHolder">
          <img class="dTileThumbnail" src="../images/dashboard/placeholder.png" />
          <img class="dTileThumbnail" main />
        </div>
        <div class="dTileInfoHolder">
          <div class="dTileInfo">
            <div class="dTileTitle"></div>
            <div class="dTileLastOpened"></div>
          </div>
          <button class="dTileOptions" dropdowntitle="Options">${more}</button>
        </div>
        <div class="dTileMemberCount" title="Active Members">
          <div icon>${membercount}</div>
          <div count></div>
        </div>
      </a>`);
      let tile = tileHolder.querySelector(".dTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("lesson", record.lesson);
      tile.setAttribute("time", time);
      tile.setAttribute("tool", (lesson.tool ?? ["board"]).join(";"));
      //setSVG(tile.querySelector(".dTileOptions"), "../images/dashboard/more.svg");
      //setSVG(tile.querySelector(".dTileMemberCount div[icon]"), "../images/dashboard/membercount.svg");
      let placeholderThumbnail = tile.querySelector(".dTileThumbnail[src]");
      let thumbnail = tile.querySelector(".dTileThumbnail[main]");
      if (lesson.thumbnail != null) {
        let loadingTimeout = setTimeout(() => {
          placeholderThumbnail.style.transition = ".4s";
          placeholderThumbnail.style.opacity = 1;
        }, 10);
        let completeListener = async () => {
          thumbnail.removeEventListener("error", errorListener);
          thumbnail.removeEventListener("load", completeListener);

          clearTimeout(loadingTimeout);
          thumbnail.style.opacity = 1;
          placeholderThumbnail.style.opacity = 0;
          await sleep(400);
          placeholderThumbnail.remove();
        }
        let errorListener = () => {
          clearTimeout(loadingTimeout);
          thumbnail.remove();
        }
        thumbnail.addEventListener("error", errorListener);
        thumbnail.addEventListener("load", completeListener);
        thumbnail.src = assetURL + lesson.thumbnail;
        thumbnail.style.transition = ".4s";
      } else {
        placeholderThumbnail.style.opacity = 1;
      }
      let title = tile.querySelector(".dTileTitle");
      let titleText = lesson.name ?? "Untitled Lesson";
      title.textContent = titleText;
      title.title = titleText;
      let openedTx = tile.querySelector(".dTileLastOpened");
      openedTx.textContent = timeSince(time, true);
      openedTx.title = formatFullDate(time);
      if (lesson.membersUpdate && lesson.membersUpdate < getEpoch() - 300000) {
        lesson.members = 0;
      }
      if (lesson.members > 0) {
        let memberCount = tile.querySelector(".dTileMemberCount");
        memberCount.querySelector("div[count]").textContent = lesson.members;
        memberCount.style.opacity = 1;
      }
      let join = record.join ?? "owner";
      tile.setAttribute("join", join);
      if (join.startsWith("pin_")) {
        tile.href = "/app/join?pin=" + join.substring(4);
      } else if (join == "link") {
        tile.href = "/app/lesson?lesson=" + record.lesson;
      } else {
        tile.href = "/app/lesson?lesson=" + record.lesson;
      }
    }
    for (let i = 0; i < Math.min(records.length, this.parent.loadAmount); i++) {
      let lesson = lessons[records[i].split("_")[0]];
      if (lesson == null) {
        records.splice(i, 1);
        i--;
        continue;
      }
      let record = lesson.record;
      let time = this.parent.checkTime(sort, { ...lesson, ...record });
      this.parent.addLessonTile(record, lesson, time, false);
    }
    if (tileHolder.childElementCount > 0) {
      noLessons.style.display = "none";
    }

    let alreadyRunningEvent = false;
    this.eventUpdate = async (event, loop, first) => {
      if (alreadyRunningEvent == true && first != false) {
        return;
      }
      alreadyRunningEvent = true;
      if (allLoaded == true) {
        if (first != false) {
          alreadyRunningEvent = false;
        }
        return;
      }
      if (scrollContainer.scrollTop + scrollContainer.clientHeight + 500 < scrollContainer.scrollHeight && tileHolder.clientHeight > scrollContainer.clientHeight) {
        if (first != false) {
          alreadyRunningEvent = false;
        }
        return;
      }
      if (tileHolder.childElementCount >= records.length && sort != "search") { //records.length - tileHolder.childElementCount < this.parent.loadAmount
        tileHolder.setAttribute("disabled", "");
        await loadMoreLessons();
        if (tileHolder == null) {
          return;
        }
        tileHolder.removeAttribute("disabled");
      }
      let count = tileHolder.childElementCount;
      for (let i = count; i < Math.min(records.length - count, this.parent.loadAmount) + count; i++) {
        let lesson = lessons[records[i].split("_")[0]];
        if (lesson == null) {
          records.splice(i, 1);
          i--;
          continue;
        }
        let record = lesson.record;
        let time = this.parent.checkTime(sort, { ...lesson, ...record });
        this.parent.addLessonTile(record, lesson, time, false);
      }
      if (tileHolder.childElementCount > 0) {
        noLessons.style.display = "none";
      }
      if (loop == true) {
        await this.eventUpdate(event, loop, false);
      }
      if (first != false) {
        this.parent.updateDashSub();
        alreadyRunningEvent = false;
      }
    }
    this.eventUpdate(null, true);

    if (thisFolder != null && button != null) {
      if (button.hasAttribute("opened") == false) {
        button.setAttribute("opened", "");
        for (let i = 0; i < thisFolder.folders.length; i++) {
          this.parent.addFolderTile(folders[thisFolder.folders[i]], button.parentElement);
        }
        if (thisFolder.doneLoading == false) {
          button.parentElement.insertAdjacentHTML("beforeend", `<div class="dTileDropFolderLoadMore"><button class="buttonAnim border">View More</button></div>`);
        }
        this.parent.updateScrollShadows();
      } else if (extra.prevSort == sort) {
        button.removeAttribute("opened", "");
        for (let i = 0; i < button.parentElement.children.length; i++) {
          let child = button.parentElement.children[i];
          if (child.nodeName == "DIV") {
            child.remove();
            i--;
          }
        }
        this.parent.updateScrollShadows();
      }
    }

    this.parent.updateDashSub();
  }
}