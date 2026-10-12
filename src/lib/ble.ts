import {
  SERVICE_UUID,
  WRITE_UUID,
  brightnessFrame,
  colorFrame,
  hexOf,
  micEqFrame,
  micFrame,
  micSensitivityFrame,
  patternFrame,
  powerFrame,
  speedFrame,
  type Rgb,
} from "@/lib/lotus";

type BleDevice = BluetoothDevice & { gatt?: BluetoothRemoteGATTServer };

let device: BleDevice | null = null;
let characteristic: BluetoothRemoteGATTCharacteristic | null = null;

export function bleSupported() {
  return typeof navigator !== "undefined" && !!navigator.bluetooth;
}

export function connectedName() {
  return device?.name ?? null;
}

export function isLinked() {
  return !!characteristic;
}

async function write(bytes: Uint8Array) {
  if (!characteristic) return hexOf(bytes);
  const payload = new Uint8Array(bytes);
  await characteristic.writeValueWithoutResponse(payload);
  return hexOf(bytes);
}

export async function connectLamp(): Promise<string> {
  if (!navigator.bluetooth) {
    throw new Error("This browser has no Bluetooth. Open Nightline in Chrome or Edge on a phone or laptop.");
  }
  const picked = (await navigator.bluetooth.requestDevice({
    filters: [
      { namePrefix: "MELK" },
      { namePrefix: "ELK" },
      { services: [SERVICE_UUID] },
    ],
    optionalServices: [SERVICE_UUID],
  })) as BleDevice;

  device = picked;
  const server = await picked.gatt?.connect();
  if (!server) throw new Error("Could not open the lamp.");
  const service = await server.getPrimaryService(SERVICE_UUID);
  try {
    characteristic = await service.getCharacteristic(WRITE_UUID);
  } catch {
    const all = await service.getCharacteristics();
    const writable = all.find((c) => c.properties.writeWithoutResponse || c.properties.write);
    if (!writable) throw new Error("No write characteristic on this lamp.");
    characteristic = writable;
  }
  picked.addEventListener("gattserverdisconnected", () => {
    characteristic = null;
  });
  return picked.name || "MELK-OC21";
}

export function disconnectLamp() {
  device?.gatt?.disconnect();
  characteristic = null;
  device = null;
}

export async function pushPower(on: boolean) {
  return write(powerFrame(on));
}
export async function pushColor(c: Rgb) {
  return write(colorFrame(c.r, c.g, c.b));
}
export async function pushBrightness(n: number) {
  return write(brightnessFrame(n));
}
export async function pushSpeed(n: number) {
  return write(speedFrame(n));
}
export async function pushPattern(id: number) {
  return write(patternFrame(id));
}
export async function pushMic(on: boolean) {
  return write(micFrame(on));
}
export async function pushMicEq(eq: number) {
  return write(micEqFrame(eq));
}
export async function pushMicSens(n: number) {
  return write(micSensitivityFrame(n));
}
