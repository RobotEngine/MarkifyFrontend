modules["modals/tutorial"] = {
  html: `
  <div class="dmWelcome">
    <div class="dmHeaderTx">Welcome To</div>
    <img class="dmHeaderMarkify" src="./images/logo.svg">
    <div class="dmAbout">Learning new pieces of software can be daunting, so here are some resources to help you get started!</div>
    <div class="dmButtons">
      <button class="dmTutorialButton largeButton" type="usecase" style="--rgbTheme: 255, 185, 56" modal="modals/tutorial/usecases">
        <img src="./images/tutorial/lightbulb.svg">
        <div>What You Could Use Markify For</div>
      </button>
      <button class="dmTutorialButton largeButton" type="started" style="--rgbTheme: 52, 193, 114">
        <img src="./images/tutorial/compass.svg">
        <div>Getting Started with Markify</div>
      </button>
      <button class="dmTutorialButton largeButton" type="watchout" style="--rgbTheme: 255, 61, 100">
        <img src="./images/tutorial/warning.svg">
        <div>Some Things to Watch Out For</div>
      </button>
      <button class="dmSkipButton"><b>Let Me In!</b> <i>— I'm an Expert</i></button>
    </div>
  </div>
  <img class="dmBackground" default hover src="./images/tutorial/backgrounds/default.svg">
  <img class="dmBackground" type="usecase" src="./images/tutorial/backgrounds/yellow.svg">
  <img class="dmBackground" type="started" src="./images/tutorial/backgrounds/green.svg">
  <img class="dmBackground" type="watchout" src="./images/tutorial/backgrounds/red.svg">
  `,
  css: {
    ".dmWelcome": `position: relative; display: flex; flex-direction: column; width: 350px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".dmHeaderTx": `font-size: 22px; font-weight: 500`,
    ".dmHeaderMarkify": `width: 100%; max-width: 250px`,
    ".dmAbout": `max-width: 100%; margin-top: 12px; font-size: 16px`,

    ".dmButtons": `display: flex; flex-direction: column; width: 100%; margin-top: 16px; align-items: center`,
    ".dmTutorialButton": `--themeColor: rgb(var(--rgbTheme)); --themeColor2: var(--themeColor); --borderRadius: 33px; padding: 8px; flex-wrap: wrap; margin: 8px 24px; justify-content: center; text-align: left; background: linear-gradient(to bottom right, rgba(var(--rgbTheme), 0), var(--pageColor))`,
    ".dmTutorialButton:hover": `--borderWidth: 6px; background: linear-gradient(to bottom right, rgba(var(--rgbTheme), .3), var(--pageColor))`,
    ".dmTutorialButton img": `width: 50px; height: 50px`, //; transform: scale(1.3)
    ".dmTutorialButton div": `flex: 1 1 100px; margin: 0 8px`,
    ".dmSkipButton": `width: fit-content; margin: 16px 0 12px 0; color: var(--theme); font-size: 18px; font-weight: 600`,

    ".dmBackground": `position: absolute; width: calc(100% + 12px); height: calc(100% + 12px); left: -6px; top: -6px; object-fit: cover; z-index: 0; opacity: 0; transition: .5s`,
    ".dmBackground[hover]": `opacity: 1`
  },
  js: async function (frame, extra) {
    frame.addEventListener("mouseover", (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let targetButton = target.closest(".dmTutorialButton");
      if (targetButton != null) {
        let prevHover = frame.querySelector(".dmBackground[hover]");
        if (prevHover != null && prevHover.getAttribute("type") != targetButton.getAttribute("type")) {
          prevHover.removeAttribute("hover");
          frame.querySelector('.dmBackground[type="' + targetButton.getAttribute("type") + '"]').setAttribute("hover", "");
        }
      }
    });
    frame.querySelector(".dmSkipButton").addEventListener("click", async () => {
      (await getModule("modal")).close();
    });
  }
}

modules["modals/tutorial/usecases"] = {
  html: `
  <div class="dmucHolder">
    <div class="dmucImageHolder">
      <div class="dmucImageGradient"></div>
      <svg class="dmucImagePattern" viewBox="0 0 90 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2.5L14.3529 3.51309C10.8506 4.48595 7.1494 4.48595 3.64712 3.51309L0 2.5V5H44H90V2.5L86.3529 3.51309C82.8506 4.48595 79.1494 4.48595 75.6471 3.51309L72 2.5L68.3529 1.48691C64.8506 0.514054 61.1494 0.514055 57.6471 1.48691L54 2.5L50.3529 3.51309C46.8506 4.48595 43.1494 4.48595 39.6471 3.51309L36 2.5L32.3529 1.48691C28.8506 0.514054 25.1494 0.514055 21.6471 1.48691L18 2.5Z" fill="var(--pageColor)"/>
      </svg>
    </div>
  </div>
  `,
  css: {
    ".dmucHolder": `position: relative; display: flex; flex-direction: column; width: 450px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".dmucImageHolder": `position: relative; width: calc(100% + 12px); height: 200px; overflow: hidden`,
    ".dmucImageGradient": `position: absolute; width: 100%; height: calc(100% + 6px); left: 0px; top: 0px; background: linear-gradient(to bottom right, #FFE4BD, #FFAF3F)`,
    ".dmucImagePattern": `position: absolute; width: calc(100% + 12px); left: -6px; bottom: -1px; z-index: 1`
  },
  js: async function (frame, extra) {
    
  }
}