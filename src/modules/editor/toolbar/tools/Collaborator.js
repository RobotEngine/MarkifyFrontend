import { textColorBackground } from "../../utils/text-color-background";

export class Tool {
  setActionButton(button) {
    if (this.editor.settings.anonymousMode == true && this.editor.self.access < 4) {
      return false;
    }

    let modifiedBy;
    let selectKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectKeys.length; i++) {
      let annotation = this.editor.annotations[selectKeys[i]].render ?? {};
      let setModifiedBy = annotation.m ?? annotation.a;
      if (setModifiedBy == null || (modifiedBy != null && setModifiedBy != modifiedBy)) {
        return false;
      }
      modifiedBy = setModifiedBy;
    }
    if (modifiedBy == null || modifiedBy == this.editor.self.modify || modifiedBy.length != 24) {
      return false;
    }

    let collaborator = this.editor.collaborators[modifiedBy];
    if (collaborator != null) {
      if (collaborator._id == null) {
        return false;
      }
    }

    let image = button.querySelector(".eSubToolCollaborator");
    if (image == null) {
      button.insertAdjacentHTML("beforeend", `<img class="eSubToolCollaborator" src="../images/profiles/default.svg">`);
      image = button.querySelector(".eSubToolCollaborator");
    }

    (async () => {
      if (collaborator == null) { // Fetch to get the collaborator
        this.button.setAttribute("disabled", "");
        collaborator = await this.editor.utils.getCollaborator(modifiedBy);
      }
      if (collaborator._id == null) {
        return this.toolbar.selection.updateActionBar({ redrawActionBar: true });
      }

      if (image != null) {
        if (image.getAttribute("src") != (collaborator.image ?? "../images/profiles/default.svg")) {
          image.src = collaborator.image ?? "../images/profiles/default.svg";
        }
        image.style.border = "solid 3px " + collaborator.color;
      }
      if (this.button != null) {
        this.button.setAttribute("tooltip", collaborator.name);
        this.button.removeAttribute("disabled");
      }
    })();
  }

  SHOW_ON_LOCK = true;
  ADD_DIVIDE_AFTER = true;
  KEEP_BUTTON_PREVIEW = true;

  html = `
  <div class="eSubToolCollaboratorHolder">
    <div class="eSubToolCollaboratorBackdrop"><div></div></div>
    <div class="eSubToolCollaboratorContent">
      <div class="eSubToolCollaboratorCursor"></div>
      <img class="eSubToolCollaboratorPicture" />
      <div class="eSubToolCollaboratorInfo">
        <div name></div>
        <div email></div>
      </div>
    </div>
    <button class="largeButton">Make Viewer</button>
  </div>
  `;
  css = {
    ".eSubToolCollaborator": `box-sizing: border-box; width: 34px; height: 34px; padding: 2px; margin: 4px; object-fit: cover; background: var(--pageColor); border-radius: 20px`,

    ".eSubToolCollaboratorHolder": `display: flex; flex-direction: column; width: fit-content; max-width: 100%; gap: 4px; align-items: center; border-radius: inherit`,
    ".eSubToolCollaboratorContent": `display: flex; flex-wrap: wrap; width: max-content; max-width: calc(100% - 16px); margin: 8px; gap: 4px; align-items: center; border-radius: inherit`,
    ".eSubToolCollaboratorBackdrop": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1; border-radius: inherit; overflow: hidden`,
    ".eSubToolCollaboratorBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .08; background-image: url(../images/editor/backdrop.svg); background-size: 24px; background-position: center`,
    ".eSubToolCollaboratorCursor": `display: none; width: 40px; height: 40px; flex-shrink: 0; margin: 2px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px`,
    ".eSubToolCollaboratorPicture": `display: none; width: 44px; height: 44px; flex-shrink: 0; margin: 2px; background: #fff; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px`,
    ".eSubToolCollaboratorInfo": `max-width: calc(100% - 8px); margin: 4px; text-align: left`,
    ".eSubToolCollaboratorInfo div[name]": `max-width: 100%; font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolCollaboratorInfo div[email]": `display: none; max-width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eSubToolCollaboratorHolder .largeButton": `width: fit-content; padding: 6px 10px; margin: 4px 12px 12px; background: var(--theme); text-wrap: nowrap; font-size: 16px; --borderRadius: 12px; color: #fff`
  };
  js(frame) {
    let collaboratorID;
    let collaborator;
    let member;
    
    let holder = frame.querySelector(".eSubToolCollaboratorHolder");
    let cursor = holder.querySelector(".eSubToolCollaboratorCursor");
    let image = holder.querySelector(".eSubToolCollaboratorPicture");
    let info = holder.querySelector(".eSubToolCollaboratorInfo");
    let name = info.querySelector("div[name]");
    let email = info.querySelector("div[email]");
    let makeViewerButton = holder.querySelector(".largeButton");

    let redraw = (noRefresh, noCheckMember) => {
      let preference = this.toolbar.getPreferenceTool();
      collaboratorID = preference.m ?? preference.a;
      collaborator = this.editor.collaborators[collaboratorID];
      if (collaborator == null) {
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

      member = null;
      if (this.editor.parent.pageType == "board" && this.editor.self.access > 3 && noCheckMember != true) {
        let memberIDs = Object.keys(this.editor.parent.parent.members);
        for (let i = 0; i < memberIDs.length; i++) {
          let memberCheck = this.editor.parent.parent.members[memberIDs[i]] ?? {};
          if (memberCheck.modify == collaboratorID) {
            member = memberCheck;
            break;
          }
        }
      }
      if (member != null && member.access == 1) {
        makeViewerButton.style.removeProperty("display");
      } else {
        makeViewerButton.style.display = "none";
      }

      if (noRefresh != true) {
        this.toolbar.selection.updateActionBar();
      }
    }
    redraw(true);
    this.redraw = () => { redraw(); }

    makeViewerButton.addEventListener("click", async () => {
      makeViewerButton.setAttribute("disabled", "");
      let [code] = await sendRequest("PUT", "lessons/members/access?member=" + member._id, { access: 0 }, { session: this.editor.session });
      makeViewerButton.removeAttribute("disabled");
      if (code == 200) {
        redraw(null, true);
      }
    });

    this.setActionButton(this.button.querySelector("div"));
  }
}