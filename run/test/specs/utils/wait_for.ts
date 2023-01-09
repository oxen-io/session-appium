import { findMatchingTextInElementArray } from ".";
import * as wd from "wd";

export function sleepFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const waitForElementToBePresent = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  mustBeClickable = false,
  maxWait?: number
) => {
  const maxWaitMSec = maxWait || 30000;
  let currentWait = 0;
  const waitPerLoop = 100;
  let selector = null;

  while (selector === null) {
    try {
      console.log(`Waiting for '${accessibilityId}' to be present`);

      selector = await device.elementByAccessibilityId(accessibilityId);
      if (mustBeClickable && selector) {
        const clickable = await selector.waitForClickable();
        if (!clickable) {
          selector = null;
        }
      }
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;

      if (currentWait >= maxWaitMSec) {
        console.log("Waited for too long");
        throw new Error(`waited for too long looking for '${accessibilityId}'`);
      }
    }
  }
  console.log(`'${accessibilityId}' has been found`);
  return selector;
};

export const waitForTextElementToBePresent = async (
  device: wd.PromiseWebdriver,
  accessibilityId: string,
  text: string,
  maxWait?: number
) => {
  let selector: null | AppiumElement = null;
  let maxWaitMSec: number = maxWait || 3000;
  let currentWait: number = 0;
  let waitPerLoop: number = 100;

  while (selector === null) {
    try {
      console.log(`Waiting for '${accessibilityId} to be present with ${text}`);

      const elements = await device.elementsByAccessibilityId(accessibilityId);

      selector = await findMatchingTextInElementArray(elements, text);
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;
      console.log("Waiting...");

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
