// LIBRARIES:
export const PDFJS = () => { return import("@/libraries/pdfjs/pdf.mjs"); };
export const PDFJS_WORKER = () => { return import("@/libraries/pdfjs/pdf.worker.mjs"); };
export const PDFJS_WORKER_PATH = () => { return import("@/libraries/pdfjs/pdf.worker.mjs?url"); };

export const QUILL = () => { return import("quill/core"); };

export const MATHQUILL = () => { return import("@/libraries/mathquill/mathquill.min.js"); };

// ADDITIONAL EDITOR MODULES:
export const REALTIME = () => { return import("./Realtime"); };
export const TOOLBAR = () => { return import("./Toolbar"); };

// EMOJI DATA:
export const EMOJIS = () => { return import("@modules/utility/emojis"); };