modules["pages/dashboard"] = {
  title: "Dashboard",
  preJs: function() {
    if (userID == null) {
      promptLogin();
      return false;
    }
  },
  html: `
  <div class="dPage">
    <div class="dTopBar">
      <img class="dLogo" src="./images/logo.svg">
      <button class="dAccount buttonAnim dropdown">
        <img src="./images/profiles/default.svg">
        <div>Robot Engine</div>
      </button>
    </div>
    <div class="dHeader">
      <div class="dHeaderSection dHeaderTx">Ready to <div class="dHeaderTxAnimHolder"><div class="dHeaderTxAnim"></div><div class="dHeaderUnderline"></div></div></div>
      <div class="dHeaderSection dHeaderActions">
        <button class="dCreateDoc largeButton dropdown">New Lesson</button>
        <button class="dSearch largeButton">Search</button>
      </div>
      <div class="dBackdrop">
        <img class="dBackdropImage" src="./images/dashboard/background.svg">
        <img class="dIconImage" src="./images/icon.svg">
      </div>
    </div>
    <div class="dSection dRecentSec">
      <div class="dSectionTop">
        <div>Recent Lessons</div>
        <button class="buttonAnim">View More<img src="./images/tooltips/drop.svg"></button>
      </div>
      <div class="dSectionTiles"></div>
    </div>
    <div class="dSection dMineSec">
      <div class="dSectionTop">
        <div>My Lessons</div>
        <button class="buttonAnim">View More<img src="./images/tooltips/drop.svg"></button>
      </div>
      <div class="dSectionTiles">
        You have no documents! Create one!
      </div>
    </div>
    <div class="dSection dSharedSec">
      <div class="dSectionTop">
        <div>Shared Lessons</div>
        <button class="buttonAnim">View More<img src="./images/tooltips/drop.svg"></button>
      </div>
      <div class="dSectionTiles">
        You have no documents! Create one!
      </div>
    </div>
    <div class="dSection dNewestSec">
      <div class="dSectionTop">
        <div>Newest Lessons</div>
        <button class="buttonAnim">View More<img src="./images/tooltips/drop.svg"></button>
      </div>
      <div class="dSectionTiles">
        You have no documents! Create one!
      </div>
    </div>
  </div>
  `,
  css: {
    ".dPage": `display: flex; flex-direction: column; width: 100%; height: fit-content; max-width: 1000px`,
    
    ".dTopBar": `display: flex; justify-content: space-between; box-sizing: border-box; width: 100%; padding: 8px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); overflow: hidden; z-index: 10`,
    ".dLogo": `height: 44px; margin-right: 8px`,
    ".dAccount": `flex: 1; max-width: fit-content; padding: 6px; overflow: hidden; border-radius: 22px`,
    ".dAccount:hover": `background: var(--hover)`,
    ".dAccount:active": `background: unset; outline: solid 4px var(--hover)`,
    ".dAccount img": `float: left; width: 32px; height: 32px; margin-right: 6px; object-fit: cover; background: #fff; border-radius: 22px`,
    ".dAccount div": `float: right; max-width: calc(100% - 38px); height: 100%; line-height: 32px; font-size: 18px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,

    ".dHeader": `position: relative; width: 100%; margin-bottom: 25px`,
    ".dHeaderSection": `position: relative; display: flex; flex-wrap: wrap; padding: 20px 8px 20px 0; margin-left: 5%; align-items: center; z-index: 1`,
    ".dHeaderTx": `overflow: hidden; font-size: 30px; font-weight: 700`,
    ".dHeaderTxAnimHolder": `position: relative; margin-left: 8px`,
    ".dHeaderTxAnim": `position: absolute; width: max-content; top: 20px; left: 0px; font-size: 40px; color: var(--theme); text-shadow: 0px 0px 12px rgba(72, 167, 255, 0.5)`,
    ".dHeaderUnderline": `position: absolute; width: 0px; height: 5px; bottom: 0px; background: var(--theme); border-radius: 2.5px; transition: .5s`,
    ".dHeaderActions": `gap: 24px; margin: 0 30px 0 8%`,
    ".dCreateDoc": `background: var(--theme); border-radius: 20.25px; color: #fff`,
    ".dSearch": `background: #fff; border-radius: 20.25px; color: var(--secondary)`,
    ".dBackdrop": `position: absolute; width: 100%; height: 300px; top: -50px; left: 0px; top: -50px; z-index: 0`,
    ".dBackdropImage": `position: absolute; height: 100%; left: 0px`,
    ".dIconImage": `position: absolute; height: 100%; left: max(70%, 570px)`,

    ".dSection": `margin-bottom: 30px`,
    ".dSectionTop": `position: sticky; box-sizing: border-box; display: flex; width: 100%; top: 0px; padding: 16px; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 1`,
    ".dSectionTop div": `flex: 1; font-size: 30px; font-weight: 600; text-align: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dSectionTop button": `display: flex; padding: 8px; overflow: hidden; align-items: center; border-radius: 22px; font-size: 18px; font-weight: 600`,
    ".dSectionTop img": `width: 22px; margin-left: 6px`,
    ".dSectionTiles": "display: flex; flex-wrap: wrap; min-height: 200px; justify-content: center; align-items: center",
    ".dTile": `position: relative; width: calc(20% - 24px); min-width: 176px; height: 200px; margin: 12px; overflow: hidden; border-radius: 12px`,
    ".dTileDocImage": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover`,
    ".dTileInfo": `position: absolute; box-sizing: border-box; display: flex; flex-wrap: wrap; width: 100%; left: 0px; bottom: 0px; padding: 6px; background: rgba(var(--background), .7)`,
    ".dTileName": `width: 100%; font-size: 18px; font-weight: 600; color: var(--theme); text-align: left`,
    ".dTileStats": `display: flex; width: 100%; padding: 0 6px; font-size: 16px; font-weight: 700; overflow: hidden; white-space: nowrap`,
    ".dTileDate": `flex: 1; margin-right: 8px; color: var(--darkGray); text-align: left`,
    ".dTileMemberCount": "display: flex; color: var(--theme); justify-content: right; align-items: center",
    ".dTileMemberCount img": "width: 21px; height: 21px; margin-right: 2px"
  },
  js: function(page) {
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

    for (let i = 0; i < 10; i++) {
      page.querySelector(".dRecentSec").querySelector(".dSectionTiles").insertAdjacentHTML("beforeend", `<button class="dTile largeButton">
        <img class="dTileDocImage" src="./images/dashboard/exampledoc.png">
        <div class="dTileInfo">
          <div class="dTileName">New Lesson</div>
          <div class="dTileStats">
            <div class="dTileDate">3m</div>
            <div class="dTileMemberCount"><img src="./images/profiles/default.svg"><span>6</span></div>
          </div>
        </div>
      </button>`);
    }
  }
}