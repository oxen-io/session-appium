import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { sendNewMessage } from "./utils/send_new_message";
import { clickOnElement, findElement } from "./utils/utilities";
import { iosIt, androidIt } from "../../types/sessionIt";

async function runOnPlatform(platform: SupportedPlatformsType) {
  // Check 'accept' button
  // Open app
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A"),
    newUser(device2, "User B"),
  ]);
  // Send message from User A to User B
  await sendNewMessage(device1, userB);
  // User B clicks on message request banner
  await clickOnElement(device2, "Message request banner");
  // User B clicks on request conversation item
  await clickOnElement(device2, "Message request");
  // User B clicks accept button
  await clickOnElement(device2, "Accept message request");
  // Verify config message for User A 'Your message request has been accepted'
  await findElement(device1, "Message request has been accepted");
  // Close app
  await closeApp(server, device1, device2);

  // Check decline button
  // Open app
  // Create two users
  // Send message from User A to User B
  // User B clicks on message request banner
  // User B clicks on request conversation item
  // User B clicks decline button
  // Look for message request (shouldn't exist)
  // Close app

  // Check accept request by sending text message
  // Open app
  // Create two users
  // Send message from User A to User B
  // User B clicks on message request banner
  // User B clicks on request conversation item
  // Send message from User B to User A
  // Check for config message for User A 'Your message request has been accepted'
  // Close app
}

describe("Message", () => {
  iosIt("Message requests", runOnPlatform);
  androidIt("Message requests", runOnPlatform);
});
