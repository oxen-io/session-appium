import { androidIt, iosIt } from "../../types/sessionIt";
import { parseDataImage } from "./utils/check_colour";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { createGroup } from "./utils/create_group";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils/index";
import { linkedDevice } from "./utils/link_device";
import {
  closeApp,
  openAppFourDevices,
  openAppThreeDevices,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

async function linkDevice(platform: SupportedPlatformsType) {
  // Open server and two devices
  const { device1, device2 } = await openAppTwoDevices(platform);
  // link device
  const userA = await linkedDevice(device1, device2, "Alice", platform);
  // Check that 'Youre almost finished' reminder doesn't pop up on device2
  await device2.hasElementBeenDeleted(
    "accessibility id",
    "Recovery phrase reminder"
  );
  // Verify username and session ID match
  await device2.clickOnElement("User settings");
  // Check username

  await device2.waitForTextElementToBePresent(
    "accessibility id",
    "Username",
    userA.userName
  );
  await device2.waitForTextElementToBePresent(
    "accessibility id",
    "Session ID",
    userA.sessionID
  );

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
  await device1.inputText(
    "accessibility id",
    "Group name text field",
    newGroupName
  );
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
  const userA = await linkedDevice(device1, device2, "Alice", platform);
  // Change username on device 1
  await device1.clickOnElement("User settings");
  // Select username
  await device1.clickOnElement("Username");
  await sleepFor(100);
  await device1.deleteText("Username");
  await device1.inputText("accessibility id", "Username", newUsername);
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
  console.log("Username is now: ", changedUsername);
  await sleepFor(100);
  if (changedUsername === newUsername) {
    console.log(`Username changed from ${userA.userName} to `, changedUsername);
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
  await device3.waitForElementToBePresent(
    "accessibility id",
    "Conversation list item"
  );
  await device3.selectByText("Conversation list item", userB.userName);
  // Find message
  await device3.findMessageWithBody(sentMessage);
  // Select message on device 1, long press
  await device1.longPressMessage(sentMessage);
  // Select delete
  await device1.clickOnElement("Delete message");
  // Select delete for everyone
  await device1.clickOnElement("Delete for me");

  // await waitForLoadingAnimation(device1);

  // Check linked device for deleted message
  await device1.hasTextElementBeenDeleted("Message body", sentMessage);
  // Close app
  await closeApp(device1, device2, device3);
}

async function unSendMessageLinkedDevice(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);

  const userA = await linkedDevice(device1, device3, "Alice", platform);

  const userB = await newUser(device2, "Bob", platform);

  await newContact(platform, device1, userA, device2, userB);
  // Send message from user a to user b
  const sentMessage = await device1.sendMessage("Howdy");
  // Check message came through on linked device(3)
  // Enter conversation with user B on device 3
  // Need to wait for notifications to disappear
  await device3.waitForElementToBePresent(
    "accessibility id",
    "Conversation list item"
  );
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

  await device2.waitForElementToBePresent(
    "accessibility id",
    "Deleted message"
  );
  // Check linked device for deleted message
  await device3.hasTextElementBeenDeleted("Message body", sentMessage);
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
    "accessibility id",
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
  await device1.hasElementBeenDeleted("accessibility id", "Blocked banner");
  // Send message from user B to user A to see if unblock worked

  const sentMessage = await device2.sendMessage("Unsend message");
  // Check on device 1 if user A receives message
  await device1.waitForTextElementToBePresent(
    "accessibility id",
    "Message Body",
    sentMessage
  );

  // Everything works then close app
  await closeApp(device1, device2, device3);
}

async function avatarRestorediOS(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const spongebobsBirthday = "199905010700.00";
  const userA = await linkedDevice(device1, device2, "Alice", platform);

  await device1.clickOnElement("User settings");
  await sleepFor(100);
  await device1.clickOnElement("Profile picture");
  await device1.clickOnElement("Photo Library");
  // Check if permissions need to be enabled
  const permissions = await device1.doesElementExist(
    "accessibility id",
    "Allow Access to All Photos",
    1000
  );
  if (permissions) {
    try {
      device1.clickOnElement("Allow Access to All Photos");
    } catch (e) {
      console.log("No permissions dialog");
    }
  }
  // Check if image is already on device
  const profilePicture = await device1.doesElementExist(
    "accessibility id",
    `Photo, May 01, 1999, 7:00 AM`,
    2000
  );
  // If no image, push file to device
  if (!profilePicture) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/profile_picture.jpg'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${process.env.IOS_FIRST_SIMULATOR} 'run/test/specs/media/profile_picture.jpg'`,
      true
    );
  }
  await sleepFor(100);
  // Select file
  await device1.clickOnElement(`Photo, May 01, 1999, 7:00 AM`);
  await device1.clickOnElement("Done");

  await sleepFor(2000);
  // Wait for change
  // Verify change
  // Take screenshot
  const el = await device1.waitForElementToBePresent(
    "accessibility id",
    "Profile picture"
  );
  await sleepFor(3000);
  const base64 = await device1.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === "04cbfe") {
    console.log("Colour is correct");
  } else {
    console.log("Colour isn't 04cbfe, it is: ", pixelColor);
  }
  console.log("Now checking avatar on linked device");
  // Check avatar on device 2
  await device2.clickOnElement("User settings");
  const el2 = await device2.waitForElementToBePresent(
    "accessibility id",
    "Profile picture"
  );
  await sleepFor(3000);
  const base64A = await device2.getElementScreenshot(el2.ELEMENT);
  const pixelColorLinked = await parseDataImage(base64A);
  if (pixelColorLinked === "04cbfe") {
    console.log("Colour is correct on linked device");
  } else {
    console.log("Colour isn't 04cbfe, it is: ", pixelColorLinked);
  }
  await closeApp(device1, device2);
}

async function avatarRestoredAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const spongebobsBirthday = "199905010700.00";
  const userA = await linkedDevice(device1, device2, "Alice", platform);

  await device1.clickOnElement("User settings");
  await sleepFor(100);
  await device1.clickOnElement("User settings");
  await device1.clickOnElementById(
    "com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );
  await device1.waitForTextElementToBePresent(
    "id",
    "android:id/text1",
    "Files"
  );
  await device1.clickOnTextElementById("android:id/text1", "Files");
  // Check if permissions need to be enabled
  // Check if image is already on device
  const profilePicture = await device1.doesElementExist(
    "accessibility id",
    `profile_picture.jpg, 27.75 kB, May 1, 1999`,
    2000
  );
  // If no image, push file to device
  if (!profilePicture) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/profile_picture.jpg'`
    );

    await runScriptAndLog(
      `adb -s emulator-5554 push 'run/test/specs/media/profile_picture.jpg' /storage/emulated/0/Download`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnElement(`profile_picture.jpg, 27.75 kB, May 1, 1999`);
  await device1.clickOnElementById(
    "network.loki.messenger:id/crop_image_menu_crop"
  );
  await sleepFor(2000);
  // Wait for change
  // Verify change
  // Take screenshot
  const el = await device1.waitForElementToBePresent(
    "accessibility id",
    "User settings"
  );
  await sleepFor(3000);
  const base64 = await device1.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === "03cbfe") {
    console.log("Colour is correct on device 1");
  } else {
    console.log("Colour isn't 03cbfe, it is: ", pixelColor);
  }
  console.log("Now checking avatar on linked device");
  // Check avatar on device 2
  await device2.clickOnElement("User settings");
  const el2 = await device2.waitForElementToBePresent(
    "accessibility id",
    "User settings"
  );
  await sleepFor(3000);
  const base64A = await device2.getElementScreenshot(el2.ELEMENT);
  const pixelColorLinked = await parseDataImage(base64A);
  if (pixelColorLinked === "03cbfe") {
    console.log("Colour is correct on linked device");
  } else {
    console.log("Colour isn't 03cbfe, it is: ", pixelColorLinked);
  }
  await closeApp(device1, device2);
}

async function leaveGroupLinkedDevice(platform: SupportedPlatformsType) {
  const testGroupName = "Otter lovers";
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );
  const userC = await linkedDevice(device3, device4, "Carl", platform);
  // Create users A, B and C
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);

  // Create group with user A, user B and User C
  await createGroup(
    platform,
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    testGroupName
  );
  await device3.clickOnElement("More options");
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Leave group"
    )
  );
  await runOnlyOnIOS(platform, () => device3.clickOnElement("Leave group"));
  await device3.clickOnElement("Leave");
  await device3.navigateBack(platform);
  // Check for control message
  await device3.findConfigurationMessage("You have left the group.");
  await device4.clickOnElementByText("accessibility id", testGroupName);
  await device4.findConfigurationMessage("You have left the group.");
  await device2.findConfigurationMessage(`${userC.userName} left the group.`);
  await device1.findConfigurationMessage(`${userC.userName} left the group.`);
  await closeApp(device1, device2, device3);
}

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

  await androidIt("Check unsent message syncs", unSendMessageLinkedDevice);
  await iosIt("Check unsent message syncs", unSendMessageLinkedDevice);

  await iosIt("Check blocked user syncs", blockedUserLinkedDevice);
  await androidIt("Check blocked user syncs", blockedUserLinkedDevice);

  await iosIt("Check profile picture syncs", avatarRestorediOS);
  await androidIt("Check profile picture syncs", avatarRestoredAndroid);

  await iosIt("Leaving group syncs", leaveGroupLinkedDevice);
  await androidIt("Leaving group syncs", leaveGroupLinkedDevice);
});

// TESTS TO WRITE FOR LINKED DEVICE
// Leave group
// Message requests
