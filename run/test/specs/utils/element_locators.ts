import { waitForElementToBePresent, waitForTextElementToBePresent } from ".";
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
      console.warn(
        `Looking for text: "${textToLookFor}" and found text: "${text}"`
      );
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

// export const findElement = async (
//   device: DeviceWrapper,
//   accessibilityId: string
// ) => {
//   const selector = await waitForElementToBePresent(device, accessibilityId);
//   if (!selector) {
//     throw new Error(
//       `findElement: Did not find accessibilityId: ${accessibilityId} `
//     );
//   }
//   console.warn(`"Element found": ${accessibilityId}`);
//   await selector;
//   return;
// };

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
  console.warn(
    `Looking for all elements with accessibilityId: "${accessibilityId}" and text: "${textToLookFor}" `
  );
  const elements = await findElementsByAccessibilityId(device, accessibilityId);

  console.info(
    `found ${elements.length} matching accessibilityId ${accessibilityId}. Now filtering for text`
  );

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

  console.log(`Elements length: ${elements.length}`);

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
