import { localize } from '../../localizer/i18n/localizedString';
import { androidIt, iosIt } from '../../types/sessionIt';
import { AccessibilityId } from '../../types/testing';
import { DeclineMessageRequestButton } from './locators';
import { runOnlyOnIOS, sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';

iosIt('Decline message request', declineRequest);
androidIt('Decline message request', declineRequest);

async function declineRequest(platform: SupportedPlatformsType) {
  // Check 'decline' button
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
  // Check message request appears on linked device (device 3)
  await device3.clickOnByAccessibilityID('Message requests banner');
  await device3.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Message request',
  });
  // Click on decline button
  await device2.clickOnElementAll(new DeclineMessageRequestButton(device2));
  // Are you sure you want to delete message request only for ios
  await sleepFor(3000);
  // TODO add check modal
  await runOnlyOnIOS(platform, () => device2.clickOnByAccessibilityID('Confirm delete'));
  // Navigate back to home page
  await sleepFor(100);
  await device2.navigateBack(platform);
  // Look for new conversation button to make sure it all worked
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'New conversation button',
  });
  // "messageRequestsNonePending": "No pending message requests",
  const messageRequestsNonePending = localize('messageRequestsNonePending').strip().toString();
  await device3.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: messageRequestsNonePending as AccessibilityId,
  });
  // Close app
  await closeApp(device1, device2, device3);
}
