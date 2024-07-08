import { bothPlatformsIt } from "../../types/sessionIt";
import { sleepFor, runOnlyOnAndroid, runOnlyOnIOS } from "./utils";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";

bothPlatformsIt("Message requests clear all", clearAllRequests);

async function clearAllRequests(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);
  // Send message from Alice to Bob
  await device1.sendNewMessage(userB, `${userA.userName} to ${userB.userName}`);
  // Wait for banner to appear
  // Bob clicks on message request banner
  await device2.clickOnByAccessibilityID("Message requests banner");
  // Select Clear All button
  await device2.clickOnByAccessibilityID("Clear all");
  await sleepFor(1000);
  await runOnlyOnAndroid(platform, () =>
    device2.clickOnElementAll({ strategy: "accessibility id", selector: "Yes" })
  );
  await runOnlyOnIOS(platform, () => device2.clickOnByAccessibilityID("Clear"));
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "No pending message requests",
  });
  await closeApp(device1, device2);
}
