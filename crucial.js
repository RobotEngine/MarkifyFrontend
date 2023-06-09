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
    if (modules[path] && modules[path].css) {
      let newRules = modules[path].css;
      let ruleKeys = Object.keys(newRules);
      for (let i = 0; i < ruleKeys.length; i++) {
        stylesheet.insertRule(ruleKeys[i] + "{" + newRules[ruleKeys[i]] + "}", stylesheet.cssRules.length);
      }
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
  if (modules[path] == null && frameSet.querySelector(".loading:not([done])") == null) {
    frameSet.innerHTML = loadingAnim;
    runLoadingAnim(frameSet);
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
  open: async function(button, frameName, extra) {
    console.log(button, frameName);
    this.close();
    fixed.insertAdjacentHTML("beforeend", `<div class="dropdown" new><div class="dropdownContent"></div></div>`);
    let dropdown = fixed.querySelector(".dropdown[new]");
    let content = dropdown.querySelector(".dropdownContent");
    dropdown.removeAttribute("new");
    dropdown.offsetHeight;
    window.dropdown = { drop: dropdown, button: button, dropdownInterval: setInterval(function() {
      content.style.maxWidth = body.clientWidth - 16 + "px";
      content.style.maxHeight = body.clientHeight - 16 + "px";
      content.style.minWidth = Math.min(body.clientWidth - 16, 200) + "px";
      content.style.minHeight = Math.min(body.clientHeight - 16, 200) + "px";

      dropdown.style.width = content.clientWidth + "px";
      dropdown.style.height = content.clientHeight + "px";
      let buttonRect = button.getBoundingClientRect();
      dropdown.style.top = buttonRect.top + "px";
      dropdown.style.left = buttonRect.left + (button.clientWidth / 2) - (dropdown.clientWidth / 2) + "px";
    }, 1) };
    button.style.opacity = 0;
    dropdown.style.opacity = 1;
    await setFrame(frameName, content);
  },
  close: function() {
    console.log("CLOSE DROPDOWN CODE HERE!");
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
  }
});