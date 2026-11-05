import { userID, account, changeGlobalImports, setPage, sendRequest, clipBoardRead, promptLogin } from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";

import { Pipeline } from "@modules/editor/Pipeline";

const overviewPages = changeGlobalImports(import.meta.glob("@modules/lesson/breakout/overview/pages/**/*.js"));
const overviewPagesPath = "/src/modules/lesson/breakout/overview/pages/";

import { Frame as FileDropdown } from "../overview/dropdowns/File";

import leftArrowIcon from "@assets/lesson/navigation/leftarrow.svg?raw";
import rightArrowIcon from "@assets/lesson/navigation/rightarrow.svg?raw";
import breakoutLogoIcon from "@assets/breakout.svg?raw";

export class Page {
  constructor() {
    this.pipeline = new Pipeline(this.pages);
  }

  html = `
  <div class="broContainer">
    <div class="broTopHolder">
      <button class="broTopScroll" left style="left: 7px">${leftArrowIcon}</button>
      <button class="broTopScroll" right style="right: 7px">${rightArrowIcon}</button>
      <div class="broTop">
        <div class="broTopSection" left>
          <a class="broLogo" href="/app/dashboard" draggable="false">${breakoutLogoIcon}</a>
          <div class="broFileNameHolder border"><div class="broFileName" spellcheck="false" contenteditable>Test Lesson Name</div></div>
        </div>
        <div class="broTopSection" center>
          <div class="broTopPageSelector">
            <button page="template"><div>Template</div></button>
            <button page="configure"><div>Configure</div></button>
            <button page="monitor"><div>Monitor</div></button>
          </div>
        </div>
        <div class="broTopSection" right>
          <button class="broFileDropdown" title="File Options">File</button>
          <div class="broTopDivider"></div>
          <button class="broAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
          <button class="broLogin">Login</button>
        </div>
      </div>
    </div>
    <div class="broPageContentHolder"></div>
  </div>
  `;

  static scoped = true;
  css = {
    ".broContainer": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; height: 100%`,
    ".broPageContentHolder": `position: relative; width: 100%; flex: 1; box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; overflow: hidden`,
    ".broPageContent": `position: absolute; display: flex !important; width: 100%; height: 100%; left: 0; top: 0; background: var(--pageColor); opacity: 0; z-index: 2; pointer-events: all`,
    ".broPageContent[hide]": `z-index: 1 !important`,
    ".broPageContent[hide]:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0; top: 0; z-index: 2; pointer-events: all`,
    ".broPageContent > .content": `z-index: 1`,

    ".broTopHolder": `position: relative; width: 100%; height: 50px; pointer-events: none`, // margin-bottom: 4px;
    ".broTop": `position: absolute; box-sizing: border-box; display: flex; width: 100%; left: 0px; top: 0px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".broTop::-webkit-scrollbar": `display: none`,
    ".broTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".broTopScroll svg": `width: 22px`,
    ".broTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".broTopSection": `box-sizing: border-box; display: flex; min-width: fit-content; height: 50px; padding: 6px 5px; align-items: center; pointer-events: all`,
    ".broTopSection[left]": `flex: .5 0; justify-content: flex-start`,
    ".broTopSection[center]": `flex-shrink: 0; width: max-content`,
    ".broTopSection[right]": `flex: .5 0; justify-content: flex-end`,

    ".broLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin: 0 4px 0 1px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".broLogo:hover": `background: var(--hover)`,
    ".broLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".broLogo:hover svg": `transform: scale(.9)`,
    ".broFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".broFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".broFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".broFileName::-webkit-scrollbar": `display: none`,

    ".broTopPageSelector": `box-sizing: border-box; display: flex; flex-shrink: 0; padding: 4px; gap: 4px; height: 40px; margin: 0 4px; box-shadow: inset var(--lightShadow); border-radius: 20px; contain: style`,
    ".broTopPageSelector button": `position: relative; flex-shrink: 0; padding: 0; border-radius: 16px; font-size: 16px; font-weight: 600; transform: scale(1) !important`,
    //".broTopPageSelector button:first-child": `border-top-left-radius: 16px; border-bottom-left-radius: 16px`,
    //".broTopPageSelector button:last-child": `border-top-right-radius: 16px; border-bottom-right-radius: 16px`,
    ".broTopPageSelector button div": `box-sizing: border-box; padding: 6px 10px; height: 32px; align-items: center; border-radius: inherit; transition: .2s`,
    ".broTopPageSelector button:hover div": `background: var(--hover)`,
    ".broTopPageSelector button:not([selected]):active div": `transform: scale(.95)`,
    ".broTopPageSelector button[selected] div": `background: var(--theme) !important; color: #fff`,
    
    ".broFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".broTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".broAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".broAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".broLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`
  };

  updateTopBar(ignoreAttr) {
    if (ignoreAttr != true) {
      this.topHolder.removeAttribute("scroll");
    }
    if (this.top.scrollWidth > this.top.clientWidth) {
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

  pages = {};
  async openPage(page, extra) {
    extra = extra ?? {};

    let direction;
    if (this.pageContainer != null) {
      let previous = this.pageContainer;
      direction = extra.direction ?? "left";

      if (direction == "left") {
        previous.style.transform = "translateX(-100px)";
      } else if (direction == "right") {
        previous.style.transform = "translateX(100px)";
      }
      previous.style.removeProperty("opacity");
      previous.setAttribute("hide", "");

      /*setTimeout(() => {
        if (previous != null) {
          previous.remove();
        }
      }, 200);
      delete this.pages[previous.getAttribute("page")];*/
    }

    let existingPage = this.pageContentHolder.querySelector('.broPageContent[page="' + page + '"]:not([closing])');
    if (existingPage == null) {
      this.pageContainer = document.createElement("div");
      this.pageContainer.className = "broPageContent";
      this.pageContainer.setAttribute("page", page);
      this.pageContainer.setAttribute("dropdownholder", "");
      this.pageContainer.setAttribute("modalholder", "");
      this.pageContentHolder.appendChild(this.pageContainer);
    } else {
      this.pageContainer = existingPage;
      this.pageContainer.offsetHeight;
      this.pageContainer.style.removeProperty("transition");
    }
    
    if (direction != null) {
      if (direction == "left") {
        this.pageContainer.style.transform = "translateX(100px)";
      } else if (direction == "right") {
        this.pageContainer.style.transform = "translateX(-100px)";
      }
      this.pageContainer.removeAttribute("hide");
    }

    setTimeout(() => {
      if (this.pageContainer != null) {
        this.pageContainer.style.transition = ".2s";
        this.pageContainer.offsetHeight;
        this.pageContainer.style.transform = "translateX(0%)";
        this.pageContainer.style.opacity = 1;
      }
    }, 1);

    if (existingPage == null) {
      this.pages[page] = await this.setFrame(new Promise(async (resolve) => {
        let loadModuleFunction = overviewPages[overviewPagesPath + page + ".js"];
        if (loadModuleFunction == null) {
          return resolve();
        }
        return resolve(((await loadModuleFunction()) ?? {}).Page);
      }), this.pageContainer, extra);
    }
    
    this.currentPage = this.pages[page];

    this.onOpen();
    
    return this.page;
  }
  closePage(page) {
    let pageData = this.pages[page] ?? {};
    if (pageData.onClose != null) {
      pageData.onClose();
    }
    delete this.pages[page];
    let pageElement = this.frame.querySelector('.broPageContent[page="' + page + '"]');
    if (pageElement == null) {
      return;
    }
    if (this.pageContainer == pageElement) {
      this.pageContainer = null;
      this.currentPage = null;
    }
    pageElement.setAttribute("closing", "");
    pageElement.setAttribute("hide", "");
    pageElement.style.opacity = 0;
    setTimeout(() => {
      if (pageElement != null) {
        pageElement.remove();
      }
    }, 200);
  }

  onOpen() {
    if ((this.page ?? {}).onOpen != null) {
      this.page.onOpen();
    }
  }
  onClose() {
    if ((this.page ?? {}).onClose != null) {
      this.page.onClose();
    }
  }

  async updateNavigation(clickedPage, extra) {
    let navButtons = this.navButtonHolder.children;
    let direction = "right";
    let navigatePage;
    for (let i = 0; i < navButtons.length; i++) {
      let button = navButtons[i];
      let page = button.getAttribute("page");
      let isClickedButton = (page == clickedPage);
      let isSelected = (button.hasAttribute("selected") == true);
      if (isClickedButton && isSelected) {
        break;
      }
      if (isClickedButton == true) {
        button.setAttribute("selected", "");
        navigatePage = page;
      }
      if (isSelected == true) {
        button.removeAttribute("selected");
        if (navigatePage == null) {
          direction = "left";
        }
      }
    }

    let scrollTop = {
      left: (
        (this.centerTop.offsetLeft + 6)
        + (this.centerTop.clientWidth / 2)
        - (this.topHolder.clientWidth / 2)
      )
    };
    if (this.pageContainer != null) {
      scrollTop.behavior = "smooth";
    }
    this.top.scrollTo(scrollTop);
    
    if (navigatePage != null) {
      await this.openPage(navigatePage, { direction, ...(extra ?? {}) });
    }
  }

  getTemplateID() {
    return (this.parent.parent.lesson.breakout ?? {}).template;
  }
  getTemplate(id) {
    if (this.template != null) {
      return this.template;
    }
    let templateID = id ?? this.getTemplateID();
    if (templateID == null) {
      return;
    }
    if (this.fetchTemplatePromise != null) {
      return this.fetchTemplatePromise;
    }
    this.fetchTemplatePromise = new Promise(async (resolve) => {
      let [code, body] = await sendRequest("GET", "lessons/breakout/templates?template=" + templateID, null, { session: this.parent.parent.session });
      if (code != 200) {
        return resolve({});
      }
      this.template = body;
      resolve(body);
    });
    return this.fetchTemplatePromise;
  }

  async js() {
    this.frame.style.position = "relative";
    this.frame.style.width = "100%";
    this.frame.style.height = "100%";

    this.page = this.frame.closest(".brPage");

    this.topHolder = this.frame.querySelector(".broTopHolder");
    this.top = this.topHolder.querySelector(".broTop");

    this.leftTop = this.top.querySelector(".broTopSection[left]");
    this.icon = this.leftTop.querySelector(".broLogo");
    this.lessonName = this.leftTop.querySelector(".broFileName");

    this.centerTop = this.top.querySelector(".broTopSection[center]");
    this.navButtonHolder = this.centerTop.querySelector(".broTopPageSelector");

    this.rightTop = this.top.querySelector(".broTopSection[right]");
    this.fileButton = this.rightTop.querySelector(".broFileDropdown");
    this.accountButton = this.rightTop.querySelector(".broAccount");
    this.loginButton = this.rightTop.querySelector(".broLogin");

    this.topScrollLeft = this.topHolder.querySelector(".broTopScroll[left]");
    this.topScrollRight = this.topHolder.querySelector(".broTopScroll[right]");

    this.pageContentHolder = this.frame.querySelector(".broPageContentHolder");

    // Top bar events:
    this.topScrollLeft.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft - 200, behavior: "smooth" });
    });
    this.topScrollRight.addEventListener("click", () => {
      this.top.scrollTo({ left: this.top.scrollLeft + 200, behavior: "smooth" });
    });
    this.pipeline.subscribe("topbarResize", "resize", () => { this.updateTopBar(); });
    this.pipeline.subscribe("topbarScroll", "topbar_scroll", () => { this.updateTopBar(true); });
    this.pipeline.subscribe("topbarVisibilityChange", "visibilitychange", () => { this.updateTopBar(); });
    this.top.addEventListener("scroll", (event) => { this.pipeline.publish("topbar_scroll", { event }); });

    // Lesson update subscribe:
    this.pipeline.subscribe("overviewLessonSet", "set", (body) => {
      if (body.name != null && document.activeElement.closest(".broFileName") != this.lessonName) {
        let name = this.parent.parent.lesson.name ?? "Untitled Lesson";
        this.lessonName.textContent = name;
        this.lessonName.title = name;
      }
      this.updateTopBar();
    }, { sort: 1 });

    // Exit button event:
    this.icon.addEventListener("click", (event) => {
      event.preventDefault();
      setPage("pages/app/dashboard");
    });

    // Lesson name events:
    let name = this.parent.parent.lesson.name ?? "Untitled Lesson";;
    this.lessonName.textContent = name;
    this.lessonName.title = name;
    this.lessonName.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) {
        event.preventDefault();
        this.lessonName.blur();
      }
    });
    this.lessonName.addEventListener("input", () => { this.updateTopBar(); });
    this.lessonName.addEventListener("focusout", async () => {
      this.lessonName.scrollTo(0, 0);
      this.lessonName.parentElement.style.setProperty("--borderWidth", "0px");
      this.updateTopBar();

      let name = this.lessonName.textContent.substring(0, 100).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
      if (name.replace(/ /g, "").length < 1) {
        this.lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      if (this.lessonName.textContent == this.parent.parent.lesson.name) {
        this.lessonName.textContent = this.parent.parent.lesson.name;
        return;
      }
      let oldName = this.parent.parent.lesson.name;
      this.parent.parent.lesson.name = name;
      this.lessonName.textContent = name;
      this.lessonName.title = name;
      let [code] = await sendRequest("POST", "lessons/name", { name: name }, { session: this.parent.parent.session });
      if (code != 200) {
        this.parent.parent.lesson.name = oldName;
        this.lessonName.textContent = oldName;
        this.lessonName.title = oldName;
      }
    });
    this.lessonName.addEventListener("focus", async () => {
      this.lessonName.parentElement.style.setProperty("--borderWidth", "4px");
      this.updateTopBar();
    });
    this.lessonName.addEventListener("paste", clipBoardRead);

    // Page switcher events:
    this.navButtonHolder.addEventListener("click", (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest("button");
      if (button == null) {
        return;
      }
      this.updateNavigation(button.getAttribute("page"));
    });

    // File dropdown:
    this.fileButton.addEventListener("click", () => {
      dropdownModule.open(this.fileButton, FileDropdown, { parent: this });
    });

    // Account setup:
    if (userID != null) {
      this.accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
       this.accountButton.querySelector("img").src = account.image;
      }
      this.accountButton.addEventListener("click", () => {
        dropdownModule.open(this.accountButton, import("@modules/dropdowns/Account"), { parent: this.parent });
      });
    } else {
      this.accountButton.remove();
      this.loginButton.style.display = "block";
      this.loginButton.addEventListener("click", () => { promptLogin(); });
    }

    this.updateNavigation("template");
  }
}