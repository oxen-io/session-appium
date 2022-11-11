import {
  clickOnElement,
  findElement,
  findMatchingTextAndAccessibilityId,
  findMessageWithBody,
  hasElementBeenDeleted,
  hasTextElementBeenDeleted,
  inputText,
  longPressConversation,
  runOnlyOnIOS,
  saveText,
  selectByText,
  swipeLeft,
} from "./utils/utilities";
import { newUser } from "./utils/create_account";
import {
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { sendNewMessage } from "./utils/send_new_message";
import { androidIt, iosIt } from "../../types/sessionIt";
import { newContact } from "./utils/create_contact";
import { sendMessage } from "./utils/send_message";

async function createContact(platform: SupportedPlatformsType) {
  // first we want to install the app on each device with our custom call to run it
  const { server, device1, device2 } = await openAppTwoDevices(platform);

  console.warn("createContact done");

  // const [userA, userB] = await Promise.all([
  //   newUser(device1, "User A"),
  //   newUser(device2, "User B"),
  // ]);

  const userA = await newUser(device1, "User A", platform);
  const userB = await newUser(device2, "User B", platform);
  console.warn("createContact newuser");

  await sendNewMessage(device1, userB);
  await clickOnElement(device2, "Message requests banner");
  // Select message from User A
  await clickOnElement(device2, "Message request");
  // Type into message input box
  await inputText(
    device2,
    "Message input box",
    "Test-message-User-B-to-User-A"
  );
  // Click send
  await clickOnElement(device2, "Send message button");
  // Wait for tick
  await closeApp(server, device1, device2);
}
async function blockUserInConversationOptions(
  platform: SupportedPlatformsType
) {
  // Open App
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create user A
  // Create user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Create contact
  await newContact(device1, userA, device2, userB);
  // Block contact
  // Click on three dots (settings)
  await clickOnElement(device1, "More options");
  // Select Block option
  await clickOnElement(device1, "Block");
  // Confirm block option
  await clickOnElement(device1, "Confirm block");
  // On ios there is an alert that confirms that the user has been blocked
  await runOnlyOnIOS(platform, () =>
    clickOnElement(device1, "Confirm blocked user")
  );
  // On ios, you need to navigate back to conversation screen to confirm block
  await runOnlyOnIOS(platform, () => clickOnElement(device1, "Navigate up"));
  // Look for alert at top of screen (User B is blocked. Unblock them?)
  await findElement(device1, "Blocked banner");
  console.warn("User has been blocked");
  // Check if blocked user can send message (User B to User A)
  const sentMessage = await sendMessage(device2);
  // Check device 1 if message has come through (shouldn't exist)
  await hasTextElementBeenDeleted(device1, "Message body", sentMessage);
  // Click on alert to unblock
  await clickOnElement(device1, "Blocked banner");
  // on ios there is a confirm unblock alert, need to click 'unblock'
  await runOnlyOnIOS(platform, () =>
    clickOnElement(device1, "Confirm unblock")
  );
  // Look for alert (shouldn't be there)
  await hasElementBeenDeleted(device1, "Blocked banner");
  // Has capabilities returned to blocked user (can they send message)
  const hasUserBeenUnblockedMessage = await sendMessage(device2);
  // Check in device 1 for message
  await findMessageWithBody(device1, hasUserBeenUnblockedMessage);
  // Close app
  await closeApp(server, device1, device2);
}

async function blockUserInConversationList(platform: SupportedPlatformsType) {
  // Open App
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create user A
  // Create user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  // Create contact
  await newContact(device1, userA, device2, userB);
  // Navigate back to conversation list
  await clickOnElement(device1, "Navigate up");
  // on ios swipe left on conversation
  await runOnlyOnIOS(platform, () =>
    swipeLeft(device1, "Conversation list item", userB.userName)
  );
  await clickOnElement(device1, "Block user");
  await closeApp(server, device1, device2);
}
async function changeUsername(platform: SupportedPlatformsType) {
  const { server, device: device1 } = await openAppOnPlatformSingleDevice(
    platform
  );

  await newUser(device1, "User A", platform);
  // click on settings/profile avatar
  await clickOnElement(device1, "User settings");
  // select username
  await clickOnElement(device1, "Username");
  console.warn("Element clicked?");
  // type in new username

  const newUsername = await inputText(device1, "Username text", "New username");
  console.warn(newUsername);
  // select tick
  await clickOnElement(device1, "Apply");
  // verify new username

  await closeApp(server, device1);
}
async function changeAvatar(platform: SupportedPlatformsType) {
  const { server, device } = await openAppOnPlatformSingleDevice(platform);

  // Create new user
  const userA = newUser(device, "User A", platform);
  // Click on settings/avatar
  await clickOnElement(device, "User settings");
  // Dismiss alert 'Allow Session to take pictures and record video?'
  // Should automatically do it
  // Click on User settings
  await device.pushFileToDevice("../specs/media/new_profile_pic.png");
  // Click on avatar picture to open file picker
  await clickOnElement(device, "User settings");
  // Click on 'Update User settings' dialog (Photo library)
  await clickOnElement(device, "Photo library");
  // Select file
  await clickOnElement(device, "first_photo.jpeg");
  // Click done
  await clickOnElement(device, "Done");
  // Wait for change
  // Verify change somehow...?
  closeApp(server, device);
}
async function setNicknameAndroid(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  await newContact(device1, userA, device2, userB);
  // Go back to conversation list
  await clickOnElement(device1, "Navigate up");
  // Select conversation in list with User B
  await longPressConversation(device1, userB.userName);
  // Select 'Details' option
  await selectByText(device1, "Long press menu", "Details");
  // Select username to edit
  await clickOnElement(device1, "Edit user nickname");
  // Type in nickname
  const nickName = "New nickname";
  await inputText(device1, "Username", nickName);
  // Click on tick button
  await clickOnElement(device1, "Apply");
  // CLick out of pop up
  await device1.back();
  // Click on conversation to verify nickname is applied
  await selectByText(device1, "Conversation list item", userB.userName);
  // Check name at top of conversation is nickname
  const conversationHeaderNickname = await saveText(device1, "Username");
  expect(conversationHeaderNickname).toBe(nickName);
  // Send a message so nickname is updated in conversation list
  await sendMessage(device1);
  // Navigate out of conversation
  await clickOnElement(device1, "Navigate up");
  // Change nickname back to original username
  // Long press on contact conversation
  await longPressConversation(device1, nickName);
  // Select details
  await selectByText(device1, "Long press menu", "Details");
  // Click on username to edit
  await clickOnElement(device1, "Edit user nickname");
  // Click apply without entering new nickname
  await clickOnElement(device1, "Apply");
  // Click out of pop up
  await device1.back();
  // Enter conversation to verify change
  await selectByText(device1, "Conversation list item", nickName);
  const originalConversationHeaderUsername = await saveText(
    device1,
    "Username"
  );
  expect(originalConversationHeaderUsername).toBe(userB.userName);
  // Send message to change in conversation list
  await sendMessage(device1);
  // Navigate back to list
  await clickOnElement(device1, "Navigate up");
  // Verify name change in list
  // Save text of conversation list item?
  const conversationListUsername = await findMatchingTextAndAccessibilityId(
    device1,
    "Conversation list item",
    userB.userName
  );
  expect(conversationListUsername).toBe(userB.userName);
  // Close app
  await closeApp(server, device1, device2);
}
async function setNicknameIos(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);
  await newContact(device1, userA, device2, userB);
  // Click on settings/more info
  await clickOnElement(device1, "More options");
  // Click on username to set nickname
  await clickOnElement(device1, "Edit user nickname");
  // Type in nickname
  const nickName = "New nickname";
  await inputText(device1, "Username", nickName);
  // Click apply/done
  await clickOnElement(device1, "Apply");
  // Verify change
  const conversationNickname = await saveText(device1, "Username");
  expect(conversationNickname).toBe(nickName);
  // Check it's changed in heading also
  await clickOnElement(device1, "Navigate up");
  const conversationHeaderNickname = await saveText(device1, "Username");
  expect(conversationHeaderNickname).toBe(nickName);
  // Check in conversation list also
  await clickOnElement(device1, "Navigate up");
  // Save text of conversation list item?
  const conversationListUsername = findMatchingTextAndAccessibilityId(
    device1,
    "Conversation list item",
    nickName
  );
  expect(conversationListUsername).toBe(nickName);
  // Set nickname back to original username
  await selectByText(device1, "Conversation list item", nickName);
  // Click on settings/more info
  await clickOnElement(device1, "More options");
  // Click on edit
  await clickOnElement(device1, "Edit user nickname");
  // Click done without typing anything in
  await clickOnElement(device1, "Apply");
  // Verify change in settings page
  const originalUsername = await saveText(device1, "Username");
  expect(originalUsername).toBe(userB.userName);
  // Check in conversation header
  await clickOnElement(device1, "Navigate up");
  const originalConversationHeaderUsername = await saveText(
    device1,
    "Username"
  );
  expect(originalConversationHeaderUsername).toBe(userB.userName);
  // Check in conversation list aswell
  const originalConversationListUsername =
    await findMatchingTextAndAccessibilityId(
      device1,
      "Conversation list item",
      userB.userName
    );
  expect(originalConversationListUsername).toBe(userB.userName);
  // Close app
  await closeApp(server, device1, device2);
}

describe("User actions", () => {
  iosIt("Create contact", createContact);
  androidIt("Create contact", createContact);

  iosIt("Block user in conversation options", blockUserInConversationOptions);
  androidIt(
    "Block user in conversation options",
    blockUserInConversationOptions
  );

  iosIt("Block user in conversation list", blockUserInConversationList);
  androidIt("Block user in conversation list", blockUserInConversationList);

  androidIt("Change username", changeUsername);
  iosIt("Change username", changeUsername);

  androidIt("Change avatar", changeAvatar);
  iosIt("Change avatar", changeAvatar);

  androidIt("Set Nickname Android", setNicknameAndroid);
  iosIt("Set Nickname iOS", setNicknameIos);
});
