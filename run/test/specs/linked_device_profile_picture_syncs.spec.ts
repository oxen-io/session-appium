import { androidIt, iosIt } from '../../types/sessionIt';
import { ExitUserProfile } from './locators';
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from './utils';
import { parseDataImage } from './utils/check_colour';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';
iosIt('Avatar restored', avatarRestored);
androidIt('Avatar restored', avatarRestored);

async function avatarRestored(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  let expectedPixelHexColour: string;
  if (platform === 'android') {
    expectedPixelHexColour = 'cbfeff';
  } else if (platform === 'ios') {
    expectedPixelHexColour = '04cbfe';
  } else {
    throw new Error('Platform not supported');
  }
  await linkedDevice(device1, device2, 'Alice', platform);
  await device1.uploadProfilePicture();
  await sleepFor(5000);
  // Wait for change
  // Verify change
  // Take screenshot
  const profilePicture = await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await device2.clickOnByAccessibilityID('User settings');
  await runOnlyOnIOS(platform, () => device1.waitForLoadingOnboarding());
  await runOnlyOnAndroid(platform, () => sleepFor(10000));
  const base64 = await device1.getElementScreenshot(profilePicture.ELEMENT);
  const actualPixelColor = await parseDataImage(base64);
  if (actualPixelColor === expectedPixelHexColour) {
    console.log('Device1: Colour is correct');
  } else {
    throw new Error(`Device1: Colour isn't ${expectedPixelHexColour}, it is: ` + actualPixelColor);
  }
  console.log('Now checking avatar on linked device');
  // Check avatar on device 2
  await sleepFor(3000);
  await device2.clickOnElementAll(new ExitUserProfile(device2));
  await device2.clickOnByAccessibilityID('User settings');
  const profilePictureLinked = await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  const base64A = await device2.getElementScreenshot(profilePictureLinked.ELEMENT);
  const actualPixelColorLinked = await parseDataImage(base64A);
  if (actualPixelColorLinked === expectedPixelHexColour) {
    console.log('Device 2: Colour is correct on linked device');
  } else {
    throw new Error(
      `Device1: Colour isn't ${expectedPixelHexColour}, it is: ` + actualPixelColorLinked
    );
  }
  await closeApp(device1, device2);
}
