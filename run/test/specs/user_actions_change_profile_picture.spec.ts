import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { parseDataImage } from './utils/check_colour';
import { newUser } from './utils/create_account';
import { SupportedPlatformsType, closeApp, openAppOnPlatformSingleDevice } from './utils/open_app';
import fs from 'fs';

iosIt('Change profile picture', 'medium', changeProfilePictureiOS);
androidIt('Change profile picture', 'medium', changeProfilePictureAndroid);

async function changeProfilePictureiOS(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const pixelHexColour = '04cbfe';
  // Create new user
  await newUser(device, 'Alice', platform);
  // Click on settings/avatar
  await device.uploadProfilePicture();
  // Take screenshot
  await sleepFor(4000);
  const el = await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log('RGB Value of pixel is:', pixelColor);
  if (pixelColor === pixelHexColour) {
    console.log('Colour is correct');
  } else {
    console.log("Colour isn't 04cbfe, it is: ", pixelColor);
  }
  await closeApp(device);
}

async function changeProfilePictureAndroid(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const pixelHexColour = '04cbfe';
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
  await sleepFor(10000);
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  fs.writeFileSync('screenshot.png', base64, 'base64');
  const pixelColor = await parseDataImage(base64);
  console.log('Hex value of pixel is:', pixelColor);
  if (pixelColor === pixelHexColour) {
    console.log('Colour is correct');
  } else {
    throw new Error("Colour isn't 04cbfe, it is: " + pixelColor);
  }
  await closeApp(device);
}
