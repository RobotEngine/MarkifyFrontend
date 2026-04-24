import { perpendicularDistance } from "./perpendicular-distance";

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