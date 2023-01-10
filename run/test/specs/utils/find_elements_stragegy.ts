import { AppiumNextDeviceType } from "../../../../appium_next";

export const findElementByAccessibilityId = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const element = await device.findElOrEls("accessibility id", accessibilityId);
  if (!element) {
    throw new Error(
      `findElementByAccessibilityId: Did not find accessibilityId: ${accessibilityId} `
    );
  }
  console.warn(`"Element found": ${accessibilityId}`);

  return element;
};
