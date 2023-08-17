import { newUser } from './create_account';
import { SupportedPlatformsType } from './open_app';
import { clickOnElement, inputText, sleepFor } from './utilities';
import { PromiseWebdriver } from 'wd';

export const linkedDevice = async (
  device1: PromiseWebdriver,
  device2: PromiseWebdriver,
  userName: string,
  platform: SupportedPlatformsType,
) => {
  const user = await newUser(device1, userName, platform);
  // Log in with recovery seed on device 2
  await clickOnElement(device2, 'Link a device');
  // Enter recovery phrase into input box
  await inputText(device2, 'Enter your recovery phrase', user.recoveryPhrase);
  // Continue with recovery phrase
  await clickOnElement(device2, 'Continue');
  // Click continue on message notification settings

  await clickOnElement(device2, 'Continue');
  // Wait for any notifications to disappear
  await sleepFor(10000);
  await clickOnElement(device2, 'Continue with settings');
  console.warn('Device 3 linked');

  return user;
};
