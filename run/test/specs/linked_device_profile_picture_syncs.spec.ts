import { ANDROID_XPATHS } from '../../constants';
import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { parseDataImage } from './utils/check_colour';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';
import { runScriptAndLog } from './utils/utilities';

iosIt('Avatar restored', avatarRestorediOS);
androidIt('Avatar restored', avatarRestoredAndroid);

async function avatarRestorediOS(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const spongebobsBirthday = '199805010700.00';
  const pixelHexColour = '04cbfe';
  await linkedDevice(device1, device2, 'Alice', platform);

  await device1.clickOnByAccessibilityID('User settings');
  await sleepFor(100);
  await device1.clickOnByAccessibilityID('User settings');
  await device1.clickOnByAccessibilityID('Image picker');
  // Check if permissions need to be enabled
  await device1.modalPopup({
    strategy: 'accessibility id',
    selector: 'Allow Full Access',
    maxWait: 500,
  });
  // Check if image is already on device
  const profilePicture = await device1.doesElementExist({
    strategy: 'accessibility id',
    selector: `Photo, 01 May 1998, 7:00 am`,
    maxWait: 2000,
  });
  // If no image, push file to device
  if (!profilePicture) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/profile_picture.jpg'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${
        (device1 as { udid?: string }).udid || ''
      } 'run/test/specs/media/profile_picture.jpg'`,
      true
    );
  }
  await sleepFor(100);
  // Select file
  await device1.clickOnByAccessibilityID(`Photo, 01 May 1998, 7:00 am`);
  await device1.clickOnByAccessibilityID('Done');
  await device1.clickOnByAccessibilityID('Save');
  await sleepFor(5000);
  // Wait for change
  // Verify change
  // Take screenshot
  const el = await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await sleepFor(5000);

  const base64 = await device1.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log('RGB Value of pixel is:', pixelColor);
  if (pixelColor === pixelHexColour) {
    console.log('Colour is correct');
  } else {
    throw new Error("Colour isn't 04cbfe, it is: " + pixelColor);
  }
  console.log('Now checking avatar on linked device');
  // Check avatar on device 2
  await device2.clickOnByAccessibilityID('User settings');
  const el2 = await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await sleepFor(3000);
  const base64A = await device2.getElementScreenshot(el2.ELEMENT);
  const pixelColorLinked = await parseDataImage(base64A);
  if (pixelColorLinked === pixelHexColour) {
    console.log('Colour is correct on linked device');
  } else {
    console.log("Colour isn't 04cbfe, it is: ", pixelColorLinked);
  }
  await closeApp(device1, device2);
}

async function avatarRestoredAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const spongebobsBirthday = '199905020700.00';
  const pixelHexColour = '04cbfe';
  await linkedDevice(device1, device2, 'Alice', platform);

  await device1.clickOnByAccessibilityID('User settings');
  await sleepFor(100);
  await device1.clickOnByAccessibilityID('User settings');
  await sleepFor(500);
  await device1.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Upload',
  });
  await device1.clickOnElementById(
    'com.android.permissioncontroller:id/permission_allow_foreground_only_button'
  );
  await sleepFor(500);
  // Browse button
  await device1.clickOnElementAll({
    strategy: 'xpath',
    selector: ANDROID_XPATHS.BROWSE_BUTTON,
  });
  // Check if permissions need to be enabled
  // Check if image is already on device
  const profilePicture = await device1.doesElementExist({
    strategy: 'accessibility id',
    selector: `profile_picture.jpg, 27.75 kB, May 2, 1999`,
    maxWait: 2000,
  });
  // If no image, push file to device
  if (!profilePicture) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/profile_picture.jpg'`
    );

    await runScriptAndLog(
      `adb -s emulator-5554 push 'run/test/specs/media/profile_picture.jpg' /storage/emulated/0/Download`,
      true
    );
    await device1.clickOnElementAll({
      strategy: 'accessibility id',
      selector: 'More options',
    });
    await device1.clickOnElementAll({
      strategy: 'xpath',
      selector: `/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout`,
    });
  }
  await sleepFor(100);
  await device1.clickOnByAccessibilityID(`profile_picture.jpg, 27.75 kB, May 2, 1999`);
  await device1.clickOnElementById('network.loki.messenger:id/crop_image_menu_crop');
  await sleepFor(2000);
  // Wait for change
  // Verify change
  // Take screenshot
  const el = await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await sleepFor(5000);
  const base64 = await device1.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log('RGB Value of pixel is:', pixelColor);
  if (pixelColor === pixelHexColour) {
    console.log('Colour is correct on device 1');
  } else {
    console.log("Colour isn't pixelHexColour, it is: ", pixelColor);
  }
  console.log('Now checking avatar on linked device');
  // Check avatar on device 2
  await device2.clickOnByAccessibilityID('User settings');
  const el2 = await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'User settings',
  });
  await sleepFor(5000);
  const base64A = await device2.getElementScreenshot(el2.ELEMENT);
  const pixelColorLinked = await parseDataImage(base64A);
  if (pixelColorLinked === pixelHexColour) {
    console.log('Colour is correct on linked device');
  } else {
    console.log("Colour isn't pixelHexColour, it is: ", pixelColorLinked);
  }
  await closeApp(device1, device2);
}
