import { Setup } from "./Setup";

import { sendRequest } from "@/crucial";

export class Frame extends Setup {
  step = 1;

  html = `
  <div class="brosOptionsHolder">
    <div class="brosInstructions">
      <div class="brosTitle">How to <b>Setup the Teams</b>?</div>
    </div>
    <div class="brosOptions">
      <button class="brosOption" type="auto">
        <div image style="--image: url('../images/editor/breakout/autopair.png')"></div>
        <div content>
          <div title>AutoPair</div>
          <div info>Automatically distribute members into solo boards or teams of same size.</div>
        </div>
      </button>
      <button class="brosOption" type="teamup">
        <div image style="--image: url('../images/editor/breakout/teamup.png')"></div>
        <div content>
          <div title>Team Up</div>
          <div info>Allow members to create or join a team of their choosing.</div>
        </div>
      </button>
      <button class="brosOption" type="manual">
        <div image style="--image: url('../images/editor/breakout/manual.png')"></div>
        <div content>
          <div title>Manual</div>
          <div info>Create groupings and assign members to each one-by-one.</div>
        </div>
      </button>
    </div>
  </div>
  ${this.progressFooter}
  `;

  css = {
    ".brosOptionsHolder": `position: relative; display: flex; flex-direction: column; width: 598px; max-width: calc(100% - 16px); padding: 8px; text-align: center; align-items: center; z-index: 1`,
    ".brosInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brosTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brosTitle b": `color: var(--theme); font-weight: 700`,
    ".brosOptions": `box-sizing: border-box; display: flex; flex-wrap: wrap; width: fit-content; width: 100%; padding: 4px; gap: 10px; justify-content: center`,
    ".brosOption": `position: relative; display: flex; flex-direction: column; flex: 1 1 190px; max-width: 190px; height: 278px; padding: 4px; overflow: hidden; background: var(--pageColor); box-shadow: inset var(--lightShadow); border-radius: 16px`,
    ".brosOption[selected]": `background: var(--theme)`,
    ".brosOption:hover": `box-shadow: inset var(--darkShadow)`,
    ".brosOption div[image]": `position: relative; width: 100%; height: 182px`,
    ".brosOption div[image]:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: var(--image); background-size: contain`,
    ".brosOption[selected] div[image]:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: var(--image); background-size: contain; filter: brightness(0) invert(1)`,
    //".brosOption[selected] img[test]": `filter: brightness(0) invert(1)`,
    ".brosOption div[content]": `position: absolute; box-sizing: border-box; width: calc(100% - 12px); left: 6px; bottom: 6px; padding: 6px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 10px`,
    ".brosOption[selected] div[content]": `box-shadow: inset var(--lightShadow);`,
    ".brosOption div[content] div[title]": `width: 100%; font-size: 18px; font-weight: 700; color: var(--theme); transition: .2s`,
    ".brosOption:hover div[content] div[title]": `padding: 2px 0; transform: scale(1.2)`,
    ".brosOption div[content] div[info]": `width: 100%; margin-top: 4px; font-size: 12px`,
    ...this.progressFooterStyles
  };

  js(frame, extra) {
    this.parent = extra.parent;

    this.setupFooter(extra);

    let optionHolder = frame.querySelector(".brosOptions");

    optionHolder.addEventListener("click", async (event) => {
      let option = event.target.closest(".brosOption");
      if (option == null) {
        return;
      }

      optionHolder.setAttribute("disabled", "");
      let type = option.getAttribute("type");
      await sendRequest("PUT", "lessons/breakout/mode", { mode: type }, { session: this.parent.parent.session });
      optionHolder.removeAttribute("disabled");
      this.goNext();
    });
  }
}