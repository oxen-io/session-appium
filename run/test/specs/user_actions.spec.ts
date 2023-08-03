import { androidIt, iosIt } from "../../types/sessionIt";
import { parseDataImage } from "./utils/check_colour";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils/index";
import {
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

async function createContact(platform: SupportedPlatformsType) {
  // first we want to install the app on each device with our custom call to run it
  const { device1, device2 } = await openAppTwoDevices(platform);

  const userA = await newUser(device1, "Alice", platform);
  const userB = await newUser(device2, "Bob", platform);

  await newContact(platform, device1, userA, device2, userB);
  // Wait for tick
  await closeApp(device1, device2);
}
async function blockUserInConversationOptions(
  platform: SupportedPlatformsType
) {
  // Open App
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A
  // Create Bob
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Block contact
  // Click on three dots (settings)
  await device1.clickOnElement("More options");
  // Select Block option

  await runOnlyOnIOS(platform, () => device1.clickOnElement("Block"));
  await sleepFor(1000);
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnTextElementById(`network.loki.messenger:id/title`, "Block")
  );
  // Confirm block option
  await device1.clickOnElement("Confirm block");
  // On ios there is an alert that confirms that the user has been blocked
  await sleepFor(1000);
  // await runOnlyOnIOS(platform, () => clickOnXAndYCoordinates(device1));
  console.warn(`${userB.userName}` + " has been blocked");

  // On ios, you need to navigate back to conversation screen to confirm block
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Back"));
  // Look for alert at top of screen (Bob is blocked. Unblock them?)
  await device1.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Blocked banner",
  });
  console.warn("User has been blocked");
  // Click on alert to unblock
  await device1.clickOnElement("Blocked banner");
  // on ios there is a confirm unblock alert, need to click 'unblock'
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Unblock"));
  console.warn("User has been unblocked");
  // Look for alert (shouldn't be there)
  await device1.hasElementBeenDeleted("accessibility id", "Blocked banner");
  // Has capabilities returned to blocked user (can they send message)
  const hasUserBeenUnblockedMessage = await device2.sendMessage(
    "Hey, am I unblocked?"
  );
  // Check in device 1 for message
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: hasUserBeenUnblockedMessage,
  });

  // Close app
  await closeApp(device1, device2);
}

async function blockUserInConversationList(platform: SupportedPlatformsType) {
  // Open App
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create Alice
  // Create Bob
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Navigate back to conversation list
  await runOnlyOnAndroid(platform, () => device1.clickOnElement("Navigate up"));
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Back"));
  // on ios swipe left on conversation
  await runOnlyOnAndroid(platform, () =>
    device1.longPressConversation(userB.userName)
  );
  await runOnlyOnIOS(platform, () =>
    device1.swipeLeft("Conversation list item", userB.userName)
  );
  await device1.clickOnElement("Block");
  await closeApp(device1, device2);
}

async function changeUsername(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  const userA = await newUser(device, "Alice", platform);
  const newUsername = "Alice in chains";
  // click on settings/profile avatar
  await device.clickOnElement("User settings");
  // select username
  await device.clickOnElement("Username");
  // type in new username
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () => device.deleteTextIos("Username"));
  await runOnlyOnAndroid(platform, () => device.deleteTextAndroid("Username"));
  await sleepFor(100);
  await device.inputText("accessibility id", "Username", newUsername);
  const changedUsername = await device.grabTextFromAccessibilityId("Username");
  console.log("Changed username", changedUsername);
  if (changedUsername === newUsername) {
    console.log("Username change successful");
  }
  if (changedUsername === userA.userName) {
    console.log("Username is still ", userA.userName);
  }
  if (changedUsername === "Username") {
    console.log(
      "Username is not picking up text but using access id text",
      changedUsername
    );
  }
  // select tick
  await runOnlyOnAndroid(platform, () => device.clickOnElement("Apply"));
  await runOnlyOnIOS(platform, () => device.clickOnElement("Done"));
  // verify new username

  await closeApp(device);
}

async function changeProfilePictureAndroid(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const spongebobsBirthday = "199905020700.00";
  // Create new user
  await newUser(device, "Alice", platform);
  // Click on settings/avatar
  await device.clickOnElement("User settings");
  await sleepFor(100);
  // Click on Profile picture
  await device.clickOnElement("User settings");
  // Click on Photo library
  await sleepFor(100);
  await device.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Upload",
  });
  await sleepFor(100);
  await device.clickOnElementById(
    "com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );
  await device.waitForTextElementToBePresent({
    strategy: "id",
    selector: "android:id/text1",
    text: "Files",
  });
  await device.clickOnTextElementById("android:id/text1", "Files");
  // Select file
  await sleepFor(2000);
  const profilePicture = await device.doesElementExist({
    strategy: "accessibility id",
    selector: `profile_picture.jpg, 27.75 kB, May 1, 1999`,
    maxWait: 2000,
  });
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
  await device.clickOnElement(`profile_picture.jpg, 27.75 kB, May 1, 1999`);
  await device.clickOnElementById(
    "network.loki.messenger:id/crop_image_menu_crop"
  );
  const el = await device.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "User settings",
  });
  await sleepFor(3000);
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === "03cbfe") {
    console.log("Colour is correct on device 1");
  } else {
    console.log("Colour isn't 03cbfe, it is: ", pixelColor);
  }
  // Check avatar on device 2

  await closeApp(device);
}

async function changeProfilePictureiOS(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const spongebobsBirthday = "199805010700.00";
  // Create new user
  await newUser(device, "Alice", platform);
  // Click on settings/avatar
  await device.clickOnElement("User settings");
  await sleepFor(100);
  await device.clickOnElement("Profile picture");
  // await device.clickOnElement("Photo library");
  await device.clickOnElement("Image picker");
  const permissions = await device.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Access to All Photos",
    maxWait: 1000,
  });
  if (permissions) {
    try {
      await device.clickOnElement("Allow Access to All Photos");
    } catch (e) {
      console.log("No permissions dialog");
    }
  }
  const profilePicture = await device.doesElementExist({
    strategy: "accessibility id",
    selector: `Photo, May 01, 1998, 7:00 AM`,
    maxWait: 2000,
  });
  if (!profilePicture) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/profile_picture.jpg'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${
        process.env.IOS_FIRST_SIMULATOR || ""
      } 'run/test/specs/media/profile_picture.jpg'`,
      true
    );
  }
  // Click on Profile picture
  // Click on Photo library
  await sleepFor(100);
  await device.clickOnElement(`Photo, May 01, 1998, 7:00 AM`);
  await device.clickOnElement("Done");
  await device.clickOnElement("Upload");
  // Take screenshot
  const el = await device.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Profile picture",
  });
  await sleepFor(3000);
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === "ff382e") {
    console.log("Colour is correct");
  } else {
    console.log("Colour isn't ff382e, it is: ", pixelColor);
  }
  await closeApp(device);
}

async function setNicknameAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const nickName = "New nickname";
  await newContact(platform, device1, userA, device2, userB);
  // Go back to conversation list
  await device1.clickOnElement("Navigate up");
  // Select conversation in list with Bob
  await device1.longPressConversation(userB.userName);
  // Select 'Details' option
  await device1.clickOnElement("Details");
  // Select username to edit
  await device1.clickOnElement("Edit user nickname");
  // Type in nickname
  await device1.inputText("accessibility id", "Username", nickName);
  // Click on tick button
  await device1.clickOnElement("Apply");
  // CLick out of pop up
  await device1.clickOnElement("Message user");
  // Check name at top of conversation is nickname
  const headerElement = await device1.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Username",
  });
  await device1.getTextFromElement(headerElement);
  // Send a message so nickname is updated in conversation list
  await device1.sendMessage("Howdy");
  // Navigate out of conversation
  await device1.clickOnElement("Navigate up");
  // Change nickname back to original username
  // Long press on contact conversation
  await device1.longPressConversation(nickName);
  // Select details
  await device1.clickOnElement("Details");
  // Click on username to edit
  await device1.clickOnElement("Edit user nickname");
  // Click apply without entering new nickname
  await device1.clickOnElement("Apply");
  // Click out of pop up
  await device1.back();
  // Enter conversation to verify change
  await device1.selectByText("Conversation list item", nickName);
  const changedElement = await device1.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Username",
  });
  await device1.getTextFromElement(changedElement);
  // Send message to change in conversation list
  await device1.sendMessage("Howdy");
  // Navigate back to list
  await device1.clickOnElement("Navigate up");
  // Verify name change in list
  // Save text of conversation list item?
  await device1.selectByText("Conversation list item", userB.userName);
  const revertedHeader = await device1.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Username",
  });
  await device1.getTextFromElement(revertedHeader);
  // if (originalUsername === userB.userName) {
  //   console.log("Nickname changed back to original username");
  // } else {
  //   console.log("Nickname doesn't match original username");
  // }
  // Close app
  await closeApp(device1, device2);
}

async function setNicknameIos(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const nickName = "New nickname";
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  // Click on settings/more info
  await device1.clickOnElement("More options");
  // Click on username to set nickname
  await device1.clickOnElement("Username");
  await device1.deleteTextIos("Username");
  // Type in nickname
  await device1.inputText("accessibility id", "Username", nickName);
  // Click apply/done
  await device1.clickOnElement("Done");
  // Check it's changed in heading also
  await device1.clickOnElement("Back");
  const newNickname = await device1.grabTextFromAccessibilityId("Username");
  await device1.findMatchingTextAndAccessibilityId("Username", newNickname);
  // Check in conversation list also
  await device1.clickOnElement("Back");
  // Save text of conversation list item?
  await sleepFor(1000);
  await device1.findMatchingTextAndAccessibilityId(
    "Conversation list item",
    nickName
  );
  // Set nickname back to original username
  await device1.selectByText("Conversation list item", nickName);
  // Click on settings/more info
  await device1.clickOnElement("More options");
  // Click on edit
  await device1.clickOnElement("Username");
  // Empty username input
  await device1.deleteTextIos("Nickname");
  await device1.clickOnElement("Done");
  // Check in conversation header
  await device1.clickOnElement("Back");
  await sleepFor(1000);
  const revertedNickname = await device1.grabTextFromAccessibilityId(
    "Username"
  );
  console.warn(`revertedNickname:` + revertedNickname);
  if (revertedNickname !== userB.userName) {
    throw new Error(`revertedNickname doesn't match Bob's username`);
  }
  await device1.clickOnElement("Back");
  // Check in conversation list aswell
  await device1.findMatchingTextAndAccessibilityId(
    "Conversation list item",
    userB.userName
  );
  // Close app
  await closeApp(device1, device2);
}

async function readStatus(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing read status";
  await newContact(platform, device1, userA, device2, userB);
  // Go to settings to turn on read status
  // Device 1
  await Promise.all([
    device1.turnOnReadReceipts(platform),
    device2.turnOnReadReceipts(platform),
  ]);
  await device1.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Conversation list item",
    text: userB.userName,
  });
  // Send message from User A to User B to verify read status is working
  await device1.sendMessage(testMessage);
  await sleepFor(100);
  await device2.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Conversation list item",
    text: userA.userName,
  });
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Body",
    text: testMessage,
  });
  await device2.clickOnElementByText({
    strategy: "accessibility id",
    selector: "Message Body",
    text: testMessage,
  });
  // Check read status on device 1
  await runOnlyOnAndroid(platform, () =>
    device1.waitForTextElementToBePresent({
      strategy: "id",
      selector: "network.loki.messenger:id/messageStatusTextView",
      text: "Read",
    })
  );
  await runOnlyOnIOS(platform, () =>
    device1.waitForElementToBePresent({
      strategy: "accessibility id",
      selector: "Message sent status: Read",
    })
  );

  await closeApp(device1, device2);
}

describe("User actions", () => {
  iosIt("Create contact", createContact);
  androidIt("Create contact", createContact);

  iosIt("Block user in conversation options", blockUserInConversationOptions);
  androidIt(
    "Block user in conversation options",
    blockUserInConversationOptions
  );

  androidIt("Block user in conversation list", blockUserInConversationList);

  androidIt("Change username", changeUsername);
  iosIt("Change username", changeUsername);
  // NEED TO FIX
  androidIt("Change profile picture", changeProfilePictureAndroid);
  iosIt("Change profile picture", changeProfilePictureiOS);

  androidIt("Set nickname", setNicknameAndroid);
  iosIt("Set nickname", setNicknameIos);

  androidIt("Read status", readStatus);
  iosIt("Read status", readStatus);
});

// Check read receipts working
// Typing indicators working
