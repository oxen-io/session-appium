import { newUser } from "./create_account";
import { SupportedPlatformsType } from "./open_app";
import { sleepFor, runOnlyOnIOS, runOnlyOnAndroid } from ".";

import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const linkedDevice = async (
  device1: DeviceWrapper,
  device2: DeviceWrapper,
  userName: string,
  platform: SupportedPlatformsType
) => {
  const user = await newUser(device1, userName, platform);
  // Log in with recovery seed on device 2

  await device2.clickOnElement("Link a device");
  // Enter recovery phrase into input box
  await device2.inputText(
    "accessibility id",
    "Enter your recovery phrase",
    user.recoveryPhrase
  );
  await sleepFor(1000);
  // Continue with recovery phrase
  await runOnlyOnAndroid(platform, () => device2.clickOnElement("Link Device"));
  await runOnlyOnIOS(platform, () => device2.clickOnElement("Continue"));

  // TODO DELETE THIS AFTER ANDROID USER CONFIG ****************************
  // if (!noDisplayName) {
  //   await sleepFor(10000);
  //   await device2.clickOnElementById(
  //     "network.loki.messenger:id/snackbar_action"
  //   );
  //   await device2.inputText(
  //     "accessibility id",
  //     "Enter display name",
  //     user.userName
  //   );
  //   await device2.clickOnElement("Continue");
  // }
  // Wait for any notifications to disappear
  await device2.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Notifications",
    maxWait: 20000,
  });
  // Wait for transitiion animation between the two pages
  await await sleepFor(250);
  // Click continue on message notification settings
  await device2.clickOnElement("Continue with settings");
  // Dismiss notifications alert
  // await device2.inputText(
  //       "accessibility id",
  //       "Enter display name",
  //       user.userName
  //     );
  // await device2.clickOnElement("Continue")
  // Check for recovery phrase reminder
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () => device2.clickOnElement("Don’t Allow"));
  await sleepFor(1000);
  await device2.hasElementBeenDeleted("accessibility id", "Continue");
  // Check that button was clicked
  await device2.waitForElementToBePresent({
    strategy: "accessibility id",
    selector: "New conversation button",
  });

  console.warn("Device 3 linked");

  return user;
};
