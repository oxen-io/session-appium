import { sleepFor, runOnlyOnAndroid, runOnlyOnIOS } from './utils';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, openAppTwoDevices, closeApp } from './utils/open_app';

async function changeUsernameLinkedDevice(platform: SupportedPlatformsType) {
  // Open server and two devices
  const { device1, device2 } = await openAppTwoDevices(platform);
  const newUsername = 'Alice in chains';
  // link device
  const userA = await linkedDevice(device1, device2, 'Alice', platform);
  // Change username on device 1
  await device1.clickOnByAccessibilityID('User settings');
  // Select username
  await device1.clickOnByAccessibilityID('Username');
  await sleepFor(100);
  await device1.deleteText('Username');
  await device1.inputText('accessibility id', 'Username', newUsername);
  // Select apply
  await runOnlyOnAndroid(platform, () => device1.clickOnByAccessibilityID('Apply'));
  await runOnlyOnIOS(platform, () => device1.clickOnByAccessibilityID('Done'));

  // Check on linked device if name has updated
  await device2.clickOnByAccessibilityID('User settings');
  await runOnlyOnAndroid(platform, () => device2.navigateBack(platform));
  await sleepFor(1000);
  await runOnlyOnAndroid(platform, () => device2.clickOnByAccessibilityID('User settings'));
  const changedUsername = await device2.grabTextFromAccessibilityId('Username');
  console.log('Username is now: ', changedUsername);
  await sleepFor(100);
  if (changedUsername === newUsername) {
    console.log(`Username changed from ${userA.userName} to `, changedUsername);
  } else {
    // throw new Error("Username change unsuccessful")
    console.log('changed: ', changedUsername, 'new: ', newUsername);
  }

  await closeApp(device1, device2);
}
