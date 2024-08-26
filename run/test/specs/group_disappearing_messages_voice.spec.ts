import { androidIt, iosIt } from '../../types/sessionIt';
import { GroupName } from '../../types/testing';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

iosIt('Disappearing voice message to group', disappearingVoiceMessageGroup);
androidIt('Disappearing voice message to group', disappearingVoiceMessageGroup);

// bothPlatformsIt(
//   "Send disappearing voice message to group",
//   disappearingVoiceMessageGroup
// );

async function disappearingVoiceMessageGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const testGroupName: GroupName = 'Testing voice messages in groups for disappearing messages';
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  await setDisappearingMessage(platform, device1, ['Group', 'Disappear after send option']);
  // await device1.navigateBack(platform);
  await device1.longPress('New voice message');
  await device1.modalPopup({ strategy: 'accessibility id', selector: 'Allow' });
  await device1.pressAndHold('New voice message');
  await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Voice message',
  });
  await sleepFor(10000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Voice message',
      maxWait: 1000,
    }),
    device2.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Voice message',
      maxWait: 1000,
    }),
    device2.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Voice message',
      maxWait: 1000,
    }),
  ]);
  await closeApp(device1, device2, device3);
}
