import { Frame as PinDropdown } from "./Pin";
import { Frame as LinkDropdown } from "./Link";
import { Frame as EmailDropdown } from "./Email";

import pinShareIcon from "@assets/lesson/share/pin.svg?raw";
import linkShareIcon from "@assets/lesson/share/link.svg?raw";
import emailShareIcon from "@assets/lesson/share/email.svg?raw";

export class Frame {
  html = `
  <button class="eShareOption" type="pin" dropdowntitle="<div>Present with <b style='color: var(--theme); font-weight: 800'>Pin</b></div>" title="Invite members through a pin."><div image>${pinShareIcon}</div><div class="eShareInfo"><div class="eShareTitle">Present with <b>Pin</b></div><div class="eShareDesc">Allow members to join as a viewer through a 6-digit pin code.</div></div></button>
  <button class="eShareOption" type="link" dropdowntitle="<div>Share with <b style='color: var(--theme); font-weight: 800'>Link</b></div>" title="Invite members through a link."><div image>${linkShareIcon}</div><div class="eShareInfo"><div class="eShareTitle">Share with <b>Link</b></div><div class="eShareDesc">Allow members to join as a viewer or editor through a sendable link.</div></div></button>
  <button class="eShareOption" type="email" dropdowntitle="<div>Invite with <b style='color: var(--theme); font-weight: 800'>Email</b></div>" title="Invite members through email."><div image>${emailShareIcon}</div><div class="eShareInfo"><div class="eShareTitle">Invite with <b>Email</b></div><div class="eShareDesc">Invite members as a viewer or editor with their email.</div></div></button>
  `;
  css = {
    ".eShareOption": `display: flex; flex-wrap: wrap; min-width: 100%; padding: 0; border-radius: 6px; align-items: center; transition: .15s`,
    ".eShareOption:not(:first-child)": `margin-top: 6px`,
    ".eShareOption:hover": `background: var(--theme); color: #fff`,
    ".eShareOption:hover div[image]": `filter: brightness(0) invert(1)`,
    ".eShareOption:hover b": `color: #fff`,
    ".eShareOption:active": `transform: scale(.95); border-radius: 12px`,
    ".eShareOption div[image]": `width: 66px; height: 32px; margin: 6px; transition: .15s`,
    ".eShareOption div[image] svg": `width: 100%; height: 100%`,
    ".eShareOption .eShareInfo": `margin: 6px; text-align: left`,
    ".eShareOption .eShareTitle": `margin-right: 6px; font-size: 18px; font-weight: 600`,
    ".eShareOption b": `color: var(--theme); font-weight: 800; transition: .15s`,
    ".eShareOption .eShareDesc": `max-width: 250px; font-size: 14px`
  };
  js(frame, extra) {
    let pinShare = frame.querySelector('.eShareOption[type="pin"]');
    pinShare.addEventListener("click", () => {
      this.open(pinShare, PinDropdown, extra);
    });
    let linkShare = frame.querySelector('.eShareOption[type="link"]');
    linkShare.addEventListener("click", () => {
      this.open(linkShare, LinkDropdown, extra);
    });
    let emailShare = frame.querySelector('.eShareOption[type="email"]');
    emailShare.addEventListener("click", () => {
      this.open(emailShare, EmailDropdown, extra);
    });
  }
}