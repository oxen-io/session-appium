import { iosIt, androidIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { createGroup } from "./utils/create_group";
import {
  closeApp,
  openAppFourDevices,
  openAppThreeDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import {
  clickOnElement,
  selectByText,
  runOnlyOnAndroid,
  runOnlyOnIOS,
  deleteText,
  findMessageWithBody,
  inputText,
  waitForTextElementToBePresent,
  findElementByAccessibilityId,
} from "./utils/index";
import { navigateBack } from "./utils/navigate_back";

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
  await clickOnElement(device1, "More options");
  // Click on Edit group option
  await clickOnElement(device1, "Edit group");
  // Click on current group name
  await clickOnElement(device1, "Group name");
  await inputText(device1, "Group name text field", "   ");
  await clickOnElement(device1, "Accept name change");
  // Alert should pop up 'Please enter group name', click ok
  // If ios click ok / If Android go to next step
  await runOnlyOnIOS(platform, () => clickOnElement(device1, "OK"));
  // Delete empty space
  await runOnlyOnIOS(platform, () => clickOnElement(device1, "Cancel"));
  await runOnlyOnAndroid(platform, () =>
    deleteText(device1, "Group name text field")
  );
  // Enter new group name
  await clickOnElement(device1, "Group name");

  await inputText(device1, "Group name text field", newGroupName);
  // Click done/apply
  await clickOnElement(device1, "Accept name change");
  await clickOnElement(device1, "Apply changes");
  // If ios click back to match android (which goes back to conversation screen)
  // Check config message for changed name (different on ios and android)
  // Config message on ios is "Title is now blah"
  await runOnlyOnIOS(platform, () =>
    waitForTextElementToBePresent(
      device1,
      "Configuration message",
      "Title is now " + `'${newGroupName}'.`
    )
  );
  // Config on Android is "You renamed the group to blah"
  await runOnlyOnAndroid(platform, () =>
    waitForTextElementToBePresent(
      device1,
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
  await selectByText(device1, "Conversation list item", testGroupName);
  // Click more options
  await clickOnElement(device1, "More options");
  // Select edit group
  await clickOnElement(device1, "Edit group");
  // Add contact to group
  await clickOnElement(device1, "Add members");
  // Select new user
  await selectByText(device1, "Contact", userD.userName);
  // Click done/apply
  await clickOnElement(device1, "Done");
  // Click done/apply again
  await clickOnElement(device1, "Apply changes");
  // Check config message
  await waitForTextElementToBePresent(
    device1,
    "Configuration message",
    `${userD.userName}` + " joined the group."
  );
  // Exit to conversation list
  await navigateBack(device4, platform);
  // Select group conversation in list
  await selectByText(device4, "Conversation list item", testGroupName);
  // Check config
  await runOnlyOnIOS(platform, () =>
    waitForTextElementToBePresent(
      device4,
      "Configuration message",
      "Group created"
    )
  );
  await runOnlyOnAndroid(platform, () =>
    waitForTextElementToBePresent(
      device4,
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
  await inputText(device1, "Message input box", "@");
  // Check that all users are showing in mentions box
  await findElementByAccessibilityId(device1, "Mentions list");
  // Select User B
  await selectByText(device1, "Contact", userB.userName);
  // Check in user B's device if the format is correct
  await findMessageWithBody(device2, "@You");
  // Select User C
  await selectByText(device1, "Contact", userC.userName);
  // Check in User C's device if the format is correct
  await findMessageWithBody(device3, "@You");
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
