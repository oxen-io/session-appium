import { findMatchingTextAndAccessibilityId, sleepFor } from ".";
import { AppiumNextDeviceType } from "../../../../appium_next";
import { isDeviceIOS } from "./utilities";

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
  const ios = await isDeviceIOS(device);
  if (ios) {
    await device.touchLongClick(el.ELEMENT);
  } else {
    // android
  }

  const loc = await device.getElementRect(el.ELEMENT);
  if (!loc) {
    throw new Error("did not find element rectangle");
  }
  await device.touchMove(loc.x - 100, loc.y);

  console.warn("Swiped left on " + el);
  // let some time for swipe action to happen and UI to update
};
