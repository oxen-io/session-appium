import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { createGroup } from "./utils/create_group";
import { runOnlyOnAndroid, runOnlyOnIOS } from "./utils/index";
import { navigateBack } from "./utils/navigate_back";
import {
  closeApp,
  openAppFourDevices,
  openAppThreeDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

async function groupCreation(platform: SupportedPlatformsType) {
  const testGroupName = "The Manhattan Crew";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Carl", platform),
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
  // Close server and devices
  await closeApp(device1, device2, device3);
}

async function changeGroupName(platform: SupportedPlatformsType) {
  const testGroupName = "Group name";
  const newGroupName = "Changed group name";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Carl", platform),
  ]);
  // Create group

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
  // Now change the group name

  // Click on settings or three dots
  await device1.clickOnElement("More options");
  // Click on Edit group option
  await device1.clickOnElement("Edit group");
  // Click on current group name
  await device1.clickOnElement("Group name");
  await device1.inputText("Group name text field", "   ");
  await device1.clickOnElement("Accept name change");
  // Alert should pop up 'Please enter group name', click ok
  // If ios click ok / If Android go to next step

  await runOnlyOnIOS(platform, () => device1.clickOnElement("OK"));
  // Delete empty space
  await runOnlyOnIOS(platform, () => device1.clickOnElement("Cancel"));
  await runOnlyOnAndroid(platform, () =>
    device1.deleteText("Group name text field")
  );
  // Enter new group name
  await device1.clickOnElement("Group name");

  await device1.inputText("Group name text field", newGroupName);
  // Click done/apply
  await device1.clickOnElement("Accept name change");
  await device1.clickOnElement("Apply changes");
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await runOnlyOnIOS(platform, () =>
    device1.waitForTextElementToBePresent(
      "Configuration message",
      "Title is now " + `'${newGroupName}'.`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    device1.waitForTextElementToBePresent(
      "Configuration message",
      "You renamed group to " + `'${newGroupName}'`
    )
  );
  await closeApp(device1, device2, device3);
}

async function addContactToGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3, device4 } = await openAppFourDevices(
    platform
  );
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Carl", platform),
  ]);
  const testGroupName = "Group to test adding contact";
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
  const userD = await newUser(device4, "Derek", platform);
  await navigateBack(device1, platform);
  await newContact(platform, device1, userA, device4, userD);
  // Exit to conversation list
  await navigateBack(device1, platform);
  // Select group conversation in list
  await device1.selectByText("Conversation list item", testGroupName);
  // Click more options
  await device1.clickOnElement("More options");
  // Select edit group
  await device1.clickOnElement("Edit group");
  // Add contact to group
  await device1.clickOnElement("Add members");
  // Select new user
  await device1.selectByText("Contact", userD.userName);
  // Click done/apply
  await device1.clickOnElement("Done");
  // Click done/apply again
  await device1.clickOnElement("Apply changes");
  // Check config message
  await device1.waitForTextElementToBePresent(
    "Configuration message",
    `${userD.userName}` + " joined the group."
  );
  // Exit to conversation list
  await navigateBack(device4, platform);
  // Select group conversation in list
  await device4.selectByText("Conversation list item", testGroupName);
  // Check config
  await runOnlyOnIOS(platform, () =>
    device4.waitForTextElementToBePresent(
      "Configuration message",
      "Group created"
    )
  );
  await runOnlyOnAndroid(platform, () =>
    device4.waitForTextElementToBePresent(
      "Configuration message",
      "You created a new group."
    )
  );
  await closeApp(device1, device2, device3, device4);
}

async function mentionsForGroups(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Carl", platform),
  ]);
  const testGroupName = "Mentions test group";
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
  await device1.inputText("Message input box", "@");
  // Check that all users are showing in mentions box
  await device1.findElementByAccessibilityId("Mentions list");
  // Select User B
  await device1.selectByText("Contact", userB.userName);
  // Check in user B's device if the format is correct
  await device2.findMessageWithBody("@You");
  // Select User C
  await device1.selectByText("Contact", userC.userName);
  // Check in User C's device if the format is correct
  await device3.findMessageWithBody("@You");
  // Close app
  await closeApp(device1, device2, device3);
}

describe("Group Testing", async () => {
  await iosIt("Create group", groupCreation);
  await androidIt("Create group", groupCreation);

  await iosIt("Change group name", changeGroupName);
  await androidIt("Change group name", changeGroupName);

  await iosIt("Add contact to group", addContactToGroup);
  await androidIt("Add contact to group", addContactToGroup);

  await iosIt("Test mentions in group chats", mentionsForGroups);
  await androidIt("Test mentions in group chats", mentionsForGroups);
});
