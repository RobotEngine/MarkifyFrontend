modules["modals/lesson/newbreakout"] = class {
  maxHeight = 400;
  preload = [
    "../modules/modals/lesson/newboard.js"
  ];
  html = `
  <div class="brtCreationHolder">
    <div class="brtInstructions">
      <div class="brtTitle">Create the <b>Template</b></div>
      <div class="brtDesc">The template document is what members will get assigned.</div>
    </div>
    <div class="brtOptions">
      <button selected class="brtButton largeButton" type="blank">
        <div image></div>
        <div content>
          <div text>Blank Document</div>
          <div detail>Start fresh with a new document.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="clone">
        <div image></div>
        <div content>
          <div text>Clone Board</div>
          <div detail>Copy the existing board document.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="duplicate">
        <div image></div>
        <div content>
          <div text>Use Another Lesson</div>
          <div detail>Reuse another lesson's template.</div>
        </div>
      </button>
    </div>
    <div class="brtProgress">Step <b>1</b> of 3</div>
  </div>
  `;
  css = {
    ".brtCreationHolder": `position: relative; display: flex; flex-direction: column; width: 350px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".brtInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brtTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brtTitle b": `color: var(--theme); font-weight: 700`,
    ".brtDesc": `width: 325px; max-width: 100%; margin-top: 6px; font-size: 16px`,
    ".brtOptions": `box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 6px; align-items: center`,
    ".brtButton": `--themeColor: var(--theme); --borderRadius: 24px; width: 100%; padding: 8px; justify-content: center; text-align: left`,
    ".brtButton div[image]": `width: 32px; height: 32px`,
    ".brtButton div[image] svg": `width: 100%; height: 100%`,
    ".brtButton div[content]": `flex: 1; margin-left: 6px`,
    ".brtButton div[detail]": `color: var(--textColor); font-size: 14px; font-weight: 500`,
    ".brtProgress": `width: 100%; margin: 12px; font-size: 16px`
  };
  js = async (frame, extra) => {
    this.parent = extra.parent;

    let modal = frame.closest(".modal");

    if (extra.button == null) {
      modal.querySelector(".modalClose").addEventListener("click", () => {
        this.parent.parent.parent.removePage(this.parent.parent.pageID, this.parent.parent.pageType, { animate: true });
      });
    }

    let blankButton = frame.querySelector('.brtButton[type="blank"]');
    blankButton.addEventListener("click", () => {
      extra.modal.open("modals/lesson/newboard", null, blankButton, "Create the Template", null, { parent: this });
    });

    let cloneButton = frame.querySelector('.brtButton[type="clone"]');
    let duplicateButton = frame.querySelector('.brtButton[type="duplicate"]');

    setSVG(blankButton.querySelector("div[image]"), "../images/editor/breakout/blank.svg");
    setSVG(cloneButton.querySelector("div[image]"), "../images/editor/breakout/clone.svg");
    setSVG(duplicateButton.querySelector("div[image]"), "../images/editor/breakout/duplicate.svg");
  }
}