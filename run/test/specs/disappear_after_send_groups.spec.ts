import { DISAPPEARING_TIMES } from '../../constants';
import { englishStrippedStri } from '../../localizer/i18n/localizedString';
import { androidIt, iosIt } from '../../types/sessionIt';
import { DisappearActions, DisappearingControlMessage } from '../../types/testing';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { closeApp, openAppThreeDevices, SupportedPlatformsType } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';
iosIt('Disappear after send groups', disappearAfterSendGroups);
androidIt('Disappear after send groups', disappearAfterSendGroups);

async function disappearAfterSendGroups(platform: SupportedPlatformsType) {
  const testGroupName = 'Disappear after send test';
  const testMessage = 'Testing disappear after sent in groups';
  const controlMode: DisappearActions = 'sent';
  const time = DISAPPEARING_TIMES.THIRTY_SECONDS;
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  // Create contact between User A and User B
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);

  await setDisappearingMessage(platform, device1, ['Group', `Disappear after send option`, time]);
  // Get correct control message for You setting disappearing messages
  const disappearingMessagesSetYou = englishStrippedStri('disappearingMessagesSetYou')
    .withArgs({ time, disappearing_messages_type: controlMode })
    .toString();
  // Get correct control message for userA setting disappearing messages
  const disappearingMessagesSetControl = englishStrippedStri('disappearingMessagesSet')
    .withArgs({ name: userA.userName, time, disappearing_messages_type: controlMode })
    .toString();
  // Check control message is correct on device 2
  await Promise.all([
    device1.disappearingControlMessage(disappearingMessagesSetYou as DisappearingControlMessage),
    device2.disappearingControlMessage(
      disappearingMessagesSetControl as DisappearingControlMessage
    ),
    device3.disappearingControlMessage(
      disappearingMessagesSetControl as DisappearingControlMessage
    ),
  ]);
  // Send message to verify deletion
  await device1.sendMessage(testMessage);
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
  // Wait for 30 seconds
  await sleepFor(30000);
  // Check for test messages (should be deleted)
  await Promise.all([
    device1.hasTextElementBeenDeleted('Message body', testMessage),
    device2.hasTextElementBeenDeleted('Message body', testMessage),
    device3.hasTextElementBeenDeleted('Message body', testMessage),
  ]);
  // Close server and devices
  await closeApp(device1, device2, device3);
}
