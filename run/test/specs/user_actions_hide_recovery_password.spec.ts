import { englishStripped } from '../../localizer/i18n/localizedString';
import { bothPlatformsIt } from '../../types/sessionIt';
import { USERNAME } from '../../types/testing';
import { ModalDescription, ModalHeading } from './locators/global';
import { HideRecoveryPasswordButton } from './locators/settings';
import { linkedDevice } from './utils/link_device';
import { closeApp, openAppTwoDevices, SupportedPlatformsType } from './utils/open_app';

bothPlatformsIt('Hide recovery password', 'medium', hideRecoveryPassword);

const expectedHeading = englishStripped('recoveryPasswordHidePermanently').toString();
const expectedDescription = englishStripped(
  'recoveryPasswordHidePermanentlyDescription1'
).toString();

async function hideRecoveryPassword(platform: SupportedPlatformsType) {
  const { device1, device2 } = await openAppTwoDevices(platform);
  await linkedDevice(device1, device2, USERNAME.ALICE, platform);
  await device1.clickOnElementAll({ strategy: 'accessibility id', selector: 'User settings' });
  await device1.scrollDown();
  await device1.clickOnElementAll({
    strategy: 'accessibility id',
    selector: 'Recovery password menu item',
  });
  await device1.clickOnElementAll(new HideRecoveryPasswordButton(device1));
  // Wait for modal to appear
  const elHeading = await device1.waitForTextElementToBePresent(new ModalHeading(device1));
  const elDescription = await device1.waitForTextElementToBePresent(new ModalDescription(device1));
  // Check modal heading is correct
  const actualHeading = await device1.getTextFromElement(elHeading);
  const actualDescription = await device1.getTextFromElement(elDescription);
  if (expectedHeading === actualHeading) {
    console.log('Modal heading is correct');
  } else {
    throw new Error('Modal heading is incorrect');
  }
  if (expectedDescription === actualDescription) {
    console.log('Modal description is correct');
  } else {
    throw new Error('Modal description is incorrect');
  }

  await closeApp(device1, device2);
}