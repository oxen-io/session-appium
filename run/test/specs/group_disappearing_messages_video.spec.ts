import { androidIt, iosIt } from "../../types/sessionIt";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  closeApp,
  openAppThreeDevices,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";

iosIt("Send disappearing video to group", disappearingVideoMessageGroup);
androidIt("Send disappearing video to group", disappearingVideoMessageGroup);

// bothPlatformsIt(
//   "Send disappearing video to group",
//   disappearingVideoMessageGroup
// );

async function disappearingVideoMessageGroup(platform: SupportedPlatformsType) {
  const testMessage = "Testing disappearing messages for videos";
  // const bestDayOfYear = `198809090700.00`;
  const testGroupName = "Test group";
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
  ]);
  // await device1.navigateBack(platform);
  await device1.sendVideoiOS(testMessage);
  // await device1.clickOnByAccessibilityID("Attachments button");
  // // Select images button/tab
  // // Check if android or ios (android = documents folder/ ios = images folder)
  // await clickOnCoordinates(device1, InteractionPoints.ImagesFolderKeyboardOpen);
  // const permissions = await device1.doesElementExist({
  //   strategy: "accessibility id",
  //   selector: "Allow Full Access",
  //   maxWait: 5000,
  // });
  // if (permissions) {
  //   await device1.clickOnByAccessibilityID("Allow Full Access");
  // } else {
  //   console.log("No permissions");
  // }
  // const settingsPermissions = await device1.doesElementExist({
  //   strategy: "accessibility id",
  //   selector: "Settings",
  //   maxWait: 1000,
  // });
  // if (settingsPermissions) {
  //   await device1.clickOnByAccessibilityID("Photos");
  //   await device1.clickOnByAccessibilityID("All Photos");
  // } else {
  //   console.log("No settings permission dialog");
  // }
  // await device1.clickOnByAccessibilityID("Recents");
  // await sleepFor(2000);
  // // Select video
  // const videoFolder = await device1.doesElementExist({
  //   strategy: "xpath",
  //   selector: XPATHS.VIDEO_TOGGLE,
  //   maxWait: 1000,
  // });
  // if (videoFolder) {
  //   console.log("Videos folder found");
  //   await device1.clickOnByAccessibilityID("Videos");
  //   await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`);
  // } else {
  //   console.log("Videos folder NOT found");
  //   await runScriptAndLog(
  //     `touch -a -m -t ${bestDayOfYear} 'run/test/specs/media/test_video.mp4'`,
  //     true
  //   );
  //   await runScriptAndLog(
  //     `xcrun simctl addmedia ${
  //       process.env.IOS_FIRST_SIMULATOR || ""
  //     } 'run/test/specs/media/test_video.mp4'`,
  //     true
  //   );
  //   await sleepFor(2000);
  //   await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`);
  // }
  // // Send with captions
  // await device1.clickOnByAccessibilityID("Text input box");
  // await device1.inputText("accessibility id", "Text input box", testMessage);
  // await device1.clickOnByAccessibilityID("Send button");
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
