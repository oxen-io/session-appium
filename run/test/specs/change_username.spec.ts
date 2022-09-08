import {
  closeApp,
  openAppOnPlatformSingleDevice,
  SupportedPlatformsType,
} from "./utils/open_app";
import { newUser } from "./utils/create_account";
import { clickOnElement, inputText } from "./utils/utilities";
import { iosIt, androidIt } from "../../types/sessionIt";

async function runOnPlatform(platform: SupportedPlatformsType) {
  const { server, device: device1 } = await openAppOnPlatformSingleDevice(
    platform
  );

  await newUser(device1, "User A");
  // click on settings/profile avatar
  await clickOnElement(device1, "Profile picture");
  // select username
  await clickOnElement(device1, "Username");
  console.warn("Element clicked?");
  // type in new username
  const newUsername = await inputText(
    device1,
    "Username input",
    "New username"
  );
  console.warn(newUsername);
  // select tick
  await clickOnElement(device1, "Apply");
  // verify new username

  await closeApp(server, device1);
}

describe("Username", () => {
  iosIt("Change username", runOnPlatform);
  androidIt("Change username", runOnPlatform);
});
