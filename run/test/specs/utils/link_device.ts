import { newUser } from "./create_account";
import { SupportedPlatformsType } from "./open_app";
import {
  sleepFor,
  waitForElementToBePresent,
  clickOnElement,
  inputText,
} from ".";
import wd from "wd";

export const linkedDevice = async (
  device1: wd.PromiseWebdriver,
  device2: wd.PromiseWebdriver,
  userName: string,
  platform: SupportedPlatformsType
) => {
  const user = await newUser(device1, userName, platform);
  // Log in with recovery seed on device 2
  await clickOnElement(device2, "Link a device");
  // Enter recovery phrase into input box
  await inputText(device2, "Enter your recovery phrase", user.recoveryPhrase);
  // Continue with recovery phrase
  await clickOnElement(device2, "Continue");
  // Wait for any notifications to disappear
  await waitForElementToBePresent(device2, "Message Notifications");
  // Wait for transitiion animation between the two pages
  await sleepFor(250);
  // Click continue on message notification settings
  await clickOnElement(device2, "Continue with settings");
  // Check that button was clicked
  await waitForElementToBePresent(device2, "New conversation button");
  console.warn("Device 3 linked");

  return user;
};
