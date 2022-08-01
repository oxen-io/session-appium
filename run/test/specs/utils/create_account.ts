import { PromiseWebdriver } from "wd";
import * as utils from "./utilities";

export const newUser = async (device: PromiseWebdriver, userName: string) => {
  // Click create session ID
  await utils.clickOnElement(device, "Create Session ID");
  // Wait for animation to generate session id
  await device.setImplicitWaitTimeout(5000);
  // save session id as variable
  const sessionID = await utils.saveText(device, "Session ID");
  console.log(sessionID);
  // Click continue on session Id creation
  await utils.clickOnElement(device, "Continue");
  // Input username
  await utils.inputText(device, "Enter display name", userName);
  // Click continue
  await utils.clickOnElement(device, "Continue");
  // Choose message notification options
  await utils.clickOnElement(device, "Continue with settings");
  // Click on 'continue' button to open recovery phrase modal
  await utils.clickOnElement(device, "Continue");
  // Long Press the recovery phrase to reveal recovery phrase
  await utils.longPress(device, "Recovery Phrase");
  // Save recovery phrase as variable
  const recoveryPhrase = await utils.saveText(device, "Recovery Phrase");
  console.log("Recovery Phrase is", recoveryPhrase);
  // Exit Modal
  await utils.clickOnElement(device, "Navigate up");

  return { userName, sessionID, recoveryPhrase };
};
