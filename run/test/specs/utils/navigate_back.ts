import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { SupportedPlatformsType } from "./open_app";

export const navigateBack = async (
  device: DeviceWrapper,
  platform: SupportedPlatformsType
) => {
  if (platform === "ios") {
    await device.clickOnElement("Back");
  } else {
    await device.clickOnElement("Navigate up");
  }
};
