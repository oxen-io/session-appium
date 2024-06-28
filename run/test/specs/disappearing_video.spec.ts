import { DISAPPEARING_TIMES, XPATHS } from "../../constants";
import { androidIt, iosIt } from "../../types/sessionIt";
import {
  DMTimeOption,
  DisappearActions,
  InteractionPoints,
} from "../../types/testing";
import { sleepFor, clickOnCoordinates } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";
import { runScriptAndLog } from "./utils/utilities";

iosIt("Disappearing video message 1o1", disappearingVideoMessage1o1Ios);
androidIt("Disappearing video message 1o1", disappearingVideoMessage1o1Android);

async function disappearingVideoMessage1o1Ios(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing disappearing messages for videos";
  const bestDayOfYear = `198809090700.00`;
  const time: DMTimeOption = DISAPPEARING_TIMES.ONE_MINUTE;
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after read option", time],
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
  await sleepFor(60000);
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

async function disappearingVideoMessage1o1Android(
  platform: SupportedPlatformsType
) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const time: DMTimeOption = DISAPPEARING_TIMES.ONE_MINUTE;
  const controlMode: DisappearActions = "sent";
  await newContact(platform, device1, userA, device2, userB);

  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", "Disappear after send option", time],
    device2
  );
  // TODO FIX
  // await device2.disappearingControlMessage(
  //   `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // await device2.disappearingControlMessage(
  //   `You set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // Wait for control messages to disappear before sending image (to check if the control messages are interfering with finding the untrusted attachment message)
  // await sleepFor(60000);
  await device1.sendVideo(platform);
  await device2.clickOnByAccessibilityID("Untrusted attachment message");
  await device2.clickOnByAccessibilityID("Download media");
  // Wait for disappearing message timer to remove video
  await sleepFor(60000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Media message",
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Media message",
    }),
  ]);
  await closeApp(device1, device2);
}
