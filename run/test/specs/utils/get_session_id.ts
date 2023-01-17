import { SupportedPlatformsType } from "./open_app";
import { AppiumNextDeviceType } from "../../../../appium_next";
import _ from "lodash";
import { isDeviceAndroid, isDeviceIOS } from "./utilities";
import { grabTextFromAccessibilityId } from "./save_text";

export const saveSessionIDIos = async (device: AppiumNextDeviceType) => {
  const selector = await grabTextFromAccessibilityId(
    device,
    "Session ID generated"
  );
  return selector;
};

export const getSessionID = async (
  platform: SupportedPlatformsType,
  device: AppiumNextDeviceType
) => {
  const sessionID = await grabTextFromAccessibilityId(device, "Session ID");

  return sessionID;
};
