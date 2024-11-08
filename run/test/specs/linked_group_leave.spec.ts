import { englishStripped } from '../../localizer/i18n/localizedString';
import { androidIt, iosIt } from '../../types/sessionIt';
import { ControlMessage, USERNAME } from '../../types/testing';
import { LeaveGroup } from './locators';
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppFourDevices } from './utils/open_app';

iosIt('Leave group linked device', leaveGroupLinkedDevice);
androidIt('Leave group linked device', leaveGroupLinkedDevice);

// bothPlatformsIt("Leave group linked device", leaveGroupLinkedDevice);

async function leaveGroupLinkedDevice(platform: SupportedPlatformsType) {
  const testGroupName = 'Leave group linked device';
  const { device1, device2, device3, device4 } = await openAppFourDevices(platform);
  const userC = await linkedDevice(device3, device4, USERNAME.CHARLIE, platform);
  // Create users A, B and C
  const [userA, userB] = await Promise.all([
    newUser(device1, USERNAME.ALICE, platform),
    newUser(device2, USERNAME.BOB, platform),
  ]);

  // Create group with user A, user B and User C
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  await sleepFor(1000);
  await device3.clickOnByAccessibilityID('More options');
  await sleepFor(1000);
  await device3.clickOnElementAll(new LeaveGroup(device3));
  await device3.clickOnByAccessibilityID('Leave');

  await runOnlyOnAndroid(platform, () => device3.navigateBack(platform));
  // Check for control message
  await sleepFor(5000);
  await runOnlyOnIOS(platform, () =>
    device4.hasTextElementBeenDeleted('Conversation list item', testGroupName)
  );
  // Create control message for user leaving group
  const groupMemberLeft = englishStripped('groupMemberLeft')
    .withArgs({ name: userC.userName })
    .toString();

  await Promise.all([
    device2.waitForControlMessageToBePresent(groupMemberLeft as ControlMessage),
    device1.waitForControlMessageToBePresent(groupMemberLeft as ControlMessage),
  ]);

  await closeApp(device1, device2, device3, device4);
}
