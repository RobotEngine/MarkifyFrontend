modules["lesson/breakout"] = class {
  html = `
  <div class="lbrContentHolder customScroll"></div>
  `;
  css = {
    ".lbrContentHolder": `position: relative; width: 100%; height: 100%; overflow: scroll; z-index: 1; transition: .5s`,
  };
  js = async (frame, extra) => {
    frame.style.position = "relative";
    frame.style.width = "100%";
    frame.style.height = "100%";

    this.lesson = this.parent.lesson;
    this.session = this.parent.session;

    let contentHolder = frame.querySelector(".lbrContentHolder");

    let stringPref = JSON.stringify(this.parent.preferences); // Must be duplicated

    this.editor = await this.setFrame("editor/editor", contentHolder, {
      construct: {
        id: this.parent.id,
        lesson: this.parent,
        self: this.parent.self,
        session: this.parent.session,
        sessionID: this.parent.sessionID,
        sources: this.parent.sources,
        collaborators: this.parent.collaborators,
        settings: this.parent.lesson.settings,
        resync: this.resync,
        preferences: JSON.parse(stringPref),
        lastSavePreferences: JSON.parse(stringPref),
        backgroundColor: this.lesson.background ?? "FFFFFF"
      }
    });

    // Fetch Annotations
    let pageParam = getParam("page");
    let checkForJumpLink = getParam("annotation");
    let redrawSelectionId;
    this.loadAnnotations = async () => {
      if (this.session == null) {
        return;
      }
      contentHolder.setAttribute("disabled", "");
      let [annoCode, annoBody] = await sendRequest("GET", "lessons/join/annotations", null, { session: this.parent.session }, { allowError: true });
      if (annoCode != 200 && connected == true) {
        alertModule.open("error", `<b>Error Loading Annotations</b>Please try again later...`);
        return;
      }
      for (let i = 0; i < annoBody.annotations.length; i++) {
        let addAnno = annoBody.annotations[i];
        let existingAnno = this.editor.annotations[addAnno._id];
        if (existingAnno == null || existingAnno.render.sync < addAnno.sync) {
          this.editor.annotations[addAnno._id] = { render: addAnno };
        }
      }
      if (annoBody.reactions != null) {
        let reactedToObject = getObject(annoBody.reactedTo ?? [], "_id");
        for (let i = 0; i < annoBody.reactions.length; i++) {
          let addReaction = annoBody.reactions[i];
          let existingAnnoRecord = this.editor.reactions[addReaction.annotation];
          if (existingAnnoRecord == null) {
            this.editor.reactions[addReaction.annotation] = [];
            existingAnnoRecord = this.editor.reactions[addReaction.annotation];
          }
          delete addReaction.annotation;
          if (reactedToObject[addReaction._id + "_" + this.editor.self.modify] != null) {
            addReaction.reacted = true;
          }
          existingAnnoRecord.push(addReaction);
        }
      }
      for (let i = 0; i < annoBody.annotations.length; i++) {
        let existingAnno = this.editor.annotations[annoBody.annotations[i]._id];
        if (existingAnno != null) {
          await this.editor.utils.setAnnotationChunks(existingAnno);
        }
      }

      await this.editor.render.setMarginSize();

      if (this.exporting == true) {
        return;
      }

      let jumpAnnotation = null;
      if (checkForJumpLink != null && checkForJumpLink != "") {
        if (this.editor.annotations[checkForJumpLink] != null) {
          jumpAnnotation = (await this.editor.render.create(this.editor.annotations[checkForJumpLink])).component.getElement();
        }
      }
      if (jumpAnnotation == null) {
        if (pageParam == null) {
          if (this.editor.annotationPages.length > 0) {
            this.editor.utils.updateAnnotationScroll([this.editor.annotationPages[0][0]], false);
          } else {
            this.editor.utils.centerWindowWithPage();
          }
          //this.editor.utils.centerWindowWithPage();
          /*let startingPos = this.editor.utils.findStartingPoint();
          if (startingPos != null) {
            this.editor.utils.scrollToPoint(startingPos.x, startingPos.y, false);
          } else {
            this.editor.utils.centerWindowWithPage();
          }*/
        } else {
          this.editor.utils.updateAnnotationScroll([pageParam], false);
        }
        await this.editor.updateChunks();
      } else {
        await this.editor.utils.scrollToElement(jumpAnnotation);
        await this.editor.updateChunks();
        if (this.editor.toolbar != null) {
          this.editor.selecting[checkForJumpLink] = {};
          this.editor.pipeline.publish("redraw_selection", {});
        } else {
          redrawSelectionId = checkForJumpLink;
        }
      }
      contentHolder.removeAttribute("disabled");
    }

    this.loadAnnotations();

    (async () => {
      await (await this.newModule("editor/realtime")).js(this.editor);
      await (await this.newModule("editor/toolbar")).js(this.editor);

      editorToolbar.removeAttribute("notransition");
      viewerToolbar.removeAttribute("notransition");
      
      if (redrawSelectionId != null) {
        this.editor.selecting[redrawSelectionId] = {};
        this.editor.pipeline.publish("redraw_selection", { redraw: true });
      }
    })();
  }
}