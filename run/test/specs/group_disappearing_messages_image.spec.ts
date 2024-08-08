import { DISAPPEARING_TIMES } from '../../constants';
import { iosIt } from '../../types/sessionIt';
import { DMTimeOption } from '../../types/testing';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

iosIt('Disappearing image message to group', disappearingImageMessageGroup);

async function disappearingImageMessageGroup(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  const testMessage = 'Testing disappearing messages for images';
  const testGroupName = 'Test group';
  // Create user A and user B
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);

  await setDisappearingMessage(platform, device1, ['Group', 'Disappear after send option']);
  // await device1.navigateBack(platform);
  await device1.sendImage(platform, testMessage);
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
