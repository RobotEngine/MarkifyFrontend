modules["pages/dashboard"] = {
  html: `
  <div class="dPage">
    Markify goes here...
  </div>
  `,
  css: {
    ".dPage": `display: flex; width: 100%; flex-wrap: wrap; justify-content: center`
  },
  js: function() {
    if (userID == null) {
      promptLogin();
    }
  }
}