export const perpendicularDistance = () => {
  return Math.abs(
    (lineEnd[1] - lineStart[1]) * point[0] - (lineEnd[0] - lineStart[0]) * point[1] +
    lineEnd[0] * lineStart[1] - lineEnd[1] * lineStart[0]) /
    Math.sqrt(Math.pow(lineEnd[1] - lineStart[1], 2) + Math.pow(lineEnd[0] - lineStart[0], 2)
  );
}