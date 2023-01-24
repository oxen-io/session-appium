import { readFileSync } from "fs";
import { AppiumNextDeviceType } from "../../../../appium_next";
import { DeviceWrapper } from "../../../types/DeviceWrapper";

export function pushFile(device: DeviceWrapper, filepath: string) {
  const payloadBase64 = readFileSync(filepath, { encoding: "base64" });
  return device.pushFile("", payloadBase64);
}
