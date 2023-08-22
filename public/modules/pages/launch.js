modules["pages/launch"] = {
  title: "Collaboration across the Classroom",
  html: `
  <div class="lSection" header>
    <img class="lHeaderBackdrop" src="./images/launch/backdrop.png" center visible>
    <img class="lHeaderBackdrop" src="./images/launch/backdropside.png" side style="opacity: 0">
    <div class="lHeaderContent">
      <div class="lHeaderRow">
        <div>
          <img src="./images/launch/tools/draw.svg" low>
          <img src="./images/launch/tools/markup.svg" high>
        </div>
        <img class="lHeaderLogo" src="./images/logo.svg">
        <div>
          <img src="./images/launch/tools/text.svg" high>
          <img src="./images/launch/tools/shape.svg" low>
        </div>
      </div>
      <div class="lHeaderSlogan"><b>Collaboration</b> across the <b>Classroom</b></div>
      <div class="lHeaderSummary">Bring your classroom's whiteboard around the room with Markify! Stream annotations to student's devices to see up close and review.</div>
      <div class="lHeaderActions">
        <button class="lOpen largeButton" openpage="editor">Open Markify</button>
        <button class="lJoin largeButton" openpage="join">Join Lesson<img src="./images/tooltips/link.svg"></button>
      </div>
      <img class="lHeaderSplash" src="./images/launch/showcase.png">
    </div>
  </div>
  <div class="lSection" history backdrop="side">
    <div class="lHistoryStuck">
      <div class="lTitle">First... some brief <b>History</b></div>
      <div class="lHistoryContent">
        <div class="lHistoryContentPart" style="flex: 1 0 400px; flex-basis: 400px">
          <div class="lHistoryTitle"></div>
          <div class="lHistoryDesc"></div>
        </div>
        <div class="lHistoryContentPart" style="flex: 1; flex-basis: 500px">
          <img src="">
        </div>
      </div>
      <div class="lHistoryDots">
        <button whiteboard></button>
        <button smartboard></button>
        <button markify></button>
      </div>
      <div class="lSpacer"></div>
    </div>
  </div>
  `,
  css: {
    ".lSection": `display: flex; flex-direction: column; margin: 5vh 0; align-items: center; --blueShadow: 0px 0px 24px var(--hover)`,
    //".lSection[header]": `min-height: 100vh; justify-content: center; align-items: center`,
    ".lHeaderBackdrop": `position: fixed; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; opacity: 0; z-index: -1`,
    ".lHeaderContent": `display: flex; flex-direction: column; box-sizing: border-box; max-width: 100%; padding: 26px; align-items: center; overflow: hidden`,
    ".lHeaderRow": `display: flex; width: 100%; justify-content: center`,
    ".lHeaderRow div": `display: flex; flex: 1; min-width: 300px; max-width: 500px; justify-content: space-around; align-items: center`,
    ".lHeaderRow div img": `width: 60px; height: 60px; flex-shrink: 0`,
    ".lHeaderRow div img[high]": `animation: bobIconHigh 15s ease infinite`,
    ".lHeaderRow div img[low]": `animation: bobIconLow 15s ease infinite`,
    "@keyframes bobIconHigh": `0%, 100% { transform: translateY(-20%) scale(1.1) } 50% { transform: translateY(20%) }`,
    "@keyframes bobIconLow": `0%, 100% { transform: translateY(20%) } 50% { transform: translateY(-20%) scale(1.1) }`,
    ".lHeaderLogo": `box-sizing: border-box; width: 100%; max-width: 350px; padding: 24px`,
    ".lHeaderSlogan": `margin-top: 16px; font-size: 35px; line-height: 55px`,
    ".lHeaderSlogan b": `color: var(--theme); font-size: 45px; font-weight: 700`,
    ".lHeaderSummary": `max-width: 650px; margin-top: 24px`,
    ".lHeaderActions": `display: flex; flex-wrap: wrap; gap: 24px; margin-top: 40px; justify-content: center`,
    ".lOpen": `background: var(--theme); --borderRadius: 20.25px; color: #fff`,
    ".lJoin": `background: #fff; --borderRadius: 20.25px; color: var(--secondary)`,
    ".lJoin img": `width: 24px; height: 24px; margin-left: 8px`,
    ".lHeaderSplash": `width: 100%; margin-top: 40px; max-width: 1000px`,

    ".lSection[history]": `width: 100%; height: 200vh`,
    ".lHistoryStuck": `position: sticky; display: flex; flex-direction: column; width: 100%; height: 100vh; top: 0px; align-items: center; overflow: hidden`,
    ".lTitle": `margin: 36px; font-size: 35px; line-height: 55px; text-align: left`,
    ".lTitle b": `color: var(--theme); font-size: 45px; font-weight: 700`,
    ".lHistoryContent": `display: flex; flex-wrap: wrap; gap: 0px 30px; margin: auto 0; max-width: 1000px; align-items: center`,
    ".lHistoryContentPart": `margin: 16px`,
    ".lHistoryContentPart img": `width: 100%; max-height: 400px; border-radius: 20px; box-shadow: var(--blueShadow); object-fit: cover`,
    ".lHistoryTitle": `max-width: 250px; font-size: 24px; line-height: 40px; text-align: left`,
    ".lHistoryTitle b": `color: var(--theme); font-size: 35px; font-weight: 700`,
    ".lHistoryDesc": `margin-top: 24px; text-align: left`,
    ".lHistoryDots": `position: absolute; display: flex; padding: 4px; left: 50%; bottom: 5%; transform: translate(-50%, 50%); background: rgba(var(--background), .7); backdrop-filter: blur(4px); border-radius: 16px`,
    ".lHistoryDots button": `width: 16px; height: 16px; margin: 4px; background: var(--secondary); border-radius: 8px`,
    ".lHistoryDots button[selected]": `width: 32px; background: var(--theme)`,
    ".lHistoryStuck .lSpacer": `height: 130.5px`
  },
  js: async function (page) {
    
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
        image: "./images/launch/history/whiteboard.jpg",
        rotate: 3
      },
      {
        percent: .6,
        name: "smartboard",
        title: "Then came the <b>Smartboard</b>",
        desc: "With the advent of technology in the classroom, whiteboards began moving digital with the smartboard.</br></br>However, many smartboards dissapointed with less-than-ideal performence and the same problems that plauged traditional whiteboards.",
        image: "./images/launch/history/smartboard.jpg",
        rotate: -3
      },
      {
        percent: .3,
        name: "markify",
        title: "Introducing <b>Markify</b>",
        desc: "Markify aims to solve these shortcomings by not just being a digital whiteboard PDF tool, but a real-time platform where anything written gets streamed to students.</br></br>Students can see the document up close and see any point they may have missed.",
        image: "./images/launch/history/markify.jpg",
        rotate: 3
      }
    ];
    function updateHistory() {
      let sectionTop = historySection.getBoundingClientRect().bottom;
      let stickyPercent = sectionTop / historySection.clientHeight;
      if (stickyPercent > 0) {
        //console.log(stickyPercent)
        for (let i = 0; i < sections.length; i++) {
          let section = sections[i];
          let sectionName = section.name;
          if (stickyPercent > section.percent) {
            historySection.querySelector(".lHistoryTitle").innerHTML = section.title;
            historySection.querySelector(".lHistoryDesc").innerHTML = section.desc;
            let image = historySection.querySelector(".lHistoryContentPart img");
            image.src = section.image;
            image.style.transform = "rotate(" + section.rotate + "deg)";
            let removeAttr = dotButtons.querySelector("button[selected]");
            if (removeAttr != null) {
              removeAttr.removeAttribute("selected");
            }
            dotButtons.querySelector("button[" + sectionName + "]").setAttribute("selected", "");

            let nextSection = sections[i-1];
            if (nextSection != null && stickyPercent > nextSection.percent - .1) {
              historyContent.style.transform = "scale(" + (stickyPercent / (nextSection.percent - .1)) + ")";
              historyContent.style.opacity = (nextSection.percent - stickyPercent) * 10;
            } else if (stickyPercent < section.percent + .1) {
              historyContent.style.transform = "scale(" + ((section.percent + .1) / stickyPercent) + ")";
              historyContent.style.opacity = (stickyPercent - section.percent) * 10;
            }
            break;
          }
        }
      }
    }
    dotButtons.addEventListener("click", function(event) {
      let target = event.target.closest("button");
      if (target == null) {
        return;
      }
      console.log(historySection.getBoundingClientRect().bottom - (sections[[...dotButtons.children].indexOf(target)].percent * historySection.clientHeight))
      window.scrollTo({ top: window.scrollY + historySection.getBoundingClientRect().bottom - ((sections[[...dotButtons.children].indexOf(target)].percent + .1) * historySection.clientHeight), behavior: "smooth" });
    });

    // Handle Events:
    let sectionElements = page.querySelectorAll(".lSection");
    let backdrops = page.querySelectorAll(".lHeaderBackdrop");
    function updateSections() {
      updateHistory();

      // Handle Backdrop:
      for (let i = 0; i < sectionElements.length; i++) {
        let element = sectionElements[i];
        let top = element.getBoundingClientRect().top;
        if (top >= 0 && top < fixed.clientHeight) {
          let back = page.querySelector(".lHeaderBackdrop[" + (element.getAttribute("backdrop") || "center") + "]");
          for (let b = 0; b < backdrops.length; b++) {
            if (backdrops[b] != back) {
              backdrops[b].style.opacity = (top / fixed.clientHeight) * .5;
            }
          }
          back.style.opacity = ((fixed.clientHeight - top) / fixed.clientHeight) * .5;
          break;
        }
      }
    }
    tempListen(window, "scroll", updateSections);
    tempListen(window, "resize", updateSections);
    updateSections();
  }
}