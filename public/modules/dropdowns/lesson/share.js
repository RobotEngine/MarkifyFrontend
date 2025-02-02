modules["dropdowns/lesson/share"] = class {
  html = `
  <button class="eShareOption" type="pin" dropdowntitle="<div>Present with <b style='color: var(--theme); font-weight: 800'>Pin</b></div>" title="Invite members through a pin."><img src="./images/editor/share/pin.svg"><div class="eShareInfo"><div class="eShareTitle">Present with <b>Pin</b></div><div class="eShareDesc">Allow members to join as a viewer through a 6-digit pin code.</div></div></button>
  <button class="eShareOption" type="link" dropdowntitle="<div>Share with <b style='color: var(--theme); font-weight: 800'>Link</b></div>" title="Invite members through a link."><img src="./images/editor/share/link.svg"><div class="eShareInfo"><div class="eShareTitle">Share with <b>Link</b></div><div class="eShareDesc">Allow members to join as a viewer or editor through a sendable link.</div></div></button>
  <button class="eShareOption" type="email" dropdowntitle="<div>Invite with <b style='color: var(--theme); font-weight: 800'>Email</b></div>" title="Invite members through email."><img src="./images/editor/share/email.svg"><div class="eShareInfo"><div class="eShareTitle">Invite with <b>Email</b></div><div class="eShareDesc">Invite members as a viewer or editor with their email.</div></div></button>
  `;
  css = {
    ".eShareOption": `display: flex; flex-wrap: wrap; min-width: 100%; padding: 0; border-radius: 8px; align-items: center; transition: .15s`,
    ".eShareOption:not(:first-child)": `margin-top: 6px`,
    ".eShareOption:hover": `background: var(--theme); color: #fff`,
    ".eShareOption:hover img": `filter: brightness(0) invert(1)`,
    ".eShareOption:hover b": `color: #fff`,
    ".eShareOption:active": `transform: scale(.95); border-radius: 14px`,
    ".eShareOption img": `height: 32px; margin: 6px; transition: .15s`,
    ".eShareOption .eShareInfo": `margin: 6px; text-align: left`,
    ".eShareOption .eShareTitle": `margin-right: 6px; font-size: 18px; font-weight: 600`,
    ".eShareOption b": `color: var(--theme); font-weight: 800; transition: .15s`,
    ".eShareOption .eShareDesc": `max-width: 250px; font-size: 14px`
  };
  js = async (frame) => {
    let pinShare = frame.querySelector('.eShareOption[type="pin"]');
    pinShare.addEventListener("click", () => {
      dropdownModule.open(pinShare, "dropdowns/lesson/share/pin", { parent: this });
    });
    let linkShare = frame.querySelector('.eShareOption[type="link"]');
    linkShare.addEventListener("click", () => {
      dropdownModule.open(linkShare, "dropdowns/lesson/share/link", { parent: this });
    });
    let emailShare = frame.querySelector('.eShareOption[type="email"]');
    emailShare.addEventListener("click", () => {
      dropdownModule.open(emailShare, "dropdowns/lesson/share/email", { parent: this });
    });
  }
}