import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';

import { openAppTwoDevices, SupportedPlatformsType } from './utils/open_app';

async function tinyTest(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);
  // Get information about what appium actions are
  // const selector = device1.click('');
  // console.log(selector);
  const message = 'Testing message';
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);

  // await newContact(device1, userA, device2, userB);

  // await sendMessage(device1, message);
  // await sendMessage(device1, message);

  // await findLastElementInArray(device1, "Message Body");
}

describe('Tiny test', async () => {
  await iosIt('Tiny test', tinyTest);
  await androidIt('Tiny test', tinyTest);
});
