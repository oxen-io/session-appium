import {
  clickOnElement,
  inputText,
  saveText,
  pressAndHold,
  runOnlyOnIOS,
  runOnlyOnAndroid,
  saveTextFromClipboard,
  getSessionID,
  tapOnElement,
} from "./utilities";
import * as wd from "wd";
import { SupportedPlatformsType } from "./open_app";
import { iosIt } from "../../../types/sessionIt";

export const newUser = async (
  device: wd.PromiseWebdriver,
  userName: string,
  platform: SupportedPlatformsType
) => {
  // Click create session ID
  console.warn("232323");
  await device.setImplicitWaitTimeout(5000);
  await clickOnElement(device, "Create Session ID");

  // Wait for animation to generate session id
  await device.setImplicitWaitTimeout(5000);
  console.warn("4444");
  // save session id as variable

  const sessionID = await getSessionID(platform, device);

  console.log(`sessionID found: "${sessionID}" "${platform}"`);

  // Click continue on session Id creation
  await clickOnElement(device, "Continue");
  // Input username
  await inputText(device, "Enter display name", userName);
  // Click continue
  await clickOnElement(device, "Continue");
  // Choose message notification options
  await clickOnElement(device, "Continue with settings");
  // Click on 'continue' button to open recovery phrase modal
  await device.setImplicitWaitTimeout(5000);
  await clickOnElement(device, "Continue");
  // Long Press the recovery phrase to reveal recovery phrase
  await pressAndHold(device, "Recovery Phrase");
  // Save recovery phrase as variable
  const recoveryPhrase = await saveText(device, "Recovery Phrase");
  console.log(`Recovery Phrase is "${recoveryPhrase}"`);
  // Exit Modal
  await clickOnElement(device, "Navigate up");

  return { userName, sessionID, recoveryPhrase };
};
