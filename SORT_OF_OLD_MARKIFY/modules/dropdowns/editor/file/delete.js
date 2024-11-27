modules["dropdowns/editor/file/delete"] = {
  html: `
  <div class="eFileDeleteHolder">
    <img src="./images/editor/file/trash.svg">
    <div class="eFileDeleteContent">
      <div class="eFileDeleteTitle"></div>
      <div class="eFileDeleteDesc"></div>
    </div>
  </div>
  <div class="eFileDeleteOptions">
    <button class="eFileDeleteConfirm border" style="color: var(--error)">Delete</button>
    <button class="eFileDeleteCancel border">Cancel</button>
  </div>
  `,
  css: {
    ".eFileDeleteHolder": `display: flex; flex-wrap: wrap; gap: 6px; justify-content: center`,
    ".eFileDeleteHolder img": `width: 64px; height: 64px`,
    ".eFileDeleteTitle": `color: var(--error); font-size: 20px; font-weight: 700; text-align: left`,
    ".eFileDeleteDesc": `max-width: 240px; font-size: 14px; text-align: left`,
    ".eFileDeleteOptions": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 12px; justify-content: space-around`,
    ".eFileDeleteOptions button": `display: flex; height: fit-content; min-height: 36px; padding: 0 12px; margin: 6px; --borderColor: var(--hover); --borderWidth: 3px; --borderRadius: 18px; color: var(--theme); justify-content: center; align-items: center; font-size: 18px; font-weight: 700`,
    ".eFileDeleteConfirm:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`,
    ".eFileDeleteCancel:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1); color: #fff !important`
  },
  js: async function (frame, extra) {
    let dropdown = await getModule("dropdown");
    let alert = await getModule("alert");
    let option = extra.button.getAttribute("option") ?? "deletelesson";
    let access;
    let extraSend;
    let title = frame.querySelector(".eFileDeleteTitle");
    let desc = frame.querySelector(".eFileDeleteDesc");
    let folderid;
    let folderFrame = extra.button.closest("[folderid]");
    if (folderFrame != null) {
      folderid = folderFrame.getAttribute("folderid");
    }
    if (extra.button.hasAttribute("dashboard") == false) {
      let editor = await getModule("pages/editor");
      access = editor.getSelf().access;
      extraSend = { session: editor.session };
    } else {
      if (extra.button.hasAttribute("owner") == true) {
        access = 5;
      } else {
        access = 0;
      }
    }
    switch (option) {
      case "deletelesson":
        if (access < 5) {
          title.textContent = "Remove Lesson?";
          desc.innerHTML = "Are you sure you want to remove this lesson from your dashboard? <b>You will need to be invited back to regain access.</b>";
        } else {
          title.textContent = "Delete Lesson?";
          desc.innerHTML = "Are you sure you want to permanently delete this lesson? <b>This cannot be undone!</b>";
        }
        break;
      case "deleteannotations":
        title.textContent = "Delete Annotations?";
        desc.innerHTML = "Are you sure you want to permanently delete all annotations? <b>This cannot be undone!</b>";
        break;
      case "deletepage":
        title.textContent = "Delete Page?";
        desc.innerHTML = "Are you sure you want to permanently delete this page? <b>This cannot be undone!</b>";
        break;
      case "deletepageannotations":
        title.textContent = "Delete Annotations?";
        desc.innerHTML = "Are you sure you want to permanently delete all annotations on this page? <b>This cannot be undone!</b>";
        break;
      case "deletefolder":
        title.textContent = "Delete Folder?";
        desc.innerHTML = "Deleting the folder <b>will not</b> delete the lessons.";
    }
    let deleteConfirm = frame.querySelector(".eFileDeleteConfirm");
    deleteConfirm.addEventListener("click", async () => {
      deleteConfirm.setAttribute("disabled", "");
      let deleteAlert = await alert.open("info", "<b>Deleting</b><div>Processing delete request...", { time: "never" });
      let forceClose = false;
      let pathAdd = "";
      if (option == "deleteannotations") {
        pathAdd = "/annotations";
      } else if (option == "deletepage") {
        pathAdd = "/page?page=" + extra.button.getAttribute("pageid");
      } else if (option == "deletepageannotations") {
        pathAdd = "/annotations?page=" + extra.button.getAttribute("pageid");
      }
      if (extraSend == null) {
        if (option == "deletefolder") {
          pathAdd += "/folder?folder=" + extra.button.closest("[folder]").getAttribute("folder");
          forceClose = true
        } else {
          pathAdd += "?lesson=" + extra.button.getAttribute("lesson");
        }
      }
      let [code] = await sendRequest("DELETE", "lessons/delete" + pathAdd, null, extraSend);
      deleteConfirm.removeAttribute("disabled");
      alert.close(deleteAlert);
      if (code == 200) {
        if (extra.button.closest("[fromfolder]") == null || forceClose) {
          dropdown.close();
          if (pathAdd == "") {
            setFrame("pages/dashboard");
          }
        } else {
          window.dropdown.frameHistory = [];
          dropdown.open(deleteConfirm, "dropdowns/dashboard/folder");
        }
      }
    });
    frame.querySelector(".eFileDeleteCancel").addEventListener("click", () => {
      dropdown.close();
    });
  }
}