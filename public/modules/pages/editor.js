modules["pages/editor"] = {
  title: "Editor",
  preJs: function () {
    if ((getParam("lesson") || "").length < 1) {
      setFrame("pages/dashboard", app, { override: true });
      return false;
    }
  },
  html: `<div class="eMain">
    <div class="eTopHolder">
      <button class="eTopScroll eTopScrollLeft" style="left: 8px"><img src="./images/editor/top/leftarrow.svg"></button>
      <button class="eTopScroll eTopScrollRight" style="right: 8px"><img src="./images/editor/top/rightarrow.svg"></button>
      <div class="eTop" noscrollclose>
        <div class="eTopSection">
          <a class="eLogo" href="/#dashboard"><img src="./images/logo.svg"></a>
          <div class="eFileName border" contenteditable spellcheck="false" onpaste="clipBoardRead(event)"></div>
          <button class="eFileDropdown" dropdown="dropdowns/editor/file">File</button>
        </div>
        <div class="eTopSection">
          <button class="eSaveProgress eUndo" style="margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px"><img src="./images/tooltips/progress/undo.svg"></button>
          <button class="eSaveProgress eRedo" style="margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0"><img src="./images/tooltips/progress/redo.svg"></button>
          <img class="eConnection" src="./images/editor/top/connection.svg" style="object-position: -60px -4px" disabled>
          <div class="eStatus">Saved</div>
        </div>
        <div class="eTopSection eTopMargin">
          <button class="eMembers" dropdown="dropdowns/editor/members" disabled><span class="eMemberCount">25</span>Members</button>
          <button class="eShare" dropdown="dropdowns/editor/share" disabled>Share</button>
          <button class="eSharePin"></button>
        </div>
        <div class="eTopSection">
          <button class="eZoom" dropdown="dropdowns/editor/zoom"><span class="eZoomBox">100</span>%</button>
          <button class="eAccount" dropdown="dropdowns/account"><img src="./images/profiles/default.svg" accountimage><div accountuser></div></button>
          <button class="eLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="eSide">
      <div class="eToolbar"></div>
    </div>
    <div class="eBottom">
      <button class="ePageNav" down><img src="./images/editor/bottom/downarrow.svg"></button>
      <div class="eCurrentPage"></div>
      <button class="ePageNav" up><img src="./images/editor/bottom/uparrow.svg"></button>
    </div>
    <div class="eContent">
      <div class="eRealtime"></div>
      <div class="eContentHolder">
        <div class="ePageHolder"></div>
      </div>
    </div>
  </div>
  `,
  /*
    <div class="ePage">
      <div class="ePageContent" style="width: 816px; height: 1059px"></div>
    </div>
    <div class="ePage">
      <div class="ePageContent" style="width: 816px; height: 1059px"></div>
    </div>
    <div class="ePage">
      <div class="ePageContent" style="width: 816px; height: 1059px"></div>
    </div>
  */
  css: {
    ".eMain": `position: relative; pointer-events: none`,

    ".eTopHolder": `position: fixed; width: 100%; z-index: 500`,
    ".eTop": `display: flex; box-sizing: border-box; gap: 8px; width: 100%; padding: 8px; overflow-x: auto`,
    ".eTop::-webkit-scrollbar": `display: none`,
    ".eTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(180, 218, 253, .75); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".eTopScroll img": `width: 22px`,
    ".eTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; border-radius: 16px`,
    ".eTopMargin": `margin-left: auto`,

    ".eLogo": `height: 100%; padding: 0`,
    ".eLogo img": `height: 100%`,
    ".eFileName": `max-width: 360px; padding: 3px; margin: 0 4px; outline: unset; --borderRadius: 4px; --borderColor: var(--secondary); font-size: 20px; white-space: nowrap; --transition: .05s`,
    ".eFileName:focus": `--borderWidth: 4px`,
    ".eFileDropdown": `padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".eSaveProgress": `display: flex; width: 31px; height: 31px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".eSaveProgress img": `width: 24px`,
    ".eConnection": `width: 30px; height: 30px; margin: 0 4px; object-fit: cover; transition: .3s`,
    ".eStatus": `margin: 0px 4px; color: var(--secondary); font-size: 16px; font-weight: 500`,

    ".eMembers": `display: flex; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".eMemberCount": `display: none; padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--theme); font-weight: 700`,
    ".eShare": "padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600",
    ".eSharePin": "display: none; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600",

    ".eZoom": `padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eAccount": `padding: 0; width: 31px; height: 31px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".eAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".eLogin": `display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,

    ".eSide": `position: fixed; display: flex; gap: 8px; height: calc(100% - 132px); top: 58px; padding: 8px; z-index: 500; overflow-y: auto`,
    ".eSide::-webkit-scrollbar": `display: none`,
    ".eToolbar": `display: flex; box-sizing: border-box; width: 50px; margin: auto 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; pointer-events: all`,

    ".eBottom": `position: fixed; right: 8px; bottom: 8px; display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; z-index: 500; pointer-events: all`,
    ".ePageNav": `display: flex; width: 31px; height: 31px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".eCurrentPage": `margin: 0 6px; font-size: 20px`,

    ".eContent": `position: relative; display: flex; width: fit-content; min-width: calc(100% - 132px); min-height: calc(100vh - 132px); padding: 66px; justify-content: center; z-index: 0; background: var(--pageColor); background-image: url(./images/editor/background.svg); background-position: center`,
    ".ePageHolder": `width: fit-content; height: fit-content; border-radius: 16px; transform-origin: 0 0`,
    ".ePage": `position: relative; background: var(--pageColor); transition: .5s`,
    ".ePage::after": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: -1; content: ""; box-shadow: 0px 0px 8px 0px var(--shadowColor); border-radius: inherit`,
    ".ePage:first-child": `border-top-left-radius: 16px; border-top-right-radius: 16px`,
    ".ePage:not(:first-child)": `border-top: dashed var(--darkGray) 4px; border-image: url("./images/editor/border.svg") 10 / 1 / 0 space`,
    ".ePage:last-child": `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px`,
    ".ePageContent": "width: 100%; height: 100%; background: var(--pageColor); opacity: 0; border-radius: inherit",
    ".ePageTextHolder": "--scale-factor: 1; position: absolute; left: 0; top: 0; font-family: sans-serif",
    ".ePageTextHolder span": "position: absolute; color: transparent; pointer-events: all",
    ".ePageTextHolder br": `user-select: none`,

    ".eRealtime": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 100; overflow: hidden`
  },
  loadedPDFs: [], // Keep track of loaded PDFs for releasing memory
  js: async function (page, joinData) {
    this.page = page;
    this.options = {
      cursors: true,
      comments: true,
      fullscreen: false
    };
    this.realtime = {
      strenth: 0
    };
    this.members = {};
    this.memberCount = 0;
    this.active = document.visibilityState == "visible";
    this.syncMembers = async function (memberUpd) {
      for (let i = 0; i < memberUpd.length; i++) {
        let memSet = memberUpd[i];
        this.members[memSet._id] = memSet;
      }
    };
    this.getSelf = function () {
      return this.members[this.sessionID];
    };
    this.updateInterface = async function (page) {
      let toolbar = page.querySelector(".eToolbar");
      let name = page.querySelector(".eFileName");
      let share = page.querySelector(".eShare");
      let access = this.getSelf().access;
      if (access == 0) {
        toolbar.setAttribute("hidden", "");
        toolbar.offsetHeight;
        toolbar.style.transition = ".3s";

        name.removeAttribute("contenteditable");
      } else {
        toolbar.removeAttribute("hidden");

        name.setAttribute("contenteditable", "");
      }
      if (access < 2) {
        share.style.display = "none";
      } else {
        share.style.display = "flex";
      }
      (await getModule("dropdown")).close();
    };

    // PRELOAD ASSETS
    loadScript("../libraries/pdfjs/pdf.js");
    loadScript("../modules/editor/realtime.js");
    
    page.style.removeProperty("display");
    page.style.width = "fit-content";
    page.style.minWidth = "100%";

    if (connected) {
      this.realtime.strenth = 1;
    }
    closeCallback = () => {
      this.realtime.strenth = 1;
      if (this.realtime.module) {
        this.realtime.module.connectUpdate();
      }
    }

    setFrame("editor/toolbar", page.querySelector(".eToolbar"));

    let loginButton = page.querySelector(".eLogin");
    if (userID) {
      page.querySelector(".eAccount div").textContent = account.user;
      if (account.image) {
        page.querySelector(".eAccount img").src = account.image;
      }
    } else {
      page.querySelector(".eAccount").remove();
      loginButton.style.display = "block";
      loginButton.addEventListener("click", promptLogin);
    }

    let lessonID = getParam("lesson") || "";
    this.id = lessonID;

    this.codeTextButton = page.querySelector(".eSharePin");

    let memberCount = page.querySelector(".eMembers");
    let memberCountNum = memberCount.querySelector(".eMemberCount");
    let updateMemberCount = () => {
      let counts = document.querySelectorAll(".eMemberCount");
      this.memberCount = Object.keys(this.members).length;
      for (let i = 0; i < counts.length; i++) {
        counts[i].textContent = this.memberCount;
      }
      if (this.memberCount > 1) {
        memberCountNum.style.display = "unset";
        memberCount.style.padding = "4px 10px 4px 4px";
      } else {
        memberCountNum.style.display = "none";
        memberCount.style.padding = "6px 10px";
      }
    }

    this.members = {};

    let removeRealtimeElem = (userid) => {
      if (this.realtime != null && this.realtime.module.removeRealtime != null) {
        this.realtime.module.removeRealtime(userid);
      }
    }

    socket.remotes["member"] = (data) => {
      if (data.lesson != lessonID) {
        return;
      }
      switch (data.task) {
        case "kick":
          setFrame("pages/join");
      }
    };
    socket.remotes["lesson_" + lessonID] = (data) => {
      let body = data.data;
      /*
      if (body.lesson != lessonID) {
        return;
      }
      */
      switch (data.task) {
        case "join":
          this.members[body._id] = body;
          updateMemberCount();
          if (body.method == "shared" && this.emailInvite != null) {
            this.emailInvite("join", { _id: body.user, email: body.email, user: body.name, image: body.image });
          }
          break;
        case "leave":
          if (this.members[body._id]) {
            delete this.members[body._id];
          }
          removeRealtimeElem(body._id);
          updateMemberCount();
          /*
          if (body._id == this.sessionID && currentPage == "editor") { // Self
            setFrame("pages/join");
          }
          */
          break;
        case "update":
          if (this.members[body._id]) {
            let memberKeys = Object.keys(body);
            let member = this.members[body._id];
            if (body.access != null && member.access != body.access) { // Must update their access:
              removeRealtimeElem(body._id);
            }
            for (let i = 0; i < memberKeys.length; i++) {
              let key = memberKeys[i];
              member[key] = body[key];
            }
            if (member._id == this.sessionID) { // Self
              if (body.access != null) {
                this.updateInterface(page);
              }
            }
          }
          break;
        case "set":
          objectUpdate(body, this.lesson);
          page.querySelector(".eFileName").textContent = this.lesson.name || "Untitled Lesson";
          if (body.hasOwnProperty("pin")) {
            if (this.updatePin) {
              this.updatePin();
            }
            if (body.pin != null) {
              this.codeTextButton.textContent = body.pin;
              this.codeTextButton.style.display = "unset";
            } else {
              this.codeTextButton.style.display = "none";
            }
          }
          if (body.hasOwnProperty("access")) {
            if (this.updateLink) {
              this.updateLink();
            }
          }
          if (body.settings && body.settings.hasOwnProperty("forceLogin")) {
            let actionButton = fixed.querySelector(".eShareActionPin, .eShareActionLink");
            if (actionButton != null) {
              if (body.settings.forceLogin == true) {
                actionButton.setAttribute("on", "");
                actionButton.removeAttribute("off");
              } else {
                actionButton.setAttribute("off", "");
                actionButton.removeAttribute("on");
              }
            }
          }
          enableScrollTop();
          break;
        case "invite":
          if (this.emailInvite != null) {
            this.emailInvite(data.subTask, body);
          }
      }

      if (this.updateMembersList != null) {
        this.updateMembersList(data);
      }
    }; // Subscribe before to make sure no members are lost in request time.

    let sendBody = { ss: socket.secureID };
    if (this.active == false) {
      sendBody.active = false;
    }
    if (this.id != lessonID) {
      delete this.session;
    }
    joinData = joinData || {};
    if (joinData.pin) {
      sendBody.pin = joinData.pin;
    }
    if (joinData.name) {
      sendBody.name = joinData.name;
    }
    if (joinData.from == "pages/join") {
      delete this.session;
    }
    let [code, body, extra] = await sendRequest("POST", "lessons/join?lesson=" + lessonID, sendBody, { session: this.session, allowError: [403, 406] });
    if (code == 403 || code == 406) {
      page.innerHTML = "";
      setFrame("pages/join");
    }
    if (code != 200) {
      return;
    }

    this.lesson = body.lesson;
    this.lesson.settings = this.lesson.settings || {};

    if (this.lesson.pin) {
      this.codeTextButton.style.display = "unset";
      this.codeTextButton.textContent = this.lesson.pin;
    }

    if (extra.took < 2500) {
      this.realtime.strenth = 3;
    } else {
      this.realtime.strenth = 2;
    }

    this.sessionID = body.session._id;
    this.session = body.session._id + ";" + body.session.token;

    let sentPing = false;
    let sendPing = () => {
      let path = "lessons/ping";
      if (this.active == false) {
        path += "?idle";
      }
      sentPing = true;
      return sendRequest("GET", path, null, { session: this.session, allowError: [403] });
    }
    tempListeners.push({
      type: "interval", interval: setInterval(async () => {
        if (connected) {
          if (sentPing == false) {
            let [code] = await sendPing();
            if (code == 403) {
              setFrame("pages/join");
              return;
            } else if (code != 200) {
              setFrame("pages/editor");
              return;
            }
          }
          sentPing = false;
          if (this.realtime) {
            this.realtime.ping();
          }
        }
      }, 60000)
    }); // PING every minute

    this.syncMembers(body.members);
    updateMemberCount();

    this.updateInterface(page);

    (async () => {
      (await getModule("editor/realtime")).js(this, page);
    })();

    page.querySelector(".eLogo").addEventListener("click", function (event) {
      event.preventDefault();
      setFrame("pages/dashboard");
    });
    let nameBox = page.querySelector(".eFileName");
    nameBox.textContent = this.lesson.name || "Untitled Lesson";
    nameBox.addEventListener("keydown", function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        return;
      }
      enableScrollTop();
    });
    nameBox.addEventListener("focusout", async () => {
      let name = nameBox.textContent.substring(0, 30).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        nameBox.textContent = this.lesson.name;
        return;
      }
      if (nameBox.textContent == this.lesson.name) {
        return;
      }
      nameBox.textContent = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.session });
      if (code != 200) {
        nameBox.textContent = this.lesson.name;
      }
    });

    let eTop = page.querySelector(".eTop");
    let eTopScrollLeft = page.querySelector(".eTopScrollLeft");
    let eTopScrollRight = page.querySelector(".eTopScrollRight");
    function enableScrollTop() {
      if (eTop.scrollWidth > eTop.clientWidth - 1) {
        if (eTop.scrollLeft > 0) {
          eTopScrollLeft.style.opacity = 1;
          eTopScrollLeft.style.pointerEvents = "all";
        } else {
          eTopScrollLeft.style.opacity = 0;
          eTopScrollLeft.style.pointerEvents = "none";
        }
        if (eTop.scrollWidth - eTop.scrollLeft - 1 > eTop.clientWidth) {
          eTopScrollRight.style.opacity = 1;
          eTopScrollRight.style.pointerEvents = "all";
        } else {
          eTopScrollRight.style.opacity = 0;
          eTopScrollRight.style.pointerEvents = "none";
        }
      } else {
        eTopScrollLeft.style.opacity = 0;
        eTopScrollLeft.style.pointerEvents = "none";
        eTopScrollRight.style.opacity = 0;
        eTopScrollRight.style.pointerEvents = "none";
      }
    }
    eTopScrollLeft.addEventListener("click", function () {
      eTop.scrollTo({ left: eTop.scrollLeft - 200, behavior: "smooth" });
      enableScrollTop();
    });
    eTopScrollRight.addEventListener("click", function () {
      eTop.scrollTo({ left: eTop.scrollLeft + 200, behavior: "smooth" });
      enableScrollTop();
    });
    enableScrollTop();
    tempListen(window, "resize", enableScrollTop);
    eTop.addEventListener("scroll", enableScrollTop);

    this.visiblePages = [];

    // RELEASE OLD MEMORY
    for (let i = 0; i < this.loadedPDFs.length; i++) {
      this.loadedPDFs[i].destroy();
    }
    this.loadedPDFs = [];

    // EDITOR
    let contentHolder = page.querySelector(".eContent");
    let content = contentHolder.querySelector(".eContentHolder");
    let pageHolder = content.querySelector(".ePageHolder");
    let bottomHolder = page.querySelector(".eBottom");
    switch (this.lesson.type) {
      case "standard":
        let pages = getObject(body.pages || [], "_id");
        let sources = getObject(body.sources || [], "_id");

        await loadScript("./libraries/pdfjs/pdf.js");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "./libraries/pdfjs/pdf.worker.js";

        let currentPage = 1;

        let scrollOffset = 66;

        bottomHolder.querySelector(".eCurrentPage").innerHTML = '<b>1</b> / ' + body.pages.length;
        bottomHolder.querySelector(".ePageNav[down]").addEventListener("click", function () {
          let nextPage = pageHolder.children[currentPage] || pageHolder.children[pageHolder.children.length - 1];
          if (nextPage) {
            window.scrollTo({ top: window.scrollY + nextPage.getBoundingClientRect().top - scrollOffset, behavior: "smooth" });
          }
        });
        bottomHolder.querySelector(".ePageNav[up]").addEventListener("click", function () {
          let nextPage = pageHolder.children[currentPage - 2] || pageHolder.children[0];
          if (nextPage) {
            window.scrollTo({ top: window.scrollY + nextPage.getBoundingClientRect().top - scrollOffset, behavior: "smooth" });
          }
        });

        // Must loop through all pages checking if they are on-screen
        for (let i = 0; i < pageHolder.childElementCount; i++) {
          if (inViewport(pageHolder.children[i])) {
            currentPage = i + 1;
            break;
          }
        }
        async function loadPage(pageElem) {
          if (pageElem == null) {
            return;
          }
          let pageID = pageElem.getAttribute("pageid");
          let pageData = pages[pageID];
          let canvas;
          await Promise.all([
            new Promise(async (resolve) => {
              // Get page
              let sourceData = sources[pageData.source];
              if (sourceData) {
                sourceData.pdf.getPage(pageData.page).then(async function (pageRender) {
                  if (pageElem.hasAttribute("loading") == false) {
                    resolve();
                    return;
                  }
                  let viewport = pageRender.getViewport({ scale: 1.5 });

                  pageElem.insertAdjacentHTML("beforeend", `<canvas class="ePageContent" new></canvas>`);
                  canvas = pageElem.querySelector(".ePageContent[new]");
                  canvas.removeAttribute("new");

                  let context = canvas.getContext("2d");

                  canvas.width = viewport.width;
                  canvas.height = viewport.height;
                  //canvas.style.width = viewport.width + "px";
                  //canvas.style.height = viewport.height + "px";

                  pageRender.render({
                    canvasContext: context,
                    viewport: viewport
                  }).promise.then(function () {
                    resolve();
                  });

                  pageElem.setAttribute("loaded", "");

                  pageElem.insertAdjacentHTML("beforeend", `<div class="ePageTextHolder" new></div>`);
                  let textHolder = pageElem.querySelector(".ePageTextHolder[new]");
                  textHolder.removeAttribute("new");

                  pageRender.getTextContent().then(function (textContent) {
                    if (pageElem.hasAttribute("loading") == false) {
                      return;
                    }
                    pdfjsLib.renderTextLayer({
                      enhanceTextSelection: true,
                      textContentSource: textContent,
                      container: textHolder,
                      viewport: pageRender.getViewport({ scale: 1 }),
                      textDivs: []
                    });
                    pageElem.setAttribute("loaded", "");
                  });
                });
              } else {
                resolve();
              }
            }),
            new Promise(async (resolve) => {
              // Get markup
              resolve();
            })
          ]);
          // Remove loading
          if (canvas) {
            canvas.style.transition = ".5s";
            canvas.offsetHeight;
            canvas.style.opacity = 1;
          }
          let loading = pageElem.querySelector(".loading");
          if (loading) {
            loading.setAttribute("done", "");
            loading.style.opacity = 0;
            await sleep(500);
            loading.remove();
          }
        }
        let renderPages = async () => {
          let loadedIn = [];
          for (let i = -3; i < this.visiblePages.length + 3; i++) {
            let pageNum = 1;
            if (i < 0) {
              pageNum = this.visiblePages[0] + i;
            } else if (i > this.visiblePages.length - 1) {
              pageNum = this.visiblePages[this.visiblePages.length - 1] + i - (this.visiblePages.length - 1);
            } else {
              pageNum = this.visiblePages[i];
            }
            if (pageNum < 1) {
              continue;
            } else if (pageNum > pageHolder.children.length) {
              break;
            }
            let pageElem = pageHolder.children[pageNum - 1];
            if (pageElem == null) {
              continue;
            }
            let pageID = pageElem.getAttribute("pageid");
            if (pageID == null) {
              return;
            }
            loadedIn.push(pageID);
            if (pageElem.hasAttribute("loading") == false) {
              let pageData = pages[pageID];
              let sourceData = sources[pageData.source];
              pageElem.insertAdjacentHTML("beforeend", loadingAnim);
              let loading = pageElem.querySelector(".loading[new]");
              loading.removeAttribute("appload");
              runLoadingAnim(loading);
              loading.style.transition = "unset";
              loading.style.opacity = 0;
              loading.offsetHeight;
              loading.style.transition = "opacity .5s";
              if (page.querySelector(".loading[appload]") == null) {
                (async function () { // Only show loading after a tiny period of time:
                  await sleep(500);
                  if (loading && loading.hasAttribute("done") == false) {
                    loading.style.opacity = 1;
                  }
                })();
              }
              loading.removeAttribute("new");
              pageElem.setAttribute("loading", "");
              if (sourceData == null || sourceData.pdf) {
                loadPage(pageElem);
              } else if (sourceData.loading != true) {
                sourceData.loading = true;

                // Load PDFJS
                if (window.pdfjsLib == null) {
                  await loadScript("../libraries/pdfjs/pdf.js");
                  pdfjsLib.GlobalWorkerOptions.workerSrc = "../libraries/pdfjs/pdf.worker.js";
                }

                let loadingTask = pdfjsLib.getDocument(assetURL + sourceData.source);
                this.loadedPDFs.push(loadingTask);
                loadingTask.promise.then(function (pdf) {
                  sourceData.pdf = pdf;
                  let loadInPages = pageHolder.querySelectorAll('.ePage[sourceid="' + pageData.source + '"][loading]');
                  for (let i = 0; i < loadInPages.length; i++) {
                    loadPage(loadInPages[i]);
                  }
                });
              }
            }
          }
          let loadedPages = pageHolder.querySelectorAll(".ePage[loading], .ePage[loaded]");
          for (let i = 0; i < loadedPages.length; i++) {
            let page = loadedPages[i];
            if (loadedIn.includes(page.getAttribute("pageid")) == false) {
              if (page.querySelector(".loading")) {
                page.querySelector(".loading").remove();
              }
              if (page.querySelector(".ePageContent")) {
                page.querySelector(".ePageContent").remove();
              }
              if (page.querySelector(".ePageTextHolder")) {
                page.querySelector(".ePageTextHolder").remove();
              }
              page.removeAttribute("loading");
              page.removeAttribute("loaded");
            }
          }
        }
        let scrollSubTimeout;
        this.updatePages = () => {
          // Can go off current page to see which pages are visible or not
          this.visiblePages = [];
          let checkInt = 1;
          if (inViewport(pageHolder.children[currentPage - 1], true)) {
            this.visiblePages.unshift(currentPage);
          }
          while (true) {
            let beforeNoRun = true;
            let afterNoRun = true;
            if (currentPage - checkInt > 0) { // Check page before
              if (inViewport(pageHolder.children[currentPage - checkInt - 1], true)) {
                this.visiblePages.unshift(currentPage - checkInt);
                beforeNoRun = false;
              }
            }
            if (currentPage + checkInt < pageHolder.childElementCount + 1) { // Check page after
              if (inViewport(pageHolder.children[currentPage + checkInt - 1], true)) {
                this.visiblePages.push(currentPage + checkInt);
                afterNoRun = false;
              }
            }
            checkInt++;
            if ((this.visiblePages.length > 0 && beforeNoRun && afterNoRun) || checkInt > 500) {
              break;
            }
          }
          if (this.visiblePages.length > 0) {
            currentPage = this.visiblePages[Math.floor(this.visiblePages.length / 2)];
          }
          if (this.realtime.module) {
            clearTimeout(scrollSubTimeout);
            scrollSubTimeout = setTimeout(() => {
              this.realtime.module.setShortSub(this.visiblePages);
              modifyParams("page", currentPage);
            }, 750);
            if (this.scrollEvent) {
              this.scrollEvent();
            }
          }
          bottomHolder.querySelector(".eCurrentPage b").textContent = currentPage;
          if (currentPage > pageHolder.childElementCount - 1) {
            bottomHolder.querySelector(".ePageNav[down]").setAttribute("disabled", "");
          } else {
            bottomHolder.querySelector(".ePageNav[down]").removeAttribute("disabled");
          }
          if (currentPage < 2) {
            bottomHolder.querySelector(".ePageNav[up]").setAttribute("disabled", "");
          } else {
            bottomHolder.querySelector(".ePageNav[up]").removeAttribute("disabled");
          }
          renderPages();
        }
        tempListen(window, "scroll", this.updatePages);
        tempListen(window, "resize", this.updatePages);

        // Load pages:
        for (let i = 0; i < body.pages.length; i++) {
          let page = body.pages[i];
          let includeSource = "";
          if (page.source) {
            includeSource = ` sourceid="${page.source}"`;
          }
          pageHolder.insertAdjacentHTML("beforeend", `<div class="ePage" pageid="${page._id}"${includeSource} style="width: ${page.width}px; height: ${page.height}px"></div>`);
        }

        let scrollPage = getParam("page") || 1;
        let scrollElem = pageHolder.children[scrollPage - 1];
        if (scrollElem != null) {
          window.scrollTo({ top: window.scrollY + scrollElem.getBoundingClientRect().top - scrollOffset });
        }
        break;
      case "freeboard":
        //pageHolder.remove();
        bottomHolder.remove();
    }

    tempListen(window, "resize", () => {
      this.realtime.module.adjustRealtimeHolder();
    });

    // Zoom
    this.zoom = 1;
    this.setZoom = (set) => {
      set = set || 0;

      let pageScrollX = window.scrollX;
      let pageScrollY = window.scrollY;

      let prevWidth = pageHolder.clientWidth * this.zoom;
      let prevHeight = pageHolder.clientHeight * this.zoom;

      this.zoom = set || this.zoom;

      if (this.zoom > 2.5) {
        this.zoom = 2.5;
      } else if (this.zoom < .2) {
        this.zoom = .2;
      }

      //pageHolder.style.zoom = zoom;
      pageHolder.style.transform = `scale(${this.zoom})`; // translate(${(pageHolder.clientWidth * zoom) / 2}px, ${(pageHolder.clientHeight * zoom) / 2}px)
      //pageHolder.style.margin = `${(pageHolder.clientHeight - (pageHolder.clientHeight * zoom)) / 2}px ${(pageHolder.clientWidth - (pageHolder.clientWidth * zoom)) / 2}px`;
      //pageHolder.style.transformOrigin = mousePositionX + "px " + mousePositionY + "px";

      let newWidth = pageHolder.clientWidth * this.zoom;
      let newHeight = pageHolder.clientHeight * this.zoom;

      content.style.width = newWidth + "px";
      content.style.height = newHeight + "px";

      window.scrollTo(pageScrollX * (newWidth / prevWidth), pageScrollY * (newHeight / prevHeight));

      let updateZoomPercentBoxes = document.querySelectorAll(".eZoomBox");
      for (let i = 0; i < updateZoomPercentBoxes.length; i++) {
        updateZoomPercentBoxes[i].textContent = Math.round(this.zoom * 100);
      }
      if (fixed.querySelector(".eZoomHolder")) {
        if (this.zoom >= 2.5) {
          fixed.querySelector(".eZoomButton[add]").setAttribute("disabled", "");
        } else {
          fixed.querySelector(".eZoomButton[add]").removeAttribute("disabled");
        }
        if (this.zoom <= .2) {
          fixed.querySelector(".eZoomButton[sub]").setAttribute("disabled", "");
        } else {
          fixed.querySelector(".eZoomButton[sub]").removeAttribute("disabled");
        }
      }

      if (this.updatePages) {
        this.updatePages();
      }

      this.realtime.module.adjustRealtimeHolder();
    }
    let scrollMouseWheel = (event) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.wheelDelta > 0) {
          this.setZoom(this.zoom + 0.1, { x: event.clientX, y: event.clientY });
        } else if (event.wheelDelta < 0) {
          this.setZoom(this.zoom - 0.1, { x: event.clientX, y: event.clientY });
        }
        event.preventDefault();
      }
    }
    tempListen(window, "DOMMouseScroll", scrollMouseWheel, { passive: false });
    tempListen(window, "mousewheel", scrollMouseWheel, { passive: false });
    
    // Handle MOBILE
    /*
    let initialDistance = null;

    function calculateDistance(touches) {
      let [x1, y1] = [touches[0].pageX, touches[0].pageY];
      let [x2, y2] = [touches[1].pageX, touches[1].pageY];
      return Math.hypot(x2 - x1, y2 - y1);
    }

    function handlePinchZoom(event) {
      let touches = event.touches;
      if (touches.length !== 2) return;

      let currentDistance = calculateDistance(touches);

      if (initialDistance === null) {
        initialDistance = currentDistance;
      } else {
        let distanceChange = currentDistance - initialDistance;
        document.title = distanceChange;

        this.setZoom(this.zoom + Math.floor(distanceChange * 0.1));
      }

      event.preventDefault();
    }

    function handleTouchEnd() {
      initialDistance = null;
    }

    tempListen(window, "touchmove", handlePinchZoom, { passive: false });
    tempListen(window, "touchend", handleTouchEnd, { passive: false });
    */

    // Fullscreen
    let pageUpdateInterval;
    tempListen(document, "fullscreenchange", () => {
      this.options.fullscreen = document.fullscreenElement != null;
      let fullscreenToggle = fixed.querySelector('.eZoomAction[option="fullscreen"]');
      if (this.options.fullscreen) {
        fullscreenToggle.setAttribute("on", "");
        fullscreenToggle.removeAttribute("off");
        pageUpdateInterval = setInterval(this.updatePages, 10);
      } else {
        fullscreenToggle.setAttribute("off", "");
        fullscreenToggle.removeAttribute("on");
        clearInterval(pageUpdateInterval);
      }
    });

    // On page:
    tempListen(document, "visibilitychange", () => {
      this.active = document.visibilityState == "visible";
      sendPing();
    });

    // LOAD IN:
    if (this.updatePages) {
      this.updatePages();
    }
  }
}

modules["dropdowns/editor/zoom"] = {
  html: `
  <div class="eZoomHolder">
    <button class="eZoomButton buttonAnim border" sub change="-.1">-</button>
    <div class="eZoomLevel border"><div class="eZoomBox" contenteditable>100</div>%</div>
    <button class="eZoomButton buttonAnim border" add change=".1">+</button>
  </div>
  <div class="eZoomLine"></div>
  <button class="eZoomAction" option="cursors" title="Display the cursors of other editors."><div label>Cursors</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="comments" title="Show comments on the document."><div label>Comments</div><div class="eZoomToggle"><div></div></div></button>
  <div class="eZoomLine"></div>
  <button class="eZoomAction" option="fullscreen" title="Fullscreen allows increased accessibility."><div label>Fullscreen</div><div class="eZoomToggle"><div></div></div></button>
  `,
  css: {
    ".eZoomHolder": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".eZoomButton": `position: relative; display: flex; width: 22px; height: 22px; margin: 20px 3px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 8px; color: var(--theme); font-size: 24px; font-weight: 600; line-height: 0`,
    '.eZoomButton[change="-.1"]': `cursor: zoom-out`,
    '.eZoomButton[change=".1"]': `cursor: zoom-in`,
    ".eZoomLevel": `display: flex; padding: 3px 6px 3px 3px; margin: 0 12px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eZoomLevel div": `max-width: 50px; min-width: 25px; padding: 3px 6px; margin-right: 3px; border: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`,

    ".eZoomLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,

    ".eZoomAction": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eZoomAction:not(:last-child)": `margin-bottom: 4px`,
    ".eZoomAction div[label]": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eZoomAction[on]": `--themeColor: var(--theme)`,
    ".eZoomAction[off]": `--themeColor: var(--error)`,
    ".eZoomToggle": `position: relative; width: 36px; height: 20px; padding: 2px; margin-left: 12px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eZoomToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eZoomAction[on] .eZoomToggle div": `right: 2px`,
    ".eZoomAction[off] .eZoomToggle div": `right: calc(100% - 22px)`,
    ".eZoomAction:hover": `background: var(--themeColor); color: #fff`,
    ".eZoomAction:hover .eZoomToggle": `background: #fff`,
    ".eZoomAction:hover .eZoomToggle div": `background: var(--themeColor)`,

    "body:fullscreen": `overflow: auto !important`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    let zoomPercentage = frame.querySelector(".eZoomLevel div");
    function setZoomText() {
      zoomPercentage.textContent = Math.round(editor.zoom * 100);
    }
    setZoomText();
    editor.setZoom();
    let setButtonOptions = frame.querySelectorAll(".eZoomAction");
    for (let i = 0; i < setButtonOptions.length; i++) {
      let buttonToggle = setButtonOptions[i];
      if (editor.options[buttonToggle.getAttribute("option")] == true) {
        buttonToggle.setAttribute("on", "");
      } else {
        buttonToggle.setAttribute("off", "");
      }
    }
    function forceSetZoom() {
      editor.setZoom(parseInt(zoomPercentage.textContent) / 100);
    }
    zoomPercentage.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        forceSetZoom();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 250) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 250%");
        }
      }
    });
    zoomPercentage.addEventListener("focusout", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      let textInt = parseInt(textBox.textContent) || 0;
      if (textInt == "") {
        setZoomText();
      } else if (textInt > 250) {
        textBox.textContent = "250";
      } else if (textInt < 20) {
        textBox.textContent = "20";
      }
      forceSetZoom();
    });
    if (editor.realtime.strenth < 3) {
      let zoomAction = fixed.querySelector('.eZoomAction[option="cursors"]');
      zoomAction.style.opacity = 0.5;
      zoomAction.title = "Cursors disabled due to weak connection.";
    }
    frame.addEventListener("click", (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let textBox = event.target.closest(".eZoomLevel div");
      if (textBox) {
        textBox.textContent = "";
        return;
      }
      let zoomChange = element.closest(".eZoomButton");
      if (zoomChange) {
        editor.setZoom(editor.zoom + parseFloat(zoomChange.getAttribute("change")));
        return;
      }
      let toggle = element.closest(".eZoomAction");
      if (toggle) {
        if (toggle.hasAttribute("on")) {
          toggle.setAttribute("off", "");
          toggle.removeAttribute("on");
          editor.options[toggle.getAttribute("option")] = false;
        } else {
          toggle.setAttribute("on", "");
          toggle.removeAttribute("off");
          editor.options[toggle.getAttribute("option")] = true;
        }
        if (toggle.getAttribute("option") == "cursors") {
          if (editor.realtime.module) {
            editor.realtime.module.setShortSub(editor.visiblePages);
          }
          if (toggle.hasAttribute("off")) {
            editor.page.querySelector(".eRealtime").innerHTML = "";
          }
        }
        if (toggle.getAttribute("option") == "fullscreen") {
          if (toggle.hasAttribute("on")) {
            if (body.requestFullscreen) {
              body.requestFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        }
      }
    });
  }
}