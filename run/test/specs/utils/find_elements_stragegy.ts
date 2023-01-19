import { isArray, isEmpty } from "lodash";

import {
  AppiumNextDeviceType,
  AppiumNextElementType,
} from "../../../../appium_next";

export const findElementByAccessibilityId = async (
  device: AppiumNextDeviceType,
  accessibilityId: string
) => {
  const element = await device.findElement("accessibility id", accessibilityId);
  if (!element || isArray(element)) {
    throw new Error(
      `findElementByAccessibilityId: Did not find accessibilityId: ${accessibilityId} or it was an array `
    );
  }

  return element;
};

export const findElementsByAccessibilityId = async (
  device: AppiumNextDeviceType,
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
  console.warn(`"Elements found": ${accessibilityId} ${elements.length}`);

  return elements;
};

export const findElementByXpath = async (
  device: AppiumNextDeviceType,
  xpath: string
) => {
  const element = await device.findElement("xpath", xpath);
  if (!element || isArray(element)) {
    throw new Error(
      `findElementByXpath: Did not find xpath: ${xpath} or it was an array `
    );
  }
  console.warn(`findElementByXpath "Element found": ${xpath}`);

  return element;
};
