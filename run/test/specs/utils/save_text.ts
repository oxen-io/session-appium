import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { getTextFromElement } from "./element_text";

export const grabTextFromAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
): Promise<string> => {
  const elementId = await device.waitForElementToBePresent(accessibilityId);

  const text = await getTextFromElement(device, elementId);
  return text;
};
