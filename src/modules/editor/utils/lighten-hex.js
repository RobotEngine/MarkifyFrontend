export const lightenHex = (hexCode, percent) => {
  // Ensure the percent is within the valid range [0, 100]
  percent = Math.max(0, Math.min(100, percent));

  // Convert hex code to RGB
  let r = parseInt(hexCode.slice(0, 2), 16);
  let g = parseInt(hexCode.slice(2, 4), 16);
  let b = parseInt(hexCode.slice(4, 6), 16);

  // Calculate lightening factor
  let factor = percent / 100;

  // Lighten the color components
  r = Math.min(255, Math.floor(r + (255 - r) * factor));
  g = Math.min(255, Math.floor(g + (255 - g) * factor));
  b = Math.min(255, Math.floor(b + (255 - b) * factor));

  // Convert back to hex
  return `${
    r.toString(16).padStart(2, "0")
  }${
    g.toString(16).padStart(2, "0")
  }${
    b.toString(16).padStart(2, "0")
  }`;
}