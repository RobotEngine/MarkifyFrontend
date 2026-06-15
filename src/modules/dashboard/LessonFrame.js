import { assetURL, sleep, timeSince, formatFullDate, getEpoch, sendRequest } from "@/crucial";

import { more as moreIcon } from "@modules/utility/core-icons";
import memberCountIcon from "@assets/dashboard/membercount.svg?raw";
import noLessonsImg from "@assets/dashboard/nolessons.png?no-inline";

export class LessonFrame {
  html = `<div class="dTiles"></div>
  <div class="dNoLessons">
    <img class="dNoLessonsImage" src="${noLessonsImg}" />
    <div class="dNoLessonsTitle">No Lessons... Yet!</div>
    <div class="dNoLessonsDesc">Try a different sort, or create a new lesson at the top of the sidebar.</div>
  </div>`;
  css = {
    ".dTiles": `position: relative; display: grid; width: 100%; grid-gap: 20px; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); transition: .4s`, // min-height: 100%;
    ".dTile": `--themeColorRGB: var(--themeRGB); --hoverColor: var(--hover); position: relative; display: flex; flex-direction: column; --themeColor: rgb(var(--themeColorRGB)); --hoverSize: 0px; --shadowOpacity: 0; aspect-ratio: 4/3; border-radius: calc(13px + var(--hoverSize)); text-decoration: none; outline-offset: 4px`,
    ".dTile:hover, .dTile:focus-within": `--hoverSize: 4px; --shadowOpacity: .5`,
    ".dTile:before": `content: ""; position: absolute; width: calc(100% + (var(--hoverSize) * 2)); height: calc(100% + (var(--hoverSize) * 2)); left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeColorRGB), var(--shadowOpacity)); border-radius: calc(18px + var(--hoverSize)); z-index: 1; transition: .2s`,
    ".dTileThumbnailHolder": `box-sizing: border-box; display: flex; gap: 6px; flex: 1; width: 100%; padding: 6px 6px 0; z-index: 2`,
    ".dTileThumbnail": `position: relative; flex: 1; height: 100%; object-fit: cover; box-shadow: 0px 0px 4px 0px rgba(var(--themeColorRGB), .5); border-radius: 6px; overflow: hidden; pointer-events: none`,
    ".dTileThumbnail:first-child": `border-top-left-radius: 12px; border-bottom-left-radius: 12px`,
    ".dTileThumbnail:last-child": `border-top-right-radius: 12px; border-bottom-right-radius: 12px`,
    
    '.dTileThumbnail[tool="board"]': `--themeColorRGB: var(--themeRGB); order: 1`,
    '.dTileThumbnail[tool="breakout"]': `--themeColorRGB: var(--breakoutThemeRGB); order: 2`,
    
    ".dTileThumbnail img": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; object-position: top center; opacity: 0; transition: .4s`,
    'html[theme="dark"] .dTileThumbnail img': `filter: brightness(50%)`,
    ".dTile:hover .dTileThumbnail img": `filter: brightness(100%)`,
    
    ".dTileInfoHolder": `display: flex; box-sizing: border-box; width: 100%; padding: 12px; align-items: flex-end; z-index: 2`,
    ".dTileInfo": `width: 100%; margin-right: 6px`,
    ".dTileTitle": `box-sizing: border-box; width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".dTileTitle[contenteditable]": `padding: 2px 4px; margin-bottom: 4px; max-height: 100px; outline: solid 2px var(--themeColor); outline-offset: 0; border-radius: 4px; overflow: auto; cursor: text`,
    ".dTileLastOpened": `width: 100%; color: var(--themeColor); margin-top: 4px; font-size: 13px; font-weight: 600; text-align: left`,
    ".dTileMemberCount": `display: none; box-sizing: border-box; padding: 6px 10px 6px 6px; margin: 4px 0; align-items: center; background: var(--pageColor); box-shadow: inset var(--lightShadow); border-radius: 18px`,
    ".dTileMemberCount div[icon]": `width: 22px; height: 22px; flex-shrink: 0`,
    ".dTileMemberCount div[icon] svg": `width: 100%; height: 100%`,
    ".dTileMemberCount div[count]": `color: var(--themeColor); margin-left: 4px; font-size: 16px; font-weight: 600; white-space: nowrap`,
    ".dTileOptions": `display: flex; width: 34px; height: 34px; margin: 4px 4px 4px 6px; flex-shrink: 0; justify-content: center; align-items: center; border-radius: 18px; transition: .2s`,
    ".dTileOptions svg": `--secondary: var(--themeColor); flex-shrink: 0; width: 26px; height: 26px`,
    ".dTileOptions:hover": `background: var(--hoverColor)`,

    //'.dTile[tool="board"]': `--themeColorRGB: var(--themeRGB); --hoverColor: var(--hover)`,
    //'.dTile[tool="breakout"]': `--themeColorRGB: var(--breakoutThemeRGB); --hoverColor: var(--breakoutHover)`,
    //'.dTile[tool="board;breakout"]': `--themeColorRGB: var(--themeRGB); --hoverColor: var(--hover)`,

    ".dNoLessons": `display: flex; flex-direction: column; width: 100%; height: fit-content; align-items: center`,
    ".dNoLessonsImage": `width: 100%; max-width: 500px; margin-top: 32px`,
    ".dNoLessonsTitle": `margin-top: 24px; font-size: 32px; font-weight: 700; color: var(--theme)`,
    ".dNoLessonsDesc": `max-width: 350px; margin-top: 8px; font-size: 18px; font-weight: 500`
  };

  allLoaded = false;
  //lastLoadedTime = null;

  tiles = {};

  async fetchLessons(extra = {}) {
    let path = "lessons";
    if (this.sort.length > 20) { // Folder
      path += "?section=folder&folder=" + this.sort;
    } else if (this.sort != "search") { // Sort
      path += "?section=" + this.sort;
    } else if (extra.search != null) { // Search
      path += "?search=" + encodeURIComponent(extra.search);
    }
    let lastRecord = this.records[this.records.length - 1];
    if (lastRecord != null) {
      let lastLesson = this.parent.lessons[lastRecord.split("_")[0]];
      path += "&before=" + this.parent.checkTime(this.sort, { ...lastLesson, ...lastLesson.record });
    }
    let [code, body] = await sendRequest("GET", path);
    if (code != 200) {
      return;
    }
    let newRecords = body[this.sort] ?? body.recent;
    if (newRecords.length < this.parent.loadAmount) {
      this.allLoaded = true;
    }
    for (let i = 0; i < body.lessons.length; i++) {
      let lesson = body.lessons[i];
      this.parent.lessons[lesson._id] = { ...(this.parent.lessons[lesson._id] ?? {}), ...lesson };
    }
    this.parent.addRecords(this.records, newRecords);
    if (body.folders != null && this.sort != "search") {
      let folderIDs = [];
      for (let i = 0; i < body.folders.length; i++) {
        let folder = body.folders[i];
        folderIDs.push(folder._id);
        this.parent.folders[folder._id] = { render: folder, folders: [] };
      }
      if (this.folder != null) {
        this.folder.folders = folderIDs;
        if (folderIDs.length < this.parent.loadAmount) {
          this.folder.loaded = true;
        }
      }
    }
  }

  addThumbnail(thumbnailHolder, tool, lesson) {
    if (thumbnailHolder == null) {
      return;
    }
    
    let thumbnail = thumbnailHolder.querySelector('.dTileThumbnail[tool="' + tool + '"]');
    if (thumbnail == null) {
      thumbnail = document.createElement("div");
      thumbnail.className = "dTileThumbnail";
      thumbnail.setAttribute("tool", tool);
      //thumbnail.innerHTML = `<img src="../images/dashboard/placeholder.png" />`;
      thumbnailHolder.appendChild(thumbnail);
    }

    let toolData = lesson[tool] ?? {};
    if (toolData.thumbnail != null && thumbnail.getAttribute("image") != toolData.thumbnail) {
      (async () => {
        let removeImages = [];
        for (let i = 0; i < thumbnail.children.length; i++) {
          let image = thumbnail.children[i];
          if (image != null) {
            removeImages.push(image);
            image.style.opacity = 1;
          }
        }
        await sleep(400);
        for (let i = 0; i < removeImages.length; i++) {
          let image = removeImages[i];
          if (image != null) {
            image.remove();
          }
        }
      })();
      let image = document.createElement("img");

      let errorListener = () => {
        image.remove();
      }
      let completeListener = async () => {
        image.style.opacity = 1;
        image.removeEventListener("error", errorListener);
        image.removeEventListener("load", completeListener);
      }
      image.addEventListener("error", errorListener);
      image.addEventListener("load", completeListener);

      image.src = assetURL + toolData.thumbnail;
      thumbnail.appendChild(image);
    }
  }
  updateTile(record, lesson, tile) {
    if (lesson == null) {
      return;
    }
    let merged = { ...lesson, ...(record ?? {}) };
    let id = merged.lesson ?? merged._id;

    if (tile == null) {
      tile = this.tiles[id];
      if (tile == null) {
        return;
      }
    }

    let title = tile.querySelector(".dTileTitle");
    let titleText = lesson.name ?? "Untitled Lesson";
    title.textContent = titleText;
    title.title = titleText;

    let tool = lesson.tool ?? ["board"];
    let thumbnailHolder = tile.querySelector(".dTileThumbnailHolder");
    if (tool.includes("board") == true) {
      this.addThumbnail(thumbnailHolder, "board", lesson);
    }
    if (tool.includes("breakout") == true) {
      this.addThumbnail(thumbnailHolder, "breakout", lesson);
    }

    let memberCount = tile.querySelector(".dTileMemberCount");
    if (lesson.membersUpdate && lesson.membersUpdate < getEpoch() - 300000) {
      lesson.members = 0;
    }
    if (lesson.members > 0) {
      memberCount.querySelector("div[count]").textContent = lesson.members;
      memberCount.style.display = "flex";
    } else {
      memberCount.style.removeProperty("display");
    }

    if (record != null) {
      let time = this.parent.checkTime(this.sort, merged);
      tile.setAttribute("time", time);
      let openedTx = tile.querySelector(".dTileLastOpened");
      openedTx.textContent = timeSince(time, true);
      openedTx.title = formatFullDate(time);

      let join = record.join ?? "owner";
      tile.setAttribute("join", join);
      if (join.startsWith("pin_")) {
        tile.href = "/app/join?pin=" + join.substring(4);
      } else if (join == "link") {
        tile.href = "/app/lesson?lesson=" + id;
      } else {
        tile.href = "/app/lesson?lesson=" + id;
      }
    }
  }
  addTile(record, lesson, insertFirst) {
    if (lesson == null) {
      return;
    }
    let merged = { ...lesson, ...(record ?? {}) };
    let id = merged.lesson ?? merged._id;

    let firstChild;
    if (insertFirst == true) {
      let time = this.parent.checkTime(this.sort, merged);
      firstChild = this.tileHolder.firstChild;
      if (firstChild != null && time < parseInt(firstChild.getAttribute("time"))) {
        return;
      }
    }

    let tile = this.tiles[id];
    let newTile = tile == null;
    if (newTile == true) {
      tile = document.createElement("a");
      this.tiles[id] = tile;

      tile.className = "dTile";
      tile.setAttribute("draggable", "false");
      tile.setAttribute("lesson", id);

      tile.innerHTML = `<div class="dTileThumbnailHolder"></div>
      <div class="dTileInfoHolder">
        <div class="dTileInfo">
          <div class="dTileTitle"></div>
          <div class="dTileLastOpened"></div>
        </div>
        <div class="dTileMemberCount" title="Active Members">
          <div icon>${memberCountIcon}</div>
          <div count></div>
        </div>
        <button class="dTileOptions" dropdowntitle="Options">${moreIcon}</button>
      </div>`;
    }

    this.updateTile(record, lesson, tile);

    if (insertFirst == true) {
      if (firstChild != null) {
        this.tileHolder.insertBefore(tile, firstChild);
      } else {
        this.tileHolder.appendChild(tile);
      }
    } else if (newTile == true) {
      this.tileHolder.appendChild(tile);
    }
  }
  removeTile(id) {
    let tile = this.tiles[id];
    if (tile != null) {
      tile.remove();
      delete this.tiles[id];
    }
  }

  checkNoLessons() {
    if (this.tileHolder.childElementCount > 0) {
      this.noLessons.style.display = "none";
    } else {
      this.noLessons.style.removeProperty("display");
    }
  }

  async checkLoadMore(recursive) {
    if (this.allLoaded == true) {
      return;
    }
    if (this.loadingMore == true) {
      return;
    }
    if (
      (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight + 500 < this.scrollContainer.scrollHeight)
      && (this.tileHolder.clientHeight > this.scrollContainer.clientHeight)
    ) {
      return;
    }
    this.loadingMore = true;

    this.tileHolder.setAttribute("disabled", "");

    if (this.tileHolder.childElementCount >= this.records.length) {
      if (this.sort != "search") {
        await this.fetchLessons();
      } else {
        this.allLoaded = true;
      }
    }

    if (this.tileHolder == null) {
      return;
    }

    let count = this.tileHolder.childElementCount;
    for (let i = count; i < Math.min(this.records.length - count, this.parent.loadAmount) + count; i++) {
      let lesson = this.parent.lessons[this.records[i].split("_")[0]];
      if (lesson == null) {
        this.records.splice(i, 1);
        i--;
        continue;
      }
      this.addTile(lesson.record, lesson);
    }
    
    this.tileHolder.removeAttribute("disabled");

    this.loadingMore = false;

    await this.checkLoadMore(true);

    if (recursive != true) {
      this.checkNoLessons();
      this.parent.updateSubscribe();
    }
  }
  scroll = () => { this.checkLoadMore(); }
  resize = () => { this.checkLoadMore(); }

  async js(frame, { search }) {
    this.tileHolder = frame.querySelector(".dTiles");
    this.noLessons = frame.querySelector(".dNoLessons");
    this.scrollContainer = frame.closest(".dLessonsHolder");

    this.records = this.parent.records[this.sort];
    this.folder = this.parent.folders[this.sort];

    if (search != null) {
      this.records = null;
    }

    if (this.records == null || (this.folder != null && this.folder.loaded != true)) {
      this.parent.records[this.sort] = [];
      this.records = this.parent.records[this.sort];
      await this.fetchLessons({ search });
    }
    if (this.records.length < this.parent.loadAmount) {
      this.allLoaded = true;
    }

    for (let i = 0; i < Math.min(this.records.length, this.parent.loadAmount); i++) {
      let lesson = this.parent.lessons[this.records[i].split("_")[0]];
      if (lesson == null) {
        this.records.splice(i, 1);
        i--;
        continue;
      }
      this.addTile(lesson.record, lesson);
    }
    this.checkNoLessons();
    this.parent.updateSubscribe();

    this.checkLoadMore();
  }
}