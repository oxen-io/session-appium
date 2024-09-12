import { localize } from '../../localizer/i18n/localizedString';
import { androidIt, iosIt } from '../../types/sessionIt';
import { ControlMessage } from '../../types/testing';
import { LeaveGroupButton } from './locators';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { sleepFor } from './utils/index';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';

iosIt('Leave group', leaveGroup);
androidIt('Leave group', leaveGroup);

async function leaveGroup(platform: SupportedPlatformsType) {
  const testGroupName = 'Leave group';
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);

  // Create group with user A, user B and User C
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  await device3.clickOnByAccessibilityID('More options');
  await sleepFor(1000);
  await device3.clickOnElementAll(new LeaveGroupButton(device3));
  // Modal with Leave/Cancel
  await device3.clickOnByAccessibilityID('Leave');
  await device3.navigateBack(platform);
  // Check for control message
  const groupMemberLeft = localize('groupMemberLeft')
    .withArgs({ name: userC.userName })
    .strip()
    .toString();

  await device1.waitForControlMessageToBePresent(groupMemberLeft as ControlMessage);
  await device2.waitForControlMessageToBePresent(groupMemberLeft as ControlMessage);

  // Check device 3 that group has disappeared
  await device3.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Conversation list item',
    text: testGroupName,
  });
  await closeApp(device1, device2, device3);
}
