import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { SupportedPlatformsType } from "./open_app";

export const saveSessionIDIos = async (device: DeviceWrapper) => {
  const selector = await device.grabTextFromAccessibilityId(
    "Session ID generated"
  );
  return selector;
};

export const getAccountID = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper
) => {
  const AccountID = await device.grabTextFromAccessibilityId("Account ID");

  return AccountID;
};
