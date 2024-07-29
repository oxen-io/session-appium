import { DISAPPEARING_TIMES, XPATHS } from '../../constants';
import { androidIt, iosIt } from '../../types/sessionIt';
import {
  DMTimeOption,
  DisappearActions,
  DisappearModes,
  InteractionPoints,
} from '../../types/testing';
import { clickOnCoordinates, sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { SupportedPlatformsType, openAppTwoDevices, closeApp } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

iosIt('Disappearing GIF message 1o1', disappearingGifMessage1o1Ios);
androidIt('Disappearing GIF message 1o1', disappearingGifMessage1o1Android);

async function disappearingGifMessage1o1Ios(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = "Testing disappearing messages for GIF's";
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(platform, device1, ['1:1', 'Disappear after read option'], device2);
  // await device1.navigateBack(platform);

  // Click on attachments button
  await device1.clickOnByAccessibilityID('Attachments button');
  // Select GIF tab
  await clickOnCoordinates(device1, InteractionPoints.GifButtonKeyboardClosed);
  // Select gif
  await sleepFor(500);
  // Need to select Continue on GIF warning
  await device1.clickOnByAccessibilityID('Continue');
  await device1.clickOnElementAll({
    strategy: 'xpath',
    selector: XPATHS.FIRST_GIF,
  });
  await device1.clickOnByAccessibilityID('Text input box');
  await device1.inputText('accessibility id', 'Text input box', testMessage);
  await device1.clickOnByAccessibilityID('Send button');
  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnByAccessibilityID('Untrusted attachment message');
  await sleepFor(100);
  // Click on 'download'
  await device2.clickOnByAccessibilityID('Download media');
  // Wait for 60 seconds
  await sleepFor(30000);
  // Check if GIF has been deleted on both devices
  await device1.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Message body',
    maxWait: 1000,
    text: testMessage,
  });
  await device2.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Message body',
    maxWait: 1000,
    text: testMessage,
  });
  await closeApp(device1, device2);
}

async function disappearingGifMessage1o1Android(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const controlMode: DisappearActions = 'sent';
  const mode: DisappearModes = 'send';
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(
    platform,
    device1,
    ['1:1', `Disappear after ${mode} option`],
    device2
  ); // Wait for control messages to disappear before sending image (to check if the control messages are interfering with finding the untrusted attachment message)
  // TODO FIX
  // await device2.disappearingControlMessage(
  //   `${userA.userName} has set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // await device2.disappearingControlMessage(
  //   `You set messages to disappear ${time} after they have been ${controlMode}.`
  // );
  // await sleepFor(60000);
  // Click on attachments button
  await device1.clickOnByAccessibilityID('Attachments button');
  // Select GIF tab
  await device1.clickOnByAccessibilityID('GIF button');
  await device1.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Continue',
  });
  // Select gif
  await sleepFor(500);
  await device1.clickOnElementXPath(XPATHS.FIRST_GIF);
  // Check if the 'Tap to download media' config appears
  // Click on config
  await device2.clickOnByAccessibilityID('Untrusted attachment message');
  // Click on 'download'
  await device2.clickOnByAccessibilityID('Download media');
  // Wait for 30 seconds (time)
  await sleepFor(30000);
  // Check if GIF has been deleted on both devices
  await device1.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Media message',
    maxWait: 1000,
  });
  await device2.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Media message',
    maxWait: 1000,
  });
  await closeApp(device1, device2);
}
