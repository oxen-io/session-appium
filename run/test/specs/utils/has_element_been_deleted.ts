import { findMatchingTextAndAccessibilityId } from ".";
import { AppiumNextDeviceType } from "../../../../appium_next";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { findElementByAccessibilityId } from "./find_elements_stragegy";

export const hasElementBeenDeleted = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const fakeError = `${accessibilityId}: has been found, but shouldn't have been. OOPS`;
  try {
    await findElementByAccessibilityId(device, accessibilityId);

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
    await findMatchingTextAndAccessibilityId(device, accessibilityId, text);
    throw new Error(fakeError);
  } catch (e: any) {
    if (e.message === fakeError) {
      throw e;
    }
  }
  console.log(accessibilityId + text, "is not visible, congratulations");
};
