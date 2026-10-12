import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Pencil, c as Heart, i as Power, l as Bluetooth, n as Sun, o as Palette, r as Sparkles, s as Music } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DCcW6wDE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Frames from njasi/PyLotusLamp CommandUtils, tested on MELK-OC21. */
var WRITE_UUID = "0000fff3-0000-1000-8000-00805f9b34fb";
var SERVICE_UUID = "0000fff0-0000-1000-8000-00805f9b34fb";
function frame(bytes) {
	return Uint8Array.from(bytes);
}
function powerFrame(on) {
	const v = on ? 1 : 0;
	return frame([
		126,
		4,
		4,
		v,
		0,
		v,
		255,
		0,
		239
	]);
}
function colorFrame(r, g, b) {
	return frame([
		126,
		7,
		5,
		3,
		clamp(r),
		clamp(g),
		clamp(b),
		16,
		239
	]);
}
/** Patterns 0–28. Author notes the speed frame is unreliable on MELK-OC21. */
function patternFrame(pattern) {
	return frame([
		126,
		5,
		3,
		Math.max(0, Math.min(28, pattern)) + 128,
		3,
		255,
		255,
		0,
		239
	]);
}
function speedFrame(speed) {
	return frame([
		126,
		4,
		2,
		Math.max(0, Math.min(100, Math.round(speed))),
		255,
		255,
		255,
		0,
		239
	]);
}
function brightnessFrame(brightness) {
	return frame([
		126,
		4,
		1,
		Math.max(0, Math.min(100, Math.round(brightness))),
		255,
		255,
		255,
		0,
		239
	]);
}
function micFrame(on) {
	return frame([
		126,
		4,
		7,
		on ? 1 : 0,
		255,
		255,
		255,
		0,
		239
	]);
}
function micEqFrame(eq) {
	return frame([
		126,
		5,
		3,
		Math.max(0, Math.min(3, eq)) + 128,
		4,
		255,
		255,
		0,
		239
	]);
}
function micSensitivityFrame(level) {
	return frame([
		126,
		4,
		6,
		Math.max(0, Math.min(100, Math.round(level))),
		255,
		255,
		255,
		0,
		239
	]);
}
function hexOf(bytes) {
	return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join(" ").toUpperCase();
}
function clamp(n) {
	return Math.max(0, Math.min(255, Math.round(n)));
}
var PATTERNS = [
	{
		id: 0,
		name: "Static red",
		kind: "solid"
	},
	{
		id: 1,
		name: "Static green",
		kind: "solid"
	},
	{
		id: 2,
		name: "Static blue",
		kind: "solid"
	},
	{
		id: 3,
		name: "Static yellow",
		kind: "solid"
	},
	{
		id: 4,
		name: "Static cyan",
		kind: "solid"
	},
	{
		id: 5,
		name: "Static magenta",
		kind: "solid"
	},
	{
		id: 6,
		name: "Static white",
		kind: "solid"
	},
	{
		id: 7,
		name: "RGB jump",
		kind: "strobe"
	},
	{
		id: 8,
		name: "Seven-color jump",
		kind: "strobe"
	},
	{
		id: 9,
		name: "RGB fade",
		kind: "breathe"
	},
	{
		id: 10,
		name: "Red pulse",
		kind: "pulse"
	},
	{
		id: 11,
		name: "Green pulse",
		kind: "pulse"
	},
	{
		id: 12,
		name: "Blue pulse",
		kind: "pulse"
	},
	{
		id: 13,
		name: "Yellow pulse",
		kind: "pulse"
	},
	{
		id: 14,
		name: "Cyan pulse",
		kind: "pulse"
	},
	{
		id: 15,
		name: "Magenta pulse",
		kind: "pulse"
	},
	{
		id: 16,
		name: "White pulse",
		kind: "pulse"
	},
	{
		id: 17,
		name: "RGB chase",
		kind: "chase"
	},
	{
		id: 18,
		name: "Seven chase",
		kind: "chase"
	},
	{
		id: 19,
		name: "Rainbow flow",
		kind: "rainbow"
	},
	{
		id: 20,
		name: "Red chase",
		kind: "chase"
	},
	{
		id: 21,
		name: "Green chase",
		kind: "chase"
	},
	{
		id: 22,
		name: "Blue chase",
		kind: "chase"
	},
	{
		id: 23,
		name: "Warm wave",
		kind: "wave"
	},
	{
		id: 24,
		name: "Cool wave",
		kind: "wave"
	},
	{
		id: 25,
		name: "Spark",
		kind: "spark"
	},
	{
		id: 26,
		name: "Cross fade",
		kind: "breathe"
	},
	{
		id: 27,
		name: "Party jump",
		kind: "strobe"
	},
	{
		id: 28,
		name: "Slow glow",
		kind: "breathe"
	}
];
var PATTERN_COLORS = {
	0: [
		255,
		42,
		36
	],
	1: [
		40,
		210,
		90
	],
	2: [
		48,
		110,
		255
	],
	3: [
		255,
		196,
		40
	],
	4: [
		40,
		220,
		230
	],
	5: [
		230,
		50,
		180
	],
	6: [
		245,
		245,
		245
	],
	10: [
		255,
		42,
		36
	],
	11: [
		40,
		210,
		90
	],
	12: [
		48,
		110,
		255
	],
	13: [
		255,
		196,
		40
	],
	14: [
		40,
		220,
		230
	],
	15: [
		230,
		50,
		180
	],
	16: [
		245,
		245,
		245
	],
	20: [
		255,
		42,
		36
	],
	21: [
		40,
		210,
		90
	],
	22: [
		48,
		110,
		255
	],
	23: [
		255,
		140,
		50
	],
	24: [
		80,
		160,
		255
	]
};
function rgbCss(c, alpha = 1) {
	return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
}
var device = null;
var characteristic = null;
function bleSupported() {
	return typeof navigator !== "undefined" && !!navigator.bluetooth;
}
function isLinked() {
	return !!characteristic;
}
async function write(bytes) {
	if (!characteristic) return hexOf(bytes);
	const payload = new Uint8Array(bytes);
	await characteristic.writeValueWithoutResponse(payload);
	return hexOf(bytes);
}
async function connectLamp() {
	if (!navigator.bluetooth) throw new Error("This browser has no Bluetooth. Open Nightline in Chrome or Edge on a phone or laptop.");
	const picked = await navigator.bluetooth.requestDevice({
		filters: [
			{ namePrefix: "MELK" },
			{ namePrefix: "ELK" },
			{ services: [SERVICE_UUID] }
		],
		optionalServices: [SERVICE_UUID]
	});
	device = picked;
	const server = await picked.gatt?.connect();
	if (!server) throw new Error("Could not open the lamp.");
	const service = await server.getPrimaryService(SERVICE_UUID);
	try {
		characteristic = await service.getCharacteristic(WRITE_UUID);
	} catch {
		const writable = (await service.getCharacteristics()).find((c) => c.properties.writeWithoutResponse || c.properties.write);
		if (!writable) throw new Error("No write characteristic on this lamp.");
		characteristic = writable;
	}
	picked.addEventListener("gattserverdisconnected", () => {
		characteristic = null;
	});
	return picked.name || "MELK-OC21";
}
function disconnectLamp() {
	device?.gatt?.disconnect();
	characteristic = null;
	device = null;
}
async function pushPower(on) {
	return write(powerFrame(on));
}
async function pushColor(c) {
	return write(colorFrame(c.r, c.g, c.b));
}
async function pushBrightness(n) {
	return write(brightnessFrame(n));
}
async function pushSpeed(n) {
	return write(speedFrame(n));
}
async function pushPattern(id) {
	return write(patternFrame(id));
}
async function pushMic(on) {
	return write(micFrame(on));
}
async function pushMicEq(eq) {
	return write(micEqFrame(eq));
}
async function pushMicSens(n) {
	return write(micSensitivityFrame(n));
}
var SWATCHES = [
	{
		r: 255,
		g: 59,
		b: 48
	},
	{
		r: 255,
		g: 149,
		b: 0
	},
	{
		r: 255,
		g: 204,
		b: 0
	},
	{
		r: 52,
		g: 199,
		b: 89
	},
	{
		r: 0,
		g: 199,
		b: 190
	},
	{
		r: 0,
		g: 122,
		b: 255
	},
	{
		r: 88,
		g: 86,
		b: 214
	},
	{
		r: 255,
		g: 45,
		b: 85
	},
	{
		r: 255,
		g: 255,
		b: 255
	}
];
var SCENE_GROUPS = [
	{
		name: "Recommended",
		items: [
			{
				title: "Sunrise",
				pattern: 23,
				colors: [{
					r: 255,
					g: 140,
					b: 50
				}, {
					r: 255,
					g: 80,
					b: 60
				}]
			},
			{
				title: "Ocean",
				pattern: 24,
				colors: [{
					r: 40,
					g: 140,
					b: 255
				}, {
					r: 40,
					g: 220,
					b: 210
				}]
			},
			{
				title: "Aurora",
				pattern: 19,
				colors: [{
					r: 80,
					g: 255,
					b: 180
				}, {
					r: 120,
					g: 80,
					b: 255
				}]
			},
			{
				title: "Movie",
				pattern: 28,
				colors: [{
					r: 40,
					g: 50,
					b: 90
				}, {
					r: 20,
					g: 20,
					b: 30
				}]
			}
		]
	},
	{
		name: "Nature",
		items: [
			{
				title: "Forest",
				pattern: 11,
				colors: [{
					r: 30,
					g: 160,
					b: 70
				}, {
					r: 180,
					g: 220,
					b: 80
				}]
			},
			{
				title: "Sunset",
				pattern: 13,
				colors: [{
					r: 255,
					g: 90,
					b: 40
				}, {
					r: 120,
					g: 40,
					b: 140
				}]
			},
			{
				title: "Snow",
				pattern: 16,
				colors: [{
					r: 230,
					g: 240,
					b: 255
				}, {
					r: 180,
					g: 210,
					b: 255
				}]
			}
		]
	},
	{
		name: "Emotion",
		items: [
			{
				title: "Energetic",
				pattern: 27,
				colors: [{
					r: 255,
					g: 40,
					b: 80
				}, {
					r: 255,
					g: 200,
					b: 0
				}]
			},
			{
				title: "Calm",
				pattern: 14,
				colors: [{
					r: 80,
					g: 180,
					b: 220
				}, {
					r: 180,
					g: 220,
					b: 230
				}]
			},
			{
				title: "Romantic",
				pattern: 15,
				colors: [{
					r: 255,
					g: 80,
					b: 140
				}, {
					r: 180,
					g: 60,
					b: 200
				}]
			}
		]
	},
	{
		name: "Festival",
		items: [
			{
				title: "Rainbow",
				pattern: 19,
				colors: [{
					r: 255,
					g: 0,
					b: 80
				}, {
					r: 0,
					g: 180,
					b: 255
				}]
			},
			{
				title: "Party",
				pattern: 8,
				colors: [{
					r: 255,
					g: 0,
					b: 200
				}, {
					r: 0,
					g: 255,
					b: 180
				}]
			},
			{
				title: "Spark",
				pattern: 25,
				colors: [{
					r: 255,
					g: 220,
					b: 80
				}, {
					r: 255,
					g: 255,
					b: 255
				}]
			}
		]
	}
];
var MUSIC_MODES = [
	{
		name: "Rhythm",
		eq: 0,
		pattern: 17
	},
	{
		name: "Spectrum",
		eq: 2,
		pattern: 19
	},
	{
		name: "Rolling",
		eq: 1,
		pattern: 18
	},
	{
		name: "Energetic",
		eq: 3,
		pattern: 27
	}
];
var STORAGE = "nightline-scenes-v2";
function loadSaved() {
	if (typeof window === "undefined") return [];
	try {
		return JSON.parse(localStorage.getItem(STORAGE) || "[]");
	} catch {
		return [];
	}
}
function Nightline() {
	const [power, setPower] = (0, import_react.useState)(true);
	const [color, setColor] = (0, import_react.useState)({
		r: 0,
		g: 122,
		b: 255
	});
	const [colors, setColors] = (0, import_react.useState)([
		{
			r: 255,
			g: 70,
			b: 70
		},
		{
			r: 255,
			g: 180,
			b: 40
		},
		{
			r: 40,
			g: 200,
			b: 120
		},
		{
			r: 40,
			g: 140,
			b: 255
		},
		{
			r: 160,
			g: 80,
			b: 255
		}
	]);
	const [brightness, setBrightness] = (0, import_react.useState)(80);
	const [speed, setSpeed] = (0, import_react.useState)(55);
	const [pattern, setPattern] = (0, import_react.useState)(null);
	const [mic, setMic] = (0, import_react.useState)(false);
	const [music, setMusic] = (0, import_react.useState)(0);
	const [mode, setMode] = (0, import_react.useState)("color");
	const [colorView, setColorView] = (0, import_react.useState)("solid");
	const [kelvin, setKelvin] = (0, import_react.useState)(4e3);
	const [group, setGroup] = (0, import_react.useState)("Recommended");
	const [saved, setSaved] = (0, import_react.useState)([]);
	const [diy, setDiy] = (0, import_react.useState)(Array.from({ length: 8 }, () => ({
		r: 0,
		g: 122,
		b: 255
	})));
	const [diyIndex, setDiyIndex] = (0, import_react.useState)(0);
	const [link, setLink] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("Preview");
	const [myColors, setMyColors] = (0, import_react.useState)([]);
	const [tick, setTick] = (0, import_react.useState)(0);
	const supported = bleSupported();
	(0, import_react.useEffect)(() => setMyColors(loadSaved()), []);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setTick((t) => t + 1), 90);
		return () => window.clearInterval(id);
	}, []);
	const kind = pattern == null ? colorView === "vibrant" ? "wave" : "solid" : PATTERNS[pattern].kind;
	const base = pattern != null && PATTERN_COLORS[pattern] ? {
		r: PATTERN_COLORS[pattern][0],
		g: PATTERN_COLORS[pattern][1],
		b: PATTERN_COLORS[pattern][2]
	} : colorView === "vibrant" ? colors[0] : color;
	async function send(label, job) {
		setError(null);
		setStatus(label);
		try {
			if (isLinked()) await job();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Command failed");
		}
	}
	function applyColor(c) {
		setColor(c);
		setPattern(null);
		setMic(false);
		setColorView("solid");
		setMode("color");
		send("Color", async () => {
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
			if (!(e instanceof DOMException && e.name === "NotFoundError")) setError(e instanceof Error ? e.message : "Could not connect");
		} finally {
			setBusy(false);
		}
	}
	const stripCells = (0, import_react.useMemo)(() => {
		const source = mode === "diy" ? diy : colorView === "vibrant" && pattern == null ? colors : null;
		return Array.from({ length: 16 }, (_, i) => {
			if (source) return source[i % source.length];
			return pixelColor(kind, base, i, 16, tick * (.35 + speed / 90), mic ? .5 + .5 * Math.abs(Math.sin(tick / 3)) : 1);
		});
	}, [
		mode,
		diy,
		colorView,
		pattern,
		colors,
		kind,
		base,
		tick,
		speed,
		mic
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh w-full max-w-md flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-semibold text-fg",
					children: "Cabin Strip"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: link ? `Connected · ${link}` : supported ? "Not connected" : "Bluetooth unavailable"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void onConnect(),
					disabled: busy || !supported,
					"aria-label": link ? "Disconnect" : "Connect",
					className: "flex h-11 w-11 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-line disabled:opacity-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, { size: 18 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "px-4 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-28 overflow-hidden rounded-3xl bg-surface ring-1 ring-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-x-6 top-8 flex gap-1",
						children: stripCells.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-4 flex-1 rounded-full",
							style: {
								background: rgbCss(c, power ? brightness / 100 : .12),
								boxShadow: power ? `0 8px 18px ${rgbCss(c, .45)}` : void 0
							}
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "absolute bottom-3 left-4 text-xs text-muted",
						children: status
					})]
				}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-accent",
					children: error
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": power,
					onClick: () => {
						const next = !power;
						setPower(next);
						send(next ? "On" : "Off", () => pushPower(next));
					},
					className: `flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-2 ${power ? "bg-accent text-white ring-accent" : "bg-surface text-muted ring-line"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { size: 22 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-w-0 flex-1 items-center gap-2 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 16 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": "Brightness",
							className: "w-full",
							type: "range",
							min: 1,
							max: 100,
							value: brightness,
							onChange: (e) => {
								const n = Number(e.target.value);
								setBrightness(n);
								send("Brightness", () => pushBrightness(n));
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 text-right text-xs text-fg",
							children: brightness
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex-1 rounded-t-[1.75rem] bg-surface px-4 pt-4 pb-28 shadow-[0_-8px_30px_rgba(20,24,40,0.04)]",
				children: [
					mode === "color" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPane, {
						view: colorView,
						color,
						colors,
						kelvin,
						myColors,
						onView: setColorView,
						onColor: applyColor,
						onColors: (next) => {
							setColors(next);
							setPattern(null);
							setMic(false);
							send("Vibrant", () => pushColor(next[0]));
						},
						onKelvin: (k) => {
							setKelvin(k);
							const c = kelvinToRgb(k);
							setColor(c);
							setPattern(null);
							send("White", () => pushColor(c));
						},
						onSave: () => {
							const next = [{
								name: colorView === "vibrant" ? "Color bar" : "Color",
								colors: colorView === "vibrant" ? colors : [color],
								brightness,
								speed,
								pattern: null,
								mic: false
							}, ...myColors].slice(0, 16);
							setMyColors(next);
							localStorage.setItem(STORAGE, JSON.stringify(next));
						}
					}) : null,
					mode === "scene" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 overflow-x-auto pb-3",
							children: SCENE_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setGroup(g.name),
								className: `h-9 shrink-0 rounded-full px-4 text-sm ${group === g.name ? "bg-fg text-white" : "bg-surface-2 text-muted"}`,
								children: g.name
							}, g.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-3",
							children: SCENE_GROUPS.find((g) => g.name === group)?.items.map((item) => {
								const on = pattern === item.pattern && !mic;
								const heart = saved.includes(item.title);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `relative h-24 overflow-hidden rounded-2xl text-left text-white ring-2 ${on ? "ring-accent" : "ring-transparent"}`,
									style: { background: `linear-gradient(135deg, ${rgbCss(item.colors[0])} 0%, ${rgbCss(item.colors[1] ?? item.colors[0])} 100%)` },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setPattern(item.pattern);
											setMic(false);
											setColor(item.colors[0]);
											send(item.title, async () => {
												await pushMic(false);
												await pushSpeed(speed);
												return pushPattern(item.pattern);
											});
										},
										className: "absolute inset-0 text-left",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute bottom-3 left-3 text-sm font-medium",
											children: item.title
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": `Save ${item.title}`,
										className: "absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/20",
										onClick: () => setSaved((list) => list.includes(item.title) ? list.filter((n) => n !== item.title) : [...list, item.title]),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
											size: 14,
											fill: heart ? "white" : "none"
										})
									})]
								}, item.title);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block text-sm text-muted",
							children: ["Speed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-2 w-full",
								type: "range",
								min: 0,
								max: 100,
								value: speed,
								onChange: (e) => {
									const n = Number(e.target.value);
									setSpeed(n);
									send("Speed", () => pushSpeed(n));
								}
							})]
						})
					] }) : null,
					mode === "music" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Phone microphone drives the strip. Sensitivity follows the beat in preview."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3",
								children: MUSIC_MODES.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setMusic(i);
										setMic(true);
										setPattern(m.pattern);
										send(m.name, async () => {
											await pushMic(true);
											await pushMicEq(m.eq);
											await pushMicSens(70);
											return pushPattern(m.pattern);
										});
									},
									className: `h-24 rounded-2xl text-sm font-medium ${mic && music === i ? "bg-accent text-white" : "bg-surface-2 text-fg"}`,
									children: m.name
								}, m.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMic(false);
									send("Music off", () => pushMic(false));
								},
								className: "h-11 w-full rounded-full bg-surface-2 text-sm text-fg",
								children: "Stop music sync"
							})
						]
					}) : null,
					mode === "diy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm text-muted",
							children: "Paint segments, then apply. The lamp receives the selected segment color."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex gap-1",
							children: diy.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Segment ${i + 1}`,
								onClick: () => setDiyIndex(i),
								className: `h-12 flex-1 rounded-xl ring-2 ${diyIndex === i ? "ring-accent" : "ring-transparent"}`,
								style: { background: rgbCss(c) }
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
							color: diy[diyIndex],
							onPick: (c) => {
								const next = diy.slice();
								next[diyIndex] = c;
								setDiy(next);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setColor(diy[diyIndex]);
								setPattern(null);
								setMic(false);
								send("DIY", async () => {
									await pushMic(false);
									return pushColor(diy[diyIndex]);
								});
							},
							className: "mt-4 h-12 w-full rounded-full bg-accent text-sm font-medium text-white",
							children: "Apply"
						})
					] }) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-md justify-around border-t border-line bg-surface px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]",
				children: [
					[
						"color",
						"Color",
						Palette
					],
					[
						"scene",
						"Scene",
						Sparkles
					],
					[
						"music",
						"Music",
						Music
					],
					[
						"diy",
						"DIY",
						Pencil
					]
				].map(([key, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMode(key),
					className: `flex h-14 w-16 flex-col items-center justify-center gap-1 text-xs ${mode === key ? "text-accent" : "text-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 20 }), label]
				}, key))
			})
		]
	});
}
function ColorPane({ view, color, colors, kelvin, myColors, onView, onColor, onColors, onKelvin, onSave }) {
	const [edit, setEdit] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 grid grid-cols-3 rounded-full bg-surface-2 p-1",
			children: [
				["solid", "Color"],
				["vibrant", "Vibrant"],
				["white", "White"]
			].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onView(key),
				className: `h-9 rounded-full text-sm ${view === key ? "bg-surface font-medium text-fg shadow-sm" : "text-muted"}`,
				children: label
			}, key))
		}),
		view === "solid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
			color,
			onPick: onColor
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: SWATCHES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Preset color",
				onClick: () => onColor(c),
				className: "h-9 w-9 rounded-full ring-2 ring-white",
				style: {
					background: rgbCss(c),
					boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)"
				}
			}, rgbCss(c)))
		})] }) : null,
		view === "vibrant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 h-14 rounded-2xl",
				style: { background: `linear-gradient(90deg, ${colors.map(rgbCss).join(",")})` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex gap-2",
				children: colors.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setEdit(i),
					className: `h-10 flex-1 rounded-xl ring-2 ${edit === i ? "ring-accent" : "ring-transparent"}`,
					style: { background: rgbCss(c) }
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				color: colors[edit],
				onPick: (c) => onColors(colors.map((old, i) => i === edit ? c : old))
			})
		] }) : null,
		view === "white" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "block text-sm text-muted",
			children: [
				kelvin,
				"K",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-3 w-full",
					type: "range",
					min: 2200,
					max: 6500,
					step: 50,
					value: kelvin,
					onChange: (e) => onKelvin(Number(e.target.value)),
					style: { background: "linear-gradient(90deg,#ffb15a,#fff4e0,#f4f7ff,#d7e6ff)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-2 flex justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Warm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cool" })]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-fg",
				children: "My colors"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onSave,
				className: "text-sm text-accent",
				children: "Save"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex gap-2 overflow-x-auto pb-1",
			children: [myColors.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Saved colors show up here."
			}) : null, myColors.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => item.colors.length > 1 ? onColors(item.colors) : onColor(item.colors[0]),
				className: "h-10 w-16 shrink-0 rounded-xl",
				style: { background: item.colors.length > 1 ? `linear-gradient(90deg, ${item.colors.map(rgbCss).join(",")})` : rgbCss(item.colors[0]) }
			}, `${item.name}-${i}`))]
		})
	] });
}
function Wheel({ color, onPick }) {
	const ref = (0, import_react.useRef)(null);
	function pick(clientX, clientY) {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = clientX - rect.left - rect.width / 2;
		const y = clientY - rect.top - rect.height / 2;
		const hue = Math.atan2(y, x) * 180 / Math.PI + 180;
		const sat = Math.min(1, Math.hypot(x, y) / (rect.width / 2));
		onPick(hsl(hue, sat * 100, 50 + (1 - sat) * 25));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			role: "slider",
			"aria-label": "Color wheel",
			"aria-valuetext": `${color.r} ${color.g} ${color.b}`,
			tabIndex: 0,
			onPointerDown: (e) => {
				e.target.setPointerCapture(e.pointerId);
				pick(e.clientX, e.clientY);
			},
			onPointerMove: (e) => {
				if (e.buttons) pick(e.clientX, e.clientY);
			},
			className: "relative h-56 w-56 rounded-full",
			style: { background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-6 rounded-full",
				style: { background: "radial-gradient(circle, white 0%, transparent 68%)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white",
				style: {
					left: "70%",
					top: "32%",
					background: rgbCss(color),
					boxShadow: "0 2px 8px rgba(0,0,0,0.25)"
				}
			})]
		})
	});
}
function pixelColor(kind, color, i, n, phase, gain) {
	if (kind === "solid") return scale(color, gain);
	if (kind === "pulse" || kind === "breathe") return scale(color, (.35 + .65 * (.5 + .5 * Math.sin(phase * .4 + i * .2))) * gain);
	if (kind === "chase") {
		const dist = (i - Math.floor(phase) % n + n) % n;
		return scale(color, (dist < 4 ? 1 - dist / 5 : .08) * gain);
	}
	if (kind === "rainbow" || kind === "wave") return scale(hsl(i / n * 360 + phase * 10, 80, 55), gain);
	if (kind === "strobe") {
		const palette = [
			{
				r: 255,
				g: 40,
				b: 40
			},
			{
				r: 40,
				g: 220,
				b: 80
			},
			{
				r: 50,
				g: 110,
				b: 255
			},
			{
				r: 255,
				g: 200,
				b: 40
			}
		];
		return scale(palette[Math.floor(phase / 2) % palette.length], gain);
	}
	return scale(color, (Math.sin(i * 1.7 + phase) > .72 ? 1 : .12) * gain);
}
function scale(c, w) {
	return {
		r: Math.round(c.r * w),
		g: Math.round(c.g * w),
		b: Math.round(c.b * w)
	};
}
function hsl(h, s, l) {
	const a = s / 100;
	const b = l / 100;
	const k = (n) => (n + h / 30) % 12;
	const f = (n) => b - a * Math.min(b, 1 - b) * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return {
		r: Math.round(255 * f(0)),
		g: Math.round(255 * f(8)),
		b: Math.round(255 * f(4))
	};
}
function kelvinToRgb(k) {
	const t = (k - 2200) / 4300;
	return {
		r: Math.round(255),
		g: Math.round(170 + t * 80),
		b: Math.round(80 + t * 175)
	};
}
var SplitComponent = Nightline;
//#endregion
export { SplitComponent as component };
