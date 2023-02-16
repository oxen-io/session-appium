import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const deleteText = async (
  device: DeviceWrapper,
  accessibilityId: string
) => {
  const el = await device.findElementByAccessibilityId(accessibilityId);

  // await inputText(device, accessibilityId, '');
  await device.clear(el.ELEMENT);

  console.warn(`Text has been cleared` + accessibilityId);
  return;
};
