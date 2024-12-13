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
        <img class="dBackdropImage" src="./images/dashboard/backdrop.svg" />
        <div class="dSidebar">
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
          <div class="dSidebarSection dSidebarFolderHeading">
            <div class="dSidebarTitle"><div title>Folders</div><div divider></div><button class="dSidebarNewFolderButton"><img src="./images/dashboard/add.svg" /></button></div>
          </div>
          <div class="dSidebarSection dSidebarFolders">
            <div class="dSidebarFolderHolder"></div>
          </div>
          <div class="dSidebarSection dSidebarAccountHolder">
            <button class="dAccount largeButton border"><img src="./images/profiles/default.svg" accountimage /><div accountuser>Username</div><div backdrop></div></button>
          </div>
        </div>
        <div class="dSidebarOpen"><div shadow><div></div></div><button><img src="./images/dashboard/opensidebar.svg" /></button></div>
      </div>
      <div class="dLessonsHolder">
        <div class="dSelectedTitleHolder"></div>
        <div class="dTilesHolder"></div>
      </div>
    </div>
  </div>`;
  css = {
    ".dPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100%; height: 100vh; padding: 8px; left: 0px; top: 0px; justify-content: center`, //transition: .2s
    ".dPage": `display: flex; width: 100%; height: 100%; max-width: 1565px; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`, //transition: .2s
    
    ".dSidebarHolder": `position: relative; max-width: min(270px, 100%); height: 100%; flex-shrink: 0; background: var(--pageColor); z-index: 2; transition: .4s`,
    ".dBackdropImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 1; opacity: .75; object-fit: cover; z-index: 1; pointer-events: none`,
    ".dSidebar": `position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; box-shadow: var(--darkShadow); overflow: auto; z-index: 2`,
    ".dSidebarSection": `position: sticky; box-sizing: border-box; width: 100%; left: 0px; z-index: 2`,
    ".dSidebarTitle": `display: flex; gap: 8px; align-items: center`,
    ".dSidebarTitle div[title]": `color: var(--secondary); font-weight: 600; font-size: 16px`,
    ".dSidebarTitle div[divider]": `flex: 1; height: 4px; background: var(--hover); border-radius: 2px`,

    ".dSidebarOpen": `position: absolute; display: none; padding: 6px; left: 100%; bottom: 68px; background: var(--pageColor); border-radius: 0 36px 36px 0; z-index: 3`,
    ".dSidebarOpen div[shadow]": `position: absolute; width: calc(100% + 12px); height: calc(100% + 24px); left: 0px; top: -12px; border-radius: inherit; overflow: hidden; pointer-events: none`,
    ".dSidebarOpen div[shadow] div": `position: absolute; width: calc(100% - 12px); height: calc(100% - 24px); left: 0px; top: 12px; border-radius: inherit; box-shadow: var(--darkShadow)`,
    ".dSidebarOpen button": `display: flex; width: 80px; height: 60px; border-radius: 10px 30px 30px 10px; justify-content: center; align-items: center`,
    ".dSidebarOpen button:hover": `background: var(--hover)`,
    ".dSidebarOpen button img": `width: 60px; transition: .4s`,

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

    ".dSidebarFolderHeading": `padding: 8px 8px 6px 8px`,
    ".dSidebarFolders": `position: relative; display: flex; flex-direction: column; min-width: fit-content; gap: 8px; padding: 0 4px 8px 8px`,
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
    ".dSidebarFolder div[arrow]": `position: sticky; display: flex; width: 28px; height: 28px; right: 8px; margin-left: auto; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 14px; z-index: 1; transition: .1s`,
    ".dSidebarFolder div[arrow] svg": `width: 22px; height: 22px`,
    ".dSidebarFolder[opened] div[arrow]": `transform: rotate(90deg)`,

    ".dSidebarAccountHolder": `display: flex; flex-direction: column; padding: 8px; bottom: 0px; margin-top: auto; align-items: center; transition: .2s`,
    ".dAccount": `display: flex; max-width: calc(100% - 16px); width: fit-content; padding: 6px 12px 6px 6px; --borderRadius: 18px`,
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
    let sidebarHolder = dashboard.querySelector(".dSidebarHolder");
    let sidebar = sidebarHolder.querySelector(".dSidebar");
    let folderHolder = sidebar.querySelector(".dSidebarFolderHolder");
    let lessonsHolder = dashboard.querySelector(".dLessonsHolder");
    let titleHolder = lessonsHolder.querySelector(".dSelectedTitleHolder");
    let tileHolder = dashboard.querySelector(".dTilesHolder");
    let accountHolder = sidebar.querySelector(".dSidebarAccountHolder");
    let accountButton = accountHolder.querySelector(".dAccount");

    // Preload
    loadScript("./modules/dropdowns/account.js");
    
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

    this.updateScrollShadows = () => {
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
    sidebar.addEventListener("scroll", this.updateScrollShadows);
    lessonsHolder.addEventListener("scroll", this.updateScrollShadows);

    // Sidebar Open/Close (Mobile Only)
    let sidebarOpenHolder = sidebarHolder.querySelector(".dSidebarOpen");
    let sidebarOpenButton = sidebarOpenHolder.querySelector("button");
    let sidebarOpenButtonImg = sidebarOpenButton.querySelector("img");
    let sidebarOpen;
    let sidebarOpenButtonVisible;
    let openSidebar = () => {
      sidebarOpen = true;
      sidebarHolder.style.left = "0px";
      sidebarOpenButtonImg.style.transform = "scale(-1)";
    }
    let closeSidebar = () => {
      if (sidebarOpenButtonVisible == false) {
        return;
      }
      sidebarOpen = false;
      sidebarHolder.style.left = -sidebar.clientWidth + "px";
      sidebarOpenButtonImg.style.transform = "scale(1)";
    }
    sidebarOpenButton.addEventListener("click", () => {
      if (sidebarOpen == false) {
        openSidebar();
      } else {
        closeSidebar();
      }
    });

    // Update Page Resizing
    let sizeUpdate = () => {
      if (fixed.offsetWidth > 800 && fixed.offsetHeight > 400) {
        dashboardHolder.style.removeProperty("padding");
        dashboard.style.removeProperty("border-radius");
      } else {
        dashboardHolder.style.padding = "0px";
        dashboard.style.borderRadius = "0px";
      }
      if (fixed.offsetWidth > 800) {
        sidebarOpen = true;
        if (sidebarOpenButtonVisible != false) {
          sidebarOpenButtonVisible = false;
          sidebarHolder.style.removeProperty("position");
          sidebarOpenHolder.style.removeProperty("display");
          openSidebar();
        }
      } else {
        if (sidebarOpenButtonVisible != true) {
          sidebarOpenButtonVisible = true;
          sidebarHolder.style.position = "absolute";
          sidebarOpenHolder.style.display = "unset";
          closeSidebar();
        }
      }
      this.updateScrollShadows();
    }
    tempListen(window, "resize", sizeUpdate);

    let unselectSidebarButton = () => {
      let currentSelected = sidebar.querySelector("button[selected], a[selected]");
      if (currentSelected != null) {
        currentSelected.removeAttribute("selected");
      }
    }

    // Handle Folders
    let folders = {};
    this.addFolderTile = async (folder, parent) => {
      parent.insertAdjacentHTML("beforeend", `<div class="dSidebarFolderParent" new>
        <a class="dSidebarFolder" inside>
          <div select></div>
          <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--folderFill)" stroke-width="30"/> </g> </svg>
          <div name></div>
          <div arrow><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg></div>
        </a>
      </div>`);
      let newFolder = parent.querySelector(".dSidebarFolderParent[new]");
      newFolder.removeAttribute("new");
      if (parent != folderHolder) {
        newFolder.setAttribute("child", "");
      }
      let folderName = newFolder.querySelector("div[name]");
      if (folder != null) {
        let folderButton = newFolder.querySelector(".dSidebarFolder");
        folderButton.setAttribute("folderid", folder._id);
        folderName.textContent = folder.name;
        if (folder.color != null) {
          folderButton.style.setProperty("--fillColor", "#" + folder.color);
        }
      } else {
        if (parent.firstElementChild != null) {
          if (parent != folderHolder && parent.firstElementChild.nextElementSibling != null) {
            parent.insertBefore(newFolder, parent.firstElementChild.nextElementSibling);
          } else {
            parent.insertBefore(newFolder, parent.firstElementChild);
          }
        }
        folderName.setAttribute("contenteditable", "");
        
        let keyDownListener = (event) => {
          if (event.keyCode == 13) {
            event.preventDefault();
            folderName.blur();
            return;
          }
        };
        folderName.addEventListener("keydown", keyDownListener);
        let pasteListener = (event) => {
          // Cancel paste
          event.preventDefault();
    
          // Insert text manually
          document.execCommand("insertHTML", false, (event.originalEvent ?? event).clipboardData.getData("text/plain"));
        }
        folderName.addEventListener("paste", pasteListener);
        let focusListener;
        focusListener = async () => {
          folderName.removeEventListener("keydown", keyDownListener);
          folderName.removeEventListener("paste", pasteListener);
          folderName.removeEventListener("focusout", focusListener);
          
          folderName.removeAttribute("contenteditable");
          let name = folderName.textContent.substring(0, 30).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
          if (name.replace(/ /g, "").length < 1) {
            newFolder.remove();
            return;
          }
          /*if (folderName.textContent == folderName.getAttribute("prevtitle")) {
            return;
          }*/
          newFolder.setAttribute("disabled", "");
          folderName.textContent = name;
          let folderBody = { name: name };
          if (parent != folderHolder) {
            folderBody.parent = parent.getAttribute("folderid");
          }
          let [code, body] = await sendRequest("POST", "lessons/folders/new", folderBody);
          if (code != 200) {
            newFolder.remove();
          } else {
            newFolder.setAttribute("folderid", body.folder);
            parent.setAttribute("lastopened", getEpoch());
            newFolder.removeAttribute("disabled");
            let folderChild = newFolder.querySelector(".dSidebarFolder");
            folderChild.setAttribute("loaded", "");
            unselectSidebarButton();
            folderChild.setAttribute("selected", "");
          }
        };
        folderName.addEventListener("focusout", focusListener);

        await sleep(1);
        folderName.focus();
      }
    }
    sidebar.querySelector(".dSidebarNewFolderButton").addEventListener("click", () => {
      this.addFolderTile(null, folderHolder);
    });
    
    // Handle All Loading/Unloading of Lessons
    let sort = "recent";
    let records = {};
    let lessons = {};

    let [code, body] = await sendRequest("GET", "lessons");
    if (code != 200) {
      return;
    }
    records.recent = body.recent;
    records.shared = body.shared;
    records.owned = body.owned;
    records.newest = body.newest;
    lessons = { ...lessons, ...getObject(body.lessons, "_id") };
    folders = { ...folders, ...getObject(body.folders, "_id") };

    let updateTiles = async (button, firstLoad) => {
      if (sort.length > 20) { // Folder
        button.setAttribute("opened", "");
      } else { // Sort
        titleHolder.innerHTML = `<div class="dSelectedTitle">${sort[0].toUpperCase() + sort.substring(1) + " Lessons"}</div>`;
      }
      lessonsHolder.scrollTo(0, 0);
      await this.setFrame("pages/dashboard/lessons", tileHolder, { button: button, sort: sort, records: records, lessons: lessons, firstLoad: firstLoad });
    }
    updateTiles(null, true);
    for (let i = 0; i < body.folders.length; i++) {
      this.addFolderTile(body.folders[i], folderHolder);
    }

    // Click Listener
    page.addEventListener("click", (event) => {
      let target = event.target;

      if (target.closest(".dLessonsHolder") != null) {
        closeSidebar();
      }

      let tile = target.closest(".dTile");
      if (tile != null) {
        event.preventDefault();
        let optionButton = target.closest(".dTileOptions");
        if (optionButton != null) {
          return dropdownModule.open(optionButton, "dropdowns/dashboard/options", { parent: this });
        }
        modifyParams("lesson", tile.getAttribute("lesson"));
        setFrame("lesson", null);
      }

      let button = target.closest("button, a");
      if (button == null) {
        return;
      }

      if (button.hasAttribute("sort") == true || button.hasAttribute("folderid") == true) {
        unselectSidebarButton();
        sort = button.getAttribute("sort") ?? button.getAttribute("folderid");
        button.setAttribute("selected", "");
        return updateTiles(button);
      }
    });

    // MouseDown Listener
    page.addEventListener("mousedown", (event) => {
      let target = event.target;
      let tile = target.closest(".dTile");
      if (tile == null) {
        return;
      }
      let optionButton = target.closest(".dTileOptions");
      if (optionButton == null) {
        tile.style.removeProperty("transform");
      } else {
        tile.style.transform = "scale(1)";
      }
    });

    sizeUpdate();
  }
}

modules["pages/dashboard/lessons"] = class {
  html = `<div class="dTiles"></div>`;
  css = {
    ".dTiles": `position: relative; display: grid; width: 100%; grid-gap: 16px; grid-template-columns: repeat(auto-fill, minmax(min(275px, 100%), 1fr))`, // min-height: 100%;
    ".dTile": `position: relative; background: var(--pageColor); --shadow: var(--lightShadow); box-shadow: var(--shadow); border-radius: 12px; overflow: hidden`,
    ".dTile:hover": `--shadow: var(--darkShadow)`,
    ".dTileThumbnail": `width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 12px`,
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
    let button = extra.button;
    let sort = extra.sort;
    let records = extra.records[sort];
    let lessons = extra.lessons;
    let tileHolder = frame.querySelector(".dTiles");

    let loadMoreLessons = async () => {
      let path = "lessons";
      if (sort.length > 20) { // Folder
        path += "?folder=" + sort;
      } else { // Sort
        path += "?section=" + sort;
      }
      let lastRecord = records[records.length - 1];
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
      extra.records[sort] = [...records, ...(body[sort] || body.recent)];
      records = extra.records[sort];
      for (let i = 0; i < body.lessons.length; i++) {
        let lesson = body.lessons[i];
        extra.lessons[lesson._id] = lesson;
      }
      if (body.folders != null && button != null) {
        for (let i = 0; i < body.folders.length; i++) {
          //let folder = body.folders[i];
          this.parent.addFolderTile(body.folders[i], button.parentElement);
        }
        this.parent.updateScrollShadows();
      }
    }
    if (records == null) {
      records = [];
      await loadMoreLessons();
    }

    let addLessonTile = (record, lesson, time, insertFirst) => {
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
      addLessonTile(record, lesson, time, false);
    }
  }
}

modules["dropdowns/dashboard/options"] = class {
  html = `
  <button class="dTileDropAction" option="open" title="Open this lesson."><img src="./images/dashboard/open.svg">Open</button>
  <button class="dTileDropAction" option="opennewtab" title="Open this lesson in a new tab."><img src="./images/dashboard/open.svg">Open in New Tab</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="moveto" title="Move this lesson into a folder." dropdown="dropdowns/dashboard/moveto" dropdowntitle="<img class='dTileDropActionImage' src='./images/dashboard/moveto.svg'>Move To"><img class="dTileDropActionImage" src="./images/dashboard/moveto.svg">Move To Folder</button>
  <button class="dTileDropAction" option="movefrom" style="display: none" title="Remove this lesson from the folder."><img class="dTileDropActionImage" src="./images/dashboard/moveto.svg">Move From Folder</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="rename" title="Rename this lesson."><img src="./images/dashboard/rename.svg">Rename</button>
  <button class="dTileDropAction" option="copy" title="Create a duplicate of this lesson."><img src="./images/editor/file/copy.svg">Duplicate</button>
  <button class="dTileDropAction" option="deletelesson" dashboard dropdown="dropdowns/editor/file/delete" style="--themeColor: var(--error)" title="Remove this lesson from your dashboard."><img class="dTileDropActionImage" src="./images/editor/file/delete.svg">Delete</button>
  `;
  css = {
    ".dTileDropAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".dTileDropAction:not(:last-child)": `margin-bottom: 4px`,
    ".dTileDropAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px !important; background: #fff; border-radius: 4px`,
    ".dTileDropAction:hover": `background: var(--themeColor); color: #fff`,
    ".dTileDropLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async function (frame, extra) {
    
  }
}