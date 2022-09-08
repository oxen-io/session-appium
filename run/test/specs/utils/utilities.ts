import { pick } from "lodash";
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

export const findElement = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  if (!selector) {
    throw new Error(
      `findElement: Did not find accessibilityId: ${accessibilityId} `
    );
  }
  console.warn(`"Element found", ${accessibilityId}`);
  await selector;
  return;
};

export const hasElementBeenDeleted = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);

  if (!selector) {
    console.warn(selector + "has been deleted");
    return;
  } else {
    throw new Error(selector + "has been found, oops");
  }
};

export const hasTextElementBeenDeleted = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string
) => {
  const selector = await findMatchingTextAndAccessibilityId(
    device,
    accessibilityId,
    text
  );

  if (!selector) {
    console.warn(selector + "has been deleted");
    return;
  } else {
    throw new Error(`'Found element that shouldnt exist'+ ${selector} `);
  }
};

export const selectByText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string
) => {
  const selector = await findMatchingTextAndAccessibilityId(
    device,
    accessibilityId,
    text
  );
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
  const element = await device.elementByAccessibilityId(accessibilityId);
  if (!element) {
    throw new Error(
      `inputText: Did not find accessibilityId: ${accessibilityId} `
    );
  }
  // not sure what is the type of element here, but there is a type available for it...
  return (element as any)?.type(text);
};

export const longPress = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const el = await device.elementByAccessibilityId(accessibilityId);
  if (!el) {
    throw new Error(
      `longPress: could not find this accessibilityId: ${accessibilityId}`
    );
  }
  const action = new wd.TouchAction(device);
  action.longPress({ el });
  await action.perform();
};

export const longPressMessage = async (
  device: wd.PromiseWebdriver,
  selector: AppiumElement
) => {
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
  elements: Array<AppiumElement>,
  textToLookFor: string
): Promise<AppiumElement | undefined> => {
  if (elements && elements.length) {
    const matching = await findAsync(elements, async (e) => {
      const text = await e?.text?.();
      console.warn(
        `Looking for text: "${textToLookFor}" and found text: "${text}"`
      );
      return text && text.toLowerCase() === textToLookFor.toLowerCase();
    });

    return matching || undefined;
  }
  return undefined;
};

export const findMessageWithBody = async (
  device: wd.PromiseWebdriver,
  textToLookFor: string
): Promise<AppiumElement> => {
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
): Promise<AppiumElement> => {
  console.warn(
    `Looking for all elements with accessibilityId: "${accessibilityId}" and text: "${textToLookFor}" `
  );

  const elements = await device.elementsByAccessibilityId(accessibilityId);

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
    // console.log("running ", toRun);
    const result = await exec(toRun);

    if (
      result &&
      result.stderr &&
      !result.stderr.startsWith(
        "All files should be loaded. Notifying the device"
      )
    ) {
      // console.log(`cmd which failed: "${toRun}"`);
      // console.log(`result: "${result.stderr}"`);
    }
  } catch (e) {
    const cmd = (e as any).cmd;
    // console.warn(`cmd which failed: "${cmd}"`);
    // console.warn(pick(e, ["stdout", "stderr"]));
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

export const installiOSAppToDeviceName = (
  iosAppFullPath: string,
  emulatorName: string
) => {
  console.warn("should install app on ios");
};
