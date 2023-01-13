import { AppiumNextDeviceType } from '../../../../appium_next';

export const clickOnXAndYCoordinates = async (
  device: AppiumNextDeviceType,
  xCoordinate: number,
  yCoordinate: number
) => {
  const actions = new wd.TouchAction(device);

  actions.tap({ x: xCoordinate, y: yCoordinate });
  actions.release();

  await actions.perform();
  console.log(`Tapped coordinates`);
};
