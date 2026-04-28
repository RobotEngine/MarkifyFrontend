export const toolbars = {
  editor: `<div class="eToolbarContent eVerticalToolsHolder hideScroll">
    <button class="eTool" tool="selection" tooltip="Selection" selected><div></div></button>
    <button class="eTool" tool="draw" tooltip="Draw"><div></div></button>
    <button class="eTool" tool="markup" tooltip="Markup"><div></div></button>
    <button class="eTool" tool="erase" tooltip="Erase"><div></div></button>
    <button class="eTool" tool="text" tooltip="Text Box"><div></div></button>
    <button class="eTool" tool="shape" tooltip="Shapes"><div></div></button>
    <button class="eTool" tool="sticky" tooltip="Stickies"><div></div></button>
    <button class="eTool" tool="comment" tooltip="Comments"><div></div></button>
    <button class="eTool" tool="page" tooltip="Page"><div></div></button>
    <button class="eTool" tool="media" tooltip="Media"><div></div></button>
  </div>`,

  viewer: `<div class="eToolbarContent eVerticalToolsHolder">
    <button class="eTool" tool="raisehand" tooltip="Raise Hand" noselect style="--theme: var(--green); --hoverColor: rgba(var(--greenRGB), .3)"><div></div></button>
    <div class="eDivider"></div>
    <button class="eTool" tool="select" tooltip="Select" selected><div></div></button>
    <button class="eTool" tool="pan" tooltip="Pan"><div></div></button>
  </div>`
};

export const tools = {
  "selection": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="select" tooltip="Select" module="editor/toolbar/select"><div></div></button>
      <button class="eTool" tool="pan" tooltip="Pan" module="editor/toolbar/pan"><div></div></button>
      <button class="eTool" tool="drag" tooltip="Multi-Select" module="editor/toolbar/drag"><div></div></button>
    </div>`
  },
  "draw": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="pen" tooltip="Pen" module="editor/toolbar/pen"><div></div></button>
      <div class="eDivider"></div>
      <button class="eTool" option="color" tooltip="Color" module="editor/toolbar/color"><div></div></button>
      <button class="eTool" option="thickness" tooltip="Thickness" module="editor/toolbar/thickness"><div></div></button>
      <button class="eTool" option="opacity" tooltip="Opacity" module="editor/toolbar/opacity"><div></div></button>
    </div>`
  },
  "markup": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="highlighter" tooltip="Highlighter" module="editor/toolbar/highlighter"><div></div></button>
      <button class="eTool" tool="understrike" tooltip="Underline" module="editor/toolbar/understrike"><div></div></button>
      <div class="eDivider"></div>
      <button class="eTool" option="color" tooltip="Color" module="editor/toolbar/color"><div></div></button>
      <button class="eTool" option="thickness" tooltip="Thickness" module="editor/toolbar/thickness"><div></div></button>
      <button class="eTool" option="opacity" tooltip="Opacity" module="editor/toolbar/opacity"><div></div></button>
    </div>`
  },
  "erase": { id: "erase", type: "tool", module: "editor/toolbar/eraser" },
  //"text": { id: "text", type: "tool", module: "editor/toolbar/text" },
  "text": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="text" tooltip="Text" module="editor/toolbar/text"><div></div></button>
      <button class="eTool" tool="equation" tooltip="Equation" module="editor/toolbar/equation"><div></div></button>
    </div>`
  },
  "shape": {
    html: `<div class="eVerticalToolsHolder eVerticalToolsShapeContainer">
      <button class="eTool" tool="square" tooltip="Square" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="ellipse" tooltip="Ellipse" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="triangle" tooltip="Triangle" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="parallelogram" tooltip="Parallelogram" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="trapezoid" tooltip="Trapezoid" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="rhombus" tooltip="Rhombus" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="oval" tooltip="Oval" module="editor/toolbar/shape/oval"><div></div></button>
      <button class="eTool" tool="arrow" tooltip="Arrow" module="editor/toolbar/shape/arrow"><div></div></button>
      <button class="eTool" tool="star" tooltip="Star" module="editor/toolbar/shape/star"><div></div></button>
      <button class="eTool" tool="plus" tooltip="Plus" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="heart" tooltip="Heart" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="speech" tooltip="Speech" module="editor/toolbar/shape"><div></div></button>
      <button class="eTool" tool="polygon" tooltip="Polygon" module="editor/toolbar/shape/polygon"><div></div></button>
      <button class="eTool" tool="line" tooltip="Line" module="editor/toolbar/shape"><div></div></button>
    </div>`
  },
  "sticky": { id: "sticky", type: "tool", module: "editor/toolbar/sticky" },
  "comment": { id: "comment", type: "tool", module: "editor/toolbar/comment" },
  "page": { id: "page", type: "tool", module: "editor/toolbar/page" },
  "media": {
    html: `<div class="eVerticalToolsHolder">
      <button class="eTool" tool="upload" tooltip="Upload Image" module="editor/toolbar/upload"><div></div></button>
      <button class="eTool" tool="embed" tooltip="Embed" module="editor/toolbar/embed"><div></div></button>
    </div>`
  },

  // Viewer Toolbar:
  "select": { id: "select", type: "tool", module: "editor/toolbar/select" },
  "pan": { id: "pan", type: "tool", module: "editor/toolbar/pan" }
};

export const mappedToolTypes = {
  draw: ["draw"],
  markup: ["markup"],
  shape: ["shape"],
  text: ["text"],
  sticky: ["sticky"],
  page: ["page"],
  media: ["media", "embed"]
};