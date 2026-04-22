import { rgbToHex } from "./rgb-to-hex";

export const rgbStringToHex = () => {
  let rgb = string.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return rgbToHex(rgb[1], rgb[2], rgb[3]);
}