import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";
import { linkedDevice } from "./utils/link_device";

import {
  closeApp,
  openAppOnPlatformSingleDevice,
  openAppThreeDevices,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { sendMessage } from "./utils/send_message";
import { sendNewMessage } from "./utils/send_new_message";
import {
  clickOnElement,
  deleteText,
  findElement,
  findLastElementInArray,
  findMatchingTextInElementArray,
  inputText,
  longPress,
  runOnlyOnIOS,
  swipeLeft,
} from "./utils/index";

async function tinyTest(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Get information about what appium actions are
  const selector = device1.click();
  console.log(selector);
  const message = "Testing message";
  const [userA, userB] = await Promise.all([
    newUser(device1, "Alice", platform),
    newUser(device2, "Bob", platform),
  ]);

  // await newContact(device1, userA, device2, userB);

  // await sendMessage(device1, message);
  // await sendMessage(device1, message);

  // await findLastElementInArray(device1, "Message Body");
}

describe("Tiny test", () => {
  iosIt("Tiny test", tinyTest);
  androidIt("Tiny test", tinyTest);
});
