import { Setup } from "./Setup";

import { assetURL, timeSince, formatFullDate, addS, getParam, modifyParams, sendRequest } from "@/crucial";

import missingIcon from "@assets/lesson/breakout/setup/error.svg?raw";
import checkIcon from "@assets/lesson/breakout/setup/check.svg?raw";

export class Frame extends Setup {
  step = 3;

  html = `
    <div class="brorHolder">
      <div class="brorInstructions">
        <div class="brorTitle">Review & <b>Breakout</b></div>
        <div class="brorDesc">Does everything look good?</div>
      </div>
      <div class="brorTiles">
        <button class="brorTile" type="template">
          <div missing><div image>${missingIcon}</div><div><b>Template Missing</b> Please add a template to continue.</div></div>
          <div template hidden><div image><img src="../images/dashboard/placeholder.png"></div><div content><div name></div><div info></div></div></div>
        </button>
        <button class="brorTile" type="setup">
          <div></div>
        </button>
        <button class="brorTile" type="settings">
          <div unset>No additional options enabled...</div>
          <div option="pickTeam"><div check>${checkIcon}</div><div>Members can choose their team.</div></div>
          <div option="changeTeam"><div check>${checkIcon}</div><div>Members can change teams.</div></div>
          <div option="createTeam"><div check>${checkIcon}</div><div>Members can create a new team.</div></div>
          <div option="maxSize"><div check>${checkIcon}</div><div>Max team size of <b></b>.</div></div>
          <div option="galleryWalk"><div check>${checkIcon}</div><div>Members can see other team's work.</div></div>
          <div option="setTeamName"><div check>${checkIcon}</div><div>Members can change the team name.</div></div>
        </button>
      </div>
      <button class="brorCreateTeams largeButton" disabled>Finish Setup</button>
    </div>
    ${this.progressFooter}
  `;

  css = {
    ".brorHolder": `position: relative; display: flex; flex-direction: column; max-width: calc(100% - 16px); padding: 8px; text-align: center; align-items: center; z-index: 1`,
    ".brorInstructions": `box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 8px; align-items: center`,
    ".brorTitle": `max-width: 100%; font-size: 24px; font-weight: 500`,
    ".brorTitle b": `color: var(--theme); font-weight: 700`,
    ".brorDesc": `width: 325px; max-width: 100%; margin-top: 6px; font-size: 16px`,
    ".brorTiles": `box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 8px; align-items: center`,
    ".brorTile": `width: 300px; max-width: 100%; padding: 12px; text-align: left; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 10px`,
    ".brorTile:hover": `box-shadow: var(--darkShadow)`,
    ".brorTile:first-child": `border-top-left-radius: 20px; border-top-right-radius: 20px`,
    ".brorTile:last-child": `border-bottom-left-radius: 20px; border-bottom-right-radius: 20px`,

    '.brorTile[type="template"] div[missing]': `display: none; gap: 4px; align-items: center`,
    '.brorTile[type="template"] div[missing] div[image]': `width: 32px; height: 32px; margin: 4px; flex-shrink: 0`,
    '.brorTile[type="template"] div[missing] div[image] svg': `width: 100%; height: 100%`,
    '.brorTile[type="template"] div[missing] div b': `display: block; margin-bottom: 2px; font-size: 16px; color: var(--error)`,
    '.brorTile[type="template"] div[template]': `display: none; flex-wrap: wrap; gap: 12px; transition: .2s`,
    '.brorTile[type="template"] div[template] div[image]': `height: fit-content; padding: 4px; box-shadow: inset var(--lightShadow); border-radius: 12px`,
    '.brorTile[type="template"] div[template] div[image] img': `display: block; width: 80px; height: 60px; object-fit: cover; border-radius: 8px`,
    '.brorTile[type="template"] div[template] div[content]': `display: flex; flex: 1 1 100px; flex-direction: column; gap: 4px; justify-content: center`,
    '.brorTile[type="template"] div[template] div[content] div[name]': `font-size: 18px; font-weight: 700; color: var(--theme)`,
    '.brorTile[type="template"] div[template] div[content] div[info]': `font-weight: 600`,

    '.brorTile[type="setup"] div': `font-size: 14px; text-align: center`,
    '.brorTile[type="setup"] div b': `color: var(--theme)`,

    '.brorTile[type="settings"] div[unset]': `display: none; font-size: 14px; text-align: center`,
    '.brorTile[type="settings"] div[option]': `display: none; gap: 4px; align-items: flex-start`,
    '.brorTile[type="settings"] div[option] div[check]': `width: 20px; height: 20px; flex-shrink: 0`,
    '.brorTile[type="settings"] div[option] div[check] svg': `width: 100%; height: 100%`,
    '.brorTile[type="settings"] div[option] div': `min-height: 20px; font-size: 13px; align-content: center`,

    ".brorCreateTeams": `--themeColor: var(--theme); --borderRadius: 14px; margin: 16px 0 8px 0`,
    ...this.progressFooterStyles
  };

  async updateDisplayState() {
    let config = this.parent.parent.parent.lesson.breakout ?? {};

    if (config.template != null) {
      (async () => {
        let template = await this.parent.getTemplate();
        if (template.thumbnail != null) {
          this.templateImage.src = assetURL + template.thumbnail;
        }
        let titleText = template.name ?? "Untitled Template";
        this.templateName.textContent = titleText;
        this.templateName.title = titleText;
        let time = template.lastThumbnail ?? template.created;
        this.templateInfo.textContent = timeSince(time, true);
        this.templateInfo.title = formatFullDate(time);
        this.templateHolder.removeAttribute("hidden");
      })();
      this.templateMissing.style.removeProperty("display");
      this.templateHolder.style.display = "flex";
      this.createTeamsButton.removeAttribute("disabled");
    } else {
      this.templateHolder.style.removeProperty("display");
      this.templateMissing.style.display = "flex";
      this.createTeamsButton.setAttribute("disabled", "");
    }

    let options = { ...(config.options ?? {}) };

    if (options.pickTeam != true) {
      delete options.changeTeam;
      delete options.createTeam;
      delete options.maxSize;
      if (config.auto != null && config.auto.enabled != false) {
        if (config.auto.type != "assign") {
          this.setupContent.innerHTML = "Markify will put <b size></b> into a team and create new teams <b>automatically</b>.";
          let size = config.auto.size ?? 1;
          this.setupContent.querySelector("b[size]").textContent = size + " member" + addS(size);
        } else {
          this.setupContent.innerHTML = "Markify will create <b groups>10 teams</b> and assign members <b>equally</b> into them.";
          let groups = config.auto.groups ?? 1;
          this.setupContent.querySelector("b[groups]").textContent = groups + " team" + addS(groups);
        }
      } else {
        this.setupContent.innerHTML = "You will be required to <b>create teams</b> and <b>assign members</b> into each.";
      }
    } else {
      if (config.auto != null && config.auto.enabled != false) {
        if (config.auto.type != "assign") {
          this.setupContent.innerHTML = "Markify will create enough teams to fit <b size></b> in each, then allow members to <b>choose their team</b>.";
          let size = config.auto.size ?? 1;
          this.setupContent.querySelector("b[size]").textContent = size + " member" + addS(size);
        } else {
          this.setupContent.innerHTML = "Markify will create <b groups></b>, then allow members to <b>choose their team</b>.";
          let groups = config.auto.groups ?? 1;
          this.setupContent.querySelector("b[groups]").textContent = groups + " team" + addS(groups);
        }
      } else {
        this.setupContent.innerHTML = "<div>Members will be asked to <b>create a team</b> or join an <b>existing team</b>.</div>";
      }
    }

    let enabledCount = 0;
    for (let i = 0; i < this.settingsOptions.length; i++) {
      let option = this.settingsOptions[i];
      let setting = option.getAttribute("option");
      if ((options[setting] ?? false) == false) {
        option.style.removeProperty("display");
      } else {
        option.style.display = "flex";
        if (setting == "maxSize") {
          let maxSize = options.maxSize ?? 1;
          option.querySelector("b").textContent = maxSize + " member" + addS(maxSize);
        }
        enabledCount++;
      }
    }
    if (enabledCount > 0) {
      this.settingsUnset.style.removeProperty("display");
    } else {
      this.settingsUnset.style.display = "block";
    }
  }

  js(frame, extra) {
    this.parent = extra.parent;

    this.sections = frame.querySelector(".brorTiles");
    this.templateSection = this.sections.querySelector('.brorTile[type="template"]');
    this.templateMissing = this.templateSection.querySelector("div[missing]");
    this.templateHolder = this.templateSection.querySelector("div[template]");
    this.templateImage = this.templateHolder.querySelector("div[image] img");
    this.templateName = this.templateHolder.querySelector("div[name]");
    this.templateInfo = this.templateHolder.querySelector("div[info]");
    this.setupSection = this.sections.querySelector('.brorTile[type="setup"]');
    this.setupContent = this.setupSection.querySelector("div");
    this.settingsSection = this.sections.querySelector('.brorTile[type="settings"]');
    this.settingsUnset = this.settingsSection.querySelector("div[unset]");
    this.settingsOptions = this.settingsSection.querySelectorAll("div[option]");

    this.createTeamsButton = frame.querySelector(".brorCreateTeams");

    this.parent.pipeline.subscribe("newBreakoutModalSet", "set", () => { this.updateDisplayState(); }, { sort: 2 });
    this.parent.pipeline.subscribe("newBreakoutModalSubSet", "subset", () => { this.updateDisplayState(); }, { sort: 2 });
    this.updateDisplayState();

    // Handle Buttons:
    this.templateSection.addEventListener("click", () => {
      this.open(this.steps[0], this.modal.backButton, { parent: this.parent, title: "Start a Breakout", animateBack: true });
    });
    this.setupSection.addEventListener("click", () => {
      this.open(this.steps[1], this.modal.backButton, { parent: this.parent, title: "Start a Breakout", animateBack: true });
    });
    this.settingsSection.addEventListener("click", () => {
      this.open(this.steps[2], this.modal.backButton, { parent: this.parent, title: "Start a Breakout", animateBack: true });
    });

    this.createTeamsButton.addEventListener("click", async () => {
      this.createTeamsButton.setAttribute("disabled", "");
      let params = [];
      let folder = getParam("folder");
      if (folder != null) {
        params.push("folder=" + folder);
      }
      let path = "lessons/breakout/create";
      if (params.length > 0) {
        path += "?" + params.join("&");
      }
      let [code] = await sendRequest("PUT", path, null, { session: this.parent.parent.session });
      this.createTeamsButton.removeAttribute("disabled");
      if (code == 200) {
        if (this.parent.parent.parent.lesson.tool.includes("breakout") == false) {
          this.parent.parent.parent.lesson.tool.push("breakout");
        }
        modifyParams("lesson", this.parent.parent.parent.id);
        this.close();
        modifyParams("folder");
        modifyParams("type");
      }
    });

    this.setupFooter(extra);
  }
}