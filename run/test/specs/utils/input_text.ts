import wd from 'wd';
import { findElementByAccessibilityId } from './find_elements_stragegy';
import { waitForElementToBePresent } from './wait_for';
export const inputText = async (
  device: any,
  accessibilityId: string,
  text: string
) => {
  await waitForElementToBePresent(device, accessibilityId);
  const element = await findElementByAccessibilityId(device, accessibilityId);
  if (!element) {
    throw new Error(
      `inputText: Did not find accessibilityId: ${accessibilityId} `
    );
  }

  await device.setElementValue(text, element.ELEMENT, true);
};
