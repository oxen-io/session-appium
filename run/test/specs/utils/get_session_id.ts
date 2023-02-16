import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { SupportedPlatformsType } from "./open_app";
import { grabTextFromAccessibilityId } from "./save_text";

export const saveSessionIDIos = async (device: DeviceWrapper) => {
  const selector = await grabTextFromAccessibilityId(
    device,
    "Session ID generated"
  );
  return selector;
};

export const getSessionID = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper
) => {
  const sessionID = await grabTextFromAccessibilityId(device, "Session ID");

  return sessionID;
};
