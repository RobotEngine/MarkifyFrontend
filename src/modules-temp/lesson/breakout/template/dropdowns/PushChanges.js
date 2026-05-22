import { sendRequest } from "@/crucial";

export class Frame {
  html = `
  <div class="brtPushChangesHolder">
    <div class="brtPushChangesContent">
      <div class="brtPushChangesTitle">Push Changes to Teams?</div>
      <div class="brtPushChangesDesc">This will apply the new template changes to all teams.</div>
    </div>
  </div>
  <div class="brtPushChangesOptions">
    <button class="brtPushChangesConfirm border">Push</button>
    <button class="brtPushChangesCancel border" style="color: var(--secondary)">Cancel</button>
  </div>
  `;

  css = {
    ".brtPushChangesHolder": `display: flex; flex-wrap: wrap; max-width: 100%; padding: 8px 16px; gap: 6px; justify-content: center`,
    ".brtPushChangesContent": `display: flex; flex-direction: column; max-width: 100%; align-items: center`,
    ".brtPushChangesTitle": `color: var(--theme); font-size: 20px; font-weight: 700`,
    ".brtPushChangesDesc": `margin-top: 8px; max-width: 240px; font-size: 14px`,
    ".brtPushChangesOptions": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 12px; justify-content: space-around`,
    ".brtPushChangesOptions button": `display: flex; height: fit-content; min-height: 36px; padding: 0 12px; margin: 6px; --borderColor: var(--hover); --borderWidth: 3px; --borderRadius: 18px; color: var(--theme); justify-content: center; align-items: center; font-size: 18px; font-weight: 700`,
    ".brtPushChangesConfirm:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`,
    ".brtPushChangesCancel:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`,
    ".brtPushChangesOptions button:active": `transform: scale(1)`
  };

  js = async (frame, extra) => {
    let parent = extra.parent;
    
    let confirmButton = frame.querySelector(".brtPushChangesConfirm");
    confirmButton.addEventListener("click", async () => {
      confirmButton.setAttribute("disabled", "");
      await parent.editor.save.syncSave(true);
      let [code] = await sendRequest("PUT", "lessons/breakout/templates/push", null, { session: parent.parent.parent.session });
      confirmButton.removeAttribute("disabled");
      if (code == 200) {
        this.close();
        parent.close(true);
      }
    });

    frame.querySelector(".brtPushChangesCancel").addEventListener("click", () => {
      this.close();
    });
  }
}