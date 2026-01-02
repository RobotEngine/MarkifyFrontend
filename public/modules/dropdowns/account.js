modules["dropdowns/account"] = class {
  html = `
  <button class="accountDrop accountLogout" style="--themeColor: var(--error)" close><div>Logout</div><div image></div></button>
  <button class="accountDrop accountManage" dropdowntitle="Settings" noscrollclose><div>Settings</div><div image></div></button>
  <div class="accountDropLine"></div>
  <button class="accountDrop" close pwa dropdowntitle="Add Markify as an app on your device!"><div>Get the App</div><div image></div></button>
  <button class="accountDrop" report dropdowntitle="Send Feedback" noscrollclose><div>Send Feedback</div><div image></div></button>
  <button class="accountDrop" close whatsnew><div>What's New</div><div image></div></button>
  <button class="accountDrop" tutorial close modaltitle="Resources"><div>Resources</div><div image></div></button>
  <button class="accountDrop" share dropdowntitle="Share Markify" style="--themeColor: var(--purple)"><div>Share Markify</div><div image></div></button>
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
    ".accountDrop div[image]": `max-width: 24px; height: 24px; margin-left: 6px; transition: .15s`,
    ".accountDrop div[image] svg": `width: 100%; height: 100%`,
    ".accountDrop:hover": `background: var(--themeColor); color: #fff`,
    ".accountDrop:hover div[image]": `filter: brightness(0) invert(1)`,
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
    setSVG(logoutButton.querySelector("div[image]"), "../images/tooltips/account/logout.svg");
    let settingsButton = frame.querySelector(".accountManage");
    settingsButton.addEventListener("click", () => {
      dropdownModule.open(settingsButton, "dropdowns/account/manage");
    });
    setSVG(settingsButton.querySelector("div[image]"), "../images/tooltips/account/settings.svg");
    let tutorialButton = frame.querySelector(".accountDrop[tutorial]");
    tutorialButton.addEventListener("click", async () => {
      modalModule.open("modals/resources", null, tutorialButton, "Resources");
    });
    setSVG(tutorialButton.querySelector("div[image]"), "../images/tooltips/account/question.svg");
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
    setSVG(installpwa.querySelector("div[image]"), "../images/tooltips/account/app.svg");
    let whatsNew = frame.querySelector(".accountDrop[whatsnew]");
    whatsNew.addEventListener("click", () => {
      setFrame("pages/app/lesson", null, { params: { lesson: account.currentWhatsNew } });
    });
    if (account.currentWhatsNew == null) {
      whatsNew.remove();
    }
    setSVG(whatsNew.querySelector("div[image]"), "../images/tooltips/account/exclamation.svg");
    let shareButton = frame.querySelector(".accountDrop[share]");
    shareButton.addEventListener("click", () => {
      dropdownModule.open(shareButton, "dropdowns/gift");
    });
    setSVG(shareButton.querySelector("div[image]"), "../images/editor/actions/send.svg");
    let reportButton = frame.querySelector(".accountDrop[report]");
    reportButton.addEventListener("click", () => {
      dropdownModule.open(reportButton, "dropdowns/account/report");
    });
    setSVG(reportButton.querySelector("div[image]"), "../images/tooltips/account/report.svg");

    if (account.tenant != null && account.tenant.flags != null && account.tenant.flags.hide_platform_socials == true) {
      frame.querySelector(".accountSocialHolder").remove();
    }

    frame.querySelector(".accountVersion").textContent = "v" + version;
  }
}

modules["dropdowns/account/manage"] = class {
  maxHeight = 500;
  html = `
  <div class="aManageHolder">
    <div class="aManageAccount">
      <div class="aManageTitle">
        <div title>Account</div>
        <div divider></div>
      </div>
      <div class="aManageCard">
        <div class="aImageHolder">
          <img src="../images/profiles/default.svg">
        </div>
        <div class="aManageInfoHolder">
          <div class="aManageInfo">
            <div account></div>
            <div email></div>
          </div>
          <button class="largeButton">Manage Account<div backdrop></div></button>
        </div>
      </div>
    </div>
    <div class="aManageSection">
      <div class="aManageTitle">
        <div title>Preferences</div>
        <div divider></div>
      </div>
      <button class="aManageSetting" setting="theme">
        <div label>Theme</div>
        <div setting></div>
      </button>
      <button class="aManageSetting" setting="toolbar">
        <div label>Toolbar Position</div>
        <div setting></div>
      </button>
      <button class="aManageSetting" setting="actionbar">
        <div label>Action Bar Position</div>
        <div setting></div>
      </button>
    </div>
    <div class="aManageSection" emails>
      <div class="aManageTitle">
        <div title>Emails</div>
        <div divider></div>
      </div>
      <button class="aManageSetting" setting="emails.invites">
        <div label>Lesson Invites</div>
        <div toggle><div></div></div>
      </button>
      <button class="aManageSetting" setting="emails.mentions">
        <div label>Mentions</div>
        <div toggle><div></div></div>
      </button>
      <button class="aManageSetting" setting="emails.announcements" marketing>
        <div label>Announcements</div>
        <div toggle><div></div></div>
      </button>
      <button class="aManageSetting" setting="emails.newsletters" marketing>
        <div label>Newsletters</div>
        <div toggle><div></div></div>
      </button>
      <div class="aManageRaw"><button><u>Unsubscribe from Marketing</u></button></div>
    </div>
  </div>
  `;
  css = {
    ".aManageHolder": `display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center; padding: 8px; gap: 20px; --setBackground: var(--theme); font-weight: 700; font-size: 18px; max-width: 350px`,
    ".aManageAccount": `position: sticky; box-sizing: border-box; width: 100%; left: 0; z-index: 2`,
    ".aManageTitle": `display: flex; gap: 8px; align-items: center`,
    ".aManageTitle div[title]": `color: var(--secondary)`,
    ".aManageTitle div[divider]": `flex: 1; height: 4px; background: var(--hover); border-radius: 2px`,
    ".aManageCard": `display: flex; flex-wrap: wrap; padding: 12px; margin: 8px 0; gap: 8px; background: var(--pageColor); border-radius: 12px; box-shadow: var(--darkShadow); justify-content: center; align-items: center; text-align: center`,
    ".aImageHolder": `width: 120px; height: 120px; display: flex; align-items: center; justify-content: center`,
    ".aImageHolder img": `border-radius: 80px; max-width: 100%; aspect-ratio: 1; box-sizing: border-box; border: 6px solid var(--pageColor); box-shadow: var(--darkShadow); object-fit: cover`,
    ".aManageInfoHolder": `display: flex; flex-direction: column; flex-wrap: wrap; min-height: 120px; flex: 1 1 180px; align-items: center`,
    ".aManageInfo": `margin: 6px 0 16px 0`,
    ".aManageInfo div[account]": `font-size: 20px; font-weight: 800`,
    ".aManageInfo div[email]": `color: var(--secondary); font-size: 16px; font-weight: 600; margin-top: 3px`,
    ".aManageInfoHolder button": `width: fit-content; padding: 6px 10px; --themeColor: var(--theme); --borderRadius: 12px; margin-top: auto; text-align: center; justify-content: center; font-size: 18px`,
    ".aManageSection": `display: flex; flex-direction: column; gap: 8px`, 
    ".aManageSetting": `display: flex; padding: 6px 6px 6px 10px; background: var(--pageColor); border-radius: 12px 22px 22px 12px; box-shadow: var(--darkShadow); justify-content: center; align-items: center; font-size: 16px; font-weight: 700; text-align: left`,
    ".aManageSetting[enabled]": `--themeColor: var(--secondary)`,
    ".aManageSetting:not([enabled])": `--themeColor: var(--gray)`,
    ".aManageSetting div[label]": `flex: 1; margin-right: 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".aManageSetting div[setting]": `position: relative; display: flex; box-sizing: border-box; height: 32px; padding: 4px 10px; background: var(--secondary); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-weight: 700; transition: .2s`,
    ".aManageSetting div[toggle]": `position: relative; box-sizing: border-box; width: 50px; height: 32px; padding: 4px; background: var(--themeColor); border-radius: 16px; transition: .2s`,
    ".aManageSetting div[toggle] div": `position: absolute; width: 24px; height: 24px; background: var(--pageColor); border-radius: 12px; transition: .2s`,
    ".aManageSetting[enabled] div[toggle] div": `right: 4px`,
    ".aManageSetting:not([enabled]) div[toggle] div": `right: calc(100% - 28px)`,
    ".aManageSetting:active": `transform: scale(.98) !important`,
    ".aManageRaw button": `color: var(--secondary); font-size: 18px; font-weight: 600`
  };
  settings = {
    theme: {
      type: "setting",
      options: { auto: "Auto", light: "Light", dark: "Dark" },
      order: ["auto", "light", "dark"]
    },
    toolbar: {
      type: "setting",
      options: { left: "Left", right: "Right" },
      order: ["left", "right"]
    },
    actionbar: {
      type: "setting",
      options: { auto: "Auto", top: "Top" },
      order: ["auto", "top"]
    },
    "emails.invites": {
      type: "toggle",
      default: true
    },
    "emails.mentions": {
      type: "toggle",
      default: true
    },
    "emails.announcements": {
      type: "toggle",
      default: true
    },
    "emails.newsletters": {
      type: "toggle",
      default: true
    }
  };
  js = async (frame) => {
    frame.querySelector(".aManageInfoHolder button").addEventListener("click", () => {
      let a = typeof window.screenX != "undefined" ? window.screenX : window.screenLeft;
      let i = typeof window.screenY != "undefined" ? window.screenY : window.screenTop;
      let g = typeof window.outerWidth != "undefined" ? window.outerWidth : document.documentElement.clientWidth;
      let f = typeof window.outerHeight != "undefined" ? window.outerHeight : (document.documentElement.clientHeight - 22);
      let h = (a < 0) ? window.screen.width + a : a;
      window.open("https://exotek.co/account?userid=" + account.account, "exotek_window_prompt", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + 1000 + ", height=" + 650 + ", top=" + parseInt(i + ((f - 650) / 2.5), 10) + ", left=" + parseInt(h + ((g - 1000) / 2), 10));
    });

    let saving = false;
    let saveObj = {};
    let saveSetting = async (setting, value) => {
      if (setting != null) {
        saveObj[setting] = value;
      }
      if (saving == true) {
        return;
      }
      saving = true;
      while (Object.keys(saveObj).length > 0) {
        let sendObj = saveObj;
        saveObj = {};
        let [code] = await sendRequest("POST", "me/setting", { save: sendObj });
        if (code != 200) {
          window.updateAccountOptionsUI();
        }
      }
      saving = false;
    }

    frame.addEventListener("click", (event) => {
      let option = event.target.closest(".aManageSetting");
      if (option == null) {
        return;
      }
      let setting = option.getAttribute("setting");
      let data = this.settings[setting];
      if (data == null) {
        return;
      }
      if (data.type == "setting") {
        let current = option.getAttribute("value");
        let index = data.order.indexOf(current) + 1;
        if (index >= data.order.length) {
          index = 0;
        }
        let set = data.order[index];
        option.setAttribute("value", set);
        let settingText = option.querySelector("div[setting]");
        settingText.textContent = data.options[set];
        settingText.setAttribute("disabled", "");
        saveSetting(setting, set);
      } else if (data.type == "toggle") {
        let set = !option.hasAttribute("enabled");
        if (set == true) {
          option.setAttribute("enabled", "");
        } else {
          option.removeAttribute("enabled");
        }
        option.querySelector("div[toggle]").setAttribute("disabled", "");
        saveSetting(setting, set);
      }
    });
    let emailSettings = frame.querySelector(".aManageSection[emails]");
    emailSettings.querySelector(".aManageRaw button").addEventListener("click", () => {
      let emailOptions = emailSettings.querySelectorAll(".aManageSetting");
      for (let i = 0; i < emailOptions.length; i++) {
        let option = emailOptions[i];
        if (option.hasAttribute("marketing") == true && option.hasAttribute("enabled") == true) {
          option.removeAttribute("enabled");
          option.querySelector("div[toggle]").setAttribute("disabled", "");
          saveObj[option.getAttribute("setting")] = false;
        }
      }
      saveSetting();
    });

    window.updateAccountOptionsUI = () => {
      if (frame == null) {
        return;
      }

      if (account.image != null) {
        frame.querySelector(".aImageHolder img").src = account.image;
      }
      frame.querySelector(".aManageInfo div[account]").textContent = account.user;
      frame.querySelector(".aManageInfo div[email]").textContent = account.email;

      if (Object.keys(saveObj).length > 0) {
        return;
      }

      let settings = account.settings ?? {};
      let settingOptions = frame.querySelectorAll(".aManageSetting");
      for (let i = 0; i < settingOptions.length; i++) {
        let option = settingOptions[i];
        let setting = option.getAttribute("setting");
        let data = this.settings[setting];
        if (data == null) {
          continue;
        }
        let key = (setting ?? "").split(".");
        let value = settings;
        for (let k = 0; k < key.length; k++) {
          value = (value ?? {})[key[k]];
        }
        if (data.type == "setting") {
          let set = value ?? data.order[0];
          option.setAttribute("value", set);
          option.querySelector("div[setting]").textContent = data.options[set];
        } else if (data.type == "toggle") {
          if (value ?? data.default == true) {
            option.setAttribute("enabled", "");
          } else {
            option.removeAttribute("enabled");
          }
        }
        let disabled = option.querySelector("[disabled]");
        if (disabled != null) {
          disabled.removeAttribute("disabled");
        }
      }
    }
    window.updateAccountOptionsUI();
  };
};

modules["dropdowns/account/report"] = class {
  html = `
  <div class="aReportHolder">
    <div class="aReportTypeHolder">
      <button class="aReportTypeButton largeButton" type="bug" style="--rgbTheme: 255, 61, 100" selected>
        <div circle><div></div></div>
        <div context>
          <div title>Report Bug</div>
          <div text>This doesn't work...</div>
        </div>
      </button>
      <button class="aReportTypeButton largeButton" type="help" style="--rgbTheme: 52, 193, 114">
        <div circle><div></div></div>
        <div context>
          <div title>Get Support</div>
          <div text>How do I...</div>
        </div>
      </button>
      <button class="aReportTypeButton largeButton" type="feature" style="--rgbTheme: 0, 132, 255">
        <div circle><div></div></div>
        <div context>
          <div title>Request Feature</div>
          <div text>Could you add...</div>
        </div>
      </button>
    </div>
    <div class="aReportDescHolder">
      <textarea></textarea>
      <button class="aReportSubmitButton largeButton">Submit</button>
    </div>
  </div>
  `;
  css = {
    ".aReportHolder": `display: flex; flex-wrap: wrap; justify-content: center`,
    ".aReportTypeHolder": `display: flex; margin: 8px; flex-direction: column; align-items: center`,
    ".aReportTypeButton": `--themeColor: rgb(var(--rgbTheme)); --themeColor2: var(--themeColor); --borderRadius: 24px; width: 100%; padding: 8px; flex-wrap: wrap; margin: 8px; justify-content: center; text-align: left; background: linear-gradient(to bottom right, rgba(var(--rgbTheme), 0), var(--pageColor))`,
    ".aReportTypeButton:hover": `background: linear-gradient(to bottom right, rgba(var(--rgbTheme), .3), var(--pageColor))`,
    ".aReportTypeButton div[circle]": `width: 20px; height: 20px; margin: 0 10px 0 6px; border: solid 3px var(--themeColor); border-radius: 20px`,
    ".aReportTypeButton div[circle] div": `width: 14px; height: 14px; margin: 3px; border-radius: 7px; transform: scale(0); transition: .3s`,
    ".aReportTypeButton[selected] div[circle] div": `transform: scale(1); background: var(--themeColor)`,
    ".aReportTypeButton div[context]": `flex: 1`,
    ".aReportTypeButton div[context] div[title]": `font-weight: 700; font-size: 18px`,
    ".aReportTypeButton div[context] div[text]": `font-weight: 500; font-size: 14px`,

    ".aReportDescHolder": `display: flex; max-width: calc(100% - 16px); margin: 8px; flex-direction: column; align-items: center`,
    ".aReportDescHolder textarea": `flex: 1; padding: 8px; width: 250px; max-width: calc(100% - 22px); min-height: 140px; background: unset; border: solid 3px var(--hover); border-radius: 16px; outline: none; resize: none; color: var(--textColor); font-family: var(--font); font-size: 15px`,
    ".aReportSubmitButton": `padding: 6px 10px; margin: 15px 0 3px 0; background: var(--theme); --borderRadius: 16px; color: #fff; font-size: 16px`
  };
  js = async (frame) => {
    frame.setAttribute("noscrollclose", "");
    
    let buttonHolder = frame.querySelector(".aReportTypeHolder");
    let textarea = frame.querySelector(".aReportDescHolder textarea");
    let submit = frame.querySelector(".aReportSubmitButton");

    textarea.addEventListener("input", () => {
      if (textarea.value.length < 1) {
        submit.setAttribute("disabled", "");
      } else {
        submit.removeAttribute("disabled");
      }
    });

    submit.addEventListener("click", async () => {
      if (textarea.value.length < 1) {
        return;
      }
      if (textarea.value.length > 1000) {
        return alertModule.open("error", "<b>Feedback Too Long</b><div>Please keep feedback under 1,000 characters (" + textarea.value.length + "/1000).");
      }
      let type = buttonHolder.querySelector(".aReportTypeButton[selected]").getAttribute("type");
      frame.setAttribute("disabled", "");
      let [code] = await sendRequest("POST", "me/feedback", {
        type: type,
        content: textarea.value
      });
      frame.removeAttribute("disabled");
      if (code == 200) {
        dropdownModule.close();
        switch (type) {
          case "bug":
            return alertModule.open("worked", "<b>Thank You</b><div>We received your issue and will be working to resolve it! If we need anything, you may receive an email.", { time: 8 });
          case "help":
            return alertModule.open("worked", "<b>Help is On The Way</b><div>You should receive an email with help in your inbox soon.", { time: 8 });
          case "feature":
            return alertModule.open("worked", "<b>Thank You</b><div>Markify is still early, and we have a long way to go. Thank you for your suggestion, we'll see what we can do!", { time: 8 });
        }
      }
    });

    let setButton = async (button, wait) => {
      if (button == null) {
        return;
      }
      let selected = buttonHolder.querySelector(".aReportTypeButton[selected]");
      if (selected != null) {
        selected.removeAttribute("selected", "");
      }
      button.setAttribute("selected", "");
      textarea.setAttribute("placeholder", button.querySelector("div[context] div[text]").textContent);
      if (textarea.value.length < 1) {
        submit.setAttribute("disabled", "");
      } else {
        submit.removeAttribute("disabled");
      }
      if (wait == true) {
        await sleep(400);
      }
      textarea.focus();
    }
    buttonHolder.addEventListener("click", (event) => {
      setButton(event.target.closest(".aReportTypeButton"));
    });
    setButton(buttonHolder.querySelector('.aReportTypeButton[type="bug"]'), true);
  }
}
