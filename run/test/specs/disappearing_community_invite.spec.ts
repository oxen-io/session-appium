
import { androidIt, iosIt } from '../../types/sessionIt';
import { DISAPPEARING_TIMES, USERNAME } from '../../types/testing';
import { InviteContactsMenuItem } from './locators';
import { sleepFor } from './utils';
import { newUser } from './utils/create_account';
import { newContact } from './utils/create_contact';
import { joinCommunity } from './utils/join_community';
import { closeApp, openAppTwoDevices, SupportedPlatformsType } from './utils/open_app';
import { setDisappearingMessage } from './utils/set_disappearing_messages';

iosIt('Disappearing community invite message 1o1', disappearingCommunityInviteMessage1o1Ios);
androidIt(
  'Disappearing community invite message 1o1',
  disappearingCommunityInviteMessage1o1Android
);

const communityLink = `https://chat.lokinet.dev/testing-all-the-things?public_key=1d7e7f92b1ed3643855c98ecac02fc7274033a3467653f047d6e433540c03f17`;
const communityName = 'Testing All The Things!';
const time = DISAPPEARING_TIMES.THIRTY_SECONDS;
const timerType = 'Disappear after send option';

async function disappearingCommunityInviteMessage1o1Ios(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, USERNAME.ALICE, platform),
    newUser(device2, USERNAME.BOB, platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);
  await setDisappearingMessage(platform, device1, ['1:1', timerType, time], device2);
  // await device1.navigateBack(platform);
  await device1.navigateBack(platform);
  await joinCommunity(device1, communityLink, communityName);
  await device1.clickOnByAccessibilityID('More options');
  await sleepFor(1000);
  await device1.clickOnElementAll(new InviteContactsMenuItem(device1));
  await device1.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Contact',
    text: userB.userName,
  });
  await device1.clickOnByAccessibilityID('Done');
  // Check device 2 for invitation from user A
  await device2.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Community invitation',
    text: communityName,
  });
  // Wait for 30 seconds for message to disappear
  await sleepFor(30000);
  await Promise.all([
    device2.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      maxWait: 1000,
      text: communityName,
    }),
    device1.hasElementBeenDeleted({
      strategy: 'accessibility id',
      selector: 'Message body',
      maxWait: 1000,
      text: communityName,
    }),
  ]);
  await closeApp(device1, device2);
}

async function disappearingCommunityInviteMessage1o1Android(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  // Create user A and user B
  const [userA, userB] = await Promise.all([
    newUser(device1, USERNAME.ALICE, platform),
    newUser(device2, USERNAME.BOB, platform),
  ]);
  await newContact(platform, device1, userA, device2, userB);

  await setDisappearingMessage(platform, device1, ['1:1', timerType, time], device2);

  await device1.navigateBack(platform);
  await joinCommunity(device1, communityLink, communityName);
  await device1.clickOnByAccessibilityID('More options');
  await device1.clickOnElementAll(new InviteContactsMenuItem(device1));
  await device1.clickOnElementByText({
    strategy: 'accessibility id',
    selector: 'Contact',
    text: userB.userName,
  });
  await device1.clickOnByAccessibilityID('Done');
  // Check device 2 for invitation from user A
  await device2.waitForTextElementToBePresent({
    strategy: 'id',
    selector: 'network.loki.messenger:id/openGroupTitleTextView',
    text: communityName,
  });
  // Wait for 30 seconds for message to disappear
  await sleepFor(30000);
  await device2.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Message body',
    maxWait: 1000,
    text: communityName,
  });
  await device1.hasElementBeenDeleted({
    strategy: 'accessibility id',
    selector: 'Message body',
    maxWait: 1000,
    text: communityName,
  });
  await closeApp(device1, device2);
}
