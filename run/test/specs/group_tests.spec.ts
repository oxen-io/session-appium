import { iosIt, androidIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { createGroup } from './utils/create_group';
import {
  closeApp,
  openAppFourDevices,
  openAppThreeDevices,
  SupportedPlatformsType,
} from './utils/open_app';
import {
  clickOnElement,
  deleteText,
  findElement,
  findMatchingTextAndAccessibilityId,
  findMessageWithBody,
  inputText,
  runOnlyOnAndroid,
  runOnlyOnIOS,
  selectByText,
} from './utils/utilities';

async function groupCreation(platform: SupportedPlatformsType) {
  const testGroupName = 'The Manhattan Crew';
  const message = 'User A to group';
  const { server, device1, device2, device3 } =
    await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'User A', platform),
    newUser(device2, 'User B', platform),
    newUser(device3, 'User C', platform),
  ]);

  // Create contact between User A and User B
  await createGroup(
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    testGroupName,
  );
  // Check config message of group creation is correct
  // android and ios are different here
  await findMatchingTextAndAccessibilityId(
    device1,
    'Configuration message',
    'Group created',
  );
  // Send message from User A
  await inputText(device1, 'Message input box', message);
  await clickOnElement(device1, 'Send message button');
  await device1.setImplicitWaitTimeout(20000);
  await findElement(device1, 'Message sent status tick');
  // Verify in user b and user c's window
  // Navigate to group chat in user B's window
  await selectByText(device2, 'Conversation list item', testGroupName);
  // Navigate to grou chat in user C's window
  await selectByText(device3, 'Conversation list item', testGroupName);
  await findMessageWithBody(device2, message);
  await findMessageWithBody(device3, message);
  // Close server and devices
  await closeApp(server, device1, device2, device3);
}

async function changeGroupName(platform: SupportedPlatformsType) {
  const testGroupName = 'Group name';
  const newGroupName = 'Changed group name';
  const { server, device1, device2, device3 } =
    await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'User A', platform),
    newUser(device2, 'User B', platform),
    newUser(device3, 'User C', platform),
  ]);
  // Create group

  await createGroup(
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    testGroupName,
  );
  // Now change the group name
  await device1.setImplicitWaitTimeout(5000);
  // Click on settings or three dots
  await clickOnElement(device1, 'More options');
  // Click on Edit group option
  await clickOnElement(device1, 'Edit group');
  // Click on current group name
  await clickOnElement(device1, 'Group name');
  await inputText(device1, 'Group name text field', '   ');
  await clickOnElement(device1, 'Accept name change');
  // Alert should pop up 'Please enter group name', click ok
  // If ios click ok / If Android go to next step
  await runOnlyOnIOS(platform, () => clickOnElement(device1, 'OK'));
  // Delete empty space
  await runOnlyOnIOS(platform, () => clickOnElement(device1, 'Cancel'));
  await runOnlyOnAndroid(platform, () =>
    deleteText(device1, 'Group name text field'),
  );
  // Enter new group name
  await clickOnElement(device1, 'Group name');

  await inputText(device1, 'Group name text field', newGroupName);
  // Click done/apply
  await clickOnElement(device1, 'Accept name change');
  await clickOnElement(device1, 'Apply changes');
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await runOnlyOnIOS(platform, () =>
    findMatchingTextAndAccessibilityId(
      device1,
      'Configuration message',
      'Title is now ' + `'${newGroupName}'.`,
    ),
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    findMatchingTextAndAccessibilityId(
      device1,
      'Configuration message',
      'You renamed group to ' + `'${newGroupName}'`,
    ),
  );
  await closeApp(server, device1, device2, device3);
}

async function addContactToGroup(platform: SupportedPlatformsType) {
  const { server, device1, device2, device3, device4 } =
    await openAppFourDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'User A', platform),
    newUser(device2, 'User B', platform),
    newUser(device3, 'User C', platform),
  ]);
  const testGroupName = 'Group to test adding contact';
  await createGroup(
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    testGroupName,
  );
  const userD = await newUser(device4, 'User D', platform);
  await clickOnElement(device1, 'Back');
  await newContact(device1, userA, device4, userD);
  // Exit to conversation list
  await clickOnElement(device1, 'Back');
  // Select group conversation in list
  await selectByText(device1, 'Conversation list item', testGroupName);
  // Click more options
  await clickOnElement(device1, 'More options');
  // Select edit group
  await clickOnElement(device1, 'Edit group');
  // Add contact to group
  await clickOnElement(device1, 'Add members');
  // Select new user
  await selectByText(device1, 'Contact', userD.userName);
  // Click done/apply
  await clickOnElement(device1, 'Done');
  // Click done/apply again
  await clickOnElement(device1, 'Apply changes');
  // Check config message
  await findMatchingTextAndAccessibilityId(
    device1,
    'Configuration message',
    `${userD.userName}` + ' joined the group.',
  );
  // Exit to conversation list
  await clickOnElement(device4, 'Back');
  // Select group conversation in list
  await selectByText(device4, 'Conversation list item', testGroupName);
  // Check config
  await findMatchingTextAndAccessibilityId(
    device4,
    'Configuration message',
    'Group created',
  );
  closeApp(server, device1, device2, device3, device4);
}

async function mentionsForGroups(platform: SupportedPlatformsType) {
  const { server, device1, device2, device3 } =
    await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'User A', platform),
    newUser(device2, 'User B', platform),
    newUser(device3, 'User C', platform),
  ]);
  const testGroupName = 'Mentions test group';
  // Create contact between User A and User B
  await createGroup(
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    testGroupName,
  );
  await device1.setImplicitWaitTimeout(10000);
  await inputText(device1, 'Message input box', '@');
  // Check that all users are showing in mentions box
  await findElement(device1, 'Mentions list');
  // Select User B
  await selectByText(device1, 'Contact', userB.userName);
  // Check in user B's device if the format is correct
  await findMessageWithBody(device2, '@You');
  // Select User C
  await selectByText(device1, 'Contact', userC.userName);
  // Check in User C's device if the format is correct
  await findMessageWithBody(device3, '@You');
  // Close app
  await closeApp(server, device1, device2, device3);
}

describe('Group Testing', () => {
  iosIt('Create group', groupCreation);
  androidIt('Create group', groupCreation);

  iosIt('Change group name', changeGroupName);
  androidIt('Change group name', changeGroupName);

  iosIt('Add contact to group', addContactToGroup);
  androidIt('Add contact to group', addContactToGroup);

  iosIt('Test mentions in group chats', mentionsForGroups);
  androidIt('Test mentions in group chats', mentionsForGroups);
});
