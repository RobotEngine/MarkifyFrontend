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
      <button class="ePageNav"><img src="./images/editor/bottom/downarrow.svg"></button>
      <div class="eCurrentPage"><b>1</b> / 3</div>
      <button class="ePageNav"><img src="./images/editor/bottom/uparrow.svg"></button>
    </div>
    <div class="eContent">
      <div class="ePageHolder">
        <div class="ePage">
          <div class="ePageContent" style="width: 816px; height: 1059px"></div>
        </div>
        <div class="ePage">
          <div class="ePageContent" style="width: 816px; height: 1059px"></div>
        </div>
        <div class="ePage">
          <div class="ePageContent" style="width: 816px; height: 1059px"></div>
        </div>
      </div>
    </div>
  </div>`,
  css: {
    ".eNav": `position: relative`,

    ".eTopHolder": `position: fixed; width: 100%; z-index: 500`,
    ".eTop": `display: flex; box-sizing: border-box; gap: 8px; width: 100%; padding: 8px; overflow-x: auto`,
    ".eTop::-webkit-scrollbar": `display: none`,
    ".eTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(180, 218, 253, .75); border-radius: 18px; justify-content: center; align-items: center`,
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

    ".eMembers": `display: flex; padding: 4px 8px 4px 4px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
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

    ".eContent": `display: flex; width: fit-content; min-width: 100%; justify-content: center; background-image: url(./images/editor/background.svg); background-position: center`,
    ".ePageHolder": `width: fit-content; height: fit-content; margin: 66px; border-radius: 16px; box-shadow: var(--lightShadow)`,
    ".ePage": `position: relative`,
    ".ePageContent": `background: var(--pageColor)`,
    ".ePage:first-child .ePageContent": `border-top-left-radius: 16px; border-top-right-radius: 16px`,
    ".ePage:not(:last-child) .ePageContent": `border-bottom: dashed var(--darkGray) 4px; border-image: url("./images/editor/border.svg") 10 / 1.5 / 0 space`,
    ".ePage:last-child .ePageContent": `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px`
  },
  js: async function (page) {
    page.style.removeProperty("display");

    setFrame("editor/toolbar", page.querySelector(".eToolbar"));

    let lessonID = getParam("lesson") || "";
    let [code, body] = await sendRequest("POST", "lessons/join?lesson=" + lessonID);
    if (code != 200) {
      return;
    }

    page.querySelector(".eLogo").addEventListener("click", function(event) {
      event.preventDefault();
      setFrame("pages/dashboard");
    });
    page.querySelector(".eFileName").textContent = body.name || "Untitled Lesson";

    let loginButton = page.querySelector(".eLogin");
    if (account.user) {
      page.querySelector(".eAccount div").textContent = account.user;
      if (account.image) {
        page.querySelector(".eAccount img").src = account.image;
      }
    } else {
      page.querySelector(".eAccount").remove();
      loginButton.style.display = "block";
    }
    loginButton.addEventListener("click", promptLogin);

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
      eTop.scrollTo({ left: eTop.scrollLeft - 300, behavior: "smooth" });
    });
    eTopScrollRight.addEventListener("click", function() {
      eTop.scrollTo({ left: eTop.scrollLeft + 300, behavior: "smooth" });
    });
    enableScrollTop();
    tempListen(window, "resize", enableScrollTop);
    eTop.addEventListener("scroll", enableScrollTop);
  }
}