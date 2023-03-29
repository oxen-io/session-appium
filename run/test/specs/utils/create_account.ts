import { getSessionID, runOnlyOnAndroid, runOnlyOnIOS } from ".";
import { SupportedPlatformsType } from "./open_app";
import { User } from "../../../types/testing";
import { sleepFor } from "./sleep_for";
import { DeviceWrapper } from "../../../types/DeviceWrapper";

export const newUser = async (
  device: DeviceWrapper,
  userName: string,
  platform: SupportedPlatformsType,
  notifications?: boolean
): Promise<User> => {
  // Click create session ID
  const createSessionId = "Create session ID";
  await device.waitForElementToBePresent("accessibility id", createSessionId);
  await device.clickOnElement(createSessionId);
  // Wait for animation to generate session id
  await device.waitForElementToBePresent("accessibility id", "Session ID");
  // save session id as variable
  const sessionID = await getSessionID(platform, device);

  console.log(`${userName}s sessionID found: "${sessionID}" "${platform}"`);

  // Click continue on session Id creation
  await device.clickOnElement("Continue");
  // Input username
  await device.inputText("accessibility id", "Enter display name", userName);
  // Click continue
  await device.clickOnElement("Continue");
  // Choose message notification options
  // Want to choose 'Slow Mode' so notifications don't interrupt test
  await runOnlyOnAndroid(platform, () =>
    device.clickOnElement("Slow mode notifications option")
  );
  await device.clickOnElement("Continue with settings");
  // Need to add Don't allow notifications dismiss here
  // iOS only
  await runOnlyOnIOS(platform, () => device.clickOnElement("Don’t Allow"));
  // Click on 'continue' button to open recovery phrase modal
  await device.waitForElementToBePresent("accessibility id", "Continue");
  await device.clickOnElement("Continue");
  // Long Press the recovery phrase to reveal recovery phrase
  await device.longPress("Recovery Phrase");
  // Save recovery phrase as variable
  const recoveryPhrase = await device.grabTextFromAccessibilityId(
    "Recovery Phrase"
  );
  console.log(`${userName}s recovery phrase is "${recoveryPhrase}"`);
  // Exit Modal
  await device.clickOnElement("Navigate up");

  if (platform === "android" && notifications === true) {
    await device.clickOnElement("User settings");
    await device.clickOnElement("Notifications");
    await device.clickOnTextElementById(
      "network.loki.messenger:id/device_settings_text",
      "Go to device notification settings"
    );
    await device.clickOnElementById("android:id/switch_widget");
    await device.navigateBack(platform);
    await sleepFor(100);
    await device.navigateBack(platform);
    await sleepFor(100);
    await device.navigateBack(platform);
  }

  return { userName, sessionID, recoveryPhrase };
};
