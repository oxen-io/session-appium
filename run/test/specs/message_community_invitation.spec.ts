import { androidIt, iosIt } from '../../types/sessionIt';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { joinCommunity } from './utils/join_community';
import { SupportedPlatformsType, openAppTwoDevices, closeApp } from './utils/open_app';

iosIt('Send community invitation', sendCommunityInvitationIos);
androidIt('Send community invitation', sendCommunityInviteMessageAndroid);

async function sendCommunityInvitationIos(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const communityLink = `https://chat.lokinet.dev/testing-all-the-things?public_key=1d7e7f92b1ed3643855c98ecac02fc7274033a3467653f047d6e433540c03f17`;
  const communityName = 'Testing All The Things!';
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Join community on device 1
  // Click on plus button
  await device1.navigateBack(platform);
  await joinCommunity(platform, device1, communityLink, communityName);
  await device1.clickOnByAccessibilityID('More options');
  await sleepFor(500);
  await device1.clickOnByAccessibilityID('Add Members');
  await device1.clickOnElementByText({
    strategy: 'accessibility id',
    selector: 'Contact',
    text: userB.userName,
  });
  // await device1.clickOnByAccessibilityID("Invite");
  await device1.clickOnByAccessibilityID('Done');
  await device2.clickOnElementByText({
    strategy: 'accessibility id',
    selector: 'Community invitation',
    text: communityName,
  });
  await device2.clickOnByAccessibilityID('Join');
  // Check that join worked
  await device2.navigateBack(platform);
  await device2.clickOnElementByText({
    strategy: 'accessibility id',
    selector: 'Conversation list item',
    text: communityName,
  });
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Conversation header name',
    text: communityName,
  });
  // await device2.waitForTextElementToBePresent({
  //   strategy: "accessibility id",
  //   selector: "Username",
  //   text: communityName,
  // });

  await closeApp(device1, device2);
}

async function sendCommunityInviteMessageAndroid(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const communityLink = `https://chat.lokinet.dev/testing-all-the-things?public_key=1d7e7f92b1ed3643855c98ecac02fc7274033a3467653f047d6e433540c03f17`;
  const communityName = 'Testing All The Things!';
  // Create two users
  const [userA, userB] = await Promise.all([
    newUser(device1, 'Alice', platform),
    newUser(device2, 'Bob', platform),
  ]);
  // Create contact
  await newContact(platform, device1, userA, device2, userB);
  // Join community
  await sleepFor(100);
  await device1.navigateBack(platform);
  await joinCommunity(platform, device1, communityLink, communityName);
  // Wait for community to load
  // Add user B to community
  await device1.clickOnByAccessibilityID('More options', 5000);
  await device1.clickOnElementAll({
    strategy: 'id',
    selector: 'network.loki.messenger:id/title',
    text: 'Add members',
  });
  await device1.clickOnElementByText({
    strategy: 'accessibility id',
    selector: 'Contact',
    text: userB.userName,
  });
  await device1.clickOnByAccessibilityID('Done');
  // Check device 2 for invitation from user A
  await closeApp(device1, device2);
}
