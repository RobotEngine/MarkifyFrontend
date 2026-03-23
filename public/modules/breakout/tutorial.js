modules["breakout/tutorial"] = class {
  html = ``;
  css = {};
  js = async (frame) => {
    await modalModule.open("modals/breakout/tutorial", frame, null, "Welcome to Markify Breakout (ALPHA)", null, { parent: this });
  }
}

modules["modals/breakout/tutorial"] = class {
  html = `
  <div class="brtmHolder" new>
    <div class="brtmImageHolder">
      <div class="brtmImageContent">
        <div class="brtmImageGradient"></div>
      </div>
      <div class="brtmImageContent" image></div>
      <svg class="brtmImagePattern" viewBox="0 0 90 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2.5L14.3529 3.51309C10.8506 4.48595 7.1494 4.48595 3.64712 3.51309L0 2.5V5H44H90V2.5L86.3529 3.51309C82.8506 4.48595 79.1494 4.48595 75.6471 3.51309L72 2.5L68.3529 1.48691C64.8506 0.514054 61.1494 0.514055 57.6471 1.48691L54 2.5L50.3529 3.51309C46.8506 4.48595 43.1494 4.48595 39.6471 3.51309L36 2.5L32.3529 1.48691C28.8506 0.514054 25.1494 0.514055 21.6471 1.48691L18 2.5Z" fill="var(--pageColor)"/>
      </svg>
    </div>
    <div class="brtmContentFrame"></div>
    <div class="brtmButtonHolder">
      <button class="brtmNavButton largeButton" back><svg viewBox="0 0 256 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1340_7" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="200"> <rect width="256" height="200" transform="matrix(-1 0 0 1 256 0)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1340_7)"> <path d="M222 99.7104H34.585" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M105.296 28.9998L34.585 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M105.296 170.421L34.585 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> </g> </svg></button>
      <div class="brtmNavDots"></div>
      <button class="brtmNavButton largeButton" next><svg viewBox="0 0 256 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1340_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="200"> <rect width="256" height="200" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1340_2)"> <path d="M34.0001 99.7104H221.415" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M150.704 28.9998L221.415 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M150.704 170.421L221.415 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> </g> </svg></button>
    </div>
  </div>
  `;
  css = {
    ".brtmHolder": `position: relative; display: flex; flex-direction: column; width: 450px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".brtmHolder[new] *": `transition: none !important`,
    ".brtmImageHolder": `position: relative; width: calc(100% + 12px); height: 200px; overflow: hidden`,
    ".brtmImageContent": `position: absolute; width: 100%; height: 198px; left: 0px; top: 0%; overflow: hidden`,
    ".brtmImageGradient": `width: 100%; height: 100%`,
    ".brtmImage": `position: absolute; width: calc(100% - 40px); height: 100%; left: 20px; top: 100%; border-radius: 16px; opacity: 0; transform: scale(.8); transition: .5s`,
    ".brtmImagePattern": `position: absolute; width: calc(100% + 12px); left: -6px; bottom: 0px; z-index: 1`,
    ".brtmContentFrame": `position: relative; width: calc(100% + 12px); margin-top: 16px; overflow: hidden`,
    ".brtmContentHolder": `display: flex; flex-direction: column; width: 100%; align-items: center; opacity: 0; transition: .5s`,
    ".brtmContentTitle": `color: var(--theme); font-size: 24px; font-weight: 700`,
    ".brtmContentDesc": `max-width: 430px; margin-top: 8px; font-size: 16px; line-height: 22px`,
    ".brtmButtonHolder": `display: flex; max-width: 100%; margin: 24px 0 12px 0`,
    ".brtmNavButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 33px; padding: 4px 8px; flex-wrap: wrap; margin: 0px 12px; justify-content: center; color: var(--theme); font-size: 18px`,
    ".brtmNavButton svg": `width: 30px`,
    ".brtmNavDots": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".brtmNavDots button": `display: flex; width: 12px; height: 12px; margin: 4px; background: var(--gray); border-radius: 6px`,
    ".brtmNavDots button[selected]": `width: 24px; background: var(--theme)`
  };
  resource = {
    theme: "var(--breakoutTheme)",
    background: "linear-gradient(to bottom right, var(--breakoutSecondary), var(--breakoutTheme))",
    pages: [
      {
        image: "../images/editor/breakout/tutorial/step1.png",
        title: "Welcome to Markify Breakout",
        description: "Markify Breakout allows for lessons to be “broken out” into individual or team work. Setup is effortless and everything can be monitored in real-time."
      },
      {
        image: "../images/launch/usecases/study.png",
        title: "Start With the Template",
        description: "The template is the base document teams will get assigned. This can be an uploaded PDF worksheet or reuse a Markify Board to assign individual copies."
      },
      {
        image: "../images/launch/usecases/socratic.png",
        title: "Decide on a Pairing Strategy",
        description: "Use AutoPair to put members into teams randomly (or groups of one), Team Up to allow members to pick their team, or manual to setup teams yourself."
      },
      {
        image: "../images/launch/usecases/shared.png",
        title: "Share the Lesson",
        description: "Once you finish the setup, share the lesson with a pin code or link to bring on members and begin the Breaking Out!"
      },
      {
        image: "../images/launch/usecases/activity.png",
        title: "Monitor Everything Real-Time",
        description: "Simply click on a team to enter their document and give feedback as members work. Click on a team member to open a timeline of their contributions."
      },
      {
        image: "../images/launch/usecases/group.png",
        title: "Group Work With Integrity",
        description: "Each tam member has a POW (Percentage of Work Indicator), which shows how much of the work this member did relative to everyone else."
      },
      {
        image: "../images/launch/usecases/group.png",
        title: "Please, Submit Your Feedback!",
        description: "If you run into any issues, need help, or have a cool idea, simply click your profile at the top right corner and Send Feedback!"
      }
    ]
  };
  js = async (frame, extra) => {
    let resource = this.resource;

    let holder = frame.querySelector(".brtmHolder");
    let imageHolder = holder.querySelector(".brtmImageHolder");
    let gradient = holder.querySelector(".brtmImageGradient");
    let imageContent = imageHolder.querySelector(".brtmImageContent[image]");
    let contentFrame = holder.querySelector(".brtmContentFrame");
    let buttonHolder = holder.querySelector(".brtmButtonHolder");
    let backButton = buttonHolder.querySelector(".brtmNavButton[back]");
    let navDots = buttonHolder.querySelector(".brtmNavDots");
    //let nextButton = buttonHolder.querySelector(".brtmNavButton[next]");

    holder.style.setProperty("--theme", resource.theme);
    gradient.style.background = resource.background;

    let currentPage = 0;
    let lastPage = -1;

    for (let i = 0; i < resource.pages.length; i++) {
      navDots.insertAdjacentHTML("beforeend", `<button page="${i}"></button>`);
    }
    navDots.style.width = (resource.pages.length + 1) * 20 + "px";

    let updatePage = async () => {
      let info = resource.pages[currentPage];

      if (info == null) {
        return; // Close the modal and finish tutorial
      }

      let prevImage = imageContent.querySelector("img:not([old])");
      if (prevImage != null) {
        prevImage.setAttribute("old", "");
        prevImage.style.top = "100%";
        prevImage.style.transform = "scale(.8)";
        prevImage.style.opacity = 0;
      }

      imageContent.insertAdjacentHTML("beforeend", `<img class="brtmImage" new>`);
      let newImage = imageContent.querySelector("img[new]");
      newImage.removeAttribute("new");
      newImage.src = info.image;
      newImage.offsetHeight;
      if (resource.interface != true && info.interface != true) {
        newImage.style.objectFit = "cover";
        newImage.style.top = "20px";
      } else {
        newImage.style.height = "calc(100% - 10px)";
        newImage.style.objectFit = "scale-down";
        newImage.style.top = "0px";
      }
      newImage.style.transform = "scale(1)";
      newImage.style.opacity = 1;

      let swipeRight = true;
      if (currentPage < lastPage) {
        swipeRight = false;
      }
      lastPage = currentPage;

      let prevText = contentFrame.querySelector(".brtmContentHolder:not([old])");
      if (prevText != null) {
        prevText.setAttribute("old", "");
        prevText.style.position = "absolute";
        if (swipeRight == true) {
          prevText.style.transform = "translateX(-100%)";
        } else {
          prevText.style.transform = "translateX(100%)";
        }
        prevText.style.opacity = 0;
      }

      contentFrame.insertAdjacentHTML("beforeend", `<div class="brtmContentHolder" new>
        <div class="brtmContentTitle"></div>
        <div class="brtmContentDesc"></div>
      </div>`);
      let newText = contentFrame.querySelector(".brtmContentHolder[new]");
      newText.removeAttribute("new");
      newText.querySelector(".brtmContentTitle").textContent = info.title;
      newText.querySelector(".brtmContentDesc").textContent = info.description;
      if (swipeRight == true) {
        newText.style.transform = "translateX(100%)";
      } else {
        newText.style.transform = "translateX(-100%)";
      }
      newText.offsetHeight;
      newText.style.transform = "translateX(0%)";
      newText.style.opacity = 1;

      if (currentPage > 0) {
        backButton.removeAttribute("disabled");
      } else {
        backButton.setAttribute("disabled", "");
      }
      /*
      if (currentPage < resource.pages.length - 1) {
        nextButton.removeAttribute("disabled");
      } else {
        nextButton.setAttribute("disabled", "");
      }
      */
      let selectedDot = navDots.querySelector("button[selected]");
      if (selectedDot != null) {
        selectedDot.removeAttribute("selected", "");
      }
      let selectDot = navDots.querySelector('button[page="' + currentPage + '"]');
      if (selectDot != null) {
        selectDot.setAttribute("selected", "");
      }

      await sleep(500);
      if (prevImage != null) {
        prevImage.remove();
      }
      if (prevText != null) {
        prevText.remove();
      }
    }
    updatePage();

    buttonHolder.addEventListener("click", (event) => {
      let target = event.target;

      if (target.closest(".brtmNavButton[next]") != null) {
        currentPage++;
        return updatePage();
      }
      if (target.closest(".brtmNavButton[back]") != null) {
        currentPage--;
        return updatePage();
      }
      if (target.closest(".brtmNavDots") != null && target.closest("button") != null) {
        currentPage = parseInt(target.closest("button").getAttribute("page"));
        return updatePage();
      }
    });

    holder.offsetHeight;
    holder.removeAttribute("new");
  }
}