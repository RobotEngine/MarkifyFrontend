export const distance = (ax, ay, bx, by) => {
  return ((ay - by) ** 2 + (ax - bx) ** 2) ** 0.5;
}

export const horizontalLine = (points = []) => {
  if (Math.abs(points[1] - points[3]) < 15) {
    return true;
  }
  return false;
}

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

export const lowPassFilter = (newPoint, prevPoint, alpha = 0.25) => {
  if (!prevPoint) return newPoint;
  let x = prevPoint[0] + alpha * (newPoint[0] - prevPoint[0]);
  let y = prevPoint[1] + alpha * (newPoint[1] - prevPoint[1]);
  return [x, y];
}

export const perpendicularDistance = (point, lineStart, lineEnd) => {
  return Math.abs(
    (lineEnd[1] - lineStart[1]) * point[0] - (lineEnd[0] - lineStart[0]) * point[1] +
    lineEnd[0] * lineStart[1] - lineEnd[1] * lineStart[0]) /
    Math.sqrt(Math.pow(lineEnd[1] - lineStart[1], 2) + Math.pow(lineEnd[0] - lineStart[0], 2)
  );
}

export const simplifyPath = (points, epsilon) => {
  if (points.length <= 2) {
    return points;
  }

  let dmax = 0;
  let index = 0;

  for (let i = 2; i < points.length - 2; i += 2) {
    let d = perpendicularDistance(points.slice(i, i + 2), points.slice(0, 2), points.slice(-2));
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }

  if (dmax > epsilon) {
    let left = simplifyPath(points.slice(0, index + 2), epsilon);
    let right = simplifyPath(points.slice(index), epsilon);
    return left.slice(0, left.length - 2).concat(right);
  } else {
    if (points[0] !== points[points.length - 2] || points[1] !== points[points.length - 1]) {
      return [points[0], points[1], points[points.length - 2], points[points.length - 1]];
    } else {
      return [points[0], points[1]];
    }
  }
}

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

export const rotatePointOrigin = (pointX, pointY, centerX, centerY, angle) => {
  let rotatedPoint = rotatePoint(pointX - centerX, pointY - centerY, angle);
  return [
    rotatedPoint[0] + centerX,
    rotatedPoint[1] + centerY
  ];
}

export const pointInRotatedBounds = (pointX, pointY, topLeftX, topLeftY, bottomRightX, bottomRightY, angle = 0, tolerance = 0) => {
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

export const relativelyStraight = (coordinates, tolerance) => {
  // Extract pairs of points from the coordinates array
  let points = [];
  for (let i = 0; i < coordinates.length; i += 2) {
    points.push([coordinates[i], coordinates[i + 1]]);
  }

  // Calculate the slope between consecutive pairs of points
  let slope = null;
  for (let i = 0; i < points.length - 1; i++) {
    let [x1, y1] = points[i];
    let [x2, y2] = points[i + 1];

    let newSlope = (y2 - y1) / (x2 - x1);

    if (isFinite(newSlope)) {
      if (Math.abs(slope - newSlope) > tolerance) {
        return false; // Slopes differ significantly
      }

      slope = newSlope;
    }
  }

  return true; // All slopes are consistent
}

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

export const round = (num, places) => {
  let pow = Math.pow(10, places ?? 2);
  return Math.ceil(num * pow) / pow;
}