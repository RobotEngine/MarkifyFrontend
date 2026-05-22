import { userID, setPage, sendRequest } from "@/crucial";

import { alert as alertModule } from "@modules/utility/Alert";

import copyIcon from "@assets/lesson/file/copy.svg?raw";
import movetoIcon from "@assets/lesson/file/moveto.svg?raw";
import { back as backIcon, trash as trashIcon } from "@modules/utility/core-icons";

export class Frame {
  html = `
  <button class="brgsFileAction" option="dashboard" title="Return to the Dashboard" style="--themeColor: var(--secondary)"><div>${backIcon}</div>Dashboard</button>
  <div class="brgsFileLine"></div>
  <button class="brgsFileAction" option="copy" title="Create a copy of the lesson." style="display: none"><div>${copyIcon}</div>Create Copy</button>
  <button class="brgsFileAction" option="moveto" title="Move this lesson into a folder." dropdowntitle="Move To Folder"><div>${movetoIcon}</div>Move To Folder</button>
  <button class="brgsFileAction" option="deletelesson" title="Remove this lesson from your dashboard." style="--themeColor: var(--error)"><div>${trashIcon}</div>Remove Lesson</button>
  `;

  css = {
    ".brgsFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".brgsFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".brgsFileAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".brgsFileAction div svg": `width: 100%; height: 100%`,
    ".brgsFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".brgsFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };

  js(frame, extra) {
    let parent = extra.parent;

    let dashboardButton = frame.querySelector('.brgsFileAction[option="dashboard"]');
    dashboardButton.addEventListener("click", async () => {
      setPage("pages/app/dashboard");
    });
    
    let copyButton = frame.querySelector('.brgsFileAction[option="copy"]');
    copyButton.addEventListener("click", async () => {
      if (userID == null) {
        return promptLogin();
      }
      copyButton.setAttribute("disabled", "");
      let copyAlert = await alertModule.open("info", "<b>Creating Copy</b><div>Creating a copy of this lesson.", { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/copya", null, { session: parent.parent.parent.session });
      copyButton.removeAttribute("disabled");
      alertModule.close(copyAlert);
      if (code == 200) {
        this.close();
        setPage("pages/app/lesson", { params: { lesson: body.lesson } });
      }
    });

    let fileButton = frame.querySelector('.brgsFileAction[option="moveto"]');
    fileButton.addEventListener("click", () => {
      this.open(fileButton, import("@modules/dropdowns/MoveTo"), { lessonID: parent.parent.id, folderID: parent.parent.folder });
    });

    let deleteLessonButton = frame.querySelector('.brgsFileAction[option="deletelesson"]');
    deleteLessonButton.addEventListener("click", () => {
      this.open(deleteLessonButton, import("@modules/dropdowns/Remove"), {
        type: "deletelesson",
        lessonID: parent.parent.parent.id,
        isOwner: false,
        session: parent.parent.parent.session
      });
    });
  }
}