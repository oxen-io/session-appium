import { User } from '../../../types/testing';
import { newContact } from './create_contact';
import {
  clickOnElement,
  findConfigurationMessage,
  inputText,
  selectByText,
  sendMessageTo,
  sendMessage,
} from '.';
import { AppiumNextDeviceType } from '../../../../appium_next';

export const createGroup = async (
  device1: AppiumNextDeviceType,
  userA: User,
  device2: AppiumNextDeviceType,
  userB: User,
  device3: AppiumNextDeviceType,
  userC: User,
  groupName: string
) => {
  const userAMessage = `${userA.userName} to group`;
  // Create contact between User A and User B
  await newContact(device1, userA, device2, userB);
  await clickOnElement(device1, 'Back');
  await clickOnElement(device2, 'Back');
  // Create contact between User A and User C
  await newContact(device1, userA, device3, userC);
  // Exit conversation back to list
  await clickOnElement(device1, 'Back');
  // Exit conversation back to list
  await clickOnElement(device3, 'Back');
  // Click plus button
  await clickOnElement(device1, 'New conversation button');
  // Select Closed Group option
  await clickOnElement(device1, 'Create group');
  // Type in group name
  await inputText(device1, 'Group name input', groupName);
  // Select User B and User C
  await selectByText(device1, 'Contact', userB.userName);
  await selectByText(device1, 'Contact', userC.userName);
  // Select tick
  await clickOnElement(device1, 'Create group');
  await findConfigurationMessage(device1, 'Group created');
  // Send message from User a to group to verify all working
  await sendMessage(device1, userAMessage);
  // Check group was created in device 2 by selecting group from list
  await Promise.all([
    sendMessageTo(device2, userB, groupName),
    sendMessageTo(device3, userC, groupName),
  ]);
};
