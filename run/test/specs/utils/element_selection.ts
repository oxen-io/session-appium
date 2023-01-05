import {
  findMatchingTextAndAccessibilityId,
  findMessageWithBody,
  waitForElementToBePresent,
  waitForTextElementToBePresent,
} from ".";
import wd from "wd";

export const clickOnElement = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  await waitForElementToBePresent(device, accessibilityId);
  const el = await device.elementByAccessibilityId(accessibilityId);
  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }

  const actions = new wd.TouchAction(device);
  await actions.tap({ el });
  await actions.perform();

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
  const actions = new wd.TouchAction(device);
  actions.tap({ el });
  await actions.perform();
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

export const longPressSelector = async (
  device: wd.PromiseWebdriver,
  selector: AppiumElement
) => {
  const actions = new wd.TouchAction(device);
  actions.longPress({ el: selector });
  actions.release;
  await actions.perform();
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
