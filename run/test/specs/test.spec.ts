import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";

import {
  closeApp,
  openAppOnPlatformSingleDevice,
  SupportedPlatformsType,
} from "./utils/open_app";
import { clickOnElement, longPress } from "./utils/utilities";

async function tinyTest(platform: SupportedPlatformsType) {
  const { server, device } = await openAppOnPlatformSingleDevice(platform);

  const user = await newUser(device, "Bob", platform);

  await clickOnElement(device, "User settings");

  await closeApp(server, device);
}

describe("Tiny test", () => {
  iosIt("Tiny test", tinyTest);
  androidIt("Tiny test", tinyTest);
});
