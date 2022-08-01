import * as wd from "wd";

import { exec } from "child_process";
import { getAdbFullPath } from "./binaries";

export function sleepFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const clickOnElement = async (device: any, accessibilityId: string) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  await selector.click();
  return;
};

export const saveText = async (device: any, accessibilityId: string) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.text();
};

export const inputText = async (
  device: any,
  accessibilityId: string,
  text: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.type(text);
};

export const longPress = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  const action = new wd.TouchAction(device);
  action.longPress({ el: selector });
  await action.perform();
};

function runScriptAndLog(toRun: string) {
  try {
    exec(toRun, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  } catch (e) {
    console.warn(e);
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
export const installAppToDeviceName = async (
  appFullPath: string,
  emulatorName: string
) => {
  if (!emulatorName) {
    throw new Error("emulatorName must be set");
  }
  const adb = getAdbFullPath();

  runScriptAndLog(
    `${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server`
  );
  runScriptAndLog(
    `${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server.test`
  );
  runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.unlock`);
  runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.settings`);
  await sleepFor(500);

  runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-debug-androidTest.apk`
  );
  await sleepFor(500);

  runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-v4.27.0.apk`
  );
  await sleepFor(500);
  runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/io.appium.settings/apks/settings_apk-debug.apk`
  );
  await sleepFor(500);

  // runScriptAndLog(
  //   `${adb} -s ${emulatorName} shell am start io.appium.uiautomator2.server`
  // );
  // await sleepFor(500);

  // runScriptAndLog(
  //   `${adb} -s ${emulatorName} shell am start io.appium.uiautomator2.server.test`
  // );

  await sleepFor(500);
  runScriptAndLog(`${adb} -s ${emulatorName} install -g -t ${appFullPath}`);

  await sleepFor(500);
};
