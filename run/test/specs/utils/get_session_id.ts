import { DeviceWrapper } from '../../../types/DeviceWrapper';

export const saveSessionIDIos = async (device: DeviceWrapper) => {
  const selector = await device.grabTextFromAccessibilityId('Session ID generated');
  return selector;
};

export const getAccountID = async (device: DeviceWrapper) => {
  const AccountID = await device.grabTextFromAccessibilityId('Account ID');

  return AccountID;
};
