import { Setup } from "./Setup";

import { sendRequest, copyObject, objectUpdate, textBoxError } from "@/crucial";

export class Frame extends Setup {
  step = 2;

  maxHeight = 520;

  html = `
    <div class="brooSettingsHolder">
      <div class="brooSetting" section="autopair">
        <button class="brooSettingButton" option="autopair">
          <div class="brooSettingDetails">
            <div title>AutoPair</div>
            <div info>Configure Markify to scale teams and members automatically.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <div class="brooSettingButton" option="autopairtype">
          <div class="brooSettingDetails">
            <div title>Mode</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooOptionSelector"><button set="scale">Scale Teams</button><button set="assign">Assign Members</button></div>
          </div>
        </div>
        <div class="brooSettingButton" option="autopairsize">
          <div class="brooSettingDetails">
            <div title>Team Size</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooOptionSelector"><button set="1">Solo</button><button set="2">Duo</button><button set="3">Trio</button><button set="4">Custom</button></div>
            <div class="brooCounterSelector"><button minus>-</button><div count contenteditable></div><button plus>+</button></div>
          </div>
        </div>
        <div class="brooSettingButton" option="autopairgroups">
          <div class="brooSettingDetails">
            <div title>Number of Teams</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooCounterSelector"><button minus>-</button><div count max="100" contenteditable></div><button plus>+</button></div>
          </div>
        </div>
        <!--<button class="brooSettingButton" option="autopairpastgrouping">
          <div class="brooSettingDetails">
            <div title>Use Past Groupings</div>
            <div info>Uses data from past Breakout sessions to pair the same members together.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>-->
      </div>
      <div class="brooSetting" section="pickteam">
        <button class="brooSettingButton" option="pickteam">
          <div class="brooSettingDetails">
            <div title>Pick Team</div>
            <div info>Let members choose their team.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <button class="brooSettingButton" option="changeteam">
          <div class="brooSettingDetails">
            <div title>Change Teams</div>
            <div info>Allow members to change between teams after joining.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <button class="brooSettingButton" option="createteam">
          <div class="brooSettingDetails">
            <div title>Create a Team</div>
            <div info>Allow members to create their own team.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
        <div class="brooSettingButton" option="maxteamsize">
          <div class="brooSettingDetails">
            <div title>Max Team Size</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div class="brooCounterSelector"><button reset>Reset</button><button minus>-</button><div count min="0" contenteditable></div><button plus>+</button></div>
          </div>
        </div>
      </div>
      <div class="brooSetting">
        <button class="brooSettingButton" option="gallerywalk">
          <div class="brooSettingDetails">
            <div title>Gallery Walk</div>
            <div info>Allow members to see other team's work for ideas and inspiration.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
      </div>
      <div class="brooSetting">
        <button class="brooSettingButton" option="setteamname">
          <div class="brooSettingDetails">
            <div title>Change Team Name</div>
            <div info>Allow members to change the team's name.</div>
          </div>
          <div class="brooSettingToggleHolder">
            <div toggle><div></div></div>
          </div>
        </button>
      </div>
    </div>
    ${this.progressFooter}
  `;

  css = {
    ".brooSettingsHolder": `position: relative; display: flex; flex-direction: column; gap: 16px; width: 400px; max-width: calc(100% - 32px); padding: 16px; text-align: center; align-items: center; z-index: 1`,
    ".brooSetting": `display: flex; flex-direction: column; box-sizing: border-box; width: 100%`,
    ".brooSettingButton": `display: flex; flex-wrap: wrap; gap: 8px; flex: 1; padding: 8px; justify-content: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 24px`,
    ".brooSettingButton[enabled]": `--themeColor: var(--theme); --titleBackground: var(--theme); --titleColor: #fff`,
    ".brooSettingButton:not([enabled])": `--themeColor: var(--gray); --titleBackground: var(--pageColor); --titleColor: var(--theme)`,
    ".brooSetting[open] .brooSettingButton:not(:last-child)": `margin-bottom: 8px; border-bottom-right-radius: 8px`,
    ".brooSetting .brooSettingButton:not(:first-child)": `margin-left: min(25px, 10%); border-top-left-radius: 8px; border-top-right-radius: 8px`,
    ".brooSetting .brooSettingButton:not(:first-child):not(:last-child)": `border-bottom-left-radius: 8px`,
    ".brooSetting:not([open]) .brooSettingButton:not(:first-child)": `display: none`,
    ".brooSettingDetails": `display: flex; flex-direction: column; flex: 1 1 100px`,
    ".brooSettingDetails div[title]": `width: fit-content; padding: 4px 8px; background: var(--titleBackground); box-shadow: var(--lightShadow); font-size: 20px; font-weight: 700; color: var(--titleColor); word-wrap: break-word; border-radius: 16px; transition: .2s`,
    ".brooSettingDetails div[info]": `margin: 6px 0 0 12px; font-size: 14px; text-align: left`,
    ".brooSettingToggleHolder div[toggle]": `position: relative; box-sizing: border-box; width: 50px; height: 32px; padding: 4px; background: var(--themeColor); border-radius: 16px; transition: .2s`,
    ".brooSettingToggleHolder div[toggle] div": `position: absolute; width: 24px; height: 24px; background: var(--pageColor); border-radius: 12px; transition: .2s`,
    ".brooSettingButton[enabled] .brooSettingToggleHolder div[toggle] div": `right: 4px`,
    ".brooSettingButton:not([enabled]) .brooSettingToggleHolder div[toggle] div": `right: calc(100% - 28px)`,
    ".brooOptionSelector": `display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; justify-content: center`,
    ".brooOptionSelector button": `min-height: 24px; padding: 0 6px; align-content: center; border-radius: 12px; font-size: 14px; font-weight: 600`,
    ".brooOptionSelector button:hover": `background: var(--hover)`,
    ".brooOptionSelector button[selected]": `background: var(--theme) !important; color: #fff !important`,
    ".brooCounterSelector": `display: flex; flex-wrap: wrap; gap: 4px; padding: 4px; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 16px; justify-content: center`,
    ".brooCounterSelector button": `display: flex; width: 24px; height: 24px; justify-content: center; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); color: var(--theme); font-size: 26px; font-weight: 600; line-height: 0`,
    ".brooCounterSelector button:hover": `background: var(--theme); color: #fff !important`,
    ".brooCounterSelector button[reset]": `display: none; width: fit-content; border-radius: 12px; color: var(--textColor); font-size: 14px; font-weight: 600`,
    ".brooCounterSelector button[minus]": `border-radius: 12px 6px 6px 12px`,
    ".brooCounterSelector button[plus]": `border-radius: 6px 12px 12px 6px`,
    ".brooCounterSelector div[count]": `min-width: 16px; max-width: 32px; height: 24px; padding: 0 8px; align-content: center; background: var(--theme); border-radius: 6px; outline: unset; color: #fff; font-size: 16px; font-weight: 700; white-space: nowrap; overflow-x: auto; scrollbar-width: none; pointer-events: all !important`,
    ...this.progressFooterStyles
  };

  updateDisplayState(set = {}) {
    if (set.breakout != null) {
      objectUpdate(set.breakout, this.config);
    }

    if (this.config.auto != null && this.config.auto.enabled != false) {
      this.autoPairOption.setAttribute("enabled", "");
      
      let type = this.config.auto.type ?? "scale";
      let prevSelectedTypeOption = this.autoPairTypeOption.querySelector("button[set][selected]");
      if (prevSelectedTypeOption != null) {
        prevSelectedTypeOption.removeAttribute("selected");
      }
      if (type != null) {
        let selectedTypeOption = this.autoPairTypeOption.querySelector('button[set="' + type + '"]');
        if (selectedTypeOption != null) {
          selectedTypeOption.setAttribute("selected", "");
        }
      }
      if (type == "scale") {
        let size = this.config.auto.size ?? 1;
        let prevSelectedSizeOption = this.autoPairSizeOptions.querySelector("button[set][selected]");
        if (prevSelectedSizeOption != null) {
          prevSelectedSizeOption.removeAttribute("selected");
        }
        if (size < 4) {
          let selectedOption = this.autoPairSizeOptions.querySelector('button[set="' + size + '"]');
          if (selectedOption != null) {
            selectedOption.setAttribute("selected", "");
          }
          this.autoPairSizeCounter.style.display = "none";
          this.autoPairSizeOptions.style.removeProperty("display");
        } else {
          if (document.activeElement != this.autoPairSizeCount) {
            this.autoPairSizeCount.textContent = size;
          }
          this.autoPairSizeOptions.style.display = "none";
          this.autoPairSizeCounter.style.removeProperty("display");
        }

        this.autoPairSection.insertBefore(this.autoPairGroupsOption, this.autoPairSizeOption);
        this.autoPairGroupsOption.style.display = "none";
        this.autoPairSizeOption.style.removeProperty("display");
      } else if (type == "assign") {
        let groups = this.config.auto.groups ?? 1;
        if (document.activeElement != this.autoPairGroupsCount) {
          this.autoPairGroupsCount.textContent = groups;
        }
        if (groups < 2) {
          this.autoPairGroupsCounter.querySelector("button[minus]").setAttribute("disabled", "");
        } else {
          this.autoPairGroupsCounter.querySelector("button[minus]").removeAttribute("disabled");
        }
        if (groups > 99) {
          this.autoPairGroupsCounter.querySelector("button[plus]").setAttribute("disabled", "");
        } else {
          this.autoPairGroupsCounter.querySelector("button[plus]").removeAttribute("disabled");
        }

        this.autoPairSection.insertBefore(this.autoPairSizeOption, this.autoPairGroupsOption);
        this.autoPairSizeOption.style.display = "none";
        this.autoPairGroupsOption.style.removeProperty("display");
      }

      /*if (this.config.auto.usePastGrouping == true) {
        this.autoPairUsePastGroupingOption.setAttribute("enabled", "");
      } else {
        this.autoPairUsePastGroupingOption.removeAttribute("enabled");
      }*/

      this.autoPairSection.setAttribute("open", "");
    } else {
      this.autoPairSection.removeAttribute("open");
      this.autoPairOption.removeAttribute("enabled");
    }

    if ((this.config.options ?? {}).pickTeam == true) {
      this.pickTeamOption.setAttribute("enabled", "");

      if (this.config.options.changeTeam == true) {
        this.changeTeamOption.setAttribute("enabled", "");
      } else {
        this.changeTeamOption.removeAttribute("enabled");
      }
      if (this.config.options.createTeam == true) {
        this.createTeamOption.setAttribute("enabled", "");
      } else {
        this.createTeamOption.removeAttribute("enabled");
      }
      let maxSize = this.config.options.maxSize ?? 0;
      if (document.activeElement != this.maxTeamSizeCount) {
        this.maxTeamSizeCount.textContent = maxSize;
      }
      if (maxSize < 1) {
        this.maxTeamSizeCount.setAttribute("disabled", "");
        this.maxTeamSizeCounter.querySelector("button[minus]").setAttribute("disabled", "");
        this.maxTeamSizeCounter.querySelector("button[reset]").style.removeProperty("display");
      } else {
        this.maxTeamSizeCount.removeAttribute("disabled");
        this.maxTeamSizeCounter.querySelector("button[minus]").removeAttribute("disabled");
        this.maxTeamSizeCounter.querySelector("button[reset]").style.display = "flex";
      }

      this.pickTeamSection.setAttribute("open", "");
    } else {
      this.pickTeamSection.removeAttribute("open");
      this.pickTeamOption.removeAttribute("enabled");
    }

    if ((this.config.options ?? {}).galleryWalk == true) {
      this.galleryWalkOption.setAttribute("enabled", "");
    } else {
      this.galleryWalkOption.removeAttribute("enabled");
    }

    if ((this.config.options ?? {}).setTeamName == true) {
      this.setTeamNameOption.setAttribute("enabled", "");
    } else {
      this.setTeamNameOption.removeAttribute("enabled");
    }
  }

  async saveOption() {
    let currentConfig = this.parent.parent.parent.lesson.breakout ?? {};
    let tempRevert = copyObject(currentConfig);
    let changes = objectUpdate(this.config, copyObject(currentConfig));
    if (Object.keys(changes).length > 0) {
      let [code] = await sendRequest("PUT", "lessons/breakout/settings", { save: changes }, { session: this.parent.parent.session });
      if (code != 200) {
        this.config = tempRevert;
        objectUpdate(this.config, this.parent.parent.parent.lesson.breakout);
        this.updateDisplayState();
      }
    }
  }
  async savePreferences(delay) {
    this.updateDisplayState();
    clearTimeout(this.saveOptionsTimeout);
    if (delay != true) {
      return await this.saveOption();
    }
    this.saveOptionsTimeout = setTimeout(() => { this.saveOption(); }, 2000); // Save after 2 seconds of no changes
  }
  
  js(frame, extra = {}) {
    this.parent = extra.parent;

    if (extra.editing != true) {
      this.setupFooter(extra);
    } else {
      frame.querySelector(".brSetupProgress").remove();
    }

    this.holder = frame.querySelector(".brooSettingsHolder");

    this.autoPairSection = this.holder.querySelector('.brooSetting[section="autopair"]');
    this.autoPairOption = this.autoPairSection.querySelector('.brooSettingButton[option="autopair"]');
    this.autoPairTypeOption = this.autoPairSection.querySelector('.brooSettingButton[option="autopairtype"]');
    this.autoPairSizeOption = this.autoPairSection.querySelector('.brooSettingButton[option="autopairsize"]');
    this.autoPairSizeOptions = this.autoPairSizeOption.querySelector(".brooOptionSelector");
    this.autoPairSizeCounter = this.autoPairSizeOption.querySelector(".brooCounterSelector");
    this.autoPairSizeCount = this.autoPairSizeCounter.querySelector("div[count]");
    this.autoPairGroupsOption = this.autoPairSection.querySelector('.brooSettingButton[option="autopairgroups"]');
    this.autoPairGroupsCounter = this.autoPairGroupsOption.querySelector(".brooCounterSelector");
    this.autoPairGroupsCount = this.autoPairGroupsCounter.querySelector("div[count]");
    //this.autoPairUsePastGroupingOption = this.autoPairSection.querySelector('.brooSettingButton[option="autopairpastgrouping"]');

    this.pickTeamSection = this.holder.querySelector('.brooSetting[section="pickteam"]');
    this.pickTeamOption = this.pickTeamSection.querySelector('.brooSettingButton[option="pickteam"]');
    this.changeTeamOption = this.pickTeamSection.querySelector('.brooSettingButton[option="changeteam"]');
    this.createTeamOption = this.pickTeamSection.querySelector('.brooSettingButton[option="createteam"]');
    this.maxTeamSizeOption = this.pickTeamSection.querySelector('.brooSettingButton[option="maxteamsize"]');
    this.maxTeamSizeCounter = this.maxTeamSizeOption.querySelector(".brooCounterSelector");
    this.maxTeamSizeCount = this.maxTeamSizeCounter.querySelector("div[count]");

    this.galleryWalkOption = frame.querySelector('.brooSettingButton[option="gallerywalk"]');

    this.setTeamNameOption = frame.querySelector('.brooSettingButton[option="setteamname"]');

    this.config = copyObject(this.parent.parent.parent.lesson.breakout ?? {});

    this.parent.pipeline.subscribe("newBreakoutModalSet", "set", (body) => { this.updateDisplayState(body); }, { sort: 2 });

    this.autoPairOption.addEventListener("click", () => {
      this.config.auto = this.config.auto ?? {};
      this.config.auto.enabled = !this.autoPairOption.hasAttribute("enabled");
      this.savePreferences();
    });
    this.autoPairTypeOption.addEventListener("click", (event) => {
      let option = event.target.closest("button[set]");
      if (option == null) {
        return;
      }
      this.config.auto = this.config.auto ?? {};
      this.config.auto.type = option.getAttribute("set");
      this.savePreferences();
    });
    this.autoPairSizeOption.addEventListener("click", (event) => {
      let option = event.target.closest("button[set]");
      if (option == null) {
        return;
      }
      this.config.auto = this.config.auto ?? {};
      this.config.auto.size = parseInt(option.getAttribute("set"));
      this.savePreferences();
    });
    this.autoPairSizeCounter.querySelector("button[minus]").addEventListener("click", () => {
      this.config.auto = this.config.auto ?? {};
      this.config.auto.size = (this.config.auto.size ?? 0) - 1;
      this.savePreferences(true);
    });
    this.autoPairSizeCount.addEventListener("focusout", () => {
      this.config.auto = this.config.auto ?? {};
      let textInt = parseFloat(this.autoPairSizeCount.textContent) || (this.config.auto.size ?? 0);
      if (this.autoPairSizeCount.hasAttribute("max") == true && textInt > parseFloat(this.autoPairSizeCount.getAttribute("max"))) {
        textInt = this.autoPairSizeCount.getAttribute("max");
      } else if (textInt < 1) {
        textInt = 1;
      }
      this.config.auto.size = textInt;
      this.savePreferences();
    });
    this.autoPairSizeCounter.querySelector("button[plus]").addEventListener("click", () => {
      this.config.auto = this.config.auto ?? {};
      this.config.auto.size = (this.config.auto.size ?? 0) + 1;
      this.savePreferences(true);
    });
    this.autoPairGroupsCounter.querySelector("button[minus]").addEventListener("click", () => {
      this.config.auto = this.config.auto ?? {};
      this.config.auto.groups = (this.config.auto.groups ?? 0) - 1;
      this.savePreferences(true);
    });
    this.autoPairGroupsCount.addEventListener("focusout", () => {
      this.config.auto = this.config.auto ?? {};
      let textInt = parseFloat(this.autoPairGroupsCount.textContent) || (this.config.auto.groups ?? 0);
      if (this.autoPairGroupsCount.hasAttribute("max") == true && textInt > parseFloat(this.autoPairGroupsCount.getAttribute("max"))) {
        textInt = this.autoPairGroupsCount.getAttribute("max");
      } else if (textInt < 1) {
        textInt = 1;
      }
      this.config.auto.groups = textInt;
      this.savePreferences();
    });
    this.autoPairGroupsCounter.querySelector("button[plus]").addEventListener("click", () => {
      this.config.auto = this.config.auto ?? {};
      this.config.auto.groups = (this.config.auto.groups ?? 0) + 1;
      this.savePreferences(true);
    });
    /*this.autoPairUsePastGroupingOption.addEventListener("click", () => {
      this.config.auto = this.config.auto ?? {};
      this.config.auto.usePastGrouping = !this.autoPairUsePastGroupingOption.hasAttribute("enabled");
      this.savePreferences();
    });*/

    this.pickTeamOption.addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.pickTeam = !this.pickTeamOption.hasAttribute("enabled");
      this.savePreferences();
    });
    this.changeTeamOption.addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.changeTeam = !this.changeTeamOption.hasAttribute("enabled");
      this.savePreferences();
    });
    this.createTeamOption.addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.createTeam = !this.createTeamOption.hasAttribute("enabled");
      this.savePreferences();
    });
    this.maxTeamSizeCounter.querySelector("button[reset]").addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.maxSize = 0;
      this.savePreferences(true);
    });
    this.maxTeamSizeCounter.querySelector("button[minus]").addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.maxSize = (this.config.options.maxSize ?? 0) - 1;
      this.savePreferences(true);
    });
    this.maxTeamSizeCount.addEventListener("focusout", () => {
      this.config.options = this.config.options ?? {};
      let textInt = parseFloat(this.maxTeamSizeCount.textContent) || (this.config.options.maxSize ?? 0);
      if (this.maxTeamSizeCount.hasAttribute("max") == true && textInt > parseFloat(this.maxTeamSizeCount.getAttribute("max"))) {
        textInt = this.maxTeamSizeCount.getAttribute("max");
      } else if (textInt < 1) {
        textInt = 0;
      }
      this.config.options.maxSize = textInt;
      this.savePreferences();
    });
    this.maxTeamSizeCounter.querySelector("button[plus]").addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.maxSize = (this.config.options.maxSize ?? 0) + 1;
      this.savePreferences(true);
    });

    this.galleryWalkOption.addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.galleryWalk = !this.galleryWalkOption.hasAttribute("enabled");
      this.savePreferences();
    });

    this.setTeamNameOption.addEventListener("click", () => {
      this.config.options = this.config.options ?? {};
      this.config.options.setTeamName = !this.setTeamNameOption.hasAttribute("enabled");
      this.savePreferences();
    });

    this.holder.addEventListener("mousedown", (event) => {
      let textBox = event.target.closest("div[count]");
      if (textBox == null) {
        return;
      }
      textBox.textContent = "";
      textBox.removeAttribute("disabled");
    });
    this.holder.addEventListener("keydown", (event) => {
      let textBox = event.target.closest("div[count]");
      if (textBox == null) {
        return;
      }
      if (event.key == "Enter") {
        event.preventDefault();
        return;
      }
      if (String.fromCharCode(event.keyCode).match(/(\w|\s)/g) && event.key.length == 1) {
        let textInt = parseInt(textBox.textContent + event.key);
        if (parseInt(event.key) != event.key && (event.keyCode != 190 || textBox.hasAttribute("nodecimal"))) {
          event.preventDefault();
          textBoxError(textBox, "Must be a number");
        } else if (textBox.hasAttribute("max") == true && textInt > parseFloat(textBox.getAttribute("max"))) {
          event.preventDefault();
          textBoxError(textBox, "Must be less than or equal to " + textBox.getAttribute("max"));
        } else if (textInt < parseFloat(textBox.getAttribute("min") ?? "1")) {
          event.preventDefault();
          textBoxError(textBox, "Must be greater than 1");
        }
      }
    });

    this.updateDisplayState();
  }
}