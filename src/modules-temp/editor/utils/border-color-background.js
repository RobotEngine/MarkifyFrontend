import { body } from "../../../crucial";

import { rgbStringToHex } from "./rgb-string-to-hex";
import { contrastCheck } from "./contrast-check";
import { lightenHex } from "./lighten-hex";
import { darkenHex } from "./darken-hex";

export const borderColorBackground = (color, bgColor, percent = 20) => {
  let testElement = body;
  if (bgColor != null && typeof bgColor != "string") {
    testElement = bgColor;
    bgColor = null;
  }
  bgColor = bgColor ?? rgbStringToHex(
    getComputedStyle(testElement).getPropertyValue("--pageColor")
  );
  if (contrastCheck(bgColor) == true) {
    if (contrastCheck(color) == false) {
      return "#" + lightenHex(color, percent);
    } else {
      return "#" + darkenHex(color, percent);
    }
  } else {
    if (contrastCheck(color) == true) {
      return "#" + darkenHex(color, percent);
    } else {
      return "#" + lightenHex(color, percent);
    }
  }
}