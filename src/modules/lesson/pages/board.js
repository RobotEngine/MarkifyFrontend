import {
  fixed,
  favicon,

  userID,
  account,

  mouseDown,
  setPage,
  setFrame,
  sleep,
  getParam,
  modifyParams,
  getEpoch,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  objectUpdate
} from "@/crucial";

import { Editor } from "@modules/editor/Editor";

export class Page {
  html = `
  <div class="boPage" main>
    <div class="eInterface customScroll">
      <div class="eTopHolder">
        <button class="eTopScroll" left style="left: 7px"></button>
        <button class="eTopScroll" right style="right: 7px"></button>
        <div class="eTop">
          <div class="eTopSection" left>
            <a class="eLogo" href="/app/dashboard" draggable="false"></a>
            <div class="eFileNameHolder border"><div class="eFileName" spellcheck="false"></div></div>
            <button class="eFileDropdown">File</button>
            <button class="eCreateCopy">Create Copy</button>
            <div class="eTopDivider"></div>
            <button class="eSaveProgress eUndo" disabled></button>
            <button class="eSaveProgress eRedo" disabled></button>
            <div class="eStatusHolder"><div class="eStatus">
              <div strength="3" title="Strong Connection | All features seamlessly synced to the cloud."></div>
              <div strength="2" title="Weak Connection | Cloud-saved annotations, limited real-time features."></div>
              <div strength="1" title="No Connection | Changes stored on-device, synced to cloud upon reconnecting."></div>
            </div></div>
          </div>
          <div class="eTopSection" scroll>
            <div class="eTopDivider"></div>
          </div>
          <div class="eTopSection" right>
            <button class="eMembers"><span class="eMemberHandCount" membercount title="Number of hands raised."></span><span class="eMemberIdleCount" membercount title="Number of idle members."></span><span class="eMemberCount" membercount title="Number of members."></span>Members</button>
            <button class="eEndSession" title="End Session | Disable all editing access making everyone a viewer."></button>
            <button class="eShare">Share</button>
            <button class="eMemberOptions" dropdowntitle="Member Options" title="Member Options | Configure various member settings and available tools."></button>
            <button class="eSharePin"></button>
            <div class="eTopDivider"></div>
            <button class="eZoom">100%</button>
            <button class="eAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
            <button class="eLogin">Login</button>
          </div>
        </div>
      </div>
      <div class="eToolbarHolder" toolbarholder hidden>
        <div class="eToolbar" editor keeptooltip hidden notransition></div>
        <div class="eToolbar" viewer keeptooltip hidden notransition>
          <div class="eToolbarContent eVerticalToolsHolder">
            <button class="eTool" tool="raisehand" tooltip="Raise Hand" noselect style="--theme: var(--green); --hoverColor: rgba(var(--greenRGB), .3)"><div></div></button>
            <div class="eDivider"></div>
            <button class="eTool" tool="select" tooltip="Select" selected><div></div></button>
            <button class="eTool" tool="pan" tooltip="Pan"><div></div></button>
          </div>
        </div>
      </div>
      <div class="eBottomHolder">
        <div class="eBottom">
          <div class="eBottomSection" observebottomsection left>
            <img class="eObserveIcon" src="../images/editor/members/observe.svg" />
            <div class="eObserveText">Observing</div>
            <div class="eObserveCursor" observecursor></div>
            <button class="eObserveExit buttonAnim border" observeexit></button>
          </div>
          <div class="eBottomSectionSpacer"></div>
          <div class="eBottomSection" right>
            <button class="ePageNav" down></button>
            <div class="eCurrentPage border" contenteditable></div>
            <button class="ePageNav" up></button>
          </div>
        </div>
      </div>
    </div>
    <div class="eContentHolder customScroll" disabled></div>
  </div>
  <div class="boPage" timeline hidden></div>
  `;
  css = {
    ".boPage": `position: absolute; display: block; width: 100%; height: 100%; left: 0px; top: 0px; z-index: 2; pointer-events: all; transition: .2s`,
    ".boPage[hidden]": `z-index: 1`,
    ".eInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; transform: translateZ(0); visibility: hidden; pointer-events: none; user-select: none; contain: strict; overflow: scroll; z-index: 2`,
    ".eContentHolder": `position: relative; width: 100%; height: 100%; background: var(--pageColor); contain: strict; overflow: scroll; z-index: 1; transition: .5s`,
    ".eCreateBoardHolder": `position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; overflow: hidden; z-index: 3; pointer-events: none`,
    
    ".eTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".eTop": `position: absolute; display: flex; box-sizing: border-box; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".eTopHolder[scroll] .eTop": `gap: 0px !important; padding: 0 6px !important; padding-bottom: 0px !important; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eTop::-webkit-scrollbar": `display: none`,
    ".eTopSection[scroll]": `display: none`,
    ".eTopHolder[scroll] .eTopSection[scroll]": `display: flex !important`,
    ".eTopScroll": `position: absolute; display: flex; width: 36px; height: 36px; top: 50%; transform: translateY(-50%); background: rgba(var(--hoverRGB), .75); opacity: 0; backdrop-filter: blur(2px); border-radius: 18px; justify-content: center; align-items: center; z-index: 200`,
    ".eTopScroll svg": `width: 22px`,
    ".eTopScroll:active": `transform: translateY(-50%) scale(.85) !important`,
    ".eTopSection": `display: flex; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".eTopHolder[scroll] .eTopSection": `padding: 6px 0px !important; box-shadow: unset !important`,
    ".eTopSection[left]": `border-bottom-right-radius: 12px`,
    ".eTopSection[right]": `border-bottom-left-radius: 12px`,

    ".eLogo": `display: flex; width: 38px; height: 38px; padding: 0; margin-right: 4px; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".eLogo:hover": `background: var(--hover)`,
    ".eLogo svg": `width: 32px; height: 32px; transition: .2s`,
    ".eLogo:hover svg": `transform: scale(.9)`,
    ".eFileNameHolder": `margin: 0 4px; --borderRadius: 4px; --borderColor: var(--secondary); --borderWidth: 0px; --transition: .05s`,
    ".eFileName": `max-width: 350px; padding: 0px; outline: unset; font-size: 20px; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; scrollbar-width: none`,
    ".eFileName:focus": `padding: 4px 6px !important; overflow-x: auto !important; text-overflow: unset !important`,
    ".eFileName::-webkit-scrollbar": `display: none`,
    ".eFileDropdown": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eCreateCopy": `padding: 6px 10px; height: 32px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".eTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".eSaveProgress": `display: flex; width: 32px; height: 32px; padding: 0; align-items: center; overflow: hidden; background: var(--lightGray)`,
    ".eSaveProgress svg": `width: 24px; height: 24px; margin: 2px`,
    ".eUndo": `margin: 0 2px 0 4px; justify-content: end; border-radius: 16px 4px 4px 16px`,
    ".eRedo": `margin: 0 4px 0 2px; justify-content: start; border-radius: 4px 16px 16px 4px`,
    ".eStatusHolder": `display: flex; width: 32px; height: 32px; margin: 4px; justify-content: center; align-items: center`,
    ".eStatus": `position: relative; width: 100%; height: 100%; transform: scale(.9)`,
    ".eStatus > div": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; transition: .4s`,
    ".eStatus svg *": `transform-origin: center; transition: .4s`,
    ".eStatus[saving] [saved]": `opacity: 0`,
    ".eStatus:not([saving]) [saving]": `opacity: 0`,
    ".eStatus:not([saving]) [animation]": `animation-play-state: paused`,
    ".eStatus [animation]": `animation: eStatusSpinAnimation 2s linear infinite`,
    "@keyframes eStatusSpinAnimation": `from { transform: rotate(0deg) } to { transform: rotate(360deg) }`,

    ".eMembers": `display: flex; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--hover); border-radius: 16px; align-items: center; font-size: 16px; font-weight: 600`,
    ".eMembers span": `display: none; min-width: 12px; height: 24px; padding: 0px 6px; margin-right: 5px; justify-content: center; align-items: center; background: var(--pageColor); border-radius: 12px; font-weight: 700`,
    ".eMemberCount": `--themeColorRGB: var(--themeRGB); color: rgb(var(--themeColorRGB))`,
    ".eMemberHandCount": `--themeColorRGB: var(--greenRGB); color: rgb(var(--themeColorRGB))`,
    ".eMemberIdleCount": `--themeColorRGB: var(--yellowRGB); color: rgb(var(--themeColorRGB))`,
    ".eEndSession": `display: none; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--error); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".eEndSession svg": `width: 28px; height: 28px`,
    ".eShare": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,
    ".eMemberOptions": `display: none; width: 32px; height: 32px; padding: 0px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; justify-content: center; align-items: center; color: #fff; font-size: 16px; font-weight: 600`,
    ".eMemberOptions svg": `width: 32px; height: 32px`,
    ".eSharePin": `display: none; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eZoom": `height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--lightGray); border-radius: 16px; font-size: 16px; font-weight: 600`,
    ".eAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".eAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".eLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,

    ".eToolbarHolder": `position: relative; display: block; flex: 1; visibility: visible`,

    ".eBottomHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".eBottom": `position: absolute; display: flex; width: 100%; gap: 8px; padding-top: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".eBottom::-webkit-scrollbar": `display: none`,
    ".eBottomSection": `display: none; box-sizing: border-box; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); border-radius: 12px 12px 0 0; pointer-events: all`,
    ".eBottomSection[hidden]": `display: none`,
    ".eBottomSection:first-child": `border-top-left-radius: 0`,
    ".eBottomSection:last-child": `border-top-right-radius: 0`,
    ".eBottomSectionSpacer": `flex: 1`,
    ".eObserveIcon": `width: 34px; height: 34px; margin: 2px`,
    ".eObserveText": `margin: 0 6px`,
    ".eObserveCursor": `box-sizing: border-box; display: flex; padding: 2px 6px; margin-right: 4px; background: var(--theme); color: #fff; border: solid 3px var(--pageColor); box-shadow: 0 0 6px rgb(0 0 0 / 25%); border-radius: 8px 14px 14px; font-size: 14px; font-weight: 700`,
    ".eObserveExit": `display: flex; position: relative; width: 22px; height: 22px; margin: 8px; justify-content: center; align-items: center; --borderWidth: 3px; --borderRadius: 14px`,
    ".eObserveExit svg": `width: 12px; height: 12px; flex-shrink: 0`,
    ".ePageNav": `display: flex; width: 32px; height: 32px; padding: 6px; margin: 0 4px; justify-content: center; align-items: center; background: var(--lightGray); border-radius: 16px`,
    ".ePageNav svg": `width: 100%; height: 100%`,
    ".eCurrentPage": `min-width: 8px; max-height: 24px; padding: 4px 0; margin: 0 6px; font-size: 20px; outline: unset`,
    ".eCurrentPage:focus": `padding: 4px 12px; --borderWidth: 3px; --borderColor: var(--secondary); --borderRadius: 12px`,
    ".eBottomSection[breakout]": `display: flex; box-shadow: var(--breakoutLightShadow)`,
    ".eBottomSection[breakout] button": `display: flex; width: 38px; height: 38px; padding: 0; border-radius: 6px; justify-content: center; align-items: center`,
    ".eBottomSection[breakout] button:hover": `background: var(--breakoutHover)`,
    ".eBottomSection[breakout] button svg": `width: 32px; height: 32px; transition: .2s`,
    ".eBottomSection[breakout] button:hover svg": `transform: scale(.9)`
  };
  async js(frame, extra) {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.lesson = this.parent.lesson;
    this.session = this.parent.session;

    let page = frame.closest(".content");
    let mainPage = page.querySelector(".boPage[main]");
    let timelinePage = page.querySelector(".boPage[timeline]");

    let eTopHolder = mainPage.querySelector(".eTopHolder");
    let eTop = eTopHolder.querySelector(".eTop");
    let eBottom = mainPage.querySelector(".eBottom");

    let leftTop = eTop.querySelector(".eTopSection[left]");
    let icon = leftTop.querySelector(".eLogo");
    let lessonName = leftTop.querySelector(".eFileName");
    let fileButton = leftTop.querySelector(".eFileDropdown");
    let createCopyButton = leftTop.querySelector(".eCreateCopy");
    let undoButton = leftTop.querySelector(".eUndo");
    let redoButton = leftTop.querySelector(".eRedo");
    let status = leftTop.querySelector(".eStatus");

    let rightTop = eTop.querySelector(".eTopSection[right]");
    let membersButton = rightTop.querySelector(".eMembers");
    let endSessionButton = rightTop.querySelector(".eEndSession");
    let shareButton = rightTop.querySelector(".eShare");
    let optionsButton = rightTop.querySelector(".eMemberOptions");
    let sharePinButton = rightTop.querySelector(".eSharePin");
    let zoomButton = rightTop.querySelector(".eZoom");
    let accountButton = rightTop.querySelector(".eAccount");
    let loginButton = rightTop.querySelector(".eLogin");

    let eTopScrollLeft = eTopHolder.querySelector(".eTopScroll[left]");
    let eTopScrollRight = eTopHolder.querySelector(".eTopScroll[right]");

    let contentHolder = mainPage.querySelector(".eContentHolder");

    let toolbarHolder = page.querySelector(".eToolbarHolder");
    let editorToolbar = toolbarHolder.querySelector(".eToolbar[editor]");
    let viewerToolbar = toolbarHolder.querySelector(".eToolbar[viewer]");
    let handButton = viewerToolbar.querySelector('.eTool[tool="raisehand"]');
    let selectButton = viewerToolbar.querySelector('.eTool[tool="select"]');
    let panButton = viewerToolbar.querySelector('.eTool[tool="pan"]');

    let currentPageHolder = eBottom.querySelector(".eBottomSection[right]");
    let pageTextBox = currentPageHolder.querySelector(".eCurrentPage");
    let increasePageButton = currentPageHolder.querySelector(".ePageNav[down]");
    let decreasePageButton = currentPageHolder.querySelector(".ePageNav[up]");

    let stringPref = JSON.stringify(this.parent.preferences); // Must be duplicated

    this.editor = await this.setFrame(Editor, contentHolder, {
      construct: {
        page: mainPage,
        pageID: this.pageID,
        pageType: this.pageType,
        id: this.parent.id,
        lesson: this.parent,
        self: this.parent.self,
        session: this.parent.session,
        sessionID: this.parent.sessionID,
        sources: this.parent.sources,
        pageRenderPipeline: this.parent.pageRenderPipeline,
        collaborators: this.parent.collaborators,
        settings: this.parent.lesson.settings,
        resync: this.resync,
        preferences: JSON.parse(stringPref),
        lastSavePreferences: JSON.parse(stringPref),
        backgroundColor: this.lesson.background ?? "FFFFFF",
        minimumEditingAccess: 1
      }
    });
    this.pipeline = this.editor.pipeline;

    page.addEventListener("pointerdown", (event) => {
      this.pipeline.publish("pointerdown", { event: event });
      this.pipeline.publish("click_start", { type: "pointerdown", event: event });
    }, { passive: false });
    page.addEventListener("touchstart", (event) => {
      this.pipeline.publish("touchstart", { event: event });
    }, { passive: false });
    page.addEventListener("click", (event) => {
      this.pipeline.publish("click", { event: event });
    }, { passive: false });
    page.addEventListener("mouseleave", (event) => {
      this.pipeline.publish("mouseleave", { event: event });
    });
    page.addEventListener("contextmenu", (event) => {
      this.pipeline.publish("contextmenu", { event: event });
    });

    // Fetch annotations:
    let pageParam = getParam("page");
    let checkForJumpLink = getParam("annotation");
    (async () => {
      if (this.session == null) {
        return;
      }
      let [annoCode, annoBody] = await sendRequest("GET", "lessons/join/annotations", null, { session: this.parent.session });
      if (annoCode != 200 && connected == true) {
        return alertModule.open("error", `<b>Error Loading Annotations</b>Please try again later...`);
      }
      await this.editor.loadAnnotations(annoBody, { pageID: pageParam, jumpID: checkForJumpLink });
      contentHolder.removeAttribute("disabled");
    })();
  }
}