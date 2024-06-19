import { iosIt, androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils/index";

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
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnByAccessibilityID("Message request");
  // Bob clicks accept button
  await device2.clickOnByAccessibilityID("Accept message request");
  // Verify config message for Alice 'Your message request has been accepted'
  await device1.waitForControlMessageToBePresent(
    "Your message request has been accepted."
  );
  await device2.navigateBack(platform);
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation list item",
    text: userA.userName,
  });
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
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnByAccessibilityID("Message request");
  // Click on decline button
  await runOnlyOnIOS(platform, () =>
    device2.clickOnByAccessibilityID("Delete message request")
  );
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnByAccessibilityID("Decline message request")
  );
  // Are you sure you want to delete message request only for ios
  await sleepFor(2000);
  await runOnlyOnIOS(platform, () =>
    device2.clickOnByAccessibilityID("Confirm delete")
  );
  // Navigate back to home page
  await sleepFor(100);
  await device2.navigateBack(platform);
  // Look for new conversation button to make sure it all worked
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "New conversation button",
  });
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
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnByAccessibilityID("Message request");
  // Send message from Bob to Alice
  await device2.sendMessage(`${userB.userName} to ${userA.userName}`);
  // Check config
  await device1.waitForControlMessageToBePresent(
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
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Bob clicks on request conversation item
  await device2.clickOnByAccessibilityID("Message request");
  // Bob clicks on block option
  await device2.clickOnByAccessibilityID("Block message request");
  // Confirm block on android
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () => device2.clickOnByAccessibilityID("Block"));
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnByAccessibilityID("Confirm block")
  );
  const blockedMessage = `${userA.userName} to ${userB.userName} - shouldn't get through`;
  await device1.sendMessage(blockedMessage);
  await device2.navigateBack(platform);
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "New conversation button",
  });

  // Need to wait to see if message gets through
  await sleepFor(1000);
  await device2.hasTextElementBeenDeleted("Message body", blockedMessage);
  // Check blocked contacts section for user A
  await device2.clickOnByAccessibilityID("User settings");
  await device2.clickOnByAccessibilityID("Conversations");
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnByAccessibilityID("Blocked contacts")
  );
  await runOnlyOnIOS(platform, () =>
    device2.clickOnByAccessibilityID("Blocked Contacts")
  );
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Contact",
    text: userA.userName,
  });
  await runOnlyOnIOS(platform, () =>
    device2.clickOnByAccessibilityID("Blocked Contacts")
  );
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Contact",
    text: userA.userName,
  });

  // Close app
  await closeApp(device1, device2);
}

async function deleteRequest(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Swipe left on ios
  await device2.swipeLeftAny("Message request");

  await device2.clickOnByAccessibilityID("Delete");
  await sleepFor(1000);
  await device2.clickOnByAccessibilityID("Confirm delete");
  await device2.findElement("accessibility id", "No pending message requests");

  await closeApp(device1, device2);
}
// TO FIX (CONFIRM DIALOG FOR CLEAR ALL NOT WORKING)
async function clearAllRequests(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Select Clear All button
  await device2.clickOnByAccessibilityID("Clear all");
  await sleepFor(1000);
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnElementAll({ strategy: "accessibility id", selector: "Yes" })
  );
  await runOnlyOnIOS(platform, () => device2.clickOnByAccessibilityID("Clear"));
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "No pending message requests",
  });
  await closeApp(device1, device2);
}

describe("Message requests all ios", () => {
  iosIt("Message requests accept", acceptRequest);
  iosIt("Message requests decline", declineRequest);
  iosIt("Message requests text reply", acceptRequestWithText);
  iosIt("Message requests block", blockRequest);
  iosIt("Delete request", deleteRequest);
  iosIt("Message requests clear all", clearAllRequests);
});

describe("Message requests all android", () => {
  androidIt("Message requests accept", acceptRequest);
  androidIt("Message requests decline", declineRequest);
  androidIt("Message requests text reply", acceptRequestWithText);
  androidIt("Message requests block", blockRequest);
  androidIt("Message requests clear all", clearAllRequests);
});
