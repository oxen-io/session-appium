import { DISAPPEARING_TIMES, XPATHS } from "../../constants";
import { iosIt } from "../../types/sessionIt";
import {
  DMTimeOption,
  GroupName,
  InteractionPoints,
} from "../../types/testing";
import { clickOnCoordinates, sleepFor } from "./utils";

import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { createGroup } from "./utils/create_group";
import {
  closeApp,
  openAppThreeDevices,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";
import { runScriptAndLog } from "./utils/utilities";

async function disappearingImageMessage1o1(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = "Testing disappearing messages for images";
  const ronSwansonBirthday = "196705060700.00";
  const time = DISAPPEARING_TIMES.TEN_SECONDS;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // await device1.navigateBack(platform);

  await sleepFor(500);
  // await device1.sendImage(platform, testMessage);
  await device1.clickOnByAccessibilityID("Attachments button");
  await sleepFor(5000);
  await clickOnCoordinates(
    device1,
    InteractionPoints.ImagesFolderKeyboardClosed
  );
  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Full Access",
    maxWait: 1000,
  });
  if (permissions) {
    try {
      await device1.clickOnByAccessibilityID(`Allow Full Access`);
      // Select video
    } catch (e) {
      console.log("No permissions dialog");
    }
  } else {
    console.log("No permissions dialog");
  }
  const testImage = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: `1967-05-05 21:00:00 +0000`,
    maxWait: 2000,
  });
  if (!testImage) {
    await runScriptAndLog(
      `touch -a -m -t ${ronSwansonBirthday} 'run/test/specs/media/test_image.jpg'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${
        process.env.IOS_FIRST_SIMULATOR || ""
      } 'run/test/specs/media/test_image.jpg'`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnByAccessibilityID(`1967-05-05 21:00:00 +0000`);
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: `Message sent status: Sent`,
    maxWait: 50000,
  });
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  // User B - Click on 'download'
  await device2.clickOnByAccessibilityID("Download media", 5000);
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
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
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // await device1.navigateBack(platform);
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select images button/tab
  await sleepFor(5000);
  await clickOnCoordinates(
    device1,
    InteractionPoints.ImagesFolderKeyboardClosed
  );
  await sleepFor(100);
  // Check if android or ios (android = documents folder/ ios = images folder)

  await clickOnCoordinates(device1, InteractionPoints.ImagesFolderKeyboardOpen);
  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Full Access",
    maxWait: 5000,
  });
  if (permissions) {
    await device1.clickOnByAccessibilityID("Allow Full Access");
  } else {
    console.log("No permissions");
  }
  const settingsPermissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Settings",
    maxWait: 1000,
  });
  if (settingsPermissions) {
    await device1.clickOnByAccessibilityID("Photos");
    await device1.clickOnByAccessibilityID("All Photos");
  } else {
    console.log("No settings permission dialog");
  }
  await device1.clickOnByAccessibilityID("Recents");
  // Select video
  const videoFolder = await device1.doesElementExist({
    strategy: "xpath",
    selector: XPATHS.VIDEO_TOGGLE,
    maxWait: 5000,
  });
  if (videoFolder) {
    console.log("Videos folder found");
    await device1.clickOnByAccessibilityID("Videos");
    await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`);
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
    await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`, 5000);
  }
  // Send with captions
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
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
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // await device1.navigateBack(platform);
  await device1.longPress("New voice message");
  await device1.clickOnByAccessibilityID("Allow");
  await sleepFor(500);
  await device1.pressAndHold("New voice message");
  // await device1.clickOnByAccessibilityID("OK");
  // await device1.pressAndHold("New voice message");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device2.clickOnByAccessibilityID("Untrusted attachment message", 5000);
  await device2.clickOnByAccessibilityID("Download", 5000);
  await sleepFor(10000);
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Voice message",
    maxWait: 1000,
  });
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Voice message",
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}

async function disappearingGifMessage1o1(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const testMessage = "Testing disappearing messages for GIF's";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // await device1.navigateBack(platform);

  // Click on attachments button
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab
  await clickOnCoordinates(device1, InteractionPoints.GifButtonKeyboardClosed);
  // Select gif
  await sleepFor(500);
  // Need to select Continue on GIF warning
  await device1.clickOnByAccessibilityID("Continue");
  await device1.clickOnElementAll({
    strategy: "xpath",
    selector: XPATHS.FIRST_GIF,
  });
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  await sleepFor(100);
  // Click on 'download'
  await device2.clickOnByAccessibilityID("Download media");
  // Wait for 10 seconds
  await sleepFor(10000);
  // Check if GIF has been deleted on both devices
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testMessage,
  });
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testMessage,
  });
  await closeApp(device1, device2);
}

async function disappearingLinkMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const testLink = `https://type-level-typescript.com/objects-and-records`;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // await device1.navigateBack(platform);

  // Send a link
  await device1.inputText("accessibility id", "Message input box", testLink);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Accept dialog for link preview
  await device1.clickOnByAccessibilityID("Enable");
  // No preview on first send
  await device1.clickOnByAccessibilityID("Send message button");
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnByAccessibilityID("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testLink,
  });
  // Wait for 10 seconds to disappear
  await sleepFor(10000);
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: testLink,
  });
  await device2.hasElementBeenDeleted({
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
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const communityLink = `https://chat.lokinet.dev/testing-all-the-things?public_key=1d7e7f92b1ed3643855c98ecac02fc7274033a3467653f047d6e433540c03f17`;
  const communityName = "Testing All The Things!";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // await device1.navigateBack(platform);
  // await device1.navigateBack(platform);
  await device1.clickOnByAccessibilityID("New conversation button");
  await device1.clickOnByAccessibilityID("Join community option");
  await device1.inputText(
    "accessibility id",
    "Enter Community URL",
    communityLink
  );
  await device1.clickOnByAccessibilityID("Join");
  await device1.clickOnByAccessibilityID("More options");
  await device1.clickOnByAccessibilityID("Add Members");
  await device1.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Contact",
    text: userB.userName,
  });
  await device1.clickOnByAccessibilityID("Done");
  // Check device 2 for invitation from user A
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Community invitation",
    text: communityName,
  });
  // Wait for 10 seconds for message to disappear
  await sleepFor(10000);
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: communityName,
  });
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    maxWait: 1000,
    text: communityName,
  });
  await closeApp(device1, device2);
}

async function disappearingCallMessage1o1(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // await device1.navigateBack(platform);
  await device1.clickOnByAccessibilityID("Call");
  // Enabled voice calls in privacy settings
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Settings",
  });
  await device1.clickOnByAccessibilityID("Settings");
  // Scroll to bottom of page to voice and video calls
  // Toggle voice settings on
  // Click enable on exposure IP address warning
  await device1.clickOnByAccessibilityID("Allow voice and video calls");
  await device1.clickOnByAccessibilityID("Continue");
  // Navigate back to conversation
  await sleepFor(500);
  await device1.clickOnByAccessibilityID("Close button");
  // Enable voice calls on device 2 for User B
  await device2.clickOnByAccessibilityID("Call");
  await device2.clickOnByAccessibilityID("Settings");
  await device2.scrollDown();
  await device2.clickOnByAccessibilityID("Allow voice and video calls");
  await device2.clickOnByAccessibilityID("Enable");
  await sleepFor(500);
  await device2.clickOnByAccessibilityID("Close button");
  // Make call on device 1 (userA)
  await device1.clickOnByAccessibilityID("Call");
  // Answer call on device 2
  await device2.clickOnByAccessibilityID("Answer call");
  // Wait 10 seconds
  // Hang up
  await device1.clickOnByAccessibilityID("End call button");
  // Check for config message 'Called User B' on device 1
  await device1.waitForControlMessageToBePresent(
    `You called ${userB.userName}`
  );
  await device1.waitForControlMessageToBePresent(
    `${userA.userName} called you`
  );
  // Wait 10 seconds for control message to be deleted
  await sleepFor(10000);
  await device1.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Control message",
    text: `You called ${userB.userName}`,
    maxWait: 1000,
  });
  await device2.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Control message",
    text: `${userA.userName} called you`,
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}

// GROUP DISAPPEARING MESSAGE CHECKS

async function disappearingImageMessageGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const testMessage = "Testing disappearing messages for images";
  const testGroupName = "Test group";
  const ronSwansonBirthday = "196705060700.00";
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
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

  await setDisappearingMessage(platform, device1, [
    "Group",
    "Disappear after send option",
    time,
  ]);
  // await device1.navigateBack(platform);
  // await device1.sendImage(platform, testMessage);
  await device1.clickOnByAccessibilityID("Attachments button");
  await sleepFor(5000);
  await clickOnCoordinates(
    device1,
    InteractionPoints.ImagesFolderKeyboardClosed
  );

  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Full Access",
    maxWait: 1000,
  });
  if (permissions) {
    try {
      await device1.clickOnByAccessibilityID(`Allow Full Access`);
      // Select video
    } catch (e) {
      console.log("No permissions dialog");
    }
  } else {
    console.log("No permissions dialog");
  }
  const testImage = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: `1967-05-05 21:00:00 +0000`,
    maxWait: 2000,
  });
  if (!testImage) {
    await runScriptAndLog(
      `touch -a -m -t ${ronSwansonBirthday} 'run/test/specs/media/test_image.jpg'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${
        process.env.IOS_FIRST_SIMULATOR || ""
      } 'run/test/specs/media/test_image.jpg'`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnByAccessibilityID(`1967-05-05 21:00:00 +0000`);
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: `Message sent status: Sent`,
    maxWait: 50000,
  });
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device3.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2, device3);
}

async function disappearingVideoMessageGroup(platform: SupportedPlatformsType) {
  const testMessage = "Testing disappearing messages for videos";
  const bestDayOfYear = `198809090700.00`;
  const testGroupName = "Test group";
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
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
  await setDisappearingMessage(platform, device1, [
    "Group",
    "Disappear after send option",
    time,
  ]);
  // await device1.navigateBack(platform);
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select images button/tab
  // Check if android or ios (android = documents folder/ ios = images folder)
  await clickOnCoordinates(device1, InteractionPoints.ImagesFolderKeyboardOpen);
  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Full Access",
    maxWait: 5000,
  });
  if (permissions) {
    await device1.clickOnByAccessibilityID("Allow Full Access");
  } else {
    console.log("No permissions");
  }
  const settingsPermissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Settings",
    maxWait: 1000,
  });
  if (settingsPermissions) {
    await device1.clickOnByAccessibilityID("Photos");
    await device1.clickOnByAccessibilityID("All Photos");
  } else {
    console.log("No settings permission dialog");
  }
  await device1.clickOnByAccessibilityID("Recents");
  await sleepFor(2000);
  // Select video
  const videoFolder = await device1.doesElementExist({
    strategy: "xpath",
    selector: XPATHS.VIDEO_TOGGLE,
    maxWait: 1000,
  });
  if (videoFolder) {
    console.log("Videos folder found");
    await device1.clickOnByAccessibilityID("Videos");
    await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`);
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
    await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`);
  }
  // Send with captions
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device3.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2, device3);
}

async function disappearingVoiceMessageGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const testGroupName: GroupName =
    "Testing voice messages in groups for disappearing messages";
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
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
  await setDisappearingMessage(platform, device1, [
    "Group",
    "Disappear after send option",
    time,
  ]);
  // await device1.navigateBack(platform);
  await device1.longPress("New voice message");
  // await device1.clickOnByAccessibilityID("OK");
  // await device1.pressAndHold("New voice message");
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Voice message",
      maxWait: 1000,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Voice message",
      maxWait: 1000,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Voice message",
      maxWait: 1000,
    }),
  ]);
  await closeApp(device1, device2, device3);
}

async function disappearingGifMessageGroup(platform: SupportedPlatformsType) {
  const testGroupName = "Disappear after sent test";
  const testMessage = "Testing disappearing messages for GIF's";
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
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
  await setDisappearingMessage(platform, device1, [
    "Group",
    "Disappear after send option",
    time,
  ]);
  // await device1.navigateBack(platform);
  // Click on attachments button
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab
  await clickOnCoordinates(device1, InteractionPoints.GifButtonKeyboardClosed);
  // Need to select Continue on GIF warning
  await device1.clickOnByAccessibilityID("Continue", 5000);
  await device1.clickOnElementAll({
    strategy: "xpath",
    selector: XPATHS.FIRST_GIF,
  });
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  // Wait for 10 seconds
  await sleepFor(10000);
  // Check if GIF has been deleted on both devices
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
    device3.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2, device3);
}

async function disappearingLinkMessageGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const testGroupName = "Test group";
  const testLink = `https://type-level-typescript.com/objects-and-records`;
  const time: DMTimeOption = DISAPPEARING_TIMES.TEN_SECONDS;
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
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
  await setDisappearingMessage(platform, device1, [
    "Group",
    "Disappear after send option",
    time,
  ]);
  // await device1.navigateBack(platform);
  // Send a link
  await device1.inputText("accessibility id", "Message input box", testLink);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message sent status: Sent",
    maxWait: 20000,
  });
  // Accept dialog for link preview
  await device1.clickOnByAccessibilityID("Enable");
  // No preview on first send
  await device1.clickOnByAccessibilityID("Send message button");
  // Send again for image
  await device1.inputText("accessibility id", "Message input box", testLink);
  await sleepFor(100);
  await device1.clickOnByAccessibilityID("Send message button");
  // Make sure image preview is available in device 2
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testLink,
  });
  // Wait for 10 seconds to disappear
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testLink,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testLink,
    }),
    device3.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      maxWait: 1000,
      text: testLink,
    }),
  ]);
  await closeApp(device1, device2, device3);
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
describe("Disappearing messages checks groups", () => {
  iosIt("Disappearing messages image group", disappearingImageMessageGroup);
  iosIt("Disappearing messages video group", disappearingVideoMessageGroup);
  iosIt("Disappearing messages voice group", disappearingVoiceMessageGroup);
  iosIt("Disappearing messages gif group", disappearingGifMessageGroup);
  iosIt("Disappearing messages link group", disappearingLinkMessageGroup);
});
