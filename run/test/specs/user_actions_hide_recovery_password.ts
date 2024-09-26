import { MODAL_DESCRIPTIONS } from '../../constants';
import { localize } from '../../localizer/i18n/localizedString';
import { androidIt, iosIt } from '../../types/sessionIt';
import { ModalStrings } from '../../types/testing';
import { runOnlyOnAndroid, runOnlyOnIOS } from './utils';
import { linkedDevice } from './utils/link_device';
import { openAppTwoDevices, SupportedPlatformsType } from './utils/open_app';

iosIt('Hide recovery password', hideRecoveryPassword);
androidIt('Hide recovery password', hideRecoveryPassword);

async function hideRecoveryPassword(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  const userA = await linkedDevice(device1, device2, 'Alice', platform);
  await device1.clickOnElementAll({ strategy: 'accessibility id', selector: 'User settings' });
  await device1.scrollDown();
  await device1.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Recovery password menu item',
  });
  await device1.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Hide recovery password button',
  });
  // Wait for modal to appear
  await runOnlyOnAndroid(platform, () =>
    device1.waitForTextElementToBePresent({
      strategy: 'class name',
      selector: 'android.widget.TextView',
      text: 'Hide Recovery Password Permanently',
    })
  );
  await runOnlyOnIOS(platform, () =>
    device1.waitForTextElementToBePresent({
      strategy: 'accessibility id',
      selector: 'Hide Recovery Password Permanently',
    })
  );
  // Check modal text is correct
  localize('recoveryPasswordHidePermanentlyDescription1').strip().toString();
  //   await device1.waitForTextElementToBePresent({
  //     MODAL_DESCRIPTIONS.HIDE_RECOVERY_PASSWORD
  // });
}
