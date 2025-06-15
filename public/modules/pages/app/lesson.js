modules["pages/app/lesson"] = class {
  title = "Lesson";
  preload = [
    "../modules/pages/app/dashboard.js",

    "../modules/lesson/board.js",

    "../modules/editor/editor.js",
    "../modules/editor/realtime.js",
    "../modules/editor/toolbar.js",

    "../libraries/pdfjs/pdf.mjs",
    "../libraries/pdfjs/pdf.worker.mjs",

    "../modules/dropdowns/lesson/share.js",
    "../modules/dropdowns/account.js",
    "../modules/dropdowns/moveto.js",
    "../modules/dropdowns/remove.js",
    "../modules/dropdowns/editor/tools/emojis.js",
    "../modules/dropdowns/lesson/file/export.js"
  ];
  html = `<div class="lPageHolder"></div>`;
  css = {
    ".lPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100vw; width: 100dvw; height: 100vh; height: 100dvh; padding: 8px; left: 0px; top: 0px; justify-content: center`,
    ".lPageHolder[maximize]": `padding: 0px !important`,
    ".lPage": `--shadowOpacity: .3; position: relative; display: flex; width: 100%; height: 100%; box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), var(--shadowOpacity)); border-radius: 12px; overflow: hidden; transition: all .2s, flex: 0s`,
    ".lPage[active]": `--shadowOpacity: .5 !important`,
    ".lPageHolder[maximize] .lPage": `border-radius: 0px !important`,

    ".lPageDivider": `display: flex; flex-shrink: 0; width: 8px; height: 100%; justify-content: center; align-items: center; cursor: col-resize`,
    ".lPageDivider div": `width: 2px; height: calc(min(50px, 100%) - 8px); background: var(--gray); border-radius: 2px; transition: .2s`,
    ".lPageDivider:hover div": `height: calc(100% - 8px)`,
    ".lPageDivider:active div": `width: 4px; height: calc(100% - 8px); background: var(--activeGray)`
  };

  pages = {};
  minWindowSize = 150;
  addPage = async (id, type, extra) => {
    id = id ?? type;
    let holder = extra.holder;
    this.pages[type] = this.pages[type] ?? {};
    let typePages = this.pages[type];
    if (typePages[id] != null) {
      this.removePage(id, type);
    }
    if (holder == null) {
      let pageHolder = this.frame.querySelector(".lPageHolder");
      if (pageHolder.childElementCount > 0) {
        pageHolder.insertAdjacentHTML("beforeend", `<div class="lPageDivider" draggable="false"><div></div></div>`);
      }
      pageHolder.insertAdjacentHTML("beforeend", `<div class="lPage" new></div>`);
      holder = pageHolder.querySelector(".lPage[new]");
      holder.removeAttribute("new");
    }
    if (extra.size != null) {
      holder.style.flex = "1 1 " + (extra.size * 100) + "%";
    }
    if (this.activePageID == null) {
      this.activePageID = id;
    }
    let construct = {
      pageID: id,
      pageType: type,
      pageHolder: holder
    };
    if (this.resyncPages != null && this.resyncPages[id] != null) {
      construct.resync = this.resyncPages[id];
    }
    holder.setAttribute("dropdownholder", "");
    let newPage = await this.setFrame("lesson/" + type, holder, { construct: construct });
    if (newPage == null) {
      return;
    }
    typePages[id] = newPage;
    this.pushToPipelines(null, "page_add", { type: type, page: newPage });
    return newPage;
  }
  removePage = (id, type) => {
    let typePages = this.pages[type] ?? {};
    if (typePages[id] == null) {
      return;
    }
    let page = typePages[id];
    if (page == null) {
      return;
    }
    if (page.pageHolder != null) {
      page.pageHolder.remove();
      let dividers = this.frame.querySelector(".lPageHolder").querySelectorAll(":scope > .lPageDivider");
      for (let i = 0; i < dividers.length; i++) {
        let divider = dividers[i];
        if (divider.previousElementSibling == null || divider.nextElementSibling == null) {
          divider.remove();
        }
      }
    }
    let editor = page.editor;
    if (editor != null) {
      let editorSubscribes = editor.realtime.subscribes;
      let removeIDs = [];
      for (let i = 0; i < editorSubscribes.length; i++) {
        let sub = editorSubscribes[i];
        removeIDs.push(sub.id);
        sub.close();
      }
      for (let i = 0; i < subscribes.length; i++) {
        let sub = subscribes[i];
        if (removeIDs.includes(sub.id) == true) {
          subscribes.splice(i, 1);
          i--;
        }
      }
    }
    delete typePages[id];
    this.pushToPipelines(null, "page_remove", { type: type });
  }
  pushToPipelines = (type, event, data) => {
    let pageTypeKeys = Object.keys(this.pages);
    for (let i = 0; i < pageTypeKeys.length; i++) {
      let pageType = pageTypeKeys[i];
      if (pageType != type && type != null) {
        continue;
      }
      let typePages = this.pages[pageType] ?? {};
      let pageKeys = Object.keys(typePages);
      for (let i = 0; i < pageKeys.length; i++) {
        let page = typePages[pageKeys[i]];
        page.editor.pipeline.publish(event, data);
      }
    }
  }

  lesson = {};
  members = {};
  collaborators = {};
  editorCount = 0;
  handCount = 0;
  idleCount = 0;

  self = {};

  sources = {};

  preferences = {
    tools: {
      selection: {
        subtool: "select"
      },
      markup: {
        subtool: "highlighter",
        color: {
          selected: "FFC24A",
          options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
        },
        thickness: 16,
        opacity: 50
      },
      text: {
        color: {
          selected: "0084FF",
          options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
        },
        opacity: 100,
        size: 18,
        align: "center"
      },
      draw: {
        subtool: "pen",
        color: {
          selected: "DF84FF",
          options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
        },
        thickness: 4,
        opacity: 100
      },
      shape: {
        subtool: "square",
        color: {
          selected: "FF4C6C",
          options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
        },
        thickness: 8,
        opacity: 100,
        filled: false
      },
      sticky: {
        color: {
          selected: "FADCA0",
          options: ["88B4FA", "F49CA9", "FADCA0", "E4B8FB", "A1D8AF", "F285B8", "666666"]
        },
        size: 16,
        align: "left"
      },
      page: {
        color: {
          selected: "2F2F2F",
          options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "2F2F2F"]
        },
        size: [824, 1064]
      },
      media: {},
      options: {
        colorpicker: {
          scale: 0
        }
      }
    }
  };
  defaultEmojis = [
    "THUMBS UP SIGN",
    "THUMBS DOWN SIGN",
    "PARTY POPPER",
    "ELECTRIC LIGHT BULB",
    "WHITE HEAVY CHECK MARK",
    "NO ENTRY",
    "PUBLIC ADDRESS LOUDSPEAKER",
    "KEYCAP 1",
    "KEYCAP 2",
    "KEYCAP 3",
    "KEYCAP 4",
    "KEYCAP 5",
    "BLACK QUESTION MARK ORNAMENT",
    "HUNDRED POINTS SYMBOL"
  ];
  recentEmojis = [];

  signalStrength = 1;
  
  // LESSON PAGE : Loads lessons, members, and configs before creating editor modules:
  js = async (page, joinData) => {
    this.id = getParam("lesson") ?? "";

    this.exporting = getParam("export_browser") == "true";
    if (this.exporting == true) {
      addCSS({ ".loading": `display: none` });
      loadScript("../modules/lesson/export.js");
    }

    let pageHolder = page.querySelector(".lPageHolder");

    let isNewLesson = this.id == "" && joinData.pin == null;

    let setSubscribes = () => {
      socket.remotes["member"] = (data) => {
        if (data.lesson != null && data.lesson != this.id) {
          return;
        }
        switch (data.task) {
          case "kick":
            if (userID == null || data.filled == true) {
              setFrame("pages/app/join", null, { passParams: data.filled == true });
            } else {
              setFrame("pages/app/dashboard");
            }
            alertModule.open("error", "<b>You've Been Kicked</b>The lesson owner has removed you from the lesson.");
            break;
          case "preference":
            switch (data.type) {
              case "emoji":
                this.recentEmojis = data.data ?? [];
                for (let i = 0; (i < this.defaultEmojis.length && this.recentEmojis.length < 21); i++) {
                  if (this.recentEmojis.includes(this.defaultEmojis[i]) == false) {
                    this.recentEmojis.push(this.defaultEmojis[i]);
                  }
                }
                break;
              default:
                objectUpdate(data.data, this.preferences);
            }
        }
      }
      socket.remotes["lesson_" + this.id] = async (data) => {
        let events = [];
        if (Array.isArray(data.data) == false) {
          events.push(data.data);
        } else {
          events = data.data;
        }

        let page = data.page ?? "board";

        for (let i = 0; i < events.length; i++) {
          let body = events[i];
          switch (data.task) {
            case "join":
              if (this.members[body._id] == null) {
                this.members[body._id] = {};
                this.memberCount++;
              }
              objectUpdate(body, this.members[body._id] ?? {});
              let collaborator = this.collaborators[body.modify] ?? {};
              collaborator.name = body.name;
              collaborator.color = body.color;
              if (body.hasOwnProperty("email") == true) {
                collaborator.email = body.email;
              }
              if (body.hasOwnProperty("image") == true) {
                collaborator.image = body.image;
              }
              if (collaborator._id == null) {
                this.collaborators[body.modify] = { _id: body.modify, ...collaborator };
              } else {
                this.pushToPipelines(null, "collaborator_update", collaborator);
                this.pushToPipelines(null, "collaborator_update_" + body.modify, collaborator);
              }
              if (body.access == 1) {
                this.editorCount++;
              }
              if (body.hand != null) {
                this.handCount++;
              }
              if (body._id != this.sessionID) {
                if (body.active == false) {
                  this.idleCount++;
                }
              }
              break;
            case "leave":
              if (this.members[body._id] != null) {
                let member = this.members[body._id];
                if (member.access == 1) {
                  this.editorCount--;
                }
                if (member.hand != null) {
                  this.handCount--;
                }
                if (body._id != this.sessionID) {
                  if (member.active == false) {
                    this.idleCount--;
                  }
                }
                body.member = member;
                delete this.members[body._id];
                this.memberCount--;
              }
              break;
            case "update":
              if (this.members[body._id] != null) {
                let member = this.members[body._id];
                if (body.access == 1 && member.access < 1) {
                  this.editorCount++;
                } else if (body.access == 0 && member.access > 0) {
                  this.editorCount--;
                }
                if (body.hand != null && member.hand == null) {
                  this.handCount++;
                } else if (body.hasOwnProperty("hand") == true && member.hand != null) {
                  this.handCount--;
                }
                if (body._id != this.sessionID) {
                  if (body.active == false && member.active != false) {
                    this.idleCount++;
                  } else if (body.active != false && member.active == false) {
                    this.idleCount--;
                  }
                }
                objectUpdate(body, member);
                if (member.access > 0 && member.hand != null) {
                  member.hand = null;
                  this.handCount--;
                }
                let collaborator = this.collaborators[member.modify];
                if (collaborator != null) {
                  if (body.hasOwnProperty("name") == true) {
                    collaborator.name = body.name;
                  }
                  if (body.hasOwnProperty("color") == true) {
                    collaborator.color = body.color;
                  }
                  if (body.hasOwnProperty("email") == true) {
                    collaborator.email = body.email;
                  }
                  if (body.hasOwnProperty("image") == true) {
                    collaborator.image = body.image;
                  }
                  this.pushToPipelines(null, "collaborator_update", collaborator);
                  this.pushToPipelines(null, "collaborator_update_" + member.modify, collaborator);
                }
              } else {
                return;
              }
              break;
            case "set":
              objectUpdate(body, this.lesson);
              if (body.hasOwnProperty("name") == true) {
                document.title = (this.lesson.name ?? "Untitled Lesson") + " | Markify";
              }
              if (body.settings != null) {
                if (body.settings.forceLogin == false && this.self.access < 2) {
                  setFrame("pages/app/join", null, { passParams: true });
                }
              }
              break;
            case "addsources":
              this.sources = { ...this.sources, ...getObject(body.sources ?? [], "_id") };
              break;
            case "folderset":
              this.folder = body.folder;
          }

          this.pushToPipelines(page, data.task, body);
        }
      }
      socket.remotes["long_" + this.id] = async (data) => {
        if (this.exporting == true) {
          return;
        }
        this.pushToPipelines(data.page ?? "board", "long", data.annotations ?? data);
      }
    }

    let divider;
    let dividerStartX;
    let beforePage;
    let beforePageWidth = this.minWindowSize;
    let afterPage;
    let afterPageWidth = this.minWindowSize;
    let startDivider = (event) => {
      divider = event.target.closest(".lPageDivider");
      if (divider != null) {
        beforePage = divider.previousElementSibling;
        if (beforePage != null) {
          beforePageWidth = beforePage.offsetWidth;
        }
        afterPage = divider.nextElementSibling;
        if (afterPage != null) {
          afterPageWidth = afterPage.offsetWidth;
        }
      }
    }
    let updateDivider = (event) => {
      if (divider == null) {
        return endDivider();
      }
      if (beforePage == null || afterPage == null) {
        return endDivider();
      }
      pageHolder.style.userSelect = "none";
      pageHolder.style.cursor = "col-resize";

      let mouseX = event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0;
      dividerStartX = dividerStartX ?? mouseX;
      let changeX = mouseX - dividerStartX;

      if (beforePageWidth + changeX < this.minWindowSize) {
        changeX += this.minWindowSize - (beforePageWidth + changeX);
      }
      if (afterPageWidth - changeX < this.minWindowSize) {
        changeX -= this.minWindowSize - (afterPageWidth - changeX);
      }

      let holderWidth = pageHolder.offsetWidth - (pageHolder.querySelectorAll(":scope > .lPageDivider").length * 8);
      beforePage.style.flex = "1 1 " + (((beforePageWidth + changeX) / holderWidth) * 100) + "%";
      afterPage.style.flex = "1 1 " + (((afterPageWidth - changeX) / holderWidth) * 100) + "%";

      this.pushToPipelines(null, "resize", { event: event });
      this.pushToPipelines(null, "bounds_change", { type: "resize", event: event });
    }
    let endDivider = () => {
      divider = null;
      dividerStartX = null;
      pageHolder.style.removeProperty("user-select");
      pageHolder.style.removeProperty("cursor");
    }

    let sizeUpdate = () => {
      if (fixed.offsetWidth > 800 && fixed.offsetHeight > 400 && this.exporting != true) {
        pageHolder.removeAttribute("maximize");
      } else {
        pageHolder.setAttribute("maximize", "");
      }
    }
    tempListen(window, "resize", (event) => {
      sizeUpdate();

      this.pushToPipelines(null, "resize", { event: event });
      this.pushToPipelines(null, "bounds_change", { type: "resize", event: event });
    });
    sizeUpdate();
    
    tempListen(window, "pointerdown", (event) => {
      if (event.pointerType == "mouse") {
        startDivider(event);
      }
    }, { passive: false });
    tempListen(window, "touchstart", (event) => {
      startDivider(event);
    }, { passive: false });

    tempListen(window, "pointermove", (event) => {
      this.pushToPipelines(null, "pointermove", { event: event });
      if (event.pointerType == "mouse") {
        this.pushToPipelines(null, "click_move", { type: "pointermove", event: event });
        updateDivider(event);
      }
    }, { passive: false });
    /*tempListen(window, "mousemove", (event) => {
      this.pushToPipelines(null, "mousemove", { event: event });
      this.pushToPipelines(null, "click_move", { type: "mousemove", event: event });
    }, { passive: false });*/
    tempListen(window, "touchmove", (event) => {
      this.pushToPipelines(null, "touchmove", { event: event });
      this.pushToPipelines(null, "click_move", { type: "touchmove", event: event });
      updateDivider(event);
    }, { passive: false });

    tempListen(window, "pointerup", (event) => {
      this.pushToPipelines(null, "pointerup", { event: event });
      if (event.pointerType == "mouse") {
        this.pushToPipelines(null, "click_end", { type: "pointerup", event: event });
        endDivider();
      }
    }, { passive: false });
    /*tempListen(window, "mouseup", (event) => {
      this.pushToPipelines(null, "mouseup", { event: event });
      this.pushToPipelines(null, "click_end", { type: "mouseup", event: event });
    }, { passive: false });*/
    tempListen(window, "touchend", (event) => {
      this.pushToPipelines(null, "touchend", { event: event });
      this.pushToPipelines(null, "click_end", { type: "touchend", event: event });
      endDivider();
    }, { passive: false });

    tempListen(window, "keydown", (event) => {
      this.pushToPipelines(null, "keydown", { event: event });
    }, { passive: false });
    tempListen(window, "keyup", (event) => {
      this.pushToPipelines(null, "keyup", { event: event });
    }, { passive: false });

    tempListen(window, "paste", (event) => {
      this.pushToPipelines(null, "paste", { event: event });
    }, { passive: false });
    tempListen(window, "copy", (event) => {
      this.pushToPipelines(null, "copy", { event: event });
    }, { passive: false });

    this.active = document.visibilityState == "visible";
    /*tempListen(document, "visibilitychange", () => {
      this.active = document.visibilityState == "visible";
      
      if (this.sendPing != null) {
        this.sendPing();
      }

      this.pushToPipelines(null, "visibilitychange", { active: this.active });
    });*/
    let visibilityChange = (active) => {
      this.active = active;
      if (this.sendPing != null) {
        this.sendPing();
      }
      this.pushToPipelines(null, "visibilitychange", { active: this.active });
    }
    tempListen(window, "focus", () => {
      visibilityChange(true);

      let oldExportAction = page.querySelector(".eFileActionExport");
      if (oldExportAction != null) {
        oldExportAction.remove();
      }
    });
    tempListen(window, "blur", () => { visibilityChange(false); });
    tempListen(document, "fullscreenchange", () => {
      this.pushToPipelines(null, "fullscreenchange", { fullscreen: document.fullscreenElement != null });
    });
    tempListen(window, "beforeunload", (event) => { this.pushToPipelines(null, "beforeunload", { event: event }); });

    window.updateAccountSettings = (change) => {
      this.pushToPipelines(null, "account_settings", { settings: change ?? account.settings ?? {} });
    }

    window.closeCallback = () => {
      let oldSignalStrength = this.signalStrength;
      this.signalStrength = 1;
      this.pushToPipelines(null, "signal_strength", { oldSignalStrength: oldSignalStrength, signalStrength: 1 });
    }
    if (window.resync != null && window.resync.lesson == this.id) {
      this.resyncPages = window.resync.pageSync;
    }
    window.resync = { lesson: this.id, pageSync: {} };

    let sendBody = { ss: socket.secureID };

    this.setLesson = async (body) => {
      this.lesson = { ...this.lesson, ...body.lesson };
      if (this.id != this.lesson._id) {
        this.id = this.lesson._id;
        modifyParams("lesson", this.id);
        setSubscribes();
      }
      this.lesson.settings = this.lesson.settings ?? {};
  
      this.folder = body.folder;
  
      this.sessionID = body.session._id;
      this.sessionToken = body.session.token;
      if (body.session._id != null && body.session.token != null) {
        this.session = this.sessionID + ";" + this.sessionToken;
        window.previousLessonSession = this.session;
      }

      if (body.guest != null) {
        setLocalStore("guest", JSON.stringify(body.guest));
      }
      
      for (let i = 0; i < body.members.length; i++) {
        let memSet = body.members[i];
        if (this.members[memSet._id] == null) {
          this.members[memSet._id] = {};
        }
        let collaborator = {};
        collaborator.name = memSet.name;
        collaborator.color = memSet.color;
        if (memSet.hasOwnProperty("email") == true) {
          collaborator.email = memSet.email;
        }
        if (memSet.hasOwnProperty("image") == true) {
          collaborator.image = memSet.image;
        }
        this.collaborators[memSet.modify] = { _id: memSet.modify, ...collaborator };
        let member = this.members[memSet._id];
        if (memSet.access == 1 && (member.access == null || member.access < 1)) {
          this.editorCount++;
        } else if (memSet.access == 0 && member.access > 0) {
          this.editorCount--;
        }
        if (memSet.hand != null && member.hand == null) {
          this.handCount++;
        } else if (memSet.hand == null && member.hand != null) {
          this.handCount--;
        }
        if (memSet._id != this.sessionID) {
          if (memSet.active == false && member.active != false) {
            this.idleCount++;
          } else if (memSet.active != false && member.active == false) {
            this.idleCount--;
          }
        } else if (member.active == false) {
          this.idleCount--;
        }
        objectUpdate(memSet, member);
      }
      if (this.members[this.sessionID] == null && this.session != null) {
        this.members[this.sessionID] = {};
      }
      this.self = this.members[this.sessionID] ?? {};
      this.memberCount = Object.keys(this.members).length;
  
      this.sources = { ...this.sources, ...getObject(body.sources ?? [], "_id") };
  
      document.title = (this.lesson.name ?? "Untitled Lesson") + " | Markify";
  
      if (body.preferences != null) {
        if (body.preferences.emojis != null) {
          this.recentEmojis = body.preferences.emojis;
          delete body.preferences.emojis;
        }
        objectUpdate(body.preferences, this.preferences);
      }
      for (let i = 0; (i < this.defaultEmojis.length && this.recentEmojis.length < 21); i++) {
        if (this.recentEmojis.includes(this.defaultEmojis[i]) == false) {
          this.recentEmojis.push(this.defaultEmojis[i]);
        }
      }

      if (this.session != null) {
        let sentPing = false;
        this.sendPing = async () => {
          if (connected == false) {
            return;
          }
          let params = [];
          if (this.active == false && this.exporting != true) {
            params.push("idle");
          }
          if (this.signalStrength == 2) {
            params.push("weak");
          }
          let path = "lessons/ping";
          if (params.length > 0) {
            path += "?" + params.join("&");
          }
          sentPing = true;
          let [code] = await sendRequest("GET", path, null, { session: this.session, allowError: [403] });
          if (code == 403) {
            if (sendBody.pin != null) {
              setFrame("pages/app/join", null, { passParams: true }); // Send back to join page
            } else {
              setFrame("pages/app/lesson", null, { passParams: true }); // Refresh to rejoin
            }
          } else if (code != 200 && code != 0 && code != null) {
            setFrame("pages/app/lesson", null, { passParams: true });
          }
        }
    
        let pingSocketFilter = { c: "short_" + this.id, o: this.sessionID, t: this.sessionToken };
        let awaitingPongs = {};
        let pongTimeoutTime = 500; // ms
        subscribe(pingSocketFilter, (pingID) => {
          if (getEpoch() - pingID < pongTimeoutTime) {
            awaitingPongs[pingID] = "";
          }
        });
        let sendSocketPing = (attempt) => {
          if (connected == false || document.visibilityState != "visible") {
            return;
          }
          attempt = attempt ?? 1;
          let pingID = getEpoch();
          setTimeout(() => {
            let updateSignalStrength;
            if (awaitingPongs[pingID] == "") {
              delete awaitingPongs[pingID];
    
              // STRONG INTERNET
              if (this.signalStrength != 3) {
                if (attempt < 3) {
                  // Try 2 more times to make sure:
                  return sendSocketPing(attempt + 1);
                } else {
                  // Enable everything:
                  updateSignalStrength = { oldSignalStrength: this.signalStrength, signalStrength: 3 };
                  this.signalStrength = 3;
                  this.sendPing();
                  alertModule.open("info", "<b>Connection Restored</b>A strong connection has been established, all features enabled.");
                }
              }
            } else {
              // WEAK INTERNET
              if (this.signalStrength != 2) {
                if (attempt < 3) {
                  // Try 2 more times to make sure:
                  return sendSocketPing(attempt + 1);
                } else {
                  // Disable the stuff:
                  updateSignalStrength = { oldSignalStrength: this.signalStrength, signalStrength: 2 };
                  this.signalStrength = 2;
                  this.sendPing();
                  alertModule.open("info", "<b>Weak Connection</b>While you're still connected, real-time collaboration is disabled to save bandwidth.");
                }
              }
            }
            if (updateSignalStrength != null) {
              this.pushToPipelines(null, "signal_strength", updateSignalStrength);
            }
          }, pongTimeoutTime);
          socket.publish(pingSocketFilter, pingID, { publishToSelf: true });
        }
        
        addTempListener({ type: "interval", interval: setInterval(async () => {
          if (sentPing == false) {
            this.sendPing();
          }
          sentPing = false;
          sendSocketPing();
        }, 60000) }); // PING every minute
      }

      if (this.exporting == true) {
        return await this.addPage("export", "export");
      }

      for (let i = 0 ; i < this.lesson.tool.length; i++) {
        let tool = this.lesson.tool[i];
        await await this.addPage(tool, "board", { size: 1 / this.lesson.tool.length });
      }
    }

    if (isNewLesson == false) {
      setSubscribes();

      joinData = joinData ?? {};
      if (this.active == false) {
        sendBody.active = false;
      }
      if (joinData.pin != null) {
        sendBody.pin = joinData.pin;
      }
      if (joinData.name != null) {
        sendBody.name = joinData.name;
      } else {
        sendBody.name = getParam("name");
      }
      if (joinData.captcha != null) {
        sendBody.captcha = joinData.captcha;
      }
      let guest = getLocalStore("guest");
      if (guest != null) {
        guest = JSON.parse(guest);
        if (guest.expires > Math.floor(getEpoch() / 1000)) {
          sendBody.guest = guest._id + ";" + guest.token;
        } else {
          removeLocalStore("guest");
        }
      }
      let paramSession = getParam("member_session") ?? "";
      if (paramSession != "" && this.exporting == true) {
        this.session = paramSession;
      }
      let [code, body, extra] = await sendRequest("POST", "lessons/join?lesson=" + this.id, sendBody, { session: this.session, allowError: [403, 406] });
      if (code == 403 || code == 406) {
        page.innerHTML = "";
        setFrame("pages/app/join", null, { passParams: true });
      }
      if (code != 200) {
        return;
      }
      if (extra.took < 2500) {
        this.signalStrength = 3;
      } else {
        this.signalStrength = 2;
        this.sendPing();
      }
      await this.setLesson(body);
  
      if (this.active != sendBody.active) {
        this.sendPing();
      }
    } else {
      if (userID == null) {
        checkForAuth(true);
        return;
      }
      let useBackground = "FFFFFF";
      if (getTheme() == "dark") {
        useBackground= "0A1C2D";
      }
      await this.setLesson({
        "lesson": {
          "_id": null,
          "tool": [getParam("type")],
          "owner": userID,
          "created": getEpoch(),
          "members": 0,
          "name": "Untitled Lesson",
          "access": 0,
          "background": useBackground
        },
        "session": {},
        "members": [],
        "sources": []
      });
      this.signalStrength = 3;
    }
  }
}