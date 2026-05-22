import { contrastCheck } from "./contrast-check";

export const textColorBackground = (bgColor) => {
  return (contrastCheck(bgColor) > 0.3) ? "#000" : "#fff"; // 0.179
}