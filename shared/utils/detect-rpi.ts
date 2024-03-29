import * as fs from "fs";

const PI_MODEL_NO = [
  "BCM2708",
  "BCM2709",
  "BCM2710",
  "BCM2711",
  "BCM2835",
  "BCM2837B0",
];

export function isPi(): boolean {
  let cpuInfo;
  try {
    cpuInfo = fs.readFileSync("/proc/cpuinfo", { encoding: "utf8" });
  } catch (e) {
    // if this fails, this is probably not a pi
    return false;
  }

  const model = cpuInfo
    .split("\n")
    .map((line) => line.replace(/\t/g, ""))
    .filter((line) => line.length > 0)
    .map((line) => line.split(":"))
    .map((pair) => pair.map((entry) => entry.trim()))
    .filter((pair) => pair[0] === "Hardware");

  if (!model || model.length === 0) {
    return false;
  }

  return PI_MODEL_NO.indexOf(model[0][1]) > -1;
}
