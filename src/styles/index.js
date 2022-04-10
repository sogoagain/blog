export function unit(level) {
  const rem = level * 0.8;
  return `${Math.round(rem * 100) / 100}rem`;
}

export const color = {
  primary: "#000000",
  secondary: "#868E96",
  brand: "#D72323",
  background: "#FFFFFF",
};
