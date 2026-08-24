// LIBRARIES:
export const PDFJS = () => { return import("@/libraries/pdfjs/pdf.mjs"); };
export const PDFJS_WORKER = () => { return import("@/libraries/pdfjs/pdf.worker.mjs"); };
export const PDFJS_WORKER_PATH = () => { return import("@/libraries/pdfjs/pdf.worker.mjs?url"); };

export const QUILL = () => {
  return Promise.all([
    import("quill/core"),
    //import("quill/modules/keyboard"),
    import("quill/formats/bold"),
    import("quill/formats/italic"),
    import("quill/formats/underline"),
    import("quill/formats/strike"),
    import("quill/formats/link"),
    import("quill/formats/list"),
    import("quill/formats/indent")
  ]);
};

export const MATHQUILL = () => { return import("@/libraries/mathquill/mathquill.min.js"); };

// ADDITIONAL EDITOR MODULES:
export const REALTIME = () => { return import("./Realtime"); };
export const TOOLBAR = () => { return import("./Toolbar"); };

// EMOJI DATA:
export const EMOJIS = () => { return import("@modules/utility/emojis"); };