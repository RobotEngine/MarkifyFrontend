import selectIcon from "../icons/toolbar/select.svg?raw";
import panIcon from "../icons/toolbar/pan.svg?raw";
import dragIcon from "../icons/toolbar/drag.svg?raw";

import drawIcon from "../icons/toolbar/draw.svg?raw";
import penIcon from "../icons/toolbar/pen.svg?raw";

import markupIcon from "../icons/toolbar/markup.svg?raw";
import highlighterIcon from "../icons/toolbar/highlighter.svg?raw";
import understrikeIcon from "../icons/toolbar/understrike.svg?raw";

import eraseIcon from "../icons/toolbar/erase.svg?raw";

import textIcon from "../icons/toolbar/text.svg?raw";
import equationIcon from "../icons/toolbar/equation.svg?raw";

import shapeIcon from "../icons/toolbar/shape.svg?raw";
import squareIcon from "../icons/toolbar/square.svg?raw";
import ellipseIcon from "../icons/toolbar/ellipse.svg?raw";
import triangleIcon from "../icons/toolbar/triangle.svg?raw";
import parallelogramIcon from "../icons/toolbar/parallelogram.svg?raw";
import trapezoidIcon from "../icons/toolbar/trapezoid.svg?raw";
import rhombusIcon from "../icons/toolbar/rhombus.svg?raw";
import ovalIcon from "../icons/toolbar/oval.svg?raw";
import arrowIcon from "../icons/toolbar/arrow.svg?raw";
import starIcon from "../icons/toolbar/star.svg?raw";
import plusIcon from "../icons/toolbar/plus.svg?raw";
import heartIcon from "../icons/toolbar/heart.svg?raw";
import speechIcon from "../icons/toolbar/speech.svg?raw";
import polygonIcon from "../icons/toolbar/polygon.svg?raw";
import lineIcon from "../icons/toolbar/line.svg?raw";

import stickyIcon from "../icons/toolbar/sticky.svg?raw";

import commentIcon from "../icons/toolbar/comment.svg?raw";

import pageIcon from "../icons/toolbar/page.svg?raw";

import mediaIcon from "../icons/toolbar/media.svg?raw";
import uploadIcon from "../icons/toolbar/upload.svg?raw";
import embedIcon from "../icons/toolbar/embed.svg?raw";

export const toolbars = {
  editor: `<div class="eToolbarContent eVerticalToolsHolder hideScroll">
    <button class="eTool" tool="selection" tooltip="Selection" selected><div>${selectIcon}</div></button>
    <button class="eTool" tool="draw" tooltip="Draw"><div>${drawIcon}</div></button>
    <button class="eTool" tool="markup" tooltip="Markup"><div>${markupIcon}</div></button>
    <button class="eTool" tool="erase" tooltip="Erase"><div>${eraseIcon}</div></button>
    <button class="eTool" tool="text" tooltip="Text Box"><div>${textIcon}</div></button>
    <button class="eTool" tool="shape" tooltip="Shapes"><div>${shapeIcon}</div></button>
    <button class="eTool" tool="sticky" tooltip="Stickies"><div>${stickyIcon}</div></button>
    <button class="eTool" tool="comment" tooltip="Comments"><div>${commentIcon}</div></button>
    <button class="eTool" tool="page" tooltip="Page"><div>${pageIcon}</div></button>
    <button class="eTool" tool="media" tooltip="Media"><div>${mediaIcon}</div></button>
  </div>`,

  viewer: `<div class="eToolbarContent eVerticalToolsHolder">
    <button class="eTool" tool="select" tooltip="Select" selected><div>${selectIcon}</div></button>
    <button class="eTool" tool="pan" tooltip="Pan"><div>${panIcon}</div></button>
  </div>`
};

export const tools = {
  "selection": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="select" tooltip="Select" module="selection/select"><div>${selectIcon}</div></button>
      <button class="eTool" tool="pan" tooltip="Pan" module="selection/pan"><div>${panIcon}</div></button>
      <button class="eTool" tool="drag" tooltip="Multi-Select" module="selection/drag"><div>${dragIcon}</div></button>
    </div>`
  },
  "draw": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="pen" tooltip="Pen" module="markup/pen"><div>${penIcon}</div></button>
      <div class="eDivider"></div>
      <button class="eTool" option="color" tooltip="Color" module="color"><div></div></button>
      <button class="eTool" option="thickness" tooltip="Thickness" module="thickness"><div></div></button>
      <button class="eTool" option="opacity" tooltip="Opacity" module="opacity"><div></div></button>
    </div>`
  },
  "markup": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="highlighter" tooltip="Highlighter" module="markup/highlighter"><div>${highlighterIcon}</div></button>
      <button class="eTool" tool="understrike" tooltip="Underline" module="markup/understrike"><div>${understrikeIcon}</div></button>
      <div class="eDivider"></div>
      <button class="eTool" option="color" tooltip="Color" module="color"><div></div></button>
      <button class="eTool" option="thickness" tooltip="Thickness" module="thickness"><div></div></button>
      <button class="eTool" option="opacity" tooltip="Opacity" module="opacity"><div></div></button>
    </div>`
  },
  "erase": { id: "erase", type: "tool", module: "markup/eraser" },
  "text": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="text" tooltip="Text" module="text/textbox"><div>${textIcon}</div></button>
      <button class="eTool" tool="equation" tooltip="Equation" module="text/equation"><div>${equationIcon}</div></button>
    </div>`
  },
  "shape": {
    html: `<div class="eVerticalToolsHolder eVerticalToolsShapeContainer">
      <button class="eTool" tool="square" tooltip="Square" module="shapes/shape"><div>${squareIcon}</div></button>
      <button class="eTool" tool="ellipse" tooltip="Ellipse" module="shapes/shape"><div>${ellipseIcon}</div></button>
      <button class="eTool" tool="triangle" tooltip="Triangle" module="shapes/shape"><div>${triangleIcon}</div></button>
      <button class="eTool" tool="parallelogram" tooltip="Parallelogram" module="shapes/shape"><div>${parallelogramIcon}</div></button>
      <button class="eTool" tool="trapezoid" tooltip="Trapezoid" module="shapes/shape"><div>${trapezoidIcon}</div></button>
      <button class="eTool" tool="rhombus" tooltip="Rhombus" module="shapes/shape"><div>${rhombusIcon}</div></button>
      <button class="eTool" tool="oval" tooltip="Oval" module="shapes/oval"><div>${ovalIcon}</div></button>
      <button class="eTool" tool="arrow" tooltip="Arrow" module="shapes/arrow"><div>${arrowIcon}</div></button>
      <button class="eTool" tool="star" tooltip="Star" module="shapes/star"><div>${starIcon}</div></button>
      <button class="eTool" tool="plus" tooltip="Plus" module="shapes/shape"><div>${plusIcon}</div></button>
      <button class="eTool" tool="heart" tooltip="Heart" module="shapes/shape"><div>${heartIcon}</div></button>
      <button class="eTool" tool="speech" tooltip="Speech" module="shapes/shape"><div>${speechIcon}</div></button>
      <button class="eTool" tool="polygon" tooltip="Polygon" module="shapes/polygon"><div>${polygonIcon}</div></button>
      <button class="eTool" tool="line" tooltip="Line" module="shapes/shape"><div>${lineIcon}</div></button>
    </div>`
  },
  "sticky": { id: "sticky", type: "tool", module: "sticky" },
  "comment": { id: "comment", type: "tool", module: "comment" },
  "page": { id: "page", type: "tool", module: "page" },
  "media": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="upload" tooltip="Upload Image" module="media/upload"><div>${uploadIcon}</div></button>
      <button class="eTool" tool="embed" tooltip="Embed" module="media/embed"><div>${embedIcon}</div></button>
    </div>`
  },

  // Viewer Toolbar:
  "select": { id: "select", type: "tool", module: "selection/select" },
  "pan": { id: "pan", type: "tool", module: "selection/pan" }
};

export const mappedToolTypes = {
  draw: ["pen"],
  markup: ["markup"],
  shape: ["shape"],
  text: ["text"],
  sticky: ["sticky"],
  page: ["page"],
  media: ["media", "embed"]
};