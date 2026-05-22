import { sendRequest } from "@/crucial";

export class Frame {
  maxHeight = 600;

  html = `
  <div class="brgWelcomeInformation">
    <div class="brgWelcomeHeader">
      <div class="brgWelcomeBackdrop"></div>
      <div class="brgWelcomeHeaderText">You're on team</div>
      <div class="brgWelcomeGroupName"></div>
    </div>
    <div class="brgWelcomeGroupMembersHolder">
      <div class="brgWelcomeMembersText"><div></div><span>Your Teammates</span><div></div></div>
      <div class="brgWelcomeGroupMembers"></div>
    </div>
  </div>
  <div class="brgWelcomeEnter">
    <button class="largeButton" back>Enter Team</button>
  </div>
  `;

  css = {
    ".brgWelcomeInformation": `max-width: 100%`,
    ".brgWelcomeHeader": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; min-width: 100%; max-width: 100%; padding: 16px; margin: 8px 0; align-items: center`,
    ".brgWelcomeBackdrop": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: url(../images/breakoutcursorbackdrop.png); background-size: cover; background-position: center; opacity: .5; mask-image: linear-gradient(to bottom, transparent 0%, var(--pageColor) 18px, var(--pageColor) calc(100% - 18px), transparent 100%); z-index: 1`,
    ".brgWelcomeHeaderText": `font-size: 20px; font-weight: 500; font-style: italic; z-index: 2`,
    ".brgWelcomeGroupName": `--fontSize: clamp(24px, 8vw, 48px); box-sizing: border-box; padding: calc(var(--fontSize) / 2.5) calc(var(--fontSize) / 1.5); max-width: 100%; margin-top: 12px; background: rgba(var(--background), .6); backdrop-effect: blur(8px); box-shadow: var(--darkShadow); border-radius: max(100vw, 100vh); color: var(--theme); font-size: var(--fontSize); font-weight: 800; z-index: 2`,
    ".brgWelcomeGroupMembersHolder": `width: min-content; min-width: 100%; max-width: 100%; margin: 8px 0`,
    ".brgWelcomeMembersText": `display: flex; align-items: center; color: var(--secondary); font-size: 18px; font-weight: 600`,
    ".brgWelcomeMembersText div": `flex: 1; height: 4px; margin: 0 12px; background: var(--secondary); border-radius: 2px`,
    ".brgWelcomeGroupMembers": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 12px; width: 100%; padding: 16px; justify-content: center`,
    ".brgWelcomeGroupMember": `--themeColor: var(--theme); --shadow: var(--lightShadow); position: relative; box-sizing: border-box; display: flex; max-width: 100%; padding: 10px 18px 10px 10px; background: var(--pageColor); border-radius: 22px; justify-content: center; align-items: center; transition: .2s`,
    ".brgWelcomeGroupMember:not([active])": `opacity: .5`,
    ".brgWelcomeGroupMember:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; contain: strict; pointer-events: none; box-shadow: var(--shadow)`,
    ".brgWelcomeGroupMemberCursor": `flex-shrink: 0; position: relative; box-sizing: border-box; width: 40px; height: 40px; margin-right: 10px; background: var(--themeColor); border: solid 4px var(--pageColor); border-radius: 12px 20px 20px; transition: .2s`,
    ".brgWelcomeGroupMemberCursor:before": `content: ""; position: absolute; width: calc(100% + 8px); height: calc(100% + 8px); left: -4px; top: -4px; border-radius: inherit; contain: strict; box-shadow: 0 0 6px rgb(0 0 0 / 25%)`,
    ".brgWelcomeGroupMemberText": `font-size: 22px; font-weight: 600; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; transition: .2s`,
    ".brgWelcomeEnter": `position: sticky; display: flex; flex-wrap: wrap; gap: 12px; width: calc(100% - 24px); bottom: 0; padding: 12px; font-size: 16px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); justify-content: center; align-items: center; z-index: 2`,
    ".brgWelcomeEnter .largeButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 12px; max-width: 100%; padding: 6px 10px; margin: 3px; justify-content: center; font-size: 18px`
  };

  js = async (frame, extra) => {
    frame.closest(".modalContent").style.padding = "0px";

    let parent = extra.parent;

    let groupName = frame.querySelector(".brgWelcomeGroupName");
    let membersContainer = frame.querySelector(".brgWelcomeGroupMembersHolder");
    let membersHolder = membersContainer.querySelector(".brgWelcomeGroupMembers");

    let updateSeenGroup = () => {
      sendRequest("PUT", "lessons/breakout/groups/read?group=" + parent.group._id, null, { session: parent.parent.parent.session });
    }
    frame.querySelector(".brgWelcomeEnter .largeButton").addEventListener("click", async () => {
      updateSeenGroup();
      extra.modal.close();
    });
    let closeButton = frame.closest(".modal").querySelector(".modalClose");
    if (closeButton != null) {
      closeButton.addEventListener("click", updateSeenGroup);
    }

    let updateGroup = () => {
      let name = parent.group.name ?? "Untitled Team";
      groupName.textContent = name;
      groupName.title = name;
    }
    parent.pipeline.subscribe("groupWelcomeSet", "set", updateGroup);
    updateGroup();
    
    let checkHolder = () => {
      if (membersHolder.childElementCount > 0) {
        membersContainer.style.removeProperty("display");
      } else {
        membersContainer.style.display = "none";
      }
    }
    let updateTile = (data, tile) => {
      if (tile == null) {
        tile = membersHolder.querySelector('.brgWelcomeGroupMember[member="' + data._id + '"]');
        if (tile == null) {
          return addTile(data);
        }
      }
      if (data.hasOwnProperty("color") == true) {
        tile.style.setProperty("--themeColor", data.color);
      }
      if ((parent.members[data._id] ?? []).length > 0) {
        tile.setAttribute("active", "");
      } else {
        tile.removeAttribute("active");
      }
      if (data.hasOwnProperty("name") == true) {
        let memberName = tile.querySelector(".brgWelcomeGroupMemberText");
        memberName.textContent = data.name;
        memberName.title = data.name;
      }
      checkHolder();
    }
    let addTile = (data) => {
      if (data.access > 3 || data._id == parent.parent.parent.self.modify) {
        return;
      }
      membersHolder.insertAdjacentHTML("beforeend", `<div class="brgWelcomeGroupMember" new>
        <div class="brgWelcomeGroupMemberCursor"></div>
        <div class="brgWelcomeGroupMemberText"></div>
      </div>`);
      let tile = membersHolder.querySelector(".brgWelcomeGroupMember[new]");
      tile.removeAttribute("new");
      tile.setAttribute("member", data._id);
      updateTile(data, tile);
    }
    let removeTile = (id) => {
      let tile = membersHolder.querySelector('.brgWelcomeGroupMember[member="' + id + '"]');
      if (tile != null) {
        tile.remove();
        checkHolder();
      }
    }

    parent.pipeline.subscribe("groupWelcomeJoin", "join", (body) => {
      if (body.group == parent.group._id && body.access < 4) {
        updateTile({ ...body, _id: body.modify });
      }
    }, { sort: 2 });
    parent.pipeline.subscribe("groupWelcomeLeave", "leave", (body) => {
      if (body.member != null && body.member.group == parent.group._id) {
        updateTile({ ...body.member, _id: body.member.modify });
      }
    }, { sort: 2 });
    parent.pipeline.subscribe("groupWelcomeUpdate", "update", (body) => {
      let member = parent.parent.parent.members[body._id];
      if (member == null) {
        return;
      }
      if (member.group == parent.group._id && member.access < 4) {
        updateTile({ ...body, _id: member.modify });
      } else {
        removeTile(member.modify);
      }
    }, { sort: 2 });
    parent.pipeline.subscribe("groupWelcomeCollaboratorUpdate", "collaborator_update", (body) => {
      if (parent.members[body._id] != null) {
        updateTile(body);
      }
    }, { sort: 2 });
    parent.pipeline.subscribe("groupWelcomeAssign", "memberassign", (body) => {
      if (body.group == parent.group._id) {
        updateTile(body.collaborator);
      } else {
        removeTile(body.collaborator._id);
      }
    }, { sort: 2 });

    let groupMemberModifyIDs = Object.keys(parent.members);
    for (let i = 0; i < groupMemberModifyIDs.length; i++) {
      addTile(parent.parent.parent.collaborators[groupMemberModifyIDs[i]]);
    }
    checkHolder();
  }
}