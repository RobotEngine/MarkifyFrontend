import { sleep } from "@/crucial";

export class Tooltip {
  constructor(toolbar) {
    this.toolbar = toolbar;
    this.editor = toolbar.editor;
  }

  //tooltipElement = null;
  //tooltipText = null;

  update() {
    if (this.tooltipElement == null) {
      return;
    }
    if (this.tooltipElement.hasAttribute("selected") == true && (this.tooltipElement.hasAttribute("option") == true || this.tooltipElement.hasAttribute("action") == true)) {
      return this.close();
    }
    let parent = this.tooltipElement.closest(".eToolbarHolder") ?? this.tooltipElement.closest(".eActionBar");
    if (parent == null) {
      return this.close();
    }
    if (this.tooltipText != null && this.tooltipText.parentElement != parent) {
      this.close();
    }
    if (this.tooltipText == null) {
      parent.insertAdjacentHTML("beforeend", `<div class="eToolbarTooltip" new></div>`);
      this.tooltipText = parent.querySelector(".eToolbarTooltip[new]");
      this.tooltipText.removeAttribute("new");
    }
    let tooltipElementStyle = getComputedStyle(this.tooltipElement);
    let themeColor = tooltipElementStyle.getPropertyValue("--hoverTooltip");
    if (themeColor != "" && themeColor != null) {
      this.tooltipText.style.color = themeColor;
    } else {
      this.tooltipText.style.color = tooltipElementStyle.getPropertyValue("--theme");
    }
    let setText = this.tooltipElement.getAttribute("tooltip");
    if (this.tooltipText.textContent != setText) {
      this.tooltipText.textContent = setText;
    }

    let toolbarParent = this.tooltipElement.closest(".eToolbar");
    if (toolbarParent != null) {
      let toolHolderRect = this.toolbar.toolbarHolder.getBoundingClientRect();
      let toolbarParentRect = toolbarParent.getBoundingClientRect();
      let buttonRect = this.tooltipElement.getBoundingClientRect();

      let halfTooltipHeight = this.tooltipText.offsetHeight / 2;
      let setTop = buttonRect.top - toolHolderRect.top + (this.tooltipElement.offsetHeight / 2) - halfTooltipHeight;
      if (setTop < toolbarParentRect.top - toolHolderRect.top) {
        setTop = toolbarParentRect.top - toolHolderRect.top;
      } else if (setTop + this.tooltipText.offsetHeight > toolbarParentRect.top - toolHolderRect.top + toolbarParent.offsetHeight) {
        setTop = toolbarParentRect.top - toolHolderRect.top + toolbarParent.offsetHeight - this.tooltipText.offsetHeight;
      }
      this.tooltipText.style.top = setTop + "px";

      if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
        let setLeft = toolbarParent.offsetWidth;
        if (this.toolbar.subToolbar != null && this.toolbar.subToolbar.hasAttribute("open") == true) {
          let subToolbarContainer = this.toolbar.subToolbar.querySelector(".eSubToolContainer");
          let toolbarRect = subToolbarContainer.getBoundingClientRect();
          let toolbarContentScroll = subToolbarContainer.querySelector(".eSubToolContentScroll");
          let subToolWidth = toolbarContentScroll.offsetWidth + 4;
          let subToolTop = toolbarRect.top - toolHolderRect.top;
          if (this.tooltipElement.closest(".eSubToolHolder") != null) {
            setLeft += subToolWidth;
          } else if (setTop + halfTooltipHeight > subToolTop && setTop + halfTooltipHeight < subToolTop + toolbarContentScroll.offsetHeight) {
            setLeft += subToolWidth;
          }
        }
        this.tooltipText.style.transformOrigin = "center left";
        this.tooltipText.style.left = setLeft + 6 + "px";
        this.tooltipText.style.removeProperty("right");
      } else {
        let setRight = toolbarParent.offsetWidth;
        if (this.toolbar.subToolbar != null && this.toolbar.subToolbar.hasAttribute("open") == true) {
          let subToolbarContainer = this.toolbar.subToolbar.querySelector(".eSubToolContainer");
          let toolbarRect = subToolbarContainer.getBoundingClientRect();
          let toolbarContentScroll = subToolbarContainer.querySelector(".eSubToolContentScroll");
          let subToolWidth = toolbarContentScroll.offsetWidth + 4;
          let subToolTop = toolbarRect.top - toolHolderRect.top;
          if (this.tooltipElement.hasAttribute("tool") == false) {
            setRight += subToolWidth;
          } else if (setTop + halfTooltipHeight > subToolTop && setTop + halfTooltipHeight < subToolTop + toolbarContentScroll.offsetHeight) {
            setRight += subToolWidth;
          }
        }
        this.tooltipText.style.transformOrigin = "center right";
        this.tooltipText.style.right = setRight + 6 + "px";
        this.tooltipText.style.removeProperty("left");
      }
      return;
    }

    let actionContainer = this.tooltipElement.closest(".eActionContainer");
    let barRect = this.tooltipText.parentElement.getBoundingClientRect();
    let buttonRect = this.tooltipElement.getBoundingClientRect();

    this.tooltipText.style.left = (buttonRect.left - barRect.left) + (this.tooltipElement.clientWidth / 2) - (this.tooltipText.clientWidth / 2) + "px";

    if (actionContainer == null) {
      if (this.tooltipText.parentElement.hasAttribute("tooltipbottom") == false) {
        // Show tooltip on the top
        this.tooltipText.style.transformOrigin = "center bottom";
        this.tooltipText.style.top = -this.tooltipText.offsetHeight - 6 + "px";
      } else {
        // Show tooltip on the bottom
        this.tooltipText.style.transformOrigin = "center top";
        this.tooltipText.style.top = this.tooltipText.parentElement.offsetHeight + 6 + "px";
      }
      return;
    }

    let actionRect = actionContainer.getBoundingClientRect();
    if (this.tooltipText.parentElement.hasAttribute("top") == true) {
      if (actionRect.top - this.tooltipText.offsetHeight - 6 > this.editor.scrollOffset + 8) {
        this.tooltipText.style.transformOrigin = "center bottom";
        this.tooltipText.style.top = -actionContainer.offsetHeight - this.tooltipText.offsetHeight - 6 + "px";
      } else {
        this.tooltipText.style.transformOrigin = "center top";
        this.tooltipText.style.top = "4px";
      }
      return;
    }

    if (actionRect.top + actionContainer.offsetHeight + this.tooltipText.offsetHeight + 6 < this.editor.page.offsetHeight - this.editor.scrollOffset - 8) {
      this.tooltipText.style.transformOrigin = "center top";
      this.tooltipText.style.top = this.tooltipText.parentElement.offsetHeight + actionContainer.offsetHeight + 6 + "px";
    } else {
      this.tooltipText.style.transformOrigin = "center bottom";
      this.tooltipText.style.top = actionContainer.offsetHeight - this.tooltipText.offsetHeight - 6 + "px";
    }
  }

  set(event) {
    let hoverElem = event.target;
    if (this.editor.isThisPage(hoverElem) != true) {
      return;
    }
    let element = hoverElem.closest("button[tool], button[subtool], button[option], button[action]");
    let noTooltip = element == null || element.hasAttribute("tooltip") == false;
    if (noTooltip == true && (hoverElem.closest("[keeptooltip]") == null || hoverElem.closest("[closetooltip]") != null)) {
      return this.close();
    } else if (noTooltip == true) {
      return;
    }
    if (element.hasAttribute("selected") == true && (element.hasAttribute("option") == true || element.hasAttribute("action") == true)) {
      return this.close();
    }
    if (this.tooltipText != null && element == this.tooltipElement) {
      return this.update();
    }
    this.tooltipElement = element;
    this.update();
    if (this.tooltipText != null) {
      this.tooltipText.offsetHeight;
      this.tooltipText.style.transition = ".25s";
      this.tooltipText.style.transform = "scale(1)";
      this.tooltipText.style.opacity = 1;
    }
  }

  async close() {
    if (this.tooltipText == null) {
      return;
    }
    let removeTooltip = this.tooltipText;
    this.tooltipText = null;
    (async () => {
      removeTooltip.style.transform = "scale(0)";
      removeTooltip.style.opacity = 0;
      await sleep(300);
      if (removeTooltip != null) {
        removeTooltip.remove();
      }
    })();
  }
}