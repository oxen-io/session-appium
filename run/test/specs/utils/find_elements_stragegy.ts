import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const findElementByClass = async (
  device: DeviceWrapper,
  androidClassName: string
) => {
  const element = await device.findElements("class name", androidClassName);
  if (!element) {
    throw new Error(
      `findElementByClass: Did not find xpath: ${androidClassName}`
    );
  }

  return element;
};
