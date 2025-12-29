modules["dropdowns/editor/boardstyle"] = class {
  title = "Board Style";
  html = `
  <div class="eBackgroundStyleHolder">
    <button class="border" color="FFFFFF"></button>
    <button class="border" color="EFEFEF"></button>
    <button class="border" color="979797"></button>
    <button class="border" color="174B2C"></button>
    <button class="border" color="0A1C2D"></button>
    <button class="border" color="000000"></button>
    <button class="border" color="FDD4E3"></button>
    <button class="border" color="D5F3D0"></button>
    <button class="border" color="DDEAFF"></button>
    <button class="border" color="FCE9C2"></button>
    <button class="border" color="E1D8FF"></button>
    <button class="border" color="E3CAE7"></button>
  </div>
  `;
  css = {
    ".eBackgroundStyleHolder": `display: flex; flex-wrap: wrap; width: 324px; max-width: calc(100% - 8px); padding: 4px; gap: 12px; justify-content: center; align-items: center; transition: .2s`,
    ".eBackgroundStyleHolder button": `box-sizing: border-box; width: 100px; height: 100px; padding: 0px; --borderWidth: 4px; --borderRadius: 8px`,
    ".eBackgroundStyleHolder button:before": `content: ""; position: absolute; width: calc(100% + 0px); height: calc(100% + 0px); left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: .075; background-image: var(--background); background-size: 32px; background-position: center`,
    ".eBackgroundStyleHolder button:hover": `--borderColor: var(--hover)`,
    ".eBackgroundStyleHolder button[selected]": `--borderWidth: 6px; --borderColor: var(--theme)`,
  };
  js = async (frame, extra) => {
    let parent = extra.parent;
    let editor = parent.editor;

    let styleHolder = frame.querySelector(".eBackgroundStyleHolder");
    let backgrounds = styleHolder.querySelectorAll("button");
    for (let i = 0; i < backgrounds.length; i++) {
      let button = backgrounds[i];
      let color = button.getAttribute("color");
      button.style.backgroundColor = "#" + color;
      if (editor.utils.contrastCheck(color) == true) {
        button.style.setProperty("--background", "url(../images/editor/backdropblack.svg)");
      } else {
        button.style.setProperty("--background", "url(../images/editor/backdropwhite.svg)");
      }
    }

    let updatedSelectedColor = () => {
      let currentSelect = styleHolder.querySelector("button[selected]");
      if (currentSelect != null) {
        currentSelect.removeAttribute("selected");
      }
      let newSelect = styleHolder.querySelector('button[color="' + (editor.backgroundColor ?? "FFFFFF").toUpperCase() + '"]');
      if (newSelect != null) {
        newSelect.setAttribute("selected", "");
      }
    }
    updatedSelectedColor();
    editor.pipeline.subscribe("boardStyleSet", "set", (body) => {
      if (body.hasOwnProperty("background") == true) {
        updatedSelectedColor();
      }
    });

    styleHolder.addEventListener("click", async (event) => {
      let button = event.target.closest("button[color]");
      if (button == null) {
        return;
      }
      let color = button.getAttribute("color");
      if (color == (editor.backgroundColor ?? "FFFFFF")) {
        return;
      }
      styleHolder.setAttribute("disabled", "");
      let path = "lessons/save/background";
      if ((editor.parameters ?? []).length > 0) {
        path += "?" + editor.parameters.join("&");
      }
      await sendRequest("POST", path, { color: color }, { session: editor.session });
      styleHolder.removeAttribute("disabled");
    });
  }
}