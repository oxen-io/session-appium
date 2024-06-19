import { androidIt, iosIt } from "../../types/sessionIt";
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import { linkedDevice } from "./utils/link_device";
import {
  closeApp,
  openAppFourDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

async function groupCreationandNameChangeLinkedDeviceiOS(
  platform: SupportedPlatformsType
) {
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );

  const userA = await linkedDevice(device1, device2, "Alice", platform);

  const [userB, userC] = await Promise.all([
    newUser(device3, "Bob", platform),
    newUser(device4, "Charlie", platform),
  ]);
  const testGroupName = "Linked device group";
  const newGroupName = "New group name";
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
  // Test that group has loaded on linked device
  await device2.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Conversation list item",
    text: testGroupName,
  });
  // Test group name change syncs
  // Change group name in device 1
  // Click on settings/more info
  await device1.clickOnByAccessibilityID("More options");
  // Edit group
  await sleepFor(100);
  await device1.clickOnByAccessibilityID("Edit group");
  // click on group name to change it
  await device1.clickOnByAccessibilityID("Group name");
  // Type in new name
  await device1.inputText(
    "accessibility id",
    "Group name text field",
    newGroupName
  );
  // Confirm change (tick on android/ first done on ios)
  await device1.clickOnByAccessibilityID("Accept name change");
  // Apply changes (Apply on android/ second done on ios)
  await device1.clickOnByAccessibilityID("Apply changes");
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await device1.waitForControlMessageToBePresent(
    `Title is now '${newGroupName}'.`
  );

  // Wait 5 seconds for name to update
  await sleepFor(5000);
  // Check linked device for name change (conversation header name)
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation header name",
    text: newGroupName,
  });

  await Promise.all([
    device2.waitForControlMessageToBePresent(`Title is now '${newGroupName}'.`),
    device3.waitForControlMessageToBePresent(`Title is now '${newGroupName}'.`),
    device4.waitForControlMessageToBePresent(`Title is now '${newGroupName}'.`),
  ]);

  // control on Linked device: Android is "You renamed the group to blah"
  await closeApp(device1, device2, device3, device4);
}

async function groupCreationandNameChangeLinkedDeviceAndroid(
  platform: SupportedPlatformsType
) {
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );

  const userA = await linkedDevice(device1, device4, "Alice", platform);

  const [userB, userC] = await Promise.all([
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
  const testGroupName = "Linked device group";
  const newGroupName = "New group name";
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
  // Test that group has loaded on linked device (device 4)
  await device4.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Conversation list item",
    text: testGroupName,
  });
  // Test group name change syncs
  // Change group name in device 1
  // Click on settings/more info
  await device1.clickOnByAccessibilityID("More options");
  // Edit group
  await sleepFor(500);
  await device1.clickOnTextElementById(
    `network.loki.messenger:id/title`,
    "Edit group"
  );
  // click on group name to change it
  await device1.clickOnByAccessibilityID("Group name");
  // Type in new name
  await device1.inputText("accessibility id", "Group name", newGroupName);
  // Confirm change (tick on android/ first done on ios)
  await device1.clickOnByAccessibilityID("Accept name change");
  // Apply changes (Apply on android/ second done on ios)
  await device1.clickOnTextElementById(
    `network.loki.messenger:id/action_apply`,
    "APPLY"
  );
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await device1.waitForControlMessageToBePresent(
    `You renamed the group to ${newGroupName}`
  );

  // Wait 5 seconds for name to update
  await sleepFor(5000);
  // Check linked device (device 4) for name change (conversation header name)
  await device4.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Conversation header name",
    text: newGroupName,
  });
  await Promise.all([
    device4.waitForControlMessageToBePresent(
      `You renamed the group to ${newGroupName}`
    ),
    device2.waitForControlMessageToBePresent(
      `${userA.userName} renamed the group to: ${newGroupName}`
    ),
    device3.waitForControlMessageToBePresent(
      `${userA.userName} renamed the group to: ${newGroupName}`
    ),
  ]);
  // control on Linked device: Android is "You renamed the group to blah"
  await closeApp(device1, device2, device3, device4);
}

async function leaveGroupLinkedDevice(platform: SupportedPlatformsType) {
  const testGroupName = "Leave group linked device";
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );
  const userC = await linkedDevice(device3, device4, "Charlie", platform);
  // Create users A, B and C
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);

  // Create group with user A, user B and User C
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
  await sleepFor(1000);
  await device3.clickOnByAccessibilityID("More options");
  await sleepFor(1000);
  await runOnlyOnAndroid(platform, () =>
    device3.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Leave group"
    )
  );

  await runOnlyOnIOS(platform, () =>
    device3.clickOnByAccessibilityID("Leave group")
  );
  await runOnlyOnIOS(platform, () => device3.clickOnByAccessibilityID("Leave"));
  await runOnlyOnAndroid(platform, () =>
    device3.clickOnElementAll({ strategy: "accessibility id", selector: "Yes" })
  );
  await device3.navigateBack(platform);
  // Check for control message
  await sleepFor(5000);
  await runOnlyOnIOS(platform, () =>
    device4.hasTextElementBeenDeleted("Conversation list item", testGroupName)
  );
  await runOnlyOnIOS(platform, () =>
    device2.waitForControlMessageToBePresent(
      `${userC.userName} left the group.`
    )
  );
  await runOnlyOnIOS(platform, () =>
    device1.waitForControlMessageToBePresent(
      `${userC.userName} left the group.`
    )
  );
  await runOnlyOnAndroid(platform, () =>
    device2.waitForControlMessageToBePresent(
      `${userC.userName} has left the group.`
    )
  );
  await runOnlyOnAndroid(platform, () =>
    device1.waitForControlMessageToBePresent(
      `${userC.userName} has left the group.`
    )
  );
  await closeApp(device1, device2, device3, device4);
}

describe("Linked device - group tests ios", () => {
  iosIt("Group and name syncs", groupCreationandNameChangeLinkedDeviceiOS);
  iosIt("Leaving group syncs", leaveGroupLinkedDevice);
});

describe("Linked device - group tests android", () => {
  androidIt(
    "Group and name syncs",
    groupCreationandNameChangeLinkedDeviceAndroid
  );
  androidIt("Leaving group syncs", leaveGroupLinkedDevice);
});

// Remove user
//  Add user
//  Disappearing messages

// async function disappearingMessagesLinkedDevice(platform: SupportedPlatformsType) {
//   const testGroupName = "Disappearing messages group";
//   const { device1, device2, device3, device4 } = await openAppFourDevices(
//     platform
//   );
//   const userA = await linkedDevice(device1, device2, "Alice", platform);
//   const [userB, userC] = await Promise.all([
//     newUser(device3, "Bob", platform),
//     newUser(device4, "Charlie", platform),
//   ]);
//   await createGroup(
//     platform,
//     device1,
//     userA,
//     device3,
//     userB,
//     device4,
//     userC,
//     testGroupName
//   );
//   // Enable disappearing messages
//   await device1.clickOnByAccessibilityID("More options");
//   await runOnlyOnIOS(platform, () =>
//     device1.clickOnByAccessibilityID("Disappearing messages")
//   );
//   await runOnlyOnAndroid(platform, () =>
//     device1.clickOnTextElementById(
//       `network.loki.messenger:id/title`,
//       "Disappearing messages"
//     )
//   );
//   await device1.clickOnByAccessibilityID("Enable");
//   // Set disappearing messages timer
//   await runOnlyOnIOS(platform, () =>
//     device1.clickOnByAccessibilityID("Timer")
//   );
//   await runOnlyOnAndroid(platform, () =>
//     device1.clickOnTextElementById(
//       `network.loki.messenger:id/title`,
//       "Timer"
//     )
//   );
//   await device1.clickOnByAccessibilityID("5 seconds");
//   // Send a message
//   await device1.inputText("accessibility id", "Message input", "Hello");
//   await device1.clickOnByAccessibilityID("Send");
//   // Wait for the message to disappear
//   await sleepFor(6000);
//   // Check if the message is still visible on device2
//   await device2.waitForTextElementToBePresent({
//     strategy: "accessibility id",
//     selector: "Message text",
//     text: "Hello",
//     shouldNotExist: true,
//   });
//   // Check if the message is still visible on device3
//   await device3.waitForTextElementToBePresent({
//     strategy: "accessibility id",
//     selector: "Message text",
//     text: "Hello",
//     shouldNotExist: true,
//   });
//   // Check if the message is still visible on device4
//   await device4.waitForTextElementToBePresent({
//     strategy: "accessibility id",
//     selector: "Message text",
//     text: "Hello",
//     shouldNotExist: true,
//   });
//   await closeApp(device1, device2, device3, device4);
// }

// describe("Linked device - disappearing messages tests", () => {
//   iosIt("Disappearing messages syncs", disappearingMessagesLinkedDevice);
//   androidIt("Disappearing messages syncs", disappearingMessagesLinkedDevice);
// });
