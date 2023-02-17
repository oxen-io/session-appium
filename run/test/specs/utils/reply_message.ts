import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { User } from "../../../types/testing";

export const replyToMessage = async (
  device: DeviceWrapper,
  user: User,
  body: string
) => {
  // Reply to media message from user B
  // Long press on imageSent element
  await device.longPressMessage(body);
  // Select 'Reply' option
  await device.clickOnElement("Reply to message");
  // Send message
  const sentMessage = await device.sendMessage(
    `${user.userName} message reply`
  );

  return sentMessage;
};
