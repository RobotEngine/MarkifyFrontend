modules["modals/updates/oct-4-2024"] = {
  maxHeight: 650,
  html: `
  <div class="umFrame">
    <div class="umVideoHolder">
      <div style="aspect-ratio: 16/9">
        <iframe type="text/html" width="720" height="405"
        src="https://www.youtube.com/embed/ubsSrCZzydQ?autoplay=1&loop=1&mute=1&playlist=ubsSrCZzydQ"
        frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="umContent">
      <strong>Wraping Up Quarter #1</strong>
      <span>October 4, 2024</span>
      <p>The end of the first quarter is right around the corner... Can you believe the school year is already 25% through?</br>Oh, you can... gotcha 😐</p>
      <div break style="--themeColor: var(--green)">SWEET BUT SHORT SURVEY<div></div></div>
      <p>If you can spare 5 to 10 minutes, it would REALLY go a long way to hear your feedback on our short <a href="https://form.jotform.com/242767399821067" target="_blank" style="color: var(--green)">questionnaire</a>! Thank you!</p>
      <div break style="--themeColor: var(--theme)">NEW STUFF!<div></div></div>
      <ul>
        <li>Introducing... <b>Pages in Freeboard!</b> You can now add pages anywhere on the unlimited canvas, along with import your PDFs. Anything placed on a page sticks, and when you duplicate, everything on it gets duplicated! Perfect for creating multiple copies for individual or group work.</li>
        <li><b>Interactive Embeds</b> let you embed a wide variety of websites directly into your lesson! Members can interact and use the embedded website without ever leaving Markify. Find it under the "media" tool.</li>
        <li><b>Anonymous Mode</b> is helping to make all classrooms inclusive, even for shy students. When enabled, the cursor names and colors are hidden from view.</li>
        <li><b>Remove Editor</b> directly from an annotation! Did someone put something off task or inappropriate? Just click their annotation, see who it is, and revoke editor in one click!</li>
      </ul>
      <p>Of course, there have been so many more bug fixes and quality-of-life improvements. For example, did you notice the new dot pattern?</p>
      <div break style="--themeColor: var(--error)">NOT TO PLEAD... BUT WE NEED...<div></div></div>
      <p>...your help! Since Markify's inception 2.5 years ago—when I was a high school sophomore—I've relied on word-of-mouth to grow Markify. Not to get needy, but if Markify has impacted you, sharing it with others would truly help to continue the Markify mission!</p>
      <p>Huge thank you to those who already have 😍</p>
      <p>~ Anthony</p>
    </div>
  </div>
  <div class="umButtons">
    <div class="umButtonsSocial">
      <a href="https://twitter.com/markifytool" target="_blank"><img src="./images/launch/socials/twitter.svg"></a>
      <a href="https://www.instagram.com/markifytool" target="_blank"><img src="./images/launch/socials/instagram.svg"></a>
      <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="./images/launch/socials/linkedin.svg"></a>
      <a href="https://www.youtube.com/@markifyexotek" target="_blank"><img src="./images/launch/socials/youtube.svg"></a>
      <div>Follow Markify!</div>
    </div>
    <button class="umButtonsClose largeButton">Close</button>
  </div>
  `,
  css: {
    ".umFrame": "padding: 10px 10px 0 10px",
    ".umVideoHolder": `max-width: 450px; padding: 6px; margin: 4px; background: var(--pageColor); box-shadow: 0px 0px 8px 0px var(--theme); border-radius: 12px`,
    ".umVideoHolder div": `position: relative; max-width: 100%; border-radius: 6px; overflow: hidden`,
    ".umVideoHolder iframe": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border: none`,
    
    ".umContent": `display: flex; flex-direction: column; max-width: 425px; padding: 0 12px; margin: 16px 0 8px; text-align: left`,
    ".umContent strong": `color: var(--theme); font-size: 26px; font-weight: 900`,
    ".umContent span": `color: var(--darkGray); font-size: 16px; font-weight: 600`,
    ".umContent p": `margin: 8px 0 0 0; font-size: 15px`,
    ".umContent a": `font-weight: 600; color: var(--theme)`,
    ".umContent div[break]": `display: flex; gap: 8px; width: 100%; margin-top: 24px; align-items: center; color: var(--themeColor); font-size: 18px; font-weight: 700`,
    ".umContent div[break] div": `flex: 1; height: 2px; background: var(--themeColor)`,
    ".umContent ul": `padding-left: 24px; margin: 0; line-height: 20px`,
    ".umContent li": `margin-top: 16px; font-size: 14px;`,
    ".umContent li::marker": `color: var(--theme)`,
    ".umContent li b": `font-size: 16px; color: var(--theme)`,

    ".umButtons": `position: sticky; display: flex; width: calc(100% - 16px); flex-wrap: wrap; padding: 8px; gap: 8px; bottom: 0px; justify-content: space-between; align-items: center; background: var(--pageColor); box-shadow: 0 -2px 20px var(--hover); transition: .3s`,
    ".umButtonsSocial": `display: flex; flex-wrap: wrap; height: fit-content; padding: 3px; background: #fff; border-radius: 12px; justify-content: space-evenly; align-items: center`,
    ".umButtonsSocial a": `width: 30px; height: 30px; margin: 3px`,
    ".umButtonsSocial a img": `width: 100%; height: 100%`,
    ".umButtonsSocial div": `margin-left: 6px; font-size: 16px; font-weight: 500`,
    ".umButtonsClose": `margin: 3px; background: var(--theme); --borderRadius: 16px; color: #fff`
  },
  js: async function (frame) {
    let content = frame.closest(".modalContent");
    let buttons = frame.querySelector(".umButtons");
    content.style.padding = "0px";
    content.addEventListener("scroll", () => {
      if (content.scrollTop < frame.offsetHeight - content.offsetHeight) {
        buttons.style.removeProperty("box-shadow");
      } else {
        buttons.style.boxShadow = "unset";
      }
    });

    let updateSeenNewUpdate = () => {
      sendRequest("POST", "me/read?seen=whatsnew");
    }
    frame.querySelector(".umButtonsClose").addEventListener("click", async () => {
      (await getModule("modal")).close();
      updateSeenNewUpdate();
    });
    let closeButton = frame.closest(".modal").querySelector(".modalClose");
    if (closeButton != null && closeButton.hasAttribute("listen") == false) {
      closeButton.setAttribute("listen", "");
      closeButton.addEventListener("click", updateSeenNewUpdate);
    }
  }
}