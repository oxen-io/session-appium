import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

iosIt('Disappearing message video group', disappearingVideoMessageGroup);
androidIt('Disappearing message video group', disappearingVideoMessageGroup);

// bothPlatformsIt(
//   "Send disappearing video to group",
//   disappearingVideoMessageGroup
// );

async function disappearingVideoMessageGroup(platform: SupportedPlatformsType) {
  const testMessage = 'Testing disappearing messages for videos';
  // const bestDayOfYear = `198809090700.00`;
  const testGroupName = 'Test group';
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  await setDisappearingMessage(platform, device1, ['Group', 'Disappear after send option']);
  // await device1.navigateBack(platform);
  switch (platform) {
    case 'ios': {
      await device1.sendVideoiOS(testMessage);
    }
    case 'android': {
      await device1.sendVideoAndroid();
    }
  }
  await sleepFor(30000);
  await Promise.all([
    device1.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      maxWait: 1000,
      text: testMessage,
    }),
    device2.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      maxWait: 1000,
      text: testMessage,
    }),
    device3.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      maxWait: 1000,
      text: testMessage,
    }),
  ]);
  await closeApp(device1, device2, device3);
}
