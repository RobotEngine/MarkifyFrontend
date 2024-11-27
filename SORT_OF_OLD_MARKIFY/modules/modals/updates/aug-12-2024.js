modules["modals/updates/aug-12-2024"] = {
  maxHeight: 600,
  html: `
  <div class="umFrame">
    <div class="umVideoHolder">
      <div style="aspect-ratio: 16/9">
        <iframe type="text/html" width="720" height="405"
        src="https://www.youtube.com/embed/WQdZyMwYEnc?autoplay=1&loop=1&mute=1"
        frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="umContent">
      <strong>Welcome Back to School 🥱🙃</strong>
      <span>August 12, 2024</span>
      <p>I guess all good things... <i>including summer break</i>... must come to an end. But here's to a new school year filled with new and endless possibilities.</p>
      <p>Over the summer, I've been hard at work improving Markify for the year ahead. While most of the stuff is boring old bug fixes, here are some highlights:</p>
      <ul>
        <li><b>Tool Toggle</b> lets you mitigate collaborative chaos by enabling/disabling the tools availiable to students. Next time you share a lesson, click the "Options" button and play around with it :)</li>
        <li><b>Rotation</b> took long enough, how embarrassing. To rotate an element, just select it and use the rotate handle at the bottom left corner.</li>
        <li><b>Locking & Layer</b> order is now available under the "three-dot menu" when you select an element. Locking an element prevents anyone from editing it.</li>
        <li><b>(Basic) Keybinds</b> is another embarrassing one... Markify now supports ctrl-C and ctrl-V for copy/paste among others. More powerful keybinds coming sometime in the future.</li>
        <li><b>This Update Dialogue</b> will help make updates more open and transparent. I'm planning to start involving the community more into Markify's development.</li>
      </ul>
      <p>Thank you for reading! So much more is on its way, and I cannot wait to show you. ~ Anthony & Markify Team</p>
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
    ".umContent ul": `padding-left: 24px; margin: 4px 0 0 0; line-height: 20px`,
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