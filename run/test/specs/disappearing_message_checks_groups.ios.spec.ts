import { DISAPPEARING_TIMES, XPATHS } from "../../constants";
import { iosIt } from "../../types/sessionIt";
import {
  DMTimeOption,
  GroupName,
  InteractionPoints,
} from "../../types/testing";
import { clickOnCoordinates, sleepFor } from "./utils";

import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  closeApp,
  openAppThreeDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";
import { runScriptAndLog } from "./utils/utilities";

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
describe("Disappearing messages checks groups ios", () => {
  iosIt("Disappearing messages image group", disappearingImageMessageGroup);
  iosIt("Disappearing messages video group", disappearingVideoMessageGroup);
  iosIt("Disappearing messages voice group", disappearingVoiceMessageGroup);
  iosIt("Disappearing messages gif group", disappearingGifMessageGroup);
  iosIt("Disappearing messages link group", disappearingLinkMessageGroup);
});
