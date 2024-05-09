import { androidIt, iosIt } from "../../types/sessionIt";
import {
  DMTimeOption,
  DisappearActions,
  DisappearModes,
} from "../../types/testing";
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
    await device2.disappearingControlMessage(
      `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
    );
    await device2.disappearingControlMessage(
      `You set messages to disappear ${time} after they have been ${controlMode}.`
    );
  } else {
    `${userA.userName} has set messages to disappear ${time} after they have been ${time}.`;
  }
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
    device1.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
    device2.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
  ]);

  // Great success
  await closeApp(device1, device2);
}

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
    await device2.disappearingControlMessage(
      `${userA.userName} has set messages to disappear ${time} after they have been ${mode}.`
    );
    await device2.disappearingControlMessage(
      `You set messages to disappear ${time} after they have been ${mode}.`
    );
  } else {
    `${userA.userName} has set messages to disappear ${time} after they have been ${mode}.`;
  }
  // Send message to verify that deletion is working
  await device1.sendMessage(testMessage);
  // Need function to read message
  // Wait for 10 seconds
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeletedNew({
      strategy: "accessibility id",
      selector: "Message body",
      text: testMessage,
    }),
    device2.hasElementBeenDeletedNew({
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
  const action: DisappearActions = "sent";
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
  await device1.clickOnByAccessibilityID("More options");
  // Select disappearing messages option
  await sleepFor(1000);
  if (platform === "android") {
    device1.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Disappearing messages"
    );
  } else {
    await device1.clickOnByAccessibilityID("Disappearing Messages");
  }
  // Check the default time is set to
  await device1.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "1 day",
  });
  await device1.disappearRadioButtonSelected("1 day");
  // Change time to testing time of 10 seconds

  if (platform === "android") {
    time = "30 seconds";
    await device1.clickOnByAccessibilityID(time);
  } else {
    time = "10 seconds";
    await device1.clickOnByAccessibilityID(time);
  }
  // Save setting
  await device1.clickOnByAccessibilityID("Set button");
  await runOnlyOnIOS(platform, () => device1.navigateBack(platform));
  // Check control message
  await Promise.all([
    device1.disappearingControlMessage(
      `You set messages to disappear ${time} after they have been ${action}.`
    ),
    device2.disappearingControlMessage(
      `${userA.userName} has set messages to disappear ${time} after they have been ${action}.`
    ),
    device3.disappearingControlMessage(
      `${userA.userName} has set messages to disappear ${time} after they have been ${action}.`
    ),
  ]);
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
  // Wait for ten seconds
  await sleepFor(10000);
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
  // Send message to self to bring up Note to Self conversation
  await device.clickOnByAccessibilityID("New conversation button");
  await device.clickOnByAccessibilityID("New direct message");
  await device.inputText(
    "accessibility id",
    "Session id input box",
    userA.accountID
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
  await sleepFor(500);
  await runOnlyOnIOS(platform, () =>
    device.clickOnByAccessibilityID("Disappearing Messages")
  );
  await sleepFor(1000);
  await runOnlyOnAndroid(platform, () =>
    device.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Disappearing messages"
    )
  );
  // Check default timer is set
  await sleepFor(1000);
  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "1 day",
  });
  await device.disappearRadioButtonSelected("1 day");
  await device.clickOnByAccessibilityID("10 seconds");
  await device.clickOnByAccessibilityID("Set button");
  await runOnlyOnIOS(platform, () => device.navigateBack(platform));
  await sleepFor(1000);
  // await Promise.all([
  //   device.waitForControlMessageToBePresent(
  //     `${userA.userName} has set their messages to disappear 10 seconds after they have been sent.`
  //   ),
  //   device.waitForControlMessageToBePresent(
  //     `${userA.userName} has set their messages to disappear 10 seconds after they have been sent.`
  //   ),
  // ]);
  await device.sendMessage(testMessage);
  await sleepFor(10000);
  await device.hasElementBeenDeletedNew({
    strategy: "accessibility id",
    selector: "Message body",
    text: testMessage,
    maxWait: 1000,
  });
  // Great success
  await closeApp(device);
}

describe("Disappearing messages", () => {
  // iosIt("Disappearing messages legacy", disappearingMessagesLegacy);
  // androidIt("Disappearing messages legacy", disappearingMessagesLegacy);

  iosIt("Disappear after send", disappearAfterSend);
  androidIt("Disappear after send", disappearAfterSend);

  iosIt("Disappear after read", disappearAfterRead);
  androidIt("Disappear after read", disappearAfterRead);

  iosIt("Disappear after send groups", disappearAfterSendGroups);
  androidIt("Disappear after send groups", disappearAfterSendGroups);

  iosIt("Disappear after send note to self", disappearAfterSendNoteToSelf);
  androidIt("Disappear after send note to self", disappearAfterSendNoteToSelf);
});

// TO DO - ADD TEST TO TURN OFF DISAPPEARING MESSAGES
