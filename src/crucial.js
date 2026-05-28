import {
  configuration,
  version,
  domain
} from "./configuration";

import { coreStyles } from "@modules/utility/core-styles";
import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
//import { modal as modalModule } from "@modules/utility/Modal";
import { alert as alertModule } from "@modules/utility/Alert";

const configurations = {
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

let config = configurations[configuration];
if (configuration != "public" && window.location.hostname == domain) {
  config = configurations["public"];
}
export const serverURL = config.server;
export const assetURL = config.assets;
export const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);

export let socket = {};
export let connected = false;

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const supportedImageTypes = ["png", "jpeg", "jpg", "webp", "svg+xml", "tiff", "tif", "heic", "heif", "gif"];

export const head = document.head;
export const body = document.body;
export const app = body.querySelector(".app");
export const fixed = body.querySelector(".fixed");
export const stylesheet = document.querySelector("style").sheet;
export const favicon = document.querySelector('link[rel="icon"]');

export const loadingAnim = app.innerHTML;

export let currentPage = "";
let currentPageLoadId;
let defaultPage = "pages/launch";

export let account = {};
export let userID;
export const hasFeatureEnabled = (feature) => {
  return (account.featureFlags ?? []).includes(feature) == true;
};

export let subscribes = [];

export let pageTheme;
export let pageAllowsBackgroundChange = false;

/*
const moduleCache = new Map();
window.__assetsBase = import.meta.url;
window.resilientImport = (path) => { // Use __import__ so it's not loopback converted to itself!
  return new Promise(async (resolve) => {
    if (moduleCache.has(path) == true) {
      return moduleCache.get(path);
    }
    
    try {
      // 1. Get code using fetch() from path:
      let absolutePath = new URL(path, window.__assetsBase).href;
      let response = await fetch(absolutePath);
      if (response.ok != true) {
        return resolve();
      }

      // 2. Convert to blob URL:
      let blobURL = URL.createObjectURL(
        new Blob([ await response.text() ], { type: "application/javascript" })
      );

      // 3. Import from blob:
      let module = await __import__(blobURL);

      // 4. Cleanup and set module cache:
      URL.revokeObjectURL(blobURL);
      moduleCache.set(path, module);
      
      resolve(module);
    } catch {
      resolve();
    }
  });
}
*/

/*
window.__assetsBase = import.meta.url;
window.resilientImport = (path) => { // Use __import__ so it's not loopback converted to itself!
  return new Promise(async (resolve) => {
    try {
      resolve(await __import__(path));
    } catch {
      if (navigator.onLine == true) {
        try {
          let absolutePath = new URL(path, window.__assetsBase).href;
          resolve(await __import__(absolutePath + "?retry=" + getEpoch()));
        } catch {
          resolve();
        }
      }
    }
  });
}
*/

export const changeGlobalImports = (global, func) => {
  func = func ?? ((key) => { return key.toLowerCase(); });
  let keys = Object.keys(global);
  let result = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    result[func(key)] = global[key];
  }
  return result;
}

let primaryButtonDown = false;
let isStylusActive = false;
export const mouseDown = () => { return primaryButtonDown; }
export const stylusActive = () => { return isStylusActive; }
document.addEventListener("pointerdown", (event) => {
  primaryButtonDown = true;
  isStylusActive = event.pointerType == "pen";
}, { capture: true, passive: false });
document.addEventListener("pointermove", (event) => {
  if (event.pointerType != "pen") {
    let flags = event.buttons != undefined ? event.buttons : event.which;
    primaryButtonDown = (flags & 1) == 1;
  } else {
    isStylusActive = true;
  }
}, { capture: true, passive: false });
document.addEventListener("pointerup", () => {
  primaryButtonDown = false;
  isStylusActive = false;
}, { capture: true, passive: false });
document.addEventListener("pointercancel", () => {
  primaryButtonDown = false;
  isStylusActive = false;
}, { capture: true, passive: false });
/*export const setPrimaryButtonState = (event) => {
  let flags = event.buttons !== undefined ? event.buttons : event.which;
  primaryButtonDown = (flags & 1) === 1;
  isStylusActive = event.pointerType == "pen";
}
document.addEventListener("pointerdown", setPrimaryButtonState, { capture: true, passive: false });
document.addEventListener("pointermove", setPrimaryButtonState, { capture: true, passive: false });
document.addEventListener("pointerup", setPrimaryButtonState, { capture: true, passive: false });*/

export const randomString = (l = 10) => {
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

let tempListeners = {};
export const addTempListener = (listen) => {
  let listenID = randomString() + Date.now();
  tempListeners[listenID] = listen;
  return listenID;
}
export const removeTempListener = (remEvent) => {
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
}
export const tempListen = (parent, listen, runFunc, extra) => {
  parent.addEventListener(listen, runFunc, extra);
  addTempListener({ type: "event", parent: parent, name: listen, listener: runFunc });
}
export const removeTempListeners = () => {
  let listenKeys = Object.keys(tempListeners);
  for (let i = 0; i < listenKeys.length; i++) {
    let remID = listenKeys[i];
    removeTempListener(tempListeners[remID]);
    delete tempListeners[remID];
  }
}

export const subscribe = (filter, callback, config) => {
  let sub = socket.subscribe(filter, callback, config);
  let callClose = sub.close;
  sub.close = () => {
    callClose();
    for (let i = 0; i < subscribes.length; i++) {
      let test = subscribes[i];
      if (test.id == sub.id) {
        subscribes.splice(i, 1);
        break;
      }
    }
  }
  subscribes.push(sub);
  return sub;
}

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms ?? 1));
}

export const appendCSS = (newRules) => {
  let ruleKeys = Object.keys(newRules);
  for (let i = 0; i < ruleKeys.length; i++) {
    let rule = ruleKeys[i];
    try {
      stylesheet.insertRule(rule + "{" + newRules[rule] + "}", stylesheet.cssRules.length);
    } catch {}
  }
}

export class PageFrame {
  isActive = () => {
    return this.loadId == currentPageLoadId;
  }
  addListener = (listen) => {
    if (this.isActive() == false) {
      return removeTempListener(listen);
    }
    return addTempListener(listen);
  }
  addEventListener = (parent, listen, runFunc, extra) => {
    if (this.isActive() == false) {
      return;
    }
    return tempListen(parent, listen, runFunc, extra);
  }
}

const loadedModules = new WeakSet();

export const newModule = async (template, parent) => {
  if (template == null) {
    return;
  }
  let templateResult = await template;
  let module;
  if (typeof templateResult != "object") {
    module = new templateResult(parent);
  } else {
    module = new (
      templateResult.Frame
      ?? templateResult.Module
      ?? templateResult.default
    )(parent);
  }
  if (module == null) {
    return;
  }
  module.newModule = function (moduleImport) {
    return newModule(moduleImport, this);
  }
  module.setFrame = function (moduleImport, frame, extra) {
    return setFrame(moduleImport, frame, extra, this);
  }
  module.setPage = function (moduleImport, extra) {
    return setPage(moduleImport, extra);
  }
  if (parent != null) {
    module.parent = parent;
  }
  if (loadedModules.has(template) == false) {
    loadedModules.add(template);
    if (module.css != null) {
      appendCSS(module.css);
    }
  }
  return module;
}

export const setFrame = async (modulePromise, frame, extra, parent) => {
  let frameSet = frame ?? app;

  extra = extra ?? {};
  
  let loadId = randomString(15) + getEpoch();
  frameSet.setAttribute("moduleloadid", loadId);

  let loadingPlacement = extra.loadingPlacement ?? frameSet;
  let oldContent = frameSet.querySelectorAll(".content:not([old])");
  for (let i = 0; i < oldContent.length; i++) {
    let remContent = oldContent[i];
    if (remContent.parentElement != frameSet) {
      continue;
    }
    remContent.setAttribute("old", "");
    remContent.style.zIndex = 0;
    setTimeout(() => {
      remContent.remove();
    }, 300);
  }

  let loading = loadingPlacement.querySelector(".loading[new]");
  let loadingTimeout;
  if (frameSet == app || extra.hideLoading != true) {
    if (loadingPlacement.querySelector(".loading:not([old])") == null && extra.showLoading != false) {
      if (oldContent.length > 0) {
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
      }
      if (loading == null) {
        loadingTimeout = setTimeout(() => {
          if (loadingPlacement == null) {
            return;
          }
          loadingPlacement.insertAdjacentHTML("beforeend", loadingAnim);
          loading = loadingPlacement.querySelector(".loading[new]");
          if (loading == null) {
            return;
          }
          if (frameSet == app) {
            loading.setAttribute("appload", "");
          } else if (
            app.querySelector(".loading[appload]") != null
            && frameSet.closest(".fixed") == null
          ) {
            loading.style.opacity = 0;
          }
          loading.removeAttribute("new");
          if (frameSet == app) {
            loading.style.position = "fixed";
            let svgHolder = loading.querySelector(".loadingSvgHolder");
            svgHolder.style.width = "100vw";
            svgHolder.style.height = "100vh";
          } else {
            loading.querySelector(".loadsvg").style.maxWidth = "75px";
          }
        }, 10);
      }
    }
  } else if (oldContent != null) {
    for (let i = 0; i < oldContent.length; i++) {
      if (oldContent[i].parentElement != frameSet) {
        continue;
      }
      oldContent[i].style.opacity = 0;
    }
  }

  let module;
  try {
    module = await newModule(await modulePromise, parent);
  } catch {}

  if (frameSet == null || frameSet.getAttribute("moduleloadid") != loadId) {
    return clearTimeout(loadingTimeout);
  }
  frameSet.removeAttribute("moduleloadid");
  if (module == null) {
    clearTimeout(loadingTimeout);
    if (loading != null) {
      loading.remove();
    }
    
    if (extra.missPageRedirect != true || config.redirectOnError == false) {
      frameSet.style.display = "flex";
      frameSet.style.justifyContent = "center";
      frameSet.style.alignItems = "center";
      frameSet.innerHTML = `<div class="content"><span style="display: block; max-width: 216px; color: var(--error)">Failed to load module, please try again later.</span></div>`;
      //delete currentlyLoadingFrames[frameSet.className];
      return;
    } else if (currentPage != defaultPage) {
      currentPage = defaultPage;
      if (loading != null) {
        loading.remove();
      }
      return setPage(defaultPage, extra);
    }
  }
  module.loadId = loadId;
  if (extra.content != null) {
    if (module.maxHeight != null) {
      extra.content.setAttribute("maxheight", module.maxHeight);
    }
  }
  let continueLoading = true;
  
  if (frameSet == app) {
    extra.from = currentPage;

    let path = extra.path ?? "";
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
  if (loading != null) { // && frameSet == app
    let svgHolder = loading.querySelector(".loadingSvgHolder");
    svgHolder.style.width = "max(" + svgHolder.clientWidth + "px, 100%)";
    svgHolder.style.height = svgHolder.clientHeight + "px";
  }
  if (continueLoading == true) {
    frameSet.insertAdjacentHTML("beforeend", `<div class="content" style="opacity: 0; transition: all .3s, max-height 0s" new>${(module.html ?? "")}</div>`);
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
      currentPageLoadId = module.loadId;
      pageTheme = module.theme;
      pageAllowsBackgroundChange = module.allowBackgroundChange ?? false;
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

  clearTimeout(loadingTimeout);
  
  if (loading != null) {
    loading.setAttribute("old", "");
    loading.style.pointerEvents = "none";
    loading.style.opacity = 0;
    setTimeout(() => {
      if (loading != null) {
        loading.remove();
      }
    }, 400);
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

const pages = changeGlobalImports(import.meta.glob("@modules/pages/**/*.js"));
export const setPage = async (path, extra) => {
  extra = extra ?? {};
  extra.path = path;

  let page = await setFrame(new Promise(async (resolve) => {
    let loadModuleFunction = pages["/src/modules/" + path + ".js"];
    if (loadModuleFunction == null) {
      return resolve();
    }
    return resolve(((await loadModuleFunction()) ?? {}).Page);
  }), null, extra);
  if (page == null) {
    return;
  }

  currentPage = path;

  if (page.title != null) {
    document.title = page.title + " | Markify";
  } else {
    document.title = "Markify";
  }
  if (favicon.href != "https://markifyapp.com/images/favicon.png") {
    favicon.href = "https://markifyapp.com/images/favicon.png";
  }
  
  return page;
}

export const goBack = () => {
  history.back();
}
window.addEventListener("popstate", (event) => {
  if (((event.state ?? {}).page ?? "") != "") {
    setPage(event.state.page, { pushHistory: false, params: event.state.params });
  }
});
/*window.addEventListener("hashchange", () => {
  let setPage = "pages/" + window.location.hash.substring(1);
  if (currentPage == setPage) {
    return;
  }
  setPage(setPage);
});*/

export const getParam = (key) => {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get(key);
}
export const modifyParams = (key, value) => {
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

export const objectUpdate = (obj, passData, path) => { // obj = Object to apply changes; passData = Object to edit
  path = path ?? "";
  if (path.length > 0) {
    path += ".";
  }
  let keys = Object.keys(obj);
  let changes = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let setValue = obj[key];
    let isObject = typeof setValue === "object" && Array.isArray(setValue) === false && setValue != null;
    if (isObject == true && setValue._ == true) {
      isObject = false;
      setValue = { ...setValue };
      delete setValue._;
    }
    if (isObject == false) {
      let checkValue = passData[key];
      if (Array.isArray(checkValue)) {
        checkValue = JSON.stringify(checkValue);
      }
      let checkNewValue = setValue;
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

export const objectEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length != keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (keys2.includes(key) == false || objectEqual(obj1[key], obj2[key]) == false) {
      return false;
    }
  }
  return true;
}

export const copyObject = (obj) => {
  if (window.structuredClone != null) {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

export const getObject = (arr, field) => {
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

export const clientPosition = (event, type) => {
  switch (type) {
    case "x":
      return Math.floor(event.clientX ?? ((event.changedTouches ?? [])[0] ?? {}).clientX ?? 0);
    case "y":
      return Math.floor(event.clientY ?? ((event.changedTouches ?? [])[0] ?? {}).clientY ?? 0);
  }
}

export const cleanString = (str) => {
  return str.replace(/\>/g, "&#62;").replace(/\</g, "&#60;");
}
export const uncleanString = (str) => {
  return str.replace(/&#62;/g, ">").replace(/&#60;/g, "<");
}

export const isValidURL = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (error) {
    return false;
  }
}

export const timeSince = (time, long) => {
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
export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
export const formatFullDate = (time) => {
  let date = new Date(time + epochOffset);
  let splitDate = date.toLocaleDateString().split("/");
  return week[date.getDay()] + ", " + months[splitDate[0] - 1] + " " + splitDate[1] + ", " + splitDate[2] + " at " + formatAMPM(date);
}

export const addS = (num = 1) => {
  if (num > 1) {
    return "s";
  }
  return "";
}

export const copyClipboardText = (text, type) => {
  navigator.clipboard.writeText(text).then(async () => {
    alertModule.open("worked", `<b>Copied</b>The ${type ?? "text"} was copied to your clipboard.`);
  }, (err) => {
    console.error("Async: Could not copy text: ", err);
  });
}
export const copyClipboardData = (data) => {
  navigator.clipboard.write(data).catch((err) => {
    console.error("Async: Could not copy: ", err);
  });
}
export const clipBoardRead = (event) => {
  event.preventDefault();
  document.execCommand("inserttext", false, event.clipboardData.getData("text/plain")); //.replace(/\n\n/g, "</br>")
}

let localDataStore = {};
export const setLocalStore = (key, data) => {
  localDataStore[key] = data;
  try {
    localStorage.setItem(key, data);
  } catch { }
}
export const getLocalStore = (key) => {
  let result = localDataStore[key];
  try {
    result = localStorage.getItem(key);
  } catch { }
  return result;
}
export const removeLocalStore = (key) => {
  if (localDataStore[key]) {
    delete localDataStore[key];
  }
  try {
    localStorage.removeItem(key);
  } catch { }
}

export const svgIconsToObject = (modules = {}) => {
  return Object.entries(modules).reduce((acc, [path, svg]) => {
    let name = path.split("/").pop().replace(".svg", "");
    acc[name] = svg;
    return acc;
  }, {});
}

export const textBoxError = async (box, error) => {
  alertModule.open("error", "<b>Invalid Input</b>" + error);
  if (box != null) {
    box.setAttribute("error", "");
    await sleep(200);
    box.removeAttribute("error");
  }
}

let epochOffset = 0;
export const getEpoch = () => {
  return Date.now() + epochOffset;
}

export const promptLogin = (page, service) => {
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
export const ensureLogin = () => {
  let token = getLocalStore("token");
  if (token == null) {
    promptLogin();
    return;
  }
  return token;
}
export const renewToken = async () => {
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
export const checkForAuth = async (prompt) => {
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

export const sendRequest = async (method, path, body, extra = {}) => {
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
    if (extra.streaming == true && extra.onChunk != null) {
      let reader = response.clone().body.getReader();
      let decoder = new TextDecoder();
      while (true) {
        let { value, done } = await reader.read();
        if (done == true) {
          break;
        } 
        await extra.onChunk(decoder.decode(value, { stream: true }));
      }
    }
    switch (response.status) {
      case 401:
        await renewToken();
        break;
      case 304:
        return [response.status, null, { took: reqTime }];
      default:
        if (response.headers.get("content-type") == "application/json") {
          let body = await response.json();
          if ((extra.allowError ?? []).includes(response.status) == false) {
            if (body.errors != null && body.errors.length > 0) {
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
        } else {
          return [response.status, response, { took: reqTime }];
        }
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
      //setFrame = () => {}
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

export const isEmbed = getParam("embed") != null;
export const updateBackground = () => {
  if ((pageAllowsBackgroundChange == false || document.fullscreenElement == null) && isEmbed == false) {
    body.style.removeProperty("background");
    app.style.removeProperty("background");
  } else {
    body.style.background = "unset";
    app.style.background = "unset";
  }
}
document.addEventListener("fullscreenchange", updateBackground);
updateBackground();

export const getTheme = () => {
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
let themeParam = getParam("theme");
export const updateTheme = () => {
  let setTheme = getTheme();
  if (themeParam != null && ["dark", "light"].includes(themeParam) == true) {
    setTheme = themeParam;
  } else if (isEmbed == true) {
    setTheme = "light";
  }
  document.documentElement.setAttribute("theme", pageTheme ?? setTheme);
  updateBackground();
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
    let affiliate = getLocalStore("affiliate") ?? "";
    if (affiliate.length > 0) {
      sendBody.affiliate = affiliate;
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
    clever: "https://clever.com/oauth/authorize?response_type=code&redirect_uri=https%3A%2F%2Fexotek.co%2Flogin%3Fclient_id%3D631056064efd34591c5a8e05%26redirect_uri%3Dhttps%253A%252F%252Fmarkifyapp.com%252F%2523dashboard%26response_type%3Dcode%26scope%3Duserinfo%26method%3Dclever&client_id=97afe7146a3017919a40&state=" + getParam("state")
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

export const getScript = (url) => {
  return document.querySelector("[src='" + url + "'");
}
export const loadScript = (url) => {
  return new Promise((resolve) => {
    let srcURL = new URL(url, window.location.origin + window.location.pathname);
    if (srcURL.host == window.location.host) {
      srcURL.searchParams.append("v", version);
    }
    let script = getScript(srcURL.href);
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
      newScript.src = srcURL.href;
      document.head.appendChild(newScript);
    }
  });
}

let wasConnected = false;
const movedPages = { dashboard: "app/dashboard", lesson: "app/lesson", join: "app/join", editor: "app/lesson" };
(async () => {
  if (typeof SimpleSocket == "undefined") { // Backup if static fails
    await loadScript("https://simplesocket.net/static/v2/simplesocket.js");
  }
  socket = new SimpleSocket({
    project_id: config.socket.project_id,
    project_token: config.socket.project_token,
    socket_url: window.socketURL ?? config.socket.socket_url
  });
  window.socket = socket;
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
  let preloadModuleFunction = pages["./modules/" + loadPage + ".js"];
  if (preloadModuleFunction != null) {
    preloadModuleFunction();
  }
  
  socket.onopen = async () => {
    if (navigator.serviceWorker != null && navigator.serviceWorker.controller != null) {
      navigator.serviceWorker.controller.postMessage({ type: "CONNECTED" });
    }

    connected = true;
    if (endStartup == true) {
      return;
    }
    dropdownModule.close();
    await init();

    // Handle Routing:
    let openPage = defaultPage;
    let path = window.location.pathname.substring(1);
    if (path == "") {
      if (userID != null && path == "") {
        openPage = "pages/app/dashboard";
      } else {
        openPage = "pages/launch";
      }
    }
    if (window.location.pathname != "/") {
      openPage = "pages/" + path;
    } else if (window.location.hash != "") {
      let hash = window.location.hash.substring(1);
      openPage = "pages/" + (movedPages[hash] ?? hash);
    }

    setPage(openPage, { pushHistory: false, replaceHistory: true, passParams: true, unsub: false, missPageRedirect: true });
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
})();

body.addEventListener("click", (event) => {
  let element = event.target;
  if (element == null) {
    return;
  }
  let alertClose = element.closest(".alertClose");
  if (alertClose != null) {
    return alertModule.close(alertClose.parentElement);
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
    setPage("pages/" + page.getAttribute("openpage"));
  }
});
window.addEventListener("scroll", () => {
  if (window.dropdown != null && window.dropdown.button != null && window.dropdown.button.closest("[noscrollclose]") == null && window.dropdown.dropdown.querySelector(".content[noscrollclose]") == null) {
    dropdownModule.close();
  }
});

// Disable Default UI Zooming:
window.addEventListener("wheel", (event) => {
  if (event.ctrlKey == true || event.metaKey == true) {
    event.preventDefault();
  }
}, { passive: false });

let currentLoading = app.querySelector(".loading[new]");
if (currentLoading != null) {
  currentLoading.setAttribute("appload", "");
}

/*if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    try {
      navigator.serviceWorker.register("/serviceworker.js").catch((err) => {
        console.log("Service Worker failed to register:", err);
      });
    } catch(err) { console.log(err); }
  });
}*/
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
});

appendCSS(coreStyles);

window.addEventListener("vite:preloadError", (event) => {
  console.warn("New deployment detected, reloading page to fetch latest version...");
  window.location.reload(); 
});

if (import.meta.hot != null) { // Forces a full page refresh only when edit happens here:
  // Decline direct edits to this file:
  import.meta.hot.decline();

  // If any imported submodule forces this file to reload, force a full page refresh:
  import.meta.hot.dispose(() => {
    window.location.reload();
  });
}

/* FULL IMPORT:

import {
  head,
  body,
  app,
  PageFrame,
  fixed,
  favicon,

  assetURL,

  userID,
  account,

  changeGlobalImports,
  mouseDown,
  appendCSS,
  setPage,
  setFrame,
  sleep,
  timeSince,
  formatFullDate,
  addS,
  getParam,
  modifyParams,
  getEpoch,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  getObject,
  copyObject,
  objectUpdate,
  objectEqual,
  getTheme,
  textBoxError,
  clipBoardRead
} from "@/crucial";

*/