modules["dropdowns/editor/share/link"] = {
  html: `
  <div class="eShareLinkCreate">
    <button class="largeButton border">Enable Link</button>
  </div>
  <div class="eShareLinkRow" style="margin-top: 0px">
    <input class="eShareLinkSection" readonly></input>
    <button class="eShareLinkCopy border" title="Copy the link."><img src="./images/tooltips/copy.svg"></button>
  </div>
  <button class="eShareLinkRow eShareLinkPerm buttonAnim">
    <img class="eShareLinkIcon">
    <div class="eShareDetailsHolder">
      <div class="eShareDetailTitle"></div>
      <div class="eShareDetailDesc"></div>
    </div>
  </button>
  <div class="eShareLinkRow">
    <button class="eShareLinkRemove border" title="Invalidate the link.">Private Link</button>
    <button class="eShareOptionLink border" dropdown="dropdowns/editor/share/options" title="Configurable options for members who join.">Options</button>
  </div>
  `,
  css: {
    ".eShareLinkCreate": "position: absolute; display: flex; width: calc(100% - 16px); height: calc(100% - 16px); justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eShareLinkCreate button": `background: var(--theme); --borderRadius: 20.25px; color: #fff`,

    ".eShareLinkRow": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 16px; justify-content: center; align-items: center`,
    ".eShareLinkRow button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,

    ".eShareLinkSection": `box-sizing: border-box; width: calc(100% - 50px); height: 42px; margin-right: 8px; border: solid 3px var(--hover); outline: unset; border-radius: 21px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 700; font-family: var(--theme); cursor: copy; user-select: all`,
    ".eShareLinkCopy": `width: 36px; height: 36px; padding: 0; margin: 3px; --borderWidth: 3px`,
    ".eShareLinkCopy img": `width: 30px; transition: .1s`,
    ".eShareLinkCopy:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eShareLinkCopy:hover img": `filter: brightness(0) invert(1)`,

    ".eShareLinkPerm": `box-sizing: border-box; max-width: 360px; padding: 6px; align-items: flex-start; border-radius: 24px`,
    ".eShareLinkIcon": `width: 36px; height: 36px`,
    ".eShareDetailsHolder": `flex: 1; margin-left: 8px; text-align: left`,
    ".eShareDetailTitle": `color: var(--theme); font-size: 16px; font-weight: 600`,

    ".eShareLinkRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eShareLinkRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,

    ".eShareOptionLink": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionLink:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`

    /*
    ".eShareActionLink": `display: flex; max-width: 100%; padding: 6px; margin: 7px 7px 7px auto; align-items: center; --borderWidth: 3px; font-size: 16px`,
    ".eShareActionLink div[label]": `flex: 1; margin: 0 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eShareActionLink[on]": `--themeColor: var(--theme); --color: #fff`,
    ".eShareActionLink[off]": `--themeColor: var(--gray); --color: #000`,
    ".eLinkToggle": `position: relative; width: 36px; height: 20px; padding: 2px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eLinkToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eShareActionLink[on] .eLinkToggle div": `right: 2px`,
    ".eShareActionLink[off] .eLinkToggle div": `right: calc(100% - 22px)`,
    ".eShareActionLink:hover": `background: var(--themeColor); --borderWidth: 0px; transform: scale(1.1); color: var(--color)`,
    ".eShareActionLink:hover .eLinkToggle": `background: #fff`,
    ".eShareActionLink:hover .eLinkToggle div": `background: var(--themeColor)`
    */
  },
  js: async function (frame) {
    frame.style.padding = "8px";

    let editor = await getModule("pages/editor");
    let createHolder = frame.querySelector(".eShareLinkCreate");
    let createButton = createHolder.querySelector("button");
    let linkTx = frame.querySelector(".eShareLinkSection");
    let accessButton = frame.querySelector(".eShareLinkPerm");
    let accessIcon = accessButton.querySelector(".eShareLinkIcon");
    let accessTitle = accessButton.querySelector(".eShareDetailTitle");
    let accessDesc = accessButton.querySelector(".eShareDetailDesc");

    frame.querySelector(".eShareLinkCopy").addEventListener("click", async () => {
      copyClipboardText("https://" + linkTx.value, "link");
    });

    /*
    let actionButton = frame.querySelector(".eShareActionLink");
    let updateAction = () => {
      if (editor.lesson.settings.forceLogin == true) {
        actionButton.setAttribute("on", "");
        actionButton.removeAttribute("off");
      } else {
        actionButton.setAttribute("off", "");
        actionButton.removeAttribute("on");
      }
    }
    updateAction();
    */

    editor.updateLink = async () => {
      if (editor.lesson.access != null && editor.lesson.access > -1) {
        createHolder.style.opacity = 0;
        createHolder.style.pointerEvents = "none";
      } else {
        createHolder.style.opacity = 1;
        createHolder.style.pointerEvents = "all";
      }
      if (editor.lesson.access != 1) {
        // Viewer:
        accessIcon.src = "./images/editor/share/viewer.svg";
        accessTitle.textContent = "Public View Access";
        accessDesc.textContent = "Anyone with this link will be able to view the document, but not make any edits.";
      } else {
        // Editor:
        accessIcon.src = "./images/editor/share/editor.svg";
        accessTitle.textContent = "Public Edit Access";
        accessDesc.textContent = "Anyone with this link will be able to view the document and create annotations.";
      }
      if (editor.lesson.settings == null || editor.lesson.settings.forceLogin != true || account.tenant == null || account.tenant.flags == null || account.tenant.flags.require_login_link_auth_classlink != true) {
        linkTx.value = "markify.link/join?lesson=" + editor.id;
      } else {
        linkTx.value = "markify.link/join?lesson=" + editor.id + "&auth=classlink";
      }
     //updateAction();
    }
    editor.updateLink();
    createButton.addEventListener("click", async () => {
      createButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/share/link/enable", null, { session: editor.session });
      if (code == 200) {
        editor.lesson.access = body.access;
        editor.updateLink();
      }
      createButton.removeAttribute("disabled");
    });
    accessButton.addEventListener("click", async () => {
      accessButton.setAttribute("disabled", "");
      let newValue = 1;
      let existingValue = editor.lesson.access;
      if (existingValue == 1) {
        newValue = 0;
      }
      editor.lesson.access = newValue;
      editor.updateLink();
      let [code] = await sendRequest("PUT", "lessons/setting", { set: "publicAccess", value: newValue }, { session: editor.session });
      if (code != 200) {
        editor.lesson.access = existingValue;
        editor.updateLink();
      }
      editor.updateLink();
      accessButton.removeAttribute("disabled");
    });
    let removeButton = frame.querySelector(".eShareLinkRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/link/remove", null, { session: editor.session });
      if (code == 200) {
        delete editor.lesson.access;
        editor.updateLink();
      }
      removeButton.removeAttribute("disabled");
    });
    /*
    actionButton.addEventListener("click", async () => {
      actionButton.setAttribute("disabled", "");
      if (editor.lesson.settings.forceLogin == true) {
        actionButton.setAttribute("off", "");
        actionButton.removeAttribute("on");
      } else {
        actionButton.setAttribute("on", "");
        actionButton.removeAttribute("off");
      }
      let [code] = await sendRequest("PUT", "lessons/setting", { set: "forceLogin", value: actionButton.hasAttribute("on") }, { session: editor.session });
      if (code != 200) {
        updateAction();
      }
      actionButton.removeAttribute("disabled");
    });
    */
  }
}