import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getTextFromElement } from "./element_text";
import { findElementByAccessibilityId } from "./find_elements_stragegy";

export const grabTextFromAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const elementId = await findElementByAccessibilityId(device, accessibilityId);
  return getTextFromElement(device, elementId);
};
