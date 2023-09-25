import { iosIt } from "../../types/sessionIt";
import { clickOnXAndYCoordinates, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  closeApp,
  openAppTwoDevices,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";
import { runScriptAndLog } from "./utils/utilities";

async function disappearingImageMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = "Testing disappearing messages for images";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  await device1.sendImageIos(testMessage);
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeletedNew(
      "accessibility id",
      "Message body",
      1000,
      testMessage
    ),
    device2.hasElementBeenDeletedNew(
      "accessibility id",
      "Message body",
      1000,
      testMessage
    ),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVideoMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing disappearing messages for videos";
  const bestDayOfYear = `198809090700.00`;
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  await device1.clickOnElement("Attachments button");
  // Select images button/tab
  await sleepFor(100);
  // Check if android or ios (android = documents folder/ ios = images folder)
  await clickOnXAndYCoordinates(device1, 38, 767);
  await sleepFor(1000);
  const permissions = await device1.doesElementExist(
    "accessibility id",
    "Allow Access to All Photos",
    1000
  );
  if (permissions) {
    await device1.clickOnElement("Allow Access to All Photos");
  } else {
    console.log("No permissions");
  }
  const settingsPermissions = await device1.doesElementExist(
    "accessibility id",
    "Settings",
    1000
  );
  if (settingsPermissions) {
    await device1.clickOnElement("Photos");
    await device1.clickOnElement("All Photos");
  } else {
    console.log("No settings permission dialog");
  }
  await device1.clickOnElement("Recents");
  await sleepFor(2000);
  // Select video
  const videoFolder = await device1.doesElementExist(
    "xpath",
    `//XCUIElementTypeStaticText[@name="Videos"]`,
    1000
  );
  if (videoFolder) {
    console.log("Videos folder found");
    await device1.clickOnElement("Videos");
    await device1.clickOnElement(`1988-09-08 21:00:00 +0000`);
  } else {
    console.log("Videos folder NOT found");
    await runScriptAndLog(
      `touch -a -m -t ${bestDayOfYear} 'run/test/specs/media/test_video.mp4'`,
      true
    );
    await runScriptAndLog(
      `xcrun simctl addmedia ${
        process.env.IOS_FIRST_SIMULATOR || ""
      } 'run/test/specs/media/test_video.mp4'`,
      true
    );
    await sleepFor(2000);
    await device1.clickOnElement(`1988-09-08 21:00:00 +0000`);
  }
  // Send with captions
  await device1.clickOnElement("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnElement("Send button");
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeletedNew(
      "accessibility id",
      "Message body",
      1000,
      testMessage
    ),
    device2.hasElementBeenDeletedNew(
      "accessibility id",
      "Message body",
      1000,
      testMessage
    ),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVoiceMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  await device1.longPress("New voice message");
  await device1.clickOnElement("OK");
  await device1.pressAndHold("New voice message");
  await device1.waitForTextElementToBePresent(
    "accessibility id",
    "Voice message"
  );
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(200);
  await device2.clickOnElement("Download");
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew("accessibility id", "Voice message");
  await device2.hasElementBeenDeletedNew("accessibility id", "Voice message");
  await closeApp(device1, device2);
}

async function disappearingGifMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = "Testing disappearing messages for GIF's";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  // Click on attachments button
  await device1.clickOnElement("Attachments button");
  // Select GIF tab
  await clickOnXAndYCoordinates(device1, 36, 663);
  // Select gif
  await sleepFor(500);
  // Need to select Continue on GIF warning
  await device1.clickOnElement("Continue");
  await device1.clickOnElementXPath(
    `(//XCUIElementTypeImage[@name="gif cell"])[1]`
  );
  await device1.clickOnElement("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnElement("Send button");
  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(100);
  // Click on 'download'
  await device2.clickOnElement("Download media");
  // Wait for 10 seconds
  await sleepFor(10000);
  // Check if GIF has been deleted on both devices
  await device1.hasElementBeenDeletedNew(
    "accessibility id",
    "Message body",
    1000,
    testMessage
  );
  await device2.hasElementBeenDeletedNew(
    "accessibility id",
    "Message body",
    1000,
    testMessage
  );
  await closeApp(device1, device2);
}

async function disappearingLinkMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testLink = `https://nerdlegame.com/`;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  // Send a link
  await device1.inputText("accessibility id", "Message input box", testLink);
  await device1.waitForTextElementToBePresent(
    "accessibility id",
    "Message sent status: Sent",
    undefined,
    20000
  );
  // Accept dialog for link preview
  await device1.clickOnElement("Enable");
  // No preview on first send
  await device1.clickOnElement("Send message button");
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnElement("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent(
    "accessibility id",
    "Message body",
    testLink
  );
  // Wait for 10 seconds to disappear
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew(
    "accessibility id",
    "Message body",
    1000,
    testLink
  );
  await device2.hasElementBeenDeletedNew(
    "accessibility id",
    "Message body",
    1000,
    testLink
  );
  await closeApp(device1, device2);
}

async function disappearingCommunityInviteMessage(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const communityLink = `https://chat.lokinet.dev/testing-all-the-things?public_key=1d7e7f92b1ed3643855c98ecac02fc7274033a3467653f047d6e433540c03f17`;
  const communityName = "Testing All The Things!";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  await device1.navigateBack(platform);
  await device1.clickOnElement("New conversation button");
  await device1.clickOnElement("Join Community");
  await device1.inputText(
    "accessibility id",
    "Enter Community URL",
    communityLink
  );
  await device1.clickOnElement("Join");
  // Wait for community to load
  await sleepFor(1000);

  await device1.clickOnElement("More options");
  await device1.clickOnElement("Add Members");
  await device1.clickOnElementByText(
    "accessibility id",
    "Contact",
    userB.userName
  );
  await device1.clickOnElement("Done");
  // Check device 2 for invitation from user A
  await device2.waitForTextElementToBePresent(
    "accessibility id",
    "Community invitation",
    communityName
  );
  // Wait for 10 seconds for message to disappear
  await sleepFor(10000);
  await device2.hasElementBeenDeletedNew(
    "accessibility id",
    "Community invitation",
    undefined,
    communityName
  );
  await device1.hasElementBeenDeletedNew(
    "accessibility id",
    "Community invitation",
    undefined,
    communityName
  );
  await closeApp(device1, device2);
}

async function disappearingCallMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  await device1.clickOnElement("Call");
  // Enabled voice calls in privacy settings
  await device1.waitForTextElementToBePresent("accessibility id", "Settings");
  await device1.clickOnElement("Settings");
  // Scroll to bottom of page to voice and video calls
  // Toggle voice settings on
  // Click enable on exposure IP address warning
  await device1.clickOnElement("Allow voice and video calls");
  await device1.clickOnElement("Continue");
  // Navigate back to conversation
  await device1.clickOnElement("Close Button");
  // Enable voice calls on device 2 for User B
  await device2.clickOnElement("Call");
  await device2.clickOnElement("Settings");
  await device2.scrollDown();
  await device2.clickOnElement("Allow voice and video calls");
  await device2.clickOnElement("Enable");
  await device2.clickOnElement("Close Button");
  // Make call on device 1 (userA)
  await device1.clickOnElement("Call");
  // Answer call on device 2
  await device2.clickOnElement("Answer call");
  // Wait 10 seconds
  // Hang up
  await device1.clickOnElement("End call");
  // Check for config message 'Called User B' on device 1
  await device1.findConfigurationMessage(`You called ${userB.userName}`);
  await device1.findConfigurationMessage(`${userA.userName} called you`);
  // Wait 10 seconds for control message to be deleted
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew(
    "accessibility id",
    "Control message",
    undefined,
    `You called ${userB.userName}`
  );
  await device2.hasElementBeenDeletedNew(
    "accessibility id",
    "Control message",
    undefined,
    `${userA.userName} called you`
  );
  await closeApp(device1, device2);
}

describe("Disappearing messages checks", () => {
  iosIt("Disappearing messages image", disappearingImageMessage);
  iosIt("Disappearing messages video", disappearingVideoMessage);
  iosIt("Disappearing messages voice", disappearingVoiceMessage);
  iosIt("Disappearing messages gif", disappearingGifMessage);
  iosIt("Disappearing messages link", disappearingLinkMessage);
  iosIt(
    "Disappearing messages community invite",
    disappearingCommunityInviteMessage
  );
  iosIt("Disappearing messages call history", disappearingCallMessage);
});
