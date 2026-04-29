import { BaseAnnotation } from "../../Render";

import { cleanString } from "@/crucial";

import linkIcon from "@assets/editor/actions/link.svg?raw";

export class Annotation extends BaseAnnotation {
  ACTION_BAR_TOOLS = ["openlink", "enlarge", "setembed", "unlock", "delete"];

  css = {
    ".eAnnotation[embed]": `display: flex; background: var(--pageColor); border-radius: 16px; box-shadow: 0px 0px 8px rgba(0, 0, 0, .2); pointer-events: all; text-align: left`,
    ".eAnnotation[embed] div[holder]": `display: flex; flex-direction: column; width: calc(100% - 16px); flex: 1; padding: 8px`,
    ".eAnnotation[embed] div[content]": `position: relative; width: 100%; flex: 1; overflow: hidden; border-radius: 8px; background: radial-gradient(var(--theme), var(--secondary)); pointer-events: all !important;`,
    ".eAnnotation[embed] div[content] img[thumbnail]": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; background: #fff`,
    ".eAnnotation[embed] div[content] iframe": `position: absolute; left: 0px; top: 0px; transform-origin: top left; background: var(--pageColor); border: none`,
    ".eAnnotation[embed]:not([notransition]) div[content]": `pointer-events: all`,
    ".eAnnotation[embed] div[content] div[activate]": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: radial-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .2)); backdrop-filter: blur(4px); transition: .3s`,
    ".eAnnotation[embed] div[content] div[activate] button": `width: 80px; height: 80px; max-width: 80%; max-height: 80%`,
    ".eAnnotation[embed] div[content] div[activate] button img": `width: 100%; height: 100%`,
    ".eAnnotation[embed] div[details]": `margin-top: 8px`,
    ".eAnnotation[embed] div[details] div[input]": `display: none; align-items: center; pointer-events: all`,
    ".eAnnotation[embed] div[details] div[input][visible]": `display: flex !important`,
    ".eAnnotation[embed] div[details] div[input] input": `box-sizing: border-box; width: 100%; height: 36px; border: solid 3px var(--hover); outline: unset; border-radius: 18px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 600; font-family: var(--font); font-size: 16px`, //margin-right: 6px;
    ".eAnnotation[embed] div[details] div[input] input::placeholder": `color: var(--hover)`,
    ".eAnnotation[embed] div[details] div[info]": `display: flex; flex-direction: column; color: var(--textColor)`,
    ".eAnnotation[embed] div[details] div[info] div[title]": `display: none; width: 100%; font-size: 18px; font-weight: 700; text-wrap: nowrap; text-overflow: ellipsis; overflow: hidden; color: var(--textColor)`,
    ".eAnnotation[embed] div[details] div[info] div[description]": `display: none; width: 100%; margin: 4px 0 2px 0; font-size: 14px; font-weight: 500; color: var(--darkGray); text-wrap: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eAnnotation[embed] div[details] div[info] a[link]": `display: flex; width: fit-content; max-width: 100%; align-items: center; font-size: 16px; font-weight: 600; text-decoration: underline; color: var(--theme); text-wrap: nowrap; overflow: hidden; pointer-events: all`,
    ".eAnnotation[embed] div[details] div[info] a[link] div[icon]": `width: 32px; height: 32px; margin-right: 2px`,
    ".eAnnotation[embed] div[details] div[info] a[link] div[icon] svg": `width: 100%; height: 100%`
  };

  render() {
    if (this.element == null) {
      this.element = document.createElement("div");
      this.element.className = "eAnnotation";
      this.element.setAttribute("embed", "");
      this.element.innerHTML = `<div holder>
        <div content>
          <img thumbnail>
          <div activate><button><img></button></div>
        </div>
        <div details>
          <div input>
            <input placeholder="https://markifyapp.com" nodelete></input>
          </div>
          <div info>
            <div title></div>
            <div description></div>
            <a link target="_blank"><div icon>${linkIcon}</div><div text></div></a>
          </div>
        </div>
      </div>`;
      this.holder.appendChild(this.element);
    }
    this.element.style.width = this.properties.s[0] + "px";
    this.element.style.height = this.properties.s[1] + "px";
    if (this.properties._id != null) {
      this.element.style.opacity = 1;
    } else {
      this.element.setAttribute("tooleditor", "");
      this.element.style.opacity = .7;
    }

    let embedHolder = this.element.querySelector("div[content]");
    let thumbnail = embedHolder.querySelector("img[thumbnail]");
    let embedActivate = this.element.querySelector("div[activate]");
    let embedFrame = this.element.querySelector("iframe");
    let embedDetails = this.element.querySelector("div[details]");
    let linkInputHolder = embedDetails.querySelector("div[input]");
    let linkInput = linkInputHolder.querySelector("input");
    let infoHolder = embedDetails.querySelector("div[info]");
    let embedTitle = infoHolder.querySelector("div[title]");
    let embedDesc = infoHolder.querySelector("div[description]");
    let embedLink = infoHolder.querySelector("a[link]");
    if (this.properties.d != null && this.properties.embed != null) {
      linkInputHolder.removeAttribute("visible");
      if (this.exporting != true) {
        if (this.properties.embed.url != null) {
          if (embedFrame == null) {
            embedActivate.querySelector("img").src = "../images/editor/actions/play.svg";
            embedActivate.style.display = "flex";
          }
        } else {
          embedActivate.style.display = "none";
        }
      }
      if (this.properties.embed.image != null) {
        if (embedFrame == null) {
          if (this.exporting != true) {
            thumbnail.src = this.properties.embed.image;
          } else {
            this.parent.exportPromises.push(new Promise(async (resolve) => {
              thumbnail.addEventListener("load", resolve);
              thumbnail.src = this.properties.embed.image;
            }));
          }
          thumbnail.style.display = "unset";
        }
      } else {
        thumbnail.style.removeProperty("display");
        thumbnail.removeAttribute("src");
      }
      if (this.properties.embed.color != null) {
        embedHolder.style.background = cleanString(this.properties.embed.color);
      } else {
        embedHolder.style.removeProperty("background");
      }
      if (this.properties.embed.title != null || this.properties.embed.site != null) {
        embedTitle.textContent = cleanString(this.properties.embed.title ?? this.properties.embed.site);
        embedTitle.title = embedTitle.textContent;
        embedTitle.style.display = "unset";
      } else {
        embedTitle.style.removeProperty("display");
      }
      if (this.properties.embed.description != null) {
        embedDesc.textContent = cleanString(this.properties.embed.description);
        embedDesc.title = embedDesc.textContent;
        embedDesc.style.display = "unset";
      } else {
        embedDesc.style.removeProperty("display");
      }
      infoHolder.style.removeProperty("display");
    } else {
      linkInputHolder.setAttribute("visible", "");
      embedActivate.style.removeProperty("display");
      thumbnail.style.removeProperty("display");
      infoHolder.style.display = "none";
    }
    if (document.activeElement != linkInput) {
      linkInput.value = this.properties.d ?? "";
    }
    if (this.properties.d != null) {
      embedLink.querySelector("div[text]").textContent = (new URL(this.properties.d)).hostname;
      embedLink.title = this.properties.d;
      embedLink.href = this.properties.d;
    }

    if (embedFrame != null) {
      let frameWidth = this.properties.s[0] - 16;
      let defaultMaxWidth = 800;
      if (frameWidth < 300) {
        defaultMaxWidth = 300;
      }
      let embedWidth = Math.max(frameWidth, defaultMaxWidth);
      let scale = frameWidth / embedWidth;
      embedFrame.style.width = embedWidth + "px";
      embedFrame.style.height = ((this.properties.s[1] - 24 - embedDetails.offsetHeight) * (1 / scale)) + "px";
      embedFrame.style.transform = "scale(" + scale + ")";

      if (embedFrame.getAttribute("currenturl") != (this.properties.embed ?? {}).url) {
        embedFrame.remove();
        embedActivate.style.opacity = 1;
      }
    }

    this.setID();
    this.setParent();
    this.setZIndex();
    this.setTransform();
    this.setAnimate();
  }
}