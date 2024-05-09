import { runOnlyOnIOS, sleepFor } from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { User, Username } from "../../../types/testing";
import { SupportedPlatformsType } from "./open_app";

export const newUser = async (
  device: DeviceWrapper,
  userName: Username,
  platform: SupportedPlatformsType
): Promise<User> => {
  // Click create session ID

  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Create account button",
  });
  // console.log(`${userName}s sessionID found: "${sessionID}" "${platform}"`);
  // Click continue on session Id creation
  await device.clickOnByAccessibilityID("Continue");
  // Input username
  await device.inputText("accessibility id", "Enter display name", userName);
  // Click continue
  await device.clickOnByAccessibilityID("Continue");
  // Choose message notification options
  // Want to choose 'Slow Mode' so notifications don't interrupt test
  await device.clickOnByAccessibilityID("Slow mode notifications button");
  // Select Continue to save notification settings
  await device.clickOnByAccessibilityID("Continue");
  // Need to add Don't allow notifications dismiss here
  await runOnlyOnIOS(platform, () =>
    device.clickOnByAccessibilityID("Don’t Allow")
  );
  await sleepFor(1000);
  // No pop up for notifications on android anymore
  // Click on 'continue' button to open recovery phrase modal
  await device.waitForTextElementToBePresent({
    strategy: "accessibility id",
    selector: "Reveal recovery phrase button",
  });
  await device.clickOnByAccessibilityID("Continue");
  //Save recovery passwprd
  await device.clickOnByAccessibilityID("Recovery password");
  // Save recovery phrase as variable
  const recoveryPhrase = await device.grabTextFromAccessibilityId(
    "Recovery password"
  );
  console.log(`${userName}s recovery phrase is "${recoveryPhrase}"`);
  // Exit Modal
  await device.clickOnByAccessibilityID("Navigate up");
  await device.clickOnByAccessibilityID("User settings");
  const accountID = await device.grabTextFromAccessibilityId("Account ID");

  return { userName, accountID, recoveryPhrase };
};
