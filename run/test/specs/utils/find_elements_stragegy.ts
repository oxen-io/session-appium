import { isArray, isEmpty } from "lodash";
import { AppiumNextElementType } from "../../../../appium_next";
import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const findElementByClass = async (
  device: DeviceWrapper,
  androidClassName: string
) => {
  const element = await device.findElements("class name", androidClassName);
  if (!element) {
    throw new Error(
      `findElementByClass: Did not find xpath: ${androidClassName}`
    );
  }

  return element;
};

export const doesElementExist = async (
  device: DeviceWrapper,
  strategy: "accessibility id" | "xpath",
  selector: string
) => {
  try {
    console.log(selector, "Element exists");
    return await device.findElement(strategy, selector);
  } catch {
    console.log(`Couldnt find `, selector);
  }
};
