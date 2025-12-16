modules["breakout/group"] = class {
  html = ``;
  css = {};
  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";
  }
}