import breakoutBadgeIcon from "@assets/badges/breakout.svg?raw";

import breakoutSloganImg from "@assets/dashboard/actionframe/breakoutslogan.png?no-inline";

export class Frame {
  theme = "var(--breakoutTheme)";

  html = `
  <div class="dSidebarActionFrameBrHeader">
    <div class="dSidebarActionFrameBrTool">${breakoutBadgeIcon} Breakout</div>
    <div class="dSidebarActionFrameBrStatus">PREMIUM</div>
  </div>
  <img class="dSidebarActionFrameBrBanner" src="${breakoutSloganImg}" />
  <div class="dSidebarActionFrameBrText">Assign members into individual or team boards! Monitor each team and view a timeline history of each member's contributions.</div>
  <div class="dSidebarActionFrameBrLabel"><b>FREE</b> until January 1st, 2027</div>
  `;
  css = {
    ".dSidebarActionFrameBrHeader": `display: flex; flex-wrap: wrap; width: 100%; box-sizing: border-box; gap: 8px; padding: 8px; justify-content: space-between; align-items: center`,
    ".dSidebarActionFrameBrTool": `display: flex; flex-wrap: wrap; align-items: center; font-size: 20px; font-weight: 600; color: var(--theme)`,
    ".dSidebarActionFrameBrTool svg": `width: 32px; height: 32px; margin-right: 6px`,
    ".dSidebarActionFrameBrStatus": `position: relative; padding: 4px 8px; margin: 4px; background: var(--pageColor); border-radius: 14px; font-size: 14px; font-weight: 700; color: var(--theme)`,
    ".dSidebarActionFrameBrStatus:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: inset 0px 0px 6px 0px var(--theme); opacity: .3`,
    ".dSidebarActionFrameBrBanner": `width: 100%; height: 100px; object-fit: contain`,
    ".dSidebarActionFrameBrText": `box-sizing: border-box; width: 100%; padding: 0 16px; margin-top: 8px; font-size: 14px; line-height: 150%`,
    ".dSidebarActionFrameBrLabel": `box-sizing: border-box; width: 100%; padding: 8px; font-size: 14px; font-weight: 400`,
    ".dSidebarActionFrameBrLabel b": `font-weight: 700; color: var(--theme)`
  };
}