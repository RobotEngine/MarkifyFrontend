modules["dropdowns/dashboard/moveto"] = {
  html: `
  <div class="dTileDropFolderHolder">
    <button class="dTileDropFolder">
      <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" stroke-width="30"/> </g> </svg>
      <div>Untitled Folder</div>
      <svg arrow viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--themeColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--themeColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg>
    </button>
  </div>
  <div class="dTileDropFolderActions">
    <button class="dTileDropFolderNew largeButton">New Folder</button>
    <button class="dTileDropFolderMoveTo largeButton">Move</button>
  </div>
  `,
  css: {
    ".dTileDropFolderHolder": `display: flex; flex-direction: column; align-items: flex-end`,
    ".dTileDropFolder": `--themeColor: var(--theme); display: flex; padding: 4px; width: 100%; margin-bottom: 6px; align-items: center; border-radius: 24px`,
    ".dTileDropFolder:hover": `background: var(--hover)`,
    ".dTileDropFolder svg[folder]": `width: 32px; height: 32px`,
    ".dTileDropFolder div": `margin: 0 4px; color: var(--textColor); font-size: 18px; font-weight: 600`,
    ".dTileDropFolder svg[arrow]": `width: 24px; height: 24px; margin-left: auto`,
    ".dTileDropFolderActions": `position: sticky; display: flex; flex-wrap: wrap; padding: 8px; margin: 4px; gap: 24px; bottom: 4px; justify-content: space-between; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 27px`,
    ".dTileDropFolderNew": `padding: 6px 10px; background: var(--theme); --borderRadius: 20px; color: #fff; font-size: 16px`,
    ".dTileDropFolderMoveTo": `padding: 6px 10px; background: #fff; --borderRadius: 20px; color: var(--secondary); font-size: 16px`
  },
  js: async function (frame) {
    let newFolder = frame.querySelector(".dTileDropFolderNew");

  }
}