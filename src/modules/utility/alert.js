import { fixed, newModule, sleep } from "@/crucial";

import { close, alerts } from "./CoreIcons";

export const Alert = class {
  css = {
    ".alertHolder": `--floatMargin: 12px; position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 600px; max-width: 100%; height: fit-content; margin: calc(34px + (var(--floatMargin) * 2)) 8px 8px 8px; align-items: center; z-index: 9999`,
    ".alert": `box-sizing: border-box; display: flex; max-width: 100%; transform: scale(0); opacity: 0; background: var(--pageColor); border-radius: 12px; box-shadow: var(--darkShadow); pointer-events: all; overflow: hidden`,
    ".alertImage": `width: 32px; height: 32px; margin-right: 6px`,
    ".alertImage > svg": `width: 100%; height: 100%; object-fit: cover`,
    ".alertText": `display: flex; flex-wrap: wrap; flex: 1; align-items: center; text-align: left; font-size: 16px`,
    ".alertText b": `margin-right: 6px; color: var(--themeColor); font-size: 18px`,
    ".alertText div b": `margin-right: unset; color: unset; font-size: unset`,
    ".alertText i": `margin-left: 4px`,
    ".alertClose": `position: relative; width: 24px; height: 24px; margin: 5px 5px 5px 12px; --borderWidth: 3px; --borderRadius: 11px`,
    ".alertClose:focus-visible": `--borderWidth: 4px`,
    ".alertClose svg": `position: absolute; width: calc(100% - 10px); height: calc(100% - 10px); left: 5px; top: 5px`
  };
  themes = {
    info: ["var(--theme)", 1, "polite"],
    worked: ["var(--green)", 3, "polite"],
    warning: ["var(--yellow", 2, "assertive"],
    error: ["var(--error)", 0, "assertive"]
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
      alert.style.setProperty("--themeColor", theme[0]);
      alert.querySelector(".alertImage > svg").setAttribute("viewBox", (theme[1] * 256) + " 0 1024 256");
      alert.querySelector(".alertText").innerHTML = message;
      alert.setAttribute("aria-live", theme[2] ?? "polite");
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

export default {
  open: async (type, message, data) => {
    return await (await newModule(Alert)).open(type, message, data);
  },
  close: async (alertPass) => {
    return await (await newModule(Alert)).close(alertPass);
  }
};