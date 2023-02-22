import { androidIt, iosIt } from "../../types/sessionIt";
import { parseDataImage } from "./utils/check_colour";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  clickOnXAndYCoordinates,
  hasElementBeenDeleted,
  runOnlyOnAndroid,
  runOnlyOnIOS,
  sleepFor,
} from "./utils/index";
import {
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

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
  await device1.clickOnElement("Block");
  // Confirm block option
  await device1.clickOnElement("Confirm block");
  // On ios there is an alert that confirms that the user has been blocked
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () => device1.clickOnElement("OK_BUTTON"));
  // await runOnlyOnIOS(platform, () => clickOnXAndYCoordinates(device1));
  console.warn(`${userB.userName}` + " has been blocked");

  // On ios, you need to navigate back to conversation screen to confirm block
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Back"));
  // Look for alert at top of screen (Bob is blocked. Unblock them?)
  await device1.waitForElementToBePresent("Blocked banner");
  console.warn("User has been blocked");
  // Click on alert to unblock
  await device1.clickOnElement("Blocked banner");
  // on ios there is a confirm unblock alert, need to click 'unblock'
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Unblock"));
  console.warn("User has been unblocked");
  // Look for alert (shouldn't be there)
  await hasElementBeenDeleted(device1, "Blocked banner");
  // Has capabilities returned to blocked user (can they send message)
  const hasUserBeenUnblockedMessage = await device2.sendMessage(
    "Hey, am I unblocked?"
  );
  // Check in device 1 for message
  await device1.waitForTextElementToBePresent(
    "Message Body",
    hasUserBeenUnblockedMessage
  );
  console.log(`Message came through from ${userB.userName}`);

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
  console.warn("Element clicked?");
  // type in new username

  await device.inputText("Username", newUsername);
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
async function changeAvatarAndroid(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  // Create new user
  const userA = await newUser(device, "Alice", platform);
  // Click on settings/avatar
  await device.clickOnElement("User settings");
  await sleepFor(100);

  // Click on Profile picture
  await device.clickOnElement("User settings");
  // Click on Photo library
  await sleepFor(100);
  await clickOnXAndYCoordinates(device, 315, 316);
  // await device.back();
  // Select file
  await sleepFor(2000);

  // Need to add a function that if file isn't found, push file to device
  await device.clickOnElementXPath(
    '//android.widget.LinearLayout[@content-desc="download.png, 3.59 kB, Jan 30"]/android.widget.RelativeLayout/android.widget.FrameLayout[1]/android.widget.ImageView[1]'
  );
  // Click crop
  await device.clickOnElementXPath(
    "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[1]/android.view.ViewGroup/androidx.appcompat.widget.LinearLayoutCompat/android.widget.Button[3]"
  );
  // Wait for change
  await sleepFor(5000);
  // Verify change somehow...?
  // Take screenshot
  const el = await device.waitForElementToBePresent("User settings");
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === "00cbfe") {
    console.log("Colour is correct");
  } else {
    console.log("Colour isn't 00cbfe, it is: ", pixelColor);
  }
  await closeApp(device);
}
async function changeAvatariOS(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  // Create new user
  const userA = await newUser(device, "Alice", platform);
  // Click on settings/avatar
  await device.clickOnElement("User settings");
  await sleepFor(100);

  // Click on Profile picture
  await device.clickOnElement("Profile picture");
  await device.clickOnElement("Photo library");
  // Click on Photo library
  await sleepFor(100);
  await device.clickOnElement(`Photo, January 30, 4:17 PM`);
  await device.clickOnElement("Done");
  // Select file
  await sleepFor(2000);
  await device.clickOnElement(`Photo, January 30, 4:17 PM`);
  await device.clickOnElement("Done");

  // Need to add a function that if file isn't found, push file to device
  // Wait for change
  // Verify change somehow...?
  // Take screenshot
  const el = await device.waitForElementToBePresent("Profile picture");
  await sleepFor(3000);
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === "00cbfe") {
    console.log("Colour is correct");
  } else {
    console.log("Colour isn't 00cbfe, it is: ", pixelColor);
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
  await device1.inputText("Username", nickName);
  // Click on tick button
  await device1.clickOnElement("Apply");
  // CLick out of pop up
  await clickOnXAndYCoordinates(device1, 484, 108);
  // Click on conversation to verify nickname is applied
  await device1.selectByText("Conversation list item", userB.userName);
  // Check name at top of conversation is nickname
  const headerElement = await device1.waitForElementToBePresent("Username");
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
  const changedElement = await device1.waitForElementToBePresent("Username");
  await device1.getTextFromElement(changedElement);
  // Send message to change in conversation list
  await device1.sendMessage("Howdy");
  // Navigate back to list
  await device1.clickOnElement("Navigate up");
  // Verify name change in list
  // Save text of conversation list item?
  await device1.selectByText("Conversation list item", userB.userName);
  const revertedHeader = await device1.waitForElementToBePresent("Username");
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
  // Type in nickname
  await device1.inputText("Username", nickName);
  // Click apply/done
  await device1.clickOnElement("Done");
  // Check it's changed in heading also
  await device1.clickOnElement("Back");
  const newNickname = await device1.grabTextFromAccessibilityId("Username");
  await device1.findMatchingTextAndAccessibilityId("Username", newNickname);
  // Check in conversation list also
  await device1.clickOnElement("Back");
  // Save text of conversation list item?
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
  await device1.deleteText("Nickname");
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

describe("User actions", async () => {
  await iosIt("Create contact", createContact);
  await androidIt("Create contact", createContact);

  await iosIt(
    "Block user in conversation options",
    blockUserInConversationOptions
  );
  await androidIt(
    "Block user in conversation options",
    blockUserInConversationOptions
  );

  await iosIt("Block user in conversation list", blockUserInConversationList);
  await androidIt(
    "Block user in conversation list",
    blockUserInConversationList
  );

  await androidIt("Change username", changeUsername);
  await iosIt("Change username", changeUsername);

  await androidIt("Change avatar", changeAvatarAndroid);
  await iosIt("Change avatar", changeAvatariOS);

  await androidIt("Set nickname", setNicknameAndroid);
  await iosIt("Set nickname", setNicknameIos);
});

// Check read receipts workin
