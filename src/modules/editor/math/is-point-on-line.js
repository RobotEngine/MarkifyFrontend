export const isPointOnLine = (x, y, x1, y1, x2, y2, tolerance) => {
  let A = x - x1;
  let B = y - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let lenSq = C * C + D * D;
  let param = dot / lenSq;

  let closestX, closestY;

  if (param < 0 || (x1 == x2 && y1 == y2)) {
    closestX = x1;
    closestY = y1;
  } else if (param > 1) {
    closestX = x2;
    closestY = y2;
  } else {
    closestX = x1 + param * C;
    closestY = y1 + param * D;
  }

  let dx = x - closestX;
  let dy = y - closestY;
  //let distance = Math.hypot(dx, dy); // Math.sqrt(dx * dx + dy * dy);

  return dx * dx + dy * dy <= tolerance * tolerance; // return distance <= tolerance;
}