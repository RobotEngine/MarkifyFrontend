modules["pages/editor"] = {
  title: "Editor",
  preJs: function () {
    if ((getParam("lesson") || "").length < 1) {
      setFrame("pages/dashboard", app, { override: true });
      return false;
    }
  },
  html: `<div class="eNav">
    <div class="eTop">
      <div class="eTopSection">
        <a class="eLogo" href="/#dashboard"><img src="./images/logo.svg"></a>
        <div class="eFileName" contenteditable>Teachcast Flyer</div>
        <button class="eFileDropdown">File</button>
      </div>
      <div class="eTopSection" style="width: 200px"></div>
      <div class="eTopSection eTopMargin" style="width: 250px"></div>
      <div class="eTopSection" style="width: 150px"></div>
    </div>
    <div class="eSide">
      <div class="eToolbar" style="height: 400px"></div>
    </div>
    <div class="eContent">
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
  </div>`,
  css: {
    ".eNav": `position: relative`,

    ".eTop": `position: fixed; display: flex; gap: 8px; width: calc(100% - 16px); margin: 8px; z-index: 500`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px`,
    ".eTopMargin": `margin-left: auto`,

    ".eLogo": `height: 100%; padding: 0`,
    ".eLogo img": `height: 100%`,
    ".eFileName": `padding: 3px; margin: 0 4px; border-radius: 6px; font-size: 20px; transition: .05s`,
    ".eFileName:focus": `outline: solid 4px var(--secondary)`,
    ".eFileDropdown": `padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".eSide": `position: fixed; display: flex; gap: 8px; height: calc(100% - 74px); top: 58px; margin: 8px; z-index: 500; align-items: center`,
    ".eToolbar": `display: flex; box-sizing: border-box; width: 50px; max-height: 100%; padding: 10px; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px`,

    ".eContent": `display: flex; width: fit-content; min-width: 100%; justify-content: center; background-image: url(./images/editor/background.svg); background-position: center`,
    ".ePageHolder": `width: fit-content; height: fit-content; margin: 66px; border-radius: 16px; box-shadow: var(--lightShadow)`,
    ".ePage": `position: relative`,
    ".ePageContent": `background: var(--pageColor)`,
    ".ePage:first-child .ePageContent": `border-top-left-radius: 16px; border-top-right-radius: 16px`,
    ".ePage:not(:last-child) .ePageContent": `border-bottom: dashed var(--darkGray) 4px; border-image: url("./images/editor/border.svg") 10 / 1.5 / 0 space`,
    ".ePage:last-child .ePageContent": `border-bottom-left-radius: 16px; border-bottom-right-radius: 16px`
  },
  js: async function (page) {
    let lessonID = getParam("lesson") || "";
    let [code, body] = await sendRequest("POST", "lessons/join?lesson=" + lessonID);
    if (code != 200) {
      return;
    }

    page.querySelector(".eFileName").textContent = body.name || "Untitled Lesson";
  }
}