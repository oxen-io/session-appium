import {  DeviceWrapper } from "../../../types/DeviceWrapper";

export const clickOnXAndYCoordinates = async (
  device: DeviceWrapper,
  xCoOrdinates: number,
  yCoOrdinates: number
) => {
  await device.pressCoordinates(xCoOrdinates, yCoOrdinates);
  console.log(`Tapped coordinates ${xCoOrdinates}, ${yCoOrdinates}`);
};
