import { XPATHS } from "../../constants";
import { androidIt, iosIt } from "../../types/sessionIt";
import { InteractionPoints } from "../../types/testing";
import { clickOnCoordinates, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";

iosIt("Send GIF", sendGifIos);
androidIt("Send GIF", sendGifAndroid);

async function sendGifIos(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing-GIF-1";
  await newContact(platform, device1, userA, device2, userB);
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab
  await clickOnCoordinates(device1, InteractionPoints.GifButtonKeyboardOpen);
  // Select gif
  await sleepFor(500);
  // Need to select Continue on GIF warning
  await device1.clickOnByAccessibilityID("Continue");
  await device1.clickOnElementXPath(XPATHS.FIRST_GIF);
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnByAccessibilityID("Untrusted attachment message", 15000);
  await sleepFor(100);
  // Click on 'download'
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
  // Close app
  await closeApp(device1, device2);
}

async function sendGifAndroid(platform: SupportedPlatformsType) {
  // Test sending a video
  // open devices and server
  const { device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const replyMessage = `Replying to GIF from ${userA.userName}`;
  // create contact
  await newContact(platform, device1, userA, device2, userB);
  // Click on attachments button
  await device1.clickOnByAccessibilityID("Attachments button");
  // Select GIF tab

  await device1.clickOnByAccessibilityID("GIF button");
  await device1.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Continue",
  });

  // Select gif
  await sleepFor(3000);
  await device1.clickOnElementXPath(XPATHS.FIRST_GIF);

  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnByAccessibilityID("Untrusted attachment message", 9000);
  await sleepFor(500);
  // Click on 'download'
  await device2.clickOnByAccessibilityID("Download media");
  // Reply to message
  await sleepFor(5000);
  await device2.longPress("Media message");
  // Check reply came through on device1
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });

  // Close app
  await closeApp(device1, device2);
}
