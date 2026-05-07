import { account, mouseDown, sleep, sendRequest, copyObject, getObject } from "@/crucial";

import { rotatedBounds, rotatePoint, rotatePointOrigin, round, pointInRotatedBounds } from "../math";

import { dropdown as dropdownModule } from "@modules/utility/Dropdown";

import topLeftSelectHandle from "../icons/selection/topleft.svg?raw";
import topRightSelectHandle from "../icons/selection/topright.svg?raw";
import bottomLeftSelectHandle from "../icons/selection/bottomleft.svg?raw";
import bottomRightSelectHandle from "../icons/selection/bottomright.svg?raw";
import leftSelectHandle from "../icons/selection/left.svg?raw";
import rightSelectHandle from "../icons/selection/right.svg?raw";
import topSelectHandle from "../icons/selection/top.svg?raw";
import bottomSelectHandle from "../icons/selection/bottom.svg?raw";
import rotateSelectHandle from "../icons/selection/rotate.svg?raw";
import duplicateLeftSelectHandle from "../icons/selection/duplicateleft.svg?raw";
import duplicateRightSelectHandle from "../icons/selection/duplicateright.svg?raw";
import duplicateTopSelectHandle from "../icons/selection/duplicatetop.svg?raw";
import duplicateBottomSelectHandle from "../icons/selection/duplicatebottom.svg?raw";

import moveCursorIcon from "../icons/cursors/move.svg?raw";
import resizeCursorIcon from "../icons/cursors/resize.svg?raw";
import rotateCursorIcon from "../icons/cursors/rotate.svg?raw";

export class Selection {
  constructor(toolbar) {
    this.toolbar = toolbar;
    this.editor = toolbar.editor;
  }

  scrollOffset = 32;
  snapThreshold = 8;

  currentSelections = {};
  annotationRects = {};
  renderSnaps = [];
  checkDistanceXDirection = [];
  checkDistanceYDirection = [];
  currentSnapElements = {};

  async updateBox(options = {}) {
    let removeSelections = [];
    let checkSelections = Object.keys(this.currentSelections);
    for (let i = 0; i < checkSelections.length; i++) {
      let annoID = checkSelections[i];
      let selection = this.currentSelections[annoID];
      let annoData = this.editor.annotations[annoID] ?? {};
      if (annoData.pointer != null) {
        delete this.currentSelections[annoID];
        annoID = annoData.pointer;
        annoData = this.editor.annotations[annoID];
        this.currentSelections[annoID] = selection;
      }
      let render = annoData.render;
      if (this.editor.selecting[annoID] != null && render != null && render.remove != true) {
        continue; // Is valid selection box
      }
      delete this.currentSelections[annoID];
      if (annoData.component != null) {
        let annotation = annoData.component.getElement();
        if (annotation != null) {
          annotation.removeAttribute("selected");
          annoData.component.setAnimate(true);
          //annotation.style.removeProperty("overflow");
          annotation.style.removeProperty("border-radius");
          if (annoData.component.quill != null && annoData.component.quill.isEnabled() == true) {
            annoData.component.quill.disable();
            if (annoData.component.REMOVE_IF_NO_TEXT == true && annoData.component.quill.getText().trim().length < 1 && annoData.component.quill.getContents().ops.length < 2) {
              await this.editor.history.push("add", [render]);
              await this.editor.save.push({ _id: annoID, remove: true });
              this.editor.realtimeSelect[annoID] = { ...this.editor.realtimeSelect[annoID], _id: annoID, remove: true };
              await this.editor.realtime.forceShort();
            }
          }
        }
        if (annoData.component.SELECTION_END != null) {
          await annoData.component.SELECTION_END();
        }
      }
      if (selection != null) {
        selection.style.opacity = 0;
        if (selection.hasAttribute("remove") == false) {
          selection.setAttribute("remove", "");
          removeSelections.push(selection);
        }
      }
    }
    if (removeSelections.length > 0) {
      (async function () {
        await sleep(150);
        for (let i = 0; i < removeSelections.length; i++) {
          let selection = removeSelections[i];
          if (selection != null) {
            selection.remove();
          }
        }
      })();
    }

    options.hideSelectBox = options.hideSelectBox ?? this.hideSelectBox;

    let setMinX = null;
    let setMaxX = null;
    let setMinY = null;
    let setMaxY = null;
    let setCheckX = null;
    let setCheckY = null;
    let setResizePreserveAspect = false;
    let setMultiSelectPreserveAspect = false;

    let setSnapping = false;
    let setShowHandles = true;
    let setShowDuplicateHandles = true;
    let setShowOnlyWidthHandles = true;
    let setShowRotationHandle = false;

    let selectedAnnotations = [];
    let selectionChange = false;

    let annotationRect = this.editor.utils.annotationsRect();
    let scrollLeft = this.editor.contentHolder.scrollLeft;
    let scrollTop = this.editor.contentHolder.scrollTop;

    let selections = Object.keys(this.editor.selecting);
    if (this.toolbar.currentToolModule != null) {
      let setUserSelect = this.toolbar.currentToolModule.USER_SELECT;
      let setTouchAction = this.toolbar.currentToolModule.TOUCH_ACTION;
      if (selections.length > 0) {
        setUserSelect = "none";
        setTouchAction = "none";
        if (this.originalUserSelect === null) {
          this.originalUserSelect = this.toolbar.currentToolModule.USER_SELECT;
        }
        if (this.originalTouchAction === null) {
          this.originalTouchAction = this.toolbar.currentToolModule.TOUCH_ACTION;
        }
        this.replaceCursorActive = true;
      } else if (this.replaceCursorActive == true) {
        this.replaceCursorActive = false;
        setUserSelect = this.originalUserSelect;
        this.originalUserSelect = null;
        setTouchAction = this.originalTouchAction;
        this.originalTouchAction = null;
      }
      let propertyChange = false;
      if (setUserSelect != this.toolbar.currentToolModule.USER_SELECT) {
        this.toolbar.currentToolModule.USER_SELECT = setUserSelect;
        propertyChange = true;
      }
      if (setTouchAction != this.toolbar.currentToolModule.TOUCH_ACTION) {
        this.toolbar.currentToolModule.TOUCH_ACTION = setTouchAction;
        propertyChange = true;
      }
      if (propertyChange == true) {
        this.toolbar.applyToolModule();
      }
    }
    for (let i = 0; i < selections.length; i++) {
      let annoID = selections[i];
      let annoData = this.editor.annotations[annoID] ?? {};
      if (annoData.pointer != null) {
        annoID = annoData.pointer;
        annoData = this.editor.annotations[annoID];
      }
      if (annoData.render == null) {
        delete this.editor.selecting[annoID];
        continue;
      }
      let merged = { ...annoData.render, ...this.editor.selecting[annoID] };
      if (merged.remove == true) {
        delete this.editor.selecting[annoID];
        continue;
      }
      
      let rect = this.editor.utils.getRect(merged);
      
      if (rect.selectingParent == true) {
        delete this.editor.selecting[annoID];
        return this.updateBox(options);
      }

      if (
        this.editor.utils.canMemberModify(merged) != true
        || this.editor.utils.isLocked(merged) == true
        || this.editor.utils.isPlaceholderLocked(merged) == true
      ) {
        setShowHandles = false;
      }

      let annoModule = (await this.editor.render.getModule(annoData, merged.f)) ?? {};
      if (annoModule.CAN_BE_MULTISELECT == false && selections.length > 1) {
        delete this.editor.selecting[annoID];
        break;
      }
      if (annoModule.DISABLE_SNAPPING != true) {
        setSnapping = true;
      }
      if (annoModule.SHOW_DUPLICATE_HANDLES != true) {
        setShowDuplicateHandles = false;
      }
      if (annoModule.SHOW_ONLY_WIDTH_HANDLES != true) {
        setShowOnlyWidthHandles = false;
      }
      if (annoModule.CAN_ROTATE != false) {
        setShowRotationHandle = true;
      }
      if (annoModule.RESIZE_PRESERVE_ASPECT == true) {
        setResizePreserveAspect = true;
      }
      if (annoModule.SELECTION_FUNCTION != null) {
        let update = annoModule.SELECTION_FUNCTION(this, merged) ?? {};
        setResizePreserveAspect = update.resizePreserveAspect ?? setResizePreserveAspect;
        setMultiSelectPreserveAspect = update.multiSelectPreserveAspect ?? setMultiSelectPreserveAspect;
        setSnapping = update.snapping ?? setSnapping;
        setShowHandles = update.showHandles ?? setShowHandles;
        setShowDuplicateHandles = update.showDuplicateHandles ?? setShowDuplicateHandles;
        setShowOnlyWidthHandles = update.showOnlyWidthHandles ?? setShowOnlyWidthHandles;
        setShowRotationHandle = update.showRotationHandle ?? setShowRotationHandle;
      }
      
      let annotation;
      if (annoData.component != null) {
        annotation = annoData.component.getElement();
      }
      if (annotation == null) {
        await this.editor.render.create(annoData);
        annotation = annoData.component.getElement();
      }
      if (annotation != null) {
        annotation.setAttribute("selected", "");
        annotation.style.borderRadius = (4 / this.editor.zoom) + "px";

        if (annoData.component.quill != null && selections.length > 1 && annoData.component.quill.isEnabled() == true) {
          annoData.component.quill.disable();
        }
        /*if (annoModule.ALLOW_SELECT_OVERFLOW != true) {
          annotation.style.overflow = "hidden";
        }*/
      }

      let select = this.currentSelections[annoID];
      let collabSelect = this.editor.realtimeHolder.querySelector('.eCollabSelect[anno="' + annoID + '"]');
      
      let transition = this.action == null && options.transition != false;
      
      if (annoModule.DISPLAY_SELECT_BOX != false) {
        if (selections.length > 1 || options.hideSelectBox == true) {
          if (select == null) {
            this.editor.content.insertAdjacentHTML("beforeend", `<div class="eSelect" new></div>`);
            select = this.editor.content.querySelector(".eSelect[new]");
            select.removeAttribute("new");
            select.style.border = "solid 4px var(--secondary)";
            select.style.opacity = 1;
            transition = false;
          }
          if (rect.rotation != 0) {
            setMultiSelectPreserveAspect = true;
          }
        } else if (select != null) {
          select.remove();
          select = null;
        }
      } else {
        options.hideSelectBox = true;
      }
      if (this.currentSelections.hasOwnProperty(annoID) == false) {
        selectionChange = true;
        if (annoModule.SELECTION_START != null) {
          await annoModule.SELECTION_START();
        }
      }
      this.currentSelections[annoID] = select;
      selectedAnnotations.push(annoID);

      if (transition == false) {
        if (select != null) {
          select.setAttribute("notransition", "");
        }
        if (annoData.component != null) {
          annoData.component.setAnimate(false);
        }
        if (collabSelect != null) {
          collabSelect.setAttribute("notransition", "");
        }
      } else {
        if (select != null) {
          select.removeAttribute("notransition");
        }
        if (annoData.component != null) {
          annoData.component.setAnimate(true);
        }
        if (collabSelect != null) {
          collabSelect.removeAttribute("notransition");
        }
      }

      this.lastRect = rect;
      this.lastElementWidth = rect.width;
      this.lastElementHeight = rect.height;
      this.lastElementX = annotationRect.left + (rect.x * this.editor.zoom) + scrollLeft - 2;
      this.lastElementY = annotationRect.top + (rect.y * this.editor.zoom) + scrollTop - 2;
      this.lastElementRotate = rect.rotation;

      if (select != null) {
        select.style.width = ((this.lastElementWidth * this.editor.zoom) - 4) + "px";
        select.style.height = ((this.lastElementHeight * this.editor.zoom) - 4) + "px";
        select.style.transform = "translate(" + this.lastElementX + "px," + this.lastElementY + "px) rotate(" + this.lastElementRotate + "deg)";
      }

      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);

      setMinX = Math.min(setMinX ?? topLeftX, topLeftX);
      setMinY = Math.min(setMinY ?? topLeftY, topLeftY);
      setMaxX = Math.max(setMaxX ?? bottomRightX, bottomRightX);
      setMaxY = Math.max(setMaxY ?? bottomRightY, bottomRightY);

      setCheckX = (setCheckX ?? 0) + rect.centerX;
      setCheckY = (setCheckY ?? 0) + rect.centerY;

      if (transition == false && select != null) {
        select.offsetHeight;
        select.removeAttribute("notransition");
      }

      if (collabSelect != null) {
        let rotate = rect.rotation;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        collabSelect.style.width = ((rect.width * this.editor.zoom) - 3) + "px";
        collabSelect.style.height = ((rect.height * this.editor.zoom) - 3) + "px";
        collabSelect.style.transform = "translate(" + (annotationRect.left + (rect.x * this.editor.zoom) + scrollLeft - 1.5) + "px," + (annotationRect.top + (rect.y * this.editor.zoom) + scrollTop - 1.5) + "px) rotate(" + rotate + "deg)";
      }
    }

    this.minX = setMinX;
    this.maxX = setMaxX;
    this.minY = setMinY;
    this.maxY = setMaxY;
    this.checkX = setCheckX;
    this.checkY = setCheckY;
    this.resizePreserveAspect = setResizePreserveAspect;
    this.multiSelectPreserveAspect = setMultiSelectPreserveAspect;

    this.snapping = setSnapping;
    this.showHandles = setShowHandles;
    this.showDuplicateHandles = setShowDuplicateHandles;
    this.showOnlyWidthHandles = setShowOnlyWidthHandles;
    this.showRotationHandle = setShowRotationHandle;

    let showSelectBox = selectedAnnotations.length > 0 && options.hideSelectBox != true;
    let refreshSelectBox = this.lastSelectAmount == selectedAnnotations.length && selectionChange == true;
    if (showSelectBox == false || refreshSelectBox == true) {
      let remSelect = this.selectBox;
      if (remSelect != null) {
        this.selectBox = null;
        this.lastSelectAmount = 0;
        remSelect.style.opacity = 0;
        (async function () {
          await sleep(150);
          if (remSelect != null) {
            remSelect.remove();
          }
        })();
      }
    }
    if (showSelectBox == true) {
      let transition = this.action == null && options.transition != false && this.lastSelectAmount == selectedAnnotations.length;
      if (this.selectBox == null) {
        this.editor.content.insertAdjacentHTML("beforeend", `<div class="eSelect" new>
          <div class="eSelectHandle" handle="movetop" move></div>
          <div class="eSelectHandle" handle="movebottom" move></div>
          <div class="eSelectHandle" handle="moveleft" move></div>
          <div class="eSelectHandle" handle="moveright" move></div>
          ${topLeftSelectHandle}
          ${topRightSelectHandle}
          ${bottomLeftSelectHandle}
          ${bottomRightSelectHandle}
          ${leftSelectHandle}
          ${rightSelectHandle}
          ${topSelectHandle}
          ${bottomSelectHandle}
          ${rotateSelectHandle}
          ${duplicateLeftSelectHandle}
          ${duplicateRightSelectHandle}
          ${duplicateTopSelectHandle}
          ${duplicateBottomSelectHandle}
        </div>`);
        this.selectBox = this.editor.content.querySelector(".eSelect[new]");
        this.selectBox.removeAttribute("new");
        this.selectBox.style.zIndex = 102;
        this.selectBox.style.border = "solid 4px var(--theme)";
        this.selectBox.style.opacity = 1;
        transition = false;
      }
      if (transition == false) {
        this.selectBox.setAttribute("notransition", "");
      } else {
        this.selectBox.removeAttribute("notransition");
      }
      this.lastSelectAmount = selectedAnnotations.length;

      let boxWidth = 0;
      let boxHeight = 0;
      let boxX = 0;
      let boxY = 0;
      if (selectedAnnotations.length < 2) {
        boxWidth = ((this.lastElementWidth * this.editor.zoom) - 4);
        boxHeight = ((this.lastElementHeight * this.editor.zoom) - 4);
        boxX = this.lastElementX;
        boxY = this.lastElementY;
        this.rotation = this.lastElementRotate;
        if (this.rotation > 180) {
          this.rotation = -(360 - this.rotation);
        }
      } else {
        boxWidth = ((this.maxX - this.minX) * this.editor.zoom) - 4;
        boxHeight = ((this.maxY - this.minY) * this.editor.zoom) - 4;
        boxX = annotationRect.left + (this.minX * this.editor.zoom) + scrollLeft - 2;
        boxY = annotationRect.top + (this.minY * this.editor.zoom) + scrollTop - 2;
        this.rotation = 0;
      }
      this.selectBox.style.width = boxWidth + "px";
      this.selectBox.style.height = boxHeight + "px";
      this.selectBox.style.transform = "translate(" + boxX + "px," + boxY + "px) rotate(" + this.rotation + "deg)";
      
      if (this.showHandles == true) {
        this.selectBox.removeAttribute("hidehandles");

        if (this.showDuplicateHandles != true) {
          this.handlePadding = 24;
          this.selectBox.removeAttribute("showduplicate");
        } else {
          this.handlePadding = 60;
          this.selectBox.setAttribute("showduplicate", "");
        }
        if (this.showOnlyWidthHandles != true) {
          this.selectBox.removeAttribute("showonlywidth");
        } else {
          this.selectBox.setAttribute("showonlywidth", "");
        }
        if (this.showRotationHandle == true) {
          this.selectBox.removeAttribute("hiderotation");
        } else {
          this.selectBox.setAttribute("hiderotation", "");
        }
      } else {
        this.handlePadding = 24;
        this.selectBox.setAttribute("hidehandles", "");
        this.selectBox.removeAttribute("showduplicate");
        this.selectBox.removeAttribute("showonlywidth");
        this.selectBox.removeAttribute("hiderotation");
      }
      if (boxWidth > 52) {
        this.selectBox.removeAttribute("hideheighthandles");
      } else {
        this.selectBox.setAttribute("hideheighthandles", "");
      }
      if (boxHeight > 52) {
        this.selectBox.removeAttribute("hidewidthhandles");
      } else {
        this.selectBox.setAttribute("hidewidthhandles", "");
      }
      if (boxWidth > 20 && boxHeight > 20) {
        this.selectBox.removeAttribute("hidenonessential");
      } else {
        this.selectBox.setAttribute("hidenonessential", "");
      }

      if (transition == false) {
        this.selectBox.offsetHeight;
        this.selectBox.removeAttribute("notransition");
      }
    }

    if (options.redrawActionBar != false) {
      await this.updateActionBar({ ...options, redrawActionBar: selectionChange || options.redraw == true || options.redrawActionBar == true });
    }

    await this.editor.refreshRealtimeSelections(
      (rect) => { return options.transition != false && (this.action == null || rect.selectingParent != true) },
      { annotationRect, scrollLeft, scrollTop }
    );

    if (options.transition == false) {
      this.updateSnapLines();
    }
  }

  async updateActionBar(options = {}) {
    let removeActionBar = (options.reuseActionBar ?? (this.currentActionModule ?? {}).forceCurrentActionBar) != true;
    let showSelectBox = (
      this.selectBox != null
      && (this.action == null || this.actionEnabled == false)
      && options.hideSelectBox != true
      && this.saving != true
    );
    if (showSelectBox == true && removeActionBar == true) {
      removeActionBar = (
        this.checkX == null || this.checkY == null ||
        Math.floor(this.checkX) != Math.floor(this.lastCheckX) ||
        Math.floor(this.checkY) != Math.floor(this.lastCheckY) ||
        options.redrawActionBar == true
      );
    }
    this.lastCheckX = this.checkX;
    this.lastCheckY = this.checkY;
    if (removeActionBar == true && this.actionBar != null) {
      this.actionFrame = null;
      this.actionFrameButton = null;
      this.currentActionModule = null;
      let removeActionBar = this.actionBar;
      this.actionBar = null;
      (async () => {
        if (removeActionBar == null) {
          return;
        }
        removeActionBar.setAttribute("remove", "");
        removeActionBar.style.transform = "translate(-50%, -10%)";
        removeActionBar.style.opacity = 0;
        await sleep(200);
        if (removeActionBar != null) {
          removeActionBar.remove();
        }
      })();
    }
    if (showSelectBox == false) {
      return;
    }
    
    let newActionBar = false;
    if (this.actionBar == null) { // Create UI
      this.editor.content.insertAdjacentHTML("beforeend", `<div class="eActionBar" top new>
        <div class="eActionToolbar eHorizontalToolsHolder" keeptooltip></div>
      </div>`);
      this.actionBar = this.editor.content.querySelector(".eActionBar[new]");
      this.actionBar.removeAttribute("new");
      newActionBar = true;
    }

    if (newActionBar == true || options.refreshActionBar == true) {
      let actionButtonHolder = this.actionBar.querySelector(".eActionToolbar");
      let actionToolbarLoaded = actionButtonHolder.hasAttribute("loaded");
      let combineTools;
      let showLocked = false;
      let selections = Object.keys(this.editor.selecting);
      for (let i = 0; i < selections.length; i++) {
        let annotation = this.editor.annotations[selections[i]] ?? {};
        let render = annotation.render;
        if (render == null) {
          continue;
        }
        if (showLocked == false) {
          showLocked = (this.editor.utils.canMemberModify(render) == false || this.editor.utils.isLocked(render) == true);
        }

        if (actionToolbarLoaded == false) {
          let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
          if (annoModule.ACTION_BAR_TOOLS == null) {
            continue;
          }
          if (combineTools == null) {
            combineTools = copyObject(annoModule.ACTION_BAR_TOOLS);
          }
          for (let c = 0; c < combineTools.length; c++) {
            if (annoModule.ACTION_BAR_TOOLS.includes(combineTools[c]) == false) {
              combineTools.splice(c, 1);
              c--;
            }
          }
        }
      }

      if (selections.length > 0) {
        if (actionToolbarLoaded == false) {
          actionButtonHolder.setAttribute("loaded", "");
          combineTools = combineTools ?? [];
          combineTools.unshift("collaborator");
          combineTools.push("more");
          
          actionButtonHolder.innerHTML = "";
          for (let i = 0; i < combineTools.length; i++) {
            let action = combineTools[i];
            let actionModule = await this.toolbar.loadModule(action);
            if (actionModule == null) {
              continue;
            }
            if (actionModule.ADD_TOOLBAR_TOOLS != null) {
              for (let a = 0; a < actionModule.ADD_TOOLBAR_TOOLS.length; a++) {
                let addAction = actionModule.ADD_TOOLBAR_TOOLS[a];
                if (combineTools.includes(addAction) == false) {
                  combineTools.splice(i + a + 1, 0, addAction);
                }
              }
            }
            actionButtonHolder.insertAdjacentHTML("beforeend", `<button class="eTool" new><div></div></button>`);
            let newAction = actionButtonHolder.querySelector("[new]");
            newAction.removeAttribute("new");
            newAction.setAttribute("action", action);
            newAction.setAttribute("module", action);
          }

          this.actionBarButtonCount = 0;
        }
        
        let currentButtonCount = 0;
        for (let i = 0; i < actionButtonHolder.children.length; i++) {
          let newAction = actionButtonHolder.children[i];
          if (newAction == null) {
            continue;
          }
          let toolModule = newAction.getAttribute("module");
          if (toolModule == null) {
            continue;
          }
          let actionModule = (await this.toolbar.loadModule(toolModule)) ?? {};
          if (this.actionBar == null) {
            return;
          }
          actionModule.editor = this.editor;
          actionModule.toolbar = this.toolbar;
          actionModule.isActionBar = true;
          actionModule.button = newAction;
          let isVisible;
          if (actionModule.SUPPORTS_MULTIPLE_SELECT == false && selections.length > 1) {
            isVisible = false;
          }
          //(async () => {
          if (actionModule.KEEP_BUTTON_PREVIEW != true) {
            newAction.innerHTML = "<div></div>";
          }
          let buttonHolder = newAction.querySelector("div");
          newAction.removeAttribute("selecthighlight");
          if (actionModule.setActionButton != null) {
            let result = await actionModule.setActionButton(buttonHolder);
            isVisible = isVisible ?? result;
          }
          if (newAction == null) {
            return;
          }
          if (actionModule.SHOW_ON_LOCK != true && showLocked == true) {
            isVisible = false;
          }
          if (actionModule.TOOLTIP != null) {
            newAction.setAttribute("tooltip", actionModule.TOOLTIP);
          }
          if (actionModule.FULL_CLICK != true) {
            newAction.removeAttribute("fullclick");
          } else {
            newAction.setAttribute("fullclick", "");
          }
          if (actionModule.ATTRIBUTES != null) {
            let attributes = Object.keys(actionModule.ATTRIBUTES);
            for (let a = 0; a < attributes.length; a++) {
              let setAttribute = attributes[a];
              newAction.setAttribute(setAttribute, actionModule.ATTRIBUTES[setAttribute]);
            }
          }
          if (isVisible != false) {
            currentButtonCount++;
            newAction.removeAttribute("hidden");
          } else {
            newAction.setAttribute("hidden", "");
          }
          let elementBefore = newAction.previousElementSibling;
          /*let elementBeforeCheck = newAction;
          while (elementBeforeCheck.previousElementSibling != null) {
            elementBeforeCheck = elementBeforeCheck.previousElementSibling;
            if (elementBeforeCheck.hasAttribute("hidden") == false) {
              elementBefore = elementBeforeCheck;
              break;
            }
          }*/
          let elementAfter = newAction.nextElementSibling;
          /*let elementAfterCheck = newAction;
          while (elementAfterCheck.nextElementSibling != null) {
            elementAfterCheck = elementAfterCheck.nextElementSibling;
            if (elementAfterCheck.hasAttribute("hidden") == false) {
              elementAfter = elementAfterCheck;
              break;
            }
          }*/
          if (actionModule.ADD_DIVIDE_BEFORE == true) {
            if (elementBefore != null) {
              if (elementBefore.className != "eVerticalDivider") {
                let newDivider = document.createElement("div");
                newDivider.className = "eVerticalDivider";
                newDivider.setAttribute("before", "");
                actionButtonHolder.insertBefore(newDivider, newAction);
                elementBefore = newDivider;
                i++;
              }
              if (elementBefore.className == "eVerticalDivider" && elementBefore.hasAttribute("before") == true) {
                if (isVisible != false) {
                  elementBefore.removeAttribute("hidden");
                } else {
                  elementBefore.setAttribute("hidden", "");
                }
              }
            }
          }
          if (actionModule.ADD_DIVIDE_AFTER == true) {
            if (elementAfter == null || elementAfter.className != "eVerticalDivider") {
              let newDivider = document.createElement("div");
              newDivider.className = "eVerticalDivider";
              newDivider.setAttribute("after", "");
              actionButtonHolder.insertBefore(newDivider, elementAfter);
              elementAfter = newDivider;
            }
            if (elementAfter.className == "eVerticalDivider" && elementAfter.hasAttribute("after") == true) {
              if (isVisible != false) {
                elementAfter.removeAttribute("hidden");
              } else {
                elementAfter.setAttribute("hidden", "");
              }
            }
          }
          //})();
        }
        let actionButtonCount = 0;
        for (let i = 0; i < actionButtonHolder.children.length; i++) {
          let divider = actionButtonHolder.children[i];
          if (divider == null) {
            continue;
          }
          if (divider.className != "eVerticalDivider") {
            if (divider.hasAttribute("hidden") == false) {
              actionButtonCount++;
            }
            continue;
          }
          if (divider.hasAttribute("before") && actionButtonCount < 1) {
            divider.setAttribute("hidden", "");
          } else if (divider.hasAttribute("hidden") == false) {
            actionButtonCount = 0;
          }
        }

        if (currentButtonCount != this.actionBarButtonCount) {
          newActionBar = true;
        }
        this.actionBarButtonCount = currentButtonCount;
      }
    }

    if (this.actionBar == null) {
      return;
    }

    // Update Action Bar UI
    if (options.skipUpdate != true || newActionBar == true) {
      let contentHolderWidth = this.editor.contentHolder.clientWidth;
      let contentHolderHeight = this.editor.contentHolder.clientHeight;
      let actionBarWidth = Math.min(this.actionBar.offsetWidth, contentHolderWidth - this.editor.scrollOffset - 8) / 2;
      let actionBarHeight = this.actionBar.offsetHeight;
      let annotationRect = this.editor.utils.annotationsRect();
      let pxCenter = annotationRect.left + ((this.minX + ((this.maxX - this.minX) / 2)) * this.editor.zoom);
      if (this.toolbar.toolbarHolder.hasAttribute("right") == false) {
        if (pxCenter + actionBarWidth + 8 > contentHolderWidth) {
          pxCenter -= (pxCenter + actionBarWidth + 8) - contentHolderWidth;
        }
        pxCenter = Math.max(pxCenter, this.editor.scrollOffset + actionBarWidth);
      } else {
        if (pxCenter + actionBarWidth + this.editor.scrollOffset > contentHolderWidth) {
          pxCenter -= (pxCenter + actionBarWidth + this.editor.scrollOffset) - contentHolderWidth;
        }
        pxCenter = Math.max(pxCenter, actionBarWidth + 8);
      }
      let yPos = this.editor.scrollOffset;
      if ((account.settings ?? {}).actionbar != "top") {
        yPos = annotationRect.top + (this.minY * this.editor.zoom) - actionBarHeight - this.handlePadding;
      }
      let isBottom = false;
      if (yPos < this.editor.scrollOffset) {
        let modifiedY = annotationRect.top + (this.maxY * this.editor.zoom) + this.handlePadding;
        if (modifiedY + actionBarHeight + this.editor.scrollOffset > contentHolderHeight) {
          yPos = this.editor.scrollOffset;
        } else {
          yPos = modifiedY;
          isBottom = true;
        }
      }
      let maxActionBarWidth = this.editor.contentHolder.clientWidth - this.editor.scrollOffset - 8;
      this.actionBar.style.maxWidth = maxActionBarWidth + "px";
      this.actionBar.style.left = (pxCenter + this.editor.contentHolder.scrollLeft) + "px";
      this.actionBar.style.top = (yPos + this.editor.contentHolder.scrollTop) + "px";

      if (isBottom == false) { // Is at top
        if (yPos - 32 < this.editor.scrollOffset) {
          this.actionBar.setAttribute("tooltipbottom", "");
        } else {
          this.actionBar.removeAttribute("tooltipbottom");
        }
      } else { // Is at bottom
        if (this.editor.contentHolder.clientHeight - yPos - this.actionBar.offsetHeight - 32 < this.editor.scrollOffset) {
          this.actionBar.removeAttribute("tooltipbottom");
        } else {
          this.actionBar.setAttribute("tooltipbottom", "");
        }
      }

      if (this.actionFrame != null) {
        let actionContent = this.actionFrame.querySelector(".eActionContainerContent");
        let actionContainer = this.actionFrame.querySelector(".eActionContainer");
        let alignTop;
        if (isBottom == false) {
          alignTop = true;
          if (yPos - actionContent.offsetHeight - 4 < this.editor.scrollOffset) {
            alignTop = false;
          }
        } else {
          alignTop = false;
          if (this.editor.page.offsetHeight - yPos - this.actionFrame.offsetHeight - actionContent.offsetHeight - 4 < this.editor.scrollOffset) {
            alignTop = true;
          }
        }

        let frameLeft = 0;
        if (this.actionFrameButton != null) {
          this.actionFrame.querySelector(".eActionContainerScroll").style.maxWidth = maxActionBarWidth + "px";

          frameLeft = (this.actionFrameButton.getBoundingClientRect().left - this.actionBar.getBoundingClientRect().left) + (this.actionFrameButton.offsetWidth / 2) - (actionContent.offsetWidth / 2);
          if (frameLeft + actionContent.offsetWidth > this.actionBar.offsetWidth) {
            frameLeft = this.actionBar.offsetWidth - actionContent.offsetWidth;
          }
          if (frameLeft < 0) {
            frameLeft = 0;
          }
          if (actionContent.offsetWidth > this.actionBar.offsetWidth) {
            frameLeft = (this.actionBar.offsetWidth - actionContent.offsetWidth) / 2;
          }
          this.actionFrame.style.left = (frameLeft - 12) + "px";
          actionContainer.style.width = actionContent.offsetWidth + "px";
          actionContainer.style.height = actionContent.offsetHeight + "px";
        }

        if (alignTop == true) {
          this.actionBar.setAttribute("top", "");
          this.actionBar.removeAttribute("bottom");
          this.actionFrame.setAttribute("top", "");
          this.actionFrame.removeAttribute("bottom");

          if (frameLeft < 16) {
            this.actionBar.style.borderTopLeftRadius = "0px";
          } else {
            this.actionBar.style.removeProperty("border-top-left-radius");
          }
          if (frameLeft + actionContent.offsetWidth > this.actionBar.offsetWidth - 16) {
            this.actionBar.style.borderTopRightRadius = "0px";
          } else {
            this.actionBar.style.removeProperty("border-top-right-radius");
          }
          this.actionBar.style.removeProperty("border-bottom-left-radius");
          this.actionBar.style.removeProperty("border-bottom-right-radius");
        } else {
          this.actionBar.setAttribute("bottom", "");
          this.actionBar.removeAttribute("top");
          this.actionFrame.setAttribute("bottom", "");
          this.actionFrame.removeAttribute("top");

          if (frameLeft < 16) {
            this.actionBar.style.borderBottomLeftRadius = "0px";
          } else {
            this.actionBar.style.removeProperty("border-bottom-left-radius");
          }
          if (frameLeft + actionContent.offsetWidth > this.actionBar.offsetWidth - 16) {
            this.actionBar.style.borderBottomRightRadius = "0px";
          } else {
            this.actionBar.style.removeProperty("border-bottom-right-radius");
          }
          this.actionBar.style.removeProperty("border-top-left-radius");
          this.actionBar.style.removeProperty("border-top-right-radius");
        }
      }

      if (options.redrawCurrentAction == true && this.currentActionModule != null && this.currentActionModule.redraw != null) {
        this.currentActionModule.redraw();
      }
    }

    if (newActionBar == true) {
      this.actionBar.style.transform = "translate(-50%, 0%)";
      this.actionBar.style.opacity = 1;
    }
  }
  async clickAction(event, options = {}) {
    if (event == null || event.target == null || event.target.hasAttribute("hidden") == true) {
      return;
    }
    if (event.touches != null) {
      return;
    } else if (options.clickEvent == true && this.clickActionTriggered == true) {
      this.clickActionTriggered = false;
      return;
    }
    if (options.clickStart == true) {
      this.clickActionTriggered = true;
    }

    let actionButton = event.target.closest(".eTool");
    if (actionButton == null || actionButton.closest(".eActionToolbar") == null) {
      return;
    }

    await this.showActionFrame();
    let fullClick = actionButton.hasAttribute("fullclick") == true || options.clickEvent == true;

    if (fullClick != true) {
      if (options.clickStart != true) {
        return;
      }
    } else {
      if (options.clickStart == true) {
        this.fullClickActionFrameButton = actionButton;
        return;
      }
      if (event.type != null && this.fullClickActionFrameButton != actionButton && event.pointerType != "") {
        return;
      }
    }

    let wasSelected = actionButton.hasAttribute("selected");
    this.closeActionFrame();
    if (wasSelected == true) {
      return;
    }
    this.actionFrameButton = actionButton;
    
    let newActionModule = (await this.toolbar.loadModule(actionButton.getAttribute("module"))) ?? {};
    newActionModule.editor = this.editor;
    newActionModule.toolbar = this.toolbar;
    newActionModule.isActionBar = true;
    newActionModule.button = actionButton;

    let contentFrame;
    if (newActionModule.html != null) {
      actionButton.setAttribute("selected", "");
      actionButton.setAttribute("extend", "");

      if (this.actionBar == null) {
        return;
      }
      this.actionBar.insertAdjacentHTML("beforeend", `<div class="eActionHolder" top new>
        <div class="eActionContainer">
          <div class="eActionShadow"></div>
            <div class="eActionContainerHolder">
              <div class="eActionContainerScroll">
                <div class="eActionContainerContent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
      this.actionFrame = this.actionBar.querySelector(".eActionHolder[new]");
      this.actionFrame.removeAttribute("new");
      contentFrame = this.actionFrame.querySelector(".eActionContainerContent");
      contentFrame.innerHTML = newActionModule.html;

      this.actionFrame.querySelector(".eActionContainerScroll").style.maxWidth = (this.editor.contentHolder.clientWidth - this.editor.scrollOffset) + "px";
    }
    if (newActionModule.js != null) {
      await newActionModule.js(contentFrame, event);
    }
    this.currentActionModule = newActionModule;

    if (fullClick == true) {
      await this.showActionFrame();
    }
  }
  async showActionFrame() {
    if (this.actionFrame == null) {
      return;
    }

    await this.updateActionBar();
    this.toolbar.tooltip.update();
    
    let containerFrame = this.actionFrame.querySelector(".eActionContainer");
    if (this.actionFrame.hasAttribute("top") == true) {
      containerFrame.style.transform = "translateY(100%)";
    } else {
      containerFrame.style.transform = "translateY(-100%)";
    }
    containerFrame.offsetHeight;
    containerFrame.style.transition = "width .25s, height .25s, opacity .25s, transform .25s";
    containerFrame.style.transform = "translateY(0%)";
    containerFrame.style.opacity = 1;
  }
  closeActionFrame() {
    if (this.actionFrameButton != null) {
      this.actionFrameButton.removeAttribute("extend");
      this.actionFrameButton.removeAttribute("selected");
    }
    this.actionFrameButton = null;
    this.currentActionModule = null;
    this.fullClickActionModule = null;
    if (this.actionFrame == null) {
      return;
    }
    let removeFrame = this.actionFrame;
    this.actionFrame = null;
    this.updateActionBar();
    (async () => {
      removeFrame.style.zIndex = 1;
      let contentContainer = removeFrame.querySelector(".eActionContainer");
      if (removeFrame.hasAttribute("top") == true) {
        contentContainer.style.transform = "translateY(100%)";
      } else {
        contentContainer.style.transform = "translateY(-100%)";
      }
      if (this.actionBar != null) {
        this.actionBar.style.removeProperty("border-top-left-radius");
        this.actionBar.style.removeProperty("border-top-right-radius");
        this.actionBar.style.removeProperty("border-bottom-left-radius");
        this.actionBar.style.removeProperty("border-bottom-right-radius");
      }
      contentContainer.style.opacity = 0;
      await sleep(300);
      if (removeFrame != null) {
        removeFrame.remove();
      }
    })();
  }
  async startAction(event) {
    if (Object.keys(this.currentSelections).length < 1 || this.hideSelectBox == true) { //this.selectBox == null
      return;
    }
    if (this.editor.self.access < this.editor.minimumEditingAccess) {
      return;
    }
    if (this.showHandles == false) {
      return;
    }

    this.actionEnabled = false;
    this.annotationRects = {};
    this.handle = null;
    let handleElement = event.target.closest(".eSelectHandle");
    if (handleElement != null) {
      if (handleElement.hasAttribute("move") == false) {
        this.handle = handleElement.getAttribute("handle");
      }
    }

    let { mouseX, mouseY } = this.editor.utils.localMousePosition(event);
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    this.enableStartX = mouseX;
    this.enableStartY = mouseY;

    if (this.handle == null) { // Move
      this.action = "move";
      this.rootX = position.x;
      this.rootY = position.y;
    } else if (handleElement.hasAttribute("duplicate") == false) { // Resize OR Rotate
      let boundingBoxWidth = this.maxX - this.minX;
      let boundingBoxHeight = this.maxY - this.minY;
      let transformRotateWidth = this.minX + (boundingBoxWidth / 2);
      let transformRotateHeight = this.minY + (boundingBoxHeight / 2);

      let radian = this.rotation * (Math.PI / 180);

      let originalWidth = boundingBoxWidth;
      let originalHeight = boundingBoxHeight;
      if (this.rotation != 0) {
        originalWidth = this.lastElementWidth;
        originalHeight = this.lastElementHeight;
      }

      // Calculate the rotated bounding box dimensions using the original bounding box dimensions
      let rotatedWidth = Math.abs(boundingBoxWidth * Math.cos(radian)) + Math.abs(boundingBoxHeight * Math.sin(radian));
      let rotatedHeight = Math.abs(boundingBoxHeight * Math.cos(radian)) + Math.abs(boundingBoxWidth * Math.sin(radian));

      // Calculate the offset to the new top-left corner of the rotated bounding box:
      let offsetX = (rotatedWidth - originalWidth) / 2;
      let offsetY = (rotatedHeight - originalHeight) / 2;

      // Calculate the new top-left corner of the rotated bounding box:
      let rotatedTopLeftX = transformRotateWidth - (rotatedWidth / 2) + offsetX;
      let rotatedTopLeftY = transformRotateHeight - (rotatedHeight / 2) + offsetY;

      this.originalPosition = [rotatedTopLeftX, rotatedTopLeftY];
      this.originalSize = [originalWidth, originalHeight];

      if (this.handle != "rotate") { // Resize
        this.action = "resize";

        let halfRotateWidth = this.originalPosition[0] + (this.originalSize[0] / 2);
        let halfRotateHeight = this.originalPosition[1] + (this.originalSize[1] / 2);
        let [xCoord, yCoord] = rotatePoint(position.x - halfRotateWidth, position.y - halfRotateHeight, -this.rotation);
        this.rootX = xCoord;
        this.rootY = yCoord;

        this.resizeCursorRotation = parseInt(handleElement.getAttribute("rotation") ?? "0");
        this.toolbar.updateMouse({ type: "svg", svg: resizeCursorIcon, translate: { x: 22, y: 22 }, rotate: this.rotation + this.resizeCursorRotation });
      } else { // Rotate
        this.action = "rotate";

        this.originalRotate = this.rotation;

        let centerX = this.originalSize[0] / 2;
        let centerY = this.originalSize[1] / 2;
        let yRoot = -(position.y - (this.originalPosition[1] + centerY));
        let xRoot = position.x - (this.originalPosition[0] + centerX);
        this.originalRotation = (Math.atan2(yRoot, xRoot) * 180) / Math.PI;
        if (this.originalRotation < 0) {
          this.originalRotation = 360 + this.originalRotation;
        }

        this.toolbar.updateMouse({ type: "svg", svg: rotateCursorIcon, translate: { x: 22, y: 22 }, rotate: this.rotation });
      }
    } else { // Duplicate
      let moreModule = (await this.toolbar.loadModule("more")) ?? {};
      if (moreModule.duplicate != null) {
        moreModule.editor = this.editor;
        moreModule.toolbar = this.toolbar;
        return await moreModule.duplicate(this.handle);
      }
    }
    event.preventDefault();
  }
  async updateSnapLines(render) {
    let annotationRect = this.editor.utils.annotationsRect();

    let validSnaps = {};
    let snapX = 0;
    let snapY = 0;
    for (let i = 0; i < this.renderSnaps.length; i++) {
      let snap = this.renderSnaps[i];
      if (snap == null) {
        continue;
      }
      let existingValid = validSnaps[snap.type];
      if (existingValid != null) {
        if (snap.marker != null) {
          if (Math.max(snap.width, snap.height) > Math.max(existingValid.width, existingValid.height)) {
            continue;
          }
        } else {
          snap.width = snap.width + existingValid.width - (Math.min(snap.x + snap.width, existingValid.x + existingValid.width) - Math.max(snap.x, existingValid.x));
          snap.height = snap.height + existingValid.height - (Math.min(snap.y + snap.height, existingValid.y + existingValid.height) - Math.max(snap.y, existingValid.y));
          snap.x = Math.min(snap.x, existingValid.x);
          snap.y = Math.min(snap.y, existingValid.y);
        }
      }

      if (snap.width > 0 && snap.height > 0) {
        if (snap.width > snap.height) {
          snap.height = 0;
        } else {
          snap.width = 0;
        }
      }

      validSnaps[snap.type] = snap;

      if (snap.additionalLines != null) {
        for (let a = 0; a < snap.additionalLines.length; a++) {
          let snapVisual = snap.additionalLines[a];
          validSnaps[snapVisual.type] = snapVisual;
        }
      }
    }
    if (validSnaps["left_left_side"] != null && validSnaps["right_right_side"] != null) {
      delete validSnaps["center_vertical"];
    }
    if (validSnaps["top_top_side"] != null && validSnaps["bottom_bottom_side"] != null) {
      delete validSnaps["center_horizontal"];
    }
    if (validSnaps["center_distance_left"] == null || validSnaps["center_distance_right"] == null || validSnaps["center_distance_right"].width - validSnaps["center_distance_left"].width > this.snapThreshold) {
      delete validSnaps["center_distance_left"];
      delete validSnaps["center_distance_right"];
    }
    if (validSnaps["center_distance_right"] == null || validSnaps["center_distance_left"] == null || validSnaps["center_distance_left"].width - validSnaps["center_distance_right"].width > this.snapThreshold) {
      delete validSnaps["center_distance_right"];
      delete validSnaps["center_distance_left"];
    }
    if (validSnaps["center_distance_top"] == null || validSnaps["center_distance_bottom"] == null || validSnaps["center_distance_bottom"].height - validSnaps["center_distance_top"].height > this.snapThreshold) {
      delete validSnaps["center_distance_top"];
      delete validSnaps["center_distance_bottom"];
    }
    if (validSnaps["center_distance_bottom"] == null || validSnaps["center_distance_top"] == null || validSnaps["center_distance_top"].height - validSnaps["center_distance_bottom"].height > this.snapThreshold) {
      delete validSnaps["center_distance_bottom"];
      delete validSnaps["center_distance_top"];
    }

    let renderSnaps = Object.keys(validSnaps);
    let currentSnaps = Object.keys(this.currentSnapElements);
    for (let i = 0; i < renderSnaps.length; i++) {
      let snap = validSnaps[renderSnaps[i]];
      if (snap == null) {
        continue;
      }
      if (snap.axis == "x") {
        snapX = snap.threshold;
      } else if (snap.axis == "y") {
        snapY = snap.threshold;
      }
      if (render == false) {
        continue;
      }

      let offsetWidth = -1;
      let offsetHeight = -1;
      if (snap.marker == "x") {
        offsetWidth = 0;
      } else if (snap.marker == "y") {
        offsetHeight = 0;
      }
      
      let snapElement = this.currentSnapElements[snap.type];
      if (snapElement == null) {
        this.editor.content.insertAdjacentHTML("beforeend", `<div class="eSelectSnap" tooleditor new></div>`);
        snapElement = this.editor.content.querySelector(".eSelectSnap[new]");
        snapElement.removeAttribute("new");
        this.currentSnapElements[snap.type] = snapElement;

        if (snap.marker == "x") {
          snapElement.insertAdjacentHTML("beforeend", `<div marker="snapxleft"></div><div marker="snapxright"></div>`);
        } else if (snap.marker == "y") {
          snapElement.insertAdjacentHTML("beforeend", `<div marker="snapytop"></div><div marker="snapybottom"></div>`);
        }
      } else {
        currentSnaps.splice(currentSnaps.indexOf(snap.type), 1);
      }

      snapElement.style.width = Math.max(Math.round(snap.width * this.editor.zoom), 2) + "px";
      snapElement.style.height = Math.max(Math.round(snap.height * this.editor.zoom), 2) + "px";
      snapElement.style.left = Math.round(annotationRect.left + (snap.x * this.editor.zoom) + this.editor.contentHolder.scrollLeft + offsetWidth) + "px";
      snapElement.style.top = Math.round(annotationRect.top + (snap.y * this.editor.zoom) + this.editor.contentHolder.scrollTop + offsetHeight) + "px";
    }
    for (let i = 0; i < currentSnaps.length; i++) {
      let checkSnap = currentSnaps[i];
      this.currentSnapElements[checkSnap].remove();
      delete this.currentSnapElements[checkSnap];
    }

    return { snapX, snapY };
  }
  async snapItems(event, extra) {
    // Loops through other visible annotations
    // Checks if sides / centers line up withen threshold
    // Also checks distance between items to check for patterns
    // Returns an offset X / Y to correct for line up
    
    if (["move", "resize"].includes(this.action) == false) {
      this.renderSnaps = [];
      return await this.updateSnapLines(extra.render);
    }
    if (this.action == "resize" && this.rotation != 0) {
      this.renderSnaps = [];
      return await this.updateSnapLines(extra.render);
    }
    if (this.snapping == false || this.editor.options.snapping == false || event.ctrlKey == true) {
      this.renderSnaps = [];
      return await this.updateSnapLines(extra.render);
    }
    if (Object.keys(this.editor.selecting).length < 1) {
      this.renderSnaps = [];
      return await this.updateSnapLines(extra.render);
    }

    // Determine selection bounds:
    let selectTopLeftX = this.minX;
    let selectTopLeftY = this.minY;
    let selectBottomRightX = this.maxX;
    let selectBottomRightY = this.maxY;
    if (extra.scaleWidth < 0) {
      selectTopLeftX = this.maxX;
      selectBottomRightX = this.minX;
    }
    if (extra.scaleHeight < 0) {
      selectTopLeftY = this.maxY;
      selectBottomRightY = this.minY;
    }
    let annotationRect = this.editor.utils.annotationsRect();
    let pageTopLeftX = -annotationRect.left / this.editor.zoom;
    let pageTopLeftY = -annotationRect.top / this.editor.zoom;
    let pageBottomRightX = (this.editor.page.offsetWidth - annotationRect.left) / this.editor.zoom;
    let pageBottomRightY = (this.editor.page.offsetHeight - annotationRect.top) / this.editor.zoom;
    
    let hasCommonParent = true;
    let commonParent;
    let selectedKeys = Object.keys(this.editor.selecting);
    for (let i = 0; i < selectedKeys.length; i++) {
      let annoid = selectedKeys[i];
      let original = this.editor.annotations[annoid] ?? {};
      if (original.render == null) {
        continue;
      }
      if (original.render.parent != commonParent && i > 0) {
        hasCommonParent = false;
        break;
      }
      commonParent = original.render.parent;
    }
    let validRenderSnaps = [];
    if (extra.recalculateExisting == true) {
      validRenderSnaps = getObject(this.renderSnaps, "type");
    }
    this.renderSnaps = [];
    let applySnap = (data, run) => {
      let threshold = Math.abs(data.threshold);
      if (extra.recalculateExisting != true) {
        if (threshold > this.snapThreshold) {
          return;
        }
      } else if (validRenderSnaps[data.type] == null) {
        return;
      }
      if (extra.resizeHandleAxis != null) {
        if (extra.resizeHandleAxis == "x" && data.axis == "y") {
          return;
        } else if (extra.resizeHandleAxis == "y" && data.axis == "x") {
          return;
        }
      }
      if (extra.render != false || data.marker != null) {
        data = { ...data, ...run() };
        if (data.additional != null) {
          let result = data.additional();
          if (result == false) {
            return;
          } else {
            data.additionalLines = result;
          }
        }
      } else {
        data = { ...data, width: 0, height: 0, x: 0, y: 0 };
      }
      if (data.marker != null && data.width < 1 && data.height < 1) {
        return;
      }
      for (let i = 0; i < this.renderSnaps.length; i++) {
        let check = this.renderSnaps[i];
        if (check == null) {
          continue;
        }
        if (check.axis == data.axis) {
          let compare = Math.round(Math.abs(check.threshold) - threshold);
          if (compare > 0) {
            this.renderSnaps.splice(i, 1);
            i--;
          } else if (compare < 0) {
            return;
          }
        }
        if (data.type == check.type && data.centerSize != null && check.centerSize != null) {
          if (data.centerSize > check.centerSize) {
            return;
          }
        }
      }
      this.renderSnaps.push(data);
    }

    if (extra.recalculateExisting != true) {
      this.checkDistanceXDirection = [];
      this.checkDistanceYDirection = [];
    }
    
    let visibleAnnotations = this.editor.utils.annotationsInChunks(this.editor.visibleChunks);
    for (let i = 0; i < visibleAnnotations.length; i++) {
      let annotation = visibleAnnotations[i] ?? {};
      let render = annotation.render;
      if (render == null || render.remove == true) {
        continue;
      }
      if (hasCommonParent == true && render.parent != commonParent && render._id != commonParent) {
        continue;
      }
      if (this.editor.selecting[render._id] != null) {
        continue;
      }
      let annoModule = (await this.editor.render.getModule(annotation, render.f)) ?? {};
      if (annoModule.CAN_BE_SNAPPED_TO == false) {
        continue;
      }
      let rect = this.editor.utils.getRect(render);
      if (rect.selectingParent == true) {
        continue;
      }
      let [topLeftX, topLeftY, bottomRightX, bottomRightY] = rotatedBounds(rect.x, rect.y, rect.endX, rect.endY, rect.rotation);
      if (bottomRightX < pageTopLeftX || topLeftX > pageBottomRightX || bottomRightY < pageTopLeftY || topLeftY > pageBottomRightY) {
        continue;
      }
      let { centerX, centerY } = rect;

      if (this.action == "move" || ["topright", "bottomright", "right"].includes(this.handle) == false) {
        applySnap({ type: "left_left_side", axis: "x", threshold: topLeftX - selectTopLeftX }, () => { return {
          width: 0,
          height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
          x: topLeftX,
          y: Math.min(selectTopLeftY, topLeftY)
        };});
      }
      if (this.action == "move" || ["topleft", "bottomleft", "left"].includes(this.handle) == false) {
        applySnap({ type: "left_right_side", axis: "x", threshold: topLeftX - selectBottomRightX }, () => { return {
          width: 0,
          height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
          x: topLeftX,
          y: Math.min(selectTopLeftY, topLeftY)
        };});
      }
      if (this.action == "resize" && ["topright", "bottomright", "right"].includes(this.handle) == false) {
        applySnap({ type: "left_center_side", axis: "x", threshold: centerX - selectTopLeftX }, () => { return {
          width: 0,
          height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
          x: centerX,
          y: Math.min(selectTopLeftY, topLeftY)
        };});
      }
      if (this.action == "move" || ["bottomleft", "bottomright", "bottom"].includes(this.handle) == false) {
        applySnap({ type: "top_top_side", axis: "y", threshold: topLeftY - selectTopLeftY }, () => { return {
          width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
          height: 0,
          x: Math.min(selectTopLeftX, topLeftX),
          y: topLeftY
        };});
      }
      if (this.action == "move" || ["topleft", "topright", "top"].includes(this.handle) == false) {
        applySnap({ type: "top_bottom_side", axis: "y", threshold: topLeftY - selectBottomRightY }, () => { return {
          width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
          height: 0,
          x: Math.min(selectTopLeftX, topLeftX),
          y: topLeftY
        };});
      }
      if (this.action == "resize" && ["bottomleft", "bottomright", "bottom"].includes(this.handle) == false) {
        applySnap({ type: "top_center_side", axis: "y", threshold: centerY - selectTopLeftY }, () => { return {
          width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
          height: 0,
          x: Math.min(selectTopLeftX, topLeftX),
          y: centerY
        };});
      }
      if (this.action == "move" || ["topleft", "bottomleft", "left"].includes(this.handle) == false) {
        applySnap({ type: "right_right_side", axis: "x", threshold: bottomRightX - selectBottomRightX }, () => { return {
          width: 0,
          height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
          x: bottomRightX,
          y: Math.min(selectTopLeftY, topLeftY)
        };});
      }
      if (this.action == "move" || ["topright", "bottomright", "right"].includes(this.handle) == false) {
        applySnap({ type: "right_left_side", axis: "x", threshold: bottomRightX - selectTopLeftX }, () => { return {
          width: 0,
          height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
          x: bottomRightX,
          y: Math.min(selectTopLeftY, topLeftY)
        };});
      }
      if (this.action == "resize" && ["topleft", "bottomleft", "left"].includes(this.handle) == false) {
        applySnap({ type: "right_center_side", axis: "x", threshold: centerX - selectBottomRightX }, () => { return {
          width: 0,
          height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
          x: centerX,
          y: Math.min(selectTopLeftY, topLeftY)
        };});
      }
      if (this.action == "move" || ["topleft", "topright", "top"].includes(this.handle) == false) {
        applySnap({ type: "bottom_bottom_side", axis: "y", threshold: bottomRightY - selectBottomRightY }, () => { return {
          width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
          height: 0,
          x: Math.min(selectTopLeftX, topLeftX),
          y: bottomRightY
        };});
      }
      if (this.action == "move" || ["bottomleft", "bottomright", "bottom"].includes(this.handle) == false) {
        applySnap({ type: "bottom_top_side", axis: "y", threshold: bottomRightY - selectTopLeftY }, () => { return {
          width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
          height: 0,
          x: Math.min(selectTopLeftX, topLeftX),
          y: bottomRightY
        };});
      }
      if (this.action == "resize" && ["topleft", "topright", "top"].includes(this.handle) == false) {
        applySnap({ type: "bottom_center_side", axis: "y", threshold: centerY - selectBottomRightY }, () => { return {
          width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
          height: 0,
          x: Math.min(selectTopLeftX, topLeftX),
          y: centerY
        };});
      }

      if (this.action == "move") {
        applySnap({ type: "center_vertical", axis: "x", threshold: centerX - (selectTopLeftX + ((selectBottomRightX - selectTopLeftX) / 2)) }, () => { return {
          width: 0,
          height: Math.ceil(Math.max(selectBottomRightY, bottomRightY) - Math.min(selectTopLeftY, topLeftY)),
          x: centerX,
          y: Math.min(selectTopLeftY, topLeftY)
        };});
        applySnap({ type: "center_horizontal", axis: "y", threshold: centerY - (selectTopLeftY + ((selectBottomRightY - selectTopLeftY) / 2)) }, () => { return {
          width: Math.ceil(Math.max(selectBottomRightX, bottomRightX) - Math.min(selectTopLeftX, topLeftX)),
          height: 0,
          x: Math.min(selectTopLeftX, topLeftX),
          y: centerY
        };});

        // Check for equal distance snap:
        if (hasCommonParent == true && extra.recalculateExisting != true) {
          if (topLeftX < selectTopLeftX || topLeftY < selectTopLeftY || bottomRightX > selectBottomRightX || bottomRightY > selectBottomRightY) {
            if (topLeftX < selectBottomRightX && bottomRightX > selectTopLeftX) {
              this.checkDistanceYDirection.push({ _id: render._id, topLeftX, topLeftY, bottomRightX, bottomRightY, centerX, centerY });
            }
            if (topLeftY < selectBottomRightY && bottomRightY > selectTopLeftY) {
              this.checkDistanceXDirection.push({ _id: render._id, topLeftX, topLeftY, bottomRightX, bottomRightY, centerX, centerY });
            }
          }
        }
      }
    }

    // Check for equal distance snap:
    if (extra.recalculateExisting != true) {
      this.checkDistanceXDirection.sort((a, b) => a.centerX - b.centerX);
      this.checkDistanceYDirection.sort((a, b) => a.centerY - b.centerY);
    }
    let xDistances = {};
    let xDistanceIds = {};
    let yDistances = {};
    let yDistanceIds = {};
    for (let i = 0; i < this.checkDistanceXDirection.length; i++) {
      let el1 = this.checkDistanceXDirection[i];
      for (let j = i + 1; j < this.checkDistanceXDirection.length; j++) {
        let el2 = this.checkDistanceXDirection[j];
        let distance = 0;
        if (el2.topLeftX > el1.bottomRightX) {
          distance = el2.topLeftX - el1.bottomRightX;
        } else if (el1.topLeftX > el2.bottomRightX) {
          distance = el1.topLeftX - el2.bottomRightX;
        } else if (el2.bottomRightX < el1.topLeftX) {
          distance = el1.topLeftX - el2.bottomRightX;
        } else if (el1.bottomRightX < el2.topLeftX) {
          distance = el2.topLeftX - el1.bottomRightX;
        }
        distance = Math.round(distance);
        if (distance > 0) {
          if (xDistances[distance] == null) {
            xDistances[distance] = [];
          }
          xDistances[distance].push([el1, el2]);
          if (xDistanceIds[distance] == null) {
            xDistanceIds[distance] = {};
          }
          xDistanceIds[distance][el1._id] = "";
          xDistanceIds[distance][el2._id] = "";
        }
      }
    }
    for (let i = 0; i < this.checkDistanceYDirection.length; i++) {
      let el1 = this.checkDistanceYDirection[i];
      for (let j = i + 1; j < this.checkDistanceYDirection.length; j++) {
        let el2 = this.checkDistanceYDirection[j];
        let distance = 0;
        if (el2.topLeftY > el1.bottomRightY) {
          distance = el2.topLeftY - el1.bottomRightY;
        } else if (el1.topLeftY > el2.bottomRightY) {
          distance = el1.topLeftY - el2.bottomRightY;
        } else if (el2.bottomRightY < el1.topLeftY) {
          distance = el1.topLeftY - el2.bottomRightY;
        } else if (el1.bottomRightY < el2.topLeftY) {
          distance = el2.topLeftY - el1.bottomRightY;
        }
        distance = Math.round(distance);
        if (distance > 0) {
          if (yDistances[distance] == null) {
            yDistances[distance] = [];
          }
          yDistances[distance].push([el1, el2]);
          if (yDistanceIds[distance] == null) {
            yDistanceIds[distance] = {};
          }
          yDistanceIds[distance][el1._id] = "";
          yDistanceIds[distance][el2._id] = "";
        }
      }
    }

    let checkOverlap = (pos1, length1, pos2, length2) => {
      if (pos1 < pos2 + length2 && pos2 < pos1 + length1) {
        return true;
      }
      return false;
    }
    let determinePositionAxis = (topLeftPosition, bottomRightPosition, centerPosition, selectPos1, selectPos2) => {
      if (Math.abs(bottomRightPosition - topLeftPosition) < selectPos2 - selectPos1) {
        let offset = 0;
        if (selectPos1 > topLeftPosition) {
          offset = (topLeftPosition - selectPos1) / 2;
        } else if (selectPos2 < bottomRightPosition) {
          offset = (bottomRightPosition - selectPos2) / 2;
        }
        return centerPosition - offset;
      } else {
        let offset = 0;
        if (selectPos1 < topLeftPosition) {
          offset = (selectPos1 - topLeftPosition) / 2;
        } else if (selectPos2 > bottomRightPosition) {
          offset = (selectPos2 - bottomRightPosition) / 2;
        }
        return selectPos1 + ((selectPos2 - selectPos1) / 2) - offset;
      }
    }

    let xDistanceKeys = Object.keys(xDistances);
    for (let i = 0; i < xDistanceKeys.length; i++) {
      let key = xDistanceKeys[i];
      let distance = parseFloat(key);
      let elements = xDistances[key];
      let elemIds = xDistanceIds[key];

      for (let s = 0; s < this.checkDistanceXDirection.length; s++) {
        let elem = this.checkDistanceXDirection[s];

        applySnap({ type: "right_left_distance", axis: "x", marker: "x", threshold: elem.topLeftX - selectBottomRightX - distance }, () => { return {
          width: elem.topLeftX - selectBottomRightX,
          height: 0,
          x: selectBottomRightX,
          y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY),
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.topLeftX - el1.bottomRightX;
              if (checkOverlap(this.x, this.width, el1.bottomRightX, lineSize) == true) {
                return false;
              }
              renderLines.push({
                type: "right_left_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightX),
                width: lineSize,
                height: 0,
                x: el1.bottomRightX,
                y: determinePositionAxis(el2.topLeftY, el2.bottomRightY, el2.centerY, el1.topLeftY, el1.bottomRightY),
                marker: "x"
              });
            }
            return renderLines;
          }
        };});
        applySnap({ type: "left_right_distance", axis: "x", marker: "x", threshold: distance - selectTopLeftX + elem.bottomRightX }, () => { return {
          width: selectTopLeftX - elem.bottomRightX,
          height: 0,
          x: elem.bottomRightX,
          y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY),
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.topLeftX - el1.bottomRightX;
              if (checkOverlap(this.x, this.width, el1.bottomRightX, lineSize) == true) {
                return false;
              }
              renderLines.push({
                type: "left_right_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightX),
                width: lineSize,
                height: 0,
                x: el1.bottomRightX,
                y: determinePositionAxis(el2.topLeftY, el2.bottomRightY, el2.centerY, el1.topLeftY, el1.bottomRightY),
                marker: "x"
              });
            }
            return renderLines;
          }
        };});

        if (elemIds[elem._id] != null) {
          let leftCenterSize = selectTopLeftX - elem.bottomRightX;
          applySnap({ type: "center_distance_left", center: true, axis: "x", marker: "x", centerSize: leftCenterSize, threshold: -((distance / 2) - selectTopLeftX - ((selectBottomRightX - selectTopLeftX) / 2) + elem.bottomRightX) }, () => { return {
            width: leftCenterSize,
            height: 0,
            x: elem.bottomRightX,
            y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY)
          };});
          let rightCenterSize = elem.topLeftX - selectBottomRightX;
          applySnap({ type: "center_distance_right", center: true, axis: "x", marker: "x", centerSize: rightCenterSize, threshold: -((distance / 2) + selectTopLeftX + ((selectBottomRightX - selectTopLeftX) / 2) - elem.topLeftX) }, () => { return {
            width: rightCenterSize,
            height: 0,
            x: selectBottomRightX,
            y: determinePositionAxis(elem.topLeftY, elem.bottomRightY, elem.centerY, selectTopLeftY, selectBottomRightY)
          };});
        }
      }
    }

    let yDistanceKeys = Object.keys(yDistances);
    for (let i = 0; i < yDistanceKeys.length; i++) {
      let key = yDistanceKeys[i];
      let distance = parseFloat(key);
      let elements = yDistances[key];
      let elemIds = yDistanceIds[key];

      for (let s = 0; s < this.checkDistanceYDirection.length; s++) {
        let elem = this.checkDistanceYDirection[s];

        applySnap({ type: "bottom_top_distance", axis: "y", marker: "y", threshold: elem.topLeftY - selectBottomRightY - distance }, () => { return {
          width: 0,
          height: elem.topLeftY - selectBottomRightY,
          x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
          y: selectBottomRightY,
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.topLeftY - el1.bottomRightY;
              if (checkOverlap(this.y, this.height, el1.bottomRightY, lineSize) == true) {
                return false;
              }
              renderLines.push({
                type: "bottom_top_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightY),
                width: 0,
                height: lineSize,
                x: determinePositionAxis(el2.topLeftX, el2.bottomRightX, el2.centerX, el1.topLeftX, el1.bottomRightX),
                y: el1.bottomRightY,
                marker: "y"
              });
            }
            return renderLines;
          }
        };});
        applySnap({ type: "top_bottom_distance", axis: "y", marker: "y", threshold: distance - selectTopLeftY + elem.bottomRightY }, () => { return {
          width: 0,
          height: selectTopLeftY - elem.bottomRightY,
          x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
          y: elem.bottomRightY,
          additional: function () {
            let renderLines = [];
            for (let e = 0; e < elements.length; e++) {
              let [el1, el2] = elements[e];
              let lineSize = el2.topLeftY - el1.bottomRightY;
              if (checkOverlap(this.y, this.height, el1.bottomRightY, lineSize) == true) {
                return false;
              }
              renderLines.push({
                type: "top_bottom_distance_" + Math.floor(lineSize) + "_" + Math.floor(el1.bottomRightY),
                width: 0,
                height: lineSize,
                x: determinePositionAxis(el2.topLeftX, el2.bottomRightX, el2.centerX, el1.topLeftX, el1.bottomRightX),
                y: el1.bottomRightY,
                marker: "y"
              });
            }
            return renderLines;
          }
        };});

        if (elemIds[elem._id] != null) {
          let topCenterSize = selectTopLeftY - elem.bottomRightY;
          applySnap({ type: "center_distance_top", center: true, axis: "y", marker: "y", centerSize: topCenterSize, threshold: -((distance / 2) - selectTopLeftY - ((selectBottomRightY - selectTopLeftY) / 2) + elem.bottomRightY) }, () => { return {
            width: 0,
            height: topCenterSize,
            x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
            y: elem.bottomRightY
          };});
          let bottomCenterSize = elem.topLeftY - selectBottomRightY;
          applySnap({ type: "center_distance_bottom", center: true, axis: "y", marker: "y", centerSize: bottomCenterSize, threshold: -((distance / 2) + selectTopLeftY + ((selectBottomRightY - selectTopLeftY) / 2) - elem.topLeftY) }, () => { return {
            width: 0,
            height: bottomCenterSize,
            x: determinePositionAxis(elem.topLeftX, elem.bottomRightX, elem.centerX, selectTopLeftX, selectBottomRightX),
            y: selectBottomRightY
          };});
        }
      }
    }

    return await this.updateSnapLines(extra.render); // Render snap lines
  }
  async setScrollInterval() {
    if (this.scrollIntervalRunning == true) {
      return;
    }
    this.scrollIntervalRunning = true;
    while (this.action != null && (this.scrollIntervalX != 0 || this.scrollIntervalY != 0)) {
      this.editor.contentHolder.scrollTo({
        left: this.editor.contentHolder.scrollLeft + this.scrollIntervalX,
        top: this.editor.contentHolder.scrollTop + this.scrollIntervalY
      });
      await this.moveAction(this.scrollLastEvent, null, null, true);
      await sleep(10);
    }
    this.scrollIntervalRunning = false;
  }
  async moveAction(event, snapX, snapY, fromScroll) {
    if (this.action == null) {
      return;
    }
    if (mouseDown() == false || this.hideSelectBox == true) {
      return this.endAction();
    }

    let mouseX = this.lastMouseX;
    let mouseY = this.lastMouseY;
    if (event != null) {
      ({ mouseX, mouseY } = this.editor.utils.localMousePosition(event));
      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
      this.scrollLastEvent = event;
      event.preventDefault();
    } else {
      event = this.scrollLastEvent ?? {};
    }

    if (this.actionEnabled == false) {
      if (Math.abs(mouseX - this.enableStartX) > 3 || Math.abs(mouseY - this.enableStartY) > 3) {
        this.actionEnabled = true;
      } else {
        return;
      }
    }

    // Handle Scroll with Mouse:
    if (fromScroll != true && ["move", "resize"].includes(this.action) == true) {
      this.scrollIntervalX = 0;
      this.scrollIntervalY = 0;
      let leftPos = this.scrollOffset - mouseX;
      if (leftPos > 0) {
        let percentage = 1 + ((leftPos - this.scrollOffset) / this.scrollOffset);
        this.scrollIntervalX = -Math.min(10 * percentage, 10);
      }
      let rightPos = mouseX - this.editor.page.offsetWidth + this.scrollOffset;
      if (rightPos > 0) {
        let percentage = 1 + ((rightPos - this.scrollOffset) / this.scrollOffset);
        this.scrollIntervalX = Math.min(10 * percentage, 10);
      }
      let topPos = this.scrollOffset - mouseY;
      if (topPos > 0) {
        let percentage = 1 + ((topPos - this.scrollOffset) / this.scrollOffset);
        this.scrollIntervalY = -Math.min(10 * percentage, 10);
      }
      let bottomPos = mouseY - this.editor.page.offsetHeight + this.scrollOffset;
      if (bottomPos > 0) {
        let percentage = 1 + ((bottomPos - this.scrollOffset) / this.scrollOffset);
        this.scrollIntervalY = Math.min(10 * percentage, 10);
      }
      if (this.scrollIntervalX != 0 || this.scrollIntervalY != 0) {
        return this.setScrollInterval();
      }
    }
    
    let position = this.editor.utils.scaleToDoc(mouseX, mouseY);
    let offsetSnapX = snapX ?? 0;
    let offsetSnapY = snapY ?? 0;

    let keys = Object.keys(this.editor.selecting);

    let changePositionX = 0;
    let changePositionY = 0;

    let scaleWidth = 1;
    let scaleHeight = 1;
    let snapHandleAxis;
    let changeXCoord = 0;
    let changeYCoord = 0;
    let sizeLimitX = false;
    let sizeLimitY = false;
    let fixAnnotationHolder = this.handle;
    let preserveAspect = this.resizePreserveAspect || event.shiftKey || false;

    let rotateChange = 0;
    
    if (this.action == "move") {
      changePositionX = position.x - this.rootX;
      changePositionY = position.y - this.rootY;
      this.toolbar.updateMouse({ type: "svg", svg: moveCursorIcon, translate: { x: 22, y: 22 } });
    } else if (this.action == "resize") {
      // Calculate the change in width / height:
      let originalMidpointX = this.originalSize[0] / 2;
      let originalMidpointY = this.originalSize[1] / 2;
      let halfRotateWidth = this.originalPosition[0] + originalMidpointX;
      let halfRotateHeight = this.originalPosition[1] + originalMidpointY;
      let [xCoord, yCoord] = rotatePoint(position.x - halfRotateWidth, position.y - halfRotateHeight, -this.rotation);
      let changeX = xCoord - this.rootX + offsetSnapX;
      let changeY = yCoord - this.rootY + offsetSnapY;
      if (this.rootX < 0) {
        changeX *= -1;
      }
      if (this.rootY < 0) {
        changeY *= -1;
      }
      if (keys.length > 1) {
        if (this.originalSize[0] + changeX < 25) {
          changeX = -this.originalSize[0] + 25;
        }
        if (this.originalSize[1] + changeY < 25) {
          changeY = -this.originalSize[1] + 25;
        }
      }

      // Handle resize based on handles:
      let oppositePositionX = 0;
      let oppositePositionY = 0;
      let newSize = [0, 0];
      let newOppositePositionX = 0;
      let newOppositePositionY = 0;
      switch (this.handle) {
        case "bottomright":
          if (preserveAspect == true || this.multiSelectPreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0];
          oppositePositionY = this.originalPosition[1];
          newOppositePositionX = this.originalPosition[0];
          newOppositePositionY = this.originalPosition[1];
          break;
        case "topleft":
          if (preserveAspect == true || this.multiSelectPreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + this.originalSize[0];
          oppositePositionY = this.originalPosition[1] + this.originalSize[1];
          newOppositePositionX = this.originalPosition[0] + newSize[0];
          newOppositePositionY = this.originalPosition[1] + newSize[1];
          break;
        case "topright":
          if (preserveAspect == true || this.multiSelectPreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0];
          oppositePositionY = this.originalPosition[1] + this.originalSize[1];
          newOppositePositionX = this.originalPosition[0];
          newOppositePositionY = this.originalPosition[1] + newSize[1];
          break;
        case "bottomleft":
          if (preserveAspect == true || this.multiSelectPreserveAspect == true) {
            let setXFromChangeX = this.originalSize[0] + changeX;
            let setYFromChangeX = this.originalSize[1] * ((this.originalSize[0] + changeX) / this.originalSize[0]);
            let setXFromChangeY = this.originalSize[0] * ((this.originalSize[1] + changeY) / this.originalSize[1]);
            let setYFromChangeY = this.originalSize[1] + changeY;
            if (Math.abs(setXFromChangeX * setYFromChangeX) > Math.abs(setXFromChangeY * setYFromChangeY)) {
              scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
              snapHandleAxis = "x";
            } else {
              scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
              snapHandleAxis = "y";
            }
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + this.originalSize[0];
          oppositePositionY = this.originalPosition[1];
          newOppositePositionX = this.originalPosition[0] + newSize[0];
          newOppositePositionY = this.originalPosition[1];
          break;
        case "right":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0];
          oppositePositionY = this.originalPosition[1] + (this.originalSize[1] / 2);
          newOppositePositionX = this.originalPosition[0];
          newOppositePositionY = this.originalPosition[1] + (newSize[1] / 2);
          fixAnnotationHolder = "bottomright";
          snapHandleAxis = "x";
          break;
        case "bottom":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
            scaleHeight = scaleWidth;
          } else {
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + (this.originalSize[0] / 2);
          oppositePositionY = this.originalPosition[1];
          newOppositePositionX = this.originalPosition[0] + (newSize[0] / 2);
          newOppositePositionY = this.originalPosition[1];
          fixAnnotationHolder = "bottomright";
          snapHandleAxis = "y";
          break;
        case "left":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
            scaleHeight = scaleWidth;
          } else {
            scaleWidth = (this.originalSize[0] + changeX) / this.originalSize[0];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + this.originalSize[0];
          oppositePositionY = this.originalPosition[1] + (this.originalSize[1] / 2);
          newOppositePositionX = this.originalPosition[0] + newSize[0];
          newOppositePositionY = this.originalPosition[1] + (newSize[1] / 2);
          fixAnnotationHolder = "topleft";
          snapHandleAxis = "x";
          break;
        case "top":
          if (preserveAspect == true) {
            scaleWidth = (this.originalSize[1] + changeY) / this.originalSize[1];
            scaleHeight = scaleWidth;
          } else {
            scaleHeight = (this.originalSize[1] + changeY) / this.originalSize[1];
          }
          newSize = [this.originalSize[0] * scaleWidth, this.originalSize[1] * scaleHeight];
          oppositePositionX = this.originalPosition[0] + (this.originalSize[0] / 2);
          oppositePositionY = this.originalPosition[1] + this.originalSize[1];
          newOppositePositionX = this.originalPosition[0] + (newSize[0] / 2);
          newOppositePositionY = this.originalPosition[1] + newSize[1];
          fixAnnotationHolder = "topleft";
          snapHandleAxis = "y";
      }

      let newSelectionMidpointX = newSize[0] / 2;
      let newSelectionMidpointY = newSize[1] / 2;
      
      let midpointChangeX = newSelectionMidpointX - originalMidpointX;
      let midpointChangeY = newSelectionMidpointY - originalMidpointY;

      // Calculate relative position:
      let [originalXCoord, originalYCoord] = rotatePointOrigin(oppositePositionX, oppositePositionY, halfRotateWidth, halfRotateHeight, this.rotation);

      let newHalfRotateWidth = this.originalPosition[0] + newSelectionMidpointX;
      let newHalfRotateHeight = this.originalPosition[1] + newSelectionMidpointY;
      let [newXCoord, newYCoord] = rotatePointOrigin(newOppositePositionX, newOppositePositionY, newHalfRotateWidth, newHalfRotateHeight, this.rotation);

      // Calculate change in opposite handle position:
      changeXCoord = newXCoord - originalXCoord - midpointChangeX;
      changeYCoord = newYCoord - originalYCoord - midpointChangeY;
      
      sizeLimitX = oppositePositionX != newOppositePositionX;
      sizeLimitY = oppositePositionY != newOppositePositionY;

      let cursorRotate = this.resizeCursorRotation;
      if (cursorRotate % 90 == 0) {
        if (scaleWidth < 0) {
          cursorRotate -= 90;
        }
        if (scaleHeight < 0) {
          cursorRotate += 90;
        }
      }

      this.toolbar.updateMouse({ type: "svg", svg: resizeCursorIcon, translate: { x: 22, y: 22 }, rotate: this.rotation + cursorRotate });
    } else if (this.action == "rotate") {
      let centerX = this.originalSize[0] / 2;
      let centerY = this.originalSize[1] / 2;
      let yRoot = -(position.y - (this.originalPosition[1] + centerY));
      let xRoot = position.x - (this.originalPosition[0] + centerX);

      let newRotation = (Math.atan2(yRoot, xRoot) * 180) / Math.PI;
      if (newRotation < 0) {
        newRotation = 360 + newRotation;
      }
      let snapDegree = 15;
      if (event.shiftKey == true) {
        snapDegree = 1;
      }
      let setRotation = Math.round((this.originalRotate + (this.originalRotation - newRotation)) / snapDegree) * snapDegree;
      rotateChange = (Math.round(setRotation / snapDegree) * snapDegree) - this.originalRotate;

      this.toolbar.updateMouse({ type: "svg", svg: rotateCursorIcon, translate: { x: 22, y: 22 }, rotate: this.originalRotate + rotateChange });
    }

    for (let i = 0; i < keys.length; i++) {
      let annoid = keys[i];
      let original = this.editor.annotations[annoid] ?? {};
      if (original.render == null) {
        continue;
      }
      if (this.editor.utils.isLocked(original.render) == true || this.editor.utils.isPlaceholderLocked(original.render) == true) {
        return this.endAction();
      }
      if (original.revert == null) {
        original.revert = copyObject(original.render);
      }
      if (this.editor.self.access < this.editor.minimumEditingAccess || this.editor.utils.canMemberModify(original.render) == false) {
        delete this.editor.selecting[annoid];
        continue;
      }
      let select = this.editor.selecting[annoid];
      delete select.done;

      let annoModule = (await this.editor.render.getModule(original, select.f ?? original.render.f)) ?? {};

      let rect = this.annotationRects[annoid];
      if (rect == null) {
        rect = this.editor.utils.getRect(original.render);
        rect.size = [original.render.s[0], original.render.s[1]];
        this.annotationRects[annoid] = rect;
      }

      if (this.action == "move") {
        select.p = [
          round(rect.annoX + changePositionX + offsetSnapX),
          round(rect.annoY + changePositionY + offsetSnapY)
        ];
      } else if (this.action == "resize") {
        let rotate = rect.rotation;
        if (rotate > 180) {
          rotate = -(360 - rotate);
        }
        if (scaleWidth == scaleHeight && this.rotation == 0) {
          rotate = 0;
        }
        let rotateDifference = rotate - this.rotation;
        let radian = rotateDifference * (Math.PI / 180);

        // FIRST: Figure out the bounding box size of element:
        let boundingWidth = Math.abs(rect.width * Math.cos(radian)) + Math.abs(rect.height * Math.sin(radian));
        let boundingHeight = Math.abs(rect.height * Math.cos(radian)) + Math.abs(rect.width * Math.sin(radian));

        // SECOND: Apply the scaling to the bouding box:
        let setBoundWidth = boundingWidth * scaleWidth;
        let setBoundHeight = boundingHeight * scaleHeight;

        // THIRD: Determine actual element width by converting bounding box size back to element size:
        let setWidth = 0;
        let setHeight = 0;
        let maintainSizeWidth = false;
        let maintainSizeHeight = false;

        let absRotate = Math.abs(rotateDifference);
        if (absRotate > 45 && absRotate < 135) {
          let cosAbs = Math.abs(Math.cos((rotateDifference + 90) * (Math.PI / 180)));
          let cosCorrectWidth = (boundingHeight / cosAbs) - rect.width;
          let cosCorrectHeight = (boundingWidth / cosAbs) - rect.height;
          if (rotateDifference != 0) {
            if (setBoundWidth < 0) {
              cosCorrectWidth *= -1;
            }
            if (setBoundHeight < 0) {
              cosCorrectHeight *= -1;
            }
          }
          setWidth = (setBoundHeight / cosAbs) - cosCorrectWidth - rect.thickness;
          setHeight = (setBoundWidth / cosAbs) - cosCorrectHeight - rect.thickness;
        } else {
          let cosAbs = Math.abs(Math.cos(radian));
          let cosCorrectWidth = (boundingWidth / cosAbs) - rect.width;
          let cosCorrectHeight = (boundingHeight / cosAbs) - rect.height;
          if (rotateDifference != 0) {
            if (setBoundWidth < 0) {
              cosCorrectWidth *= -1;
            }
            if (setBoundHeight < 0) {
              cosCorrectHeight *= -1;
            }
          }
          setWidth = (setBoundWidth / cosAbs) - cosCorrectWidth - rect.thickness;
          setHeight = (setBoundHeight / cosAbs) - cosCorrectHeight - rect.thickness;
        }

        if (keys.length > 1) {
          if (rect.size[0] == 0) {
            setWidth = 0;
          } else if (setWidth < 25) {
            setWidth = 25;
          }
          if (rect.size[1] == 0) {
            setHeight = 0;
          } else if (setHeight < 25) {
            setHeight = 25;
          }
        } else if (rect.size[0] == 0 || rect.size[1] == 0) {
          continue;
        }

        // Preserve original sign:
        let signOriginalWidth = rect.width;
        let signOriginalHeight = rect.height;
        let absWidth = Math.abs(setWidth);
        let absHeight = Math.abs(setHeight);
        if (annoModule.CAN_FLIP != false) {
          if (rect.size[0] < 0) {
            setWidth *= -1;
            signOriginalWidth *= -1;
          }
          if (rect.size[1] < 0) {
            setHeight *= -1;
            signOriginalHeight *= -1;
          }
        } else {
          setWidth = Math.max(absWidth, 1);
          setHeight = Math.max(absHeight, 1);
        }
        let originalSetWidth = setWidth;
        let originalSetHeight = setHeight;

        let minWidth = annoModule.MIN_WIDTH ?? 0;
        if (absWidth < minWidth) {
          if (setWidth > 0) {
            setWidth = minWidth;
          } else {
            setWidth = -minWidth;
          }
          if (absWidth < annoModule.MIN_WIDTH) {
            maintainSizeWidth = true;
          }
        }
        let minHeight = annoModule.MIN_HEIGHT ?? 0;
        if (absHeight < minHeight) {
          if (setHeight > 0) {
            setHeight = minHeight;
          } else {
            setHeight = -minHeight;
          }
          if (absHeight < annoModule.MIN_HEIGHT) {
            maintainSizeHeight = true;
          }
        }

        let signNewWidth = Math.abs(setWidth) + rect.thickness;
        let signNewHeight = Math.abs(setHeight) + rect.thickness;
        if (setWidth < 0) {
          signNewWidth *= -1;
        }
        if (setHeight < 0) {
          signNewHeight *= -1;
        }

        // FINALLY: Apply the new size:
        select.s = [round(setWidth), round(setHeight)];

        // Special function cases:
        if (annoModule.AUTO_TEXT_FIT == true || annoModule.AUTO_SET_HEIGHT == true) {
          await this.editor.render.create({ ...original, render: { ...original.render, ...select }, animate: false });
          let renderedText = original.component.getElement().querySelector("div[edit]");
          if (renderedText != null) {
            if (annoModule.AUTO_TEXT_FIT == true && original.render.textfit == true && select.textfit != false) {
              select.s[0] = renderedText.offsetWidth + 6;
              select.textfit = false;
            }
            if (annoModule.AUTO_SET_HEIGHT == true ) {
              select.s[1] = renderedText.offsetHeight + 6; //Math.max(select.s[1], renderedAnno.offsetHeight + 6);
            }
          }
        }
        
        // Get original midpoint of element:
        let originalAnnoMidpointX = signOriginalWidth / 2;
        let originalAnnoMidpointY = signOriginalHeight / 2;

        // Get offset from center of select box:
        let offsetX = rect.annoX + originalAnnoMidpointX - this.originalPosition[0] - (this.originalSize[0] / 2);
        let offsetY = rect.annoY + originalAnnoMidpointY - this.originalPosition[1] - (this.originalSize[1] / 2);

        // Calculate center of original selection box:
        let selectionCenterX = this.originalPosition[0] + (this.originalSize[0] / 2);
        let selectionCenterY = this.originalPosition[1] + (this.originalSize[1] / 2);

        // Get midpoint of element:
        let newAnnoMidpointX = signNewWidth / 2;
        let newAnnoMidpointY = signNewHeight / 2;

        let changeX = changeXCoord;
        let changeY = changeYCoord;
        if (maintainSizeWidth == true || maintainSizeHeight == true) {
          let updateXCoord = 0;
          if (maintainSizeWidth == true) {
            updateXCoord = (minWidth - originalSetWidth) / 2;
          }
          let updateYCoord = 0;
          if (maintainSizeHeight == true) {
            updateYCoord = (minHeight - originalSetHeight) / 2;
          }
          let [rotateUpdateXCoord, rotateUpdateYCoord] = rotatePoint(updateXCoord, updateYCoord, rect.rotation);
          if (sizeLimitX == true) {
            changeX += rotateUpdateXCoord;
          } else {
            changeX -= rotateUpdateXCoord;
          }
          if (sizeLimitY == true) {
            changeY += rotateUpdateYCoord;
          } else {
            changeY -= rotateUpdateYCoord;
          }
        }

        // Apply the selection box position change:
        select.p = [
          selectionCenterX + (offsetX * scaleWidth) - newAnnoMidpointX - changeX,
          selectionCenterY + (offsetY * scaleHeight) - newAnnoMidpointY - changeY
        ];
        
        let resizeAnnoX;
        let resizeAnnoY;
        switch (fixAnnotationHolder) {
          case "bottomright":
            [resizeAnnoX, resizeAnnoY] = rotatePointOrigin(rect.x, rect.y, rect.centerX, rect.centerY, rect.rotation);
            break;
          case "topleft":
            [resizeAnnoX, resizeAnnoY] = rotatePointOrigin(rect.endX, rect.endY, rect.centerX, rect.centerY, rect.rotation);
            break;
          case "topright":
            [resizeAnnoX, resizeAnnoY] = rotatePointOrigin(rect.x, rect.endY, rect.centerX, rect.centerY, rect.rotation);
            break;
          case "bottomleft":
            [resizeAnnoX, resizeAnnoY] = rotatePointOrigin(rect.endX, rect.y, rect.centerX, rect.centerY, rect.rotation);
        }
        let useX = original.render.p[0];
        let useY = original.render.p[1];
        if (original.render.s[0] < 0) {
          useX += original.render.s[0];
        }
        if (original.render.s[1] < 0) {
          useY += original.render.s[1];
        }
        let [defaultAnnoX, defaultAnnoY] = rotatePointOrigin(useX, useY, useX + (rect.width / 2), useY + (rect.height / 2), original.render.r ?? 0);
        select.resizing = [fixAnnotationHolder, resizeAnnoX, resizeAnnoY, defaultAnnoX, defaultAnnoY];
      } else if (this.action == "rotate") {
        if (annoModule.CAN_ROTATE != false) {
          let changeRotate = rect.rotation + rotateChange;
          if (changeRotate < 0) {
            changeRotate = 360 + changeRotate;
          }
          if (changeRotate >= 360) {
            changeRotate = changeRotate - 360;
          }
          select.r = changeRotate;
        }

        // Calculate radian:
        let radian = rotateChange * (Math.PI / 180);

        // Get original midpoint of element:
        let originalAnnoMidpointX = rect.width / 2;
        let originalAnnoMidpointY = rect.height / 2;
        if (rect.size[0] < 0) {
          originalAnnoMidpointX *= -1;
        }
        if (rect.size[1] < 0) {
          originalAnnoMidpointY *= -1;
        }

        // Get center position of element:
        let originalAnnoCenterX = rect.annoX + originalAnnoMidpointX;
        let originalAnnoCenterY = rect.annoY + originalAnnoMidpointY;

        // Calculate center of original selection box:
        let selectionCenterX = this.originalPosition[0] + (this.originalSize[0] / 2);
        let selectionCenterY = this.originalPosition[1] + (this.originalSize[1] / 2);

        // Determine new rotated center position:
        let rotatedCenterX = selectionCenterX + ((originalAnnoCenterX - selectionCenterX) * Math.cos(radian)) - ((originalAnnoCenterY - selectionCenterY) * Math.sin(radian));
        let rotatedCenterY = selectionCenterY + ((originalAnnoCenterX - selectionCenterX) * Math.sin(radian)) + ((originalAnnoCenterY - selectionCenterY) * Math.cos(radian));

        select.p = [
          rotatedCenterX - originalAnnoMidpointX,
          rotatedCenterY - originalAnnoMidpointY
        ];
      }

      let { x: newX, y: newY, rotation: newRotation } = this.editor.utils.getRelativePosition({
        ...original.render,
        ...select,
        p: select.p ?? [rect.annoX, rect.annoY],
        r: select.r ?? rect.rotation
      });
      if (select.p != null) {
        select.p = [newX, newY];
      }
      if (select.r != null) {
        select.r = newRotation;
      }

      original.component = (await this.editor.render.create({ ...original, render: { ...original.render, ...select }, animate: false })).component;
    }

    await this.updateBox();

    if (snapX == null && snapY == null) {
      let { snapX, snapY } = await this.snapItems(event, { resizeHandleAxis: snapHandleAxis, scaleWidth: scaleWidth, scaleHeight: scaleHeight, render: false });
      if (snapX != 0 || snapY != 0) {
        await this.moveAction(event, snapX, snapY, fromScroll);
      }
      await this.snapItems(event, { resizeHandleAxis: snapHandleAxis, scaleWidth: scaleWidth, scaleHeight: scaleHeight, recalculateExisting: true });
    }
  }
  async endAction(options = {}) {
    if (this.action == null) {
      return;
    }
    this.action = null;

    this.renderSnaps = [];
    this.updateSnapLines();

    let saveUpdates = [];
    let annoIDs = {};
    let pushChanges = [];
    let pushAdds = [];
    let pushRemoves = [];
    let deleteKeys = {};

    let keys = Object.keys(this.editor.selecting);
    let saveAnnotations = [];
    for (let i = 0; i < keys.length; i++) {
      let annoid = keys[i];
      let original = this.editor.annotations[annoid] ?? {};
      let selecting = this.editor.selecting[annoid] ?? {};
      saveAnnotations.push([annoid, original, selecting, { ...(original.render ?? {}), ...selecting }.l ?? 0]);
    }

    saveAnnotations.sort((a, b) => { return a[3] - b[3]; });

    for (let i = 0; i < saveAnnotations.length; i++) {
      let [annoid, original, selecting] = saveAnnotations[i];
      let changeKeys = Object.keys(selecting);
      if (changeKeys.length < 1) {
        continue;
      }
      let originalRender = original.render ?? {};

      delete selecting.resizing;

      let pushFields = { p: originalRender.p, r: originalRender.r };
      for (let f = 0; f < changeKeys.length; f++) {
        let key = changeKeys[f];
        pushFields[key] = originalRender[key] ?? null;
      }
      if (options.fromHistory != true) {
        if (selecting.remove != true) {
          if (Object.keys(pushFields).length > 0) {
            if (pushFields.hasOwnProperty("f") == false) {
              pushChanges.push(copyObject({
                ...pushFields,
                parent: pushFields.parent ?? originalRender.parent ?? null,
                p: pushFields.p,
                r: pushFields.r,
                _id: annoid
              }));
            } else {
              pushAdds.push({ _id: annoid, remove: true });
            }
          }
        } else {
          pushRemoves.push(copyObject(originalRender));
        }
      }

      saveUpdates.push(copyObject({ ...selecting, _id: annoid }));
      selecting.done = true;
      annoIDs[annoid] = true;

      if (selecting.remove == true) {
        deleteKeys[annoid] = "";
      }
    }

    let realtimeSelectSet = copyObject(this.editor.selecting);

    this.saving = true;
    let savedAnnoIDs = {};
    while (saveUpdates.length > 0) {
      for (let i = 0; i < saveUpdates.length; i++) {
        let newSave = saveUpdates[i];
        if (newSave.parent == null || annoIDs[newSave.parent] == null || savedAnnoIDs[newSave.parent] != null) {
          this.editor.selecting[newSave._id] = {};
          await this.editor.save.push(newSave, { history: { fromHistory: options.fromHistory, update: pushChanges, add: pushRemoves }, ignoreSelect: true });
          savedAnnoIDs[newSave._id] = true;
          saveUpdates.splice(i, 1);
          i--;
        }
      }
    }
    this.saving = false;

    if (options.fromHistory != true) {
      if (pushChanges.length > 0) {
        await this.editor.history.push("update", pushChanges);
      }
      if (pushAdds.length > 0) {
        await this.editor.history.push("remove", pushAdds);
      }
      if (pushRemoves.length > 0) {
        await this.editor.history.push("add", pushRemoves);
      }
    }

    this.editor.realtimeSelect = { ...realtimeSelectSet, ...this.editor.realtimeSelect };
    await this.editor.realtime.forceShort();
    this.editor.realtimeSelect = {};
    this.editor.selecting = {};

    let resetKeys = options.sentKeys ?? keys;
    for (let i = 0; i < resetKeys.length; i++) {
      let key = resetKeys[i];
      if (deleteKeys[key] == null) {
        this.editor.selecting[key] = {};
      }
    }

    await this.updateBox({ refreshActionBar: options.refreshActionBar ?? true, redrawActionBar: options.redrawActionBar, transition: false });
  }

  async interactRun(target) {
    if (target == null) {
      return;
    }

    // REACTIONS:
    let reaction = target.closest(".eReaction");
    if (reaction != null) {
      let annotation = reaction.closest(".eAnnotation").getAttribute("anno");
      if (reaction.hasAttribute("emoji") == false) {
        dropdownModule.open(reaction, import("@modules/dropdowns/Emojis"), {
          parent: this.editor,
          recent: this.editor.lesson.recentEmojis,
          callback: async (emoji) => {
            let path = "lessons/members/reaction";
            if ((this.editor.parameters ?? []).length > 0) {
              path += "?" + this.editor.parameters.join("&");
            }
            let [code] = await sendRequest("POST", path, { emoji, annotation }, { session: this.editor.session });
            return [200, 208].includes(code);
          }
        });
        return true;
      }
      reaction.setAttribute("disabled", "");
      let body = {
        emoji: reaction.getAttribute("emoji"),
        annotation
      };
      if (reaction.hasAttribute("selected") == false) {
        let path = "lessons/members/reaction";
        if ((this.editor.parameters ?? []).length > 0) {
          path += "?" + this.editor.parameters.join("&");
        }
        await sendRequest("PUT", path, body, { session: this.editor.session });
      } else {
        let path = "lessons/members/reaction/remove";
        if ((this.editor.parameters ?? []).length > 0) {
          path += "?" + this.editor.parameters.join("&");
        }
        await sendRequest("PUT", path, body, { session: this.editor.session });
      }
      reaction.removeAttribute("disabled");
      return true;
    }

    // EMBEDS:
    let embedButton = target.closest("div[activate] button");
    let embedAnno = target.closest(".eAnnotation");
    let runEmbed = false;
    if (embedButton != null && embedAnno != null) {
      if (embedButton.closest(".eAnnotation[embed]") == embedAnno) {
        runEmbed = true;
      }
    }
    if (runEmbed == true) {
      let annotation = this.editor.annotations[embedAnno.getAttribute("anno")] ?? {};
      let render = annotation.render ?? {};
      if (render.embed != null) {
        if (render.embed.url == null) {
          window.open(render.d);
          return;
        }
        let embedHolder = embedAnno.querySelector("div[content]");
        embedHolder.insertAdjacentHTML("beforeend", `<iframe allowfullscreen allow="microphone; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`);
        let embedFrame = embedHolder.querySelector("iframe");
        if (annotation.component != null) {
          annotation.component.embedFrame = embedFrame;
        }
        embedFrame.setAttribute("currenturl", render.embed.url);
        if (render.embed.color != null) {
          embedFrame.style.background = cleanString(render.embed.color);
        }
        let frameWidth = render.s[0] - 16;
        let defaultMaxWidth = 800;
        if (frameWidth < 300) {
          defaultMaxWidth = 300;
        }
        let embedWidth = Math.max(frameWidth, defaultMaxWidth);
        let scale = frameWidth / embedWidth;
        embedFrame.style.width = embedWidth + "px";
        embedFrame.style.height = ((render.s[1] - 24 - embedAnno.querySelector("div[details]").offsetHeight) * (1 / scale)) + "px";
        embedFrame.style.transform = "scale(" + scale + ")";
        embedFrame.src = render.embed.url;
        embedHolder.querySelector("img[thumbnail]").style.display = "none";
        embedHolder.querySelector("div[activate]").style.display = "none";
      }
      return true;
    }

    // PAGE REVEAL:
    let pageReveal = target.closest(".eAnnotation[page] div[hide] button");
    if (pageReveal != null) {
      let pageAnno = pageReveal.closest(".eAnnotation[page]");
      if (pageAnno == null) {
        return;
      }
      let render = (this.editor.annotations[pageAnno.getAttribute("anno")] ?? {}).render;
      if (render == null || this.editor.utils.canMemberModify(render) == false) {
        return;
      }
      let keys = Object.keys(this.editor.selecting);
      this.editor.selecting = {};
      this.editor.selecting[render._id] = { hidden: false };
      this.action = "save";
      await this.endAction({ redrawActionBar: true, sentKeys: keys });
      return true;
    }
  }

  pointInSelectBox(x, y) {
    if (this.selectBox == null) {
      return;
    }
    if (this.rotation == 0) {
      return pointInRotatedBounds(x, y, this.minX, this.minY, this.maxX, this.maxY, this.rotation, 10 / this.editor.zoom);
    } else {
      return pointInRotatedBounds(x, y, this.lastRect.x, this.lastRect.y, this.lastRect.endX, this.lastRect.endY, this.lastRect.rotation, 10 / this.editor.zoom);
    }
  }

  async undo() {
    let event = this.editor.history.history[this.editor.history.location];
    if (event == null) {
      return;
    }
    this.editor.history.location--;

    let addRedo = event.redo.length < 1;
    let keys = Object.keys(this.editor.selecting);
    let quill;
    switch (event.type) {
      case "update":
        for (let i = 0; i < event.changes.length; i++) {
          let change = event.changes[i];
          if (change.parent != null) {
            if (((this.editor.annotations[change.parent] ?? {}).render ?? { remove: true }).remove == true) {
              continue; // Parent annotation is missing, invalid save
            }
          }
          let annotation = this.editor.annotations[change._id] ?? {};
          if (addRedo == true) {
            let changeKeys = Object.keys(change);
            let render = annotation.render ?? {};
            let redoAnno = { _id: change._id };
            for (let u = 0; u < changeKeys.length; u++) {
              redoAnno[changeKeys[u]] = render[changeKeys[u]];
            }
            event.redo.push(copyObject(redoAnno));
          }
          if (annotation.component != null && annotation.component.quill != null) {
            if (annotation.component.quill.isEnabled() == true) {
              quill = annotation.component.quill;
              quill.keepTextSelectionActive = true;
              quill.disable();
            }
          }
          this.editor.selecting[change._id] = change;
        }
        break;
      case "remove":
        for (let i = 0; i < event.changes.length; i++) {
          let changeID = event.changes[i]._id;
          let annotation = (this.editor.annotations[changeID] ?? {}).render ?? {};
          if (addRedo == true) {
            let { annoX, annoY, rotation } = this.editor.utils.getRect(annotation) ?? {};
            event.redo.push(copyObject({ ...annotation, parent: null, p: [annoX, annoY], r: rotation }));
          }
          this.editor.selecting[changeID] = { _id: changeID, remove: true };
        }
        break;
      case "add":
        for (let i = 0; i < event.changes.length; i++) {
          let saveAnno = event.changes[i];
          if (saveAnno.parent != null) {
            if (((this.editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
              continue; // Parent annotation is missing, invalid save
            }
          }
          let oldID = saveAnno._id;
          let tempID = this.editor.render.tempID();
          for (let h = 0; h < this.editor.history.history.length; h++) {
            let event = this.editor.history.history[h];
            for (let c = 0; c < event.changes.length; c++) {
              let change = event.changes[c];
              if (change._id == oldID) {
                change._id = tempID;
              }
              if (change.parent == oldID) {
                change.parent = tempID;
              }
            }
            for (let c = 0; c < event.redo.length; c++) {
              let change = event.redo[c];
              if (change._id == oldID) {
                change._id = tempID;
              }
              if (change.parent == oldID) {
                change.parent = tempID;
              }
            }
          }
          if (addRedo == true) {
            event.redo.push({ remove: true, _id: tempID });
          }
          this.editor.selecting[tempID] = copyObject({ ...saveAnno, _id: tempID });
        }
    }
    
    this.action = "save";
    await this.endAction({ sentKeys: keys, redrawActionBar: true, fromHistory: true });

    let caretPosition = (event.caret ?? {}).undoPosition;
    if (caretPosition != null && quill != null) {
      quill.enable();
      quill.setSelection(caretPosition.index, caretPosition.length);
      delete quill.keepTextSelectionActive;
      if (addRedo == true && event.caret.redoPosition == null) {
        event.caret.redoPosition = { index: caretPosition.index, length: caretPosition.length };
      }
    }

    this.editor.pipeline.publish("history_update", { history: this.editor.history.history, location: this.editor.history.location });
  }
  async redo() {
    let event = this.editor.history.history[this.editor.history.location + 1];
    if (event == null) {
      return;
    }
    this.editor.history.location++;

    let keys = Object.keys(this.editor.selecting);
    let quill;
    switch (event.type) {
      case "update":
        for (let i = 0; i < event.redo.length; i++) {
          let change = event.redo[i];
          if (change.parent != null) {
            if (((this.editor.annotations[change.parent] ?? {}).render ?? { remove: true }).remove == true) {
              continue; // Parent annotation is missing, invalid save
            }
          }
          let annotation = this.editor.annotations[change._id] ?? {};
          if (annotation.component != null && annotation.component.quill != null) {
            if (annotation.component.quill.isEnabled() == true) {
              quill = annotation.component.quill;
              quill.keepTextSelectionActive = true;
              quill.disable();
              //await sleep(10);
            }
          }
          this.editor.selecting[change._id] = change;
        }
        break;
      case "remove": // Sort of Add
        for (let i = 0; i < event.redo.length; i++) {
          let saveAnno = event.redo[i];
          if (saveAnno.parent != null) {
            if (((this.editor.annotations[saveAnno.parent] ?? {}).render ?? { remove: true }).remove == true) {
              continue; // Parent annotation is missing, invalid save
            }
          }
          let oldID = saveAnno._id;
          let tempID = this.editor.render.tempID();
          for (let h = 0; h < this.editor.history.history.length; h++) {
            let event = this.editor.history.history[h];
            for (let c = 0; c < event.redo.length; c++) {
              let change = event.redo[c];
              if (change._id == oldID) {
                change._id = tempID;
              }
              if (change.parent == oldID) {
                change.parent = tempID;
              }
            }
            for (let c = 0; c < event.changes.length; c++) {
              let change = event.changes[c];
              if (change._id == oldID) {
                change._id = tempID;
              }
              if (change.parent == oldID) {
                change.parent = tempID;
              }
            }
          }
          this.editor.selecting[tempID] = copyObject({ ...saveAnno, _id: tempID });
        }
        break;
      case "add": // Sort of Remove
        for (let i = 0; i < event.redo.length; i++) {
          this.editor.selecting[event.redo[i]._id] = { remove: true };
        }
    }

    this.action = "save";
    await this.endAction({ sentKeys: keys, redrawActionBar: true, fromHistory: true });

    let caretPosition = (event.caret ?? {}).redoPosition;
    if (caretPosition != null && quill != null) {
      quill.enable();
      quill.setSelection(caretPosition.index, caretPosition.length);
      delete quill.keepTextSelectionActive;
    }

    this.editor.pipeline.publish("history_update", { history: this.editor.history.history, location: this.editor.history.location });
  }
}