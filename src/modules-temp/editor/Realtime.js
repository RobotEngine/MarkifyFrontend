import {
  mouseDown,
  sleep,
  getEpoch,
  sendRequest,
  socket,
  connected,
  subscribe,
  copyObject
} from "@/crucial";

import { textColorBackground } from "./utils/text-color-background";
import { hexToRGBString } from "./utils/hex-to-rgb-string";

import highlighter from "./icons/cursors/highlighter.svg?raw";
import pen from "./icons/cursors/pen.svg?raw";
import eraser from "./icons/cursors/eraser.svg?raw";
import insert from "./icons/cursors/insert.svg?raw";
import comment from "./icons/cursors/comment.svg?raw";

export class Module {
  constructor(editor) {
    this.editor = editor;
  }

  css = {
    ".eCursor": `--backgroundColor: var(--themeColor); --textColor: var(--themeColor); --borderColor: #fff; position: absolute; display: flex; z-index: 20; opacity: 0; align-items: center; transition: .25s; pointer-events: all; transform-origin: var(--origin)`,
    ".eCursor svg": `transform-origin: var(--origin); transition: .25s`,
    ".eCursor[hidden]": `transition: transform 0s, all .25s`,
    ".eCursor[pressed]": `--backgroundColor: #fff; --borderColor: var(--themeColor); color: var(--textColor) !important`,
    ".eCursor[pressed] svg": `transform: scale(.9)`,
    ".eCursor .pointer": `width: 20px; height: 20px; background: var(--backgroundColor); border: solid 3px var(--borderColor); overflow: hidden; border-radius: 8px 14px 14px 14px; box-shadow: 0 0 6px rgb(0 0 0 / 25%); transition: all .25s, color 0s`,
    ".eCursor .pointer[none]": `border-radius: 14px; opacity: 0; width: 0px`,
    ".eCursor [name]": `box-sizing: border-box; display: flex; width: fit-content; height: 100%; padding: 0px 6px; border-radius: 14px; overflow: hidden; opacity: 0; font-size: 14px; font-weight: 700; white-space: nowrap; align-items: center`,
    ".eCursor:not([anonymous]):hover [color]": `width: var(--fullyExtended)`,
    ".eCursor:not([anonymous]):hover [name]": `width: unset; opacity: 1`,
    ".eCursor:not([anonymous]):hover .pointer[none]": `opacity: 1`,
    ".eCursor:not([anonymous])[extend] [color]": `width: var(--fullyExtended)`,
    ".eCursor:not([anonymous])[extend] [name]": `width: unset; opacity: 1`,
    ".eCursor:not([anonymous])[extend] .pointer[none]": `opacity: 1`,
    ".eCursor[anonymous]": `--themeColor: var(--theme) !important; pointer-events: none !important`,
    ".eCursor[anonymous] [name]": `opacity: 0`,

    ".eSelection": `opacity: 0; z-index: 10; transition: .25s`,
    ".eSelection div": `position: absolute; background: var(--themeColor); opacity: .4; border-radius: 4px`,

    ".eCollabSelect": `position: absolute; left: 0px; top: 0px; border-style: solid; border-width: 3px; border-color: var(--themeColor); opacity: 0; z-index: 9; border-radius: 9px; opacity .15s; pointer-events: none`,
    ".eCollabSelect[anonymous]": `--themeColor: var(--theme) !important`
  };

  members = {};

  lastCursorPublish = 0;
  lastObservePublish = 0;
  lastCursorContent = "";
  lastObserveContent = "";
  //lastCursorChunk = null;
  //mouseX = null;
  //mouseY = null;
  //endSyncTimeout = null;
  //endSyncObserveTimeout = null;

  async publishShort(event, type, ignoreSame) {
    type = type ?? "cursor";
    if (event != null) {
      let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
      this.mouseX = mouseX;
      this.mouseY = mouseY;
    }
    if (this.editor.lesson.memberCount < 2) { // No one to send cursor events too!
      return;
    }
    if (this.editor.lesson.signalStrength < 3 || connected == false) { // If weak don't send!
      return;
    }
    if (
      (
        this.editor.self.access < this.editor.minimumEditingAccess
        || this.editor.viewer == true
      )
      && this.editor.realtime.observedCount < 1
    ) { // Not an editor!
      return;
    }

    let epoch = getEpoch();

    if (type == "cursor") {
      clearTimeout(this.endSyncTimeout);
      if (this.editor.isPageActive() != true) {
        return;
      }
      if (this.lastCursorPublish < epoch - 80 || ignoreSame == true) { // One event every 80 ms
        if (this.mouseX == null || this.mouseY == null) {
          return;
        }

        let standardFilter = { c: "member" };
        if (this.editor.self.access >= this.editor.minimumEditingAccess) {
          standardFilter.c = "short_" + this.editor.id;
        } else if (this.editor.realtime.observedCount > 0) {
          standardFilter.o = this.editor.sessionID;
        }
        let filter = { ...standardFilter };

        // Figure out where the cursor is:
        let annotationRect = this.editor.utils.annotationsRect();
        let sendX = (this.mouseX - annotationRect.left) / this.editor.zoom;
        let sendY = (this.mouseY - annotationRect.top) / this.editor.zoom;
        filter.p = this.editor.utils.pointInChunk(sendX, sendY);

        if (this.lastCursorChunk != null && filter.p != this.lastCursorChunk) {
          let pubData = [ this.editor.sessionID, filter.p ];
          if (this.editor.includeIdInShortPublish == true) {
            pubData.unshift(this.editor.id);
          }
          socket.publish({ ...standardFilter, p: this.lastCursorChunk }, pubData); // When leaving a chunk, tell those looking!
        }

        let scaleZoom = 1 / this.editor.zoom;

        // [ memberID, tool, time, mouseX, mouseY, extra (anno) ]
        let pubData = [ this.editor.sessionID, this.editor.realtime.tool, 0, Math.floor(sendX), Math.floor(sendY)];

        let addTextSelect = [];
        if (window.getSelection != null) {
          let select = window.getSelection();
          if (select.rangeCount > 0) {
            let range = select.getRangeAt(0);
            let ancestorElement = null;
            if (range.commonAncestorContainer != null) {
              if (range.commonAncestorContainer.nodeType == Node.ELEMENT_NODE) {
                ancestorElement = range.commonAncestorContainer
              } else {
                ancestorElement = range.commonAncestorContainer.parentElement;
              }
            }
            if (range.toString().length > 0 && ancestorElement != null && ancestorElement.closest("div[textlayer]") != null) {
              let selections = range.getClientRects();
              if (selections.length < 100) {
                let alreadyInsert = {};
                for (let i = 0; i < selections.length; i++) { //Math.min(selections.length, 100)
                  let selRect = this.editor.utils.convertBoundingRect(selections[i]);
                  let checkInsert = selRect.width + "_" + selRect.height + "_" + selRect.left + "_" + selRect.top;
                  if (alreadyInsert[checkInsert] != null) {
                    continue;
                  }
                  if (selRect.width > 0 && selRect.height > 0) {
                    alreadyInsert[checkInsert] = "";
                    // [ PAGE, WIDTH, HEIGHT, X, Y ]
                    addTextSelect.push([ Math.floor(selRect.width * scaleZoom), Math.floor(selRect.height * scaleZoom), Math.floor((selRect.left - annotationRect.left) * scaleZoom), Math.floor((selRect.top - annotationRect.top) * scaleZoom)]);
                  }
                }
              }
            }
          }
        }
        let sendExtra = {};
        if (addTextSelect.length > 0) {
          sendExtra.selection = addTextSelect;
        }
        if (mouseDown() == true) {
          sendExtra.press = true;
        }

        let mergedSelect = { ...this.editor.selecting, ...this.editor.realtimeSelect };
        this.editor.realtimeSelect = {};
        if (Object.keys(mergedSelect).length > 0) {
          sendExtra.select = mergedSelect;
        }
        if (this.editor.realtime.passthrough != null) {
          sendExtra = { ...sendExtra, ...this.editor.realtime.passthrough };
        }
        if (ignoreSame == true) {
          sendExtra.force = true;
        }
        if (Object.keys(sendExtra).length > 0) {
          pubData[5] = sendExtra;
        }

        let updJSONContent = JSON.stringify([filter, pubData]);
        if (updJSONContent == this.lastCursorContent && ignoreSame != true) {
          return;
        }
        pubData[2] = epoch;

        if (this.editor.includeIdInShortPublish == true) {
          pubData.unshift(this.editor.id);
        }

        // PUBLISH the event:
        socket.publish(filter, pubData);
        this.lastCursorPublish = epoch;
        this.lastCursorChunk = filter.p;
        this.lastCursorContent = updJSONContent;
      } else {
        this.endSyncTimeout = setTimeout(() => {
          this.publishShort(event, type);
        }, 80); // If after 80 MS, send the last event to ensure proper sync.
      }
    } else if (type == "observe") {
      clearTimeout(this.endSyncObserveTimeout);
      if (this.lastObservePublish < epoch - 250) { // One event every 250 ms
        let filter = { c: "member", o: this.editor.sessionID };

        let { x, y } = this.editor.getCenterPosition();

        // [ memberID, NULL, zoom, centerx, centery, time ]
        let pubData = [ this.editor.sessionID, null, Math.floor(this.editor.zoom * 100) / 100, Math.floor(x), Math.floor(y) ];

        let updJSONContent = JSON.stringify([filter, pubData]);
        if (updJSONContent == this.lastObserveContent && ignoreSame != true) {
          return;
        }
        pubData[5] = epoch;

        if (this.editor.includeIdInShortPublish == true) {
          pubData.unshift(this.editor.id);
        }

        // PUBLISH the event:
        socket.publish(filter, pubData);
        this.lastObservePublish = epoch;
        this.lastObserveContent = updJSONContent;
      } else {
        this.endSyncObserveTimeout = setTimeout(() => {
          this.publishShort(event, type);
        }, 300); // If after 300 MS, send the last event to ensure proper sync.
      }
    } else if (type == "exit") {
      clearTimeout(this.endSyncTimeout);
      if (this.lastCursorPublish < epoch - 80 || ignoreSame == true) { // One event every 80 ms
        if (this.lastCursorContent == null && ignoreSame != true) {
          return;
        }
        let standardFilter = { c: "short_" + this.editor.id };
        if (this.editor.realtime.observedCount > 0 && this.editor.self.access < this.editor.minimumEditingAccess) {
          standardFilter.o = this.editor.sessionID;
        }
        socket.publish({ ...standardFilter, p: this.lastCursorChunk }, [ this.editor.sessionID, "" ]);
        this.lastCursorPublish = epoch;
        this.lastCursorChunk = null;
        this.lastCursorContent = null;
      } else {
        this.endSyncTimeout = setTimeout(() => {
          this.publishShort(event, type);
        }, 80); // If after 80 MS, send the last event to ensure proper sync.
      }
    }
  }

  setShortSub(chunks) {
    if (
      this.editor.lesson.signalStrength < 3
      || this.editor.options.cursors == false
      || this.editor.subscribeShortEvents == false
    ) {
      chunks = null;
    }
    let filter = { c: "short_" + this.editor.id, p: chunks };
    if (this.shortSub != null) {
      this.shortSub.edit(filter);
    } else {
      if (chunks == null) {
        return;
      }
      this.shortSub = subscribe(filter, async (data) => {
        this.editor.pipeline.publish("short", data);
      });
    }
    if (this.editor.realtime.observing != null) {
      let observeFilter = { c: "member", o: this.editor.realtime.observing, p: chunks };
      if (this.observeSub != null) {
        this.observeSub.edit(observeFilter);
      } else {
        this.observeSub = subscribe(observeFilter, async (data) => {
          this.editor.pipeline.publish("short", data);
        });
      }
    } else if (this.observeSub != null) {
      this.observeSub.close();
      this.observeSub = null;
    }
  }
  closeShortSub() {
    if (this.shortSub != null) {
      this.shortSub.close();
      this.shortSub = null;
    }
    if (this.observeSub != null) {
      this.observeSub.close();
      this.observeSub = null;
    }
  }

  setObserveFrame(member) {
    let observeHolder = this.editor.page.querySelector("div[observebottomsection]");
    let observeCursor = observeHolder.querySelector("div[observecursor]");
    if (observeCursor == null) {
      return;
    }
    observeCursor.textContent = member.name;
    observeCursor.style.color = textColorBackground(member.color);
    observeCursor.style.background = member.color;
    observeHolder.style.display = "flex";
    //this.editor.page.style.setProperty("--lightShadow", "0px 0px 8px 0px " + hexToRGBString(member.color, .3));
    this.editor.page.style.boxShadow = "0px 0px 8px 0px " + hexToRGBString(member.color, "var(--shadowOpacity)");
  }
  async enableObserve(member) {
    this.editor.closeAlert(this.editor.realtime.observeLoading);
    this.editor.realtime.observeLoading = null;

    clearTimeout(this.editor.realtime.observeTimeout);
    
    this.setObserveFrame(member);

    this.editor.pipeline.publish("observe_enable", { memberID: member._id });
    this.editor.pipeline.publish("refresh_interface", {});
  }
  async exitObserve() {
    let prevObservID = this.editor.realtime.observing;
    if (prevObservID == null) {
      return;
    }

    this.editor.realtime.observing = null;
    
    this.editor.closeAlert(this.editor.realtime.observeLoading);
    
    clearTimeout(this.editor.realtime.observeTimeout);

    let observeHolder = this.editor.page.querySelector("div[observebottomsection]");
    if (observeHolder != null) {
      observeHolder.style.removeProperty("display");
    }
    this.editor.page.style.removeProperty("box-shadow");

    cancelAnimationFrame(this.animationFrameId);

    if (this.editor.lastZoom != null) {
      this.editor.setZoom(this.editor.lastZoom, true);
      this.editor.lastZoom = null;
    }

    let member = this.editor.lesson.members[prevObservID];
    if (member == null) {
      return;
    }
    if (member.access < this.editor.minimumEditingAccess) {
      this.removeRealtime(member._id);
    }
    sendRequest("DELETE", "lessons/members/observe/exit?member=" + member._id, null, { session: this.editor.session });
    this.editor.pipeline.publish("observe_exit", { memberID: member._id });
    this.editor.pipeline.publish("refresh_interface", {});
  }

  targetScrollPositionX = 0;
  targetScrollPositionY = 0;
  //animationFrameId = null;
  smoothScroll() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    let distanceX = (this.targetScrollPositionX - this.editor.scrollLeft) / 10; // Divide the distance into steps
    let distanceY = (this.targetScrollPositionY - this.editor.scrollTop) / 10; // Divide the distance into steps
    
    let changeX = Math.min(distanceX, 50);
    if (distanceX < 0) {
      changeX = Math.max(distanceX, -50);
    }
    let changeY = Math.min(distanceY, 50);
    if (distanceY < 0) {
      changeY = Math.max(distanceY, -50);
    }
    if (Math.abs(distanceY) > 1 || Math.abs(distanceX) > 1) {
      this.editor.scrollTo(
        this.editor.scrollLeft + changeX,
        this.editor.scrollTop + changeY
      );
      this.animationFrameId = requestAnimationFrame(() => { this.smoothScroll(); });
    }
  }
  startScroll(targetX, targetY) {
    this.targetScrollPositionX = targetX;
    this.targetScrollPositionY = targetY;
    this.animationFrameId = requestAnimationFrame(() => { this.smoothScroll(); });
  }

  selections = {};
  addSelection(annoID, memberID, member, element) {
    member.elements["selection_" + annoID] = { element, annotation: annoID };

    let selectionStore = this.selections[annoID];
    if (selectionStore == null) {
      selectionStore = {};
      this.selections[annoID] = selectionStore;
    }
    selectionStore[memberID] = { element };
  }
  removeSelection(annoID, memberID, member) {
    let selectionStore = this.selections[annoID];
    if (selectionStore != null) {
      if (memberID == null) {
        let selectionKeys = Object.keys(selectionStore);
        for (let i = 0; i < selectionKeys.length; i++) {
          let element = (selectionStore[selectionKeys[i]] ?? {}).element;
          if (element != null) {
            element.remove();
          }
        }
        delete this.selections[annoID];
      } else {
        delete selectionStore[memberID];
        if (Object.keys(selectionStore).length < 1) {
          delete this.selections[annoID];
        }
        if (member == null) {
          member = this.members[memberID];
        }
      }
    }
    if (member != null && member.elements != null) {
      delete member.elements["selection_" + annoID];
    }
  }

  refreshRealtimeSelections(transition, cache = {}) {
    let annotationRect = cache.annotationRect ?? this.editor.utils.annotationsRect();
    let scrollLeft = cache.scrollLeft ?? this.editor.scrollLeft;
    let scrollTop = cache.scrollTop ?? this.editor.scrollTop;
    let isTransitionFunction = typeof transitionFunction == "function";
    
    let selectionKeys = Object.keys(this.selections);
    for (let i = 0; i < selectionKeys.length; i++) {
      let annoID = selectionKeys[i];
      let annoSelections = this.selections[annoID];
      let annoSelectionKeys = Object.keys(annoSelections);
      for (let s = 0; s < annoSelectionKeys.length; s++) {
        let memberID = annoSelectionKeys[s];
        let { element: selection } = annoSelections[memberID] ?? {};
        if (selection == null) {
          continue;
        }
        let render = {};
        if (annoID != "cursor") {
          let annotation = this.editor.annotations[annoID] ?? {};
          render = {
            ...(annotation.render ?? { remove: true }),
            ...(this.editor.selecting[annoID] ?? {})
          };
          if (render.remove == true) {
            this.removeSelection(annoID, memberID);
            selection.remove();
            continue;
          }
        } else {
          let member = this.members[selection.getAttribute("member")];
          if (member == null || member.cursorRender == null) {
            continue;
          }
          render = {
            ...member.cursorRender,
            ...(this.editor.selecting[annoID] ?? {})
          };
        }
        if (render.f == null) {
          continue;
        }
        let rect = this.editor.utils.getRect(render);
        
        let useTransition = transition == true;
        if (isTransitionFunction == true) {
          useTransition = isTransitionFunction(rect);
        }
        if (useTransition == false) {
          selection.setAttribute("notransition", "");
        }
        
        let rotate = rect.rotation;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        selection.style.width = ((rect.width * this.editor.zoom) - 3) + "px";
        selection.style.height = ((rect.height * this.editor.zoom) - 3) + "px";
        selection.style.transform = "translate(" + (annotationRect.left + (rect.x * this.editor.zoom) + scrollLeft - 1.5) + "px," + (annotationRect.top + (rect.y * this.editor.zoom) + scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
        
        if (useTransition == false) {
          selection.offsetHeight;
          selection.removeAttribute("notransition");
        }
      }
    }
  }
  adjustRealtimeHolder() {
    let annotationRect = this.editor.utils.annotationsRect();
    let scrollLeft = this.editor.scrollLeft;
    let scrollTop = this.editor.scrollTop;

    this.refreshRealtimeSelections(false, { annotationRect, scrollLeft, scrollTop });
    
    let memberKeys = Object.keys(this.members);
    for (let i = 0; i < memberKeys.length; i++) {
      let elements = (this.members[memberKeys[i]] ?? {}).elements ?? {};
      let elementKeys = Object.keys(elements);
      for (let e = 0; e < elementKeys.length; e++) {
        let { element, scale } = elements[elementKeys[e]] ?? {};
        if (element != null && scale == true) {
          element.setAttribute("notransition", "");
          if (element.hasAttribute("width") == true) {
            element.style.width = parseFloat(element.getAttribute("width")) * this.editor.zoom + "px";
          }
          if (element.hasAttribute("height") == true) {
            element.style.height = parseFloat(element.getAttribute("height")) * this.editor.zoom + "px";
          }
          if (element.hasAttribute("x") == true && element.hasAttribute("y") == true) {
            let x = parseFloat(element.getAttribute("x")) * this.editor.zoom;
            let y = parseFloat(element.getAttribute("y")) * this.editor.zoom;
            element.style.transform = "translate(" + (x + annotationRect.left + (parseInt(element.getAttribute("offsetx") ?? "0")) + scrollLeft) + "px," + (y + annotationRect.top + (parseInt(element.getAttribute("offsety") ?? "0")) + scrollTop) + "px)";
          }
          element.offsetHeight;
          element.removeAttribute("notransition");
        }
        if (this.editor.settings.anonymousMode != true) {
          element.removeAttribute("anonymous");
        } else {
          element.setAttribute("anonymous", "");
        }
      }
    }
  }

  removeRealtime(memberID) {
    let member = this.members[memberID];
    if (this.editor.realtime.observing == memberID) {
      this.exitObserve();
    }
    if (member == null) {
      return;
    }
    
    clearTimeout(member.timeout);

    if (member.elements == null) {
      return;
    }

    let memberElements = Object.values(member.elements);
    member.elements = {};

    (async () => {
      for (let i = 0; i < memberElements.length; i++) {
        let data = memberElements[i] ?? {};
        let anno = data.annotation;
        if (anno != null) {
          this.removeSelection(anno, memberID);
        }
        let elem = data.element;
        if (elem != null) {
          elem.style.opacity = 0;
        }
      }
      await sleep(300);
      for (let i = 0; i < memberElements.length; i++) {
        let elem = (memberElements[i] ?? {}).element;
        if (elem != null) {
          elem.remove();
        }
      }
    })();

    if (member.activeAnno != null) {
      member.activeAnno.remove();
      delete member.activeAnno;
    }
  }

  async js() {
    // Handle publishing realtime events (SHORT events):
    this.editor.pipeline.subscribe("realtimePublishClickStart", "click_start", (data) => { this.publishShort(data.event); }, { sort: 2 });
    this.editor.pipeline.subscribe("realtimePublishClickMove", "click_move", (data) => { this.publishShort(data.event); }, { sort: 2 });
    this.editor.pipeline.subscribe("realtimePublishClickEnd", "click_end", () => { this.publishShort(); }, { sort: 2 });
    this.editor.pipeline.subscribe("realtimePublishBoundChange", "bounds_change", () => {
      this.publishShort();
      if (this.editor.realtime.observedCount > 0) {
        this.publishShort(null, "observe");
      }
    }, { sort: 2 });
    this.editor.pipeline.subscribe("realtimePublishResize", "resize", () => {
      if (this.editor.realtime.observedCount > 0) {
        this.publishShort(null, "observe");
      }
    });
    this.editor.pipeline.subscribe("realtimePublishVisibility", "visibilitychange", (data) => {
      if (data.active == false) {
        this.publishShort(null, "exit");
      } else {
        this.publishShort();
      }
    });
    this.editor.pipeline.subscribe("realtimePublishPageSwitch", "page_switch", (data) => {
      if (this.editor.isPageActive() != true) {
        this.publishShort(null, "exit");
      }
    }, { sort: 2 });

    // Close subscribe(s) when the page is closed:
    this.editor.pipeline.subscribe("realtimePubishPageClose", "page_close", this.closeShortSub);

    // Handle observe elements and events:
    let observeHolderExit = this.editor.page.querySelector("div[observebottomsection] button[observeexit]");
    if (observeHolderExit != null) {
      observeHolderExit.addEventListener("click", () => {
        this.exitObserve();
      });
    }
    this.editor.pipeline.subscribe("realtimeWheelEvent", "wheel", () => { this.exitObserve(); });

    // Handle signal strength changes:
    this.editor.pipeline.subscribe("realtimeSignalUpdate", "signal_strength", (data) => {
      if (data.signalStrength < 3) {
        this.exitObserve();
      }
      this.setShortSub(this.editor.visibleChunks);
    });

    // Handle receiving and processing SHORT events:
    this.editor.pipeline.subscribe("realtimeShortSub", "short", async (event) => {
      let data = copyObject(event);
      if (this.editor.includeIdInShortPublish == true) {
        data.splice(0, 1);
      }
      let memberID = data[0];
      let memberData = this.editor.lesson.members[memberID];
      if (memberData == null || memberID == this.editor.self._id) {
        return;
      }
      let member = this.members[memberID];
      if (member == null) {
        member = { elements: {} };
        this.members[memberID] = member;
      }
      if (data[1] != null) { // CURSOR EVENT
        if (this.editor.options.cursors == false) {
          return;
        }
        let [ memberID, tool, time, x, y, extra ] = data;
        let forced = extra != null && extra.force == true;
        if (member.lastShort > time && forced == false) {
          return;
        }
        member.lastShort = time;
        if (time == null) { // Must be for a page leave event:
          if (tool == null || this.editor.visibleChunks.includes(tool) == true) {
            return;
          }
          return this.removeRealtime(memberID);
        }

        clearTimeout(member.timeout);
        member.timeout = setTimeout(() => { this.removeRealtime(memberID); }, 120000); // Remove realtime member elements if inactive for 2 minutes
        
        let cursorHolder = (member.elements.cursor ?? {}).element;
        if (cursorHolder == null) {
          cursorHolder = document.createElement("div");
          cursorHolder.className = "eCursor";
          cursorHolder.setAttribute("member", memberID);
          cursorHolder.setAttribute("scale", "");
          cursorHolder.setAttribute("notransition", "");
          this.editor.realtimeHolder.appendChild(cursorHolder);
          member.elements.cursor = { element: cursorHolder, scale: true };
          cursorHolder.offsetHeight;
          cursorHolder.style.opacity = 1;
        }
        if (this.editor.settings.anonymousMode != true) {
          cursorHolder.removeAttribute("anonymous");
        } else {
          cursorHolder.setAttribute("anonymous", "");
        }
        // Set x and y:
        cursorHolder.setAttribute("x", x);
        cursorHolder.setAttribute("y", y);
        cursorHolder.style.opacity = 1;
        x *= this.editor.zoom;
        y *= this.editor.zoom;
        let annotationRect = this.editor.utils.annotationsRect();
        x += annotationRect.left;
        y += annotationRect.top;
        member.x = x;
        member.y = y;
        if (parseInt(cursorHolder.getAttribute("mode") ?? "-1") != tool) {
          cursorHolder.setAttribute("hidden", "");
          cursorHolder.style.transform = "translate(" + (member.x + (parseInt(cursorHolder.getAttribute("offsetx") ?? "0")) + this.editor.scrollLeft) + "px," + (member.y + (parseInt(cursorHolder.getAttribute("offsety") ?? "0")) + this.editor.scrollTop) + "px) scale(0)";
          cursorHolder.setAttribute("mode", tool);
          let html = "";
          let offsetx = 0;
          let offsety = 0;
          let origin = "top left";
          switch (tool) {
            case 0: // Normal cursor:
              html = `<div class="pointer" color><div name></div></div>`;
              break;
            case 1: // Highlighter 
              html = `${highlighter}<div class="pointer" color none><div name></div></div>`;
              offsetx = -15;
              offsety = -30;
              origin = "bottom center";
              break;
            case 2: // Pen 
              html = `${pen}<div class="pointer" color none><div name></div></div>`;
              offsetx = -15;
              offsety = -30;
              origin = "bottom center";
              break;
            case 3: // Eraser
              html = `${eraser}<div class="pointer" color none><div name></div></div>`;
              offsetx = -20;
              offsety = -20;
              origin = "center center";
              break;
            case 4: // Insert
              html = `${insert}<div class="pointer" color none><div name></div></div>`;
              offsetx = -20;
              offsety = -20;
              origin = "center center";
              break;
            case 5: // Comment
              html = `${comment}<div class="pointer" color none><div name></div></div>`;
              offsetx = -12;
              offsety = -32;
              origin = "center center";
          }
          cursorHolder.innerHTML = html;
          cursorHolder.setAttribute("offsetx", offsetx);
          cursorHolder.setAttribute("offsety", offsety);
          cursorHolder.style.setProperty("--origin", origin);
          cursorHolder.querySelector("[name]").textContent = memberData.name;
          let setTextColor = textColorBackground(memberData.color);
          cursorHolder.style.color = setTextColor;
          if (setTextColor == "#000") {
            cursorHolder.style.setProperty("--textColor", "#000");
          }
          cursorHolder.style.setProperty("--themeColor", memberData.color);
          let colorMain = cursorHolder.querySelector("[color]");
          colorMain.style.width = "fit-content";
          cursorHolder.style.setProperty("--fullyExtended", colorMain.clientWidth + "px");
          colorMain.style.removeProperty("width");
          cursorHolder.style.transform = "translate(" + (member.x + (parseInt(cursorHolder.getAttribute("offsetx") ?? "0")) + this.editor.scrollLeft) + "px," + (member.y + (parseInt(cursorHolder.getAttribute("offsety") ?? "0")) + this.editor.scrollTop) + "px)";
          cursorHolder.removeAttribute("notransition");
          cursorHolder.removeAttribute("hidden");
        } else {
          cursorHolder.style.transform = "translate(" + (member.x + (parseInt(cursorHolder.getAttribute("offsetx") ?? "0")) + this.editor.scrollLeft) + "px," + (member.y + (parseInt(cursorHolder.getAttribute("offsety") ?? "0")) + this.editor.scrollTop) + "px)";
        }

        if (extra == null) {
          extra = {};
        }

        // Handle Selection:
        let userSelection = extra.select ?? {};
        if (extra.u != null && extra.u._id != null) {
          userSelection[extra.u._id] = extra.u;
        }
        let selectKeys = Object.keys(userSelection);
        let selections = {};
        let elementKeys = Object.keys(member.elements);
        for (let i = 0; i < elementKeys.length; i++) {
          let elemID = elementKeys[i];
          if (elemID.startsWith("selection_") == false) {
            continue;
          }
          let select = (member.elements[elemID] ?? {}).element;
          if (select == null) {
            continue;
          }
          let annoID = select.getAttribute("anno");
          if (selectKeys.includes(annoID) == false) {
            let splitID = elemID.split("_");
            this.removeSelection(splitID[splitID.length - 1], memberID, member);
            (async () => {
              select.style.opacity = 0;
              await sleep(150);
              if (select != null) {
                select.remove();
              }
            })();
          } else if (elemID.endsWith("_annotation") == false) {
            selections[annoID] = select;
            if (this.editor.settings.anonymousMode != true) {
              select.removeAttribute("anonymous");
            } else {
              select.setAttribute("anonymous", "");
            }
          }
        }

        if (extra.c != null) {
          cursorHolder.style.setProperty("--toolColorOpacity", hexToRGBString(extra.c, (extra.o ?? 100) / 100));
        }
        if (extra.press == true) {
          cursorHolder.setAttribute("pressed", "");
        } else {
          cursorHolder.removeAttribute("pressed");
        }
        if (selectKeys.length > 0) {
          let userSelecting = false;
          let refreshSelecting = false;
          let changes = false;
          let hasCursorAnno = false;
          for (let i = 0; i < selectKeys.length; i++) {
            let annoID = selectKeys[i];
            let anno = userSelection[annoID] ?? {};
            let merge;
            let annoElem;
            let original;
            if (annoID == "cursor") { // Just a temporary prop, no saving:
              let prevPreview = member.selection_cursor_preview;
              if (prevPreview != null && member.selection_cursor_preview.render.f != anno.f) {
                if (prevPreview.component != null) {
                  prevPreview.component.remove();
                }
                member.selection_cursor_preview = null;
                delete member.selection_cursor_preview_version;
              }
              if (member.selection_cursor_preview == null) {
                member.selection_cursor_preview = {};
                delete member.selection_cursor_preview_version;
              }
              if (member.selection_cursor_preview_version == null) {
                member.selection_cursor_preview_version = 0;
              }
              merge = { ...anno, _id: memberID + "_cursor" };
              member.selection_cursor_preview.render = merge;

              let thisCallId = ++member.selection_cursor_preview_version;

              let annoPreview = (await this.editor.render.create(member.selection_cursor_preview)).component;

              if (member.selection_cursor_preview_version != thisCallId) {
                return;
              }

              annoElem = annoPreview.getElement();
              member.elements.selection_cursor_annotation = { element: annoElem };
              annoElem.setAttribute("member", memberID);
              annoElem.setAttribute("anno", "cursor");
              annoElem.setAttribute("type", anno.f);
              annoElem.style.opacity = .7;
              hasCursorAnno = true;
              member.cursorRender = merge;
            } else {
              original = this.editor.annotations[annoID];
              if (original != null && original.pointer != null) {
                annoID = original.pointer;
                original = this.editor.annotations[annoID];
              }
              anno._id = annoID;
              let isNewAnno = annoID.startsWith("pending_") == true;
              if (original == null && isNewAnno == true) {
                this.editor.annotations[annoID] = {};
                original = this.editor.annotations[annoID];
              }
              original = original ?? {};
              let originalRender = original.render ?? {};
              if ((originalRender.a ?? originalRender.m) != null && this.editor.utils.canMemberModify(originalRender, memberData) != true) { // Can't edit another member's work:
                delete userSelection[annoID];
                continue;
              }
              let setRender = { ...originalRender, ...anno };
              if (setRender._id == null) { // || setRender.p == null || setRender.s == null
                delete userSelection[annoID];
                continue;
              } else if (setRender.remove == true) {
                delete userSelection[annoID];
              }
              let setLock = anno.lock;
              if (setLock != null) {
                anno.lock = copyObject(this.editor.utils.getLocked(originalRender));
                let validLocks = this.editor.utils.canChangeLock(originalRender, memberData);
                for (let l = 0; l < validLocks.length; l++) {
                  let lock = validLocks[l];
                  let index = anno.lock.indexOf(lock);
                  if (index > -1) {
                    anno.lock.splice(index, 1);
                  }
                  if (setLock.includes(lock) == true) {
                    anno.lock.push(lock);
                  }
                }
              }

              original.revert = original.revert ?? copyObject(originalRender);
              
              if (anno.remove == true && this.editor.selecting[annoID] != null) {
                delete this.editor.selecting[annoID];
                userSelecting = true;
              }
              if (Object.keys(anno).length > 1) {
                changes = true;
              }
              if (anno.done != true && forced != true) {
                original.render = setRender;
              } else if (changes == true) {
                original.render = setRender;
                delete original.render.done;

                if (isNewAnno == false) {
                  original.render.m = memberData.modify;
                } else {
                  anno.lock = anno.lock ?? original.render.lock ?? [];
                  if (anno.lock.includes("c") == false) {
                    anno.lock.push("c"); // Add default collaborator lock
                  }
                  original.render.a = memberData.modify;
                }
                original.render.sync = time;

                await this.editor.save.apply({ ...anno, sync: time });
              }
            }

            let selection;
            if ((anno.f == null || anno.sync != null || annoID == "cursor") && userSelection[annoID] != null) {
              selection = selections[annoID];
              if (selection == null) {
                selection = document.createElement("div");
                selection.className = "eCollabSelect";
                selection.setAttribute("member", memberID);
                this.editor.realtimeHolder.appendChild(selection);

                this.addSelection(annoID, memberID, member, selection);

                selection.style.setProperty("--themeColor", memberData.color);
                if (this.editor.settings.anonymousMode != true) {
                  selection.removeAttribute("anonymous");
                } else {
                  selection.setAttribute("anonymous", "");
                }
                selection.offsetHeight;
              }
              selection.setAttribute("anno", annoID);
            }

            if (annoID != "cursor") {
              merge = original.render;
              if (this.editor.selecting[annoID] == null) {
                if (selection != null) {
                  selection.removeAttribute("notransition");
                }
              } else {
                userSelecting = true;
              }
              if ((merge ?? {}).f != null) {
                let component = ((await this.editor.save.apply({ ...merge, sync: time }, { overwrite: true, render: { animate: anno.f == null }, renderPassthrough: { resizing: merge.resizing } })).annotation ?? {}).component;
                if (merge.d != null && component != null) {
                  if (component.quill != null && component.quill.isEnabled() == true) {
                    component.quill.disable();
                  }
                }
              }
              if (selection != null && anno.remove == true && selection.hasAttribute("remove") == false) {
                this.removeSelection(annoID, memberID, member);
                selection.setAttribute("remove", "");
                selection.style.opacity = 0;
                (async () => {
                  await sleep(150);
                  if (selection != null) {
                    selection.remove();
                  }
                })();
                selection = null;
              }
            }

            if (selection != null) {
              let { x, y, width, height, rotation: rotate } = this.editor.utils.getRect(merge);
              if (rotate > 180) {
                rotate = -(360 - rotate);
              }
              selection.style.width = ((width * this.editor.zoom) - 3) + "px";
              selection.style.height = ((height * this.editor.zoom) - 3) + "px";
              selection.style.transform = "translate(" + (annotationRect.left + (x * this.editor.zoom) + this.editor.scrollLeft - 1.5) + "px," + (annotationRect.top + (y * this.editor.zoom) + this.editor.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
              selection.offsetHeight;
              selection.style.transition = "all .25s, opacity .15s";
              selection.style.opacity = 1;
            }
            if (annoElem != null && annoElem.querySelector(".eAnnotation[selected]") != null) {
              refreshSelecting = true;
            }
          }
          member.selecting = selectKeys;
          if (userSelecting == true && changes == true) { // Only refresh if user is selecting
            this.editor.pipeline.publish("redraw_selection", { refreshActionBar: true, redrawCurrentAction: true });
          } else if (userSelecting == true || refreshSelecting == true) {
            this.editor.pipeline.publish("redraw_selection", { skipUpdate: true });
          }
          if (member.cursorRender != null && hasCursorAnno == false) {
            delete member.cursorRender;
          }
        }

        if (Object.keys(userSelection).length > 0 && this.editor.options.cursornames != false) {
          cursorHolder.setAttribute("extend", "");
        } else {
          cursorHolder.removeAttribute("extend");
        }

        // Handle Text Selection
        let textSelectHolder = (member.elements.textSelectionHolder ?? {}).element;
        if (extra != null && extra.selection != null && extra.selection.length < 100) {
          if (textSelectHolder == null) {
            this.editor.realtimeHolder.insertAdjacentHTML("beforeend", `<div class="eSelection" member="${memberID}"></div>`);
            textSelectHolder = this.editor.realtimeHolder.querySelector('.eSelection[member="' + memberID + '"]:not([old])');
            member.elements.textSelectionHolder = { element: textSelectHolder, scale: true };
            textSelectHolder.style.setProperty("--themeColor", memberData.color);
          } else {
            textSelectHolder.innerHTML = "";
          }
          for (let i = 0; i < extra.selection.length; i++) {
            let selectData = extra.selection[i];
            textSelectHolder.insertAdjacentHTML("beforeend", "<div scale new></div>");
            let select = textSelectHolder.querySelector(".eSelection div[new]");
            select.removeAttribute("new");
            select.setAttribute("width", selectData[0]);
            select.setAttribute("height", selectData[1]);
            select.setAttribute("x", selectData[2]);
            select.setAttribute("y", selectData[3]);
            select.style.width = (selectData[0] * this.editor.zoom) + "px";
            select.style.height = (selectData[1] * this.editor.zoom) + "px";
            select.style.transform = "translate(" + ((selectData[2] * this.editor.zoom) + annotationRect.left + this.editor.scrollLeft) + "px," + ((selectData[3] * this.editor.zoom) + annotationRect.top + this.editor.scrollTop) + "px)";
          }
          textSelectHolder.style.opacity = 1;
        } else if (textSelectHolder != null) {
          delete member.elements.textSelectionHolder;
          textSelectHolder.setAttribute("old", "");
          textSelectHolder.style.opacity = 0;
          (async function () {
            await sleep(300);
            if (textSelectHolder != null) {
              textSelectHolder.remove();
            }
          })();
        }
      } else if (data[3] != null) { // OBSERVE EVENT
        let [ memberID, _, zoom, scrollX, scrollY, time ] = data;
        if (memberID != this.editor.realtime.observing) {
          return;
        }
        if (member.lastObserveShort > time) {
          return;
        }
        if (this.editor.realtime.observeLoading != null) {
          this.enableObserve(memberData);
        }
        if (this.editor.zoom != zoom) {
          await this.editor.setZoom(zoom, true);
          this.editor.updatePageScroll();
        }
        let annotationRect = this.editor.utils.annotationsRect();
        let setX = (this.editor.scrollLeft + annotationRect.left) + (scrollX * this.editor.zoom) - (this.editor.pageOffsetWidth / 2);
        let setY = (this.editor.scrollTop + annotationRect.top) + (scrollY * this.editor.zoom) - (this.editor.pageOffsetHeight / 2);
        if (this.editor.realtime.observeLoading == null) {
          this.startScroll(setX, setY);
        } else {
          this.editor.scrollTo(setX, setY);
        }
      }
    });

    // Append module to the editor:
    this.editor.realtime.module = this;
    this.setShortSub(this.editor.visibleChunks);
  }
}