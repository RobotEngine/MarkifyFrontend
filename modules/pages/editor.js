modules["pages/editor"] = {
  title: "Editor",
  html: `<div class="ePage">
  
  </div>`,
  css: {
    ".ePage": `display: flex; width: 100%; height: 100vh`
  },
  js: async function (page) {
    await sleep(1);
  }
}