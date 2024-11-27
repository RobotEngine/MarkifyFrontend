modules["dropdowns/editor/share/pin"] = {
  html: `
  <div class="eSharePinCreate">
    <button class="largeButton border">Generate Pin</button>
  </div>
  <div class="eSharePinLink">Join with this <b>pin</b> at <a href="https://markify.link" target="_blank">markify.link</a></div>
  <div class="eSharePinDisplay"><span section left></span><div></div><span section right></span></div>
  <div class="eSharePinOptions">
    <button class="eSharePinCopy border" title="Copy the pin code."><img src="./images/tooltips/copy.svg"></button>
    <button class="eSharePinRemove border" title="Invalidate the pin.">Remove</button>
    <button class="eShareOptionPin border" dropdown="dropdowns/editor/share/options" title="Configurable options for members who join.">Options</button>
  </div>
  `,
  css: {
    ".eSharePinCreate": "position: absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eSharePinCreate button": `background: var(--theme); --borderRadius: 20.25px; color: #fff`,
    
    ".eSharePinLink": "margin-top: 8p; transition: .3s",
    ".eSharePinLink a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    
    ".eSharePinHolder": `display: flex`,
    ".eSharePinDisplay": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: var(--theme); font-size: 60px; font-weight: 700; letter-width: 8px; transition: .3s`,
    ".eSharePinDisplay span[section]": `display: block; min-height: 81px; padding: 0 16px; margin: 10px; border: solid 4px var(--hover); border-radius: 20px; letter-spacing: 10px`,
    ".eSharePinDisplay div": `width: 12px; height: 12px; background: var(--hover); border-radius: 12px`,
    
    ".eSharePinOptions": `display: none; flex-wrap: wrap; width: calc(100% - 16px); margin: 0 8px 8px 8px; justify-content: center`,
    ".eSharePinOptions button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,
    
    ".eSharePinCopy": `width: 36px; height: 36px; padding: 0; margin: 7px; --borderWidth: 3px`,
    ".eSharePinCopy img": `width: 30px; transition: .1s`,
    ".eSharePinCopy:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eSharePinCopy:hover img": `filter: brightness(0) invert(1)`,

    ".eSharePinRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eSharePinRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,

    ".eShareOptionPin": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionPin:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`

    /*
    ".eShareActionPin": `display: flex; max-width: 100%; padding: 6px; margin: 7px 7px 7px auto; align-items: center; --borderWidth: 3px; font-size: 16px`,
    ".eShareActionPin div[label]": `flex: 1; margin: 0 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eShareActionPin[on]": `--themeColor: var(--theme); --color: #fff`,
    ".eShareActionPin[off]": `--themeColor: var(--gray); --color: #000`,
    ".ePinToggle": `position: relative; width: 36px; height: 20px; padding: 2px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".ePinToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eShareActionPin[on] .ePinToggle div": `right: 2px`,
    ".eShareActionPin[off] .ePinToggle div": `right: calc(100% - 22px)`,
    ".eShareActionPin:hover": `background: var(--themeColor); --borderWidth: 0px; transform: scale(1.1); color: var(--color)`,
    ".eShareActionPin:hover .ePinToggle": `background: #fff`,
    ".eShareActionPin:hover .ePinToggle div": `background: var(--themeColor)`
    */
  },
  js: async function (frame, extra) {
    let editor = await getModule("pages/editor");
    let dropdownModule = await getModule("dropdown");

    let createHolder = frame.querySelector(".eSharePinCreate");
    let createButton = createHolder.querySelector("button");
    let pinTx = frame.querySelector(".eSharePinDisplay");
    let optionHolder = frame.querySelector(".eSharePinOptions");
    let titleTx = frame.closest(".dropdown").querySelector(".dropdownTitle div");

    /*
    let actionButton = frame.querySelector(".eShareActionPin");
    let updateAction = () => {
      if (editor.lesson.settings.forceLogin == true) {
        actionButton.setAttribute("on", "");
        actionButton.removeAttribute("off");
      } else {
        actionButton.setAttribute("off", "");
        actionButton.removeAttribute("on");
      }
    }
    updateAction();
    */

    editor.updatePin = async () => {
      let currentPin = (editor.lesson.pin ?? "123456").split("");
      let left = "";
      let right = "";
      for (let i = 0; i < currentPin.length; i++) {
        let char = currentPin[i];
        let charHTML = char;
        if (parseInt(char) < 10) {
          charHTML = `<span style="color: var(--secondary)">${char}</span>`;
        }
        if (i < 3) {
          left += charHTML;
        } else {
          right += charHTML;
        }
      }
      pinTx.querySelector("span[left]").innerHTML = left;
      pinTx.querySelector("span[right]").innerHTML = right;
      if (editor.lesson.pin != null) {
        optionHolder.style.display = "flex";
        createHolder.style.opacity = 0;
        createHolder.style.pointerEvents = "none";
      } else {
        optionHolder.style.display = "none";
        createHolder.style.opacity = 1;
        createHolder.style.pointerEvents = "all";
      }
      if (titleTx.querySelector("b") == null) {
        titleTx.innerHTML = editor.lesson.pin ?? "";
      }
      //updateAction();
    }
    editor.updatePin();
    createButton.addEventListener("click", async () => {
      createButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/share/pin/generate", null, { session: editor.session });
      if (code == 200) {
        editor.lesson.pin = body.pin;
        editor.updatePin();
      }
      createButton.removeAttribute("disabled");
    });
    frame.querySelector(".eSharePinCopy").addEventListener("click", async () => {
      copyClipboardText(editor.lesson.pin, "pin");
    });
    let removeButton = frame.querySelector(".eSharePinRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/pin/remove", null, { session: editor.session });
      if (code == 200) {
        editor.lesson.pin = null;
        editor.updatePin();
        if (extra.button.className == "eSharePin") {
          dropdownModule.close();
        }
      }
      removeButton.removeAttribute("disabled");
    });
    /*
    actionButton.addEventListener("click", async () => {
      actionButton.setAttribute("disabled", "");
      if (editor.lesson.settings.forceLogin == true) {
        actionButton.setAttribute("off", "");
        actionButton.removeAttribute("on");
      } else {
        actionButton.setAttribute("on", "");
        actionButton.removeAttribute("off");
      }
      let [code] = await sendRequest("PUT", "lessons/setting", { set: "forceLogin", value: actionButton.hasAttribute("on") }, { session: editor.session });
      if (code != 200) {
        updateAction();
      }
      actionButton.removeAttribute("disabled");
    });
    */

    if (editor.getSelf().access < 2) {
      createButton.setAttribute("disabled", "");
      optionHolder.remove();
    }
  }
}