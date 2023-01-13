import { AppiumNextDeviceType } from '../../../../appium_next';
import { findElementByAccessibilityId } from './find_elements_stragegy';
export const doFunctionIfElementExists = async (
  device: AppiumNextDeviceType,
  accessibilityId: string,
  toRun: () => Promise<any>
) => {
  try {
    const selector = await findElementByAccessibilityId(
      device,
      accessibilityId
    );
    // Check if element exists
    if (selector) {
      // IF yes do the thing
      console.log('Found selector so doing the thing');
      await toRun();
    }
  } catch (e) {
    console.log(`No ${accessibilityId} so moving on`);
  }
};
