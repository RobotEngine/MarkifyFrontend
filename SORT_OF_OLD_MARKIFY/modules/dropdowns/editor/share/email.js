modules["dropdowns/editor/share/email"] = {
  html: `
  <div class="eShareEmailRow eShareEmailSend">
    <input class="eShareEmailInput" placeholder="example@example.com"></input>
    <button class="eShareEmailButton largeButton border" title="Send invite to user.">Send</button>
  </div>
  <div class="eShareEmailRow eShareEmailHolder"></div>
  `,
  css: {
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
  },
  js: async function (frame) {
    frame.closest(".dropdownContent").style.padding = "0px";

    //frame.style.padding = "8px";

    let editor = await getModule("pages/editor");
    let inputField = frame.querySelector(".eShareEmailInput");
    let sendButton = frame.querySelector(".eShareEmailButton");
    let emailHolder = frame.querySelector(".eShareEmailHolder");

    let alert = await getModule("alert");

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
        alert.open("error", "<b>Invalid Email</b>That email is invalid, check it and try again.");
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
    editor.emailInvite = (task, body) => {
      let tile = emailHolder.querySelector('.eShareTile[userid="' + body._id + '"]');
      switch (task) {
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
    };

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