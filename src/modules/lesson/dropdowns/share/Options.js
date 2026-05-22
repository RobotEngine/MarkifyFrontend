import { sendRequest } from "@/crucial";

import drawIcon from "@modules/editor/icons/toolbar/draw.svg?raw";
import markupIcon from "@modules/editor/icons/toolbar/markup.svg?raw";
import eraseIcon from "@modules/editor/icons/toolbar/erase.svg?raw";
import textIcon from "@modules/editor/icons/toolbar/text.svg?raw";
import shapeIcon from "@modules/editor/icons/toolbar/shape.svg?raw";
import stickyIcon from "@modules/editor/icons/toolbar/sticky.svg?raw";
import commentIcon from "@modules/editor/icons/toolbar/comment.svg?raw";
import pageIcon from "@modules/editor/icons/toolbar/page.svg?raw";
import mediaIcon from "@modules/editor/icons/toolbar/media.svg?raw";

export class Frame {
  html = `
  <div class="eShareOptionSwitcherHolder">
    <div class="eShareOptionSwitcher">
      <button section="settings" selected>Settings</button>
      <button section="tooltoggle">Tool Toggle</button>
    </div>
  </div>
  <div class="eShareOptionContent">
    <div class="eShareOptionSection" section="settings">
      <button class="eShareActionOption border" option="forceLogin" title="Require those joining to login for verified identites."><div label>Require Login</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="editOthersWork" title="When enabled, disables the collaborator lock on all annotations making everything editable."><div label>Modify Other's Work</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="anonymousMode" title="Hide all member names and colors in cursors."><div label>Anonymous Mode</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="allowExport" title="Allow members to export, print, or copy the lesson."><div label>Allow Exporting</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="allowHistory" title="Allow members to view the timeline history."><div label>Allow Timeline History</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="allowReactions" title="Allow members to react on sticky notes."><div label>Allow Reactions</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="observeViewers" title="Allow members to observe those who aren't editing."><div label>Observe Viewers</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareSaveDefault border" title="Save as the default for new lessons.">Save as Default</button>
    </div>
    <div class="eShareOptionSection" section="tooltoggle">
      <div class="eShareToolToggleAllHolder">
        <button class="eShareToolToggleAll border" on title="Toggle all tools on.">All On</button>
        <button class="eShareToolToggleAll border" off title="Toggle all tools off.">All Off</button>
      </div>
      <div class="eShareToolToggle">
        <div class="eShareToolToggleBar">
          <button class="eShareToolToggleBarTool" tool="draw"><div style="--toolColor: #de84ff; --toolColorOpacity: rgba(222, 132, 255, 1); --toolOpacity: 1">${drawIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="markup" style="--toolColor: #ffc24b; --toolColorOpacity: rgba(255, 194, 75, 0.5); --toolOpacity: 0.5"><div>${markupIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="erase"><div>${eraseIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="text" style="--toolColor: #0084FF; --toolColorOpacity: rgba(0, 132, 255, 1); --toolOpacity: 1"><div>${textIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="shape" style="--toolColor: #fb4c6c; --toolColorOpacity: rgba(251, 76, 108, 1); --toolOpacity: 1"><div>${shapeIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="sticky" style="--toolColor: #fadca0; --toolColorOpacity: rgba(250, 220, 160, 1); --toolOpacity: 1"><div>${stickyIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="comment"><div>${commentIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="page"><div>${pageIcon}</div></button>
          <button class="eShareToolToggleBarTool" tool="media"><div>${mediaIcon}</div></button>
        </div>
        <div class="eShareToolToggleInfo">
          <div class="eShareToolToggleRow">
            <div title>Draw</div>
            <div line></div>
            <button class="eShareActionOption border" option="draw"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Markup</div>
            <div line></div>
            <button class="eShareActionOption border" option="markup"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Erase</div>
            <div line></div>
            <button class="eShareActionOption border" option="erase"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Text Box</div>
            <div line></div>
            <button class="eShareActionOption border" option="text"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Shapes</div>
            <div line></div>
            <button class="eShareActionOption border" option="shape"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Stickies</div>
            <div line></div>
            <button class="eShareActionOption border" option="sticky"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Comments</div>
            <div line></div>
            <button class="eShareActionOption border" option="comment"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow" tool="page">
            <div title>Page</div>
            <div line></div>
            <button class="eShareActionOption border" option="page"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Media</div>
            <div line></div>
            <button class="eShareActionOption border" option="media"><div class="eOptionToggle"><div></div></div></button>
          </div>
        </div>
      </div>
      <button class="eShareSaveDefault border" title="Save as the default for new lessons.">Save as Default</button>
    </div>
  </div>
  `;
  css = {
    ".eShareOptionSwitcherHolder": `position: sticky; box-sizing: border-box; width: 100%; padding: 8px; left: 0px; top: 0px; background: var(--pageColor); z-index: 2`,
    ".eShareOptionSwitcher": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 4px; width: 100%; padding: 4px; box-shadow: var(--lightShadow); border-radius: 20px`,
    ".eShareOptionSwitcher button": `flex: 1 1 120px; padding: 6px; border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eShareOptionSwitcher button:hover": `background: var(--hover)`,
    ".eShareOptionSwitcher button[selected]": `background: var(--theme); color: #fff`,

    ".eShareOptionContent": `position: relative; z-index: 1`,
    ".eShareOptionSection": `position: absolute; display: none; box-sizing: border-box; width: fit-content; max-width: 100%; height: fit-content; padding: 8px; left: 0px; top: 0px; transition: .4s`,
    ".eShareSaveDefault": `height: fit-content; padding: 6px 10px; margin: 8px 0 6px; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 16px; font-weight: 600`,
    ".eShareSaveDefault:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".eShareSaveDefault:active": `transform: scale(1.02) !important`,

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
    ".eShareActionOption:hover .eOptionToggle div": `background: var(--themeColor)`,
    ".eShareActionOption:active": `transform: scale(.98) !important`,

    ".eShareToolToggleAllHolder": `display: flex; flex-wrap: wrap; width: 314px; max-width: 100%; gap: 12px; justify-content: center`,
    ".eShareToolToggleAll": `height: fit-content; padding: 6px 10px; --borderWidth: 3px; --borderRadius: 16px; color: var(--themeColor); font-size: 16px; font-weight: 600`,
    ".eShareToolToggleAll[on]": `--themeColor: var(--theme)`,
    ".eShareToolToggleAll[off]": `--themeColor: var(--activeGray)`,
    ".eShareToolToggleAll:hover": `background: var(--themeColor); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".eShareToolToggleAll:active": `transform: scale(1.02) !important`,
    
    ".eShareToolToggle": `position: relative; display: flex; width: 314px; max-width: 100%`,
    ".eShareToolToggleBar": `display: flex; flex-direction: column; margin: 8px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px; align-items: center; pointer-events: none`,
    ".eShareToolToggleBarTool": `--hoverColor: var(--hover); width: 50px; height: 46px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
    ".eShareToolToggleBarTool > div": `display: flex; width: 42px; height: 42px; margin: 0 4px; justify-content: left; align-items: center; overflow: hidden`,
    ".eShareToolToggleBarTool > div > svg": `width: 40px; height: 40px; margin: 1px`,
    ".eShareToolToggleInfo": `display: flex; flex-direction: column; flex: 1; margin: 8px 0; align-items: center`,
    ".eShareToolToggleInfo .eShareActionOption": `padding: 4px; margin: 6px 6px 6px 0px`,
    ".eShareToolToggleInfo .eShareActionOption:active": `margin: 6px 6px 6px -1px`,
    ".eShareToolToggleRow": `display: flex; width: 100%; height: 46px; flex-shrink: 0; align-items: center`,
    ".eShareToolToggleRow div[title]": `font-size: 16px; font-weight: 600; margin: 0 8px 0 2px; white-space: nowrap`,
    ".eShareToolToggleRow div[line]": `flex: 1; height: 3px; border-radius: 2px; transition: .2s`,
    ".eShareToolToggleRow button": `width: fit-content !important`
  };
  js(frame, extra) {
    let dropdownContent = frame.closest(".dropdownContent");
    dropdownContent.style.padding = "0px";

    let parent = extra.parent;
    let lesson = parent.parent;

    let switcher = frame.querySelector(".eShareOptionSwitcher");
    let contentHolder = frame.querySelector(".eShareOptionContent");
    let settingSection = contentHolder.querySelector('.eShareOptionSection[section="settings"]');
    let tooltoggleSection = contentHolder.querySelector('.eShareOptionSection[section="tooltoggle"]');
    let overflowSetTimeout;
    let openSection = (section) => {
      let selected = switcher.querySelector("button[selected]");
      if (selected != null) {
        selected.removeAttribute("selected");
      }
      let button = switcher.querySelector('button[section="' + section + '"]');
      if (button != null) {
        button.setAttribute("selected", "");
      }
      
      dropdownContent.scrollTo(0, 0);
      dropdownContent.style.overflow = "unset";
      clearTimeout(overflowSetTimeout);

      if (section == "settings") {
        settingSection.style.position = "relative";
        settingSection.style.display = "block";
        settingSection.offsetHeight;
        settingSection.style.transform = "translate(0px)";

        tooltoggleSection.style.removeProperty("position");
        tooltoggleSection.style.transform = "translate(100%)";
        overflowSetTimeout = setTimeout(() => {
          tooltoggleSection.style.removeProperty("display");
          dropdownContent.style.overflow = "auto";
        }, 400);
      } else if (section == "tooltoggle") {
        tooltoggleSection.style.position = "relative";
        tooltoggleSection.style.display = "block";
        tooltoggleSection.offsetHeight;
        tooltoggleSection.style.transform = "translate(0px)";

        settingSection.style.removeProperty("position");
        settingSection.style.transform = "translate(-100%)";
        overflowSetTimeout = setTimeout(() => {
          settingSection.style.removeProperty("display");
          dropdownContent.style.overflow = "auto";
        }, 400);
      }
    }
    switcher.addEventListener("click", (event) => {
      let button = event.target.closest("button");
      if (button == null) {
        return;
      }
      let section = button.getAttribute("section");
      if (section != null) {
        lesson.preferences.shareOptionLastSection = section;
        openSection(section);
      }
    });
    openSection(lesson.preferences.shareOptionLastSection ?? "settings");
    
    let forceLoginButton = frame.querySelector('.eShareActionOption[option="forceLogin"]');
    let editOthersWorkButton = frame.querySelector('.eShareActionOption[option="editOthersWork"]');
    let allowExportButton = frame.querySelector('.eShareActionOption[option="allowExport"]');
    let allowHistoryButton = frame.querySelector('.eShareActionOption[option="allowHistory"]');
    let allowReactionsButton = frame.querySelector('.eShareActionOption[option="allowReactions"]');
    let observeViewersButton = frame.querySelector('.eShareActionOption[option="observeViewers"]');
    let anonymousModeButton = frame.querySelector('.eShareActionOption[option="anonymousMode"]');
    let toolToggle = frame.querySelector(".eShareToolToggle");
    let toolToggleHolder = toolToggle.querySelector(".eShareToolToggleInfo");
    let toolToogleOptions = toolToggleHolder.querySelectorAll(".eShareActionOption[option]");

    let updateOptions = async () => {
      if (lesson.lesson.settings.forceLogin == true) {
        forceLoginButton.setAttribute("on", "");
        forceLoginButton.removeAttribute("off");
      } else {
        forceLoginButton.setAttribute("off", "");
        forceLoginButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.editOthersWork == true) {
        editOthersWorkButton.setAttribute("on", "");
        editOthersWorkButton.removeAttribute("off");
      } else {
        editOthersWorkButton.setAttribute("off", "");
        editOthersWorkButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.anonymousMode == true) {
        anonymousModeButton.setAttribute("on", "");
        anonymousModeButton.removeAttribute("off");
      } else {
        anonymousModeButton.setAttribute("off", "");
        anonymousModeButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.allowExport != false) {
        allowExportButton.setAttribute("on", "");
        allowExportButton.removeAttribute("off");
      } else {
        allowExportButton.setAttribute("off", "");
        allowExportButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.allowReactions != false) {
        allowReactionsButton.setAttribute("on", "");
        allowReactionsButton.removeAttribute("off");
      } else {
        allowReactionsButton.setAttribute("off", "");
        allowReactionsButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.allowHistory != false) {
        allowHistoryButton.setAttribute("on", "");
        allowHistoryButton.removeAttribute("off");
      } else {
        allowHistoryButton.setAttribute("off", "");
        allowHistoryButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.observeViewers != false) {
        observeViewersButton.setAttribute("on", "");
        observeViewersButton.removeAttribute("off");
      } else {
        observeViewersButton.setAttribute("off", "");
        observeViewersButton.removeAttribute("on");
      }

      if (toolToogleOptions != null) {
        lesson.lesson.settings.disabled = lesson.lesson.settings.disabled ?? [];
        for (let i = 0; i < toolToogleOptions.length; i++) {
          let tool = toolToogleOptions[i];
          let toolName = tool.getAttribute("option");
          let toolImage = toolToggle.querySelector('.eShareToolToggleBarTool[tool="' + toolName + '"]');
          if (lesson.lesson.settings.disabled.includes(toolName) == false) {
            tool.setAttribute("on", "");
            tool.removeAttribute("off");
            tool.parentElement.querySelector("div[line]").style.background = "var(--hover)";
            toolImage.removeAttribute("disabled");
          } else {
            tool.setAttribute("off", "");
            tool.removeAttribute("on");
            tool.parentElement.querySelector("div[line]").style.background = "var(--lightGray)";
            toolImage.setAttribute("disabled", "");
          }
        }
      }
      if (lesson.lesson.settings.observeViewers != false) {
        observeViewersButton.setAttribute("on", "");
        observeViewersButton.removeAttribute("off");
      } else {
        observeViewersButton.setAttribute("off", "");
        observeViewersButton.removeAttribute("on");
      }
    }
    parent.pipeline.subscribe("shareLessonSet", "set", (body) => {
      if (body.hasOwnProperty("settings") == true) {
        updateOptions();
      }
    }, { unsubscribe: true });
    updateOptions();

    forceLoginButton.addEventListener("click", async () => {
      forceLoginButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "forceLogin", value: !forceLoginButton.hasAttribute("on") }, { session: lesson.session });
      forceLoginButton.removeAttribute("disabled");
    });
    editOthersWorkButton.addEventListener("click", async () => {
      editOthersWorkButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "editOthersWork", value: !editOthersWorkButton.hasAttribute("on") }, { session: lesson.session });
      editOthersWorkButton.removeAttribute("disabled");
    });
    anonymousModeButton.addEventListener("click", async () => {
      anonymousModeButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "anonymousMode", value: !anonymousModeButton.hasAttribute("on") }, { session: lesson.session });
      anonymousModeButton.removeAttribute("disabled");
    });
    allowExportButton.addEventListener("click", async () => {
      allowExportButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "allowExport", value: !allowExportButton.hasAttribute("on") }, { session: lesson.session });
      allowExportButton.removeAttribute("disabled");
    });
    allowHistoryButton.addEventListener("click", async () => {
      allowHistoryButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "allowHistory", value: !allowHistoryButton.hasAttribute("on") }, { session: lesson.session });
      allowHistoryButton.removeAttribute("disabled");
    });
    allowReactionsButton.addEventListener("click", async () => {
      allowReactionsButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "allowReactions", value: !allowReactionsButton.hasAttribute("on") }, { session: lesson.session });
      allowReactionsButton.removeAttribute("disabled");
    });
    observeViewersButton.addEventListener("click", async () => {
      observeViewersButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "observeViewers", value: !observeViewersButton.hasAttribute("on") }, { session: lesson.session });
      observeViewersButton.removeAttribute("disabled");
    });

    let toolToggleAllOnButton = frame.querySelector(".eShareToolToggleAll[on]");
    toolToggleAllOnButton.addEventListener("click", async () => {
      toolToggleAllOnButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting/tool", { set: "all", value: true }, { session: lesson.session });
      toolToggleAllOnButton.removeAttribute("disabled");
    });
    let toolToggleAllOffButton = frame.querySelector(".eShareToolToggleAll[off]");
    toolToggleAllOffButton.addEventListener("click", async () => {
      toolToggleAllOffButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting/tool", { set: "all", value: false }, { session: lesson.session });
      toolToggleAllOffButton.removeAttribute("disabled");
    });

    toolToggleHolder.addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest(".eShareActionOption");
      if (button == null) {
        return;
      }
      button.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting/tool", { set: button.getAttribute("option"), value: !(button.hasAttribute("on")) }, { session: lesson.session });
      button.removeAttribute("disabled");
    });

    let saveDefault = async (data) => {
      lesson.preferences.state.share = { ...(lesson.preferences.state.share ?? {}), ...data };
      await lesson.preferences.save();
    }
    let settingDefaultButton = settingSection.querySelector(".eShareSaveDefault");
    settingDefaultButton.addEventListener("click", async () => {
      settingDefaultButton.setAttribute("disabled", "");
      await saveDefault({
        forceLogin: forceLoginButton.hasAttribute("on"),
        editOthersWork: editOthersWorkButton.hasAttribute("on"),
        anonymousMode: anonymousModeButton.hasAttribute("on"),
        allowExport: allowExportButton.hasAttribute("on"),
        observeViewers: observeViewersButton.hasAttribute("on")
      });
      settingDefaultButton.removeAttribute("disabled");
    });
    let toolToggleDefaultButton = tooltoggleSection.querySelector(".eShareSaveDefault");
    toolToggleDefaultButton.addEventListener("click", async() => {
      toolToggleDefaultButton.setAttribute("disabled", "");
      let saveArr = [];
      for (let i = 0; i < toolToogleOptions.length; i++) {
        let option = toolToogleOptions[i];
        if (option.hasAttribute("off") == true) {
          saveArr.push(option.getAttribute("option"));
        }
      }
      await saveDefault({ disabled: saveArr });
      toolToggleDefaultButton.removeAttribute("disabled");
    });
  }
}