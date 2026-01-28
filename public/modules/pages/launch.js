modules["pages/launch"] = class extends page {
  title = "Collaboration across the Classroom";
  theme = "light";
  html = `
  <div class="lBackdrop" dots style="--setOpacity: .075; background-image: url(../images/editor/backdrop.svg); background-size: 25px; background-position: center"></div>
  <img class="lBackdrop" src="../images/launch/backdropside.png" side>
  <img class="lBackdrop" src="../images/launch/backdrop.png" center>
  <div class="lSection" header backdrop="center">
    <div class="lHeaderContent">
      <div class="lHeaderRow">
        <div>
          <img src="../images/launch/tools/draw.svg" low>
          <img src="../images/launch/tools/markup.svg" high>
        </div>
        <img class="lHeaderLogo" src="../images/logo.svg">
        <div>
          <img src="../images/launch/tools/text.svg" high>
          <img src="../images/launch/tools/shape.svg" low>
        </div>
      </div>
      <div class="lHeaderSlogan"><b>Collaboration</b> without <b>Chaos</b></div>
      <div class="lHeaderSummary">Let students work collaboratively across the classroom while you facilitate. Eliminate chaos with robust sharing settings and temporary editing controls.</div>
      <div class="lHeaderActions">
        <button class="lOpen largeButton" openpage="app/dashboard"></button>
        <button class="lJoin largeButton" openpage="app/join">Join Lesson<img src="../images/tooltips/link.svg"></button>
      </div>
      <div class="lHeaderPrice">Markify is <b>FREE</b> for educators and students.</div>
      <img class="lHeaderSplash" src="../images/launch/showcase.png">
    </div>
  </div>
  <div class="lSection" history backdrop="side">
    <div class="lHistoryStuck">
      <div class="lTitle">First... some brief <b>History</b></div>
      <div class="lHistoryContent">
        <div class="lHistoryContentPart" style="flex: 1 1 400px; flex-basis: 400px">
          <div class="lHistoryTitle"></div>
          <div class="lHistoryDesc"></div>
        </div>
        <div class="lHistoryContentPart" style="flex: 1; flex-basis: 500px">
          <img whiteboard src="../images/launch/history/whiteboard.jpg">
          <img interactiveboard src="../images/launch/history/interactiveboard.jpg">
          <img markify src="../images/launch/history/markify.png">
        </div>
      </div>
      <div class="lHistoryDots">
        <button whiteboard></button>
        <button interactiveboard></button>
        <button markify></button>
      </div>
      <div class="lSpacer"></div>
    </div>
  </div>
  <div class="lSection" usecase backdrop="dots">
    <div class="lTitle">How <b>Markify</b> revolutionizes the <b>Classroom</b></div>
    <div class="lUsecaseToolbar">
      <button selected style="--themeColor: 0, 132, 255">English</button>
      <button style="--themeColor: 255, 61, 100">Math</button>
      <button style="--themeColor: 52, 193, 114">Science</button>
      <button style="--themeColor: 255, 185, 56">History</button>
    </div>
    <div class="lUsecaseTiles"></div>
    <div class="lUsecaseBackdrop"></div>
    <div class="lUsecaseModal">
      <img class="lModalBackdrop">
      <div class="lUsecaseModalContent">
        <div class="lUsecaseModalTop">
          <div class="lUsecaseModalTitle"></div>
          <button class="lUsecaseModalClose border"><img></button>
        </div>
        <div class="lUsecaseModalHTML"></div>
        <img class="lUsecaseModalImage">
      </div>
    </div>
  </div>
  <div class="lSection" features backdrop="dots">
    <div class="lTitle">Powerful <b>Features</b>, exceeding <b>Simplicity</b></div>
    <div class="lFeatures">
      <div class="lFeature">
        <img src="../images/launch/features/upload.svg">
        <div title>Upload PDFs</div>
        <div desc>Unlike a traditional whiteboard, upload your worksheets and more—straight into Markify!</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/freeboard.svg">
        <div title style="color: var(--purple)">Freeboard</div>
        <div desc>Alternatively, you can create an infinite canvas with Freeboard! Never run out of space with this digital solution.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/pin.svg">
        <div title>Share with Pin</div>
        <div desc>Unlike most editors, there is no need to logon to Markify as a student. You can share lessons with a short pin code.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/share.svg">
        <div title>Collaboration</div>
        <div desc>Markify has unparalleled real-time capabilities, with everything from annotations to member status synced!</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/tools.svg">
        <div title>Minimalistic Tools</div>
        <div desc>Get a full suite of tools—completely for free—for marking up your lesson that are simple and effective.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/cursors.svg">
        <div title style="color: var(--error)">Real-time Cursors</div>
        <div desc>Go more in depth during your lessons by pointing to things utilizing your mouse cursor. It all gets synced!</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/members.svg">
        <div title>Members List</div>
        <div desc>Easily view and search all members in the lesson. View their identity and manage their access.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/editor.svg">
        <div title>Temporary Editor</div>
        <div desc>Grant temporary edit access to anyone in the lesson, allowing them to markup the lesson.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/observe.svg">
        <div title style="color: var(--purple)">Observe Mode</div>
        <div desc>Observe any member's screen position, watching them navigate and markup the lesson.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/idle.svg">
        <div title style="color: var(--yellow)">Idle Indicator</div>
        <div desc>Worried students might abuse the device they are using? Worry not! See if they're idle viewing another window.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/save.svg">
        <div title>Local Save</div>
        <div desc>In the event internet connection is lost, all edits are saved locally automatically, allowing for the lesson to continue.</div>
      </div>
      <div class="lFeature">
        <img src="../images/launch/features/download.svg">
        <div title>Download</div>
        <div desc>Anyone with access (including students) can download the lesson as a PDF to review later.</div>
      </div>
    </div>
  </div>
  <div class="lSection" footer backdrop="center">
    <div class="lFooterPromote">
      <img class="lFooterBackdrop" left src="../images/launch/lighticon.svg">
      <img class="lFooterBackdrop" right src="../images/launch/lighticon.svg">
      <div class="dFooterHolder" style="min-height: 300px">
        <div div class="lFooterTitle">Modernize the whiteboard</br><b>with Markify</b></div>
        <div div class="lFooterFree">Get started for <b>FREE</b></div>
      </div>
      <div class="dFooterHolder" style="min-height: 125px">
        <button class="lOpen largeButton" openpage="app/dashboard">Create Lesson</button>
      </div>
    </div>
    <div class="lFooterCompliance">
      <div class="footerBadges">
        <img src="../images/launch/badges/coppa.svg">
        <img src="../images/launch/badges/ferpa.svg">
      </div>
      <div class="footerStatement">Markify is compliant under all <b>COPPA</b> and <b>FERPA</b> rules and regulations.</div>
    </div>
    <div class="lFooterFooter">
      <div class="lFooterCompany">
        <img class="lFooterLogo" src="../images/logowhite.svg">
        <a class="lFooterCopyright" href="../" target="_blank">©2026 Markify, LLC</a>
      </div>
      <div class="lFooterPolicies">
        <a href="../tos" target="_blank">Terms</a>
        <a href="../privacy" target="_blank">Privacy</a>
        <a href="mailto:support@markifyapp.com">Contact</a>
      </div>
      <div class="lFooterSocials">
        <a href="https://x.com/markifytool" target="_blank"><img src="../images/launch/socials/twitter.svg"></a>
        <a href="https://www.instagram.com/markifytool" target="_blank"><img src="../images/launch/socials/instagram.svg"></a>
        <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="../images/launch/socials/linkedin.svg"></a>
        <a href="https://www.facebook.com/groups/1140371071626764" target="_blank"><img src="../images/launch/socials/facebook.svg"></a>
        <a href="https://www.youtube.com/channel/UCoOM6y6FxPG_tBpZD3CynRg" target="_blank"><img src="../images/launch/socials/youtube.svg"></a>
      </div>
    </div>
  </div>
  `;
  //Collaboration across the Classroom
  //Stream a shared whiteboard to student's devices to see up close and review. All with effective tools that aren't overwhelming or confusing to use.
  css = {
    ".lSection": `position: relative; display: flex; flex-direction: column; margin: 5vh 0; z-index: 1; align-items: center; --blueShadow: 0px 0px 24px var(--hover)`,
    ".lBackdrop": `--setOpacity: .3; position: fixed; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; opacity: 0; transition: .3s`,
    ".lHeaderContent": `display: flex; flex-direction: column; box-sizing: border-box; max-width: 100%; min-height: 1000px; padding: 26px; align-items: center; overflow: hidden`,
    ".lHeaderRow": `display: flex; width: 100%; justify-content: center`,
    ".lHeaderRow div": `display: flex; flex: 1; min-width: 300px; max-width: 500px; justify-content: space-around; align-items: center`,
    ".lHeaderRow div img": `width: 60px; height: 60px; flex-shrink: 0`,
    ".lHeaderRow div img[high]": `animation: bobIconHigh 15s ease infinite`,
    ".lHeaderRow div img[low]": `animation: bobIconLow 15s ease infinite`,
    "@keyframes bobIconHigh": `0%, 100% { transform: translateY(-20%) scale(1.1) } 50% { transform: translateY(20%) }`,
    "@keyframes bobIconLow": `0%, 100% { transform: translateY(20%) } 50% { transform: translateY(-20%) scale(1.1) }`,
    ".lHeaderLogo": `box-sizing: border-box; width: 100%; max-width: 350px; padding: 24px`,
    ".lHeaderSlogan": `margin-top: 16px; font-size: 35px; line-height: 55px`,
    ".lHeaderSlogan b": `margin: 0 4px; color: var(--theme); font-size: 45px; font-weight: 700`,
    ".lHeaderSummary": `max-width: 700px; margin-top: 24px; line-height: 26px`,
    ".lHeaderActions": `display: flex; flex-wrap: wrap; gap: 24px; margin-top: 40px; justify-content: center`,
    ".lHeaderPrice": `margin-top: 24px; font-size: 16px`,
    ".lHeaderPrice b": `color: var(--theme); font-weight: 700`,

    ".lOpen": `display: flex; flex-direction: row; bottom: 0px; align-items: center; --borderRadius: 20.25px; background: var(--theme); color: #fff;`,
    ".lOpen img[loginBtnBeforeImg]": `width: 24px; height: 24px; margin-right: 8px; object-fit: cover; border-radius: 16px; border: 4px solid var(--themeColor); background: #0084FF;`,
    ".lOpen img[defaultLoginBtnBeforeImg]": `width: 24px; height: 24px; margin-right: 8px; object-fit: cover; border-radius: 16px; border: 4px solid #0084FF; background: #0084FF;`,
    ".lOpen img[loginBtnAfterImg]": `width: 24px; height: 24px; margin-left: 8px; filter: brightness(0) invert(1);`,
    ".lOpen div[accountuser]": `white-space: nowrap; flex: 1;`,
    ".lJoin": `background: #fff; --borderRadius: 20.25px; color: var(--secondary)`,
    ".lJoin img": `width: 24px; height: 24px; margin-left: 8px`,

    ".lHeaderSplash": `width: 100%; margin-top: 16px; max-width: 1000px; transform: perspective(75em) rotateX(20deg)`, //; transition: .5s
    ".lSection[history]": `width: 100%; height: 200vh`,
    ".lHistoryStuck": `position: sticky; display: flex; flex-direction: column; width: 100%; height: 100vh; top: 0px; align-items: center; overflow: hidden`,
    ".lTitle": `margin: 36px; font-size: 35px; line-height: 55px; text-align: left`,
    ".lTitle b": `color: var(--theme); font-size: 45px; font-weight: 700`,
    ".lHistoryContent": `display: flex; flex-wrap: wrap; gap: 0px 30px; margin: auto 0; max-width: 1000px; align-items: center`,
    ".lHistoryContentPart": `margin: 16px`,
    ".lHistoryContentPart img": `display: none; width: calc(100% - 18px); max-width: 600px; max-height: 400px; border-radius: 20px; box-shadow: var(--blueShadow); object-fit: cover`,
    ".lHistoryTitle": `max-width: 350px; font-size: 24px; line-height: 40px; text-align: left`,
    ".lHistoryTitle b": `display: block; color: var(--theme); font-size: 35px; font-weight: 700`,
    ".lHistoryDesc": `margin-top: 24px; text-align: left`,
    ".lHistoryDots": `position: absolute; display: flex; padding: 4px; left: 50%; bottom: 5%; transform: translate(-50%, 50%); background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 16px`,
    ".lHistoryDots button": `width: 16px; height: 16px; margin: 4px; background: var(--secondary); border-radius: 8px`,
    ".lHistoryDots button[selected]": `width: 32px; background: var(--theme)`,
    ".lHistoryStuck .lSpacer": `height: 130.5px`,

    ".lSection[usecase]": `z-index: 2`,
    ".lUsecaseToolbar": `position: sticky; box-sizing: border-box; display: flex; flex-wrap: wrap; top: 24px; margin: 24px 0; width: calc(100% - 48px); max-width: 600px; padding: 6px; background: rgba(var(--background), .9); backdrop-filter: blur(4px); box-shadow: 0px 0px 12px rgba(var(--themeColor), .4); border-radius: 37px; z-index: 10`,
    ".lUsecaseToolbar button": `flex: 1 1 130px; padding: 8px 16px; margin: 6px; border-radius: 25px; color: rgb(var(--themeColor)); font-size: 20px; font-weight: 700; transition: .2s`,
    ".lUsecaseToolbar button:hover": `background: rgba(var(--themeColor), .3); transform: scale(1.03)`,
    ".lUsecaseToolbar button:active": `transform: scale(.975) !important`,
    ".lUsecaseToolbar button[selected]": `background: rgba(var(--themeColor), 1); color: #fff`,
    ".lUsecaseTiles": `display: flex; flex-wrap: wrap; width: calc(100% - 24px); max-width: 748px; padding-bottom: 34px; margin: 12px; justify-content: center`,
    ".lUsecaseTile": `display: flex; width: 350px; max-width: calc(100% - 24px); height: 350px; padding: 8px; margin: 12px; background: #fff; box-shadow: 0px 0px 8px rgba(var(--themeColor), .4); border-radius: 20px; overflow: hidden; justify-content: center; align-items: center; transform: scale(.8) perspective(75em) rotateX(30deg); opacity: 0; transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) .3s`,
    ".lUsecaseTile:active": `transform: scale(.975) !important`,
    ".lUsecaseTile[column]": `flex-direction: column`,
    ".lUsecaseTile[row]": `width: 724px; height: fit-content; min-height: 350px; flex-wrap: wrap`,
    ".lUsecaseTileInfo": `box-sizing: border-box; flex: 1 1 350px; height: 100%; padding: 0 24px 0 12px; text-align: left`,
    ".lUsecaseMiniTiles": `display: flex; flex-direction: column; max-width: 100%`,
    ".lUsecaseMiniTiles .lUsecaseTile": `height: 162px`,
    ".lUsecaseTile:hover": `box-shadow: 0px 0px 24px rgba(var(--themeColor), .6)`,
    ".lTileTitle": `width: 100%; margin: 16px 0 12px; color: rgb(var(--themeColor)); font-size: 26px; font-weight: 700`,
    ".lTileDesc": `width: 100%; margin-bottom: 16px; font-size: 16px; font-weight: 500`,
    ".lTileImageHolder": `position: relative; width: 100%; height: 100%`,
    ".lUsecaseTile[row] .lTileImageHolder": `width: unset; height: 334px; flex: 1 1 350px`,
    ".lTileImageHolder img": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; border-radius: 12px`,
    ".lUsecaseBackdrop": `position: fixed; width: 100%; height: 100%; left: 0px; top: 0px; background: rgba(var(--background), .5); backdrop-filter: blur(10px); z-index: 500; opacity: 0; pointer-events: none; transition: .5s`,
    ".lUsecaseModal": `position: fixed; display: flex; overflow: hidden; border-radius: 20px; background: var(--pageColor); box-shadow: 0px 0px 8px rgba(var(--themeColor), .4); z-index: 501; justify-content: center; align-items: center`,
    ".lUsecaseModalContent": `position: relative; box-sizing: border-box; width: calc(100vw - 24px); max-width: 500px; max-height: calc(100vh - 24px); padding: 16px; flex-shrink: 0; flex-grow: 0; overflow: auto`,
    ".lModalBackdrop": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; opacity: .15`,
    ".lUsecaseModalTop": `display: flex; justify-content: space-between`,
    ".lUsecaseModalTitle": `flex: 1; margin-right: 16px; text-align: left; color: rgb(var(--themeColor)); font-size: 26px; font-weight: 700`,
    ".lUsecaseModalClose": `position: relative; width: 28px; height: 28px; --borderWidth: 3px; --borderRadius: 12px; --borderColor: rgb(var(--themeColor))`,
    ".lUsecaseModalClose:hover": `background: rgba(var(--themeColor), .2)`,
    ".lUsecaseModalClose:active": `background: rgba(var(--themeColor), 0); --borderWidth: 4px; --borderColor: rgba(var(--themeColor), .35)`,
    ".lUsecaseModalClose img": `position: absolute; width: calc(100% - 14px); height: calc(100% - 14px); left: 7px; top: 7px; opacity: .8`,
    ".lUsecaseModalHTML": `margin-top: 16px; font-size: 16px; text-align: left; line-height: 22px`,
    ".lUsecaseModalHTML u": `text-decoration: underline; font-weight: 500; text-decoration-color: rgb(var(--themeColor))`,
    ".lUsecaseModalHTML a": `color: rgb(var(--themeColor)); font-weight: 700`,
    ".lUsecaseModalHTML li": `margin: 8px 0px`,
    ".lUsecaseModalImage": `margin-top: 16px; width: 100%; height: 200px; object-fit: cover; border-radius: 16px 16px 8px 8px`,

    ".lFeatures": `display: flex; flex-wrap: wrap; width: calc(100% - 16px); max-width: 1100px; margin: 8px; justify-content: center`,
    ".lFeature": `display: flex; flex-direction: column; width: 340px; max-width: calc(100% - 16px); margin: 8px 8px 60px 8px; align-items: center`,
    ".lFeature img": `width: 80px; height: 80px`,
    ".lFeature div[title]": `margin-top: 12px; color: var(--theme); font-size: 26px; font-weight: 700`,
    ".lFeature div[desc]": `margin-top: 8px; line-height: 24px`,

    ".lFooterPromote": `position: relative; box-sizing: border-box; display: flex; flex-wrap: wrap; width: calc(100% - 24px); max-width: 700px; padding: 12px; margin-top: 60px; overflow: hidden; background: var(--theme); border-radius: 24px`,
    ".lFooterBackdrop": `position: absolute; width: 400px; height: 400px`,
    ".lFooterBackdrop[left]": `left: -100px; top: -70px; transform: rotate(-15deg)`,
    ".lFooterBackdrop[right]": `left: 384px; bottom: -125px; transform: rotate(-70deg)`,
    ".dFooterHolder": `display: flex; flex-direction: column; flex: 1 1 338px; z-index: 1; align-items: center; justify-content: center`,
    ".lFooterTitle": `margin: 12px; color: #fff; font-size: 32px; font-weight: 700; line-height: 50px; text-align: left`,
    ".lFooterTitle b": `font-size: 46px; font-weight: 800; line-height: 70px`,
    ".lFooterFree": `margin-top: 24px; color: #fff; font-size: 18px; font-weight: 600`,
    ".lFooterFree b": `font-weight: 700`,
    ".dFooterHolder button": `box-shadow: 0px 0px 24px rgb(0, 0, 0, .4)`,
    ".lFooterCompliance": `position: relative; box-sizing: border-box; padding: 24px; margin: 60px 0`,
    ".footerBadges": `display: flex; flex-wrap: wrap; width: 100%; justify-content: space-around`,
    ".footerBadges img": `max-width: 100%; max-height: 100px; margin: 16px`,
    ".footerStatement": `width: 100%; margin-top: 16px`,
    ".lFooterFooter": `position: relative; box-sizing: border-box; display: flex; flex-wrap: wrap; width: calc(100% - 24px); max-width: 700px; padding: 12px; margin-top: 24px; background: #000; border-radius: 24px; justify-content: center; align-items: center; overflow: hidden`,
    ".lFooterCompany": `display: flex; flex-direction: column; max-width: 100%; flex: 1; align-items: center; justify-content: center`,
    ".lFooterLogo": `height: 70px`,
    ".lFooterCopyright": `color: var(--secondary); text-decoration: none`,
    ".lFooterPolicies": `display: flex; flex-wrap: wrap; flex: 1 1 205px; justify-content: center; align-items: center`,
    ".lFooterPolicies a": `margin: 16px; color: #fff; font-size: 20px; font-weight: 700; text-decoration: none`,
    ".lFooterSocials": `display: flex; flex-wrap: wrap; height: fit-content; padding: 3px; margin: 16px 0; background: #fff; border-radius: 12px`,
    ".lFooterSocials a": `width: 30px; height: 30px; margin: 3px`,
    ".lFooterSocials a img": `width: 100%; height: 100%`
  };

  js = async (page) => {
    // Launch page login button
    const loginBtn = page.querySelector(".lOpen");
    if (userID != null) {
      if (account.image != null) {
        loginBtn.innerHTML = `<img loginBtnBeforeImg /><div accountuser>Dashboard</div><img src="../images/tooltips/link.svg" loginBtnAfterImg />`;
        loginBtn.querySelector("[loginBtnBeforeImg]").src = account.image;
      } else {
        loginBtn.innerHTML = `<img src="../images/profiles/defaultWhite.svg" defaultLoginBtnBeforeImg /><div accountuser>Dashboard</div><img src="../images/tooltips/link.svg" loginBtnAfterImg />`;
      }
      loginBtn.style.padding = "8px 14px 8px 8px";
    } else {
      loginBtn.innerHTML = `<div accountuser>Open Markify</div>`;
    }

    // SECTION 2 | History
    let historySection = page.querySelector(".lSection[history]");
    let historyContent = historySection.querySelector(".lHistoryContent");
    let dotButtons = historySection.querySelector(".lHistoryDots");
    let sections = [
      {
        percent: .9,
        name: "whiteboard",
        title: "First, was the <b>Whiteboard</b>",
        desc: "Innovating on the chalkboard, the whiteboard is still the most widely-used lecture tool today!</br></br>While it allows endless content to be written, many marks can be hard to see or must be erased after running out of space.",
        image: "whiteboard",
        rotate: 3
      },
      {
        percent: .6,
        name: "interactiveboard",
        title: "Then came the <b>Interactive Board</b>",
        desc: "With the advent of technology in the classroom, whiteboards began moving digital with the interactive board.</br></br>However, many interactive boards dissapointed with less-than-ideal performence and the same problems that plagued traditional whiteboards.",
        image: "interactiveboard",
        rotate: -3
      },
      {
        percent: 0,
        scroll: .4,
        name: "markify",
        title: "Introducing <b>Markify</b>",
        desc: "Markify aims to solve these shortcomings by not just being a digital whiteboard tool, but a real-time platform where anything written gets streamed to student's devices.</br></br>Students can see the document up close and see any notes they may have missed.",
        image: "markify",
        rotate: 3
      }
    ];
    function updateHistory() {
      let sectionTop = historySection.getBoundingClientRect().bottom;
      let stickyPercent = sectionTop / historySection.clientHeight;
      if (stickyPercent > 0 && stickyPercent > .3) {
        for (let i = 0; i < sections.length; i++) {
          let section = sections[i];
          let sectionName = section.name;
          if (stickyPercent > section.percent) {
            historySection.querySelector(".lHistoryTitle").innerHTML = section.title;
            historySection.querySelector(".lHistoryDesc").innerHTML = section.desc;
            let hideOldImage = historySection.querySelector(".lHistoryContentPart img[visible]");
            if (hideOldImage != null) {
              hideOldImage.removeAttribute("visible");
              hideOldImage.style.display = "none";
            }
            let image = historySection.querySelector(".lHistoryContentPart img[" + section.image + "]");
            image.setAttribute("visible", "");
            image.style.transform = "rotate(" + section.rotate + "deg)";
            image.style.display = "unset";
            let removeAttr = dotButtons.querySelector("button[selected]");
            if (removeAttr != null) {
              removeAttr.removeAttribute("selected");
            }
            dotButtons.querySelector("button[" + sectionName + "]").setAttribute("selected", "");

            let nextSection = sections[i - 1];
            if (nextSection != null && stickyPercent > nextSection.percent - .1) {
              historyContent.style.transform = "scale(" + (stickyPercent / (nextSection.percent - .1)) + ")";
              historyContent.style.opacity = (nextSection.percent - stickyPercent) * 10;
            } else if (stickyPercent < section.percent + .1) {
              historyContent.style.transform = "scale(" + ((section.percent + .1) / stickyPercent) + ")";
              historyContent.style.opacity = (stickyPercent - section.percent) * 10;
            } else {
              historyContent.style.transform = "scale(1)";
              historyContent.style.opacity = 1;
            }
            break;
          }
        }
      } else {
        historyContent.style.transform = "scale(1)";
        historyContent.style.opacity = 1;
      }
    }
    dotButtons.addEventListener("click", function (event) {
      let target = event.target.closest("button");
      if (target == null) {
        return;
      }
      let section = sections[[...dotButtons.children].indexOf(target)];
      window.scrollTo({ top: window.scrollY + historySection.getBoundingClientRect().bottom - (((section.scroll ?? section.percent) + .1) * historySection.clientHeight), behavior: "smooth" });
    });

    // SECTION 3 | Use Cases
    let usecases = {
      english: [
        {
          name: "Classwide Reading & Annotating",
          image: "../images/launch/usecases/reading.png",
          html: `Change how your class goes over new material in class! With Markify, you can <u>read and annotate as a class</u>, discussing key elements and <u>annotating together</u> rather than individually.
          <ul>
            <li>For instance, open a text by <u>uploading it as a PDF</u>.</li>
            <li>Start a class by <u>presenting with a pin</u> and sharing it. Everyone in the class can then <u>join and see the text</u>!</li>
            <li>Start the reading session, selecting students to read or letting them decide on their own.</li>
            <li>As students read or discuss, you can optionally grant different students <u>temporary editing privileges</u> to annotate notes for <u>everyone to see</u>.</li>
          </ul>`
        },
        {
          name: "Study & Review Sessions",
          image: "../images/launch/usecases/study.png",
          html: `Reviewing for quizzes and tests with individual study guides is so <i>old school!</i> Do it <u>collaboratively</u> across the class with Markify!
          <ul>
            <li>Create a study guide or series of questions and <u>import it into Markify</u>.</li>
            <li>Start a class by <u>presenting with a pin</u> and sharing it. Everyone in the class can then join and see the material!</li>
            <li>Work through the questions, letting students answer but also <u>annotate for everyone to see</u>.</li>
            <li>Keep the pin active or <u>post the shared link</u>, allowing students to return to the lesson anytime! Students can review the material at home and <u>in their own style</u>.</li>
          </ul>`
        },
        {
          name: "Socratic Seminar",
          desc: "Empower students to contribute not just through speech, but with annotations streamed to everyone around the room.",
          image: "../images/launch/usecases/socratic.png",
          html: `Socratic seminars are almost unanimous in English classes. However, why keep it fixed to Socrates's time period? With Markify, you can <u>bolster the conversation</u> with modern <u>real-time collaboration</u>!
          <ul>
            <li>Open your text by <u>uploading it as a PDF</u>.</li>
            <li><u>Present with a pin</u> to share the lesson. Everyone in the class can then join to see the text!</li>
            <li>Grant <u>temporary editing access</u> to all students who will be <u>discussing</u>.</li>
            <li>Students can now not just talk, but engage with the document by <u>highlighting key elements</u>, <u>leaving comments</u>, and more.</li>
            <li>Everyone in the class, regardless of being an editor, can see the document <u>including all of the changes made</u>.</li>
          </ul>`
        },
        {
          name: "Essay & Project Presenting",
          image: "../images/launch/usecases/present.png",
          html: `Students can often understand and empathize more with an author when they can see their <u>writing up close</u>. Let students create essays or projects and <u>upload them into Markify</u>!
          <ul>
            <li>Create a Markify lesson and <u>share a generated pin or link</u> with the class.</li>
            <li>Let students join and <u>grant them temporary editing access</u> to upload their essay. Alternatively, you could also upload essays or project PDFs yourself.</li>
            <li>Remove student editing access afterward. When students are presenting or reading their work, the whole class (and you!) can <u>see their writing up close</u>.</li>
          </ul>`
        },
        {
          name: "Flexible Mobility",
          half: true,
          html: `It's often limiting being bound to the front of the class lecturing. Use Markify to <u>break away and freely roam the classroom</u>!
          <ul>
            <li>Upon uploading and sharing a lesson with the class. You can open the lesson on a <u>portable laptop or tablet</u>.</li>
            <li>If you want to preserve the front screen for students to look up at, you can <u>observe your portable's member</u> in the members list.</li>
            <li>Freely <u>markup and annotate</u> the document for the <u>class to see</u>!</li>
          </ul>`
        },
        {
          name: "Group Collaboration",
          half: true,
          html: `Improve <u>group collaboration</u> with an easy-to-share solution like Markify. Allow students to sign up and <u>create Markify lessons on their own</u>!
          <ul>
            <li>Have <u>group leaders</u> go to <a href="./" target="_blank">markifyapp.com</a> to sign up.</li>
            <li>These students can then <u>upload a PDF</u>, such as a worksheet or text, or just create a <u>blank file</u>.</li>
            <li>Group leaders can <u>share their lesson</u> to other members with <u>editing</u>, allowing for the <u>whole group to markup and create together</u>!</li>
          </ul>`
        }
      ],
      math: [
        {
          name: "Lectures & Note-taking",
          desc: "Give students the flexibility to see the notes and materials on their own device, where they can review missed content.",
          image: "../images/launch/usecases/notetaking.png",
          html: `Take classic note-taking lectures to the <u>21st century</u>! With Markify, fill out notes <u>digitally</u> and have them <i>magically sync</i> across the room for <u>students to see up close</u>.
          <ul>
            <li>To start, open your note sheet by <u>uploading it as a PDF</u>.</li>
            <li>Start a class by <u>presenting with a pin</u> and sharing it. Everyone in the class can then join and <u>see the notes on their device</u>!</li>
            <li>Begin the lecture, filling out notes on a <u>computer, tablet, or even interactive board</u>. Anything written gets shown <u>real-time to students on their device</u>, even your <u>mouse cursor</u>!</li>
            <li>Optionally, let students <u>answer problems</u> by granting them <u>temporary editing access</u>.</li>
            <li>Students can <u>navigate to any part of the notes</u>, so say goodbye to wasted time from a student <u>unable to write fast enough</u>!</li>
          </ul>`
        },
        {
          name: "Study & Review Sessions",
          image: "../images/launch/usecases/study.png",
          html: `Reviewing for quizzes and tests with individual study guides is so <i>old school!</i> Do it <u>collaboratively</u> across the class with Markify!
          <ul>
            <li>Create a study guide or series of questions and <u>import it into Markify</u>.</li>
            <li>Start a class by <u>presenting with a pin</u> and sharing it. Everyone in the class can then join and see the material!</li>
            <li>Work through the questions, letting students <u>answer for everyone to see</u>.</li>
            <li>Keep the pin active or <u>post the shared link</u>, allowing students to return to the lesson anytime! Students can review the material at home and <u>in their own style</u>.</li>
          </ul>`
        },
        {
          name: "Unlimited Canvas",
          image: "../images/launch/usecases/whiteboarding.png",
          html: `Classic whiteboards are limited with space; however, using Markify's <u>freeboard lesson type</u>, documents can be <u>endless</u>!
          <ul>
            <li>Create a <u>freeboard lesson</u> to have an endless <u>whiteboard</u>, but <u>digital</u>!</li>
            <li>Write out long equations and concepts for students to see up close on <u>their device</u>. Students can <u>scroll and zoom</u> to navigate during <u>learning and reviewing</u>.</li>
            <li>Optionally, allow students to <u>edit</u>, such as by having various students write out their homework problems for everyone to check with.</li>
          </ul>`
        },
        {
          name: "Teaching Mobility",
          image: "../images/launch/usecases/mobility.png",
          html: `It's often limiting being bound to the front of the class lecturing. Use Markify to <u>break away and freely roam the classroom</u>!
          <ul>
            <li>Upon uploading and sharing a lesson with the class. You can open the lesson on a <u>portable laptop or tablet</u>.</li>
            <li>If you want to preserve the front screen for students to look up at, you can <u>observe your portable's member</u> in the members list.</li>
            <li>Freely <u>markup</u> the document for the <u>class to see</u>!</li>
          </ul>`
        },
        {
          name: "Group Collaboration",
          image: "../images/launch/usecases/group.png",
          html: `Improve <u>group collaboration</u> with an easy-to-share solution like Markify. Allow students to sign up and <u>create Markify lessons on their own</u>!
          <ul>
            <li>Have <u>group leaders</u> go to <a href="./" target="_blank">markifyapp.com</a> to sign up.</li>
            <li>These students can then <u>upload a PDF</u>, such as a worksheet, or just create a <u>blank file</u>.</li>
            <li>Group leaders can <u>share their lesson</u> to other members with <u>editing</u>, allowing for the <u>whole group to markup and create together</u>!</li>
          </ul>`
        }
      ],
      science: [
        {
          name: "Shared Whiteboarding",
          image: "../images/launch/usecases/shared.png",
          html: `Classic whiteboards are limited with space; however, using Markify's <u>freeboard lesson type</u>, documents can be <u>endless</u>!
          <ul>
            <li>Create a <u>freeboard lesson</u> to have an endless <u>whiteboard</u>, but <u>digital</u>!</li>
            <li>Write out long equations and concepts for students to see up close on <u>their device</u>. Students can <u>scroll and zoom</u> to navigate.</li>
            <li><u>Preserve the content</u> by keeping the pin active or <u>posting the shared link</u> for students to return and review later on.</li>
          </ul>`
        },
        {
          name: "Lectures & Note-taking",
          image: "../images/launch/usecases/notetaking.png",
          html: `Take classic note-taking lectures to the <u>21st century</u>! With Markify, fill out notes <u>digitally</u> and have them <i>magically sync</i> across the room for <u>students to see up close</u>.
          <ul>
            <li>To start, open your note sheet by <u>uploading it as a PDF</u>.</li>
            <li>Start a class by <u>presenting with a pin</u> and sharing it. Everyone in the class can then join and <u>see the notes on their device</u>!</li>
            <li>Begin the lecture, filling out notes on a <u>computer, tablet, or even interactive board</u>. Anything written gets shown <u>real-time to students on their device</u>, even your <u>mouse cursor</u>!</li>
            <li>Optionally, let students <u>answer problems</u> by granting them <u>temporary editing access</u>.</li>
            <li>Students can <u>navigate to any part of the notes</u>, so say goodbye to wasted time from a student <u>unable to write fast enough</u>!</li>
          </ul>`
        },
        {
          name: "Shared Lab Reports",
          image: "../images/launch/usecases/report.png",
          html: `Allow students to better <u>collaborate during experiments</u> with Markify!
          <ul>
            <li>Have students go to <a href="./" target="_blank">markifyapp.com</a> to sign up.</li>
            <li>Students can then <u>upload a PDF</u>, such as a lab report packet, or just create a blank file.</li>
            <li>Have students <u>share their file with lab partners</u>, allowing everyone to <u>work together on the same document</u>!</li>
          </ul>`
        },
        {
          name: "Station Materials",
          image: "../images/launch/usecases/stations.png",
          html: `Easily <u>distribute materials</u> to stations around the classroom for students to look at and review with.
          <ul>
            <li>Create a <u>PDF containing the resources</u> for the stations, such as instructions, examples, and labs.</li>
            <li>Open this <u>PDF in Markify</u> and <u>share it with a computer placed at each station</u>, allowing students to easily look through it without the hassle of printing paper.</li>
            <li>Share the lesson through a <u>pin or link</u>, allowing students to <u>review or catch up</u> if they missed the stations.</li>
          </ul>`
        }
      ],
      history: [
        {
          name: "Lectures & Note-taking",
          image: "../images/launch/usecases/notetaking.png",
          html: `Take classic note-taking lectures to the <u>21st century</u>! With Markify, fill out notes <u>digitally</u> and have them <i>magically sync</i> across the room for <u>students to see up close</u>.
          <ul>
            <li>To start, open your note sheet by <u>uploading it as a PDF</u>.</li>
            <li>Start a class by <u>presenting with a pin</u> and sharing it. Everyone in the class can then join and <u>see the notes on their device</u>!</li>
            <li>Begin the lecture, filling out notes on a <u>computer, tablet, or even interactive board</u>. Anything written gets shown <u>real-time to students on their device</u>, even your <u>mouse cursor</u>!</li>
            <li>Optionally, let students <u>answer questions</u> by granting them <u>temporary editing access</u>.</li>
            <li>Students can <u>navigate to any part of the notes</u>, so say goodbye to wasted time from a student <u>unable to write fast enough</u>!</li>
          </ul>`
        },
        {
          name: "Primary Source Annotating",
          image: "../images/launch/usecases/source.png",
          html: `Change how your class goes over material in class! With Markify, you can <u>read and annotate as a class</u>, discussing key elements and <u>annotating together</u> rather than individually.
          <ul>
            <li>For instance, open a text by <u>uploading it as a PDF</u>.</li>
            <li>Start a class by <u>presenting with a pin</u> and sharing it. Everyone in the class can then <u>join and see the text</u>!</li>
            <li>Start the reading session, selecting students to read or letting them decide on their own.</li>
            <li>As students read or discuss, you can optionally grant different students <u>temporary editing privileges</u> to annotate notes for <u>everyone to see</u>.</li>
          </ul>`
        },
        {
          name: "Classroom Activities",
          image: "../images/launch/usecases/activity.png",
          html: `Easily <u>distribute materials</u> to activities around the classroom for students to look at and review with.
          <ul>
            <li>Create a <u>PDF containing the resources</u> for the activities, such as instructions and primary sources.</li>
            <li>Open this <u>PDF in Markify</u> and <u>share it with a computer placed at each activity</u>, allowing students to easily look through it without the hassle of printing paper.</li>
            <li>Share the lesson through a <u>pin or link</u>, allowing students to <u>review or catch up</u> if they missed the activity.</li>
          </ul>`
        },
        {
          name: "Group Projects",
          image: "../images/launch/usecases/group.png",
          html: `Improve <u>group collaboration</u> with an easy-to-share solution like Markify. Allow students to sign up and <u>create Markify lessons on their own</u>!
          <ul>
            <li>Have <u>group leaders</u> go to <a href="./" target="_blank">markifyapp.com</a> to sign up.</li>
            <li>These students can then <u>upload a PDF</u>, such as a worksheet, or just create a <u>blank file</u>.</li>
            <li>Group leaders can <u>share their lesson</u> to other members with <u>editing</u>, allowing for the <u>whole group to markup and create together</u>!</li>
          </ul>`
        }
      ]
    };
    let sectionHolder = page.querySelector(".lUsecaseTiles");
    let usecaseToolbar = page.querySelector(".lUsecaseToolbar");
    function setUseCaseTiles(section, color) {
      sectionHolder.innerHTML = "";
      sectionHolder.style.setProperty("--themeColor", color);
      usecaseToolbar.style.setProperty("--themeColor", color);
      let gottenSection = usecases[section];
      for (let i = 0; i < gottenSection.length; i++) {
        let addUse = gottenSection[i];
        let addTileHTML = `<button class="lUsecaseTile" column new>
          <div class="lTileTitle"></div>
          <div class="lTileImageHolder">
            <img>
          </div>
        </button>`;
        let parent = sectionHolder;
        if (addUse.desc != null) {
          addTileHTML = `<button class="lUsecaseTile" row new>
            <div class="lUsecaseTileInfo">
              <div class="lTileTitle"></div>
              <div class="lTileDesc"></div>
            </div>
            <div class="lTileImageHolder">
              <img>
            </div>
          </button>`;
        } else if (addUse.half == true) {
          if (sectionHolder.querySelector(".lUsecaseMiniTiles") == null) {
            parent.insertAdjacentHTML("beforeend", `<div class="lUsecaseMiniTiles"></div>`);
          }
          parent = sectionHolder.querySelector(".lUsecaseMiniTiles");
        }
        parent.insertAdjacentHTML("beforeend", addTileHTML);
        let newTile = sectionHolder.querySelector(".lUsecaseTile[new]");
        newTile.removeAttribute("new");
        newTile.setAttribute("section", section);
        newTile.setAttribute("index", i);
        newTile.querySelector(".lTileTitle").textContent = addUse.name;
        if (addUse.desc != null) {
          newTile.querySelector(".lTileDesc").textContent = addUse.desc;
        }
        if (addUse.half != true) {
          newTile.querySelector(".lTileImageHolder img").src = addUse.image;
        } else {
          newTile.querySelector(".lTileImageHolder").remove();
        }
        newTile.offsetHeight;
        newTile.style.transform = "scale(1) perspective(75em) rotateX(0deg)";
        newTile.style.opacity = 1;
      }
    }
    usecaseToolbar.addEventListener("click", function (event) {
      let button = event.target.closest("button");
      if (button == null) {
        return;
      }
      usecaseToolbar.querySelector("button[selected]").removeAttribute("selected");
      setUseCaseTiles(button.textContent.toLowerCase(), window.getComputedStyle(button).getPropertyValue("--themeColor"));
      button.setAttribute("selected", "");
      window.scrollTo({ top: window.scrollY + sectionHolder.getBoundingClientRect().top - usecaseToolbar.clientHeight - 60, behavior: "smooth" });
    });
    setUseCaseTiles("english", "0, 132, 255");
    let usecaseBackdrop = page.querySelector(".lUsecaseBackdrop");
    let usecaseModal = page.querySelector(".lUsecaseModal");
    let usecaseModalContent = usecaseModal.querySelector(".lUsecaseModalContent");
    let modalClose = usecaseModalContent.querySelector(".lUsecaseModalClose");
    let modalImg = usecaseModal.querySelector(".lUsecaseModalImage");
    let lastClickedButton;
    let modalOpen = false;
    sectionHolder.addEventListener("click", async function (event) {
      let button = event.target.closest(".lUsecaseTile");
      if (button == null) {
        return;
      }
      let clickTime = getEpoch().toString();
      usecaseModal.setAttribute("clicked", clickTime);
      usecaseModal.style.removeProperty("transition");
      usecaseModal.style.transform = "translate(0%, 0%)";
      usecaseModal.style.opacity = 0;
      usecaseModal.style.width = button.clientWidth + "px";
      usecaseModal.style.height = button.clientHeight + "px";
      let buttonRect = button.getBoundingClientRect();
      usecaseModal.style.left = buttonRect.left + "px";
      usecaseModal.style.top = buttonRect.top + "px";
      let themeColor = window.getComputedStyle(button).getPropertyValue("--themeColor");
      usecaseModal.style.setProperty("--themeColor", themeColor);

      let section = button.getAttribute("section");
      let index = button.getAttribute("index");
      lastClickedButton = section + "_" + index;
      let info = usecases[section][parseInt(index)];
      usecaseModal.querySelector(".lModalBackdrop").src = "../images/launch/usecases/backdrops/" + section + ".png";
      usecaseModal.querySelector(".lUsecaseModalTitle").textContent = info.name;
      modalClose.style.setProperty("--themeColor", themeColor);
      modalClose.querySelector("img").src = "../images/launch/usecases/close/" + section + ".svg";
      usecaseModal.querySelector(".lUsecaseModalHTML").innerHTML = info.html;
      if (info.image != null) {
        modalImg.src = info.image;
        modalImg.style.display = "block";
      } else {
        modalImg.style.display = "none";
      }

      usecaseModal.offsetHeight;
      usecaseModal.style.transition = ".5s";
      usecaseModal.style.width = usecaseModalContent.offsetWidth + "px";
      usecaseModal.style.height = usecaseModalContent.offsetHeight + "px";
      usecaseModal.style.left = "calc(50% - " + (usecaseModalContent.offsetWidth / 2) + "px";
      usecaseModal.style.top = "calc(50% - " + (usecaseModalContent.offsetHeight / 2) + "px";
      usecaseModal.style.pointerEvents = "all";
      usecaseModal.style.opacity = 1;
      usecaseBackdrop.style.pointerEvents = "all";
      usecaseBackdrop.style.opacity = 1;
      if (usecaseModal.getAttribute("clicked") == clickTime) {
        await sleep(500);
        usecaseModal.style.removeProperty("transition");
        usecaseModal.style.width = "unset";
        usecaseModal.style.height = "unset";
        usecaseModal.style.left = "50%";
        usecaseModal.style.top = "50%";
        usecaseModal.style.transform = "translate(-50%, -50%)";
        modalOpen = true;
      }
    });
    function closeModal() {
      if (modalOpen == false) {
        return;
      }
      modalOpen = false;
      usecaseModal.style.transform = "translate(0%, 0%)";
      usecaseModal.style.left = "calc(50% - " + (usecaseModalContent.offsetWidth / 2) + "px";
      usecaseModal.style.top = "calc(50% - " + (usecaseModalContent.offsetHeight / 2) + "px";
      usecaseModal.offsetHeight;
      usecaseModal.style.transition = ".5s";
      usecaseModal.style.pointerEvents = "none";
      usecaseModal.style.opacity = 0;
      usecaseBackdrop.style.pointerEvents = "none";
      usecaseBackdrop.style.opacity = 0;
      if (lastClickedButton != null) {
        let split = lastClickedButton.split("_");
        let button = sectionHolder.querySelector('.lUsecaseTile[section="' + split[0] + '"][index="' + split[1] + '"]');
        if (button != null) {
          usecaseModal.style.width = usecaseModal.clientWidth + "px";
          usecaseModal.style.height = usecaseModal.clientHeight + "px";
          usecaseModal.style.width = button.clientWidth + "px";
          usecaseModal.style.height = button.clientHeight + "px";
          let buttonRect = button.getBoundingClientRect();
          usecaseModal.style.left = buttonRect.left + "px";
          usecaseModal.style.top = buttonRect.top + "px";
          return;
        }
      }
      usecaseModal.style.transform = "translate(-50%, -50%) scale(.4)";
    }
    usecaseBackdrop.addEventListener("mousedown", closeModal);
    modalClose.addEventListener("click", closeModal);

    // Handle Events:
    let sectionElements = page.querySelectorAll(".lSection");
    let splashImage = page.querySelector(".lHeaderSplash");
    function updateSections() {
      updateHistory();

      // Handle Backdrop:
      let setBackdrops = {};
      let viewportHeight = window.innerHeight ?? document.documentElement.clientHeight;
      for (let i = 0; i < sectionElements.length; i++) {
        let element = sectionElements[i];
        let rect = element.getBoundingClientRect();
        let back = element.getAttribute("backdrop");
        let percent = 0;
        if (rect.bottom >= 0 && rect.top <= viewportHeight) {
          if (rect.bottom < viewportHeight) {
            percent = 1 - Math.min((viewportHeight - rect.bottom) / viewportHeight, 1);
          } else {
            percent = Math.min((viewportHeight - rect.top) / viewportHeight, 1);
          }
        }
        setBackdrops[back] = Math.max(percent, setBackdrops[back] ?? 0);
      }
      let backdropKeys = Object.keys(setBackdrops);
      for (let i = 0; i < backdropKeys.length; i++) {
        let key = backdropKeys[i];
        page.querySelector(".lBackdrop[" + key + "]").style.opacity = "calc(" + setBackdrops[key] + " * var(--setOpacity))";
      }

      // Handle Splash
      let splashRotate = 20;
      let alignTop = splashImage.offsetTop / 5;
      if (window.scrollY > alignTop) {
        splashRotate -= (window.scrollY - alignTop) / 10;
      }
      splashImage.style.transform = "perspective(75em) rotateX(" + Math.max(splashRotate, 0) + "deg)";
    }
    this.addEventListener(window, "scroll", updateSections);
    this.addEventListener(window, "resize", updateSections);
    setTimeout(updateSections, 1);
    page.querySelector(".lHeaderContent").style.minHeight = "0px";

    // Waitlist Buttons:
    /*
    page.querySelector(".lHeaderActions .lOpen").addEventListener("click", function() {
      promptLogin("waitlist");
    });
    page.querySelector(".dFooterHolder .lOpen").addEventListener("click", function() {
      promptLogin("waitlist");
    });
    */
  }
}