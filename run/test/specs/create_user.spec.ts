import {
  closeApp,
  openAppOnPlatformSingleDevice,
  SupportedPlatformsType,
} from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { androidIt, iosIt } from "../../types/sessionIt";

async function createUser(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  await newUser(device, "Alice", platform);
  // Should verify session ID and recovery phrase are what was originally created
  await closeApp(device);
}

describe("Account", async () => {
  await iosIt("Create account", createUser);
  await androidIt("Create account", createUser);
});
