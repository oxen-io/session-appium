import { newUser } from "./create_account";
import { SupportedPlatformsType } from "./open_app";
import { clickOnElement, inputText } from "./utilities";

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
  // Click continue on message notification settings
  await clickOnElement(device2, "Continue with settings");

  return user;
};
