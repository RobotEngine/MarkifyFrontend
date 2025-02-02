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

          let annotationRect = editor.utils.localBoundingRect(annotations);
          let sendX = ((editor.page.offsetWidth / 2) - annotationRect.left) / editor.zoom;
          let sendY = ((editor.page.offsetHeight / 2) - annotationRect.top) / editor.zoom;

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

    let observeHolder = editor.page.querySelector(".eBottomSection[left]");
    let observeCursor = observeHolder.querySelector(".eObserveCursor");
    let observeExit = editor.page.querySelector(".eObserveExit");
    this.setObserveFrame = (member) => {
      observeCursor.textContent = member.name;
      observeCursor.style.color = editor.utils.textColorBackground(member.color);
      observeCursor.style.background = member.color;
      observeHolder.style.display = "flex";
      //editor.page.style.setProperty("--lightShadow", "0px 0px 8px 0px " + editor.utils.hexToRGB(member.color, .3));
      editor.page.style.boxShadow = "0px 0px 8px 0px " + editor.utils.hexToRGB(member.color, "var(--shadowOpacity)");
    }
    this.enableObserve = async (member) => {
      alertModule.close(editor.realtime.observeLoading);
      editor.realtime.observeLoading = null;

      clearTimeout(editor.realtime.observeTimeout);
      
      this.setObserveFrame(member);

      editor.pipeline.publish("observe_enable", { memberID: member._id });
      editor.pipeline.publish("refresh_interface", {});
    }
    this.exitObserve = async () => {
      let prevObservID = editor.realtime.observing;
      if (prevObservID == null) {
        return;
      }

      editor.realtime.observing = null;
      
      alertModule.close(editor.realtime.observeLoading);
      clearTimeout(editor.realtime.observeTimeout);

      observeHolder.style.removeProperty("display");
      //editor.page.style.removeProperty("--lightShadow");
      editor.page.style.removeProperty("box-shadow");

      cancelAnimationFrame(animationFrameId);

      if (editor.lastZoom != null) {
        editor.setZoom(editor.lastZoom, true);
        editor.lastZoom = null;
      }

      let member = editor.parent.parent.members[prevObservID];
      if (member == null) {
        return;
      }
      if (member.access < 1) {
        this.removeRealtime(member._id);
      }
      sendRequest("DELETE", "lessons/members/observe/exit?member=" + member._id, null, { session: editor.session });
      editor.pipeline.publish("observe_exit", { memberID: member._id });
      editor.pipeline.publish("refresh_interface", {});
    }
    observeExit.addEventListener("click", () => { this.exitObserve(); });
    editor.pipeline.subscribe("realtimeWheelEvent", "wheel", () => { this.exitObserve(); });
    editor.pipeline.subscribe("realtimeSignalUpdate", "signal_strength", (data) => {
      if (data.signalStrength < 3) {
        this.exitObserve();
      }
    });

    let targetScrollPositionX = 0;
    let targetScrollPositionY = 0;
    let animationFrameId;
    let smoothScroll = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      const distanceX = (targetScrollPositionX - contentHolder.scrollLeft) / 10; // Divide the distance into steps
      const distanceY = (targetScrollPositionY - contentHolder.scrollTop) / 10; // Divide the distance into steps
      
      let changeX = Math.min(distanceX, 50);
      if (distanceX < 0) {
        changeX = Math.max(distanceX, -50);
      }
      let changeY = Math.min(distanceY, 50);
      if (distanceY < 0) {
        changeY = Math.max(distanceY, -50);
      }
      if (Math.abs(distanceY) > 1 || Math.abs(distanceX) > 1) {
        contentHolder.scrollTo({ left: contentHolder.scrollLeft + changeX, top: contentHolder.scrollTop + changeY });
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    }
    let startScroll = (targetX, targetY) => {
      targetScrollPositionX = targetX;
      targetScrollPositionY = targetY;
      smoothScroll();
    }

    editor.pipeline.subscribe("realtimeShortSub", "short", async (data) => {
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
        let selections = {};
        let elementKeys = Object.keys(member.elements);
        for (let i = 0; i < elementKeys.length; i++) {
          let elemID = elementKeys[i];
          if (elemID.startsWith("selection_") == false) {
            continue;
          }
          let select = member.elements[elemID];
          if (select == null) {
            continue;
          }
          let annoID = select.getAttribute("anno");
          if (selectKeys.includes(annoID) == false) {
            delete member.elements[elemID];
            //select.setAttribute("old", "");
            select.style.opacity = 0;
            (async () => {
              await sleep(150);
              if (select != null) {
                select.remove();
              }
            })();
          } else {
            selections[annoID] = select;
            if (editor.settings.anonymousMode != true) {
              select.removeAttribute("anonymous");
            } else {
              select.setAttribute("anonymous", "");
            }
          }
        }

        if (extra == null) {
          extra = {};
        }

        if (extra.c != null) {
          let setColor = cursorHolder.querySelector("[toolcoloropacity]");
          if (setColor != null) {
            setColor.setAttribute("fill", "#" + extra.c ?? "000");
            setColor.setAttribute("fill-opacity", (extra.o ?? 100) / 100);
          }
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
            let anno = extra.select[annoID] ?? {};
            let merge;
            let annoElem;
            let original;
            if (annoID == "cursor") {
              // Just a temporary prop, no saving:
              let prevElem = member.elements.selection_cursor_annotation;
              if (prevElem != null && prevElem.getAttribute("type") != anno.f) {
                prevElem.remove();
                prevElem = null;
              }
              ([merge, annoElem] = await editor.render.createAnnotation({ ...anno, _id: memberID + "_cursor" }, prevElem));
              member.elements.selection_cursor_annotation = annoElem;
              annoElem.setAttribute("member", memberID);
              annoElem.setAttribute("anno", "cursor");
              annoElem.setAttribute("type", anno.f);
              annoElem.style.opacity = .7;
              hasCursorAnno = true;
              member.cursorRender = merge;
            } else {
              original = editor.annotations[annoID];
              if (original != null && original.pointer != null) {
                annoID = original.pointer;
                original = editor.annotations[annoID];
              }
              anno._id = annoID;
              let isNewAnno = annoID.startsWith("pending_") == true;
              if (original == null && isNewAnno == true) {
                editor.annotations[annoID] = {};
                original = editor.annotations[annoID];
              }
              original = original ?? {};
              let originalRender = original.render ?? {};
              if (editor.settings.editOthersWork != true && (originalRender.a ?? originalRender.m) != null && [originalRender.a, originalRender.m].includes(memberData.modify) == false && memberData.access < 4) { // Can't edit another member's work:
                delete userSelection[annoID];
                continue;
              }
              let setRender = { ...originalRender, ...anno };
              if (setRender._id == null || setRender.p == null || setRender.s == null) {
                delete userSelection[annoID];
                continue;
              } else if (setRender.remove == true) {
                delete userSelection[annoID];
              }
              if (anno.lock == false) {
                if ([originalRender.a, originalRender.m].includes(memberData.modify) == false && memberData.access < 4) {
                  anno.lock = null;
                }
              }

              original.revert = original.revert ?? JSON.parse(JSON.stringify(originalRender));

              if (originalRender.lock != true || anno.lock == false) { // Can't edit another member's work:
                if (anno.remove == true && editor.selecting[annoID] != null) {
                  delete editor.selecting[annoID];
                  userSelecting = true;
                }
                if (Object.keys({ ...anno, done: "" }).length > 2) {
                  changes = true;
                }
                if (anno.done != true && forced != true) {
                  original.render = setRender;
                } else if (changes == true) {
                  original.render = setRender;
                  delete original.render.done;
                  await editor.save.applyEdit(anno, null, time);
                }
                if (changes == true) {
                  if (isNewAnno == false) {
                    original.render.m = member.modify;
                  } else {
                    original.render.a = member.modify;
                  }
                  original.render.sync = time;
                  editor.save.enableTimeout(original, null, true);
                }
              }
            }

            let selection;
            if ((anno.f == null || anno.sync != null || annoID == "cursor") && userSelection[annoID] != null) {
              selection = selections[annoID];
              if (selection == null) {
                realtimeHolder.insertAdjacentHTML("beforeend", `<div class="eCollabSelect" member="${memberID}" new></div>`);
                selection = realtimeHolder.querySelector('.eCollabSelect[member="' + memberID + '"][new]');
                member.elements["selection_" + annoID] = selection;
                selection.removeAttribute("new");
                selection.style.setProperty("--themeColor", memberData.color);
                if (editor.settings.anonymousMode != true) {
                  selection.removeAttribute("anonymous");
                } else {
                  selection.setAttribute("anonymous", "");
                }
                selection.offsetHeight;
              }
              selection.setAttribute("anno", annoID);
            }
            
            if (annoID != "cursor") {
              if (editor.selecting[annoID] == null) {
                merge = original.render;
                if (selection != null) {
                  selection.removeAttribute("notransition");
                }
              } else {
                merge = { ...original.render, ...(editor.selecting[annoID] ?? {}) };
                userSelecting = true;
              }
              if (["text", "sticky"].includes(merge.f) == true && anno.d != null) {
                let annoTx = annotations.querySelector('.eAnnotation[anno="' + annoID + '"] div[contenteditable]');
                if (annoTx != null) {
                  annoTx.removeAttribute("contenteditable");
                }
              }
              await editor.utils.annotationChunks(editor.annotations[annoID]);
              [merge, annoElem] = await editor.render.createAnnotation(merge);
              if (selection != null && anno.remove == true && selection.hasAttribute("remove") == false) {
                delete member.elements["selection_" + annoID];
                selection.setAttribute("remove", "");
                //selection.setAttribute("old", "");
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
              let border = 0;
              let [width, height] = merge.s;
              let [x, y] = editor.utils.getAbsolutePosition(merge);
              let rotate = merge.r ?? 0;
              if (rotate > 180) {
                rotate = -(360 - rotate);
              }
              if (width < 0) {
                width = -width;
                x -= width;
              }
              if (height < 0) {
                height = -height;
                y -= height;
              }
              let t = merge.t ?? 0;
              if (merge.b == "none" && merge.d != "line") {
                t = 0;
              }
              let halfT = t / 2;
              let boxWidth = ((width + t) * editor.zoom) - 3; // +0 for width, -3 for border
              let boxHeight = ((height + t) * editor.zoom) - 3;
              selection.style.width = boxWidth + "px";
              selection.style.height = boxHeight + "px";
              selection.style.transform = "translate(" + (annotationRect.left + ((x + halfT) * editor.zoom) + contentHolder.scrollLeft - 1.5) + "px," + (annotationRect.top + (((y + halfT) - border) * editor.zoom) + contentHolder.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
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
            editor.pipeline.publish("redraw_selection", {});
          } else if (userSelecting == true || refreshSelecting == true) {
            editor.pipeline.publish("redraw_selection", {});
          }
          if (member.cursorRender != null && hasCursorAnno == false) {
            delete member.cursorRender;
          }
        }

        if (Object.keys(userSelection).length > 0 && editor.options.cursornames != false) {
          cursorHolder.setAttribute("extend", "");
        } else {
          cursorHolder.removeAttribute("extend");
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
      } else if (data[3] != null) { // OBSERVE EVENT
        let [ memberID, _, zoom, scrollX, scrollY, time ] = data;
        if (memberID != editor.realtime.observing) {
          return;
        }
        if (member.lastObserveShort > time) {
          return;
        }
        if (editor.realtime.observeLoading != null) {
          //editor.lastZoom = editor.zoom;
          this.enableObserve(memberData);
        }
        if (editor.zoom != zoom) {
          await editor.setZoom(zoom, true);
        }
        scrollX *= editor.zoom;
        scrollY *= editor.zoom;
        let annotationRect = editor.utils.localBoundingRect(annotations);
        let setX = contentHolder.scrollLeft + annotationRect.left;
        let setY = contentHolder.scrollTop + annotationRect.top;
        setX += scrollX;
        setY += scrollY;
        setX -= editor.page.offsetWidth / 2;
        setY -= editor.page.offsetHeight / 2;
        if (editor.realtime.observeLoading == null) {
          startScroll(setX, setY);
        } else {
          contentHolder.scrollTo({ left: setX, top: setY });
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

modules["dropdowns/lesson/members"] = class {
  html = `
  <div class="eMemberHolder">
    <div class="eMemberSearchHolder">
      <img src="./images/editor/glass.svg">
      <input placeholder="Search..."></input>
    </div>
    <div class="eMemberMemberHolder">
      <div class="eMemberAccessHolder" access="5">
        <button class="eMemberAccessTitle"><div holder><div title>Owner</div><div count>0</div></div></button>
      </div>
      <div class="eMemberAccessHolder" access="1">
        <button class="eMemberAccessTitle"><div holder><div title>Editors</div><div count>0</div></div></button>
      </div>
      <div class="eMemberAccessHolder" access="0">
        <button class="eMemberAccessTitle"><div holder><div title>Viewers</div><div count>0</div></div></button>
      </div>
    </div>
  </div>
  `;
  css = {
    ".dropdownTitle span": `display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: #fff; box-shadow: 0px 0px 8px 0px rgba(var(--themeColorRGB), .3); border-radius: 12px; font-weight: 700`,

    ".eMemberHolder": `width: 275px; max-width: 100%`,
    ".eMemberSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".eMemberSearchHolder img": `width: 28px; height: 28px`,
    ".eMemberSearchHolder input": `max-width: calc(100% - 54px); width: 100%; padding: 4px 8px; margin-left: 6px; border: solid 2px var(--secondary); outline: unset; border-radius: 17px; font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eMemberSearchHolder input::placeholder": `color: var(--secondary)`,

    ".eMemberAccessHolder": `display: none; margin-bottom: 12px; background: var(--pageColor)`,
    ".eMemberAccessTitle": `position: sticky; display: flex; width: 100%; padding: 0; top: 0px; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 2; text-align: left; font-weight: 700; font-size: 18px`,
    ".eMemberAccessTitle div[holder]": `display: flex; width: 100%; padding: 4px 8px; top: 0px; justify-content: space-between; transition: .1s`,
    ".eMemberAccessTitle div[count]": `margin-left: 6px; font-weight: 500`,
    ".eMemberAccessTitle:hover div[holder]": `background: var(--hover)`,
    ".eMemberAccessTitle:active": `transform: scale(1) !important`,
    ".eMemberAccessTitle:active div[holder]": `background: var(--secondary); color: #fff !important`,
    ".eMemberAccessHolder[selected] .eMemberAccessTitle div[holder]": `background: var(--secondary); color: #fff`,

    ".eMemberTile": `position: relative; display: flex; width: 100%; height: 34px; padding: 0px; justify-content: center; align-items: center; z-index: 1`, //; margin: 4px 0
    ".eMemberTile div[holder]": `--opacity: 0; position: relative; display: flex; width: 100%; padding: 4px; overflow: hidden; align-items: center; transition: .1s`, //; margin: 4px 0
    ".eMemberBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: var(--opacity); transition: .1s; z-index: -1`,
    ".eMemberAccessHolder button:hover div[holder]": `--opacity: .35`,
    ".eMemberAccessHolder button:hover .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberAccessHolder button:active": `transform: scale(1) !important`,
    ".eMemberAccessHolder button:active div[holder]": `--opacity: 1; color: var(--hoverTextColor); border-radius: 18px; transform: scale(.95)`,
    ".eMemberAccessHolder button:active .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberTile div[holder][selected]": `--opacity: 1 !important; color: var(--hoverTextColor)`,
    ".eMemberTile div[holder][selected] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".eMemberAccessHolder[hover] div[holder]": `--themeColor: var(--secondary) !important; --opacity: .35 !important; color: var(--textColor)`,
    ".eMemberAccessHolder[hover] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberAccessHolder[active] div[holder]": `--opacity: 1 !important; border-radius: 18px; transform: scale(.95); color: #fff`,
    ".eMemberAccessHolder[active] .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberAccessHolder[selected] div[holder]": `--themeColor: var(--secondary) !important; --opacity: 1 !important; color: #fff`,
    ".eMemberAccessHolder[selected] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor)`,
    ".eMemberCursor": `width: 20px; height: 20px; flex-shrink: 0; margin: 0 6px; background: var(--pageColor); border: solid 3px var(--themeColor); overflow: hidden; border-radius: 8px 14px 14px; transition: 0.2s`, //box-shadow: 0 0 6px rgb(0 0 0 / 50%);
    ".eMemberName": `width: 100%; font-size: 16px; font-weight: 600; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberEvents": `display: flex; margin-left: auto`,
    ".eMemberEvent": `height: fit-content; padding: 3px 6px; margin: 0 1px 0 6px; border-radius: 12px; color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap`,
    ".eMemberEvent[self]": `background: var(--theme)`,
    ".eMemberEvent[hand]": `background: var(--green)`,
    ".eMemberEvent[idle]": `background: var(--yellow)`,
    ".eMemberEvent[observe]": `background: var(--purple)`,

    ".eMemberFrameHolder": `position: absolute; width: 200%; height: fit-content; right: 0px; pointer-events: none; z-index: 0; opacity: 0; transition: top .3s, opacity .3s`,
    ".eMemberFrame": `--themeColor: var(--theme); position: sticky; width: calc(50% - 4px); max-width: calc(100vw - 20px); left: 8px; top: 8px; margin-left: 4px; pointer-events: all; background: var(--pageColor); border-right: solid 4px var(--themeColor); border-radius: 38px 0 0 12px; transform-origin: top right; transform: scale(0); transition: transform .3s`,
    ".eMemberFrameContentHolder": `width: 100%; height: 0px; border-radius: 38px 0 0 12px; overflow: hidden`,
    ".eMemberFrameShadow": `position: absolute; width: 100%; height: 100%; padding: 16px 0 16px 16px; right: 0px; top: -16px; pointer-events: none; border-radius: inherit; overflow: hidden; z-index: -1`,
    ".eMemberFrameShadow:after": `position: absolute; width: calc(100% - 16px); height: calc(100% - 32px); right: 0px; top: 16px; content: ""; box-shadow: var(--shadow); border-radius: inherit`,
    ".eMemberFrameContent": `overflow: auto`,
    ".eMemberSection": `position: relative; display: flex; width: 100%; justify-content: center; align-items: center`,
    ".eMemberSectionInfo": `border-radius: 38px 0 0 38px; overflow: hidden`,
    ".eMemberBackdrop": `position: absolute; display: flex; width: calc(100% + 2px); height: 100%; left: 0px; top: 0px; justify-content: center; align-items: center; background: var(--themeColor); transition: .2s; z-index: -1`,
    ".eMemberBackdrop div": `width: 100%; height: 100%; flex-shrink: 0; opacity: .3; background-image: url(./images/editor/background.svg); background-position: center`, //transform: rotate(12deg);
    ".eMemberFrameCursor": `width: 40px; height: 40px; flex-shrink: 0; margin: 12px; background: var(--themeColor); border: solid 6px var(--pageColor); border-radius: 16px 28px 28px; transition: 0.2s`,
    ".eMemberFramePicture": `width: 44px; height: 44px; flex-shrink: 0; margin: 12px; border: solid 4px var(--pageColor); object-fit: cover; border-radius: 28px; transition: 0.2s`,
    ".eMemberFrameInfoHolder": `display: flex; flex-direction: column; width: calc(100% - 76px); height: calc(100% - 12px); color: var(--adaptColor); text-align: left`,
    ".eMemberFrameInfoHolder div[name]": `width: calc(100% - 30px); font-size: 20px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberFrameInfoHolder div[email]": `width: 100%; font-size: 15px; font-weight: 500; margin-top: 3px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberFrameInfoHolder div[joined]": `font-size: 14px; font-weight: 500; text-align: right; margin: auto 6px 2px 0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberClose": `position: absolute; width: 22px; height: 22px; top: 4px; right: 0px; margin: 5px 5px 5px 12px; background: var(--pageColor); --borderWidth: 3px; --borderRadius: 14px`,
    ".eMemberClose img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".eMemberSectionDesc": `box-sizing: border-box; padding: 12px 12px 0; font-size: 14px`,
    ".eMemberSectionEvents": `flex-direction: column`,
    ".eMemberEventHolder": `display: none; width: calc(100% - 24px); margin: 12px 12px 0px; justify-content: space-between; align-items: center`,
    ".eMemberEventHolder .eMemberEvent": `margin: 0px 8px 0 0`,
    ".eMemberEventDesc": `font-size: 14px; text-align: right`,
    ".eMemberSectionActions": `flex-wrap: wrap; width: calc(100% - 12px); padding: 6px; margin-top: 6px; justify-content: space-around`,
    ".eMemberSectionActions button": `display: flex; flex-direction: column; width: 86.33px; padding: 6px 12px; align-items: center; border-radius: 14px; color: var(--themeColor); overflow: visible`,
    ".eMemberSectionActions button img": `width: 55px; height: 55px; transition: .15s`,
    ".eMemberSectionActions button div": `margin-top: 6px; font-size: 14px; font-weight: 600; white-space: nowrap`,
    ".eMemberSectionActions button:hover img": `transform: scale(1.15) translateY(-2px)`,
    ".eMemberSectionActions button:active": `background: var(--themeColor); color: #fff`,
    ".eMemberSectionActions button:active img": `filter: brightness(0) invert(1); transform: scale(1)`
  };
  js = async function (frame, extra) {
    let parent = extra.parent;
    let editor = parent.editor;
  }
}