modules["editor/toolbar"] = class {
  css = {
    ".eToolbar": `position: absolute; width: 50px; height: 100%; max-height: fit-content; top: 50%; transform: translateY(-50%); background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; transition: all .4s, border-radius .2s`,
    ".eToolbarContent": `box-sizing: border-box; display: flex; flex-direction: column; height: fit-content; max-height: 100%; padding: 2px 0; align-items: center; overflow: auto; scrollbar-width: none; border-radius: inherit`,
    ".eToolbarContent::-webkit-scrollbar": `display: none`,
    ".eToolbar[hidden]": `transform: translateY(-50%) scale(0) !important`,
    ".eToolbarHolder[left] .eToolbar": `left: 0px; border-radius: 0 12px 12px 0; transform-origin: left center`,
    ".eToolbarHolder[right] .eToolbar": `right: 0px; border-radius: 12px 0 0 12px; transform-origin: right center`,
    ".eToolbarTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`,

    ".eTool": `--hoverColor: var(--hover); width: 50px; height: 46px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
    ".eToolbarHolder[left] .eTool > div": `display: flex; width: 42px; height: 42px; margin: 0 4px; justify-content: left; align-items: center; border-radius: 8px; transition: .2s; overflow: hidden`,
    ".eToolbarHolder[right] .eTool > div": `display: flex; width: 42px; height: 42px; margin: 0 4px; justify-content: right; align-items: center; border-radius: 8px; transition: .2s; overflow: hidden`,
    ".eTool > div > svg": `width: 40px; height: 40px; margin: 1px`,
    ".eTool:hover > div": `background: var(--hoverColor)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active > div": `transform: scale(.95)`,
    ".eTool[option]:active > div": `background: var(--secondary); border-radius: 22px`,
    ".eTool[selected]:active > div": `width: 42px !important; margin: 0 4px !important; border-radius: 8px !important`,
    ".eTool[selected][option]:active > div": `border-radius: 22px !important`,
    ".eTool[selected] > div": `background: var(--theme)`,
    ".eTool[selected][option] > div": `background: var(--secondary)`,
    ".eToolbarHolder[left] .eTool[extend] > div": `width: 46px; margin: 0 0 0 4px; border-radius: 8px 0 0 8px; justify-content: left`,
    ".eToolbarHolder[right] .eTool[extend] > div": `width: 46px; margin: 0 4px 0 0; border-radius: 0 8px 8px 0; justify-content: right`,
    ".eTool[selecthighlight] > div": `background: var(--theme)`,
    ".eTool[selecthighlight]:active > div": `border-radius: 8px !important`,
    ".eTool[off]": `opacity: 0.5`,

    ".eDivider": `width: calc(100% - 8px); height: 4px; margin: 2px 0; background: var(--hover); border-radius: 2px`,
    ".eVerticalDivider": `flex-shrink: 0; width: 4px; height: calc(100% - 8px); margin: 0 2px; background: var(--hover); border-radius: 2px`,

    ".eSubToolHolder": `position: absolute; max-height: 100%; left: 100%; top: 0px; background: var(--pageColor); border-radius: 0 16px 16px 0; border-left: solid 4px var(--theme); transform-origin: top left; transition: opacity .3s, transform: .3s`,
    ".eSubToolHolder[option]": `border-left-color: var(--secondary)`,
    ".eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 20px 16px 0; left: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; overflow: auto`,
    ".eSubToolHolder[option] .eSubToolContentScroll": `overflow: visible`,
    ".eSubToolContent": `display: flex; flex-wrap: wrap; gap: 6px`
  };
  js = async (editor) => {
    let page = editor.page;

    let toolbarHolder = page.querySelector(".eToolbarHolder");
    let editorToolbar = toolbarHolder.querySelector(".eToolbar[editor]");
    let tooltipText = toolbarHolder.querySelector(".eToolbarTooltip");
    
    editorToolbar.innerHTML = `
    <div class="eToolbarContent">
      <button class="eTool" tool="select" tooltip="Selection" selected><div></div></button>
      <button class="eTool" tool="draw" tooltip="Draw"><div></div></button>
      <button class="eTool" tool="markup" tooltip="Markup"><div></div></button>
      <button class="eTool" tool="erase" tooltip="Erase"><div></div></button>
      <button class="eTool" tool="text" tooltip="Text Box"><div></div></button>
      <button class="eTool" tool="shape" tooltip="Shapes"><div></div></button>
      <button class="eTool" tool="sticky" tooltip="Stickies"><div></div></button>
      <button class="eTool" tool="page" tooltip="Page"><div></div></button>
      <button class="eTool" tool="media" tooltip="Media"><div></div></button>
    </div>
    `;

    // Apply toolbar images:
    let gottenTools = toolbarHolder.querySelectorAll(".eTool");
    for (let i = 0; i < gottenTools.length; i++) {
      let tool = gottenTools[i];
      setSVG(tool.querySelector("div"), "./images/editor/toolbar/" + (tool.getAttribute("tool") ?? tool.getAttribute("subtool")) + ".svg");
    }

    toolbarHolder.style.display = "flex";

    let contentHolder = editor.contentHolder;
    let content = editor.contentHolder.querySelector(".eContent");
    let annotations = content.querySelector(".eAnnotations");

    let subToolbar;
    let mainSubtoolButton;

    // Handle Disabled Tools:
    let subToolTypes = {
      draw: ["draw"],
      markup: ["markup"],
      shape: ["shape"],
      text: ["text"],
      sticky: ["sticky"],
      page: ["page"],
      media: ["media", "embed"]
    };
    this.checkToolEnabled = (check) => {
      if (editor.self.access > 3) {
        return true;
      }
      if ((editor.settings.disabled ?? []).includes(check) == true) {
        return false;
      }
      return true;
    }
    this.checkSubToolEndabled = (check) => {
      if (editor.self.access > 3) {
        return true;
      }
      let disabled = editor.settings.disabled ?? [];
      for (let i = 0; i < disabled.length; i++) {
        let subTool = subToolTypes[disabled[i]];
        if (subTool != null && subTool.includes(check) == true) {
          return false;
        }
      }
      return true;
    }

    // Handle Tooltip:
    let tooltipElement;
    let tooltipOpen = false;
    this.updateTooltip = () => {
      if (tooltipElement == null) {
        return;
      }
      if (tooltipElement.hasAttribute("selected") == true && (tooltipElement.hasAttribute("option") == true || tooltipElement.hasAttribute("action") == true)) {
        return this.closeTooltip();
      }
      let themeColor = getComputedStyle(tooltipElement).getPropertyValue("--hoverTooltip");
      if (themeColor != "" && themeColor != null) {
        tooltipText.style.color = themeColor;
      } else {
        tooltipText.style.color = "var(--theme)";
      }

      let toolbarParent = tooltipElement.closest(".eToolbar");
      if (toolbarParent != null) {
        let toolHolderRect = toolbarHolder.getBoundingClientRect();
        let buttonRect = tooltipElement.getBoundingClientRect();

        if (toolbarHolder.hasAttribute("right") == false) {
          let setLeft = toolbarParent.offsetWidth;
          let setTop = buttonRect.top - toolHolderRect.top + (tooltipElement.offsetHeight / 2) - (tooltipText.offsetHeight / 2);
          if (subToolbar != null) {
            let subToolWidth = parseInt(subToolbar.getAttribute("setwidth")) + 4;
            let subToolTop = parseInt(subToolbar.getAttribute("settop"));
            if (tooltipElement.closest(".eSubToolHolder") != null) {
              setLeft += subToolWidth;
            } else if (mainSubtoolButton != null) {
              if (setTop > subToolTop && setTop < subToolTop + parseInt(subToolbar.getAttribute("setheight"))) {
                setLeft += subToolWidth;
              }
            }
          }
          tooltipText.style.transformOrigin = "center left";
          tooltipText.style.left = setLeft + 6 + "px";
          tooltipText.style.top = setTop + "px";
          tooltipText.style.removeProperty("right");
        } else {
          let setRight = toolbarParent.offsetWidth;
          let setTop = buttonRect.top - toolHolderRect.top + (tooltipElement.offsetHeight / 2) - (tooltipText.offsetHeight / 2);
          if (subToolbar != null) {
            let subToolWidth = parseInt(subToolbar.getAttribute("setwidth")) + 4;
            let subToolTop = parseInt(subToolbar.getAttribute("settop"));
            if (tooltipElement.hasAttribute("tool") == false) {
              setRight += subToolWidth;
            } else if (mainSubtoolButton != null) {
              if (setTop > subToolTop && setTop < subToolTop + parseInt(subToolbar.getAttribute("setheight"))) {
                setRight += subToolWidth;
              }
            }
          }
          tooltipText.style.transformOrigin = "center right";
          tooltipText.style.right = setRight + 6 + "px";
          tooltipText.style.top = setTop + "px";
          tooltipText.style.removeProperty("left");
        }
        return;
      }

      let actionContainer = tooltipElement.closest(".eActionContainer");
      let barRect = tooltipText.parentElement.getBoundingClientRect();
      let buttonRect = tooltipElement.getBoundingClientRect();

      tooltipText.style.left = (buttonRect.left - barRect.left) + (tooltipElement.clientWidth / 2) - (tooltipText.clientWidth / 2) + "px";

      if (actionContainer == null) {
        if (tooltipText.parentElement.hasAttribute("tooltipbottom") == false) {
          // Show tooltip on the top
          tooltipText.style.transformOrigin = "center bottom";
          tooltipText.style.top = -tooltipText.clientHeight - 6 + "px";
        } else {
          // Show tooltip on the bottom
          tooltipText.style.transformOrigin = "center top";
          tooltipText.style.top = tooltipText.parentElement.clientHeight + 6 + "px";
        }
        return;
      }

      let actionRect = actionContainer.getBoundingClientRect();

      if (tooltipText.parentElement.hasAttribute("actionuitop") == true) {
        if (actionRect.top - tooltipText.clientHeight - 6 > 66) {
          tooltipText.style.transformOrigin = "center bottom";
          tooltipText.style.top = -actionContainer.offsetHeight - tooltipText.clientHeight - 6 + "px";
        } else {
          tooltipText.style.transformOrigin = "center top";
          tooltipText.style.top = "4px";
        }
        return;
      }

      if (actionRect.top + actionContainer.clientHeight + tooltipText.clientHeight + 6 < fixed.offsetHeight - 66) {
        tooltipText.style.transformOrigin = "center top";
        tooltipText.style.top = tooltipText.parentElement.clientHeight + actionContainer.offsetHeight + 6 + "px";
      } else {
        tooltipText.style.transformOrigin = "center bottom";
        tooltipText.style.top = actionContainer.offsetHeight - tooltipText.clientHeight - 6 + "px";
      }
    }
    this.setTooltip = (event) => {
      let hoverElem = event.target;
      let element = hoverElem.closest("button[tool], button[subtool], button[option], button[action]");
      if ((element == null || element.hasAttribute("tooltip") == false) && (hoverElem.closest("[keeptooltip]") == null || (element != null && element.hasAttribute("option") == true))) {
        tooltipElement = null;
        return this.closeTooltip();
      } else if (element == null) {
        return;
      }
      if (element.hasAttribute("selected") == true && (element.hasAttribute("option") == true || element.hasAttribute("action") == true)) {
        return this.closeTooltip();
      }
      if (element == tooltipElement) {
        return this.updateTooltip();
      }
      let toolbar = hoverElem.closest(".eToolbar .content");
      if (toolbar != null && tooltipText.parentElement != toolbar) {
        toolbar.appendChild(tooltipText);
      }
      toolbar = hoverElem.closest(".eSelectBar");
      if (toolbar != null && tooltipText.parentElement != toolbar) {
        toolbar.appendChild(tooltipText);
      }
      tooltipElement = element;
      tooltipText.textContent = element.getAttribute("tooltip");
      this.updateTooltip();
      tooltipOpen = true;
      tooltipText.offsetHeight;
      tooltipText.style.transition = ".3s";
      tooltipText.style.transform = "scale(1)";
      tooltipText.style.opacity = 1;
    }
    this.closeTooltip = async () => {
      if (tooltipOpen == false) {
        return;
      }
      tooltipOpen = false;
      tooltipText.style.transform = "scale(0)";
      tooltipText.style.opacity = 0;
      await sleep(300);
      if (tooltipOpen == false) {
        tooltipText.style.transition = "unset";
      }
    }

    // Manage Toolbar:
    let currentTool;
    let currentToolButton;
    this.updateToolbars = () => {
      if (subToolbar != null) {
        let subToolbarContent = subToolbar.querySelector(".eSubToolContent");
        subToolbarContent.style.width = "50px";
        subToolbarContent.style.height = "200px";
      }
    }
    this.openSubToolbar = async () => {
      if (currentToolButton == null) {
        return;
      }
      let topbar = currentToolButton.closest(".eToolbar");
      topbar.insertAdjacentHTML("beforeend", `<div class="eSubToolHolder" keeptooltip new>
        <div class="eSubToolShadow"></div>
        <div class="eSubToolContentHolder">
          <div class="eSubToolContentScroll">
            <div class="eSubToolContent" keeptooltip></div>
          </div>
          <div class="eSubToolHolder" option>
            <div class="eSubToolShadow"></div>
              <div class="eSubToolContentHolder">
                <div class="eSubToolContentScroll">
                  <div class="eSubToolContent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
      subToolbar = topbar.querySelector(".eSubToolHolder[new]");
      subToolbar.removeAttribute("new");
      
      this.updateToolbars();
    }
    this.closeSubToolbar = async () => {
      if (subToolbar == null) {
        return;
      }
      let removeToolbar = subToolbar;
      if (removeToolbar != null) {
        removeToolbar.remove();
      }
    }
    this.setTool = (button) => {
      if (button == null || button.hasAttribute("noselect") == true) {
        return;
      }
      let toolID = button.getAttribute("tool");
      let subToolID = button.getAttribute("subtool");
      let setToolID = toolID ?? subToolID;
      if (this.checkToolEnabled(toolID) == false) {
        return alertModule.open("warning", "<b>Tool Toggle</b>The lesson owner has disabled this tool.");
      }

      let lastSelectedQuery = "button[selected]";
      if (button.hasAttribute("option") == true) {
        lastSelectedQuery += "[option]";
      }
      let lastSelected = button.parentElement.querySelectorAll(lastSelectedQuery);
      for (let i = 0; i < lastSelected.length; i++) {
        lastSelected[i].removeAttribute("selected");
      }
      button.setAttribute("selected", "");

      if (toolID != null) {
        this.closeSubToolbar();
        currentTool = setToolID;
        currentToolButton = button;
        this.openSubToolbar();
      }
    }
    toolbarHolder.addEventListener("mousedown", (event) => { this.setTool(event.target.closest("button")); });
    toolbarHolder.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.setTool(event.target.closest("button"));
      }
    });

    // Subscribe to Events:
    editor.pipeline.subscribe("toolbarMouseMove", "mousemove", (data) => {
      let event = data.event;
      this.setTooltip(event);
    });
    editor.pipeline.subscribe("toolbarMouseLeave", "mouseleave", () => {
      this.closeTooltip();
    });
  }
}