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