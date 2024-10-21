import { bothPlatformsIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { SupportedPlatformsType, openAppTwoDevices, closeApp } from './utils/open_app';

bothPlatformsIt('Unsend message', 'high', unsendMessage);

async function unsendMessage(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);

  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // send message from User A to User B
  const sentMessage = await device1.sendMessage('Checking unsend functionality');
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
  await device1.clickOnByAccessibilityID('Delete for everyone');
  // Look in User B's chat for alert 'This message has been deleted?'
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Deleted message',
    maxWait: 5000,
  });

  // Excellent
  await closeApp(device1, device2);
}
