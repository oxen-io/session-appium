import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  SupportedPlatformsType,
  closeApp,
  openAppThreeDevices,
} from "./utils/open_app";

iosIt("Create group", groupCreation);
androidIt("Create group", groupCreation);

// bothPlatformsIt("Create group", groupCreation);

async function groupCreation(platform: SupportedPlatformsType) {
  const testGroupName = "Test group";
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
    newUser(device3, "Charlie", platform),
  ]);
  // Create contact between User A and User B and User C
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
