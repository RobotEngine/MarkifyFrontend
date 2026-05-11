import { fixed, sendRequest } from "@/crucial";

import { textColorBackground } from "@modules/editor/utils/text-color-background";

import editorIcon from "@assets/lesson/share/editor.svg?raw";
import viewerIcon from "@assets/lesson/share/viewer.svg?raw";
import observeIcon from "@assets/lesson/members/observe.svg?raw";
import exitObserveIcon from "@assets/lesson/members/observeexit.svg?raw";
import spotlightIcon from "@assets/lesson/members/spotlight.svg?raw";
import lowerHandIcon from "@assets/lesson/members/lowerhand.svg?raw";
import kickIcon from "@assets/lesson/members/kick.svg?raw";
import { search as searchIcon, close as closeIcon } from "@modules/utility/core-icons";

export class Frame {
  html = `
  <div class="eMemberHolder">
    <div class="eMemberSearchHolder">
      <div class="eMemberSearch">
        <div image>${searchIcon}</div>
        <input placeholder="Search..."></input>
      </div>
    </div>
    <div class="eMemberMemberHolder">
      <div class="eMemberAccessHolder" access="5">
        <button class="eMemberAccessTitle"><div holder><div title>Owner</div><div count>0</div></div></button>
      </div>
      <div class="eMemberAccessHolder" access="1">
        <button class="eMemberAccessTitle"><div holder><div title>Editors</div><div count>0</div></div></button>
      </div>
      <div class="eMemberAccessHolder" access="0">
        <button class="eMemberAccessTitle"><div holder><div title>Viewers</div><div count>0</div></div></button>
      </div>
    </div>
  </div>
  `;
  css = {
    ".dropdownTitle span[membercount]": `display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeColorRGB), .3); border-radius: 12px; font-weight: 700`,

    ".eMemberHolder": `width: 275px; max-width: 100%`,
    ".eMemberSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".eMemberSearch": `display: flex; width: 100%; align-items: center; border: solid 2px var(--secondary); border-radius: 18px`,
    ".eMemberSearch div[image]": `width: 24px; height: 24px; margin-left: 4px`,
    ".eMemberSearch div[image] svg": `width: 100%; height: 100%`,
    ".eMemberSearch input": `width: 100%; padding: 5px; background: unset; border: unset; outline: unset; color: var(--textColor); font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eMemberSearch input::placeholder": `color: var(--secondary)`,

    ".eMemberMemberHolder": `min-height: 4px`,
    ".eMemberAccessHolder": `display: none; margin-bottom: 12px; background: var(--pageColor)`,
    ".eMemberAccessTitle": `position: sticky; display: flex; width: 100%; padding: 0; top: 0px; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 700; font-size: 18px`,
    ".eMemberAccessTitle div[holder]": `display: flex; width: 100%; padding: 4px 8px; top: 0px; justify-content: space-between; transition: .1s`,
    ".eMemberAccessTitle div[count]": `margin-left: 6px; font-weight: 500`,
    ".eMemberAccessTitle:hover div[holder]": `background: var(--hover)`,
    ".eMemberAccessTitle:active": `transform: scale(1) !important`,
    ".eMemberAccessTitle:active div[holder]": `background: var(--secondary); color: #fff !important`,
    ".eMemberAccessHolder[selected] .eMemberAccessTitle div[holder]": `background: var(--secondary); color: #fff`,

    ".eMemberTile": `position: relative; display: flex; width: 100%; height: 34px; padding: 0px; justify-content: center; align-items: center; z-index: 1`, //; margin: 4px 0
    ".eMemberTile div[holder]": `--opacity: 0; position: relative; display: flex; width: 100%; padding: 4px; overflow: hidden; align-items: center; transition: .1s`, //; margin: 4px 0
    ".eMemberBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: var(--opacity); transition: .1s; z-index: -1`,
    ".eMemberAccessHolder button:hover div[holder]": `--opacity: .35`,
    ".eMemberAccessHolder button:hover .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberAccessHolder button:active": `transform: scale(1) !important`,
    ".eMemberAccessHolder button:active div[holder]": `--opacity: 1; color: var(--hoverTextColor); border-radius: 18px; transform: scale(.95)`,
    ".eMemberAccessHolder button:active .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberTile div[holder][selected]": `--opacity: 1 !important; color: var(--hoverTextColor)`,
    ".eMemberTile div[holder][selected] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".eMemberAccessHolder[hover] div[holder]": `--themeColor: var(--secondary) !important; --opacity: .35 !important; color: var(--textColor)`,
    ".eMemberAccessHolder[hover] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberAccessHolder[active] div[holder]": `--opacity: 1 !important; border-radius: 18px; transform: scale(.95); color: #fff`,
    ".eMemberAccessHolder[active] .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberAccessHolder[selected] div[holder]": `--themeColor: var(--secondary) !important; --opacity: 1 !important; color: #fff`,
    ".eMemberAccessHolder[selected] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".eMemberCursor": `width: 20px; height: 20px; flex-shrink: 0; margin: 0 6px; background: var(--pageColor); border: solid 3px var(--themeColor); overflow: hidden; border-radius: 8px 14px 14px; transition: 0.2s`, //box-shadow: 0 0 6px rgb(0 0 0 / 50%);
    ".eMemberName": `width: 100%; font-size: 16px; font-weight: 600; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberEvents": `display: flex; margin-left: auto`,
    ".eMemberEvent": `height: fit-content; padding: 3px 6px; margin: 0 1px 0 6px; border-radius: 12px; color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap`,
    ".eMemberEvent[self]": `background: var(--theme)`,
    ".eMemberEvent[hand]": `background: var(--green)`,
    ".eMemberEvent[idle]": `background: var(--yellow)`,
    ".eMemberEvent[observe]": `background: var(--purple)`,

    ".eMemberFrameHolder": `position: absolute; width: 200%; height: fit-content; right: 0px; pointer-events: none; z-index: 0; opacity: 0; transition: top .3s, opacity .3s`,
    ".eMemberFrame": `--themeColor: var(--theme); position: sticky; width: calc(50% - 4px); max-width: calc(100vw - 20px); left: 8px; top: 8px; margin-left: 4px; pointer-events: all; background: var(--pageColor); border-right: solid 4px var(--themeColor); border-radius: 38px 0 0 12px; transform-origin: top right; transform: scale(0); transition: transform .3s`,
    ".eMemberFrameContentHolder": `width: 100%; height: 0px; border-radius: 38px 0 0 12px; overflow: hidden`,
    ".eMemberFrameShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 16px; right: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eMemberFrameShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eMemberFrameContent": `overflow: auto`,
    ".eMemberSection": `position: relative; display: flex; width: 100%; justify-content: center; align-items: center`,
    ".eMemberSectionInfo": `border-radius: 38px 0 0 38px; overflow: hidden`,
    ".eMemberBackdrop": `position: absolute; display: flex; width: calc(100% + 2px); height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1`,
    ".eMemberBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(../images/editor/backdrop.svg); background-size: 24px; background-position: center`, //transform: rotate(12deg);
    ".eMemberFrameCursor": `width: 40px; height: 40px; flex-shrink: 0; margin: 12px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px; transition: 0.2s`,
    ".eMemberFramePicture": `width: 44px; height: 44px; flex-shrink: 0; margin: 12px; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px; transition: 0.2s`,
    ".eMemberFrameInfoHolder": `display: flex; flex-direction: column; width: calc(100% - 76px); height: calc(100% - 12px); color: var(--adaptColor); text-align: left`,
    ".eMemberFrameInfoHolder div[name]": `width: calc(100% - 30px); font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberFrameInfoHolder div[email]": `width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberFrameInfoHolder div[joined]": `font-size: 14px; font-weight: 500; text-align: right; margin: auto 6px 2px 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberClose": `position: absolute; width: 22px; height: 22px; top: 4px; right: 0px; margin: 5px 5px 5px 12px; background: var(--pageColor); --borderWidth: 3px; --borderRadius: 14px`,
    ".eMemberClose svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eMemberSectionDesc": `box-sizing: border-box; padding: 12px 12px 0; font-size: 14px`,
    ".eMemberSectionEvents": `flex-direction: column`,
    ".eMemberEventHolder": `display: none; width: calc(100% - 24px); margin: 12px 12px 0px; justify-content: space-between; align-items: center`,
    ".eMemberEventHolder .eMemberEvent": `margin: 0px 8px 0 0`,
    ".eMemberEventDesc": `font-size: 14px; text-align: right`,
    ".eMemberSectionActions": `flex-wrap: wrap; width: calc(100% - 12px); padding: 6px; margin-top: 6px; justify-content: space-around`,
    ".eMemberSectionActions button": `display: flex; flex-direction: column; width: 86.33px; padding: 6px 12px; align-items: center; border-radius: 14px; color: var(--themeColor); overflow: visible`,
    ".eMemberSectionActions button div[image]": `width: 55px; height: 55px; transition: .15s`,
    ".eMemberSectionActions button div[image] svg": `width: 100%; height: 100%`,
    ".eMemberSectionActions button div[text]": `margin-top: 6px; font-size: 14px; font-weight: 600; white-space: nowrap`,
    ".eMemberSectionActions button:hover div[image]": `transform: scale(1.15) translateY(-2px)`,
    ".eMemberSectionActions button:active": `background: var(--themeColor); color: #fff`,
    ".eMemberSectionActions button:active div[image]": `filter: brightness(0) invert(1); transform: scale(1)`
  };
  js(frame, extra) {
    frame.closest(".dropdownContent").style.padding = "0px";

    let parent = extra.parent;
    let lesson = parent.parent;
    let editor = extra.editor;

    let dropdownTitle = frame.closest(".dropdownOverflow").querySelector(".dropdownTitle");

    let searchHolder = frame.querySelector(".eMemberSearch");
    let searchField = searchHolder.querySelector("input");
    let accessHolders = frame.querySelectorAll(".eMemberAccessHolder");

    let getSection = (access) => {
      return frame.querySelector('.eMemberAccessHolder[access="' + access + '"]');
    }
    let updateOrder = (section, updateTile, member) => {
      for (let i = 1; i < section.children.length; i++) { // 1 to skip title
        let child = section.children[i];
        let prev = lesson.members[child.querySelector("div[holder]").getAttribute("member")] ?? {};
        if (member.hand == null) {
          if (child != updateTile && member.name + "_" + member.joined < prev.name + "_" + prev.joined && prev.hand == null) {
            section.insertBefore(updateTile, child);
            break;
          } else if (i == section.children.length - 1) {
            section.appendChild(updateTile);
          }
        } else {
          if (child != updateTile && (member.hand < prev.hand || prev.hand == null)) {
            section.insertBefore(updateTile, child);
            break;
          } else if (i == section.children.length - 1) {
            section.appendChild(updateTile);
          }
        }
      }
    }
    let addMemberTile = (member) => {
      if (member.name.toLowerCase().includes(searchField.value.toLowerCase()) == false) {
        return;
      }
      let section = getSection(member.access);
      if (section == null) {
        return;
      }
      let title = section.querySelector(".eMemberAccessTitle");
      section.insertAdjacentHTML("beforeend", `<button class="eMemberTile"><div holder new>
        <div class="eMemberBackground"></div>
        <div class="eMemberCursor"></div>
        <div class="eMemberName"></div>
        <div class="eMemberEvents"></div>
      </div></button>`);
      let tile = section.querySelector(".eMemberTile div[holder][new]");
      tile.removeAttribute("new");
      tile.setAttribute("member", member._id);
      updateOrder(section, tile.parentElement, member);
      tile.style.setProperty("--themeColor", member.color);
      tile.style.setProperty("--hoverTextColor", textColorBackground(member.color));
      let memberName = tile.querySelector(".eMemberName");
      memberName.textContent = member.name;
      memberName.title = member.name;
      let eventsHolder = tile.querySelector(".eMemberEvents");
      if (member._id == editor.sessionID) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" self title="This member is you.">YOU</div>`);
      } else { // Don't show if self:
        if (member.active == false) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
        }
        if (member.observe == editor.sessionID) {
          eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
        }
      }
      if (member.hand != null) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" hand title="This member is asking to contribute to the lesson.">HAND</div>`);
      }
      title.querySelector("div[count]").textContent = section.childElementCount - 1; // -1 for title
      section.style.display = "block";
    }
    let updateMemberTile = (member) => {
      if (member == null) {
        return false;
      }
      let tile = frame.querySelector('.eMemberTile div[holder][member="' + member._id + '"]');
      if (tile == null) {
        return false;
      }

      // Handle User / Color Updates:
      tile.style.setProperty("--themeColor", member.color);
      tile.querySelector(".eMemberName").textContent = member.name;
      tile.querySelector(".eMemberName").title = member.name;

      // Handle access changes:
      let section = getSection(member.access);
      let oldSection = tile.parentElement.parentElement;
      if (section != oldSection) {
        section.appendChild(tile.parentElement);

        // Update new section:
        section.querySelector(".eMemberAccessTitle div[count]").textContent = section.childElementCount - 1; // -1 for title
        section.style.display = "block";

        // Update old section:
        let newOldCount = oldSection.childElementCount - 1; // -1 for title
        oldSection.querySelector(".eMemberAccessTitle div[count]").textContent = newOldCount;
        if (newOldCount < 1) {
          oldSection.style.display = "none";
        }
      }

      // Update order:
      updateOrder(section, tile.parentElement, member);

      // Handle event state:
      if (member._id != editor.sessionID) {
        let eventsHolder = tile.querySelector(".eMemberEvents");
        let existingHand = eventsHolder.querySelector(".eMemberEvent[hand]");
        if (member.hand != null) {
          if (existingHand == null) {
            eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" hand title="This member is asking to contribute to the lesson.">HAND</div>`);
          }
        } else if (existingHand != null) {
          existingHand.remove();
        }
        let existingIdle = eventsHolder.querySelector(".eMemberEvent[idle]");
        if (member.active == false) {
          if (existingIdle == null) {
            eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" idle title="This member is currently viewing a different window.">IDLE</div>`);
          }
        } else if (existingIdle != null) {
          existingIdle.remove();
        }
        let existingObserve = eventsHolder.querySelector(".eMemberEvent[observe]");
        if (member.observe == editor.sessionID) {
          if (existingObserve == null) {
            eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" observe title="This member is observing you on the document.">OBSERVE</div>`);
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
      
      return true;
    }
    let createMemberList = (search) => {
      search = (search ?? "").toLowerCase();
      let keys = Object.keys(lesson.members);
      keys = keys.filter((value) => {
        if (lesson.members[value].name.toLowerCase().includes(search) == true) {
          return -1;
        }
        return false;
      });
      for (let i = 0; i < keys.length; i++) {
        addMemberTile(lesson.members[keys[i]]);
      }
    }
    createMemberList();
    
    let dropdown;
    let memberFrameHolder;
    let dropdownButton;

    editor.pipeline.subscribe("membersDropdownJoin", "join", (body) => {
      if (updateMemberTile(lesson.members[body._id]) == false) {
        addMemberTile(lesson.members[body._id]);
      }
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    });
    editor.pipeline.subscribe("membersDropdownLeave", "leave", (body) => {
      let removeTileContent = frame.querySelector('.eMemberTile div[holder][member="' + body._id + '"]');
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
    });
    editor.pipeline.subscribe("membersDropdownUpdate", "update", (body) => {
      updateMemberTile(lesson.members[body._id]);
      parent.updateMemberCount(dropdownTitle);
      if (this.checkSpotlightUpdate != null) {
        this.checkSpotlightUpdate();
      }
    });

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
      
      let contentFrame = memberFrameHolder.querySelector(".eMemberFrame");
      let contentHolderFrameHolder = contentFrame.querySelector(".eMemberFrameContentHolder");
      let contentFrameHolder = contentFrame.querySelector(".eMemberFrameContent");
      
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
      let frame = memberFrameHolder.querySelector(".eMemberFrame");
      frame.querySelector(".eMemberFrameContentHolder").style.removeProperty("transition");
      frame.style.width = frame.clientWidth + "px";
      frame.style.transform = "scale(0)";
      updateDropdownPosition();
    }

    let editorButton;
    let handButton;
    let observeButton;
    let spotlightButton;
    let kickButton;

    let openDropdown = (tile, update) => {
      let member = {};
      if (tile.parentElement.className == "eMemberTile") {
        member = lesson.members[tile.getAttribute("member")];
        if (member == null) {
          tile.remove();
          return;
        }
      } else {
        member = { title: true, name: tile.querySelector("div[title]").textContent, access: parseInt(tile.closest(".eMemberAccessHolder").getAttribute("access")), color: "var(--secondary)" };
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
      memberFrameHolder = dropdown.querySelector(".eMemberFrameHolder");

      let observeButtonUpdate = () => {
        let memberFrame = memberFrameHolder.querySelector(".eMemberFrame");
        let button = memberFrame.querySelector(".eMemberSectionActions button[observe]");
        let member = lesson.members[memberFrame.getAttribute("memberid")];
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
        let member = lesson.members[memberFrame.getAttribute("memberid")] ?? {};
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
        dropdown.insertAdjacentHTML("beforeend", `<div class="eMemberFrameHolder">
        <div class="eMemberFrame">
          <div class="eMemberFrameShadow"></div>
          <div class="eMemberFrameContentHolder">
            <div class="eMemberFrameContent">
              <div class="eMemberSection eMemberSectionInfo">
                <div class="eMemberBackdrop"><div></div></div>
                <div class="eMemberFrameCursor"></div>
                <img class="eMemberFramePicture">
                <div class="eMemberFrameInfoHolder">
                  <div name></div>
                  <div email></div>
                </div>
                <button class="eMemberClose buttonAnim border">${closeIcon}</button>
              </div>
              <div class="eMemberSection eMemberSectionDesc"></div>
              <div class="eMemberSection eMemberSectionEvents">
                <div class="eMemberEventHolder" self>
                  <div class="eMemberEvent" self>YOU</div>
                  <div class="eMemberEventDesc">This is your profile.</div>
                </div>
                <div class="eMemberEventHolder" hand>
                  <div class="eMemberEvent" hand>HAND</div>
                  <div class="eMemberEventDesc">They're asking to contribute to the lesson.</div>
                </div>
                <div class="eMemberEventHolder" idle>
                  <div class="eMemberEvent" idle>IDLE</div>
                  <div class="eMemberEventDesc">They're currently viewing another window.</div>
                </div>
                <div class="eMemberEventHolder" observe>
                  <div class="eMemberEvent" observe>OBSERVE</div>
                  <div class="eMemberEventDesc">They're following you around the lesson.</div>
                </div>
              </div>
              <div class="eMemberSection eMemberSectionActions">
                <button editor style="--themeColor: var(--theme)">
                  <div image></div>
                  <div text></div>
                </button>
                <button hand style="--themeColor: var(--green)" title="Lower this member's hand.">
                  <div image>${lowerHandIcon}</div>
                  <div text>Lower</div>
                </button>
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
        memberFrameHolder = dropdown.querySelector(".eMemberFrameHolder");
        let closeButton = memberFrameHolder.querySelector(".eMemberClose");
        closeButton.addEventListener("click", () => { closeDropdown(); });
        memberFrameHolder.offsetHeight;

        editorButton = memberFrameHolder.querySelector(".eMemberSectionActions button[editor]");
        handButton = memberFrameHolder.querySelector(".eMemberSectionActions button[hand]");
        observeButton = memberFrameHolder.querySelector(".eMemberSectionActions button[observe]");
        spotlightButton = memberFrameHolder.querySelector(".eMemberSectionActions button[spotlight]");
        kickButton = memberFrameHolder.querySelector(".eMemberSectionActions button[kick]");

        editorButton.addEventListener("click", async (event) => {
          editorButton.setAttribute("disabled", "");
          let frame = event.target.closest(".eMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let frameAccess = frame.getAttribute("access");
          let url = "lessons/members/access";
          let sendAccess = 1;
          if (memberid != null) {
            let member = lesson.members[memberid];
            if (member.access == 1) {
              sendAccess = 0;
            }
            url += "?member=" + member._id;
          } else if (frameAccess != null) {
            url += "?permaccess=" + frameAccess;
            if (parseInt(frameAccess) == 1) {
              sendAccess = 0;
            }
          }
          let [code] = await sendRequest("PUT", url, { access: sendAccess }, { session: editor.session });
          if (code == 200) {
            if (frameAccess != null) {
              getSection(frameAccess).style.display = "none";
              let changeSection = getSection(sendAccess);
              changeSection.style.display = "block";
              openDropdown(changeSection.querySelector(".eMemberAccessTitle"));
            }
          }
          editorButton.removeAttribute("disabled");
        });

        handButton.addEventListener("click", async (event) => {
          handButton.setAttribute("disabled", "");
          let frame = event.target.closest(".eMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let url = "lessons/members/hand/lower";
          if (memberid != null) {
            url += "?member=" + memberid;
          } else {
            url += "?member=all";
          }
          await sendRequest("DELETE", url, null, { session: editor.session });
          handButton.removeAttribute("disabled");
        });

        observeButton.addEventListener("click", async (event) => {
          let memberid = event.target.closest(".eMemberFrame").getAttribute("memberid");
          if (editor.realtime.observing == memberid) {
            return editor.realtime.module.exitObserve();
          }
          let member = lesson.members[memberid];
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
          editor.realtime.module.setShortSub(editor.visibleChunks);
          editor.closeAlert(editor.realtime.observeLoading);
          clearTimeout(editor.realtime.observeTimeout);
          let [code] = await sendRequest("GET", "lessons/members/observe?member=" + memberid, null, { session: editor.session });
          if (code == 200) {
            editor.realtime.observeLoading = await editor.openAlert("info", `<b>Connecting to Member</b>Connecting to ${member.name}'s screen to observe!`, { time: "never" });
            editor.realtime.observeTimeout = setTimeout(() => {
              editor.closeAlert(editor.realtime.observeLoading);
              editor.openAlert("error", `<b>Observe Timeout</b>Failed to connect to their screen, please try again later...`);
              editor.realtime.module.exitObserve();
            }, 10000);
          } else {
            if (prevObserve != null) {
              editor.realtime.observing = prevObserve;
              editor.realtime.module.exitObserve();
            }
            editor.realtime.observing = null;
            editor.realtime.module.setShortSub(editor.visibleChunks);
          }
          observeButton.removeAttribute("disabled");
        });
  
        spotlightButton.addEventListener("click", async (event) => {
          let memberid = event.target.closest(".eMemberFrame").getAttribute("memberid");
          let member = lesson.members[memberid];
          if (member == null) {
            return this.close();
          }
          if (lesson.signalStrength < 3) {
            return editor.openAlert("error", `<b>Unable to Connect</b>Your connection is too weak to use spotlight.`);
          }
          if (editor.realtime.observing != null) {
            editor.realtime.module.exitObserve();
          }
          spotlightButton.setAttribute("disabled", "");
          editor.openAlert("info", `<b>Spotlight</b>Letting members know about the spotlight...`);
          await sendRequest("GET", "lessons/members/observe/spotlight?member=" + memberid, null, { session: editor.session });
          spotlightButton.removeAttribute("disabled");
        });
  
        kickButton.addEventListener("click", async (event) => {
          kickButton.setAttribute("disabled", "");
          let frame = event.target.closest(".eMemberFrame");
          let memberid = frame.getAttribute("memberid");
          let url = "lessons/members/kick";
          if (memberid != null) {
            url += "?collaborator=" + lesson.members[memberid].modify;
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

      let memberFrame = memberFrameHolder.querySelector(".eMemberFrame");
      if (member.title == null) {
        memberFrame.setAttribute("memberid", member._id);
        memberFrame.removeAttribute("access");
        memberFrame.style.setProperty("--adaptColor", textColorBackground(member.color));
      } else {
        memberFrame.setAttribute("access", member.access);
        memberFrame.removeAttribute("memberid");
        memberFrame.style.setProperty("--adaptColor", "#fff");
      }
      memberFrame.style.setProperty("--themeColor", member.color);
      memberFrame.style.removeProperty("width");

      let cursor = memberFrameHolder.querySelector(".eMemberFrameCursor");
      let picture = memberFrameHolder.querySelector(".eMemberFramePicture");
      if (member.image == null) {
        picture.style.display = "none";
        cursor.style.display = "unset";
      } else {
        cursor.style.display = "none";
        picture.src = member.image;
        picture.style.display = "unset";
      }
      let name = memberFrameHolder.querySelector(".eMemberFrameInfoHolder div[name]");
      name.textContent = member.name;
      name.title = member.name;
      let email = memberFrameHolder.querySelector(".eMemberFrameInfoHolder div[email]");
      if (member.email) {
        email.textContent = member.email;
        email.title = member.email;
        email.style.display = "unset";
      } else {
        email.style.display = "none";
      }

      let frameDesc = memberFrameHolder.querySelector(".eMemberSectionDesc");
      if (member.title != null) {
        switch (member.access) {
          case 0:
            frameDesc.textContent = "Viewers can see all pages and annotations in this lesson.";
            break;
          case 1:
            frameDesc.textContent = "Editors can create annotation, but cannot grant permisions or change settings.";
            break;
          case 5:
            frameDesc.textContent = "The owner has full access to all aspects of the lesson.";
        }
        frameDesc.style.display = "block";
      } else {
        frameDesc.style.display = "none";
      }

      let isSelf = member._id == editor.sessionID;
      let self = memberFrameHolder.querySelector(".eMemberEventHolder[self]");
      let hand = memberFrameHolder.querySelector(".eMemberEventHolder[hand]");
      let idle = memberFrameHolder.querySelector(".eMemberEventHolder[idle]");
      let observe = memberFrameHolder.querySelector(".eMemberEventHolder[observe]");
      if (isSelf == true) {
        self.style.display = "flex";
      } else {
        self.style.display = "none";
      }
      if (member.hand != null) {
        hand.style.display = "flex";
      } else {
        hand.style.display = "none";
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
      editorButton.removeAttribute("disabled");
      handButton.removeAttribute("disabled");
      observeButton.removeAttribute("disabled");
      kickButton.removeAttribute("disabled");

      if (isSelf == false && editor.self.access > 2 && member.access < 2) {
        let image = editorIcon;
        let text = "Editor";
        let desc = "Grant temporary editing privileges.";
        if (member.access == 1) {
          image = viewerIcon;
          text = "Viewer";
          desc = "Revoke temporary editing privileges, granting viewer.";
        }
        let imageHolder = editorButton.querySelector("div[image]");
        imageHolder.innerHTML = "<div>" + image + "</div>";
        editorButton.querySelector("div[text]").textContent = text;
        editorButton.title = desc;
        editorButton.style.display = "flex";
      } else {
        editorButton.style.display = "none";
      }

      let handRaised = member.hand != null;
      if (member.title != null) {
        // If someone in section has hand raised
        handRaised = tile.parentElement.querySelector(".eMemberEvent[hand]") != null;
      }
      if (isSelf == false && editor.self.access > 3 && handRaised == true) {
        handButton.style.display = "flex";
      } else {
        handButton.style.display = "none";
      }
      if (isSelf == false && editor.self.access > 3 && member.access < 4) {
        kickButton.style.display = "flex";
      } else {
        kickButton.style.display = "none";
      }
      if (isSelf == false && member.title == null && (member.access > 0 || lesson.lesson.settings.observeViewers != false || editor.self.access > 3)) {
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
      let memberTile = element.closest(".eMemberTile") ?? element.closest(".eMemberAccessTitle");
      if (memberTile != null) {
        if (memberTile.className == "eMemberTile") {
          memberTile = memberTile.querySelector("div[holder]");
        }
        return openDropdown(memberTile);
      }
    });

    for (let i = 0; i < accessHolders.length; i++) {
      let holder = accessHolders[i];
      let title = holder.querySelector(".eMemberAccessTitle");
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
      
      let clearTiles = frame.querySelectorAll(".eMemberTile");
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