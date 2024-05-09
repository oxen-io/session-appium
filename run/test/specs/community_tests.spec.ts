import { androidIt, iosIt } from "../../types/sessionIt";
import { InteractionPoints } from "../../types/testing";
import { clickOnCoordinates, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { joinCommunity } from "./utils/join_community";
import {
  SupportedPlatformsType,
  closeApp,
  openAppTwoDevices,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

async function sendImageCommunity(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testCommunityLink = `https://chat.lokinet.dev/testing-all-the-things?public_key=1d7e7f92b1ed3643855c98ecac02fc7274033a3467653f047d6e433540c03f17`;
  const testCommunityName = `Testing All The Things!`;
  const testMessage = "Testing sending images to communities";
  const ronSwansonBirthday = "196705060700.00";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await Promise.all([
    device1.navigateBack(platform),
    device2.navigateBack(platform),
  ]);
  await Promise.all([
    joinCommunity(platform, device1, testCommunityLink, testCommunityName),
    joinCommunity(platform, device2, testCommunityLink, testCommunityName),
  ]);
  await Promise.all([
    device1.scrollToBottom(platform),
    device2.scrollToBottom(platform),
  ]);
  // await device1.sendImage(platform, testMessage, true);
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
  // await Promise.all([
  //   device1.scrollToBottom(platform),
  //   device2.scrollToBottom(platform),
  // ]);
  await device2.replyToMessage(userA, testMessage);
  // await Promise.all([
  //   device1.scrollToBottom(platform),
  //   device2.scrollToBottom(platform),
  // ]);

  closeApp(device1, device2);
}

describe("Community message checks", () => {
  iosIt("Send image to community", sendImageCommunity);
  androidIt("Send image to community", sendImageCommunity);
});
