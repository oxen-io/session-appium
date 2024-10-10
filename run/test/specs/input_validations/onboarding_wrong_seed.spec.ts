import { androidIt, iosIt } from '../../../types/sessionIt';
import { AccountRestoreButton, SeedPhraseInput, ContinueButton, ErrorMessage } from '../locators/onboarding';
import { closeApp, openAppOnPlatformSingleDevice, SupportedPlatformsType } from '../utils/open_app';
import { localize } from '../../../localizer/i18n/localizedString';

iosIt('Onboarding wrong seed', onboardingIncorrectSeed);
androidIt('Onboarding wrong seed', onboardingIncorrectSeed);

// the seed phrase is too long but contains only valid mnemonics which triggers the generic error 
const wrongSeed = 'ruby bakery illness push rift reef nabbing bawled hope ruby silk lobster hope ruby ruby ruby'
// the expected error is 'Please check your recovery password' which is represented by the following localized string
const expectedError = localize('recoveryPasswordErrorMessageGeneric').strip().toString();

async function onboardingIncorrectSeed(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    await device.clickOnElementAll(new AccountRestoreButton(device));
    await device.inputText(wrongSeed, new SeedPhraseInput(device));
    // Trigger the validation by pressing Continue
    await device.clickOnElementAll(new ContinueButton(device));
    // TODO: once the error text is available as the accessibility label, the entire if condition can be removed
    if (platform === 'ios') {
        // Wait for an error message to come up - the actual text is currently not exposed to Appium on iOS
        await device.waitForTextElementToBePresent(new ErrorMessage(device).build());
    } else {
        // Wait for, and fetch the error message on Android
        const error = await device.waitForTextElementToBePresent(new ErrorMessage(device).build());
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
    await closeApp(device);
}