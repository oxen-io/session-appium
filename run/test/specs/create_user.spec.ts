import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import {
  closeApp,
  openAppOnPlatformSingleDevice,
  SupportedPlatformsType,
} from "./utils/open_app";

async function createUser(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  await newUser(device, "Alice", platform);
  // Should verify session ID and recovery phrase are what was originally created
  await closeApp(device);
}

describe("Account", async () => {
  await iosIt("Create user", createUser);
  await androidIt("Create user", createUser);
});
