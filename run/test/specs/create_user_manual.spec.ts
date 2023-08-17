import { iosIt, androidIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import {
  closeApp,
  openAppTwoDevices,
  SupportedPlatformsType,
} from './utils/open_app';

async function manualTestSetupTwoUsers(platform: SupportedPlatformsType) {
  const { server, device1, device2 } = await openAppTwoDevices(platform);

  const [userA, userB] = await Promise.all([
    newUser(device1, 'User A', platform),
    newUser(device2, 'User B', platform),
  ]);

  await newContact(device1, userA, device2, userB);

  await device1.setImplicitWaitTimeout(50000);
  console.log('Waiting for manual tests');

  await device2.setImplicitWaitTimeout(50000);
  console.log('waiting for manual tests');

  await closeApp(server, device1, device2);
}

describe.skip('Manual test setup', () => {
  iosIt('Manual test', manualTestSetupTwoUsers);
  androidIt('Manual test', manualTestSetupTwoUsers);
});
