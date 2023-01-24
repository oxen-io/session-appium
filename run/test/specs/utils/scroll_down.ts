import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const scrollDown = async (device: DeviceWrapper) => {
  await device.scroll({ x: 760, y: 1500 }, { x: 760, y: 710 }, 100);
};
