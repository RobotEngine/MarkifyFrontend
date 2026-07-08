export class Setup {
  steps = [
    import("./Template"),
    import("./SetupType"),
    import("./Options"),
    import("./Review")
  ];

  progressFooter = `
  <div class="brSetupProgress">
    <button class="largeButton" back>Back</button>
    <div dots><button></button><button></button><button></button><button></button></div>
    <button class="largeButton" next>Next</button>
  </div>`;

  progressFooterStyles = {
    ".brSetupProgress": `position: sticky; display: flex; flex-wrap: wrap; gap: 12px; width: calc(100% - 24px); bottom: 0; padding: 12px; font-size: 16px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); justify-content: center; align-items: center; z-index: 2`,
    ".brSetupProgress .largeButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 12px; max-width: 100%; padding: 6px 10px; margin: 3px; justify-content: center; font-size: 18px`,
    ".brSetupProgress .largeButton svg": `width: 24px`,
    ".brSetupProgress .largeButton[back] svg": `transform: scaleX(-1)`,
    ".brSetupProgress div[dots]": `display: flex; flex-wrap: wrap; gap: 6px; padding: 6px; margin: 0 auto; justify-content: center; align-items: center; background: var(--pageColor); box-shadow: inset var(--lightShadow); border-radius: 20px`,
    ".brSetupProgress div[dots] button": `position: relative; display: flex; width: 28px; height: 28px; background: var(--hover); border-radius: 6px; pointer-events: none`,
    ".brSetupProgress div[dots] button:first-child": `border-radius: 14px 6px 6px 14px`,
    ".brSetupProgress div[dots] button:last-child": `border-radius: 6px 14px 14px 6px`,
    ".brSetupProgress div[dots] button[selected]": `background: var(--theme); border-radius: 14px !important`,
    ".brSetupProgress div[dots] button[selected]:before": `content: ""; position: absolute; width: 40%; height: 40%; left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--pageColor); border-radius: inherit`,
    ".brSetupProgress div[dots] button[past]": `background: var(--theme) !important`,
    ".brSetupProgress div[dots] button:not([selected])": `pointer-events: all`
  };

  goBack = () => {
    if (this.savePreferences != null) {
      this.savePreferences();
    }
    this.open(this.steps[this.step - 1], this.modal.backButton, { parent: this.parent, title: "Start a Breakout", animateBack: true });
  }

  goNext = () => {
    if (this.savePreferences != null) {
      this.savePreferences();
    }
    this.open(this.steps[this.step + 1], this.modal.backButton, { parent: this.parent, title: "Start a Breakout" });
  }

  setupFooter = (extra) => {
    this.frame.closest(".modalContent").style.padding = "0px";

    this.progressFooter = this.frame.querySelector(".brSetupProgress");
    let backButton = this.progressFooter.querySelector("button[back]");
    let dots = this.progressFooter.querySelector("div[dots]");
    let dotChildren = dots.children;
    let progressDot = dotChildren[this.step];
    let nextButton = this.progressFooter.querySelector("button[next]");
    backButton.addEventListener("click", this.goBack);
    if (this.step < 1) {
      backButton.setAttribute("hidden", "");
    }
    nextButton.addEventListener("click", this.goNext);
    if (this.step > (this.steps.length - 2)) {
      nextButton.setAttribute("hidden", "");
    }
    dots.addEventListener("click", (event) => {
      let dot = event.target.closest("button");
      if (dot == null) {
        return;
      }
      let dotIndex = [...dotChildren].indexOf(dot);
      this.open(this.steps[dotIndex], dot, { parent: this.parent, title: "Start a Breakout", animateBack: dotIndex < this.step });
    });

    for (let i = 0; i < dotChildren.length; i++) {
      let child = dotChildren[i];
      if (i < this.step) {
        child.setAttribute("past", "");
      } else {
        break;
      }
    }
    progressDot.setAttribute("selected", "");
  }
}