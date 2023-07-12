modules["editor/realtime"] = {
  icons: {

  },
  css: {
    
  },
  setShortSub: function(pages) {
    let filter = { c: "short_" + this.editor.id, p: pages };
    if (this.shortSub) {
      this.shortSub.edit(filter);
    } else {
      this.shortSub = subscribe(filter, (data) => {
        console.log(data);
      });
    }
  },
  js: async function (editor, page) {
    this.editor = editor;
    editor.realtime.module = this;
    console.log(editor);

    let alert = await getModule("alert");

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
          this.setShortSub(editor.visiblePages);
          break;
        case 2: // Weak Connection
          imgPos = -30;
          status = "Weak Connection | Cloud-saved annotations, limited real-time features.";
          this.setShortSub(null);
          break;
        case 1: // No Connection
          imgPos = 0;
          status = "No Connection | Annotations stored on-device, synced to cloud upon reconnecting.";
      }
      statusIcon.style.objectPosition = imgPos + "px -4px";
      statusIcon.title = status;
      statusIcon.removeAttribute("disabled");
    }
    this.connectUpdate();

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
  }
}