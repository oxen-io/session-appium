import { testCommunityLink, testCommunityName } from '../../constants/community';
import { androidIt, iosIt } from '../../types/sessionIt';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { joinCommunity } from './utils/join_community';
import { SupportedPlatformsType, closeApp, openAppTwoDevices } from './utils/open_app';
import { test } from '@playwright/test';

test.describe('Community tests', () => {
  iosIt('Send image to community', sendImageCommunityiOS);
  androidIt('Send image to community', sendImageCommunityAndroid);
});

async function sendImageCommunityiOS(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const testMessage = 'Testing sending images to communities';
  const testImageMessage = `Image message + ${new Date().getTime()}`;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await Promise.all([device1.navigateBack(platform), device2.navigateBack(platform)]);
  await joinCommunity(device1, testCommunityLink, testCommunityName);
  await joinCommunity(device2, testCommunityLink, testCommunityName);
  await Promise.all([device1.scrollToBottom(platform), device2.scrollToBottom(platform)]);
  await device1.sendMessage(testMessage);
  await device1.sendImage(platform, testImageMessage, true);
  await device2.replyToMessage(userA, testImageMessage);
  await closeApp(device1, device2);
}

async function sendImageCommunityAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const time = await device1.getTimeFromDevice(platform);
  const testMessage = `Testing sending images to communities + ${time}`;
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  const replyMessage = `Replying to image from ${userA.userName} in community ${testCommunityName} + ${time}`;
  await Promise.all([device1.navigateBack(platform), device2.navigateBack(platform)]);
  await Promise.all([
    joinCommunity(device1, testCommunityLink, testCommunityName),
    joinCommunity(device2, testCommunityLink, testCommunityName),
  ]);
  // await Promise.all([
  //   device1.scrollToBottom(platform),
  //   device2.scrollToBottom(platform),
  // ]);
  await device1.sendImageWithMessageAndroid(testMessage);

  await device2.scrollToBottom(platform);
  await device2.longPressMessage(testMessage);
  await device2.clickOnByAccessibilityID('Reply to message');
  await device2.sendMessage(replyMessage);
  await device1.scrollToBottom(platform);
  await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Message body',
    text: replyMessage,
  });

  await closeApp(device1, device2);
}
