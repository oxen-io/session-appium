import { AppiumNextDeviceType } from '../../../../appium_next';
import { findElementByAccessibilityId } from './find_elements_stragegy';
import { inputText } from './input_text';

export const deleteText = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const el = await findElementByAccessibilityId(device, accessibilityId);
  await inputText(device, accessibilityId, '');

  console.warn(`Text has been cleared` + accessibilityId);
  return;
};
