import { sendRequest, addS } from "@/crucial";

import uploadPageIcon from "../../../icons/toolbar/uploadpage.svg?raw";
import removePageIcon from "../../../icons/toolbar/removepage.svg?raw";

export class Tool {
  maxFileSize = 500 * 10 * 1024 * 1024; // 5 GB File Limit // Will be 10 MB per page

  setActionButton(button) {
    let selectKeys = Object.keys(this.editor.selecting);
    if (selectKeys.length == 1 && this.toolbar.getPreferenceTool().source == null) {
      this.TOOLTIP = "Upload PDF";
      button.innerHTML = uploadPageIcon;
    } else {
      let anyHasDocument = false;
      for (let i = 0; i < selectKeys.length; i++) {
        let annotation = this.editor.annotations[selectKeys[i]].render ?? {};
        if (annotation.source != null) {
          anyHasDocument = true;
          break;
        }
      }
      if (anyHasDocument == false) {
        return false;
      }
      this.TOOLTIP = "Remove PDF";
      this.FULL_CLICK = true;
      button.innerHTML = removePageIcon;
    }
  }

  FULL_CLICK = true;

  async js() {
    let preference = this.toolbar.getPreferenceTool();

    if (Object.keys(this.editor.selecting).length > 1 || preference.source != null) { // Remove Page:
      return await this.toolbar.saveSelecting((render) => {
        if (render.source != null) {
          return { source: null };
        }
      });
    }

    if (preference._id.startsWith("pending_") == true) {
      await this.editor.save.syncSave(true);
    }

    let input = this.toolbar.selection.actionBar.querySelector(".eSubToolUploadPageInput");
    if (input != null) {
      input.remove();
    }
    this.toolbar.selection.actionBar.insertAdjacentHTML("beforeend", `<input class="eSubToolUploadPageInput" type="file" accept="application/pdf" multiple="true" hidden="true">`);
    input = this.toolbar.selection.actionBar.querySelector(".eSubToolUploadPageInput");

    let processUpload = async (files, event) => {
      event.preventDefault();
      if (files == null) {
        return;
      }
      preference = this.toolbar.getPreferenceTool();
      if (preference._id.startsWith("pending_") == true) {
        return;
      }
      if (files.length > 50) {
        return this.editor.openAlert("warning", "<b>File Overload</b>Woah there! Markify only supports bulk uploads of up to 50 files at once.", { time: 10 });
      }
      let sendFormData = new FormData();
      let fileSize = 0;
      let passedFiles = 0;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.kind == "file") {
          file = file.getAsFile();
        }
        if (file.kind != "string") {
          if (file.type == "application/pdf") {
            fileSize += file.size;
            if (fileSize >= this.maxFileSize) {
              return this.editor.openAlert("error", "<b>Exceeded Size Limit</b><div>Uploads are limited to a max size of <u>5 GB</u> total</div>", { time: 10 });
            }
            sendFormData.append("file" + i, file);
            passedFiles++;
          } else {
            this.editor.openAlert("warning", "<b>" + file.name + " Failed to Upload</b>Only PDF files are currently supported", { time: 10 });
          }
        }
      }
      input.value = "";
      if (passedFiles > 0) {
        this.button.setAttribute("disabled", "");
        let uploadAlert = await this.editor.openAlert("info", `<b>Uploading Document${addS(passedFiles)}</b>Uploading your PDF${addS(passedFiles)} and inserting into the lesson!`, { time: "never" });
        let path = "lessons/save/file?annotation=" + preference._id;
        if ((this.editor.parameters ?? []).length > 0) {
          path += "&" + this.editor.parameters.join("&");
        }
        let [code, body] = await sendRequest("POST", path, sendFormData, { session: this.editor.session, noFileType: true });
        this.editor.closeAlert(uploadAlert);
        this.button.removeAttribute("disabled");
        if (code == 200) {
          let historyUpdate = body.historyUpdate ?? [];
          let historyAdd = body.historyAdd ?? [];
          let historyRemove = body.historyRemove ?? [];
          if (body.saves != null) {
            for (let i = 0; i < body.saves.length; i++) {
              let save = body.saves[i];
              await this.editor.save.push(save, { history: { update: historyUpdate, add: historyRemove }, ignoreSelect: true });
              this.editor.selecting[save._id] = this.editor.selecting[save._id] ?? {};
            }
            this.toolbar.selection.updateActionBar();
          }
          if (historyUpdate.length > 0) {
            this.editor.history.push("update", historyUpdate);
          }
          if (historyAdd.length > 0) {
            this.editor.history.push("remove", historyAdd);
          }
          if (historyAdd.length > 0) {
            this.editor.history.push("add", historyRemove);
          }
        }
      }
    }
    input.addEventListener("change", (event) => {
      processUpload(event.target.files, event);
    });
    input.value = "";
    input.click();
  }
}