import {
  AppiumNextDeviceType,
  AppiumNextElementType,
} from "../../../../appium_next";

export const getTextFromElement = async (
  device: AppiumNextDeviceType,
  element: AppiumNextElementType
): Promise<string> => {
  const text = await device.getText(element.ELEMENT);
  console.log("Getting text from element", text);
  return text;
};
