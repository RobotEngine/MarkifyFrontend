export const PDFJS = () => { return import("@/libraries/pdfjs/pdf.mjs"); };
export const PDFJS_WORKER = () => { return import("@/libraries/pdfjs/pdf.worker.mjs"); };
export const PDFJS_WORKER_PATH = () => { return import("@/libraries/pdfjs/pdf.worker.mjs?url"); };

export const QUILL = () => { return import("Quill/core"); };

export const MATHQUILL = () => { return import("@/libraries/mathquill/mathquill.min.js"); };

export const EMOJIS = () => { return import("@modules/utility/emojis"); };