import { findMatchingTextAndAccessibilityId, sleepFor } from '.';
import { AppiumNextDeviceType } from '../../../../appium_next';

export const swipeLeft = async (
  device: AppiumNextDeviceType,
  accessibilityId: string,
  text: string
) => {
  const el = await findMatchingTextAndAccessibilityId(
    device,
    accessibilityId,
    text
  );

  try {
    await device.touchLongClick(el.ELEMENT);

    const loc = await device.getElementRect(el.ELEMENT);
    if (!loc) {
      throw new Error('did not find element rectangle');
    }
    // await device.touchDown(, y);

    await device.touchMove(loc.x - 100, loc.y);

    console.warn('Swiped left on ' + el);
    // let some time for swipe action to happen and UI to update
    await sleepFor(300);
  } catch (e: any) {
    console.warn('error happened while trying to swipe: ', e.message);
  }
};
