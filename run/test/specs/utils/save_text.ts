import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getTextFromElement } from "./element_text";
import { waitForElementToBePresent } from "./wait_for";

export const grabTextFromAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const elementId = await waitForElementToBePresent(device, accessibilityId);
  return getTextFromElement(device, elementId);
};
