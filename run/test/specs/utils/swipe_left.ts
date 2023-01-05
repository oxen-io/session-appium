import { findMatchingTextAndAccessibilityId, sleepFor } from ".";
import * as wd from "wd";

export const swipeLeft = async (
  device: wd.PromiseWebdriver,
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

    actions.longPress({ el });
    actions.moveTo({ x: -100 });
    actions.release();

    await actions.perform();
    console.warn("Swiped left on " + el);
    // let some time for swipe action to happen and UI to update
    await sleepFor(300);
  } catch (e: any) {
    console.warn("error happened while trying to swipe: ", e.message);
  }
};
