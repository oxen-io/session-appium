import {
  findMatchingTextInElementArray,
  findElementsByAccessibilityId,
} from ".";
import { AppiumNextElementType } from "../../../../appium_next";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { findElementByXpath } from "./find_elements_stragegy";

export function sleepFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const waitForElementToBePresent = async (
  device: DeviceWrapper,
  accessibilityId: string,
  maxWait?: number
): Promise<AppiumNextElementType> => {
  const maxWaitMSec = maxWait || 30000;
  let currentWait = 0;
  const waitPerLoop = 100;
  let selector: AppiumNextElementType | null = null;

  while (selector === null) {
    try {
      console.log(
        `Waiting for accessibility ID '${accessibilityId}' to be present`
      );

      selector = await device.findElementByAccessibilityId(accessibilityId);
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;

      if (currentWait >= maxWaitMSec) {
        // console.log("Waited for too long");
        throw new Error(`waited for too long looking for '${accessibilityId}'`);
      }
    }
  }
  console.log(`'${accessibilityId}' has been found`);
  return selector;
};

export const waitForTextElementToBePresent = async (
  device: DeviceWrapper,
  accessibilityId: string,
  text: string,
  maxWait?: number
): Promise<AppiumNextElementType> => {
  let selector: null | AppiumNextElementType = null;
  const maxWaitMSec: number = maxWait || 3000;
  let currentWait: number = 0;
  const waitPerLoop: number = 100;

  while (selector === null) {
    try {
      console.log(
        `Waiting for accessibility ID '${accessibilityId}' to be present with ${text}`
      );

      const elements = await findElementsByAccessibilityId(
        device,
        accessibilityId
      );

      selector = await findMatchingTextInElementArray(device, elements, text);
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;

      if (currentWait >= maxWaitMSec) {
        console.log("Waited too long");
        throw new Error(
          `Waited for too long looking for '${accessibilityId}' and '${text}`
        );
      }
    }
  }
  console.log(`'${accessibilityId}' and '${text}' has been found`);
  return selector;
};

export const waitForXPathElement = async (
  device: DeviceWrapper,
  xPath: string,
  maxWait?: number
): Promise<AppiumNextElementType> => {
  let selector: null | AppiumNextElementType = null;
  const maxWaitMSec: number = maxWait || 3000;
  const waitPerLoop: number = 100;
  let currentWait: number = 0;

  while (selector === null) {
    try {
      console.log(`Waiting for xPath: '${xPath}' to be present`);

      selector = await findElementByXpath(device, xPath);
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;
      console.log("Waiting...");

      if (currentWait >= maxWaitMSec) {
        console.log("Waited too long");
        throw new Error(`Waited for too long looking for xPath: '${xPath}'`);
      }
    }
  }
  console.log(`'${xPath}' has been found`);
  return selector;
};
