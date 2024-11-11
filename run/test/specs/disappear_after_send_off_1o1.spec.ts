import { bothPlatformsIt } from '../../types/sessionIt';
import {
  DisappearActions,
  DISAPPEARING_TIMES,
  DisappearModes,
  USERNAME,
} from '../../types/testing';
import { DisappearingMessagesMenuOption } from './locators';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { checkDisappearingControlMessage } from './utils/disappearing_control_messages';
import { linkedDevice } from './utils/link_device';
import { closeApp, openAppThreeDevices, SupportedPlatformsType } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

bothPlatformsIt('Disappear after send off 1o1', 'high', disappearAfterSendOff1o1);

async function disappearAfterSendOff1o1(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  await linkedDevice(device1, device3, USERNAME.ALICE, platform);
  const mode: DisappearModes = 'send';
  const testMessage = `Checking disappear after ${mode} is working and can be turned off`;
  const controlMode: DisappearActions = 'sent';
  const time = DISAPPEARING_TIMES.THIRTY_SECONDS;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, USERNAME.ALICE, platform),
    newUser(device2, USERNAME.BOB, platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  // Select disappearing messages option
  await setDisappearingMessage(
    platform,
    device1,
    ['1:1', `Disappear after ${mode} option`, time],
    device2
  );
  // Get control message based on key from json file
  await checkDisappearingControlMessage(
    platform,
    userA,
    userB,
    device1,
    device2,
    time,
    controlMode
  );
  // Send message to verify that deletion is working
  await device1.sendMessage(testMessage);
  // Check message appears on both device 2 and linked device 3
  await Promise.all([
    device2.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: testMessage,
    }),
    device3.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: testMessage,
    }),
  ]);
  // Wait for message to disappear
  await sleepFor(30000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: testMessage,
    }),
    device3.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      text: testMessage,
    }),
  ]);
  // Turned off disappearing messages on device 1
  await device1.clickOnElementAll({ strategy: 'accessibility id', selector: 'More options' });
  await device1.clickOnElementAll(new DisappearingMessagesMenuOption(device1));
  await device1.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Off',
  });
  await device1.clickOnElementAll({ strategy: 'accessibility id', selector: 'Set button' });
  // Check control message for turning off disappearing messages
  // await device1.disappearingControlMessage(
  await closeApp(device1, device2, device3);
}
