modules["dropdowns/account"] = class {
  html = `
  <button class="accountDrop accountLogout" style="--setBackground: var(--error)" close><div>Logout</div><img src="./images/tooltips/account/logout.svg"></button>
  <button class="accountDrop accountManage" close><div>Settings</div><img src="./images/tooltips/account/settings.svg"></button>
  <!--<button class="accountDrop" dropdown="dropdowns/account/preferences"><div>Preferences</div><img src="./images/tooltips/account/preferences.svg"></button>-->
  <div class="accountDropLine"></div>
  <button class="accountDrop" close pwa dropdowntitle="Add Markify as an app on your device!"><div>Get the App</div><img src="./images/tooltips/account/app.svg"></button>
  <button class="accountDrop" close dropdown="dropdowns/account/report" dropdowntitle="Report Bugs & Feedback" noscrollclose><div>Report Bug</div><img src="./images/tooltips/account/report.svg"></button>
  <button class="accountDrop" close whatsnew modaltitle="What's New"><div>What's New</div><img src="./images/tooltips/account/exclamation.svg"></button>
  <button class="accountDrop" close modal="modals/tutorial" modaltitle="Resources"><div>Resources</div><img src="./images/tooltips/account/question.svg"></button>
  <div class="accountDropLine"></div>
  <div class="accountSocialHolder">
    <a href="https://twitter.com/markifytool" target="_blank"><img src="./images/launch/socials/twitter.svg"></a>
    <a href="https://www.instagram.com/markifytool" target="_blank"><img src="./images/launch/socials/instagram.svg"></a>
    <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="./images/launch/socials/linkedin.svg"></a>
    <a href="https://www.youtube.com/@markifyexotek" target="_blank"><img src="./images/launch/socials/youtube.svg"></a>
  </div>
  <div class="accountPolicyHolder">
    <a href="https://exotek.co/tos" target="_blank">Terms</a>
    <a href="https://exotek.co/privacy" target="_blank">Privacy</a>
  </div>
  <div class="accountCopyrightHolder">
    <a href="https://exotek.co" target="_blank">©2024 Exotek LLC</a>
  </div>
  `;
  css = {
    ".accountDrop": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s; --setBackground: var(--theme)`,
    ".accountDrop:not(:last-child)": `margin-bottom: 4px`,
    ".accountDrop div": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".accountDrop img": `width: 24px; height: 24px; margin-left: 6px; object-fit: cover; transition: .15s`,
    ".accountDrop:hover": `background: var(--setBackground); color: #fff`,
    ".accountDrop:hover img": `filter: brightness(0) invert(1)`,
    ".accountDrop[pwa]": `display: none`,
    ".accountDropLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".accountSocialHolder": `display: flex; flex-wrap: wrap; height: fit-content; padding: 3px; background: #fff; border-radius: 12px; justify-content: space-evenly`,
    ".accountSocialHolder a": `width: 30px; height: 30px; margin: 3px`,
    ".accountSocialHolder a img": `width: 100%; height: 100%`,
    ".accountPolicyHolder": `display: flex; flex-wrap: wrap; justify-content: space-evenly; align-items: center`,
    ".accountPolicyHolder a": `margin: 4px; color: var(--darkGray); font-size: 16px; font-weight: 600; text-decoration: none`,
    ".accountCopyrightHolder": `display: flex; flex-wrap: wrap; margin: 2px 0; justify-content: center; align-items: center`,
    ".accountCopyrightHolder a": `color: var(--darkGray); font-size: 14px; font-weight: 500; text-decoration: none`
  };
  js = async function (frame) {
    frame.querySelector(".accountManage").addEventListener("click", function () {
      let a = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft;
      let i = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop;
      let g = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth;
      let f = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.documentElement.clientHeight - 22);
      let h = (a < 0) ? window.screen.width + a : a;
      window.open("https://exotek.co/account?userid=" + account.account, "exotek_window_prompt", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + 1000 + ", height=" + 650 + ", top=" + parseInt(i + ((f - 650) / 2.5), 10) + ", left=" + parseInt(h + ((g - 1000) / 2), 10));
    });
    frame.querySelector(".accountLogout").addEventListener("click", async function () {
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
    installpwa.addEventListener("click", async function () {
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
    let whatsNew = frame.querySelector(".accountDrop[whatsnew]");
    if (account.currentWhatsNew != null) {
      whatsNew.setAttribute("modal", "modals/updates/" + account.currentWhatsNew);
    } else {
      whatsNew.remove();
    }
  }
}