modules["pages/join"] = {
  title: "Join",
  html: `<div class="jBackdrop">
    <img class="jSplash" src="./images/join/splash.svg">
  </div>
  <div class="jModalHolder">
    <div class="jModal">
      <img class="jLogo" src="./images/logo.svg">
      <div class="jTitle">Join the Lesson!</div>
      <div>Enter a pin to join</div>
      <div class="jInputHolder">
        <div class="jInputPart">
          <input placeholder="1"></input>
          <input placeholder="2"></input>
          <input placeholder="3"></input>
        </div>
        <div class="jInputDot"></div>
        <div class="jInputPart">
          <input placeholder="4"></input>
          <input placeholder="5"></input>
          <input placeholder="6"></input>
        </div>
      </div>
      <button class="largeButton" continue>Continue</button>
      <div class="jUserInfo">
        <input placeholder="Nickname"></input>
        <div>
          <img src="./images/profiles/default.svg" profile>
          <span>Robot Engine</span>
          <button class="buttonAnim"><img src="./images/tooltips/close.svg"></button>
        </div>
      </div>
      <button class="largeButton" join>Join Lesson</button>
      <div class="jPromo">Create your lesson at <a href="${location.origin}#dashboard" target="_blank">${location.host}</a></div>
      <div class="jPolicies">
        <a href="https://exotek.co/tos" target="_blank">Terms</a>
        <a href="https://exotek.co/privacy" target="_blank">Privacy</a>
      </div>
    </div>
  </div>
  `,
  css: {
    ".jBackdrop": `position: fixed; min-width: 100%; min-height: 100vh; z-index: 0; background: var(--pageColor); background-image: url(./images/editor/background.svg); background-position: center`,
    ".jSplash": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; opacity: .8`,
    
    ".jModalHolder": `display: flex; width: 100%; min-height: 100vh; left: 0px; top: 0px; justify-content: center; align-items: center`,
    ".jModal": `position: relative; display: flex; flex-direction: column; width: fit-content; max-width: 100%; height: fit-content; padding: 16px; margin: 8px; background: var(--pageColor); align-items: center; border-radius: 16px; box-shadow: var(--lightShadow)`,
    
    ".jLogo": `max-width: 100%; height: 60px`,
    ".jTitle": `margin-top: 20px; color: var(--secondary); font-size: 24px; font-weight: 600`,
    
    ".jModal input::placeholder": `color: var(--gray); font-weight: 600; opacity: 1`,

    ".jInputHolder": `display: flex; flex-wrap: wrap; margin-top: 16px; justify-content: center; align-items: center; --themeColor: var(--hover); --fontColor: var(--theme)`,
    ".jInputPart": `display: flex; flex-wrap: wrap; margin: 12px; justify-content: center`,
    ".jInputHolder input": "width: 50px; height: 50px; border: hidden; outline: solid 4px var(--themeColor); border-radius: 0px; color: var(--fontColor); font-size: 34px; font-weight: 800; font-family: var(--font); text-align: center; transition: .3s",
    ".jInputHolder input:first-child": "border-radius: 12px 0 0 12px",
    ".jInputHolder input:last-child": "border-radius: 0 12px 12px 0",
    ".jInputDot": `width: 12px; height: 12px; background: var(--themeColor); border-radius: 12px; transition: .3s`,
    
    ".jModal .largeButton": `margin: 16px 0; background: var(--theme); border-radius: 18.25px; color: #fff`,
    
    ".jUserInfo input": `display: none; width: 300px; height: 40px; padding: 3px 6px; margin: 24px; border: hidden; outline: solid 4px var(--hover); border-radius: 12px; color: var(--secondary); font-size: 24px; font-weight: 700; font-family: var(--font); text-align: center`,
    ".jUserInfo div": `display: none; padding: 6px 12px 6px 6px; margin: 24px; justify-content: center; align-items: center; outline: solid 4px var(--hover); border-radius: 26px;`,
    ".jUserInfo div img[profile]": `width: 40px; height: 40px; object-fit: cover; border-radius: 20px`,
    ".jUserInfo div span": `margin-left: 6px; color: var(--secondary); font-size: 22px; font-weight: 600`,
    ".jUserInfo div button": `position: relative; width: 22px; height: 22px; margin: 0 3px 0 12px; outline: solid 3px var(--secondary); border-radius: 14px`,
    ".jUserInfo div button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".largeButton[join]": `display: none; margin: 12px 0`,

    ".jPromo": `margin-top: 24px`,
    ".jPromo a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    
    ".jPolicies": `display: flex; flex-wrap: wrap; width: 100%; max-width: 200px; margin-top: 6px; justify-content: space-around`,
    ".jPolicies a": `padding: 4px 8px; margin: 4px; border-radius: 15px; color: var(--textColor); font-weight: 600; text-decoration: none`,
    ".jPolicies a:hover": `transform: scale(1.1); background: var(--theme); color: #fff`,
    ".jPolicies a:active": `transform: scale(.95)`
  },
  js: async function (page) {
    let inputHolder = page.querySelector(".jInputHolder");
    let joinTxBoxes = inputHolder.querySelectorAll("input");
    let continueButton = page.querySelector(".jModal .largeButton[continue]");
    let joinNickname = page.querySelector(".jUserInfo input");
    let joinAccount = page.querySelector(".jUserInfo");
    let joinButton = page.querySelector(".jModal .largeButton[join]");
    for (let i = 0; i < joinTxBoxes.length; i++) {
      let numBox = i;
      let textBox = joinTxBoxes[numBox];
      textBox.addEventListener("focus", function() {
        textBox.setAttribute("prev", textBox.value);
        if (textBox.value != "") {
          textBox.setAttribute("placeholder", textBox.value);
        }
        textBox.value = "";
      });
      textBox.addEventListener("blur", function() {
        if (textBox.value == "") {
          textBox.value = textBox.getAttribute("prev") || "";
        }
      });
      textBox.addEventListener("input", function(e) {
        let text = textBox.value.toUpperCase();
        if (text.length > 1) {
          let repairLength = text.split("");
          textBox.value = repairLength[0];
          for (let r = 1; r < repairLength.length; r++) {
            let correctBox = joinTxBoxes[numBox + r];
            if (correctBox == null) {
              continueButton.focus();
              processContinue();
              break;
            }
            correctBox.value = repairLength[r];
            correctBox.focus();
            if (numBox + r + 2 > repairLength.length) {
              continueButton.focus();
              processContinue();
              break;
            }
          }
        } else {
          textBox.value = text;
          if (joinTxBoxes[numBox + 1]) {
            joinTxBoxes[numBox + 1].focus();
          } else {
            continueButton.focus();
            processContinue();
          }
        }
      });
      textBox.addEventListener("keydown", function(e) {
        if (e.keyCode == 8) {
          textBox.removeAttribute("prev");
        }
        if (e.keyCode == 8 || e.keyCode == 37) { // Backspace of left arrow
          if (joinTxBoxes[numBox - 1]) {
            joinTxBoxes[numBox - 1].focus();
          }
        } else if (e.keyCode == 39) { // Right arrow
          if (joinTxBoxes[numBox + 1]) {
            joinTxBoxes[numBox + 1].focus();
          }
        }
      });
    }
    function getPin() {
      let pin = "";
      for (let i = 0; i < joinTxBoxes.length; i++) {
        let textBox = joinTxBoxes[i];
        if (textBox.value.length > 0) {
          pin += textBox.value;
        } else {
          pin += textBox.getAttribute("prev") || "";
        }
      }
      return pin;
    }
    let alert = await getModule("alert");
    async function processContinue(e) {
      let pin = getPin();
      if (pin.length < 6) {
        if (e) {
          alert.open("error", "<b>Invalid Pin</b>You must enter a 6-digit pin to join a lesson.");
        }
        return;
      }
      inputHolder.setAttribute("disabled", "");
      continueButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("GET", "lessons/share/pin/check?pin=" + pin);
      inputHolder.removeAttribute("disabled");
      if (code == 200) {
        continueButton.style.display = "none";
        if (body.forceLogin != true) {
          joinNickname.style.display = "unset";
        } else {
          joinAccount.style.display = "flex";
        }
        joinButton.style.display = "unset";
        return;
      } else if (code == 404) {
        (async function () {
          inputHolder.style.setProperty("--themeColor", "var(--error)");
          inputHolder.style.setProperty("--fontColor", "var(--error)");
          await sleep(300);
          inputHolder.style.setProperty("--themeColor", "var(--hover)");
          inputHolder.style.setProperty("--fontColor", "var(--theme)");
        })();
      }
      continueButton.removeAttribute("disabled");
    }
    continueButton.addEventListener("click", processContinue);
    (async function () {
      await sleep(1);
      joinTxBoxes[0].focus();
    })();
  }
}