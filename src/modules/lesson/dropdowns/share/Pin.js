import { sendRequest, copyClipboardText } from "@/crucial";

import { modal as modalModule } from "@modules/utility/Modal";

import { Frame as OptionsDropdown } from "./Options";

import enlargeIcon from "@assets/lesson/share/enlarge.svg?raw";
import { copy as copyIcon } from "@modules/utility/core-icons";

class EnlargeModal {
  html = `<div class="eSharePinEnlargeHolder">
  <div class="eSharePinEnlargeLink">Join with this pin at <a href="https://markify.app" target="_blank">markify.app</a></div>
  <div class="eSharePinEnlargeDisplay"><span section left></span><div></div><span section right></span></div>
  </div>`; //<div class="eSharePinEnlargeClose">Click anywhere to close...</div>
  css = {
    ".eSharePinEnlargeHolder": `display: flex; flex-direction: column; align-items: center`,
    ".eSharePinEnlargeLink": "--fontSize: clamp(14px, 2vw, 32px); width: fit-content; font-size: var(--fontSize); padding: calc(var(--fontSize) / 2.5) calc(var(--fontSize) / 1.5); background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: calc(var(--fontSize) * 2)",
    ".eSharePinEnlargeLink a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    ".eSharePinEnlargeDisplay": `--fontSize: clamp(60px, 8vw, 150px); display: flex; flex-wrap: wrap; margin-top: 16px; justify-content: center; align-items: center; color: var(--theme); font-size: var(--fontSize); font-weight: 700; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: calc((var(--fontSize) / 3) + ((var(--fontSize) / 16) * 2))`,
    ".eSharePinEnlargeDisplay span[section]": `display: block; min-height: 74px; padding: 0 calc(var(--fontSize) / 5); margin: calc(var(--fontSize) / 6); border: solid 4px var(--hover); border-radius: calc(var(--fontSize) / 3)`,
    ".eSharePinEnlargeDisplay span[section] span": `display: inline-block; margin: 0 calc(var(--fontSize) / 16)`,
    ".eSharePinEnlargeDisplay div": `width: calc(var(--fontSize) / 5); height: calc(var(--fontSize) / 5); background: var(--hover); border-radius: calc(var(--fontSize) / 5)`,
    //".eSharePinEnlargeClose": `padding: 4px 10px; margin-top: 16px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px`
  };
  js(frame, { parent, lesson }) {
    let modal = frame.closest(".modal");
    modal.style.boxShadow = "unset";
    let modalOverflow = modal.querySelector(".modalOverflow");
    modalOverflow.style.background = "unset";
    modalOverflow.style.overflow = "visible";

    modal.closest(".fixedItemHolder").addEventListener("click", (event) => {
      if (event.target.closest(".modal") != modal) {
        this.close();
      }
    });

    let pinTx = frame.querySelector(".eSharePinEnlargeDisplay");

    let updatePin = () => {
      if (lesson.lesson.pin == null) {
        this.close();
      }

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
    }

    parent.pipeline.subscribe("shareLessonModalSet", "set", (body) => {
      if (body.hasOwnProperty("pin") == true) {
        updatePin();
      }
    }, { unsubscribe: true });

    updatePin();
  }
}

export class Frame {
  html = `
  <div class="eSharePinCreate">
    <button class="largeButton border">Generate Pin</button>
  </div>
  <div class="eSharePinLink">Join with this pin at <a href="https://markify.app" target="_blank">markify.app</a></div>
  <div class="eSharePinDisplay"><span section left></span><div></div><span section right></span></div>
  <div class="eSharePinOptions">
    <button class="eSharePinRoundButton eSharePinEnlarge largeButton border" title="Show the pin code larger.">${enlargeIcon}</button>
    <button class="eSharePinRoundButton eSharePinCopy largeButton border" title="Copy the pin code.">${copyIcon}</button>
    <button class="eSharePinRemove largeButton border" title="Invalidate the pin.">Remove</button>
    <button class="eShareOptionPin largeButton border" title="Configurable options for members who join.">Options</button>
  </div>
  `;
  css = {
    ".eSharePinCreate": "position: absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .85); transition: .3s",
    ".eSharePinCreate button": `background: var(--theme); --borderRadius: 14px; color: #fff`,
    
    ".eSharePinLink": "margin-top: 8px",
    ".eSharePinLink a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    
    ".eSharePinDisplay": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: var(--theme); font-size: 60px; font-weight: 700; transition: .3s`,
    ".eSharePinDisplay span[section]": `display: block; min-height: 74px; padding: 0 12px; margin: 10px; border: solid 4px var(--hover); border-radius: 20px`,
    ".eSharePinDisplay span[section] span": `display: inline-block; height: 74px; margin: 0 4px`,
    ".eSharePinDisplay div": `width: 12px; height: 12px; background: var(--hover); border-radius: 12px`,
    
    ".eSharePinOptions": `display: none; flex-wrap: wrap; width: calc(100% - 16px); margin: 0 8px 8px 8px; justify-content: center`,
    ".eSharePinOptions button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,
    ".eSharePinOptions button:active": `transform: scale(.98)`,

    ".eSharePinRoundButton": `width: 36px; height: 36px; padding: 0; margin: 7px; --borderWidth: 3px`,
    ".eSharePinRoundButton svg": `width: 30px; height: 30px; transition: .1s`,
    ".eSharePinRoundButton:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eSharePinRoundButton:hover svg": `filter: brightness(0) invert(1)`,

    ".eSharePinRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eSharePinRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,

    ".eShareOptionPin": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionPin:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`
  };
  js(frame, extra) {
    let parent = extra.parent;
    let lesson = parent.parent;

    let createHolder = frame.querySelector(".eSharePinCreate");
    let createButton = createHolder.querySelector("button");
    let pinTx = frame.querySelector(".eSharePinDisplay");
    let optionHolder = frame.querySelector(".eSharePinOptions");
    let titleTx = frame.closest(".dropdown").querySelector(".dropdownTitle div");

    let updatePin = () => {
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

    let enlargeButton = frame.querySelector(".eSharePinEnlarge");
    enlargeButton.addEventListener("click", () => {
      modalModule.open(EnlargeModal, enlargeButton, { parent, lesson, title: "" });
      this.close();
    });

    let copyButton = frame.querySelector(".eSharePinCopy");
    copyButton.addEventListener("click", () => {
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
    optionsButton.addEventListener("click", () => {
      this.open(optionsButton, OptionsDropdown, { parent: parent });
    });

    if (lesson.self != null && lesson.self.access < 4) {
      createButton.setAttribute("disabled", "");
      optionHolder.remove();
    }
  }
}