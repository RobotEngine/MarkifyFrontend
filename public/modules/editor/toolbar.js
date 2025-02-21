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

    ".eSubToolHolder": `position: absolute; max-height: 100%; background: var(--pageColor); z-index: 2; opacity: 0; transition: opacity .25s, transform .25s; border-radius: var(--borderRadius)`,
    ".eToolbarHolder[left] .eSubToolHolder": `left: 100%; padding-left: 4px; border-radius: 0 12px 12px 0`,
    ".eToolbarHolder[right] .eSubToolHolder": `right: 100%; padding-right: 4px; border-radius: 12px 0 0 12px`,
    ".eSubToolHolder:after": `content: ""; position: absolute; width: 4px; height: 100%; top: 0px; background: var(--theme); z-index: 4`,
    ".eToolbarHolder[left] .eSubToolHolder:after": `left: 0px`,
    ".eToolbarHolder[right] .eSubToolHolder:after": `right: 0px`,
    ".eSubToolHolder[option]:after": `background: var(--secondary)`,
    ".eToolbarHolder[left] .eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 20px 16px 0; left: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eToolbarHolder[right] .eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 20px; right: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eToolbarHolder[left] .eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eToolbarHolder[right] .eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `position: relative; background: var(--pageColor); z-index: 3; overflow: hidden; border-radius: inherit`,
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
    this.currentToolModulePath = "pages/editor/toolbar/cursor";
    this.currentToolModule;

    let currentToolButton;
    let subToolbar;

    let currentSubToolButton;
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
      if ((element == null || element.hasAttribute("tooltip") == false) && (hoverElem.closest("[keeptooltip]") == null || hoverElem.closest("[closetooltip]") != null)) {
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
      tooltipElement = null;
      tooltipOpen = false;
      tooltipText.style.transform = "scale(0)";
      tooltipText.style.opacity = 0;
      await sleep(300);
      if (tooltipOpen == false) {
        tooltipText.style.transition = "unset";
      }
    }

    this.applyToolModule = (module) => {
      module = module ?? this.currentToolModule ?? {};

      if (module.USER_SELECT != null) {
        page.style.userSelect = module.USER_SELECT;
      } else {
        page.style.removeProperty("user-select");
      }
    }

    this.activateTool = () => {
      // TODO
      this.applyToolModule();
    }
    
    // Manage Toolbar:
    this.toolbar = {};
    this.toolbar.update = (update) => {
      if (currentToolButton != null) {
        let toolbar = currentToolButton.closest(".eToolbar");
        if (subToolbar != null) {
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

          subToolbar.style.transition = "top .25s, opacity .25s, transform .25s, border-radius .25s";
          contentHolder.style.transition = "width .25s, height .25s";
        } else {
          toolbar.style.removeProperty("border-top-right-radius");
          toolbar.style.removeProperty("border-bottom-right-radius");
          toolbar.style.removeProperty("border-top-left-radius");
          toolbar.style.removeProperty("border-bottom-left-radius");
        }
      }

      if (currentSubToolButton != null) {
        let toolbar = currentSubToolButton.closest(".eSubToolHolder");
        if (subSubToolbar != null) {
          let contentHolder = subSubToolbar.querySelector(".eSubToolContentHolder");
          let contentScroll = contentHolder.querySelector(".eSubToolContentScroll");

          let toolsRect = toolbar.getBoundingClientRect();
          let buttonRect = currentSubToolButton.getBoundingClientRect();

          contentScroll.style.maxHeight = toolbar.clientHeight + "px";

          let subtoolHeight = contentScroll.offsetHeight;
          let setSubToolTop = buttonRect.top - toolsRect.top - 2; // 2 Pixels from top
          if (setSubToolTop + subtoolHeight > toolbar.offsetHeight) {
            setSubToolTop = toolbar.offsetHeight - subtoolHeight;
          } else if (setSubToolTop < 0) {
            setSubToolTop = 0;
          }
          subSubToolbar.style.top = setSubToolTop + "px";

          if (toolbarHolder.hasAttribute("right") == false) {
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

          subSubToolbar.style.transform = "translateX(0%)";
          subSubToolbar.style.opacity = 1;

          subSubToolbar.style.transition = "top .25s, opacity .25s, transform .25s, border-radius .25s";
          contentHolder.style.transition = "width .25s, height .25s";
        } else {
          toolbar.style.removeProperty("border-top-right-radius");
          toolbar.style.removeProperty("border-bottom-right-radius");
          toolbar.style.removeProperty("border-top-left-radius");
          toolbar.style.removeProperty("border-bottom-left-radius");
        }
      }

      if (update != false) {
        this.tooltip.update();
      }
    }
    toolbarContent.addEventListener("scroll", () => { this.toolbar.update() });
    this.toolbar.updateButtons = async (contentHolder) => {
      let gottenTools = (contentHolder ?? toolbar).querySelectorAll(".eTool");
      for (let i = 0; i < gottenTools.length; i++) {
        let tool = gottenTools[i];
        let div = tool.querySelector("div");
        if (tool.hasAttribute("tool") == true) {
          let toolType = tool.getAttribute("tool");
          if (div.hasAttribute("loaded") == false) {
            setSVG(div, "./images/editor/toolbar/" + toolType + ".svg");
            div.setAttribute("loaded", "");
          }
          let toolPreference = editor.preferences.tools[toolType] ?? editor.preferences.tools[currentTool] ?? {};
          if (toolPreference.color != null) {
            div.style.setProperty("--toolColor", "#" + toolPreference.color.selected);
            div.style.setProperty("--toolColorOpacity", editor.utils.hexToRGBString(toolPreference.color.selected, (toolPreference.opacity ?? 100) / 100));
          }
          div.style.setProperty("--toolOpacity", (toolPreference.opacity ?? 100) / 100);
        } else if (tool.hasAttribute("module") == true) {
          let newModule = await this.newModule(tool.getAttribute("module"));
          newModule.editor = editor;
          if (newModule.setToolbarButton != null) {
            newModule.setToolbarButton(div);
          }
        }
      }
    }
    this.toolbar.createSubSub = async (moduleName) => {
      if (currentSubToolButton == null || moduleName == null) {
        return;
      }
      let toolbar = currentSubToolButton.closest(".eSubToolHolder");
      toolbar.insertAdjacentHTML("beforeend", `<div class="eSubToolHolder" option new>
        <div class="eSubToolShadow"></div>
        <div class="eSubToolContentHolder">
          <div class="eSubToolContentScroll hideScroll">
            <div class="eSubToolContent" closetooltip noselect></div>
          </div>
        </div>
      </div>`);
      subSubToolbar = toolbar.querySelector(".eSubToolHolder[new]");
      subSubToolbar.removeAttribute("new");
      if (toolbarHolder.hasAttribute("right") == false) {
        subSubToolbar.style.transform = "translateX(-100%)";
      } else {
        subSubToolbar.style.transform = "translateX(100%)";
      }
      this.applyToolModule(await this.setFrame(moduleName, subSubToolbar.querySelector(".eSubToolContent"), { editor: editor, toolbar: true }));
    }
    this.toolbar.closeSubSub = async (update) => {
      if (subSubToolbar == null) {
        return;
      }
      let removeToolbar = subSubToolbar;
      subSubToolbar = null;
      if (update == true && currentSubToolButton != null) {
        currentSubToolButton.removeAttribute("selected");
        currentSubToolButton.removeAttribute("extend");
      }
      this.applyToolModule();
      if (update != false) {
        this.toolbar.update(false);
      }
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
      return toolData;
    }
    this.toolbar.closeSub = (update) => {
      if (subToolbar == null) {
        return;
      }
      let removeToolbar = subToolbar;
      subToolbar = null;
      if (update == true && currentToolButton != null) {
        currentToolButton.removeAttribute("extend");
      }
      this.toolbar.update(false);
      this.toolbar.closeSubSub(false);
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
                  this.currentToolModulePath = selectSubtool.getAttribute("module");
                  selectSubtool.setAttribute("selected", "");
                  this.activateTool();
                }
              } else {
                this.currentToolModulePath = null;
              }
            } else {
              this.currentToolModulePath = toolData.module;
              this.activateTool();
              this.tooltip.update();
            }
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
          this.toolbar.closeSubSub();
          if (shortPress == true) {
            currentSubTool = button.getAttribute("tool");
            this.currentToolModulePath = button.getAttribute("module");
            this.activateTool();
          }
        } else { // Option
          if (shortPress == true) {
            this.toolbar.closeSubSub();
            if (isSelected == false) {
              currentSubToolButton = button;
              this.toolbar.createSubSub(button.getAttribute("module"));
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
      if (button == null || button.className != "eTool" || button.closest("[noselect]") != null) {
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
          let toolPreference = editor.preferences.tools[currentTool] ?? {};
          if (toolPreference.subtool != null) {
            toolPreference.subtool = currentSubTool;
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
      return editor.preferences.tools[currentSubTool] ?? editor.preferences.tools[currentTool] ?? {};
    }
    this.setToolPreference = (path, value) => {
      let split = path.split(".");
      let check = this.getToolPreference();
      for (let i = 0; i < split.length; i++) {
        if (i < split.length - 1) {
          check = check[split[i]];
        } else {
          check[split[i]] = value;
        }
      }
      editor.savePreferences();
    }
    this.getPreferenceTool = () => {
      let selectKeys = Object.keys(editor.selecting);
      let annoID = selectKeys[selectKeys.length - 1];
      return {
        ...((editor.annotations[annoID] ?? {}).render ?? {}),
        ...(editor.selecting[annoID] ?? {})
      };
    }
    this.getAnnotationPreference = () => {
      return editor.preferences.tools[this.getPreferenceTool().f] ?? {};
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
    let color = button.querySelector(".eSubToolColor");
    let preference = this.parent.getToolPreference();
    color.style.background = "#" + (preference.color ?? {}).selected;
    color.style.opacity = preference.opacity / 100;
  }

  USER_SELECT = "none";

  html = `
  <div class="eSubToolColorFrame">
    <div class="eSubToolColorSelector" noselect>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" option><div><div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div></div></button>
      <button class="eTool" enablepicker option><div><img class="eSubToolImage" src="./images/editor/picker.svg"></div></button>
    </div>
    <div class="eSubToolColorPicker">
      <div class="eSubToolColorPickerTop">
        <button class="eSubToolColorPickerType largeButton border" title="Change Color Scale"></button>
        <input class="eSubToolColorPickerField" name="Color Input" />
        <button class="eSubToolColorPickerTopBack buttonAnim border"><img src="./images/tooltips/close.svg"></button>
      </div>
      <div class="eSubToolColorPickerShade">
        <div><canvas></canvas></div>
        <button></button>
      </div>
      <div class="eSubToolColorPickerColorSelector">
        <button class="eSubToolColorPickerEyedroper buttonAnim border" title="Eyedropper"><img src="./images/editor/eyedropper.svg"></button>
        <div class="eSubToolColorPickerGradient">
          <div class="eSubToolColorPickerGradientSlider"></div>
          <button></button>
        </div>
      </div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolColorHolder": `box-sizing: border-box; display: flex; width: 34px; height: 34px; margin: 4px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 18px; justify-content: center; align-items: center`,
    ".eSubToolColor": `width: 100%; height: 100%; border-radius: 16px`,

    ".eSubToolColorFrame": `position: relative; width: 188px; min-height: 96px`,
    ".eSubToolColorSelector": `display: flex; flex-wrap: wrap; top: 0px; padding: 2px; justify-content: center; align-items: center; transform: scale(1); opacity: 1; transition: .5s`,
    ".eSubToolColorSelector .eTool": `width: 46px; height: 46px`,
    ".eSubToolColorSelector .eTool > div": `margin: 2px !important; border-radius: 8px !important`,
    ".eSubToolColorSelector .eSubToolColor": `width: 28px; height: 28px`,

    ".eSubToolColorPicker": `width: 188px; position: absolute; top: 0px; transform: scale(.9); opacity: 0; transition: .5s; pointer-events: none; touch-action: none`,
    ".eSubToolColorPickerTop": `position: relative; display: flex; box-sizing: border-box; width: 100%; padding: 6px`,
    ".eSubToolColorPickerTopBack": `position: relative; width: 22px; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 11px`,
    ".eSubToolColorPickerTopBack img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eSubToolColorPickerShade": `position: relative; width: calc(100% - 20px); height: 112px; margin: 4px 10px 8px`,
    ".eSubToolColorPickerShade div": `width: 100%; height: 100%; border-radius: 10px; overflow: hidden`,
    ".eSubToolColorPickerShade canvas": `width: 100%; height: 100%; background: #000`,
    ".eSubToolColorPickerShade button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 3px var(--pageColor); border-radius: 10px; transition: transform .2s`,
    ".eSubToolColorPickerShade button:hover": `transform: scale(1.2) !important`,
    ".eSubToolColorPickerShade button:active": `transform: scale(1.1) !important`,
    ".eSubToolColorPickerColorSelector": `box-sizing: border-box; display: flex; width: 100%; height: 32px; padding-bottom: 6px; align-items: center`,
    ".eSubToolColorPickerEyedroper": `position: relative; width: 26px; height: 26px; margin-left: 6px; --borderWidth: 0px; --borderRadius: 13px`,
    ".eSubToolColorPickerEyedroper img": `position: absolute; width: 24px; height: 24px; left: 1px; top: 1px`,
    ".eSubToolColorPickerGradient": `position: relative; flex: 1; height: 10px; margin: 0 10px`,
    ".eSubToolColorPickerGradientSlider": `width: 100%; height: 100%; background: -webkit-linear-gradient(left, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0)); border-radius: 5px`,
    ".eSubToolColorPickerGradient button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 3px var(--pageColor); border-radius: 10px; transition: transform .2s`,
    ".eSubToolColorPickerGradient button:hover": `transform: scale(1.2) !important`,
    ".eSubToolColorPickerGradient button:active": `transform: scale(1.1) !important`,
    ".eSubToolColorPickerType": `height: 22px; padding: 3px 6px; margin: 3px; --borderWidth: 3px; --borderRadius: 7px; font-size: 14px; font-weight: 700; color: var(--theme)`,
    ".eSubToolColorPickerField": `flex: 1; min-width: 0px; height: 19px; margin: 0 6px; border: solid 3px var(--secondary); outline: none; border-radius: 14px; font-family: var(--font); font-size: 14px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolColorPickerField::placeholder": `color: var(--hover)`
  };
  js = (frame, { editor, toolbar: isToolbar }) => {
    let toolbar = this.parent;
    let utils = editor.utils;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool = toolbar.getPreferenceTool();
    let colorPreference = toolbar.getAnnotationPreference().color ?? toolbar.getToolPreference().color;
    let selectedColor = colorPreference.selected;
    if (preferenceTool.c != null) {
      selectedColor = preferenceTool.c;
    }

    let selector = frame.querySelector(".eSubToolColorSelector");
    let colorButtons = selector.children;
    let picker = frame.querySelector(".eSubToolColorPicker");
    let selected = false;
    let runColorSelections = () => {
      selected = false;
      for (let i = 0; i < colorButtons.length; i++) {
        let button = colorButtons[i];
        let setColor = colorPreference.options[i];
        let isSelected = false;
        if (setColor != null) {
          button.setAttribute("int", i);
          button.querySelector(".eSubToolColor").style.background = "#" + setColor;
          if (isToolbar == true) {
            isSelected = setColor == colorPreference.selected;
          } else {
            isSelected = setColor == this.preferenceTool.c;
          }
        }
        if (selected == false) {
          if (isSelected || setColor == null) {
            button.setAttribute("selected", "");
            selected = true;
          } else {
            button.removeAttribute("selected", "");
          }
        } else {
          button.removeAttribute("selected", "");
        }
      }
    }
    runColorSelections();

    let [h, s, v] = [];
    selector.addEventListener("click", async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest(".eTool");
      if (element == null) {
        return;
      }
      if (element.hasAttribute("int") == true) {
        selectedColor = colorPreference.options[parseInt(element.getAttribute("int"))];
        if (shouldSave == true) {
          toolbar.setToolPreference("color.selected", selectedColor);
        }
        if (isToolbar == true) {
          toolbar.toolbar.closeSubSub(true);
        } else {
          //await extra.saveSelecting({ c: selectedColor });
          //utils.forceShort(); // Make sure other users see the color change (no mouse movement)
          //extra.updateToolActions(extra.frame);
          let selected = selector.querySelector("button[selected]");
          if (selected != null) {
            selected.removeAttribute("selected");
          }
          element.setAttribute("selected", "");
        }
        toolbar.toolbar.updateButtons();
      } else if (element.hasAttribute("enablepicker") == true) {
        ([h, s, v] = editor.utils.hexToHSV(selectedColor));
        updatePickerUI();
        picker.style.position = "relative";
        selector.style.position = "absolute";
        picker.style.transform = "scale(1)";
        selector.style.transform = "scale(.9)";
        picker.style.opacity = 1;
        selector.style.opacity = 0;
        picker.style.pointerEvents = "all";
        if (isToolbar == true) {
          toolbar.toolbar.update();
        } else {
          //extra.updateActionUI();
        }
      }
    });
    if (isToolbar == false) {
      //this.updateActionUI();
    }

    frame.querySelector(".eSubToolColorPickerTopBack").addEventListener("click", async () => {
      selector.style.position = "relative";
      picker.style.position = "absolute";
      selector.style.transform = "scale(1)";
      picker.style.transform = "scale(.9)";
      selector.style.opacity = 1;
      picker.style.opacity = 0;
      selector.style.pointerEvents = "all";
      picker.style.pointerEvents = "none";
      if (isToolbar == true) {
        toolbar.toolbar.update();
      } else {
        //extra.updateActionUI();
      }
    });

    let colorSliderHolder = frame.querySelector(".eSubToolColorPickerGradient");
    let colorPointer = colorSliderHolder.querySelector("button");
    let shadeSliderHolder = frame.querySelector(".eSubToolColorPickerShade");
    let canvas = shadeSliderHolder.querySelector("canvas");
    let ctx = canvas.getContext("2d");
    let shadePointer = shadeSliderHolder.querySelector("button");
    let modeButton = frame.querySelector(".eSubToolColorPickerType");
    let modeInput = frame.querySelector(".eSubToolColorPickerField");
    let colorGradientEnabled = false;
    let colorSliderEnabled = false;
    let modes = ["HEX", "RGB", "HSL", "HSB"];
    modeButton.addEventListener("click", () => {
      editor.preferences.tools.options.colorpicker.scale++;
      if (editor.preferences.tools.options.colorpicker.scale > modes.length - 1) {
        editor.preferences.tools.options.colorpicker.scale = 0;
      }
      modeButton.textContent = modes[editor.preferences.tools.options.colorpicker.scale];
      editor.savePreferences();
      updatePickerUI();
    });
    modeButton.textContent = modes[editor.preferences.tools.options.colorpicker.scale];
    modeInput.addEventListener("input", () => {
      switch (modes[editor.preferences.tools.options.colorpicker.scale]) {
        case "HEX":
          modeInput.value = modeInput.value.replace(/[^0-9a-z]/gi, "");
          if ((/^([0-9a-f]{3}){1,2}$/i).test(modeInput.value) == true) {
            updateStoredValues(modeInput.value, false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "RGB":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let rgbVals = modeInput.value.match(/\d+/g);
          if (rgbVals[0] >= 0 && rgbVals[0] <= 255 && rgbVals[1] >= 0 && rgbVals[1] <= 255 && rgbVals[2] >= 0 && rgbVals[2] <= 255) {
            updateStoredValues(editor.utils.rgbToHex(rgbVals[0], rgbVals[1], rgbVals[2]), false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "HSL":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let hslVals = modeInput.value.match(/\d+/g);
          if (hslVals[0] >= 0 && hslVals[0] <= 360 && hslVals[1] >= 0 && hslVals[1] <= 100 && hslVals[2] >= 0 && hslVals[2] <= 100) {
            updateStoredValues(editor.utils.hslToHex(hslVals[0], hslVals[1], hslVals[2]), false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
          break;
        case "HSB":
          modeInput.value = modeInput.value.replace(/[^0-9a-z, ]/gi, "");
          let hsvVals = modeInput.value.match(/\d+/g);
          if (hsvVals[0] >= 0 && hsvVals[0] <= 360 && hsvVals[1] >= 0 && hsvVals[1] <= 100 && hsvVals[2] >= 0 && hsvVals[2] <= 100) {
            updateStoredValues(editor.utils.hsvToHex(hsvVals[0], hsvVals[1], hsvVals[2]), false);
          } else {
            modeInput.style.borderColor = "var(--error)";
          }
      }
    });
    let updatePickerUI = (updateText) => {
      // Update Colors Shown:
      let hue = "#" + editor.utils.hsvToHex(h, 100, 100);
      shadePointer.style.background = "#" + colorPreference.selected;
      colorPointer.style.background = hue;
      // Update Pointer Positions:
      shadePointer.style.left = (shadeSliderHolder.offsetWidth * (s / 100)) - 10 + "px";
      shadePointer.style.top = (shadeSliderHolder.offsetHeight - (shadeSliderHolder.offsetHeight * (v / 100))) - 10 + "px";
      colorPointer.style.left = (colorSliderHolder.offsetWidth * (h / 360)) - 10 + "px";
      // Update Gradient:
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let colorscale = ctx.createLinearGradient(0, 0, canvas.width, 0);
      colorscale.addColorStop(0, "white");
      colorscale.addColorStop(1, hue);
      ctx.fillStyle = colorscale;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let grayscale = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grayscale.addColorStop(0, "rgba(0, 0, 0, 0)");
      grayscale.addColorStop(1, "black");
      ctx.fillStyle = grayscale;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Update Input:
      if (updateText != false) {
        switch (modes[editor.preferences.tools.options.colorpicker.scale]) {
          case "HEX":
            modeInput.value = selectedColor.toUpperCase();
            break;
          case "RGB":
            let rgbVal = editor.utils.hexToRGB(selectedColor);
            modeInput.value = rgbVal[0] + ", " + rgbVal[1] + ", " + rgbVal[2];
            break;
          case "HSL":
            let hslVal = editor.utils.hexToHSL(selectedColor);
            modeInput.value = hslVal[0] + ", " + hslVal[1] + ", " + hslVal[2];
            break;
          case "HSB":
            let hsbVal = editor.utils.hexToHSV(selectedColor);
            modeInput.value = Math.floor(hsbVal[0]) + ", " + Math.floor(hsbVal[1]) + ", " + Math.floor(hsbVal[2]);
        }
      }
      modeInput.placeholder = modeInput.value;
      modeInput.style.borderColor = "var(--secondary)";
      // Update Toolbar Colors:
      toolbar.toolbar.updateButtons();
    }
    let firstChange;
    let updateStoredValues = async (hex, updateText) => {
      selectedColor = hex ?? editor.utils.hsvToHex(h, s, v);
      let selectedButton = selector.querySelector(".eTool[int][selected]");
      if (selectedButton == null) {
        selectedButton = selector.children[selector.childElementCount - 2];
        let selected = selector.querySelector(".eTool[selected]");
        if (selected != null) {
          selected.removeAttribute("selected");
        }
        selectedButton.setAttribute("selected", "");
      }
      let int = parseInt(selectedButton.getAttribute("int"));
      if (int == null || int < 0 || int > 6) {
        return;
      }
      colorPreference.options[int] = selectedColor;
      selectedButton.querySelector(".eSubToolColor").style.background = "#" + selectedColor;
      if (hex != null) {
        ([h, s, v] = editor.utils.hexToHSV(selectedColor));
      }
      if (shouldSave == true) {
        toolbar.setToolPreference("color.options", colorPreference.options);
        toolbar.setToolPreference("color.selected", selectedColor);
      }
      updatePickerUI(updateText);
      if (isToolbar == false) {
        //await extra.saveSelecting({ c: selectedColor }, null, firstChange);
        //extra.updateToolActions(extra.frame);
        //firstChange = false;
      }
    }
    let eventGradientUpdate = (event) => {
      if (colorGradientEnabled == false) {
        return;
      }
      if (mouseDown() == false || shadeSliderHolder == null) {
        colorGradientEnabled = false;
        editor.pipeline.unsubscribe("colorSelectorMouse");
        return;
      }
      let barRect = shadeSliderHolder.getBoundingClientRect();
      s = Math.ceil(Math.max(Math.min((clientPosition(event, "x") - barRect.x - 2) / shadeSliderHolder.offsetWidth, 1), 0) * 100);
      v = Math.ceil(Math.max(Math.min((shadeSliderHolder.offsetHeight - (clientPosition(event, "y") - barRect.y + 2)) / shadeSliderHolder.offsetHeight, 1), 0) * 100);
      updateStoredValues();
    }
    let gradientDown = (event) => {
      colorGradientEnabled = true;
      firstChange = true;
      app.style.userSelect = "none";
      eventGradientUpdate(event);
      editor.pipeline.subscribe("colorSelectorMouse", "mousemove", (data) => { eventGradientUpdate(data.event); });
    }
    shadeSliderHolder.addEventListener("mousedown", gradientDown);
    shadeSliderHolder.addEventListener("touchstart", gradientDown, { passive: true });
    let eventColorUpdate = (event) => {
      if (colorSliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || colorSliderHolder == null) {
        colorSliderEnabled = false;
        editor.pipeline.unsubscribe("colorSelectorMouse");
        return;
      }
      let barRect = colorSliderHolder.getBoundingClientRect();
      h = Math.ceil(Math.max(Math.min(((event.clientX ?? event.changedTouches[0].clientX) - barRect.x) / colorSliderHolder.offsetWidth, 1), 0) * 360);
      updateStoredValues();
    }
    let colorSliderDown = (event) => {
      colorSliderEnabled = true;
      firstChange = true;
      eventColorUpdate(event);
      editor.pipeline.subscribe("colorSelectorMouse", "mousemove", (data) => { eventColorUpdate(data.event); });
    }
    colorSliderHolder.addEventListener("mousedown", colorSliderDown);
    colorSliderHolder.addEventListener("touchstart", colorSliderDown, { passive: true });

    let eyeDropper = frame.querySelector(".eSubToolColorPickerEyedroper");
    if (window.EyeDropper == null) {
      eyeDropper.style.display = "none";
    }
    eyeDropper.addEventListener("click", () => {
      (new EyeDropper())
        .open()
        .then((result) => {
          firstChange = true;
          updateStoredValues(result.sRGBHex.substring(1));
        })
        .catch(() => { });
    });
  }
}

modules["editor/toolbar/thickness"] = class {
  setToolbarButton = (button) => {
    button.innerHTML = `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThicknessHolder"><div class="eSubToolThickness"></div></div></div>`;
    let thickness = button.querySelector(".eSubToolThickness");
    let preference = this.parent.getToolPreference();
    thickness.style.background = "#" + (preference.color ?? {}).selected;
    thickness.style.height = preference.thickness + "px";
    thickness.style.opacity = preference.opacity / 100;
  }

  USER_SELECT = "none";

  html = `
  <div class="eSubToolThicknessFrame">
    <input class="eSubToolThicknessInput" name="Thickness">
    <div class="eSubToolThicknessSlider"><button></button></div>
  </div>
  `;
  css = {
    ".eSubToolThicknessButtonHolder": `position: relative; display: flex; width: 100%; height: 100%; align-items: center; overflow: hidden`,
    ".eSubToolThicknessHolder": `position: absolute; padding: 3px; background: var(--pageColor); border-radius: 14px`,
    ".eToolbarHolder[left] .eSubToolThicknessHolder": `transform: translateX(-12px)`,
    ".eToolbarHolder[right] .eSubToolThicknessHolder": `transform: translateX(4px)`,
    ".eSubToolThickness": `width: 44px; border-radius: 10px`,

    ".eSubToolThicknessFrame": `box-sizing: border-box; display: flex; width: 188px; height: 50px; padding: 6px; align-items: center`,
    ".eSubToolThicknessInput": `width: 40px; height: 26px; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolThicknessInput::placeholder": `color: var(--hover)`,
    ".eSubToolThicknessSlider": `position: relative; flex: 1; height: 10px; margin: 0 6px 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolThicknessSlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolThicknessSlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolThicknessSlider button:active": `transform: scale(1.1) !important`
  };
  minValue = 1;
  maxValue = 40;
  exponentFactor = 1.4;
  js = (frame, { editor, toolbar: isToolbar }) => {
    let toolbar = this.parent;
    let utils = editor.utils;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool = toolbar.getPreferenceTool();
    let thicknessPreference = toolbar.getAnnotationPreference().thickness ?? toolbar.getToolPreference().thickness;
    let selectedThickness = thicknessPreference;
    if (preferenceTool.t != null) {
      selectedThickness = preferenceTool.t;
    }

    let slider = frame.querySelector(".eSubToolThicknessSlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolThicknessInput");
    let sliderEnabled = false;
    let firstChange;
    let updateUI = async (updateVal, noPref) => {
      if (shouldSave == true && noPref != true) {
        toolbar.setToolPreference("thickness", selectedThickness);
      }
      let percentage = Math.pow(((selectedThickness - this.minValue) / (this.maxValue - this.minValue)), 1 / (this.exponentFactor ?? 1));
      pointer.style.left = ((slider.offsetWidth - 10) * percentage) - 6 + "px";
      if (updateVal != false) {
        input.value = selectedThickness;
      }
      if (noPref != true) {
        if (isToolbar == true) {
          toolbar.toolbar.updateButtons();
        } else if (updateVal != null) {
          //await extra.saveSelecting({ t: selectedThickness }, null, firstChange, null, false);
          //cursorModule.updateBox(true);
          //extra.updateToolActions(extra.frame);
          firstChange = false;
        }
      }
    }
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || slider == null) {
        sliderEnabled = false;
        //cursorModule.updateBox();
        editor.pipeline.unsubscribe("thicknessSelectorMouse");
        return;
      }
      let barRect = slider.getBoundingClientRect();
      selectedThickness = Math.ceil(Math.pow((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0)), this.exponentFactor ?? 1) * (this.maxValue - this.minValue) + this.minValue);
      updateUI();
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      firstChange = true;
      eventBarUpdate(event);
      editor.pipeline.subscribe("thicknessSelectorMouse", "mousemove", (data) => { eventBarUpdate(data.event); });
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", enableSlider, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedThickness;
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedThickness;
    });
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedThickness = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedThickness = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
}

modules["editor/toolbar/opacity"] = class {
  setToolbarButton = async (button) => {
    button.innerHTML = `<div class="eSubToolOpacityHolder"></div>`;
    let opacity = button.querySelector(".eSubToolOpacityHolder");
    await setSVG(opacity, "./images/editor/toolbar/opacity.svg");
    let svg = opacity.querySelector("svg");
    let preference = this.parent.getToolPreference();
    svg.querySelector("path").style.opacity = preference.opacity / 100;
    svg.style.setProperty("--toolColor", "#" + (preference.color ?? {}).selected);
  }

  USER_SELECT = "none";

  html = `
  <div class="eSubToolOpacityFrame">
    <input class="eSubToolOpacityInput" name="Thickness">
    <div class="eSubToolOpacitySlider"><button></button></div>
  </div>
  `;
  css = {
    ".eSubToolOpacityHolder": `box-sizing: border-box; display: flex; width: 34px; height: 34px; margin: 4px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 18px; justify-content: center; align-items: center`,
    ".eSubToolOpacityHolder svg": `width: 100%; height: 100%`,

    ".eSubToolOpacityFrame": `box-sizing: border-box; display: flex; width: 188px; height: 50px; padding: 6px; align-items: center`,
    ".eSubToolOpacityInput": `width: 40px; height: 26px; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolOpacitySlider": `position: relative; flex: 1; height: 10px; margin: 0 6px 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolOpacitySlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolOpacitySlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolOpacitySlider button:active": `transform: scale(1.1) !important`
  };
  minValue = 10;
  maxValue = 100;
  js = (frame, { editor, toolbar: isToolbar }) => {
    let toolbar = this.parent;
    let utils = editor.utils;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool = toolbar.getPreferenceTool();
    let opacityPreference = toolbar.getAnnotationPreference().opacity ?? toolbar.getToolPreference().opacity;
    let selectedOpacity = opacityPreference;
    if (preferenceTool.t != null) {
      selectedOpacity = preferenceTool.o;
    }

    let slider = frame.querySelector(".eSubToolOpacitySlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolOpacityInput");
    let sliderEnabled = false;
    let firstChange;
    let updateUI = async (updateVal, noPref) => {
      if (shouldSave == true && noPref != true) {
        toolbar.setToolPreference("opacity", selectedOpacity);
      }
      let percentage = Math.pow(((selectedOpacity - this.minValue) / (this.maxValue - this.minValue)), 1 / (this.exponentFactor ?? 1));
      pointer.style.left = ((slider.offsetWidth - 10) * percentage) - 6 + "px";
      if (updateVal != false) {
        input.value = selectedOpacity;
      }
      if (noPref != true) {
        if (isToolbar == true) {
          toolbar.toolbar.updateButtons();
        } else if (updateVal != null) {
          //await extra.saveSelecting({ o: selectedOpacity }, null, firstChange, null, false);
          //cursorModule.updateBox(true);
          //extra.updateToolActions(extra.frame);
          firstChange = false;
        }
      }
    }
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || slider == null) {
        sliderEnabled = false;
        //cursorModule.updateBox();
        editor.pipeline.unsubscribe("opacitySelectorMouse");
        return;
      }
      let barRect = slider.getBoundingClientRect();
      selectedOpacity = Math.ceil(Math.pow((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0)), this.exponentFactor ?? 1) * (this.maxValue - this.minValue) + this.minValue);
      updateUI();
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      firstChange = true;
      eventBarUpdate(event);
      editor.pipeline.subscribe("opacitySelectorMouse", "mousemove", (data) => { eventBarUpdate(data.event); });
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", enableSlider, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedOpacity;
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedOpacity;
    });
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedOpacity = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedOpacity;
      }
      selectedOpacity = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI();
    });
    updateUI(null, true);
  }
}