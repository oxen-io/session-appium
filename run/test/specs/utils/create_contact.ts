import { clickOnElement, inputText } from "./utilities";
import { newUser } from "./create_account";
import { sendMessage } from "./send_message";
import { openApp } from "./open_app";

export const newContact = async (device1: any, device2: any) => {
  const [userA, userB] = await Promise.all([
    newUser(device1, "User A"),
    newUser(device2, "User B"),
  ]);

  await sendMessage(device1, userB);

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

  // Verify config message states message request was accepted
  await device1.elementByAccessibilityId("Message request was accepted");

  return { userA, userB, device1, device2 };
};
