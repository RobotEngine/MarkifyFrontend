import enlargeIcon from "../../../../icons/toolbar/enlarge.svg?raw";

class EmbedModal {
  html = `<div class="emFrame"><iframe allowfullscreen allow="microphone; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" tabindex="0"></iframe></div>`;
  css = {
    ".emFrame": `width: calc(100vw - 37px); height: calc(100vh - 77px); max-width: 1000px; max-height: 700px`,
    ".emFrame iframe": `position: absolute; left: 0px; top: 0px; width: 100% !important; height: 100% !important; transform: unset !important; background: var(--pageColor); border: none; opacity: 0; transition: opacity .4s`
  };
  js(frame, extra) {
    frame.closest(".modalContent").style.padding = "4px 0px 0px";

    if (extra.preference.embed != null && extra.preference.embed.url != null) {
      let embedFrame = frame.querySelector(".emFrame iframe");
      embedFrame.addEventListener("load", () => {
        embedFrame.style.opacity = 1;
      });
      embedFrame.src = extra.preference.embed.url;
    }

    frame.closest(".fixedItemHolder").addEventListener("click", () => {
      this.close();
    });
  }
}

export class Tool {
  setActionButton(button) {
    button.innerHTML = enlargeIcon;

    if ((this.toolbar.getPreferenceTool().embed ?? {}).url == null) {
      return false;
    }
  }

  TOOLTIP = "Enlarge";
  SUPPORTS_MULTIPLE_SELECT = false;
  SHOW_ON_LOCK = true;
  FULL_CLICK = true;

  js() {
    let preference = this.toolbar.getPreferenceTool();
    this.editor.openModal(EmbedModal, this.button, {
      title: (preference.embed ?? {}).title ?? (new URL(preference.d ?? "")).hostname,
      preference: preference
    });
  }
}