import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getTextFromElement } from "./element_text";
import { waitForElementToBePresent } from "./wait_for";

export const grabTextFromAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
): Promise<string> => {
  const elementId = await waitForElementToBePresent(device, accessibilityId);

  const text = await getTextFromElement(device, elementId);
  return text;
};
