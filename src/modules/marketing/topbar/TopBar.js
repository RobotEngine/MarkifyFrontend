import { promptLogin, userID, account } from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
import { modal as modalModule } from "@modules/utility/Modal";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import logoIcon from "@assets/logo.svg?raw";

export class Frame {
  html = `<div class="topbarTopHolder">
    <button class="topbarScroll" left style="left: 7px">${leftArrowIcon}</button>
    <button class="topbarScroll" right style="right: 7px">${rightArrowIcon}</button>
    <div class="topbarTop">
      <div class="topbarTopSection" left>
        <a class="topbarTopLogo" openpage="launch" href="/launch">${logoIcon}</a>
        <div class="topbarTopDivider"></div>
        <a class="topbarButton" openpage="breakout" href="/breakout" style="--themeColor: var(--breakoutTheme)">Breakout</a>
        <a class="topbarButton" openpage="resources" href="/resources">Resources</a>
        <a class="topbarButton" openpage="pricing" href="/pricing">Pricing</a>
        <button class="topbarButton topbarContact">Contact</button>
      </div>
      <div class="topbarTopSection" scroll>
        <div class="topbarTopDivider"></div>
      </div>
      <div class="topbarTopSection" right>
        <a class="topbarOpen" openpage="app/dashboard" href="/app/dashboard">Open Markify</a>
        <div class="topbarTopDivider"></div>
        <button class="topbarAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
        <button class="topbarLogin">Login</button>
      </div>
    </div>
  </div>`;

  static scoped = true;
  css = {
    ".topbarTopHolder": `position: relative; width: 100%; height: 50px; visibility: visible`,
    ".topbarTop": `position: absolute; display: flex; width: 100%; gap: 8px; padding: 8px; left: -8px; top: -8px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".topbarTopHolder[scroll] .topbarTop": `box-sizing: border-box; gap: 0px !important; padding: 0 5px 0 6px !important; left: 0 !important; top: 0 !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".topbarTop::-webkit-scrollbar": `display: none`,
    ".topbarTopSection[scroll]": `display: none`,
    ".topbarTopHolder[scroll] .topbarTopSection[scroll]": `display: flex !important`,
    ".topbarScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".topbarScroll svg": `width: 22px`,
    ".topbarScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".topbarTopSection": `box-sizing: border-box; display: flex; height: 50px; padding: 6px 5px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".topbarTopHolder[scroll] .topbarTopSection": `padding: 6px 0 !important; box-shadow: unset !important`,
    ".topbarTopSection[left]": `padding-left: 6px !important; border-bottom-right-radius: 12px`,
    ".topbarTopSection[right]": `border-bottom-left-radius: 12px`,
    ".topbarTopLogo": `display: flex; height: 38px; padding: 0; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".topbarTopLogo:hover": `background: var(--hover)`,
    ".topbarTopLogo svg": `height: 100%; transition: .2s`,
    ".topbarButton": `--themeColor: var(--theme); position: relative; box-sizing: border-box; height: 32px; padding: 6px 10px; margin: 0 4px; border-radius: 16px; font-size: 16px; font-weight: 600; text-decoration: none; isolation: isolate`,
    ".topbarButton:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: inherit; opacity: .3; z-index: -1; transition: .2s`,
    ".topbarButton:hover:before": `background: var(--themeColor)`,
    ".topbarOpen": `box-sizing: border-box; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600; text-decoration: none`,
    ".topbarTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".topbarAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".topbarAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".topbarLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`
  };

  update(ignoreAttr) {
    if (ignoreAttr != true) {
      this.topHolder.removeAttribute("scroll");
    }
    if (this.top.clientWidth < this.top.scrollWidth) {
      if (ignoreAttr != true) {
        this.topHolder.setAttribute("scroll", "");
      }
      if (Math.floor(this.top.scrollLeft) > 0) {
        this.topScrollLeft.style.opacity = 1;
        this.topScrollLeft.style.pointerEvents = "all";
      } else {
        this.topScrollLeft.style.opacity = 0;
        this.topScrollLeft.style.pointerEvents = "none";
      }
      if (Math.floor(this.top.scrollWidth - this.top.scrollLeft) > Math.floor(this.top.clientWidth)) {
        this.topScrollRight.style.opacity = 1;
        this.topScrollRight.style.pointerEvents = "all";
      } else {
        this.topScrollRight.style.opacity = 0;
        this.topScrollRight.style.pointerEvents = "none";
      }
    } else {
      this.topScrollLeft.style.opacity = 0;
      this.topScrollLeft.style.pointerEvents = "none";
      this.topScrollRight.style.opacity = 0;
      this.topScrollRight.style.pointerEvents = "none";
    }
  }

  onConnect() {
    let accountButton = this.frame.querySelector(".topbarAccount");
    let loginButton = this.frame.querySelector(".topbarLogin");
    if (userID != null) {
      accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
        accountButton.querySelector("img").src = account.image;
      }
      accountButton.addEventListener("click", () => {
        dropdownModule.open(accountButton, import("@modules/dropdowns/Account"), { parent: this });
      });
    } else {
      accountButton.remove();
      loginButton.style.display = "block";
      loginButton.addEventListener("click", () => { promptLogin(); });
    }
  }

  js(frame) {
    this.topHolder = frame.querySelector(".topbarTopHolder");
    this.top = this.topHolder.querySelector(".topbarTop");
    this.topScrollLeft = this.topHolder.querySelector(".topbarScroll[left]");
    this.topScrollRight = this.topHolder.querySelector(".topbarScroll[right]");

    // Top bar events:
    this.topScrollLeft.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft - 200, behavior: "smooth" });
    });
    this.topScrollRight.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft + 200, behavior: "smooth" });
    });
    this.top.addEventListener("scroll", () => { this.update(); });

    this.update();
  }
}