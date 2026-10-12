import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bluetooth,
  Heart,
  Music,
  Palette,
  Pencil,
  Power,
  Sparkles,
  Sun,
} from "lucide-react";
import {
  PATTERNS,
  PATTERN_COLORS,
  rgbCss,
  type AnimKind,
  type Rgb,
} from "@/lib/lotus";
import {
  bleSupported,
  connectLamp,
  disconnectLamp,
  isLinked,
  pushBrightness,
  pushColor,
  pushMic,
  pushMicEq,
  pushMicSens,
  pushPattern,
  pushPower,
  pushSpeed,
} from "@/lib/ble";

type Mode = "color" | "scene" | "music" | "diy";
type ColorView = "solid" | "vibrant" | "white";

type Saved = {
  name: string;
  colors: Rgb[];
  brightness: number;
  speed: number;
  pattern: number | null;
  mic: boolean;
};

const SWATCHES: Rgb[] = [
  { r: 255, g: 59, b: 48 },
  { r: 255, g: 149, b: 0 },
  { r: 255, g: 204, b: 0 },
  { r: 52, g: 199, b: 89 },
  { r: 0, g: 199, b: 190 },
  { r: 0, g: 122, b: 255 },
  { r: 88, g: 86, b: 214 },
  { r: 255, g: 45, b: 85 },
  { r: 255, g: 255, b: 255 },
];

const SCENE_GROUPS: { name: string; items: { title: string; pattern: number; colors: Rgb[] }[] }[] = [
  {
    name: "Recommended",
    items: [
      { title: "Sunrise", pattern: 23, colors: [{ r: 255, g: 140, b: 50 }, { r: 255, g: 80, b: 60 }] },
      { title: "Ocean", pattern: 24, colors: [{ r: 40, g: 140, b: 255 }, { r: 40, g: 220, b: 210 }] },
      { title: "Aurora", pattern: 19, colors: [{ r: 80, g: 255, b: 180 }, { r: 120, g: 80, b: 255 }] },
      { title: "Movie", pattern: 28, colors: [{ r: 40, g: 50, b: 90 }, { r: 20, g: 20, b: 30 }] },
    ],
  },
  {
    name: "Nature",
    items: [
      { title: "Forest", pattern: 11, colors: [{ r: 30, g: 160, b: 70 }, { r: 180, g: 220, b: 80 }] },
      { title: "Sunset", pattern: 13, colors: [{ r: 255, g: 90, b: 40 }, { r: 120, g: 40, b: 140 }] },
      { title: "Snow", pattern: 16, colors: [{ r: 230, g: 240, b: 255 }, { r: 180, g: 210, b: 255 }] },
    ],
  },
  {
    name: "Emotion",
    items: [
      { title: "Energetic", pattern: 27, colors: [{ r: 255, g: 40, b: 80 }, { r: 255, g: 200, b: 0 }] },
      { title: "Calm", pattern: 14, colors: [{ r: 80, g: 180, b: 220 }, { r: 180, g: 220, b: 230 }] },
      { title: "Romantic", pattern: 15, colors: [{ r: 255, g: 80, b: 140 }, { r: 180, g: 60, b: 200 }] },
    ],
  },
  {
    name: "Festival",
    items: [
      { title: "Rainbow", pattern: 19, colors: [{ r: 255, g: 0, b: 80 }, { r: 0, g: 180, b: 255 }] },
      { title: "Party", pattern: 8, colors: [{ r: 255, g: 0, b: 200 }, { r: 0, g: 255, b: 180 }] },
      { title: "Spark", pattern: 25, colors: [{ r: 255, g: 220, b: 80 }, { r: 255, g: 255, b: 255 }] },
    ],
  },
];

const MUSIC_MODES = [
  { name: "Rhythm", eq: 0, pattern: 17 },
  { name: "Spectrum", eq: 2, pattern: 19 },
  { name: "Rolling", eq: 1, pattern: 18 },
  { name: "Energetic", eq: 3, pattern: 27 },
];

const STORAGE = "nightline-scenes-v2";

function loadSaved(): Saved[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE) || "[]") as Saved[];
  } catch {
    return [];
  }
}

export function Nightline() {
  const [power, setPower] = useState(true);
  const [color, setColor] = useState<Rgb>({ r: 0, g: 122, b: 255 });
  const [colors, setColors] = useState<Rgb[]>([
    { r: 255, g: 70, b: 70 },
    { r: 255, g: 180, b: 40 },
    { r: 40, g: 200, b: 120 },
    { r: 40, g: 140, b: 255 },
    { r: 160, g: 80, b: 255 },
  ]);
  const [brightness, setBrightness] = useState(80);
  const [speed, setSpeed] = useState(55);
  const [pattern, setPattern] = useState<number | null>(null);
  const [mic, setMic] = useState(false);
  const [music, setMusic] = useState(0);
  const [mode, setMode] = useState<Mode>("color");
  const [colorView, setColorView] = useState<ColorView>("solid");
  const [kelvin, setKelvin] = useState(4000);
  const [group, setGroup] = useState("Recommended");
  const [saved, setSaved] = useState<string[]>([]);
  const [diy, setDiy] = useState<Rgb[]>(Array.from({ length: 8 }, () => ({ r: 0, g: 122, b: 255 })));
  const [diyIndex, setDiyIndex] = useState(0);
  const [link, setLink] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("Preview");
  const [myColors, setMyColors] = useState<Saved[]>([]);
  const [tick, setTick] = useState(0);
  const supported = bleSupported();

  useEffect(() => setMyColors(loadSaved()), []);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 90);
    return () => window.clearInterval(id);
  }, []);

  const kind: AnimKind = pattern == null ? (colorView === "vibrant" ? "wave" : "solid") : PATTERNS[pattern].kind;
  const base =
    pattern != null && PATTERN_COLORS[pattern]
      ? { r: PATTERN_COLORS[pattern][0], g: PATTERN_COLORS[pattern][1], b: PATTERN_COLORS[pattern][2] }
      : colorView === "vibrant"
        ? colors[0]
        : color;

  async function send(label: string, job: () => Promise<string | void>) {
    setError(null);
    setStatus(label);
    try {
      if (isLinked()) await job();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Command failed");
    }
  }

  function applyColor(c: Rgb) {
    setColor(c);
    setPattern(null);
    setMic(false);
    setColorView("solid");
    setMode("color");
    void send("Color", async () => {
      await pushMic(false);
      return pushColor(c);
    });
  }

  async function onConnect() {
    setBusy(true);
    setError(null);
    try {
      if (link) {
        disconnectLamp();
        setLink(null);
        setStatus("Preview");
        return;
      }
      const name = await connectLamp();
      setLink(name);
      await pushPower(power);
      if (power) {
        await pushBrightness(brightness);
        if (pattern != null) await pushPattern(pattern);
        else await pushColor(color);
      }
      setStatus(name);
    } catch (e) {
      if (!(e instanceof DOMException && e.name === "NotFoundError")) {
        setError(e instanceof Error ? e.message : "Could not connect");
      }
    } finally {
      setBusy(false);
    }
  }

  const stripCells = useMemo(() => {
    const source = mode === "diy" ? diy : colorView === "vibrant" && pattern == null ? colors : null;
    return Array.from({ length: 16 }, (_, i) => {
      if (source) return source[i % source.length];
      return pixelColor(kind, base, i, 16, tick * (0.35 + speed / 90), mic ? 0.5 + 0.5 * Math.abs(Math.sin(tick / 3)) : 1);
    });
  }, [mode, diy, colorView, pattern, colors, kind, base, tick, speed, mic]);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-bg">
      <header className="flex items-center justify-between px-4 pt-4">
        <div>
          <p className="text-lg font-semibold text-fg">Cabin Strip</p>
          <p className="text-xs text-muted">{link ? `Connected · ${link}` : supported ? "Not connected" : "Bluetooth unavailable"}</p>
        </div>
        <button
          type="button"
          onClick={() => void onConnect()}
          disabled={busy || !supported}
          aria-label={link ? "Disconnect" : "Connect"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-line disabled:opacity-40"
        >
          <Bluetooth size={18} />
        </button>
      </header>

      <section className="px-4 pt-3">
        <div className="relative h-28 overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
          <div className="absolute inset-x-6 top-8 flex gap-1">
            {stripCells.map((c, i) => (
              <span
                key={i}
                className="h-4 flex-1 rounded-full"
                style={{
                  background: rgbCss(c, power ? brightness / 100 : 0.12),
                  boxShadow: power ? `0 8px 18px ${rgbCss(c, 0.45)}` : undefined,
                }}
              />
            ))}
          </div>
          <p className="absolute bottom-3 left-4 text-xs text-muted">{status}</p>
        </div>
        {error ? <p className="mt-2 text-sm text-accent">{error}</p> : null}
      </section>

      <div className="flex items-center gap-4 px-5 py-4">
        <button
          type="button"
          aria-pressed={power}
          onClick={() => {
            const next = !power;
            setPower(next);
            void send(next ? "On" : "Off", () => pushPower(next));
          }}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${power ? "bg-accent text-white ring-accent" : "bg-surface text-muted ring-line"}`}
        >
          <Power size={22} />
        </button>
        <label className="flex min-w-0 flex-1 items-center gap-2 text-muted">
          <Sun size={16} />
          <input
            aria-label="Brightness"
            className="w-full"
            type="range"
            min={1}
            max={100}
            value={brightness}
            onChange={(e) => {
              const n = Number(e.target.value);
              setBrightness(n);
              void send("Brightness", () => pushBrightness(n));
            }}
          />
          <span className="w-8 text-right text-xs text-fg">{brightness}</span>
        </label>
      </div>

      <section className="flex-1 rounded-t-[1.75rem] bg-surface px-4 pt-4 pb-28 shadow-[0_-8px_30px_rgba(20,24,40,0.04)]">
        {mode === "color" ? (
          <ColorPane
            view={colorView}
            color={color}
            colors={colors}
            kelvin={kelvin}
            myColors={myColors}
            onView={setColorView}
            onColor={applyColor}
            onColors={(next) => {
              setColors(next);
              setPattern(null);
              setMic(false);
              void send("Vibrant", () => pushColor(next[0]));
            }}
            onKelvin={(k) => {
              setKelvin(k);
              const c = kelvinToRgb(k);
              setColor(c);
              setPattern(null);
              void send("White", () => pushColor(c));
            }}
            onSave={() => {
              const entry: Saved = {
                name: colorView === "vibrant" ? "Color bar" : "Color",
                colors: colorView === "vibrant" ? colors : [color],
                brightness,
                speed,
                pattern: null,
                mic: false,
              };
              const next = [entry, ...myColors].slice(0, 16);
              setMyColors(next);
              localStorage.setItem(STORAGE, JSON.stringify(next));
            }}
          />
        ) : null}

        {mode === "scene" ? (
          <div>
            <div className="flex gap-2 overflow-x-auto pb-3">
              {SCENE_GROUPS.map((g) => (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => setGroup(g.name)}
                  className={`h-9 shrink-0 rounded-full px-4 text-sm ${group === g.name ? "bg-fg text-white" : "bg-surface-2 text-muted"}`}
                >
                  {g.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SCENE_GROUPS.find((g) => g.name === group)?.items.map((item) => {
                const on = pattern === item.pattern && !mic;
                const heart = saved.includes(item.title);
                return (
                  <div
                    key={item.title}
                    className={`relative h-24 overflow-hidden rounded-2xl text-left text-white ring-2 ${on ? "ring-accent" : "ring-transparent"}`}
                    style={{
                      background: `linear-gradient(135deg, ${rgbCss(item.colors[0])} 0%, ${rgbCss(item.colors[1] ?? item.colors[0])} 100%)`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setPattern(item.pattern);
                        setMic(false);
                        setColor(item.colors[0]);
                        void send(item.title, async () => {
                          await pushMic(false);
                          await pushSpeed(speed);
                          return pushPattern(item.pattern);
                        });
                      }}
                      className="absolute inset-0 text-left"
                    >
                      <span className="absolute bottom-3 left-3 text-sm font-medium">{item.title}</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Save ${item.title}`}
                      className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/20"
                      onClick={() =>
                        setSaved((list) => (list.includes(item.title) ? list.filter((n) => n !== item.title) : [...list, item.title]))
                      }
                    >
                      <Heart size={14} fill={heart ? "white" : "none"} />
                    </button>
                  </div>
                );
              })}
            </div>
            <label className="mt-4 block text-sm text-muted">
              Speed
              <input
                className="mt-2 w-full"
                type="range"
                min={0}
                max={100}
                value={speed}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setSpeed(n);
                  void send("Speed", () => pushSpeed(n));
                }}
              />
            </label>
          </div>
        ) : null}

        {mode === "music" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted">Phone microphone drives the strip. Sensitivity follows the beat in preview.</p>
            <div className="grid grid-cols-2 gap-3">
              {MUSIC_MODES.map((m, i) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => {
                    setMusic(i);
                    setMic(true);
                    setPattern(m.pattern);
                    void send(m.name, async () => {
                      await pushMic(true);
                      await pushMicEq(m.eq);
                      await pushMicSens(70);
                      return pushPattern(m.pattern);
                    });
                  }}
                  className={`h-24 rounded-2xl text-sm font-medium ${mic && music === i ? "bg-accent text-white" : "bg-surface-2 text-fg"}`}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setMic(false);
                void send("Music off", () => pushMic(false));
              }}
              className="h-11 w-full rounded-full bg-surface-2 text-sm text-fg"
            >
              Stop music sync
            </button>
          </div>
        ) : null}

        {mode === "diy" ? (
          <div>
            <p className="mb-2 text-sm text-muted">Paint segments, then apply. The lamp receives the selected segment color.</p>
            <div className="mb-4 flex gap-1">
              {diy.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Segment ${i + 1}`}
                  onClick={() => setDiyIndex(i)}
                  className={`h-12 flex-1 rounded-xl ring-2 ${diyIndex === i ? "ring-accent" : "ring-transparent"}`}
                  style={{ background: rgbCss(c) }}
                />
              ))}
            </div>
            <Wheel
              color={diy[diyIndex]}
              onPick={(c) => {
                const next = diy.slice();
                next[diyIndex] = c;
                setDiy(next);
              }}
            />
            <button
              type="button"
              onClick={() => {
                setColor(diy[diyIndex]);
                setPattern(null);
                setMic(false);
                void send("DIY", async () => {
                  await pushMic(false);
                  return pushColor(diy[diyIndex]);
                });
              }}
              className="mt-4 h-12 w-full rounded-full bg-accent text-sm font-medium text-white"
            >
              Apply
            </button>
          </div>
        ) : null}
      </section>

      <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-md justify-around border-t border-line bg-surface px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {(
          [
            ["color", "Color", Palette],
            ["scene", "Scene", Sparkles],
            ["music", "Music", Music],
            ["diy", "DIY", Pencil],
          ] as const
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`flex h-14 w-16 flex-col items-center justify-center gap-1 text-xs ${mode === key ? "text-accent" : "text-muted"}`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>
    </main>
  );
}

function ColorPane({
  view,
  color,
  colors,
  kelvin,
  myColors,
  onView,
  onColor,
  onColors,
  onKelvin,
  onSave,
}: {
  view: ColorView;
  color: Rgb;
  colors: Rgb[];
  kelvin: number;
  myColors: Saved[];
  onView: (v: ColorView) => void;
  onColor: (c: Rgb) => void;
  onColors: (c: Rgb[]) => void;
  onKelvin: (k: number) => void;
  onSave: () => void;
}) {
  const [edit, setEdit] = useState(0);
  return (
    <div>
      <div className="mb-4 grid grid-cols-3 rounded-full bg-surface-2 p-1">
        {(
          [
            ["solid", "Color"],
            ["vibrant", "Vibrant"],
            ["white", "White"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onView(key)}
            className={`h-9 rounded-full text-sm ${view === key ? "bg-surface font-medium text-fg shadow-sm" : "text-muted"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {view === "solid" ? (
        <>
          <Wheel color={color} onPick={onColor} />
          <div className="mt-4 flex flex-wrap gap-2">
            {SWATCHES.map((c) => (
              <button
                key={rgbCss(c)}
                type="button"
                aria-label="Preset color"
                onClick={() => onColor(c)}
                className="h-9 w-9 rounded-full ring-2 ring-white"
                style={{ background: rgbCss(c), boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)" }}
              />
            ))}
          </div>
        </>
      ) : null}

      {view === "vibrant" ? (
        <div>
          <div
            className="mb-4 h-14 rounded-2xl"
            style={{ background: `linear-gradient(90deg, ${colors.map(rgbCss).join(",")})` }}
          />
          <div className="mb-3 flex gap-2">
            {colors.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setEdit(i)}
                className={`h-10 flex-1 rounded-xl ring-2 ${edit === i ? "ring-accent" : "ring-transparent"}`}
                style={{ background: rgbCss(c) }}
              />
            ))}
          </div>
          <Wheel color={colors[edit]} onPick={(c) => onColors(colors.map((old, i) => (i === edit ? c : old)))} />
        </div>
      ) : null}

      {view === "white" ? (
        <label className="block text-sm text-muted">
          {kelvin}K
          <input
            className="mt-3 w-full"
            type="range"
            min={2200}
            max={6500}
            step={50}
            value={kelvin}
            onChange={(e) => onKelvin(Number(e.target.value))}
            style={{
              background: "linear-gradient(90deg,#ffb15a,#fff4e0,#f4f7ff,#d7e6ff)",
            }}
          />
          <span className="mt-2 flex justify-between text-xs">
            <span>Warm</span>
            <span>Cool</span>
          </span>
        </label>
      ) : null}

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-medium text-fg">My colors</p>
        <button type="button" onClick={onSave} className="text-sm text-accent">
          Save
        </button>
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {myColors.length === 0 ? <p className="text-sm text-muted">Saved colors show up here.</p> : null}
        {myColors.map((item, i) => (
          <button
            key={`${item.name}-${i}`}
            type="button"
            onClick={() => (item.colors.length > 1 ? onColors(item.colors) : onColor(item.colors[0]))}
            className="h-10 w-16 shrink-0 rounded-xl"
            style={{
              background:
                item.colors.length > 1
                  ? `linear-gradient(90deg, ${item.colors.map(rgbCss).join(",")})`
                  : rgbCss(item.colors[0]),
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Wheel({ color, onPick }: { color: Rgb; onPick: (c: Rgb) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  function pick(clientX: number, clientY: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    const hue = (Math.atan2(y, x) * 180) / Math.PI + 180;
    const sat = Math.min(1, Math.hypot(x, y) / (rect.width / 2));
    onPick(hsl(hue, sat * 100, 50 + (1 - sat) * 25));
  }
  return (
    <div className="flex justify-center">
      <div
        ref={ref}
        role="slider"
        aria-label="Color wheel"
        aria-valuetext={`${color.r} ${color.g} ${color.b}`}
        tabIndex={0}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          pick(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (e.buttons) pick(e.clientX, e.clientY);
        }}
        className="relative h-56 w-56 rounded-full"
        style={{
          background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-6 rounded-full"
          style={{ background: "radial-gradient(circle, white 0%, transparent 68%)" }}
        />
        <span
          className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white"
          style={{ left: "70%", top: "32%", background: rgbCss(color), boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
        />
      </div>
    </div>
  );
}

function pixelColor(kind: AnimKind, color: Rgb, i: number, n: number, phase: number, gain: number): Rgb {
  if (kind === "solid") return scale(color, gain);
  if (kind === "pulse" || kind === "breathe") {
    const w = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(phase * 0.4 + i * 0.2));
    return scale(color, w * gain);
  }
  if (kind === "chase") {
    const head = Math.floor(phase) % n;
    const dist = (i - head + n) % n;
    return scale(color, (dist < 4 ? 1 - dist / 5 : 0.08) * gain);
  }
  if (kind === "rainbow" || kind === "wave") return scale(hsl((i / n) * 360 + phase * 10, 80, 55), gain);
  if (kind === "strobe") {
    const palette = [
      { r: 255, g: 40, b: 40 },
      { r: 40, g: 220, b: 80 },
      { r: 50, g: 110, b: 255 },
      { r: 255, g: 200, b: 40 },
    ];
    return scale(palette[Math.floor(phase / 2) % palette.length], gain);
  }
  return scale(color, (Math.sin(i * 1.7 + phase) > 0.72 ? 1 : 0.12) * gain);
}

function scale(c: Rgb, w: number): Rgb {
  return { r: Math.round(c.r * w), g: Math.round(c.g * w), b: Math.round(c.b * w) };
}

function hsl(h: number, s: number, l: number): Rgb {
  const a = s / 100;
  const b = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const f = (n: number) => b - a * Math.min(b, 1 - b) * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) };
}

function kelvinToRgb(k: number): Rgb {
  const t = (k - 2200) / (6500 - 2200);
  return {
    r: Math.round(255),
    g: Math.round(170 + t * 80),
    b: Math.round(80 + t * 175),
  };
}
