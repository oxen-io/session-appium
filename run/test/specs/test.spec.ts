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
  longPress,
  runOnlyOnIOS,
  swipeLeft,
} from "./utils/utilities";

async function tinyTest(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);

  const userA = await newUser(device1, "User A", platform);
  const userB = await newUser(device2, "User B", platform);

  const message = await sendNewMessage(device1, userB, "howdy");

  // await runOnlyOnIOS(platform, () =>
  //   swipeLeft(device1, "Conversation list item", userB.userName)
  // );

  console.warn(userB.userName);

  await closeApp(server, device1, device2);
}

describe("Tiny test", () => {
  iosIt("Tiny test", tinyTest);
  androidIt("Tiny test", tinyTest);
});
