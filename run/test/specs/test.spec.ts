import { androidIt, iosIt } from "../../types/sessionIt";
import { linkedDevice } from "./utils/link_device";

import { openAppTwoDevices, SupportedPlatformsType } from "./utils/open_app";

async function tinyTest(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  await linkedDevice(device1, device2, "Alice", platform);
}

describe("Tiny test",  () => {
  iosIt("Tiny test", tinyTest);
  androidIt("Tiny test", tinyTest);
});
