import {
  findMatchingTextAndAccessibilityId,
  findMatchingTextInElementArray,
  findMessageWithBody,
  waitForElementToBePresent,
  waitForTextElementToBePresent,
} from '.';
import wd from 'wd';
import { findElementByAccessibilityId } from './find_elements_stragegy';

export const clickOnElement = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const el = await waitForElementToBePresent(device, accessibilityId, true);

  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }
  console.warn('el', el);
  await device.click(el.ELEMENT);

  // const actions = new wd.TouchAction(device);
  // await actions.tap({ el });
  // await actions.perform();

  return;
};

export const tapOnElement = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const el = await findElementByAccessibilityId(device, accessibilityId);
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
  const el = await findElementByAccessibilityId(device, accessibilityId);
  if (!el) {
    throw new Error(
      `pressAndHold: Could not find accessibilityId: ${accessibilityId}`
    );
  }
  const actions = new wd.TouchAction(device);

  actions.longPress({ el });
  actions.wait(500);
  actions.release();

  await actions.perform();
};

export const longPressSelector = async (
  device: wd.PromiseWebdriver,
  selector: AppiumElement
) => {
  const actions = new wd.TouchAction(device);
  actions.longPress({ el: selector });
  actions.wait(500);
  actions.release();

  await actions.perform();
};

export const pressAndHold = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
) => {
  const element = await waitForElementToBePresent(device, accessibilityId);

  if (!element) {
    throw new Error(
      `pressAndHold: Could not find accessibilityId: ${accessibilityId}`
    );
  }

  await device.touchLongClick(element.ELEMENT, 0, 0, 3000);

  console.log(`Press and hold successful: ${accessibilityId}`);
};

export const longPressMessage = async (
  device: wd.PromiseWebdriver,
  textToLookFor: string
) => {
  const el = await findMessageWithBody(device, textToLookFor);

  const actions = new wd.TouchAction(device);
  actions.longPress({ el });
  actions.wait(500);
  actions.release();
  await actions.perform();
};

export const longPressConversation = async (
  device: wd.PromiseWebdriver,
  userName: string
) => {
  const selector = await waitForTextElementToBePresent(
    device,
    'Conversation list item',
    userName
  );
  const action = new wd.TouchAction(device);
  action.longPress({ el: selector });
  action.wait(500);
  action.release();
  await action.perform();
};
