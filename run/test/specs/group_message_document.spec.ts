import { androidIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';

// ios("Send document to group", sendDocumentGroupiOS);
androidIt('Send document to group', sendDocumentGroupAndroid);
// async function sendDocumentGroupiOS(platform: SupportedPlatformsType) {
//   const testGroupName = "Message checks for groups";
//   const { device1, device2, device3 } = await openAppThreeDevices(platform);
//   // Create users A, B and C
//   const [userA, userB, userC] = await Promise.all([
//     newUser(device1, "Alice", platform),
//     newUser(device2, "Bob", platform),
//     newUser(device3, "Charlie", platform),
//   ]);

//   // Create contact between User A and User B
//   await createGroup(
//     platform,
//     device1,
//     userA,
//     device2,
//     userB,
//     device3,
//     userC,
//     testGroupName
//   );
// }

async function sendDocumentGroupAndroid(platform: SupportedPlatformsType) {
  const testGroupName = 'Message checks for groups';
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  // Create contact between User A and User B
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  const replyMessage = `Replying to document from ${userA.userName} in ${testGroupName}`;
  await device1.sendDocument(platform);
  // Reply to message
  await sleepFor(1000);
  // Check document appears in both device 2 and 3's screen
  await Promise.all([
    device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Document',
    }),
    await device3.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Document',
    }),
  ]);
  // Reply to document from user B
  await device2.longPress('Document');
  await device2.clickOnByAccessibilityID('Reply to message');
  await device2.sendMessage(replyMessage);
  // Check reply from device 2 came through on device1 and device3
  await Promise.all([
    device1.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: replyMessage,
    }),
    device3.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: replyMessage,
    }),
  ]);
  // Close app and server
  await closeApp(device1, device2, device3);
}
