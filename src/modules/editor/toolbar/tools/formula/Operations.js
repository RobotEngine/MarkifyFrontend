import { FormulaToolset } from "../../FormulaToolset";

export class Tool extends FormulaToolset {
  TOOLTIP = "Operations";
  FORMULA_TYPE = "operations";
  TOOLS = [
    { key: "equal", tooltip: "Equal", write: "=" },
    { key: "plus", tooltip: "Plus", write: "+" },
    { key: "minus", tooltip: "Minus", write: "-" },
    { key: "multiply", tooltip: "Multipy", command: "\\times" },
    { key: "divide", tooltip: "Divide", command: "\\divide" },
    { key: "notequal", tooltip: "Not Equal", command: "\\neq" },
    { key: "lessthan", tooltip: "Less Than", write: "<" },
    { key: "lessthanequalto", tooltip: "Less Than Equal To", command: "\\leq" },
    { key: "greaterthan", tooltip: "Greater Than", write: ">" },
    { key: "greaterthanequalto", tooltip: "Greater Than Equal To", command: "\\geq" },
    { key: "approxequal", tooltip: "Approximately Equal", command: "\\approx" },
    { key: "parentheses", tooltip: "Parentheses", write: "\\left(\\right)", moveLeft: true },
    { key: "brackets", tooltip: "Brackets", write: "\\left[\\right]", moveLeft: true },
    { key: "braces", tooltip: "Braces", write: "\\left\\{\\right\\}", moveLeft: true },
    { key: "absolutevalue", tooltip: "Absolute Value", write: "\\left|\\right|", moveLeft: true },
    //{ key: "decimalpoint", tooltip: "Decimal Point", write: "." },
    //{ key: "fraction", tooltip: "Fraction", command: "\\frac" },
    //{ key: "exponent", tooltip: "Exponent", command: "\\superscript" },
    //{ key: "root", tooltip: "Square Root", command: "\\sqrt" },
    //{ key: "factorial", tooltip: "Factorial", write: "!" }
  ];
  
  html = `<div class="eSubToolFormulaOperationsContainer eHorizontalToolsHolder" keeptooltip></div>`;
  css = {
    ".eSubToolFormulaOperationsContainer": `flex-wrap: wrap; width: 230px; height: 138px; padding: 2px; overflow: auto; border-radius: inherit; justify-content: center`,
    ".eSubToolFormulaOperationsContainer .eTool": `height: 46px !important`,
    ".eSubToolFormulaOperationsContainer .eTool:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaOperationsContainer .eTool[selected]:active > div": `border-radius: 15.5px !important`,
    ".eSubToolFormulaOperationsContainer .eTool[selected] > div": `background: var(--theme) !important`
  };
}