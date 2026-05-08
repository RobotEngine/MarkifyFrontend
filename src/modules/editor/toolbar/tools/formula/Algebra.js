import { FormulaToolset } from "../../FormulaToolset";

export class Tool extends FormulaToolset {
  TOOLTIP = "Algebra";
  FORMULA_TYPE = "algebra";
  TOOLS = [
    { key: "fraction", tooltip: "Fraction", command: "\\frac" },
    { key: "exponent", tooltip: "Exponent", command: "\\superscript" },
    { key: "subscript", tooltip: "Subscript", command: "\\subscript" },
    { key: "root", tooltip: "Square Root", command: "\\sqrt" },
    { key: "nroot", tooltip: "nth Root", command: "\\nthroot" },
    { key: "function", tooltip: "Function of X", write: "f\\left(x\\right)" },
    { key: "sin", tooltip: "Sine", write: "sin" },
    { key: "cos", tooltip: "Cosine", write: "cos" },
    { key: "tan", tooltip: "Tangent", write: "tan" },
    { key: "log", tooltip: "Log", write: "log" },
    { key: "ln", tooltip: "Natural Log", write: "ln" },
    { key: "exp", tooltip: "Exponential", write: "exp" }
  ];

  html = `<div class="eSubToolFormulaAlgebraContainer eHorizontalToolsHolder" keeptooltip></div>`;
  css = {
    ".eSubToolFormulaAlgebraContainer": `flex-wrap: wrap; width: 276px; height: 94px; padding: 2px; overflow: auto; border-radius: inherit; justify-content: center`,
    ".eSubToolFormulaAlgebraContainer .eTool": `height: 46px !important`,
    ".eSubToolFormulaAlgebraContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaAlgebraContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaAlgebraContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
}