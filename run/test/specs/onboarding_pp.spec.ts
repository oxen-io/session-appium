import { bothPlatformsIt } from '../../types/sessionIt';
import { PrivacyPolicyButton, SplashScreenLinks } from './locators/onboarding';
import { runOnlyOnAndroid, runOnlyOnIOS } from './utils';
import { closeApp, openAppOnPlatformSingleDevice, SupportedPlatformsType } from './utils/open_app';

bothPlatformsIt('Onboarding privacy policy', 'high', onboardingPP)

async function onboardingPP(platform: SupportedPlatformsType) {
    const { device } = await openAppOnPlatformSingleDevice(platform);
    const ppURL = 'https://getsession.org/privacy-policy';
    let urlField; 
    // Tap the text at the bottom of the splash screen to bring up the TOS/PP links modal
    await device.clickOnElementAll(new SplashScreenLinks(device));
    // Tap Privacy Policy
    await device.clickOnElementAll(new PrivacyPolicyButton(device));
    // Grabbing the URL from the browser works differently per platform 
    if (platform === 'ios') {
        // Tap the Safari navigation bar to reveal the URL 
        await device.clickOnByAccessibilityID('TabBarItemTitle')
        // Grab URL from the navigation bar
        urlField = await device.waitForTextElementToBePresent({strategy: 'accessibility id', selector: 'URL'})
    }
    else {
        // Tap the Chrome navigation bar and grab the URL
        urlField = await device.waitForTextElementToBePresent({strategy: 'id', selector: 'com.android.chrome:id/url_bar'})
    }
    // Retrieve URL 
    const retrievedURL = await device.getTextFromElement(urlField)
    // Add https:// to the retrieved URL if the UI doesn't show it (Chrome doesn't, Safari does)
    const fullRetrievedURL = retrievedURL.startsWith('https://') ? retrievedURL : `https://${retrievedURL}`;
    // Verify that it's the correct URL 
    if (fullRetrievedURL !== ppURL) {
        throw new Error("The retrieved URL does not match the expected.");
    } else {
        console.log("The URLs match.");
    }
    // Close browser and app 
    await runOnlyOnIOS(platform, () => device.clickOnCoordinates(42,42)); // I don't like this but nothing else works 
    await runOnlyOnAndroid(platform, () => device.back());
    await closeApp(device);
}