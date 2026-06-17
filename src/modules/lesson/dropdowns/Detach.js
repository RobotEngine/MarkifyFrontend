import { sendRequest, setPage } from "@/crucial";

import detachIcon from "@assets/lesson/file/detach.svg?raw";

export class Frame {
  html = `
  <div class="eDetachHolder">
    <div class="eDetachImage">${detachIcon}</div>
    <div class="eDetachContent">
      <div class="eDetachTitle"></div>
      <div class="eDetachDesc"></div>
    </div>
  </div>
  <div class="eDetachOptions">
    <button class="eDetachConfirm border" style="color: var(--yellow)">Detach</button>
    <button class="eDetachCancel border">Cancel</button>
  </div>
  `;
  css = {
    ".eDetachHolder": `display: flex; flex-wrap: wrap; gap: 6px; margin: 8px; justify-content: center`,
    ".eDetachImage": `--themeColor: var(--yellow); width: 64px; height: 64px`,
    ".eDetachImage svg": `width: 100%; height: 100%`,
    ".eDetachTitle": `color: var(--yellow); font-size: 20px; font-weight: 700; text-align: left`,
    ".eDetachDesc": `margin-top: 4px; max-width: 240px; font-size: 14px; text-align: left`,
    ".eDetachOptions": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 6px; justify-content: space-around`,
    ".eDetachOptions button": `display: flex; height: fit-content; min-height: 36px; padding: 0 12px; margin: 6px; --borderColor: var(--hover); --borderWidth: 3px; --borderRadius: 18px; color: var(--theme); justify-content: center; align-items: center; font-size: 18px; font-weight: 700`,
    ".eDetachConfirm:hover": `background: var(--yellow); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`,
    ".eDetachCancel:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`,
    ".eDetachOptions button:active": `transform: scale(1)`
  };
  async js(frame, extra) {
    let tool = extra.tool;

    let title = frame.querySelector(".eDetachTitle");
    let desc = frame.querySelector(".eDetachDesc");

    let capitalTool = tool.substring(0, 1).toUpperCase() + tool.substring(1);
    title.textContent = "Detach " + capitalTool + "?";
    desc.textContent = "Detaching will hide " + capitalTool + " on everyone's device. You can unhide " + capitalTool + " by clicking the " + capitalTool + " button in the bottom corner.";

    let detachConfirm = frame.querySelector(".eDetachConfirm");
    detachConfirm.addEventListener("click", async () => {
      detachConfirm.setAttribute("disabled", "");
      let [code] = await sendRequest("PATCH", "lessons/toggle/detach", { tool }, { session: extra.session });
      detachConfirm.removeAttribute("disabled");
      if (code == 200) {
        this.close();
      }
    });

    frame.querySelector(".eDetachCancel").addEventListener("click", () => {
      this.close();
    });
  }
}