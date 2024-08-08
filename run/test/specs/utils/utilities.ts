import { pick } from 'lodash';
import * as util from 'util';
import { sleepFor } from '.';
import { getAdbFullPath } from './binaries';

import { exec as execNotPromised } from 'child_process';
const exec = util.promisify(execNotPromised);

export async function runScriptAndLog(toRun: string, verbose = false): Promise<string> {
  try {
    if (verbose) {
      console.log('running ', toRun);
    }
    const result = await exec(toRun);

    if (
      result &&
      result.stderr &&
      !result.stderr.startsWith('All files should be loaded. Notifying the device')
    ) {
      if (verbose) {
        console.log(`cmd which failed: "${toRun}"`);
        console.log(`result: "${result.stderr}"`);
      }
      return ''.concat(result.stderr, result.stdout);
    }
    if (verbose) {
      console.log('was run: ', toRun, result);
    }
    return ''.concat(result.stderr, result.stdout);
  } catch (e: any) {
    const cmd = e.cmd;
    if (verbose) {
      console.info(`cmd which failed: "${cmd as string}"`);
      console.info(pick(e, ['stdout', 'stderr']));
    }
    return ''.concat(e.stderr as string, e.stdout as string);
  }
}

/**
 * Somehow, the install process of appium dependencies and the application itself is not reliable.
 * This function makes sure to clean anything related to appium before installing our app again.
 *
 * I found out that this makes the restart a lot more reliable between test, even if it is way slower.
 * @param appFullPath
 * @param emulatorName i.e. emulator-5554 or whatever
 */
export const installAppToDeviceName = async (appFullPath: string, emulatorName: string) => {
  if (!emulatorName) {
    throw new Error('emulatorName must be set');
  }
  // If needing logs uncomment this
  // await runScriptAndLog(`emulator -avd ${emulatorName}`, true);
  const start = Date.now();
  const adb = getAdbFullPath();

  await runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server`);
  await runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server.test`);
  await runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.unlock`);
  await runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.settings`);
  await runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-debug-androidTest.apk`
  );
  await runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-v4.27.0.apk`
  );
  await sleepFor(100);
  await runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/io.appium.settings/apks/settings_apk-debug.apk`
  );
  await sleepFor(100);
  await runScriptAndLog(`${adb} -s ${emulatorName} install -g -t ${appFullPath}`);
};

export const isDeviceIOS = (device: unknown) => {
  return (device as any).originalCaps.alwaysMatch['appium:platformName']?.toLowerCase() === 'ios';
};

export const isDeviceAndroid = (device: unknown) => !isDeviceIOS(device);
