import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';

iosIt('Accept message request with text', acceptRequestWithText);
androidIt('Accept message request with text', acceptRequestWithText);

// bothPlatformsIt("Accept message request with text", acceptRequestWithText);

async function acceptRequestWithText(platform: SupportedPlatformsType) {
  // Check accept request by sending text message
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnByAccessibilityID('Message requests banner');
  // Bob clicks on request conversation item
  await device2.clickOnByAccessibilityID('Message request');
  // Send message from Bob to Alice
  await device2.sendMessage(`${userB.userName} to ${userA.userName}`);
  // Check config
  await device1.waitForControlMessageToBePresent('Your message request has been accepted.');
  // Close app
  await closeApp(device1, device2);
}
