import { DISAPPEARING_TIMES } from '../../constants';
import { androidIt, iosIt } from '../../types/sessionIt';
import { DownloadMediaButton } from './locators';
import { runOnlyOnAndroid, runOnlyOnIOS, sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

iosIt('Disappearing video message 1:1', disappearingVideoMessage1o1);
androidIt('Disappearing video message 1:1', disappearingVideoMessage1o1);

const time = DISAPPEARING_TIMES.THIRTY_SECONDS;
const timerType = 'Disappear after send option';
const testMessage = 'Testing disappearing messages for videos';

async function disappearingVideoMessage1o1(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(platform, device1, ['1:1', timerType, time], device2);
  await runOnlyOnIOS(platform, () => device1.sendVideoiOS(testMessage));
  await runOnlyOnAndroid(platform, () => device1.sendVideoAndroid());
  await device2.clickOnByAccessibilityID('Untrusted attachment message', 5000);
  await device2.clickOnElementAll(new DownloadMediaButton(device2));
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
      selector: 'Media message',
    })
  );
  // Wait for 30 seconds
  await sleepFor(30000);
  if (platform === 'ios') {
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
    ]);
  }
  if (platform === 'android') {
    await Promise.all([
      device1.hasElementBeenDeleted({
        strategy: 'accessibility id',
        selector: 'Media message',
      }),
      device2.hasElementBeenDeleted({
        strategy: 'accessibility id',
        selector: 'Media message',
      }),
    ]);
  }
  await closeApp(device1, device2);
}
