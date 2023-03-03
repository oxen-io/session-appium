import { everyPlatformIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { runOnlyOnAndroid } from "./utils/index";
import { openAppTwoDevices, SupportedPlatformsType } from "./utils/open_app";

async function voiceCall(platform: SupportedPlatformsType) {
  // Open app
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and User B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await device1.sendNewMessage(userB, "Testing calls");
  // Look for phone icon (shouldnt be there)
  await device1.hasElementBeenDeleted("accessibility id", "Call button");
  // Create contact
  await device2.clickOnElement("Message requests banner");
  // Select message from User A
  await device2.clickOnElement("Message request");
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnElement("Accept message request")
  );
  // Type into message input box
  await device2.sendMessage(
    `Reply-message-${userB.userName}-to-${userA.userName}`
  );

  // Verify config message states message request was accepted
  await device1.findConfigurationMessage(
    "Your message request has been accepted."
  );
  // Phone icon should appear now that conversation has been approved
  await device1.clickOnElement("Call button");
  // Enabled voice calls in privacy settings
  await device1.clickOnElement("Settings");
  // Scroll to bottom of page to voice and video calls
  await device1.scrollDown();
  // Toggle voice settings on
  await device1.clickOnElement("Allow voice and video calls");
  // Click enable on exposure IP address warning
  await device1.clickOnElement("Enable");
  // Navigate back to conversation
  await device1.clickOnElement("Navigate up");
  // Enable voice calls on device 2 for User B
  await device2.clickOnElement("Call button");
  await device2.clickOnElement("Settings");
  await device2.scrollDown();
  await device2.clickOnElement("Allow voice and video calls");
  await device2.clickOnElement("Enable");
  await device2.clickOnElement("Navigate up");
  // Make call on device 1 (userA)
  await device1.clickOnElement("Call button");
  // Answer call on device 2
  await device2.clickOnElement("Answer call");
  // Wait 10 seconds
  // Hang up
  await device1.clickOnElement("End call button");
  // Check for config message 'Called User B' on device 1
  await device1.findElement("accessibility id", "Configuration message");
}

describe("Voice calls ", async () => {
  everyPlatformIt("Voice calls", voiceCall);
});
