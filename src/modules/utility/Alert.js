import { fixed, newModule, sleep } from "@/crucial";

import { close, alerts } from "./core-icons";

export const Alert = class {
  css = {
    ".alertHolder": `--floatMargin: 12px; position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 600px; max-width: 100%; height: fit-content; margin: calc(30px + (var(--floatMargin) * 2)) 8px 8px 8px; align-items: center; z-index: 9999`,
    ".alert": `--themeColor: rgb(var(--themeColorRGB)); position: relative; box-sizing: border-box; display: flex; max-width: 100%; transform: scale(0); opacity: 0; background: rgba(var(--background), .9); backdrop-filter: blur(4px); border-radius: 26px; pointer-events: all`, //; overflow: hidden
    ".alert:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: inherit; box-shadow: 0 0 0 2px rgba(var(--themeColorRGB), .4); pointer-events: none`,
    ".alert:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0; top: 0; border-radius: inherit; box-shadow: 0 0 8px 0 rgba(var(--themeColorRGB), .4); pointer-events: none`,
    ".alertImage": `width: 28px; height: 28px; margin-right: 4px`,
    ".alertImage > svg": `width: 100%; height: 100%; object-fit: cover`,
    ".alertImage > svg > g": `border-radius: 100px`,
    ".alertText": `display: flex; flex-wrap: wrap; flex: 1; align-items: center; text-align: left; font-size: 16px`,
    ".alertText b": `min-height: 28px; margin-right: 8px; color: var(--themeColor); font-size: 18px; align-content: center`,
    ".alertText div b": `margin-right: unset; color: unset; font-size: unset`,
    ".alertText i": `margin-left: 4px`,
    ".alertClose": `--themeColor: rgb(var(--themeColorRGB)); --hover: rgba(var(--themeColorRGB), .2); position: relative; width: 24px; height: 24px; margin: 2px 2px 2px 12px; --borderWidth: 3px; --borderRadius: 11px`,
    ".alertClose:focus-visible": `--borderWidth: 4px`,
    ".alertClose svg": `--secondary: rgb(var(--themeColorRGB)); position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`
  };
  themes = {
    info: ["var(--themeRGB)", 1, "polite"],
    worked: ["var(--greenRGB)", 3, "polite"],
    warning: ["var(--yellowRGB", 2, "assertive"],
    error: ["var(--errorRGB)", 0, "assertive"]
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
      <div class="alertImage">${alerts}</div>
      <div class="alertText"></div>
      <button class="alertClose buttonAnim border">${close}</button>
    </div>`);
    let alert = fixed.querySelector(".alert[new]");
    alert.removeAttribute("new");
    (async () => {
      if (data.id) {
        this.finished("connection");
        alert.setAttribute("alert", data.id + "_ALERT");
      }
      let theme = this.themes[type ?? "info"];
      alert.style.setProperty("--themeColorRGB", theme[0]);
      alert.querySelector(".alertImage > svg").setAttribute("viewBox", (theme[1] * 256) + " 0 1024 256");
      alert.querySelector(".alertText").innerHTML = message;
      alert.setAttribute("aria-live", theme[2] ?? "polite");
      alert.style.transition = "transform .25s var(--bounce), opacity .25s, padding .25s, margin .25s";
      alert.offsetHeight;
      alert.style.transform = "scale(1)";
      alert.style.padding = "12px";
      alert.style.marginTop = "12px";
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

export const alert = {
  open: async (type, message, data) => {
    return await (await newModule(Alert)).open(type, message, data);
  },
  close: async (alertPass) => {
    return await (await newModule(Alert)).close(alertPass);
  }
};