export const rotatePoint = (pointX, pointY, angle = 0) => {
  if (angle == 0) {
    return [pointX, pointY];
  }
  let radian = angle * (Math.PI / 180);
  let cos = Math.cos(radian);
  let sin = Math.sin(radian);
  let newX = (cos * pointX) - (sin * pointY);
  let newY = (sin * pointX) + (cos * pointY);
  return [newX, newY];
}