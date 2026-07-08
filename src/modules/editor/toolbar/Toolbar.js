import { sleep } from "@/crucial";

import { tools } from "./tools";

import { hexToRGBString } from "../utils/hex-to-rgb-string";

export class Toolbar {
  constructor(toolbar) {
    this.toolbar = toolbar;
    this.editor = toolbar.editor;
  }

  toolbar = {};

  update(update) {
    if (this.toolbar.currentToolButton != null) {
      let toolbar = this.toolbar.currentToolButton.closest(".eToolbar");
      if (this.toolbar.subToolbar != null) {
        let contentContainer = this.toolbar.subToolbar.querySelector(".eSubToolContainer");
        let contentHolder = contentContainer.querySelector(".eSubToolContentHolder");
        let contentScroll = contentHolder.querySelector(".eSubToolContentScroll");

        let toolsRect = toolbar.getBoundingClientRect();
        let buttonRect = this.toolbar.currentToolButton.getBoundingClientRect();

        contentScroll.style.setProperty("--maxHeight", toolbar.clientHeight + "px");

        let toolbarHeight = toolbar.offsetHeight;
        let subtoolHeight = contentScroll.offsetHeight;
        let setSubToolTop = buttonRect.top - toolsRect.top - 2; // 2 Pixels from top
        if (setSubToolTop + subtoolHeight > toolbarHeight) {
          setSubToolTop = toolbarHeight - subtoolHeight;
        } else if (setSubToolTop < 0) {
          setSubToolTop = 0;
        }
        /*if (subtoolHeight >= toolbarHeight) {
          setSubToolTop += 4;
        }*/
        contentContainer.style.top = (setSubToolTop + 12) + "px"; // 12 pixels to account for padding

        if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
          if (setSubToolTop < 13) {
            toolbar.style.borderTopRightRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-top-right-radius");
          }
          toolbar.style.removeProperty("border-top-left-radius");
          if (setSubToolTop + subtoolHeight > toolbarHeight - 12) {
            toolbar.style.borderBottomRightRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-bottom-right-radius");
          }
          toolbar.style.removeProperty("border-bottom-left-radius");
        } else {
          if (setSubToolTop < 13) {
            toolbar.style.borderTopLeftRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-top-left-radius");
          }
          toolbar.style.removeProperty("border-top-right-radius");
          if (setSubToolTop + subtoolHeight > toolbarHeight - 12) {
            toolbar.style.borderBottomLeftRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-bottom-left-radius");
          }
          toolbar.style.removeProperty("border-bottom-right-radius");
        }
        
        contentHolder.style.width = contentScroll.offsetWidth + "px";
        contentHolder.style.height = contentScroll.offsetHeight + "px";

        this.toolbar.subToolbar.setAttribute("open", "");
        contentContainer.style.transform = "translateX(0%)";
        contentContainer.style.opacity = 1;

        contentContainer.style.transition = "top .25s, opacity .25s, transform .25s, border-radius .25s";
        contentHolder.style.transition = "width .25s, height .25s";
      } else {
        toolbar.style.removeProperty("border-top-right-radius");
        toolbar.style.removeProperty("border-bottom-right-radius");
        toolbar.style.removeProperty("border-top-left-radius");
        toolbar.style.removeProperty("border-bottom-left-radius");
      }
    }

    if (this.toolbar.currentSubToolButton != null) {
      let toolbar = this.toolbar.currentSubToolButton.closest(".eSubToolContainer");
      if (this.toolbar.subSubToolbar != null) {
        let contentContainer = this.toolbar.subSubToolbar.querySelector(".eSubToolContainer");
        let contentHolder = contentContainer.querySelector(".eSubToolContentHolder");
        let contentScroll = contentHolder.querySelector(".eSubToolContentScroll");

        let toolsRect = toolbar.getBoundingClientRect();
        let buttonRect = this.toolbar.currentSubToolButton.getBoundingClientRect();

        contentScroll.style.setProperty("--maxHeight", toolbar.clientHeight + "px");

        let toolbarHeight = toolbar.offsetHeight;
        let subtoolHeight = contentScroll.offsetHeight;
        let setSubToolTop = buttonRect.top - toolsRect.top - 2; // 2 Pixels from top
        if (setSubToolTop + subtoolHeight > toolbarHeight) {
          setSubToolTop = toolbarHeight - subtoolHeight;
        } else if (setSubToolTop < 0) {
          setSubToolTop = 0;
        }
        /*if (subtoolHeight >= toolbarHeight) {
          setSubToolTop += 4;
        }*/
        contentContainer.style.top = (setSubToolTop + 12) + "px"; // 12 pixels to account for padding

        if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
          if (setSubToolTop < 13) {
            toolbar.style.borderTopRightRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-top-right-radius");
          }
          toolbar.style.removeProperty("border-top-left-radius");
          if (setSubToolTop + subtoolHeight > toolbarHeight - 12) {
            toolbar.style.borderBottomRightRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-bottom-right-radius");
          }
          toolbar.style.removeProperty("border-bottom-left-radius");
        } else {
          if (setSubToolTop < 13) {
            toolbar.style.borderTopLeftRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-top-left-radius");
          }
          toolbar.style.removeProperty("border-top-right-radius");
          if (setSubToolTop + subtoolHeight > toolbarHeight - 12) {
            toolbar.style.borderBottomLeftRadius = "0px";
          } else {
            toolbar.style.removeProperty("border-bottom-left-radius");
          }
          toolbar.style.removeProperty("border-bottom-right-radius");
        }
        
        contentHolder.style.width = contentScroll.offsetWidth + "px";
        contentHolder.style.height = contentScroll.offsetHeight + "px";

        this.toolbar.subSubToolbar.setAttribute("open", "");
        contentContainer.style.transform = "translateX(0%)";
        contentContainer.style.opacity = 1;

        contentContainer.style.transition = "top .25s, opacity .25s, transform .25s, border-radius .25s";
        contentHolder.style.transition = "width .25s, height .25s";
      } else {
        toolbar.style.removeProperty("border-top-right-radius");
        toolbar.style.removeProperty("border-bottom-right-radius");
        toolbar.style.removeProperty("border-top-left-radius");
        toolbar.style.removeProperty("border-bottom-left-radius");
      }
    }

    if (update != false) {
      this.toolbar.tooltip.update();
    }
  }

  async updateButtons(contentHolder, options) {
    options = options ?? {};

    let gottenTools = (contentHolder ?? this.toolbar.getToolbar()).querySelectorAll(".eTool");
    for (let i = 0; i < gottenTools.length; i++) {
      let tool = gottenTools[i];
      let div = tool.querySelector("div");
      if (tool.hasAttribute("tool") == true) {
        let toolType = tool.getAttribute("tool");
        let toolPreference = this.editor.preferences.state.tools[toolType] ?? this.editor.preferences.state.tools[this.toolbar.currentTool] ?? {};
        let subtool = toolPreference.subtool;
        if (subtool != null) {
          let toolData = tools[toolType] ?? {};
          if (toolData.icon != null && div.getAttribute("icon") != subtool) {
            div.setAttribute("icon", subtool)
            let icon = toolData.icon({ toolbar: this, tool: subtool });
            if (icon != null) {
              div.innerHTML = icon;
            }
          }
          let subtoolPreference = this.editor.preferences.state.tools[subtool];
          if (subtoolPreference != null) {
            toolPreference = subtoolPreference;
          }
        }
        if (toolPreference.color != null) {
          div.style.setProperty("--toolColor", "#" + toolPreference.color.selected);
          div.style.setProperty("--toolColorOpacity", hexToRGBString(toolPreference.color.selected, (toolPreference.opacity ?? 100) / 100));
        }
        div.style.setProperty("--toolOpacity", (toolPreference.opacity ?? 100) / 100);
      } else if (tool.hasAttribute("module") == true) {
        if (this.toolbar.subToolbar != null) {
          if (options.ignore != true) {
            let newModule = await this.toolbar.loadModule(tool.getAttribute("module"));
            if (newModule != null) {
              newModule.toolbar = this.toolbar;
              newModule.editor = this.editor;
              if (newModule.setToolbarButton != null) {
                newModule.setToolbarButton(div);
              }
            }
            tool.removeAttribute("disabled");
          } else {
            tool.setAttribute("disabled", "");
          }
        }
      }
    }
    if (this.toolbar.currentToolModule != null && this.toolbar.currentMouseSVG != null) {
      this.toolbar.updateMouse(this.toolbar.currentToolModule.MOUSE ?? { type: "set" });
    }
  }

  async createSubSub(modulePath) {
    if (this.toolbar.currentSubToolButton == null || modulePath == null) {
      return;
    }
    let toolbar = this.toolbar.currentSubToolButton.closest(".eSubToolContainer");
    toolbar.insertAdjacentHTML("beforeend", `<div class="eSubToolHolder" option new>
      <div class="eSubToolContainer" tabindex="-1" option>
        <div class="eSubToolShadow"></div>
        <div class="eSubToolContentHolder">
          <div class="eSubToolContentScroll hideScroll">
            <div class="eSubToolContent" closetooltip noselect></div>
          </div>
        </div>
      </div>
    </div>`);
    this.toolbar.subSubToolbar = toolbar.querySelector(".eSubToolHolder[new]");
    this.toolbar.subSubToolbar.removeAttribute("new");
    let contentContainer = this.toolbar.subSubToolbar.querySelector(".eSubToolContainer");
    if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
      contentContainer.style.transform = "translateX(-100%)";
    } else {
      contentContainer.style.transform = "translateX(100%)";
    }
    this.toolbar.applyToolModule(await this.toolbar.setFrame(
      this.toolbar.getModule(modulePath),
      this.toolbar.subSubToolbar.querySelector(".eSubToolContent"),
      { construct: { editor: this.editor, toolbar: this.toolbar, isToolbar: true } }
    ));

    contentContainer.focus();
  }
  closeSubSub(update) {
    if (this.toolbar.subSubToolbar == null) {
      return;
    }
    let removeToolbar = this.toolbar.subSubToolbar;
    this.toolbar.subSubToolbar = null;
    if (update == true && this.toolbar.currentSubToolButton != null) {
      this.toolbar.currentSubToolButton.removeAttribute("selected");
      this.toolbar.currentSubToolButton.removeAttribute("extend");
    }
    this.toolbar.applyToolModule();
    if (update != false) {
      this.update(false);
    }
    (async () => {
      removeToolbar.style.zIndex = 1;
      let contentContainer = removeToolbar.querySelector(".eSubToolContainer");
      if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
        contentContainer.style.transform = "translateX(-100%)";
      } else {
        contentContainer.style.transform = "translateX(100%)";
      }
      contentContainer.style.opacity = 0;
      await sleep(300);
      if (removeToolbar != null) {
        removeToolbar.remove();
      }
    })();
  }

  async createSub() {
    if (this.toolbar.currentToolButton == null) {
      return;
    }
    let toolData = tools[this.toolbar.currentTool] ?? {};
    this.toolbar.currentSubTool = toolData.id;
    if (toolData.module != null) {
      return toolData;
    }

    let toolbar = this.toolbar.currentToolButton.closest(".eToolbar");
    toolbar.insertAdjacentHTML("beforeend", `<div class="eSubToolHolder" new>
      <div class="eSubToolContainer" tabindex="-1" keeptooltip>
        <div class="eSubToolShadow"></div>
        <div class="eSubToolContentHolder">
          <div class="eSubToolContentScroll hideScroll">
            <div class="eSubToolContent" keeptooltip></div>
          </div>
        </div>
      </div>
    </div>`);
    this.toolbar.subToolbar = toolbar.querySelector(".eSubToolHolder[new]");
    this.toolbar.subToolbar.removeAttribute("new");
    let contentContainer = this.toolbar.subToolbar.querySelector(".eSubToolContainer");
    if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
      contentContainer.style.transform = "translateX(-100%)";
    } else {
      contentContainer.style.transform = "translateX(100%)";
    }

    this.toolbar.subToolbar.querySelector(".eSubToolContentScroll").addEventListener("scroll", () => { this.update(); });

    let contentHolder = this.toolbar.subToolbar.querySelector(".eSubToolContent");
    if (toolData.frame != null) {
      await this.toolbar.setFrame(
        this.toolbar.getModule(toolData.frame),
        contentHolder,
        { construct: { editor: this.editor, toolbar: this.toolbar, isToolbar: true } }
      );
    } else if (toolData.html != null) {
      contentHolder.innerHTML = toolData.html;
    }

    contentContainer.focus();

    return toolData;
  }
  closeSub(update) {
    if (this.toolbar.subToolbar == null) {
      return;
    }
    let removeToolbar = this.toolbar.subToolbar;
    this.toolbar.subToolbar = null;
    if (update == true && this.toolbar.currentToolButton != null) {
      this.toolbar.currentToolButton.removeAttribute("extend");
    }
    this.update(false);
    this.closeSubSub(false);
    (async () => {
      removeToolbar.style.zIndex = 1;
      let contentContainer = removeToolbar.querySelector(".eSubToolContainer");
      if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
        contentContainer.style.transform = "translateX(-100%)";
      } else {
        contentContainer.style.transform = "translateX(100%)";
      }
      contentContainer.style.opacity = 0;
      await sleep(300);
      if (removeToolbar != null) {
        removeToolbar.remove();
      }
    })();
  }

  async enableTool(button, shortPress, noExtend, passData) {
    let toolID = button.getAttribute("tool");
    let isSelected = button.hasAttribute("selected");
    let isExtended = button.hasAttribute("extend");
    let ignoreButtonUpdate = button.hasAttribute("ignore");
    
    let lastSelectedQuery = "button[selected]";
    if (button.hasAttribute("option") == true) {
      lastSelectedQuery += "[option]";
    }
    let lastSelected = button.parentElement.querySelectorAll(lastSelectedQuery);
    for (let i = 0; i < lastSelected.length; i++) {
      let prev = lastSelected[i];
      if (prev != button && prev.hasAttribute("noselect") == false) {
        prev.removeAttribute("selected");
        prev.removeAttribute("extend");
      }
    }
    if (isSelected == false) {
      button.setAttribute("selected", "");
    }

    if (button.closest(".eToolbarContent") != null) { // Toolbar button
      if (shortPress == true) {
        this.closeSub();
        if (isExtended == false) {
          let toolData = await this.createSub();
          if (this.toolbar.subToolbar != null) {
            let selectTool = (this.editor.preferences.state.tools[toolID] ?? {}).subtool;
            if (selectTool != null) {
              let selectSubtool = this.toolbar.subToolbar.querySelector('.eTool[tool="' + selectTool + '"]');
              if (selectSubtool != null) {
                if (selectSubtool.hasAttribute("ignore") == true) {
                  let subtoolHolder = this.toolbar.subToolbar.querySelector(".eVerticalToolsHolder");
                  if (subtoolHolder != null) {
                    let firstTool = subtoolHolder.firstElementChild;
                    if (firstTool != null) {
                      this.toolbar.currentSubTool = firstTool.getAttribute("tool");
                      this.toolbar.currentToolModulePath = firstTool.getAttribute("module");
                      await this.updateButtons(subtoolHolder);
                    }
                  }
                  ignoreButtonUpdate = true;
                }
                this.toolbar.currentSubTool = selectTool;
                this.toolbar.currentToolModulePath = selectSubtool.getAttribute("module");
                selectSubtool.setAttribute("selected", "");
              }
            } else {
              this.toolbar.currentToolModulePath = null;
            }
            if (noExtend == true) {
              this.closeSub();
            }
          } else {
            this.toolbar.currentToolModulePath = toolData.module;
            this.toolbar.tooltip.update();
          }
          this.toolbar.activateTool(passData);
          this.updateButtons(this.toolbar.subToolbar, { ignore: ignoreButtonUpdate });
        } else {
          this.toolbar.tooltip.update();
        }
      } else {
        if (this.toolbar.subToolbar != null) {
          button.setAttribute("extend", "");
        } else {
          button.removeAttribute("extend");
        }
      }
    } else if (button.closest(".eSubToolContentScroll") != null) { // SubToolbar Button
      if (button.hasAttribute("option") == false) { // Subtool
        this.closeSubSub();
        if (shortPress == true) {
          this.toolbar.currentSubTool = button.getAttribute("tool");
          this.toolbar.currentToolModulePath = button.getAttribute("module");
          this.toolbar.activateTool(passData);
          this.updateButtons(null, { ignore: ignoreButtonUpdate });
        }
      } else { // Option
        if (shortPress == true) {
          this.closeSubSub();
          if (isSelected == false) {
            this.toolbar.currentSubToolButton = button;
            this.createSubSub(button.getAttribute("module"));
          } else {
            button.removeAttribute("selected");
          }
        } else {
          if (isExtended == false) {
            button.setAttribute("extend", "");
          } else {
            button.removeAttribute("extend");
            button.removeAttribute("selected");
          }
        }
      }
    }
  }
  async setTool(targetButton, shortPress, noExtend, passData) {
    let button = targetButton ?? this.lastSetButton;
    if (button == null || button.className != "eTool" || button.closest("[noselect]") != null) {
      return;
    }
    if (this.editor.isThisPage(button) == false) {
      return;
    }
    let toolID = button.getAttribute("tool");
    if (this.toolbar.checkToolEnabled(toolID) == false) {
      return this.editor.openAlert("warning", "<b>Tool Toggle</b>The lesson owner has disabled this tool.");
    }

    if (targetButton != null) {
      this.lastSetButton = targetButton;
    } else {
      this.lastSetButton = null;
    }

    if (button.closest(".eToolbarContent") != null) {
      this.toolbar.currentTool = toolID;
      this.toolbar.currentToolButton = button;
      await this.enableTool(button, shortPress, noExtend, passData);
    } else if (button.closest(".eSubToolContentScroll") != null) {
      let setSubTool = button.getAttribute("tool");
      if (setSubTool != null) {
        this.toolbar.currentSubTool = setSubTool;
        let toolPreference = this.editor.preferences.state.tools[this.toolbar.currentTool] ?? {};
        if (toolPreference.subtool != null) {
          toolPreference.subtool = this.toolbar.currentSubTool;
          this.editor.preferences.save();
        }
        await this.enableTool(button, shortPress, null, passData);
      } else {
        await this.enableTool(button, shortPress, null, passData);
      }
    }

    if (shortPress != true) {
      this.update(false);
      this.toolbar.tooltip.update();
    }
  }
  async startTool(button, noExtend, passData) {
    await this.setTool(button, true, noExtend, passData);
    await this.setTool();
  }

  checkToolToggle() {
    if (this.toolbar.toolbarHolder == null) {
      return;
    }

    let disabledTools = (this.editor.settings ?? {}).disabled ?? [];

    let toolElements = this.toolbar.toolbarHolder.querySelectorAll(".eTool[tool]");
    for (let i = 0; i < toolElements.length; i++) {
      let tool = toolElements[i];
      if (this.editor.self.access > 3 || disabledTools.includes(tool.getAttribute("tool")) == false) {
        tool.removeAttribute("off");
      } else {
        tool.setAttribute("off", "");
      }
    }
    if (disabledTools.includes(this.toolbar.currentTool) == true && this.editor.self.access > 0) {
      this.editor.openAlert("warning", "<b>Tool Toggle</b>Your current tool was disabled by the lesson owner.");
      this.setTool(this.toolbar.getToolbar().querySelector('.eToolbar:not([hidden]) .eTool[tool="selection"]'), true);
      this.setTool();
    }
  }
}