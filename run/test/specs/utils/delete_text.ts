import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { findElementByAccessibilityId } from "./find_elements_stragegy";

export const deleteText = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const el = await findElementByAccessibilityId(device, accessibilityId);

  // await inputText(device, accessibilityId, '');
  await device.clear(el.ELEMENT);

  console.warn(`Text has been cleared` + accessibilityId);
  return;
};
