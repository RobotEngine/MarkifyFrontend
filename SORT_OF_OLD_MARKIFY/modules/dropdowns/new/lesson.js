modules["dropdowns/new/lesson"] = {
  html: `<input type="file" accept="application/pdf" multiple="true" hidden="true">
  <div class="lessonCreationHolder">
    <div class="lessonBlankHolder">
      <button class="lessonBlank border" style="--themeColor: var(--gray)" dropdown="dropdowns/new/blank" title="Create a fresh blank page"><img src="./images/dashboard/lesson/blank.svg" draggable="false"><div>Blank Page</div></button>
      <button class="lessonFreeboard border" style="--themeColor: var(--purple)" title="Create an unlimited canvas for whiteboarding"><img src="./images/dashboard/lesson/freeboard.svg" draggable="false"><div>Freeboard</div></button>
    </div>
    <button class="lessonUpload border" style="--themeColor: var(--secondary)" title="Upload an existing PDF to markup"><img src="./images/dashboard/lesson/upload.svg" draggable="false"><div>Upload PDF</div></button>
  </div>`,
  css: {
    ".lessonCreationHolder": `display: flex; flex-wrap: wrap; max-width: 426px`,
    ".lessonCreationHolder button": `display: flex; flex-direction: column; max-width: 100%; padding: 8px; margin: 11px; --borderWidth: 3px; --borderColor: var(--themeColor); --borderRadius: 12px; align-items: center; justify-content: space-around; color: var(--darkGray); font-size: 16px; font-weight: 600`,
    ".lessonCreationHolder button:hover": `background: var(--themeColor); color: #fff; transform: scale(1.05)`,
    ".lessonCreationHolder button:hover img": `filter: brightness(0) invert(1)`,
    ".lessonCreationHolder button:active": `transform: scale(.95)`,
    ".lessonBlankHolder": `flex: 1 1 131px`,
    ".lessonBlankHolder button": `width: calc(100% - 22px); height: 120px`,
    ".lessonBlankHolder .lessonFreeboard": `margin-top: 22px`,
    ".lessonBlankHolder button img": `width: min(65px, 100%); height: 65px; margin-bottom: 8px`,
    ".lessonUpload": `width: 262px; height: 262px; flex: 1 1 120px`,
    ".lessonUpload img": `width: min(140px, 100%); height: 140px; margin-bottom: 8px`,
    ".lessonUpload div": `font-size: 22px`
  },
  maxFileSize: (500 * 10 * 1024 * 1024) + 1, // 5 GB File Limit // Will be 10 MB per page
  js: async function (frame, extra) {
    let dropdown = frame.closest(".dropdown");
    let dropdownModule = await getModule("dropdown");
    let alertModule = await getModule("alert");
    let input = frame.querySelector("input");
    let uploadButton = frame.querySelector(".lessonUpload");
    let uploadBImg = uploadButton.querySelector("img");

    let lesson = getParam("lesson") ?? "";
    let editor;

    this.folder = extra.button.parentElement.parentElement.getAttribute("folder");

    let the = this;
    let passedFiles = 0;
    let processUpload = async (files, event) => {
      event.preventDefault();

      if (files == null) {
        return;
      }
      if (files.length > 50) {
        return alertModule.open("warning", "<b>File Overload</b>Woah their! Markify only supports bulk uploads up to 50 files, you can upload more pages in the editor", { time: 10 });
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
            if (fileSize > the.maxFileSize) {
              return alertModule.open("error", "<b>Exceeded Size Limit</b><div>Lessons are limited to a max size of <u>3 GB</u> total</div>", { time: 10 });
              //passedFile = false;
              //break;
            }
            sendFormData.append("file" + i, file);
            passedFiles++;
            /*
            if (file.size < the.maxFileSize) {
              sendFormData.append("file" + i, file);
              passedFile = true;
            } else {
              alertModule.open("warning", "<b>" + file.name + " Failed to Upload</b>Files are limited to a max size of 50 MB", { time: 10 });
            }
            */
          } else {
            alertModule.open("warning", "<b>" + file.name + " Failed to Upload</b>Only PDF files are currently supported", { time: 10 });
          }
        }
      }
      if (passedFiles > 0) {
        frame.setAttribute("disabled", "");
        extra.button.setAttribute("disabled", "");
        let alertText = `<b>Uploading Lesson</b>Uploading your PDF${addS(passedFiles)} and creating the lesson!`;
        let extraData = { noFileType: true };
        if (editor != null) {
          extraData.session = editor.session;
          alertText = `<b>Uploading Documents</b>Uploading your PDF${addS(passedFiles)} and inserting into the lesson!`;
        }
        let uploadAlert = await alertModule.open("info", alertText, { time: "never" });
        let path = "lessons/new";
        if (this.folder != null) {
          path += "?folder=" + this.folder;
        }
        let [code, body] = await sendRequest("POST", path, sendFormData, extraData);
        alertModule.close(uploadAlert);
        frame.removeAttribute("disabled");
        extra.button.removeAttribute("disabled");
        if (code == 200) {
          if (this.folder == null) {
            dropdownModule.close();
            if (editor == null) {
              modifyParams("lesson", body.lesson);
              setFrame("pages/editor");
            }
          } else {
            window.dropdown.frameHistory = [];
            dropdownModule.open(uploadButton, "dropdowns/dashboard/folder");
          }
        }
      }

      resetUI();
    }
    frame.addEventListener("drop", (event) => {
      processUpload(event.dataTransfer.items, event)
    });
    frame.addEventListener("dragover", (event) => {
      dropdown.style.outline = "dashed 4px var(--theme)";
      uploadButton.style.background = "var(--themeColor)";
      uploadButton.style.color = "#fff";
      uploadButton.style.transform = "scale(1.05)";
      uploadBImg.style.filter = "brightness(0) invert(1)";
      event.preventDefault();
    });
    let resetUI = () => {
      input.value = null;
      dropdown.style.outline = "unset";
      uploadButton.style.removeProperty("background");
      uploadButton.style.removeProperty("color");
      uploadButton.style.removeProperty("transform");
      uploadBImg.style.removeProperty("filter");
    }
    frame.addEventListener("dragleave", resetUI);
    uploadButton.addEventListener("click", () => {
      input.click();
    });
    input.addEventListener("change", (event) => {
      processUpload(event.target.files, event)
    });
    let freeboardButton = frame.querySelector(".lessonFreeboard");
    freeboardButton.addEventListener("click", async () => {
      frame.setAttribute("disabled", "");
      extra.button.setAttribute("disabled", "");
      let createAlert = await alertModule.open("info", `<b>Creating Lesson</b>Setting up freeboard, an unlimited whiteboard space!`, { time: "never" });
      let path = "lessons/new";
      if (this.folder != null) {
        path += "?folder=" + this.folder;
      }
      let [code, body] = await sendRequest("POST", path);
      alertModule.close(createAlert);
      frame.removeAttribute("disabled");
      extra.button.removeAttribute("disabled");
      if (code == 200) {
        if (this.folder == null) {
          dropdownModule.close();
          modifyParams("lesson", body.lesson);
          setFrame("pages/editor");
        } else {
          window.dropdown.frameHistory = [];
          dropdownModule.open(freeboardButton, "dropdowns/dashboard/folder");
        }
      }
    });

    if (lesson != "") {
      editor = await getModule("pages/editor");
      if (500 - editor.page.querySelector(".ePageHolder").children.length < 1) {
        alertModule.open("error", "<b>Exceeded Page Limit</b><div>Lessons are limited to <u>500 pages</u></div>", { time: 10 });
        dropdownModule.close();
        return;
      }

      frame.querySelector(".lessonFreeboard").remove();
      frame.querySelector(".lessonUpload").style.height = "120px";
      let uploadImg = frame.querySelector(".lessonUpload img");
      uploadImg.style.width = "min(65px, 100%)";
      uploadImg.style.height = "65px";
      frame.querySelector(".lessonUpload div").style.fontSize = "unset";
    }
  }
}

modules["dropdowns/new/blank"] = {
  html: `
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
      <button class="border" width="960" height="1706.67"><div class="blankSizeTitle">16:9</div><div class="blankSizeInfo">10" x 17.8"</div></button>
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
      <button class="blankCreate largeButton">Create Lesson</button>
    </div>
  </div>
  `,
  css: {
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
    ".blankOptionHolder div[contenteditable]": `width: fit-content; max-width: 60px; padding: 4px 6px; margin: 6px 10px; --borderColor: var(--secondary); outline: unset; border: solid 3px var(--borderColor); border-radius: 20px; color: var(--theme); font-size: 20px; font-weight: 600; white-space: nowrap; overflow: hidden; transition: .2s`,
    ".blankCreate": `margin: auto 0 22px 0; background: var(--theme); --borderRadius: 18px; color: #fff`
  },
  js: async function (frame, extra) {
    let dropdownModule = await getModule("dropdown");
    let createLessonDropdown = await getModule("dropdowns/new/lesson");

    let frameCreationHolder = frame.querySelector(".blackCreationHolder");
    let customSizeHolder = frame.querySelector(".blankCustomSizeHolder");

    let createButton = frame.querySelector(".blankCreate");

    let lesson = getParam("lesson") ?? "";
    let editor;
    if (lesson != "") {
      createButton.textContent = "Add Pages";
      editor = await getModule("pages/editor");
      frame.querySelector(".blankPage div").setAttribute("max", 500 - editor.page.querySelector(".ePageHolder").children.length);
    }
    
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
      if (title) {
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
    let ppi = 96;
    createButton.addEventListener("click", async () => {
      let selectedSize = frame.querySelector(".blankSizeHolder button[selected]");
      let width;
      let height;
      if (selectedSize.hasAttribute("custom") == false) {
        width = parseFloat(selectedSize.getAttribute("width"));
        height = parseFloat(selectedSize.getAttribute("height"));
      } else {
        width = parseFloat(customSizeHolder.querySelector(".blankNumberHolder[width] div").textContent)*ppi;
        height = parseFloat(customSizeHolder.querySelector(".blankNumberHolder[height] div").textContent)*ppi;
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
      extra.button.setAttribute("disabled", "");
      let alertModule = await getModule("alert");
      let alertText = `<b>Creating Lesson</b>Setting up your lesson!`;
      let extraData = {};
      if (editor != null) {
        extraData.session = editor.session;
        alertText = `<b>Adding Pages</b>Inserting new pages.`;
      }
      let createAlert = await alertModule.open("info", alertText, { time: "never" });
      let path = "lessons/new";
      if (createLessonDropdown.folder != null) {
        path += "?folder=" + createLessonDropdown.folder;
      }
      let [code, body] = await sendRequest("POST", path, sendData, extraData);
      alertModule.close(createAlert);
      frame.removeAttribute("disabled");
      extra.button.removeAttribute("disabled");
      if (code == 200) {
        if (createLessonDropdown.folder == null) {
          dropdownModule.close();
          if (editor == null) {
            modifyParams("lesson", body.lesson);
            setFrame("pages/editor");
          }
        } else {
          window.dropdown.frameHistory = [];
          dropdownModule.open(createButton, "dropdowns/dashboard/folder");
        }
      }
    });
  }
}