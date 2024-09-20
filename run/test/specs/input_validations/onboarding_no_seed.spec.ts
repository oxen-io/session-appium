import { androidIt, iosIt } from '../../../types/sessionIt';
import * as onboarding from '../locators/onboarding';
import { openAppOnPlatformSingleDevice, SupportedPlatformsType } from '../utils/open_app';
import { localize } from '../../../localizer/i18n/localizedString';

iosIt('Onboarding no seed', onboardingNoSeed);
androidIt('Onboarding no seed', onboardingNoSeed);

const emptySeed = ''
if (emptySeed.length > 0) {
  throw new Error ('The emptySeed string is not empty but it must be.')
}

async function onboardingNoSeed(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    await device.clickOnElementAll(new onboarding.AccountRestoreButton(device));
    await device.inputText(emptySeed, new onboarding.SeedPhraseInput(device));
    // Trigger the validation by pressing Continue
    await device.clickOnElementAll(new onboarding.ContinueButton(device));
    if (platform === 'ios') {
        // Wait for an error message to come up - the actual text is currently not exposed to Appium on iOS
        await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
    } else {
        // Wait for, and fetch the error message on Android
        const error = await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
        const errorMessage = await device.getTextFromElement(error);
        // Compare the fetched string with the expected string
        console.log('The error message is ' + errorMessage);
        // expect the 'Recovery Password not long enough' error
        const expectedError = localize('recoveryPasswordErrorMessageShort').strip().toString();
        console.log('The expected error is ' + expectedError);
        if (errorMessage ===  expectedError) {
            console.log('The observed error message matches the expected');
        }
        else {
            throw new Error ('The observed error message does not match the expected');
        }
    }
}