modules["pages/waitlist"] = {
  title: "You're on the Waitlist",
  preJs: function () {
    if (userID == null) {
      promptLogin();
      return false;
    }
  },
  html: `
    <div class="waitBackdrop" style="background-image: url(./images/editor/background.svg); background-position: center"></div>
    <img class="waitBackdrop" src="./images/waitlist/backdrop.svg">
    <div class="waitModalHolder">
      <div class="waitModal">
        <img class="waitLogo" src="./images/logo.svg">
        <div class="waitHeader"><b>You're</b> on the <b>Waitlist</b></div>
        <div class="waitNumber">#<b>Loading...</b> on the list!</div>
        <div class="waitText">Thank you for joining the waitlist, we'll send an email to <b>Loading...</b> when testing opens! 😊</div>
        <div class="waitText">Return to the <a openpage="launch" href="#launch">Launch Page</a></div>
        <div class="waitSocials">
          <a href="https://twitter.com/markifytool" target="_blank"><img src="./images/launch/socials/twitter.svg"></a>
          <a href="https://www.instagram.com/markifytool" target="_blank"><img src="./images/launch/socials/instagram.svg"></a>
          <a href="https://www.linkedin.com/company/markifyapp" target="_blank"><img src="./images/launch/socials/linkedin.svg"></a>
          <a href="https://www.youtube.com/@markifyexotek" target="_blank"><img src="./images/launch/socials/youtube.svg"></a>
        </div>
      </div>
    </div>
  `,
  css: {
    ".waitBackdrop": `position: fixed; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; transition: .3s`,
    ".waitModalHolder": `display: flex; width: 100%; height: fit-content; min-height: 100vh; justify-content: center; align-items: center`,
    ".waitModal": `display: flex; flex-direction: column; width: 100%; max-width: 400px; padding: 16px; margin: 24px; z-index: 1; background: var(--pageColor); box-shadow: 0px 0px 8px rgba(0, 132, 255, .4); border-radius: 20px; align-items: center`,
    ".waitLogo": `box-sizing: border-box; width: 100%; max-width: 225px`,
    ".waitHeader": `margin-top: 25px; font-size: 25px; line-height: 45px`,
    ".waitHeader b": `color: var(--theme); font-size: 35px; font-weight: 700`,
    ".waitNumber": `font-size: 20px; margin-top: 6px`,
    ".waitNumber b": `color: var(--theme); font-weight: 700`,
    ".waitText": `margin-top: 30px`,
    ".waitText a": `color: var(--theme); font-weight: 700; text-decoration: none`,
    ".waitSocials": `display: flex; flex-wrap: wrap; height: fit-content; margin-top: 16px; background: #fff; justify-content: center`,
    ".waitSocials a": `width: 32px; height: 32px; margin: 8px`,
    ".waitSocials a img": `width: 100%; height: 100%`
  },
  js: async function (page) {
    page.querySelector(".waitText b").textContent = account.email;

    let [code, body] = await sendRequest("GET", "auth/waitlist");
    if (code == 200) {
      page.querySelector(".waitNumber b").textContent = body.spot;
    }
  }
}