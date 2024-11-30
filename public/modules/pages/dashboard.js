modules["pages/dashboard"] = class {
  title = "Dashboard";
  preJs = function () {
    if (userID == null) {
      promptLogin();
      return false;
    }
    modifyParams("lesson");
    modifyParams("page");
    modifyParams("annotation");
    modifyParams("pin");
  }
  html = `<div class="dPageHolder">
    <div class="dPage">
      <div class="dSidebarHolder">
        <div class="dSidebar">
          <img class="dBackdropImage" src="./images/dashboard/backdrop.svg" />
          <div class="dSidebarSection dSidebarHeader">
            <img class="dSidebarLogo" src="./images/logo.svg" />
            <a class="dJoinButton largeButton" openpage="join" href="#join">Join<img src="./images/tooltips/link.svg" /><div backdrop></div></a>
          </div>
          <div class="dSidebarSection dSidebarActions">
            <a class="dCreateLessonButton largeButton" openpage="lesson" href="#lesson">New Lesson<div backdrop></div></a>
          </div>
          <div class="dSidebarSection dSidebarSorts">
            <div class="dSidebarTitle"><div title>Sorts</div><div divider></div></div>
            <div class="dSidebarSearch border"><img src="./images/dashboard/search.svg" /><input placeholder="Search..."></input></div>
            <button class="dSidebarSort" sort="recent" selected>Recent</button>
            <button class="dSidebarSort" sort="shared">Shared</button>
            <button class="dSidebarSort" sort="owned">Owned</button>
            <button class="dSidebarSort" sort="newest">Newest</button>
          </div>
          <div class="dSidebarSection dSidebarFolders">
            <div class="dSidebarTitle"><div title>Folders</div><div divider></div><button class="dSidebarNewFolderButton"><img src="./images/dashboard/add.svg" /></button></div>
            <div class="dSidebarFolderHolder">
              <div class="dSidebarFolderParent"><a class="dSidebarFolder" style="--fillColor: var(--error)" inside>
                <div select></div>
                <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--folderFill)" stroke-width="30"/> </g> </svg>
                <div name>My Folder</div>
                <div arrow><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg></div>
              </a></div>
              <div class="dSidebarFolderParent"><a class="dSidebarFolder" style="--fillColor: var(--yellow)" inside>
                <div select></div>
                <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--folderFill)" stroke-width="30"/> </g> </svg>
                <div name>My Folder</div>
                <div arrow><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg></div>
              </a></div>
              <div class="dSidebarFolderParent"><a class="dSidebarFolder" style="--fillColor: var(--theme)" inside>
                <div select></div>
                <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--folderFill)" stroke-width="30"/> </g> </svg>
                <div name>My Folder</div>
                <div arrow><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg></div>
              </a></div>
              <div class="dSidebarFolderParent"><a class="dSidebarFolder" style="--fillColor: var(--green)" inside>
                <div select></div>
                <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--folderFill)" stroke-width="30"/> </g> </svg>
                <div name>My Folder</div>
                <div arrow><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg></div>
              </a></div>
            </div>
          </div>
          <div class="dSidebarSection dSidebarAccountHolder">
            <button class="dAccount largeButton border"><img src="./images/profiles/default.svg" accountimage /><div accountuser>Username</div><div backdrop></div></button>
          </div>
        </div>
      </div>
      <div class="dLessonsHolder">
        <div class="dSelectedTitleHolder"></div>
        <div class="dTilesHolder"></div>
      </div>
    </div>
  </div>`;
  css = {
    ".dPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100%; height: 100vh; padding: 8px; left: 0px; top: 0px; justify-content: center; transition: .2s`,
    ".dPage": `display: flex; width: 100%; height: 100%; max-width: 1565px; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden; transition: .2s`,
    
    ".dSidebarHolder": `position: relative; max-width: 270px; height: 100%; flex-shrink: 0; z-index: 2`,
    ".dBackdropImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 1; opacity: .75; object-fit: cover; pointer-events: none`,
    ".dSidebar": `display: flex; flex-direction: column; width: 100%; height: 100%; box-shadow: var(--darkShadow); overflow: auto`,
    ".dSidebarSection": `position: sticky; box-sizing: border-box; width: 100%; left: 0px; z-index: 2`,
    ".dSidebarTitle": `display: flex; gap: 8px; align-items: center`,
    ".dSidebarTitle div[title]": `color: var(--secondary); font-weight: 600; font-size: 16px`,
    ".dSidebarTitle div[divider]": `flex: 1; height: 4px; background: var(--hover); border-radius: 2px`,

    ".dSidebarHeader": `display: flex; gap: 8px; flex-wrap: wrap; padding: 8px; justify-content: space-between; align-items: center`,
    ".dSidebarLogo": `height: 36px`,
    ".dJoinButton": `padding: 4px 10px; font-size: 18px; --themeColor: var(--secondary); --themeColor2: var(--hover); --borderWidth: 3px; --borderRadius: 12px`,
    ".dJoinButton img": `width: 22px; height: 22px; margin-left: 4px`,

    ".dSidebarActions": `display: flex; flex-direction: column; gap: 8px; padding: 8px; margin: 8px 0; align-items: center`,
    ".dCreateLessonButton": `--themeColor: var(--theme); --borderRadius: 14px`,

    ".dSidebarSorts": `display: flex; flex-direction: column; gap: 8px; padding: 8px`,
    ".dSidebarSearch": `display: flex; box-sizing: border-box; width: calc(100% - 8px); margin: 4px; align-items: center; background: rgba(var(--background), .5); --borderColor: var(--hover); --borderWidth: 4px; --borderRadius: 12px`,
    ".dSidebarSearch img": `width: 28px; height: 28px; margin-left: 4px`,
    ".dSidebarSearch input": `width: 100%; padding: 6px 6px 6px 2px; background: unset; outline: unset; border: unset; color: var(--textColor); font-family: var(--font); font-weight: 600; font-size: 18px`,
    ".dSidebarSearch input::placeholder": `color: var(--hover)`,
    ".dSidebarSort": `width: 100%; padding: 6px 8px; border-radius: 8px; color: var(--textColor); font-weight: 600; font-size: 18px; text-align: left; transform-origin: center left`,
    ".dSidebarSort:hover": `background: var(--hover)`,
    ".dSidebarSort[selected]": `background: var(--secondary); color: #fff`,

    ".dSidebarFolders": `position: relative; display: flex; flex-direction: column; min-width: fit-content; gap: 8px; padding: 8px; margin-top: 6px`,
    ".dSidebarNewFolderButton": `display: flex; width: 28px; height: 28px; justify-content: center; align-items: center; border-radius: 14px`,
    ".dSidebarNewFolderButton:hover": `background: var(--hover)`,
    ".dSidebarNewFolderButton img": `width: 20px; height: 20px`,
    ".dSidebarFolderHolder": `width: max-content; min-width: 100%`,

    ".dSidebarFolderParent": `width: -webkit-fill-available`,
    ".dSidebarFolderParent[child]": `padding-left: 10px`,
    ".dSidebarFolder": `--fillColor: var(--theme); --themeColor: var(--fillColor); position: relative; display: flex; padding: 4px; margin-bottom: 6px; align-items: center`,
    ".dSidebarFolder[selected]": `--themeColor: #fff !important`,
    ".dSidebarFolder[selected] div[select]": `opacity: 1 !important`,
    ".dSidebarFolder[selected] div[name]": `color: #fff !important`,
    ".dSidebarFolder[inside]": `--folderFill: var(--themeColor)`,
    ".dSidebarFolder svg[folder]": `width: 28px; height: 28px; margin-left: 2px; z-index: 1`,
    ".dSidebarFolder div[select]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--fillColor); border-radius: 8px 18px 18px 8px; opacity: 0; transition: .1s`,
    ".dSidebarFolder:hover div[select]": `opacity: .2`,
    ".dSidebarFolder div[name]": `flex: 1; margin: 0 8px 0 4px; color: var(--textColor); font-size: 16px; font-weight: 600; z-index: 1; text-align: left`,
    ".dSidebarFolder div[name][contenteditable]": `padding: 2px 4px; outline: solid 3px var(--themeColor); border-radius: 4px; overflow: auto`,
    ".dSidebarFolder div[arrow]": `position: sticky; display: flex; width: 28px; height: 28px; right: 4px; margin-left: auto; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 14px; z-index: 1; transition: .1s`,
    ".dSidebarFolder div[arrow] svg": `width: 22px; height: 22px`,
    ".dSidebarFolder[loaded] div[arrow]": `transform: rotate(90deg)`,

    ".dSidebarAccountHolder": `display: flex; flex-direction: column; padding: 8px; bottom: 0px; margin-top: auto; align-items: center; transition: .2s`,
    ".dAccount": `display: flex; max-width: calc(100% - 16px); width: fit-content; padding: 6px 10px 6px 6px; --borderRadius: 18px`,
    ".dAccount img[accountimage]": `width: 32px; min-width: 32px; height: 32px; margin-right: 6px; object-fit: cover; border-radius: 16px`,
    ".dAccount div[accountuser]": `max-width: calc(100% - 38px); height: 100%; line-height: 32px; font-size: 18px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dropdownTitle div[accountuser]": `flex: unset`,

    ".dLessonsHolder": `position: relative; display: flex; flex-direction: column; width: 100%; min-height: 100%; overflow-y: auto; z-index: 1`,
    ".dSelectedTitleHolder": `position: sticky; display: flex; box-sizing: border-box; width: 100%; padding: 16px; top: 0px; z-index: 2; transition: .2s`,
    ".dSelectedTitle": `font-size: 28px; font-weight: 600; text-align: left`,
    ".dTilesHolder": `position: relative; width: calc(100% - 32px); min-height: fit-content; height: 100%; margin: 0px 16px 16px 16px; z-index: 1`,
  };
  js = async function (page, data) {
    let dashboardHolder = page.querySelector(".dPageHolder")
    let dashboard = dashboardHolder.querySelector(".dPage")
    let sidebar = dashboard.querySelector(".dSidebar");
    let lessonsHolder = dashboard.querySelector(".dLessonsHolder");
    let titleHolder = lessonsHolder.querySelector(".dSelectedTitleHolder");
    let tileHolder = dashboard.querySelector(".dTilesHolder");
    let accountHolder = sidebar.querySelector(".dSidebarAccountHolder");
    let accountButton = accountHolder.querySelector(".dAccount");
    
    // Display Account Details
    if (account.image != null) {
      accountButton.querySelector("img[accountimage]").src = account.image;
    }
    let username = accountButton.querySelector("div[accountuser]");
    username.textContent = account.user;
    username.title = account.user;
    accountButton.addEventListener("click", () => {
      dropdownModule.open(accountButton, "dropdowns/account", { parent: this });
    });

    let updateScrollShadows = () => {
      if (lessonsHolder.scrollTop > 0) { // Lesson Topbar Shadow:
        titleHolder.style.background = "var(--pageColor)";
        titleHolder.style.boxShadow = "var(--lightShadow)";
      } else {
        titleHolder.style.removeProperty("background");
        titleHolder.style.removeProperty("box-shadow");
      }

      if (sidebar.scrollTop < sidebar.scrollHeight - dashboard.offsetHeight) { // Account Holder Shadow:
        accountHolder.style.background = "var(--pageColor)";
        accountHolder.style.boxShadow = "var(--lightShadow)";
      } else {
        accountHolder.style.removeProperty("background");
        accountHolder.style.removeProperty("box-shadow");
      }
    }
    sidebar.addEventListener("scroll", updateScrollShadows);
    lessonsHolder.addEventListener("scroll", updateScrollShadows);

    // Update Page Resizing
    let sizeUpdate = () => {
      if (fixed.offsetWidth > 650 && fixed.offsetHeight > 400) {
        dashboardHolder.style.removeProperty("padding");
        dashboard.style.removeProperty("border-radius");
      } else {
        dashboardHolder.style.padding = "0px";
        dashboard.style.borderRadius = "0px";
      }
      if (fixed.offsetWidth > 650) {
        sidebar.style.removeProperty("position");
      } else {
        sidebar.style.position = "absolute";
      }
      updateScrollShadows();
    }
    tempListen(window, "resize", sizeUpdate);
    sizeUpdate();
    
    // Handle All Loading/Unloading of Lessons
    let sort = "recent";
    let records = {};
    let lessons = {};

    let [code, body] = await sendRequest("GET", "lessons?amount=50");
    if (code != 200) {
      return;
    }
    records.recent = body.recent;
    records.shared = body.shared;
    records.owned = body.owned;
    records.newest = body.newest;
    lessons = { ...lessons, ...getObject(body.lessons, "_id") };

    let updateTiles = async (firstLoad) => {
      if (sort.length > 20) { // Folder
        
      } else { // Sort
        titleHolder.innerHTML = `<div class="dSelectedTitle">${sort[0].toUpperCase() + sort.substring(1) + " Lessons"}</div>`;
      }
      lessonsHolder.scrollTo(0, 0);
      await this.setFrame("pages/dashboard/lessons", tileHolder, { sort: sort, records: records, lessons: lessons, firstLoad: firstLoad });
    }
    updateTiles(true);

    // Click Listener
    page.addEventListener("click", (event) => {
      let target = event.target;
      let button = target.closest("button");
      if (button == null) {
        return;
      }

      if (button.hasAttribute("sort") == true) {
        let currentSelected = sidebar.querySelector("button[selected]");
        if (currentSelected != null) {
          currentSelected.removeAttribute("selected");
        }
        sort = button.getAttribute("sort");
        button.setAttribute("selected", "");
        return updateTiles();
      }
    });
  }
}

modules["pages/dashboard/lessons"] = class {
  html = `<div class="dTiles"></div>`;
  css = {
    ".dTiles": `position: relative; display: grid; width: 100%; min-height: 100%; grid-gap: 16px; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr))`,
    ".dTile": `position: relative; background: var(--pageColor); --shadow: var(--lightShadow); box-shadow: var(--shadow); border-radius: 12px; overflow: hidden`,
    ".dTile:hover": `--shadow: var(--darkShadow)`,
    ".dTileThumbnail": `width: 100%; aspect-ratio: 4/3; object-fit: cover`,
    ".dTileInfoHolder": `position: absolute; display: flex; box-sizing: border-box; width: 100%; padding: 8px; left: 0px; bottom: 0px; align-items: flex-end; background: var(--pageColor); box-shadow: var(--shadow)`,
    ".dTileInfo": `width: 100%`,
    ".dTileTitle": `width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".dTileLastOpened": `width: 100%; color: var(--theme); margin-top: 2px; font-size: 14px; font-weight: 600; text-align: left`,
    ".dTileOptions": `display: flex; width: 34px; height: 34px; margin: 4px; flex-shrink: 0; justify-content: center; align-items: center; border-radius: 18px`,
    ".dTileOptions img": `width: 32px; height: 32px`,
    ".dTileOptions:hover": `background: var(--hover)`,
    ".dTileMemberCount": `position: absolute; display: flex; box-sizing: border-box; padding: 6px; right: 0px; top: 0px; align-items: center; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 0 0 0 12px; opacity: 0`,
    ".dTileMemberCount img": `width: 22px; height: 22px`,
    ".dTileMemberCount div": `color: var(--theme); margin-left: 4px; font-size: 16px; font-weight: 600`
  };
  js = async function (frame, extra) {
    let sort = extra.sort;
    let records = extra.records[sort] || [];
    let lessons = extra.lessons;
    let tileHolder = frame.querySelector(".dTiles");

    let loadMoreLessons = async () => {
      let path = "lessons";
      if (sort.length > 20) { // Folder
        path += "?folder=" + sort;
      } else { // Sort
        path += "?section=" + sort;
      }
      let lastRecord = records[(records.length - 1)];
      if (lastRecord != null) {
        let time = lastRecord.opened;
        switch (sort) {
          case "shared":
            time = lastRecord.added;
            break;
          case "newest":
            time = lastRecord.added; //(lessons[lastRecord.lesson] || {}).created;
        }
        path += "&before=" + time;
      }
      let [code, body] = await sendRequest("GET", path);
      if (code != 200) {
        return;
      }
      records = [...records, ...(body[sort] || body.recent)];
      lessons = { ...lessons, ...getObject(body.lessons, "_id") };
    }
    if (records.length < 1) {
      await loadMoreLessons();
    }

    let addTile = (record, lesson, time, insertFirst) => {
      if (lesson == null) {
        return;
      }
      let insertAdj = "beforeend";
      if (insertFirst == true) {
        insertAdj = "afterbegin";
      }
      let existingTile = tileHolder.querySelector('.dTile[lesson="' + record.lesson + '"');
      if (existingTile != null) {
        existingTile.remove();
      }
      if (insertFirst == true && tileHolder.firstChild != null && time < parseInt(tileHolder.firstChild.getAttribute("time"))) {
        return;
      }
      tileHolder.insertAdjacentHTML(insertAdj, `<a class="dTile" new>
        <img class="dTileThumbnail" src="./images/dashboard/missing.svg" />
        <div class="dTileInfoHolder">
          <div class="dTileInfo">
            <div class="dTileTitle"></div>
            <div class="dTileLastOpened"></div>
          </div>
          <button class="dTileOptions" dropdowntitle="Options"><img src="./images/dashboard/more.svg" /></button>
        </div>
        <div class="dTileMemberCount">
          <img src="./images/profiles/default.svg" />
          <div></div>
        </div>
      </a>`);
      let tile = tileHolder.querySelector(".dTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("lesson", record.lesson);
      tile.setAttribute("time", time);
      if (lesson.thumbnail != null) {
        tile.querySelector(".dTileThumbnail").src = assetURL + lesson.thumbnail;
      }
      let title = tile.querySelector(".dTileTitle");
      title.textContent = lesson.name ?? "Untitled Lesson";
      title.title = lesson.name ?? "Untitled Lesson";
      let openedTx = tile.querySelector(".dTileLastOpened");
      openedTx.textContent = timeSince(time, true);
      openedTx.title = formatFullDate(time);
      if (lesson.membersUpdate && lesson.membersUpdate < getEpoch() - 300000) {
        lesson.members = null;
      }
      if (lesson.members > 0) {
        let memberCount = tile.querySelector(".dTileMemberCount");
        memberCount.querySelector("div").textContent = lesson.members;
        memberCount.style.opacity = 1;
      }
      let join = record.join ?? "owner";
      tile.setAttribute("join", join);
      if (join.startsWith("pin_")) {
        tile.href = "?pin=" + join.substring(4) + "#join";
      } else if (join == "link") {
        tile.href = "?lesson=" + record.lesson + "#join";
      } else {
        tile.href = "?lesson=" + record.lesson + "#lesson";
      }
    }
    for (let i = 0; i < records.length; i++) {
      let record = records[i];
      let lesson = lessons[record.lesson];
      let time = record.opened || record.added;
      switch (sort) {
        case "shared":
          time = record.added;
          break;
        case "newest":
          time = record.added;
      }
      addTile(record, lesson, time, false);
    }
  }
}