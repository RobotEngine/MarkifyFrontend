modules["modals/updates/nov-18-2024"] = {
  maxHeight: 650,
  html: `
  <div class="umFrame">
    <div class="umVideoContent">
      <div class="umVideoHolder">
        <div style="aspect-ratio: 9/16">
          <iframe type="text/html" width="720" height="405"
          src="https://www.youtube.com/embed/W1hjMZtvZUM?autoplay=1&loop=1&mute=1&playlist=W1hjMZtvZUM"
          frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <div class="umContent">
      <strong>The Biggest Update... yet!</strong>
      <span>November 18, 2024</span>
      <p>For a long time, Markify has solely focussed on being a "simple" whiteboard. While there are absolutely no plans to change that, it's about time we add some fancy features for the power users—we see you!</p>
      <div break style="--themeColor: var(--theme)">HOT OUT OF THE OVEN<div></div></div>
      <ul>
        <li><b>Improved Multi-Select</b> lets you not only move multiple elements, but resize and rotate them too! Hold shift when selecting multiple elements or use the drag selection tool to take advantage of this.</li>
        <li><b>*SNAP* *SNAP* SNAPPING</b> is (finally) in Markify! When moving or resizing elements, you can now snap them into place, almost like a LEGO brick. Yep, this is for those with a keen eye or OCD. Snapping can be toggled off in the "Zoom" menu at the top right of the editor.</li>
        <li><b>Pages... Anywhere</b> We've officially moved all lessons to be powered by the Freeboard engine. This allows pages to be put anywhere on the board and customized much more deeply (If you're into that sort of thing).</li>
        <li><b>Advanced Exporting</b> allows you to choose just the pages, the entire board, or (most excitingly) selected elements. Only want to export a few of the pages? Just select them and hit that third option!</li>
        <li><b>Quality-of-Life Improvements</b> make all the difference! Now when you move your mouse close to the side of the window, your page will scroll! This means you don't have to move the mouse and scroll while editing an element.</li>
      </ul>
      <p>Of course, there have been around 100 bug fixes and other quality-of-life improvements. We're always focussed toward making Markify run even better for you!</p>
      <div break style="--themeColor: var(--green)">JUST A QUICK ASK<div></div></div>
      <p>If Markify has had an impact on your class, please share it! Seeing educators do professional development, present at a conference, and post about Markify is truly what keeps this project going! Just spreading the word helps so much in a world full of so many #EdTech tools.</p>
      <p>Huge thank you to those who have 😍</p>
      <p>~ Anthony</p>
    </div>
  </div>
  <div class="umButtons">
    <div class="umButtonsSocial">
      <a href="https://twitter.com/markifytool" target="_blank"><img src="./images/launch/socials/twitter.svg"></a>
      <a href="https://www.instagram.com/markifytool" target="_blank"><img src="./images/launch/socials/instagram.svg"></a>
      <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="./images/launch/socials/linkedin.svg"></a>
      <a href="https://www.youtube.com/@markifyexotek" target="_blank"><img src="./images/launch/socials/youtube.svg"></a>
      <div title="Follow Markify!">Follow Markify!</div>
    </div>
    <button class="umButtonsClose largeButton">Close</button>
  </div>
  `,
  css: {
    ".umFrame": "display: flex; flex-wrap: wrap-reverse; width: 725px; max-width: calc(100% - 24px); padding: 10px 10px 0 10px; justify-content: center",
    ".umVideoContent": `flex: 1 1 250px; max-width: 300px; margin: 4px`,
    ".umVideoHolder": `position: sticky; top: 18px; padding: 6px; margin: 4px; background: var(--pageColor); box-shadow: 0px 0px 8px 0px var(--theme); border-radius: 12px`,
    ".umVideoHolder div": `position: relative; max-width: 100%; border-radius: 6px; overflow: hidden`,
    ".umVideoHolder iframe": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border: none`,
    
    ".umContent": `display: flex; flex-direction: column; flex: 1 1 425px; padding: 0 12px; margin: 16px 0 8px; text-align: left`,
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

    ".umButtons": `position: sticky; display: flex; width: calc(100% - 16px); padding: 8px; gap: 8px; bottom: 0px; justify-content: space-between; align-items: center; background: var(--pageColor); box-shadow: 0 -2px 20px var(--hover); transition: .3s`,
    ".umButtonsSocial": `display: flex; flex-wrap: wrap; height: fit-content; padding: 3px; background: #fff; border-radius: 12px; justify-content: space-evenly; align-items: center`,
    ".umButtonsSocial a": `width: 30px; height: 30px; margin: 3px`,
    ".umButtonsSocial a img": `width: 100%; height: 100%`,
    ".umButtonsSocial div": `flex: 1; margin-left: 6px; font-size: 16px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis`,
    ".umButtonsClose": `flex-shrink: 0; margin: 3px; background: var(--theme); --borderRadius: 16px; color: #fff`
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