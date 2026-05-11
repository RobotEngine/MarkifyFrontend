import { account, mouseDown, clientPosition, sleep, getEpoch, timeSince, formatFullDate, sendRequest, copyObject } from "@/crucial";

import { Editor } from "@modules/editor/Editor";
import { TOOLBAR } from "@modules/editor/imports";

import { Frame as ZoomDropdown } from "@modules/lesson/dropdowns/Zoom";

import skimBackIcon from "@assets/lesson/timeline/back.svg?raw";
import skimNextIcon from "@assets/lesson/timeline/next.svg?raw";
import playIcon from "@assets/lesson/timeline/play.svg?raw";
import pauseIcon from "@assets/lesson/timeline/pause.svg?raw";
import { close as closeIcon, search as searchIcon } from "@modules/utility/core-icons";

class FilterDropdown {
  html = `
  <div class="timelineFilterHolder">
    <div class="timelineFilterSearchHolder">
      <div class="timelineFilterSearch">
        <div image>${searchIcon}</div>
        <input placeholder="Search..."></input>
      </div>
    </div>
    <div class="timelineFilterCollaboratorHolder"></div>
    <div class="timelineFilterApplyHolder">
      <button class="largeButton border"></button>
    </div>
  </div>
  `;
  css = {
    ".timelineFilterHolder": `width: 275px; max-width: 100%`,
    ".timelineFilterSearchHolder": `display: flex; padding: 8px 8px 4px 8px; align-items: center; z-index: 1`,
    ".timelineFilterSearch": `display: flex; width: 100%; align-items: center; border: solid 2px var(--secondary); border-radius: 18px`,
    ".timelineFilterSearch div[image]": `width: 24px; height: 24px; margin-left: 4px`,
    ".timelineFilterSearch div[image] svg": `width: 100%; height: 100%`,
    ".timelineFilterSearch input": `width: 100%; padding: 5px; background: unset; border: unset; outline: unset; color: var(--textColor); font-family: var(--font); font-size: 16px; font-weight: 600`,
    ".timelineFilterSearch input::placeholder": `color: var(--secondary)`,

    ".timelineFilterCollaboratorHolder": `display: flex; flex-direction: column; margin-top: 6px; z-index: 1`,
    ".timelineFilterCollaborator": `position: relative; display: flex; width: calc(100% - 12px); padding: 0px; margin: 0 6px 6px 6px; justify-content: center; align-items: center`,
    ".timelineFilterCollaborator[hidden]": `display: none !important`,
    ".timelineFilterCollaborator:active": `transform: scale(1) !important`,
    ".timelineFilterCollaborator div[holder]": `position: relative; display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 6px; overflow: hidden; align-items: center; transition: .1s`, //; margin: 4px 0
    ".timelineFilterCollaborator[selected] div[holder]": `background: var(--theme) !important; color: #fff`,
    ".timelineFilterCollaborator:hover div[holder]": `background: var(--hover)`,
    ".timelineFilterCollaborator:active div[holder]": `transform: scale(.95)`,
    ".timelineFilterCollaborator div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".timelineFilterCollaborator div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".timelineFilterCollaborator div[profileholder] div[profile]": `position: relative; width: 22px; height: 22px; border: solid 3px var(--pageColor); border-radius: 14px`,
    ".timelineFilterCollaborator div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".timelineFilterCollaborator div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".timelineFilterCollaborator div[content]": `display: flex; flex: 1; min-width: 0; max-width: calc(var(--width) - 34px); height: 28px; margin-left: 6px; text-align: left; overflow: hidden; align-items: center; z-index: 2; transition: .2s`,
    ".timelineFilterCollaborator div[content] div[name]": `font-size: 16px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; overflow: hidden`,

    ".timelineFilterApplyHolder": `position: sticky; display: flex; flex-wrap: wrap; max-width: var(--dropdownWidth); padding: 8px; gap: 24px; left: 0px; bottom: 0px; justify-content: center; align-items: center; background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 0px 0px 12px 12px; z-index: 2`,
    ".timelineFilterApplyHolder button": `padding: 6px 10px; background: var(--theme); --borderColor: var(--secondary); --borderRadius: 16px; color: #fff; font-size: 16px`,
    ".timelineFilterApplyHolder button[remove]": `background: unset !important; --borderColor: var(--error); color: var(--error)`,
  };
  async js(frame, extra) {
    frame.closest(".dropdownContent").style.padding = "0px";

    let parent = extra.parent;
    let filter = parent.filterMembers ?? [];
    let applyFilter = copyObject(filter);

    let searchHolder = frame.querySelector(".timelineFilterSearch");
    let searchField = searchHolder.querySelector("input");
    let collaboratorHolder = frame.querySelector(".timelineFilterCollaboratorHolder");
    let applyButton = frame.querySelector(".timelineFilterApplyHolder .largeButton");

    let updatingApply = false;
    let updateApplyButton = () => {
      if (updatingApply == true) {
        return;
      }
      if (filter.sort().join(",") == applyFilter.sort().join(",")) {
        if (applyFilter.length > 0) {
          applyButton.setAttribute("remove", "");
          applyButton.textContent = "Remove Filter";
          applyButton.removeAttribute("disabled");
        } else {
          applyButton.textContent = "Update Filter";
          applyButton.removeAttribute("remove");
          applyButton.setAttribute("disabled", "");
        }
      } else {
        applyButton.textContent = "Update Filter";
        applyButton.removeAttribute("remove");
        applyButton.removeAttribute("disabled");
      }
    }
    updateApplyButton();

    applyButton.addEventListener("click", async () => {
      if (applyButton.hasAttribute("remove") == true) {
        let selected = collaboratorHolder.querySelectorAll(".timelineFilterCollaborator[selected]");
        for (let i = 0; i < selected.length; i++) {
          selected[i].removeAttribute("selected");
        }
        applyFilter = [];
      }
      updatingApply = true;
      applyButton.setAttribute("disabled", "");
      if (applyFilter.length > 0) {
        parent.filterMembers = copyObject(applyFilter);
      } else {
        parent.filterMembers = null;
      }
      await parent.updateFilter(parent.filterMembers);
      filter = parent.filterMembers ?? [];
      updatingApply = false;
      updateApplyButton();
    });
    
    collaboratorHolder.addEventListener("click", (event) => {
      let tile = event.target.closest(".timelineFilterCollaborator");
      if (tile == null) {
        return;
      }
      let collabID = tile.getAttribute("collaborator");
      if (tile.hasAttribute("selected") == false) {
        tile.setAttribute("selected", "");
        applyFilter.push(collabID);
      } else {
        tile.removeAttribute("selected");
        let index = applyFilter.indexOf(collabID);
        if (index > -1) {
          applyFilter.splice(index, 1);
        }
      }
      updateApplyButton();
    });

    for (let i = 0; i < parent.collaboratorIDs.length; i++) {
      let collaborator = await parent.editor.utils.getCollaborator(parent.collaboratorIDs[i]);
      collaboratorHolder.insertAdjacentHTML("beforeend", `<button class="timelineFilterCollaborator" new>
        <div holder>
          <div profileholder>
            <div cursor></div>
            <div profile><img src="../images/profiles/default.svg" /></div>
          </div>
          <div content>
            <div name></div>
          </div>
        </div>
      </button>`);
      let tile = collaboratorHolder.querySelector(".timelineFilterCollaborator[new]");
      tile.removeAttribute("new");
      tile.setAttribute("collaborator", collaborator._id);
      let memberProfileHolder = tile.querySelector("div[profileholder]");
      let memberCursor = memberProfileHolder.querySelector("div[cursor]");
      let memberProfilePicture = memberProfileHolder.querySelector("div[profile]");
      let memberContent = tile.querySelector("div[content]");
      let memberName = memberContent.querySelector("div[content] > div[name]");
      tile.style.setProperty("--themeColor", collaborator.color);
      if (collaborator.image == null) {
        memberCursor.style.removeProperty("display");
        memberProfilePicture.style.display = "none";
      } else {
        memberProfilePicture.querySelector("img").src = collaborator.image;
        memberProfilePicture.style.removeProperty("display");
        memberCursor.style.display = "none";
      }
      memberName.textContent = collaborator.name;
      memberName.title = collaborator.name;
      if (filter.includes(collaborator._id) == true) {
        tile.setAttribute("selected", "");
      }
    }

    parent.editor.pipeline.subscribe("timelineFilterDropdown", "collaborator_update", (collaborator) => {
      let tile = collaboratorHolder.querySelector('.timelineFilterCollaborator[collaborator="' + collaborator._id + '"]');
      if (tile != null) {
        let memberProfileHolder = tile.querySelector("div[profileholder]");
        let memberCursor = memberProfileHolder.querySelector("div[cursor]");
        let memberProfilePicture = memberProfileHolder.querySelector("div[profile]");
        let memberContent = tile.querySelector("div[content]");
        let memberName = memberContent.querySelector("div[content] > div[name]");
        tile.style.setProperty("--themeColor", collaborator.color);
        if (collaborator.image == null) {
          memberCursor.style.removeProperty("display");
          memberProfilePicture.style.display = "none";
        } else {
          memberProfilePicture.querySelector("img").src = collaborator.image;
          memberProfilePicture.style.removeProperty("display");
          memberCursor.style.display = "none";
        }
        memberName.textContent = collaborator.name;
        memberName.title = collaborator.name;
      }
    });

    searchField.addEventListener("input", async () => {
      let search = (searchField.value ?? "").toLowerCase();

      let children = collaboratorHolder.children;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let collaborator = await parent.editor.utils.getCollaborator(child.getAttribute("collaborator"));
        if (collaborator == null) {
          child.remove();
          continue;
        }
        if ((collaborator.name ?? "").toLowerCase().includes(search) == true) {
          child.removeAttribute("hidden");
        } else {
          child.setAttribute("hidden", "");
        }
      }
    });
  }
}

export class Frame {
  html = `
  <div class="timelineInterface customScroll">
    <div class="timelineTopHolder">
      <div class="timelineTop">
        <div class="timelineTopSection" left>
          <a class="timelineClose" title="Close Timeline">${closeIcon}</a>
          <div class="timelineTopDivider" revert></div>
          <button class="timelineRevert" title="Restore the document back to this state. Reverting does not overwrite later changes, but instead inserts a new change." disabled>Revert</button>
        </div>
        <div class="timelineTopSection" right>
          <button class="timelineFilter" title="Filter by specific collaborators to see their contributions." dropdowntitle="Filter" disabled>Filter<span title="Number of selected collaborators."></span></button>
          <div class="timelineTopDivider"></div>
          <button class="timelineZoom">100%</button>
        </div>
      </div>
    </div>
    <div class="timelineToolbarHolder eToolbarHolder" toolbarholder>
      <div class="eToolbar" type="viewer" keeptooltip notransition></div>
    </div>
    <div class="timelineBottomHolder">
      <div class="timelineHistory" disabled>
        <div class="timelineHistorySliderHolder">
          <div class="timelineHistorySlider">
            <div class="timelineHistoryBar"><div class="timelineHistoryBarTrack"><div progress></div><div loader></div></div></div>
            <div class="timelineHistoryTrack"><button></button></div>
          </div>
        </div>
        <div class="timelineHistoryInfo">
          <div class="timelineHistoryDetail">
            <div class="timelineHistoryMemberHolder">
              <div class="timelineHistoryMember">
                <div profileholder>
                  <div cursor></div>
                  <div profile><img src="../images/profiles/default.svg" /></div>
                </div>
                <div content>
                  <div name></div>
                  <div email></div>
                </div>
              </div>
            </div>
            <div class="timelineHistoryTime"></div>
          </div>
          <div class="timelineHistoryChange">
            <button class="timelineHistorySkim" back disabled title="Previous Edit">${skimBackIcon}</button>
            <div class="timelineHistoryCurrentChange"><b>0</b> / 0</div>
            <button class="timelineHistorySkim" next disabled title="Next Edit">${skimNextIcon}</button>
            <button class="timelineHistorySkim" play><div play title="Play Edits">${playIcon}</div><div pause hidden title="Stop Playing">${pauseIcon}</div></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="timelineContentHolder customScroll" viewer></div>
  <div class="timelineDisable"></div>
  `;

  css = {
    ".timelineInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; overflow: scroll; z-index: 2`,
    ".timelineContentHolder": `position: relative; width: 100%; height: 100%; overflow: scroll; z-index: 1; transition: .5s`,
    ".timelineDisable": `position: absolute; display: none; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 3; pointer-events: all !important`,
    ".content[disabled] .timelineDisable": `display: block !important`,

    ".timelineTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".timelineTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".timelineTop::-webkit-scrollbar": `display: none`,
    ".timelineTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".timelineTopSection[left]": `border-bottom-right-radius: 12px`,
    ".timelineTopSection[right]": `border-bottom-left-radius: 12px`,
    ".timelineClose": `display: flex; width: 38px; height: 38px; padding: 0; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".timelineClose:hover": `background: var(--hover)`,
    ".timelineClose svg": `width: 24px; height: 24px; transition: .2s`,
    ".timelineClose:hover svg": `transform: scale(.9)`,
    ".timelineTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".timelineTopDivider[revert]": `display: none; margin-left: 8px`,
    ".timelineRevert": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".timelineFilter": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".timelineFilter span": `--themeColorRGB: var(--themeRGB); display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-left: 5px; justify-content: center; align-items: center; background: var(--pageColor); color: rgb(var(--themeColorRGB)); border-radius: 12px; font-weight: 700`,
    ".timelineZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,

    ".timelineToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".timelineBottomHolder": `position: relative; display: flex; width: 100%; height: fit-content; margin-top: 8px; justify-content: center; visibility: visible`,
    ".timelineHistory": `position: relative; box-sizing: border-box; width: calc(100% - 16px); max-width: 600px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); opacity: 1 !important; box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; overflow: hidden; pointer-events: all !important`,
    ".timelineHistory[disabled] > div": `opacity: .5; pointer-events: none`,
    ".timelineHistorySliderHolder": `box-sizing: border-box; display: flex; width: 100%; align-items: center; z-index: 1; transition: .2s`,
    ".timelineHistorySlider": `position: relative; flex: 1; height: 10px; margin: 12px; touch-action: none`,
    ".timelineHistoryTrack": `position: absolute; width: calc(100% - 10px); height: 100%; left: 5px; top: 0px; z-index: 2`,
    ".timelineHistoryTrack button": `--percent: 100%; position: absolute; width: 22px; height: 22px; padding: 0px; left: calc(var(--percent) - 11px); top: -6px; margin: 0px; background: var(--theme); box-shadow: var(--darkShadow); border: solid 4px var(--pageColor); border-radius: 11px; transition: transform .2s`,
    ".timelineHistoryTrack button:hover": `transform: scale(1.2) !important`,
    ".timelineHistoryTrack button:active": `transform: scale(1.1) !important`,
    ".timelineHistoryBar": `position: relative; width: 100%; height: 100%; background: var(--gray); border-radius: 5px; overflow: hidden; transition: .2s`,
    ".timelineHistoryBarTrack": `position: absolute; width: calc(100% - 10px); height: 100%; left: 5px; top: 0px; z-index: 1`,
    ".timelineHistoryBarTrack div[progress]": `--percent: 100%; position: absolute; width: calc(var(--percent) + 5px); height: 100%; left: -5px; top: 0px; background: var(--theme); z-index: 2`,
    ".timelineHistoryBarTrack div[loader]": `--percent: 0%; position: absolute; width: calc(var(--percent) + 5px); height: 100%; right: -5px; top: 0px; background: var(--hover); z-index: 1`,
    ".timelineHistoryInfo": `position: relative; box-sizing: border-box; display: flex; flex-wrap: wrap; width: 100%; margin-bottom: 2px; gap: 6px; align-items: center; z-index: 2`,
    ".timelineHistoryDetail": `display: none; flex: 1 1 100px; min-width: 0px; margin: 0 8px 0 6px; align-items: center; z-index: 2; transition: .2s`,
    ".timelineHistoryMemberHolder": `--useWidth: var(--width); position: relative; height: 28px; padding: 6px 0 6px 6px; transition: margin .2s`,
    ".timelineHistoryMemberHolder:not([extend])": `flex: 1; min-width: 0px; max-width: var(--width); overflow: hidden`,
    ".timelineHistoryMemberHolder[extend]": `--useWidth: var(--fullWidth); width: var(--width); margin-right: 6px`,
    ".timelineHistoryMember": `position: absolute; display: flex; height: 28px; padding: 6px; left: 0px; top: 50%; transform: translateY(-50%); background: var(--pageColor); border-radius: 8px; transition: .2s`,
    ".timelineHistoryMember:after": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: 0; z-index: 1; transition: .2s`,
    ".timelineHistoryMemberHolder[extend] .timelineHistoryMember:after": `opacity: .6`,
    ".timelineHistoryMember div[profileholder]": `z-index: 2`,
    ".timelineHistoryMember div[profileholder] div[cursor]": `position: relative; width: 22px; height: 22px; background: var(--themeColor); border: solid 3px var(--pageColor); border-radius: 8px 14px 14px`,
    ".timelineHistoryMember div[profileholder] div[cursor]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 6px var(--themeColor); opacity: .6`,
    ".timelineHistoryMember div[profileholder] div[profile]": `position: relative; width: 22px; height: 22px; border: solid 3px var(--pageColor); border-radius: 14px`,
    ".timelineHistoryMember div[profileholder] div[profile] img": `width: 100%; height: 100%; object-fit: cover; border-radius: inherit`,
    ".timelineHistoryMember div[profileholder] div[profile]:after": `content: ""; position: absolute; width: 100%; height: 100%; padding: 3px; left: -3px; top: -3px; border-radius: inherit; box-shadow: 0 0 4px var(--themeColor); opacity: .6`,
    ".timelineHistoryMember div[content]": `display: flex; flex: 1; min-width: 0; max-width: calc(var(--useWidth) - 34px); height: 28px; margin-left: 6px; text-align: left; overflow: hidden; align-items: center; z-index: 2; transition: .2s`,
    ".timelineHistoryMember div[content] div[name]": `font-size: 16px; font-weight: 600; white-space: nowrap`,
    ".timelineHistoryMember div[content] div[email]": `display: none; margin: 0 6px 0 8px; font-size: 15px; font-weight: 500; white-space: nowrap`,
    ".timelineHistoryTime": `margin-left: 6px; color: var(--darkGray); font-size: 16px; font-weight: 500; white-space: nowrap`,
    ".timelineHistoryChange": `display: flex; margin: 6px 8px 6px auto; align-items: center; z-index: 1`,
    ".timelineHistoryChange button": `display: flex; flex-shrink: 0; width: 28px; height: 28px; padding: 4px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 14px`,
    ".timelineHistoryChange button > svg": `flex-shrink: 0; width: 22px; height: 22px`,
    ".timelineHistoryChange button > div": `flex-shrink: 0; width: 22px; height: 22px`,
    ".timelineHistoryChange button > div[hidden]": `display: none`,
    ".timelineHistoryChange button > div > svg": `width: 100%; height: 100%`,
    ".timelineHistoryCurrentChange": `flex-shrink: 0; margin: 0 6px; font-size: 16px`,

    ".timelineSelect": `--themeColor: var(--theme); position: absolute; left: 0px; top: 0px; border-style: solid; border-width: 3px; border-color: var(--themeColor); opacity: 0; z-index: 9; border-radius: 9px; opacity .15s; pointer-events: none`
  };

  pipeline = {
    pipelines: [],
    publish: async (event, data) => {
      for (let i = 0; i < this.pipeline.pipelines.length; i++) {
        let pipeline = this.pipeline.pipelines[i];
        if (pipeline != null) {
          await pipeline.publish(event, data);
        }
      }
    },
    subscribe: (id, event, callback, extra) => {
      for (let i = 0; i < this.pipeline.pipelines.length; i++) {
        let pipeline = this.pipeline.pipelines[i];
        if (pipeline != null) {
          pipeline.subscribe(id, event, callback, extra);
        }
      }
    },
    unsubscribe: (id, event) => {
      for (let i = 0; i < this.pipeline.pipelines.length; i++) {
        let pipeline = this.pipeline.pipelines[i];
        if (pipeline != null) {
          pipeline.unsubscribe(id, event);
        }
      }
    }
  };

  updateInterface() {
    if (this.self.access > 3) {
      this.revertDivider.style.display = "block";
      this.revertButton.style.display = "flex";
    } else {
      this.revertDivider.style.removeProperty("display");
      this.revertButton.style.removeProperty("display");
    }
    if ((account.settings ?? {}).toolbar != "right") {
      this.toolbarHolder.setAttribute("left", "");
      this.toolbarHolder.removeAttribute("right");
    } else {
      this.toolbarHolder.setAttribute("right", "");
      this.toolbarHolder.removeAttribute("left");
    }
  }

  changes = {};
  orderedChanges = [];
  allChangesLoaded = false;
  //currentChange = null;
  //lastRenderChange = null;
  presentAnnotations = {};
  storedAnnotationStates = {};
  selectionBoxes = {};

  //filterMembers = null;
  sortedChanges = [];
  totalSortedChanges = 0;
  currentSortedChange = 0;
  playing = false;

  updateTimelineInterface() {
    let useTotalChanges = Math.max(this.totalSortedChanges, this.sortedChanges.length);

    if (useTotalChanges > 0) {
      this.timeline.parentElement.removeAttribute("hidden");
    } else {
      this.timeline.parentElement.setAttribute("hidden", "");
    }

    let percent = this.currentSortedChange / useTotalChanges;
    let stylePercent = percent * 100;
    this.sliderProgressBar.style.setProperty("--percent", stylePercent + "%");
    this.sliderButton.style.setProperty("--percent", stylePercent + "%");
    this.sliderLoaderBar.style.setProperty("--percent", ((this.sortedChanges.length / useTotalChanges) * 100) + "%");

    this.currentChangeText.innerHTML = "<b>" + this.currentSortedChange + "</b> / " + useTotalChanges;

    if (this.currentSortedChange > 0) {
      this.skimBackButton.removeAttribute("disabled");
    } else {
      this.skimBackButton.setAttribute("disabled", "");
    }
    if (this.currentSortedChange < useTotalChanges) {
      this.skimNextButton.removeAttribute("disabled");
    } else {
      this.skimNextButton.setAttribute("disabled", "");
    }
  }

  //currentCollaboratorID = null;
  updateCollaboratorDisplay(collaborator = {}) {
    if ((this.lesson.lesson.settings ?? {}).anonymousMode == true && this.self.access < 4) {
      collaborator = {};
    }
    this.currentCollaboratorID = collaborator._id;
    if (this.currentCollaboratorID == null) {
      return this.timelineDetail.style.removeProperty("display");
    }
    this.memberFrame.style.setProperty("--themeColor", collaborator.color);
    if (collaborator.image == null) {
      this.memberCursor.style.removeProperty("display");
      this.memberProfilePicture.style.display = "none";
    } else {
      this.memberProfilePicture.querySelector("img").src = collaborator.image;
      this.memberProfilePicture.style.removeProperty("display");
      this.memberCursor.style.display = "none";
    }
    this.memberName.textContent = collaborator.name;
    this.memberName.title = collaborator.name;
    if (collaborator.email != null) {
      this.memberEmail.textContent = collaborator.email;
      this.memberEmail.title = collaborator.email;
      this.memberEmail.style.display = "flex";
    } else {
      this.memberEmail.style.removeProperty("display");
    }

    this.timelineDetail.style.display = "flex";
    let memberNameWidth = this.memberName.offsetWidth;
    this.memberHolder.style.setProperty("--width", (memberNameWidth + 36) + "px");
    this.memberHolder.style.setProperty("--fullWidth", (memberNameWidth + this.memberEmail.offsetWidth + 48) + "px");
  }

  //updateStateCaller = null;
  async updateTimeline(options = {}) {
    if (options.fromPlayLoop != true) {
      this.stopPlaying();
    }

    this.updateTimelineInterface();
    
    let callUpdateState = async () => {
      this.currentChange = this.sortedChanges[this.currentSortedChange - (Math.max(this.totalSortedChanges, this.sortedChanges.length) - this.sortedChanges.length) - 1];
      await this.updateCurrentState(options);
    };
    this.updateStateCaller = callUpdateState;

    if (this.sortedChanges.length > 0) {
      this.revertButton.setAttribute("disabled", "");
      let sortedChangeIndex = this.currentSortedChange - (Math.max(this.totalSortedChanges, this.sortedChanges.length) - this.sortedChanges.length) - 1;
      if (sortedChangeIndex >= 0) {
        await this.updateStateCaller();
      }
      if (sortedChangeIndex < 50) {
        await this.loopLoadAnnotations();
        if (this.updateStateCaller == this.callUpdateState) {
          this.updateStateCaller();
        }
      }
    }
  }

  updatingState = false;
  currentChangeIndex = -1;
  lastRenderChangeIndex = -1;
  orderedChangesLength = 0;
  async updateCurrentState(options = {}) {
    if (this.currentChange == null) {
      this.currentChange = this.orderedChanges[this.orderedChanges.indexOf(this.sortedChanges[0]) - 1];
    }
    if (this.currentChange != this.orderedChanges[this.orderedChanges.length - 1]) {
      this.revertButton.removeAttribute("disabled");
    }
    if (this.lastRenderChange == this.currentChange) {
      return;
    }

    this.currentChangeIndex = this.orderedChanges.indexOf(this.currentChange);
    this.lastRenderChangeIndex = this.orderedChanges.indexOf(this.lastRenderChange);
    this.orderedChangesLength = this.orderedChanges.length;

    if (this.updatingState == true) {
      return;
    }
    this.updatingState = true;

    let useChangeType;
    let updatedAnnotations = {};
    let currentChangeAnnotations = {};
    let allMissingAnnotations = true;
    let changeData;
    while (this.currentChange != this.lastRenderChange) {
      let applyChangeChanges;
      let loadChangeCountDifference = this.orderedChanges.length - this.orderedChangesLength;
      if (loadChangeCountDifference != 0) {
        this.currentChangeIndex -= loadChangeCountDifference;
        this.lastRenderChangeIndex -= loadChangeCountDifference;
        this.orderedChangesLength += loadChangeCountDifference;
      }
      if (this.lastRenderChangeIndex > this.currentChangeIndex) {
        changeData = this.changes[this.orderedChanges[this.lastRenderChangeIndex]] ?? {};
        applyChangeChanges = changeData.changes ?? [];

        this.lastRenderChangeIndex--;
        useChangeType = "changes";
      } else if (this.lastRenderChangeIndex < this.currentChangeIndex) {
        this.lastRenderChangeIndex++;
        useChangeType = "redoChanges";

        changeData = this.changes[this.orderedChanges[this.lastRenderChangeIndex]] ?? {};
        applyChangeChanges = changeData.redoChanges ?? [];
      } else {
        this.lastRenderChange = this.currentChange;
        break;
      }

      this.lastRenderChange = changeData._id;

      if (applyChangeChanges.length > 0) {
        currentChangeAnnotations = {};
      }

      let addRedoChanges = changeData.redoChanges == null && useChangeType == "changes";
      if (addRedoChanges == true) {
        changeData.redoChanges = [];
      }
      for (let i = 0; i < applyChangeChanges.length; i++) {
        let annotation = applyChangeChanges[i];
        let original = this.storedAnnotationStates[annotation._id] ?? (this.editor.annotations[annotation._id] ?? {}).render;
        if (this.self.access < 4) {
          let presentAnnotation = this.presentAnnotations[annotation._id];
          if (presentAnnotation == null) {
            continue;
          } else if (["page"].includes((original ?? {}).f) == true && presentAnnotation.hidden == true) {
            delete annotation.hidden;
          }
        }
        if (addRedoChanges == true) {
          changeData.redoChanges.push(copyObject(original ?? { _id: annotation._id, remove: true }));
        }
        if ((original ?? {}).remove == true) {
          delete original.remove;
        }
        if ((original ?? {}).a == null && annotation.a == null) {
          annotation.a = changeData.collaborator;
        }
        annotation.m = changeData.collaborator;
        
        this.storedAnnotationStates[annotation._id] = { ...(original ?? {}), ...annotation };

        let checkChunks = this.editor.utils.chunksFromAnnotation(annotation);
        if (this.editor.annotations[annotation._id] == null) {
          this.editor.annotations[annotation._id] = { render: this.storedAnnotationStates[annotation._id] };
        } else {
          this.editor.annotations[annotation._id].render = this.storedAnnotationStates[annotation._id];
        }
        updatedAnnotations[annotation._id] = { annotation: this.editor.annotations[annotation._id], checkChunks: checkChunks };

        currentChangeAnnotations[annotation._id] = true;
        allMissingAnnotations = false;
      }
    }
    this.updatingState = false;
    if (useChangeType != null && allMissingAnnotations == true && this.self.access < 4 && this.currentSortedChange > 0 && options.skipMissingCheck != true) {
      if (useChangeType == "changes") {
        this.currentSortedChange--;
      } else if (useChangeType == "redoChanges") {
        this.currentSortedChange++;
      }
      if (this.currentSortedChange < 0) {
        this.currentSortedChange = 0;
      }
      let useTotalChanges = Math.max(this.totalSortedChanges, this.sortedChanges.length);
      if (this.currentSortedChange > useTotalChanges) {
        this.currentSortedChange = useTotalChanges;
      }
      return await this.updateTimeline(options);
    }

    let isOffScreen = false;
    let centerTotalX = 0;
    let centerTotalY = 0;
    let centerTotalCount = 0;
    let setSelectionBoxes = {};
    let tempSelections = [];
    let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
    let updateAnnotationKeys = Object.keys(updatedAnnotations);
    for (let i = 0; i < updateAnnotationKeys.length; i++) {
      let annoID = updateAnnotationKeys[i];
      let { annotation, checkChunks } = updatedAnnotations[annoID];
      let annoRect = this.editor.utils.getRect(annotation.render);
      let isCurrentChange = currentChangeAnnotations[annotation.render._id] != null;

      await this.editor.utils.setAnnotationChunks(annotation);

      let chunkAnnotations = this.editor.utils.annotationsInChunks(checkChunks);
      for (let i = 0; i < chunkAnnotations.length; i++) {
        let anno = chunkAnnotations[i] ?? {};
        let render = anno.render;
        if (render == null || render._id == annoID) {
          continue;
        }
        if (this.editor.utils.getParentIDs(render).includes(annoID) == true) { // Update chunks of child annotations:
          await this.editor.utils.setAnnotationChunks(anno);
        }
      }

      let allowRender = annotation.render.remove == true;
      for (let i = 0; i < annotation.chunks.length; i++) {
        if (this.editor.visibleChunks.includes(annotation.chunks[i]) == true) {
          allowRender = true;
          break;
        }
      }
      if (allowRender == true) {
        annotation.component = (await this.editor.render.create(annotation, true)).component;
      } else {
        await this.editor.render.remove(annotation);
      }

      let modifyID = annotation.render.m ?? annotation.render.a;
      if (this.filterMembers != null && this.filterMembers.includes(modifyID) == false) {
        continue;
      }
      if (modifyID != null && (annotation.render.remove != true || isCurrentChange == true)) {
        let mergedID = annotation.render._id + "_" + modifyID;
        let selection = this.selectionBoxes[mergedID];
        delete this.selectionBoxes[mergedID];
        let newSelection = selection == null || selection.hasAttribute("remove");
        if (newSelection == true) {
          this.realtimeHolder.insertAdjacentHTML("beforeend", `<div class="timelineSelect" new></div>`);
          selection = this.realtimeHolder.querySelector('.timelineSelect[new]');
          selection.removeAttribute("new");
          selection.setAttribute("merged", mergedID);
          selection.setAttribute("collaborator", modifyID);
          (async (element, modifyid) => {
            let collaborator = await this.editor.utils.getCollaborator(modifyid);
            if (collaborator != null && element != null) {
              element.style.setProperty("--themeColor", collaborator.color);
            }
          })(selection, modifyID);
        }
        setSelectionBoxes[mergedID] = selection;
        if (isCurrentChange == false ||annotation.render.remove == true) {
          selection.setAttribute("remove", "");
          tempSelections.push(selection);
        }
        let rotate = annoRect.rotation;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        selection.style.width = ((annoRect.width * this.editor.zoom) - 3) + "px";
        selection.style.height = ((annoRect.height * this.editor.zoom) - 3) + "px";
        selection.style.transform = "translate(" + (annotationRect.left + (annoRect.x * this.editor.zoom) + this.editor.contentHolder.scrollLeft - 1.5) + "px," + (annotationRect.top + (annoRect.y * this.editor.zoom) + this.editor.contentHolder.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
        if (newSelection == true) {
          selection.offsetHeight;
          selection.style.transition = "all .25s, opacity .15s, border-color 0s";
          selection.style.opacity = 1;
        }
      }
      
      if (isCurrentChange == true) {
        if (isOffScreen == false) {
          isOffScreen = this.editor.utils.annotationInViewport(null, annoRect) == false;
        }
        centerTotalX += annoRect.centerX;
        centerTotalY += annoRect.centerY;
        centerTotalCount++;
      }
    }
    this.editor.pipeline.publish("redraw_selection", { transition: false });

    let removeSelectBoxes = Object.values(this.selectionBoxes);
    (async function () {
      for (let i = 0; i < removeSelectBoxes.length; i++) {
        let elem = removeSelectBoxes[i];
        if (elem != null) {
          elem.style.opacity = 0;
        }
      }
      await sleep(300);
      for (let i = 0; i < removeSelectBoxes.length; i++) {
        let elem = removeSelectBoxes[i];
        if (elem != null) {
          elem.remove();
        }
      }
    })();
    (async function (elements) {
      await sleep(500);
      for (let i = 0; i < elements.length; i++) {
        let elem = elements[i];
        if (elem != null) {
          elem.style.opacity = 0;
        }
      }
      await sleep(300);
      for (let i = 0; i < elements.length; i++) {
        let elem = elements[i];
        if (elem != null) {
          elem.remove();
        }
      }
    })(tempSelections);

    this.selectionBoxes = setSelectionBoxes;

    if (isOffScreen == true) {
      this.editor.utils.scrollToAnnotation({ p: [centerTotalX / centerTotalCount, centerTotalY / centerTotalCount] }, { duration: 250 });
    }

    this.memberContent.setAttribute("notransition", "");
    
    if (changeData != null && this.filterMembers != null && this.filterMembers.includes(changeData.collaborator) == false) {
      changeData = this.changes[this.currentChange];
    }

    let collaborator;
    if (changeData != null && allMissingAnnotations == false) {
      this.changeTime.textContent = timeSince(changeData.added);
      this.changeTime.title = formatFullDate(changeData.added);
      
      collaborator = this.editor.collaborators[changeData.collaborator];
      if (collaborator == null) {
        timelineDetail.style.removeProperty("display");
        let currentChangeID = changeData._id;
        collaborator = await this.editor.utils.getCollaborator(changeData.collaborator);
        if (currentChangeID != (changeData ?? {})._id) {
          return;
        }
      }
    }
    this.updateCollaboratorDisplay(collaborator);
  }

  applyChange(change, insert) {
    this.changes[change._id] = change;
    if (insert != "end") {
      this.orderedChanges.unshift(change._id);
    } else {
      this.orderedChanges.push(change._id);
    }
    
    if (this.filterMembers != null && this.filterMembers.includes(change.collaborator) == false) {
      return;
    }
    
    if (insert != "end") {
      this.sortedChanges.unshift(change._id);
    } else {
      this.sortedChanges.push(change._id);
    }
  }

  loadAmount = 250;
  //loadFunction = null;
  async loadChanges() {
    if (this.loadFunction == null) {
      this.loadFunction = (async () => {
        if (this.allChangesLoaded == true) {
          this.loadFunction = null;
          return;
        }
        let parameters = [...(this.parameters ?? [])];
        let getAmount = 100;
        if (this.orderedChanges.length > 0) {
          parameters.push("amount=" + this.loadAmount + "&before=" + ((this.changes[this.orderedChanges[0]] ?? {}).added ?? getEpoch()));
          getAmount = this.loadAmount;
        } else {
          parameters.push("before=" + this.loadEpoch);
        }
        let path = "lessons/history";
        if (parameters.length > 0) {
          path += "?" + parameters.join("&");
        }
        let [code, body] = await sendRequest("GET", path, null, { session: this.parent.session });
        if (code == 200) {
          for (let i = 0; i < body.changes.length; i++) {
            this.applyChange(body.changes[i]);
          }
          if (body.changes.length < getAmount) {
            this.allChangesLoaded = true;
          }
          this.sliderLoaderBar.style.setProperty("--percent", ((this.sortedChanges.length / Math.max(this.totalSortedChanges, this.sortedChanges.length)) * 100) + "%");
        }
        
        this.loadFunction = null;
      })();
    }

    await this.loadFunction;
  }
  //loopLoadFunction = null;
  async loopLoadAnnotations() {
    if (this.loopLoadFunction == null) {
      this.loopLoadFunction = (async () => {
        while (this.allChangesLoaded != true) {
          await this.loadChanges();
          if (this.currentSortedChange - (Math.max(this.totalSortedChanges, this.sortedChanges.length) - this.sortedChanges.length) - 1 >= 50) {
            break;
          }
        }
        this.loopLoadFunction = null;
      })();
    }
    await this.loopLoadFunction;
  }

  sliderEnabled = true;
  eventBarUpdate(event) {
    if (this.sliderEnabled == false) {
      return;
    }
    if (mouseDown() == false) {
      this.sliderEnabled = false;
      return this.editor.pipeline.unsubscribe("timelineSelectorMouse");
    }
    let useTotalChanges = Math.max(this.totalSortedChanges, this.sortedChanges.length);
    let barRect = this.sliderBar.getBoundingClientRect();
    let newCurrentChange = Math.round((Math.max(Math.min((clientPosition(event, "x") - barRect.x - 6) / (this.sliderBar.offsetWidth - 10), 1), 0)) * useTotalChanges);
    if (this.currentSortedChange != newCurrentChange) {
      this.currentSortedChange = newCurrentChange;
      this.updateTimeline({ skipMissingCheck: true });
    }
  }
  enableSlider(event) {
    this.sliderEnabled = true;
    this.editor.pipeline.subscribe("timelineSelectorMouse", "click_move", (data) => { this.eventBarUpdate(data.event); });
    this.editor.pipeline.subscribe("timelineSelectorMouse", "click_end", (data) => { this.eventBarUpdate(data.event); });
    this.eventBarUpdate(event);
  }

  async startPlaying() {
    if (this.playing == true) {
      return;
    }
    this.playing = true;
    this.skimPlayButton.querySelector("div[play]").setAttribute("hidden", "");
    this.skimPlayButton.querySelector("div[pause]").removeAttribute("hidden");
    if (this.currentSortedChange >= Math.max(this.totalSortedChanges, this.sortedChanges.length)) {
      this.currentSortedChange = 0;
      await this.updateTimeline({ fromPlayLoop: true });
    }
    while (this.playing == true) {
      await this.updateTimeline({ fromPlayLoop: true });
      if (this.currentSortedChange >= Math.max(this.totalSortedChanges, this.sortedChanges.length)) {
        return this.stopPlaying();
      }
      await sleep(350);
      this.currentSortedChange++;
    }
  }
  stopPlaying() {
    this.playing = false;
    this.skimPlayButton.querySelector("div[pause]").setAttribute("hidden", "");
    this.skimPlayButton.querySelector("div[play]").removeAttribute("hidden");
  }

  async updateFilter(setFilter) {
    this.timeline.setAttribute("disabled", "");
    this.filterButton.setAttribute("disabled", "");

    if ((this.lesson.lesson.settings ?? {}).anonymousMode == true && this.self.access < 4) {
      setFilter = null;
    }

    if (setFilter != null) {
      this.filterMembers = setFilter;
      this.filterCollaboratorCount.textContent = this.filterMembers.length;
      this.filterCollaboratorCount.style.display = "flex";
      this.filterButton.style.padding = "4px 4px 4px 10px";
    } else {
      this.filterMembers = null;
      this.filterCollaboratorCount.style.removeProperty("display");
      this.filterButton.style.removeProperty("padding");
    }

    this.sortedChanges = [];
    this.totalSortedChanges = 0;

    for (let i = 0; i < this.orderedChanges.length; i++) {
      let key = this.orderedChanges[i];
      let change = this.changes[key];
      if (this.filterMembers == null || this.filterMembers.includes(change.collaborator) == true) {
        this.sortedChanges.push(key);
      }
    }

    await Promise.all([
      new Promise(async (resolve) => {
        let parameters = [...(this.parameters ?? [])];
        if (this.filterMembers != null) {
          parameters.push("collaborators=" + this.filterMembers.join());
        }
        let path = "lessons/history/count";
        if (parameters.length > 0) {
          path += "?" + parameters.join("&");
        }
        let [code, body] = await sendRequest("GET", path, null, { session: this.parent.session, allowError: [403] });
        if (code == 200) {
          this.totalSortedChanges += body.count;
          let loadChange = body.count - this.sortedChanges.length;
          this.currentSortedChange += loadChange;
          await this.updateTimeline();
        }
        resolve();
      }),
      new Promise(async (resolve) => {
        if (this.sortedChanges.length < this.loadAmount) {
          await this.loadChanges();
        }
  
        this.currentSortedChange = Math.max(this.totalSortedChanges, this.sortedChanges.length);
        
        await this.updateTimeline();
  
        let isOffScreen = false;
        let centerTotalX = 0;
        let centerTotalY = 0;
        let lastChange = this.changes[this.lastRenderChange] ?? {};
        let lastChangeChanges = lastChange.changes ?? [];
        let totalAnnotationUpdates = lastChangeChanges.length;
        for (let i = 0; i < totalAnnotationUpdates; i++) {
          let annotation = (this.editor.annotations[(lastChangeChanges[i] ?? {})._id] ?? {}).render;
          if (annotation != null) {
            let annoRect = this.editor.utils.getRect(annotation);
            if (isOffScreen == false) {
              isOffScreen = this.editor.utils.annotationInViewport(null, annoRect) == false;
            }
            centerTotalX += annoRect.centerX;
            centerTotalY += annoRect.centerY;
          }
        }
        if (isOffScreen == true) {
          this.editor.utils.scrollToAnnotation({ p: [centerTotalX / totalAnnotationUpdates, centerTotalY / totalAnnotationUpdates] }, { animation: false });
        }
        (async (change = {}) => {
          let collaborator = await this.editor.utils.getCollaborator(change.collaborator);
          if (this.currentChange == change._id) {
            this.updateCollaboratorDisplay(collaborator);
          }
        })(lastChange);

        this.timeline.removeAttribute("disabled");
        if (this.collaboratorIDs != null) {
          if ((this.lesson.lesson.settings ?? {}).anonymousMode != true || this.self.access > 3) {
            this.filterButton.removeAttribute("disabled");
          }
        }
        resolve();
      })
    ]);
  }

  async js(frame) {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.main = frame.querySelector(".timelineInterface");
    this.contentHolder = frame.querySelector(".timelineContentHolder");

    this.closeButton = this.main.querySelector(".timelineClose");
    this.revertDivider = this.main.querySelector(".timelineTopDivider[revert]");
    this.revertButton = this.main.querySelector(".timelineRevert");
    this.filterButton = this.main.querySelector(".timelineFilter");
    this.filterCollaboratorCount = this.filterButton.querySelector("span");
    this.zoomButton = this.main.querySelector(".timelineZoom");

    this.toolbarHolder = this.main.querySelector(".timelineToolbarHolder");

    this.timeline = this.main.querySelector(".timelineHistory");

    this.sliderBar = this.timeline.querySelector(".timelineHistorySlider");
    this.sliderBarTrack = this.sliderBar.querySelector(".timelineHistoryBarTrack");
    this.sliderProgressBar = this.sliderBarTrack.querySelector("div[progress]");
    this.sliderLoaderBar = this.sliderBarTrack.querySelector("div[loader]");
    this.sliderButton = this.sliderBar.querySelector(".timelineHistoryTrack button");

    this.timelineDetail = this.timeline.querySelector(".timelineHistoryDetail");
    this.memberHolder = this.timelineDetail.querySelector(".timelineHistoryMemberHolder");
    this.memberFrame = this.memberHolder.querySelector(".timelineHistoryMember");
    this.memberProfileHolder = this.memberFrame.querySelector("div[profileholder]");
    this.memberCursor = this.memberProfileHolder.querySelector("div[cursor]");
    this.memberProfilePicture = this.memberProfileHolder.querySelector("div[profile]");
    this.memberContent = this.memberFrame.querySelector("div[content]");
    this.memberName = this.memberContent.querySelector("div[content] > div[name]");
    this.memberEmail = this.memberContent.querySelector("div[content] > div[email]");
    this.changeTime = this.timelineDetail.querySelector(".timelineHistoryTime");

    this.timelineChange = this.timeline.querySelector(".timelineHistoryChange");
    this.skimBackButton = this.timelineChange.querySelector(".timelineHistorySkim[back]");
    this.currentChangeText = this.timelineChange.querySelector(".timelineHistoryCurrentChange");
    this.skimNextButton = this.timelineChange.querySelector(".timelineHistorySkim[next]");
    this.skimPlayButton = this.timelineChange.querySelector(".timelineHistorySkim[play]");

    if (this.parentPipeline != null) {
      this.pipeline.pipelines.push(this.parentPipeline);
    }

    // Create editor:
    this.editor = await this.setFrame(Editor, this.contentHolder, {
      construct: {
        page: frame,
        lesson: this.lesson,
        self: { access: 0 },
        session: this.session,
        sessionID: this.sessionID,
        sources: this.sources,
        collaborators: this.collaborators,
        settings: this.lesson.lesson.settings,
        backgroundColor: this.backgroundColor,
        preferences: this.preferences
      }
    });
    this.editor.realtime.enabled = false;
    this.pipeline.pipelines.push(this.editor.pipeline);

    // Load annotations:
    if (this.annotations != null) {
      let annotations = Object.entries(this.annotations);
      for (let i = 0; i < annotations.length; i++) {
        let [annoID, annotation] = annotations[i];
        if (annotation.render != null) {
          this.editor.annotations[annoID] = { render: copyObject(annotation.render) };
          this.presentAnnotations[annoID] = { hidden: annotation.render.hidden == true };
        }
      }
      for (let i = 0; i < annotations.length; i++) {
        await this.editor.utils.setAnnotationChunks(this.editor.annotations[annotations[i][0]]);
      }
    } else {
      let path = "lessons/join/annotations";
      if ((this.parameters ?? []).length > 0) {
        path += "?" + this.parameters.join("&");
      }
      let [annoCode, annoBody] = await sendRequest("GET", path, null, { session: this.parent.session });
      if (annoCode != 200) {
        return this.editor.openAlert("error", `<b>Error Loading Annotations</b>Please try again later...`);
      }
      await this.editor.loadAnnotations({ annotations: annoBody.annotations });
      let annotations = Object.keys(annoBody.annotations);
      for (let i = 0; i < annotations.length; i++) {
        this.presentAnnotations[annotations[i]] = { hidden: (annoBody.annotations[annotations[i]] ?? {}).hidden == true };
      }
    }

    // Load additional editor modules:
    this.editor.register(TOOLBAR());

    await this.editor.render.setMarginSize();
    await this.editor.updateChunks();
    await this.editor.utils.centerWindowWithPage();

    this.realtimeHolder = this.editor.content.querySelector(".eRealtime");

    // Exit button event:
    this.closeButton.addEventListener("click", () => {
      if (this.close != null) {
        this.close();
      }
    });

    // Zoom event:
    this.editor.pipeline.subscribe("zoomTextUpdate", "zoom_change", (event) => {
      this.zoomButton.textContent = Math.round(event.zoom * 100) + "%";
    });
    this.zoomButton.addEventListener("click", () => {
      this.editor.openDropdown(this.zoomButton, ZoomDropdown, { parent: this, remove: ["snapping", "cursors", "cursornames", "comments", "stylusmode"] });
    });

    // Interface events:
    this.editor.pipeline.subscribe("accountUpdate", "account_settings", (event) => {
      if (event.settings.hasOwnProperty("toolbar") == true) {
        this.updateInterface();
      }
    });

    // Handle member frame open/close on hover:
    let closing = false;
    this.memberFrame.addEventListener("mouseover", () => {
      closing = false;
      this.memberContent.removeAttribute("notransition");
      this.memberHolder.style.overflow = "unset";
      this.memberHolder.setAttribute("extend", "");
    });
    this.memberFrame.addEventListener("mouseout", async () => {
      closing = true;
      this.memberHolder.removeAttribute("extend");
      await sleep(200);
      if (closing == true) {
        this.memberHolder.style.removeProperty("overflow");
      }
    });

    // Collaborator update event:
    this.editor.pipeline.subscribe("timelineCollaboratorUpdate", "collaborator_update", (collaborator) => {
      if (this.currentCollaboratorID == collaborator._id) {
        this.updateCollaboratorDisplay(collaborator);

        let allSelections = this.realtimeHolder.querySelectorAll('.timelineSelect[collaborator="' + collaborator._id + '"]');
        for (let i = 0; i < allSelections.length; i++) {
          let selection = allSelections[i];
          if (selection != null) {
            selection.style.setProperty("--themeColor", collaborator.color);
          }
        }
      }
    });

    // Timeline button events:
    this.skimBackButton.addEventListener("click", () => {
      if (this.currentSortedChange > 0) {
        this.currentSortedChange--;
        this.updateTimeline();
      }
    });
    this.skimNextButton.addEventListener("click", () => {
      if (this.currentSortedChange < Math.max(this.totalSortedChanges, this.sortedChanges.length)) {
        this.currentSortedChange++;
        this.updateTimeline();
      }
    });
    this.skimPlayButton.addEventListener("click", () => {
      if (this.playing == false) {
        this.startPlaying();
      } else {
        this.stopPlaying();
      }
    });

    // Slider bar events:
    this.sliderBar.addEventListener("mousedown", (event) => { this.enableSlider(event); });
    this.sliderBar.addEventListener("touchstart", (event) => { this.enableSlider(event); }, { passive: true });

    // Handle selection box updates on zoom:
    this.editor.pipeline.subscribe("timelineZoomUpdate", "zoom_change", () => {
      let annotationRect = this.editor.utils.localBoundingRect(this.editor.annotationHolder);
      let allSelections = this.realtimeHolder.querySelectorAll(".timelineSelect");
      for (let i = 0; i < allSelections.length; i++) {
        let selection = allSelections[i];
        let [annoID] = selection.getAttribute("merged").split("_");
        let render = {};
        if (this.editor.annotations[annoID] == null) {
          selection.remove();
          continue;
        }
        render = { ...((this.editor.annotations[annoID]).render ?? {}), ...(this.editor.selecting[annoID] ?? {}) };
        if (render.f == null) {
          continue;
        }
        let rect = this.editor.utils.getRect(render);
        selection.setAttribute("notransition", "");
        let rotate = rect.rotation;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        selection.style.width = ((rect.width * this.editor.zoom) - 3) + "px";
        selection.style.height = ((rect.height * this.editor.zoom) - 3) + "px";
        selection.style.transform = "translate(" + (annotationRect.left + (rect.x * this.editor.zoom) + this.editor.contentHolder.scrollLeft - 1.5) + "px," + (annotationRect.top + (rect.y * this.editor.zoom) + this.editor.contentHolder.scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
        selection.offsetHeight;
        selection.removeAttribute("notransition");
      }
    });

    // Revert button:
    this.revertButton.addEventListener("click", async () => {
      frame.setAttribute("disabled", "");
      let parameters = [...(this.parameters ?? [])];
      if (this.currentChange != null) {
        parameters.push("change=" + this.currentChange);
      }
      let path = "lessons/history/revert";
      if (parameters.length > 0) {
        path += "?" + parameters.join("&");
      }
      let [code] = await sendRequest("GET", path, null, { session: this.parent.session });
      if (code == 200) {
        if (this.close != null) {
          return this.close();
        }
      }
      frame.removeAttribute("disabled", "");
    });

    // Filter button:
    (async () => {
      let [code, body] = await sendRequest("GET", "lessons/history/collaborators?" + [...(this.parameters ?? []), ("before=" + this.loadEpoch)].join("&"), null, { session: this.session, allowError: [403] });
      this.collaboratorIDs = [];
      for (let i = 0; i < body.length; i++) {
        let collaborator = body[i];
        if (this.editor.collaborators[collaborator._id] == null) {
          this.editor.collaborators[collaborator._id] = collaborator;
        }
        this.collaboratorIDs.push(collaborator._id);
      }
      if ((this.lesson.lesson.settings ?? {}).anonymousMode != true || this.self.access > 3) {
        this.filterButton.removeAttribute("disabled");
      }
    })();
    this.filterButton.addEventListener("click", () => {
      this.editor.openDropdown(this.filterButton, FilterDropdown, { parent: this });
    });

    // Initialize timeline:
    this.loadEpoch = getEpoch();
    await this.updateFilter(); // Not sure why this is needed... but it is (for Breakout)!
    if (this.filter != null) {
      await this.updateFilter(this.filter);
    }

    this.updateInterface();
  }
}