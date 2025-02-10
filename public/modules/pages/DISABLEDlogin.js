/*function promptLogin(page, service) {
  let randomStr = randomString(20);
  setLocalStore("state", randomStr);
  modifyParams("redirect_url");
  modifyParams("state");
  modifyParams("code");
  let redirectURL = new URL(window.location.href);
  if (page != null) {
    redirectURL.hash = "#" + page;
  }
  if (service == null) {
    modifyParams("redirect_url", encodeURIComponent(redirectURL));
    modifyParams("state", randomStr);
    app.innerHTML = "";
    return setFrame("pages/login");
  }
  if (window.promptLoginActivate == true) {
    return;
  }
  window.promptLoginActivate = true;
  let endpoint = "https://exotek.co/login?client_id=" + config.exotek_id + "&redirect_uri=" +
  encodeURIComponent(redirectURL) +
  "&response_type=code&scope=userinfo&state=" +
  randomStr;
  if (service != null) {
    modifyParams("state", randomStr);
    endpoint = authEndpoints()[service] ?? endpoint;
  }
  window.location = endpoint;
}*/

modules["pages/login"] = class {
  title = "Login";
  html = `<div class="loginBackdrop">
    <div class="loginBackground"></div>
    <img class="loginSplash" src="./images/join/splash.svg">
  </div>
  <iframe class="loginEmbed" hidden></iframe>
  `;
  css = {
    ".loginBackdrop": `position: fixed; min-width: 100%; min-height: 100vh; left: 0px; top: 0px; background: var(--pageColor)`,
    ".loginBackground": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background-image: url(./images/editor/backdrop.svg); background-size: 25px; background-position: center; opacity: .075`,
    ".loginSplash": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover`,
    ".loginEmbed": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border: none`
  };
  js = async (page) => {
    let redirectURL = decodeURIComponent(getParam("redirect_url") ?? "");
    let state = getParam("state") ?? "";

    let embedFrame = page.querySelector(".loginEmbed");

    tempListen(window, "message", async (event) => {
      if (event.source != embedFrame.contentWindow) {
        return;
      }
      if (event.data == "oauth_embed_integration") {
        event.source.postMessage("subscribe_oauth_finish", "*");
        embedFrame.removeAttribute("hidden");
        return;
      }
      let parsedData = JSON.parse(event.data);
      if (parsedData.type == "oauth_finish") {
        let parsedURL = new URL(redirectURL);
        parsedURL.searchParams.append("state", parsedData.state);
        parsedURL.searchParams.append("code", parsedData.code);
        window.location = parsedURL.toString();
      }
    });
    embedFrame.addEventListener("load", async () => {
      await sleep(1000); // Backup in case loading fails:
      embedFrame.removeAttribute("hidden");
    });
    
    embedFrame.src = "https://exotek.co/login?client_id=" + config.exotek_id + "&redirect_uri=" +
    encodeURIComponent(redirectURL) +
    "&response_type=code&scope=userinfo&state=" +
    state;
  }
}