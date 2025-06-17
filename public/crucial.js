const configs = {
  public: {
    server: window.serverURL ?? "https://api.markifyapp.com/",
    exotek_id: "631056064efd34591c5a8e05",
    assets: window.mediaURL ?? "https://static.markifyapp.com/",
    socket: { project_id: "62088fbdfc22489578e94822", project_token: "client_129dbf2cf03edc6fba2aac135fd5ae119af" }
  },
  testing: {
    server: "http://localhost:3000/api/",
    exotek_id: "6747584c543f96f597ddd21b",
    assets: "https://test-markify-content.s3.amazonaws.com/",
    socket: { project_id: "674756e0543f96f597ddd217", project_token: "client_3a6c7ca1cacbf5850efe8ebee32621cdb7b" },
    redirectOnError: false
  },
  prodTesting: {
    server: "http://localhost:3000/api/", //"http://10.0.0.164:3000/api/",
    exotek_id: "631056064efd34591c5a8e05",
    assets: window.mediaURL ?? "https://static.markifyapp.com/",
    socket: { project_id: "62088fbdfc22489578e94822", project_token: "client_129dbf2cf03edc6fba2aac135fd5ae119af" },
    redirectOnError: false
  }
};

const config = configs["public"];
const version = "1.3.4"; // Big Update . Small Feature Release . Bug Fix

const serverURL = config.server;
const assetURL = config.assets;
const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);

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
let defaultPage = "pages/launch";

let account = {};
let userID;
let hasFeatureEnabled = (feature) => { return (account.featureFlags ?? []).includes(feature) == true; };

let subscribes = [];

let primaryButtonDown = false;
let mouseDown = () => {
  return primaryButtonDown;
}
let setPrimaryButtonState = (event) => {
  let flags = event.buttons !== undefined ? event.buttons : event.which;
  primaryButtonDown = (flags & 1) === 1;
}
document.addEventListener("pointerdown", setPrimaryButtonState, { capture: true, passive: false });
document.addEventListener("pointermove", setPrimaryButtonState, { capture: true, passive: false });
document.addEventListener("pointerup", setPrimaryButtonState, { capture: true, passive: false });

let tempListeners = {};
let addTempListener = (listen) => {
  let listenID = randomString(10) + Date.now();
  tempListeners[listenID] = listen;
  return listenID;
}
let tempListen = (parent, listen, runFunc, extra) => {
  parent.addEventListener(listen, runFunc, extra);
  addTempListener({ type: "event", parent: parent, name: listen, listener: runFunc });
}
let removeTempListeners = () => {
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
let findModule = (element) => {
  let content = element.closest(".content[moduleid]");
  if (content == null) {
    return;
  }
  return (tempListeners[content.getAttribute("moduleid")] ?? {}).module;
}

let subscribe = (filter, callback, config) => {
  let sub = socket.subscribe(filter, callback, config);
  subscribes.push(sub);
  return sub;
}

let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms ?? 1));
}

let getScript = (url) => {
  return document.querySelector("[src='" + url + "'");
}
let loadScript = (url) => {
  return new Promise((resolve) => {
    let script = getScript(url + "?v=" + version);
    if (script != null) {
      if (script.hasAttribute("loaded") == true) {
        resolve(script);
      } else {
        let loadFunction;
        let errorFunction;
        loadFunction = () => {
          resolve(script);
          script.removeEventListener("load", loadFunction);
          script.removeEventListener("error", errorFunction);
        }
        errorFunction = () => {
          resolve(); // No need to clear events (Script is removed)
        }
        script.addEventListener("load", loadFunction);
        script.addEventListener("error", errorFunction);
      }
    } else {
      let newScript = document.createElement("script");
      if (url.endsWith(".mjs") == true) {
        newScript.setAttribute("type", "module");
      }
      let loadFunction;
      let errorFunction;
      loadFunction = () => {
        newScript.setAttribute("loaded", "");
        resolve(newScript);
        newScript.removeEventListener("load", loadFunction);
        newScript.removeEventListener("error", errorFunction);
      }
      errorFunction = () => {
        newScript.remove();
        resolve();
      }
      newScript.addEventListener("load", loadFunction);
      newScript.addEventListener("error", errorFunction);
      newScript.src = url + "?v=" + version;
      document.head.appendChild(newScript);
    }
  });
}

let addCSS = (newRules) => {
  let ruleKeys = Object.keys(newRules);
  for (let i = 0; i < ruleKeys.length; i++) {
    let rule = ruleKeys[i];
    try {
      stylesheet.insertRule(rule + "{" + newRules[rule] + "}", stylesheet.cssRules.length);
    } catch {}
  }
}

let cleanup = new FinalizationRegistry((key) => {
  console.log("CLEARED:", key);
});

let loadedModules = {};
let pageTheme;
let newModule = async (path, parent) => {
  if (modules[path] == null) {
    await loadScript("../modules/" + path + ".js");
  }
  let moduleTemplate = modules[path];
  if (moduleTemplate == null) {
    return;
  }
  let module = new moduleTemplate;
  //console.log("REGISTER:", path);
  //cleanup.register(module, path);
  module.newModule = function (path) {
    return newModule(path, this);
  }
  module.setFrame = function (path, frame, extra) {
    return setFrame(path, frame, extra, this);
  }
  if (parent != null) {
    module.parent = parent;
  }
  if (loadedModules[path] == null) {
    loadedModules[path] = true;
    if (module.css != null) {
      addCSS(module.css);
    }
    if (module.preload != null) {
      for (let i = 0; i < module.preload.length; i++) {
        loadScript(module.preload[i]);
      }
    }
  }
  return module;
}
//let currentlyLoadingFrames = {};
let setFrame = async (path, frame, extra, parent) => {
  let frameSet = frame ?? app;
  extra = extra ?? {};
  /*if (currentlyLoadingFrames[frameSet.className] == "" && extra.override != true) {
    await loadModule(path, parent);
  }
  currentlyLoadingFrames[frameSet.className] = "";*/
  let loadId = randomString(15) + getEpoch();
  frameSet.setAttribute("moduleloadid", loadId);
  let loadingPlacement = frameSet.closest(".dropdown") ?? frameSet.closest(".modal") ?? frameSet;
  let oldContent = frameSet.querySelectorAll(".content:not([old])");
  for (let i = 0; i < oldContent.length; i++) {
    let remContent = oldContent[i];
    if (remContent.parentElement != frameSet) {
      continue;
    }
    remContent.setAttribute("old", "");
    remContent.style.zIndex = 0;
    (async () => {
      await sleep(300);
      remContent.remove();
    })();
  }
  if (modules[path] == null || frameSet == app || (frameSet.closest(".dropdown") == null && frameSet.closest(".modal") == null && extra.hideLoading != true)) {
    if (loadingPlacement.querySelector(".loading:not([old])") == null && extra.showLoading != false) {
      if (frameSet.closest(".dropdown") == null && frameSet.closest(".modal") == null && oldContent.length > 0) {
        for (let i = 0; i < oldContent.length; i++) {
          let remContent = oldContent[i];
          if (remContent.parentElement != frameSet) {
            continue;
          }
          remContent.style.opacity = 0;
          remContent.style.width = "100%";
          remContent.style.height = "100%";
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
  } else if (oldContent != null) {
    for (let i = 0; i < oldContent.length; i++) {
      if (oldContent[i].parentElement != frameSet) {
        continue;
      }
      oldContent[i].style.opacity = 0;
    }
    //frameSet.innerHTML = "";
  }
  let loading = loadingPlacement.querySelector(".loading[new]");
  if (loading != null) {
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
  let module = await newModule(path, parent);
  if (frameSet == null || frameSet.getAttribute("moduleloadid") != loadId) {
    return;
  }
  frameSet.removeAttribute("moduleloadid");
  if (module == null) {
    if (extra.missPageRedirect != true || config.redirectOnError == false) {
      frameSet.style.display = "flex";
      frameSet.style.justifyContent = "center";
      frameSet.style.alignItems = "center";
      frameSet.innerHTML = `<div class="content"><span style="display: block; max-width: 216px; color: var(--error)">Failed to load module, please try again later.</span></div>`;
      //delete currentlyLoadingFrames[frameSet.className];
      if (loading != null) {
        loading.remove();
      }
      return;
    } else if (path != defaultPage) {
      if (loading != null) {
        loading.remove();
      }
      return setFrame(defaultPage, null, extra);
    }
  }
  if (extra.content != null) {
    if (module.maxHeight != null) {
      extra.content.setAttribute("maxheight", module.maxHeight);
    }
  }
  let continueLoading = true;
  if (frameSet == app) {
    extra.from = currentPage;
    //window.location.hash = "#" + path.substring(path.lastIndexOf("/") + 1);
    let setURLState = new URL(path.substring(path.indexOf("/")), window.location.origin);
    let params = {};
    let originalParams = Object.fromEntries((new URL("", window.location)).searchParams.entries());
    if (extra.passParams == true) {
      params = originalParams;
    }
    if (extra.params != null) {
      params = { ...params, ...extra.params };
    }
    let keys = Object.keys(params);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = params[key];
      if (value != null) {
        setURLState.searchParams.append(key, value);
      }
    }
    if (extra.pushHistory != false) {
      window.history.pushState({ page: path, params: params }, "", setURLState.pathname + setURLState.search);
    } else if (extra.replaceHistory == true) {
      window.history.replaceState({ page: path, params: params }, "", setURLState.pathname + setURLState.search);
    }
    let currentRemotes = Object.keys(socket.remotes);
    for (let i = 0; i < currentRemotes.length; i++) {
      let remote = currentRemotes[i];
      if (remote != "account") {
        delete socket.remotes[remote];
      }
    }
    delete window.closeCallback;
  }
  if (extra.construct != null) {
    Object.assign(module, extra.construct);
  }
  if (module.preJs != null) {
    continueLoading = (await (module.preJs())) != false;
  }
  if (loading != null && frameSet.closest(".dropdown") == null && frameSet.closest(".modal") == null) { // && frameSet == app
    let svgHolder = loading.querySelector(".loadingSvgHolder");
    svgHolder.style.width = "max(" + svgHolder.clientWidth + "px, 100%)";
    svgHolder.style.height = svgHolder.clientHeight + "px";
  }
  if (continueLoading == true) {
    frameSet.insertAdjacentHTML("beforeend", `<div class="content" style="opacity: 0; transition: all .3s, max-height 0s" new>${module.html}</div>`);
    let frameContent = frameSet.querySelector(".content[new]");
    module.frame = frameContent;
    frameContent.removeAttribute("new");
    if (frameSet == app) {
      frameContent.setAttribute("hideoverflow", "");
      //frameContent.style.display = "none";
      //frameContent.style.position = "absolute";
      dropdownModule.close();
      frameContent.style.width = "100%";
      removeTempListeners();
      for (let i = 0; i < subscribes.length; i++) {
        subscribes[i].close();
      }
      subscribes = [];
      //window.scrollTo(0, 0);
      body.style.removeProperty("user-select");
      currentPage = path;
      document.title = module.title + " | Markify";
      pageTheme = module.theme;
      updateTheme();
    }
    //frameSet.setAttribute("loaded", "");
    if (module.js != null) {
      await module.js(frameContent, extra);
    }
    if (frameContent.hasAttribute("hideoverflow") == true) { //frameContent.style.display == "none"
      frameContent.removeAttribute("hideoverflow");
      //frameContent.style.removeProperty("display");
    }
    frameContent.offsetHeight;
    frameContent.style.opacity = 1;
  }
  if (loading != null) {
    loading.setAttribute("old", "");
    loading.style.pointerEvents = "none";
    loading.style.opacity = 0;
    (async () => {
      await sleep(300);
      if (loading != null) {
        loading.remove();
      }
    })();
    if (frameSet == app) {
      let revealLoading = frameSet.querySelectorAll(".loading:not([old])");
      for (let i = 0; i < revealLoading.length; i++) {
        let remLoading = revealLoading[i];
        remLoading.style.opacity = 1;
        /*(async () => {
          await sleep(300);
          if (remLoading != null) {
            remLoading.remove();
          }
        })();*/
      }
    }
  }
  //delete currentlyLoadingFrames[frameSet.className];
  return module;
}
let goBack = () => {
  history.back();
}
window.addEventListener("popstate", (event) => {
  if (((event.state ?? {}).page ?? "") != "") {
    setFrame(event.state.page, null, { pushHistory: false, params: event.state.params });
  }
});
/*window.addEventListener("hashchange", () => {
  let setPage = "pages/" + window.location.hash.substring(1);
  if (currentPage == setPage) {
    return;
  }
  setFrame(setPage);
});*/

let getParam = (key) => {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
}
let modifyParams = (key, value) => {
  if (getParam(key) == value) {
    return;
  }
  const url = new URL(window.location);
  if (value != null) {
    url.searchParams.set(key, value);
  } else if (getParam(key)) {
    url.searchParams.delete(key);
  }
  //window.history.replaceState({}, "", url);
  try {
    window.history.replaceState(window.history.state, "", url);
  } catch {}
}

let getObject = (arr, field) => {
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

let copyObject = (obj) => {
  if (window.structuredClone != null) {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

let clientPosition = (event, type) => {
  switch (type) {
    case "x":
      return Math.floor(event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0);
    case "y":
      return Math.floor(event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0);
  }
}

let cleanString = (str) => {
  return str.replace(/\>/g, "&#62;").replace(/\</g, "&#60;");
}

let isValidURL = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

let timeSince = (time, long) => {
  let calcTimestamp = Math.floor((Date.now() - time) / 1000);
  if (calcTimestamp < 1) {
    calcTimestamp = 1;
  }
  let amountDivide = 1;
  let end = (long ? "Second" : "s");
  if (calcTimestamp > 31536000 - 1) {
    amountDivide = 31536000;
    end = (long ? "Year" : "y");
  } else if (calcTimestamp > 2592000 - 1) {
    amountDivide = 2592000;
    end = (long ? "Month" : "mo");
  } else if (calcTimestamp > 604800 - 1) {
    amountDivide = 604800;
    end = (long ? "Week" : "w");
  } else if (calcTimestamp > 86400 - 1) {
    amountDivide = 86400;
    end = (long ? "Day" : "d");
  } else if (calcTimestamp > 3600 - 1) {
    amountDivide = 3600;
    end = (long ? "Hour" : "h");
  } else if (calcTimestamp > 60 - 1) {
    amountDivide = 60;
    end = (long ? "Minute" : "m");
  }
  let timeToSet = Math.floor(calcTimestamp / amountDivide);
  if (timeToSet > 1 && long) {
    end += "s";
  }
  if (long == true) {
    return timeToSet + " " + end + " Ago";
  } else {
    return timeToSet + end;
  }
}
let formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
let formatFullDate = (time) => {
  let date = new Date(time + epochOffset);
  let splitDate = date.toLocaleDateString().split("/");
  return week[date.getDay()] + ", " + months[splitDate[0] - 1] + " " + splitDate[1] + ", " + splitDate[2] + " at " + formatAMPM(date);
}

let addS = (num) => {
  if (num > 1) {
    return "s";
  }
  return "";
}

let copyClipboardText = (text, type) => {
  navigator.clipboard.writeText(text).then(async () => {
    alertModule.open("worked", `<b>Copied</b>The ${type ?? "text"} was copied to your clipboard.`);
  }, (err) => {
    console.error("Async: Could not copy text: ", err);
  });
}
let clipBoardRead = (event) => {
  event.preventDefault();
  document.execCommand("inserttext", false, event.clipboardData.getData("text/plain")); //.replace(/\n\n/g, "</br>")
}

let localDataStore = {};
let setLocalStore = (key, data) => {
  localDataStore[key] = data;
  try {
    localStorage.setItem(key, data);
  } catch { }
}
let getLocalStore = (key) => {
  let result = localDataStore[key];
  try {
    result = localStorage.getItem(key);
  } catch { }
  return result;
}
let removeLocalStore = (key) => {
  if (localDataStore[key]) {
    delete localDataStore[key];
  }
  try {
    localStorage.removeItem(key);
  } catch { }
}

let cachedSVGs = {};
let cachedSVGArray = [];
let getSVG = (path) => {
  if (cachedSVGs[path] != null) {
    cachedSVGArray.splice(cachedSVGArray.indexOf(path), 1);
    cachedSVGArray.unshift(path);
    return cachedSVGs[path];
  }
  let getPromise = new Promise(async (resolve) => {
    try {
      let response = await fetch(path);
      if (response.ok != true) {
        delete cachedSVGs[path];
        cachedSVGArray.splice(cachedSVGArray.indexOf(path), 1);
        return resolve();
      }
      let text = await response.text();
      return resolve(text);
    } catch {
      delete cachedSVGs[path];
      cachedSVGArray.splice(cachedSVGArray.indexOf(path), 1);
      return resolve();
    }
  });
  cachedSVGs[path] = getPromise;
  cachedSVGArray.unshift(path);
  if (cachedSVGArray.length > 100) {
    delete cachedSVGs[cachedSVGArray.pop()];
  }
  return getPromise;
}
let setSVG = async (element, path, replace) => {
  let svg = await getSVG(path);
  if (svg == null) {
    return;
  }
  if (replace != null) {
    svg = await replace(svg);
  }
  if (element != null) {
    element.insertAdjacentHTML("beforeend", svg);
  }
}

let epochOffset = 0;
let getEpoch = () => {
  return Date.now() + epochOffset;
}
let randomString = (l) => {
  var s = "";
  var randomchar = () => {
    var n = Math.floor(Math.random() * 62);
    if (n < 10) return n; //1-10
    if (n < 36) return String.fromCharCode(n + 55); //A-Z
    return String.fromCharCode(n + 61); //a-z
  };
  while (s.length < l) s += randomchar();
  return s;
}
let promptLogin = (page, service) => {
  if (window.promptLoginActivate == true) {
    return;
  }
  window.promptLoginActivate = true;
  let randomStr = getLocalStore("state") ?? randomString(20);
  setLocalStore("state", randomStr);
  modifyParams("state");
  modifyParams("code");
  let redirectURL = new URL(window.location.href);
  if (page != null) {
    redirectURL.hash = "#" + page;
  }
  let endpoint = "https://exotek.co/login?client_id=631056064efd34591c5a8e05&redirect_uri=" +
  encodeURIComponent(redirectURL) +
  "&response_type=code&scope=userinfo&state=" + randomStr;
  if (service != null) {
    modifyParams("state", randomStr);
    endpoint = authEndpoints()[service] ?? endpoint;
  }
  window.location = endpoint;
}
let ensureLogin = () => {
  let token = getLocalStore("token");
  if (token == null) {
    promptLogin();
    return;
  }
  return token;
}
let renewToken = async () => {
  try {
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
    } else if (refreshToken.status > 399 && refreshToken.status < 500) {
      removeLocalStore("userID");
      removeLocalStore("token");
      promptLogin();
    }
  } catch {
    console.log("FAILED TO RENEW TOKEN");
  }
}
let checkForAuth = async (prompt) => {
  let token = getLocalStore("token");
  if (token != null) {
    token = JSON.parse(token);
    if (token.expires < Math.floor(getEpoch() / 1000)) {
      token = (await renewToken()) ?? token;
    }
    return token;
  }
  if (prompt == true) {
    promptLogin();
  }
}

let sendRequest = async (method, path, body, extra) => {
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
    let token = await checkForAuth();
    if (token != null) {
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
    epochOffset = serverTimeMillisGMT - (new Date()).getTime();
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
              alertModule.open("error", message);
            }
          }
          if (body.warnings && body.warnings.length > 0) {
            for (let i = 0; i < body.warnings.length; i++) {
              alertModule.open("warning", body.warnings[i]);
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
      setFrame = () => {}
      app.style.display = "flex";
      app.style.flexDirection = "column";
      app.style.alignItems = "center";
      app.style.justifyContent = "center";
      app.innerHTML = `<div style="max-width: 300px; color: var(--error)">Failed to connect to server, please try again later.</div><button style="margin-top: 18px; font-size: 18px; text-decoration: underline" onclick="location.reload()">Retry</button>`;
    } else {
      //alertModule.open("error", "<b>Whoops! Something Unexpected Happened</b>Please try again later...");
    }
    return [0, "Fetch Error", { took: reqTime }];
  }
}

let objectUpdate = (obj, passData, path) => { // obj = Object to apply changes; passData = Object to edit
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

let getTheme = () => {
  let theme = (account.settings ?? {}).theme;
  if (theme != null) {
    setLocalStore("theme", theme);
  }
  theme = theme ?? getLocalStore("theme") ?? "auto";
  switch (theme) {
    case "auto":
      if (window.matchMedia == null || window.matchMedia("(prefers-color-scheme: dark)").matches != true) {
        return "light";
      } else {
        return "dark";
      }
    default:
      return theme;
  }
}
let updateTheme = () => {
  let setTheme = getTheme();
  document.documentElement.setAttribute("theme", pageTheme ?? setTheme);
}
if (window.matchMedia != null) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { updateTheme(); });
}

let updateToSignedIn = (data) => {
  account = data;
  userID = account.id;
  updateTheme();
}
let auth = async () => {
  let url = "me?ss=" + socket.secureID;
  if (getParam("from") != null) {
    url += "&from=" + getParam("from");
    modifyParams("from");
  }
  let [code, body] = await sendRequest("GET", url);
  if (code == 0) {
    //await sleep(500);
    //auth();
    return;
  }
  if (code != 200) {
    return;
  }
  updateToSignedIn(body);
}
let init = async () => {
  account = {};
  userID = null;
  let paramAuthCode = getParam("code");
  if (paramAuthCode != null && self === top) {
    let localStoreState = getLocalStore("state");
    if (localStoreState == null || getParam("state") != localStoreState) {
      promptLogin();
      return;
    }
    removeLocalStore("state");
    modifyParams("state");
    /*if ((document.referrer ?? "") != "" && (new URL(document.referrer)).host != "exotek.co") {
      return promptLogin();
    }*/
    let sendBody = {
      code: paramAuthCode,
      page: window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)
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
    if (self === top) {
      setLocalStore("userID", getParam("user"));
      setLocalStore("token", decodeURIComponent(getParam("token")));
    }
    modifyParams("user");
    modifyParams("token");
    await auth();
  }
}

// OAUTH REDIRECT:
let endStartup = false;
let authService = getParam("auth");
let authEndpoints = () => {
  let currentLocationURI = encodeURIComponent(encodeURIComponent(window.location.href));
  return {
    //https://exotek.co/login?client_id=631056064efd34591c5a8e05&redirect_uri=[redirectURI]&response_type=code&scope=userinfo&method=classlink
    classlink: "https://launchpad.classlink.com/oauth2/v2/auth?scope=full,profile,openid&redirect_uri=https%3A%2F%2Fexotek.co%2Flogin%3Fclient_id%3D631056064efd34591c5a8e05%26redirect_uri%3D" + currentLocationURI + "%26response_type%3Dcode%26scope%3Duserinfo%26method%3Dclasslink&client_id=c1693431815669c9e8fa52973e526ee4da0d1a1141cc&response_type=code",
    
    //https://exotek.co/login?client_id=631056064efd34591c5a8e05&redirect_uri=https%3A%2F%2Fmarkifyapp.com%2F%23dashboard&response_type=code&scope=userinfo&method=clever
    clever: "https://clever.com/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Fexotek.co%2Flogin%3Fclient_id%97afe7146a3017919a40%26redirect_uri%3Dhttps%253A%252F%252Fmarkifyapp.com%252F%2523dashboard%26response_type%3Dcode%26scope%3Duserinfo%26method%3Dclever&client_id=f3136cc44e6912d94b39&state=" + getParam("state")
  };
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
const movedPages = { dashboard: "app/dashboard", lesson: "app/lesson", join: "app/join", editor: "app/lesson" };
let initSocket = async () => {
  if (typeof SimpleSocket == "undefined") { // Backup if static fails
    await loadScript("https://simplesocket.net/static/v2/simplesocket.js");
  }
  socket = new SimpleSocket({
    project_id: config.socket.project_id,
    project_token: config.socket.project_token,
    socket_url: window.socketURL ?? config.socket.socket_url
  });
  socket.remotes.account = (data) => {
    if (data.task === "set") {
      objectUpdate(data.data, account);
  
      let updateElements = body.querySelectorAll("[accountuser], [accountimage]");
      for (let i = 0; i < updateElements.length; i++) {
        let elem = updateElements[i];
        if (elem.hasAttribute("accountuser")) {
          elem.textContent = account.user;
          elem.title = account.user;
        }
        if (elem.hasAttribute("accountimage")) {
          elem.src = account.image ?? "../images/profiles/default.svg";
        }
      }

      if (data.data.settings != null) {
        if (window.updateAccountSettings != null) {
          window.updateAccountSettings(data.data.settings);
        }
        if (data.data.settings.hasOwnProperty("theme") == true) {
          updateTheme();
        }
      }
      if (window.updateAccountOptionsUI != null) {
        window.updateAccountOptionsUI();
      }
    } else if (data.task == "logout") {
      removeLocalStore("userID");
      removeLocalStore("token");
      promptLogin();
    }
  }
  let loadPage = defaultPage;
  if (window.location.pathname != "/") {
    loadPage = "pages/" + window.location.pathname.substring(1);
  } else if (window.location.hash != "") {
    let hash = window.location.hash.substring(1);
    loadPage = "pages/" + (movedPages[hash] ?? hash);
  }
  loadScript("../modules/" + loadPage + ".js");
  socket.onopen = async () => {
    connected = true;
    if (endStartup == true) {
      return;
    }
    dropdownModule.close();
    await init();
    let openPage = defaultPage;
    if (window.location.pathname != "/") {
      openPage = "pages/" + window.location.pathname.substring(1);
    } else if (window.location.hash != "") {
      let hash = window.location.hash.substring(1);
      openPage = "pages/" + (movedPages[hash] ?? hash);
    }
    setFrame(openPage, null, { pushHistory: false, replaceHistory: true, passParams: true, unsub: false, missPageRedirect: true });
    if (wasConnected == true) {
      alertModule.open("worked", `<b>Connected</b>Reconnected to Markify`, { id: "connection" });
    }
    wasConnected = true;
  };
  socket.onclose = () => {
    connected = false;
    if (window.closeCallback != null) {
      window.closeCallback();
    }
    alertModule.open("warning", `<b>Lost Connection</b>Reconnecting to Markify...`, { id: "connection", time: "never" });
  };
}
initSocket();

// STANDARD MODULES //
modules["dropdown"] = class {
  css = {
    ".dropdown": `--floatMargin: 8px; position: sticky; box-sizing: border-box; max-width: calc(100% - (var(--floatMargin) * 2)); max-height: calc(100% - (var(--floatMargin) * 2)); right: 0px; bottom: 0px; margin: var(--floatMargin); opacity: 0; box-shadow: var(--darkShadow); border-radius: 12px; transform: scale(.25); transform-origin: 0px 0px; pointer-events: all`,
    ".dropdown .loading": `pointer-events: none`,
    ".dropdownOverflow": `position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--pageColor); border-radius: inherit; z-index: 0`,
    ".dropdownContent": `position: absolute; box-sizing: border-box; width: max-content; max-width: var(--dropdownWidth); height: max-content; padding: 6px; overflow: auto`, //background: var(--pageColor)
    ".dropdownFrame": `position: relative`,
    ".dropdownHeader": `position: relative; display: flex; gap: 6px; padding: 6px 6px 0 6px; justify-content: space-between; transition: .4s; z-index: 2`,
    ".dropdownHeader button": `position: relative; width: 22px; height: 22px; margin: 3px; --borderWidth: 3px; --borderRadius: 14px`,
    ".dropdownHeader button img": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`,
    ".dropdownTitle": `box-sizing: border-box; display: flex; padding: 3px; flex: 1; max-width: fit-content; justify-content: center; align-items: center; white-space: nowrap; overflow: hidden; font-size: 18px; font-weight: 500`,
    ".dropdownTitle div": `flex: 1; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,
    ".dropdownTitle div[backdrop]": `display: none`,
    ".dropdownTitle img": `width: 26px; height: 26px; margin-right: 4px; flex-shrink: 0; object-fit: cover; border-radius: 13px`
  };
  runResize = async (dropdown, content, header, button) => {
    if (content.hasAttribute("loaded") == false) {
      return;
    }

    content.style.top = header.offsetHeight + "px";
    // We use fixed, not window, so that scrollbars are accounted for:
    let parent = dropdown.parentElement;
    content.style.setProperty("--dropdownWidth", "calc(" + parent.clientWidth + "px - (var(--floatMargin) * 2))");
    if (content.hasAttribute("maxheight") == false) {
      content.style.maxHeight = "calc(" + (parent.clientHeight - header.offsetHeight) + "px - (var(--floatMargin) * 2))";
    } else {
      content.style.maxHeight = "min(" + (parent.clientHeight - header.offsetHeight) + "px - (var(--floatMargin) * 2), " + parseInt(content.getAttribute("maxheight")) + "px)";
    }
    if (button != null) {
      content.style.minWidth = "min(" + parent.clientWidth + "px - (var(--floatMargin) * 2), " + button.offsetWidth + "px)";
      content.style.minHeight = "min(" + parent.clientHeight + "px - (var(--floatMargin) * 2), " + button.offsetHeight + "px)";
    }
    
    if (dropdown.hasAttribute("closing") == false) {
      //if (content.querySelector(".dropdownFrame").hasAttribute("loaded")) {
      if (content.offsetWidth > 0 && content.offsetHeight > 0) {
        dropdown.style.width = content.offsetWidth + "px";
        dropdown.style.height = (content.offsetHeight + header.offsetHeight) + "px";
      }
    }/* else {
      dropdown.style.width = button.offsetWidth + "px";
      dropdown.style.height = button.offsetHeight + "px";
    }*/

    if (button != null && button.offsetParent != null) {
      let dropdownParentRect = parent.getBoundingClientRect();
      let buttonRect = button.getBoundingClientRect();
      let addButtonWidth = buttonRect.width / 2;
      let pageHolder = button.closest(".ePageHolder");
      if (pageHolder != null) {
        addButtonWidth *= parseFloat(pageHolder.getAttribute("zoom"));
      }
      let setLeft = buttonRect.left - dropdownParentRect.left + addButtonWidth - (dropdown.offsetWidth / 2);
      let setTop = buttonRect.top - dropdownParentRect.top - 6;
      dropdown.style.left = setLeft + "px";
      dropdown.style.top = setTop + "px";

      dropdown.style.transformOrigin = "0px 0px";
      let dropdownRect = dropdown.getBoundingClientRect();
      dropdown.style.transformOrigin = (buttonRect.left - dropdownRect.left + addButtonWidth) + "px " + (buttonRect.top - dropdownRect.top + (buttonRect.height / 2)) + "px";
    } else {
      this.close();
    }
  }
  setResizeLoop = async (dropdown, content, header, button) => {
    await this.runResize(dropdown, content, header, button);
    return setInterval(async () => { await this.runResize(dropdown, content, header, button); }, 1);
  };
  open = async (button, frameName, data) => {
    if (button == null) {
      return;
    }
    let parent = (data ?? {}).parentElement ?? this.parent ?? button.closest("[dropdownholder]");
    let setTitleHTML;
    if (data != null && data.previous == true) {
      let prev = window.dropdown.frameHistory[window.dropdown.frameHistory.length - 2];
      if (prev == null) {
        return;
      }
      [frameName, setTitleHTML, data] = prev;
    }
    let loaded = modules[frameName] != null;
    if (window.dropdown != null && button.closest(".dropdown") != null) { // Clicked inside the dropdown
      let dropdown = window.dropdown.dropdown;
      let header = dropdown.querySelector(".dropdownHeader");
      let oldContent = dropdown.querySelector(".dropdownContent:not([old])");
      oldContent.setAttribute("old", "");
      dropdown.querySelector(".dropdownOverflow").insertAdjacentHTML("beforeend", `<div class="dropdownContent customScroll" new><div class="dropdownFrame"></div></div>`);
      let content = dropdown.querySelector(".dropdownContent[new]");
      content.removeAttribute("new");
      window.dropdown.content = content;
      let frame = content.querySelector(".dropdownFrame");
      setTitleHTML = setTitleHTML ?? button.getAttribute("dropdowntitle") ?? button.innerHTML;
      if (button.closest(".dropdownBack") == null) {
        if (button.innerHTML == button.textContent) {
          setTitleHTML = "<div>" + button.innerHTML + "</div>";
        }

        oldContent.style.removeProperty("right");
        oldContent.style.left = "0%";
        content.style.left = (dropdown.offsetWidth / 1) + "px";
      } else {
        window.dropdown.frameHistory.pop();
        setTitleHTML = window.dropdown.frameHistory.pop()[1];

        oldContent.style.removeProperty("left");
        oldContent.style.right = "0%";
        content.style.right = (dropdown.offsetWidth / 1) + "px";
      }
      header.querySelector(".dropdownTitle").innerHTML = setTitleHTML;
      let back = header.querySelector(".dropdownBack");
      if (window.dropdown.frameHistory.length > 0) {
        //let prev = window.dropdown.frameHistory[window.dropdown.frameHistory.length - 1];
        //back.setAttribute("dropdown", prev[0]);
        //back.setAttribute("rememberid", prev[2]);
        back.style.display = "flex";
      } else {
        back.style.display = "none";
      }
      window.dropdown.frameHistory.push([frameName, setTitleHTML, data]);
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
        oldContent.style.left = (dropdown.offsetWidth / -1) + "px";;
        content.style.left = "0%";
      } else {
        oldContent.style.right = (dropdown.offsetWidth / -1) + "px";;
        content.style.right = "0%";
      }
      oldContent.style.opacity = 0;
      //oldContent.style.transform = "scale(.85)";
      clearInterval(window.dropdown.interval);
      window.dropdown.interval = await this.setResizeLoop(dropdown, content, header, window.dropdown.button);
      content.style.pointerEvents = "none";
      await setFrame(frameName, frame, { dropdown: this, content: content, button: button, origin: window.dropdown.button, ...data });
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
    this.parent = parent ?? fixed;
    this.parent.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
      <div class="dropdown" new>
        <div class="dropdownOverflow">
          <div class="dropdownHeader">
            <button class="dropdownBack buttonAnim border" style="display: none"><img src="../images/tooltips/back.svg"></button>
            <div class="dropdownTitle"></div>
            <button class="dropdownClose buttonAnim border" close><img src="../images/tooltips/close.svg"></button>
          </div>
          <div class="dropdownContent customScroll">
            <div class="dropdownFrame"></div>
          </div>
        </div>
      </div>
    </div>`);
    let dropdown = this.parent.querySelector(".dropdown[new]");
    dropdown.removeAttribute("new");
    let header = dropdown.querySelector(".dropdownHeader");
    let content = dropdown.querySelector(".dropdownContent");
    let frame = content.querySelector(".dropdownFrame");
    dropdown.style.width = button.offsetWidth + "px";
    dropdown.style.height = button.offsetHeight + "px";
    let backButton = dropdown.querySelector(".dropdownBack");
    backButton.addEventListener("click", () => {
      this.open(backButton, null, { previous: true });
    });
    if (loaded == false) {
      frame.style.minHeight = "200px";
    }
    let existingTitle = button.getAttribute("dropdowntitle");
    setTitleHTML = setTitleHTML ?? existingTitle ?? button.innerHTML;
    if (button.innerHTML == button.textContent && existingTitle == null) {
      setTitleHTML = "<div>" + button.innerHTML + "</div>";
    }
    header.querySelector(".dropdownTitle").innerHTML = setTitleHTML;
    window.dropdown = { dropdown: dropdown, button: button, origin: button, frameHistory: [[frameName, setTitleHTML, data]], interval: await this.setResizeLoop(dropdown, content, header, button) };
    /*let buttonRect = button.getBoundingClientRect();
    let dropdownRect = dropdown.getBoundingClientRect();
    let addButtonWidth = button.offsetWidth / 2;
    let pageHolder = button.closest(".ePageHolder");
    if (pageHolder != null) {
      addButtonWidth *= parseFloat(pageHolder.getAttribute("zoom"));
    }
    dropdown.style.transformOrigin = (buttonRect.left - dropdownRect.left + addButtonWidth) + "px " + (buttonRect.top - dropdownRect.top + (button.offsetHeight / 2)) + "px";*/
    dropdown.style.transition = "opacity .3s, border-radius .3s, transform .4s";
    dropdown.offsetHeight;
    dropdown.style.transform = "scale(1)";
    //button.style.opacity = 0;
    button.setAttribute("activated", "");
    dropdown.style.opacity = 1;
    content.style.pointerEvents = "none";
    content.setAttribute("loaded", "");
    if (modules[frameName] == null) {
      dropdown.style.transition = "width .4s, height .4s, opacity .3s, border-radius .3s, transform .4s";
    }
    await setFrame(frameName, frame, { dropdown: this, content: content, button: button, origin: button, ...data });
    frame.style.removeProperty("min-height");
    await this.runResize(dropdown, content, header, button);
    dropdown.style.transition = "width .4s, height .4s, opacity .3s, border-radius .3s, transform .4s";
    await sleep(300);
    if (content != null) {
      content.style.pointerEvents = "all";
    }
    /*let dropTitle = header.querySelector(".dropdownTitle div");
    if (dropTitle != null) {
      dropTitle.style.textOverflow = "ellipsis";
    }*/
    //await sleep(200);
    //content.style.overflow = "auto";
    return this;
  };
  close = async () => {
    let remDropdown = this.dropdown ?? window.dropdown;
    if (remDropdown == null) {
      return;
    }
    if (this.dropdown == null) {
      if (window.closeDropdown != null) {
        window.closeDropdown();
      }
      delete window.dropdown;
    }
    remDropdown.button.removeAttribute("activated");
    //remDropdown.button.style.removeProperty("opacity");
    //remDropdown.dropdown.setAttribute("closing", "");
    remDropdown.dropdown.style.opacity = 0;
    /*if (remDropdown.button.style.display != "none" && remDropdown.button.offsetParent != null) {
      let buttonRect = remDropdown.button.getBoundingClientRect();
      let dropdownRect = remDropdown.dropdown.getBoundingClientRect();
      let addButtonWidth = remDropdown.button.offsetWidth / 2;
      let pageHolder = remDropdown.button.closest(".ePageHolder");
      if (pageHolder != null) {
        addButtonWidth *= parseFloat(pageHolder.getAttribute("zoom"));
      }
      remDropdown.dropdown.style.transformOrigin = (buttonRect.left - dropdownRect.left + addButtonWidth) + "px " + (buttonRect.top - dropdownRect.top + (remDropdown.button.offsetHeight / 2)) + "px";
    }*/
    remDropdown.dropdown.style.transform = "scale(0)";
    await sleep(350);
    clearInterval(remDropdown.interval);
    remDropdown.dropdown.parentElement.remove();
  }
}
let dropdownModule = {
  open: async (button, frameName, data) => {
    return await (await newModule("dropdown")).open(button, frameName, data);
  },
  close: async () => {
    return await (await newModule("dropdown")).close();
  }
}

modules["modal"] = class {
  css = {
    ".modal": `position: absolute; box-sizing: border-box; max-width: calc(100% - 16px); max-height: calc(100% - 16px); left: 50%; top: 50%; transform: translate(-50%, -50%); opacity: 0; box-shadow: var(--darkShadow); border-radius: 12px; transform-origin: center top; pointer-events: all`,
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
  setResizeLoop = (modal, content, header) => {
    return setInterval(() => {
      if (content.hasAttribute("loaded") == false) {
        return;
      }

      content.style.top = header.offsetHeight + "px";
      // We use fixed, not window, so that scrollbars are accounted for:
      let parent = modal.parentElement;
      content.style.maxWidth = parent.clientWidth - 16 + "px";
      let maxHeight = parent.clientHeight - header.offsetHeight - 16;
      if (content.hasAttribute("maxheight") == true) {
        maxHeight = Math.min(maxHeight, parseInt(content.getAttribute("maxheight")));
      }
      content.style.maxHeight = maxHeight + "px";
      content.style.minWidth = Math.min(parent.clientWidth - 16, 200) + "px";

      if (modal.hasAttribute("closing") == false) {
        //if (content.querySelector(".modalFrame").hasAttribute("loaded")) {
        if (content.offsetWidth > 0 && content.offsetHeight > 0) {
          modal.style.width = content.offsetWidth + "px";
          modal.style.height = content.offsetHeight + header.offsetHeight + "px";
        }
      }
    }, 1);
  };
  open = async (frameName, originalParent, button, title, stack, data) => {
    let parent = originalParent ?? this.parent;
    let dataParent = window;
    if (parent != null && parent != fixed) {
      dataParent = this;
    }
    if (data != null && data.previous == true) {
      let prev = dataParent.modal.frameHistory[dataParent.modal.frameHistory.length - 2];
      if (prev == null) {
        return;
      }
      ([frameName, parent, button, title, stack, data] = prev);
    }
    title = title ?? "";
    let loaded = modules[frameName] != null;
    if (dataParent.modal != null) { // Clicked inside the modal
      let modal = dataParent.modal.modal;
      let header = modal.querySelector(".modalHeader");
      let oldContent = modal.querySelector(".modalContent:not([old])");
      oldContent.setAttribute("old", "");
      modal.querySelector(".modalOverflow").insertAdjacentHTML("beforeend", `<div class="modalContent customScroll" new><div class="modalFrame"></div></div>`);
      let content = modal.querySelector(".modalContent[new]");
      content.removeAttribute("new");
      dataParent.modal.content = content;
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
        dataParent.modal.frameHistory.pop();
        title = dataParent.modal.frameHistory.pop()[3];

        oldContent.style.removeProperty("left");
        oldContent.style.right = "0%";
        content.style.right = modal.offsetWidth + "px";
      }
      header.querySelector(".modalTitle").innerHTML = title;
      let back = header.querySelector(".modalBack");
      if (dataParent.modal.frameHistory.length > 0 && stack != false) {
        //back.setAttribute("modal", dataParent.modal.frameHistory[dataParent.modal.frameHistory.length - 1][0]);
        back.style.display = "flex";
      } else {
        back.style.display = "none";
      }
      if (stack != false) {
        dataParent.modal.frameHistory.push([frameName, parent, back, title, stack, data]);
      } else {
        dataParent.modal.frameHistory = [[frameName, parent, back, title, stack, data]];
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
      clearInterval(dataParent.modal.interval);
      dataParent.modal.interval = this.setResizeLoop(modal, content, header);
      content.style.pointerEvents = "none";
      await setFrame(frameName, frame, { modal: this, content: content, button: button, origin: dataParent.modal.button, ...data });
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
    this.parent = parent ?? fixed;
    this.parent.insertAdjacentHTML("beforeend", `<div class="fixedItemHolder">
      <div class="modal" new>
        <div class="modalOverflow">
          <div class="modalHeader">
            <button class="modalBack buttonAnim border" style="display: none"><img src="../images/tooltips/back.svg"></button>
            <div class="modalTitle"></div>
            <button class="modalClose buttonAnim border" close><img src="../images/tooltips/close.svg"></button>
          </div>
          <div class="modalContent customScroll">
            <div class="modalFrame"></div>
          </div>
        </div>
      </div>
    </div>`);
    let modal = this.parent.querySelector(".modal[new]");
    modal.removeAttribute("new");
    let header = modal.querySelector(".modalHeader");
    let content = modal.querySelector(".modalContent");
    let frame = content.querySelector(".modalFrame");
    let backButton = modal.querySelector(".modalBack");
    backButton.addEventListener("click", () => {
      this.open(frameName, parent, backButton, title, stack, { ...data, previous: true });
    });
    modal.querySelector(".modalClose").addEventListener("click", () => {
      this.close();
    });
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
    dataParent.modal = { modal: modal, button: button, origin: button, frameHistory: [[frameName, parent, backButton, title, stack, data]], interval: this.setResizeLoop(modal, content, header, button) };
    modal.style.opacity = 1;
    modal.parentElement.setAttribute("blur", "");
    content.style.pointerEvents = "none";
    content.setAttribute("loaded", "");
    await setFrame(frameName, frame, { modal: this, content: content, button: button, origin: button, ...data });
    content.style.pointerEvents = "all";
    frame.style.removeProperty("min-height");
    await sleep(300);
    let dropTitle = header.querySelector(".modalTitle div");
    if (dropTitle) {
      dropTitle.style.textOverflow = "ellipsis";
    }
    //await sleep(200);
    //content.style.overflow = "auto";
    return this;
  };
  close = async () => {
    let remModal = this.modal ?? window.modal;
    if (remModal == null) {
      return;
    }
    if (this.modal == null) {
      if (window.closeModal != null) {
        window.closeModal();
      }
      delete window.modal;
    }
    remModal.modal.setAttribute("closing", "");
    remModal.modal.style.opacity = 0;
    remModal.modal.parentElement.removeAttribute("blur");
    remModal.modal.style.transform = "translate(-50%, -50%) scale(0)";
    await sleep(350);
    clearInterval(remModal.interval);
    remModal.modal.parentElement.remove();
  }
}
let modalModule = {
  open: async (frameName, parent, button, title, stack, data) => {
    return await (await newModule("modal")).open(frameName, parent, button, title, stack, data);
  },
  close: async () => {
    return await (await newModule("modal")).close();
  }
}

modules["alert"] = class {
  css = {
    ".alertHolder": `--floatMargin: 12px; position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 600px; max-width: 100%; height: fit-content; margin: calc(34px + (var(--floatMargin) * 2)) 8px 8px 8px; align-items: center; z-index: 9999`,
    ".alert": `box-sizing: border-box; display: flex; max-width: 100%; transform: scale(0); opacity: 0; background: var(--pageColor); border-radius: 12px; box-shadow: var(--darkShadow); pointer-events: all; overflow: hidden`,
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
  open = async (type, message, data) => {
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
      <img src="../images/tooltips/alerts.svg">
      <div class="alertText"></div>
      <button class="alertClose buttonAnim border"><img src="../images/tooltips/close.svg"></button>
    </div>`);
    let alert = fixed.querySelector(".alert[new]");
    alert.removeAttribute("new");
    (async () => {
      if (data.id) {
        this.finished("connection");
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
  close = async (alert) => {
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
  finished = (id) => {
    let gottenAlerts = fixed.querySelectorAll('.alert[alert="' + id + '_ALERT"]');
    for (let i = 0; i < gottenAlerts.length; i++) {
      this.close(gottenAlerts[i]);
    }
  }
}
let alertModule = {
  open: async (type, message, data) => {
    return (await newModule("alert")).open(type, message, data);
  },
  close: async (alert) => {
    return (await newModule("alert")).close(alert);
  }
}

let textBoxError = async (box, error) => {
  alertModule.open("error", "<b>Invalid Input</b>" + error);
  if (box != null) {
    box.setAttribute("error", "");
    await sleep(200);
    box.removeAttribute("error");
  }
}

body.addEventListener("click", (event) => {
  let element = event.target;
  if (element == null) {
    return;
  }
  let alertClose = element.closest(".alertClose");
  if (alertClose != null) {
    alertModule.close(alertClose.parentElement);
    return;
  }

  if (window.dropdown != null) {
    if (element.closest(".dropdown") == null || element.closest(".dropdown button[close]") != null) {
      if (element.closest("button") == window.dropdown.origin) {
        return;
      }
      dropdownModule.close();
    }
  }
  /*if (window.modal != null) {
    if (element.closest(".modal button[close]")) {
      modalModule.close();
    }
  }*/
  let page = element.closest("[openpage]");
  if (page != null) {
    event.preventDefault();
    setFrame("pages/" + page.getAttribute("openpage"));
  }
});
window.addEventListener("scroll", () => {
  if (window.dropdown && window.dropdown.button && window.dropdown.button.closest("[noscrollclose]") == null && window.dropdown.dropdown.querySelector(".content[noscrollclose]") == null) {
    dropdownModule.close();
  }
});

// Disable Default UI Zooming:
window.addEventListener("wheel", (event) => {
  if (event.ctrlKey == true || event.metaKey == true) {
    event.preventDefault();
  }
}, { passive: false });

// Add CORE CSS:
addCSS({
  ".content[hideoverflow]": `max-width: 100vw !important; max-height: 100vh !important; overflow: hidden !important`,
  "button, a": `border: none; background: none; user-select: none; color: var(--textColor); font-family: var(--font); cursor: pointer; transition: .1s`,
  "button:active, a:active": `transform: scale(.975)`,
  "button[activated]": `opacity: 0 !important; transition: opacity .4s !important; pointer-events: none !important`,
  "[disabled]": `pointer-events: none !important; opacity: .5 !important`,
  "[disabled] > *": `pointer-events: none !important`,
  "[hidden]": `pointer-events: none !important; opacity: 0 !important`,
  "[error]": `--borderColor: var(--error) !important; color: var(--error) !important`,
  ".largeButton, .border": `--themeColor: var(--secondary); --themeColor2: var(--hover); --borderRadius: 0px; --animBorderRadius: var(--borderRadius); --borderColor: var(--themeColor); --borderWidth: 0px; --animBorderWidth: var(--borderWidth); --outline: solid var(--animBorderWidth) var(--borderColor); --transition: .1s; position: relative; border-radius: var(--animBorderRadius)`,
  ".largeButton": `display: flex; padding: 6px 14px; --borderWidth: 4px; margin: var(--borderWidth); align-items: center; color: var(--themeColor); font-size: 20px; font-weight: 700; text-decoration: none; transition: .1s`,
  ".largeButton div[backdrop]": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: var(--themeColor); box-shadow: 0px 0px calc(var(--animBorderWidth) + 4px) 0px var(--themeColor); opacity: .15; border-radius: var(--animBorderRadius); pointer-events: none`,
  ".largeButton:after, .border:after": `position: absolute; display: inline-block; width: calc(100% - 2px); height: calc(100% - 2px); left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: calc(var(--animBorderRadius) + var(--borderWidth)*2); content: ""; pointer-events: none; border: var(--outline); transition: var(--transition)`,
  ".buttonAnim": `--borderWidth: 0px`,
  ".buttonAnim:hover": `background: var(--hover)`,
  ".buttonAnim:active": `background: var(--pageColor); --borderWidth: 4px; --borderColor: var(--hover)`,
  ".largeButton:hover": `--borderColor: var(--themeColor2)`,
  ".largeButton:active": `--animBorderWidth: calc(var(--borderWidth) * 2); --animBorderRadius: calc(var(--borderRadius) + var(--borderWidth))`,
  ".fixedItemHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; transition: .3s; pointer-events: none; z-index: 100`,
  ".fixedItemHolder[blur]": `backdrop-filter: blur(4px); background: rgba(var(--hoverRGB), .3); pointer-events: all`,
  "[notransition]": `transition: unset !important`,
  "button > svg": `-webkit-transform: translate3d(0, 0, 0)`,
  ".customScroll::-webkit-scrollbar": `background: var(--scrollGray)`,
  ".customScroll::-webkit-scrollbar-corner": `background: var(--scrollGray)`,
  ".customScroll::-webkit-scrollbar-thumb": `min-width: 50px; min-height: 50px; border: 4px solid var(--scrollGray); background: var(--gray); border-radius: 8px`,
  ".customScroll::-webkit-scrollbar-thumb:active": `background: var(--activeGray)`,
  ".hideScroll": `scrollbar-width: none`,
  ".hideScroll::-webkit-scrollbar": `display: none`,

  'html[theme="light"]': `--breakoutThemeRGB: 255, 76, 108; --breakoutTheme: rgb(var(--breakoutThemeRGB)); --breakoutSecondaryRGB: 255, 122, 147; --breakoutSecondary: rgb(var(--breakoutSecondaryRGB)); --breakoutHoverRGB: 255, 166, 182; --breakoutHover: rgb(var(--breakoutHoverRGB))`,
  'html[theme="dark"]': `--breakoutThemeRGB: 255, 76, 108; --breakoutTheme: rgb(var(--breakoutThemeRGB)); --breakoutSecondaryRGB: 255, 122, 147; --breakoutSecondary: rgb(var(--breakoutSecondaryRGB)); --breakoutHoverRGB: 112, 33, 46; --breakoutHover: rgb(var(--breakoutHoverRGB))`,
});
(new Image()).src = "../images/tooltips/alerts.svg";
(new Image()).src = "../images/tooltips/close.svg";

if ("serviceWorker" in navigator && window.isDiscord != true) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("../serviceworker.js");
  });
}
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
});
