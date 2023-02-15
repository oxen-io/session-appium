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
import { linkedDevice } from "./utils/link_device";

import {
  openAppOnPlatformSingleDevice,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";

async function tinyTest(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  await linkedDevice(device1, device2, "Alice", platform);
}

describe("Tiny test", async () => {
  await iosIt("Tiny test", tinyTest);
  await androidIt("Tiny test", tinyTest);
});
