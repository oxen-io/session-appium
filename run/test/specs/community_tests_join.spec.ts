import { testCommunityLink, testCommunityName } from '../../constants/community';
import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { joinCommunity } from './utils/join_community';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';
import { test } from '@playwright/test';

test.describe('Community tests', () => {
  iosIt('Join community test', joinCommunityTest);
  androidIt('Join community test', joinCommunityTest);
});

async function joinCommunityTest(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = `Test message + ${new Date().getTime()}`;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await Promise.all([device1.navigateBack(platform), device2.navigateBack(platform)]);
  await joinCommunity(device1, testCommunityLink, testCommunityName);
  await joinCommunity(device2, testCommunityLink, testCommunityName);
  if (platform === 'ios') {
    await device1.scrollToBottom(platform);
  }
  await device1.sendMessage(testMessage);
  await device2.scrollToBottom(platform);
  await device2.replyToMessage(userA, testMessage);
  await closeApp(device1, device2);
}
