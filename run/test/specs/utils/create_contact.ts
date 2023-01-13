import {
  sendMessage,
  clickOnElement,
  findConfigurationMessage,
  sendNewMessage,
} from '.';
import { AppiumNextDeviceType } from '../../../../appium_next';
import { User } from '../../../types/testing';

export const newContact = async (
  device1: AppiumNextDeviceType,
  user1: User,
  device2: AppiumNextDeviceType,
  user2: User
) => {
  await sendNewMessage(
    device1,
    user2,
    `${user1.userName} to ${user2.userName}`
  );

  // USER B WORKFLOW
  // Click on message request panel
  // Wait for push notification to disappear (otherwise appium can't find element)
  await clickOnElement(device2, 'Message requests banner');
  // Select message from User A
  await clickOnElement(device2, 'Message request');
  // Type into message input box
  await sendMessage(
    device2,
    `Reply-message-${user2.userName}-to-${user1.userName}`
  );

  // Verify config message states message request was accepted
  await findConfigurationMessage(
    device1,
    'Your message request has been accepted.'
  );

  console.warn(`${user1.userName} and ${user2.userName} are now contacts`);
  return { user1, user2, device1, device2 };
};
