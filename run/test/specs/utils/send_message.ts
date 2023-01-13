import { clickOnElement, inputText } from '.';
import { AppiumNextDeviceType } from '../../../../appium_next';
import { waitForElementToBePresent } from './wait_for';

export const sendMessage = async (
  device: AppiumNextDeviceType,
  message: string
) => {
  await inputText(device, 'Message input box', message);
  // Click send
  await clickOnElement(device, 'Send message button');
  // Wait for tick
  await waitForElementToBePresent(device, 'Message sent status tick');

  return message;
};
