import {
  findMatchingTextAndAccessibilityId,
  findMessageWithBody,
  waitForElementToBePresent,
  waitForTextElementToBePresent,
  findElementByAccessibilityId,
} from ".";
import { AppiumNextDeviceType } from "../../../../appium_next";
import { isDeviceAndroid, isDeviceIOS } from "./utilities";
export const clickOnElement = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const el = await waitForElementToBePresent(device, accessibilityId);

  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }
  await device.click(el.ELEMENT);
};

export const tapOnElement = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const el = await findElementByAccessibilityId(device, accessibilityId);
  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }
  await device.click(el.ELEMENT);
};

export const selectByText = async (
  device: AppiumNextDeviceType,
  accessibilityId: string,
  text: string
) => {
  await waitForTextElementToBePresent(device, accessibilityId, text);
  const selector = await findMatchingTextAndAccessibilityId(
    device,
    accessibilityId,
    text
  );
  await device.click(selector.ELEMENT);

  return;
};

export const longPress = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const el = await findElementByAccessibilityId(device, accessibilityId);
  if (!el) {
    throw new Error(
      `pressAndHold: Could not find accessibilityId: ${accessibilityId}`
    );
  }

  const ios = await isDeviceIOS(device);
  if (ios) {
    await device.mobileTouchAndHold({
      duration: 1,
      elementId: el.ELEMENT,
    });
  } else {
    await device.touchLongClick(el.ELEMENT);
  }
};

export const pressAndHold = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const element = await waitForElementToBePresent(device, accessibilityId);
  if (!element) {
    throw new Error(
      `pressAndHold: Could not find accessibilityId: ${accessibilityId}`
    );
  }
  const ios = await isDeviceIOS(device);
  if (ios) {
    await device.mobileTouchAndHold({
      duration: 1,
      elementId: element.ELEMENT,
    });
  } else {
    await device.touchLongClick(element.ELEMENT);
  }

  console.log(`Press and hold successful: ${accessibilityId}`);
};

export const longPressMessage = async (
  device: AppiumNextDeviceType,
  textToLookFor: string
) => {
  const el = await findMessageWithBody(device, textToLookFor);
  await device.touchLongClick(el.ELEMENT);
};

export const longPressConversation = async (
  device: AppiumNextDeviceType,
  userName: string
) => {
  const el = await waitForTextElementToBePresent(
    device,
    "Conversation list item",
    userName
  );
  await device.touchLongClick(el.ELEMENT);
};
