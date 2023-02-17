import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const hasElementBeenDeleted = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const fakeError = `${accessibilityId}: has been found, but shouldn't have been. OOPS`;
  try {
    await device.findElementByAccessibilityId(accessibilityId);

    throw new Error(fakeError);
  } catch (e: any) {
    if (e.message === fakeError) {
      throw e;
    }
  }
  console.log(accessibilityId, "is not visible, congratulations");
};

export const hasTextElementBeenDeleted = async (
  device: DeviceWrapper,
  accessibilityId: string,
  text: string
) => {
  const fakeError = `${accessibilityId}: has been found, but shouldn't have been. OOPS`;
  try {
    await device.findMatchingTextAndAccessibilityId(accessibilityId, text);
    throw new Error(fakeError);
  } catch (e: any) {
    if (e.message === fakeError) {
      throw e;
    }
  }
  console.log(accessibilityId + text, "is not visible, congratulations");
};
