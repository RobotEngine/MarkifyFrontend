modules["lesson/breakout"] = class {
  html = ``;
  css = {};
  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.pageHolder.style.setProperty("--themeRGB", "var(--breakoutThemeRGB)");
    this.pageHolder.style.setProperty("--theme", "var(--breakoutTheme)");
    this.pageHolder.style.setProperty("--secondaryRGB", "var(--breakoutSecondaryRGB)");
    this.pageHolder.style.setProperty("--secondary", "var(--breakoutSecondary)");
    this.pageHolder.style.setProperty("--hoverRGB", "var(--breakoutHoverRGB)");
    this.pageHolder.style.setProperty("--hover", "var(--breakoutHover)");
    this.pageHolder.style.setProperty("--lightShadow", "var(--breakoutLightShadow)");
    this.pageHolder.style.setProperty("--darkShadow", "var(--breakoutDarkShadow)");
    
    let page = frame;

    let testBoard = await this.parent.setFrame("lesson/board", this.pageHolder, { construct: {
        pageID: this.pageID,
        pageType: this.pageType,
        pageHolder: this.pageHolder
      }
    });
    this.editor = testBoard.editor;
  }
}