import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";

import {
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

async function tinyTest(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
}

describe("Tiny test", async () => {
  await iosIt("Tiny test", tinyTest);
  await androidIt("Tiny test", tinyTest);
});
