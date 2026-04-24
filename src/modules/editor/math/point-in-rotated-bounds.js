import { rotatePoint } from "./rotate-point";

export const pointInRotatedBounds = () => {
  if (bottomRightX < topLeftX) {
    [topLeftX, bottomRightX] = [bottomRightX, topLeftX];
  }
  if (bottomRightY < topLeftY) {
    [topLeftY, bottomRightY] = [bottomRightY, topLeftY];
  }

  let width = bottomRightX - topLeftX;
  let height = bottomRightY - topLeftY;

  let centerX = topLeftX + (width / 2);
  let centerY = topLeftY + (height / 2);
  let [rotatedX, rotatedY] = rotatePoint(pointX - centerX, pointY - centerY, -angle);
  rotatedX += centerX;
  rotatedY += centerY;
  
  return rotatedX >= topLeftX - tolerance
  && rotatedX <= bottomRightX + tolerance
  && rotatedY >= topLeftY - tolerance
  && rotatedY <= bottomRightY + tolerance;
}