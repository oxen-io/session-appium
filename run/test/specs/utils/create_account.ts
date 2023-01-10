import {
  clickOnElement,
  inputText,
  saveText,
  pressAndHold,
  getSessionID,
  waitForElementToBePresent,
} from ".";
import * as wd from "wd";
import { SupportedPlatformsType } from "./open_app";
import { User } from "../../../types/testing";
import {} from "./wait_for";

export const newUser = async (
  device: wd.PromiseWebdriver,
  userName: string,
  platform: SupportedPlatformsType
): Promise<User> => {
  // Click create session ID
  await waitForElementToBePresent(device, "Create session ID");
  await clickOnElement(device, "Create session ID");
  // Wait for animation to generate session id
  await waitForElementToBePresent(device, "Session ID");

  // save session id as variable

  const sessionID = await getSessionID(platform, device);

  console.log(`${userName}s sessionID found: "${sessionID}" "${platform}"`);

  // Click continue on session Id creation
  await clickOnElement(device, "Continue");
  // Input username
  await inputText(device, "Enter display name", userName);
  // Click continue
  await clickOnElement(device, "Continue");
  // Choose message notification options
  await clickOnElement(device, "Continue with settings");
  // Click on 'continue' button to open recovery phrase modal
  await waitForElementToBePresent(device, "Continue");
  await clickOnElement(device, "Continue");
  // Long Press the recovery phrase to reveal recovery phrase
  await pressAndHold(device, "Recovery Phrase");
  // Save recovery phrase as variable
  const recoveryPhrase = await saveText(device, "Recovery Phrase");
  console.log(`${userName}s recovery phrase is "${recoveryPhrase}"`);
  // Exit Modal
  await clickOnElement(device, "Navigate up");

  return { userName, sessionID, recoveryPhrase };
};
