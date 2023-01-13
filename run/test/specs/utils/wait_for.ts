import { findMatchingTextInElementArray } from '.';
import {
  findElementByAccessibilityId,
  findElementsByAccessibilityId,
} from './find_elements_stragegy';
import {
  AppiumNextDeviceType,
  AppiumNextElementType,
} from '../../../../appium_next';

export function sleepFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const waitForElementToBePresent = async (
  device: AppiumNextDeviceType,
  accessibilityId: string,
  mustBeClickable = false,
  maxWait?: number
): Promise<AppiumNextElementType> => {
  const maxWaitMSec = maxWait || 30000;
  let currentWait = 0;
  const waitPerLoop = 100;
  let selector: AppiumNextElementType | null = null;

  while (selector === null) {
    try {
      console.log(`Waiting for '${accessibilityId}' to be present`);

      selector = await findElementByAccessibilityId(device, accessibilityId);

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
        console.log('Waited for too long');
        throw new Error(`waited for too long looking for '${accessibilityId}'`);
      }
    }
  }
  console.log(`'${accessibilityId}' has been found`);
  return selector;
};

export const waitForTextElementToBePresent = async (
  device: AppiumNextDeviceType,
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
      console.log(`Waiting for '${accessibilityId} to be present with ${text}`);

      const elements = await findElementsByAccessibilityId(
        device,
        accessibilityId
      );

      selector = await findMatchingTextInElementArray(device, elements, text);
    } catch (e) {
      await sleepFor(waitPerLoop);
      currentWait += waitPerLoop;
      console.log('Waiting...');

      if (currentWait >= maxWaitMSec) {
        console.log('Waited too long');
        throw new Error(
          `Waited for too long looking for '${accessibilityId}' and '${text}`
        );
      }
    }
  }
  console.log(`'${accessibilityId}' and '${text}' has been found`);
  return selector;
};
