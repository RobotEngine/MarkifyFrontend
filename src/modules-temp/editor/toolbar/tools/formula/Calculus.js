import { FormulaToolset } from "../../FormulaToolset";

export class Tool extends FormulaToolset {
  TOOLTIP = "Calculus";
  FORMULA_TYPE = "calculus";
  TOOLS = [
    { key: "doverdx", tooltip: "d/dx", write: "\\frac{d}{dx}" },
    { key: "interval", tooltip: "Interval", command: "\\int" },
    { key: "limit", tooltip: "Limit", write: "lim" },
    { key: "summation", tooltip: "Summation", command: "\\sum" },
    { key: "product", tooltip: "Product", command: "\\prod" },
    { key: "factorial", tooltip: "Factorial", write: "!" },
    { key: "dx", tooltip: "dx", write: "dx" },
    { key: "dy", tooltip: "dy", write: "dy" }
  ];

  html = `<div class="eSubToolFormulaCalculusContainer eHorizontalToolsHolder" keeptooltip></div>`;
  css = {
    ".eSubToolFormulaCalculusContainer": `flex-wrap: wrap; width: 184px; height: 94px; padding: 2px; overflow: auto; border-radius: inherit; justify-content: center`,
    ".eSubToolFormulaCalculusContainer .eTool": `height: 46px !important`,
    ".eSubToolFormulaCalculusContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaCalculusContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaCalculusContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
}