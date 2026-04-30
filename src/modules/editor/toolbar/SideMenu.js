import { sleep } from "@/crucial";

import { close } from "@modules/utility/core-icons";

export class SideMenu {
  constructor(toolbar) {
    this.toolbar = toolbar;
    this.editor = toolbar.editor;
  }

  subscribe(event, callback, extra) {
    this.editor.pipeline.subscribe("sidemenu", event, callback, extra);
  }
  unsubscribe(event) {
    this.editor.pipeline.unsubscribe("sidemenu", event);
  }

  async open(template, extra = {}) {
    this.close();

    this.toolbar.toolbarHolder.insertAdjacentHTML("beforeend", `<div class="eSideMenu" new>
      <div class="eSideMenuHeader">
        <div class="eSideMenuHeaderTitle">Testing</div>
        <button class="eSideMenuHeaderClose buttonAnim border">${close}</button>
      </div>
      <div class="eSideMenuContent customScroll"></div>
    </div>`);
    this.frame = this.toolbar.toolbarHolder.querySelector(".eSideMenu[new]");
    this.frame.removeAttribute("new");

    let closeButton = this.frame.querySelector(".eSideMenuHeaderClose");
    closeButton.addEventListener("click", () => { this.close(); });

    let contentHolder = this.frame.querySelector(".eSideMenuContent");
    let newModule = await this.editor.setFrame(template, contentHolder, { ...extra, construct: { editor: this.editor, toolbar: this.toolbar }, hideLoading: true });
    if (newModule != null) {
      contentHolder.style.padding = (newModule.padding ?? 6) + "px";
      this.frame.querySelector(".eSideMenuHeaderTitle").innerHTML = extra.title ?? newModule.title ?? "";
    }

    this.frame.offsetHeight;
    this.frame.style.zIndex = "4";
    this.frame.style.transform = "translate(0%, -50%)";
    this.frame.style.opacity = "1";

    return this;
  }
  close() {
    if (this.frame == null) {
      return;
    }
    let remFrame = this.frame;
    this.frame = null;
    (async () => {
      remFrame.style.zIndex = "3";
      remFrame.style.transform = "translate(var(--translate), -50%)";
      remFrame.style.opacity = "0";
      await sleep(400);
      if (remFrame != null) {
        remFrame.remove();
      }
    })();
    this.editor.pipeline.unsubscribe("sidemenu");
  }
}