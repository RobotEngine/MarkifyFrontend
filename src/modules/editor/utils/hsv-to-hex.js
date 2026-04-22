import { hslToHex } from "./hsl-to-hex";

export const hsvToHex = (h, s, b) => {
  let x = (200 - s) * b / 100;
  s = x === 0 || x === 200 ? 0 : Math.round(s * b / (x <= 100 ? x : 200 - x));
  let l = Math.round(x / 2);
  return hslToHex(h, s, l);
}