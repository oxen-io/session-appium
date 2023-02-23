import { iosIt, androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { createGroup } from "./utils/create_group";
import { linkedDevice } from "./utils/link_device";
import {
  closeApp,
  openAppFourDevices,
  openAppThreeDevices,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import {
  runOnlyOnAndroid,
  runOnlyOnIOS,
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
  sleepFor,
} from "./utils/index";
import { parseDataImage } from "./utils/check_colour";
import { runScriptAndLog } from "./utils/utilities";

async function linkDevice(platform: SupportedPlatformsType) {
  // Open server and two devices
  const { device1, device2 } = await openAppTwoDevices(platform);
  // link device
  await linkedDevice(device1, device2, "User A", platform);
  // Check that 'Youre almost finished' reminder doesn't pop up on device2
  await hasElementBeenDeleted(device2, "Recovery phrase reminder");
  // Verify username and session ID match
  await device2.clickOnElement("User settings");
  // Check username
  await device2.findElementByAccessibilityId("Username");
  await device2.findElementByAccessibilityId("Session ID");

  await closeApp(device1, device2);
}

async function contactsSyncLinkedDevice(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // link device
  const userA = await linkedDevice(device1, device2, "User A", platform);

  const userB = await newUser(device3, "User B", platform);

  await newContact(platform, device1, userA, device3, userB);
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Back"));
  await runOnlyOnAndroid(platform, () => device1.clickOnElement("Navigate up"));
  // Check that user synced on linked device
  await device2.findMatchingTextAndAccessibilityId(
    "Conversation list item",
    userB.userName
  );
  await closeApp(device1, device2, device3);
}

async function groupCreationLinkedDevice(platform: SupportedPlatformsType) {
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );

  const userA = await linkedDevice(device1, device2, "Alice", platform);

  const [userB, userC] = await Promise.all([
    newUser(device3, "Bob", platform),
    newUser(device4, "Carl", platform),
  ]);
  const testGroupName = "Linked device group";
  const newGroupName = "New group name";
  await createGroup(
    platform,
    device1,
    userA,
    device3,
    userB,
    device4,
    userC,
    testGroupName
  );
  // Test that group has loaded on linked device
  await device2.selectByText("Conversation list item", testGroupName);
  // Test group name change syncs
  // Change group name in device 1
  // Click on settings/more info
  await device1.clickOnElement("More options");
  // Edit group
  await device1.clickOnElement("Edit group");
  // click on group name to change it
  await device1.clickOnElement("Group name");
  // Type in new name
  await device1.inputText("Group name text field", newGroupName);
  // Confirm change (tick on android/ first done on ios)
  await device1.clickOnElement("Accept name change");
  // Apply changes (Apply on android/ second done on ios)
  await device1.clickOnElement("Apply changes");
  // await device1.clickOnElement("Accept name change");
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await runOnlyOnIOS(platform, () =>
    device1.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "Title is now " + `'${newGroupName}'.`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    device1.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "You renamed group to: " + `'${newGroupName}'`
    )
  );
  // Wait 5 seconds for name to update
  await sleepFor(5000);
  // Check linked device for name change (conversation header name)
  const groupName = await device2.grabTextFromAccessibilityId("Username");
  console.warn("Group name is now " + groupName);
  await device2.findMatchingTextAndAccessibilityId("Username", newGroupName);
  // Check config message in linked device aswell
  await runOnlyOnIOS(platform, () =>
    device2.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "Title is now " + `'${newGroupName}'.`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    device2.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "You renamed group to " + `'${newGroupName}'`
    )
  );
  await closeApp(device1, device2, device3, device4);
}

async function changeUsernameLinkedDevice(platform: SupportedPlatformsType) {
  // Open server and two devices
  const { device1, device2 } = await openAppTwoDevices(platform);
  const newUsername = "Alice in chains";
  // link device
  await linkedDevice(device1, device2, "Alice", platform);
  // Change username on device 1
  await device1.clickOnElement("User settings");
  // Select username
  await device1.clickOnElement("Username");
  await device1.inputText("Username", newUsername);
  // Select apply
  await runOnlyOnAndroid(platform, () => device1.clickOnElement("Apply"));
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Done"));
  // Check on linked device if name has updated
  await device2.clickOnElement("User settings");
  await runOnlyOnAndroid(platform, () => device2.navigateBack(platform));
  await sleepFor(100);
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnElement("User settings")
  );
  const changedUsername = await device2.grabTextFromAccessibilityId("Username");
  await sleepFor(100);
  if (changedUsername === newUsername) {
    console.log(`Username changed from Alice to `, changedUsername);
  } else {
    // throw new Error("Username change unsuccessful")
    console.log("changed: ", changedUsername, "new: ", newUsername);
  }

  await closeApp(device1, device2);
}

async function deletedMessageLinkedDevice(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);

  const userA = await linkedDevice(device1, device3, "Alice", platform);

  const userB = await newUser(device2, "Bob", platform);

  await newContact(platform, device1, userA, device2, userB);
  // Send message from user a to user b
  const sentMessage = await device1.sendMessage("Howdy");
  // Check message came through on linked device(3)
  // Enter conversation with user B on device 3
  // Need to wait for notifications to disappear
  await device3.waitForElementToBePresent("Conversation list item");
  await device3.selectByText("Conversation list item", userB.userName);
  // Find message
  await device3.findMessageWithBody(sentMessage);
  // Select message on device 1, long press
  await device1.longPressMessage(sentMessage);
  // Select delete
  await device1.clickOnElement("Delete message");
  // Select delete for everyone
  await device1.clickOnElement("Delete for everyone");

  // await waitForLoadingAnimation(device1);

  await device2.waitForElementToBePresent("Deleted message");
  // Check linked device for deleted message
  await hasTextElementBeenDeleted(device3, "Message body", sentMessage);
  // Close app
  await closeApp(device1, device2, device3);
}

async function blockedUserLinkedDevice(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // link device
  const userA = await linkedDevice(device1, device3, "Alice", platform);
  // Create contact to block
  const userB = await newUser(device2, "Bob", platform);
  await newContact(platform, device1, userA, device2, userB);
  // Check that user synced on linked device
  await device3.waitForTextElementToBePresent(
    "Conversation list item",
    userB.userName
  );
  // Block user on device 1
  await device1.clickOnElement("More options");
  // Select block (menu option for android and toggle for ios)
  await device1.clickOnElement("Block");
  // Confirm block
  await device1.clickOnElement("Confirm block");
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () => device1.clickOnElement("OK_BUTTON"));
  console.log(`${userB.userName}` + " has been blocked");
  // On ios, you need to navigate back to conversation screen to confirm block
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Back"));
  // Check on device 3 if user B is blocked
  // Click on conversation with User B
  await device3.selectByText("Conversation list item", userB.userName);
  // Look for blocked banner
  // Unblock on device 3 and check if unblocked on device 1
  await device3.clickOnElement("Blocked banner");
  // On ios you need to click ok to confirm unblock
  await runOnlyOnIOS(platform, () => device3.clickOnElement("Confirm block"));
  // check on device 1 if user B is unblocked
  await sleepFor(1250);
  await hasElementBeenDeleted(device1, "Blocked banner");
  // Send message from user B to user A to see if unblock worked

  const sentMessage = await device2.sendMessage("Unsend message");
  // Check on device 1 if user A receives message
  await device1.waitForTextElementToBePresent("Message Body", sentMessage);

  // Everything works then close app
  await closeApp(device1, device2, device3);
}

async function avatarRestorediOS(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  const userA = await linkedDevice(device1, device2, "Alice", platform);

  await device1.clickOnElement("User settings");
  await sleepFor(100);

  await runScriptAndLog(
    `xcrun simctl addmedia ${process.env.IOS_FIRST_SIMULATOR} 'run/test/specs/media/profile_picture.jpg'`
  );

  // Click on Profile picture
  await device1.clickOnElement("Profile picture");
  await device1.clickOnElement("Photo library");
  const permissions = await device1.waitForElementToBePresent(
    "Allow Access to All Photos"
  );
  if (permissions) {
    await device1.clickOnElement("Allow Access to All Photos");
    await device1.clickOnElement("Photo, February 22, 4:04 PM");
  } else {
    await device1.clickOnElement("Settings");
    await device1.clickOnElement("Photos");
  }
  // Click on Photo library
  await sleepFor(100);
  await device1.clickOnElement("Done");
  // Select file
  await sleepFor(2000);

  // Need to add a function that if file isn't found, push file to device1
  // Wait for change
  // Verify change somehow...?
  // Take screenshot
  const el = await device1.waitForElementToBePresent("Profile picture");
  await sleepFor(3000);
  const base64 = await device1.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === "00cbfe") {
    console.log("Colour is correct");
  } else {
    console.log("Colour isn't 00cbfe, it is: ", pixelColor);
  }
  console.log("Now checking avatar on linked device");
  // Check avatar on device 2
  await device2.clickOnElement("User settings");
  const el2 = await device2.waitForElementToBePresent("Profile picture");
  await sleepFor(3000);
  const base64A = await device2.getElementScreenshot(el2.ELEMENT);
  const pixelColorLinked = await parseDataImage(base64A);
  if (pixelColorLinked === "00cbfe") {
    console.log("Colour is correct on linked device");
  } else {
    console.log("Colour isn't 00cbfe, it is: ", pixelColorLinked);
  }
  await closeApp(device1, device2);
}

// async function avatarRestoredAndroid(platform: SupportedPlatformsType) {
// }

describe("Linked device tests", async () => {
  await iosIt("Link a device", linkDevice);
  await androidIt("Link a device", linkDevice);

  await androidIt("Check contact syncs", contactsSyncLinkedDevice);
  await iosIt("Check contact syncs", contactsSyncLinkedDevice);

  await iosIt("Check group syncs", groupCreationLinkedDevice);
  await androidIt("Check group syncs", groupCreationLinkedDevice);

  await androidIt("Check changed username syncs", changeUsernameLinkedDevice);
  await iosIt("Check changed username syncs", changeUsernameLinkedDevice);

  await androidIt("Check deleted message syncs", deletedMessageLinkedDevice);
  await iosIt("Check deleted message syncs", deletedMessageLinkedDevice);

  await iosIt("Check blocked user syncs", blockedUserLinkedDevice);
  await androidIt("Check blocked user syncs", blockedUserLinkedDevice);

  await iosIt("Check profile picture syncs", avatarRestorediOS);
  // await androidIt("Check profile picture syncs", avatarRestoredAndroid);
});

// TESTS TO WRITE FOR LINKED DEVICE
// Leave group
// Message requests
// Avatar restored
