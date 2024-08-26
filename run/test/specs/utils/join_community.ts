import { DeviceWrapper } from '../../../types/DeviceWrapper';
import { SupportedPlatformsType } from './open_app';

export const joinCommunity = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper,
  communityLink: string,
  communityName: string
) => {
  await device.clickOnByAccessibilityID('New conversation button');
  if (platform === 'ios') {
    await device.clickOnByAccessibilityID('Join Community');
    await device.inputText(communityLink, {
      strategy: 'accessibility id',
      selector: 'Enter Community URL',
    });
    await device.clickOnByAccessibilityID('Join');
    // Wait for community to load
    await device.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Conversation header name',
      text: communityName,
    });
  } else {
    // TODO FIX (ISSUE WITH ACCESS ID JOIN COMMUNITY? android needs updated)
    await device.clickOnByAccessibilityID('Join community');
    await device.inputText(communityLink, {
      strategy: 'accessibility id',
      selector: 'Community input',
    });
    await device.clickOnByAccessibilityID('Join community button');
  }
  await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Conversation header name',
    text: communityName,
  });
};
