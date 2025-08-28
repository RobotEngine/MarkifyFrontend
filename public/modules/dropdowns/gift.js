modules["dropdowns/gift"] = class {
  html = `
  <div class="giftHolder">
    <img class="giftLogo" src="../images/dashboard/gift/logo.svg">
    <div class="giftTitle">Share Markify with a Peer</div>
    <div class="giftDescription">Thank you for bringing collaborative learning into more classrooms!</div>
    <div class="giftSelect">
      <div class="giftSelectShareText"><span>Here's a link to Markify, that EdTech tool I was talking about!</span> <a target="_blank"></a></div>
      <button class="giftSelectShareCopy">Copy Invite</button>
      <svg class="giftSelectHandle" handle="topleft" width="16" height="16" rotation="180" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 14V14C2 7.37258 7.37258 2 14 2V2" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
      <svg class="giftSelectHandle" handle="topright" width="16" height="16" rotation="270" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 14V14C14 7.37258 8.62742 2 2 2V2" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
      <svg class="giftSelectHandle" handle="bottomleft" width="16" height="16" rotation="90" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2V2C2 8.62742 7.37258 14 14 14V14" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
      <svg class="giftSelectHandle" handle="bottomright" width="16" height="16" rotation="0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 2V2C14 8.62742 8.62742 14 2 14V14" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
      <svg class="giftSelectHandle" handle="left" width="12" height="28" rotation="135" viewBox="0 0 12 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
      <svg class="giftSelectHandle" handle="right" width="12" height="28" rotation="315" viewBox="0 0 12 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
      <svg class="giftSelectHandle" handle="top" width="28" height="12" rotation="225" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
      <svg class="giftSelectHandle" handle="bottom" width="28" height="12" rotation="45" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--purple)" stroke-width="4" stroke-linecap="round"/> </svg>
    </div>
    <div class="giftCounter">Loading...</div>
  </div>
  `;
  css = {
    ".giftHolder": `display: flex; flex-direction: column; padding: 24px; align-items: center`,
    ".giftLogo": `max-width: 100%; height: 50px`,
    ".giftTitle": `max-width: 300px; margin-top: 16px; font-size: 32px; font-weight: 700`,
    ".giftDescription": `max-width: 300px; margin-top: 8px; font-size: 16px`,
    ".giftSelect": `position: relative; width: calc(100% - 32px); max-width: 310px; margin: 24px 16px; border: solid 4px var(--purple); border-radius: 9px`,
    ".giftSelectShareText": `box-sizing: border-box; width: 100%; padding: 8px; font-size: 16px; font-weight: 500`,
    ".giftSelectShareText span": `display: block`,
    ".giftSelectShareText a": `display: block; margin-top: 16px; color: var(--purple); text-decoration: none; font-weight: 600`,
    ".giftSelectShareCopy": `box-sizing: border-box; width: calc(100% - 12px); padding: 6px; margin: 6px; background: var(--purple); border-radius: 4px; color: #fff; font-size: 16px; font-weight: 600`,
    ".giftSelectHandle": `position: absolute; transition: .1s; pointer-events: all; --scale: 1`,
    '.giftSelectHandle[handle="topleft"]': `left: -10px; top: -10px`,
    '.giftSelectHandle[handle="topright"]': `right: -10px; top: -10px`,
    '.giftSelectHandle[handle="bottomleft"]': `left: -10px; bottom: -10px`,
    '.giftSelectHandle[handle="bottomright"]': `right: -10px; bottom: -10px`,
    '.giftSelectHandle[handle="left"]': `left: -14px; top: 50%; transform: translateY(-50%)`,
    '.giftSelectHandle[handle="right"]': `right: -14px; top: 50%; transform: translateY(-50%)`,
    '.giftSelectHandle[handle="top"]': `left: 50%; top: -14px; transform: translateX(-50%)`,
    '.giftSelectHandle[handle="bottom"]': `left: 50%; bottom: -14px; transform: translateX(-50%)`,
    ".giftCounter": `margin-top: 6px; font-size: 16px; opacity: 0; transition: .2s`
  };
  js = async (frame) => {
    let selectBox = frame.querySelector(".giftSelect");
    let shareText = selectBox.querySelector(".giftSelectShareText");
    let shareLink = shareText.querySelector(".giftSelectShareText a");
    let copyButton = selectBox.querySelector(".giftSelectShareCopy");
    let giftCounter = frame.querySelector(".giftCounter");

    shareLink.href = "https://markify.link/gift?user=" + userID;
    shareLink.textContent = shareLink.href;

    copyButton.addEventListener("click", () => {
      copyClipboardText(shareText.textContent);
    });

    (async () => {
      let [code, body] = await sendRequest("GET", "me/affiliatecount");
      if (code == 200 && giftCounter != null) {
        let message = "peers have";
        if (body.count == 1) {
          message = "peer has"
        }
        giftCounter.innerHTML = "<b>" + body.count + "</b> " + message + " signed up with your link!";
        giftCounter.style.opacity = 1;
      }
    })();
  }
}