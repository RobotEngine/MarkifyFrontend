modules["pages/lesson"] = class {
  title = "Lesson";
  preload = [
    "./modules/pages/dashboard.js",

    "./modules/lesson/board.js",

    "./modules/editor/editor.js",
    "./modules/editor/realtime.js",
    "./modules/editor/toolbar.js",

    "./libraries/pdfjs/pdf.mjs",
    "./libraries/pdfjs/pdf.worker.mjs",

    "./modules/dropdowns/lesson/share.js",
    "./modules/dropdowns/account.js",
    "./modules/dropdowns/moveto.js",
    "./modules/dropdowns/remove.js",
    "./modules/dropdowns/editor/tools/emojis.js",
    "./modules/dropdowns/lesson/file/export.js"
  ];
  html = `<div class="lPageHolder">
    <div class="lPage" active></div>
  </div>`;
  css = {
    ".lPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100vw; width: 100dvw; height: 100vh; height: 100dvh; padding: 8px; left: 0px; top: 0px; justify-content: center`,
    ".lPageHolder[maximize]": `padding: 0px !important`,
    ".lPage": `--shadowOpacity: .3; position: relative; display: flex; width: 100%; height: 100%; box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), var(--shadowOpacity)); border-radius: 12px; overflow: hidden; transition: .2s`,
    ".lPage[active]": `--shadowOpacity: .5 !important`,
    ".lPageHolder[maximize] .lPage": `border-radius: 0px !important`,
    ".lCustomScroll::-webkit-scrollbar": `background: var(--scrollGray)`,
    ".lCustomScroll::-webkit-scrollbar-corner": `background: var(--scrollGray)`,
    ".lCustomScroll::-webkit-scrollbar-thumb": `min-width: 50px; min-height: 50px; border: 4px solid var(--scrollGray); background: var(--gray); border-radius: 8px`,
    ".lCustomScroll::-webkit-scrollbar-thumb:active": `background: var(--activeGray)`
  };

  pages = {};
  addPage = async (id, type, holder) => {
    id = id ?? type;
    this.pages[type] = this.pages[type] ?? {};
    let typePages = this.pages[type];
    if (typePages[id] != null) {
      this.removePage(id, type);
    }
    let construct = {
      pageID: id,
      pageType: type,
      pageHolder: holder
    };
    if (this.resyncPages != null && this.resyncPages[id] != null) {
      construct.resync = this.resyncPages[id];
    }
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
      loadScript("./modules/lesson/export.js");
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
              if (data.filled != true) {
                modifyParams("lesson");
                modifyParams("page");
                modifyParams("pin");
              }
              setFrame("pages/join");
            } else {
              setFrame("pages/dashboard");
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
              let collaborator = this.collaborators[body.modify];
              if (collaborator != null) {
                collaborator.name = body.name;
                collaborator.color = body.color;
                collaborator.email = body.email;
                if (body.hasOwnProperty("image") == true) {
                  collaborator.image = body.image;
                }
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
                  if (body.name != null) {
                    collaborator.name = body.name;
                  }
                  if (body.email != null) {
                    collaborator.email = body.email;
                  }
                  if (body.hasOwnProperty("image") == true) {
                    collaborator.image = body.image;
                  }
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
                  setFrame("pages/join");
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

    let sizeUpdate = () => {
      if (fixed.offsetWidth > 800 && fixed.offsetHeight > 400 && this.exporting != true) {
        pageHolder.removeAttribute("maximize");
        fixed.style.setProperty("--floatMargin", "12px");
      } else {
        pageHolder.setAttribute("maximize", "");
        fixed.style.removeProperty("--floatMargin");
      }
    }
    tempListen(window, "resize", (event) => {
      sizeUpdate();

      this.pushToPipelines(null, "resize", { event: event });
      this.pushToPipelines(null, "bounds_change", { type: "resize", event: event });
    });
    sizeUpdate();
    
    tempListen(window, "pointermove", (event) => {
      this.pushToPipelines(null, "pointermove", { event: event });
      if (event.pointerType == "mouse") {
        this.pushToPipelines(null, "click_move", { type: "pointermove", event: event });
      }
    }, { passive: false });
    /*tempListen(window, "mousemove", (event) => {
      this.pushToPipelines(null, "mousemove", { event: event });
      this.pushToPipelines(null, "click_move", { type: "mousemove", event: event });
    }, { passive: false });*/
    tempListen(window, "touchmove", (event) => {
      this.pushToPipelines(null, "touchmove", { event: event });
      this.pushToPipelines(null, "click_move", { type: "touchmove", event: event });
    }, { passive: false });

    tempListen(window, "pointerup", (event) => {
      this.pushToPipelines(null, "pointerup", { event: event });
      if (event.pointerType == "mouse") {
        this.pushToPipelines(null, "click_end", { type: "pointerup", event: event });
      }
    }, { passive: false });
    /*tempListen(window, "mouseup", (event) => {
      this.pushToPipelines(null, "mouseup", { event: event });
      this.pushToPipelines(null, "click_end", { type: "mouseup", event: event });
    }, { passive: false });*/
    tempListen(window, "touchend", (event) => {
      this.pushToPipelines(null, "touchend", { event: event });
      this.pushToPipelines(null, "click_end", { type: "touchend", event: event });
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

    this.setLesson = (body) => {
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
        let member = this.members[memSet._id];
        if (memSet.access == 1 && member.access < 1) {
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
              setFrame("pages/join"); // Send back to join page
            } else {
              setFrame("pages/lesson"); // Refresh to rejoin
            }
          } else if (code != 200 && code != 0 && code != null) {
            setFrame("pages/lesson");
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
        return this.addPage("export", "export", page.querySelector(".lPage"));
      }

      this.addPage("board", "board", page.querySelector(".lPage"));
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
        setFrame("pages/join");
      }
      if (code != 200) {
        return;
      }
      this.setLesson(body);
      if (extra.took < 2500) {
        this.signalStrength = 3;
      } else {
        this.signalStrength = 2;
        this.sendPing();
      }
  
      if (this.active != sendBody.active) {
        this.sendPing();
      }
    } else {
      if (userID == null) {
        checkForAuth(true);
        return;
      }
      this.setLesson({
        "lesson": {
            "_id": null,
            "owner": userID,
            "created": getEpoch(),
            "members": 0,
            "name": "Untitled Lesson",
            "access": 0
        },
        "session": {},
        "members": [],
        "sources": []
      });
      this.signalStrength = 3;
    }
  }
}