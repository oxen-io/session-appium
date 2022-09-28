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
import { sendMessage } from "./utils/send_message";
import {
  clickOnElement,
  findElement,
  findMatchingTextAndAccessibilityId,
  findMessageWithBody,
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
  inputText,
  longPressMessage,
  runOnlyOnAndroid,
  runOnlyOnIOS,
  saveText,
  selectByText,
} from "./utils/utilities";

async function linkDevice(platform: SupportedPlatformsType) {
  // Open server and two devices
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // link device
  const user = await linkedDevice(device1, device2, "User A");
  // Check that 'Youre almost finished' reminder doesn't pop up on device2
  await hasElementBeenDeleted(device2, "Recovery phrase reminder");
  // Verify username and session ID match
  await clickOnElement(device2, "User settings");
  // Check username
  const username = await findElement(device2, "Username");
  const sessionId = await findElement(device2, "Session ID");
  expect(username).toBe(user.userName);
  expect(sessionId).toBe(user.sessionID);

  await closeApp(server, device1, device2);
}

async function contactsSyncLinkedDevice(platform: SupportedPlatformsType) {
  const { server, device1, device2, device3 } = await openAppThreeDevices(
    platform
  );
  // link device
  const userA = await linkedDevice(device1, device3, "User A");

  const userB = await newUser(device2, "User B");

  await newContact(device1, userA, device2, userB);
  // Check that user synced on linked device
  await findMatchingTextAndAccessibilityId(
    device3,
    "Conversation list item",
    userB.userName
  );
  await closeApp(server, device1, device2, device3);
}

async function groupCreationLinkedDevice(platform: SupportedPlatformsType) {
  const { server, device1, device2, device3, device4 } =
    await openAppFourDevices(platform);

  const userA = await linkedDevice(device1, device4, "User A");

  const [userB, userC] = await Promise.all([
    newUser(device2, "User B"),
    newUser(device3, "User C"),
  ]);
  const testGroupName = "Linked device group";
  await createGroup(
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    testGroupName
  );
  // Test that group has loaded on linked device
  await selectByText(device4, "Conversation item list", testGroupName);
  // Test group name change syncs
  // Change group name in device 1
  // Click on settings/more info
  await clickOnElement(device1, "More options");
  // Edit group
  await clickOnElement(device1, "Edit group");
  // click on group name to change it
  await clickOnElement(device1, "Group name");
  // Type in new name
  await inputText(device1, "Group name", "New group name for linked test");
  // Confirm change (tick on android/ first done on ios)
  await clickOnElement(device1, "Accept name change");
  // Apply changes (Apply on android/ second done on ios)
  await clickOnElement(device1, "Apply changes");
  await clickOnElement(device1, "Accept name change");
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await runOnlyOnIOS(platform, () =>
    findMatchingTextAndAccessibilityId(
      device1,
      "Configuration message",
      "Title is now " + `'${testGroupName}''`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    findMatchingTextAndAccessibilityId(
      device1,
      "Configuration message",
      "You renamed group to " + `'${testGroupName}''`
    )
  );
  // Wait 5 seconds for name to update
  await device4.setImplicitWaitTimeout(5000);
  // Check linked device for name change (conversation header name)
  await findMatchingTextAndAccessibilityId(device4, "Username", testGroupName);
  // Check config message in linked device aswell
  await runOnlyOnIOS(platform, () =>
    findMatchingTextAndAccessibilityId(
      device4,
      "Configuration message",
      "Title is now " + `'${testGroupName}''`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    findMatchingTextAndAccessibilityId(
      device4,
      "Configuration message",
      "You renamed group to " + `'${testGroupName}''`
    )
  );

  await closeApp(server, device1, device2, device3, device4);
}

async function changeUsernameLinkedDevice(platform: SupportedPlatformsType) {
  // Open server and two devices
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // link device
  const userA = await linkedDevice(device1, device2, "User A");
  // Change username on device 1
  await clickOnElement(device1, "User settings");
  // Select username
  await clickOnElement(device1, "Username");
  const newUsername = await inputText(device1, "Username", "New username");
  console.warn(newUsername);
  // Select apply
  await clickOnElement(device1, "Accept name change");
  // Check on linked device if name has updated
  await clickOnElement(device2, "User settings");
  const changedUsername = await saveText(device2, "Username");
  expect(changedUsername).toBe(newUsername);

  await closeApp(server, device1, device2);
}

async function deletedMessageLinkedDevice(platform: SupportedPlatformsType) {
  const { server, device1, device2, device3 } = await openAppThreeDevices(
    platform
  );

  const userA = await linkedDevice(device1, device3, "User A");

  const userB = await newUser(device2, "User B");

  await newContact(device1, userA, device2, userB);
  // Send message from user a to user b
  const sentMessage = await sendMessage(device1);
  // Check message came through on linked device(3)
  // Enter conversation with user B on device 3
  await selectByText(device3, "Conversation list item", userB.userName);
  // Find message
  await findMessageWithBody(device3, sentMessage);
  // Select message on device 1, long press
  await longPressMessage(device1, sentMessage);
  // Select delete
  await clickOnElement(device1, "Delete message");
  // Select delete for everyone
  await clickOnElement(device1, "Delete for everyone");
  // Look for deleted message config in device2
  await findElement(device2, "Deleted message");
  // Check linked device for deleted message
  await hasTextElementBeenDeleted(device3, "Message body", sentMessage);
  // Close app
  await closeApp(server, device1, device2, device3);
}

// async function avatarRestored(platform: SupportedPlatformsType) {
//   // open server and two devices
//   const { server, device1, device2 } = await openAppTwoDevices(platform);
//   // Link device
//   const user = await linkedDevice(device1, device2, "User A");
//   // Take screenshot of avatar in device 1
//   await clickOnElement(device1, "User settings");
//   await findElement(device1, "Profile picture");
//   const screenShotDeviceOne = await device1.takeScreenshot();

//   await clickOnElement(device2, "User settings");
//   const screenShotDeviceTwo = await device2.takeScreenshot();

//   new similarityMatchingOptions();
// }

describe("Linked device tests", () => {
  iosIt("Link a device", linkDevice);
  androidIt("Link a device", linkDevice);

  iosIt("Check group syncs", groupCreationLinkedDevice);
  androidIt("Check group syncs", groupCreationLinkedDevice);

  androidIt("Check contact syncs", contactsSyncLinkedDevice);
  iosIt("Check contact syncs", contactsSyncLinkedDevice);

  androidIt("Check changed username syncs", changeUsernameLinkedDevice);
  iosIt("Check changed username syncs", changeUsernameLinkedDevice);

  androidIt("Check deleted message syncs", deletedMessageLinkedDevice);
  iosIt("Check deleted message syncs", deletedMessageLinkedDevice);

  // iosIt("Check avatar is restored", avatarRestored);
  // androidIt("Check avatar is restored", avatarRestored);
});