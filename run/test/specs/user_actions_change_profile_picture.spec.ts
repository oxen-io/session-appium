import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { getAdbFullPath } from './utils/binaries';
import { parseDataImage } from './utils/check_colour';
import { newUser } from './utils/create_account';
import { SupportedPlatformsType, closeApp, openAppOnPlatformSingleDevice } from './utils/open_app';
import { runScriptAndLog } from './utils/utilities';

iosIt('Change profile picture', changeProfilePictureiOS);
androidIt('Change profile picture', changeProfilePictureAndroid);

async function changeProfilePictureiOS(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const spongebobsBirthday = '199805010700.00';
  // Create new user
  await newUser(device, 'Alice', platform);
  // Click on settings/avatar
  await device.clickOnByAccessibilityID('User settings');
  await sleepFor(100);
  await device.clickOnByAccessibilityID('User settings');
  // await device.clickOnByAccessibilityID("Photo library");
  await device.clickOnByAccessibilityID('Image picker');
  await device.modalPopup({ strategy: 'accessibility id', selector: 'Allow Full Access' });
  const profilePicture = await device.doesElementExist({
    strategy: 'accessibility id',
    selector: `profile_picture.jpg, 27.75 kB, May 1, 1999`,
    maxWait: 2000,
  });
  if (!profilePicture) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/profile_picture.jpg'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${
        (device as { udid?: string }).udid || ''
      } 'run/test/specs/media/profile_picture.jpg'`,
      true
    );
  }
  // Click on Profile picture
  // Click on Photo library
  await sleepFor(100);
  await device.clickOnByAccessibilityID(`profile_picture.jpg, 27.75 kB, May 1, 1999`);
  await device.clickOnByAccessibilityID('Done');

  await device.clickOnByAccessibilityID('Save');
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
  const spongebobsBirthday = '199905010700.00';
  const pixelHexColour = 'cbfeff';
  // Create new user
  await newUser(device, 'Alice', platform);
  // Click on settings/avatar
  await device.clickOnByAccessibilityID('User settings');
  // Click on Profile picture
  await device.clickOnByAccessibilityID('User settings');
  // Click on Photo library
  await device.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Upload',
  });
  await device.clickOnElementById(
    'com.android.permissioncontroller:id/permission_allow_foreground_only_button'
  );
  await sleepFor(1000);
  await device.clickOnElementAll({
    strategy: 'id',
    selector: 'android:id/text1',
    text: 'Files',
  });
  await sleepFor(500);
  // TO FIX COULDNT FIND MORE OPTIONS
  // await device.clickOnElementAll({
  //   strategy: 'id',
  //   selector: 'com.google.android.apps.photos:id/image',
  // });
  // Select file
  const profilePicture = await device.doesElementExist({
    strategy: 'accessibility id',
    selector: `profile_picture.jpg, 27.75 kB, May 1, 1999`,
    maxWait: 5000,
  });
  // If no image, push file to device
  if (!profilePicture) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/profile_picture.jpg'`
    );

    await runScriptAndLog(
      `${getAdbFullPath()} -s emulator-5554 push 'run/test/specs/media/profile_picture.jpg' /sdcard/Download/`,
      true
    );
    // Verifies that the file was successful downloaded to device
    await runScriptAndLog(`${getAdbFullPath()} -s emulator-5554 shell ls /sdcard/Download/`, true);
  }
  await device.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'profile_picture.jpg, 27.75 kB, May 1, 1999',
  });
  await device.clickOnElementById('network.loki.messenger:id/crop_image_menu_crop');
  const el = await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
    maxWait: 10000,
  });
  // Waiting for the image to change in the UI
  await sleepFor(1000);
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  // console.log('base64 of image:', base64);
  console.log('RGB Value of pixel is:', pixelColor);
  if (pixelColor === pixelHexColour) {
    console.log('Colour is correct on device 1');
  } else {
    console.log("Colour isn't cbfeff, it is: ", pixelColor);
  }
  await closeApp(device);
}
