modules["dropdowns/editor/tools/emojis"] = {
  maxHeight: 350,
  emojis: [
  ],
  ignoreEmojis: [
    "REVERSED HAND WITH MIDDLE FINGER EXTENDED",
    "EMOJI MODIFIER FITZPATRICK TYPE-6",
    "EMOJI MODIFIER FITZPATRICK TYPE-5",
    "EMOJI MODIFIER FITZPATRICK TYPE-4",
    "EMOJI MODIFIER FITZPATRICK TYPE-3",
    "EMOJI MODIFIER FITZPATRICK TYPE-1-2",
    "PEACH",
    "AUBERGINE",
    "BANANA"
  ],
  html: `
  <div class="eEmojiHolder">
    <div class="eEmojiSearchHolder"><img src="./images/editor/glass.svg"><input placeholder="Search Emojis"></input></div>
    <div class="eEmojiSectionHolder"></div>
  </div>
  `,
  css: {
    ".eEmojiHolder": `position: relative`,
    ".eEmojiSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".eEmojiSearchHolder img": `width: 28px; height: 28px`,
    ".eEmojiSearchHolder input": `width: 100%; max-width: calc(100% - 54px); padding: 4px 8px; margin-left: 6px; border: solid 2px var(--secondary); outline: unset; border-radius: 17px; font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eEmojiSearchHolder input::placeholder": `color: var(--secondary)`,
    ".eEmojiSectionHolder": `margin-top: 8px`,
    ".eEmojiSection": `display: block; margin-bottom: 8px`,
    ".eEmojiSectionTitle": `position: sticky; width: calc(100% - 16px); padding: 4px 8px; top: 0px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 600; font-size: 18px`,
    ".eEmojiSectionTiles": `display: flex; flex-wrap: wrap; width: 248px; max-width: calc(100% - 16px); padding: 4px 8px; gap: 4px`,
    ".eEmojiSectionTiles button": `display: none; width: 32px; height: 32px; justify-content: center; align-items: center; border-radius: 8px`,
    ".eEmojiSectionTiles button[shown]": `display: flex`,
    ".eEmojiSectionTiles button:hover": `background: var(--hover)`,
    ".eEmojiSectionTiles button img": `width: 32px; height: 32px; transform: scale(.8); object-fit: none`
  },
  sheetSize: 32 + 2,
  applyReactions: async function () {
    let editor = await getModule("pages/editor");
    if (this.emojitObject == null) {
      this.emojiObject = getObject(this.emojis, "name");
    }
    let unloadedReactions = editor.page.querySelectorAll(".eReaction[unloaded]");
    for (let i = 0; i < unloadedReactions.length; i++) {
      let reaction = unloadedReactions[i];
      let emoji = this.emojiObject[reaction.getAttribute("emoji")];
      reaction.removeAttribute("unloaded");
      reaction.title = emoji.short_name.replace(/_/g, " ");
      let image = reaction.querySelector("img");
      image.src = "./images/editor/emojis/twitter32.png";
      image.style.objectPosition = (-((emoji.sheet_x * this.sheetSize) + 1)) + "px " + (-((emoji.sheet_y * this.sheetSize) + 1)) + "px";
      image.style.objectFit = "none";
    }
  },
  js: async function (frame, extra) {
    let editor = await getModule("pages/editor");
    let dropdownModule = await getModule("dropdown");

    frame.closest(".dropdownContent").style.padding = "0px";

    let emojiSectionHolder = frame.querySelector(".eEmojiSectionHolder");

    let setHTML = {};
    let setHTMLKeys = [];
    for (let i = 0; i < this.emojis.length; i++) {
      let emoji = this.emojis[i];
      if (this.ignoreEmojis.includes(emoji.name) || emoji.has_img_twitter != true) {
        continue;
      }
      if (setHTML[emoji.category] == null) {
        setHTML[emoji.category] = "";
        setHTMLKeys.push(emoji.category);
      }
      setHTML[emoji.category] += `<button emoji="${emoji.name}" title="${emoji.short_name.replace(/_/g, " ")}" search="${emoji.short_names.toString().replace(/_/g, "")}" style="order: ${emoji.sort_order}" shown><img src="./images/editor/emojis/twitter32.png" style="object-position: ${-((emoji.sheet_x * this.sheetSize) + 1)}px ${-((emoji.sheet_y * this.sheetSize) + 1)}px"></button>`;
    }
    //let sectionHTML = "";
    for (let i = 0; i < setHTMLKeys.length; i++) {
      let category = setHTMLKeys[i];
      emojiSectionHolder.insertAdjacentHTML("afterbegin", `<div class="eEmojiSection" new>
        <div class="eEmojiSectionTitle"></div>
        <div class="eEmojiSectionTiles"></div>
      </div>`);
      emojiSection = emojiSectionHolder.querySelector(".eEmojiSection[new]");
      emojiSection.removeAttribute("new");
      emojiSection.setAttribute("category", category);
      emojiSection.querySelector(".eEmojiSectionTitle").textContent = category;
      emojiSection.querySelector(".eEmojiSectionTiles").innerHTML = setHTML[category];
      await sleep(10);
      /*sectionHTML = `<div class="eEmojiSection" category="${category}">
        <div class="eEmojiSectionTitle">${category}</div>
        <div class="eEmojiSectionTiles">${setHTML[category]}</div>
      </div>` + sectionHTML;*/
    }
    //emojiSectionHolder.innerHTML = sectionHTML;

    let searchEmoji = frame.querySelector(".eEmojiSearchHolder input");
    let emojis = emojiSectionHolder.querySelectorAll("button");
    searchEmoji.addEventListener("input", () => {
      let searchValue = searchEmoji.value.toLowerCase().replace(/ /g, "");
      for (let i = 0; i < emojis.length; i++) {
        let emoji = emojis[i];
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
      frame.setAttribute("disabled", "");
      let [code] = await sendRequest("POST", "lessons/members/reaction", {
        emoji: target.getAttribute("emoji"),
        annotation: annoID
      }, { session: editor.session });
      if ([200, 208].includes(code)) {
        dropdownModule.close();
      } else {
        frame.removeAttribute("disabled", "");
      }
    });
  }
}