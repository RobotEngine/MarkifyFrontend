modules["breakout/groups"] = class {
  html = `
  <div class="brgsBackgorund"></div>
  <div class="brgsModalHolder">
    <div class="brgsModalContainer">
      <div class="brgsModal">
        <a class="brgsLogo" href="/launch"><img src="../images/breakoutlogo.svg" /></a>
        <div class="brgsTitle">You're in the <b>Waiting Room</b></div>
        <div class="brgsTitleDesc">Please wait for the lesson owner to place you into a team!</div>
        <button class="brgsLeaveLesson largeButton border">Leave Lesson</button>
      </div>
    </div>
  </div>
  `;
  css = {
    ".brgsBackgorund": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; background: linear-gradient(-45deg,var(--theme) 0%, var(--pageColor) 50%, var(--theme) 100%); opacity: .2`,
    ".brgsModalHolder": `display: flex; width: 100%; min-height: 100vh; left: 0px; top: 0px; justify-content: center; align-items: center; overflow: hidden`,
    ".brgsModalContainer": `position: relative`,
    ".brgsModal": `position: relative; display: flex; flex-direction: column; width: fit-content; max-width: 100%; height: fit-content; padding: 16px; margin: 8px; overflow: hidden; background: var(--pageColor); transform: scale(.9); opacity: 0; align-items: center; border-radius: 16px; box-shadow: var(--lightShadow); transition: .3s`,
    ".brgsLogo": `max-width: 100%; height: 60px`,
    ".brgsLogo img": `max-width: 100%; height: 100%`,
    ".brgsTitle": `margin-top: 20px; color: var(--theme); font-size: 24px; font-weight: 600`,
    ".brgsTitleDesc": `margin-top: 12px; max-width: 350px`,
    ".brgsLeaveLesson": `margin-top: 24px; --borderColor: var(--secondary); --borderRadius: 12px; color: var(--secondary); font-size: 16px; font-weight: 700`
  };

  js = async (frame, extra = {}) => {
    frame.style.display = "flex";
    frame.style.height = "100%";
    frame.style.padding = "12px";
    frame.style.justifyContent = "center";
    frame.style.alignItems = "center";

    let modal = frame.querySelector(".brgsModal");

    modal.querySelector(".brgsLogo").addEventListener("click", (event) => {
      sendRequest("DELETE", "lessons/leave", null, { session: this.parent.parent.session });
      setFrame("pages/launch");
      event.preventDefault();
    });

    modal.querySelector(".brgsLeaveLesson").addEventListener("click", () => {
      sendRequest("DELETE", "lessons/leave", null, { session: this.parent.parent.session });
      if (userID == null) {
        setFrame("pages/app/join", null);
      } else {
        setFrame("pages/app/dashboard");
      }
    });

    (async () => {
      await sleep(1);
      modal.style.transform = "scale(1)";
      modal.style.opacity = 1;
    })();
  }
}