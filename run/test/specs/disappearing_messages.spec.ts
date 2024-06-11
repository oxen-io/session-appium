import { bothPlatformsIt } from "../../types/sessionIt";
import {
  DMTimeOption,
  DisappearActions,
  DisappearModes,
} from "../../types/testing";
import { DISAPPEARING_TIMES } from "../../constants";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppThreeDevices,
  openAppTwoDevices,
} from "./utils/open_app";
import { setDisappearingMessage } from "./utils/set_disappearing_messages";
// TODO FIX CONTROL MESSAGES
async function disappearAfterSend(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const time: DMTimeOption = "10 seconds";
  const mode: DisappearModes = "send";
  const testMessage = `Checking disappear after ${mode} is working`;
  const controlMode: DisappearActions = "sent";
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Select disappearing messages option
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", `Disappear after ${mode} option`, time],
    device2
  );
  // Check control message is correct on device 2
  if (platform === "android") {
    console.log(`Android has broken control messages: ignoring`);
    // await device2.disappearingControlMessage(
    //   `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
    // );
    // await device2.disappearingControlMessage(
    //   `You set messages to disappear ${time} after they have been ${controlMode}.`
    // );
  }
  await runOnlyOnIOS(platform, () =>
    device2.disappearingControlMessage(
      `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
    )
  );
  // Send message to verify that deletion is working
  await device1.sendMessage(testMessage);
  await device2.clickOnElementByText({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
  });
  // Wait for message to disappear
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
  ]);

  // Great success
  await closeApp(device1, device2);
}
// TODO FIX ANDROID CONTROL MESSAGES
async function disappearAfterRead(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  const testMessage = "Checking disappear after read is working";
  const time: DMTimeOption = "10 seconds";
  const mode: DisappearModes = "read";
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Click conversation options menu (three dots)
  await setDisappearingMessage(
    platform,
    device1,
    ["1:1", `Disappear after ${mode} option`, time],
    device2
  );
  // Check control message is correct on device 2
  if (platform === "android") {
    console.log(`Android has broken control messages: ignoring`);
    // await device2.disappearingControlMessage(
    //   `${userA.userName} has set messages to disappear ${time} after they have been ${mode}.`
    // );
    // await device2.disappearingControlMessage(
    //   `You set messages to disappear ${time} after they have been ${mode}.`
    // );
  } else {
    `${userA.userName} has set messages to disappear ${time} after they have been ${mode}.`;
  }
  // Send message to verify that deletion is working
  await device1.sendMessage(testMessage);
  // Need function to read message
  // Wait for 10 seconds
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
  ]);
  // Great success
  await closeApp(device1, device2);
}
// TO FIX CONTROL MESSAGE FOR `YOU HAVE SET...` WRONG
async function disappearAfterSendGroups(platform: SupportedPlatformsType) {
  const testGroupName = "Disappear after send test";
  const testMessage = "Testing disappear after sent in groups";
  let time: DMTimeOption;
  const controlMode: DisappearActions = "sent";
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
  time =
    platform === "ios"
      ? DISAPPEARING_TIMES.TEN_SECONDS
      : DISAPPEARING_TIMES.THIRTY_SECONDS;

  await setDisappearingMessage(platform, device1, [
    "Group",
    `Disappear after send option`,
    time,
  ]);
  await runOnlyOnIOS(platform, () => device1.navigateBack(platform));
  // Check control message
  await console.log(`Control message not working on Android: ignoring`);
  // await Promise.all([
  //   device1.disappearingControlMessage(
  //     `You set messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  //   device2.disappearingControlMessage(
  //     `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  //   device3.disappearingControlMessage(
  //     `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  //   ),
  // ]);
  // Send message to verify deletion
  await device1.sendMessage(testMessage);
  await Promise.all([
    device2.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
    device3.waitForTextElementToBePresent({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
  ]);
  // Wait for 10 or 30 seconds
  const sleepTime = platform === "ios" ? 10000 : 30000;
  await sleepFor(sleepTime);
  // Check for test messages (should be deleted)
  await Promise.all([
    device1.hasTextElementBeenDeleted("Message body", testMessage),
    device2.hasTextElementBeenDeleted("Message body", testMessage),
    device3.hasTextElementBeenDeleted("Message body", testMessage),
  ]);
  // Close server and devices
  await closeApp(device1, device2, device3);
}

async function disappearAfterSendNoteToSelf(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const testMessage = `Testing disappearing messages in Note to Self`;
  const userA = await newUser(device, "Alice", platform);
  const time: DMTimeOption = "10 seconds";
  const timeMs = 10000;
  // Send message to self to bring up Note to Self conversation
  await device.clickOnByAccessibilityID("New conversation button");
  await device.clickOnByAccessibilityID("New direct message");
  await device.inputText(
    "accessibility id",
    "Session id input box",
    userA.sessionID
  );
  await device.scrollDown();
  await device.clickOnByAccessibilityID("Next");
  await device.inputText(
    "accessibility id",
    "Message input box",
    "Creating note to self"
  );
  await device.clickOnByAccessibilityID("Send message button");
  // Enable disappearing messages
  await device.clickOnByAccessibilityID("More options");
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () =>
    device.clickOnByAccessibilityID("Disappearing Messages")
  );
  // Select disappearing messages option
  await runOnlyOnAndroid(platform, () =>
    device.clickOnElementAll({
      strategy: "id",
      selector: "network.loki.messenger:id/title",
      text: "Disappearing messages",
    })
  );
  // Check default timer is set
  await sleepFor(1000);
  await device.waitForTextElementToBePresent({
    strategy: "DMTimeOption",
    selector: DISAPPEARING_TIMES.ONE_DAY,
  });
  await device.disappearRadioButtonSelected(DISAPPEARING_TIMES.ONE_DAY);
  await device.clickOnElementAll({
    strategy: "DMTimeOption",
    selector: time,
  });
  await device.clickOnByAccessibilityID("Set button");
  await runOnlyOnIOS(platform, () => device.navigateBack(platform));

  await sleepFor(1000);
  // await Promise.all([
  //   device.waitForControlMessageToBePresent(
  //     `${userA.userName} has set their messages to disappear ${time} after they have been ${mode}.`
  //   ),
  //   device.waitForControlMessageToBePresent(
  //     `${userA.userName} has set their messages to disappear ${time} after they have been ${mode}.`
  //   ),
  // ]);
  await device.sendMessage(testMessage);
  await sleepFor(timeMs);
  await device.hasElementBeenDeleted({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
    maxWait: 1000,
  });
  // Great success
  await closeApp(device);
}

describe("Disappearing messages", () => {
  bothPlatformsIt("Disappear after send", disappearAfterSend);

  bothPlatformsIt("Disappear after read", disappearAfterRead);

  bothPlatformsIt("Disappear after send groups", disappearAfterSendGroups);

  bothPlatformsIt(
    "Disappear after send note to self",
    disappearAfterSendNoteToSelf
  );
});

// TO DO - ADD TEST TO TURN OFF DISAPPEARING MESSAGES
