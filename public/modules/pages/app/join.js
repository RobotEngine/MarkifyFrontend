modules["pages/app/join"] = class {
  title = "Join";
  preload = [
    "../modules/pages/app/lesson.js",
    "../modules/pages/app/dashboard.js"
  ];
  html = `<div class="jBackdrop">
    <div class="jBackground"></div>
    <img class="jSplash" src="../images/join/splash.svg">
  </div>
  <div class="jModalHolder">
    <div class="jModalContainer">
      <img class="jBack" src="../images/icon.svg">
      <div class="jModal">
        <a class="jLogo" href="/launch"><img src="../images/logo.svg"></a>
        <div class="jTitle">Join the Lesson!</div>
        <div class="jTitleDesc">Enter a pin to join</div>
        <div class="jInputHolder">
          <div class="jInputPart">
            <div><input placeholder="0"></input></div>
            <div><input placeholder="0"></input></div>
            <div><input placeholder="0"></input></div>
          </div>
          <div class="jInputDot"></div>
          <div class="jInputPart">
            <div><input placeholder="0"></input></div>
            <div><input placeholder="0"></input></div>
            <div><input placeholder="0"></input></div>
          </div>
        </div>
        <button class="largeButton border" continue>Continue</button>
        <div class="jUserInfo">
          <div class="jNameInput"><input placeholder="Screen Name"></input></div>
          <div class="jAuthHolder">
            <img src="../images/profiles/default.svg" profile accountimage>
            <span accountuser>Robot Engine</span>
            <button class="buttonAnim border" title="Logout and switch account."></button>
          </div>
        </div>
        <button class="largeButton border" join>Join Lesson</button>
        <div class="jPromo">Create your lesson at <a href="/launch" target="_blank">${location.host}</a></div>
        <div class="jPolicies">
          <a href="../tos" target="_blank">Terms</a>
          <a href="../privacy" target="_blank">Privacy</a>
        </div>
        <div class="jCaptchaHolder" hidden>
          <div class="jCFTurnstile"></div>
        </div>
      </div>
    </div>
  </div>
  `;
  css = {
    ".jBackdrop": `position: fixed; min-width: 100%; min-height: 100vh; z-index: 0; background: #fff`,
    ".jBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: url(../images/editor/backdrop.svg); background-size: 25px; background-position: center; opacity: .075`,
    ".jSplash": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover`,
    
    ".jModalHolder": `display: flex; width: 100%; min-height: 100vh; left: 0px; top: 0px; justify-content: center; align-items: center; overflow: hidden`,
    ".jModalContainer": `position: relative`,
    ".jModal": `position: relative; display: flex; flex-direction: column; width: fit-content; max-width: 100%; height: fit-content; padding: 16px; margin: 8px; overflow: hidden; background: var(--pageColor); transform: scale(.9); opacity: 0; align-items: center; border-radius: 16px; box-shadow: var(--lightShadow); transition: .3s`,
    ".jBack": `position: absolute; width: 150%; left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: .1`,

    ".jLogo": `max-width: 100%; height: 60px`,
    ".jLogo img": `max-width: 100%; height: 100%`,
    ".jTitle": `margin-top: 20px; color: var(--secondary); font-size: 24px; font-weight: 600`,
    
    ".jModal input::placeholder": `color: var(--gray); font-weight: 600; opacity: 1`,

    ".jInputHolder": `display: flex; flex-wrap: wrap; margin-top: 16px; justify-content: center; align-items: center; --themeColor: var(--hover); --fontColor: var(--theme)`,
    ".jInputPart": `display: flex; flex-wrap: wrap; margin: 12px; justify-content: center`,
    ".jInputPart div": "display: flex; width: 58px; height: 58px; justify-content: center; align-items: center",
    ".jInputHolder input": "width: 50px; height: 50px; padding: 2px; background: unset; outline: unset; border: solid 4px var(--themeColor); border-radius: 0px; color: var(--fontColor); font-size: 34px; font-weight: 800; font-family: var(--font); text-align: center; transition: .3s, border-width .1s",
    ".jInputPart input:focus": `border-color: var(--theme); border-width: 8px; border-radius: 16px !important; z-index: 1`,
    ".jInputPart div:first-child input": "border-radius: 16px 0 0 16px",
    ".jInputPart div:last-child input": "border-radius: 0 16px 16px 0",
    ".jInputDot": `width: 12px; height: 12px; background: var(--themeColor); border-radius: 12px; transition: .3s`,
    
    ".jModal .largeButton": `margin: 16px 0; background: var(--theme); --borderColor: var(--secondary); --borderRadius: 20px; color: #fff`,
    
    ".jNameInput": `display: none; height: 94px; justify-content: center; align-items: center`,
    ".jNameInput input": `width: calc(100% - 60px); max-width: 300px; height: 40px; padding: 3px 6px; margin: 24px; background: unset; outline: unset; border: solid 4px var(--hover); border-radius: 12px; color: var(--secondary); font-size: 24px; font-weight: 700; font-family: var(--font); text-align: center; transition: .1s`,
    ".jNameInput input:focus": `border: solid 6px var(--secondary)`,
    ".jUserInfo .jAuthHolder": `display: none; padding: 6px 12px 6px 6px; margin: 24px; justify-content: center; align-items: center; border: solid 4px var(--hover); border-radius: 30px`,
    ".jUserInfo .jAuthHolder img[profile]": `width: 40px; height: 40px; object-fit: cover; border-radius: 20px`,
    ".jUserInfo .jAuthHolder span": `margin-left: 6px; color: var(--secondary); font-size: 20px; font-weight: 600`,
    ".jUserInfo .jAuthHolder button": `position: relative; width: 22px; height: 22px; margin: 0 3px 0 12px; --borderWidth: 3px; --borderRadius: 14px`,
    ".jUserInfo .jAuthHolder button svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    
    ".jModal .largeButton[join]": `display: none; margin: 12px 0`,

    ".jPromo": `margin-top: 24px`,
    ".jPromo a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    
    ".jPolicies": `display: flex; flex-wrap: wrap; width: 100%; max-width: 200px; margin-top: 6px; justify-content: space-around`,
    ".jPolicies a": `padding: 4px 8px; margin: 4px; border-radius: 15px; color: var(--textColor); font-weight: 600; text-decoration: none`,
    ".jPolicies a:hover": `transform: scale(1.1); background: var(--theme); color: #fff`,
    ".jPolicies a:active": `transform: scale(.95)`,

    ".jCaptchaHolder": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; background: rgba(var(--background), .6); backdrop-filter: blur(6px); justify-content: center; align-items: center; transition: .4s`,
    //".jCaptchaHolder[hidden]": `display: none`
    //".jCFTurnstile": ``
  };
  js = async (page) => {
    let code = getParam("pin") ?? "";
    let lessonID = getParam("lesson") ?? "";
    let name = getParam("name");

    //modifyParams("lesson");

    let modal = page.querySelector(".jModal");
    let inputHolder = modal.querySelector(".jInputHolder");
    let joinTxBoxes = inputHolder.querySelectorAll("input");
    let continueButton = modal.querySelector(".jModal .largeButton[continue]");
    let joinNickname = modal.querySelector(".jNameInput input");
    let joinAccount = modal.querySelector(".jUserInfo .jAuthHolder");
    let joinButton = modal.querySelector(".jModal .largeButton[join]");

    let captchaHolder = modal.querySelector(".jCaptchaHolder");
    let cfTurnstile = captchaHolder.querySelector(".jCFTurnstile");

    page.querySelector(".jLogo").addEventListener("click", (event) => {
      setFrame("pages/launch");
      event.preventDefault();
    });

    for (let i = 0; i < joinTxBoxes.length; i++) {
      let numBox = i;
      let textBox = joinTxBoxes[numBox];
      textBox.addEventListener("focus", () => {
        textBox.setAttribute("prev", textBox.value);
        if (textBox.value != "") {
          textBox.setAttribute("placeholder", textBox.value);
        }
        textBox.value = "";
      });
      textBox.addEventListener("blur", () => {
        if (textBox.value == "") {
          textBox.value = textBox.getAttribute("prev") ?? "";
        }
      });
      textBox.addEventListener("input", () => {
        let text = textBox.value.toUpperCase();
        if (text.length > 1) {
          let repairLength = text.split("");
          textBox.value = repairLength[0];
          for (let r = 1; r < repairLength.length; r++) {
            let correctBox = joinTxBoxes[numBox + r];
            if (correctBox == null) {
              processContinue();
              break;
            }
            correctBox.value = repairLength[r];
            correctBox.focus();
            if (numBox + r + 2 > repairLength.length) {
              processContinue();
              break;
            }
          }
        } else {
          textBox.value = text;
          if (joinTxBoxes[numBox + 1] != null) {
            joinTxBoxes[numBox + 1].focus();
          } else {
            processContinue();
          }
        }
      });
      textBox.addEventListener("keydown", (event) => {
        if (event.keyCode == 8) {
          textBox.removeAttribute("prev");
        }
        if (event.keyCode == 8 || event.keyCode == 37) { // Backspace of left arrow
          if (joinTxBoxes[numBox - 1] != null) {
            joinTxBoxes[numBox - 1].focus();
          }
        } else if (event.keyCode == 39) { // Right arrow
          if (joinTxBoxes[numBox + 1] != null) {
            joinTxBoxes[numBox + 1].focus();
          }
        }
      });
    }

    let getPin = () => {
      let pin = "";
      for (let i = 0; i < joinTxBoxes.length; i++) {
        let textBox = joinTxBoxes[i];
        if (textBox.value.length > 0) {
          pin += textBox.value;
        } else {
          pin += textBox.getAttribute("prev") ?? "";
        }
      }
      modifyParams("pin", pin);
      return pin;
    }
    let lesson = {};
    let processContinue = async (event) => {
      continueButton.focus();

      let pin = getPin();
      if (pin.length < 6) {
        if (event != null) {
          alertModule.open("error", "<b>Invalid Pin</b>You must enter a 6-digit pin to join a lesson.");
        }
        return;
      }
      inputHolder.setAttribute("disabled", "");
      continueButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("GET", "lessons/share/pin/check?pin=" + pin, null, { allowError: [403] });
      inputHolder.removeAttribute("disabled");
      if (code == 200) {
        body.pin = pin;
        secondStepInit(body);
        return;
      } else if (code == 404) {
        (async () => {
          inputHolder.style.setProperty("--themeColor", "var(--error)");
          inputHolder.style.setProperty("--fontColor", "var(--error)");
          await sleep(300);
          inputHolder.style.setProperty("--themeColor", "var(--hover)");
          inputHolder.style.setProperty("--fontColor", "var(--theme)");
        })();
      }
      continueButton.removeAttribute("disabled");
    }
    let secondStepInit = (body) => {
      if (body.skip == true){
        return setFrame("pages/app/lesson", null, { passParams: true, params: { lesson: body.id } });
      }
      continueButton.style.display = "none";
      if (body.forceLogin != true) {
        if (body.name != null) {
          joinNickname.value = body.name;
        }
        joinNickname.parentElement.style.display = "flex";
        joinNickname.focus();
        joinAccount.style.display = "none";
      } else {
        if (userID == null) {
          promptLogin(null, body.authService);
          return false;
        }
        if (account.image) {
          joinAccount.querySelector("img").src = account.image;
        }
        joinAccount.querySelector("span").textContent = account.user;
        let switchAccountButton = joinAccount.querySelector("button");
        switchAccountButton.addEventListener("click", async () => {
          joinAccount.setAttribute("disabled", "");
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
        setSVG(switchAccountButton, "../images/tooltips/close.svg");
        joinAccount.style.display = "flex";
        joinNickname.parentElement.style.display = "none";
      }
      joinButton.style.display = "unset";
      lesson = body;
    }
    continueButton.addEventListener("click", processContinue);

    let captcha;
    let tryingToJoin;
    let needsInteractive = false;
    let processJoin = async () => {
      let transferData = { pin: lesson.pin };
      if (lesson.forceLogin != true) {
        let nickname = joinNickname.value;
        if (nickname.length < 1) {
          alertModule.open("error", "<b>Invalid Screen Name</b>The screen name can't be empty.");
          return;
        } else if (nickname.length > 30) {
          alertModule.open("error", "<b>Invalid Screen Name</b>The screen name must be under 30 characters.");
          return;
        } else if (nickname.replace(/[^A-Za-z0-9_\- ]/g, "") != nickname) {
          alertModule.open("error", "<b>Invalid Screen Name</b>The screen name can only include letters, numbers, and spaces.");
          return;
        }
        setLocalStore("nickname", nickname);
        transferData.name = nickname;
        if (userID == null) {
          if (captcha == null) {
            joinButton.setAttribute("disabled", "");
            if (needsInteractive != true) {
              alertModule.close(tryingToJoin);
              tryingToJoin = await alertModule.open("info", "<b>Hold On</b>Verifying your device...");
            } else {
              alertModule.close(tryingToJoin);
              tryingToJoin = await alertModule.open("info", "<b>Hold Up</b>We need to verify you're not a robot.");
              captchaHolder.removeAttribute("hidden");
            }
            return;
          }
          transferData.captcha = captcha;
        }
      }
      setFrame("pages/app/lesson", null, { ...transferData, passParams: true, params: { lesson: lesson.id } });
    }
    joinButton.addEventListener("click", processJoin);
    joinNickname.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        processJoin();
      }
    });

    let loadTurnstile = () => {
      turnstile.render(cfTurnstile, {
        "sitekey": "0x4AAAAAABahopZOZ1FRoqHp", //2x00000000000000000000BB
        "theme": getTheme(),
        "callback": (token) => {
          captcha = token;
          needsInteractive = false;
          joinButton.removeAttribute("disabled");
          if (tryingToJoin != null || captchaHolder.hasAttribute("hidden") == false) {
            alertModule.close(tryingToJoin);
            tryingToJoin = null;
            processJoin();
          }
        },
        "before-interactive-callback": async () => {
          needsInteractive = true;
          if (tryingToJoin == null) {
            return;
          }
          alertModule.close(tryingToJoin);
          tryingToJoin = await alertModule.open("info", "<b>Hold Up</b>We need to verify you're not a robot.");
          captchaHolder.removeAttribute("hidden");
        },
        "error-callback": () => {
          captcha = null;
          joinButton.removeAttribute("disabled");
          if (tryingToJoin != null) {
            alertModule.close(tryingToJoin);
            tryingToJoin = null;
            alertModule.open("error", "<b>Challenge Failed</b>Unable to verify your device, please try again later...");
          }
        }
      });
    }
    if (userID == null) {
      if (window.turnstile == null) {
        window.onloadTurnstileCallback = loadTurnstile;
        loadScript("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback");
      } else {
        loadTurnstile();
      }
    }

    let prevNickname = getLocalStore("nickname");
    if (prevNickname && prevNickname.length > 0) {
      joinNickname.value = prevNickname;
    } else if (account.user) {
      joinNickname.value = account.user;
    }

    if (lessonID != null && lessonID.length == 24) {
      let [code, body] = await sendRequest("GET", "lessons/share/link/check?lesson=" + lessonID, null, { allowError: [403] });
      if (code == 200) {
        if (body.id) {
          // Valid LINK
          page.querySelector(".jTitleDesc").textContent = "Enter a name to join";
          inputHolder.style.display = "none";
          if (name != null) {
            body.name = name;
          }
          secondStepInit(body);
        }
      }
    }

    (async () => {
      await sleep(1);
      modal.style.transform = "scale(1)";
      modal.style.opacity = 1;
      if (code.length > 0) {
        for (let i = 0; i < code.length; i++) {
          joinTxBoxes[i].value = code[i];
          if (joinTxBoxes[i + 1]) {
            joinTxBoxes[i + 1].focus();
          } else {
            processContinue();
          }
        }
      } else {
        joinTxBoxes[0].focus();
      }
    })();
  }
}