modules["editor/realtime"] = class {
  js = async function (editor) {
    let content = editor.contentHolder.querySelector(".eContent");
    let realtimeHolder = content.querySelector(".eRealtime");
    let annotations = content.querySelector(".eAnnotations");

    let lastCursorPublish = 0;
    let lastObservePublish = 0;
    let lastCursorContent = "";
    let lastObserveContent = "";
    let lastCursorChunk;

    let mouseX = 0;
    let mouseY = 0;
    let endSyncTimeout;
    let endSyncObserveTimeout;
    this.publishShort = async (event, type, ignoreSame) => {
      type = type ?? "cursor";
      if (event != null) {
        ({ mouseX, mouseY } = editor.utils.localMousePosition(event));
      }
      if (editor.parent.memberCount < 2) { // No one to send cursor events too!
        return;
      }
      if (editor.parent.parent.signalStrength < 3) { // If weak don't send!
        return;
      }
      if (editor.self.access < 1 && editor.realtime.observed != true) { // Not an editor!
        return;
      }
      let epoch = getEpoch();
      if (type == "cursor") {
        clearTimeout(endSyncTimeout);
        if (lastCursorPublish < epoch - 80 || ignoreSame == true) { // One event every 80 ms
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
                let alreadyInsert = {};
                for (let i = 0; i < Math.min(selections.length, 100); i++) {
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
          editor.pipeline.publish("short", data);
        });
        editor.realtime.subscribes.push(this.shortSub);
      }
    }

    editor.pipeline.subscribe("realtimeShortSub", "short", (data) => {
      
    });

    this.adjustRealtimeHolder = () => {

    }

    editor.realtime.module = this;
    editor.pipeline.publish("realtime_loaded", {});
  }
}