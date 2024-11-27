modules["dropdowns/account/report"] = {
  html: `
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
  `,
  css: {
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
  },
  js: async function (frame) {
    frame.setAttribute("noscrollclose", "");
    let alertModule = await getModule("alert");
    let dropdownModule = await getModule("dropdown");

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