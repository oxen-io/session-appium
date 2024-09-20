import { androidIt, iosIt } from '../../../types/sessionIt';
import * as onboarding from '../locators/onboarding';
import { openAppOnPlatformSingleDevice, SupportedPlatformsType } from '../utils/open_app';
import { localize } from '../../../localizer/i18n/localizedString';

iosIt('Onboarding long name', onboardingLongName);
androidIt('Onboarding long name', onboardingLongName);

// the libSession limit for display names is 100 bytes but for our sake 101 chars = 101 bytes will have to do    
const tooLongName = 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed int';
if (tooLongName.length <= 100) {  
  throw new Error ('The string to test the display name length check is too short. It is only ' + tooLongName.length + ' characters long but needs to be >100. ');
}

async function onboardingLongName(platform:SupportedPlatformsType) {
  const { device } = await openAppOnPlatformSingleDevice(platform);
  await device.clickOnElementAll(new onboarding.CreateAccountButton(device));
  await device.inputText(tooLongName, new onboarding.DisplayNameInput(device));
  // Trigger the validation by pressing Continue
  await device.clickOnElementAll(new onboarding.ContinueButton(device));
  if (platform === 'ios') {
    // Wait for an error message to come up - the actual text is currently not exposed to Appium on iOS
    await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
  } else {
    // Wait for, and fetch the error message 
    const error = await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
    const errorMessage = await device.getTextFromElement(error);
    // Compare the fetched string with the expected string
    console.log('The error message is ' + errorMessage);
    // expect the 'Please enter a shorter display name' error
    const expectedError = localize('displayNameErrorDescriptionShorter').strip().toString();
    console.log('The expected error is ' + expectedError);
    if (errorMessage ===  expectedError) {
      console.log('The observed error message matches the expected');
    }
    else {
      throw new Error ('The observed error message does not match the expected');
    }
  }
}