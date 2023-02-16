import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const inputText = async (
  device: DeviceWrapper,
  accessibilityId: string,
  text: string
) => {
  await device.waitForElementToBePresent(accessibilityId);
  const element = await device.findElementByAccessibilityId(accessibilityId);
  if (!element) {
    throw new Error(
      `inputText: Did not find accessibilityId: ${accessibilityId} `
    );
  }

  await device.setValueImmediate(text, element.ELEMENT);
};
