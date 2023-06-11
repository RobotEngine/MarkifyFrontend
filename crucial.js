//let serverURL = "https://markify.exotek.co/api/";
let serverURL = "http://localhost:3000/api/";
//let assetURL = "https://markify.s3.amazonaws.com/";

const socket = new SimpleSocket({
  project_id: "62088fbdfc22489578e94822",
  project_token: "client_129dbf2cf03edc6fba2aac135fd5ae119af"
});

let modules = {};

let body = document.body;
let app = findC("app");
let fixed = findC("fixed");
let stylesheet = document.querySelector("style").sheet;

let loadingAnim = app.innerHTML;

let currentPage = "";

let account = {};
let userID;

let subscribes = [];

let tempListeners = [];
function tempListen(parent, listen, runFunc, extra) {
  parent.addEventListener(listen, runFunc, extra);
  tempListeners.push({ parent: parent, name: listen, listener: runFunc });
}
function removeTempListeners() {
  for (let i = 0; i < tempListeners.length; i++) {
    let remEvent = tempListeners[i];
    if (remEvent.parent != null) {
      remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
    }
  }
}

function findC(name) {
  return document.getElementsByClassName(name)[0];
}
function findI(name) {
  return document.getElementById(name);
}

let currentlyLoadingModules = {};
async function getModule(path) {
  if (modules[path] == null) {
    if (currentlyLoadingModules[path] != null) {
      return;
    }
    currentlyLoadingModules[path] = "";
    await loadScript("./modules/" + path + ".js");
    delete currentlyLoadingModules[path];
  }
  if (modules[path] && modules[path].css && modules[path].loaded != true) {
    modules[path].loaded = true;
    let newRules = modules[path].css;
    let ruleKeys = Object.keys(newRules);
    for (let i = 0; i < ruleKeys.length; i++) {
      stylesheet.insertRule(ruleKeys[i] + "{" + newRules[ruleKeys[i]] + "}", stylesheet.cssRules.length);
    }
  }
  return modules[path];
}
let currentlyLoadingFrames = {};
async function setFrame(path, frame, extra) {
  let frameSet = frame || app;
  if (currentlyLoadingFrames[frameSet.className] == "") {
    return;
  }
  currentlyLoadingFrames[frameSet.className] = "";
  if (modules[path] == null) {
    if (frameSet.querySelector(".loading:not([done])") == null) {
      frameSet.innerHTML = loadingAnim;
      runLoadingAnim(frameSet);
    }
  } else {
    frameSet.innerHTML = "";
  }
  let module = await getModule(path);
  if (module == null) {
    frameSet.style.display = "flex";
    frameSet.style.alignItems = "center";
    frameSet.innerHTML = `<span style="max-width: 300px; color: var(--error)">Couldn't load module, please try again later.</span>`;
    delete currentlyLoadingFrames[frameSet.className];
    return;
  }
  if (module.preJs) {
    if (await (module.preJs()) == false) {
      return;
    }
  }
  if (frameSet.querySelector(".loading:not([done])")) {
    frameSet.querySelector(".loading:not([done])").style.width = frameSet.querySelector(".loading:not([done])").clientWidth + "px";
  }
  frameSet.insertAdjacentHTML("beforeend", module.html);
  if (frameSet.querySelector(".loading:not([done])")) {
    frameSet.querySelector(".loading:not([done])").setAttribute("done", "");
    (async function () {
      frameSet.querySelector(".loading").style.opacity = 0;
      await sleep(500);
      frameSet.querySelector(".loading").remove();
    })();
  }
  if (frameSet == app) {
    currentPage = path;
    document.title = module.title + " | Markify";
    window.location.hash = "#" +  path.substring(path.lastIndexOf("/") + 1);
  }
  module.js(frameSet);
  delete currentlyLoadingFrames[frameSet.className];
  return module;
}
function goBack() {
  history.back();
}
window.addEventListener("hashchange", function () {
  let setPage = "pages/" + window.location.hash.substring(1);
  if (currentPage == setPage) {
    return;
  }
  setFrame(setPage);
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getScript(url) {
  return document.querySelector("[src='" + url + "'");
}
function loadScript(url) {
  return new Promise(function (resolve) {
    let loaded = getScript(url);
    if (loaded != null) {
      loaded.remove();
    }
    let newScript = document.createElement("script");
    newScript.addEventListener("load", function () {
      resolve(newScript);
    });
    newScript.addEventListener("error", function () {
      resolve();
    });
    newScript.src = url;
    document.body.appendChild(newScript);
  });
}

function getParam(key) {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
}
function modifyParams(key, value) {
  const Url = new URL(window.location);
  if (value != null) {
    Url.searchParams.set(key, value);
  } else {
    Url.searchParams.delete(key);
  }
  window.history.pushState({}, "", Url);
}

let localDataStore = {};
function setLocalStore(key, data) {
  localDataStore[key] = data;
  try {
    localStorage.setItem(key, data);
  } catch {}
}
function getLocalStore(key) {
  let result = localDataStore[key];
  try {
    result = localStorage.getItem(key);
  } catch {}
  return result;
}
function removeLocalStore(key) {
  if (localDataStore[key]) {
    delete localDataStore[key];
  }
  try {
    localStorage.removeItem(key);
  } catch {}
}

let epochOffset = 0;
function getEpoch() {
  return Date.now() + epochOffset;
}
function randomString(l) {
  var s = "";
  var randomchar = function () {
    var n = Math.floor(Math.random() * 62);
    if (n < 10) return n; //1-10
    if (n < 36) return String.fromCharCode(n + 55); //A-Z
    return String.fromCharCode(n + 61); //a-z
  };
  while (s.length < l) s += randomchar();
  return s;
}
function promptLogin() {
  let randomStr = randomString(20);
  setLocalStore("state", randomStr);
  window.location =
    "https://exotek.co/login?client_id=631056064efd34591c5a8e05&redirect_uri=" +
    encodeURIComponent(window.location.protocol + "//" + window.location.host + window.location.pathname) +
    "&response_type=code&scope=userinfo&state=" +
    randomStr;
}
function ensureLogin() {
  let token = getLocalStore("token");
  if (token == null) {
    promptLogin();
    return;
  }
  return token;
}
async function renewToken() {
  let token = ensureLogin();
  let sendUserID = userID || getLocalStore("userID");
  let refreshToken = await fetch(serverURL + "auth/renew", {
    method: "POST",
    headers: {
      cache: "no-cache",
      "Content-Type": "text/plain"
    },
    body: JSON.stringify({
      userid: sendUserID,
      refresh: JSON.parse(token).refresh
    })
  });
  if (refreshToken.status == 200) {
    let refreshData = JSON.parse(await refreshToken.text());
    setLocalStore("token", JSON.stringify(refreshData.token));
    account.realtime = refreshData.realtime;
    return refreshData.token;
  } else {
    removeLocalStore("userID");
    removeLocalStore("token");
    promptLogin();
  }
}
async function sendRequest(method, path, body, noFileType) {
  try {
    let sendData = {
      method: method,
      headers: {
        cache: "no-cache"
      }
    };
    if (noFileType != true) {
      sendData.headers["Content-Type"] = "text/plain";
    }
    if (body != null) {
      if (typeof body == "object" && body instanceof FormData == false) {
        body = JSON.stringify(body);
      }
      sendData.body = body;
    }
    let token = getLocalStore("token");
    if (token != null) {
      token = JSON.parse(token);
      if (token.expires < Math.floor(getEpoch() / 1000)) {
        token = (await renewToken()) || token;
      }
      let sendUserID = userID || getLocalStore("userID");
      if (sendUserID != null) {
        sendData.headers.auth = sendUserID + ";" + token.session;
      }
    }
    let response = await fetch(serverURL + path, sendData);
    let serverTimeMillisGMT = new Date(response.headers.get("Date")).getTime();
    let localMillisUTC = new Date().getTime();
    epochOffset = serverTimeMillisGMT - localMillisUTC;
    switch (response.status) {
      case 401:
        await renewToken();
        break;
      case 429:
        // Show Rate Limit
        break;
      default:
        return [response.status, await response.text()];
    }
  } catch (err) {
    console.log("FETCH ERROR: " + err);
    if (path = "me") { // Show error connecting
      setFrame = function() { }
      app.style.display = "flex";
      app.style.flexDirection = "column";
      app.style.alignItems = "center";
      app.innerHTML = `<div style="max-width: 300px; color: var(--error)">Failed to connect to server, please try again later.</div><button style="margin-top: 18px; font-size: 18px; text-decoration: underline" onclick="location.reload()">Retry</button>`;
    }
    return [0, "Fetch Error"];
  }
}

let accountSocket;
function accountSub() {
  if (accountSocket) {
    accountSocket.edit({
      type: "account",
      id: userID,
      token: account.realtime
    });
  } else {
    accountSocket = socket.subscribe(
      { type: "account", id: userID, token: account.realtime },
      function (data) {
        console.log(data);
        if (data.task === "set") {
          function recUpdate(obj, passData) {
            let keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i++) {
              let key = keys[i];
              if (
                typeof obj[key] !== "object" ||
                Array.isArray(obj[key]) === true ||
                obj[key] === null
              ) {
                passData[key] = obj[key];
              } else {
                passData[key] = passData[key] || {};
                recUpdate(obj[key], passData[key] || {});
              }
            }
          }
          recUpdate(data.data, account);

          if (data.data.realtime) {
            accountSub();
          }
          if (data.data.user || data.data.hasOwnProperty("image")) {
            //
          }
        }
      }
    );
  }
}

function updateToSignedIn(data) {
  account = data;
  userID = account.id;
  accountSub();
}
async function auth() {
  let [code, response] = await sendRequest("GET", "me");
  if (code != 200) {
    return;
  }
  updateToSignedIn(JSON.parse(response));
}
async function init() {
  let paramAuthCode = getParam("code");
  if (paramAuthCode) {
    if (getParam("state") != getLocalStore("state")) {
      promptLogin();
      return;
    }
    removeLocalStore("state");
    modifyParams("state");
    let [code, response] = await sendRequest("POST", "auth", {
      code: paramAuthCode
    });
    modifyParams("code");
    if (code === 200) {
      let data = JSON.parse(response);
      setLocalStore("userID", data.user.id);
      setLocalStore("token", JSON.stringify(data.token));
      updateToSignedIn(data.user);
    }
  } else if (getLocalStore("token") != null) {
    await auth();
  }
}
socket.onopen = async function () {
  await init();
  if (window.location.hash == "") {
    setFrame("pages/dashboard");
  } else {
    setFrame("pages/" + window.location.hash.substring(1));
  }
};
socket.onclose = async function () {
  // 
};


// STANDARD MODULES //

modules["dropdown"] = {
  css: {
    ".dropdown": `position: sticky; box-sizing: border-box; width: 40px; height: 40px; max-width: calc(100% - 16px); max-height: calc(100% - 16px); right: 0px; bottom: 0px; margin: 8px; opacity: 0; transform-origin: center top; border-radius: 12px; box-shadow: var(--shadow); overflow: hidden; pointer-events: all`,
    ".dropdownContent": `position: absolute; width: max-content; height: max-content; padding: 6px; left: 50%; transform: translateX(-50%); top: 0px; background: rgb(var(--background)); overflow: auto`,
    ".dropdownHeader": `display: flex; gap: 6px; margin-bottom: 6px; justify-content: space-between`,
    ".dropdownHeader button": `position: relative; width: 22px; height: 22px; margin: 3px; outline: solid 3px var(--secondary); border-radius: 14px`,
    ".dropdownHeader button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dropdownTitle": `box-sizing: border-box; display: flex; padding: 3px; flex: 1; max-width: fit-content; justify-content: center; align-items: center; overflow: hidden; font-size: 18px; font-weight: 500; transition: .2s`,
    ".dropdownTitle div": `flex: 1; margin: 0 4px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dropdownTitle img": `width: 26px; height: 26px; object-fit: cover; border-radius: 13px`
  },
  open: async function(button, frameName, extra) {
    this.close();
    fixed.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
      <div class="dropdown" new>
        <div class="dropdownContent">
          <div class="dropdownHeader">
            <button class="dropdownBack buttonAnim" style="display: none"><img src="./images/tooltips/back.svg"></button>
            <div class="dropdownTitle"></div>
            <button class="dropdownClose buttonAnim" close><img src="./images/tooltips/close.svg"></button>
          </div>
          <div class="dropdownFrame"></div>
        </div>
      </div>
    </div>`);
    let dropdown = fixed.querySelector(".dropdown[new]");
    dropdown.removeAttribute("new");
    let content = dropdown.querySelector(".dropdownContent");
    let frame = content.querySelector(".dropdownFrame");
    dropdown.style.width = button.clientWidth + "px";
    dropdown.style.height = button.clientHeight + "px";
    frame.style.minHeight = "200px";
    let setTitleHTML = button.innerHTML;
    if (button.innerHTML == button.textContent) {
      setTitleHTML = "<div>" + button.innerHTML + "</div>";
    }
    content.querySelector(".dropdownTitle").innerHTML = setTitleHTML;
    dropdown.style.transition = "width .3s, height .3s, opacity .3s";
    dropdown.offsetHeight;
    window.dropdown = { dropdown: dropdown, button: button, interval: setInterval(function() {
      content.style.maxWidth = body.offsetWidth - 28 + "px";
      content.style.maxHeight = body.offsetHeight - 28 + "px";
      content.style.minWidth = Math.min(body.offsetWidth - 28, 200) + "px";

      if (dropdown.hasAttribute("closing") == false) {
        dropdown.style.width = content.offsetWidth + "px";
        dropdown.style.height = content.offsetHeight + "px";
      } else {
        dropdown.style.width = button.offsetWidth + "px";
        dropdown.style.height = button.offsetHeight + "px";
      }

      let buttonRect = button.getBoundingClientRect();
      dropdown.style.top = buttonRect.top + "px";
      dropdown.style.left = buttonRect.left + (button.offsetWidth / 2) - (dropdown.offsetWidth / 2) + "px";
    }, 1) };
    button.style.opacity = 0;
    dropdown.style.opacity = 1;
    await setFrame(frameName, frame);
    frame.style.removeProperty("min-height");
  },
  close: async function() {
    if (window.dropdown == null) {
      return;
    }
    let remDropdown = window.dropdown;
    delete window.dropdown;
    remDropdown.dropdown.setAttribute("closing", "");
    remDropdown.button.style.opacity = 1;
    remDropdown.dropdown.style.opacity = 0;
    remDropdown.dropdown.querySelector(".dropdownTitle").style.transform = "scale(0)";
    await sleep(350);
    clearInterval(remDropdown.interval);
    remDropdown.dropdown.parentElement.remove();
  },
}
body.addEventListener("click", async function(event) {
  let element = event.target;
  if (element == null) {
    return;
  }
  let dropdown = element.closest("[dropdown]");
  if (dropdown) {
    (await getModule("dropdown")).open(dropdown, dropdown.getAttribute("dropdown"));
  } else if (element.closest(".dropdown") == null || element.closest("[close]")) {
    (await getModule("dropdown")).close();
  }
});
window.addEventListener("scroll", async function() {
  (await getModule("dropdown")).close();
});

modules["dropdowns/account"] = {
  html: `
  <button class="accountDrop accountManage"><div>Settings</div><img src="./images/tooltips/account/settings.svg"></button>
  <!--<button class="accountDrop" dropdown="dropdowns/account/preferences"><div>Preferences</div><img src="./images/tooltips/account/preferences.svg"></button>-->
  <button class="accountDrop accountLogout" style="--setBackground: var(--error)"><div>Logout</div><img src="./images/tooltips/account/logout.svg"></button>
  `,
  css: {
    ".accountDrop": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s; --setBackground: var(--theme)`,
    ".accountDrop:not(:last-child)": `margin-bottom: 4px`,
    ".accountDrop div": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".accountDrop img": `width: 24px; height: 24px; margin-left: 6px; object-fit: cover; transition: .15s`,
    ".accountDrop:hover": `background: var(--setBackground); color: #fff`,
    ".accountDrop:hover img": `filter: brightness(0) invert(1)`
  },
  js: function() {
    findC("accountManage").addEventListener("click", function() {
      window.open("https://exotek.co/account?userid=" + account.account, location.host + "_social_link_authenticate", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=1000, height=650, top=" + ((screen.height / 2) - (650 / 2) - 100) + ", left=" + ((screen.width / 2) - (1000 / 2)));
    });
    findC("accountLogout").addEventListener("click", async function() {
      let token = getLocalStore("token");
      if (token == null) {
        return;
      }
      let [code] = await sendRequest("POST", "auth/logout", {
        refresh: JSON.parse(token).refresh
      });
      if (code == 200) {
        removeLocalStore("userID");
        removeLocalStore("token");
        promptLogin();
      }
    });
  }
}