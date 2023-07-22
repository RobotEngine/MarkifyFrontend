modules["dropdowns/editor/share/pin"] = {
  html: `
  <div class="eSharePinCreate">
    <button class="largeButton">Generate Pin</button>
  </div>
  <div class="eSharePinLink">Join with this <b>pin</b> at <a href="${location.origin}/join" target="_blank">${location.host}/join</a></div>
  <div class="eSharePinDisplay"><span section left></span><div></div><span section right></span></div>
  <div class="eSharePinOptions">
    <button class="eSharePinCopy" title="Copy the pin code."><img src="./images/tooltips/copy.svg"></button>
    <button class="eSharePinRemove" title="Invalidate the pin.">Remove</button>
    <button class="eShareAction" option="forceLogin" title="Require those joining to login for verified identites." off><div label>Require Login</div><div class="eShareToggle"><div></div></div></button>
  </div>
  `,
  css: {
    ".eSharePinCreate": "position: absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eSharePinCreate button": `background: var(--theme); border-radius: 20.25px; color: #fff`,
    
    ".eSharePinLink": "margin-top: 8p; transition: .3s",
    ".eSharePinLink a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    
    ".eSharePinHolder": `display: flex`,
    ".eSharePinDisplay": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: var(--theme); font-size: 60px; font-weight: 700; letter-width: 8px; transition: .3s`,
    ".eSharePinDisplay span[section]": `display: block; min-height: 81px; padding: 0 16px; margin: 10px; border: solid 4px var(--hover); border-radius: 20px; letter-spacing: 10px`,
    ".eSharePinDisplay div": `width: 12px; height: 12px; background: var(--hover); border-radius: 12px`,
    
    ".eSharePinOptions": `display: none; flex-wrap: wrap; width: calc(100% - 16px); margin: 0 8px 8px 8px; justify-content: center`,
    ".eSharePinOptions button": `display: flex; border-radius: 18px; justify-content: center; align-items: center; font-weight: 700`,
    
    ".eSharePinCopy": `width: 36px; height: 36px; padding: 0; margin: 7px; outline: solid 3px var(--hover)`,
    ".eSharePinCopy img": `width: 30px`,

    ".eSharePinRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; outline: solid 3px var(--hover); border-radius: 16px; color: var(--error); font-size: 18px`,
    ".eSharePinRemove:hover": `background: var(--error); outline-width: 0px; color: #fff`,
    //".eSharePinRemove:active": `transform: scale(.95);`,

    ".eShareAction": `display: flex; max-width: 100%; padding: 6px; margin: 7px 7px 7px auto; align-items: center; outline: solid 3px var(--hover); font-size: 16px`,
    ".eShareAction div[label]": `flex: 1; margin: 0 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eShareAction[on]": `--themeColor: var(--theme); --color: #fff`,
    ".eShareAction[off]": `--themeColor: var(--gray); --color: #000`,
    ".eShareToggle": `position: relative; width: 36px; height: 20px; padding: 2px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eShareToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eShareAction[on] .eShareToggle div": `right: 2px`,
    ".eShareAction[off] .eShareToggle div": `right: calc(100% - 22px)`,
    ".eShareAction:hover": `background: var(--themeColor); outline-width: 0px; color: var(--color)`,
    ".eShareAction:hover .eShareToggle": `background: #fff`,
    ".eShareAction:hover .eShareToggle div": `background: var(--themeColor)`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    let createHolder = frame.querySelector(".eSharePinCreate");
    let createButton = createHolder.querySelector("button");
    let pinTx = frame.querySelector(".eSharePinDisplay");
    let optionHolder = frame.querySelector(".eSharePinOptions");

    editor.updatePin = () => {
      let currentPin = (editor.lesson.pin || "123456").split("");
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
    let removeButton = frame.querySelector(".eSharePinRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/pin/remove", null, { session: editor.session });
      if (code == 200) {
        editor.lesson.pin = null;
        editor.updatePin();
      }
      removeButton.removeAttribute("disabled");
    });
    frame.querySelector(".eSharePinCopy").addEventListener("click", async () => {
      copyClipboardText(editor.lesson.pin, "pin");
    });

    if (editor.getSelf().access < 2) {
      createButton.setAttribute("disabled", "");
      optionHolder.remove();
    }
  }
}