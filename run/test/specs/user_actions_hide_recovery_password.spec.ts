import { englishStrippedStri, localize } from '../../localizer/i18n/localizedString';
import { androidIt, iosIt } from '../../types/sessionIt';
import { USERNAME } from '../../types/testing';
import { ContinueButton, ModalDescription, ModalHeading } from './locators/global';
import { HideRecoveryPasswordButton, YesButton } from './locators/settings';
import { linkedDevice } from './utils/link_device';
import { closeApp, openAppTwoDevices, SupportedPlatformsType } from './utils/open_app';

iosIt('Hide recovery password', hideRecoveryPassword);
androidIt('Hide recovery password', hideRecoveryPassword);

const expectedHeading1 = englishStrippedStri('recoveryPasswordHidePermanently').toString();
const expectedDescription1 = englishStrippedStri(
  'recoveryPasswordHidePermanentlyDescription1'
).toString();

const expectedDescription2 = englishStrippedStri(
  'recoveryPasswordHidePermanentlyDescription2'
).toString();

function replaceBrWithCRLF(input: string): string {
  return input.replace(/<br\s*\/?>/gi, 'CR LF\nCR LF');
}

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
  const elHeading1 = await device1.waitForTextElementToBePresent(new ModalHeading(device1));
  const elDescription1 = await device1.waitForTextElementToBePresent(new ModalDescription(device1));
  // Check modal heading is correct
  const actualHeading = await device1.getTextFromElement(elHeading1);
  const actualDescription = await device1.getTextFromElement(elDescription1);
  let formattedDescription1: string;
  if (platform === 'android') {
    formattedDescription1 = replaceBrWithCRLF(expectedDescription1);
  } else if (platform === 'ios') {
    formattedDescription1 = expectedDescription1;
  } else {
    throw new Error('Platform not supported');
  }
  if (expectedHeading1 === actualHeading) {
    console.log('Modal heading is correct');
  } else {
    throw new Error(
      `Expected heading: ${expectedHeading1}, actual heading: ${actualHeading}, modal heading incorrect`
    );
  }
  if (formattedDescription1 == expectedDescription1) {
    console.log('Modal description is correct');
  } else {
    throw new Error(
      `Expected description: ${expectedDescription1}, actual description: ${actualDescription},  Modal description is incorrect `
    );
  }
  // Click on continue
  await device1.clickOnElementAll(new ContinueButton(device1));
  // Check confirmation modal
  // Same heading on both modals so can reuse the same locator
  const elHeading2 = await device1.waitForTextElementToBePresent(new ModalHeading(device1));
  const elDescription2 = await device1.waitForTextElementToBePresent(new ModalDescription(device1));
  const actualHeading2 = await device1.getTextFromElement(elHeading2);
  const actualDescription2 = await device1.getTextFromElement(elDescription2);
  let formattedDescription2: string;
  if (platform === 'android') {
    formattedDescription2 = replaceBrWithCRLF(expectedDescription2);
  } else if (platform === 'ios') {
    formattedDescription2 = expectedDescription2;
  } else {
    throw new Error('Platform not supported');
  }
  if (actualHeading === actualHeading2) {
    console.log('Modal heading 2 is correct');
  } else {
    throw new Error(
      `Expected heading: ${actualHeading}, actual heading 2: ${actualHeading2}, modal heading 2 incorrect`
    );
  }
  if (formattedDescription2 === actualDescription2) {
    console.log('Modal description 2 is correct');
  } else {
    throw new Error(
      `Expected description: ${formattedDescription2}, actual description: ${actualDescription2},  Modal description 2 is incorrect `
    );
  }
  // Click on Yes
  await device1.clickOnElementAll(new YesButton(device1));
  // Should be taken back to Settings page after hiding recovery password
  await device1.waitForTextElementToBePresent({
    strategy: 'accessibility id',
    selector: 'Account ID',
  });

  await closeApp(device1, device2);
}
