import {
  findMatchingTextAndAccessibilityId,
  findMessageWithBody,
  waitForElementToBePresent,
  waitForTextElementToBePresent,
  findElementByAccessibilityId,
} from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { findElementByXpath } from "./find_elements_stragegy";
import { waitForXPathElement } from "./wait_for";
export const clickOnElement = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const el = await waitForElementToBePresent(device, accessibilityId);

  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }
  await device.click(el.ELEMENT);
};

export const clickOnElementXPath = async (
  device: DeviceWrapper,
  selector: string
) => {
  await waitForXPathElement(device, selector);
  const el = await findElementByXpath(device, selector);
  await device.click(el.ELEMENT);
  console.log(selector, "clicked");
};

export const tapOnElement = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const el = await findElementByAccessibilityId(device, accessibilityId);
  if (!el) {
    throw new Error(`Tap: Couldnt find accessibilityId: ${accessibilityId}`);
  }
  await device.click(el.ELEMENT);
};

export const selectByText = async (
  device: DeviceWrapper,
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
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const el = await waitForElementToBePresent(device, accessibilityId);
  if (!el) {
    throw new Error(
      `longPress: Could not find accessibilityId: ${accessibilityId}`
    );
  }
  await device.longClick(el, 1000);
};

export const longPressMessage = async (
  device: DeviceWrapper,
  textToLookFor: string
) => {
  const el = await findMessageWithBody(device, textToLookFor);
  await device.longClick(el, 1000);
};

export const longPressConversation = async (
  device: DeviceWrapper,
  userName: string
) => {
  const el = await waitForTextElementToBePresent(
    device,
    "Conversation list item",
    userName
  );
  await device.longClick(el, 1000);
};
