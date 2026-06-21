export const defaultPreferences = {
  tools: {

    // Primary Tools //
    selection: {
      subtool: "select"
    },
    markup: {
      subtool: "highlighter"
      //subtool: "pen"
    },
    text: {
      subtool: "text",
      color: {
        selected: "0084FF",
        options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
      },
      opacity: 100,
      font: "montserrat",
      size: 18,
      align: "center"
    },
    draw: {
      subtool: "pen"
    },
    shape: {
      subtool: "square",
      color: {
        selected: "FF4C6C",
        options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
      },
      thickness: 8,
      opacity: 100,
      filled: false
    },
    sticky: {
      color: {
        selected: "FADCA0",
        options: ["88B4FA", "F49CA9", "FADCA0", "E4B8FB", "A1D8AF", "F285B8", "666666"]
      },
      font: "montserrat",
      size: 16,
      align: "left"
    },
    page: {
      color: {
        selected: "2F2F2F",
        options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "2F2F2F"]
      },
      size: [824, 1064]
    },
    media: {},
    options: {
      colorpicker: {
        scale: 0
      }
    },

    // Subtools //
    pen: {
      color: {
        selected: "DF84FF",
        options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
      },
      thickness: 4,
      opacity: 100
    },
    highlighter: {
      color: {
        selected: "FFC24A",
        options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
      },
      thickness: 16,
      opacity: 50
    },
    understrike: {
      color: {
        selected: "34C172",
        options: ["0084FF", "FF4C6C", "FFC24A", "DF84FF", "34C172", "FF008A", "000"]
      },
      thickness: 4,
      opacity: 100
    }
  }
};