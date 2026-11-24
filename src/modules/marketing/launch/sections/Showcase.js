import {
  head,
  body,
  app,
  PageFrame,
  fixed,
  favicon,

  assetURL,

  userID,
  account,

  changeGlobalImports,
  mouseDown,
  appendCSS,
  setPage,
  setFrame,
  sleep,
  cleanString,
  uncleanString,
  hash,
  timeSince,
  formatFullDate,
  addS,
  getParam,
  modifyParams,
  getEpoch,
  checkForAuth,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  getObject,
  copyObject,
  objectUpdate,
  objectEqual,
  getTheme,
  textBoxError,
  clipBoardRead
} from "@/crucial";

import { VariableFontWeightWave } from "../../effects/VariableFontWeightWave";

import blurBackdrop from "@assets/backgrounds/cursorgradient.svg?no-inline";
import dotsblackBackdrop from "@assets/backgrounds/dotsblack.svg?no-inline";
import dotswhiteBackdrop from "@assets/backgrounds/dotswhite.svg?no-inline";

export class Frame {
  html = `
  <section class="section">
    <div class="sticky">
      <img class="overviewBackdrop" src="${blurBackdrop}" />
      <div class="overviewCenterBackground"></div>
    </div>
    <div class="scroll">
      <div class="scrollSection overviewContent">
        <div class="centerContent">
          <svg viewBox="0 0 500 60" class="headerSloganTop">
            <path id="slogan-top-curve" d="M 0,58 Q 250,16 500,58" fill="transparent" />
            <text width="500">
              <textPath href="#slogan-top-curve" startOffset="50%" text-anchor="middle">
                Bring the whiteboard to
              </textPath>
            </text>
          </svg>
          <div class="headerSloganBottom"></div>
          <div class="detailText">Markify brings every student onto a shared, real-time whiteboard. Give your class the freedom to collaborate while keeping full control over your lesson.</div>
          <div class="actionButtonHolder">
            <button class="openDashboard largeButton" openpage="app/dashboard"><div>Open Markify</div></button>
            <button class="openJoin largeButton" openpage="app/join">Join Lesson<img src="../images/tooltips/link.svg"></button>
          </div>
          <div class="headerPrice">Markify is <b>FREE</b> for educators and students.</div>
        </div>
      </div>
      <div class="scrollSection"></div>
    </div>
  </div>
  `;

  static scoped = true;
  css = {
    ".section": `position: relative; display: grid; width: 100%; height: fit-content; min-height: 100vh; min-height: 100dvh; overflow-x: clip`,
    ".sticky, .scroll": `grid-area: 1 / 1`,

    ".sticky": `position: sticky; width: 100%; height: 100vh; height: 100dvh; left: 0; top: 0; pointer-events: none`,
    ".overviewBackdrop": `position: absolute; width: 100%; height: 100%; left: 0; top: 0; object-fit: cover; opacity: .4; z-index: 1`,
    ".overviewCenterBackground": `position: absolute; max-width: var(--maxContentWidth); left: 50%; top: 50%; transform: translate(-50%, calc(-50% - var(--scrollY))); background: radial-gradient(var(--pageColor) 40%, transparent 60%); z-index: 2`,
    ".overviewCenterBackground:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-image: var(--dotsBackground); background-size: 24px 24px; background-position: center center; -webkit-mask-image: radial-gradient(black 20%, transparent 50%); mask-image: radial-gradient(black 30%, transparent 60%); opacity: .04; transform: translate3d(0, var(--dotBackgroundYOffset, 0), 0)`,

    ".scroll": `position: relative; width: 100%; height: fit-content`,
    ".scrollSection": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; height: fit-content; min-height: 100vh; min-height: 100dvh; padding-top: var(--scrollOffset); justify-content: center; align-items: center`,

    ".centerContent": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; max-width: 700px; padding: 8px; align-items: center`,
    ".headerSloganTop": `width: 100%; height: auto; font-family: var(--font); font-size: 28px; fill: var(--textColor); font-weight: 500; letter-spacing: 6%`,
    ".headerSloganBottom": `font-family: var(--playfulFont); font-size: clamp(40px, 10cqi, 76px); color: var(--theme); letter-spacing: 4%; cursor: none`,
    ".detailText": `width: 100%; margin: 32px 0; font-size: 18px; line-height: 150%; text-wrap: balance`,
    ".actionButtonHolder": `box-sizing: border-box; display: flex; flex-wrap: wrap; width: 100%; max-width: 600px; padding: 16px; gap: 16px; margin-top: 40px; justify-content: space-evenly`,
    ".actionButtonHolder > button": `--borderRadius: 20px; box-shadow: 0 0 24px 0 rgba(var(--themeRGB), .3)`,
    ".openDashboard": `display: flex; flex-direction: row; bottom: 0px; align-items: center; --borderRadius: 14px; background: var(--theme); color: #fff`,
    ".openDashboard img[loginBtnBeforeImg]": `width: 26px; height: 26px; margin-right: 8px; object-fit: cover; border-radius: 16px; border: 2px solid var(--secondary); background: var(--theme)`,
    ".openDashboard img[defaultLoginBtnBeforeImg]": `width: 24px; height: 24px; margin-right: 8px; object-fit: cover; border-radius: 16px; border: 4px solid var(--theme); background: var(--theme)`,
    ".openDashboard img[loginBtnAfterImg]": `width: 24px; height: 24px; margin-left: 8px; filter: brightness(0) invert(1);`,
    ".openDashboard div[accountuser]": `white-space: nowrap; flex: 1;`,
    ".openJoin": `background: var(--pageColor); color: var(--secondary)`,
    ".openJoin img": `width: 24px; height: 24px; margin-left: 8px`,
    ".headerPrice": `margin-top: 24px; font-size: 16px; line-height: 150%; text-wrap: balance`,
    ".headerPrice b": `color: var(--theme); font-weight: 700`,
  };

  DOT_BACKGROUND_TILE_SIZE = 24;
  
  onBoundsChange() {
    let scrollY = window.scrollY;

    // Handle center background:
    this.overviewCenterBackground.style.width = (this.overviewCenterContent.offsetWidth * 2) + "px";
    this.overviewCenterBackground.style.height = (this.overviewCenterContent.offsetHeight * 2) + "px";
    this.overviewCenterBackground.style.setProperty("--scrollY", scrollY + "px");
    this.overviewCenterBackground.style.setProperty("--dotBackgroundYOffset", (scrollY % this.DOT_BACKGROUND_TILE_SIZE) + "px");
  }

  updateConnectLogin() {
    let loginBtn = this.overviewCenterContent.querySelector(".openDashboard");
    if (userID != null) {
      if (account.image != null) {
        loginBtn.innerHTML = `<img loginBtnBeforeImg /><div>Dashboard</div><img src="../images/tooltips/link.svg" loginBtnAfterImg />`;
        loginBtn.querySelector("[loginBtnBeforeImg]").src = account.image;
      } else {
        loginBtn.innerHTML = `<img src="../images/profiles/defaultWhite.svg" defaultLoginBtnBeforeImg /><div accountuser>Dashboard</div><img src="../images/tooltips/link.svg" loginBtnAfterImg />`;
      }
      loginBtn.style.padding = "8px 14px 8px 8px";
      this.onBoundsChange();
    }
  }

  updateTheme() {
    if (getTheme() != "dark") {
      this.overviewCenterBackground.style.setProperty("--dotsBackground", "url(" + dotsblackBackdrop + ")");
    } else {
      this.overviewCenterBackground.style.setProperty("--dotsBackground", "url(" + dotswhiteBackdrop + ")");
    }
  }

  js(frame) {
    this.sticky = frame.querySelector(".sticky");
    this.overviewCenterBackground = this.sticky.querySelector(".overviewCenterBackground");

    this.scroll = frame.querySelector(".scroll");
    this.overviewContent = this.scroll.querySelector(".overviewContent");
    this.overviewCenterContent = this.overviewContent.querySelector(".centerContent");
    this.headerSloganBottom = this.overviewCenterContent.querySelector(".headerSloganBottom");

    // Setup Variable Text:
    let waveManager = new VariableFontWeightWave(this.parent.pipeline);
    waveManager.add(this.headerSloganBottom, "Everyone's Desk", {
      maxWeight: 800,
      waveOnStart: true
    });

    // Handle Scroll (and Resize) Event:
    this.parent.pipeline.subscribe("showcaseBoundsChange", "bounds_change", (event) => { this.onBoundsChange(event); });
    this.onBoundsChange();

    // Update account on load:
    this.parent.pipeline.subscribe("showcaseConnect", "connect", () => { this.updateConnectLogin(); });
    this.updateConnectLogin();

    // Update theme:
    this.parent.pipeline.subscribe("showcaseTheme", "theme", () => { this.updateTheme(); });
    this.updateTheme();
  }
}