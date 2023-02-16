import { waitForTextElementToBePresent } from ".";
import { AppiumNextElementType } from "../../../../appium_next";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getTextFromElement } from "./element_text";
import { findElementsByAccessibilityId } from "./find_elements_stragegy";

export const findMatchingTextInElementArray = async (
  device: DeviceWrapper,
  elements: Array<AppiumNextElementType>,
  textToLookFor: string
): Promise<AppiumNextElementType | null> => {
  if (elements && elements.length) {
    const matching = await findAsync(elements, async (e) => {
      const text = await getTextFromElement(device, e);

      return Boolean(
        text && text.toLowerCase() === textToLookFor.toLowerCase()
      );
    });

    return matching || null;
  }
  return null;
};

const findAsync = async (
  arr: Array<AppiumNextElementType>,
  asyncCallback: (opts: AppiumNextElementType) => Promise<boolean>
): Promise<AppiumNextElementType> => {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex((result) => result);
  return arr[index];
};

export const findMessageWithBody = async (
  device: DeviceWrapper,
  textToLookFor: string
): Promise<AppiumNextElementType> => {
  await waitForTextElementToBePresent(device, "Message Body", textToLookFor);
  const message = await findMatchingTextAndAccessibilityId(
    device,
    "Message Body",
    textToLookFor
  );
  return message;
};

export const findMatchingTextAndAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string,
  textToLookFor: string
): Promise<AppiumNextElementType> => {
  const elements = await findElementsByAccessibilityId(device, accessibilityId);

  const foundElementMatchingText = await findMatchingTextInElementArray(
    device,
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

export const findLastElementInArray = async (
  device: DeviceWrapper,
  accessibilityId: string
): Promise<AppiumNextElementType> => {
  const elements = await findElementsByAccessibilityId(device, accessibilityId);

  const [lastElement] = elements.slice(-1);

  if (!elements) {
    throw new Error(`No elements found with ${accessibilityId}`);
  }

  return lastElement;
};

export const findConfigurationMessage = async (
  device: DeviceWrapper,
  messageText: string
) => {
  await device.waitForElementToBePresent("Configuration message");
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
