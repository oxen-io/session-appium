import { androidIt, iosIt } from '../../types/sessionIt';
import { runOnlyOnAndroid, runOnlyOnIOS } from './utils';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';

iosIt('Link device', linkDevice);
androidIt('Link device', linkDevice);

// bothPlatformsIt("Link device", linkDevice);

async function linkDevice(platform: SupportedPlatformsType) {
  // Open server and two devices
  const { device1, device2 } = await openAppTwoDevices(platform);
  // link device
  const userA = await linkedDevice(device1, device2, 'Alice', platform);
  // Check that 'Youre almost finished' reminder doesn't pop up on device2
  await device2.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Recovery phrase reminder',
  });
  // Verify username and session ID match
  await device2.clickOnByAccessibilityID('User settings');
  // Check username
  await runOnlyOnIOS(platform, () =>
    device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Username',
      text: userA.userName,
    })
  );
  await runOnlyOnAndroid(platform, () =>
    device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Display name',
      text: userA.userName,
    })
  );
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Account ID',
    text: userA.accountID,
  });

  await closeApp(device1, device2);
}
