import {
  fixed,
  favicon,

  userID,
  account,

  mouseDown,
  setPage,
  setFrame,
  sleep,
  getParam,
  modifyParams,
  getEpoch,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  objectUpdate
} from "@/crucial";

import { Pipeline } from "./Pipeline";

export class Editor {
  constructor() {
    this.pipeline = new Pipeline;
  }

  html = `
  <div class="eContent">
    <div class="eRealtime"></div>
    <div class="eEditorContent">
      <div class="eAnnotations"></div>
    </div>
    <div class="eBackground"></div>
  </div>
  `;
  css = {
    ".eContent": `position: relative; display: flex; flex-direction: column; width: fit-content; min-width: calc(100% - (var(--interfacePadding) * 2)); min-height: calc(100vh - (var(--interfacePadding) * 2)); padding: var(--interfacePadding); contain: paint; align-items: center; overflow: hidden; background-color: var(--backgroundColor); pointer-events: all; transition: background-color .3s; --zoom: 1`,
    ".eRealtime": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; overflow: hidden; pointer-events: none`,
    ".eEditorContent": `position: relative; will-change: margin`,
    ".eAnnotations": `--startZIndex: 0; position: relative; width: 1px; height: 1px; transform-origin: 0 0; transform: scale(var(--zoom)); z-index: 2; pointer-events: none; contain: size layout style`, // will-change: contents
    ".eAnnotations[pointereventsdisabled] *": `pointer-events: none !important`,
    ".eBackground": `position: absolute; left: 0px; top: 0px; opacity: .075; transform-origin: left top; background-position: center; z-index: 1; pointer-events: none; contain: strict`,

    ".eAnnotation": `position: absolute; display: block; left: 0px; top: 0px; z-index: calc(var(--startZIndex) + var(--zIndex)); contain: size layout`,
    ".eAnnotation[hidden]": `display: none !important`,
    ".eAnnotation[anno]": `transition: all .25s, z-index 0s`,
    //".eAnnotation:not([anno])": `display: none !important`,
    ".eAnnotationHolder": `position: absolute; z-index: 10; contain: size style`, // layout will-change: contents
    //".eAnnotationHolder[notransition] > .eAnnotation": `transition: unset !important`,
    ".eAnnotation > svg": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; pointer-events: none; overflow: visible`,
    ".eAnnotation > svg > *": `pointer-events: visiblepainted`,

    ".eAnnotation .ql-editor": `padding: 0 !important; overflow-y: unset !important; font-family: var(--font); font-size: inherit; line-height: inherit`,
    ".eAnnotation .ql-editor > *": `cursor: unset`,
    ".eAnnotation .ql-editor.ql-blank::before": `color: var(--textColor) !important; opacity: .6 !important`,
    ".eAnnotation .ql-editor ol": `padding: unset`,
    ".eAnnotation .ql-editor a": `color: var(--theme) !important`,
    ".eAnnotation:not([selected]) > .ql-container .ql-editor a": `pointer-events: none !important`,
    ".eAnnotation .ql-formula": `position: relative; border: none; background: unset !important; box-shadow: unset !important`,
    '.eAnnotation .ql-editor[contenteditable="false"] .ql-formula': `pointer-events: none !important`,
    '.eAnnotation[selected] .ql-formula:before': `content: ""; position: absolute; box-sizing: border-box; width: calc((100% + 2px) * var(--zoom)); height: calc((100% + 2px) * var(--zoom)); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(calc(1 / var(--zoom))); border: solid 2px var(--secondary); border-radius: 6px; opacity: 0; pointer-events: none; transition: opacity .15s`,
    '.eAnnotation[selected] .ql-editor[contenteditable="true"] .ql-formula:before': `opacity: 1`,
    ".eAnnotation .ql-formula .mq-empty": `background: var(--hover) !important`,
    ".eAnnotation[selected] .ql-formula .mq-latex-command-input-wrapper": ``,
    ".eAnnotation[selected] .ql-formula .mq-latex-command-input": `position: relative; border: unset !important`,
    ".eAnnotation[selected] .ql-formula .mq-latex-command-input:before": `content: ""; position: absolute; box-sizing: border-box; width: calc((100% + 2px) * var(--zoom)); height: calc((100% + 2px) * var(--zoom)); left: 50%; top: 50%; transform: translate(-50%, -50%) scale(calc(1 / var(--zoom))); border: solid 2px var(--secondary); border-radius: 6px; pointer-events: none`,
    ".eAnnotation[selected] .ql-formula .mq-text-mode.mq-hasCursor": `box-shadow: inset var(--lightShadow); border-radius: 2px`,
    
    //".ql-formula textarea": `transform: unset !important; clip: unset !important; width: unset !important; height: unset !important; outline: none !important`,

    ".eReaction": `display: flex; padding: 2px; background: rgba(255, 255, 255, .8); border: solid 2px rgba(0, 0, 0, 0); border-radius: 8px; align-items: center; overflow: hidden; color: #2F2F2F`,
    ".eReaction[selected]": `padding: 2px; background: rgba(var(--hoverRGB), .8); border: solid 2px var(--theme); color: var(--theme)`,
    ".eReaction[add]": `opacity: 0; border-radius: 14px`,
    ".customScroll[viewer] .eReaction[add]": "display: none !important",
    ".eReaction div[imgholder]": `display: flex; width: 20px; height: 20px; justify-content: center; align-items: center`,
    ".eReaction img": `width: 32px; height: 32px; transform: scale(0.65); border-radius: 7px; filter: drop-shadow(0px 0px 8px #fff)`,
    ".eReaction div[count]": `margin: 0 5px 0 6px; font-size: 16px; font-weight: 700`
  };
  
  js = () => {
    console.log(this.pipeline)
  }
}