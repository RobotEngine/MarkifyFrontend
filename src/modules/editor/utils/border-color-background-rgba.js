import { hexToRGBString } from "./hex-to-rgb-string";
import { borderColorBackground } from "./border-color-background";

export const borderColorBackgroundRGBA = (color, bgColor, opacity) => {
  return hexToRGBString(
    borderColorBackground(color, bgColor),
    opacity ?? 1
  );
}