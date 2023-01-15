import { AppiumNextDeviceType } from '../../../../appium_next';

export const scrollDown = async (device: AppiumNextDeviceType) => {
  await device.touchDown(760, 1500);
  await device.touchMove(760, 710);
  await device.touchUp(760, 710);
};
