modules["pages/dashboard"] = {
  title: "Dashboard",
  preJs: function () {
    if (userID == null) {
      promptLogin();
      return false;
    }
    modifyParams("lesson");
    modifyParams("page");
    modifyParams("annotation");
    modifyParams("pin");
  },
  html: `<div class="dPage">
    <div class="dTopBar">
      <img class="dLogo" src="./images/logo.svg">
      <button class="dAccount buttonAnim border" dropdown="dropdowns/account"><img src="./images/profiles/default.svg" accountimage><div accountuser></div></button>
    </div>
    <div class="dHeader">
      <div class="dHeaderSection dHeaderTx">Ready to <div class="dHeaderTxAnimHolder"><div class="dHeaderTxAnim"></div><div class="dHeaderUnderline"></div></div></div>
      <div class="dHeaderSection dHeaderActions">
        <button class="dCreateDoc largeButton" dropdown="dropdowns/new/lesson">New Lesson</button>
        <button class="dJoin largeButton" openpage="join">Join<img src="./images/tooltips/link.svg"></button>
      </div>
      <div class="dBackdrop">
        <img class="dBackdropImage" src="./images/dashboard/background.svg">
        <img class="dIconImage" src="./images/icon.svg">
      </div>
    </div>
    <div class="dLessonsHolder"></div>
  </div>
  `,
  css: {
    ".dPage": `display: flex; flex-direction: column; width: 100%; height: fit-content; max-width: 1000px`,

    ".dTopBar": `display: flex; justify-content: space-between; box-sizing: border-box; width: 100%; padding: 8px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); overflow: hidden; z-index: 10`,
    ".dLogo": `height: 44px; margin-right: 8px`,
    ".dAccount": `display: flex; max-width: calc(100% - 168px); width: fit-content; padding: 6px; --borderRadius: 22px`,
    ".dAccount:hover": `background: var(--hover)`,
    ".dAccount:active": `background: unset; --borderWidth: 4px; --borderColor: var(--hover)`,
    ".dAccount img": `float: left; width: 32px; min-width: 32px; height: 32px; margin-right: 6px; object-fit: cover; border-radius: 22px`,
    ".dAccount div": `float: right; max-width: calc(100% - 38px); height: 100%; line-height: 32px; font-size: 18px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,

    ".dHeader": `position: relative; width: 100%; margin-bottom: 25px`,
    ".dHeaderSection": `position: relative; display: flex; flex-wrap: wrap; padding: 20px 8px 20px 0; margin-left: 5%; align-items: center; z-index: 2`,
    ".dHeaderTx": `overflow: hidden; font-size: 30px; font-weight: 700`,
    ".dHeaderTxAnimHolder": `position: relative; margin-left: 8px`,
    ".dHeaderTxAnim": `position: absolute; width: max-content; height: 49px; top: 20px; left: 0px; font-size: 40px; color: var(--theme); text-shadow: 0px 0px 12px rgba(72, 167, 255, 0.5)`,
    ".dHeaderUnderline": `position: absolute; width: 0px; height: 5px; bottom: 0px; background: var(--theme); border-radius: 2.5px; transition: .5s`,
    ".dHeaderActions": `gap: 24px; margin: 0 30px 0 8%`,
    ".dCreateDoc": `background: var(--theme); --borderRadius: 20.25px; color: #fff`,
    ".dJoin": `background: #fff; --borderRadius: 20.25px; color: var(--secondary)`,
    ".dJoin img": `width: 24px; height: 24px; margin-left: 8px`,
    ".dBackdrop": `position: absolute; width: 100%; height: 300px; top: -50px; left: 0px; top: -50px; z-index: 1; overflow: hidden`,
    ".dBackdropImage": `position: absolute; height: 100%; left: 0px`,
    ".dIconImage": `position: absolute; height: 100%; left: max(70%, 570px)`,

    ".dLessonsHolder": `position: relative; min-height: calc(100vh - 250.5px); z-index: 0`
  },
  js: async function (page) {
    page.style.display = "flex";
    page.style.justifyContent = "center";

    if (account.image) {
      page.querySelector(".dAccount img").src = account.image;
    }
    page.querySelector(".dAccount div").textContent = account.user;

    let modal = await getModule("modal");
    if (account.onboard == null) {
      modal.open("modals/tutorial", null, null, false);
    } else if (account.lastWhatsNew != null && account.currentWhatsNew != null && account.lastWhatsNew != account.currentWhatsNew) {
      modal.open("modals/updates/" + account.currentWhatsNew, null, "What's New", false);
    }

    // Slick Animation
    (async () => {
      let animTextHolder = page.querySelector(".dHeaderTxAnimHolder");
      let animText = page.querySelector(".dHeaderTxAnim");
      let textOptions = ["Markup", "Participate", "Collaborate"];
      for (let i = 0; i < 3; i++) {
        animText.style.transition = "none";
        animText.style.opacity = 0;
        animText.style.top = "20px";
        animText.textContent = textOptions[i];
        animText.offsetHeight;
        animText.style.transition = ".5s";
        animText.style.top = "0px";
        animText.style.opacity = 1;
        animTextHolder.style.width = animText.clientWidth + "px";
        animTextHolder.style.height = animText.clientHeight + "px";
        if (i != 2) {
          await sleep(1500);
        }
      }
      await sleep(500);
      page.querySelector(".dHeaderUnderline").style.width = "100%";
    })();

    setFrame("pages/dashboard/lessons", page.querySelector(".dLessonsHolder"));
  }
}

modules["pages/dashboard/lessons"] = {
  loading: true,
  html: `
  <div class="dSection" section="folders" noscrollclose>
    <div class="dSectionTop">
      <div>Folders</div>
      <button class="dSectionLoadMore buttonAnim border"><span>View More</span><img src="./images/tooltips/drop.svg"></button>
    </div>
    <div class="dSectionTiles" default="10" timefield="opened" style="min-height: 100px"></div>
  </div>
  <div class="dSection" section="recent">
    <div class="dSectionTop">
      <div>Recent Lessons</div>
      <button class="dSectionLoadMore buttonAnim border"><span>View More</span><img src="./images/tooltips/drop.svg"></button>
    </div>
    <div class="dSectionTiles" default="10" timefield="opened"></div>
  </div>
  <div class="dSection" section="shared">
    <div class="dSectionTop">
      <div>Shared Lessons</div>
      <button class="dSectionLoadMore buttonAnim border"><span>View More</span><img src="./images/tooltips/drop.svg"></button>
    </div>
    <div class="dSectionTiles" default="5" timefield="added"></div>
  </div>
  <div class="dSection" section="mine">
    <div class="dSectionTop">
      <div>My Lessons</div>
      <button class="dSectionLoadMore buttonAnim border"><span>View More</span><img src="./images/tooltips/drop.svg"></button>
    </div>
    <div class="dSectionTiles" default="5" timefield="added"></div>
  </div>
  <div class="dSection" section="newest">
    <div class="dSectionTop">
      <div>Newest Lessons</div>
      <button class="dSectionLoadMore buttonAnim border"><span>View More</span><img src="./images/tooltips/drop.svg"></button>
    </div>
    <div class="dSectionTiles" default="5" timefield="added"></div>
  </div>
  `,
  css: {
    ".dNoLessons": `padding: 8px; margin-top: 15vh`,
    ".dSection": `display: none; margin-bottom: 30px`,
    ".dSectionTop": `position: sticky; box-sizing: border-box; display: flex; width: 100%; top: 0px; padding: 16px; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 5`,
    ".dSectionTop div": `flex: 1; font-size: 30px; font-weight: 600; text-align: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dSectionTop button": `display: flex; padding: 8px; align-items: center; --borderRadius: 22px; font-size: 18px; font-weight: 600`,
    ".dSectionTop img": `width: 22px; margin-left: 6px; transform: rotate(0deg); transition: .2s`,
    ".dSectionContinueLoad": `--borderRadius: 22px; color: var(--theme); font-size: 18px; font-weight: 700`,
    ".dSectionLoad": `padding: 8px 12px; margin-top: 28px`,
    ".dSectionTiles": "display: flex; flex-wrap: wrap; min-height: 200px; justify-content: center; align-items: center",
    ".dTile": `--optionOpacity: 0; position: relative; width: calc(20% - 52px); min-width: min(148px, calc(100% - 52px)); height: 200px; margin: 12px; --borderRadius: 12px`,
    ".dTile[folder]": `height: 100px`,
    ".dTile[folder] .dTileInfo": `padding: 8px !important`,
    ".dTile:hover": "--optionOpacity: 1",
    ".dTileDocImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: var(--borderRadius); object-fit: cover; object-position: top center`,
    ".dTile[folder] .dTileDocImage": `display: flex; flex-wrap: wrap; width: calc(100% - 16px); height: calc(100% - 16px); padding: 8px; gap: 5px; justify-content: center; overflow: hidden`,
    ".dTileBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: .3; border-radius: 16px; transition: .1s`,
    ".dTile:active .dTileBackground": `border-radius: 22px`,
    ".dTileFolderImage": `width: 32px; height: 38px; border: solid 2px var(--secondary); border-radius: 8px; object-fit: cover; object-position: top center`,
    ".dTileInfo": `position: absolute; box-sizing: border-box; display: flex; flex-wrap: wrap; width: 100%; left: 0px; bottom: 0px; padding: 6px; background: rgba(var(--background), .95)`,
    ".dTileName": `width: 100%; font-size: 18px; font-weight: 600; color: var(--themeColor); text-align: left`,
    ".dTileName[contenteditable]": `padding: 2px 4px; margin-bottom: 4px; max-height: 70px; outline: solid 2px var(--themeColor); border-radius: 4px; overflow: auto`,
    ".dTileStats": `display: flex; width: 100%; padding: 0 6px; font-size: 16px; font-weight: 700; overflow: hidden; white-space: nowrap`,
    ".dTileDate": `flex: 1; margin-right: 8px; color: var(--darkGray); text-align: left`,
    ".dTileMemberCount": `display: flex; color: var(--theme); justify-content: right; align-items: center`,
    ".dTileMemberCount img": `width: 21px; height: 21px; margin-right: 2px`,
    ".dTileOptions": `position: absolute; display: flex; width: 34px; height: 34px; padding: 4px; right: -2px; top: -2px; z-index: 2; background: var(--themeColor2); border-radius: 0 19px 0 14px; overflow: hidden; filter: opacity(var(--optionOpacity))`,
    ".dTileOptions svg": `display: unset !important; width: 100%; height: 100%; flex-shrink: 0`,
    ".dTileOptions svg path": `transition: .1s`,
    ".dTileOptions div": `margin-left: 6px`,
    ".dTileOptions[folder]": `--folderColor: var(--themeColor2); display: none; right: unset; left: -2px; background: var(--themeColor); border-radius: 19px 0 14px 0; filter: unset`,
    ".dTile:hover .dTileOptions[folder]": `--folderColor: var(--themeColor); background: var(--themeColor2)`,
    ".dTileDropActionImage": `margin-right: 4px`
  },
  js: async function (frame) {
    let dropdownModule = await getModule("dropdown");
    let path = "lessons";
    if (modules["pages/editor"] && modules["pages/editor"].session) {
      path += "?leave=" + modules["pages/editor"].session;
    }
    let [code, body] = await sendRequest("GET", path);
    if (code != 200) {
      return;
    }

    let lessons = getObject(body.lessons, "_id");
    let addTile = (tileHolder, lessonRec, lesson, insertFirst) => {
      if (lesson == null) {
        return;
      }
      let insertAdj = "beforeend";
      if (insertFirst) {
        insertAdj = "afterbegin";
      }
      let existingTile = tileHolder.querySelector('.dTile[lesson="' + lessonRec.lesson + '"');
      if (existingTile) {
        existingTile.remove();
      }
      let timeField = tileHolder.getAttribute("timefield");
      if (insertFirst == true && tileHolder.firstChild != null && lessonRec[timeField] < parseInt(tileHolder.firstChild.getAttribute("time"))) {
        return;
      }
      tileHolder.insertAdjacentHTML(insertAdj, `<a class="dTile largeButton" new>
        <img class="dTileDocImage" src="./images/dashboard/missing.svg">
        <div class="dTileInfo">
          <div class="dTileName"></div>
          <div class="dTileStats">
            <div class="dTileDate"></div>
            <div class="dTileMemberCount" title="Active Members"><img src="./images/profiles/default.svg"><span>0</span></div>
          </div>
        </div>
        <button class="dTileOptions" folder dropdown="dropdowns/dashboard/moveto" dropdowntitle="<img class='dTileDropActionImage' src='./images/dashboard/moveto.svg'>Move To">
          <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--folderColor)" fill="var(--folderColor)" stroke-width="30"/> </g> </svg>
        </button>
        <button class="dTileOptions" options dropdown="dropdowns/dashboard/options">
          <svg style="display: none" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_543_6" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_543_6)"> <circle cx="53" cy="128" r="25" fill="var(--themeColor)"/> <circle cx="128" cy="128" r="25" fill="var(--themeColor)"/> <circle cx="203" cy="128" r="25" fill="var(--themeColor)"/> </g> </svg>
          <div>Options</div>
        </button>
      </a>`);
      let tile = tileHolder.querySelector(".dTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("lesson", lessonRec.lesson);
      tile.setAttribute("time", lessonRec[timeField]);
      /* if (lesson.type != "freeboard") {
        tile.style.setProperty("--themeColorRGB", "180, 218, 253");
      } else { */
      if (lesson.type == "freeboard") {
        //tile.style.setProperty("--themeColorRGB", "247, 217, 255");
        tile.style.setProperty("--themeColor", "var(--purple)");
        tile.style.setProperty("--themeColor2", "#ECB7FF");
      }
      if (lesson.thumbnail) {
        tile.querySelector(".dTileDocImage").src = assetURL + lesson.thumbnail;
      }
      tile.querySelector(".dTileName").textContent = lesson.name ?? "Untitled Lesson";
      tile.querySelector(".dTileName").title = lesson.name ?? "Untitled Lesson";
      tile.querySelector(".dTileDate").textContent = timeSince(lessonRec[timeField]);
      tile.querySelector(".dTileDate").title = formatFullDate(lessonRec[timeField]);
      if (lesson.membersUpdate && lesson.membersUpdate < getEpoch() - 300000) {
        lesson.members = null;
      }
      tile.querySelector(".dTileMemberCount span").textContent = lesson.members ?? 0;
      let join = lessonRec.join ?? "owner";
      tile.setAttribute("join", join);
      if (join.startsWith("pin_")) {
        tile.href = "?pin=" + join.substring(4) + "#join";
      } else if (join == "link") {
        tile.href = "?lesson=" + lessonRec.lesson + "#join";
      } else {
        tile.href = "?lesson=" + lessonRec.lesson + "#editor";
      }
      if (lessonRec.folder != null) {
        tile.setAttribute("folderid", lessonRec.folder);
        tile.querySelector(".dTileOptions[folder]").style.display = "unset";
      }

      return tile;
    }
    let addFolder = (folderHolder, folder, addLessons, insertFirst) => {
      if (folder == null) {
        return;
      }
      let insertAdj = "beforeend";
      if (insertFirst) {
        insertAdj = "afterbegin";
      }
      let existingTile = folderHolder.querySelector('.dTile[folder="' + folder._id + '"');
      if (existingTile) {
        existingTile.remove();
      }
      let timeField = folderHolder.getAttribute("timefield");
      folderHolder.insertAdjacentHTML(insertAdj, `<a class="dTile largeButton" dropdown="dropdowns/dashboard/folder" dropdowntitle=" " new>
        <div class="dTileBackground"></div>  
        <div class="dTileDocImage">
        </div>
        <div class="dTileInfo">
          <div class="dTileName"></div>
        </div>
      </a>`);
      let tile = folderHolder.querySelector(".dTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("folder", folder._id);
      tile.setAttribute("time", folder[timeField]);
      tile.querySelector(".dTileName").textContent = cleanString(folder.name ?? "Untitled Folder");
      let hex = "#" + (folder.color ?? "0084FF"); // Default Color
      if (hex.length < 4) {
        hex = hex.split("").map((hexVal) => { return hexVal + hexVal }).join("");
      }
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let rgb = parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16);
      tile.style.setProperty("--themeColor", "rgba(" + rgb + ",1)");
      tile.style.setProperty("--themeColor2", "rgba(" + rgb + ",.5)");
      let tumbHolder = tile.querySelector(".dTileDocImage");
      let searchLessons = { ...lessons, ...(addLessons ?? {}) };
      for (let i = 0; i < (folder.lessons ?? []).length; i++) {
        let lesson = searchLessons[folder.lessons[i]];
        tumbHolder.insertAdjacentHTML("beforeend", `<img class="dTileFolderImage" src="./images/dashboard/missing.svg" new>`);
        let thumbnail = tumbHolder.querySelector(".dTileFolderImage[new]");
        thumbnail.removeAttribute("new");
        thumbnail.setAttribute("lesson", lesson._id);
        //thumbnail.setAttribute("time", lesson.membersUpdate);
        if (lesson.thumbnail) {
          thumbnail.src = assetURL + lesson.thumbnail;
        }
        if (lesson.type == "freeboard") {
          thumbnail.style.border = "solid 2px var(--purple)";
        }
      }
    }
    let addLessonTiles = (type, data) => {
      data = data ?? body;
      let lessonRecs = data[type];
      let tileSection = frame.querySelector('.dSection[section="' + type + '"]');
      let tileHolder = tileSection.querySelector(".dSectionTiles");
      if (lessonRecs == null || lessonRecs.length < 1) {
        tileSection.style.display = "none";
        return;
      } else {
        tileSection.style.display = "block";
      }
      for (let i = 0; i < lessonRecs.length; i++) {
        let lessonRec = lessonRecs[i];
        if (type != "folders") {
          addTile(tileHolder, lessonRec, lessons[lessonRec.lesson]);
        } else {
          addFolder(tileHolder, lessonRec);
        }
      }
      if (tileHolder.childElementCount < parseInt(tileHolder.getAttribute("default"))) {
        tileSection.querySelector(".dSectionLoadMore").style.display = "none";
      }
    }
    addLessonTiles("folders");
    addLessonTiles("recent");
    addLessonTiles("shared");
    addLessonTiles("mine");
    addLessonTiles("newest");

    let folderDropdown = await getModule("dropdowns/dashboard/folder");
    folderDropdown.addLessonTile = addTile;
    folderDropdown.addFolderTile = addFolder;

    if (body.lessons.length < 1) {
      frame.insertAdjacentHTML("beforeend", `<div class="dNoLessons">You have no lessons, start the learning above!</div>`);
    }

    this.dashSubscribe = null;
    let updateDashSub = () => {
      let visibleTiles = document.body.querySelectorAll(".dTile[lesson]");
      let tileIDs = {};
      for (let i = 0; i < visibleTiles.length; i++) {
        tileIDs[visibleTiles[i].getAttribute("lesson")] = "";
      }
      let filter = { type: ["dash", "lesson"], id: Object.keys(tileIDs), _id: userID };
      if (this.dashSubscribe) {
        this.dashSubscribe.edit(filter);
      } else {
        this.dashSubscribe = subscribe(filter, (data) => {
          let body = data.data ?? data.body ?? data;
          console.log(body)
          /*
          if (data.task == "join" && body.user == userID) {
            return;
          }
          */
          let updTiles = document.body.querySelectorAll('.dTile[lesson="' + body.lesson + '"]');
          switch (data.task) {
            case "join":
              for (let i = 0; i < updTiles.length; i++) {
                let tile = updTiles[i];
                let memberCountTx = tile.querySelector(".dTileMemberCount span");
                memberCountTx.textContent = parseInt(memberCountTx.textContent) + 1;
              }
              /*if (body.user == userID) {
                if (updTiles.length > 0) {
                  let tile = frame.querySelector('.dSection[section="recent"]').querySelector('.dTile[lesson="' + body.lesson + '"]');
                  tile.querySelector(".dTileDate").textContent = timeSince(body.joined);
                  tile.querySelector(".dTileDate").title = formatFullDate(body.joined);
                  if (tile && tile.parentElement.firstChild) {
                    tile.parentElement.insertBefore(tile, tile.parentElement.firstChild);
                  }
                }
              }*/
              break;
            case "leave":
              for (let i = 0; i < updTiles.length; i++) {
                let tile = updTiles[i];
                let memberCountTx = tile.querySelector(".dTileMemberCount span");
                memberCountTx.textContent = Math.max(parseInt(memberCountTx.textContent) - 1, 0);
              }
              break;
            case "set":
              let skipUpdTile = false;
              if (body.folder != null) {
                body.sections = body.sections ?? [];
                body.sections.push("folder");
                updTiles = [ ...updTiles, ...document.body.querySelectorAll('.dTile[lesson="' + body.record.lesson + '"]') ]
                skipUpdTile = true;
              }
              for (let i = 0; i < updTiles.length; i++) {
                let tile = updTiles[i];
                if (body.hasOwnProperty("name")) {
                  tile.querySelector(".dTileName").textContent = body.name ?? "Untitled Lesson";
                }
                if (body.thumbnail) {
                  tile.querySelector(".dTileDocImage").src = assetURL + body.thumbnail;
                }
                if (body.record != null) {
                  if (body.record.folder) {
                    tile.setAttribute("folderid", body.record.folder);
                    tile.querySelector(".dTileOptions[folder]").style.display = "unset";
                  } else {
                    tile.removeAttribute("folderid");
                    tile.querySelector(".dTileOptions[folder]").style.display = "none";
                  }
                }
              }
              if ((updTiles.length < 1 || skipUpdTile == true) && body.sections != null) {
                for (let i = 0; i < body.sections.length; i++) {
                  let section = body.sections[i];
                  let tileSection;
                  let tileHolder;
                  if (section != "folder") {
                    tileSection = frame.querySelector('.dSection[section="' + section + '"]');
                    tileHolder = tileSection.querySelector(".dSectionTiles");
                    tileSection.style.display = "block";
                  } else {
                    let folderSection = document.body.querySelector('.dFolderInfo[folder="' + body.record.folder + '"]');
                    if (folderSection == null) {
                      let removeTiles = fixed.querySelectorAll('.dTile[lesson="' + body.record.lesson + '"]');
                      for (let r = 0; r < removeTiles.length; r++) {
                        let tile = removeTiles[r];
                        let folderInfo = tile.parentElement.parentElement.querySelector(".dFolderInfo");
                        if (folderInfo != null && folderInfo.getAttribute("folder") != body.record.folder) {
                          tile.remove();
                          let recent = folderInfo.parentElement.querySelector('.dFolderSection[section="recent"]');
                          if (recent.childElementCount < 1) {
                            recent.style.display = "none";
                          }
                          if (folderInfo.parentElement.querySelector('.dFolderSection[section="folders"]').childElementCount < 1 && recent.childElementCount < 1) {
                            folderInfo.parentElement.querySelector(".dFolderEmpty").style.display = "unset";
                          }
                        }
                      }
                      continue;
                    }
                    tileSection = folderSection.parentElement.querySelector('.dFolderSection[section="recent"]');
                    tileHolder = tileSection;
                    tileSection.style.display = "flex";
                  }
                  let tile = addTile(tileHolder, body.record, body.lesson, true);
                  if (tile != null) {
                    let tileTime = parseInt(tile.getAttribute("time"));
                    for (let t = 0; t < tileHolder.children.length ; t++) {
                      let child = tileHolder.children[t];
                      if (child.getAttribute("lesson") == body.lesson.lesson) {
                        continue;
                      }
                      if (parseInt(child.getAttribute("time")) < tileTime) {
                        tileHolder.insertBefore(tile, child);
                        break;
                      }
                    }
                  }
                  if (tileHolder.childElementCount < parseInt(tileHolder.getAttribute("default"))) {
                    tileSection.querySelector(".dSectionLoadMore").style.display = "none";
                  }
                  if (section == "folder") {
                    tileSection.parentElement.querySelector(".dFolderEmpty").style.display = "none";
                  }
                }
                updateDashSub();
              }
              if (body.record != null) {
                // Update lesson preview in folder tile:
                let foundPreview = document.body.querySelector('.dTileFolderImage[lesson="' + body.record.lesson + '"]');
                if (body.lesson != null && body.record.folder != null) {
                  let folderTile = document.body.querySelector('.dTile[folder="' + body.record.folder + '"] .dTileDocImage');
                  if (foundPreview != null && foundPreview.parentElement != folderTile) {
                    foundPreview.remove();
                    foundPreview = null;
                  }
                  if (folderTile != null) {
                    folderTile.parentElement.parentElement.insertBefore(folderTile.parentElement, folderTile.parentElement.parentElement.firstChild);
                    if (foundPreview == null) {
                      folderTile.insertAdjacentHTML("afterbegin", `<img class="dTileFolderImage" src="./images/dashboard/missing.svg" new>`);
                      foundPreview = folderTile.querySelector(".dTileFolderImage[new]");
                      foundPreview.removeAttribute("new");
                      foundPreview.setAttribute("lesson", body.record.lesson);
                    } else if (folderTile.firstChild != null) {
                      folderTile.insertBefore(foundPreview, folderTile.firstChild)
                    }
                    foundPreview.setAttribute("time", body.record.opened);
                    if (body.lesson.thumbnail) {
                      foundPreview.src = assetURL + body.lesson.thumbnail;
                    }
                    if (body.lesson.type == "freeboard") {
                      foundPreview.style.border = "solid 2px var(--purple)";
                    }
                    if (folderTile.childElementCount > 16) {
                      folderTile.lastChild.remove();
                    }
                    /*for (let i = 0; i < folderTile.children.length; i++) {
                      let child = folderTile.children[i];
                      if (parseInt(child.getAttribute("time")) < body.record.opened) {
                        folderTile.insertBefore(foundPreview, child);
                        break;
                      }
                    }*/
                  }
                } else if (foundPreview != null) {
                  foundPreview.remove();
                }
              } else if (body.hasOwnProperty("thumbnail") == true) {
                let foundPreview = document.body.querySelector('.dTileFolderImage[lesson="' + body.lesson + '"]');
                if (foundPreview != null) {
                  if (body.thumbnail != null) {
                    foundPreview.src = assetURL + body.thumbnail;
                  } else {
                    foundPreview.src = "./images/dashboard/missing.svg";
                  }
                }
              }
              break;
            case "remove":
              for (let i = 0; i < updTiles.length; i++) {
                let tile = updTiles[i];
                let parent = tile.parentElement;
                tile.remove();
                if (parent.closest(".dFolder") == null) {
                  if (parent.childElementCount < 1) {
                    parent.parentElement.style.display = "none";
                  }
                } else {
                  if (parent.childElementCount < 1) {
                    parent.style.display = "none";
                  }
                  if (parent.parentElement.querySelector('.dFolderSection[section="folders"]').childElementCount < 1 && parent.parentElement.querySelector('.dFolderSection[section="recent"]').childElementCount < 1) {
                    parent.parentElement.querySelector(".dFolderEmpty").style.display = "unset";
                  }
                }
              }
              // Update Folder Previews:
              let foundPreviews = document.body.querySelectorAll('.dTileFolderImage[lesson="' + body.lesson + '"]');
              for (let i = 0; i < foundPreviews.length; i++) {
                foundPreviews[i].remove();
              }
              break;
            case "newfolder":
              let tileHolder;
              if (body.parent == null) {
                tileHolder = frame.querySelector('.dSection[section="folders"] .dSectionTiles');
              } else {
                let folderInfo = document.body.querySelector('.dFolderInfo[folder="' + body.parent + '"]');
                if (folderInfo != null) {
                  tileHolder = folderInfo.parentElement.querySelector('.dFolderSection[section="folders"]');
                }
              }
              if (tileHolder != null) {
                addFolder(tileHolder, body, [], true);
                if (tileHolder.closest(".dFolder") != null) {
                  tileHolder.style.display = "flex";
                  tileHolder.parentElement.querySelector(".dFolderEmpty").style.display = "none";
                } else {
                  tileHolder.parentElement.style.display = "block";
                }
              }
              break;
            case "folderupdate":
              // Update Dashboard:
              let dashTile = document.body.querySelector('.dTile[folder="' + body._id + '"]');
              if (dashTile != null) {
                if (body.name != null) {
                  dashTile.querySelector(".dTileName").textContent = cleanString(body.name ?? "Untitled Folder");
                }
                if (body.color != null) {
                  let hex = "#" + (body.color ?? "0084FF"); // Default Color
                  if (hex.length < 4) {
                    hex = hex.split("").map((hexVal) => { return hexVal + hexVal }).join("");
                  }
                  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                  let rgb = parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16);
                  dashTile.style.setProperty("--themeColor", "rgba(" + rgb + ",1)");
                  dashTile.style.setProperty("--themeColor2", "rgba(" + rgb + ",.5)");
                }
              }
              // Update Dropdown:
              let dashFolderInfo = document.body.querySelector('.dFolderInfo[folder="' + body._id + '"]');
              if (dashFolderInfo != null) {
                if (body.name != null) {
                  let nameBox = dashFolderInfo.querySelector("div[title]");
                  nameBox.textContent = cleanString(body.name ?? "Untitled Folder");
                  nameBox.removeAttribute("contenteditable");
                }
                if (body.color != null) {
                  dashFolderInfo.style.setProperty("--themeColor", "#" + (body.color ?? "0084FF"));
                }
              }
              break;
            case "folderremove":
              // Remove Tile:
              let remDashTile = document.body.querySelector('.dTile[folder="' + body._id + '"]');
              if (remDashTile != null) {
                let parent = remDashTile.parentElement;
                remDashTile.remove();
                if (parent.closest(".dFolder") != null) {
                  if (parent.childElementCount < 1) {
                    parent.style.display = "none";
                  }
                  if (parent.parentElement.querySelector('.dFolderSection[section="folders"]').childElementCount < 1 && parent.parentElement.querySelector('.dFolderSection[section="recent"]').childElementCount < 1) {
                    parent.parentElement.querySelector(".dFolderEmpty").style.display = "unset";
                  }
                } else {
                  if (parent.childElementCount < 1) {
                    parent.parentElement.style.display = "none";
                  }
                }
              }
              // Update Dropdown:
              let closeDashFolderInfo = document.body.querySelector('.dFolderInfo[folder="' + body._id + '"]');
              if (closeDashFolderInfo != null) {
                dropdownModule.close();
              }
              // Update Lessons:
              let updateDashTile = document.body.querySelectorAll('.dTile[folderid="' + body._id + '"]');
              for (let i = 0; i < updateDashTile.length; i++) {
                let tile = updateDashTile[i];
                tile.removeAttribute("folderid");
                tile.querySelector(".dTileOptions[folder]").style.display = "none";
              }
          }
        });
      }
    }
    updateDashSub();

    /*
    function removeTiles(tiles) {
      for (let i = 0; i < tiles.length; i++) {
        let parent = tiles[i].parentElement;
        tiles[i].remove();
        if (parent.childElementCount < 1) {
          parent.parentElement.style.display = "none";
        }
      }
    }
    socket.remotes.dashboard = (data) => {

    }
    subscribe({ type: "dash", id: userID, token: account.realtime }, function (data) {
      switch (data.task) {
        case "order":
          for (let i = 0; i < data.sections.length; i++) {
            let tile = frame.querySelector(".dSection[" + data.sections[i] + "]").querySelector('.dTile[lesson="' + data.record._id + '"]');
            tile.querySelector(".dTileDate").textContent = timeSince(data.record.opened);
            tile.querySelector(".dTileDate").title = formatFullDate(data.record.opened);
            if (tile && tile.parentElement.firstChild) {
              tile.parentElement.insertBefore(tile, tile.parentElement.firstChild);
            }
          }
          break;
        case "newdoc":
          removeTiles(frame.querySelectorAll('.dTile[lesson="' + data.record.lesson + '"]'));
          for (let i = 0; i < data.sections.length; i++) {
            let tileSection = frame.querySelector(".dSection[" + data.sections[i] + "]");
            tileSection.style.removeProperty("display");
            addTile(tileSection.querySelector(".dSectionTiles"), data.record, data.lesson, true);
          }
          break;
        case "remdoc":
          removeTiles(frame.querySelectorAll('.dTile[lesson="' + data.lesson + '"]'));
      }
    });
    */

    let loadMoreGetAmount = 10;
    let dashboardClick = async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let lessonOptions = element.closest(".dTileOptions");
      if (lessonOptions) {
        event.preventDefault();
        return;
      }
      let lessonOpen = element.closest(".dTile");
      if (lessonOpen && lessonOpen.hasAttribute("lesson") == true) {
        event.preventDefault();
        if (lessonOpen.hasAttribute("join")) {
          let method = lessonOpen.getAttribute("join");
          if (method.startsWith("pin_")) {
            modifyParams("pin", method.substring(4));
            setFrame("pages/join");
            return;
          } else if (method == "link") {
            modifyParams("lesson", lessonOpen.getAttribute("lesson"));
            setFrame("pages/join");
            return;
          }
        }
        modifyParams("lesson", lessonOpen.getAttribute("lesson"));
        setFrame("pages/editor");
        return;
      }
      let loadMore = element.closest(".dSectionLoadMore, .dSectionContinueLoad");
      if (loadMore && loadMore.hasAttribute("folder") == false) {
        let section = loadMore.closest(".dSection");
        let getSection = section.getAttribute("section");
        let tileSection = section.querySelector(".dSectionTiles");
        if (loadMore.hasAttribute("showless") == false) {
          loadMore.setAttribute("disabled", "");
          let [code, body] = await sendRequest("GET", "lessons?section=" + getSection + "&before=" + tileSection.lastChild.getAttribute("time") + "&amount=" + loadMoreGetAmount);
          loadMore.removeAttribute("disabled");
          if (code != 200) {
            return;
          }
          if (body[getSection].length > 0) {
            lessons = { ...lessons, ...getObject(body.lessons, "_id") };
            addLessonTiles(getSection, body);
            if (section.querySelector(".dSectionContinueLoad") == null) {
              section.insertAdjacentHTML("beforeend", `<button class="dSectionContinueLoad dSectionLoad buttonAnim border">Show More</button>`);
            }
          }
          if (body[getSection].length >= 0 && loadMore.classList[0] == "dSectionLoadMore") {
            loadMore.setAttribute("showless", "");
            loadMore.querySelector("span").textContent = "Show Less";
            loadMore.querySelector("img").style.transform = "rotate(-180deg)";
          }
          if (body[getSection].length < loadMoreGetAmount) {
            if (section.querySelector(".dSectionContinueLoad")) {
              section.querySelector(".dSectionContinueLoad").remove();
            }
            if (getSection == "folders") {
              section.insertAdjacentHTML("beforeend", `<div class="dSectionLoad">That's all of your folders! Make a new one when moving a lesson.</div>`);
            } else {
              section.insertAdjacentHTML("beforeend", `<div class="dSectionLoad">That's all of the lessons! Make a new one above.</div>`);
            }
          }
        } else {
          for (let i = parseInt(tileSection.getAttribute("default")); i < tileSection.children.length; i++) {
            tileSection.children[i].remove();
            i--;
          }
          if (section.querySelector(".dSectionLoad")) {
            section.querySelector(".dSectionLoad").remove();
          }
          loadMore.removeAttribute("showless");
          loadMore.querySelector("span").textContent = "Show More";
          loadMore.querySelector("img").style.transform = "rotate(0deg)";
        }
        updateDashSub();
        return;
      }
    };
    frame.addEventListener("click", dashboardClick);
    let dashboardRightClick = (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let lessonTile = element.closest(".dTile");
      if (lessonTile) {
        event.preventDefault();
        if (lessonTile.hasAttribute("lesson") == true) {
          dropdownModule.open(lessonTile.querySelector(".dTileOptions[options]"), "dropdowns/dashboard/options");
        }
        return;
      }
    };
    frame.addEventListener("contextmenu", dashboardRightClick);
    folderDropdown.dashboardClick = dashboardClick;
    folderDropdown.dashboardRightClick = dashboardRightClick;
    folderDropdown.dashboardUpdateDashSub = updateDashSub;

    frame.parentElement.style.zIndex = 1;
  }
}

modules["dropdowns/dashboard/folder"] = {
  maxHeight: 460,
  html: `
  <div class="dFolder" fromfolder>
    <div class="dFolderInfo">
      <button icon><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--themeColor)" stroke-width="30"/> </g> </svg></button>
      <div title>My Folder</div>
      <div class="dFolderInfoActions">
        <button class="dCreateDoc largeButton" dropdown="dropdowns/new/lesson">New Lesson</button>
        <button class="dFolderRemove largeButton" dropdown="dropdowns/editor/file/delete" option="deletefolder" dashboard title="Delete this folder." dropdowntitle="Delete Folder"><img src="./images/editor/file/delete.svg"></button>
      </div>
    </div>
    <div class="dFolderColorsHolder">
      <div class="dFolderColors">
        <button hex="0084FF"></button>
        <button hex="DF84FF"></button>
        <button hex="FFB938"></button>
        <button hex="34C172"></button>
        <button hex="FF3D64"></button>
        <button hex="FA8A5A"></button>
        <button hex="2F2F2F"></button>
        <button hex="FF008A"></button>
      </div>
    </div>
    <div class="dFolderSection" section="folders" timefield="opened"></div>
    <button class="dSectionContinueLoad dSectionLoad buttonAnim border" folder="folders">Show More</button>
    <div class="dFolderSection" section="recent" timefield="opened"></div>
    <button class="dSectionContinueLoad dSectionLoad buttonAnim border" folder="lessons">Show More</button>
    <div class="dFolderEmpty">This folder is empty...</div>
  </div>
  `,
  css: {
    ".dFolder": `display: flex; flex-direction: column; width: 100%; align-items: center`,
    ".dFolderInfo": `display: flex; flex-wrap: wrap; width: 100%; justify-content: center; align-items: center`,
    ".dFolderInfo button[icon]": `padding: 0`,
    ".dFolderInfo button[icon] svg": `width: 40px; height: 40px`,
    ".dFolderInfo div[title]": `flex: 1; padding: 4px 0; margin: 0 auto 0 4px; font-size: 24px; font-weight: 700; color: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 12px; outline: none; transition: .2s; cursor: pointer; text-align: left; white-space: nowrap; overflow: auto; scrollbar-width: none`,
    ".dFolderInfo div[title]::-webkit-scrollbar": `display: none`,
    ".dFolderInfo div[contenteditable]": `padding: 4px 6px; border: solid 3px var(--themeColor); cursor: unset`,
    ".dFolderInfoActions": `display: flex`,
    ".dFolderInfo .dCreateDoc": `height: 32px; padding: 6px 8px; margin: 4px 4px 4px 12px; font-size: 16px`,
    ".dFolderRemove": `display: flex; width: 32px; height: 32px; margin: 4px 4px 4px 12px; background: var(--pageColor); --themeColor: var(--error); --themeColor2: var(--error); --borderRadius: 20.25px; color: #fff; justify-content: center; align-items: center`,
    ".dFolderRemove img": `width: 20px; height: 20px`,
    ".dFolderColorsHolder": `height: 0px; margin: 0 auto 0 16px; transition: .3s`,
    ".dFolderColors": `display: flex; flex-wrap: wrap; width: fit-content; padding: 4px; background: var(--lightGray); border-radius: 8px 24px 24px; justify-content: center; transform-origin: top left; transform: scale(0); opacity: 0; transition: transform .3s, opacity .2s`,
    ".dFolderColors[open]": `transform: scale(1); opacity: 1`,
    ".dFolderColors button": `width: 32px; height: 32px; margin: 4px; border: solid 3px var(--pageColor); border-radius: 16px`,
    ".dFolderSection": `display: none; flex-wrap: wrap; width: 600px; max-width: 100%; margin-top: 16px; justify-content: center`,
    ".dFolderEmpty": `width: 100%; margin: 16px 0; font-weight: 600; font-size: 18px text-align: center`,
    ".dSectionContinueLoad[folder]": `display: none; margin: 10px 0 20px 0`,
  },
  js: async function (frame, extra) {
    let dropdownModule = await getModule("dropdown");
    //let alertModule = await getModule("alert");
    let folderid;
    let tile = extra.button.closest(".dTile");
    if (tile != null) {
      folderid = tile.getAttribute("folder");
    } else if (extra.button.closest(".dropdownOverflow").querySelector('.dFolderInfo[folder="' + this.lastFolderId + '"]') != null) {
      folderid = extra.button.getAttribute("rememberid");
    }
    folderid = folderid ?? this.lastFolderId;
    if (folderid == null) {
      return;
    }
    window.dropdown.frameHistory[window.dropdown.frameHistory.length - 1][2] = folderid;
    let dropdownHolder = frame.closest(".dropdownOverflow");
    if (window.dropdown.frameHistory.length > 1) {
      dropdownHolder.querySelector(".dropdownBack").setAttribute("rememberid", window.dropdown.frameHistory[window.dropdown.frameHistory.length - 2][2]);
    }
    this.lastFolderId = folderid;

    dropdownHolder.querySelector(".dropdownTitle").textContent = "";

    let info = frame.querySelector(".dFolderInfo");
    let folderName = info.querySelector("div[title]");
    let prevName = "";
    folderName.addEventListener("mousedown", () => {
      folderName.setAttribute("contenteditable", "");
      prevName = folderName.textContent;
    });
    folderName.addEventListener("blur", async () => {
      folderName.removeAttribute("contenteditable");

      let name = folderName.textContent.substring(0, 30).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        folderName.textContent = prevName;
        return;
      }
      if (name == prevName) {
        folderName.textContent = prevName;
        return;
      }

      folderName.setAttribute("disabled", "");
      let [code] = await sendRequest("PUT", "lessons/folders/name?folder=" + folderid, { name: name });
      if (code != 200) {
        folderName.textContent = prevName;
      } else {
        folderName.textContent = name;
      }
      folderName.removeAttribute("disabled");
    });
    folderName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        folderName.blur();
        return;
      }
    });

    info.setAttribute("folder", folderid);

    let colorHolderHolder = frame.querySelector(".dFolderColorsHolder");
    let colorHolder = colorHolderHolder.querySelector(".dFolderColors");
    for (let i = 0; i < colorHolder.children.length; i++) {
      colorHolder.children[i].style.background = "#" + colorHolder.children[i].getAttribute("hex");
    }
    info.querySelector("button[icon]").addEventListener("click", () => {
      if (colorHolder.hasAttribute("open") == false) {
        colorHolder.setAttribute("open", "");
        colorHolderHolder.style.margin = "12px auto 12px 16px";
        colorHolderHolder.style.height = colorHolder.offsetHeight + "px";
      } else {
        colorHolder.removeAttribute("open");
        colorHolderHolder.style.margin = "0 auto 0 16px";
        colorHolderHolder.style.height = "0px";
      }
    });

    frame.addEventListener("click", this.dashboardClick);
    frame.addEventListener("contextmenu", this.dashboardRightClick);

    let [code, body] = await sendRequest("GET", "lessons?section=folder&folder=" + folderid);
    if (code != 200) {
      dropdownModule.close();
      return;
    }

    let prevColor = (body.folder.color ?? "0084FF"); // Theme Color
    colorHolder.addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest("button");
      if (button == null) {
        return;
      }
      let newColor = button.getAttribute("hex");
      info.style.setProperty("--themeColor", "#" + newColor);
      colorHolder.setAttribute("disabled", "");
      let [code] = await sendRequest("PUT", "lessons/folders/color?folder=" + folderid, { color: newColor });
      if (code != 200) {
        info.style.setProperty("--themeColor", "#" + prevColor);
      } else {
        colorHolder.removeAttribute("open");
        colorHolderHolder.style.margin = "0 0 0 16px";
        colorHolderHolder.style.height = "0px";
      }
      colorHolder.removeAttribute("disabled");
    });

    info.style.setProperty("--themeColor", "#" + prevColor);
    info.querySelector("div[title]").textContent = cleanString(body.folder.name ?? "Untitled Folder");

    let empty = frame.querySelector(".dFolderEmpty");

    let lessons = getObject(body.lessons, "_id");

    let addTiles = (type, data) => {
      data = data ?? body;
      let lessonRecs = data[type];
      let tileHolder = frame.querySelector('.dFolderSection[section="' + type + '"]');
      for (let i = 0; i < (lessonRecs ?? []).length; i++) {
        let lessonRec = lessonRecs[i];
        if (type != "folders") {
          this.addLessonTile(tileHolder, lessonRec, lessons[lessonRec.lesson]);
        } else {
          this.addFolderTile(tileHolder, lessonRec, lessons);
        }
      }
      if (tileHolder.childElementCount < 1) {
        tileHolder.style.display = "none";
      } else {
        tileHolder.style.display = "flex";
        empty.style.display = "none";
      }
    }
    addTiles("folders");
    addTiles("recent");

    let loadAmount = 10;

    let loadMoreFolders = frame.querySelector('.dSectionContinueLoad[folder="folders"]');
    let loadMoreLessons = frame.querySelector('.dSectionContinueLoad[folder="lessons"]');
    
    loadMoreFolders.addEventListener("click", async () => {
      loadMoreFolders.setAttribute("disabled", "");
      let beforeTime = frame.querySelector('.dFolderSection[section="folders"]').lastChild.getAttribute("time");
      let [code, body] = await sendRequest("GET", "lessons?section=folders&folder=" + folderid + "&before=" + beforeTime);
      loadMoreFolders.removeAttribute("disabled");
      if (code != 200) {
        return;
      }
      lessons = { ...lessons, ...getObject(body.lessons, "_id") };
      addTiles("folders", body);
      if (body.folders.length < loadAmount) {
        loadMoreFolders.style.display = "none";
      }
    });
    loadMoreLessons.addEventListener("click", async () => {
      loadMoreLessons.setAttribute("disabled", "");
      let beforeTime = frame.querySelector('.dFolderSection[section="recent"]').lastChild.getAttribute("time");
      let [code, body] = await sendRequest("GET", "lessons?section=recent&folder=" + folderid + "&before=" + beforeTime);
      loadMoreLessons.removeAttribute("disabled");
      if (code != 200) {
        return;
      }
      lessons = { ...lessons, ...getObject(body.lessons, "_id") };
      addTiles("recent", body);
      if (body.recent.length < loadAmount) {
        loadMoreLessons.style.display = "none";
      }
    });

    if (body.folders.length >= loadAmount) {
      loadMoreFolders.style.display = "unset";
    }
    if (body.recent.length >= loadAmount) {
      loadMoreLessons.style.display = "unset";
    }

    this.dashboardUpdateDashSub();
  }
}

modules["dropdowns/dashboard/options"] = {
  html: `
  <button class="dTileDropAction" option="open" title="Open this lesson."><img src="./images/dashboard/open.svg">Open</button>
  <button class="dTileDropAction" option="opennewtab" title="Open this lesson in a new tab."><img src="./images/dashboard/open.svg">Open in New Tab</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="moveto" title="Move this lesson into a folder." dropdown="dropdowns/dashboard/moveto" dropdowntitle="<img class='dTileDropActionImage' src='./images/dashboard/moveto.svg'>Move To"><img class="dTileDropActionImage" src="./images/dashboard/moveto.svg">Move To Folder</button>
  <button class="dTileDropAction" option="movefrom" style="display: none" title="Remove this lesson from the folder."><img class="dTileDropActionImage" src="./images/dashboard/moveto.svg">Move From Folder</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="rename" title="Rename this lesson."><img src="./images/dashboard/rename.svg">Rename</button>
  <button class="dTileDropAction" option="copy" title="Create a duplicate of this lesson."><img src="./images/editor/file/copy.svg">Duplicate</button>
  <button class="dTileDropAction" option="deletelesson" dashboard dropdown="dropdowns/editor/file/delete" style="--themeColor: var(--error)" title="Remove this lesson from your dashboard."><img class="dTileDropActionImage" src="./images/editor/file/delete.svg">Delete</button>
  `,
  css: {
    ".dTileDropAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".dTileDropAction:not(:last-child)": `margin-bottom: 4px`,
    ".dTileDropAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px !important; background: #fff; border-radius: 4px`,
    ".dTileDropAction:hover": `background: var(--themeColor); color: #fff`,
    ".dTileDropLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  },
  js: async function (frame, extra) {
    let dropdownModule = await getModule("dropdown");
    let alertModule = await getModule("alert");
    let tile = extra.button.closest(".dTile") ?? this.lastTile;
    if (tile == null) {
      return;
    }
    this.lastTile = tile;
    let isOwner = tile.getAttribute("join") == "owner";
    let lessonID = tile.getAttribute("lesson");
    let folderid;
    let folderSection = extra.button.closest(".dFolderSection");
    if (folderSection != null) {
      let infoSection = folderSection.parentElement.querySelector(".dFolderInfo");
      if (infoSection != null) {
        folderid = infoSection.getAttribute("folder");
      }
    } else if (extra.button.closest("[folderid]")) {
      folderid = extra.button.closest("[folderid]").getAttribute("folderid");
    }
    if (extra.button.closest("[fromfolder]") != null) {
      frame.setAttribute("folderid", folderid);
      let backButton = frame.closest(".dropdownOverflow").querySelector(".dropdownBack");
      backButton.setAttribute("folderid", folderid);
      backButton.setAttribute("fromfolder", "");
      frame.setAttribute("fromfolder", "");
    }
    frame.querySelector('.dTileDropAction[option="open"]').addEventListener("click", () => {
      if (tile.hasAttribute("join")) {
        let method = tile.getAttribute("join");
        if (method.startsWith("pin_")) {
          modifyParams("pin", method.substring(4));
          setFrame("pages/join");
          return;
        } else if (method == "link") {
          modifyParams("lesson", lessonID);
          setFrame("pages/join");
          return;
        }
      }
      modifyParams("lesson", lessonID);
      setFrame("pages/editor");
    });
    let newTabButton = frame.querySelector('.dTileDropAction[option="opennewtab"]');
    newTabButton.addEventListener("click", () => {
      if (extra.button.closest("[fromfolder]") == null) {
        dropdownModule.close();
      } else {
        window.dropdown.frameHistory = [];
        dropdownModule.open(newTabButton, "dropdowns/dashboard/folder");
      }
      window.open(tile.getAttribute("href"), "_blank");
    });
    let renameButton = frame.querySelector('.dTileDropAction[option="rename"]');
    let copyButton = frame.querySelector('.dTileDropAction[option="copy"]');
    let deleteButton = frame.querySelector('.dTileDropAction[option="deletelesson"]');
    let titleText = tile.querySelector(".dTileName");
    titleText.removeAttribute("prevtitle");
    renameButton.addEventListener("click", async () => {
      if (titleText.hasAttribute("prevtitle") == false) {
        titleText.setAttribute("prevtitle", titleText.textContent);
      }
      titleText.textContent = "";
      titleText.setAttribute("contenteditable", "");
      dropdownModule.close();

      titleText.removeEventListener("keydown", this.keyDownListener);
      titleText.removeEventListener("focusout", this.focusListener);
      titleText.removeEventListener("paste", this.pasteListener);

      this.focusListener = async () => {
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
      titleText.addEventListener("focusout", this.focusListener);
      this.keyDownListener = (event) => {
        if (event.keyCode == 13) {
          event.preventDefault();

          titleText.removeEventListener("keydown", this.keyDownListener);
          titleText.removeEventListener("focusout", this.focusListener);
          titleText.removeEventListener("paste", this.pasteListener);
          
          this.focusListener();
          return;
        }
      };
      titleText.addEventListener("keydown", this.keyDownListener);
      this.pasteListener = (event) => {
        // Cancel paste
        event.preventDefault();
  
        // Insert text manually
        document.execCommand("insertHTML", false, (event.originalEvent ?? event).clipboardData.getData("text/plain"));
      }
      titleText.addEventListener("paste", this.pasteListener);

      await sleep(1);
      titleText.focus();
    });
    copyButton.addEventListener("click", async () => {
      copyButton.setAttribute("disabled", "");
      let copyAlert = await alertModule.open("info", "<b>Creating Copy</b><div>Creating a copy of this lesson's pages and annotations.", { time: "never" });
      let path = "lessons/copy?lesson=" + lessonID;
      if (folderid != null){
        path += "&folder=" + folderid;
      }
      let [code] = await sendRequest("POST", path);
      copyButton.removeAttribute("disabled");
      alertModule.close(copyAlert);
      if (code == 200) {
        if (extra.button.closest("[fromfolder]") == null) {
          dropdownModule.close();
        } else {
          window.dropdown.frameHistory = [];
          dropdownModule.open(copyButton, "dropdowns/dashboard/folder");
        }
        await alertModule.open("info", "<b>Copy Created</b><div>The lesson has been added to the top of your dashboard.");
      }
    });
    deleteButton.setAttribute("lesson", lessonID);
    let movetoButton = frame.querySelector('.dTileDropAction[option="moveto"]');
    movetoButton.setAttribute("lesson", lessonID);
    if (folderid != null) {
      movetoButton.setAttribute("folderid", folderid);
    }
    let movefrom = frame.querySelector('.dTileDropAction[option="movefrom"]');
    if (tile.hasAttribute("folderid") == true) {
      movefrom.style.display = "flex";
    }
    movefrom.addEventListener("click", async () => {
      movefrom.setAttribute("disabled", "");
      let [code] = await sendRequest("POST", "lessons/folders/movefrom?lesson=" + lessonID);
      movefrom.removeAttribute("disabled");
      if (code == 200) {
        if (extra.button.closest("[fromfolder]") == null) {
          dropdownModule.close();
        } else {
          window.dropdown.frameHistory = [];
          dropdownModule.open(movefrom, "dropdowns/dashboard/folder");
        }
      }
    });
    if (!isOwner) {
      renameButton.remove();
      copyButton.remove();
      deleteButton.innerHTML = `<img src="./images/editor/file/delete.svg">Remove`;
    } else {
      deleteButton.setAttribute("owner", "");
      if (folderSection != null) {
        renameButton.remove();
      }
    }
  }
}