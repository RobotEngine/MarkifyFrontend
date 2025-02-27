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
    
  }
}