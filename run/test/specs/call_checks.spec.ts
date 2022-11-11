import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { openAppTwoDevices, SupportedPlatformsType } from "./utils/open_app";
import {
  clickOnElement,
  findElement,
  hasElementBeenDeleted,
  scrollDown,
} from "./utils/utilities";

async function voiceCall(platform: SupportedPlatformsType) {
  // Open app
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and User B
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Try to make phone call with unapproved user
  // Look for phone icon (shouldnt be there)
  await hasElementBeenDeleted(device1, "Call button");
  // Create contact
  await newContact(device1, userA, device2, userB);
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
  await device1.setImplicitWaitTimeout(10000);
  // Hang up
  await clickOnElement(device1, "End call button");
  // Check for config message 'Called User B' on device 1
  await findElement(device1, "Configuration message");
}
