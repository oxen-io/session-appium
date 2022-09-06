import { clickOnElement, inputText } from "./utils/utilities";
import { newUser } from "./utils/create_account";
import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from "./utils/open_app";
import { sendNewMessage } from "./utils/send_new_message";
import { androidIt, iosIt } from "../../types/sessionIt";

async function runOnPlatform(platform: SupportedPlatformsType) {
  // first we want to install the app on each device with our custom call to run it
  const { server, device1, device2 } = await openAppTwoDevices(platform);

  const [userA, userB] = await Promise.all([
    newUser(device1, "User A"),
    newUser(device2, "User B"),
  ]);

  // USER A WORKFLOW
  // Send message from User A to User B
  // Click new conversation button
  await sendNewMessage(device1, userB);
  // Wait for response

  // USER B WORKFLOW
  // Click on message request panel
  await clickOnElement(device2, "Message requests banner");
  // Select message from User A
  await clickOnElement(device2, "Message request");
  // Type into message input box
  await inputText(
    device2,
    "Message input box",
    "Test-message-User-B-to-User-A"
  );
  // Click send
  await clickOnElement(device2, "Send message button");
  // Wait for tick
  await closeApp(server, device1, device2);
}

describe("Create contact", () => {
  iosIt("Create contact", runOnPlatform);
  androidIt("Create contact", runOnPlatform);
});
