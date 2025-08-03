modules["dropdowns/remove"] = class {
  html = `
  <div class="dDeleteHolder">
    <div class="dDeleteImage"></div>
    <div class="dDeleteContent">
      <div class="dDeleteTitle"></div>
      <div class="dDeleteDesc"></div>
    </div>
  </div>
  <div class="dDeleteOptions">
    <button class="dDeleteConfirm border" style="color: var(--error)">Delete</button>
    <button class="dDeleteCancel border">Cancel</button>
  </div>
  `;
  css = {
    ".dDeleteHolder": `display: flex; flex-wrap: wrap; gap: 6px; justify-content: center`,
    ".dDeleteImage": `--themeColor: var(--error); width: 64px; height: 64px`,
    ".dDeleteImage svg": `width: 100%; height: 100%`,
    ".dDeleteTitle": `color: var(--error); font-size: 20px; font-weight: 700; text-align: left`,
    ".dDeleteDesc": `max-width: 240px; font-size: 14px; text-align: left`,
    ".dDeleteOptions": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 12px; justify-content: space-around`,
    ".dDeleteOptions button": `display: flex; height: fit-content; min-height: 36px; padding: 0 12px; margin: 6px; --borderColor: var(--hover); --borderWidth: 3px; --borderRadius: 18px; color: var(--theme); justify-content: center; align-items: center; font-size: 18px; font-weight: 700`,
    ".dDeleteConfirm:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`,
    ".dDeleteCancel:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`,
    ".dDeleteOptions button:active": `transform: scale(1)`
  };
  js = async (frame, extra) => {
    let parent = extra.parent;
    let option = extra.type;
    let title = frame.querySelector(".dDeleteTitle");
    let desc = frame.querySelector(".dDeleteDesc");
    switch (extra.type) {
      case "deletelesson":
        if (extra.isOwner != true) {
          title.textContent = "Remove Lesson?";
          desc.innerHTML = "Are you sure you want to remove this lesson from your dashboard? <b>You will need to be invited back to regain access.</b>";
        } else {
          title.textContent = "Delete Lesson?";
          desc.innerHTML = "Are you sure you want to permanently delete this lesson? <b>This cannot be undone!</b>";
        }
        break;
      case "deleteannotations":
        title.textContent = "Delete Annotations?";
        desc.innerHTML = "Are you sure you want to delete all annotations? You can undo this in timeline history!";
        break;
      case "deletefolder":
        title.textContent = "Delete Folder?";
        desc.innerHTML = "Deleting the folder <b>will not</b> delete the lessons.";
    }
    let deleteConfirm = frame.querySelector(".dDeleteConfirm");
    deleteConfirm.addEventListener("click", async () => {
      deleteConfirm.setAttribute("disabled", "");
      let deleteAlert = await alertModule.open("info", "<b>Deleting</b><div>Processing delete request...", { time: "never" });
      let pathAdd = "";
      if (option == "deletelesson") {
        pathAdd += "?lesson=" + extra.lessonID;
      } else if (option == "deleteannotations") {
        pathAdd += "/annotations";
      } else if (option == "deletefolder") {
        pathAdd += "/folder?folder=" + extra.folderID;
      }
      let [code] = await sendRequest("DELETE", "lessons/delete" + pathAdd, null, { session: extra.session });
      deleteConfirm.removeAttribute("disabled");
      alertModule.close(deleteAlert);
      if (code == 200) {
        dropdownModule.close();
        if (extra.parent != null) {
          if (option == "deletelesson") {
            delete extra.lessons[extra.lessonID];
            let lessonTile = parent.frame.querySelector('.dTile[lesson="' + extra.lessonID + '"]');
            if (lessonTile != null) {
              let lessonContent = lessonTile.closest(".content");
              let noLessons = lessonContent.querySelector(".dNoLessons");
              lessonTile.remove();
              if (noLessons != null && lessonContent.querySelector(".dTiles").childElementCount < 1) {
                noLessons.style.removeProperty("display");
              }
            }
          } else if (option == "deletefolder") {
            let folder = extra.folders[extra.folderID];
            if (folder != null) {
              let parentID = folder.parent;
              let folderSort = parent.frame.querySelector('.dSidebarFolder[folderid="' + extra.folderID + '"]');
              if (folderSort != null) {
                folderSort.remove();
              }
              if (folder.folders != null) {
                for (let i = 0; i < folder.folders.length; i++) {
                  let folderid = folder.folders[i];
                  delete extra.folders[folderid];
                  let changeLessons = extra.records[folderid];
                  for (let c = 0; c < changeLessons.length; c++) {
                    delete extra.lessons[changeLessons[c].split("_")[0]].record.folder;
                  }
                  delete extra.records[folderid];
                }
              }
              delete extra.folders[extra.folderID];
              let changeLessons = extra.records[extra.folderID];
              for (let c = 0; c < changeLessons.length; c++) {
                delete extra.lessons[changeLessons[c].split("_")[0]].record.folder;
              }
              delete extra.records[extra.folderID];
              let parentFolder = extra.folders[parentID];
              if (parentFolder != null) {
                parentFolder.folders.splice(parentFolder.folders.indexOf(extra.folderID), 1);
                let parentSort = parent.frame.querySelector('.dSidebarFolder[folderid="' + parentID + '"]');
                if (parentSort != null) {
                  parent.sort = parentID;
                  parentSort.setAttribute("selected", "");
                  return parent.updateTiles(parentSort);
                }
              }
              parent.sort = "recent";
              let recentSort = parent.frame.querySelector('.dSidebarSort[sort="recent"]');
              recentSort.setAttribute("selected", "");
              parent.updateTiles(recentSort);
            }
          }
        } else if (option == "deletelesson") {
          setFrame("pages/app/dashboard");
        }
      }
    });
    frame.querySelector(".dDeleteCancel").addEventListener("click", () => {
      dropdownModule.close();
    });

    setSVG(frame.querySelector(".dDeleteImage"), "../images/editor/file/trash.svg");
  }
}