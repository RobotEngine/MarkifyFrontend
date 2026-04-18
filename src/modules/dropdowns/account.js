import {
  account,
  setPage,
  getParam,
  getLocalStore,
  removeLocalStore,
  promptLogin,
  sendRequest
} from "@/crucial";

import { version } from "@/configuration";

import modalModule from "@modules/utility/modal";

import settings from "./settings";
import gift from "./gift";
import report from "./report";

import logoutIcon from "@assets/account/logout.svg?raw";
import settingsIcon from "@assets/account/settings.svg?raw";
import appIcon from "@assets/account/app.svg?raw";
import reportIcon from "@assets/account/report.svg?raw";
import exclamationIcon from "@assets/account/exclamation.svg?raw";
import questionIcon from "@assets/account/question.svg?raw";
import sendIcon from "@assets/editor/actions/send.svg?raw";

export default class {
  html = `
  <button class="accountDrop accountLogout" style="--themeColor: var(--error)" close><div>Logout</div>${logoutIcon}</button>
  <button class="accountDrop accountManage" dropdowntitle="Settings" noscrollclose><div>Settings</div>${settingsIcon}</button>
  <div class="accountDropLine"></div>
  <button class="accountDrop" close pwa dropdowntitle="Add Markify as an app on your device!"><div>Get the App</div>${appIcon}</button>
  <button class="accountDrop" report dropdowntitle="Send Feedback" noscrollclose><div>Send Feedback</div>${reportIcon}</button>
  <button class="accountDrop" close whatsnew><div>What's New</div>${exclamationIcon}</button>
  <button class="accountDrop" tutorial close modaltitle="Resources"><div>Resources</div>${questionIcon}</button>
  <button class="accountDrop" share dropdowntitle="Share Markify" style="--themeColor: var(--purple)"><div>Share Markify</div>${sendIcon}</button>
  <div class="accountDropLine"></div>
  <div class="accountSocialHolder">
    <a href="https://x.com/markifytool" target="_blank"><img src="../images/launch/socials/twitter.svg"></a>
    <a href="https://www.instagram.com/markifytool" target="_blank"><img src="../images/launch/socials/instagram.svg"></a>
    <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="../images/launch/socials/linkedin.svg"></a>
    <a href="https://www.facebook.com/groups/1140371071626764" target="_blank"><img src="../images/launch/socials/facebook.svg"></a>
    <a href="https://www.youtube.com/channel/UCoOM6y6FxPG_tBpZD3CynRg" target="_blank"><img src="../images/launch/socials/youtube.svg"></a>
  </div>
  <div class="accountPolicyHolder">
    <a href="../tos" target="_blank">Terms</a>
    <a href="../privacy" target="_blank">Privacy</a>
  </div>
  <div class="accountCopyrightHolder">
    <a href="../launch" target="_blank">©2026 Markify, LLC</a>
    <div class="accountVersion"></div>
  </div>
  `;
  css = {
    ".accountDrop": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s; --themeColor: var(--theme)`,
    ".accountDrop:not(:last-child)": `margin-bottom: 4px`,
    ".accountDrop div": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".accountDrop svg": `max-width: 24px; height: 24px; margin-left: 6px; transition: .15s`,
    ".accountDrop:hover": `background: var(--themeColor); color: #fff`,
    ".accountDrop:hover svg": `filter: brightness(0) invert(1)`,
    ".accountDrop[pwa]": `display: none`,
    ".accountDropLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".accountSocialHolder": `display: flex; flex-wrap: wrap; height: fit-content; padding: 3px; justify-content: space-evenly`,
    ".accountSocialHolder a": `width: 30px; height: 30px; margin: 3px`,
    ".accountSocialHolder a img": `width: 100%; height: 100%`,
    ".accountPolicyHolder": `display: flex; flex-wrap: wrap; justify-content: space-evenly; align-items: center`,
    ".accountPolicyHolder a": `margin: 4px; color: var(--darkGray); font-size: 16px; font-weight: 600; text-decoration: none`,
    ".accountCopyrightHolder": `display: flex; flex-wrap: wrap; margin: 2px 0; justify-content: space-between; align-items: center; color: var(--darkGray); font-size: 14px; font-weight: 500`,
    ".accountCopyrightHolder a": `text-decoration: none`,
  };
  js = async (frame) => {
    frame.style.width = "200px";
    frame.style.minWidth = "100%";
    frame.style.maxWidth = "100%";

    let dropdownTitle = frame.closest(".dropdownOverflow").querySelector(".dropdownTitle");
    if (account.image != null) {
      dropdownTitle.querySelector("img[accountimage]").src = account.image;
    }
    let username = dropdownTitle.querySelector("div[accountuser]");
    username.textContent = account.user;
    username.title = account.user;

    let logoutButton = frame.querySelector(".accountLogout");
    logoutButton.addEventListener("click", async () => {
      let token = getLocalStore("token");
      if (token == null) {
        return;
      }
      let [code] = await sendRequest("POST", "auth/logout", {
        refresh: JSON.parse(token).refresh
      });
      if (code == 200) {
        removeLocalStore("userID");
        removeLocalStore("token");
        promptLogin();
      }
    });
    //setSVG(logoutButton.querySelector("div[image]"), "../images/tooltips/account/logout.svg");
    let settingsButton = frame.querySelector(".accountManage");
    settingsButton.addEventListener("click", () => {
      this.open(settingsButton, settings);
    });
    //setSVG(settingsButton.querySelector("div[image]"), "../images/tooltips/account/settings.svg");
    let tutorialButton = frame.querySelector(".accountDrop[tutorial]");
    tutorialButton.addEventListener("click", async () => {
      modalModule.open(import("@modules/modals/resources"), null, { title: "Resources" });
    });
    //setSVG(tutorialButton.querySelector("div[image]"), "../images/tooltips/account/question.svg");
    let isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    let checkForPrompt = () => {
      if (window.matchMedia("(display-mode: standalone)").matches == true || window.navigator.standalone == true || document.referrer.includes("android-app://") == true) {
        return false;
      }
      if (getParam("source") == "pwa") {
        return false;
      }
      if (isIos == true) {
        return true;
      }
      if (window.deferredPrompt == null) {
        return false;
      }
      if (window.deferredPrompt.prompt == null) {
        return false;
      }
      return true;
    }
    let installpwa = frame.querySelector(".accountDrop[pwa]");
    installpwa.addEventListener("click", async () => {
      if (checkForPrompt() == true) {
        if (window.deferredPrompt != null && window.deferredPrompt.prompt != null) {
          await window.deferredPrompt.prompt();
          let { outcome } = await window.deferredPrompt.userChoice;
          if (outcome === "accepted") {
            sendRequest("POST", "me/science", { type: "installedpwa", value: true });
          }
        } else if (isIos == true) {
          alertModule.open("info", `<b>Add to Home Screen</b><div>To add Markify on an iOS device, tap on the <b>Share</b> button, then scroll down and tap on <b>Add to Home Screen</b></div>`, { time: 15 });
        }
      }
    });
    if (checkForPrompt() == true) {
      installpwa.style.display = "flex";
    }
    //setSVG(installpwa.querySelector("div[image]"), "../images/tooltips/account/app.svg");
    let whatsNew = frame.querySelector(".accountDrop[whatsnew]");
    whatsNew.addEventListener("click", () => {
      setPage("pages/app/lesson", { params: { lesson: account.currentWhatsNew } });
    });
    if (account.currentWhatsNew == null) {
      whatsNew.remove();
    }
    //setSVG(whatsNew.querySelector("div[image]"), "../images/tooltips/account/exclamation.svg");
    let shareButton = frame.querySelector(".accountDrop[share]");
    shareButton.addEventListener("click", () => {
      this.open(shareButton, gift);
    });
    //setSVG(shareButton.querySelector("div[image]"), "../images/editor/actions/send.svg");
    let reportButton = frame.querySelector(".accountDrop[report]");
    reportButton.addEventListener("click", () => {
      this.open(reportButton, report);
    });
    //setSVG(reportButton.querySelector("div[image]"), "../images/tooltips/account/report.svg");

    if (account.tenant != null && account.tenant.flags != null && account.tenant.flags.hide_platform_socials == true) {
      frame.querySelector(".accountSocialHolder").remove();
    }

    frame.querySelector(".accountVersion").textContent = "v" + version;
  }
}