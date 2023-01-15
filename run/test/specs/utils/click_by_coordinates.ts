import { AppiumNextDeviceType } from '../../../../appium_next';

export const clickOnXAndYCoordinates = async (
  device: AppiumNextDeviceType,
  xCoordinate: number,
  yCoordinate: number
) => {
  await device.touchDown(xCoordinate, yCoordinate);
  await device.touchUp(xCoordinate, yCoordinate);
  console.log(`Tapped coordinates ${xCoordinate}:${yCoordinate}`);
};
