import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { SupportedPlatformsType, openAppThreeDevices, closeApp } from './utils/open_app';

iosIt('Change group name', changeGroupNameIos);
androidIt('Change group name', changeGroupNameAndroid);

async function changeGroupNameIos(platform: SupportedPlatformsType) {
  const testGroupName = 'Test group';
  const newGroupName = 'Changed group name';
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  // Create group

  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  // Now change the group name

  // Click on settings or three dots
  await device1.clickOnByAccessibilityID('More options');
  // Click on Edit group option
  await sleepFor(1000);

  await device1.clickOnByAccessibilityID('Edit group');

  // Click on current group name
  await device1.clickOnByAccessibilityID('Group name');
  await device1.inputText('   ', {
    strategy: 'accessibility id',
    selector: 'Group name text field',
  });
  await device1.clickOnByAccessibilityID('Accept name change');
  // Alert should pop up 'Please enter group name', click ok
  // If ios click ok / If Android go to next step

  await device1.clickOnByAccessibilityID('OK');
  // Delete empty space
  await device1.clickOnByAccessibilityID('Cancel');

  // Enter new group name
  await device1.clickOnByAccessibilityID('Group name');

  await device1.inputText(newGroupName, {
    strategy: 'accessibility id',
    selector: 'Group name text field',
  });
  // Click done/apply
  await device1.clickOnByAccessibilityID('Accept name change');

  await device1.clickOnByAccessibilityID('Apply changes');
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await device1.waitForControlMessageToBePresent(`Title is now '${newGroupName}'.`);
  // Config on Android is "You renamed the group to blah"

  await closeApp(device1, device2, device3);
}

async function changeGroupNameAndroid(platform: SupportedPlatformsType) {
  const testGroupName = 'Test group';
  const newGroupName = 'Changed group name';
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  // Create group

  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  // Now change the group name

  // Click on settings or three dots
  await device1.clickOnByAccessibilityID('More options');
  // Click on Edit group option
  await sleepFor(1000);
  await device1.clickOnTextElementById(`network.loki.messenger:id/title`, 'Edit group');

  // Click on current group name
  await device1.clickOnByAccessibilityID('Group name');
  // Alert should pop up 'Please enter group name', click ok
  // If ios click ok / If Android go to next step
  // Enter new group name
  await device1.clickOnByAccessibilityID('Group name');

  await device1.inputText(newGroupName, { strategy: 'accessibility id', selector: 'Group name' });
  // Click done/apply
  await device1.clickOnByAccessibilityID('Accept name change');
  await device1.clickOnElementById('network.loki.messenger:id/action_apply');
  // Check config message for changed name (different on ios and android)
  // Config on Android is "You renamed the group to blah"
  await device1.waitForControlMessageToBePresent(`You renamed the group to ${newGroupName}`);

  await closeApp(device1, device2, device3);
}
