export const lowPassFilter = (newPoint, prevPoint, alpha = 0.25) => {
  if (!prevPoint) return newPoint;
  let x = prevPoint[0] + alpha * (newPoint[0] - prevPoint[0]);
  let y = prevPoint[1] + alpha * (newPoint[1] - prevPoint[1]);
  return [x, y];
}