import { clickOnElement, inputText } from "./utilities";
import { sendNewMessage } from "./send_new_message";

export const newContact = async (
  device1: any,
  userA: any,
  device2: any,
  userB: any
) => {
  await sendNewMessage(device1, userB);

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
