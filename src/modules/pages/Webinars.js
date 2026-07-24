import { setPage, checkForAuth, promptLogin, PageFrame, userID, account, getParam, modifyParams } from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";
import { modal as modalModule } from "@modules/utility/Modal";

import logoIcon from "@assets/logo.svg?raw";

import boardBadgeIcon from "@assets/badges/blurred/board.png?no-inline";
import breakoutBadgeIcon from "@assets/badges/blurred/breakout.png?no-inline";
import boardBreakoutBadgeIcon from "@assets/badges/blurred/boardbreakout.png?no-inline";

import splashBannerImg from "@assets/webinars/summerseries/wavesbeach.png?no-inline";
import summerseriesImg from "@assets/webinars/summerseries/logo.png?no-inline";
import presenterA from "@assets/webinars/summerseries/anthony.png?no-inline";
import presenterB from "@assets/webinars/summerseries/jeff.png?no-inline";

class EmbedModal {
  html = `<div class="wemFrame"><iframe frameborder="0" allow="fullscreen; payment" aria-hidden="false" tabindex="0"></iframe></div>`;
  css = {
    ".wemFrame": `width: 500px; height: 754px; max-width: 100%; max-height: calc(var(--maxHeight) - 4px)`,
    ".wemFrame iframe": `position: absolute; left: 0px; top: 0px; width: 100% !important; height: 100% !important; transform: unset !important; background: var(--pageColor); border: none; opacity: 0; transition: .4s`
  };
  js(frame, extra) {
    if (userID == null) {
      checkForAuth(true);
      return this.close();
    }

    let event = extra.event;
    if (event == null) {
      return this.close();
    }

    frame.closest(".modalContent").style.padding = "4px 0 0";
    
    let embedFrameHolder = frame.querySelector(".wemFrame");
    let embedFrame = embedFrameHolder.querySelector("iframe");
    embedFrame.addEventListener("load", () => {
      embedFrame.style.opacity = 1;
    });
    embedFrame.src = (
      "https://luma.com/embed/event/"
      + event
      + "/simple?email=" + encodeURIComponent(account.email)
      + "&name=" + encodeURIComponent(account.user)
      + "&utm_campaign=summer-pd-webinars"
      + "&utm_source=markify" //&lt=light
    );
    
    frame.closest(".fixedItemHolder").addEventListener("click", () => {
      this.close();
    });
  }
  onClose() {
    modifyParams("event");
  }
}

export class Page extends PageFrame {
  title = "Summer PD";

  html = `<div class="wPageHolder">
    <div class="wPage">
      <div class="wInterface customScroll">
        <div class="wTopHolder">
          <div class="wTop">
            <div class="wTopSection" left>
              <a class="wTopLogo" openpage="launch" href="/launch">${logoIcon}</a>
            </div>
            <div class="wTopSection" right>
              <a class="wOpen" openpage="app/dashboard" href="/app/dashboard">Open Markify</a>
              <div class="wTopDivider"></div>
              <button class="wAccount"><img src="../images/profiles/default.svg" accountimage /><div accountuser></div></button>
              <button class="wLogin">Login</button>
            </div>
          </div>
        </div>
      </div>
      <div class="wContentHolder customScroll">
        <div class="wInfoContent">
          <div class="wInfoBannerHolder">
            <img class="wInfoBanner" src="${splashBannerImg}" />
            <img class="wInfoBannerLogo" src="${summerseriesImg}" />
          </div>
          <div class="wInfoHeader">Learn the <i>Waves</i> of <b>Markify</b></div>
          <div class="wDivider"></div>
          <div class="wInfoText">Join one (or more) of our 30-minute live summer sessions to master whole-class collaboration, streamline small-group breakouts, or even combine both into one seamless lesson.</div>
          <div class="wInfoText" breakout>In three of our sessions, we will introduce our new tool: <b>Markify Breakout</b></div>
          <div class="wInfoText">Can't make any sessions? Recordings will be posted on YouTube afterword!</div>
          <div class="wInfoHeader">Meet the <b>Presenters</b></div>
          <div class="wDivider"></div>
          <div class="wInfoPresenterHolder">
            <a class="wInfoPresenter" href="https://www.linkedin.com/in/beckett-anthony" target="_blank" style="--themeColor: var(--purpleRGB); --rotate: -12deg">
              <div class="wInfoPresenterCursor">
                <img src="${presenterA}" style="--transform: translate(-2px, 8px) scale(1.2)" />
              </div>
              <div class="wInfoPresenterLabel">
                <div name>Anthony Beckett</div>
                <div role>Founder</div>
              </div>
            </a>
            <a class="wInfoPresenter" href="https://www.linkedin.com/in/jeffrey-stark-phd-36743684" target="_blank" style="--themeColor: var(--greenRGB); --rotate: 18deg">
              <div class="wInfoPresenterCursor">
                <img src="${presenterB}" style="--transform: translate(-4px, -4px) scale(1.1)" />
              </div>
              <div class="wInfoPresenterLabel">
                <div name>Jeff Stark, PhD</div>
                <div role>Educator</div>
              </div>
            </a>
          </div>
        </div>
        <div class="wEventsContent">
          <div class="wEventsHeader"><i>Upcoming Webinars</i></div>
          <div class="wDivider"></div>
          <div class="wEventsHolder">

            <a class="wEvent" event="evt-O3Mefd6onUQiZJn">
              <div class="wEventHeader">
                <div class="wEventLogo"><img src="${boardBadgeIcon}" /></div>
                <div class="WEventInfo">
                  <div class="WEventInfoTitle">Whole-Class Collaboration That Works</div>
                  <div class="WEventTimeHolder">
                    <div date>Tuesday, <b>Aug 4</b></div>
                    <div time><b>11:00 - 11:30 AM</b> CDT</div>
                  </div>
                </div>
              </div>
              <div class="wEventContent">
                <div class="wEventContentText">Learn how to use Markify Board to turn whole-class instruction into an interactive, collaborative experience where every student contributes.</div>
                <button class="largeButton">Register</button>
              </div>
            </a>
            <a class="wEvent" event="evt-whhzNUVYeGCL7TR">
              <div class="wEventHeader">
                <div class="wEventLogo"><img src="${breakoutBadgeIcon}" /></div>
                <div class="WEventInfo">
                  <div class="WEventInfoTitle">Group Work That Works</div>
                  <div class="WEventTimeHolder">
                    <div date>Friday, <b>Aug 7</b></div>
                    <div time><b>1:00 - 1:30 PM</b> CDT</div>
                  </div>
                </div>
              </div>
              <div class="wEventContent">
                <div class="wEventContentText">See how Markify Breakout helps create more focused, productive, and engaging small-group learning experiences.</div>
                <button class="largeButton">Register</button>
              </div>
            </a>
            <a class="wEvent" event="evt-t4EvLXShKQjA8uR">
              <div class="wEventHeader">
                <div class="wEventLogo"><img src="${boardBadgeIcon}" /></div>
                <div class="WEventInfo">
                  <div class="WEventInfoTitle">Whole-Class Collaboration That Works</div>
                  <div class="WEventTimeHolder">
                    <div date>Wednesday, <b>Aug 12</b></div>
                    <div time><b>11:00 - 11:30 AM</b> CDT</div>
                  </div>
                </div>
              </div>
              <div class="wEventContent">
                <div class="wEventContentText">Learn how to use Markify Board to turn whole-class instruction into an interactive, collaborative experience where every student contributes.</div>
                <button class="largeButton">Register</button>
              </div>
            </a>
            <a class="wEvent" event="evt-II60KMUuUDfnt9D">
              <div class="wEventHeader">
                <div class="wEventLogo"><img src="${breakoutBadgeIcon}" /></div>
                <div class="WEventInfo">
                  <div class="WEventInfoTitle">Group Work That Works</div>
                  <div class="WEventTimeHolder">
                    <div date>Thursday, <b>Aug 20</b></div>
                    <div time><b>3:00 - 3:30 PM</b> CDT</div>
                  </div>
                </div>
              </div>
              <div class="wEventContent">
                <div class="wEventContentText">See how Markify Breakout helps create more focused, productive, and engaging small-group learning experiences.</div>
                <button class="largeButton">Register</button>
              </div>
            </a>
            <a class="wEvent" event="evt-JxgRQ7wABFWPx8f">
              <div class="wEventHeader">
                <div class="wEventLogo"><img src="${boardBreakoutBadgeIcon}" /></div>
                <div class="WEventInfo">
                  <div class="WEventInfoTitle">Tying Whole-Class and Group Work Into One Lesson</div>
                  <div class="WEventTimeHolder">
                    <div date>Wednesday, <b>Aug 26</b></div>
                    <div time><b>4:00 - 4:30 PM</b> CDT</div>
                  </div>
                </div>
              </div>
              <div class="wEventContent">
                <div class="wEventContentText">Learn how Markify Board and Breakout work together to support a seamless lesson plan with whole-class and small-group collaboration.</div>
                <button class="largeButton">Register</button>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  </div>`;
  css = {
    ".wPageHolder": `position: fixed; box-sizing: border-box; display: flex; width: 100vw; width: 100dvw; height: 100vh; height: 100dvh; padding: 8px; left: 0px; top: 0px; justify-content: center`, //transition: .2s
    ".wPage": `position: relative; display: flex; width: 100%; height: 100%; max-width: 1000px; box-shadow: var(--darkShadow); border-radius: 12px; overflow: hidden`,
    ".wInterface": `position: absolute; display: flex; flex-direction: column; width: 100%; height: 100%; left: 0px; top: 0px; visibility: hidden; pointer-events: none; user-select: none; overflow-x: none; overflow-y: scroll; z-index: 2`,
    
    ".wTopHolder": `position: relative; width: 100%; height: 50px; margin-bottom: 8px; visibility: visible`,
    ".wTop": `position: absolute; box-sizing: border-box; display: flex; width: 100%; gap: 8px; padding-bottom: 8px; left: 0px; top: 0px; justify-content: space-between; overflow-x: auto; overflow-y: hidden; scrollbar-width: none`,
    ".wTop::-webkit-scrollbar": `display: none`,
    ".wTopSection": `box-sizing: border-box; display: flex; height: 50px; padding: 6px; flex-shrink: 0; align-items: center; background: var(--pageColor); box-shadow: var(--lightShadow); pointer-events: all`,
    ".wTopSection[left]": `border-bottom-right-radius: 12px`,
    ".wTopSection[right]": `border-bottom-left-radius: 12px`,
    ".wTopLogo": `display: flex; height: 38px; padding: 0; user-select: none; justify-content: center; align-items: center; border-radius: 6px`,
    ".wTopLogo:hover": `background: var(--hover)`,
    ".wTopLogo svg": `height: 100%; transition: .2s`,
    ".wOpen": `box-sizing: border-box; height: 32px; padding: 6px 10px; margin: 0 4px; background: var(--theme); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600; text-decoration: none`,
    ".wTopDivider": `width: 4px; height: 32px; margin: 0 4px; background: var(--lightGray); border-radius: 2px`,
    ".wAccount": `padding: 0; width: 32px; height: 32px; margin: 0 4px; border-radius: 16px; overflow: hidden`,
    ".wAccount img": `width: 100%; height: 100%; object-fit: cover`,
    ".wLogin": `height: 32px; display: none; padding: 6px 10px; margin: 0 4px; background: var(--secondary); border-radius: 16px; color: #fff; font-size: 16px; font-weight: 600`,

    ".wContentHolder": `position: relative; box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 24px; width: 100%; height: 100%; padding: 66px 16px 16px; overflow-x: none; overflow-y: scroll; z-index: 1; transition: .5s`,
    ".wDivider": `box-sizing: border-box; width: 80%; margin: 8px 0 16px 0; height: 4px; background-image: linear-gradient(90deg, transparent, var(--hover) 25%, var(--hover) 75%, transparent); border-radius: 2px`,

    ".wInfoContent": `box-sizing: border-box; display: flex; flex-direction: column; flex: 1 1 250px; height: fit-content; padding: 12px; box-shadow: inset var(--lightShadow); border-radius: 24px; align-items: center`,
    ".wInfoBannerHolder": `position: relative; width: 100%; margin-bottom: 32px`,
    ".wInfoBanner": `width: 100%; height: 200px; border-radius: 12px; object-fit: cover`,
    ".wInfoBannerLogo": `position: absolute; max-width: calc(100% - 16px); height: 60%; left: 50%; top: 100%; transform: translate(-50%, -70%); object-fit: contain`,
    ".wInfoHeader": `margin-top: 32px; font-size: 20px; font-weight: 500`,
    ".wInfoHeader i": `display: inline-block; font-size: 24px; font-weight: 700; transform: translateX(-4px)`,
    ".wInfoHeader b": `color: var(--theme); font-size: 24px; font-weight: 700`,
    ".wInfoText": `box-sizing: border-box; width: 100%; max-width: 350px; font-size: 16px; line-height: 1.5; text-align: left`,
    ".wInfoText:not(:first-child)": `margin-top: 12px`,
    ".wInfoText[breakout] b": `color: var(--breakoutTheme)`,
    ".wInfoPresenterHolder": `display: flex; flex-wrap: wrap; justify-content: center`,
    ".wInfoPresenter": `--shadowOpacity: .4; --shadow: 0px 0px 12px 0px rgba(var(--themeColor), var(--shadowOpacity)); --translateY: 0px; display: flex; flex-direction: column; margin: 16px; align-items: center; text-decoration: none; transition: .4s`,
    ".wInfoPresenter:hover": `--shadowOpacity: .6; --translateY: -46px !important; --rotate: 0deg !important`,
    ".wInfoPresenterCursor": `box-sizing: border-box; display: flex; width: 100%; max-width: 132px; height: 100% max-height: 132px; background: var(--pageColor); border: solid 6px var(--pageColor); box-shadow: var(--shadow); border-radius: 20% 50% 50%; transform: translateY(var(--translateY)) rotate(var(--rotate)); overflow: hidden; justify-content: center; align-items: center; transition: .4s`,
    ".wInfoPresenterCursor img": `width: 100%; height: 100%; transform: var(--transform) rotate(calc(-1 * var(--rotate))); object-fit: cover; transition: .4s`,
    ".wInfoPresenterLabel": `box-sizing: border-box; width: fit-content; max-width: 100%; padding: 6px 12px; margin-top: -38px; background: rgba(var(--background), .9); backdrop-filter: blur(12px); box-shadow: var(--shadow); border-radius: 16px; transition: .4s`,
    ".wInfoPresenterLabel div[name]": `font-size: 16px; font-weight: 500`,
    ".wInfoPresenterLabel div[role]": `margin-top: 4px; color: rgb(var(--themeColor)); font-size: 14px; font-weight: 600`,

    ".wEventsContent": `box-sizing: border-box; display: flex; flex-direction: column; flex: 1 1 350px; min-width: min(300px, 100%); padding: 6px; align-items: center`,
    ".wEventsHeader": `width: 100%; color: var(--theme); font-size: 24px; font-weight: 700`,
    ".wEventsHolder": `display: flex; flex-direction: column; gap: 16px; width: 100%; align-items: center`,
    ".wEvent": `--hoverSize: 0px; --shadowOpacity: 0; position: relative; box-sizing: border-box; display: flex; flex-direction: column; width: 100%; padding: 6px; border-radius: calc(12px + var(--hoverSize)); text-decoration: none; outline-offset: 6px`,
    ".wEvent:hover, .wEvent:focus-within": `--hoverSize: 6px; --shadowOpacity: .5`,
    ".wEvent:before": `content: ""; position: absolute; width: calc(100% + (var(--hoverSize) * 2)); height: calc(100% + (var(--hoverSize) * 2)); left: 50%; top: 50%; transform: translate(-50%, -50%); background: var(--pageColor); box-shadow: 0px 0px 8px 0px rgba(var(--themeRGB), var(--shadowOpacity)); border-radius: calc(18px + var(--hoverSize)); z-index: 1; transition: .2s`,
    ".wEventHeader": `display: flex; flex-wrap: wrap; z-index: 2`,
    ".wEventLogo": `width: 80px; max-width: 100%; height: 80px`, // padding: 6px; box-shadow: inset var(--lightShadow); border-radius: 12px
    ".wEventLogo img": `width: 100%; height: 100%`,
    ".WEventInfo": `display: flex; flex-direction: column; flex: 1 1 300px; padding: 12px; justify-content: space-between`,
    ".WEventInfoTitle": `font-size: 18px; font-weight: 600; text-align: left`,
    ".WEventTimeHolder": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 8px; width: 100%; margin-top: 8px`,
    ".WEventTimeHolder div": `padding: 4px 10px; box-shadow: inset var(--lightShadow); border-radius: 16px; font-size: 14px; font-weight: 500`,
    ".WEventTimeHolder div b": `color: var(--theme); font-weight: 700`,
    ".wEventContent": `box-sizing: border-box; display: flex; flex-wrap: wrap; gap: 12px; width: 100%; padding: 12px; justify-content: center; align-items: center; z-index: 2`,
    ".wEventContentText": `flex: 1 1 300px; font-size: 14px; line-height: 1.25; text-align: left`,
    ".wEventContent .largeButton": `--borderRadius: 14px; height: fit-content; background: var(--theme); color: #fff`
  };

  promptRegistration(event) {
    modifyParams("event", event);
    modalModule.open(EmbedModal, this.frame, { event, title: "Webinar Registration" });
  }

  js(page) {
    // Account setup:
    let accountButton = page.querySelector(".wAccount");
    let loginButton = page.querySelector(".wLogin");
    if (userID != null) {
      accountButton.querySelector("div").textContent = account.user;
      if (account.image != null) {
       accountButton.querySelector("img").src = account.image;
      }
      accountButton.addEventListener("click", () => {
        dropdownModule.open(accountButton, import("@modules/dropdowns/Account"), { parent: this });
      });
    } else {
      accountButton.remove();
      loginButton.style.display = "block";
      loginButton.addEventListener("click", () => { promptLogin(); });
    }

    let eventsHolder = page.querySelector(".wEventsHolder");
    eventsHolder.addEventListener("click", (event) => {
      let eventTile = event.target.closest(".wEvent");
      if (eventTile == null) {
        return;
      }
      let eventID = eventTile.getAttribute("event");
      if (eventID != null) {
        event.preventDefault();
        this.promptRegistration(eventID);
      }
    });
    eventsHolder.addEventListener("mousedown", ({ target }) => {
      let eventTile = target.closest(".wEvent");
      if (eventTile == null) {
        return;
      }
      if (target.closest("button") == null) {
        eventTile.style.removeProperty("transform");
      } else {
        eventTile.style.transform = "scale(1)";
      }
    });

    let eventTiles = eventsHolder.querySelectorAll(".wEvent");
    for (let i = 0; i < eventTiles.length; i++) {
      let eventTile = eventTiles[i];
      let eventID = eventTile.getAttribute("event");
      if (eventID != null) {
        eventTile.href = "https://luma.com/event/" + eventID;
      }
    }

    let event = getParam("event") ?? "";
    if (event.length > 0) {
      this.promptRegistration(event);
    }
  }
}