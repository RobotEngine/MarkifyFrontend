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
    ".eShareEmailInput": `box-sizing: border-box; width: calc(100% - 81.81px); height: 42px; margin-right: 8px; background: unset; border: solid 3px var(--hover); outline: unset; border-radius: 21px; padding: 8px; color: var(--theme); font-size: 18px; font-weight: 700; font-family: var(--font); font-size: 18px`,
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
          <button class="eShareToolToggleBarTool" tool="draw"><div style="--toolColor: #de84ff; --toolColorOpacity: rgba(222, 132, 255, 1); --toolOpacity: 1"></div></button>
          <button class="eShareToolToggleBarTool" tool="markup" style="--toolColor: #ffc24b; --toolColorOpacity: rgba(255, 194, 75, 0.5); --toolOpacity: 0.5"><div></div></button>
          <button class="eShareToolToggleBarTool" tool="erase"><div></div></button>
          <button class="eShareToolToggleBarTool" tool="text" style="--toolColor: #0084FF; --toolColorOpacity: rgba(0, 132, 255, 1); --toolOpacity: 1"><div></div></button>
          <button class="eShareToolToggleBarTool" tool="shape" style="--toolColor: #fb4c6c; --toolColorOpacity: rgba(251, 76, 108, 1); --toolOpacity: 1"><div></div></button>
          <button class="eShareToolToggleBarTool" tool="sticky"><div></div></button>
          <button class="eShareToolToggleBarTool" tool="page"><div></div></button>
          <button class="eShareToolToggleBarTool" tool="media"><div></div></button>
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
    ".eShareToolToggleAll": `height: fit-content; padding: 6px 10px; --borderWidth: 3px; --borderRadius: 16px; color: var(--themeColor); font-size: 16px; font-weight: 600`,
    ".eShareToolToggleAll[on]": `--themeColor: var(--theme)`,
    ".eShareToolToggleAll[off]": `--themeColor: var(--activeGray)`,
    ".eShareToolToggleAll:hover": `background: var(--themeColor); --borderWidth: 0px; transform: scale(1.1); color: #fff`,
    ".eShareToolToggleAll:active": `transform: scale(1.02) !important`,
    
    ".eShareToolToggle": `position: relative; display: flex; width: 314px; max-width: 100%`,
    ".eShareToolToggleBar": `display: flex; flex-direction: column; margin: 8px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px; align-items: center; pointer-events: none`,
    ".eShareToolToggleBarTool": `--hoverColor: var(--hover); width: 50px; height: 46px; flex-shrink: 0; padding: 0; transition: opacity .3s`,
    ".eShareToolToggleBarTool > div": `display: flex; width: 42px; height: 42px; margin: 0 4px; justify-content: left; align-items: center; overflow: hidden`,
    ".eShareToolToggleBarTool > div > svg": `width: 40px; height: 40px; margin: 1px`,
    ".eShareToolToggleInfo": `display: flex; flex-direction: column; flex: 1; margin: 8px 0; align-items: center`,
    ".eShareToolToggleInfo .eShareActionOption": `padding: 4px; margin: 6px 6px 6px 0px`,
    ".eShareToolToggleInfo .eShareActionOption:active": `margin: 6px 6px 6px -1px`,
    ".eShareToolToggleRow": `display: flex; width: 100%; height: 46px; flex-shrink: 0; align-items: center`,
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

    // Load Tool Icons:
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="draw"] div'), "./images/editor/toolbar/draw.svg");
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="markup"] div'), "./images/editor/toolbar/markup.svg");
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="erase"] div'), "./images/editor/toolbar/erase.svg");
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="text"] div'), "./images/editor/toolbar/text.svg");
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="shape"] div'), "./images/editor/toolbar/shape.svg");
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="sticky"] div'), "./images/editor/toolbar/sticky.svg");
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="page"] div'), "./images/editor/toolbar/page.svg");
    setSVG(toolToggle.querySelector('.eShareToolToggleBarTool[tool="media"] div'), "./images/editor/toolbar/media.svg");
  }
}