import {
  clickOnElement,
  findConfigurationMessage,
  inputText,
} from './utilities';
import { User } from './create_account';
import { sendNewMessage } from './send_new_message';
import { sendMessage } from './send_message';
import { PromiseWebdriver } from 'wd';

export const newContact = async (
  device1: PromiseWebdriver,
  user1: User,
  device2: PromiseWebdriver,
  user2: User,
) => {
  await sendNewMessage(device1, user2, 'howdy');

  // USER B WORKFLOW
  // Click on message request panel
  // Wait for push notification to disappear (otherwise appium can't find element)
  await device2.setImplicitWaitTimeout(20000);
  await clickOnElement(device2, 'Message requests banner');
  // Select message from User A
  await device2.setImplicitWaitTimeout(10000);
  await clickOnElement(device2, 'Message request');
  // Type into message input box
  await sendMessage(
    device2,
    `Reply-message-${user2.userName}-to-${user1.userName}`,
  );

  // Verify config message states message request was accepted
  await findConfigurationMessage(
    device1,
    'Your message request has been accepted.',
  );

  console.warn(`${user1.userName} and ${user2.userName} are now contacts`);
  return { user1, user2, device1, device2 };
};
