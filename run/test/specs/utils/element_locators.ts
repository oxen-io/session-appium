import { waitForElementToBePresent, waitForTextElementToBePresent } from ".";
import wd from "wd";
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

export const findAsync = async (
  arr: Array<AppiumElement>,
  asyncCallback: (opts?: any) => Promise<any>
) => {
  const promises = arr.map(asyncCallback);
  const results = await Promise.all(promises);
  const index = results.findIndex((result) => result);
  return arr[index];
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

export const findLastElementInArray = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string
): Promise<AppiumElement> => {
  const elements = await device.elementsByAccessibilityId(accessibilityId);

  console.log(`Elements length: ${elements.length}`);

  const [lastElement] = await elements.slice(-1);

  if (!elements) {
    throw new Error(`No elements found with ${accessibilityId}`);
  }

  return lastElement;
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
