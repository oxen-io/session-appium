import { androidIt, iosIt } from '../../../types/sessionIt';
import * as onboarding from '../locators/onboarding';
import { openAppOnPlatformSingleDevice, SupportedPlatformsType } from '../utils/open_app';
import { localize } from '../../../localizer/i18n/localizedString';

iosIt('Onboarding wrong seed', onboardingIncorrectSeed);
androidIt('Onboarding wrong seed', onboardingIncorrectSeed);

// the seed phrase is too long and we expect to get the generic error 
const wrongSeed = 'ruby bakery illness push rift reef nabbing bawled hope ruby silk lobster hope ruby ruby ruby'
// the expected error is 'Please check your recovery password' which is represented by the following localized string
const expectedError = localize('recoveryPasswordErrorMessageGeneric').strip().toString();


async function onboardingIncorrectSeed(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    await device.clickOnElementAll(new onboarding.AccountRestoreButton(device));
    await device.inputText(wrongSeed, new onboarding.SeedPhraseInput(device));
    // Trigger the validation by pressing Continue
    await device.clickOnElementAll(new onboarding.ContinueButton(device));
    if (platform === 'ios') {
        // Wait for an error message to come up - the actual text is currently not exposed to Appium on iOS
        await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
    } else {
        // Wait for, and fetch the error message on Android
        const error = await device.waitForTextElementToBePresent(new onboarding.ErrorMessage(device).build());
        const errorMessage = await device.getTextFromElement(error);
        console.log(`The error message is "${errorMessage}"`);
        console.log(`The expected error is "${expectedError}"`);
    // Compare the fetched string with the expected string
        if (errorMessage ===  expectedError) {
            console.log('The observed error message matches the expected');
        }
        else {
            throw new Error ('The observed error message does not match the expected');
        }
    }
}