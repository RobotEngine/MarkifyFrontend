import { sleep, getEpoch, sendRequest, connected, copyObject } from "@/crucial";

import { rotatePointOrigin, rotatePoint, pointInRotatedBounds } from "./math";

export class Save {
  constructor(editor) {
    this.editor = editor;
  }

  synced = true;
  pendingSaves = {};
  timeoutAnnotations = [];

  async enableTimeout(anno, collab) {
    if (anno == null || anno.render == null) {
      return;
    }
    anno.collab = collab == true;
    /*let setExpire = getEpoch();
    if ([anno.render.a ?? this.editor.self.modify, anno.render.m].includes(this.editor.self.modify) == true) {
      setExpire += 30000; // 30 seconds until expire
    } else {
      setExpire += 10000; // 10 seconds until expire
    }*/
    anno.expire = getEpoch() + 10000; // 10 seconds until expire
    if (anno.expire == null) {
      this.timeoutAnnotations.push(anno.render._id);
    }
    if (this.runningTimeout == true) {
      return;
    }
    this.runningTimeout = true;
    while (this.timeoutAnnotations.length > 0) {
      await sleep(10000);

      let changeOccured = false;
      //let redrawAction = false;
      let epoch = getEpoch();
      for (let i = 0; i < this.timeoutAnnotations.length; i++) {
        let annotation = this.editor.annotations[this.timeoutAnnotations[i]];
        /*if ((annotation ?? {}).pointer != null) { // If synced is availiable, update to it
          annotation = this.editor.annotations[annotation.pointer];
        }*/

        if ((annotation ?? {}).render == null || (connected == false && annotation.collab != true)) {
          this.timeoutAnnotations.splice(i, 1);
          i--;
          continue;
        }

        if (annotation.expire > epoch) {
          continue;
        }
        if (this.editor.toolbar != null
          && this.editor.selecting[annotation.render._id] != null
          && this.editor.toolbar.selection.action != null
        ) {
          continue;
        }
        
        this.timeoutAnnotations.splice(i, 1);
        i--;

        delete annotation.expire;
        delete annotation.collab;

        /*if (annotation.pending != null) {
          delete this.editor.annotations[annotation.pending];
          delete annotation.render.pending;
        }*/

        if (annotation.revert == null) {
          continue;
        }

        //if (annotation.render._id.includes("pending_") == false) {
        if (annotation.revert._id != null) { // Must not be a new annotation:
          delete annotation.retry;
          await this.apply(annotation.revert, { overwrite: true, timeout: false });
          delete annotation.revert;
          changeOccured = true;
        } else {
          await this.editor.utils.setAnnotationChunks({ ...annotation, render: { ...annotation.render, remove: true } });
          delete this.editor.annotations[annotation.render._id];
          changeOccured = true;
        }
      }

      if (changeOccured == true) {
        this.editor.pipeline.publish("redraw_selection", { redrawCurrentAction: true }); //redrawActionBar: redrawAction
      }
    }
    this.runningTimeout = false;
  }
  async syncSave(skip) {
    if (this.runningSyncSave == true && skip != true) {
      return;
    }
    this.runningSyncSave = true;
    this.synced = false;

    this.editor.pipeline.publish("save_status", { saving: true });

    let keys = Object.keys(this.pendingSaves);
    while (keys.length > 0) {
      if (skip != true) {
        await sleep(2500); // 1 save per 2.5 seconds
      } else {
        skip = false;
      }
      if (connected == false) {
        break;
      }
      keys = Object.keys(this.pendingSaves);

      let setPendingSave = {};
      let mutationObject = {};
      for (let i = 0; i < keys.length; i++) {
        let mutt = this.pendingSaves[keys[i]];
        if (mutt.annoRefresh != null && mutt.annoRefresh.render != null) {
          mutt._id = mutt.annoRefresh.render._id;
          delete mutt.annoRefresh;
        }
        let anno = this.editor.annotations[mutt._id];
        /*if (anno != null && anno.pointer != null) {
          mutt._id = anno.pointer;
          anno = this.editor.annotations[mutt._id];
        }*/
        if (anno == null) {
          continue;
        }
        if (anno.render == null) {
          delete this.editor.annotations[mutt._id];
          continue;
        }
        if (Object.keys(mutationObject).length > 499) {
          setPendingSave[mutt._id] = mutt;
          this.enableTimeout(anno);
          continue;
        }
        /*if ((mutt.parent ?? "").startsWith("pending_") == true && mutt.remove != true) {
          let parentAnno = this.editor.annotations[mutt.parent];
          if (parentAnno != null) {
            if (parentAnno.pointer != null) {
              mutt.parent = parentAnno.pointer;
              parentAnno = this.editor.annotations[mutt.parent];
            } else {
              setPendingSave[mutt._id] = mutt;
              this.enableTimeout(anno);
              continue;
            }
            if ((parentAnno.render ?? {}).remove == true) {
              continue;
            }
          }
        }*/

        delete mutt.sig;
        delete anno.save;
        delete anno.resizing;

        if (anno.retry > 0) {
          this.enableTimeout(anno);
          anno.retry--;
        }
        /*if (mutt._id.startsWith("pending_") == true) {
          if (mutt.f == null) {
            mutt.annoRefresh = anno;
            setPendingSave[mutt._id] = mutt;
            continue;
          } else if (mutt.remove == true) {
            continue;
          }
        }*/
        if (anno.render.from == "root") {
          if (mutt.from == null) {
            mutt.annoRefresh = anno;
            setPendingSave[mutt._id] = mutt;
            continue;
          } else if (mutt.remove == true) {
            continue;
          }
        }
        mutationObject[mutt._id] = { ...(mutationObject[mutt._id] ?? {}), ...mutt };
      }

      this.pendingSaves = {};
      let mutations = Object.values(mutationObject);
      if (mutations.length > 0) {
        let saveSuccess = false;
        try {
          //mutations = [];
          let path = "lessons/save";
          if ((this.editor.parameters ?? []).length > 0) {
            path += "?" + this.editor.parameters.join("&");
          }
          let [result] = await sendRequest("POST", path, { mutations }, { session: this.editor.session });
          saveSuccess = result == 200;
        } catch (err) {
          console.log("SAVE ERROR:", err);
        }
        if (saveSuccess == false) { // If not saved, set to try again
          for (let i = 0; i < mutations.length; i++) {
            let anno = this.editor.annotations[mutations[i]._id];
            if (anno == null) {
              continue;
            }
            /*if (anno.pointer != null) {
              anno = this.editor.annotations[anno.pointer];
            }*/
            if (anno.retry == null) {
              anno.retry = 3;
            }
            if (anno != null && anno.retry > 0) {
              setPendingSave[mutations[i]._id] = mutations[i];
              anno.save = true;
            }
          }
        }
      }
      this.pendingSaves = { ...this.pendingSaves, ...setPendingSave };
      keys = Object.keys(this.pendingSaves);
    }
    if (connected == true) {
      this.synced = true;
      this.editor.pipeline.publish("save_status", { saving: false });
    }
    this.runningSyncSave = false;
  }
  async apply(save, options = {}) {
    save = save ?? {};
    let annoID = save._id;
    if (annoID == null) {
      return;
    }

    let existingAnnotation = this.editor.annotations[annoID];
    /*if ((existingAnnotation ?? {}).pointer != null) {
      annoID = existingAnnotation.pointer;
      existingAnnotation = this.editor.annotations[annoID];
    }*/
    let annotation = existingAnnotation ?? { render: {} };

    if (existingAnnotation == null) {
      this.editor.annotations[annoID] = annotation;
    }

    if (annotation.revert == null && options.timeout != false) {
      annotation.revert = copyObject(annotation.render); // Copy the currents attributes to revert to later
    }

    let checkChunks = [];
    if (options.childChunkUpdate != false) {
      checkChunks = this.editor.utils.chunksFromAnnotation(annotation.render);
    }

    // IF SELECTING, DO NOT UPDATE THOSE FIELDS:
    if (options.overwrite != true) {
      let changeKeys = Object.keys(save);
      for (let f = 0; f < changeKeys.length; f++) {
        let key = changeKeys[f];
        annotation.render[key] = save[key] ?? null;
      }
      //objectUpdate(save, annotation.render); // Update the annotation
    } else {
      annotation.render = save;
    }
    if (options.timeout != false) {
      this.enableTimeout(annotation); // Start timer to revert if update isn't server-confirmed
    }

    await this.editor.utils.setAnnotationChunks(annotation);

    let chunkAnnotations = this.editor.utils.annotationsInChunks(checkChunks);
    for (let i = 0; i < chunkAnnotations.length; i++) {
      let anno = chunkAnnotations[i] ?? {};
      let render = anno.render;
      if (render == null || render._id == annoID) {
        continue;
      }
      if (this.editor.utils.getParentIDs(render).includes(annoID) == true) { // Update chunks of child annotations:
        await this.editor.utils.setAnnotationChunks(anno);
      }
    }

    let allowRender = annotation.render.remove == true;
    for (let i = 0; i < (annotation.chunks ?? []).length; i++) {
      if (this.editor.visibleChunks.includes(annotation.chunks[i]) == true) {
        allowRender = true;
        break;
      }
    }
    if (allowRender == true) {
      annotation.component = (await this.editor.render.create({
        ...annotation,
        render: {
          ...annotation.render,
          ...(options.renderPassthrough ?? {}),
          ...(this.editor.selecting[annoID] ?? {}) 
        },
        ...(options.render ?? {})
      },
      options.timeout == false)).component;
    } else {
      await this.editor.render.remove(annotation);
    }
    
    return { annotation }; //, redrawActionBar: redrawAction
  }
  async push(save, options = {}) {
    let data = copyObject(save);
    let history = options.history ?? {};

    let annotation = this.editor.annotations[data._id] ?? {};
    let newAnnotation = annotation.render == null;
    /*if (annotation.pointer != null) {
      data._id = annotation.pointer;
      annotation = this.editor.annotations[data._id] ?? {};
    }*/
    let annoID = data._id;

    let merged = { ...(annotation.render ?? {}), ...data };
    if (merged._id == null) {
      return;
    }

    if (merged.from == "root") { // Claim a template annotation:
      data.from = merged._id;
    }

    let originalRect = this.editor.utils.getRect(annotation.render ?? merged);
    let rect = this.editor.utils.getRect(merged);

    // Check for a new parent:
    if (merged.p != null && merged.s != null) {
      let { parentID } = await this.editor.utils.parentFromAnnotation({
        ...merged,
        p: [rect.annoX, rect.annoY],
        r: rect.rotation,
        parent: null,
        prevParent: merged.parent
      }, true);
      if (parentID != merged.parent) {
        data.parent = parentID ?? null;

        let { x: newX, y: newY, rotation: newRotation } = this.editor.utils.getRelativePosition({
          ...merged,
          parent: data.parent,
          p: [rect.annoX, rect.annoY],
          r: rect.rotation
        });
        data.p = [newX, newY];
        if (merged.r != null || newRotation != 0) {
          data.r = newRotation;
        }

        this.editor.realtimeSelect[data._id] = { ...(this.editor.realtimeSelect[data._id] ?? {}), ...data };
        merged = { ...merged, ...data };
        rect = this.editor.utils.getRect(merged);
      }
    }

    let checkChunks = [
      ...this.editor.utils.chunksFromAnnotation(merged),
      ...this.editor.utils.chunksFromAnnotation(annotation.render ?? {})
    ];

    data.sync = getEpoch();
    if (newAnnotation == true && data.hasOwnProperty("lock") == false) {
      data.lock = data.lock ?? [];
      for (let i = 0; i < this.editor.defaultLocks.length; i++) {
        let lock = this.editor.defaultLocks[i];
        if (data.lock.includes(lock) == false) {
          data.lock.push(lock); // Add default lock
        }
      }
    }
    annotation = (await this.apply(data, { ...options, childChunkUpdate: false })).annotation; // Apply Save

    if (
      data.hasOwnProperty("p") // Position changed
      || data.hasOwnProperty("s") // Size changed
      || data.hasOwnProperty("r") // Rotation changed
      || data.hasOwnProperty("t") // Thickness changed
      || data.hasOwnProperty("l") // Layer changed
      || data.remove == true // Removed
    ) {
      let resizeChangeX = 0;
      let resizeChangeY = 0;
      if (rect.size[0] != originalRect.size[0] || rect.size[1] != originalRect.size[1]) {
        let [originalResizeX, originalResizeY] = rotatePointOrigin(originalRect.x, originalRect.y, originalRect.centerX, originalRect.centerY, originalRect.rotation);
        if (rect.size[0] < 0) {
          originalResizeX -= rect.thickness;
        }
        if (rect.size[1] < 0) {
          originalResizeY -= rect.thickness;
        }
        let [newResizeX, newResizeY] = rotatePointOrigin(rect.x, rect.y, rect.centerX, rect.centerY, rect.rotation);
        [resizeChangeX, resizeChangeY] = rotatePoint(originalResizeX - newResizeX, originalResizeY - newResizeY, -rect.rotation);
      }
      
      let annotationModule = (await this.editor.render.getModule(annotation, merged.f)) ?? {};
      let chunkAnnotations = this.editor.utils.annotationsInChunks(checkChunks);
      let updateChunkAnnotations = [];
      for (let i = 0; i < chunkAnnotations.length; i++) {
        let anno = chunkAnnotations[i] ?? {};
        let render = anno.render;
        if (render == null || render._id == annoID) {
          continue;
        }
        if (this.editor.selecting[render._id] != null) {
          continue;
        }
        /*if ((render.parent ?? "").startsWith("pending_") == true) {
          let parentAnno = this.editor.annotations[render.parent];
          if (parentAnno != null && parentAnno.pointer != null) {
            render.parent = parentAnno.pointer;
          }
        }*/

        let historyUpdate;

        // Update position for parent resize:
        if (render.parent == annoID && (Math.floor(Math.abs(resizeChangeX)) > 0 || Math.floor(Math.abs(resizeChangeY)) > 0)) {
          historyUpdate = copyObject({ _id: render._id, parent: render.parent, p: render.p, r: render.r });
          let setChildAnno = {
            _id: render._id,
            p: [(render.p[0] ?? 0) + resizeChangeX, (render.p[1] ?? 0) + resizeChangeY]
          };
          await this.apply(setChildAnno, { render: { animate: false } });
          if (connected == true) {
            this.pendingSaves[setChildAnno._id] = {
              ...(this.pendingSaves[setChildAnno._id] ?? {}),
              ...setChildAnno,
              sync: getEpoch() 
            };
            this.editor.realtimeSelect[setChildAnno._id] = {
              ...(this.editor.realtimeSelect[setChildAnno._id] ?? {}),
              ...setChildAnno
            };
          }
        }

        updateChunkAnnotations.push([
          anno, render,
          (await this.editor.render.getModule(anno, render.f)) ?? {},
          this.editor.utils.getRect(render),
          historyUpdate
        ]);
      }
      for (let i = 0; i < updateChunkAnnotations.length; i++) {
        let [anno, render, annoModule, annoRect, historyUpdate] = updateChunkAnnotations[i];
        let { annoX, annoY, centerX, centerY, rotation, parents } = annoRect;
        
        let isChild = render.parent == annoID;
        let isAChild = parents.some((parent) => { return parent._id == annoID; });
        let deleteChild = isAChild == true && data.remove == true && history.fromHistory != true;

        // Check for child parent change:
        let checkParent = false;
        if (render.p != null && render.s != null) {
          if (
            pointInRotatedBounds(centerX, centerY, rect.x, rect.y, rect.endX, rect.endY, rect.rotation) == false
            || render.l == null
            || render.l < merged.l
            || merged.remove == true
          ) {
            // Is outside the saved annotation:
            checkParent = isChild;
          } else if (annotationModule.CAN_PARENT_CHILDREN == true && annoModule.ONLY_PARENT_CHANGE_ON_EDIT != true) {
            // Is inside the saved annotation:
            if (this.editor.utils.canMemberModify(render) == true && this.editor.utils.isPlaceholderLocked(render) == false) {
              checkParent = !isChild;
            }
          }
          if (deleteChild == true && annoModule.KEEP_ON_PARENT_DELETE == true) {
            checkParent = true;
            deleteChild = false;
          }
        }
        if (checkParent == true) {
          let { parentID: setParentID } = await this.editor.utils.parentFromAnnotation({
            ...render,
            p: [annoX, annoY],
            r: rotation,
            parent: null,
            prevParent: render.parent
          });
          if (setParentID != render.parent) {
            let { x: newX, y: newY, rotation: newRotation } = this.editor.utils.getRelativePosition({
              ...render,
              parent: setParentID,
              p: [annoX, annoY],
              r: rotation
            });
            if (historyUpdate == null) {
              historyUpdate = copyObject({ _id: render._id, parent: render.parent ?? null, p: render.p, r: render.r });
            }
            let setChildAnno = {
              _id: render._id,
              parent: setParentID,
              p: [newX, newY]
            };
            if (render.r != null || newRotation != 0) {
              setChildAnno.r = newRotation;
            }
            await this.apply(setChildAnno);
            anno.save = true;
            anno.render.m = this.editor.self.modify;
            if (connected == true) {
              this.pendingSaves[setChildAnno._id] = {
                ...(this.pendingSaves[setChildAnno._id] ?? {}),
                ...setChildAnno,
                sync: getEpoch()
              };
              this.editor.realtimeSelect[setChildAnno._id] = {
                ...(this.editor.realtimeSelect[setChildAnno._id] ?? {}),
                ...setChildAnno
              };
            }
          }
        } else if (isAChild == true) { // Update chunks of child annotations:
          await this.editor.utils.setAnnotationChunks(anno);
        }

        if (history.update != null && historyUpdate != null) {
          history.update.push(historyUpdate);
        }

        // Delete children if parent is deleted:
        if (deleteChild == true) {
          if (history.add != null) {
            history.add.push(copyObject({ ...render, p: [annoX, annoY], r: rotation, parent: null }));
          }
          let setChildAnno = { _id: render._id, remove: true };
          await this.apply(setChildAnno);
          if (connected == true) {
            this.pendingSaves[setChildAnno._id] = {
              ...(this.pendingSaves[setChildAnno._id] ?? {}),
              ...setChildAnno,
              sync: getEpoch()
            };
            this.editor.realtimeSelect[setChildAnno._id] = {
              ...(this.editor.realtimeSelect[setChildAnno._id] ?? {}),
              ...setChildAnno
            };
          }
        }
      }
    }

    annotation.save = true;
    annotation.render.m = this.editor.self.modify;
    
    if (newAnnotation == true) {
      annotation.render.a = this.editor.self.modify;
    }
    if (connected == true) {
      this.pendingSaves[annoID] = {
        _id: annoID,
        ...(this.pendingSaves[annoID] ?? {}),
        ...data
      };
    } else {
      this.pendingSaves = {};
    }

    this.syncSave();

    return annotation;
  }
}