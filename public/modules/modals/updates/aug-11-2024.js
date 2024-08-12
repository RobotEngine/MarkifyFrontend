modules["modals/updates/aug-11-2024"] = {
  maxHeight: 600,
  html: `
  <div class="umFrame">
    <div class="umVideoHolder">
      <div style="aspect-ratio: 16/9">
        <iframe id="ytplayer" type="text/html" width="720" height="405"
        src="https://www.youtube.com/embed/WQdZyMwYEnc?autoplay=1&loop=1&mute=1"
        frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <div class="umContent">
      <strong>Welcome Back to School 🥱🙃</strong>
      <p>I guess all things... <i>including summer break</i>... must come to an end. But here's to a new school year filled with new and endless possibilities.</p>
      <p>Over the summer, I've been hard at work improving Markify for the year ahead. While most of the stuff is boring old bug fixes, here are some highlights:</p>
      <ul>
        <li><b>Tool Toggle</b> lets you mitigate collaborative chaos by enabling/disabling the tools availiable to students. Next time you share a lesson, click the "Options" button and play around with it :)</li>
        <li><b>ROTATION</b> took long enough, how embarrassing. To rotate an element, just select it and use the rotate handle at the bottom left corner.</li>
        <li><b>Locking & Layer</b> order is now available under the "three-dot menu" when you select an element. Locking an element prevents anyone from editing it.</li>
        <li><b>(Basic) Keybinds</b> is another embarrassing one... Markify now supports ctrl-C and ctrl-V for copy/paste among others. More powerful keybinds coming sometime in the future.</li>
        <li><b>Hmm... This Update Dialogue</b> will help make updates more open and transparent. I plan to start involving the community more into Markify's development.</li>
      </ul>
      <p>Thank you for reading! So much more is on its way, and I cannot wait to show you. ~ Anthony & Markify Team</p>
    </div>
  </div>
  `,
  css: {
    ".umFrame": "padding: 4px",
    ".umVideoHolder": `max-width: 450px; padding: 6px; margin: 4px; background: var(--pageColor); box-shadow: 0px 0px 8px 0px var(--theme); border-radius: 12px`,
    ".umVideoHolder div": `position: relative; max-width: 100%; border-radius: 6px; overflow: hidden`,
    ".umVideoHolder iframe": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border: none`,
    
    ".umContent": `display: flex; flex-direction: column; max-width: calc(450px - 24px); padding: 0 12px; margin-top: 16px; text-align: left`,
    ".umContent strong": `font-size: 26px; font-weight: 900`,
    ".umContent p": `margin: 8px 0 0 0; font-size: 15px`,
    ".umContent ul": `padding-left: 24px; margin: 4px 0 0 0; line-height: 20px`,
    ".umContent li": `margin-top: 16px; font-size: 14px;`,
    ".umContent li::marker": `color: var(--theme)`,
    ".umContent li b": `font-size: 16px; color: var(--theme)`,
  },
  js: async function (frame) {
    
  }
}