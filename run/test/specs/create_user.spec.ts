import {
  closeApp,
  openAppOnPlatform,
  SupportedPlatformsType,
} from "./utils/open_app";
import { newUser } from "./utils/create_account";

async function runOnPlatform(platform: SupportedPlatformsType) {
  const { server, device } = await openAppOnPlatform(platform);

  await perPlatformTest({ server, device });
}

async function perPlatformTest({
  server,
  device,
}: {
  server: any;
  device: wd.PromiseWebdriver;
}) {
  await newUser(device, "User A");
  await closeApp(server, device);
}

describe("User", () => {
  it("Create user ios ", async () => {
    await runOnPlatform("ios");
  });

  it("Create user android ", async () => {
    await runOnPlatform("android");
  });
});
