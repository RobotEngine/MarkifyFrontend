modules["pages/dashboard"] = {
  title: "Dashboard",
  preJs: function () {
    if (userID == null) {
      promptLogin();
      return false;
    }
    modifyParams("lesson");
    modifyParams("page");
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
    ".dAccount img": `float: left; width: 32px; min-width: 32px; height: 32px; margin-right: 6px; object-fit: cover; background: #fff; border-radius: 22px`,
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

    // Slick Animation
    (async function () {
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

// MODULES
modules["dropdowns/new/lesson"] = {
  html: `<input type="file" accept="application/pdf" multiple="true" hidden="true">
  <div class="lessonCreationHolder">
    <div class="lessonBlankHolder">
      <button class="lessonBlank border" style="--themeColor: var(--gray)" dropdown="dropdowns/new/blank" title="Create a fresh blank page"><img src="./images/dashboard/lesson/blank.svg" draggable="false"><div>Blank Page</div></button>
      <button class="lessonFreeboard border" style="--themeColor: var(--purple)" title="Create an unlimited canvas for whiteboarding"><img src="./images/dashboard/lesson/freeboard.svg" draggable="false"><div>Freeboard</div></button>
    </div>
    <button class="lessonUpload border" style="--themeColor: var(--secondary)" title="Upload an existing PDF to markup"><img src="./images/dashboard/lesson/upload.svg" draggable="false"><div>Upload PDF</div></button>
  </div>`,
  css: {
    ".lessonCreationHolder": `display: flex; flex-wrap: wrap; max-width: 426px`,
    ".lessonCreationHolder button": `display: flex; flex-direction: column; max-width: 100%; padding: 8px; margin: 11px; --borderWidth: 3px; --borderColor: var(--themeColor); --borderRadius: 12px; align-items: center; justify-content: space-around; color: var(--darkGray); font-size: 16px; font-weight: 600`,
    ".lessonCreationHolder button:hover": `background: var(--themeColor); color: #fff; transform: scale(1.05)`,
    ".lessonCreationHolder button:hover img": `filter: brightness(0) invert(1)`,
    ".lessonCreationHolder button:active": `transform: scale(.95)`,
    ".lessonBlankHolder": `flex: 1 1 131px`,
    ".lessonBlankHolder button": `width: calc(100% - 22px); height: 120px`,
    ".lessonBlankHolder .lessonFreeboard": `margin-top: 22px`,
    ".lessonBlankHolder button img": `width: min(65px, 100%); height: 65px; margin-bottom: 8px`,
    ".lessonUpload": `width: 262px; height: 262px; flex: 1 1 120px`,
    ".lessonUpload img": `width: min(140px, 100%); height: 140px; margin-bottom: 8px`,
    ".lessonUpload div": `font-size: 22px`
  },
  maxFileSize: (500 * 1024 * 1024) + 1, // 500 MB File Limit // Will be 1 MB per page
  js: function (frame, extra) {
    let dropdown = frame.closest(".dropdown");
    let input = frame.querySelector("input");
    let uploadButton = frame.querySelector(".lessonUpload");
    let uploadBImg = uploadButton.querySelector("img");
    let the = this;
    let passedFiles = 0;
    async function processUpload(files, event) {
      event.preventDefault();

      if (files == null) {
        return;
      }
      let sendFormData = new FormData();
      let fileSize = 0;
      for (let i = 0; i < Math.min(files.length, 50); i++) {
        let file = files[i];
        if (file.kind == "file") {
          file = file.getAsFile();
        }
        if (file.kind != "string") {
          if (file.type == "application/pdf") {
            fileSize += file.size;
            if (fileSize > the.maxFileSize) {
              (await getModule("alert")).open("error", "<b>Exceeded Size Limit</b><div>Lessons are limited to a max size of <u>500 MB</u> total</div>", { time: 10 });
              passedFile = false;
              break;
            }
            sendFormData.append("file" + i, file);
            passedFiles++;
            /*
            if (file.size < the.maxFileSize) {
              sendFormData.append("file" + i, file);
              passedFile = true;
            } else {
              (await getModule("alert")).open("warning", "<b>" + file.name + " Failed to Upload</b>Files are limited to a max size of 50 MB", { time: 10 });
            }
            */
          } else {
            (await getModule("alert")).open("warning", "<b>" + file.name + " Failed to Upload</b>Only PDF files are currently supported", { time: 10 });
          }
        }
      }
      if (files.length > 50) {
        (await getModule("alert")).open("warning", "<b>File Overload</b>Woah their! Markify only supports bulk uploads up to 50 files, you can upload more pages in the editor", { time: 10 });
      }
      if (passedFiles > 0) {
        frame.setAttribute("disabled", "");
        extra.button.setAttribute("disabled", "");
        let alertModule = await getModule("alert");
        let uploadAlert = await alertModule.open("info", `<b>Uploading Lesson</b>Uploading your PDF${addS(passedFiles)} and creating the lesson!`, { time: "never" });
        let [code, body] = await sendRequest("POST", "lessons/add", sendFormData, { noFileType: true });
        alertModule.close(uploadAlert);
        frame.removeAttribute("disabled");
        extra.button.removeAttribute("disabled");
        if (code == 200) {
          (await getModule("dropdown")).close();
          modifyParams("lesson", body.lesson);
          setFrame("pages/editor");
        }
      }

      resetUI();
    }
    frame.addEventListener("drop", function (event) {
      processUpload(event.dataTransfer.items, event)
    });
    frame.addEventListener("dragover", function (event) {
      dropdown.style.outline = "dashed 4px var(--theme)";
      uploadButton.style.background = "var(--themeColor)";
      uploadButton.style.color = "#fff";
      uploadButton.style.transform = "scale(1.05)";
      uploadBImg.style.filter = "brightness(0) invert(1)";
      event.preventDefault();
    });
    function resetUI() {
      input.value = null;
      dropdown.style.outline = "unset";
      uploadButton.style.removeProperty("background");
      uploadButton.style.removeProperty("color");
      uploadButton.style.removeProperty("transform");
      uploadBImg.style.removeProperty("filter");
    }
    frame.addEventListener("dragleave", resetUI);
    uploadButton.addEventListener("click", function () {
      input.click();
    });
    input.addEventListener("change", function (event) {
      processUpload(event.target.files, event)
    });
    frame.querySelector(".lessonFreeboard").addEventListener("click", async function () {
      frame.setAttribute("disabled", "");
      extra.button.setAttribute("disabled", "");
      let alertModule = await getModule("alert");
      let createAlert = await alertModule.open("info", `<b>Creating Lesson</b>Setting up freeboard, an unlimited whiteboard space!`, { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/add", { type: "freeboard" });
      alertModule.close(createAlert);
      frame.removeAttribute("disabled");
      extra.button.removeAttribute("disabled");
      if (code == 200) {
        (await getModule("dropdown")).close();
        modifyParams("lesson", body.lesson);
        setFrame("pages/editor");
      }
    });
  }
}

modules["pages/dashboard/lessons"] = {
  loading: true,
  html: `
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
    <div class="dSectionTiles" default="5" timefield="created"></div>
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
    ".dSectionTop": `position: sticky; box-sizing: border-box; display: flex; width: 100%; top: 0px; padding: 16px; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 1`,
    ".dSectionTop div": `flex: 1; font-size: 30px; font-weight: 600; text-align: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dSectionTop button": `display: flex; padding: 8px; align-items: center; --borderRadius: 22px; font-size: 18px; font-weight: 600`,
    ".dSectionTop img": `width: 22px; margin-left: 6px; transform: rotate(0deg); transition: .2s`,
    ".dSectionContinueLoad": `--borderRadius: 22px; color: var(--theme); font-size: 18px; font-weight: 700`,
    ".dSectionLoad": `padding: 8px 12px; margin-top: 28px`,
    ".dSectionTiles": "display: flex; flex-wrap: wrap; min-height: 200px; justify-content: center; align-items: center",
    ".dTile": `position: relative; width: calc(20% - 52px); min-width: min(148px, calc(100% - 52px)); height: 200px; margin: 12px; --borderRadius: 12px`,
    ".dTileDocImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: var(--borderRadius); object-fit: cover; object-position: top center`,
    ".dTileInfo": `position: absolute; box-sizing: border-box; display: flex; flex-wrap: wrap; width: 100%; left: 0px; bottom: 0px; padding: 6px; background: rgba(var(--background), .95)`,
    ".dTileName": `width: 100%; font-size: 18px; font-weight: 600; color: var(--themeColor); text-align: left`,
    ".dTileStats": `display: flex; width: 100%; padding: 0 6px; font-size: 16px; font-weight: 700; overflow: hidden; white-space: nowrap`,
    ".dTileDate": `flex: 1; margin-right: 8px; color: var(--darkGray); text-align: left`,
    ".dTileMemberCount": "display: flex; color: var(--theme); justify-content: right; align-items: center",
    ".dTileMemberCount img": "width: 21px; height: 21px; margin-right: 2px"
  },
  js: async function (frame) {
    let path = "lessons";
    if (modules["pages/editor"] && modules["pages/editor"].session) {
      path += "?leave=" + modules["pages/editor"].session;
    }
    let [code, body] = await sendRequest("GET", path);
    if (code != 200) {
      return;
    }

    let lessons = getObject(body.lessons, "_id");
    function addTile(tileHolder, lessonRec, lesson, insertFirst) {
      let insertAdj = "beforeend";
      if (insertFirst) {
        insertAdj = "afterbegin";
      }
      let existingTile = tileHolder.querySelector('.dTile[lesson="' + lessonRec.lesson + '"');
      if (existingTile) {
        existingTile.remove();
      }
      let timeField = tileHolder.getAttribute("timefield");
      tileHolder.insertAdjacentHTML(insertAdj, `<a class="dTile largeButton" new>
        <img class="dTileDocImage" src="./images/dashboard/missing.svg">
        <div class="dTileInfo">
          <div class="dTileName">Untitled Lesson</div>
          <div class="dTileStats">
            <div class="dTileDate"></div>
            <div class="dTileMemberCount" title="Active Members"><img src="./images/profiles/default.svg"><span>0</span></div>
          </div>
        </div>
      </a>`);
      let tile = tileHolder.querySelector(".dTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("lesson", lessonRec.lesson);
      tile.setAttribute("time", lessonRec[timeField]);
      if (lesson.type == "freeboard") {
        tile.style.setProperty("--themeColor", "var(--purple)");
        tile.style.setProperty("--themeColor2", "#ECB7FF");
      }
      if (lesson.thumbnail) {
        tile.querySelector(".dTileDocImage").src = assetURL + lesson.thumbnail;
      }
      tile.querySelector(".dTileName").textContent = lesson.name || "Untitled Lesson";
      tile.querySelector(".dTileName").title = lesson.name || "Untitled Lesson";
      tile.querySelector(".dTileDate").textContent = timeSince(lessonRec[timeField]);
      tile.querySelector(".dTileDate").title = formatFullDate(lessonRec[timeField]);
      if (lesson.membersUpdate && lesson.membersUpdate < getEpoch() - 300000) {
        lesson.members = null;
      }
      tile.querySelector(".dTileMemberCount span").textContent = lesson.members || 0;
      if (lessonRec.join == null) {
        tile.href = "?lesson=" + lessonRec.lesson + "#editor";
      } else {
        tile.setAttribute("join", lessonRec.join);
        if (lessonRec.join.startsWith("pin_")) {
          tile.href = "?pin=" + lessonRec.join.substring(4) + "#join";
        } else if (lessonRec.join == "link") {
          tile.href = "?lesson=" + lessonRec.lesson + "#join";
        }
      }

      return tile;
    }
    function addLessonTiles(type, data) {
      data = data || body;
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
        addTile(tileHolder, lessonRec, lessons[lessonRec.lesson]);
      }
      if (tileHolder.childElementCount < parseInt(tileHolder.getAttribute("default"))) {
        tileSection.querySelector(".dSectionLoadMore").style.display = "none";
      }
    }
    addLessonTiles("recent");
    addLessonTiles("shared");
    addLessonTiles("mine");
    addLessonTiles("newest");

    if (body.lessons.length < 1) {
      frame.insertAdjacentHTML("beforeend", `<div class="dNoLessons">You have no lessons, start the learning above!</div>`);
    }

    this.dashSubscribe = null;
    let updateDashSub = () => {
      let visibleTiles = frame.querySelectorAll(".dTile");
      let tileIDs = {};
      for (let i = 0; i < visibleTiles.length; i++) {
        tileIDs[visibleTiles[i].getAttribute("lesson")] = "";
      }
      let filter = { type: ["dash", "lesson"], id: Object.keys(tileIDs), _id: userID };
      if (this.dashSubscribe) {
        this.dashSubscribe.edit(filter);
      } else {
        this.dashSubscribe = subscribe(filter, function (data) {
          let body = data.data || data.body;
          if (data.task == "join" && body.user == userID) {
            return;
          }
          let updTiles = frame.querySelectorAll('.dTile[lesson="' + body.lesson + '"]');
          switch (data.task) {
            case "join":
              for (let i = 0; i < updTiles.length; i++) {
                let tile = updTiles[i];
                let memberCountTx = tile.querySelector(".dTileMemberCount span");
                memberCountTx.textContent = parseInt(memberCountTx.textContent) + 1;
              }
              /*
              if (body.user == userID) {
                if (updTiles.length > 0) {
                  let tile = frame.querySelector('.dSection[section="recent"]').querySelector('.dTile[lesson="' + body.lesson + '"]');
                  tile.querySelector(".dTileDate").textContent = timeSince(body.joined);
                  tile.querySelector(".dTileDate").title = formatFullDate(body.joined);
                  if (tile && tile.parentElement.firstChild) {
                    tile.parentElement.insertBefore(tile, tile.parentElement.firstChild);
                  }
                }
              }
              */
              break;
            case "leave":
              for (let i = 0; i < updTiles.length; i++) {
                let tile = updTiles[i];
                let memberCountTx = tile.querySelector(".dTileMemberCount span");
                memberCountTx.textContent = parseInt(memberCountTx.textContent) - 1;
              }
              break;
            case "set":
              for (let i = 0; i < updTiles.length; i++) {
                let tile = updTiles[i];
                tile.querySelector(".dTileName").textContent = body.name || "Untitled Lesson";
                if (body.thumbnail) {
                  tile.querySelector(".dTileDocImage").src = assetURL + body.thumbnail;
                }
              }
              if (updTiles.length < 1) {
                for (let i = 0; i < body.sections.length; i++) {
                  let tileSection = frame.querySelector('.dSection[section="' + body.sections[i] + '"]');
                  tileSection.style.display = "unset";
                  let tileHolder = tileSection.querySelector(".dSectionTiles");
                  let tile = addTile(tileHolder, body.record, body.lesson, true);
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
                  if (tileHolder.childElementCount < parseInt(tileHolder.getAttribute("default"))) {
                    tileSection.querySelector(".dSectionLoadMore").style.display = "none";
                  }
                }
                updateDashSub();
              }
              break;
            case "remove":
              for (let i = 0; i < updTiles.length; i++) {
                let parent = updTiles[i].parentElement;
                updTiles[i].remove();
                if (parent.childElementCount < 1) {
                  parent.parentElement.style.display = "none";
                }
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
    frame.addEventListener("click", async function (event) {
      let element = event.target;
      if (element == null) {
        return;
      }
      let lessonOpen = element.closest(".dTile");
      if (lessonOpen) {
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
      if (loadMore) {
        let section = loadMore.closest(".dSection");
        let getSection = section.getAttribute("section");
        let tileSection = section.querySelector(".dSectionTiles");
        if (loadMore.hasAttribute("showless") == false) {
          loadMore.setAttribute("disabled", "");
          let [code, body] = await sendRequest("GET", "lessons?section=" + getSection + "&before=" + tileSection.lastChild.getAttribute("time") + "&amount=" + loadMoreGetAmount);
          if (code != 200) {
            return;
          }
          if (body[getSection].length > 0) {
            lessons = { ...lessons, ...getObject(body.lessons, "_id") };
            addLessonTiles(getSection, body);
            if (section.querySelector(".dSectionContinueLoad") == null) {
              section.insertAdjacentHTML("beforeend", `<button class="dSectionContinueLoad dSectionLoad buttonAnim border">Show More</button>`);
            }
            loadMore.removeAttribute("disabled");
            if (loadMore.classList[0] == "dSectionLoadMore") {
              loadMore.setAttribute("showless", "");
              loadMore.querySelector("span").textContent = "Show Less";
              loadMore.querySelector("img").style.transform = "rotate(-180deg)";
            }
          }
          if (body[getSection].length < loadMoreGetAmount) {
            if (section.querySelector(".dSectionContinueLoad")) {
              section.querySelector(".dSectionContinueLoad").remove();
            }
            section.insertAdjacentHTML("beforeend", `<div class="dSectionLoad">That's all of your lessons! Make a new one above.</div>`);
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
    });

    frame.parentElement.style.zIndex = 1;
  }
}