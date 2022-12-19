import * as util from "util";
import * as wd from "wd";

const exec = util.promisify(require("child_process").exec);
import { getAdbFullPath } from "./binaries";
import { SupportedPlatformsType } from "./open_app";
import { User } from "./../../../types/testing";
import { sendMessage } from "../utils/send_message";

export function sleepFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const waitForElementToBePresent = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  maxWait?: number
) => {
  const maxWaitMSec = maxWait || 30000;
  let currentWait = 0;
  const waitPerLoop = 100;
  let selector = null;

  while (selector === null) {
    try {
      console.log(`Waiting for '${accessibilityId}' to be present`);

      selector = await device.elementByAccessibilityId(accessibilityId);
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;
      // console.log("Waiting...");

      if (currentWait >= maxWaitMSec) {
        console.log("Waited for too long");
        throw new Error(`waited for too long looking for '${accessibilityId}'`);
      }
    }
  }
  console.log(`'${accessibilityId}' has been found`);
};

export const waitForTextElementToBePresent = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string,
  maxWait?: number
) => {
  let selector: null | AppiumElement = null;
  let maxWaitMSec: number = maxWait || 3000;
  let currentWait: number = 0;
  let waitPerLoop: number = 100;

  while (selector === null) {
    try {
      console.log(`Waiting for '${accessibilityId} to be present with ${text}`);

      const elements = await device.elementsByAccessibilityId(accessibilityId);

      selector = await findMatchingTextInElementArray(elements, text);
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;
      console.log("Waiting...");

      if (currentWait >= maxWaitMSec) {
        console.log("Waited too long");
        throw new Error(
          `Waited for too long looking for '${accessibilityId}' and '${text}`
        );
      }
    }
  }
  console.log(`'${accessibilityId}' and '${text}' has been found`);
};

export const sendMessageTo = async (
  device: wd.PromiseWebdriver,
  sender: User,
  receiver: string
) => {
  const message = `'${sender.userName}' to ${receiver}`;
  await waitForTextElementToBePresent(
    device,
    "Conversation list item",
    receiver
  );
  await selectByText(device, "Conversation list item", receiver);
  console.log(`'${sender.userName}' + " sent message to ${receiver}`);
  await sendMessage(device, message);
};

export const runOnlyOnIOS = async (
  platform: SupportedPlatformsType,
  toRun: () => Promise<any>
) => {
  if (platform === "ios") {
    const value = await toRun();

    return value;
  }
};

export const runOnlyOnAndroid = async (
  platform: SupportedPlatformsType,
  toRun: () => Promise<any>
) => {
  if (platform === "android") {
    const value = await toRun();

    return value;
  }
};

export const saveSessionIDIos = async (
  platform: SupportedPlatformsType,
  device: wd.PromiseWebdriver
) => {
  const selector = await saveText(device, "Session ID generated");

  return selector;
};

export const getSessionID = async (
  platform: SupportedPlatformsType,
  device: wd.PromiseWebdriver
) => {
  let sessionID;

  if (platform === "android") {
    sessionID = await Promise.all([
      runOnlyOnAndroid(platform, () => saveText(device, "Session ID")),
    ]);
  } else if (platform === "ios") {
    sessionID = await runOnlyOnIOS(platform, () =>
      saveSessionIDIos(platform, device)
    );
  }

  return sessionID;
};

export const clickOnElement = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  await waitForElementToBePresent(device, accessibilityId);
  const el = await device.elementByAccessibilityId(accessibilityId);
  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }

  const action = new wd.TouchAction(device);
  await action.tap({ el });
  await action.perform();

  return;
};

export const tapOnElement = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const el = await device.elementByAccessibilityId(accessibilityId);
  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }
  device.waitForElementByAccessibilityId(accessibilityId);
  const action = new wd.TouchAction(device);
  action.tap({ el });
  await action.perform();
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
  console.warn(`"Element found": ${accessibilityId}`);
  await selector;
  return;
};

export const hasElementBeenDeleted = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const fakeError = `${accessibilityId}: has been found, but shouldn't have been. OOPS`;
  try {
    await device.elementByAccessibilityId(accessibilityId);

    throw new Error(fakeError);
  } catch (e: any) {
    if (e.message === fakeError) {
      throw e;
    }
  }
};

export const hasTextElementBeenDeleted = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string
) => {
  const fakeError = `${accessibilityId}: has been found, but shouldn't have been. OOPS`;
  try {
    await findMatchingTextAndAccessibilityId(device, accessibilityId, text);
    throw new Error(fakeError);
  } catch (e: any) {
    if (e.message === fakeError) {
      throw e;
    }
  }
};

export const selectByText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string
) => {
  await waitForTextElementToBePresent(device, accessibilityId, text);
  const selector = await findMatchingTextAndAccessibilityId(
    device,
    accessibilityId,
    text
  );
  await selector.click();
  return;
};

export const saveText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  return await selector.text();
};

export const deleteText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const selector = await device.elementByAccessibilityId(accessibilityId);
  await selector.clear();
  console.warn(`Text has been cleared` + selector);
  return;
};

export const inputText = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string
) => {
  await waitForElementToBePresent(device, accessibilityId);
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
      `longPress: Could not find accessibilityId: ${accessibilityId}`
    );
  }
  const action = new wd.TouchAction(device);
  action.longPress({ el });
  await action.perform();

  return;
};

export const pressAndHold = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const el = await device.elementByAccessibilityId(accessibilityId);
  if (!el) {
    throw new Error(
      `pressAndHold: Could not find accessibilityId: ${accessibilityId}`
    );
  }
  const actions = new wd.TouchAction(device);

  actions.longPress({ el });
  actions.wait(100);
  actions.release();

  await actions.perform();
};

export const longPressMessage = async (
  device: wd.PromiseWebdriver,
  textToLookFor: string
) => {
  const selector = await findMessageWithBody(device, textToLookFor);
  const action = new wd.TouchAction(device);
  action.longPress({ el: selector });
  action.wait(100);
  action.release();
  await action.perform();
};

export const longPressConversation = async (
  device: wd.PromiseWebdriver,
  userName: string
) => {
  const el = await findMatchingTextAndAccessibilityId(
    device,
    "Conversation list item",
    userName
  );
  const action = new wd.TouchAction(device);
  action.longPress({ el });
  action.wait(100);
  action.release();
  await action.perform();
};

export const scrollDown = async (device: wd.PromiseWebdriver) => {
  const action = new wd.TouchAction(device);
  action.press({ x: 760, y: 1500 });
  action.moveTo({ x: 760, y: 710 });
  action.release();
  await action.perform();
};

export const swipeLeft = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string
) => {
  const el = await findMatchingTextAndAccessibilityId(
    device,
    accessibilityId,
    text
  );

  try {
    const actions = new wd.TouchAction(device);

    actions.longPress({ el });
    actions.moveTo({ x: -100 });
    actions.release();

    await actions.perform();
    console.warn("Swiped left on " + el);
    // let some time for swipe action to happen and UI to update
    await sleepFor(300);
  } catch (e: any) {
    console.warn("error happened while trying to swipe: ", e.message);
  }
};

export const clickOnXAndYCoordinates = async (device: wd.PromiseWebdriver) => {
  const actions = new wd.TouchAction(device);

  actions.tap({ x: 85, y: 90 });
  actions.release();

  await actions.perform();
  console.log(`Tapped coordinates`);
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
): Promise<AppiumElement | null> => {
  if (elements && elements.length) {
    const matching = await findAsync(elements, async (e) => {
      const text = await e?.text?.();
      // console.warn(
      //   `Looking for text: "${textToLookFor}" and found text: "${text}"`
      // );
      return text && text.toLowerCase() === textToLookFor.toLowerCase();
    });

    return matching || null;
  }
  return null;
};

export const findMessageWithBody = async (
  device: wd.PromiseWebdriver,
  textToLookFor: string
): Promise<AppiumElement> => {
  await waitForTextElementToBePresent(device, "Message Body", textToLookFor);
  const message = await findMatchingTextAndAccessibilityId(
    device,
    "Message Body",
    textToLookFor
  );
  return message;
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

export const findConfigurationMessage = async (
  device: wd.PromiseWebdriver,
  messageText: string
) => {
  console.warn(`Looking for configuration message with ` + messageText);
  await waitForElementToBePresent(device, "Configuration message");
  const configMessage = findMatchingTextAndAccessibilityId(
    device,
    "Configuration message",
    messageText
  );
  if (!configMessage) {
    throw new Error(`Couldnt find ${configMessage}`);
  }
  return configMessage;
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
