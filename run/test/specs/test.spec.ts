import { androidIt, iosIt } from "../../types/sessionIt";
import { newUser } from "./utils/create_account";
import { newContact } from "./utils/create_contact";

import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { sendNewMessage } from "./utils/send_new_message";
import {
  clickOnElement,
  deleteText,
  inputText,
  longPress,
  runOnlyOnIOS,
  swipeLeft,
} from "./utils/utilities";

async function tinyTest(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);

  const userA = await newUser(device1, "Alice", platform);
  const userc = await newUser(device2, "Bob", platform);

  console.warn(`${userc.userName}`);

  await newContact(device1, userA, device2, userc);
}

describe("Tiny test", () => {
  iosIt("Tiny test", tinyTest);
  androidIt("Tiny test", tinyTest);
});
