modules["dropdowns/lesson/share"] = class {
  html = `
  <button class="eShareOption" type="pin" dropdowntitle="<div>Present with <b style='color: var(--theme); font-weight: 800'>Pin</b></div>" title="Invite members through a pin."><img src="./images/editor/share/pin.svg"><div class="eShareInfo"><div class="eShareTitle">Present with <b>Pin</b></div><div class="eShareDesc">Allow members to join as a viewer through a 6-digit pin code.</div></div></button>
  <button class="eShareOption" type="link" dropdowntitle="<div>Share with <b style='color: var(--theme); font-weight: 800'>Link</b></div>" title="Invite members through a link."><img src="./images/editor/share/link.svg"><div class="eShareInfo"><div class="eShareTitle">Share with <b>Link</b></div><div class="eShareDesc">Allow members to join as a viewer or editor through a sendable link.</div></div></button>
  <button class="eShareOption" type="email" dropdowntitle="<div>Invite with <b style='color: var(--theme); font-weight: 800'>Email</b></div>" title="Invite members through email."><img src="./images/editor/share/email.svg"><div class="eShareInfo"><div class="eShareTitle">Invite with <b>Email</b></div><div class="eShareDesc">Invite members as a viewer or editor with their email.</div></div></button>
  `;
  css = {
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
  };
  js = async (frame, extra) => {
    let pinShare = frame.querySelector('.eShareOption[type="pin"]');
    pinShare.addEventListener("click", () => {
      dropdownModule.open(pinShare, "dropdowns/lesson/share/pin", { parent: extra.parent });
    });
    let linkShare = frame.querySelector('.eShareOption[type="link"]');
    linkShare.addEventListener("click", () => {
      dropdownModule.open(linkShare, "dropdowns/lesson/share/link", { parent: extra.parent });
    });
    let emailShare = frame.querySelector('.eShareOption[type="email"]');
    emailShare.addEventListener("click", () => {
      dropdownModule.open(emailShare, "dropdowns/lesson/share/email", { parent: extra.parent });
    });
  }
}

modules["dropdowns/lesson/share/pin"] = class {
  html = `
  <div class="eSharePinCreate">
    <button class="largeButton border">Generate Pin</button>
  </div>
  <div class="eSharePinLink">Join with this <b>pin</b> at <a href="https://markify.link" target="_blank">markify.link</a></div>
  <div class="eSharePinDisplay"><span section left></span><div></div><span section right></span></div>
  <div class="eSharePinOptions">
    <button class="eSharePinCopy largeButton border" title="Copy the pin code."><img src="./images/tooltips/copy.svg"></button>
    <button class="eSharePinRemove largeButton border" title="Invalidate the pin.">Remove</button>
    <button class="eShareOptionPin largeButton border" title="Configurable options for members who join.">Options</button>
  </div>
  `;
  css = {
    ".eSharePinCreate": "position: absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eSharePinCreate button": `background: var(--theme); --borderColor: var(--secondary); --borderRadius: 22px; color: #fff`,
    
    ".eSharePinLink": "margin-top: 8p; transition: .3s",
    ".eSharePinLink a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    
    ".eSharePinHolder": `display: flex`,
    ".eSharePinDisplay": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center; color: var(--theme); font-size: 60px; font-weight: 700; letter-width: 8px; transition: .3s`,
    ".eSharePinDisplay span[section]": `display: block; min-height: 81px; padding: 0 16px; margin: 10px; border: solid 4px var(--hover); border-radius: 20px; letter-spacing: 10px`,
    ".eSharePinDisplay div": `width: 12px; height: 12px; background: var(--hover); border-radius: 12px`,
    
    ".eSharePinOptions": `display: none; flex-wrap: wrap; width: calc(100% - 16px); margin: 0 8px 8px 8px; justify-content: center`,
    ".eSharePinOptions button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,
    ".eSharePinOptions button:active": `transform: scale(.98)`,

    ".eSharePinCopy": `width: 36px; height: 36px; padding: 0; margin: 7px; --borderWidth: 3px`,
    ".eSharePinCopy img": `width: 30px; transition: .1s`,
    ".eSharePinCopy:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eSharePinCopy:hover img": `filter: brightness(0) invert(1)`,

    ".eSharePinRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eSharePinRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,

    ".eShareOptionPin": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionPin:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`
  };
  js = async (frame, extra) => {
    let parent = extra.parent;
    let lesson = parent.parent;
    let editor = parent.editor;

    let createHolder = frame.querySelector(".eSharePinCreate");
    let createButton = createHolder.querySelector("button");
    let pinTx = frame.querySelector(".eSharePinDisplay");
    let optionHolder = frame.querySelector(".eSharePinOptions");
    let titleTx = frame.closest(".dropdown").querySelector(".dropdownTitle div");

    let updatePin = async () => {
      let currentPin = (lesson.lesson.pin ?? "123456").split("");
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
      if (lesson.lesson.pin != null) {
        optionHolder.style.display = "flex";
        createHolder.style.opacity = 0;
        createHolder.style.pointerEvents = "none";
      } else {
        optionHolder.style.display = "none";
        createHolder.style.opacity = 1;
        createHolder.style.pointerEvents = "all";
      }
      if (titleTx.querySelector("b") == null) {
        titleTx.innerHTML = lesson.lesson.pin ?? "";
      }
    }
    editor.pipeline.subscribe("shareLessonSet", "set", (body) => {
      if (body.hasOwnProperty("pin") == true) {
        updatePin();
      }
    });
    updatePin();
    
    createButton.addEventListener("click", async () => {
      createButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/share/pin/generate", null, { session: editor.session });
      if (code == 200) {
        lesson.lesson.pin = body.pin;
        updatePin();
      }
      createButton.removeAttribute("disabled");
    });
    frame.querySelector(".eSharePinCopy").addEventListener("click", async () => {
      copyClipboardText(lesson.lesson.pin, "pin");
    });
    let removeButton = frame.querySelector(".eSharePinRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/pin/remove", null, { session: editor.session });
      if (code == 200) {
        lesson.lesson.pin = null;
        updatePin();
        if (extra.button.className == "eSharePin") {
          dropdownModule.close();
        }
      }
      removeButton.removeAttribute("disabled");
    });

    let optionsButton = frame.querySelector(".eShareOptionPin");
    optionsButton.addEventListener("click", async () => {
      dropdownModule.open(optionsButton, "dropdowns/lesson/share/options", { parent: parent });
    });

    if (editor.self.access < 2) {
      createButton.setAttribute("disabled", "");
      optionHolder.remove();
    }
  }
}

modules["dropdowns/lesson/share/link"] = class {
  html = `
  <div class="eShareLinkCreate">
    <button class="largeButton border">Enable Link</button>
  </div>
  <div class="eShareLinkRow" style="margin-top: 0px">
    <input class="eShareLinkSection" readonly></input>
    <button class="eShareLinkCopy border" title="Copy the link."><img src="./images/tooltips/copy.svg"></button>
  </div>
  <button class="eShareLinkRow eShareLinkPerm buttonAnim">
    <img class="eShareLinkIcon">
    <div class="eShareDetailsHolder">
      <div class="eShareDetailTitle"></div>
      <div class="eShareDetailDesc"></div>
    </div>
  </button>
  <div class="eShareLinkRow">
    <button class="eShareLinkRemove border" title="Invalidate the link.">Private Link</button>
    <button class="eShareOptionLink border" title="Configurable options for members who join.">Options</button>
  </div>
  `;
  css = {
    ".eShareLinkCreate": "position: absolute; display: flex; width: calc(100% - 16px); height: calc(100% - 16px); justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eShareLinkCreate button": `background: var(--theme); --borderColor: var(--secondary); --borderRadius: 22px; color: #fff`,

    ".eShareLinkRow": `display: flex; flex-wrap: wrap; width: 100%; margin-top: 16px; justify-content: center; align-items: center`,
    ".eShareLinkRow button": `display: flex; --borderColor: var(--hover); --borderRadius: 18px; justify-content: center; align-items: center; font-weight: 700`,
    ".eShareLinkRow button:active": `transform: scale(.98)`,

    ".eShareLinkSection": `box-sizing: border-box; width: calc(100% - 50px); height: 42px; margin-right: 8px; border: solid 3px var(--hover); outline: unset; border-radius: 21px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 700; font-family: var(--theme); cursor: copy; user-select: all`,
    ".eShareLinkCopy": `width: 36px; height: 36px; padding: 0; margin: 3px; --borderWidth: 3px`,
    ".eShareLinkCopy img": `width: 30px; transition: .1s`,
    ".eShareLinkCopy:hover": `background: var(--theme); --borderWidth: 0px; transform: scale(1.1)`,
    ".eShareLinkCopy:hover img": `filter: brightness(0) invert(1)`,

    ".eShareLinkPerm": `box-sizing: border-box; max-width: 360px; padding: 6px; align-items: flex-start; border-radius: 24px`,
    ".eShareLinkIcon": `width: 36px; height: 36px`,
    ".eShareDetailsHolder": `flex: 1; margin-left: 8px; text-align: left`,
    ".eShareDetailTitle": `color: var(--theme); font-size: 16px; font-weight: 600`,

    ".eShareLinkRemove": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 14px 7px 7px; --borderWidth: 3px; --borderRadius: 18px; color: var(--error); font-size: 18px`,
    ".eShareLinkRemove:hover": `background: var(--error); --borderWidth: 0px; transform: scale(1.1); color: #fff`,

    ".eShareOptionLink": `height: fit-content; min-height: 36px; padding: 0 12px; margin: 7px 7px 7px auto; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 18px`,
    ".eShareOptionLink:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`
  };
  js = async (frame, extra) => {
    frame.style.padding = "8px";

    let parent = extra.parent;
    let lesson = parent.parent;
    let editor = parent.editor;

    let createHolder = frame.querySelector(".eShareLinkCreate");
    let createButton = createHolder.querySelector("button");
    let linkTx = frame.querySelector(".eShareLinkSection");
    let accessButton = frame.querySelector(".eShareLinkPerm");
    let accessIcon = accessButton.querySelector(".eShareLinkIcon");
    let accessTitle = accessButton.querySelector(".eShareDetailTitle");
    let accessDesc = accessButton.querySelector(".eShareDetailDesc");

    frame.querySelector(".eShareLinkCopy").addEventListener("click", async () => {
      copyClipboardText("https://" + linkTx.value, "link");
    });

    let updateLink = async () => {
      if (lesson.lesson.access != null && lesson.lesson.access > -1) {
        createHolder.style.opacity = 0;
        createHolder.style.pointerEvents = "none";
      } else {
        createHolder.style.opacity = 1;
        createHolder.style.pointerEvents = "all";
      }
      if (lesson.lesson.access != 1) {
        // Viewer:
        accessIcon.src = "./images/editor/share/viewer.svg";
        accessTitle.textContent = "Public View Access";
        accessDesc.textContent = "Anyone with this link will be able to view the document, but not make any edits.";
      } else {
        // Editor:
        accessIcon.src = "./images/editor/share/editor.svg";
        accessTitle.textContent = "Public Edit Access";
        accessDesc.textContent = "Anyone with this link will be able to view the document and create annotations.";
      }
      if (lesson.lesson.settings == null || lesson.lesson.settings.forceLogin != true || account.tenant == null || account.tenant.flags == null || account.tenant.flags.require_login_link_auth_classlink != true) {
        linkTx.value = "markify.link/join?lesson=" + lesson.id;
      } else {
        linkTx.value = "markify.link/join?lesson=" + lesson.id + "&auth=classlink";
      }
    }
    editor.pipeline.subscribe("shareLessonSet", "set", (body) => {
      if (body.hasOwnProperty("access") == true) {
        updateLink();
      }
    });
    updateLink();
    
    createButton.addEventListener("click", async () => {
      createButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/share/link/enable", null, { session: editor.session });
      if (code == 200) {
        lesson.lesson.access = body.access;
        updateLink();
      }
      createButton.removeAttribute("disabled");
    });
    accessButton.addEventListener("click", async () => {
      accessButton.setAttribute("disabled", "");
      let newValue = 1;
      let existingValue = lesson.lesson.access;
      if (existingValue == 1) {
        newValue = 0;
      }
      lesson.lesson.access = newValue;
      updateLink();
      let [code] = await sendRequest("PUT", "lessons/setting", { set: "publicAccess", value: newValue }, { session: editor.session });
      if (code != 200) {
        lesson.lesson.access = existingValue;
        updateLink();
      }
      updateLink();
      accessButton.removeAttribute("disabled");
    });
    let removeButton = frame.querySelector(".eShareLinkRemove");
    removeButton.addEventListener("click", async () => {
      removeButton.setAttribute("disabled", "");
      let [code] = await sendRequest("DELETE", "lessons/share/link/remove", null, { session: editor.session });
      if (code == 200) {
        delete lesson.lesson.access;
        updateLink();
      }
      removeButton.removeAttribute("disabled");
    });

    let optionsButton = frame.querySelector(".eShareOptionLink");
    optionsButton.addEventListener("click", async () => {
      dropdownModule.open(optionsButton, "dropdowns/lesson/share/options", { parent: parent });
    });
  }
}

modules["dropdowns/lesson/share/email"] = class {
  html = `
  <div class="eShareEmailRow eShareEmailSend">
    <input class="eShareEmailInput" placeholder="example@example.com"></input>
    <button class="eShareEmailButton largeButton border" title="Send invite to user.">Send</button>
  </div>
  <div class="eShareEmailRow eShareEmailHolder"></div>
  `;
  css = {
    ".eShareEmailRow": `box-sizing: border-box; width: 380px; max-width: 100%; justify-content: center; align-items: center`,
    
    ".eShareEmailSend": `position: sticky; display: flex; flex-wrap: wrap; padding: 16px 14px 8px 14px; top: 0px; background: rgba(var(--background), .7); backdrop-filter: blur(4px); z-index: 1`,
    ".eShareEmailInput": `box-sizing: border-box; width: calc(100% - 81.81px); height: 42px; margin-right: 8px; border: solid 3px var(--hover); outline: unset; border-radius: 21px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 700; font-family: var(--font); font-size: 18px`,
    ".eShareEmailInput::placeholder": `color: var(--hover)`,
    ".eShareEmailButton": `height: 36px; padding: 0 10px; margin: 3px; --borderWidth: 3px; --borderRadius: 18px; color: var(--theme); font-size: 18px`,

    ".eShareEmailHolder": `padding: 8px 14px 14px 14px;`,
    ".eShareTile": `display: flex; width: 100%; align-items: center`,
    ".eShareTile:not(:last-child)": `padding-bottom: 8px; margin-bottom: 8px; border-bottom: solid 2px var(--hover)`,
    ".eShareImage": `width: 38px; height: 38px; object-fit: cover; border-radius: 19px;`,
    ".eShareInfoHolder": `width: calc(100% - 157.53px); margin: 0 6px; text-align: left`,
    ".eShareName": `width: 100%; font-size: 16px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,
    ".eShareEmail": `width: 100%; font-size: 14px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden`,

    ".eShareActionHolder": "display: flex; margin-left: auto; flex-shrink: 0",
    ".eShareActionHolder button": `position: relative; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 14px`,
    ".eSharePerm": `color: var(--theme); font-weight: 600`,
    ".eShareRemove": `width: 22px`,
    ".eShareRemove img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`
  };
  js = async function (frame, extra) {
    frame.closest(".dropdownContent").style.padding = "0px";

    let parent = extra.parent;
    let editor = parent.editor;
    
    let inputField = frame.querySelector(".eShareEmailInput");
    let sendButton = frame.querySelector(".eShareEmailButton");
    let emailHolder = frame.querySelector(".eShareEmailHolder");

    let verifyEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function updateEmptyTx() {
      if (emailHolder.querySelectorAll(".eShareTile").length > 0) {
        if (emailHolder.querySelector(".eShareEmailEmpty") != null) {
          emailHolder.querySelector(".eShareEmailEmpty").remove();
        }
      } else if (emailHolder.querySelector(".eShareEmailEmpty") == null) {
        emailHolder.insertAdjacentHTML("beforeend", `<div class="eShareEmailEmpty">Nobody invited... Add someone above!</div>`);
      }
    }
    updateEmptyTx();
    async function sendInvite() {
      let email = inputField.value;
      if (verifyEmailRegex.test(email) == false) {
        alertModule.open("error", "<b>Invalid Email</b>That email is invalid, check it and try again.");
        inputField.focus();
        return;
      }
      inputField.setAttribute("disabled", "");
      sendButton.setAttribute("disabled", "");
      let [code, response] = await sendRequest("POST", "lessons/share/email/send", { email: email }, { session: editor.session });
      if (code == 200) {
        addNewTile(response);
        inputField.value = "";
      }
      inputField.removeAttribute("disabled");
      sendButton.removeAttribute("disabled");
      inputField.focus();
    }
    sendButton.addEventListener("click", sendInvite);
    inputField.addEventListener("keydown", function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        sendInvite();
      }
    });

    let addNewTile = (data, insertFirst, ignoreExisting) => {
      if (ignoreExisting != true && emailHolder.querySelector('.eShareTile[userid="' + data._id + '"]') != null) {
        return;
      }
      let insertLoc = "afterbegin";
      if (insertFirst == false) {
        insertLoc = "beforeend"
      }
      emailHolder.insertAdjacentHTML(insertLoc, `<div class="eShareTile" new>
        <img class="eShareImage">
        <div class="eShareInfoHolder">
          <div class="eShareName"></div>
          <div class="eShareEmail"></div>
        </div>
        <div class="eShareActionHolder">
          <button class="eSharePerm buttonAnim border"></button>
          <button class="eShareRemove buttonAnim border" style="margin-left: 9px" title="Unshare document with member."><img src="./images/tooltips/close.svg"></button>
        </div>
      </div>`);
      let tile = emailHolder.querySelector(".eShareTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("userid", data._id);
      tile.querySelector(".eShareImage").src = data.image ?? "./images/profiles/default.svg";
      let nameTx = tile.querySelector(".eShareName");
      nameTx.innerHTML = data.user ?? "<i>Pending</i>";
      nameTx.title = data.user ?? "Awaiting for the user to open the document...";
      let emailTx = tile.querySelector(".eShareEmail");
      emailTx.textContent = data.email;
      emailTx.title = data.email;
      updatePermButton(tile.querySelector(".eSharePerm"), data.access ?? 0);
      return tile;
    }
    let emailInvite = (body) => {
      let tile = emailHolder.querySelector('.eShareTile[userid="' + body._id + '"]');
      switch (body.subTask) {
        case "new":
          addNewTile(body);
          break;
        case "update":
          if (tile != null) {
            updatePermButton(tile.querySelector(".eSharePerm"), body.access);
          }
          break;
        case "join":
          if (tile != null) {
            emailHolder.insertBefore(addNewTile(body, null, true), tile);
            tile.remove();
          }
          break;
        case "remove":
          if (tile != null) {
            tile.remove();
          }
      }
      updateEmptyTx();
    }
    editor.pipeline.subscribe("shareLessonSet", "invite", emailInvite, { unsubscribe: true });
    editor.pipeline.subscribe("shareLessonJoin", "join", (body) => {
      if (body.method == "shared") {
        emailInvite({ subTask: "join", _id: body.user, email: body.email, user: body.name, image: body.image, access: body.access });
      }
    });

    let updatePermButton = (button, access) => {
      if (access < 1) {
        button.textContent = "Viewer";
        button.title = "Set member to editor by default.";
      } else {
        button.textContent = "Editor";
        button.title = "Set member to viewer by default.";
      }
    }
    emailHolder.addEventListener("click", async (event) => {
      let element = event.target;
      if (element == null) {
        return;
      }
      let tile = element.closest(".eShareTile");
      let permSet = element.closest(".eSharePerm");
      if (permSet) {
        permSet.parentElement.setAttribute("disabled", "");
        let access;
        let existingAccess;
        if (permSet.textContent == "Viewer") {
          access = 1;
          existingAccess = 0;
        } else {
          access = 0;
          existingAccess = 1;
        }
        updatePermButton(permSet, access);
        let [code] = await sendRequest("PUT", "lessons/share/email/update?userid=" + tile.getAttribute("userid"), { access: access }, { session: editor.session });
        if (code != 200) {
          updatePermButton(permSet, existingAccess);
        }
        permSet.parentElement.removeAttribute("disabled");
        return;
      }
      let remUser = element.closest(".eShareRemove");
      if (remUser) {
        remUser.parentElement.setAttribute("disabled", "");
        let [code] = await sendRequest("DELETE", "lessons/share/email/remove?userid=" + tile.getAttribute("userid"), null, { session: editor.session });
        if (code == 200) {
          tile.remove();
        } else {
          remUser.parentElement.removeAttribute("disabled");
        }
      }
    });

    let [code, response] = await sendRequest("GET", "lessons/share/email/invited", null, { session: editor.session });
    if (code == 200) {
      let records = response.records;
      let users = getObject(response.users, "_id");
      for (let i = 0; i < records.length; i++) {
        addNewTile({ ...users[records[i].user], access: records[i].access }, false);
      }
      updateEmptyTx();
    }

    (async function () {
      await sleep(400);
      inputField.focus();
    })();
  }
}