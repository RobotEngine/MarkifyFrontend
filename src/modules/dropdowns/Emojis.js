import { sleep, getObject } from "@/crucial";

import { emojis, ignoreEmojis, sheetSize } from "../utility/emojis";

import { search as searchIcon } from "@modules/utility/core-icons";

const SPRITE_SHEET = "../images/editor/emojis/twitter32.png";

export class Frame {
  maxHeight = 350;

  html = `
  <div class="eEmojiHolder">
    <div class="eEmojiSearchHolder">${searchIcon}<input placeholder="Search Emojis"></input></div>
    <div class="eEmojiSectionHolder"></div>
  </div>
  `;
  css = {
    ".eEmojiHolder": `position: relative`,
    ".eEmojiSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".eEmojiSearchHolder svg": `width: 28px; height: 28px; --theme: var(--secondary)`,
    ".eEmojiSearchHolder input": `width: 100%; max-width: calc(100% - 54px); padding: 4px 8px; margin-left: 6px; background: unset; border: solid 2px var(--secondary); outline: unset; border-radius: 17px; color: var(--textColor); font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eEmojiSearchHolder input::placeholder": `color: var(--secondary)`,
    ".eEmojiSectionHolder": `margin-top: 8px`,
    ".eEmojiSection": `display: block; margin-bottom: 8px`,
    ".eEmojiSectionTitle": `position: sticky; width: calc(100% - 16px); padding: 4px 8px; top: 0px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 600; font-size: 18px`,
    ".eEmojiSectionTiles": `display: flex; flex-wrap: wrap; width: 248px; max-width: calc(100% - 16px); padding: 0 8px; gap: 4px`,
    ".eEmojiSectionTiles button": `display: none; width: 32px; height: 32px; justify-content: center; align-items: center; border-radius: 8px`,
    ".eEmojiSectionTiles button[shown]": `display: flex`,
    ".eEmojiSectionTiles button:hover": `background: var(--hover)`,
    ".eEmojiSectionTiles button img": `width: 32px; height: 32px; transform: scale(.8); object-fit: none`
  };
  js = async (frame, extra) => {
    let recent = extra.recent ?? [];
    let callback = extra.callback;

    this.dropdown.maxHeight = this.maxHeight; // Force max height to get set!

    let emojiData = await emojis;

    frame.closest(".dropdownContent").style.padding = "0px";

    let emojiSectionHolder = frame.querySelector(".eEmojiSectionHolder");

    let setHTML = { Recent: "" };
    let setHTMLKeys = [];
    for (let i = 0; i < emojiData.length; i++) {
      let emoji = emojiData[i];
      if (ignoreEmojis.includes(emoji.name) || emoji.has_img_twitter != true) {
        continue;
      }
      if (setHTML[emoji.category] == null) {
        setHTML[emoji.category] = "";
        setHTMLKeys.push(emoji.category);
      }
      let emojiTitle = emoji.short_name.replace(/_/g, " ");
      let emojiSearch = emoji.short_names.toString().replace(/_/g, "");
      let emojiX = -((emoji.sheet_x * sheetSize) + 1);
      let emojiY = -((emoji.sheet_y * sheetSize) + 1);
      setHTML[emoji.category] += `<button emoji="${emoji.name}" title="${emojiTitle}" search="${emojiSearch}" style="order: ${emoji.sort_order}" shown><img src="${SPRITE_SHEET}" style="object-position: ${emojiX}px ${emojiY}px"></button>`;
      
      let recentIndex = recent.indexOf(emoji.name);
      if (recentIndex > -1) {
        setHTML["Recent"] += `<button emoji="${emoji.name}" title="${emojiTitle}" search="${emojiSearch}" style="order: ${recentIndex}" shown><img src="${SPRITE_SHEET}" style="object-position: ${emojiX}px ${emojiY}px"></button>`;
      }
    }
    setHTMLKeys.push("Recent");

    for (let i = 0; i < setHTMLKeys.length; i++) {
      let category = setHTMLKeys[i];
      emojiSectionHolder.insertAdjacentHTML("afterbegin", `<div class="eEmojiSection" new>
        <div class="eEmojiSectionTitle"></div>
        <div class="eEmojiSectionTiles"></div>
      </div>`);
      let emojiSection = emojiSectionHolder.querySelector(".eEmojiSection[new]");
      emojiSection.removeAttribute("new");
      emojiSection.setAttribute("category", category);
      emojiSection.querySelector(".eEmojiSectionTitle").textContent = category;
      emojiSection.querySelector(".eEmojiSectionTiles").innerHTML = setHTML[category];
      await sleep(10);
    }

    let searchEmoji = frame.querySelector(".eEmojiSearchHolder input");
    let emojiElements = emojiSectionHolder.querySelectorAll("button");
    searchEmoji.addEventListener("input", () => {
      let searchValue = searchEmoji.value.toLowerCase().replace(/ /g, "");
      for (let i = 0; i < emojiElements.length; i++) {
        let emoji = emojiElements[i];
        if (emoji.getAttribute("search").includes(searchValue) == true) {
          emoji.setAttribute("shown", "");
        } else {
          emoji.removeAttribute("shown");
        }
        if (emoji.parentElement.querySelector("button[shown]") == null) {
          emoji.parentElement.parentElement.style.display = "none";
        } else {
          emoji.parentElement.parentElement.style.display = "block";
        }
      }
    });

    frame.querySelector(".eEmojiSectionHolder").addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      target = target.closest("button[emoji]");
      if (target == null) {
        return;
      }
      let annoID = extra.button.closest(".eAnnotation").getAttribute("anno");
      if (annoID.startsWith("pending_") == true) {
        return;
      }
      if (callback != null) {
        frame.setAttribute("disabled", "");
        let success = await callback(target.getAttribute("emoji"));
        if (success == true) {
          this.close();
        } else {
          frame.removeAttribute("disabled", "");
        }
      }
    });
  }
}