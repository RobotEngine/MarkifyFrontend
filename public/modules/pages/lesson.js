modules["pages/lesson"] = class {
  title = "Lesson";
  preJs = () => {

  }
  html = `<div class="lPageHolder">
    <div class="lPage"></div>
  </div>`;
  css = {
    ".lPageHolder": `position: fixed; display: flex; box-sizing: border-box; width: 100%; height: 100vh; padding: 8px; left: 0px; top: 0px; justify-content: center`,
    ".lPage": `display: flex; width: 100%; height: 100%; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`
  };
  // LESSON PAGE : Loads lessons, members, and configs before creating editor modules:
  js = async (page, joinData) => {
    this.id = getParam("lesson") ?? "";

    if (this.id == "" && joinData.pin == null) {
      return; // Open the create new lesson page
    }

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

    this.sessionID = body.session._id;
    this.sessionToken = body.session.token;
    this.session = this.sessionID + ";" + this.sessionToken;

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

    addTempListener({
      type: "interval", interval: setInterval(async () => {
        if (sentPing == false) {
          sendPing();
        }
        sentPing = false;
      }, 60000)
    }); // PING every minute

    this.setFrame("pages/lesson/board", page.querySelector(".lPage"));
  }
}

modules["pages/lesson/board"] = class {
  html = ``;
  css = {
    
  };
  js = async (frame, extra) => {
    this.editor = await this.setFrame("pages/lesson/editor", frame);
  }
}

modules["pages/lesson/editor"] = class {
  html = ``;
  css = {

  };

  // PIPELINE : Distributes events across various modules and services:
  pipeline = {};
  pipelineSubs = {};
  pipePublish = (event, data) => {
    let subscribes = this.pipeline[event] ?? {};
    let subKeys = Object.keys(subscribes);
    for (let i = 0; i < subKeys.length; i++) {
      subscribes[subKeys[i]](data);
    }
  }
  pipeSubscribe = (id, event, callback) => {
    if (this.pipelineSubs[id] != null) {
      this.pipeUnsubscribe(id);
    }

    this.pipeline[event] = this.pipeline[event] ?? {};
    this.pipeline[event][id] = callback;

    this.pipelineSubs[id] = event;
  }
  pipeUnsubscribe = (id) => {
    delete this.pipeline[this.pipelineSubs[id]][id];
    delete this.pipelineSubs[id];
  }

  js = async (frame, extra) => {

  }
}