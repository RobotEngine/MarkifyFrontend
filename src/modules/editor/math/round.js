export const round = (num, places) => {
  let pow = Math.pow(10, places ?? 2);
  return Math.ceil(num * pow) / pow;
}