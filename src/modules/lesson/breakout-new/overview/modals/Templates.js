import { assetURL, sleep, timeSince, formatFullDate, sendRequest } from "@/crucial";

import { Frame as Template } from "./Template";

export class Frame {
  maxHeight = 600;

  html = `<div class="brttTemplateTilesHolder">
    <div class="brttTemplateTiles"></div>
    <div class="brttNoTemplates">
      <img class="brttNoTemplatesImage" src="../images/dashboard/nolessons.png" />
      <div class="brttNoTemplatesTitle">No Templates... Yet!</div>
    </div>
  </div>`;

  css = {
    ".brttTemplateTilesHolder": `position: relative; display: flex; flex-direction: column; width: 500px; max-width: 100%; min-height: 100px; text-align: center; align-items: center; z-index: 1`,
    ".brttTemplateTiles": `position: relative; display: grid; box-sizing: border-box; width: 100%; padding: 8px; grid-gap: 16px; grid-template-columns: repeat(auto-fill, minmax(min(234px, 100%), 1fr)); transition: .4s`, // min-height: 100%;
    ".brttTemplateTile": `position: relative; background: var(--pageColor); --shadow: var(--lightShadow); box-shadow: var(--shadow); border-radius: 12px; overflow: hidden`,
    ".brttTemplateTile:hover": `--shadow: var(--darkShadow)`,
    ".brttTemplateTileThumbnailHolder": `position: relative; width: 100%; aspect-ratio: 4/3`,
    ".brttTemplateTileThumbnail": `position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; object-fit: cover; border-radius: 12px; opacity: 0; pointer-events: none`,
    'html[theme="dark"] .brttTemplateTileThumbnail': `filter: brightness(50%)`,
    ".brttTemplateTile:hover .brttTemplateTileThumbnail": `filter: brightness(100%)`,
    ".brttTemplateTileInfoHolder": `position: absolute; box-sizing: border-box; display: flex; width: 100%; padding: 10px; left: 0px; bottom: 0px; align-items: flex-end; background: var(--pageColor); box-shadow: var(--shadow)`,
    ".brttTemplateTileInfo": `width: 100%`,
    ".brttTemplateTileTitle": `box-sizing: border-box; width: 100%; font-size: 18px; font-weight: 600; text-align: left`,
    ".brttTemplateTileLastOpened": `width: 100%; color: var(--theme); margin-top: 2px; font-size: 14px; font-weight: 600; text-align: left`,
    ".brttNoTemplates": `display: none; flex-direction: column; width: 100%; height: fit-content; margin: 16px; align-items: center`,
    ".brttNoTemplatesImage": `width: 100%; max-width: 300px`,
    ".brttNoTemplatesTitle": `margin-top: 24px; font-size: 20px; font-weight: 700; color: var(--theme)`
  };

  addTile(template, insertFirst) {
    if (template == null) {
      return;
    }
    let tile = this.tileHolder.querySelector('.brttTemplateTile[template="' + template._id + '"');
    if (tile == null) {
      let insertAdj = "beforeend";
      if (insertFirst == true) {
        insertAdj = "afterbegin";
      }
      if (insertFirst == true && this.tileHolder.firstChild != null && template.created < parseInt(this.tileHolder.firstChild.getAttribute("time"))) {
        return;
      }
      this.tileHolder.insertAdjacentHTML(insertAdj, `<a class="brttTemplateTile" draggable="false" new>
        <div class="brttTemplateTileThumbnailHolder">
          <img class="brttTemplateTileThumbnail" src="../images/dashboard/placeholder.png" />
          <img class="brttTemplateTileThumbnail" main />
        </div>
        <div class="brttTemplateTileInfoHolder">
          <div class="brttTemplateTileInfo">
            <div class="brttTemplateTileTitle"></div>
            <div class="brttTemplateTileLastOpened"></div>
          </div>
        </div>
        </div>
      </a>`);
      tile = this.tileHolder.querySelector(".brttTemplateTile[new]");
      tile.removeAttribute("new");
      tile.setAttribute("template", template._id);
    }
    let placeholderThumbnail = tile.querySelector(".brttTemplateTileThumbnail[src]");
    let thumbnail = tile.querySelector(".brttTemplateTileThumbnail[main]");
    if (template.thumbnail != null) {
      let setThumbnail = assetURL + template.thumbnail;
      let thumbnailSrc = thumbnail.getAttribute("src");
      if (thumbnailSrc == null) {
        let loadingTimeout = setTimeout(() => {
          placeholderThumbnail.style.transition = ".4s";
          placeholderThumbnail.style.opacity = 1;
        }, 10);
        let completeListener = async () => {
          thumbnail.removeEventListener("error", errorListener);
          thumbnail.removeEventListener("load", completeListener);

          clearTimeout(loadingTimeout);
          thumbnail.style.opacity = 1;
          placeholderThumbnail.style.opacity = 0;
          await sleep(400);
          placeholderThumbnail.remove();
        }
        let errorListener = () => {
          clearTimeout(loadingTimeout);
          thumbnail.remove();
        }
        thumbnail.addEventListener("error", errorListener);
        thumbnail.addEventListener("load", completeListener);
        thumbnail.src = setThumbnail;
        thumbnail.style.transition = ".4s";
      } else if (thumbnailSrc != setThumbnail) {
        thumbnail.src = setThumbnail;
      }
    }
    let title = tile.querySelector(".brttTemplateTileTitle");
    if (template.hasOwnProperty("name") == true || title.textContent == "") {
      let titleText = template.name ?? "Untitled Template";
      title.textContent = titleText;
      title.title = titleText;
    }
    if (template.hasOwnProperty("created") == true) {
      let time = template.created;
      tile.setAttribute("time", time);
      let openedTx = tile.querySelector(".brttTemplateTileLastOpened");
      openedTx.textContent = timeSince(time, true);
      openedTx.title = formatFullDate(time);
    }
  }

  async fetchTemplates() {
    if (this.allLoaded == true || this.loading == true) {
      return;
    }
    this.loading = true;
    this.tileHolder.setAttribute("disabled", "");
    let path = "lessons/breakout/templates";
    let lastTile = this.tileHolder.lastElementChild;
    if (lastTile != null) {
      path += "?before=" + lastTile.getAttribute("time");
    }
    let [code, body] = await sendRequest("GET", path);
    this.tileHolder.removeAttribute("disabled");
    this.loading = false;
    if (code != 200) {
      return;
    }
    if (body.length < 25) {
      this.allLoaded = true;
    }
    for (let i = 0; i < body.length; i++) {
      this.addTile(body[i]);
    }
    if (this.tileHolder.childElementCount > 0) {
      this.noTemplates.style.removeProperty("display");
    } else {
      this.noTemplates.style.display = "flex";
    }
  }

  async js(frame, extra) {
    this.parent = extra.parent;

    this.scrollContainer = frame.closest(".modalContent");
    this.tileHolder = frame.querySelector(".brttTemplateTiles");
    this.noTemplates = frame.querySelector(".brttNoTemplates");

    this.parent.parent.parent.pipeline.subscribe("newBreakoutModalTemplatesUpdate", "templateset", (body) => {
      this.addTile({ ...body, _id: (body._id ?? body.id) }, body.created != null);
    });

    this.scrollContainer.addEventListener("scroll", () => {
      if (this.scrollContainer.scrollTop + this.scrollContainer.clientHeight + 250 > this.scrollContainer.scrollHeight && this.tileHolder.clientHeight > this.scrollContainer.clientHeight) {
        this.fetchTemplates();
      }
    });

    this.tileHolder.addEventListener("click", async (event) => {
      let tile = event.target.closest(".brttTemplateTile");
      if (tile == null) {
        return;
      }
      let templateID = tile.getAttribute("template");
      if (templateID == null) {
        return;
      }
      this.tileHolder.setAttribute("disabled", "");
      let [code, body] = await sendRequest("PUT", "lessons/breakout/templates/set", { template: templateID }, { session: this.parent.parent.parent.session });
      this.tileHolder.removeAttribute("disabled");
      if (code == 200) {
        this.open(Template, tile, { parent: this.parent.parent, template: body, title: "Start a Breakout" });
      }
    });

    await this.fetchTemplates();
  }
}