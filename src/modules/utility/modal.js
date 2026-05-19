import { fixed, newModule, sleep, setFrame } from "@/crucial";

import { close as closeIcon, back as backIcon } from "./core-icons";

export const Modal = class {
  history = [];
  cache = {};

  css = {
    ".modal": `position: absolute; box-sizing: border-box; max-width: calc(100% - 16px); max-height: calc(100% - 16px); left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: 0; box-shadow: var(--darkShadow); border-radius: 12px; transform-origin: 50% 25%; pointer-events: all`,
    ".modal .loading": `pointer-events: none`,
    ".modalOverflow": `position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--pageColor); border-radius: inherit; z-index: 0`,
    ".modalContent": `position: absolute; box-sizing: border-box; width: max-content; height: max-content; padding: 6px; overflow: auto`, //background: var(--pageColor)
    ".modalFrame": `position: relative`,
    ".modalHeader": `position: relative; display: flex; gap: 6px; padding: 6px 6px 0 6px; justify-content: space-between; transition: .4s; z-index: 2`,
    ".modalHeader button": `position: relative; width: 24px; height: 24px; margin: 3px; --borderWidth: 3px; --borderRadius: 14px`,
    ".modalHeader button svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".modalHeader button:focus-visible": `--borderWidth: 4px`,
    ".modalTitle": `box-sizing: border-box; display: flex; padding: 3px; flex: 1; max-width: fit-content; justify-content: center; align-items: center; white-space: nowrap; overflow: hidden; font-size: 18px; font-weight: 500`,
    ".modalTitle div": `flex: 1; margin: 0 4px; white-space: nowrap; overflow: hidden`,
    ".modalTitle img": `width: 26px; height: 26px; object-fit: cover; border-radius: 13px`
  };
  update = async () => {
    let headerHeight = this.header.offsetHeight;
    let parentWidth = this.parentElement.clientWidth;
    let parentHeight = this.parentElement.clientHeight;

    if (this.content != null) {
      if (this.cache.parentWidth != parentWidth) {
        // Handle min/max width:
        this.cache.parentWidth = parentWidth;
        this.content.style.maxWidth = (parentWidth - 16) + "px";
        this.content.style.minWidth = Math.min(parentWidth - 16, 200) + "px";
      }

      // Handle max height:
      let maxContentHeight = parentHeight - headerHeight - 16;
      if (this.cache.maxContentHeight != maxContentHeight || this.cache.maxHeight != this.maxHeight) {
        this.cache.maxContentHeight = maxContentHeight;
        this.cache.maxHeight = this.maxHeight;
        if (this.maxHeight == null) {
          this.content.style.maxHeight = maxContentHeight + "px";
        } else {
          this.content.style.maxHeight = "min(" + maxContentHeight + "px, " + this.maxHeight + "px)";
        }
      }

      // Handle modal width:
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

        // Handle modal height:
        this.cache.contentHeight = contentHeight;
        this.element.style.height = (contentHeight + headerHeight) + "px";
      }
    }
  }
  runUpdateLoop = () => {
    this.update();

    if (this.closing != true) {
      requestAnimationFrame(this.runUpdateLoop);
    }
  }
  open = async (template, button, data = {}) => {
    this.button = button;
    if (this.origin == null) {
      this.origin = button;
    }

    if (this.parent == null) {
      this.parent = data.parent ?? window;
    }
    if (this.parentElement == null) {
      this.parentElement = data.parentElement ?? this.button.closest("div[modalholder]") ?? fixed;
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
        <div class="modal" new>
          <div class="modalOverflow">
            <div class="modalHeader">
              <button class="modalBack buttonAnim border" style="display: none">${backIcon}</button>
              <div class="modalTitle"></div>
              <button class="modalClose buttonAnim border" close>${closeIcon}</button>
            </div>
          </div>
        </div>
      </div>`);
      this.element = this.parentElement.querySelector(".modal[new]");
      this.element.removeAttribute("new");

      this.container = this.element.querySelector(".modalOverflow");
      this.header = this.element.querySelector(".modalHeader");
      this.backButton = this.header.querySelector(".modalBack");
      this.closeButton = this.header.querySelector(".modalClose");
      this.title = this.element.querySelector(".modalTitle");

      this.backButton.addEventListener("click", () => {
        this.open(this.backButton, null, { previous: true });
      });
      this.closeButton.addEventListener("click", () => {
        this.close();
      });

      requestAnimationFrame(this.runUpdateLoop);
      //this.interval = setInterval(this.update, 1);

      this.element.style.transition = "opacity .3s, border-radius .3s, transform .4s";
      this.element.offsetHeight;
      this.element.style.opacity = 1;

      this.element.parentElement.setAttribute("blur", "");
    }

    let oldContent = this.content;

    this.container.insertAdjacentHTML("beforeend", `<div class="modalContent customScroll" new>
      <div class="modalFrame"></div>
    </div>`);
    let content = this.container.querySelector(".modalContent[new]");
    content.removeAttribute("new");

    content.style.pointerEvents = "none";

    if (oldContent == null) { // New modal:
      this.content = content;
    } else { // From same menu:
      this.cache = {}; // Clear cache
      
      if (previous != true) {
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

      if (previous != true) {
        oldContent.style.left = -this.element.offsetWidth + "px";;
        content.style.left = "0%";
      } else {
        oldContent.style.right = -this.element.offsetWidth + "px";;
        content.style.right = "0%";
      }

      oldContent.style.opacity = 0;
      content.style.opacity = 1;
    }

    if (setTitleHTML == null && this.button != null) {
      let existingTitle = this.button.getAttribute("modaltitle");
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

    this.parent.modal = this;

    let frame = content.querySelector(".modalFrame");
    frame.style.minWidth = "200px";
    frame.style.minHeight = "200px";

    if (oldContent == null) {
      setTimeout(() => {
        if (this.element != null) {
          this.element.style.transition = "width .4s, height .4s, opacity .3s, border-radius .3s, transform .4s";
        }
      }, 400);
    }

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

      modal: this,
      content,
      button: this.button,
      origin: this.origin,
      ...data,
      construct: {
        open: this.open,
        close: this.close
      }
    });
    //await sleep(5000);

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
  close = async () => {
    let remove = this;
    if (this.element == null) {
      remove = window.modal;
    }
    if (remove == null) {
      return;
    }
    remove.closing = true;
    if (remove.origin != null) {
      remove.origin.removeAttribute("activated");
    }
    if (remove.element != null) {
      remove.element.style.opacity = 0;
      remove.element.style.transform = "scale(0)";
      remove.element.style.transform = "translate(-50%, -50%) scale(0)";
      if (remove.element.parentElement != null) {
        remove.element.parentElement.removeAttribute("blur");
      }
    }
    await sleep(350);
    //clearInterval(remove.interval);
    if (remove.element != null && remove.element.parentElement != null) {
      remove.element.parentElement.remove();
    }
  }
}

export const modal = {
  open: async (template, button, data) => {
    return await (await newModule(Modal)).open(template, button, data ?? {});
  },
  close: async () => {
    return await (await newModule(Modal)).close();
  }
};