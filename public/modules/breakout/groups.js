modules["breakout/groups"] = class {
  html = `
  You're currently in the waiting room. Please wait for the lesson owner to place you in a team!
  </br>
  </br>
  </br>
  This page will look a lot nicer soon...
  `;
  css = {
    
  };

  js = async (frame, extra = {}) => {
    frame.style.display = "flex";
    frame.style.height = "100%";
    frame.style.padding = "12px";
    frame.style.justifyContent = "center";
    frame.style.alignItems = "center";
  }
}