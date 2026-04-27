import { getObject } from "../../crucial";

import { emojis, ignoreEmojis, sheetSize } from "../utility/emojis";

export class Frame {
  maxHeight = 350;

  constructor() {
    this.emojiObject = getObject(emojis, "name");
  }

  html = `
  <div class="eEmojiHolder">
    <div class="eEmojiSearchHolder"><img src="../images/editor/glass.svg"><input placeholder="Search Emojis"></input></div>
    <div class="eEmojiSectionHolder"></div>
  </div>
  `;
  css = {
    ".eEmojiHolder": `position: relative`,
    ".eEmojiSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".eEmojiSearchHolder img": `width: 28px; height: 28px`,
    ".eEmojiSearchHolder input": `width: 100%; max-width: calc(100% - 54px); padding: 4px 8px; margin-left: 6px; background: unset; border: solid 2px var(--secondary); outline: unset; border-radius: 17px; color: var(--textColor); font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eEmojiSearchHolder input::placeholder": `color: var(--secondary)`,
    ".eEmojiSectionHolder": `margin-top: 8px`,
    ".eEmojiSection": `display: block; margin-bottom: 8px`,
    ".eEmojiSectionTitle": `position: sticky; width: calc(100% - 16px); padding: 4px 8px; top: 0px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 600; font-size: 18px`,
    ".eEmojiSectionTiles": `display: flex; flex-wrap: wrap; width: 248px; max-width: calc(100% - 16px); padding: 4px 8px; gap: 4px`,
    ".eEmojiSectionTiles button": `display: none; width: 32px; height: 32px; justify-content: center; align-items: center; border-radius: 8px`,
    ".eEmojiSectionTiles button[shown]": `display: flex`,
    ".eEmojiSectionTiles button:hover": `background: var(--hover)`,
    ".eEmojiSectionTiles button img": `width: 32px; height: 32px; transform: scale(.8); object-fit: none`
  };
  js = async (frame, extra) => {

  }
}