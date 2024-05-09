import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from ".";
import { newUser } from "./create_account";
import { SupportedPlatformsType } from "./open_app";

import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { Username } from "../../../types/testing";

export const linkedDevice = async (
  device1: DeviceWrapper,
  device2: DeviceWrapper,
  userName: Username,
  platform: SupportedPlatformsType
) => {
  const user = await newUser(device1, userName, platform);
  // Log in with recovery seed on device 2

  await device2.clickOnByAccessibilityID("Restore your session button");
  // Enter recovery phrase into input box
  await device2.inputText(
    "accessibility id",
    "Recovery phrase input",
    user.recoveryPhrase
  );
  // Wait for continue button to become active
  await sleepFor(500);
  // Continue with recovery phrase
  await device2.clickOnByAccessibilityID("Continue");
  // Wait for any notifications to disappear
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Message Notifications",
    maxWait: 20000,
  });

  // Wait for transitiion animation between the two pages
  await await sleepFor(250);
  // Click continue on message notification settings
  await device2.clickOnByAccessibilityID("Continue");
  // Wait for permissions modal to pop up
  await sleepFor(1000);
  await runOnlyOnIOS(platform, () =>
    device2.clickOnByAccessibilityID("Don’t Allow")
  );
  // Wait for loading animation searching for display name
  await device1.waitForLoadingAnimation();
  // If display name isn't found
  const displayName = await device1.doesElementExist({
    strategy: "accessibility id",
    selector: "Enter display name",
  });
  if (displayName) {
    await device1.inputText("accessibility id", "Enter display name", userName);
    await device1.clickOnByAccessibilityID("Continue");
  } else {
    console.log(`Username found: ${userName}`);
  }
  // Check that button was clicked
  await device2.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "New conversation button",
  });

  console.warn("Device 3 linked");

  return user;
};
