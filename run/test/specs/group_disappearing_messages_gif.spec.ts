import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

iosIt('Disappearing GIF to group', disappearingGifMessageGroup);
androidIt('Disappearing GIF to group', disappearingGifMessageGroup);

// bothPlatformsIt("Send disappearing GIF to group", disappearingGifMessageGroup);

async function disappearingGifMessageGroup(platform: SupportedPlatformsType) {
  const testGroupName = 'Disappear after sent test';
  const testMessage = "Testing disappearing messages for GIF's";
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
  // Click on attachments button
  await device1.sendGIF(testMessage);
  if (platform === 'ios') {
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
  }
  if (platform === 'android') {
    await Promise.all([
      device2.waitForTextElementToBePresent({
        strategy: 'accessibility id',
        selector: 'Media message',
      }),
      device3.waitForTextElementToBePresent({
        strategy: 'accessibility id',
        selector: 'Media message',
      }),
    ]);
  }
  // Wait for 30 seconds
  await sleepFor(30000);
  // Check if GIF has been deleted on both devices
  if (platform === 'ios') {
    await Promise.all(
      [device1, device2, device3].map(device =>
        device.hasElementBeenDeleted({
          strategy: 'accessibility id',
          selector: 'Message body',
          maxWait: 1000,
          text: testMessage,
        })
      )
    );
  }
  if (platform === 'android') {
    await Promise.all(
      [device1, device2, device3].map(device =>
        device.hasElementBeenDeleted({
          strategy: 'accessibility id',
          selector: 'Media message',
          maxWait: 1000,
        })
      )
    );
  }

  await closeApp(device1, device2, device3);
}
