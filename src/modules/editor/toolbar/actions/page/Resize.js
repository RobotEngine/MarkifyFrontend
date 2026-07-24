import resizePageIcon from "../../../icons/toolbar/resizepage.svg?raw";

export class Tool {
  pageBorderSize = 4;
  ppi = 96; // Pixels per inch

  setActionButton(button) {
    button.innerHTML = resizePageIcon;
  }

  TOOLTIP = "Resize";

  html = `
  <div class="eSubToolResizeHolder">
    <div class="eSubToolResizeSizeHolder">
      <button class="border" width="816" height="1056"><div class="eSubToolResizeSizeTitle">Letter</div><div class="eSubToolResizeSizeInfo">8.5" x 11"</div></button>
      <button class="border" width="1056" height="1632"><div class="eSubToolResizeSizeTitle">Tabloid</div><div class="eSubToolResizeSizeInfo">11" x 17"</div></button>
      <button class="border" width="559.68" height="793.92"><div class="eSubToolResizeSizeTitle">A5</div><div class="eSubToolResizeSizeInfo">5.8" x 8.3"</div></button>
      <button class="border" width="793.92" height="1122.24"><div class="eSubToolResizeSizeTitle">A4</div><div class="eSubToolResizeSizeInfo">8.3" x 11.7"</div></button>
      <button class="border" width="1122.24" height="1587.84"><div class="eSubToolResizeSizeTitle">A3</div><div class="eSubToolResizeSizeInfo">11.7" x 16.5"</div></button>
      <button class="border" width="665.28" height="944.64"><div class="eSubToolResizeSizeTitle">B5</div><div class="eSubToolResizeSizeInfo">6.9" x 9.8"</div></button>
      <button class="border" width="944.64" height="1334.4"><div class="eSubToolResizeSizeTitle">B4</div><div class="eSubToolResizeSizeInfo">9.8" x 13.9"</div></button>
      <button class="border" width="960" height="720"><div class="eSubToolResizeSizeTitle">4:3</div><div class="eSubToolResizeSizeInfo">10" x 7.5"</div></button>
      <button class="border" width="960" height="540.48"><div class="eSubToolResizeSizeTitle">16:9</div><div class="eSubToolResizeSizeInfo">10" x 17.8"</div></button>
    </div>
    <div class="eSubToolResizeCustomSizeHolder">
      <div class="eSubToolResizeNumberHolder" width><b>Width</b><div max="50" contenteditable></div>in</div>
      <div class="eSubToolResizeNumberHolder" height><b>Height</b><div max="50" contenteditable></div>in</div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolResizeHolder": `box-sizing: border-box; max-width: 100%; padding: 6px`,
    ".eSubToolResizeSizeHolder": `display: flex; flex-wrap: wrap; width: 336px; max-width: 100%; justify-content: center`,
    ".eSubToolResizeSizeHolder button": `box-sizing: border-box; display: flex; flex-direction: column; width: 100px; padding: 6px; margin: 6px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 12px`,
    ".eSubToolResizeSizeHolder button .eSubToolResizeSizeTitle": `color: var(--theme); font-size: 18px; font-weight: 600`,
    ".eSubToolResizeSizeHolder button .eSubToolResizeSizeInfo": `color: var(--darkGray); font-size: 15px; font-weight: 500`,
    ".eSubToolResizeSizeHolder button:hover": `--borderColor: var(--hover)`,
    ".eSubToolResizeHolder button[selected]": `--borderColor: var(--theme); background: var(--hover)`,
    ".eSubToolResizeCustomSizeHolder": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 8px; justify-content: center; align-items: center`,
    ".eSubToolResizeNumberHolder": `display: flex; flex-wrap: wrap; margin: 0px 10px; justify-content: center; align-items: center`,
    ".eSubToolResizeNumberHolder div[contenteditable]": `width: fit-content; max-width: 60px; padding: 4px 6px; margin: 6px 4px 6px 8px; --borderColor: var(--secondary); outline: unset; border: solid 3px var(--borderColor); border-radius: 20px; color: var(--theme); font-size: 16px; font-weight: 600; white-space: nowrap; overflow: hidden; transition: .2s`
  };
  async js(frame) {
    let sizeHolder = frame.querySelector(".eSubToolResizeSizeHolder");
    let sizeOptions = sizeHolder.children;
    let customSizeHolder = frame.querySelector(".eSubToolResizeCustomSizeHolder");
    let customSizeWidth = customSizeHolder.querySelector(".eSubToolResizeNumberHolder[width] div[contenteditable]");
    let customSizeHeight = customSizeHolder.querySelector(".eSubToolResizeNumberHolder[height] div[contenteditable]");

    this.redraw = (noRefresh, noTextBox) => {
      let preference = this.toolbar.getPreferenceTool();
      for (let i = 0; i < sizeOptions.length; i++) {
        let option = sizeOptions[i];
        if ((Math.floor(preference.s[0]) == Math.floor(parseFloat(option.getAttribute("width")) + (this.pageBorderSize * 2))) && (Math.floor(preference.s[1]) == Math.floor(parseFloat(option.getAttribute("height")) + (this.pageBorderSize * 2)))) {
          option.setAttribute("selected", "");
        } else {
          option.removeAttribute("selected");
        }
      }
      if (noTextBox != true) {
        customSizeWidth.textContent = Math.round(((preference.s[0] - (this.pageBorderSize * 2)) / this.ppi) * 100) / 100;
        customSizeHeight.textContent = Math.round(((preference.s[1] - (this.pageBorderSize * 2)) / this.ppi) * 100) / 100;
      }
      if (noRefresh != true) {
        this.toolbar.selection.updateActionBar();
      }
    }

    sizeHolder.addEventListener("click", async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest("button");
      if (element == null) {
        return;
      }
      let width = parseFloat(element.getAttribute("width")) + (this.pageBorderSize * 2);
      let height = parseFloat(element.getAttribute("height")) + (this.pageBorderSize * 2);
      await this.toolbar.saveSelecting(() => { return { s: [width, height] }; }, { reuseActionBar: true });
      this.redraw(true);
    });

    customSizeHolder.addEventListener("mousedown", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
    });
    customSizeHolder.addEventListener("keydown", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      if (event.key == "Enter") {
        event.preventDefault();
        return textBox.blur();
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseFloat(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key && (event.keyCode != 190 || textBox.hasAttribute("nodecimal"))) {
          event.preventDefault();
          return textBoxError(textBox, "Must be a number");
        } else if (textInt > parseFloat(textBox.getAttribute("max"))) {
          event.preventDefault();
          return textBoxError(textBox, "Must be less than or equal to " + textBox.getAttribute("max"));
        } else if (textInt < 1) {
          event.preventDefault();
          return textBoxError(textBox, "Must be greater than 1");
        }
      }
      this.redraw(null, true);
    });
    customSizeHolder.addEventListener("focusout", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      let textInt = parseFloat(textBox.textContent) ?? 0;
      if (textInt > parseFloat(textBox.getAttribute("max"))) {
        textBox.textContent = textBox.getAttribute("max");
      } else if (textInt < 1) {
        textBox.textContent = 1;
      }
    });
    let saveCustomSize = async () => {
      let widthSet = parseFloat(customSizeWidth.textContent);
      let heightSet = parseFloat(customSizeHeight.textContent);
      if (widthSet > 0 && heightSet > 0) {
        await this.toolbar.saveSelecting(() => { return { s: [
          Math.round(((widthSet * this.ppi) + (this.pageBorderSize * 2)) * 100) / 100,
          Math.round(((heightSet * this.ppi) + (this.pageBorderSize * 2)) * 100) / 100
        ] }; }, { reuseActionBar: true });
      }
      this.redraw();
    }
    customSizeWidth.addEventListener("focusout", saveCustomSize);
    customSizeHeight.addEventListener("focusout", saveCustomSize);
    
    this.redraw(true);
  }
}