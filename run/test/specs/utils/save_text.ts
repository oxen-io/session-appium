import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getTextFromElement } from "./element_text";
import { findElementByAccessibilityId } from "./find_elements_stragegy";
import { waitForElementToBePresent } from "./wait_for";

export const grabTextFromAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const elementId = await waitForElementToBePresent(device, accessibilityId);
  return getTextFromElement(device, elementId);
};
