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
      <button class="largeButton">Continue</button>
      <div class="jPromo">Create your own lesson at <a href="${location.origin}#dashboard" target="_blank">${location.host}</a></div>
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
    ".jInputHolder": `display: flex; flex-wrap: wrap; margin-top: 16px; justify-content: center; align-items: center`,
    ".jInputPart": `display: flex; flex-wrap: wrap; margin: 12px; justify-content: center`,
    ".jInputHolder input": "width: 50px; height: 50px; border: hidden; outline: solid 4px var(--hover); border-radius: 0px; color: var(--theme); font-size: 34px; font-weight: 800; font-family: var(--font); text-align: center",
    ".jInputHolder input::placeholder": `color: var(--gray); font-weight: 600; opacity: 1`,
    ".jInputHolder input:first-child": "border-radius: 12px 0 0 12px",
    ".jInputHolder input:last-child": "border-radius: 0 12px 12px 0",
    ".jModal .largeButton": `margin: 16px 0; background: var(--theme); border-radius: 18.25px; color: #fff`,
    ".jPromo": `margin-top: 24px`,
    ".jPromo a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    ".jPolicies": `display: flex; flex-wrap: wrap; width: 100%; max-width: 200px; margin-top: 6px; justify-content: space-around`,
    ".jPolicies a": `padding: 4px 8px; margin: 4px; border-radius: 15px; color: var(--textColor); font-weight: 600; text-decoration: none`,
    ".jPolicies a:hover": `transform: scale(1.1); background: var(--theme); color: #fff`,
    ".jPolicies a:active": `transform: scale(.95)`,

    ".jInputDot": `width: 12px; height: 12px; background: var(--hover); border-radius: 12px`,
  },
  js: async function (page) {
    let joinTxBoxes = page.querySelectorAll("input");
    let joinButton = page.querySelector(".jModal .largeButton");
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
              joinButton.focus();
              break;
            }
            correctBox.value = repairLength[r];
            correctBox.focus();
          }
        } else {
          textBox.value = text;
          if (joinTxBoxes[numBox + 1]) {
            joinTxBoxes[numBox + 1].focus();
          } else {
            joinButton.focus();
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
    (async function () {
      await sleep(1);
      joinTxBoxes[0].focus();
    })();
  }
}