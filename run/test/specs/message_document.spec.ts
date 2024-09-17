import { androidIt, iosIt } from '../../types/sessionIt';
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';

iosIt('Send document 1:1', sendDocument);
androidIt('Send document 1:1', sendDocument);

async function sendDocument(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  const testMessage = 'Testing-document-1';
  const replyMessage = `Replying to document from ${userA.userName}`;
  await newContact(platform, device1, userA, device2, userB);

  await device1.sendDocument();
  await device2.clickOnByAccessibilityID('Untrusted attachment message');
  await sleepFor(500);
  // User B - Click on 'download'
  await device2.clickOnByAccessibilityID('Download media');
  // Reply to message

  await runOnlyOnIOS(platform, () =>
    device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: testMessage,
    })
  );
  await runOnlyOnAndroid(platform, () =>
    device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Document',
    })
  );

  await runOnlyOnIOS(platform, () => device2.longPressMessage(testMessage));
  await runOnlyOnAndroid(platform, () => device2.longPress('Document'));
  await device2.clickOnByAccessibilityID('Reply to message');
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Message body',
    text: replyMessage,
  });
  // Close app and server
  await closeApp(device1, device2);
}

// async function sendDocumentAndroid(platform: SupportedPlatformsType) {
//   const { device1, device2 } = await openAppTwoDevices(platform);

//   const [userA, userB] = await Promise.all([
//     newUser(device1, 'Alice', platform),
//     newUser(device2, 'Bob', platform),
//   ]);
//   const replyMessage = `Replying to document from ${userA.userName}`;
//   await newContact(platform, device1, userA, device2, userB);
//   await device1.sendDocument();
//   await device2.clickOnByAccessibilityID('Untrusted attachment message', 7000);
//   await sleepFor(500);
//   // User B - Click on 'download'
//   await device2.clickOnByAccessibilityID('Download media');
//   // Reply to message
//   // await sleepFor(5000);
//   await device2.longPress('Document');
//   await device2.clickOnByAccessibilityID('Reply to message');
//   await device2.sendMessage(replyMessage);
//   await device1.waitForTextElementToBePresent({
//     strategy: 'accessibility id',
//     selector: 'Message body',
//     text: replyMessage,
//   });
//   // Close app and server
//   await closeApp(device1, device2);
// }
