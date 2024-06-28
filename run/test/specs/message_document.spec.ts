import { androidIt, iosIt } from "../../types/sessionIt";
import { InteractionPoints } from "../../types/testing";
import { sleepFor, clickOnCoordinates } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";
import { runScriptAndLog } from "./utils/utilities";

iosIt("Send document", sendDocumentIos);
androidIt("Send document", sendDocumentAndroid);

async function sendDocumentIos(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Testing-document-1";
  const replyMessage = `Replying to document from ${userA.userName}`;
  const spongebobsBirthday = "199905010700.00";
  await newContact(platform, device1, userA, device2, userB);

  await device1.clickOnByAccessibilityID("Attachments button");
  await sleepFor(100);
  await clickOnCoordinates(device1, InteractionPoints.DocumentKeyboardOpen);

  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow Full Access",
    maxWait: 1000,
  });
  if (permissions) {
    try {
      await device1.clickOnByAccessibilityID("Allow Full Access");
    } catch (e) {
      console.log("No permissions dialog");
    }
  }
  const testDocument = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "test_file, pdf",
    text: undefined,
    maxWait: 1000,
  });

  if (!testDocument) {
    await runScriptAndLog(
      `touch -a -m -t ${spongebobsBirthday} 'run/test/specs/media/test_file.pdf'`
    );

    await runScriptAndLog(
      `xcrun simctl addmedia ${process.env.IOS_FIRST_SIMULATOR} 'run/test/specs/media/test_file.pdf'`,
      true
    );
  }
  await sleepFor(100);
  await device1.clickOnByAccessibilityID("test_file, pdf");
  await sleepFor(500);
  await device1.clickOnByAccessibilityID("Text input box");
  await device1.inputText("accessibility id", "Text input box", testMessage);
  await device1.clickOnByAccessibilityID("Send button");
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
  await device2.longPressMessage(testMessage);
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  // Close app and server
  await closeApp(device1, device2);
}

async function sendDocumentAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const replyMessage = `Replying to document from ${userA.userName}`;
  await newContact(platform, device1, userA, device2, userB);
  await device1.sendDocument(platform);
  await device2.clickOnByAccessibilityID("Untrusted attachment message", 7000);
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnByAccessibilityID("Download media");
  // Reply to message
  // await sleepFor(5000);
  await device2.longPress("Document");
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message body",
    text: replyMessage,
  });
  // Close app and server
  await closeApp(device1, device2);
}
