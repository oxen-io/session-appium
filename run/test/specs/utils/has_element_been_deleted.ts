import { findMatchingTextAndAccessibilityId } from '.';
import wd from 'wd';
import { findElementByAccessibilityId } from './find_elements_stragegy';

export const hasElementBeenDeleted = async (
  device: wd.PromiseWebdriver,
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
};

export const hasTextElementBeenDeleted = async (
  device: wd.PromiseWebdriver,
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
};
