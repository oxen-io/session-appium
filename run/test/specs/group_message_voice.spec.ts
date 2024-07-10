import { XPATHS } from "../../constants";
import { androidIt, iosIt } from "../../types/sessionIt";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  closeApp,
  openAppThreeDevices,
} from "./utils/open_app";

iosIt("Send voice message to group", sendVoiceMessageGroupiOS);
androidIt("Send voice message to group", sendVoiceMessageGroupAndroid);

async function sendVoiceMessageGroupiOS(platform: SupportedPlatformsType) {
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
  const replyMessage = `Replying to voice message from ${userA.userName} in ${testGroupName}`;
  await device1.longPress("New voice message");
  // "Session" would like to access the microphone (Don't allow/ OK)
  const permissions = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Allow",
    maxWait: 500,
  });
  if (permissions) {
    await device1.clickOnByAccessibilityID("Allow");
    await sleepFor(500);
  }
  await device1.pressAndHold("New voice message");

  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });
  await device3.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Voice message",
  });

  await device2.longPress("Voice message");
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

async function sendVoiceMessageGroupAndroid(platform: SupportedPlatformsType) {
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
  const replyMessage = `Replying to voice message from ${userA.userName} in ${testGroupName}`;
  // Select voice message button to activate recording state
  await device1.longPress("New voice message");
  await device1.clickOnByAccessibilityID("Continue");
  await device1.clickOnElementXPath(XPATHS.VOICE_TOGGLE);
  await device1.pressAndHold("New voice message");
  // Check device 2 and 3 for voice message from user A
  await Promise.all([
    device2.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Voice message",
    }),
    device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Voice message",
    }),
  ]);
  // Reply to voice message
  await device2.longPress("Voice message");
  await device2.clickOnByAccessibilityID("Reply to message");
  await device2.sendMessage(replyMessage);
  // Check device 1 and 3 for reply to apepar
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
  await closeApp(device1, device2, device3);
}
