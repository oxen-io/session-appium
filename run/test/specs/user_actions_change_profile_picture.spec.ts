import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { parseDataImage } from './utils/check_colour';
import { newUser } from './utils/create_account';
import { SupportedPlatformsType, closeApp, openAppOnPlatformSingleDevice } from './utils/open_app';

iosIt('Change profile picture', changeProfilePictureiOS);
androidIt('Change profile picture', changeProfilePictureAndroid);

async function changeProfilePictureiOS(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  // Create new user
  await newUser(device, 'Alice', platform);
  // Click on settings/avatar
  await device.uploadProfilePicture();
  // Take screenshot
  const el = await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await sleepFor(3000);
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log('RGB Value of pixel is:', pixelColor);
  if (pixelColor === 'ff382e') {
    console.log('Colour is correct');
  } else {
    console.log("Colour isn't ff382e, it is: ", pixelColor);
  }
  await closeApp(device);
}

async function changeProfilePictureAndroid(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const pixelHexColour = 'cbfeff';
  // Create new user
  await newUser(device, 'Alice', platform);
  // Click on settings/avatar
  await device.uploadProfilePicture();
  const el = await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
    maxWait: 10000,
  });
  // Waiting for the image to change in the UI
  await sleepFor(1000);
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log('RGB Value of pixel is:', pixelColor);
  if (pixelColor === pixelHexColour) {
    console.log('Colour is correct on device 1');
  } else {
    console.log("Colour isn't cbfeff, it is: ", pixelColor);
  }
  await closeApp(device);
}
