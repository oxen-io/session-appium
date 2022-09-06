import {
  closeApp,
  openAppOnPlatformSingleDevice,
  SupportedPlatformsType,
} from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { androidIt, iosIt } from "../../types/sessionIt";

async function runOnPlatform(platform: SupportedPlatformsType) {
  const { server, device } = await openAppOnPlatformSingleDevice(platform);

  await newUser(device, "User A");
  await closeApp(server, device);
}

describe("User", () => {
  iosIt("Create user", runOnPlatform);
  androidIt("Create user", runOnPlatform);
});
