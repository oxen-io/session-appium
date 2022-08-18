import * as util from "util";
import * as wd from "wd";

const exec = util.promisify(require("child_process").exec);
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

export const getTextElement = async (
  device: wd.PromiseWebdriver,
  text: string
) => {
  const android = await isAndroid(device);
  if (!android) {
    // iOS
    console.warn("not implemented yet");
    const selector = await device.elementByIosPredicateString("something");
    return selector;
  } else {
    // Android
    const selector = await device.elementByAndroidUIAutomatorOrNull(
      `new UiSelector().text("${text}")`
    );
    return selector;
  }
};

export const isAndroid = async (device: wd.PromiseWebdriver) => {
  const capabilities: any = await device.sessionCapabilities();
  return capabilities.platformName === "Android";
};

export const inputText = async (
  device: wd.PromiseWebdriver,
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

async function findAsync(
  arr: Array<any>,
  asyncCallback: (opts?: any) => Promise<any>
) {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex((result) => result);
  return arr[index];
}

export const findMatchingTextInElementArray = async (
  elements: Array<WebdriverIO.Element>,
  textToLookFor: string
): Promise<WebdriverIO.Element | undefined> => {
  if (elements && elements.length) {
    const matching = await findAsync(elements, async (e) => {
      const text = await e?.text?.();
      console.warn("found text", text);
      return text && text === textToLookFor;
    });

    return matching || undefined;
  }
  return undefined;
};

export const findMessageWithBody = async (
  device: wd.PromiseWebdriver,
  textToLookFor: string
): Promise<WebdriverIO.Element> => {
  return findMatchingTextAndAccessibilityId(
    device,
    "Message Body",
    textToLookFor
  );
};

export const findMatchingTextAndAccessibilityId = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  textToLookFor: string
): Promise<WebdriverIO.Element> => {
  console.warn(
    `Looking for all elements with accessibilityId: "${accessibilityId}" and text: "${textToLookFor}" `
  );

  const elements = (await device.elementsByAccessibilityId(
    accessibilityId
  )) as any as Array<any>;

  console.info(
    `found ${elements.length} matching accessibilityId ${accessibilityId}. Now filtering for text`
  );

  const foundElementMatchingText = await findMatchingTextInElementArray(
    elements,
    textToLookFor
  );
  if (!foundElementMatchingText) {
    throw new Error(
      `Did not find element with accessibilityId ${accessibilityId} and text body: ${textToLookFor}`
    );
  }

  return foundElementMatchingText;
};

async function runScriptAndLog(toRun: string) {
  try {
    console.log("running ", toRun);
    const result = await exec(toRun);

    console.log(`result: `, result);
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

  await runScriptAndLog(
    `${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server`
  );
  await runScriptAndLog(
    `${adb} -s ${emulatorName} uninstall io.appium.uiautomator2.server.test`
  );
  await runScriptAndLog(`${adb} -s ${emulatorName} uninstall io.appium.unlock`);
  await runScriptAndLog(
    `${adb} -s ${emulatorName} uninstall io.appium.settings`
  );
  await sleepFor(500);

  await runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-debug-androidTest.apk`
  );
  await sleepFor(500);

  await runScriptAndLog(
    `${adb} -s ${emulatorName} install -g ./node_modules/appium/node_modules/appium-uiautomator2-server/apks/appium-uiautomator2-server-v4.27.0.apk`
  );
  await sleepFor(500);
  await runScriptAndLog(
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
  await runScriptAndLog(
    `${adb} -s ${emulatorName} install -g -t ${appFullPath}`
  );

  await sleepFor(500);
};
