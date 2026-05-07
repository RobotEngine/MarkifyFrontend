import { getObject, copyObject, sendRequest } from "@/crucial";

import { emojis, sheetSize } from "@modules/utility/emojis";

import reactionsIcon from "../../icons/toolbar/reactions.svg?raw";
import { trash as trashIcon } from "@modules/utility/core-icons";

export class Tool {
  setActionButton(button) {
    let preference = this.toolbar.getPreferenceTool();
    let selectID = preference._id;

    if (this.toolbar.reactionsCache == null || this.toolbar.reactionsCache.id != selectID) {
      this.toolbar.reactionsCache = { id: selectID, reactions: {}, members: {}, loaded: false };
    }

    this.editor.pipeline.subscribe("reactionsModule", "reaction", (event) => {
      let body = copyObject(event);
      if (body.reaction.annotation != (this.toolbar.reactionsCache ?? {}).id) {
        return;
      }
      this.toolbar.reactionsCache.reactions[body.reaction.emoji] = this.toolbar.reactionsCache.reactions[body.reaction.emoji] ?? {};
      let cache = this.toolbar.reactionsCache.reactions[body.reaction.emoji];
      let reactID;
      if (body.member != null) {
        reactID = body.reaction.annotation + "_" + body.reaction.emoji + "_" + body.member._id;
      }
      if (body.change > 0) {
        cache[reactID] = body.added;
        this.toolbar.reactionsCache.members[body.member._id] = body.member;
        if (this.button != null && this.button.hasAttribute("hidden") == true) {
          this.button.removeAttribute("disabled");
          this.toolbar.selection.updateActionBar({ refreshActionBar: true });
        }
      } else if (body.change < 0) {
        delete cache[reactID];
      } else if (body.change == null) {
        cache = {};
      }
      if (Object.keys(cache).length < 1) {
        delete this.toolbar.reactionsCache.reactions[body.reaction.emoji];
      }
      if (Object.keys(this.toolbar.reactionsCache.reactions).length < 1) {
        this.toolbar.selection.updateActionBar({ refreshActionBar: true });
      }
      if (this.toolbar.reactionsCache.function != null) {
        this.toolbar.reactionsCache.function(body);
      }
    });
    
    let reactions = this.editor.reactions[selectID] ?? [];
    if (reactions.length < 1 || this.toolbar.reactionsCache.error == true) {
      return false;
    }

    button.innerHTML = reactionsIcon;

    if (this.toolbar.reactionsCache.loaded == false) {
      this.toolbar.reactionsCache.loaded = true;
      this.button.setAttribute("disabled", "");

      (async () => {
        let path = "lessons/members/reaction/members?annotation=" + selectID;
        if ((this.editor.parameters ?? []).length > 0) {
          path += "&" + this.editor.parameters.join("&");
        }
        let [code, body] = await sendRequest("GET", path, null, { session: this.editor.session });
        if (code == 200 && this.toolbar.reactionsCache.id == selectID) {
          for (let i = 0; i < body.reactions.length; i++) {
            let reaction = body.reactions[i];
            let reactID = reaction._id.split("_");
            this.toolbar.reactionsCache.reactions[reactID[1]] = this.toolbar.reactionsCache.reactions[reactID[1]] ?? {};
            this.toolbar.reactionsCache.reactions[reactID[1]][reaction._id] = reaction.added;
          }
          if (body.members != null) {
            this.toolbar.reactionsCache.members = { ...this.toolbar.reactionsCache.members, ...getObject(body.members, "_id") };
          }
        } else {
          this.toolbar.reactionsCache.error = true;
          return this.toolbar.selection.updateActionBar({ redrawActionBar: true });
        }
        if (this.button != null) {
          this.button.removeAttribute("disabled");
        }
      })();
    }
  }

  TOOLTIP = "Reactions";
  SHOW_ON_LOCK = true;
  ADD_DIVIDE_BEFORE = true;
  SUPPORTS_MULTIPLE_SELECT = false;

  html = `
  <div class="eSubToolReactionHolder">
    <div class="eSubToolReactionSidebar"></div>
    <div class="eSubToolReactionMembers">
      <div class="eSubToolReactionMemberTitle">
        <div title></div>
        <button remove title="Remove this reaction from the sticky note."><div image>${trashIcon}</div></button>
      </div>
      <div class="eSubToolReactionMemberSection"></div>
    </div>
  </div>
  `;
  css = {
    ".eSubToolReactionHolder": `display: flex; width: max-content; max-width: 100%; max-height: fit-content`,
    ".eSubToolReactionSidebar": `display: flex; flex-direction: column; width: 38px; min-width: 38px; max-height: 238px; padding: 6px; gap: 6px; border-right: solid 4px var(--theme); overflow: auto; scrollbar-width: none`,
    ".eSubToolReactionSidebar::-webkit-scrollbar": `display: none`,
    ".eSubToolReactionSidebar button": `display: flex; width: 38px; height: 38px; min-height: 38px; justify-content: center; align-items: center; border-radius: 8px`,
    ".eSubToolReactionSidebar button:hover": `background: var(--hover)`,
    ".eSubToolReactionSidebar button[selected]": `background: var(--theme) !important`,
    ".eSubToolReactionSidebar button img": `width: 32px; height: 32px; transform: scale(.95); object-fit: none; filter: drop-shadow(0px 0px 8px var(--pageColor));`,
    ".eSubToolReactionMembers": `max-width: 100%; max-height: 250px; overflow: auto`,
    ".eSubToolReactionMemberTitle": `position: sticky; display: flex; width: 100%; top: 0px; background: var(--theme); justify-content: space-between; align-items: center`,
    ".eSubToolReactionMemberTitle div[title]": `width: 100%; margin: 8px; font-size: 18px; font-weight: 600; color: #fff; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolReactionMemberTitle button": `display: none; width: 32px; height: 32px; margin: 6px; background: var(--pageColor); color: #fff; border-radius: 8px; justify-content: center; align-items: center`,
    ".eSubToolReactionMemberTitle button div[image]": `--themeColor: var(--error); width: 22px; height: 22px`,
    ".eSubToolReactionMemberTitle button div[image] svg": `width: 22px; height: 22px`,
    ".eSubToolReactionMemberSection": `display: flex; flex-direction: column; min-height: 163px; height: calc(100% - 44px)`,
    ".eSubToolReactionMember": `display: flex; padding: 4px; align-items: center`,
    ".eSubToolReactionMember div[cursor]": `width: 22px; min-width: 22px; height: 22px; margin: 3px; background: var(--pageColor); border-radius: 10px 18px 18px`,
    ".eSubToolReactionMember div[holder]": `display: flex; width: calc(100% - 26px); white-space: nowrap; overflow: hidden; justify-content: space-between`,
    ".eSubToolReactionMember div[holder] div[name]": `display: inline; margin: 0 12px 0 6px; font-size: 16px; font-weight: 600`,
    ".eSubToolReactionMember div[holder] div[email]": `display: inline; font-size: 16px; font-weight: 500`,
    ".eSubToolReactionTempShow": `display: none; flex-direction: column; width: calc(100% - 24px); padding: 12px; margin-top: auto; align-items: center`,
    ".eSubToolReactionTempShow div[titlecount]": `font-size: 20px; font-weight: 600`,
    ".eSubToolReactionTempShow div[titlecount] b": `font-weight: 700; color: var(--theme)`,
    ".eSubToolReactionTempShow div[info]": `max-width: 297px; margin-top: 6px; font-size: 14px; font-weight: 500`,
    ".eSubToolReactionTempShow div[info] a": `display: none; color: var(--theme); font-size: 16px; font-weight: 700; line-height: 30px`
  };
  async js(frame) {
    let cache = this.toolbar.reactionsCache;

    let emojiObject = getObject(await emojis, "name");

    let emojiButtonSidebar = frame.querySelector(".eSubToolReactionSidebar");
    let emojiMemberSection = frame.querySelector(".eSubToolReactionMemberSection");
    let removeReactionButton = frame.querySelector(".eSubToolReactionMemberTitle button[remove]");

    removeReactionButton.addEventListener("click", async () => {
      removeReactionButton.setAttribute("disabled", "");
      let path = "lessons/members/reaction/delete?annotation=" + cache.id + "&emoji=" + emojiButtonSidebar.querySelector("button[selected]").getAttribute("emoji").replace(/ /g, "_");
      if ((this.editor.parameters ?? []).length > 0) {
        path += "&" + this.editor.parameters.join("&");
      }
      await sendRequest("DELETE", path, null, { session: this.editor.session });
      removeReactionButton.removeAttribute("disabled");
    });

    let insertReactionButton = (emojiName) => {
      if (emojiButtonSidebar.querySelector('.eSubToolReaction[emoji="' + emojiName + '"]') != null) {
        return;
      }
      let emoji = emojiObject[emojiName];
      emojiButtonSidebar.insertAdjacentHTML("afterbegin", `<button emoji="${emojiName}" title="${emoji.short_name.replace(/_/g, " ")}"><img src="../images/editor/emojis/twitter32.png" style="object-position: ${-((emoji.sheet_x * sheetSize) + 1)}px ${-((emoji.sheet_y * sheetSize) + 1)}px"></button>`);
    }
    let reactionKeys = Object.keys(cache.reactions);
    for (let i = 0; i < reactionKeys.length; i++) {
      insertReactionButton(reactionKeys[i]);
    }
    emojiButtonSidebar.firstElementChild.setAttribute("selected", "");

    let unknownCount = 0;
    let largestOrder = 0;
    let insertReactionMember = (userid, added) => {
      let member = cache.members[userid];
      let tempSection = emojiMemberSection.querySelector(".eSubToolReactionTempShow");
      if (member == null) {
        unknownCount++;
        tempSection.style.display = "flex";
        let addS = "";
        if (unknownCount > 1) {
          addS = "s";
        }
        tempSection.querySelector("div[titlecount]").innerHTML = `<b>+${unknownCount}</b> Additional Reaction${addS}`;
        return;
      }
      emojiMemberSection.insertAdjacentHTML("afterbegin", `<div class="eSubToolReactionMember" new>
        <div cursor></div>
        <div holder>
          <div name></div>
          <div email></div>
        </div>
      </div>`);
      let newMemberTile = emojiMemberSection.querySelector(".eSubToolReactionMember[new]");
      newMemberTile.removeAttribute("new");
      newMemberTile.setAttribute("collaborator", userid);
      newMemberTile.querySelector("div[cursor]").style.border = "solid 3px " + member.color;
      let name = newMemberTile.querySelector("div[name]");
      name.textContent = member.name;
      name.title = member.name;
      if (member.email != null) {
        let email = newMemberTile.querySelector("div[email]");
        email.textContent = member.email;
        email.title = member.email;
      }
      let order = Math.round(((added ?? getEpoch()) / 2000000000000) * 2147483647);
      if (order > largestOrder) {
        largestOrder = order + 1;
        tempSection.style.order = order;
      }
      newMemberTile.style.order = order;
    }
    let updateReactionView = (noRefresh) => {
      let selected = emojiButtonSidebar.querySelector("button[selected]");
      if (selected == null) {
        return;
      }
      let emoji = selected.getAttribute("emoji");
      let title = emojiObject[emoji].short_name.split("_");
      for (let i = 0; i < title.length; i++) {
        title[i] = title[i].substring(0, 1).toUpperCase() + title[i].substring(1);
      }
      frame.querySelector(".eSubToolReactionMemberTitle div[title]").textContent = title.join(" ");
      unknownCount = 0;
      largestOrder = 0;
      emojiMemberSection.innerHTML = `<div class="eSubToolReactionTempShow">
        <div titlecount></div>
        <div info>Over time, Markify clears out past reaction records.</div>
      </div>`;
      if (this.editor.self.access > 3 && this.editor.utils.isLocked(this.toolbar.getPreferenceTool()) != true) {
        removeReactionButton.style.display = "flex";
      }
      let reactionMembers = cache.reactions[emoji];
      let reactionMembersKeys = Object.keys(reactionMembers);
      for (let i = 0; i < reactionMembersKeys.length; i++) {
        insertReactionMember(reactionMembersKeys[i].split("_")[2], reactionMembers[reactionMembersKeys[i]]);
      }
      
      if (noRefresh != true) {
        this.toolbar.selection.updateActionBar();
      }
    }
    this.redraw = updateReactionView;

    emojiButtonSidebar.addEventListener("click", (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest("button");
      if (button == null) {
        return;
      }
      let selected = emojiButtonSidebar.querySelector("button[selected]");
      if (selected != null) {
        selected.removeAttribute("selected");
      }
      button.setAttribute("selected", "");
      updateReactionView();
    });

    cache.function = (body) => {
      if (frame == null) {
        return;
      }
      if (body.change > 0) {
        let emojiButton = emojiButtonSidebar.querySelector('button[emoji="' + body.reaction.emoji + '"]');
        if (emojiButton == null) {
          insertReactionButton(body.reaction.emoji);
        } else if (emojiButton.hasAttribute("selected") == true) {
          insertReactionMember(body.member._id, body.added);
        }
      } else if (body.change < 0) {
        let emojiButton = emojiButtonSidebar.querySelector('button[emoji="' + body.reaction.emoji + '"]');
        if (emojiButton.hasAttribute("selected") == true) {
          if (body.member._id != null) {
            let emojiMember = emojiMemberSection.querySelector('.eSubToolReactionMember[collaborator="' + body.member._id + '"]');
            if (emojiMember != null) {
              emojiMember.remove();
            }
          } else {
            unknownCount--;
            let titleCount = emojiMemberSection.querySelector(".eSubToolReactionTempShow");
            if (unknownCount > 0) {
              let addS = "";
              if (unknownCount > 1) {
                addS = "s";
              }
              titleCount.querySelector("div[titlecount]").innerHTML = `<b>+${unknownCount}</b> Additional Reaction${addS}`;
              titleCount.style.display = "flex";
            } else {
              titleCount.style.display = "none";
            }
          }
        }
      }
      if (cache.reactions[body.reaction.emoji] == null) {
        let emojiButton = emojiButtonSidebar.querySelector('button[emoji="' + body.reaction.emoji + '"]');
        emojiButton.remove();
        if (emojiButton.hasAttribute("selected") == true && emojiButtonSidebar.firstElementChild != null) {
          emojiButtonSidebar.firstElementChild.setAttribute("selected", "");
          updateReactionView();
        }
      }
      if (Object.keys(this.toolbar.reactionsCache.reactions).length > 0) {
        this.toolbar.selection.updateActionBar();
      } else {
        this.toolbar.selection.closeActionFrame();
      }
    }

    updateReactionView(true);
  }
}