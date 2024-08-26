import { androidIt, iosIt } from '../../types/sessionIt';
import { TickButton, Username } from './locators';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { SupportedPlatformsType, closeApp, openAppOnPlatformSingleDevice } from './utils/open_app';

iosIt('Tiny test', tinyTest, true);
androidIt('Tiny test', tinyTest, true);

async function tinyTest(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  const userA = await newUser(device, 'Alice', platform);
  const newUsername = 'Alice in chains';
  // click on settings/profile avatar
  await device.clickOnByAccessibilityID('User settings');
  // select username
  await device.clickOnByAccessibilityID('Username');
  // type in new username
  await sleepFor(100);
  await device.deleteText(new Username(device));
  await device.inputText(newUsername, new Username(device));
  const changedUsername = await device.grabTextFromAccessibilityId('Username');
  console.log('Changed username', changedUsername);
  if (changedUsername === newUsername) {
    console.log('Username change successful');
  }
  // select tick
  await device.clickOnElementAll(new TickButton(device));
  // verify new username

  await closeApp(device);
}
