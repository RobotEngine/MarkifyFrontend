import { fixed, newModule, sleep, setFrame } from "@/crucial";

import { close as closeIcon, back as backIcon } from "./core-icons";

export const Dropdown = class {
  history = [];
  cache = {};

  css = {
    ".dropdown": `--floatMargin: 8px; position: sticky; box-sizing: border-box; max-width: calc(100% - (var(--floatMargin) * 2)); max-height: calc(100% - (var(--floatMargin) * 2)); right: 0px; bottom: 0px; margin: var(--floatMargin); opacity: 0; box-shadow: var(--darkShadow); border-radius: 12px; transform: scale(.25); transform-origin: 0px 0px; pointer-events: all; contain: size layout style; will-change: width, height, left, top, transform-origin; outline: none !important`,
    ".dropdown .loading": `pointer-events: none`,
    ".dropdownOverflow": `position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--pageColor); border-radius: inherit; z-index: 0`,
    ".dropdownContent": `position: absolute; box-sizing: border-box; width: max-content; max-width: var(--dropdownWidth); height: max-content; padding: 6px; overflow: auto`, //background: var(--pageColor)
    ".dropdownFrame": `position: relative`,
    ".dropdownHeader": `position: relative; display: flex; gap: 6px; padding: 6px 6px 0 6px; justify-content: space-between; transition: .4s; z-index: 2`,
    ".dropdownHeader button": `position: relative; width: 24px; height: 24px; margin: 3px; background: var(--pageColor); --borderWidth: 3px; --borderRadius: 14px`,
    ".dropdownHeader button svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dropdownHeader button:focus-visible": `--borderWidth: 4px`,
    ".dropdownTitle": `box-sizing: border-box; display: flex; padding: 3px; flex: 1; max-width: fit-content; justify-content: center; align-items: center; white-space: nowrap; overflow: hidden; font-size: 18px; font-weight: 500`,
    ".dropdownTitle div": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dropdownTitle div[backdrop]": `display: none`,
    ".dropdownTitle img": `width: 26px; height: 26px; margin-right: 4px; flex-shrink: 0; object-fit: cover; border-radius: 13px`
  };
  update = async () => {
    let headerHeight = this.header.offsetHeight;
    let parentWidth = this.parentElement.clientWidth;
    let parentHeight = this.parentElement.clientHeight;
    let buttonWidth = this.origin.offsetWidth;
    let buttonHeight = this.origin.offsetHeight;

    if (this.content != null) {
      if (this.cache.parentWidth != parentWidth || this.cache.buttonWidth != buttonWidth) {

        // Set max dropdown width:
        if (this.cache.parentWidth != parentWidth) {
          this.cache.parentWidth = parentWidth;
          this.content.style.setProperty("--dropdownWidth", "calc(" + parentWidth + "px - (var(--floatMargin) * 2))");
        }

        // Handle button width:
        this.cache.buttonWidth = buttonWidth;
        this.content.style.minWidth = "min(" + parentWidth + "px - (var(--floatMargin) * 2), " + buttonWidth + "px)";
      }

      if (this.cache.parentHeight != parentHeight || this.cache.buttonHeight != buttonHeight) {
        this.cache.parentHeight = parentHeight;
        this.cache.buttonHeight = buttonHeight;

        // Handle button height:
        this.content.style.minHeight = "min(" + parentHeight + "px - (var(--floatMargin) * 2), " + buttonHeight + "px)";
      }

      // Handle max height:
      let maxContentHeight = parentHeight - headerHeight;
      if (this.cache.maxContentHeight != maxContentHeight || this.cache.maxHeight != this.maxHeight) {
        this.cache.maxContentHeight = maxContentHeight;
        this.cache.maxHeight = this.maxHeight;
        if (this.maxHeight == null) {
          this.content.style.maxHeight = "calc(" + maxContentHeight + "px - (var(--floatMargin) * 2))";
        } else {
          this.content.style.maxHeight = "min(" + maxContentHeight + "px - (var(--floatMargin) * 2), " + this.maxHeight + "px)";
        }
      }

      // Handle dropdown width:
      let contentWidth = this.content.offsetWidth;
      if (this.cache.contentWidth != contentWidth) {
        this.cache.contentWidth = contentWidth;
        this.element.style.width = contentWidth + "px";
      }

      let contentHeight = this.content.offsetHeight;
      if (this.cache.contentHeight != contentHeight || this.cache.headerHeight != headerHeight) {
        // Set content top:
        if (this.cache.headerHeight != headerHeight) {
          this.cache.headerHeight = headerHeight;
          this.content.style.top = headerHeight + "px";
        }

        // Handle dropdown height:
        this.cache.contentHeight = contentHeight;
        this.element.style.height = (contentHeight + headerHeight) + "px";
      }
    }

    if (this.origin == null || this.origin.offsetParent == null) {
      return this.close();
    }

    // Handle positioning the dropdown:
    let dropdownParentRect = this.parentElement.getBoundingClientRect();
    let buttonRect = this.origin.getBoundingClientRect();

    let addButtonWidth = buttonRect.width / 2;
    let pageHolder = this.origin.closest(".ePageHolder");
    if (pageHolder != null) {
      addButtonWidth *= parseFloat(pageHolder.getAttribute("zoom"));
    }
    let setLeft = buttonRect.left - dropdownParentRect.left + addButtonWidth - (this.element.offsetWidth / 2);
    if (this.cache.left != setLeft) {
      this.cache.left = setLeft;
      this.element.style.left = setLeft + "px";
    }
    let setTop = buttonRect.top - dropdownParentRect.top - 6;
    if (this.cache.top != setTop) {
      this.cache.top = setTop;
      this.element.style.top = setTop + "px";
    }

    // Handle transform origin:
    // Must "brute force" this, as keeping dropdown inside frame is done with sticky (not hard coded):
    this.element.style.transformOrigin = "0px 0px";
    let dropdownRect = this.element.getBoundingClientRect();
    let originLeft = buttonRect.left - dropdownRect.left + addButtonWidth;
    let originTop = buttonRect.top - dropdownRect.top + (buttonRect.height / 2);
    this.element.style.transformOrigin = originLeft + "px " + originTop + "px";
  }
  runUpdateLoop = () => {
    this.update();

    if (this.closing != true) {
      requestAnimationFrame(this.runUpdateLoop);
    }
  }
  open = async (button, template, data = {}) => {
    if (button == null) {
      return;
    }
    button.blur();

    this.button = button;
    if (this.origin == null) {
      this.origin = button;
    }

    if (this.parentElement == null) {
      if (data.parentElement != null) {
        this.parentElement = data.parentElement;
      } else if (this.button != null) {
        this.parentElement = this.button.closest("div[dropdownholder]") ?? fixed;
      } else {
        this.parentElement = fixed;
      }
    }

    let setTitleHTML = data.title;
    let previous = data.previous;
    if (previous == true) {
      let previous = this.history[this.history.length - 2];
      if (previous == null) {
        return;
      }
      [template, setTitleHTML, data] = previous;
    }

    if (this.element == null) {
      this.close();

      this.parentElement.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
        <div class="dropdown" tabindex="-1" new>
          <div class="dropdownOverflow">
            <div class="dropdownHeader">
              <button class="dropdownBack buttonAnim border" style="display: none">${backIcon}</button>
              <div class="dropdownTitle"></div>
              <button class="dropdownClose buttonAnim border" close>${closeIcon}</button>
            </div>
          </div>
        </div>
      </div>`);
      this.element = this.parentElement.querySelector(".dropdown[new]");
      this.element.removeAttribute("new");

      this.container = this.element.querySelector(".dropdownOverflow");
      this.header = this.element.querySelector(".dropdownHeader");
      this.backButton = this.header.querySelector(".dropdownBack");
      this.title = this.element.querySelector(".dropdownTitle");

      this.backButton.addEventListener("click", () => {
        this.open(this.backButton, null, { previous: true });
      });

      this.element.style.width = this.button.offsetWidth + "px";
      this.element.style.height = this.button.offsetHeight + "px";

      requestAnimationFrame(this.runUpdateLoop);
      //this.interval = setInterval(this.update, 1);

      this.element.style.transition = "opacity .3s, border-radius .3s, transform .4s";
      this.element.style.transformOrigin = "0px 0px";
      this.element.offsetHeight;
      this.element.style.transform = "scale(1)";
      this.element.style.opacity = 1;

      this.button.setAttribute("activated", "");
    }

    let oldContent = this.content;

    this.container.insertAdjacentHTML("beforeend", `<div class="dropdownContent customScroll" new>
      <div class="dropdownFrame"></div>
    </div>`);
    let content = this.container.querySelector(".dropdownContent[new]");
    content.removeAttribute("new");

    content.style.pointerEvents = "none";

    if (oldContent == null) { // New dropdown:
      this.content = content;
    } else { // From same menu:
      this.cache = {}; // Clear cache

      if (previous != true && data.animateBack != true) {
        oldContent.style.removeProperty("right");
        oldContent.style.left = "0%";
        content.style.left = this.element.offsetWidth + "px";
      } else {
        this.history.pop();
        setTitleHTML = (this.history.pop() ?? [])[1] ?? setTitleHTML;

        oldContent.style.removeProperty("left");
        oldContent.style.right = "0%";
        content.style.right = this.element.offsetWidth + "px";
      }

      content.style.opacity = 0;
      content.style.zIndex = 1;
      content.style.pointerEvents = "none";
      content.style.transition = ".4s left, .4s right, .5s opacity";
      content.offsetHeight;

      oldContent.style.zIndex = 0;
      oldContent.style.pointerEvents = "none";
      oldContent.style.transition = ".4s";
      oldContent.offsetHeight;

      if (previous != true && data.animateBack != true) {
        oldContent.style.left = -this.element.offsetWidth + "px";;
        content.style.left = "0%";
      } else {
        oldContent.style.right = -this.element.offsetWidth + "px";;
        content.style.right = "0%";
      }

      oldContent.style.opacity = 0;
      content.style.opacity = 1;
    }

    if (setTitleHTML == null) {
      let existingTitle = this.button.getAttribute("dropdowntitle");
      if (existingTitle != null || this.button.innerHTML != this.button.textContent) {
        setTitleHTML = data.title ?? existingTitle ?? this.button.innerHTML;
      } else {
        setTitleHTML = "<div>" + this.button.innerHTML + "</div>";
      }
    }
    this.title.innerHTML = setTitleHTML ?? "";

    if (data.history == false) {
      this.history = [];
    }

    if (this.history.length > 0) {
      this.backButton.style.display = "flex";
    } else {
      this.backButton.style.display = "none";
    }
    
    this.history.push([template, setTitleHTML, data]);

    window.dropdown = this;

    let frame = content.querySelector(".dropdownFrame");
    frame.style.minWidth = "200px";
    frame.style.minHeight = "200px";

    if (oldContent == null) {
      setTimeout(() => {
        if (this.element != null) {
          this.element.style.transition = "width .4s, height .4s, opacity .3s, border-radius .3s, transform .4s";
        }
      }, 400);
    }

    this.element.focus();

    let loading = this.element.querySelector(".loading");
    if (loading != null) {
      loading.setAttribute("old", "");
      loading.style.pointerEvents = "none";
      loading.style.opacity = 0;
      setTimeout(() => {
        if (loading != null) {
          loading.remove();
        }
      }, 400);
    }

    this.module = await setFrame(template, frame, {
      loadingPlacement: this.element,

      content,
      button: this.button,
      origin: this.origin,
      ...data,
      construct: {
        dropdown: this,
        parent: data.parent,
        open: this.open,
        close: this.close
      }
    });

    this.cache = {}; // Clear cache

    this.maxHeight = (this.module ?? {}).maxHeight;

    this.content = content;

    if (oldContent != null) {
      setTimeout(() => {
        if (oldContent != null) {
          oldContent.remove();
        }
      }, 500);
    }

    frame.style.removeProperty("min-width");
    frame.style.removeProperty("min-height");

    await this.update();

    let titleDiv = this.title.querySelector("div");
    if (titleDiv != null) {
      titleDiv.style.textOverflow = "ellipsis";
    }

    await sleep(300);
    if (this.content != null) {
      this.content.style.pointerEvents = "all";
    }

    return this;
  }
  close = () => {
    let remove = this;
    if (this.element == null) {
      remove = window.dropdown;
    }
    window.dropdown = null;
    if (remove == null) {
      return;
    }
    remove.closing = true;
    if (remove.origin != null) {
      remove.origin.removeAttribute("activated");
      remove.origin.focus();
    }
    if (remove.element != null) {
      remove.element.style.opacity = 0;
      remove.element.style.transform = "scale(0)";
    }
    setTimeout(() => {
      if (remove.element != null && remove.element.parentElement != null) {
        remove.element.parentElement.remove();
      }
    }, 350);
  }
};

export const dropdown = {
  open: async (button, module, data) => {
    return await (await newModule(Dropdown)).open(button, module, data ?? {});
  },
  close: async () => {
    return (await newModule(Dropdown)).close();
  }
};