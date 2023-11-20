import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { Coordinates } from "../../../types/testing";

export const clickOnXAndYCoordinates = async (
  device: DeviceWrapper,
  coordinates: Coordinates
) => {
  const { x, y } = coordinates;
  await device.pressCoordinates(x, y);
  console.log(`Tapped coordinates ${x}, ${y}`);
};
