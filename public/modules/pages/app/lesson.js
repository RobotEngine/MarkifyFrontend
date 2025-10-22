modules["pages/app/lesson"] = class {
  title = "Lesson";
  preload = [
    "../modules/pages/app/dashboard.js",

    "../modules/lesson/board.js",
    "../modules/lesson/breakout.js",

    "../modules/editor/editor.js",
    "../modules/editor/realtime.js",
    "../modules/editor/timeline.js",
    "../modules/editor/toolbar.js",

    "../libraries/pdfjs/pdf.mjs",
    "../libraries/pdfjs/pdf.worker.mjs",
    "../libraries/quilljs/quill.core.js",
    "../libraries/mathquill/mathquill.min.js",

    "../modules/dropdowns/lesson/share.js",
    "../modules/dropdowns/account.js",
    "../modules/dropdowns/moveto.js",
    "../modules/dropdowns/remove.js",
    "../modules/dropdowns/editor/tools/emojis.js",
    "../modules/dropdowns/lesson/file/export.js"
  ];
  html = `<div class="lPageHolder"></div>`;
  css = {
    ".lPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100vw; width: 100dvw; height: 100vh; height: 100dvh; padding: 8px; left: 0px; top: 0px; contain: strict; justify-content: center; touch-action: none`,
    ".lPageHolder[resize]": `user-select: none; cursor: col-select`,
    ".lPageHolder[maximize]": `padding: 0px !important`,
    ".lPage": `--shadowOpacity: .3; position: relative; display: flex; width: 100%; height: 100%; flex: 1; z-index: 1; box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), var(--shadowOpacity)); border-radius: 12px; overflow: hidden; transition: all .2s, flex .4s`, //min-width: min(var(--minPageSize), 100%);
    ".lPage[active]": `--shadowOpacity: .5 !important`,
    ".lPage[remove]": `flex: 0 !important; opacity: 0 !important; min-width: 0px !important`,
    ".lPageHolder[resize] .lPage": `min-width: unset; transition: unset`,
    ".lPageHolder[resize] .lPage *": `pointer-events: none !important`,
    ".lPageHolder[maximize] .lPage": `opacity: 0 !important; transition: none !important; pointer-events: all`,
    ".lPageHolder[maximize] .lPage[active]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3 !important; border-radius: 0px !important; opacity: 1 !important`,

    ".lPageDivider": `display: flex; flex-shrink: 0; width: 8px; max-width: 8px; height: 100%; z-index: 2; justify-content: center; align-items: center; cursor: col-resize; transition: .2s`,
    ".lPageDivider div": `width: 2px; height: calc(min(50px, 100%) - 8px); background: var(--gray); border-radius: 2px; transition: .2s`,
    ".lPageDivider[remove]": `width: 0px; opacity: 0`,
    ".lPageDivider:hover div": `height: calc(100% - 8px)`,
    ".lPageDivider:active div": `width: 4px; height: calc(100% - 8px); background: var(--activeGray)`
  };

  pages = {};
  minPageSize = 200;
  updateFavicon = () => {
    clearTimeout(this.updateFaviconTimeout);
    this.updateFaviconTimeout = setTimeout(() => {
      let pages = Object.keys(this.pages);
      let setFavicon = favicon.href;
      if (pages.includes("board") == true && pages.includes("breakout") == true) {
        setFavicon = "../images/boardbreakoutbluricon.png";
      } else if (pages.includes("board") == true) {
        setFavicon = "../images/bluricon.png";
      } else if (pages.includes("breakout") == true) {
        setFavicon = "../images/breakoutbluricon.png";
      }
      if (setFavicon != favicon.href) {
        favicon.href = setFavicon;
      }
    }, 10);
  }
  addPage = async (id, type, extra = {}) => {
    id = id ?? type;
    let holder = extra.holder;
    if ((this.pages[type] ?? {})[id] != null) {
      this.removePage(id, type, { skipExitCheck: true });
    }
    this.pages[type] = this.pages[type] ?? {};
    let typePages = this.pages[type];
    let pageHolder = this.frame.querySelector(".lPageHolder");
    if (holder == null) {
      pageHolder.insertAdjacentHTML("beforeend", `<div class="lPage" new></div>`);
      holder = pageHolder.querySelector(".lPage[new]");
      holder.removeAttribute("new");
      let newDivider;
      if (pageHolder.childElementCount > 1) {
        pageHolder.insertAdjacentHTML("beforeend", `<div class="lPageDivider" draggable="false" new><div></div></div>`);
        newDivider = pageHolder.querySelector(".lPageDivider[new]");
        newDivider.removeAttribute("new");
        pageHolder.insertBefore(newDivider, holder);
      }
      if (extra.insertBefore != null) {
        pageHolder.insertBefore(holder, extra.insertBefore);
        pageHolder.insertBefore(newDivider, extra.insertBefore);
      }
      if (extra.insertAfter != null && extra.insertAfter.nextElementSibling != null) {
        pageHolder.insertBefore(holder, extra.insertAfter.nextElementSibling);
        pageHolder.insertBefore(newDivider, holder);
      }
    }
    if (this.activePageID == null) {
      this.activePageID = id;
    }
    if (extra.totalPages != null) {
      holder.style.flex = "1 1 " + ((((pageHolder.offsetWidth - ((extra.totalPages - 1) * 8)) / extra.totalPages) / pageHolder.offsetWidth) * 100) + "%";
    }
    if (extra.percent != null) {
      let adjustPercent = extra.percent * 100;
      holder.offsetHeight;
      holder.style.flex = "1 1 " + adjustPercent + "%";
      let otherPages = pageHolder.querySelectorAll(".lPage");
      for (let i = 0; i < otherPages.length; i++) {
        let page = otherPages[i];
        if (page == holder) {
          continue;
        }
        let style = window.getComputedStyle(page).getPropertyValue("flex");
        let percent = parseFloat(style.substring(4, style.lastIndexOf("%")));
        page.style.flex = "1 1 " + (percent * ((100 - adjustPercent) / 100)) + "%";
      }
    }
    let construct = {
      pageID: id,
      pageType: type,
      pageHolder: holder
    };
    if (this.resyncPages != null && this.resyncPages[id] != null) {
      construct.resync = this.resyncPages[id];
    }
    holder.setAttribute("pageid", id);
    holder.setAttribute("pagetype", type);
    holder.setAttribute("dropdownholder", "");
    let newPage = await this.setFrame("lesson/" + type, holder, { construct: construct });
    if (newPage == null) {
      return;
    }
    typePages[id] = newPage;
    this.pushToPipelines(null, "page_add", { type: type, page: newPage });
    (async () => {
      for (let i = 0; i < 10; i++) {
        this.pushToPipelines(null, "resize", { event: "page_add" });
        this.pushToPipelines(null, "bounds_change", { event: "page_add" });
        await sleep(40);
      }
    })();
    this.updateFavicon();
    return newPage;
  }
  removePage = (id, type, extra = {}) => {
    let typePages = this.pages[type] ?? {};
    if (typePages[id] == null) {
      return;
    }
    if (this.activePageID == id) {
      this.activePageID = null;
    }
    let page = typePages[id];
    if (page == null) {
      return;
    }
    let adjustPercent = 100;
    if (page.pageHolder != null) {
      let style = window.getComputedStyle(page.pageHolder).getPropertyValue("flex");
      adjustPercent = parseFloat(style.substring(4, style.lastIndexOf("%")));
      page.pageHolder.setAttribute("remove", "");
      let newActivePage = this.frame.querySelector(".lPage:not([remove])");
      if (newActivePage == null && extra.skipExitCheck != true) {
        return setFrame("pages/app/dashboard");
      }
      if (page.pageHolder.hasAttribute("active") == true) {
        if (newActivePage != null) {
          newActivePage.setAttribute("active", "");
        }
        page.pageHolder.removeAttribute("active");
      }
    }
    (async () => {
      let removeDividers = [];
      let children = this.frame.querySelector(".lPageHolder").children;
      let typeBefore;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.hasAttribute("remove") == true) {
          continue;
        }
        if (child.className == "lPageDivider") {
          if (typeBefore != "lPage") {
            child.setAttribute("remove", "");
            removeDividers.push(child);
            continue;
          }
          let nextChild = children[i + 1];
          if (nextChild == null || nextChild.className != "lPage" || nextChild.hasAttribute("remove") == true) {
            child.setAttribute("remove", "");
            removeDividers.push(child);
            continue;
          }
        } else if (child.className == "lPage") {
          let style = window.getComputedStyle(child).getPropertyValue("flex");
          let percent = parseFloat(style.substring(4, style.lastIndexOf("%")));
          child.style.flex = "1 1 " + (percent * (100 / (100 - adjustPercent))) + "%";
        }
        typeBefore = child.className;
      }
      if (extra.animate == true) {
        await sleep(400);
      }
      for (let i = 0; i < removeDividers.length; i++) {
        let divider = removeDividers[i];
        if (divider != null) {
          divider.remove();
        }
      }
      if (page.pageHolder != null) {
        page.pageHolder.remove();
      }
    })();
    (async () => {
      for (let i = 0; i < 10; i++) {
        this.pushToPipelines(null, "resize", { event: "page_add" });
        this.pushToPipelines(null, "bounds_change", { event: "page_add" });
        await sleep(40);
      }
    })();
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
    delete (this.pages[type] ?? {})[id];
    if (Object.keys(this.pages[type] ?? {}).length < 1) {
      delete this.pages[type];
    }
    this.pushToPipelines(null, "page_remove", { type: type });
    this.updateFavicon();
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
        if (page.pipeline != null) {
          page.pipeline.publish(event, data);
        }
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
        font: "montserrat",
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
        font: "montserrat",
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

  maximized = false;
  
  // LESSON PAGE : Loads lessons, members, and configs before creating editor modules:
  js = async (page, joinData) => {
    this.id = getParam("lesson") ?? "";

    // Preload QuillJS CSS:
    let quillCSSHREF = "../libraries/quilljs/quill.core.css";
    if (head.querySelector('link[href="' + quillCSSHREF + '"]') == null) {
      window.quillCSSLoad = document.createElement("link");
      window.quillCSSLoad.type = "text/css";
      window.quillCSSLoad.rel = "stylesheet";
      head.appendChild(window.quillCSSLoad);
      window.quillCSSLoad.addEventListener("load", () => {
        window.quillCSSLoad = true;
      });
      window.quillCSSLoad.href = quillCSSHREF;
    }

    // Preload MathQuill CSS:
    let mathquillCSSHREF = "../libraries/mathquill/mathquill.css";
    if (head.querySelector('link[href="' + mathquillCSSHREF + '"]') == null) {
      window.mathquillCSSLoad = document.createElement("link");
      window.mathquillCSSLoad.type = "text/css";
      window.mathquillCSSLoad.rel = "stylesheet";
      head.appendChild(window.mathquillCSSLoad);
      window.mathquillCSSLoad.addEventListener("load", () => {
        window.mathquillCSSLoad = true;
      });
      window.mathquillCSSLoad.href = mathquillCSSHREF;
    }

    this.exporting = getParam("export_browser") == "true";
    if (this.exporting == true) {
      addCSS({ ".loading": `display: none` });
      loadScript("../modules/lesson/export.js");
    }

    let pageHolder = page.querySelector(".lPageHolder");

    let isNewLesson = this.id == "" && joinData.pin == null;

    let setSubscribes = () => {
      if (this.exporting == true) {
        return;
      }

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
          case "delete":
            if (userID == null || data.filled == true) {
              setFrame("pages/app/join", null, { passParams: data.filled == true });
            } else {
              setFrame("pages/app/dashboard");
            }
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
                  let change = false;
                  if (body.hasOwnProperty("name") == true) {
                    collaborator.name = body.name;
                    change = true;
                  }
                  if (body.hasOwnProperty("color") == true) {
                    collaborator.color = body.color;
                    change = true;
                  }
                  if (body.hasOwnProperty("email") == true) {
                    collaborator.email = body.email;
                    change = true;
                  }
                  if (body.hasOwnProperty("image") == true) {
                    collaborator.image = body.image;
                    change = true;
                  }
                  if (change == true) {
                    this.pushToPipelines(null, "collaborator_update", collaborator);
                    this.pushToPipelines(null, "collaborator_update_" + member.modify, collaborator);
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

          this.pushToPipelines(data.page, data.task, body);
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
    let beforePageWidth = this.minPageSize;
    let removeBeforePage = false;
    let afterPage;
    let afterPageWidth = this.minPageSize;
    let removeAfterPage = false;
    pageHolder.style.setProperty("--minPageSize", this.minPageSize + "px");
    let startDivider = (event) => {
      divider = event.target.closest(".lPageDivider");
      if (divider != null) {
        removeBeforePage = false;
        removeAfterPage = false;

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
      if (mouseDown() == false) {
        return endDivider();
      }
      event.preventDefault();
      pageHolder.setAttribute("resize", "");

      let mouseX = event.x ?? event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0;
      dividerStartX = dividerStartX ?? mouseX;
      let changeX = mouseX - dividerStartX;

      if (beforePageWidth + changeX < this.minPageSize) {
        let correct = this.minPageSize - (beforePageWidth + changeX);
        changeX += correct;
        //let setScale = (this.minPageSize - correct) / this.minPageSize;
        //beforePage.setAttribute("scale", setScale);
        beforePage.style.transform = "translateX(" + (-1 * correct) + "px)"; //"scale(" + setScale + ")";
        //beforePage.style.transformOrigin = "left";
        beforePage.style.minWidth = "var(--minPageSize)";
        let setOpacity = ((this.minPageSize / 2) - correct) / (this.minPageSize / 2);
        if (setOpacity > 0) {
          removeBeforePage = false;
          beforePage.style.opacity = ((this.minPageSize / 2) - correct) / (this.minPageSize / 2);
        } else {
          removeBeforePage = true;
          beforePage.style.opacity = 0;
        }
      } else {
        removeBeforePage = false;
        beforePage.removeAttribute("scale");
        beforePage.style.removeProperty("transform");
        beforePage.style.removeProperty("min-width");
        beforePage.style.removeProperty("opacity");
      }
      if (afterPageWidth - changeX < this.minPageSize) {
        let correct = this.minPageSize - (afterPageWidth - changeX);
        changeX -= correct;
        removeAfterPage = true;
        //let setScale = (this.minPageSize - correct) / this.minPageSize;
        //afterPage.setAttribute("scale", setScale);
        afterPage.style.transform = "translateX(" + correct + "px)"; //"scale(" + setScale + ")";
        //afterPage.style.transformOrigin = "right";
        afterPage.style.minWidth = "var(--minPageSize)";
        let setOpacity = ((this.minPageSize / 2) - correct) / (this.minPageSize / 2);
        if (setOpacity > 0) {
          removeAfterPage = false;
          afterPage.style.opacity = ((this.minPageSize / 2) - correct) / (this.minPageSize / 2);
        } else {
          removeAfterPage = true;
          afterPage.style.opacity = 0;
        }
      } else {
        removeAfterPage = false;
        afterPage.removeAttribute("scale");
        afterPage.style.removeProperty("transform");
        afterPage.style.removeProperty("min-width");
        afterPage.style.removeProperty("opacity");
      }

      let setBeforeWidth = beforePageWidth + changeX;
      let setAfterWidth = afterPageWidth - changeX;
      if (Math.abs(setBeforeWidth - setAfterWidth) < 20) {
        let setWidth = (beforePageWidth + afterPageWidth) / 2;
        setBeforeWidth = setWidth;
        setAfterWidth = setWidth;
      }
      if (setBeforeWidth < 0) {
        setAfterWidth += setBeforeWidth;
        setBeforeWidth = 0;
      }
      if (setAfterWidth < 0) {
        setBeforeWidth += setAfterWidth;
        setAfterWidth = 0;
      }
      let holderWidth = pageHolder.offsetWidth - (pageHolder.querySelectorAll(":scope > .lPageDivider").length * 8) - 16;
      beforePage.style.flex = "1 1 " + ((setBeforeWidth / holderWidth) * 100) + "%";
      afterPage.style.flex = "1 1 " + ((setAfterWidth / holderWidth) * 100) + "%";

      this.pushToPipelines(null, "resize", { event: event });
      this.pushToPipelines(null, "bounds_change", { type: "resize", event: event });
    }
    let endDivider = async () => {
      if (divider == null) {
        return;
      }
      divider = null;
      dividerStartX = null;
      
      pageHolder.removeAttribute("resize");

      let holderWidth = pageHolder.offsetWidth - (pageHolder.querySelectorAll(":scope > .lPageDivider").length * 8) - 16;
      if (beforePage != null) {
        beforePage.removeAttribute("scale");
        beforePage.style.removeProperty("transform");
        beforePage.style.removeProperty("opacity");
        if (removeBeforePage == true) {
          //beforePage.style.minWidth = "0px";
          //beforePage.style.maxWidth = "0px";
          //beforePage.style.flex = "0";
          //beforePage.style.opacity = 0;
          if (afterPage != null) {
            afterPage.style.flex = "1 1 " + (((afterPageWidth + beforePageWidth) / holderWidth) * 100) + "%";
          }
          this.removePage(beforePage.getAttribute("pageid"), beforePage.getAttribute("pagetype"), { animate: true });
        } else if (removeAfterPage != true) {
          beforePage.style.flex = "1 1 " + ((Math.max(beforePage.offsetWidth, this.minPageSize) / holderWidth) * 100) + "%";
        }
      }
      if (afterPage != null) {
        afterPage.removeAttribute("scale");
        afterPage.style.removeProperty("transform");
        afterPage.style.removeProperty("opacity");
        if (removeAfterPage == true) {
          //afterPage.style.minWidth = "0px";
          //afterPage.style.maxWidth = "0px";
          //afterPage.style.flex = "0";
          //afterPage.style.opacity = 0;
          if (beforePage != null) {
            beforePage.style.flex = "1 1 " + (((beforePageWidth + afterPageWidth) / holderWidth) * 100) + "%";
          }
          this.removePage(afterPage.getAttribute("pageid"), afterPage.getAttribute("pagetype"), { animate: true });
        } else if (removeBeforePage != true) {
          afterPage.style.flex = "1 1 " + ((Math.max(afterPage.offsetWidth, this.minPageSize) / holderWidth) * 100) + "%";
        }
      }
      (async () => {
        await sleep(500);
        this.pushToPipelines(null, "resize", { event: "page_remove" });
        this.pushToPipelines(null, "bounds_change", { event: "page_remove" });
      })();
    }

    let isEmbed = getParam("embed") != null;
    let sizeUpdate = () => {
      if ((fixed.offsetWidth > 800 && fixed.offsetHeight > 400 && this.exporting != true) || isEmbed == true) {
        if (this.maximized == true) {
          this.maximized = false;
          pageHolder.removeAttribute("maximize");
          this.pushToPipelines(null, "maximize", { maximize: false });
        }
      } else {
        if (this.maximized == false) {
          this.maximized = true;
          pageHolder.setAttribute("maximize", "");
          this.pushToPipelines(null, "maximize", { maximize: true });
        }
      }
    }
    tempListen(window, "resize", (event) => {
      sizeUpdate();

      this.pushToPipelines(null, "resize", { event: event });
      this.pushToPipelines(null, "bounds_change", { type: "resize", event: event });
    });
    sizeUpdate();
    
    tempListen(window, "pointerdown", (event) => {
      startDivider(event);
      /*if (event.pointerType == "mouse") {
        startDivider(event);
      }*/
    }, { passive: false });
    tempListen(window, "touchstart", (event) => {
      //startDivider(event);
    }, { passive: false });

    tempListen(window, "pointermove", (event) => {
      this.pushToPipelines(null, "pointermove", { event: event });
      this.pushToPipelines(null, "click_move", { type: "pointermove", event: event });
      updateDivider(event);
      /*if (event.pointerType == "mouse") {
        this.pushToPipelines(null, "click_move", { type: "pointermove", event: event });
        updateDivider(event);
      }*/
    }, { passive: false });
    /*tempListen(window, "mousemove", (event) => {
      this.pushToPipelines(null, "mousemove", { event: event });
      this.pushToPipelines(null, "click_move", { type: "mousemove", event: event });
    }, { passive: false });*/
    tempListen(window, "touchmove", (event) => {
      this.pushToPipelines(null, "touchmove", { event: event });
      //this.pushToPipelines(null, "click_move", { type: "touchmove", event: event });
      //updateDivider(event);
    }, { passive: false });

    tempListen(window, "pointerup", (event) => {
      this.pushToPipelines(null, "pointerup", { event: event });
      this.pushToPipelines(null, "click_end", { type: "pointerup", event: event });
      endDivider();
      /*if (event.pointerType == "mouse") {
        this.pushToPipelines(null, "click_end", { type: "pointerup", event: event });
        endDivider();
      }*/
    }, { passive: false });
    /*tempListen(window, "mouseup", (event) => {
      this.pushToPipelines(null, "mouseup", { event: event });
      this.pushToPipelines(null, "click_end", { type: "mouseup", event: event });
    }, { passive: false });*/
    tempListen(window, "touchend", (event) => {
      this.pushToPipelines(null, "touchend", { event: event });
      //this.pushToPipelines(null, "click_end", { type: "touchend", event: event });
      //endDivider();
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
        } /*else if (member.active == false) {
          this.idleCount--;
        }*/
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
          let [code] = await sendRequest("GET", path, null, { session: this.session, allowError: [403, 419] });
          if (code == 403) {
            if (sendBody.pin != null) {
              setFrame("pages/app/join", null, { passParams: true }); // Send back to join page
            } else {
              setFrame("pages/app/lesson", null, { passParams: true }); // Refresh to rejoin
            }
          } else if (code != 200 && code != 0 && code != null) {
            setFrame("pages/app/lesson", null, { construct: { session: this.session }, passParams: true });
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
        await this.addPage(tool, tool, { totalPages: this.lesson.tool.length });
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
      if (joinData.pin == null && joinData.name == null && this.session == null && window.previousLessonSession != null) {
        this.session = window.previousLessonSession;
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
      }
      await this.setLesson(body);
      
      if (this.active != sendBody.active || this.signalStrength == 2) {
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
      this.signalStrength = 3;
      await this.setLesson({
        "lesson": {
          "_id": null,
          "tool": [getParam("type")],
          "owner": userID,
          "created": getEpoch(),
          "members": 0,
          "name": "Untitled Lesson",
          "background": useBackground
        },
        "session": {},
        "members": [],
        "sources": []
      });
    }
  }
}