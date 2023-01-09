import {
  clickOnXAndYCoordinates,
  findMatchingTextAndAccessibilityId,
  sleepFor,
} from ".";
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

    await actions.longPress({ el });
    await actions.wait(500);
    const loc = await el.getLocation();

    await actions.moveTo({ x: loc.x - 100, y: loc.y });
    await actions.release();

    await actions.perform();
    console.warn("Swiped left on " + el);
    // let some time for swipe action to happen and UI to update
    await sleepFor(300);
  } catch (e: any) {
    console.warn("error happened while trying to swipe: ", e.message);
  }
};
