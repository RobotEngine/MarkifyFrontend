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
        <button class="eTool" tool="understrike" tooltip="Underline" module="editor/toolbar/understrike"><div></div></button>
        <div class="eDivider"></div>
        <button class="eTool" option="color" tooltip="Color" module="editor/toolbar/color"><div></div></button>
        <button class="eTool" option="thickness" tooltip="Thickness" module="editor/toolbar/thickness"><div></div></button>
        <button class="eTool" option="opacity" tooltip="Opacity" module="editor/toolbar/opacity"><div></div></button>
      </div>`
    },
    "erase": { id: "erase", type: "tool", module: "editor/toolbar/eraser" },
    "text": { id: "text", type: "tool", module: "editor/toolbar/text" },
    "shape": {
      html: `<div class="eVerticalToolsHolder eVerticalToolsShapeContainer">
        <button class="eTool" tool="square" tooltip="Square" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="ellipse" tooltip="Ellipse" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="triangle" tooltip="Triangle" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="parallelogram" tooltip="Parallelogram" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="trapezoid" tooltip="Trapezoid" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="rhombus" tooltip="Rhombus" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="star" tooltip="Star" module="editor/toolbar/shape/star"><div></div></button>
        <button class="eTool" tool="arrow" tooltip="Arrow" module="editor/toolbar/shape/arrow"><div></div></button>
        <button class="eTool" tool="heart" tooltip="Heart" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="oval" tooltip="Oval" module="editor/toolbar/shape/oval"><div></div></button>
        <button class="eTool" tool="speech" tooltip="Speech" module="editor/toolbar/shape"><div></div></button>
        <button class="eTool" tool="polygon" tooltip="Polygon" module="editor/toolbar/shape/polygon"><div></div></button>
        <button class="eTool" tool="line" tooltip="Line" module="editor/toolbar/shape"><div></div></button>
      </div>`
    },
    "sticky": { id: "sticky", type: "tool", module: "editor/toolbar/sticky" },
    "comment": { id: "comment", type: "tool", module: "editor/toolbar/comment" },
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
  eventListenerStorage = [];
  clearEventListeners = () => {
    for (let i = 0; i < this.eventListenerStorage.length; i++) {
      let remEvent = this.eventListenerStorage[i];
      if (remEvent.type == "event" && remEvent.parent != null) {
        remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
      }
    }
  }
  addEventListener = (name, parent, listener) => {
    if (parent == null) {
      return;
    }
    this.eventListenerStorage.push({ type: "event", name, parent, listener });
    parent.addEventListener(name, listener);
  }
  css = {
    ".eToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,
    ".eToolbar": `position: absolute; display: block; width: 50px; height: fit-content; max-height: var(--maxToolbarHeight); top: 50%; transform: translateY(-50%); z-index: 2; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; transition: transform .4s, opacity .4s, border-radius .2s`,
    ".eToolbar[hidden]": `transform: translate(var(--translate), -50%) !important; z-index: 1 !important`,
    ".eToolbarContent": `position: relative; box-sizing: border-box; max-height: var(--maxToolbarHeight); background: var(--pageColor); overflow: auto; z-index: 3; border-radius: inherit`,
    ".eToolbarHolder[left] .eToolbar": `--translate: -100%; left: 0px; border-radius: 0 12px 12px 0; transform-origin: left center`,
    ".eToolbarHolder[right] .eToolbar": `--translate: 100%; right: 0px; border-radius: 12px 0 0 12px; transform-origin: right center`,
    ".eToolbarTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; z-index: 5; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`,
    ".eToolMediaInput": `position: absolute; display: block; left: 0px; top: 0px`,

    ".eToolbarHolder .eTool": `--hoverColor: var(--hover); display: flex; width: 50px; height: 46px; flex-shrink: 0; padding: 0; justify-content: center; align-items: center; transition: opacity .3s`,
    ".eActionBar .eTool": `--hoverColor: var(--hover); display: flex; width: 46px; height: 50px; flex-shrink: 0; padding: 0; justify-content: center; align-items: center; transition: opacity .3s`,
    ".eTool[hidden]": `display: none !important`,
    ".eTool > *": `pointer-events: none`,
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
    ".eVerticalToolsHolder": `display: flex; flex-wrap: wrap; width: 50px; padding: 2px 0; justify-content: center; scrollbar-width: none`,
    ".eVerticalToolsHolder::-webkit-scrollbar": `display: none`,
    ".eHorizontalToolsHolder": `display: flex; padding: 0 2px; align-items: center; scrollbar-width: none`,
    ".eHorizontalToolsHolder::-webkit-scrollbar": `display: none`,

    ".eVerticalToolsShapeContainer": `width: 92px !important; padding: 2px !important`,
    ".eVerticalToolsShapeContainer > .eTool": `width: 46px !important`,

    ".eSideMenu": `position: absolute; display: flex; flex-direction: column; width: fit-content; max-width: calc(100% - 8px); height: fit-content; max-height: var(--maxToolbarHeight); top: 50%; z-index: 3; transform: translate(var(--translate), -50%); opacity: 0; background: var(--pageColor); box-shadow: var(--lightShadow); overflow: hidden; pointer-events: all; transition: transform .4s, opacity .4s, border-radius .2s`,
    ".eToolbarHolder[left] .eSideMenu": `--translate: 100%; right: 0px; border-radius: 12px 0 0 12px; transform-origin: right center`,
    ".eToolbarHolder[right] .eSideMenu": `--translate: -100%; left: 0px; border-radius: 0 12px 12px 0; transform-origin: left center`,
    ".eSideMenu .eSideMenuHeader": `display: flex; padding: 6px; gap: 6px; justify-content: space-between`,
    ".eSideMenu .eSideMenuHeaderTitle": `box-sizing: border-box; padding: 4px; flex: 1; max-width: fit-content; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; font-weight: 500; font-size: 18px`,
    ".eSideMenu .eSideMenuHeaderClose": `position: relative; width: 22px; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 14px`,
    ".eSideMenu .eSideMenuHeaderClose svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eSideMenu .eSideMenuContent": `box-sizing: border-box; min-width: fit-content; width: 100%; height: min-content; max-height: calc(var(--maxToolbarHeight) - 42px); overflow: auto; border-bottom-left-radius: inherit; border-bottom-right-radius: inherit`,

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
    '.eSelect[showonlywidth] .eSelectHandle[move]': `opacity: 1; pointer-events: all`,
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

    let toolbarHolder = page.querySelector("div[toolbarholder]");
    let toolbar = toolbarHolder.querySelector(".eToolbar[editor]");
    let toolbarContent;

    if (toolbar != null) {
      toolbar.innerHTML = `
      <div class="eToolbarContent eVerticalToolsHolder hideScroll">
        <button class="eTool" tool="selection" tooltip="Selection" selected><div></div></button>
        <button class="eTool" tool="draw" tooltip="Draw"><div></div></button>
        <button class="eTool" tool="markup" tooltip="Markup"><div></div></button>
        <button class="eTool" tool="erase" tooltip="Erase"><div></div></button>
        <button class="eTool" tool="text" tooltip="Text Box"><div></div></button>
        <button class="eTool" tool="shape" tooltip="Shapes"><div></div></button>
        <button class="eTool" tool="sticky" tooltip="Stickies"><div></div></button>
        <button class="eTool" tool="comment" tooltip="Comments"><div></div></button>
        <button class="eTool" tool="page" tooltip="Page"><div></div></button>
        <button class="eTool" tool="media" tooltip="Media"><div></div></button>
      </div>
      `;
      toolbarContent = toolbar.querySelector(".eToolbarContent");
    }

    toolbarHolder.removeAttribute("hidden");

    let contentHolder = editor.contentHolder;
    let content = editor.content;
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
    let tooltipElement;
    let tooltipText;
    this.tooltip = {};
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
          if (subToolbar != null && subToolbar.hasAttribute("open") == true) {
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
          if (subToolbar != null && subToolbar.hasAttribute("open") == true) {
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
          tooltipText.style.top = -tooltipText.offsetHeight - 6 + "px";
        } else {
          // Show tooltip on the bottom
          tooltipText.style.transformOrigin = "center top";
          tooltipText.style.top = tooltipText.parentElement.offsetHeight + 6 + "px";
        }
        return;
      }

      let actionRect = actionContainer.getBoundingClientRect();
      if (tooltipText.parentElement.hasAttribute("top") == true) {
        if (actionRect.top - tooltipText.offsetHeight - 6 > editor.scrollOffset + 8) {
          tooltipText.style.transformOrigin = "center bottom";
          tooltipText.style.top = -actionContainer.offsetHeight - tooltipText.offsetHeight - 6 + "px";
        } else {
          tooltipText.style.transformOrigin = "center top";
          tooltipText.style.top = "4px";
        }
        return;
      }

      if (actionRect.top + actionContainer.offsetHeight + tooltipText.offsetHeight + 6 < page.offsetHeight - editor.scrollOffset - 8) {
        tooltipText.style.transformOrigin = "center top";
        tooltipText.style.top = tooltipText.parentElement.offsetHeight + actionContainer.offsetHeight + 6 + "px";
      } else {
        tooltipText.style.transformOrigin = "center bottom";
        tooltipText.style.top = actionContainer.offsetHeight - tooltipText.offsetHeight - 6 + "px";
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

    // Handle Side Menu:
    this.sidemenu = {};
    this.sidemenu.subscribe = (event, callback, extra) => {
      editor.pipeline.subscribe("sidemenu", event, callback, extra);
    }
    this.sidemenu.unsubscribe = (event) => {
      this.parent.pipeline.unsubscribe("sidemenu", event);
    }
    this.sidemenu.open = async (path, extra = {}) => {
      this.sidemenu.close();

      toolbarHolder.insertAdjacentHTML("beforeend", `<div class="eSideMenu" new>
        <div class="eSideMenuHeader">
          <div class="eSideMenuHeaderTitle">Testing</div>
          <button class="eSideMenuHeaderClose buttonAnim border"></button>
        </div>
        <div class="eSideMenuContent customScroll"></div>
      </div>`);
      this.sidemenu.frame = toolbarHolder.querySelector(".eSideMenu[new]");
      this.sidemenu.frame.removeAttribute("new");

      let closeButton = this.sidemenu.frame.querySelector(".eSideMenuHeaderClose");
      closeButton.addEventListener("click", this.sidemenu.close);
      setSVG(closeButton, "../images/tooltips/close.svg");

      let contentHolder = this.sidemenu.frame.querySelector(".eSideMenuContent");
      let newModule = await this.parent.setFrame(path, contentHolder, { ...extra, construct: { editor: editor, toolbar: this }, hideLoading: true });
      contentHolder.style.padding = (newModule.padding ?? 6) + "px";
      this.sidemenu.frame.querySelector(".eSideMenuHeaderTitle").innerHTML = extra.title ?? newModule.title ?? "";

      this.sidemenu.frame.offsetHeight;
      this.sidemenu.frame.style.zIndex = "4";
      this.sidemenu.frame.style.transform = "translate(0%, -50%)";
      this.sidemenu.frame.style.opacity = "1";

      return this.sidemenu;
    }
    this.sidemenu.close = () => {
      if (this.sidemenu.frame == null) {
        return;
      }
      let remFrame = this.sidemenu.frame;
      this.sidemenu.frame = null;
      (async () => {
        remFrame.style.zIndex = "3";
        remFrame.style.transform = "translate(var(--translate), -50%)";
        remFrame.style.opacity = "0";
        await sleep(400);
        if (remFrame != null) {
          remFrame.remove();
        }
      })();
      editor.pipeline.unsubscribe("sidemenu");
    }

    let currentMouseSVG;
    let cursorUpdatePromise;
    this.updateMouse = async (cursor) => {
      cursor = cursor ?? { type: "set" };
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
        let getCursorPromise = getSVG(cursor.url);
        cursorUpdatePromise = getCursorPromise;
        let setSVG = ((await getCursorPromise) ?? "").replace(/viewBox=/g, insertString + `" viewBox=`);
        if (setSVG != currentMouseSVG && getCursorPromise == cursorUpdatePromise) {
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
        page.style.webkitUserSelect = module.USER_SELECT;
      } else {
        page.style.removeProperty("user-select");
        page.style.removeProperty("webkit-user-select");
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

      this.sidemenu.close();

      let newModule;
      if (this.currentToolModulePath != null) {
        newModule = await this.newModule(this.currentToolModulePath);
      }
      this.currentToolModule = newModule ?? {};
      if (newModule != null) {
        newModule.editor = editor;
        newModule.toolbar = this;
        newModule.tool = currentSubTool ?? currentTool;
        newModule.button = currentSubToolButton ?? currentToolButton;
        if (newModule.enable != null) {
          newModule.enable(extra ?? {});
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

          subToolbar.setAttribute("open", "");
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

          subSubToolbar.setAttribute("open", "");
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
    if (toolbarContent != null) {
      toolbarContent.addEventListener("scroll", () => { this.toolbar.update(); });
    }
    this.toolbar.updateButtons = async (contentHolder) => {
      let gottenTools = (contentHolder ?? toolbar).querySelectorAll(".eTool");
      for (let i = 0; i < gottenTools.length; i++) {
        let tool = gottenTools[i];
        let div = tool.querySelector("div");
        if (tool.hasAttribute("tool") == true) {
          let toolType = tool.getAttribute("tool");
          if (div.hasAttribute("loaded") == false) {
            setSVG(div, "../images/editor/toolbar/" + toolType + ".svg");
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
      currentSubTool = toolData.id;
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
              //currentSubTool = toolData.id;
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
      if (toolbarContent == null) {
        return;
      }

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
      page.style.setProperty("--maxToolbarHeight", toolbarHolder.offsetHeight + "px"); // Have to add this solution because FIREFOX
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
      this.toolbar.updateButtons();
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
        let annoModule = (await editor.render.getModule(original, selecting.f ?? original.render.f)) ?? {};

        let set = await setFunction(copyObject(original.render), annoModule);
        if (set == null) {
          continue;
        }
        if (editor.utils.isLocked(original.render) == true && editor.utils.isLocked({ ...selecting, ...set }) == true) {
          if (set.lock != null) {
            set = { lock: set.lock };
          } else {
            continue;
          }
        }
        if (editor.utils.isPlaceholderLocked(original.render) == true && editor.settings.editOthersWork != true) {
          let locks = editor.utils.getLocked(original.render);
          if (locks.includes("c") == false) {
            set.lock = [...locks, "c"];
            set.placeholder = editor.self.modify;
          }
        }
        let merged = { ...selecting, ...set };
        if (merged.d != null && typeof merged.d == "object") {
          merged.d = { ...original.render.d, ...merged.d };
        }
        if ((annoModule.AUTO_TEXT_FIT == true || annoModule.AUTO_SET_HEIGHT == true) && merged.remove != true) {
          await editor.render.create({ ...original, render: { ...original.render, ...merged }, animate: false });
          let renderedText = original.component.getElement().querySelector("div[edit]");
          if (renderedText != null) {
            merged.s = [(original.render.s ?? [])[0], (original.render.s ?? [])[1]];
            if (annoModule.AUTO_TEXT_FIT == true && original.render.textfit == true && selecting.textfit != false) {
              merged.s[0] = renderedText.offsetWidth + 6;
            }
            if (annoModule.AUTO_SET_HEIGHT == true ) {
              merged.s[1] = renderedText.offsetHeight + 6; //Math.max(select.s[1], renderedAnno.offsetHeight + 6);
            }
          }
        }
        let changes = false;
        let setKeys = Object.keys(merged);
        for (let c = 0; c < setKeys.length; c++) {
          let key = setKeys[c];
          if (merged[key] != original.render[key]) {
            changes = true;
            break;
          }
        }
        if (changes == false) {
          continue;
        }
        editor.selecting[annoid] = merged;
      }

      this.selection.action = "save";
      await this.selection.endAction({ redrawActionBar: false, fromHistory: options.saveHistory == false });
      if (options.redrawActionBar != false) {
        await this.selection.updateActionBar({ refreshActionBar: options.refreshActionBar ?? true, redrawActionBar: options.redrawActionBar, reuseActionBar: options.reuseActionBar, skipUpdate: options.reuseActionBar != true });
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
        if (annoData.component != null) {
          let annotation = annoData.component.getElement();
          if (annotation != null) {
            annotation.removeAttribute("selected");
            annoData.component.setAnimate(true);
            //annotation.style.removeProperty("overflow");
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
          if (annoData.component.SELECTION_END != null) {
            await annoData.component.SELECTION_END();
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

      this.selection.snapping = false;
      this.selection.showHandles = true;
      this.selection.showDuplicateHandles = true;
      this.selection.showOnlyWidthHandles = true;
      this.selection.showRotationHandle = false;

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

        if (editor.utils.canMemberModify(merged) != true || editor.utils.isLocked(merged) == true || editor.utils.isPlaceholderLocked(merged) == true) {
          this.selection.showHandles = false;
        }

        let annoModule = (await editor.render.getModule(annoData, merged.f)) ?? {};
        if (annoModule.CAN_BE_MULTISELECT == false && selections.length > 1) {
          delete editor.selecting[annoID];
          break;
        }
        if (annoModule.DISABLE_SNAPPING != true) {
          this.selection.snapping = true;
        }
        if (annoModule.SHOW_DUPLICATE_HANDLES != true) {
          this.selection.showDuplicateHandles = false;
        }
        if (annoModule.SHOW_ONLY_WIDTH_HANDLES != true) {
          this.selection.showOnlyWidthHandles = false;
        }
        if (annoModule.CAN_ROTATE != false) {
          this.selection.showRotationHandle = true;
        }
        if (annoModule.RESIZE_PRESERVE_ASPECT == true) {
          this.selection.resizePreserveAspect = true;
        }
        if (annoModule.SELECTION_FUNCTION != null) {
          annoModule.SELECTION_FUNCTION(this.selection, merged);
        }
        
        let annotation;
        if (annoData.component != null) {
          annotation = annoData.component.getElement();
        }
        if (annotation == null) {
          await editor.render.create(annoData);
          annotation = annoData.component.getElement();
        }
        if (annotation != null) {
          annotation.setAttribute("selected", "");
          annotation.style.borderRadius = (4 / editor.zoom) + "px";
          /*if (annoModule.ALLOW_SELECT_OVERFLOW != true) {
            annotation.style.overflow = "hidden";
          }*/
        }

        let select = this.selection.currentSelections[annoID];
        let collabSelect = realtimeHolder.querySelector('.eCollabSelect[anno="' + annoID + '"]');
        
        let transition = this.selection.action == null && options.transition != false;
        
        if (annoModule.DISPLAY_SELECT_BOX != false) {
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
        } else {
          options.hideSelectBox = true;
        }
        if (this.selection.currentSelections.hasOwnProperty(annoID) == false) {
          selectionChange = true;
          if (annoModule.SELECTION_START != null) {
            await annoModule.SELECTION_START();
          }
        }
        this.selection.currentSelections[annoID] = select;
        selectedAnnotations.push(annoID);

        if (transition == false) {
          if (select != null) {
            select.setAttribute("notransition", "");
          }
          if (annoData.component != null) {
            annoData.component.setAnimate(false);
          }
          if (collabSelect != null) {
            collabSelect.setAttribute("notransition", "");
          }
        } else {
          if (select != null) {
            select.removeAttribute("notransition");
          }
          if (annoData.component != null) {
            annoData.component.setAnimate(true);
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

        this.selection.checkX = (this.selection.checkX ?? 0) + rect.centerX;
        this.selection.checkY = (this.selection.checkY ?? 0) + rect.centerY;

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
            <div class="eSelectHandle" handle="movetop" move></div>
            <div class="eSelectHandle" handle="movebottom" move></div>
            <div class="eSelectHandle" handle="moveleft" move></div>
            <div class="eSelectHandle" handle="moveright" move></div>
            <svg class="eSelectHandle" handle="topleft" essential width="16" height="16" rotation="180" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 14V14C2 7.37258 7.37258 2 14 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="topright" width="16" height="16" rotation="270" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 14V14C14 7.37258 8.62742 2 2 2V2" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="bottomleft" width="16" height="16" rotation="90" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2V2C2 8.62742 7.37258 14 14 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="bottomright" essential width="16" height="16" rotation="0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 2V2C14 8.62742 8.62742 14 2 14V14" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="left" widthhandle width="12" height="28" rotation="135" viewBox="0 0 12 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="right" widthhandle width="12" height="28" rotation="315" viewBox="0 0 12 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 6V22" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="top" heighthandle width="28" height="12" rotation="225" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="bottom" heighthandle width="28" height="12" rotation="45" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6H6" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
            <svg class="eSelectHandle" handle="rotate" width="26" height="26" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.46244 9.45089C2.67045 10.2429 1.38612 10.2429 0.594123 9.45089C-0.197875 8.65884 -0.197875 7.37466 0.594123 6.58261L3.46244 9.45089ZM9.04395 3.86918L3.46244 9.45089L0.594123 6.58261L6.17562 1.0009L9.04395 3.86918Z" fill="var(--theme)"/> <path d="M14.6257 6.58261C15.4177 7.37466 15.4177 8.65884 14.6257 9.45089C13.8337 10.2429 12.5494 10.2429 11.7574 9.45089L14.6257 6.58261ZM9.04373 1.0009L14.6257 6.58261L11.7574 9.45089L6.17541 3.86918L9.04373 1.0009Z" fill="var(--theme)"/> <path d="M21.3783 19.0707C20.5863 18.2786 20.5863 16.9945 21.3783 16.2024C22.1703 15.4104 23.4546 15.4104 24.2466 16.2024L21.3783 19.0707ZM26.9603 24.6523L21.3783 19.0707L24.2466 16.2024L29.8281 21.7841L26.9603 24.6523Z" fill="var(--theme)"/> <path d="M24.2466 30.2341C23.4546 31.0261 22.1703 31.0261 21.3783 30.2341C20.5863 29.442 20.5863 28.1579 21.3783 27.3658L24.2466 30.2341ZM29.8281 24.6524L24.2466 30.2341L21.3783 27.3658L26.9603 21.7841L29.8281 24.6524Z" fill="var(--theme)"/> <path d="M7.63804 2.43607V10.0101C7.63804 17.2905 13.5396 23.1924 20.8203 23.1924H28.394" stroke="var(--theme)" stroke-width="4" stroke-linecap="round"/> </svg>
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
        
        if (this.selection.showHandles == true) {
          this.selection.selectBox.removeAttribute("hidehandles");

          if (this.selection.showDuplicateHandles != true) {
            this.selection.handlePadding = 24;
            this.selection.selectBox.removeAttribute("showduplicate");
          } else {
            this.selection.handlePadding = 60;
            this.selection.selectBox.setAttribute("showduplicate", "");
          }
          if (this.selection.showOnlyWidthHandles != true) {
            this.selection.selectBox.removeAttribute("showonlywidth");
          } else {
            this.selection.selectBox.setAttribute("showonlywidth", "");
          }
          if (this.selection.showRotationHandle == true) {
            this.selection.selectBox.removeAttribute("hiderotation");
          } else {
            this.selection.selectBox.setAttribute("hiderotation", "");
          }
        } else {
          this.selection.handlePadding = 24;
          this.selection.selectBox.setAttribute("hidehandles", "");
          this.selection.selectBox.removeAttribute("showduplicate");
          this.selection.selectBox.removeAttribute("showonlywidth");
          this.selection.selectBox.removeAttribute("hiderotation");
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

      if (options.redrawActionBar != false) {
        await this.selection.updateActionBar({ ...options, redrawActionBar: selectionChange || options.redraw == true || options.redrawActionBar == true });
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
        this.selection.selectBox != null && //Object.keys(this.selection.currentSelections).length > 0 &&
        (this.selection.action == null || this.selection.actionEnabled == false) &&
        options.hideSelectBox != true &&
        this.selection.saving != true
      );
      if (showSelectBox == true && removeActionBar == true) {
        removeActionBar = (
          this.selection.checkX == null || this.selection.checkY == null ||
          Math.floor(this.selection.checkX) != Math.floor(this.selection.lastCheckX) ||
          Math.floor(this.selection.checkY) != Math.floor(this.selection.lastCheckY) ||
          options.redrawActionBar == true
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

      if (newActionBar == true || options.refreshActionBar == true) {
        let actionButtonHolder = this.selection.actionBar.querySelector(".eActionToolbar");
        let actionToolbarLoaded = actionButtonHolder.hasAttribute("loaded");
        let combineTools;
        let showLocked = false;
        let selections = Object.keys(editor.selecting);
        for (let i = 0; i < selections.length; i++) {
          let annotation = editor.annotations[selections[i]] ?? {};
          let render = annotation.render;
          if (render == null) {
            continue;
          }
          if (showLocked == false) {
            showLocked = (editor.utils.canMemberModify(render) == false || editor.utils.isLocked(render) == true);
          }

          if (actionToolbarLoaded == false) {
            let annoModule = (await editor.render.getModule(annotation, render.f)) ?? {};
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

            this.selection.actionBarButtonCount = 0;
          }
          
          let currentButtonCount = 0;
          for (let i = 0; i < actionButtonHolder.children.length; i++) {
            let newAction = actionButtonHolder.children[i];
            if (newAction == null) {
              continue;
            }
            let toolModule = newAction.getAttribute("module");
            if (toolModule == null) {
              continue;
            }
            let actionModule = (await this.newModule(toolModule)) ?? {};
            if (this.selection.actionBar == null) {
              return;
            }
            actionModule.editor = editor;
            actionModule.toolbar = this;
            actionModule.isActionBar = true;
            actionModule.button = newAction;
            let isVisible;
            if (actionModule.SUPPORTS_MULTIPLE_SELECT == false && selections.length > 1) {
              isVisible = false;
            }
            //(async () => {
            if (actionModule.KEEP_BUTTON_PREVIEW != true) {
              newAction.innerHTML = "<div></div>";
            }
            let buttonHolder = newAction.querySelector("div");
            newAction.removeAttribute("selecthighlight");
            if (actionModule.setActionButton != null) {
              let result = await actionModule.setActionButton(buttonHolder);
              isVisible = isVisible ?? result;
            }
            if (newAction == null) {
              return;
            }
            if (actionModule.SHOW_ON_LOCK != true && showLocked == true) {
              isVisible = false;
            }
            if (actionModule.TOOLTIP != null) {
              newAction.setAttribute("tooltip", actionModule.TOOLTIP);
            }
            if (actionModule.FULL_CLICK != true) {
              newAction.removeAttribute("fullclick");
            } else {
              newAction.setAttribute("fullclick", "");
            }
            if (isVisible != false) {
              currentButtonCount++;
              newAction.removeAttribute("hidden");
            } else {
              newAction.setAttribute("hidden", "");
            }
            let elementBefore = newAction.previousElementSibling;
            /*let elementBeforeCheck = newAction;
            while (elementBeforeCheck.previousElementSibling != null) {
              elementBeforeCheck = elementBeforeCheck.previousElementSibling;
              if (elementBeforeCheck.hasAttribute("hidden") == false) {
                elementBefore = elementBeforeCheck;
                break;
              }
            }*/
            let elementAfter = newAction.nextElementSibling;
            /*let elementAfterCheck = newAction;
            while (elementAfterCheck.nextElementSibling != null) {
              elementAfterCheck = elementAfterCheck.nextElementSibling;
              if (elementAfterCheck.hasAttribute("hidden") == false) {
                elementAfter = elementAfterCheck;
                break;
              }
            }*/
            if (actionModule.ADD_DIVIDE_BEFORE == true) {
              if (elementBefore != null && elementBefore.className != "eVerticalDivider") {
                let newDivider = document.createElement("div");
                newDivider.className = "eVerticalDivider";
                newDivider.setAttribute("before", "");
                actionButtonHolder.insertBefore(newDivider, newAction);
                elementBefore = newDivider;
                i++;
              }
              if (elementBefore.className == "eVerticalDivider" && elementBefore.hasAttribute("before") == true) {
                if (isVisible != false) {
                  elementBefore.removeAttribute("hidden");
                } else {
                  elementBefore.setAttribute("hidden", "");
                }
              }
            }
            if (actionModule.ADD_DIVIDE_AFTER == true) {
              if (elementAfter == null || elementAfter.className != "eVerticalDivider") {
                let newDivider = document.createElement("div");
                newDivider.className = "eVerticalDivider";
                newDivider.setAttribute("after", "");
                actionButtonHolder.insertBefore(newDivider, elementAfter);
                elementAfter = newDivider;
              }
              if (elementAfter.className == "eVerticalDivider" && elementAfter.hasAttribute("after") == true) {
                if (isVisible != false) {
                  elementAfter.removeAttribute("hidden");
                } else {
                  elementAfter.setAttribute("hidden", "");
                }
              }
            }
            //})();
          }
          let actionButtonCount = 0;
          for (let i = 0; i < actionButtonHolder.children.length; i++) {
            let divider = actionButtonHolder.children[i];
            if (divider == null) {
              continue;
            }
            if (divider.className != "eVerticalDivider") {
              if (divider.hasAttribute("hidden") == false) {
                actionButtonCount++;
              }
              continue;
            }
            if (divider.hasAttribute("before") && actionButtonCount < 1) {
              divider.setAttribute("hidden", "");
            } else if (divider.hasAttribute("hidden") == false) {
              actionButtonCount = 0;
            }
          }

          if (currentButtonCount != this.selection.actionBarButtonCount) {
            newActionBar = true;
          }
          this.selection.actionBarButtonCount = currentButtonCount;
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
        let yPos = editor.scrollOffset;
        if ((account.settings ?? {}).actionbar != "top") {
          yPos = annotationRect.top + (this.selection.minY * editor.zoom) - this.selection.actionBar.offsetHeight - this.selection.handlePadding;
        }
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
            if (yPos - actionContent.offsetHeight - 4 < editor.scrollOffset) {
              alignTop = false;
            }
          } else {
            alignTop = false;
            if (page.offsetHeight - yPos - this.selection.actionFrame.offsetHeight - actionContent.offsetHeight - 4 < editor.scrollOffset) {
              alignTop = true;
            }
          }

          let frameLeft = 0;
          if (this.selection.actionFrameButton != null) {
            this.selection.actionFrame.querySelector(".eActionContainerScroll").style.maxWidth = maxActionBarWidth + "px";

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
      if (event == null || event.target == null || event.target.hasAttribute("hidden") == true) {
        return;
      }
      if (event.touches != null) {
        return;
      } else if (options.clickEvent == true && this.selection.clickActionTriggered == true) {
        this.selection.clickActionTriggered = false;
        return;
      }
      if (options.clickStart == true) {
        this.selection.clickActionTriggered = true;
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
      let fullClick = actionButton.hasAttribute("fullclick") == true || options.clickEvent == true;

      if (fullClick != true) {
        if (options.clickStart != true) {
          return;
        }
      } else {
        if (options.clickStart == true) {
          return;
        }
      }

      let wasSelected = actionButton.hasAttribute("selected");
      this.selection.closeActionFrame();
      if (wasSelected == true) {
        return;
      }
      this.selection.actionFrameButton = actionButton;
      
      let newActionModule = (await this.newModule(actionButton.getAttribute("module"))) ?? {};
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

        this.selection.actionFrame.querySelector(".eActionContainerScroll").style.maxWidth = (contentHolder.clientWidth - editor.scrollOffset) + "px";
      }
      if (newActionModule.js != null) {
        await newActionModule.js(contentFrame, event);
      }
      this.selection.currentActionModule = newActionModule;

      if (fullClick == true) {
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
      if (Object.keys(this.selection.currentSelections).length < 1 || this.selection.hideSelectBox == true) { //this.selection.selectBox == null
        return;
      }
      if (editor.self.access < 1) {
        return;
      }
      if (this.selection.showHandles == false) {
        return;
      }

      this.selection.actionEnabled = false;
      this.selection.annotationRects = {};
      this.selection.handle = null;
      let handleElement = event.target.closest(".eSelectHandle");
      if (handleElement != null) {
        if (handleElement.hasAttribute("move") == false) {
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
          this.updateMouse({ type: "svg", url: "../images/editor/cursors/resize.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation + this.selection.resizeCursorRotation });
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

          this.updateMouse({ type: "svg", url: "../images/editor/cursors/rotate.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation });
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
      if (this.selection.snapping == false || editor.options.snapping == false || event.ctrlKey == true) {
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
        let annoModule = (await editor.render.getModule(annotation, render.f)) ?? {};
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
      if (mouseDown() == false || this.selection.hideSelectBox == true) {
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
        this.updateMouse({ type: "svg", url: "../images/editor/cursors/move.svg", translate: { x: 22, y: 22 } });
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

        this.updateMouse({ type: "svg", url: "../images/editor/cursors/resize.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation + cursorRotate });
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

        this.updateMouse({ type: "svg", url: "../images/editor/cursors/rotate.svg", translate: { x: 22, y: 22 }, rotate: this.selection.originalRotate + rotateChange });
      }

      for (let i = 0; i < keys.length; i++) {
        let annoid = keys[i];
        let original = editor.annotations[annoid] ?? {};
        if (original.render == null) {
          continue;
        }
        if (editor.utils.isLocked(original.render) == true || editor.utils.isPlaceholderLocked(original.render) == true) {
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

        let annoModule = (await editor.render.getModule(original, select.f ?? original.render.f)) ?? {};

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
            let renderedText = original.component.getElement().querySelector("div[edit]");
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
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.x, rect.y, rect.centerX, rect.centerY, rect.rotation);
              break;
            case "topleft":
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.endX, rect.endY, rect.centerX, rect.centerY, rect.rotation);
              break;
            case "topright":
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.x, rect.endY, rect.centerX, rect.centerY, rect.rotation);
              break;
            case "bottomleft":
              [resizeAnnoX, resizeAnnoY] = editor.math.rotatePointOrigin(rect.endX, rect.y, rect.centerX, rect.centerY, rect.rotation);
          }
          let useX = original.render.p[0];
          let useY = original.render.p[1];
          if (original.render.s[0] < 0) {
            useX += original.render.s[0];
          }
          if (original.render.s[1] < 0) {
            useY += original.render.s[1];
          }
          let [defaultAnnoX, defaultAnnoY] = editor.math.rotatePointOrigin(useX, useY, useX + (rect.width / 2), useY + (rect.height / 2), original.render.r ?? 0);
          select.resizing = [fixAnnotationHolder, resizeAnnoX, resizeAnnoY, defaultAnnoX, defaultAnnoY];
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

        original.component = (await editor.render.create({ ...original, render: { ...original.render, ...select }, animate: false })).component;
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

        //delete selecting.done;
        delete selecting.resizing;

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
                  //parent: pushFields.parent,
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

      //this.updateMouse(this.currentToolModule.MOUSE);

      await this.selection.updateBox({ refreshActionBar: options.refreshActionBar ?? true, redrawActionBar: options.redrawActionBar, transition: false });
    }
    this.selection.interactRun = async (target) => {
      if (target == null) {
        return;
      }

      // REACTIONS:
      let reaction = target.closest(".eReaction");
      if (reaction != null) {
        if (reaction.hasAttribute("emoji") == false) {
          dropdownModule.open(reaction, "dropdowns/editor/tools/emojis", { parent: editor });
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
        let annotation = editor.annotations[embedAnno.getAttribute("anno")] ?? {};
        let render = annotation.render ?? {};
        if (render.embed != null) {
          if (render.embed.url == null) {
            window.open(render.d);
            return;
          }
          let embedHolder = embedAnno.querySelector("div[content]");
          embedHolder.insertAdjacentHTML("beforeend", `<iframe allowfullscreen allow="microphone; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`);
          let embedFrame = embedHolder.querySelector("iframe");
          if (annotation.component != null) {
            annotation.component.embedFrame = embedFrame;
          }
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
        await this.selection.endAction({ redrawActionBar: true, sentKeys: keys });
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
            if (annotation.component != null) {
              let element = annotation.component.getElement();
              if (element != null) {
                annoContentTx = element.querySelector("div[contenteditable]");
                if (annoContentTx != null) {
                  annoContentTx.removeAttribute("contenteditable");
                }
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
              let { annoX, annoY, rotation } = editor.utils.getRect(annotation) ?? {};
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
      await this.selection.endAction({ sentKeys: keys, redrawActionBar: true, fromHistory: true });

      if (annoContentTx != null) {
        annoContentTx.setAttribute("contenteditable", "true");
        await sleep(1);
      }
      if (event.caret != null) {
        if (event.caret.undoElement != null) {
          event.caret.undoElement.focus();
          editor.text.setCaretPosition(event.caret.undoElement, event.caret.undoPosition);
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
            if (annotation.component != null) {
              let element = annotation.component.getElement();
              if (element != null) {
                annoContentTx = element.querySelector("div[contenteditable]");
                if (annoContentTx != null) {
                  annoContentTx.removeAttribute("contenteditable");
                }
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
      await this.selection.endAction({ sentKeys: keys, redrawActionBar: true, fromHistory: true });

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
          if (handle.hasAttribute("move") == true) {
            this.updateMouse({ type: "svg", url: "../images/editor/cursors/move.svg", translate: { x: 22, y: 22 } });
          } else if (handle.hasAttribute("rotation") == true) {
            this.updateMouse({ type: "svg", url: "../images/editor/cursors/resize.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation + parseInt(handle.getAttribute("rotation")) });
          } else if (handle.getAttribute("handle") == "rotate") {
            this.updateMouse({ type: "svg", url: "../images/editor/cursors/rotate.svg", translate: { x: 22, y: 22 }, rotate: this.selection.rotation });
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
      if (event.keyCode == 32 && event.target == document.body) {
        event.preventDefault();
        if (this.currentToolModulePath != "editor/toolbar/pan") {
          prevToolModule = this.currentToolModulePath;
          this.currentToolModulePath = "editor/toolbar/pan";
          await this.activateTool(null, { resetSelection: false });
        }
        return;
      }
      if (editor.self.access < 1) {
        return;
      }
      let meta = event.ctrlKey || event.metaKey;

      if (event.keyCode == 90 && event.shiftKey == true && meta == true) { // Handle Redo
        if (event.target != null && editor.isEditorContent(event.target) == false && (["INPUT", "TEXTAREA"].includes(event.target.tagName) == true || event.target.isContentEditable == true)) {
          return;
        }
        event.preventDefault();
        return this.selection.redo();
      }
      if (event.keyCode == 90 && meta == true) { // Handle Undo
        if (event.target != null && editor.isEditorContent(event.target) == false && (["INPUT", "TEXTAREA"].includes(event.target.tagName) == true || event.target.isContentEditable == true)) {
          return;
        }
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
          let annotation = editor.annotations[selectID] ?? {};
          let anno = ({ ...(annotation.render ?? {}), ...(editor.selecting[selectID] ?? {}) }) ?? {};
          if (editor.utils.canMemberModify(anno) == false) { // Can't edit another member's work:
            continue;
          }
          if (editor.utils.isLocked(anno) == true || editor.utils.isPlaceholderLocked(anno) == true) {
            continue;
          }
          let annoModule = (await editor.render.getModule(annotation, anno.f)) ?? {};
          if (annoModule.KEYBINDS_ENABLED == false) {
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
          let selecting = editor.selecting[selectID] ?? {};
          let anno = (editor.annotations[selectID] ?? {}).render;
          if (editor.utils.canMemberModify(anno) == false) { // Can't edit another member's work:
            continue;
          }
          let nudge = 1;
          if (event.shiftKey == true) {
            nudge = 10;
          }
          let { annoX, annoY } = editor.utils.getRect(anno);
          if (event.keyCode == 37) {
            annoX -= nudge;
          } else if (event.keyCode == 38) {
            annoY -= nudge;
          } else if (event.keyCode == 39) {
            annoX += nudge;
          } else if (event.keyCode == 40) {
            annoY += nudge;
          }
          let { x: newX, y: newY } = editor.utils.getRelativePosition({
            ...anno,
            ...selecting,
            p: [annoX, annoY],
          });
          selecting.p = [newX, newY];
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
          return await moreModule.duplicate(null, true);
        }
      }
      
      if (event.keyCode == 65 && meta == true) { // Handle Select All
        return event.preventDefault();
        /* let allAnnotationIDs = Object.keys(editor.annotations);
        for (let i = 0; i < allAnnotationIDs.length; i++) {
          let annoID = allAnnotationIDs[i];
          editor.selecting[annoID] = editor.selecting[annoID] ?? {};
        }
        return this.selection.updateBox(); */
      }
    });
    editor.pipeline.subscribe("toolbarKeyUp", "keyup", (data) => {
      checkShift(data.event);
      if (prevToolModule != null && prevToolModule != "editor/toolbar/pan" && (this.currentToolModule ?? {}).dragging != true) {
        data.event.preventDefault();
        this.currentToolModulePath = prevToolModule;
        prevToolModule = null;
        return this.activateTool(null, { resetSelection: false });
      }
      this.pushToolEvent("keyup", data.event);
    });
    editor.pipeline.subscribe("toolbarScroll", "scroll", (data) => {
      this.pushToolEvent("scroll", data.event);
    });
    editor.pipeline.subscribe("toolbarWheel", "wheel", (data) => {
      this.pushToolEvent("wheel", data.event);
    });
    editor.pipeline.subscribe("toolbarBoundChange", "bounds_change", (data) => {
      this.toolbar.updateMaxHeight();
      setTimeout(this.toolbar.updateMaxHeight, 100); // Update again because of SAFARI
      this.toolbar.update();
      this.pushToolEvent("scroll", data.event);
    }, { sort: 2 });
    editor.pipeline.subscribe("toolbarPagePageAdd", "page_add", () => {
      this.toolbar.updateMaxHeight();
      this.toolbar.update();
    });
    editor.pipeline.subscribe("toolbarEditorUpdate", "set", (data) => {
      if (data.hasOwnProperty("settings") == true) {
        this.toolbar.checkToolToggle();
      }
    });
    editor.pipeline.subscribe("toolbarSelectionRedraw", "redraw_selection", async (data) => {
      if (editor.zooming == true) {
        return;
      }
      await this.selection.updateBox(data);
    });
    editor.pipeline.subscribe("toolbarSelectionZoomChange", "zoom_change", async () => {
      await this.selection.updateBox({ transition: false });
    });

    if (this.toolbar.toolbar != null) {
      this.toolbar.toolbar.addEventListener("click", (event) => {
        this.pushToolEvent("toolbar_click", event);
      });
    }

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
        let text = clipboardData.getData("text");
        if (isValidURL(text) == true) {
          await this.toolbar.startTool(toolbar.querySelector('.eTool[tool="media"]'));
          await this.toolbar.startTool(toolbar.querySelector('.eTool[tool="embed"]'), null, { link: text });
          return event.preventDefault();
        }
        return;
      }
      let annotationData = JSON.parse(decodeURIComponent(html.substring(startIndex + 19, endIndex)));
      if (annotationData.length < 1) {
        return;
      }

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
        minZIndex = Math.min(minZIndex ?? newAnno.l ?? editor.minLayer, newAnno.l ?? minZIndex ?? editor.minLayer);
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
        if (existingAnno != null && editor.utils.annotationInViewport(existingAnno) == true) {
          newAnno.p[0] = (newAnno.p[0] ?? existingAnno.p[0]) + 50;
          newAnno.p[1] = (newAnno.p[1] ?? existingAnno.p[1]) + 50;
        } else {
          newAnno.p[0] += centerPageX + centerX - maxLeft;
          newAnno.p[1] += centerPageY + centerY - maxTop;
        }
        if (newAnno.l != null) {
          newAnno.l = editor.maxLayer + 1 + ((newAnno.l ?? editor.maxLayer) - minZIndex);
        }
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
        let setLock = [];
        let canLock = editor.utils.canChangeLock(newAnno);
        for (let l = 0; l < canLock.length; l++) {
          let lock = canLock[l];
          if ((newAnno.lock ?? []).includes(lock) == true) {
            setLock.push(lock);
          }
        }
        newAnno.lock = setLock;
        editor.selecting[newAnno._id] = newAnno;
      }

      this.selection.action = "save";
      await this.selection.endAction();
    });
    editor.pipeline.subscribe("toolbarCopy", "copy", async (data) => {
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
        let annotation = editor.annotations[annoID] ?? {};
        let render = annotation.render;
        if (render == null) {
          continue;
        }
        let annoModule = (await editor.render.getModule(annotation, render.f)) ?? {};
        if (annoModule.KEYBINDS_ENABLED == false) {
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
        let annoModule = (await editor.render.getModule(annotation, render.f)) ?? {};
        if (annoModule.KEEP_ON_PARENT_DELETE == true) {
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
            r: render.r
          };
          if (render.p != null) {
            renderCopy.parented.p = [render.p[0], render.p[1]];
          }
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
  //MOUSE = { type: "svg", url: "../images/editor/cursors/cursor.svg", translate: { x: 22, y: 22 } };

  clickStart = async (event) => {
    if (event.which === 3 || event.button === 2) {
      return;
    }
    let target = event.target;
    this.lastTarget = target;
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eActionBar") != null) {
      return this.parent.selection.clickAction(event, { clickStart: true });
    }
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    let annotation = target.closest(".eAnnotation");
    let annoID;
    let original;
    let render;
    if (annotation != null) {
      annoID = annotation.getAttribute("anno");
      original = this.editor.annotations[annoID] ?? {};
      render = original.render;
      if (render == null) {
        return;
      }
      if (annotation.querySelector("div[edit]") != null && annotation.querySelector("div[edit]").closest(".eAnnotation") == annotation && annotation.querySelector("div[contenteditable]") != null) {
        return;
      }
      if (this.editor.selecting[annoID] != null) {
        if (target.closest("div[label]") != null && annotation.querySelector("div[label]").closest(".eAnnotation") == annotation && this.editor.utils.isLocked(render) != true) {
          if (target.closest("div[label]").hasAttribute("contenteditable") == false) {
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
      if (this.parent.selection.currentActionModule != null && this.parent.selection.currentActionModule.finish != null) {
        await this.parent.selection.currentActionModule.finish();
      }
      if (event.shiftKey == false) {
        this.editor.selecting = {};
        if (annotation == null) {
          return this.parent.selection.updateBox();
        }
      }
      if (render != null && this.editor.selecting[annoID] == null) {
        let module = (await this.editor.render.getModule(original, render.f)) ?? {};
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

    let target = this.lastTarget ?? event.target;
    this.lastTarget = null;
    if (this.editor.isEditorContent(target) != true) {
      return;
    }
    await this.parent.selection.clickAction(event, { clickEnd: true });
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
      let component = this.editor.annotations[annoID] ?? {};
      let render = component.render;
      if (render == null) {
        return;
      }
      let annoModule = (await this.editor.render.getModule(component, render.f)) ?? {};
      if (this.editor.utils.canMemberModify(render) == false && this.editor.self.access > 0 && annoModule.IGNORE_LOCKED_WARNING != true) {
        alertModule.close(this.parent.someoneElsesAnnoWarning);
        this.parent.someoneElsesAnnoWarning = await alertModule.open("warning", "<b>Annotation is Locked</b>Only the author may edit collaborator locked annotations.");
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
  click = async (event) => { await this.parent.selection.clickAction(event, { clickEvent: true }); await this.parent.selection.interactRun(event.target); }
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
      if ((mouseDown() == false && event.buttons != 4) || event.touches != null) { //event.which != 2
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
  MOUSE = { type: "svg", url: "../images/editor/cursors/cursor.svg", translate: { x: 22, y: 22 } };

  css = {
    ".eSelectDrag": `position: absolute; box-sizing: border-box; pointer-events: none; z-index: 99; opacity: .4; background: var(--secondary); border: solid 2px var(--theme); border-radius: 10px; transition: opacity .1s`
  };

  clickStart = async (event) => {
    if (event.which === 3 || event.button === 2) {
      return;
    }
    let target = event.target;
    if (target.closest("button") != null || target.closest("a") != null || target.closest(".eActionBar") != null) {
      return this.parent.selection.clickAction(event, { clickStart: true });
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
    let setSelecting = copyObject(this.prevSelecting);

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

      let annotationModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annotationModule.CAN_DRAG_SELECT == false) {
        continue;
      }
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

      if (setSelecting[render._id] == null) {
        setSelecting[render._id] = {};
        let currentSelectIndex = currentSelections.indexOf(render._id);
        if (currentSelectIndex > -1) {
          currentSelections.splice(currentSelectIndex, 1);
        } else {
          selectionChange = true;
        }
      }
    }

    this.editor.selecting = setSelecting;

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

      let target = event.target;
      if (target == null) {
        return;
      }
      if (this.editor.isThisPage(target) != true) {
        return;
      }
      await this.parent.selection.clickAction(event, { clickEnd: true });
      if (target.closest(".eActionBar") != null) {
        return;
      }
      if (target.closest("button") != null || target.closest("a") != null) {
        return this.parent.selection.updateBox();
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
  click = async (event) => { await this.parent.selection.clickAction(event, { clickEvent: true }); await this.parent.selection.interactRun(event.target); }
}

modules["editor/toolbar/pen"] = class {
  FUNCTION = "draw";
  USER_SELECT = "none";
  TOUCH_ACTION = null;
  REALTIME_TOOL = 2;
  MOUSE = { type: "svg", url: "../images/editor/cursors/pen.svg", translate: { x: 15, y: 30 } };
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
    this.disable();
    this.parent.toolbar.closeSubSub(true);
    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    let toolPreference = this.parent.getToolPreference();
    let useThickness = this.THICKNESS ?? toolPreference.thickness;
    let halfUseThickness = this.editor.math.round(useThickness / 2);
    this.annotation = {
      render: {
        _id: this.editor.render.tempID(),
        f: this.FUNCTION,
        p: [this.editor.math.round(position.x - halfUseThickness), this.editor.math.round(position.y - halfUseThickness)],
        s: [useThickness, useThickness],
        l: this.editor.maxLayer + 1,
        c: this.COLOR ?? toolPreference.color.selected,
        t: useThickness,
        o: this.OPACITY ?? toolPreference.opacity,
        d: [0, 0]
      },
      animate: false
    };
    this.editor.realtimeSelect[this.annotation.render._id] = this.annotation.render;
    await this.editor.render.create(this.annotation);
  }
  clickMove = async (event) => {
    if (this.annotation == null) {
      return;
    }
    if (event.touches != null && event.touches.length > 1) {
      return this.disable();
    }
    if (mouseDown() == false) {
      return this.clickEnd();
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
    let rect = this.editor.utils.localBoundingRect(this.annotation.component.getElement());
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
    this.editor.realtimeSelect[this.annotation.render._id] = this.annotation.render;
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

    delete this.editor.realtimeSelect[this.annotation.render._id];

    await this.editor.save.push(this.annotation.render);
    await this.editor.history.push("remove", [{ _id: this.annotation.render._id }]);

    this.annotation.render.done = true;
    await this.editor.realtime.forceShort();
    
    this.disable();
  }
  enable = () => {
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
  disable = async () => {
    if (this.annotation == null) {
      return;
    }
    if (this.annotation.render != null && this.annotation.render.done != true) {
      this.editor.realtimeSelect[this.annotation.render._id] = { remove: true };
      this.editor.realtime.forceShort();
      delete this.editor.realtimeSelect[this.annotation.render._id];
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
    this.editor.usingStylus = false;
  };
}
modules["editor/toolbar/highlighter"] = class extends modules["editor/toolbar/pen"] {
  FUNCTION = "markup";
  STRAITEN_CHECK = true;
  REALTIME_TOOL = 1;
  MOUSE = { type: "svg", url: "../images/editor/cursors/highlighter.svg", translate: { x: 15, y: 30 } };
}
modules["editor/toolbar/understrike"] = class extends modules["editor/toolbar/pen"] {
  FORCE_LINE = true;
  HORIZONTAL_CHECK = true;
  REALTIME_TOOL = 1;
  MOUSE = { type: "svg", url: "../images/editor/cursors/highlighter.svg", translate: { x: 15, y: 30 } };

  enable = () => {
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
  MOUSE = { type: "svg", url: "../images/editor/cursors/eraser.svg", translate: { x: 20, y: 20 } };
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
        if (annotation.component == null) {
          continue;
        }
        let anno = annotation.component.getElement()
        if (anno == null || anno.hasAttribute("hidden") == true) {
          continue;
        }
        let annoID = anno.getAttribute("anno");
        let original = this.editor.annotations[annoID] ?? {};
        let render = original.render;
        if (render == null || render.remove == true) {
          continue;
        }
        if (this.editor.utils.canMemberModify(render) != true) { // Can't edit another member's work:
          continue;
        }
        if (this.editor.utils.isLocked(render) == true) {
          continue;
        }
        let renderModule = await this.editor.render.getModule(original, render.f);
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
  enable = () => {
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
  MOUSE = { type: "svg", url: "../images/editor/cursors/insert.svg", translate: { x: 20, y: 20 } };
  PUBLISH = {};

  clickStart = (event) => { this.clickMove(event); }
  clickMove = async (event) => {
    if (this.annotation == null) {
      if (event != null && this.editor.isEditorContent(event.target) != true) {
        return;
      }
      if (this.enable != null) {
        this.enable();
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
      let element = this.annotation.component.getElement();
      let textElem = element.querySelector("div[text]");
      if (textElem != null) {
        if (this.annotation.render.remove == true) {
          element.style.opacity = 0;
          element.removeAttribute("hidden");
        }
        this.annotation.render.s = [148, textElem.offsetHeight]; //textElem.offsetWidth
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
      delete this.editor.selecting["cursor"];
      await this.editor.realtime.forceShort();

      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="selection"]'));
      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="select"]'));
      this.editor.selecting[this.annotation.render._id] = {};
      await this.parent.selection.updateBox();

      if (this.TARGET_QUERY != null) {
        this.parent.selection.clickAction({
          target: this.editor.page.querySelector(this.TARGET_QUERY),
          clearText: true
        });
      }

      if (this.FORCE_SAVE == true) {
        this.editor.save.syncSave(true);
      }
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
  }
}

modules["editor/toolbar/text"] = class extends modules["editor/toolbar/placement"] {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="editor/toolbar/textedit"]';

  enable = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "text",
      s: [0, 0],
      c: toolPreference.color.selected,
      l: this.editor.maxLayer + 1,
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
  MOUSE = { type: "svg", url: "../images/editor/cursors/insert.svg", translate: { x: 20, y: 20 } };
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
    this.clickMove(event);
  }
  clickMove = async (event) => {
    if (this.ACTIVE == false) {
      return this.clickEnd();
    }
    if (this.annotation == null) {
      if (event != null && this.editor.isEditorContent(event.target) != true) {
        return;
      }
      if (this.enable != null) {
        this.enable();
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
    this.annotation.component = renderObject.component;
    this.editor.selecting["cursor"] = this.annotation.render;
  }
  scroll = () => { this.clickMove(); }
  clickEnd = async (event) => {
    if (this.annotation == null) {
      return;
    }
    if (event != null && (this.editor.isEditorContent(event.target) == true || this.resizeActive == true)) {
      this.annotation.render._id = this.editor.render.tempID();
      
      this.newAnnotation = await this.editor.save.push(this.annotation.render);
      await this.editor.history.push("remove", [{ _id: this.annotation.render._id }]);

      this.editor.selecting[this.annotation.render._id] = { ...this.annotation.render, done: true };
      delete this.editor.selecting["cursor"];
      await this.editor.realtime.forceShort();

      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="selection"]'));
      await this.parent.toolbar.startTool(this.parent.toolbar.toolbar.querySelector('.eTool[tool="select"]'));
      this.editor.selecting[this.annotation.render._id] = {};
      this.parent.selection.updateBox();

      if (this.FORCE_SAVE == true) {
        this.editor.save.syncSave(true);
      }
    }
    this.editor.render.remove(this.annotation);
    this.annotation = null;
  }
}

modules["editor/toolbar/shape"] = class extends modules["editor/toolbar/resize_placement"] {
  MINIMUM_SIZE = 25;
  DEFAULT_WIDTH = 125;
  DEFAULT_HEIGHT = 125;
  
  enable = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "shape",
      s: [this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT],
      c: toolPreference.color.selected,
      t: toolPreference.thickness,
      o: toolPreference.opacity,
      l: this.editor.maxLayer + 1,
      d: this.tool
    };
  }
}
modules["editor/toolbar/shape/star"] = class extends modules["editor/toolbar/shape"] {
  DEFAULT_WIDTH = 125;
  DEFAULT_HEIGHT = 116;
}
modules["editor/toolbar/shape/arrow"] = class extends modules["editor/toolbar/shape"] {
  DEFAULT_WIDTH = 175;
  DEFAULT_HEIGHT = 125;
}
modules["editor/toolbar/shape/oval"] = class extends modules["editor/toolbar/shape"] {
  DEFAULT_WIDTH = 250;
  DEFAULT_HEIGHT = 125;
}
modules["editor/toolbar/shape/polygon"] = class extends modules["editor/toolbar/shape"] {
  DEFAULT_WIDTH = 125;
  DEFAULT_HEIGHT = 108;
}

modules["editor/toolbar/sticky"] = class extends modules["editor/toolbar/placement"] {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="editor/toolbar/textedit"]';

  enable = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "sticky",
      s: [220, 220],
      c: toolPreference.color.selected,
      l: this.editor.maxLayer + 1,
      d: { s: toolPreference.size, al: toolPreference.align },
      sig: this.editor.self.name
    };
  }
}

modules["editor/toolbar/comment"] = class {
  USER_SELECT = "none";
  TOUCH_ACTION = null;
  REALTIME_TOOL = 5;
  MOUSE = { type: "svg", url: "../images/editor/cursors/comment.svg", translate: { x: 12, y: 32 } };

  css = {
    ".eCommentFrame": `position: absolute; width: 300px; min-height: 48px; left: 0px; top: 0px; opacity: 0; transform: scale(0); z-index: 101; border-radius: 24px; transition: transform .2s, opacity .2s; background: var(--pageColor); user-select: text`,
    ".eCommentFrame:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: 0px 0px 6px var(--theme); opacity: .6; pointer-events: none`,
    ".eCommentScrollContainer": `width: 100%; height: fit-content; overflow: hidden; border-radius: inherit`,
    ".eCommentScroll": `width: 100%; height: fit-content; max-height: min(var(--maxToolbarHeight), 500px); overflow-y: auto`,
    ".eCommentHolder": `display: flex; flex-direction: column; box-sizing: border-box; width: 100%; height: fit-content; padding: 0 8px; gap: 16px`,
    ".eCommentItem": `position: relative; display: flex; box-sizing: border-box; width: 100%; z-index: 1`,
    ".eCommentItem:not([new]):first-child": `padding-top: 8px`,
    ".eCommentItem:not([new]):last-child": `padding-bottom: 8px`,
    ".eCommentItem div[threadindicator]": `position: absolute; width: 36px; height: 100%`,
    ".eCommentItem:first-child div[threadindicator]": `display: none`,
    ".eCommentItem div[threadindicator] div[passthrough]": `position: absolute; width: 4px; height: calc(100% + 18px); left: 14px; top: -18px; background: var(--hover); border-radius: 2px`,
    ".eCommentItem:last-child div[threadindicator] div[passthrough]": `height: 22px`,
    ".eCommentItem div[threadindicator] div[dash]": `position: absolute; width: 12px; height: 4px; left: 14px; top: 10px; border-style: solid; border-width: 0 0 4px 4px; border-color: var(--hover); border-bottom-left-radius: 12px`,
    ".eCommentItem:last-child div[threadindicator] div[dash]": `height: 12px; top: 2px`,
    ".eCommentItem div[threadindicator] div[ending]": `position: absolute; width: 4px; height: 4px; left: 28px; top: 14px; background: var(--hover); border-radius: 2px`,
    ".eCommentContainer": `display: flex; box-sizing: border-box; flex: 1; min-width: 0`,
    ".eCommentItem:not(:first-child) .eCommentContainer": `margin-left: 36px`,
    ".eCommentContainer div[profileholder]": `display: flex; flex-direction: column; width: 32px; min-height: 32px; align-items: center`,
    ".eCommentContainer div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; margin: 2px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".eCommentContainer div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".eCommentContainer div[profileholder] div[profile]": `position: relative; width: 26px; height: 26px; border: solid 3px var(--pageColor); border-radius: 16px`,
    ".eCommentContainer div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".eCommentContainer div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".eCommentItem:not(:only-child):first-child .eCommentContainer div[profileholder]:after": `content: ""; flex: 1; width: 4px; margin-top: 4px; background: var(--hover); border-radius: 2px 2px 0`,
    ".eCommentContainer div[content]": `flex: 1; min-width: 0; height: 100%; margin-left: 6px; text-align: left; align-content: center`,
    ".eCommentContainer div[content] div[header]": `display: flex; width: 100%; height: 32px; align-items: center`,
    ".eCommentContainer div[content] div[header] div[member]": `flex: 1; min-width: 0; max-width: fit-content; font-size: 16px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eCommentContainer div[content] div[header] div[time]": `margin: 0 6px; color: var(--darkGray); font-size: 14px; font-weight: 500; white-space: nowrap`,
    ".eCommentContainer div[content] div[header] div[actions]": `display: flex; gap: 4px; margin-left: auto`,
    ".eCommentContainer div[content] div[header] div[actions] button": `position: relative; display: flex; width: 32px; height: 32px; padding: 0; border-radius: 16px; justify-content: center; align-items: center`,
    ".eCommentContainer div[content] div[header] div[actions] button:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--secondary); opacity: 0; border-radius: inherit; transition: .2s`,
    ".eCommentContainer div[content] div[header] div[actions] button:hover:before": `opacity: .4`,
    ".eCommentContainer div[content] div[header] div[actions] button > svg": `width: 24px; height: 24px; z-index: 2`,
    ".eCommentContainer div[content] div[header] div[actions] button[selected]:before": `opacity: 1 !important`,
    ".eCommentContainer div[content] div[header] div[actions] button[selected] > svg": `filter: brightness(0) invert(1)`,
    ".eCommentContainer div[content] div[text]": `box-sizing: border-box; width: 100%; height: fit-content; font-size: 14px; outline: none`,
    ".eCommentItem[new] .eCommentContainer div[content] div[text]": `padding: 6px`,
    ".eCommentItem[new] .eCommentContainer div[content] div[text]:empty:before": `content: "Write your Comment"; display: block; opacity: .5; pointer-events: none`,
    ".eCommentItem:not([new]) .eCommentContainer div[content] div[text][contenteditable]": `padding: 4px; border: solid 3px var(--secondary); border-radius: 8px`,
    ".eCommentItem > button": `position: sticky; display: flex; width: 36px; height: 36px; top: 6px; margin: 6px 6px 6px 0; justify-content: center; align-items: center; background: var(--theme); border-radius: 18px`,
    ".eCommentItem > button img": `width: 28px; height: 28px`,
    ".eCommentItem .eCommentEditActions": `display: flex; margin-top: 4px; justify-content: space-between`,
    ".eCommentItem .eCommentEditActions button[save]": `font-weight: 700; font-size: 14px; color: var(--theme)`,
    ".eCommentItem .eCommentEditActions button[cancel]": `font-weight: 500; font-size: 14px; color: var(--darkGray)`,
    ".eCommentReply": `position: sticky; display: flex; box-sizing: border-box; width: 100%; padding: 8px; bottom: 0px; background: var(--pageColor); z-index: 2; transition: .2s`,
    ".eCommentReply > div[profileholder]": `display: flex; height: fit-content; margin-right: 6px`,
    ".eCommentReply > div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; margin: 2px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".eCommentReply > div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".eCommentReply > div[profileholder] div[profile]": `position: relative; width: 26px; height: 26px; border: solid 3px var(--pageColor); border-radius: 16px`,
    ".eCommentReply > div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".eCommentReply > div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".eCommentReply > div[text]": `box-sizing: border-box; flex: 1; padding: 6px 10px; min-height: 32px; max-height: 120px; background: rgba(var(--hoverRGB), .3); outline: none; border-radius: 16px; font-size: 14px; text-align: left; align-content: center; overflow: auto`,
    ".eCommentReply > div[text]:empty:before": `content: "Write a Reply"; display: block; opacity: .5; pointer-events: none`,
    ".eCommentReply > button": `display: flex; width: 32px; height: 32px; margin: auto 0 0 6px; justify-content: center; align-items: center; background: var(--theme); border-radius: 16px`,
    ".eCommentReply > button img": `width: 26px; height: 26px`
  }
  commentWidth = 32;
  commentHeight = 32;
  offsetX = 24; //28
  offsetY = 23; //23; //22
  updateCommentFrame = () => {
    if (this.frame == null) {
      return;
    }
    if (this.annotation == null) {
      return this.closeCommentFrame();
    }

    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    let { x, y } = this.editor.utils.getRect(this.annotation.render);
    let zoom = 1 / this.editor.zoom;
    let centerX = x + ((this.commentWidth / 2) * zoom);
    let centerY = y - ((this.commentHeight / 2) * zoom);

    let frameWidth = this.frame.offsetWidth;
    let setLeft = annotationRect.left + (centerX * this.editor.zoom) + this.offsetX + this.editor.contentHolder.scrollLeft;
    let setRight = annotationRect.left + (centerX * this.editor.zoom) - this.offsetX - frameWidth + this.editor.contentHolder.scrollLeft;
    let setTransformOrigin = "";
    let sidemenuLeftOffset = this.editor.scrollOffset;
    let sidemenuRightOffset = 8;
    if (this.toolbar.sidemenu.frame != null && this.toolbar.sidemenu.frame.hasAttribute("hidden") == false) {
      sidemenuRightOffset = this.toolbar.sidemenu.frame.offsetWidth + 8;
    }
    if ((account.settings ?? {}).toolbar == "right") {
      [sidemenuLeftOffset, sidemenuRightOffset] = [sidemenuRightOffset, sidemenuLeftOffset];
    }
    let leftPageOffset = (this.editor.contentHolder.scrollLeft + this.editor.contentHolder.clientWidth) - (setLeft + frameWidth + sidemenuRightOffset);
    let rightPageOffset = (setRight - sidemenuLeftOffset) - (this.editor.contentHolder.scrollLeft);
    if (leftPageOffset > 0) {
      this.frame.style.left = setLeft + "px";
      setTransformOrigin += "left";
    } else {
      if (leftPageOffset < 0 && rightPageOffset > leftPageOffset) {
        this.frame.style.left = setRight + "px";
        setTransformOrigin += "right";
      } else {
        this.frame.style.left = setLeft + "px";
        setTransformOrigin += "left";
      }
    }
    let frameHeight = this.frame.offsetHeight;
    let annoY = annotationRect.top + (centerY * this.editor.zoom);
    let setTop;
    if (annoY + this.offsetY < this.editor.contentHolder.clientHeight - this.editor.scrollOffset) {
      setTop = annoY + this.editor.contentHolder.scrollTop - this.offsetY;
      setTop += Math.min(this.editor.contentHolder.scrollTop + this.editor.contentHolder.clientHeight - this.editor.scrollOffset - setTop - frameHeight, 0);
    } else {
      setTop = annoY - frameHeight + this.editor.contentHolder.scrollTop + this.offsetY;
    }
    this.frame.style.top = setTop + "px";
    this.frame.style.transformOrigin = setTransformOrigin + " " + (this.editor.contentHolder.scrollTop + annoY - setTop) + "px";

    if (this.updateReplyShadow != null) {
      this.updateReplyShadow();
    }
  }
  openCommentFrame = async (annotation, thread = []) => {
    this.closeCommentFrame();
    if (annotation == null) {
      return;
    }
    this.annotation = annotation;

    this.editor.content.parentElement.insertAdjacentHTML("beforeend", `<div class="eCommentFrame" new><div class="eCommentScrollContainer"><div class="eCommentScroll customScroll"><div class="eCommentHolder"></div></div></div></div>`);
    this.frame = this.editor.content.parentElement.querySelector(".eCommentFrame[new]");
    this.frame.removeAttribute("new");

    //let collaborator = await this.editor.utils.getCollaborator(annotation.render.a ?? annotation.render.m);
    //this.frame.style.setProperty("--themeColor", collaborator.color);

    let scrollHolder = this.frame.querySelector(".eCommentScroll");
    let holder = scrollHolder.querySelector(".eCommentHolder");

    if (annotation.new == true) {
      holder.style.padding = "0px";
      holder.innerHTML = `<div class="eCommentItem" new>
        <div class="eCommentContainer">
          <div content>
            <div text contenteditable></div>
          </div>
        </div>
        <button disabled><img src="../images/editor/actions/send.svg" /></button>
      </div>`;
      let commentItem = holder.querySelector(".eCommentItem");
      let commentText = commentItem.querySelector("div[text]");
      let commentSendButton = commentItem.querySelector("button");
      commentText.addEventListener("input", () => {
        if (commentText.textContent != "") {
          commentSendButton.removeAttribute("disabled");
        } else {
          commentSendButton.setAttribute("disabled", "");
        }
      });
      commentText.addEventListener("paste", clipBoardRead);
      commentSendButton.addEventListener("click", async () => {
        if (commentText.textContent == "") {
          return this.closeCommentFrame();
        }
        let addText = [];
        for (let i = 0; i < commentText.childNodes.length; i++) {
          let text = commentText.childNodes[i].textContent;
          if (text == "") {
            text = "\n";
          }
          addText.push(text);
        }
        while (addText[0].trim() == "") {
          addText.splice(0, 1);
        }
        while (addText[addText.length - 1].trim() == "") {
          addText.splice(addText.length - 1, 1);
        }
        annotation.render.d.b = addText;
        annotation.render.time = getEpoch();
        await this.editor.save.push(annotation.render);
        //await this.editor.history.push("remove", [{ _id: annotation.render._id }]);

        this.editor.realtimeSelect[annotation.render._id] = { ...annotation.render, done: true };
        await this.editor.realtime.forceShort();
        
        this.closeCommentFrame();
      });

      this.updateCommentFrame();

      commentText.focus();

      this.frame.style.transform = "scale(1)";
      this.frame.style.opacity = 1;

      return;
    }

    this.frame.style.width = "350px";

    this.updateComment = async (render, options = {}) => {
      let comment;
      if (options.new != true) {
        comment = holder.querySelector('.eCommentItem[comment="' + render._id + '"]');
        if (comment == null && render.pending != null) {
          comment = holder.querySelector('.eCommentItem[comment="' + render.pending + '"]');
        }
      }
      let newComment = comment == null;
      if (newComment == true) {
        holder.insertAdjacentHTML("beforeend", `<div class="eCommentItem" new>
          <div threadindicator>
            <div passthrough></div>
            <div dash></div>
            <div ending></div>
          </div>
          <div class="eCommentContainer">
            <div profileholder>
              <div cursor style="display: none"></div>
              <div profile style="display: none"><img src="../images/profiles/default.svg" /></div>
            </div>
            <div content>
              <div header>
                <div member></div>
                <div time></div>
                <div actions>
                  <button more></button>
                </div>
              </div>
              <div text></div>
            </div>
          </div>
        </div>`);
        comment = holder.querySelector(".eCommentItem[new]");
        comment.removeAttribute("new");
        if (options.new != true) {
          let holderChildren = holder.children;
          for (let i = holderChildren.length - 1; i >= 0; i--) {
            let child = holderChildren[i];
            if (parseInt(child.getAttribute("time")) > (render.time ?? render.sync)) {
              holder.insertBefore(comment, child);
            } else {
              break;
            }
          }
        }

        let actionsHolder = comment.querySelector("div[actions]");
        if (options.root == true) {
          actionsHolder.insertAdjacentHTML("afterbegin", `<button resolve title="Resolve the comment thread."></button>`);
          setSVG(actionsHolder.querySelector("button[resolve]"), "../images/editor/actions/resolve.svg");
        }
        setSVG(actionsHolder.querySelector("button[more]"), "../images/editor/actions/more.svg");
      }
      comment.setAttribute("comment", render._id);

      let setTime = render.time ?? render.sync;
      comment.setAttribute("time", setTime);

      let commentTx = comment.querySelector("div[text]");
      if (commentTx.hasAttribute("contenteditable") == false) {
        if (setTime != null) {
          let timeTx = comment.querySelector("div[time]");
          timeTx.textContent = timeSince(setTime);
          timeTx.title = formatFullDate(setTime);
        }
        let richText = render.d ?? {};
        let setHTML = "";
        for (let i = 0; i < (richText.b ?? []).length; i++) {
          let addHTML = "";
          if (richText.b[i] != "\n") {
            addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
          } else {
            addHTML = "<br>";
          }
          setHTML += addHTML;
        }
        commentTx.innerHTML = setHTML;
      }

      let modify = render.a ?? render.m;
      comment.setAttribute("modify", modify);
      this.editor.utils.getCollaborator(modify, (collaborator) => {
        if (comment == null) {
          return;
        }

        let profileHolder = comment.querySelector("div[profileholder]");
        profileHolder.style.setProperty("--themeColor", collaborator.color);
        if (collaborator.image == null) {
          profileHolder.querySelector("div[cursor]").style.removeProperty("display");
          profileHolder.querySelector("div[profile]").style.display = "none";
        } else {
          profileHolder.querySelector("div[profile] img").src = collaborator.image;
          profileHolder.querySelector("div[profile]").style.removeProperty("display");
          profileHolder.querySelector("div[cursor]").style.display = "none";
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = collaborator.name;
        memberTx.title = collaborator.name;
      });

      let canModify = this.editor.utils.canMemberModify(render) == true;
      let resolveButton = comment.querySelector("button[resolve]");
      let moreButton = comment.querySelector("button[more]");
      if (resolveButton != null) {
        if (render.resolved != true) {
          resolveButton.removeAttribute("selected");
        } else {
          resolveButton.setAttribute("selected", "");
        }
        if (canModify == true) {
          resolveButton.removeAttribute("disabled");
        } else {
          resolveButton.setAttribute("disabled", "");
        }
      } else {
        if (canModify == true) {
          moreButton.removeAttribute("hidden");
        } else {
          moreButton.setAttribute("hidden", "");
        }
      }

      if (render.remove == true) {
        comment.remove();
      }
      if (options.new != true) {
        this.updateCommentFrame();
        if (newComment == true && holder.lastElementChild != null && scrollHolder.scrollTop + scrollHolder.clientHeight + holder.lastElementChild.clientHeight + 50 > scrollHolder.scrollHeight) {
          let scrollToParams = { top: scrollHolder.scrollHeight };
          if (this.editor.parent.parent.active != false) {
            scrollToParams.behavior = "smooth";
          }
          scrollHolder.scrollTo(scrollToParams);
        }
        //scrollHolder.scrollTo(0, scrollHolder.scrollHeight);
      }
    }

    await this.updateComment(this.annotation.render, { root: true, new: true });
    for (let i = 0; i < thread.length; i++) {
      await this.updateComment(thread[i], { new: true });
    }

    holder.addEventListener("click", (event) => {
      let button = event.target.closest("button");
      if (button == null) {
        return;
      }
      let comment = button.closest(".eCommentItem");
      if (comment != null && button.hasAttribute("more") == true) {
        button.setAttribute("dropdowntitle", "Options");
        return dropdownModule.open(button, "dropdowns/editor/toolbar/comment/more", { parent: this, comment: comment, root: holder.firstElementChild == comment });
      }
      if (comment != null && button.hasAttribute("resolve") == true) {
        return this.toolbar.saveSelecting(() => { return { resolved: !button.hasAttribute("selected") }; });
      }
    });

    let replyTx;
    if (this.editor.self.access > 0 && this.toolbar.checkToolEnabled("comment") == true) {
      scrollHolder.insertAdjacentHTML("beforeend", `<div class="eCommentReply">
        <div profileholder>
          <div cursor></div>
        </div>
        <div class="customScroll" text contenteditable></div>
        <button style="display: none"><img src="../images/editor/actions/send.svg" /></button>
      </div>`);
      let commentReply = scrollHolder.querySelector(".eCommentReply");
      let profileHolder = commentReply.querySelector("div[profileholder]");
      replyTx = commentReply.querySelector("div[text]");
      let replySendButton = commentReply.querySelector("button");
      let selfCollaborator = await this.editor.utils.getCollaborator(this.editor.self.modify);
      profileHolder.style.setProperty("--themeColor", selfCollaborator.color);
      if (selfCollaborator.image != null) {
        profileHolder.innerHTML = `<div profile><img src="../images/profiles/default.svg" /></div>`;
        profileHolder.querySelector("div[profile] img").src = selfCollaborator.image;
      }
      replyTx.addEventListener("input", () => {
        if (replyTx.textContent != "") {
          replySendButton.style.removeProperty("display");
        } else {
          replySendButton.style.display = "none";
        }
        this.updateCommentFrame();
      });
      replyTx.addEventListener("paste", clipBoardRead);
      replySendButton.addEventListener("click", async () => {
        if (replyTx.textContent == "") {
          return;
        }
        let addText = [];
        for (let i = 0; i < replyTx.childNodes.length; i++) {
          let text = replyTx.childNodes[i].textContent;
          if (text == "") {
            text = "\n";
          }
          addText.push(text);
        }
        while (addText[0].trim() == "") {
          addText.splice(0, 1);
        }
        while (addText[addText.length - 1].trim() == "") {
          addText.splice(addText.length - 1, 1);
        }
        let newComment = {
          _id: this.editor.render.tempID(),
          f: "comment",
          parent: this.annotation.render._id,
          d: { b: addText },
          a: this.editor.self.modify,
          time: getEpoch()
        };

        replyTx.textContent = "";
        replyTx.focus();
        replySendButton.style.display = "none";
        
        await this.editor.save.push(newComment);
        //await this.editor.history.push("remove", [{ _id: newComment._id }]);

        this.editor.realtimeSelect[newComment._id] = { ...newComment, done: true };
        await this.editor.realtime.forceShort();
      });

      this.updateReplyShadow = () => {
        if (scrollHolder == null || commentReply == null) {
          return;
        }
        if (Math.round(scrollHolder.scrollTop) < Math.round(scrollHolder.scrollHeight - scrollHolder.offsetHeight)) {
          commentReply.style.boxShadow = "var(--lightShadow)";
        } else {
          commentReply.style.removeProperty("box-shadow");
        }
      }
      scrollHolder.addEventListener("scroll", this.updateReplyShadow);
    }

    this.updateCommentFrame();

    /*this.editor.pipeline.subscribe("toolbarCommentMemberUpdate", "update", (data) => {
      if (data._id == this.editor.self) {
        this.openCommentFrame(annotation, thread);
      }
    });*/
    this.editor.pipeline.subscribe("toolbarCommentCollaboratorUpdate", "collaborator_update", (data) => {
      if (this.frame == null) {
        return;
      }
      let updateComments = holder.querySelectorAll('.eCommentItem[modify="' + data._id + '"]');
      for (let i = 0; i < updateComments.length; i++) {
        let comment = updateComments[i];
        let profileHolder = comment.querySelector("div[profileholder]");
        profileHolder.style.setProperty("--themeColor", data.color);
        if (data.image == null) {
          profileHolder.querySelector("div[cursor]").style.removeProperty("display");
          profileHolder.querySelector("div[profile]").style.display = "none";
        } else {
          profileHolder.querySelector("div[profile] img").src = data.image;
          profileHolder.querySelector("div[profile]").style.removeProperty("display");
          profileHolder.querySelector("div[cursor]").style.display = "none";
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = data.name;
        memberTx.title = data.name;
      }
    });
    this.editor.pipeline.subscribe("toolbarCommentMemberUpdate", "set", (data) => {
      if (this.frame == null) {
        return;
      }
      if (data.settings != null && this.editor.selecting[(this.annotation.render ?? {})._id] != null) {
        this.openCommentFrame(this.annotation, thread);
      }
    });

    (async () => {
      await sleep(1);
      if (replyTx != null) {
        replyTx.focus();
      }
      scrollHolder.scrollTo(0, scrollHolder.scrollHeight);
    })();
    
    this.frame.style.transform = "scale(1)";
    this.frame.style.opacity = 1;
  }
  closeCommentFrame = () => {
    if (this.frame == null) {
      return;
    }
    if (this.annotation != null) {
      if (this.annotation.new == true) {
        this.editor.render.remove(this.annotation);
      }
      this.annotation = null;
    }
    let remFrame = this.frame;
    this.frame = null;
    (async () => {
      remFrame.style.opacity = 0;
      remFrame.style.transform = "scale(0)";
      await sleep(300);
      remFrame.remove();
    })();
  }

  clickEnd = async (event) => {
    if (this.editor.isEditorContent(event.target) == false) {
      return;
    }

    let commentTarget = event.target.closest(".eAnnotation[comment]");
    if (commentTarget != null) {
      let annotation = this.editor.annotations[commentTarget.getAttribute("anno")];
      if (annotation == null) {
        return;
      }
      this.closeCommentFrame();
      this.editor.selecting = {};
      this.editor.selecting[annotation.render._id] = {};
      this.toolbar.selection.updateBox();
      return;
    }

    /*if (this.annotation != null) {
      return this.closeCommentFrame();
    }*/

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);

    let annotation = {
      render: {
        _id: this.editor.render.tempID(),
        f: "comment",
        p: [this.editor.math.round(position.x) - (1 / this.editor.zoom), this.editor.math.round(position.y) - (1 / this.editor.zoom)],
        s: [0, 0],
        d: {},
        a: this.editor.self.modify
      },
      new: true
    };

    await this.editor.render.create(annotation);
    let commentElement = annotation.component.getElement();
    let commentHead = commentElement.querySelector("div[commentholder] > div[comment]");
    commentElement.setAttribute("selected", "");
    commentHead.style.transform = "scale(0)";
    commentHead.offsetHeight;
    commentHead.style.transform = "scale(1)";

    this.editor.selecting = {};
    this.toolbar.selection.updateBox();

    this.openCommentFrame(annotation);
  }
  scroll = this.updateCommentFrame;
  enable = () => {
    this.toolbar.sidemenu.open("editor/toolbar/sidemenu/comment");
    this.editor.annotationHolder.removeAttribute("hidecomments");
  }
  disable = () => {
    this.closeCommentFrame();
    if (this.editor.options.comments == false) {
      this.editor.annotationHolder.setAttribute("hidecomments", "");
    }
  };
}
modules["dropdowns/editor/toolbar/comment/more"] = class {
  html = `
  <button class="eToolbarCommentMoreAction" option="edit" close title="Edit the comment."><div></div>Edit Comment</button>
  <button class="eToolbarCommentMoreAction" option="copylink" close title="Copy a share link to the comment thread." style="--themeColor: var(--secondary)"><div></div>Copy Link</button>
  <button class="eToolbarCommentMoreAction" option="delete" close style="--themeColor: var(--red)"></button>
  `;
  css = {
    ".eToolbarCommentMoreAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eToolbarCommentMoreAction:not(:last-child)": `margin-bottom: 4px`,
    ".eToolbarCommentMoreAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".eToolbarCommentMoreAction div svg": `width: 100%; height: 100%`,
    ".eToolbarCommentMoreAction:hover": `background: var(--themeColor); color: #fff`
  };
  js = async (frame, { parent, comment, root }) => {
    let commentID = comment.getAttribute("comment");
    let render = (parent.editor.annotations[commentID] ?? {}).render ?? {};

    let editButton = frame.querySelector('.eToolbarCommentMoreAction[option="edit"]');
    editButton.addEventListener("click", (event) => {
      let commentContent = comment.querySelector(".eCommentContainer > div[content]");
      let commentTx = commentContent.querySelector("div[text]");

      if (parent.lastEditComment != null) {
        parent.lastEditComment.querySelector("div[text]").removeAttribute("contenteditable");
        let actions = parent.lastEditComment.querySelector(".eCommentEditActions");
        if (actions != null) {
          actions.remove();
        }
        parent.updateComment((parent.editor.annotations[parent.lastEditComment.getAttribute("comment")] ?? {}).render);
      }
      parent.lastEditComment = comment;

      commentTx.removeEventListener("paste", parent.pasteListener);
      parent.pasteListener = (event) => { clipBoardRead(event); }
      commentTx.addEventListener("paste", parent.pasteListener);

      commentContent.insertAdjacentHTML("beforeend", `<div class="eCommentEditActions"><button save>Save</button><button cancel>Cancel</button></div>`);
      commentContent.querySelector(".eCommentEditActions button[save]").addEventListener("click", async () => {
        commentTx.removeAttribute("contenteditable");
        let actions = comment.querySelector(".eCommentEditActions");
        if (actions != null) {
          actions.remove();
        }
        if (commentTx.textContent == "") {
          return parent.updateComment((parent.editor.annotations[commentID] ?? {}).render);
        }
        let addText = [];
        for (let i = 0; i < commentTx.childNodes.length; i++) {
          let text = commentTx.childNodes[i].textContent;
          if (text == "") {
            text = "\n";
          }
          addText.push(text);
        }
        while (addText[0].trim() == "") {
          addText.splice(0, 1);
        }
        while (addText[addText.length - 1].trim() == "") {
          addText.splice(addText.length - 1, 1);
        }
        let save = { _id: commentID, d: { b: addText } };
        await parent.editor.save.push(save);
        parent.editor.realtimeSelect[save._id] = save;
        await parent.editor.realtime.forceShort();
      });
      commentContent.querySelector(".eCommentEditActions button[cancel]").addEventListener("click", () => {
        commentTx.removeAttribute("contenteditable");
        let actions = comment.querySelector(".eCommentEditActions");
        if (actions != null) {
          actions.remove();
        }
        parent.updateComment((parent.editor.annotations[commentID] ?? {}).render);
      });
      commentTx.setAttribute("contenteditable", "");
      parent.editor.text.startTextSelection(commentTx, event);
      parent.updateCommentFrame();
    });
    setSVG(editButton.querySelector("div"), "../images/tooltips/edit.svg");
    if (render.a != parent.editor.self.modify) {
      editButton.remove();
    }

    let copyButton = frame.querySelector('.eToolbarCommentMoreAction[option="copylink"]');
    copyButton.addEventListener("click", () => {
      if (commentID.startsWith("pending_") == true) {
        return;
      }
      copyClipboardText("https://markify.link/join?lesson=" + parent.editor.lesson.id + "&annotation=" + commentID, "link");
    });
    setSVG(copyButton.querySelector("div"), "../images/tooltips/copy.svg");
    if (root == false) {
      copyButton.remove();
    }

    let deleteButton = frame.querySelector('.eToolbarCommentMoreAction[option="delete"]');
    if (root == true) {
      deleteButton.title = "Delete the entire comment thread.";
      deleteButton.innerHTML = `<div></div>Delete Thread`;
    } else {
      deleteButton.title = "Delete this comment.";
      deleteButton.innerHTML = `<div></div>Delete Comment`;
    }
    deleteButton.addEventListener("click", async () => {
      let save = { _id: commentID, remove: true };
      //let pushRemoves = [];
      //pushRemoves.push(copyObject((parent.editor.annotations[commentID] ?? {}).render));
      await parent.editor.save.push(save); //, { history: { add: pushRemoves } }
      //await parent.editor.history.push("add", pushRemoves);
      parent.editor.realtimeSelect[save._id] = save;
      await parent.editor.realtime.forceShort();
    });
    setSVG(deleteButton.querySelector("div"), "../images/editor/file/delete.svg");
    if (parent.editor.utils.canMemberModify(render) != true) {
      deleteButton.remove();
    }
  }
}
modules["editor/toolbar/sidemenu/comment"] = class {
  title = "Comment Threads";
  padding = 0;

  html = `<div class="eSideMenuCommentHolder">
    <div class="eSideMenuCommentOptions">
      <div class="eSideMenuCommentOptionsSwitcher" sort>
        <button filter="all" selected title="Show comment threads from everyone.">All</button>
        <button filter="mine" title="Show only comment threads you created.">Mine</button>
      </div>
      <div class="eSideMenuCommentOptionsSwitcher" resolve>
        <button filter="resolved" title="Include resolved comments in the list.">Resolved</button>
      </div>
    </div>
    <div class="eSideMenuCommentContainer" sort="all"></div>
  </div>`;
  css = {
    ".eSideMenuCommentOptions": `position: sticky; box-sizing: border-box; display: flex; flex-wrap: wrap; width: 278px; max-width: 100%; padding: 8px 8px; gap: 8px; left: 0px; top: 0px; background: rgba(var(--background), .8); backdrop-filter: blur(4px); z-index: 2; justify-content: space-between`,
    ".eSideMenuCommentOptionsSwitcher": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 4px; flex-shrink: 0; width: fit-content; max-width: 100%; padding: 4px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 20px; justify-content: center`,
    ".eSideMenuCommentOptionsSwitcher button": `flex: auto; padding: 6px 10px; border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eSideMenuCommentOptionsSwitcher button:hover": `background: var(--hover)`,
    ".eSideMenuCommentOptionsSwitcher button[selected]": `background: var(--theme); color: #fff`,
    ".eSideMenuCommentContainer": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; min-height: 200px; padding: 10px; gap: 10px; z-index: 1; align-items: center`,

    ".eSideMenuCommentItem": `position: relative; width: 100%; border-radius: 16px 16px 16px 16px`, //6px
    '.eSideMenuCommentContainer[sort="mine"] .eSideMenuCommentItem:not([mine])': `display: none`,
    ".eSideMenuCommentContainer:not([resolved]) .eSideMenuCommentItem[resolved]": `display: none`,
    ".eSideMenuCommentItem:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; opacity: .2; z-index: 1; pointer-events: none; transition: .2s`,
    ".eSideMenuCommentItem[selected]:before": `background: var(--themeColor)`,
    ".eSideMenuCommentItem:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; opacity: .6; z-index: 1; pointer-events: none; transition: .2s`,
    ".eSideMenuCommentItem:hover:after": `box-shadow: 0px 0px 6px var(--themeColor)`,
    ".eSideMenuCommentItem div[container]": `position: relative; display: flex; box-sizing: border-box; width: 100%; height: 100%; padding: 4px; border-radius: inherit; overflow: hidden; z-index: 2`,
    ".eSideMenuCommentItem div[profileholder]": `flex-shrink: 0; width: 24px; height: 24px; background: var(--themeColor); border-radius: 12px; overflow: hidden`,
    ".eSideMenuCommentItem div[profileholder] > div[dots]": `display: flex; gap: 2px; width: 100%; height: 100%; justify-content: center; align-items: center`,
    ".eSideMenuCommentItem div[profileholder] > div[dots] > div": `width: 4px; height: 4px; background: var(--pageColor); border-radius: 2px`,
    ".eSideMenuCommentItem div[profileholder] > img": `width: 100%; height: 100%; border-radius: 12px; object-fit: cover`,
    ".eSideMenuCommentItem div[content]": `width: 100%; height: fit-content; margin-left: 6px; text-align: left`,
    ".eSideMenuCommentItem div[memberholder]": `display: flex; width: 100%; max-width: 220px; height: 24px; align-items: center`,
    ".eSideMenuCommentItem div[member]": `flex: 1; min-width: 0; max-width: fit-content; font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSideMenuCommentItem div[time]": `margin: 0 6px; color: var(--darkGray); font-size: 12px; font-weight: 500; white-space: nowrap`,
    ".eSideMenuCommentItem button": `pointer-events: none; position: relative; display: flex; width: 24px; height: 24px; padding: 0; margin-left: auto; border-radius: 16px; justify-content: center; align-items: center`,
    ".eSideMenuCommentItem button:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--secondary); opacity: 0; border-radius: inherit; transition: .2s`,
    ".eSideMenuCommentItem button:hover:before": `opacity: .4`,
    ".eSideMenuCommentItem button > svg": `width: 18px; height: 18px; z-index: 2`,
    ".eSideMenuCommentItem button[selected]:before": `opacity: 1 !important`,
    ".eSideMenuCommentItem button[selected] > svg": `filter: brightness(0) invert(1)`,
    ".eSideMenuCommentItem div[text]": `box-sizing: border-box; width: 100%; max-width: 220px; height: fit-content; font-size: 12px; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden`,
    ".eSideMenuCommentItem div[replycount]": `display: none; width: 100%; max-width: 220px; margin-top: 4px; color: var(--theme); font-size: 12px; font-weight: 600`
  };
  //maxLoadAmount = 100;
  js = async (frame) => {
    let sideMenu = frame.closest(".eSideMenu");
    let holder = frame.querySelector(".eSideMenuCommentContainer");

    this.updateComment = async (render, options = {}) => {
      let comment;
      if (options.new != true) {
        comment = holder.querySelector('.eSideMenuCommentItem[comment="' + render._id + '"]');
        if (comment == null && render.pending != null) {
          comment = holder.querySelector('.eSideMenuCommentItem[comment="' + render.pending + '"]');
        }
      }
      if (comment == null) {
        let insertPosition = "afterbegin";
        if (options.new == true) {
          insertPosition = "beforeend";
        }
        holder.insertAdjacentHTML(insertPosition, `<a class="eSideMenuCommentItem" new>
          <div container>
            <div profileholder></div>
            <div content>
              <div memberholder>
                <div member></div>
                <div time></div>
                <button resolve></button>
              </div>
              <div text></div>
              <div replycount></div>
            </div>
          </div>
        </a>`);
        comment = holder.querySelector(".eSideMenuCommentItem[new]");
        comment.removeAttribute("new");
        if (options.new != true) {
          let holderChildren = holder.children;
          for (let i = 0; i < holderChildren.length; i++) {
            let child = holderChildren[i];
            if (parseInt(child.getAttribute("time")) > (render.time ?? render.sync)) {
              holder.insertBefore(comment, child);
            } else {
              break;
            }
          }
          sideMenu.removeAttribute("hidden");
        }

        setSVG(comment.querySelector("button[resolve]"), "../images/editor/actions/resolve.svg");
      }
      comment.setAttribute("comment", render._id);

      let setTime = render.time ?? render.sync;
      if (setTime != null) {
        comment.setAttribute("time", setTime);
        let timeTx = comment.querySelector("div[time]");
        timeTx.textContent = timeSince(setTime);
        timeTx.title = formatFullDate(setTime);
      }

      let commentTx = comment.querySelector("div[text]");
      let richText = render.d ?? {};
      let setHTML = "";
      for (let i = 0; i < (richText.b ?? []).length; i++) {
        let addHTML = "";
        if (richText.b[i] != "\n") {
          addHTML = "<div>" + cleanString(richText.b[i]) + "</div>";
        } else {
          addHTML = "<br>";
        }
        setHTML += addHTML;
      }
      commentTx.innerHTML = setHTML;

      let replyTx = comment.querySelector("div[replycount]");
      let replyCount = Object.keys((this.editor.comments[render._id] ?? {}).replies ?? {}).length;
      if (replyCount > 0) {
        if (replyCount > 1) {
          replyTx.textContent = replyCount + " Replies";
        } else {
          replyTx.textContent = "1 Reply";
        }
        replyTx.style.display = "unset";
      } else {
        replyTx.style.removeProperty("display");
      }

      let modify = render.a ?? render.m;
      comment.setAttribute("modify", modify);
      if (modify == this.editor.self.modify) {
        comment.setAttribute("mine", "");
      }
      this.editor.utils.getCollaborator(modify, (collaborator) => {
        if (comment == null) {
          return;
        }

        comment.style.setProperty("--themeColor", collaborator.color);
        let profileHolder = comment.querySelector("div[profileholder]");
        if (collaborator.image != null) {
          profileHolder.innerHTML = `<img src="../images/profiles/default.svg" />`;
          profileHolder.querySelector("img").src = collaborator.image;
        } else {
          profileHolder.innerHTML = `<div dots><div></div><div></div><div></div></div>`;
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = collaborator.name;
        memberTx.title = collaborator.name;
      });

      let resolveButton = comment.querySelector("button[resolve]");
      if (render.resolved != true) {
        resolveButton.style.display = "none";
        comment.removeAttribute("resolved");
        //resolveButton.removeAttribute("selected");
      } else {
        resolveButton.style.removeProperty("display");
        comment.setAttribute("resolved", "");
        //resolveButton.setAttribute("selected", "");
      }

      if (this.editor.selecting[render._id] == null) {
        comment.removeAttribute("selected");
      } else {
        comment.setAttribute("selected", "");
      }

      if (render.remove == true) {
        comment.remove();
        if (holder.childElementCount < 1) {
          sideMenu.setAttribute("hidden", "");
        }
      }
    }

    frame.addEventListener("click", async (event) => {
      let target = event.target;
      let comment = target.closest(".eSideMenuCommentItem");
      if (comment != null) {
        let annotation = this.editor.annotations[comment.getAttribute("comment")] ?? {};
        let render = annotation.render ?? {};
        if (render._id != null) {
          await this.editor.render.create(annotation);
          this.editor.selecting = {};
          this.editor.selecting[render._id] = {};
          this.toolbar.selection.updateBox();
          this.editor.utils.scrollToAnnotation(render, { animation: false });
        }
        return;
      }
      let filterHolder = target.closest(".eSideMenuCommentOptionsSwitcher");
      if (filterHolder != null) {
        let filterButton = target.closest("button");
        if (filterButton != null) {
          let currentSelected = filterHolder.querySelector("button[selected]");
          if (currentSelected != null) {
            currentSelected.removeAttribute("selected");
          }
          if (filterButton != currentSelected || filterHolder.childElementCount > 1) {
            filterButton.setAttribute("selected", "");
            if (filterHolder.hasAttribute("sort") == true) {
              holder.setAttribute("sort", filterButton.getAttribute("filter"));
            }
          }
          if (filterHolder.hasAttribute("resolve") == true) {
            if (filterButton.hasAttribute("selected") == true) {
              holder.setAttribute("resolved", "");
            } else {
              holder.removeAttribute("resolved");
            }
          }
        }
        return;
      }
    });
    
    //let currentComments = { ...this.editor.comments };
    let comments = Object.values(this.editor.comments).sort((a, b) => { return (b.render.time ?? b.render.sync) - (a.render.time ?? a.render.sync); });
    //let renderAmount = Math.min(comments.length, this.maxLoadAmount);
    for (let i = 0; i < comments.length; i++) {
      this.updateComment(comments[i].render, { new: true });
    }
    let handleCommentChange = (render) => {
      let rootComment;
      if (render.parent != null) {
        let parent = (this.editor.annotations[render.parent] ?? {}).render;
        if (parent != null) {
          if (parent.f == "comment") {
            rootComment = parent;
          }
        } else {
          return;
        }
      }
      if (rootComment == null) {
        this.updateComment(render);
      } else {
        this.updateComment(rootComment);
      }
    } 
    this.toolbar.sidemenu.subscribe("comment_update", handleCommentChange);
    this.toolbar.sidemenu.subscribe("comment_select_start", handleCommentChange);
    this.toolbar.sidemenu.subscribe("comment_select_end", handleCommentChange);
    this.toolbar.sidemenu.subscribe("collaborator_update", (collaborator) => {
      let updateComments = holder.querySelectorAll('.eSideMenuCommentItem[modify="' + collaborator._id + '"]');
      for (let i = 0; i < updateComments.length; i++) {
        let comment = updateComments[i];
        comment.style.setProperty("--themeColor", collaborator.color);
        let profileHolder = comment.querySelector("div[profileholder]");
        if (collaborator.image != null) {
          profileHolder.innerHTML = `<img src="../images/profiles/default.svg" />`;
          profileHolder.querySelector("img").src = collaborator.image;
        } else {
          profileHolder.innerHTML = `<div dots><div></div><div></div><div></div></div>`;
        }
        let memberTx = comment.querySelector("div[member]");
        memberTx.textContent = collaborator.name;
        memberTx.title = collaborator.name;
      }
    });

    if (holder.childElementCount < 1) {
      sideMenu.setAttribute("hidden", "");
    }
  }
}

modules["editor/toolbar/page"] = class extends modules["editor/toolbar/resize_placement"] {
  CAN_FLIP = false;
  MINIMUM_SIZE = 100;

  enable = () => {
    let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "page",
      c: toolPreference.color.selected,
      title: "Untitled Page",
      s: [200, 275],
      l: this.editor.minLayer - 1
    };
    if ((toolPreference.background ?? "blank") != "blank") {
      this.PROPERTIES.background = toolPreference.background;
    }
  }
}

modules["editor/toolbar/upload"] = class extends modules["editor/toolbar/resize_placement"] {
  ACTIVE = false;
  MINIMUM_SIZE = 100;
  EVEN_SCALE = true;

  enable = (extra) => {
    if (this.imageBlob != null) {
      return;
    }

    //let toolPreference = this.parent.getToolPreference();
    this.PROPERTIES = {
      f: "media",
      s: [200, 200],
      //c: (toolPreference.color ?? {}).selected,
      //o: toolPreference.opacity,
      l: this.editor.maxLayer + 1
    };

    let uploadInput = this.parent.toolbar.toolbar.querySelector(".eToolMediaInput");
    if (uploadInput != null) {
      uploadInput.remove();
    }
    this.parent.toolbar.toolbar.insertAdjacentHTML("beforeend", `<input class="eToolMediaInput" tooleditor type="file" accept="image/*" multiple="true" hidden="true">`);
    uploadInput = this.parent.toolbar.toolbar.querySelector(".eToolMediaInput");

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
              let [code, result] = await sendRequest("POST", "lessons/save/upload", form, { noFileType: true, session: this.editor.session });
              if (code == 200) {
                let preload = new Image();
                preload.src = assetURL + result.file;
                preload.onload = () => {
                  if (this.newAnnotation != null && this.newAnnotation.render != null) {
                    this.editor.save.push({ _id: this.newAnnotation.render._id, d: result.file });
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
      this.uploadInput = uploadInput;
    } else {
      startImagePlace(extra.file, extra.event);
    }
  }
  toolbar_click = () => {
    if (this.uploadInput != null) {
      this.uploadInput.click();
    }
  }
}

modules["editor/toolbar/embed"] = class extends modules["editor/toolbar/placement"] {
  TARGET_QUERY = '.eActionBar:not([remove]) .eTool[module="editor/toolbar/setembed"]';
  
  enable = (extra) => {
    this.PROPERTIES = {
      f: "embed",
      s: [400, 350],
      l: this.editor.maxLayer + 1
    };
    if (extra != null && extra.link != null) {
      this.link = extra.link;
      this.FORCE_SAVE = true;
    }
    if (this.link != null) {
      this.PROPERTIES.d = this.link;
    }
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
      <button class="eTool" enablepicker option><div><img class="eSubToolImage" src="../images/editor/picker.svg"></div></button>
    </div>
    <div class="eSubToolColorPicker">
      <div class="eSubToolColorPickerTop">
        <button class="eSubToolColorPickerType largeButton border" title="Change Color Scale"></button>
        <input class="eSubToolColorPickerField" name="Color Input" />
        <button class="eSubToolColorPickerTopBack buttonAnim border"></button>
      </div>
      <div class="eSubToolColorPickerShade">
        <div><canvas></canvas></div>
        <button></button>
      </div>
      <div class="eSubToolColorPickerColorSelector">
        <button class="eSubToolColorPickerEyedroper buttonAnim border" title="Eyedropper"><img src="../images/editor/eyedropper.svg"></button>
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
    ".eSubToolColorPickerTopBack svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
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
    ".eSubToolColorPickerField": `box-sizing: border-box; flex: 1; min-width: 0px; height: 28px; padding: 0; margin: 0 6px; background: unset; border: solid 3px var(--secondary); outline: none; border-radius: 14px; font-family: var(--font); font-size: 14px; font-weight: 700; color: var(--theme); text-align: center`,
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

    let closeButton = frame.querySelector(".eSubToolColorPickerTopBack");
    closeButton.addEventListener("click", async () => {
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
    setSVG(closeButton, "../images/tooltips/close.svg");

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
    ".eSubToolThicknessInput": `width: 40px; height: 26px; background: unset; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
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
    await setSVG(opacity, "../images/editor/toolbar/opacity.svg");
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
      await setSVG(opacity, "../images/editor/toolbar/opacity.svg");
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
    ".eSubToolOpacityInput": `width: 40px; height: 26px; background: unset; border: solid 3px var(--secondary); outline: none; border-radius: 17px; font-family: var(--font); font-size: 18px; font-weight: 700; color: var(--theme); text-align: center`,
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

modules["editor/toolbar/style"] = class {
  setActionButton = async (button) => {
    button.innerHTML = `<div class="eSubToolStyleHolder"><div class="eSubToolStyle"></div></div>`;
    let buttonElem = button.querySelector(".eSubToolStyle");
    let preference = this.parent.getPreferenceTool();
    let selectedOpacity = (preference.o ?? 0) / 100;
    let color = this.editor.utils.hexToRGBString(preference.c, selectedOpacity);
    let prefI = preference.i;
    let prefB = preference.b;
    if (preference.d == "line") {
      prefI = false;
      if (prefB == "none") {
        prefB = "solid";
      }
    }
    if (prefB != "none") {
      if (prefI != true) {
        buttonElem.style.border = (prefB ?? "solid") + " 4px " + color; //var(--darkGray)
        buttonElem.style.removeProperty("background");
      } else {
        buttonElem.style.border = (prefB ?? "solid") + " 4px " + this.editor.utils.hexToRGBString(this.editor.utils.darkenHex(preference.c, 20), selectedOpacity);
        buttonElem.style.background = color;
      }
    } else {
      buttonElem.style.background = color;
      buttonElem.style.removeProperty("border");
    }
    buttonElem.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
  }

  TOOLTIP = "Styling";

  html = `
    <div class="eSubToolStyleContainer eHorizontalToolsHolder" keeptooltip>
      <button class="eTool" tooltip="Filled" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" fill></div></div></div></button>
      <div class="eVerticalDivider"></div>
      <button class="eTool" tooltip="Solid Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" solid></div></div></div></button>
      <button class="eTool" tooltip="Dashed Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" dashed></div></div></div></button>
      <button class="eTool" tooltip="No Border" option><div><div class="eSubToolStyleHolder"><div class="eSubToolStyle" none></div></div></div></button>
    </div>
  `;
  css = {
    ".eSubToolStyleHolder": `display: flex; width: 28px; height: 28px; margin: 4px; background: var(--pageColor); border: solid 3px var(--pageColor); border-radius: 11px; justify-content: center; align-items: center`,
    ".eSubToolStyle": `box-sizing: border-box; width: 100%; height: 100%; border-radius: 8px`,

    ".eSubToolStyleContainer": `overflow: auto; border-radius: inherit`,
    ".eSubToolStyleContainer .eSubToolStyle[none]": `width: calc(100% - 8px); height: calc(100% - 8px); margin: 4px; border-radius: 4px`,
  };
  js = async (frame) => {
    let preference = this.toolbar.getPreferenceTool();
    let selectedI;
    let selectedB;

    let fill = frame.querySelector(".eSubToolStyle[fill]");
    let solid = frame.querySelector(".eSubToolStyle[solid]");
    let dashed = frame.querySelector(".eSubToolStyle[dashed]");
    let none = frame.querySelector(".eSubToolStyle[none]");

    let fillButton = fill.closest(".eTool");
    let solidButton = solid.closest(".eTool");
    let dashedButton = dashed.closest(".eTool");
    let noneButton = none.closest(".eTool");

    this.redraw = () => {
      preference = this.toolbar.getPreferenceTool();
      selectedI = preference.i;
      selectedB = preference.b;

      if (preference.d == "line") {
        fillButton.style.display = "none";
        frame.querySelector(".eVerticalDivider").style.display = "none";
        noneButton.style.display = "none";
        selectedI = false;
        if (selectedB == "none") {
          selectedB = "solid";
        }
      }

      fillButton.removeAttribute("selected");
      solidButton.removeAttribute("selected");
      dashedButton.removeAttribute("selected");
      noneButton.removeAttribute("selected");

      if (selectedB != "none") {
        if (selectedI != true) {
          if ((selectedB ?? "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        } else {
          fillButton.setAttribute("selected", "");
          if ((selectedB ?? "solid") == "solid") {
            solidButton.setAttribute("selected", "");
          } else {
            dashedButton.setAttribute("selected", "");
          }
        }
      } else {
        fillButton.setAttribute("selected", "");
        noneButton.setAttribute("selected", "");
      }

      let selectedOpacity = (preference.o ?? 0) / 100;
      let color = this.editor.utils.hexToRGBString(preference.c, selectedOpacity);
      let borderColor = color;
      if (selectedI == true || selectedB == "none") {
        borderColor = this.editor.utils.hexToRGBString(this.editor.utils.darkenHex(preference.c, 20), selectedOpacity);
      }

      fill.style.background = color;
      solid.style.border = "solid 4px " + borderColor;
      dashed.style.border = "dashed 4px " + borderColor;
      //none.style.border = "solid 4px var(--pageColor)";
      none.style.background = color;
      none.parentElement.style.border = "solid 3px " + color;

      fill.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
      solid.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
      dashed.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
      none.style.boxShadow = "0px 0px 3px 0px " + this.editor.utils.borderColorBackgroundRGBA(preference.c, null, selectedOpacity);
    }
    this.redraw();

    fillButton.addEventListener("click", async () => {
      if (selectedI != true) {
        selectedI = true;
      } else {
        selectedI = false;
      }
      this.toolbar.setToolPreference("filled", selectedI);
      await this.toolbar.saveSelecting(() => { return { i: selectedI }; }, { reuseActionBar: true });
      this.redraw();
    });
    solidButton.addEventListener("click", async () => {
      selectedB = "solid";
      await this.toolbar.saveSelecting(() => { return { b: selectedB }; }, { reuseActionBar: true });
      this.redraw();
    });
    dashedButton.addEventListener("click", async () => {
      selectedB = "dashed";
      await this.toolbar.saveSelecting(() => { return { b: selectedB }; }, { reuseActionBar: true });
      this.redraw();
    });
    noneButton.addEventListener("click", async () => {
      selectedB = "none";
      await this.toolbar.saveSelecting(() => { return { b: selectedB }; }, { reuseActionBar: true });
      this.redraw();
    });
  }
}

modules["editor/toolbar/delete"] = class {
  setActionButton = async (button) => {
    this.button.style.setProperty("--hoverColor", "var(--error");
    this.button.style.setProperty("--hoverTooltip", "var(--error");
    setSVG(button, "../images/editor/toolbar/delete.svg");

    let selectKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let render = ({ ...((this.editor.annotations[selectID] ?? {}).render ?? {}), ...(this.editor.selecting[selectID] ?? {}) }) ?? {};
      if (this.editor.utils.isPlaceholderLocked(render) == true) {
        return false;
      }
    }
  }

  TOOLTIP = "Delete";
  ADD_DIVIDE_BEFORE = true;
  FULL_CLICK = true;

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { remove: true }; });
  }
}

modules["editor/toolbar/more"] = class {
  setActionButton = async (button) => {
    this.button.setAttribute("dropdowntitle", "More");
    setSVG(button, "../images/editor/toolbar/more.svg");
  }

  TOOLTIP = "More";
  FULL_CLICK = true;
  SHOW_ON_LOCK = true;

  duplicate = async (handle, fromKeybind) => {
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

    let minLeft;
    let minTop;
    let maxLeft;
    let maxTop;
    for (let i = 0; i < selectKeys.length; i++) {
      let annoID = selectKeys[i];
      let annotation = this.editor.annotations[annoID] ?? {};
      let render = annotation.render;
      if (render == null || this.parent.checkSubToolEnabled(render.f) == false) {
        continue;
      }
      if (fromKeybind == true) {
        let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
        if (annoModule.KEYBINDS_ENABLED == false) {
          continue;
        }
      }
      let addChunks = this.editor.utils.chunksFromAnnotation(render);
      for (let c = 0; c < addChunks.length; c++) {
        checkChunks[addChunks[c]] = true;
      }
      let annoRect = this.editor.utils.getRect(render);
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = this.editor.math.rotatedBounds(annoRect.x, annoRect.y, annoRect.endX, annoRect.endY, annoRect.rotation);
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
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? maxZIndex ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? minZIndex ?? this.editor.utils.minLayer);
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
      let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annoModule.KEEP_ON_PARENT_DELETE == true) {
        continue;
      }
      let { selectingParent } = this.editor.utils.getRect(render);
      if (selectingParent == false) {
        continue;
      }
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? maxZIndex ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? minZIndex ?? this.editor.utils.minLayer);
      let tempID = this.editor.render.tempID();
      parentIDs[render._id] = tempID;
      saveAnnoData.push({ ...copyObject(render), _id: tempID });
    }

    let { x: centerPageX, y: centerPageY } = this.editor.utils.scaleToDoc(this.editor.page.offsetWidth / 2, this.editor.page.offsetHeight / 2);
    let centerX = (maxLeft - minLeft) / 2;
    let centerY = (maxTop - minTop) / 2;
    
    maxZIndex++;
    this.editor.selecting = {};
    for (let i = 0; i < saveAnnoData.length; i++) {
      let newAnno = saveAnnoData[i];
      let checkParent = parentIDs[newAnno.parent];
      if (checkParent != null) {
        newAnno.parent = checkParent;
      } else {
        let { annoX, annoY, rotation } = this.editor.utils.getRect(newAnno);
        let inViewport = this.editor.utils.annotationInViewport(newAnno);
        if (handle != null || inViewport == true) {
          delete newAnno.parent;
          newAnno.p = [annoX + offsetX, annoY + offsetY];
          newAnno.r = rotation;
        } else {
          newAnno.p[0] += centerPageX + centerX - maxLeft;
          newAnno.p[1] += centerPageY + centerY - maxTop;
        }
      }
      if (newAnno.l != null) {
        newAnno.l = maxZIndex + ((newAnno.l ?? this.editor.utils.maxLayer) - minZIndex);
      }
      delete newAnno.m;
      let setLock = [];
      let canLock = this.editor.utils.canChangeLock(newAnno);
      for (let l = 0; l < canLock.length; l++) {
        let lock = canLock[l];
        if ((newAnno.lock ?? []).includes(lock) == true) {
          setLock.push(lock);
        }
      }
      newAnno.lock = setLock;
      this.editor.selecting[newAnno._id] = newAnno;
    }

    this.parent.selection.action = "save";
    await this.parent.selection.endAction();
  }
  /*lock = async () => {
    await this.toolbar.saveSelecting(() => { return { lock: true }; }, { redrawActionBar: true });
  }*/
  signature = async (set) => {
    await this.toolbar.saveSelecting(() => { return { sigHidden: set }; });
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
      this.editor.minLayer--;
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
}
modules["dropdowns/editor/toolbar/more"] = class {
  html = `
  <button class="eToolbarMoreAction" option="duplicate" close title="Duplicate"><div></div>Duplicate</button>
  <button class="eToolbarMoreAction" option="lock" title="Change the locking options."><div></div>Locking</button>
  <button class="eToolbarMoreAction" option="signature" close><div></div><span></span></button>
  <div class="eToolbarMoreLine" option="layers"></div>
  <button class="eToolbarMoreAction" option="bringfront" close title="Bring Forward"><div></div>Bring to Front</button>
  <button class="eToolbarMoreAction" option="sendback" close title="Send Backward"><div></div>Send to Back</button>
  <div class="eToolbarMoreLine" option="duplicate"></div>
  <button class="eToolbarMoreAction" option="copylink" close title="Copy a share link to element." style="--themeColor: var(--secondary)"><div></div>Copy Link</button>
  `;
  css = {
    ".eToolbarMoreAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eToolbarMoreAction:not(:last-child)": `margin-bottom: 4px`,
    ".eToolbarMoreAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".eToolbarMoreAction div svg": `width: 100%; height: 100%`,
    ".eToolbarMoreAction:hover": `background: var(--themeColor); color: #fff`,
    ".eToolbarMoreLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".eToolbarMoreShowMe": `color: var(--theme); font-weight: 700`
  };
  js = async (frame, { parent }) => {
    let duplicateButton = frame.querySelector('.eToolbarMoreAction[option="duplicate"]');
    let duplicateLine = frame.querySelector('.eToolbarMoreLine[option="duplicate"]');
    duplicateButton.addEventListener("click", () => { parent.duplicate(); });

    let lockButton = frame.querySelector('.eToolbarMoreAction[option="lock"]');
    lockButton.addEventListener("click", () => {
      //parent.lock();
      dropdownModule.open(lockButton, "dropdowns/editor/toolbar/more/locking", { parent: parent });
    });

    let signatureButton = frame.querySelector('.eToolbarMoreAction[option="signature"]');
    signatureButton.addEventListener("click", () => { parent.signature(signatureButton.hasAttribute("signaturehidden") == false); });

    let layersLine = frame.querySelector('.eToolbarMoreLine[option="layers"]');
    let frontButton = frame.querySelector('.eToolbarMoreAction[option="bringfront"]');
    frontButton.addEventListener("click", () => { parent.bringToFront(); });
    let backButton = frame.querySelector('.eToolbarMoreAction[option="sendback"]');
    backButton.addEventListener("click", () => { parent.sendToBack(); });

    let shareButton = frame.querySelector('.eToolbarMoreAction[option="copylink"]');
    shareButton.addEventListener("click", () => { parent.copyLink(); });

    setSVG(duplicateButton.querySelector("div"), "../images/editor/toolbar/duplicate.svg");
    setSVG(lockButton.querySelector("div"), "../images/editor/toolbar/lock.svg");
    setSVG(signatureButton.querySelector("div"), "../images/editor/toolbar/signature.svg");
    setSVG(frontButton.querySelector("div"), "../images/editor/rearrange/up.svg");
    setSVG(backButton.querySelector("div"), "../images/editor/rearrange/down.svg");
    setSVG(shareButton.querySelector("div"), "../images/tooltips/copy.svg");

    parent.redraw = () => {
      if (frame == null) {
        return;
      }
      let showLock = parent.editor.self.access > 0;
      let pending = false;
      let allSticky = true;
      let isSignatureHidden = false;
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
          if (render.f != "sticky") {
            allSticky = false;
          } else if (render.sigHidden == true) {
            isSignatureHidden = true;
          }
        }
      }
      if (showLock == true) {
        //lockButton.style.display = "flex";
        if (allSticky == false) {
          signatureButton.style.display = "none";
        } else {
          if (isSignatureHidden == false) {
            signatureButton.removeAttribute("signaturehidden");
            signatureButton.querySelector("span").textContent = "Hide Author";
            signatureButton.title = "Hide the sticky note signature text."
          } else {
            signatureButton.setAttribute("signaturehidden", "");
            signatureButton.querySelector("span").textContent = "Show Author";
            signatureButton.title = "Show the sticky note signature text."
          }
          signatureButton.style.display = "flex";
        }
        layersLine.style.display = "block";
        frontButton.style.display = "flex";
        backButton.style.display = "flex";
      } else {
        //lockButton.style.display = "none";
        signatureButton.style.display = "none";
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
modules["dropdowns/editor/toolbar/more/locking"] = class {
  html = `
  <div class="eLockingHolder">
    <button class="eLockingOption" type="standard" style="--themeColor: var(--green)" title="Locked annotations must be unlocked to edit."><img src="../images/editor/locking/standard.svg"><div class="eLockingInfo"><div class="eLockingTitle"><b>Standard</b> Lock</div><div class="eLockingDesc">Locked annotations must be unlocked to edit.</div></div></button>
    <button class="eLockingOption" type="collaborator" style="--themeColor: var(--theme)" title="Only the author can edit locked annotations."><img src="../images/editor/locking/collaborator.svg"><div class="eLockingInfo"><div class="eLockingTitle"><b>Collaborator</b> Lock</div><div class="eLockingDesc">Only the author can edit locked annotations.</div></div></button>
    <button class="eLockingOption" type="placeholder" style="--themeColor: var(--purple)" title="Editors cannot move, resize, rotate, or delete annotations."><img src="../images/editor/locking/placeholder.svg"><div class="eLockingInfo"><div class="eLockingTitle"><b>Placeholder</b> Lock</div><div class="eLockingDesc">Editors cannot move, resize, rotate, or delete annotations.</div></div></button>
  </div>
  `;
  css = {
    ".eLockingHolder": `display: flex; flex-direction: column; width: max-content; max-width: 100%; gap: 6px; align-items: center; border-radius: inherit`,
    ".eLockingOption": `position: relative; display: flex; flex-wrap: wrap; min-width: 100%; padding: 0; border-radius: 6px; align-items: center; transition: .15s`,
    ".eLockingOption[selected]": `background: var(--themeColor); color: #fff`,
    ".eLockingOption[selected] img": `filter: brightness(0) invert(1)`,
    ".eLockingOption[selected] b": `color: #fff`,
    ".eLockingOption:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; opacity: .2; border-radius: inherit; transition: .15s`,
    ".eLockingOption:not([selected]):hover:before": `background: var(--themeColor)`,
    ".eLockingOption:active": `transform: scale(.95); border-radius: 12px`,
    ".eLockingOption img": `width: 50px; height: 50px; margin: 6px 6px 6px 10px; transition: .15s`,
    ".eLockingOption .eLockingInfo": `margin: 6px; text-align: left`,
    ".eLockingOption .eLockingTitle": `margin-right: 6px; font-size: 18px; font-weight: 600`,
    ".eLockingOption b": `color: var(--themeColor); font-weight: 800; transition: .15s`,
    ".eLockingOption .eLockingDesc": `max-width: 202px; font-size: 14px`
  };
  js = async (frame, extra) => {
    extra = extra ?? {};
    let parent = extra.parent ?? this.parent;
    let editor = this.editor ?? parent.editor;
    let toolbar = this.toolbar ?? parent.toolbar;

    let standardLock = frame.querySelector('.eLockingOption[type="standard"]');
    let collaboratorLock = frame.querySelector('.eLockingOption[type="collaborator"]');
    let placeholderLock = frame.querySelector('.eLockingOption[type="placeholder"]');

    let redraw = () => {
      let lockOptions = ["s", "c", "p"];
      let locks = []; //editor.utils.getLocked(toolbar.getPreferenceTool());
      let selectKeys = Object.keys(editor.selecting);
      for (let i = 0; i < selectKeys.length; i++) {
        let annotation = editor.annotations[selectKeys[i]];
        let render = annotation.render ?? annotation.revert ?? {};
        let renderLocks = editor.utils.getLocked(render);
        for (let l = 0; l < renderLocks.length; l++) {
          let lock = renderLocks[l];
          if (locks.includes(lock) == false) {
            locks.push(lock);
          }
        }
        let canChangeLocks = editor.utils.canChangeLock(render);
        for (let l = 0; l < lockOptions.length; l++) {
          if (canChangeLocks.includes(lockOptions[l]) == false) {
            lockOptions.splice(l, 1);
            l--;
          }
        }
      }
      
      if (lockOptions.includes("s") == true) {
        standardLock.removeAttribute("disabled");
      } else {
        standardLock.setAttribute("disabled", "");
      }
      if (locks.includes("s") == false) {
        standardLock.removeAttribute("selected");
      } else {
        standardLock.setAttribute("selected", "");
      }
      if (lockOptions.includes("c") == true && editor.settings.editOthersWork != true && (locks.includes("p") == false || locks.includes("c") == true)) {
        collaboratorLock.removeAttribute("disabled");
      } else {
        collaboratorLock.setAttribute("disabled", "");
      }
      if (locks.includes("c") == false || editor.settings.editOthersWork == true) {
        collaboratorLock.removeAttribute("selected");
      } else {
        collaboratorLock.setAttribute("selected", "");
      }
      if (lockOptions.includes("p") == true) {
        placeholderLock.removeAttribute("disabled");
      } else {
        placeholderLock.setAttribute("disabled", "");
      }
      if (locks.includes("p") == false) {
        placeholderLock.removeAttribute("selected");
      } else {
        placeholderLock.setAttribute("selected", "");
      }
    }
    redraw();
    if (extra.parent != null) {
      parent.redraw = redraw;
    } else {
      this.redraw = redraw;
      frame.querySelector(".eLockingHolder").style.padding = "6px";
    }

    standardLock.addEventListener("click", async () => {
      let setLock = !standardLock.hasAttribute("selected");
      await toolbar.saveSelecting((render) => {
        let lock = editor.utils.getLocked(render);
        let index = lock.indexOf("s");
        if (index > -1) {
          lock.splice(index, 1);
        }
        if (setLock == true) {
          lock.push("s");
        }
        return { lock: lock };
      });
      redraw();
      editor.save.syncSave(true);
    });
    collaboratorLock.addEventListener("click", async () => {
      let setLock = !collaboratorLock.hasAttribute("selected");
      await toolbar.saveSelecting((render) => {
        let lock = editor.utils.getLocked(render);
        let index = lock.indexOf("c");
        if (index > -1) {
          lock.splice(index, 1);
        }
        let save = { lock: lock };
        if (setLock == true) {
          lock.push("c");
        } else if (lock.includes("p") == true) {
          save.placeholder = true;
        }
        return save;
      });
      redraw();
      editor.save.syncSave(true);
    });
    placeholderLock.addEventListener("click", async () => {
      let setLock = !placeholderLock.hasAttribute("selected");
      await toolbar.saveSelecting((render) => {
        let lock = editor.utils.getLocked(render);
        let index = lock.indexOf("p");
        if (index > -1) {
          lock.splice(index, 1);
        }
        let save = {};
        if (setLock == true) {
          lock.push("p");
          let collaboratorLockIndex = lock.indexOf("c");
          if (collaboratorLockIndex > -1) {
            lock.splice(collaboratorLockIndex, 1);
          }
          if (render.sig != null) {
            save.sig = null;
          }
          save.placeholder = true;
        } else {
          save.placeholder = null;
        }
        save.lock = lock;
        return save;
      });
      redraw();
      editor.save.syncSave(true);
    });
  }
}

modules["editor/toolbar/unlock"] = class extends modules["dropdowns/editor/toolbar/more/locking"] {
  setActionButton = async (button) => {
    setSVG(button, "../images/editor/toolbar/lock.svg");

    let showLock = false;
    let selectKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let selectID = selectKeys[i];
      let render = ({ ...((this.editor.annotations[selectID] ?? {}).render ?? {}), ...(this.editor.selecting[selectID] ?? {}) }) ?? {};
      let locks = this.editor.utils.getLocked(render);
      if (locks.includes("s") == true || locks.includes("p") == true) {
        showLock = true;
      } else if (locks.includes("c") == true && this.editor.utils.canMemberModify(render) == false) {
        showLock = true;
      }
    }

    if (showLock == false && this.button.hasAttribute("selected") == true) {
      this.toolbar.selection.closeActionFrame();
    }
    return showLock;
  }

  TOOLTIP = "Locking";
  SHOW_ON_LOCK = true;
  ADD_DIVIDE_BEFORE = true;

  /*js = async () => {
    await this.setActionButton();
    if (this.disabled == true) {
      return alertModule.open("error", "<b>You Didn't Lock This</b>Only the member who locked this can unlock it.");
    }
    await this.toolbar.saveSelecting((render) => {
      if (render.lock == true) {
        return { lock: false };
      }
    }, { redrawActionBar: true });
  }*/
}

modules["editor/toolbar/collaborator"] = class {
  setActionButton = async (button) => {
    if (this.editor.settings.anonymousMode == true && this.editor.self.access < 4) {
      return false;
    }

    let modifiedBy;
    let selectKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let annotation = this.editor.annotations[selectKeys[i]].render ?? {};
      let setModifiedBy = annotation.m ?? annotation.a;
      if (setModifiedBy == null || (modifiedBy != null && setModifiedBy != modifiedBy)) {
        return false;
      }
      modifiedBy = setModifiedBy;
    }
    if (modifiedBy == null || modifiedBy == this.editor.self.modify || modifiedBy.length != 24) {
      return false;
    }

    let collaborator = this.editor.collaborators[modifiedBy];
    if (collaborator != null) {
      if (collaborator._id == null) {
        return false;
      }
    }

    let image = button.querySelector(".eSubToolCollaborator");
    if (image == null) {
      button.insertAdjacentHTML("beforeend", `<img class="eSubToolCollaborator" src="../images/profiles/default.svg">`);
      image = button.querySelector(".eSubToolCollaborator");
    }

    (async () => {
      if (collaborator == null) { // Fetch to get the collaborator
        this.button.setAttribute("disabled", "");
        collaborator = await this.editor.utils.getCollaborator(modifiedBy);
      }
      if (collaborator._id == null) {
        return this.toolbar.selection.updateActionBar({ redrawActionBar: true });
      }

      if (image != null) {
        if (image.getAttribute("src") != (collaborator.image ?? "../images/profiles/default.svg")) {
          image.src = collaborator.image ?? "../images/profiles/default.svg";
        }
        image.style.border = "solid 3px " + collaborator.color;
      }
      if (this.button != null) {
        this.button.setAttribute("tooltip", collaborator.name);
        this.button.removeAttribute("disabled");
      }
    })();
  }

  SHOW_ON_LOCK = true;
  ADD_DIVIDE_AFTER = true;
  KEEP_BUTTON_PREVIEW = true;

  html = `
  <div class="eSubToolCollaboratorHolder">
    <div class="eSubToolCollaboratorBackdrop"><div></div></div>
    <div class="eSubToolCollaboratorContent">
      <div class="eSubToolCollaboratorCursor"></div>
      <img class="eSubToolCollaboratorPicture">
      <div class="eSubToolCollaboratorInfo">
        <div name></div>
        <div email></div>
      </div>
    </div>
    <button class="largeButton">Make Viewer</button>
  </div>
  `;
  css = {
    ".eSubToolCollaborator": `box-sizing: border-box; width: 34px; height: 34px; padding: 2px; margin: 4px; object-fit: cover; background: var(--pageColor); border-radius: 20px`,

    ".eSubToolCollaboratorHolder": `display: flex; flex-direction: column; width: fit-content; max-width: 100%; gap: 4px; align-items: center; border-radius: inherit`,
    ".eSubToolCollaboratorContent": `display: flex; flex-wrap: wrap; width: max-content; max-width: calc(100% - 16px); margin: 8px; gap: 4px; align-items: center; border-radius: inherit`,
    ".eSubToolCollaboratorBackdrop": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1; border-radius: inherit; overflow: hidden`,
    ".eSubToolCollaboratorBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(../images/editor/backdrop.svg); background-size: 24px; background-position: center`,
    ".eSubToolCollaboratorCursor": `display: none; width: 40px; height: 40px; flex-shrink: 0; margin: 2px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px`,
    ".eSubToolCollaboratorPicture": `display: none; width: 44px; height: 44px; flex-shrink: 0; margin: 2px; background: #fff; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px`,
    ".eSubToolCollaboratorInfo": `max-width: calc(100% - 8px); margin: 4px; text-align: left`,
    ".eSubToolCollaboratorInfo div[name]": `max-width: 100%; font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolCollaboratorInfo div[email]": `display: none; max-width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolCollaboratorHolder .largeButton": `width: fit-content; padding: 6px 10px; margin: 4px 12px 12px; background: var(--theme); text-wrap: nowrap; font-size: 16px; --borderRadius: 12px; color: #fff`
  };
  js = async (frame) => {
    let collaboratorID;
    let collaborator;
    let member;
    
    let holder = frame.querySelector(".eSubToolCollaboratorHolder");
    let image = holder.querySelector(".eSubToolCollaboratorPicture");
    let info = holder.querySelector(".eSubToolCollaboratorInfo");
    let name = info.querySelector("div[name]");
    let email = info.querySelector("div[email]");
    let makeViewerButton = holder.querySelector(".largeButton");

    let redraw = (noRefresh, noCheckMember) => {
      let preference = this.toolbar.getPreferenceTool();
      collaboratorID = preference.m ?? preference.a;
      collaborator = this.editor.collaborators[collaboratorID];
      if (collaborator == null) {
        return;
      }

      holder.style.setProperty("--themeColor", collaborator.color);
      if (collaborator.email == null) {
        holder.querySelector(".eSubToolCollaboratorCursor").style.display = "unset";
      } else {
        if (image.src != (collaborator.image ?? "../images/profiles/default.svg")) {
          image.src = (collaborator.image ?? "../images/profiles/default.svg");
        }
        image.style.display = "unset";
      }
      info.style.color = this.editor.utils.textColorBackground(collaborator.color);
      name.textContent = collaborator.name;
      name.title = collaborator.name;
      if (collaborator.email != null) {
        email.textContent = collaborator.email;
        email.title = collaborator.email;
        email.style.display = "block";
      }

      member = null;
      if (this.editor.parent.pageType == "board" && this.editor.self.access > 3 && noCheckMember != true) {
        let memberIDs = Object.keys(this.editor.parent.parent.members);
        for (let i = 0; i < memberIDs.length; i++) {
          let memberCheck = this.editor.parent.parent.members[memberIDs[i]] ?? {};
          if (memberCheck.modify == collaboratorID) {
            member = memberCheck;
            break;
          }
        }
      }
      if (member != null && member.access == 1) {
        makeViewerButton.style.removeProperty("display");
      } else {
        makeViewerButton.style.display = "none";
      }

      if (noRefresh != true) {
        this.toolbar.selection.updateActionBar();
      }
    }
    redraw(true);
    this.redraw = () => { redraw(); }

    makeViewerButton.addEventListener("click", async () => {
      makeViewerButton.setAttribute("disabled", "");
      let [code] = await sendRequest("PUT", "lessons/members/access?member=" + member._id, { access: 0 }, { session: this.editor.session });
      makeViewerButton.removeAttribute("disabled");
      if (code == 200) {
        redraw(null, true);
      }
    });

    this.setActionButton(this.button.querySelector("div"));
  }
}

modules["editor/toolbar/reactions"] = class {
  setActionButton = async (button) => {
    let preference = this.toolbar.getPreferenceTool();
    let selectID = preference._id;

    if (this.toolbar.reactionsCache == null || this.toolbar.reactionsCache.id != selectID) {
      this.toolbar.reactionsCache = { id: selectID, reactions: {}, members: {}, loaded: false };
    }

    this.editor.pipeline.subscribe("reactionsModule", "reaction", (event) => {
      let body = copyObject(event);
      if (body.reaction.annotation != (this.toolbar.reactionsCache ?? {}).id) {
        return;
      }
      this.toolbar.reactionsCache.reactions[body.reaction.emoji] = this.toolbar.reactionsCache.reactions[body.reaction.emoji] ?? {};
      let cache = this.toolbar.reactionsCache.reactions[body.reaction.emoji];
      let reactID;
      if (body.member != null) {
        reactID = body.reaction.annotation + "_" + body.reaction.emoji + "_" + body.member._id;
      }
      if (body.change > 0) {
        cache[reactID] = body.added;
        this.toolbar.reactionsCache.members[body.member._id] = body.member;
        if (this.button != null && this.button.hasAttribute("hidden") == true) {
          this.button.removeAttribute("disabled");
          this.toolbar.selection.updateActionBar({ refreshActionBar: true });
        }
      } else if (body.change < 0) {
        delete cache[reactID];
      } else if (body.change == null) {
        cache = {};
      }
      if (Object.keys(cache).length < 1) {
        delete this.toolbar.reactionsCache.reactions[body.reaction.emoji];
      }
      if (Object.keys(this.toolbar.reactionsCache.reactions).length < 1) {
        this.toolbar.selection.updateActionBar({ refreshActionBar: true });
      }
      if (this.toolbar.reactionsCache.function != null) {
        this.toolbar.reactionsCache.function(body);
      }
    });
    
    let reactions = this.editor.reactions[selectID] ?? [];
    if (reactions.length < 1 || this.toolbar.reactionsCache.error == true) {
      return false;
    }

    setSVG(button, "../images/editor/toolbar/reactions.svg");

    if (this.toolbar.reactionsCache.loaded == false) {
      this.toolbar.reactionsCache.loaded = true;
      this.button.setAttribute("disabled", "");

      (async () => {
        let [code, body] = await sendRequest("GET", "lessons/members/reaction/members?annotation=" + selectID, null, { session: this.editor.session });
        if (code == 200 && this.toolbar.reactionsCache.id == selectID) {
          for (let i = 0; i < body.reactions.length; i++) {
            let reaction = body.reactions[i];
            let reactID = reaction._id.split("_");
            this.toolbar.reactionsCache.reactions[reactID[1]] = this.toolbar.reactionsCache.reactions[reactID[1]] ?? {};
            this.toolbar.reactionsCache.reactions[reactID[1]][reaction._id] = reaction.added;
          }
          if (body.members != null) {
            this.toolbar.reactionsCache.members = { ...this.toolbar.reactionsCache.members, ...getObject(body.members, "_id") };
          }
        } else {
          this.toolbar.reactionsCache.error = true;
          return this.toolbar.selection.updateActionBar({ redrawActionBar: true });
        }
        if (this.button != null) {
          this.button.removeAttribute("disabled");
        }
      })();
    }
  }

  TOOLTIP = "Reactions";
  SHOW_ON_LOCK = true;
  ADD_DIVIDE_BEFORE = true;
  SUPPORTS_MULTIPLE_SELECT = false;

  html = `
  <div class="eSubToolReactionHolder">
    <div class="eSubToolReactionSidebar"></div>
    <div class="eSubToolReactionMembers">
      <div class="eSubToolReactionMemberTitle">
        <div title></div>
        <button remove title="Remove this reaction from the sticky note."><img src="../images/editor/file/delete.svg"></button>
      </div>
      <div class="eSubToolReactionMemberSection"></div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolReactionHolder": `display: flex; width: max-content; max-width: 100%; max-height: fit-content`,
    ".eSubToolReactionSidebar": `display: flex; flex-direction: column; width: 38px; min-width: 38px; max-height: 238px; padding: 6px; gap: 6px; border-right: solid 4px var(--theme); overflow: auto; scrollbar-width: none`,
    ".eSubToolReactionSidebar::-webkit-scrollbar": `display: none`,
    ".eSubToolReactionSidebar button": `display: flex; width: 38px; height: 38px; min-height: 38px; justify-content: center; align-items: center; border-radius: 8px`,
    ".eSubToolReactionSidebar button:hover": `background: var(--hover)`,
    ".eSubToolReactionSidebar button[selected]": `background: var(--theme) !important`,
    ".eSubToolReactionSidebar button img": `width: 32px; height: 32px; transform: scale(.95); object-fit: none; filter: drop-shadow(0px 0px 8px var(--pageColor));`,
    ".eSubToolReactionMembers": `max-width: 100%; max-height: 250px; overflow: auto`,
    ".eSubToolReactionMemberTitle": `position: sticky; display: flex; width: 100%; top: 0px; background: var(--theme); justify-content: space-between; align-items: center`,
    ".eSubToolReactionMemberTitle div[title]": `width: 100%; margin: 8px; font-size: 18px; font-weight: 600; color: #fff; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolReactionMemberTitle button": `display: none; width: 32px; height: 32px; margin: 6px; background: var(--pageColor); color: #fff; border-radius: 8px; justify-content: center; align-items: center`,
    ".eSubToolReactionMemberTitle button img": `width: 22px; height: 22px`,
    ".eSubToolReactionMemberSection": `display: flex; flex-direction: column; min-height: 163px; height: calc(100% - 44px)`,
    ".eSubToolReactionMember": `display: flex; padding: 4px; align-items: center`,
    ".eSubToolReactionMember div[cursor]": `width: 22px; min-width: 22px; height: 22px; margin: 3px; background: var(--pageColor); border-radius: 10px 18px 18px`,
    ".eSubToolReactionMember div[holder]": `display: flex; width: calc(100% - 26px); white-space: nowrap; overflow: hidden; justify-content: space-between`,
    ".eSubToolReactionMember div[holder] div[name]": `display: inline; margin: 0 12px 0 6px; font-size: 16px; font-weight: 600`,
    ".eSubToolReactionMember div[holder] div[email]": `display: inline; font-size: 16px; font-weight: 500`,
    ".eSubToolReactionTempShow": `display: none; flex-direction: column; width: calc(100% - 24px); padding: 12px; margin-top: auto; align-items: center`,
    ".eSubToolReactionTempShow div[titlecount]": `font-size: 20px; font-weight: 600`,
    ".eSubToolReactionTempShow div[titlecount] b": `font-weight: 700; color: var(--theme)`,
    ".eSubToolReactionTempShow div[info]": `max-width: 297px; margin-top: 6px; font-size: 14px; font-weight: 500`,
    ".eSubToolReactionTempShow div[info] a": `display: none; color: var(--theme); font-size: 16px; font-weight: 700; line-height: 30px`
  };
  js = async (frame) => {
    let cache = this.toolbar.reactionsCache;

    let emojiModule = (await this.newModule("dropdowns/editor/tools/emojis")) ?? {};
    if (emojiModule.createEmojiObject == null) {
      return;
    }
    let emojiObject = emojiModule.createEmojiObject();

    let emojiButtonSidebar = frame.querySelector(".eSubToolReactionSidebar");
    let emojiMemberSection = frame.querySelector(".eSubToolReactionMemberSection");
    let removeReactionButton = frame.querySelector(".eSubToolReactionMemberTitle button[remove]");

    removeReactionButton.addEventListener("click", async () => {
      removeReactionButton.setAttribute("disabled", "");
      await sendRequest("DELETE", "lessons/members/reaction/delete?annotation=" + cache.id + "&emoji=" + emojiButtonSidebar.querySelector("button[selected]").getAttribute("emoji").replace(/ /g, "_"), null, { session: this.editor.session });
      removeReactionButton.removeAttribute("disabled");
    });

    let insertReactionButton = (emojiName) => {
      if (emojiButtonSidebar.querySelector('.eSubToolReaction[emoji="' + emojiName + '"]') != null) {
        return;
      }
      let emoji = emojiObject[emojiName];
      emojiButtonSidebar.insertAdjacentHTML("afterbegin", `<button emoji="${emojiName}" title="${emoji.short_name.replace(/_/g, " ")}"><img src="../images/editor/emojis/twitter32.png" style="object-position: ${-((emoji.sheet_x * emojiModule.sheetSize) + 1)}px ${-((emoji.sheet_y * emojiModule.sheetSize) + 1)}px"></button>`);
    }
    let reactionKeys = Object.keys(cache.reactions);
    for (let i = 0; i < reactionKeys.length; i++) {
      insertReactionButton(reactionKeys[i]);
    }
    emojiButtonSidebar.firstElementChild.setAttribute("selected", "");

    let unknownCount = 0;
    let largestOrder = 0;
    let insertReactionMember = (userid, added) => {
      let member = cache.members[userid];
      let tempSection = emojiMemberSection.querySelector(".eSubToolReactionTempShow");
      if (member == null) {
        unknownCount++;
        tempSection.style.display = "flex";
        let addS = "";
        if (unknownCount > 1) {
          addS = "s";
        }
        tempSection.querySelector("div[titlecount]").innerHTML = `<b>+${unknownCount}</b> Additional Reaction${addS}`;
        return;
      }
      emojiMemberSection.insertAdjacentHTML("afterbegin", `<div class="eSubToolReactionMember" new>
        <div cursor></div>
        <div holder>
          <div name></div>
          <div email></div>
        </div>
      </div>`);
      let newMemberTile = emojiMemberSection.querySelector(".eSubToolReactionMember[new]");
      newMemberTile.removeAttribute("new");
      newMemberTile.setAttribute("collaborator", userid);
      newMemberTile.querySelector("div[cursor]").style.border = "solid 3px " + member.color;
      let name = newMemberTile.querySelector("div[name]");
      name.textContent = member.name;
      name.title = member.name;
      if (member.email != null) {
        let email = newMemberTile.querySelector("div[email]");
        email.textContent = member.email;
        email.title = member.email;
      }
      let order = Math.round(((added ?? getEpoch()) / 2000000000000) * 2147483647);
      if (order > largestOrder) {
        largestOrder = order + 1;
        tempSection.style.order = order;
      }
      newMemberTile.style.order = order;
    }
    let updateReactionView = (noRefresh) => {
      let selected = emojiButtonSidebar.querySelector("button[selected]");
      if (selected == null) {
        return;
      }
      let emoji = selected.getAttribute("emoji");
      let title = emojiModule.emojiObject[emoji].short_name.split("_");
      for (let i = 0; i < title.length; i++) {
        title[i] = title[i].substring(0, 1).toUpperCase() + title[i].substring(1);
      }
      frame.querySelector(".eSubToolReactionMemberTitle div[title]").textContent = title.join(" ");
      unknownCount = 0;
      largestOrder = 0;
      emojiMemberSection.innerHTML = `<div class="eSubToolReactionTempShow">
        <div titlecount></div>
        <div info>Over time, Markify clears out past reaction records.</div>
      </div>`;
      if (this.editor.self.access > 3 && this.editor.utils.isLocked(this.toolbar.getPreferenceTool()) != true) {
        removeReactionButton.style.display = "flex";
      }
      let reactionMembers = cache.reactions[emoji];
      let reactionMembersKeys = Object.keys(reactionMembers);
      for (let i = 0; i < reactionMembersKeys.length; i++) {
        insertReactionMember(reactionMembersKeys[i].split("_")[2], reactionMembers[reactionMembersKeys[i]]);
      }
      
      if (noRefresh != true) {
        this.toolbar.selection.updateActionBar();
      }
    }
    this.redraw = updateReactionView;

    emojiButtonSidebar.addEventListener("click", (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest("button");
      if (button == null) {
        return;
      }
      let selected = emojiButtonSidebar.querySelector("button[selected]");
      if (selected != null) {
        selected.removeAttribute("selected");
      }
      button.setAttribute("selected", "");
      updateReactionView();
    });

    cache.function = (body) => {
      if (frame == null) {
        return;
      }
      if (body.change > 0) {
        let emojiButton = emojiButtonSidebar.querySelector('button[emoji="' + body.reaction.emoji + '"]');
        if (emojiButton == null) {
          insertReactionButton(body.reaction.emoji);
        } else if (emojiButton.hasAttribute("selected") == true) {
          insertReactionMember(body.member._id, body.added);
        }
      } else if (body.change < 0) {
        let emojiButton = emojiButtonSidebar.querySelector('button[emoji="' + body.reaction.emoji + '"]');
        if (emojiButton.hasAttribute("selected") == true) {
          if (body.member._id != null) {
            let emojiMember = emojiMemberSection.querySelector('.eSubToolReactionMember[collaborator="' + body.member._id + '"]');
            if (emojiMember != null) {
              emojiMember.remove();
            }
          } else {
            unknownCount--;
            let titleCount = emojiMemberSection.querySelector(".eSubToolReactionTempShow");
            if (unknownCount > 0) {
              let addS = "";
              if (unknownCount > 1) {
                addS = "s";
              }
              titleCount.querySelector("div[titlecount]").innerHTML = `<b>+${unknownCount}</b> Additional Reaction${addS}`;
              titleCount.style.display = "flex";
            } else {
              titleCount.style.display = "none";
            }
          }
        }
      }
      if (cache.reactions[body.reaction.emoji] == null) {
        let emojiButton = emojiButtonSidebar.querySelector('button[emoji="' + body.reaction.emoji + '"]');
        emojiButton.remove();
        if (emojiButton.hasAttribute("selected") == true && emojiButtonSidebar.firstElementChild != null) {
          emojiButtonSidebar.firstElementChild.setAttribute("selected", "");
          updateReactionView();
        }
      }
      if (Object.keys(this.toolbar.reactionsCache.reactions).length > 0) {
        this.toolbar.selection.updateActionBar();
      } else {
        this.toolbar.selection.closeActionFrame();
      }
    }

    updateReactionView(true);
  }
}


// Page Modules:
modules["editor/toolbar/uploadpage"] = class {
  setActionButton = async (button) => {
    let selectKeys = Object.keys(this.editor.selecting);
    if (selectKeys.length == 1 && this.parent.getPreferenceTool().source == null) {
      this.TOOLTIP = "Upload PDF";
      setSVG(button, "../images/editor/toolbar/uploadpage.svg");
    } else {
      let anyHasDocument = false;
      for (let i = 0; i < selectKeys.length; i++) {
        let annotation = this.editor.annotations[selectKeys[i]].render ?? {};
        if (annotation.source != null) {
          anyHasDocument = true;
          break;
        }
      }
      if (anyHasDocument == false) {
        return false;
      }
      this.TOOLTIP = "Remove PDF";
      this.FULL_CLICK = true;
      setSVG(button, "../images/editor/toolbar/removepage.svg");
    }
  }

  FULL_CLICK = true;

  maxFileSize = (500 * 10 * 1024 * 1024) + 1; // 5 GB File Limit // Will be 10 MB per page
  js = async () => {
    let preference = this.parent.getPreferenceTool();

    if (Object.keys(this.editor.selecting).length > 1 || preference.source != null) { // Remove Page:
      return await this.toolbar.saveSelecting((render) => {
        if (render.source != null) {
          return { source: null };
        }
      });
    }

    if (preference._id.startsWith("pending_") == true) {
      await this.editor.save.syncSave(true);
    }

    let input = this.toolbar.selection.actionBar.querySelector(".eSubToolUploadPageInput");
    if (input != null) {
      input.remove();
    }
    this.toolbar.selection.actionBar.insertAdjacentHTML("beforeend", `<input class="eSubToolUploadPageInput" type="file" accept="application/pdf" multiple="true" hidden="true">`);
    input = this.toolbar.selection.actionBar.querySelector(".eSubToolUploadPageInput");

    let processUpload = async (files, event) => {
      event.preventDefault();
      if (files == null) {
        return;
      }
      preference = this.parent.getPreferenceTool();
      if (preference._id.startsWith("pending_") == true) {
        return;
      }
      if (files.length > 50) {
        return alertModule.open("warning", "<b>File Overload</b>Woah there! Markify only supports bulk uploads of up to 50 files at once.", { time: 10 });
      }
      let sendFormData = new FormData();
      let fileSize = 0;
      let passedFiles = 0;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.kind == "file") {
          file = file.getAsFile();
        }
        if (file.kind != "string") {
          if (file.type == "application/pdf") {
            fileSize += file.size;
            if (fileSize > this.maxFileSize) {
              return alertModule.open("error", "<b>Exceeded Size Limit</b><div>Lessons are limited to a max size of <u>3 GB</u> total</div>", { time: 10 });
            }
            sendFormData.append("file" + i, file);
            passedFiles++;
          } else {
            alertModule.open("warning", "<b>" + file.name + " Failed to Upload</b>Only PDF files are currently supported", { time: 10 });
          }
        }
      }
      input.value = "";
      if (passedFiles > 0) {
        this.button.setAttribute("disabled", "");
        let uploadAlert = await alertModule.open("info", `<b>Uploading Document${addS(passedFiles)}</b>Uploading your PDF${addS(passedFiles)} and inserting into the lesson!`, { time: "never" });
        let [code, body] = await sendRequest("POST", "lessons/save/file?annotation=" + preference._id, sendFormData, { session: this.editor.session, noFileType: true });
        alertModule.close(uploadAlert);
        this.button.removeAttribute("disabled");
        if (code == 200) {
          let historyUpdate = body.historyUpdate ?? [];
          let historyAdd = body.historyAdd ?? [];
          let historyRemove = body.historyRemove ?? [];
          if (body.saves != null) {
            for (let i = 0; i < body.saves.length; i++) {
              let save = body.saves[i];
              await this.editor.save.push(save, { history: { update: historyUpdate, add: historyRemove }, ignoreSelect: true });
              this.editor.selecting[save._id] = this.editor.selecting[save._id] ?? {};
            }
            this.toolbar.selection.updateActionBar();
          }
          if (historyUpdate.length > 0) {
            this.editor.history.push("update", historyUpdate);
          }
          if (historyAdd.length > 0) {
            this.editor.history.push("remove", historyAdd);
          }
          if (historyAdd.length > 0) {
            this.editor.history.push("add", historyRemove);
          }
        }
      }
    }
    input.addEventListener("change", (event) => {
      processUpload(event.target.files, event);
    });
    input.value = "";
    input.click();
  }
}
modules["editor/toolbar/resize"] = class {
  setActionButton = async (button) => {
    setSVG(button, "../images/editor/toolbar/resizepage.svg");
  }

  TOOLTIP = "Resize";

  html = `
  <div class="eSubToolResizeHolder">
    <div class="eSubToolResizeSizeHolder">
      <button class="border" width="816" height="1056"><div class="eSubToolResizeSizeTitle">Letter</div><div class="eSubToolResizeSizeInfo">8.5" x 11"</div></button>
      <button class="border" width="1056" height="1632"><div class="eSubToolResizeSizeTitle">Tabloid</div><div class="eSubToolResizeSizeInfo">11" x 17"</div></button>
      <button class="border" width="559.68" height="793.92"><div class="eSubToolResizeSizeTitle">A5</div><div class="eSubToolResizeSizeInfo">5.8" x 8.3"</div></button>
      <button class="border" width="793.92" height="1122.24"><div class="eSubToolResizeSizeTitle">A4</div><div class="eSubToolResizeSizeInfo">8.3" x 11.7"</div></button>
      <button class="border" width="1122.24" height="1587.84"><div class="eSubToolResizeSizeTitle">A3</div><div class="eSubToolResizeSizeInfo">11.7" x 16.5"</div></button>
      <button class="border" width="665.28" height="944.64"><div class="eSubToolResizeSizeTitle">B5</div><div class="eSubToolResizeSizeInfo">6.9" x 9.8"</div></button>
      <button class="border" width="944.64" height="1334.4"><div class="eSubToolResizeSizeTitle">B4</div><div class="eSubToolResizeSizeInfo">9.8" x 13.9"</div></button>
      <button class="border" width="960" height="720"><div class="eSubToolResizeSizeTitle">4:3</div><div class="eSubToolResizeSizeInfo">10" x 7.5"</div></button>
      <button class="border" width="960" height="540.48"><div class="eSubToolResizeSizeTitle">16:9</div><div class="eSubToolResizeSizeInfo">10" x 17.8"</div></button>
    </div>
    <div class="eSubToolResizeCustomSizeHolder">
      <div class="eSubToolResizeNumberHolder" width><b>Width</b><div max="50" contenteditable></div>in</div>
      <div class="eSubToolResizeNumberHolder" height><b>Height</b><div max="50" contenteditable></div>in</div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolResizeHolder": `box-sizing: border-box; max-width: 100%; padding: 6px`,
    ".eSubToolResizeSizeHolder": `display: flex; flex-wrap: wrap; width: 336px; max-width: 100%; justify-content: center`,
    ".eSubToolResizeSizeHolder button": `box-sizing: border-box; display: flex; flex-direction: column; width: 100px; padding: 6px; margin: 6px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 12px`,
    ".eSubToolResizeSizeHolder button .eSubToolResizeSizeTitle": `color: var(--theme); font-size: 18px; font-weight: 600`,
    ".eSubToolResizeSizeHolder button .eSubToolResizeSizeInfo": `color: var(--darkGray); font-size: 15px; font-weight: 500`,
    ".eSubToolResizeSizeHolder button:hover": `--borderColor: var(--hover)`,
    ".eSubToolResizeHolder button[selected]": `--borderColor: var(--theme); background: var(--hover)`,
    ".eSubToolResizeCustomSizeHolder": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 8px; justify-content: center; align-items: center`,
    ".eSubToolResizeNumberHolder": `display: flex; flex-wrap: wrap; margin: 0px 10px; justify-content: center; align-items: center`,
    ".eSubToolResizeNumberHolder div[contenteditable]": `width: fit-content; max-width: 60px; padding: 4px 6px; margin: 6px 4px 6px 8px; --borderColor: var(--secondary); outline: unset; border: solid 3px var(--borderColor); border-radius: 20px; color: var(--theme); font-size: 16px; font-weight: 600; white-space: nowrap; overflow: hidden; transition: .2s`
  };
  pageBorderSize = 4;
  ppi = 96; // Pixels per inch
  js = async (frame) => {
    let sizeHolder = frame.querySelector(".eSubToolResizeSizeHolder");
    let sizeOptions = sizeHolder.children;
    let customSizeHolder = frame.querySelector(".eSubToolResizeCustomSizeHolder");
    let customSizeWidth = customSizeHolder.querySelector(".eSubToolResizeNumberHolder[width] div[contenteditable]");
    let customSizeHeight = customSizeHolder.querySelector(".eSubToolResizeNumberHolder[height] div[contenteditable]");

    this.redraw = (noRefresh, noTextBox) => {
      let preference = this.parent.getPreferenceTool();
      for (let i = 0; i < sizeOptions.length; i++) {
        let option = sizeOptions[i];
        if ((Math.floor(preference.s[0]) == Math.floor(parseFloat(option.getAttribute("width")) + (this.pageBorderSize * 2))) && (Math.floor(preference.s[1]) == Math.floor(parseFloat(option.getAttribute("height")) + (this.pageBorderSize * 2)))) {
          option.setAttribute("selected", "");
        } else {
          option.removeAttribute("selected");
        }
      }
      if (noTextBox != true) {
        customSizeWidth.textContent = Math.round(((preference.s[0] - (this.pageBorderSize * 2)) / this.ppi) * 100) / 100;
        customSizeHeight.textContent = Math.round(((preference.s[1] - (this.pageBorderSize * 2)) / this.ppi) * 100) / 100;
      }
      if (noRefresh != true) {
        this.toolbar.selection.updateActionBar();
      }
    }

    sizeHolder.addEventListener("click", async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      element = element.closest("button");
      if (element == null) {
        return;
      }
      let width = parseFloat(element.getAttribute("width")) + (this.pageBorderSize * 2);
      let height = parseFloat(element.getAttribute("height")) + (this.pageBorderSize * 2);
      await this.toolbar.saveSelecting(() => { return { s: [width, height] }; }, { reuseActionBar: true });
      this.redraw(true);
    });

    customSizeHolder.addEventListener("mousedown", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
    });
    customSizeHolder.addEventListener("keydown", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      if (event.key == "Enter") {
        event.preventDefault();
        return textBox.blur();
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseFloat(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key && (event.keyCode != 190 || textBox.hasAttribute("nodecimal"))) {
          event.preventDefault();
          return textBoxError(textBox, "Must be a number");
        } else if (textInt > parseFloat(textBox.getAttribute("max"))) {
          event.preventDefault();
          return textBoxError(textBox, "Must be less than " + textBox.getAttribute("max"));
        } else if (textInt < 1) {
          event.preventDefault();
          return textBoxError(textBox, "Must be greater than 1");
        }
      }
      this.redraw(null, true);
    });
    customSizeHolder.addEventListener("focusout", (event) => {
      let textBox = event.target.closest(".eSubToolResizeNumberHolder div");
      if (textBox == null) {
        return;
      }
      let textInt = parseFloat(textBox.textContent) ?? 0;
      if (textInt > parseFloat(textBox.getAttribute("max"))) {
        textBox.textContent = textBox.getAttribute("max");
      } else if (textInt < 1) {
        textBox.textContent = 1;
      }
    });
    let saveCustomSize = async () => {
      let widthSet = parseFloat(customSizeWidth.textContent);
      let heightSet = parseFloat(customSizeHeight.textContent);
      if (widthSet > 0 && heightSet > 0) {
        await this.toolbar.saveSelecting(() => { return { s: [
          Math.round(((widthSet * this.ppi) + (this.pageBorderSize * 2)) * 100) / 100,
          Math.round(((heightSet * this.ppi) + (this.pageBorderSize * 2)) * 100) / 100
        ] }; }, { reuseActionBar: true });
      }
      this.redraw();
    }
    customSizeWidth.addEventListener("focusout", saveCustomSize);
    customSizeHeight.addEventListener("focusout", saveCustomSize);
    
    this.redraw(true);
  }
}
modules["editor/toolbar/settitle"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/settitle.svg");
    }

    let preference = this.parent.getPreferenceTool();
    let annoTx = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"] div[label][contenteditable]');
    if (annoTx == null) {
      this.button.removeAttribute("selecthighlight");
    } else {
      if (this.editor.utils.isLocked(preference) == true) {
        annoTx.removeAttribute("contenteditable");
      }
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Set Title";
  SUPPORTS_MULTIPLE_SELECT = false;
  FULL_CLICK = true;

  js = async (frame, event) => {
    if (this.button == null || this.button.hasAttribute("hidden") == true) {
      return;
    }

    let preference = this.parent.getPreferenceTool();
    if (this.editor.utils.isLocked(preference) == true) {
      return;
    }

    let annoElem = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[label]");
    if (annoTx == null) {
      return;
    }

    if (annoTx.hasAttribute("contenteditable") == false) {
      annoTx.style.display = "unset";
      annoTx.setAttribute("contenteditable", "true");

      this.editor.text.startTextSelection(annoTx, event);
    } else {
      if (annoTx.textContent.length < 1) {
        annoTx.style.removeProperty("display");
      }
      annoTx.scrollTo(0, 0);
      annoTx.removeAttribute("contenteditable");
    }

    this.toolbar.clearEventListeners();

    let finishListener = async () => {
      annoTx.scrollTo(0, 0);
      annoTx.removeAttribute("contenteditable");
      if (annoTx.textContent.length < 1) {
        annoTx.style.removeProperty("display");
      }
      this.editor.text.clearSelection();
      annoTx.textContent = annoTx.textContent.substring(0, 100);
      await this.toolbar.saveSelecting(() => { return { title: cleanString(annoTx.textContent) }; }, { refreshActionBar: false });
      this.setActionButton();
    };
    this.finish = finishListener;
    this.toolbar.addEventListener("blur", annoTx, finishListener);

    let keyListener = (event) => {
      if (event != null && ["Enter"].includes(event.key) == true) {
        event.preventDefault();
        finishListener();
      }
    }
    this.toolbar.addEventListener("keydown", annoTx, keyListener);

    this.toolbar.addEventListener("paste", annoTx, clipBoardRead);

    this.setActionButton();
  }
}
modules["editor/toolbar/rotatepage"] = class {
  setActionButton = async (button) => {
    /*let anyHasDocument = false;
    let selectKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let annotation = this.editor.annotations[selectKeys[i]].render ?? {};
      if (annotation.source != null) {
        anyHasDocument = true;
        break;
      }
    }
    if (anyHasDocument == false) {
      return false;
    }*/
    
    setSVG(button, "../images/editor/toolbar/rotatepage.svg");
  }

  TOOLTIP = "Rotate";
  ADD_DIVIDE_AFTER = true;

  js = async () => {
    await this.toolbar.saveSelecting((render) => {
      let setRotate = render.r ?? 0;
      setRotate -= 90;
      if (setRotate < 0) {
        setRotate = 360 + setRotate;
      }
      if (setRotate >= 360) {
        setRotate = setRotate - 360;
      }
      return { r: setRotate };
    }, { reuseActionBar: true });
  }
}
modules["editor/toolbar/pagetype"] = class {
  setActionButton = async (button) => {
    setSVG(button, "../images/editor/toolbar/pagetype.svg");
  }

  TOOLTIP = "Type";

  html = `
    <div class="eSubToolPageTypeHolder">
      <button class="border eTypeBlank" type="blank"><div class="eSubToolTypeTitle">Blank</div></button>
      <button class="border eTypeLined" type="line"><div class="eSubToolTypeTitle">Lined</div></button>
      <button class="border eTypeGrid" type="grid"><div class="eSubToolTypeTitle">Grid</div></button>
    </div>
  `;
  css = {
    ".eSubToolPageTypeHolder": `box-sizing: border-box; max-width: 100%; padding: 6px; display: flex; flex-wrap: nowrap; width: 336px; max-width: 100%; justify-content: center`,
    ".eSubToolPageTypeHolder button": `box-sizing: border-box; display: flex; flex-direction: row; width: 100px; height: 96px; padding: 6px; margin: 6px; justify-content: center; align-items: center; --borderWidth: 4px; --borderRadius: 12px; background-size: cover; background-position: center`,
    ".eSubToolPageTypeHolder button .eSubToolTypeTitle": `color: var(--theme); font-size: 18px; font-weight: 600; border-radius: 6px; padding: 2px 6px; margin-bottom: 2px`,
    ".eSubToolPageTypeHolder button:hover": `--borderColor: var(--hover)`,
    ".eSubToolPageTypeHolder button[selected]": `--borderColor: var(--theme); background: var(--hover)`,
    ".eTypeBlank": `background: #fff;`,
    ".eTypeLined": `background: repeating-linear-gradient(to bottom, #fff, #fff 10px, #e0e0e0 11px, #fff 12px)`,
    ".eTypeGrid": `background: 
      repeating-linear-gradient(to bottom, transparent, transparent 10px, #e0e0e0 11px, transparent 12px),
      repeating-linear-gradient(to right, #fff, #fff 10px, #e0e0e0 11px, #fff 12px)`,
  }
  js = async (frame) => {
    let toolbar = this.toolbar;
    let buttonHolder = frame.querySelector(".eSubToolPageTypeHolder");
    let buttons = buttonHolder.querySelectorAll("button[type]");

    this.redraw = () => {
      // Put the code that updates which button is selected here:
      let preference = this.parent.getPreferenceTool();
      let currentType = preference.background ?? "blank";
      if (preference.source != null && preference.number != null) {
        currentType = "blank";
      }
      buttons.forEach(btn => {
        btn.removeAttribute("selected");
        if (btn.getAttribute("type") === currentType) btn.setAttribute("selected", "");
      });
    }
    this.redraw();

    // Put the code that handles clicking a button and saving the change here:

    buttonHolder.addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let btn = target.closest("button");
      if (btn == null) {
        return;
      }
      let selectedType = btn.getAttribute("type");
      this.toolbar.setToolPreference("background", selectedType);
      await toolbar.saveSelecting((render) => {
        let updates = { background: selectedType };
        if (render.source) {
          updates.source = null;
          updates.number = null;
        }
        return updates;
      }, { reuseActionBar: true });
      this.redraw();
    });
  }
}
modules["editor/toolbar/hidepage"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/hidepage.svg");
    }
    if (this.parent.getPreferenceTool().hidden != true) {
      this.button.removeAttribute("selecthighlight");
      this.TOOLTIP = "Hide Page";
    } else {
      this.button.setAttribute("selecthighlight", "");
      this.TOOLTIP = "Reveal Page";
    }
    this.button.setAttribute("tooltip", this.TOOLTIP);
  }

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { hidden: !(this.button.hasAttribute("selecthighlight")) }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}

// Media Modules:
modules["editor/toolbar/imageborder"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/imageborder.svg");
    }
    if (this.parent.getPreferenceTool().border != false) {
      this.button.setAttribute("selecthighlight", "");
    } else {
      this.button.removeAttribute("selecthighlight");
    }
  }

  TOOLTIP = "Image Border";

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { border: !(this.button.hasAttribute("selecthighlight")) }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}

// Embed Modules:
modules["editor/toolbar/setembed"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/setembed.svg");
    }

    let preference = this.parent.getPreferenceTool();
    let inputText = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"] input');
    if (document.activeElement != inputText) {
      this.button.removeAttribute("selecthighlight");
    } else {
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Set Link";
  SUPPORTS_MULTIPLE_SELECT = false;
  FULL_CLICK = true;

  js = async () => {
    if (this.button == null || this.button.hasAttribute("hidden") == true) {
      return;
    }

    let preference;
    this.redraw = () => {
      preference = this.parent.getPreferenceTool();
    }
    this.redraw();
    if (this.editor.utils.isLocked(preference) == true) {
      return;
    }

    let annoElem = this.editor.page.querySelector('.eAnnotation[anno="' + preference._id + '"]');
    if (annoElem == null) {
      return;
    }
    let detailsHolder = annoElem.querySelector("div[details]");
    if (detailsHolder == null) {
      return;
    }

    let linkInputHolder = detailsHolder.querySelector("div[input]");
    let infoHolder = detailsHolder.querySelector("div[info]");

    if (linkInputHolder.hasAttribute("visible") == true && preference.embed != null && preference.d != null) {
      linkInputHolder.removeAttribute("visible");
      infoHolder.style.removeProperty("display");
      return;
    }

    linkInputHolder.removeAttribute("disabled");

    let annoTx = linkInputHolder.querySelector("input");
    if (annoTx.parentElement.hasAttribute("disabled") == true) {
      return;
    }

    if (document.activeElement != annoTx) {
      linkInputHolder.setAttribute("visible", "");
      infoHolder.style.display = "none";
      await sleep(1);
      annoTx.select();
    }

    let updateEmbedSize = () => {
      let embedFrame = annoElem.querySelector("iframe");
      if (embedFrame != null) {
        let frameWidth = preference.s[0] - 16;
        let defaultMaxWidth = 800;
        if (frameWidth < 300) {
          defaultMaxWidth = 300;
        }
        let embedWidth = Math.max(frameWidth, defaultMaxWidth);
        let scale = frameWidth / embedWidth;
        embedFrame.style.width = embedWidth + "px";
        embedFrame.style.height = ((preference.s[1] - 24 - detailsHolder.offsetHeight) * (1 / scale)) + "px";
        embedFrame.style.transform = "scale(" + scale + ")";
      }
    }

    this.toolbar.clearEventListeners();

    let lastText = annoTx.value;
    let finishListener = async () => {
      if (lastText == annoTx.value) {
        return;
      }
      lastText = annoTx.value;
      annoTx.blur();
      if (annoTx.value.startsWith("http://") == false && annoTx.value.startsWith("https://") == false) {
        annoTx.value = "https://" + annoTx.value;
      }
      if (isValidURL(annoTx.value) == false) {
        annoTx.select();
        alertModule.open("error", "<b>Invalid Link</b>That link is invalid, check it and try again.");
      }
      await this.toolbar.saveSelecting(() => { return { d: annoTx.value, embed: null }; }, { reuseActionBar: false, redrawActionBar: true });
      if (connected == true) {
        linkInputHolder.setAttribute("disabled", "");
        this.editor.save.syncSave(true);
      }
    }
    this.finish = finishListener;
    this.toolbar.addEventListener("change", annoTx, finishListener);

    let unselectListener = async () => {
      if (preference.embed != null) {
        annoTx.blur();
        linkInputHolder.removeAttribute("visible");
        infoHolder.style.removeProperty("display");
        await sleep(1);
      }
      this.setActionButton();
      updateEmbedSize();
    }
    this.toolbar.addEventListener("blur", annoTx, unselectListener);
    
    let selectListener = () => {
      this.setActionButton();
    }
    this.toolbar.addEventListener("focus", annoTx, selectListener);

    this.setActionButton();
  }
}
modules["editor/toolbar/openlink"] = class {
  setActionButton = async (button) => {
    setSVG(button, "../images/editor/toolbar/openlink.svg");
    if (this.parent.getPreferenceTool().d == null) {
      return false;
    }
  }

  TOOLTIP = "Open Link";
  SUPPORTS_MULTIPLE_SELECT = false;
  SHOW_ON_LOCK = true;
  FULL_CLICK = true;

  js = async () => {
    let preference = this.parent.getPreferenceTool();
    if (preference.d != null) {
      window.open(preference.d, "_blank");
    }
  }
}
modules["editor/toolbar/enlarge"] = class {
  setActionButton = async (button) => {
    setSVG(button, "../images/editor/toolbar/enlarge.svg");
    if ((this.parent.getPreferenceTool().embed ?? {}).url == null) {
      return false;
    }
  }

  TOOLTIP = "Enlarge";
  SUPPORTS_MULTIPLE_SELECT = false;
  SHOW_ON_LOCK = true;
  FULL_CLICK = true;

  js = async () => {
    let preference = this.parent.getPreferenceTool();
    modalModule.open("modals/editor/embed", null, this.button, (preference.embed ?? {}).title ?? (new URL(preference.d ?? "")).hostname, false, { preference: preference });
  }
}
modules["modals/editor/embed"] = class {
  html = `<div class="emFrame"><iframe allowfullscreen allow="microphone; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe></div>`;
  css = {
    ".emFrame": `width: calc(100vw - 37px); height: calc(100vh - 77px); max-width: 1000px; max-height: 700px`,
    ".emFrame iframe": `position: absolute; left: 0px; top: 0px; width: 100% !important; height: 100% !important; transform: unset !important; background: var(--pageColor); border: none`
  };
  js = async function (frame, extra) {
    frame.closest(".modalContent").style.padding = "4px 0px 0px";
    if (extra.preference.embed != null && extra.preference.embed.url != null) {
      frame.querySelector(".emFrame iframe").src = extra.preference.embed.url;
    }
    frame.closest(".fixedItemHolder").addEventListener("click", () => {
      modalModule.close();
    });
  }
}

// Text Modules:
modules["editor/toolbar/textedit"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/textedit.svg");
    }

    let preference = this.parent.getPreferenceTool();
    let annoTx = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"] div[contenteditable]');
    if (annoTx == null) {
      this.button.removeAttribute("selecthighlight");
    } else {
      if (this.editor.utils.isLocked(preference) == true) {
        annoTx.removeAttribute("contenteditable");
      }
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Edit Text";
  SUPPORTS_MULTIPLE_SELECT = false;
  FULL_CLICK = true;
  ADD_DIVIDE_AFTER = true;

  js = async (frame, event) => {
    if (this.button == null || this.button.hasAttribute("hidden") == true) {
      return;
    }

    let preference = this.parent.getPreferenceTool();
    if (this.editor.utils.isLocked(preference) == true) {
      return;
    }

    let annoElem = this.editor.contentHolder.querySelector('.eAnnotation[anno="' + preference._id + '"]');
    if (annoElem == null) {
      return;
    }
    let annoTx = annoElem.querySelector("div[edit]");
    if (annoTx == null) {
      return;
    }

    if (annoTx.hasAttribute("contenteditable") == false) {
      let scrollLeft = annoElem.scrollLeft ?? 0;
      let scrollTop = annoElem.scrollTop ?? 0;
      annoTx.setAttribute("contenteditable", "true");
      annoTx.focus();
      if (scrollLeft > 0 || scrollTop > 0) {
        annoElem.scrollTo(scrollLeft, scrollTop);
      }

      if (event.clearText == true) {
        //annoTx.style.minWidth = (annoTx.parentElement.offsetWidth - 14) + "px";
        annoTx.textContent = "";
      }

      this.editor.text.startTextSelection(annoTx, event);
    } else {
      annoTx.removeAttribute("contenteditable");
    }

    this.toolbar.clearEventListeners();

    let saveHistory = true;
    let lastCaret = {};
    let setLastCaret = (position) => {
      if (window.getSelection != null) {
        let textBox = window.getSelection().baseNode.parentElement.closest("div[edit]");
        if (textBox != null) {
          lastCaret[position + "Element"] = textBox;
          lastCaret[position + "Position"] = this.editor.text.getCurrentCaretPosition(textBox);
        }
      }
    }

    let inputListener = async (event) => {
      preference = this.parent.getPreferenceTool();

      let saveObj = { d: {} };
      let addText = [];
      for (let i = 0; i < annoTx.childNodes.length; i++) {
        let text = annoTx.childNodes[i].textContent;
        if (text == "") {
          text = "\n";
        }
        addText.push(text);
      }
      if (this.editor.selecting[preference._id].d == null) {
        this.editor.selecting[preference._id].d = copyObject(preference.d ?? {});
      }
      saveObj.d.b = addText;
      if (preference.f == "sticky") {
        saveObj.sig = this.editor.self.name;
      }
      if (event != null && [" ", null].includes(event.data) == true) {
        saveHistory = true;
      }
      await this.toolbar.saveSelecting(() => { return saveObj; }, { refreshActionBar: false, saveHistory: saveHistory });
      if (saveHistory == true) {
        let lastHistory = this.editor.history.history[this.editor.history.location];
        if (lastHistory != null) {
          lastHistory.caret = lastHistory.caret ?? {};
          lastHistory.caret.undoElement = lastCaret.undoElement;
          lastHistory.caret.undoPosition = lastCaret.undoPosition;
        }
      }
      saveHistory = false;
    }
    this.toolbar.addEventListener("input", annoTx, inputListener);

    let keydownListener = (event) => {
      if (event != null && [" ", "Enter", "Backspace"].includes(event.key) == true) {
        setLastCaret("undo");
      }
    }
    this.toolbar.addEventListener("keydown", annoTx, keydownListener);

    let keyupListener = async () => {
      let lastHistory = this.editor.history.history[this.editor.history.location];
      if (lastHistory != null) {
        lastHistory.caret = lastHistory.caret ?? {};
        setLastCaret("redo");
        lastHistory.caret.redoElement = lastCaret.redoElement;
        lastHistory.caret.redoPosition = lastCaret.redoPosition;
      }
    }
    this.toolbar.addEventListener("keyup", annoTx, keyupListener);

    this.toolbar.addEventListener("paste", annoTx, clipBoardRead);

    this.setActionButton();
  }
}
modules["editor/toolbar/fontsize"] = class {
  setActionButton = async (button) => {
    button.innerHTML = `<div class="eSubToolFontSizeHolder"><div class="eSubToolFontSize"></div></div>`;
    let buttonTx = button.querySelector(".eSubToolFontSize");
    let preference = this.parent.getPreferenceTool();
    let size = (preference.d ?? {}).s;
    if (size == null) {
      size = this.parent.getAnnotationPreference().size;
    }
    buttonTx.textContent = size ?? 0;
  }

  TOOLTIP = "Font Size";

  html = `
  <div class="eSubToolFontSizeContainer">
    <button class="eFontSizeOption" small>Small</button>
    <button class="eFontSizeOption" medium>Medium</button>
    <button class="eFontSizeOption" large>Large</button>
    <div class="eFontSizeLine"></div>
    <div class="eFontSizeInput border"><div class="eFontSizeBox" contenteditable></div></div>
  </div>
  `;
  css = {
    ".eSubToolFontSizeHolder": `display: flex; width: 42px; height: 42px; justify-content: center; align-items: center; overflow: hidden`,
    ".eSubToolFontSize": `padding: 0 4px; background: var(--pageColor); border-radius: 6px; color: var(--darkGray); font-size: 24px; font-weight: 700; text-wrap: nowrap`,

    ".eSubToolFontSizeContainer": `display: flex; flex-direction: column; padding: 6px; align-items: center`,
    ".eFontSizeOption": `display: flex; width: 120px; height: 36px; margin-bottom: 4px; border-radius: 10px; justify-content: center; align-items: center; font-weight: 600; transition: .15s`,
    ".eFontSizeOption:hover": `background: var(--secondary); color: #fff`,
    ".eFontSizeOption[selected]": `background: var(--theme) !important; color: #fff`,
    ".eFontSizeOption[small]": `font-size: 14px`,
    ".eFontSizeOption[medium]": `font-size: 18px`,
    ".eFontSizeOption[large]": `font-size: 22px`,
    ".eFontSizeLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".eFontSizeInput": `display: flex; padding: 3px; margin: 8px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eFontSizeInput div": `max-width: 50px; min-width: 25px; padding: 0 8px; border: none; outline: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`
  };
  js = async (frame) => {
    let smallButton = frame.querySelector(".eFontSizeOption[small]"); // 12px
    let mediumButton = frame.querySelector(".eFontSizeOption[medium]"); // 18px
    let largeButton = frame.querySelector(".eFontSizeOption[large]"); // 26px
    let inputSize = frame.querySelector(".eFontSizeBox"); // Custom

    let selectedS;
    this.redraw = () => {
      let size = (this.parent.getPreferenceTool().d ?? {}).s;
      if (size == null) {
        size = this.parent.getAnnotationPreference().size;
      }
      selectedS = size ?? 18;

      smallButton.removeAttribute("selected");
      mediumButton.removeAttribute("selected");
      largeButton.removeAttribute("selected");

      if (selectedS == 12) {
        smallButton.setAttribute("selected", "");
      } else if (selectedS == 18) {
        mediumButton.setAttribute("selected", "");
      } else if (selectedS == 26) {
        largeButton.setAttribute("selected", "");
      }
      
      if (document.activeElement != inputSize) {
        inputSize.textContent = selectedS;
      }
    }
    this.redraw();

    let saveSize = async (set) => {
      if (selectedS == set) {
        return;
      }
      selectedS = set;
      this.toolbar.setToolPreference("size", selectedS);
      await this.toolbar.saveSelecting(() => { return { d: { s: selectedS } }; }, { reuseActionBar: true });
      this.redraw();
    }

    smallButton.addEventListener("click", () => { saveSize(12); });
    mediumButton.addEventListener("click", () => { saveSize(18); });
    largeButton.addEventListener("click", () => { saveSize(26); });

    inputSize.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        saveSize(parseInt(inputSize.textContent));
        return textBox.blur();
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 250) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 250");
        }
      }
    });
    this.finish = async () => {
      if (inputSize == null) {
        return;
      }
      if (inputSize.textContent == "") {
        inputSize.textContent = selectedS;
        return;
      }
      let textInt = parseInt(inputSize.textContent) ?? selectedS;
      if (textInt === "") {
        return this.redraw();
      } else if (textInt > 250) {
        inputSize.textContent = "250";
      } else if (textInt < 1) {
        inputSize.textContent = "1";
      }
      await saveSize(parseInt(inputSize.textContent));
    }
    inputSize.addEventListener("focusout", this.finish);
    inputSize.addEventListener("focus", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
    });
  }
}
modules["editor/toolbar/bold"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/bold.svg");
    }
    if ((this.parent.getPreferenceTool().d ?? {}).bo != true) {
      this.button.removeAttribute("selecthighlight");
    } else {
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Bold";
  FULL_CLICK = true;

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { d: { bo: !(this.button.hasAttribute("selecthighlight")) } }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}
modules["editor/toolbar/italic"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/italic.svg");
    }
    if ((this.parent.getPreferenceTool().d ?? {}).it != true) {
      this.button.removeAttribute("selecthighlight");
    } else {
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Italic";
  FULL_CLICK = true;

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { d: { it: !(this.button.hasAttribute("selecthighlight")) } }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}
modules["editor/toolbar/underline"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/underline.svg");
    }
    if ((this.parent.getPreferenceTool().d ?? {}).ul != true) {
      this.button.removeAttribute("selecthighlight");
    } else {
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Underline";
  FULL_CLICK = true;

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { d: { ul: !(this.button.hasAttribute("selecthighlight")) } }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}
modules["editor/toolbar/strikethrough"] = class {
  setActionButton = async (button) => {
    if (button != null) {
      setSVG(button, "../images/editor/toolbar/strikethrough.svg");
    }
    if ((this.parent.getPreferenceTool().d ?? {}).st != true) {
      this.button.removeAttribute("selecthighlight");
    } else {
      this.button.setAttribute("selecthighlight", "");
    }
  }

  TOOLTIP = "Strikethrough";
  FULL_CLICK = true;

  js = async () => {
    await this.toolbar.saveSelecting(() => { return { d: { st: !(this.button.hasAttribute("selecthighlight")) } }; }, { refreshActionBar: false });
    this.setActionButton();
  }
}
modules["editor/toolbar/textalign"] = class {
  setActionButton = async (button) => {
    let selectedAl = (this.parent.getPreferenceTool().d ?? {}).al ?? "left";
    if (selectedAl == "left") {
      setSVG(button, "../images/editor/toolbar/textalign/left.svg");
    } else if (selectedAl == "center") {
      setSVG(button, "../images/editor/toolbar/textalign/center.svg");
    } else if (selectedAl == "right") {
      setSVG(button, "../images/editor/toolbar/textalign/right.svg");
    }
  }

  TOOLTIP = "Text Alignment";

  html = `
  <div class="eSubToolTextAlignContainer eHorizontalToolsHolder" keeptooltip>
    <button class="eTool" tooltip="Left Align" left option><div></div></button>
    <button class="eTool" tooltip="Center Align" center option><div></div></button>
    <button class="eTool" tooltip="Right Align" right option><div></div></button>
  </div>
  `;
  css = {
    ".eSubToolTextAlignContainer": `overflow: auto; border-radius: inherit`,
    ".eSubToolTextAlignContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolTextAlignContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
  js = async (frame) => {
    let leftAlign = frame.querySelector(".eTool[left]");
    let centerAlign = frame.querySelector(".eTool[center]");
    let rightAlign = frame.querySelector(".eTool[right]");

    setSVG(leftAlign.querySelector("div"), "../images/editor/toolbar/textalign/left.svg");
    setSVG(centerAlign.querySelector("div"), "../images/editor/toolbar/textalign/center.svg");
    setSVG(rightAlign.querySelector("div"), "../images/editor/toolbar/textalign/right.svg");

    let selectedAl;
    this.redraw = () => {
      selectedAl = (this.parent.getPreferenceTool().d ?? {}).al ?? "left";

      leftAlign.removeAttribute("selected");
      centerAlign.removeAttribute("selected");
      rightAlign.removeAttribute("selected");

      if (selectedAl == "left") {
        leftAlign.setAttribute("selected", "");
      } else if (selectedAl == "center") {
        centerAlign.setAttribute("selected", "");
      } else if (selectedAl == "right") {
        rightAlign.setAttribute("selected", "");
      }
    }
    this.redraw();

    let saveAlign = async (align) => {
      selectedAl = align;
      this.toolbar.setToolPreference("align", selectedAl);
      await this.toolbar.saveSelecting(() => { return { d: { al: selectedAl } }; }, { reuseActionBar: true });
      this.redraw();
    }

    leftAlign.addEventListener("click", () => { saveAlign("left"); });
    centerAlign.addEventListener("click", () => { saveAlign("center"); });
    rightAlign.addEventListener("click", () => { saveAlign("right"); });
  }
}