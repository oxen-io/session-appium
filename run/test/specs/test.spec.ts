import { DeviceWrapper } from "../../types/DeviceWrapper";
import { androidIt, iosIt } from "../../types/sessionIt";
import { sleepFor } from "./utils";
import { newUser } from "./utils/create_account";
import { linkedDevice } from "./utils/link_device";

import {
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

async function tinyTest(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);

  const userA = await newUser(device, "Alice", platform);
  const newUsername = "Alice in chains";
  // click on settings/profile avatar
  await device.clickOnByAccessibilityID("User settings");
  // select username
  await device.clickOnByAccessibilityID("Username");
  // type in new username
  await sleepFor(100);
  await device.deleteText("Username");
  await device.inputText("accessibility id", "Username", newUsername);
  const changedUsername = await device.grabTextFromAccessibilityId("Username");
  console.log("Changed username", changedUsername);
  if (changedUsername === newUsername) {
    console.log("Username change successful");
  }
  if (changedUsername === userA.userName) {
    console.log("Username is still ", userA.userName);
  }
  if (changedUsername === "Username") {
    console.log(
      "Username is not picking up text but using access id text",
      changedUsername
    );
  } else {
    console.log("Username is not found`");
  }
  // select tick
  if (platform === "android") {
    device.clickOnByAccessibilityID("Apply");
  } else {
    device.clickOnByAccessibilityID("Done");
  }
  // verify new username

  await closeApp(device);
}

describe("Tiny test", () => {
  iosIt("Tiny test", tinyTest);
  androidIt("Tiny test", tinyTest);
});
