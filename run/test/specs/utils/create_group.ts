import { Group, User } from "../../../types/testing";
import { newContact } from "./create_contact";
import {
  clickOnElement,
  findConfigurationMessage,
  inputText,
  selectByText,
  sendMessageTo,
  sendMessage,
  runOnlyOnIOS,
  runOnlyOnAndroid,
} from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { SupportedPlatformsType } from "./open_app";
import { navigateBack } from "./navigate_back";

export const createGroup = async (
  platform: SupportedPlatformsType,
  device1: DeviceWrapper,
  userOne: User,
  device2: DeviceWrapper,
  userTwo: User,
  device3: DeviceWrapper,
  userThree: User,
  userName: string
): Promise<Group> => {
  const group: Group = { userName, userOne, userTwo, userThree };

  const userAMessage = `${userOne.userName} to group`;
  // Create contact between User A and User B
  await newContact(platform, device1, userOne, device2, userTwo);
  await navigateBack(device1, platform);
  await navigateBack(device2, platform);
  // Create contact between User A and User C
  await newContact(platform, device1, userOne, device3, userThree);
  // Exit conversation back to list
  await navigateBack(device1, platform);
  // Exit conversation back to list
  await navigateBack(device3, platform);
  // Click plus button
  await clickOnElement(device1, "New conversation button");
  // Select Closed Group option
  await clickOnElement(device1, "Create group");
  // Type in group name
  await inputText(device1, "Group name input", userName);
  // Select User B and User C
  await selectByText(device1, "Contact", userTwo.userName);
  await selectByText(device1, "Contact", userThree.userName);
  // Select tick
  await clickOnElement(device1, "Create group");
  await runOnlyOnIOS(platform, () =>
    findConfigurationMessage(device1, "Group created")
  );
  await runOnlyOnAndroid(platform, () =>
    findConfigurationMessage(device1, "You created a new group.")
  );
  // Send message from User a to group to verify all working
  await sendMessage(device1, userAMessage);
  // Check group was created in device 2 by selecting group from list

  await sendMessageTo(device2, userTwo, group);
  await sendMessageTo(device3, userThree, group);

  return { userName, userOne, userTwo, userThree };
};
