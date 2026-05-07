import { copyObject, copyClipboardData, copyClipboardText } from "@/crucial";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";

import { rotatePoint } from "../../math";
import { rotatedBounds } from "../../math";

import moreIcon from "../../icons/toolbar/more.svg?raw";

import copyIcon from "../../icons/toolbar/copy.svg?raw";
import duplicateIcon from "../../icons/toolbar/duplicate.svg?raw";
import lockIcon from "../../icons/toolbar/lock.svg?raw";
import signatureIcon from "../../icons/toolbar/signature.svg?raw";
import upArrowIcon from "../../icons/rearrange/up.svg?raw";
import downArrowIcon from "../../icons/rearrange/down.svg?raw";
import { copy as copyCoreIcon } from "@modules/utility/core-icons";

import standardLockIcon from "../../icons/locking/standard.svg?raw";
import collaboratorLockIcon from "../../icons/locking/collaborator.svg?raw";
import placeholderLockIcon from "../../icons/locking/placeholder.svg?raw";

export class LockingDropdown {
  html = `
  <div class="eLockingHolder">
    <button class="eLockingOption" type="standard" style="--themeColor: var(--green)" title="Locked annotations must be unlocked to edit.">${standardLockIcon}<div class="eLockingInfo"><div class="eLockingTitle"><b>Standard</b> Lock</div><div class="eLockingDesc">Locked annotations must be unlocked to edit.</div></div></button>
    <button class="eLockingOption" type="collaborator" style="--themeColor: var(--theme)" title="Only the author can edit locked annotations.">${collaboratorLockIcon}<div class="eLockingInfo"><div class="eLockingTitle"><b>Collaborator</b> Lock</div><div class="eLockingDesc">Only the author can edit locked annotations.</div></div></button>
    <button class="eLockingOption" type="placeholder" style="--themeColor: var(--purple)" title="Editors cannot move, resize, rotate, or delete annotations.">${placeholderLockIcon}<div class="eLockingInfo"><div class="eLockingTitle"><b>Placeholder</b> Lock</div><div class="eLockingDesc">Editors cannot move, resize, rotate, or delete annotations.</div></div></button>
  </div>
  `;
  css = {
    ".eLockingHolder": `display: flex; flex-direction: column; width: max-content; max-width: 100%; gap: 6px; align-items: center; border-radius: inherit`,
    ".eLockingOption": `position: relative; display: flex; flex-wrap: wrap; min-width: 100%; padding: 0; border-radius: 6px; align-items: center; transition: .15s`,
    ".eLockingOption[selected]": `background: var(--themeColor); color: #fff`,
    ".eLockingOption[selected] svg": `filter: brightness(0) invert(1)`,
    ".eLockingOption[selected] b": `color: #fff`,
    ".eLockingOption:before": `content: ""; position: absolute; width: 100%; height: 100%; left: 0px; top: 0px; opacity: .2; border-radius: inherit; transition: .15s`,
    ".eLockingOption:not([selected]):hover:before": `background: var(--themeColor)`,
    ".eLockingOption:active": `transform: scale(.95); border-radius: 12px`,
    ".eLockingOption svg": `width: 50px; height: 50px; margin: 6px 6px 6px 10px; transition: .15s`,
    ".eLockingOption .eLockingInfo": `margin: 6px; text-align: left`,
    ".eLockingOption .eLockingTitle": `margin-right: 6px; font-size: 18px; font-weight: 600`,
    ".eLockingOption b": `color: var(--themeColor); font-weight: 800; transition: .15s`,
    ".eLockingOption .eLockingDesc": `max-width: 202px; font-size: 14px`
  };
  async js(frame, extra) {
    extra = extra ?? {};
    let parent = extra.parent ?? this.parent;
    let editor = this.editor ?? parent.editor;
    let toolbar = this.toolbar ?? parent.toolbar;

    let standardLock = frame.querySelector('.eLockingOption[type="standard"]');
    let collaboratorLock = frame.querySelector('.eLockingOption[type="collaborator"]');
    let placeholderLock = frame.querySelector('.eLockingOption[type="placeholder"]');

    let redraw = () => {
      let lockOptions = ["s", "c", "p"];
      let locks = [];
      let selectKeys = Object.keys(editor.selecting);
      for (let i = 0; i < selectKeys.length; i++) {
        let annotation = editor.annotations[selectKeys[i]];
        let render = annotation.render ?? annotation.revert ?? {};
        let renderLocks = editor.utils.getLocked(render);
        for (let l = 0; l < renderLocks.length; l++) {
          let lock = renderLocks[l];
          if (locks.includes(lock) == false) {
            locks.push(lock);
          }
        }
        let canChangeLocks = editor.utils.canChangeLock(render);
        for (let l = 0; l < lockOptions.length; l++) {
          if (canChangeLocks.includes(lockOptions[l]) == false) {
            lockOptions.splice(l, 1);
            l--;
          }
        }
      }
      
      if (lockOptions.includes("s") == true) {
        standardLock.removeAttribute("disabled");
      } else {
        standardLock.setAttribute("disabled", "");
      }
      if (locks.includes("s") == false) {
        standardLock.removeAttribute("selected");
      } else {
        standardLock.setAttribute("selected", "");
      }
      if (lockOptions.includes("c") == true && editor.settings.editOthersWork != true && (locks.includes("p") == false || locks.includes("c") == true)) {
        collaboratorLock.removeAttribute("disabled");
      } else {
        collaboratorLock.setAttribute("disabled", "");
      }
      if (locks.includes("c") == false || editor.settings.editOthersWork == true) {
        collaboratorLock.removeAttribute("selected");
      } else {
        collaboratorLock.setAttribute("selected", "");
      }
      if (lockOptions.includes("p") == true) {
        placeholderLock.removeAttribute("disabled");
      } else {
        placeholderLock.setAttribute("disabled", "");
      }
      if (locks.includes("p") == false) {
        placeholderLock.removeAttribute("selected");
      } else {
        placeholderLock.setAttribute("selected", "");
      }
    }
    redraw();
    if (extra.parent != null) {
      parent.redraw = redraw;
    } else {
      this.redraw = redraw;
      frame.querySelector(".eLockingHolder").style.padding = "6px";
    }

    standardLock.addEventListener("click", async () => {
      let setLock = !standardLock.hasAttribute("selected");
      await toolbar.saveSelecting((render) => {
        let lock = editor.utils.getLocked(render);
        let index = lock.indexOf("s");
        if (index > -1) {
          lock.splice(index, 1);
        }
        if (setLock == true) {
          lock.push("s");
        }
        return { lock: lock };
      });
      redraw();
      editor.save.syncSave(true);
    });
    collaboratorLock.addEventListener("click", async () => {
      let setLock = !collaboratorLock.hasAttribute("selected");
      await toolbar.saveSelecting((render) => {
        let lock = editor.utils.getLocked(render);
        let index = lock.indexOf("c");
        if (index > -1) {
          lock.splice(index, 1);
        }
        let save = { lock: lock };
        if (setLock == true) {
          lock.push("c");
        } else if (lock.includes("p") == true) {
          save.placeholder = true;
        }
        return save;
      });
      redraw();
      editor.save.syncSave(true);
    });
    placeholderLock.addEventListener("click", async () => {
      let setLock = !placeholderLock.hasAttribute("selected");
      await toolbar.saveSelecting((render) => {
        let lock = editor.utils.getLocked(render);
        let index = lock.indexOf("p");
        if (index > -1) {
          lock.splice(index, 1);
        }
        let save = {};
        if (setLock == true) {
          lock.push("p");
          let collaboratorLockIndex = lock.indexOf("c");
          if (collaboratorLockIndex > -1) {
            lock.splice(collaboratorLockIndex, 1);
          }
          if (render.sig != null) {
            save.sig = null;
          }
          save.placeholder = true;
        } else {
          save.placeholder = null;
        }
        save.lock = lock;
        return save;
      });
      redraw();
      editor.save.syncSave(true);
    });
  }
}

class MoreDropdown {
  html = `
  <button class="eToolbarMoreAction" option="copy" close title="Copy selected elements."><div>${copyIcon}</div>Copy</button>
  <button class="eToolbarMoreAction" option="duplicate" close title="Duplicate"><div>${duplicateIcon}</div>Duplicate</button>
  <button class="eToolbarMoreAction" option="lock" title="Change the locking options."><div>${lockIcon}</div>Locking</button>
  <button class="eToolbarMoreAction" option="signature" close><div>${signatureIcon}</div><span></span></button>
  <div class="eToolbarMoreLine" option="layers"></div>
  <button class="eToolbarMoreAction" option="bringfront" close title="Bring Forward"><div>${upArrowIcon}</div>Bring to Front</button>
  <button class="eToolbarMoreAction" option="sendback" close title="Send Backward"><div>${downArrowIcon}</div>Send to Back</button>
  <div class="eToolbarMoreLine" option="duplicate"></div>
  <button class="eToolbarMoreAction" option="copylink" close title="Copy a share link to element." style="--themeColor: var(--secondary)"><div>${copyCoreIcon}</div>Copy Link</button>
  `;
  css = {
    ".eToolbarMoreAction": `--themeColor: var(--theme); display: flex; width: 100%; padding: 4px 8px 4px 4px; border-radius: 8px; align-items: center; font-size: 16px; font-weight: 600; text-align: left; transition: .15s`,
    ".eToolbarMoreAction:not(:last-child)": `margin-bottom: 4px`,
    ".eToolbarMoreAction div": `width: 24px; height: 24px; padding: 2px; margin-right: 8px; background: var(--pageColor); border-radius: 4px`,
    ".eToolbarMoreAction div svg": `width: 100%; height: 100%`,
    ".eToolbarMoreAction:hover": `background: var(--themeColor); color: #fff`,
    ".eToolbarMoreLine": `width: 100%; height: 2px; margin-bottom: 4px; background: var(--gray); border-radius: 1px`,
    ".eToolbarMoreShowMe": `color: var(--theme); font-weight: 700`
  };
  async js(frame, { parent }) {
    let copyButton = frame.querySelector('.eToolbarMoreAction[option="copy"]');
    copyButton.addEventListener("click", () => { parent.copy(); });

    let duplicateButton = frame.querySelector('.eToolbarMoreAction[option="duplicate"]');
    let duplicateLine = frame.querySelector('.eToolbarMoreLine[option="duplicate"]');
    duplicateButton.addEventListener("click", () => { parent.duplicate(); });

    let lockButton = frame.querySelector('.eToolbarMoreAction[option="lock"]');
    lockButton.addEventListener("click", () => {
      this.open(lockButton, LockingDropdown, { parent: parent });
    });

    let signatureButton = frame.querySelector('.eToolbarMoreAction[option="signature"]');
    signatureButton.addEventListener("click", () => { parent.signature(signatureButton.hasAttribute("signaturehidden") == false); });

    let layersLine = frame.querySelector('.eToolbarMoreLine[option="layers"]');
    let frontButton = frame.querySelector('.eToolbarMoreAction[option="bringfront"]');
    frontButton.addEventListener("click", () => { parent.bringToFront(); });
    let backButton = frame.querySelector('.eToolbarMoreAction[option="sendback"]');
    backButton.addEventListener("click", () => { parent.sendToBack(); });

    let shareButton = frame.querySelector('.eToolbarMoreAction[option="copylink"]');
    shareButton.addEventListener("click", () => { parent.copyLink(); });

    parent.redraw = () => {
      if (frame == null) {
        return;
      }
      let showLock = parent.editor.self.access > 0;
      let pending = false;
      let allSticky = true;
      let isSignatureHidden = false;
      if (showLock != false) {
        let selectKeys = Object.keys(parent.editor.selecting);
        for (let i = 0; i < selectKeys.length; i++) {
          let annotation = parent.editor.annotations[selectKeys[i]];
          let render = annotation.render ?? annotation.revert ?? {};
          if (render._id.startsWith("pending_") == true) {
            pending = true;
          }
          if (parent.editor.utils.canMemberModify(render) == false || parent.editor.utils.isLocked(render) == true) {
            showLock = false;
          }
          if (render.f != "sticky") {
            allSticky = false;
          } else if (render.sigHidden == true) {
            isSignatureHidden = true;
          }
        }
      }
      if (showLock == true) {
        if (allSticky == false) {
          signatureButton.style.display = "none";
        } else {
          if (isSignatureHidden == false) {
            signatureButton.removeAttribute("signaturehidden");
            signatureButton.querySelector("span").textContent = "Hide Author";
            signatureButton.title = "Hide the sticky note signature text."
          } else {
            signatureButton.setAttribute("signaturehidden", "");
            signatureButton.querySelector("span").textContent = "Show Author";
            signatureButton.title = "Show the sticky note signature text."
          }
          signatureButton.style.display = "flex";
        }
        layersLine.style.display = "block";
        frontButton.style.display = "flex";
        backButton.style.display = "flex";
      } else {
        signatureButton.style.display = "none";
        layersLine.style.display = "none";
        frontButton.style.display = "none";
        backButton.style.display = "none";
      }
      if (parent.editor.self.access > 0) {
        duplicateButton.style.display = "flex";
        duplicateLine.style.display = "block";
      } else {
        duplicateButton.style.display = "none";
        duplicateLine.style.display = "none";
      }
      if (pending == false) {
        shareButton.removeAttribute("disabled");
      } else {
        shareButton.setAttribute("disabled", "");
      }
    }
    parent.redraw();
  }
}

export class Tool {
  setActionButton(button) {
    this.button.setAttribute("dropdowntitle", "More");
    button.innerHTML = moreIcon;
  }

  TOOLTIP = "More";
  FULL_CLICK = true;
  SHOW_ON_LOCK = true;

  async copy() {
    let [saveTextData, saveAnnoData] = await this.toolbar.processCopy();
    copyClipboardData([
      new ClipboardItem({
        "text/html": new Blob([`<meta charset="utf-8"><html><head></head><body><span data-meta="<!--(markify+copypaste)${encodeURIComponent(JSON.stringify(saveAnnoData))}(/markify+copypaste)-->"></span><div>${saveTextData}</div></body></html>`], { type: "text/html" }),
        "text/plain": new Blob([saveTextData], { type: "text/plain" })
      })
    ]);
  }
  async duplicate(handle, fromKeybind) {
    let selectKeys = Object.keys(this.editor.selecting);
    let checkChunks = {};
    let saveAnnoData = [];
    let parentIDs = {};
    let maxZIndex;
    let minZIndex;
    let offsetX = 50;
    let offsetY = 50;

    if (handle != null) {
      offsetX = 0;
      offsetY = 0;
      if (this.toolbar.selection.rotation == 0) {
        switch (handle) {
          case "duplicateleft":
            offsetX -= (this.toolbar.selection.maxX - this.toolbar.selection.minX) + 34;
            break;
          case "duplicateright":
            offsetX += (this.toolbar.selection.maxX - this.toolbar.selection.minX) + 34;
            break;
          case "duplicatetop":
            offsetY -= (this.toolbar.selection.maxY - this.toolbar.selection.minY) + 34;
            break;
          case "duplicatebottom":
            offsetY += (this.toolbar.selection.maxY - this.toolbar.selection.minY) + 34;
        }
      } else {
        switch (handle) {
          case "duplicateleft":
            offsetX -= (this.toolbar.selection.lastRect.endX - this.toolbar.selection.lastRect.x) + 34;
            break;
          case "duplicateright":
            offsetX += (this.toolbar.selection.lastRect.endX - this.toolbar.selection.lastRect.x) + 34;
            break;
          case "duplicatetop":
            offsetY -= (this.toolbar.selection.lastRect.endY - this.toolbar.selection.lastRect.y) + 34;
            break;
          case "duplicatebottom":
            offsetY += (this.toolbar.selection.lastRect.endY - this.toolbar.selection.lastRect.y) + 34;
        }
        [offsetX, offsetY] = rotatePoint(offsetX, offsetY, this.toolbar.selection.rotation);
      }
    }

    let minLeft;
    let minTop;
    let maxLeft;
    let maxTop;
    for (let i = 0; i < selectKeys.length; i++) {
      let annoID = selectKeys[i];
      let annotation = this.editor.annotations[annoID] ?? {};
      let render = annotation.render;
      if (render == null || this.toolbar.checkSubToolEnabled(render.f) == false) {
        continue;
      }
      if (fromKeybind == true) {
        let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
        if (annoModule.KEYBINDS_ENABLED == false) {
          continue;
        }
      }
      let addChunks = this.editor.utils.chunksFromAnnotation(render);
      for (let c = 0; c < addChunks.length; c++) {
        checkChunks[addChunks[c]] = true;
      }
      let annoRect = this.editor.utils.getRect(render);
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(annoRect.x, annoRect.y, annoRect.endX, annoRect.endY, annoRect.rotation);
      if (topLeftX < minLeft || minLeft == null) {
        minLeft = topLeftX;
      }
      if (topLeftY < minTop || minTop == null) {
        minTop = topLeftY;
      }
      if (bottomRightX > maxLeft || maxLeft == null) {
        maxLeft = bottomRightX;
      }
      if (bottomRightY > maxTop || maxTop == null) {
        maxTop = bottomRightY;
      }
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? maxZIndex ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? minZIndex ?? this.editor.utils.minLayer);
      let tempID = this.editor.render.tempID();
      parentIDs[annoID] = tempID;
      saveAnnoData.push({ ...copyObject(render), _id: tempID });
    }

    let annotations = this.editor.utils.annotationsInChunks(Object.keys(checkChunks));
    for (let i = 0; i < annotations.length; i++) {
      let annotation = annotations[i] ?? {};
      if (annotation.pointer != null) {
        annotation = this.editor.annotations[annotation.pointer];
      }
      let render = annotation.render;
      if (render == null || this.editor.selecting[render._id] != null || this.toolbar.checkSubToolEnabled(render.f) == false) {
        continue;
      }
      let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annoModule.KEEP_ON_PARENT_DELETE == true) {
        continue;
      }
      let { selectingParent } = this.editor.utils.getRect(render);
      if (selectingParent == false) {
        continue;
      }
      maxZIndex = Math.max(maxZIndex ?? render.l ?? this.editor.utils.maxLayer, render.l ?? maxZIndex ?? this.editor.utils.maxLayer);
      minZIndex = Math.min(minZIndex ?? render.l ?? this.editor.utils.minLayer, render.l ?? minZIndex ?? this.editor.utils.minLayer);
      let tempID = this.editor.render.tempID();
      parentIDs[render._id] = tempID;
      saveAnnoData.push({ ...copyObject(render), _id: tempID });
    }

    let { x: centerPageX, y: centerPageY } = this.editor.utils.scaleToDoc(this.editor.page.offsetWidth / 2, this.editor.page.offsetHeight / 2);
    let centerX = (maxLeft - minLeft) / 2;
    let centerY = (maxTop - minTop) / 2;
    
    maxZIndex++;
    this.editor.selecting = {};
    for (let i = 0; i < saveAnnoData.length; i++) {
      let newAnno = saveAnnoData[i];
      let checkParent = parentIDs[newAnno.parent];
      if (checkParent != null) {
        newAnno.parent = checkParent;
      } else {
        let { annoX, annoY, rotation } = this.editor.utils.getRect(newAnno);
        let inViewport = this.editor.utils.annotationInViewport(newAnno);
        if (handle != null || inViewport == true) {
          delete newAnno.parent;
          newAnno.p = [annoX + offsetX, annoY + offsetY];
          newAnno.r = rotation;
        } else {
          newAnno.p[0] += centerPageX + centerX - maxLeft;
          newAnno.p[1] += centerPageY + centerY - maxTop;
        }
      }
      if (newAnno.l != null) {
        newAnno.l = maxZIndex + ((newAnno.l ?? this.editor.utils.maxLayer) - minZIndex);
      }
      delete newAnno.m;
      let setLock = [];
      let canLock = this.editor.utils.canChangeLock(newAnno);
      for (let l = 0; l < canLock.length; l++) {
        let lock = canLock[l];
        if ((newAnno.lock ?? []).includes(lock) == true) {
          setLock.push(lock);
        }
      }
      newAnno.lock = setLock;
      this.editor.selecting[newAnno._id] = newAnno;
    }

    this.toolbar.selection.action = "save";
    await this.toolbar.selection.endAction();
  }
  async signature(set) {
    await this.toolbar.saveSelecting(() => { return { sigHidden: set }; });
  }
  async bringToFront() {
    let newLayers = {};
    let selectKeys = Object.keys(this.editor.selecting);
    selectKeys.sort((a, b) => {
      let selectA = (this.editor.annotations[a] ?? {}).render ?? {};
      let selectB = (this.editor.annotations[b] ?? {}).render ?? {};
      return (selectA.l ?? selectA.sync) - (selectB.l ?? selectB.sync);
    });
    for (let i = 0; i < selectKeys.length; i++) {
      this.editor.maxLayer++;
      newLayers[selectKeys[i]] = this.editor.maxLayer;
    }
    await this.toolbar.saveSelecting((render) => { return { l: newLayers[render._id] ?? render.l }; });
  }
  async sendToBack() {
    let newLayers = {};
    let selectKeys = Object.keys(this.editor.selecting);
    selectKeys.sort((a, b) => {
      let selectA = (this.editor.annotations[a] ?? {}).render ?? {};
      let selectB = (this.editor.annotations[b] ?? {}).render ?? {};
      return (selectB.l ?? selectB.sync) - (selectA.l ?? selectA.sync);
    });
    for (let i = 0; i < selectKeys.length; i++) {
      this.editor.minLayer--;
      newLayers[selectKeys[i]] = this.editor.minLayer;
    }
    await this.toolbar.saveSelecting((render) => { return { l: newLayers[render._id] ?? render.l }; });
  }
  copyLink() {
    let id = Object.keys(this.editor.selecting)[0];
    if (id == null || id.startsWith("pending_") == true) {
      return;
    }
    copyClipboardText("https://markify.app/join?lesson=" + this.editor.lesson.id + "&annotation=" + id, "link");
  }

  js = async () => {
    dropdownModule.open(this.button, MoreDropdown, { parent: this });
  }
}