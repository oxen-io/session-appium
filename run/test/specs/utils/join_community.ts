import { DeviceWrapper } from '../../../types/DeviceWrapper';
import { CommunityInput, JoinCommunityButton, JoinCommunityOption } from '../locators';

export const joinCommunity = async (
  device: DeviceWrapper,
  communityLink: string,
  communityName: string
) => {
  await device.clickOnByAccessibilityID('New conversation button');
  await device.clickOnElementAll(new JoinCommunityOption(device));
  await device.inputText(communityLink, new CommunityInput(device));
  await device.clickOnElementAll(new JoinCommunityButton(device));
  await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Conversation header name',
    text: communityName,
  });
};
