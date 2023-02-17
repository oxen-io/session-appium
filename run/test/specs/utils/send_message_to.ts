import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { Group, User } from "../../../types/testing";

export const sendMessageTo = async (
  device: DeviceWrapper,
  sender: User,
  receiver: User | Group
) => {
  const message = `'${sender.userName}' to ${receiver.userName}`;
  await device.waitForTextElementToBePresent(
    "Conversation list item",
    receiver.userName
  );
  await device.selectByText("Conversation list item", receiver.userName);
  console.log(`'${sender.userName}' + " sent message to ${receiver.userName}`);
  await device.sendMessage(message);
};
