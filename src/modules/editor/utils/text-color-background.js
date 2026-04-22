import { contrastCheck } from "./contrast-check";

export const textColorBackground = () => {
  return (contrastCheck(bgColor) > 0.3) ? "#000" : "#fff"; // 0.179
}