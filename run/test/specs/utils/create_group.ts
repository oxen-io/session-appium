import { User } from './create_account';
import { newContact } from './create_contact';
import { sendMessage } from './send_message';
import { clickOnElement, inputText, selectByText } from './utilities';
import { PromiseWebdriver } from 'wd';

export const createGroup = async (
  device1: PromiseWebdriver,
  userA: User,
  device2: PromiseWebdriver,
  userB: User,
  device3: PromiseWebdriver,
  userC: User,
  groupName: string
) => {
  const message = 'User A to group';
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
  // Send message from User a to group to verify all working
  await sendMessage(device1, message);
};
