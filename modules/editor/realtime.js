modules["editor/realtime"] = {
  icons: {

  },
  css: {
    ".eCursor": `--backgroundColor: var(--themeColor); --borderColor: #fff; --textColor: #fff; position: absolute; display: flex; z-index: 20; opacity: 0; transition: .25s; pointer-events: all; transform-origin: top left`,
    ".eCursor[pressed]": `--backgroundColor: #fff; --borderColor: var(--themeColor); --textColor: #000; transform: scale(.9)`,
    ".eCursor .pointer": `width: 20px; height: 20px; background: var(--backgroundColor); border: solid 3px var(--borderColor); overflow: hidden; border-radius: 8px 14px 14px 14px; box-shadow: 0 0 6px rgb(0 0 0 / 50%); transition: 0.3s`,
    ".eCursor [name]": `box-sizing: border-box; display: flex; width: fit-content; height: 100%; padding: 0px 6px; border-radius: 14px; overflow: hidden; opacity: 0; white-space: nowrap; color: var(--textColor); font-size: 14px; font-weight: 700; white-space: nowrap; align-items: center; transition: 0.15s`,
    ".eCursor:hover [color]": `width: var(--fullyExtended)`,
    ".eCursor:hover [name]": `width: unset; opacity: 1`,

    ".eSelection": `opacity: 0; z-index: 10; transition: .3s`,
    ".eSelection div": `position: absolute; background: var(--themeColor); opacity: .4; border-radius: 4px`
  },
  js: async function (editor, page) {
    this.editor = editor;
    editor.realtime.module = this;
    console.log(editor);

    page.querySelector(".eMembers").removeAttribute("disabled");
    page.querySelector(".eShare").removeAttribute("disabled");

    let alert = await getModule("alert");

    editor.codeTextButton.setAttribute("dropdown", "dropdowns/editor/share/pin");

    // Update connectivity:
    let statusIcon = page.querySelector(".eConnection");
    let statusTx = page.querySelector(".eStatus");
    this.connectUpdate = () => {
      //object-position: -60px -4px;
      let imgPos = 0;
      let status = "";
      switch (editor.realtime.strenth) {
        case 3: // Full Connection:
          imgPos = -60;
          status = "Strong Connection | All features seamlessly synced to the cloud.";
          break;
        case 2: // Weak Connection
          imgPos = -30;
          status = "Weak Connection | Cloud-saved annotations, limited real-time features.";
          break;
        case 1: // No Connection
          imgPos = 0;
          status = "No Connection | Annotations stored on-device, synced to cloud upon reconnecting.";
      }
      statusIcon.style.objectPosition = imgPos + "px -4px";
      statusIcon.title = status;
      statusIcon.removeAttribute("disabled");

      this.setShortSub(editor.visiblePages);

      let zCursorAction = fixed.querySelector('.eZoomAction[option="cursors"]');
      if (zCursorAction) {
        if (editor.realtime.strenth < 3) {
          zCursorAction.style.opacity = 0.5;
          zCursorAction.title = "Cursors disabled due to weak connection.";
        } else {
          zCursorAction.style.opacity = 1;
          zCursorAction.title = "Display the cursors of other editors.";
        }
      }
    }

    // PING / PONG for measuring internet speed:
    let pingFilter = { c: "short_" + this.editor.id, p: editor.session };
    let awaiting = {};
    let timeoutTime = 500; // ms
    subscribe(pingFilter, (pingID) => {
      if (getEpoch() - pingID < timeoutTime) {
        awaiting[pingID] = "";
      }
    });
    editor.realtime.ping = (attempt) => {
      if (editor.active == false) {
        return;
      }
      attempt = attempt || 1;
      let pingID = getEpoch();
      setTimeout(() => {
        if (awaiting[pingID] == "") {
          delete awaiting[pingID];
          // STRONG INTERNET
          if (editor.realtime.strenth != 3) {
            if (attempt < 3) {
              // Try 2 more times to make sure:
              editor.realtime.ping(attempt + 1);
            } else {
              // Enable the stuff:
              editor.realtime.strenth = 3;
              this.connectUpdate();
              alert.open("info", "<b>Connection Restored</b>A strong connection has been established, all features enabled.");
            }
          }
        } else {
          // WEAK INTERNET
          if (editor.realtime.strenth != 2) {
            if (attempt < 3) {
              // Try 2 more times to make sure:
              editor.realtime.ping(attempt + 1);
            } else {
              // Disable the stuff:
              editor.realtime.strenth = 2;
              this.connectUpdate();
              alert.open("info", "<b>Weak Connection</b>While you are still connected, real-time collaboration is disabled to save bandwidth.");
            }
          }
        }
      }, timeoutTime);
      socket.publish(pingFilter, pingID, { publishToSelf: true });
    }

    // CURSORS
    let realtimeHolder = page.querySelector(".eRealtime");
    let pageHolder = page.querySelector(".ePageHolder");
    let lastCursorPublish = 0;
    let lastCursorContent = "";
    let lastCursorPage;

    this.findPage = (y) => {
      for (let i = 0; i < editor.visiblePages.length; i++) {
        let pageElem = pageHolder.children[editor.visiblePages[i] - 1];
        if (pageElem == null) {
          continue;
        }
        let rect = pageElem.getBoundingClientRect();
        if (rect.bottom > y) {
          return editor.visiblePages[i];
        }
      }
      return 0;
    }
    let mouseX = 0;
    let mouseY = 0;
    this.publishShort = (event) => {
      if (event && event.x) {
        mouseX = event.x;
        mouseY = event.y;
      }
      if (editor.realtime.strenth < 3) { // If weak don't send!
        return;
      }
      /* // Disabled as others should still see your cursor!
      if (editor.options.cursors == false) {
        return;
      }
      */
      if (lastCursorPublish < getEpoch() - 80) { // One event every 80 ms
        let filter = { c: "short_" + editor.id };

        // Figure out where the cursor is:
        let sendX = mouseX;
        let sendY = mouseY;
        let pageRect;
        if (editor.visiblePages) {
          filter.p = this.findPage(sendY);
          if (filter.p > 0) {
            pageRect = pageHolder.children[filter.p - 1].getBoundingClientRect();
            sendX -= pageRect.left;
            sendY -= pageRect.top;
          }
        }

        if (filter.p != (lastCursorPage || filter.p)) {
          socket.publish({ c: "short_" + editor.id, p: lastCursorPage }, [ editor.sessionID, filter.p ]); // When leaving a page, tell everyone!
        }

        let scaleZoom = 1 / editor.zoom;

        // [ memberID, page, tool, time, mouseX, mouseY, extra (anno) ]
        let pubData = [ editor.sessionID, filter.p, 0, 0, Math.floor(sendX * scaleZoom), Math.floor(sendY * scaleZoom)];

        let addTextSelect = [];
        if (window.getSelection != null) {
          let select = window.getSelection();
          if (select.rangeCount > 0) {
            let range = select.getRangeAt(0);
            if (range.toString().length > 0 && range.endContainer.parentNode.getAttribute("role") == "presentation") {
              let selections = range.getClientRects();
              let alreadyInsert = {};
              for (let i = 0; i < Math.min(selections.length, 100); i++) {
                let selRect = selections[i];
                let checkInsert = (selRect.width * selRect.height) + selRect.left + selRect.top;
                if (alreadyInsert[checkInsert] != null) {
                  continue;
                }
                let selX = selRect.x;
                let selY = selRect.y;
                let page = this.findPage(selY);
                if (editor.visiblePages && pageHolder.children[page - 1]) {
                  let selPageRect = pageHolder.children[page - 1].getBoundingClientRect();
                  selX -= selPageRect.left;
                  selY -= selPageRect.top;
                }
                if (selRect.width > 0 && selRect.height > 0) {
                  alreadyInsert[checkInsert] = "";
                  // [ PAGE, WIDTH, HEIGHT, X, Y ]
                  addTextSelect.push([ page, Math.floor(selRect.width*scaleZoom), Math.floor(selRect.height*scaleZoom), Math.floor(selX * scaleZoom), Math.floor(selY * scaleZoom)]);
                }
              }
            }
          }
        }
        if (addTextSelect.length > 0) {
          if (pubData[6] == null) {
            pubData.push({});
          }
          pubData[6].selection = addTextSelect;
        }
        if (mouseDown()) {
          if (pubData[6] == null) {
            pubData.push({});
          }
          pubData[6].press = true;
        }
        
        let updJSONContent = JSON.stringify([filter, pubData]);
        if (updJSONContent == lastCursorContent) {
          return;
        }
        pubData[3] = getEpoch();

        // PUBLISH the event:
        socket.publish(filter, pubData);
        lastCursorPublish = getEpoch();
        lastCursorPage = filter.p;
        lastCursorContent = updJSONContent;
      }
    }
    page.addEventListener("mousemove", this.publishShort);
    mouseEvent = this.publishShort;
    editor.scrollEvent = this.publishShort;
    page.addEventListener("click", this.publishShort);

    this.adjustRealtimeHolder = () => { // Scale realtime elements when zoom or resize:
      let adjustElements = realtimeHolder.querySelectorAll("[scale]");
      for (let i = 0; i < adjustElements.length; i++) {
        let element = adjustElements[i];
        if (element.hasAttribute("width")) {
          element.style.width = parseFloat(element.getAttribute("width")) * editor.zoom + "px";
        }
        if (element.hasAttribute("height")) {
          element.style.height = parseFloat(element.getAttribute("height")) * editor.zoom + "px";
        }
        let pageRect;
        if (element.hasAttribute("page")) {
          pageRect = pageHolder.children[parseInt(element.getAttribute("page")) - 1].getBoundingClientRect();
        }
        if (element.hasAttribute("x")) {
          let x = parseFloat(element.getAttribute("x")) * editor.zoom;
          if (pageRect) {
            x += pageRect.left;
          }
          element.style.left = x + window.scrollX + "px";
        }
        if (element.hasAttribute("y")) {
          let y = parseFloat(element.getAttribute("y")) * editor.zoom;
          if (pageRect) {
            y += pageRect.top;
          }
          element.style.top = y + window.scrollY + "px";
        }
      }
    }

    this.shortSub = null;
    this.setShortSub = (pages) => {
      if (editor.realtime.strenth < 3 || editor.options.cursors == false) {
        pages = null;
      }
      if (pages != null && pages.length < 1) {
        pages.push(0);
      }
      let filter = { c: "short_" + editor.id, p: pages };
      if (this.shortSub) {
        this.shortSub.edit(filter);
      } else {
        this.shortSub = subscribe(filter, (data) => {
          console.log(data);
          let [ memberID, page, tool, time, x, y, extra ] = data;
          let member = editor.members[memberID];
          if (member == null) {
            return;
          }
          if (member.lastShort > time) {
            return;
          }
          member.lastShort == time;
          clearInterval(member.interval);
          member.interval = setInterval(() => { // Remove member elements if too inactive:
            let remMemberElem = realtimeHolder.querySelectorAll('[member="' + memberID + '"]');
            for (let i = 0; i < remMemberElem.length; i++) {
              let elem = remMemberElem[i];
              (async function () {
                elem.style.opacity = 0;
                await sleep(300);
                elem.remove();
              })();
            }
          }, 120000); // 2 Minutes
          let cursorHolder = realtimeHolder.querySelector('.eCursor[member="' + memberID + '"]');
          if (cursorHolder == null) {
            realtimeHolder.insertAdjacentHTML("beforeend", `<div class="eCursor" member="${memberID}" scale></div>`);
            cursorHolder = realtimeHolder.querySelector('.eCursor[member="' + memberID + '"]');
            cursorHolder.offsetHeight;
            cursorHolder.style.opacity = 1;
          }
          // Set x and y:
          cursorHolder.setAttribute("x", x);
          cursorHolder.setAttribute("y", y);
          x = x * editor.zoom;
          y = y * editor.zoom;
          if (page > 0) {
            let pageRect = pageHolder.children[page - 1].getBoundingClientRect();
            cursorHolder.setAttribute("page", page);
            x += pageRect.left;
            y += pageRect.top;
          }
          cursorHolder.style.left = x + window.scrollX + "px";
          cursorHolder.style.top = y + window.scrollY + "px";
          if (tool == null) {
            // Must be for a page leave event:
            if (editor.visiblePages.includes(page)) {
              return;
            }
            (async function () {
              cursorHolder.style.opacity = 0;
              await sleep(300);
              cursorHolder.remove();
            })();
            return;
          } else {
            cursorHolder.style.opacity = 1;
          }
          if (parseInt(cursorHolder.getAttribute("mode") || -1) != tool) {
            switch (tool) {
              case 0: // Normal cursor:
                cursorHolder.innerHTML = `<div class="pointer" color><div name></div></div>`;
            }
            cursorHolder.querySelector("[name]").textContent = member.name;
            cursorHolder.style.setProperty("--themeColor", member.color);
            let colorMain = cursorHolder.querySelector("[color]");
            colorMain.style.width = "fit-content";
            cursorHolder.style.setProperty( "--fullyExtended", (cursorHolder.clientWidth - 6) + "px");
            colorMain.style.removeProperty("width");
            cursorHolder.setAttribute("mode", tool);
          }
          if (extra && extra.press) {
            cursorHolder.setAttribute("pressed", "");
          } else {
            cursorHolder.removeAttribute("pressed");
          }
          // Handle selection:
          let selectionHolder = realtimeHolder.querySelector('.eSelection[member="' + memberID + '"]:not([old])');
          if (extra && extra.selection) {
            let selection = extra.selection;
            if (selectionHolder == null) {
              realtimeHolder.insertAdjacentHTML("beforeend", `<div class="eSelection" member="${memberID}"></div>`);
              selectionHolder = realtimeHolder.querySelector('.eSelection[member="' + memberID + '"]:not([old])');
              selectionHolder.style.setProperty("--themeColor", member.color);
            }
            selectionHolder.innerHTML = "";
            for (let i = 0; i < Math.min(selection.length, 100); i++) {
              let selectData = selection[i];
              selectionHolder.insertAdjacentHTML("beforeend", `<div scale new></div>`);
              let select = selectionHolder.querySelector('.eSelection div[new]');
              select.removeAttribute("new");
              select.setAttribute("width", selectData[1]);
              select.setAttribute("height", selectData[2]);
              select.setAttribute("x", selectData[3]);
              select.setAttribute("y", selectData[4]);
              select.style.width = (selectData[1] * editor.zoom) + "px";
              select.style.height = (selectData[2] * editor.zoom) + "px";
              let selX = selectData[3] * editor.zoom;
              let selY = selectData[4] * editor.zoom;
              if (selectData[0] > 0) {
                let pageRect = pageHolder.children[selectData[0] - 1].getBoundingClientRect();
                select.setAttribute("page", selectData[0]);
                selX += pageRect.left;
                selY += pageRect.top;
              }
              select.style.left = selX + window.scrollX + "px";
              select.style.top = selY + window.scrollY + "px";
            }
            selectionHolder.style.opacity = 1;
          } else if (selectionHolder != null) {
            (async function () {
              selectionHolder.setAttribute("old", "");
              selectionHolder.style.opacity = 0;
              await sleep(300);
              selectionHolder.remove();
            })();
          }
        });
      }
    }

    this.connectUpdate();
  }
}

modules["dropdowns/editor/share"] = {
  html: `
  <button class="eShareOption" dropdown="dropdowns/editor/share/pin" title="Invite members through a pin."><img src="./images/editor/share/pin.svg"><div class="eShareInfo"><div class="eShareTitle">Present with <b>Pin</b></div><div class="eShareDesc">Allow members to join as a viewer through a 6-digit pin code.</div></div></button>
  <button class="eShareOption" dropdown="dropdowns/account" title="Invite members through a link."><img src="./images/editor/share/link.svg"><div class="eShareInfo"><div class="eShareTitle">Share with <b>Link</b></div><div class="eShareDesc">Allow members to join as a viewer or editor through a sendable link.</div></div></button>
  <button class="eShareOption" dropdown="dropdowns/editor/zoom" title="Invite members through email."><img src="./images/editor/share/email.svg"><div class="eShareInfo"><div class="eShareTitle">Invite with <b>Email</b></div><div class="eShareDesc">Invite members as a viewer or editor with their email.</div></div></button>
  `,
  css: {
    ".eShareOption": `display: flex; flex-wrap: wrap; padding: 0; border-radius: 8px; justify-content: center; align-items: center; transition: .15s`,
    ".eShareOption:not(:first-child)": `margin-top: 6px`,
    ".eShareOption:hover": `background: var(--theme); color: #fff`,
    ".eShareOption:hover img": `filter: brightness(0) invert(1)`,
    ".eShareOption:hover b": `color: #fff`,
    ".eShareOption:active": `transform: scale(.95); border-radius: 14px`,
    ".eShareOption img": `height: 32px; margin: 6px; transition: .15s`,
    ".eShareOption .eShareInfo": `margin: 6px; text-align: left`,
    ".eShareOption .eShareTitle": `font-size: 18px; font-weight: 600`,
    ".eShareOption b": `color: var(--theme); font-weight: 800; transition: .15s`,
    ".eShareOption .eShareDesc": `max-width: 250px; font-size: 14px`
  },
  js: async function (frame) {
    //let editor = await getModule("pages/editor");
  }
}

modules["dropdowns/editor/share/pin"] = {
  title: '<div>Present with <b style="color: var(--theme); font-weight: 800">Pin</b></div>',
  html: `
  <div class="eSharePinCreate">
    <button class="largeButton">Generate Pin</button>
  </div>
  <div class="eSharePinLink">Join with this <b>pin</b> at <a href="${location.origin}/join" target="_blank">${location.host}/join</a></div>
  <div class="eSharePinDisplay"><span section left></span><div></div><span section right></span></div>
  <div class="eSharePinOptions">
    <button class="eSharePinRemove" title="Invalidate the pin.">Remove</button>
    <button class="eSharePinCopy" title="Copy the pin code."><img src="./images/tooltips/copy.svg"></button>
  </div>
  `,
  css: {
    ".eSharePinCreate": "position: absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eSharePinCreate button": `background: var(--theme); border-radius: 20.25px; color: #fff`,
    ".eSharePinLink": "margin-top: 8p; transition: .3s",
    ".eSharePinLink a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    ".eSharePinHolder": `display: flex`,
    ".eSharePinDisplay": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: var(--theme); font-size: 60px; font-weight: 700; letter-width: 8px; transition: .3s`,
    ".eSharePinDisplay span[section]": `display: block; height: 81px; padding: 0 16px; margin: 10px; border: solid 4px var(--hover); border-radius: 20px; letter-spacing: 10px`,
    ".eSharePinDisplay div": `width: 12px; height: 12px; background: var(--hover); border-radius: 12px`,
    ".eSharePinOptions": `display: none; flex-wrap: wrap; width: calc(100% - 16px); margin: 0 8px 8px 8px; justify-content: space-between`,
    ".eSharePinOptions button": `display: flex; justify-content: center; align-items: center; border-radius: 16px; font-size: 16px; font-weight: 700`,
    ".eSharePinRemove": `height: 32px; padding: 6px 10px; margin: 4px; background: var(--error); color: #fff`,
    ".eSharePinCopy": `width: 26px; height: 26px; padding: 0; margin: 7px; outline: solid 3px var(--hover)`,
    ".eSharePinCopy img": `width: 22px`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");
    let createHolder = frame.querySelector(".eSharePinCreate");
    let createButton = createHolder.querySelector("button");
    let pinTx = frame.querySelector(".eSharePinDisplay");
    editor.updatePin = () => {
      let currentPin = (editor.lesson.pin || "123456").split("");
      let left = "";
      let right = "";
      for (let i = 0; i < currentPin.length; i++) {
        let char = currentPin[i];
        let charHTML = char;
        if (parseInt(char) < 10) {
          charHTML = `<span style="color: var(--secondary)">${char}</span>`;
        }
        if (i < 3) {
          left += charHTML;
        } else {
          right += charHTML;
        }
      }
      pinTx.querySelector("span[left]").innerHTML = left;
      pinTx.querySelector("span[right]").innerHTML = right;
      if (editor.lesson.pin != null) {
        frame.querySelector(".eSharePinOptions").style.display = "flex";
        createHolder.style.opacity = 0;
        createHolder.style.pointerEvents = "none";
      } else {
        frame.querySelector(".eSharePinOptions").style.display = "none";
        createHolder.style.opacity = 1;
        createHolder.style.pointerEvents = "all";
      }
    }
    editor.updatePin();
    createButton.addEventListener("click", async () => {
      createButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/share/pin/generate", null, { session: editor.session });
      if (code == 200) {
        editor.lesson.pin = body.pin;
        editor.updatePin();
      }
      createButton.removeAttribute("disabled");
    });
    let removeButton = frame.querySelector(".eSharePinRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/pin/remove", null, { session: editor.session });
      if (code == 200) {
        editor.lesson.pin = null;
        editor.updatePin();
      }
      removeButton.removeAttribute("disabled");
    });
    frame.querySelector(".eSharePinCopy").addEventListener("click", async () => {
      copyClipboardText(editor.lesson.pin, "pin");
    });
  }
}