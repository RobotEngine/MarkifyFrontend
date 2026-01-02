modules["pages/app/dashboard"] = class extends page {
  title = "Dashboard";
  allowBackgroundChange = true;
  preload = [
    "../modules/pages/app/lesson.js",
    "../modules/pages/app/join.js",

    "../modules/modals/lesson/newboard.js",
    
    "../modules/dropdowns/account.js",
    "../modules/dropdowns/moveto.js",
    "../modules/dropdowns/remove.js",
    "../modules/dropdowns/gift.js"
  ];
  preJs = () => {
    if (userID == null) {
      checkForAuth(true);
      return false;
    }
    modifyParams("lesson");
    modifyParams("folder");
    modifyParams("page");
    modifyParams("annotation");
    modifyParams("pin");
    modifyParams("type");
  }
  html = `<div class="dPageHolder">
    <div class="dPage" dropdownholder>
      <div class="dSidebarHolder">
        <img class="dBackdropImage" src="../images/dashboard/backdrop.svg" />
        <div class="dSidebar customScroll">
          <div class="dSidebarSection dSidebarHeader">
            <a class="dSidebarLogo" href="/launch"><img src="../images/logo.svg" /></a>
            <a class="dJoinButton largeButton" href="/app/join">Join<img src="../images/tooltips/link.svg" /><div backdrop></div></a>
          </div>
          <div class="dSidebarSection dSidebarActions"></div>
          <div class="dSidebarSection dSidebarSorts">
            <div class="dSidebarTitle"><div title>Sorts</div><div divider></div></div>
            <div class="dSidebarSearch border"><img src="../images/dashboard/search.svg" /><input placeholder="Search..."></input></div>
            <button class="dSidebarSort" sort="recent" selected>Recent</button>
            <button class="dSidebarSort" sort="shared">Shared</button>
            <button class="dSidebarSort" sort="owned">Owned</button>
            <button class="dSidebarSort" sort="newest">Newest</button>
          </div>
          <div class="dSidebarSection dSidebarFolderHeading">
            <div class="dSidebarTitle"><div title>Folders</div><div divider></div><button class="dSidebarNewFolderButton"><img src="../images/dashboard/add.svg" /></button></div>
          </div>
          <div class="dSidebarSection dSidebarFolders">
            <div class="dSidebarFolderHolder" opened></div>
          </div>
          <div class="dSidebarSection dSidebarAccountHolder">
            <div class="dSidebarUpdateAlert" closed>
              <div class="dSidebarUpdateAlertTitle">
                <div>Markify Updated!</div>
                <button class="buttonAnim border"></button>
              </div>
              <div divider></div>
              <a opennew style="--themeColor: var(--theme)"><div image></div>See What's New</a>
              <button share style="--themeColor: var(--purple)"><div image></div>Share Markify</button>
            </div>
            <button class="dAccount largeButton border"><img src="../images/profiles/default.svg" accountimage /><div accountuser>Username</div><div backdrop></div></button>
          </div>
        </div>
        <div class="dSidebarOpen"><div shadow><div></div></div><button><img src="../images/dashboard/opensidebar.svg" /></button></div>
      </div>
      <div class="dLessonsHolder customScroll">
        <div class="dBannerHolder">
          <div class="dBanner">
            <img class="dBannerIcon" src="../images/dashboard/banner/version1release.svg" />
            <div class="dBannerContent">
              <div class="dBannerTitle">Welcome to Markify 1.0</div>
              <div class="dBannerText">Introducing the newly released Markify! We hope you enjoy the new touch-ups.</div>
            </div>
            <div class="dBannerButtons">
              <button class="dBannerFeedback buttonAnim border">Feedback</button>
              <button class="dBannerClose buttonAnim border"></button>
            </div>
          </div>
        </div>
        <div class="dSelectedTitleHolder"></div>
        <div class="dTilesHolder"></div>
      </div>
    </div>
  </div>`;
  css = {
    ".dPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100vw; width: 100dvw; height: 100vh; height: 100dvh; padding: 8px; left: 0px; top: 0px; justify-content: center`, //transition: .2s
    ".dPage": `position: relative; display: flex; width: 100%; height: 100%; max-width: 1585px; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`, //transition: .2s
    
    ".dSidebarHolder": `position: relative; max-width: min(270px, 100%); height: 100%; flex-shrink: 0; background: var(--pageColor); z-index: 2; transition: .4s`,
    ".dBackdropImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 1; opacity: .75; object-fit: cover; z-index: 1; pointer-events: none`,
    ".dSidebar": `position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; box-shadow: var(--darkShadow); overflow: auto; overscroll-behavior: none; z-index: 2`,
    ".dSidebarSection": `position: sticky; box-sizing: border-box; width: 100%; left: 0px; z-index: 2`,
    ".dSidebarTitle": `display: flex; width: 100%; gap: 8px; align-items: center`,
    ".dSidebarTitle div[title]": `color: var(--secondary); font-weight: 600; font-size: 16px`,
    ".dSidebarTitle div[divider]": `flex: 1; height: 4px; background: var(--hover); border-radius: 2px`,

    ".dSidebarOpen": `position: absolute; display: none; padding: 6px; left: 100%; bottom: 68px; background: var(--pageColor); border-radius: 0 36px 36px 0; z-index: 3`,
    ".dSidebarOpen div[shadow]": `position: absolute; width: calc(100% + 12px); height: calc(100% + 24px); left: 0px; top: -12px; border-radius: inherit; overflow: hidden; pointer-events: none`,
    ".dSidebarOpen div[shadow] div": `position: absolute; width: calc(100% - 12px); height: calc(100% - 24px); left: 0px; top: 12px; border-radius: inherit; box-shadow: var(--darkShadow)`,
    ".dSidebarOpen button": `display: flex; width: 80px; height: 60px; border-radius: 10px 30px 30px 10px; justify-content: center; align-items: center`,
    ".dSidebarOpen button:hover": `background: var(--hover)`,
    ".dSidebarOpen button img": `width: 60px; transition: .4s`,

    ".dSidebarHeader": `display: flex; gap: 8px; flex-wrap: wrap; padding: 8px; justify-content: space-between; align-items: center`,
    ".dSidebarLogo": `width: fit-content; height: 36px`,
    ".dSidebarLogo img": `height: 100%`,
    ".dJoinButton": `padding: 4px 10px; font-size: 18px; --borderWidth: 3px; --borderRadius: 12px`,
    ".dJoinButton img": `width: 22px; height: 22px; margin-left: 4px`,

    ".dSidebarActions": `display: flex; flex-direction: column; gap: 8px; padding: 8px; margin: 8px 0; align-items: center`,
    ".dCreateLessonButtonHolder": `display: flex; flex-direction: column; width: fit-content; gap: 6px`,
    ".dCreateLessonButtonHolder > a > div[image]": `position: relative; width: 24px; height: 24px; margin-right: 8px`,
    ".dCreateLessonButtonHolder > a > div[image] > svg": `position: absolute; width: 28px; height: 28px; left: 50%; top: 50%; transform: translate(-50%, -50%)`,
    ".dCreateBoardLessonButton": `--themeColor: var(--theme); --borderRadius: 14px`,
    ".dCreateBreakoutLessonButton": `--themeColor: var(--breakoutTheme); --hover: var(--breakoutHover); --borderRadius: 14px`,

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
    ".dSidebarFolderParent[child]": `padding-left: 20px`,
    ".dSidebarFolder": `--fillColor: var(--theme); --themeColor: var(--fillColor); position: relative; display: flex; padding: 4px; margin-bottom: 6px; border-radius: 8px 18px 18px 8px; align-items: center`,
    ".dSidebarFolder[selected]": `--themeColor: #fff !important`,
    ".dSidebarFolder[selected] div[select]": `opacity: 1 !important`,
    ".dSidebarFolder[selected] div[name]": `color: #fff !important`,
    ".dSidebarFolder[inside]": `--folderFill: var(--themeColor)`,
    ".dSidebarFolder svg[folder]": `width: 28px; height: 28px; margin-left: 2px; z-index: 1`,
    ".dSidebarFolder div[select]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--fillColor); border-radius: inherit; opacity: 0; transition: .1s`,
    ".dSidebarFolder:hover div[select]": `opacity: .2`,
    ".dSidebarFolder div[name]": `flex: 1; margin: 0 8px 0 4px; color: var(--textColor); font-size: 16px; font-weight: 600; z-index: 1; text-align: left`,
    ".dSidebarFolder div[name][contenteditable]": `padding: 2px 4px; outline: solid 3px var(--themeColor); border-radius: 4px; overflow: auto`,
    ".dSidebarFolder div[arrow]": `position: sticky; display: flex; width: 28px; height: 28px; right: 8px; margin-left: auto; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 14px; z-index: 1; transition: .1s`,
    ".dSidebarFolder div[arrow] svg": `width: 22px; height: 22px; margin-left: 2px`,
    ".dSidebarFolder[opened] div[arrow]": `transform: rotate(90deg)`,
    ".dTileDropFolderLoadMore": `display: flex; width: 100%; justify-content: center; margin-bottom: 8px`,
    ".dTileDropFolderLoadMore button": `display: flex; padding: 6px 8px; align-items: center; --borderRadius: 16px; font-size: 16px; color: var(--theme); font-weight: 700`,

    ".dSidebarAccountHolder": `--percent: 0; display: flex; flex-direction: column; padding: 8px; bottom: 0px; margin-top: auto; align-items: center; background: rgba(var(--background), calc(.7 * var(--percent))); backdrop-filter: blur(calc(4px * var(--percent))); transition: .2s`,
    ".dSidebarUpdateAlert": `display: none; flex-direction: column; width: calc(100% - 16px); margin: 8px; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 18px; transition: .2s`,
    ".dSidebarUpdateAlert[closed]": `pointer-events: none; opacity: 0; transform: scale(.8)`,
    ".dSidebarUpdateAlertTitle": `box-sizing: border-box; display: flex; width: 100%; padding: 6px; gap: 8px; justify-content: space-between; align-items: center`,
    ".dSidebarUpdateAlertTitle > div": `margin-left: 6px; font-size: 16px; font-weight: 600`,
    ".dSidebarUpdateAlertTitle > button": `position: relative; flex-shrink: 0; width: 24px; height: 24px; margin-bottom: auto; --borderWidth: 3px; --borderRadius: 14px`,
    ".dSidebarUpdateAlertTitle > button svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dSidebarUpdateAlertTitle > button:focus-visible": `--borderWidth: 4px`,
    ".dSidebarUpdateAlert div[divider]": `width: calc(100% - 12px); height: 2px; margin-bottom: 6px; background: var(--hover); border-radius: 1px`,
    ".dSidebarUpdateAlert > a, .dSidebarUpdateAlert > button": `box-sizing: border-box; display: flex; width: calc(100% - 12px); padding: 6px; margin-bottom: 6px; border-radius: 6px; font-size: 16px; font-weight: 600; align-items: center; text-align: left; text-decoration: none`,
    ".dSidebarUpdateAlert > a div[image], .dSidebarUpdateAlert > button div[image]": `width: 24px; height: 24px; margin-right: 4px; transition: .1s`,
    ".dSidebarUpdateAlert > a div[image] svg, .dSidebarUpdateAlert > button div[image] svg": `width: 100%; height: 100%`,
    ".dSidebarUpdateAlert > a:last-child, .dSidebarUpdateAlert > button:last-child": `border-bottom-left-radius: 12px; border-bottom-right-radius: 12px`,
    ".dSidebarUpdateAlert > a:hover, .dSidebarUpdateAlert > button:hover": `background: var(--themeColor); color: #fff`,
    ".dSidebarUpdateAlert > a:hover div[image], .dSidebarUpdateAlert > button:hover div[image]": `filter: brightness(0) invert(1)`,
    ".dAccount": `display: flex; max-width: calc(100% - 16px); width: fit-content; min-width: 100px; padding: 6px 12px 6px 6px; --borderRadius: 18px`,
    ".dAccount img[accountimage]": `width: 32px; min-width: 32px; height: 32px; margin-right: 6px; object-fit: cover; border-radius: 16px`,
    ".dAccount div[accountuser]": `max-width: calc(100% - 38px); height: 100%; flex: 1; line-height: 32px; font-size: 18px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dropdownTitle div[accountuser]": `flex: unset`,

    ".dLessonsHolder": `position: relative; display: flex; flex-direction: column; width: 100%; min-height: 100%; background: var(--pageColor); overflow-x: hidden; overflow-y: auto; z-index: 1`,
    ".dSelectedTitleHolder": `--percent: 0; position: sticky; display: flex; box-sizing: border-box; width: 100%; padding: 20px; top: 0px; background: rgba(var(--background), calc(.7 * var(--percent))); backdrop-filter: blur(calc(4px * var(--percent))); z-index: 2; transition: background .2s, backdrop-filter .2s, box-shadow .2s`,
    ".dSelectedTitle": `font-size: 28px; font-weight: 600; text-align: left`,
    ".dBannerHolder": `display: none; box-sizing: border-box; width: 100%; height: fit-content; transition: .4s`,
    ".dBanner": `display: flex; gap: 8px; width: 100%; height: fit-content; padding: 6px; margin: 8px; box-shadow: var(--darkShadow); border-radius: 4px 4px 12px 12px; transition: .4s`,
    ".dBannerIcon": `width: 50px; height: 50px`,
    ".dBannerContent": `display: flex; flex-direction: column; flex: 1; text-align: left`,
    ".dBannerTitle": `margin-top: 4px; font-size: 18px; font-weight: 700; color: var(--theme)`,
    ".dBannerText": `margin-top: 4px; font-size: 14px`,
    ".dBannerButtons": `display: flex; gap: 8px; height: fit-content; min-height: 50px; padding: 0 8px 0 0; align-items: center`,
    ".dBannerButtons button": `position: relative; --borderWidth: 3px; --borderRadius: 14px`,
    ".dBannerButtons button svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dBannerButtons button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dBannerClose": `width: 22px; height: 22px; margin: 3px`,
    ".dBannerFeedback": `--themeColor: var(--theme); padding: 0 8px; font-size: 16px; font-weight: 600; color: var(--theme); height: 28px; margin: 3px`,

    ".dTilesHolder": `position: relative; width: calc(100% - 40px); min-height: fit-content; height: 100%; margin: 0px 20px 20px 20px; z-index: 1`,

    ".dFolderInfo": `display: flex; width: 100%; justify-content: center; align-items: center`,
    ".dFolderColorButton": `position: relative; width: 40px; height: 40px; flex-shrink: 0`,
    ".dFolderColorsHolder": `position: absolute; width: 48px; left: -6px; top: -4px; background: rgba(var(--background), 0); overflow: hidden; border-radius: 16px 26px 26px 16px; transition: width .4s, box-shadow .4s; z-index: 2`,
    ".dFolderColors": `display: flex; gap: 4px; width: fit-content; height: 100%; padding: 4px 8px 4px 6px; align-items: center`,
    ".dFolderColors button[icon]": `width: 40px; height: 40px; padding: 0; flex-shrink: 0`,
    ".dFolderColors button[icon] svg": `width: 100%; height: 100%`,
    ".dFolderColors button[hex]": `width: 32px; height: 32px; border: solid 2px var(--pageColor); border-radius: 16px; flex-shrink: 0`,
    ".dFolderInfo div[title]": `padding: 4px 0; margin: 0 auto 0 4px; font-size: 26px; font-weight: 600; color: var(--themeColor); border: solid 3px rgba(var(--background), 0); border-radius: 12px; outline: none; transition: .2s; cursor: pointer; text-align: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; scrollbar-width: none`,
    ".dFolderInfo div[title]::-webkit-scrollbar": `display: none`,
    ".dFolderInfo div[contenteditable]": `padding: 4px 6px; border: solid 3px var(--themeColor); cursor: unset; text-overflow: unset !important; overflow: auto !important`,
    ".dFolderInfoActions": `display: flex; margin-left: 8px`,
    ".dFolderRemove": `display: flex; padding: 6px; --themeColor: var(--error); --themeColor2: var(--error); --borderWidth: 3px; --borderRadius: 20px; color: #fff; justify-content: center; align-items: center`,
    ".dFolderRemove svg": `width: 22px; height: 22px`
  };
  loadAmount = 25;
  checkTime = (sort, record) => {
    let time = record.opened ?? record.added;
    switch (sort) {
      case "shared":
        time = record.added;
        break;
      case "owned":
        time = record.added;
        break;
      case "newest":
        time = record.added;
    }
    return time;
  }
  js = async (page) => {
    let dashboardHolder = page.querySelector(".dPageHolder")
    let dashboard = dashboardHolder.querySelector(".dPage")
    let sidebarHolder = dashboard.querySelector(".dSidebarHolder");
    let sidebar = sidebarHolder.querySelector(".dSidebar");
    let logoButton = sidebar.querySelector(".dSidebarLogo");
    let joinLessonButton = sidebar.querySelector(".dJoinButton");
    let actionHolder = sidebar.querySelector(".dSidebarActions");
    let searchInput = sidebar.querySelector(".dSidebarSearch input");
    let folderHolder = sidebar.querySelector(".dSidebarFolderHolder");
    let lessonsHolder = dashboard.querySelector(".dLessonsHolder");
    let titleHolder = lessonsHolder.querySelector(".dSelectedTitleHolder");
    let tileHolder = dashboard.querySelector(".dTilesHolder");
    let accountHolder = sidebar.querySelector(".dSidebarAccountHolder");
    let updateAlert = accountHolder.querySelector(".dSidebarUpdateAlert");
    let accountButton = accountHolder.querySelector(".dAccount");

    if (hasFeatureEnabled("breakout") == true) {
      actionHolder.innerHTML = `
      <div class="dSidebarTitle"><div title>New Lesson</div><div divider></div></div>
      <div class="dCreateLessonButtonHolder">
        <a class="dCreateBoardLessonButton largeButton"><div image></div>Board<div backdrop></div></a>
        <a class="dCreateBreakoutLessonButton largeButton"><div image></div>Breakout<div backdrop></div></a>
      </div>
      `;
      setSVG(actionHolder.querySelector(".dCreateBoardLessonButton div[image]"), "../images/icon.svg");
      setSVG(actionHolder.querySelector(".dCreateBreakoutLessonButton div[image]"), "../images/breakout.svg");
    } else {
      actionHolder.innerHTML = `
      <a class="dCreateBoardLessonButton largeButton">New Lesson<div backdrop></div></a>
      `;
    }
    let newBoardLessonButton = actionHolder.querySelector(".dCreateBoardLessonButton");
    let newBreakoutLessonButton = actionHolder.querySelector(".dCreateBreakoutLessonButton");

    let scrollEventPass;

    // Handle Onboard:
    if (account.onboard == null) {
      modalModule.open("modals/resources", null, null, null, false);
    } else if (account.lastWhatsNew != null && account.currentWhatsNew != null && account.lastWhatsNew != account.currentWhatsNew) {
      let closeButton = updateAlert.querySelector(".dSidebarUpdateAlertTitle > button");
      setSVG(closeButton, "../images/tooltips/close.svg");
      closeButton.addEventListener("click", async () => {
        sendRequest("POST", "me/read?seen=whatsnew");
        updateAlert.setAttribute("closed", "");
        await sleep(200);
        updateAlert.style.display = "none";
        this.updateScrollShadows();
      });
      let openButton = updateAlert.querySelector("a[opennew]");
      setSVG(openButton.querySelector("div[image]"), "../images/tooltips/account/exclamation.svg");
      openButton.href = "/app/lesson?lesson=" + account.currentWhatsNew;
      openButton.addEventListener("click", (event) => {
        event.preventDefault();
        setFrame("pages/app/lesson", null, { params: { lesson: account.currentWhatsNew } });
      });
      let shareButton = updateAlert.querySelector("button[share]");
      setSVG(shareButton.querySelector("div[image]"), "../images/editor/actions/send.svg");
      shareButton.addEventListener("click", () => {
        dropdownModule.open(shareButton, "dropdowns/gift");
      });

      updateAlert.style.display = "flex";
    }

    // Handle Banner:
    const CURRENT_BANNER = null; // "1.0-release";
    if (CURRENT_BANNER != null) {
      let bannerHolder = lessonsHolder.querySelector(".dBannerHolder");
      let banner = bannerHolder.querySelector(".dBanner");
      let bannerCloseButton = banner.querySelector(".dBannerClose");
      let seenBanners = JSON.parse(getLocalStore("seenDashboardBanners") ?? "[]");
      if (seenBanners.includes(CURRENT_BANNER) == false) {
        bannerHolder.style.display = "flex";
      }
      bannerCloseButton.addEventListener("click", async () => {
        seenBanners.push(CURRENT_BANNER);
        setLocalStore("seenDashboardBanners", JSON.stringify(seenBanners));
        lessonsHolder.scrollTo({ top: 0, behavior: "smooth" });
        bannerHolder.style.height = bannerHolder.offsetHeight + "px";
        bannerHolder.offsetHeight;
        banner.style.opacity = 0;
        banner.style.transform = "translateY(calc(-100% - 16px)";
        bannerHolder.style.height = "0px";
      });
      setSVG(bannerCloseButton, "../images/tooltips/close.svg");
      let bannerFeedbackButton = banner.querySelector(".dBannerFeedback");
      bannerFeedbackButton.addEventListener("click", async () => {
        bannerFeedbackButton.setAttribute("disabled", "");
        await loadScript("./modules/dropdowns/account.js");
        await dropdownModule.open(bannerFeedbackButton, "dropdowns/account/report");
        bannerFeedbackButton.removeAttribute("disabled");
      });
    }
    
    logoButton.addEventListener("click", (event) => {
      event.preventDefault();
      setFrame("pages/launch");
    });
    joinLessonButton.addEventListener("click", (event) => {
      event.preventDefault();
      setFrame("pages/app/join");
    });
    if (newBoardLessonButton != null) {
      newBoardLessonButton.addEventListener("click", (event) => {
        event.preventDefault();
        let params = { type: "board" };
        if (this.sort != null && this.sort.length > 20) {
          params["folder"] = this.sort;
        }
        setFrame("pages/app/lesson", null, { params: params });
      });
    }
    if (newBreakoutLessonButton != null) {
      newBreakoutLessonButton.addEventListener("click", (event) => {
        event.preventDefault();
        let params = { type: "breakout" };
        if (this.sort != null && this.sort.length > 20) {
          params["folder"] = this.sort;
        }
        setFrame("pages/app/lesson", null, { params: params });
      });
    }

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
      if (lessonsHolder.scrollTop > 0 && titleHolder.offsetTop - lessonsHolder.scrollTop <= 1) { // Lesson Topbar Shadow:
        titleHolder.style.setProperty("--percent", "1");
        titleHolder.style.boxShadow = "var(--lightShadow)";
      } else {
        titleHolder.style.removeProperty("--percent");
        titleHolder.style.removeProperty("box-shadow");
      }

      if (Math.floor(sidebar.scrollTop) < Math.floor(sidebar.scrollHeight - sidebar.clientHeight)) { // Account Holder Shadow:
        accountHolder.style.setProperty("--percent", "1");
        accountHolder.style.boxShadow = "var(--lightShadow)";
      } else {
        accountHolder.style.removeProperty("--percent");
        accountHolder.style.removeProperty("box-shadow");
      }
    }
    sidebar.addEventListener("scroll", this.updateScrollShadows);

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
      sidebarHolder.style.left = -sidebar.offsetWidth + "px";
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
    let sizeUpdate = (event) => {
      if (scrollEventPass != null) {
        scrollEventPass(event);
      }
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
    this.addEventListener(window, "resize", sizeUpdate);

    let unselectSidebarButton = () => {
      let currentSelected = sidebar.querySelector("button[selected], a[selected]");
      if (currentSelected != null) {
        currentSelected.removeAttribute("selected");
      }
    }

    // Handle Folders
    let folders = {};
    this.addFolderTile = async (folder, parent, insertFirst) => {
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
      let folderButton = newFolder.querySelector(".dSidebarFolder");
      let folderName = folderButton.querySelector("div[name]");
      if (folder != null) {
        folderButton.setAttribute("folderid", folder._id);
        folderName.textContent = folder.name;
        folderName.title = folder.name;
        if (folder.color != null) {
          folderButton.style.setProperty("--fillColor", "#" + folder.color);
        }
        parent.setAttribute("lastopened", folder.opened);
        if (insertFirst == true) {
          if (parent.className != "dSidebarFolderParent") {
            if (parent.firstElementChild != null) {
              parent.insertBefore(newFolder, parent.firstElementChild);
            }
          } else {
            if (parent.children[1] != null) {
              parent.insertBefore(newFolder, parent.children[1]);
            }
          }
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
            this.updateScrollShadows();
            return;
          }
          /*if (folderName.textContent == folderName.getAttribute("prevtitle")) {
            return;
          }*/
          newFolder.setAttribute("disabled", "");
          folderName.textContent = name;
          folderName.title = name;
          let folderBody = { name: name };
          if (parent != folderHolder) {
            folderBody.parent = parent.firstElementChild.getAttribute("folderid");
          }
          let [code, body] = await sendRequest("POST", "lessons/folders/new", folderBody);
          if (code != 200) {
            newFolder.remove();
            return this.updateScrollShadows();
          }
          let existingFolder = folderHolder.querySelector('.dSidebarFolder[folderid="' + body.folder + '"]');
          if (existingFolder != null) {
            unselectSidebarButton();
            this.sort = body.folder;
            existingFolder.setAttribute("selected", "");
            this.updateTiles(existingFolder);
            return newFolder.remove();
          }

          let timestamp = getEpoch(); // Just temporary, gets updated by socket
          folders[body.folder] = { ...folderBody, _id: body.folder, created: timestamp, opened: timestamp };
          if (folderBody.parent != null) {
            folders[folderBody.parent].folders = folders[folderBody.parent].folders ?? [];
            folders[folderBody.parent].folders.unshift(body.folder);
          }
          parent.setAttribute("lastopened", timestamp);
          newFolder.removeAttribute("disabled");
          let folderChild = newFolder.querySelector(".dSidebarFolder");
          folderChild.setAttribute("folderid", body.folder);
          folderChild.setAttribute("opened", "");
          unselectSidebarButton();
          this.sort = body.folder;
          folderChild.setAttribute("selected", "");
          this.updateTiles(folderChild);
        };
        folderName.addEventListener("focusout", focusListener);

        await sleep(1);
        folderName.focus();
      }
      return folderButton;
    }
    sidebar.querySelector(".dSidebarNewFolderButton").addEventListener("click", () => {
      let setParent = folderHolder;
      let currentSelected = sidebar.querySelector("a[selected][opened]");
      if (currentSelected != null && currentSelected.hasAttribute("folderid") == true) {
        setParent = currentSelected.parentElement;
      }
      this.addFolderTile(null, setParent);
      this.updateScrollShadows();
    });
    
    // Handle All Loading/Unloading of Lessons
    this.sort = "recent";
    let records = { recent: [], shared: [], owned: [], newest: [] };
    let lessons = {};

    let path = "lessons";
    if (window.previousLessonSession != null) {
      path += "?leave=" + window.previousLessonSession;
      delete window.previousLessonSession;
    }
    let [code, body] = await sendRequest("GET", path);
    if (code != 200) {
      return;
    }
    this.addRecords = (recordArr, newRecords) => {
      for (let i = 0; i < newRecords.length; i++) {
        let newRecord = newRecords[i];
        let lesson = lessons[newRecord.lesson];
        if (lesson == null) {
          continue;
        }
        lesson.record = { ...(lesson.record ?? {}), ...newRecord };
        /*if (lesson.records == null) {
          lesson.records = [];
        }
        lesson.records.push(newRecord);*/
        recordArr.push(newRecord._id);
      }
    }

    lessons = { ...lessons, ...getObject(body.lessons, "_id") };
    folders = { ...folders, ...getObject(body.folders, "_id") };

    this.addRecords(records.recent, body.recent);
    this.addRecords(records.shared, body.shared);
    this.addRecords(records.owned, body.owned);
    this.addRecords(records.newest, body.newest);
    //records.recent = body.recent;
    //records.shared = body.shared;
    //records.owned = body.owned;
    //records.newest = body.newest;

    updateAlert.removeAttribute("closed");

    this.dashSubscribe = null;
    this.updateDashSub = () => {
      let filter = { type: ["dash", "lesson"], id: Object.keys(lessons), _id: userID };
      if (this.dashSubscribe) {
        this.dashSubscribe.edit(filter);
      } else {
        this.dashSubscribe = subscribe(filter, async (data) => {
          let body = data.data ?? data.body ?? data;
          let lessonID;
          let lesson;
          let folder;
          let tile;
          let noLessons;
          let existingFolder;
          switch (data.task) {
            case "join":
              lesson = lessons[body.lesson];
              if (lesson != null) {
                let memberCount = (lesson.members ?? 0) + 1;
                lesson.members = memberCount;
                lesson.membersUpdate = getEpoch();
                tile = tileHolder.querySelector('.dTile[lesson="' + body.lesson + '"]');
                if (tile != null) {
                  let memberTx = tile.querySelector(".dTileMemberCount");
                  memberTx.querySelector("div").textContent = memberCount;
                  memberTx.style.opacity = 1;
                }
              }
              break;
            case "leave":
              lesson = lessons[body.lesson];
              if (lesson != null) {
                let memberCount = Math.max((lesson.members ?? 0) - 1, 0);
                lesson.members = memberCount;
                lesson.membersUpdate = getEpoch();
                tile = tileHolder.querySelector('.dTile[lesson="' + body.lesson + '"]');
                if (tile != null) {
                  let memberTx = tile.querySelector(".dTileMemberCount");
                  if (memberCount > 0) {
                    memberTx.querySelector("div").textContent = memberCount;
                  } else {
                    memberTx.style.removeProperty("opacity");
                  }
                }
              }
              break;
            case "set":
              if (data.tool != null) {
                return;
              }
              body.record = body.record ?? {};
              lessonID = body.record.lesson ?? body._id;
              if (lessons[lessonID] == null) {
                lessons[lessonID] = body.lesson;
              }
              lesson = lessons[lessonID];
              tile = tileHolder.querySelector('.dTile[lesson="' + lessonID + '"]');
              if (body.hasOwnProperty("folder") == true) {
                //if (lesson.record != null) {
                //  lesson.record.folder = body.record.folder;
                //}
                if (this.sort.length > 20 && this.sort != body.folder) {
                  if (tile != null) {
                    tile.remove();
                  }
                }
                let existingSectionRecord = records[(lesson.record ?? {}).folder];
                if (existingSectionRecord != null) {
                  existingSectionRecord.splice(existingSectionRecord.indexOf(lesson.record._id), 1);
                }
                if (body.record.folder != null) {
                  let foundFolder = folders[body.record.folder];
                  if (foundFolder != null && foundFolder.parent != null) {
                    let foundParentFolder = folders[foundFolder.parent];
                    if (foundParentFolder != null && foundParentFolder.folders != null) {
                      foundParentFolder.folders.splice(foundParentFolder.folders.indexOf(body.record.folder), 1);
                      foundParentFolder.folders.unshift(body.record.folder);
                    }
                  }
                  let folderSort = folderHolder.querySelector('.dSidebarFolder[folderid="' + body.record.folder + '"]');
                  if (folderSort != null) {
                    let folder = folderSort.closest(".dSidebarFolderParent");
                    if (folder.hasAttribute("child") == false) {
                      if (folder.parentElement.firstElementChild != null) {
                        folder.parentElement.insertBefore(folder, folder.parentElement.firstElementChild);
                      }
                    } else {
                      if (folder.parentElement.children[1] != null) {
                        folder.parentElement.insertBefore(folder, folder.parentElement.children[1]);
                      }
                    }
                  }
                }
              }
              if (body.record != null && body.record._id != null) {
                lesson.record = body.record;
              }
              if (body.hasOwnProperty("name") == true) {
                lesson.name = body.name;
                if (tile != null) {
                  tile.querySelector(".dTileTitle").textContent = body.name ?? "Untitled Lesson";
                }
              }
              if (body.members != null) {
                lesson.members = body.members;
                lesson.membersUpdate = getEpoch();
              }
              if (body.thumbnail != null) {
                lesson.thumbnail = body.thumbnail;
                if (tile != null) {
                  (tile.querySelector(".dTileThumbnail[main]") ?? tile.querySelector(".dTileThumbnail")).src = assetURL + body.thumbnail;
                }
              }
              if (body.folder != null) {
                body.sections = body.sections ?? [];
                body.sections.push("folder");
              }
              if (body.sections != null) {
                for (let i = 0; i < body.sections.length; i++) {
                  let section = body.sections[i];
                  if (section == "folder") {
                    section = body.record.folder;
                  }
                  if (records[section] == null) {
                    if (section == "folder") {
                      folders[section] = body.folder;
                    }
                    records[section] = [];
                  }
                  let time = this.checkTime(this.sort, { ...lesson, ...body.record });
                  let sectionRecord = records[section];
                  let insertAt = 0;
                  for (let r = 0; r < sectionRecord.length; r++) {
                    //let record = recordDocs[sectionRecord[r]];
                    let checkTime = this.checkTime(this.sort, { ...lesson, ...body.record });
                    if (checkTime > time) {
                      insertAt = r + 1;
                    }
                    if (sectionRecord[r] == body.record._id) {
                      sectionRecord.splice(r, 1);
                      r--;
                    }
                  }
                  sectionRecord.splice(insertAt, 0, body.record._id);
                  if (this.sort == section) {
                    this.addLessonTile(body.record, body.lesson, time, true);
                  }
                }
                this.updateDashSub();
              }
              noLessons = tileHolder.querySelector(".dNoLessons");
              if (noLessons != null) {
                if (tileHolder.querySelector(".dTiles").childElementCount > 0) {
                  noLessons.style.display = "none";
                } else {
                  noLessons.style.removeProperty("display");
                }
              }
              break;
            case "remove":
              if (lessons[body.lesson] != null) {
                delete lessons[body.lesson];
                tile = tileHolder.querySelector('.dTile[lesson="' + body.lesson + '"]');
                if (tile != null) {
                  tile.remove();
                }
              }
              noLessons = tileHolder.querySelector(".dNoLessons");
              if (noLessons != null) {
                if (tileHolder.querySelector(".dTiles").childElementCount > 0) {
                  noLessons.style.display = "none";
                } else {
                  noLessons.style.removeProperty("display");
                }
              }
              break;
            case "newfolder":
              if (folders[body._id] == null) {
                folders[body._id] = body;
                if (body.parent != null) {
                  folders[body.parent].folders = folders[body.parent].folders ?? [];
                  folders[body.parent].folders.unshift(body.folder);
                }
                existingFolder = folderHolder.querySelector('.dSidebarFolder[folderid="' + body._id + '"]');
                if (existingFolder == null) {
                  let parent = folderHolder;
                  if (body.parent != null) {
                    parent = null;
                    let setParent = folderHolder.querySelector('.dSidebarFolder[folderid="' + body.parent + '"]');
                    if (setParent != null && setParent.hasAttribute("opened") == true) {
                      parent = setParent.parentElement;
                    }
                  }
                  if (parent != null) {
                    this.addFolderTile(body, parent, true);
                  }
                }
              }
              break;
            case "folderupdate":
              if (folders[body._id] == null) {
                folders[body._id] = body;
              }
              folder = folders[body._id];
              existingFolder = folderHolder.querySelector('.dSidebarFolder[folderid="' + body._id + '"]');
              if (body.hasOwnProperty("name") == true) {
                folder.name = body.name;
                let newFolderName = cleanString(body.name ?? "Untitled Folder");
                if (existingFolder != null) {
                  existingFolder.querySelector("div[name]").textContent = newFolderName;
                }
                if (this.sort == body._id) {
                  let titleTx = titleHolder.querySelector(".dFolderInfo div[title]");
                  titleTx.textContent = newFolderName;
                  titleTx.title = newFolderName;
                }
              }
              if (body.hasOwnProperty("color") == true) {
                folder.color = body.color;
                let setColor = "var(--theme)";
                if (body.color != null) {
                  setColor = "#" + body.color;
                }
                if (existingFolder != null) {
                  existingFolder.style.setProperty("--fillColor", setColor);
                }
                if (this.sort == body._id) {
                  titleHolder.querySelector(".dFolderInfo").style.setProperty("--themeColor", setColor);
                }
              }
              if (body.hasOwnProperty("parent") == true) {
                let oldParentFolder = folders[folder.parent];
                if (oldParentFolder != null) {
                  oldParentFolder.folders.splice(oldParentFolder.folders.indexOf(body._id), 1);
                }
                folder.parent = body.parent;
                let newParentFolder = folders[body.parent];
                let newFolder;
                let parentSort;
                if (newParentFolder != null) {
                  newParentFolder.folders = newParentFolder.folders ?? [];
                  newParentFolder.folders.unshift(body._id);
                  parentSort = folderHolder.querySelector('.dSidebarFolder[folderid="' + body.parent + '"]');
                  if (parentSort != null && parentSort.hasAttribute("opened") == true) {
                    newFolder = await this.addFolderTile(folder, parentSort.parentElement, true);
                  }
                } else if (body.parent == null) {
                  newFolder = await this.addFolderTile(folder, folderHolder, true);
                }
                if (existingFolder != null) {
                  existingFolder.parentElement.remove();
                }
                if (this.sort == body._id) {
                  if (newFolder != null) {
                    newFolder.setAttribute("selected", "");
                  } else if (parentSort != null) {
                    this.sort = body.parent;
                    parentSort.setAttribute("selected", "");
                    this.updateTiles(parentSort);
                  } else {
                    this.sort = "recent";
                    let button = sidebar.querySelector('.dSidebarSort[sort="recent"]');
                    button.setAttribute("selected", "");
                    this.updateTiles(button);
                  }
                }
              }
              break;
            case "folderremove":
              folder = folders[body._id];
              if (folder != null) {
                let parentFolder = folders[folder.parent];
                if (folder.folders != null) {
                  for (let i = 0; i < folder.folders.length; i++) {
                    let folderid = folder.folders[i];
                    delete folders[folderid];
                    let changeLessons = records[folderid];
                    for (let c = 0; c < changeLessons.length; c++) {
                      delete lessons[changeLessons[c].split("_")[0]].record.folder;
                    }
                    delete records[folderid];
                  }
                }
                delete folders[body._id];
                let changeLessons = records[body._id] ?? [];
                for (let c = 0; c < changeLessons.length; c++) {
                  delete lessons[changeLessons[c].split("_")[0]].record.folder;
                }
                delete records[body._id];
                existingFolder = folderHolder.querySelector('.dSidebarFolder[folderid="' + body._id + '"]');
                if (existingFolder != null) {
                  existingFolder.parentElement.remove();
                }
                if (parentFolder != null) {
                  parentFolder.folders.splice(parentFolder.folders.indexOf(body._id), 1);
                }
                if (this.sort == body._id) {
                  if (parentFolder != null) {
                    let parentSort = folderHolder.querySelector('.dSidebarFolder[folderid="' + parentFolder._id + '"]');
                    if (parentSort != null) {
                      this.sort = parentFolder._id;
                      parentSort.setAttribute("selected", "");
                      return this.updateTiles(parentSort);
                    }
                  } else {
                    this.sort = "recent";
                    let recentSort = sidebar.querySelector('.dSidebarSort[sort="recent"]');
                    recentSort.setAttribute("selected", "");
                    this.updateTiles(recentSort);
                  }
                }
              }
          }
        });
      }
    }

    this.updateTiles = async (button, firstLoad, prevSort) => {
      if (this.sort.length > 20) { // Folder
        titleHolder.innerHTML = `<div class="dFolderInfo">
          <div class="dFolderColorButton">
            <div class="dFolderColorsHolder">
              <div class="dFolderColors">
                <button icon><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--themeColor)" stroke-width="30"/> </g> </svg></button>
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
          </div>
          <div title></div>
          <div class="dFolderInfoActions">
            <button class="dFolderRemove largeButton" option="deletefolder" dashboard title="Delete this folder." dropdowntitle="Delete Folder"></button>
          </div>
        </div>`;
        let folderID = this.sort;
        let folder = folders[folderID];
        let setColor = "var(--theme)";
        if (folder.color != null) {
          setColor = "#" + folder.color;
        }
        let folderInfo = titleHolder.querySelector(".dFolderInfo");
        folderInfo.style.setProperty("--themeColor", setColor);
        let colorHolderFrame = titleHolder.querySelector(".dFolderColorsHolder");
        let colorHolder = colorHolderFrame.querySelector(".dFolderColors");
        let colors = colorHolder.querySelectorAll("button[hex]");
        for (let i = 0; i < colors.length; i++) {
          colors[i].style.background = "#" + colors[i].getAttribute("hex");
        }
        colorHolderFrame.addEventListener("click", async (event) => {
          if (colorHolderFrame.hasAttribute("open") == false) {
            colorHolderFrame.setAttribute("open", "");
            colorHolderFrame.style.width = colorHolder.offsetWidth + "px";
            colorHolderFrame.style.boxShadow = "var(--darkShadow)";
            colorHolderFrame.style.background = "rgba(var(--background), 1)";
          } else {
            let button = event.target.closest("button");
            if (button == null) {
              return;
            }
            let newColor = button.getAttribute("hex");
            if (newColor != null) {
              folderInfo.style.setProperty("--themeColor", "#" + newColor);
              colorHolder.setAttribute("disabled", "");
              let [code] = await sendRequest("PUT", "lessons/folders/color?folder=" + folderID, { color: newColor });
              if (code == 200) {
                folder.color = newColor;
                let folderSort = folderHolder.querySelector('.dSidebarFolder[folderid="' + folderID + '"]');
                if (folderSort != null) {
                  folderSort.style.setProperty("--fillColor", "#" + newColor);
                }
              } else {
                folderInfo.style.setProperty("--themeColor", setColor);
              }
              colorHolder.removeAttribute("disabled");
            }
            
            colorHolderFrame.removeAttribute("open");
            colorHolderFrame.style.removeProperty("width");
            colorHolderFrame.style.removeProperty("box-shadow");
            await sleep(400);
            if (colorHolderFrame != null && colorHolderFrame.hasAttribute("open") == false) {
              colorHolderFrame.style.removeProperty("background");
            }
          }
        });
        let folderName = titleHolder.querySelector("div[title]");
        folderName.textContent = cleanString(folder.name ?? "Untitled Folder");
        folderName.title = folderName.textContent;
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
            folderName.title = prevName;
            folderName.scrollTo(0, 0);
            return;
          }
          if (name == prevName) {
            folderName.textContent = prevName;
            folderName.title = prevName;
            folderName.scrollTo(0, 0);
            return;
          }

          folderName.setAttribute("disabled", "");
          let [code] = await sendRequest("PUT", "lessons/folders/name?folder=" + folderID, { name: name });
          if (code == 200) {
            folder.name = name;
            folderName.textContent = name;
            folderName.title = name;
            let folderSort = folderHolder.querySelector('.dSidebarFolder[folderid="' + folderID + '"]');
            if (folderSort != null) {
              let title = folderSort.querySelector("div[name]");
              title.textContent = name;
              title.title = name;
            }
          } else {
            folderName.textContent = prevName;
            folderName.title = prevName;
          }
          folderName.scrollTo(0, 0);
          folderName.removeAttribute("disabled");
        });
        folderName.addEventListener("keydown", (event) => {
          if (event.keyCode == 13) {
            event.preventDefault();
            folderName.blur();
            return;
          }
        });
        let removeButton = titleHolder.querySelector(".dFolderRemove");
        removeButton.addEventListener("click", () => {
          dropdownModule.open(removeButton, "dropdowns/remove", { parent: this, type: "deletefolder", folderID: folderID, folders: folders, records: records, lessons: lessons });
        });
        setSVG(removeButton, "../images/editor/file/delete.svg");
        titleHolder.style.padding = "14px 16px";
        if (newBoardLessonButton != null) {
          newBoardLessonButton.href = "/app/lesson?type=board&folder=" + this.sort;
        }
        if (newBreakoutLessonButton != null) {
          newBreakoutLessonButton.href = "/app/lesson?type=breakout&folder=" + this.sort;
        }
      } else { // Sort
        titleHolder.innerHTML = `<div class="dSelectedTitle">${this.sort[0].toUpperCase() + this.sort.substring(1) + " Lessons"}</div>`;
        titleHolder.style.removeProperty("padding");
        if (newBoardLessonButton != null) {
          newBoardLessonButton.href = "/app/lesson?type=board";
        }
        if (newBreakoutLessonButton != null) {
          newBreakoutLessonButton.href = "/app/lesson?type=breakout";
        }
      }
      lessonsHolder.scrollTo(0, 0);
      let extra = {
        button: button,
        sort: this.sort,
        records: records,
        lessons: lessons,
        folders: folders,
        firstLoad: firstLoad,
        prevSort: prevSort
      };
      await this.setFrame("pages/app/dashboard/lessons", tileHolder, extra);
      scrollEventPass = extra.scrollEventPass;
    }
    this.updateTiles(null, true);
    for (let i = 0; i < body.folders.length; i++) {
      this.addFolderTile(body.folders[i], folderHolder);
    }
    if (body.folders.length >= this.loadAmount) {
      folderHolder.insertAdjacentHTML("beforeend", `<div class="dTileDropFolderLoadMore"><button class="buttonAnim border">View More</button></div>`);
    }

    lessonsHolder.addEventListener("scroll", (event) => {
      if (scrollEventPass != null) {
        scrollEventPass(event);
      }
      this.updateScrollShadows(event);
    });

    // Click Listener
    page.addEventListener("click", async (event) => {
      let target = event.target;

      if (target.closest(".dLessonsHolder") != null) {
        closeSidebar();
      }

      let tile = target.closest(".dTile");
      if (tile != null) {
        event.preventDefault();
        let optionButton = target.closest(".dTileOptions");
        if (optionButton != null) {
          return dropdownModule.open(optionButton, "dropdowns/dashboard/options", { parent: this, tile: tile, lessonID: tile.getAttribute("lesson"), lessons: lessons });
        }
        let lessonTitle = target.closest(".dTileTitle[contenteditable]");
        if (lessonTitle != null) {
          return;
        }
        if (tile.hasAttribute("join")) {
          let method = tile.getAttribute("join");
          if (method.startsWith("pin_")) {
            return setFrame("pages/app/join", null, { params: { pin: method.substring(4) }});
          } else if (method == "link") {
            return setFrame("pages/app/join", null, { params: { lesson: tile.getAttribute("lesson") } });
          }
        }
        setFrame("pages/app/lesson", null, { params: { lesson: tile.getAttribute("lesson") } });
      }

      let button = target.closest("button, a");
      if (button == null) {
        return;
      }

      if (button.hasAttribute("sort") == true || button.hasAttribute("folderid") == true) {
        unselectSidebarButton();
        searchInput.value = "";
        let prevSort = this.sort;
        this.sort = button.getAttribute("sort") ?? button.getAttribute("folderid");
        button.setAttribute("selected", "");
        return this.updateTiles(button, null, prevSort);
      }

      let loadMore = target.closest(".dTileDropFolderLoadMore button");
      if (loadMore != null) {
        let folderParent = loadMore.parentElement.parentElement;
        let subFolder = folderParent.className == "dSidebarFolderParent";
        loadMore.setAttribute("disabled", "");
        let path = "lessons/folders";
        let before = folderParent.getAttribute("lastopened");
        if (subFolder == true) {
          path += "?parent=" + folderParent.firstElementChild.getAttribute("folderid");
          if (before != null) {
            path += "&before=" + before;
          }
        } else if (before != null) {
          path += "?before=" + before;
        }
        let [code, body] = await sendRequest("GET", path);
        loadMore.removeAttribute("disabled");
        if (code == 200 && folderParent != null) {
          let folderIDs = [];
          for (let i = 0; i < body.folders.length; i++) {
            let folder = body.folders[i];
            folderIDs.push(folder._id);
            folders[folder._id] = folder;
          }
          if (subFolder == true && folderParent.firstElementChild.hasAttribute("opened") == true) {
            let thisFolder = folders[folderParent.firstElementChild.getAttribute("folderid")];
            thisFolder.folders = [...thisFolder.folders, ...folderIDs];
            for (let i = 0; i < folderIDs.length; i++) {
              this.addFolderTile(folders[folderIDs[i]], folderParent);
            }
            if (body.folders.length >= this.loadAmount) {
              folderParent.appendChild(loadMore.parentElement);
            } else {
              thisFolder.doneLoading = true;
              loadMore.parentElement.remove();
            }
          } else {
            for (let i = 0; i < body.folders.length; i++) {
              this.addFolderTile(body.folders[i], folderParent);
            }
            if (body.folders.length >= this.loadAmount) {
              folderParent.appendChild(loadMore.parentElement);
            } else {
              loadMore.parentElement.remove();
            }
          }
          this.updateScrollShadows();
        }
        return;
      }
    });

    page.addEventListener("contextmenu", (event) => {
      let target = event.target;
      let tile = target.closest(".dTile");
      if (tile == null) {
        return;
      }
      event.preventDefault();
      dropdownModule.open(tile.querySelector(".dTileOptions"), "dropdowns/dashboard/options", { parent: this, tile: tile, lessonID: tile.getAttribute("lesson"), lessons: lessons });
    });

    let dragContext = {};
    
    let dragStart = (event) => {
      dragContext = {};
      let target = event.target;
      let pageRect = dashboard.getBoundingClientRect();
      let mouseX = (event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0) - pageRect.x;
      let mouseY = (event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0) - pageRect.y;
      let folder = target.closest(".dSidebarFolder");
      if (folder != null && folder.hasAttribute("folderid") == true) {
        dragContext = {
          originalElement: folder,
          width: folder.clientWidth, //sidebar.clientWidth - 16
          height: folder.clientHeight - 8,
          startX: mouseX,
          startY: mouseY
        };
      }
      let tile = target.closest(".dTile");
      if (tile == null) {
        return;
      }
      if (target.closest(".dTileOptions") == null && target.closest(".dTileTitle[contenteditable]") == null) {
        tile.style.removeProperty("transform");
      } else {
        tile.style.transform = "scale(1)";
        return;
      }
      let holder = tile.querySelector(".dTileInfoHolder");
      if (holder != null) {
        dragContext = {
          originalElement: holder,
          width: holder.clientWidth,
          height: holder.clientHeight,
          startX: mouseX,
          startY: mouseY
        };
      }
    }
    page.addEventListener("mousedown", dragStart);
    /*page.addEventListener("pointerdown", (event) => {
      if (event.pointerType == "mouse") {
        dragStart(event);
      }
    });*/
    //page.addEventListener("touchstart", dragStart);

    let removeDrag = (moved) => {
      dashboard.style.removeProperty("user-select");
      dashboard.style.removeProperty("webkit-user-select");
      let removeElement = dragContext.element;
      if (removeElement == null) {
        return;
      }
      if (dragContext.originalElement != null) {
        let button = dragContext.originalElement.closest(".dTile, .dSidebarFolderParent");
        let pageRect = dashboard.getBoundingClientRect();
        let originalRect = dragContext.originalElement.getBoundingClientRect();
        if (moved != true) {
          removeElement.style.transform = "translate(" + (originalRect.x - pageRect.x - dragContext.lastX + 8) + "px, " + (originalRect.y - pageRect.y - dragContext.lastY + 8) + "px) scale(.975)";
        }
        (async () => {
          await sleep(100);
          if (button != null) {
            button.removeAttribute("disabled");
          }
        })();
      } else {
        removeElement.style.transform = "translate(0px, 0px) scale(0)";
      }
      removeElement.style.opacity = 0;
      (async () => {
        await sleep(200);
        if (removeElement != null) {
          removeElement.remove();
        }
      })();
      dragContext = {};
    }
    let dragMove = (event) => {
      if (dragContext.originalElement == null) {
        return removeDrag();
      }
      if (mouseDown() == false) {
        return removeDrag();
      }
      let pageRect = dashboard.getBoundingClientRect();
      let mouseX = (event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0) - pageRect.x;
      let mouseY = (event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0) - pageRect.y;
      dragContext.lastX = mouseX;
      dragContext.lastY = mouseY;
      if (dragContext.enabled != true) {
        if (Math.abs(mouseX - dragContext.startX) > 5 || Math.abs(mouseY - dragContext.startY) > 5) {
          dragContext.enabled = true;
          dragContext.element = dragContext.originalElement.cloneNode(true);
          dragContext.element.style.position = "absolute";
          dragContext.element.style.width = dragContext.width + "px";
          dragContext.element.style.height = dragContext.height + "px";
          dragContext.element.style.background = "var(--pageColor)";
          dragContext.element.style.boxShadow = "var(--shadow)";
          dragContext.element.style.borderRadius = 8 + "px";
          dragContext.element.style.zIndex = 10;
          dragContext.element.style.pointerEvents = "none";
          let originalRect = dragContext.originalElement.getBoundingClientRect();
          dragContext.element.style.transform = "translate(" + (originalRect.x - pageRect.x - mouseX) + "px, " + (originalRect.y - pageRect.y - mouseY) + "px) scale(.975)";
          dragContext.element.style.transformOrigin = "0 0";
          dragContext.element.style.opacity = 0;
          dragContext.element.style.transition = "transform .3s, opacity .2s";
          dashboard.appendChild(dragContext.element);
          dragContext.originalElement.closest(".dTile, .dSidebarFolderParent").setAttribute("disabled", "");
          dragContext.element.offsetHeight;
          dragContext.element.style.transform = "translate(0px, 0px) scale(.975)";
          dragContext.element.style.opacity = 1;
          openSidebar();
          dashboard.style.userSelect = "none";
          dashboard.style.webkitUserSelect = "none";
        } else {
          return;
        }
      }
      if (dragContext.element == null) {
        return;
      }
      dragContext.element.style.left = (mouseX - 8) + "px";
      dragContext.element.style.top = (mouseY - 8) + "px";
    }
    page.addEventListener("mousemove", dragMove);
    //page.addEventListener("touchmove", dragMove);

    let dragEnd = async (event) => {
      if (dragContext.enabled != true || dragContext.originalElement == null) {
        return removeDrag();
      }
      let target = document.elementFromPoint(
        event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0,
        event.y ?? event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0
      );
      let originalButton = dragContext.originalElement.closest("a");
      let originalButtonDisable = dragContext.originalElement.closest(".dTile, .dSidebarFolderParent");
      let parentFolder = target.closest(".dSidebarFolder[folderid]");
      if (parentFolder != null) {
        dragContext.originalElement = null;
        removeDrag();
        if (originalButton.hasAttribute("lesson") == true) {
          let parentID = parentFolder.getAttribute("folderid");
          let lessonID = originalButton.getAttribute("lesson");
          let lesson = lessons[lessonID];
          if (lesson.record == null || lesson.record.folder != parentID) { // MOVING LESSON INTO FOLDER:
            let [code] = await sendRequest("POST", "lessons/folders/move?parent=" + parentID + "&lesson=" + lessonID);
            if (code == 200) {
              lesson.record.parent = parentID;
              let lessonTile = tileHolder.querySelector('.dTile[lesson="' + lessonID + '"]');
              if (lessonTile != null) {
                if (this.sort.length > 20 && this.sort != parentID) {
                  let lessonContent = lessonTile.closest(".content");
                  let noLessons = lessonContent.querySelector(".dNoLessons");
                  lessonTile.remove();
                  if (noLessons != null && lessonContent.querySelector(".dTiles").childElementCount < 1) {
                    noLessons.style.removeProperty("display");
                  }
                }
              }
              alertModule.open("worked", "<b>Moved Lesson</b><div>The lesson has been moved into the folder.");
            }
          }
        } else if (originalButton.hasAttribute("folderid") == true) {
          let parentID = parentFolder.getAttribute("folderid");
          let folderID = originalButton.getAttribute("folderid");
          let folder = folders[folderID];
          if (folder.parent != parentID) { // MOVING FOLDER INTO FOLDER:
            let [code] = await sendRequest("POST", "lessons/folders/move?parent=" + parentID + "&folder=" + folderID);
            if (code == 200) {
              alertModule.open("worked", "<b>Moved Folder</b><div>The folder has been moved into another folder.");
            }
          }
        }
        if (originalButtonDisable != null) {
          originalButtonDisable.removeAttribute("disabled");
        }
        return;
      }
      if (originalButton.hasAttribute("lesson") == true && target.closest(".dSidebarSorts") != null) {
        dragContext.originalElement = null;
        removeDrag();
        if (originalButton.hasAttribute("lesson") == true) {
          let lessonID = originalButton.getAttribute("lesson");
          let lesson = lessons[lessonID];
          if (lesson.record != null && lesson.record.folder != null) { // MOVING LESSON FROM FOLDER:
            let [code] = await sendRequest("POST", "lessons/folders/movefrom?lesson=" + lessonID);
            if (code == 200) {
              alertModule.open("worked", "<b>Moved Lesson</b><div>The lesson has been removed from the folder.");
            }
          }
        }
        if (originalButtonDisable != null) {
          originalButtonDisable.removeAttribute("disabled");
        }
        return;
      }
      if (originalButton.hasAttribute("folderid") == true && target.closest(".dSidebar") != null && target.closest(".dSidebarFolderParent") == null) {
        dragContext.originalElement = null;
        removeDrag();
        if (originalButton.hasAttribute("folderid") == true) {
          let folderID = originalButton.getAttribute("folderid");
          let folder = folders[folderID];
          if (folder.parent != null) { // MOVING FOLDER FROM FOLDER:
            let [code] = await sendRequest("POST", "lessons/folders/movefrom?folder=" + folderID);
            if (code == 200) {
              alertModule.open("worked", "<b>Moved Folder</b><div>The folder has been removed from the parent folder.");
            }
          }
        }
        if (originalButtonDisable != null) {
          originalButtonDisable.removeAttribute("disabled");
        }
        return;
      }
      removeDrag();
    }
    page.addEventListener("pointerup", (event) => {
      if (event.pointerType == "mouse") {
        dragEnd(event);
      }
    });
    //page.addEventListener("touchend", dragEnd);

    // Search Bar
    searchInput.addEventListener("input", () => {
      if (searchInput.value == "") {
        unselectSidebarButton();
        let prevSort = this.sort;
        scrollEventPass = null;
        this.sort = "recent";
        let button = sidebar.querySelector('.dSidebarSort[sort="recent"]');
        button.setAttribute("selected", "");
        return this.updateTiles(button, null, prevSort);
      }
      unselectSidebarButton();
      let prevSort = this.sort;
      this.sort = "search";
      scrollEventPass = null;
      tileHolder.innerHTML = "";
      return this.updateTiles(searchInput, null, prevSort);
    });

    sizeUpdate();
  }
}

modules["pages/app/dashboard/lessons"] = class {
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
    ".dTile": `position: relative; background: var(--pageColor); --shadow: var(--lightShadow); box-shadow: var(--shadow); border-radius: 12px; overflow: hidden`,
    ".dTile:hover": `--shadow: var(--darkShadow)`,
    ".dTileThumbnailHolder": `position: relative; width: 100%; aspect-ratio: 4/3`,
    ".dTileThumbnail": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; border-radius: 12px; opacity: 0; pointer-events: none`,
    'html[theme="dark"] .dTileThumbnail': `filter: brightness(50%)`,
    ".dTile:hover .dTileThumbnail": `filter: brightness(100%)`,
    ".dTileInfoHolder": `position: absolute; display: flex; box-sizing: border-box; width: 100%; padding: 10px; left: 0px; bottom: 0px; align-items: flex-end; background: var(--pageColor); box-shadow: var(--shadow)`,
    ".dTileInfo": `width: 100%`,
    ".dTileTitle": `box-sizing: border-box; width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".dTileTitle[contenteditable]": `padding: 2px 4px; margin-bottom: 4px; max-height: 100px; outline: solid 2px var(--theme); border-radius: 4px; overflow: auto; cursor: text`,
    ".dTileLastOpened": `width: 100%; color: var(--theme); margin-top: 2px; font-size: 14px; font-weight: 600; text-align: left`,
    ".dTileOptions": `display: flex; width: 34px; height: 34px; margin: 4px; flex-shrink: 0; justify-content: center; align-items: center; border-radius: 18px`,
    ".dTileOptions img": `width: 32px; height: 32px`,
    ".dTileOptions:hover": `background: var(--hover)`,
    ".dTileMemberCount": `position: absolute; display: flex; box-sizing: border-box; padding: 6px; right: 0px; top: 0px; align-items: center; background: var(--pageColor); box-shadow: var(--shadow); border-radius: 0 0 0 12px; opacity: 0; transition: .4s`,
    ".dTileMemberCount img": `width: 22px; height: 22px`,
    ".dTileMemberCount div": `color: var(--theme); margin-left: 4px; font-size: 16px; font-weight: 600`,

    ".dNoLessons": `display: flex; flex-direction: column; width: 100%; height: fit-content; align-items: center`,
    ".dNoLessonsImage": `width: 100%; max-width: 500px; margin-top: 32px`,
    ".dNoLessonsTitle": `margin-top: 24px; font-size: 32px; font-weight: 700; color: var(--theme)`,
    ".dNoLessonsDesc": `max-width: 350px; margin-top: 8px; font-size: 18px; font-weight: 500`
  };
  js = async (frame, extra) => {
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
          <button class="dTileOptions" dropdowntitle="Options"><img src="../images/dashboard/more.svg" /></button>
        </div>
        <div class="dTileMemberCount" title="Active Members">
          <img src="../images/profiles/default.svg" />
          <div></div>
        </div>
      </a>`);
      let tile = tileHolder.querySelector(".dTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("lesson", record.lesson);
      tile.setAttribute("time", time);
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
        memberCount.querySelector("div").textContent = lesson.members;
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

modules["dropdowns/dashboard/options"] = class {
  html = `
  <button class="dTileDropAction" option="open" title="Open this lesson."><img src="../images/dashboard/open.svg">Open</button>
  <button class="dTileDropAction" option="opennewtab" title="Open this lesson in a new tab."><img src="../images/dashboard/open.svg">Open in New Tab</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="moveto" title="Move this lesson into a folder." dropdown="dropdowns/dashboard/moveto" dropdowntitle="<img class='dTileDropActionImage' src='../images/dashboard/moveto.svg'>Move To"><img class="dTileDropActionImage" src="../images/dashboard/moveto.svg">Move To Folder</button>
  <button class="dTileDropAction" option="movefrom" style="display: none" title="Remove this lesson from the folder."><img class="dTileDropActionImage" src="../images/dashboard/moveto.svg">Move From Folder</button>
  <div class="dTileDropLine"></div>
  <button class="dTileDropAction" option="rename" title="Rename this lesson."><img src="../images/dashboard/rename.svg">Rename</button>
  <button class="dTileDropAction" option="copy" title="Create a duplicate of this lesson."><img src="../images/dashboard/copy.svg">Duplicate</button>
  <button class="dTileDropAction" option="deletelesson" dashboard dropdown="dropdowns/editor/file/delete" style="--themeColor: var(--error)" title="Remove this lesson from your dashboard."><img class="dTileDropActionImage" src="/images/dashboard/delete.svg"><span>Delete</span></button>
  `;
  css = {
    ".dTileDropAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".dTileDropAction:not(:last-child)": `margin-bottom: 4px`,
    ".dTileDropAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px !important; background: var(--pageColor); border-radius: 4px`,
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
      dropdownModule.open(moveToButton, "dropdowns/moveto", { parent: extra.parent, lessons: lessons, lessonID: lessonID, lesson: lesson, record: record });
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
      dropdownModule.open(deleteButton, "dropdowns/remove", { parent: extra.parent, type: "deletelesson", lessons: lessons, lessonID: lessonID, lesson: lesson, record: record, isOwner: isOwner });
    });
    
    if (!isOwner) {
      renameButton.remove();
      copyButton.remove();
      deleteButton.querySelector("span").textContent = "Remove";
    }
  }
}