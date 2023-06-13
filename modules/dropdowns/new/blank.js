modules["dropdowns/new/blank"] = {
    html: `
    <div class="blackCreationHolder">
        <div class="blankSizeHolder">
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
            <div class="blankTitle">Orientation</div>
            <div class="blankSelection">
                <button selected>Portrait</button>
                <button>Landscape</button>
            </div>
            <div class="blankTitle">Page Amount</div>
            <div class="blankEditHolder"><div contenteditable>1</div> pages</div>
            <button class="blankCreate largeButton">Create Lesson</button>
        </div>
    </div>
    `,
    css: {
        ".blackCreationHolder": `display: flex; flex-wrap: wrap; gap: 8px; justify-content: center`,
        ".blankTitle": `width: calc(100% - 16px); margin: 6px; font-size: 18px; font-weight: 500; text-align: left`,
        ".blankSizeHolder": `display: flex; flex-wrap: wrap; width: 224px; max-width: 100%`,
        ".blankSizeHolder button": `box-sizing: border-box; display: flex; flex-direction: column; height: 60px; padding: 6px; margin: 6px; flex: 1 1 100px; justify-content: center; align-items: center; outline: solid 3px var(--secondary); border-radius: 12px`,
        ".blankSizeHolder button .blankSizeTitle": `color: var(--theme); font-size: 18px; font-weight: 600`,
        ".blankSizeHolder button .blankSizeInfo": `color: var(--darkGray); font-size: 15px; font-weight: 500`,
        ".blankSizeHolder button:hover": `outline: solid 3px var(--hover)`,
        ".blackCreationHolder button[selected]": `outline: solid 3px var(--theme); background: var(--hover)`,
        ".blankOptionHolder": `display: flex; flex-direction: column; width: 224px; max-width: 100%; align-items: center`,
        ".blankSelection": `display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 18px; justify-content: center`,
        ".blankSelection button": `box-sizing: border-box; display: flex; flex-direction: column; padding: 6px; margin: 6px; justify-content: center; align-items: center; outline: solid 3px var(--secondary); border-radius: 16px; color: var(--theme); font-size: 16px; font-weight: 600`,
        ".blankSelection button:hover:not([selected])": `outline: solid 3px var(--hover)`,
        ".blankEditHolder": `display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 18px; justify-content: center; align-items: center`,
        ".blankOptionHolder div[contenteditable]": `width: fit-content; padding: 4px 6px; margin: 6px 10px; outline: solid 3px var(--secondary); border-radius: 16px; color: var(--theme); font-size: 20px; font-weight: 600`,
        ".blankCreate": `margin: auto 0 22px 0; background: var(--theme); border-radius: 18px; color: #fff`
    },
    js: function () {

    }
}