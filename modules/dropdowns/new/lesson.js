modules["dropdowns/new/lesson"] = {
    html: `
    <div class="lessonCreationHolder">
      <div class="lessonBlankHolder">
        <button class="lessonBlank" style="--themeColor: var(--gray)" dropdown="dropdowns/new/blank"><img src="./images/dashboard/lesson/blank.svg"><div>Blank Page</div></button>
        <button class="lessonFreeboard" style="--themeColor: var(--purple)" dropdown="dropdowns/account"><img src="./images/dashboard/lesson/freeboard.svg"><div>Freeboard</div></button>
      </div>
      <button class="lessonUpload" style="--themeColor: var(--secondary)" dropdown="dropdowns/new/lesson"><img src="./images/dashboard/lesson/upload.svg"><div>Upload</div></button>
    </div>
    `,
    css: {
      ".lessonCreationHolder": `display: flex; flex-wrap: wrap; max-width: 426px`,
      ".lessonCreationHolder button": `display: flex; flex-direction: column; max-width: 100%; padding: 8px; margin: 11px; outline: solid 3px var(--themeColor); border-radius: 12px; align-items: center; justify-content: space-around; color: var(--darkGray); font-size: 16px; font-weight: 600`,
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
    js: function() {
      
    }
  }