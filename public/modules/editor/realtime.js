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
              alert.open("info", "<b>Weak Connection</b>While you're still connected, real-time collaboration is disabled to save bandwidth.");
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
    let endSyncTimeout;
    this.publishShort = (event) => {
      if (event && event.x) {
        mouseX = event.x;
        mouseY = event.y;
      }
      if (editor.getSelf().access < 1) { // Not an editor!
        return;
      }
      if (editor.memberCount < 2) { // No one to send cursor events too!
        return;
      }
      if (editor.realtime.strenth < 3) { // If weak don't send!
        return;
      }
      /* // Disabled as others should still see your cursor!
      if (editor.options.cursors == false) {
        return;
      }
      */
      clearTimeout(endSyncTimeout);
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
      } else {
        endSyncTimeout = setTimeout(() => {
          this.publishShort(event);
        }, 100); // If after 100 MS, send the last event to ensure proper sync.
      }
    }
    editor.scrollEvent = this.publishShort;

    page.addEventListener("mousemove", this.publishShort);
    page.addEventListener("mousedown", this.publishShort);
    page.addEventListener("mouseup", this.publishShort);

    page.addEventListener("touchmove", this.publishShort);
    page.addEventListener("touchstart", this.publishShort);
    page.addEventListener("touchend", this.publishShort);

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

    this.removeRealtime = (memberID) => {
      let remMemberElem = realtimeHolder.querySelectorAll('[member="' + memberID + '"]');
      for (let i = 0; i < remMemberElem.length; i++) {
        let elem = remMemberElem[i];
        (async function () {
          elem.style.opacity = 0;
          await sleep(300);
          elem.remove();
        })();
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
          member.interval = setInterval(() => {
            this.removeRealtime(memberID);
          }, 120000); // Remove member elements if inactive for 2 minutes
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

modules["dropdowns/editor/members"] = {
  html: `
  <div class="eMemberHolder">
    <div class="eMemberSearchHolder">
      <img src="./images/editor/glass.svg">
      <input placeholder="Search..."></input>
    </div>
    <div class="eMemberMemberHolder">
      <div class="eMemberAccessHolder" type="owner">
        <button class="eMemberAccessTitle"><div>Owner</div><div count>0</div></button>
      </div>
      <div class="eMemberAccessHolder" type="editor">
        <button class="eMemberAccessTitle"><div>Editors</div><div count>0</div></button>
      </div>
      <div class="eMemberAccessHolder" type="viewer">
        <button class="eMemberAccessTitle"><div>Viewers</div><div count>0</div></button>
      </div>
    </div>
  </div>
  `,
  css: {
    ".eMemberHolder": `width: 275px; max-width: 100%`,
    ".eMemberSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center`,
    ".eMemberSearchHolder img": `width: 28px; height: 28px`,
    ".eMemberSearchHolder input": `width: 100%; padding: 4px 8px; margin-left: 6px; border: solid 2px var(--secondary); outline: unset; border-radius: 17px; font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".eMemberSearchHolder input::placeholder": `color: var(--secondary)`,

    ".eMemberAccessHolder": `display: none; margin-bottom: 12px`,
    ".eMemberAccessTitle": `position: sticky; display: flex; width: 100%; padding: 4px 8px; top: 0px; justify-content: space-between; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 1; text-align: left; font-weight: 700; font-size: 18px`,
    ".eMemberAccessTitle div[count]": `margin-left: 6px; font-weight: 500`,
    ".eMemberAccessTitle:hover": `background: var(--hover)`,
    ".eMemberAccessTitle:active": `background: var(--secondary); color: #fff; border-radius: 15px`,

    ".eMemberTile": `--opacity: 0; position: relative; display: flex; width: 100%; padding: 4px; align-items: center; overflow: hidden`, //; margin: 4px 0
    ".eMemberBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); opacity: var(--opacity); transition: .1s; z-index: -1`,
    ".eMemberTile:hover": `--opacity: .35`,
    ".eMemberTile:hover .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberTile:active": `--opacity: 1; color: #fff; border-radius: 18px`,
    ".eMemberTile:active .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberAccessHolder[hover] .eMemberTile": `--opacity: .35`,
    ".eMemberAccessHolder[hover] .eMemberCursor": `background: var(--themeColor); border-color: var(--pageColor); transform: translateX(-3px) scale(1.15)`,
    ".eMemberAccessHolder[active] .eMemberTile": `--opacity: 1; color: #fff; border-radius: 18px; transform: scale(.95)`,
    ".eMemberAccessHolder[active] .eMemberCursor": `transform: scale(1.15)`,
    ".eMemberCursor": `width: 20px; height: 20px;  flex-shrink: 0; margin: 0 6px; background: var(--pageColor); border: solid 3px var(--themeColor); overflow: hidden; border-radius: 8px 14px 14px 14px; transition: 0.2s`, //box-shadow: 0 0 6px rgb(0 0 0 / 50%);
    ".eMemberName": `width: 100%; font-size: 16px; font-weight: 600; text-align: left; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eMemberEvents": `display: flex; margin-left: auto`,
    ".eMemberEvent": `background: var(--yellow); padding: 3px 6px; margin: 0 1px 0 6px; border-radius: 12px; color: #fff; font-size: 14px; font-weight: 700; white-space: nowrap`
  },
  js: async function (frame) {
    let editor = await getModule("pages/editor");

    frame.closest(".dropdownContent").style.padding = "0px";

    let searchField = frame.querySelector(".eMemberSearchHolder input");
    let accessHolders = frame.querySelectorAll(".eMemberAccessHolder");

    let getSection = (access) => {
      let sectionType = "viewer";
      if (access > 4) {
        sectionType = "owner";
      } else if (access > 0) {
        sectionType = "editor";
      }
      return frame.querySelector('.eMemberAccessHolder[type="' + sectionType + '"]');
    }
    let addMemberTile = (member, top) => {
      console.log(member)
      if (member.name.toLowerCase().includes(searchField.value.toLowerCase()) == false) {
        return;
      }
      let section = getSection(member.access);
      let title = section.querySelector(".eMemberAccessTitle");
      section.insertAdjacentHTML("beforeend", `<button class="eMemberTile" new>
        <div class="eMemberBackground"></div>
        <div class="eMemberCursor"></div>
        <div class="eMemberName"></div>
        <div class="eMemberEvents"></div>
      </button>`);
      let tile = section.querySelector(".eMemberTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("member", member._id);
      tile.setAttribute("joined", member.joined);
      tile.style.setProperty("--themeColor", member.color);
      tile.querySelector(".eMemberName").textContent = member.name;
      tile.querySelector(".eMemberName").title = member.name;
      let eventsHolder = tile.querySelector(".eMemberEvents");
      if (member.active == false) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" idle title="This member is currently viewing a different window.">Idle</div>`);
      }
      if (member.observe == true) {
        eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" observe title="This member is observing you on the document.">Observe</div>`);
      }
      if (top == true) {
        section.insertBefore(tile, section.children[1]);
      }
      title.querySelector("div[count]").textContent = section.childElementCount - 1; // -1 for title
      section.style.display = "block";
    }
    let createMemberList = (search) => {
      let keys = Object.keys(editor.members);
      keys = keys.filter((value) => {
        if (editor.members[value].name.toLowerCase().includes((search || "").toLowerCase())) {
          return -1;
        }
        return false;
      });
      keys.sort((a, b) => {
        if (editor.members[a].joined > editor.members[b].joined) {
          return -1;
        }
        return 1;
      });
      for (let i = 0; i < keys.length; i++) {
        addMemberTile(editor.members[keys[i]]);
      }
    }
    createMemberList();

    editor.updateMembersList = (data) => {
      let body = data.data;
      let member = editor.members[body._id];

      switch (data.task) {
        case "join":
          addMemberTile(member, true);
          break;
        case "leave":
          let removeTile = frame.querySelector('.eMemberTile[member="' + body._id + '"');
          if (removeTile != null) {
            let title = removeTile.parentElement.querySelector("div[count]");
            let newCount = removeTile.parentElement.childElementCount - 2; // -2 for title and tile
            title.textContent = newCount;
            if (newCount < 1) {
              removeTile.parentElement.style.display = "none";
            }
            removeTile.remove();
          }
          break;
        case "update":
          let updateTile = frame.querySelector('.eMemberTile[member="' + body._id + '"');
          if (updateTile != null) {
            // Handle User / Color Updates:
            updateTile.style.setProperty("--themeColor", member.color);
            updateTile.querySelector(".eMemberName").textContent = member.name;
            updateTile.querySelector(".eMemberName").title = member.name;

            // Handle access changes:
            let section = getSection(member.access);
            if (section != updateTile.parentElement) {
              let oldSection = updateTile.parentElement;
              section.appendChild(updateTile);
              for (let i = 1; i < section.children.length; i++) { // 1 to skip title
                let child = section.children[i];
                if (parseInt(child.getAttribute("joined")) < member.joined) {
                  section.insertBefore(updateTile, child);
                  break;
                }
              }
              // Update new section:
              section.querySelector("div[count]").textContent = section.childElementCount - 1; // -1 for title
              section.style.display = "block";
              // Update old section:
              let newOldCount = oldSection.childElementCount - 2; // -2 for title and tile
              oldSection.querySelector("div[count]").textContent = newOldCount;
              if (newOldCount < 1) {
                oldSection.style.display = "none";
              }
            }

            // Handle event state:
            let eventsHolder = updateTile.querySelector(".eMemberEvents");
            let existingIdle = eventsHolder.querySelector(".eMemberEvent[idle]");
            if (member.active == false) {
              if (existingIdle == null) {
                eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" idle title="This member is currently viewing a different window.">Idle</div>`);
              }
            } else if (existingIdle != null) {
              existingIdle.remove();
            }
            let existingObserve = eventsHolder.querySelector(".eMemberEvent[observe]");
            if (member.observe == true) {
              if (existingObserve == null) {
                eventsHolder.insertAdjacentHTML("afterbegin", `<div class="eMemberEvent" observe title="This member is observing you on the document.">Observe</div>`);
              }
            } else if (existingObserve != null) {
              existingObserve.remove();
            }
            //if (top == true) {
            //  section.insertBefore(tile, section.children[1]);
            //}
          }
      }
    }

    /*
    let updateHolders = () => {
      for (let i = 0; i < accessHolders.length; i++) {
        let holder = accessHolders[i];
        if (holder.childElementCount < 2) { // Have 1 for title

        }
      }
    }
    */

    for (let i = 0; i < accessHolders.length; i++) {
      let holder = accessHolders[i];
      let title = holder.querySelector(".eMemberAccessTitle");
      title.addEventListener("mouseenter", function() {
        holder.setAttribute("hover", "");
      });
      title.addEventListener("mouseleave", function() {
        holder.removeAttribute("hover");
        holder.removeAttribute("active");
      });
      title.addEventListener("mousedown", function() {
        holder.setAttribute("active", "");
      });
      title.addEventListener("mouseup", function() {
        holder.removeAttribute("active");
      });
    }
    
    searchField.addEventListener("input", () => {
      let clearTiles = frame.querySelectorAll(".eMemberTile");
      for (let i = 0; i < clearTiles.length; i++) {
        if (clearTiles[i].parentElement.childElementCount < 3) { // 3 to account for title and removed tile
          clearTiles[i].parentElement.style.display = "none";
        }
        clearTiles[i].remove();
      }

      createMemberList(searchField.value);
    });
    (async function () {
      await sleep(300);
      searchField.focus();
    })();
  }
}
modules["dropdowns/editor/share"] = {
  html: `
  <button class="eShareOption" dropdown="dropdowns/editor/share/pin" dropdowntitle="<div>Present with <b style='color: var(--theme); font-weight: 800'>Pin</b></div>" title="Invite members through a pin."><img src="./images/editor/share/pin.svg"><div class="eShareInfo"><div class="eShareTitle">Present with <b>Pin</b></div><div class="eShareDesc">Allow members to join as a viewer through a 6-digit pin code.</div></div></button>
  <button class="eShareOption" dropdown="dropdowns/editor/share/link" dropdowntitle="<div>Share with <b style='color: var(--theme); font-weight: 800'>Link</b></div>" title="Invite members through a link."><img src="./images/editor/share/link.svg"><div class="eShareInfo"><div class="eShareTitle">Share with <b>Link</b></div><div class="eShareDesc">Allow members to join as a viewer or editor through a sendable link.</div></div></button>
  <button class="eShareOption" dropdown="dropdowns/editor/share/email" dropdowntitle="<div>Invite with <b style='color: var(--theme); font-weight: 800'>Email</b></div>" title="Invite members through email."><img src="./images/editor/share/email.svg"><div class="eShareInfo"><div class="eShareTitle">Invite with <b>Email</b></div><div class="eShareDesc">Invite members as a viewer or editor with their email.</div></div></button>
  `,
  css: {
    ".eShareOption": `display: flex; flex-wrap: wrap; min-width: 100%; padding: 0; border-radius: 8px; align-items: center; transition: .15s`,
    ".eShareOption:not(:first-child)": `margin-top: 6px`,
    ".eShareOption:hover": `background: var(--theme); color: #fff`,
    ".eShareOption:hover img": `filter: brightness(0) invert(1)`,
    ".eShareOption:hover b": `color: #fff`,
    ".eShareOption:active": `transform: scale(.95); border-radius: 14px`,
    ".eShareOption img": `height: 32px; margin: 6px; transition: .15s`,
    ".eShareOption .eShareInfo": `margin: 6px; text-align: left`,
    ".eShareOption .eShareTitle": `margin-right: 6px; font-size: 18px; font-weight: 600`,
    ".eShareOption b": `color: var(--theme); font-weight: 800; transition: .15s`,
    ".eShareOption .eShareDesc": `max-width: 250px; font-size: 14px`
  },
  js: async function (frame) {
    /*
    let editor = await getModule("pages/editor");
    if (editor.getSelf().access < 2) {
      frame.querySelector(`.eShareOption[dropdown="dropdowns/editor/share/link"]`).remove();
      let shareDesc = frame.querySelectorAll(".eShareDesc");
      for (let i = 0; i < shareDesc.length; i++) {
        shareDesc[i].remove();
      }
    }
    */
  }
}