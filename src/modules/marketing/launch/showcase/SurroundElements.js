import {
  head,
  body,
  app,
  PageFrame,
  fixed,
  favicon,

  assetURL,

  userID,
  account,

  changeGlobalImports,
  mouseDown,
  appendCSS,
  setPage,
  setFrame,
  sleep,
  cleanString,
  uncleanString,
  hash,
  timeSince,
  formatFullDate,
  addS,
  getParam,
  modifyParams,
  getEpoch,
  checkForAuth,
  sendRequest,
  socket,
  connected,
  subscribe,
  getLocalStore,
  setLocalStore,
  getObject,
  copyObject,
  objectUpdate,
  objectEqual,
  getTheme,
  textBoxError,
  clipBoardRead
} from "@/crucial";

import { FloatingElements } from "../../effects/FloatingElements";

import force from "@assets/marketing/launch/showcase/elements/force.svg?raw";
import photosynthesis from "@assets/marketing/launch/showcase/elements/photosynthesis.svg?raw";
import yintercept from "@assets/marketing/launch/showcase/elements/yintercept.svg?raw";
import pythagoreantheorem from "@assets/marketing/launch/showcase/elements/pythagoreantheorem.svg?raw";
import hydrogenFormula from "@assets/marketing/launch/showcase/elements/hydrogenformula.svg?raw";

import greensticky from "@assets/marketing/launch/showcase/elements/greensticky.svg?raw";
import yellowsticky from "@assets/marketing/launch/showcase/elements/yellowsticky.svg?raw";
import redsticky from "@assets/marketing/launch/showcase/elements/redsticky.svg?raw";

import circle from "@assets/marketing/launch/showcase/elements/circle.svg?raw";
import square from "@assets/marketing/launch/showcase/elements/square.svg?raw";
import triangle from "@assets/marketing/launch/showcase/elements/triangle.svg?raw";

import widget from "@assets/marketing/launch/showcase/elements/widget.svg?raw";

export class Frame {
  html = ``;
  css = {};

  js(frame) {
    frame.style.width = "100%";
    frame.style.height = "100%";

    let manager = new FloatingElements("overviewFloatingElements", this.parent.parent.pipeline, {
      container: frame,
      flyToCenter: true,
      scrollFade: true,
      scrollShrink: true
    });

    manager.createElement({
      x: 8,
      y: 14,
      width: 130,
      rotateZ: -8,
      svg: force
    });
    manager.createElement({
      x: 28,
      y: 14,
      width: 200,
      rotateZ: -4,
      svg: photosynthesis
    });
    manager.createElement({
      x: 50,
      y: 14,
      width: 180,
      rotateZ: 2,
      svg: yintercept
    });
    manager.createElement({
      x: 70,
      y: 14,
      width: 180,
      rotateZ: 4,
      svg: pythagoreantheorem
    });
    manager.createElement({
      x: 90,
      y: 14,
      width: 200,
      rotateZ: 8,
      svg: hydrogenFormula
    });

    manager.createElement({
      x: 8,
      y: 40,
      width: 180,
      rotateZ: -5,
      svg: greensticky
    });
    manager.createElement({
      x: 8,
      y: 64,
      width: 180,
      rotateZ: 5,
      svg: yellowsticky
    });
    manager.createElement({
      x: 8,
      y: 88,
      width: 180,
      rotateZ: -5,
      svg: redsticky
    });
    
    manager.createElement({
      x: 92,
      y: 36,
      width: 110,
      rotateZ: -12,
      svg: circle
    });
    manager.createElement({
      x: 86,
      y: 48,
      width: 110,
      rotateZ: 6,
      svg: square
    });
    manager.createElement({
      x: 92,
      y: 60,
      width: 110,
      rotateZ: -16,
      svg: triangle
    });
    
    manager.createElement({
      x: 88,
      y: 84,
      width: 260,
      rotateZ: 6,
      svg: widget
    });
  }
}