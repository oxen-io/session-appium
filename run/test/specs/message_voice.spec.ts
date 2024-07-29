import { XPATHS } from '../../constants';
import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { SupportedPlatformsType, openAppTwoDevices, closeApp } from './utils/open_app';

iosIt('Send voice message 1:1', sendVoiceMessageIos);
androidIt('Send voice message 1:1', sendVoiceMessageAndroid);

async function sendVoiceMessageIos(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  const replyMessage = `Replying to voice message from ${userA.userName}`;
  await newContact(platform, device1, userA, device2, userB);
  // Select voice message button to activate recording state
  await device1.pressAndHold('New voice message');
  await device1.modalPopup('Allow', 1000);
  await device1.pressAndHold('New voice message');
  await sleepFor(500);
  await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Voice message',
  });

  await device2.clickOnByAccessibilityID('Untrusted attachment message');
  await sleepFor(200);
  await device2.clickOnByAccessibilityID('Download');
  await sleepFor(500);
  await device2.longPress('Voice message');
  await device2.clickOnByAccessibilityID('Reply to message');
  await device2.sendMessage(replyMessage);

  await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Message body',
    text: replyMessage,
  });
  await closeApp(device1, device2);
}

async function sendVoiceMessageAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // create user a and user b
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  const replyMessage = `Replying to voice message from ${userA.userName}`;
  await newContact(platform, device1, userA, device2, userB);
  // Select voice message button to activate recording state
  await device1.longPress('New voice message');

  await device1.clickOnByAccessibilityID('Continue');
  await device1.clickOnElementXPath(XPATHS.VOICE_TOGGLE);
  await device1.pressAndHold('New voice message');
  // await device1.waitForTextElementToBePresent("Voice message");
  await device2.clickOnByAccessibilityID('Untrusted attachment message');
  await sleepFor(200);
  await device2.clickOnByAccessibilityID('Download media');
  await sleepFor(1500);
  await device2.longPress('Voice message');
  await device2.clickOnByAccessibilityID('Reply to message');
  await device2.sendMessage(replyMessage);
  await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Message body',
    text: replyMessage,
  });
  await closeApp(device1, device2);
}
