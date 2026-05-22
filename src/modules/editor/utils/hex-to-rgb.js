export const hexToRGB = (hex) => {
  if (hex.length < 4) {
    hex = hex.split("").map((hexVal) => { return hexVal + hexVal }).join("");
  }
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}