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
  let loadingPlacement = frameSet.closest(".dropdown") || frameSet;
  if (modules[path] == null) {
    if (loadingPlacement.querySelector(".loading:not([done])") == null) {
      if (frameSet.closest(".dropdown") == null) {
        frameSet.innerHTML = "";
      }
      loadingPlacement.insertAdjacentHTML("beforeend", loadingAnim);
      runLoadingAnim(loadingPlacement);
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
  if (loadingPlacement.querySelector(".loading:not([done])")) {
    loadingPlacement.querySelector(".loading:not([done])").style.width = "max(" + loadingPlacement.querySelector(".loading:not([done])").clientWidth + "px, 100%)";
  }
  frameSet.insertAdjacentHTML("beforeend", module.html);
  if (loadingPlacement.querySelector(".loading:not([done])")) {
    loadingPlacement.querySelector(".loading:not([done])").setAttribute("done", "");
    (async function () {
      loadingPlacement.querySelector(".loading").style.pointerEvents = "none";
      loadingPlacement.querySelector(".loading").style.opacity = 0;
      await sleep(500);
      loadingPlacement.querySelector(".loading").remove();
    })();
  }
  if (frameSet == app) {
    currentPage = path;
    document.title = module.title + " | Markify";
    window.location.hash = "#" + path.substring(path.lastIndexOf("/") + 1);
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
  } catch { }
}
function getLocalStore(key) {
  let result = localDataStore[key];
  try {
    result = localStorage.getItem(key);
  } catch { }
  return result;
}
function removeLocalStore(key) {
  if (localDataStore[key]) {
    delete localDataStore[key];
  }
  try {
    localStorage.removeItem(key);
  } catch { }
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
      setFrame = function () { }
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
      //(await getModule("alert")).open("worked", "<b>Welcome " + account.user + "</b>Welcome to Markify, ready to start a lesson?");
    }
  } else if (getLocalStore("token") != null) {
    await auth();
  }
}
socket.onopen = async function () {
  (await getModule("dropdown")).close();
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
    ".dropdown": `position: sticky; box-sizing: border-box; max-width: calc(100% - 16px); max-height: calc(100% - 16px); right: 0px; bottom: 0px; margin: 8px; opacity: 0; transform-origin: center top; background: rgb(var(--background)); border-radius: 12px; box-shadow: var(--shadow); overflow: hidden; pointer-events: all`,
    ".dropdownContent": `position: absolute; width: max-content; height: max-content; padding: 6px; background: rgb(var(--background))`,
    ".dropdownHeader": `display: flex; gap: 6px; padding: 6px 6px 0 6px; justify-content: space-between; transition: .3s`,
    ".dropdownHeader button": `position: relative; width: 22px; height: 22px; margin: 3px; outline: solid 3px var(--secondary); border-radius: 14px`,
    ".dropdownHeader button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dropdownTitle": `box-sizing: border-box; display: flex; padding: 3px; flex: 1; max-width: fit-content; justify-content: center; align-items: center; overflow: hidden; font-size: 18px; font-weight: 500`,
    ".dropdownTitle div": `flex: 1; margin: 0 4px; white-space: nowrap; overflow: hidden`,
    ".dropdownTitle img": `width: 26px; height: 26px; object-fit: cover; border-radius: 13px`
  },
  setResizeLoop: function (dropdown, content, header, button) {
    return setInterval(function () {
      content.style.top = header.offsetHeight + "px";
      content.style.maxWidth = body.offsetWidth - 28 + "px";
      content.style.maxHeight = body.offsetHeight - header.offsetHeight - 28 + "px";
      content.style.minWidth = Math.min(body.offsetWidth - 28, 200) + "px";

      if (dropdown.hasAttribute("closing") == false) {
        dropdown.style.width = content.offsetWidth + "px";
        dropdown.style.height = content.offsetHeight + header.offsetHeight + "px";
      } else {
        dropdown.style.width = button.offsetWidth + "px";
        dropdown.style.height = button.offsetHeight + "px";
      }

      let buttonRect = button.getBoundingClientRect();
      dropdown.style.top = buttonRect.top + "px";
      dropdown.style.left = buttonRect.left + (button.offsetWidth / 2) - (dropdown.offsetWidth / 2) + "px";
    }, 1);
  },
  open: async function (button, frameName, extra) {
    if (window.dropdown && button.closest(".dropdown")) { // Clicked inside the dropdown
      let dropdown = window.dropdown.dropdown;
      let header = dropdown.querySelector(".dropdownHeader");
      let oldContent = dropdown.querySelector(".dropdownContent:not([old])");
      oldContent.setAttribute("old", "");
      dropdown.insertAdjacentHTML("beforeend", `<div class="dropdownContent" new><div class="dropdownFrame"></div></div>`);
      let content = dropdown.querySelector(".dropdownContent[new]");
      content.removeAttribute("new");
      window.dropdown.content = content;
      let frame = content.querySelector(".dropdownFrame");
      let setTitleHTML = button.innerHTML;
      if (button.closest(".dropdownBack") == null) {
        if (button.innerHTML == button.textContent) {
          setTitleHTML = "<div>" + button.innerHTML + "</div>";
        }

        oldContent.style.removeProperty("right");
        oldContent.style.left = "0%";
        content.style.left = "50%";
      } else {
        window.dropdown.frameHistory.pop();
        setTitleHTML = window.dropdown.frameHistory.pop()[1];

        oldContent.style.removeProperty("left");
        oldContent.style.right = "0%";
        content.style.right = "50%";
      }
      header.querySelector(".dropdownTitle").innerHTML = setTitleHTML;
      let back = header.querySelector(".dropdownBack");
      if (window.dropdown.frameHistory.length > 0) {
        back.setAttribute("dropdown", window.dropdown.frameHistory[window.dropdown.frameHistory.length - 1][0]);
        back.style.display = "flex";
      } else {
        back.style.display = "none";
      }
      window.dropdown.frameHistory.push([frameName, setTitleHTML]);
      content.style.opacity = 0;
      //content.style.transform = "scale(.85)";
      content.style.zIndex = 1;
      content.style.pointerEvents = "none";
      content.style.transition = ".4s";
      content.offsetHeight;
      content.style.opacity = 1;
      //content.style.transform = "scale(1)";
      frame.style.minHeight = "200px";
      oldContent.style.zIndex = 0;
      oldContent.style.pointerEvents = "none";
      oldContent.style.transition = ".4s";
      oldContent.offsetHeight;
      if (button.closest(".dropdownBack") == null) {
        oldContent.style.left = "-50%";
        content.style.left = "0%";
      } else {
        oldContent.style.right = "-50%";
        content.style.right = "0%";
      }
      oldContent.style.opacity = 0;
      //oldContent.style.transform = "scale(.85)";
      clearInterval(window.dropdown.interval);
      window.dropdown.interval = this.setResizeLoop(dropdown, content, header, window.dropdown.button);
      await setFrame(frameName, frame);
      frame.style.removeProperty("min-height");
      await sleep(400);
      oldContent.remove();
      content.style.removeProperty("transition");
      header.querySelector(".dropdownTitle div").style.textOverflow = "ellipsis";
      content.style.pointerEvents = "all";
      await sleep(100);
      content.style.overflow = "auto";
      return;
    }
    this.close();
    fixed.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
      <div class="dropdown" new>
        <div class="dropdownHeader">
          <button class="dropdownBack buttonAnim" style="display: none"><img src="./images/tooltips/back.svg"></button>
          <div class="dropdownTitle"></div>
          <button class="dropdownClose buttonAnim" close><img src="./images/tooltips/close.svg"></button>
        </div>
        <div class="dropdownContent">
          <div class="dropdownFrame"></div>
        </div>
      </div>
    </div>`);
    let dropdown = fixed.querySelector(".dropdown[new]");
    dropdown.removeAttribute("new");
    let header = dropdown.querySelector(".dropdownHeader");
    let content = dropdown.querySelector(".dropdownContent");
    let frame = content.querySelector(".dropdownFrame");
    dropdown.style.width = button.offsetWidth + "px";
    dropdown.style.height = button.offsetHeight + "px";
    frame.style.minHeight = "200px";
    let setTitleHTML = button.innerHTML;
    if (button.innerHTML == button.textContent) {
      setTitleHTML = "<div>" + button.innerHTML + "</div>";
    }
    header.querySelector(".dropdownTitle").innerHTML = setTitleHTML;
    dropdown.style.transition = "width .3s, height .3s, opacity .3s";
    dropdown.offsetHeight;
    window.dropdown = { dropdown: dropdown, button: button, frameHistory: [[frameName, setTitleHTML]], interval: this.setResizeLoop(dropdown, content, header, button) };
    button.style.opacity = 0;
    dropdown.style.opacity = 1;
    await setFrame(frameName, frame);
    frame.style.removeProperty("min-height");
    await sleep(300);
    header.querySelector(".dropdownTitle div").style.textOverflow = "ellipsis";
    await sleep(200);
    content.style.overflow = "auto";
  },
  close: async function () {
    if (window.dropdown == null) {
      return;
    }
    let remDropdown = window.dropdown;
    delete window.dropdown;
    remDropdown.dropdown.setAttribute("closing", "");
    remDropdown.button.style.opacity = 1;
    remDropdown.dropdown.style.opacity = 0;
    remDropdown.dropdown.querySelector(".dropdownHeader").style.transform = "scale(0)";
    await sleep(350);
    clearInterval(remDropdown.interval);
    remDropdown.dropdown.parentElement.remove();
  }
}
body.addEventListener("click", async function (event) {
  let element = event.target;
  if (element == null) {
    return;
  }
  let alertClose = element.closest(".alertClose");
  if (alertClose) {
    (await getModule("alert")).close(alertClose.parentElement);
    return;
  }

  let dropdown = element.closest("[dropdown]");
  if (dropdown) {
    (await getModule("dropdown")).open(dropdown, dropdown.getAttribute("dropdown"));
  } else if (element.closest(".dropdown") == null || element.closest("[close]")) {
    (await getModule("dropdown")).close();
  }
});
window.addEventListener("scroll", async function () {
  (await getModule("dropdown")).close();
});

modules["alert"] = {
  css: {
    ".alertHolder": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 600px; max-width: 100%; height: fit-content; margin: 60px 8px 8px 8px; align-items: center; z-index: 9999`,
    ".alert": `box-sizing: border-box; display: flex; max-width: 100%; transform: scale(0); opacity: 0; background: rgb(var(--background)); border-radius: 12px; box-shadow: var(--shadow); pointer-events: all; overflow: hidden`,
    ".alert img": `width: 32px; height: 32px; object-fit: cover; margin-right: 6px`,
    ".alertText": `display: flex; flex-wrap: wrap; flex: 1; align-items: center; text-align: left; font-size: 16px`,
    ".alertText b": `margin-right: 6px; color: var(--themeColor); font-size: 18px`,
    ".alertClose": `position: relative; width: 22px; height: 22px; margin: 5px 5px 5px 12px; outline: solid 3px var(--secondary); border-radius: 14px`,
    ".alertClose img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`
  },
  colors: {
    info: "var(--theme)",
    worked: "#34C172",
    warning: "#FFB938",
    error: "var(--error)"
  },
  open: async function (type, message, data) {
    data = data || {};
    if (fixed.querySelector(".alertHolder") == null) {
      fixed.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
        <div class="alertHolder"></div>
      </div>`);
    }
    let alertHolder = fixed.querySelector(".alertHolder");
    alertHolder.parentElement.style.display = "flex";
    alertHolder.parentElement.style.justifyContent = "center";
    alertHolder.insertAdjacentHTML("afterbegin", `<div class="alert" new>
      <img src="./images/tooltips/alert/info.svg">
      <div class="alertText"></div>
      <button class="alertClose buttonAnim" close><img src="./images/tooltips/close.svg"></button>
    </div>`);
    let alert = fixed.querySelector(".alert[new]");
    alert.style.setProperty("--themeColor", this.colors[type]);
    alert.removeAttribute("new");
    alert.querySelector("img").src = "./images/tooltips/alert/" + type + ".svg";
    alert.querySelector(".alertText").innerHTML = message;
    alert.style.transition = "transform .25s var(--bounce), opacity .25s, padding .25s, margin .25s";
    alert.offsetHeight;
    alert.style.transform = "scale(1)";
    alert.style.padding = "8px";
    alert.style.marginTop = "8px";
    alert.style.opacity = 1;
    await sleep(data.time || 4000);
    this.close(alert);
  },
  close: async function (alert) {
    alert.style.maxHeight = alert.clientHeight + "px";
    alert.offsetHeight;
    alert.style.transition = ".4s";
    alert.style.transform = "scale(0)";
    alert.style.maxHeight = "0px";
    alert.style.padding = "0px 8px";
    alert.style.marginTop = "0px";
    alert.style.opacity = 0;
    await sleep(400);
    alert.remove();
  }
}

modules["dropdowns/account"] = {
  html: `
  <button class="accountDrop accountManage" close><div>Settings</div><img src="./images/tooltips/account/settings.svg"></button>
  <!--<button class="accountDrop" dropdown="dropdowns/account/preferences"><div>Preferences</div><img src="./images/tooltips/account/preferences.svg"></button>-->
  <button class="accountDrop accountLogout" style="--setBackground: var(--error)" close><div>Logout</div><img src="./images/tooltips/account/logout.svg"></button>
  `,
  css: {
    ".accountDrop": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s; --setBackground: var(--theme)`,
    ".accountDrop:not(:last-child)": `margin-bottom: 4px`,
    ".accountDrop div": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".accountDrop img": `width: 24px; height: 24px; margin-left: 6px; object-fit: cover; transition: .15s`,
    ".accountDrop:hover": `background: var(--setBackground); color: #fff`,
    ".accountDrop:hover img": `filter: brightness(0) invert(1)`
  },
  js: function (frame) {
    frame.querySelector(".accountManage").addEventListener("click", function () {
      let a = typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft;
      let i = typeof window.screenY != 'undefined' ? window.screenY : window.screenTop;
      let g = typeof window.outerWidth != 'undefined' ? window.outerWidth : document.documentElement.clientWidth;
      let f = typeof window.outerHeight != 'undefined' ? window.outerHeight : (document.documentElement.clientHeight - 22);
      let h = (a < 0) ? window.screen.width + a : a;
      window.open("https://exotek.co/account?userid=" + account.account, "exotek_window_prompt", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + 1000 + ", height=" + 650 + ", top=" + parseInt(i + ((f - 650) / 2.5), 10) + ", left=" + parseInt(h + ((g - 1000) / 2), 10));
    });
    frame.querySelector(".accountLogout").addEventListener("click", async function () {
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