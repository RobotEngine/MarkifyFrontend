import { fixed, sendRequest } from "@/crucial";

import { textColorBackground } from "@modules/editor/utils/text-color-background";

import observeIcon from "@assets/lesson/members/observe.svg?raw";
import exitObserveIcon from "@assets/lesson/members/observeexit.svg?raw";
import spotlightIcon from "@assets/lesson/members/spotlight.svg?raw";
import kickIcon from "@assets/lesson/members/kick.svg?raw";
import { search as searchIcon, close as closeIcon } from "@modules/utility/core-icons";

export class Frame {
  html = `
  <div class="brgMemberHolder">
    <div class="brgMemberSearchHolder">
      <div class="brgMemberSearch">
        <div image>${searchIcon}</div>
        <input placeholder="Search..."></input>
      </div>
    </div>
    <div class="brgMemberMemberHolder">
      <div class="brgMemberAccessHolder" access="owner">
        <button class="brgMemberAccessTitle"><div holder><div title>Owner</div><div count>0</div></div></button>
      </div>
      <div class="brgMemberAccessHolder" access="group">
        <button class="brgMemberAccessTitle"><div holder><div title>Teammates</div><div count>0</div></div></button>
      </div>
      <div class="brgMemberAccessHolder" access="visitor">
        <button class="brgMemberAccessTitle"><div holder><div title>Visitors</div><div count>0</div></div></button>
      </div>
    </div>
  </div>
  `;

  css = {
    ".dropdownTitle .brgMemberCount": `min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeColorRGB), .3); border-radius: 12px; font-weight: 700`,

    ".brgMemberHolder": `width: 275px; max-width: 100%`,
    ".brgMemberSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".brgMemberSearch": `display: flex; width: 100%; align-items: center; border: solid 2px var(--secondary); border-radius: 18px`,
    ".brgMemberSearch div[image]": `width: 24px; height: 24px; margin-left: 4px`,
    ".brgMemberSearch div[image] svg": `width: 100%; height: 100%`,
    ".brgMemberSearch input": `width: 100%; padding: 5px; background: unset; border: unset; outline: unset; color: var(--textColor); font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".brgMemberSearch input::placeholder": `color: var(--secondary)`,

    ".brgMemberMemberHolder": `min-height: 4px`,
    ".brgMemberAccessHolder": `display: none; margin-bottom: 12px; background: var(--pageColor)`,
    ".brgMemberAccessTitle": `position: sticky; display: flex; width: 100%; padding: 0; top: 0px; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 700; font-size: 18px`,
    ".brgMemberAccessTitle div[holder]": `display: flex; width: 100%; padding: 4px 8px; top: 0px; justify-content: space-between; transition: .1s`,
    ".brgMemberAccessTitle div[count]": `margin-left: 6px; font-weight: 500`,
    ".brgMemberAccessTitle:hover div[holder]": `background: var(--hover)`,
    ".brgMemberAccessTitle:active": `transform: scale(1) !important`,
    ".brgMemberAccessTitle:active div[holder]": `background: var(--secondary); color: #fff !important`,
    ".brgMemberAccessHolder[selected] .brgMemberAccessTitle div[holder]": `background: var(--secondary); color: #fff`,

    ".brgMemberTile": `position: relative; display: flex; width: 100%; height: 34px; padding: 0px; justify-content: center; align-items: center; z-index: 1`, //; margin: 4px 0
    ".brgMemberTile[placeholder]": `opacity: .5`,
    ".brgMemberTile div[holder]": `--opacity: 0; position: relative; display: flex; width: 100%; padding: 4px; overflow: hidden; align-items: center; transition: .1s`, //; margin: 4px 0
    ".brgMemberBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: var(--opacity); transition: .1s; z-index: -1`,
    ".brgMemberAccessHolder button:hover div[holder]": `--opacity: .35`,
    ".brgMemberAccessHolder button:hover .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".brgMemberAccessHolder button:active": `transform: scale(1) !important`,
    ".brgMemberAccessHolder button:active div[holder]": `--opacity: 1; color: var(--hoverTextColor); border-radius: 18px; transform: scale(.95)`,
    ".brgMemberAccessHolder button:active .brgMemberCursor": `transform: scale(1.15)`,
    ".brgMemberTile div[holder][selected]": `--opacity: 1 !important; color: var(--hoverTextColor)`,
    ".brgMemberTile div[holder][selected] .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".brgMemberAccessHolder[hover] div[holder]": `--themeColor: var(--secondary) !important; --opacity: .35 !important; color: var(--textColor)`,
    ".brgMemberAccessHolder[hover] .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".brgMemberAccessHolder[active] div[holder]": `--opacity: 1 !important; border-radius: 18px; transform: scale(.95); color: #fff`,
    ".brgMemberAccessHolder[active] .brgMemberCursor": `transform: scale(1.15)`,
    ".brgMemberAccessHolder[selected] div[holder]": `--themeColor: var(--secondary) !important; --opacity: 1 !important; color: #fff`,
    ".brgMemberAccessHolder[selected] .brgMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".brgMemberCursor": `width: 20px; height: 20px; flex-shrink: 0; margin: 0 6px; background: var(--pageColor); border: solid 3px var(--themeColor); overflow: hidden; border-radius: 8px 14px 14px; transition: 0.2s`, //box-shadow: 0 0 6px rgb(0 0 0 / 50%);
    ".brgMemberName": `width: 100%; font-size: 16px; font-weight: 600; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberEvents": `display: flex; margin-left: auto`,
    ".brgMemberEvent": `height: fit-content; padding: 3px 6px; margin: 0 1px 0 6px; border-radius: 12px; color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap`,
    ".brgMemberEvent[self]": `background: var(--theme)`,
    ".brgMemberEvent[idle]": `background: var(--yellow)`,
    ".brgMemberEvent[observe]": `background: var(--purple)`,

    ".brgMemberFrameHolder": `position: absolute; width: 200%; height: fit-content; right: 0px; pointer-events: none; z-index: 0; opacity: 0; transition: top .3s, opacity .3s`,
    ".brgMemberFrame": `--themeColor: var(--theme); position: sticky; width: calc(50% - 4px); max-width: calc(100vw - 20px); left: 8px; top: 8px; margin-left: 4px; pointer-events: all; background: var(--pageColor); border-right: solid 4px var(--themeColor); border-radius: 38px 0 0 12px; transform-origin: top right; transform: scale(0); transition: transform .3s`,
    ".brgMemberFrameContentHolder": `width: 100%; height: 0px; border-radius: 38px 0 0 12px; overflow: hidden`,
    ".brgMemberFrameShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 16px; right: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".brgMemberFrameShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".brgMemberFrameContent": `overflow: auto`,
    ".brgMemberSection": `position: relative; display: flex; width: 100%; justify-content: center; align-items: center`,
    ".brgMemberSectionInfo": `border-radius: 38px 0 0 38px; overflow: hidden`,
    ".brgMemberBackdrop": `position: absolute; display: flex; width: calc(100% + 2px); height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1`,
    ".brgMemberBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(../images/editor/backdrop.svg); background-size: 24px; background-position: center`, //transform: rotate(12deg);
    ".brgMemberFrameCursor": `width: 40px; height: 40px; flex-shrink: 0; margin: 12px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px; transition: 0.2s`,
    ".brgMemberFramePicture": `width: 44px; height: 44px; flex-shrink: 0; margin: 12px; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px; transition: 0.2s`,
    ".brgMemberFrameInfoHolder": `display: flex; flex-direction: column; width: calc(100% - 76px); height: calc(100% - 12px); color: var(--adaptColor); text-align: left`,
    ".brgMemberFrameInfoHolder div[name]": `width: calc(100% - 30px); font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberFrameInfoHolder div[email]": `width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberFrameInfoHolder div[joined]": `font-size: 14px; font-weight: 500; text-align: right; margin: auto 6px 2px 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".brgMemberClose": `position: absolute; width: 22px; height: 22px; top: 4px; right: 0px; margin: 5px 5px 5px 12px; background: var(--pageColor); --borderWidth: 3px; --borderRadius: 14px`,
    ".brgMemberClose svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".brgMemberSectionDesc": `box-sizing: border-box; padding: 12px 12px 0; font-size: 14px`,
    ".brgMemberSectionEvents": `flex-direction: column`,
    ".brgMemberEventHolder": `display: none; width: calc(100% - 24px); margin: 12px 12px 0px; justify-content: space-between; align-items: center`,
    ".brgMemberEventHolder .brgMemberEvent": `margin: 0px 8px 0 0`,
    ".brgMemberEventDesc": `font-size: 14px; text-align: right`,
    ".brgMemberSectionActions": `flex-wrap: wrap; width: calc(100% - 12px); padding: 6px; margin-top: 6px; justify-content: space-around`,
    ".brgMemberSectionActions button": `display: flex; flex-direction: column; width: 86.33px; padding: 6px 12px; align-items: center; border-radius: 14px; color: var(--themeColor); overflow: visible`,
    ".brgMemberSectionActions button div[image]": `width: 55px; height: 55px; transition: .15s`,
    ".brgMemberSectionActions button div[image] svg": `width: 100%; height: 100%`,
    ".brgMemberSectionActions button div[text]": `margin-top: 6px; font-size: 14px; font-weight: 600; white-space: nowrap`,
    ".brgMemberSectionActions button:hover div[image]": `transform: scale(1.15) translateY(-2px)`,
    ".brgMemberSectionActions button:active": `background: var(--themeColor); color: #fff`,
    ".brgMemberSectionActions button:active div[image]": `filter: brightness(0) invert(1); transform: scale(1)`
  };

  js = async function (frame, extra) {
    frame.closest(".dropdownContent").style.padding = "0px";

    let parent = extra.parent;
    let lesson = parent.parent.parent;
    let editor = parent.editor;

    let dropdownTitle = frame.closest(".dropdownOverflow").querySelector(".dropdownTitle");

    let searchHolder = frame.querySelector(".brgMemberSearch");
    let searchField = searchHolder.querySelector("input");
    let accessHolders = frame.querySelectorAll(".brgMemberAccessHolder");

    // Transition group members to format for member list:
    this.members = {};
    let groupMemberModifyIDs = Object.keys(parent.members);
    for (let i = 0; i < groupMemberModifyIDs.length; i++) {
      let modifyID = groupMemberModifyIDs[i];
      let memberIDs = parent.members[modifyID] ?? [];
      if (memberIDs.length > 0) {
        for (let m = 0; m < memberIDs.length; m++) {
          let memberID = memberIDs[m];
          this.members[memberID] = {
            ...(parent.parent.parent.collaborators[modifyID] ?? {}),
            ...(parent.parent.parent.members[memberID] ?? {})
          }
        }
      } else {
        this.members[modifyID] = { ...(parent.parent.parent.collaborators[modifyID] ?? {}), group: parent.group._id, access: 0, placeholder: true };
      }
    }

    let getAccess = (member) => {
      if (member.access > 3) {
        return "owner";
      }
      if (member.group == parent.group._id) {
        return "group";
      }
      if (member.previewGroup == parent.group._id) {
        return "visitor";
      }
    }
    let getSection = (access) => {
      return frame.querySelector('.brgMemberAccessHolder[access="' + access + '"]');
    }
    let updateOrder = (section, updateTile, member) => {
      for (let i = 1; i < section.children.length; i++) { // 1 to skip title
        let child = section.children[i];
        let prev = this.members[child.querySelector("div[holder]").getAttribute("member")] ?? {};
        if (child != updateTile && member.name + "_" + member.joined < prev.name + "_" + prev.joined) {
          section.insertBefore(updateTile, child);
          break;
        } else if (i == section.children.length - 1) {
          section.appendChild(updateTile);
        }
      }
    }
    let addMemberTile = (member) => {
      if (member.name.toLowerCase().includes(searchField.value.toLowerCase()) == false) {
        return;
      }
      let section = getSection(getAccess(member));
      if (section == null) {
        return;
      }
      let title = section.querySelector(".brgMemberAccessTitle");
      section.insertAdjacentHTML("beforeend", `<button class="brgMemberTile"><div holder new>
        <div class="brgMemberBackground"></div>
        <div class="brgMemberCursor"></div>
        <div class="brgMemberName"></div>
        <div class="brgMemberEvents"></div>
      </div></button>`);
      let tile = section.querySelector(".brgMemberTile div[holder][new]");
      tile.removeAttribute("new");
      tile.setAttribute("member", member._id);
      updateOrder(section, tile.parentElement, member);
      tile.style.setProperty("--themeColor", member.color);
      tile.style.setProperty("--hoverTextColor", textColorBackground(member.color));
      tile.querySelector(".brgMemberName").textContent = member.name;
      tile.querySelector(".brgMemberName").title = member.name;
      let eventsHolder = tile.querySelector(".brgMemberEvents");
      if (member._id == editor.sessionID) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" self title="This member is you.">YOU</div>`);
      } else { // Don't show if self:
        if (member.active == false) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
        }
        if (member.observe == editor.sessionID) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
        }
      }
      if (member.placeholder == true) {
        tile.parentElement.setAttribute("placeholder", "");
      }
      title.querySelector("div[count]").textContent = section.childElementCount - 1; // -1 for title
      section.style.display = "block";
    }
    let updateMemberTile = (member) => {
      if (member == null) {
        return false;
      }
      let tile = frame.querySelector('.brgMemberTile div[holder][member="' + member._id + '"]');
      if (tile == null) {
        return false;
      }

      // Handle User / Color Updates:
      tile.style.setProperty("--themeColor", member.color);
      tile.querySelector(".brgMemberName").textContent = member.name;
      tile.querySelector(".brgMemberName").title = member.name;

      // Handle access changes:
      let section = getSection(getAccess(member));
      let oldSection = tile.parentElement.parentElement;
      if (section != oldSection) {
        section.appendChild(tile.parentElement);

        // Update new section:
        section.querySelector(".brgMemberAccessTitle div[count]").textContent = section.childElementCount - 1; // -1 for title
        section.style.display = "block";

        // Update old section:
        let newOldCount = oldSection.childElementCount - 1; // -1 for title
        oldSection.querySelector(".brgMemberAccessTitle div[count]").textContent = newOldCount;
        if (newOldCount < 1) {
          oldSection.style.display = "none";
        }
      }

      // Update order:
      updateOrder(section, tile.parentElement, member);

      // Handle event state:
      if (member._id != editor.sessionID) {
        let eventsHolder = tile.querySelector(".brgMemberEvents");
        let existingIdle = eventsHolder.querySelector(".brgMemberEvent[idle]");
        if (member.active == false) {
          if (existingIdle == null) {
            eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
          }
        } else if (existingIdle != null) {
          existingIdle.remove();
        }
        let existingObserve = eventsHolder.querySelector(".brgMemberEvent[observe]");
        if (member.observe == editor.sessionID) {
          if (existingObserve == null) {
            eventsHolder.insertAdjacentHTML("afterbegin", `<div class="brgMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
          }
        } else if (existingObserve != null) {
          existingObserve.remove();
        }
      }

      // Update member dropdown:
      if (dropdownButton != null) {
        if (dropdownButton.getAttribute("member") == member._id) {
          openDropdown(tile, true);
        } else if (dropdownButton.querySelector("div[title]") != null) {
          openDropdown(dropdownButton, true);
        }
      }

      // Handle placeholder:
      if (member.placeholder != true) {
        tile.removeAttribute("placeholder");
      } else {
        tile.setAttribute("placeholder", "");
      }
      
      return true;
    }
    let createMemberList = (search) => {
      search = (search ?? "").toLowerCase();
      let keys = Object.keys(this.members);
      keys = keys.filter((value) => {
        if (this.members[value].name.toLowerCase().includes(search) == true) {
          return -1;
        }
        return false;
      });
      for (let i = 0; i < keys.length; i++) {
        addMemberTile(this.members[keys[i]]);
      }
    }
    createMemberList();
    
    let dropdown;
    let memberFrameHolder;
    let dropdownButton;

    let handleLeave = (body) => {
      delete this.members[body._id];
      let removeTileContent = frame.querySelector('.brgMemberTile div[holder][member="' + body._id + '"]');
      if (removeTileContent != null) {
        let removeTile = removeTileContent.parentElement;
        let title = removeTile.parentElement.querySelector("div[count]");
        let newCount = removeTile.parentElement.childElementCount - 2; // -2 for title and tile
        title.textContent = newCount;
        if (newCount < 1) {
          removeTile.parentElement.style.display = "none";
        }
        if ((dropdownButton != null && dropdownButton.getAttribute("member") == body._id) || (newCount < 1 && removeTile.parentElement.hasAttribute("selected"))) {
          closeDropdown();
        }
        removeTile.remove();
      }
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
      if (body.member != null) {
        let memberSessions = parent.members[body.member.modify];
        if (memberSessions != null && memberSessions.length < 1 && body.member.group == parent.group._id) {
          this.members[body.member.modify] = { ...(parent.parent.parent.collaborators[body.member.modify] ?? {}), group: parent.group._id, access: 0, placeholder: true };
          return handleJoin(this.members[body.member.modify]);
        }
      }
    }
    let handleJoin = (body) => {
      if (body.group != parent.group._id && body.previewGroup != parent.group._id) {
        return;
      }
      this.members[body._id] = body;
      if (this.members[body.modify] != null) {
        handleLeave({ _id: body.modify });
      }
      if (updateMemberTile(this.members[body._id]) == false) {
        addMemberTile(this.members[body._id]);
      }
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    }
    editor.pipeline.subscribe("membersDropdownJoin", "join", handleJoin, { sort: 2 });
    editor.pipeline.subscribe("membersDropdownLeave", "leave", handleLeave, { sort: 2 });
    editor.pipeline.subscribe("membersDropdownUpdate", "update", (body) => {
      let member = this.members[body._id];
      if (body.hasOwnProperty("group") == true || body.hasOwnProperty("previewGroup") == true) {
        if (body.group == parent.group._id || body.previewGroup == parent.group._id) {
          this.members[body._id] = parent.parent.parent.members[body._id];
          return handleJoin(this.members[body._id]);
        } else {
          delete this.members[body._id];
          return handleLeave(body);
        }
      }
      updateMemberTile(member);
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    }, { sort: 2 });
    editor.pipeline.subscribe("membersDropdownAssign", "memberassign", (body) => {
      let member = parent.members[body.collaborator._id];
      if (body.group == parent.group._id) {
        if (member.length < 1) {
          this.members[body.collaborator._id] = { ...body.collaborator, group: parent.group._id, access: 0, placeholder: true };
          return handleJoin(this.members[body.collaborator._id]);
        }
      } else {
        delete this.members[body.collaborator._id];
        return handleLeave({ _id: body.collaborator._id });
      }
    }, { sort: 2 });

    let updateDropdownPosition = () => {
      if (memberFrameHolder == null) {
        return;
      }
      if (dropdownButton == null) {
        dropdown.style.borderTopLeftRadius = "12px";
        dropdown.style.borderBottomLeftRadius = "12px";
        return;
      }
      let dropdownRect = dropdown.getBoundingClientRect();
      let buttonRect = dropdownButton.closest("button").getBoundingClientRect();
      
      let contentFrame = memberFrameHolder.querySelector(".brgMemberFrame");
      let contentHolderFrameHolder = contentFrame.querySelector(".brgMemberFrameContentHolder");
      let contentFrameHolder = contentFrame.querySelector(".brgMemberFrameContent");
      
      let contentHeight = contentFrameHolder.scrollHeight;

      contentFrameHolder.style.maxHeight = "calc(" + (fixed.offsetHeight - dropdownRect.top) + "px - var(--floatMargin))";
      
      contentHolderFrameHolder.style.height = contentFrameHolder.offsetHeight + "px";
      contentHolderFrameHolder.offsetHeight;
      contentHolderFrameHolder.style.transition = "height .3s";

      let setTop = buttonRect.top - dropdownRect.top;
      if (buttonRect.top < dropdownRect.top) {
        setTop = 0;
      }
      if (setTop < dropdownRect.top) { // Above dropdown:
        setTop = 0;
      }
      let dropdownMargin = parseInt(window.getComputedStyle(dropdown).getPropertyValue("--floatMargin"));
      if (buttonRect.top + contentHeight > fixed.offsetHeight - dropdownRect.top - dropdownMargin) { // Below dropdown:
        setTop = fixed.offsetHeight - contentFrameHolder.offsetHeight - dropdownRect.top - dropdownMargin;
      }
      memberFrameHolder.style.top = setTop + "px";
      
      if (setTop < dropdownRect.top) { // Top border radius:
        dropdown.style.borderTopLeftRadius = "0px";
      } else {
        dropdown.style.borderTopLeftRadius = "12px";
      }
      if (setTop + contentFrameHolder.offsetHeight > dropdownRect.top + dropdown.offsetHeight - 20) { // Bottom border radius:
        dropdown.style.borderBottomLeftRadius = "0px";
      } else {
        dropdown.style.borderBottomLeftRadius = "12px";
      }
    }
    editor.pipeline.subscribe("membersDropdownResize", "resize", updateDropdownPosition);
    frame.closest(".dropdownContent").addEventListener("scroll", updateDropdownPosition);

    let closeDropdown = async () => {
      if (memberFrameHolder == null) {
        return;
      }
      if (dropdownButton != null) {
        dropdownButton.removeAttribute("selected");
        if (dropdownButton.parentElement != null) {
          dropdownButton.parentElement.removeAttribute("selected");
        }
        dropdownButton = null;
      }
      memberFrameHolder.style.opacity = 0;
      let frame = memberFrameHolder.querySelector(".brgMemberFrame");
      frame.querySelector(".brgMemberFrameContentHolder").style.removeProperty("transition");
      frame.style.width = frame.clientWidth + "px";
      frame.style.transform = "scale(0)";
      updateDropdownPosition();
    }

    let observeButton;
    let spotlightButton;
    let kickButton;

    let openDropdown = (tile, update) => {
      let member = {};
      if (tile.parentElement.className == "brgMemberTile") {
        member = this.members[tile.getAttribute("member")];
        if (member == null) {
          tile.remove();
          return;
        }
      } else {
        member = { title: true, name: tile.querySelector("div[title]").textContent, access: tile.closest(".brgMemberAccessHolder").getAttribute("access"), color: "var(--secondary)" };
      }
      if (dropdownButton != null) {
        if (dropdownButton == tile && update != true) {
          closeDropdown();
          return;
        } else {
          dropdownButton.removeAttribute("selected");
          if (dropdownButton.parentElement != null) {
            dropdownButton.parentElement.removeAttribute("selected");
          }
        }
      }
      dropdownButton = tile;
      if (member.title == null) {
        dropdownButton.setAttribute("selected", "");
      } else {
        dropdownButton.parentElement.setAttribute("selected", "");
      }
      dropdown = frame.closest(".dropdown");
      memberFrameHolder = dropdown.querySelector(".brgMemberFrameHolder");

      let observeButtonUpdate = () => {
        let memberFrame = memberFrameHolder.querySelector(".brgMemberFrame");
        let button = memberFrame.querySelector(".brgMemberSectionActions button[observe]");
        let member = this.members[memberFrame.getAttribute("memberid")];
        if (member == null) {
          return;
        }
        let obvImg = observeIcon;
        let obvText = "Observe";
        let obvDesc = "Watch this member's screen.";
        if (editor.realtime.observing == member._id) {
          obvImg = exitObserveIcon;
          obvText = "Exit";
          obvDesc = "Stop watching this member's screen."
        }
        let imageHolder = button.querySelector("div[image]");
        imageHolder.innerHTML = "<div>" + obvImg + "</div>";
        button.querySelector("div[text]").textContent = obvText;
        button.title = obvDesc;
        if (member.weak != true && lesson.signalStrength > 2 && member.observe == null) {
          observeButton.style.opacity = 1;
        } else {
          observeButton.style.opacity = .5;
        }
      }
      editor.pipeline.subscribe("membersDropdownObserveEnable", "observe_enable", observeButtonUpdate);
      editor.pipeline.subscribe("membersDropdownObserveExit", "observe_exit", observeButtonUpdate);

      this.checkSpotlightUpdate = (fromSelf) => {
        // DISABLED FOR NOW:
        observeButton.style.display = "none";
        spotlightButton.style.display = "none";
        return;

        let member = this.members[memberFrame.getAttribute("memberid")] ?? {};
        let wasShown = spotlightButton.hasAttribute("shown");
        if (member._id == editor.sessionID && member.access > 3 && lesson.memberCount > 1) {
          spotlightButton.style.display = "flex";
          if (fromSelf != true && wasShown == false) {
            spotlightButton.setAttribute("shown", "");
            updateDropdownPosition();
          }
        } else {
          spotlightButton.style.display = "none";
          if (fromSelf != true && wasShown == true) {
            spotlightButton.removeAttribute("shown");
            updateDropdownPosition();
          }
        }
        if (lesson.signalStrength > 2) {
          spotlightButton.style.opacity = 1;
        } else {
          spotlightButton.style.opacity = .5;
        }
      }

      if (memberFrameHolder == null) {
        dropdown.insertAdjacentHTML("beforeend", `<div class="brgMemberFrameHolder">
        <div class="brgMemberFrame">
          <div class="brgMemberFrameShadow"></div>
          <div class="brgMemberFrameContentHolder">
            <div class="brgMemberFrameContent">
              <div class="brgMemberSection brgMemberSectionInfo">
                <div class="brgMemberBackdrop"><div></div></div>
                <div class="brgMemberFrameCursor"></div>
                <img class="brgMemberFramePicture">
                <div class="brgMemberFrameInfoHolder">
                  <div name></div>
                  <div email></div>
                </div>
                <button class="brgMemberClose buttonAnim border">${closeIcon}</button>
              </div>
              <div class="brgMemberSection brgMemberSectionDesc"></div>
              <div class="brgMemberSection brgMemberSectionEvents">
                <div class="brgMemberEventHolder" self>
                  <div class="brgMemberEvent" self>YOU</div>
                  <div class="brgMemberEventDesc">This is your profile.</div>
                </div>
                <div class="brgMemberEventHolder" idle>
                  <div class="brgMemberEvent" idle>IDLE</div>
                  <div class="brgMemberEventDesc">They're currently viewing another window.</div>
                </div>
                <div class="brgMemberEventHolder" observe>
                  <div class="brgMemberEvent" observe>OBSERVE</div>
                  <div class="brgMemberEventDesc">They're following you around the lesson.</div>
                </div>
              </div>
              <div class="brgMemberSection brgMemberSectionActions">
                <button observe style="--themeColor: var(--purple)">
                  <div image></div>
                  <div text>Observe</div>
                </button>
                <button spotlight style="--themeColor: var(--purple)" title="Bring members to your location.">
                  <div image>${spotlightIcon}</div>
                  <div text>Spotlight</div>
                </button>
                <button kick style="--themeColor: var(--error)" title="Revoke all viewing and editing privileges.">
                  <div image>${kickIcon}</div>
                  <div text>Kick</div>
                </button>
              </div>
            </div>
          </div>
        </div></div>`);
        memberFrameHolder = dropdown.querySelector(".brgMemberFrameHolder");
        let closeButton = memberFrameHolder.querySelector(".brgMemberClose");
        closeButton.addEventListener("click", closeDropdown);
        memberFrameHolder.offsetHeight;

        observeButton = memberFrameHolder.querySelector(".brgMemberSectionActions button[observe]");
        spotlightButton = memberFrameHolder.querySelector(".brgMemberSectionActions button[spotlight]");
        kickButton = memberFrameHolder.querySelector(".brgMemberSectionActions button[kick]");

        observeButton.addEventListener("click", async (event) => {
          let memberid = event.target.closest(".brgMemberFrame").getAttribute("memberid");
          if (editor.realtime.observing == memberid) {
            return editor.exitObserve();
          }
          let member = this.members[memberid];
          if (member == null) {
            return this.close();
          }
          if (lesson.signalStrength < 3) {
            return editor.openAlert("error", `<b>Unable to Connect</b>Your connection is too weak to watch their screen.`);
          }
          if (member.observe != null) {
            return editor.openAlert("error", `<b>Unable to Connect</b>This member is observing someone else.`);
          }
          if (member.weak == true) {
            return editor.openAlert("error", `<b>Unable to Connect</b>${member.name} has too weak of a connection to watch their screen.`);
          }
          observeButton.setAttribute("disabled", "");
          let prevObserve = editor.realtime.observing;
          editor.realtime.observing = memberid;
          editor.setShortSub(editor.visibleChunks);
          editor.closeAlert(editor.realtime.observeLoading);
          clearTimeout(editor.realtime.observeTimeout);
          let [code] = await sendRequest("GET", "lessons/members/observe?member=" + memberid, null, { session: editor.session });
          if (code == 200) {
            editor.realtime.observeLoading = await editor.openAlert("info", `<b>Connecting to Member</b>Connecting to ${member.name}'s screen to observe!`, { time: "never" });
            editor.realtime.observeTimeout = setTimeout(() => {
              editor.closeAlert(editor.realtime.observeLoading);
              editor.openAlert("error", `<b>Observe Timeout</b>Failed to connect to their screen, please try again later...`);
              editor.exitObserve();
            }, 10000);
          } else {
            if (prevObserve != null) {
              editor.realtime.observing = prevObserve;
              editor.exitObserve();
            }
            editor.realtime.observing = null;
            editor.setShortSub(editor.visibleChunks);
          }
          observeButton.removeAttribute("disabled");
        });
  
        spotlightButton.addEventListener("click", async (event) => {
          let memberid = event.target.closest(".brgMemberFrame").getAttribute("memberid");
          let member = this.members[memberid];
          if (member == null) {
            return this.close();
          }
          if (lesson.signalStrength < 3) {
            return editor.openAlert("error", `<b>Unable to Connect</b>Your connection is too weak to use spotlight.`);
          }
          if (editor.realtime.observing != null) {
            editor.exitObserve();
          }
          spotlightButton.setAttribute("disabled", "");
          editor.openAlert("info", `<b>Spotlight</b>Letting members know about the spotlight...`);
          await sendRequest("GET", "lessons/members/observe/spotlight?member=" + memberid, null, { session: editor.session });
          spotlightButton.removeAttribute("disabled");
        });
  
        kickButton.addEventListener("click", async (event) => {
          kickButton.setAttribute("disabled", "");
          let frame = event.target.closest(".brgMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let url = "lessons/members/kick";
          if (memberid != null) {
            url += "?collaborator=" + this.members[memberid].modify;
          } else {
            url += "?permaccess=" + frame.getAttribute("access");
          }
          let [code] = await sendRequest("DELETE", url, null, { session: editor.session });
          if (code == 200) {
            closeDropdown();
          }
          kickButton.removeAttribute("disabled");
        });
      }

      let memberFrame = memberFrameHolder.querySelector(".brgMemberFrame");
      if (member.title == null) {
        memberFrame.setAttribute("memberid", member._id);
        memberFrame.removeAttribute("access");
        memberFrame.style.setProperty("--adaptColor", textColorBackground(member.color));
      } else {
        memberFrame.setAttribute("access", getAccess(member));
        memberFrame.removeAttribute("memberid");
        memberFrame.style.setProperty("--adaptColor", "#fff");
      }
      memberFrame.style.setProperty("--themeColor", member.color);
      memberFrame.style.removeProperty("width");

      let cursor = memberFrameHolder.querySelector(".brgMemberFrameCursor");
      let picture = memberFrameHolder.querySelector(".brgMemberFramePicture");
      if (member.image == null) {
        picture.style.display = "none";
        cursor.style.display = "unset";
      } else {
        cursor.style.display = "none";
        picture.src = member.image;
        picture.style.display = "unset";
      }
      let name = memberFrameHolder.querySelector(".brgMemberFrameInfoHolder div[name]");
      name.textContent = member.name;
      name.title = member.name;
      let email = memberFrameHolder.querySelector(".brgMemberFrameInfoHolder div[email]");
      if (member.email) {
        email.textContent = member.email;
        email.title = member.email;
        email.style.display = "unset";
      } else {
        email.style.display = "none";
      }

      let frameDesc = memberFrameHolder.querySelector(".brgMemberSectionDesc");
      if (member.title != null) {
        switch (member.access) {
          case "group":
            frameDesc.textContent = "This is a member of the team.";
            break;
          case "visitor":
            frameDesc.textContent = "Members who are checking out the team's work.";
            break;
          case "owner":
            frameDesc.textContent = "The owner has full access to all aspects of the lesson.";
        }
        frameDesc.style.display = "block";
      } else {
        frameDesc.style.display = "none";
      }

      let isSelf = member._id == editor.sessionID;
      let self = memberFrameHolder.querySelector(".brgMemberEventHolder[self]");
      let idle = memberFrameHolder.querySelector(".brgMemberEventHolder[idle]");
      let observe = memberFrameHolder.querySelector(".brgMemberEventHolder[observe]");
      if (isSelf == true) {
        self.style.display = "flex";
      } else {
        self.style.display = "none";
      }
      if (member.active == false && isSelf == false) {
        idle.style.display = "flex";
      } else {
        idle.style.display = "none";
      }
      observeButtonUpdate();
      if (member.observe == editor.sessionID && isSelf == false) {
        observe.style.display = "flex";
      } else {
        observe.style.display = "none";
      }
      observeButton.removeAttribute("disabled");
      kickButton.removeAttribute("disabled");

      if (isSelf == false && editor.self.access > 3 && member.access < 4 && member.placeholder != true) {
        kickButton.style.display = "flex";
      } else {
        kickButton.style.display = "none";
      }
      if (isSelf == false && member.title == null && (member.access > 0 || lesson.lesson.settings.observeViewers != false || editor.self.access > 3) && member.placeholder != true) {
        observeButton.style.display = "flex";
      } else {
        observeButton.style.display = "none";
      }
      this.checkSpotlightUpdate(true);
      memberFrameHolder.style.opacity = 1;
      memberFrame.style.transform = "scale(1)";
      updateDropdownPosition();
    }

    frame.addEventListener("click", (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let memberTile = element.closest(".brgMemberTile") ?? element.closest(".brgMemberAccessTitle");
      if (memberTile != null) {
        if (memberTile.className == "brgMemberTile") {
          memberTile = memberTile.querySelector("div[holder]");
        }
        return openDropdown(memberTile);
      }
    });

    for (let i = 0; i < accessHolders.length; i++) {
      let holder = accessHolders[i];
      let title = holder.querySelector(".brgMemberAccessTitle");
      title.addEventListener("mouseenter", function() {
        holder.setAttribute("hover", "");
      });
      title.addEventListener("mouseleave", function() {
        holder.removeAttribute("hover");
        holder.removeAttribute("active");
      });
      title.addEventListener("mousedown", function() {
        holder.setAttribute("active", "");
      });
      title.addEventListener("mouseup", function() {
        holder.removeAttribute("active");
      });
    }

    searchField.addEventListener("input", () => {
      closeDropdown();
      
      let clearTiles = frame.querySelectorAll(".brgMemberTile");
      for (let i = 0; i < clearTiles.length; i++) {
        if (clearTiles[i].parentElement.childElementCount < 3) { // 3 to account for title and removed tile
          clearTiles[i].parentElement.style.display = "none";
        }
        clearTiles[i].remove();
      }

      createMemberList(searchField.value);
    });
  }
}