import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const grabTextFromAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
): Promise<string> => {
  const elementId = await device.waitForElementToBePresent(accessibilityId);

  const text = await device.getTextFromElement(elementId);
  return text;
};
