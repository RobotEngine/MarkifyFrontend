import historyIcon from "@assets/lesson/file/history.svg?raw";
import renameIcon from "@assets/rename.svg?raw";
import { trash as trashIcon, open as openIcon } from "@modules/utility/core-icons";

export class Frame {
  html = `
  <button class="broGroupOption" option="open" title="Open this team."><div>${openIcon}</div>Open</button>
  <button class="broGroupOption" option="opennewtab" title="Open this team in a new tab."><div>${openIcon}</div>Open in New Tab</button>
  <div class="broGroupOptionLine"></div>
  <button class="broGroupOption" option="timeline" title="View this team's timeline history."><div>${historyIcon}</div>Timeline</button>
  <button class="broGroupOption" option="rename" title="Rename this group."><div>${renameIcon}</div>Rename</button>
  <div class="broGroupOptionLine"></div>
  <button class="broGroupOption" option="deletegroup" title="Remove this group from the lesson." dropdowntitle="Delete Team" style="--themeColor: var(--error)"><div>${trashIcon}</div>Delete Team</button>
  `;

  css = {
    ".broGroupOption": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".broGroupOption:not(:last-child)": `margin-bottom: 4px`,
    ".broGroupOption div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".broGroupOption div svg": `width: 100%; height: 100%`,
    ".broGroupOption:hover": `background: var(--themeColor); color: #fff`,
    ".broGroupOptionLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };

  js(frame, extra) {
    let parent = extra.parent;
    let groupID = extra.groupID;

    let openButton = frame.querySelector('.broGroupOption[option="open"]');
    openButton.addEventListener("click", () => {
      this.close();
      parent.openGroup(groupID);
    });
    let openNewTabButton = frame.querySelector('.broGroupOption[option="opennewtab"]');
    openNewTabButton.addEventListener("click", () => {
      this.close();
      window.open("/app/lesson?lesson=" + parent.parent.parent.id + "&team=" + groupID, "_blank").focus();
    });

    let timelineButton = frame.querySelector('.broGroupOption[option="timeline"]');
    timelineButton.addEventListener("click", () => {
      this.close();

      let tileData = parent.layout.tiles[groupID] ?? {};
      if (tileData.editor == null || tileData.loadedAnnotations != true) {
        return
      }

      parent.parent.openPage("timeline", "timeline", {
        exitPage: ["primary", "overview"],
        configuration: {
          id: groupID,
          parameters: [("group=" + groupID)],
          annotations: tileData.editor.annotations,
          backgroundColor: tileData.editor.backgroundColor
        }
      });
    });

    let renameGroupButton = frame.querySelector('.broGroupOption[option="rename"]');
    renameGroupButton.addEventListener("click", () => {
      this.close();
      let tileData = parent.layout.tiles[groupID] ?? {};
      if (tileData.element == null) {
        return
      }
      let titleText = tileData.element.querySelector(".broTileHeaderNameHolderText");
      if (window.getSelection != null && document.createRange != null) {
        let range = document.createRange();
        range.selectNodeContents(titleText);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.body.createTextRange != null) {
        let range = document.body.createTextRange();
        range.moveToElementText(titleText);
        range.select();
      } else {
        titleText.focus();
      }
    });

    let deleteGroupButton = frame.querySelector('.broGroupOption[option="deletegroup"]');
    deleteGroupButton.addEventListener("click", () => {
      this.open(deleteGroupButton, import("@modules/dropdowns/Remove"), { type: "deletegroup", session: parent.parent.parent.session, groupID });
    });
  }
}