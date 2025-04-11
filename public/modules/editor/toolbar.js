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
        <div class="eDivider"></div>
        <button class="eTool" option="color" tooltip="Color" module="editor/toolbar/color"><div></div></button>
        <button class="eTool" option="thickness" tooltip="Thickness" module="editor/toolbar/thickness"><div></div></button>
        <button class="eTool" option="opacity" tooltip="Opacity" module="editor/toolbar/opacity"><div></div></button>
      </div>`
    },
    "markup": {
      html: `<div class="eVerticalToolsHolder">
        <button class="eTool" tool="highlighter" tooltip="Highlighter" module="editor/toolbar/highlighter"><div></div></button>
        <button class="eTool" tool="underline" tooltip="Underline" module="editor/toolbar/underline"><div></div></button>
        <div class="eDivider"></div>
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
    },

    // Viewer Toolbar:
    "select": { id: "select", type: "tool", module: "editor/toolbar/select" },
    "pan": { id: "pan", type: "tool", module: "editor/toolbar/pan" }
  };
  css = {
    ".eToolbar": `position: absolute; display: block; width: 50px; height: fit-content; max-height: var(--maxToolbarHeight); top: 50%; transform: translateY(-50%); z-index: 2; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; transition: transform .4s, opacity .4s, border-radius .2s`,
    ".eToolbar[hidden]": `transform: translateY(-50%) scale(0) !important; z-index: 1 !important`,
    ".eToolbarContent": `position: relative; box-sizing: border-box; max-height: var(--maxToolbarHeight); background: var(--pageColor); overflow: auto; z-index: 3; border-radius: inherit`,
    ".eToolbarHolder[left] .eToolbar": `left: 0px; border-radius: 0 12px 12px 0; transform-origin: left center`,
    ".eToolbarHolder[right] .eToolbar": `right: 0px; border-radius: 12px 0 0 12px; transform-origin: right center`,
    ".eToolbarTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; z-index: 5; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`,

    ".eToolbarHolder .eTool": `--hoverColor: var(--hover); display: flex; width: 50px; height: 46px; flex-shrink: 0; padding: 0; justify-content: center; align-items: center; transition: opacity .3s`,
    ".eActionBar .eTool": `--hoverColor: var(--hover); display: flex; width: 46px; height: 50px; flex-shrink: 0; padding: 0; justify-content: center; align-items: center; transition: opacity .3s`,
    ".eTool > div": `position: relative; display: flex; width: 42px; height: 42px; border-radius: 8px; transition: .2s`,
    ".eTool > div:after": `content: ""; position: absolute; width: 42px; height: 42px; left: 0px; top: 0px; border-radius: 8px; z-index: 1; transition: .2s`,
    ".eTool > div > *": `z-index: 2`,
    ".eTool > div > svg": `width: 40px; height: 40px; margin: 1px`,
    ".eTool:hover > div:after": `background: var(--hoverColor)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active > div": `transform: scale(.95)`,
    ".eTool:active > div:after": `width: 42px !important; height: 42px !important; left: 0px !important; top: 0px !important; border-radius: 8px !important`,
    ".eTool[selected] > div:after": `background: var(--theme)`,
    ".eTool[selected][option] > div:after": `background: var(--secondary) !important`,
    ".eToolbarHolder[left] .eTool[extend] > div:after": `width: 46px; left: 0px; top: 0px; border-radius: 8px 0 0 8px`,
    ".eToolbarHolder[right] .eTool[extend] > div:after": `width: 46px; left: -4px; top: 0px; border-radius: 0 8px 8px 0`,
    ".eActionBar[top] .eTool[extend] > div:after": `height: 46px; left: 0px; top: -4px; border-radius: 0 0 8px 8px`,
    ".eActionBar[bottom] .eTool[extend] > div:after": `height: 46px; left: 0px; top: 0px; border-radius: 8px 8px 0 0`,
    ".eTool[selecthighlight] > div:after": `background: var(--theme)`,
    ".eTool[off]": `opacity: 0.5`,

    ".eDivider": `width: calc(100% - 8px); height: 4px; margin: 2px 0; background: var(--hover); border-radius: 2px`,
    ".eVerticalDivider": `width: 4px; height: calc(100% - 8px); margin: 0 2px; flex-shrink: 0; background: var(--hover); border-radius: 2px`,

    ".eToolbarHolder[left] .eSubToolHolder": `position: absolute; width: 100vw; height: 100%; padding: 12px; left: calc(100% - 12px); top: -12px; z-index: 2; overflow: hidden; pointer-events: none`,
    ".eToolbarHolder[right] .eSubToolHolder": `position: absolute; width: 100vw; height: 100%; padding: 12px; right: calc(100% - 12px); top: -12px; z-index: 2; overflow: hidden; pointer-events: none`,
    ".eToolbarHolder[left] .eSubToolContainer": `position: absolute; width: fit-content; max-height: 100%; left: 12px; padding-left: 4px; background: var(--pageColor); border-radius: 0 12px 12px 0; opacity: 0; pointer-events: all; transition: opacity .25s, transform .25s`,
    ".eToolbarHolder[right] .eSubToolContainer": `position: absolute; width: fit-content; max-height: 100%; right: 12px; padding-right: 4px; background: var(--pageColor); border-radius: 12px 0 0 12px; opacity: 0; pointer-events: all; transition: opacity .25s, transform .25s`,
    ".eToolbarHolder[left] .eSubToolContainer:after": `content: ""; position: absolute; width: 4px; height: 100%; left: 0px; top: 0px; background: var(--theme); z-index: 4`,
    ".eToolbarHolder[right] .eSubToolContainer:after": `content: ""; position: absolute; width: 4px; height: 100%; right: 0px; top: 0px; background: var(--theme); z-index: 4`,
    ".eSubToolContainer[option]:after": `background: var(--secondary) !important`,
    ".eToolbarHolder[left] .eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 16px 16px 0; left: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eToolbarHolder[right] .eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 16px; right: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eToolbarHolder[left] .eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eToolbarHolder[right] .eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `position: relative; background: var(--pageColor); z-index: 3; overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; overflow: auto`,
    ".eSubToolContainer[option] .eSubToolContentScroll": `overflow: visible`,
    ".eVerticalToolsHolder": `display: flex; flex-direction: column; padding: 2px 0; align-items: center`,
    ".eHorizontalToolsHolder": `display: flex; padding: 0 2px; align-items: center`,

    ".eSelect": `position: absolute; left: 0px; top: 0px; opacity: 0; z-index: 101; border-radius: 9px; transition: all .25s, opacity .15s; pointer-events: none`,
    ".eAnnotation[selected] > *": `pointer-events: none`,
    ".eSelectHandle": `position: absolute; transition: .1s; pointer-events: all; --scale: 1`,
    '.eSelectHandle:hover': `--scale: 1.3`,
    '.eSelectHandle:active': `--scale: 1.1 !important`,
    '.eSelectHandle[handle="movetop"]': `width: 100%; height: 10px; top: -10px`,
    '.eSelectHandle[handle="movebottom"]': `width: 100%; height: 10px; bottom: -10px`,
    '.eSelectHandle[handle="moveleft"]': `width: 10px; height: 100%; left: -10px`,
    '.eSelectHandle[handle="moveright"]': `width: 10px; height: 100%; right: -10px`,
    '.eSelectHandle[handle="topleft"]': `left: -10px; top: -10px`,
    '.eSelectHandle[handle="topright"]': `right: -10px; top: -10px`,
    '.eSelectHandle[handle="bottomleft"]': `left: -10px; bottom: -10px`,
    '.eSelectHandle[handle="bottomright"]': `right: -10px; bottom: -10px`,
    '.eSelectHandle[handle="left"]': `left: -14px; top: 50%; transform: translateY(-50%)`,
    '.eSelectHandle[handle="right"]': `right: -14px; top: 50%; transform: translateY(-50%)`,
    '.eSelectHandle[handle="top"]': `left: 50%; top: -14px; transform: translateX(-50%)`,
    '.eSelectHandle[handle="bottom"]': `left: 50%; bottom: -14px; transform: translateX(-50%)`,
    '.eSelectHandle[handle="rotate"]': `left: -28px; bottom: -28px`,
    ".eSelectHandle[duplicate]": `opacity: 0; pointer-events: none`,
    '.eSelectHandle[handle="duplicateleft"]': `left: -50px; top: 50%; transform: translateY(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectHandle[handle="duplicateright"]': `right: -50px; top: 50%; transform: translateY(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectHandle[handle="duplicatetop"]': `left: 50%; top: -50px; transform: translateX(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectHandle[handle="duplicatebottom"]': `left: 50%; bottom: -50px; transform: translateX(-50%) scale(var(--scale)); cursor: pointer`,
    ".eSelect[hidehandles] .eSelectHandle": `opacity: 0 !important; pointer-events: none !important`,
    ".eSelect[showduplicate]:not([notransition]) .eSelectHandle[duplicate]": `opacity: 1; pointer-events: all`,
    ".eSelect[showonlywidth] .eSelectHandle": `opacity: 0; pointer-events: none`,
    ".eSelect[showonlywidth] .eSelectHandle[widthhandle]": `opacity: 1 !important; pointer-events: all !important`,
    '.eSelect[showonlywidth] .eSelectHandle[handle="rotate"]': `opacity: 1; pointer-events: all`,
    '.eSelect[hiderotation] .eSelectHandle[handle="rotate"]': `opacity: 0 !important; pointer-events: none !important`,
    '.eSelect[hideheighthandles] .eSelectHandle[heighthandle]': `opacity: 0; pointer-events: none`,
    '.eSelect[hidewidthhandles] .eSelectHandle[widthhandle]': `opacity: 0; pointer-events: none`,
    '.eSelect[hidenonessential] .eSelectHandle:not([essential])': `opacity: 0; pointer-events: none`,

    ".eSelectSnap": `position: absolute; left: 0px; top: 0px; z-index: 102; background: var(--secondary); border-radius: 1px; pointer-events: none`,
    ".eSelectSnap div[marker]": `position: absolute; z-index: 102; background: var(--secondary); border-radius: 1px; pointer-events: none`,
    '.eSelectSnap div[marker="snapxleft"]': `width: 2px; height: 16px; left: 0px; top: 50%; transform: translateY(-50%)`,
    '.eSelectSnap div[marker="snapxright"]': `width: 2px; height: 16px; right: 0px; top: 50%; transform: translateY(-50%)`,
    '.eSelectSnap div[marker="snapytop"]': `width: 16px; height: 2px; top: 0px; left: 50%; transform: translateX(-50%)`,
    '.eSelectSnap div[marker="snapybottom"]': `width: 16px; height: 2px; bottom: 0px; left: 50%; transform: translateX(-50%)`,

    ".eActionBar": `position: absolute; display: flex; height: 50px; box-shadow: var(--lightShadow); z-index: 102; border-radius: 12px; transform: translateY(-10%); opacity: 0; transition: transform .2s, opacity .2s, border-radius .2s`,
    ".eActionToolbar": `display: flex; width: 100%; height: 100%; background: var(--pageColor); overflow: auto; border-radius: inherit; z-index: 2`,
    ".eActionToolbar::-webkit-scrollbar": `display: none`,
    ".eActionToolbar[locked] > *": `display: none`,
    //".eActionToolbar .eTool[stayonlock]": `display: flex`,
    ".eActionHolder[top]": `position: absolute; width: fit-content; height: fit-content; padding: 12px; left: -12px; bottom: calc(100% - 12px); z-index: 1; overflow: hidden; pointer-events: none`,
    ".eActionHolder[bottom]": `position: absolute; width: fit-content; height: fit-content; padding: 12px; left: -12px; top: calc(100% - 12px); z-index: 1; overflow: hidden; pointer-events: none`,
    ".eActionHolder[top] .eActionContainer": `--shadowPadding: 16px 16px 0; --shadowBottom: 0px; --shadowTop: 16px; position: relative; width: fit-content; bottom: 0px; padding-bottom: 4px; background: var(--pageColor); border-radius: 12px 12px 0 0; opacity: 0; pointer-events: all`,
    ".eActionHolder[bottom] .eActionContainer": `--shadowPadding: 0 16px 16px; --shadowBottom: -16px; --shadowTop: 0px; position: relative; width: fit-content; top: 0px; padding-top: 4px; background: var(--pageColor); border-radius: 0 0 12px 12px; opacity: 0; pointer-events: all`,
    ".eActionHolder[top] .eActionContainer:after": `content: ""; position: absolute; width: 100%; height: 4px; left: 0px; botton: 0px; background: var(--theme); z-index: 4`,
    ".eActionHolder[bottom] .eActionContainer:after": `content: ""; position: absolute; width: 100%; height: 4px; left: 0px; top: 0px; background: var(--theme); z-index: 4`,
    ".eActionShadow": `position: absolute; width: 100%; height: 100%; padding: var(--shadowPadding); bottom: var(--shadowBottom); left: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eActionShadow:after": `position: absolute; width: calc(100% - 32px); height: calc(100% - 16px); left: 16px; top: var(--shadowTop); content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eActionContainerHolder": `width: 100%; height: 100%; overflow: hidden; border-radius: inherit`,
    ".eActionContainerScroll": `width: fit-content; border-radius: inherit`,
    ".eActionContainerContent": `display: flex; flex-wrap: wrap; gap: 6px; border-radius: inherit`
  };
  js = async (editor) => {
    let page = editor.page;

    let toolbarHolder = page.querySelector(".eToolbarHolder");
    let toolbar = toolbarHolder.querySelector(".eToolbar[editor]");
    
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
    let realtimeHolder = content.querySelector(".eRealtime");
    let annotations = content.querySelector(".eAnnotations");

    let currentTool = "selection";
    let currentSubTool = "select";
    this.currentToolModulePath = "editor/toolbar/select";

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
    this.checkSubToolEnabled = (check) => {
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
    let tooltipText;
    this.tooltip = {};
    let tooltipElement;
    this.tooltip.update = () => {
      if (tooltipElement == null) {
        return;
      }
      if (tooltipElement.hasAttribute("selected") == true && (tooltipElement.hasAttribute("option") == true || tooltipElement.hasAttribute("action") == true)) {
        return this.tooltip.close();
      }
      let parent = tooltipElement.closest(".eToolbarHolder") ?? tooltipElement.closest(".eActionBar");
      if (parent == null) {
        return this.tooltip.close();
      }
      if (tooltipText != null && tooltipText.parentElement != parent) {
        this.tooltip.close();
      }
      if (tooltipText == null) {
        parent.insertAdjacentHTML("beforeend", `<div class="eToolbarTooltip" new></div>`);
        tooltipText = parent.querySelector(".eToolbarTooltip[new]");
        tooltipText.removeAttribute("new");
      }
      let tooltipElementStyle = getComputedStyle(tooltipElement);
      let themeColor = tooltipElementStyle.getPropertyValue("--hoverTooltip");
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
            let subToolbarContainer = subToolbar.querySelector(".eSubToolContainer");
            let toolbarRect = subToolbarContainer.getBoundingClientRect();
            let toolbarContentScroll = subToolbarContainer.querySelector(".eSubToolContentScroll");
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
            let subToolbarContainer = subToolbar.querySelector(".eSubToolContainer");
            let toolbarRect = subToolbarContainer.getBoundingClientRect();
            let toolbarContentScroll = subToolbarContainer.querySelector(".eSubToolContentScroll");
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
      if (editor.isThisPage(hoverElem) != true) {
        return;
      }
      let element = hoverElem.closest("button[tool], button[subtool], button[option], button[action]");
      let noTooltip = element == null || element.hasAttribute("tooltip") == false;
      if (noTooltip == true && (hoverElem.closest("[keeptooltip]") == null || hoverElem.closest("[closetooltip]") != null)) {
        return this.tooltip.close();
      } else if (noTooltip == true) {
        return;
      }
      if (element.hasAttribute("selected") == true && (element.hasAttribute("option") == true || element.hasAttribute("action") == true)) {
        return this.tooltip.close();
      }
      if (tooltipText != null && element == tooltipElement) {
        return this.tooltip.update();
      }
      tooltipElement = element;
      this.tooltip.update();
      if (tooltipText != null) {
        tooltipText.offsetHeight;
        tooltipText.style.transition = ".25s";
        tooltipText.style.transform = "scale(1)";
        tooltipText.style.opacity = 1;
      }
    }
    this.tooltip.close = async () => {
      if (tooltipText == null) {
        return;
      }
      let removeTooltip = tooltipText;
      tooltipText = null;
      (async () => {
        removeTooltip.style.transform = "scale(0)";
        removeTooltip.style.opacity = 0;
        await sleep(300);
        if (removeTooltip != null) {
          removeTooltip.remove();
        }
      })();
    }

    let currentMouseSVG;
    this.updateMouse = async (cursor) => {
      cursor = cursor  ?? { type: "set" };
      if (cursor.type == "set") {
        if (cursor.value != null) {
          content.style.cursor = cursor.value;
        } else {
          content.style.removeProperty("cursor");
        }
        currentMouseSVG = null;
      } else if (cursor.type == "svg") {
        let insertString = `style="--themeColor: #2F2F2F`;
        if (cursor.rotate != null) {
          insertString += "; transform: rotate(" + cursor.rotate + "deg)";
        }
        if (cursor.color != null) {
          insertString += `; --toolColorOpacity: ${editor.utils.hexToRGBString(cursor.color, (cursor.opacity ?? 100) / 100)}`;
        }
        let setSVG = ((await getSVG(cursor.url)) ?? "").replace(/viewBox=/g, insertString + `" viewBox=`);
        if (setSVG != currentMouseSVG) {
          currentMouseSVG = setSVG;
          let reader = new FileReader();
          reader.readAsDataURL(new Blob([setSVG], { type: "image/svg+xml" }));
          reader.onload = () => {
            let translate = cursor.translate ?? {};
            content.style.cursor = "url('" + reader.result + "') " + (translate.x ?? 0) + " " + (translate.y ?? 0) + ", auto";
          }
        }
      }
    }
    this.applyToolModule = (moduleData) => {
      let module = { ...(this.currentToolModule ?? {}), ...(moduleData ?? {}) };
      if (module.USER_SELECT != null) {
        page.style.userSelect = module.USER_SELECT;
      } else {
        page.style.removeProperty("user-select");
      }
      if (module.TOUCH_ACTION != null) {
        contentHolder.style.touchAction = module.TOUCH_ACTION;
      } else {
        contentHolder.style.removeProperty("touch-action");
      }
    }
    this.activateTool = async (extra, options = {}) => {
      editor.pinchZoomDisable = false;
      editor.usingStylus = false;
      this.selection.hideSelectBox = null;
      if (options.resetSelection != false) {
        editor.selecting = {};
        this.selection.updateBox();
      }

      let editorTools = content.querySelectorAll("[tooleditor]");
      if (editorTools.length > 0) {
        for (let i = 0; i < editorTools.length; i++) {
          let tool = editorTools[i];
          tool.removeAttribute("tooleditor");
          tool.style.opacity = 0;
          if (tool.hasAttribute("src") == true && tool.getAttribute("src").startsWith("blob:") == true) {
            URL.revokeObjectURL(tool.getAttribute("src"));
          }
        }
        (async () => {
          await sleep(150);
          for (let i = 0; i < editorTools.length; i++) {
            let tool = editorTools[i];
            if (tool != null) {
              tool.remove();
            }
          }
        })();
      }

      if (this.currentToolModule != null && this.currentToolModule.disable != null) {
        await this.currentToolModule.disable();
      }

      let newModule;
      if (this.currentToolModulePath != null) {
        newModule = await this.newModule(this.currentToolModulePath);
      }
      this.currentToolModule = newModule ?? {};
      if (newModule != null) {
        newModule.editor = editor;
        newModule.tool = currentSubTool ?? currentTool;
        if (newModule.activate != null) {
          newModule.activate(extra ?? {});
        }
      } else {
        newModule = {};
      }
      editor.realtime.tool = newModule.REALTIME_TOOL ?? 0;
      editor.realtime.passthrough = newModule.PUBLISH;
      this.applyToolModule();
      this.updateMouse(newModule.MOUSE);
    }
    this.disableTool = async () => {
      this.currentToolModulePath = null;
      return await this.activateTool();
    }
    this.pushToolEvent = (type, event) => {
      if (this.currentToolModule == null) {
        return;
      }
      if (this.currentToolModule[type] != null) {
        this.currentToolModule[type](event);
      }
    }
    
    // Manage Toolbar:
    this.toolbar = {};
    this.toolbar.toolbar = toolbar;
    this.toolbar.update = (update) => {
      if (currentToolButton != null) {
        let toolbar = currentToolButton.closest(".eToolbar");
        if (subToolbar != null) {
          let contentContainer = subToolbar.querySelector(".eSubToolContainer");
          let contentHolder = contentContainer.querySelector(".eSubToolContentHolder");
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
          contentContainer.style.top = (setSubToolTop + 12) + "px";

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

          contentContainer.style.transform = "translateX(0%)";
          contentContainer.style.opacity = 1;

          contentContainer.style.transition = "top .25s, opacity .25s, transform .25s, border-radius .25s";
          contentHolder.style.transition = "width .25s, height .25s";
        } else {
          toolbar.style.removeProperty("border-top-right-radius");
          toolbar.style.removeProperty("border-bottom-right-radius");
          toolbar.style.removeProperty("border-top-left-radius");
          toolbar.style.removeProperty("border-bottom-left-radius");
        }
      }

      if (currentSubToolButton != null) {
        let toolbar = currentSubToolButton.closest(".eSubToolContainer");
        if (subSubToolbar != null) {
          let contentContainer = subSubToolbar.querySelector(".eSubToolContainer");
          let contentHolder = contentContainer.querySelector(".eSubToolContentHolder");
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
          contentContainer.style.top = (setSubToolTop + 12) + "px";

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

          contentContainer.style.transform = "translateX(0%)";
          contentContainer.style.opacity = 1;

          contentContainer.style.transition = "top .25s, opacity .25s, transform .25s, border-radius .25s";
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
    toolbarContent.addEventListener("scroll", () => { this.toolbar.update(); });
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
      if (this.currentToolModule != null && currentMouseSVG != null) {
        this.updateMouse(this.currentToolModule.MOUSE ?? { type: "set" });
      }
    }
    this.toolbar.createSubSub = async (moduleName) => {
      if (currentSubToolButton == null || moduleName == null) {
        return;
      }
      let toolbar = currentSubToolButton.closest(".eSubToolContainer");
      toolbar.insertAdjacentHTML("beforeend", `<div class="eSubToolHolder" option new>
        <div class="eSubToolContainer" option>
          <div class="eSubToolShadow"></div>
          <div class="eSubToolContentHolder">
            <div class="eSubToolContentScroll hideScroll">
              <div class="eSubToolContent" closetooltip noselect></div>
            </div>
          </div>
        </div>
      </div>`);
      subSubToolbar = toolbar.querySelector(".eSubToolHolder[new]");
      subSubToolbar.removeAttribute("new");
      let contentContainer = subSubToolbar.querySelector(".eSubToolContainer");
      if (toolbarHolder.hasAttribute("right") == false) {
        contentContainer.style.transform = "translateX(-100%)";
      } else {
        contentContainer.style.transform = "translateX(100%)";
      }
      this.applyToolModule(await this.setFrame(moduleName, subSubToolbar.querySelector(".eSubToolContent"), { construct: { editor: editor, toolbar: this, isToolbar: true } }));
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
        let contentContainer = removeToolbar.querySelector(".eSubToolContainer");
        if (toolbarHolder.hasAttribute("right") == false) {
          contentContainer.style.transform = "translateX(-100%)";
        } else {
          contentContainer.style.transform = "translateX(100%)";
        }
        contentContainer.style.opacity = 0;
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
      toolbar.insertAdjacentHTML("beforeend", `<div class="eSubToolHolder" new>
        <div class="eSubToolContainer" keeptooltip>
          <div class="eSubToolShadow"></div>
          <div class="eSubToolContentHolder">
            <div class="eSubToolContentScroll hideScroll">
              <div class="eSubToolContent" keeptooltip></div>
            </div>
          </div>
        </div>
      </div>`);
      subToolbar = toolbar.querySelector(".eSubToolHolder[new]");
      subToolbar.removeAttribute("new");
      let contentContainer = subToolbar.querySelector(".eSubToolContainer");
      if (toolbarHolder.hasAttribute("right") == false) {
        contentContainer.style.transform = "translateX(-100%)";
      } else {
        contentContainer.style.transform = "translateX(100%)";
      }

      let contentHolder = subToolbar.querySelector(".eSubToolContent");
      if (toolData.frame != null) {
        await this.parent.setFrame(toolData.frame, contentHolder, { construct: { editor: editor, toolbar: this, isToolbar: true } });
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
        let contentContainer = removeToolbar.querySelector(".eSubToolContainer");
        if (toolbarHolder.hasAttribute("right") == false) {
          contentContainer.style.transform = "translateX(-100%)";
        } else {
          contentContainer.style.transform = "translateX(100%)";
        }
        contentContainer.style.opacity = 0;
        await sleep(300);
        if (removeToolbar != null) {
          removeToolbar.remove();
        }
      })();
    }
    this.toolbar.enableTool = async (button, shortPress, noExtend, passData) => {
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
                }
              } else {
                this.currentToolModulePath = null;
              }
              if (noExtend == true) {
                this.toolbar.closeSub();
              }
            } else {
              currentSubTool = toolData.id;
              this.currentToolModulePath = toolData.module;
              this.tooltip.update();
            }
            this.activateTool(passData);
          } else {
            this.tooltip.update();
          }
        } else {
          if (subToolbar != null) {
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
            this.activateTool(passData);
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
    this.toolbar.setTool = async (targetButton, shortPress, noExtend, passData) => {
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
        await this.toolbar.enableTool(button, shortPress, noExtend, passData);
      } else if (button.closest(".eSubToolContentScroll") != null) {
        let setSubTool = button.getAttribute("tool");
        if (setSubTool != null) {
          currentSubTool = setSubTool;
          let toolPreference = editor.preferences.tools[currentTool] ?? {};
          if (toolPreference.subtool != null) {
            toolPreference.subtool = currentSubTool;
            editor.savePreferences();
          }
          await this.toolbar.enableTool(button, shortPress, null, passData);
        } else {
          await this.toolbar.enableTool(button, shortPress, null, passData);
        }
      }

      if (shortPress != true) {
        this.toolbar.update(false);
        this.tooltip.update();
      }
    }
    this.toolbar.startTool = async (button, noExtend, passData) => {
      await this.toolbar.setTool(button, true, noExtend, passData);
      await this.toolbar.setTool();
    }
    toolbarHolder.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.toolbar.startTool(event.target.closest("button"));
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

    this.getToolPreference = () => {
      return editor.preferences.tools[currentSubTool] ?? editor.preferences.tools[currentTool] ?? {};
    }
    this.setToolPreference = (path, value) => {
      let split = path.split(".");
      let check = this.getAnnotationPreference(true) ?? this.getToolPreference();
      for (let i = 0; i < split.length; i++) {
        if (i < split.length - 1) {
          check = check[split[i]];
        } else if (check != null) {
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
    this.getAnnotationPreference = (returnMissing) => {
      let result = editor.preferences.tools[this.getPreferenceTool().f];
      if (returnMissing == true) {
        return result;
      }
      return result ?? {};
    }
    this.saveSelecting = async (setFunction, options = {}) => {
      let keys = Object.keys(editor.selecting);
      for (let i = 0; i < keys.length; i++) {
        let annoid = keys[i];
        let original = editor.annotations[annoid] ?? {};
        let selecting = editor.selecting[annoid] ?? {};
        let annoModule = (await editor.render.getModule(selecting.f ?? original.render.f)) ?? {};

        let set = await setFunction(copyObject(original.render), annoModule);
        if (set.d != null && typeof set.d == "object") {
          set.d = { ...original.render.d, ...set.d };
        }
        if (editor.utils.isLocked(original.render) == true && set.lock == null) {
          continue;
        }
        if (annoModule.AUTO_TEXT_FIT == true || annoModule.AUTO_SET_HEIGHT == true) {
          await editor.render.create({ ...original, render: { ...original.render, ...selecting }, animate: false });
          let renderedText = original.element.querySelector("div[edit]");
          if (renderedText != null) {
            selecting.s = [(original.render.s ?? [])[0], (original.render.s ?? [])[1]];
            if (annoModule.AUTO_TEXT_FIT == true && original.render.textfit == true && selecting.textfit != false) {
              selecting.s[0] = renderedText.offsetWidth + 6;
              selecting.textfit = false;
            }
            if (annoModule.AUTO_SET_HEIGHT == true ) {
              selecting.s[1] = renderedText.offsetHeight + 6; //Math.max(select.s[1], renderedAnno.offsetHeight + 6);
            }
          }
        }
        let changes = false;
        let setKeys = Object.keys(set);
        for (let c = 0; c < setKeys.length; c++) {
          let key = setKeys[c];
          if (set[key] != original.render[key]) {
            changes = true;
            break;
          }
        }
        if (changes == false) {
          continue;
        }
        editor.selecting[annoid] = { ...selecting, ...set };
      }

      this.selection.action = "save";
      await this.selection.endAction({ redrawAction: false, fromHistory: options.saveHistory == false });
      if (options.redrawActionBar != false) {
        await this.selection.updateActionBar({ refresh: true, redraw: options.redraw, reuseActionBar: options.reuseActionBar, skipUpdate: options.reuseActionBar != true });
      }
    }

    this.selection = {};
    this.selection.currentSelections = {};
    this.selection.annotationRects = {};
    this.selection.scrollOffset = 32;
    this.selection.snapThreshold = 8;
    this.selection.renderSnaps = [];
    this.selection.checkDistanceXDirection = [];
    this.selection.checkDistanceYDirection = [];
    this.selection.currentSnapElements = {};
    this.selection.updateBox = async (options = {}) => {
      let removeSelections = [];
      let checkSelections = Object.keys(this.selection.currentSelections);
      for (let i = 0; i < checkSelections.length; i++) {
        let annoID = checkSelections[i];
        let selection = this.selection.currentSelections[annoID];
        let annoData = editor.annotations[annoID] ?? {};
        if (annoData.pointer != null) {
          delete this.selection.currentSelections[annoID];
          annoID = annoData.pointer;
          annoData = editor.annotations[annoID];
          this.selection.currentSelections[annoID] = selection;
        }
        let render = annoData.render;
        if (editor.selecting[annoID] != null && render != null && render.remove != true) {
          continue; // Is valid selection box
        }
        delete this.selection.currentSelections[annoID];
        let annotation = annoData.element;
        if (annotation != null) {
          annotation.removeAttribute("selected");
          annotation.removeAttribute("notransition");
          annotation.style.removeProperty("overflow");
          annotation.style.removeProperty("border-radius");
          let annoTx = annotation.querySelector("div[edit]");
          if (annoTx != null) {
            annoTx.removeAttribute("contenteditable");
            if (annoTx.hasAttribute("text") == true && annoTx.textContent.trim().length < 1) {
              await editor.history.push("add", [render]);
              await editor.save.push({ _id: annoID, remove: true });
              editor.realtimeSelect[annoID] = { ...editor.realtimeSelect[annoID], _id: annoID, remove: true };
              await editor.realtime.forceShort();
            }
          }
        }
        if (selection != null) {
          selection.style.opacity = 0;
          if (selection.hasAttribute("remove") == false) {
            selection.setAttribute("remove", "");
            removeSelections.push(selection);
          }
        }
      }
      if (removeSelections.length > 0) {
        (async function () {
          await sleep(150);
          for (let i = 0; i < removeSelections.length; i++) {
            let selection = removeSelections[i];
            if (selection != null) {
              selection.remove();
            }
          }
        })();
      }

      options.hideSelectBox = options.hideSelectBox ?? this.selection.hideSelectBox;

      this.selection.minX = null;
      this.selection.maxX = null;
      this.selection.minY = null;
      this.selection.maxY = null;
      this.selection.checkX = null;
      this.selection.checkY = null;
      this.selection.resizePreserveAspect = false;
      this.selection.multiSelectPreserveAspect = false;

      let showHandles = true;
      let showDuplicateHandles = true;
      let showOnlyWidthHandles = true;
      let showRotationHandle = false;

      let selectedAnnotations = [];
      let selectionChange = false;

      let annotationRect = editor.utils.localBoundingRect(annotations);

      let selections = Object.keys(editor.selecting);
      if (this.currentToolModule != null) {
        let setUserSelect = this.currentToolModule.USER_SELECT;
        //let setTouchAction = this.currentToolModule.TOUCH_ACTION;
        if (selections.length > 0) {
          setUserSelect = "none";
          //setTouchAction = "pinch-zoom";
          if (this.selection.originalUserSelect === null) {
            this.selection.originalUserSelect = this.currentToolModule.USER_SELECT;
          }
          /*if (this.selection.originalTouchAction === null) {
            this.selection.originalTouchAction = this.currentToolModule.TOUCH_ACTION;
          }*/
          this.selection.replaceCursorActive = true;
        } else if (this.selection.replaceCursorActive == true) {
          this.selection.replaceCursorActive = false;
          setUserSelect = this.selection.originalUserSelect;
          this.selection.originalUserSelect = null;
          //setTouchAction = this.selection.originalTouchAction;
          //this.selection.originalTouchAction = null;
        }
        if (setUserSelect != this.currentToolModule.USER_SELECT) {
          this.currentToolModule.USER_SELECT = setUserSelect;
          //this.currentToolModule.TOUCH_ACTION = setTouchAction;
          this.applyToolModule();
        }
      }
      for (let i = 0; i < selections.length; i++) {
        let annoID = selections[i];
        let annoData = editor.annotations[annoID] ?? {};
        if (annoData.pointer != null) {
          annoID = annoData.pointer;
          annoData = editor.annotations[annoID];
        }
        if (annoData.render == null) {
          delete editor.selecting[annoID];
          continue;
        }
        let merged = { ...annoData.render, ...editor.selecting[annoID] };
        if (merged.remove == true) {
          delete editor.selecting[annoID];
          continue;
        }
        
        let rect = editor.utils.getRect(merged);
        
        if (rect.selectingParent == true) {
          delete editor.selecting[annoID];
          return this.selection.updateBox(options);
        }

        if (editor.utils.canMemberModify(merged) != true || editor.utils.isLocked(merged) == true) {
          showHandles = false;
        }

        let annoModule = (await editor.render.getModule(merged.f)) ?? {};
        if (annoModule.SHOW_DUPLICATE_HANDLES != true) {
          showDuplicateHandles = false;
        }
        if (annoModule.SHOW_ONLY_WIDTH_HANDLES != true) {
          showOnlyWidthHandles = false;
        }
        if (annoModule.CAN_ROTATE != false) {
          showRotationHandle = true;
        }
        if (annoModule.RESIZE_PRESERVE_ASPECT == true) {
          this.selection.resizePreserveAspect = true;
        }
        if (annoModule.SELECTION_FUNCTION != null) {
          annoModule.SELECTION_FUNCTION(this.selection, merged);
        }
        
        let annotation = annoData.element;
        if (annotation != null) {
          annotation.setAttribute("selected", "");
          annotation.style.borderRadius = (4 / editor.zoom) + "px";
          if (annoModule.ALLOW_SELECT_OVERFLOW != true) {
            annotation.style.overflow = "hidden";
          }
        }

        let select = this.selection.currentSelections[annoID];
        let collabSelect = realtimeHolder.querySelector('.eCollabSelect[anno="' + annoID + '"]');
        
        let transition = this.selection.action == null && options.transition != false;

        if (selections.length > 1 || options.hideSelectBox == true) {
          if (select == null) {
            content.insertAdjacentHTML("beforeend", `<div class="eSelect" new></div>`);
            select = content.querySelector(".eSelect[new]");
            select.removeAttribute("new");
            select.style.border = "solid 4px var(--secondary)";
            select.style.opacity = 1;
            transition = false;
          }
          if (rect.rotation != 0) {
            this.selection.multiSelectPreserveAspect = true;
          }
        } else if (select != null) {
          select.remove();
          select = null;
        }
        if (this.selection.currentSelections.hasOwnProperty(annoID) == false) {
          selectionChange = true;
        }
        this.selection.currentSelections[annoID] = select;
        selectedAnnotations.push(annoID);

        if (transition == false) {
          if (select != null) {
            select.setAttribute("notransition", "");
          }
          if (annotation != null) {
            annotation.setAttribute("notransition", "");
          }
          if (collabSelect != null) {
            collabSelect.setAttribute("notransition", "");
          }
        } else {
          if (select != null) {
            select.removeAttribute("notransition");
          }
          if (annotation != null) {
            annotation.removeAttribute("notransition");
          }
          if (collabSelect != null) {
            collabSelect.removeAttribute("notransition");
          }
        }

        this.selection.lastRect = rect;
        this.selection.lastElementWidth = rect.width;
        this.selection.lastElementHeight = rect.height;
        this.selection.lastElementX = annotationRect.left + (rect.x * editor.zoom) + contentHolder.scrollLeft - 2;
        this.selection.lastElementY = annotationRect.top + (rect.y * editor.zoom) + contentHolder.scrollTop - 2;
        this.selection.lastElementRotate = rect.rotation;

        if (select != null) {
          select.style.width = ((this.selection.lastElementWidth * editor.zoom) - 4) + "px";
          select.style.height = ((this.selection.lastElementHeight * editor.zoom) - 4) + "px";
          select.style.transform = "translate(" + this.selection.lastElementX + "px," + this.selection.lastElementY + "px) rotate(" + this.selection.lastElementRotate + "deg)";
        }

        let [topLeftX, topLeftY, bottomRightX, bottomRightY] = editor.math.rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);

        this.selection.minX = Math.min(this.selection.minX ?? topLeftX, topLeftX);
        this.selection.minY = Math.min(this.selection.minY ?? topLeftY, topLeftY);
        this.selection.maxX = Math.max(this.selection.maxX ?? bottomRightX, bottomRightX);
        this.selection.maxY = Math.max(this.selection.maxY ?? bottomRightY, bottomRightY);

        let setCheckX = rect.x + rect.width;
        this.selection.checkX = Math.min(this.selection.checkX ?? setCheckX, setCheckX);
        let setCheckY = rect.y + rect.height;
        this.selection.checkY = Math.min(this.selection.checkY ?? setCheckY, setCheckY);

        if (transition == false && select != null) {
          select.offsetHeight;
          select.removeAttribute("notransition");
        }

        if (collabSelect != null) {
          let rotate = rect.rotation;
          if (rotate > 180) {
            rotate = -(360 - rotate);
          }
          collabSelect.style.width = ((rect.width * editor.zoom) - 3) + "px";
          collabSelect.style.height = ((rect.height * editor.zoom) - 3) + "px";
          collabSelect.style.transform = "translate(" + (annotationRect.left + (rect.x * editor.zoom) + contentHolder.scrollLeft - 1.5) + "px," + (annotationRect.top + (rect.y * editor.zoom) + contentHolder.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
        }
      }

      let showSelectBox = selectedAnnotations.length > 0 && options.hideSelectBox != true;
      let refreshSelectBox = this.selection.lastSelectAmount == selectedAnnotations.length && selectionChange == true;
      if (showSelectBox == false || refreshSelectBox == true) {
        let remSelect = this.selection.selectBox;
        if (remSelect != null) {
          this.selection.selectBox = null;
          this.selection.lastSelectAmount = 0;
          remSelect.style.opacity = 0;
          (async function () {
            await sleep(150);
            if (remSelect != null) {
              remSelect.remove();
            }
          })();
        }
      }
      if (showSelectBox == true) {
        let transition = this.selection.action == null && options.transition != false && this.selection.lastSelectAmount == selectedAnnotations.length;
        if (this.selection.selectBox == null) {
          content.insertAdjacentHTML("beforeend", `<div class="eSelect" new>
            <div class="eSelectHandle" handle="movetop" ignore></div>
            <div class="eSelectHandle" handle="movebottom" ignore></div>
            <div class="eSelectHandle" handle="moveleft" ignore></div>
            <div class="eSelectHandle" handle="moveright" ignore></div>
            <svg class="eSelectHandle" handle="topleft" essential width="16" height="16" rotation="180" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 14V14C2 7.37258 7.37258 2 14 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="topright" width="16" height="16" rotation="270" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 14V14C14 7.37258 8.62742 2 2 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="bottomleft" width="16" height="16" rotation="90" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2V2C2 8.62742 7.37258 14 14 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="bottomright" essential width="16" height="16" rotation="0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 2V2C14 8.62742 8.62742 14 2 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="left" widthhandle width="12" height="28" rotation="135" viewBox="0 0 12 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="right" widthhandle width="12" height="28" rotation="315" viewBox="0 0 12 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="top" heighthandle width="28" height="12" rotation="225" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="bottom" heighthandle width="28" height="12" rotation="45" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="rotate" width="26" height="26" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.46244 9.45089C2.67045 10.2429 1.38612 10.2429 0.594123 9.45089C-0.197875 8.65884 -0.197875 7.37466 0.594123 6.58261L3.46244 9.45089ZM9.04395 3.86918L3.46244 9.45089L0.594123 6.58261L6.17562 1.0009L9.04395 3.86918Z" fill="#0084FF"/> <path d="M14.6257 6.58261C15.4177 7.37466 15.4177 8.65884 14.6257 9.45089C13.8337 10.2429 12.5494 10.2429 11.7574 9.45089L14.6257 6.58261ZM9.04373 1.0009L14.6257 6.58261L11.7574 9.45089L6.17541 3.86918L9.04373 1.0009Z" fill="var(--theme)"/> <path d="M21.3783 19.0707C20.5863 18.2786 20.5863 16.9945 21.3783 16.2024C22.1703 15.4104 23.4546 15.4104 24.2466 16.2024L21.3783 19.0707ZM26.9603 24.6523L21.3783 19.0707L24.2466 16.2024L29.8281 21.7841L26.9603 24.6523Z" fill="var(--theme)"/> <path d="M24.2466 30.2341C23.4546 31.0261 22.1703 31.0261 21.3783 30.2341C20.5863 29.442 20.5863 28.1579 21.3783 27.3658L24.2466 30.2341ZM29.8281 24.6524L24.2466 30.2341L21.3783 27.3658L26.9603 21.7841L29.8281 24.6524Z" fill="var(--theme)"/> <path d="M7.63804 2.43607V10.0101C7.63804 17.2905 13.5396 23.1924 20.8203 23.1924H28.394" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="duplicateleft" duplicate width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="duplicateright" duplicate width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="duplicatetop" duplicate width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="duplicatebottom" duplicate width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="12" cy="12" r="10.5" fill="var(--hover)" stroke="var(--theme)" stroke-width="3"/> <path d="M12 16.5L12 7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> <path d="M16.5 12H7.5" stroke="var(--theme)" stroke-width="3" stroke-linecap="round"/> </svg>  
          </div>`);
          this.selection.selectBox = content.querySelector(".eSelect[new]");
          this.selection.selectBox.removeAttribute("new");
          this.selection.selectBox.style.zIndex = 102;
          this.selection.selectBox.style.border = "solid 4px var(--theme)";
          this.selection.selectBox.style.opacity = 1;
          transition = false;
        }
        if (transition == false) {
          this.selection.selectBox.setAttribute("notransition", "");
        } else {
          this.selection.selectBox.removeAttribute("notransition");
        }
        this.selection.lastSelectAmount = selectedAnnotations.length;

        let boxWidth = 0;
        let boxHeight = 0;
        let boxX = 0;
        let boxY = 0;
        if (selectedAnnotations.length < 2) {
          boxWidth = ((this.selection.lastElementWidth * editor.zoom) - 4);
          boxHeight = ((this.selection.lastElementHeight * editor.zoom) - 4);
          boxX = this.selection.lastElementX;
          boxY = this.selection.lastElementY;
          this.selection.rotation = this.selection.lastElementRotate;
          if (this.selection.rotation > 180) {
            this.selection.rotation = -(360 - this.selection.rotation);
          }
        } else {
          boxWidth = ((this.selection.maxX - this.selection.minX) * editor.zoom) - 4;
          boxHeight = ((this.selection.maxY - this.selection.minY) * editor.zoom) - 4;
          boxX = annotationRect.left + (this.selection.minX * editor.zoom) + contentHolder.scrollLeft - 2;
          boxY = annotationRect.top + (this.selection.minY * editor.zoom) + contentHolder.scrollTop - 2;
          this.selection.rotation = 0;
        }
        this.selection.selectBox.style.width = boxWidth + "px";
        this.selection.selectBox.style.height = boxHeight + "px";
        this.selection.selectBox.style.transform = "translate(" + boxX + "px," + boxY + "px) rotate(" + this.selection.rotation + "deg)";
        
        if (showHandles == true) {
          this.selection.selectBox.removeAttribute("hidehandles");
        } else {
          this.selection.selectBox.setAttribute("hidehandles", "");
        }
        if (showDuplicateHandles != true) {
          this.selection.handlePadding = 24;
          this.selection.selectBox.removeAttribute("showduplicate");
        } else {
          this.selection.handlePadding = 60;
          this.selection.selectBox.setAttribute("showduplicate", "");
        }
        if (showOnlyWidthHandles != true) {
          this.selection.selectBox.removeAttribute("showonlywidth");
        } else {
          this.selection.selectBox.setAttribute("showonlywidth", "");
        }
        if (showRotationHandle == true) {
          this.selection.selectBox.removeAttribute("hiderotation");
        } else {
          this.selection.selectBox.setAttribute("hiderotation", "");
        }
        if (boxWidth > 52) {
          this.selection.selectBox.removeAttribute("hideheighthandles");
        } else {
          this.selection.selectBox.setAttribute("hideheighthandles", "");
        }
        if (boxHeight > 52) {
          this.selection.selectBox.removeAttribute("hidewidthhandles");
        } else {
          this.selection.selectBox.setAttribute("hidewidthhandles", "");
        }
        if (boxHeight > 20) {
          this.selection.selectBox.removeAttribute("hidenonessential");
        } else {
          this.selection.selectBox.setAttribute("hidenonessential", "");
        }

        if (transition == false) {
          this.selection.selectBox.offsetHeight;
          this.selection.selectBox.removeAttribute("notransition");
        }
      }

      if (options.redrawAction != false) {
        this.selection.updateActionBar({ ...options, redraw: selectionChange || options.redraw == true || options.redrawAction == true });
      }

      let allRealtimeSelections = realtimeHolder.querySelectorAll(".eCollabSelect");
      for (let i = 0; i < allRealtimeSelections.length; i++) {
        let selection = allRealtimeSelections[i];
        let annoID = selection.getAttribute("anno");
        let render = {};
        if (annoID != "cursor") {
          if (editor.annotations[annoID] == null) {
            selection.remove();
            continue;
          }
          render = { ...((editor.annotations[annoID]).render ?? {}), ...(editor.selecting[annoID] ?? {}) };
        } else if (editor.realtime.module != null) {
          let member = editor.realtime.module.members[selection.getAttribute("member")];
          if (member == null || member.cursorRender == null) {
            continue;
          }
          render = { ...member.cursorRender, ...(editor.selecting[annoID] ?? {}) };
        }
        if (render.f == null) {
          continue;
        }
        let rect = editor.utils.getRect(render);
        let transition = options.transition != false && (this.selection.action == null || rect.selectingParent != true);
        if (transition == false) {
          selection.setAttribute("notransition", "");
        }
        let rotate = rect.rotation;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        selection.style.width = ((rect.width * editor.zoom) - 3) + "px";
        selection.style.height = ((rect.height * editor.zoom) - 3) + "px";
        selection.style.transform = "translate(" + (annotationRect.left + (rect.x * editor.zoom) + contentHolder.scrollLeft - 1.5) + "px," + (annotationRect.top + (rect.y * editor.zoom) + contentHolder.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
        if (transition == false) {
          selection.offsetHeight;
          selection.removeAttribute("notransition");
        }
      }

      if (options.transition == false) {
        this.selection.updateSnapLines();
      }
    }
    this.selection.updateActionBar = async (options = {}) => {
      let removeActionBar = (options.reuseActionBar ?? (this.selection.currentActionModule ?? {}).forceCurrentActionBar) != true;
      let showSelectBox = (
        Object.keys(this.selection.currentSelections).length > 0 &&
        (this.selection.action == null || this.selection.actionEnabled == false) &&
        options.hideSelectBox != true &&
        this.selection.saving != true
      );
      if (showSelectBox == true && removeActionBar == true) {
        removeActionBar = (
          this.selection.checkX == null || this.selection.checkY == null ||
          Math.floor(this.selection.checkX) != Math.floor(this.selection.lastCheckX) ||
          Math.floor(this.selection.checkY) != Math.floor(this.selection.lastCheckY) ||
          options.redraw == true
        );
      }
      this.selection.lastCheckX = this.selection.checkX;
      this.selection.lastCheckY = this.selection.checkY;
      if (removeActionBar == true && this.selection.actionBar != null) {
        this.selection.actionFrame = null;
        this.selection.actionFrameButton = null;
        this.selection.currentActionModule = null;
        let removeActionBar = this.selection.actionBar;
        this.selection.actionBar = null;
        (async () => {
          if (removeActionBar == null) {
            return;
          }
          removeActionBar.setAttribute("remove", "");
          removeActionBar.style.transform = "translateY(-10%)";
          removeActionBar.style.opacity = 0;
          await sleep(200);
          if (removeActionBar != null) {
            removeActionBar.remove();
          }
        })();
      }
      if (showSelectBox == false) {
        return;
      }
      
      let newActionBar = false;
      if (this.selection.actionBar == null) { // Create UI
        content.insertAdjacentHTML("beforeend", `<div class="eActionBar" top new>
          <div class="eActionToolbar eHorizontalToolsHolder" keeptooltip></div>
        </div>`);
        this.selection.actionBar = content.querySelector(".eActionBar[new]");
        this.selection.actionBar.removeAttribute("new");
        newActionBar = true;
      }

      if (newActionBar == true || options.refresh == true) {
        let actionButtonHolder = this.selection.actionBar.querySelector(".eActionToolbar");
        let actionToolbarLoaded = actionButtonHolder.hasAttribute("loaded");
        let combineTools;
        let showLocked = false;
        let selections = Object.keys(editor.selecting);
        for (let i = 0; i < selections.length; i++) {
          let render = (editor.annotations[selections[i]] ?? {}).render;
          if (render == null) {
            continue;
          }
          if (showLocked == false) {
            showLocked = (editor.utils.canMemberModify(render) == false || editor.utils.isLocked(render) == true);
          }

          if (actionToolbarLoaded == false) {
            let annoModule = (await editor.render.getModule(render.f)) ?? {};
            if (annoModule.ACTION_BAR_TOOLS == null) {
              continue;
            }
            if (combineTools == null) {
              combineTools = copyObject(annoModule.ACTION_BAR_TOOLS);
            }
            for (let c = 0; c < combineTools.length; c++) {
              if (annoModule.ACTION_BAR_TOOLS.includes(combineTools[c]) == false) {
                combineTools.splice(c, 1);
                c--;
              }
            }
          }
        }

        if (selections.length > 0) {
          if (actionToolbarLoaded == false) {
            actionButtonHolder.setAttribute("loaded", "");
            combineTools = combineTools ?? [];
            combineTools.unshift("collaborator");
            combineTools.push("more");
            
            actionButtonHolder.innerHTML = "";
            for (let i = 0; i < combineTools.length; i++) {
              let action = combineTools[i];
              actionButtonHolder.insertAdjacentHTML("beforeend", `<button class="eTool" new><div></div></button>`);
              let newAction = actionButtonHolder.querySelector("[new]");
              newAction.removeAttribute("new");
              newAction.setAttribute("action", action);
              newAction.setAttribute("module", "editor/toolbar/" + action);
            }
          }
        
          for (let i = 0; i < actionButtonHolder.children.length; i++) {
            let newAction = actionButtonHolder.children[i];
            if (newAction == null) {
              continue;
            }
            let actionModule = (await this.newModule(newAction.getAttribute("module"))) ?? {};
            actionModule.editor = editor;
            actionModule.toolbar = this;
            actionModule.isActionBar = true;
            if (actionModule.SUPPORTS_MULTIPLE_SELECT == false && selections.length > 1) {
              continue;
            }
            (async () => {
              let isVisible = true;
              newAction.innerHTML = "<div></div>";
              let buttonHolder = newAction.querySelector("div");
              if (actionModule.setActionButton != null) {
                isVisible = (await actionModule.setActionButton(buttonHolder)) != false;
              }
              if (newAction == null) {
                return;
              }
              if (actionModule.SHOW_ON_LOCK != true) {
                isVisible = showLocked == false;
              }
              if (actionModule.TOOLTIP != null) {
                newAction.setAttribute("tooltip", actionModule.TOOLTIP);
              }
              if (isVisible == true) {
                newAction.style.removeProperty("display");
              } else {
                newAction.style.display = "none";
              }
              let elementBefore = newAction.previousElementSibling;
              let elementAfter = newAction.nextElementSibling;
              if (isVisible == true) {
                if (actionModule.ADD_DIVIDE_BEFORE == true && elementBefore != null && elementBefore.className != "eVerticalDivider") {
                  let newDivider = document.createElement("div");
                  newDivider.className = "eVerticalDivider";
                  actionButtonHolder.insertBefore(newDivider, newAction);
                }
                if (actionModule.ADD_DIVIDE_AFTER == true && (elementAfter == null || elementAfter.className != "eVerticalDivider")) {
                  let newDivider = document.createElement("div");
                  newDivider.className = "eVerticalDivider";
                  actionButtonHolder.insertBefore(newDivider, elementAfter);
                }
              } else {
                if (elementBefore != null && elementBefore.className == "eVerticalDivider") {
                  elementBefore.remove();
                }
                if (elementAfter != null && elementAfter.className == "eVerticalDivider") {
                  elementAfter.remove();
                }
              }
            })();
          }
        }
      }

      if (this.selection.actionBar == null) {
        return;
      }

      // Update Action Bar UI
      if (options.skipUpdate != true || newActionBar == true) {
        let annotationRect = editor.utils.localBoundingRect(annotations);
        let pxLeft = annotationRect.left + ((this.selection.minX + ((this.selection.maxX - this.selection.minX) / 2)) * editor.zoom) - (this.selection.actionBar.offsetWidth / 2);
        if (toolbarHolder.hasAttribute("right") == false) {
          if (pxLeft + this.selection.actionBar.offsetWidth + 8 > contentHolder.clientWidth) {
            pxLeft -= (pxLeft + this.selection.actionBar.offsetWidth + 8) - contentHolder.clientWidth;
          }
          pxLeft = Math.max(pxLeft, editor.scrollOffset);
        } else {
          if (pxLeft + this.selection.actionBar.offsetWidth + editor.scrollOffset > contentHolder.clientWidth) {
            pxLeft -= (pxLeft + this.selection.actionBar.offsetWidth + editor.scrollOffset) - contentHolder.clientWidth;
          }
          pxLeft = Math.max(pxLeft, 8);
        }
        let yPos = annotationRect.top + (this.selection.minY * editor.zoom) - this.selection.actionBar.offsetHeight - this.selection.handlePadding;
        let isBottom = false;
        if (yPos < editor.scrollOffset) {
          let modifiedY = annotationRect.top + (this.selection.maxY * editor.zoom) + this.selection.handlePadding;
          if (modifiedY + this.selection.actionBar.offsetHeight + editor.scrollOffset > contentHolder.clientHeight) {
            yPos = editor.scrollOffset;
          } else {
            yPos = modifiedY;
            isBottom = true;
          }
        }
        let maxActionBarWidth = contentHolder.clientWidth - editor.scrollOffset - 8;
        this.selection.actionBar.style.maxWidth = maxActionBarWidth + "px";
        this.selection.actionBar.style.left = (pxLeft + contentHolder.scrollLeft) + "px";
        this.selection.actionBar.style.top = (yPos + contentHolder.scrollTop) + "px";

        if (isBottom == false) { // Is at top
          if (yPos - 32 < editor.scrollOffset) {
            this.selection.actionBar.setAttribute("tooltipbottom", "");
          } else {
            this.selection.actionBar.removeAttribute("tooltipbottom");
          }
        } else { // Is at bottom
          if (contentHolder.clientHeight - yPos - this.selection.actionBar.offsetHeight - 32 < editor.scrollOffset) {
            this.selection.actionBar.removeAttribute("tooltipbottom");
          } else {
            this.selection.actionBar.setAttribute("tooltipbottom", "");
          }
        }

        if (this.selection.actionFrame != null) {
          let actionContent = this.selection.actionFrame.querySelector(".eActionContainerContent");
          let actionContainer = this.selection.actionFrame.querySelector(".eActionContainer");
          let alignTop;
          if (isBottom == false) {
            alignTop = true;
            if (yPos - actionContent.offsetHeight - 8 < editor.scrollOffset) {
              alignTop = false;
            }
          } else {
            alignTop = false;
            if (page.offsetHeight - yPos - this.selection.actionFrame.offsetHeight - actionContent.offsetHeight - 8 < editor.scrollOffset) {
              alignTop = true;
            }
          }

          let frameLeft = 0;
          if (this.selection.actionFrameButton != null) {
            frameLeft = (this.selection.actionFrameButton.getBoundingClientRect().left - this.selection.actionBar.getBoundingClientRect().left) + (this.selection.actionFrameButton.offsetWidth / 2) - (actionContent.offsetWidth / 2);
            if (frameLeft + actionContent.offsetWidth > this.selection.actionBar.offsetWidth) {
              frameLeft = this.selection.actionBar.offsetWidth - actionContent.offsetWidth;
            }
            if (frameLeft < 0) {
              frameLeft = 0;
            }
            if (actionContent.offsetWidth > this.selection.actionBar.offsetWidth) {
              frameLeft = (this.selection.actionBar.offsetWidth - actionContent.offsetWidth) / 2;
            }
            this.selection.actionFrame.style.left = (frameLeft - 12) + "px";
            actionContainer.style.width = actionContent.offsetWidth + "px";
            actionContainer.style.height = actionContent.offsetHeight + "px";
            this.selection.actionFrame.querySelector(".eActionContainerScroll").style.maxWidth = maxActionBarWidth + "px";
          }

          if (alignTop == true) {
            this.selection.actionBar.setAttribute("top", "");
            this.selection.actionBar.removeAttribute("bottom");
            this.selection.actionFrame.setAttribute("top", "");
            this.selection.actionFrame.removeAttribute("bottom");

            if (frameLeft < 16) {
              this.selection.actionBar.style.borderTopLeftRadius = "0px";
            } else {
              this.selection.actionBar.style.removeProperty("border-top-left-radius");
            }
            if (frameLeft + actionContent.offsetWidth > this.selection.actionBar.offsetWidth - 16) {
              this.selection.actionBar.style.borderTopRightRadius = "0px";
            } else {
              this.selection.actionBar.style.removeProperty("border-top-right-radius");
            }
            this.selection.actionBar.style.removeProperty("border-bottom-left-radius");
            this.selection.actionBar.style.removeProperty("border-bottom-right-radius");
          } else {
            this.selection.actionBar.setAttribute("bottom", "");
            this.selection.actionBar.removeAttribute("top");
            this.selection.actionFrame.setAttribute("bottom", "");
            this.selection.actionFrame.removeAttribute("top");

            if (frameLeft < 16) {
              this.selection.actionBar.style.borderBottomLeftRadius = "0px";
            } else {
              this.selection.actionBar.style.removeProperty("border-bottom-left-radius");
            }
            if (frameLeft + actionContent.offsetWidth > this.selection.actionBar.offsetWidth - 16) {
              this.selection.actionBar.style.borderBottomRightRadius = "0px";
            } else {
              this.selection.actionBar.style.removeProperty("border-bottom-right-radius");
            }
            this.selection.actionBar.style.removeProperty("border-top-left-radius");
            this.selection.actionBar.style.removeProperty("border-top-right-radius");
          }
        }

        if (options.redrawCurrentAction == true && this.selection.currentActionModule != null && this.selection.currentActionModule.redraw != null) {
          this.selection.currentActionModule.redraw();
        }
      }

      if (newActionBar == true) {
        this.selection.actionBar.style.transform = "translateY(0%)";
        this.selection.actionBar.style.opacity = 1;
      }
    }
    this.selection.clickAction = async (event, options = {}) => {
      if (event == null) {
        return;
      }
      /*let interact = await this.selection.interactRun(event.target);
      if (interact == true) {
        return;
      }
      if (this.selection.actionBar == null) {
        return;
      }*/
      let actionButton = event.target.closest(".eTool");
      if (actionButton == null || actionButton.closest(".eActionToolbar") == null) {
        return;
      }

      await this.selection.showActionFrame();

      let newActionModule = (await this.newModule(actionButton.getAttribute("module"))) ?? {};
      if (newActionModule.FULL_CLICK != true) {
        if (options.clickEnd == true) {
          return;
        }
      } else {
        if (options.clickEnd != true) {
          return;
        }
      }

      let wasSelected = actionButton.hasAttribute("selected");
      this.selection.closeActionFrame();
      if (wasSelected == true) {
        return;
      }
      this.selection.actionFrameButton = actionButton;
      
      newActionModule.editor = editor;
      newActionModule.toolbar = this;
      newActionModule.isActionBar = true;
      newActionModule.button = actionButton;

      let contentFrame;
      if (newActionModule.html != null) {
        actionButton.setAttribute("selected", "");
        actionButton.setAttribute("extend", "");

        this.selection.actionBar.insertAdjacentHTML("beforeend", `<div class="eActionHolder" top new>
          <div class="eActionContainer">
            <div class="eActionShadow"></div>
              <div class="eActionContainerHolder">
                <div class="eActionContainerScroll">
                  <div class="eActionContainerContent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>`);
        this.selection.actionFrame = this.selection.actionBar.querySelector(".eActionHolder[new]");
        this.selection.actionFrame.removeAttribute("new");
        contentFrame = this.selection.actionFrame.querySelector(".eActionContainerContent");
        contentFrame.innerHTML = newActionModule.html;
      }
      if (newActionModule.js != null) {
        await newActionModule.js(contentFrame);
      }
      this.selection.currentActionModule = newActionModule;

      if (newActionModule.FULL_CLICK == true) {
        await this.selection.showActionFrame();
      }
    }
    this.selection.showActionFrame = async () => {
      if (this.selection.actionFrame == null) {
        return;
      }

      await this.selection.updateActionBar();
      this.tooltip.update();
      
      let containerFrame = this.selection.actionFrame.querySelector(".eActionContainer");
      if (this.selection.actionFrame.hasAttribute("top") == true) {
        containerFrame.style.transform = "translateY(100%)";
      } else {
        containerFrame.style.transform = "translateY(-100%)";
      }
      containerFrame.offsetHeight;
      containerFrame.style.transition = "width .25s, height .25s, opacity .25s, transform .25s";
      containerFrame.style.transform = "translateY(0%)";
      containerFrame.style.opacity = 1;
    }
    this.selection.closeActionFrame = () => {
      if (this.selection.actionFrameButton != null) {
        this.selection.actionFrameButton.removeAttribute("extend");
        this.selection.actionFrameButton.removeAttribute("selected");
      }
      this.selection.actionFrameButton = null;
      this.selection.currentActionModule = null;
      this.selection.fullClickActionModule = null;
      if (this.selection.actionFrame == null) {
        return;
      }
      let removeFrame = this.selection.actionFrame;
      this.selection.actionFrame = null;
      this.selection.updateActionBar();
      (async () => {
        removeFrame.style.zIndex = 1;
        let contentContainer = removeFrame.querySelector(".eActionContainer");
        if (removeFrame.hasAttribute("top") == true) {
          contentContainer.style.transform = "translateY(100%)";
        } else {
          contentContainer.style.transform = "translateY(-100%)";
        }
        if (this.selection.actionBar != null) {
          this.selection.actionBar.style.removeProperty("border-top-left-radius");
          this.selection.actionBar.style.removeProperty("border-top-right-radius");
          this.selection.actionBar.style.removeProperty("border-bottom-left-radius");
          this.selection.actionBar.style.removeProperty("border-bottom-right-radius");
        }
        contentContainer.style.opacity = 0;
        await sleep(300);
        if (removeFrame != null) {
          removeFrame.remove();
        }
      })();
    }
    this.selection.startAction = async (event) => {
      if (this.selection.selectBox == null) {
        return;
      }
      if (editor.self.access < 1) {
        return;
      }

      this.selection.actionEnabled = false;
      this.selection.annotationRects = {};
      this.selection.handle = null;
      let handleElement = event.target.closest(".eSelectHandle");
      if (handleElement != null) {
        if (handleElement.hasAttribute("ignore") == false) {
          this.selection.handle = handleElement.getAttribute("handle");
        }
      }

      let { mouseX, mouseY } = editor.utils.localMousePosition(event);
      let position = editor.utils.scaleToDoc(mouseX, mouseY);
      this.selection.enableStartX = mouseX;
      this.selection.enableStartY = mouseY;

      if (this.selection.handle == null) { // Move
        this.selection.action = "move";
        this.selection.rootX = position.x;
        this.selection.rootY = position.y;
      } else if (handleElement.hasAttribute("duplicate") == false) { // Resize OR Rotate
        let boundingBoxWidth = this.selection.maxX - this.selection.minX;
        let boundingBoxHeight = this.selection.maxY - this.selection.minY;
        let transformRotateWidth = this.selection.minX + (boundingBoxWidth / 2);
        let transformRotateHeight = this.selection.minY + (boundingBoxHeight / 2);

        let radian = this.selection.rotation * (Math.PI / 180);

        let originalWidth = boundingBoxWidth;
        let originalHeight = boundingBoxHeight;
        if (this.selection.rotation != 0) {
          originalWidth = this.selection.lastElementWidth;
          originalHeight = this.selection.lastElementHeight;
        }

        // Calculate the rotated bounding box dimensions using the original bounding box dimensions
        let rotatedWidth = Math.abs(boundingBoxWidth * Math.cos(radian)) + Math.abs(boundingBoxHeight * Math.sin(radian));
        let rotatedHeight = Math.abs(boundingBoxHeight * Math.cos(radian)) + Math.abs(boundingBoxWidth * Math.sin(radian));

        // Calculate the offset to the new top-left corner of the rotated bounding box:
        let offsetX = (rotatedWidth - originalWidth) / 2;
        let offsetY = (rotatedHeight - originalHeight) / 2;

        // Calculate the new top-left corner of the rotated bounding box:
        let rotatedTopLeftX = transformRotateWidth - (rotatedWidth / 2) + offsetX;
        let rotatedTopLeftY = transformRotateHeight - (rotatedHeight / 2) + offsetY;

        this.selection.originalPosition = [rotatedTopLeftX, rotatedTopLeftY];
        this.selection.originalSize = [originalWidth, originalHeight];

        if (this.selection.handle != "rotate") { // Resize
          this.selection.action = "resize";

          let halfRotateWidth = this.selection.originalPosition[0] + (this.selection.originalSize[0] / 2);
          let halfRotateHeight = this.selection.originalPosition[1] + (this.selection.originalSize[1] / 2);
          let [xCoord, yCoord] = editor.math.rotatePoint(position.x - halfRotateWidth, position.y - halfRotateHeight, -this.selection.rotation);
          this.selection.rootX = xCoord;
          this.selection.rootY = yCoord;

          this.selection.resizeCursorRotation = parseInt(handleElement.getAttribute("rotation") ?? "0");
          this.updateMouse({ type: "svg", url: "./images/editor/cursors/resize.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation + this.selection.resizeCursorRotation });
        } else { // Rotate
          this.selection.action = "rotate";

          this.selection.originalRotate = this.selection.rotation;

          let centerX = this.selection.originalSize[0] / 2;
          let centerY = this.selection.originalSize[1] / 2;
          let yRoot = -(position.y - (this.selection.originalPosition[1] + centerY));
          let xRoot = position.x - (this.selection.originalPosition[0] + centerX);
          this.selection.originalRotation = (Math.atan2(yRoot, xRoot) * 180) / Math.PI;
          if (this.selection.originalRotation < 0) {
            this.selection.originalRotation = 360 + this.selection.originalRotation;
          }

          this.updateMouse({ type: "svg", url: "./images/editor/cursors/rotate.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation });
        }
      } else { // Duplicate
        let moreModule = (await this.newModule("editor/toolbar/more")) ?? {};
        if (moreModule.duplicate != null) {
          moreModule.editor = editor;
          moreModule.toolbar = this;
          return await moreModule.duplicate(this.selection.handle);
        }
      }
      event.preventDefault();
    }
    this.selection.updateSnapLines = async (render) => {
      let annotationRect = editor.utils.localBoundingRect(annotations);

      let validSnaps = {};
      let snapX = 0;
      let snapY = 0;
      for (let i = 0; i < this.selection.renderSnaps.length; i++) {
        let snap = this.selection.renderSnaps[i];
        if (snap == null) {
          continue;
        }
        let existingValid = validSnaps[snap.type];
        if (existingValid != null) {
          if (snap.marker != null) {
            if (Math.max(snap.width, snap.height) > Math.max(existingValid.width, existingValid.height)) {
              continue;
            }
          } else {
            snap.width = snap.width + existingValid.width - (Math.min(snap.x + snap.width, existingValid.x + existingValid.width) - Math.max(snap.x, existingValid.x));
            snap.height = snap.height + existingValid.height - (Math.min(snap.y + snap.height, existingValid.y + existingValid.height) - Math.max(snap.y, existingValid.y));
            snap.x = Math.min(snap.x, existingValid.x);
            snap.y = Math.min(snap.y, existingValid.y);
          }
        }

        if (snap.width > 0 && snap.height > 0) {
          if (snap.width > snap.height) {
            snap.height = 0;
          } else {
            snap.width = 0;
          }
        }
  
        validSnaps[snap.type] = snap;

        if (snap.additionalLines != null) {
          for (let a = 0; a < snap.additionalLines.length; a++) {
            let snapVisual = snap.additionalLines[a];
            validSnaps[snapVisual.type] = snapVisual;
          }
        }
      }
      if (validSnaps["left_left_side"] != null && validSnaps["right_right_side"] != null) {
        delete validSnaps["center_vertical"];
      }
      if (validSnaps["top_top_side"] != null && validSnaps["bottom_bottom_side"] != null) {
        delete validSnaps["center_horizontal"];
      }
      if (validSnaps["center_distance_left"] == null || validSnaps["center_distance_right"] == null || validSnaps["center_distance_right"].width - validSnaps["center_distance_left"].width > this.snapThreshold) {
        delete validSnaps["center_distance_left"];
        delete validSnaps["center_distance_right"];
      }
      if (validSnaps["center_distance_right"] == null || validSnaps["center_distance_left"] == null || validSnaps["center_distance_left"].width - validSnaps["center_distance_right"].width > this.snapThreshold) {
        delete validSnaps["center_distance_right"];
        delete validSnaps["center_distance_left"];
      }
      if (validSnaps["center_distance_top"] == null || validSnaps["center_distance_bottom"] == null || validSnaps["center_distance_bottom"].height - validSnaps["center_distance_top"].height > this.snapThreshold) {
        delete validSnaps["center_distance_top"];
        delete validSnaps["center_distance_bottom"];
      }
      if (validSnaps["center_distance_bottom"] == null || validSnaps["center_distance_top"] == null || validSnaps["center_distance_top"].height - validSnaps["center_distance_bottom"].height > this.snapThreshold) {
        delete validSnaps["center_distance_bottom"];
        delete validSnaps["center_distance_top"];
      }

      let renderSnaps = Object.keys(validSnaps);
      let currentSnaps = Object.keys(this.selection.currentSnapElements);
      for (let i = 0; i < renderSnaps.length; i++) {
        let snap = validSnaps[renderSnaps[i]];
        if (snap == null) {
          continue;
        }
        if (snap.axis == "x") {
          snapX = snap.threshold;
        } else if (snap.axis == "y") {
          snapY = snap.threshold;
        }
        if (render == false) {
          continue;
        }

        let offsetWidth = -1;
        let offsetHeight = -1;
        if (snap.marker == "x") {
          offsetWidth = 0;
        } else if (snap.marker == "y") {
          offsetHeight = 0;
        }
        
        let snapElement = this.selection.currentSnapElements[snap.type];
        if (snapElement == null) {
          content.insertAdjacentHTML("beforeend", `<div class="eSelectSnap" tooleditor new></div>`);
          snapElement = content.querySelector(".eSelectSnap[new]");
          snapElement.removeAttribute("new");
          this.selection.currentSnapElements[snap.type] = snapElement;

          if (snap.marker == "x") {
            snapElement.insertAdjacentHTML("beforeend", `<div marker="snapxleft"></div><div marker="snapxright"></div>`);
          } else if (snap.marker == "y") {
            snapElement.insertAdjacentHTML("beforeend", `<div marker="snapytop"></div><div marker="snapybottom"></div>`);
          }
        } else {
          currentSnaps.splice(currentSnaps.indexOf(snap.type), 1);
        }

        snapElement.style.width = Math.max(Math.round(snap.width * editor.zoom), 2) + "px";
        snapElement.style.height = Math.max(Math.round(snap.height * editor.zoom), 2) + "px";
        snapElement.style.left = Math.round(annotationRect.left + (snap.x * editor.zoom) + contentHolder.scrollLeft + offsetWidth) + "px";
        snapElement.style.top = Math.round(annotationRect.top + (snap.y * editor.zoom) + contentHolder.scrollTop + offsetHeight) + "px";
      }
      for (let i = 0; i < currentSnaps.length; i++) {
        let checkSnap = currentSnaps[i];
        this.selection.currentSnapElements[checkSnap].remove();
        delete this.selection.currentSnapElements[checkSnap];
      }

      return { snapX, snapY };
    }
    this.selection.snapItems = async (event, extra) => {
      // Loops through other visible annotations
      // Checks if sides / centers line up withen threshold
      // Also checks distance between items to check for patterns
      // Returns an offset X / Y to correct for line up
      
      if (["move", "resize"].includes(this.selection.action) == false) {
        this.selection.renderSnaps = [];
        return await this.selection.updateSnapLines(extra.render);
      }
      if (this.selection.action == "resize" && this.selection.rotation != 0) {
        this.selection.renderSnaps = [];
        return await this.selection.updateSnapLines(extra.render);
      }
      if (editor.options.snapping == false || event.ctrlKey == true) {
        this.selection.renderSnaps = [];
        return await this.selection.updateSnapLines(extra.render);
      }
      if (Object.keys(editor.selecting).length < 1) {
        this.selection.renderSnaps = [];
        return await this.selection.updateSnapLines(extra.render);
      }

      // Determine selection bounds:
      let selectTopLeftX = this.selection.minX;
      let selectTopLeftY = this.selection.minY;
      let selectBottomRightX = this.selection.maxX;
      let selectBottomRightY = this.selection.maxY;
      if (extra.scaleWidth < 0) {
        selectTopLeftX = this.selection.maxX;
        selectBottomRightX = this.selection.minX;
      }
      if (extra.scaleHeight < 0) {
        selectTopLeftY = this.selection.maxY;
        selectBottomRightY = this.selection.minY;
      }
      let annotationRect = editor.utils.localBoundingRect(annotations);
      let pageTopLeftX = -annotationRect.left / editor.zoom;
      let pageTopLeftY = -annotationRect.top / editor.zoom;
      let pageBottomRightX = (page.offsetWidth - annotationRect.left) / editor.zoom;
      let pageBottomRightY = (page.offsetHeight - annotationRect.top) / editor.zoom;
      
      let hasCommonParent = true;
      let commonParent;
      let selectedKeys = Object.keys(editor.selecting);
      for (let i = 0; i < selectedKeys.length; i++) {
        let annoid = selectedKeys[i];
        let original = editor.annotations[annoid] ?? {};
        if (original.render == null) {
          continue;
        }
        if (original.render.parent != commonParent && i > 0) {
          hasCommonParent = false;
          break;
        }
        commonParent = original.render.parent;
      }
      let validRenderSnaps = [];
      if (extra.recalculateExisting == true) {
        validRenderSnaps = getObject(this.selection.renderSnaps, "type");
      }
      this.selection.renderSnaps = [];
      let applySnap = (data, run) => {
        let threshold = Math.abs(data.threshold);
        if (extra.recalculateExisting != true) {
          if (threshold > this.selection.snapThreshold) {
            return;
          }
        } else if (validRenderSnaps[data.type] == null) {
          return;
        }
        if (extra.resizeHandleAxis != null) {
          if (extra.resizeHandleAxis == "x" && data.axis == "y") {
            return;
          } else if (extra.resizeHandleAxis == "y" && data.axis == "x") {
            return;
          }
        }
        if (extra.render != false || data.marker != null) {
          data = { ...data, ...run() };
          if (data.additional != null) {
            let result = data.additional();
            if (result == false) {
              return;
            } else {
              data.additionalLines = result;
            }
          }
        } else {
          data = { ...data, width: 0, height: 0, x: 0, y: 0 };
        }
        if (data.marker != null && data.width < 1 && data.height < 1) {
          return;
        }
        for (let i = 0; i < this.selection.renderSnaps.length; i++) {
          let check = this.selection.renderSnaps[i];
          if (check == null) {
            continue;
          }
          if (check.axis == data.axis) {
            let compare = Math.round(Math.abs(check.threshold) - threshold);
            if (compare > 0) {
              this.selection.renderSnaps.splice(i, 1);
              i--;
            } else if (compare < 0) {
              return;
            }
          }
          if (data.type == check.type && data.centerSize != null && check.centerSize != null) {
            if (data.centerSize > check.centerSize) {
              return;
            }
          }
        }
        this.selection.renderSnaps.push(data);
      }

      if (extra.recalculateExisting != true) {
        this.selection.checkDistanceXDirection = [];
        this.selection.checkDistanceYDirection = [];
      }
      
      let visibleAnnotations = editor.utils.annotationsInChunks(editor.visibleChunks);
      for (let i = 0; i < visibleAnnotations.length; i++) {
        let annotation = visibleAnnotations[i] ?? {};
        let render = annotation.render;
        if (render == null) {
          continue;
        }
        if (hasCommonParent == true && render.parent != commonParent && render._id != commonParent) {
          continue;
        }
        if (editor.selecting[render._id] != null) {
          continue;
        }
        let annoModule = (await editor.render.getModule(render.f)) ?? {};
        if (annoModule.CAN_BE_SNAPPED_TO == false) {
          continue;
        }
        let rect = editor.utils.getRect(render);
        if (rect.selectingParent == true) {
          continue;
        }
        let [topLeftX, topLeftY, bottomRightX, bottomRightY] = editor.math.rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);
        if (bottomRightX < pageTopLeftX || topLeftX > pageBottomRightX || bottomRightY < pageTopLeftY || topLeftY > pageBottomRightY) {
          continue;
        }
        let { centerX, centerY } = rect;

        if (this.selection.action == "move" || ["topright", "bottomright", "right"].includes(this.selection.handle) == false) {
          applySnap({ type: "left_left_side", axis: "x", threshold: topLeftX - selectTopLeftX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
            x: topLeftX,
            y: Math.min(selectTopLeftY, topLeftY)
          };});
        }
        if (this.selection.action == "move" || ["topleft", "bottomleft", "left"].includes(this.selection.handle) == false) {
          applySnap({ type: "left_right_side", axis: "x", threshold: topLeftX - selectBottomRightX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
            x: topLeftX,
            y: Math.min(selectTopLeftY, topLeftY)
          };});
        }
        if (this.selection.action == "resize" && ["topright", "bottomright", "right"].includes(this.selection.handle) == false) {
          applySnap({ type: "left_center_side", axis: "x", threshold: centerX - selectTopLeftX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
            x: centerX,
            y: Math.min(selectTopLeftY, topLeftY)
          };});
        }
        if (this.selection.action == "move" || ["bottomleft", "bottomright", "bottom"].includes(this.selection.handle) == false) {
          applySnap({ type: "top_top_side", axis: "y", threshold: topLeftY - selectTopLeftY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
            height: 0,
            x: Math.min(selectTopLeftX, topLeftX),
            y: topLeftY
          };});
        }
        if (this.selection.action == "move" || ["topleft", "topright", "top"].includes(this.selection.handle) == false) {
          applySnap({ type: "top_bottom_side", axis: "y", threshold: topLeftY - selectBottomRightY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
            height: 0,
            x: Math.min(selectTopLeftX, topLeftX),
            y: topLeftY
          };});
        }
        if (this.selection.action == "resize" && ["bottomleft", "bottomright", "bottom"].includes(this.selection.handle) == false) {
          applySnap({ type: "top_center_side", axis: "y", threshold: centerY - selectTopLeftY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
            height: 0,
            x: Math.min(selectTopLeftX, topLeftX),
            y: centerY
          };});
        }
        if (this.selection.action == "move" || ["topleft", "bottomleft", "left"].includes(this.selection.handle) == false) {
          applySnap({ type: "right_right_side", axis: "x", threshold: bottomRightX - selectBottomRightX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
            x: bottomRightX,
            y: Math.min(selectTopLeftY, topLeftY)
          };});
        }
        if (this.selection.action == "move" || ["topright", "bottomright", "right"].includes(this.selection.handle) == false) {
          applySnap({ type: "right_left_side", axis: "x", threshold: bottomRightX - selectTopLeftX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
            x: bottomRightX,
            y: Math.min(selectTopLeftY, topLeftY)
          };});
        }
        if (this.selection.action == "resize" && ["topleft", "bottomleft", "left"].includes(this.selection.handle) == false) {
          applySnap({ type: "right_center_side", axis: "x", threshold: centerX - selectBottomRightX }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
            x: centerX,
            y: Math.min(selectTopLeftY, topLeftY)
          };});
        }
        if (this.selection.action == "move" || ["topleft", "topright", "top"].includes(this.selection.handle) == false) {
          applySnap({ type: "bottom_bottom_side", axis: "y", threshold: bottomRightY - selectBottomRightY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
            height: 0,
            x: Math.min(selectTopLeftX, topLeftX),
            y: bottomRightY
          };});
        }
        if (this.selection.action == "move" || ["bottomleft", "bottomright", "bottom"].includes(this.selection.handle) == false) {
          applySnap({ type: "bottom_top_side", axis: "y", threshold: bottomRightY - selectTopLeftY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
            height: 0,
            x: Math.min(selectTopLeftX, topLeftX),
            y: bottomRightY
          };});
        }
        if (this.selection.action == "resize" && ["topleft", "topright", "top"].includes(this.selection.handle) == false) {
          applySnap({ type: "bottom_center_side", axis: "y", threshold: centerY - selectBottomRightY }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
            height: 0,
            x: Math.min(selectTopLeftX, topLeftX),
            y: centerY
          };});
        }

        if (this.selection.action == "move") {
          applySnap({ type: "center_vertical", axis: "x", threshold: centerX - (selectTopLeftX + ((selectBottomRightX - selectTopLeftX) / 2)) }, () => { return {
            width: 0,
            height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
            x: centerX,
            y: Math.min(selectTopLeftY, topLeftY)
          };});
          applySnap({ type: "center_horizontal", axis: "y", threshold: centerY - (selectTopLeftY + ((selectBottomRightY - selectTopLeftY) / 2)) }, () => { return {
            width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
            height: 0,
            x: Math.min(selectTopLeftX, topLeftX),
            y: centerY
          };});

          // Check for equal distance snap:
          if (hasCommonParent == true && extra.recalculateExisting != true) {
            if (topLeftX < selectTopLeftX || topLeftY < selectTopLeftY || bottomRightX > selectBottomRightX || bottomRightY > selectBottomRightY) {
              if (topLeftX < selectBottomRightX && bottomRightX > selectTopLeftX) {
                this.selection.checkDistanceYDirection.push({ _id: render._id, topLeftX, topLeftY, bottomRightX, bottomRightY, centerX, centerY });
              }
              if (topLeftY < selectBottomRightY && bottomRightY > selectTopLeftY) {
                this.selection.checkDistanceXDirection.push({ _id: render._id, topLeftX, topLeftY, bottomRightX, bottomRightY, centerX, centerY });
              }
            }
          }
        }
      }

      // Check for equal distance snap:
      if (extra.recalculateExisting != true) {
        this.selection.checkDistanceXDirection.sort((a, b) => a.centerX - b.centerX);
        this.selection.checkDistanceYDirection.sort((a, b) => a.centerY - b.centerY);
      }
      let xDistances = {};
      let xDistanceIds = {};
      let yDistances = {};
      let yDistanceIds = {};
      for (let i = 0; i < this.selection.checkDistanceXDirection.length; i++) {
        let el1 = this.selection.checkDistanceXDirection[i];
        for (let j = i + 1; j < this.selection.checkDistanceXDirection.length; j++) {
          let el2 = this.selection.checkDistanceXDirection[j];
          let distance = 0;
          if (el2.topLeftX > el1.bottomRightX) {
            distance = el2.topLeftX - el1.bottomRightX;
          } else if (el1.topLeftX > el2.bottomRightX) {
            distance = el1.topLeftX - el2.bottomRightX;
          } else if (el2.bottomRightX < el1.topLeftX) {
            distance = el1.topLeftX - el2.bottomRightX;
          } else if (el1.bottomRightX < el2.topLeftX) {
            distance = el2.topLeftX - el1.bottomRightX;
          }
          distance = Math.round(distance);
          if (distance > 0) {
            if (xDistances[distance] == null) {
              xDistances[distance] = [];
            }
            xDistances[distance].push([el1, el2]);
            if (xDistanceIds[distance] == null) {
              xDistanceIds[distance] = {};
            }
            xDistanceIds[distance][el1._id] = "";
            xDistanceIds[distance][el2._id] = "";
          }
        }
      }
      for (let i = 0; i < this.selection.checkDistanceYDirection.length; i++) {
        let el1 = this.selection.checkDistanceYDirection[i];
        for (let j = i + 1; j < this.selection.checkDistanceYDirection.length; j++) {
          let el2 = this.selection.checkDistanceYDirection[j];
          let distance = 0;
          if (el2.topLeftY > el1.bottomRightY) {
            distance = el2.topLeftY - el1.bottomRightY;
          } else if (el1.topLeftY > el2.bottomRightY) {
            distance = el1.topLeftY - el2.bottomRightY;
          } else if (el2.bottomRightY < el1.topLeftY) {
            distance = el1.topLeftY - el2.bottomRightY;
          } else if (el1.bottomRightY < el2.topLeftY) {
            distance = el2.topLeftY - el1.bottomRightY;
          }
          distance = Math.round(distance);
          if (distance > 0) {
            if (yDistances[distance] == null) {
              yDistances[distance] = [];
            }
            yDistances[distance].push([el1, el2]);
            if (yDistanceIds[distance] == null) {
              yDistanceIds[distance] = {};
            }
            yDistanceIds[distance][el1._id] = "";
            yDistanceIds[distance][el2._id] = "";
          }
        }
      }

      let checkOverlap = (pos1, length1, pos2, length2) => {
        if (pos1 < pos2 + length2 && pos2 < pos1 + length1) {
          return true;
        }
        return false;
      }
      let determinePositionAxis = (topLeftPosition, bottomRightPosition, centerPosition, selectPos1, selectPos2) => {
        if (Math.abs(bottomRightPosition - topLeftPosition) < selectPos2 - selectPos1) {
          let offset = 0;
          if (selectPos1 > topLeftPosition) {
            offset = (topLeftPosition - selectPos1) / 2;
          } else if (selectPos2 < bottomRightPosition) {
            offset = (bottomRightPosition - selectPos2) / 2;
          }
          return centerPosition - offset;
        } else {
          let offset = 0;
          if (selectPos1 < topLeftPosition) {
            offset = (selectPos1 - topLeftPosition) / 2;
          } else if (selectPos2 > bottomRightPosition) {
            offset = (selectPos2 - bottomRightPosition) / 2;
          }
          return selectPos1 + ((selectPos2 - selectPos1) / 2) - offset;
        }
      }

      let xDistanceKeys = Object.keys(xDistances);
      for (let i = 0; i < xDistanceKeys.length; i++) {
        let key = xDistanceKeys[i];
        let distance = parseFloat(key);
        let elements = xDistances[key];
        let elemIds = xDistanceIds[key];

        for (let s = 0; s < this.selection.checkDistanceXDirection.length; s++) {
          let elem = this.selection.checkDistanceXDirection[s];

          applySnap({ type: "right_left_distance", axis: "x", marker: "x", threshold: elem.topLeftX - selectBottomRightX - distance }, () => { return {
            width: elem.topLeftX - selectBottomRightX,
            height: 0,
            x: selectBottomRightX,
            y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY),
            additional: function () {
              let renderLines = [];
              for (let e = 0; e < elements.length; e++) {
                let [el1, el2] = elements[e];
                let lineSize = el2.topLeftX - el1.bottomRightX;
                if (checkOverlap(this.x, this.width, el1.bottomRightX, lineSize) == true) {
                  return false;
                }
                renderLines.push({
                  type: "right_left_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightX),
                  width: lineSize,
                  height: 0,
                  x: el1.bottomRightX,
                  y: determinePositionAxis(el2.topLeftY, el2.bottomRightY, el2.centerY, el1.topLeftY, el1.bottomRightY),
                  marker: "x"
                });
              }
              return renderLines;
            }
          };});
          applySnap({ type: "left_right_distance", axis: "x", marker: "x", threshold: distance - selectTopLeftX + elem.bottomRightX }, () => { return {
            width: selectTopLeftX - elem.bottomRightX,
            height: 0,
            x: elem.bottomRightX,
            y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY),
            additional: function () {
              let renderLines = [];
              for (let e = 0; e < elements.length; e++) {
                let [el1, el2] = elements[e];
                let lineSize = el2.topLeftX - el1.bottomRightX;
                if (checkOverlap(this.x, this.width, el1.bottomRightX, lineSize) == true) {
                  return false;
                }
                renderLines.push({
                  type: "left_right_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightX),
                  width: lineSize,
                  height: 0,
                  x: el1.bottomRightX,
                  y: determinePositionAxis(el2.topLeftY, el2.bottomRightY, el2.centerY, el1.topLeftY, el1.bottomRightY),
                  marker: "x"
                });
              }
              return renderLines;
            }
          };});

          if (elemIds[elem._id] != null) {
            let leftCenterSize = selectTopLeftX - elem.bottomRightX;
            applySnap({ type: "center_distance_left", center: true, axis: "x", marker: "x", centerSize: leftCenterSize, threshold: -((distance / 2) - selectTopLeftX - ((selectBottomRightX - selectTopLeftX) / 2) + elem.bottomRightX) }, () => { return {
              width: leftCenterSize,
              height: 0,
              x: elem.bottomRightX,
              y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY)
            };});
            let rightCenterSize = elem.topLeftX - selectBottomRightX;
            applySnap({ type: "center_distance_right", center: true, axis: "x", marker: "x", centerSize: rightCenterSize, threshold: -((distance / 2) + selectTopLeftX + ((selectBottomRightX - selectTopLeftX) / 2) - elem.topLeftX) }, () => { return {
              width: rightCenterSize,
              height: 0,
              x: selectBottomRightX,
              y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY)
            };});
          }
        }
      }

      let yDistanceKeys = Object.keys(yDistances);
      for (let i = 0; i < yDistanceKeys.length; i++) {
        let key = yDistanceKeys[i];
        let distance = parseFloat(key);
        let elements = yDistances[key];
        let elemIds = yDistanceIds[key];

        for (let s = 0; s < this.selection.checkDistanceYDirection.length; s++) {
          let elem = this.selection.checkDistanceYDirection[s];

          applySnap({ type: "bottom_top_distance", axis: "y", marker: "y", threshold: elem.topLeftY - selectBottomRightY - distance }, () => { return {
            width: 0,
            height: elem.topLeftY - selectBottomRightY,
            x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
            y: selectBottomRightY,
            additional: function () {
              let renderLines = [];
              for (let e = 0; e < elements.length; e++) {
                let [el1, el2] = elements[e];
                let lineSize = el2.topLeftY - el1.bottomRightY;
                if (checkOverlap(this.y, this.height, el1.bottomRightY, lineSize) == true) {
                  return false;
                }
                renderLines.push({
                  type: "bottom_top_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightY),
                  width: 0,
                  height: lineSize,
                  x: determinePositionAxis(el2.topLeftX, el2.bottomRightX, el2.centerX, el1.topLeftX, el1.bottomRightX),
                  y: el1.bottomRightY,
                  marker: "y"
                });
              }
              return renderLines;
            }
          };});
          applySnap({ type: "top_bottom_distance", axis: "y", marker: "y", threshold: distance - selectTopLeftY + elem.bottomRightY }, () => { return {
            width: 0,
            height: selectTopLeftY - elem.bottomRightY,
            x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
            y: elem.bottomRightY,
            additional: function () {
              let renderLines = [];
              for (let e = 0; e < elements.length; e++) {
                let [el1, el2] = elements[e];
                let lineSize = el2.topLeftY - el1.bottomRightY;
                if (checkOverlap(this.y, this.height, el1.bottomRightY, lineSize) == true) {
                  return false;
                }
                renderLines.push({
                  type: "top_bottom_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightY),
                  width: 0,
                  height: lineSize,
                  x: determinePositionAxis(el2.topLeftX, el2.bottomRightX, el2.centerX, el1.topLeftX, el1.bottomRightX),
                  y: el1.bottomRightY,
                  marker: "y"
                });
              }
              return renderLines;
            }
          };});

          if (elemIds[elem._id] != null) {
            let topCenterSize = selectTopLeftY - elem.bottomRightY;
            applySnap({ type: "center_distance_top", center: true, axis: "y", marker: "y", centerSize: topCenterSize, threshold: -((distance / 2) - selectTopLeftY - ((selectBottomRightY - selectTopLeftY) / 2) + elem.bottomRightY) }, () => { return {
              width: 0,
              height: topCenterSize,
              x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
              y: elem.bottomRightY
            };});
            let bottomCenterSize = elem.topLeftY - selectBottomRightY;
            applySnap({ type: "center_distance_bottom", center: true, axis: "y", marker: "y", centerSize: bottomCenterSize, threshold: -((distance / 2) + selectTopLeftY + ((selectBottomRightY - selectTopLeftY) / 2) - elem.topLeftY) }, () => { return {
              width: 0,
              height: bottomCenterSize,
              x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
              y: selectBottomRightY
            };});
          }
        }
      }

      return await this.selection.updateSnapLines(extra.render); // Render snap lines
    }
    this.selection.setScrollInterval = async () => {
      if (this.selection.scrollIntervalRunning == true) {
        return;
      }
      this.selection.scrollIntervalRunning = true;
      while (this.selection.action != null && (this.selection.scrollIntervalX != 0 || this.selection.scrollIntervalY != 0)) {
        contentHolder.scrollTo(contentHolder.scrollLeft + this.selection.scrollIntervalX, contentHolder.scrollTop + this.selection.scrollIntervalY);
        await this.selection.moveAction(this.selection.scrollLastEvent, null, null, true);
        await sleep(10);
      }
      this.selection.scrollIntervalRunning = false;
    }
    this.selection.moveAction = async (event, snapX, snapY, fromScroll) => {
      if (this.selection.action == null) {
        return;
      }
      if (mouseDown() == false) {
        return this.selection.endAction();
      }

      let mouseX = this.selection.lastMouseX;
      let mouseY = this.selection.lastMouseY;
      if (event != null) {
        ({ mouseX, mouseY } = editor.utils.localMousePosition(event));
        this.selection.lastMouseX = mouseX;
        this.selection.lastMouseY = mouseY;
        this.selection.scrollLastEvent = event;
      } else {
        event = this.selection.scrollLastEvent ?? {};
      }

      if (this.selection.actionEnabled == false) {
        if (Math.abs(mouseX - this.selection.enableStartX) > 3 || Math.abs(mouseY - this.selection.enableStartY) > 3) {
          this.selection.actionEnabled = true;
        } else {
          return;
        }
      }

      // Handle Scroll with Mouse:
      if (fromScroll != true && ["move", "resize"].includes(this.selection.action) == true) {
        this.selection.scrollIntervalX = 0;
        this.selection.scrollIntervalY = 0;
        let leftPos = this.selection.scrollOffset - mouseX;
        if (leftPos > 0) {
          let percentage = 1 + ((leftPos - this.selection.scrollOffset) / this.selection.scrollOffset);
          this.selection.scrollIntervalX = -Math.min(10 * percentage, 10);
        }
        let rightPos = mouseX - page.offsetWidth + this.selection.scrollOffset;
        if (rightPos > 0) {
          let percentage = 1 + ((rightPos - this.selection.scrollOffset) / this.selection.scrollOffset);
          this.selection.scrollIntervalX = Math.min(10 * percentage, 10);
        }
        let topPos = this.selection.scrollOffset - mouseY;
        if (topPos > 0) {
          let percentage = 1 + ((topPos - this.selection.scrollOffset) / this.selection.scrollOffset);
          this.selection.scrollIntervalY = -Math.min(10 * percentage, 10);
        }
        let bottomPos = mouseY - page.offsetHeight + this.selection.scrollOffset;
        if (bottomPos > 0) {
          let percentage = 1 + ((bottomPos - this.selection.scrollOffset) / this.selection.scrollOffset);
          this.selection.scrollIntervalY = Math.min(10 * percentage, 10);
        }
        if (this.selection.scrollIntervalX != 0 || this.selection.scrollIntervalY != 0) {
          return this.selection.setScrollInterval();
        }
      }
      
      let position = editor.utils.scaleToDoc(mouseX, mouseY);
      let offsetSnapX = snapX ?? 0;
      let offsetSnapY = snapY ?? 0;

      let keys = Object.keys(editor.selecting);

      let changePositionX = 0;
      let changePositionY = 0;

      let scaleWidth = 1;
      let scaleHeight = 1;
      let snapHandleAxis;
      let changeXCoord = 0;
      let changeYCoord = 0;
      let sizeLimitX = false;
      let sizeLimitY = false;
      let fixAnnotationHolder = this.selection.handle;
      let preserveAspect = this.selection.resizePreserveAspect || event.shiftKey || false;

      let rotateChange = 0;
      
      if (this.selection.action == "move") {
        changePositionX = position.x - this.selection.rootX;
        changePositionY = position.y - this.selection.rootY;
      } else if (this.selection.action == "resize") {
        // Calculate the change in width / height:
        let originalMidpointX = this.selection.originalSize[0] / 2;
        let originalMidpointY = this.selection.originalSize[1] / 2;
        let halfRotateWidth = this.selection.originalPosition[0] + originalMidpointX;
        let halfRotateHeight = this.selection.originalPosition[1] + originalMidpointY;
        let [xCoord, yCoord] = editor.math.rotatePoint(position.x - halfRotateWidth, position.y - halfRotateHeight, -this.selection.rotation);
        let changeX = xCoord - this.selection.rootX + offsetSnapX;
        let changeY = yCoord - this.selection.rootY + offsetSnapY;
        if (this.selection.rootX < 0) {
          changeX *= -1;
        }
        if (this.selection.rootY < 0) {
          changeY *= -1;
        }
        if (keys.length > 1) {
          if (this.selection.originalSize[0] + changeX < 25) {
            changeX = -this.selection.originalSize[0] + 25;
          }
          if (this.selection.originalSize[1] + changeY < 25) {
            changeY = -this.selection.originalSize[1] + 25;
          }
        }

        // Handle resize based on handles:
        let oppositePositionX = 0;
        let oppositePositionY = 0;
        let newSize = [0, 0];
        let newOppositePositionX = 0;
        let newOppositePositionY = 0;
        switch (this.selection.handle) {
          case "bottomright":
            if (preserveAspect == true || this.selection.multiSelectPreserveAspect == true) {
              let setXFromChangeX = this.selection.originalSize[0] + changeX;
              let setYFromChangeX = this.selection.originalSize[1] * ((this.selection.originalSize[0] + changeX) / this.selection.originalSize[0]);
              let setXFromChangeY = this.selection.originalSize[0] * ((this.selection.originalSize[1] + changeY) / this.selection.originalSize[1]);
              let setYFromChangeY = this.selection.originalSize[1] + changeY;
              if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
                scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
                snapHandleAxis = "x";
              } else {
                scaleWidth = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
                snapHandleAxis = "y";
              }
              scaleHeight = scaleWidth;
            } else {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
              scaleHeight = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0];
            oppositePositionY = this.selection.originalPosition[1];
            newOppositePositionX = this.selection.originalPosition[0];
            newOppositePositionY = this.selection.originalPosition[1];
            break;
          case "topleft":
            if (preserveAspect == true || this.selection.multiSelectPreserveAspect == true) {
              let setXFromChangeX = this.selection.originalSize[0] + changeX;
              let setYFromChangeX = this.selection.originalSize[1] * ((this.selection.originalSize[0] + changeX) / this.selection.originalSize[0]);
              let setXFromChangeY = this.selection.originalSize[0] * ((this.selection.originalSize[1] + changeY) / this.selection.originalSize[1]);
              let setYFromChangeY = this.selection.originalSize[1] + changeY;
              if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
                scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
                snapHandleAxis = "x";
              } else {
                scaleWidth = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
                snapHandleAxis = "y";
              }
              scaleHeight = scaleWidth;
            } else {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
              scaleHeight = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0] + this.selection.originalSize[0];
            oppositePositionY = this.selection.originalPosition[1] + this.selection.originalSize[1];
            newOppositePositionX = this.selection.originalPosition[0] + newSize[0];
            newOppositePositionY = this.selection.originalPosition[1] + newSize[1];
            break;
          case "topright":
            if (preserveAspect == true || this.selection.multiSelectPreserveAspect == true) {
              let setXFromChangeX = this.selection.originalSize[0] + changeX;
              let setYFromChangeX = this.selection.originalSize[1] * ((this.selection.originalSize[0] + changeX) / this.selection.originalSize[0]);
              let setXFromChangeY = this.selection.originalSize[0] * ((this.selection.originalSize[1] + changeY) / this.selection.originalSize[1]);
              let setYFromChangeY = this.selection.originalSize[1] + changeY;
              if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
                scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
                snapHandleAxis = "x";
              } else {
                scaleWidth = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
                snapHandleAxis = "y";
              }
              scaleHeight = scaleWidth;
            } else {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
              scaleHeight = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0];
            oppositePositionY = this.selection.originalPosition[1] + this.selection.originalSize[1];
            newOppositePositionX = this.selection.originalPosition[0];
            newOppositePositionY = this.selection.originalPosition[1] + newSize[1];
            break;
          case "bottomleft":
            if (preserveAspect == true || this.selection.multiSelectPreserveAspect == true) {
              let setXFromChangeX = this.selection.originalSize[0] + changeX;
              let setYFromChangeX = this.selection.originalSize[1] * ((this.selection.originalSize[0] + changeX) / this.selection.originalSize[0]);
              let setXFromChangeY = this.selection.originalSize[0] * ((this.selection.originalSize[1] + changeY) / this.selection.originalSize[1]);
              let setYFromChangeY = this.selection.originalSize[1] + changeY;
              if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
                scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
                snapHandleAxis = "x";
              } else {
                scaleWidth = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
                snapHandleAxis = "y";
              }
              scaleHeight = scaleWidth;
            } else {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
              scaleHeight = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0] + this.selection.originalSize[0];
            oppositePositionY = this.selection.originalPosition[1];
            newOppositePositionX = this.selection.originalPosition[0] + newSize[0];
            newOppositePositionY = this.selection.originalPosition[1];
            break;
          case "right":
            if (preserveAspect == true) {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
              scaleHeight = scaleWidth;
            } else {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0];
            oppositePositionY = this.selection.originalPosition[1] + (this.selection.originalSize[1] / 2);
            newOppositePositionX = this.selection.originalPosition[0];
            newOppositePositionY = this.selection.originalPosition[1] + (newSize[1] / 2);
            fixAnnotationHolder = "bottomright";
            snapHandleAxis = "x";
            break;
          case "bottom":
            if (preserveAspect == true) {
              scaleWidth = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
              scaleHeight = scaleWidth;
            } else {
              scaleHeight = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0] + (this.selection.originalSize[0] / 2);
            oppositePositionY = this.selection.originalPosition[1];
            newOppositePositionX = this.selection.originalPosition[0] + (newSize[0] / 2);
            newOppositePositionY = this.selection.originalPosition[1];
            fixAnnotationHolder = "bottomright";
            snapHandleAxis = "y";
            break;
          case "left":
            if (preserveAspect == true) {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
              scaleHeight = scaleWidth;
            } else {
              scaleWidth = (this.selection.originalSize[0] + changeX) / this.selection.originalSize[0];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0] + this.selection.originalSize[0];
            oppositePositionY = this.selection.originalPosition[1] + (this.selection.originalSize[1] / 2);
            newOppositePositionX = this.selection.originalPosition[0] + newSize[0];
            newOppositePositionY = this.selection.originalPosition[1] + (newSize[1] / 2);
            fixAnnotationHolder = "topleft";
            snapHandleAxis = "x";
            break;
          case "top":
            if (preserveAspect == true) {
              scaleWidth = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
              scaleHeight = scaleWidth;
            } else {
              scaleHeight = (this.selection.originalSize[1] + changeY) / this.selection.originalSize[1];
            }
            newSize = [this.selection.originalSize[0] * scaleWidth, this.selection.originalSize[1] * scaleHeight];
            oppositePositionX = this.selection.originalPosition[0] + (this.selection.originalSize[0] / 2);
            oppositePositionY = this.selection.originalPosition[1] + this.selection.originalSize[1];
            newOppositePositionX = this.selection.originalPosition[0] + (newSize[0] / 2);
            newOppositePositionY = this.selection.originalPosition[1] + newSize[1];
            fixAnnotationHolder = "topleft";
            snapHandleAxis = "y";
        }

        let newSelectionMidpointX = newSize[0] / 2;
        let newSelectionMidpointY = newSize[1] / 2;
        
        let midpointChangeX = newSelectionMidpointX - originalMidpointX;
        let midpointChangeY = newSelectionMidpointY - originalMidpointY;

        // Calculate relative position:
        let [originalXCoord, originalYCoord] = editor.math.rotatePointOrigin(oppositePositionX, oppositePositionY, halfRotateWidth, halfRotateHeight, this.selection.rotation);

        let newHalfRotateWidth = this.selection.originalPosition[0] + newSelectionMidpointX;
        let newHalfRotateHeight = this.selection.originalPosition[1] + newSelectionMidpointY;
        let [newXCoord, newYCoord] = editor.math.rotatePointOrigin(newOppositePositionX, newOppositePositionY, newHalfRotateWidth, newHalfRotateHeight, this.selection.rotation);

        // Calculate change in opposite handle position:
        changeXCoord = newXCoord - originalXCoord - midpointChangeX;
        changeYCoord = newYCoord - originalYCoord - midpointChangeY;
        
        sizeLimitX = oppositePositionX != newOppositePositionX;
        sizeLimitY = oppositePositionY != newOppositePositionY;

        let cursorRotate = this.selection.resizeCursorRotation;
        if (cursorRotate % 90 == 0) {
          if (scaleWidth < 0) {
            cursorRotate -= 90;
          }
          if (scaleHeight < 0) {
            cursorRotate += 90;
          }
        }
        this.updateMouse({ type: "svg", url: "./images/editor/cursors/resize.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation + cursorRotate });
      } else if (this.selection.action == "rotate") {
        let centerX = this.selection.originalSize[0] / 2;
        let centerY = this.selection.originalSize[1] / 2;
        let yRoot = -(position.y - (this.selection.originalPosition[1] + centerY));
        let xRoot = position.x - (this.selection.originalPosition[0] + centerX);

        let newRotation = (Math.atan2(yRoot, xRoot) * 180) / Math.PI;
        if (newRotation < 0) {
          newRotation = 360 + newRotation;
        }
        let snapDegree = 15;
        if (event.shiftKey == true) {
          snapDegree = 1;
        }
        let setRotation = Math.round((this.selection.originalRotate + (this.selection.originalRotation - newRotation)) / snapDegree) * snapDegree;
        rotateChange = (Math.round(setRotation / snapDegree) * snapDegree) - this.selection.originalRotate;

        this.updateMouse({ type: "svg", url: "./images/editor/cursors/rotate.svg", translate: { x: 22, y: 22 }, rotate: this.selection.originalRotate + rotateChange });
      }

      for (let i = 0; i < keys.length; i++) {
        let annoid = keys[i];
        let original = editor.annotations[annoid] ?? {};
        if (original.render == null) {
          continue;
        }
        if (editor.utils.isLocked(original.render) == true) {
          return this.selection.endAction();
        }
        if (original.revert == null) {
          original.revert = copyObject(original.render);
        }
        if (editor.self.access < 1 || editor.utils.canMemberModify(original.render) == false) {
          delete editor.selecting[annoid];
          continue;
        }
        let select = editor.selecting[annoid];
        delete select.done;

        let annoModule = (await editor.render.getModule(select.f ?? original.render.f)) ?? {};

        let rect = this.selection.annotationRects[annoid];
        if (rect == null) {
          rect = editor.utils.getRect(original.render);
          rect.size = [original.render.s[0], original.render.s[1]];
          this.selection.annotationRects[annoid] = rect;
        }

        if (this.selection.action == "move") {
          select.p = [
            editor.math.round(rect.annoX + changePositionX + offsetSnapX),
            editor.math.round(rect.annoY + changePositionY + offsetSnapY)
          ];
        } else if (this.selection.action == "resize") {
          if (rect.size[0] == 0 || rect.size[1] == 0) {
            continue;
          }

          let rotate = rect.rotation;
          if (rotate > 180) {
            rotate = -(360 - rotate);
          }
          if (scaleWidth == scaleHeight && this.selection.rotation == 0) {
            rotate = 0;
          }
          let rotateDifference = rotate - this.selection.rotation;
          let radian = rotateDifference * (Math.PI / 180);

          // FIRST: Figure out the bounding box size of element:
          let boundingWidth = Math.abs(rect.width * Math.cos(radian)) + Math.abs(rect.height * Math.sin(radian));
          let boundingHeight = Math.abs(rect.height * Math.cos(radian)) + Math.abs(rect.width * Math.sin(radian));

          // SECOND: Apply the scaling to the bouding box:
          let setBoundWidth = boundingWidth * scaleWidth;
          let setBoundHeight = boundingHeight * scaleHeight;

          // THIRD: Determine actual element width by converting bounding box size back to element size:
          let setWidth = 0;
          let setHeight = 0;
          let maintainSizeWidth = false;
          let maintainSizeHeight = false;

          let absRotate = Math.abs(rotateDifference);
          if (absRotate > 45 && absRotate < 135) {
            let cosAbs = Math.abs(Math.cos((rotateDifference + 90) * (Math.PI / 180)));
            let cosCorrectWidth = (boundingHeight / cosAbs) - rect.width;
            let cosCorrectHeight = (boundingWidth / cosAbs) - rect.height;
            if (rotateDifference != 0) {
              if (setBoundWidth < 0) {
                cosCorrectWidth *= -1;
              }
              if (setBoundHeight < 0) {
                cosCorrectHeight *= -1;
              }
            }
            setWidth = (setBoundHeight / cosAbs) - cosCorrectWidth - rect.thickness;
            setHeight = (setBoundWidth / cosAbs) - cosCorrectHeight - rect.thickness;
          } else {
            let cosAbs = Math.abs(Math.cos(radian));
            let cosCorrectWidth = (boundingWidth / cosAbs) - rect.width;
            let cosCorrectHeight = (boundingHeight / cosAbs) - rect.height;
            if (rotateDifference != 0) {
              if (setBoundWidth < 0) {
                cosCorrectWidth *= -1;
              }
              if (setBoundHeight < 0) {
                cosCorrectHeight *= -1;
              }
            }
            setWidth = (setBoundWidth / cosAbs) - cosCorrectWidth - rect.thickness;
            setHeight = (setBoundHeight / cosAbs) - cosCorrectHeight - rect.thickness;
          }

          if (keys.length > 1) {
            if (setWidth < 25) {
              setWidth = 25;
            }
            if (setHeight < 25) {
              setHeight = 25;
            }
          }

          // Preserve original sign:
          let signOriginalWidth = rect.width;
          let signOriginalHeight = rect.height;
          let absWidth = Math.abs(setWidth);
          let absHeight = Math.abs(setHeight);
          if (annoModule.CAN_FLIP != false) {
            if (rect.size[0] < 0) {
              setWidth *= -1;
              signOriginalWidth *= -1;
            }
            if (rect.size[1] < 0) {
              setHeight *= -1;
              signOriginalHeight *= -1;
            }
          } else {
            setWidth = Math.max(absWidth, 1);
            setHeight = Math.max(absHeight, 1);
          }
          let originalSetWidth = setWidth;
          let originalSetHeight = setHeight;

          let minWidth = annoModule.MIN_WIDTH ?? rect.thickness;
          if (absWidth < minWidth) {
            if (setWidth > 0) {
              setWidth = minWidth;
            } else {
              setWidth = -minWidth;
            }
            if (absWidth < annoModule.MIN_WIDTH) {
              maintainSizeWidth = true;
            }
          }
          let minHeight = annoModule.MIN_HEIGHT ?? rect.thickness;
          if (absHeight < minHeight) {
            if (setHeight > 0) {
              setHeight = minHeight;
            } else {
              setHeight = -minHeight;
            }
            if (absHeight < annoModule.MIN_HEIGHT) {
              maintainSizeHeight = true;
            }
          }

          let signNewWidth = Math.abs(setWidth) + rect.thickness;
          let signNewHeight = Math.abs(setHeight) + rect.thickness;
          if (setWidth < 0) {
            signNewWidth *= -1;
          }
          if (setHeight < 0) {
            signNewHeight *= -1;
          }

          // FINALLY: Apply the new size:
          select.s = [editor.math.round(setWidth), editor.math.round(setHeight)];

          // Special function cases:
          if (annoModule.AUTO_TEXT_FIT == true || annoModule.AUTO_SET_HEIGHT == true) {
            await editor.render.create({ ...original, render: { ...original.render, ...select }, animate: false });
            let renderedText = original.element.querySelector("div[edit]");
            if (renderedText != null) {
              if (annoModule.AUTO_TEXT_FIT == true && original.render.textfit == true && select.textfit != false) {
                select.s[0] = renderedText.offsetWidth + 6;
                select.textfit = false;
              }
              if (annoModule.AUTO_SET_HEIGHT == true ) {
                select.s[1] = renderedText.offsetHeight + 6; //Math.max(select.s[1], renderedAnno.offsetHeight + 6);
              }
            }
          }
          
          // Get original midpoint of element:
          let originalAnnoMidpointX = signOriginalWidth / 2;
          let originalAnnoMidpointY = signOriginalHeight / 2;

          // Get offset from center of select box:
          let offsetX = rect.annoX + originalAnnoMidpointX - this.selection.originalPosition[0] - (this.selection.originalSize[0] / 2);
          let offsetY = rect.annoY + originalAnnoMidpointY - this.selection.originalPosition[1] - (this.selection.originalSize[1] / 2);

          // Calculate center of original selection box:
          let selectionCenterX = this.selection.originalPosition[0] + (this.selection.originalSize[0] / 2);
          let selectionCenterY = this.selection.originalPosition[1] + (this.selection.originalSize[1] / 2);

          // Get midpoint of element:
          let newAnnoMidpointX = signNewWidth / 2;
          let newAnnoMidpointY = signNewHeight / 2;

          let changeX = changeXCoord;
          let changeY = changeYCoord;
          if (maintainSizeWidth == true || maintainSizeHeight == true) {
            let updateXCoord = 0;
            if (maintainSizeWidth == true) {
              updateXCoord = (minWidth - originalSetWidth) / 2;
            }
            let updateYCoord = 0;
            if (maintainSizeHeight == true) {
              updateYCoord = (minHeight - originalSetHeight) / 2;
            }
            let [rotateUpdateXCoord, rotateUpdateYCoord] = editor.math.rotatePoint(updateXCoord, updateYCoord, rect.rotation);
            if (sizeLimitX == true) {
              changeX += rotateUpdateXCoord;
            } else {
              changeX -= rotateUpdateXCoord;
            }
            if (sizeLimitY == true) {
              changeY += rotateUpdateYCoord;
            } else {
              changeY -= rotateUpdateYCoord;
            }
          }

          // Apply the selection box position change:
          select.p = [
            selectionCenterX + (offsetX * scaleWidth) - newAnnoMidpointX - changeX,
            selectionCenterY + (offsetY * scaleHeight) - newAnnoMidpointY - changeY
          ];
          
          let resizeAnnoX;
          let resizeAnnoY;
          switch (fixAnnotationHolder) {
            case "bottomright":
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.annoX, rect.annoY, rect.centerX, rect.centerY, rect.rotation);
              break;
            case "topleft":
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.annoX + rect.width, rect.annoY + rect.height, rect.centerX, rect.centerY, rect.rotation);
              break;
            case "topright":
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.annoX, rect.annoY + rect.height, rect.centerX, rect.centerY, rect.rotation);
              break;
            case "bottomleft":
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.annoX + rect.width, rect.annoY, rect.centerX, rect.centerY, rect.rotation);
          }
          select.resizing = [fixAnnotationHolder, resizeAnnoX, resizeAnnoY];
        } else if (this.selection.action == "rotate") {
          if (annoModule.CAN_ROTATE != false) {
            let changeRotate = rect.rotation + rotateChange;
            if (changeRotate < 0) {
              changeRotate = 360 + changeRotate;
            }
            if (changeRotate >= 360) {
              changeRotate = changeRotate - 360;
            }
            select.r = changeRotate;
          }

          // Calculate radian:
          let radian = rotateChange * (Math.PI / 180);

          // Get original midpoint of element:
          let originalAnnoMidpointX = rect.width / 2;
          let originalAnnoMidpointY = rect.height / 2;
          if (rect.size[0] < 0) {
            originalAnnoMidpointX *= -1;
          }
          if (rect.size[1] < 0) {
            originalAnnoMidpointY *= -1;
          }

          // Get center position of element:
          let originalAnnoCenterX = rect.annoX + originalAnnoMidpointX;
          let originalAnnoCenterY = rect.annoY + originalAnnoMidpointY;

          // Calculate center of original selection box:
          let selectionCenterX = this.selection.originalPosition[0] + (this.selection.originalSize[0] / 2);
          let selectionCenterY = this.selection.originalPosition[1] + (this.selection.originalSize[1] / 2);

          // Determine new rotated center position:
          let rotatedCenterX = selectionCenterX + ((originalAnnoCenterX - selectionCenterX) * Math.cos(radian)) - ((originalAnnoCenterY - selectionCenterY) * Math.sin(radian));
          let rotatedCenterY = selectionCenterY + ((originalAnnoCenterX - selectionCenterX) * Math.sin(radian)) + ((originalAnnoCenterY - selectionCenterY) * Math.cos(radian));

          select.p = [
            rotatedCenterX - originalAnnoMidpointX,
            rotatedCenterY - originalAnnoMidpointY
          ];
        }

        let { x: newX, y: newY, rotation: newRotation } = editor.utils.getRelativePosition({
          ...original.render,
          ...select,
          p: select.p ?? [rect.annoX, rect.annoY],
          r: select.r ?? rect.rotation
        });
        if (select.p != null) {
          select.p = [newX, newY];
        }
        if (select.r != null) {
          select.r = newRotation;
        }

        original.element = (await editor.render.create({ ...original, render: { ...original.render, ...select }, animate: false })).element;
      }

      await this.selection.updateBox();

      if (snapX == null && snapY == null) {
        let { snapX, snapY } = await this.selection.snapItems(event, { resizeHandleAxis: snapHandleAxis, scaleWidth: scaleWidth, scaleHeight: scaleHeight, render: false });
        if (snapX != 0 || snapY != 0) {
          await this.selection.moveAction(event, snapX, snapY, fromScroll);
        }
        await this.selection.snapItems(event, { resizeHandleAxis: snapHandleAxis, scaleWidth: scaleWidth, scaleHeight: scaleHeight, recalculateExisting: true });
      }
    }
    this.selection.endAction = async (options = {}) => {
      if (this.selection.action == null) {
        return;
      }
      this.selection.action = null;

      this.selection.renderSnaps = [];
      this.selection.updateSnapLines();

      let saveUpdates = [];
      let annoIDs = {};
      let pushChanges = [];
      let pushAdds = [];
      let pushRemoves = [];
      let deleteKeys = {};

      let keys = Object.keys(editor.selecting);
      let saveAnnotations = [];
      for (let i = 0; i < keys.length; i++) {
        let annoid = keys[i];
        let original = editor.annotations[annoid] ?? {};
        let selecting = editor.selecting[annoid] ?? {};
        saveAnnotations.push([annoid, original, selecting, { ...(original.render ?? {}), ...selecting }.l ?? 0]);
      }

      saveAnnotations.sort((a, b) => { return a[3] - b[3]; });

      for (let i = 0; i < saveAnnotations.length; i++) {
        let [annoid, original, selecting] = saveAnnotations[i];
        let changeKeys = Object.keys(selecting);
        if (changeKeys.length < 1) {
          continue;
        }
        let originalRender = original.render ?? {};

        delete selecting.done;

        let pushFields = { p: originalRender.p, r: originalRender.r };
        for (let f = 0; f < changeKeys.length; f++) {
          let key = changeKeys[f];
          pushFields[key] = originalRender[key] ?? null;
        }
        if (options.fromHistory != true) {
          if (selecting.remove != true) {
            if (Object.keys(pushFields).length > 0) {
              if (pushFields.hasOwnProperty("f") == false) {
                pushChanges.push(copyObject({
                  ...pushFields,
                  parent: pushFields.parent ?? originalRender.parent ?? null,
                  p: pushFields.p,
                  r: pushFields.r,
                  _id: annoid
                }));
              } else {
                pushAdds.push({ _id: annoid, remove: true });
              }
            }
          } else {
            pushRemoves.push(copyObject(originalRender));
          }
        }

        saveUpdates.push(copyObject({ ...selecting, _id: annoid }));
        selecting.done = true;
        annoIDs[annoid] = true;

        if (selecting.remove == true) {
          deleteKeys[annoid] = "";
        }
      }

      let realtimeSelectSet = copyObject(editor.selecting);

      this.selection.saving = true;
      let savedAnnoIDs = {};
      while (saveUpdates.length > 0) {
        for (let i = 0; i < saveUpdates.length; i++) {
          let newSave = saveUpdates[i];
          if (newSave.parent == null || annoIDs[newSave.parent] == null || savedAnnoIDs[newSave.parent] != null) {
            editor.selecting[newSave._id] = {};
            await editor.save.push(newSave, { history: { fromHistory: options.fromHistory, update: pushChanges, add: pushRemoves }, ignoreSelect: true });
            savedAnnoIDs[newSave._id] = true;
            saveUpdates.splice(i, 1);
            i--;
          }
        }
      }
      this.selection.saving = false;

      if (options.fromHistory != true) {
        if (pushChanges.length > 0) {
          await editor.history.push("update", pushChanges);
        }
        if (pushAdds.length > 0) {
          await editor.history.push("remove", pushAdds);
        }
        if (pushRemoves.length > 0) {
          await editor.history.push("add", pushRemoves);
        }
      }

      editor.realtimeSelect = { ...realtimeSelectSet, ...editor.realtimeSelect };
      await editor.realtime.forceShort();
      editor.realtimeSelect = {};
      editor.selecting = {};

      let resetKeys = options.sentKeys ?? keys;
      for (let i = 0; i < resetKeys.length; i++) {
        let key = resetKeys[i];
        if (deleteKeys[key] == null) {
          editor.selecting[key] = {};
        }
      }

      this.updateMouse(this.currentToolModule.MOUSE);
      this.selection.usingCustomMouse = false;

      await this.selection.updateBox({ redrawAction: options.redrawAction, transition: false });
    }
    this.selection.interactRun = async (target) => {
      if (target == null) {
        return;
      }

      // REACTIONS:
      let reaction = target.closest(".eReaction");
      if (reaction != null) {
        if (reaction.hasAttribute("emoji") == false) {
          dropdownModule.open(reaction, "dropdowns/lesson/editor/tools/emojis", { parent: editor });
          return true;
        }
        reaction.setAttribute("disabled", "");
        let body = {
          emoji: reaction.getAttribute("emoji"),
          annotation: reaction.closest(".eAnnotation").getAttribute("anno")
        };
        if (reaction.hasAttribute("selected") == false) {
          await sendRequest("PUT", "lessons/members/reaction", body, { session: editor.session });
        } else {
          await sendRequest("PUT", "lessons/members/reaction/remove", body, { session: editor.session });
        }
        reaction.removeAttribute("disabled");
        return true;
      }

      // EMBEDS:
      let embedButton = target.closest("div[activate] button");
      let embedAnno = target.closest(".eAnnotation");
      let runEmbed = false;
      if (embedButton != null && embedAnno != null) {
        if (embedButton.closest(".eAnnotation[embed]") == embedAnno) {
          runEmbed = true;
        }
      }
      if (runEmbed == true) {
        let render = (editor.annotations[embedAnno.getAttribute("anno")] ?? {}).render ?? {};
        if (render.embed != null) {
          if (render.embed.url == null) {
            window.open(render.d);
            return;
          }
          let embedHolder = embedAnno.querySelector("div[content]");
          embedHolder.insertAdjacentHTML("beforeend", `<iframe allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`);
          let embedFrame = embedHolder.querySelector("iframe");
          embedFrame.setAttribute("currenturl", render.embed.url);
          if (render.embed.color != null) {
            embedFrame.style.background = cleanString(render.embed.color);
          }
          let frameWidth = render.s[0] - 16;
          let defaultMaxWidth = 800;
          if (frameWidth < 300) {
            defaultMaxWidth = 300;
          }
          let embedWidth = Math.max(frameWidth, defaultMaxWidth);
          let scale = frameWidth / embedWidth;
          embedFrame.style.width = embedWidth + "px";
          embedFrame.style.height = ((render.s[1] - 24 - embedAnno.querySelector("div[details]").offsetHeight) * (1 / scale)) + "px";
          embedFrame.style.transform = "scale(" + scale + ")";
          embedFrame.src = render.embed.url;
          embedHolder.querySelector("img[thumbnail]").style.display = "none";
          embedHolder.querySelector("div[activate]").style.display = "none";
        }
        return true;
      }

      // PAGE REVEAL:
      let pageReveal = target.closest(".eAnnotation[page] div[hide] button");
      if (pageReveal != null) {
        let pageAnno = pageReveal.closest(".eAnnotation[page]");
        if (pageAnno == null) {
          return;
        }
        let render = (editor.annotations[pageAnno.getAttribute("anno")] ?? {}).render;
        if (render == null || editor.utils.canMemberModify(render) == false) {
          return;
        }
        let keys = Object.keys(editor.selecting);
        editor.selecting = {};
        editor.selecting[render._id] = { hidden: false };
        this.selection.action = "save";
        await this.selection.endAction({ sentKeys: keys });
        return true;
      }
    }
    this.selection.pointInSelectBox = (x, y) => {
      if (this.selection.selectBox == null) {
        return;
      }
      if (this.selection.rotation == 0) {
        return editor.math.pointInRotatedBounds(x, y, this.selection.minX, this.selection.minY, this.selection.maxX, this.selection.maxY, this.selection.rotation, 10 / editor.zoom);
      } else {
        return editor.math.pointInRotatedBounds(x, y, this.selection.lastRect.x, this.selection.lastRect.y, this.selection.lastRect.endX, this.selection.lastRect.endY, this.selection.lastRect.rotation, 10 / editor.zoom);
      }
    }
    this.selection.undo = async () => {
      let event = editor.history.history[editor.history.location];
      if (event == null) {
        return;
      }
      editor.history.location--;

      let addRedo = event.redo.length < 1;
      let keys = Object.keys(editor.selecting);
      let annoContentTx;
      switch (event.type) {
        case "update":
          for (let i = 0; i < event.changes.length; i++) {
            let change = event.changes[i];
            if (change.parent != null) {
              if (((editor.annotations[change.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Parent annotation is missing, invalid save
              }
            }
            let annotation = editor.annotations[change._id] ?? {};
            if (addRedo == true) {
              let changeKeys = Object.keys(change);
              let render = annotation.render ?? {};
              let redoAnno = { _id: change._id };
              for (let u = 0; u < changeKeys.length; u++) {
                redoAnno[changeKeys[u]] = render[changeKeys[u]];
              }
              event.redo.push(copyObject(redoAnno));
            }
            if (annotation.element != null) {
              annoContentTx = annotation.element.querySelector("div[contenteditable]");
              if (annoContentTx != null) {
                annoContentTx.removeAttribute("contenteditable");
              }
            }
            editor.selecting[change._id] = change;
          }
          break;
        case "remove":
          for (let i = 0; i < event.changes.length; i++) {
            let changeID = event.changes[i]._id;
            let annotation = (editor.annotations[changeID] ?? {}).render ?? {};
            if (addRedo == true) {
              let { annoX, annoY, rotation } = editor.utils.getRect(annotation);
              event.redo.push(copyObject({ ...annotation, parent: null, p: [annoX, annoY], r: rotation }));
            }
            editor.selecting[changeID] = { _id: changeID, remove: true };
          }
          break;
        case "add":
          for (let i = 0; i < event.changes.length; i++) {
            let saveAnno = event.changes[i];
            if (saveAnno.parent != null) {
              if (((editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Parent annotation is missing, invalid save
              }
            }
            let oldID = saveAnno._id;
            let tempID = editor.render.tempID();
            for (let h = 0; h < editor.history.history.length; h++) {
              let event = editor.history.history[h];
              for (let c = 0; c < event.changes.length; c++) {
                let change = event.changes[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
              for (let c = 0; c < event.redo.length; c++) {
                let change = event.redo[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
            }
            if (addRedo == true) {
              event.redo.push({ remove: true, _id: tempID });
            }
            editor.selecting[tempID] = copyObject({ ...saveAnno, _id: tempID });
          }
      }
      
      this.selection.action = "save";
      await this.selection.endAction({ sentKeys: keys, redrawAction: true, fromHistory: true });

      if (annoContentTx != null) {
        annoContentTx.setAttribute("contenteditable", "true");
        await sleep(1);
      }
      if (event.caret != null) {
        if (event.caret.undoElement != null) {
          event.caret.undoElement.focus();
          editor.text.setCaretPosition(event.caret.undoElement, event.caret.undoElement);
        }
      }

      editor.pipeline.publish("history_update", { history: editor.history.history, location: editor.history.location });
    }
    this.selection.redo = async () => {
      let event = editor.history.history[editor.history.location + 1];
      if (event == null) {
        return;
      }
      editor.history.location++;

      let keys = Object.keys(editor.selecting);
      let annoContentTx;
      switch (event.type) {
        case "update":
          for (let i = 0; i < event.redo.length; i++) {
            let change = event.redo[i];
            if (change.parent != null) {
              if (((editor.annotations[change.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Parent annotation is missing, invalid save
              }
            }
            let annotation = editor.annotations[change._id] ?? {};
            if (annotation.element != null) {
              annoContentTx = annotation.element.querySelector("div[contenteditable]");
              if (annoContentTx != null) {
                annoContentTx.removeAttribute("contenteditable");
              }
            }
            editor.selecting[change._id] = change;
          }
          break;
        case "remove": // Sort of Add
          for (let i = 0; i < event.redo.length; i++) {
            let saveAnno = event.redo[i];
            if (saveAnno.parent != null) {
              if (((editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
                continue; // Parent annotation is missing, invalid save
              }
            }
            let oldID = saveAnno._id;
            let tempID = editor.render.tempID();
            for (let h = 0; h < editor.history.history.length; h++) {
              let event = editor.history.history[h];
              for (let c = 0; c < event.redo.length; c++) {
                let change = event.redo[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
              for (let c = 0; c < event.changes.length; c++) {
                let change = event.changes[c];
                if (change._id == oldID) {
                  change._id = tempID;
                }
                if (change.parent == oldID) {
                  change.parent = tempID;
                }
              }
            }
            editor.selecting[tempID] = copyObject({ ...saveAnno, _id: tempID });
          }
          break;
        case "add": // Sort of Remove
          for (let i = 0; i < event.redo.length; i++) {
            editor.selecting[event.redo[i]._id] = { remove: true };
          }
      }

      this.selection.action = "save";
      await this.selection.endAction({ sentKeys: keys, redrawAction: true, fromHistory: true });

      if (annoContentTx != null) {
        annoContentTx.setAttribute("contenteditable", "true");
        await sleep(1);
      }
      if (event.caret != null) {
        if (event.caret.redoElement != null) {
          event.caret.redoElement.focus();
          editor.text.setCaretPosition(event.caret.redoElement, event.caret.redoPosition);
        }
      }

      editor.pipeline.publish("history_update", { history: editor.history.history, location: editor.history.location });
    }

    let checkShift = (event) => {
      if (event.shiftKey == false) {
        content.removeAttribute("shiftheld");
      } else {
        content.setAttribute("shiftheld", "");
      }
    }

    this.toolbar.updateMaxHeight();
    this.activateTool();
    this.toolbar.updateButtons(toolbarHolder);

    // Subscribe to Events:
    let prevToolModule; 
    editor.pipeline.subscribe("toolbarMouse", "click_start", async (data) => {
      let event = data.event;
      checkShift(event);
      if (data.event.button == 1) { // Start pan from scroll wheel press
        event.preventDefault();
        if (this.currentToolModulePath != "editor/toolbar/pan") {
          prevToolModule = this.currentToolModulePath;
          this.currentToolModulePath = "editor/toolbar/pan";
          await this.activateTool(null, { resetSelection: false });
        }
        return this.currentToolModule.clickStart(event);
      }
      if (event.buttons > 1) {
        return;
      }
      let target = event.target;
      if (target.closest(".eToolbar") == toolbar) {
        this.toolbar.setTool(target.closest("button"), true);
      }
      if (target.closest(".eContent") != null) {
        this.pushToolEvent("clickStart", event);
      }
    }, { sort: 1 });
    editor.pipeline.subscribe("toolbarMouse", "click_move", (data) => {
      let event = data.event;
      checkShift(event);
      this.tooltip.set(event);
      this.pushToolEvent("clickMove", event);

      if (this.selection.action == null && (this.currentToolModule.MOUSE == null || this.currentToolModule.MOUSE.override != true)) {
        let handle = event.target.closest(".eSelectHandle");
        if (handle != null) {
          if (handle.getAttribute("handle") == "rotate") {
            this.updateMouse({ type: "svg", url: "./images/editor/cursors/rotate.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation });
          } else if (handle.hasAttribute("rotation") == true) {
            this.updateMouse({ type: "svg", url: "./images/editor/cursors/resize.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation + parseInt(handle.getAttribute("rotation")) });
          } else {
            this.updateMouse(this.currentToolModule.MOUSE);
          }
        } else {
          this.updateMouse(this.currentToolModule.MOUSE);
        }
      }
    }, { sort: 1 });
    editor.pipeline.subscribe("toolbarMouse", "click_end", (data) => {
      checkShift(data.event);
      if (prevToolModule != null && prevToolModule != "editor/toolbar/pan") {
        data.event.preventDefault();
        this.currentToolModulePath = prevToolModule;
        prevToolModule = null;
        return this.activateTool(null, { resetSelection: false });
      }
      this.toolbar.setTool();
      this.pushToolEvent("clickEnd", data.event);
    }, { sort: 1 });
    editor.pipeline.subscribe("toolbarMouse", "click", (data) => {
      this.pushToolEvent("click", data.event);
    }, { sort: 1 });
    editor.pipeline.subscribe("toolbarMouse", "mouseleave", () => {
      this.tooltip.close();
    });
    editor.pipeline.subscribe("toolbarKeyDown", "keydown", async (data) => {
      let event = data.event;
      checkShift(event);
      this.pushToolEvent("keydown", event);

      // Keybind Manager:
      if (editor.isPageActive() == false) {
        return;
      }
      if (editor.self.access < 1) {
        return;
      }
      let meta = event.ctrlKey || event.metaKey;

      if (event.keyCode == 90 && event.shiftKey == true && meta == true) { // Handle Redo
        event.preventDefault();
        return this.selection.redo();
      }
      if (event.keyCode == 90 && meta == true) { // Handle Undo
        event.preventDefault();
        return this.selection.undo();
      }

      if (document.activeElement != null) {
        if (document.activeElement.closest("[contenteditable]") != null || document.activeElement.closest("input") != null) {
          return;
        }
      }

      if ([8, 46].includes(event.keyCode) == true) { // Handle Backspace / Delete Key
        let selectKeys = Object.keys(editor.selecting);
        for (let i = 0; i < selectKeys.length; i++) {
          let selectID = selectKeys[i];
          let anno = ({ ...((editor.annotations[selectID] ?? {}).render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
          if (editor.utils.canMemberModify(anno) == false) { // Can't edit another member's work:
            continue;
          }
          if (anno.lock == true) {
            continue;
          }
          editor.selecting[selectID].remove = true;
          editor.selecting[selectID].done = true;
        }
        this.selection.action = "save";
        return await this.selection.endAction();
      }

      if ([37, 38, 39, 40].includes(event.keyCode) == true) { // Handle Arrow Key Move
        let selectKeys = Object.keys(editor.selecting);
        if (selectKeys.length < 1) {
          return;
        }
        event.preventDefault();
        for (let i = 0; i < selectKeys.length; i++) {
          let selectID = selectKeys[i];
          let selecting = editor.selecting[selectID];
          let anno = (editor.annotations[selectID] ?? {}).render;
          if (editor.utils.canMemberModify(anno) == false) { // Can't edit another member's work:
            continue;
          }
          selecting.p = selecting.p ?? [anno.p[0] ?? 0, anno.p[1] ?? 0];
          let nudge = 1;
          if (event.shiftKey == true) {
            nudge = 10;
          }
          if (event.keyCode == 37) {
            selecting.p[0] -= nudge;
          } else if (event.keyCode == 38) {
            selecting.p[1] -= nudge;
          } else if (event.keyCode == 39) {
            selecting.p[0] += nudge;
          } else if (event.keyCode == 40) {
            selecting.p[1] += nudge;
          }
        }
        this.selection.action = "save";
        return await this.selection.endAction();
      }

      if (event.keyCode == 68 && meta == true) { // Handle Duplicate
        event.preventDefault();
        let moreModule = (await this.newModule("editor/toolbar/more")) ?? {};
        if (moreModule.duplicate != null) {
          moreModule.editor = editor;
          moreModule.toolbar = this;
          return await moreModule.duplicate();
        }
      }
    });
    editor.pipeline.subscribe("toolbarKeyUp", "keyup", (data) => {
      checkShift(data.event);
      this.pushToolEvent("keyup", data.event);
    });
    editor.pipeline.subscribe("toolbarScroll", "scroll", (data) => {
      this.pushToolEvent("scroll", data.event);
    });
    editor.pipeline.subscribe("toolbarWheel", "wheel", (data) => {
      this.pushToolEvent("wheel", data.event);
    });
    editor.pipeline.subscribe("toolbarPageResize", "resize", (data) => {
      this.toolbar.updateMaxHeight();
      this.toolbar.update();
      this.pushToolEvent("scroll", data.event);
    });
    editor.pipeline.subscribe("toolbarPagePageAdd", "page_add", () => {
      this.toolbar.updateMaxHeight();
      this.toolbar.update();
    });
    editor.pipeline.subscribe("toolbarEditorUpdate", "set", (data) => {
      if (data.hasOwnProperty("settings") == true) {
        this.toolbar.checkToolToggle();
      }
    });
    editor.pipeline.subscribe("toolbarSelectionRedraw", "redraw_selection", (data) => {
      this.selection.updateBox(data);
    });
    editor.pipeline.subscribe("toolbarSelectionZoomChange", "zoom_change", () => {
      this.selection.updateBox({ transition: false });
    });

    // COPY / PASTE
    let processFileUpload = async (items, event) => {
      if (editor.self.access < 1) {
        return;
      }
      for (let i = 0; i < items.length; i++) {
        let file = items[i];
        if (file != null) {
          if (file.kind == "file") {
            file = file.getAsFile();
          }
          if (file.kind != "string") {
            if (file.type.substring(0, 6) == "image/") {
              await this.toolbar.startTool(toolbar.querySelector('.eTool[tool="media"]'));
              await this.toolbar.startTool(toolbar.querySelector('.eTool[tool="upload"]'), null, { file: file, event: event });
              return true;
            }
          }
        }
      }
      return false;
    }
    page.addEventListener("drop", (event) => {
      processFileUpload(event.dataTransfer.items, event);
      event.preventDefault();
      event.stopPropagation();
    });
    page.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "copy";
    });
    editor.pipeline.subscribe("toolbarPaste", "paste", async (data) => {
      if (editor.isPageActive() == false) {
        return;
      }
      if (editor.self.access < 1) {
        return;
      }
      if (document.activeElement != null) {
        if (document.activeElement.closest("[contenteditable]") != null || document.activeElement.closest("input") != null) {
          return;
        }
      }
      let event = data.event;
      let clipboardData = event.clipboardData ?? event.originalEvent.clipboardData ?? {};

      if (clipboardData.items.length < 1) {
        return;
      }
      if (processFileUpload(clipboardData.items) == true) {
        return event.preventDefault();
      }

      let html = clipboardData.getData("text/html");
      let startIndex = html.indexOf("(markify+copypaste)"); // 19 chars
      let endIndex = html.indexOf("(/markify+copypaste)");
      if (startIndex < 0 || endIndex < 0) {
        return;
      }
      let annotationData = JSON.parse(decodeURIComponent(html.substring(startIndex + 19, endIndex)));
      if (annotationData.length < 1) {
        return;
      }

      let annotationRect = editor.utils.localBoundingRect(annotations);
      let pageTopLeftX = -annotationRect.left / editor.zoom;
      let pageTopLeftY = -annotationRect.top / editor.zoom;
      let pageBottomRightX = (page.offsetWidth - annotationRect.left) / editor.zoom;
      let pageBottomRightY = (page.offsetHeight - annotationRect.top) / editor.zoom;
      //let setSelect = {};
      //let newNewSelect = {};
      let minLeft;
      let minTop;
      let maxLeft;
      let maxTop;
      let minZIndex;
      let parentIDs = {};
      editor.selecting = {};

      for (let i = 0; i < annotationData.length; i++) {
        let newAnno = annotationData[i];
        if (this.checkSubToolEnabled(newAnno.f) == false) {
          continue;
        }
        let tempID = editor.render.tempID();
        parentIDs[newAnno._id] = tempID;
        newAnno.old_ID = newAnno._id;
        newAnno._id = tempID;
        let annoRect = editor.utils.getRect(newAnno);
        let [topLeftX, topLeftY, bottomRightX, bottomRightY] = editor.math.rotatedBounds(annoRect.x, annoRect.y, annoRect.endX, annoRect.endY, annoRect.rotation);
        if (topLeftX < minLeft || minLeft == null) {
          minLeft = topLeftX;
        }
        if (topLeftY < minTop || minTop == null) {
          minTop = topLeftY;
        }
        if (bottomRightX > maxLeft || maxLeft == null) {
          maxLeft = bottomRightX;
        }
        if (bottomRightY > maxTop || maxTop == null) {
          maxTop = bottomRightY;
        }
        minZIndex = Math.min(minZIndex ?? newAnno.l ?? editor.minLayer, newAnno.l ?? editor.minLayer);
      }

      let { x: centerPageX, y: centerPageY } = editor.utils.scaleToDoc(page.offsetWidth / 2, page.offsetHeight / 2);
      let centerX = (maxLeft - minLeft) / 2;
      let centerY = (maxTop - minTop) / 2;

      for (let i = 0; i < annotationData.length; i++) {
        let newAnno = annotationData[i];
        if (this.checkSubToolEnabled(newAnno.f) == false) {
          continue;
        }
        let existingAnno = (editor.annotations[newAnno.old_ID] ?? {}).render;
        if (existingAnno != null) {
          let existingAnnoRect = editor.utils.getRect(existingAnno);
          let [topLeftX, topLeftY, bottomRightX, bottomRightY] = editor.math.rotatedBounds(existingAnnoRect.x, existingAnnoRect.y, existingAnnoRect.endX, existingAnnoRect.endY, existingAnnoRect.rotation);
          if (bottomRightX > pageTopLeftX && topLeftX < pageBottomRightX && bottomRightY > pageTopLeftY && topLeftY < pageBottomRightY) {
            newAnno.p[0] = (newAnno.p[0] ?? existingAnno.p[0]) + 50;
            newAnno.p[1] = (newAnno.p[1] ?? existingAnno.p[1]) + 50;
          } else {
            existingAnno = null;
          }
        } else {
          newAnno.p[0] += centerPageX + centerX - maxLeft;
          newAnno.p[1] += centerPageY + centerY - maxTop;
        }
        newAnno.l = editor.maxLayer + 1 + ((newAnno.l ?? editor.maxLayer) - minZIndex);
        if (newAnno.parented != null) {
          let parentCopy = parentIDs[newAnno.parented.parent];
          if (parentCopy != null) {
            newAnno.parent = parentCopy;
            newAnno.p = newAnno.parented.p;
            newAnno.r = newAnno.parented.r;
          }
          delete newAnno.parented;
        }
        delete newAnno.old_ID;
        delete newAnno.m;
        editor.selecting[newAnno._id] = newAnno;
      }

      this.selection.action = "save";
      await this.selection.endAction();
    });
    editor.pipeline.subscribe("toolbarCopy", "copy", (data) => {
      if (editor.isPageActive() == false) {
        return;
      }
      let selection = document.getSelection();
      if (selection.toString().length > 0) {
        return; // User it selecting text, ignore event
      }
      let event = data.event;
      let clipboardData = event.clipboardData ?? event.originalEvent.clipboardData ?? {};
      let saveTextData = "";
      let saveAnnoData = [];
      event.preventDefault();

      let selectKeys = Object.keys(editor.selecting);
      let checkChunks = {};
      for (let i = 0; i < selectKeys.length; i++) {
        let annoID = selectKeys[i];
        let render = (editor.annotations[annoID] ?? {}).render;
        if (render == null) {
          continue;
        }
        let addChunks = editor.utils.chunksFromAnnotation(render);
        for (let c = 0; c < addChunks.length; c++) {
          checkChunks[addChunks[c]] = true;
        }
        let renderCopy = copyObject(render);
        if (renderCopy.parent != null) {
          renderCopy.parented = {
            parent: renderCopy.parent,
            p: [render.p[0], render.p[1]],
            r: render.r
          };
        }
        let { annoX, annoY, rotation } = editor.utils.getRect(render);
        delete renderCopy.parent;
        renderCopy.p = [annoX, annoY];
        renderCopy.r = rotation;
        saveAnnoData.push(renderCopy);

        let richText = render.d ?? {};
        if (richText.b != null) {
          if (saveTextData.length > 0) {
            saveTextData += "\n";
          }
          for (let t = 0; t < richText.b.length; t++) {
            let addText = "";
            if (richText.b[t] != "\n") {
              addText = richText.b[t];
            } else {
              addText = "\n";
            }
            saveTextData += addText;
          }
        }
      }

      let annotations = editor.utils.annotationsInChunks(Object.keys(checkChunks));
      for (let i = 0; i < annotations.length; i++) {
        let annotation = annotations[i] ?? {};
        if (annotation.pointer != null) {
          annotation = editor.annotations[annotation.pointer];
        }
        let render = annotation.render;
        if (render == null || editor.selecting[render._id] != null) {
          continue;
        }
        let { selectingParent, annoX, annoY, rotation } = editor.utils.getRect(render);
        if (selectingParent == false) {
          continue;
        }
        let renderCopy = copyObject(render);
        if (renderCopy.parent != null) {
          renderCopy.parented = {
            parent: renderCopy.parent,
            p: [render.p[0], render.p[1]],
            r: render.r
          };
        }
        delete renderCopy.parent;
        renderCopy.p = [annoX, annoY];
        renderCopy.r = rotation;
        saveAnnoData.push(renderCopy);

        let richText = render.d ?? {};
        if (richText.b != null) {
          if (saveTextData.length > 0) {
            saveTextData += "\n";
          }
          for (let t = 0; t < richText.b.length; t++) {
            let addText = "";
            if (richText.b[t] != "\n") {
              addText = richText.b[t];
            } else {
              addText = "\n";
            }
            saveTextData += addText;
          }
        }
      }

      clipboardData.setData("text/html", `<meta charset="utf-8"><html><head></head><body><span data-meta="<!--(markify+copypaste)${encodeURIComponent(JSON.stringify(saveAnnoData))}(/markify+copypaste)-->"></span><div>${saveTextData}</div></body></html>`);
      clipboardData.setData("text/plain", saveTextData);
    });

    editor.toolbar = this;
  }
}

// TOOL MODULES //

modules["editor/toolbar/select"] = class {
  //MOUSE = { type: "svg", url: "./images/editor/cursors/cursor.svg", translate: { x: 22, y: 22 } };

  clickStart = async (event) => {
    if (event.which === 3 || event.button === 2) {
      return;
    }
    let target = event.target;
    this.lastTarget = target;
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eActionBar") != null) {
      return this.parent.selection.clickAction(event);
    }
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    let annotation = target.closest(".eAnnotation");
    let annoID;
    let render;
    if (annotation != null) {
      annoID = annotation.getAttribute("anno");
      render = (this.editor.annotations[annoID] ?? {}).render;
      if (render == null) {
        return;
      }
      if (annotation.querySelector("div[edit]") != null && annotation.querySelector("div[edit]").closest(".eAnnotation") == annotation && annotation.querySelector("div[contenteditable]") != null) {
        return;
      }
      if (this.editor.selecting[annoID] != null) {
        if (target.closest("div[title]") != null && annotation.querySelector("div[title]").closest(".eAnnotation") == annotation && this.editor.utils.isLocked(render) != true) {
          if (target.closest("div[title]").hasAttribute("contenteditable") == false) {
            this.parent.selection.clickAction({
              target: this.editor.page.querySelector('.eActionBar:not([remove]) .eTool[module="editor/toolbar/settitle"]')
            });
          }
          return;
        }
        if (render.f == "embed" && target.closest("div[input]") != null && annotation.querySelector("div[input]").closest(".eAnnotation") == annotation && this.editor.utils.isLocked(render) != true) {
          if (render.embed == null) {
            this.parent.selection.clickAction({
              target: this.editor.page.querySelector('.eActionBar:not([remove]) .eTool[module="editor/toolbar/setembed"]')
            });
          }
          return;
        }
      }
    }

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    this.startX = mouseX;
    this.startY = mouseY;
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    if (this.parent.selection.pointInSelectBox(position.x, position.y) == true) {
      return await this.parent.selection.startAction(event);
    }
    if (target.closest(".eSelect") == null) {
      if (event.shiftKey == false) {
        this.editor.selecting = {};
        if (annotation == null) {
          return this.parent.selection.updateBox();
        }
      }
      if (render != null && this.editor.selecting[annoID] == null) {
        let module = (await this.editor.render.getModule(render.f)) ?? {};
        if (module.HOLD_FOR_SELECT != true || target.closest("[selectable]") != null) {
          this.wasSelected = annoID;
          this.editor.selecting[annoID] = {};
        }
      }
    }
    await this.parent.selection.updateBox();
    await this.parent.selection.startAction(event);
  }
  clickMove = async (event) => {
    await this.parent.selection.moveAction(event);
  }
  clickEnd = async (event) => {
    await this.parent.selection.endAction();
    await this.parent.selection.clickAction(event, { clickEnd: true });

    let target = this.lastTarget ?? event.target;
    this.lastTarget = null;
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eSelect") != null) {
      return;
    }
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    if (Math.floor(mouseX - this.startX) == 0 && Math.floor(mouseY - this.startY) == 0) {
      let annotation = target.closest(".eAnnotation");
      if (annotation == null) {
        return;
      }
      let annoID = annotation.getAttribute("anno");
      let render = (this.editor.annotations[annoID] ?? {}).render;
      if (render == null) {
        return;
      }
      if (this.editor.utils.canMemberModify(render) == false) {
        alertModule.close(this.parent.someoneElsesAnnoWarning);
        this.parent.someoneElsesAnnoWarning = await alertModule.open("warning", "<b>Someone Else's Annotation</b>The ability to modify another member's work is disabled.");
      }
      if (event.shiftKey == true) {
        if (this.wasSelected != annoID && this.editor.selecting[annoID] != null) {
          delete this.editor.selecting[annoID];
        } else {
          this.editor.selecting[annoID] = {};
        }
      } else {
        this.editor.selecting = {};
        this.editor.selecting[annoID] = {};
      }
      if (this.wasSelected == null && annotation.querySelector("div[edit]") != null && annotation.querySelector("div[edit]").closest(".eAnnotation") == annotation && annotation.querySelector("div[contenteditable]") == null) {
        this.parent.selection.clickAction({
          target: this.editor.page.querySelector('.eActionBar:not([remove]) .eTool[module="editor/toolbar/textedit"]'),
          setCaretPosition: true,
          clientX: event.clientX,
          clientY: event.clientY
        });
      }
    }
    this.parent.selection.updateBox();
    this.wasSelected = null;
  }
  scroll = async () => {
    await this.parent.selection.moveAction();
    await this.parent.selection.updateActionBar();
  }
  click = async (event) => { await this.parent.selection.interactRun(event.target); }
}

modules["editor/toolbar/pan"] = class {
  USER_SELECT = "none";
  MOUSE = { type: "set", value: "grab", override: true };

  clickStart = (event) => {
    if (event.target != null && event.target.closest("button") != null) {
      return;
    }
    this.dragging = true;
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    this.startX = (mouseX - annotationRect.left) / this.editor.zoom;
    this.startY = (mouseY - annotationRect.top) / this.editor.zoom;
    this.parent.updateMouse({ type: "set", value: "grabbing" });
  }
  clickMove = (event) => {
    if (this.dragging != true) {
      return;
    }
    if (event != null) {
      if ((mouseDown() == false && event.which != 2) || event.touches != null) {
        return this.clickEnd(event);
      }
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.endX = mouseX;
      this.endY = mouseY;
    }
    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    this.editor.contentHolder.scrollTo({
      left: this.editor.contentHolder.scrollLeft - ((((this.endX - annotationRect.left) / this.editor.zoom) - this.startX) * this.editor.zoom),
      top: this.editor.contentHolder.scrollTop - ((((this.endY - annotationRect.top) / this.editor.zoom) - this.startY) * this.editor.zoom)
    });
    this.parent.selection.updateActionBar();
  }
  clickEnd = () => {
    this.dragging = false;
    this.parent.updateMouse({ type: "set", value: "grab" });
  }
  wheel = (event) => {
    if (this.dragging == true) {
      event.preventDefault();
      this.clickMove();
    }
  }
}

modules["editor/toolbar/drag"] = class {
  USER_SELECT = "none";
  TOUCH_ACTION = "pinch-zoom";
  MOUSE = { type: "svg", url: "./images/editor/cursors/cursor.svg", translate: { x: 22, y: 22 } };

  css = {
    ".eSelectDrag": `position: absolute; box-sizing: border-box; pointer-events: none; z-index: 99; opacity: .4; background: var(--secondary); border: solid 2px var(--theme); border-radius: 10px; transition: opacity .1s`
  };

  clickStart = async (event) => {
    if (event.which === 3 || event.button === 2) {
      return;
    }
    let target = event.target;
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eActionBar") != null) {
      return this.parent.selection.clickAction(event);
    }
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    await this.parent.selection.startAction(event);
    if (target.closest(".eSelect") != null) {
      return;
    }
    let annotation = target.closest(".eAnnotation");
    let annoID;
    let render;
    if (annotation != null) {
      annoID = annotation.getAttribute("anno");
      render = (this.editor.annotations[annoID] ?? {}).render;
      if (render == null) {
        return;
      }
    }

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    this.startX = position.x;
    this.startY = position.y;
    if (this.parent.selection.pointInSelectBox(this.startX, this.startY) == true && event.shiftKey == false) {
      return;
    }

    if (annoID != null) {
      if (this.editor.selecting[annoID] != null) {
        return this.clickEnd();
      }
      this.wasSelected = annoID;
    }
    if (event.shiftKey == false) {
      this.editor.selecting = {};
    }

    this.clickEnd();
    this.parent.toolbar.closeSubSub(true);

    let content = this.editor.contentHolder.querySelector(".eContent");
    content.insertAdjacentHTML("beforeend", `<div class="eSelectDrag" tooleditor new></div>`);
    this.selection = content.querySelector(".eSelectDrag[new]");
    this.selection.removeAttribute("new");

    this.parent.selection.hideSelectBox = true;

    this.prevSelecting = copyObject(this.editor.selecting);
    await this.parent.selection.updateBox();
    this.clickMove(event);
  }
  setScrollInterval = async () => {
    if (this.scrollIntervalRunning == true) {
      return;
    }
    this.scrollIntervalRunning = true;
    while (this.selection != null && (this.scrollIntervalX != 0 || this.scrollIntervalY != 0)) {
      this.editor.contentHolder.scrollTo(this.editor.contentHolder.scrollLeft + this.scrollIntervalX, this.editor.contentHolder.scrollTop + this.scrollIntervalY);
      await this.clickMove(this.scrollLastEvent, true);
      await sleep(10);
    }
    this.scrollIntervalRunning = false;
  }
  clickMove = async (event, fromScrollInterval) => {
    if (this.selection == null) {
      return await this.parent.selection.moveAction(event);
    }
    if (mouseDown() == false) {
      return this.clickEnd();
    }

    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.mouseX = mouseX;
      this.mouseY = mouseY;

      // Handle Scroll with Mouse:
      if (fromScrollInterval != true) {
        let scrollOffset = 32;
        this.scrollIntervalX = 0;
        this.scrollIntervalY = 0;
        let leftPos = scrollOffset - mouseX;
        if (leftPos > 0) {
          let percentage = 1 + ((leftPos - scrollOffset) / scrollOffset);
          this.scrollIntervalX = -Math.min(10 * percentage, 10);
        }
        let rightPos = mouseX - this.editor.page.offsetWidth + scrollOffset;
        if (rightPos > 0) {
          let percentage = 1 + ((rightPos - scrollOffset) / scrollOffset);
          this.scrollIntervalX = Math.min(10 * percentage, 10);
        }
        let topPos = scrollOffset - mouseY;
        if (topPos > 0) {
          let percentage = 1 + ((topPos - scrollOffset) / scrollOffset);
          this.scrollIntervalY = -Math.min(10 * percentage, 10);
        }
        let bottomPos = mouseY - this.editor.page.offsetHeight + scrollOffset;
        if (bottomPos > 0) {
          let percentage = 1 + ((bottomPos - scrollOffset) / scrollOffset);
          this.scrollIntervalY = Math.min(10 * percentage, 10);
        }
        this.scrollLastEvent = event;
        if (this.scrollIntervalX != 0 || this.scrollIntervalY != 0) {
          return this.setScrollInterval();
        }
      }
    }

    let { x, y } = await this.editor.utils.scaleToDoc(this.mouseX, this.mouseY);
    let selectWidth = 0;
    let selectHeight = 0;
    let topLeftX = 0;
    let topLeftY = 0;
    if (x > this.startX) {
      selectWidth = x - this.startX;
      topLeftX = this.startX;
      if (y > this.startY) {
        selectHeight = y - this.startY;
        topLeftY = this.startY;
        this.selection.style.borderRadius = "10px 10px 0px 10px";
      } else {
        selectHeight = this.startY - y;
        topLeftY = y;
        this.selection.style.borderRadius = "10px 0px 10px 10px";
      }
    } else {
      selectWidth = this.startX - x;
      topLeftX = x;
      if (y > this.startY) {
        selectHeight = y - this.startY;
        topLeftY = this.startY;
        this.selection.style.borderRadius = "10px 10px 10px 0px";
      } else {
        selectHeight = this.startY - y;
        topLeftY = y;
        this.selection.style.borderRadius = "0px 10px 10px 10px";
      }
    }
    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    this.selection.style.width = (selectWidth * this.editor.zoom) + "px";
    this.selection.style.height = (selectHeight * this.editor.zoom) + "px";
    this.selection.style.left = annotationRect.left + (topLeftX * this.editor.zoom) + this.editor.contentHolder.scrollLeft + "px";
    this.selection.style.top = annotationRect.top + (topLeftY * this.editor.zoom) + this.editor.contentHolder.scrollTop + "px";

    let selectionChange = false;
    let currentSelections = Object.keys(this.editor.selecting);
    this.editor.selecting = copyObject(this.prevSelecting);

    let bottomRightX = topLeftX + selectWidth;
    let bottomRightY = topLeftY + selectHeight;
    let chunkAnnotations = this.editor.utils.annotationsInChunks(this.editor.utils.regionInChunks(topLeftX, topLeftY, bottomRightX, bottomRightY));
    for (let i = 0; i < chunkAnnotations.length; i++) {
      let annotation = chunkAnnotations[i];
      if (annotation.pointer != null) {
        annotation = editor.annotations[annotation.pointer];
      }
      let render = annotation.render;
      if (render == null) {
        continue;
      }
      if (this.editor.utils.canMemberModify(render) == false) {
        continue;
      }
      if (render.remove == true) {
        continue;
      }

      let annotationModule = await this.editor.render.getModule(render.f);
      let { x, y, endX, endY, rotation, selectingParent } = this.editor.utils.getRect(render);
      if (selectingParent == true) {
        continue;
      }
      let [boundsTopLeftX, boundsTopLeftY, boundsBottomRightX, boundsBottomRightY] = this.editor.math.rotatedBounds(x, y, endX, endY, rotation);

      if (annotationModule.SELECT_BOX_COVER != true) { // Part in bounds:
        if (!(boundsTopLeftX < bottomRightX && boundsBottomRightX > topLeftX && boundsTopLeftY < bottomRightY && boundsBottomRightY > topLeftY)) {
          continue;
        }
      } else { // Entire thing in bounds:
        if (boundsTopLeftX < topLeftX || boundsTopLeftY < topLeftY || boundsBottomRightX > bottomRightX || boundsBottomRightY > bottomRightY) {
          continue;
        }
      }

      if (this.editor.selecting[render._id] == null) {
        this.editor.selecting[render._id] = {};
        let currentSelectIndex = currentSelections.indexOf(render._id);
        if (currentSelectIndex > -1) {
          currentSelections.splice(currentSelectIndex, 1);
        } else {
          selectionChange = true;
        }
      }
    }

    if (selectionChange == true || currentSelections.length > 0) {
      this.parent.selection.updateBox({ hideSelectBox: true });
    }
  }
  clickEnd = async (event) => {
    if (this.selection != null) {
      let remSelect = this.selection;
      this.selection = null;
      remSelect.style.opacity = 0;
      (async () => {
        await sleep(150);
        remSelect.remove();
      })();
    }
    this.parent.selection.hideSelectBox = false;
    if (event != null) {
      await this.parent.selection.endAction(event);
      await this.parent.selection.clickAction(event, { clickEnd: true });

      let target = event.target;
      if (target == null) {
        return;
      }
      if (target.closest("button") != null || target.closest("a") != null || target.closest(".eActionBar") != null) {
        return;
      }
      let annotation = target.closest(".eAnnotation");
      let annoID;
      let render;
      if (annotation != null) {
        annoID = annotation.getAttribute("anno");
        render = (this.editor.annotations[annoID] ?? {}).render;
      }
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
      if (Math.floor(position.x - this.startX) == 0 && Math.floor(position.y - this.startY) == 0) {
        if (render == null) {
          return;
        }
        if (this.wasSelected != annoID && this.editor.selecting[annoID] != null) {
          delete this.editor.selecting[annoID];
        }
      }
      this.parent.selection.updateBox();
      this.wasSelected = null;
    }
  }
  scroll = async () => {
    await this.clickMove();
    await this.parent.selection.moveAction();
    await this.parent.selection.updateActionBar({ hideSelectBox: this.selection != null });
  }
  click = async (event) => { await this.parent.selection.interactRun(event.target); }
}

modules["editor/toolbar/pen"] = class {
  FUNCTION = "draw";
  USER_SELECT = "none";
  TOUCH_ACTION = null;
  REALTIME_TOOL = 2;
  MOUSE = { type: "svg", url: "./images/editor/cursors/pen.svg", translate: { x: 15, y: 30 } };
  PUBLISH = {};

  clickStart = async (event) => {
    if (event.changedTouches != null && event.changedTouches[0] != null) {
      let touch = event.changedTouches[0];
      if (touch.touchType == "stylus") {
        this.editor.usingStylus = true;
      } else if (this.editor.options.stylusmode == true) {
        return;
      }
    } else if (this.editor.options.stylusmode == true) {
      return;
    }
    event.preventDefault();
    this.clickEnd();
    this.parent.toolbar.closeSubSub(true);
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    let toolPreference = this.parent.getToolPreference();
    let useThickness = this.THICKNESS ?? toolPreference.thickness;
    let halfUseThickness = useThickness / 2;
    this.annotation = {
      render: {
        _id: this.editor.render.tempID(),
        f: this.FUNCTION,
        p: [this.editor.math.round(position.x - halfUseThickness), this.editor.math.round(position.y - halfUseThickness)],
        s: [0, 0],
        l: this.editor.maxLayer + 1,
        c: this.COLOR ?? toolPreference.color.selected,
        t: useThickness,
        o: this.OPACITY ?? toolPreference.opacity,
        d: [0, 0]
      },
      animate: false
    };
    await this.editor.render.create(this.annotation);
    this.editor.selecting[this.annotation.render._id] = this.annotation.render;
  }
  clickMove = async (event) => {
    if (this.annotation == null) {
      return;
    }
    if (mouseDown() == false) {
      return this.clickEnd();
    }
    if (event.touches != null && event.touches.length > 1) {
      return;
    }
    if (this.editor.usingStylus == true) {
      if (event.changedTouches != null && event.changedTouches[0] != null) {
        let touch = event.changedTouches[0];
        if (touch.touchType != "stylus") {
          return;
        }
        //touch.force = the force of the touch - useful for later ;)
      } else {
        return;
      }
    }
    event.preventDefault();
    let rect = this.editor.utils.localBoundingRect(this.annotation.element);
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let { x, y } = this.editor.utils.scaleToDoc(mouseX - rect.left, mouseY - rect.top, true);
    let halfT = this.editor.math.round(this.annotation.render.t / 2);
    x -= halfT;
    y -= halfT;
    if (this.FORCE_LINE != true && event.shiftKey == false) {
      if (x > this.annotation.render.s[0]) {
        this.annotation.render.s[0] = Math.ceil(x);
      }
      if (y > this.annotation.render.s[1]) {
        this.annotation.render.s[1] = Math.ceil(y);
      }
      let sizeIncX = Math.ceil(x);
      if (sizeIncX < 0) {
        for (let i = 0; i < this.annotation.render.d.length; i += 2) {
          this.annotation.render.d[i] = this.editor.math.round(this.annotation.render.d[i] - sizeIncX);
        }
        this.annotation.render.s[0] = this.editor.math.round(this.annotation.render.s[0] - sizeIncX);
        this.annotation.render.p[0] = this.editor.math.round(this.annotation.render.p[0] + sizeIncX);
        x = 0;
      }
      let sizeIncY = Math.ceil(y);
      if (sizeIncY < 0) {
        for (let i = 1; i < this.annotation.render.d.length; i += 2) {
          this.annotation.render.d[i] = this.editor.math.round(this.annotation.render.d[i] - sizeIncY);
        }
        this.annotation.render.s[1] = this.editor.math.round(this.annotation.render.s[1] - sizeIncY);
        this.annotation.render.p[1] = this.editor.math.round(this.annotation.render.p[1] + sizeIncY);
        y = 0;
      }
      this.annotation.render.d.push(this.editor.math.round(x));
      this.annotation.render.d.push(this.editor.math.round(y));
    } else {
      this.annotation.render.d = [this.annotation.render.d[0], this.annotation.render.d[1]];
      let sizeIncX = x;
      if (sizeIncX < this.annotation.render.d[0]) {
        this.annotation.render.d[0] = this.editor.math.round(this.annotation.render.d[0] - sizeIncX);
        this.annotation.render.s[0] = this.editor.math.round(this.annotation.render.s[0] - sizeIncX);
        this.annotation.render.p[0] = this.editor.math.round(this.annotation.render.p[0] + sizeIncX);
        x = 0;
      } else {
        this.annotation.render.s[0] = Math.ceil(x);
      }
      let sizeIncY = y;
      if (sizeIncY < this.annotation.render.d[1]) {
        this.annotation.render.d[1] = this.editor.math.round(this.annotation.render.d[1] - sizeIncY);
        this.annotation.render.s[1] = this.editor.math.round(this.annotation.render.s[1] - sizeIncY);
        this.annotation.render.p[1] = this.editor.math.round(this.annotation.render.p[1] + sizeIncY);
        y = 0;
      } else {
        this.annotation.render.s[1] = Math.ceil(y);
      }
      this.annotation.render.d[2] = x;
      this.annotation.render.d[3] = y;
    }
    if (this.HORIZONTAL_CHECK == true) {
      if (this.editor.math.horizontalLine(this.annotation.render.d) == true) {
        this.annotation.render.d[3] = this.annotation.render.d[1];
        this.annotation.render.s[1] = this.annotation.render.t;
        this.annotation.render.p[1] = this.editor.math.round(this.annotation.render.p[1] + this.annotation.render.d[1]);
        this.annotation.render.d[1] = 0;
        this.annotation.render.d[3] = 0;
      }
    }
    await this.editor.render.create(this.annotation);
    if (this.annotation.render.d.length > 6150) { // Start new annotation when path too long
      await this.clickEnd();
      this.clickStart(event);
    }
  }
  clickEnd = async () => {
    if (this.annotation == null) {
      return;
    }
    this.annotation.render.d = this.editor.math.simplifyPath(this.annotation.render.d, .75 / this.editor.zoom);
    if (this.STRAITEN_CHECK == true) {
      if (this.editor.math.relativelyStraight(this.annotation.render.d, 5 * this.editor.zoom) == true) {
        this.annotation.render.d = [this.annotation.render.d[0], this.annotation.render.d[1], this.annotation.render.d[this.annotation.render.d.length - 2], this.annotation.render.d[this.annotation.render.d.length - 1]]; // Strait line
        if (this.editor.math.horizontalLine(this.annotation.render.d) == true) {
          let averageY = (this.annotation.render.d[1] + this.annotation.render.d[3]) / 2;
          this.annotation.render.s[1] = this.annotation.render.t;
          this.annotation.render.p[1] = this.editor.math.round(this.annotation.render.p[1] + averageY);
          this.annotation.render.d[1] = 0;
          this.annotation.render.d[3] = 0;
        }
      }
    }

    delete this.editor.selecting[this.annotation.render._id];

    await this.editor.save.push(this.annotation.render);
    await this.editor.history.push("remove", [{ _id: this.annotation.render._id }]);

    this.annotation.render.done = true;
    await this.editor.realtime.forceShort();
    this.editor.render.remove(this.annotation);
    this.annotation = null;
    this.editor.usingStylus = false;
  }
  activate = () => {
    let toolPreference = this.parent.getToolPreference();
    this.MOUSE.color = toolPreference.color.selected;
    this.MOUSE.opacity = toolPreference.opacity;
    this.PUBLISH.c = toolPreference.color.selected;
    this.PUBLISH.o = toolPreference.opacity;

    if (this.editor.options.stylusmode != true) {
      this.TOUCH_ACTION = "pinch-zoom";
    } else {
      this.editor.pinchZoomDisable = true;
    }
  }
  disable = this.clickEnd;
}
modules["editor/toolbar/highlighter"] = class extends modules["editor/toolbar/pen"] {
  FUNCTION = "markup";
  STRAITEN_CHECK = true;
  REALTIME_TOOL = 1;
  MOUSE = { type: "svg", url: "./images/editor/cursors/highlighter.svg", translate: { x: 15, y: 30 } };
}
modules["editor/toolbar/underline"] = class extends modules["editor/toolbar/pen"] {
  FORCE_LINE = true;
  HORIZONTAL_CHECK = true;
  REALTIME_TOOL = 1;
  MOUSE = { type: "svg", url: "./images/editor/cursors/highlighter.svg", translate: { x: 15, y: 30 } };

  activate = () => {
    let toolPreference = this.parent.getToolPreference();

    this.OPACITY = 100;
    this.THICKNESS = this.editor.math.round(Math.max(toolPreference.thickness / 4, 1));

    this.MOUSE.color = toolPreference.color.selected;
    this.MOUSE.opacity = this.OPACITY;
    this.PUBLISH.c = toolPreference.color.selected;
    this.PUBLISH.o = toolPreference.opacity;

    if (this.editor.options.stylusmode != true) {
      this.TOUCH_ACTION = "pinch-zoom";
    } else {
      this.editor.pinchZoomDisable = true;
    }
  }
}
modules["editor/toolbar/eraser"] = class {
  USER_SELECT = "none";
  TOUCH_ACTION = null;
  REALTIME_TOOL = 3;
  MOUSE = { type: "svg", url: "./images/editor/cursors/eraser.svg", translate: { x: 20, y: 20 } };
  PUBLISH = {};
  
  clickStart = async (event) => {
    if (event.changedTouches != null && event.changedTouches[0] != null) {
      let touch = event.changedTouches[0];
      if (touch.touchType == "stylus") {
        this.editor.usingStylus = true;
      } else if (this.editor.options.stylusmode == true) {
        return;
      }
    } else if (this.editor.options.stylusmode == true) {
      return;
    }
    event.preventDefault();
    this.erasing = true;
    this.clickMove(event);
    this.parent.toolbar.closeSubSub(true);
  }
  clickMove = async (event) => {
    if (this.erasing != true) {
      return;
    }
    if (mouseDown() == false || this.editor.isEditorContent(event.target) != true) {
      return this.clickEnd();
    }
    if (event.touches != null && event.touches.length > 1) {
      return;
    }
    if (this.editor.usingStylus == true) {
      if (event.changedTouches != null && event.changedTouches[0] != null) {
        let touch = event.changedTouches[0];
        if (touch.touchType != "stylus") {
          return;
        }
      } else {
        return;
      }
    }
    event.preventDefault();
    
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let x1 = Math.floor(mouseX);
    let y1 = Math.floor(mouseY);
    let x0 = this.x0 ?? x1;
    let y0 = this.y0 ?? y1;
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    
    while (true) {
      let { x: scaledX, y: scaledY } = await this.editor.utils.scaleToDoc(x0, y0);
      let chunkAnnotations = this.editor.utils.annotationsInChunks([this.editor.utils.pointInChunk(scaledX, scaledY)]);
      for (let i = 0; i < chunkAnnotations.length; i++) {
        let annotation = chunkAnnotations[i] ?? {};
        let anno = annotation.element;
        if (annotation.element == null) {
          continue;
        }
        if (anno == null || anno.hasAttribute("hidden") == true) {
          continue;
        }
        let annoID = anno.getAttribute("anno");
        let render = (this.editor.annotations[annoID] ?? {}).render;
        if (render == null || render.remove == true) {
          continue;
        }
        if (this.editor.utils.canMemberModify(render) != true) { // Can't edit another member's work:
          continue;
        }
        if (render.lock == true) {
          continue;
        }
        let renderModule = await this.editor.render.getModule(render.f);
        if (renderModule == null || renderModule.CAN_ERASE != true) {
          continue;
        }
        let drawing = anno.querySelector(":scope > svg > polyline");
        if (drawing == null || drawing.hasAttribute("points") == false) {
          continue;
        }
        let svg = drawing.closest("svg");
        let strokeWidth = parseInt(drawing.getAttribute("stroke-width"));

        // See if valid drawing is by eraser line:
        let rect = this.editor.utils.getRect(render);
        let xPos = scaledX - rect.x;
        let yPos = scaledY - rect.y;

        let points = drawing.points;
        let halfWidth = svg.viewBox.baseVal.width / 2;
        let halfHeight = svg.viewBox.baseVal.height / 2;
        for (let i = 1; i < points.numberOfItems; i++) {
          let prevPoint = points.getItem(i - 1);
          let prevRelativeX = prevPoint.x - halfWidth;
          let prevRelativeY = prevPoint.y - halfHeight;
          let point = points.getItem(i);
          let pRelativeX = point.x - halfWidth;
          let pRelativeY = point.y - halfHeight;
          if (render.s[0] < 0) {
            prevRelativeX *= -1;
            pRelativeX *= -1;
          }
          if (render.s[1] < 0) {
            prevRelativeY *= -1;
            pRelativeY *= -1;
          }
          let [prevPointX, prevPointY] = this.editor.math.rotatePoint(prevRelativeX, prevRelativeY, rect.rotation);
          let [pointX, pointY] = this.editor.math.rotatePoint(pRelativeX, pRelativeY, rect.rotation);
          if (this.editor.math.isPointOnLine(xPos, yPos, prevPointX + halfWidth, prevPointY + halfHeight, pointX + halfWidth, pointY + halfHeight, Math.max(strokeWidth / 2, Math.min(4 / this.editor.zoom, 8))) == true) {
            await this.editor.history.push("add", [render]);
            let updateAnno = { _id: annoID, remove: true };
            await this.editor.save.push(updateAnno);
            this.PUBLISH.u = updateAnno;
            await this.editor.realtime.forceShort();
            delete this.PUBLISH.u;
            continue;
          }
        }
      }

      if (x0 == x1 && y0 == y1) {
        break;
      }
      
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
    this.x0 = x1;
    this.y0 = y1;
  }
  clickEnd = () => {
    this.erasing = false;
    this.x0 = null;
    this.y0 = null;
    this.editor.usingStylus = false;
  }
  activate = () => {
    if (this.editor.options.stylusmode != true) {
      this.TOUCH_ACTION = "pinch-zoom";
    } else {
      this.editor.pinchZoomDisable = true;
    }
  }
  disable = this.clickEnd;
}

modules["editor/toolbar/placement"] = class {
  PROPERTIES = {};
  USER_SELECT = "none";
  TOUCH_ACTION = "pinch-zoom";
  REALTIME_TOOL = 4;
  MOUSE = { type: "svg", url: "./images/editor/cursors/insert.svg", translate: { x: 20, y: 20 } };
  PUBLISH = {};

  clickMove = async (event) => {
    if (this.annotation == null) {
      if (event != null && this.editor.isEditorContent(event.target) != true) {
        return;
      }
      if (this.activate != null) {
        this.activate();
      }
      this.annotation = {
        render: this.PROPERTIES,
        animate: false
      };
    }
    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.mouseX = mouseX;
      this.mouseY = mouseY;
    }
    if (this.mouseX == null || this.mouseY == null) {
      return;
    }
    let position = this.editor.utils.scaleToDoc(this.mouseX, this.mouseY);
    this.annotation.render.p = [
      this.editor.math.round(position.x - (this.annotation.render.s[0] / 2)),
      this.editor.math.round(position.y - (this.annotation.render.s[1] / 2))
    ];
    await this.editor.render.create(this.annotation);
    if (this.annotation.render.textfit == true) {
      let textElem = this.annotation.element.querySelector("div[text]");
      if (textElem != null) {
        if (this.annotation.render.remove == true) {
          this.annotation.element.style.opacity = 0;
          this.annotation.element.removeAttribute("hidden");
        }
        this.annotation.render.s = [textElem.offsetWidth, textElem.offsetHeight];
        if (this.annotation.render.remove == true) {
          delete this.annotation.render.remove;
          await this.clickMove();
        }
      }
    }
    this.editor.selecting["cursor"] = this.annotation.render;
  }
  scroll = () => { this.clickMove(); }
  clickEnd = async (event) => {
    if (this.annotation == null) {
      return;
    }
    if (event != null && this.editor.isEditorContent(event.target) == true) {
      this.annotation.render._id = this.editor.render.tempID();

      await this.editor.save.push(this.annotation.render);
      await this.editor.history.push("remove", [{ _id: this.annotation.render._id }]);

      this.editor.selecting[this.annotation.render._id] = { ...this.annotation.render, done: true };
      await this.editor.realtime.forceShort();
      delete this.editor.selecting["cursor"];

      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="selection"]'));
      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="select"]'));
      this.editor.selecting[this.annotation.render._id] = {};
      this.parent.selection.updateBox();

      if (this.TARGET_QUERY != null) {
        this.parent.selection.clickAction({
          target: this.editor.page.querySelector(this.TARGET_QUERY),
          clearText: true
        });
      }
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
  }
}

modules["editor/toolbar/text"] = class extends modules["editor/toolbar/placement"] {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="editor/toolbar/textedit"]';

  activate = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "text",
      s: [0, 0],
      c: toolPreference.color.selected,
      l: this.editor.maxLayer + 1,
      t: toolPreference.thickness,
      o: toolPreference.opacity,
      d: { s: toolPreference.size, al: toolPreference.align, b: ["Example Text"] },
      remove: true,
      textfit: true
    };
  }
}

modules["editor/toolbar/resize_placement"] = class {
  ACTIVE = true;
  PROPERTIES = {};
  RENDER_INSERT = {};
  CAN_FLIP = true;
  MINIMUM_SIZE = 0;
  USER_SELECT = "none";
  TOUCH_ACTION = "pinch-zoom";
  REALTIME_TOOL = 4;
  MOUSE = { type: "svg", url: "./images/editor/cursors/insert.svg", translate: { x: 20, y: 20 } };
  PUBLISH = {};

  clickStart = async (event) => {
    if (this.ACTIVE == false) {
      return;
    }
    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
      this.startX = position.x;
      this.startY = position.y;
    }
  }
  clickMove = async (event) => {
    if (this.ACTIVE == false) {
      return this.clickEnd();
    }
    if (this.annotation == null) {
      if (event != null && this.editor.isEditorContent(event.target) != true) {
        return;
      }
      if (this.activate != null) {
        this.activate();
      }
      this.annotation = {
        render: this.PROPERTIES,
        animate: false
      };
      this.resizeActive = false;
      this.startX = null;
      this.startY = null;
      this.width = this.width ?? this.annotation.render.s[0];
      this.height = this.height ?? this.annotation.render.s[1];
    }
    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.mouseX = mouseX;
      this.mouseY = mouseY;
    }
    if (this.mouseX == null || this.mouseY == null) {
      return;
    }
    let position = this.editor.utils.scaleToDoc(this.mouseX, this.mouseY);
    this.endX = position.x;
    this.endY = position.y;
    let thickness = this.annotation.render.t ?? 0;
    let halfThickness = thickness / 2;
    this.annotation.render.p = [(this.startX ?? this.endX) - halfThickness, (this.startY ?? this.endY) - halfThickness];
    if (this.resizeActive == true || Math.abs(this.endX - (this.startX ?? this.endX)) > 10 / this.editor.zoom || Math.abs(this.endY - (this.startY ?? this.endY)) > 10 / this.editor.zoom) {
      this.resizeActive = true;
      let setX = this.endX - this.startX;
      if (setX >= 0) {
        setX = this.editor.math.round(Math.max(setX, this.MINIMUM_SIZE));
      } else {
        setX = this.editor.math.round(Math.min(setX, -this.MINIMUM_SIZE));
      }
      let setY = this.endY - this.startY;
      if (setY >= 0) {
        setY = this.editor.math.round(Math.max(setY, this.MINIMUM_SIZE));
      } else {
        setY = this.editor.math.round(Math.min(setY, -this.MINIMUM_SIZE));
      }
      if (event != null) {
        this.shiftKey = event.shiftKey;
      }
      if (this.shiftKey == true || this.EVEN_SCALE == true) {
        let changeX = setX / (this.width ?? setX);
        let changeY = setY / (this.height ?? setY);
        if (Math.abs(changeX) > Math.abs(changeY)) {
          if (changeX >= 0) {
            setY = Math.max(this.height * changeX, this.MINIMUM_SIZE);
          } else {
            setY = Math.min(this.height * changeX, -this.MINIMUM_SIZE);
          }
        } else {
          if (changeY >= 0) {
            setX = Math.max(this.width * changeY, this.MINIMUM_SIZE);
          } else {
            setX = Math.min(this.width * changeY, -this.MINIMUM_SIZE);
          }
        }
      }
      if (this.CAN_FLIP != false) {
        if (setX < 0) {
          this.annotation.render.p[0] += thickness;
        }
        if (setY < 0) {
          this.annotation.render.p[1] += thickness;
        }
        this.annotation.render.s = [setX, setY];
      } else {
        this.annotation.render.s = [Math.abs(setX), Math.abs(setY)];
        if (setX < 0) {
          this.annotation.render.p[0] += setX;
        }
        if (setY < 0) {
          this.annotation.render.p[1] += setY;
        }
      }
    }
    let renderObject = { ...this.annotation, render: { ...this.annotation.render, ...this.RENDER_INSERT } };
    await this.editor.render.create(renderObject);
    this.annotation.element = renderObject.element;
    this.editor.selecting["cursor"] = this.annotation.render;
  }
  scroll = () => { this.clickMove(); }
  clickEnd = async (event) => {
    if (this.annotation == null) {
      return;
    }
    if (event != null && (this.editor.isEditorContent(event.target) == true || this.resizeActive == true)) {
      this.annotation.render._id = this.editor.render.tempID();
      
      await this.editor.save.push(this.annotation.render);
      await this.editor.history.push("remove", [{ _id: this.annotation.render._id }]);

      this.editor.selecting[this.annotation.render._id] = { ...this.annotation.render, done: true };
      await this.editor.realtime.forceShort();
      delete this.editor.selecting["cursor"];

      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="selection"]'));
      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="select"]'));
      this.editor.selecting[this.annotation.render._id] = {};
      this.parent.selection.updateBox();
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
  }
}

modules["editor/toolbar/shape"] = class extends modules["editor/toolbar/resize_placement"] {
  MINIMUM_SIZE = 25;
  
  activate = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "shape",
      s: [125, 125],
      c: toolPreference.color.selected,
      t: toolPreference.thickness,
      o: toolPreference.opacity,
      l: this.editor.maxLayer + 1,
      d: this.tool
    };
  }
}

modules["editor/toolbar/sticky"] = class extends modules["editor/toolbar/placement"] {
  activate = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "sticky",
      s: [220, 220],
      c: toolPreference.color.selected,
      l: this.editor.maxLayer + 1,
      sig: this.editor.self.name
    };
  }
}

modules["editor/toolbar/page"] = class extends modules["editor/toolbar/resize_placement"] {
  CAN_FLIP = false;
  MINIMUM_SIZE = 100;

  activate = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "page",
      c: toolPreference.color.selected,
      title: "Untitled Page",
      s: [200, 275],
      l: this.editor.minLayer - 1
    };
  }
}

modules["editor/toolbar/upload"] = class extends modules["editor/toolbar/resize_placement"] {
  ACTIVE = false;
  MINIMUM_SIZE = 100;
  EVEN_SCALE = true;

  activate = (extra) => {
    if (this.imageBlob != null) {
      return;
    }

    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "media",
      s: [200, 200],
      c: (toolPreference.color ?? {}).selected,
      o: toolPreference.opacity,
      l: this.editor.maxLayer + 1
    };

    let uploadInput = this.editor.contentHolder.querySelector(".eToolMediaInput");
    if (uploadInput != null) {
      uploadInput.remove();
    }
    this.editor.contentHolder.insertAdjacentHTML("beforeend", `<input class="eToolMediaInput" tooleditor type="file" accept="image/*" multiple="true" hidden="true">`);
    uploadInput = this.editor.contentHolder.querySelector(".eToolMediaInput");

    let reset = () => {
      this.annotation = null;
      this.imageBlob = null;
      let button = this.parent.toolbar.toolbar.querySelector('.eTool[module="editor/toolbar/upload"]');
      if (button != null) {
        button.removeAttribute("selected");
      }
      uploadInput.value = null;
      this.parent.disableTool();
    }
    let startImagePlace = async (file) => {
      if (connected == false) {
        reset();
        return alertModule.open("error", "<b>No Connection</b>Connect to the internet to upload media.");
      }
      if (file == null) {
        return;
      }
      if (file.kind == "file") {
        file = file.getAsFile();
      }
      if (file.kind != "string") {
        if (file.type.substring(0, 6) == "image/") {
          if (supportedImageTypes.includes(file.type.replace(/image\//g, "")) == true) {
            if (file.size < 10485760) { // 10 MB
              this.imageBlob = URL.createObjectURL(file);
              let image = new Image();
              image.onload = () => {
                this.width = Math.min(image.width, 400);
                this.height = image.height * (this.width / image.width);
                this.RENDER_INSERT = { d: this.PROPERTIES.d ?? this.imageBlob };
                if (this.resizeActive != true) {
                  this.PROPERTIES.s = [this.width, this.height];
                }
                this.ACTIVE = true;
              }
              image.src = this.imageBlob;
              let form = new FormData();
              form.append("media", file);
              let initBlob = this.imageBlob;
              let [code, result] = await sendRequest("POST", "lessons/save/upload", form, { noFileType: true, session: this.editor.session });
              let blobAnno = this.editor.contentHolder.querySelector('.eAnnotation[src="' + initBlob + '"]');
              if (code == 200) {
                let preload = new Image();
                preload.src = assetURL + result.file;
                preload.onload = () => {
                  if (blobAnno != null && blobAnno.hasAttribute("anno") == true) {
                    this.editor.save.push({ _id: blobAnno.getAttribute("anno"), d: result.file });
                  }
                  if (image.src == this.imageBlob) {
                    this.imageBlob = result.file;
                    this.PROPERTIES.d = result.file;
                  }
                  if (image.src == this.imageBlob) {
                    URL.revokeObjectURL(this.imageBlob);
                  }
                }
              } else {
                if (image.src == this.imageBlob) {
                  URL.revokeObjectURL(this.imageBlob);
                }
                if (blobAnno != null) {
                  if (blobAnno.hasAttribute("anno") == true) {
                    this.editor.save.push({ _id: blobAnno.getAttribute("anno"), remove: true });
                  } else {
                    blobAnno.remove();
                  }
                }
                reset();
              }
            } else {
              reset();
              alertModule.open("error", "<b>Image Too Large</b>10 MB is the file size limit.");
            }
          } else {
            reset();
            alertModule.open("error", `<b>Invalid Image Type</b>The following image types are supported: <i style='color: var(--darkGray)'>${(supportedImageTypes.join(", "))}</i>`);
          }
        } else {
          reset();
          alertModule.open("error", "<b>Invalid File Type</b>Only images are currently supported.");
        }
      }
      uploadInput.value = null;
    }
    uploadInput.addEventListener("change", async (event) => {
      startImagePlace((event.target.files ?? [])[0], event);
    });
    uploadInput.addEventListener("cancel", () => {
      reset();
      uploadInput.value = null;
    });
    if (extra == null || extra.file == null) {
      uploadInput.click();
    } else {
      startImagePlace(extra.file, extra.event);
    }
  }
}

modules["editor/toolbar/embed"] = class extends modules["editor/toolbar/placement"] {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="editor/toolbar/setembed"]';
  
  activate = () => {
    this.PROPERTIES = {
      f: "embed",
      s: [400, 350],
      l: this.editor.maxLayer + 1
    };
  }
}


// SUBTOOL MODULES //

modules["editor/toolbar/color"] = class {
  setToolbarButton = (button) => {
    button.innerHTML = `<div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div>`;
    //let holder = button.querySelector(".eSubToolColorHolder");
    let color = button.querySelector(".eSubToolColor");
    let preference = this.parent.getToolPreference();
    let selectedColor = (preference.color ?? {}).selected;
    let selectedOpacity = preference.opacity / 100;
    //holder.style.border = "solid 3px " + this.editor.utils.borderColorBackgroundRGBA(selectedColor, null, selectedOpacity);
    color.style.background = "#" + selectedColor;
    color.style.opacity = selectedOpacity;
    color.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(selectedColor);
  }
  setActionButton = (button) => {
    button.innerHTML = `<div class="eSubToolColorHolder"><div class="eSubToolColor"></div></div>`;
    let holder = button.querySelector(".eSubToolColorHolder");
    let color = holder.querySelector(".eSubToolColor");
    let preference = this.parent.getPreferenceTool();
    let selectedOpacity = (preference.o ?? 100) / 100;
    //holder.style.border = "solid 3px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
    color.style.background = "#" + preference.c;
    color.style.opacity = selectedOpacity;
    color.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c);
  }

  TOOLTIP = "Color";

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
    ".eSubToolColorSelector .eTool > div": `margin: 2px !important !important; border-radius: 8px !important`,
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
    ".eSubToolColorPickerType": `box-sizing: border-box; height: 22px; padding: 3px 6px; margin: 3px; --borderWidth: 3px; --borderRadius: 8px; font-size: 14px; font-weight: 700; color: var(--theme)`,
    ".eSubToolColorPickerType:after": `width: 100%; height: 100%`,
    ".eSubToolColorPickerField": `box-sizing: border-box; flex: 1; min-width: 0px; height: 28px; padding: 0; margin: 0 6px; border: solid 3px var(--secondary); outline: none; border-radius: 14px; font-family: var(--font); font-size: 14px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolColorPickerField::placeholder": `color: var(--hover)`
  };
  js = (frame) => {
    let editor = this.editor;
    let toolbar = this.toolbar;
    let isToolbar = this.isToolbar;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool;
    let colorPreference;
    let selectedColor;
    let updatePreference = () => {
      preferenceTool = toolbar.getPreferenceTool();
      colorPreference = toolbar.getAnnotationPreference().color ?? toolbar.getToolPreference().color;
      selectedColor = colorPreference.selected;
      if (preferenceTool.c != null) {
        selectedColor = preferenceTool.c;
      }
    }
    updatePreference();

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
          //let holder = button.querySelector(".eSubToolColorHolder");
          //holder.style.border = "solid 3px " + this.editor.utils.borderColorBackground(setColor);
          let color = button.querySelector(".eSubToolColor");
          color.style.background = "#" + setColor;
          color.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(setColor);
          if (isToolbar == true) {
            isSelected = setColor == colorPreference.selected;
          } else {
            isSelected = setColor == preferenceTool.c;
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
    this.redraw = () => {
      updatePreference();
      runColorSelections();
      if (colorSliderEnabled == true || colorGradientEnabled == true) {
        return;
      }
      ([h, s, v] = editor.utils.hexToHSV(selectedColor));
      updatePickerUI();
    };
    runColorSelections();

    let [h, s, v] = [];
    let colorGradientEnabled = false;
    let colorSliderEnabled = false;
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
          toolbar.activateTool();
        } else {
          await toolbar.saveSelecting(() => { return { c: selectedColor }; });
          let selected = selector.querySelector("button[selected]");
          if (selected != null) {
            selected.removeAttribute("selected");
          }
          element.setAttribute("selected", "");
        }
        toolbar.toolbar.updateButtons();
      } else if (element.hasAttribute("enablepicker") == true) {
        this.redraw();
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
          toolbar.selection.updateActionBar();
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
        toolbar.selection.updateActionBar();
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
      shadePointer.style.background = "#" + selectedColor;
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
    let updateStoredValues = async (hex, updateText, saveHistory) => {
      let newColor = hex ?? editor.utils.hsvToHex(h, s, v);
      if (selectedColor == newColor) {
        return updatePickerUI(updateText);
      }
      selectedColor = newColor;
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
      if (isToolbar == true) {
        toolbar.activateTool();
      } else {
        await toolbar.saveSelecting(() => { return { c: selectedColor }; }, { saveHistory: saveHistory == true });
      }
    }
    let eventGradientUpdate = (event) => {
      if (colorGradientEnabled == false) {
        return;
      }
      if (mouseDown() == false || shadeSliderHolder == null) {
        colorGradientEnabled = false;
        editor.pipeline.unsubscribe("colorSelectorMouse");
        return updateStoredValues();
      }
      let barRect = shadeSliderHolder.getBoundingClientRect();
      s = Math.ceil(Math.max(Math.min((clientPosition(event, "x") - barRect.x - 2) / shadeSliderHolder.offsetWidth, 1), 0) * 100);
      v = Math.ceil(Math.max(Math.min((shadeSliderHolder.offsetHeight - (clientPosition(event, "y") - barRect.y + 2)) / shadeSliderHolder.offsetHeight, 1), 0) * 100);
      updateStoredValues();
    }
    let gradientDown = (event) => {
      colorGradientEnabled = true;
      app.style.userSelect = "none";
      eventGradientUpdate(event);
      editor.pipeline.subscribe("colorSelectorMouse", "click_move", (data) => { eventGradientUpdate(data.event); });
      editor.pipeline.subscribe("colorSelectorMouse", "click_end", (data) => { eventGradientUpdate(data.event); });
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
        return updateStoredValues();
      }
      let barRect = colorSliderHolder.getBoundingClientRect();
      h = Math.ceil(Math.max(Math.min(((event.clientX ?? event.changedTouches[0].clientX) - barRect.x) / colorSliderHolder.offsetWidth, 1), 0) * 360);
      updateStoredValues();
    }
    let colorSliderDown = (event) => {
      colorSliderEnabled = true;
      eventColorUpdate(event);
      editor.pipeline.subscribe("colorSelectorMouse", "click_move", (data) => { eventColorUpdate(data.event); });
      editor.pipeline.subscribe("colorSelectorMouse", "click_end", (data) => { eventColorUpdate(data.event); });
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
          updateStoredValues(result.sRGBHex.substring(1), null, true);
        })
        .catch(() => { });
    });
  }
}

modules["editor/toolbar/thickness"] = class {
  setToolbarButton = (button) => {
    button.innerHTML = `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThicknessHolder"><div class="eSubToolThickness"></div></div></div>`;
    //let holder = button.querySelector(".eSubToolThicknessHolder");
    let thickness = button.querySelector(".eSubToolThickness");
    let preference = this.parent.getToolPreference();
    let selectedColor = (preference.color ?? {}).selected;
    let selectedOpacity = preference.opacity / 100;
    //holder.style.border = "solid 3px " + this.editor.utils.borderColorBackgroundRGBA(selectedColor, null, selectedOpacity);
    thickness.style.background = "#" + selectedColor;
    thickness.style.width = "44px";
    thickness.style.height = preference.thickness + "px";
    thickness.style.opacity = selectedOpacity;
    thickness.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(selectedColor);
  }
  setActionButton = (button) => {
    button.innerHTML = `<div class="eSubToolThicknessButtonHolder"><div class="eSubToolThicknessHolder"><div class="eSubToolThickness"></div></div></div>`;
    let holder = button.querySelector(".eSubToolThicknessHolder");
    let thickness = holder.querySelector(".eSubToolThickness");
    let preference = this.parent.getPreferenceTool();
    let selectedOpacity = (preference.o ?? 100) / 100;
    //holder.style.border = "solid 3px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
    thickness.style.background = "#" + preference.c;
    thickness.style.width = preference.t + "px";
    thickness.style.height = "44px";
    thickness.style.opacity = selectedOpacity;
    thickness.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c);
  }

  TOOLTIP = "Thickness";
  USER_SELECT = "none";

  html = `
  <div class="eSubToolThicknessFrame">
    <input class="eSubToolThicknessInput" name="Thickness">
    <div class="eSubToolThicknessSlider"><button></button></div>
  </div>
  `;
  css = {
    ".eSubToolThicknessButtonHolder": `position: relative; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; overflow: hidden`,
    ".eSubToolThicknessHolder": `position: absolute; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 14px`,
    ".eToolbarHolder[left] .eSubToolThicknessHolder": `margin-right: 16px`,
    ".eToolbarHolder[right] .eSubToolThicknessHolder": `margin-left: 16px`,
    ".eActionBar[top] .eSubToolThicknessHolder": `margin-top: 16px`,
    ".eActionBar[bottom] .eSubToolThicknessHolder": `margin-bottom: 16px`,
    ".eSubToolThickness": `border-radius: 10px`,

    ".eSubToolThicknessFrame": `box-sizing: border-box; display: flex; width: 188px; height: 50px; padding: 8px; align-items: center`,
    ".eSubToolThicknessInput": `width: 40px; height: 26px; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolThicknessInput::placeholder": `color: var(--hover)`,
    ".eSubToolThicknessSlider": `position: relative; flex: 1; height: 10px; margin: 0 4px 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolThicknessSlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolThicknessSlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolThicknessSlider button:active": `transform: scale(1.1) !important`
  };
  minValue = 1;
  maxValue = 40;
  exponentFactor = 1.4;
  js = (frame) => {
    let editor = this.editor;
    let toolbar = this.toolbar;
    let isToolbar = this.isToolbar;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool;
    let thicknessPreference;
    let selectedThickness;
    let updatePreference = () => {
      preferenceTool = toolbar.getPreferenceTool();
      thicknessPreference = toolbar.getAnnotationPreference().thickness ?? toolbar.getToolPreference().thickness;
      selectedThickness = thicknessPreference;
      if (preferenceTool.t != null) {
        selectedThickness = preferenceTool.t;
      }
    }
    updatePreference();

    let slider = frame.querySelector(".eSubToolThicknessSlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolThicknessInput");
    let sliderEnabled = false;
    let typing = false;
    let firstChange = true;
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
          toolbar.activateTool();
        } else {
          await toolbar.saveSelecting((render) => {
            return {
              t: selectedThickness,
              p: [
                render.p[0] + ((render.t - selectedThickness) / 2),
                render.p[1] + ((render.t - selectedThickness) / 2)
              ]
            };
          }, { reuseActionBar: true, saveHistory: firstChange });
          firstChange = false;
        }
      }
    }
    this.redraw = () => {
      if (sliderEnabled == true || typing == true) {
        return;
      }
      updatePreference();
      updateUI(null, true);
    };
    let eventBarUpdate = (event) => {
      if (sliderEnabled == false) {
        return;
      }
      if (mouseDown() == false || slider == null) {
        sliderEnabled = false;
        this.forceCurrentActionBar = false;
        //cursorModule.updateBox();
        editor.pipeline.unsubscribe("thicknessSelectorMouse");
        return;
      }
      let barRect = slider.getBoundingClientRect();
      let newThickness = Math.ceil(Math.pow((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0)), this.exponentFactor ?? 1) * (this.maxValue - this.minValue) + this.minValue);
      if (selectedThickness != newThickness) {
        selectedThickness = newThickness;
        updateUI();
      }
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      this.forceCurrentActionBar = true;
      firstChange = true;
      eventBarUpdate(event);
      editor.pipeline.subscribe("thicknessSelectorMouse", "click_move", (data) => { eventBarUpdate(data.event); });
      editor.pipeline.subscribe("thicknessSelectorMouse", "click_end", (data) => { eventBarUpdate(data.event); });
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", enableSlider, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedThickness;
      typing = true;
      this.forceCurrentActionBar = true;
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedThickness;
      typing = false;
      this.forceCurrentActionBar = false;
    });
    input.addEventListener("input", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedThickness;
      }
      selectedThickness = Math.max(Math.min(parseInt(value), this.maxValue), this.minValue);
      updateUI(false);
    });
    input.addEventListener("change", () => {
      let value = input.value.replace(/\D/g, "");
      if (value == "") {
        value = selectedThickness;
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
    if (opacity != null) {
      let svg = opacity.querySelector("svg");
      if (svg != null) {
        let preference = this.parent.getToolPreference();
        let selectedColor = (preference.color ?? {}).selected;
        let selectedOpacity = preference.opacity / 100;
        //opacity.style.border = "solid 3px " + this.editor.utils.borderColorBackgroundRGBA(selectedColor, null, selectedOpacity);
        svg.querySelector("path").style.opacity = selectedOpacity;
        svg.style.setProperty("--toolColor", "#" + selectedColor);
        svg.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(selectedColor, null, selectedOpacity);
      }
    }
  }
  setActionButton = async (button) => {
    button.innerHTML = `<div class="eSubToolOpacityHolder"></div>`;
    let opacity = button.querySelector(".eSubToolOpacityHolder");
    (async () => {
      await setSVG(opacity, "./images/editor/toolbar/opacity.svg");
      if (opacity != null) {
        let svg = opacity.querySelector("svg");
        if (svg != null) {
          let preference = this.parent.getPreferenceTool();
          let selectedOpacity = (preference.o ?? 100) / 100;
          //opacity.style.border = "solid 3px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
          svg.querySelector("path").style.opacity = selectedOpacity;
          svg.style.setProperty("--toolColor", "#" + preference.c);
          svg.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
        }
      }
    })();
  }

  TOOLTIP = "Opacity";

  USER_SELECT = "none";

  html = `
  <div class="eSubToolOpacityFrame">
    <input class="eSubToolOpacityInput" name="Thickness">
    <div class="eSubToolOpacitySlider"><button></button></div>
  </div>
  `;
  css = {
    ".eSubToolOpacityHolder": `box-sizing: border-box; display: flex; width: 34px; height: 34px; margin: 4px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 18px; justify-content: center; align-items: center`,
    ".eSubToolOpacityHolder svg": `width: 100%; height: 100%; border-radius: 14px`,

    ".eSubToolOpacityFrame": `box-sizing: border-box; display: flex; width: 188px; height: 50px; padding: 8px; align-items: center`,
    ".eSubToolOpacityInput": `width: 40px; height: 26px; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
    ".eSubToolOpacitySlider": `position: relative; flex: 1; height: 10px; margin: 0 4px 0 12px; background: var(--hover); border-radius: 5px; touch-action: none`,
    ".eSubToolOpacitySlider button": `position: absolute; width: 20px; height: 20px; padding: 0px; margin: 0px; top: -5px; background: var(--theme); box-shadow: var(--lightShadow); border: solid 5px var(--secondary); border-radius: 10px; transition: transform .2s`,
    ".eSubToolOpacitySlider button:hover": `transform: scale(1.2) !important`,
    ".eSubToolOpacitySlider button:active": `transform: scale(1.1) !important`
  };
  minValue = 10;
  maxValue = 100;
  js = (frame) => {
    let editor = this.editor;
    let toolbar = this.toolbar;
    let isToolbar = this.isToolbar;
    let selecting = editor.selecting;
    let selectKeys = Object.keys(selecting);
    let shouldSave = isToolbar == true || selectKeys.length == 1;
    let preferenceTool;
    let opacityPreference;
    let selectedOpacity;
    let updatePreference = () => {
      preferenceTool = toolbar.getPreferenceTool();
      opacityPreference = toolbar.getAnnotationPreference().opacity ?? toolbar.getToolPreference().opacity;
      selectedOpacity = opacityPreference;
      if (preferenceTool.t != null) {
        selectedOpacity = preferenceTool.o;
      }
    }
    updatePreference();

    let slider = frame.querySelector(".eSubToolOpacitySlider");
    let pointer = slider.querySelector("button");
    let input = frame.querySelector(".eSubToolOpacityInput");
    let sliderEnabled = false;
    let typing = false;
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
          toolbar.activateTool();
        } else {
          await toolbar.saveSelecting(() => { return { o: selectedOpacity } }, { saveHistory: firstChange });
          firstChange = false;
        }
      }
    }
    this.redraw = () => {
      if (sliderEnabled == true || typing == true) {
        return;
      }
      updatePreference();
      updateUI();
    };
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
      let newOpacity = Math.ceil(Math.pow((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (slider.offsetWidth - 10), 1), 0)), this.exponentFactor ?? 1) * (this.maxValue - this.minValue) + this.minValue);
      if (selectedOpacity != newOpacity) {
        selectedOpacity = newOpacity;
        updateUI();
      }
    }
    let enableSlider = (event) => {
      sliderEnabled = true;
      firstChange = true;
      eventBarUpdate(event);
      editor.pipeline.subscribe("opacitySelectorMouse", "click_move", (data) => { eventBarUpdate(data.event); });
      editor.pipeline.subscribe("opacitySelectorMouse", "click_end", (data) => { eventBarUpdate(data.event); });
    }
    slider.addEventListener("mousedown", enableSlider);
    slider.addEventListener("touchstart", enableSlider, { passive: true });
    input.addEventListener("focus", () => {
      input.value = "";
      input.placeholder = selectedOpacity;
      typing = true;
      firstChange = true;
    });
    input.addEventListener("blur", () => {
      input.value = selectedOpacity;
      typing = false;
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


// ACTION BAR MODULES //

modules["editor/toolbar/delete"] = class {
  setActionButton = async (button) => {
    button.parentElement.style.setProperty("--hoverColor", "var(--error");
    button.parentElement.style.setProperty("--hoverTooltip", "var(--error");
    setSVG(button, "./images/editor/toolbar/delete.svg");
  }

  TOOLTIP = "Delete";
  ADD_DIVIDE_BEFORE = true;
  FULL_CLICK = true;

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { remove: true }; });
  }
};

modules["editor/toolbar/more"] = class {
  setActionButton = async (button) => {
    button.parentElement.setAttribute("dropdowntitle", "More");
    setSVG(button, "./images/editor/toolbar/more.svg");
  }

  TOOLTIP = "More";
  FULL_CLICK = true;
  SHOW_ON_LOCK = true;

  duplicate = async (handle) => {
    let selectKeys = Object.keys(this.editor.selecting);
    let checkChunks = {};
    let saveAnnoData = [];
    let parentIDs = {};
    let maxZIndex;
    let minZIndex;
    let offsetX = 50;
    let offsetY = 50;

    if (handle != null) {
      offsetX = 0;
      offsetY = 0;
      if (this.parent.selection.rotation == 0) {
        switch (handle) {
          case "duplicateleft":
            offsetX -= (this.parent.selection.maxX - this.parent.selection.minX) + 34;
            break;
          case "duplicateright":
            offsetX += (this.parent.selection.maxX - this.parent.selection.minX) + 34;
            break;
          case "duplicatetop":
            offsetY -= (this.parent.selection.maxY - this.parent.selection.minY) + 34;
            break;
          case "duplicatebottom":
            offsetY += (this.parent.selection.maxY - this.parent.selection.minY) + 34;
        }
      } else {
        switch (handle) {
          case "duplicateleft":
            offsetX -= (this.parent.selection.lastRect.endX - this.parent.selection.lastRect.x) + 34;
            break;
          case "duplicateright":
            offsetX += (this.parent.selection.lastRect.endX - this.parent.selection.lastRect.x) + 34;
            break;
          case "duplicatetop":
            offsetY -= (this.parent.selection.lastRect.endY - this.parent.selection.lastRect.y) + 34;
            break;
          case "duplicatebottom":
            offsetY += (this.parent.selection.lastRect.endY - this.parent.selection.lastRect.y) + 34;
        }
        [offsetX, offsetY] = this.editor.math.rotatePoint(offsetX, offsetY, this.parent.selection.rotation);
      }
    }

    for (let i = 0; i < selectKeys.length; i++) {
      let annoID = selectKeys[i];
      let render = (this.editor.annotations[annoID] ?? {}).render;
      if (render == null || this.parent.checkSubToolEnabled(render.f) == false) {
        continue;
      }
      let addChunks = this.editor.utils.chunksFromAnnotation(render);
      for (let c = 0; c < addChunks.length; c++) {
        checkChunks[addChunks[c]] = true;
      }
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? this.editor.utils.minLayer);
      let tempID = this.editor.render.tempID();
      parentIDs[annoID] = tempID;
      saveAnnoData.push({ ...copyObject(render), _id: tempID });
    }

    let annotations = this.editor.utils.annotationsInChunks(Object.keys(checkChunks));
    for (let i = 0; i < annotations.length; i++) {
      let annotation = annotations[i] ?? {};
      if (annotation.pointer != null) {
        annotation = this.editor.annotations[annotation.pointer];
      }
      let render = annotation.render;
      if (render == null || this.editor.selecting[render._id] != null || this.parent.checkSubToolEnabled(render.f) == false) {
        continue;
      }
      let { selectingParent } = this.editor.utils.getRect(render);
      if (selectingParent == false) {
        continue;
      }
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? this.editor.utils.minLayer);
      let tempID = this.editor.render.tempID();
      parentIDs[render._id] = tempID;
      saveAnnoData.push({ ...copyObject(render), _id: tempID });
    }

    maxZIndex++;
    this.editor.selecting = {};
    for (let i = 0; i < saveAnnoData.length; i++) {
      let newAnno = saveAnnoData[i];
      let checkParent = parentIDs[newAnno.parent];
      if (checkParent != null) {
        newAnno.parent = checkParent;
      } else {
        let { annoX, annoY, rotation } = this.editor.utils.getRect(newAnno);
        delete newAnno.parent;
        newAnno.p = [annoX + offsetX, annoY + offsetY];
        newAnno.r = rotation;
      }
      newAnno.l = maxZIndex + ((newAnno.l ?? this.editor.utils.maxLayer) - minZIndex);
      delete newAnno.m;
      delete newAnno.lock;
      this.editor.selecting[newAnno._id] = newAnno;
    }

    this.parent.selection.action = "save";
    await this.parent.selection.endAction();
  }
  lock = async () => {
    await this.toolbar.saveSelecting(() => { return { lock: true }; }, { redraw: true });
  }
  bringToFront = async () => {
    let newLayers = {};
    let selectKeys = Object.keys(this.editor.selecting);
    selectKeys.sort((a, b) => {
      let selectA = (this.editor.annotations[a] ?? {}).render ?? {};
      let selectB = (this.editor.annotations[b] ?? {}).render ?? {};
      return (selectA.l ?? selectA.sync) - (selectB.l ?? selectB.sync);
    });
    for (let i = 0; i < selectKeys.length; i++) {
      this.editor.maxLayer++;
      newLayers[selectKeys[i]] = this.editor.maxLayer;
    }
    await this.toolbar.saveSelecting((render) => { return { l: newLayers[render._id] ?? render.l }; });
  }
  sendToBack = async () => {
    let newLayers = {};
    let selectKeys = Object.keys(this.editor.selecting);
    selectKeys.sort((a, b) => {
      let selectA = (this.editor.annotations[a] ?? {}).render ?? {};
      let selectB = (this.editor.annotations[b] ?? {}).render ?? {};
      return (selectB.l ?? selectB.sync) - (selectA.l ?? selectA.sync);
    });
    for (let i = 0; i < selectKeys.length; i++) {
      this.editor.minLayer++;
      newLayers[selectKeys[i]] = this.editor.minLayer;
    }
    await this.toolbar.saveSelecting((render) => { return { l: newLayers[render._id] ?? render.l }; });
  }
  copyLink = () => {
    let id = Object.keys(this.editor.selecting)[0];
    if (id == null || id.startsWith("pending_") == true) {
      return;
    }
    copyClipboardText("https://markify.link/join?lesson=" + this.editor.lesson.id + "&annotation=" + id, "link");
  }
  js = async () => {
    dropdownModule.open(this.button, "dropdowns/editor/toolbar/more", { parent: this });
  }
};
modules["dropdowns/editor/toolbar/more"] = class {
  html = `
  <button class="eToolbarMoreAction" option="duplicate" close title="Duplicate"><img src="./images/editor/duplicate.svg">Duplicate</button>
  <button class="eToolbarMoreAction" option="lock" close title="Lock to prevent editing."><img src="./images/editor/lock.svg">Lock</button>
  <div class="eToolbarMoreLine" option="layers"></div>
  <button class="eToolbarMoreAction" option="bringfront" close title="Bring Forward"><img src="./images/editor/rearrange/up.svg">Bring to Front</button>
  <button class="eToolbarMoreAction" option="sendback" close title="Send Backward"><img src="./images/editor/rearrange/down.svg">Send to Back</button>
  <div class="eToolbarMoreLine" option="duplicate"></div>
  <button class="eToolbarMoreAction" option="copylink" close title="Copy a share link to element." style="--themeColor: var(--secondary)"><img src="./images/tooltips/copy.svg">Copy Link</button>
  `;
  css = {
    ".eToolbarMoreAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eToolbarMoreAction:not(:last-child)": `margin-bottom: 4px`,
    ".eToolbarMoreAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: #fff; border-radius: 4px`,
    ".eToolbarMoreAction:hover": `background: var(--themeColor); color: #fff`,
    ".eToolbarMoreLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".eToolbarMoreShowMe": `color: var(--theme); font-weight: 700`
  };
  js = async (frame, { parent }) => {
    
    let duplicateButton = frame.querySelector('.eToolbarMoreAction[option="duplicate"]');
    let duplicateLine = frame.querySelector('.eToolbarMoreLine[option="duplicate"]');
    duplicateButton.addEventListener("click", () => { parent.duplicate(); });

    let lockButton = frame.querySelector('.eToolbarMoreAction[option="lock"]');
    lockButton.addEventListener("click", () => { parent.lock(); });

    let layersLine = frame.querySelector('.eToolbarMoreLine[option="layers"]');
    let frontButton = frame.querySelector('.eToolbarMoreAction[option="bringfront"]');
    frontButton.addEventListener("click", () => { parent.bringToFront(); });
    let backButton = frame.querySelector('.eToolbarMoreAction[option="sendback"]');
    backButton.addEventListener("click", () => { parent.sendToBack(); });

    let shareButton = frame.querySelector('.eToolbarMoreAction[option="copylink"]');
    shareButton.addEventListener("click", () => { parent.copyLink(); });

    parent.redraw = () => {
      if (frame == null) {
        return;
      }
      let showLock = parent.editor.self.access > 0;
      let pending = false;
      if (showLock != false) {
        let selectKeys = Object.keys(parent.editor.selecting);
        for (let i = 0; i < selectKeys.length; i++) {
          let annotation = parent.editor.annotations[selectKeys[i]];
          let render = annotation.render ?? annotation.revert ?? {};
          if (render._id.startsWith("pending_") == true) {
            pending = true;
          }
          if (parent.editor.utils.canMemberModify(render) == false || parent.editor.utils.isLocked(render) == true) {
            showLock = false;
          }
        }
      }
      if (showLock == true) {
        lockButton.style.display = "flex";
        layersLine.style.display = "block";
        frontButton.style.display = "flex";
        backButton.style.display = "flex";
      } else {
        lockButton.style.display = "none";
        layersLine.style.display = "none";
        frontButton.style.display = "none";
        backButton.style.display = "none";
      }
      if (parent.editor.self.access > 0) {
        duplicateButton.style.display = "flex";
        duplicateLine.style.display = "block";
      } else {
        duplicateButton.style.display = "none";
        duplicateLine.style.display = "none";
      }
      if (pending == false) {
        shareButton.removeAttribute("disabled");
      } else {
        shareButton.setAttribute("disabled", "");
      }
    }
    parent.redraw();
  }
}