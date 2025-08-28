modules["pages/gift"] = class {
  html = "";
  js = () => {
    let from = getParam("user") ?? "";
    if (from.length > 0 && from != userID) {
      setLocalStore("affiliate", from);
    }
    setFrame("pages/launch");
  }
}