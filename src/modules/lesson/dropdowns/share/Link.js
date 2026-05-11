import { account, sendRequest, copyClipboardText } from "@/crucial";

import { Frame as OptionsDropdown } from "./Options";

import viewerIcon from "@assets/lesson/share/viewer.svg?raw";
import editorIcon from "@assets/lesson/share/editor.svg?raw";
import { copy as copyIcon } from "@modules/utility/core-icons";

class EmbedDropdown {
  html = `
  <div class="eShareLinkEmbedLocked">
    <div>Embedding only works when "Require Login" is disabled</div>
    <button class="largeButton border">Turn Off Require Login</button>
  </div>
  <div class="eShareLinkEmbedHolder">
    <textarea class="eShareLinkEmbedText" readonly spellcheck="false"></textarea>
    <div class="eShareLinkEmbedInstructions">Click above to copy the embed code</div>
  </div>
  `;
  css = {
    ".eShareLinkEmbedLocked": "position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .85); transition: .3s",
    ".eShareLinkEmbedLocked div": `max-width: 350px; margin-bottom: 18px; font-size: 18px; font-weight: 600`,
    ".eShareLinkEmbedLocked button": `background: var(--theme); --borderRadius: 14px; color: #fff`,
    ".eShareLinkEmbedHolder": `display: flex; flex-direction: column; width: 364px; max-width: 100%; margin: 6px`,
    ".eShareLinkEmbedText": `box-sizing: border-box; width: 100%; height: 126px; border: solid 3px var(--hover); outline: unset; border-radius: 21px; padding: 8px; background: var(--pageColor); color: var(--theme); font-size: 14px; font-weight: 600; font-family: var(--font); resize: none; cursor: copy; user-select: all`,
    ".eShareLinkEmbedInstructions": `margin-top: 6px; font-size: 15px; font-weight: 500`
  };
  js(frame, extra) {
    let lesson = extra.parent.parent;
    let disabledHolder = frame.querySelector(".eShareLinkEmbedLocked");
    let disableRequireLogin = disabledHolder.querySelector(".largeButton");
    let holder = frame.querySelector(".eShareLinkEmbedHolder");
    let linkTx = holder.querySelector(".eShareLinkEmbedText");

    let updateEnabled = async () => {
      if (lesson.lesson.settings != null && lesson.lesson.settings.forceLogin != true) {
        disabledHolder.style.opacity = 0;
        disabledHolder.style.pointerEvents = "none";
      } else {
        disabledHolder.style.opacity = 1;
        disabledHolder.style.pointerEvents = "all";
      }
    }
    extra.parent.pipeline.subscribe("shareLessonSet", "set", (body) => {
      if (body.settings != null && body.settings.hasOwnProperty("forceLogin") == true) {
        updateEnabled();
      }
    }, { unsubscribe: true });
    updateEnabled();
    
    holder.addEventListener("click", () => {
      copyClipboardText(linkTx.value, "code");
      linkTx.select();
    });
    linkTx.value = `<iframe width="600" height="400" style="border: unset" src="https://markifyapp.com/embed/?lesson=${lesson.id}" allowfullscreen></iframe>`;

    disableRequireLogin.addEventListener("click", async () => {
      disableRequireLogin.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "forceLogin", value: false }, { session: lesson.session });
      disableRequireLogin.removeAttribute("disabled");
    });
  }
}

export class Frame {
  html = `
  <div class="eShareLinkCreate">
    <button class="largeButton border">Enable Link</button>
  </div>
  <div class="eShareLinkRow" style="margin-top: 0px">
    <input class="eShareLinkSection" readonly spellcheck="false"></input>
    <button class="eShareLinkCopy border" title="Copy the link.">${copyIcon}</button>
  </div>
  <button class="eShareLinkRow eShareLinkPerm buttonAnim">
    <div class="eShareLinkIcon"></div>
    <div class="eShareDetailsHolder">
      <div class="eShareDetailTitle"></div>
      <div class="eShareDetailDesc"></div>
    </div>
  </button>
  <div class="eShareLinkRow">
    <button class="eShareLinkRemove border" title="Invalidate the link.">Private</button>
    <button class="eShareLinkEmbed border" title="Get the embed code for a lesson.">Embed</button>
    <button class="eShareOptionLink border" title="Configurable options for members who join.">Options</button>
  </div>
  `;
  css = {
    ".eShareLinkCreate": "position: absolute; display: flex; width: calc(100% - 16px); height: calc(100% - 16px); justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .85); transition: .3s",
    ".eShareLinkCreate button": `background: var(--theme); --borderRadius: 14px; color: #fff`,

    ".eShareLinkRow": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 16px; justify-content: center; align-items: center`,
    ".eShareLinkRow button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,
    ".eShareLinkRow button:active": `transform: scale(.98)`,

    ".eShareLinkSection": `box-sizing: border-box; width: calc(100% - 50px); height: 42px; margin-right: 8px; border: solid 3px var(--hover); outline: unset; border-radius: 21px; padding: 8px; background: var(--pageColor); color: var(--theme); font-size: 18px; font-weight: 700; font-family: var(--font); cursor: copy; user-select: all`,
    ".eShareLinkCopy": `width: 36px; height: 36px; padding: 0; margin: 3px; --borderWidth: 3px`,
    ".eShareLinkCopy svg": `width: 30px; transition: .1s`,
    ".eShareLinkCopy:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eShareLinkCopy:hover svg": `filter: brightness(0) invert(1)`,

    ".eShareLinkPerm": `box-sizing: border-box; max-width: 360px; padding: 6px; align-items: flex-start; border-radius: 24px`,
    ".eShareLinkIcon": `width: 36px; height: 36px`,
    ".eShareLinkIcon svg": `width: 100%; height: 100%`,
    ".eShareDetailsHolder": `flex: 1; margin-left: 8px; text-align: left`,
    ".eShareDetailTitle": `color: var(--theme); font-size: 16px; font-weight: 600`,

    ".eShareLinkRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eShareLinkRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".eShareLinkEmbed": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareLinkEmbed:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".eShareOptionLink": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionLink:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`
  };
  js(frame, extra) {
    frame.style.padding = "8px";

    let parent = extra.parent;
    let lesson = parent.parent;

    let createHolder = frame.querySelector(".eShareLinkCreate");
    let createButton = createHolder.querySelector("button");
    let linkTx = frame.querySelector(".eShareLinkSection");
    let accessButton = frame.querySelector(".eShareLinkPerm");
    let accessIcon = accessButton.querySelector(".eShareLinkIcon");
    let accessTitle = accessButton.querySelector(".eShareDetailTitle");
    let accessDesc = accessButton.querySelector(".eShareDetailDesc");

    let copyButton = frame.querySelector(".eShareLinkCopy");
    copyButton.addEventListener("click", async () => {
      copyClipboardText("https://" + linkTx.value, "link");
    });

    let updateLink = async () => {
      if (lesson.lesson.access != null && lesson.lesson.access > -1) {
        createHolder.style.opacity = 0;
        createHolder.style.pointerEvents = "none";
      } else {
        createHolder.style.opacity = 1;
        createHolder.style.pointerEvents = "all";
      }
      accessIcon.innerHTML = "<div></div>";
      if (lesson.lesson.access != 1) {
        // Viewer:
        accessIcon.querySelector("div").innerHTML = viewerIcon;
        accessTitle.textContent = "Public View Access";
        accessDesc.textContent = "Anyone with this link will be able to view the document, but not make any edits.";
      } else {
        // Editor:
        accessIcon.querySelector("div").innerHTML = editorIcon;
        accessTitle.textContent = "Public Edit Access";
        accessDesc.textContent = "Anyone with this link will be able to view the document and create annotations.";
      }
      if (lesson.lesson.settings == null || lesson.lesson.settings.forceLogin != true || account.tenant == null || account.tenant.flags == null || account.tenant.flags.require_login_link_auth_classlink != true) {
        linkTx.value = "markify.app/join?lesson=" + lesson.id;
      } else {
        linkTx.value = "markify.app/join?lesson=" + lesson.id + "&auth=classlink";
      }
    }
    parent.pipeline.subscribe("shareLessonSet", "set", (body) => {
      if (body.hasOwnProperty("access") == true) {
        updateLink();
      }
    }, { unsubscribe: true });
    updateLink();
    
    createButton.addEventListener("click", async () => {
      createButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/share/link/enable", null, { session: lesson.session });
      if (code == 200) {
        lesson.lesson.access = body.access;
        updateLink();
      }
      createButton.removeAttribute("disabled");
    });
    accessButton.addEventListener("click", async () => {
      accessButton.setAttribute("disabled", "");
      let newValue = 1;
      let existingValue = lesson.lesson.access;
      if (existingValue == 1) {
        newValue = 0;
      }
      lesson.lesson.access = newValue;
      updateLink();
      let [code] = await sendRequest("PUT", "lessons/setting", { set: "publicAccess", value: newValue }, { session: lesson.session });
      if (code != 200) {
        lesson.lesson.access = existingValue;
        updateLink();
      }
      updateLink();
      accessButton.removeAttribute("disabled");
    });
    let removeButton = frame.querySelector(".eShareLinkRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/link/remove", null, { session: lesson.session });
      if (code == 200) {
        delete lesson.lesson.access;
        updateLink();
      }
      removeButton.removeAttribute("disabled");
    });

    let embedButton = frame.querySelector(".eShareLinkEmbed");
    embedButton.addEventListener("click", async () => {
      this.open(embedButton, EmbedDropdown, { parent: parent });
    });

    let optionsButton = frame.querySelector(".eShareOptionLink");
    optionsButton.addEventListener("click", async () => {
      this.open(optionsButton, OptionsDropdown, { parent: parent });
    });
  }
}