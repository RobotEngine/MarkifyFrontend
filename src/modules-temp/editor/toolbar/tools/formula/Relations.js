import { FormulaToolset } from "../../FormulaToolset";

export class Tool extends FormulaToolset {
  TOOLTIP = "Relations";
  FORMULA_TYPE = "relations";
  TOOLS = [
    { key: "in", tooltip: "Element Of", command: "\\in" },
    { key: "notin", tooltip: "Not an Element Of", command: "\\notin" },
    { key: "subset", tooltip: "Subset", command: "\\subset" },
    { key: "subsetequal", tooltip: "Subset or Equal To", command: "\\subseteq" },
    { key: "cup", tooltip: "Union", command: "\\cup" },
    { key: "cap", tooltip: "Intersection", command: "\\cap" },
    { key: "empty", tooltip: "Empty Set", command: "\\emptyset" },
    { key: "land", tooltip: "AND", command: "\\land" },
    { key: "lor", tooltip: "OR", command: "\\lor" },
    { key: "neg", tooltip: "NOT", command: "\\neg" },
    { key: "rightarrow", tooltip: "Implies", command: "\\Rightarrow" },
    { key: "leftarrow", tooltip: "Implied By", command: "\\Leftarrow" },
    { key: "leftrightarrow", tooltip: "If and Only If", command: "\\Leftrightarrow" },
    { key: "therefore", tooltip: "Therefore", command: "\\therefore" }
  ];

  html = `<div class="eSubToolFormulaRelationsContainer eHorizontalToolsHolder" keeptooltip></div>`;
  css = {
    ".eSubToolFormulaRelationsContainer": `flex-wrap: wrap; width: 322px; height: 92px; padding: 2px; overflow: auto; border-radius: inherit; justify-content: center`,
    ".eSubToolFormulaRelationsContainer .eTool": `height: 46px !important`,
    ".eSubToolFormulaRelationsContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaRelationsContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaRelationsContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
}