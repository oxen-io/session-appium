import { androidIt, iosIt } from "../../types/sessionIt";
import { parseDataImage } from "./utils/check_colour";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils/index";
import { linkedDevice } from "./utils/link_device";
import {
  closeApp,
  createBasicTestEnvironment,
  openAppMultipleDevices,
  openAppOnPlatformSingleDevice,
  openAppThreeDevices,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

async function createContact(platform: SupportedPlatformsType) {
  // first we want to install the app on each device with our custom call to run it

  const testEnv = await createBasicTestEnvironment(platform);
  const [device1, device2, device3] = testEnv.devices;
  const [Alice, Bob] = [testEnv.Alice, testEnv.Bob];

  await device1.navigateBack(platform);
  // Check username has changed from session id on both device 1 and 3
  await Promise.all([
    device1.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Conversation list item",
      text: Bob.userName,
    }),
    device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Conversation list item",
      text: Bob.userName,
    }),
  ]);
  // Check contact is added to contacts list on device 1 and 3 (linked device)
  // await Promise.all([
  //   device1.clickOnElementAll({
  //     strategy: "accessibility id",
  //     selector: "New conversation button",
  //   }),
  //   device3.clickOnElementAll({
  //     strategy: "accessibility id",
  //     selector: "New conversation button",
  //   }),
  // ]);

  // NEED CONTACT ACCESSIBILITY ID TO BE ADDED
  // await Promise.all([
  //   device1.waitForTextElementToBePresent({
  //     strategy: "accessibility id",
  //     selector: "Contacts",
  //   }),
  //   device3.waitForTextElementToBePresent({
  //     strategy: "accessibility id",
  //     selector: "Contacts",
  //   }),
  // ]);

  // Wait for tick
  await testEnv.closeApp();
}
async function blockUserInConversationOptions(
  platform: SupportedPlatformsType
) {
  //Open three devices and creates two contacts (Alice and Bob)
  // Alice has linked device (1 and 3)
  const testEnv = await createBasicTestEnvironment(platform);
  const [device1, device2, device3] = testEnv.devices;
  const [Alice, Bob] = [testEnv.Alice, testEnv.Bob];
  // Block contact
  // Click on three dots (settings)
  await device1.clickOnByAccessibilityID("More options");
  // Select Block option
  await runOnlyOnIOS(platform, () => device1.clickOnByAccessibilityID("Block"));
  // Wait for menu to be clickable (Android)
  await sleepFor(500);
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnTextElementById(`network.loki.messenger:id/title`, "Block")
  );
  // Confirm block option
  await device1.clickOnByAccessibilityID("Confirm block");
  // On ios there is an alert that confirms that the user has been blocked
  await sleepFor(1000);
  // On ios, you need to navigate back to conversation screen to confirm block
  await runOnlyOnIOS(platform, () => device1.navigateBack(platform));
  // Look for alert at top of screen (Bob is blocked. Unblock them?)
  // Check device 1 for blocked status
  const blockedStatus = await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Blocked banner",
  });
  if (blockedStatus) {
    // Check linked device for blocked status (if shown on device1)
    await device3.clickOnElementAll({
      strategy: "accessibility id",
      selector: "Conversation list item",
      text: `Bob.userName`,
    });
    await device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Blocked banner",
    });
    console.warn(`${Bob.userName}` + " has been blocked");
  } else console.warn("Blocked banner not found");
  // Unblock Bob
  // Click on alert to unblock
  await device1.clickOnByAccessibilityID("Blocked banner");
  // on ios there is a confirm unblock alert, need to click 'unblock'
  await runOnlyOnIOS(platform, () =>
    device1.clickOnByAccessibilityID("Unblock")
  );
  console.warn(`${Bob.userName}} has been unblocked`);
  // Look for alert (shouldn't be there)
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Blocked banner",
  });
  // Has capabilities returned to blocked user (can they send message)
  const hasUserBeenUnblockedMessage = await device2.sendMessage(
    "Hey, am I unblocked?"
  );
  // Check in device 1 and device 3 for message
  await Promise.all([
    device1.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: hasUserBeenUnblockedMessage,
    }),
    device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: hasUserBeenUnblockedMessage,
    }),
  ]);

  // Close app
  await testEnv.closeApp();
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
    device1.clickOnByAccessibilityID("Navigate up")
  );
  await runOnlyOnIOS(platform, () => device1.clickOnByAccessibilityID("Back"));
  // on ios swipe left on conversation
  await runOnlyOnAndroid(platform, () =>
    device1.longPressConversation(userB.userName)
  );
  await runOnlyOnIOS(platform, () =>
    device1.swipeLeft("Conversation list item", userB.userName)
  );
  await device1.clickOnByAccessibilityID("Block");
  await closeApp(device1, device2);
}

async function changeUsername(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  const userA = await newUser(device, "Alice", platform);
  const newUsername = "Alice in chains";
  // click on settings/profile avatar
  await device.clickOnByAccessibilityID("User settings");
  // select username
  await device.clickOnByAccessibilityID("Username");
  // type in new username
  await sleepFor(100);
  await device.deleteText("Username");
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
  } else {
    console.log("Username is not found`");
  }
  // select tick
  if (platform === "android") {
    device.clickOnByAccessibilityID("Apply");
  } else {
    device.clickOnByAccessibilityID("Done");
  }
  // verify new username

  await closeApp(device);
}
// TO FIX (WRONG USER FLOW?)
async function changeProfilePictureAndroid(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const spongebobsBirthday = "199905010700.00";
  const pixelHexColour = "cbfeff";
  // Create new user
  await newUser(device, "Alice", platform);
  // Click on settings/avatar
  await device.clickOnByAccessibilityID("User settings");
  // Click on Profile picture
  await device.clickOnByAccessibilityID("User settings");
  // Click on Photo library
  await device.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Upload",
  });
  await device.clickOnElementById(
    "com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );
  await sleepFor(1000);
  await device.clickOnElementAll({
    strategy: "id",
    selector: "android:id/text1",
    text: "Media",
  });
  await sleepFor(500);
  // TO FIX COULDNT FIND MORE OPTIONS
  await device.clickOnElementAll({
    strategy: "accessibility id",
    selector: "More options",
  });
  await device.clickOnElementAll({
    strategy: "xpath",
    selector: `/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout`,
  });
  // Select file
  const profilePicture = await device.doesElementExist({
    strategy: "accessibility id",
    selector: `profile_picture.jpg, 27.75 kB, May 2, 1999`,
    maxWait: 5000,
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
  await device.clickOnElementAll({
    strategy: "accessibility id",
    selector: "profile_picture.jpg, 27.75 kB, May 2, 1999",
  });
  await device.clickOnElementById(
    "network.loki.messenger:id/crop_image_menu_crop"
  );
  const el = await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "User settings",
    maxWait: 10000,
  });
  const base64 = await device.getElementScreenshot(el.ELEMENT);
  const pixelColor = await parseDataImage(base64);
  console.log("RGB Value of pixel is:", pixelColor);
  if (pixelColor === pixelHexColour) {
    console.log("Colour is correct on device 1");
  } else {
    console.log("Colour isn't cbfeff, it is: ", pixelColor);
  }
  await closeApp(device);
}

async function changeProfilePictureiOS(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const spongebobsBirthday = "199805010700.00";
  // Create new user
  await newUser(device, "Alice", platform);
  // Click on settings/avatar
  await device.clickOnByAccessibilityID("User settings");
  await sleepFor(100);
  await device.clickOnByAccessibilityID("Profile picture");
  // await device.clickOnByAccessibilityID("Photo library");
  await device.clickOnByAccessibilityID("Image picker");
  const permissions = await device.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Full Access",
    maxWait: 1000,
  });
  if (permissions) {
    try {
      await device.clickOnByAccessibilityID("Allow Full Access");
    } catch (e) {
      console.log("No permissions dialog");
    }
  }
  const profilePicture = await device.doesElementExist({
    strategy: "accessibility id",
    selector: `Photo, 01 May 1998, 7:00 am`,
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
  await device.clickOnByAccessibilityID(`Photo, 01 May 1998, 7:00 am`);
  await device.clickOnByAccessibilityID("Done");

  await device.clickOnByAccessibilityID("Save");
  // Take screenshot
  const el = await device.waitForTextElementToBePresent({
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
// TO FIX (WRONG ACCESSIBILITY ID ON CONVERSATION HEADER)
async function setNicknameAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const nickName = "New nickname";
  await newContact(platform, device1, userA, device2, userB);
  // Go back to conversation list
  await device1.navigateBack(platform);
  // Select conversation in list with Bob
  await device1.longPressConversation(userB.userName);
  // Select 'Details' option
  await device1.clickOnByAccessibilityID("Details");
  // Select username to edit
  await device1.clickOnByAccessibilityID("Edit user nickname");
  // Type in nickname
  await device1.inputText("accessibility id", "Username", nickName);
  // Click on tick button
  await device1.clickOnByAccessibilityID("Apply");
  // CLick out of pop up
  await device1.clickOnByAccessibilityID("Message user");
  // Check name at top of conversation is nickname
  const headerElement = await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation header name",
  });
  await device1.getTextFromElement(headerElement);
  // Send a message so nickname is updated in conversation list
  await device1.sendMessage("Howdy");
  // Navigate out of conversation
  await device1.navigateBack(platform);
  // Change nickname back to original username
  // Long press on contact conversation
  await device1.longPressConversation(nickName);
  // Select details
  await device1.clickOnByAccessibilityID("Details");
  // Click on username to edit
  await device1.clickOnByAccessibilityID("Edit user nickname");
  // Click apply without entering new nickname
  await device1.clickOnByAccessibilityID("Apply");
  // Click out of pop up
  await device1.back();
  // Enter conversation to verify change
  await device1.selectByText("Conversation list item", nickName);
  const changedElement = await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation header name",
  });
  const headerUsername = await device1.getTextFromElement(changedElement);
  if (headerUsername === nickName) {
    console.log("Nickname has been changed in header correctly");
  }
  // Send message to change in conversation list
  await device1.sendMessage("Howdy");
  // Navigate back to list
  await device1.navigateBack(platform);
  // Verify name change in list
  // Save text of conversation list item?
  await device1.selectByText("Conversation list item", nickName);
  const changedListName = await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation header name",
    text: nickName,
  });
  const listName = await device1.getTextFromElement(changedListName);
  if (listName === nickName) {
    console.log("Nickname has been changed in list correctly");
  }

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
  await device1.clickOnByAccessibilityID("More options");
  // Click on username to set nickname
  await device1.clickOnByAccessibilityID("Username");
  await sleepFor(500);
  await device1.clickOnByAccessibilityID("Username");
  await device1.deleteText("Username");
  // Type in nickname
  await device1.inputText("accessibility id", "Username", nickName);
  // Click apply/done
  await device1.clickOnByAccessibilityID("Done");
  // Check it's changed in heading also
  await device1.navigateBack(platform);
  const newNickname = await device1.grabTextFromAccessibilityId(
    "Conversation header name"
  );
  await device1.findMatchingTextAndAccessibilityId(
    "Conversation header name",
    newNickname
  );
  // Check in conversation list also
  await device1.navigateBack(platform);
  // Save text of conversation list item?
  await sleepFor(1000);
  await device1.findMatchingTextAndAccessibilityId(
    "Conversation list item",
    nickName
  );
  // Set nickname back to original username
  await device1.selectByText("Conversation list item", nickName);
  // Click on settings/more info
  await device1.clickOnByAccessibilityID("More options");
  // Click on edit
  await device1.clickOnByAccessibilityID("Username");
  // Empty username input
  await device1.deleteText("Username");
  await device1.inputText("accessibility id", "Username", " ");
  await await device1.clickOnByAccessibilityID("Done");
  // Check in conversation header
  await device1.navigateBack(platform);
  // await sleepFor(500);
  const revertedNickname = await device1.grabTextFromAccessibilityId(
    "Conversation header name"
  );
  console.warn(`revertedNickname:` + revertedNickname);
  if (revertedNickname !== userB.userName) {
    throw new Error(`revertedNickname doesn't match username`);
  }
  await device1.navigateBack(platform);
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
    selector: "Message body",
    text: testMessage,
  });
  // await device2.clickOnElementAll({
  //   strategy: "accessibility id",
  //   selector: "Message body",
  //   text: testMessage,
  // });
  // Check read status on device 1
  await runOnlyOnAndroid(platform, () =>
    device1.waitForTextElementToBePresent({
      strategy: "id",
      selector: "network.loki.messenger:id/messageStatusTextView",
      text: "Read",
    })
  );
  await runOnlyOnIOS(platform, () =>
    device1.waitForTextElementToBePresent({
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

// Typing indicators working
