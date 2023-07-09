modules["pages/editor"] = {
  title: "Editor",
  preJs: function () {
    if ((getParam("lesson") || "").length < 1) {
      setFrame("pages/dashboard", app, { override: true });
      return false;
    }
  },
  html: `<div class="eNav">
    <div class="eTopHolder">
      <button class="eTopScroll eTopScrollLeft" style="left: 8px"><img src="./images/editor/top/leftarrow.svg"></button>
      <button class="eTopScroll eTopScrollRight" style="right: 8px"><img src="./images/editor/top/rightarrow.svg"></button>
      <div class="eTop">
        <div class="eTopSection">
          <a class="eLogo" href="/#dashboard"><img src="./images/logo.svg"></a>
          <div class="eFileName" contenteditable spellcheck="false"></div>
          <button class="eFileDropdown" dropdown="dropdowns/account">File</button>
        </div>
        <div class="eTopSection">
          <button class="eSaveProgress eUndo" style="margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 0 0 16px"><img src="./images/tooltips/progress/undo.svg"></button>
          <button class="eSaveProgress eRedo" style="margin: 0 4px 0 2px; justify-content: start; border-radius: 0 16px 16px 0"><img src="./images/tooltips/progress/redo.svg"></button>
          <img class="eConnection" src="./images/editor/top/connection.svg" style="object-position: -60px -4px" title="Strong Connection | All features synced to cloud.">
          <div class="eStatus">Saved</div>
        </div>
        <div class="eTopSection eTopMargin">
          <button class="eMembers" dropdown="dropdowns/account"><span class="eMemberCount">25</span>Members</button>
          <button class="eShare" dropdown="dropdowns/account">Share</button>
        </div>
        <div class="eTopSection">
          <button class="eZoom" dropdown="dropdowns/account">100%</button>
          <button class="eAccount" dropdown="dropdowns/account"><img src="./images/profiles/default.svg"><div></div></button>
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
      <div class="ePageHolder"></div>
    </div>
  </div>`,
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
    ".eNav": `position: relative`,

    ".eTopHolder": `position: fixed; width: 100%; z-index: 500`,
    ".eTop": `display: flex; box-sizing: border-box; gap: 8px; width: 100%; padding: 8px; overflow-x: auto`,
    ".eTop::-webkit-scrollbar": `display: none`,
    ".eTopScroll": `position: absolute; display: none; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(180, 218, 253, .75); backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center`,
    ".eTopScroll img": `width: 22px`,
    ".eTopScroll:active": `transform: translateY(-50%) scale(.85)`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px`,
    ".eTopMargin": `margin-left: auto`,

    ".eLogo": `height: 100%; padding: 0`,
    ".eLogo img": `height: 100%`,
    ".eFileName": `padding: 3px; margin: 0 4px; border-radius: 6px; font-size: 20px; white-space: nowrap; transition: .05s`,
    ".eFileName:focus": `outline: solid 4px var(--secondary)`,
    ".eFileDropdown": `padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".eSaveProgress": `display: flex; width: 31px; height: 31px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".eSaveProgress img": `width: 24px`,
    ".eConnection": `width: 30px; height: 30px; margin: 0 4px; object-fit: cover`,
    ".eStatus": `margin: 0px 4px; color: var(--secondary); font-size: 16px; font-weight: 500`,

    ".eMembers": `display: flex; padding: 4px 10px 4px 4px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".eMemberCount": `padding: 2px 6px; margin-right: 5px; background: #fff; border-radius: 12px; color: var(--theme); font-weight: 700`,
    ".eShare": "padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600",

    ".eZoom": `padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eAccount": `padding: 0; width: 31px; height: 31px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".eAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".eLogin": `display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,

    ".eSide": `position: fixed; display: flex; gap: 8px; height: calc(100% - 132px); top: 58px; padding: 8px; z-index: 500; overflow-y: auto`,
    ".eSide::-webkit-scrollbar": `display: none`,
    ".eToolbar": `display: flex; box-sizing: border-box; width: 50px; margin: auto 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px`,

    ".eBottom": `position: fixed; right: 8px; bottom: 8px; display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; z-index: 500`,
    ".ePageNav": `display: flex; width: 31px; height: 31px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".eCurrentPage": `margin: 0 6px; font-size: 20px`,

    ".eContent": `position: relative; display: flex; width: fit-content; min-width: 100%; min-height: 100vh; z-index: 0; justify-content: center; background-image: url(./images/editor/background.svg); background-position: center`,
    ".ePageHolder": `width: fit-content; height: fit-content; margin: 66px; border-radius: 16px`,
    ".ePage": `position: relative; background: var(--pageColor); pointer-events: none`,
    ".ePage::after": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: -1; content: ""; box-shadow: 0px 0px 8px 0px var(--shadowColor); border-radius: inherit`,
    ".ePage:first-child": `border-top-left-radius: 16px; border-top-right-radius: 16px`,
    ".ePage:not(:first-child)": `border-top: dashed var(--darkGray) 4px; border-image: url("./images/editor/border.svg") 10 / 1.2 / 0 space`,
    ".ePage:last-child": `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px`,
    ".ePageContent": "border-radius: inherit",
    ".ePageTextHolder": "--scale-factor: 1; position: absolute; left: 0; top: 0; font-family: sans-serif",
    ".ePageTextHolder span": "position: absolute; color: transparent; pointer-events: all",
    ".ePageTextHolder br": `user-select: none`
  },
  js: async function (page) {
    //loadScript("../libraries/pdfjs/pdf.js");

    page.style.removeProperty("display");

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
    let [code, body] = await sendRequest("POST", "lessons/join?lesson=" + lessonID, { ss: socket.secureID }, { session: this.session });
    if (code != 200) {
      return;
    }

    this.session = body.session._id + ";" + body.session.token;
    tempListeners.push({ type: "interval", interval: setInterval(async () => {
      let [code, body] = await sendRequest("GET", "lessons/ping", null, { session: this.session });
      if (code == 403) {
        setFrame("pages/editor");
      }
    }, 60000)}); // PING every minute

    let lesson = body.lesson;

    page.querySelector(".eLogo").addEventListener("click", function(event) {
      event.preventDefault();
      setFrame("pages/dashboard");
    });
    page.querySelector(".eFileName").textContent = lesson.name || "Untitled Lesson";

    let eTop = page.querySelector(".eTop");
    let eTopScrollLeft = page.querySelector(".eTopScrollLeft");
    let eTopScrollRight = page.querySelector(".eTopScrollRight");
    function enableScrollTop() {
      if (eTop.scrollWidth > eTop.clientWidth) {
        if (eTop.scrollLeft > 0) {
          eTopScrollLeft.style.display = "flex";
        } else {
          eTopScrollLeft.style.display = "none";
        }
        if (eTop.scrollWidth - eTop.scrollLeft > eTop.clientWidth) {
          eTopScrollRight.style.display = "flex";
        } else {
          eTopScrollRight.style.display = "none";
        }
      } else {
        eTopScrollLeft.style.display = "none";
        eTopScrollRight.style.display = "none";
      }
    }
    eTopScrollLeft.addEventListener("click", function() {
      eTop.scrollTo({ left: eTop.scrollLeft - 200, behavior: "smooth" });
    });
    eTopScrollRight.addEventListener("click", function() {
      eTop.scrollTo({ left: eTop.scrollLeft + 200, behavior: "smooth" });
    });
    enableScrollTop();
    tempListen(window, "resize", enableScrollTop);
    eTop.addEventListener("scroll", enableScrollTop);

    // EDITOR
    let contentHolder = page.querySelector(".eContent");
    let pageHolder = contentHolder.querySelector(".ePageHolder");
    let bottomHolder = page.querySelector(".eBottom");
    function inViewport(element, onlyHeight) {
      let rect = element.getBoundingClientRect();
      let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      let viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (onlyHeight != true) {
        return (
          rect.right >= 0 &&
          rect.left <= viewportWidth &&
          rect.bottom >= 0 &&
          rect.top <= viewportHeight
        );
      } else {
        return (
          rect.bottom >= 0 &&
          rect.top <= viewportHeight
        );
      }
    }
    switch (lesson.type) {
      case "standard":
        let pages = getObject(body.pages || [], "_id");
        let sources = getObject(body.sources || [], "_id");

        //await loadScript("../libraries/pdfjs/pdf.js");
        //pdfjsLib.GlobalWorkerOptions.workerSrc = "../libraries/pdfjs/pdf.worker.js";

        let visiblePages = [];
        let currentPage = 1;

        bottomHolder.querySelector(".eCurrentPage").innerHTML = '<b>1</b> / ' + body.pages.length;
        bottomHolder.querySelector(".ePageNav[down]").addEventListener("click", function() {
          let nextPage = pageHolder.children[currentPage];
          if (nextPage) {
            window.scrollTo({ top: window.scrollY + nextPage.getBoundingClientRect().top - 66, behavior: "smooth" });
          }
        });
        bottomHolder.querySelector(".ePageNav[up]").addEventListener("click", function() {
          let nextPage = pageHolder.children[currentPage - 2];
          if (nextPage) {
            window.scrollTo({ top: window.scrollY + nextPage.getBoundingClientRect().top - 66, behavior: "smooth" });
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
          let pageID = pageElem.getAttribute("pageid");
          let pageData = pages[pageID];
          await Promise.all([
            new Promise(async (resolve) => {
              // Get page
              let sourceData = sources[pageData.source];
              if (sourceData) {
                sourceData.pdf.getPage(pageData.page).then(async function(pageRender) {
                  if (pageElem.hasAttribute("loading") == false) {
                    return;
                  }
                  let viewport = pageRender.getViewport({ scale: 1 });
                  
                  pageElem.insertAdjacentHTML("beforeend", `<canvas class="ePageContent" new></canvas>`);
                  let canvas = pageElem.querySelector(".ePageContent[new]");
                  canvas.removeAttribute("new");

                  let context = canvas.getContext('2d');
                  
                  canvas.width = viewport.width;
                  canvas.height = viewport.height;
                  //canvas.style.width = viewport.width + "px";
                  //canvas.style.height = viewport.height + "px";
                  
                  let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                  };
                  pageRender.render(renderContext);

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
                      viewport: viewport,
                      textDivs: []
                    });
                    pageElem.setAttribute("loaded", "");
                  });

                  /*
                  pageRender.getTextContent({ includeMarkedContent: true }).then(async function(textContent) {
                    if (textContent.items.length > 0) {
                      pageElem.insertAdjacentHTML("beforeend", `<div class="ePageTextHolder" new></div>`);
                      let textHolder = pageElem.querySelector(".ePageTextHolder[new]");
                      textHolder.removeAttribute("new");
                      pdfjsLib.renderTextLayer({
                        enhanceTextSelection: true,
                        textContent: textContent,
                        container: textHolder,
                        viewport: viewport,
                        textDivs: []
                      });
                    }
                  });
                  */

                  resolve();
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
          let loading = pageElem.querySelector(".loading");
          if (loading) {
            loading.setAttribute("done", "");
            loading.style.opacity = 0;
            await sleep(500);
            loading.remove();
          }
        }
        async function renderPages() {
          let loadedIn = [];
          for (let i = -3; i < visiblePages.length + 3; i++) {
            let pageNum = 1;
            if (i < 0) {
              pageNum = visiblePages[0] + i;
            } else if (i > visiblePages.length - 1) {
              pageNum = visiblePages[visiblePages.length - 1] + i - (visiblePages.length - 1);
            } else {
              pageNum = visiblePages[i];
            }
            if (pageNum < 1) {
              continue;
            } else if (pageNum > pageHolder.children.length) {
              break;
            }
            let pageElem = pageHolder.children[pageNum - 1];
            let pageID = pageElem.getAttribute("pageid");
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
              if (sourceData == null || sourceData.loaded) {
                loadPage(pageElem);
              } else if (sourceData.loading != true) {
                sourceData.loading = true;

                // Load PDFJS
                await loadScript("../libraries/pdfjs/pdf.js");
                pdfjsLib.GlobalWorkerOptions.workerSrc = "../libraries/pdfjs/pdf.worker.js";

                let loadingTask = pdfjsLib.getDocument(assetURL + sourceData.source);
                loadingTask.promise.then(function(pdf) {
                  sourceData.pdf = pdf;
                  let loadInPages = pageHolder.querySelectorAll('.ePage[sourceid="' + pageData.source + '"][loading]');
                  for (let i = 0; i < loadInPages.length; i++) {
                    loadPage(loadInPages[i]);
                  }
                  sourceData.loaded = true;
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
        function updatePages() {
          // Can go off current page to see which pages are visible or not
          visiblePages = [];
          let checkInt = 1;
          if (inViewport(pageHolder.children[currentPage - 1], true)) {
            visiblePages.unshift(currentPage);
          }
          while (true) {
            let beforeNoRun = true;
            let afterNoRun = true;
            if (currentPage - checkInt > 0) { // Check page before
              if (inViewport(pageHolder.children[currentPage - checkInt - 1], true)) {
                visiblePages.unshift(currentPage - checkInt);
                beforeNoRun = false;
              }
            }
            if (currentPage + checkInt < pageHolder.childElementCount + 1) { // Check page after
              if (inViewport(pageHolder.children[currentPage + checkInt - 1], true)) {
                visiblePages.push(currentPage + checkInt);
                afterNoRun = false;
              }
            }
            checkInt++;
            if ((visiblePages.length > 0 && beforeNoRun && afterNoRun) || checkInt > 500) {
              break;
            }
          }
          if (visiblePages.length > 0) {
            currentPage = visiblePages[Math.floor(visiblePages.length / 2)];
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
        tempListen(window, "scroll", updatePages);
        tempListen(window, "resize", updatePages);

        // Load pages:
        for (let i = 0; i < body.pages.length; i++) {
          let page = body.pages[i];
          let includeSource = "";
          if (page.source) {
            includeSource = ` sourceid="${page.source}"`;
          }
          pageHolder.insertAdjacentHTML("beforeend", `<div class="ePage" pageid="${page._id}"${includeSource} style="width: ${page.width}px; height: ${page.height}px"></div>`);
        }
        updatePages();
        break;
      case "freeboard":
        pageHolder.remove();
        bottomHolder.remove();
    }

  }
}

modules["editor/page"] = {
  html: `
  
  `,
  css: {
    
  },
  js: function (frame) {
    
  }
}