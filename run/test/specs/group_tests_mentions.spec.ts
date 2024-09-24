import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { createGroup } from './utils/create_group';
import { SupportedPlatformsType, closeApp, openAppThreeDevices } from './utils/open_app';

iosIt('Mentions for groups', mentionsForGroups);
androidIt('Mentions for groups', mentionsForGroups);

async function mentionsForGroups(platform: SupportedPlatformsType) {
  const { device1, device2, device3 } = await openAppThreeDevices(platform);
  // Create users A, B and C
  const [userA, userB, userC] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
    newUser(device3, 'Charlie', platform),
  ]);
  const testGroupName = 'Mentions test group';
  // Create contact between User A and User B
  await createGroup(platform, device1, userA, device2, userB, device3, userC, testGroupName);
  await device1.mentionContact(platform, userB);
  // Check format on User B's device
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Message body',
    text: `@You`,
  });
  // await device2.findMessageWithBody(`@You`);
  // Bob to Select User C
  await device2.mentionContact(platform, userC);
  // Check Charlies device(3) for correct format
  await device3.findMessageWithBody(`@You `);
  //  Check User A format works
  await device3.mentionContact(platform, userA);
  // Check device 1 that correct format is shown (Alice's device)
  await device1.findMessageWithBody(`@You `);
  // Close app
  await closeApp(device1, device2, device3);
}
