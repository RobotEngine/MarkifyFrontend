import { FormulaToolset } from "../../FormulaToolset";

export class Tool extends FormulaToolset {
  TOOLTIP = "Notation";
  FORMULA_TYPE = "notation";
  TOOLS = [
    { key: "bar", tooltip: "Bar", command: "\\bar" },
    { key: "hat", tooltip: "Hat", command: "\\hat" },
    { key: "vector", tooltip: "Vector", command: "\\vec" },
    { key: "rightarrow", tooltip: "Right Arrow", command: "\\rightarrow" },
    { key: "leftarrow", tooltip: "Left Arrow", command: "\\leftarrow" },
    { key: "leftrightarrow", tooltip: "Double Arrow", command: "\\leftrightarrow" },
    { key: "equivalent", tooltip: "Equivalent", command: "\\equiv" },
    { key: "congruent", tooltip: "Congruent", command: "\\cong" },
    { key: "notcongruent", tooltip: "Not Congruent", command: "\\ncong" },
    { key: "degree", tooltip: "Degree", command: "\\degree" },
    { key: "angle", tooltip: "Angle", command: "\\angle" },
    { key: "rightangle", tooltip: "Right Angle", write: "∟" },
    { key: "sphericalangle", tooltip: "Spherical Angle", write: "∢" },
    { key: "measuredangle", tooltip: "Measured Angle", command: "\\measuredangle" },
    { key: "perpendicular", tooltip: "Perpendicular", command: "\\perp" },
    { key: "parallel", tooltip: "Parallel", command: "\\parallel" }
  ];

  html = `<div class="eSubToolFormulaNotationContainer eHorizontalToolsHolder" keeptooltip></div>`;
  css = {
    ".eSubToolFormulaNotationContainer": `flex-wrap: wrap; width: 184px; height: 184px; padding: 2px; overflow: auto; border-radius: inherit; justify-content: center`,
    ".eSubToolFormulaNotationContainer .eTool": `height: 46px !important`,
    ".eSubToolFormulaNotationContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaNotationContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaNotationContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
}