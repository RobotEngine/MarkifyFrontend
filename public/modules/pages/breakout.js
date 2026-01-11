modules["pages/breakout"] = class extends page {
  title = "Breakout Waitlist";
  theme = "light";
  html = `
    <div class="waitBackdrop" style="background-image: url(./images/breakoutcusrsorbackdrop.png); background-size: cover; background-position: center"></div>
    <div class="waitModalHolder">
      <div class="waitModal" before>
        <img class="waitLogo" src="./images/breakoutlogo.svg">
        <div class="waitHeader"><b>Join</b> the <b>Waitlist</b></div>
        <div class="waitText" style="margin-top: 12px">Hello! If you're here, I'm going to assume you're interested in being one of the first to try Breakout. If that's true, click the button below and you'll be notified soon.</div>
        <button selected class="waitJoin largeButton">Join Waitlist</button>
        <div class="waitText">Exit to the <a openpage="launch" href="/launch">Launch Page</a></div>
        <div class="waitSocials">
          <a href="https://x.com/markifytool" target="_blank"><img src="../images/launch/socials/twitter.svg"></a>
        <a href="https://www.instagram.com/markifytool" target="_blank"><img src="../images/launch/socials/instagram.svg"></a>
        <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="../images/launch/socials/linkedin.svg"></a>
        <a href="https://www.facebook.com/groups/1140371071626764" target="_blank"><img src="../images/launch/socials/facebook.svg"></a>
        <a href="https://www.youtube.com/channel/UCoOM6y6FxPG_tBpZD3CynRg" target="_blank"><img src="../images/launch/socials/youtube.svg"></a>
        </div>
      </div>
      <div class="waitModal" after>
        <img class="waitLogo" src="./images/breakoutlogo.svg">
        <div class="waitHeader"><b>You're</b> on the <b>Waitlist</b></div>
        <div class="waitNumber">#<b>Loading...</b> on the list!</div>
        <div class="waitText">Thank you for joining the waitlist, we'll send an email to <b>Loading...</b> when testing opens! 😊</div>
        <div class="waitText">Exit to the <a openpage="launch" href="/launch">Launch Page</a></div>
        <div class="waitSocials">
          <a href="https://x.com/markifytool" target="_blank"><img src="../images/launch/socials/twitter.svg"></a>
          <a href="https://www.instagram.com/markifytool" target="_blank"><img src="../images/launch/socials/instagram.svg"></a>
          <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="../images/launch/socials/linkedin.svg"></a>
          <a href="https://www.facebook.com/groups/1140371071626764" target="_blank"><img src="../images/launch/socials/facebook.svg"></a>
          <a href="https://www.youtube.com/channel/UCoOM6y6FxPG_tBpZD3CynRg" target="_blank"><img src="../images/launch/socials/youtube.svg"></a>
        </div>
      </div>
    </div>
  `;
  css = {
    ".waitBackdrop": `position: fixed; width: 100%; height: 100%; left: 0px; top: 0px; transition: .3s`,
    ".waitModalHolder": `display: flex; width: 100%; height: fit-content; min-height: 100vh; justify-content: center; align-items: center`,
    ".waitModal": `display: none; flex-direction: column; width: 100%; max-width: 400px; padding: 16px; margin: 24px; z-index: 1; background: var(--pageColor); box-shadow: var(--breakoutLightShadow); border-radius: 20px; align-items: center`,
    ".waitLogo": `box-sizing: border-box; width: 100%; max-width: 225px`,
    ".waitHeader": `margin-top: 25px; font-size: 30px; line-height: 45px`,
    ".waitHeader b": `color: var(--breakoutTheme); font-size: 35px; font-weight: 700`,
    ".waitNumber": `font-size: 20px; margin-top: 6px`,
    ".waitNumber b": `color: var(--breakoutTheme); font-weight: 700`,
    ".waitText": `margin-top: 30px`,
    ".waitText a": `color: var(--breakoutTheme); font-weight: 700; text-decoration: none`,
    ".waitJoin": `--themeColor: var(--breakoutTheme); --hover: var(--breakoutHover); --borderRadius: 14px; margin-top: 30px`,
    ".waitSocials": `display: flex; flex-wrap: wrap; height: fit-content; margin-top: 16px; justify-content: center`,
    ".waitSocials a": `width: 32px; height: 32px; margin: 8px`,
    ".waitSocials a img": `width: 100%; height: 100%`
  };
  js = async (page) => {
    let beforeModal = page.querySelector(".waitModal[before]");
    let afterModal = page.querySelector(".waitModal[after]");

    let spot;

    let update = () => {
      if (userID == null || account.breakoutWaitlist == null) {
        afterModal.style.removeProperty("display");
        beforeModal.style.display = "flex";
      } else {
        afterModal.querySelector(".waitText b").textContent = account.email;
        afterModal.querySelector(".waitNumber b").textContent = spot ?? "?";

        beforeModal.style.removeProperty("display");
        afterModal.style.display = "flex";
      }
    }
    window.updateAccountSettings = update;

    let joinWaitlistButton = beforeModal.querySelector(".waitJoin");
    joinWaitlistButton.addEventListener("click", async () => {
      if (userID == null) {
        return promptLogin();
      }
      joinWaitlistButton.setAttribute("disabled", "");
      let [code, body] = await sendRequest("POST", "auth/breakout/joinwaitlist");
      if (code == 200) {
        spot = body.spot;
        update();
      }
      joinWaitlistButton.removeAttribute("disabled");
    });

    if (userID != null && account.breakoutWaitlist != null) {
      let [code, body] = await sendRequest("GET", "auth/breakout/waitlist");
      if (code == 200) {
        spot = body.spot;
      }
    }

    update();
  }
}