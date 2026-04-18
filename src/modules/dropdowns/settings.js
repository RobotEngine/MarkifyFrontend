import { account, sendRequest } from "@/crucial";

export default class {
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
    ".aManageSetting": `display: flex; padding: 6px 6px 6px 14px; background: var(--pageColor); border-radius: 12px 22px 22px 12px; box-shadow: var(--darkShadow); justify-content: center; align-items: center; font-size: 16px; font-weight: 700; text-align: left`,
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