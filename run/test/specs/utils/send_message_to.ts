import * as wd from "wd";
import { selectByText } from ".";
import { User } from "../../../types/testing";
import { sendMessage } from "./send_message";
import { waitForTextElementToBePresent } from "./wait_for";

export const sendMessageTo = async (
  device: wd.PromiseWebdriver,
  sender: User,
  receiver: string
) => {
  const message = `'${sender.userName}' to ${receiver}`;
  await waitForTextElementToBePresent(
    device,
    "Conversation list item",
    receiver
  );
  await selectByText(device, "Conversation list item", receiver);
  console.log(`'${sender.userName}' + " sent message to ${receiver}`);
  await sendMessage(device, message);
};
