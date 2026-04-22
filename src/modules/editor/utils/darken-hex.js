export const darkenHex = (hexCode, percent) => {
  // Ensure the percent is within the valid range [0, 100]
  percent = Math.max(0, Math.min(100, percent));

  // Convert hex code to RGB
  let r = parseInt(hexCode.slice(0, 2), 16);
  let g = parseInt(hexCode.slice(2, 4), 16);
  let b = parseInt(hexCode.slice(4, 6), 16);

  // Calculate darkening factor
  let factor = 1 - percent / 100;

  // Darken the color components
  r = Math.max(0, Math.floor(r * factor));
  g = Math.max(0, Math.floor(g * factor));
  b = Math.max(0, Math.floor(b * factor));

  // Convert back to hex
  return `${
    r.toString(16).padStart(2, "0")
  }${
    g.toString(16).padStart(2, "0")
  }${
    b.toString(16).padStart(2, "0")
  }`;
}