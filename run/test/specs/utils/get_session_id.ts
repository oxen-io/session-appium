import { runOnlyOnAndroid, runOnlyOnIOS, saveText } from '.';
import { SupportedPlatformsType } from './open_app';
import { AppiumNextDeviceType } from '../../../../appium_next';

export const saveSessionIDIos = async (
  platform: SupportedPlatformsType,
  device: AppiumNextDeviceType
) => {
  const selector = await saveText(device, 'Session ID generated');

  return selector;
};

export const getSessionID = async (
  platform: SupportedPlatformsType,
  device: AppiumNextDeviceType
) => {
  let sessionID;

  if (platform === 'android') {
    sessionID = await Promise.all([
      runOnlyOnAndroid(platform, () => saveText(device, 'Session ID')),
    ]);
  } else if (platform === 'ios') {
    sessionID = await runOnlyOnIOS(platform, () =>
      saveSessionIDIos(platform, device)
    );
  }

  return sessionID;
};
