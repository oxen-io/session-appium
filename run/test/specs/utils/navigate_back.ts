import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { clickOnElement } from "./element_selection";
import { SupportedPlatformsType } from "./open_app";

export const navigateBack = async (
  device: DeviceWrapper,
  platform: SupportedPlatformsType
) => {
  if (platform === "ios") {
    await clickOnElement(device, "Back");
  } else {
    await clickOnElement(device, "Navigate up");
  }
};
