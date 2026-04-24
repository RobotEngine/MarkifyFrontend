import { rotatePoint } from "./rotate-point";

export const rotatePointOrigin = (pointX, pointY, centerX, centerY, angle) => {
  let rotatedPoint = rotatePoint(pointX - centerX, pointY - centerY, angle);
  return [
    rotatedPoint[0] + centerX,
    rotatedPoint[1] + centerY
  ];
}