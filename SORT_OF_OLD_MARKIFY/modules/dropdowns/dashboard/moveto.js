modules["dropdowns/dashboard/moveto"] = {
  title: "Move To",
  maxHeight: 450,
  html: `
  <div class="dTileDropFolderFrame">
    <div class="dTileDropFolderHolder">
      <div class="dTileDropFolderNone">No folders... yet!</div>
    </div>
    <div class="dTileDropFolderActions">
      <button class="dTileDropFolderNew largeButton">New Folder</button>
      <button class="dTileDropFolderMoveTo largeButton" disabled>Move</button>
    </div>
  </div>
  `,
  css: {
    ".dTileDropFolderFrame": `width: fit-content`,
    ".dTileDropFolderHolder": `display: flex; flex-direction: column; width: max-content; min-width: 100%; align-items: flex-start`,
    ".dTileDropFolderNone": `display: none; width: 100%; text-align: center; margin: 8px 0`,
    ".dTileDropFolderParent": `width: -webkit-fill-available`,
    ".dTileDropFolderParent[child]": `padding-left: 20px`,
    ".dTileDropFolder": `--fillColor: var(--theme); --themeColor: var(--fillColor); position: relative; display: flex; padding: 4px; margin-bottom: 6px; align-items: center`, //width: 100%;
    ".dTileDropFolder[selected]": `--themeColor: #fff !important`,
    ".dTileDropFolder[selected] div[select]": `opacity: 1 !important`,
    ".dTileDropFolder[selected] div[name]": `color: #fff !important`,
    ".dTileDropFolder[inside]": `--folderFill: var(--themeColor)`,
    ".dTileDropFolder svg[folder]": `width: 32px; height: 32px; margin-left: 4px; z-index: 1`,
    ".dTileDropFolder div[select]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--fillColor); border-radius: 24px; opacity: 0; transition: .1s`,
    ".dTileDropFolder:hover div[select]": `opacity: .2`,
    ".dTileDropFolder div[name]": `flex: 1; margin: 0 8px 0 4px; color: var(--textColor); font-size: 18px; font-weight: 600; z-index: 1; text-align: left`,
    ".dTileDropFolder div[name][contenteditable]": `padding: 2px 4px; outline: solid 2px var(--themeColor); border-radius: 4px; overflow: auto`,
    ".dTileDropFolder div[arrow]": `position: sticky; display: flex; width: 32px; height: 32px; right: -2px; margin-left: auto; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 16px; z-index: 1; transition: .1s`,
    ".dTileDropFolder div[arrow] svg": `width: 24px; height: 24px`,
    ".dTileDropFolder[loaded] div[arrow]": `transform: rotate(90deg)`,
    ".dTileDropFolderActions": `position: sticky; display: flex; flex-wrap: wrap; max-width: calc(var(--dropdownWidth) - 36px); padding: 8px; margin: 4px; gap: 24px; left: 4px; bottom: 4px; justify-content: space-between; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 27px; z-index: 2`,
    ".dTileDropFolderNew": `padding: 6px 10px; background: var(--theme); --borderRadius: 16px; color: #fff; font-size: 16px`,
    ".dTileDropFolderMoveTo": `padding: 6px 10px; background: #fff; --borderRadius: 16px; color: var(--secondary); font-size: 16px`,
    ".dTileDropFolderLoadMore": `display: flex; width: 100%; justify-content: center; margin-bottom: 8px`,
    ".dTileDropFolderLoadMore button": `display: flex; padding: 6px 8px; align-items: center; --borderRadius: 16px; font-size: 16px; color: var(--theme); font-weight: 700`
  },
  js: async function (frame, extra) {
    let lessonID = extra.button.closest("[lesson]").getAttribute("lesson");
    let dropdownModule = await getModule("dropdown");

    let folderFrame = frame.querySelector(".dTileDropFolderHolder");
    let noFoldersMsg = folderFrame.querySelector(".dTileDropFolderNone");
    let newButton = frame.querySelector(".dTileDropFolderNew");
    let moveButton = frame.querySelector(".dTileDropFolderMoveTo");

    let folderid;
    let folderDropFrame = extra.button.closest("[folderid]");
    if (folderDropFrame != null) {
      folderid = folderDropFrame.getAttribute("folderid");
    }

    let updateMsg = () => {
      if (folderFrame.childElementCount > 1) {
        noFoldersMsg.style.display = "none";
      } else {
        noFoldersMsg.style.display = "unset";
      }
    }

    let addFolder = async (folder, parent) => {
      if (parent != null) {
        parent.removeAttribute("selected");
        parent = parent.closest(".dTileDropFolderParent") ?? parent;
      } else {
        parent = folderFrame;
      }
      parent.insertAdjacentHTML("beforeend", `<div class="dTileDropFolderParent" new>
        <a class="dTileDropFolder">
          <div select></div>
          <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--folderFill)" stroke-width="30"/> </g> </svg>
          <div name></div>
          <div arrow><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg></div>
        </a>
      </div>`);
      let newFolder = parent.querySelector(".dTileDropFolderParent[new]");
      newFolder.removeAttribute("new");
      if (parent != folderFrame) {
        newFolder.setAttribute("child", "");
      }
      let folderName = newFolder.querySelector("div[name]");
      if (folder != null) {
        newFolder.setAttribute("folderid", folder._id);
        folderName.textContent = folder.name;
        let folderButton = newFolder.querySelector(".dTileDropFolder");
        if (folder.color != null) {
          folderButton.style.setProperty("--fillColor", "#" + folder.color);
        }
        if (folderid == folder._id) {
          folderButton.setAttribute("inside", "");
        }
      } else {
        if (parent.firstElementChild != null) {
          if (parent != folderFrame && parent.firstElementChild.nextElementSibling != null) {
            parent.insertBefore(newFolder, parent.firstElementChild.nextElementSibling);
          } else {
            parent.insertBefore(newFolder, parent.firstElementChild);
          }
        }
        folderName.setAttribute("contenteditable", "");
        
        let keyDownListener = (event) => {
          if (event.keyCode == 13) {
            event.preventDefault();
            folderName.blur();
            return;
          }
        };
        folderName.addEventListener("keydown", keyDownListener);
        let pasteListener = (event) => {
          // Cancel paste
          event.preventDefault();
    
          // Insert text manually
          document.execCommand("insertHTML", false, (event.originalEvent ?? event).clipboardData.getData("text/plain"));
        }
        folderName.addEventListener("paste", pasteListener);
        let focusListener;
        focusListener = async () => {
          folderName.removeEventListener("keydown", keyDownListener);
          folderName.removeEventListener("paste", pasteListener);
          folderName.removeEventListener("focusout", focusListener);
          
          folderName.removeAttribute("contenteditable");
          let name = folderName.textContent.substring(0, 30).replace(/[^A-Za-z0-9.,_|/\-+!?@#$%^&*()\[\]{}'":;~` ]/g, "");
          if (name.replace(/ /g, "").length < 1) {
            newFolder.remove();
            updateMsg();
            newButton.removeAttribute("disabled");
            return;
          }
          /*if (folderName.textContent == folderName.getAttribute("prevtitle")) {
            return;
          }*/
          newFolder.setAttribute("disabled", "");
          folderName.textContent = name;
          let folderBody = { name: name };
          if (parent != folderFrame) {
            folderBody.parent = parent.getAttribute("folderid");
          }
          let [code, body] = await sendRequest("POST", "lessons/folders/new", folderBody);
          if (code != 200) {
            newFolder.remove();
            updateMsg();
          } else {
            newFolder.setAttribute("folderid", body.folder);
            parent.setAttribute("lastopened", getEpoch());
            newFolder.removeAttribute("disabled");
            let folderChild = newFolder.querySelector(".dTileDropFolder");
            folderChild.setAttribute("loaded", "");
            folderChild.setAttribute("selected", "");
            moveButton.removeAttribute("disabled");
          }
          newButton.removeAttribute("disabled");
        };
        folderName.addEventListener("focusout", focusListener);

        await sleep(1);
        folderName.focus();
      }
      updateMsg();
    }

    newButton.addEventListener("click", () => {
      newButton.setAttribute("disabled", "");
      moveButton.setAttribute("disabled", "");
      addFolder(null, folderFrame.querySelector(".dTileDropFolder[selected]"))
    });

    moveButton.addEventListener("click", async () => {
      let selected = folderFrame.querySelector(".dTileDropFolder[selected]");
      if (selected == null) {
        return;
      }
      moveButton.setAttribute("disabled", "");
      let [code, result] = await sendRequest("GET", "lessons/folders/move?folder=" + selected.parentElement.getAttribute("folderid") + "&lesson=" + lessonID);
      if (folderFrame.querySelector(".dTileDropFolder[selected]") != null) {
        moveButton.removeAttribute("disabled");
      }
      if (code == 200) {
        if (extra.button.closest("[fromfolder]") == null) {
          dropdownModule.close();
        } else {
          window.dropdown.frameHistory = [];
          dropdownModule.open(moveButton, "dropdowns/dashboard/folder");
        }
      }
    });

    updateMsg();

    let amount = 50;
    let loadFolders = async (parent, before) => {
      let path = "lessons/folders";
      if (parent != null && parent.hasAttribute("folderid") == true) {
        path += "?parent=" + parent.getAttribute("folderid");
        if (before != null) {
          path += "&before=" + before;
        }
      } else if (before != null) {
        path += "?before=" + before;
      }
      let [code, result] = await sendRequest("GET", path);
      if (code != 200) {
        if (parent == null) {
          dropdownModule.close();
        }
        return result;
      }

      for (let i = 0; i < result.folders.length; i++) {
        addFolder(result.folders[i], parent);
        (parent ?? folderFrame).setAttribute("lastopened", result.folders[i].opened);
      }
      if (result.folders.length > 0 && result.folders.length >= amount) {
        (parent ?? folderFrame).insertAdjacentHTML("beforeend", `<div class="dTileDropFolderLoadMore"><button class="buttonAnim border">View More</button></div>`);
      }
      return result;
    }

    folderFrame.addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let loadMore = target.closest(".dTileDropFolderLoadMore button");
      if (loadMore != null) {
        let folderParent = loadMore.parentElement.parentElement;
        loadMore.setAttribute("disabled", "");
        let result = await loadFolders(folderParent, folderParent.getAttribute("lastopened"));
        loadMore.removeAttribute("disabled");
        if (result != 200) {
          loadMore.removeAttribute("loaded");
          loadMore.parentElement.remove();
        }
        return;
      }
      let folder = target.closest(".dTileDropFolder");
      if (folder == null || folder.parentElement.hasAttribute("folderid") == false) {
        return;
      }
      let folderParent = folder.parentElement;
      let lastSelect = folderFrame.querySelector(".dTileDropFolder[selected]");
      if (lastSelect == folder) {
        for (let i = 0; i < folderParent.children.length; i++) {
          let child = folderParent.children[i];
          if (child.nodeName == "DIV") {
            child.remove();
            i--;
          }
        }
        folder.removeAttribute("loaded");
        folder.removeAttribute("selected");
        moveButton.setAttribute("disabled", "");
        return;
      }
      if (lastSelect != null) {
        lastSelect.removeAttribute("selected");
      }
      folder.setAttribute("selected", "");
      moveButton.removeAttribute("disabled");

      if (folder.hasAttribute("loaded") == false) {
        folderParent.setAttribute("disabled", "");
        await loadFolders(folderParent);
        folder.setAttribute("loaded", "");
        folderParent.removeAttribute("disabled");
      }
    });

    await loadFolders()

    /*
      <div class="dTileDropFolderParent" child>
        <button class="dTileDropFolder" selected inside>
          <div select></div>
          <svg folder viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1422_21" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="white"/> </mask> <g mask="url(#mask0_1422_21)"> <path d="M223 178V101.747C223 86.8351 210.912 74.7468 196 74.7468H121V73C121 60.2974 110.703 50 98 50H56C43.2974 50 33 60.2975 33 73V178C33 192.912 45.0883 205 60 205H196C210.912 205 223 192.912 223 178Z" stroke="var(--themeColor)" fill="var(--folderFill)" stroke-width="30"/> </g> </svg>
          <div name>Atwood Machine Lab</div>
          <div arrow><svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1455_45" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" transform="matrix(1 0 0 -1 0 256)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1455_45)"> <path d="M85.1472 213L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> <path d="M85.1472 43.2942L170 128.147" stroke="var(--fillColor)" stroke-width="48" stroke-linecap="round"/> </g> </svg></div>
        </button>
      </div>
    */
  }
}