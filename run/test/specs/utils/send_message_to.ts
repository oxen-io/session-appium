import { selectByText } from '.';
import { AppiumNextDeviceType } from '../../../../appium_next';
import { User } from '../../../types/testing';
import { sendMessage } from './send_message';
import { waitForTextElementToBePresent } from './wait_for';

export const sendMessageTo = async (
  device: AppiumNextDeviceType,
  sender: User,
  receiver: string
) => {
  const message = `'${sender.userName}' to ${receiver}`;
  await waitForTextElementToBePresent(
    device,
    'Conversation list item',
    receiver
  );
  await selectByText(device, 'Conversation list item', receiver);
  console.log(`'${sender.userName}' + " sent message to ${receiver}`);
  await sendMessage(device, message);
};
