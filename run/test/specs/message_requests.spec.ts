import { iosIt, androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import {
  clickOnElement,
  hasTextElementBeenDeleted,
  runOnlyOnIOS,
  waitForTextElementToBePresent,
  sleepFor,
  waitForElementToBePresent,
  sendMessage,
  sendNewMessage,
} from "./utils/index";

async function acceptRequest(platform: SupportedPlatformsType) {
  // Check 'accept' button
  // Open app
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Send message from User A to User B
  await sendNewMessage(
    device1,
    userB,
    `${userA.userName} to ${userB.userName}`
  );
  // Wait for banner to appear

  // User B clicks on message request banner
  await clickOnElement(device2, "Message requests banner");
  // User B clicks on request conversation item
  await clickOnElement(device2, "Message request");
  // User B clicks accept button
  await clickOnElement(device2, "Accept message request");
  // Verify config message for User A 'Your message request has been accepted'
  await waitForTextElementToBePresent(
    device1,
    "Configuration message",
    "Your message request has been accepted."
  );
  // Close app
  await closeApp(server, device1, device2);
}

async function declineRequest(platform: SupportedPlatformsType) {
  // Check 'decline' button
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Send message from User A to User B
  await sendNewMessage(
    device1,
    userB,
    `${userA.userName} to ${userB.userName}`
  );
  // Wait for banner to appear
  // User B clicks on message request banner
  await clickOnElement(device2, "Message requests banner");
  // User B clicks on request conversation item
  await clickOnElement(device2, "Message request");
  // Click on decline button
  await clickOnElement(device2, "Decline message request");
  // Are you sure you want to delete message request only for ios
  await runOnlyOnIOS(platform, () => clickOnElement(device2, "Delete"));
  // Navigate back to home page
  await clickOnElement(device2, "Back");
  // Look for new conversation button to make sure it all worked
  await waitForElementToBePresent(device2, "New conversation button");

  // Close app
  await closeApp(server, device1, device2);
}

async function acceptRequestWithText(platform: SupportedPlatformsType) {
  // Check accept request by sending text message
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Send message from User A to User B
  await sendNewMessage(
    device1,
    userB,
    `${userA.userName} to ${userB.userName}`
  );
  // Wait for banner to appear
  // User B clicks on message request banner
  await clickOnElement(device2, "Message requests banner");
  // User B clicks on request conversation item
  await clickOnElement(device2, "Message request");
  // Send message from User B to User A
  await sendMessage(device2, `${userB.userName} to ${userA.userName}`);
  // Check config
  await waitForTextElementToBePresent(
    device1,
    "Configuration message",
    "Your message request has been accepted."
  );
  // Close app
  await closeApp(server, device1, device2);
}

async function blockRequest(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Send message from User A to User B
  await sendNewMessage(
    device1,
    userB,
    `${userA.userName} to ${userB.userName}`
  );
  // Wait for banner to appear
  // User B clicks on message request banner
  await clickOnElement(device2, "Message requests banner");
  // User B clicks on request conversation item
  await clickOnElement(device2, "Message request");
  // User B clicks on block option
  await clickOnElement(device2, "Block message request");
  // Confirm block on android
  await runOnlyOnIOS(platform, () => clickOnElement(device2, "Block"));
  // Make sure no messages can get through to user B
  const blockedMessage = `${userA.userName} to ${userB.userName} - shouldn't get through`;
  await sendMessage(device1, blockedMessage);
  await clickOnElement(device2, "Back");
  await waitForElementToBePresent(device2, "New conversation button");
  // Need to wait to see if message gets through
  await sleepFor(10000);
  await hasTextElementBeenDeleted(device2, "Message Body", blockedMessage);
  // Close app
  await closeApp(server, device1, device2);
}

describe("Message", async () => {
  await iosIt("Message requests accept", acceptRequest);
  await androidIt("Message requests accept", acceptRequest);

  await iosIt("Message requests decline", declineRequest);
  await androidIt("Message requests decline", declineRequest);

  await iosIt("Message requests text reply", acceptRequestWithText);
  await androidIt("Message requests text reply", acceptRequestWithText);

  await iosIt("Message requests block", blockRequest);
  await androidIt("Message requests block", blockRequest);
});
