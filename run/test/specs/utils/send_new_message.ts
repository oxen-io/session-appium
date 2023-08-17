import { clickOnElement, inputText } from './utilities';
import { PromiseWebdriver } from 'wd';

export const sendNewMessage = async (
  device: PromiseWebdriver,
  user: any,
  message: string
) => {
  // Sender workflow
  // Click on plus button
  await clickOnElement(device, 'New conversation button');
  // Select direct message option
  await clickOnElement(device, 'New direct message');
  // Enter User B's session ID into input box
  await inputText(device, 'Session id input box', user.sessionID);
  // Click next
  await clickOnElement(device, 'Next');
  // Type message into message input box

  await inputText(device, 'Message input box', message);
  // Click send
  await clickOnElement(device, 'Send message button');
  // Wait for tick
  await device.setImplicitWaitTimeout(20000);
  await device.elementByAccessibilityId('Message sent status tick');

  return message;
};
