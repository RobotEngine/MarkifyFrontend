import { sendRequest } from "@/crucial";

import { textColorBackground } from "@modules/editor/utils/text-color-background";

import historyIcon from "@assets/lesson/file/history.svg?raw";
import kickIcon from "@assets/lesson/breakout/kick.svg?raw";
import { back } from "@modules/utility/core-icons";

export class Frame {
  html = `
  <div class="broManageMemberCollaboratorHolder">
    <div class="broManageMemberCollaboratorBackdrop"><div></div></div>
    <div class="broManageMemberCollaboratorContent">
      <div class="broManageMemberCollaboratorCursor"></div>
      <img class="broManageMemberCollaboratorPicture" />
      <div class="broManageMemberCollaboratorInfo">
        <div name></div>
        <div email></div>
      </div>
    </div>
  </div>
  <div class="broManageMemberLine" option="timeline"></div>
  <button class="broManageMemberAction" option="timeline" title="View this member's timeline history."><div>${historyIcon}</div>Timeline</button>
  <div class="broManageMemberLine" option="move"></div>
  <button class="broManageMemberAction" option="move" title="Move this member to a team." style="--themeColor: var(--secondary)"><div>${back}</div>Move Member</button>
  <button class="broManageMemberAction" option="remove" title="Remove this member from the team." style="--themeColor: var(--secondary)"><div>${back}</div>Remove</button>
  <div class="broManageMemberLine" option="kick"></div>
  <button class="broManageMemberAction" option="kick" title="Remove this member from the lesson." style="--themeColor: var(--error)"><div>${kickIcon}</div>Kick</button>
  `;

  css = {
    ".broManageMemberCollaboratorHolder": `position: relative; display: flex; flex-direction: column; width: 100%; gap: 4px; align-items: center; border-radius: 12px`,
    ".broManageMemberCollaboratorContent": `display: flex; flex-wrap: wrap; width: max-content; max-width: calc(100% - 16px); margin: 8px; gap: 4px; align-items: center; border-radius: inherit`,
    ".broManageMemberCollaboratorBackdrop": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1; border-radius: inherit; overflow: hidden`,
    ".broManageMemberCollaboratorBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(../images/editor/backdrop.svg); background-size: 24px; background-position: center`,
    ".broManageMemberCollaboratorCursor": `display: none; width: 40px; height: 40px; flex-shrink: 0; margin: 2px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px`,
    ".broManageMemberCollaboratorPicture": `display: none; width: 44px; height: 44px; flex-shrink: 0; margin: 2px; background: #fff; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px`,
    ".broManageMemberCollaboratorInfo": `max-width: calc(100% - 8px); margin: 4px; text-align: left`,
    ".broManageMemberCollaboratorInfo div[name]": `max-width: 100%; font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".broManageMemberCollaboratorInfo div[email]": `display: none; max-width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    
    ".broManageMemberAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".broManageMemberAction[hidden]": `display: none !important`,
    ".broManageMemberAction:not(:first-child)": `margin-top: 4px`,
    ".broManageMemberAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".broManageMemberAction div svg": `width: 100%; height: 100%`,
    ".broManageMemberAction:hover": `background: var(--themeColor); color: #fff`,
    ".broManageMemberLine": `width: 100%; height: 2px; margin-top: 4px; background: var(--gray); border-radius: 1px`
  };

  js(frame, extra) {
    let parent = extra.parent;
    let modifyID = extra.collaboratorID;

    let holder = frame.querySelector(".broManageMemberCollaboratorHolder");
    let cursor = holder.querySelector(".broManageMemberCollaboratorCursor");
    let image = holder.querySelector(".broManageMemberCollaboratorPicture");
    let info = holder.querySelector(".broManageMemberCollaboratorInfo");
    let name = info.querySelector("div[name]");
    let email = info.querySelector("div[email]");

    let updateCollaborator = () => {
      let collaborator = parent.parent.parent.collaborators[modifyID];
      if (collaborator == null || holder == null) {
        return;
      }
      holder.style.setProperty("--themeColor", collaborator.color);
      if (collaborator.email == null) {
        cursor.style.display = "unset";
      } else {
        if (image.src != (collaborator.image ?? "../images/profiles/default.svg")) {
          image.src = (collaborator.image ?? "../images/profiles/default.svg");
        }
        image.style.display = "unset";
      }
      info.style.color = textColorBackground(collaborator.color);
      name.textContent = collaborator.name;
      name.title = collaborator.name;
      if (collaborator.email != null) {
        email.textContent = collaborator.email;
        email.title = collaborator.email;
        email.style.display = "block";
      }
    }
    parent.pipeline.subscribe("manageMemberCollaboratorUpdate", "collaborator_update_" + modifyID, updateCollaborator);
    updateCollaborator();

    let timelineDivider = frame.querySelector('.broManageMemberLine[option="timeline"]');
    let timelineButton = frame.querySelector('.broManageMemberAction[option="timeline"]');
    timelineButton.addEventListener("click", () => {
      this.close();

      let groupMember = parent.layout.members[modifyID] ?? {};
      if (groupMember.group == null) {
        return;
      }
      let tileData = parent.layout.tiles[groupMember.group] ?? {};
      if (tileData.editor == null || tileData.loadedAnnotations != true) {
        return
      }

      parent.parent.openPage("timeline", "timeline", {
        exitPage: "overview",
        configuration: {
          id: groupMember.group,
          parameters: [("group=" + groupMember.group)],
          annotations: tileData.editor.annotations,
          backgroundColor: tileData.editor.backgroundColor,

          filter: [modifyID]
        }
      });
    });

    let moveButton = frame.querySelector('.broManageMemberAction[option="move"]');
    moveButton.addEventListener("click", async () => {
      this.close();
      parent.forceDragStart(modifyID);
    });
    let removeButton = frame.querySelector('.broManageMemberAction[option="remove"]');
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/breakout/move?collaborator=" + modifyID, null, { session: parent.parent.session });
      removeButton.removeAttribute("disabled");
    });

    let kickDivider = frame.querySelector('.broManageMemberLine[option="kick"]');
    let kickButton = frame.querySelector('.broManageMemberAction[option="kick"]');
    kickButton.addEventListener("click", async () => {
      kickButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/members/kick?collaborator=" + modifyID, null, { session: parent.parent.session });
      if (code == 200) {
        this.close();
      }
      kickButton.removeAttribute("disabled");
    });

    let updateButtons = () => {
      let groupMember = parent.layout.members[modifyID];
      if (groupMember == null) {
        return;
      }
      if (groupMember.group != null) {
        timelineDivider.removeAttribute("hidden");
        timelineButton.removeAttribute("hidden");
        removeButton.removeAttribute("hidden");
      } else {
        timelineDivider.setAttribute("hidden", "");
        timelineButton.setAttribute("hidden", "");
        removeButton.setAttribute("hidden", "");
      }

      if ((parent.layout.memberSessions[modifyID] ?? []).length > 0) {
        kickDivider.removeAttribute("hidden");
        kickButton.removeAttribute("hidden");
      } else {
        kickDivider.setAttribute("hidden", "");
        kickButton.setAttribute("hidden", "");
      }
    }
    parent.pipeline.subscribe("manageMemberCollaboratorJoin", "join", updateButtons, { sort: 2 });
    parent.pipeline.subscribe("manageMemberCollaboratorUpdate", "update", updateButtons, { sort: 2 });
    parent.pipeline.subscribe("manageMemberCollaboratorLeave", "leave", updateButtons, { sort: 2 });
    updateButtons();
  }
}