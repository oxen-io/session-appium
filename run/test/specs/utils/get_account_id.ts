import { DeviceWrapper } from '../../../types/DeviceWrapper';

export const saveSessionIdIos = async (device: DeviceWrapper) => {
  const selector = await device.grabTextFromAccessibilityId('Session ID generated');
  return selector;
};

export const getAccountId = async (device: DeviceWrapper) => {
  const AccountId = await device.grabTextFromAccessibilityId('Account ID');

  return AccountId;
};
