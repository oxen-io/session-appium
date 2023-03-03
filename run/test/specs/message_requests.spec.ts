import { iosIt, androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { runOnlyOnIOS, sleepFor } from "./utils/index";

async function acceptRequest(platform: SupportedPlatformsType) {
  // Check 'accept' button
  // Open app
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear

  // Bob clicks on message request banner
  await device2.clickOnElement("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnElement("Message request");
  // Bob clicks accept button
  await device2.clickOnElement("Accept message request");
  // Verify config message for Alice 'Your message request has been accepted'
  await device1.waitForTextElementToBePresent(
    "Configuration message",
    "Your message request has been accepted."
  );
  // Close app
  await closeApp(device1, device2);
}

async function declineRequest(platform: SupportedPlatformsType) {
  // Check 'decline' button
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnElement("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnElement("Message request");
  // Click on decline button
  await device2.clickOnElement("Decline message request");
  // Are you sure you want to delete message request only for ios
  await runOnlyOnIOS(platform, () => device2.clickOnElement("Delete"));
  // Navigate back to home page
  await device2.navigateBack(platform);
  // Look for new conversation button to make sure it all worked
  await device2.waitForElementToBePresent(
    "accessibility id",
    "New conversation button"
  );

  // Close app
  await closeApp(device1, device2);
}

async function acceptRequestWithText(platform: SupportedPlatformsType) {
  // Check accept request by sending text message
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnElement("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnElement("Message request");
  // Send message from Bob to Alice
  await device2.sendMessage(`${userB.userName} to ${userA.userName}`);
  // Check config
  await device1.waitForTextElementToBePresent(
    "Configuration message",
    "Your message request has been accepted."
  );
  // Close app
  await closeApp(device1, device2);
}

async function blockRequest(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnElement("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnElement("Message request");
  // Bob clicks on block option
  await device2.clickOnElement("Block message request");
  // Confirm block on android
  await device2.clickOnElement("Block");
  // Make sure no messages can get through to Bob
  const blockedMessage = `${userA.userName} to ${userB.userName} - shouldn't get through`;
  await device1.sendMessage(blockedMessage);
  await device2.navigateBack(platform);
  await device2.waitForElementToBePresent(
    "accessibility id",
    "New conversation button"
  );
  // Need to wait to see if message gets through
  await sleepFor(1000);
  await device2.hasTextElementBeenDeleted("Message Body", blockedMessage);
  // Close app
  await closeApp(device1, device2);
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

// Delete request
