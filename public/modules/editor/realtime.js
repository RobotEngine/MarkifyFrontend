modules["editor/realtime"] = class {
  css = {
    ".eCursor": `--backgroundColor: var(--themeColor); --textColor: var(--themeColor); --borderColor: #fff; position: absolute; display: flex; z-index: 20; opacity: 0; align-items: center; transition: .25s; pointer-events: all; transform-origin: var(--origin)`,
    ".eCursor[hidden]": `transition: transform 0s, all .25s`,
    ".eCursor[pressed]": `--backgroundColor: #fff; --borderColor: var(--themeColor); color: var(--textColor) !important; transform: scale(.9)`,
    ".eCursor .pointer": `width: 20px; height: 20px; background: var(--backgroundColor); border: solid 3px var(--borderColor); overflow: hidden; border-radius: 8px 14px 14px 14px; box-shadow: 0 0 6px rgb(0 0 0 / 25%); transition: all .3s, color 0s`,
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

    ".eSelection": `opacity: 0; z-index: 10; transition: .3s`,
    ".eSelection div": `position: absolute; background: var(--themeColor); opacity: .4; border-radius: 4px`,

    ".eCollabSelect": `position: absolute; left: 0px; top: 0px; border: solid 3px var(--themeColor); opacity: 0; z-index: 9; border-radius: 9px; opacity .15s; pointer-events: none`,
    ".eCollabSelect[anonymous]": `--themeColor: var(--theme) !important`
  };
  members = {};
  js = async function (editor) {
    let contentHolder = editor.contentHolder;
    let content = editor.contentHolder.querySelector(".eContent");
    let realtimeHolder = content.querySelector(".eRealtime");
    let annotations = content.querySelector(".eAnnotations");

    let lastCursorPublish = 0;
    let lastObservePublish = 0;
    let lastCursorContent = "";
    let lastObserveContent = "";
    let lastCursorChunk;

    let mouseX;
    let mouseY;
    let endSyncTimeout;
    let endSyncObserveTimeout;
    this.publishShort = async (event, type, ignoreSame) => {
      type = type ?? "cursor";
      if (event != null) {
        ({ mouseX, mouseY } = editor.utils.localMousePosition(event));
      }
      if (editor.parent.parent.memberCount < 2) { // No one to send cursor events too!
        return;
      }
      if (editor.parent.parent.signalStrength < 3 || connected == false) { // If weak don't send!
        return;
      }
      if (editor.self.access < 1 && editor.realtime.observed != true) { // Not an editor!
        return;
      }
      let epoch = getEpoch();
      if (type == "cursor") {
        clearTimeout(endSyncTimeout);
        if (lastCursorPublish < epoch - 80 || ignoreSame == true) { // One event every 80 ms
          if (mouseX == null || mouseY == null) {
            return;
          }

          let standardFilter = { c: "short_" + editor.id };
          if (editor.realtime.observed && editor.self.access < 1) {
            standardFilter.o = editor.sessionID;
          }
          let filter = { ...standardFilter };

          // Figure out where the cursor is:
          let annotationRect = editor.utils.localBoundingRect(annotations);
          let sendX = (mouseX - annotationRect.left) / editor.zoom;
          let sendY = (mouseY - annotationRect.top) / editor.zoom;
          filter.p = editor.utils.pointInChunk(sendX, sendY);

          if (filter.p != (lastCursorChunk ?? filter.p)) {
            socket.publish({ ...standardFilter, p: lastCursorChunk }, [ editor.sessionID, filter.p ]); // When leaving a chunk, tell those looking!
          }

          let scaleZoom = 1 / editor.zoom;
  
          // [ memberID, tool, time, mouseX, mouseY, extra (anno) ]
          let pubData = [ editor.sessionID, editor.realtime.tool, 0, Math.floor(sendX), Math.floor(sendY)];

          let addTextSelect = [];
          if (window.getSelection != null) {
            let select = window.getSelection();
            if (select.rangeCount > 0) {
              let range = select.getRangeAt(0);
              if (range.toString().length > 0 && range.endContainer.parentNode.getAttribute("role") == "presentation") {
                let selections = range.getClientRects();
                if (selections.length < 100) {
                  let alreadyInsert = {};
                  for (let i = 0; i < selections.length; i++) { //Math.min(selections.length, 100)
                    let selRect = editor.utils.convertBoundingRect(selections[i]);
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

          let mergedSelect = { ...editor.selecting, ...editor.realtimeSelect };
          editor.realtimeSelect = {};
          if (Object.keys(mergedSelect).length > 0) {
            sendExtra.select = mergedSelect;
          }
          if (Object.keys(mergedSelect).length > 0) {
            sendExtra.select = mergedSelect;
          }
          if (editor.realtime.passthrough != null) {
            sendExtra = { ...sendExtra, ...editor.realtime.passthrough };
          }
          if (ignoreSame == true) {
            sendExtra.force = true;
          }
          if (Object.keys(sendExtra).length > 0) {
            pubData[5] = sendExtra;
          }

          let updJSONContent = JSON.stringify([filter, pubData]);
          if (updJSONContent == lastCursorContent && ignoreSame != true) {
            return;
          }
          pubData[2] = epoch;
  
          // PUBLISH the event:
          socket.publish(filter, pubData);
          lastCursorPublish = epoch;
          lastCursorChunk = filter.p;
          lastCursorContent = updJSONContent;
        } else {
          endSyncTimeout = setTimeout(() => {
            this.publishShort(event, type);
          }, 80); // If after 80 MS, send the last event to ensure proper sync.
        }
      } else if (type == "observe") {
        clearTimeout(endSyncObserveTimeout);
        if (lastObservePublish < epoch - 250) { // One event every 250 ms
          let filter = { c: "short_" + editor.id, o: editor.sessionID };

          let pageRect = pageHolder.getBoundingClientRect();
          let sendX = ((page.offsetWidth / 2) - pageRect.left) / editor.zoom;
          let sendY = ((page.offsetHeight / 2) - pageRect.top) / editor.zoom;

          // [ memberID, NULL, zoom, centerx, centery, time ]
          let pubData = [ editor.sessionID, null, Math.floor(editor.zoom * 100) / 100, Math.floor(sendX), Math.floor(sendY) ];

          let updJSONContent = JSON.stringify([filter, pubData]);
          if (updJSONContent == lastObserveContent && ignoreSame != true) {
            return;
          }
          pubData[5] = epoch;

          // PUBLISH the event:
          socket.publish(filter, pubData);
          lastObservePublish = epoch;
          lastObserveContent = updJSONContent;
        } else {
          endSyncObserveTimeout = setTimeout(() => {
            this.publishShort(event, type);
          }, 300); // If after 300 MS, send the last event to ensure proper sync.
        }
      } else if (type == "exit") {
        clearTimeout(endSyncTimeout);
        if (lastCursorPublish < epoch - 80 || ignoreSame == true) { // One event every 80 ms
          if (lastCursorContent == null && ignoreSame != true) {
            return;
          }
          let standardFilter = { c: "short_" + editor.id };
          if (editor.realtime.observed && editor.self.access < 1) {
            standardFilter.o = editor.sessionID;
          }
          socket.publish({ ...standardFilter, p: lastCursorChunk }, [ editor.sessionID, "" ]);
          lastCursorPublish = epoch;
          lastCursorContent = null;
        } else {
          endSyncTimeout = setTimeout(() => {
            this.publishShort(event, type);
          }, 80); // If after 80 MS, send the last event to ensure proper sync.
        }
      }
    }
    editor.pipeline.subscribe("realtimePublishClickStart", "click_start", (data) => { this.publishShort(data.event); });
    editor.pipeline.subscribe("realtimePublishClickMove", "click_move", (data) => { this.publishShort(data.event); });
    editor.pipeline.subscribe("realtimePublishClickEnd", "click_end", () => { this.publishShort(); });
    editor.pipeline.subscribe("realtimePublishScroll", "scroll", () => {
      this.publishShort();
      if (editor.realtime.observed == true) {
        this.publishShort(null, "observe");
      }
    });
    editor.pipeline.subscribe("realtimePublishResize", "resize", () => {
      if (editor.realtime.observed == true) {
        this.publishShort(null, "observe");
      }
    });
    editor.pipeline.subscribe("realtimePublishVisibility", "visibilitychange", (data) => {
      if (data.active == false) {
        this.publishShort(null, "exit");
      } else {
        this.publishShort();
      }
    });
    editor.pipeline.subscribe("realtimePublishPageSwitch", "page_switch", (data) => {
      if (data.pageID != editor.parent.pageID) {
        this.publishShort(null, "exit");
      }
    });

    this.setShortSub = (chunks) => {
      if (editor.parent.parent.signalStrength < 3 || editor.options.cursors == false) {
        chunks = null;
      }
      let filter = { c: "short_" + editor.id, p: chunks };
      if (editor.realtime.observing != null) {
        filter.o = editor.realtime.observing;
      }
      if (this.shortSub != null) {
        this.shortSub.edit(filter);
      } else {
        if (chunks == null) {
          return;
        }
        this.shortSub = subscribe(filter, async (data) => {
          editor.pipeline.publish("short", data); // Dump onto the pipeline
        });
        editor.realtime.subscribes.push(this.shortSub);
      }
    }

    editor.pipeline.subscribe("realtimeShortSub", "short", (data) => {
      let memberID = data[0];
      let memberData = editor.parent.parent.members[memberID];
      if (memberData == null) {
        return;
      }
      let member = this.members[memberID];
      if (member == null) {
        member = { elements: {} };
        this.members[memberID] = member;
      }
      if (data[1] != null) { // CURSOR EVENT
        if (editor.options.cursors == false) {
          return;
        }
        let [ memberID, tool, time, x, y, extra ] = data;
        let forced = extra != null && extra.force == true;
        if (member.lastShort > time && forced == false) {
          return;
        }
        member.lastShort = time;
        clearInterval(member.interval);
        member.interval = setInterval(() => {
          this.removeRealtime(memberID);
        }, 120000); // Remove realtime member elements if inactive for 2 minutes
        let cursorHolder = member.elements.cursor;
        if (cursorHolder == null) {
          realtimeHolder.insertAdjacentHTML("beforeend", `<div class="eCursor" member="${memberID}" scale notransition></div>`);
          cursorHolder = realtimeHolder.querySelector('.eCursor[member="' + memberID + '"]');
          member.elements.cursor = cursorHolder;
          cursorHolder.offsetHeight;
          cursorHolder.style.opacity = 1;
        }
        if (editor.settings.anonymousMode != true) {
          cursorHolder.removeAttribute("anonymous");
        } else {
          cursorHolder.setAttribute("anonymous", "");
        }
        // Set x and y:
        cursorHolder.setAttribute("x", x);
        cursorHolder.setAttribute("y", y);
        x *= editor.zoom;
        y *= editor.zoom;
        let annotationRect = editor.utils.localBoundingRect(annotations);
        x += annotationRect.left;
        y += annotationRect.top;
        member.x = x;
        member.y = y;
        if (time == null) { // Must be for a page leave event:
          if (tool == null || editor.visibleChunks.includes(tool) == true) {
            return;
          }
          this.removeRealtime(memberID);
          return;
        } else {
          cursorHolder.style.opacity = 1;
        }
        if (parseInt(cursorHolder.getAttribute("mode") ?? -1) != tool) {
          cursorHolder.setAttribute("hidden", "");
          cursorHolder.style.transform = "translate(" + (member.x + (parseInt(cursorHolder.getAttribute("offsetx") ?? "0")) + contentHolder.scrollLeft) + "px," + (member.y + (parseInt(cursorHolder.getAttribute("offsety") ?? "0")) + contentHolder.scrollTop) + "px) scale(0)";
          cursorHolder.setAttribute("mode", tool);
          (async () => {
            let html = "";
            let offsetx = 0;
            let offsety = 0;
            let origin = "top left";
            switch (tool) {
              case 0: // Normal cursor:
                html = `<div class="pointer" color><div name></div></div>`;
                break;
              case 1: // Highlighter 
                html = `${await getSVG("./images/editor/realtime/highlighter.svg")}<div class="pointer" color none><div name></div></div>`;
                offsetx = -14;
                offsety = -30;
                origin = "bottom center";
                break;
              case 2: // Pen 
                html = `${await getSVG("./images/editor/realtime/pen.svg")}<div class="pointer" color none><div name></div></div>`;
                offsetx = -14;
                offsety = -30;
                origin = "bottom center";
                break;
              case 3: // Eraser
                html = `${await getSVG("./images/editor/realtime/eraser.svg")}<div class="pointer" color none><div name></div></div>`;
                offsetx = -20;
                offsety = -20;
                origin = "center center";
            }
            await sleep(100);
            cursorHolder.innerHTML = html.replace(/MEMBER_COLOR_REPLACE/g, "var(--themeColor)");
            cursorHolder.setAttribute("offsetx", offsetx);
            cursorHolder.setAttribute("offsety", offsety);
            cursorHolder.style.setProperty("--origin", origin);
            cursorHolder.querySelector("[name]").textContent = memberData.name;
            let setTextColor = editor.utils.textColorBackground(memberData.color);
            cursorHolder.style.color = setTextColor;
            if (setTextColor == "#000") {
              cursorHolder.style.setProperty("--textColor", "#000");
            }
            cursorHolder.style.setProperty("--themeColor", memberData.color);
            let colorMain = cursorHolder.querySelector("[color]");
            colorMain.style.width = "fit-content";
            cursorHolder.style.setProperty("--fullyExtended", colorMain.clientWidth + "px");
            colorMain.style.removeProperty("width");
            cursorHolder.style.transform = "translate(" + (member.x + (parseInt(cursorHolder.getAttribute("offsetx") ?? "0")) + contentHolder.scrollLeft) + "px," + (member.y + (parseInt(cursorHolder.getAttribute("offsety") ?? "0")) + contentHolder.scrollTop) + "px)";
            cursorHolder.removeAttribute("notransition");
            cursorHolder.removeAttribute("hidden");
          })();
        } else {
          cursorHolder.style.transform = "translate(" + (member.x + (parseInt(cursorHolder.getAttribute("offsetx") ?? "0")) + contentHolder.scrollLeft) + "px," + (member.y + (parseInt(cursorHolder.getAttribute("offsety") ?? "0")) + contentHolder.scrollTop) + "px)";
        }

        // Handle Selection:
        let userSelection = (extra ?? {}).select ?? {};
        let selectKeys = Object.keys(userSelection);

        if (Object.keys(userSelection).length > 0 && editor.options.cursornames != false) {
          cursorHolder.setAttribute("extend", "");
        } else {
          cursorHolder.removeAttribute("extend");
        }
        if (extra != null && extra.press == true) {
          cursorHolder.setAttribute("pressed", "");
        } else {
          cursorHolder.removeAttribute("pressed");
        }

        // Handle Text Selection
        let textSelectHolder = member.elements.textSelectionHolder;
        if (extra != null && extra.selection != null && extra.selection.length < 100) {
          if (textSelectHolder == null) {
            realtimeHolder.insertAdjacentHTML("beforeend", `<div class="eSelection" member="${memberID}"></div>`);
            textSelectHolder = realtimeHolder.querySelector('.eSelection[member="' + memberID + '"]:not([old])');
            member.elements.textSelectionHolder = textSelectHolder;
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
            select.style.width = (selectData[0] * editor.zoom) + "px";
            select.style.height = (selectData[1] * editor.zoom) + "px";
            select.style.transform = "translate(" + ((selectData[2] * editor.zoom) + annotationRect.left + contentHolder.scrollLeft) + "px," + ((selectData[3] * editor.zoom) + annotationRect.top + contentHolder.scrollTop) + "px)";
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
      }
    });

    this.adjustRealtimeHolder = () => {
      let adjustElements = realtimeHolder.querySelectorAll("div[scale]");
      let annotationRect = editor.utils.localBoundingRect(annotations);
      for (let i = 0; i < adjustElements.length; i++) {
        let element = adjustElements[i];
        if (element.hasAttribute("scale") == true) {
          element.setAttribute("notransition", "");
          if (element.hasAttribute("width") == true) {
            element.style.width = parseFloat(element.getAttribute("width")) * editor.zoom + "px";
          }
          if (element.hasAttribute("height") == true) {
            element.style.height = parseFloat(element.getAttribute("height")) * editor.zoom + "px";
          }
          if (element.hasAttribute("x") == true && element.hasAttribute("y") == true) {
            let x = parseFloat(element.getAttribute("x")) * editor.zoom;
            let y = parseFloat(element.getAttribute("y")) * editor.zoom;
            element.style.transform = "translate(" + (x + annotationRect.left + (parseInt(element.getAttribute("offsetx") ?? "0")) + contentHolder.scrollLeft) + "px," + (y + annotationRect.top + (parseInt(element.getAttribute("offsety") ?? "0")) + contentHolder.scrollTop) + "px)";
          }
          element.offsetHeight;
          element.removeAttribute("notransition");
        }
        if (editor.settings.anonymousMode != true) {
          element.removeAttribute("anonymous");
        } else {
          element.setAttribute("anonymous", "");
        }
      }
    }
    this.removeRealtime = (memberID) => {
      let member = this.members[memberID];
      if (member == null || member.elements == null) {
        return;
      }
      let memberElements = [];
      let elementKeys = Object.keys(member.elements);
      for (let i = 0; i < elementKeys.length; i++) {
        memberElements.push(member.elements[elementKeys[i]]);
      }
      member.elements = {};
      (async function () {
        for (let i = 0; i < memberElements.length; i++) {
          let elem = memberElements[i];
          if (elem != null) {
            elem.style.opacity = 0;
          }
        }
        await sleep(300);
        for (let i = 0; i < memberElements.length; i++) {
          let elem = memberElements[i];
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

    editor.realtime.module = this;
    editor.pipeline.publish("realtime_loaded", {});
  }
}