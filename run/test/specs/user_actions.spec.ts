import {
  clickOnElement,
  deleteText,
  findMatchingTextAndAccessibilityId,
  hasElementBeenDeleted,
  inputText,
  longPressConversation,
  runOnlyOnAndroid,
  runOnlyOnIOS,
  selectByText,
  swipeLeft,
  sendMessage,
  waitForTextElementToBePresent,
  sleepFor,
  waitForElementToBePresent,
  doFunctionIfElementExists,
  clickOnXAndYCoordinates,
} from "./utils/index";
import { newUser } from "./utils/create_account";
import {
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { androidIt, iosIt } from "../../types/sessionIt";
import { newContact } from "./utils/create_contact";
import { grabTextFromAccessibilityId } from "./utils/save_text";
import { findElementByXpath } from "./utils/find_elements_stragegy";
import { getTextFromElement } from "./utils/element_text";

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
  await clickOnElement(device1, "More options");
  // Select Block option
  await clickOnElement(device1, "Block");
  // Confirm block option
  await clickOnElement(device1, "Confirm block");
  // On ios there is an alert that confirms that the user has been blocked
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () => clickOnElement(device1, "OK_BUTTON"));
  // await runOnlyOnIOS(platform, () => clickOnXAndYCoordinates(device1));
  console.warn(`${userB.userName}` + " has been blocked");

  // On ios, you need to navigate back to conversation screen to confirm block
  await runOnlyOnIOS(platform, () => clickOnElement(device1, "Back"));
  // Look for alert at top of screen (Bob is blocked. Unblock them?)
  await waitForElementToBePresent(device1, "Blocked banner");
  console.warn("User has been blocked");
  // Click on alert to unblock
  await clickOnElement(device1, "Blocked banner");
  // on ios there is a confirm unblock alert, need to click 'unblock'
  await runOnlyOnIOS(platform, () => clickOnElement(device1, "Unblock"));
  console.warn("User has been unblocked");
  // Look for alert (shouldn't be there)
  await hasElementBeenDeleted(device1, "Blocked banner");
  // Has capabilities returned to blocked user (can they send message)
  const hasUserBeenUnblockedMessage = await sendMessage(
    device2,
    "Hey, am I unblocked?"
  );
  // Check in device 1 for message
  await waitForTextElementToBePresent(
    device1,
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
  await runOnlyOnAndroid(platform, () =>
    clickOnElement(device1, "Navigate up")
  );
  await runOnlyOnIOS(platform, () => clickOnElement(device1, "Back"));
  // await device1.setImplicitWaitTimeout(20000);
  // on ios swipe left on conversation
  await runOnlyOnAndroid(platform, () =>
    longPressConversation(device1, userB.userName)
  );
  await runOnlyOnIOS(platform, () =>
    swipeLeft(device1, "Conversation list item", userB.userName)
  );
  await clickOnElement(device1, "Block");
  await closeApp(device1, device2);
}
async function changeUsername(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  await newUser(device, "Alice", platform);
  // click on settings/profile avatar
  await clickOnElement(device, "User settings");
  // select username
  await clickOnElement(device, "Username");
  console.warn("Element clicked?");
  // type in new username

  const newUsername = await inputText(device, "Username", "New username");
  console.warn(newUsername);
  // select tick
  await runOnlyOnAndroid(platform, () => clickOnElement(device, "Apply"));
  await runOnlyOnIOS(platform, () => clickOnElement(device, "Done"));
  // verify new username

  await closeApp(device);
}
async function changeAvatar(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  // Create new user
  const userA = await newUser(device, "Alice", platform);
  // Click on settings/avatar
  await clickOnElement(device, "User settings");

  // Click on Profile picture
  await clickOnElement(device, "Profile picture");
  // Click on Photo library
  await clickOnElement(device, "Photo library");
  await doFunctionIfElementExists(
    device,
    "accessibility id",
    "Allow Access to All Photos",
    () => clickOnElement(device, "Allow Access to All Photos")
  );
  // Select file
  await sleepFor(2000);

  const elems = await findElementByXpath(
    device,
    '//XCUIElementTypeCell[@name="Photo, September 09, 2022, 3:33 PM"]/XCUIElementTypeOther'
  );
  await clickOnElement(device, elems.ELEMENT);
  // Click done
  await clickOnElement(device, "Done");
  // Wait for change
  // Verify change somehow...?
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
  await clickOnElement(device1, "Navigate up");
  // Select conversation in list with Bob
  await longPressConversation(device1, userB.userName);
  // Select 'Details' option
  await clickOnElement(device1, "Details");
  // Select username to edit
  await clickOnElement(device1, "Edit user nickname");
  // Type in nickname
  await inputText(device1, "Username", nickName);
  // Click on tick button
  await clickOnElement(device1, "Apply");
  // CLick out of pop up
  await clickOnXAndYCoordinates(device1, 484, 108);
  // Click on conversation to verify nickname is applied
  await selectByText(device1, "Conversation list item", userB.userName);
  // Check name at top of conversation is nickname
  const headerElement = await waitForElementToBePresent(device1, "Username");
  const conversationHeaderNickname = await getTextFromElement(
    device1,
    headerElement
  );
  // if (conversationHeaderNickname === nickName) {
  //   await console.log("Nickname changed successfully");
  // } else {
  //   await console.log("Nickname change unsuccessful");
  // }
  // Send a message so nickname is updated in conversation list
  await sendMessage(device1, "Howdy");
  // Navigate out of conversation
  await clickOnElement(device1, "Navigate up");
  // Change nickname back to original username
  // Long press on contact conversation
  await longPressConversation(device1, nickName);
  // Select details
  await clickOnElement(device1, "Details");
  // Click on username to edit
  await clickOnElement(device1, "Edit user nickname");
  // Click apply without entering new nickname
  await clickOnElement(device1, "Apply");
  // Click out of pop up
  await device1.back();
  // Enter conversation to verify change
  await selectByText(device1, "Conversation list item", nickName);
  const changedElement = await waitForElementToBePresent(device1, "Username");
  const conversationListNickname = await getTextFromElement(
    device1,
    changedElement
  );
  // Send message to change in conversation list
  await sendMessage(device1, "Howdy");
  // Navigate back to list
  await clickOnElement(device1, "Navigate up");
  // Verify name change in list
  // Save text of conversation list item?
  await selectByText(device1, "Conversation list item", userB.userName);
  const revertedHeader = await waitForElementToBePresent(device1, "Username");
  const originalUsername = await getTextFromElement(device1, revertedHeader);
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
  await clickOnElement(device1, "More options");
  // Click on username to set nickname
  await clickOnElement(device1, "Username");
  // Type in nickname
  await inputText(device1, "Username", nickName);
  // Click apply/done
  await clickOnElement(device1, "Done");
  // Check it's changed in heading also
  await clickOnElement(device1, "Back");
  const newNickname = await grabTextFromAccessibilityId(device1, "Username");
  await findMatchingTextAndAccessibilityId(device1, "Username", newNickname);
  // Check in conversation list also
  await clickOnElement(device1, "Back");
  // Save text of conversation list item?
  await findMatchingTextAndAccessibilityId(
    device1,
    "Conversation list item",
    nickName
  );
  // Set nickname back to original username
  await selectByText(device1, "Conversation list item", nickName);
  // Click on settings/more info
  await clickOnElement(device1, "More options");
  // Click on edit
  await clickOnElement(device1, "Username");
  // Empty username input
  await deleteText(device1, "Nickname");
  await clickOnElement(device1, "Done");
  // Check in conversation header
  await clickOnElement(device1, "Back");
  await sleepFor(1000);
  const revertedNickname = await grabTextFromAccessibilityId(
    device1,
    "Username"
  );
  console.warn(`revertedNickname:` + revertedNickname);
  if (revertedNickname !== userB.userName) {
    throw new Error(`revertedNickname doesn't match Bob's username`);
  }
  await clickOnElement(device1, "Back");
  // Check in conversation list aswell
  await findMatchingTextAndAccessibilityId(
    device1,
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

  await androidIt("Change avatar", changeAvatar);
  await iosIt("Change avatar", changeAvatar);

  await androidIt("Set nickname", setNicknameAndroid);
  await iosIt("Set nickname", setNicknameIos);
});

// Check read receipts working
