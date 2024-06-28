import { XPATHS } from "../../constants";
import { androidIt, bothPlatformsIt, iosIt } from "../../types/sessionIt";
import { InteractionPoints } from "../../types/testing";
import { sleepFor, clickOnCoordinates } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  openAppThreeDevices,
  closeApp,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

iosIt("Send video to group", sendVideoGroupiOS);
androidIt("Send video to group", sendVideoGroupAndroid);

async function sendVideoGroupiOS(platform: SupportedPlatformsType) {
  const testGroupName = "Message checks for groups";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);

  // Create contact between User A and User B
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
  const bestDayOfYear = `198809090700.00`;
  const testMessage = "Testing-video-1";
  const replyMessage = `Replying to video from ${userA.userName} in ${testGroupName}`;
  await device1.clickOnByAccessibilityID("Attachments button");
  await sleepFor(100);
  await clickOnCoordinates(device1, InteractionPoints.ImagesFolderKeyboardOpen);
  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Full Access",
    maxWait: 1000,
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
    await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`, 5000);
  }
  // Send with attached message
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
  });
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
  });
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
    maxWait: 5000,
  });
  await device2.longPressMessage(testMessage);
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  // Close server and devices
  await closeApp(device1, device2, device3);
}

async function sendVideoGroupAndroid(platform: SupportedPlatformsType) {
  // Test sending a video
  // open devices
  const testGroupName = "Message checks for groups";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
  // Create contact between User A and User B
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
  const replyMessage = `Replying to video from ${userA.userName} in ${testGroupName}`;
  // Click on attachments button
  await device1.sendVideo(platform);
  // Check video appears in device 2 and device 3
  // (wait for loading animation to disappear and play icon to appear)
  // Device 2
  await Promise.all([
    device2.waitForLoadingAnimation(),
    device2.waitForTextElementToBePresent({
      strategy: "id",
      selector: "network.loki.messenger:id/play_overlay",
      maxWait: 8000,
    }),
  ]);
  // Device 3
  await Promise.all([
    device3.waitForLoadingAnimation(),
    device3.waitForTextElementToBePresent({
      strategy: "id",
      selector: "network.loki.messenger:id/play_overlay",
      maxWait: 8000,
    }),
  ]);
  // Reply to message on device 2
  await device2.longPress("Media message");
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  // Check reply appears in device 1 and device 3
  await Promise.all([
    device1.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: replyMessage,
    }),
    device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: replyMessage,
    }),
  ]);
  // Close app and server
  await closeApp(device1, device2, device3);
}
