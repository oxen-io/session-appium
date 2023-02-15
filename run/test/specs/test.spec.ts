import { androidIt, iosIt } from "../../types/sessionIt";
import {
  clickOnElement,
  findElementByAccessibilityId,
  grabTextFromAccessibilityId,
  inputText,
  longPressMessage,
  selectByText,
  sleepFor,
  waitForElementToBePresent,
} from "./utils";
import { newUser } from "./utils/create_account";
import { getTextFromElement } from "./utils/element_text";

import {
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

async function tinyTest(platform: SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  const recoveryPhrase =
    "oxygen fishing hiding optical nowhere request amply aloof rafts system fountain diode aloof";
  await clickOnElement(device, "Link a device");
  await inputText(device, "Enter your recovery phrase", recoveryPhrase);
  await clickOnElement(device, "Continue");
  await waitForElementToBePresent(device, "Message Notifications");
  await sleepFor(250);
  await clickOnElement(device, "Continue with settings");

  await selectByText(device, "Conversation list item", "Bob");
  await clickOnElement(device, "Add attachments");
  await clickOnElement(device, "Select camera button");
}

describe("Tiny test", async () => {
  await iosIt("Tiny test", tinyTest);
  await androidIt("Tiny test", tinyTest);
});
