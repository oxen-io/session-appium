import { englishStripped } from '../../../localizer/i18n/localizedString';
import { DeviceWrapper } from '../../../types/DeviceWrapper';
import {
  DisappearActions,
  DisappearingControlMessage,
  DMTimeOption,
  User,
} from '../../../types/testing';
import { SupportedPlatformsType } from './open_app';

export const checkDisappearingControlMessage = async (
  platform: SupportedPlatformsType,
  userA: User,
  userB: User,
  device1: DeviceWrapper,
  device2: DeviceWrapper,
  time: DMTimeOption,
  mode: DisappearActions
) => {
  // Two control messages to check - You have set and other user has set
  // "disappearingMessagesSet": "<b>{name}</b> has set messages to disappear {time} after they have been {disappearing_messages_type}.",
  const disappearingMessagesSetUserA = englishStripped('disappearingMessagesSet')
    .withArgs({ name: userA.userName, time, disappearing_messages_type: mode })
    .toString();
  const disappearingMessagesSetUserB = englishStripped('disappearingMessagesSet')
    .withArgs({ name: userB.userName, time, disappearing_messages_type: mode })
    .toString();
  // "disappearingMessagesSetYou": "<b>You</b> set messages to disappear {time} after they have been {disappearing_messages_type}.",
  const disappearingMessagesSetYou = englishStripped('disappearingMessagesSetYou')
    .withArgs({ time, disappearing_messages_type: mode })
    .toString();
  // Check device 1
  if (platform === 'android') {
    await Promise.all([
      device1.disappearingControlMessage(disappearingMessagesSetYou as DisappearingControlMessage),
      device1.disappearingControlMessage(
        disappearingMessagesSetUserB as DisappearingControlMessage
      ),
    ]);
    // Check device 2
    await Promise.all([
      device2.disappearingControlMessage(disappearingMessagesSetYou as DisappearingControlMessage),
      device2.disappearingControlMessage(
        disappearingMessagesSetUserA as DisappearingControlMessage
      ),
    ]);
  }
  if (platform === 'ios') {
    await Promise.all([
      device1.disappearingControlMessage(disappearingMessagesSetYou as DisappearingControlMessage),
      device2.disappearingControlMessage(
        disappearingMessagesSetUserA as DisappearingControlMessage
      ),
    ]);
  }
};
