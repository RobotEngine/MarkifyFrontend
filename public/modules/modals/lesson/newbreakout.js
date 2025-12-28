modules["modals/lesson/newbreakout"] = class {
  //maxHeight = 400;
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
          <div text>Start Fresh</div>
          <div detail>Upload a PDF or make a blank board.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="clone">
        <div image></div>
        <div content>
          <div text>Duplicate Board</div>
          <div detail>Create a copy of the existing board.</div>
        </div>
      </button>
      <button class="brtButton largeButton" type="duplicate">
        <div image></div>
        <div content>
          <div text>Use Another Template</div>
          <div detail>Use a template from a past lesson.</div>
        </div>
      </button>
    </div>
    <div class="brtProgress">
      <button class="largeButton" back hidden>Back</button>
      <div dots></div>
      <button class="largeButton" next hidden>Next</button>
    </div>
  </div>
  `;
  css = {
    ".brtCreationHolder": `position: relative; display: flex; flex-direction: column; width: 350px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".brtInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brtTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brtTitle b": `color: var(--theme); font-weight: 700`,
    ".brtDesc": `width: 325px; max-width: 100%; margin-top: 6px; font-size: 16px`,
    ".brtOptions": `box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 6px; align-items: center`,
    ".brtButton": `--themeColor: var(--theme); --borderRadius: 26px; width: 100%; padding: 8px; justify-content: center; text-align: left`,
    ".brtButton div[image]": `width: 32px; height: 32px`,
    ".brtButton div[image] svg": `width: 100%; height: 100%`,
    ".brtButton div[content]": `flex: 1; margin-left: 8px`,
    ".brtButton div[detail]": `margin-top: 4px; color: var(--textColor); font-size: 14px; font-weight: 500`,
    ".brtProgress": `display: flex; flex-wrap: wrap; gap: 8px; width: calc(100% - 24px); margin: 12px; font-size: 16px; justify-content: center; align-items: center`,
    ".brtProgress .largeButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 12px; max-width: 100%; padding: 6px 10px; margin: 0; justify-content: center; font-size: 18px`,
    ".brtProgress .largeButton[hidden]": `display: none`,
    ".brtProgress .largeButton svg": `width: 24px`,
    ".brtProgress .largeButton[back] svg": `transform: scaleX(-1)`,
    ".brtProgress div[dots]": `display: flex; flex-wrap: wrap; margin: 0 auto; justify-content: center; align-items: center`,
    ".brtProgress div[dots] button": `display: flex; width: 16px; height: 16px; margin: 6px; background: var(--hover); border-radius: 8px`,
    ".brtProgress div[dots] button[selected]": `width: 32px; background: var(--theme); pointer-events: none`
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
      extra.modal.open("modals/lesson/newboard", null, blankButton, "Create the Template", null, { parent: this, requestPath: "lessons/breakout/template/new", callback: ({ body }) => {
        this.parent.parent.openPage("secondary", "breakout/template", { template: body });
      } });
    });

    let cloneButton = frame.querySelector('.brtButton[type="clone"]');
    cloneButton.addEventListener("click", async () => {
      cloneButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("POST", "lessons/breakout/template/new", { duplicate: true }, { session: this.parent.parent.session });
      if (code == 200) {
        this.parent.parent.openPage("secondary", "breakout/template", { template: body });
      }
      cloneButton.removeAttribute("disabled");
    });

    let duplicateButton = frame.querySelector('.brtButton[type="duplicate"]');
    duplicateButton.addEventListener("click", () => {
      this.parent.parent.openPage("secondary", "breakout/template"); // TESTING - REMOVE LATER
    });

    setSVG(blankButton.querySelector("div[image]"), "../images/editor/breakout/blank.svg");
    setSVG(cloneButton.querySelector("div[image]"), "../images/editor/breakout/clone.svg");
    setSVG(duplicateButton.querySelector("div[image]"), "../images/editor/breakout/duplicate.svg");

    if ((this.parent.parent.parent.lesson.tool ?? []).includes("board") == false) {
      cloneButton.style.display = "none";
    }

    // Progess Bar:
    let progressHolder = frame.querySelector(".brtProgress");
    let backButton = progressHolder.querySelector("button[back]");
    let progressDots = progressHolder.querySelector("div[dots]");
    let nextButton = progressHolder.querySelector("button[next]");
    //setSVG(backButton, "../images/tooltips/arrow.svg");
    progressDots.innerHTML = "<button selected></button><button></button><button></button><button></button>";
    //setSVG(nextButton, "../images/tooltips/arrow.svg");
  }
}