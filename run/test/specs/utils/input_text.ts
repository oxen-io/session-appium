import { AppiumNextDeviceType } from '../../../../appium_next';
import { findElementByAccessibilityId } from './find_elements_stragegy';
import { waitForElementToBePresent } from './wait_for';

export const inputText = async (
  device: AppiumNextDeviceType,
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

  await device.setValue(text, element.ELEMENT);
};
