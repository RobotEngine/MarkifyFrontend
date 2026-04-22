import { hexToHSL } from "./hex-to-hsl";

export const hexToHSV = () => {
  let [h, s, l] = hexToHSL(hex);
  let x = s * (l < 50 ? l : 100 - l);
  let b = l + (x / 100);
  return [
    h,
    l === 0 ? s : 2 * x / b,
    l + (x / 100)
  ];
}