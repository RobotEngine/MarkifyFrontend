import { sendRequest, copyClipboardText } from "@/crucial";

import { Frame as OptionsDropdown } from "./Options";

import { copy as copyIcon } from "@modules/utility/core-icons";

export class Frame {
  html = `
  <div class="eSharePinCreate">
    <button class="largeButton border">Generate Pin</button>
  </div>
  <div class="eSharePinLink">Join with this pin at <a href="https://markify.app" target="_blank">markify.app</a></div>
  <div class="eSharePinDisplay"><span section left></span><div></div><span section right></span></div>
  <div class="eSharePinOptions">
    <button class="eSharePinCopy largeButton border" title="Copy the pin code.">${copyIcon}</button>
    <button class="eSharePinRemove largeButton border" title="Invalidate the pin.">Remove</button>
    <button class="eShareOptionPin largeButton border" title="Configurable options for members who join.">Options</button>
  </div>
  `;
  css = {
    ".eSharePinCreate": "position: absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .85); transition: .3s",
    ".eSharePinCreate button": `background: var(--theme); --borderRadius: 14px; color: #fff`,
    
    ".eSharePinLink": "margin-top: 8p; transition: .3s",
    ".eSharePinLink a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    
    ".eSharePinHolder": `display: flex`,
    ".eSharePinDisplay": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: var(--theme); font-size: 60px; font-weight: 700; letter-width: 8px; transition: .3s`,
    ".eSharePinDisplay span[section]": `display: block; min-height: 74px; padding: 0 12px; margin: 10px; border: solid 4px var(--hover); border-radius: 20px`,
    ".eSharePinDisplay span[section] span": `display: inline-block; height: 74px; margin: 0 4px`,
    ".eSharePinDisplay div": `width: 12px; height: 12px; background: var(--hover); border-radius: 12px`,
    
    ".eSharePinOptions": `display: none; flex-wrap: wrap; width: calc(100% - 16px); margin: 0 8px 8px 8px; justify-content: center`,
    ".eSharePinOptions button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,
    ".eSharePinOptions button:active": `transform: scale(.98)`,

    ".eSharePinCopy": `width: 36px; height: 36px; padding: 0; margin: 7px; --borderWidth: 3px`,
    ".eSharePinCopy svg": `width: 30px; transition: .1s`,
    ".eSharePinCopy:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eSharePinCopy:hover svg": `filter: brightness(0) invert(1)`,

    ".eSharePinRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eSharePinRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,

    ".eShareOptionPin": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionPin:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`
  };
  js(frame, extra) {
    let parent = extra.parent;
    let lesson = parent.parent;
    let editor = extra.editor;

    let createHolder = frame.querySelector(".eSharePinCreate");
    let createButton = createHolder.querySelector("button");
    let pinTx = frame.querySelector(".eSharePinDisplay");
    let optionHolder = frame.querySelector(".eSharePinOptions");
    let titleTx = frame.closest(".dropdown").querySelector(".dropdownTitle div");

    let updatePin = async () => {
      let currentPin = (lesson.lesson.pin ?? "123456").split("");
      let left = "";
      let right = "";
      for (let i = 0; i < currentPin.length; i++) {
        let char = currentPin[i];
        let charHTML = "";
        if (parseInt(char) < 10) {
          charHTML = '<span style="color: var(--secondary)">' + char + '</span>';
        } else {
          charHTML = '<span>' + char + '</span>';
        }
        if (i < 3) {
          left += charHTML;
        } else {
          right += charHTML;
        }
      }
      pinTx.querySelector("span[left]").innerHTML = left;
      pinTx.querySelector("span[right]").innerHTML = right;
      if (lesson.lesson.pin != null) {
        optionHolder.style.display = "flex";
        createHolder.style.opacity = 0;
        createHolder.style.pointerEvents = "none";
      } else {
        optionHolder.style.display = "none";
        createHolder.style.opacity = 1;
        createHolder.style.pointerEvents = "all";
      }
      if (titleTx.querySelector("b") == null) {
        titleTx.innerHTML = lesson.lesson.pin ?? "";
      }
    }
    parent.pipeline.subscribe("shareLessonSet", "set", (body) => {
      if (body.hasOwnProperty("pin") == true) {
        updatePin();
      }
    }, { unsubscribe: true });
    updatePin();
    
    createButton.addEventListener("click", async () => {
      createButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/share/pin/generate", null, { session: lesson.session });
      if (code == 200) {
        lesson.lesson.pin = body.pin;
        updatePin();
      }
      createButton.removeAttribute("disabled");
    });

    let copyButton = frame.querySelector(".eSharePinCopy");
    copyButton.addEventListener("click", async () => {
      copyClipboardText(lesson.lesson.pin, "pin");
    });

    let removeButton = frame.querySelector(".eSharePinRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/pin/remove", null, { session: lesson.session });
      if (code == 200) {
        lesson.lesson.pin = null;
        updatePin();
        if (extra.button.className == "eSharePin") {
          this.close();
        }
      }
      removeButton.removeAttribute("disabled");
    });

    let optionsButton = frame.querySelector(".eShareOptionPin");
    optionsButton.addEventListener("click", async () => {
      this.open(optionsButton, OptionsDropdown, { parent: parent });
    });

    if (lesson.self != null && lesson.self.access < 4) {
      createButton.setAttribute("disabled", "");
      optionHolder.remove();
    }
  }
}