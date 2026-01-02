modules["modals/lesson/newboard"] = class {
  html = `<input type="file" accept="application/pdf" multiple="true" hidden="true">
  <div class="lessonCreationHolder">
    <div class="lessonBlankHolder">
      <button class="lessonBlank border" style="--themeColor: var(--gray)" title="Create a fresh blank page."><div image></div><div text>Blank Page</div></button>
      <button class="lessonFreeboard border" style="--themeColor: var(--purple)" title="Create an unlimited canvas for whiteboarding."><div image></div><div text>Freeboard</div></button>
    </div>
    <button class="lessonUpload border" style="--themeColor: var(--secondary)" title="Upload an existing PDF to markup."><div image></div><div text>Upload PDF</div></button>
  </div>`;
  css = {
    ".lessonCreationHolder": `display: flex; flex-wrap: wrap; max-width: 426px`,
    ".lessonCreationHolder button": `display: flex; flex-direction: column; max-width: 100%; padding: 8px; margin: 11px; --borderWidth: 3px; --borderColor: var(--themeColor); --borderRadius: 12px; align-items: center; justify-content: space-around; color: var(--darkGray); font-size: 16px; font-weight: 600`,
    ".lessonCreationHolder button:hover": `background: var(--themeColor); color: #fff; transform: scale(1.05)`,
    ".lessonCreationHolder button:hover div[image]": `filter: brightness(0) invert(1)`,
    ".lessonCreationHolder button:active": `transform: scale(.95)`,
    ".lessonBlankHolder": `flex: 1 1 131px`,
    ".lessonBlankHolder button": `width: calc(100% - 22px); height: 120px`,
    ".lessonBlankHolder .lessonFreeboard": `margin-top: 22px`,
    ".lessonBlankHolder button div[image]": `width: min(65px, 100%); height: 65px; margin-bottom: 8px`,
    ".lessonUpload": `width: 262px; height: 262px; flex: 1 1 120px`,
    ".lessonUpload div[image]": `width: min(140px, 100%); height: 140px; margin-bottom: 8px`,
    ".lessonUpload div[image] svg": `width: 100%; height: 100%`,
    ".lessonUpload div[text]": `font-size: 22px`
  };
  maxFileSize = (500 * 10 * 1024 * 1024) + 1; // 5 GB File Limit // Will be 10 MB per page
  js = async (frame, extra) => {
    this.parent = extra.parent;
    this.callback = extra.callback;
    this.session = this.parent.parent.session ?? this.parent.parent.parent.session;
    this.requestPath = extra.requestPath ?? "lessons/board/new";
    this.folder = getParam("folder");

    let modal = frame.closest(".modal");

    if (extra.button == null) {
      modal.querySelector(".modalClose").addEventListener("click", () => {
        this.parent.parent.removePage(this.parent.pageID, this.parent.pageType, { animate: true });
      });
    }

    let input = frame.querySelector("input");
    let uploadButton = frame.querySelector(".lessonUpload");
    let uploadBImg = uploadButton.querySelector("div[image]");

    let blankButton = frame.querySelector(".lessonBlank");
    blankButton.addEventListener("click", () => {
      extra.modal.open("modals/lesson/newboard/blank", null, blankButton, "Blank Page", null, { parent: this });
    });
    setSVG(blankButton.querySelector("div[image]"), "../images/dashboard/lesson/blank.svg");

    let freeboardButton = frame.querySelector(".lessonFreeboard");
    freeboardButton.addEventListener("click", async () => {
      frame.setAttribute("disabled", "");
      let createAlert = await alertModule.open("info", `<b>Creating Lesson</b>Setting up freeboard, an unlimited whiteboard space!`, { time: "never" });
      let params = [];
      if (this.folder != null) {
        params.push("folder=" + this.folder);
      }
      if (getTheme() == "dark") {
        params.push("background=0A1C2D");
      }
      let path = this.requestPath;
      if (params.length > 0) {
        path += "?" + params.join("&");
      }
      let [code, body] = await sendRequest("POST", path, null, { session: this.session });
      alertModule.close(createAlert);
      frame.removeAttribute("disabled");
      if (code == 200) {
        if (this.callback != null) {
          this.callback({ modal: extra.modal, body: body });
        }
      }
    });
    setSVG(freeboardButton.querySelector("div[image]"), "../images/dashboard/lesson/freeboard.svg");

    let passedFiles = 0;
    let processUpload = async (files, event) => {
      event.preventDefault();

      if (files == null) {
        return;
      }
      if (files.length > 50) {
        return alertModule.open("warning", "<b>File Overload</b>Woah their! Markify only supports bulk uploads up to 50 files, you can add more pages in the editor.", { time: 10 });
      }
      let sendFormData = new FormData();
      let fileSize = 0;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.kind == "file") {
          file = file.getAsFile();
        }
        if (file.kind != "string") {
          if (file.type == "application/pdf") {
            fileSize += file.size;
            if (fileSize > this.maxFileSize) {
              return alertModule.open("error", "<b>Exceeded Size Limit</b><div>Lessons are limited to a max size of <u>5 GB</u> total</div>.", { time: 10 });
            }
            sendFormData.append("file" + i, file);
            passedFiles++;
          } else {
            alertModule.open("warning", "<b>" + file.name + " Failed to Upload</b>Only PDF files are currently supported.", { time: 10 });
          }
        }
      }
      if (passedFiles > 0) {
        frame.setAttribute("disabled", "");
        let alertText = `<b>Uploading Lesson</b>Uploading your PDF${addS(passedFiles)} and creating the lesson.`;
        let extraData = { noFileType: true, session: this.session };
        let uploadAlert = await alertModule.open("info", alertText, { time: "never" });
        let params = [];
        if (this.folder != null) {
          params.push("folder=" + this.folder);
        }
        if (getTheme() == "dark") {
          params.push("background=0A1C2D");
        }
        let path = this.requestPath;
        if (params.length > 0) {
          path += "?" + params.join("&");
        }
        let [code, body] = await sendRequest("POST", path, sendFormData, extraData);
        alertModule.close(uploadAlert);
        frame.removeAttribute("disabled");
        if (code == 200) {
          if (this.callback != null) {
            this.callback({ modal: extra.modal, body: body });
          }
        }
      }
      resetUI();
    }
    frame.addEventListener("drop", (event) => {
      processUpload(event.dataTransfer.items, event);
    });
    frame.addEventListener("dragover", (event) => {
      modal.style.outline = "dashed 4px var(--theme)";
      uploadButton.style.background = "var(--themeColor)";
      uploadButton.style.color = "#fff";
      uploadButton.style.transform = "scale(1.05)";
      uploadBImg.style.filter = "brightness(0) invert(1)";
      event.preventDefault();
    });
    let resetUI = () => {
      input.value = null;
      modal.style.outline = "unset";
      uploadButton.style.removeProperty("background");
      uploadButton.style.removeProperty("color");
      uploadButton.style.removeProperty("transform");
      uploadBImg.style.removeProperty("filter");
    }
    frame.addEventListener("dragleave", resetUI);
    uploadButton.addEventListener("click", () => {
      input.click();
    });
    setSVG(uploadButton.querySelector("div[image]"), "../images/dashboard/lesson/upload.svg");
    input.addEventListener("change", (event) => {
      processUpload(event.target.files, event)
    });
  }
}

modules["modals/lesson/newboard/blank"] = class {
  html = `
  <div class="blackCreationHolder">
    <div class="blankSizeHolder" selection>
      <div class="blankTitle">Document Size</div>
      <button class="border" width="816" height="1056" selected><div class="blankSizeTitle">Letter</div><div class="blankSizeInfo">8.5" x 11"</div></button>
      <button class="border" width="1056" height="1632"><div class="blankSizeTitle">Tabloid</div><div class="blankSizeInfo">11" x 17"</div></button>
      <button class="border" width="559.68" height="793.92"><div class="blankSizeTitle">A5</div><div class="blankSizeInfo">5.8" x 8.3"</div></button>
      <button class="border" width="793.92" height="1122.24"><div class="blankSizeTitle">A4</div><div class="blankSizeInfo">8.3" x 11.7"</div></button>
      <button class="border" width="1122.24" height="1587.84"><div class="blankSizeTitle">A3</div><div class="blankSizeInfo">11.7" x 16.5"</div></button>
      <button class="border" width="665.28" height="944.64"><div class="blankSizeTitle">B5</div><div class="blankSizeInfo">6.9" x 9.8"</div></button>
      <button class="border" width="944.64" height="1334.4"><div class="blankSizeTitle">B4</div><div class="blankSizeInfo">9.8" x 13.9"</div></button>
      <button class="border" width="960" height="720"><div class="blankSizeTitle">4:3</div><div class="blankSizeInfo">10" x 7.5"</div></button>
      <button class="border" width="960" height="540.48"><div class="blankSizeTitle">16:9</div><div class="blankSizeInfo">10" x 5.63"</div></button>
      <button class="border" custom><div class="blankSizeTitle">Custom</div></button>
    </div>
    <div class="blankOptionHolder">
      <div class="blankCustomSizeHolder">
        <div class="blankTitle">Page Size</div>
        <div class="blankNumberHolder" width><b>Width</b><div default="8.5" max="50" contenteditable>8.5</div>in</div>
        <div class="blankNumberHolder" height><b>Height</b><div default="11" max="50" contenteditable>11</div>in</div>
      </div>
      <div class="blankTitle">Orientation</div>
      <div class="blankSelection" selection>
        <button class="border" selected>Portrait</button>
        <button class="border">Landscape</button>
      </div>
      <div class="blankTitle">Page Amount</div>
      <div class="blankNumberHolder blankPage"><div default="1" max="500" nodecimal contenteditable>1</div> pages</div>
      <button class="blankCreate largeButton">Create</button>
    </div>
  </div>
  `;
  css = {
    ".blackCreationHolder": `display: flex; flex-wrap: wrap; gap: 8px; justify-content: center`,
    ".blankTitle": `width: calc(100% - 12px); margin: 6px; font-size: 18px; font-weight: 500; text-align: left`,
    ".blankSizeHolder": `display: flex; flex-wrap: wrap; width: 224px; max-width: 100%`,
    ".blankSizeHolder button": `box-sizing: border-box; display: flex; flex-direction: column; height: 60px; padding: 6px; margin: 6px; flex: 1 1 100px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 12px`,
    ".blankSizeHolder button .blankSizeTitle": `color: var(--theme); font-size: 18px; font-weight: 600`,
    ".blankSizeHolder button .blankSizeInfo": `color: var(--darkGray); font-size: 15px; font-weight: 500`,
    ".blankSizeHolder button:hover": `--borderColor: var(--hover)`,
    ".blackCreationHolder button[selected]": `--borderColor: var(--theme); background: var(--hover)`,
    ".blankOptionHolder": `display: flex; flex-direction: column; width: 224px; max-width: 100%; align-items: center`,
    ".blankCustomSizeHolder": `display: none; width: 100%`,
    ".blankCustomSizeHolder .blankNumberHolder": `box-sizing: border-box; padding: 0 24px`,
    ".blankSelection": `display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 14px; justify-content: center`,
    ".blankSelection button": `box-sizing: border-box; display: flex; flex-direction: column; padding: 6px 10px; margin: 6px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 16px; color: var(--theme); font-size: 16px; font-weight: 600`,
    ".blankSelection button:hover:not([selected])": `--borderColor: var(--hover)`,
    ".blankNumberHolder": `display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 8px; justify-content: center; align-items: center`,
    ".blankNumberHolder b": `margin-right: auto`,
    ".blankOptionHolder div[contenteditable]": `width: fit-content; max-width: 60px; min-width: 20.5px; padding: 4px 6px; margin: 6px 10px; --borderColor: var(--secondary); outline: unset; border: solid 3px var(--borderColor); border-radius: 20px; color: var(--theme); font-size: 20px; font-weight: 600; white-space: nowrap; overflow: hidden; transition: .2s`,
    ".blankCreate": `margin: auto 0 22px 0; background: var(--theme); --themeColor: var(--secondary); --borderRadius: 18px; color: #fff`
  };
  ppi = 96;
  js = async (frame, extra) => {
    let parent = extra.parent;
    
    let frameCreationHolder = frame.querySelector(".blackCreationHolder");
    let customSizeHolder = frame.querySelector(".blankCustomSizeHolder");
    let createButton = frame.querySelector(".blankCreate");

    frameCreationHolder.addEventListener("click", (event) => {
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
      if (title != null) {
        if (title.textContent == "Custom") {
          customSizeHolder.style.display = "block";
        } else {
          customSizeHolder.style.display = "none";
        }
      }
    });
    frameCreationHolder.addEventListener("mousedown", (event) => {
      let textBox = event.target.closest(".blankNumberHolder div");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
    });
    frameCreationHolder.addEventListener("keydown", (event) => {
      let textBox = event.target.closest(".blankNumberHolder div");
      if (textBox == null) {
        return;
      }
      if (event.key == "Enter") {
        event.preventDefault();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
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
    frameCreationHolder.addEventListener("focusout", (event) => {
      let textBox = event.target.closest(".blankNumberHolder div");
      if (textBox == null) {
        return;
      }
      let textInt = parseFloat(textBox.textContent) ?? 0;
      if (textInt > parseFloat(textBox.getAttribute("max"))) {
        textBox.textContent = textBox.getAttribute("max");
      } else if (textInt < 1) {
        textBox.textContent = 1;
      }
    });
    createButton.addEventListener("click", async () => {
      let selectedSize = frame.querySelector(".blankSizeHolder button[selected]");
      let width;
      let height;
      if (selectedSize.hasAttribute("custom") == false) {
        width = parseFloat(selectedSize.getAttribute("width"));
        height = parseFloat(selectedSize.getAttribute("height"));
      } else {
        width = parseFloat(customSizeHolder.querySelector(".blankNumberHolder[width] div").textContent) * ppi;
        height = parseFloat(customSizeHolder.querySelector(".blankNumberHolder[height] div").textContent) * ppi;
      }
      let selectedOri = frame.querySelector(".blankSelection button[selected]");
      if (selectedOri.textContent == "Landscape") {
        let oldWidth = width;
        width = height;
        height = oldWidth;
      }
      let sendData = {
        width: Math.round(width * 100) / 100,
        height: Math.round(height * 100) / 100,
        pages: Math.round(frame.querySelector(".blankPage div").textContent)
      }
      frame.setAttribute("disabled", "");
      let alertText = `<b>Creating Lesson</b>Setting up your lesson!`;
      let createAlert = await alertModule.open("info", alertText, { time: "never" });
      let params = [];
      if (parent.folder != null) {
        params.push("folder=" + parent.folder);
      }
      if (getTheme() == "dark") {
        params.push("background=0A1C2D");
      }
      let path = parent.requestPath;
      if (params.length > 0) {
        path += "?" + params.join("&");
      }
      let [code, body] = await sendRequest("POST", path, sendData, { session: parent.session });
      alertModule.close(createAlert);
      frame.removeAttribute("disabled");
      if (code == 200) {
        if (parent.callback != null) {
          parent.callback({ modal: extra.modal, body: body });
        }
      }
    });
  }
}