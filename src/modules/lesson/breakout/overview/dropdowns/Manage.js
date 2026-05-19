import { assetURL } from "@/crucial";

import groupSettingsIcon from "@assets/lesson/breakout/manage/groupsettings.svg?raw";
import memberSettingsIcon from "@assets/lesson/breakout/manage/membersettings.svg?raw";
import rotateMembersIcon from "@assets/lesson/breakout/manage/rotatemembers.svg?raw";
import moveMembersRandomlyIcon from "@assets/lesson/breakout/manage/movemembersrandomly.svg?raw";

export class Frame {
  maxHeight = 450;

  html = `
  <div class="broManageTilesHolder">
    <div class="broManageTiles">
      <button class="broManageTile" type="template">
        <div class="broManageTileContent">
          <div title>Modify Template</div>
          <div info>Update the template and push changes to teams.</div>
        </div>
        <div class="broManageTileImage" style="box-shadow: inset var(--lightShadow)">
          <img src="../images/dashboard/placeholder.png" style="height: 60px">
        </div>
      </button>
      <button class="broManageTile" type="groupsettings" dropdowntitle="Team Settings">
        <div class="broManageTileContent">
          <div title>Team Settings</div>
          <div info>Configure AutoPair, permissions, and more.</div>
        </div>
        <div class="broManageTileImage">${groupSettingsIcon}</div>
      </button>
      <button class="broManageTile" type="membersettings" dropdowntitle="Member Settings">
        <div class="broManageTileContent">
          <div title>Member Settings</div>
          <div info>Configure member settings and tool toggle.</div>
        </div>
        <div class="broManageTileImage">${memberSettingsIcon}</div>
      </button>
    </div>
    <div class="broManageTiles">
      <button class="broManageTile" type="rotatemembersclockwise" disabled>
        <div class="broManageTileImage">${rotateMembersIcon}</div>
        <div class="broManageTileContent">
          <div title>Coming Soon</div> <!--Rotate Clockwise-->
          <div info>Move each team's members to the next team.</div>
        </div>
      </button>
      <button class="broManageTile" type="rotatememberscounterclockwise" disabled>
        <div class="broManageTileImage" style="transform: scaleX(-1)">${rotateMembersIcon}</div>
        <div class="broManageTileContent">
          <div title>Coming Soon</div> <!--Rotate Counterclockwise-->
          <div info>Move each team's members to the previous team.</div>
        </div>
      </button>
      <button class="broManageTile" type="movemembersrandomly" disabled>
        <div class="broManageTileImage">${moveMembersRandomlyIcon}</div>
        <div class="broManageTileContent">
          <div title>Coming Soon</div> <!--Move Randomly-->
          <div info>Randomly reassign members to a different team.</div>
        </div>
      </button>
    </div>
    <div class="broManageTiles" style="display: none">
      <button class="broManageTile" type="endsession" dropdowntitle="End Session"><div>End Breakout Session</div></button>
    </div>
  </div>
  `;

  css = {
    ".broManageTilesHolder": `position: relative; display: flex; gap: 12px; flex-direction: column; max-width: 100%; padding: 8px`,
    ".broManageTiles": `box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 8px; align-items: center`,
    ".broManageTile": `display: flex; flex-wrap: wrap; gap: 12px; width: 300px; max-width: 100%; padding: 12px; text-align: left; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 10px`,
    ".broManageTile:hover": `box-shadow: var(--darkShadow)`,
    ".broManageTile:first-child": `border-top-left-radius: 20px; border-top-right-radius: 20px`,
    ".broManageTile:last-child": `border-bottom-left-radius: 20px; border-bottom-right-radius: 20px`,
    ".broManageTileContent": `display: flex; flex: 1 1 100px; flex-direction: column; gap: 4px; justify-content: center`,
    ".broManageTileContent div[title]": `font-size: 18px; font-weight: 700; color: var(--theme)`,
    ".broManageTileContent div[info]": `font-weight: 500`,
    ".broManageTileImage": `height: fit-content; padding: 4px; border-radius: 12px`,
    ".broManageTileImage svg": `display: block; width: 50px`,
    ".broManageTileImage img": `display: block; width: 80px; object-fit: cover; border-radius: 8px`,

    '.broManageTile[type="endsession"]': `padding: 8px; background: var(--error); color: #fff; font-weight: 700; font-size: 16px; justify-content: center; text-align: center`
  };

  async updateDisplayState() {
    let config = this.parent.parent.parent.lesson.breakout ?? {};

    if (config.template != null) {
      (async () => {
        let template = await this.parent.getTemplate();
        if (template.thumbnail != null) {
          this.templateImage.src = assetURL + template.thumbnail;
        }
      })();
    }
  }

  js = async function (frame, extra) {
    this.parent = extra.parent;
    
    this.sections = frame.querySelector(".broManageTilesHolder");

    this.templateSection = this.sections.querySelector('.broManageTile[type="template"]');
    this.templateImage = this.templateSection.querySelector(".broManageTileImage img");
    this.groupSettingsSection = this.sections.querySelector('.broManageTile[type="groupsettings"]');
    this.memberSettingsSection = this.sections.querySelector('.broManageTile[type="membersettings"]');

    this.rotateMembersClockwiseSection = this.sections.querySelector('.broManageTile[type="rotatemembersclockwise"]');
    this.rotateMembersCounterclockwiseSection = this.sections.querySelector('.broManageTile[type="rotatememberscounterclockwise"]');
    this.moveMembersRandomlySection = this.sections.querySelector('.broManageTile[type="movemembersrandomly"]');

    //this.endSessionSection = this.sections.querySelector('.broManageTile[type="endsession"]');

    this.templateSection.addEventListener("click", () => {
      this.close();
      this.parent.parent.openPage("secondary", "breakout/template", { template: this.parent.template, updating: true });
    });
    this.groupSettingsSection.addEventListener("click", () => {
      this.open(this.groupSettingsSection, import("@modules/lesson/breakout/overview/modals/Options"), { parent: this.parent, editing: true });
    });
    this.memberSettingsSection.addEventListener("click", () => {
      this.open(this.memberSettingsSection, import("@modules/lesson/dropdowns/share/Options"), { parent: this.parent.parent });
    });
    
    this.parent.pipeline.subscribe("overviewManageBreakoutSet", "set", () => { this.updateDisplayState(); }, { sort: 2 });
    this.parent.pipeline.subscribe("overviewManageBreakoutSubSet", "subset", () => { this.updateDisplayState(); }, { sort: 2 });
    this.updateDisplayState();
  }
}