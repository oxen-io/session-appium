import { newUser } from "./utils/create_account";
import { openAppTwoDevices, SupportedPlatformsType } from "./utils/open_app";
import {
  clickOnElement,
  findElementByAccessibilityId,
  hasElementBeenDeleted,
  runOnlyOnAndroid,
  scrollDown,
  sendNewMessage,
  sendMessage,
  findConfigurationMessage,
} from "./utils/index";
import { androidIt, iosIt } from "../../types/sessionIt";

async function voiceCall(platform: SupportedPlatformsType) {
  // Open app
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and User B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await sendNewMessage(device1, userB, "Testing calls");
  // Look for phone icon (shouldnt be there)
  await hasElementBeenDeleted(device1, "Call button");
  // Create contact
  await clickOnElement(device2, "Message requests banner");
  // Select message from User A
  await clickOnElement(device2, "Message request");
  await runOnlyOnAndroid(platform, () =>
    clickOnElement(device2, "Accept message request")
  );
  // Type into message input box
  await sendMessage(
    device2,
    `Reply-message-${userB.userName}-to-${userA.userName}`
  );

  // Verify config message states message request was accepted
  await findConfigurationMessage(
    device1,
    "Your message request has been accepted."
  );
  // Phone icon should appear now that conversation has been approved
  await clickOnElement(device1, "Call button");
  // Enabled voice calls in privacy settings
  await clickOnElement(device1, "Settings");
  // Scroll to bottom of page to voice and video calls
  await scrollDown(device1);
  // Toggle voice settings on
  await clickOnElement(device1, "Allow voice and video calls");
  // Click enable on exposure IP address warning
  await clickOnElement(device1, "Enable");
  // Navigate back to conversation
  await clickOnElement(device1, "Navigate up");
  // Enable voice calls on device 2 for User B
  await clickOnElement(device2, "Call button");
  await clickOnElement(device2, "Settings");
  await scrollDown(device2);
  await clickOnElement(device2, "Allow voice and video calls");
  await clickOnElement(device2, "Enable");
  await clickOnElement(device2, "Navigate up");
  // Make call on device 1 (userA)
  await clickOnElement(device1, "Call button");
  // Answer call on device 2
  await clickOnElement(device2, "Answer call");
  // Wait 10 seconds
  console.warn("FIXME audric");
  // await device1.setImplicitWaitTimeout(10000);
  // Hang up
  await clickOnElement(device1, "End call button");
  // Check for config message 'Called User B' on device 1
  await findElementByAccessibilityId(device1, "Configuration message");
}

describe("Voice calls ", async () => {
  await iosIt("Voice calls", voiceCall);
  await androidIt("Voice calls", voiceCall);
});
