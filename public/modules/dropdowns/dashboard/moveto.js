modules["dropdowns/dashboard/moveto"] = {
  html: `
  <div class="eShareLinkCreate">
    <button class="largeButton border">Enable Link</button>
  </div>
  <div class="eShareLinkRow" style="margin-top: 0px">
    <input class="eShareLinkSection" readonly></input>
    <button class="eShareLinkCopy border" title="Copy the link."><img src="./images/tooltips/copy.svg"></button>
  </div>
  <button class="eShareLinkRow eShareLinkPerm buttonAnim">
    <img class="eShareLinkIcon">
    <div class="eShareDetailsHolder">
      <div class="eShareDetailTitle"></div>
      <div class="eShareDetailDesc"></div>
    </div>
  </button>
  <div class="eShareLinkRow">
    <button class="eShareLinkRemove border" title="Invalidate the link.">Private Link</button>
    <button class="eShareOptionLink border" dropdown="dropdowns/editor/share/options" title="Configurable options for members who join.">Options</button>
  </div>
  `,
  css: {
    ".eShareLinkCreate": "position: absolute; display: flex; width: calc(100% - 16px); height: calc(100% - 16px); justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eShareLinkCreate button": `background: var(--theme); --borderRadius: 20.25px; color: #fff`,

    ".eShareLinkRow": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 16px; justify-content: center; align-items: center`,
    ".eShareLinkRow button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,

    ".eShareLinkSection": `box-sizing: border-box; width: calc(100% - 50px); height: 42px; margin-right: 8px; border: solid 3px var(--hover); outline: unset; border-radius: 21px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 700; font-family: var(--theme); cursor: copy; user-select: all`,
    ".eShareLinkCopy": `width: 36px; height: 36px; padding: 0; margin: 3px; --borderWidth: 3px`,
    ".eShareLinkCopy img": `width: 30px; transition: .1s`,
    ".eShareLinkCopy:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eShareLinkCopy:hover img": `filter: brightness(0) invert(1)`,

    ".eShareLinkPerm": `box-sizing: border-box; max-width: 360px; padding: 6px; align-items: flex-start; border-radius: 24px`,
    ".eShareLinkIcon": `width: 36px; height: 36px`,
    ".eShareDetailsHolder": `flex: 1; margin-left: 8px; text-align: left`,
    ".eShareDetailTitle": `color: var(--theme); font-size: 16px; font-weight: 600`,

    ".eShareLinkRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eShareLinkRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,

    ".eShareOptionLink": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionLink:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`
  },
  js: async function (frame) {
    
  }
}