/** Frames from njasi/PyLotusLamp CommandUtils, tested on MELK-OC21. */

export const WRITE_UUID = "0000fff3-0000-1000-8000-00805f9b34fb";
export const SERVICE_UUID = "0000fff0-0000-1000-8000-00805f9b34fb";

function frame(bytes: number[]): Uint8Array {
  return Uint8Array.from(bytes);
}

export function powerFrame(on: boolean): Uint8Array {
  const v = on ? 0x01 : 0x00;
  return frame([0x7e, 0x04, 0x04, v, 0x00, v, 0xff, 0x00, 0xef]);
}

export function colorFrame(r: number, g: number, b: number): Uint8Array {
  return frame([0x7e, 0x07, 0x05, 0x03, clamp(r), clamp(g), clamp(b), 0x10, 0xef]);
}

/** Patterns 0–28. Author notes the speed frame is unreliable on MELK-OC21. */
export function patternFrame(pattern: number): Uint8Array {
  const p = Math.max(0, Math.min(28, pattern));
  return frame([0x7e, 0x05, 0x03, p + 128, 0x03, 0xff, 0xff, 0x00, 0xef]);
}

export function speedFrame(speed: number): Uint8Array {
  const s = Math.max(0, Math.min(100, Math.round(speed)));
  return frame([0x7e, 0x04, 0x02, s, 0xff, 0xff, 0xff, 0x00, 0xef]);
}

export function brightnessFrame(brightness: number): Uint8Array {
  const b = Math.max(0, Math.min(100, Math.round(brightness)));
  return frame([0x7e, 0x04, 0x01, b, 0xff, 0xff, 0xff, 0x00, 0xef]);
}

export function micFrame(on: boolean): Uint8Array {
  return frame([0x7e, 0x04, 0x07, on ? 0x01 : 0x00, 0xff, 0xff, 0xff, 0x00, 0xef]);
}

export function micEqFrame(eq: number): Uint8Array {
  const e = Math.max(0, Math.min(3, eq));
  return frame([0x7e, 0x05, 0x03, e + 128, 0x04, 0xff, 0xff, 0x00, 0xef]);
}

export function micSensitivityFrame(level: number): Uint8Array {
  const s = Math.max(0, Math.min(100, Math.round(level)));
  return frame([0x7e, 0x04, 0x06, s, 0xff, 0xff, 0xff, 0x00, 0xef]);
}

export function hexOf(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join(" ").toUpperCase();
}

function clamp(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

export type Pattern = { id: number; name: string; kind: AnimKind };

export type AnimKind =
  | "solid"
  | "pulse"
  | "chase"
  | "rainbow"
  | "strobe"
  | "breathe"
  | "wave"
  | "spark";

export const PATTERNS: Pattern[] = [
  { id: 0, name: "Static red", kind: "solid" },
  { id: 1, name: "Static green", kind: "solid" },
  { id: 2, name: "Static blue", kind: "solid" },
  { id: 3, name: "Static yellow", kind: "solid" },
  { id: 4, name: "Static cyan", kind: "solid" },
  { id: 5, name: "Static magenta", kind: "solid" },
  { id: 6, name: "Static white", kind: "solid" },
  { id: 7, name: "RGB jump", kind: "strobe" },
  { id: 8, name: "Seven-color jump", kind: "strobe" },
  { id: 9, name: "RGB fade", kind: "breathe" },
  { id: 10, name: "Red pulse", kind: "pulse" },
  { id: 11, name: "Green pulse", kind: "pulse" },
  { id: 12, name: "Blue pulse", kind: "pulse" },
  { id: 13, name: "Yellow pulse", kind: "pulse" },
  { id: 14, name: "Cyan pulse", kind: "pulse" },
  { id: 15, name: "Magenta pulse", kind: "pulse" },
  { id: 16, name: "White pulse", kind: "pulse" },
  { id: 17, name: "RGB chase", kind: "chase" },
  { id: 18, name: "Seven chase", kind: "chase" },
  { id: 19, name: "Rainbow flow", kind: "rainbow" },
  { id: 20, name: "Red chase", kind: "chase" },
  { id: 21, name: "Green chase", kind: "chase" },
  { id: 22, name: "Blue chase", kind: "chase" },
  { id: 23, name: "Warm wave", kind: "wave" },
  { id: 24, name: "Cool wave", kind: "wave" },
  { id: 25, name: "Spark", kind: "spark" },
  { id: 26, name: "Cross fade", kind: "breathe" },
  { id: 27, name: "Party jump", kind: "strobe" },
  { id: 28, name: "Slow glow", kind: "breathe" },
];

export const PATTERN_COLORS: Record<number, [number, number, number]> = {
  0: [255, 42, 36],
  1: [40, 210, 90],
  2: [48, 110, 255],
  3: [255, 196, 40],
  4: [40, 220, 230],
  5: [230, 50, 180],
  6: [245, 245, 245],
  10: [255, 42, 36],
  11: [40, 210, 90],
  12: [48, 110, 255],
  13: [255, 196, 40],
  14: [40, 220, 230],
  15: [230, 50, 180],
  16: [245, 245, 245],
  20: [255, 42, 36],
  21: [40, 210, 90],
  22: [48, 110, 255],
  23: [255, 140, 50],
  24: [80, 160, 255],
};

export const EQ_MODES = ["Classic", "Soft", "Dynamic", "Disco"];

export type Rgb = { r: number; g: number; b: number };

export function rgbCss(c: Rgb, alpha = 1) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}
