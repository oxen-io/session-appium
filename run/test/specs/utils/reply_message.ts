import { User } from '../../../types/testing';
import { longPressMessage, clickOnElement, sendMessage } from '.';
import { AppiumNextDeviceType } from '../../../../appium_next';

export const replyToMessage = async (
  device: AppiumNextDeviceType,
  user: User,
  body: string
) => {
  // Reply to media message from user B
  // Long press on imageSent element
  await longPressMessage(device, body);
  // Select 'Reply' option
  await clickOnElement(device, 'Reply to message');
  // Send message
  const sentMessage = await sendMessage(
    device,
    `${user.userName} message reply`
  );

  return sentMessage;
};
