modules["editor/toolbar"] = class {
  tools = {
    "selection": {
      html: `<div class="eVerticalToolsHolder">
        <button class="eTool" tool="select" tooltip="Select" module="editor/toolbar/select"><div></div></button>
        <button class="eTool" tool="pan" tooltip="Pan" module="editor/toolbar/pan"><div></div></button>
        <button class="eTool" tool="drag" tooltip="Multi-Select" module="editor/toolbar/drag"><div></div></button>
      </div>`
    },
    "draw": {
      html: `<div class="eVerticalToolsHolder">
        <button class="eTool" tool="pen" tooltip="Pen" module="editor/toolbar/pen"><div></div></button>
        <div class="eDivider" keeptoolbar></div>
        <button class="eTool" option="color" tooltip="Color" module="editor/toolbar/color"><div></div></button>
        <button class="eTool" option="thickness" tooltip="Thickness" module="editor/toolbar/thickness"><div></div></button>
        <button class="eTool" option="opacity" tooltip="Opacity" module="editor/toolbar/opacity"><div></div></button>
      </div>`
    },
    "markup": {
      html: `<div class="eVerticalToolsHolder">
        <button class="eTool" tool="highlighter" tooltip="Highlighter" module="editor/toolbar/highlighter"><div></div></button>
        <button class="eTool" tool="underline" tooltip="Underline" module="editor/toolbar/underline"><div></div></button>
        <div class="eDivider" keeptoolbar></div>
        <button class="eTool" option="color" tooltip="Color" module="editor/toolbar/color"><div></div></button>
        <button class="eTool" option="thickness" tooltip="Thickness" module="editor/toolbar/thickness"><div></div></button>
        <button class="eTool" option="opacity" tooltip="Opacity" module="editor/toolbar/opacity"><div></div></button>
      </div>`
    },
    "erase": { id: "erase", type: "tool", module: "editor/toolbar/eraser" },
    "text": { id: "text", type: "tool", module: "editor/toolbar/text" },
    "shape": {
      html: `<div class="eVerticalToolsHolder">
        <button class="eTool" tool="square" tooltip="Square" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="ellipse" tooltip="Ellipse" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="triangle" tooltip="Triangle" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="parallelogram" tooltip="Parallelogram" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="trapezoid" tooltip="Trapezoid" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="rhombus" tooltip="Rhombus" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="line" tooltip="Line" module="editor/toolbar/shape"><div></div></button>
      </div>`
    },
    "sticky": { id: "sticky", type: "tool", module: "editor/toolbar/sticky" },
    "page": { id: "page", type: "tool", module: "editor/toolbar/page" },
    "media": {
      html: `<div class="eVerticalToolsHolder">
        <button class="eTool" tool="upload" tooltip="Upload Image" module="editor/toolbar/upload"><div></div></button>
        <button class="eTool" tool="embed" tooltip="Embed" module="editor/toolbar/embed"><div></div></button>
      </div>`
    }
  };
  css = {
    ".eToolbar": `position: absolute; display: block; width: 50px; height: fit-content; max-height: var(--maxToolbarHeight); top: 50%; transform: translateY(-50%); z-index: 2; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; transition: transform .4s, opacity .4s, border-radius .2s`,
    ".eToolbar[hidden]": `transform: translateY(-50%) scale(0) !important; z-index: 1 !important`,
    ".eToolbarContent": `position: relative; box-sizing: border-box; max-height: var(--maxToolbarHeight); background: var(--pageColor); overflow: auto; z-index: 3; border-radius: inherit`,
    ".eToolbarHolder[left] .eToolbar": `left: 0px; border-radius: 0 12px 12px 0; transform-origin: left center`,
    ".eToolbarHolder[right] .eToolbar": `right: 0px; border-radius: 12px 0 0 12px; transform-origin: right center`,
    ".eToolbarTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; z-index: 5; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`,

    ".eTool": `--hoverColor: var(--hover); width: 50px; height: 46px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
    ".eToolbarHolder[left] .eTool > div": `display: flex; width: 42px; height: 42px; margin: 0 4px; justify-content: left; align-items: center; border-radius: 8px; transition: .2s; overflow: hidden`,
    ".eToolbarHolder[right] .eTool > div": `display: flex; width: 42px; height: 42px; margin: 0 4px; justify-content: right; align-items: center; border-radius: 8px; transition: .2s; overflow: hidden`,
    ".eTool > div > svg": `width: 40px; height: 40px; margin: 1px`,
    ".eTool:hover > div": `background: var(--hoverColor)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active > div": `width: 42px !important; margin: 0 4px !important; border-radius: 8px !important; transform: scale(.95)`,
    //".eTool[selected]:active > div": `width: 42px !important; margin: 0 4px !important; border-radius: 8px !important`,
    ".eTool[selected] > div": `background: var(--theme)`,
    ".eTool[selected][option] > div": `background: var(--secondary)`,
    ".eToolbarHolder[left] .eTool[extend] > div": `width: 46px; margin: 0 0 0 4px; border-radius: 8px 0 0 8px; justify-content: left`,
    ".eToolbarHolder[right] .eTool[extend] > div": `width: 46px; margin: 0 4px 0 0; border-radius: 0 8px 8px 0; justify-content: right`,
    ".eTool[selecthighlight] > div": `background: var(--theme)`,
    ".eTool[selecthighlight]:active > div": `border-radius: 8px !important`,
    ".eTool[off]": `opacity: 0.5`,

    ".eDivider": `width: calc(100% - 8px); height: 4px; margin: 2px 0; background: var(--hover); border-radius: 2px`,
    ".eVerticalDivider": `flex-shrink: 0; width: 4px; height: calc(100% - 8px); margin: 0 2px; background: var(--hover); border-radius: 2px`,

    ".eSubToolHolder": `position: absolute; max-height: 100%; background: var(--pageColor); z-index: 2; opacity: 0; transition: opacity .25s, transform .25s`,
    ".eSubToolHolder[option]": `border-left-color: var(--secondary)`,
    ".eToolbarHolder[left] .eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 20px 16px 0; left: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eToolbarHolder[right] .eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 20px; right: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eToolbarHolder[left] .eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eToolbarHolder[right] .eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; overflow: auto`,
    ".eSubToolHolder[option] .eSubToolContentScroll": `overflow: visible`,
    ".eVerticalToolsHolder": `display: flex; flex-direction: column; padding: 2px 0; align-items: center`
  };
  js = async (editor) => {
    let page = editor.page;

    let toolbarHolder = page.querySelector(".eToolbarHolder");
    let toolbar = toolbarHolder.querySelector(".eToolbar[editor]");
    let tooltipText = toolbarHolder.querySelector(".eToolbarTooltip");
    
    toolbar.innerHTML = `
    <div class="eToolbarContent eVerticalToolsHolder hideScroll">
      <button class="eTool" tool="selection" tooltip="Selection" selected><div></div></button>
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
    let toolbarContent = toolbar.querySelector(".eToolbarContent");

    toolbarHolder.removeAttribute("hidden");

    let contentHolder = editor.contentHolder;
    let content = editor.contentHolder.querySelector(".eContent");
    let annotations = content.querySelector(".eAnnotations");

    let currentTool = "selection";
    let currentSubTool = "select";
    this.currentToolModule = "pages/editor/toolbar/cursor";
    let currentToolButton;
    let subToolbar;

    let subSubToolbar;

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
    this.tooltip = {};
    let tooltipElement;
    let tooltipOpen = false;
    this.tooltip.update = () => {
      if (tooltipElement == null) {
        return;
      }
      if (tooltipElement.hasAttribute("selected") == true && (tooltipElement.hasAttribute("option") == true || tooltipElement.hasAttribute("action") == true)) {
        return this.tooltip.close();
      }
      let tooltipElementStyle = getComputedStyle(tooltipElement);
      let themeColor = getComputedStyle(tooltipElement).getPropertyValue("--hoverTooltip");
      if (themeColor != "" && themeColor != null) {
        tooltipText.style.color = themeColor;
      } else {
        tooltipText.style.color = tooltipElementStyle.getPropertyValue("--theme");
      }
      tooltipText.textContent = tooltipElement.getAttribute("tooltip");

      let toolbarParent = tooltipElement.closest(".eToolbar");
      if (toolbarParent != null) {
        let toolHolderRect = toolbarHolder.getBoundingClientRect();
        let toolbarParentRect = toolbarParent.getBoundingClientRect();
        let buttonRect = tooltipElement.getBoundingClientRect();

        let halfTooltipHeight = tooltipText.offsetHeight / 2;
        let setTop = buttonRect.top - toolHolderRect.top + (tooltipElement.offsetHeight / 2) - halfTooltipHeight;
        if (setTop < toolbarParentRect.top - toolHolderRect.top) {
          setTop = toolbarParentRect.top - toolHolderRect.top;
        } else if (setTop + tooltipText.offsetHeight > toolbarParentRect.top - toolHolderRect.top + toolbarParent.offsetHeight) {
          setTop = toolbarParentRect.top - toolHolderRect.top + toolbarParent.offsetHeight - tooltipText.offsetHeight;
        }
        tooltipText.style.top = setTop + "px";

        if (toolbarHolder.hasAttribute("right") == false) {
          let setLeft = toolbarParent.offsetWidth;
          if (subToolbar != null) {
            let toolbarRect = subToolbar.getBoundingClientRect();
            let toolbarContentScroll = subToolbar.querySelector(".eSubToolContentScroll");
            let subToolWidth = toolbarContentScroll.offsetWidth + 4;
            let subToolTop = toolbarRect.top - toolHolderRect.top;
            if (tooltipElement.closest(".eSubToolHolder") != null) {
              setLeft += subToolWidth;
            } else if (setTop + halfTooltipHeight > subToolTop && setTop + halfTooltipHeight < subToolTop + toolbarContentScroll.offsetHeight) {
              setLeft += subToolWidth;
            }
          }
          tooltipText.style.transformOrigin = "center left";
          tooltipText.style.left = setLeft + 6 + "px";
          tooltipText.style.removeProperty("right");
        } else {
          let setRight = toolbarParent.offsetWidth;
          if (subToolbar != null) {
            let toolbarRect = subToolbar.getBoundingClientRect();
            let toolbarContentScroll = subToolbar.querySelector(".eSubToolContentScroll");
            let subToolWidth = toolbarContentScroll.offsetWidth + 4;
            let subToolTop = toolbarRect.top - toolHolderRect.top;
            if (tooltipElement.hasAttribute("tool") == false) {
              setRight += subToolWidth;
            } else if (setTop + halfTooltipHeight > subToolTop && setTop + halfTooltipHeight < subToolTop + toolbarContentScroll.offsetHeight) {
              setRight += subToolWidth;
            }
          }
          tooltipText.style.transformOrigin = "center right";
          tooltipText.style.right = setRight + 6 + "px";
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
    this.tooltip.set = (event) => {
      let hoverElem = event.target;
      let element = hoverElem.closest("button[tool], button[subtool], button[option], button[action]");
      if ((element == null || element.hasAttribute("tooltip") == false) && (hoverElem.closest("[keeptooltip]") == null || (element != null && element.hasAttribute("option") == true))) {
        tooltipElement = null;
        return this.tooltip.close();
      } else if (element == null) {
        return;
      }
      if (element.hasAttribute("selected") == true && (element.hasAttribute("option") == true || element.hasAttribute("action") == true)) {
        return this.tooltip.close();
      }
      if (element == tooltipElement) {
        return this.tooltip.update();
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
      this.tooltip.update();
      tooltipOpen = true;
      tooltipText.offsetHeight;
      tooltipText.style.transition = ".25s";
      tooltipText.style.transform = "scale(1)";
      tooltipText.style.opacity = 1;
    }
    this.tooltip.close = async () => {
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

    this.activateTool = () => {
      // TODO
    }
    
    // Manage Toolbar:
    this.toolbar = {};
    this.toolbar.update = (update) => {
      if (subToolbar != null && currentToolButton != null) {
        let toolbar = currentToolButton.closest(".eToolbar");
        let contentHolder = subToolbar.querySelector(".eSubToolContentHolder");
        let contentScroll = contentHolder.querySelector(".eSubToolContentScroll");

        let toolsRect = toolbar.getBoundingClientRect();
        let buttonRect = currentToolButton.getBoundingClientRect();

        contentScroll.style.maxHeight = toolbar.clientHeight + "px";

        let subtoolHeight = contentScroll.offsetHeight;
        let setSubToolTop = buttonRect.top - toolsRect.top - 2; // 2 Pixels from top
        if (setSubToolTop + subtoolHeight > toolbar.offsetHeight) {
          setSubToolTop = toolbar.offsetHeight - subtoolHeight;
        } else if (setSubToolTop < 0) {
          setSubToolTop = 0;
        }
        subToolbar.style.top = setSubToolTop + "px";

        if (toolbarHolder.hasAttribute("right") == false) {
          subToolbar.style.borderRadius = "0 12px 12px 0";
          subToolbar.style.left = "100%";
          subToolbar.style.removeProperty("right");
          subToolbar.style.borderLeft = "solid 4px var(--theme)";
          subToolbar.style.removeProperty("border-right");
          if (setSubToolTop < 13) {
            toolbar.style.borderTopRightRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-top-right-radius");
          }
          toolbar.style.removeProperty("border-top-left-radius");
          if (setSubToolTop + subtoolHeight > toolbar.offsetHeight - 12) {
            toolbar.style.borderBottomRightRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-bottom-right-radius");
          }
          toolbar.style.removeProperty("border-bottom-left-radius");
        } else {
          subToolbar.style.borderRadius = "12px 0 0 12px";
          subToolbar.style.right = "100%";
          subToolbar.style.removeProperty("left");
          subToolbar.style.borderRight = "solid 4px var(--theme)";
          subToolbar.style.removeProperty("border-left");
          if (setSubToolTop < 13) {
            toolbar.style.borderTopLeftRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-top-left-radius");
          }
          toolbar.style.removeProperty("border-top-right-radius");
          if (setSubToolTop + subtoolHeight > toolbar.offsetHeight - 12) {
            toolbar.style.borderBottomLeftRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-bottom-left-radius");
          }
          toolbar.style.removeProperty("border-bottom-right-radius");
        }
        
        contentHolder.style.width = contentScroll.offsetWidth + "px";
        contentHolder.style.height = contentScroll.offsetHeight + "px";

        subToolbar.style.transform = "translateX(0%)";
        subToolbar.style.opacity = 1;
      } else if (currentToolButton != null) {
        let toolbar = currentToolButton.closest(".eToolbar");
        toolbar.style.removeProperty("border-top-right-radius");
        toolbar.style.removeProperty("border-bottom-right-radius");
        toolbar.style.removeProperty("border-top-left-radius");
        toolbar.style.removeProperty("border-bottom-left-radius");
      }

      if (update != false) {
        this.tooltip.update();
      }
    }
    toolbarContent.addEventListener("scroll", () => { this.toolbar.update() });
    this.toolbar.updateButtons = async (contentHolder) => {
      let gottenTools = contentHolder.querySelectorAll(".eTool");
      for (let i = 0; i < gottenTools.length; i++) {
        let tool = gottenTools[i];
        if (tool.hasAttribute("tool") == true) {
          setSVG(tool.querySelector("div"), "./images/editor/toolbar/" + tool.getAttribute("tool") + ".svg");
        } else if (tool.hasAttribute("module") == true) {
          let newModule = await this.newModule(tool.getAttribute("module"));
          newModule.editor = editor;
          if (newModule.setToolbarButton != null) {
            newModule.setToolbarButton(tool.querySelector("div"));
          }
        }
      }
    }
    this.toolbar.createSub = async () => {
      if (currentToolButton == null) {
        return;
      }
      let toolData = this.tools[currentTool] ?? {};
      if (toolData.module != null) {
        return toolData;
      }

      let toolbar = currentToolButton.closest(".eToolbar");
      toolbar.insertAdjacentHTML("beforeend", `<div class="eSubToolHolder" keeptooltip new>
        <div class="eSubToolShadow"></div>
        <div class="eSubToolContentHolder">
          <div class="eSubToolContentScroll hideScroll">
            <div class="eSubToolContent" keeptooltip></div>
          </div>
        </div>
      </div>`);
      subToolbar = toolbar.querySelector(".eSubToolHolder[new]");
      subToolbar.removeAttribute("new");
      if (toolbarHolder.hasAttribute("right") == false) {
        subToolbar.style.transform = "translateX(-100%)";
      } else {
        subToolbar.style.transform = "translateX(100%)";
      }

      let contentHolder = subToolbar.querySelector(".eSubToolContent");
      if (toolData.frame != null) {
        await this.parent.setFrame(toolData.frame, contentHolder, { toolbar: this });
      } else if (toolData.html != null) {
        contentHolder.innerHTML = toolData.html;
      }
      this.toolbar.updateButtons(contentHolder);

      subToolbar.offsetHeight;
      return toolData;
    }
    this.toolbar.closeSub = () => {
      if (subToolbar == null) {
        return;
      }
      let removeToolbar = subToolbar;
      subToolbar = null;
      this.toolbar.update(false);
      //this.tooltip.update();
      (async () => {
        removeToolbar.style.zIndex = 1;
        if (toolbarHolder.hasAttribute("right") == false) {
          removeToolbar.style.transform = "translateX(-100%)";
        } else {
          removeToolbar.style.transform = "translateX(100%)";
        }
        removeToolbar.style.opacity = 0;
        await sleep(300);
        if (removeToolbar != null) {
          removeToolbar.remove();
        }
      })();
    }
    this.toolbar.enableTool = async (button, shortPress) => {
      let toolID = button.getAttribute("tool");
      let isSelected = button.hasAttribute("selected");
      let isExtended = button.hasAttribute("extend");
      
      let lastSelectedQuery = "button[selected]";
      if (button.hasAttribute("option") == true) {
        lastSelectedQuery += "[option]";
      }
      let lastSelected = button.parentElement.querySelectorAll(lastSelectedQuery);
      for (let i = 0; i < lastSelected.length; i++) {
        let prev = lastSelected[i];
        if (prev != button && prev.hasAttribute("noselect") == false) {
          prev.removeAttribute("selected");
          prev.removeAttribute("extend");
        }
      }
      if (isSelected == false) {
        button.setAttribute("selected", "");
      }

      if (button.closest(".eToolbarContent") != null) { // Toolbar button
        if (shortPress == true) {
          this.toolbar.closeSub();
          if (isExtended == false) {
            let toolData = await this.toolbar.createSub();
            if (subToolbar != null) {
              let selectTool = (editor.preferences.tools[toolID] ?? {}).subtool;
              if (selectTool != null) {
                let selectSubtool = subToolbar.querySelector('.eTool[tool="' + selectTool + '"]');
                if (selectSubtool != null) {
                  currentSubTool = selectTool;
                  this.currentToolModule = selectSubtool.getAttribute("module");
                  selectSubtool.setAttribute("selected", "");
                }
              } else {
                this.currentToolModule = null;
              }
            } else {
              this.currentToolModule = toolData.module;
              this.tooltip.update();
            }
            this.activateTool();
          } else {
            this.tooltip.update();
          }
        } else {
          if (isExtended == false && subToolbar != null) {
            button.setAttribute("extend", "");
          } else {
            button.removeAttribute("extend");
          }
        }
      } else if (button.closest(".eSubToolContentScroll") != null) { // SubToolbar Button
        if (button.hasAttribute("option") == false) { // Subtool
          if (shortPress == true) {
            currentSubTool = button.getAttribute("tool");
            this.currentToolModule = button.getAttribute("module");
            this.activateTool();
          }
        } else { // Option
          if (shortPress == true) {
            // Close SubSub Function Here
            if (isSelected == false) {
              // TODO
            } else {
              button.removeAttribute("selected");
            }
          } else {
            if (isExtended == false) { // && subSubToolbar != null
              button.setAttribute("extend", "");
            } else {
              button.removeAttribute("extend");
              button.removeAttribute("selected");
            }
          }
        }
      }
      //this.tooltip.update();
    }
    let lastSetButton;
    this.toolbar.setTool = async (targetButton, shortPress) => {
      let button = targetButton ?? lastSetButton;
      if (button == null || button.hasAttribute("noselect") == true) {
        return;
      }
      let toolID = button.getAttribute("tool");
      if (this.checkToolEnabled(toolID) == false) {
        return alertModule.open("warning", "<b>Tool Toggle</b>The lesson owner has disabled this tool.");
      }

      if (targetButton != null) {
        lastSetButton = targetButton;
      } else {
        lastSetButton = null;
      }

      if (button.closest(".eToolbarContent") != null) {
        currentTool = toolID;
        currentToolButton = button;
        await this.toolbar.enableTool(button, shortPress);
      } else if (button.closest(".eSubToolContentScroll") != null) {
        let setSubTool = button.getAttribute("tool");
        if (setSubTool != null) {
          currentSubTool = setSubTool;
          if ((editor.preferences.tools[currentTool] ?? {}).subtool != null) {
            editor.preferences.tools[currentTool].subtool = currentSubTool;
            editor.savePreferences();
          }
          await this.toolbar.enableTool(button, shortPress);
        } else {
          await this.toolbar.enableTool(button, shortPress);
        }
      }

      if (shortPress != true) {
        this.toolbar.update(false);
        this.tooltip.update();
      }
    }
    toolbarHolder.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.toolbar.setTool(event.target.closest("button"), true);
        this.toolbar.setTool();
      }
    });
    this.toolbar.checkToolToggle = () => {
      let disabledTools = (editor.settings ?? {}).disabled ?? [];

      let toolElements = toolbarContent.querySelectorAll(".eTool[tool]");
      for (let i = 0; i < toolElements.length; i++) {
        let tool = toolElements[i];
        if (editor.self.access > 3 || disabledTools.includes(tool.getAttribute("tool")) == false) {
          tool.removeAttribute("off");
        } else {
          tool.setAttribute("off", "");
        }
      }
      if (disabledTools.includes(currentTool) == true && editor.self.access > 0) {
        alertModule.open("warning", "<b>Tool Toggle</b>Your current tool was disabled by the lesson owner.");
        this.toolbar.setTool(toolbarContent.querySelector('.eTool[tool="selection"]'), true);
        this.toolbar.setTool();
      }
    }
    this.toolbar.checkToolToggle();

    this.toolbar.updateMaxHeight = () => {
      toolbarHolder.style.setProperty("--maxToolbarHeight", toolbarHolder.offsetHeight + "px"); // Have to add this solution because FIREFOX
    }
    this.toolbar.updateMaxHeight();
    this.activateTool();
    this.toolbar.updateButtons(toolbarHolder);

    this.getToolPreference = () => {
      return editor.preferences.tools[currentSubTool] ?? editor.preferences.tools[currentTool];
    }
    this.getAnnotationPreference = () => {
      let selectKeys = Object.keys(editor.selecting);
      let annoID = selectKeys[selectKeys.length - 1];
      return {
        ...((editor.annotations[annoID] ?? {}).render ?? {}),
        ...(editor.selecting[annoID] ?? {})
      } ?? {};
    }

    // Subscribe to Events:
    editor.pipeline.subscribe("toolbarMouse", "mousedown", (data) => {
      let event = data.event;
      if (event.buttons > 1) {
        return;
      }
      let target = event.target;
      if (target.closest(".eToolbar") == toolbar) {
        this.toolbar.setTool(target.closest("button"), true);
      }
    });
    editor.pipeline.subscribe("toolbarMouse", "mousemove", (data) => {
      let event = data.event;
      this.tooltip.set(event);
    });
    editor.pipeline.subscribe("toolbarMouse", "mouseup", (data) => {
      this.toolbar.setTool();
    });
    editor.pipeline.subscribe("toolbarMouse", "mouseleave", () => {
      this.tooltip.close();
    });
    editor.pipeline.subscribe("toolbarPageResize", "resize", () => {
      this.toolbar.updateMaxHeight();
      this.toolbar.update();
    });
    editor.pipeline.subscribe("toolbarPageResize", "page_add", () => {
      this.toolbar.updateMaxHeight();
      this.toolbar.update();
    });
    editor.pipeline.subscribe("toolbarEditorUpdate", "set", (data) => {
      if (data.hasOwnProperty("settings") == true) {
        this.toolbar.checkToolToggle();
      }
    });
    editor.toolbar = this;
  }
}

modules["editor/toolbar/color"] = class {
  setToolbarButton = (button) => {
    button.innerHTML = `<div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div>`;
    button.querySelector(".eSubToolColor").style.background = "#" + ((this.parent.getToolPreference() ?? {}).color ?? {}).selected;
  }

  css = {
    ".eSubToolColorHolder": `box-sizing: border-box; display: flex; width: 36px; height: 36px; margin: 3px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 18px; justify-content: center; align-items: center`,
    ".eSubToolColor": `width: 100%; height: 100%; border-radius: 16px`
  };
}

modules["editor/toolbar/thickness"] = class {
  setToolbarButton = (button) => {
    button.innerHTML = `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThicknessHolder"><div class="eSubToolThickness"></div></div></div>`;
    let thickness = button.querySelector(".eSubToolThickness");
    let preference = this.parent.getToolPreference() ?? {};
    thickness.style.height = preference.thickness + "px";
    thickness.style.background = "#" + (preference.color ?? {}).selected;
  }

  css = {
    ".eSubToolThicknessButtonHolder": `position: relative; display: flex; width: 42px; height: 42px; align-items: center; overflow: hidden`,
    ".eSubToolThicknessHolder": `position: absolute; padding: 3px; background: var(--pageColor); border-radius: 16px`,
    ".eToolbarHolder[left] .eSubToolThicknessHolder": `transform: translateX(-12px)`,
    ".eToolbarHolder[right] .eSubToolThicknessHolder": `transform: translateX(4px)`,
    ".eSubToolThickness": `width: 44px; border-radius: 10px`
  };
}

modules["editor/toolbar/opacity"] = class {
  setToolbarButton = async (button) => {
    await setSVG(button, "./images/editor/toolbar/opacity.svg");
    let svg = button.querySelector("svg");
    let preference = this.parent.getToolPreference() ?? {};
    svg.querySelector("path").style.opacity = preference.opacity / 100;
    svg.style.setProperty("--toolColor", "#" + (preference.color ?? {}).selected);
  }
}