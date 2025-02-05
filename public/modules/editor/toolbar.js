modules["editor/toolbar"] = class {
  css = {
    ".eTool": `--hoverColor: var(--hover); width: 50px; height: 42px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
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

    ".eDivider": `width: calc(100% - 8px); height: 4px; background: var(--hover); border-radius: 2px`,
    ".eVerticalDivider": `flex-shrink: 0; width: 4px; height: calc(100% - 8px); background: var(--hover); border-radius: 2px`,

    ".eSubToolHolder": `position: absolute; max-height: 100%; left: 100%; top: 0px; background: var(--pageColor); border-radius: 0 16px 16px 0; border-left: solid 4px var(--theme); transform: scale(0); transform-origin: top left; transition: opacity .3s, transform: .3s`,
    ".eSubToolHolder[option]": `border-left-color: var(--secondary)`,
    ".eSubToolShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 20px 16px 0; left: -4px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eSubToolShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); left: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; overflow: auto`,
    ".eSubToolHolder[option] .eSubToolContentScroll": `overflow: visible`,
    ".eSubToolContent": `display: flex; flex-wrap: wrap; gap: 6px`,

    ".eToolHoverTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`
  };
  js = async (editor) => {
    let page = editor.page;

    let toolbarHolder = page.querySelector(".eToolbarHolder");
    let editorToolbar = toolbarHolder.querySelector(".eToolbar[editor]");
    let viewerToolbar = toolbarHolder.querySelector(".eToolbar[viewer]");

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
      <div class="eToolHoverTooltip"></div>
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
  }
}