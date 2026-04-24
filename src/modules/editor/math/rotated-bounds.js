export const rotatedBounds = (topLeftX, topLeftY, bottomRightX, bottomRightY, angle) => {
  if (bottomRightX < topLeftX) {
    [topLeftX, bottomRightX] = [bottomRightX, topLeftX];
  }
  if (bottomRightY < topLeftY) {
    [topLeftY, bottomRightY] = [bottomRightY, topLeftY];
  }
  
  let width = bottomRightX - topLeftX;
  let height = bottomRightY - topLeftY;
  let radian = (angle ?? 0) * (Math.PI / 180);

  let changedWidth = ((Math.abs(width * Math.cos(radian)) + Math.abs(height * Math.sin(radian))) - width) / 2;
  let changedHeight = ((Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian))) - height) / 2;
  
  return [topLeftX - changedWidth, topLeftY - changedHeight, bottomRightX + changedWidth, bottomRightY + changedHeight];
}