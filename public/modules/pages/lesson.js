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
    "./modules/dropdowns/lesson/editor/tools/emojis.js",
    "./modules/dropdowns/lesson/file/export.js"
  ];
  preJs = () => {

  }
  html = `<div class="lPageHolder">
    <div class="lPage" active></div>
  </div>`;
  css = {
    ".lPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100%; height: 100vh; padding: 8px; left: 0px; top: 0px; justify-content: center`,
    ".lPageHolder[maximize]": `padding: 0px !important`,
    ".lPage": `--shadowOpacity: .3; display: flex; width: 100%; height: 100%; box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), var(--shadowOpacity)); border-radius: 12px; overflow: hidden; transition: .2s`,
    ".lPage[active]": `--shadowOpacity: .5 !important`,
    ".lPageHolder[maximize] .lPage": `border-radius: 0px !important`
  };

  pages = {};
  addPage = async (id, type, holder) => {
    id = id ?? type;
    this.pages[type] = this.pages[type] ?? {};
    let typePages = this.pages[type];
    if (typePages[id] != null) {
      this.removePage(id, type);
    }
    let newPage = await this.setFrame("lesson/board", holder);
    if (newPage == null) {
      return;
    }
    newPage.pageID = id;
    newPage.type = type;
    newPage.holder = holder;
    typePages[id] = newPage;
    this.pushToPipelines(null, "page_add", { type: type, page: newPage });
    return newPage;
  }
  removePage = (id, type) => {
    let typePages = this.pages[type];
    if (typePages[id] == null) {
      return;
    }
    let page = typePages[id];
    if (page == null) {
      return;
    }
    let editor = page.editor;
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
        align: "center"
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

    let pageHolder = page.querySelector(".lPageHolder");

    /*if (this.id == "" && joinData.pin == null) {
      return; // Open the create new lesson page
    }*/

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
            if (body.active == false) {
              this.idleCount++;
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
              if (member.active == false) {
                this.idleCount--;
              }
              delete this.members[body._id];
              this.memberCount--;
            }
            break;
          case "update":
            if (this.members[body._id] != null) {
              let member = this.members[body._id];
              let memberKeys = Object.keys(body);
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
              if (body.active == false && member.active != false) {
                this.idleCount++;
              } else if (body.active != false && member.active == false) {
                this.idleCount--;
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

    let sizeUpdate = () => {
      if (fixed.offsetWidth > 800 && fixed.offsetHeight > 400) {
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
    
    tempListen(app, "mouseup", (event) => {
      this.pushToPipelines(null, "mouseup", { event: event });
      this.pushToPipelines(null, "click_end", { type: "mouseup", event: event });
    }, { passive: false });
    tempListen(app, "touchend", (event) => {
      this.pushToPipelines(null, "touchend", { event: event });
      this.pushToPipelines(null, "click_end", { type: "touchend", event: event });
    }, { passive: false });

    this.active = document.visibilityState == "visible";
    tempListen(document, "visibilitychange", () => {
      this.active = document.visibilityState == "visible";
      
      if (this.sendPing != null) {
        this.sendPing();
      }

      this.pushToPipelines(null, "visibilitychange", { active: this.active });
    });
    tempListen(window, "focus", () => {
      let oldExportAction = page.querySelector(".eFileActionExport");
      if (oldExportAction != null) {
        oldExportAction.remove();
      }
    });

    joinData = joinData ?? {};
    let sendBody = { ss: socket.secureID };
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

    this.lesson = body.lesson;
    this.lesson.settings = this.lesson.settings ?? {};

    this.folder = body.folder;

    this.sessionID = body.session._id;
    this.sessionToken = body.session.token;
    this.session = this.sessionID + ";" + this.sessionToken;
    window.previousLessonSession = this.session;
    
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
      if (memSet.active == false && member.active != false) {
        this.idleCount++;
      } else if (memSet.active != false && member.active == false) {
        this.idleCount--;
      }
      objectUpdate(memSet, member);
    }
    if (this.members[this.sessionID] == null) {
      this.members[this.sessionID] = {};
    }
    this.self = this.members[this.sessionID];
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

    let sentPing = false;
    let sendPing = async () => {
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
    this.sendPing = sendPing;

    if (extra.took < 2500) {
      this.signalStrength = 3;
    } else {
      this.signalStrength = 2;
      sendPing();
    }

    if (this.active != sendBody.active) {
      sendPing();
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
      if (this.active == false) {
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
              sendPing();
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
              sendPing();
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
        sendPing();
      }
      sentPing = false;
      if (connected == true) {
        sendSocketPing();
      }
    }, 60000) }); // PING every minute

    window.closeCallback = () => {
      this.pushToPipelines(null, "signal_strength", { oldSignalStrength: this.signalStrength, signalStrength: 1 });
      this.signalStrength = 1;
    }

    this.addPage("board", "board", page.querySelector(".lPage"));
  }
}

modules["dropdowns/lesson/file"] = class {
  html = `
  <button class="eFileAction" option="dashboard" title="Return to the Dashboard" style="--themeColor: var(--secondary)"><img src="./images/tooltips/back.svg">Dashboard</button>
  <div class="eFileLine"></div>
  <button class="eFileAction" option="export" dropdowntitle="Export" title="Export the lesson as a PDF."><img src="./images/editor/file/export.svg">Export</button>
  <button class="eFileAction" option="print" dropdowntitle="Print" title="Export the lesson and print."><img src="./images/editor/file/print.svg">Print</button>
  <button class="eFileAction" option="copy" title="Create a copy of the lesson."><img src="./images/editor/file/copy.svg">Create Copy</button>
  <button class="eFileAction" option="moveto" title="Move this lesson into a folder." dropdowntitle="Move To Folder"><img src="./images/dashboard/moveto.svg">Move To Folder</button>
  <div class="eFileLine" option="findjump"></div>
  <button class="eFileAction" disabled option="find" title="Find text on the PDF." style="--themeColor: var(--secondary)"><img src="./images/editor/file/search.svg">Find</button>
  <button class="eFileAction" option="jumptop" title="Jump to the first page." style="--themeColor: var(--secondary)"><img src="./images/editor/bottom/uparrow.svg">Jump to Top</button>
  <button class="eFileAction" option="jump" title="Jump to page number." style="--themeColor: var(--secondary)"><img src="./images/editor/file/jump.svg">Jump to Page</button>
  <button class="eFileAction" option="jumpend" title="Jump to the last page." style="--themeColor: var(--secondary)"><img src="./images/editor/bottom/downarrow.svg">Jump to End</button>
  <div class="eFileLine" option="document"></div>
  <button class="eFileAction" disabled option="properties" title="View lesson properties." style="--themeColor: var(--secondary)"><img src="./images/editor/file/info.svg">Properties</button>
  <button class="eFileAction" disabled option="ocr" title="Run optical character recognition (OCR)."><img src="./images/editor/file/text.svg">Recognize Text</button>
  <div class="eFileLine" option="delete"></div>
  <button class="eFileAction" option="deletelesson" title="Remove this lesson from your dashboard." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Lesson</button>
  <button class="eFileAction" option="deleteannotations" title="Remove all annotations from the lesson." style="--themeColor: var(--error)"><img src="./images/editor/file/delete.svg">Delete Annotations</button>
  <div class="eFileLine" option="hideshow"></div>
  <button class="eFileAction" option="hideshowpage" title="Hide this page for all members."><img src="./images/editor/rearrange/hideshow.svg">Hide All Pages</button>
  `;
  css = {
    ".eFileAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eFileAction:not(:last-child)": `margin-bottom: 4px`,
    ".eFileAction img": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: #fff; border-radius: 4px`,
    ".eFileAction:hover": `background: var(--themeColor); color: #fff`,
    ".eFileLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`
  };
  js = async function (frame, extra) {
    let parent = extra.parent;
    let editor = parent.editor;
    let access = editor.self.access;

    frame.querySelector('.eFileAction[option="dashboard"]').addEventListener("click", async () => {
      //utils.syncSave(true);
      setFrame("pages/dashboard");
    });
    let exportButton = frame.querySelector('.eFileAction[option="export"]');
    exportButton.addEventListener("click", () => {
      dropdownModule.open(exportButton, "dropdowns/lesson/file/export", { type: "download", editor: editor });
    });
    let printButton = frame.querySelector('.eFileAction[option="print"]');
    printButton.addEventListener("click", () => {
      dropdownModule.open(printButton, "dropdowns/lesson/file/export", { type: "print", editor: editor });
    });
    let copyButton = frame.querySelector('.eFileAction[option="copy"]');
    copyButton.addEventListener("click", async () => {
      if (userID == null) {
        promptLogin();
        return;
      }
      copyButton.setAttribute("disabled", "");
      let copyAlert = await alertModule.open("info", "<b>Creating Copy</b><div>Creating a copy of this lesson.", { time: "never" });
      let [code, body] = await sendRequest("POST", "lessons/copy", null, { session: editor.session });
      copyButton.removeAttribute("disabled");
      alertModule.close(copyAlert);
      if (code == 200) {
        dropdownModule.close();
        modifyParams("lesson", body.lesson);
        setFrame("pages/lesson");
      }
    });
    if (editor.settings.allowExport == false && access < 4) {
      exportButton.setAttribute("disabled", "");
      printButton.setAttribute("disabled", "");
      copyButton.setAttribute("disabled", "");
    }

    let fileButton = frame.querySelector('.eFileAction[option="moveto"]');
    fileButton.addEventListener("click", () => {
      dropdownModule.open(fileButton, "dropdowns/moveto", { lessonID: parent.parent.id, folderID: parent.parent.folder });
    });

    let find = frame.querySelector('.eFileAction[option="find"]');
    let jumptop = frame.querySelector('.eFileAction[option="jumptop"]');
    jumptop.addEventListener("click", () => {
      editor.contentHolder.scrollTo({ top: 0 });
    });
    let jump = frame.querySelector('.eFileAction[option="jump"]');
    jump.addEventListener("click", () => {
      editor.page.querySelector(".eCurrentPage").focus();
      dropdownModule.close();
    });
    let jumpend = frame.querySelector('.eFileAction[option="jumpend"]');
    jumpend.addEventListener("click", () => {
      editor.contentHolder.scrollTo({ top: editor.contentHolder.scrollHeight });
    });

    let deleteLessonButton = frame.querySelector('.eFileAction[option="deletelesson"]');
    deleteLessonButton.addEventListener("click", () => {
      dropdownModule.open(deleteLessonButton, "dropdowns/remove", { type: "deletelesson", lessonID: parent.parent.id, isOwner: editor.self.access == 5, session: editor.session });
    });
    let deleteAnnotationsButton = frame.querySelector('.eFileAction[option="deleteannotations"]');
    deleteAnnotationsButton.addEventListener("click", () => {
      dropdownModule.open(deleteAnnotationsButton, "dropdowns/remove", { type: "deleteannotations", lessonID: parent.parent.id, session: editor.session });
    });

    let hideshowpage = frame.querySelector('.eFileAction[option="hideshowpage"]');
    hideshowpage.addEventListener("click", async () => {
      hideshowpage.setAttribute("disabled", "");
      //let [code] = await sendRequest("PUT", "lessons/rearrange/hide", null, { session: editor.session });
      hideshowpage.removeAttribute("disabled");
      //if (code == 200) {
      //  dropdownModule.close();
      //}
    });

    if (access < 5) {
      deleteAnnotationsButton.remove();
      hideshowpage.remove();
      let hideshowLine = frame.querySelector('.eFileLine[option="hideshow"]');
      if (hideshowLine != null) {
        hideshowLine.remove();
      }
      if (userID == null) {
        deleteLessonButton.remove();
        frame.querySelector('.eFileLine[option="delete"]').remove();
      } else {
        deleteLessonButton.innerHTML = `<img src="./images/editor/file/delete.svg">Remove Lesson`;
      }
    }

    if (editor.annotationPages.length < 1) {
      jump.remove();
    }

    find.remove();
    frame.querySelector('.eFileLine[option="document"]').remove();
    frame.querySelector('.eFileAction[option="properties"]').remove();
    frame.querySelector('.eFileAction[option="ocr"]').remove();
  }
}

modules["dropdowns/lesson/zoom"] = class {
  html = `
  <div class="eZoomHolder">
    <button class="eZoomButton buttonAnim border" sub change="-20">-</button>
    <div class="eZoomLevel border"><div class="eZoomBox" contenteditable>100</div>%</div>
    <button class="eZoomButton buttonAnim border" add change="20">+</button>
  </div>
  <div class="eZoomLine"></div>
  <button class="eZoomAction" option="snapping" local title="Snap elements to guides while moving and resizing."><div label>Snapping</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursors" title="Display the cursors of other editors."><div label>Show Cursors</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="cursornames" local title="Show the member's name when they're annotating."><div label>Cursor Names</div><div class="eZoomToggle"><div></div></div></button>
  <button class="eZoomAction" option="stylusmode" local title="Only write on the document when using an active stylus, such as the Apple Pencil."><div label>Stylus Mode</div><div class="eZoomToggle"><div></div></div></button>
  <!--<button class="eZoomAction" option="comments" title="Show comments on the document."><div label>Comments</div><div class="eZoomToggle"><div></div></div></button>-->
  <!--<div class="eZoomLine"></div>-->
  <!--<button class="eZoomAction" option="fullscreen" title="Fullscreen allows increased accessibility."><div label>Fullscreen</div><div class="eZoomToggle"><div></div></div></button>-->
  `;
  css = {
    ".eZoomHolder": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".eZoomButton": `position: relative; display: flex; width: 22px; height: 22px; margin: 20px 3px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 8px; color: var(--theme); font-size: 24px; font-weight: 600; line-height: 0`,
    '.eZoomButton[sub]': `cursor: zoom-out`,
    '.eZoomButton[add]': `cursor: zoom-in`,
    ".eZoomLevel": `display: flex; padding: 3px 6px 3px 3px; margin: 0 12px; --borderWidth: 3px; --borderColor: var(--secondary); justify-content: center; align-items: center; --borderRadius: 15px; color: var(--theme); font-size: 20px; font-weight: 600`,
    ".eZoomLevel div": `max-width: 50px; min-width: 25px; padding: 3px 6px; margin-right: 3px; border: none; outline: none; border-radius: 16px; text-align: center; white-space: nowrap; overflow: hidden`,

    ".eZoomLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,

    ".eZoomAction": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eZoomAction:not(:last-child)": `margin-bottom: 4px`,
    ".eZoomAction div[label]": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eZoomAction[on]": `--themeColor: var(--theme)`,
    ".eZoomAction[off]": `--themeColor: var(--error)`,
    ".eZoomToggle": `position: relative; width: 36px; height: 20px; padding: 2px; margin-left: 12px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eZoomToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eZoomAction[on] .eZoomToggle div": `right: 2px`,
    ".eZoomAction[off] .eZoomToggle div": `right: calc(100% - 22px)`,
    ".eZoomAction:hover": `background: var(--themeColor); color: #fff`,
    ".eZoomAction:hover .eZoomToggle": `background: #fff`,
    ".eZoomAction:hover .eZoomToggle div": `background: var(--themeColor)`,

    "body:fullscreen": `overflow: auto !important`
  };
  js = async function (frame, extra) {
    let editor = extra.parent.editor;

    let zoomPercentage = frame.querySelector(".eZoomLevel div");
    let zoomAdd = frame.querySelector(".eZoomButton[add]");
    let zoomSub = frame.querySelector(".eZoomButton[sub]");
    let setZoomText = () => {
      zoomPercentage.textContent = Math.round(editor.zoom * 100);
      if (editor.zoom >= 5) {
        zoomAdd.setAttribute("disabled", "");
      } else {
        zoomAdd.removeAttribute("disabled");
      }
      if (editor.zoom <= .2) {
        zoomSub.setAttribute("disabled", "");
      } else {
        zoomSub.removeAttribute("disabled");
      }
      frame.closest(".dropdown").querySelector(".dropdownTitle").textContent = zoomPercentage.textContent + "%";
    }
    editor.pipeline.subscribe("zoomDropdownUpdate", "zoom_change", setZoomText);
    setZoomText();
    let setButtonOptions = frame.querySelectorAll(".eZoomAction");
    for (let i = 0; i < setButtonOptions.length; i++) {
      let buttonToggle = setButtonOptions[i];
      if (editor.options[buttonToggle.getAttribute("option")] == true) {
        buttonToggle.setAttribute("on", "");
      } else {
        buttonToggle.setAttribute("off", "");
      }
    }
    let forceSetZoom = () => {
      editor.setZoom(parseInt(zoomPercentage.textContent) / 100, null, { clientX: editor.contentHolder.offsetWidth / 2, clientY: editor.contentHolder.offsetHeight / 2 });
    }
    zoomPercentage.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      if (event.keyCode == 13) {
        event.preventDefault();
        zoomPercentage.blur();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textInt > 500) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than 500%");
        }
      }
    });
    let alreadyRunningFocus = false;
    zoomPercentage.addEventListener("focus", () => {
      if (alreadyRunningFocus == true) {
        return;
      }
      alreadyRunningFocus = true;
      zoomPercentage.blur();
      zoomPercentage.innerHTML = "";
      zoomPercentage.focus();
      alreadyRunningFocus = false;
    });
    zoomPercentage.addEventListener("focusout", (event) => {
      if (alreadyRunningFocus == true) {
        return;
      }
      let textBox = event.target.closest("div");
      if (textBox == null) {
        return;
      }
      let textInt = parseInt(textBox.textContent);
      if (isNaN(textInt) == true) {
        setZoomText();
      } else if (textInt > 500) {
        textBox.textContent = "500";
      } else if (textInt < 20) {
        textBox.textContent = "20";
      }
      forceSetZoom();
    });
    let cursorZoomAction = frame.querySelector('.eZoomAction[option="cursors"]');
    let namesZoomAction = frame.querySelector('.eZoomAction[option="cursornames"]');
    if (editor.parent.parent.signalStrength < 3) {
      cursorZoomAction.style.opacity = 0.5;
      cursorZoomAction.title = "Cursors disabled due to weak connection.";
      namesZoomAction.style.opacity = 0.5;
    }
    if (cursorZoomAction.hasAttribute("off")) {
      namesZoomAction.setAttribute("disabled", "");
    }
    frame.addEventListener("click", (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let zoomChange = element.closest(".eZoomButton");
      if (zoomChange) {
        (Math.floor(((editor.zoom + parseFloat(zoomChange.getAttribute("change"))) * 100) / 5) * 5) / 100
        editor.setZoom(
          (
            Math.round(
              (
                Math.round(editor.zoom * 100) + parseInt(zoomChange.getAttribute("change"))
              ) / 20
          ) * 20
        ) / 100, null, { clientX: editor.contentHolder.offsetWidth / 2, clientY: editor.contentHolder.offsetHeight / 2 });
        return;
      }
      let toggle = element.closest(".eZoomAction");
      if (toggle != null) {
        let option = toggle.getAttribute("option");
        if (toggle.hasAttribute("on")) {
          toggle.setAttribute("off", "");
          toggle.removeAttribute("on");
          editor.options[option] = false;
        } else {
          toggle.setAttribute("on", "");
          toggle.removeAttribute("off");
          editor.options[option] = true;
        }
        if (toggle.hasAttribute("local") == true) {
          this.localOptions = this.localOptions ?? {};
          this.localOptions[option] = editor.options[option];
          setLocalStore("options", JSON.stringify(this.localOptions));
        }
        if (option == "cursors") {
          if (editor.realtime.module != null) {
            editor.realtime.module.setShortSub(editor.visibleChunks);
          }
          if (toggle.hasAttribute("off") == true) {
            if (editor.realtime.module != null) {
              editor.realtime.module.members = {};
            }
            editor.frame.querySelector(".eRealtime").innerHTML = "";
          }
          if (toggle.hasAttribute("on") == true) {
            namesZoomAction.removeAttribute("disabled");
          } else {
            namesZoomAction.setAttribute("disabled", "");
          }
        }
        if (option == "fullscreen") {
          if (toggle.hasAttribute("on") == true) {
            if (body.requestFullscreen != null) {
              body.requestFullscreen();
            }
          } else {
            if (document.exitFullscreen != null) {
              document.exitFullscreen();
            }
          }
        }
      }
    });
  }
}