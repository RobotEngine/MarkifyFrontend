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
  <div class="eSharePinLink">Join with this pin at <a href="https://markify.link" target="_blank">markify.link</a></div>
  <div class="eSharePinDisplay"><span section left></span><div></div><span section right></span></div>
  <div class="eSharePinOptions">
    <button class="eSharePinCopy largeButton border" title="Copy the pin code."><img src="./images/tooltips/copy.svg"></button>
    <button class="eSharePinRemove largeButton border" title="Invalidate the pin.">Remove</button>
    <button class="eShareOptionPin largeButton border" title="Configurable options for members who join.">Options</button>
  </div>
  `;
  css = {
    ".eSharePinCreate": "position: absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 1; background: rgba(var(--background), .7); transition: .3s",
    ".eSharePinCreate button": `background: var(--theme); --borderRadius: 14px; color: #fff`,
    
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
    }, { unsubscribe: true });
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
    ".eShareLinkCreate button": `background: var(--theme); --borderRadius: 14px; color: #fff`,

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
    }, { unsubscribe: true });
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

modules["dropdowns/lesson/share/options"] = class {
  html = `
  <div class="eShareOptionSwitcherHolder">
    <div class="eShareOptionSwitcher">
      <button section="settings" selected>Settings</button>
      <button section="tooltoggle">Tool Toggle</button>
    </div>
  </div>
  <div class="eShareOptionContent">
    <div class="eShareOptionSection" section="settings">
      <button class="eShareActionOption border" option="forceLogin" title="Require those joining to login for verified identites."><div label>Require Login</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="editOthersWork" title="Allow members to edit and delete annotations created by other members."><div label>Modify Other's Work</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="anonymousMode" title="Hide all member names and colors in cursors."><div label>Anonymous Mode</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="allowExport" title="Allow members to export, print, or copy the lesson."><div label>Allow Exporting</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareActionOption border" option="observeViewers" title="Allow members to observe those who aren't editing."><div label>Observe Viewers</div><div class="eOptionToggle"><div></div></div></button>
      <button class="eShareSaveDefault border" title="Save as the default for new lessons.">Save as Default</button>
    </div>
    <div class="eShareOptionSection" section="tooltoggle">
      <div class="eShareToolToggleAllHolder">
        <button class="eShareToolToggleAll border" on title="Toggle all tools on.">All On</button>
        <button class="eShareToolToggleAll border" off title="Toggle all tools off.">All Off</button>
      </div>
      <div class="eShareToolToggle">
        <div class="eShareToolToggleBar">
          <button class="eShareToolToggleBarTool" tool="draw"><div><svg width="22" viewBox="0 0 27 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12.3863 34.9812C13.2256 37.2873 15.077 39.0806 17.4087 39.846L19.7938 40.629C20.4513 40.8448 21.1712 40.5828 21.5361 39.9948L22.86 37.8619C24.1541 35.7768 24.4197 33.213 23.5803 30.9069L18.9826 18.2748L7.78855 22.3491L12.3863 34.9812Z" fill="white"></path> <path d="M18.5551 17.1002L19.7297 16.6726L20.1572 17.8472L24.7549 30.4794C25.7254 33.1458 25.4184 36.1102 23.922 38.5211L22.5982 40.654C21.9291 41.732 20.6094 42.2123 19.404 41.8166L17.0188 41.0337C14.3228 40.1486 12.1822 38.0752 11.2117 35.4088L6.61393 22.7766L6.18641 21.602L7.36103 21.1745L18.5551 17.1002Z" fillcoloropacity="" stroke="white" stroke-width="2.5" fill="rgba(226, 122, 255, 1)"></path> <path d="M11.4928 32.5264L10.3182 32.9539L9.89068 31.7793L2.35127 11.065C0.990064 7.32509 2.91836 3.18985 6.65823 1.82865C10.3981 0.467446 14.5333 2.39574 15.8945 6.13561L23.434 26.85L23.8615 28.0246L22.6869 28.4521L11.4928 32.5264Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"></path> </svg></div></button>
          <button class="eShareToolToggleBarTool" tool="markup"><div><svg width="26" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.1698 36.4384C13.9254 38.5143 16.2208 39.5846 18.2967 38.8291L23.9348 36.7769C26.0107 36.0214 27.0811 33.726 26.3255 31.6501L22.5633 21.3135L9.4076 26.1018L13.1698 36.4384Z" fill="white"></path> <path d="M22.1358 20.1389L23.3104 19.7113L23.7379 20.8859L27.5001 31.2226C28.4918 33.9472 27.087 36.9599 24.3624 37.9516L18.7242 40.0037C15.9996 40.9954 12.9869 39.5905 11.9952 36.8659L8.23298 26.5293L7.80546 25.3547L8.98008 24.9271L22.1358 20.1389Z" fillcoloropacity="" stroke="white" stroke-width="2.5" fill="rgba(255, 187, 51, 0.3)"></path> <path d="M11.9685 33.1377L10.7938 33.5652L10.3663 32.3906L2.49986 10.7776C1.50817 8.053 2.913 5.04033 5.63764 4.04864L11.2758 1.99652C14.0004 1.00484 17.0131 2.40967 18.0048 5.1343L25.8712 26.7472L26.2988 27.9219L25.1242 28.3494L11.9685 33.1377Z" fill="#2F2F2F" stroke="white" stroke-width="2.5"></path> </svg></div></button>
          <button class="eShareToolToggleBarTool" tool="erase"><div><svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1893_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"></rect> </mask> <g mask="url(#mask0_1893_2)"> <path d="M154.613 154.645L158.856 158.888L163.098 154.645L196.12 121.623C206.274 111.469 206.274 95.0072 196.12 84.8535L170.166 58.8995C160.012 48.7459 143.55 48.7459 133.396 58.8995L100.375 91.9214L96.1319 96.164L100.375 100.407L154.613 154.645Z" fill="#2F2F2F" stroke="white" stroke-width="12"></path> <path d="M100.407 100.375L96.1646 96.1319L91.9219 100.375L58.9 133.396C48.7463 143.55 48.7463 160.012 58.9 170.166L79.1943 190.46C82.945 194.211 88.0321 196.318 93.3365 196.318L112.889 196.318C118.161 196.318 123.221 194.236 126.966 190.525L154.626 163.118L158.908 158.875L154.645 154.613L100.407 100.375Z" fill="#2F2F2F" stroke="white" stroke-width="12"></path> </g> </svg></div></button>
          <button class="eShareToolToggleBarTool" tool="text"><div><svg width="44" viewBox="0 0 52 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 7V3H25.5V7H17V29.5H12V7H3Z" fill="#2F2F2F"></path> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fill="white"></path> <path d="M34 19L26.5 9H31.5L36.5 15.5L42 9H47L39.5 19L47 29.5H42L36.5 22.5L31.5 29.5H26L34 19Z" fillcoloropacity="" fill="rgba(0, 132, 255, 1)"></path> <mask id="path-4-outside-1_925_51" maskUnits="userSpaceOnUse" x="0" y="0" width="52" height="32" fill="black"> <rect fill="white" width="52" height="32"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3V7H12V29.5H17V7H25.5V3H3ZM26.5 9L34 19L26 29.5H31.5L36.5 22.5L42 29.5H47L39.5 19L47 9H42L36.5 15.5L31.5 9H26.5Z"></path> </mask> <path d="M3 7H0.5V9.5H3V7ZM3 3V0.5H0.5V3H3ZM12 7H14.5V4.5H12V7ZM12 29.5H9.5V32H12V29.5ZM17 29.5V32H19.5V29.5H17ZM17 7V4.5H14.5V7H17ZM25.5 7V9.5H28V7H25.5ZM25.5 3H28V0.5H25.5V3ZM34 19L35.9886 20.5151L37.1339 19.0119L36 17.5L34 19ZM26.5 9V6.5H21.5L24.5 10.5L26.5 9ZM26 29.5L24.0114 27.9849L20.9523 32H26V29.5ZM31.5 29.5V32H32.7865L33.5343 30.9531L31.5 29.5ZM36.5 22.5L38.4658 20.9554L36.4047 18.3322L34.4657 21.0469L36.5 22.5ZM42 29.5L40.0342 31.0446L40.7849 32H42V29.5ZM47 29.5V32H51.858L49.0343 28.0469L47 29.5ZM39.5 19L37.5 17.5L36.402 18.964L37.4657 20.4531L39.5 19ZM47 9L49 10.5L52 6.5H47V9ZM42 9V6.5H40.8405L40.0915 7.38514L42 9ZM36.5 15.5L34.5184 17.0243L36.4073 19.4798L38.4085 17.1149L36.5 15.5ZM31.5 9L33.4816 7.47572L32.731 6.5H31.5V9ZM5.5 7V3H0.5V7H5.5ZM12 4.5H3V9.5H12V4.5ZM14.5 29.5V7H9.5V29.5H14.5ZM17 27H12V32H17V27ZM14.5 7V29.5H19.5V7H14.5ZM25.5 4.5H17V9.5H25.5V4.5ZM23 3V7H28V3H23ZM3 5.5H25.5V0.5H3V5.5ZM36 17.5L28.5 7.5L24.5 10.5L32 20.5L36 17.5ZM27.9886 31.0151L35.9886 20.5151L32.0114 17.4849L24.0114 27.9849L27.9886 31.0151ZM31.5 27H26V32H31.5V27ZM34.4657 21.0469L29.4657 28.0469L33.5343 30.9531L38.5343 23.9531L34.4657 21.0469ZM43.9658 27.9554L38.4658 20.9554L34.5342 24.0446L40.0342 31.0446L43.9658 27.9554ZM47 27H42V32H47V27ZM37.4657 20.4531L44.9657 30.9531L49.0343 28.0469L41.5343 17.5469L37.4657 20.4531ZM45 7.5L37.5 17.5L41.5 20.5L49 10.5L45 7.5ZM42 11.5H47V6.5H42V11.5ZM38.4085 17.1149L43.9085 10.6149L40.0915 7.38514L34.5915 13.8851L38.4085 17.1149ZM29.5184 10.5243L34.5184 17.0243L38.4816 13.9757L33.4816 7.47572L29.5184 10.5243ZM26.5 11.5H31.5V6.5H26.5V11.5Z" fill="white" mask="url(#path-4-outside-1_925_51)"></path> </svg></div></button>
          <button class="eShareToolToggleBarTool" tool="shape"><div><svg width="38" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="1.97104" y="1.47107" width="22.6493" height="22.6493" rx="5.25" fill="#2F2F2F" stroke="white" stroke-width="2.5"></rect> <circle cx="32.7043" cy="33.2043" r="11.3246" fill="white" stroke="white" stroke-width="2.5"></circle> <circle cx="32.7043" cy="33.2043" r="11.3246" fillcoloropacity="" stroke="white" stroke-width="2.5" fill="rgba(255, 76, 108, 1)"></circle> </svg></div></button>
          <button class="eShareToolToggleBarTool" tool="sticky"><div><svg width="44" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_850_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"></rect> </mask> <g mask="url(#mask0_850_2)"> <path d="M185 38H72C54.3269 38 40 52.3269 40 70V183.246C40 200.801 54.1418 215.078 71.6952 215.245L145.905 215.952C150.739 215.998 155.387 214.098 158.805 210.68L211.728 157.757C215.104 154.382 217 149.803 217 145.029V70C217 52.3269 202.673 38 185 38Z" fill="#2F2F2F" stroke="white" stroke-width="12"></path> <path d="M211 144H171C156.641 144 145 155.641 145 170V210" stroke="white" stroke-width="12"></path> <rect x="62" y="60" width="133" height="20" rx="10" fill="white"></rect> <rect x="62" y="88" width="101" height="20" rx="10" fill="white"></rect> </g> </svg></div></button>
          <button class="eShareToolToggleBarTool" tool="page"><div><svg width="50" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_2372_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256"> <rect width="256" height="256" fill="#D9D9D9"></rect> </mask> <g mask="url(#mask0_2372_2)"> <path d="M169 41H87C72.6406 41 61 52.6406 61 67V188.211C61 202.487 72.5109 214.093 86.7864 214.21L168.786 214.884C183.229 215.002 195 203.327 195 188.885V67C195 52.6406 183.359 41 169 41Z" fillcoloropacity="" stroke="white" stroke-width="24" fill="white"></path> <path d="M169 47H87C75.9543 47 67 55.9543 67 67V188.211C67 199.193 75.8545 208.12 86.8357 208.21L168.836 208.884C179.945 208.975 189 199.994 189 188.885V67C189 55.9543 180.046 47 169 47Z" stroke="#2F2F2F" stroke-width="12"></path> <path d="M68 58C68 52.4772 72.4772 48 78 48H156V64C156 69.5228 151.523 74 146 74H68V58Z" fill="#2F2F2F"></path> </g> </svg></div></button>
          <button class="eShareToolToggleBarTool" tool="media"><div><svg width="40" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-outside-1_233_21" maskUnits="userSpaceOnUse" x="-0.459759" y="-0.0484619" width="51" height="42" fill="black"> <rect fill="white" x="-0.459759" y="-0.0484619" width="51" height="42"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z"></path> </mask> <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8324 12.3729C43.434 12.3729 45.5431 10.2638 45.5431 7.66221C45.5431 5.06058 43.434 2.95154 40.8324 2.95154C38.2308 2.95154 36.1217 5.06058 36.1217 7.66221C36.1217 10.2638 38.2308 12.3729 40.8324 12.3729ZM15.7765 12.2718C16.9312 10.2718 19.8179 10.2718 20.9726 12.2718L28.5261 25.3549L32.5377 18.4066C33.6924 16.4066 36.5792 16.4066 37.7339 18.4066L47.0534 34.5485C48.2081 36.5485 46.7647 39.0485 44.4553 39.0485H25.8163C25.6154 39.0485 25.4211 39.0296 25.2345 38.9937H5.54471C3.23531 38.9937 1.79194 36.4937 2.94664 34.4937L15.7765 12.2718Z" fill="#2F2F2F"></path> <path d="M20.9726 12.2718L23.1377 11.0218V11.0218L20.9726 12.2718ZM15.7765 12.2718L17.9415 13.5218L15.7765 12.2718ZM28.5261 25.3549L26.3611 26.6049L28.5261 30.3549L30.6912 26.6049L28.5261 25.3549ZM32.5377 18.4066L30.3726 17.1566V17.1566L32.5377 18.4066ZM37.7339 18.4066L35.5688 19.6566L35.5688 19.6566L37.7339 18.4066ZM47.0534 34.5485L49.2184 33.2985L47.0534 34.5485ZM25.2345 38.9937L25.7061 36.5386L25.4724 36.4937H25.2345V38.9937ZM2.94664 34.4937L0.781578 33.2437L2.94664 34.4937ZM43.0431 7.66221C43.0431 8.88313 42.0533 9.87289 40.8324 9.87289V14.8729C44.8148 14.8729 48.0431 11.6446 48.0431 7.66221H43.0431ZM40.8324 5.45154C42.0533 5.45154 43.0431 6.44129 43.0431 7.66221H48.0431C48.0431 3.67987 44.8148 0.451538 40.8324 0.451538V5.45154ZM38.6217 7.66221C38.6217 6.44129 39.6115 5.45154 40.8324 5.45154V0.451538C36.8501 0.451538 33.6217 3.67987 33.6217 7.66221H38.6217ZM40.8324 9.87289C39.6115 9.87289 38.6217 8.88313 38.6217 7.66221H33.6217C33.6217 11.6446 36.8501 14.8729 40.8324 14.8729V9.87289ZM23.1377 11.0218C21.0207 7.35513 15.7284 7.35511 13.6114 11.0218L17.9415 13.5218C18.134 13.1885 18.6151 13.1885 18.8076 13.5218L23.1377 11.0218ZM30.6912 24.1049L23.1377 11.0218L18.8076 13.5218L26.3611 26.6049L30.6912 24.1049ZM30.3726 17.1566L26.3611 24.1049L30.6912 26.6049L34.7028 19.6566L30.3726 17.1566ZM39.8989 17.1566C37.782 13.4899 32.4896 13.49 30.3726 17.1566L34.7028 19.6566C34.8952 19.3233 35.3763 19.3233 35.5688 19.6566L39.8989 17.1566ZM49.2184 33.2985L39.8989 17.1566L35.5688 19.6566L44.8883 35.7985L49.2184 33.2985ZM44.4553 41.5485C48.6892 41.5485 51.3354 36.9651 49.2184 33.2985L44.8883 35.7985C45.0807 36.1318 44.8402 36.5485 44.4553 36.5485V41.5485ZM25.8163 41.5485H44.4553V36.5485H25.8163V41.5485ZM24.7628 41.4488C25.1057 41.5147 25.458 41.5485 25.8163 41.5485V36.5485C25.7728 36.5485 25.7365 36.5444 25.7061 36.5386L24.7628 41.4488ZM5.54471 41.4937H25.2345V36.4937H5.54471V41.4937ZM0.781578 33.2437C-1.33537 36.9104 1.3108 41.4937 5.54471 41.4937V36.4937C5.15982 36.4937 4.91925 36.077 5.11171 35.7437L0.781578 33.2437ZM13.6114 11.0218L0.781578 33.2437L5.11171 35.7437L17.9415 13.5218L13.6114 11.0218Z" fill="white" mask="url(#path-1-outside-1_233_21)"></path> </svg></div></button>
        </div>
        <div class="eShareToolToggleInfo">
          <div class="eShareToolToggleRow">
            <div title>Draw</div>
            <div line></div>
            <button class="eShareActionOption border" option="draw"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Markup</div>
            <div line></div>
            <button class="eShareActionOption border" option="markup"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Erase</div>
            <div line></div>
            <button class="eShareActionOption border" option="erase"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Text Box</div>
            <div line></div>
            <button class="eShareActionOption border" option="text"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Shapes</div>
            <div line></div>
            <button class="eShareActionOption border" option="shape"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Stickies</div>
            <div line></div>
            <button class="eShareActionOption border" option="sticky"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow" tool="page">
            <div title>Page</div>
            <div line></div>
            <button class="eShareActionOption border" option="page"><div class="eOptionToggle"><div></div></div></button>
          </div>
          <div class="eShareToolToggleRow">
            <div title>Media</div>
            <div line></div>
            <button class="eShareActionOption border" option="media"><div class="eOptionToggle"><div></div></div></button>
          </div>
        </div>
      </div>
      <button class="eShareSaveDefault border" title="Save as the default for new lessons.">Save as Default</button>
    </div>
  </div>
  `;
  css = {
    ".eShareOptionSwitcherHolder": `position: sticky; box-sizing: border-box; width: 100%; padding: 8px; left: 0px; top: 0px; background: var(--pageColor); z-index: 2`,
    ".eShareOptionSwitcher": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 4px; width: 100%; padding: 4px; box-shadow: var(--lightShadow); border-radius: 20px`,
    ".eShareOptionSwitcher button": `flex: 1 1 120px; padding: 6px; border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eShareOptionSwitcher button:hover": `background: var(--hover)`,
    ".eShareOptionSwitcher button[selected]": `background: var(--theme); color: #fff`,

    ".eShareOptionContent": `position: relative; z-index: 1`,
    ".eShareOptionSection": `position: absolute; display: none; box-sizing: border-box; width: fit-content; max-width: 100%; height: fit-content; padding: 8px; left: 0px; top: 0px; transition: .4s`,
    ".eShareSaveDefault": `height: fit-content; padding: 6px 10px; margin: 8px 0 6px; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 16px; font-weight: 600`,
    ".eShareSaveDefault:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".eShareSaveDefault:active": `transform: scale(1.02) !important`,

    ".eShareActionOption": `display: flex; width: 300px; max-width: calc(100% - 14px); padding: 6px; margin: 7px 7px 11px 7px; align-items: center; --borderWidth: 3px; --borderRadius: 18px; justify-content: center; align-items: center; font-size: 16px; font-weight: 700; text-align: left`,
    ".eShareActionOption:last-child": `margin: 7px`,
    ".eShareActionOption div[label]": `flex: 1; margin: 0 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".eShareActionOption[on]": `--themeColor: var(--theme); --color: #fff; --borderColor: var(--hover)`,
    ".eShareActionOption[off]": `--themeColor: var(--gray); --color: #000; --borderColor: var(--lightGray)`,
    ".eOptionToggle": `position: relative; width: 36px; height: 20px; padding: 2px; background: var(--themeColor); border-radius: 12px; transition: .2s`,
    ".eOptionToggle div": `position: absolute; width: 20px; height: 20px; background: #fff; border-radius: 10px; transition: .2s`,
    ".eShareActionOption[on] .eOptionToggle div": `right: 2px`,
    ".eShareActionOption[off] .eOptionToggle div": `right: calc(100% - 22px)`,
    ".eShareActionOption[on]:hover": `background: var(--hover); --borderWidth: 0px; transform: scale(1.05)`,
    ".eShareActionOption[off]:hover": `background: var(--lightGray); --borderWidth: 0px; transform: scale(1.05)`,
    ".eShareActionOption:hover .eOptionToggle": `background: #fff`,
    ".eShareActionOption:hover .eOptionToggle div": `background: var(--themeColor)`,
    ".eShareActionOption:active": `transform: scale(.98) !important`,

    ".eShareToolToggleAllHolder": `display: flex; flex-wrap: wrap; width: 314px; max-width: 100%; gap: 12px; justify-content: center`,
    ".eShareToolToggleAll": `height: fit-content; padding: 6px 10px; --borderWidth: 3px; --borderRadius: 18px; color: var(--secondary); font-size: 16px; font-weight: 600`,
    ".eShareToolToggleAll:hover": `background: var(--secondary); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".eShareToolToggleAll:active": `transform: scale(1.02) !important`,
    
    ".eShareToolToggle": `position: relative; display: flex; width: 314px; max-width: 100%`,
    ".eShareToolToggleBar": `display: flex; flex-direction: column; gap: 6px; margin: 8px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; align-items: center; pointer-events: none`,
    ".eShareToolToggleBarTool": `--hoverColor: var(--hover); width: 50px; height: 50px; flex-shrink: 0; padding: 0; transition: .2s`,
    ".eShareToolToggleBarTool > div": `display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; overflow: hidden`,
    ".eShareToolToggleInfo": `display: flex; flex-direction: column; gap: 6px; flex: 1; margin: 8px 0; align-items: center`,
    ".eShareToolToggleRow": `display: flex; width: 100%; height: 50px; flex-shrink: 0; align-items: center`,
    ".eShareToolToggleRow div[title]": `font-size: 16px; font-weight: 600; margin: 0 8px 0 2px; white-space: nowrap`,
    ".eShareToolToggleRow div[line]": `flex: 1; height: 3px; border-radius: 2px; transition: .2s`,
    ".eShareToolToggleRow button": `width: fit-content !important`
  };
  js = async (frame, extra) => {
    let dropdownContent = frame.closest(".dropdownContent");
    dropdownContent.style.padding = "0px";

    let parent = extra.parent;
    let lesson = parent.parent;
    let editor = parent.editor;

    let switcher = frame.querySelector(".eShareOptionSwitcher");
    let contentHolder = frame.querySelector(".eShareOptionContent");
    let settingSection = contentHolder.querySelector('.eShareOptionSection[section="settings"]');
    let tooltoggleSection = contentHolder.querySelector('.eShareOptionSection[section="tooltoggle"]');
    let overflowSetTimeout;
    let openSection = (section) => {
      let selected = switcher.querySelector("button[selected]");
      if (selected != null) {
        selected.removeAttribute("selected");
      }
      let button = switcher.querySelector('button[section="' + section + '"]');
      if (button != null) {
        button.setAttribute("selected", "");
      }
      
      dropdownContent.scrollTo(0, 0);
      dropdownContent.style.overflow = "unset";
      clearTimeout(overflowSetTimeout);

      if (section == "settings") {
        settingSection.style.position = "relative";
        settingSection.style.display = "block";
        settingSection.offsetHeight;
        settingSection.style.transform = "translate(0px)";

        tooltoggleSection.style.removeProperty("position");
        tooltoggleSection.style.transform = "translate(100%)";
        overflowSetTimeout = setTimeout(() => {
          tooltoggleSection.style.removeProperty("display");
          dropdownContent.style.overflow = "auto";
        }, 400);
      } else if (section == "tooltoggle") {
        tooltoggleSection.style.position = "relative";
        tooltoggleSection.style.display = "block";
        tooltoggleSection.offsetHeight;
        tooltoggleSection.style.transform = "translate(0px)";

        settingSection.style.removeProperty("position");
        settingSection.style.transform = "translate(-100%)";
        overflowSetTimeout = setTimeout(() => {
          settingSection.style.removeProperty("display");
          dropdownContent.style.overflow = "auto";
        }, 400);
      }
    }
    switcher.addEventListener("click", (event) => {
      let button = event.target.closest("button");
      if (button == null) {
        return;
      }
      let section = button.getAttribute("section");
      if (section != null) {
        lesson.preferences.shareOptionLastSection = section;
        openSection(section);
      }
    });
    openSection(lesson.preferences.shareOptionLastSection ?? "settings");
    
    let forceLoginButton = frame.querySelector('.eShareActionOption[option="forceLogin"]');
    let editOthersWorkButton = frame.querySelector('.eShareActionOption[option="editOthersWork"]');
    let allowExportButton = frame.querySelector('.eShareActionOption[option="allowExport"]');
    let observeViewersButton = frame.querySelector('.eShareActionOption[option="observeViewers"]');
    let anonymousModeButton = frame.querySelector('.eShareActionOption[option="anonymousMode"]');
    let toolToggle = frame.querySelector(".eShareToolToggle");
    let toolToggleHolder = toolToggle.querySelector(".eShareToolToggleInfo");
    let toolToogleOptions = toolToggleHolder.querySelectorAll(".eShareActionOption[option]");

    let updateOptions = async () => {
      if (lesson.lesson.settings.forceLogin == true) {
        forceLoginButton.setAttribute("on", "");
        forceLoginButton.removeAttribute("off");
      } else {
        forceLoginButton.setAttribute("off", "");
        forceLoginButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.editOthersWork == true) {
        editOthersWorkButton.setAttribute("on", "");
        editOthersWorkButton.removeAttribute("off");
      } else {
        editOthersWorkButton.setAttribute("off", "");
        editOthersWorkButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.anonymousMode == true) {
        anonymousModeButton.setAttribute("on", "");
        anonymousModeButton.removeAttribute("off");
      } else {
        anonymousModeButton.setAttribute("off", "");
        anonymousModeButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.allowExport != false) {
        allowExportButton.setAttribute("on", "");
        allowExportButton.removeAttribute("off");
      } else {
        allowExportButton.setAttribute("off", "");
        allowExportButton.removeAttribute("on");
      }
      if (lesson.lesson.settings.observeViewers != false) {
        observeViewersButton.setAttribute("on", "");
        observeViewersButton.removeAttribute("off");
      } else {
        observeViewersButton.setAttribute("off", "");
        observeViewersButton.removeAttribute("on");
      }

      if (toolToogleOptions != null) {
        lesson.lesson.settings.disabled = lesson.lesson.settings.disabled ?? [];
        for (let i = 0; i < toolToogleOptions.length; i++) {
          let tool = toolToogleOptions[i];
          let toolName = tool.getAttribute("option");
          let toolImage = toolToggle.querySelector('.eShareToolToggleBarTool[tool="' + toolName + '"]');
          if (lesson.lesson.settings.disabled.includes(toolName) == false) {
            tool.setAttribute("on", "");
            tool.removeAttribute("off");
            tool.parentElement.querySelector("div[line]").style.background = "var(--hover)";
            toolImage.removeAttribute("disabled");
          } else {
            tool.setAttribute("off", "");
            tool.removeAttribute("on");
            tool.parentElement.querySelector("div[line]").style.background = "var(--lightGray)";
            toolImage.setAttribute("disabled", "");
          }
        }
      }
      if (lesson.lesson.settings.observeViewers != false) {
        observeViewersButton.setAttribute("on", "");
        observeViewersButton.removeAttribute("off");
      } else {
        observeViewersButton.setAttribute("off", "");
        observeViewersButton.removeAttribute("on");
      }
    }
    editor.pipeline.subscribe("shareLessonSet", "set", (body) => {
      if (body.hasOwnProperty("settings") == true) {
        updateOptions();
      }
    }, { unsubscribe: true });
    updateOptions();

    forceLoginButton.addEventListener("click", async () => {
      forceLoginButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "forceLogin", value: !forceLoginButton.hasAttribute("on") }, { session: editor.session });
      forceLoginButton.removeAttribute("disabled");
    });
    editOthersWorkButton.addEventListener("click", async () => {
      editOthersWorkButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "editOthersWork", value: !editOthersWorkButton.hasAttribute("on") }, { session: editor.session });
      editOthersWorkButton.removeAttribute("disabled");
    });
    anonymousModeButton.addEventListener("click", async () => {
      anonymousModeButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "anonymousMode", value: !anonymousModeButton.hasAttribute("on") }, { session: editor.session });
      anonymousModeButton.removeAttribute("disabled");
    });
    allowExportButton.addEventListener("click", async () => {
      allowExportButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "allowExport", value: !allowExportButton.hasAttribute("on") }, { session: editor.session });
      allowExportButton.removeAttribute("disabled");
    });
    observeViewersButton.addEventListener("click", async () => {
      observeViewersButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting", { set: "observeViewers", value: !observeViewersButton.hasAttribute("on") }, { session: editor.session });
      observeViewersButton.removeAttribute("disabled");
    });

    let toolToggleAllOnButton = frame.querySelector(".eShareToolToggleAll[on]");
    toolToggleAllOnButton.addEventListener("click", async () => {
      toolToggleAllOnButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting/tool", { set: "all", value: true }, { session: editor.session });
      toolToggleAllOnButton.removeAttribute("disabled");
    });
    let toolToggleAllOffButton = frame.querySelector(".eShareToolToggleAll[off]");
    toolToggleAllOffButton.addEventListener("click", async () => {
      toolToggleAllOffButton.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting/tool", { set: "all", value: false }, { session: editor.session });
      toolToggleAllOffButton.removeAttribute("disabled");
    });

    toolToggleHolder.addEventListener("click", async (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let button = target.closest(".eShareActionOption");
      if (button == null) {
        return;
      }
      button.setAttribute("disabled", "");
      await sendRequest("PUT", "lessons/setting/tool", { set: button.getAttribute("option"), value: !(button.hasAttribute("on")) }, { session: editor.session });
      button.removeAttribute("disabled");
    });

    let saveDefault = async (data) => {
      editor.preferences.share = { ...(editor.preferences.share ?? {}), ...data };
      await editor.savePreferences(true);
    }
    let settingDefaultButton = settingSection.querySelector(".eShareSaveDefault");
    settingDefaultButton.addEventListener("click", async () => {
      settingDefaultButton.setAttribute("disabled", "");
      await saveDefault({
        forceLogin: forceLoginButton.hasAttribute("on"),
        editOthersWork: editOthersWorkButton.hasAttribute("on"),
        anonymousMode: anonymousModeButton.hasAttribute("on"),
        allowExport: allowExportButton.hasAttribute("on"),
        observeViewers: observeViewersButton.hasAttribute("on")
      });
      settingDefaultButton.removeAttribute("disabled");
    });
    let toolToggleDefaultButton = tooltoggleSection.querySelector(".eShareSaveDefault");
    toolToggleDefaultButton.addEventListener("click", async() => {
      toolToggleDefaultButton.setAttribute("disabled", "");
      let saveArr = [];
      for (let i = 0; i < toolToogleOptions.length; i++) {
        let option = toolToogleOptions[i];
        if (option.hasAttribute("off") == true) {
          saveArr.push(option.getAttribute("option"));
        }
      }
      await saveDefault({ disabled: saveArr });
      toolToggleDefaultButton.removeAttribute("disabled");
    });
  }
}