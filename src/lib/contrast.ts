export type Lch = [number, number, number];

export function parseOklch(value: string): Lch {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!m) throw new Error(`No es oklch(L C H): ${value}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function toLinearSrgb([L, C, H]: Lch): [number, number, number] {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

export function luminance(lch: Lch): number {
  const [r, g, b] = toLinearSrgb(lch).map((v) => Math.min(1, Math.max(0, v)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(parseOklch(a)), luminance(parseOklch(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
