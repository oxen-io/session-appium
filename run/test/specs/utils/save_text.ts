import { AppiumNextDeviceType } from "../../../../appium_next";
import { getTextFromElement } from "./element_text";
import { findElementByAccessibilityId } from "./find_elements_stragegy";

export const grabTextFromAccessibilityId = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const elementId = await findElementByAccessibilityId(device, accessibilityId);
  return getTextFromElement(device, elementId);
};
