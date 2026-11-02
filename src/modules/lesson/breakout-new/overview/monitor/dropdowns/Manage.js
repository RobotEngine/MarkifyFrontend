import { assetURL } from "@/crucial";

import groupSettingsIcon from "@assets/lesson/breakout/manage/groupsettings.svg?raw";
import memberSettingsIcon from "@assets/lesson/breakout/manage/membersettings.svg?raw";
import rotateMembersIcon from "@assets/lesson/breakout/manage/rotatemembers.svg?raw";
import moveMembersRandomlyIcon from "@assets/lesson/breakout/manage/movemembersrandomly.svg?raw";

export class Frame {
  maxHeight = 450;

  html = `
  <div class="brmManageTilesHolder">
    <div class="brmManageTiles">
      <button class="brmManageTile" type="template">
        <div class="brmManageTileContent">
          <div title>Modify Template</div>
          <div info>Update the template and push changes to teams.</div>
        </div>
        <div class="brmManageTileImage" style="box-shadow: inset var(--lightShadow)">
          <img src="../images/dashboard/placeholder.png" style="height: 60px">
        </div>
      </button>
      <button class="brmManageTile" type="groupsettings" dropdowntitle="Team Settings">
        <div class="brmManageTileContent">
          <div title>Team Settings</div>
          <div info>Configure AutoPair, permissions, and more.</div>
        </div>
        <div class="brmManageTileImage">${groupSettingsIcon}</div>
      </button>
      <button class="brmManageTile" type="membersettings" dropdowntitle="Member Settings">
        <div class="brmManageTileContent">
          <div title>Member Settings</div>
          <div info>Configure member settings and tool toggle.</div>
        </div>
        <div class="brmManageTileImage">${memberSettingsIcon}</div>
      </button>
    </div>
    <div class="brmManageTiles">
      <button class="brmManageTile" type="rotatemembersclockwise" disabled>
        <div class="brmManageTileImage">${rotateMembersIcon}</div>
        <div class="brmManageTileContent">
          <div title>Coming Soon</div> <!--Rotate Clockwise-->
          <div info>Move each team's members to the next team.</div>
        </div>
      </button>
      <button class="brmManageTile" type="rotatememberscounterclockwise" disabled>
        <div class="brmManageTileImage" style="transform: scaleX(-1)">${rotateMembersIcon}</div>
        <div class="brmManageTileContent">
          <div title>Coming Soon</div> <!--Rotate Counterclockwise-->
          <div info>Move each team's members to the previous team.</div>
        </div>
      </button>
      <button class="brmManageTile" type="movemembersrandomly" disabled>
        <div class="brmManageTileImage">${moveMembersRandomlyIcon}</div>
        <div class="brmManageTileContent">
          <div title>Coming Soon</div> <!--Move Randomly-->
          <div info>Randomly reassign members to a different team.</div>
        </div>
      </button>
    </div>
    <div class="brmManageTiles" style="display: none">
      <button class="brmManageTile" type="endsession" dropdowntitle="End Session"><div>End Breakout Session</div></button>
    </div>
  </div>
  `;

  css = {
    ".brmManageTilesHolder": `position: relative; display: flex; gap: 12px; flex-direction: column; max-width: 100%; padding: 8px`,
    ".brmManageTiles": `box-sizing: border-box; display: flex; flex-direction: column; width: fit-content; max-width: 100%; padding: 8px; gap: 8px; align-items: center`,
    ".brmManageTile": `display: flex; flex-wrap: wrap; gap: 12px; width: 300px; max-width: 100%; padding: 12px; text-align: left; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 10px`,
    ".brmManageTile:hover": `box-shadow: var(--darkShadow)`,
    ".brmManageTile:first-child": `border-top-left-radius: 20px; border-top-right-radius: 20px`,
    ".brmManageTile:last-child": `border-bottom-left-radius: 20px; border-bottom-right-radius: 20px`,
    ".brmManageTileContent": `display: flex; flex: 1 1 100px; flex-direction: column; gap: 4px; justify-content: center`,
    ".brmManageTileContent div[title]": `font-size: 18px; font-weight: 700; color: var(--theme)`,
    ".brmManageTileContent div[info]": `font-weight: 500`,
    ".brmManageTileImage": `height: fit-content; padding: 4px; border-radius: 12px`,
    ".brmManageTileImage svg": `display: block; width: 50px`,
    ".brmManageTileImage img": `display: block; width: 80px; object-fit: cover; border-radius: 8px`,

    '.brmManageTile[type="endsession"]': `padding: 8px; background: var(--error); color: #fff; font-weight: 700; font-size: 16px; justify-content: center; text-align: center`
  };

  async updateDisplayState() {
    let config = this.parent.parent.parent.parent.lesson.breakout ?? {};

    if (config.template != null) {
      (async () => {
        let template = await this.parent.parent.getTemplate();
        if (template.thumbnail != null) {
          this.templateImage.src = assetURL + template.thumbnail;
        }
      })();
    }
  }

  js = async function (frame, extra) {
    this.parent = extra.parent;
    
    this.sections = frame.querySelector(".brmManageTilesHolder");

    this.templateSection = this.sections.querySelector('.brmManageTile[type="template"]');
    this.templateImage = this.templateSection.querySelector(".brmManageTileImage img");
    this.groupSettingsSection = this.sections.querySelector('.brmManageTile[type="groupsettings"]');
    this.memberSettingsSection = this.sections.querySelector('.brmManageTile[type="membersettings"]');

    this.rotateMembersClockwiseSection = this.sections.querySelector('.brmManageTile[type="rotatemembersclockwise"]');
    this.rotateMembersCounterclockwiseSection = this.sections.querySelector('.brmManageTile[type="rotatememberscounterclockwise"]');
    this.moveMembersRandomlySection = this.sections.querySelector('.brmManageTile[type="movemembersrandomly"]');

    //this.endSessionSection = this.sections.querySelector('.brmManageTile[type="endsession"]');

    this.templateSection.addEventListener("click", () => {
      this.close();
      this.parent.parent.openPage("secondary", "template", { template: this.parent.template, updating: true });
    });
    this.groupSettingsSection.addEventListener("click", () => {
      this.open(this.groupSettingsSection, import("@modules/lesson/breakout/overview/modals/Options"), { parent: this.parent, editing: true });
    });
    this.memberSettingsSection.addEventListener("click", () => {
      this.open(this.memberSettingsSection, import("@modules/lesson/dropdowns/share/Options"), { parent: this.parent.parent.parent });
    });
    
    this.parent.pipeline.subscribe("overviewManageBreakoutSet", "set", () => { this.updateDisplayState(); }, { sort: 2 });
    this.parent.pipeline.subscribe("overviewManageBreakoutSubSet", "subset", () => { this.updateDisplayState(); }, { sort: 2 });
    this.updateDisplayState();
  }
}