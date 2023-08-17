import { clickOnElement, inputText } from './utilities';
import { PromiseWebdriver } from 'wd';

export const sendMessage = async (
  device: PromiseWebdriver,
  message: string,
) => {
  await inputText(device, 'Message input box', message);
  // Click send
  await clickOnElement(device, 'Send message button');
  // Wait for tick
  await device.setImplicitWaitTimeout(20000);
  await device.elementByAccessibilityId('Message sent status tick');

  return message;
};
