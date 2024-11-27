let serverURL = window.serverURL ?? "https://api.markifyapp.com/";
//let serverURL = "http://localhost:3000/api/";
let assetURL = window.mediaURL ?? "https://static.markifyapp.com/";
//window.socketURL = "ws://localhost:3000/socket/v2";

const version = "0.22.21"; // Big Update . Small Feature Release . Bug Fix

let socket = {};

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let supportedImageTypes = ["png", "jpeg", "jpg", "webp", "svg+xml", "tiff", "tif", "heic", "heif", "gif"];

let modules = {};

let body = document.body;
let app = body.querySelector(".app");
let fixed = body.querySelector(".fixed");
let stylesheet = document.querySelector("style").sheet;

let loadingAnim = app.innerHTML;
app.querySelector(".loading[new]").setAttribute("appload", "");

let currentPage = "";

let account = {};
let userID;

let subscribes = [];

window.addEventListener("error", function(event) {
  let stacktrace = event.stack;
  if (!stacktrace && event.error) {
    stacktrace = event.error.stack;
  }
  if (stacktrace != null) {
    //prompt(e.message + ", " + e.filename + ", " + e.lineno + ":" + e.colno);
  }
});

/*
let mouseDown = 0;
let mouseEvent;
window.onmousedown = (e) => {
  mouseDown++;
  if (mouseEvent) {
    mouseEvent(e);
  }
}
window.onmouseup = (e) => {
  mouseDown--;
  if (mouseEvent) {
    mouseEvent(e);
  }
}
*/
let screenPressed = false;
document.addEventListener("touchstart", function() {
  screenPressed = true;
}, { capture: true, passive: true });
document.addEventListener("touchend", function() {
  screenPressed = false;
}, { capture: true, passive: true });
let primaryButtonDown = false;
function mouseDown() {
  return primaryButtonDown || screenPressed;
}
function setPrimaryButtonState(event) {
  let flags = event.buttons !== undefined ? event.buttons : event.which;
  primaryButtonDown = (flags & 1) === 1;
}
document.addEventListener("mousedown", setPrimaryButtonState, { capture: true, passive: true });
document.addEventListener("mousemove", setPrimaryButtonState, { capture: true, passive: true });
document.addEventListener("mouseup", setPrimaryButtonState, { capture: true, passive: true });

let tempListeners = {};
function addTempListener(listen) {
  let listenID = randomString(10) + Date.now();
  tempListeners[listenID] = listen;
  return listenID;
}
function tempListen(parent, listen, runFunc, extra) {
  parent.addEventListener(listen, runFunc, extra);
  addTempListener({ type: "event", parent: parent, name: listen, listener: runFunc });
}
function removeTempListeners() {
  let listenKeys = Object.keys(tempListeners);
  for (let i = 0; i < listenKeys.length; i++) {
    let remID = listenKeys[i];
    let remEvent = tempListeners[remID];
    if (remEvent.type == "event") {
      if (remEvent.parent != null) {
        remEvent.parent.removeEventListener(remEvent.name, remEvent.listener);
      }
    } else if (remEvent.type == "interval") {
      clearInterval(remEvent.interval);
    } else if (remEvent.type == "animation") {
      cancelAnimationFrame(remEvent.frame);
    } else if (remEvent.type == "pdf") {
      remEvent.document.destroy();
    }
    delete tempListeners[remID];
  }
}
async function findModule(element) {
  let content = element.closest(".content[moduleid]");
  if (content == null) {
    return;
  }
  return (tempListeners[content.getAttribute("moduleid")] ?? {}).module;
}

function subscribe(filter, callback, config) {
  /*
  for (let i = 0; i < socket.operations.length; i++) {
    if (socket.operations[i][2] == callback) {
      return;
    }
  }
  */
  let sub = socket.subscribe(filter, callback, config);
  subscribes.push(sub);
  return sub;
}

//let currentlyLoadingModules = {};
function addCSS(newRules) {
  let ruleKeys = Object.keys(newRules);
  for (let i = 0; i < ruleKeys.length; i++) {
    stylesheet.insertRule(ruleKeys[i] + "{" + newRules[ruleKeys[i]] + "}", stylesheet.cssRules.length);
  }
}
async function getModule(path) {
  if (modules[path] == null) {
    /*if (currentlyLoadingModules[path] != null) {
      return;
    }
    currentlyLoadingModules[path] = "";*/
    await loadScript("./modules/" + path + ".js");
    //delete currentlyLoadingModules[path];
  }
  return modules[path];
}
let loadedModules = {};
let staticModules = {};
async function loadModule(path, parent) {
  let moduleTemplate = await getModule(path);
  if (moduleTemplate == null) {
    return;
  }
  if (staticModules[path] != null) {
    return staticModules[path];
  }
  //let module = new moduleTemplate;
  let module = moduleTemplate;
  if (typeof moduleTemplate == "function") {
    module = new moduleTemplate;
  }
  module.loadModule = async function (path) {
    return loadModule(path, this);
  }
  if (parent != null) {
    module.parent = parent;
  }
  if (module.static == true) {
    staticModules[path] = module;
  }
  if (loadedModules[path] == null) {
    loadedModules[path] = true;
    if (module.css != null) {
      addCSS(module.css);
    }
  }
  return module;
}
let currentlyLoadingFrames = {};
async function setFrame(path, frame, extra, parent) {
  let frameSet = frame ?? app;
  extra = extra ?? {};
  if (currentlyLoadingFrames[frameSet.className] == "" && extra.override != true) {
    await loadModule(path, parent);
  }
  currentlyLoadingFrames[frameSet.className] = "";
  let loadingPlacement = frameSet.closest(".dropdown") ?? frameSet.closest(".modal") ?? frameSet;
  let oldContent = frameSet.querySelectorAll(".content:not([old])");
  for (let i = 0; i < oldContent.length; i++) {
    let remContent = oldContent[i];
    if (remContent.parentElement != frameSet) {
      continue;
    }
    (async function () {
      remContent.setAttribute("old", "");
      remContent.style.zIndex = 0;
      await sleep(500);
      remContent.remove();
    })();
  }
  if (modules[path] == null || frameSet == app || (frameSet.closest(".dropdown") == null && frameSet.closest(".modal") == null)) {
    if (loadingPlacement.querySelector(".loading:not([done])") == null) {
      if (frameSet.closest(".dropdown") == null && frameSet.closest(".modal") == null && oldContent.length > 0) {
        for (let i = 0; i < oldContent.length; i++) {
          let remContent = oldContent[i];
          if (remContent.parentElement != frameSet) {
            continue;
          }
          remContent.style.opacity = 0;
          remContent.style.left = "0px";
          remContent.style.top = "0px";
          remContent.style.position = "absolute";
        }
        //frameSet.innerHTML = "";
      }
      loadingPlacement.insertAdjacentHTML("beforeend", loadingAnim);
      if (frameSet == app) {
        loadingPlacement.querySelector(".loading[new]").setAttribute("appload", "");
      } else if (app.querySelector(".loading[appload]") && frameSet.closest(".dropdown") == null && frameSet.closest(".modal") == null) {
        loadingPlacement.querySelector(".loading[new]").style.opacity = 0;
      }
    }
  } else if (oldContent) {
    for (let i = 0; i < oldContent.length; i++) {
      if (oldContent[i].parentElement != frameSet) {
        continue;
      }
      oldContent[i].style.opacity = 0;
    }
    //frameSet.innerHTML = "";
  }
  let loading = loadingPlacement.querySelector(".loading[new]");
  if (loading) {
    loading.removeAttribute("new");
    if (frameSet == app) {
      loading.style.position = "fixed";
      let svgHolder = loading.querySelector(".loadingSvgHolder");
      svgHolder.style.width = "100vw";
      svgHolder.style.height = "100vh";
    } else {
      loading.querySelector(".loadsvg").style.maxWidth = "75px";
    }
  }
  let module = await loadModule(path, parent);
  if (module == null) {
    frameSet.style.display = "flex";
    frameSet.style.justifyContent = "center";
    frameSet.style.alignItems = "center";
    frameSet.innerHTML = `<span style="max-width: 216px; color: var(--error)">Failed to load module, please try again later.</span>`;
    delete currentlyLoadingFrames[frameSet.className];
    if (loading) {
      loading.remove();
    }
    return;
  }
  if (extra.content != null) {
    if (module.maxHeight != null) {
      extra.content.setAttribute("maxheight", module.maxHeight);
    }
  }
  let continueLoading = true;
  if (frameSet == app) {
    extra.from = currentPage;
    window.location.hash = "#" + path.substring(path.lastIndexOf("/") + 1);
  }
  if (module.preJs) {
    continueLoading = (await (module.preJs())) != false;
  }
  if (loading && frameSet == app) {
    let svgHolder = loading.querySelector(".loadingSvgHolder");
    svgHolder.style.width = "max(" + svgHolder.clientWidth + "px, 100%)";
    svgHolder.style.height = svgHolder.clientHeight + "px";
  }
  if (continueLoading) {
    module.setFrame = async function (path, frame, extra) {
      return setFrame(path, frame, extra, this);
    }
    frameSet.insertAdjacentHTML("beforeend", `<div class="content" style="opacity: 0; transition: all .5s, max-height 0s" new>${module.html}</div>`);
    let frameContent = frameSet.querySelector(".content[new]");
    frameContent.removeAttribute("new");
    if (frameSet == app) {
      frameContent.style.display = "none";
      //frameContent.style.position = "absolute";
      (await loadModule("dropdown")).close();
      frameContent.style.width = "100%";
      removeTempListeners();
      for (let i = 0; i < subscribes.length; i++) {
        subscribes[i].close();
      }
      subscribes = [];
      window.scrollTo(0, 0);
      body.style.removeProperty("user-select");
      currentPage = path;
      document.title = module.title + " | Markify";
    }
    //frameSet.setAttribute("loaded", "");
    await module.js(frameContent, extra);
    if (frameContent.style.display == "none") {
      frameContent.style.removeProperty("display");
    }
    frameContent.offsetHeight;
    frameContent.style.opacity = 1;
  }
  if (loading) {
    loading.setAttribute("done", "");
    (async function () {
      loading.style.pointerEvents = "none";
      loading.style.opacity = 0;
      await sleep(500);
      loading.remove();
      if (frameSet == app) {
        let revealLoading = frameSet.querySelectorAll(".loading:not([done])");
        for (let i = 0; i < revealLoading.length; i++) {
          revealLoading[i].style.opacity = 1;
        }
      }
    })();
  }
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
  return new Promise((resolve) => setTimeout(resolve, ms ?? 1));
}

function getScript(url) {
  return document.querySelector("[src='" + url + "'");
}
function loadScript(url) {
  return new Promise(function (resolve) {
    let loaded = getScript(url + "?v=" + version);
    if (loaded != null) {
      if (loaded.hasAttribute("loaded")) {
        resolve(loaded);
      } else {
        loaded.addEventListener("load", function () {
          resolve(loaded);
        });
        loaded.addEventListener("error", function () {
          resolve();
        });
      }
    } else {
      let newScript = document.createElement("script");
      if (url.endsWith(".mjs") == true) {
        newScript.setAttribute("type", "module");
      }
      newScript.addEventListener("load", function () {
        newScript.setAttribute("loaded", "");
        resolve(newScript);
      });
      newScript.addEventListener("error", function () {
        newScript.remove();
        resolve();
      });
      newScript.src = url + "?v=" + version;
      document.body.appendChild(newScript);
    }
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
  } else if (getParam(key)) {
    Url.searchParams.delete(key);
  }
  window.history.pushState({}, "", Url);
}

function getObject(arr, field) {
  if (arr == null) {
    return {};
  }
  let returnObj = {};
  for (let i = 0; i < arr.length; i++) {
    let setObject = arr[i];
    returnObj[setObject[field]] = setObject;
  }
  return returnObj;
}

function clientPosition(event, type) {
  switch (type) {
    case "x":
      return Math.floor(event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0);
    case "y":
      return Math.floor(event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0);
  }
}

function cleanString(str) {
  return str.replace(/\>/g, "&#62;").replace(/\</g, "&#60;");
}

function isValidURL(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

function timeSince(time, long) {
  let calcTimestamp = Math.floor((Date.now() - time) / 1000);
  if (calcTimestamp < 1) {
    calcTimestamp = 1;
  }
  let amountDivide = 1;
  let end = (long ? 'Second' : 's');
  if (calcTimestamp > 31536000 - 1) {
    amountDivide = 31536000;
    end = (long ? 'Year' : 'y');
  } else if (calcTimestamp > 2592000 - 1) {
    amountDivide = 2592000;
    end = (long ? 'Month' : 'mo');
  } else if (calcTimestamp > 604800 - 1) {
    amountDivide = 604800;
    end = (long ? 'Week' : 'w');
  } else if (calcTimestamp > 86400 - 1) {
    amountDivide = 86400;
    end = (long ? 'Day' : 'd');
  } else if (calcTimestamp > 3600 - 1) {
    amountDivide = 3600;
    end = (long ? 'Hour' : 'h');
  } else if (calcTimestamp > 60 - 1) {
    amountDivide = 60;
    end = (long ? 'Minute' : 'm');
  }
  let timeToSet = Math.floor(calcTimestamp / amountDivide);
  if (timeToSet > 1 && long) {
    end += 's';
  }
  if (long == true) {
    return timeToSet + " " + end + " Ago";
  } else {
    return timeToSet + end;
  }
}
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
function formatFullDate(time) {
  let date = new Date(time + epochOffset);
  let splitDate = date.toLocaleDateString().split("/");
  return week[date.getDay()] + ", " + months[splitDate[0] - 1] + " " + splitDate[1] + ", " + splitDate[2] + " at " + formatAMPM(date);
}

function addS(num) {
  if (num > 1) {
    return "s";
  }
  return "";
}

function copyClipboardText(text, type) {
  navigator.clipboard.writeText(text).then(async () => {
    (await loadModule("alert")).open("worked", `<b>Copied</b>The ${type ?? "text"} was copied to your clipboard.`);
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
function clipBoardRead(event) {
  event.preventDefault();
  document.execCommand('inserttext', false, event.clipboardData.getData("text/plain"));
}

function inViewport(element, onlyHeight) {
  if (element == null) {
    return false;
  }
  let rect = element.getBoundingClientRect();
  let viewportWidth = window.innerWidth ?? document.documentElement.clientWidth;
  let viewportHeight = window.innerHeight ?? document.documentElement.clientHeight;

  if (onlyHeight != true) {
    return (
      rect.right >= 0 &&
      rect.left <= viewportWidth &&
      rect.bottom >= 0 &&
      rect.top <= viewportHeight
    );
  } else {
    return (
      rect.bottom >= 0 &&
      rect.top <= viewportHeight
    );
  }
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
function promptLogin(page, service) {
  if (window.promptLoginActivate == true) {
    return;
  }
  window.promptLoginActivate = true;
  let randomStr = randomString(20);
  setLocalStore("state", randomStr);
  modifyParams("state");
  modifyParams("code");
  let redirectURL = new URL(window.location.href);
  if (page != null) {
    redirectURL.hash = "#" + page;
  }
  let endpoint = "https://exotek.co/login?client_id=631056064efd34591c5a8e05&redirect_uri=" +
  encodeURIComponent(redirectURL) +
  "&response_type=code&scope=userinfo&state=" +
  randomStr;
  if (service != null) {
    modifyParams("state", randomStr);
    endpoint = authEndpoints()[service] ?? endpoint;
  }
  window.location = endpoint;
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
  let sendUserID = userID ?? getLocalStore("userID");
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
    let refreshData = await refreshToken.json();
    setLocalStore("token", JSON.stringify(refreshData.token));
    //account.realtime = refreshData.realtime;
    return refreshData.token;
  } else {
    removeLocalStore("userID");
    removeLocalStore("token");
    promptLogin();
  }
}
async function sendRequest(method, path, body, extra) {
  if (connected == false) {
    return [0, "Not Connected", { took: 0 }];
  }
  let response;
  let reqTime;
  try {
    let sendData = {
      method: method,
      headers: {
        cache: "no-cache"
      }
    };
    extra = extra ?? {};
    if (extra.noFileType != true) {
      sendData.headers["Content-Type"] = "text/plain";
    }
    if (extra.session) {
      sendData.headers.session = extra.session;
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
        token = (await renewToken()) ?? token;
      }
      let sendUserID = userID ?? getLocalStore("userID");
      if (sendUserID != null) {
        sendData.headers.auth = sendUserID + ";" + token.session;
      }
    }
    let reqTimeStart = getEpoch();
    response = await fetch(serverURL + path, sendData);
    if (response.status == null) {
      return [0, "Fetch Error", { took: reqTime }];
    }
    reqTime = getEpoch() - reqTimeStart;
    let serverTimeMillisGMT = new Date(response.headers.get("Date")).getTime();
    let localMillisUTC = new Date().getTime();
    epochOffset = serverTimeMillisGMT - localMillisUTC;
    switch (response.status) {
      case 401:
        await renewToken();
        break;
      case 304:
        return [response.status, null, { took: reqTime }];
      default:
        let body = await response.json();
        if ((extra.allowError ?? []).includes(response.status) == false) {
          if (body.errors && body.errors.length > 0) {
            for (let i = 0; i < body.errors.length; i++) {
              let message = body.errors[i];
              if (message.includes("<b>") == false) {
                message = "<b>Oops! Something Broke</b>" + message;
              }
              (await loadModule("alert")).open("error", message);
            }
          }
          if (body.warnings && body.warnings.length > 0) {
            for (let i = 0; i < body.warnings.length; i++) {
              (await loadModule("alert")).open("warning", body.warnings[i]);
            }
          }
        }
        return [response.status, body, { took: reqTime }];
    }
  } catch (err) {
    console.log("FETCH ERROR: " + err);
    if (response == null ?? response.status == null) {
      /*
      if (connected == true) {
        socket.onclose(); // Set to disable connection
      }
      */
      return [0, "Fetch Error", { took: reqTime }];
    }
    if (path == "me") { // Show error connecting
      setFrame = function () { }
      app.style.display = "flex";
      app.style.flexDirection = "column";
      app.style.alignItems = "center";
      app.style.justifyContent = "center";
      app.innerHTML = `<div style="max-width: 300px; color: var(--error)">Failed to connect to server, please try again later.</div><button style="margin-top: 18px; font-size: 18px; text-decoration: underline" onclick="location.reload()">Retry</button>`;
    } else {
      //(await loadModule("alert")).open("error", "<b>Whoops! Something Unexpected Happened</b>Please try again later...");
    }
    return [0, "Fetch Error", { took: reqTime }];
  }
}

function objectUpdate(obj, passData, path) { // obj = Object to apply changes; passData = Object to edit
  path = path ?? "";
  if (path.length > 0) {
    path += ".";
  }
  let keys = Object.keys(obj);
  let changes = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (
      typeof obj[key] !== "object" ||
      Array.isArray(obj[key]) === true ||
      obj[key] === null
    ) {
      let checkValue = passData[key];
      if (Array.isArray(checkValue)) {
        checkValue = JSON.stringify(checkValue);
      }
      let setValue = obj[key];
      let checkNewValue = obj[key];
      if (Array.isArray(checkNewValue)) {
        checkNewValue = JSON.stringify(checkNewValue);
      }
      if (checkValue != checkNewValue) {
        passData[key] = setValue;
        changes[path + key] = passData[key];
      }
    } else {
      /*
      if (passData[key] != passData[key] ?? {}) {
        passData[key] = passData[key] ?? {};
        changes[path + key] = passData[key];
      }
      */
      passData[key] = passData[key] ?? {};
      changes = { ...changes, ...objectUpdate(obj[key], passData[key] ?? {}, path + key) };
    }
  }
  return changes;
}

async function updateToSignedIn(data) {
  account = data;
  userID = account.id;
}
async function auth() {
  let url = "me?ss=" + socket.secureID;
  if (getParam("from") != null) {
    url += "&from=" + getParam("from");
    modifyParams("from");
  }
  let [code, body] = await sendRequest("GET", url);
  if (code == 0) {
    await sleep(500);
    auth();
    return;
  }
  if (code != 200) {
    return;
  }
  updateToSignedIn(body);
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
    let sendBody = {
      code: paramAuthCode,
      page: window.location.hash.substring(1)
    };
    if (getParam("from") != null) {
      sendBody.from = getParam("from");
      modifyParams("from");
    }
    let [code, body] = await sendRequest("POST", "auth?ss=" + socket.secureID, sendBody);
    modifyParams("code");
    if (code === 200) {
      setLocalStore("userID", body.user.id);
      setLocalStore("token", JSON.stringify(body.token));
      updateToSignedIn(body.user);
    }
  } else if (getLocalStore("token") != null) {
    await auth();
  } else if (getParam("user") != null && getParam("token") != null) {
    setLocalStore("userID", getParam("user"));
    setLocalStore("token", decodeURIComponent(getParam("token")));
    modifyParams("user");
    modifyParams("token");
    await auth();
  }
}

// OAUTH REDIRECT:
let endStartup = false;
let authService = getParam("auth");
let authEndpoints = () => {
  return {
    classlink: "https://launchpad.classlink.com/oauth2/v2/auth?scope=full,profile,openid&redirect_uri=https%3A%2F%2Fexotek.co%2Flogin%3Fclient_id%3D631056064efd34591c5a8e05%26redirect_uri%3D" + encodeURIComponent(encodeURIComponent(window.location.href)) + "%26response_type%3Dcode%26scope%3Duserinfo%26method%3Dclasslink&client_id=c1693431815669c9e8fa52973e526ee4da0d1a1141cc&response_type=code"
  }
}
if (authService != null) {
  if (self === top) { 
    modifyParams("auth");
    let randomStr = randomString(20);
    setLocalStore("state", randomStr);
    modifyParams("state", randomStr);
    let endpoints = authEndpoints();
    if (endpoints[authService] != null) {
      endStartup = true;
      window.location = endpoints[authService];
    }
  } else {
    app.insertAdjacentHTML("beforeend", `<div style="padding: 16px">Open this webpage in a new window for authentication.</div>`);
    throw new Error("IFrames are disabled for secure windows.");
  }
}

let wasConnected = false;
let connected = false;
let preloadedFiles = false;
let closeCallback;
async function initSocket() {
  if (typeof SimpleSocket == "undefined") { // Backup if static fails
    await loadScript("https://simplesocket.net/static/v2/simplesocket.js");
  }
  socket = new SimpleSocket({
    project_id: "62088fbdfc22489578e94822",
    project_token: "client_129dbf2cf03edc6fba2aac135fd5ae119af",
    socket_url: window.socketURL
  });
  socket.remotes.account = function (data) {
    console.log(data);
    if (data.task === "set") {
      objectUpdate(data.data, account);
  
      let updateElements = body.querySelectorAll("[accountuser], [accountimage]");
      for (let i = 0; i < updateElements.length; i++) {
        let elem = updateElements[i];
        if (elem.hasAttribute("accountuser")) {
          elem.textContent = account.user;
        }
        if (elem.hasAttribute("accountimage")) {
          elem.src = account.image ?? "./images/profiles/default.svg";
        }
      }
    } else if (data.task == "logout") {
      removeLocalStore("userID");
      removeLocalStore("token");
      promptLogin();
    }
  }
  socket.onopen = async function () {
    connected = true;
    if (endStartup == true) {
      return;
    }
    (await loadModule("dropdown")).close();
    await init();
    if (window.location.hash == "") {
      setFrame("pages/launch", null, { unsub: false });
    } else {
      setFrame("pages/" + window.location.hash.substring(1), null, { unsub: false });
    }
    if (wasConnected == true) {
      (await loadModule("alert")).open("worked", `<b>Connected</b>Reconnected to Markify`, { id: "connection" });
    }
    wasConnected = true;
  };
  socket.onclose = async function () {
    connected = false;
    if (closeCallback) {
      closeCallback();
    }
    (await loadModule("alert")).open("warning", `<b>Lost Connection</b>Lost connection to Markify. Reconnecting...`, { id: "connection", time: "never" });
  };
}
initSocket();

// STANDARD MODULES //

modules["dropdown"] = class {
  static = true;
  css = {
    ".dropdown": `position: sticky; box-sizing: border-box; max-width: calc(100% - 16px); max-height: calc(100% - 16px); right: 0px; bottom: 0px; margin: 8px; opacity: 0; box-shadow: var(--shadow); border-radius: 12px; transform-origin: center top; pointer-events: all`,
    ".dropdown .loading": `pointer-events: none`,
    ".dropdownOverflow": `position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--pageColor); border-radius: inherit; z-index: 0`,
    ".dropdownContent": `position: absolute; box-sizing: border-box; width: max-content; max-width: var(--dropdownWidth); height: max-content; padding: 6px; overflow: auto`, //background: var(--pageColor)
    ".dropdownFrame": `position: relative`,
    ".dropdownHeader": `position: relative; display: flex; gap: 6px; padding: 6px 6px 0 6px; justify-content: space-between; transition: .4s; z-index: 2`,
    ".dropdownHeader button": `position: relative; width: 22px; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 14px`,
    ".dropdownHeader button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dropdownTitle": `box-sizing: border-box; display: flex; padding: 3px; flex: 1; max-width: fit-content; justify-content: center; align-items: center; white-space: nowrap; overflow: hidden; font-size: 18px; font-weight: 500`,
    ".dropdownTitle div": `flex: 1; margin: 0 4px; white-space: nowrap; overflow: hidden`,
    ".dropdownTitle img": `width: 26px; height: 26px; object-fit: cover; border-radius: 13px`
  };
  setResizeLoop = function (dropdown, content, header, button) {
    return setInterval(async () => {
      if (content.hasAttribute("loaded") == false) {
        return;
      }
      
      content.style.top = header.offsetHeight + "px";
      // We use fixed, not window, so that scrollbars are accounted for:
      content.style.setProperty("--dropdownWidth", (fixed.clientWidth - 16) + "px");
      let maxHeight = fixed.clientHeight - header.offsetHeight - 16;
      if (content.hasAttribute("maxheight") == true) {
        maxHeight = Math.min(maxHeight, parseInt(content.getAttribute("maxheight")));
      }
      content.style.maxHeight = maxHeight + "px";
      content.style.minWidth = Math.min(fixed.clientWidth - 16, 200) + "px";
      
      if (dropdown.hasAttribute("closing") == false) {
        //if (content.querySelector(".dropdownFrame").hasAttribute("loaded")) {
        if (content.offsetWidth > 0 && content.offsetHeight > 0) {
          dropdown.style.width = content.offsetWidth + "px";
          dropdown.style.height = content.offsetHeight + header.offsetHeight + "px";
        }
      } else {
        dropdown.style.width = button.offsetWidth + "px";
        dropdown.style.height = button.offsetHeight + "px";
      }

      if (button != null && button.offsetParent != null) {
        let buttonRect = button.getBoundingClientRect();
        //if (buttonRect.top > 0) {
        dropdown.style.top = buttonRect.top + "px";
        //}
        let addButtonWidth = button.offsetWidth / 2;
        let pageHolder = button.closest(".ePageHolder");
        if (pageHolder != null) {
          addButtonWidth *= parseFloat(pageHolder.getAttribute("zoom"));
        }
        dropdown.style.left = buttonRect.left + addButtonWidth - (dropdown.offsetWidth / 2) + "px";
      } else {
        this.close();
      }
    }, 1);
  };
  open = async function (button, frameName) {
    let loaded = modules[frameName] != null;
    if (window.dropdown && button.closest(".dropdown")) { // Clicked inside the dropdown
      let dropdown = window.dropdown.dropdown;
      let header = dropdown.querySelector(".dropdownHeader");
      let oldContent = dropdown.querySelector(".dropdownContent:not([old])");
      oldContent.setAttribute("old", "");
      dropdown.querySelector(".dropdownOverflow").insertAdjacentHTML("beforeend", `<div class="dropdownContent" new><div class="dropdownFrame"></div></div>`);
      let content = dropdown.querySelector(".dropdownContent[new]");
      content.removeAttribute("new");
      window.dropdown.content = content;
      let frame = content.querySelector(".dropdownFrame");
      let setTitleHTML = button.getAttribute("dropdowntitle") ?? button.innerHTML;
      if (button.closest(".dropdownBack") == null) {
        if (button.innerHTML == button.textContent) {
          setTitleHTML = "<div>" + button.innerHTML + "</div>";
        }

        oldContent.style.removeProperty("right");
        oldContent.style.left = "0%";
        content.style.left = (dropdown.offsetWidth / 2) + "px";
      } else {
        window.dropdown.frameHistory.pop();
        setTitleHTML = window.dropdown.frameHistory.pop()[1];

        oldContent.style.removeProperty("left");
        oldContent.style.right = "0%";
        content.style.right = (dropdown.offsetWidth / 2) + "px";
      }
      header.querySelector(".dropdownTitle").innerHTML = setTitleHTML;
      let back = header.querySelector(".dropdownBack");
      if (window.dropdown.frameHistory.length > 0) {
        let prev = window.dropdown.frameHistory[window.dropdown.frameHistory.length - 1];
        back.setAttribute("dropdown", prev[0]);
        //back.setAttribute("rememberid", prev[2]);
        back.style.display = "flex";
      } else {
        back.style.display = "none";
      }
      window.dropdown.frameHistory.push([frameName, setTitleHTML]);
      content.style.opacity = 0;
      //content.style.transform = "scale(.85)";
      content.style.zIndex = 1;
      content.style.pointerEvents = "none";
      content.style.transition = ".4s left, .4s right, .5s opacity";
      content.offsetHeight;
      //content.style.transform = "scale(1)";
      if (loaded == false) {
        frame.style.minHeight = "200px";
      }
      oldContent.style.zIndex = 0;
      oldContent.style.pointerEvents = "none";
      oldContent.style.transition = ".4s";
      oldContent.offsetHeight;
      if (button.closest(".dropdownBack") == null) {
        oldContent.style.left = (dropdown.offsetWidth / -2) + "px";;
        content.style.left = "0%";
      } else {
        oldContent.style.right = (dropdown.offsetWidth / -2) + "px";;
        content.style.right = "0%";
      }
      oldContent.style.opacity = 0;
      //oldContent.style.transform = "scale(.85)";
      clearInterval(window.dropdown.interval);
      window.dropdown.interval = this.setResizeLoop(dropdown, content, header, window.dropdown.button);
      content.style.pointerEvents = "none";
      await setFrame(frameName, frame, { content: content, button: button, origin: window.dropdown.button });
      content.setAttribute("loaded", "");
      content.style.pointerEvents = "all";
      content.style.opacity = 1;
      frame.style.removeProperty("min-height");
      await sleep(500);
      oldContent.remove();
      content.style.removeProperty("transition");
      let titleDiv = header.querySelector(".dropdownTitle div");
      if (titleDiv != null) {
        titleDiv.style.textOverflow = "ellipsis";
      }
      content.style.pointerEvents = "all";
      //await sleep(100);
      //content.style.overflow = "auto";
      return;
    }
    this.close();
    fixed.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
      <div class="dropdown" new>
        <div class="dropdownOverflow">
          <div class="dropdownHeader">
            <button class="dropdownBack buttonAnim border" style="display: none"><img src="./images/tooltips/back.svg"></button>
            <div class="dropdownTitle"></div>
            <button class="dropdownClose buttonAnim border" close><img src="./images/tooltips/close.svg"></button>
          </div>
          <div class="dropdownContent">
            <div class="dropdownFrame"></div>
          </div>
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
    if (loaded == false) {
      frame.style.minHeight = "200px";
    }
    let existingTitle = button.getAttribute("dropdowntitle");
    let setTitleHTML = existingTitle ?? button.innerHTML;
    if (button.innerHTML == button.textContent && existingTitle == null) {
      setTitleHTML = "<div>" + button.innerHTML + "</div>";
    }
    header.querySelector(".dropdownTitle").innerHTML = setTitleHTML;
    dropdown.style.transition = "width .4s, height .4s, opacity .3s, border-radius .3s, transform .6s";
    dropdown.offsetHeight;
    window.dropdown = { dropdown: dropdown, button: button, frameHistory: [[frameName, setTitleHTML]], interval: this.setResizeLoop(dropdown, content, header, button) };
    button.style.opacity = 0;
    dropdown.style.opacity = 1;
    content.style.pointerEvents = "none";
    content.setAttribute("loaded", "");
    await setFrame(frameName, frame, { content: content, button: button, origin: button });
    content.style.pointerEvents = "all";
    frame.style.removeProperty("min-height");
    await sleep(300);
    let dropTitle = header.querySelector(".dropdownTitle div");
    if (dropTitle) {
      dropTitle.style.textOverflow = "ellipsis";
    }
    //await sleep(200);
    //content.style.overflow = "auto";
  };
  close = async function () {
    if (window.dropdown == null) {
      return;
    }
    if (window.closeDropdown != null) {
      window.closeDropdown();
    }
    let remDropdown = window.dropdown;
    delete window.dropdown;
    remDropdown.button.style.removeProperty("opacity");
    //remDropdown.dropdown.setAttribute("closing", "");
    remDropdown.dropdown.style.opacity = 0;
    if (remDropdown.button.style.display != "none" && remDropdown.button.offsetParent != null) {
      let buttonRect = remDropdown.button.getBoundingClientRect();
      let dropdownRect = remDropdown.dropdown.getBoundingClientRect();
      let addButtonWidth = remDropdown.button.offsetWidth / 2;
      let pageHolder = remDropdown.button.closest(".ePageHolder");
      if (pageHolder != null) {
        addButtonWidth *= parseFloat(pageHolder.getAttribute("zoom"));
      }
      remDropdown.dropdown.style.transformOrigin = (buttonRect.left - dropdownRect.left + addButtonWidth) + "px " + (buttonRect.top - dropdownRect.top + (remDropdown.button.offsetHeight / 2)) + "px";
    }
    remDropdown.dropdown.style.transform = "scale(0)";
    //remDropdown.dropdown.querySelector(".dropdownHeader").style.transform = "scale(0)";
    await sleep(350);
    clearInterval(remDropdown.interval);
    remDropdown.dropdown.parentElement.remove();
  }
}

modules["modal"] = class {
  static = true;
  css = {
    ".modal": `position: absolute; box-sizing: border-box; max-width: calc(100% - 16px); max-height: calc(100% - 16px); left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: 0; box-shadow: var(--shadow); border-radius: 12px; transform-origin: center top; pointer-events: all`,
    ".modal .loading": `pointer-events: none`,
    ".modalOverflow": `position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--pageColor); border-radius: inherit; z-index: 0`,
    ".modalContent": `position: absolute; box-sizing: border-box; width: max-content; height: max-content; padding: 6px; overflow: auto`, //background: var(--pageColor)
    ".modalFrame": `position: relative`,
    ".modalHeader": `position: relative; display: flex; gap: 6px; padding: 6px 6px 0 6px; justify-content: space-between; transition: .4s; z-index: 2`,
    ".modalHeader button": `position: relative; width: 22px; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 14px`,
    ".modalHeader button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".modalTitle": `box-sizing: border-box; display: flex; padding: 3px; flex: 1; max-width: fit-content; justify-content: center; align-items: center; white-space: nowrap; overflow: hidden; font-size: 18px; font-weight: 500`,
    ".modalTitle div": `flex: 1; margin: 0 4px; white-space: nowrap; overflow: hidden`,
    ".modalTitle img": `width: 26px; height: 26px; object-fit: cover; border-radius: 13px`
  };
  setResizeLoop = function (modal, content, header) {
    return setInterval(() => {
      if (content.hasAttribute("loaded") == false) {
        return;
      }

      content.style.top = header.offsetHeight + "px";
      // We use fixed, not window, so that scrollbars are accounted for:
      content.style.maxWidth = fixed.clientWidth - 16 + "px";
      let maxHeight = fixed.clientHeight - header.offsetHeight - 16;
      if (content.hasAttribute("maxheight") == true) {
        maxHeight = Math.min(maxHeight, parseInt(content.getAttribute("maxheight")));
      }
      content.style.maxHeight = maxHeight + "px";
      content.style.minWidth = Math.min(fixed.clientWidth - 16, 200) + "px";

      if (modal.hasAttribute("closing") == false) {
        //if (content.querySelector(".modalFrame").hasAttribute("loaded")) {
        if (content.offsetWidth > 0 && content.offsetHeight > 0) {
          modal.style.width = content.offsetWidth + "px";
          modal.style.height = content.offsetHeight + header.offsetHeight + "px";
        }
      }
    }, 1);
  };
  open = async function (frameName, button, title, stack) {
    title = title ?? "";
    let loaded = modules[frameName] != null;
    if (window.modal) { // Clicked inside the modal
      let modal = window.modal.modal;
      let header = modal.querySelector(".modalHeader");
      let oldContent = modal.querySelector(".modalContent:not([old])");
      oldContent.setAttribute("old", "");
      modal.querySelector(".modalOverflow").insertAdjacentHTML("beforeend", `<div class="modalContent" new><div class="modalFrame"></div></div>`);
      let content = modal.querySelector(".modalContent[new]");
      content.removeAttribute("new");
      window.modal.content = content;
      let frame = content.querySelector(".modalFrame");
      if (button != null && title == "") {
        if (button.hasAttribute("modaltitle") == true) {
          title = button.getAttribute("modaltitle");
        } else {
          title = button.innerHTML;
        }
      }
      if (button == null || button.closest(".modalBack") == null) {
        if (button != null && button.innerHTML == button.textContent && title == "") {
          title = "<div>" + button.innerHTML + "</div>";
        }

        oldContent.style.removeProperty("right");
        oldContent.style.left = "0%";
        content.style.left = (modal.offsetWidth / 1) + "px";
      } else {
        window.modal.frameHistory.pop();
        title = window.modal.frameHistory.pop()[1];

        oldContent.style.removeProperty("left");
        oldContent.style.right = "0%";
        content.style.right = (modal.offsetWidth / 1) + "px";
      }
      header.querySelector(".modalTitle").innerHTML = title;
      let back = header.querySelector(".modalBack");
      if (window.modal.frameHistory.length > 0 && stack != false) {
        back.setAttribute("modal", window.modal.frameHistory[window.modal.frameHistory.length - 1][0]);
        back.style.display = "flex";
      } else {
        back.style.display = "none";
      }
      if (stack != false) {
        window.modal.frameHistory.push([frameName, title]);
      } else {
        window.modal.frameHistory = [[frameName, title]];
      }
      content.style.opacity = 0;
      //content.style.transform = "scale(.85)";
      content.style.zIndex = 1;
      content.style.pointerEvents = "none";
      content.style.transition = ".4s left, .4s right, .5s opacity, transform .6s";
      content.offsetHeight;
      //content.style.transform = "scale(1)";
      if (loaded == false) {
        frame.style.minHeight = "200px";
      }
      oldContent.style.zIndex = 0;
      oldContent.style.pointerEvents = "none";
      oldContent.style.transition = ".4s";
      oldContent.offsetHeight;
      if (button == null || button.closest(".modalBack") == null) {
        oldContent.style.left = (modal.offsetWidth / -1) + "px";;
        content.style.left = "0%";
      } else {
        oldContent.style.right = (modal.offsetWidth / -1) + "px";;
        content.style.right = "0%";
      }
      oldContent.style.opacity = 0;
      //oldContent.style.transform = "scale(.85)";
      clearInterval(window.modal.interval);
      window.modal.interval = this.setResizeLoop(modal, content, header);
      content.style.pointerEvents = "none";
      await setFrame(frameName, frame, { content: content, button: button });
      content.setAttribute("loaded", "");
      content.style.pointerEvents = "all";
      content.style.opacity = 1;
      frame.style.removeProperty("min-height");
      await sleep(500);
      oldContent.remove();
      content.style.removeProperty("transition");
      let titleDiv = header.querySelector(".modalTitle div");
      if (titleDiv != null) {
        titleDiv.style.textOverflow = "ellipsis";
      }
      content.style.pointerEvents = "all";
      //await sleep(100);
      //content.style.overflow = "auto";
      return;
    }
    this.close();
    fixed.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
      <div class="modal" new>
        <div class="modalOverflow">
          <div class="modalHeader">
            <button class="modalBack buttonAnim border" style="display: none"><img src="./images/tooltips/back.svg"></button>
            <div class="modalTitle"></div>
            <button class="modalClose buttonAnim border" close><img src="./images/tooltips/close.svg"></button>
          </div>
          <div class="modalContent">
            <div class="modalFrame"></div>
          </div>
        </div>
      </div>
    </div>`);
    let modal = fixed.querySelector(".modal[new]");
    modal.removeAttribute("new");
    let header = modal.querySelector(".modalHeader");
    let content = modal.querySelector(".modalContent");
    let frame = content.querySelector(".modalFrame");
    if (loaded == false) {
      frame.style.minHeight = "200px";
    }
    if (button != null && title == "") {
      if (button.hasAttribute("modaltitle") == true) {
        title = button.getAttribute("modaltitle");
      } else {
        title = "<div>" + button.innerHTML + "</div>";
      }
    }
    header.querySelector(".modalTitle").innerHTML = title;
    modal.style.transition = "width .4s, height .4s, opacity .3s, border-radius .3s, transform .6s";
    modal.offsetHeight;
    modal.style.width = content.offsetWidth + "px";
    modal.style.height = content.offsetHeight + header.offsetHeight + "px";
    window.modal = { modal: modal, frameHistory: [[frameName, title]], interval: this.setResizeLoop(modal, content, header, button) };
    modal.style.opacity = 1;
    modal.parentElement.setAttribute("blur", "");
    content.style.pointerEvents = "none";
    content.setAttribute("loaded", "");
    await setFrame(frameName, frame, { content: content, button: button });
    content.style.pointerEvents = "all";
    frame.style.removeProperty("min-height");
    await sleep(300);
    let dropTitle = header.querySelector(".modalTitle div");
    if (dropTitle) {
      dropTitle.style.textOverflow = "ellipsis";
    }
    //await sleep(200);
    //content.style.overflow = "auto";
  };
  close = async function () {
    if (window.modal == null) {
      return;
    }
    if (window.closeModal != null) {
      window.closeModal();
    }
    let remModal = window.modal;
    delete window.modal;
    remModal.modal.setAttribute("closing", "");
    remModal.modal.style.opacity = 0;
    remModal.modal.parentElement.removeAttribute("blur");
    remModal.modal.style.transform = "translate(-50%, -50%) scale(0)";
    await sleep(350);
    clearInterval(remModal.interval);
    remModal.modal.parentElement.remove();
  }
}

body.addEventListener("click", async function (event) {
  let element = event.target;
  if (element == null) {
    return;
  }
  let alertClose = element.closest(".alertClose");
  if (alertClose) {
    (await loadModule("alert")).close(alertClose.parentElement);
    return;
  }

  let dropdown = element.closest("[dropdown]");
  if (dropdown) {
    (await loadModule("dropdown")).open(dropdown, dropdown.getAttribute("dropdown"));
  } else if (element.closest(".dropdown") == null || element.closest(".dropdown button[close]")) {
    (await loadModule("dropdown")).close();
  }
  let modal = element.closest("[modal]");
  if (modal) {
    (await loadModule("modal")).open(modal.getAttribute("modal"), modal);
  } else if (element.closest(".modal button[close]")) {
    (await loadModule("modal")).close();
  }
  let page = element.closest("[openpage]");
  if (page) {
    setFrame("pages/" + page.getAttribute("openpage"));
    event.preventDefault();
  }
});
window.addEventListener("scroll", async function () {
  if (window.dropdown && window.dropdown.button && window.dropdown.button.closest("[noscrollclose]") == null && window.dropdown.dropdown.querySelector(".content[noscrollclose]") == null) {
    (await loadModule("dropdown")).close();
  }
});

async function textBoxError(box, error) {
  (await loadModule("alert")).open("error", "<b>Invalid Input</b>" + error);
  if (box) {
    box.setAttribute("error", "");
    await sleep(200);
    box.removeAttribute("error");
  }
}

modules["alert"] = class {
  static = true;
  css = {
    ".alertHolder": `position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 600px; max-width: 100%; height: fit-content; margin: 58px 8px 8px 8px; align-items: center; z-index: 9999`,
    ".alert": `box-sizing: border-box; display: flex; max-width: 100%; transform: scale(0); opacity: 0; background: var(--pageColor); border-radius: 12px; box-shadow: var(--shadow); pointer-events: all; overflow: hidden`,
    ".alert img": `width: 32px; height: 32px; object-fit: cover; margin-right: 6px`,
    ".alertText": `display: flex; flex-wrap: wrap; flex: 1; align-items: center; text-align: left; font-size: 16px`,
    ".alertText b": `margin-right: 6px; color: var(--themeColor); font-size: 18px`,
    ".alertText div b": `margin-right: unset; color: unset; font-size: unset`,
    ".alertText i": `margin-left: 4px`,
    ".alertClose": `position: relative; width: 22px; height: 22px; margin: 5px 5px 5px 12px; --borderWidth: 3px; --borderRadius: 11px`,
    ".alertClose img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`
  };
  themes = {
    info: ["var(--theme)", 1],
    worked: ["var(--green)", 3],
    warning: ["var(--yellow", 2],
    error: ["var(--error)", 0]
  };
  open = async function (type, message, data) {
    data = data ?? {};
    if (fixed.querySelector(".alertHolder") == null) {
      fixed.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
        <div class="alertHolder"></div>
      </div>`);
    }
    let alertHolder = fixed.querySelector(".alertHolder");
    alertHolder.parentElement.style.display = "flex";
    alertHolder.parentElement.style.justifyContent = "center";
    alertHolder.insertAdjacentHTML("afterbegin", `<div class="alert" new>
      <img src="./images/tooltips/alerts.svg">
      <div class="alertText"></div>
      <button class="alertClose buttonAnim border"><img src="./images/tooltips/close.svg"></button>
    </div>`);
    let alert = fixed.querySelector(".alert[new]");
    alert.removeAttribute("new");
    (async () => {
      if (data.id) {
        (await loadModule("alert")).finished("connection");
        alert.setAttribute("alert", data.id + "_ALERT");
      }
      alert.style.setProperty("--themeColor", this.themes[type][0]);
      alert.querySelector("img").style.objectPosition = -this.themes[type][1]*32 + "px 0px";
      alert.querySelector(".alertText").innerHTML = message;
      alert.style.transition = "transform .25s var(--bounce), opacity .25s, padding .25s, margin .25s";
      alert.offsetHeight;
      alert.style.transform = "scale(1)";
      alert.style.padding = "8px";
      alert.style.marginTop = "8px";
      alert.style.opacity = 1;
      if (data.time != "never") {
        await sleep((data.time ?? 5) * 1000);
        this.close(alert);
      //} else {
      //  alert.querySelector(".alertClose").remove();
      }
    })();
    return alert;
  };
  close = async function (alert) {
    if (alert == null || alert.style == null) {
      return;
    }
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
  };
  finished = function(id) {
    let gottenAlerts = fixed.querySelectorAll('.alert[alert="' + id + '_ALERT"]');
    for (let i = 0; i < gottenAlerts.length; i++) {
      this.close(gottenAlerts[i]);
    }
  }
}

modules["dropdowns/account"] = class {
  html = `
  <button class="accountDrop accountLogout" style="--setBackground: var(--error)" close><div>Logout</div><img src="./images/tooltips/account/logout.svg"></button>
  <button class="accountDrop accountManage" close><div>Settings</div><img src="./images/tooltips/account/settings.svg"></button>
  <!--<button class="accountDrop" dropdown="dropdowns/account/preferences"><div>Preferences</div><img src="./images/tooltips/account/preferences.svg"></button>-->
  <div class="accountDropLine"></div>
  <button class="accountDrop" close pwa dropdowntitle="Add Markify as an app on your device!"><div>Get the App</div><img src="./images/tooltips/account/app.svg"></button>
  <button class="accountDrop" close dropdown="dropdowns/account/report" dropdowntitle="Report Bugs & Feedback" noscrollclose><div>Report Bug</div><img src="./images/tooltips/account/report.svg"></button>
  <button class="accountDrop" close whatsnew modaltitle="What's New"><div>What's New</div><img src="./images/tooltips/account/exclamation.svg"></button>
  <button class="accountDrop" close modal="modals/tutorial" modaltitle="Resources"><div>Resources</div><img src="./images/tooltips/account/question.svg"></button>
  <div class="accountDropLine"></div>
  <div class="accountSocialHolder">
    <a href="https://twitter.com/markifytool" target="_blank"><img src="./images/launch/socials/twitter.svg"></a>
    <a href="https://www.instagram.com/markifytool" target="_blank"><img src="./images/launch/socials/instagram.svg"></a>
    <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="./images/launch/socials/linkedin.svg"></a>
    <a href="https://www.youtube.com/@markifyexotek" target="_blank"><img src="./images/launch/socials/youtube.svg"></a>
  </div>
  <div class="accountPolicyHolder">
    <a href="https://exotek.co/tos" target="_blank">Terms</a>
    <a href="https://exotek.co/privacy" target="_blank">Privacy</a>
  </div>
  <div class="accountCopyrightHolder">
    <a href="https://exotek.co" target="_blank">©2024 Exotek LLC</a>
  </div>
  `;
  css = {
    ".accountDrop": `display: flex; width: 100%; padding: 6px; border-radius: 8px; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s; --setBackground: var(--theme)`,
    ".accountDrop:not(:last-child)": `margin-bottom: 4px`,
    ".accountDrop div": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".accountDrop img": `width: 24px; height: 24px; margin-left: 6px; object-fit: cover; transition: .15s`,
    ".accountDrop:hover": `background: var(--setBackground); color: #fff`,
    ".accountDrop:hover img": `filter: brightness(0) invert(1)`,
    ".accountDrop[pwa]": `display: none`,
    ".accountDropLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".accountSocialHolder": `display: flex; flex-wrap: wrap; height: fit-content; padding: 3px; background: #fff; border-radius: 12px; justify-content: space-evenly`,
    ".accountSocialHolder a": `width: 30px; height: 30px; margin: 3px`,
    ".accountSocialHolder a img": `width: 100%; height: 100%`,
    ".accountPolicyHolder": `display: flex; flex-wrap: wrap; justify-content: space-evenly; align-items: center`,
    ".accountPolicyHolder a": `margin: 4px; color: var(--darkGray); font-size: 16px; font-weight: 600; text-decoration: none`,
    ".accountCopyrightHolder": `display: flex; flex-wrap: wrap; margin: 2px 0; justify-content: center; align-items: center`,
    ".accountCopyrightHolder a": `color: var(--darkGray); font-size: 14px; font-weight: 500; text-decoration: none`
  };
  js = async function (frame) {
    let alertModule = await loadModule("alert");
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
    let isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    let checkForPrompt = () => {
      if (window.matchMedia("(display-mode: standalone)").matches == true || window.navigator.standalone == true || document.referrer.includes("android-app://") == true) {
        return false;
      }
      if (getParam("source") == "pwa") {
        return false;
      }
      if (isIos == true) {
        return true;
      }
      if (window.deferredPrompt == null) {
        return false;
      }
      if (window.deferredPrompt.prompt == null) {
        return false;
      }
      return true;
    }
    let installpwa = frame.querySelector(".accountDrop[pwa]");
    installpwa.addEventListener("click", async function () {
      if (checkForPrompt() == true) {
        if (window.deferredPrompt != null && window.deferredPrompt.prompt != null) {
          await window.deferredPrompt.prompt();
          let { outcome } = await window.deferredPrompt.userChoice;
          if (outcome === "accepted") {
            sendRequest("POST", "me/science", { type: "installedpwa", value: true });
          }
        } else if (isIos == true) {
          alertModule.open("info", `<b>Add to Home Screen</b><div>To add Markify on an iOS device, tap on the <b>Share</b> button, then scroll down and tap on <b>Add to Home Screen</b></div>`, { time: 15 });
        }
      }
    });
    if (checkForPrompt() == true) {
      installpwa.style.display = "flex";
    }
    let whatsNew = frame.querySelector(".accountDrop[whatsnew]");
    if (account.currentWhatsNew != null) {
      whatsNew.setAttribute("modal", "modals/updates/" + account.currentWhatsNew);
    } else {
      whatsNew.remove();
    }
  }
}

// Add CORE CSS:
addCSS({
  "button, a": `border: none; background: none; user-select: none; color: var(--textColor); font-family: var(--font); cursor: pointer; transition: .1s`,
  "button:active, a:active": `transform: scale(.95) !important`,
  "[disabled]": `pointer-events: none !important; opacity: .5 !important`,
  "[disabled] > *": `pointer-events: none !important`,
  "[hidden]": `pointer-events: none !important; opacity: 0 !important`,
  "[error]": `--borderColor: var(--error) !important; color: var(--error) !important`,
  ".largeButton, .border": `--themeColor: var(--secondary); --themeColor2: var(--hover); --borderRadius: 0px; --borderColor: var(--themeColor); --borderWidth: 0px; --outline: solid var(--borderWidth) var(--borderColor); --transition: .1s; position: relative; border-radius: var(--borderRadius)`,
  ".largeButton": `display: flex; padding: 6px 14px; --borderWidth: 4px; align-items: center; font-size: 20px; font-weight: 700; transition: .1s`,
  ".largeButton:after, .border:after": `position: absolute; display: inline-block; width: calc(100% - 2px); height: calc(100% - 2px); left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: calc(var(--borderRadius) + var(--borderWidth)*2); content: ""; pointer-events: none; border: var(--outline); transition: var(--transition)`,
  ".buttonAnim": `--borderWidth: 0px`,
  ".buttonAnim:hover": `background: var(--hover)`,
  ".buttonAnim:active": `background: var(--pageColor); --borderWidth: 4px; --borderColor: var(--hover)`,
  ".largeButton:hover": `--borderColor: var(--themeColor2)`,
  ".largeButton:active": `--borderWidth: 8px`,
  ".fixedItemHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; transition: .3s`,
  ".fixedItemHolder[blur]": `backdrop-filter: blur(4px); background: rgba(180, 218, 253, .3); pointer-events: all`,
  "[notransition]": `transition: unset !important`,
  "button svg": `-webkit-transform: translate3d(0, 0, 0)`
});
(new Image()).src = "./images/tooltips/alerts.svg";
(new Image()).src = "./images/tooltips/close.svg";

if ("serviceWorker" in navigator && window.isDiscord != true) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("serviceworker.js");
  });
}
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
});