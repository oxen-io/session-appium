import { AppiumNextDeviceType } from "../../../../appium_next";
import { findElementByAccessibilityId } from "./find_elements_stragegy";

export const deleteText = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const el = await findElementByAccessibilityId(device, accessibilityId);

  // await inputText(device, accessibilityId, '');
  await device.clear(el.ELEMENT);

  console.warn(`Text has been cleared` + accessibilityId);
  return;
};
