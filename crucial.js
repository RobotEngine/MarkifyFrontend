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
let stylesheet = document.querySelector("style").sheet;

let loadingAnim = app.innerHTML;

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
async function loadModule(path) {
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
        stylesheet.addRule(ruleKeys[i], newRules[ruleKeys[i]]);
      }
    }
  }
}
async function setFrame(path, frame, extra) {
  if (modules[path] == null) {
    await loadModule(path);
  }
  let setFrame = frame || app;
  if (setFrame.querySelector(".loading") == null) {
    setFrame.insertAdjacentHTML("beforeend", loadingAnim);
  }
  if (modules[path] == null) {
    setFrame.innerHTML = "Couldn't load module. Please try again later."
    return;
  }
  setFrame.insertAdjacentHTML("beforeend", modules[path].html);
  if (setFrame.querySelector(".loading")) {
    (async function () {
      setFrame.querySelector(".loading").style.opacity = 0;
      await sleep(500);
      setFrame.querySelector(".loading").remove();
    })();
  }
  modules[path].js();
}
function goBack() {
  history.back();
}
window.addEventListener("hashchange", function () {
  setFrame(window.location.hash.substring(1));
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getScript(url) {
  return document.querySelector("[src='" + url + "'");
}
async function loadScript(url) {
  return new Promise(function (resolve) {
    let loaded = getScript(url);
    if (loaded != null) {
      loaded.remove();
    }
    let newScript = document.createElement("script");
    newScript.addEventListener("load", function () {
      resolve(newScript);
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
    setFrame(window.location.hash.substring(1));
  }
};
socket.onclose = async function () {
  // 
};