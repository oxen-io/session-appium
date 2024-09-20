import { androidIt, iosIt } from '../../../types/sessionIt';
import * as onboarding from '../locators/onboarding';
import { openAppOnPlatformSingleDevice, SupportedPlatformsType } from '../utils/open_app';
import { localize } from '../../../localizer/i18n/localizedString';

iosIt('Onboarding no name', onboardingNoName);
androidIt('Onboarding no name', onboardingNoName);

// checking that we're not trying to test with a non-empty name
const emptyName = '';
if (emptyName.length > 0) {
  throw new Error ('The emptyName string is not empty but it must be.')
}

async function onboardingNoName(platform:SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  await device.clickOnElementAll(new onboarding.CreateAccountButton(device));
  await device.inputText(emptyName, new onboarding.DisplayNameInput(device));
  // Trigger the validation by pressing Continue
  await device.clickOnElementAll(new onboarding.ContinueButton(device));
  if (platform === 'ios') {
    // Wait for an error message to come up - the actual text is currently not exposed to Appium on iOS
    await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
  } else {
    // Wait for, and fetch the error text on Android
    const error = await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
    const errorMessage = await device.getTextFromElement(error);
    // Compare the fetched text with the expected 'Please enter a display name' string
    console.log('The error message is ' + errorMessage)
    const expectedError = localize('displayNameErrorDescription').strip().toString();
    console.log('The expected error is ' + expectedError)
    if (errorMessage ===  expectedError) {
      console.log('The observed error message matches the expected');
    }
    else {
      throw new Error ('The observed error message does not match the expected');
    }
  } 
}