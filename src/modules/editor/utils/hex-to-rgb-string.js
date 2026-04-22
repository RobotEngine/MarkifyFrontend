export const hexToRGBString = (hex, alpha) => {
  if (hex == null) {
    return "";
  }
  if (hex.startsWith("#") == true) {
    hex = hex.substring(1);
  }
  if (hex.length < 4) {
    hex = hex + hex;
  }
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  if (alpha != null) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}