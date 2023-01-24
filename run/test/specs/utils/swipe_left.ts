import { findMatchingTextAndAccessibilityId } from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const swipeLeft = async (
  device: DeviceWrapper,
  accessibilityId: string,
  text: string
) => {
  const el = await findMatchingTextAndAccessibilityId(
    device,
    accessibilityId,
    text
  );

  const loc = await device.getElementRect(el.ELEMENT);
  console.log(loc);

  if (!loc) {
    throw new Error("did not find element rectangle");
  }
  await device.scroll(
    { x: loc.x + loc.width, y: loc.y + loc.height / 2 },
    { x: loc.x + loc.width / 2, y: loc.y + loc.height / 2 },
    1000
  );

  console.warn("Swiped left on " + el);
  // let some time for swipe action to happen and UI to update
};
