modules["editor/toolbar"] = class {
  css = {
    ".eTool": `--hoverColor: var(--hover); width: 50px; height: 46px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
    ".eTool > div": `display: flex; width: 42px; height: 42px; margin: 0 4px; justify-content: center; align-items: center; border-radius: 8px; transition: .2s; overflow: hidden`,
    ".eTool:hover > div": `background: var(--hoverColor)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active > div": `transform: scale(.95)`,
    ".eTool[option]:active > div": `background: var(--secondary); border-radius: 22px`,
    ".eTool[selected]:active > div": `width: 42px !important; margin: 0 4px !important; border-radius: 8px !important`,
    ".eTool[selected][option]:active > div": `border-radius: 22px !important`,
    ".eTool[selected] > div": `background: var(--theme)`,
    ".eTool[selected][option] > div": `background: var(--secondary)`,
    ".eToolbarHolder[left] .eTool[extended] > div": `width: 46px; margin: 0 0 0 4px; border-radius: 8px 0 0 8px`,
    ".eToolbarHolder[right] .eTool[extended] > div": `width: 46px; margin: 0 4px 0 0; border-radius: 0 8px 8px 0`,
    ".eTool[selecthighlight] > div": `background: var(--theme)`,
    ".eTool[selecthighlight]:active > div": `border-radius: 8px !important`,
    ".eTool[off]": `opacity: 0.5`,

    ".eDivider": `width: calc(100% - 8px); height: 4px; margin: 2px 0; background: var(--hover); border-radius: 2px`,
    ".eVerticalDivider": `flex-shrink: 0; width: 4px; height: calc(100% - 8px); margin: 0 2px; background: var(--hover); border-radius: 2px`,

    ".eSubToolHolder": `position: absolute; max-height: 100%; left: 100%; top: 0px; background: var(--pageColor); border-radius: 0 16px 16px 0; border-left: solid 4px var(--theme); transform: scale(0); transform-origin: top left; transition: opacity .3s, transform: .3s`,
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
    let viewerToolbar = toolbarHolder.querySelector(".eToolbar[viewer]");
    let tooltipText = toolbarHolder.querySelector(".eToolbarTooltip");
    
    editorToolbar.innerHTML = `
    <button class="eTool" tool="select" tooltip="Selection" selected><div></div></button>
    <button class="eTool" tool="draw" tooltip="Draw"><div></div></button>
    <button class="eTool" tool="markup" tooltip="Markup"><div></div></button>
    <button class="eTool" tool="erase" tooltip="Erase"><div></div></button>
    <button class="eTool" tool="text" tooltip="Text Box"><div></div></button>
    <button class="eTool" tool="shape" tooltip="Shapes"><div></div></button>
    <button class="eTool" tool="sticky" tooltip="Stickies"><div></div></button>
    <button class="eTool" tool="page" tooltip="Page"><div></div></button>
    <button class="eTool" tool="media" tooltip="Media"><div></div></button>

    <div class="eSubToolHolder" keeptooltip>
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
    </div>
    `;
    viewerToolbar.innerHTML = `
    <button class="eTool" subtool="hand" tooltip="Raise Hand"><div></div></button>
    <div class="eDivider"></div>
    <button class="eTool" subtool="select" tooltip="Select" module="pages/editor/toolbar/select" selected><div></div></button>
    <button class="eTool" subtool="pan" tooltip="Pan" module="pages/editor/toolbar/pan"><div></div></button>
    `;

    let contentHolder = editor.contentHolder;
    let content = editor.contentHolder.querySelector(".eContent");
    let annotations = content.querySelector(".eAnnotations");

    let subTools = editorToolbar.querySelector(".eSubToolHolder");
    let subToolContentHolder = subTools.querySelector(".eSubToolContentHolder");
    let subToolContentScroll = subTools.querySelector(".eSubToolContentScroll");
    let subToolContent = subToolContentScroll.querySelector(".eSubToolContent");
    let mainSubtoolButton;

    let subSubTools = subTools.querySelector(".eSubToolHolder[option]");
    let subSubToolContentHolder = subSubTools.querySelector(".eSubToolContentHolder");
    let subSubToolContentScroll = subSubTools.querySelector(".eSubToolContentScroll");
    let subSubToolContent = subSubToolContentScroll.querySelector(".eSubToolContent");
    let mainSubSubtoolButton;

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

      if (tooltipElement.closest(".eToolbar") != null || tooltipElement.closest(".content") != null) {
        tooltipText.style.transformOrigin = "center left";

        let toolHolderRect = toolbarHolder.getBoundingClientRect();
        let toolsRect = editorToolbar.getBoundingClientRect();
        let buttonRect = tooltipElement.getBoundingClientRect();

        let setLeft = editorToolbar.offsetWidth;
        let setTop = + buttonRect.top - toolHolderRect.top + (tooltipElement.offsetHeight / 2) - (tooltipText.offsetHeight / 2);
        let subToolWidth = parseInt(subTools.getAttribute("setwidth")) + 4;
        let subToolTop = parseInt(subTools.getAttribute("settop"));
        if (tooltipElement.hasAttribute("tool") == false) {
          setLeft += subToolWidth;
        } else if (mainSubtoolButton != null) {
          if (setTop > subToolTop && setTop < subToolTop + parseInt(subTools.getAttribute("setheight"))) {
            setLeft += subToolWidth;
          }
        }
        tooltipText.style.left = setLeft + 6 + "px";
        tooltipText.style.top = setTop + "px";
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

    // Subscribe to Events
    editor.pipeline.subscribe("toolbarMouseMove", "mousemove", (data) => {
      let event = data.event;
      this.setTooltip(event);
    });
    editor.pipeline.subscribe("toolbarMouseLeave", "mouseleave", () => {
      this.closeTooltip();
    });
  }
}