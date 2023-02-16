import { isArray, isEmpty } from "lodash";
import { AppiumNextElementType } from "../../../../appium_next";
import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const findElementsByAccessibilityId = async (
  device: DeviceWrapper,
  accessibilityId: string
): Promise<Array<AppiumNextElementType>> => {
  const elements = await device.findElements(
    "accessibility id",
    accessibilityId
  );
  if (!elements || !isArray(elements) || isEmpty(elements)) {
    throw new Error(
      `findElementsByAccessibilityId: Did not find accessibilityId: ${accessibilityId} `
    );
  }

  return elements;
};

export const findElementByXpath = async (
  device: DeviceWrapper,
  xpath: string
) => {
  const element = await device.findElement("xpath", xpath);
  if (!element) {
    throw new Error(`findElementByXpath: Did not find xpath: ${xpath}`);
  }

  return element;
};

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
