import { iosIt } from "../../types/sessionIt";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  openAppTwoDevices,
  closeApp,
} from "./utils/open_app";

iosIt("Delete request", deleteRequest);

async function deleteRequest(platform: SupportedPlatformsType) {
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
  // Swipe left on ios
  await device2.swipeLeftAny("Message request");

  await device2.clickOnByAccessibilityID("Delete");
  await sleepFor(1000);
  await device2.clickOnByAccessibilityID("Confirm delete");
  await device2.findElement("accessibility id", "No pending message requests");

  await closeApp(device1, device2);
}
