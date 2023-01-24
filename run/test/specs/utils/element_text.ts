import { AppiumNextElementType } from "../../../../appium_next";
import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const getTextFromElement = async (
  device: DeviceWrapper,
  element: AppiumNextElementType
): Promise<string> => {
  const text = await device.getText(element.ELEMENT);

  return text;
};
// NEEDS TO BE FIXED
