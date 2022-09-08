import { newContact } from "./utils/create_contact";
import { newUser } from "./utils/create_account";
import {
  SupportedPlatformsType,
  closeApp,
  openAppTwoDevices,
} from "./utils/open_app";
import {
  clickOnElement,
  findElement,
  hasElementBeenDeleted,
} from "./utils/utilities";
import { iosIt, androidIt } from "../../types/sessionIt";

async function runOnPlatform(platform: SupportedPlatformsType) {
  // Open App
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Create user A
  // Create user B
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A"),
    newUser(device2, "User B"),
  ]);
  // Create contact
  await newContact(device1, userA, device2, userB);
  // Block contact
  // Click on three dots (settings)
  await clickOnElement(device1, "More options");
  // Select Block option
  await clickOnElement(device1, "Block");
  // Confirm block option
  await clickOnElement(device1, "Confirm block");
  // Look for alert at top of screen (User B is blocked. Unblock them?)
  await findElement(device1, "Blocked banner");
  console.warn("User has been blocked");
  // Click on alert to unblock
  await clickOnElement(device1, "Blocked banner");
  // Look for alert (shouldn't be there)
  await hasElementBeenDeleted(device1, "Blocked banner");
  // Close app
  await closeApp(server, device1, device2);
}

describe("User", () => {
  iosIt("Block user", runOnPlatform);
  androidIt("Block user", runOnPlatform);
});
