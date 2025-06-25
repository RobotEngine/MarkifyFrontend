modules["modals/lesson/newbreakout"] = class {
  html = `howdy how are you`;
  css = {

  };
  js = (frame, extra) => {
    this.parent = extra.parent;
    this.folder = getParam("folder");
  }
}