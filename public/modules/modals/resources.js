modules["modals/resources"] = class {
  html = `
  <div class="dmWelcome">
    <div class="dmHeaderTx">Welcome To</div>
    <img class="dmHeaderMarkify" src="./images/logo.svg">
    <div class="dmAbout">Learning new pieces of software can be daunting, so here are some resources to help you get started!</div>
    <div class="dmButtons">
      <button class="dmTutorialButton largeButton" type="usecase" style="--rgbTheme: 255, 185, 56">
        <img src="./images/tutorial/lightbulb.svg">
        <div>What You Can Use Markify For</div>
      </button>
      <button class="dmTutorialButton largeButton" type="started" style="--rgbTheme: 52, 193, 114">
        <img src="./images/tutorial/compass.svg">
        <div>Getting Started with Markify</div>
      </button>
      <button class="dmTutorialButton largeButton" type="watchout" style="--rgbTheme: 255, 61, 100">
        <img src="./images/tutorial/warning.svg">
        <div>Some Things to Watch Out For</div>
      </button>
      <button class="dmSkipButton"><b>Let Me In!</b> <i>— I'm an Expert</i></button>
    </div>
  </div>
  <img class="dmBackground" default hover src="./images/tutorial/backgrounds/default.svg">
  <img class="dmBackground" type="usecase" src="./images/tutorial/backgrounds/yellow.svg">
  <img class="dmBackground" type="started" src="./images/tutorial/backgrounds/green.svg">
  <img class="dmBackground" type="watchout" src="./images/tutorial/backgrounds/red.svg">
  `;
  css = {
    ".dmWelcome": `position: relative; display: flex; flex-direction: column; width: 350px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".dmHeaderTx": `font-size: 22px; font-weight: 500`,
    ".dmHeaderMarkify": `width: 100%; max-width: 250px`,
    ".dmAbout": `max-width: 100%; margin-top: 12px; font-size: 16px`,

    ".dmButtons": `display: flex; flex-direction: column; width: 100%; margin-top: 16px; align-items: center`,
    ".dmTutorialButton": `--themeColor: rgb(var(--rgbTheme)); --themeColor2: var(--themeColor); --borderRadius: 33px; padding: 8px; flex-wrap: wrap; margin: 8px 24px; justify-content: center; text-align: left; background: linear-gradient(to bottom right, rgba(var(--rgbTheme), 0), var(--pageColor))`,
    ".dmTutorialButton:hover": `--borderWidth: 6px; background: linear-gradient(to bottom right, rgba(var(--rgbTheme), .3), var(--pageColor))`,
    ".dmTutorialButton img": `width: 50px; height: 50px`, //; transform: scale(1.3)
    ".dmTutorialButton div": `flex: 1 1 100px; margin: 0 8px`,
    ".dmSkipButton": `width: fit-content; margin: 16px 0 12px 0; color: var(--theme); font-size: 18px; font-weight: 600`,

    ".dmBackground": `position: absolute; width: calc(100% + 12px); height: calc(100% + 12px); left: -6px; top: -6px; object-fit: cover; z-index: 0; opacity: 0; transition: .5s`,
    ".dmBackground[hover]": `opacity: 1`
  };
  js = async function (frame) {
    frame.addEventListener("mouseover", (event) => {
      let target = event.target;
      if (target == null) {
        return;
      }
      let targetButton = target.closest(".dmTutorialButton");
      if (targetButton != null) {
        let prevHover = frame.querySelector(".dmBackground[hover]");
        if (prevHover != null && prevHover.getAttribute("type") != targetButton.getAttribute("type")) {
          prevHover.removeAttribute("hover");
          frame.querySelector('.dmBackground[type="' + targetButton.getAttribute("type") + '"]').setAttribute("hover", "");
        }
      }
    });

    let buttons = frame.querySelector(".dmButtons");
    buttons.addEventListener("click", (event) => {
      let button = event.target.closest(".dmTutorialButton");
      if (button == null) {
        return;
      }
      modalModule.open("modals/resources/resources", button);
    });

    let updateSeenTutorial = () => {
      sendRequest("POST", "me/read?seen=tutorial");
    }
    frame.querySelector(".dmSkipButton").addEventListener("click", async () => {
      modalModule.close();
      updateSeenTutorial();
    });
    let closeButton = frame.closest(".modal").querySelector(".modalClose");
    if (closeButton != null && closeButton.hasAttribute("listen") == false) {
      closeButton.setAttribute("listen", "");
      closeButton.addEventListener("click", updateSeenTutorial);
    }
  }
}

modules["modals/resources/resources"] = class {
  html = `
  <div class="dmucHolder" new>
    <div class="dmucImageHolder">
      <div class="dmucImageContent">
        <div class="dmucImageGradient"></div>
      </div>
      <div class="dmucImageContent" image></div>
      <svg class="dmucImagePattern" viewBox="0 0 90 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2.5L14.3529 3.51309C10.8506 4.48595 7.1494 4.48595 3.64712 3.51309L0 2.5V5H44H90V2.5L86.3529 3.51309C82.8506 4.48595 79.1494 4.48595 75.6471 3.51309L72 2.5L68.3529 1.48691C64.8506 0.514054 61.1494 0.514055 57.6471 1.48691L54 2.5L50.3529 3.51309C46.8506 4.48595 43.1494 4.48595 39.6471 3.51309L36 2.5L32.3529 1.48691C28.8506 0.514054 25.1494 0.514055 21.6471 1.48691L18 2.5Z" fill="var(--pageColor)"/>
      </svg>
    </div>
    <div class="dmucContentFrame"></div>
    <div class="dmucButtonHolder">
      <button class="dmucNavButton largeButton" back><svg viewBox="0 0 256 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1340_7" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="200"> <rect width="256" height="200" transform="matrix(-1 0 0 1 256 0)" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1340_7)"> <path d="M222 99.7104H34.585" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M105.296 28.9998L34.585 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M105.296 170.421L34.585 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> </g> </svg></button>
      <div class="dmucNavDots"></div>
      <button class="dmucNavButton largeButton" next><svg viewBox="0 0 256 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_1340_2" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="200"> <rect width="256" height="200" fill="#C4C4C4"/> </mask> <g mask="url(#mask0_1340_2)"> <path d="M34.0001 99.7104H221.415" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M150.704 28.9998L221.415 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> <path d="M150.704 170.421L221.415 99.7104" stroke="var(--theme)" stroke-width="36" stroke-linecap="round"/> </g> </svg></button>
    </div>
  </div>
  `;
  css = {
    ".dmucHolder": `position: relative; display: flex; flex-direction: column; width: 450px; max-width: 100%; text-align: center; align-items: center; z-index: 1`,
    ".dmucHolder[new] *": `transition: none !important`,
    ".dmucImageHolder": `position: relative; width: calc(100% + 12px); height: 200px; overflow: hidden`,
    ".dmucImageContent": `position: absolute; width: 100%; height: 198px; left: 0px; top: 0%; overflow: hidden`,
    ".dmucImageGradient": `width: 100%; height: 100%`,
    ".dmucImage": `position: absolute; width: calc(100% - 40px); height: 100%; left: 20px; top: 100%; border-radius: 16px; opacity: 0; transform: scale(.8); transition: .5s`,
    ".dmucImagePattern": `position: absolute; width: calc(100% + 12px); left: -6px; bottom: 0px; z-index: 1`,
    ".dmucContentFrame": `position: relative; width: calc(100% + 12px); margin-top: 16px; overflow: hidden`,
    ".dmucContentHolder": `display: flex; flex-direction: column; width: 100%; align-items: center; opacity: 0; transition: .5s`,
    ".dmucContentTitle": `color: var(--theme); font-size: 24px; font-weight: 700`,
    ".dmucContentDesc": `max-width: 350px; margin-top: 8px; font-size: 16px; line-height: 22px`,
    ".dmucButtonHolder": `display: flex; max-width: 100%; margin: 24px 0 12px 0`,
    ".dmucNavButton": `--themeColor: var(--theme); --themeColor2: var(--themeColor); --borderRadius: 33px; padding: 4px 8px; flex-wrap: wrap; margin: 0px 12px; justify-content: center; color: var(--theme); font-size: 18px`,
    ".dmucNavButton svg": `width: 30px`,
    ".dmucNavDots": `display: flex; flex-wrap: wrap; justify-content: center; align-items: center`,
    ".dmucNavDots button": `display: flex; width: 12px; height: 12px; margin: 4px; background: var(--gray); border-radius: 6px`,
    ".dmucNavDots button[selected]": `width: 24px; background: var(--theme)`
  };
  resources = {
    usecase: {
      theme: "var(--yellow)",
      background: "linear-gradient(to bottom right, #FFE4BD, #FFAF3F)",
      pages: [
        {
          image: "./images/launch/usecases/reading.png",
          title: "Classroom Notetaking",
          description: "Let students see notes up close on their own devices where they can zoom in, review, and download the lesson for later."
        },
        {
          image: "./images/launch/usecases/study.png",
          title: "Collaborative Review",
          description: "Grant editing to several students at a time to answer review questions for everyone to see and understand."
        },
        {
          image: "./images/launch/usecases/socratic.png",
          title: "Student-Run Activities",
          description: "Markify gives all students a voice, allowing ideas from seminars and group work to be like putting a puzzle together."
        },
        {
          image: "./images/launch/usecases/shared.png",
          title: "Freely Roam the Classroom",
          description: "Run the lesson from a tablet that streams in real-time to the front of the class as well as everyone's device."
        },
        {
          image: "./images/launch/usecases/activity.png",
          title: "Annotating and Discussion",
          description: "Read and annotate texts by having students markup on their device for everyone to see."
        },
        {
          image: "./images/launch/usecases/group.png",
          title: "Group Collaboration",
          description: "Let student groups read, annotate, and work seamlessly on the same document with leading collaborative tools."
        }
      ]
    },
    started: {
      theme: "var(--green)",
      background: "linear-gradient(to bottom right, #7BCCA3, #20BA6C)",
      interface: true,
      pages: [
        {
          image: "./images/tutorial/steps/create.png",
          title: "Create Your Lesson",
          description: "Click the New Lesson button and choose to either upload a PDF or create an endless Freeboard for brainstorming activites."
        },
        {
          image: "./images/tutorial/steps/share.png",
          title: "Share the Lesson",
          description: "At the beginning of your class, head to Share and choose to Generate a Pin. Your class can head to the link and join in!"
        },
        {
          image: "./images/tutorial/steps/markup.png",
          title: "Markup and Annotate",
          description: "Use the side toolbar to annotate your lesson document while the entire class follows along in real-time."
        },
        {
          image: "./images/tutorial/steps/editing.png",
          title: "Facilitate the Class",
          description: "Let students teach each other by granting temporary editing. Go to Members and click on a student to grant editing access."
        },
        {
          image: "./images/tutorial/steps/export.png",
          title: "End Session and Export",
          description: "At the end of your lesson, hit End Session to remove all editing access. Everything is saved and can be exported as a PDF."
        }
      ]
    },
    watchout: {
      theme: "var(--error)",
      background: "linear-gradient(to bottom right, #FF7E98, #FF3D64)",
      pages: [
        {
          image: "./images/launch/usecases/mobility.png",
          title: "Keep Your Eye on Editors",
          description: "When you grant a student editing access, stay cognizant and aware to ensure nothing inappropriate gets drawn."
        },
        {
          image: "./images/tutorial/steps/revoke.png",
          interface: true,
          title: "Limit Concurrent Editors",
          description: "Unless you know what you're doing, utilize features like hand raising to minimize the number of concurrent editors."
        },
        {
          image: "./images/tutorial/steps/end.png",
          interface: true,
          title: "End Your Lesson Sessions",
          description: "If you're granting students editing access, make sure to revoke all editing access at the end of your lesson."
        },
        {
          image: "./images/tutorial/steps/report.png",
          interface: true,
          title: "BETA - May have Bugs 🐛",
          description: "If you run into any issues, need help, or have a cool idea, click your profile at the top right corner and let us know!"
        }
      ]
    }
  };
  js = async function (frame, extra) {
    let resourceName = "usecase";
    if (extra.button != null) {
      resourceName = extra.button.getAttribute("type");
    }

    let resource = this.resources[resourceName];

    let holder = frame.querySelector(".dmucHolder");
    let imageHolder = holder.querySelector(".dmucImageHolder");
    let gradient = holder.querySelector(".dmucImageGradient");
    let imageContent = imageHolder.querySelector(".dmucImageContent[image]");
    let contentFrame = holder.querySelector(".dmucContentFrame");
    let buttonHolder = holder.querySelector(".dmucButtonHolder");
    let backButton = buttonHolder.querySelector(".dmucNavButton[back]");
    let navDots = buttonHolder.querySelector(".dmucNavDots");
    //let nextButton = buttonHolder.querySelector(".dmucNavButton[next]");

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
        return modalModule.open("modals/resources", null, null, false);
      }

      let prevImage = imageContent.querySelector("img:not([old])");
      if (prevImage != null) {
        prevImage.setAttribute("old", "");
        prevImage.style.top = "100%";
        prevImage.style.transform = "scale(.8)";
        prevImage.style.opacity = 0;
      }

      imageContent.insertAdjacentHTML("beforeend", `<img class="dmucImage" new>`);
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

      let prevText = contentFrame.querySelector(".dmucContentHolder:not([old])");
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

      contentFrame.insertAdjacentHTML("beforeend", `<div class="dmucContentHolder" new>
        <div class="dmucContentTitle"></div>
        <div class="dmucContentDesc"></div>
      </div>`);
      let newText = contentFrame.querySelector(".dmucContentHolder[new]");
      newText.removeAttribute("new");
      newText.querySelector(".dmucContentTitle").textContent = info.title;
      newText.querySelector(".dmucContentDesc").textContent = info.description;
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

      if (target.closest(".dmucNavButton[next]") != null) {
        currentPage++;
        return updatePage();
      }
      if (target.closest(".dmucNavButton[back]") != null) {
        currentPage--;
        return updatePage();
      }
      if (target.closest(".dmucNavDots") != null && target.closest("button") != null) {
        currentPage = parseInt(target.closest("button").getAttribute("page"));
        return updatePage();
      }
    });

    holder.offsetHeight;
    holder.removeAttribute("new");
  }
}