import { rgbStringToHex } from "./rgb-string-to-hex";
import { contrastCheck } from "./contrast-check";
import { lightenHex } from "./lighten-hex";
import { darkenHex } from "./darken-hex";

export const borderColorBackground = (color, bgColor, percent = 20) => {
  bgColor = bgColor ?? rgbStringToHex(
    getComputedStyle(this.page ?? body).getPropertyValue("--pageColor")
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