import { AppiumNextDeviceType } from '../../../../appium_next';
import { getTextFromElement } from './element_text';
import { findElementByAccessibilityId } from './find_elements_stragegy';
export const saveText = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const selector = await findElementByAccessibilityId(device, accessibilityId);
  console.warn('selector', selector);
  return await getTextFromElement(device, selector);
};
