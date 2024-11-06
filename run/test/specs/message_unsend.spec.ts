import { androidIt, iosIt } from '../../types/sessionIt';
import { USERNAME } from '../../types/testing';
import {
  DeleteMessageConfirmationModal,
  DeleteMessageForEveryone,
  DeleteMessageLocally,
} from './locators';
import { runOnlyOnAndroid } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { SupportedPlatformsType, openAppTwoDevices, closeApp } from './utils/open_app';

iosIt('Unsend message', unsendMessage);
androidIt('Unsend message', unsendMessage);

async function unsendMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = 'Checking unsend functionality';
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, USERNAME.ALICE, platform),
    newUser(device2, USERNAME.BOB, platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // send message from User A to User B
  const sentMessage = await device1.sendMessage(testMessage);
  // await sleepFor(1000);
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Message body',
    text: sentMessage,
  });
  await device1.longPressMessage(sentMessage);
  // Select Delete icon
  await device1.clickOnByAccessibilityID('Delete message');
  // Select 'Delete for me and User B'
  await device1.clickOnElementAll(new DeleteMessageForEveryone(device1));
  // Select 'Delete' on Android
  await runOnlyOnAndroid(platform, () =>
    device1.clickOnElementAll(new DeleteMessageConfirmationModal(device1))
  );
  // Check for 'deleted message' message
  if (platform === 'android') {
    await Promise.all([
      device1.waitForTextElementToBePresent({
        strategy: 'accessibility id',
        selector: 'Deleted message',
        maxWait: 8000,
      }),
      device2.waitForTextElementToBePresent({
        strategy: 'accessibility id',
        selector: 'Deleted message',
        maxWait: 8000,
      }),
    ]);
  } else {
    await device1.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: sentMessage,
    });
    await device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Deleted message',
      maxWait: 8000,
    });
  }
  // Excellent
  await closeApp(device1, device2);
}
