modules["pages/launch"] = {
  title: "Collaboration across the Classroom",
  html: `<div class="lSection" header>
    <img class="lHeaderBackdrop" src="./images/launch/backdrop.png">
    <div class="lHeaderContent">
      <div class="lHeaderRow">
        <div>
          <img src="./images/launch/tools/draw.svg" low>
          <img src="./images/launch/tools/markup.svg" high>
        </div>
        <img class="lHeaderLogo" src="./images/logo.svg">
        <div>
          <img src="./images/launch/tools/text.svg" high>
          <img src="./images/launch/tools/shape.svg" low>
        </div>
      </div>
      <div class="lHeaderSlogan"><b>Collaboration</b> across the <b>Classroom</b></div>
      <div class="lHeaderSummary">Bring your classroom's whiteboard around the room with Markify! Stream annotations to student's devices to see up close and review.</div>
      <div class="lHeaderActions">
        <button class="lOpen largeButton" openpage="editor">Open Markify</button>
        <button class="lJoin largeButton" openpage="join">Join Lesson<img src="./images/tooltips/link.svg"></button>
      </div>
      <img class="lHeaderSplash" src="./images/launch/showcase.png">
    </div>
  </div>`,
  css: {
    ".lSection": `display: flex; flex-direction: column; align-items: center`,
    //".lSection[header]": `min-height: 100vh; justify-content: center; align-items: center`,
    ".lHeaderBackdrop": `position: fixed; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; opacity: .5; z-index: -1`,
    ".lHeaderContent": `display: flex; flex-direction: column; box-sizing: border-box; width: 100%; max-width: 1000px; padding: 26px; align-items: center`,
    ".lHeaderRow": `display: flex; max-width: 100%; justify-content: center; margin-top: 30px`,
    ".lHeaderRow div": `display: flex; flex-shrink: 0; width: 300px; justify-content: space-around; align-items: center`,
    ".lHeaderRow div img": `width: 60px; height: 60px`,
    ".lHeaderRow div img[high]": `animation: bobIconHigh 15s ease infinite`,
    ".lHeaderRow div img[low]": `animation: bobIconLow 15s ease infinite`,
    "@keyframes bobIconHigh": `0%, 100% { transform: translateY(-20%) scale(1.1) } 50% { transform: translateY(20%) }`,
    "@keyframes bobIconLow": `0%, 100% { transform: translateY(20%) } 50% { transform: translateY(-20%) scale(1.1) }`,
    ".lHeaderLogo": `box-sizing: border-box; width: 100%; max-width: 350px; padding: 24px`,
    ".lHeaderSlogan": `margin-top: 16px; font-size: 35px; line-height: 55px`,
    ".lHeaderSlogan b": `color: var(--theme); font-size: 45px; font-weight: 700`,
    ".lHeaderSummary": `max-width: 650px; margin-top: 24px`,
    ".lHeaderActions": `display: flex; flex-wrap: wrap; gap: 24px; margin-top: 40px; justify-content: center`,
    ".lOpen": `background: var(--theme); --borderRadius: 20.25px; color: #fff`,
    ".lJoin": `background: #fff; --borderRadius: 20.25px; color: var(--secondary)`,
    ".lJoin img": `width: 24px; height: 24px; margin-left: 8px`,
    ".lHeaderSplash": `width: 100%; margin-top: 40px`
  },
  js: async function (page) {
    
  }
}