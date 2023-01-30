import { androidIt, iosIt } from "../../types/sessionIt";
import {
  findElementByAccessibilityId,
  grabTextFromAccessibilityId,
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

  const el = await waitForElementToBePresent(device, "Create session ID");
  const text = await grabTextFromAccessibilityId(device, "Create session ID");
  console.log("Text is: ", text);
}

describe("Tiny test", async () => {
  await iosIt("Tiny test", tinyTest);
  await androidIt("Tiny test", tinyTest);
});
