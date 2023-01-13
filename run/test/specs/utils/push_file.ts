import { readFileSync } from 'fs';
import { AppiumNextDeviceType } from '../../../../appium_next';

export function pushFile(device: AppiumNextDeviceType, filepath: string) {
  const payloadBase64 = readFileSync(filepath, { encoding: 'base64' });
  return device.pushFile('', payloadBase64);
}
