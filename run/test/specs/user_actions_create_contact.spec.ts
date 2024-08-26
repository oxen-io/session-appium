import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { linkedDevice } from './utils/link_device';
import { SupportedPlatformsType, closeApp, openAppMultipleDevices } from './utils/open_app';

iosIt('Create contact ios', createContact);
androidIt('Create contact android', createContact);

// bothPlatformsIt("Create contact ios", createContact);

async function createContact(platform: SupportedPlatformsType) {
  // first we want to install the app on each device with our custom call to run it
  // const testEnv = await createBasicTestEnvironment(platform);
  // const [device1, device3] = testEnv.devices;
  // const userB = testEnv.Bob;
  const [device1, device2, device3] = await openAppMultipleDevices(platform, 3);
  const userA = await linkedDevice(device1, device3, 'Alice', platform);
  const userB = await newUser(device2, 'Bob', platform);

  await newContact(platform, device1, userA, device2, userB);
  await device1.navigateBack(platform);
  await device2.navigateBack(platform);
  // Check username has changed from session id on both device 1 and 3
  await Promise.all([
    device1.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Conversation list item',
      text: userB.userName,
    }),
    device3.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Conversation list item',
      text: userB.userName,
    }),
  ]);
  // Check contact is added to contacts list on device 1 and 3 (linked device)
  // await Promise.all([
  //   device1.clickOnElementAll({
  //     strategy: "accessibility id",
  //     selector: "New conversation button",
  //   }),
  //   device3.clickOnElementAll({
  //     strategy: "accessibility id",
  //     selector: "New conversation button",
  //   }),
  // ]);

  // NEED CONTACT ACCESSIBILITY ID TO BE ADDED
  // await Promise.all([
  //   device1.waitForTextElementToBePresent({
  //     strategy: "accessibility id",
  //     selector: "Contacts",
  //   }),
  //   device3.waitForTextElementToBePresent({
  //     strategy: "accessibility id",
  //     selector: "Contacts",
  //   }),
  // ]);

  // Wait for tick
  await closeApp(device1, device2, device3);
}
