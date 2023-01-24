import { selectByText } from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { Group, User } from "../../../types/testing";
import { sendMessage } from "./send_message";
import { waitForTextElementToBePresent } from "./wait_for";

export const sendMessageTo = async (
  device: DeviceWrapper,
  sender: User,
  receiver: User | Group
) => {
  const message = `'${sender.userName}' to ${receiver.userName}`;
  await waitForTextElementToBePresent(
    device,
    "Conversation list item",
    receiver.userName
  );
  await selectByText(device, "Conversation list item", receiver.userName);
  console.log(`'${sender.userName}' + " sent message to ${receiver.userName}`);
  await sendMessage(device, message);
};
