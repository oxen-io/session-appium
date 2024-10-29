import { androidIt, iosIt } from '../../types/sessionIt';
import { USERNAME } from '../../types/testing';
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
  const el = await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await device2.clickOnByAccessibilityID('User settings');
  await runOnlyOnIOS(platform, () => device1.waitForLoadingOnboarding());
  await runOnlyOnAndroid(platform, () => sleepFor(10000));
  const base64 = await device1.getElementScreenshot(el.ELEMENT);
  const actualPixelColor = await parseDataImage(base64);
  // console.log('Base64 value is', base64);
  console.log('RGB Value of pixel is:', actualPixelColor);
  if (actualPixelColor === expectedPixelHexColour) {
    console.log('Device1: Colour is correct');
  } else {
    throw new Error("Device1: Colour isn't 04cbfe, it is: " + actualPixelColor);
  }
  console.log('Now checking avatar on linked device');
  // Check avatar on device 2
  const el2 = await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await sleepFor(3000);
  const base64A = await device2.getElementScreenshot(el2.ELEMENT);
  const pixelColorLinked = await parseDataImage(base64A);
  if (pixelColorLinked === expectedPixelHexColour) {
    console.log('Device 2: Colour is correct on linked device');
  } else {
    console.log(`Device 2: Colour isn't ${expectedPixelHexColour}, it is: `, pixelColorLinked);
  }
  await closeApp(device1, device2);
}
