import boardBadgeIcon from "@assets/badges/board.svg?raw";

import boardSloganImg from "@assets/dashboard/actionframe/boardslogan.png?no-inline";

export class Frame {
  html = `
  <div class="dSidebarActionFrameBoHeader">
    <div class="dSidebarActionFrameBoTool">${boardBadgeIcon} Board</div>
    <div class="dSidebarActionFrameBoStatus">FREE</div>
  </div>
  <img class="dSidebarActionFrameBoBanner" src="${boardSloganImg}" />
  <div class="dSidebarActionFrameBoText">The classic Markify whiteboard tool used for note taking and safe whole-class collaboration.</div>
  <div class="dSidebarActionFrameBoLabel"><b>FREE</b> for educators, <b>forever!</b></div>
  `;
  css = {
    ".dSidebarActionFrameBoHeader": `display: flex; flex-wrap: wrap; width: 100%; box-sizing: border-box; gap: 8px; padding: 8px; justify-content: space-between; align-items: center`,
    ".dSidebarActionFrameBoTool": `display: flex; flex-wrap: wrap; align-items: center; font-size: 20px; font-weight: 600; color: var(--theme)`,
    ".dSidebarActionFrameBoTool svg": `width: 32px; height: 32px; margin-right: 6px`,
    ".dSidebarActionFrameBoStatus": `position: relative; padding: 4px 8px; margin: 4px; background: var(--pageColor); border-radius: 14px; font-size: 14px; font-weight: 700; color: var(--theme)`,
    ".dSidebarActionFrameBoStatus:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: inset 0px 0px 6px 0px var(--theme); opacity: .3`,
    ".dSidebarActionFrameBoBanner": `width: 100%; height: 100px; object-fit: contain`,
    ".dSidebarActionFrameBoText": `box-sizing: border-box; width: 100%; padding: 0 16px; margin-top: 8px; font-size: 14px; line-height: 150%`,
    ".dSidebarActionFrameBoLabel": `box-sizing: border-box; width: 100%; padding: 8px; font-size: 14px; font-weight: 400`,
    ".dSidebarActionFrameBoLabel b": `font-weight: 700; color: var(--theme)`
  };
}