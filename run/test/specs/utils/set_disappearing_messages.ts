import { DeviceWrapper } from '../../../types/DeviceWrapper';
import { ConversationType, DISAPPEARING_TIMES, MergedOptions } from '../../../types/testing';
import { DisappearingMessagesMenuOption } from '../locators';
import { SupportedPlatformsType } from './open_app';
import { runOnlyOnIOS } from './run_on';
import { sleepFor } from './sleep_for';
export const setDisappearingMessage = async (
  platform: SupportedPlatformsType,
  device: DeviceWrapper,
  [conversationType, timerType, timerDuration = DISAPPEARING_TIMES.THIRTY_SECONDS]: MergedOptions,
  device2?: DeviceWrapper
) => {
  const enforcedType: ConversationType = conversationType;
  await device.clickOnByAccessibilityID('More options');
  // Wait for UI to load conversation options menu
  await sleepFor(500);
  await device.clickOnElementAll(new DisappearingMessagesMenuOption(device));
  if (enforcedType === '1:1') {
    await device.clickOnByAccessibilityID(timerType);
  }
  await device.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: DISAPPEARING_TIMES.ONE_DAY,
  });
  if (timerType === 'Disappear after read option') {
    if (enforcedType === '1:1' || enforcedType === 'Note to Self') {
      await device.disappearRadioButtonSelected(platform, DISAPPEARING_TIMES.TWELVE_HOURS);
    } else {
      await device.disappearRadioButtonSelected(platform, DISAPPEARING_TIMES.ONE_DAY);
    }
  } else {
    await device.disappearRadioButtonSelected(platform, DISAPPEARING_TIMES.ONE_DAY);
  }

  await device.clickOnElementAll({
    strategy: 'accessibility id',
    selector: timerDuration,
  });
  await device.clickOnElementAll({ strategy: 'accessibility id', selector: 'Set button' });
  await runOnlyOnIOS(platform, () => device.navigateBack(platform));
  await sleepFor(1000);
  if (device2) {
    await device2.clickOnElementAll({
      strategy: 'accessibility id',
      selector: 'Follow setting',
    });
    await sleepFor(500);
    await device2.clickOnElementAll({
      strategy: 'accessibility id',
      selector: 'Set button',
    });
  }
};
