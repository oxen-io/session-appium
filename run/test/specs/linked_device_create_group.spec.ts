import { localize } from '../../localizer/i18n/localizedString';
import { androidIt, iosIt } from '../../types/sessionIt';
import { ControlMessage } from '../../types/testing';
import { ApplyChanges, EditGroup, EditGroupName } from './locators';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppFourDevices } from './utils/open_app';

iosIt('Create group and change name syncs', linkedGroup);
androidIt('Create group and change name syncs', linkedGroup);

async function linkedGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3, device4 } = await openAppFourDevices(platform);

  const userA = await linkedDevice(device1, device2, 'Alice', platform);

  const [userB, userC] = await Promise.all([
    newUser(device3, 'Bob', platform),
    newUser(device4, 'Charlie', platform),
  ]);
  const testGroupName = 'Linked device group';
  const newGroupName = 'New group name';
  await createGroup(platform, device1, userA, device3, userB, device4, userC, testGroupName);
  // Test that group has loaded on linked device
  await device2.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Conversation list item',
    text: testGroupName,
  });
  // Test group name change syncs
  // Change group name in device 1
  // Click on settings/more info
  await device1.clickOnByAccessibilityID('More options');
  // Edit group
  await sleepFor(100);
  await device1.clickOnElementAll(new EditGroup(device1));
  // click on group name to change it
  await device1.clickOnByAccessibilityID('Group name');
  // Type in new name
  await device1.inputText(newGroupName, new EditGroupName(device1));
  // Confirm change (tick on android/ first done on ios)
  await device1.clickOnByAccessibilityID('Accept name change');
  // Apply changes (Apply on android/ second done on ios)
  await device1.clickOnElementAll(new ApplyChanges(device1));
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  const groupNameNew = localize('groupNameNew')
    .withArgs({ group_name: newGroupName })
    .strip()
    .toString();
  // Config message is "Group now is now {group_name}"
  await device1.waitForControlMessageToBePresent(groupNameNew as ControlMessage);

  // Wait 5 seconds for name to update
  await sleepFor(5000);
  // Check linked device for name change (conversation header name)
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Conversation header name',
    text: newGroupName,
  });

  await Promise.all([
    device2.waitForControlMessageToBePresent(groupNameNew as ControlMessage),
    device3.waitForControlMessageToBePresent(groupNameNew as ControlMessage),
    device4.waitForControlMessageToBePresent(groupNameNew as ControlMessage),
  ]);

  await closeApp(device1, device2, device3, device4);
}

// TODO
// Remove user
//  Add user
//  Disappearing messages
