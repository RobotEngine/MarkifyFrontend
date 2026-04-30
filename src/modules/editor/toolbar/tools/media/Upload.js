import { connected, supportedImageTypes, assetURL, sendRequest } from "@/crucial";

import { ResizePlacement } from "../../ResizePlacement";

import { alert as alertModule } from "@modules/utility/Alert";

export class Tool extends ResizePlacement {
  ACTIVE = false;
  MINIMUM_SIZE = 100;
  EVEN_SCALE = true;

  enable(extra) {
    if (this.imageBlob != null) {
      return;
    }

    //let toolPreference = this.toolbar.getToolPreference();
    this.PROPERTIES = {
      f: "media",
      s: [200, 200],
      //c: (toolPreference.color ?? {}).selected,
      //o: toolPreference.opacity,
      l: this.editor.maxLayer + 1
    };

    let uploadInput = this.toolbar.toolbarHolder.querySelector(".eToolMediaInput");
    if (uploadInput != null) {
      uploadInput.remove();
    }
    this.toolbar.toolbarHolder.insertAdjacentHTML("beforeend", `<input class="eToolMediaInput" tooleditor type="file" accept="image/*" multiple="true" hidden="true">`);
    uploadInput = this.toolbar.toolbarHolder.querySelector(".eToolMediaInput");

    let reset = () => {
      this.annotation = null;
      this.imageBlob = null;
      let button = this.toolbar.toolbarHolder.querySelector('.eTool[module="editor/toolbar/upload"]');
      if (button != null) {
        button.removeAttribute("selected");
      }
      uploadInput.value = null;
      this.toolbar.disableTool();
    }
    let startImagePlace = async (file) => {
      if (connected == false) {
        reset();
        return alertModule.open("error", "<b>No Connection</b>Connect to the internet to upload media.");
      }
      if (file == null) {
        return;
      }
      if (file.kind == "file") {
        file = file.getAsFile();
      }
      if (file.kind != "string") {
        if (file.type.substring(0, 6) == "image/") {
          if (supportedImageTypes.includes(file.type.replace(/image\//g, "")) == true) {
            if (file.size < 10485760) { // 10 MB
              this.imageBlob = URL.createObjectURL(file);
              let image = new Image();
              image.onload = () => {
                this.width = Math.min(image.width, 400);
                this.height = image.height * (this.width / image.width);
                this.RENDER_INSERT = { d: this.PROPERTIES.d ?? this.imageBlob };
                if (this.resizeActive != true) {
                  this.PROPERTIES.s = [this.width, this.height];
                }
                this.ACTIVE = true;
              }
              image.src = this.imageBlob;
              let form = new FormData();
              form.append("media", file);
              let path = "lessons/save/upload";
              if ((this.editor.parameters ?? []).length > 0) {
                path += "?" + this.editor.parameters.join("&");
              }
              let [code, result] = await sendRequest("POST", path, form, { noFileType: true, session: this.editor.session });
              if (code == 200) {
                let preload = new Image();
                preload.src = assetURL + result.file;
                preload.onload = () => {
                  if (this.newAnnotation != null && this.newAnnotation.render != null) {
                    this.editor.save.push({ _id: this.newAnnotation.render._id, d: result.file });
                  }
                  if (image.src == this.imageBlob) {
                    this.imageBlob = result.file;
                    this.PROPERTIES.d = result.file;
                  }
                  if (image.src == this.imageBlob) {
                    URL.revokeObjectURL(this.imageBlob);
                  }
                }
              } else {
                if (image.src == this.imageBlob) {
                  URL.revokeObjectURL(this.imageBlob);
                }
                if (blobAnno != null) {
                  if (blobAnno.hasAttribute("anno") == true) {
                    this.editor.save.push({ _id: blobAnno.getAttribute("anno"), remove: true });
                  } else {
                    blobAnno.remove();
                  }
                }
                reset();
              }
            } else {
              reset();
              alertModule.open("error", "<b>Image Too Large</b>10 MB is the file size limit.");
            }
          } else {
            reset();
            alertModule.open("error", `<b>Invalid Image Type</b>The following image types are supported: <i style='color: var(--darkGray)'>${(supportedImageTypes.join(", "))}</i>`);
          }
        } else {
          reset();
          alertModule.open("error", "<b>Invalid File Type</b>Only images are currently supported.");
        }
      }
      uploadInput.value = null;
    }
    uploadInput.addEventListener("change", async (event) => {
      startImagePlace((event.target.files ?? [])[0], event);
    });
    uploadInput.addEventListener("cancel", () => {
      reset();
      uploadInput.value = null;
    });
    if (extra == null || extra.file == null) {
      this.uploadInput = uploadInput;
    } else {
      startImagePlace(extra.file, extra.event);
    }
  }
  toolbar_click() {
    if (this.uploadInput != null) {
      this.uploadInput.click();
    }
  }
}