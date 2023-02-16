import { iosIt, androidIt, everyPlatformIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

async function manualTestSetupTwoUsers(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  const [userA, userB] = await Promise.all([
    newUser(device1, "User A", platform),
    newUser(device2, "User B", platform),
  ]);

  await newContact(platform, device1, userA, device2, userB);

  await closeApp(device1, device2);
}

describe("Manual test setup", async () => {
  await everyPlatformIt("Manual test", manualTestSetupTwoUsers);
});
