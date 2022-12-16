import { User } from "../../../types/testing";
import { sendNewMessage } from "./send_new_message";
import { longPressMessage, clickOnElement } from "./utilities";

export const replyToMessage = async (
  device: wd.PromiseWebdriver,
  user: User,
  selector: any
) => {
  // Reply to media message from user B
  // Long press on imageSent element
  await longPressMessage(device, selector);
  // Select 'Reply' option
  await clickOnElement(device, "Reply to message");
  // Send message
  const sentMessage = await sendNewMessage(device, user, "howdy");

  return sentMessage;
};
