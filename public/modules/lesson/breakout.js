modules["lesson/breakout"] = class {
  html = ``;
  css = {};

  pipeline = { // PIPELINE : Distributes events across various modules and services:
    pipeline: {}, // All active events
    pipelineSubs: {}, // All active subscribes
    publish: async (event, data) => {
      let listeners = this.pipeline.pipeline[event] ?? [];
      for (let i = 0; i < listeners.length; i++) {
        let subscribe = (this.pipeline.pipelineSubs[listeners[i]] ?? {})[event] ?? {};
        if (subscribe.callback != null) {
          await subscribe.callback(data);
        }
      }
      if (this.pipelinePublishPassthrough != null) {
        this.pipelinePublishPassthrough(event, data);
      }
    },
    subscribe: (id, event, callback, extra) => {
      extra = extra ?? {};

      if (extra.unsubscribe != true) {
        this.pipeline.unsubscribe(id, event);
      } else {
        this.pipeline.unsubscribe(id);
      }

      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        this.pipeline.pipelineSubs[id] = {};
        pipelineSubs = this.pipeline.pipelineSubs[id];
      }
      let subData = { callback: callback };
      pipelineSubs[event] = subData;

      let pipelineEvent = this.pipeline.pipeline[event];
      if (pipelineEvent == null) {
        this.pipeline.pipeline[event] = [];
        pipelineEvent = this.pipeline.pipeline[event];
      }
      pipelineEvent.push(id);
      if (extra.sort != null) {
        subData.sort = extra.sort;
        pipelineEvent.sort((a, b) => {
          return (((this.pipeline.pipelineSubs[a] ?? {})[event] ?? {}).sort ?? 0) - (((this.pipeline.pipelineSubs[b] ?? {})[event] ?? {}).sort ?? 0);
        });
      }
    },
    unsubscribe: (id, event) => {
      let pipelineSubs = this.pipeline.pipelineSubs[id];
      if (pipelineSubs == null) {
        return;
      }
      let checkEvents;
      if (event != null) {
        checkEvents = [event];
      } else {
        checkEvents = Object.keys(pipelineSubs);
      }
      for (let i = 0; i < checkEvents.length; i++) {
        let check = checkEvents[i];
        let pipelineEvents = this.pipeline.pipeline[check] ?? [];
        let index = pipelineEvents.indexOf(id);
        if (index > -1) {
          pipelineEvents.splice(index, 1);
        }
        if (pipelineEvents.length < 1) {
          delete this.pipeline.pipeline[check];
        }
        delete this.pipeline.pipelineSubs[id][check];
      }
      if (Object.keys(pipelineSubs).length < 1) {
        delete this.pipeline.pipelineSubs[id];
      }
    }
  };

  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.pageHolder.style.setProperty("--themeRGB", "var(--breakoutThemeRGB)");
    this.pageHolder.style.setProperty("--theme", "var(--breakoutTheme)");
    this.pageHolder.style.setProperty("--secondaryRGB", "var(--breakoutSecondaryRGB)");
    this.pageHolder.style.setProperty("--secondary", "var(--breakoutSecondary)");
    this.pageHolder.style.setProperty("--hoverRGB", "var(--breakoutHoverRGB)");
    this.pageHolder.style.setProperty("--hover", "var(--breakoutHover)");
    this.pageHolder.style.setProperty("--lightShadow", "var(--breakoutLightShadow)");
    this.pageHolder.style.setProperty("--darkShadow", "var(--breakoutDarkShadow)");
    
    let page = frame;

    this.pipeline.subscribe("checkActivePage", "click_start", () => {
      if (this.parent.activePageID != this.pageID) {
        this.parent.activePageID = this.pageID;
        this.parent.pushToPipelines(null, "page_switch", { pageID: this.pageID });
      }
    });
    let updateActivePage = () => {
      this.active = this.parent.activePageID == this.pageID;
      if (this.active == false) {
        this.pageHolder.removeAttribute("active");
      } else {
        this.pageHolder.setAttribute("active", "");
      }
    }
    this.pipeline.subscribe("checkPageSwitch", "page_switch", updateActivePage, { sort: 1 });
    updateActivePage();

    page.addEventListener("pointerdown", (event) => {
      this.pipeline.publish("pointerdown", { event: event });
      if (event.pointerType == "mouse") {
        this.pipeline.publish("click_start", { type: "pointerdown", event: event });
      }
    }, { passive: false });
    page.addEventListener("touchstart", (event) => {
      this.pipeline.publish("touchstart", { event: event });
      this.pipeline.publish("click_start", { type: "touchstart", event: event });
    }, { passive: false });
    page.addEventListener("click", (event) => {
      this.pipeline.publish("click", { event: event });
    }, { passive: false });
    page.addEventListener("mouseleave", (event) => {
      this.pipeline.publish("mouseleave", { event: event });
    });

    // Initialize Breakout:
    if (this.parent.self.access > 3 || this.session == null) { // Open to Overview:
      await this.setFrame("lesson/breakout/overview", page);
    }

    //this.editor = (await this.parent.setFrame("lesson/board", this.pageHolder, { construct: { pageID: this.pageID, pageType: this.pageType, pageHolder: this.pageHolder } })).editor;
  }
}

modules["lesson/breakout/overview"] = class {
  html = `
  <div class="boInterface customScroll">
  
  </div>
  <div class="boGroupHolder customScroll"></div>`;
  css = {
    ".boInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; overflow: scroll; z-index: 2`,
    ".boGroupHolder": `position: relative; width: 100%; height: 100%; overflow-y: scroll; z-index: 1; transition: .5s`,
  };
  js = async (frame) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";
  }
}

modules["lesson/breakout/group"] = class {
  html = ``;
  css = {};
  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";
  }
}