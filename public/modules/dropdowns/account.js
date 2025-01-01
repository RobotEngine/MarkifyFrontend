modules["dropdowns/account"] = class {
  html = `
  <button class="accountDrop accountLogout" style="--setBackground: var(--error)" close><div>Logout</div><img src="./images/tooltips/account/logout.svg"></button>
  <button class="accountDrop accountManage" dropdowntitle="Settings" noscrollclose><div>Settings</div><img src="./images/tooltips/account/settings.svg"></button>
  <!--<button class="accountDrop" dropdown="dropdowns/account/preferences"><div>Preferences</div><img src="./images/tooltips/account/preferences.svg"></button>-->
  <div class="accountDropLine"></div>
  <button class="accountDrop" close pwa dropdowntitle="Add Markify as an app on your device!"><div>Get the App</div><img src="./images/tooltips/account/app.svg"></button>
  <button class="accountDrop" report dropdowntitle="Report Bugs & Feedback" noscrollclose><div>Report Bug</div><img src="./images/tooltips/account/report.svg"></button>
  <button class="accountDrop" close whatsnew modaltitle="What's New"><div>What's New</div><img src="./images/tooltips/account/exclamation.svg"></button>
  <button class="accountDrop" tutorial close modaltitle="Resources"><div>Resources</div><img src="./images/tooltips/account/question.svg"></button>
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
  js = async (frame) => {
    frame.style.width = "200px";
    frame.style.minWidth = "100%";
    frame.style.maxWidth = "100%";

    let settingsButton = frame.querySelector(".accountManage");
    settingsButton.addEventListener("click", () => {
      let a = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft;
      let i = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop;
      let g = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth;
      let f = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.documentElement.clientHeight - 22);
      let h = (a < 0) ? window.screen.width + a : a;

      dropdownModule.open(settingsButton, "dropdowns/account/accountManage");
      //window.open("https://exotek.co/account?userid=" + account.account, "exotek_window_prompt", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + 1000 + ", height=" + 650 + ", top=" + parseInt(i + ((f - 650) / 2.5), 10) + ", left=" + parseInt(h + ((g - 1000) / 2), 10));
    });
    frame.querySelector(".accountLogout").addEventListener("click", async () => {
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
    let tutorialButton = frame.querySelector(".accountDrop[tutorial]");
    tutorialButton.addEventListener("click", async () => {
      modalModule.open("modals/resources", tutorialButton, "Resources");
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
    let whatsNew = frame.querySelector(".accountDrop[whatsnew]");
    if (account.currentWhatsNew != null) {
      whatsNew.setAttribute("modal", "modals/updates/" + account.currentWhatsNew);
    } else {
      whatsNew.remove();
    }

    let reportButton = frame.querySelector(".accountDrop[report]");
    reportButton.addEventListener("click", () => {
      dropdownModule.open(reportButton, "dropdowns/account/report");
    });
  }
}

modules["dropdowns/account/accountManage"] = class {
  html = `
  <div class="aManageHolder">
    <div class="aManageAccount">
      <div class="aManageTitle">
        <div title>Account</div>
        <div divider></div>
      </div>
      <div class="aManageCard">
        <div class="aImageHolder">
          <img src="https://cdn.discordapp.com/avatars/373209094581911554/afdcb3f436882f9059a4f0050dae88af.webp?quality=lossless"></img>
        </div>
        <div class="aManageInfoHolder">
          <div class="aManageInfo">
            <div account>Username</div>
            <div email>test@test.com</div>
          </div>
          <button class="largeButton">Manage Account</button>
        </div>
      </div>
    </div>
    <div class="aManageSection">
      <div class="aManageTitle">
        <div title>Preferences</div>
        <div divider></div>
      </div>
      <div class="aManageSetting">
        <div title>Theme</div> 
        <div setting><button class="aManageSettingButton">Light</button></div>
      </div>
      <div class="aManageSetting">
        <div title>Toolbar Side</div> 
        <div setting><button class="aManageSettingButton">Left</button></div>
      </div>
    </div>
    <div class="aManageSection">
      <div class="aManageTitle">
        <div title>Emails</div>
        <div divider></div>
      </div>
      <div class="aManageSetting">
        <div title>Lesson Invites</div> 
        <div setting>
          <div class="aManageSettingToggle">
            <!-- some sort of checkbox goes here to manage the input and animate the checkbox, but I'll leave it static for now -->
            <div slider></div>
          </div>
        </div>
      </div>
      <div class="aManageSetting">
        <div title>Mentions</div> 
        <div setting>
          <div class="aManageSettingToggle">
            <!-- some sort of checkbox goes here to manage the input and animate the checkbox, but I'll leave it static for now -->
            <div slider></div>
          </div>
        </div>
      </div>
      <div class="aManageSetting">
        <div title>Announcements</div> 
        <div setting>
          <div class="aManageSettingToggle">
            <!-- some sort of checkbox goes here to manage the input and animate the checkbox, but I'll leave it static for now -->
            <div slider></div>
          </div>
        </div>
      </div>
      <div class="aManageSetting">
        <div title>Newsletters</div> 
        <div setting>
          <div class="aManageSettingToggle">
            <!-- some sort of checkbox goes here to manage the input and animate the checkbox, but I'll leave it static for now -->
            <div slider></div>
          </div>
        </div>
      </div>
      <div class="aManageRaw"><button><u>Unsubscribe from Marketing</u></button></div>
    </div>
  </div>
  `;
  css = {
    ".aManageHolder": `display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center; padding: 8px; gap: 20px; --setBackground: var(--theme); font-weight: 800; font-size: 18px`,
    ".aManageAccount": `position: sticky; box-sizing: border-box; width: 100%; left: 0px; z-index: 2;`,
    ".aManageTitle": `display: flex; gap: 8px; align-items: center`,
    ".aManageTitle div[title]": `color: var(--secondary);`,
    ".aManageTitle div[divider]": `flex: 1; height: 4px; background: var(--hover); border-radius: 2px`,
    ".aManageCard": `display: flex; padding: 12px; margin: 8px; gap: 8px; background: #fff; border-radius: 12px; box-shadow: var(--darkShadow); text-align: center;`,
    ".aImageHolder": `border-radius: 60px; width: 120px; height: 120px; `,
    ".aImageHolder img": `border-radius: 60px; width: 120px; height: 120px; box-sizing: border-box; border: 6px solid #fff; box-shadow: var(--darkShadow);`,
    ".aManageInfoHolder": `display: flex; flex-direction: column; flex-wrap: wrap; flex: 1; width: 212; height: 120px`,
    ".aManageInfo": `margin-top: 3px`,
    ".aManageInfo div[account]": `color: #000; font-size: 22px; font-weight: 800`,
    ".aManageInfo div[email]": `color: #48A7FF; font-size: 16px; font-weight: 600; margin-top: 3px`,
    ".aManageInfoHolder button": `padding: 6px 10px; background-color: #0084FF26; --borderRadius: 14px; margin-top: auto`,
    ".aManageSection": `display: flex; flex-direction: column; gap: 8px;`, 
    ".aManageSetting": `display: flex; padding: 6px 6px 6px 10px; background: #fff; border-radius: 12px 22px 22px 12px; box-shadow: var(--darkShadow); text-align: center; align-items: center`,
    ".aManageSetting div[setting]": "margin-left: auto;",
    ".aManageSettingButton": `background-color: #48A7FF; color: #FFF; font-size: 16px; font-weight: 800; padding: 6px 10px; border-radius: 18px`,
    ".aManageSettingToggle": `background-color: #48A7FF; border-radius: 18px; height: 32px; width: 54px; display: flex; flex-direction: column; justify-content: center;`,
    ".aManageSettingToggle div[slider]": `background-color: #FFF; border-radius: 50%; height: 26px; width: 26px; align-self: flex-end; margin-right: 3px`,
    ".aManageRaw button": `color: #48A7FF; font-size: 20px; font-weight: 600`,
  };
  js = async (frame) => {
    frame.setAttribute("noscrollclose", "");
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
    ".aReportTypeButton:hover": `--borderWidth: 6px; background: linear-gradient(to bottom right, rgba(var(--rgbTheme), .3), var(--pageColor))`,
    ".aReportTypeButton div[circle]": `width: 20px; height: 20px; margin: 0 10px 0 6px; border: solid 3px var(--themeColor); border-radius: 20px`,
    ".aReportTypeButton div[circle] div": `width: 14px; height: 14px; margin: 3px; border-radius: 7px; transform: scale(0); transition: .3s`,
    ".aReportTypeButton[selected] div[circle] div": `transform: scale(1); background: var(--themeColor)`,
    ".aReportTypeButton div[context]": `flex: 1`,
    ".aReportTypeButton div[context] div[title]": `font-weight: 700; font-size: 18px`,
    ".aReportTypeButton div[context] div[text]": `font-weight: 500; font-size: 14px`,

    ".aReportDescHolder": `display: flex; max-width: calc(100% - 16px); margin: 8px; flex-direction: column; align-items: center`,
    ".aReportDescHolder textarea": `flex: 1; padding: 8px; width: 250px; max-width: calc(100% - 22px); min-height: 140px; border: solid 3px var(--hover); border-radius: 16px; outline: none; resize: none; font-family: var(--font); font-size: 15px`,
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
