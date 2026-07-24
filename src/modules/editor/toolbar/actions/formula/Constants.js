import { FormulaToolset } from "../../FormulaToolset";

export class Tool extends FormulaToolset {
  TOOLTIP = "Constants";
  FORMULA_TYPE = "constants";
  TOOLS = [
    { key: "alpha", tooltip: "alpha", command: "\\alpha" },
    { key: "beta", tooltip: "beta", command: "\\beta" },
    { key: "gamma", tooltip: "gamma", command: "\\gamma" },
    { key: "delta", tooltip: "delta", command: "\\delta" },
    { key: "theta", tooltip: "theta", command: "\\theta" },
    { key: "lambda", tooltip: "lambda", command: "\\lambda" },
    { key: "mu", tooltip: "mu", command: "\\mu" },
    { key: "sigma", tooltip: "sigma", command: "\\sigma" },
    { key: "phi", tooltip: "phi", command: "\\phi" },
    { key: "omega", tooltip: "omega", command: "\\omega" },
    { key: "uppergamma", tooltip: "Gamma", command: "\\Gamma" },
    { key: "upperdelta", tooltip: "Delta", command: "\\Delta" },
    { key: "uppersigma", tooltip: "Sigma", command: "\\Sigma" },
    { key: "upperomega", tooltip: "Omega", command: "\\Omega" },
    { key: "pi", tooltip: "pi", command: "\\pi" },
    { key: "e", tooltip: "e", write: "e" },
    { key: "i", tooltip: "i", write: "i" },
    { key: "infinity", tooltip: "Infinity", command: "\\infty" }
  ];

  html = `<div class="eSubToolFormulaGreekContainer eHorizontalToolsHolder" keeptooltip></div>`;
  css = {
    ".eSubToolFormulaGreekContainer": `flex-wrap: wrap; width: 276px; height: 138px; padding: 2px; overflow: auto; border-radius: inherit; justify-content: center`,
    ".eSubToolFormulaGreekContainer .eTool": `height: 46px !important`,
    ".eSubToolFormulaGreekContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaGreekContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaGreekContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
}