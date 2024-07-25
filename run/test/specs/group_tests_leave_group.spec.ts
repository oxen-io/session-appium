import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import { sleepFor } from "./utils/index";
import {
  SupportedPlatformsType,
  closeApp,
  openAppThreeDevices,
} from "./utils/open_app";

iosIt("Leave group", leaveGroupIos);
androidIt("Leave group", leaveGroupAndroid);

async function leaveGroupIos(platform: SupportedPlatformsType) {
  const testGroupName = "Leave group";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
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
  await device3.clickOnByAccessibilityID("More options");
  await sleepFor(1000);
  await device3.clickOnByAccessibilityID("Leave group");
  await device3.clickOnByAccessibilityID("Leave");
  await device3.navigateBack(platform);
  // Check for control message
  await device2.waitForControlMessageToBePresent(
    `${userC.userName} left the group.`
  );
  await device1.waitForControlMessageToBePresent(
    `${userC.userName} left the group.`
  );
  await closeApp(device1, device2, device3);
}
// TO FIX (LEAVE GROUP CONFIRMATION ON DIALOG NOT WORKING)
async function leaveGroupAndroid(platform: SupportedPlatformsType) {
  const testGroupName = "Leave group";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
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
  await device3.clickOnByAccessibilityID("More options");
  await sleepFor(1000);
  await device3.clickOnTextElementById(
    `network.loki.messenger:id/title`,
    "Leave group"
  );
  await device3.clickOnElementAll({
    strategy: "accessibility id",
    selector: "Yes",
  });
  // Check for control message
  await device2.waitForControlMessageToBePresent(
    `${userC.userName} has left the group.`
  );
  await device1.waitForControlMessageToBePresent(
    `${userC.userName} has left the group.`
  );
  await closeApp(device1, device2, device3);
}
