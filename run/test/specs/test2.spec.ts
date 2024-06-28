import { XPATHS } from "../../constants";
import { iosIt } from "../../types/sessionIt";
import { InteractionPoints } from "../../types/testing";
import { clickOnCoordinates, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  closeApp,
  openAppMultipleDevices,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

describe("Test 2", () => {
  iosIt(
    "Test Group 2 - Message checks ios - Send image",
    async function sendImage(platform: SupportedPlatformsType) {
      const workerId = parseInt(process.env.MOCHA_WORKER_ID || "0", 10);
      const [device1, device2] = await openAppMultipleDevices(
        platform,
        2,
        workerId
      );
      const [userA, userB] = await Promise.all([
        newUser(device1, "Alice", platform),
        newUser(device2, "Bob", platform),
      ]);
      const testMessage = "Ron Swanson doesn't like birthdays";
      await newContact(platform, device1, userA, device2, userB);
      await device1.sendImage(platform, testMessage);
      await device2.clickOnByAccessibilityID("Untrusted attachment message");
      await sleepFor(500);
      // User B - Click on 'download'
      await device2.clickOnByAccessibilityID("Download media");
      // Reply to message
      await device2.waitForTextElementToBePresent({
        strategy: "accessibility id",
        selector: "Message body",
        text: testMessage,
      });
      const replyMessage = await device2.replyToMessage(userA, testMessage);
      await device1.waitForTextElementToBePresent({
        strategy: "accessibility id",
        selector: "Message body",
        text: replyMessage,
      });
      // Close app and server
      await closeApp(device1, device2);
    }
  );
  iosIt(
    "Test Group 2 - Message checks ios - Send video",
    async function sendVideo(platform: SupportedPlatformsType) {
      // Test sending a video
      // open devices
      const workerId = parseInt(process.env.MOCHA_WORKER_ID || "0", 10);
      const [device1, device2] = await openAppMultipleDevices(
        platform,
        2,
        workerId
      );
      // create user a and user b
      const [userA, userB] = await Promise.all([
        newUser(device1, "Alice", platform),
        newUser(device2, "Bob", platform),
      ]);
      const bestDayOfYear = `198809090700.00`;
      const testMessage = "Testing-video-1";
      // create contact
      await newContact(platform, device1, userA, device2, userB);
      // Push image to device for selection
      // Click on attachments button
      await device1.clickOnByAccessibilityID("Attachments button");
      // Select images button/tab
      await sleepFor(1000);
      await clickOnCoordinates(
        device1,
        InteractionPoints.ImagesFolderKeyboardOpen
      );
      // Select 'continue' on alert
      // Need to put a video on device
      // Session would like to access your photos
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
        await device1.clickOnByAccessibilityID("Add", 5000);
        await device1.clickOnByAccessibilityID(`1988-09-08 21:00:00 +0000`);
      }
      // Send with captions
      await device1.clickOnByAccessibilityID("Text input box");
      await device1.inputText(
        "accessibility id",
        "Text input box",
        testMessage
      );
      await device1.clickOnByAccessibilityID("Send button");
      // Check if the 'Tap to download media' config appears
      // User B - Click on untrusted attachment message
      await device2.clickOnByAccessibilityID(
        "Untrusted attachment message",
        15000
      );
      // User B - Click on 'download'
      await device2.clickOnByAccessibilityID("Download media", 5000);
      // Reply to message
      await device2.waitForTextElementToBePresent({
        strategy: "accessibility id",
        selector: "Message body",
        text: testMessage,
      });
      const replyMessage = await device2.replyToMessage(userA, testMessage);
      await device1.waitForTextElementToBePresent({
        strategy: "accessibility id",
        selector: "Message body",
        text: replyMessage,
      });
      // Close app and server
      await closeApp(device1, device2);
    }
  );
});
