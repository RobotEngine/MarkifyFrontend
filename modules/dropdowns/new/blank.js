modules["dropdowns/new/blank"] = {
  html: `
  <div class="blackCreationHolder">
    <div class="blankSizeHolder" selection>
      <div class="blankTitle">Document Size</div>
      <button><div class="blankSizeTitle">A5</div><div class="blankSizeInfo">5.8" x 8.3"</div></button>
      <button selected><div class="blankSizeTitle">A4</div><div class="blankSizeInfo">8.3" x 11.7"</div></button>
      <button><div class="blankSizeTitle">A3</div><div class="blankSizeInfo">11.7" x 16.5"</div></button>
      <button><div class="blankSizeTitle">B5</div><div class="blankSizeInfo">6.9" x 9.8"</div></button>
      <button><div class="blankSizeTitle">B4</div><div class="blankSizeInfo">9.8" x 13.9"</div></button>
      <button><div class="blankSizeTitle">B3</div><div class="blankSizeInfo">13.9" x 19.7"</div></button>
      <button><div class="blankSizeTitle">Letter</div><div class="blankSizeInfo">8.5" x 11"</div></button>
      <button><div class="blankSizeTitle">16:9</div><div class="blankSizeInfo">5.625" x 10"</div></button>
      <button><div class="blankSizeTitle">4:3</div><div class="blankSizeInfo">7.5" x 10"</div></button>
      <button><div class="blankSizeTitle">Custom</div></button>
    </div>
    <div class="blankOptionHolder">
      <div class="blankCustomSizeHolder">
        <div class="blankTitle">Page Size</div>
        <div class="blankNumberHolder"><b>Width</b><div default="8.3" max="50" contenteditable>8.3</div>in</div>
        <div class="blankNumberHolder"><b>Height</b><div default="11.7" max="50" contenteditable>11.7</div>in</div>
      </div>
      <div class="blankTitle">Orientation</div>
      <div class="blankSelection" selection>
        <button selected>Portrait</button>
        <button>Landscape</button>
      </div>
      <div class="blankTitle">Page Amount</div>
      <div class="blankNumberHolder"><div default="1" max="500" nodecimal contenteditable>1</div> pages</div>
      <button class="blankCreate largeButton" close>Create Lesson</button>
    </div>
  </div>
  `,
  css: {
    ".blackCreationHolder": `display: flex; flex-wrap: wrap; gap: 8px; justify-content: center`,
    ".blankTitle": `width: calc(100% - 12px); margin: 6px; font-size: 18px; font-weight: 500; text-align: left`,
    ".blankSizeHolder": `display: flex; flex-wrap: wrap; width: 224px; max-width: 100%`,
    ".blankSizeHolder button": `box-sizing: border-box; display: flex; flex-direction: column; height: 60px; padding: 6px; margin: 6px; flex: 1 1 100px; justify-content: center; align-items: center; outline: solid 3px var(--secondary); border-radius: 12px`,
    ".blankSizeHolder button .blankSizeTitle": `color: var(--theme); font-size: 18px; font-weight: 600`,
    ".blankSizeHolder button .blankSizeInfo": `color: var(--darkGray); font-size: 15px; font-weight: 500`,
    ".blankSizeHolder button:hover": `outline: solid 3px var(--hover)`,
    ".blackCreationHolder button[selected]": `outline: solid 3px var(--theme); background: var(--hover)`,
    ".blankOptionHolder": `display: flex; flex-direction: column; width: 224px; max-width: 100%; align-items: center`,
    ".blankCustomSizeHolder": `display: none; width: 100%`,
    ".blankCustomSizeHolder .blankNumberHolder": `box-sizing: border-box; padding: 0 24px`,
    ".blankSelection": `display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 14px; justify-content: center`,
    ".blankSelection button": `box-sizing: border-box; display: flex; flex-direction: column; padding: 6px 10px; margin: 6px; justify-content: center; align-items: center; outline: solid 3px var(--secondary); border-radius: 16px; color: var(--theme); font-size: 16px; font-weight: 600`,
    ".blankSelection button:hover:not([selected])": `outline: solid 3px var(--hover)`,
    ".blankNumberHolder": `display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 14px; justify-content: center; align-items: center`,
    ".blankNumberHolder b": `margin-right: auto`,
    ".blankOptionHolder div[contenteditable]": `width: fit-content; max-width: 60px; padding: 4px 6px; margin: 6px 10px; outline: solid 3px var(--secondary); border-radius: 16px; color: var(--theme); font-size: 20px; font-weight: 600; white-space: nowrap; overflow: hidden; transition: .2s`,
    ".blankCreate": `margin: auto 0 22px 0; background: var(--theme); border-radius: 18px; color: #fff`
  },
  js: function (frame) {
    let frameCreationHolder = frame.querySelector(".blackCreationHolder");
    let customSizeHolder = frame.querySelector(".blankCustomSizeHolder");
    frameCreationHolder.addEventListener("click", function (event) {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest("button");
      if (element == null || element.parentElement.hasAttribute("selection") == false) {
        return;
      }
      let lastSelected = element.parentElement.querySelector("button[selected]");
      if (lastSelected) {
        lastSelected.removeAttribute("selected");
      }
      element.setAttribute("selected", "");
      let title = element.querySelector(".blankSizeTitle");
      if (title) {
        if (title.textContent == "Custom") {
          customSizeHolder.style.display = "block";
        } else {
          customSizeHolder.style.display = "none";
        }
      }
    });
    frameCreationHolder.addEventListener("mousedown", function (event) {
      let textBox = event.target.closest(".blankNumberHolder div");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
    });
    async function textBoxError(box, error) {
      (await getModule("alert")).open("error", "<b>Invalid Input</b>" + error);

      box.style.outlineColor = "var(--error)";
      box.style.color = "var(--error)";
      await sleep(200);
      box.style.outlineColor = "var(--secondary)";
      box.style.color = "var(--theme)";
    }
    frameCreationHolder.addEventListener("keydown", function (event) {
      let textBox = event.target.closest(".blankNumberHolder div");
      if (textBox == null) {
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) || event.key.length == 1) {
        let textInt = parseFloat(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key && (event.keyCode != 190 || textBox.hasAttribute("nodecimal"))) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > parseFloat(textBox.getAttribute("max"))) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than " + textBox.getAttribute("max"));
        } else if (textInt < 1) {
          event.preventDefault();
          textBoxError(textBox, "Must be greater than 1");
        }
      }
    });
    frameCreationHolder.addEventListener("focusout", function (event) {
      let textBox = event.target.closest(".blankNumberHolder div");
      if (textBox == null) {
        return;
      }
      let textInt = parseFloat(textBox.textContent) || 0;
      if (textInt > parseFloat(textBox.getAttribute("max"))) {
        textBox.textContent = textBox.getAttribute("max");
      } else if (textInt < 1) {
        textBox.textContent = 1;
      }
    });
    frame.querySelector(".blankCreate").addEventListener("click", async function (event) {
      // Create the doc!
      // (await getModule("alert")).open("worked", "<b>Creating Lesson</b>Your lesson is being created. One momment please.");
    });
  }
}