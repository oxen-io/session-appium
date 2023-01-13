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
    const actions = new wd.TouchAction(device);

    await actions.longPress({ el });
    await actions.wait(500);
    const loc = await device.getElementRect(el.ELEMENT);
    if (!loc) {
      throw new Error('did not find element rectangle');
    }

    await actions.moveTo({ x: loc.x - 100, y: loc.y });
    await actions.release();

    await actions.perform();
    console.warn('Swiped left on ' + el);
    // let some time for swipe action to happen and UI to update
    await sleepFor(300);
  } catch (e: any) {
    console.warn('error happened while trying to swipe: ', e.message);
  }
};
