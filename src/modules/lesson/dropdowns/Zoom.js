import { body, setLocalStore, textBoxError } from "@/crucial";

export class Frame {
  html = `
  <div class="eZoomHolder">
    <button class="eZoomButton buttonAnim border" sub change="-20">-</button>
    <div class="eZoomLevel border"><div class="eZoomBox" contenteditable>100</div>%</div>
    <button class="eZoomButton buttonAnim border" add change="20">+</button>
  </div>
  <div class="eZoomLine"></div>
  <button class="eZoomAction" option="snapping" local title="Snap elements to guides while moving and resizing."><div label>Snapping</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursors"><div label>Show Cursors</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursornames" local title="Show the member's name when they're annotating."><div label>Cursor Names</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="comments" local title="Show comments on the document."><div label>Comments</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="stylusmode" local title="Only write on the document when using an active stylus, such as the Apple Pencil."><div label>Stylus Mode</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="fullscreen" title="Use Markify in full screen mode."><div label>Full Screen</div><div class="eZoomToggle"><div></div></div></button>
  `;
  css = {
    ".eZoomHolder": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".eZoomButton": `position: relative; display: flex; width: 22px; height: 22px; margin: 20px 3px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 8px; color: var(--theme); font-size: 24px; font-weight: 600; line-height: 0`,
    '.eZoomButton[sub]': `cursor: zoom-out`,
    '.eZoomButton[add]': `cursor: zoom-in`,
    ".eZoomLevel": `display: flex; padding: 3px 6px 3px 3px; margin: 0 12px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eZoomLevel div": `max-width: 50px; min-width: 25px; padding: 3px 6px; margin-right: 3px; border: none; outline: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`,

    ".eZoomLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,

    ".eZoomAction": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eZoomAction:not(:last-child)": `margin-bottom: 4px`,
    ".eZoomAction div[label]": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eZoomAction[on]": `--themeColor: var(--theme)`,
    ".eZoomAction[off]": `--themeColor: var(--gray)`,
    ".eZoomToggle": `position: relative; width: 36px; height: 20px; padding: 2px; margin-left: 12px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eZoomToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eZoomAction[on] .eZoomToggle div": `right: 2px`,
    ".eZoomAction[off] .eZoomToggle div": `right: calc(100% - 22px)`,
    ".eZoomAction:hover": `background: var(--themeColor)`,
    ".eZoomAction[on]:hover": `color: #fff`,
    ".eZoomAction:hover .eZoomToggle": `background: #fff`,
    ".eZoomAction:hover .eZoomToggle div": `background: var(--themeColor)`
  };
  js(frame, extra) {
    let editor = extra.editor;

    let zoomPercentage = frame.querySelector(".eZoomLevel div");
    let zoomAdd = frame.querySelector(".eZoomButton[add]");
    let zoomSub = frame.querySelector(".eZoomButton[sub]");
    let setZoomText = () => {
      zoomPercentage.textContent = Math.round(editor.zoom * 100);
      if (editor.zoom >= 5) {
        zoomAdd.setAttribute("disabled", "");
      } else {
        zoomAdd.removeAttribute("disabled");
      }
      if (editor.zoom <= .2) {
        zoomSub.setAttribute("disabled", "");
      } else {
        zoomSub.removeAttribute("disabled");
      }
      frame.closest(".dropdown").querySelector(".dropdownTitle").textContent = zoomPercentage.textContent + "%";
    }
    editor.pipeline.subscribe("zoomDropdownUpdate", "zoom_change", setZoomText);
    setZoomText();
    let setButtonOptions = frame.querySelectorAll(".eZoomAction");
    for (let i = 0; i < setButtonOptions.length; i++) {
      let buttonToggle = setButtonOptions[i];
      if (editor.options[buttonToggle.getAttribute("option")] == true) {
        buttonToggle.setAttribute("on", "");
      } else {
        buttonToggle.setAttribute("off", "");
      }
    }
    let forceSetZoom = () => {
      editor.setZoom(parseInt(zoomPercentage.textContent) / 100, null, { clientX: editor.pageRect.left + (editor.pageOffsetWidth / 2), clientY: editor.pageRect.top + (editor.pageOffsetHeight / 2) });
    }
    zoomPercentage.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        zoomPercentage.blur();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 500) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 500%");
        }
      }
    });
    let alreadyRunningFocus = false;
    zoomPercentage.addEventListener("focus", () => {
      if (alreadyRunningFocus == true) {
        return;
      }
      alreadyRunningFocus = true;
      zoomPercentage.blur();
      zoomPercentage.innerHTML = "";
      zoomPercentage.focus();
      alreadyRunningFocus = false;
    });
    zoomPercentage.addEventListener("focusout", (event) => {
      if (alreadyRunningFocus == true) {
        return;
      }
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      let textInt = parseInt(textBox.textContent);
      if (isNaN(textInt) == true) {
        setZoomText();
      } else if (textInt > 500) {
        textBox.textContent = "500";
      } else if (textInt < 20) {
        textBox.textContent = "20";
      }
      forceSetZoom();
    });
    let cursorZoomAction = frame.querySelector('.eZoomAction[option="cursors"]');
    let namesZoomAction = frame.querySelector('.eZoomAction[option="cursornames"]');
    let stylusModeZoomAction = frame.querySelector('.eZoomAction[option="stylusmode"]');
    let fullscreenZoomAction = frame.querySelector('.eZoomAction[option="fullscreen"]');
    let updateZoomActions = () => {
      if (editor.parent.parent.signalStrength < 3) {
        cursorZoomAction.style.opacity = 0.5;
        cursorZoomAction.title = "Cursors disabled due to weak connection.";
        namesZoomAction.style.opacity = 0.5;
      } else {
        cursorZoomAction.style.opacity = 1;
        cursorZoomAction.title = "Display the cursors of other editors.";
        namesZoomAction.style.opacity = 1;
      }
    }
    editor.pipeline.subscribe("zoomDropdownSignalStrength", "signal_strength", updateZoomActions);
    updateZoomActions();
    if (cursorZoomAction.hasAttribute("off") == true) {
      namesZoomAction.setAttribute("disabled", "");
    }
    frame.addEventListener("click", (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let zoomChange = element.closest(".eZoomButton");
      if (zoomChange != null) {
        editor.setZoom(
          (
            Math.round(
              (
                Math.round(editor.zoom * 100) + parseInt(zoomChange.getAttribute("change"))
              ) / 20
          ) * 20
        ) / 100, null, { clientX: editor.pageRect.left + (editor.pageOffsetWidth / 2), clientY: editor.pageRect.top + (editor.pageOffsetHeight / 2) });
        return;
      }
      let toggle = element.closest(".eZoomAction");
      if (toggle != null) {
        let option = toggle.getAttribute("option");
        if (toggle.hasAttribute("on")) {
          toggle.setAttribute("off", "");
          toggle.removeAttribute("on");
          editor.options[option] = false;
        } else {
          toggle.setAttribute("on", "");
          toggle.removeAttribute("off");
          editor.options[option] = true;
        }
        if (toggle.hasAttribute("local") == true) {
          this.localOptions = this.localOptions ?? {};
          this.localOptions[option] = editor.options[option];
          setLocalStore("options", JSON.stringify(this.localOptions));
        }
        if (option == "cursors") {
          if (editor.realtime.module != null) {
            editor.realtime.module.setShortSub(editor.visibleChunks);
          }
          if (toggle.hasAttribute("off") == true) {
            if (editor.realtime.module != null) {
              editor.realtime.module.members = {};
            }
            editor.frame.querySelector(".eRealtime").innerHTML = "";
          }
          if (toggle.hasAttribute("on") == true) {
            namesZoomAction.removeAttribute("disabled");
          } else {
            namesZoomAction.setAttribute("disabled", "");
          }
        }
        if (option == "comments" && (editor.toolbar ?? {}).currentToolModulePath != "editor/toolbar/comment") {
          if (toggle.hasAttribute("on") == true) {
            editor.annotationHolder.removeAttribute("hidecomments");
          } else {
            editor.annotationHolder.setAttribute("hidecomments", "");
          }
        }
        if (option == "fullscreen") {
          if (toggle.hasAttribute("on") == true) {
            body.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }
      }
    });

    if (body.requestFullscreen == null || document.exitFullscreen == null) {
      fullscreenZoomAction.remove();
    }

    editor.pipeline.subscribe("zoomDropdownStylusMode", "stylusmodechange", (event) => {
      if (stylusModeZoomAction != null) {
        if (event.stylusmode == true) {
          stylusModeZoomAction.setAttribute("on", "");
          stylusModeZoomAction.removeAttribute("off");
        } else {
          stylusModeZoomAction.setAttribute("off", "");
          stylusModeZoomAction.removeAttribute("on");
        }
      }
    });
    editor.pipeline.subscribe("zoomDropdownFullscreen", "fullscreenchange", (event) => {
      if (fullscreenZoomAction != null) {
        if (event.fullscreen == true) {
          fullscreenZoomAction.setAttribute("on", "");
          fullscreenZoomAction.removeAttribute("off");
        } else {
          fullscreenZoomAction.setAttribute("off", "");
          fullscreenZoomAction.removeAttribute("on");
        }
      }
    });

    if ((extra.remove ?? []).length > 0) {
      let toggles = frame.querySelectorAll(".eZoomAction");
      let toggleCount = toggles.length;
      for (let i = 0; i < toggles.length; i++) {
        let toggle = toggles[i];
        if (extra.remove.includes(toggle.getAttribute("option")) == true) {
          toggle.remove();
          toggleCount--;
        }
      }
      if (toggleCount < 1) {
        frame.querySelector(".eZoomLine").remove();
      }
    }
  }
}