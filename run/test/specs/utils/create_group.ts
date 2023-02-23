import { Group, User } from "../../../types/testing";
import { newContact } from "./create_contact";
import { runOnlyOnIOS, runOnlyOnAndroid } from ".";
import { DeviceWrapper } from "../../../types/DeviceWrapper";
import { SupportedPlatformsType } from "./open_app";

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
  await device1.navigateBack(platform);
  await device2.navigateBack(platform);
  // Create contact between User A and User C
  await newContact(platform, device1, userOne, device3, userThree);
  // Exit conversation back to list
  await device1.navigateBack(platform);
  // Exit conversation back to list
  await device3.navigateBack(platform);
  // Click plus button
  await device1.clickOnElement("New conversation button");
  // Select Closed Group option
  await device1.clickOnElement("Create group");
  // Type in group name
  await device1.inputText("Group name input", userName);
  // Select User B and User C
  await device1.selectByText("Contact", userTwo.userName);
  await device1.selectByText("Contact", userThree.userName);
  // Select tick
  await device1.clickOnElement("Create group");
  await runOnlyOnIOS(platform, () =>
    device1.findConfigurationMessage("Group created")
  );
  await runOnlyOnAndroid(platform, () =>
    device1.findConfigurationMessage("You created a new group.")
  );
  // Send message from User a to group to verify all working
  await device1.sendMessage(userAMessage);
  // Check group was created in device 2 by selecting group from list

  await device2.sendMessageTo(userTwo, group);
  await device3.sendMessageTo(userThree, group);

  return { userName, userOne, userTwo, userThree };
};
