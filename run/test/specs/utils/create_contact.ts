import {
  clickOnElement,
  findConfigurationMessage,
  inputText,
} from "./utilities";
import { sendNewMessage } from "./send_new_message";

export const newContact = async (
  device1: any,
  userA: any,
  device2: any,
  userB: any
) => {
  await sendNewMessage(device1, userB, "howdy");

  // USER B WORKFLOW
  // Click on message request panel
  // Wait for push notification to disappear (otherwise appium can't find element)
  await device2.setImplicitWaitTimeout(20000);
  await clickOnElement(device2, "Message requests banner");
  // Select message from User A
  await device2.setImplicitWaitTimeout(10000);
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
  await findConfigurationMessage(
    device1,
    "Your message request has been accepted."
  );

  return { userA, userB, device1, device2 };
};
