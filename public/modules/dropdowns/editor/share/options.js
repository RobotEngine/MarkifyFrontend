modules["dropdowns/editor/share/options"] = {
  html: `
  <button class="eShareActionOption border" option="forceLogin" title="Require those joining to login for verified identites."><div label>Require Login</div><div class="eOptionToggle"><div></div></div></button>
  <button class="eShareActionOption border" option="editOthersWork" title="Allow members to edit and delete annotations created by other members."><div label>Modify Other's Work</div><div class="eOptionToggle"><div></div></div></button>
  <button class="eShareActionOption border" option="allowExport" title="Allow members to export, print, or copy the lesson."><div label>Allow Exporting</div><div class="eOptionToggle"><div></div></div></button>
  <button class="eShareActionOption border" option="observeViewers" title="Allow members to observe those who aren't editing."><div label>Observe Viewers</div><div class="eOptionToggle"><div></div></div></button>
  `,
  css: {
    ".eShareActionOption": `display: flex; width: 300px; max-width: calc(100% - 14px); padding: 6px; margin: 7px 7px 11px 7px; align-items: center; --borderWidth: 3px; --borderRadius: 18px; justify-content: center; align-items: center; font-size: 16px; font-weight: 700; text-align: left`,
    ".eShareActionOption:last-child": `margin: 7px`,
    ".eShareActionOption div[label]": `flex: 1; margin: 0 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eShareActionOption[on]": `--themeColor: var(--theme); --color: #fff; --borderColor: var(--hover)`,
    ".eShareActionOption[off]": `--themeColor: var(--gray); --color: #000; --borderColor: var(--lightGray)`,
    ".eOptionToggle": `position: relative; width: 36px; height: 20px; padding: 2px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eOptionToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eShareActionOption[on] .eOptionToggle div": `right: 2px`,
    ".eShareActionOption[off] .eOptionToggle div": `right: calc(100% - 22px)`,
    ".eShareActionOption[on]:hover": `background: var(--hover); --borderWidth: 0px; transform: scale(1.05)`,
    ".eShareActionOption[off]:hover": `background: var(--lightGray); --borderWidth: 0px; transform: scale(1.05)`,
    ".eShareActionOption:hover .eOptionToggle": `background: #fff`,
    ".eShareActionOption:hover .eOptionToggle div": `background: var(--themeColor)`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    
    let forceLoginButton = frame.querySelector('.eShareActionOption[option="forceLogin"]');
    let editOthersWorkButton = frame.querySelector('.eShareActionOption[option="editOthersWork"]');
    let allowExportButton = frame.querySelector('.eShareActionOption[option="allowExport"]');
    let observeViewersButton = frame.querySelector('.eShareActionOption[option="observeViewers"]');

    editor.updateOptions = async () => {
      if (editor.lesson.settings.forceLogin == true) {
        forceLoginButton.setAttribute("on", "");
        forceLoginButton.removeAttribute("off");
      } else {
        forceLoginButton.setAttribute("off", "");
        forceLoginButton.removeAttribute("on");
      }
      if (editor.lesson.settings.editOthersWork == true) {
        editOthersWorkButton.setAttribute("on", "");
        editOthersWorkButton.removeAttribute("off");
      } else {
        editOthersWorkButton.setAttribute("off", "");
        editOthersWorkButton.removeAttribute("on");
      }
      if (editor.lesson.settings.allowExport != false) {
        allowExportButton.setAttribute("on", "");
        allowExportButton.removeAttribute("off");
      } else {
        allowExportButton.setAttribute("off", "");
        allowExportButton.removeAttribute("on");
      }
      if (editor.lesson.settings.observeViewers != false) {
        observeViewersButton.setAttribute("on", "");
        observeViewersButton.removeAttribute("off");
      } else {
        observeViewersButton.setAttribute("off", "");
        observeViewersButton.removeAttribute("on");
      }
    }
    editor.updateOptions();

    forceLoginButton.addEventListener("click", async () => {
      forceLoginButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "forceLogin", value: !forceLoginButton.hasAttribute("on") }, { session: editor.session });
      forceLoginButton.removeAttribute("disabled");
    });
    editOthersWorkButton.addEventListener("click", async () => {
      editOthersWorkButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "editOthersWork", value: !editOthersWorkButton.hasAttribute("on") }, { session: editor.session });
      editOthersWorkButton.removeAttribute("disabled");
    });
    allowExportButton.addEventListener("click", async () => {
      allowExportButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "allowExport", value: !allowExportButton.hasAttribute("on") }, { session: editor.session });
      allowExportButton.removeAttribute("disabled");
    });
    observeViewersButton.addEventListener("click", async () => {
      observeViewersButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "observeViewers", value: !observeViewersButton.hasAttribute("on") }, { session: editor.session });
      observeViewersButton.removeAttribute("disabled");
    });
  }
}