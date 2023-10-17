import { iosIt } from "../../types/sessionIt";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  closeApp,
  openAppThreeDevices,
  openAppTwoDevices,
} from "./utils/open_app";
import { clickOnXAndYCoordinates, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";
import { runScriptAndLog } from "./utils/utilities";

async function disappearingImageMessage1o1(platform: SupportedPlatformsType) {
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
  await device1.sendImage(testMessage);
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnElement("Download media");
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVideoMessage1o1(platform: SupportedPlatformsType) {
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
  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Access to All Photos",
    maxWait: 1000,
  });
  if (permissions) {
    await device1.clickOnElement("Allow Access to All Photos");
  } else {
    console.log("No permissions");
  }
  const settingsPermissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Settings",
    maxWait: 1000,
  });
  if (settingsPermissions) {
    await device1.clickOnElement("Photos");
    await device1.clickOnElement("All Photos");
  } else {
    console.log("No settings permission dialog");
  }
  await device1.clickOnElement("Recents");
  await sleepFor(2000);
  // Select video
  const videoFolder = await device1.doesElementExist({
    strategy: "xpath",
    selector: `//XCUIElementTypeStaticText[@name="Videos"]`,
    maxWait: 1000,
  });
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
    device1.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVoiceMessage1o1(platform: SupportedPlatformsType) {
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
  // await device1.clickOnElement("OK");
  // await device1.pressAndHold("New voice message");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(200);
  await device2.clickOnElement("Download");
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Voice message",
    maxWait: 1000,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Voice message",
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}

async function disappearingGifMessage1o1(platform: SupportedPlatformsType) {
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
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testMessage,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testMessage,
  });
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
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Accept dialog for link preview
  await device1.clickOnElement("Enable");
  // No preview on first send
  await device1.clickOnElement("Send message button");
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnElement("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testLink,
  });
  // Wait for 10 seconds to disappear
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testLink,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testLink,
  });
  await closeApp(device1, device2);
}

async function disappearingCommunityInviteMessage1o1(
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
  await device1.clickOnElementByText({
    strategy: "accessibility id",
    selector: "Contact",
    text: userB.userName,
  });
  await device1.clickOnElement("Done");
  // Check device 2 for invitation from user A
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Community invitation",
    text: communityName,
  });
  // Wait for 10 seconds for message to disappear
  await sleepFor(10000);
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: communityName,
  });
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: communityName,
  });
  await closeApp(device1, device2);
}

async function disappearingCallMessage1o1(platform: SupportedPlatformsType) {
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
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Settings",
  });
  await device1.clickOnElement("Settings");
  // Scroll to bottom of page to voice and video calls
  // Toggle voice settings on
  // Click enable on exposure IP address warning
  await device1.clickOnElement("Allow voice and video calls");
  await device1.clickOnElement("Continue");
  // Navigate back to conversation
  await device1.clickOnElement("Close button");
  // Enable voice calls on device 2 for User B
  await device2.clickOnElement("Call");
  await device2.clickOnElement("Settings");
  await device2.scrollDown();
  await device2.clickOnElement("Allow voice and video calls");
  await device2.clickOnElement("Enable");
  await device2.clickOnElement("Close button");
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
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Control message",
    text: `You called ${userB.userName}`,
    maxWait: 1000,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Control message",
    text: `${userA.userName} called you`,
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}

describe("Disappearing messages checks 1o1", () => {
  iosIt("Disappearing messages image", disappearingImageMessage1o1);
  iosIt("Disappearing messages video", disappearingVideoMessage1o1);
  iosIt("Disappearing messages voice", disappearingVoiceMessage1o1);
  iosIt("Disappearing messages gif", disappearingGifMessage1o1);
  iosIt("Disappearing messages link", disappearingLinkMessage);
  iosIt(
    "Disappearing messages community invite",
    disappearingCommunityInviteMessage1o1
  );
  iosIt("Disappearing messages call history", disappearingCallMessage1o1);
});

async function disappearingImageMessageGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const testMessage = "Testing disappearing messages for images";
  const testGroupName = "Disappearing message group";
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
  await createGroup({
    platform,
    device1,
    userOne: userA,
    device2,
    userTwo: userB,
    device3,
    userThree: userC,
    userName: testGroupName,
  });

  await setDisappearingMessage(device1, [
    "1o1",
    "Disappear after send option",
    "10 seconds",
  ]);
  await device1.navigateBack(platform);
  await device1.sendImage(testMessage);
  await Promise.all([
    device2.clickOnElement("Untrusted attachment message"),
    device3.clickOnElement("Untrusted attachment message"),
  ]);
  await sleepFor(500);
  // User B and user C - Click on 'download'
  await Promise.all([
    device2.clickOnElement("Download media"),
    device3.clickOnElement("Download media"),
  ]);
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device3.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVideoMessageGroup(platform: SupportedPlatformsType) {
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
  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Access to All Photos",
    maxWait: 1000,
  });
  if (permissions) {
    await device1.clickOnElement("Allow Access to All Photos");
  } else {
    console.log("No permissions");
  }
  const settingsPermissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Settings",
    maxWait: 1000,
  });
  if (settingsPermissions) {
    await device1.clickOnElement("Photos");
    await device1.clickOnElement("All Photos");
  } else {
    console.log("No settings permission dialog");
  }
  await device1.clickOnElement("Recents");
  await sleepFor(2000);
  // Select video
  const videoFolder = await device1.doesElementExist({
    strategy: "xpath",
    selector: `//XCUIElementTypeStaticText[@name="Videos"]`,
    maxWait: 1000,
  });
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
    device1.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingVoiceMessageGroup(platform: SupportedPlatformsType) {
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
  // await device1.clickOnElement("OK");
  // await device1.pressAndHold("New voice message");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device2.clickOnElement("Untrusted attachment message");
  await sleepFor(200);
  await device2.clickOnElement("Download");
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Voice message",
    maxWait: 1000,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Voice message",
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}

async function disappearingGifMessageGroup(platform: SupportedPlatformsType) {
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
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testMessage,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testMessage,
  });
  await closeApp(device1, device2);
}

async function disappearingLinkMessageGroup(platform: SupportedPlatformsType) {
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
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Accept dialog for link preview
  await device1.clickOnElement("Enable");
  // No preview on first send
  await device1.clickOnElement("Send message button");
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnElement("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testLink,
  });
  // Wait for 10 seconds to disappear
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testLink,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testLink,
  });
  await closeApp(device1, device2);
}

async function disappearingGroupControlMessage(
  platform: SupportedPlatformsType
) {
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
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Accept dialog for link preview
  await device1.clickOnElement("Enable");
  // No preview on first send
  await device1.clickOnElement("Send message button");
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnElement("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testLink,
  });
  // Wait for 10 seconds to disappear
  await sleepFor(10000);
  await device1.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testLink,
  });
  await device2.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testLink,
  });
  await closeApp(device1, device2);
}

describe("Disappearing messages checks groups", () => {
  iosIt("Disappearing messages image group", disappearingImageMessageGroup);
  iosIt("Disappearing messages video group", disappearingVideoMessageGroup);
  iosIt("Disappearing messages voice group", disappearingVoiceMessageGroup);
  iosIt("Disappearing messages gif group", disappearingGifMessageGroup);
  iosIt("Disappearing messages link group", disappearingLinkMessageGroup);
  iosIt(
    "Disappearing messages group control messages",
    disappearingGroupControlMessage
  );
});
