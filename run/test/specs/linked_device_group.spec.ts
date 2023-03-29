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

async function groupCreationandNameChangeLinkedDevice(
  platform: SupportedPlatformsType
) {
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );

  const userA = await linkedDevice(device1, device2, "Alice", platform);

  const [userB, userC] = await Promise.all([
    newUser(device3, "Bob", platform),
    newUser(device4, "Carl", platform),
  ]);
  const testGroupName = "Linked device group";
  const newGroupName = "New group name";
  await createGroup(
    platform,
    device1,
    userA,
    device3,
    userB,
    device4,
    userC,
    testGroupName
  );
  // Test that group has loaded on linked device
  await device2.selectByText("Conversation list item", testGroupName);
  // Test group name change syncs
  // Change group name in device 1
  // Click on settings/more info
  await device1.clickOnElement("More options");
  // Edit group
  await device1.clickOnElement("Edit group");
  // click on group name to change it
  await device1.clickOnElement("Group name");
  // Type in new name
  await device1.inputText(
    "accessibility id",
    "Group name text field",
    newGroupName
  );
  // Confirm change (tick on android/ first done on ios)
  await device1.clickOnElement("Accept name change");
  // Apply changes (Apply on android/ second done on ios)
  await device1.clickOnElement("Apply changes");
  // await device1.clickOnElement("Accept name change");
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await runOnlyOnIOS(platform, () =>
    device1.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "Title is now " + `'${newGroupName}'.`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    device1.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "You renamed group to: " + `'${newGroupName}'`
    )
  );
  // Wait 5 seconds for name to update
  await sleepFor(5000);
  // Check linked device for name change (conversation header name)
  const groupName = await device2.grabTextFromAccessibilityId("Username");
  console.warn("Group name is now " + groupName);
  await device2.findMatchingTextAndAccessibilityId("Username", newGroupName);
  // Check config message in linked device aswell
  await runOnlyOnIOS(platform, () =>
    device2.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "Title is now " + `'${newGroupName}'.`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    device2.findMatchingTextAndAccessibilityId(
      "Configuration message",
      "You renamed group to " + `'${newGroupName}'`
    )
  );
  await closeApp(device1, device2, device3, device4);
}

async function leaveGroupLinkedDevice(platform: SupportedPlatformsType) {
  const testGroupName = "Otter lovers";
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );
  const userC = await linkedDevice(device3, device4, "Carl", platform);
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
  await device3.clickOnElement("More options");
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnTextElementById(
      `network.loki.messenger:id/title`,
      "Leave group"
    )
  );

  await runOnlyOnIOS(platform, () => device3.clickOnElement("Leave group"));
  await device3.clickOnElement("Leave");
  await device3.navigateBack(platform);
  // Check for control message
  await device3.findConfigurationMessage("You have left the group.");
  await device4.clickOnElementByText("accessibility id", testGroupName);
  await device4.findConfigurationMessage("You have left the group.");
  await device2.findConfigurationMessage(`${userC.userName} left the group.`);
  await device1.findConfigurationMessage(`${userC.userName} left the group.`);
  await closeApp(device1, device2, device3);
}

describe("Linked device - group tests", async () => {
  await iosIt(
    "Check group and name syncs",
    groupCreationandNameChangeLinkedDevice
  );
  await androidIt(
    "Check group and name syncs",
    groupCreationandNameChangeLinkedDevice
  );

  await iosIt("Leaving group syncs", leaveGroupLinkedDevice);
  await androidIt("Leaving group syncs", leaveGroupLinkedDevice);
});
