import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { createGroup } from "./utils/create_group";
import {
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppThreeDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { clickOnElement } from "./utils/utilities";

async function tinyTest(platform: SupportedPlatformsType) {
  const { server, device1, device2, device3 } = await openAppThreeDevices(
    platform
  );
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, "User A"),
    newUser(device2, "User B"),
    newUser(device3, "User C"),
  ]);

  await createGroup(
    device1,
    userA,
    device2,
    userB,
    device3,
    userC,
    "Test group"
  );
}

describe("Tiny test", () => {
  iosIt("Tiny test", tinyTest);
  androidIt("Tiny test", tinyTest);
});
