import { changeGlobalImports, sleep, copyObject, isValidURL } from "@/crucial";

import { toolbars, mappedToolTypes } from "./toolbar/tools";

import { hexToRGBString } from "./utils/hex-to-rgb-string";

import { rotatedBounds } from "./math";

const toolModules = changeGlobalImports(import.meta.glob("./toolbar/tools/**/*.js", { eager: true }));
const toolModulePath = "./toolbar/tools/";

import moveCursorIcon from "./icons/cursors/move.svg?raw";
import resizeCursorIcon from "./icons/cursors/resize.svg?raw";
import rotateCursorIcon from "./icons/cursors/rotate.svg?raw";

import { Tooltip } from "./toolbar/Tooltip";
import { SideMenu } from "./toolbar/SideMenu";
import { Toolbar } from "./toolbar/Toolbar";
import { Selection } from "./toolbar/Selection";

export class Module {
  constructor(editor) {
    this.editor = editor;

    this.tooltip = new Tooltip(this);
    this.sidemenu = new SideMenu(this);
    this.toolbar = new Toolbar(this);
    this.selection = new Selection(this);
  }

  css = {
    ".eToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,
    ".eToolbar": `--toolbarWidth: 50px; position: absolute; display: block; width: var(--toolbarWidth); height: fit-content; max-height: var(--maxToolbarHeight); top: 50%; transform: translateY(-50%); z-index: 2; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all; transition: transform .4s, opacity .4s, border-radius .2s`,
    ".eToolbar[hidden]": `transform: translate(var(--translate), -50%) !important; z-index: 1 !important`,
    ".eToolbarContent": `position: relative; box-sizing: border-box; max-height: var(--maxToolbarHeight); background: var(--pageColor); overflow-x: hidden; overflow-y: auto; z-index: 3; border-radius: inherit`,
    ".eToolbarHolder[left] .eToolbar": `--translate: -100%; left: 0px; border-radius: 0 12px 12px 0; transform-origin: left center`,
    ".eToolbarHolder[right] .eToolbar": `--translate: 100%; right: 0px; border-radius: 12px 0 0 12px; transform-origin: right center`,
    ".eToolbarTooltip": `position: absolute; display: flex; width: max-content; padding: 3px 6px; z-index: 5; background: var(--pageColor); border-radius: 6px; box-shadow: var(--lightShadow); pointer-events: none; user-select: none; text-wrap: nowrap; font-size: 16px; font-weight: 600; transform: scale(0); opacity: 0`,
    ".eToolMediaInput": `position: absolute; display: block; left: 0px; top: 0px`,

    ".eTool": `--hoverColor: var(--hover); display: flex; flex-shrink: 0; padding: 0; justify-content: center; align-items: center; transition: opacity .3s; outline: none !important`,
    ".eToolbarHolder .eTool": `width: 50px; height: 46px`,
    ".eActionBar .eTool": `width: 46px; height: 50px`,
    ".eTool[hidden]": `display: none !important`,
    ".eTool > *": `pointer-events: none`,
    ".eTool > div": `position: relative; display: flex; width: 42px; height: 42px; border-radius: 8px; transition: .2s`,
    ".eTool > div:after": `content: ""; position: absolute; width: 42px; height: 42px; left: 0px; top: 0px; border-radius: 8px; z-index: 1; transition: .2s`,
    ".eTool > div > *": `z-index: 2`,
    ".eTool > div > svg": `width: 40px; height: 40px; margin: 1px`,
    ".eTool:hover > div:after, .eTool:focus > div:after": `background: var(--hoverColor)`,
    ".eTool:active": `transform: unset !important`,
    ".eTool:active > div": `transform: scale(.95)`,
    ".eTool:active > div:after": `width: 42px !important; height: 42px !important; left: 0px !important; top: 0px !important; border-radius: 8px !important`,
    ".eTool[selected] > div:after": `background: var(--theme)`,
    ".eTool[selected][option] > div:after": `background: var(--secondary) !important`,
    ".eToolbarHolder[left] .eTool[extend] > div:after": `width: 46px; left: 0px; top: 0px; border-radius: 8px 0 0 8px`,
    ".eToolbarHolder[right] .eTool[extend] > div:after": `width: 46px; left: -4px; top: 0px; border-radius: 0 8px 8px 0`,
    ".eActionBar[top] .eTool[extend] > div:after": `height: 46px; left: 0px; top: -4px; border-radius: 0 0 8px 8px`,
    ".eActionBar[bottom] .eTool[extend] > div:after": `height: 46px; left: 0px; top: 0px; border-radius: 8px 8px 0 0`,
    ".eTool[selecthighlight] > div:after": `background: var(--theme)`,
    ".eTool[off]": `opacity: 0.5`,

    ".eDivider": `width: calc(100% - 8px); height: 4px; margin: 2px 0; background: var(--hover); border-radius: 2px`,
    ".eVerticalDivider": `width: 4px; height: calc(100% - 8px); margin: 0 2px; flex-shrink: 0; background: var(--hover); border-radius: 2px`,

    ".eSubToolHolder": `--maxWidth: calc(var(--maxToolbarWidth) - var(--toolbarWidth) - 12px); position: absolute; width: calc(var(--maxWidth) + 4px); height: 100%; padding: 12px; top: -12px; z-index: 2; overflow: hidden; pointer-events: none`,
    ".eSubToolContainer .eSubToolHolder": `--maxWidth: calc(var(--maxToolbarWidth) - (var(--toolbarWidth) * 2) - (8px * 2));`,
    ".eToolbarHolder[left] .eSubToolHolder": `left: calc(100% - 12px)`,
    ".eToolbarHolder[right] .eSubToolHolder": `right: calc(100% - 12px)`,
    ".eSubToolContainer": `position: absolute; width: fit-content; max-width: calc(100% - 28px); max-height: 100%; background: var(--pageColor); opacity: 0; pointer-events: all; transition: opacity .25s, transform .25s; outline: none !important`,
    ".eSubToolContainer:after": `content: ""; position: absolute; width: 4px; height: 100%; top: 0px; background: var(--theme); z-index: 4`,
    ".eToolbarHolder[left] .eSubToolContainer": `left: 12px; padding-left: 4px; border-radius: 0 12px 12px 0`,
    ".eToolbarHolder[right] .eSubToolContainer": `right: 12px; padding-right: 4px; border-radius: 12px 0 0 12px`,
    ".eToolbarHolder[left] .eSubToolContainer:after": `left: 0px`,
    ".eToolbarHolder[right] .eSubToolContainer:after": `right: 0px`,
    ".eSubToolContainer[option]:after": `background: var(--secondary) !important`,
    ".eSubToolShadow": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: none; border-radius: inherit; z-index: -1`,
    ".eSubToolShadow:after": `content: ""; width: 100%; height: 100%; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eSubToolContentHolder": `position: relative; max-width: 100%; background: var(--pageColor); z-index: 3; overflow: hidden; border-radius: inherit`,
    ".eSubToolContentScroll": `width: fit-content; max-height: var(--maxHeight); overflow: auto`,
    ".eSubToolContainer[option] .eSubToolContentScroll": `overflow: visible`,
    ".eVerticalToolsHolder": `display: flex; flex-wrap: wrap; width: 50px; padding: 2px 0; justify-content: center; scrollbar-width: none`,
    ".eVerticalToolsHolder::-webkit-scrollbar": `display: none`,
    ".eHorizontalToolsHolder": `display: flex; padding: 0 2px; align-items: center; scrollbar-width: none`,
    ".eHorizontalToolsHolder::-webkit-scrollbar": `display: none`,

    ".eVerticalToolsShapeContainer": `width: 92px !important; padding: 2px !important`,
    ".eVerticalToolsShapeContainer > .eTool": `width: 46px !important`,

    ".eSideMenu": `position: absolute; display: flex; flex-direction: column; width: fit-content; max-width: calc(100% - 8px); height: fit-content; max-height: var(--maxToolbarHeight); top: 50%; z-index: 3; transform: translate(var(--translate), -50%); opacity: 0; background: var(--pageColor); box-shadow: var(--lightShadow); overflow: hidden; pointer-events: all; transition: transform .4s, opacity .4s, border-radius .2s`,
    ".eToolbarHolder[left] .eSideMenu": `--translate: 100%; right: 0px; border-radius: 12px 0 0 12px; transform-origin: right center`,
    ".eToolbarHolder[right] .eSideMenu": `--translate: -100%; left: 0px; border-radius: 0 12px 12px 0; transform-origin: left center`,
    ".eSideMenu .eSideMenuHeader": `display: flex; padding: 6px; gap: 6px; justify-content: space-between`,
    ".eSideMenu .eSideMenuHeaderTitle": `box-sizing: border-box; padding: 4px; flex: 1; max-width: fit-content; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; font-weight: 500; font-size: 18px`,
    ".eSideMenu .eSideMenuHeaderClose": `position: relative; width: 22px; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 14px`,
    ".eSideMenu .eSideMenuHeaderClose svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eSideMenu .eSideMenuContent": `box-sizing: border-box; min-width: fit-content; width: 100%; height: min-content; max-height: calc(var(--maxToolbarHeight) - 42px); overflow: auto; border-bottom-left-radius: inherit; border-bottom-right-radius: inherit`,

    ".eSelect": `position: absolute; left: 0px; top: 0px; opacity: 0; z-index: 101; border-radius: 9px; transition: all .25s, opacity .15s; pointer-events: none`,
    ".eAnnotation[selected] > *": `pointer-events: none`,
    ".eSelectHandle": `--pointerEvents: all; position: absolute; transition: .1s; --scale: 1`,
    ".eSelectHandle > *": `pointer-events: var(--pointerEvents)`,
    '.eSelectHandle:hover': `--scale: 1.3`,
    '.eSelectHandle:active': `--scale: 1.1 !important`,
    '.eSelectHandle[handle="movetop"]': `width: 100%; height: 10px; pointer-events: var(--pointerEvents); top: -10px`,
    '.eSelectHandle[handle="movebottom"]': `width: 100%; height: 10px; pointer-events: var(--pointerEvents); bottom: -10px`,
    '.eSelectHandle[handle="moveleft"]': `width: 10px; height: 100%; pointer-events: var(--pointerEvents); left: -10px`,
    '.eSelectHandle[handle="moveright"]': `width: 10px; height: 100%; pointer-events: var(--pointerEvents); right: -10px`,
    '.eSelectHandle[handle="topleft"]': `left: -14px; top: -14px`,
    '.eSelectHandle[handle="topright"]': `right: -14px; top: -14px`,
    '.eSelectHandle[handle="bottomleft"]': `left: -14px; bottom: -14px`,
    '.eSelectHandle[handle="bottomright"]': `right: -14px; bottom: -14px`,
    '.eSelectHandle[handle="left"]': `left: -14px; top: 50%; transform: translateY(-50%)`,
    '.eSelectHandle[handle="right"]': `right: -14px; top: 50%; transform: translateY(-50%)`,
    '.eSelectHandle[handle="top"]': `left: 50%; top: -14px; transform: translateX(-50%)`,
    '.eSelectHandle[handle="bottom"]': `left: 50%; bottom: -14px; transform: translateX(-50%)`,
    '.eSelectHandle[handle="rotate"]': `left: -30px; bottom: -30px`,
    ".eSelectHandle[duplicate]": `opacity: 0; --pointerEvents: none`,
    '.eSelectHandle[handle="duplicateleft"]': `left: -50px; top: 50%; transform: translateY(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectHandle[handle="duplicateright"]': `right: -50px; top: 50%; transform: translateY(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectHandle[handle="duplicatetop"]': `left: 50%; top: -50px; transform: translateX(-50%) scale(var(--scale)); cursor: pointer`,
    '.eSelectHandle[handle="duplicatebottom"]': `left: 50%; bottom: -50px; transform: translateX(-50%) scale(var(--scale)); cursor: pointer`,
    ".eSelect[hidehandles] .eSelectHandle": `opacity: 0 !important; --pointerEvents: none !important`,
    ".eSelect[showduplicate]:not([notransition]) .eSelectHandle[duplicate]": `opacity: 1; --pointerEvents: all`,
    ".eSelect[showonlywidth] .eSelectHandle": `opacity: 0; --pointerEvents: none`,
    ".eSelect[showonlywidth] .eSelectHandle[widthhandle]": `opacity: 1 !important; --pointerEvents: all !important`,
    '.eSelect[showonlywidth] .eSelectHandle[move]': `opacity: 1; --pointerEvents: all`,
    '.eSelect[showonlywidth] .eSelectHandle[handle="rotate"]': `opacity: 1; --pointerEvents: all`,
    '.eSelect[hiderotation] .eSelectHandle[handle="rotate"]': `opacity: 0 !important; --pointerEvents: none !important`,
    '.eSelect[hideheighthandles] .eSelectHandle[heighthandle]': `opacity: 0;--pointerEvents: none`,
    '.eSelect[hidewidthhandles] .eSelectHandle[widthhandle]': `opacity: 0; --pointerEvents: none`,
    '.eSelect[hidenonessential] .eSelectHandle:not([essential])': `opacity: 0; --pointerEvents: none`,

    ".eSelectSnap": `position: absolute; left: 0px; top: 0px; z-index: 102; background: var(--secondary); border-radius: 1px; pointer-events: none`,
    ".eSelectSnap div[marker]": `position: absolute; z-index: 102; background: var(--secondary); border-radius: 1px; pointer-events: none`,
    '.eSelectSnap div[marker="snapxleft"]': `width: 2px; height: 16px; left: 0px; top: 50%; transform: translateY(-50%)`,
    '.eSelectSnap div[marker="snapxright"]': `width: 2px; height: 16px; right: 0px; top: 50%; transform: translateY(-50%)`,
    '.eSelectSnap div[marker="snapytop"]': `width: 16px; height: 2px; top: 0px; left: 50%; transform: translateX(-50%)`,
    '.eSelectSnap div[marker="snapybottom"]': `width: 16px; height: 2px; bottom: 0px; left: 50%; transform: translateX(-50%)`,

    ".eActionBar": `position: absolute; display: flex; height: 50px; box-shadow: var(--lightShadow); z-index: 102; border-radius: 12px; transform: translate(-50%, -10%); opacity: 0; transition: transform .2s, opacity .2s, border-radius .2s; outline: none !important`,
    ".eActionToolbar": `display: flex; width: 100%; height: 100%; background: var(--pageColor); overflow-x: auto; overflow-y: hidden; border-radius: inherit; z-index: 2`,
    ".eActionToolbar[locked] > *": `display: none`,
    //".eActionToolbar .eTool[stayonlock]": `display: flex`,
    ".eActionHolder": `position: absolute; width: fit-content; height: fit-content; padding: 12px; left: -12px; z-index: 1; overflow: hidden; pointer-events: none; outline: none !important`,
    ".eActionHolder[top]": `bottom: calc(100% - 12px)`,
    ".eActionHolder[bottom]": `top: calc(100% - 12px)`,
    ".eActionContainer": `position: relative; width: fit-content; background: var(--pageColor); opacity: 0; pointer-events: all`,
    ".eActionContainer:after": `content: ""; position: absolute; width: 100%; height: 4px; left: 0px; background: var(--theme); z-index: 4`,
    ".eActionHolder[top] .eActionContainer": `bottom: 0px; padding-bottom: 4px; border-radius: 12px 12px 0 0`,
    ".eActionHolder[bottom] .eActionContainer": `top: 0px; padding-top: 4px; border-radius: 0 0 12px 12px`,
    ".eActionHolder[top] .eActionContainer:after": `botton: 0px`,
    ".eActionHolder[bottom] .eActionContainer:after": `top: 0px`,
    ".eActionShadow": `position: absolute; display: flex; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: none; border-radius: inherit; z-index: -1`,
    ".eActionShadow:after": `content: ""; width: 100%; height: 100%; box-shadow: var(--lightShadow); border-radius: inherit`,
    ".eActionContainerHolder": `width: 100%; height: 100%; overflow: hidden; border-radius: inherit`,
    ".eActionContainerScroll": `width: fit-content; border-radius: inherit`,
    ".eActionContainerContent": `display: flex; flex-wrap: wrap; gap: 6px; border-radius: inherit`
  };

  getToolbar() {
    if (this.toolbarHolder == null) {
      return;
    }
    return this.toolbarHolder.querySelector(".eToolbar:not([hidden])");
  }

  eventListenerStorage = [];
  clearEventListeners() {
    for (let i = 0; i < this.eventListenerStorage.length; i++) {
      let remEvent = this.eventListenerStorage[i];
      if (remEvent.type == "event" && remEvent.parent != null) {
        remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
      }
      if (remEvent.type == "quill" && remEvent.quill != null) {
        remEvent.quill.off(remEvent.name, remEvent.handler);
      }
    }
    this.eventListenerStorage = [];
  }
  addEventListener(name, parent, listener) {
    if (parent == null) {
      return;
    }
    this.eventListenerStorage.push({ type: "event", name, parent, listener });
    parent.addEventListener(name, listener);
  }
  addQuillEventListener(quill, name, handler) {
    if (quill == null) {
      return;
    }
    this.eventListenerStorage.push({ quill: quill, type: "quill", name, handler });
    quill.on(name, handler);
  }

  currentTool = "selection";
  currentSubTool = "select";
  currentToolModulePath = "selection/select";
  //currentToolButton = null;
  //subToolbar = null;
  //currentSubToolButton = null;
  //subSubToolbar = null;
  //previousToolModule = null;

  checkToolEnabled(check) {
    if (this.editor.self.access > 3) {
      return true;
    }
    if ((this.editor.settings.disabled ?? []).includes(check) == true) {
      return false;
    }
    return true;
  }
  checkSubToolEnabled(check) {
    if (this.editor.self.access > 3) {
      return true;
    }
    let disabled = this.editor.settings.disabled ?? [];
    for (let i = 0; i < disabled.length; i++) {
      let subTool = mappedToolTypes[disabled[i]];
      if (subTool != null && subTool.includes(check) == true) {
        return false;
      }
    }
    return true;
  }

  //currentMouseSVG = null;
  //cursorUpdatePromise = null;
  lastEventTimeStamps = {};
  async updateMouse(cursor) {
    cursor = cursor ?? { type: "set" };
    if (cursor.type == "set") {
      if (cursor.value != this.currentMouseSVG) {
        if (cursor.value != null) {
          this.editor.content.style.cursor = cursor.value;
        } else {
          this.editor.content.style.removeProperty("cursor");
        }
        this.currentMouseSVG = cursor.value;
      }
    } else if (cursor.type == "svg") {
      let insertString = `style="--themeColor: #2F2F2F`;
      if (cursor.rotate != null) {
        insertString += "; transform: rotate(" + cursor.rotate + "deg)";
      }
      if (cursor.color != null) {
        insertString += `; --toolColorOpacity: ${hexToRGBString(cursor.color, (cursor.opacity ?? 100) / 100)}`;
      }
      let getCursorPromise = cursor.svg; //getSVG(cursor.url);
      this.cursorUpdatePromise = getCursorPromise;
      let setSVG = ((await getCursorPromise) ?? "").replace(/viewBox=/g, insertString + `" viewBox=`);
      if (setSVG != this.currentMouseSVG && getCursorPromise == this.cursorUpdatePromise) {
        this.currentMouseSVG = setSVG;
        let reader = new FileReader();
        reader.readAsDataURL(new Blob([setSVG], { type: "image/svg+xml" }));
        reader.onload = () => {
          let translate = cursor.translate ?? {};
          this.editor.content.style.cursor = "url('" + reader.result + "') " + (translate.x ?? 0) + " " + (translate.y ?? 0) + ", auto";
        }
      }
    }
  }
  applyToolModule(moduleData) {
    let module = { ...(this.currentToolModule ?? {}), ...(moduleData ?? {}) };
    if (module.USER_SELECT != null) {
      this.editor.page.style.userSelect = module.USER_SELECT;
      this.editor.page.style.webkitUserSelect = module.USER_SELECT;
    } else {
      this.editor.page.style.removeProperty("user-select");
      this.editor.page.style.removeProperty("webkit-user-select");
    }
    if (module.TOUCH_ACTION != null) {
      this.editor.contentHolder.style.touchAction = module.TOUCH_ACTION;
    } else {
      this.editor.contentHolder.style.removeProperty("touch-action");
    }
    if (module.DISABLE_POINTER_EVENTS != true) {
      this.editor.annotationHolder.removeAttribute("pointereventsdisabled");
    } else {
      this.editor.annotationHolder.setAttribute("pointereventsdisabled", "");
    }
  }
  async getModule(path) {
    let moduleLoad = toolModules[toolModulePath + path + ".js"];
    if (moduleLoad == null) {
      return;
    }
    if (typeof moduleLoad == "function") {
      moduleLoad = await moduleLoad();
    }
    if (moduleLoad != null) {
      if (moduleLoad.Tool != null) {
        return moduleLoad.Tool;
      } else {
        return moduleLoad;
      }
    }
  }
  async loadModule(path) {
    let module = await this.getModule(path ?? this.currentToolModulePath);
    if (module == null) {
      return;
    }
    return await this.editor.newModule(module);
  }
  async activateTool(extra, options = {}) {
    //this.editor.pinchZoomDisable = false;
    this.editor.usingStylus = false;
    this.selection.hideSelectBox = null;
    if (options.resetSelection != false) {
      this.editor.selecting = {};
      this.selection.updateBox();
    }

    let editorTools = this.editor.content.querySelectorAll("[tooleditor]");
    if (editorTools.length > 0) {
      for (let i = 0; i < editorTools.length; i++) {
        let tool = editorTools[i];
        tool.removeAttribute("tooleditor");
        tool.style.opacity = 0;
        if (tool.hasAttribute("src") == true && tool.getAttribute("src").startsWith("blob:") == true) {
          URL.revokeObjectURL(tool.getAttribute("src"));
        }
      }
      (async () => {
        await sleep(150);
        for (let i = 0; i < editorTools.length; i++) {
          let tool = editorTools[i];
          if (tool != null) {
            tool.remove();
          }
        }
      })();
    }

    if (this.currentToolModule != null && this.currentToolModule.disable != null) {
      await this.currentToolModule.disable();
    }

    this.sidemenu.close();

    let newModule;
    if (this.currentToolModulePath != null) {
      newModule = await this.loadModule(this.currentToolModulePath);
    }
    this.currentToolModule = newModule ?? {};
    if (newModule != null) {
      newModule.editor = this.editor;
      newModule.toolbar = this;
      newModule.tool = this.currentSubTool ?? this.currentTool;
      newModule.button = this.currentSubToolButton ?? this.currentToolButton;
      if (newModule.enable != null) {
        newModule.enable(extra ?? {});
      }
    } else {
      newModule = {};
    }
    this.editor.realtime.tool = newModule.REALTIME_TOOL ?? 0;
    this.editor.realtime.passthrough = newModule.PUBLISH;
    this.applyToolModule();
    this.updateMouse(newModule.MOUSE);
  }
  async disableTool() {
    this.currentToolModulePath = null;
    return await this.activateTool();
  }
  async pushToolEvent(type, event) {
    if (this.currentToolModule == null) {
      return;
    }
    let callback = this.currentToolModule[type];
    if (callback == null) {
      return;
    }
    let events = [];
    if (this.currentToolModule.USE_COALESCED_EVENTS == true && event.getCoalescedEvents != null) {
      events = event.getCoalescedEvents();
    }
    if (events.length < 1) {
      events.push(event);
    }
    for (let i = 0; i < events.length; i++) { // Safari just breaks coalesced events!?
      let specificEvent = events[i];
      let timeStamp = specificEvent.timeStamp;
      if (timeStamp != null) {
        let type = specificEvent.type ?? event;
        if ((this.lastEventTimeStamps[type] ?? timeStamp) > timeStamp) { // Safari unorders coalesced events!?
          events = [event]; // Just use the main event if it's broken
          break;
        }
        this.lastEventTimeStamps[type] = timeStamp;
      }
    }
    for (let i = 0; i < events.length; i++) {
      await callback.call(this.currentToolModule, events[i]); // Use .call() to keep "this" context
    }
  }

  updateMaxSize() {
    this.editor.page.style.setProperty("--maxToolbarWidth", this.toolbarHolder.offsetWidth + "px");
    this.editor.page.style.setProperty("--maxToolbarHeight", this.toolbarHolder.offsetHeight + "px");
  }

  getPreferenceTool() {
    let selectKeys = Object.keys(this.editor.selecting);
    let annoID = selectKeys[selectKeys.length - 1];
    return {
      ...((this.editor.annotations[annoID] ?? {}).render ?? {}),
      ...(this.editor.selecting[annoID] ?? {})
    };
  }
  getAnnotationPreference(returnMissing) {
    let tool = this.getPreferenceTool().f;
    let result;
    if (tool != null) {
      let mappedTool = (mappedToolTypes[tool] ?? [tool])[0];
      result = this.editor.preferences.state.tools[mappedTool];
    }
    if (returnMissing == true) {
      return result;
    }
    return result ?? {};
  }
  getToolPreference() {
    return this.editor.preferences.state.tools[this.currentSubTool] ?? this.editor.preferences.state.tools[this.currentTool] ?? {};
  }
  setToolPreference(path, value) {
    let split = path.split(".");
    let check = this.getAnnotationPreference(true) ?? this.getToolPreference();
    for (let i = 0; i < split.length; i++) {
      if (i < split.length - 1) {
        check = check[split[i]];
      } else if (check != null) {
        check[split[i]] = value;
      }
    }
    this.editor.preferences.save();
    this.toolbar.updateButtons();
  }
  async saveSelecting(setFunction, options = {}) {
    let keys = Object.keys(this.editor.selecting);
    for (let i = 0; i < keys.length; i++) {
      let annoid = keys[i];
      let original = this.editor.annotations[annoid] ?? {};
      let selecting = this.editor.selecting[annoid] ?? {};
      let annoModule = (await this.editor.render.getModule(original, selecting.f ?? original.render.f)) ?? {};

      let set = await setFunction(copyObject(original.render), annoModule);
      if (set == null) {
        continue;
      }
      if (
        this.editor.utils.isLocked(original.render) == true
        && this.editor.utils.isLocked({ ...selecting, ...set }) == true
      ) {
        if (set.lock != null) {
          set = { lock: set.lock };
        } else {
          continue;
        }
      }
      if (
        this.editor.utils.isPlaceholderLocked(original.render) == true
        && this.editor.settings.editOthersWork != true
      ) {
        let locks = this.editor.utils.getLocked(original.render);
        if (locks.includes("c") == false) {
          set.lock = [...locks, "c"];
          set.placeholder = this.editor.self.modify;
        }
      }
      let merged = { ...selecting, ...set };
      if ((annoModule.AUTO_TEXT_FIT == true || annoModule.AUTO_SET_HEIGHT == true) && merged.remove != true) {
        await this.editor.render.create({ ...original, render: { ...original.render, ...merged }, animate: false });
        let renderedText = original.component.getElement().querySelector("div[edit]");
        if (renderedText != null) {
          merged.s = [(original.render.s ?? [])[0], (original.render.s ?? [])[1]];
          if (annoModule.AUTO_TEXT_FIT == true && original.render.textfit == true && selecting.textfit != false) {
            merged.s[0] = renderedText.offsetWidth + 6;
          }
          if (annoModule.AUTO_SET_HEIGHT == true ) {
            merged.s[1] = renderedText.offsetHeight + 6; //Math.max(select.s[1], renderedAnno.offsetHeight + 6);
          }
        }
      }
      let changes = false;
      let setKeys = Object.keys(merged);
      for (let c = 0; c < setKeys.length; c++) {
        let key = setKeys[c];
        if (merged[key] != original.render[key]) {
          changes = true;
          break;
        }
      }
      if (changes == false) {
        continue;
      }
      this.editor.selecting[annoid] = merged;
    }

    this.selection.action = "save";
    await this.selection.endAction({ redrawActionBar: false, fromHistory: options.saveHistory == false });
    if (options.redrawActionBar != false) {
      await this.selection.updateActionBar({
        refreshActionBar: options.refreshActionBar ?? true,
        redrawActionBar: options.redrawActionBar,
        reuseActionBar: options.reuseActionBar,
        skipUpdate: options.reuseActionBar != true
      });
    }
  }

  checkShift(event) {
    if (event.shiftKey == false) {
      this.editor.content.removeAttribute("shiftheld");
    } else {
      this.editor.content.setAttribute("shiftheld", "");
    }
  }

  async processFileUpload(items, event) {
    if (this.editor.self.access < this.editor.minimumEditingAccess) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      let file = items[i];
      if (file != null) {
        if (file.kind == "file") {
          file = file.getAsFile();
        }
        if (file.kind != "string") {
          if (file.type.substring(0, 6) == "image/") {
            await this.toolbar.startTool(this.getToolbar().querySelector('.eTool[tool="media"]'));
            await this.toolbar.startTool(this.getToolbar().querySelector('.eTool[tool="upload"]'), null, { file: file, event: event });
            return true;
          }
        }
      }
    }
    return false;
  }
  async processCopy() {
    let saveTextData = "";
    let saveAnnoData = [];

    let selectKeys = Object.keys(this.editor.selecting);
    let checkChunks = {};
    for (let i = 0; i < selectKeys.length; i++) {
      let annoID = selectKeys[i];
      let annotation = this.editor.annotations[annoID] ?? {};
      let render = annotation.render;
      if (render == null) {
        continue;
      }
      let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annoModule.KEYBINDS_ENABLED == false) {
        continue;
      }
      let addChunks = this.editor.utils.chunksFromAnnotation(render);
      for (let c = 0; c < addChunks.length; c++) {
        checkChunks[addChunks[c]] = true;
      }
      let renderCopy = copyObject(render);
      if (renderCopy.parent != null) {
        renderCopy.parented = {
          parent: renderCopy.parent,
          p: [render.p[0], render.p[1]],
          r: render.r
        };
      }
      let { annoX, annoY, rotation } = this.editor.utils.getRect(render);
      delete renderCopy.parent;
      renderCopy.p = [annoX, annoY];
      renderCopy.r = rotation;
      saveAnnoData.push(renderCopy);

      let text = this.editor.text.quillDeltaToString(render.d ?? []) ?? "";
      if (text.length > 0) {
        saveTextData += text;
      }
    }

    let annotations = this.editor.utils.annotationsInChunks(Object.keys(checkChunks));
    for (let i = 0; i < annotations.length; i++) {
      let annotation = annotations[i] ?? {};
      /*if (annotation.pointer != null) {
        annotation = this.editor.annotations[annotation.pointer];
      }*/
      let render = annotation.render;
      if (render == null || this.editor.selecting[render._id] != null) {
        continue;
      }
      let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annoModule.KEEP_ON_PARENT_DELETE == true) {
        continue;
      }
      let { selectingParent, annoX, annoY, rotation } = this.editor.utils.getRect(render);
      if (selectingParent == false) {
        continue;
      }
      let renderCopy = copyObject(render);
      if (renderCopy.parent != null) {
        renderCopy.parented = {
          parent: renderCopy.parent,
          r: render.r
        };
        if (render.p != null) {
          renderCopy.parented.p = [render.p[0], render.p[1]];
        }
      }
      delete renderCopy.parent;
      renderCopy.p = [annoX, annoY];
      renderCopy.r = rotation;
      saveAnnoData.push(renderCopy);

      let richText = render.d ?? {};
      if (richText.b != null) {
        if (saveTextData.length > 0) {
          saveTextData += "\n";
        }
        for (let t = 0; t < richText.b.length; t++) {
          let addText = "";
          if (richText.b[t] != "\n") {
            addText = richText.b[t];
          } else {
            addText = "\n";
          }
          saveTextData += addText;
        }
      }
    }

    return [saveTextData, saveAnnoData];
  }
  async processPaste(clipboardData) {
    let html = clipboardData.getData("text/html");
    let startIndex = html.indexOf("(markify+copypaste)"); // 19 chars
    let endIndex = html.indexOf("(/markify+copypaste)");
    if (startIndex < 0 || endIndex < 0) {
      let text = clipboardData.getData("text");
      if (isValidURL(text) == true) {
        await this.toolbar.startTool(toolbar.querySelector('.eTool[tool="media"]'));
        await this.toolbar.startTool(toolbar.querySelector('.eTool[tool="embed"]'), null, { link: text });
        return event.preventDefault();
      }
      return;
    }
    let annotationData = JSON.parse(decodeURIComponent(html.substring(startIndex + 19, endIndex)));
    if (annotationData.length < 1) {
      return;
    }

    let minLeft;
    let minTop;
    let maxLeft;
    let maxTop;
    let minZIndex;
    let parentIDs = {};
    this.editor.selecting = {};

    for (let i = 0; i < annotationData.length; i++) {
      let newAnno = annotationData[i];
      if (this.checkSubToolEnabled(newAnno.f) == false) {
        continue;
      }
      let newID = this.editor.render.generateID();
      parentIDs[newAnno._id] = newID;
      newAnno.old_ID = newAnno._id;
      newAnno._id = newID;
      let annoRect = this.editor.utils.getRect(newAnno);
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(annoRect.x, annoRect.y, annoRect.endX, annoRect.endY, annoRect.rotation);
      if (topLeftX < minLeft || minLeft == null) {
        minLeft = topLeftX;
      }
      if (topLeftY < minTop || minTop == null) {
        minTop = topLeftY;
      }
      if (bottomRightX > maxLeft || maxLeft == null) {
        maxLeft = bottomRightX;
      }
      if (bottomRightY > maxTop || maxTop == null) {
        maxTop = bottomRightY;
      }
      minZIndex = Math.min(minZIndex ?? newAnno.l ?? this.editor.minLayer, newAnno.l ?? minZIndex ?? this.editor.minLayer);
    }

    let { x: centerPageX, y: centerPageY } = this.editor.utils.scaleToDoc(this.editor.page.offsetWidth / 2, this.editor.page.offsetHeight / 2);
    let centerX = (maxLeft - minLeft) / 2;
    let centerY = (maxTop - minTop) / 2;

    for (let i = 0; i < annotationData.length; i++) {
      let newAnno = annotationData[i];
      if (this.checkSubToolEnabled(newAnno.f) == false) {
        continue;
      }
      let existingAnno = (this.editor.annotations[newAnno.old_ID] ?? {}).render;
      if (existingAnno != null && this.editor.utils.annotationInViewport(existingAnno) == true) {
        newAnno.p[0] = (newAnno.p[0] ?? existingAnno.p[0]) + 50;
        newAnno.p[1] = (newAnno.p[1] ?? existingAnno.p[1]) + 50;
      } else {
        newAnno.p[0] += centerPageX + centerX - maxLeft;
        newAnno.p[1] += centerPageY + centerY - maxTop;
      }
      if (newAnno.l != null) {
        newAnno.l = this.editor.maxLayer + 1 + ((newAnno.l ?? this.editor.maxLayer) - minZIndex);
      }
      if (newAnno.parented != null) {
        let parentCopy = parentIDs[newAnno.parented.parent];
        if (parentCopy != null) {
          newAnno.parent = parentCopy;
          newAnno.p = newAnno.parented.p;
          newAnno.r = newAnno.parented.r;
        }
        delete newAnno.parented;
      }
      delete newAnno.old_ID;
      delete newAnno.m;
      let setLock = [];
      let canLock = this.editor.utils.canChangeLock(newAnno);
      for (let l = 0; l < canLock.length; l++) {
        let lock = canLock[l];
        if ((newAnno.lock ?? []).includes(lock) == true) {
          setLock.push(lock);
        }
      }
      newAnno.lock = setLock;
      this.editor.selecting[newAnno._id] = newAnno;
    }

    this.selection.action = "save";
    await this.selection.endAction();
  }

  async processDuplicate(handle, fromKeybind) {
    let selectKeys = Object.keys(this.editor.selecting);
    let checkChunks = {};
    let saveAnnoData = [];
    let parentIDs = {};
    let maxZIndex;
    let minZIndex;
    let offsetX = 50;
    let offsetY = 50;

    if (handle != null) {
      offsetX = 0;
      offsetY = 0;
      if (this.selection.rotation == 0) {
        switch (handle) {
          case "duplicateleft":
            offsetX -= (this.selection.maxX - this.selection.minX) + 34;
            break;
          case "duplicateright":
            offsetX += (this.selection.maxX - this.selection.minX) + 34;
            break;
          case "duplicatetop":
            offsetY -= (this.selection.maxY - this.selection.minY) + 34;
            break;
          case "duplicatebottom":
            offsetY += (this.selection.maxY - this.selection.minY) + 34;
        }
      } else {
        switch (handle) {
          case "duplicateleft":
            offsetX -= (this.selection.lastRect.endX - this.selection.lastRect.x) + 34;
            break;
          case "duplicateright":
            offsetX += (this.selection.lastRect.endX - this.selection.lastRect.x) + 34;
            break;
          case "duplicatetop":
            offsetY -= (this.selection.lastRect.endY - this.selection.lastRect.y) + 34;
            break;
          case "duplicatebottom":
            offsetY += (this.selection.lastRect.endY - this.selection.lastRect.y) + 34;
        }
        [offsetX, offsetY] = rotatePoint(offsetX, offsetY, this.selection.rotation);
      }
    }

    let minLeft;
    let minTop;
    let maxLeft;
    let maxTop;
    for (let i = 0; i < selectKeys.length; i++) {
      let annoID = selectKeys[i];
      let annotation = this.editor.annotations[annoID] ?? {};
      let render = annotation.render;
      if (render == null || this.checkSubToolEnabled(render.f) == false) {
        continue;
      }
      if (fromKeybind == true) {
        let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
        if (annoModule.KEYBINDS_ENABLED == false) {
          continue;
        }
      }
      let addChunks = this.editor.utils.chunksFromAnnotation(render);
      for (let c = 0; c < addChunks.length; c++) {
        checkChunks[addChunks[c]] = true;
      }
      let annoRect = this.editor.utils.getRect(render);
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(annoRect.x, annoRect.y, annoRect.endX, annoRect.endY, annoRect.rotation);
      if (topLeftX < minLeft || minLeft == null) {
        minLeft = topLeftX;
      }
      if (topLeftY < minTop || minTop == null) {
        minTop = topLeftY;
      }
      if (bottomRightX > maxLeft || maxLeft == null) {
        maxLeft = bottomRightX;
      }
      if (bottomRightY > maxTop || maxTop == null) {
        maxTop = bottomRightY;
      }
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? maxZIndex ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? minZIndex ?? this.editor.utils.minLayer);
      let newID = this.editor.render.generateID();
      parentIDs[annoID] = newID;
      saveAnnoData.push({ ...copyObject(render), _id: newID, pending: true });
    }

    let annotations = this.editor.utils.annotationsInChunks(Object.keys(checkChunks));
    for (let i = 0; i < annotations.length; i++) {
      let annotation = annotations[i] ?? {};
      /*if (annotation.pointer != null) {
        annotation = this.editor.annotations[annotation.pointer];
      }*/
      let render = annotation.render;
      if (render == null || this.editor.selecting[render._id] != null || this.checkSubToolEnabled(render.f) == false) {
        continue;
      }
      let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annoModule.KEEP_ON_PARENT_DELETE == true) {
        continue;
      }
      let { selectingParent } = this.editor.utils.getRect(render);
      if (selectingParent == false) {
        continue;
      }
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? maxZIndex ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? minZIndex ?? this.editor.utils.minLayer);
      let newID = this.editor.render.generateID();
      parentIDs[render._id] = newID;
      saveAnnoData.push({ ...copyObject(render), _id: newID, pending: true });
    }

    let { x: centerPageX, y: centerPageY } = this.editor.utils.scaleToDoc(this.editor.page.offsetWidth / 2, this.editor.page.offsetHeight / 2);
    let centerX = (maxLeft - minLeft) / 2;
    let centerY = (maxTop - minTop) / 2;
    
    maxZIndex++;
    this.editor.selecting = {};
    for (let i = 0; i < saveAnnoData.length; i++) {
      let newAnno = saveAnnoData[i];
      let checkParent = parentIDs[newAnno.parent];
      if (checkParent != null) {
        newAnno.parent = checkParent;
      } else {
        let { annoX, annoY, rotation } = this.editor.utils.getRect(newAnno);
        let inViewport = this.editor.utils.annotationInViewport(newAnno);
        if (handle != null || inViewport == true) {
          delete newAnno.parent;
          newAnno.p = [annoX + offsetX, annoY + offsetY];
          newAnno.r = rotation;
        } else {
          newAnno.p[0] += centerPageX + centerX - maxLeft;
          newAnno.p[1] += centerPageY + centerY - maxTop;
        }
      }
      if (newAnno.l != null) {
        newAnno.l = maxZIndex + ((newAnno.l ?? this.editor.utils.maxLayer) - minZIndex);
      }
      delete newAnno.m;
      let setLock = [];
      let canLock = this.editor.utils.canChangeLock(newAnno);
      for (let l = 0; l < canLock.length; l++) {
        let lock = canLock[l];
        if ((newAnno.lock ?? []).includes(lock) == true) {
          setLock.push(lock);
        }
      }
      newAnno.lock = setLock;
      this.editor.selecting[newAnno._id] = newAnno;
    }

    this.selection.action = "save";
    await this.selection.endAction();
  }

  async js() {
    this.toolbarHolder = this.editor.page.querySelector("div[toolbarholder]") ?? this.editor.page;

    // Load toolbar content:
    let loadToolbars = this.toolbarHolder.querySelectorAll(".eToolbar");
    for (let i = 0; i < loadToolbars.length; i++) {
      let toolbar = loadToolbars[i];
      let toolbarContent = toolbars[toolbar.getAttribute("type")];
      if (toolbarContent != null) {
        toolbar.innerHTML = toolbarContent;
        toolbar.querySelector(".eToolbarContent").addEventListener("scroll", () => { this.toolbar.update(); });
      }
    }
    this.toolbarHolder.removeAttribute("hidden");

    this.updateMaxSize();
    this.activateTool();
    this.toolbar.updateButtons(this.toolbarHolder);
    this.toolbar.checkToolToggle();

    // Subscribe to events:
    this.editor.pipeline.subscribe("toolbarMouse", "click_start", async (data) => {
      let event = data.event;
      this.checkShift(event);
      if (data.event.button == 1) { // Start pan from scroll wheel press
        event.preventDefault();
        if (this.currentToolModulePath != "selection/pan") {
          this.previousToolModule = this.currentToolModulePath;
          this.currentToolModulePath = "selection/pan";
          await this.activateTool(null, { resetSelection: false });
        }
        if ((this.currentToolModule ?? {}).clickStart != null) {
          this.currentToolModule.clickStart(event);
        }
        return;
      }
      if (event.buttons > 1) {
        return;
      }
      if (["pen"].includes(event.pointerType) == true && (this.editor.localOptions ?? {}).stylusmode == null) { //, "mouse"
        this.editor.options.stylusmode = true;
        this.editor.pipeline.publish("stylusmodechange", { stylusmode: true });
      }
      let target = event.target;
      if (target.closest('.eToolbar:not([hidden])') != null) {
        this.toolbar.setTool(target.closest("button"), true);
      }
      if (target.closest(".eContent") != null) {
        await this.pushToolEvent("clickStart", event);
      }
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "click_move", async (data) => {
      let event = data.event;
      this.checkShift(event);
      this.tooltip.set(event);
      await this.pushToolEvent("clickMove", event);

      if (this.currentToolModule != null) {
        if (this.currentToolModule.MOUSE == null || this.currentToolModule.MOUSE.override != true) {
          if (this.selection.action == null) {
            let handle = event.target.closest(".eSelectHandle");
            if (handle != null) {
              if (handle.hasAttribute("move") == true) {
                this.updateMouse({ type: "svg", svg: moveCursorIcon, translate: { x: 22, y: 22 } });
              } else if (handle.hasAttribute("rotation") == true) {
                this.updateMouse({ type: "svg", svg: resizeCursorIcon, translate: { x: 22, y: 22 }, rotate: this.selection.rotation + parseInt(handle.getAttribute("rotation")) });
              } else if (handle.getAttribute("handle") == "rotate") {
                this.updateMouse({ type: "svg", svg: rotateCursorIcon, translate: { x: 22, y: 22 }, rotate: this.selection.rotation });
              } else {
                this.updateMouse(this.currentToolModule.MOUSE);
              }
            } else {
              this.updateMouse(this.currentToolModule.MOUSE);
            }
          }
        }
      }
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "click_end", async (data) => {
      this.checkShift(data.event);
      if (this.previousToolModule != null && this.previousToolModule != "selection/pan") {
        data.event.preventDefault();
        this.currentToolModulePath = this.previousToolModule;
        this.previousToolModule = null;
        return this.activateTool(null, { resetSelection: false });
      }
      this.toolbar.setTool();
      await this.pushToolEvent("clickEnd", data.event);
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "click", (data) => {
      let event = data.event;
      this.pushToolEvent("click", event);
      if ((event ?? {}).target != null && event.target.closest(".eToolbar") != null) {
        this.pushToolEvent("toolbar_click", data.event);
      }
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "touchstart", (data) => {
      this.pushToolEvent("touchstart", data.event);
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "touchmove", (data) => {
      this.pushToolEvent("touchmove", data.event);
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "touchend", (data) => {
      this.pushToolEvent("touchend", data.event);
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "contextmenu", (data) => {
      this.pushToolEvent("contextmenu", data.event);
    }, { sort: 1 });
    this.editor.pipeline.subscribe("toolbarMouse", "mouseleave", () => {
      this.tooltip.close();
    });
    this.editor.pipeline.subscribe("toolbarKeyDown", "keydown", async (data) => {
      let event = data.event;
      this.checkShift(event);
      this.pushToolEvent("keydown", event);

      if (event.key == "Enter") {
        this.toolbar.startTool(event.target.closest("button"));
      }

      // Keybind Manager:
      if (this.editor.isPageActive() == false) {
        return;
      }
      if (event.keyCode == 32 && event.target == document.body) {
        event.preventDefault();
        if (this.currentToolModulePath != "selection/pan") {
          this.previousToolModule = this.currentToolModulePath;
          this.currentToolModulePath = "selection/pan";
          await this.activateTool(null, { resetSelection: false });
        }
        return;
      }
      if (this.editor.self.access < this.editor.minimumEditingAccess) {
        return;
      }

      if (event.keyCode == 27 && this.selection.action == null) {
        this.editor.selecting = {};
        return this.selection.updateBox();
      }

      let meta = event.ctrlKey || event.metaKey;

      if (event.keyCode == 90 && event.shiftKey == true && meta == true) { // Handle Redo
        if (
          event.target != null
          && this.editor.isEditorContent(event.target) == false
          && (
            ["INPUT", "TEXTAREA"].includes(event.target.tagName) == true
            || event.target.isContentEditable == true
          )
        ) {
          return;
        }
        event.preventDefault();
        return this.selection.redo();
      }
      if (event.keyCode == 90 && meta == true) { // Handle Undo
        if (
          event.target != null
          && this.editor.isEditorContent(event.target) == false
          && (
            ["INPUT", "TEXTAREA"].includes(event.target.tagName) == true
            || event.target.isContentEditable == true
          )
        ) {
          return;
        }
        event.preventDefault();
        return this.selection.undo();
      }

      let activeElement = document.activeElement;
      if (activeElement != null) {
        if (activeElement.closest("[contenteditable]") != null || activeElement.closest("input") != null) {
          return;
        }
      }

      if ([8, 46].includes(event.keyCode) == true) { // Handle Backspace / Delete Key
        let selectKeys = Object.keys(this.editor.selecting);
        for (let i = 0; i < selectKeys.length; i++) {
          let selectID = selectKeys[i];
          let annotation = this.editor.annotations[selectID] ?? {};
          let anno = ({ ...(annotation.render ?? {}), ...(this.editor.selecting[selectID] ?? {}) }) ?? {};
          if (this.editor.utils.canMemberModify(anno) == false) { // Can't edit another member's work:
            continue;
          }
          if (this.editor.utils.isLocked(anno) == true || this.editor.utils.isPlaceholderLocked(anno) == true) {
            continue;
          }
          let annoModule = (await this.editor.render.getModule(annotation, anno.f)) ?? {};
          if (annoModule.KEYBINDS_ENABLED == false) {
            continue;
          }
          this.editor.selecting[selectID].remove = true;
          //this.editor.selecting[selectID].done = true;
        }
        this.selection.action = "save";
        return await this.selection.endAction();
      }

      if ([37, 38, 39, 40].includes(event.keyCode) == true) { // Handle Arrow Key Move
        let selectKeys = Object.keys(this.editor.selecting);
        if (selectKeys.length < 1) {
          return;
        }
        event.preventDefault();
        for (let i = 0; i < selectKeys.length; i++) {
          let selectID = selectKeys[i];
          let selecting = this.editor.selecting[selectID] ?? {};
          let anno = (this.editor.annotations[selectID] ?? {}).render;
          if (this.editor.utils.canMemberModify(anno) == false) { // Can't edit another member's work:
            continue;
          }
          let nudge = 1;
          if (event.shiftKey == true) {
            nudge = 10;
          }
          let { annoX, annoY } = this.editor.utils.getRect(anno);
          if (event.keyCode == 37) {
            annoX -= nudge;
          } else if (event.keyCode == 38) {
            annoY -= nudge;
          } else if (event.keyCode == 39) {
            annoX += nudge;
          } else if (event.keyCode == 40) {
            annoY += nudge;
          }
          let { x: newX, y: newY } = this.editor.utils.getRelativePosition({
            ...anno,
            ...selecting,
            p: [annoX, annoY],
          });
          selecting.p = [newX, newY];
        }
        this.selection.action = "save";
        return await this.selection.endAction();
      }

      if (event.keyCode == 68 && meta == true) { // Handle Duplicate
        event.preventDefault();
        return this.processDuplicate(null, true);
      }
      
      if (event.keyCode == 65 && meta == true) { // Handle Select All
        return event.preventDefault();
      }
    });
    this.editor.pipeline.subscribe("toolbarKeyUp", "keyup", (data) => {
      this.checkShift(data.event);
      if (this.previousToolModule != null && this.previousToolModule != "pan" && (this.currentToolModule ?? {}).dragging != true) {
        data.event.preventDefault();
        this.currentToolModulePath = this.previousToolModule;
        this.previousToolModule = null;
        return this.activateTool(null, { resetSelection: false });
      }
      this.pushToolEvent("keyup", data.event);
    });
    this.editor.pipeline.subscribe("toolbarScroll", "scroll", (data) => {
      this.pushToolEvent("scroll", data.event);
    });
    this.editor.pipeline.subscribe("toolbarWheel", "wheel", (data) => {
      this.pushToolEvent("wheel", data.event);
    });
    this.editor.pipeline.subscribe("toolbarBoundChange", "bounds_change", (data) => {
      this.updateMaxSize();
      setTimeout(() => { this.updateMaxSize(); }, 100); // Update again because of SAFARI
      this.toolbar.update();
      this.pushToolEvent("scroll", data.event);
    }, { sort: 2 });
    this.editor.pipeline.subscribe("toolbarPagePageAdd", "page_add", () => {
      this.updateMaxSize();
      this.toolbar.update();
    });
    this.editor.pipeline.subscribe("toolbarEditorUpdate", "set", (data) => {
      if (data.hasOwnProperty("settings") == true) {
        this.toolbar.checkToolToggle();
      }
    });
    this.editor.pipeline.subscribe("toolbarSelectionRedraw", "redraw_selection", async (data) => {
      if (this.editor.zooming == true) {
        return;
      }
      await this.selection.updateBox(data);
    });
    this.editor.pipeline.subscribe("toolbarSelectionZoomChange", "zoom_change", async () => {
      await this.selection.updateBox({ transition: false });
    });
    this.editor.pipeline.subscribe("toolbarPaste", "paste", async (data) => {
      if (this.editor.isPageActive() == false) {
        return;
      }
      if (this.editor.self.access < this.editor.minimumEditingAccess) {
        return;
      }
      if (document.activeElement != null) {
        if (document.activeElement.closest('[contenteditable="true"]') != null || document.activeElement.closest("input") != null) {
          return;
        }
      }
      let event = data.event;
      let clipboardData = event.clipboardData ?? event.originalEvent.clipboardData ?? {};

      if (clipboardData.items.length < 1) {
        return;
      }
      if (this.processFileUpload(clipboardData.items) == true) {
        return event.preventDefault();
      }
      return this.processPaste(clipboardData);
    });
    this.editor.pipeline.subscribe("toolbarPaste", "copy", async (data) => {
      if (this.editor.isPageActive() == false) {
        return;
      }
      let selection = document.getSelection();
      if (selection.toString().length > 0) {
        return; // User it selecting text, ignore event
      }
      let event = data.event;
      event.preventDefault();
      let [saveTextData, saveAnnoData] = await this.processCopy();
      let clipboardData = event.clipboardData ?? event.originalEvent.clipboardData ?? {};
      clipboardData.setData("text/html", `<meta charset="utf-8"><html><head></head><body><span data-meta="<!--(markify+copypaste)${encodeURIComponent(JSON.stringify(saveAnnoData))}(/markify+copypaste)-->"></span><div>${saveTextData}</div></body></html>`);
      clipboardData.setData("text/plain", saveTextData);
    });

    this.editor.toolbar = this;
  }
}