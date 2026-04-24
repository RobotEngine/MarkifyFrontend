export const horizontalLine = (points = []) => {
  if (Math.abs(points[1] - points[3]) < 15) {
    return true;
  }
  return false;
}