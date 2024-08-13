import { androidIt, iosIt } from '../../types/sessionIt';
import { runOnlyOnIOS } from './utils';
import { newUser } from './utils/create_account';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';

iosIt('Accept message request', acceptRequest);
androidIt('Accept message request', acceptRequest);

// bothPlatformsIt("Accept message request", acceptRequest);

async function acceptRequest(platform: SupportedPlatformsType) {
  // Check 'accept' button
  // Open app
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create two users
  const userA = await newUser(device1, 'Alice', platform);
  const userB = await linkedDevice(device2, device3, 'Bob', platform);

  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnByAccessibilityID('Message requests banner');
  // Bob clicks on request conversation item
  await device2.clickOnByAccessibilityID('Message request');
  // Bob clicks accept button on device 2 (original device)
  await device2.clickOnByAccessibilityID('Accept message request');
  // Verify config message for Alice 'Your message request has been accepted'
  await device1.waitForControlMessageToBePresent('Your message request has been accepted.');
  // Check conversation list for new contact (user A)
  await device2.navigateBack(platform);
  await Promise.all([
    device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Conversation list item',
      text: userA.userName,
    }),
    device3.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Conversation list item',
      text: userA.userName,
    }),
  ]);
  // Close app
  await closeApp(device1, device2, device3);
}
