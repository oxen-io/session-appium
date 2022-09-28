import { newContact } from "./create_contact";
import {
  clickOnElement,
  inputText,
  selectByText,
  findMessageWithBody,
} from "./utilities";

export const createGroup = async (
  device1: wd.PromiseWebdriver,
  userA: any,
  device2: wd.PromiseWebdriver,
  userB: any,
  device3: wd.PromiseWebdriver,
  userC: any,
  groupName: string
) => {
  // Create contact between User A and User B
  await newContact(device1, userA, device2, userB);
  await clickOnElement(device1, "Navigate up");
  await clickOnElement(device2, "Navigate up");
  // Create contact between User A and User C
  await newContact(device1, userA, device3, userC);
  // Exit conversation back to list
  await clickOnElement(device1, "Navigate up");
  // Exit conversation back to list
  await clickOnElement(device3, "Navigate up");
  // Click plus button
  await clickOnElement(device1, "New conversation button");
  // Select Closed Group option
  await clickOnElement(device1, "Create group");
  // Type in group name
  await inputText(device1, "Group name input", groupName);
  // Select User B and User C
  await selectByText(device1, "Contact", userB.userName);
  await selectByText(device1, "Contact", userC.userName);
  // Select tick
  await clickOnElement(device1, "Done");
};
