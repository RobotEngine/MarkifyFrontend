modules["pages/editor"] = {
  title: "Editor",
  html: `<div class="eNav">
    <div class="eTop">
      <div class="eTopSection" style="width: 300px"></div>
      <div class="eTopSection" style="width: 200px"></div>
      <div class="eTopSection eTopMargin" style="width: 250px"></div>
      <div class="eTopSection" style="width: 150px"></div>
    </div>
    <div class="eSide">
      <div class="eToolbar" style="height: 400px"></div>
    </div>
    <div class="eContent">
      <div class="eContentWrap">
        <div class="ePageHolder">
          <div class="ePage">
            <div class="ePageContent" style="width: 816px; height: 1059px"></div>
          </div>
          <div class="ePage">
            <div class="ePageContent" style="width: 816px; height: 1059px"></div>
          </div>
          <div class="ePage">
            <div class="ePageContent" style="width: 816px; height: 1059px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
  css: {
    ".eNav": `position: relative; display: flex; width: 100%; height: 100vh`,

    ".eTop": `position: absolute; display: flex; gap: 8px; width: calc(100% - 16px); margin: 8px; z-index: 500`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 60px; padding: 10px; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px`,
    ".eTopMargin": `margin-left: auto`,

    ".eSide": `position: absolute; display: flex; gap: 8px; height: calc(100% - 84px); top: 68px; margin: 8px; z-index: 500; align-items: center`,
    ".eToolbar": `display: flex; box-sizing: border-box; width: 60px; max-height: 100%; padding: 10px; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px`,

    ".eContent": `width: 100%; height: 100%; left: 0px; top: 0px; overflow: auto`,
    ".eContentWrap": `display: flex; width: fit-content; min-width: 100%; justify-content: center; background-image: url(./images/editor/background.svg)`,
    ".ePageHolder": `width: fit-content; height: fit-content; margin: 76px; border-radius: 16px; box-shadow: var(--lightShadow)`,
    ".ePage": `position: relative`,
    ".ePageContent": `background: var(--pageColor)`,
    ".ePage:first-child .ePageContent": `border-top-left-radius: 16px; border-top-right-radius: 16px`,
    ".ePage:not(:last-child) .ePageContent": `border-bottom: dashed var(--darkGray) 4px; border-image: url("./images/editor/border.svg") 10 / 1.5 / 0 space`,
    ".ePage:last-child .ePageContent": `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px`
  },
  js: async function (page) {
    await sleep(1);
  }
}