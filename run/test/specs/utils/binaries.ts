import { existsSync } from 'fs';
import { join } from 'path';

export const getAndroidBinariesRoot = () => {
  if (process.env.APPIUM_ANDROID_BINARIES_ROOT) {
    return process.env.APPIUM_ANDROID_BINARIES_ROOT;
  }
  throw new Error('env variable `APPIUM_ANDROID_BINARIES_ROOT` needs to be set');
};

export const getAdbFullPath = () => {
  const fromEnv = process.env.APPIUM_ADB_FULL_PATH;
  if (!fromEnv) {
    throw new Error('env variable `APPIUM_ADB_FULL_PATH` needs to be set');
  }

  if (!existsSync(fromEnv)) {
    throw new Error('adb does not exist at: ' + fromEnv);
  }

  return fromEnv;
};

export const getEmulatorFullPath = () => {
  if (!process.env.APPIUM_ADB_FULL_PATH) {
    throw new Error('env variable `APPIUM_ADB_FULL_PATH` needs to be set');
  }

  return join(process.env.APPIUM_ADB_FULL_PATH, '..', '..', 'emulator', 'emulator');
};

export const getAvdManagerFullPath = () => {
  if (!process.env.APPIUM_ADB_FULL_PATH) {
    throw new Error('env variable `APPIUM_ADB_FULL_PATH` needs to be set');
  }

  return join(
    process.env.APPIUM_ADB_FULL_PATH,
    '..',
    '..',
    'cmdline-tools',
    'latest',
    'bin',
    'avdmanager'
  );
};
