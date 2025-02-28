modules["modals/lesson/newboard"] = class {
  html = `<input type="file" accept="application/pdf" multiple="true" hidden="true">
  <div class="lessonCreationHolder">
    <div class="lessonBlankHolder">
      <button class="lessonBlank border" style="--themeColor: var(--gray)" dropdown="dropdowns/new/blank" title="Create a fresh blank page"><img src="./images/dashboard/lesson/blank.svg" draggable="false"><div>Blank Page</div></button>
      <button class="lessonFreeboard border" style="--themeColor: var(--purple)" title="Create an unlimited canvas for whiteboarding"><img src="./images/dashboard/lesson/freeboard.svg" draggable="false"><div>Freeboard</div></button>
    </div>
    <button class="lessonUpload border" style="--themeColor: var(--secondary)" title="Upload an existing PDF to markup"><img src="./images/dashboard/lesson/upload.svg" draggable="false"><div>Upload PDF</div></button>
  </div>`;
  css = {
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
  };
  maxFileSize = (500 * 10 * 1024 * 1024) + 1; // 5 GB File Limit // Will be 10 MB per page
  js = async (frame, extra) => {
    let blankButton = frame.querySelector(".lessonBlank");
    blankButton.addEventListener("click", () => {
      extra.modal.open("modals/lesson/newboard/blank", null, blankButton);
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
    ".blankOptionHolder div[contenteditable]": `width: fit-content; max-width: 60px; padding: 4px 6px; margin: 6px 10px; --borderColor: var(--secondary); outline: unset; border: solid 3px var(--borderColor); border-radius: 20px; color: var(--theme); font-size: 20px; font-weight: 600; white-space: nowrap; overflow: hidden; transition: .2s`,
    ".blankCreate": `margin: auto 0 22px 0; background: var(--theme); --borderRadius: 18px; color: #fff`
  };
  js = async (frame, extra) => {
    
  }
}